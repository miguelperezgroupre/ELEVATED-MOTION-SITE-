// @ts-nocheck
/**
 * RelocateView — preview build with the shared <PageHero /> (same system as the homepage hero).
 *
 * The original source file for this view could not be retrieved through the Vercel connector
 * (deployment file contents are truncated), so this module was reconstructed from the deployed
 * production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ, Oct 7 2026). Everything below the hero is
 * behaviourally identical to production; only the page hero section was replaced.
 * When the real source is available, apply the same change there: delete the old hero <section>
 * and render <PageHero page="relocate" onOpenContact={onOpenContact} /> in its place.
 *
 * Oct 2026 data + fair-housing update: result cards show the verified median sale price and median $/sq ft
 * (with area/source/period caption) instead of the unsourced Walk Score and Avg Price / Sq Ft; the
 * "Top Schools & Family" pillar became "Parks & Green Space", "High Walk Score" became "Walkable Streets",
 * and the "School & Family Alignment" playbook step became "Commute & Daily-Life Mapping".
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import {
  Waves as jb,
  Building2 as Sn,
  Activity as vp,
  Sparkles as ir,
  Compass as sr,
  DollarSign as Xp,
  Trees as pb,
  Sun as xb,
  ArrowRight as ue
} from "lucide-react";
import {
  NEIGHBORHOODS as js
} from "../../data";
import {
  areaLabel
} from "../../neighborhoodData";
import PageHero from "../PageHero";

function RelocateView({
  onOpenContact: m,
  onSelectNeighborhood: u
}) {
  const [d, c] = R.useState(["waterfront", "walkability"]), [x, g] = R.useState("New York"), C = (E) => {
    c((v) => v.includes(E) ? v.filter((f) => f !== E) : [...v, E]);
  }, A = R.useMemo(() => js.map((E) => {
    let v = 0;
    d.forEach((w) => {
      E.lifestylePillars.includes(w) && v++;
    });
    const f = d.length > 0 ? Math.round(v / d.length * 100) : 75;
    return {
      ...E,
      matchScore: f
    };
  }).sort((E, v) => v.matchScore - E.matchScore), [d]), _ = [{
    id: "beach",
    label: "Beach Access",
    icon: jb
  }, {
    id: "city",
    label: "Metropolitan / Skyline",
    icon: Sn
  }, {
    id: "parks",
    label: "Parks & Green Space",
    icon: vp
  }, {
    id: "nightlife",
    label: "Michelin Dining & Nightlife",
    icon: ir
  }, {
    id: "waterfront",
    label: "Deep-Water & Boating",
    icon: sr
  }, {
    id: "investment",
    label: "Capital Appreciation",
    icon: Xp
  }, {
    id: "quiet",
    label: "Tranquil & Gated Privacy",
    icon: pb
  }, {
    id: "walkability",
    label: "Walkable Streets",
    icon: xb
  }];
  return n.jsxs("div", {
    className: "pb-20 animate-fadeIn",
    children: [n.jsx(PageHero, {
      page: "relocate",
      onOpenContact: m
    }), n.jsx("section", {
      id: "lifestyle-quiz",
      className: "py-16 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]",
      children: n.jsxs("div", {
        className: "wrap",
        children: [n.jsxs("div", {
          className: "text-center max-w-2xl mx-auto mb-10",
          children: [n.jsx("span", {
            className: "mono-label text-[#c9a24a]",
            children: "Interactive Decision Path"
          }), n.jsxs("h2", {
            className: "font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal mt-2",
            children: ["What matters ", n.jsx("em", {
              className: "it text-[#ffd9a0]",
              children: "Most"
            }), " to you?"]
          }), n.jsx("p", {
            className: "text-xs sm:text-sm text-[#f4efe2]/70 font-light mt-2",
            children: "Select your essential lifestyle pillars. Our algorithm will dynamically evaluate and rank South Florida's premier neighborhoods for your profile."
          })]
        }), n.jsx("div", {
          className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 max-w-5xl mx-auto",
          children: _.map((E) => {
            const v = d.includes(E.id),
              f = E.icon;
            return n.jsxs("button", {
              onClick: () => C(E.id),
              className: `p-3.5 flex flex-col items-center justify-center text-center border transition-all cursor-pointer ${v ? "border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0] shadow-lg" : "border-[rgba(244,239,226,0.1)] bg-[#141a1d] text-[#f4efe2]/60 hover:text-[#f4efe2] hover:border-[#f4efe2]/30"}`,
              children: [n.jsx(f, {
                className: `w-5 h-5 mb-2 ${v ? "text-[#ffd9a0]" : "text-[#c9a24a]"}`
              }), n.jsx("span", {
                className: "font-mono text-[11px] uppercase tracking-wider font-medium",
                children: E.label
              })]
            }, E.id);
          })
        }), n.jsxs("div", {
          className: "mt-14",
          children: [n.jsxs("div", {
            className: "flex items-center justify-between mb-6",
            children: [n.jsxs("div", {
              children: [n.jsx("span", {
                className: "mono-label",
                children: "Matched Enclaves"
              }), n.jsxs("h3", {
                className: "font-serif text-2xl text-[#f4efe2]",
                children: ["Top Recommended ", n.jsx("em", {
                  className: "it text-[#ffd9a0]",
                  children: "Enclaves"
                })]
              })]
            }), n.jsxs("span", {
              className: "font-mono text-xs text-[#c9a24a]",
              children: ["Showing top matches for (", d.length, ") active priorities"]
            })]
          }), n.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            children: A.slice(0, 6).map((E) => n.jsxs("div", {
              className: "bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all overflow-hidden flex flex-col justify-between group",
              children: [n.jsxs("div", {
                className: "relative aspect-[16/10] overflow-hidden",
                children: [n.jsx("img", {
                  src: E.img,
                  alt: E.name,
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                }), n.jsx("div", {
                  className: "absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]",
                  children: E.region
                }), n.jsxs("div", {
                  className: "absolute bottom-3 right-3 bg-[#0B0B0B]/90 px-3 py-1 font-mono text-xs text-[#ffd9a0] font-bold border border-[#c9a24a]",
                  children: [E.matchScore, "% Match"]
                })]
              }), n.jsxs("div", {
                className: "p-6 flex-1 flex flex-col justify-between space-y-4",
                children: [n.jsxs("div", {
                  children: [n.jsxs("div", {
                    className: "font-mono text-xs text-[#c9a24a] uppercase tracking-wider mb-1",
                    children: ["Median Sale Price: ", E.prices[0].median, E.prices[0].small ? "*" : ""]
                  }), n.jsx("h4", {
                    className: "font-serif text-2xl text-[#f4efe2]",
                    children: E.name
                  }), n.jsx("p", {
                    className: "font-serif text-xs text-[#ffd9a0] italic mt-0.5",
                    children: E.tagline
                  }), n.jsx("p", {
                    className: "text-xs text-[#f4efe2]/75 font-light mt-3 leading-relaxed",
                    children: E.vibe
                  })]
                }), n.jsxs("div", {
                  className: "pt-4 border-t border-[rgba(244,239,226,0.08)]",
                  children: [n.jsxs("div", {
                    className: "flex justify-between items-center text-xs font-mono text-[#f4efe2]/70 mb-3",
                    children: [n.jsx("span", {
                      children: "Median $/Sq Ft:"
                    }), n.jsx("span", {
                      className: "text-[#ffd9a0] font-bold",
                      children: E.prices[0].ppsf
                    })]
                  }), n.jsx("p", {
                    className: "font-mono text-[10px] text-[#f4efe2]/50 leading-relaxed -mt-1 mb-3",
                    children: `All home types \u00b7 ${areaLabel(E.prices[0])} \u00b7 ${E.prices[0].src}, ${E.prices[0].period}`
                  }), n.jsxs("button", {
                    onClick: () => m("relocation",
                      `I am interested in relocating to ${E.name} based on the Lifestyle Match.`
                      ),
                    className: "w-full btn btn--gold justify-center py-2.5 text-xs",
                    children: [n.jsxs("span", {
                      children: ["Explore Homes in ", E.name]
                    }), n.jsx(ue, {
                      className: "w-3.5 h-3.5"
                    })]
                  })]
                })]
              })]
            }, E.id))
          })]
        })]
      })
    }), n.jsx("section", {
      className: "py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          children: [n.jsxs("div", {
            children: [n.jsx("span", {
              className: "eyebrow eyebrow--dot",
              children: "Seamless Transition"
            }), n.jsxs("h2", {
              className: "font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight mt-3",
              children: ["The Relocation Playbook: Navigating the move with zero ", n.jsx(
                "em", {
                  className: "it text-[#ffd9a0]",
                  children: "Friction"
                }), "."]
            }), n.jsx("p", {
              className: "text-base text-[#f4efe2]/80 font-light mt-6 leading-relaxed",
              children: "Relocating across state lines involves intricate timing: selling your current residence, coordinating school admission deadlines, leasing temporary quarters, and structuring your Florida tax domicile."
            }), n.jsx("div", {
              className: "space-y-4 mt-8",
              children: [{
                title: "01. Tax & Domicile Structuring",
                body: "Establishing Florida statutory residency to take full advantage of 0% state income tax, 0% capital gains tax, and the Florida Homestead Exemption."
              }, {
                title: "02. Commute & Daily-Life Mapping",
                body: "Mapping each neighborhood against your commute, airports, Brightline stations and the amenities you use every week. For schools, we point you to official district and school sources so you can compare them directly."
              }, {
                title: "03. Yacht & Waterfront Access",
                body: "Assessing canal depths, bridge heights (fixed vs. bascule), dockage permits, and proximity to Atlantic ocean inlets."
              }].map((E, v) => n.jsxs("div", {
                className: "p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]",
                children: [n.jsx("h4", {
                  className: "font-serif text-lg text-[#ffd9a0]",
                  children: E.title
                }), n.jsx("p", {
                  className: "text-xs text-[#f4efe2]/75 font-light mt-1 leading-relaxed",
                  children: E.body
                })]
              }, v))
            })]
          }), n.jsxs("div", {
            className: "bg-[#141a1d] border border-[#c9a24a] p-8 sm:p-12 shadow-2xl space-y-6",
            children: [n.jsx("span", {
              className: "mono-label text-[#c9a24a]",
              children: "Personalized Roadmap"
            }), n.jsxs("h3", {
              className: "font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal",
              children: ["Plan Your Move With ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "Miguel"
              })]
            }), n.jsx("p", {
              className: "text-xs sm:text-sm text-[#f4efe2]/80 font-light leading-relaxed",
              children: "Receive a bespoke relocation dossier outlining tailored neighborhood options, school districts, commute calculations, and property candidates."
            }), n.jsxs("div", {
              className: "space-y-4 pt-2",
              children: [n.jsxs("div", {
                className: "field",
                children: [n.jsx("label", {
                  children: "Relocating From (City / State)"
                }), n.jsx("input", {
                  type: "text",
                  value: x,
                  onChange: (E) => g(E.target.value),
                  placeholder: "E.g., New York, Chicago, Los Angeles, London"
                })]
              }), n.jsxs("button", {
                onClick: () => m("relocation",
                  `I am relocating from ${x} to South Florida and would like Miguel's Relocation Dossier.`
                  ),
                className: "btn btn--gold w-full justify-center",
                children: [n.jsx("span", {
                  children: "Plan My Move"
                }), n.jsx(ue, {
                  className: "w-4 h-4"
                })]
              })]
            })]
          })]
        })
      })
    })]
  });
}
export {
  RelocateView as
  default
};
