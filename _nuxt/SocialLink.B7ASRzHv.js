import {
    o as s,
    a as l,
    d as e,
    t as r
} from "./entry.IlpWUEIg.js";
const n = ["href"],
    o = e("span", {
        class: "social-link__wrapper"
    }, [e("svg", {
        class: "social-link__svg"
    }, [e("use", {
        "xlink:href": "#arrow"
    })])], -1),
    t = {
        class: "social-link__label"
    },
    p = {
        __name: "SocialLink",
        props: {
            label: String,
            url: String
        },
        setup(a) {
            return (c, i) => (s(), l("a", {
                href: a.url,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "social-link"
            }, [o, e("span", t, r(a.label), 1)], 8, n))
        }
    };
export {
    p as
    default
};