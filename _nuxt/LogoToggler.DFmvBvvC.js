import {
    r as E,
    m as u,
    p,
    Y as L,
    o as g,
    a as i,
    G as v
} from "./entry.IlpWUEIg.js";
const k = {
    __name: "LogoToggler",
    props: {
        theme: {
            type: String,
            default: "light"
        },
        hasLeaveEvent: {
            type: Boolean,
            default: !0
        },
        hasLeaveBackEvent: {
            type: Boolean,
            default: !0
        }
    },
    setup(r) {
        const n = r,
            e = E(null);
        let t = null;
        const {
            callHook: o
        } = v();
        u(() => {
            s()
        }), p(() => {
            t == null || t.kill()
        });
        const s = () => {
                t = L.create({
                    trigger: e == null ? void 0 : e.value,
                    start: "top bottom-=5%",
                    end: "bottom bottom-=5%",
                    onEnter: a,
                    onEnterBack: a,
                    onLeave: c,
                    onLeaveBack: l
                })
            },
            a = () => {
                o("WEBGL:CHANGECOLOR", "#4F4F4F")
            },
            l = () => {
                n.hasLeaveBackEvent && o("WEBGL:CHANGECOLOR", "#EEECEA")
            },
            c = () => {
                n.hasLeaveEvent && o("WEBGL:CHANGECOLOR", "#EEECEA")
            };
        return (B, m) => (g(), i("span", {
            ref_key: "container",
            ref: e,
            "aria-hidden": "true",
            class: "webgl-logo-toggler"
        }, null, 512))
    }
};
export {
    k as _
};