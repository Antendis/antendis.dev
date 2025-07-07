import {
    T as p,
    s as c,
    v as d,
    z as i,
    m,
    U as _,
    p as E,
    G as g
} from "./entry.IlpWUEIg.js";
const M = ({
        title: o = "",
        description: e = "",
        image: t = null
    }, {
        description: s = ""
    }, n, a = null) => {
        const r = "Ashfall Studio | ",
            l = [{
                name: "description",
                hid: "description",
                content: e || s
            }, {
                property: "og:description",
                hid: "og_description",
                content: e || s
            }, {
                property: "og:image:alt",
                hid: "og_image_alt",
                content: e || s
            }, {
                name: "twitter:description",
                hid: "twitter_description",
                content: e || s
            }, {
                name: "twitter:image:alt",
                hid: "twitter_image_alt",
                content: e || s
            }],
            u = [{
                property: "og:image",
                hid: "og_image",
                content: (t == null ? void 0 : t.src) || "https://ashfall.studio/images/share.jpg"
            }, {
                property: "og:image:secure_url",
                hid: "og_image",
                content: (t == null ? void 0 : t.src) || "https://ashfall.studio/images/share.jpg"
            }, {
                name: "twitter:image:src",
                hid: "twitter_image",
                content: (t == null ? void 0 : t.src) || "https://ashfall.studio/images/share.jpg"
            }],
            h = [{
                name: "keywords",
                content: o || n
            }, {
                property: "og:title",
                hid: "og_title",
                content: o || n
            }, {
                name: "twitter:title",
                hid: "twitter_title",
                content: o || n
            }];
        p({
            title: `${r} ${o||n}`,
            meta: [...o || n ? h : [], ...e || s ? l : [], ...t ? u : []],
            link: [{
                rel: "canonical",
                href: `https://ashfall.studio.com${a}`
            }]
        })
    },
    S = () => {
        const {
            callHook: o,
            $lenis: e
        } = g(), {
            isContactModalOpen: t
        } = c(d()), {
            setIsContactModalOpen: s
        } = d(), {
            labModalData: n,
            serviceModalData: a
        } = c(i()), {
            setLabModalData: r,
            setServiceModalData: l
        } = i();
        m(() => {
            e == null || e.scrollTo(0, {
                immediate: !0
            }), o("CURSOR:UPDATE"), o("PAGE:MOUNTED")
        }), _(() => {
            o("PAGE:BEFORE-DESTROY")
        }), E(() => {
            o("CURSOR:UPDATE"), o("PAGE:DESTROYED"), a.value && l(null), n.value && r(null), t.value && s(null)
        })
    };
export {
    S as a, M as u
};