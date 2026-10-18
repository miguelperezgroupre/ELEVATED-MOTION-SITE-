// @ts-nocheck
/**
 * DevelopmentsView — preview build with the shared <PageHero /> (same system as the homepage hero).
 *
 * The original source file for this view could not be retrieved through the Vercel connector
 * (deployment file contents are truncated), so this module was reconstructed from the deployed
 * production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ, Oct 7 2026). Everything below the hero is
 * behaviourally identical to production; only the page hero section was replaced.
 * When the real source is available, apply the same change there: delete the old hero <section>
 * and render <PageHero page="developments" onOpenContact={onOpenContact} /> in its place.
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import {
  MapPin as Ss,
  ArrowRight as ue,
  X as Ta,
  CircleCheck as Ns
} from "lucide-react";
import {
  DEVELOPMENTS as Nn
} from "../../data";
import PageHero from "../PageHero";

function DevelopmentsView({
  onOpenContact: m
}) {
  const [u, d] = R.useState("all"), [c, x] = R.useState(null), g = R.useMemo(() => u === "all" ? Nn : Nn.filter((A) => A
    .area === u), [u]), C = [{
    id: "all",
    label: "All Developments"
  }, {
    id: "sunnyisles",
    label: "Sunny Isles Beach"
  }, {
    id: "edgewater",
    label: "Edgewater"
  }, {
    id: "brickell",
    label: "Brickell"
  }, {
    id: "miami",
    label: "Downtown Miami"
  }, {
    id: "ftl",
    label: "Fort Lauderdale"
  }];
  return n.jsxs("div", {
    className: "pb-20 animate-fadeIn",
    children: [n.jsx(PageHero, {
      page: "developments",
      onOpenContact: m
    }), n.jsx("section", {
      className: "py-8 border-b border-[rgba(244,239,226,0.08)] bg-[#101618] sticky top-16 z-30 backdrop-blur-md bg-[#101618]/95",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsx("div", {
          className: "flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none",
          children: C.map((A) => n.jsx("button", {
            onClick: () => d(A.id),
            className: `px-5 py-2.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${u === A.id ? "border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0]" : "border-[rgba(244,239,226,0.1)] text-[#f4efe2]/70 hover:text-[#f4efe2] hover:border-[#f4efe2]/30"}`,
            children: A.label
          }, A.id))
        })
      })
    }), n.jsx("section", {
      className: "py-16 bg-[#0B0B0B]",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: g.map((A) => n.jsxs("div", {
            onClick: () => x(A),
            className: "group bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between",
            children: [n.jsxs("div", {
              className: "relative aspect-[16/10] overflow-hidden",
              children: [n.jsx("img", {
                src: A.img,
                alt: A.name,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              }), n.jsx("div", {
                className: "absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]",
                children: A.status
              }), n.jsx("div", {
                className: "absolute bottom-3 right-3 bg-[#0B0B0B]/90 px-3 py-1 font-mono text-sm text-[#ffd9a0] font-bold border border-[#c9a24a]",
                children: A.from
              })]
            }), n.jsxs("div", {
              className: "p-6 flex-1 flex flex-col justify-between space-y-4",
              children: [n.jsxs("div", {
                children: [n.jsxs("div", {
                  className: "font-mono text-xs text-[#c9a24a] uppercase tracking-wider mb-1 flex items-center gap-1.5",
                  children: [n.jsx(Ss, {
                    className: "w-3.5 h-3.5"
                  }), n.jsx("span", {
                    children: A.loc
                  })]
                }), n.jsx("h3", {
                  className: "font-serif text-2xl sm:text-3xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors",
                  children: A.name
                }), n.jsx("p", {
                  className: "text-xs text-[#f4efe2]/70 font-light mt-2 line-clamp-2 leading-relaxed",
                  children: A.desc
                })]
              }), n.jsxs("div", {
                className: "pt-4 border-t border-[rgba(244,239,226,0.08)] space-y-2 text-xs font-mono",
                children: [n.jsxs("div", {
                  className: "flex justify-between text-[#f4efe2]/70",
                  children: [n.jsx("span", {
                    children: "Developer:"
                  }), n.jsx("span", {
                    className: "text-[#f4efe2]",
                    children: A.dev
                  })]
                }), n.jsxs("div", {
                  className: "flex justify-between text-[#f4efe2]/70",
                  children: [n.jsx("span", {
                    children: "Completion:"
                  }), n.jsx("span", {
                    className: "text-[#c9a24a]",
                    children: A.year
                  })]
                })]
              }), n.jsxs("button", {
                className: "btn w-full justify-between py-2.5 text-xs",
                children: [n.jsx("span", {
                  children: "View Project Dossier"
                }), n.jsx(ue, {
                  className: "w-3.5 h-3.5"
                })]
              })]
            })]
          }, A.id))
        })
      })
    }), n.jsx("section", {
      className: "py-20 border-t border-[rgba(244,239,226,0.1)] bg-[#101618]",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          children: [n.jsxs("div", {
            children: [n.jsx("span", {
              className: "eyebrow eyebrow--dot",
              children: "Direct Developer Representation"
            }), n.jsxs("h2", {
              className: "font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight mt-3",
              children: ["Why navigate pre-construction with ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "Miguel"
              }), "?"]
            }), n.jsx("p", {
              className: "text-base text-[#f4efe2]/80 font-light mt-6 leading-relaxed",
              children: "Developer sales galleries work exclusively for the developer. Miguel serves as your independent fiduciary advocate \u2014 negotiating contract modifications, floor plan combinations, parking allocations, and deposit incentives at zero cost to the buyer."
            })]
          }), n.jsx("div", {
            className: "space-y-4",
            children: [{
              title: "Tier 1 Friends & Family Pricing",
              desc: "Access early reservation rounds before public marketing increases prices across stack tiers."
            }, {
              title: "Deposit Structure Analysis",
              desc: "Comprehensive review of developer milestone escrow accounts, financing contingencies, and assignment clauses."
            }, {
              title: "Floor Plan & View Corridor Audits",
              desc: "Using architectural models and municipal zoning maps to confirm no future adjacent towers will obstruct your view."
            }].map((A, _) => n.jsxs("div", {
              className: "p-5 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]",
              children: [n.jsx("h4", {
                className: "font-serif text-lg text-[#ffd9a0]",
                children: A.title
              }), n.jsx("p", {
                className: "text-xs text-[#f4efe2]/75 font-light mt-1 leading-relaxed",
                children: A.desc
              })]
            }, _))
          })]
        })
      })
    }), c && n.jsxs("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn",
      children: [n.jsx("div", {
        className: "fixed inset-0",
        onClick: () => x(null)
      }), n.jsxs("div", {
        className: "relative w-full max-w-4xl bg-[#141a1d] border border-[#c9a24a] shadow-2xl p-6 sm:p-10 z-10 my-auto overflow-hidden",
        children: [n.jsx("button", {
          onClick: () => x(null),
          className: "absolute top-4 right-4 text-[#f4efe2]/60 hover:text-[#c9a24a] p-1 cursor-pointer",
          children: n.jsx(Ta, {
            className: "w-6 h-6"
          })
        }), n.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-8",
          children: [n.jsxs("div", {
            className: "space-y-4",
            children: [n.jsx("div", {
              className: "aspect-[4/3] overflow-hidden",
              children: n.jsx("img", {
                src: c.img,
                alt: c.name,
                className: "w-full h-full object-cover"
              })
            }), n.jsxs("div", {
              className: "p-4 bg-[#0B0B0B] border border-[rgba(244,239,226,0.1)]",
              children: [n.jsx("span", {
                className: "mono-label text-[#c9a24a]",
                children: "Deposit Milestones"
              }), n.jsx("p", {
                className: "text-xs text-[#f4efe2]/80 font-mono mt-1",
                children: c.depositStructure ||
                  "10% Contract, 10% Groundbreaking, 10% Top-Off, 70% Closing"
              })]
            })]
          }), n.jsxs("div", {
            className: "space-y-6 flex flex-col justify-between",
            children: [n.jsxs("div", {
              children: [n.jsx("span", {
                className: "mono-label text-[#c9a24a]",
                children: c.loc
              }), n.jsx("h3", {
                className: "font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal leading-snug",
                children: c.name
              }), n.jsx("div", {
                className: "font-mono text-2xl text-[#ffd9a0] font-bold mt-1",
                children: c.from
              }), n.jsx("p", {
                className: "text-xs sm:text-sm text-[#f4efe2]/80 font-light mt-4 leading-relaxed",
                children: c.desc
              }), c.amenities && n.jsxs("div", {
                className: "mt-6",
                children: [n.jsx("span", {
                  className: "mono-label text-[#ffd9a0] block mb-2",
                  children: "Signature Amenities"
                }), n.jsx("div", {
                  className: "space-y-1.5",
                  children: c.amenities.map((A, _) => n.jsxs("div", {
                    className: "flex items-center gap-2 text-xs text-[#f4efe2]/80 font-light",
                    children: [n.jsx(Ns, {
                      className: "w-3.5 h-3.5 text-[#c9a24a] shrink-0"
                    }), n.jsx("span", {
                      children: A
                    })]
                  }, _))
                })]
              }), c.roiHighlights && n.jsxs("div", {
                className: "mt-4 p-3 bg-[#0B0B0B] border border-[#c9a24a]/30",
                children: [n.jsx("span", {
                  className: "mono-label text-[#ffd9a0] block text-[10px]",
                  children: "Investment & ROI Analysis:"
                }), n.jsx("p", {
                  className: "text-xs text-[#f4efe2]/80 font-light mt-1",
                  children: c.roiHighlights
                })]
              })]
            }), n.jsx("div", {
              className: "space-y-3 pt-2",
              children: n.jsxs("button", {
                onClick: () => {
                  const A = c.name;
                  x(null), m("development",
                    `I would like to request floor plans and pricing availability for ${A}.`
                    );
                },
                className: "btn btn--gold w-full justify-center text-xs",
                children: [n.jsx("span", {
                  children: "Request Floor Plans & Availability"
                }), n.jsx(ue, {
                  className: "w-4 h-4"
                })]
              })
            })]
          })]
        })]
      })]
    })]
  });
}
export {
  DevelopmentsView as
  default
};
