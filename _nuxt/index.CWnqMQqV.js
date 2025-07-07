import {
    s as I,
    v as G,
    r as v,
    m as J,
    E as Z,
    g as p,
    o as y,
    a as C,
    b as h,
    d as i,
    n as $,
    F as q,
    k as K,
    u as n,
    _ as L,
    t as U,
    x as X,
    A as Y,
    c as ee,
    z as te,
    B as oe,
    h as g,
    C as se,
    J as re,
    e as ae,
    G as le
} from "./entry.IlpWUEIg.js";
import ne from "./WorkList.Bi_NoilI.js";
import ie from "./Footer.DTFgSpFZ.js";
import {
    u as ce,
    a as ue
} from "./usePageMixin.BJaADmo2.js";
import {
    f as _e
} from "./filterBySlug.Bor7qi44.js";
import "./SectionTitle.Dj8p0cd2.js";
import "./WorkItem.EUzAh_V4.js";
import "./Tag.DLufUIEN.js";
import "./Contact.Cu0_O9Cy.js";
import "./SocialLink.B7ASRzHv.js";
const me = {
        class: "work-hero__list h1"
    },
    pe = {
        class: "work-hero__item oh"
    },
    he = i("h1", null, "All Projects", -1),
    ke = [he],
    we = ["onClick"],
    de = {
        __name: "Hero",
        props: {
            currentFilter: Object,
            filters: Array,
            onClick: Function,
            onInView: Function
        },
        setup(c) {
            const m = c,
                {
                    isLoaderDone: k
                } = I(G()),
                f = v(!1);
            J(() => {
                k.value && F()
            }), Z(() => k.value, b => {
                b && F()
            });
            const F = () => {
                f.value = !0, p.delayedCall(1, () => {
                    m.onInView()
                })
            };
            return (b, o) => {
                const a = L;
                return y(), C("div", {
                    class: $([{
                        "is-visible": n(f)
                    }, "work-hero gutters"])
                }, [h(a), i("ol", me, [i("li", pe, [i("button", {
                    class: $(["work-hero__btn h1 anim-line", {
                        "work-hero__btn--active": c.currentFilter.slug === "all"
                    }]),
                    onClick: o[0] || (o[0] = u => c.onClick({
                        label: "All work",
                        slug: "all"
                    }))
                }, ke, 2)]), (y(!0), C(q, null, K(c.filters, ({
                    slug: u,
                    title: w
                }, x) => (y(), C("li", {
                    key: x,
                    class: "work-hero__item oh"
                }, [i("button", {
                    class: $([{
                        "work-hero__btn--active": u === c.currentFilter.slug
                    }, "work-hero__btn h1 anim-line"]),
                    onClick: V => c.onClick({
                        label: w,
                        slug: u
                    })
                }, U(w), 11, we)]))), 128))])], 2)
            }
        }
    },
    ge = `
{
  work {
    ${X}

      filters {
        filter {
          ...on service {
            uid
            title
          }
        }
      }

    featuredWork {
      work {
        ...on case_study {
          slug
        }
      }
    }
  }
}
`,
    ve = {
        class: "work"
    },
    fe = {
        class: "work__wrapper"
    },
    be = {
        class: "work__wrapper-title mono ttu"
    },
    ye = "{subtitle} · {projectCount} {projectLabel}",
    Be = {
        __name: "index",
        async setup(c) {
            let m, k;
            const {
                client: f,
                asHTML: F
            } = Y(), {
                callHook: b
            } = le();
            let o = null;
            const a = v(null),
                u = v(!1);
            let w = ee();
            const x = () => {
                    w.resolve(), u.value = !0, o && p.to(o == null ? void 0 : o.chars, {
                        opacity: 1,
                        duration: .4,
                        stagger: {
                            from: "random",
                            each: .03
                        }
                    })
                },
                V = e => {
                    o = e, u.value && p.to(o == null ? void 0 : o.chars, {
                        opacity: 1,
                        duration: .4,
                        stagger: {
                            from: "random",
                            each: .03
                        }
                    })
                },
                {
                    globalData: H,
                    workData: P
                } = I(te()),
                {
                    data: l
                } = ([m, k] = oe(() => se("work", () => f.getSingle("work", {
                    graphQuery: ge
                }))), m = await m, k(), m),
                j = {
                    singlular: "project",
                    plural: "projects"
                },
                T = v({
                    label: "All work",
                    slug: "all"
                }),
                d = v({
                    label: "All work",
                    slug: "all"
                }),
                E = g(() => {
                    const {
                        metaDescription: e,
                        metaImage: t,
                        metaTitle: s
                    } = l == null ? void 0 : l.value.data;
                    return {
                        title: s,
                        description: e,
                        image: t
                    }
                }),
                N = g(() => {
                    const {
                        filters: e
                    } = l == null ? void 0 : l.value.data;
                    return e == null ? void 0 : e.map(({
                        filter: t
                    }) => {
                        var s, r;
                        return {
                            slug: (s = t == null ? void 0 : t.data) == null ? void 0 : s.uid,
                            title: (r = t == null ? void 0 : t.data) == null ? void 0 : r.title
                        }
                    })
                }),
                B = g(() => {
                    const {
                        featuredWork: e
                    } = l == null ? void 0 : l.value.data, t = e == null ? void 0 : e.map(({
                        work: r
                    }) => r.data.slug);
                    return _e(P.value, t).map(({
                        slug: r,
                        excerpt: A,
                        tags: D,
                        featuredAsset: S,
                        featuredAssetLandscape: O,
                        hoverAsset: Q,
                        hoverAssetLandscape: R
                    }) => ({
                        slug: r,
                        excerpt: A,
                        tags: D,
                        featuredAsset: S,
                        featuredAssetLandscape: O,
                        hoverAsset: Q,
                        hoverAssetLandscape: R
                    }))
                }),
                _ = g(() => d.value.slug === "all" ? B.value : p.utils.shuffle(B.value.filter(e => e.tags.some(t => t.slug === d.value.slug)))),
                W = g(() => {
                    var e;
                    return ye.replace("{subtitle}", d.value.label).replace("{projectCount}", ((e = _ == null ? void 0 : _.value) == null ? void 0 : e.length) || 0).replace("{projectLabel}", (_ == null ? void 0 : _.length) > 1 ? j.singular : j.plural)
                }),
                z = async ({
                    label: e,
                    slug: t
                }) => {
                    T.value = {
                        label: e,
                        slug: t
                    }, M({
                        label: e,
                        slug: t
                    })
                },
                M = ({
                    label: e,
                    slug: t
                }) => {
                    var r;
                    const s = p.timeline({
                        onComplete: async () => {
                            a.value.$el && p.set(a.value.$el, {
                                clearProps: "opacity"
                            }), await re(), b("WINDOW:RESIZE"), s == null || s.kill()
                        }
                    });
                    (r = a == null ? void 0 : a.value) != null && r.$el && s.to(a.value.$el, {
                        opacity: 0,
                        duration: .4
                    }, 0), s.to(o == null ? void 0 : o.chars, {
                        opacity: 0,
                        duration: .2,
                        stagger: {
                            from: "random",
                            each: .01
                        },
                        onComplete: () => {
                            d.value = {
                                label: e,
                                slug: t
                            }
                        }
                    }, 0)
                };
            return ce(E.value, H.value.seo, "Work", "/work"), ue(), (e, t) => {
                const s = de,
                    r = L,
                    A = ae,
                    D = ne,
                    S = ie;
                return y(), C("div", ve, [h(s, {
                    filters: n(N),
                    "current-filter": n(T),
                    "on-click": z,
                    "on-in-view": x
                }, null, 8, ["filters", "current-filter"]), i("div", fe, [i("div", {
                    class: $([{
                        "is-visible": n(u)
                    }, "work__wrapper-border gutters"])
                }, [h(r, {
                    position: "left"
                }), i("h2", be, [h(A, {
                    content: n(W),
                    type: "chars",
                    "char-class": "work__wrapper-title-char",
                    "should-set-delay": !1,
                    "should-restore": !1,
                    "should-resize": !1,
                    callback: V
                }, null, 8, ["content"])])], 2), h(D, {
                    ref_key: "workList",
                    ref: a,
                    items: n(_),
                    "current-filter": n(d),
                    "wait-for-in-view": n(w)
                }, null, 8, ["items", "current-filter", "wait-for-in-view"])]), h(S, {
                    "show-section-title": !1
                })])
            }
        }
    };
export {
    Be as
    default
};