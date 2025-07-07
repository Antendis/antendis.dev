import {
    o as i,
    j as n,
    w as a,
    b as o,
    n as l,
    e as c,
    f as r
} from "./entry.IlpWUEIg.js";
const h = {
    __name: "SectionTitle",
    props: {
        isVisibleXs: {
            type: Boolean,
            default: !0
        },
        isBig: Boolean,
        title: String
    },
    setup(e) {
        return (f, m) => {
            const t = c,
                s = r;
            return i(), n(s, {
                "tag-type": "h2",
                class: l([{
                    "section-title--hidden-xs": !e.isVisibleXs,
                    "section-title--big h1": e.isBig,
                    "mono ttu": !e.isBig
                }, "section-title"])
            }, {
                default: a(() => [o(t, {
                    content: e.title,
                    type: e.isBig ? "lines" : "chars",
                    "has-overflow": e.isBig,
                    "should-restore": !1
                }, null, 8, ["content", "type", "has-overflow"])]),
                _: 1
            }, 8, ["class"])
        }
    }
};
export {
    h as
    default
};