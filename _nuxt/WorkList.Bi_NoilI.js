import g from "./SectionTitle.Dj8p0cd2.js";
import v from "./WorkItem.EUzAh_V4.js";
import {
    g as b,
    h as F,
    o as e,
    a,
    b as V,
    i as $,
    d as x,
    F as B,
    k as S,
    u as W,
    j as I
} from "./entry.IlpWUEIg.js";
import "./Tag.DLufUIEN.js";
import "./filterBySlug.Bor7qi44.js";
const L = {
        class: "work-list gutters"
    },
    N = {
        key: 0,
        class: "work-list__title"
    },
    j = {
        class: "work-list__wrapper"
    },
    O = {
        __name: "WorkList",
        props: {
            currentFilter: {
                type: Object,
                default: () => {}
            },
            subtitle: {
                type: String,
                default: ""
            },
            items: Array,
            waitForInView: {
                type: Promise,
                required: !1,
                default: null
            }
        },
        setup(t) {
            const n = t,
                c = b.utils.wrap(["right", "left", "fullbleed"]),
                u = F(() => n.items.map(({ ...s
                }, r) => ({ ...s,
                    layout: c(r)
                })));
            return (s, r) => {
                const p = g,
                    d = v;
                return e(), a("div", L, [t.subtitle ? (e(), a("div", N, [V(p, {
                    title: t.subtitle
                }, null, 8, ["title"])])) : $("", !0), x("div", j, [(e(!0), a(B, null, S(W(u), ({
                    slug: o,
                    excerpt: m,
                    tags: f,
                    layout: _,
                    featuredAsset: w,
                    featuredAssetLandscape: h,
                    hoverAsset: k,
                    hoverAssetLandscape: y
                }, i) => {
                    var l;
                    return e(), I(d, {
                        key: `${(l=t.currentFilter)==null?void 0:l.slug}-${i}-${o}`,
                        slug: o,
                        excerpt: m,
                        tags: f,
                        layout: _,
                        "featured-asset-portrait": w,
                        "featured-asset-landscape": h,
                        "hover-asset-portrait": k,
                        "hover-asset-landscape": y,
                        "wait-for-in-view": i === 0 ? t.waitForInView : null
                    }, null, 8, ["slug", "excerpt", "tags", "layout", "featured-asset-portrait", "featured-asset-landscape", "hover-asset-portrait", "hover-asset-landscape", "wait-for-in-view"])
                }), 128))])])
            }
        }
    };
export {
    O as
    default
};