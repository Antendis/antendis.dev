import {
    o as s,
    a,
    b as e,
    w as l,
    d as r,
    j as f,
    i as p,
    n as c,
    F as g,
    k as b,
    t as y,
    _ as B,
    f as S,
    e as h
} from "./entry.IlpWUEIg.js";
import k from "./SectionTitle.Dj8p0cd2.js";
const w = {
        class: "list"
    },
    x = {
        class: "grid"
    },
    T = {
        class: "list__item-label anim-fade-line"
    },
    N = {
        __name: "List",
        props: {
            borderSvgPosition: {
                type: String,
                default: "right"
            },
            title: {
                type: String,
                default: ""
            },
            isTitleBig: {
                type: Boolean,
                default: !0
            },
            items: {
                type: Array,
                default: () => []
            },
            hasBottomSpacing: {
                type: Boolean,
                default: !0
            }
        },
        setup(t) {
            return (v, V) => {
                const n = B,
                    i = S,
                    _ = k,
                    d = h;
                return s(), a("div", w, [e(i, {
                    class: "list__border list__border--l gutters"
                }, {
                    default: l(() => [e(n, {
                        position: t.borderSvgPosition
                    }, null, 8, ["position"])]),
                    _: 1
                }), r("div", x, [t.title ? (s(), f(_, {
                    key: 0,
                    title: t.title,
                    "is-big": t.isTitleBig
                }, null, 8, ["title", "is-big"])) : p("", !0), e(i, {
                    class: c([{
                        "list__border--spacing": t.title
                    }, "list__border list__border--xs"])
                }, {
                    default: l(() => [e(n, {
                        position: "left"
                    })]),
                    _: 1
                }, 8, ["class"]), e(i, {
                    "tag-type": "ul",
                    class: c([{
                        "list__wrapper--spacing": t.hasBottomSpacing
                    }, "list__wrapper"])
                }, {
                    default: l(() => [(s(!0), a(g, null, b(t.items, ({
                        title: m,
                        copy: u
                    }, o) => (s(), a("li", {
                        key: o,
                        class: "list__item labor"
                    }, [r("p", T, y(m), 1), e(d, {
                        class: "list__item-label",
                        content: u,
                        type: "lines",
                        "line-class": "anim-fade-line",
                        "base-delay": .2 + .2 * o
                    }, null, 8, ["content", "base-delay"])]))), 128))]),
                    _: 1
                }, 8, ["class"])])])
            }
        }
    };
export {
    N as
    default
};