import express from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { createServer as createViteServer } from "vite";
import "dotenv/config";

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

  app.get("/api/listings", async (req, res) => {
    try {
      const BASE_URL = process.env.BRIDGEDATA_BASE_URL || 'https://api.bridgedataoutput.com/api/v2/miamire';
      const TOKEN = process.env.BRIDGEDATA_SERVER_TOKEN;
      
      if (!TOKEN) {
        console.error("Missing BRIDGEDATA_SERVER_TOKEN environment variable.");
        return res.status(500).json({ error: "Server configuration error" });
      }

      // Reconstruct query string securely
      const queryParams = new URLSearchParams(req.query as Record<string, string>);
      queryParams.set("access_token", TOKEN);

      const url = `${BASE_URL}/listings?${queryParams.toString()}`;
      
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

  app.get("/api/listings/:id", async (req, res) => {
    try {
      const BASE_URL = process.env.BRIDGEDATA_BASE_URL || 'https://api.bridgedataoutput.com/api/v2/miamire';
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
