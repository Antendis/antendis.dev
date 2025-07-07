import {
    s as g,
    z as c,
    o as h,
    a as _,
    d as e,
    t as C
} from "./entry.IlpWUEIg.js";
import {
    f as T
} from "./filterBySlug.Bor7qi44.js";
const b = {
        class: "tag anim-char"
    },
    B = {
        __name: "Tag",
        props: {
            label: String
        },
        setup(t) {
            const {
                workData: l,
                servicesData: p
            } = g(c()), {
                setServiceModalData: u
            } = c(), r = t, m = () => {
                var n;
                const a = p.value.find(({
                    label: s
                }) => s.toLowerCase() === r.label.toLowerCase());
                if (!a) return !1;
                const o = (a == null ? void 0 : a.featuredWork.length) && ((n = a == null ? void 0 : a.featuredWork) == null ? void 0 : n.map(({
                        slug: s
                    }) => s)),
                    k = o && T(l.value, o) || null;
                u({
                    title: a == null ? void 0 : a.title,
                    approachTitle: a == null ? void 0 : a.approachTitle,
                    approachCopy: a == null ? void 0 : a.approachCopy,
                    featuredWork: k,
                    servicesTitle: a == null ? void 0 : a.servicesTitle,
                    accordions: a == null ? void 0 : a.accordions
                })
            };
            return (a, o) => (h(), _("li", b, [e("button", {
                class: "tag__btn mono ttu",
                onClick: m
            }, C(t.label), 1)]))
        }
    };
export {
    B as
    default
};