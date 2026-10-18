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
 *
 * Oct 2026 data update: the profile stats and directory cards now show verified median sale price and
 * median $/sq ft per area (from ../../neighborhoodData, with source + period captions), the unsourced
 * Avg $/Sq Ft, Median Price and Walk Score figures were removed, and a Sources section was added.
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import {
  ArrowRight as ue
} from "lucide-react";
import {
  NEIGHBORHOODS as js
} from "../../data";
import {
  DATA_AS_OF,
  DATA_DISCLAIMER,
  areaLabel,
  priceCaption,
  priceNotes
} from "../../neighborhoodData";
import PageHero from "../PageHero";

function NeighborhoodsView({
  onOpenContact: m
}) {
  const [u, d] = R.useState("all"), [c, x] = R.useState(js[0]), g = R.useMemo(() => u === "all" ? js : js.filter((C) =>
    C.region.toLowerCase().includes(u.toLowerCase())), [u]);
  // every price row used on this page, in page order, for the Sources section
  const sources = R.useMemo(() => {
    const out = [];
    js.forEach((N) => N.prices.forEach((P) => {
      if (!out.includes(P)) out.push(P);
    }));
    return out;
  }, []);
  const toSources = () => (document.getElementById("neighborhood-sources") || {
    scrollIntoView() {}
  }).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
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
              className: "py-4 border-y border-[rgba(244,239,226,0.1)] font-mono",
              "data-stats": "neighborhood",
              children: [n.jsxs("div", {
                className: "grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 sm:gap-x-6 gap-y-2 items-baseline",
                children: [n.jsx("span", {
                  className: "text-[#f4efe2]/50 text-[10px]",
                  children: "Area"
                }), n.jsx("span", {
                  className: "text-[#f4efe2]/50 text-[10px] text-right",
                  children: "Median Sale Price"
                }), n.jsx("span", {
                  className: "text-[#f4efe2]/50 text-[10px] text-right",
                  children: "Median $/Sq Ft"
                }), c.prices.flatMap((P) => [n.jsxs("span", {
                  className: "text-xs text-[#f4efe2]/80 leading-snug",
                  children: [areaLabel(P), P.src !== "Redfin" ? n.jsxs("span", {
                    className: "text-[#f4efe2]/45",
                    children: [" \u00b7 ", P.src]
                  }) : null]
                }, P.area + "-a"), n.jsx("b", {
                  className: "text-base sm:text-lg text-[#f4efe2] text-right",
                  children: P.median
                }, P.area + "-m"), n.jsx("b", {
                  className: "text-base sm:text-lg text-[#ffd9a0] text-right",
                  children: P.ppsf
                }, P.area + "-p")])]
              }), n.jsx("p", {
                className: "text-[10px] text-[#f4efe2]/55 leading-relaxed mt-3",
                children: priceCaption(c.prices)
              }), priceNotes(c.prices).map((T) => n.jsx("p", {
                className: "text-[10px] text-[#f4efe2]/45 leading-relaxed mt-1",
                children: T
              }, T)), n.jsx("button", {
                type: "button",
                onClick: toSources,
                className: "text-[10px] text-[#c9a24a] hover:text-[#ffd9a0] underline underline-offset-2 mt-2 cursor-pointer",
                children: "Sources & data notes \u2193"
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
            }), n.jsxs("div", {
              className: "space-y-1.5",
              children: [n.jsx("span", {
                className: "mono-label text-[#ffd9a0] block text-[10px]",
                children: "Best For:"
              }), c.bestFor.map((C, A) => n.jsxs("div", {
                className: "flex items-center gap-2 text-xs text-[#f4efe2]/80 font-light",
                children: [n.jsx("div", {
                  className: "w-1.5 h-1.5 rounded-full border border-[#c9a24a]"
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
            }), n.jsxs("p", {
              className: "font-mono text-[10px] text-[#f4efe2]/55 mt-2 leading-relaxed",
              children: ["Card figures: median sale price and median $/sq ft for the area named on each card, all home types. ", n.jsx("button", {
                type: "button",
                onClick: toSources,
                className: "text-[#c9a24a] hover:text-[#ffd9a0] underline underline-offset-2 cursor-pointer",
                children: "Sources & periods"
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
                children: [C.prices[0].median, C.prices[0].small ? "*" : "", " median \u00b7 ", C.prices[0].ppsf, "/sq ft"]
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
                children: [n.jsx("span", {
                  className: "font-mono text-[10px] text-[#c9a24a] leading-snug pr-3",
                  children: `${areaLabel(C.prices[0])} \u00b7 ${C.prices[0].src}`
                }), n.jsx("span", {
                  className: "text-xs font-mono text-[#f4efe2]/70 group-hover:text-[#f4efe2] flex items-center gap-1 whitespace-nowrap",
                  children: "View Profile \u2192"
                })]
              })]
            })]
          }, C.id))
        })]
      })
    }), n.jsx("section", {
      className: "py-16 border-t border-[rgba(244,239,226,0.08)] bg-[#0B0B0B] scroll-mt-36",
      id: "neighborhood-sources",
      children: n.jsxs("div", {
        className: "wrap",
        children: [n.jsx("span", {
          className: "mono-label",
          children: "Sources & Data Notes"
        }), n.jsxs("h3", {
          className: "font-serif text-3xl text-[#f4efe2]",
          children: ["Where the ", n.jsx("em", {
            className: "it text-[#ffd9a0]",
            children: "numbers"
          }), " come from"]
        }), n.jsxs("p", {
          className: "text-sm text-[#f4efe2]/75 font-light leading-relaxed mt-4 max-w-3xl",
          children: ["Figures are median sale price and median price per square foot, all home types, compiled ", DATA_AS_OF, " from the public market pages linked below. Redfin figures cover the 3 months through August 2026 unless marked as the September 2026 update; the Galt Mile figure is Realtor.com\u2019s median sold price. Medians move from month to month, especially where few homes sell, and they describe what sold, not what any given home is worth."]
        }), n.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-8 border-t border-[rgba(244,239,226,0.08)]",
          children: sources.map((P) => n.jsxs("div", {
            className: "py-3 border-b border-[rgba(244,239,226,0.08)] font-mono text-xs",
            children: [n.jsxs("div", {
              className: "flex items-baseline justify-between gap-4",
              children: [n.jsx("span", {
                className: "text-[#f4efe2]",
                children: areaLabel(P)
              }), n.jsxs("span", {
                className: "text-[#ffd9a0] whitespace-nowrap",
                children: [P.median, " \u00b7 ", P.ppsf, "/sq ft"]
              })]
            }), n.jsxs("div", {
              className: "flex items-baseline justify-between gap-4 mt-1 text-[10px] text-[#f4efe2]/55",
              children: [n.jsxs("span", {
                children: [P.src, ", ", P.period]
              }), n.jsxs("a", {
                href: P.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-[#c9a24a] hover:text-[#ffd9a0] underline underline-offset-2 whitespace-nowrap",
                children: [P.src === "Redfin" ? "redfin.com" : "realtor.com", " \u2197"]
              })]
            })]
          }, P.area))
        }), n.jsx("div", {
          className: "mt-6 space-y-1 font-mono text-[10px] text-[#f4efe2]/55 leading-relaxed",
          children: priceNotes(sources).map((T) => n.jsx("p", {
            children: T
          }, T))
        }), n.jsx("p", {
          className: "mt-6 font-mono text-xs text-[#f4efe2]/80",
          children: DATA_DISCLAIMER
        })]
      })
    })]
  });
}
export {
  NeighborhoodsView as
  default
};
