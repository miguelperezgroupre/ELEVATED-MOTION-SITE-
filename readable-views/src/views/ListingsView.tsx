// @ts-nocheck
/**
 * ListingsView — preview build with the shared <PageHero /> (same system as the homepage hero).
 *
 * The original source file for this view could not be retrieved through the Vercel connector
 * (deployment file contents are truncated), so this module was reconstructed from the deployed
 * production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ, Oct 7 2026). Everything below the hero is
 * behaviourally identical to production; only the page hero section was replaced.
 * When the real source is available, apply the same change there: delete the old hero <section>
 * and render <PageHero page="listings" onOpenContact={onOpenContact} /> in its place.
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import * as wn__mod from "../services/idxService";
import * as nx__mod from "../components/ListingCard";
import {
  PROPERTIES as zt
} from "../data";
import PageHero from "../components/PageHero";
const lr = 24;
const wn = wn__mod.idxService ?? Object.values(wn__mod).find((x) => x && typeof x === "object" && typeof x
  .getProperties === "function");
const nx = nx__mod.default ?? nx__mod.ListingCard ?? Object.values(nx__mod).find((x) => typeof x === "function");

function ListingsView({
  onSelectProperty: m,
  onOpenContact: u
}) {
  const [d, c] = R.useState(zt), [x, g] = R.useState(true), [C, A] = R.useState(false), [_, E] = R.useState(null), [v,
    f] = R.useState(0);
  R.useEffect(() => {
    let B = false;
    return g(true), wn.getProperties({
      limit: lr,
      sort: "ListPrice desc",
      status: "Active",
      farmAreas: true
    }).then((U) => {
      B || U && U.length > 0 && (c(U), A(true));
    }).catch(() => {}).finally(() => {
      B || g(false);
    }), () => {
      B = true;
    };
  }, []);
  const w = async () => {
    const B = v + 1;
    g(true);
    try {
      const U = await wn.getProperties({
        limit: lr,
        offset: B * lr,
        sort: "ListPrice desc",
        status: "Active",
        farmAreas: true
      });
      U && U.length > 0 && (c((G) => {
        const V = new Set(G.map((q) => q.id)),
          F = U.filter((q) => !V.has(q.id));
        return [...G, ...F];
      }), f(B), E(U.length));
    } catch {} finally {
      g(false);
    }
  };
  return n.jsxs(n.Fragment, {
    children: [n.jsx(PageHero, {
      page: "listings",
      onOpenContact: u
    }), n.jsxs("div", {
      className: "relative min-h-screen pt-14 md:pt-16 pb-20 px-4 md:px-8 max-w-7xl mx-auto",
      children: [n.jsxs("div", {
        className: "flex items-center justify-between mb-6",
        children: [n.jsx("p", {
          className: "text-[12px] uppercase tracking-[0.12em] text-[#f4efe2]/40",
          children: x ? "Loading listings..." :
            `${d.length} ${d.length === 1 ? "property" : "properties"}${C ? " \xB7 live MLS" : " \xB7 featured sample"}`
        }), n.jsx("button", {
          onClick: () => {
            f(0), g(true), wn.getProperties({
              limit: lr,
              sort: "ListPrice desc",
              status: "Active",
              farmAreas: true
            }).then((B) => {
              B && B.length > 0 && (c(B), A(true));
            }).finally(() => g(false));
          },
          disabled: x,
          className: "px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded disabled:opacity-50",
          children: x ? "Loading..." : "\u21BB Refresh"
        })]
      }), n.jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
        children: d.map((B) => n.jsx(nx, {
          property: B,
          onClick: m
        }, B.id))
      }), !x && d.length === 0 && n.jsxs("div", {
        className: "text-center py-16 border border-[#f4efe2]/10 rounded-lg",
        children: [n.jsx("p", {
          className: "text-[#f4efe2]/60 text-lg mb-2",
          children: "No listings available right now"
        }), n.jsx("p", {
          className: "text-[#f4efe2]/40 text-sm mb-6",
          children: "The MLS feed is temporarily unavailable \u2014 check back shortly."
        })]
      }), C && d.length > 0 && n.jsx("div", {
        className: "mt-10 flex justify-center",
        children: n.jsx("button", {
          onClick: w,
          disabled: x,
          className: "px-8 py-3 text-[11px] uppercase tracking-[0.15em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded disabled:opacity-50",
          children: x ? "Loading..." : "Load More"
        })
      }), n.jsx("p", {
        className: "text-[10px] text-[#f4efe2]/30 mt-8 text-center leading-relaxed",
        children: "The multiple listing information is provided by the Miami Association of REALTORS\xAE from a copyrighted compilation of listings. The compilation of listings and each individual are \xA92026 Miami Association of REALTORS\xAE. All Rights Reserved. Information is deemed reliable but not guaranteed."
      })]
    })]
  });
}
export {
  ListingsView as
  default
};
