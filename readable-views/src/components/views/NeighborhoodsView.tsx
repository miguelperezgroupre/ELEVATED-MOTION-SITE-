// @ts-nocheck
/**
 * NeighborhoodsView — preview build with the shared <PageHero /> (same system as the homepage hero).
 *
 * The original source file for this view could not be retrieved through the Vercel connector
 * (deployment file contents are truncated), so this module was reconstructed from the deployed
 * production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ, Oct 7 2026). Everything below the hero is
 * behaviourally identical to production; only the page hero section was replaced.
 * When the real source is available, apply the same change there: delete the old hero <section>
 * and render <PageHero page="neighborhoods" onOpenContact={onOpenContact} /> in its place.
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import {
  ArrowRight as ue
} from "lucide-react";
import {
  NEIGHBORHOODS as js
} from "../../data";
import PageHero from "../PageHero";

function NeighborhoodsView({
  onOpenContact: m
}) {
  const [u, d] = R.useState("all"), [c, x] = R.useState(js[0]), g = R.useMemo(() => u === "all" ? js : js.filter((C) =>
    C.region.toLowerCase().includes(u.toLowerCase())), [u]);
  return n.jsxs("div", {
    className: "pb-20 animate-fadeIn",
    children: [n.jsx(PageHero, {
      page: "neighborhoods",
      onOpenContact: m
    }), n.jsx("section", {
      className: "py-6 border-b border-[rgba(244,239,226,0.08)] bg-[#101618] sticky top-16 z-30 backdrop-blur-md bg-[#101618]/95",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsx("div", {
          className: "flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none",
          children: [{
            id: "all",
            label: "All Communities"
          }, {
            id: "miami-dade",
            label: "Miami-Dade County"
          }, {
            id: "broward",
            label: "Broward / Fort Lauderdale"
          }, {
            id: "palm beach",
            label: "Palm Beach"
          }].map((C) => n.jsx("button", {
            onClick: () => d(C.id),
            className: `px-5 py-2.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${u === C.id ? "border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0]" : "border-[rgba(244,239,226,0.1)] text-[#f4efe2]/70 hover:text-[#f4efe2] hover:border-[#f4efe2]/30"}`,
            children: C.label
          }, C.id))
        })
      })
    }), n.jsx("section", {
      className: "py-16 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B] scroll-mt-36",
      id: "neighborhood-profile",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141a1d] border border-[rgba(201,162,74,0.3)] p-6 sm:p-10 shadow-2xl",
          children: [n.jsxs("div", {
            className: "lg:col-span-6 relative aspect-[16/11] overflow-hidden",
            children: [n.jsx("img", {
              src: c.img,
              alt: c.name,
              className: "w-full h-full object-cover transition-all duration-700"
            }), n.jsx("div", {
              className: "absolute top-4 left-4 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-xs text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]",
              children: c.region
            })]
          }), n.jsxs("div", {
            className: "lg:col-span-6 space-y-6",
            children: [n.jsxs("div", {
              children: [n.jsx("span", {
                className: "mono-label text-[#c9a24a]",
                children: "Featured Neighborhood Profile"
              }), n.jsx("h2", {
                className: "font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight mt-1",
                children: c.name
              }), n.jsx("p", {
                className: "font-serif text-lg text-[#ffd9a0] italic mt-1",
                children: c.tagline
              })]
            }), n.jsx("p", {
              className: "text-sm text-[#f4efe2]/80 font-light leading-relaxed",
              children: c.description
            }), n.jsxs("div", {
              className: "grid grid-cols-3 gap-3 py-4 border-y border-[rgba(244,239,226,0.1)] text-center font-mono",
              children: [n.jsxs("div", {
                children: [n.jsx("span", {
                  className: "text-[#f4efe2]/50 text-[10px] block",
                  children: "Avg $/Sq Ft"
                }), n.jsxs("b", {
                  className: "text-base sm:text-lg text-[#ffd9a0]",
                  children: ["$", c.avgPriceSqft]
                })]
              }), n.jsxs("div", {
                children: [n.jsx("span", {
                  className: "text-[#f4efe2]/50 text-[10px] block",
                  children: "Median Price"
                }), n.jsx("b", {
                  className: "text-base sm:text-lg text-[#f4efe2]",
                  children: c.medianPrice
                })]
              }), n.jsxs("div", {
                children: [n.jsx("span", {
                  className: "text-[#f4efe2]/50 text-[10px] block",
                  children: "Walk Score"
                }), n.jsxs("b", {
                  className: "text-base sm:text-lg text-[#c9a24a]",
                  children: [c.walkScore, "/100"]
                })]
              })]
            }), n.jsxs("div", {
              className: "space-y-1.5",
              children: [n.jsx("span", {
                className: "mono-label text-[#ffd9a0] block text-[10px]",
                children: "Key Enclave Highlights:"
              }), c.keyHighlights.map((C, A) => n.jsxs("div", {
                className: "flex items-center gap-2 text-xs text-[#f4efe2]/80 font-light",
                children: [n.jsx("div", {
                  className: "w-1.5 h-1.5 rounded-full bg-[#c9a24a]"
                }), n.jsx("span", {
                  children: C
                })]
              }, A))]
            }), n.jsx("div", {
              className: "pt-2",
              children: n.jsxs("button", {
                onClick: () => m("general",
                  `I would like to explore property opportunities in ${c.name}.`),
                className: "btn btn--gold w-full sm:w-auto",
                children: [n.jsxs("span", {
                  children: ["Explore Properties in ", c.name]
                }), n.jsx(ue, {
                  className: "w-4 h-4"
                })]
              })
            })]
          })]
        })
      })
    }), n.jsx("section", {
      className: "py-20 bg-[#101618]",
      children: n.jsxs("div", {
        className: "wrap",
        children: [n.jsx("div", {
          className: "flex items-center justify-between mb-10",
          children: n.jsxs("div", {
            children: [n.jsx("span", {
              className: "mono-label",
              children: "Editorial Directory"
            }), n.jsxs("h3", {
              className: "font-serif text-3xl text-[#f4efe2]",
              children: ["All Featured ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "Communities"
              })]
            })]
          })
        }), n.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: g.map((C) => n.jsxs("div", {
            onClick: () => {
              x(C), (document.getElementById("neighborhood-profile") || {
                scrollIntoView() {}
              }).scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            },
            className: `bg-[#141a1d] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group ${c.id === C.id ? "border-[#c9a24a]" : "border-[rgba(244,239,226,0.1)] hover:border-[#f4efe2]/40"}`,
            children: [n.jsxs("div", {
              className: "relative aspect-[16/10] overflow-hidden",
              children: [n.jsx("img", {
                src: C.img,
                alt: C.name,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              }), n.jsx("div", {
                className: "absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]",
                children: C.region
              }), n.jsxs("div", {
                className: "absolute bottom-3 right-3 bg-[#0B0B0B]/90 px-3 py-1 font-mono text-xs text-[#ffd9a0] font-bold border border-[#c9a24a]",
                children: ["$", C.avgPriceSqft, " / sqft"]
              })]
            }), n.jsxs("div", {
              className: "p-6 flex-1 flex flex-col justify-between space-y-4",
              children: [n.jsxs("div", {
                children: [n.jsx("h4", {
                  className: "font-serif text-2xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors",
                  children: C.name
                }), n.jsx("p", {
                  className: "font-serif text-xs text-[#ffd9a0] italic mt-0.5",
                  children: C.tagline
                }), n.jsx("p", {
                  className: "text-xs text-[#f4efe2]/75 font-light mt-3 leading-relaxed line-clamp-2",
                  children: C.vibe
                })]
              }), n.jsxs("div", {
                className: "pt-4 border-t border-[rgba(244,239,226,0.08)] flex items-center justify-between",
                children: [n.jsxs("span", {
                  className: "font-mono text-xs text-[#c9a24a]",
                  children: ["Walk Score: ", C.walkScore]
                }), n.jsx("span", {
                  className: "text-xs font-mono text-[#f4efe2]/70 group-hover:text-[#f4efe2] flex items-center gap-1",
                  children: "View Profile \u2192"
                })]
              })]
            })]
          }, C.id))
        })]
      })
    })]
  });
}
export {
  NeighborhoodsView as
  default
};
