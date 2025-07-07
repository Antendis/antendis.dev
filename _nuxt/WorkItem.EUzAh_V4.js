import {
    r as u,
    g as A,
    h as _,
    m as I,
    U as N,
    o as r,
    a as i,
    b as t,
    w as n,
    n as $,
    u as a,
    i as w,
    d as O,
    F as z,
    k as E,
    j as H,
    l as W,
    L as U,
    W as q,
    H as D,
    f as G,
    e as J
} from "./entry.IlpWUEIg.js";
import K from "./Tag.DLufUIEN.js";
import "./filterBySlug.Bor7qi44.js";
const Q = {
        key: 0,
        class: "work-item__fig work-item__fig--main"
    },
    R = {
        key: 0,
        class: "work-item__fig work-item__fig--hover"
    },
    X = {
        class: "work-item__excerpt"
    },
    Y = {
        key: 0,
        class: "work-item__tags"
    },
    ae = {
        __name: "WorkItem",
        props: {
            slug: String,
            excerpt: String,
            tags: Array,
            layout: String,
            featuredAssetPortrait: {
                type: Object,
                default: () => {}
            },
            featuredAssetLandscape: {
                type: Object,
                default: () => {}
            },
            hoverAssetPortrait: {
                type: Object,
                default: () => {}
            },
            hoverAssetLandscape: {
                type: Object,
                default: () => {}
            },
            waitForInView: {
                type: Promise,
                required: !1,
                default: null
            }
        },
        setup(s) {
            const o = s,
                c = u(null),
                l = u(null),
                m = u(!1),
                v = u(!1);
            let e = null,
                L = A.matchMedia();
            const k = _(() => `/work/${o.slug}`),
                d = _(() => o.layout === "fullbleed"),
                g = _(() => d.value ? o.featuredAssetLandscape : o.featuredAssetPortrait),
                x = _(() => d.value ? o.hoverAssetLandscape : o.hoverAssetPortrait);
            I(() => {
                T(), P()
            }), N(() => {
                e == null || e.kill()
            });
            const P = () => {
                    L.add("(hover: hover)", () => (m.value = !0, () => {
                        m.value = !1
                    }))
                },
                T = () => {
                    var f, p;
                    e = A.timeline({
                        paused: !0
                    }), e.fromTo((f = c == null ? void 0 : c.value) == null ? void 0 : f.$el, {
                        clipPath: "inset(10% 20% 0% 20% round 30px)"
                    }, {
                        clipPath: "inset(0% 0% 0% 0% round 4px)",
                        ease: "power2.out",
                        duration: 1.4
                    }, 0), (p = l == null ? void 0 : l.value) != null && p.$el && e.fromTo(l.value.$el, {
                        scale: 1.1
                    }, {
                        scale: 1,
                        ease: "power2.out",
                        duration: 1.4,
                        clearProps: "transform"
                    }, 0)
                },
                V = () => {
                    e == null || e.play(0), v.value = !0
                };
            return (f, p) => {
                const h = W,
                    B = U,
                    y = q,
                    S = D,
                    b = G,
                    j = J,
                    C = K;
                return r(), i("article", {
                    class: $([
                        [`work-item--${s.layout}`, {
                            "work-item--visible": a(v)
                        }], "work-item"
                    ])
                }, [t(b, {
                    ref_key: "container",
                    ref: c,
                    class: "work-item__link",
                    threshold: "top bottom",
                    callback: V,
                    promise: s.waitForInView
                }, {
                    default: n(() => [t(S, {
                        type: "open",
                        class: $([{
                            "work-item__fig-wrapper--landscape": a(d)
                        }, "work-item__fig-wrapper"])
                    }, {
                        default: n(() => [t(y, {
                            to: a(k),
                            ref_key: "link",
                            ref: l,
                            class: "work-item__fig-inner"
                        }, {
                            default: n(() => [a(g) ? (r(), i("figure", Q, [t(h, {
                                data: { ...a(g)
                                },
                                "is-fit": !0,
                                "image-sizes": "xs:100vw sm:100vw md:50vw lg:50vw xl:50vw xxl:50vw xxxl:50vw"
                            }, null, 8, ["data"])])) : w("", !0), t(B, null, {
                                default: n(() => [a(x) && a(m) ? (r(), i("figure", R, [t(h, {
                                    data: { ...a(x)
                                    },
                                    "is-fit": !0,
                                    "image-sizes": "xs:100vw sm:100vw md:50vw lg:50vw xl:50vw xxl:50vw xxxl:50vw"
                                }, null, 8, ["data"])])) : w("", !0)]),
                                _: 1
                            })]),
                            _: 1
                        }, 8, ["to"])]),
                        _: 1
                    }, 8, ["class"])]),
                    _: 1
                }, 8, ["promise"]), t(b, {
                    class: "work-item__wrapper",
                    threshold: "top 90%"
                }, {
                    default: n(() => [O("h2", X, [t(y, {
                        to: a(k)
                    }, {
                        default: n(() => [t(j, {
                            content: s.excerpt,
                            type: "lines",
                            "has-overflow": !0
                        }, null, 8, ["content"])]),
                        _: 1
                    }, 8, ["to"])]), s.tags ? (r(), i("ul", Y, [(r(!0), i(z, null, E(s.tags, (F, M) => (r(), H(C, {
                        key: M,
                        label: F.label
                    }, null, 8, ["label"]))), 128))])) : w("", !0)]),
                    _: 1
                })], 2)
            }
        }
    };
export {
    ae as
    default
};