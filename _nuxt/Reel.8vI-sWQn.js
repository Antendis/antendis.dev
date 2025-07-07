import {
    h as R,
    o as u,
    a as _,
    u as k,
    d as i,
    r as c,
    p as U,
    E as P,
    g as E,
    s as Y,
    v as Z,
    m as ee,
    U as ne,
    b as g,
    n as T,
    G as le,
    H as te,
    j as V,
    i as S,
    w as se,
    $ as oe,
    K as ae,
    q as ie,
    I as ue,
    L as re
} from "./entry.IlpWUEIg.js";
const ce = ["aria-label"],
    de = {
        key: 0,
        class: "video-btn__svg video-btn__svg--play"
    },
    ve = i("use", {
        "xlink:href": "#play"
    }, null, -1),
    me = [ve],
    _e = {
        key: 1,
        class: "video-btn__svg video-btn__svg--pause"
    },
    pe = i("use", {
        "xlink:href": "#pause"
    }, null, -1),
    fe = [pe],
    ke = {
        __name: "ButtonPlay",
        props: {
            isPlaying: Boolean,
            onClick: Function
        },
        setup(n) {
            const p = n,
                s = R(() => p.isPlaying ? "Pause video" : "Play video");
            return (r, o) => (u(), _("button", {
                class: "video-btn",
                "aria-label": k(s),
                onClick: o[0] || (o[0] = (...v) => n.onClick && n.onClick(...v))
            }, [n.isPlaying ? (u(), _("svg", _e, fe)) : (u(), _("svg", de, me))], 8, ce))
        }
    },
    he = {
        class: "video-progress-bar"
    },
    ye = ["max"],
    ge = {
        __name: "ProgressBar",
        props: {
            duration: {
                type: Number,
                default: -1
            },
            currentTime: {
                type: Number,
                default: -1
            },
            isPlaying: Boolean
        },
        emits: ["seek"],
        setup(n, {
            emit: p
        }) {
            const s = n,
                r = p,
                o = c(null),
                v = c(null);
            let l = null;
            U(() => {
                l == null || l.kill()
            }), P(() => s.duration, a => {
                a && e()
            }), P(() => s.currentTime, a => {
                a === 0 && l.progress(0)
            }), P(() => s.isPlaying, a => {
                a ? (l == null ? void 0 : l.progress()) === 1 ? l.play(0) : l.play() : l.pause()
            });
            const e = () => {
                    l = E.timeline({
                        paused: !0
                    }), l.to(o.value, {
                        scaleX: 1,
                        ease: "none",
                        duration: s.duration
                    })
                },
                m = a => {
                    r("seek", a.target.value), l == null || l.seek(a.target.value)
                };
            return (a, w) => (u(), _("div", he, [i("div", {
                ref_key: "progressEl",
                ref: o,
                class: "video-progress-bar__inner"
            }, null, 512), i("input", {
                ref_key: "input",
                ref: v,
                class: "video-progress-bar__range",
                type: "range",
                min: "0",
                max: n.duration,
                step: "any",
                onInput: m
            }, null, 40, ye)]))
        }
    },
    be = i("svg", {
        class: "video-volume__svg"
    }, [i("use", {
        "xlink:href": "#fullscreen"
    })], -1),
    $e = [be],
    Ce = "Open fullscreen mode",
    Ee = {
        __name: "ButtonFullscreen",
        props: {
            onClick: Function
        },
        setup(n) {
            return (p, s) => (u(), _("button", {
                class: "video-fullscreen",
                "aria-label": Ce,
                onClick: s[0] || (s[0] = (...r) => n.onClick && n.onClick(...r))
            }, $e))
        }
    },
    we = ["aria-label"],
    Fe = {
        key: 0,
        class: "video-volume__svg video-volume__svg--muted"
    },
    Pe = i("use", {
        "xlink:href": "#volume-muted"
    }, null, -1),
    xe = [Pe],
    Be = {
        key: 1,
        class: "video-volume__svg"
    },
    Ve = i("use", {
        "xlink:href": "#volume"
    }, null, -1),
    Se = [Ve],
    Te = {
        __name: "ButtonVolume",
        props: {
            isMuted: Boolean,
            onClick: Function
        },
        setup(n) {
            const p = n,
                s = R(() => p.isMuted ? "Unmute video" : "Mute video");
            return (r, o) => (u(), _("button", {
                class: "video-volume",
                "aria-label": k(s),
                onClick: o[0] || (o[0] = (...v) => n.onClick && n.onClick(...v))
            }, [n.isMuted ? (u(), _("svg", Fe, xe)) : (u(), _("svg", Be, Se))], 8, we))
        }
    },
    Ue = {
        class: "video-player__wrapper"
    },
    Le = ["muted"],
    qe = {
        class: "video-player__ui"
    },
    Re = {
        __name: "Player",
        props: {
            isVisible: Boolean,
            videoUrl: String,
            onCloseClick: Function
        },
        setup(n, {
            expose: p
        }) {
            const {
                windowSize: s
            } = Y(Z()), {
                $webgl: r,
                $lenis: o
            } = le(), v = n, l = c(null), e = c(null), m = c(null), a = c(0), w = c(-1), f = c(!1), F = c(!1), d = c(!1), L = c(.5);
            let b = null,
                C = null,
                $ = null;
            P(() => v.isVisible, (t, h) => {
                t && !f.value ? A() : t && !d.value && s.value.width <= 768 && (x(), q()), t ? (s.value.width > 768 && (z(), x()), r.store.isRunning = !1, o == null || o.stop()) : (r.store.isRunning = !0, o == null || o.start(), s.value.width > 768 && (d.value = !1), a.value = e.value.currentTime = 0)
            }), P(() => d.value, (t, h) => {
                f.value && (t ? e.value.play() : e.value.pause())
            }), ee(() => {
                M()
            }), ne(() => {
                N(), $ == null || $.kill(), b == null || b.kill(), C == null || C.kill()
            }), U(() => {
                d.value = !1, f.value = !1
            });
            const z = () => {
                    b = E.timeline(), b.fromTo(l == null ? void 0 : l.value, {
                        rotation: 20,
                        yPercent: 80,
                        clipPath: "inset(20% 20% 20% 20% round 30px)"
                    }, {
                        yPercent: 0,
                        rotation: 0,
                        clipPath: "inset(0% 0% 0% 0% round 0px)",
                        ease: "power4.out",
                        duration: 1
                    }, 0), b.fromTo(m == null ? void 0 : m.value, {
                        rotation: 30,
                        clipPath: "inset(50% 50% 50% 50% round 30px)"
                    }, {
                        rotation: 0,
                        clipPath: "inset(0% 0% 0% 0% round 4px)",
                        ease: "power4.inOut",
                        duration: 1
                    }, .2), b.fromTo(e.value, {
                        rotation: -30,
                        scale: 1.2
                    }, {
                        rotation: 0,
                        scale: 1,
                        ease: "power4.inOut",
                        duration: 1
                    }, .2)
                },
                O = () => {
                    d.value = !1, C = E.timeline({
                        onComplete: v.onCloseClick
                    });
                    const t = {
                        percent: 0,
                        radius: 0
                    };
                    C.to(t, {
                        percent: 50,
                        radius: 30,
                        onUpdate: () => {
                            E.set(l == null ? void 0 : l.value, {
                                clipPath: `inset(${t.percent}% ${t.percent}% ${t.percent}% ${t.percent}% round ${t.radius}px)`
                            })
                        },
                        ease: "power4.inOut",
                        duration: .8
                    }, 0);
                    const h = {
                        percent: 0,
                        radius: 4
                    };
                    C.to(h, {
                        percent: 50,
                        radius: 30,
                        onUpdate: () => {
                            E.set(m == null ? void 0 : m.value, {
                                clipPath: `inset(${h.percent}% ${h.percent}% ${h.percent}% ${h.percent}% round ${h.radius}px)`
                            })
                        },
                        ease: "power4.inOut",
                        duration: .6
                    }, 0)
                },
                M = () => {
                    e.value.addEventListener("fullscreenchange", y), e.value.addEventListener("mozfullscreenchange", y), e.value.addEventListener("webkitfullscreenchange", y), e.value.addEventListener("msfullscreenchange", y), e.value.addEventListener("webkitendfullscreen", B)
                },
                N = () => {
                    e.value.removeEventListener("fullscreenchange", y), e.value.removeEventListener("mozfullscreenchange", y), e.value.removeEventListener("webkitfullscreenchange", y), e.value.removeEventListener("msfullscreenchange", y), e.value.removeEventListener("webkitendfullscreen", B)
                },
                y = () => {
                    !(document.fullscreenElement && document.fullscreenElement !== null || document.webkitFullscreenElement && document.webkitFullscreenElement !== null || document.mozFullScreenElement && document.mozFullScreenElement !== null || document.msFullscreenElement && document.msFullscreenElement !== null) && s.value.width <= 768 && B()
                },
                B = () => {
                    d.value = !1, $ == null || $.kill(), $ = E.delayedCall(1, () => v.onCloseClick())
                },
                A = () => {
                    e.value.setAttribute("src", v.videoUrl), e.value.load(), new Promise(t => {
                        e.value.oncanplay = () => {
                            !e.value || f.value || (e.value.volume = L.value, w.value = e.value.duration, a.value = e.value.currentTime, e.value.play(), d.value = !0, f.value = !0, s.value.width <= 768 && q(), t())
                        }
                    })
                },
                I = () => {
                    a.value = e.value.currentTime
                },
                j = () => {
                    d.value = !1
                },
                x = () => {
                    f.value && (d.value = !d.value)
                },
                G = () => {
                    f.value && (F.value = !F.value, e.value.volume = F.value ? 0 : L.value)
                },
                H = () => {
                    !document.fullscreenElement || !document.webkitCurrentFullScreenElement ? e.value.requestFullscreen().catch(t => {
                        console.log(`Error attempting to enable fullscreen mode: ${t.message} (${t.name})`)
                    }) : document.exitFullscreen()
                },
                q = () => {
                    e.value.requestFullscreen ? e.value.requestFullscreen() : e.value.webkitRequestFullscreen ? e.value.webkitRequestFullscreen() : e.value.mozRequestFullScreen ? e.value.mozRequestFullScreen() : e.value.msRequestFullscreen ? e.value.msRequestFullscreen() : e.value.webkitEnterFullscreen && e.value.webkitEnterFullscreen()
                },
                K = t => {
                    e.value.currentTime = t
                };
            return p({
                video: e
            }), (t, h) => {
                const W = te,
                    X = ke,
                    D = ge,
                    J = Ee,
                    Q = Te;
                return u(), _("div", {
                    ref_key: "container",
                    ref: l,
                    class: T([{
                        "video-player--visible": n.isVisible
                    }, "video-player"])
                }, [g(W, {
                    class: "video-player__close",
                    "tag-type": "button",
                    type: "close",
                    onClick: O
                }), i("div", Ue, [i("div", {
                    ref_key: "videoInner",
                    ref: m,
                    class: "video-player__inner"
                }, [i("video", {
                    ref_key: "video",
                    ref: e,
                    class: T([{
                        "video-player__self--loaded": k(f)
                    }, "video-player__self"]),
                    playsinline: "",
                    muted: k(F),
                    disablepictureinpicture: "",
                    onEnded: j,
                    onClick: x,
                    onTimeupdate: I
                }, null, 42, Le)], 512), i("div", qe, [g(X, {
                    "is-playing": k(d),
                    "on-click": x
                }, null, 8, ["is-playing"]), g(D, {
                    duration: k(w),
                    "is-playing": k(d),
                    "current-time": k(a),
                    onSeek: K
                }, null, 8, ["duration", "is-playing", "current-time"]), g(J, {
                    "on-click": H
                }), g(Q, {
                    "is-muted": k(F),
                    "on-click": G
                }, null, 8, ["is-muted"])])])], 2)
            }
        }
    },
    ze = {
        class: "reel__wrapper"
    },
    Oe = {
        class: "reel__video-wrapper"
    },
    Me = {
        class: "reel__video-inner"
    },
    Ne = {
        key: 0,
        class: "reel__btn"
    },
    Ie = {
        __name: "Reel",
        props: {
            thumbnailUrl: {
                type: String,
                default: ""
            },
            thumbnailImage: {
                type: Object,
                default: () => {}
            },
            reelUrl: {
                type: String,
                default: ""
            },
            hasAnimation: {
                type: Boolean,
                default: !0
            }
        },
        setup(n, {
            expose: p
        }) {
            const s = c(null),
                r = c(!1);
            U(() => {
                r.value = !1
            });
            const o = () => {
                r.value = !r.value
            };
            return p({
                container: s
            }), (v, l) => {
                const e = ae,
                    m = ie,
                    a = ue,
                    w = Re,
                    f = re;
                return u(), _("div", {
                    ref_key: "container",
                    ref: s,
                    class: T([{
                        "reel--animated": n.hasAnimation
                    }, "reel"])
                }, [i("div", ze, [i("div", Oe, [i("div", Me, [n.thumbnailUrl ? (u(), V(e, {
                    key: 0,
                    class: "reel__video-self",
                    data: {
                        src: n.thumbnailUrl,
                        width: 1600,
                        height: 900
                    },
                    "is-fit": !0
                }, null, 8, ["data"])) : n.thumbnailImage ? (u(), V(m, {
                    key: 1,
                    class: "reel__video-self",
                    data: { ...n.thumbnailImage
                    },
                    "is-fit": !0
                }, null, 8, ["data"])) : S("", !0)])]), n.reelUrl ? (u(), _("div", Ne, [g(a, {
                    "aria-label": "Open reel modal",
                    "icon-type": "play",
                    "on-click": o
                })])) : S("", !0)]), g(f, null, {
                    default: se(() => [n.reelUrl ? (u(), V(oe, {
                        key: 0,
                        to: "body"
                    }, [g(w, {
                        "video-url": n.reelUrl,
                        "is-visible": k(r),
                        "on-close-click": o
                    }, null, 8, ["video-url", "is-visible"])])) : S("", !0)]),
                    _: 1
                })], 2)
            }
        }
    };
export {
    Ie as
    default
};