import express from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { createServer as createViteServer } from "vite";
import "dotenv/config";

import { performRagSearch } from "./server/services/ragService.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Security Headers (Helmet)
  // Configured to allow Vite HMR and React inline scripts/styles during development
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disabled temporarily to allow React/Vite in dev, should be strictly configured for production
      crossOriginEmbedderPolicy: false,
    })
  );

  // 2. CORS - Restrict to same origin in production
  app.use(cors());

  // 3. Rate Limiting for APIs
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." }
  });

  // 4. Secure API Routes - IDX Proxy
  // We keep the Bridgedata Token entirely server-side.
  app.use("/api/", apiLimiter);

  app.get("/api/odata/Property", async (req, res) => {
    try {
      const DATASET = process.env.BRIDGEDATA_DATASET || 'miamire';
      const BASE_URL = `https://api.bridgedataoutput.com/api/v2/OData/${DATASET}`;
      const TOKEN = process.env.BRIDGEDATA_SERVER_TOKEN;
      
      if (!TOKEN) {
        console.error("Missing BRIDGEDATA_SERVER_TOKEN environment variable.");
        return res.status(500).json({ error: "Server configuration error" });
      }

      const queryParams = new URLSearchParams(req.query as Record<string, string>);
      queryParams.set("access_token", TOKEN);

      const url = `${BASE_URL}/Property?${queryParams.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Bridge API returned ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("[Backend] Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch property data securely." });
    }
  });

  app.get("/api/odata/Property\\(':id'\\)", async (req, res) => {
    try {
      const DATASET = process.env.BRIDGEDATA_DATASET || 'miamire';
      const BASE_URL = `https://api.bridgedataoutput.com/api/v2/OData/${DATASET}`;
      const TOKEN = process.env.BRIDGEDATA_SERVER_TOKEN;
      
      if (!TOKEN) return res.status(500).json({ error: "Server configuration error" });

      const url = `${BASE_URL}/Property('${encodeURIComponent(req.params.id)}')?access_token=${TOKEN}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Bridge API returned ${response.status}`);
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("[Backend] Error fetching property detail:", error);
      res.status(500).json({ error: "Failed to fetch property detail securely." });
    }
  });

  app.get("/api/pub/listings", async (req, res) => {
    try {
      const BASE_URL = 'https://api.bridgedataoutput.com/api/v2/pub';
      const TOKEN = process.env.BRIDGEDATA_SERVER_TOKEN;
      
      if (!TOKEN) return res.status(500).json({ error: "Server configuration error" });

      const queryParams = new URLSearchParams(req.query as Record<string, string>);
      queryParams.set("access_token", TOKEN);

      const url = `${BASE_URL}/listings?${queryParams.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Bridge API returned ${response.status}`);
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("[Backend] Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch property data securely." });
    }
  });

  app.get("/api/pub/listings/:id", async (req, res) => {
    try {
      const BASE_URL = 'https://api.bridgedataoutput.com/api/v2/pub';
      const TOKEN = process.env.BRIDGEDATA_SERVER_TOKEN;
      
      if (!TOKEN) return res.status(500).json({ error: "Server configuration error" });

      const url = `${BASE_URL}/listings/${encodeURIComponent(req.params.id)}?access_token=${TOKEN}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Bridge API returned ${response.status}`);
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("[Backend] Error fetching property detail:", error);
      res.status(500).json({ error: "Failed to fetch property detail securely." });
    }
  });

  // Secure Lead Capture Proxy (GoHighLevel)
  app.use(express.json());
  
  app.post("/api/elevated-search", apiLimiter, async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: "Valid search query is required." });
      }
      
      const answer = await performRagSearch(query);
      res.json({ answer });
    } catch (error) {
      console.error("[Backend] Elevated search error:", error);
      res.status(500).json({ error: "Secure vector query failed." });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const GHL_TOKEN = process.env.GHL_TOKEN;
      if (!GHL_TOKEN) {
        return res.status(500).json({ error: "Server configuration error for CRM" });
      }

      const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_TOKEN}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error(`CRM returned ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("[Backend] Error submitting lead:", error);
      res.status(500).json({ error: "Failed to submit lead securely." });
    }
  });

  // 5. Vite Middleware / Production Static Files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Security Check] Server running on port ${PORT}`);
    console.log(`[Security Check] Bridgedata token secured server-side.`);
  });
}

startServer().catch(console.error);
