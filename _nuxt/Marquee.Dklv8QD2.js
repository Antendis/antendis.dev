import {
    r as n,
    m as k,
    J as g,
    p as h,
    g as E,
    Y as w,
    o as S,
    a as T,
    d as W,
    Z as x,
    G as y
} from "./entry.IlpWUEIg.js";
const C = {
    __name: "Marquee",
    setup(B) {
        const {
            hook: u,
            hooks: c
        } = y(), r = n(null), i = n(null), o = n(null), a = n(null);
        let e = null,
            t = null,
            p = 5;
        k(async () => {
            s(), d(), await g(), m(), _()
        }), h(() => {
            v(), t == null || t.kill(), e == null || e.kill()
        });
        const d = () => {
                u("WINDOW:RESIZE", s)
            },
            v = () => {
                c.removeHook("WINDOW:RESIZE", s)
            },
            s = () => {
                r.value = o.value.getBoundingClientRect(), i.value = a.value.getBoundingClientRect(), t == null || t.refresh()
            },
            m = () => {
                e = E.timeline({
                    repeat: -1
                }), e.fromTo(a.value, {
                    xPercent: 0
                }, {
                    xPercent: -25,
                    duration: f(),
                    ease: "none"
                })
            },
            f = () => i.value.width / r.value.width * p,
            _ = () => {
                t = w.create({
                    trigger: o.value,
                    start: "top bottom",
                    end: "bottom top",
                    onToggle: l => {
                        e.isActive() && !l.isActive ? e.pause() : e.play()
                    }
                })
            };
        return (l, R) => (S(), T("div", {
            ref_key: "container",
            ref: o,
            class: "marquee"
        }, [W("div", {
            ref_key: "wrapper",
            ref: a,
            class: "marquee__wrapper"
        }, [x(l.$slots, "default")], 512)], 512))
    }
};
export {
    C as
    default
};