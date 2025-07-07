import {
    s as $,
    z as f,
    r as i,
    h as q,
    m as L,
    p as B,
    g as b,
    o as W,
    j as D,
    w as N,
    d as a,
    b as h,
    u as O,
    l as P,
    X as M,
    H as j
} from "./entry.IlpWUEIg.js";
import {
    f as z
} from "./filterBySlug.Bor7qi44.js";
const A = ["aria-label"],
    I = a("span", {
        class: "service-item__btn"
    }, [a("span", {
        class: "btn btn--light"
    }, [a("span", {
        class: "btn__svg-wrapper"
    }, [a("svg", {
        class: "btn__svg btn__svg--open"
    }, [a("use", {
        "xlink:href": "#plus"
    })])])])], -1),
    R = {
        __name: "ServiceItem",
        props: {
            id: {
                type: Number,
                required: !0
            },
            itemsLength: {
                type: Number,
                required: !0
            },
            title: {
                type: String,
                required: !0
            },
            label: {
                type: String,
                required: !0
            },
            asset: {
                type: Object,
                required: !0
            }
        },
        setup(l) {
            const {
                workData: v,
                servicesData: y
            } = $(f()), {
                setServiceModalData: k
            } = f(), s = l, o = i(null), u = i(null), d = i(null), g = i(null);
            let n = null,
                t = null,
                p = null;
            const w = q(() => `Open ${s.label} service modal`);
            L(() => {
                s.id > 0 && x(), s.id < s.itemsLength - 1 && T()
            }), B(() => {
                n == null || n.kill(), t == null || t.kill()
            });
            const x = () => {
                    var e;
                    p = document.body.querySelector(`.services__scroller:nth-child(${s.id+1})`), p && (n = b.timeline({
                        paused: !0,
                        scrollTrigger: {
                            trigger: p,
                            start: "top bottom",
                            end: "top center",
                            scrub: !0
                        }
                    }), (e = o == null ? void 0 : o.value) != null && e.$el && n.to(o.value.$el, {
                        yPercent: -102,
                        ease: "none"
                    }))
                },
                T = () => {
                    const e = document.body.querySelector(`.services__scroller:nth-child(${s.id+1})`);
                    e && (t = b.timeline({
                        paused: !0,
                        scrollTrigger: {
                            trigger: e,
                            start: "top center",
                            end: "top top",
                            scrub: !0
                        }
                    }), t.to(g.value, {
                        autoAlpha: 0,
                        ease: "none",
                        duration: .05
                    }, 0), t.to(u.value, {
                        rotation: 2,
                        yPercent: 20,
                        ease: "none"
                    }, 0), t.to(d.value, {
                        scale: 1.2,
                        rotation: 2,
                        ease: "none"
                    }, 0), t.fromTo(u.value, {
                        clipPath: "inset(0 0 0 0 round 4px"
                    }, {
                        clipPath: "inset(10% 10% 30% 10% round 4px",
                        ease: "none"
                    }, 0))
                },
                C = () => {
                    var c;
                    const e = y.value.find(({
                        label: r
                    }) => r.toLowerCase() === s.label.toLowerCase());
                    if (!e) return !1;
                    const m = (e == null ? void 0 : e.featuredWork.length) && ((c = e == null ? void 0 : e.featuredWork) == null ? void 0 : c.map(({
                            slug: r
                        }) => r)),
                        _ = m && z(v.value, m) || null;
                    k({
                        title: e == null ? void 0 : e.title,
                        approachTitle: e == null ? void 0 : e.approachTitle,
                        approachCopy: e == null ? void 0 : e.approachCopy,
                        featuredWork: _,
                        servicesTitle: e == null ? void 0 : e.servicesTitle,
                        accordions: e == null ? void 0 : e.accordions
                    })
                };
            return (e, m) => {
                const _ = P,
                    c = M,
                    r = j;
                return W(), D(r, {
                    "tag-type": "button",
                    type: "open",
                    ref_key: "container",
                    ref: o,
                    class: "service-item",
                    onClick: C,
                    "aria-label": `Open modal for ${O(w)} service`
                }, {
                    default: N(() => [a("span", {
                        ref_key: "wrapper",
                        ref: u,
                        class: "service-item__wrapper"
                    }, [a("figure", {
                        ref_key: "fig",
                        ref: d,
                        class: "service-item__fig"
                    }, [h(_, {
                        class: "service-item__media",
                        data: { ...l.asset
                        },
                        "is-fit": !0,
                        "image-sizes": "xs:100vw sm:100vw md:50vw lg:50vw xl:50vw xxl:50vw xxxl:50vw"
                    }, null, 8, ["data"]), a("figcaption", {
                        ref_key: "caption",
                        ref: g,
                        class: "service-item__fig-caption mono ttu",
                        "aria-label": l.title
                    }, [h(c, {
                        content: l.title,
                        "base-color": "#eeede9",
                        "hover-color": "#969289"
                    }, null, 8, ["content"])], 8, A), I], 512)], 512)]),
                    _: 1
                }, 8, ["aria-label"])
            }
        }
    };
export {
    R as
    default
};