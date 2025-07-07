import _ from "./SectionTitle.Dj8p0cd2.js";
import {
    o as a,
    a as r,
    j as m,
    i as u,
    b as e,
    w as d,
    d as n,
    n as f,
    _ as p,
    e as b,
    I as h,
    f as k
} from "./entry.IlpWUEIg.js";
const B = {
        class: "contact grid"
    },
    w = {
        class: "contact__title h1 h1--split"
    },
    x = {
        class: "contact__cta anim-fade-line"
    },
    S = {
        __name: "Contact",
        props: {
            subtitle: String,
            title: String,
            cta: Object
        },
        setup(t) {
            return ($, g) => {
                const c = _,
                    s = p,
                    o = b,
                    l = h,
                    i = k;
                return a(), r("div", B, [t.subtitle ? (a(), m(c, {
                    key: 0,
                    "is-visible-xs": !1,
                    title: t.subtitle
                }, null, 8, ["title"])) : u("", !0), e(i, {
                    class: f([{
                        "contact__wrapper--spacing": t.subtitle
                    }, "contact__wrapper"])
                }, {
                    default: d(() => [e(s, {
                        position: "left"
                    }), n("h3", w, [e(o, {
                        content: t.title,
                        type: "lines",
                        "has-overflow": !0
                    }, null, 8, ["content"])]), n("div", x, [e(l, {
                        label: t.cta.label,
                        url: t.cta.url,
                        "is-inline": !0,
                        theme: "dark",
                        "icon-type": "link"
                    }, null, 8, ["label", "url"])])]),
                    _: 1
                }, 8, ["class"])])
            }
        }
    };
export {
    S as
    default
};