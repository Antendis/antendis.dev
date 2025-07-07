import {
    m as l,
    M as A,
    x as C,
    N as B,
    r as D,
    p,
    o as b,
    a as v,
    g as T,
    G as f,
    A as H,
    z as _,
    s as I,
    B as P,
    h as E,
    D as M,
    b as N,
    C as S
} from "./entry.IlpWUEIg.js";
import {
    u as w,
    a as U
} from "./usePageMixin.BJaADmo2.js";

function W() {
    l(() => {}), A(async () => {})
}
const $ = `
{
  lab {
    ${C}

    items {
      item {
        ...on labItem {
          title
          copy
          image
          videoUrl
          videoWidth
          videoHeight
        }
      }
    }
  }
}
`,
    O = {
        __name: "LabTesting",
        setup(h) {
            let e = null;
            const s = D(null),
                {
                    callHook: c,
                    $webgl: n
                } = f();

            function m() {
                c("LAB:CLICK")
            }
            const r = () => {
                e = T.timeline({
                    scrollTrigger: {
                        trigger: s.value,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: !0
                    }
                }), e.to(n.store, {
                    labDollyProgress: 1,
                    ease: "none"
                }, 0), e.to(n.store, {
                    rocksProgress: 1,
                    ease: "none"
                }, 0)
            };
            return l(async () => {
                r()
            }), p(() => {
                e == null || e.kill()
            }), (u, g) => (b(), v("div", {
                class: "scroller",
                onClick: m,
                ref_key: "container",
                ref: s
            }, null, 512))
        }
    },
    Q = B(O, [
        ["__scopeId", "data-v-7f327ce8"]
    ]),
    R = {
        class: "lab"
    },
    K = {
        __name: "lab",
        async setup(h) {
            let e, s;
            const {
                hook: c,
                hooks: n,
                callHook: m
            } = f(), {
                client: r,
                asHTML: u
            } = H(), {
                setLabModalData: g
            } = _(), {
                globalData: k
            } = I(_()), {
                data: o
            } = ([e, s] = P(() => S("lab", () => r.getSingle("lab", {
                graphQuery: $
            }))), e = await e, s(), e), y = E(() => {
                const {
                    metaDescription: i,
                    metaImage: a,
                    metaTitle: t
                } = o == null ? void 0 : o.value.data;
                return {
                    title: t,
                    description: i,
                    image: a
                }
            });
            l(() => {
                L()
            }), p(() => {
                x()
            });
            const L = () => {
                    c("LAB:OPEN", d)
                },
                x = () => {
                    n.removeHook("LAB:OPEN", d)
                },
                d = ({
                    id: i
                }) => {
                    const a = o == null ? void 0 : o.value.data.items.find(({
                        item: t
                    }) => t.id === i);
                    if (a.item) {
                        const {
                            data: t
                        } = a.item;
                        g({
                            title: t.title,
                            copy: u(t.copy),
                            image: M({
                                image: t.image
                            }),
                            video: t.videoUrl ? {
                                src: t.videoUrl,
                                width: t.videoWidth || 1600,
                                height: t.videoHeight || 900
                            } : null
                        })
                    }
                };
            return w(y.value, k.value.seo, "Lab", "/lab"), U(), W(), (i, a) => (b(), v("div", R, [N(Q)]))
        }
    };
export {
    K as
    default
};