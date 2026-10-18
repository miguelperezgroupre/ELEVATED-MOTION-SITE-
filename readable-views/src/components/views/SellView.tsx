// @ts-nocheck
/**
 * SellView — preview build with the shared <PageHero /> (same system as the homepage hero).
 *
 * The original source file for this view could not be retrieved through the Vercel connector
 * (deployment file contents are truncated), so this module was reconstructed from the deployed
 * production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ, Oct 7 2026). Everything below the hero is
 * behaviourally identical to production; only the page hero section was replaced.
 * When the real source is available, apply the same change there: delete the old hero <section>
 * and render <PageHero page="sell" onOpenContact={onOpenContact} /> in its place.
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import * as lx__mod from "../HomeValuation";
import {
  ArrowRight as ue
} from "lucide-react";
import {
  CASE_STUDIES as Ih
} from "../../data";
import PageHero from "../PageHero";
const lx = lx__mod.default ?? lx__mod.HomeValuation ?? Object.values(lx__mod).find((x) => typeof x === "function");

function SellView({
  onOpenContact: m
}) {
  const [u, d] = R.useState(0);
  return n.jsxs("div", {
    className: "pb-20 animate-fadeIn",
    children: [n.jsx(PageHero, {
      page: "sell",
      onOpenContact: m
    }), n.jsx("section", {
      className: "py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]",
      children: n.jsxs("div", {
        className: "wrap",
        children: [n.jsxs("div", {
          className: "text-center max-w-2xl mx-auto mb-16",
          children: [n.jsx("span", {
            className: "mono-label",
            children: "The Advisory Difference"
          }), n.jsxs("h2", {
            className: "font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal mt-2",
            children: ["Selling isn't just ", n.jsx("em", {
              className: "it text-[#ffd9a0]",
              children: "Listing"
            }), "."]
          }), n.jsx("p", {
            className: "text-sm sm:text-base text-[#f4efe2]/70 font-light mt-4 leading-relaxed",
            children: "Generic agents take standard photos and post to the MLS, waiting for buyers to appear. Miguel engineers an active campaign designed to create urgency and competition."
          })]
        }), n.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-5 gap-4",
          children: [{
            num: "01",
            title: "Pricing",
            desc: "Micro-level analysis of active absorption rates, square footage premiums, and seasonal buyer cycles."
          }, {
            num: "02",
            title: "Positioning",
            desc: "Defining the unique narrative that separates your residence from every competing listing on the market."
          }, {
            num: "03",
            title: "Presentation",
            desc: "Cinematic architectural cinematography, twilight drone captures, and editorial staging."
          }, {
            num: "04",
            title: "Exposure",
            desc: "Direct private network syndication to high-net-worth buyers in New York, Chicago, LA, and Europe."
          }, {
            num: "05",
            title: "Negotiation",
            desc: "Strategic contract defense preserving non-contingent cash terms, appraisal waivers, and record prices."
          }].map((c, x) => n.jsxs("div", {
            className: "p-6 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-colors flex flex-col justify-between",
            children: [n.jsxs("div", {
              children: [n.jsx("span", {
                className: "font-mono text-xs text-[#c9a24a] font-bold block mb-3",
                children: c.num
              }), n.jsx("h3", {
                className: "font-serif text-xl text-[#f4efe2]",
                children: c.title
              })]
            }), n.jsx("p", {
              className: "text-xs text-[#f4efe2]/70 font-light mt-4 leading-relaxed",
              children: c.desc
            })]
          }, x))
        })]
      })
    }), n.jsx("section", {
      className: "py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]",
      children: n.jsx("div", {
        className: "wrap",
        children: n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center",
          children: [n.jsxs("div", {
            className: "lg:col-span-5 space-y-6",
            children: [n.jsx("span", {
              className: "eyebrow eyebrow--dot",
              children: "The Advisory Framework"
            }), n.jsxs("h2", {
              className: "font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight",
              children: ["The 5-step roadmap to record ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "Outcomes"
              }), "."]
            }), n.jsx("p", {
              className: "text-sm sm:text-base text-[#f4efe2]/75 font-light leading-relaxed",
              children: "From the first private walkthrough to the final wire transfer at closing, every step is executed with institutional rigor."
            }), n.jsx("div", {
              className: "pt-4",
              children: n.jsx("button", {
                onClick: () => m("seller",
                  "I would like to discuss the 5-step selling process for my property."
                  ),
                className: "btn btn--gold",
                children: n.jsx("span", {
                  children: "Request a Strategy Session"
                })
              })
            })]
          }), n.jsx("div", {
            className: "lg:col-span-7 space-y-4",
            children: [{
              step: "01 \u2014 DISCOVER",
              title: "Auditing Value & Strategic Objectives",
              body: "We examine property condition, permitted improvements, recent comps, and evaluate what minor enhancements will yield maximum return on investment."
            }, {
              step: "02 \u2014 POSITION",
              title: "Architectural Narrative & Media Production",
              body: "Custom video production, curated twilight shoots, dedicated property websites, and luxury copywriting that showcases your home's design pedigree."
            }, {
              step: "03 \u2014 LAUNCH",
              title: "Targeted Multi-Channel Rollout",
              body: "Synchronized launch across exclusive broker networks, digital campaigns targeting relocated executives, and private VIP previews."
            }, {
              step: "04 \u2014 NEGOTIATE",
              title: "Leverage Creation & Terms Protection",
              body: "Managing competing buyer interest to secure favorable inspection periods, flexible closing timelines, and maximum bottom-line proceeds."
            }, {
              step: "05 \u2014 CLOSE",
              title: "Frictionless Escrow & Transition",
              body: "Seamless coordination with title attorneys, appraisers, and municipal departments to ensure zero closing delays."
            }].map((c, x) => n.jsxs("div", {
              className: "p-6 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] flex items-start gap-4",
              children: [n.jsx("div", {
                className: "w-8 h-8 rounded-full bg-[#c9a24a]/20 border border-[#c9a24a] flex items-center justify-center text-xs font-mono text-[#ffd9a0] shrink-0 mt-1",
                children: x + 1
              }), n.jsxs("div", {
                children: [n.jsx("span", {
                  className: "font-mono text-xs text-[#c9a24a] tracking-wider uppercase block",
                  children: c.step
                }), n.jsx("h3", {
                  className: "font-serif text-xl text-[#f4efe2] mt-1",
                  children: c.title
                }), n.jsx("p", {
                  className: "text-xs sm:text-sm text-[#f4efe2]/75 font-light mt-2 leading-relaxed",
                  children: c.body
                })]
              })]
            }, x))
          })]
        })
      })
    }), n.jsx("section", {
      className: "py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]",
      children: n.jsxs("div", {
        className: "wrap",
        children: [n.jsxs("div", {
          className: "flex flex-col md:flex-row md:items-end justify-between mb-12",
          children: [n.jsxs("div", {
            children: [n.jsx("span", {
              className: "mono-label",
              children: "Proven Track Record"
            }), n.jsxs("h2", {
              className: "font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal mt-2",
              children: ["Recent Sales & Strategic ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "Outcomes"
              })]
            })]
          }), n.jsx("p", {
            className: "text-xs sm:text-sm text-[#f4efe2]/60 font-mono mt-4 md:mt-0",
            children: "Real results delivered through deliberate execution."
          })]
        }), n.jsx("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
          children: Ih.map((c, x) => n.jsxs("div", {
            className: "bg-[#141a1d] border border-[rgba(244,239,226,0.1)] overflow-hidden flex flex-col justify-between",
            children: [n.jsxs("div", {
              className: "relative aspect-[16/10] overflow-hidden",
              children: [n.jsx("img", {
                src: c.img,
                alt: c.address,
                className: "w-full h-full object-cover"
              }), n.jsx("div", {
                className: "absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]",
                children: c.neighborhood
              }), n.jsxs("div", {
                className: "absolute bottom-3 right-3 bg-[#0B0B0B]/90 px-3 py-1 font-mono text-sm text-[#ffd9a0] font-bold border border-[#c9a24a]",
                children: ["Sold for ", c.finalSalePrice]
              })]
            }), n.jsxs("div", {
              className: "p-6 space-y-4 flex-1 flex flex-col justify-between",
              children: [n.jsxs("div", {
                children: [n.jsx("h3", {
                  className: "font-serif text-2xl text-[#f4efe2]",
                  children: c.address
                }), n.jsx("div", {
                  className: "font-mono text-xs text-[#c9a24a] mt-1",
                  children: c.propertyType
                }), n.jsxs("div", {
                  className: "grid grid-cols-2 gap-2 my-4 py-3 border-y border-[rgba(244,239,226,0.08)] text-center text-xs font-mono",
                  children: [n.jsxs("div", {
                    children: [n.jsx("span", {
                      className: "text-[#f4efe2]/50 block text-[10px]",
                      children: "Initial Target"
                    }), n.jsx("span", {
                      className: "text-[#f4efe2] font-bold",
                      children: c.originalExpectation
                    })]
                  }), n.jsxs("div", {
                    children: [n.jsx("span", {
                      className: "text-[#f4efe2]/50 block text-[10px]",
                      children: "Days On Market"
                    }), n.jsxs("span", {
                      className: "text-[#c9a24a] font-bold",
                      children: [c.daysOnMarket, " Days"]
                    })]
                  })]
                }), n.jsxs("div", {
                  className: "text-xs text-[#f4efe2]/80 space-y-2 font-light",
                  children: [n.jsxs("div", {
                    children: [n.jsx("b", {
                      className: "font-mono text-[#ffd9a0] uppercase text-[10px] block",
                      children: "Strategy:"
                    }), c.strategyUsed]
                  }), n.jsxs("div", {
                    children: [n.jsx("b", {
                      className: "font-mono text-[#ffd9a0] uppercase text-[10px] block mt-2",
                      children: "Outcome:"
                    }), c.outcome]
                  })]
                })]
              }), n.jsx("div", {
                className: "pt-4 border-t border-[rgba(244,239,226,0.08)]",
                children: n.jsxs("button", {
                  onClick: () => m("seller",
                    `Inquiry regarding sales strategy similar to ${c.address}`
                    ),
                  className: "text-xs font-mono text-[#c9a24a] hover:underline flex items-center gap-1.5",
                  children: [n.jsx("span", {
                    children: "Discuss a similar strategy for your property"
                  }), n.jsx(ue, {
                    className: "w-3.5 h-3.5"
                  })]
                })
              })]
            })]
          }, c.id))
        })]
      })
    }), n.jsx("div", {
      id: "valuation-engine",
      children: n.jsx(lx, {
        onOpenContact: () => m("seller",
          "I ran the online valuation and would like a comprehensive comparative market analysis.")
      })
    }), n.jsx("section", {
      className: "py-20 bg-[#0B0B0B] border-t border-[rgba(244,239,226,0.1)]",
      children: n.jsxs("div", {
        className: "wrap text-center max-w-3xl mx-auto space-y-6",
        children: [n.jsx("span", {
          className: "mono-label text-[#c9a24a]",
          children: "Take the Next Step"
        }), n.jsxs("h2", {
          className: "font-serif text-4xl sm:text-5xl text-[#f4efe2] font-normal",
          children: ["What could your property ", n.jsx("em", {
            className: "it text-[#ffd9a0]",
            children: "Achieve"
          }), "?"]
        }), n.jsx("p", {
          className: "text-sm sm:text-base text-[#f4efe2]/80 font-light leading-relaxed",
          children: "Schedule a confidential property review. Miguel will walk through your residence, evaluate micro-market conditions, and provide a clear, evidence-based roadmap to achieve top dollar."
        }), n.jsx("div", {
          className: "pt-4 flex justify-center",
          children: n.jsxs("button", {
            onClick: () => m("seller",
              "I would like to request a confidential Property Strategy review with Miguel."),
            className: "btn btn--gold px-10 py-4 text-sm",
            children: [n.jsx("span", {
              children: "Request a Property Review"
            }), n.jsx(ue, {
              className: "w-4 h-4"
            })]
          })
        })]
      })
    })]
  });
}
export {
  SellView as
  default
};
