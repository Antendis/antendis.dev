import B from "./Contact.Cu0_O9Cy.js";
import {
    s as L,
    z as S,
    A as $,
    h as a,
    o as u,
    a as m,
    b as s,
    u as e,
    w as C,
    d as n,
    F,
    k as x,
    t as D,
    _ as P,
    f as V,
    X as A
} from "./entry.IlpWUEIg.js";
import I from "./SocialLink.B7ASRzHv.js";
import "./SectionTitle.Dj8p0cd2.js";
const N = {
        class: "footer"
    },
    z = {
        class: "footer__row grid"
    },
    E = ["href"],
    H = {
        class: "footer__socials h1"
    },
    M = {
        class: "footer__copyright mono ttu"
    },
    j = {
        __name: "Footer",
        props: {
            showSectionTitle: {
                type: Boolean,
                default: !0
            }
        },
        setup(f) {
            const {
                globalData: c,
                footerData: r
            } = L(S()), {
                asHTML: p
            } = $(), d = a(() => {
                const {
                    socials: t
                } = r.value;
                return t
            }), h = a(() => {
                var t, o;
                return ((o = (t = c == null ? void 0 : c.value) == null ? void 0 : t.termsPdf) == null ? void 0 : o.url) || "/"
            }), b = a(() => {
                const {
                    copyright: t
                } = r.value;
                return t.replace("{year}", new Date().getFullYear())
            }), l = a(() => {
                const {
                    subtitle: t,
                    title: o,
                    link: i,
                    ctaLabel: _
                } = r.value.contact;
                return {
                    subtitle: t,
                    title: p(o),
                    cta: {
                        url: i.url,
                        label: _
                    }
                }
            });
            return (t, o) => {
                const i = B,
                    _ = P,
                    g = V,
                    k = A,
                    w = I;
                return u(), m("footer", N, [s(i, {
                    subtitle: f.showSectionTitle ? e(l).subtitle : "",
                    title: e(l).title,
                    cta: e(l).cta
                }, null, 8, ["subtitle", "title", "cta"]), s(g, {
                    class: "gutters"
                }, {
                    default: C(() => [s(_, {
                        position: "left"
                    })]),
                    _: 1
                }), n("div", z, [n("a", {
                    href: e(h),
                    target: "_blank",
                    class: "footer__legal mono ttu",
                    "aria-label": "Terms & Conditions"
                }, [s(k, {
                    content: "Terms & Conditions"
                })], 8, E), n("ul", H, [(u(!0), m(F, null, x(e(d), ({
                    label: y,
                    url: T
                }, v) => (u(), m("li", {
                    key: v,
                    class: "footer__socials-item"
                }, [s(w, {
                    label: y,
                    url: T
                }, null, 8, ["label", "url"])]))), 128))]), n("span", M, D(e(b)), 1)])])
            }
        }
    };
export {
    j as
    default
};