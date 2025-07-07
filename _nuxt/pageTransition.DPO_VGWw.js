import {
    V as A,
    v as l,
    h as o,
    J as N,
    G as c
} from "./entry.IlpWUEIg.js";
const d = ["index", "lab"],
    R = ["index"],
    S = A(n => {
        const {
            $lenis: s,
            callHook: e,
            $preloader: p
        } = c(), {
            setIsTransitioning: i,
            setCanvasAbsolute: r,
            setCanvasVisible: T
        } = l(), E = o(() => d.includes(n.name)), u = o(() => R.includes(n.name));
        n.meta.pageTransition = {
            name: "page",
            mode: "out-in",
            onBeforeEnter: () => {
                s == null || s.scrollTo(0, {
                    immediate: !0
                }), e("TRANSITION:BEFORE_ENTER")
            },
            onEnter: (t, a) => {
                r(u.value), T(E.value), e("TRANSITION:ENTER", {
                    el: t,
                    done: a
                })
            },
            onAfterEnter: () => {
                e("TRANSITION:AFTER_ENTER")
            },
            onLeave: async (t, a) => {
                i(), await N(), e("TRANSITION:LEAVE", {
                    el: t,
                    done: a
                })
            }
        }
    });
export {
    S as
    default
};