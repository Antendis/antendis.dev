import {
    _ as R
} from "./LogoToggler.DFmvBvvC.js";
import {
    r as z,
    c as U,
    o as i,
    a as u,
    b as s,
    w as A,
    d as h,
    u as a,
    n as D,
    g as M,
    _ as P,
    e as F,
    f as H,
    h as $,
    i as N,
    j as W,
    F as B,
    k as C,
    t as L,
    l as G,
    m as J,
    p as K,
    q as E,
    s as O,
    v as X,
    x as Y,
    y as Z,
    z as tt,
    A as et,
    B as st,
    C as ot,
    D as I
} from "./entry.IlpWUEIg.js";
import at from "./Reel.8vI-sWQn.js";
import Q from "./List.S8E0VO-l.js";
import lt from "./Marquee.Dklv8QD2.js";
import it from "./SectionTitle.Dj8p0cd2.js";
import nt from "./Services.Cg19KSBz.js";
import rt from "./Footer.DTFgSpFZ.js";
import {
    u as ct,
    a as ut
} from "./usePageMixin.BJaADmo2.js";
import "./ServiceItem.CSANIloG.js";
import "./filterBySlug.Bor7qi44.js";
import "./Contact.Cu0_O9Cy.js";
import "./SocialLink.B7ASRzHv.js";
const _t = {
        class: "about-hero grid"
    },
    mt = {
        class: "about-hero__title h1 h1--split"
    },
    dt = {
        __name: "Hero",
        props: {
            title: String,
            reelThumbnail: {
                type: String,
                default: ""
            },
            reelVideo: {
                type: String,
                default: ""
            }
        },
        setup(o) {
            const n = z(null),
                d = z(!1);
            let r = U();
            const b = () => {
                    r.resolve()
                },
                T = () => {
                    d.value = !0, M.fromTo(n.value.container, {
                        clipPath: "inset(50% 50% 50% 50% round 30px)"
                    }, {
                        clipPath: "inset(0% 0% 0% 0% round 0px)",
                        ease: "power4.inOut",
                        duration: 1.4
                    })
                };
            return (c, e) => {
                const w = R,
                    p = P,
                    y = F,
                    x = H,
                    v = at;
                return i(), u("div", _t, [s(x, {
                    class: "about-hero__title-wrapper",
                    promise: a(r)
                }, {
                    default: A(() => [s(w, {
                        theme: "dark",
                        "has-leave-event": !0
                    }), s(p, {
                        position: "left"
                    }), h("h1", mt, [s(y, {
                        content: o.title,
                        type: "lines",
                        "has-overflow": !0,
                        callback: b
                    }, null, 8, ["content"])])]),
                    _: 1
                }, 8, ["promise"]), s(x, {
                    threshold: "top 80%",
                    class: "about-hero__border",
                    promise: a(r)
                }, {
                    default: A(() => [s(p, {
                        "has-svg": !1
                    })]),
                    _: 1
                }, 8, ["promise"]), s(x, {
                    threshold: "top bottom",
                    class: D([{
                        "about-hero__reel--visible": a(d)
                    }, "about-hero__reel"]),
                    callback: T
                }, {
                    default: A(() => [s(v, {
                        ref_key: "reel",
                        ref: n,
                        "thumbnail-url": o.reelThumbnail,
                        "reel-url": o.reelVideo,
                        "has-animation": !1
                    }, null, 8, ["thumbnail-url", "reel-url"])]),
                    _: 1
                }, 8, ["class"])])
            }
        }
    },
    pt = {
        key: 0,
        class: "grid"
    },
    ht = {
        class: "about-process__title h1 h1--split"
    },
    bt = {
        class: "about-process__marquee"
    },
    ft = {
        class: "about-process__marquee-item-figcaption h1"
    },
    vt = {
        class: "about-process__marquee-item-subtitle labor"
    },
    gt = {
        __name: "Process",
        props: {
            title: {
                type: String,
                default: ""
            },
            items: {
                type: Array,
                default: () => []
            },
            marquee: {
                type: Array,
                default: () => []
            }
        },
        setup(o) {
            const n = o,
                d = $(() => {
                    var b;
                    return ((b = n.list) == null ? void 0 : b.length) > 1
                }),
                r = $(() => [...n.marquee, ...n.marquee, ...n.marquee, ...n.marquee]);
            return (b, T) => {
                const c = P,
                    e = F,
                    w = H,
                    p = Q,
                    y = G,
                    x = lt;
                return i(), u("div", {
                    class: D([{
                        "about-process--small-spacing": !o.title && !a(d)
                    }, "about-process"])
                }, [o.title ? (i(), u("div", pt, [s(w, {
                    class: "about-process__title-wrapper"
                }, {
                    default: A(() => [s(c, {
                        position: "left"
                    }), h("h2", ht, [s(e, {
                        content: o.title,
                        type: "lines",
                        "has-overflow": !0
                    }, null, 8, ["content"])])]),
                    _: 1
                })])) : N("", !0), a(d) ? (i(), W(p, {
                    key: 1,
                    items: o.items,
                    "has-bottom-spacing": !1
                }, null, 8, ["items"])) : N("", !0), h("div", bt, [s(x, null, {
                    default: A(() => [(i(!0), u(B, null, C(a(r), ({
                        asset: v,
                        caption: S,
                        subtitle: q,
                        theme: _
                    }, l) => (i(), u("div", {
                        key: l,
                        class: "about-process__marquee-item"
                    }, [h("figure", {
                        class: D([`about-process__marquee-item-fig--${_}`, "about-process__marquee-item-fig"])
                    }, [s(y, {
                        data: {
                            src: v.src,
                            width: v.width,
                            height: v.height
                        },
                        alt: v.alt,
                        "is-fit": !0,
                        "image-sizes": "xs:70vw sm:70vw md:33vw lg:33vw xl:33vw xxl:33vw xxxl:33vw"
                    }, null, 8, ["data", "alt"]), h("figcaption", ft, L(S), 1)], 2), h("div", vt, L(q), 1)]))), 128))]),
                    _: 1
                })])], 2)
            }
        }
    },
    wt = {
        class: "about-card__border is-visible"
    },
    yt = {
        class: "about-card__title h1"
    },
    xt = {
        class: "about-card__wrapper"
    },
    $t = {
        class: "about-card__subtitle labor"
    },
    Tt = {
        key: 0,
        class: "about-card__fig"
    },
    kt = ["innerHTML"],
    St = {
        __name: "CardItem",
        props: {
            id: Number,
            title: String,
            rows: Array
        },
        setup(o) {
            const n = o,
                d = z(null);
            let r = null,
                b = M.matchMedia();
            J(() => {
                n.id > 0 && T()
            }), K(() => {
                r == null || r.kill(), b == null || b.revert()
            });
            const T = () => {
                b.add("(min-width: 1024px)", () => {
                    const c = document.body.querySelector(`.about-cards__scroller:nth-child(${n.id+1})`);
                    if (c) return r = M.timeline({
                        paused: !0,
                        scrollTrigger: {
                            trigger: c,
                            start: "top bottom",
                            end: "top top",
                            scrub: !0
                        }
                    }), r.to(d.value, {
                        yPercent: -100,
                        ease: "none"
                    }), () => {
                        d.value && M.set(d.value, {
                            clearProps: "all"
                        })
                    }
                })
            };
            return (c, e) => {
                const w = P,
                    p = E;
                return i(), u("div", {
                    ref_key: "container",
                    ref: d,
                    class: "about-card grid"
                }, [h("div", wt, [s(w, {
                    position: "center"
                })]), h("h2", yt, L(o.title), 1), h("div", xt, [(i(!0), u(B, null, C(o.rows, ({
                    subtitle: y,
                    copy: x,
                    image: v
                }, S) => (i(), u("div", {
                    key: S,
                    class: "about-card__row"
                }, [h("div", $t, L(y), 1), v ? (i(), u("figure", Tt, [s(p, {
                    data: {
                        src: v.src,
                        width: v.width,
                        height: v.height
                    },
                    alt: v.alt,
                    "is-fit": !0,
                    "image-sizes": "xs:100vw sm:100vw md:25vw lg:25vw xl:25vw xxl:25vw xxxl:25vw"
                }, null, 8, ["data", "alt"])])) : (i(), u("div", {
                    key: 1,
                    class: "about-card__copy labor",
                    innerHTML: x
                }, null, 8, kt))]))), 128))])], 512)
            }
        }
    },
    At = {
        class: "about-cards"
    },
    qt = {
        class: "about-cards__wrapper"
    },
    Bt = {
        class: "about-cards__sticky-wrapper"
    },
    Ct = {
        __name: "Cards",
        props: {
            items: Array
        },
        setup(o) {
            const n = o,
                d = $(() => n.items.length),
                {
                    isModalOpen: r
                } = O(X());
            return (b, T) => {
                const c = R,
                    e = St;
                return i(), u("div", At, [s(c, {
                    theme: "dark",
                    "has-leave-event": !0
                }), h("div", qt, [(i(!0), u(B, null, C(a(d), (w, p) => (i(), u("div", {
                    key: p,
                    class: "about-cards__scroller"
                }))), 128)), h("div", Bt, [h("div", {
                    class: D([{
                        "about-cards__sticky--hidden": a(r)
                    }, "about-cards__sticky"])
                }, [(i(!0), u(B, null, C(o.items, ({
                    title: w,
                    rows: p
                }, y) => (i(), W(e, {
                    id: y,
                    key: y,
                    title: w,
                    rows: p
                }, null, 8, ["id", "title", "rows"]))), 128))], 2)])])])
            }
        }
    },
    Lt = {
        class: "about-awards"
    },
    Vt = {
        __name: "Awards",
        props: {
            title: {
                type: String,
                default: ""
            },
            subtitle: {
                type: String,
                default: ""
            },
            items: {
                type: Array,
                default: () => []
            }
        },
        setup(o) {
            return (n, d) => {
                const r = Q;
                return i(), u("div", Lt, [s(r, {
                    title: o.subtitle,
                    items: o.items,
                    "has-bottom-spacing": !1
                }, null, 8, ["title", "items"])])
            }
        }
    },
    Mt = {
        class: "about-team grid"
    },
    Dt = {
        class: "about-team__wrapper"
    },
    Pt = {
        class: "about-team__fig"
    },
    It = {
        class: "about-team__caption labor"
    },
    zt = {
        __name: "Team",
        props: {
            title: {
                type: String,
                default: ""
            },
            items: {
                type: Array,
                default: () => []
            }
        },
        setup(o) {
            return (n, d) => {
                const r = P,
                    b = H,
                    T = it,
                    c = E;
                return i(), u("div", Mt, [s(b, {
                    class: "about-team__border"
                }, {
                    default: A(() => [s(r, {
                        position: "center"
                    })]),
                    _: 1
                }), s(T, {
                    title: o.title,
                    "is-big": !0
                }, null, 8, ["title"]), h("ul", Dt, [(i(!0), u(B, null, C(o.items, ({
                    asset: e,
                    caption: w
                }, p) => (i(), u("li", {
                    key: p
                }, [h("figure", Pt, [s(c, {
                    data: { ...e.data
                    },
                    alt: e.alt,
                    "image-sizes": "xs:100vw sm:100vw md:40vw lg:40vw xl:40vw xxl:40vw xxxl:40vw"
                }, null, 8, ["data", "alt"]), h("figcaption", It, L(w), 1)])]))), 128))])])
            }
        }
    },
    Ht = `
{
  model {
    ${Y}

    heroTitle
    heroReelThumbnail
    heroReelVideo

    uspsTitle
    uspItems {
      title
      copy
    }
    marquee {
      asset {
        ${Z}
      }
      caption
      subtitle
      theme
    }

    awardsSubtitle
    awardItems {
      title
      copy
    }

    cards {
      title
      subtitleTop
      copyTop
      imageTop
      subtitleBot
      copyBot
      imageBot
    }

    teamTitle
    people {
      picture
      caption
    }

    servicesTitle
    servicesSubtitle
    serviceItems {
      service {
        ...on service {
          label
        }
      }
    }
  }
}
`,
    Nt = {
        class: "about"
    },
    Zt = {
        __name: "about",
        async setup(o) {
            let n, d;
            const {
                globalData: r,
                servicesData: b
            } = O(tt()), {
                client: T,
                asHTML: c
            } = et(), {
                data: e
            } = ([n, d] = st(() => ot("about", () => T.getSingle("model", {
                graphQuery: Ht
            }))), n = await n, d(), n), w = $(() => {
                const {
                    metaDescription: _,
                    metaImage: l,
                    metaTitle: t
                } = e == null ? void 0 : e.value.data;
                return {
                    title: t,
                    description: _,
                    image: l
                }
            }), p = $(() => {
                const {
                    heroTitle: _,
                    heroReelThumbnail: l,
                    heroReelVideo: t
                } = e == null ? void 0 : e.value.data;
                return {
                    title: c(_),
                    reelThumbnail: l == null ? void 0 : l.url,
                    reelVideo: t == null ? void 0 : t.url
                }
            }), y = $(() => {
                const {
                    uspsTitle: _,
                    uspItems: l,
                    marquee: t
                } = e == null ? void 0 : e.value.data;
                return {
                    title: c(_),
                    items: l == null ? void 0 : l.map(({
                        title: g,
                        copy: f
                    }) => ({
                        title: g,
                        copy: c(f)
                    })),
                    marquee: t == null ? void 0 : t.map(({
                        asset: g,
                        caption: f,
                        subtitle: m,
                        theme: k
                    }) => ({
                        asset: I(g.data),
                        caption: f,
                        subtitle: m,
                        theme: k
                    }))
                }
            }), x = $(() => {
                const {
                    awardsTitle: _,
                    awardsSubtitle: l,
                    awardItems: t
                } = e == null ? void 0 : e.value.data;
                return {
                    title: c(_),
                    subtitle: l,
                    items: t == null ? void 0 : t.map(({
                        title: g,
                        copy: f
                    }) => ({
                        title: g,
                        copy: c(f)
                    }))
                }
            }), v = $(() => {
                const {
                    cards: _
                } = e == null ? void 0 : e.value.data;
                return _ == null ? void 0 : _.map(({
                    title: l,
                    subtitleTop: t,
                    copyTop: g,
                    imageTop: f,
                    subtitleBot: m,
                    copyBot: k,
                    imageBot: V
                }) => ({
                    title: l,
                    rows: [{
                        subtitle: t,
                        copy: c(g),
                        image: f ? I({
                            image: f
                        }) : null
                    }, {
                        subtitle: m,
                        copy: c(k),
                        image: V ? I({
                            image: V
                        }) : null
                    }]
                }))
            }), S = $(() => {
                const {
                    teamTitle: _,
                    people: l
                } = e == null ? void 0 : e.value.data;
                return {
                    title: _,
                    items: l == null ? void 0 : l.map(({
                        picture: t,
                        caption: g
                    }) => {
                        var f, m;
                        return {
                            asset: {
                                data: {
                                    src: t == null ? void 0 : t.url,
                                    width: (f = t == null ? void 0 : t.dimensions) == null ? void 0 : f.width,
                                    height: (m = t == null ? void 0 : t.dimensions) == null ? void 0 : m.height
                                },
                                alt: (t == null ? void 0 : t.alt) || (t == null ? void 0 : t.copyright) || g
                            },
                            caption: g
                        }
                    })
                }
            }), q = $(() => {
                const {
                    servicesTitle: _,
                    servicesSubtitle: l,
                    serviceItems: t
                } = e == null ? void 0 : e.value.data;
                return {
                    title: c(_),
                    subtitle: l,
                    items: t == null ? void 0 : t.map(({
                        service: g
                    }) => {
                        const {
                            data: f
                        } = g, m = b.value.find(({
                            label: k
                        }) => k.toLowerCase() === f.label.toLowerCase());
                        return {
                            label: m == null ? void 0 : m.label,
                            title: m == null ? void 0 : m.title,
                            asset: m == null ? void 0 : m.asset
                        }
                    })
                }
            });
            return ct(w.value, r.value.seo, "Model", "/about"), ut(), (_, l) => {
                const t = dt,
                    g = gt,
                    f = Ct,
                    m = Vt,
                    k = zt,
                    V = nt,
                    j = rt;
                return i(), u("div", Nt, [s(t, {
                    title: a(p).title,
                    "reel-thumbnail": a(p).reelThumbnail,
                    "reel-video": a(p).reelVideo
                }, null, 8, ["title", "reel-thumbnail", "reel-video"]), s(g, {
                    title: a(y).title,
                    items: a(y).items,
                    marquee: a(y).marquee
                }, null, 8, ["title", "items", "marquee"]), s(f, {
                    items: a(v)
                }, null, 8, ["items"]), s(m, {
                    title: a(x).title,
                    subtitle: a(x).subtitle,
                    items: a(x).items
                }, null, 8, ["title", "subtitle", "items"]), s(k, {
                    title: a(S).title,
                    items: a(S).items
                }, null, 8, ["title", "items"]), s(V, {
                    subtitle: a(q).subtitle,
                    title: a(q).title,
                    items: a(q).items,
                    "has-logo-toggle-leave": !0
                }, null, 8, ["subtitle", "title", "items"]), s(j)])
            }
        }
    };
export {
    Zt as
    default
};