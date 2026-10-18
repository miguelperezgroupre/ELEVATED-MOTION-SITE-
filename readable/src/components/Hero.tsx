// @ts-nocheck
/**
 * Hero — reconstructed from the deployed production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ) because the
 * original source could not be retrieved through the Vercel connector (file contents are truncated), then updated
 * with the Oct 2026 hero copy system. Behaviour is otherwise identical to production.
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import {
  ArrowRight as ue,
  Compass as sr,
  ChevronDown as _p,
  ShieldCheck as Fh,
  Phone as Cl,
  House as Xh,
  TrendingUp as Ms,
  Key as Qh,
  Building2 as Sn
} from "lucide-react";
const Sb = "/assets/brand/sfe-arrow-logo.png";

function Hero({
  onOpenContact: m,
  onNavigate: u
}) {
  const d = R.useRef(null),
    [c, x] = R.useState(0),
    [g, C] = R.useState(false),
    [A, _] = R.useState(1);
  R.useEffect(() => {
    const k = window.matchMedia("(prefers-reduced-motion: reduce)");
    C(k.matches);
    const $ = (L) => C(L.matches);
    return k.addEventListener("change", $), () => k.removeEventListener("change", $);
  }, []), R.useEffect(() => {
    let k, $ = window.innerHeight,
      L = window.innerWidth;
    const te = () => {
        if (!d.current) return;
        const ot = d.current.getBoundingClientRect(),
          Vt = ot.height - $;
        if (Vt <= 0) {
          x(0);
          return;
        }
        const b = -ot.top,
          D = Math.min(Math.max(b / Vt, 0), 1);
        x(D), D < 0.22 ? _(1) : D < 0.44 ? _(2) : D < 0.68 ? _(3) : D < 0.88 ? _(4) : _(5);
      },
      ie = () => {
        cancelAnimationFrame(k), k = requestAnimationFrame(te);
      },
      Ze = () => {
        Math.abs(window.innerWidth - L) > 50 && (L = window.innerWidth, $ = window.innerHeight), ie();
      };
    return window.addEventListener("scroll", ie, {
      passive: true
    }), window.addEventListener("resize", Ze, {
      passive: true
    }), te(), () => {
      window.removeEventListener("scroll", ie), window.removeEventListener("resize", Ze), cancelAnimationFrame(k);
    };
  }, []);
  const E = R.useCallback((k) => {
      if (!d.current) return;
      const $ = d.current.offsetTop,
        L = d.current.offsetHeight - window.innerHeight,
        ie = $ + ({
          1: 0,
          2: 0.28,
          3: 0.54,
          4: 0.76,
          5: 0.96
        } [k] ?? 0) * L;
      window.scrollTo({
        top: ie,
        behavior: "smooth"
      });
    }, []),
    v = (k, $, L) => Math.min(Math.max(k, $), L),
    f = (k, $, L, te, ie) => k <= $ ? te : k >= L ? ie : te + (k - $) / (L - $) * (ie - te),
    w = g ? c < 0.22 ? 1 : 0 : v(f(c, 0, 0.18, 1, 0), 0, 1),
    B = g ? 0 : f(c, 0, 0.22, 0, -60),
    U = g ? 1 : f(c, 0, 0.22, 1, 1.08),
    G = g ? c >= 0.22 && c < 0.44 ? 1 : 0 : v(c < 0.32 ? f(c, 0.18, 0.28, 0, 1) : f(c, 0.38, 0.46, 1, 0), 0, 1),
    V = g ? 0 : f(c, 0.2, 0.44, 40, -40),
    F = g ? 1 : f(c, 0.2, 0.44, 1.04, 1.18),
    q = g ? c >= 0.44 && c < 0.68 ? 1 : 0 : v(c < 0.54 ? f(c, 0.4, 0.48, 0, 1) : f(c, 0.64, 0.7, 1, 0), 0, 1),
    Q = v(c < 0.48 ? f(c, 0.42, 0.47, 0, 1) : f(c, 0.49, 0.53, 1, 0), 0, 1),
    P = f(c, 0.42, 0.53, 0.94, 1.04),
    Te = v(c < 0.55 ? f(c, 0.5, 0.54, 0, 1) : f(c, 0.57, 0.61, 1, 0), 0, 1),
    Ce = f(c, 0.5, 0.61, 0.94, 1.04),
    le = v(c < 0.63 ? f(c, 0.58, 0.62, 0, 1) : f(c, 0.65, 0.69, 1, 0), 0, 1),
    H = f(c, 0.58, 0.69, 0.94, 1.04),
    pe = g ? c >= 0.68 && c < 0.88 ? 1 : 0 : v(c < 0.78 ? f(c, 0.66, 0.74, 0, 1) : f(c, 0.84, 0.9, 1, 0), 0, 1),
    He = g ? 0 : f(c, 0.66, 0.88, 50, -30),
    Ie = g ? 1 : f(c, 0.66, 0.88, 0.96, 1.03),
    Ue = g ? c >= 0.88 ? 1 : 0 : v(f(c, 0.86, 0.94, 0, 1), 0, 1),
    Ot = g ? 0 : f(c, 0.86, 1, 40, 0),
    Rt = g ? 1 : f(c, 0, 1, 1, 1.35),
    De = g ? 0 : f(c, 0, 1, 0, -80);
  return n.jsx("div", {
    id: "hero-experience",
    ref: d,
    className: "relative w-full bg-[#0B0B0B]",
    style: {
      height: "480vh"
    },
    children: n.jsxs("div", {
      className: "sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between select-none",
      children: [n.jsxs("div", {
        className: "absolute inset-0 z-0 origin-center will-change-transform pointer-events-none",
        style: {
          transform: `scale(${Rt.toFixed(4)}) translateY(${De.toFixed(2)}px)`
        },
        children: [n.jsxs("div", {
          className: "absolute inset-0 bg-[#0B0B0B]",
          children: [n.jsx("div", {
            className: "absolute inset-0 bg-gradient-to-b from-[#081014] via-[#132730]/60 to-[#0B0B0B]"
          }), n.jsx("div", {
            className: "absolute inset-0 opacity-40 mix-blend-screen",
            style: {
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,74,0.25), transparent 70%)"
            }
          }), n.jsx("img", {
            src: Sb,
            alt: "South Florida Elevated",
            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 object-contain opacity-15 mix-blend-overlay pointer-events-none",
            style: {
              opacity: v(f(c, 0, 0.45, 0.25, 0.05), 0.05, 0.25)
            }
          })]
        }), n.jsx("img", {
          src: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=2400&q=85",
          alt: "South Florida Coastal Aerial Perspective",
          className: "absolute inset-0 w-full h-full object-cover object-center  mix-blend-screen",
          style: {
            opacity: v(f(c, 0, 0.45, 0.75, 0.15), 0, 0.75)
          }
        }), n.jsx("img", {
          src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
          alt: "Modern South Florida Luxury Architecture",
          className: "absolute inset-0 w-full h-full object-cover object-center  mix-blend-luminosity",
          style: {
            opacity: v(f(c, 0.25, 0.75, 0, 0.55), 0, 0.55)
          }
        }), n.jsx("div", {
          className: "absolute inset-0 bg-radial from-transparent via-[#0B0B0B]/50 to-[#0B0B0B]/95 pointer-events-none"
        }), n.jsx("div", {
          className: "absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B] pointer-events-none"
        }), n.jsx("div", {
          className: "absolute inset-0 bg-[#1F6970]/10 mix-blend-color pointer-events-none"
        })]
      }), n.jsx("div", {
        className: "absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 font-mono text-[10px] tracking-widest text-[#f4efe2]/40",
        children: [{
          phase: 1,
          label: "01 / AERIAL"
        }, {
          phase: 2,
          label: "02 / CITY"
        }, {
          phase: 3,
          label: "03 / STATEMENT"
        }, {
          phase: 4,
          label: "04 / ADVISOR"
        }, {
          phase: 5,
          label: "05 / PATHWAYS"
        }].map((k) => n.jsxs("button", {
          onClick: () => E(k.phase),
          className: `group flex items-center gap-3 transition-all duration-300 cursor-pointer bg-transparent border-none p-1 ${A === k.phase ? "text-[#c9a24a] font-bold" : "hover:text-[#f4efe2]"}`,
          "aria-label": `Jump to ${k.label}`,
          children: [n.jsx("span", {
            className: "opacity-0 group-hover:opacity-100 transition-opacity",
            children: k.label
          }), n.jsx("span", {
            className: `w-2 h-2 rounded-full border transition-all ${A === k.phase ? "bg-[#c9a24a] border-[#c9a24a] scale-125" : "border-[#f4efe2]/30 bg-transparent group-hover:border-[#c9a24a]"}`
          })]
        }, k.phase))
      }), n.jsxs("div", {
        className: "absolute inset-0 z-20 flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full pointer-events-none will-change-transform",
        style: {
          opacity: w,
          transform: `translateY(${B}px) scale(${U})`,
          visibility: w <= 0.01 ? "hidden" : "visible",
          pointerEvents: w > 0.4 ? "auto" : "none"
        },
        children: [n.jsxs("div", {
          className: "flex items-center gap-3 animate-fadeIn",
          children: [n.jsx("span", {
            className: "w-2 h-2 rounded-full bg-[#c9a24a] animate-pulse"
          }), n.jsx("span", {
            className: "font-mono text-[20px] tracking-[0.25em] uppercase text-[#ffd9a0] font-semibold",
            children: "SOUTH FLORIDA ELEVATED"
          })]
        }), n.jsxs("div", {
          className: "max-w-4xl space-y-6",
          children: [n.jsxs("h1", {
            className: "font-serif text-[100px] text-[#f4efe2] font-normal leading-[0.98] tracking-tight italic",
            children: ["Beyond the Address.", n.jsx("br", {}), n.jsx("em", {
              className: "text-[#ffd9a0] text-[41px] leading-[42px] block mt-4 not-italic",
              children: "Real estate. Lifestyle. South Florida."
            })]
          }), n.jsxs("div", {
            className: "flex flex-wrap items-center gap-4 pt-4",
            children: [n.jsxs("button", {
              onClick: () => {
                u ? u("south-florida") : E(2);
              },
              className: "btn btn--gold cursor-pointer inline-flex items-center gap-2",
              id: "hero-explore-btn",
              children: [n.jsx("span", {
                children: "Explore"
              }), n.jsx(ue, {
                className: "w-4 h-4"
              })]
            }), n.jsxs("button", {
              onClick: () => m("general",
                "Let's connect to discuss my South Florida real estate objectives."),
              className: "btn btn--sm cursor-pointer inline-flex items-center gap-2 border border-[#f4efe2]/20 hover:border-[#ffd9a0]",
              id: "hero-talk-btn",
              children: [n.jsx("span", {
                children: "Work With Miguel"
              }), n.jsx(ue, {
                className: "w-3.5 h-3.5"
              })]
            })]
          })]
        }), n.jsxs("div", {
          className: "flex items-end justify-between border-t border-[rgba(244,239,226,0.12)] pt-6",
          children: [n.jsxs("div", {
            className: "hidden sm:flex items-center gap-8 font-mono text-[11px] text-[#f4efe2]/60 uppercase tracking-widest",
            children: [n.jsxs("div", {
              children: [n.jsx("span", {
                className: "text-[#c9a24a] block font-bold",
                children: "25.7617\xB0 N"
              }), n.jsx("span", {
                children: "LATITUDE"
              })]
            }), n.jsxs("div", {
              children: [n.jsx("span", {
                className: "text-[#c9a24a] block font-bold",
                children: "80.1918\xB0 W"
              }), n.jsx("span", {
                children: "LONGITUDE"
              })]
            }), n.jsxs("div", {
              children: [n.jsx("span", {
                className: "text-[#c9a24a] block font-bold",
                children: "EST. 2026"
              }), n.jsx("span", {
                children: "DATA VERIFIED"
              })]
            })]
          }), n.jsxs("div", {
            onClick: () => E(2),
            className: "flex items-center gap-3 cursor-pointer group ml-auto",
            children: [n.jsx("span", {
              className: "font-mono text-[11px] tracking-[0.2em] uppercase text-[#f4efe2]/80 group-hover:text-[#ffd9a0] transition-colors",
              children: "SCROLL TO EXPLORE"
            }), n.jsx("div", {
              className: "relative w-5 h-10 border border-[#f4efe2]/30 rounded-full flex justify-center p-1 group-hover:border-[#c9a24a] transition-colors",
              children: n.jsx("div", {
                className: "w-1 bg-[#c9a24a] rounded-full will-change-transform",
                style: {
                  height: `${Math.max(6, Math.min(24, c * 100))}px`
                }
              })
            })]
          })]
        })]
      }), n.jsx("div", {
        className: "absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full pointer-events-none will-change-transform",
        style: {
          opacity: G,
          transform: `translateY(${V}px) scale(${F})`,
          visibility: G <= 0.01 ? "hidden" : "visible",
          pointerEvents: G > 0.4 ? "auto" : "none"
        },
        children: n.jsxs("div", {
          className: "text-center space-y-6 max-w-3xl",
          children: [n.jsxs("div", {
            className: "inline-flex items-center gap-2 border border-[#1F6970] bg-[#141a1d]/80 px-4 py-1.5 backdrop-blur-md",
            children: [n.jsx(sr, {
              className: "w-3.5 h-3.5 text-[#ffd9a0]"
            }), n.jsx("span", {
              className: "font-mono text-xs uppercase tracking-[0.2em] text-[#ffd9a0]",
              children: "GEOGRAPHIC CONVERGENCE \xB7 ARCHITECTURAL SCALE"
            })]
          }), n.jsxs("h2", {
            className: "font-serif text-4xl sm:text-6xl md:text-7xl text-[#f4efe2] font-normal leading-[1.08]",
            children: ["The City ", n.jsx("em", {
              className: "it text-[#ffd9a0]",
              children: "Transforms"
            }), "."]
          }), n.jsx("p", {
            className: "font-sans text-base sm:text-xl text-[#f4efe2]/85 font-light leading-relaxed max-w-2xl mx-auto",
            children: "Real estate, lifestyle, and the art of living well in South Florida."
          }), n.jsx("div", {
            className: "pt-4 flex justify-center gap-4",
            children: n.jsxs("button", {
              onClick: () => E(3),
              className: "btn btn--sm border border-[#c9a24a] text-[#ffd9a0] cursor-pointer inline-flex items-center gap-2",
              children: [n.jsx("span", {
                children: "CONTINUE SEQUENCE"
              }), n.jsx(_p, {
                className: "w-3.5 h-3.5"
              })]
            })
          })]
        })
      }), n.jsx("div", {
        className: "absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 w-full pointer-events-none will-change-transform",
        style: {
          opacity: q,
          visibility: q <= 0.01 ? "hidden" : "visible"
        },
        children: n.jsxs("div", {
          className: "relative w-full max-w-5xl text-center",
          children: [n.jsxs("div", {
            className: "absolute inset-0 flex flex-col items-center justify-center will-change-transform",
            style: {
              opacity: Q,
              transform: `scale(${P}) translateY(${Q > 0 ? 0 : 20}px)`,
              visibility: Q <= 0.01 ? "hidden" : "visible"
            },
            children: [n.jsx("span", {
              className: "font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a24a] mb-4",
              children: "PILLAR 01"
            }), n.jsxs("h2", {
              className: "font-serif text-6xl sm:text-8xl md:text-9xl text-[#f4efe2] font-normal tracking-tight leading-none",
              children: ["REAL ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "ESTATE"
              }), "."]
            }), n.jsx("p", {
              className: "font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light mt-6 max-w-md",
              children: "More than square footage \u2014 tangible waterfront capital and generational wealth."
            })]
          }), n.jsxs("div", {
            className: "absolute inset-0 flex flex-col items-center justify-center will-change-transform",
            style: {
              opacity: Te,
              transform: `scale(${Ce}) translateY(${Te > 0 ? 0 : 20}px)`,
              visibility: Te <= 0.01 ? "hidden" : "visible"
            },
            children: [n.jsx("span", {
              className: "font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a24a] mb-4",
              children: "PILLAR 02"
            }), n.jsxs("h2", {
              className: "font-serif text-6xl sm:text-8xl md:text-9xl text-[#f4efe2] font-normal tracking-tight leading-none",
              children: [n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "STRATEGY"
              }), "."]
            }), n.jsx("p", {
              className: "font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light mt-6 max-w-md",
              children: "Disciplined negotiation, contract defense, and institutional valuation modeling."
            })]
          }), n.jsxs("div", {
            className: "absolute inset-0 flex flex-col items-center justify-center will-change-transform",
            style: {
              opacity: le,
              transform: `scale(${H}) translateY(${le > 0 ? 0 : 20}px)`,
              visibility: le <= 0.01 ? "hidden" : "visible"
            },
            children: [n.jsx("span", {
              className: "font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a24a] mb-4",
              children: "PILLAR 03"
            }), n.jsxs("h2", {
              className: "font-serif text-5xl sm:text-7xl md:text-8xl text-[#f4efe2] font-normal tracking-tight leading-none",
              children: ["LOCAL ", n.jsx("em", {
                className: "it text-[#ffd9a0]",
                children: "INTELLIGENCE"
              }), "."]
            }), n.jsx("p", {
              className: "font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light mt-6 max-w-md",
              children: "Deep ground-truth insight into municipal codes, bridge clearances, and micro-markets."
            })]
          })]
        })
      }), n.jsx("div", {
        className: "absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full pointer-events-none will-change-transform",
        style: {
          opacity: pe,
          transform: `translateY(${He}px) scale(${Ie})`,
          visibility: pe <= 0.01 ? "hidden" : "visible",
          pointerEvents: pe > 0.4 ? "auto" : "none"
        },
        children: n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-[#04343F] border border-[#c9a24a]/40 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md",
          children: [n.jsx("div", {
            className: "lg:col-span-5 relative group",
            children: n.jsxs("div", {
              className: "relative aspect-[4/5] overflow-hidden border border-[#c9a24a]/30 shadow-2xl",
              children: [n.jsx("img", {
                src: "/assets/miguel-perez-headshot.jpg",
                alt: "Miguel Perez - South Florida Real Estate Advisor",
                referrerPolicy: "no-referrer",
                className: "w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
              }), n.jsxs("label", {
                className: "absolute top-3 right-3 z-30 bg-[#0B0B0B]/80 hover:bg-[#c9a24a] hover:text-[#0B0B0B] text-[#ffd9a0] border border-[#c9a24a]/50 px-2.5 py-1 text-[10px] font-mono tracking-wider cursor-pointer transition-all duration-200 backdrop-blur-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 shadow-lg",
                children: [n.jsx("span", {
                  children: "UPDATE PHOTO"
                }), n.jsx("input", {
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: (k) => {
                    var L;
                    const $ = (L = k.target.files) == null ? void 0 : L[0];
                    if ($) {
                      const te = new FileReader();
                      te.onload = (ie) => {
                        var ot;
                        const Ze = (ot = ie.target) == null ? void 0 : ot
                          .result;
                        Ze && (localStorage.setItem("mp_custom_headshot",
                          Ze), window.dispatchEvent(new Event(
                          "storage")), document.querySelectorAll(
                          'img[alt*="Miguel Perez"]').forEach((b) => {
                          b.src = Ze;
                        }));
                      }, te.readAsDataURL($);
                    }
                  }
                })]
              }), n.jsx("div", {
                className: "absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-transparent to-transparent pointer-events-none"
              }), n.jsxs("div", {
                className: "absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#ffd9a0]",
                children: [n.jsx("span", {
                  children: "FL LIC #SL3515849"
                }), n.jsxs("span", {
                  className: "flex items-center gap-1",
                  children: [n.jsx(Fh, {
                    className: "w-3.5 h-3.5 text-[#c9a24a]"
                  }), " VERIFIED ADVISOR"]
                })]
              })]
            })
          }), n.jsxs("div", {
            className: "lg:col-span-7 space-y-6",
            children: [n.jsxs("div", {
              children: [n.jsx("span", {
                className: "font-mono text-[14px] text-[#c9a24a] uppercase tracking-[0.2em] font-semibold block mb-2",
                children: "THE FIDUCIARY ADVOCATE"
              }), n.jsxs("h2", {
                className: "font-serif text-[64px] text-[#f4efe2] font-normal leading-tight",
                children: ["Miguel ", n.jsx("em", {
                  className: "it text-[#ffd9a0]",
                  children: "Perez"
                })]
              }), n.jsx("p", {
                className: "font-mono text-[18px] text-[#c9a24a] uppercase tracking-wider mt-1",
                children: "SOUTH FLORIDA REAL ESTATE ADVISOR"
              })]
            }), n.jsx("blockquote", {
              className: "font-serif text-[34px] text-[#f4efe2] italic font-light border-l-2 border-[#c9a24a] pl-4 leading-relaxed",
              children: '"Local perspective. Strategic guidance. A higher standard of representation."'
            }), n.jsx("p", {
              className: "font-sans text-[18px] text-[#f4efe2]/80 font-light leading-relaxed",
              children: "Serving buyers, sellers, and capital allocators across Miami-Dade, Broward, and Palm Beach with transparent underwriting and white-glove discretion."
            }), n.jsx("div", {
              className: "flex flex-wrap gap-2 pt-2",
              children: ["ABR\xAE (Buyer Representative)", "SRS (Seller Specialist)",
                "PSA (Pricing Strategy)", "SFR\xAE (Resource)"
              ].map((k) => n.jsx("span", {
                className: "font-mono text-[13px] px-2.5 py-1 bg-[#0B0B0B] border border-[rgba(244,239,226,0.15)] text-[#f4efe2]/90",
                children: k
              }, k))
            }), n.jsxs("div", {
              className: "flex flex-wrap items-center gap-4 pt-3",
              children: [n.jsxs("button", {
                onClick: () => m("advisor",
                  "I'd like to schedule a private advisory consultation with Miguel Perez."
                  ),
                className: "btn btn--gold cursor-pointer inline-flex items-center gap-2",
                children: [n.jsx("span", {
                  className: "text-[16px]",
                  children: "CONNECT WITH MIGUEL"
                }), n.jsx(ue, {
                  className: "w-4 h-4"
                })]
              }), n.jsxs("a", {
                href: "tel:+17864601023",
                className: "font-mono text-[#ffd9a0] hover:text-[#c9a24a] flex items-center gap-2 p-2 transition-colors",
                children: [n.jsx(Cl, {
                  className: "w-3.5 h-3.5 text-[#c9a24a]"
                }), n.jsx("span", {
                  className: "text-[18px]",
                  children: "(786) 460-1023"
                })]
              })]
            })]
          })]
        })
      }), n.jsxs("div", {
        className: "absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full pointer-events-none will-change-transform",
        style: {
          opacity: Ue,
          transform: `translateY(${Ot}px)`,
          visibility: Ue <= 0.01 ? "hidden" : "visible",
          pointerEvents: Ue > 0.4 ? "auto" : "none"
        },
        children: [n.jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-8 sm:mb-12",
          children: [n.jsx("span", {
            className: "font-mono text-[16px] tracking-[0.25em] text-[#c9a24a] uppercase font-semibold",
            children: "START YOUR JOURNEY"
          }), n.jsxs("h2", {
            className: "font-serif text-[64px] text-[#f4efe2] font-normal mt-2 leading-tight",
            children: ["Where Are You ", n.jsx("em", {
              className: "it text-[#ffd9a0]",
              children: "Headed"
            }), "?"]
          }), n.jsx("p", {
            className: "font-sans text-sm sm:text-base text-[#f4efe2]/80 font-light mt-3 max-w-xl mx-auto",
            children: "Select your strategic objective below to access tailored market intelligence, off-market inventory, and institutional valuation tools."
          })]
        }), n.jsx("div", {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4",
          children: [{
            id: "buy",
            title: "BUY",
            icon: Xh,
            desc: "Acquisition advisory & curated off-market homes",
            intent: "buyer"
          }, {
            id: "sell",
            title: "SELL",
            icon: Ms,
            desc: "Cinematic positioning & maximum value capture",
            intent: "seller"
          }, {
            id: "invest",
            title: "INVEST",
            icon: Qh,
            desc: "Yield modeling & 1031 tax exchange execution",
            intent: "investor"
          }, {
            id: "relocate",
            title: "RELOCATION",
            icon: sr,
            desc: "Lifestyle mapping & Florida domicile structuring",
            intent: "relocation"
          }, {
            id: "developments",
            title: "PRE-CONSTRUCTION",
            icon: Sn,
            desc: "Branded skyline towers & early-tier pricing",
            intent: "development"
          }].map((k, $) => {
            const L = k.icon;
            return n.jsxs("div", {
              onClick: () => {
                u && u(k.id);
              },
              className: "group bg-[#04343F] hover:bg-[#07394c] border border-[rgba(244,239,226,0.12)] hover:border-[#c9a24a] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1",
              children: [n.jsxs("div", {
                children: [n.jsx("div", {
                  className: "w-10 h-10 rounded border border-[#c9a24a]/40 bg-[#0B0B0B] flex items-center justify-center text-[#ffd9a0] group-hover:bg-[#c9a24a] group-hover:text-[#0B0B0B] transition-colors mb-4",
                  children: n.jsx(L, {
                    className: "w-5 h-5"
                  })
                }), n.jsx("h3", {
                  className: "font-serif text-xl sm:text-2xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors",
                  children: k.title
                }), n.jsx("p", {
                  className: "font-sans text-xs text-[#f4efe2]/70 font-light mt-2 leading-relaxed",
                  children: k.desc
                })]
              }), n.jsxs("div", {
                className: "pt-4 flex items-center justify-between text-xs font-mono text-[#c9a24a] group-hover:text-[#ffd9a0]",
                children: [n.jsx("span", {
                  children: "EXPLORE PATH"
                }), n.jsx(ue, {
                  className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                })]
              })]
            }, k.id);
          })
        })]
      })]
    })
  });
}
export {
  Hero as
  default
};
