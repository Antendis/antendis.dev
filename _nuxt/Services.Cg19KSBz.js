import {
    _ as L
} from "./LogoToggler.DFmvBvvC.js";
import T from "./SectionTitle.Dj8p0cd2.js";
import {
    s as $,
    v as x,
    h as V,
    o as a,
    a as i,
    b as t,
    w as d,
    d as s,
    F as u,
    k as h,
    u as l,
    n as v,
    j as f,
    t as C,
    i as N,
    _ as j,
    e as A,
    f as F,
    I
} from "./entry.IlpWUEIg.js";
import O from "./ServiceItem.CSANIloG.js";
import "./filterBySlug.Bor7qi44.js";
const z = {
        class: "services__title h1 h1--split"
    },
    D = {
        class: "services__wrapper"
    },
    E = {
        class: "services__sticky-wrapper"
    },
    M = {
        class: "services__sticky-inner"
    },
    R = {
        class: "services__cta-title oh"
    },
    W = {
        class: "anim-line h1"
    },
    U = {
        __name: "Services",
        props: {
            subtitle: String,
            title: String,
            items: Array,
            hasLogoToggleLeave: {
                type: Boolean,
                default: !1
            },
            cta: {
                type: Object,
                default: () => {}
            }
        },
        setup(e) {
            const p = e,
                {
                    isModalOpen: g
                } = $(x()),
                n = V(() => p.items.length);
            return (q, G) => {
                const k = L,
                    b = T,
                    o = j,
                    y = A,
                    r = F,
                    w = O,
                    B = I;
                return a(), i("div", {
                    class: v([{
                        "services--has-cta": e.cta
                    }, "services grid"])
                }, [t(k, {
                    theme: "dark",
                    "has-leave-event": e.hasLogoToggleLeave
                }, null, 8, ["has-leave-event"]), t(b, {
                    "is-visible-xs": !1,
                    title: e.subtitle
                }, null, 8, ["title"]), t(r, {
                    class: "services__title-wrapper"
                }, {
                    default: d(() => [t(o, {
                        position: "left"
                    }), s("h3", z, [t(y, {
                        content: e.title,
                        type: "lines",
                        "has-overflow": !0
                    }, null, 8, ["content"])])]),
                    _: 1
                }), s("div", D, [(a(!0), i(u, null, h(l(n), (_, c) => (a(), i("div", {
                    key: c,
                    "aria-hidden": "true",
                    class: "services__scroller"
                }))), 128)), s("div", E, [s("div", {
                    class: v([{
                        "services__sticky--hidden": l(g)
                    }, "services__sticky"])
                }, [s("div", M, [(a(!0), i(u, null, h(e.items, ({
                    title: _,
                    label: c,
                    asset: S
                }, m) => (a(), f(w, {
                    id: m,
                    "items-length": l(n),
                    key: m,
                    title: _,
                    label: c,
                    asset: S
                }, null, 8, ["id", "items-length", "title", "label", "asset"]))), 128))])], 2)])]), e.cta ? (a(), f(r, {
                    key: 0,
                    class: "services__cta-wrapper"
                }, {
                    default: d(() => [t(o, {
                        position: "center"
                    }), s("div", R, [s("h3", W, C(e.cta.label), 1)]), t(B, {
                        url: e.cta.url,
                        theme: "light",
                        "aria-label": e.cta.label
                    }, null, 8, ["url", "aria-label"])]),
                    _: 1
                })) : N("", !0)], 2)
            }
        }
    };
export {
    U as
    default
};