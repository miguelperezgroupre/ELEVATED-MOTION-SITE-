// @ts-nocheck
/**
 * Navigation — reconstructed from the deployed production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ) because the
 * original source could not be retrieved through the Vercel connector (file contents are truncated), then updated
 * with the Oct 2026 hero copy system. Behaviour is otherwise identical to production.
 */
import * as R from "react";
import * as n from "react/jsx-runtime";
import {
  Phone as Cl,
  ArrowRight as ue,
  X as Ta,
  Menu as ib
} from "lucide-react";

export type NavView = 'home' | 'buy' | 'sell' | 'relocate' | 'invest' | 'developments' | 'south-florida' | 'neighborhoods' | 'insights' | 'about' | 'listings';

function Navigation({
  currentView: m,
  onNavigate: u,
  onOpenContact: d
}) {
  const [c, x] = R.useState(false), [g, C] = R.useState(false);
  R.useEffect(() => {
    const v = () => {
      x(window.scrollY > 40);
    };
    return v(), window.addEventListener("scroll", v, {
      passive: true
    }), () => window.removeEventListener("scroll", v);
  }, []);
  const A = [{
      id: "buy",
      label: "Buy"
    }, {
      id: "sell",
      label: "Sell"
    }, {
      id: "relocate",
      label: "Relocate"
    }, {
      id: "invest",
      label: "Invest"
    }, {
      id: "developments",
      label: "Pre-Construction"
    }, {
      id: "south-florida",
      label: "South Florida"
    }, {
      id: "neighborhoods",
      label: "Neighborhoods"
    }, {
      id: "insights",
      label: "Insights"
    }, {
      id: "listings",
      label: "Listings"
    }, {
      id: "about",
      label: "About"
    }],
    _ = (v) => {
      C(false), document.documentElement.style.overflow = "", u(v), window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    E = () => {
      const v = !g;
      C(v), document.documentElement.style.overflow = v ? "hidden" : "";
    };
  return n.jsxs(n.Fragment, {
    children: [n.jsx("header", {
      id: "nav",
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${c ? "bg-[#0e0e0e]/95 backdrop-blur-md border-b border-[rgba(244,239,226,0.08)] py-3.5 shadow-2xl" : "bg-[#0e0e0e]/90 py-5"}`,
      children: n.jsxs("div", {
        className: "wrap flex items-center justify-between",
        children: [n.jsx("button", {
          onClick: () => _("home"),
          className: "flex items-center gap-3 group text-left cursor-pointer border-none bg-transparent p-0",
          "aria-label": "South Florida Elevated \u2014 Home",
          children: n.jsx("img", {
            src: "/assets/brand/sfe-arrow-logo.png",
            alt: "South Florida Elevated",
            className: "w-14 h-14 object-contain"
          })
        }), n.jsx("nav", {
          "aria-label": "Primary",
          className: "hidden xl:block",
          children: n.jsx("ul", {
            className: "flex items-center gap-4 2xl:gap-6 list-none m-0 p-0",
            children: A.map((v) => {
              const f = m === v.id;
              return n.jsx("li", {
                children: n.jsx("button", {
                  onClick: () => _(v.id),
                  className: `text-[11px] font-mono tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer bg-transparent border-none p-1 ${f ? "text-[#c9a24a] font-bold border-b border-[#c9a24a]" : "text-[#f4efe2]/80 hover:text-[#ffd9a0]"}`,
                  children: v.label
                })
              }, v.id);
            })
          })
        }), n.jsxs("div", {
          className: "flex items-center gap-3 sm:gap-5",
          children: [n.jsxs("a", {
            className: "hidden lg:inline-flex xl:hidden items-center gap-2 font-mono text-[11px] tracking-wider text-[#f4efe2]/85 hover:text-[#c9a24a] transition-colors",
            href: "tel:+17864601023",
            children: [n.jsx(Cl, {
              className: "w-3.5 h-3.5 text-[#c9a24a]"
            }), n.jsx("span", {
              children: "(786) 460-1023"
            })]
          }), n.jsxs("button", {
            className: "btn btn--sm hidden sm:inline-flex",
            onClick: () => d("general",
              "Let's connect to discuss my South Florida real estate objectives."),
            children: [n.jsx("span", {
              children: "Let's Talk"
            }), n.jsx(ue, {
              className: "w-3 h-3"
            })]
          }), n.jsx("button", {
            className: "xl:hidden text-[#f4efe2] p-2 hover:text-[#c9a24a] transition-colors cursor-pointer",
            onClick: E,
            "aria-label": "Open menu",
            "aria-expanded": g,
            children: g ? n.jsx(Ta, {
              className: "w-6 h-6"
            }) : n.jsx(ib, {
              className: "w-6 h-6"
            })
          })]
        })]
      })
    }), g && n.jsxs("div", {
      className: "fixed inset-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-10 px-8 animate-fadeIn xl:hidden",
      children: [n.jsxs("div", {
        className: "space-y-6",
        children: [n.jsx("div", {
          className: "font-mono text-xs text-[#c9a24a] tracking-widest uppercase",
          children: "Navigation Menu"
        }), n.jsxs("div", {
          className: "flex flex-col space-y-4",
          children: [n.jsx("button", {
            onClick: () => _("home"),
            className: `text-left font-serif text-2xl tracking-wide transition-colors ${m === "home" ? "text-[#c9a24a]" : "text-[#f4efe2]"}`,
            children: "Home"
          }), A.map((v) => n.jsx("button", {
            onClick: () => _(v.id),
            className: `text-left font-serif text-2xl tracking-wide transition-colors ${m === v.id ? "text-[#c9a24a]" : "text-[#f4efe2]"}`,
            children: v.label
          }, v.id))]
        })]
      }), n.jsxs("div", {
        className: "space-y-4 pt-6 border-t border-[rgba(244,239,226,0.1)]",
        children: [n.jsxs("a", {
          href: "tel:+17864601023",
          className: "flex items-center gap-2 font-mono text-sm text-[#ffd9a0]",
          children: [n.jsx(Cl, {
            className: "w-4 h-4 text-[#c9a24a]"
          }), n.jsx("span", {
            children: "(786) 460-1023"
          })]
        }), n.jsxs("button", {
          onClick: () => {
            C(false), document.documentElement.style.overflow = "", d("general",
              "Let's connect to discuss my South Florida real estate objectives.");
          },
          className: "btn btn--gold w-full justify-center",
          children: [n.jsx("span", {
            children: "Book a Consultation"
          }), n.jsx(ue, {
            className: "w-4 h-4"
          })]
        })]
      })]
    })]
  });
}
export {
  Navigation as
  default
};
