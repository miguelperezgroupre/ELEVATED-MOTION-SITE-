// @ts-nocheck
/**
 * AboutView — preview build with the shared <PageHero /> (same system as the homepage hero).
 *
 * The original source file for this view could not be retrieved through the Vercel connector
 * (deployment file contents are truncated), so this module was reconstructed from the deployed
 * production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ, Oct 7 2026). Everything below the hero is
 * behaviourally identical to production; only the page hero section was replaced.
 * When the real source is available, apply the same change there: delete the old hero <section>
 * and render <PageHero page="about" onOpenContact={onOpenContact} /> in its place.
 */
import * as n from "react/jsx-runtime";
import {
  ArrowRight as ue,
  Phone as Cl
} from "lucide-react";
import PageHero from "../PageHero";

function AboutView({
  onOpenContact: m
}) {
  return n.jsxs("div", {
    className: "pb-20 animate-fadeIn",
    children: [n.jsx(PageHero, {
      page: "about",
      onOpenContact: m
    }), n.jsx("section", {
      className: "py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center",
          children: [n.jsxs("div", {
            className: "lg:col-span-5 relative",
            children: [n.jsxs("div", {
              className: "aspect-[4/5] border border-[rgba(201,162,74,0.4)] overflow-hidden shadow-2xl relative",
              children: [n.jsx("img", {
                src: "/assets/miguel-perez-headshot.jpg",
                alt: "Miguel Perez - South Florida Real Estate Advisor",
                referrerPolicy: "no-referrer",
                className: "w-full h-full object-cover object-top"
              }), n.jsx("div", {
                className: "absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-60"
              })]
            }), n.jsxs("div", {
              className: "p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] mt-4",
              children: [n.jsx("span", {
                className: "font-serif text-xl text-[#f4efe2] block",
                children: "Miguel Perez"
              }), n.jsx("span", {
                className: "mono-label text-[#c9a24a] text-[10px]",
                children: "South Florida Real Estate Advisor"
              }), n.jsx("div", {
                className: "text-[10px] font-mono text-[#f4efe2]/50 mt-1",
                children: "ABR\xAE \xB7 SRS \xB7 PSA \xB7 SFR\xAE \xB7 FL License #SL3515849"
              })]
            })]
          }), n.jsxs("div", {
            className: "lg:col-span-7 space-y-6",
            children: [n.jsx("span", {
              className: "mono-label text-[#c9a24a]",
              children: "The Perspective"
            }), n.jsxs("h2", {
              className: "font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight",
              children: ["Miami shaped my ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "Perspective"
              }), "."]
            }), n.jsx("p", {
              className: "text-sm sm:text-base text-[#f4efe2]/85 font-light leading-relaxed",
              children: "Growing up in South Florida, I didn't learn real estate from a textbook or a weekend seminar. I watched Brickell rise into a global financial powerhouse, witnessed the canal neighborhoods of Fort Lauderdale evolve into yachting epicenters, and tracked how infrastructure decisions alter neighborhood values for decades."
            }), n.jsx("p", {
              className: "text-sm sm:text-base text-[#f4efe2]/85 font-light leading-relaxed",
              children: "When clients work with me, they don't get sales pitches or generic MLS printouts. They get candid, unvarnished advice. If a view corridor is at risk of being blocked by a future tower, I tell them. If an HOA reserve fund is undercapitalized, we walk away. If a waterfront home is overpriced for its bridge clearance, we negotiate accordingly."
            }), n.jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4",
              children: [n.jsxs("div", {
                className: "p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]",
                children: [n.jsx("span", {
                  className: "font-serif text-lg text-[#ffd9a0] block",
                  children: "Local Native Authority"
                }), n.jsx("p", {
                  className: "text-xs text-[#f4efe2]/75 font-light mt-1",
                  children: "Firsthand knowledge of canal depths, micro-neighborhoods, and historical cycle trends."
                })]
              }), n.jsxs("div", {
                className: "p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]",
                children: [n.jsx("span", {
                  className: "font-serif text-lg text-[#ffd9a0] block",
                  children: "Institutional Advisory"
                }), n.jsx("p", {
                  className: "text-xs text-[#f4efe2]/75 font-light mt-1",
                  children: "Rigorous financial underwriting, HOA auditing, and contract negotiation protecting client capital."
                })]
              })]
            }), n.jsxs("div", {
              className: "pt-4 flex flex-wrap gap-4",
              children: [n.jsxs("button", {
                onClick: () => m("general",
                  "I would like to schedule a private advisory consultation with Miguel."
                  ),
                className: "btn btn--gold",
                children: [n.jsx("span", {
                  children: "Book a Consultation"
                }), n.jsx(ue, {
                  className: "w-4 h-4"
                })]
              }), n.jsxs("a", {
                href: "tel:+17864601023",
                className: "btn",
                children: [n.jsx(Cl, {
                  className: "w-3.5 h-3.5"
                }), n.jsx("span", {
                  children: "Call Miguel (786) 460-1023"
                })]
              })]
            })]
          })]
        })
      })
    }), n.jsx("section", {
      className: "py-16 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]",
      children: n.jsxs("div", {
        className: "wrap",
        children: [n.jsxs("div", {
          className: "text-center max-w-2xl mx-auto mb-10",
          children: [n.jsx("span", {
            className: "mono-label text-[#c9a24a]",
            children: "Certifications & Industry Designations"
          }), n.jsxs("h3", {
            className: "font-serif text-2xl sm:text-3xl text-[#f4efe2] mt-1",
            children: ["Qualified at the ", n.jsx("em", {
              className: "it text-[#ffd9a0]",
              children: "Highest"
            }), " Level"]
          })]
        }), n.jsx("div", {
          className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
          children: [{
            code: "ABR\xAE",
            title: "Accredited Buyer's Representative",
            desc: "Specialized fiduciary negotiation training for high-value acquisitions."
          }, {
            code: "SRS",
            title: "Seller Representative Specialist",
            desc: "Advanced marketing, positioning, and contract defense for sellers."
          }, {
            code: "PSA",
            title: "Pricing Strategy Advisor",
            desc: "Micro-market valuation, comparative market analysis, and appraisal compliance."
          }, {
            code: "SFR\xAE",
            title: "Short Sales & Foreclosure Resource",
            desc: "Distressed asset, bank negotiations, and specialized workouts."
          }].map((u, d) => n.jsxs("div", {
            className: "p-5 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] text-center",
            children: [n.jsx("span", {
              className: "font-mono text-base text-[#c9a24a] font-bold block mb-1",
              children: u.code
            }), n.jsx("span", {
              className: "font-serif text-sm text-[#f4efe2] block font-medium",
              children: u.title
            }), n.jsx("p", {
              className: "text-[11px] text-[#f4efe2]/60 font-light mt-2",
              children: u.desc
            })]
          }, d))
        })]
      })
    })]
  });
}
export {
  AboutView as
  default
};
