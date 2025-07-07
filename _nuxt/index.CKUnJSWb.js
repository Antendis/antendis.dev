import {
    s as V,
    v as E,
    r as x,
    g as H,
    E as Z,
    m as I,
    p as D,
    o as T,
    a as S,
    d as f,
    t as F,
    b as t,
    w as A,
    u as s,
    n as G,
    G as M,
    H as J,
    _ as j,
    e as z,
    f as W,
    I as O,
    h as y,
    j as N,
    k as K,
    F as U,
    q as X,
    J as Y,
    i as ee,
    K as te,
    L as oe,
    x as se,
    A as le,
    z as ne,
    B as ie,
    C as ae
} from "./entry.IlpWUEIg.js";
import re from "./Reel.8vI-sWQn.js";
import R from "./SectionTitle.Dj8p0cd2.js";
import ce from "./WorkList.Bi_NoilI.js";
import ue from "./Marquee.Dklv8QD2.js";
import me from "./Services.Cg19KSBz.js";
import _e from "./List.S8E0VO-l.js";
import {
    _ as be
} from "./LogoToggler.DFmvBvvC.js";
import pe from "./Footer.DTFgSpFZ.js";
import {
    u as he,
    a as de
} from "./usePageMixin.BJaADmo2.js";
import {
    f as ge
} from "./filterBySlug.Bor7qi44.js";
import "./WorkItem.EUzAh_V4.js";
import "./Tag.DLufUIEN.js";
import "./ServiceItem.CSANIloG.js";
import "./Contact.Cu0_O9Cy.js";
import "./SocialLink.B7ASRzHv.js";
const fe = {
        class: "home-hero__wrapper"
    },
    ve = {
        class: "home-hero__title ttu mono-h1"
    },
    we = {
        class: "home-hero__sticky"
    },
    ke = f("span", {
        class: "home-hero__scroll mono ttu"
    }, "Scroll down", -1),
    Te = {
        __name: "Hero",
        props: {
            title: String,
            reelThumbnail: {
                type: String,
                default: ""
            },
            reelThumbnailImage: {
                type: Object,
                default: () => {}
            },
            reelVideo: {
                type: String,
                default: ""
            }
        },
        setup(o) {
            const {
                isLoaderDone: i
            } = V(E()), l = x(!1), {
                callHook: d,
                $webgl: p
            } = M(), g = x(null), n = x(null), h = x(null), e = x(!1);
            let a = null,
                b = H.matchMedia();
            Z(() => i.value, v => {
                v && (l.value = !0)
            }), I(() => {
                L(), $(), i.value && H.delayedCall(.4, () => {
                    l.value = !0
                })
            }), D(() => {
                b == null || b.revert(), a == null || a.kill()
            });
            const L = () => {
                    b.add("(hover: hover)", () => (e.value = !0, () => {
                        e.value = !1
                    }))
                },
                $ = () => {
                    a = H.timeline({
                        scrollTrigger: {
                            trigger: g.value,
                            start: "top top",
                            end: "bottom top",
                            scrub: !0
                        }
                    }), a.to(p.store, {
                        rocksProgress: 1,
                        ease: "none"
                    }, 0), e.value ? (a.fromTo(h.value.container, {
                        clipPath: "inset(0% 0% 0% 0% round 4px)"
                    }, {
                        clipPath: "inset(50% 50% 50% 50% round 50px)",
                        ease: "none",
                        duration: .13
                    }, 0), a.to(h.value.container, {
                        yPercent: -400,
                        ease: "none"
                    }, 0)) : a.to(h.value.container, {
                        opacity: 0,
                        ease: "none",
                        duration: .06
                    }, 0), n.value.$el && a.to([n.value.$el], {
                        opacity: 0,
                        ease: "none",
                        duration: .05
                    }, 0)
                };
            return (v, w) => {
                const C = J,
                    m = re;
                return T(), S("div", {
                    class: G([{
                        "home-hero--visible is-visible": s(l)
                    }, "home-hero"]),
                    ref_key: "container",
                    ref: g
                }, [f("div", fe, [f("h1", ve, F(o.title), 1), f("div", we, [t(C, {
                    ref_key: "scrollEl",
                    ref: n,
                    type: "scroll",
                    class: "home-hero__inner"
                }, {
                    default: A(() => [ke]),
                    _: 1
                }, 512), t(m, {
                    ref_key: "reel",
                    ref: h,
                    class: "home-hero__reel",
                    "thumbnail-url": s(e) ? o.reelThumbnail : null,
                    "thumbnail-image": s(e) ? null : o.reelThumbnailImage,
                    "reel-url": o.reelVideo
                }, null, 8, ["thumbnail-url", "thumbnail-image", "reel-url"])])])], 2)
            }
        }
    },
    $e = {
        class: "home-about__title h1 h1--split"
    },
    ye = {
        __name: "About",
        props: {
            subtitle: String,
            title: String
        },
        setup(o) {
            const i = E(),
                {
                    $webgl: l,
                    $viewport: d,
                    hook: p,
                    hooks: g
                } = M(),
                n = x(null);
            let h = null,
                e = null;
            I(() => {
                p("WINDOW:RESIZE", a), v()
            }), D(() => {
                g.removeHook("WINDOW:RESIZE", a), h == null || h.kill(), e == null || e.kill()
            });
            const a = () => {},
                b = () => {
                    d.width < 768 && (l.store.backgroundProgress = 0, i.setCanvasAbsolute(!0))
                },
                L = () => {
                    d.width < 768 && (i.setCanvasAbsolute(!1), l.store.backgroundProgress = 1, l.store.noisePropagation = 0)
                },
                $ = () => {
                    e = H.timeline({
                        scrollTrigger: {
                            trigger: n.value,
                            start: "top top",
                            end: "bottom top",
                            scrub: !0
                        }
                    }), e.fromTo(l.store, {
                        noisePropagation: 0
                    }, {
                        noisePropagation: 1,
                        duration: 3,
                        ease: "linear"
                    })
                },
                v = () => {
                    const w = d.width < 768;
                    h = H.timeline({
                        scrollTrigger: {
                            trigger: n.value,
                            start: "top bottom",
                            end: "top top",
                            scrub: !0,
                            onEnter: b,
                            onEnterBack: b,
                            onLeave: L
                        }
                    }), h.to(l.store, {
                        backgroundProgress: w ? 0 : 1,
                        ease: "none"
                    }, 0), w && $()
                };
            return (w, C) => {
                const m = R,
                    r = j,
                    c = z,
                    u = W;
                return T(), S("div", {
                    ref_key: "container",
                    ref: n,
                    class: "home-about grid"
                }, [t(m, {
                    "is-visible-xs": !1,
                    title: o.subtitle
                }, null, 8, ["title"]), t(u, {
                    class: "home-about__wrapper"
                }, {
                    default: A(() => [t(r), f("h2", $e, [t(c, {
                        content: o.title,
                        type: "lines",
                        "has-overflow": !0
                    }, null, 8, ["content"])])]),
                    _: 1
                })], 512)
            }
        }
    },
    Se = {
        class: "home-work"
    },
    Le = {
        class: "home-work__cta"
    },
    xe = {
        __name: "Work",
        props: {
            subtitle: String,
            items: Array,
            ctaLabel: String
        },
        setup(o) {
            return (i, l) => {
                const d = ce,
                    p = O;
                return T(), S("div", Se, [t(d, {
                    subtitle: o.subtitle,
                    items: o.items
                }, null, 8, ["subtitle", "items"]), f("div", Le, [t(p, {
                    url: "/work",
                    label: o.ctaLabel,
                    theme: "dark"
                }, null, 8, ["label"])])])
            }
        }
    },
    Ce = {
        class: "gutters"
    },
    He = {
        class: "home-clients__wrapper"
    },
    Ae = {
        __name: "Clients",
        props: {
            items: Array
        },
        setup(o) {
            const i = o,
                l = y(() => [...i.items, ...i.items, ...i.items, ...i.items]);
            return (d, p) => {
                const g = j,
                    n = X,
                    h = ue,
                    e = W;
                return T(), N(e, {
                    class: "home-clients"
                }, {
                    default: A(() => [f("div", Ce, [t(g, {
                        position: "center"
                    })]), f("div", He, [t(h, null, {
                        default: A(() => [(T(!0), S(U, null, K(s(l), (a, b) => (T(), S("figure", {
                            key: b,
                            class: "home-clients__fig"
                        }, [t(n, {
                            data: { ...a.data
                            },
                            alt: a.alt || "Ashfall Studio",
                            "has-provider": !1
                        }, null, 8, ["data", "alt"])]))), 128))]),
                        _: 1
                    })])]),
                    _: 1
                })
            }
        }
    },
    Pe = {
        __name: "Services",
        props: {
            subtitle: String,
            title: String,
            items: Array,
            cta: Object
        },
        setup(o) {
            return (i, l) => {
                const d = me;
                return T(), N(d, {
                    subtitle: o.subtitle,
                    title: o.title,
                    items: o.items,
                    cta: o.cta,
                    hasLogoToggleLeave: !0
                }, null, 8, ["subtitle", "title", "items", "cta"])
            }
        }
    },
    Be = {
        class: "home-awards"
    },
    Ve = {
        class: "gutters"
    },
    Ee = {
        __name: "Awards",
        props: {
            subtitle: String,
            title: String,
            items: Array
        },
        setup(o) {
            return (i, l) => {
                const d = R,
                    p = z,
                    g = W,
                    n = _e;
                return T(), S("div", Be, [f("div", Ve, [t(d, {
                    "is-visible-xs": !1,
                    title: o.subtitle
                }, null, 8, ["title"]), t(g, {
                    "tag-type": "h3",
                    class: "home-awards__title h1 h1--split"
                }, {
                    default: A(() => [t(p, {
                        content: o.title,
                        type: "lines",
                        "has-overflow": !0
                    }, null, 8, ["content"])]),
                    _: 1
                })]), t(n, {
                    "is-title-big": !1,
                    items: o.items,
                    "border-svg-position": "left"
                }, null, 8, ["items"])])
            }
        }
    },
    Ie = {
        class: "home-lab__wrapper"
    },
    De = {
        class: "home-lab__inner"
    },
    Me = ["innerHTML"],
    We = {
        __name: "Lab",
        props: {
            title: String
        },
        setup(o) {
            const {
                callHook: i,
                $webgl: l,
                $viewport: d
            } = M(), {
                windowSize: p
            } = V(E()), g = x(null);
            let n = null;
            const h = {
                    src: "/videos/lab-mobile.mp4",
                    width: 924,
                    height: 1080
                },
                e = y(() => p.value.width < 768);
            I(async () => {
                await Y(), a()
            }), D(() => {
                n == null || n.kill()
            });
            const a = () => {
                const b = d.width < 768;
                n = H.timeline({
                    scrollTrigger: {
                        trigger: g.value,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: !0
                    }
                }), n.fromTo(l.store, {
                    labProgress: 0
                }, {
                    labProgress: b ? 0 : 2,
                    ease: "none"
                }, 0), n.fromTo(l.store, {
                    labDollyProgress: 0
                }, {
                    labDollyProgress: .1,
                    ease: "none"
                }, 0)
            };
            return (b, L) => {
                const $ = be,
                    v = O,
                    w = te,
                    C = oe;
                return T(), S("div", {
                    class: "home-lab",
                    ref_key: "container",
                    ref: g
                }, [t($, {
                    theme: "dark"
                }), f("div", Ie, [f("div", De, [f("h2", {
                    class: "home-lab__title h1",
                    innerHTML: o.title
                }, null, 8, Me), t(v, {
                    "aria-label": "Hyperlink to Lab page",
                    theme: "light",
                    "icon-type": "open",
                    url: "/lab"
                })]), t(C, null, {
                    default: A(() => [s(e) ? (T(), N(w, {
                        key: 0,
                        class: "home-lab__video",
                        "data-mobile": { ...h
                        },
                        "is-fit": !0
                    }, null, 8, ["data-mobile"])) : ee("", !0)]),
                    _: 1
                })])], 512)
            }
        }
    },
    Ne = `
{
  home {
    ${se}

    heroTitle
    heroCursorLabel
    heroReelThumbnail
    heroReelThumbnailImage
    heroReelVideo

    aboutSubtitle
    aboutTitle

    workSubtitle
    workFeatured {
      work {
        ...on case_study {
          slug
        }
      }
    }
    workCtaLabel
    clients

    servicesSubtitle
    servicesTitle
    serviceItems {
      service {
        ...on service {
          label
        }
      }
    }
    servicesCtaLabel

    awardsSubtitle
    awardsTitle
    awardsItems {
      title
      copy
    }

    labTitle
  }
}
`,
    je = {
        class: "home"
    },
    st = {
        __name: "index",
        async setup(o) {
            let i, l;
            const {
                client: d,
                asHTML: p
            } = le(), {
                globalData: g,
                workData: n,
                servicesData: h
            } = V(ne()), {
                data: e
            } = ([i, l] = ie(() => ae("home", () => d.getSingle("home", {
                graphQuery: Ne
            }))), i = await i, l(), i), a = y(() => {
                const {
                    metaDescription: m,
                    metaImage: r,
                    metaTitle: c
                } = e == null ? void 0 : e.value.data;
                return {
                    title: c,
                    description: m,
                    image: r
                }
            }), b = y(() => {
                const {
                    heroTitle: m,
                    heroCursorLabel: r,
                    heroReelThumbnail: c = null,
                    heroReelThumbnailImage: u = null,
                    heroReelVideo: k = null
                } = e == null ? void 0 : e.value.data;
                return {
                    title: m,
                    cursorLabel: r,
                    reelThumbnail: c == null ? void 0 : c.url,
                    reelThumbnailImage: u ? {
                        src: u == null ? void 0 : u.url,
                        ...u == null ? void 0 : u.dimensions
                    } : null,
                    reelVideo: k == null ? void 0 : k.url
                }
            }), L = y(() => {
                const {
                    aboutSubtitle: m,
                    aboutTitle: r
                } = e == null ? void 0 : e.value.data;
                return {
                    subtitle: m,
                    title: p(r)
                }
            }), $ = y(() => {
                const {
                    workSubtitle: m,
                    workFeatured: r,
                    workCtaLabel: c,
                    clients: u
                } = e == null ? void 0 : e.value.data, k = r == null ? void 0 : r.map(({
                    work: _
                }) => _.data.slug), P = ge(n.value, k);
                return {
                    subtitle: m.replace("{projectCount}", (r == null ? void 0 : r.length) || 0),
                    items: P,
                    ctaLabel: c,
                    clients: u == null ? void 0 : u.map(({
                        logo: _
                    }) => ({
                        data: { ..._.dimensions,
                            src: _.url
                        },
                        alt: _.alt || _.copyright
                    }))
                }
            }), v = y(() => {
                const {
                    servicesSubtitle: m,
                    servicesTitle: r,
                    serviceItems: c = [],
                    servicesCtaLabel: u
                } = e == null ? void 0 : e.value.data;
                return {
                    subtitle: m,
                    title: p(r),
                    items: c == null ? void 0 : c.map(({
                        service: k
                    }) => {
                        const {
                            data: P
                        } = k, _ = h.value.find(({
                            label: B
                        }) => B.toLowerCase() === P.label.toLowerCase());
                        return {
                            label: _ == null ? void 0 : _.label,
                            title: _ == null ? void 0 : _.title,
                            asset: _ == null ? void 0 : _.asset
                        }
                    }),
                    cta: {
                        url: "/about",
                        label: u
                    }
                }
            }), w = y(() => {
                const {
                    awardsSubtitle: m,
                    awardsTitle: r,
                    awardsItems: c
                } = e == null ? void 0 : e.value.data;
                return {
                    subtitle: m,
                    title: p(r),
                    items: c == null ? void 0 : c.map(({
                        title: u,
                        copy: k
                    }) => ({
                        title: u,
                        copy: p(k)
                    }))
                }
            }), C = y(() => {
                const {
                    labTitle: m = null
                } = e == null ? void 0 : e.value.data;
                return {
                    title: p(m) || "Explore the lab"
                }
            });
            return he(a.value, g.value.seo, "Home"), de(), (m, r) => {
                const c = Te,
                    u = ye,
                    k = xe,
                    P = Ae,
                    _ = Pe,
                    B = Ee,
                    q = We,
                    Q = pe;
                return T(), S("div", je, [t(c, {
                    title: s(b).title,
                    "reel-thumbnail": s(b).reelThumbnail,
                    "reel-thumbnail-image": s(b).reelThumbnailImage,
                    "reel-video": s(b).reelVideo
                }, null, 8, ["title", "reel-thumbnail", "reel-thumbnail-image", "reel-video"]), t(u, {
                    subtitle: s(L).subtitle,
                    title: s(L).title
                }, null, 8, ["subtitle", "title"]), t(k, {
                    subtitle: s($).subtitle,
                    items: s($).items,
                    "cta-label": s($).ctaLabel
                }, null, 8, ["subtitle", "items", "cta-label"]), t(P, {
                    items: s($).clients
                }, null, 8, ["items"]), t(_, {
                    subtitle: s(v).subtitle,
                    title: s(v).title,
                    items: s(v).items,
                    cta: s(v).cta
                }, null, 8, ["subtitle", "title", "items", "cta"]), t(B, {
                    subtitle: s(w).subtitle,
                    title: s(w).title,
                    label: s(w).label,
                    items: s(w).items
                }, null, 8, ["subtitle", "title", "label", "items"]), t(q, {
                    title: s(C).title
                }, null, 8, ["title"]), t(Q)])
            }
        }
    };
export {
    st as
    default
};