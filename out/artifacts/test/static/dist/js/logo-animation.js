!function (t) {
    var e = {};

    function i(r) {
        if (e[r]) return e[r].exports;
        var s = e[r] = {i: r, l: !1, exports: {}};
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports
    }

    i.m = t, i.c = e, i.d = function (t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: r})
    }, i.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, i.t = function (t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var s in t) i.d(r, s, function (e) {
            return t[e]
        }.bind(null, s));
        return r
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "dist", i(i.s = 510)
}({
    139: function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__, root, factory;
        "undefined" != typeof navigator && (root = window || {}, factory = function (window) {
            "use strict";
            var svgNS = "http://www.w3.org/2000/svg", locationHref = "", initialDefaultFrame = -999999,
                subframeEnabled = !0, expressionsPlugin,
                isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), cachedColors = {},
                bm_rounder = Math.round, bm_rnd, bm_pow = Math.pow, bm_sqrt = Math.sqrt, bm_abs = Math.abs,
                bm_floor = Math.floor, bm_max = Math.max, bm_min = Math.min, blitter = 10, BMMath = {};

            function ProjectInterface() {
                return {}
            }

            !function () {
                var t,
                    e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
                    i = e.length;
                for (t = 0; t < i; t += 1) BMMath[e[t]] = Math[e[t]]
            }(), BMMath.random = Math.random, BMMath.abs = function (t) {
                if ("object" === typeof t && t.length) {
                    var e, i = createSizedArray(t.length), r = t.length;
                    for (e = 0; e < r; e += 1) i[e] = Math.abs(t[e]);
                    return i
                }
                return Math.abs(t)
            };
            var defaultCurveSegments = 150, degToRads = Math.PI / 180, roundCorner = .5519;

            function roundValues(t) {
                bm_rnd = t ? Math.round : function (t) {
                    return t
                }
            }

            function styleDiv(t) {
                t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
            }

            function BMEnterFrameEvent(t, e, i, r) {
                this.type = t, this.currentTime = e, this.totalTime = i, this.direction = r < 0 ? -1 : 1
            }

            function BMCompleteEvent(t, e) {
                this.type = t, this.direction = e < 0 ? -1 : 1
            }

            function BMCompleteLoopEvent(t, e, i, r) {
                this.type = t, this.currentLoop = i, this.totalLoops = e, this.direction = r < 0 ? -1 : 1
            }

            function BMSegmentStartEvent(t, e, i) {
                this.type = t, this.firstFrame = e, this.totalFrames = i
            }

            function BMDestroyEvent(t, e) {
                this.type = t, this.target = e
            }

            roundValues(!1);
            var createElementID = (_count = 0, function () {
                return "__lottie_element_" + ++_count
            }), _count;

            function HSVtoRGB(t, e, i) {
                var r, s, a, n, o, h, l, p;
                switch (h = i * (1 - e), l = i * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = i * (1 - (1 - o) * e), n % 6) {
                    case 0:
                        r = i, s = p, a = h;
                        break;
                    case 1:
                        r = l, s = i, a = h;
                        break;
                    case 2:
                        r = h, s = i, a = p;
                        break;
                    case 3:
                        r = h, s = l, a = i;
                        break;
                    case 4:
                        r = p, s = h, a = i;
                        break;
                    case 5:
                        r = i, s = h, a = l
                }
                return [r, s, a]
            }

            function RGBtoHSV(t, e, i) {
                var r, s = Math.max(t, e, i), a = Math.min(t, e, i), n = s - a, o = 0 === s ? 0 : n / s, h = s / 255;
                switch (s) {
                    case a:
                        r = 0;
                        break;
                    case t:
                        r = e - i + n * (e < i ? 6 : 0), r /= 6 * n;
                        break;
                    case e:
                        r = i - t + 2 * n, r /= 6 * n;
                        break;
                    case i:
                        r = t - e + 4 * n, r /= 6 * n
                }
                return [r, o, h]
            }

            function addSaturationToRGB(t, e) {
                var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return i[1] += e, i[1] > 1 ? i[1] = 1 : i[1] <= 0 && (i[1] = 0), HSVtoRGB(i[0], i[1], i[2])
            }

            function addBrightnessToRGB(t, e) {
                var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return i[2] += e, i[2] > 1 ? i[2] = 1 : i[2] < 0 && (i[2] = 0), HSVtoRGB(i[0], i[1], i[2])
            }

            function addHueToRGB(t, e) {
                var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return i[0] += e / 360, i[0] > 1 ? i[0] -= 1 : i[0] < 0 && (i[0] += 1), HSVtoRGB(i[0], i[1], i[2])
            }

            var rgbToHex = function () {
                var t, e, i = [];
                for (t = 0; t < 256; t += 1) e = t.toString(16), i[t] = 1 == e.length ? "0" + e : e;
                return function (t, e, r) {
                    return t < 0 && (t = 0), e < 0 && (e = 0), r < 0 && (r = 0), "#" + i[t] + i[e] + i[r]
                }
            }();

            function BaseEvent() {
            }

            BaseEvent.prototype = {
                triggerEvent: function (t, e) {
                    if (this._cbs[t]) for (var i = this._cbs[t].length, r = 0; r < i; r++) this._cbs[t][r](e)
                }, addEventListener: function (t, e) {
                    return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function () {
                        this.removeEventListener(t, e)
                    }.bind(this)
                }, removeEventListener: function (t, e) {
                    if (e) {
                        if (this._cbs[t]) {
                            for (var i = 0, r = this._cbs[t].length; i < r;) this._cbs[t][i] === e && (this._cbs[t].splice(i, 1), i -= 1, r -= 1), i += 1;
                            this._cbs[t].length || (this._cbs[t] = null)
                        }
                    } else this._cbs[t] = null
                }
            };
            var createTypedArray = function () {
                return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (t, e) {
                    return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
                } : function (t, e) {
                    var i, r = 0, s = [];
                    switch (t) {
                        case"int16":
                        case"uint8c":
                            i = 1;
                            break;
                        default:
                            i = 1.1
                    }
                    for (r = 0; r < e; r += 1) s.push(i);
                    return s
                }
            }();

            function createSizedArray(t) {
                return Array.apply(null, {length: t})
            }

            function createNS(t) {
                return document.createElementNS(svgNS, t)
            }

            function createTag(t) {
                return document.createElement(t)
            }

            function DynamicPropertyContainer() {
            }

            DynamicPropertyContainer.prototype = {
                addDynamicProperty: function (t) {
                    -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
                }, iterateDynamicProperties: function () {
                    this._mdf = !1;
                    var t, e = this.dynamicProperties.length;
                    for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0)
                }, initDynamicPropertyContainer: function (t) {
                    this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
                }
            };
            var getBlendMode = (blendModeEnums = {
                0: "source-over",
                1: "multiply",
                2: "screen",
                3: "overlay",
                4: "darken",
                5: "lighten",
                6: "color-dodge",
                7: "color-burn",
                8: "hard-light",
                9: "soft-light",
                10: "difference",
                11: "exclusion",
                12: "hue",
                13: "saturation",
                14: "color",
                15: "luminosity"
            }
                /*!
 Transformation Matrix v2.0
 (c) Epistemex 2014-2015
 www.epistemex.com
 By Ken Fyrstenberg
 Contributions by leeoniya.
 License: MIT, header required.
 */, function (t) {
                return blendModeEnums[t] || ""
            }), blendModeEnums, Matrix = function () {
                var t = Math.cos, e = Math.sin, i = Math.tan, r = Math.round;

                function s() {
                    return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
                }

                function a(i) {
                    if (0 === i) return this;
                    var r = t(i), s = e(i);
                    return this._t(r, -s, 0, 0, s, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }

                function n(i) {
                    if (0 === i) return this;
                    var r = t(i), s = e(i);
                    return this._t(1, 0, 0, 0, 0, r, -s, 0, 0, s, r, 0, 0, 0, 0, 1)
                }

                function o(i) {
                    if (0 === i) return this;
                    var r = t(i), s = e(i);
                    return this._t(r, 0, s, 0, 0, 1, 0, 0, -s, 0, r, 0, 0, 0, 0, 1)
                }

                function h(i) {
                    if (0 === i) return this;
                    var r = t(i), s = e(i);
                    return this._t(r, -s, 0, 0, s, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }

                function l(t, e) {
                    return this._t(1, e, t, 1, 0, 0)
                }

                function p(t, e) {
                    return this.shear(i(t), i(e))
                }

                function m(r, s) {
                    var a = t(s), n = e(s);
                    return this._t(a, n, 0, 0, -n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, i(r), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a, -n, 0, 0, n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }

                function c(t, e, i) {
                    return i || 0 === i || (i = 1), 1 === t && 1 === e && 1 === i ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1)
                }

                function f(t, e, i, r, s, a, n, o, h, l, p, m, c, f, d, u) {
                    return this.props[0] = t, this.props[1] = e, this.props[2] = i, this.props[3] = r, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = m, this.props[12] = c, this.props[13] = f, this.props[14] = d, this.props[15] = u, this
                }

                function d(t, e, i) {
                    return i = i || 0, 0 !== t || 0 !== e || 0 !== i ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1) : this
                }

                function u(t, e, i, r, s, a, n, o, h, l, p, m, c, f, d, u) {
                    var y = this.props;
                    if (1 === t && 0 === e && 0 === i && 0 === r && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === m) return y[12] = y[12] * t + y[15] * c, y[13] = y[13] * a + y[15] * f, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * u, this._identityCalculated = !1, this;
                    var g = y[0], v = y[1], x = y[2], k = y[3], b = y[4], E = y[5], S = y[6], P = y[7], A = y[8],
                        _ = y[9], T = y[10], D = y[11], C = y[12], w = y[13], M = y[14], F = y[15];
                    return y[0] = g * t + v * s + x * h + k * c, y[1] = g * e + v * a + x * l + k * f, y[2] = g * i + v * n + x * p + k * d, y[3] = g * r + v * o + x * m + k * u, y[4] = b * t + E * s + S * h + P * c, y[5] = b * e + E * a + S * l + P * f, y[6] = b * i + E * n + S * p + P * d, y[7] = b * r + E * o + S * m + P * u, y[8] = A * t + _ * s + T * h + D * c, y[9] = A * e + _ * a + T * l + D * f, y[10] = A * i + _ * n + T * p + D * d, y[11] = A * r + _ * o + T * m + D * u, y[12] = C * t + w * s + M * h + F * c, y[13] = C * e + w * a + M * l + F * f, y[14] = C * i + w * n + M * p + F * d, y[15] = C * r + w * o + M * m + F * u, this._identityCalculated = !1, this
                }

                function y() {
                    return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
                }

                function g(t) {
                    for (var e = 0; e < 16;) {
                        if (t.props[e] !== this.props[e]) return !1;
                        e += 1
                    }
                    return !0
                }

                function v(t) {
                    var e;
                    for (e = 0; e < 16; e += 1) t.props[e] = this.props[e]
                }

                function x(t) {
                    var e;
                    for (e = 0; e < 16; e += 1) this.props[e] = t[e]
                }

                function k(t, e, i) {
                    return {
                        x: t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
                        y: t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
                        z: t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]
                    }
                }

                function b(t, e, i) {
                    return t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12]
                }

                function E(t, e, i) {
                    return t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13]
                }

                function S(t, e, i) {
                    return t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]
                }

                function P(t) {
                    var e = this.props[0] * this.props[5] - this.props[1] * this.props[4], i = this.props[5] / e,
                        r = -this.props[1] / e, s = -this.props[4] / e, a = this.props[0] / e,
                        n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
                        o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
                    return [t[0] * i + t[1] * s + n, t[0] * r + t[1] * a + o, 0]
                }

                function A(t) {
                    var e, i = t.length, r = [];
                    for (e = 0; e < i; e += 1) r[e] = P(t[e]);
                    return r
                }

                function _(t, e, i) {
                    var r = createTypedArray("float32", 6);
                    if (this.isIdentity()) r[0] = t[0], r[1] = t[1], r[2] = e[0], r[3] = e[1], r[4] = i[0], r[5] = i[1]; else {
                        var s = this.props[0], a = this.props[1], n = this.props[4], o = this.props[5],
                            h = this.props[12], l = this.props[13];
                        r[0] = t[0] * s + t[1] * n + h, r[1] = t[0] * a + t[1] * o + l, r[2] = e[0] * s + e[1] * n + h, r[3] = e[0] * a + e[1] * o + l, r[4] = i[0] * s + i[1] * n + h, r[5] = i[0] * a + i[1] * o + l
                    }
                    return r
                }

                function T(t, e, i) {
                    return this.isIdentity() ? [t, e, i] : [t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]]
                }

                function D(t, e) {
                    if (this.isIdentity()) return t + "," + e;
                    var i = this.props;
                    return Math.round(100 * (t * i[0] + e * i[4] + i[12])) / 100 + "," + Math.round(100 * (t * i[1] + e * i[5] + i[13])) / 100
                }

                function C() {
                    for (var t = 0, e = this.props, i = "matrix3d("; t < 16;) i += r(1e4 * e[t]) / 1e4, i += 15 === t ? ")" : ",", t += 1;
                    return i
                }

                function w(t) {
                    return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? r(1e4 * t) / 1e4 : t
                }

                function M() {
                    var t = this.props;
                    return "matrix(" + w(t[0]) + "," + w(t[1]) + "," + w(t[4]) + "," + w(t[5]) + "," + w(t[12]) + "," + w(t[13]) + ")"
                }

                return function () {
                    this.reset = s, this.rotate = a, this.rotateX = n, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = m, this.shear = l, this.scale = c, this.setTransform = f, this.translate = d, this.transform = u, this.applyToPoint = k, this.applyToX = b, this.applyToY = E, this.applyToZ = S, this.applyToPointArray = T, this.applyToTriplePoints = _, this.applyToPointStringified = D, this.toCSS = C, this.to2dCSS = M, this.clone = v, this.cloneFromProps = x, this.equals = g, this.inversePoints = A, this.inversePoint = P, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset()
                }
            }();
            !function (t, e) {
                var i, r = this, s = 256, a = 6, n = "random", o = e.pow(s, a), h = e.pow(2, 52), l = 2 * h, p = s - 1;

                function m(t) {
                    var e, i = t.length, r = this, a = 0, n = r.i = r.j = 0, o = r.S = [];
                    for (i || (t = [i++]); a < s;) o[a] = a++;
                    for (a = 0; a < s; a++) o[a] = o[n = p & n + t[a % i] + (e = o[a])], o[n] = e;
                    r.g = function (t) {
                        for (var e, i = 0, a = r.i, n = r.j, o = r.S; t--;) e = o[a = p & a + 1], i = i * s + o[p & (o[a] = o[n = p & n + e]) + (o[n] = e)];
                        return r.i = a, r.j = n, i
                    }
                }

                function c(t, e) {
                    return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
                }

                function f(t, e) {
                    for (var i, r = t + "", s = 0; s < r.length;) e[p & s] = p & (i ^= 19 * e[p & s]) + r.charCodeAt(s++);
                    return d(e)
                }

                function d(t) {
                    return String.fromCharCode.apply(0, t)
                }

                e["seed" + n] = function (p, u, y) {
                    var g = [], v = f(function t(e, i) {
                        var r, s = [], a = typeof e;
                        if (i && "object" == a) for (r in e) try {
                            s.push(t(e[r], i - 1))
                        } catch (t) {
                        }
                        return s.length ? s : "string" == a ? e : e + "\0"
                    }((u = !0 === u ? {entropy: !0} : u || {}).entropy ? [p, d(t)] : null === p ? function () {
                        try {
                            if (i) return d(i.randomBytes(s));
                            var e = new Uint8Array(s);
                            return (r.crypto || r.msCrypto).getRandomValues(e), d(e)
                        } catch (e) {
                            var a = r.navigator, n = a && a.plugins;
                            return [+new Date, r, n, r.screen, d(t)]
                        }
                    }() : p, 3), g), x = new m(g), k = function () {
                        for (var t = x.g(a), e = o, i = 0; t < h;) t = (t + i) * s, e *= s, i = x.g(1);
                        for (; t >= l;) t /= 2, e /= 2, i >>>= 1;
                        return (t + i) / e
                    };
                    return k.int32 = function () {
                        return 0 | x.g(4)
                    }, k.quick = function () {
                        return x.g(4) / 4294967296
                    }, k.double = k, f(d(x.S), t), (u.pass || y || function (t, i, r, s) {
                        return s && (s.S && c(s, x), t.state = function () {
                            return c(x, {})
                        }), r ? (e[n] = t, i) : t
                    })(k, v, "global" in u ? u.global : this == e, u.state)
                }, f(e.random(), t)
            }([], BMMath);
            var BezierFactory = function () {
                var t = {
                    getBezierEasing: function (t, i, r, s, a) {
                        var n = a || ("bez_" + t + "_" + i + "_" + r + "_" + s).replace(/\./g, "p");
                        if (e[n]) return e[n];
                        var o = new f([t, i, r, s]);
                        return e[n] = o, o
                    }
                }, e = {};
                var i = 4, r = 1e-7, s = 10, a = 11, n = 1 / (a - 1), o = "function" == typeof Float32Array;

                function h(t, e) {
                    return 1 - 3 * e + 3 * t
                }

                function l(t, e) {
                    return 3 * e - 6 * t
                }

                function p(t) {
                    return 3 * t
                }

                function m(t, e, i) {
                    return ((h(e, i) * t + l(e, i)) * t + p(e)) * t
                }

                function c(t, e, i) {
                    return 3 * h(e, i) * t * t + 2 * l(e, i) * t + p(e)
                }

                function f(t) {
                    this._p = t, this._mSampleValues = o ? new Float32Array(a) : new Array(a), this._precomputed = !1, this.get = this.get.bind(this)
                }

                return f.prototype = {
                    get: function (t) {
                        var e = this._p[0], i = this._p[1], r = this._p[2], s = this._p[3];
                        return this._precomputed || this._precompute(), e === i && r === s ? t : 0 === t ? 0 : 1 === t ? 1 : m(this._getTForX(t), i, s)
                    }, _precompute: function () {
                        var t = this._p[0], e = this._p[1], i = this._p[2], r = this._p[3];
                        this._precomputed = !0, t === e && i === r || this._calcSampleValues()
                    }, _calcSampleValues: function () {
                        for (var t = this._p[0], e = this._p[2], i = 0; i < a; ++i) this._mSampleValues[i] = m(i * n, t, e)
                    }, _getTForX: function (t) {
                        for (var e = this._p[0], o = this._p[2], h = this._mSampleValues, l = 0, p = 1, f = a - 1; p !== f && h[p] <= t; ++p) l += n;
                        var d = l + (t - h[--p]) / (h[p + 1] - h[p]) * n, u = c(d, e, o);
                        return u >= .001 ? function (t, e, r, s) {
                            for (var a = 0; a < i; ++a) {
                                var n = c(e, r, s);
                                if (0 === n) return e;
                                e -= (m(e, r, s) - t) / n
                            }
                            return e
                        }(t, d, e, o) : 0 === u ? d : function (t, e, i, a, n) {
                            var o, h, l = 0;
                            do {
                                (o = m(h = e + (i - e) / 2, a, n) - t) > 0 ? i = h : e = h
                            } while (Math.abs(o) > r && ++l < s);
                            return h
                        }(t, l, l + n, e, o)
                    }
                }, t
            }();

            function extendPrototype(t, e) {
                var i, r, s = t.length;
                for (i = 0; i < s; i += 1) for (var a in r = t[i].prototype) r.hasOwnProperty(a) && (e.prototype[a] = r[a])
            }

            function getDescriptor(t, e) {
                return Object.getOwnPropertyDescriptor(t, e)
            }

            function createProxyFunction(t) {
                function e() {
                }

                return e.prototype = t, e
            }

            function bezFunction() {
                Math;

                function t(t, e, i, r, s, a) {
                    var n = t * r + e * s + i * a - s * r - a * t - i * e;
                    return n > -.001 && n < .001
                }

                var e = function (t, e, i, r) {
                    var s, a, n, o, h, l, p = defaultCurveSegments, m = 0, c = [], f = [],
                        d = bezier_length_pool.newElement();
                    for (n = i.length, s = 0; s < p; s += 1) {
                        for (h = s / (p - 1), l = 0, a = 0; a < n; a += 1) o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * i[a] + 3 * (1 - h) * bm_pow(h, 2) * r[a] + bm_pow(h, 3) * e[a], c[a] = o, null !== f[a] && (l += bm_pow(c[a] - f[a], 2)), f[a] = c[a];
                        l && (m += l = bm_sqrt(l)), d.percents[s] = h, d.lengths[s] = m
                    }
                    return d.addedLength = m, d
                };

                function i(t) {
                    this.segmentLength = 0, this.points = new Array(t)
                }

                function r(t, e) {
                    this.partialLength = t, this.point = e
                }

                var s, a = (s = {}, function (e, a, n, o) {
                    var h = (e[0] + "_" + e[1] + "_" + a[0] + "_" + a[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
                    if (!s[h]) {
                        var l, p, m, c, f, d, u, y = defaultCurveSegments, g = 0, v = null;
                        2 === e.length && (e[0] != a[0] || e[1] != a[1]) && t(e[0], e[1], a[0], a[1], e[0] + n[0], e[1] + n[1]) && t(e[0], e[1], a[0], a[1], a[0] + o[0], a[1] + o[1]) && (y = 2);
                        var x = new i(y);
                        for (m = n.length, l = 0; l < y; l += 1) {
                            for (u = createSizedArray(m), f = l / (y - 1), d = 0, p = 0; p < m; p += 1) c = bm_pow(1 - f, 3) * e[p] + 3 * bm_pow(1 - f, 2) * f * (e[p] + n[p]) + 3 * (1 - f) * bm_pow(f, 2) * (a[p] + o[p]) + bm_pow(f, 3) * a[p], u[p] = c, null !== v && (d += bm_pow(u[p] - v[p], 2));
                            g += d = bm_sqrt(d), x.points[l] = new r(d, u), v = u
                        }
                        x.segmentLength = g, s[h] = x
                    }
                    return s[h]
                });

                function n(t, e) {
                    var i = e.percents, r = e.lengths, s = i.length, a = bm_floor((s - 1) * t), n = t * e.addedLength,
                        o = 0;
                    if (a === s - 1 || 0 === a || n === r[a]) return i[a];
                    for (var h = r[a] > n ? -1 : 1, l = !0; l;) if (r[a] <= n && r[a + 1] > n ? (o = (n - r[a]) / (r[a + 1] - r[a]), l = !1) : a += h, a < 0 || a >= s - 1) {
                        if (a === s - 1) return i[a];
                        l = !1
                    }
                    return i[a] + (i[a + 1] - i[a]) * o
                }

                var o = createTypedArray("float32", 8);
                return {
                    getSegmentsLength: function (t) {
                        var i, r = segments_length_pool.newElement(), s = t.c, a = t.v, n = t.o, o = t.i, h = t._length,
                            l = r.lengths, p = 0;
                        for (i = 0; i < h - 1; i += 1) l[i] = e(a[i], a[i + 1], n[i], o[i + 1]), p += l[i].addedLength;
                        return s && h && (l[i] = e(a[i], a[0], n[i], o[0]), p += l[i].addedLength), r.totalLength = p, r
                    }, getNewSegment: function (t, e, i, r, s, a, h) {
                        var l, p = n(s = s < 0 ? 0 : s > 1 ? 1 : s, h), m = n(a = a > 1 ? 1 : a, h), c = t.length,
                            f = 1 - p, d = 1 - m, u = f * f * f, y = p * f * f * 3, g = p * p * f * 3, v = p * p * p,
                            x = f * f * d, k = p * f * d + f * p * d + f * f * m, b = p * p * d + f * p * m + p * f * m,
                            E = p * p * m, S = f * d * d, P = p * d * d + f * m * d + f * d * m,
                            A = p * m * d + f * m * m + p * d * m, _ = p * m * m, T = d * d * d,
                            D = m * d * d + d * m * d + d * d * m, C = m * m * d + d * m * m + m * d * m, w = m * m * m;
                        for (l = 0; l < c; l += 1) o[4 * l] = Math.round(1e3 * (u * t[l] + y * i[l] + g * r[l] + v * e[l])) / 1e3, o[4 * l + 1] = Math.round(1e3 * (x * t[l] + k * i[l] + b * r[l] + E * e[l])) / 1e3, o[4 * l + 2] = Math.round(1e3 * (S * t[l] + P * i[l] + A * r[l] + _ * e[l])) / 1e3, o[4 * l + 3] = Math.round(1e3 * (T * t[l] + D * i[l] + C * r[l] + w * e[l])) / 1e3;
                        return o
                    }, getPointInSegment: function (t, e, i, r, s, a) {
                        var o = n(s, a), h = 1 - o;
                        return [Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * i[0] + (o * o * h + h * o * o + o * h * o) * r[0] + o * o * o * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * i[1] + (o * o * h + h * o * o + o * h * o) * r[1] + o * o * o * e[1])) / 1e3]
                    }, buildBezierData: a, pointOnLine2D: t, pointOnLine3D: function (e, i, r, s, a, n, o, h, l) {
                        if (0 === r && 0 === n && 0 === l) return t(e, i, s, a, o, h);
                        var p, m = Math.sqrt(Math.pow(s - e, 2) + Math.pow(a - i, 2) + Math.pow(n - r, 2)),
                            c = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - i, 2) + Math.pow(l - r, 2)),
                            f = Math.sqrt(Math.pow(o - s, 2) + Math.pow(h - a, 2) + Math.pow(l - n, 2));
                        return (p = m > c ? m > f ? m - c - f : f - c - m : f > c ? f - c - m : c - m - f) > -1e-4 && p < 1e-4
                    }
                }
            }

            !function () {
                for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function (e, i) {
                    var r = (new Date).getTime(), s = Math.max(0, 16 - (r - t)), a = setTimeout(function () {
                        e(r + s)
                    }, s);
                    return t = r + s, a
                }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
                    clearTimeout(t)
                })
            }();
            var bez = bezFunction();

            function dataFunctionManager() {
                function t(t, e) {
                    for (var i = 0, r = e.length; i < r;) {
                        if (e[i].id === t) return e[i].layers.__used ? JSON.parse(JSON.stringify(e[i].layers)) : (e[i].layers.__used = !0, e[i].layers);
                        i += 1
                    }
                }

                function e(t) {
                    var r, s, a;
                    for (r = t.length - 1; r >= 0; r -= 1) if ("sh" == t[r].ty) {
                        if (t[r].ks.k.i) i(t[r].ks.k); else for (a = t[r].ks.k.length, s = 0; s < a; s += 1) t[r].ks.k[s].s && i(t[r].ks.k[s].s[0]), t[r].ks.k[s].e && i(t[r].ks.k[s].e[0]);
                        !0
                    } else "gr" == t[r].ty && e(t[r].it)
                }

                function i(t) {
                    var e, i = t.i.length;
                    for (e = 0; e < i; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
                }

                function r(t, e) {
                    var i = e ? e.split(".") : [100, 100, 100];
                    return t[0] > i[0] || !(i[0] > t[0]) && (t[1] > i[1] || !(i[1] > t[1]) && (t[2] > i[2] || !(i[2] > t[2]) && void 0))
                }

                var s, a = function () {
                    var t = [4, 4, 14];

                    function e(t) {
                        var e, i, r, s = t.length;
                        for (e = 0; e < s; e += 1) 5 === t[e].ty && (i = t[e], r = void 0, r = i.t.d, i.t.d = {
                            k: [{
                                s: r,
                                t: 0
                            }]
                        })
                    }

                    return function (i) {
                        if (r(t, i.v) && (e(i.layers), i.assets)) {
                            var s, a = i.assets.length;
                            for (s = 0; s < a; s += 1) i.assets[s].layers && e(i.assets[s].layers)
                        }
                    }
                }(), n = (s = [4, 7, 99], function (t) {
                    if (t.chars && !r(s, t.v)) {
                        var e, a, n, o, h, l = t.chars.length;
                        for (e = 0; e < l; e += 1) if (t.chars[e].data && t.chars[e].data.shapes) for (n = (h = t.chars[e].data.shapes[0].it).length, a = 0; a < n; a += 1) (o = h[a].ks.k).__converted || (i(h[a].ks.k), o.__converted = !0)
                    }
                }), o = function () {
                    var t = [4, 1, 9];

                    function e(t) {
                        var i, r, s, a = t.length;
                        for (i = 0; i < a; i += 1) if ("gr" === t[i].ty) e(t[i].it); else if ("fl" === t[i].ty || "st" === t[i].ty) if (t[i].c.k && t[i].c.k[0].i) for (s = t[i].c.k.length, r = 0; r < s; r += 1) t[i].c.k[r].s && (t[i].c.k[r].s[0] /= 255, t[i].c.k[r].s[1] /= 255, t[i].c.k[r].s[2] /= 255, t[i].c.k[r].s[3] /= 255), t[i].c.k[r].e && (t[i].c.k[r].e[0] /= 255, t[i].c.k[r].e[1] /= 255, t[i].c.k[r].e[2] /= 255, t[i].c.k[r].e[3] /= 255); else t[i].c.k[0] /= 255, t[i].c.k[1] /= 255, t[i].c.k[2] /= 255, t[i].c.k[3] /= 255
                    }

                    function i(t) {
                        var i, r = t.length;
                        for (i = 0; i < r; i += 1) 4 === t[i].ty && e(t[i].shapes)
                    }

                    return function (e) {
                        if (r(t, e.v) && (i(e.layers), e.assets)) {
                            var s, a = e.assets.length;
                            for (s = 0; s < a; s += 1) e.assets[s].layers && i(e.assets[s].layers)
                        }
                    }
                }(), h = function () {
                    var t = [4, 4, 18];

                    function e(t) {
                        var i, r, s;
                        for (i = t.length - 1; i >= 0; i -= 1) if ("sh" == t[i].ty) {
                            if (t[i].ks.k.i) t[i].ks.k.c = t[i].closed; else for (s = t[i].ks.k.length, r = 0; r < s; r += 1) t[i].ks.k[r].s && (t[i].ks.k[r].s[0].c = t[i].closed), t[i].ks.k[r].e && (t[i].ks.k[r].e[0].c = t[i].closed);
                            !0
                        } else "gr" == t[i].ty && e(t[i].it)
                    }

                    function i(t) {
                        var i, r, s, a, n, o, h = t.length;
                        for (r = 0; r < h; r += 1) {
                            if ((i = t[r]).hasMask) {
                                var l = i.masksProperties;
                                for (a = l.length, s = 0; s < a; s += 1) if (l[s].pt.k.i) l[s].pt.k.c = l[s].cl; else for (o = l[s].pt.k.length, n = 0; n < o; n += 1) l[s].pt.k[n].s && (l[s].pt.k[n].s[0].c = l[s].cl), l[s].pt.k[n].e && (l[s].pt.k[n].e[0].c = l[s].cl)
                            }
                            4 === i.ty && e(i.shapes)
                        }
                    }

                    return function (e) {
                        if (r(t, e.v) && (i(e.layers), e.assets)) {
                            var s, a = e.assets.length;
                            for (s = 0; s < a; s += 1) e.assets[s].layers && i(e.assets[s].layers)
                        }
                    }
                }();
                var l = {};
                return l.completeData = function (r, s) {
                    r.__complete || (o(r), a(r), n(r), h(r), function r(s, a, n) {
                        var o, h, l, p, m, c, f, d = s.length;
                        for (h = 0; h < d; h += 1) if ("ks" in (o = s[h]) && !o.completed) {
                            if (o.completed = !0, o.tt && (s[h - 1].td = o.tt), o.hasMask) {
                                var u = o.masksProperties;
                                for (p = u.length, l = 0; l < p; l += 1) if (u[l].pt.k.i) i(u[l].pt.k); else for (c = u[l].pt.k.length, m = 0; m < c; m += 1) u[l].pt.k[m].s && i(u[l].pt.k[m].s[0]), u[l].pt.k[m].e && i(u[l].pt.k[m].e[0])
                            }
                            0 === o.ty ? (o.layers = t(o.refId, a), r(o.layers, a, n)) : 4 === o.ty ? e(o.shapes) : 5 == o.ty && (0 !== (f = o).t.a.length || "m" in f.t.p || (f.singleShape = !0))
                        }
                    }(r.layers, r.assets, s), r.__complete = !0)
                }, l
            }

            var dataManager = dataFunctionManager(), FontManager = function () {
                var t = 5e3, e = {w: 0, size: 0, shapes: []}, i = [];

                function r(t, e) {
                    var i = createTag("span");
                    i.style.fontFamily = e;
                    var r = createTag("span");
                    r.innerHTML = "giItT1WQy@!-/#", i.style.position = "absolute", i.style.left = "-10000px", i.style.top = "-10000px", i.style.fontSize = "300px", i.style.fontVariant = "normal", i.style.fontStyle = "normal", i.style.fontWeight = "normal", i.style.letterSpacing = "0", i.appendChild(r), document.body.appendChild(i);
                    var s = r.offsetWidth;
                    return r.style.fontFamily = t + ", " + e, {node: r, w: s, parent: i}
                }

                function s(t, e) {
                    var i = createNS("text");
                    return i.style.fontSize = "100px", i.setAttribute("font-family", e.fFamily), i.setAttribute("font-style", e.fStyle), i.setAttribute("font-weight", e.fWeight), i.textContent = "1", e.fClass ? (i.style.fontFamily = "inherit", i.setAttribute("class", e.fClass)) : i.style.fontFamily = e.fFamily, t.appendChild(i), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, i
                }

                i = i.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
                var a = function () {
                    this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now()
                };
                return a.getCombinedCharacterCodes = function () {
                    return i
                }, a.prototype.addChars = function (t) {
                    if (t) {
                        this.chars || (this.chars = []);
                        var e, i, r, s = t.length, a = this.chars.length;
                        for (e = 0; e < s; e += 1) {
                            for (i = 0, r = !1; i < a;) this.chars[i].style === t[e].style && this.chars[i].fFamily === t[e].fFamily && this.chars[i].ch === t[e].ch && (r = !0), i += 1;
                            r || (this.chars.push(t[e]), a += 1)
                        }
                    }
                }, a.prototype.addFonts = function (t, e) {
                    if (t) {
                        if (this.chars) return this.isLoaded = !0, void (this.fonts = t.list);
                        var i, a = t.list, n = a.length, o = n;
                        for (i = 0; i < n; i += 1) {
                            var h, l, p = !0;
                            if (a[i].loaded = !1, a[i].monoCase = r(a[i].fFamily, "monospace"), a[i].sansCase = r(a[i].fFamily, "sans-serif"), a[i].fPath) {
                                if ("p" === a[i].fOrigin || 3 === a[i].origin) {
                                    if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + a[i].fFamily + '"], style[f-origin="3"][f-family="' + a[i].fFamily + '"]')).length > 0 && (p = !1), p) {
                                        var m = createTag("style");
                                        m.setAttribute("f-forigin", a[i].fOrigin), m.setAttribute("f-origin", a[i].origin), m.setAttribute("f-family", a[i].fFamily), m.type = "text/css", m.innerHTML = "@font-face {font-family: " + a[i].fFamily + "; font-style: normal; src: url('" + a[i].fPath + "');}", e.appendChild(m)
                                    }
                                } else if ("g" === a[i].fOrigin || 1 === a[i].origin) {
                                    for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l++) -1 !== h[l].href.indexOf(a[i].fPath) && (p = !1);
                                    if (p) {
                                        var c = createTag("link");
                                        c.setAttribute("f-forigin", a[i].fOrigin), c.setAttribute("f-origin", a[i].origin), c.type = "text/css", c.rel = "stylesheet", c.href = a[i].fPath, document.body.appendChild(c)
                                    }
                                } else if ("t" === a[i].fOrigin || 2 === a[i].origin) {
                                    for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l++) a[i].fPath === h[l].src && (p = !1);
                                    if (p) {
                                        var f = createTag("link");
                                        f.setAttribute("f-forigin", a[i].fOrigin), f.setAttribute("f-origin", a[i].origin), f.setAttribute("rel", "stylesheet"), f.setAttribute("href", a[i].fPath), e.appendChild(f)
                                    }
                                }
                            } else a[i].loaded = !0, o -= 1;
                            a[i].helper = s(e, a[i]), a[i].cache = {}, this.fonts.push(a[i])
                        }
                        0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
                    } else this.isLoaded = !0
                }, a.prototype.getCharData = function (t, i, r) {
                    for (var s = 0, a = this.chars.length; s < a;) {
                        if (this.chars[s].ch === t && this.chars[s].style === i && this.chars[s].fFamily === r) return this.chars[s];
                        s += 1
                    }
                    return console && console.warn && console.warn("Missing character from exported characters list: ", t, i, r), e
                }, a.prototype.getFontByName = function (t) {
                    for (var e = 0, i = this.fonts.length; e < i;) {
                        if (this.fonts[e].fName === t) return this.fonts[e];
                        e += 1
                    }
                    return this.fonts[0]
                }, a.prototype.measureText = function (t, e, i) {
                    var r = this.getFontByName(e), s = t.charCodeAt(0);
                    if (!r.cache[s + 1]) {
                        var a = r.helper;
                        if (" " === t) {
                            a.textContent = "|" + t + "|";
                            var n = a.getComputedTextLength();
                            a.textContent = "||";
                            var o = a.getComputedTextLength();
                            r.cache[s + 1] = (n - o) / 100
                        } else a.textContent = t, r.cache[s + 1] = a.getComputedTextLength() / 100
                    }
                    return r.cache[s + 1] * i
                }, a.prototype.checkLoadedFonts = function () {
                    var e, i, r, s = this.fonts.length, a = s;
                    for (e = 0; e < s; e += 1) this.fonts[e].loaded ? a -= 1 : "n" === this.fonts[e].fOrigin || 0 === this.fonts[e].origin ? this.fonts[e].loaded = !0 : (i = this.fonts[e].monoCase.node, r = this.fonts[e].monoCase.w, i.offsetWidth !== r ? (a -= 1, this.fonts[e].loaded = !0) : (i = this.fonts[e].sansCase.node, r = this.fonts[e].sansCase.w, i.offsetWidth !== r && (a -= 1, this.fonts[e].loaded = !0)), this.fonts[e].loaded && (this.fonts[e].sansCase.parent.parentNode.removeChild(this.fonts[e].sansCase.parent), this.fonts[e].monoCase.parent.parentNode.removeChild(this.fonts[e].monoCase.parent)));
                    0 !== a && Date.now() - this.initTime < t ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function () {
                        this.isLoaded = !0
                    }.bind(this), 0)
                }, a.prototype.loaded = function () {
                    return this.isLoaded
                }, a
            }(), PropertyFactory = function () {
                var t = initialDefaultFrame, e = Math.abs;

                function i(t, e) {
                    var i, s = this.offsetTime;
                    "multidimensional" === this.propType && (i = createTypedArray("float32", this.pv.length));
                    for (var a, n, o, h, l, p, m, c, f = e.lastIndex, d = f, u = this.keyframes.length - 1, y = !0; y;) {
                        if (a = this.keyframes[d], n = this.keyframes[d + 1], d === u - 1 && t >= n.t - s) {
                            a.h && (a = n), f = 0;
                            break
                        }
                        if (n.t - s > t) {
                            f = d;
                            break
                        }
                        d < u - 1 ? d += 1 : (f = 0, y = !1)
                    }
                    var g, v, x, k, b, E, S, P, A, _, T = n.t - s, D = a.t - s;
                    if (a.to) {
                        a.bezierData || (a.bezierData = bez.buildBezierData(a.s, n.s || a.e, a.to, a.ti));
                        var C = a.bezierData;
                        if (t >= T || t < D) {
                            var w = t >= T ? C.points.length - 1 : 0;
                            for (h = C.points[w].point.length, o = 0; o < h; o += 1) i[o] = C.points[w].point[o]
                        } else {
                            a.__fnct ? c = a.__fnct : (c = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get, a.__fnct = c), l = c((t - D) / (T - D));
                            var M, F = C.segmentLength * l,
                                I = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastAddedLength : 0;
                            for (m = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastPoint : 0, y = !0, p = C.points.length; y;) {
                                if (I += C.points[m].partialLength, 0 === F || 0 === l || m === C.points.length - 1) {
                                    for (h = C.points[m].point.length, o = 0; o < h; o += 1) i[o] = C.points[m].point[o];
                                    break
                                }
                                if (F >= I && F < I + C.points[m + 1].partialLength) {
                                    for (M = (F - I) / C.points[m + 1].partialLength, h = C.points[m].point.length, o = 0; o < h; o += 1) i[o] = C.points[m].point[o] + (C.points[m + 1].point[o] - C.points[m].point[o]) * M;
                                    break
                                }
                                m < p - 1 ? m += 1 : y = !1
                            }
                            e._lastPoint = m, e._lastAddedLength = I - C.points[m].partialLength, e._lastKeyframeIndex = d
                        }
                    } else {
                        var V, B, G, R, L;
                        if (u = a.s.length, g = n.s || a.e, this.sh && 1 !== a.h) if (t >= T) i[0] = g[0], i[1] = g[1], i[2] = g[2]; else if (t <= D) i[0] = a.s[0], i[1] = a.s[1], i[2] = a.s[2]; else {
                            var O = r(a.s), N = r(g);
                            v = i, x = function (t, e, i) {
                                var r, s, a, n, o, h = [], l = t[0], p = t[1], m = t[2], c = t[3], f = e[0], d = e[1],
                                    u = e[2], y = e[3];
                                (s = l * f + p * d + m * u + c * y) < 0 && (s = -s, f = -f, d = -d, u = -u, y = -y);
                                1 - s > 1e-6 ? (r = Math.acos(s), a = Math.sin(r), n = Math.sin((1 - i) * r) / a, o = Math.sin(i * r) / a) : (n = 1 - i, o = i);
                                return h[0] = n * l + o * f, h[1] = n * p + o * d, h[2] = n * m + o * u, h[3] = n * c + o * y, h
                            }(O, N, (t - D) / (T - D)), k = x[0], b = x[1], E = x[2], S = x[3], P = Math.atan2(2 * b * S - 2 * k * E, 1 - 2 * b * b - 2 * E * E), A = Math.asin(2 * k * b + 2 * E * S), _ = Math.atan2(2 * k * S - 2 * b * E, 1 - 2 * k * k - 2 * E * E), v[0] = P / degToRads, v[1] = A / degToRads, v[2] = _ / degToRads
                        } else for (d = 0; d < u; d += 1) 1 !== a.h && (t >= T ? l = 1 : t < D ? l = 0 : (a.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []), a.__fnct[d] ? c = a.__fnct[d] : (V = void 0 === a.o.x[d] ? a.o.x[0] : a.o.x[d], B = void 0 === a.o.y[d] ? a.o.y[0] : a.o.y[d], G = void 0 === a.i.x[d] ? a.i.x[0] : a.i.x[d], R = void 0 === a.i.y[d] ? a.i.y[0] : a.i.y[d], c = BezierFactory.getBezierEasing(V, B, G, R).get, a.__fnct[d] = c)) : a.__fnct ? c = a.__fnct : (V = a.o.x, B = a.o.y, G = a.i.x, R = a.i.y, c = BezierFactory.getBezierEasing(V, B, G, R).get, a.__fnct = c), l = c((t - D) / (T - D)))), g = n.s || a.e, L = 1 === a.h ? a.s[d] : a.s[d] + (g[d] - a.s[d]) * l, 1 === u ? i = L : i[d] = L
                    }
                    return e.lastIndex = f, i
                }

                function r(t) {
                    var e = t[0] * degToRads, i = t[1] * degToRads, r = t[2] * degToRads, s = Math.cos(e / 2),
                        a = Math.cos(i / 2), n = Math.cos(r / 2), o = Math.sin(e / 2), h = Math.sin(i / 2),
                        l = Math.sin(r / 2);
                    return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l]
                }

                function s() {
                    var e = this.comp.renderedFrame - this.offsetTime, i = this.keyframes[0].t - this.offsetTime,
                        r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
                    if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= r && e >= r || this._caching.lastFrame < i && e < i))) {
                        this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
                        var s = this.interpolateValue(e, this._caching);
                        this.pv = s
                    }
                    return this._caching.lastFrame = e, this.pv
                }

                function a(t) {
                    var i;
                    if ("unidimensional" === this.propType) i = t * this.mult, e(this.v - i) > 1e-5 && (this.v = i, this._mdf = !0); else for (var r = 0, s = this.v.length; r < s;) i = t[r] * this.mult, e(this.v[r] - i) > 1e-5 && (this.v[r] = i, this._mdf = !0), r += 1
                }

                function n() {
                    if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv); else {
                        this.lock = !0, this._mdf = this._isFirstFrame;
                        var t, e = this.effectsSequence.length, i = this.kf ? this.pv : this.data.k;
                        for (t = 0; t < e; t += 1) i = this.effectsSequence[t](i);
                        this.setVValue(i), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
                    }
                }

                function o(t) {
                    this.effectsSequence.push(t), this.container.addDynamicProperty(this)
                }

                function h(t, e, i, r) {
                    this.propType = "unidimensional", this.mult = i || 1, this.data = e, this.v = i ? e.k * i : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = r, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.addEffect = o
                }

                function l(t, e, i, r) {
                    this.propType = "multidimensional", this.mult = i || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = r, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
                    var s, h = e.k.length;
                    this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h);
                    createTypedArray("float32", h);
                    for (this.vel = createTypedArray("float32", h), s = 0; s < h; s += 1) this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
                    this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = n, this.setVValue = a, this.addEffect = o
                }

                function p(e, r, h, l) {
                    this.propType = "unidimensional", this.keyframes = r.k, this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
                        lastFrame: t,
                        lastIndex: 0,
                        value: 0,
                        _lastKeyframeIndex: -1
                    }, this.k = !0, this.kf = !0, this.data = r, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.interpolateValue = i, this.effectsSequence = [s.bind(this)], this.addEffect = o
                }

                function m(e, r, h, l) {
                    this.propType = "multidimensional";
                    var p, m, c, f, d, u = r.k.length;
                    for (p = 0; p < u - 1; p += 1) r.k[p].to && r.k[p].s && r.k[p].e && (m = r.k[p].s, c = r.k[p].e, f = r.k[p].to, d = r.k[p].ti, (2 === m.length && (m[0] !== c[0] || m[1] !== c[1]) && bez.pointOnLine2D(m[0], m[1], c[0], c[1], m[0] + f[0], m[1] + f[1]) && bez.pointOnLine2D(m[0], m[1], c[0], c[1], c[0] + d[0], c[1] + d[1]) || 3 === m.length && (m[0] !== c[0] || m[1] !== c[1] || m[2] !== c[2]) && bez.pointOnLine3D(m[0], m[1], m[2], c[0], c[1], c[2], m[0] + f[0], m[1] + f[1], m[2] + f[2]) && bez.pointOnLine3D(m[0], m[1], m[2], c[0], c[1], c[2], c[0] + d[0], c[1] + d[1], c[2] + d[2])) && (r.k[p].to = null, r.k[p].ti = null), m[0] === c[0] && m[1] === c[1] && 0 === f[0] && 0 === f[1] && 0 === d[0] && 0 === d[1] && (2 === m.length || m[2] === c[2] && 0 === f[2] && 0 === d[2]) && (r.k[p].to = null, r.k[p].ti = null));
                    this.effectsSequence = [s.bind(this)], this.keyframes = r.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = n, this.setVValue = a, this.interpolateValue = i, this.frameId = -1;
                    var y = r.k[0].s.length;
                    for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p = 0; p < y; p += 1) this.v[p] = t, this.pv[p] = t;
                    this._caching = {
                        lastFrame: t,
                        lastIndex: 0,
                        value: createTypedArray("float32", y)
                    }, this.addEffect = o
                }

                return {
                    getProp: function (t, e, i, r, s) {
                        var a;
                        if (e.k.length) if ("number" == typeof e.k[0]) a = new l(t, e, r, s); else switch (i) {
                            case 0:
                                a = new p(t, e, r, s);
                                break;
                            case 1:
                                a = new m(t, e, r, s)
                        } else a = new h(t, e, r, s);
                        return a.effectsSequence.length && s.addDynamicProperty(a), a
                    }
                }
            }(), TransformPropertyFactory = function () {
                function t(t, e, i) {
                    if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix, this.pre = new Matrix, this.appliedTransformations = 0, this.initDynamicPropertyContainer(i || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {k: [0, 0, 0]}, 1, 0, this), e.rx) {
                        if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
                            var r, s = e.or.k.length;
                            for (r = 0; r < s; r += 1) e.or.k[r].to = e.or.k[r].ti = null
                        }
                        this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0
                    } else this.r = PropertyFactory.getProp(t, e.r || {k: 0}, 0, degToRads, this);
                    e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {k: [0, 0, 0]}, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {k: [100, 100, 100]}, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
                        _mdf: !1,
                        v: 1
                    }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
                }

                return t.prototype = {
                    applyToMatrix: function (t) {
                        var e = this._mdf;
                        this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                    }, getValue: function (t) {
                        if (this.elem.globalData.frameId !== this.frameId) {
                            if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || t) {
                                if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                                    var e, i, r = this.elem.globalData.frameRate;
                                    if (this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / r, 0), i = this.p.getValueAtTime(this.p.keyframes[0].t / r, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / r, 0), i = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .01) / r, 0)) : (e = this.p.pv, i = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / r, this.p.offsetTime)); else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                                        e = [], i = [];
                                        var s = this.px, a = this.py;
                                        s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t ? (e[0] = s.getValueAtTime((s.keyframes[0].t + .01) / r, 0), e[1] = a.getValueAtTime((a.keyframes[0].t + .01) / r, 0), i[0] = s.getValueAtTime(s.keyframes[0].t / r, 0), i[1] = a.getValueAtTime(a.keyframes[0].t / r, 0)) : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t ? (e[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / r, 0), e[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / r, 0), i[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - .01) / r, 0), i[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / r, 0)) : (e = [s.pv, a.pv], i[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - .01) / r, s.offsetTime), i[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / r, a.offsetTime))
                                    }
                                    this.v.rotate(-Math.atan2(e[1] - i[1], e[0] - i[0]))
                                }
                                this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                            }
                            this.frameId = this.elem.globalData.frameId
                        }
                    }, precalculateMatrix: function () {
                        if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
                            if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                                if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                                this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
                            }
                            if (this.r) {
                                if (this.r.effectsSequence.length) return;
                                this.pre.rotate(-this.r.v), this.appliedTransformations = 4
                            } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
                        }
                    }, autoOrient: function () {
                    }
                }, extendPrototype([DynamicPropertyContainer], t), t.prototype.addDynamicProperty = function (t) {
                    this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
                }, t.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
                    getTransformProperty: function (e, i, r) {
                        return new t(e, i, r)
                    }
                }
            }();

            function ShapePath() {
                this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength)
            }

            ShapePath.prototype.setPathData = function (t, e) {
                this.c = t, this.setLength(e);
                for (var i = 0; i < e;) this.v[i] = point_pool.newElement(), this.o[i] = point_pool.newElement(), this.i[i] = point_pool.newElement(), i += 1
            }, ShapePath.prototype.setLength = function (t) {
                for (; this._maxLength < t;) this.doubleArrayLength();
                this._length = t
            }, ShapePath.prototype.doubleArrayLength = function () {
                this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2
            }, ShapePath.prototype.setXYAt = function (t, e, i, r, s) {
                var a;
                switch (this._length = Math.max(this._length, r + 1), this._length >= this._maxLength && this.doubleArrayLength(), i) {
                    case"v":
                        a = this.v;
                        break;
                    case"i":
                        a = this.i;
                        break;
                    case"o":
                        a = this.o
                }
                (!a[r] || a[r] && !s) && (a[r] = point_pool.newElement()), a[r][0] = t, a[r][1] = e
            }, ShapePath.prototype.setTripleAt = function (t, e, i, r, s, a, n, o) {
                this.setXYAt(t, e, "v", n, o), this.setXYAt(i, r, "o", n, o), this.setXYAt(s, a, "i", n, o)
            }, ShapePath.prototype.reverse = function () {
                var t = new ShapePath;
                t.setPathData(this.c, this._length);
                var e = this.v, i = this.o, r = this.i, s = 0;
                this.c && (t.setTripleAt(e[0][0], e[0][1], r[0][0], r[0][1], i[0][0], i[0][1], 0, !1), s = 1);
                var a, n = this._length - 1, o = this._length;
                for (a = s; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], r[n][0], r[n][1], i[n][0], i[n][1], a, !1), n -= 1;
                return t
            };
            var ShapePropertyFactory = function () {
                var t = -999999;

                function e(t, e, i) {
                    var r, s, a, n, o, h, l, p, m, c = i.lastIndex, f = this.keyframes;
                    if (t < f[0].t - this.offsetTime) r = f[0].s[0], a = !0, c = 0; else if (t >= f[f.length - 1].t - this.offsetTime) r = f[f.length - 1].s ? f[f.length - 1].s[0] : f[f.length - 2].e[0], a = !0; else {
                        for (var d, u, y = c, g = f.length - 1, v = !0; v && (d = f[y], !((u = f[y + 1]).t - this.offsetTime > t));) y < g - 1 ? y += 1 : v = !1;
                        if (c = y, !(a = 1 === d.h)) {
                            if (t >= u.t - this.offsetTime) p = 1; else if (t < d.t - this.offsetTime) p = 0; else {
                                var x;
                                d.__fnct ? x = d.__fnct : (x = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = x), p = x((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)))
                            }
                            s = u.s ? u.s[0] : d.e[0]
                        }
                        r = d.s[0]
                    }
                    for (h = e._length, l = r.i[0].length, i.lastIndex = c, n = 0; n < h; n += 1) for (o = 0; o < l; o += 1) m = a ? r.i[n][o] : r.i[n][o] + (s.i[n][o] - r.i[n][o]) * p, e.i[n][o] = m, m = a ? r.o[n][o] : r.o[n][o] + (s.o[n][o] - r.o[n][o]) * p, e.o[n][o] = m, m = a ? r.v[n][o] : r.v[n][o] + (s.v[n][o] - r.v[n][o]) * p, e.v[n][o] = m
                }

                function i() {
                    var e = this.comp.renderedFrame - this.offsetTime, i = this.keyframes[0].t - this.offsetTime,
                        r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime, s = this._caching.lastFrame;
                    return s !== t && (s < i && e < i || s > r && e > r) || (this._caching.lastIndex = s < e ? this._caching.lastIndex : 0, this.interpolateShape(e, this.pv, this._caching)), this._caching.lastFrame = e, this.pv
                }

                function r() {
                    this.paths = this.localShapeCollection
                }

                function s(t) {
                    (function (t, e) {
                        if (t._length !== e._length || t.c !== e.c) return !1;
                        var i, r = t._length;
                        for (i = 0; i < r; i += 1) if (t.v[i][0] !== e.v[i][0] || t.v[i][1] !== e.v[i][1] || t.o[i][0] !== e.o[i][0] || t.o[i][1] !== e.o[i][1] || t.i[i][0] !== e.i[i][0] || t.i[i][1] !== e.i[i][1]) return !1;
                        return !0
                    })(this.v, t) || (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
                }

                function a() {
                    if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv); else {
                        this.lock = !0, this._mdf = !1;
                        var t, e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
                            i = this.effectsSequence.length;
                        for (t = 0; t < i; t += 1) e = this.effectsSequence[t](e);
                        this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId
                    }
                }

                function n(t, e, i) {
                    this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
                    var s = 3 === i ? e.pt.k : e.ks.k;
                    this.v = shape_pool.clone(s), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r, this.effectsSequence = []
                }

                function o(t) {
                    this.effectsSequence.push(t), this.container.addDynamicProperty(this)
                }

                function h(e, s, a) {
                    this.propType = "shape", this.comp = e.comp, this.elem = e, this.container = e, this.offsetTime = e.data.st, this.keyframes = 3 === a ? s.pt.k : s.ks.k, this.k = !0, this.kf = !0;
                    var n = this.keyframes[0].s[0].i.length;
                    this.keyframes[0].s[0].i[0].length;
                    this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, n), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = r, this._caching = {
                        lastFrame: t,
                        lastIndex: 0
                    }, this.effectsSequence = [i.bind(this)]
                }

                n.prototype.interpolateShape = e, n.prototype.getValue = a, n.prototype.setVValue = s, n.prototype.addEffect = o, h.prototype.getValue = a, h.prototype.interpolateShape = e, h.prototype.setVValue = s, h.prototype.addEffect = o;
                var l = function () {
                    var t = roundCorner;

                    function e(t, e) {
                        this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
                    }

                    return e.prototype = {
                        reset: r, getValue: function () {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath())
                        }, convertEllToPath: function () {
                            var e = this.p.v[0], i = this.p.v[1], r = this.s.v[0] / 2, s = this.s.v[1] / 2,
                                a = 3 !== this.d, n = this.v;
                            n.v[0][0] = e, n.v[0][1] = i - s, n.v[1][0] = a ? e + r : e - r, n.v[1][1] = i, n.v[2][0] = e, n.v[2][1] = i + s, n.v[3][0] = a ? e - r : e + r, n.v[3][1] = i, n.i[0][0] = a ? e - r * t : e + r * t, n.i[0][1] = i - s, n.i[1][0] = a ? e + r : e - r, n.i[1][1] = i - s * t, n.i[2][0] = a ? e + r * t : e - r * t, n.i[2][1] = i + s, n.i[3][0] = a ? e - r : e + r, n.i[3][1] = i + s * t, n.o[0][0] = a ? e + r * t : e - r * t, n.o[0][1] = i - s, n.o[1][0] = a ? e + r : e - r, n.o[1][1] = i + s * t, n.o[2][0] = a ? e - r * t : e + r * t, n.o[2][1] = i + s, n.o[3][0] = a ? e - r : e + r, n.o[3][1] = i - s * t
                        }
                    }, extendPrototype([DynamicPropertyContainer], e), e
                }(), p = function () {
                    function t(t, e) {
                        this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
                    }

                    return t.prototype = {
                        reset: r, getValue: function () {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath())
                        }, convertStarToPath: function () {
                            var t, e, i, r, s = 2 * Math.floor(this.pt.v), a = 2 * Math.PI / s, n = !0, o = this.or.v,
                                h = this.ir.v, l = this.os.v, p = this.is.v, m = 2 * Math.PI * o / (2 * s),
                                c = 2 * Math.PI * h / (2 * s), f = -Math.PI / 2;
                            f += this.r.v;
                            var d = 3 === this.data.d ? -1 : 1;
                            for (this.v._length = 0, t = 0; t < s; t += 1) {
                                i = n ? l : p, r = n ? m : c;
                                var u = (e = n ? o : h) * Math.cos(f), y = e * Math.sin(f),
                                    g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                                    v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                                u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * r * i * d, y - v * r * i * d, u + g * r * i * d, y + v * r * i * d, t, !0), n = !n, f += a * d
                            }
                        }, convertPolygonToPath: function () {
                            var t, e = Math.floor(this.pt.v), i = 2 * Math.PI / e, r = this.or.v, s = this.os.v,
                                a = 2 * Math.PI * r / (4 * e), n = -Math.PI / 2, o = 3 === this.data.d ? -1 : 1;
                            for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
                                var h = r * Math.cos(n), l = r * Math.sin(n),
                                    p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                                    m = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                                h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - m * a * s * o, h + p * a * s * o, l + m * a * s * o, t, !0), n += i * o
                            }
                            this.paths.length = 0, this.paths[0] = this.v
                        }
                    }, extendPrototype([DynamicPropertyContainer], t), t
                }(), m = function () {
                    function t(t, e) {
                        this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
                    }

                    return t.prototype = {
                        convertRectToPath: function () {
                            var t = this.p.v[0], e = this.p.v[1], i = this.s.v[0] / 2, r = this.s.v[1] / 2,
                                s = bm_min(i, r, this.r.v), a = s * (1 - roundCorner);
                            this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + i, e - r + s, t + i, e - r + s, t + i, e - r + a, 0, !0), this.v.setTripleAt(t + i, e + r - s, t + i, e + r - a, t + i, e + r - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + i - s, e + r, t + i - s, e + r, t + i - a, e + r, 2, !0), this.v.setTripleAt(t - i + s, e + r, t - i + a, e + r, t - i + s, e + r, 3, !0), this.v.setTripleAt(t - i, e + r - s, t - i, e + r - s, t - i, e + r - a, 4, !0), this.v.setTripleAt(t - i, e - r + s, t - i, e - r + a, t - i, e - r + s, 5, !0), this.v.setTripleAt(t - i + s, e - r, t - i + s, e - r, t - i + a, e - r, 6, !0), this.v.setTripleAt(t + i - s, e - r, t + i - a, e - r, t + i - s, e - r, 7, !0)) : (this.v.setTripleAt(t - i, e + r, t - i + a, e + r, t - i, e + r, 2), this.v.setTripleAt(t - i, e - r, t - i, e - r + a, t - i, e - r, 3))) : (this.v.setTripleAt(t + i, e - r + s, t + i, e - r + a, t + i, e - r + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + i - s, e - r, t + i - s, e - r, t + i - a, e - r, 1, !0), this.v.setTripleAt(t - i + s, e - r, t - i + a, e - r, t - i + s, e - r, 2, !0), this.v.setTripleAt(t - i, e - r + s, t - i, e - r + s, t - i, e - r + a, 3, !0), this.v.setTripleAt(t - i, e + r - s, t - i, e + r - a, t - i, e + r - s, 4, !0), this.v.setTripleAt(t - i + s, e + r, t - i + s, e + r, t - i + a, e + r, 5, !0), this.v.setTripleAt(t + i - s, e + r, t + i - a, e + r, t + i - s, e + r, 6, !0), this.v.setTripleAt(t + i, e + r - s, t + i, e + r - s, t + i, e + r - a, 7, !0)) : (this.v.setTripleAt(t - i, e - r, t - i + a, e - r, t - i, e - r, 1, !0), this.v.setTripleAt(t - i, e + r, t - i, e + r - a, t - i, e + r, 2, !0), this.v.setTripleAt(t + i, e + r, t + i - a, e + r, t + i, e + r, 3, !0)))
                        }, getValue: function (t) {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath())
                        }, reset: r
                    }, extendPrototype([DynamicPropertyContainer], t), t
                }();
                var c = {
                    getShapeProp: function (t, e, i) {
                        var r;
                        return 3 === i || 4 === i ? r = (3 === i ? e.pt : e.ks).k.length ? new h(t, e, i) : new n(t, e, i) : 5 === i ? r = new m(t, e) : 6 === i ? r = new l(t, e) : 7 === i && (r = new p(t, e)), r.k && t.addDynamicProperty(r), r
                    }, getConstructorFunction: function () {
                        return n
                    }, getKeyframedConstructorFunction: function () {
                        return h
                    }
                };
                return c
            }(), ShapeModifiers = function () {
                var t = {}, e = {};
                return t.registerModifier = function (t, i) {
                    e[t] || (e[t] = i)
                }, t.getModifier = function (t, i, r) {
                    return new e[t](i, r)
                }, t
            }();

            function ShapeModifier() {
            }

            function TrimModifier() {
            }

            function RoundCornersModifier() {
            }

            function RepeaterModifier() {
            }

            function ShapeCollection() {
                this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength)
            }

            function DashProperty(t, e, i, r) {
                this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = i, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(r);
                var s, a, n = e.length || 0;
                for (s = 0; s < n; s += 1) a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
                    n: e[s].n,
                    p: a
                };
                this.k || this.getValue(!0), this._isAnimated = this.k
            }

            function GradientProperty(t, e, i) {
                this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
                var r = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
                this.o = createTypedArray("float32", r), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = r, this.initDynamicPropertyContainer(i), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
            }

            ShapeModifier.prototype.initModifierProperties = function () {
            }, ShapeModifier.prototype.addShapeToModifier = function () {
            }, ShapeModifier.prototype.addShape = function (t) {
                if (!this.closed) {
                    var e = {shape: t.sh, data: t, localShapeCollection: shapeCollection_pool.newShapeCollection()};
                    this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated()
                }
            }, ShapeModifier.prototype.init = function (t, e) {
                this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }, ShapeModifier.prototype.processKeys = function () {
                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
            }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
                this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
            }, TrimModifier.prototype.addShapeToModifier = function (t) {
                t.pathsData = []
            }, TrimModifier.prototype.calculateShapeEdges = function (t, e, i, r, s) {
                var a = [];
                e <= 1 ? a.push({s: t, e: e}) : t >= 1 ? a.push({s: t - 1, e: e - 1}) : (a.push({
                    s: t,
                    e: 1
                }), a.push({s: 0, e: e - 1}));
                var n, o, h = [], l = a.length;
                for (n = 0; n < l; n += 1) {
                    var p, m;
                    if ((o = a[n]).e * s < r || o.s * s > r + i) ; else p = o.s * s <= r ? 0 : (o.s * s - r) / i, m = o.e * s >= r + i ? 1 : (o.e * s - r) / i, h.push([p, m])
                }
                return h.length || h.push([0, 0]), h
            }, TrimModifier.prototype.releasePathsData = function (t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1) segments_length_pool.release(t[e]);
                return t.length = 0, t
            }, TrimModifier.prototype.processShapes = function (t) {
                var e, i, r;
                if (this._mdf || t) {
                    var s = this.o.v % 360 / 360;
                    if (s < 0 && (s += 1), (e = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + s) > (i = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + s)) {
                        var a = e;
                        e = i, i = a
                    }
                    e = 1e-4 * Math.round(1e4 * e), i = 1e-4 * Math.round(1e4 * i), this.sValue = e, this.eValue = i
                } else e = this.sValue, i = this.eValue;
                var n, o, h, l, p, m, c = this.shapes.length, f = 0;
                if (i === e) for (n = 0; n < c; n += 1) this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection; else if (1 === i && 0 === e || 0 === i && 1 === e) {
                    if (this._mdf) for (n = 0; n < c; n += 1) this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0
                } else {
                    var d, u, y = [];
                    for (n = 0; n < c; n += 1) if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
                        if (h = (r = d.shape.paths)._length, m = 0, !d.shape._mdf && d.pathsData.length) m = d.totalShapeLength; else {
                            for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(r.shapes[o]), l.push(p), m += p.totalLength;
                            d.totalShapeLength = m, d.pathsData = l
                        }
                        f += m, d.shape._mdf = !0
                    } else d.shape.paths = d.localShapeCollection;
                    var g, v = e, x = i, k = 0;
                    for (n = c - 1; n >= 0; n -= 1) if ((d = this.shapes[n]).shape._mdf) {
                        for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && c > 1 ? (g = this.calculateShapeEdges(e, i, d.totalShapeLength, k, f), k += d.totalShapeLength) : g = [[v, x]], h = g.length, o = 0; o < h; o += 1) {
                            v = g[o][0], x = g[o][1], y.length = 0, x <= 1 ? y.push({
                                s: d.totalShapeLength * v,
                                e: d.totalShapeLength * x
                            }) : v >= 1 ? y.push({
                                s: d.totalShapeLength * (v - 1),
                                e: d.totalShapeLength * (x - 1)
                            }) : (y.push({s: d.totalShapeLength * v, e: d.totalShapeLength}), y.push({
                                s: 0,
                                e: d.totalShapeLength * (x - 1)
                            }));
                            var b = this.addShapes(d, y[0]);
                            if (y[0].s !== y[0].e) {
                                if (y.length > 1) if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                                    var E = b.pop();
                                    this.addPaths(b, u), b = this.addShapes(d, y[1], E)
                                } else this.addPaths(b, u), b = this.addShapes(d, y[1]);
                                this.addPaths(b, u)
                            }
                        }
                        d.shape.paths = u
                    }
                }
            }, TrimModifier.prototype.addPaths = function (t, e) {
                var i, r = t.length;
                for (i = 0; i < r; i += 1) e.addShape(t[i])
            }, TrimModifier.prototype.addSegment = function (t, e, i, r, s, a, n) {
                s.setXYAt(e[0], e[1], "o", a), s.setXYAt(i[0], i[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(r[0], r[1], "v", a + 1)
            }, TrimModifier.prototype.addSegmentFromArray = function (t, e, i, r) {
                e.setXYAt(t[1], t[5], "o", i), e.setXYAt(t[2], t[6], "i", i + 1), r && e.setXYAt(t[0], t[4], "v", i), e.setXYAt(t[3], t[7], "v", i + 1)
            }, TrimModifier.prototype.addShapes = function (t, e, i) {
                var r, s, a, n, o, h, l, p, m = t.pathsData, c = t.shape.paths.shapes, f = t.shape.paths._length, d = 0,
                    u = [], y = !0;
                for (i ? (o = i._length, p = i._length) : (i = shape_pool.newElement(), o = 0, p = 0), u.push(i), r = 0; r < f; r += 1) {
                    for (h = m[r].lengths, i.c = c[r].c, a = c[r].c ? h.length : h.length + 1, s = 1; s < a; s += 1) if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, i.c = !1; else {
                        if (d > e.e) {
                            i.c = !1;
                            break
                        }
                        e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(c[r].v[s - 1], c[r].o[s - 1], c[r].i[s], c[r].v[s], i, o, y), y = !1) : (l = bez.getNewSegment(c[r].v[s - 1], c[r].v[s], c[r].o[s - 1], c[r].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, i, o, y), y = !1, i.c = !1), d += n.addedLength, o += 1
                    }
                    if (c[r].c && h.length) {
                        if (n = h[s - 1], d <= e.e) {
                            var g = h[s - 1].addedLength;
                            e.s <= d && e.e >= d + g ? (this.addSegment(c[r].v[s - 1], c[r].o[s - 1], c[r].i[0], c[r].v[0], i, o, y), y = !1) : (l = bez.getNewSegment(c[r].v[s - 1], c[r].v[0], c[r].o[s - 1], c[r].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, i, o, y), y = !1, i.c = !1)
                        } else i.c = !1;
                        d += n.addedLength, o += 1
                    }
                    if (i._length && (i.setXYAt(i.v[p][0], i.v[p][1], "i", p), i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], "o", i._length - 1)), d > e.e) break;
                    r < f - 1 && (i = shape_pool.newElement(), y = !0, u.push(i), o = 0)
                }
                return u
            }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
                this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length
            }, RoundCornersModifier.prototype.processPath = function (t, e) {
                var i = shape_pool.newElement();
                i.c = t.c;
                var r, s, a, n, o, h, l, p, m, c, f, d, u, y = t._length, g = 0;
                for (r = 0; r < y; r += 1) s = t.v[r], n = t.o[r], a = t.i[r], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== r && r !== y - 1 || t.c ? (o = 0 === r ? t.v[y - 1] : t.v[r - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, m = u = s[1] - (s[1] - o[1]) * l, c = p - (p - s[0]) * roundCorner, f = m - (m - s[1]) * roundCorner, i.setTripleAt(p, m, c, f, d, u, g), g += 1, o = r === y - 1 ? t.v[0] : t.v[r + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = c = s[0] + (o[0] - s[0]) * l, m = f = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = m - (m - s[1]) * roundCorner, i.setTripleAt(p, m, c, f, d, u, g), g += 1) : (i.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g), g += 1) : (i.setTripleAt(t.v[r][0], t.v[r][1], t.o[r][0], t.o[r][1], t.i[r][0], t.i[r][1], g), g += 1);
                return i
            }, RoundCornersModifier.prototype.processShapes = function (t) {
                var e, i, r, s, a, n, o = this.shapes.length, h = this.rd.v;
                if (0 !== h) for (i = 0; i < o; i += 1) {
                    if ((a = this.shapes[i]).shape.paths, n = a.localShapeCollection, a.shape._mdf || this._mdf || t) for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, r = 0; r < s; r += 1) n.addShape(this.processPath(e[r], h));
                    a.shape.paths = a.localShapeCollection
                }
                this.dynamicProperties.length || (this._mdf = !1)
            }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
                this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix, this.rMatrix = new Matrix, this.sMatrix = new Matrix, this.tMatrix = new Matrix, this.matrix = new Matrix
            }, RepeaterModifier.prototype.applyTransforms = function (t, e, i, r, s, a) {
                var n = a ? -1 : 1, o = r.s.v[0] + (1 - r.s.v[0]) * (1 - s), h = r.s.v[1] + (1 - r.s.v[1]) * (1 - s);
                t.translate(r.p.v[0] * n * s, r.p.v[1] * n * s, r.p.v[2]), e.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]), e.rotate(-r.r.v * n * s), e.translate(r.a.v[0], r.a.v[1], r.a.v[2]), i.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]), i.scale(a ? 1 / o : o, a ? 1 / h : h), i.translate(r.a.v[0], r.a.v[1], r.a.v[2])
            }, RepeaterModifier.prototype.init = function (t, e, i, r) {
                this.elem = t, this.arr = e, this.pos = i, this.elemsData = r, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[i]);
                for (; i > 0;) i -= 1, this._elements.unshift(e[i]), 1;
                this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }, RepeaterModifier.prototype.resetElements = function (t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it)
            }, RepeaterModifier.prototype.cloneElements = function (t) {
                t.length;
                var e = JSON.parse(JSON.stringify(t));
                return this.resetElements(e), e
            }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
                var i, r = t.length;
                for (i = 0; i < r; i += 1) t[i]._render = e, "gr" === t[i].ty && this.changeGroupRender(t[i].it, e)
            }, RepeaterModifier.prototype.processShapes = function (t) {
                var e, i, r, s, a;
                if (this._mdf || t) {
                    var n, o = Math.ceil(this.c.v);
                    if (this._groups.length < o) {
                        for (; this._groups.length < o;) {
                            var h = {it: this.cloneElements(this._elements), ty: "gr"};
                            h.it.push({
                                a: {a: 0, ix: 1, k: [0, 0]},
                                nm: "Transform",
                                o: {a: 0, ix: 7, k: 100},
                                p: {a: 0, ix: 2, k: [0, 0]},
                                r: {a: 1, ix: 6, k: [{s: 0, e: 0, t: 0}, {s: 0, e: 0, t: 1}]},
                                s: {a: 0, ix: 3, k: [100, 100]},
                                sa: {a: 0, ix: 5, k: 0},
                                sk: {a: 0, ix: 4, k: 0},
                                ty: "tr"
                            }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1
                        }
                        this.elem.reloadShapes()
                    }
                    for (a = 0, r = 0; r <= this._groups.length - 1; r += 1) n = a < o, this._groups[r]._render = n, this.changeGroupRender(this._groups[r].it, n), a += 1;
                    this._currentCopies = o;
                    var l = this.o.v, p = l % 1, m = l > 0 ? Math.floor(l) : Math.ceil(l),
                        c = (this.tr.v.props, this.pMatrix.props), f = this.rMatrix.props, d = this.sMatrix.props;
                    this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
                    var u, y, g = 0;
                    if (l > 0) {
                        for (; g < m;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;
                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p)
                    } else if (l < 0) {
                        for (; g > m;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;
                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p)
                    }
                    for (r = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
                        if (y = (i = (e = this.elemsData[r].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (r / (this._currentCopies - 1)), 0 !== g) {
                            for ((0 !== r && 1 === s || r !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), u = 0; u < y; u += 1) i[u] = this.matrix.props[u];
                            this.matrix.reset()
                        } else for (this.matrix.reset(), u = 0; u < y; u += 1) i[u] = this.matrix.props[u];
                        g += 1, a -= 1, r += s
                    }
                } else for (a = this._currentCopies, r = 0, s = 1; a;) i = (e = this.elemsData[r].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, r += s
            }, RepeaterModifier.prototype.addShape = function () {
            }, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
                this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
            }, ShapeCollection.prototype.releaseShapes = function () {
                var t;
                for (t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);
                this._length = 0
            }, DashProperty.prototype.getValue = function (t) {
                if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
                    var e = 0, i = this.dataProps.length;
                    for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < i; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
                }
            }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
                for (var i = 0, r = this.o.length / 2; i < r;) {
                    if (Math.abs(t[4 * i] - t[4 * e + 2 * i]) > .01) return !1;
                    i += 1
                }
                return !0
            }, GradientProperty.prototype.checkCollapsable = function () {
                if (this.o.length / 2 != this.c.length / 4) return !1;
                if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
                    if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
                    t += 1
                } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
                return !0
            }, GradientProperty.prototype.getValue = function (t) {
                if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
                    var e, i, r, s = 4 * this.data.p;
                    for (e = 0; e < s; e += 1) i = e % 4 == 0 ? 100 : 255, r = Math.round(this.prop.v[e] * i), this.c[e] !== r && (this.c[e] = r, this._cmdf = !t);
                    if (this.o.length) for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) i = e % 2 == 0 ? 100 : 1, r = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== r && (this.o[e - 4 * this.data.p] = r, this._omdf = !t);
                    this._mdf = !t
                }
            }, extendPrototype([DynamicPropertyContainer], GradientProperty);
            var buildShapeString = function (t, e, i, r) {
                if (0 === e) return "";
                var s, a = t.o, n = t.i, o = t.v, h = " M" + r.applyToPointStringified(o[0][0], o[0][1]);
                for (s = 1; s < e; s += 1) h += " C" + r.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + r.applyToPointStringified(n[s][0], n[s][1]) + " " + r.applyToPointStringified(o[s][0], o[s][1]);
                return i && e && (h += " C" + r.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + r.applyToPointStringified(n[0][0], n[0][1]) + " " + r.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h
            }, ImagePreloader = function () {
                var t = function () {
                    var t = createTag("canvas");
                    t.width = 1, t.height = 1;
                    var e = t.getContext("2d");
                    return e.fillStyle = "#FF0000", e.fillRect(0, 0, 1, 1), t
                }();

                function e() {
                    this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
                }

                function i(e) {
                    var i = function (t, e, i) {
                        var r = "";
                        if (t.e) r = t.p; else if (e) {
                            var s = t.p;
                            -1 !== s.indexOf("images/") && (s = s.split("/")[1]), r = e + s
                        } else r = i, r += t.u ? t.u : "", r += t.p;
                        return r
                    }(e, this.assetsPath, this.path), r = createTag("img");
                    r.crossOrigin = "anonymous", r.addEventListener("load", this._imageLoaded.bind(this), !1), r.addEventListener("error", function () {
                        s.img = t, this._imageLoaded()
                    }.bind(this), !1), r.src = i;
                    var s = {img: r, assetData: e};
                    return s
                }

                function r(t, e) {
                    this.imagesLoadedCb = e;
                    var i, r = t.length;
                    for (i = 0; i < r; i += 1) t[i].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[i])))
                }

                function s(t) {
                    this.path = t || ""
                }

                function a(t) {
                    this.assetsPath = t || ""
                }

                function n(t) {
                    for (var e = 0, i = this.images.length; e < i;) {
                        if (this.images[e].assetData === t) return this.images[e].img;
                        e += 1
                    }
                }

                function o() {
                    this.imagesLoadedCb = null, this.images.length = 0
                }

                function h() {
                    return this.totalImages === this.loadedAssets
                }

                return function () {
                    this.loadAssets = r, this.setAssetsPath = a, this.setPath = s, this.loaded = h, this.destroy = o, this.getImage = n, this._createImageData = i, this._imageLoaded = e, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = []
                }
            }(), featureSupport = function () {
                var t = {maskType: !0};
                return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t
            }(), filtersFactory = function () {
                var t = {};
                return t.createFilter = function (t) {
                    var e = createNS("filter");
                    return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e
                }, t.createAlphaToLuminanceFilter = function () {
                    var t = createNS("feColorMatrix");
                    return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
                }, t
            }(), assetLoader = function () {
                function t(t) {
                    return t.response && "object" == typeof t.response ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0
                }

                return {
                    load: function (e, i, r) {
                        var s, a = new XMLHttpRequest;
                        a.open("GET", e, !0), a.responseType = "json", a.send(), a.onreadystatechange = function () {
                            if (4 == a.readyState) if (200 == a.status) s = t(a), i(s); else try {
                                s = t(a), i(s)
                            } catch (t) {
                                r && r(t)
                            }
                        }
                    }
                }
            }();

            function TextAnimatorProperty(t, e, i) {
                this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = i, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {alignment: {}}, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(i)
            }

            function TextAnimatorDataProperty(t, e, i) {
                var r = {propType: !1}, s = PropertyFactory.getProp, a = e.a;
                this.a = {
                    r: a.r ? s(t, a.r, 0, degToRads, i) : r,
                    rx: a.rx ? s(t, a.rx, 0, degToRads, i) : r,
                    ry: a.ry ? s(t, a.ry, 0, degToRads, i) : r,
                    sk: a.sk ? s(t, a.sk, 0, degToRads, i) : r,
                    sa: a.sa ? s(t, a.sa, 0, degToRads, i) : r,
                    s: a.s ? s(t, a.s, 1, .01, i) : r,
                    a: a.a ? s(t, a.a, 1, 0, i) : r,
                    o: a.o ? s(t, a.o, 0, .01, i) : r,
                    p: a.p ? s(t, a.p, 1, 0, i) : r,
                    sw: a.sw ? s(t, a.sw, 0, 0, i) : r,
                    sc: a.sc ? s(t, a.sc, 1, 0, i) : r,
                    fc: a.fc ? s(t, a.fc, 1, 0, i) : r,
                    fh: a.fh ? s(t, a.fh, 0, 0, i) : r,
                    fs: a.fs ? s(t, a.fs, 0, .01, i) : r,
                    fb: a.fb ? s(t, a.fb, 0, .01, i) : r,
                    t: a.t ? s(t, a.t, 0, 0, i) : r
                }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, i), this.s.t = e.s.t
            }

            function LetterProps(t, e, i, r, s, a) {
                this.o = t, this.sw = e, this.sc = i, this.fc = r, this.m = s, this.p = a, this._mdf = {
                    o: !0,
                    sw: !!e,
                    sc: !!i,
                    fc: !!r,
                    m: !0,
                    p: !0
                }
            }

            function TextProperty(t, e) {
                this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
                    ascent: 0,
                    boxWidth: this.defaultBoxWidth,
                    f: "",
                    fStyle: "",
                    fWeight: "",
                    fc: "",
                    j: "",
                    justifyOffset: "",
                    l: [],
                    lh: 0,
                    lineWidths: [],
                    ls: "",
                    of: "",
                    s: "",
                    sc: "",
                    sw: 0,
                    t: 0,
                    tr: 0,
                    sz: 0,
                    ps: null,
                    fillColorAnim: !1,
                    strokeColorAnim: !1,
                    strokeWidthAnim: !1,
                    yOffset: 0,
                    finalSize: 0,
                    finalText: [],
                    finalLineHeight: 0,
                    __complete: !1
                }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
            }

            TextAnimatorProperty.prototype.searchProperties = function () {
                var t, e, i = this._textData.a.length, r = PropertyFactory.getProp;
                for (t = 0; t < i; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
                this._textData.p && "m" in this._textData.p ? (this._pathData = {
                    f: r(this._elem, this._textData.p.f, 0, 0, this),
                    l: r(this._elem, this._textData.p.l, 0, 0, this),
                    r: this._textData.p.r,
                    m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
                }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = r(this._elem, this._textData.m.a, 1, 0, this)
            }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
                if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
                    this._isFirstFrame = !1;
                    var i, r, s, a, n, o, h, l, p, m, c, f, d, u, y, g, v, x, k, b = this._moreOptions.alignment.v,
                        E = this._animatorsData, S = this._textData, P = this.mHelper, A = this._renderType,
                        _ = this.renderedLetters.length, T = (this.data, t.l);
                    if (this._hasMaskedPath) {
                        if (k = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
                            var D, C = k.v;
                            for (this._pathData.r && (C = C.reverse()), n = {
                                tLength: 0,
                                segments: []
                            }, a = C._length - 1, g = 0, s = 0; s < a; s += 1) D = bez.buildBezierData(C.v[s], C.v[s + 1], [C.o[s][0] - C.v[s][0], C.o[s][1] - C.v[s][1]], [C.i[s + 1][0] - C.v[s + 1][0], C.i[s + 1][1] - C.v[s + 1][1]]), n.tLength += D.segmentLength, n.segments.push(D), g += D.segmentLength;
                            s = a, k.v.c && (D = bez.buildBezierData(C.v[s], C.v[0], [C.o[s][0] - C.v[s][0], C.o[s][1] - C.v[s][1]], [C.i[0][0] - C.v[0][0], C.i[0][1] - C.v[0][1]]), n.tLength += D.segmentLength, n.segments.push(D), g += D.segmentLength), this._pathData.pi = n
                        }
                        if (n = this._pathData.pi, o = this._pathData.f.v, c = 0, m = 1, l = 0, p = !0, u = n.segments, o < 0 && k.v.c) for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), m = (d = u[c = u.length - 1].points).length - 1; o < 0;) o += d[m].partialLength, (m -= 1) < 0 && (m = (d = u[c -= 1].points).length - 1);
                        f = (d = u[c].points)[m - 1], y = (h = d[m]).partialLength
                    }
                    a = T.length, i = 0, r = 0;
                    var w, M, F, I, V = 1.2 * t.finalSize * .714, B = !0;
                    F = E.length;
                    var G, R, L, O, N, z, H, j, q, W, Y, X, K, $ = -1, U = o, J = c, Z = m, Q = -1, tt = "",
                        et = this.defaultPropsArray;
                    if (2 === t.j || 1 === t.j) {
                        var it = 0, rt = 0, st = 2 === t.j ? -.5 : -1, at = 0, nt = !0;
                        for (s = 0; s < a; s += 1) if (T[s].n) {
                            for (it && (it += rt); at < s;) T[at].animatorJustifyOffset = it, at += 1;
                            it = 0, nt = !0
                        } else {
                            for (M = 0; M < F; M += 1) (w = E[M].a).t.propType && (nt && 2 === t.j && (rt += w.t.v * st), (G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars)).length ? it += w.t.v * G[0] * st : it += w.t.v * G * st);
                            nt = !1
                        }
                        for (it && (it += rt); at < s;) T[at].animatorJustifyOffset = it, at += 1
                    }
                    for (s = 0; s < a; s += 1) {
                        if (P.reset(), N = 1, T[s].n) i = 0, r += t.yOffset, r += B ? 1 : 0, o = U, B = !1, 0, this._hasMaskedPath && (m = Z, f = (d = u[c = J].points)[m - 1], y = (h = d[m]).partialLength, l = 0), K = W = X = tt = "", et = this.defaultPropsArray; else {
                            if (this._hasMaskedPath) {
                                if (Q !== T[s].line) {
                                    switch (t.j) {
                                        case 1:
                                            o += g - t.lineWidths[T[s].line];
                                            break;
                                        case 2:
                                            o += (g - t.lineWidths[T[s].line]) / 2
                                    }
                                    Q = T[s].line
                                }
                                $ !== T[s].ind && (T[$] && (o += T[$].extra), o += T[s].an / 2, $ = T[s].ind), o += b[0] * T[s].an / 200;
                                var ot = 0;
                                for (M = 0; M < F; M += 1) (w = E[M].a).p.propType && ((G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars)).length ? ot += w.p.v[0] * G[0] : ot += w.p.v[0] * G), w.a.propType && ((G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars)).length ? ot += w.a.v[0] * G[0] : ot += w.a.v[0] * G);
                                for (p = !0; p;) l + y >= o + ot || !d ? (v = (o + ot - l) / h.partialLength, L = f.point[0] + (h.point[0] - f.point[0]) * v, O = f.point[1] + (h.point[1] - f.point[1]) * v, P.translate(-b[0] * T[s].an / 200, -b[1] * V / 100), p = !1) : d && (l += h.partialLength, (m += 1) >= d.length && (m = 0, u[c += 1] ? d = u[c].points : k.v.c ? (m = 0, d = u[c = 0].points) : (l -= h.partialLength, d = null)), d && (f = h, y = (h = d[m]).partialLength));
                                R = T[s].an / 2 - T[s].add, P.translate(-R, 0, 0)
                            } else R = T[s].an / 2 - T[s].add, P.translate(-R, 0, 0), P.translate(-b[0] * T[s].an / 200, -b[1] * V / 100, 0);
                            for (T[s].l / 2, M = 0; M < F; M += 1) (w = E[M].a).t.propType && (G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars), 0 === i && 0 === t.j || (this._hasMaskedPath ? G.length ? o += w.t.v * G[0] : o += w.t.v * G : G.length ? i += w.t.v * G[0] : i += w.t.v * G));
                            for (T[s].l / 2, t.strokeWidthAnim && (H = t.sw || 0), t.strokeColorAnim && (z = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), M = 0; M < F; M += 1) (w = E[M].a).a.propType && ((G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars)).length ? P.translate(-w.a.v[0] * G[0], -w.a.v[1] * G[1], w.a.v[2] * G[2]) : P.translate(-w.a.v[0] * G, -w.a.v[1] * G, w.a.v[2] * G));
                            for (M = 0; M < F; M += 1) (w = E[M].a).s.propType && ((G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars)).length ? P.scale(1 + (w.s.v[0] - 1) * G[0], 1 + (w.s.v[1] - 1) * G[1], 1) : P.scale(1 + (w.s.v[0] - 1) * G, 1 + (w.s.v[1] - 1) * G, 1));
                            for (M = 0; M < F; M += 1) {
                                if (w = E[M].a, G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars), w.sk.propType && (G.length ? P.skewFromAxis(-w.sk.v * G[0], w.sa.v * G[1]) : P.skewFromAxis(-w.sk.v * G, w.sa.v * G)), w.r.propType && (G.length ? P.rotateZ(-w.r.v * G[2]) : P.rotateZ(-w.r.v * G)), w.ry.propType && (G.length ? P.rotateY(w.ry.v * G[1]) : P.rotateY(w.ry.v * G)), w.rx.propType && (G.length ? P.rotateX(w.rx.v * G[0]) : P.rotateX(w.rx.v * G)), w.o.propType && (G.length ? N += (w.o.v * G[0] - N) * G[0] : N += (w.o.v * G - N) * G), t.strokeWidthAnim && w.sw.propType && (G.length ? H += w.sw.v * G[0] : H += w.sw.v * G), t.strokeColorAnim && w.sc.propType) for (q = 0; q < 3; q += 1) G.length ? z[q] = z[q] + (w.sc.v[q] - z[q]) * G[0] : z[q] = z[q] + (w.sc.v[q] - z[q]) * G;
                                if (t.fillColorAnim && t.fc) {
                                    if (w.fc.propType) for (q = 0; q < 3; q += 1) G.length ? j[q] = j[q] + (w.fc.v[q] - j[q]) * G[0] : j[q] = j[q] + (w.fc.v[q] - j[q]) * G;
                                    w.fh.propType && (j = G.length ? addHueToRGB(j, w.fh.v * G[0]) : addHueToRGB(j, w.fh.v * G)), w.fs.propType && (j = G.length ? addSaturationToRGB(j, w.fs.v * G[0]) : addSaturationToRGB(j, w.fs.v * G)), w.fb.propType && (j = G.length ? addBrightnessToRGB(j, w.fb.v * G[0]) : addBrightnessToRGB(j, w.fb.v * G))
                                }
                            }
                            for (M = 0; M < F; M += 1) (w = E[M].a).p.propType && (G = E[M].s.getMult(T[s].anIndexes[M], S.a[M].s.totalChars), this._hasMaskedPath ? G.length ? P.translate(0, w.p.v[1] * G[0], -w.p.v[2] * G[1]) : P.translate(0, w.p.v[1] * G, -w.p.v[2] * G) : G.length ? P.translate(w.p.v[0] * G[0], w.p.v[1] * G[1], -w.p.v[2] * G[2]) : P.translate(w.p.v[0] * G, w.p.v[1] * G, -w.p.v[2] * G));
                            if (t.strokeWidthAnim && (W = H < 0 ? 0 : H), t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * z[0]) + "," + Math.round(255 * z[1]) + "," + Math.round(255 * z[2]) + ")"), t.fillColorAnim && t.fc && (X = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), this._hasMaskedPath) {
                                if (P.translate(0, -t.ls), P.translate(0, b[1] * V / 100 + r, 0), S.p.p) {
                                    x = (h.point[1] - f.point[1]) / (h.point[0] - f.point[0]);
                                    var ht = 180 * Math.atan(x) / Math.PI;
                                    h.point[0] < f.point[0] && (ht += 180), P.rotate(-ht * Math.PI / 180)
                                }
                                P.translate(L, O, 0), o -= b[0] * T[s].an / 200, T[s + 1] && $ !== T[s + 1].ind && (o += T[s].an / 2, o += t.tr / 1e3 * t.finalSize)
                            } else {
                                switch (P.translate(i, r, 0), t.ps && P.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                                    case 1:
                                        P.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);
                                        break;
                                    case 2:
                                        P.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0)
                                }
                                P.translate(0, -t.ls), P.translate(R, 0, 0), P.translate(b[0] * T[s].an / 200, b[1] * V / 100, 0), i += T[s].l + t.tr / 1e3 * t.finalSize
                            }
                            "html" === A ? tt = P.toCSS() : "svg" === A ? tt = P.to2dCSS() : et = [P.props[0], P.props[1], P.props[2], P.props[3], P.props[4], P.props[5], P.props[6], P.props[7], P.props[8], P.props[9], P.props[10], P.props[11], P.props[12], P.props[13], P.props[14], P.props[15]], K = N
                        }
                        _ <= s ? (I = new LetterProps(K, W, Y, X, tt, et), this.renderedLetters.push(I), _ += 1, this.lettersChangedFlag = !0) : (I = this.renderedLetters[s], this.lettersChangedFlag = I.update(K, W, Y, X, tt, et) || this.lettersChangedFlag)
                    }
                }
            }, TextAnimatorProperty.prototype.getValue = function () {
                this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
            }, TextAnimatorProperty.prototype.mHelper = new Matrix, TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, i, r, s, a) {
                this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
                var n = !1;
                return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== i && (this.sc = i, this._mdf.sc = !0, n = !0), this.fc !== r && (this.fc = r, this._mdf.fc = !0, n = !0), this.m !== s && (this.m = s, this._mdf.m = !0, n = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, this._mdf.p = !0, n = !0), n
            }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                return t
            }, TextProperty.prototype.setCurrentData = function (t) {
                t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
            }, TextProperty.prototype.searchProperty = function () {
                return this.searchKeyframes()
            }, TextProperty.prototype.searchKeyframes = function () {
                return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
            }, TextProperty.prototype.addEffect = function (t) {
                this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
            }, TextProperty.prototype.getValue = function (t) {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
                    this.currentData.t = this.data.d.k[this.keysIndex].s.t;
                    var e = this.currentData, i = this.keysIndex;
                    if (this.lock) this.setCurrentData(this.currentData); else {
                        this.lock = !0, this._mdf = !1;
                        var r, s = this.effectsSequence.length, a = t || this.data.d.k[this.keysIndex].s;
                        for (r = 0; r < s; r += 1) a = i !== this.keysIndex ? this.effectsSequence[r](a, a.t) : this.effectsSequence[r](this.currentData, a.t);
                        e !== a && this.setCurrentData(a), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId
                    }
                }
            }, TextProperty.prototype.getKeyframeValue = function () {
                for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, i = 0, r = t.length; i <= r - 1 && (t[i].s, !(i === r - 1 || t[i + 1].t > e));) i += 1;
                return this.keysIndex !== i && (this.keysIndex = i), this.data.d.k[this.keysIndex].s
            }, TextProperty.prototype.buildFinalText = function (t) {
                for (var e = FontManager.getCombinedCharacterCodes(), i = [], r = 0, s = t.length; r < s;) -1 !== e.indexOf(t.charCodeAt(r)) ? i[i.length - 1] += t.charAt(r) : i.push(t.charAt(r)), r += 1;
                return i
            }, TextProperty.prototype.completeTextData = function (t) {
                t.__complete = !0;
                var e, i, r, s, a, n, o, h = this.elem.globalData.fontManager, l = this.data, p = [], m = 0, c = l.m.g,
                    f = 0, d = 0, u = 0, y = [], g = 0, v = 0, x = h.getFontByName(t.f), k = 0,
                    b = x.fStyle ? x.fStyle.split(" ") : [], E = "normal", S = "normal";
                for (i = b.length, e = 0; e < i; e += 1) switch (b[e].toLowerCase()) {
                    case"italic":
                        S = "italic";
                        break;
                    case"bold":
                        E = "700";
                        break;
                    case"black":
                        E = "900";
                        break;
                    case"medium":
                        E = "500";
                        break;
                    case"regular":
                    case"normal":
                        E = "400";
                        break;
                    case"light":
                    case"thin":
                        E = "200"
                }
                t.fWeight = x.fWeight || E, t.fStyle = S, i = t.t.length, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), t.finalLineHeight = t.lh;
                var P, A = t.tr / 1e3 * t.finalSize;
                if (t.sz) for (var _, T, D = !0, C = t.sz[0], w = t.sz[1]; D;) {
                    _ = 0, g = 0, i = (T = this.buildFinalText(t.t)).length, A = t.tr / 1e3 * t.finalSize;
                    var M = -1;
                    for (e = 0; e < i; e += 1) P = T[e].charCodeAt(0), r = !1, " " === T[e] ? M = e : 13 !== P && 3 !== P || (g = 0, r = !0, _ += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(T[e], x.fStyle, x.fFamily), k = r ? 0 : o.w * t.finalSize / 100) : k = h.measureText(T[e], t.f, t.finalSize), g + k > C && " " !== T[e] ? (-1 === M ? i += 1 : e = M, _ += t.finalLineHeight || 1.2 * t.finalSize, T.splice(e, M === e ? 1 : 0, "\r"), M = -1, g = 0) : (g += k, g += A);
                    _ += x.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && w < _ ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = T, i = t.finalText.length, D = !1)
                }
                g = -A, k = 0;
                var F, I = 0;
                for (e = 0; e < i; e += 1) if (r = !1, P = (F = t.finalText[e]).charCodeAt(0), " " === F ? s = " " : 13 === P || 3 === P ? (I = 0, y.push(g), v = g > v ? g : v, g = -2 * A, s = "", r = !0, u += 1) : s = t.finalText[e], h.chars ? (o = h.getCharData(F, x.fStyle, h.getFontByName(t.f).fFamily), k = r ? 0 : o.w * t.finalSize / 100) : k = h.measureText(s, t.f, t.finalSize), " " === F ? I += k + A : (g += k + A + I, I = 0), p.push({
                    l: k,
                    an: k,
                    add: f,
                    n: r,
                    anIndexes: [],
                    val: s,
                    line: u,
                    animatorJustifyOffset: 0
                }), 2 == c) {
                    if (f += k, "" === s || " " === s || e === i - 1) {
                        for ("" !== s && " " !== s || (f -= k); d <= e;) p[d].an = f, p[d].ind = m, p[d].extra = k, d += 1;
                        m += 1, f = 0
                    }
                } else if (3 == c) {
                    if (f += k, "" === s || e === i - 1) {
                        for ("" === s && (f -= k); d <= e;) p[d].an = f, p[d].ind = m, p[d].extra = k, d += 1;
                        f = 0, m += 1
                    }
                } else p[m].ind = m, p[m].extra = 0, m += 1;
                if (t.l = p, v = g > v ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0; else switch (t.boxWidth = v, t.j) {
                    case 1:
                        t.justifyOffset = -t.boxWidth;
                        break;
                    case 2:
                        t.justifyOffset = -t.boxWidth / 2;
                        break;
                    default:
                        t.justifyOffset = 0
                }
                t.lineWidths = y;
                var V, B, G = l.a;
                n = G.length;
                var R, L, O = [];
                for (a = 0; a < n; a += 1) {
                    for ((V = G[a]).a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), L = 0, R = V.s.b, e = 0; e < i; e += 1) (B = p[e]).anIndexes[a] = L, (1 == R && "" !== B.val || 2 == R && "" !== B.val && " " !== B.val || 3 == R && (B.n || " " == B.val || e == i - 1) || 4 == R && (B.n || e == i - 1)) && (1 === V.s.rn && O.push(L), L += 1);
                    l.a[a].s.totalChars = L;
                    var N, z = -1;
                    if (1 === V.s.rn) for (e = 0; e < i; e += 1) z != (B = p[e]).anIndexes[a] && (z = B.anIndexes[a], N = O.splice(Math.floor(Math.random() * O.length), 1)[0]), B.anIndexes[a] = N
                }
                t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = x.ascent * t.finalSize / 100
            }, TextProperty.prototype.updateDocumentData = function (t, e) {
                e = void 0 === e ? this.keysIndex : e;
                var i = this.copyData({}, this.data.d.k[e].s);
                i = this.copyData(i, t), this.data.d.k[e].s = i, this.recalculate(e), this.elem.addDynamicProperty(this)
            }, TextProperty.prototype.recalculate = function (t) {
                var e = this.data.d.k[t].s;
                e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e)
            }, TextProperty.prototype.canResizeFont = function (t) {
                this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
            }, TextProperty.prototype.setMinimumFontSize = function (t) {
                this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
            };
            var TextSelectorProp = function () {
                var t = Math.max, e = Math.min, i = Math.floor;

                function r(t, e) {
                    this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {k: 0}, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {v: 100}, this.o = PropertyFactory.getProp(t, e.o || {k: 0}, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {k: 0}, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {k: 0}, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
                }

                return r.prototype = {
                    getMult: function (r) {
                        this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                        var s = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get, a = 0,
                            n = this.finalS, o = this.finalE, h = this.data.sh;
                        if (2 == h) a = s(a = o === n ? r >= o ? 1 : 0 : t(0, e(.5 / (o - n) + (r - n) / (o - n), 1))); else if (3 == h) a = s(a = o === n ? r >= o ? 0 : 1 : 1 - t(0, e(.5 / (o - n) + (r - n) / (o - n), 1))); else if (4 == h) o === n ? a = 0 : (a = t(0, e(.5 / (o - n) + (r - n) / (o - n), 1))) < .5 ? a *= 2 : a = 1 - 2 * (a - .5), a = s(a); else if (5 == h) {
                            if (o === n) a = 0; else {
                                var l = o - n, p = -l / 2 + (r = e(t(0, r + .5 - n), o - n)), m = l / 2;
                                a = Math.sqrt(1 - p * p / (m * m))
                            }
                            a = s(a)
                        } else 6 == h ? (o === n ? a = 0 : (r = e(t(0, r + .5 - n), o - n), a = (1 + Math.cos(Math.PI + 2 * Math.PI * r / (o - n))) / 2), a = s(a)) : (r >= i(n) && (a = r - n < 0 ? 1 - (n - r) : t(0, e(o - r, 1))), a = s(a));
                        return a * this.a.v
                    }, getValue: function (t) {
                        this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                        var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars, i = this.o.v / e,
                            r = this.s.v / e + i, s = this.e.v / e + i;
                        if (r > s) {
                            var a = r;
                            r = s, s = a
                        }
                        this.finalS = r, this.finalE = s
                    }
                }, extendPrototype([DynamicPropertyContainer], r), {
                    getTextSelectorProp: function (t, e, i) {
                        return new r(t, e, i)
                    }
                }
            }(), pool_factory = function (t, e, i, r) {
                var s = 0, a = t, n = createSizedArray(a);

                function o() {
                    return s ? n[s -= 1] : e()
                }

                return {
                    newElement: o, release: function (t) {
                        s === a && (n = pooling.double(n), a *= 2), i && i(t), n[s] = t, s += 1
                    }
                }
            }, pooling = function () {
                return {
                    double: function (t) {
                        return t.concat(createSizedArray(t.length))
                    }
                }
            }(), point_pool = function () {
                return pool_factory(8, function () {
                    return createTypedArray("float32", 2)
                })
            }(), shape_pool = function () {
                var t = pool_factory(4, function () {
                    return new ShapePath
                }, function (t) {
                    var e, i = t._length;
                    for (e = 0; e < i; e += 1) point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
                    t._length = 0, t.c = !1
                });
                return t.clone = function (e) {
                    var i, r = t.newElement(), s = void 0 === e._length ? e.v.length : e._length;
                    for (r.setLength(s), r.c = e.c, i = 0; i < s; i += 1) r.setTripleAt(e.v[i][0], e.v[i][1], e.o[i][0], e.o[i][1], e.i[i][0], e.i[i][1], i);
                    return r
                }, t
            }(), shapeCollection_pool = function () {
                var t = {
                    newShapeCollection: function () {
                        var t;
                        t = e ? r[e -= 1] : new ShapeCollection;
                        return t
                    }, release: function (t) {
                        var s, a = t._length;
                        for (s = 0; s < a; s += 1) shape_pool.release(t.shapes[s]);
                        t._length = 0, e === i && (r = pooling.double(r), i *= 2);
                        r[e] = t, e += 1
                    }
                }, e = 0, i = 4, r = createSizedArray(i);
                return t
            }(), segments_length_pool = function () {
                return pool_factory(8, function () {
                    return {lengths: [], totalLength: 0}
                }, function (t) {
                    var e, i = t.lengths.length;
                    for (e = 0; e < i; e += 1) bezier_length_pool.release(t.lengths[e]);
                    t.lengths.length = 0
                })
            }(), bezier_length_pool = function () {
                return pool_factory(8, function () {
                    return {
                        addedLength: 0,
                        percents: createTypedArray("float32", defaultCurveSegments),
                        lengths: createTypedArray("float32", defaultCurveSegments)
                    }
                })
            }();

            function BaseRenderer() {
            }

            function SVGRenderer(t, e) {
                this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
                var i = "";
                if (e && e.title) {
                    var r = createNS("title"), s = createElementID();
                    r.setAttribute("id", s), r.textContent = e.title, this.svgElement.appendChild(r), i += s
                }
                if (e && e.description) {
                    var a = createNS("desc"), n = createElementID();
                    a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), i += " " + n
                }
                i && this.svgElement.setAttribute("aria-labelledby", i);
                var o = createNS("defs");
                this.svgElement.appendChild(o);
                var h = createNS("g");
                this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    progressiveLoad: e && e.progressiveLoad || !1,
                    hideOnTransparent: !e || !1 !== e.hideOnTransparent,
                    viewBoxOnly: e && e.viewBoxOnly || !1,
                    viewBoxSize: e && e.viewBoxSize || !1,
                    className: e && e.className || ""
                }, this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    defs: o,
                    renderConfig: this.renderConfig
                }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg"
            }

            function CanvasRenderer(t, e) {
                this.animationItem = t, this.renderConfig = {
                    clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
                    context: e && e.context || null,
                    progressiveLoad: e && e.progressiveLoad || !1,
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    className: e && e.className || ""
                }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
                    frameNum: -1,
                    _mdf: !1,
                    renderConfig: this.renderConfig,
                    currentGlobalAlpha: -1
                }, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
            }

            function HybridRenderer(t, e) {
                this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
                    className: e && e.className || "",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    hideOnTransparent: !e || !1 !== e.hideOnTransparent
                }, this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    renderConfig: this.renderConfig
                }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html"
            }

            function MaskElement(t, e, i) {
                this.data = t, this.element = e, this.globalData = i, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
                var r, s = this.globalData.defs, a = this.masksProperties ? this.masksProperties.length : 0;
                this.viewData = createSizedArray(a), this.solidPath = "";
                var n, o, h, l, p, m, c, f = this.masksProperties, d = 0, u = [], y = createElementID(), g = "clipPath",
                    v = "clip-path";
                for (r = 0; r < a; r++) if (("a" !== f[r].mode && "n" !== f[r].mode || f[r].inv || 100 !== f[r].o.k) && (g = "mask", v = "mask"), "s" != f[r].mode && "i" != f[r].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = createNS("path"), "n" != f[r].mode) {
                    var x;
                    if (d += 1, n.setAttribute("fill", "s" === f[r].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== f[r].x.k ? (g = "mask", v = "mask", c = PropertyFactory.getProp(this.element, f[r].x, 0, null, this.element), x = createElementID(), (p = createNS("filter")).setAttribute("id", x), (m = createNS("feMorphology")).setAttribute("operator", "dilate"), m.setAttribute("in", "SourceGraphic"), m.setAttribute("radius", "0"), p.appendChild(m), s.appendChild(p), n.setAttribute("stroke", "s" === f[r].mode ? "#000000" : "#ffffff")) : (m = null, c = null), this.storedData[r] = {
                        elem: n,
                        x: c,
                        expan: m,
                        lastPath: "",
                        lastOperator: "",
                        filterId: x,
                        lastRadius: 0
                    }, "i" == f[r].mode) {
                        h = u.length;
                        var k = createNS("g");
                        for (o = 0; o < h; o += 1) k.appendChild(u[o]);
                        var b = createNS("mask");
                        b.setAttribute("mask-type", "alpha"), b.setAttribute("id", y + "_" + d), b.appendChild(n), s.appendChild(b), k.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(k)
                    } else u.push(n);
                    f[r].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[r] = {
                        elem: n,
                        lastPath: "",
                        op: PropertyFactory.getProp(this.element, f[r].o, 0, .01, this.element),
                        prop: ShapePropertyFactory.getShapeProp(this.element, f[r], 3),
                        invRect: l
                    }, this.viewData[r].prop.k || this.drawPath(f[r], this.viewData[r].prop.v, this.viewData[r])
                } else this.viewData[r] = {
                    op: PropertyFactory.getProp(this.element, f[r].o, 0, .01, this.element),
                    prop: ShapePropertyFactory.getShapeProp(this.element, f[r], 3),
                    elem: n,
                    lastPath: ""
                }, s.appendChild(n);
                for (this.maskElement = createNS(g), a = u.length, r = 0; r < a; r += 1) this.maskElement.appendChild(u[r]);
                d > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
            }

            function HierarchyElement() {
            }

            function FrameElement() {
            }

            function TransformElement() {
            }

            function RenderableElement() {
            }

            function RenderableDOMElement() {
            }

            function ProcessedElement(t, e) {
                this.elem = t, this.pos = e
            }

            function SVGStyleData(t, e) {
                this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null
            }

            function SVGShapeData(t, e, i) {
                this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = i, this.lvl = e, this._isAnimated = !!i.k;
                for (var r = 0, s = t.length; r < s;) {
                    if (t[r].mProps.dynamicProperties.length) {
                        this._isAnimated = !0;
                        break
                    }
                    r += 1
                }
            }

            function SVGTransformData(t, e, i) {
                this.transform = {
                    mProps: t,
                    op: e,
                    container: i
                }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
            }

            function SVGStrokeStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = i, this._isAnimated = !!this._isAnimated
            }

            function SVGFillStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = i
            }

            function SVGGradientFillStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, i)
            }

            function SVGGradientStrokeStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, i), this._isAnimated = !!this._isAnimated
            }

            function ShapeGroupData() {
                this.it = [], this.prevViewData = [], this.gr = createNS("g")
            }

            BaseRenderer.prototype.checkLayers = function (t) {
                var e, i, r = this.layers.length;
                for (this.completeLayers = !0, e = r - 1; e >= 0; e--) this.elements[e] || (i = this.layers[e]).ip - i.st <= t - this.layers[e].st && i.op - i.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
                this.checkPendingElements()
            }, BaseRenderer.prototype.createItem = function (t) {
                switch (t.ty) {
                    case 2:
                        return this.createImage(t);
                    case 0:
                        return this.createComp(t);
                    case 1:
                        return this.createSolid(t);
                    case 3:
                        return this.createNull(t);
                    case 4:
                        return this.createShape(t);
                    case 5:
                        return this.createText(t);
                    case 13:
                        return this.createCamera(t)
                }
                return this.createNull(t)
            }, BaseRenderer.prototype.createCamera = function () {
                throw new Error("You're using a 3d camera. Try the html renderer.")
            }, BaseRenderer.prototype.buildAllItems = function () {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1) this.buildItem(t);
                this.checkPendingElements()
            }, BaseRenderer.prototype.includeLayers = function (t) {
                this.completeLayers = !1;
                var e, i, r = t.length, s = this.layers.length;
                for (e = 0; e < r; e += 1) for (i = 0; i < s;) {
                    if (this.layers[i].id == t[e].id) {
                        this.layers[i] = t[e];
                        break
                    }
                    i += 1
                }
            }, BaseRenderer.prototype.setProjectInterface = function (t) {
                this.globalData.projectInterface = t
            }, BaseRenderer.prototype.initItems = function () {
                this.globalData.progressiveLoad || this.buildAllItems()
            }, BaseRenderer.prototype.buildElementParenting = function (t, e, i) {
                for (var r = this.elements, s = this.layers, a = 0, n = s.length; a < n;) s[a].ind == e && (r[a] && !0 !== r[a] ? (i.push(r[a]), r[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, i) : t.setHierarchy(i)) : (this.buildItem(a), this.addPendingElement(t))), a += 1
            }, BaseRenderer.prototype.addPendingElement = function (t) {
                this.pendingElements.push(t)
            }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1) if (t[e].xt) {
                    var r = this.createComp(t[e]);
                    r.initExpressions(), this.globalData.projectInterface.registerComposition(r)
                }
            }, BaseRenderer.prototype.setupGlobalData = function (t, e) {
                this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
                    w: t.w,
                    h: t.h
                }
            }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
                return new NullElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createShape = function (t) {
                return new SVGShapeElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createText = function (t) {
                return new SVGTextElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createImage = function (t) {
                return new IImageElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createComp = function (t) {
                return new SVGCompElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createSolid = function (t) {
                return new ISolidElement(t, this.globalData, this)
            }, SVGRenderer.prototype.configAnimation = function (t) {
                this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
                var e = this.globalData.defs;
                this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
                var i = createNS("clipPath"), r = createNS("rect");
                r.setAttribute("width", t.w), r.setAttribute("height", t.h), r.setAttribute("x", 0), r.setAttribute("y", 0);
                var s = createElementID();
                i.setAttribute("id", s), i.appendChild(r), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(i), this.layers = t.layers, this.elements = createSizedArray(t.layers.length)
            }, SVGRenderer.prototype.destroy = function () {
                this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
                var t, e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
                this.elements.length = 0, this.destroyed = !0, this.animationItem = null
            }, SVGRenderer.prototype.updateContainerSize = function () {
            }, SVGRenderer.prototype.buildItem = function (t) {
                var e = this.elements;
                if (!e[t] && 99 != this.layers[t].ty) {
                    e[t] = !0;
                    var i = this.createItem(this.layers[t]);
                    e[t] = i, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(i), i.initExpressions()), this.appendElementInPos(i, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? i.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(i)))
                }
            }, SVGRenderer.prototype.checkPendingElements = function () {
                for (; this.pendingElements.length;) {
                    var t = this.pendingElements.pop();
                    if (t.checkParenting(), t.data.tt) for (var e = 0, i = this.elements.length; e < i;) {
                        if (this.elements[e] === t) {
                            t.setMatte(this.elements[e - 1].layerId);
                            break
                        }
                        e += 1
                    }
                }
            }, SVGRenderer.prototype.renderFrame = function (t) {
                if (this.renderedFrame !== t && !this.destroyed) {
                    null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
                    var e, i = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t), e = i - 1; e >= 0; e--) (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
                    if (this.globalData._mdf) for (e = 0; e < i; e += 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
                }
            }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
                var i = t.getBaseElement();
                if (i) {
                    for (var r, s = 0; s < e;) this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (r = this.elements[s].getBaseElement()), s += 1;
                    r ? this.layerElement.insertBefore(i, r) : this.layerElement.appendChild(i)
                }
            }, SVGRenderer.prototype.hide = function () {
                this.layerElement.style.display = "none"
            }, SVGRenderer.prototype.show = function () {
                this.layerElement.style.display = "block"
            }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
                return new CVShapeElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createText = function (t) {
                return new CVTextElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createImage = function (t) {
                return new CVImageElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createComp = function (t) {
                return new CVCompElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createSolid = function (t) {
                return new CVSolidElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
                if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) if (this.renderConfig.clearCanvas) {
                    this.transformMat.cloneFromProps(t);
                    var e = this.contextData.cTr.props;
                    this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
                    var i = this.contextData.cTr.props;
                    this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13])
                } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
            }, CanvasRenderer.prototype.ctxOpacity = function (t) {
                if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void (this.globalData.currentGlobalAlpha = this.contextData.cO);
                this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO)
            }, CanvasRenderer.prototype.reset = function () {
                this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
            }, CanvasRenderer.prototype.save = function (t) {
                if (this.renderConfig.clearCanvas) {
                    t && this.canvasContext.save();
                    var e = this.contextData.cTr.props;
                    this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
                    var i, r = this.contextData.saved[this.contextData.cArrPos];
                    for (i = 0; i < 16; i += 1) r[i] = e[i];
                    this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
                } else this.canvasContext.save()
            }, CanvasRenderer.prototype.restore = function (t) {
                if (this.renderConfig.clearCanvas) {
                    t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
                    var e, i = this.contextData.saved[this.contextData.cArrPos], r = this.contextData.cTr.props;
                    for (e = 0; e < 16; e += 1) r[e] = i[e];
                    this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]), i = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = i, this.globalData.currentGlobalAlpha !== i && (this.canvasContext.globalAlpha = i, this.globalData.currentGlobalAlpha = i)
                } else this.canvasContext.restore()
            }, CanvasRenderer.prototype.configAnimation = function (t) {
                this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
                    w: t.w,
                    h: t.h,
                    sx: 0,
                    sy: 0,
                    tx: 0,
                    ty: 0
                }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize()
            }, CanvasRenderer.prototype.updateContainerSize = function () {
                var t, e, i, r;
                if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
                    var s = this.renderConfig.preserveAspectRatio.split(" "), a = s[1] || "meet",
                        n = s[0] || "xMidYMid", o = n.substr(0, 4), h = n.substr(4);
                    i = t / e, (r = this.transformCanvas.w / this.transformCanvas.h) > i && "meet" === a || r < i && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (r < i && "meet" === a || r > i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (r < i && "meet" === a || r > i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (r > i && "meet" === a || r < i && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (r > i && "meet" === a || r < i && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
                } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
                this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
            }, CanvasRenderer.prototype.destroy = function () {
                var t;
                for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
                this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
            }, CanvasRenderer.prototype.renderFrame = function (t, e) {
                if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
                    this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
                    var i, r = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t), i = 0; i < r; i++) (this.completeLayers || this.elements[i]) && this.elements[i].prepareFrame(t - this.layers[i].st);
                    if (this.globalData._mdf) {
                        for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), i = r - 1; i >= 0; i -= 1) (this.completeLayers || this.elements[i]) && this.elements[i].renderFrame();
                        !0 !== this.renderConfig.clearCanvas && this.restore()
                    }
                }
            }, CanvasRenderer.prototype.buildItem = function (t) {
                var e = this.elements;
                if (!e[t] && 99 != this.layers[t].ty) {
                    var i = this.createItem(this.layers[t], this, this.globalData);
                    e[t] = i, i.initExpressions()
                }
            }, CanvasRenderer.prototype.checkPendingElements = function () {
                for (; this.pendingElements.length;) {
                    this.pendingElements.pop().checkParenting()
                }
            }, CanvasRenderer.prototype.hide = function () {
                this.animationItem.container.style.display = "none"
            }, CanvasRenderer.prototype.show = function () {
                this.animationItem.container.style.display = "block"
            }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
                for (; this.pendingElements.length;) {
                    this.pendingElements.pop().checkParenting()
                }
            }, HybridRenderer.prototype.appendElementInPos = function (t, e) {
                var i = t.getBaseElement();
                if (i) {
                    var r = this.layers[e];
                    if (r.ddd && this.supports3d) this.addTo3dContainer(i, e); else if (this.threeDElements) this.addTo3dContainer(i, e); else {
                        for (var s, a, n = 0; n < e;) this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n], s = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || s), n += 1;
                        s ? r.ddd && this.supports3d || this.layerElement.insertBefore(i, s) : r.ddd && this.supports3d || this.layerElement.appendChild(i)
                    }
                }
            }, HybridRenderer.prototype.createShape = function (t) {
                return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createText = function (t) {
                return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createCamera = function (t) {
                return this.camera = new HCameraElement(t, this.globalData, this), this.camera
            }, HybridRenderer.prototype.createImage = function (t) {
                return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createComp = function (t) {
                return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createSolid = function (t) {
                return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
                for (var e = 0, i = this.threeDElements.length; e < i;) {
                    if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
                    e += 1
                }
            }, HybridRenderer.prototype.createThreeDContainer = function (t, e) {
                var i = createTag("div");
                styleDiv(i);
                var r = createTag("div");
                styleDiv(r), "3d" === e && (i.style.width = this.globalData.compSize.w + "px", i.style.height = this.globalData.compSize.h + "px", i.style.transformOrigin = i.style.mozTransformOrigin = i.style.webkitTransformOrigin = "50% 50%", r.style.transform = r.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"), i.appendChild(r);
                var s = {container: r, perspectiveElem: i, startPos: t, endPos: t, type: e};
                return this.threeDElements.push(s), s
            }, HybridRenderer.prototype.build3dContainers = function () {
                var t, e, i = this.layers.length, r = "";
                for (t = 0; t < i; t += 1) this.layers[t].ddd && 3 !== this.layers[t].ty ? ("3d" !== r && (r = "3d", e = this.createThreeDContainer(t, "3d")), e.endPos = Math.max(e.endPos, t)) : ("2d" !== r && (r = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t));
                for (t = (i = this.threeDElements.length) - 1; t >= 0; t--) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
            }, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
                for (var i = 0, r = this.threeDElements.length; i < r;) {
                    if (e <= this.threeDElements[i].endPos) {
                        for (var s, a = this.threeDElements[i].startPos; a < e;) this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
                        s ? this.threeDElements[i].container.insertBefore(t, s) : this.threeDElements[i].container.appendChild(t);
                        break
                    }
                    i += 1
                }
            }, HybridRenderer.prototype.configAnimation = function (t) {
                var e = createTag("div"), i = this.animationItem.wrapper;
                e.style.width = t.w + "px", e.style.height = t.h + "px", this.resizerElem = e, styleDiv(e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), i.appendChild(e), e.style.overflow = "hidden";
                var r = createNS("svg");
                r.setAttribute("width", "1"), r.setAttribute("height", "1"), styleDiv(r), this.resizerElem.appendChild(r);
                var s = createNS("defs");
                r.appendChild(s), this.data = t, this.setupGlobalData(t, r), this.globalData.defs = s, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
            }, HybridRenderer.prototype.destroy = function () {
                this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
                var t, e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t++) this.elements[t].destroy();
                this.elements.length = 0, this.destroyed = !0, this.animationItem = null
            }, HybridRenderer.prototype.updateContainerSize = function () {
                var t, e, i, r, s = this.animationItem.wrapper.offsetWidth, a = this.animationItem.wrapper.offsetHeight,
                    n = s / a;
                this.globalData.compSize.w / this.globalData.compSize.h > n ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, i = 0, r = (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, i = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, r = 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + i + "," + r + ",0,1)"
            }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
                this.resizerElem.style.display = "none"
            }, HybridRenderer.prototype.show = function () {
                this.resizerElem.style.display = "block"
            }, HybridRenderer.prototype.initItems = function () {
                if (this.buildAllItems(), this.camera) this.camera.setup(); else {
                    var t, e = this.globalData.compSize.w, i = this.globalData.compSize.h,
                        r = this.threeDElements.length;
                    for (t = 0; t < r; t += 1) this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)) + "px"
                }
            }, HybridRenderer.prototype.searchExtraCompositions = function (t) {
                var e, i = t.length, r = createTag("div");
                for (e = 0; e < i; e += 1) if (t[e].xt) {
                    var s = this.createComp(t[e], r, this.globalData.comp, null);
                    s.initExpressions(), this.globalData.projectInterface.registerComposition(s)
                }
            }, MaskElement.prototype.getMaskProperty = function (t) {
                return this.viewData[t].prop
            }, MaskElement.prototype.renderFrame = function (t) {
                var e, i = this.element.finalTransform.mat, r = this.masksProperties.length;
                for (e = 0; e < r; e++) if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute("x", -i.props[12]), this.viewData[e].invRect.setAttribute("y", -i.props[13])), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
                    var s = this.storedData[e].expan;
                    this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
                }
            }, MaskElement.prototype.getMaskelement = function () {
                return this.maskElement
            }, MaskElement.prototype.createLayerSolidPath = function () {
                var t = "M0,0 ";
                return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
            }, MaskElement.prototype.drawPath = function (t, e, i) {
                var r, s, a = " M" + e.v[0][0] + "," + e.v[0][1];
                for (s = e._length, r = 1; r < s; r += 1) a += " C" + e.o[r - 1][0] + "," + e.o[r - 1][1] + " " + e.i[r][0] + "," + e.i[r][1] + " " + e.v[r][0] + "," + e.v[r][1];
                if (e.c && s > 1 && (a += " C" + e.o[r - 1][0] + "," + e.o[r - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), i.lastPath !== a) {
                    var n = "";
                    i.elem && (e.c && (n = t.inv ? this.solidPath + a : a), i.elem.setAttribute("d", n)), i.lastPath = a
                }
            }, MaskElement.prototype.destroy = function () {
                this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
            }, HierarchyElement.prototype = {
                initHierarchy: function () {
                    this.hierarchy = [], this._isParent = !1, this.checkParenting()
                }, setHierarchy: function (t) {
                    this.hierarchy = t
                }, setAsParent: function () {
                    this._isParent = !0
                }, checkParenting: function () {
                    void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
                }
            }, FrameElement.prototype = {
                initFrame: function () {
                    this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
                }, prepareProperties: function (t, e) {
                    var i, r = this.dynamicProperties.length;
                    for (i = 0; i < r; i += 1) (e || this._isParent && "transform" === this.dynamicProperties[i].propType) && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0, this._mdf = !0))
                }, addDynamicProperty: function (t) {
                    -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
                }
            }, TransformElement.prototype = {
                initTransform: function () {
                    this.finalTransform = {
                        mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {o: 0},
                        _matMdf: !1,
                        _opMdf: !1,
                        mat: new Matrix
                    }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
                }, renderTransform: function () {
                    if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
                        var t, e = this.finalTransform.mat, i = 0, r = this.hierarchy.length;
                        if (!this.finalTransform._matMdf) for (; i < r;) {
                            if (this.hierarchy[i].finalTransform.mProp._mdf) {
                                this.finalTransform._matMdf = !0;
                                break
                            }
                            i += 1
                        }
                        if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), i = 0; i < r; i += 1) t = this.hierarchy[i].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
                    }
                }, globalToLocal: function (t) {
                    var e = [];
                    e.push(this.finalTransform);
                    for (var i = !0, r = this.comp; i;) r.finalTransform ? (r.data.hasMask && e.splice(0, 0, r.finalTransform), r = r.comp) : i = !1;
                    var s, a, n = e.length;
                    for (s = 0; s < n; s += 1) a = e[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
                    return t
                }, mHelper: new Matrix
            }, RenderableElement.prototype = {
                initRenderable: function () {
                    this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
                }, addRenderableComponent: function (t) {
                    -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
                }, removeRenderableComponent: function (t) {
                    -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
                }, prepareRenderableFrame: function (t) {
                    this.checkLayerLimits(t)
                }, checkTransparency: function () {
                    this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
                }, checkLayerLimits: function (t) {
                    this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
                }, renderRenderable: function () {
                    var t, e = this.renderableComponents.length;
                    for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame)
                }, sourceRectAtTime: function () {
                    return {top: 0, left: 0, width: 100, height: 100}
                }, getLayerSize: function () {
                    return 5 === this.data.ty ? {
                        w: this.data.textData.width,
                        h: this.data.textData.height
                    } : {w: this.data.width, h: this.data.height}
                }
            }, extendPrototype([RenderableElement, createProxyFunction({
                initElement: function (t, e, i) {
                    this.initFrame(), this.initBaseData(t, e, i), this.initTransform(t, e, i), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
                }, hide: function () {
                    this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
                }, show: function () {
                    this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
                }, renderFrame: function () {
                    this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
                }, renderInnerContent: function () {
                }, prepareFrame: function (t) {
                    this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
                }, destroy: function () {
                    this.innerElem = null, this.destroyBaseElement()
                }
            })], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
                this.d = "", this._mdf = !1
            }, SVGShapeData.prototype.setAsAnimated = function () {
                this._isAnimated = !0
            }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, i) {
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {k: 0}, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {k: 0}, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = i, this.stops = [], this.setGradientData(i.pElem, e), this.setGradientOpacity(e, i), this._isAnimated = !!this._isAnimated
            }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
                var i = createElementID(), r = createNS(1 === e.t ? "linearGradient" : "radialGradient");
                r.setAttribute("id", i), r.setAttribute("spreadMethod", "pad"), r.setAttribute("gradientUnits", "userSpaceOnUse");
                var s, a, n, o = [];
                for (n = 4 * e.g.p, a = 0; a < n; a += 4) s = createNS("stop"), r.appendChild(s), o.push(s);
                t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + i + ")"), this.gf = r, this.cst = o
            }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
                if (this.g._hasOpacity && !this.g._collapsable) {
                    var i, r, s, a = createNS("mask"), n = createNS("path");
                    a.appendChild(n);
                    var o = createElementID(), h = createElementID();
                    a.setAttribute("id", h);
                    var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
                    l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
                    var p = this.stops;
                    for (r = 4 * t.g.p; r < s; r += 2) (i = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(i), p.push(i);
                    n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n
                }
            }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
            var SVGElementsRenderer = function () {
                var t = new Matrix, e = new Matrix;

                function i(t, e, i) {
                    (i || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (i || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
                }

                function r(i, r, s) {
                    var a, n, o, h, l, p, m, c, f, d, u, y = r.styles.length, g = r.lvl;
                    for (p = 0; p < y; p += 1) {
                        if (h = r.sh._mdf || s, r.styles[p].lvl < g) {
                            for (c = e.reset(), d = g - r.styles[p].lvl, u = r.transformers.length - 1; !h && d > 0;) h = r.transformers[u].mProps._mdf || h, d--, u--;
                            if (h) for (d = g - r.styles[p].lvl, u = r.transformers.length - 1; d > 0;) f = r.transformers[u].mProps.v.props, c.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), d--, u--
                        } else c = t;
                        if (n = (m = r.sh.paths)._length, h) {
                            for (o = "", a = 0; a < n; a += 1) (l = m.shapes[a]) && l._length && (o += buildShapeString(l, l._length, l.c, c));
                            r.caches[p] = o
                        } else o = r.caches[p];
                        r.styles[p].d += !0 === i.hd ? "" : o, r.styles[p]._mdf = h || r.styles[p]._mdf
                    }
                }

                function s(t, e, i) {
                    var r = e.style;
                    (e.c._mdf || i) && r.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || i) && r.pElem.setAttribute("fill-opacity", e.o.v)
                }

                function a(t, e, i) {
                    n(t, e, i), o(t, e, i)
                }

                function n(t, e, i) {
                    var r, s, a, n, o, h = e.gf, l = e.g._hasOpacity, p = e.s.v, m = e.e.v;
                    if (e.o._mdf || i) {
                        var c = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
                        e.style.pElem.setAttribute(c, e.o.v)
                    }
                    if (e.s._mdf || i) {
                        var f = 1 === t.t ? "x1" : "cx", d = "x1" === f ? "y1" : "cy";
                        h.setAttribute(f, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(f, p[0]), e.of.setAttribute(d, p[1]))
                    }
                    if (e.g._cmdf || i) {
                        r = e.cst;
                        var u = e.g.c;
                        for (a = r.length, s = 0; s < a; s += 1) (n = r[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")")
                    }
                    if (l && (e.g._omdf || i)) {
                        var y = e.g.o;
                        for (a = (r = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) n = r[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1])
                    }
                    if (1 === t.t) (e.e._mdf || i) && (h.setAttribute("x2", m[0]), h.setAttribute("y2", m[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", m[0]), e.of.setAttribute("y2", m[1]))); else if ((e.s._mdf || e.e._mdf || i) && (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || i) {
                        o || (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)));
                        var g = Math.atan2(m[1] - p[1], m[0] - p[0]),
                            v = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v), x = Math.cos(g + e.a.v) * v + p[0],
                            k = Math.sin(g + e.a.v) * v + p[1];
                        h.setAttribute("fx", x), h.setAttribute("fy", k), l && !e.g._collapsable && (e.of.setAttribute("fx", x), e.of.setAttribute("fy", k))
                    }
                }

                function o(t, e, i) {
                    var r = e.style, s = e.d;
                    s && (s._mdf || i) && s.dashStr && (r.pElem.setAttribute("stroke-dasharray", s.dashStr), r.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || i) && r.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || i) && r.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || i) && (r.pElem.setAttribute("stroke-width", e.w.v), r.msElem && r.msElem.setAttribute("stroke-width", e.w.v))
                }

                return {
                    createRenderFunction: function (t) {
                        t.ty;
                        switch (t.ty) {
                            case"fl":
                                return s;
                            case"gf":
                                return n;
                            case"gs":
                                return a;
                            case"st":
                                return o;
                            case"sh":
                            case"el":
                            case"rc":
                            case"sr":
                                return r;
                            case"tr":
                                return i
                        }
                    }
                }
            }();

            function ShapeTransformManager() {
                this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
            }

            function CVShapeData(t, e, i, r) {
                this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
                var s = 4;
                "rc" == e.ty ? s = 5 : "el" == e.ty ? s = 6 : "sr" == e.ty && (s = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
                var a, n, o = i.length;
                for (a = 0; a < o; a += 1) i[a].closed || (n = {
                    transforms: r.addTransformSequence(i[a].transforms),
                    trNodes: []
                }, this.styledShapes.push(n), i[a].elements.push(n))
            }

            function BaseElement() {
            }

            function NullElement(t, e, i) {
                this.initFrame(), this.initBaseData(t, e, i), this.initFrame(), this.initTransform(t, e, i), this.initHierarchy()
            }

            function SVGBaseElement() {
            }

            function IShapeElement() {
            }

            function ITextElement() {
            }

            function ICompElement() {
            }

            function IImageElement(t, e, i) {
                this.assetData = e.getAssetData(t.refId), this.initElement(t, e, i), this.sourceRect = {
                    top: 0,
                    left: 0,
                    width: this.assetData.w,
                    height: this.assetData.h
                }
            }

            function ISolidElement(t, e, i) {
                this.initElement(t, e, i)
            }

            function SVGCompElement(t, e, i) {
                this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, i), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {_placeholder: !0}
            }

            function SVGTextElement(t, e, i) {
                this.textSpans = [], this.renderType = "svg", this.initElement(t, e, i)
            }

            function SVGShapeElement(t, e, i) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, i), this.prevViewData = []
            }

            function SVGTintFilter(t, e) {
                this.filterManager = e;
                var i = createNS("feColorMatrix");
                if (i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "linearRGB"), i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), i.setAttribute("result", "f1"), t.appendChild(i), (i = createNS("feColorMatrix")).setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), i.setAttribute("result", "f2"), t.appendChild(i), this.matrixFilter = i, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
                    var r, s = createNS("feMerge");
                    t.appendChild(s), (r = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), s.appendChild(r), (r = createNS("feMergeNode")).setAttribute("in", "f2"), s.appendChild(r)
                }
            }

            function SVGFillFilter(t, e) {
                this.filterManager = e;
                var i = createNS("feColorMatrix");
                i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(i), this.matrixFilter = i
            }

            function SVGStrokeEffect(t, e) {
                this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = []
            }

            function SVGTritoneFilter(t, e) {
                this.filterManager = e;
                var i = createNS("feColorMatrix");
                i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "linearRGB"), i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), i.setAttribute("result", "f1"), t.appendChild(i);
                var r = createNS("feComponentTransfer");
                r.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(r), this.matrixFilter = r;
                var s = createNS("feFuncR");
                s.setAttribute("type", "table"), r.appendChild(s), this.feFuncR = s;
                var a = createNS("feFuncG");
                a.setAttribute("type", "table"), r.appendChild(a), this.feFuncG = a;
                var n = createNS("feFuncB");
                n.setAttribute("type", "table"), r.appendChild(n), this.feFuncB = n
            }

            function SVGProLevelsFilter(t, e) {
                this.filterManager = e;
                var i = this.filterManager.effectElements, r = createNS("feComponentTransfer");
                (i[10].p.k || 0 !== i[10].p.v || i[11].p.k || 1 !== i[11].p.v || i[12].p.k || 1 !== i[12].p.v || i[13].p.k || 0 !== i[13].p.v || i[14].p.k || 1 !== i[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", r)), (i[17].p.k || 0 !== i[17].p.v || i[18].p.k || 1 !== i[18].p.v || i[19].p.k || 1 !== i[19].p.v || i[20].p.k || 0 !== i[20].p.v || i[21].p.k || 1 !== i[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", r)), (i[24].p.k || 0 !== i[24].p.v || i[25].p.k || 1 !== i[25].p.v || i[26].p.k || 1 !== i[26].p.v || i[27].p.k || 0 !== i[27].p.v || i[28].p.k || 1 !== i[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", r)), (i[31].p.k || 0 !== i[31].p.v || i[32].p.k || 1 !== i[32].p.v || i[33].p.k || 1 !== i[33].p.v || i[34].p.k || 0 !== i[34].p.v || i[35].p.k || 1 !== i[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", r)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (r.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(r), r = createNS("feComponentTransfer")), (i[3].p.k || 0 !== i[3].p.v || i[4].p.k || 1 !== i[4].p.v || i[5].p.k || 1 !== i[5].p.v || i[6].p.k || 0 !== i[6].p.v || i[7].p.k || 1 !== i[7].p.v) && (r.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(r), this.feFuncRComposed = this.createFeFunc("feFuncR", r), this.feFuncGComposed = this.createFeFunc("feFuncG", r), this.feFuncBComposed = this.createFeFunc("feFuncB", r))
            }

            function SVGDropShadowEffect(t, e) {
                t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "400%"), t.setAttribute("height", "400%"), this.filterManager = e;
                var i = createNS("feGaussianBlur");
                i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);
                var r = createNS("feOffset");
                r.setAttribute("dx", "25"), r.setAttribute("dy", "0"), r.setAttribute("in", "drop_shadow_1"), r.setAttribute("result", "drop_shadow_2"), this.feOffset = r, t.appendChild(r);
                var s = createNS("feFlood");
                s.setAttribute("flood-color", "#00ff00"), s.setAttribute("flood-opacity", "1"), s.setAttribute("result", "drop_shadow_3"), this.feFlood = s, t.appendChild(s);
                var a = createNS("feComposite");
                a.setAttribute("in", "drop_shadow_3"), a.setAttribute("in2", "drop_shadow_2"), a.setAttribute("operator", "in"), a.setAttribute("result", "drop_shadow_4"), t.appendChild(a);
                var n, o = createNS("feMerge");
                t.appendChild(o), n = createNS("feMergeNode"), o.appendChild(n), (n = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = n, this.feMerge = o, this.originalNodeAdded = !1, o.appendChild(n)
            }

            ShapeTransformManager.prototype = {
                addTransformSequence: function (t) {
                    var e, i = t.length, r = "_";
                    for (e = 0; e < i; e += 1) r += t[e].transform.key + "_";
                    var s = this.sequences[r];
                    return s || (s = {
                        transforms: [].concat(t),
                        finalTransform: new Matrix,
                        _mdf: !1
                    }, this.sequences[r] = s, this.sequenceList.push(s)), s
                }, processSequence: function (t, e) {
                    for (var i, r = 0, s = t.transforms.length, a = e; r < s && !e;) {
                        if (t.transforms[r].transform.mProps._mdf) {
                            a = !0;
                            break
                        }
                        r += 1
                    }
                    if (a) for (t.finalTransform.reset(), r = s - 1; r >= 0; r -= 1) i = t.transforms[r].transform.mProps.v.props, t.finalTransform.transform(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15]);
                    t._mdf = a
                }, processSequences: function (t) {
                    var e, i = this.sequenceList.length;
                    for (e = 0; e < i; e += 1) this.processSequence(this.sequenceList[e], t)
                }, getNewKey: function () {
                    return "_" + this.transform_key_count++
                }
            }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
                checkMasks: function () {
                    if (!this.data.hasMask) return !1;
                    for (var t = 0, e = this.data.masksProperties.length; t < e;) {
                        if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
                        t += 1
                    }
                    return !1
                }, initExpressions: function () {
                    this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
                    var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
                    this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface)
                }, setBlendMode: function () {
                    var t = getBlendMode(this.data.bm);
                    (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
                }, initBaseData: function (t, e, i) {
                    this.globalData = e, this.comp = i, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties)
                }, getType: function () {
                    return this.type
                }, sourceRectAtTime: function () {
                }
            }, NullElement.prototype.prepareFrame = function (t) {
                this.prepareProperties(t, !0)
            }, NullElement.prototype.renderFrame = function () {
            }, NullElement.prototype.getBaseElement = function () {
                return null
            }, NullElement.prototype.destroy = function () {
            }, NullElement.prototype.sourceRectAtTime = function () {
            }, NullElement.prototype.hide = function () {
            }, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
                initRendererElement: function () {
                    this.layerElement = createNS("g")
                }, createContainerElements: function () {
                    this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
                    var t, e, i, r = null;
                    if (this.data.td) {
                        if (3 == this.data.td || 1 == this.data.td) {
                            var s = createNS("mask");
                            s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), r = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (i = createNS("g")).appendChild(this.layerElement), r = i, s.appendChild(i), i.setAttribute("filter", "url(" + locationHref + "#" + t + ")"))
                        } else if (2 == this.data.td) {
                            var a = createNS("mask");
                            a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
                            var n = createNS("g");
                            a.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
                            var o = createNS("feComponentTransfer");
                            o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
                            var h = createNS("feFuncA");
                            h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
                            var l = createNS("rect");
                            l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), r = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), i = createNS("g"), n.appendChild(l), i.appendChild(this.layerElement), r = i, n.appendChild(i)), this.globalData.defs.appendChild(a)
                        }
                    } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), r = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
                    if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
                        var p = createNS("clipPath"), m = createNS("path");
                        m.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                        var c = createElementID();
                        if (p.setAttribute("id", c), p.appendChild(m), this.globalData.defs.appendChild(p), this.checkMasks()) {
                            var f = createNS("g");
                            f.setAttribute("clip-path", "url(" + locationHref + "#" + c + ")"), f.appendChild(this.layerElement), this.transformedElement = f, r ? r.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
                        } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + c + ")")
                    }
                    0 !== this.data.bm && this.setBlendMode()
                }, renderElement: function () {
                    this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
                }, destroyBaseElement: function () {
                    this.layerElement = null, this.matteElement = null, this.maskManager.destroy()
                }, getBaseElement: function () {
                    return this.data.hd ? null : this.baseElement
                }, createRenderableComponents: function () {
                    this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this)
                }, setMatte: function (t) {
                    this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")")
                }
            }, IShapeElement.prototype = {
                addShapeToModifiers: function (t) {
                    var e, i = this.shapeModifiers.length;
                    for (e = 0; e < i; e += 1) this.shapeModifiers[e].addShape(t)
                },
                isShapeInAnimatedModifiers: function (t) {
                    for (var e = this.shapeModifiers.length; 0 < e;) if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
                    return !1
                },
                renderModifiers: function () {
                    if (this.shapeModifiers.length) {
                        var t, e = this.shapes.length;
                        for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
                        for (t = (e = this.shapeModifiers.length) - 1; t >= 0; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame)
                    }
                },
                lcEnum: {1: "butt", 2: "round", 3: "square"},
                ljEnum: {1: "miter", 2: "round", 3: "bevel"},
                searchProcessedElement: function (t) {
                    for (var e = this.processedElements, i = 0, r = e.length; i < r;) {
                        if (e[i].elem === t) return e[i].pos;
                        i += 1
                    }
                    return 0
                },
                addProcessedElement: function (t, e) {
                    for (var i = this.processedElements, r = i.length; r;) if (i[r -= 1].elem === t) return void (i[r].pos = e);
                    i.push(new ProcessedElement(t, e))
                },
                prepareFrame: function (t) {
                    this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
                }
            }, ITextElement.prototype.initElement = function (t, e, i) {
                this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, i), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, i), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
            }, ITextElement.prototype.prepareFrame = function (t) {
                this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
            }, ITextElement.prototype.createPathShape = function (t, e) {
                var i, r, s = e.length, a = "";
                for (i = 0; i < s; i += 1) r = e[i].ks.k, a += buildShapeString(r, r.i.length, !0, t);
                return a
            }, ITextElement.prototype.updateDocumentData = function (t, e) {
                this.textProperty.updateDocumentData(t, e)
            }, ITextElement.prototype.canResizeFont = function (t) {
                this.textProperty.canResizeFont(t)
            }, ITextElement.prototype.setMinimumFontSize = function (t) {
                this.textProperty.setMinimumFontSize(t)
            }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, i, r, s) {
                switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
                    case 1:
                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);
                        break;
                    case 2:
                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2, 0, 0)
                }
                e.translate(r, s, 0)
            }, ITextElement.prototype.buildColor = function (t) {
                return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
            }, ITextElement.prototype.emptyProp = new LetterProps, ITextElement.prototype.destroy = function () {
            }, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, i) {
                this.initFrame(), this.initBaseData(t, e, i), this.initTransform(t, e, i), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
            }, ICompElement.prototype.prepareFrame = function (t) {
                if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
                    if (this.tm._placeholder) this.renderedFrame = t / this.data.sr; else {
                        var e = this.tm.v;
                        e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
                    }
                    var i, r = this.elements.length;
                    for (this.completeLayers || this.checkLayers(this.renderedFrame), i = r - 1; i >= 0; i -= 1) (this.completeLayers || this.elements[i]) && (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st), this.elements[i]._mdf && (this._mdf = !0))
                }
            }, ICompElement.prototype.renderInnerContent = function () {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }, ICompElement.prototype.setElements = function (t) {
                this.elements = t
            }, ICompElement.prototype.getElements = function () {
                return this.elements
            }, ICompElement.prototype.destroyElements = function () {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy()
            }, ICompElement.prototype.destroy = function () {
                this.destroyElements(), this.destroyBaseElement()
            }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
                var t = this.globalData.getAssetsPath(this.assetData);
                this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
            }, IImageElement.prototype.sourceRectAtTime = function () {
                return this.sourceRect
            }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
                var t = createNS("rect");
                t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
            }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function () {
                this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
            }, SVGTextElement.prototype.buildTextContents = function (t) {
                for (var e = 0, i = t.length, r = [], s = ""; e < i;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (r.push(s), s = "") : s += t[e], e += 1;
                return r.push(s), r
            }, SVGTextElement.prototype.buildNewText = function () {
                var t, e, i = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(i ? i.l.length : 0), i.fc ? this.layerElement.setAttribute("fill", this.buildColor(i.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), i.sc && (this.layerElement.setAttribute("stroke", this.buildColor(i.sc)), this.layerElement.setAttribute("stroke-width", i.sw)), this.layerElement.setAttribute("font-size", i.finalSize);
                var r = this.globalData.fontManager.getFontByName(i.f);
                if (r.fClass) this.layerElement.setAttribute("class", r.fClass); else {
                    this.layerElement.setAttribute("font-family", r.fFamily);
                    var s = i.fWeight, a = i.fStyle;
                    this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s)
                }
                this.layerElement.setAttribute("arial-label", i.t);
                var n, o = i.l || [], h = !!this.globalData.fontManager.chars;
                e = o.length;
                var l, p = this.mHelper, m = "", c = this.data.singleShape, f = 0, d = 0, u = !0,
                    y = i.tr / 1e3 * i.finalSize;
                if (!c || h || i.sz) {
                    var g, v, x = this.textSpans.length;
                    for (t = 0; t < e; t += 1) h && c && 0 !== t || (n = x > t ? this.textSpans[t] : createNS(h ? "path" : "text"), x <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(i.finalSize / 100, i.finalSize / 100), c && (o[t].n && (f = -y, d += i.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(i, p, o[t].line, f, d), f += o[t].l || 0, f += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(i.finalText[t], r.fStyle, this.globalData.fontManager.getFontByName(i.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], c ? m += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (c && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
                    c && n && n.setAttribute("d", m)
                } else {
                    var k = this.textContainer, b = "start";
                    switch (i.j) {
                        case 1:
                            b = "end";
                            break;
                        case 2:
                            b = "middle"
                    }
                    k.setAttribute("text-anchor", b), k.setAttribute("letter-spacing", y);
                    var E = this.buildTextContents(i.finalText);
                    for (e = E.length, d = i.ps ? i.ps[1] + i.ascent : 0, t = 0; t < e; t += 1) (n = this.textSpans[t] || createNS("tspan")).textContent = E[t], n.setAttribute("x", 0), n.setAttribute("y", d), n.style.display = "inherit", k.appendChild(n), this.textSpans[t] = n, d += i.finalLineHeight;
                    this.layerElement.appendChild(k)
                }
                for (; t < this.textSpans.length;) this.textSpans[t].style.display = "none", t += 1;
                this._sizeChanged = !0
            }, SVGTextElement.prototype.sourceRectAtTime = function (t) {
                if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
                    this._sizeChanged = !1;
                    var e = this.layerElement.getBBox();
                    this.bbox = {top: e.y, left: e.x, width: e.width, height: e.height}
                }
                return this.bbox
            }, SVGTextElement.prototype.renderInnerContent = function () {
                if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
                    var t, e;
                    this._sizeChanged = !0;
                    var i, r, s = this.textAnimator.renderedLetters, a = this.textProperty.currentData.l;
                    for (e = a.length, t = 0; t < e; t += 1) a[t].n || (i = s[t], r = this.textSpans[t], i._mdf.m && r.setAttribute("transform", i.m), i._mdf.o && r.setAttribute("opacity", i.o), i._mdf.sw && r.setAttribute("stroke-width", i.sw), i._mdf.sc && r.setAttribute("stroke", i.sc), i._mdf.fc && r.setAttribute("fill", i.fc))
                }
            }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {
            }, SVGShapeElement.prototype.identityMatrix = new Matrix, SVGShapeElement.prototype.buildExpressionInterface = function () {
            }, SVGShapeElement.prototype.createContent = function () {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes()
            }, SVGShapeElement.prototype.filterUniqueShapes = function () {
                var t, e, i, r, s = this.shapes.length, a = this.stylesList.length, n = [], o = !1;
                for (i = 0; i < a; i += 1) {
                    for (r = this.stylesList[i], o = !1, n.length = 0, t = 0; t < s; t += 1) -1 !== (e = this.shapes[t]).styles.indexOf(r) && (n.push(e), o = e._isAnimated || o);
                    n.length > 1 && o && this.setShapesAsAnimated(n)
                }
            }, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1) t[e].setAsAnimated()
            }, SVGShapeElement.prototype.createStyleElement = function (t, e) {
                var i, r = new SVGStyleData(t, e), s = r.pElem;
                if ("st" === t.ty) i = new SVGStrokeStyleData(this, t, r); else if ("fl" === t.ty) i = new SVGFillStyleData(this, t, r); else if ("gf" === t.ty || "gs" === t.ty) {
                    i = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, r), this.globalData.defs.appendChild(i.gf), i.maskId && (this.globalData.defs.appendChild(i.ms), this.globalData.defs.appendChild(i.of), s.setAttribute("mask", "url(" + locationHref + "#" + i.maskId + ")"))
                }
                return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(r), this.addToAnimatedContents(t, i), i
            }, SVGShapeElement.prototype.createGroupElement = function (t) {
                var e = new ShapeGroupData;
                return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e
            }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
                var i = TransformPropertyFactory.getTransformProperty(this, t, this),
                    r = new SVGTransformData(i, i.o, e);
                return this.addToAnimatedContents(t, r), r
            }, SVGShapeElement.prototype.createShapeElement = function (t, e, i) {
                var r = 4;
                "rc" === t.ty ? r = 5 : "el" === t.ty ? r = 6 : "sr" === t.ty && (r = 7);
                var s = new SVGShapeData(e, i, ShapePropertyFactory.getShapeProp(this, t, r, this));
                return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s
            }, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
                for (var i = 0, r = this.animatedContents.length; i < r;) {
                    if (this.animatedContents[i].element === e) return;
                    i += 1
                }
                this.animatedContents.push({fn: SVGElementsRenderer.createRenderFunction(t), element: e, data: t})
            }, SVGShapeElement.prototype.setElementStyles = function (t) {
                var e, i = t.styles, r = this.stylesList.length;
                for (e = 0; e < r; e += 1) this.stylesList[e].closed || i.push(this.stylesList[e])
            }, SVGShapeElement.prototype.reloadShapes = function () {
                this._isFirstFrame = !0;
                var t, e = this.itemsData.length;
                for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
                this.renderModifiers()
            }, SVGShapeElement.prototype.searchShapes = function (t, e, i, r, s, a, n) {
                var o, h, l, p, m, c, f = [].concat(a), d = t.length - 1, u = [], y = [];
                for (o = d; o >= 0; o -= 1) {
                    if ((c = this.searchProcessedElement(t[o])) ? e[o] = i[c - 1] : t[o]._render = n, "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty) c ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && r.appendChild(e[o].style.pElem), u.push(e[o].style); else if ("gr" == t[o].ty) {
                        if (c) for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h]; else e[o] = this.createGroupElement(t[o]);
                        this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, f, n), t[o]._render && r.appendChild(e[o].gr)
                    } else "tr" == t[o].ty ? (c || (e[o] = this.createTransformElement(t[o], r)), p = e[o].transform, f.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (c || (e[o] = this.createShapeElement(t[o], f, s)), this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (c ? (m = e[o]).closed = !1 : ((m = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = m, this.shapeModifiers.push(m)), y.push(m)) : "rp" == t[o].ty && (c ? (m = e[o]).closed = !0 : (m = ShapeModifiers.getModifier(t[o].ty), e[o] = m, m.init(this, t, o, e), this.shapeModifiers.push(m), n = !1), y.push(m));
                    this.addProcessedElement(t[o], o + 1)
                }
                for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
                for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0
            }, SVGShapeElement.prototype.renderInnerContent = function () {
                this.renderModifiers();
                var t, e = this.stylesList.length;
                for (t = 0; t < e; t += 1) this.stylesList[t].reset();
                for (this.renderShape(), t = 0; t < e; t += 1) (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
            }, SVGShapeElement.prototype.renderShape = function () {
                var t, e, i = this.animatedContents.length;
                for (t = 0; t < i; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
            }, SVGShapeElement.prototype.destroy = function () {
                this.destroyBaseElement(), this.shapesData = null, this.itemsData = null
            }, SVGTintFilter.prototype.renderFrame = function (t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v, i = this.filterManager.effectElements[1].p.v,
                        r = this.filterManager.effectElements[2].p.v / 100;
                    this.matrixFilter.setAttribute("values", i[0] - e[0] + " 0 0 0 " + e[0] + " " + (i[1] - e[1]) + " 0 0 0 " + e[1] + " " + (i[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
                }
            }, SVGFillFilter.prototype.renderFrame = function (t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[2].p.v, i = this.filterManager.effectElements[6].p.v;
                    this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + i + " 0")
                }
            }, SVGStrokeEffect.prototype.initialize = function () {
                var t, e, i, r, s = this.elem.layerElement.children || this.elem.layerElement.childNodes;
                for (1 === this.filterManager.effectElements[1].p.v ? (r = this.elem.maskManager.masksProperties.length, i = 0) : r = (i = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); i < r; i += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
                    p: t,
                    m: i
                });
                if (3 === this.filterManager.effectElements[10].p.v) {
                    var a = createNS("mask"), n = createElementID();
                    a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
                    var o = createNS("g");
                    for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); s[0];) o.appendChild(s[0]);
                    this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff")
                } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
                    if (2 === this.filterManager.effectElements[10].p.v) for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) this.elem.layerElement.removeChild(s[0]);
                    this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff")
                }
                this.initialized = !0, this.pathMasker = e
            }, SVGStrokeEffect.prototype.renderFrame = function (t) {
                this.initialized || this.initialize();
                var e, i, r, s = this.paths.length;
                for (e = 0; e < s; e += 1) if (-1 !== this.paths[e].m && (i = this.elem.maskManager.viewData[this.paths[e].m], r = this.paths[e].p, (t || this.filterManager._mdf || i.prop._mdf) && r.setAttribute("d", i.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf)) {
                    var a;
                    if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                        var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                            o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                            h = r.getTotalLength();
                        a = "0 0 0 " + h * n + " ";
                        var l, p = h * (o - n),
                            m = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                            c = Math.floor(p / m);
                        for (l = 0; l < c; l += 1) a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
                        a += "0 " + 10 * h + " 0 0"
                    } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
                    r.setAttribute("stroke-dasharray", a)
                }
                if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
                    var f = this.filterManager.effectElements[3].p.v;
                    this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * f[0]) + "," + bm_floor(255 * f[1]) + "," + bm_floor(255 * f[2]) + ")")
                }
            }, SVGTritoneFilter.prototype.renderFrame = function (t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v, i = this.filterManager.effectElements[1].p.v,
                        r = this.filterManager.effectElements[2].p.v, s = r[0] + " " + i[0] + " " + e[0],
                        a = r[1] + " " + i[1] + " " + e[1], n = r[2] + " " + i[2] + " " + e[2];
                    this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n)
                }
            }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
                var i = createNS(t);
                return i.setAttribute("type", "table"), e.appendChild(i), i
            }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, i, r, s) {
                for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {length: 256}), m = 0, c = s - r, f = e - t; o <= 256;) n = (a = o / 256) <= h ? f < 0 ? s : r : a >= l ? f < 0 ? r : s : r + c * Math.pow((a - t) / f, 1 / i), p[m++] = n, o += 256 / 255;
                return p.join(" ")
            }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
                if (t || this.filterManager._mdf) {
                    var e, i = this.filterManager.effectElements;
                    this.feFuncRComposed && (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) && (e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) && (e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) && (e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) && (e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) && (e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v), this.feFuncA.setAttribute("tableValues", e))
                }
            }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
                if (t || this.filterManager._mdf) {
                    if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
                        var e = this.filterManager.effectElements[0].p.v;
                        this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
                    }
                    if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
                        var i = this.filterManager.effectElements[3].p.v,
                            r = (this.filterManager.effectElements[2].p.v - 90) * degToRads, s = i * Math.cos(r),
                            a = i * Math.sin(r);
                        this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a)
                    }
                }
            };
            var _svgMatteSymbols = [];

            function SVGMatte3Effect(t, e, i) {
                this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = i, i.matteElement = createNS("g"), i.matteElement.appendChild(i.layerElement), i.matteElement.appendChild(i.transformedElement), i.baseElement = i.matteElement
            }

            function SVGEffects(t) {
                var e, i, r = t.data.ef ? t.data.ef.length : 0, s = createElementID(),
                    a = filtersFactory.createFilter(s), n = 0;
                for (this.filters = [], e = 0; e < r; e += 1) i = null, 20 === t.data.ef[e].ty ? (n += 1, i = new SVGTintFilter(a, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, i = new SVGFillFilter(a, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? i = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, i = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, i = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, i = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty && (i = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t)), i && this.filters.push(i);
                n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this)
            }

            function CVContextData() {
                this.saved = [], this.cArrPos = 0, this.cTr = new Matrix, this.cO = 1;
                var t;
                for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
                this._length = 15
            }

            function CVBaseElement() {
            }

            function CVImageElement(t, e, i) {
                this.failed = !1, this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, i)
            }

            function CVCompElement(t, e, i) {
                this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, i), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {_placeholder: !0}
            }

            function CVMaskElement(t, e) {
                this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
                var i, r = this.masksProperties.length, s = !1;
                for (i = 0; i < r; i++) "n" !== this.masksProperties[i].mode && (s = !0), this.viewData[i] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[i], 3);
                this.hasMasks = s, s && this.element.addRenderableComponent(this)
            }

            function CVShapeElement(t, e, i) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager, this.initElement(t, e, i)
            }

            function CVSolidElement(t, e, i) {
                this.initElement(t, e, i)
            }

            function CVTextElement(t, e, i) {
                this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
                    fill: "rgba(0,0,0,0)",
                    stroke: "rgba(0,0,0,0)",
                    sWidth: 0,
                    fValue: ""
                }, this.initElement(t, e, i)
            }

            function CVEffects() {
            }

            function HBaseElement(t, e, i) {
            }

            function HSolidElement(t, e, i) {
                this.initElement(t, e, i)
            }

            function HCompElement(t, e, i) {
                this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, i), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {_placeholder: !0}
            }

            function HShapeElement(t, e, i) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, i), this.prevViewData = [], this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                }
            }

            function HTextElement(t, e, i) {
                this.textSpans = [], this.textPaths = [], this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, i)
            }

            function HImageElement(t, e, i) {
                this.assetData = e.getAssetData(t.refId), this.initElement(t, e, i)
            }

            function HCameraElement(t, e, i) {
                this.initFrame(), this.initBaseData(t, e, i), this.initHierarchy();
                var r = PropertyFactory.getProp;
                if (this.pe = r(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = r(this, t.ks.p.x, 1, 0, this), this.py = r(this, t.ks.p.y, 1, 0, this), this.pz = r(this, t.ks.p.z, 1, 0, this)) : this.p = r(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = r(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
                    var s, a = t.ks.or.k.length;
                    for (s = 0; s < a; s += 1) t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null
                }
                this.or = r(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = r(this, t.ks.rx, 0, degToRads, this), this.ry = r(this, t.ks.ry, 0, degToRads, this), this.rz = r(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix, this._prevMat = new Matrix, this._isFirstFrame = !0, this.finalTransform = {mProp: this}
            }

            function HEffects() {
            }

            SVGMatte3Effect.prototype.findSymbol = function (t) {
                for (var e = 0, i = _svgMatteSymbols.length; e < i;) {
                    if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
                    e += 1
                }
                return null
            }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
                var i = t.layerElement.parentNode;
                if (i) {
                    for (var r, s = i.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) a += 1;
                    a <= n - 2 && (r = s[a + 1]);
                    var o = createNS("use");
                    o.setAttribute("href", "#" + e), r ? i.insertBefore(o, r) : i.appendChild(o)
                }
            }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
                if (!this.findSymbol(e)) {
                    var i = createElementID(), r = createNS("mask");
                    r.setAttribute("id", e.layerId), r.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
                    var s = t.globalData.defs;
                    s.appendChild(r);
                    var a = createNS("symbol");
                    a.setAttribute("id", i), this.replaceInParent(e, i), a.appendChild(e.layerElement), s.appendChild(a);
                    var n = createNS("use");
                    n.setAttribute("href", "#" + i), r.appendChild(n), e.data.hd = !1, e.show()
                }
                t.setMatte(e.layerId)
            }, SVGMatte3Effect.prototype.initialize = function () {
                for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, i = 0, r = e.length; i < r;) e[i] && e[i].data.ind === t && this.setElementAsMask(this.elem, e[i]), i += 1;
                this.initialized = !0
            }, SVGMatte3Effect.prototype.renderFrame = function () {
                this.initialized || this.initialize()
            }, SVGEffects.prototype.renderFrame = function (t) {
                var e, i = this.filters.length;
                for (e = 0; e < i; e += 1) this.filters[e].renderFrame(t)
            }, CVContextData.prototype.duplicate = function () {
                var t = 2 * this._length, e = this.savedOp;
                this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
                var i = 0;
                for (i = this._length; i < t; i += 1) this.saved[i] = createTypedArray("float32", 16);
                this._length = t
            }, CVContextData.prototype.reset = function () {
                this.cArrPos = 0, this.cTr.reset(), this.cO = 1
            }, CVBaseElement.prototype = {
                createElements: function () {
                }, initRendererElement: function () {
                }, createContainerElements: function () {
                    this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this)
                }, createContent: function () {
                }, setBlendMode: function () {
                    var t = this.globalData;
                    if (t.blendMode !== this.data.bm) {
                        t.blendMode = this.data.bm;
                        var e = getBlendMode(this.data.bm);
                        t.canvasContext.globalCompositeOperation = e
                    }
                }, createRenderableComponents: function () {
                    this.maskManager = new CVMaskElement(this.data, this)
                }, hideElement: function () {
                    this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
                }, showElement: function () {
                    this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
                }, renderFrame: function () {
                    this.hidden || this.data.hd || (this.renderTransform(), this.renderRenderable(), this.setBlendMode(), this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1))
                }, destroy: function () {
                    this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
                }, mHelper: new Matrix
            }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
                if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
                    var t = createTag("canvas");
                    t.width = this.assetData.w, t.height = this.assetData.h;
                    var e, i, r = t.getContext("2d"), s = this.img.width, a = this.img.height, n = s / a,
                        o = this.assetData.w / this.assetData.h,
                        h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
                    n > o && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (i = a) * o : i = (e = s) / o, r.drawImage(this.img, (s - e) / 2, (a - i) / 2, e, i, 0, 0, this.assetData.w, this.assetData.h), this.img = t
                }
            }, CVImageElement.prototype.renderInnerContent = function (t) {
                this.failed || this.canvasContext.drawImage(this.img, 0, 0)
            }, CVImageElement.prototype.destroy = function () {
                this.img = null
            }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
                var t;
                for (t = this.layers.length - 1; t >= 0; t -= 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }, CVCompElement.prototype.destroy = function () {
                var t;
                for (t = this.layers.length - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
                this.layers = null, this.elements = null
            }, CVMaskElement.prototype.renderFrame = function () {
                if (this.hasMasks) {
                    var t, e, i, r, s = this.element.finalTransform.mat, a = this.element.canvasContext,
                        n = this.masksProperties.length;
                    for (a.beginPath(), t = 0; t < n; t++) if ("n" !== this.masksProperties[t].mode) {
                        this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), r = this.viewData[t].v, e = s.applyToPointArray(r.v[0][0], r.v[0][1], 0), a.moveTo(e[0], e[1]);
                        var o, h = r._length;
                        for (o = 1; o < h; o++) i = s.applyToTriplePoints(r.o[o - 1], r.i[o], r.v[o]), a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
                        i = s.applyToTriplePoints(r.o[o - 1], r.i[0], r.v[0]), a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5])
                    }
                    this.element.globalData.renderer.save(!0), a.clip()
                }
            }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
                this.element = null
            }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
                opacity: 1,
                _opMdf: !1
            }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
            }, CVShapeElement.prototype.createStyleElement = function (t, e) {
                var i = {
                    data: t,
                    type: t.ty,
                    preTransforms: this.transformsManager.addTransformSequence(e),
                    transforms: [],
                    elements: [],
                    closed: !0 === t.hd
                }, r = {};
                if ("fl" == t.ty || "st" == t.ty ? (r.c = PropertyFactory.getProp(this, t.c, 1, 255, this), r.c.k || (i.co = "rgb(" + bm_floor(r.c.v[0]) + "," + bm_floor(r.c.v[1]) + "," + bm_floor(r.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (r.s = PropertyFactory.getProp(this, t.s, 1, null, this), r.e = PropertyFactory.getProp(this, t.e, 1, null, this), r.h = PropertyFactory.getProp(this, t.h || {k: 0}, 0, .01, this), r.a = PropertyFactory.getProp(this, t.a || {k: 0}, 0, degToRads, this), r.g = new GradientProperty(this, t.g, this)), r.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty) {
                    if (i.lc = this.lcEnum[t.lc] || "round", i.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (i.ml = t.ml), r.w = PropertyFactory.getProp(this, t.w, 0, null, this), r.w.k || (i.wi = r.w.v), t.d) {
                        var s = new DashProperty(this, t.d, "canvas", this);
                        r.d = s, r.d.k || (i.da = r.d.dashArray, i.do = r.d.dashoffset[0])
                    }
                } else i.r = 2 === t.r ? "evenodd" : "nonzero";
                return this.stylesList.push(i), r.style = i, r
            }, CVShapeElement.prototype.createGroupElement = function (t) {
                return {it: [], prevViewData: []}
            }, CVShapeElement.prototype.createTransformElement = function (t) {
                return {
                    transform: {
                        opacity: 1,
                        _opMdf: !1,
                        key: this.transformsManager.getNewKey(),
                        op: PropertyFactory.getProp(this, t.o, 0, .01, this),
                        mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
                    }
                }
            }, CVShapeElement.prototype.createShapeElement = function (t) {
                var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
                return this.shapes.push(e), this.addShapeToModifiers(e), e
            }, CVShapeElement.prototype.reloadShapes = function () {
                this._isFirstFrame = !0;
                var t, e = this.itemsData.length;
                for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
                this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
            }, CVShapeElement.prototype.addTransformToStyleList = function (t) {
                var e, i = this.stylesList.length;
                for (e = 0; e < i; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
            }, CVShapeElement.prototype.removeTransformFromStyleList = function () {
                var t, e = this.stylesList.length;
                for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop()
            }, CVShapeElement.prototype.closeStyles = function (t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1) t[e].closed = !0
            }, CVShapeElement.prototype.searchShapes = function (t, e, i, r, s) {
                var a, n, o, h, l, p, m = t.length - 1, c = [], f = [], d = [].concat(s);
                for (a = m; a >= 0; a -= 1) {
                    if ((h = this.searchProcessedElement(t[a])) ? e[a] = i[h - 1] : t[a]._shouldRender = r, "fl" == t[a].ty || "st" == t[a].ty || "gf" == t[a].ty || "gs" == t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], d), c.push(e[a].style); else if ("gr" == t[a].ty) {
                        if (h) for (o = e[a].it.length, n = 0; n < o; n += 1) e[a].prevViewData[n] = e[a].it[n]; else e[a] = this.createGroupElement(t[a]);
                        this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, r, d)
                    } else "tr" == t[a].ty ? (h || (p = this.createTransformElement(t[a]), e[a] = p), d.push(e[a]), this.addTransformToStyleList(e[a])) : "sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" == t[a].ty || "rd" == t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]), e[a] = l, this.shapeModifiers.push(l)), f.push(l)) : "rp" == t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty), e[a] = l, l.init(this, t, a, e), this.shapeModifiers.push(l), r = !1), f.push(l));
                    this.addProcessedElement(t[a], a + 1)
                }
                for (this.removeTransformFromStyleList(), this.closeStyles(c), m = f.length, a = 0; a < m; a += 1) f[a].closed = !0
            }, CVShapeElement.prototype.renderInnerContent = function () {
                this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
            }, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
                (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
            }, CVShapeElement.prototype.drawLayer = function () {
                var t, e, i, r, s, a, n, o, h, l = this.stylesList.length, p = this.globalData.renderer,
                    m = this.globalData.canvasContext;
                for (t = 0; t < l; t += 1) if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
                    for (p.save(), a = h.elements, "st" === o || "gs" === o ? (m.strokeStyle = "st" === o ? h.co : h.grd, m.lineWidth = h.wi, m.lineCap = h.lc, m.lineJoin = h.lj, m.miterLimit = h.ml || 0) : m.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && m.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), i = a.length, e = 0; e < i; e += 1) {
                        for ("st" !== o && "gs" !== o || (m.beginPath(), h.da && (m.setLineDash(h.da), m.lineDashOffset = h.do)), s = (n = a[e].trNodes).length, r = 0; r < s; r += 1) "m" == n[r].t ? m.moveTo(n[r].p[0], n[r].p[1]) : "c" == n[r].t ? m.bezierCurveTo(n[r].pts[0], n[r].pts[1], n[r].pts[2], n[r].pts[3], n[r].pts[4], n[r].pts[5]) : m.closePath();
                        "st" !== o && "gs" !== o || (m.stroke(), h.da && m.setLineDash(this.dashResetter))
                    }
                    "st" !== o && "gs" !== o && m.fill(h.r), p.restore()
                }
            }, CVShapeElement.prototype.renderShape = function (t, e, i, r) {
                var s, a;
                for (a = t, s = e.length - 1; s >= 0; s -= 1) "tr" == e[s].ty ? (a = i[s].transform, this.renderShapeTransform(t, a)) : "sh" == e[s].ty || "el" == e[s].ty || "rc" == e[s].ty || "sr" == e[s].ty ? this.renderPath(e[s], i[s]) : "fl" == e[s].ty ? this.renderFill(e[s], i[s], a) : "st" == e[s].ty ? this.renderStroke(e[s], i[s], a) : "gf" == e[s].ty || "gs" == e[s].ty ? this.renderGradientFill(e[s], i[s], a) : "gr" == e[s].ty ? this.renderShape(a, e[s].it, i[s].it) : e[s].ty;
                r && this.drawLayer()
            }, CVShapeElement.prototype.renderStyledShape = function (t, e) {
                if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
                    var i, r, s, a = t.trNodes, n = e.paths, o = n._length;
                    a.length = 0;
                    var h = t.transforms.finalTransform;
                    for (s = 0; s < o; s += 1) {
                        var l = n.shapes[s];
                        if (l && l.v) {
                            for (r = l._length, i = 1; i < r; i += 1) 1 === i && a.push({
                                t: "m",
                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                            }), a.push({t: "c", pts: h.applyToTriplePoints(l.o[i - 1], l.i[i], l.v[i])});
                            1 === r && a.push({
                                t: "m",
                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                            }), l.c && r && (a.push({
                                t: "c",
                                pts: h.applyToTriplePoints(l.o[i - 1], l.i[0], l.v[0])
                            }), a.push({t: "z"}))
                        }
                    }
                    t.trNodes = a
                }
            }, CVShapeElement.prototype.renderPath = function (t, e) {
                if (!0 !== t.hd && t._shouldRender) {
                    var i, r = e.styledShapes.length;
                    for (i = 0; i < r; i += 1) this.renderStyledShape(e.styledShapes[i], e.sh)
                }
            }, CVShapeElement.prototype.renderFill = function (t, e, i) {
                var r = e.style;
                (e.c._mdf || this._isFirstFrame) && (r.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || i._opMdf || this._isFirstFrame) && (r.coOp = e.o.v * i.opacity)
            }, CVShapeElement.prototype.renderGradientFill = function (t, e, i) {
                var r = e.style;
                if (!r.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
                    var s = this.globalData.canvasContext, a = e.s.v, n = e.e.v;
                    if (1 === t.t) c = s.createLinearGradient(a[0], a[1], n[0], n[1]); else var o = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2)),
                        h = Math.atan2(n[1] - a[1], n[0] - a[0]),
                        l = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v), p = Math.cos(h + e.a.v) * l + a[0],
                        m = Math.sin(h + e.a.v) * l + a[1], c = s.createRadialGradient(p, m, 0, a[0], a[1], o);
                    var f, d = t.g.p, u = e.g.c, y = 1;
                    for (f = 0; f < d; f += 1) e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * f + 1]), c.addColorStop(u[4 * f] / 100, "rgba(" + u[4 * f + 1] + "," + u[4 * f + 2] + "," + u[4 * f + 3] + "," + y + ")");
                    r.grd = c
                }
                r.coOp = e.o.v * i.opacity
            }, CVShapeElement.prototype.renderStroke = function (t, e, i) {
                var r = e.style, s = e.d;
                s && (s._mdf || this._isFirstFrame) && (r.da = s.dashArray, r.do = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (r.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || i._opMdf || this._isFirstFrame) && (r.coOp = e.o.v * i.opacity), (e.w._mdf || this._isFirstFrame) && (r.wi = e.w.v)
            }, CVShapeElement.prototype.destroy = function () {
                this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
            }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
                var t = this.canvasContext;
                t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
            }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = !1;
                t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
                var i = !1;
                t.sc && (i = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
                var r, s, a = this.globalData.fontManager.getFontByName(t.f), n = t.l, o = this.mHelper;
                this.stroke = i, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;
                var h, l, p, m, c, f, d, u, y, g, v = this.data.singleShape, x = t.tr / 1e3 * t.finalSize, k = 0, b = 0,
                    E = !0, S = 0;
                for (r = 0; r < s; r += 1) {
                    for (l = (h = this.globalData.fontManager.getCharData(t.finalText[r], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {}, o.reset(), v && n[r].n && (k = -x, b += t.yOffset, b += E ? 1 : 0, E = !1), d = (c = l.shapes ? l.shapes[0].it : []).length, o.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, o, n[r].line, k, b), y = createSizedArray(d), f = 0; f < d; f += 1) {
                        for (m = c[f].ks.k.i.length, u = c[f].ks.k, g = [], p = 1; p < m; p += 1) 1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
                        g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), y[f] = g
                    }
                    v && (k += n[r].l, k += x), this.textSpans[S] ? this.textSpans[S].elem = y : this.textSpans[S] = {elem: y}, S += 1
                }
            }, CVTextElement.prototype.renderInnerContent = function () {
                var t, e, i, r, s, a, n = this.canvasContext;
                this.finalTransform.mat.props;
                n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
                var o, h = this.textAnimator.renderedLetters, l = this.textProperty.currentData.l;
                e = l.length;
                var p, m, c = null, f = null, d = null;
                for (t = 0; t < e; t += 1) if (!l[t].n) {
                    if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
                        for (o && o.fc ? c !== o.fc && (c = o.fc, n.fillStyle = o.fc) : c !== this.values.fill && (c = this.values.fill, n.fillStyle = this.values.fill), r = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), i = 0; i < r; i += 1) for (a = (m = p[i]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
                        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
                    }
                    if (this.stroke) {
                        for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? f !== o.sc && (f = o.sc, n.strokeStyle = o.sc) : f !== this.values.stroke && (f = this.values.stroke, n.strokeStyle = this.values.stroke), r = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), i = 0; i < r; i += 1) for (a = (m = p[i]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
                        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
                    }
                    o && this.globalData.renderer.restore()
                }
            }, CVEffects.prototype.renderFrame = function () {
            }, HBaseElement.prototype = {
                checkBlendMode: function () {
                }, initRendererElement: function () {
                    this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement)
                }, createContainerElements: function () {
                    this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode()
                }, renderElement: function () {
                    this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()), this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v)
                }, renderFrame: function () {
                    this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
                }, destroy: function () {
                    this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
                }, createRenderableComponents: function () {
                    this.maskManager = new MaskElement(this.data, this, this.globalData)
                }, addEffects: function () {
                }, setMatte: function () {
                }
            }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
                var t;
                this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t)
            }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
                this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
            }, HCompElement.prototype.addTo3dContainer = function (t, e) {
                for (var i, r = 0; r < e;) this.elements[r] && this.elements[r].getBaseElement && (i = this.elements[r].getBaseElement()), r += 1;
                i ? this.layerElement.insertBefore(t, i) : this.layerElement.appendChild(t)
            }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
                var t;
                if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement; else {
                    t = createNS("svg");
                    var e = this.comp.data ? this.comp.data : this.globalData.compSize;
                    t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t)
                }
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t
            }, HShapeElement.prototype.getTransformedPoint = function (t, e) {
                var i, r = t.length;
                for (i = 0; i < r; i += 1) e = t[i].mProps.v.applyToPointArray(e[0], e[1], 0);
                return e
            }, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
                var i, r, s, a, n, o = t.sh.v, h = t.transformers, l = o._length;
                if (!(l <= 1)) {
                    for (i = 0; i < l - 1; i += 1) r = this.getTransformedPoint(h, o.v[i]), s = this.getTransformedPoint(h, o.o[i]), a = this.getTransformedPoint(h, o.i[i + 1]), n = this.getTransformedPoint(h, o.v[i + 1]), this.checkBounds(r, s, a, n, e);
                    o.c && (r = this.getTransformedPoint(h, o.v[i]), s = this.getTransformedPoint(h, o.o[i]), a = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(r, s, a, n, e))
                }
            }, HShapeElement.prototype.checkBounds = function (t, e, i, r, s) {
                this.getBoundsOfCurve(t, e, i, r);
                var a = this.shapeBoundingBox;
                s.x = bm_min(a.left, s.x), s.xMax = bm_max(a.right, s.xMax), s.y = bm_min(a.top, s.y), s.yMax = bm_max(a.bottom, s.yMax)
            }, HShapeElement.prototype.shapeBoundingBox = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, HShapeElement.prototype.tempBoundingBox = {
                x: 0,
                xMax: 0,
                y: 0,
                yMax: 0,
                width: 0,
                height: 0
            }, HShapeElement.prototype.getBoundsOfCurve = function (t, e, i, r) {
                for (var s, a, n, o, h, l, p, m = [[t[0], r[0]], [t[1], r[1]]], c = 0; c < 2; ++c) if (a = 6 * t[c] - 12 * e[c] + 6 * i[c], s = -3 * t[c] + 9 * e[c] - 9 * i[c] + 3 * r[c], n = 3 * e[c] - 3 * t[c], a |= 0, n |= 0, 0 !== (s |= 0)) (h = a * a - 4 * n * s) < 0 || (0 < (l = (-a + bm_sqrt(h)) / (2 * s)) && l < 1 && m[c].push(this.calculateF(l, t, e, i, r, c)), 0 < (p = (-a - bm_sqrt(h)) / (2 * s)) && p < 1 && m[c].push(this.calculateF(p, t, e, i, r, c))); else {
                    if (0 === a) continue;
                    0 < (o = -n / a) && o < 1 && m[c].push(this.calculateF(o, t, e, i, r, c))
                }
                this.shapeBoundingBox.left = bm_min.apply(null, m[0]), this.shapeBoundingBox.top = bm_min.apply(null, m[1]), this.shapeBoundingBox.right = bm_max.apply(null, m[0]), this.shapeBoundingBox.bottom = bm_max.apply(null, m[1])
            }, HShapeElement.prototype.calculateF = function (t, e, i, r, s, a) {
                return bm_pow(1 - t, 3) * e[a] + 3 * bm_pow(1 - t, 2) * t * i[a] + 3 * (1 - t) * bm_pow(t, 2) * r[a] + bm_pow(t, 3) * s[a]
            }, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
                var i, r = t.length;
                for (i = 0; i < r; i += 1) t[i] && t[i].sh ? this.calculateShapeBoundingBox(t[i], e) : t[i] && t[i].it && this.calculateBoundingBox(t[i].it, e)
            }, HShapeElement.prototype.currentBoxContains = function (t) {
                return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
            }, HShapeElement.prototype.renderInnerContent = function () {
                if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
                    var t = this.tempBoundingBox, e = 999999;
                    if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
                    var i = !1;
                    this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), i = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), i = !0), (i || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                }
            }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
                if (this.isMasked = this.checkMasks(), this.isMasked) {
                    this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
                    var t = createNS("g");
                    this.maskedElement.appendChild(t), this.innerElem = t
                } else this.renderType = "html", this.innerElem = this.layerElement;
                this.checkParenting()
            }, HTextElement.prototype.buildNewText = function () {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = this.innerElem.style;
                e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)", t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
                var i, r, s = this.globalData.fontManager.getFontByName(t.f);
                if (!this.globalData.fontManager.chars) if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", s.fClass) this.innerElem.className = s.fClass; else {
                    e.fontFamily = s.fFamily;
                    var a = t.fWeight, n = t.fStyle;
                    e.fontStyle = n, e.fontWeight = a
                }
                var o, h, l, p = t.l;
                r = p.length;
                var m, c = this.mHelper, f = "", d = 0;
                for (i = 0; i < r; i += 1) {
                    if (this.globalData.fontManager.chars ? (this.textPaths[d] ? o = this.textPaths[d] : ((o = createNS("path")).setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? l = (h = this.textSpans[d]).children[0] : (h = createTag("div"), (l = createNS("svg")).appendChild(o), styleDiv(h)))) : this.isMasked ? o = this.textPaths[d] ? this.textPaths[d] : createNS("text") : this.textSpans[d] ? (h = this.textSpans[d], o = this.textPaths[d]) : (styleDiv(h = createTag("span")), styleDiv(o = createTag("span")), h.appendChild(o)), this.globalData.fontManager.chars) {
                        var u,
                            y = this.globalData.fontManager.getCharData(t.finalText[i], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                        if (u = y ? y.data : null, c.reset(), u && u.shapes && (m = u.shapes[0].it, c.scale(t.finalSize / 100, t.finalSize / 100), f = this.createPathShape(c, m), o.setAttribute("d", f)), this.isMasked) this.innerElem.appendChild(o); else {
                            if (this.innerElem.appendChild(h), u && u.shapes) {
                                document.body.appendChild(l);
                                var g = l.getBBox();
                                l.setAttribute("width", g.width + 2), l.setAttribute("height", g.height + 2), l.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)), l.style.transform = l.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)", p[i].yOffset = g.y - 1
                            } else l.setAttribute("width", 1), l.setAttribute("height", 1);
                            h.appendChild(l)
                        }
                    } else o.textContent = p[i].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h), o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");
                    this.isMasked ? this.textSpans[d] = o : this.textSpans[d] = h, this.textSpans[d].style.display = "block", this.textPaths[d] = o, d += 1
                }
                for (; d < this.textSpans.length;) this.textSpans[d].style.display = "none", d += 1
            }, HTextElement.prototype.renderInnerContent = function () {
                if (this.data.singleShape) {
                    if (!this._isFirstFrame && !this.lettersChangedFlag) return;
                    this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
                }
                if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
                    var t, e, i, r, s, a = 0, n = this.textAnimator.renderedLetters,
                        o = this.textProperty.currentData.l;
                    for (e = o.length, t = 0; t < e; t += 1) o[t].n ? a += 1 : (r = this.textSpans[t], s = this.textPaths[t], i = n[a], a += 1, i._mdf.m && (this.isMasked ? r.setAttribute("transform", i.m) : r.style.transform = r.style.webkitTransform = i.m), r.style.opacity = i.o, i.sw && i._mdf.sw && s.setAttribute("stroke-width", i.sw), i.sc && i._mdf.sc && s.setAttribute("stroke", i.sc), i.fc && i._mdf.fc && (s.setAttribute("fill", i.fc), s.style.color = i.fc));
                    if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
                        var h = this.innerElem.getBBox();
                        this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.svgElement.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.svgElement.setAttribute("height", h.height));
                        this.currentBBox.w === h.width + 2 && this.currentBBox.h === h.height + 2 && this.currentBBox.x === h.x - 1 && this.currentBBox.y === h.y - 1 || (this.currentBBox.w = h.width + 2, this.currentBBox.h = h.height + 2, this.currentBBox.x = h.x - 1, this.currentBBox.y = h.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                    }
                }
            }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
                var t = this.globalData.getAssetsPath(this.assetData), e = new Image;
                this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
            }, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
                var t, e, i = this.comp.threeDElements.length;
                for (t = 0; t < i; t += 1) "3d" === (e = this.comp.threeDElements[t]).type && (e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)")
            }, HCameraElement.prototype.createElements = function () {
            }, HCameraElement.prototype.hide = function () {
            }, HCameraElement.prototype.renderFrame = function () {
                var t, e, i = this._isFirstFrame;
                if (this.hierarchy) for (e = this.hierarchy.length, t = 0; t < e; t += 1) i = this.hierarchy[t].finalTransform.mProp._mdf || i;
                if (i || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
                    if (this.mat.reset(), this.hierarchy) for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
                        var r = this.hierarchy[t].finalTransform.mProp;
                        this.mat.translate(-r.p.v[0], -r.p.v[1], r.p.v[2]), this.mat.rotateX(-r.or.v[0]).rotateY(-r.or.v[1]).rotateZ(r.or.v[2]), this.mat.rotateX(-r.rx.v).rotateY(-r.ry.v).rotateZ(r.rz.v), this.mat.scale(1 / r.s.v[0], 1 / r.s.v[1], 1 / r.s.v[2]), this.mat.translate(r.a.v[0], r.a.v[1], r.a.v[2])
                    }
                    if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
                        var s = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]],
                            a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
                            n = [s[0] / a, s[1] / a, s[2] / a], o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
                            h = Math.atan2(n[1], o), l = Math.atan2(n[0], -n[2]);
                        this.mat.rotateY(l).rotateX(-h)
                    }
                    this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
                    var p = !this._prevMat.equals(this.mat);
                    if ((p || this.pe._mdf) && this.comp.threeDElements) {
                        var m;
                        for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1) "3d" === (m = this.comp.threeDElements[t]).type && (p && (m.container.style.transform = m.container.style.webkitTransform = this.mat.toCSS()), this.pe._mdf && (m.perspectiveElem.style.perspective = m.perspectiveElem.style.webkitPerspective = this.pe.v + "px"));
                        this.mat.clone(this._prevMat)
                    }
                }
                this._isFirstFrame = !1
            }, HCameraElement.prototype.prepareFrame = function (t) {
                this.prepareProperties(t, !0)
            }, HCameraElement.prototype.destroy = function () {
            }, HCameraElement.prototype.getBaseElement = function () {
                return null
            }, HEffects.prototype.renderFrame = function () {
            };
            var animationManager = function () {
                var t = {}, e = [], i = 0, r = 0, s = 0, a = !0, n = !1;

                function o(t) {
                    for (var i = 0, s = t.target; i < r;) e[i].animation === s && (e.splice(i, 1), i -= 1, r -= 1, s.isPaused || p()), i += 1
                }

                function h(t, i) {
                    if (!t) return null;
                    for (var s = 0; s < r;) {
                        if (e[s].elem == t && null !== e[s].elem) return e[s].animation;
                        s += 1
                    }
                    var a = new AnimationItem;
                    return m(a, t), a.setData(t, i), a
                }

                function l() {
                    s += 1, d()
                }

                function p() {
                    s -= 1
                }

                function m(t, i) {
                    t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
                        elem: i,
                        animation: t
                    }), r += 1
                }

                function c(t) {
                    var o, h = t - i;
                    for (o = 0; o < r; o += 1) e[o].animation.advanceTime(h);
                    i = t, s && !n ? window.requestAnimationFrame(c) : a = !0
                }

                function f(t) {
                    i = t, window.requestAnimationFrame(c)
                }

                function d() {
                    !n && s && a && (window.requestAnimationFrame(f), a = !1)
                }

                return t.registerAnimation = h, t.loadAnimation = function (t) {
                    var e = new AnimationItem;
                    return m(e, null), e.setParams(t), e
                }, t.setSpeed = function (t, i) {
                    var s;
                    for (s = 0; s < r; s += 1) e[s].animation.setSpeed(t, i)
                }, t.setDirection = function (t, i) {
                    var s;
                    for (s = 0; s < r; s += 1) e[s].animation.setDirection(t, i)
                }, t.play = function (t) {
                    var i;
                    for (i = 0; i < r; i += 1) e[i].animation.play(t)
                }, t.pause = function (t) {
                    var i;
                    for (i = 0; i < r; i += 1) e[i].animation.pause(t)
                }, t.stop = function (t) {
                    var i;
                    for (i = 0; i < r; i += 1) e[i].animation.stop(t)
                }, t.togglePause = function (t) {
                    var i;
                    for (i = 0; i < r; i += 1) e[i].animation.togglePause(t)
                }, t.searchAnimations = function (t, e, i) {
                    var r,
                        s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
                        a = s.length;
                    for (r = 0; r < a; r += 1) i && s[r].setAttribute("data-bm-type", i), h(s[r], t);
                    if (e && 0 === a) {
                        i || (i = "svg");
                        var n = document.getElementsByTagName("body")[0];
                        n.innerHTML = "";
                        var o = createTag("div");
                        o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", i), n.appendChild(o), h(o, t)
                    }
                }, t.resize = function () {
                    var t;
                    for (t = 0; t < r; t += 1) e[t].animation.resize()
                }, t.goToAndStop = function (t, i, s) {
                    var a;
                    for (a = 0; a < r; a += 1) e[a].animation.goToAndStop(t, i, s)
                }, t.destroy = function (t) {
                    var i;
                    for (i = r - 1; i >= 0; i -= 1) e[i].animation.destroy(t)
                }, t.freeze = function () {
                    n = !0
                }, t.unfreeze = function () {
                    n = !1, d()
                }, t.getRegisteredAnimations = function () {
                    var t, i = e.length, r = [];
                    for (t = 0; t < i; t += 1) r.push(e[t].animation);
                    return r
                }, t
            }(), AnimationItem = function () {
                this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader
            };
            extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
                t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
                var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
                switch (e) {
                    case"canvas":
                        this.renderer = new CanvasRenderer(this, t.rendererSettings);
                        break;
                    case"svg":
                        this.renderer = new SVGRenderer(this, t.rendererSettings);
                        break;
                    default:
                        this.renderer = new HybridRenderer(this, t.rendererSettings)
                }
                this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && ("json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"), t.path += "data.json"), -1 != t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function () {
                    this.trigger("data_failed")
                }.bind(this)))
            }, AnimationItem.prototype.setData = function (t, e) {
                var i = {wrapper: t, animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null},
                    r = t.attributes;
                i.path = r.getNamedItem("data-animation-path") ? r.getNamedItem("data-animation-path").value : r.getNamedItem("data-bm-path") ? r.getNamedItem("data-bm-path").value : r.getNamedItem("bm-path") ? r.getNamedItem("bm-path").value : "", i.animType = r.getNamedItem("data-anim-type") ? r.getNamedItem("data-anim-type").value : r.getNamedItem("data-bm-type") ? r.getNamedItem("data-bm-type").value : r.getNamedItem("bm-type") ? r.getNamedItem("bm-type").value : r.getNamedItem("data-bm-renderer") ? r.getNamedItem("data-bm-renderer").value : r.getNamedItem("bm-renderer") ? r.getNamedItem("bm-renderer").value : "canvas";
                var s = r.getNamedItem("data-anim-loop") ? r.getNamedItem("data-anim-loop").value : r.getNamedItem("data-bm-loop") ? r.getNamedItem("data-bm-loop").value : r.getNamedItem("bm-loop") ? r.getNamedItem("bm-loop").value : "";
                "" === s || (i.loop = "false" !== s && ("true" === s || parseInt(s)));
                var a = r.getNamedItem("data-anim-autoplay") ? r.getNamedItem("data-anim-autoplay").value : r.getNamedItem("data-bm-autoplay") ? r.getNamedItem("data-bm-autoplay").value : !r.getNamedItem("bm-autoplay") || r.getNamedItem("bm-autoplay").value;
                i.autoplay = "false" !== a, i.name = r.getNamedItem("data-name") ? r.getNamedItem("data-name").value : r.getNamedItem("data-bm-name") ? r.getNamedItem("data-bm-name").value : r.getNamedItem("bm-name") ? r.getNamedItem("bm-name").value : "", "false" === (r.getNamedItem("data-anim-prerender") ? r.getNamedItem("data-anim-prerender").value : r.getNamedItem("data-bm-prerender") ? r.getNamedItem("data-bm-prerender").value : r.getNamedItem("bm-prerender") ? r.getNamedItem("bm-prerender").value : "") && (i.prerender = !1), this.setParams(i)
            }, AnimationItem.prototype.includeLayers = function (t) {
                t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
                var e, i, r = this.animationData.layers, s = r.length, a = t.layers, n = a.length;
                for (i = 0; i < n; i += 1) for (e = 0; e < s;) {
                    if (r[e].id == a[i].id) {
                        r[e] = a[i];
                        break
                    }
                    e += 1
                }
                if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (s = t.assets.length, e = 0; e < s; e += 1) this.animationData.assets.push(t.assets[e]);
                this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment()
            }, AnimationItem.prototype.loadNextSegment = function () {
                var t = this.animationData.segments;
                if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
                var e = t.shift();
                this.timeCompleted = e.time * this.frameRate;
                var i = this.path + this.fileName + "_" + this.segmentPos + ".json";
                this.segmentPos += 1, assetLoader.load(i, this.includeLayers.bind(this), function () {
                    this.trigger("data_failed")
                }.bind(this))
            }, AnimationItem.prototype.loadSegments = function () {
                this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
            }, AnimationItem.prototype.imagesLoaded = function () {
                this.trigger("loaded_images"), this.checkLoaded()
            }, AnimationItem.prototype.preloadImages = function () {
                this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
            }, AnimationItem.prototype.configAnimation = function (t) {
                this.renderer && (this.animationData = t, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.renderer.searchExtraCompositions(t.assets), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded())
            }, AnimationItem.prototype.waitForFontsLoaded = function () {
                this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
            }, AnimationItem.prototype.checkLoaded = function () {
                this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
                    this.trigger("DOMLoaded")
                }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play())
            }, AnimationItem.prototype.resize = function () {
                this.renderer.updateContainerSize()
            }, AnimationItem.prototype.setSubframe = function (t) {
                this.subframeEnabled = !!t
            }, AnimationItem.prototype.gotoFrame = function () {
                this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
            }, AnimationItem.prototype.renderFrame = function () {
                !1 !== this.isLoaded && this.renderer.renderFrame(this.currentFrame + this.firstFrame)
            }, AnimationItem.prototype.play = function (t) {
                t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")))
            }, AnimationItem.prototype.pause = function (t) {
                t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"))
            }, AnimationItem.prototype.togglePause = function (t) {
                t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
            }, AnimationItem.prototype.stop = function (t) {
                t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
            }, AnimationItem.prototype.goToAndStop = function (t, e, i) {
                i && this.name != i || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause())
            }, AnimationItem.prototype.goToAndPlay = function (t, e, i) {
                this.goToAndStop(t, e, i), this.play()
            }, AnimationItem.prototype.advanceTime = function (t) {
                if (!0 !== this.isPaused && !1 !== this.isLoaded) {
                    var e = this.currentRawFrame + t * this.frameModifier, i = !1;
                    e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (i = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (i = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), i && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"))
                }
            }, AnimationItem.prototype.adjustSegment = function (t, e) {
                this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
            }, AnimationItem.prototype.setSegment = function (t, e) {
                var i = -1;
                this.isPaused && (this.currentRawFrame + this.firstFrame < t ? i = t : this.currentRawFrame + this.firstFrame > e && (i = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== i && this.goToAndStop(i, !0)
            }, AnimationItem.prototype.playSegments = function (t, e) {
                if (e && (this.segments.length = 0), "object" == typeof t[0]) {
                    var i, r = t.length;
                    for (i = 0; i < r; i += 1) this.segments.push(t[i])
                } else this.segments.push(t);
                this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
            }, AnimationItem.prototype.resetSegments = function (t) {
                this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
            }, AnimationItem.prototype.checkSegments = function (t) {
                return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
            }, AnimationItem.prototype.destroy = function (t) {
                t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null)
            }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
                this.currentRawFrame = t, this.gotoFrame()
            }, AnimationItem.prototype.setSpeed = function (t) {
                this.playSpeed = t, this.updaFrameModifier()
            }, AnimationItem.prototype.setDirection = function (t) {
                this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
            }, AnimationItem.prototype.updaFrameModifier = function () {
                this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
            }, AnimationItem.prototype.getPath = function () {
                return this.path
            }, AnimationItem.prototype.getAssetsPath = function (t) {
                var e = "";
                if (t.e) e = t.p; else if (this.assetsPath) {
                    var i = t.p;
                    -1 !== i.indexOf("images/") && (i = i.split("/")[1]), e = this.assetsPath + i
                } else e = this.path, e += t.u ? t.u : "", e += t.p;
                return e
            }, AnimationItem.prototype.getAssetData = function (t) {
                for (var e = 0, i = this.assets.length; e < i;) {
                    if (t == this.assets[e].id) return this.assets[e];
                    e += 1
                }
            }, AnimationItem.prototype.hide = function () {
                this.renderer.hide()
            }, AnimationItem.prototype.show = function () {
                this.renderer.show()
            }, AnimationItem.prototype.getDuration = function (t) {
                return t ? this.totalFrames : this.totalFrames / this.frameRate
            }, AnimationItem.prototype.trigger = function (t) {
                if (this._cbs && this._cbs[t]) switch (t) {
                    case"enterFrame":
                        this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
                        break;
                    case"loopComplete":
                        this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                        break;
                    case"complete":
                        this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                        break;
                    case"segmentStart":
                        this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                        break;
                    case"destroy":
                        this.triggerEvent(t, new BMDestroyEvent(t, this));
                        break;
                    default:
                        this.triggerEvent(t)
                }
                "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
            };
            var Expressions = function () {
                var t = {};
                return t.initExpressions = function (t) {
                    var e = 0, i = [];
                    t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
                        e += 1
                    }, t.renderer.globalData.popExpression = function () {
                        0 == (e -= 1) && function () {
                            var t, e = i.length;
                            for (t = 0; t < e; t += 1) i[t].release();
                            i.length = 0
                        }()
                    }, t.renderer.globalData.registerExpressionProperty = function (t) {
                        -1 === i.indexOf(t) && i.push(t)
                    }
                }, t
            }();
            expressionsPlugin = Expressions;
            var ExpressionManager = function () {
                var ob = {}, Math = BMMath, window = null, document = null;

                function $bm_isInstanceOfArray(t) {
                    return t.constructor === Array || t.constructor === Float32Array
                }

                function isNumerable(t, e) {
                    return "number" === t || "boolean" === t || "string" === t || e instanceof Number
                }

                function $bm_neg(t) {
                    var e = typeof t;
                    if ("number" === e || "boolean" === e || t instanceof Number) return -t;
                    if ($bm_isInstanceOfArray(t)) {
                        var i, r = t.length, s = [];
                        for (i = 0; i < r; i += 1) s[i] = -t[i];
                        return s
                    }
                    return t.propType ? t.v : void 0
                }

                var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
                    easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
                    easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

                function sum(t, e) {
                    var i = typeof t, r = typeof e;
                    if ("string" === i || "string" === r) return t + e;
                    if (isNumerable(i, t) && isNumerable(r, e)) return t + e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(r, e)) return (t = t.slice(0))[0] = t[0] + e, t;
                    if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;
                    if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                        for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
                        return o
                    }
                    return 0
                }

                var add = sum;

                function sub(t, e) {
                    var i = typeof t, r = typeof e;
                    if (isNumerable(i, t) && isNumerable(r, e)) return "string" === i && (t = parseInt(t)), "string" === r && (e = parseInt(e)), t - e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(r, e)) return (t = t.slice(0))[0] = t[0] - e, t;
                    if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;
                    if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                        for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
                        return o
                    }
                    return 0
                }

                function mul(t, e) {
                    var i, r, s, a = typeof t, n = typeof e;
                    if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                        for (s = t.length, i = createTypedArray("float32", s), r = 0; r < s; r += 1) i[r] = t[r] * e;
                        return i
                    }
                    if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                        for (s = e.length, i = createTypedArray("float32", s), r = 0; r < s; r += 1) i[r] = t * e[r];
                        return i
                    }
                    return 0
                }

                function div(t, e) {
                    var i, r, s, a = typeof t, n = typeof e;
                    if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                        for (s = t.length, i = createTypedArray("float32", s), r = 0; r < s; r += 1) i[r] = t[r] / e;
                        return i
                    }
                    if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                        for (s = e.length, i = createTypedArray("float32", s), r = 0; r < s; r += 1) i[r] = t / e[r];
                        return i
                    }
                    return 0
                }

                function mod(t, e) {
                    return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e
                }

                var $bm_sum = sum, $bm_sub = sub, $bm_mul = mul, $bm_div = div, $bm_mod = mod;

                function clamp(t, e, i) {
                    if (e > i) {
                        var r = i;
                        i = e, e = r
                    }
                    return Math.min(Math.max(t, e), i)
                }

                function radiansToDegrees(t) {
                    return t / degToRads
                }

                var radians_to_degrees = radiansToDegrees;

                function degreesToRadians(t) {
                    return t * degToRads
                }

                var degrees_to_radians = radiansToDegrees, helperLengthArray = [0, 0, 0, 0, 0, 0];

                function length(t, e) {
                    if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
                    e || (e = helperLengthArray);
                    var i, r = Math.min(t.length, e.length), s = 0;
                    for (i = 0; i < r; i += 1) s += Math.pow(e[i] - t[i], 2);
                    return Math.sqrt(s)
                }

                function normalize(t) {
                    return div(t, length(t))
                }

                function rgbToHsl(t) {
                    var e, i, r = t[0], s = t[1], a = t[2], n = Math.max(r, s, a), o = Math.min(r, s, a),
                        h = (n + o) / 2;
                    if (n == o) e = i = 0; else {
                        var l = n - o;
                        switch (i = h > .5 ? l / (2 - n - o) : l / (n + o), n) {
                            case r:
                                e = (s - a) / l + (s < a ? 6 : 0);
                                break;
                            case s:
                                e = (a - r) / l + 2;
                                break;
                            case a:
                                e = (r - s) / l + 4
                        }
                        e /= 6
                    }
                    return [e, i, h, t[3]]
                }

                function hue2rgb(t, e, i) {
                    return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
                }

                function hslToRgb(t) {
                    var e, i, r, s = t[0], a = t[1], n = t[2];
                    if (0 === a) e = i = r = n; else {
                        var o = n < .5 ? n * (1 + a) : n + a - n * a, h = 2 * n - o;
                        e = hue2rgb(h, o, s + 1 / 3), i = hue2rgb(h, o, s), r = hue2rgb(h, o, s - 1 / 3)
                    }
                    return [e, i, r, t[3]]
                }

                function linear(t, e, i, r, s) {
                    if (void 0 !== r && void 0 !== s || (r = e, s = i, e = 0, i = 1), i < e) {
                        var a = i;
                        i = e, e = a
                    }
                    if (t <= e) return r;
                    if (t >= i) return s;
                    var n = i === e ? 0 : (t - e) / (i - e);
                    if (!r.length) return r + (s - r) * n;
                    var o, h = r.length, l = createTypedArray("float32", h);
                    for (o = 0; o < h; o += 1) l[o] = r[o] + (s[o] - r[o]) * n;
                    return l
                }

                function random(t, e) {
                    if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
                        var i, r = e.length;
                        t || (t = createTypedArray("float32", r));
                        var s = createTypedArray("float32", r), a = BMMath.random();
                        for (i = 0; i < r; i += 1) s[i] = t[i] + a * (e[i] - t[i]);
                        return s
                    }
                    return void 0 === t && (t = 0), t + BMMath.random() * (e - t)
                }

                function createPath(t, e, i, r) {
                    var s, a = t.length, n = shape_pool.newElement();
                    n.setPathData(!!r, a);
                    var o, h, l = [0, 0];
                    for (s = 0; s < a; s += 1) o = e && e[s] ? e[s] : l, h = i && i[s] ? i[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
                    return n
                }

                function initiateExpression(elem, data, property) {
                    var val = data.x, needsVelocity = /velocity(?![\w\d])/.test(val),
                        _needsRandom = -1 !== val.indexOf("random"), elemType = elem.data.ty, transform, $bm_transform,
                        content, effect, thisProperty = property;
                    thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
                        get: function () {
                            return thisProperty.v
                        }
                    }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
                    var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                        outPoint = elem.data.op / elem.comp.globalData.frameRate,
                        width = elem.data.sw ? elem.data.sw : 0, height = elem.data.sh ? elem.data.sh : 0,
                        name = elem.data.nm, loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp,
                        toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask,
                        valueAtTime, velocityAtTime, __expression_functions = [], scoped_bm_rt;
                    if (data.xf) {
                        var i, len = data.xf.length;
                        for (i = 0; i < len; i += 1) __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())")
                    }
                    var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
                        numKeys = property.kf ? data.k.length : 0, active = !this.data || !0 !== this.data.hd,
                        wiggle = function (t, e) {
                            var i, r, s = this.pv.length ? this.pv.length : 1, a = createTypedArray("float32", s);
                            var n = Math.floor(5 * time);
                            for (i = 0, r = 0; i < n;) {
                                for (r = 0; r < s; r += 1) a[r] += -e + 2 * e * BMMath.random();
                                i += 1
                            }
                            var o = 5 * time, h = o - Math.floor(o), l = createTypedArray("float32", s);
                            if (s > 1) {
                                for (r = 0; r < s; r += 1) l[r] = this.pv[r] + a[r] + (-e + 2 * e * BMMath.random()) * h;
                                return l
                            }
                            return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h
                        }.bind(this);

                    function loopInDuration(t, e) {
                        return loopIn(t, e, !0)
                    }

                    function loopOutDuration(t, e) {
                        return loopOut(t, e, !0)
                    }

                    thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
                    var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface), time,
                        velocity, value, text, textIndex, textTotal, selectorValue;

                    function lookAt(t, e) {
                        var i = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                            r = Math.atan2(i[0], Math.sqrt(i[1] * i[1] + i[2] * i[2])) / degToRads;
                        return [-Math.atan2(i[1], i[2]) / degToRads, r, 0]
                    }

                    function easeOut(t, e, i, r, s) {
                        return applyEase(easeOutBez, t, e, i, r, s)
                    }

                    function easeIn(t, e, i, r, s) {
                        return applyEase(easeInBez, t, e, i, r, s)
                    }

                    function ease(t, e, i, r, s) {
                        return applyEase(easeInOutBez, t, e, i, r, s)
                    }

                    function applyEase(t, e, i, r, s, a) {
                        void 0 === s ? (s = i, a = r) : e = (e - i) / (r - i);
                        var n = t(e = e > 1 ? 1 : e < 0 ? 0 : e);
                        if ($bm_isInstanceOfArray(s)) {
                            var o, h = s.length, l = createTypedArray("float32", h);
                            for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];
                            return l
                        }
                        return (a - s) * n + s
                    }

                    function nearestKey(t) {
                        var e, i, r, s = data.k.length;
                        if (data.k.length && "number" != typeof data.k[0]) if (i = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) i = 1, r = data.k[0].t; else {
                            for (e = 0; e < s - 1; e += 1) {
                                if (t === data.k[e].t) {
                                    i = e + 1, r = data.k[e].t;
                                    break
                                }
                                if (t > data.k[e].t && t < data.k[e + 1].t) {
                                    t - data.k[e].t > data.k[e + 1].t - t ? (i = e + 2, r = data.k[e + 1].t) : (i = e + 1, r = data.k[e].t);
                                    break
                                }
                            }
                            -1 === i && (i = e + 1, r = data.k[e].t)
                        } else i = 0, r = 0;
                        var a = {};
                        return a.index = i, a.time = r / elem.comp.globalData.frameRate, a
                    }

                    function key(t) {
                        var e, i, r, s;
                        if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
                        for (t -= 1, e = {
                            time: data.k[t].t / elem.comp.globalData.frameRate,
                            value: []
                        }, r = (s = t !== data.k.length - 1 || data.k[t].h ? data.k[t].s : data.k[t].s || 0 === data.k[t].s ? data.k[t - 1].s : data.k[t].e).length, i = 0; i < r; i += 1) e[i] = s[i], e.value[i] = s[i];
                        return e
                    }

                    function framesToTime(t, e) {
                        return e || (e = elem.comp.globalData.frameRate), t / e
                    }

                    function timeToFrames(t, e) {
                        return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e
                    }

                    function seedRandom(t) {
                        BMMath.seedrandom(randSeed + t)
                    }

                    function sourceRectAtTime() {
                        return elem.sourceRectAtTime()
                    }

                    function substring(t, e) {
                        return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : ""
                    }

                    function substr(t, e) {
                        return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : ""
                    }

                    var index = elem.data.ind, hasParent = !(!elem.hierarchy || !elem.hierarchy.length), parent,
                        randSeed = Math.floor(1e6 * Math.random()), globalData = elem.globalData;

                    function executeExpression(t) {
                        return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt)
                    }

                    return executeExpression
                }

                return ob.initiateExpression = initiateExpression, ob
            }(), expressionHelpers = function () {
                return {
                    searchExpressions: function (t, e, i) {
                        e.x && (i.k = !0, i.x = !0, i.initiateExpression = ExpressionManager.initiateExpression, i.effectsSequence.push(i.initiateExpression(t, e, i).bind(i)))
                    }, getSpeedAtTime: function (t) {
                        var e = this.getValueAtTime(t), i = this.getValueAtTime(t + -.01), r = 0;
                        if (e.length) {
                            var s;
                            for (s = 0; s < e.length; s += 1) r += Math.pow(i[s] - e[s], 2);
                            r = 100 * Math.sqrt(r)
                        } else r = 0;
                        return r
                    }, getVelocityAtTime: function (t) {
                        if (void 0 !== this.vel) return this.vel;
                        var e, i, r = this.getValueAtTime(t), s = this.getValueAtTime(t + -.001);
                        if (r.length) for (e = createTypedArray("float32", r.length), i = 0; i < r.length; i += 1) e[i] = (s[i] - r[i]) / -.001; else e = (s - r) / -.001;
                        return e
                    }, getValueAtTime: function (t) {
                        return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value
                    }, getStaticValueAtTime: function () {
                        return this.pv
                    }, setGroupProperty: function (t) {
                        this.propertyGroup = t
                    }
                }
            }();
            !function () {
                function t(t, e, i) {
                    if (!this.k || !this.keyframes) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var r, s, a, n, o, h = this.comp.renderedFrame, l = this.keyframes, p = l[l.length - 1].t;
                    if (h <= p) return this.pv;
                    if (i ? s = p - (r = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), r = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
                        if (Math.floor((h - s) / r) % 2 != 0) return this.getValueAtTime((r - (h - s) % r + s) / this.comp.globalData.frameRate, 0)
                    } else {
                        if ("offset" === t) {
                            var m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                                c = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                f = this.getValueAtTime(((h - s) % r + s) / this.comp.globalData.frameRate, 0),
                                d = Math.floor((h - s) / r);
                            if (this.pv.length) {
                                for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = (c[a] - m[a]) * d + f[a];
                                return o
                            }
                            return (c - m) * d + f
                        }
                        if ("continue" === t) {
                            var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                                return o
                            }
                            return u + (h - p) / .001 * (u - y)
                        }
                    }
                    return this.getValueAtTime(((h - s) % r + s) / this.comp.globalData.frameRate, 0)
                }

                function e(t, e, i) {
                    if (!this.k) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var r, s, a, n, o, h = this.comp.renderedFrame, l = this.keyframes, p = l[0].t;
                    if (h >= p) return this.pv;
                    if (i ? s = p + (r = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), r = (s = l[e].t) - p), "pingpong" === t) {
                        if (Math.floor((p - h) / r) % 2 == 0) return this.getValueAtTime(((p - h) % r + p) / this.comp.globalData.frameRate, 0)
                    } else {
                        if ("offset" === t) {
                            var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                c = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                                f = this.getValueAtTime((r - (p - h) % r + p) / this.comp.globalData.frameRate, 0),
                                d = Math.floor((p - h) / r) + 1;
                            if (this.pv.length) {
                                for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = f[a] - (c[a] - m[a]) * d;
                                return o
                            }
                            return f - (c - m) * d
                        }
                        if ("continue" === t) {
                            var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
                                return o
                            }
                            return u + (u - y) * (p - h) / .001
                        }
                    }
                    return this.getValueAtTime((r - (p - h) % r + p) / this.comp.globalData.frameRate, 0)
                }

                function i(t, e) {
                    if (!this.k) return this.pv;
                    if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
                    var i, r, s = this.comp.renderedFrame / this.comp.globalData.frameRate, a = s - t,
                        n = e > 1 ? (s + t - a) / (e - 1) : 1, o = 0, h = 0;
                    for (i = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
                        if (r = this.getValueAtTime(a + o * n), this.pv.length) for (h = 0; h < this.pv.length; h += 1) i[h] += r[h]; else i += r;
                        o += 1
                    }
                    if (this.pv.length) for (h = 0; h < this.pv.length; h += 1) i[h] /= e; else i /= e;
                    return i
                }

                var r = TransformPropertyFactory.getTransformProperty;
                TransformPropertyFactory.getTransformProperty = function (t, e, i) {
                    var s = r(t, e, i);
                    return s.dynamicProperties.length ? s.getValueAtTime = function (t) {
                        console.warn("Transform at time not supported")
                    }.bind(s) : s.getValueAtTime = function (t) {
                    }.bind(s), s.setGroupProperty = expressionHelpers.setGroupProperty, s
                };
                var s = PropertyFactory.getProp;
                PropertyFactory.getProp = function (r, a, n, o, h) {
                    var l = s(r, a, n, o, h);
                    l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l), l.setGroupProperty = expressionHelpers.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = i, l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l), l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l), l.numKeys = 1 === a.a ? a.k.length : 0, l.propertyIndex = a.ix;
                    var p = 0;
                    return 0 !== n && (p = createTypedArray("float32", 1 === a.a ? a.k[0].s.length : a.k.length)), l._cachingAtTime = {
                        lastFrame: initialDefaultFrame,
                        lastIndex: 0,
                        value: p
                    }, expressionHelpers.searchExpressions(r, a, l), l.k && h.addDynamicProperty(l), l
                };
                var a = ShapePropertyFactory.getConstructorFunction(),
                    n = ShapePropertyFactory.getKeyframedConstructorFunction();

                function o() {
                }

                o.prototype = {
                    vertices: function (t, e) {
                        this.k && this.getValue();
                        var i = this.v;
                        void 0 !== e && (i = this.getValueAtTime(e, 0));
                        var r, s = i._length, a = i[t], n = i.v, o = createSizedArray(s);
                        for (r = 0; r < s; r += 1) o[r] = "i" === t || "o" === t ? [a[r][0] - n[r][0], a[r][1] - n[r][1]] : [a[r][0], a[r][1]];
                        return o
                    },
                    points: function (t) {
                        return this.vertices("v", t)
                    },
                    inTangents: function (t) {
                        return this.vertices("i", t)
                    },
                    outTangents: function (t) {
                        return this.vertices("o", t)
                    },
                    isClosed: function () {
                        return this.v.c
                    },
                    pointOnPath: function (t, e) {
                        var i = this.v;
                        void 0 !== e && (i = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(i));
                        for (var r, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
                            if (l + a[o].addedLength > n) {
                                var p = o, m = i.c && o === h - 1 ? 0 : o + 1, c = (n - l) / a[o].addedLength;
                                r = bez.getPointInSegment(i.v[p], i.v[m], i.o[p], i.i[m], c, a[o]);
                                break
                            }
                            l += a[o].addedLength, o += 1
                        }
                        return r || (r = i.c ? [i.v[0][0], i.v[0][1]] : [i.v[i._length - 1][0], i.v[i._length - 1][1]]), r
                    },
                    vectorOnPath: function (t, e, i) {
                        t = 1 == t ? this.v.c ? 0 : .999 : t;
                        var r = this.pointOnPath(t, e), s = this.pointOnPath(t + .001, e), a = s[0] - r[0],
                            n = s[1] - r[1], o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
                        return "tangent" === i ? [a / o, n / o] : [-n / o, a / o]
                    },
                    tangentOnPath: function (t, e) {
                        return this.vectorOnPath(t, e, "tangent")
                    },
                    normalOnPath: function (t, e) {
                        return this.vectorOnPath(t, e, "normal")
                    },
                    setGroupProperty: expressionHelpers.setGroupProperty,
                    getValueAtTime: expressionHelpers.getStaticValueAtTime
                }, extendPrototype([o], a), extendPrototype([o], n), n.prototype.getValueAtTime = function (t) {
                    return this._cachingAtTime || (this._cachingAtTime = {
                        shapeValue: shape_pool.clone(this.pv),
                        lastIndex: 0,
                        lastTime: initialDefaultFrame
                    }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue
                }, n.prototype.initiateExpression = ExpressionManager.initiateExpression;
                var h = ShapePropertyFactory.getShapeProp;
                ShapePropertyFactory.getShapeProp = function (t, e, i, r, s) {
                    var a = h(t, e, i, r, s);
                    return a.propertyIndex = e.ix, a.lock = !1, 3 === i ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === i && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a
                }
            }(), function () {
                TextProperty.prototype.getExpressionValue = function (t, e) {
                    var i = this.calculateExpression(e);
                    if (t.t !== i) {
                        var r = {};
                        return this.copyData(r, t), r.t = i.toString(), r.__complete = !1, r
                    }
                    return t
                }, TextProperty.prototype.searchProperty = function () {
                    var t = this.searchKeyframes(), e = this.searchExpressions();
                    return this.kf = t || e, this.kf
                }, TextProperty.prototype.searchExpressions = function () {
                    if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0
                }
            }();
            var ShapeExpressionInterface = function () {
                function t(t, m, c) {
                    var f, d = [], u = t ? t.length : 0;
                    for (f = 0; f < u; f += 1) "gr" == t[f].ty ? d.push(e(t[f], m[f], c)) : "fl" == t[f].ty ? d.push(i(t[f], m[f], c)) : "st" == t[f].ty ? d.push(r(t[f], m[f], c)) : "tm" == t[f].ty ? d.push(s(t[f], m[f], c)) : "tr" == t[f].ty || ("el" == t[f].ty ? d.push(a(t[f], m[f], c)) : "sr" == t[f].ty ? d.push(n(t[f], m[f], c)) : "sh" == t[f].ty ? d.push(p(t[f], m[f], c)) : "rc" == t[f].ty ? d.push(o(t[f], m[f], c)) : "rd" == t[f].ty ? d.push(h(t[f], m[f], c)) : "rp" == t[f].ty && d.push(l(t[f], m[f], c)));
                    return d
                }

                function e(e, i, r) {
                    var s = function (t) {
                        switch (t) {
                            case"ADBE Vectors Group":
                            case"Contents":
                            case 2:
                                return s.content;
                            default:
                                return s.transform
                        }
                    };
                    s.propertyGroup = function (t) {
                        return 1 === t ? s : r(t - 1)
                    };
                    var a = function (e, i, r) {
                        var s, a = function (t) {
                            for (var e = 0, i = s.length; e < i;) {
                                if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];
                                e += 1
                            }
                            if ("number" == typeof t) return s[t - 1]
                        };
                        return a.propertyGroup = function (t) {
                            return 1 === t ? a : r(t - 1)
                        }, s = t(e.it, i.it, a.propertyGroup), a.numProperties = s.length, a.propertyIndex = e.cix, a._name = e.nm, a
                    }(e, i, s.propertyGroup), n = function (t, e, i) {
                        function r(t) {
                            return 1 == t ? s : i(--t)
                        }

                        e.transform.mProps.o.setGroupProperty(r), e.transform.mProps.p.setGroupProperty(r), e.transform.mProps.a.setGroupProperty(r), e.transform.mProps.s.setGroupProperty(r), e.transform.mProps.r.setGroupProperty(r), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(r), e.transform.mProps.sa.setGroupProperty(r));

                        function s(e) {
                            return t.a.ix === e || "Anchor Point" === e ? s.anchorPoint : t.o.ix === e || "Opacity" === e ? s.opacity : t.p.ix === e || "Position" === e ? s.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? s.rotation : t.s.ix === e || "Scale" === e ? s.scale : t.sk && t.sk.ix === e || "Skew" === e ? s.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? s.skewAxis : void 0
                        }

                        return e.transform.op.setGroupProperty(r), Object.defineProperties(s, {
                            opacity: {get: ExpressionPropertyInterface(e.transform.mProps.o)},
                            position: {get: ExpressionPropertyInterface(e.transform.mProps.p)},
                            anchorPoint: {get: ExpressionPropertyInterface(e.transform.mProps.a)},
                            scale: {get: ExpressionPropertyInterface(e.transform.mProps.s)},
                            rotation: {get: ExpressionPropertyInterface(e.transform.mProps.r)},
                            skew: {get: ExpressionPropertyInterface(e.transform.mProps.sk)},
                            skewAxis: {get: ExpressionPropertyInterface(e.transform.mProps.sa)},
                            _name: {value: t.nm}
                        }), s.ty = "tr", s.mn = t.mn, s.propertyGroup = i, s
                    }(e.it[e.it.length - 1], i.it[i.it.length - 1], s.propertyGroup);
                    return s.content = a, s.transform = n, Object.defineProperty(s, "_name", {
                        get: function () {
                            return e.nm
                        }
                    }), s.numProperties = e.np, s.propertyIndex = e.ix, s.nm = e.nm, s.mn = e.mn, s
                }

                function i(t, e, i) {
                    function r(t) {
                        return "Color" === t || "color" === t ? r.color : "Opacity" === t || "opacity" === t ? r.opacity : void 0
                    }

                    return Object.defineProperties(r, {
                        color: {get: ExpressionPropertyInterface(e.c)},
                        opacity: {get: ExpressionPropertyInterface(e.o)},
                        _name: {value: t.nm},
                        mn: {value: t.mn}
                    }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), r
                }

                function r(t, e, i) {
                    function r(t) {
                        return 1 === t ? ob : i(t - 1)
                    }

                    function s(t) {
                        return 1 === t ? h : r(t - 1)
                    }

                    function a(i) {
                        Object.defineProperty(h, t.d[i].nm, {get: ExpressionPropertyInterface(e.d.dataProps[i].p)})
                    }

                    var n, o = t.d ? t.d.length : 0, h = {};
                    for (n = 0; n < o; n += 1) a(n), e.d.dataProps[n].p.setGroupProperty(s);

                    function l(t) {
                        return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0
                    }

                    return Object.defineProperties(l, {
                        color: {get: ExpressionPropertyInterface(e.c)},
                        opacity: {get: ExpressionPropertyInterface(e.o)},
                        strokeWidth: {get: ExpressionPropertyInterface(e.w)},
                        dash: {
                            get: function () {
                                return h
                            }
                        },
                        _name: {value: t.nm},
                        mn: {value: t.mn}
                    }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), e.w.setGroupProperty(r), l
                }

                function s(t, e, i) {
                    function r(t) {
                        return 1 == t ? s : i(--t)
                    }

                    function s(e) {
                        return e === t.e.ix || "End" === e || "end" === e ? s.end : e === t.s.ix ? s.start : e === t.o.ix ? s.offset : void 0
                    }

                    return s.propertyIndex = t.ix, e.s.setGroupProperty(r), e.e.setGroupProperty(r), e.o.setGroupProperty(r), s.propertyIndex = t.ix, s.propertyGroup = i, Object.defineProperties(s, {
                        start: {get: ExpressionPropertyInterface(e.s)},
                        end: {get: ExpressionPropertyInterface(e.e)},
                        offset: {get: ExpressionPropertyInterface(e.o)},
                        _name: {value: t.nm}
                    }), s.mn = t.mn, s
                }

                function a(t, e, i) {
                    function r(t) {
                        return 1 == t ? a : i(--t)
                    }

                    a.propertyIndex = t.ix;
                    var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

                    function a(e) {
                        return t.p.ix === e ? a.position : t.s.ix === e ? a.size : void 0
                    }

                    return s.s.setGroupProperty(r), s.p.setGroupProperty(r), Object.defineProperties(a, {
                        size: {get: ExpressionPropertyInterface(s.s)},
                        position: {get: ExpressionPropertyInterface(s.p)},
                        _name: {value: t.nm}
                    }), a.mn = t.mn, a
                }

                function n(t, e, i) {
                    function r(t) {
                        return 1 == t ? a : i(--t)
                    }

                    var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

                    function a(e) {
                        return t.p.ix === e ? a.position : t.r.ix === e ? a.rotation : t.pt.ix === e ? a.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? a.outerRadius : t.os.ix === e ? a.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? a.innerRoundness : void 0 : a.innerRadius
                    }

                    return a.propertyIndex = t.ix, s.or.setGroupProperty(r), s.os.setGroupProperty(r), s.pt.setGroupProperty(r), s.p.setGroupProperty(r), s.r.setGroupProperty(r), t.ir && (s.ir.setGroupProperty(r), s.is.setGroupProperty(r)), Object.defineProperties(a, {
                        position: {get: ExpressionPropertyInterface(s.p)},
                        rotation: {get: ExpressionPropertyInterface(s.r)},
                        points: {get: ExpressionPropertyInterface(s.pt)},
                        outerRadius: {get: ExpressionPropertyInterface(s.or)},
                        outerRoundness: {get: ExpressionPropertyInterface(s.os)},
                        innerRadius: {get: ExpressionPropertyInterface(s.ir)},
                        innerRoundness: {get: ExpressionPropertyInterface(s.is)},
                        _name: {value: t.nm}
                    }), a.mn = t.mn, a
                }

                function o(t, e, i) {
                    function r(t) {
                        return 1 == t ? a : i(--t)
                    }

                    var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

                    function a(e) {
                        return t.p.ix === e ? a.position : t.r.ix === e ? a.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? a.size : void 0
                    }

                    return a.propertyIndex = t.ix, s.p.setGroupProperty(r), s.s.setGroupProperty(r), s.r.setGroupProperty(r), Object.defineProperties(a, {
                        position: {get: ExpressionPropertyInterface(s.p)},
                        roundness: {get: ExpressionPropertyInterface(s.r)},
                        size: {get: ExpressionPropertyInterface(s.s)},
                        _name: {value: t.nm}
                    }), a.mn = t.mn, a
                }

                function h(t, e, i) {
                    var r = e;

                    function s(e) {
                        if (t.r.ix === e || "Round Corners 1" === e) return s.radius
                    }

                    return s.propertyIndex = t.ix, r.rd.setGroupProperty(function (t) {
                        return 1 == t ? s : i(--t)
                    }), Object.defineProperties(s, {
                        radius: {get: ExpressionPropertyInterface(r.rd)},
                        _name: {value: t.nm}
                    }), s.mn = t.mn, s
                }

                function l(t, e, i) {
                    function r(t) {
                        return 1 == t ? a : i(--t)
                    }

                    var s = e;

                    function a(e) {
                        return t.c.ix === e || "Copies" === e ? a.copies : t.o.ix === e || "Offset" === e ? a.offset : void 0
                    }

                    return a.propertyIndex = t.ix, s.c.setGroupProperty(r), s.o.setGroupProperty(r), Object.defineProperties(a, {
                        copies: {get: ExpressionPropertyInterface(s.c)},
                        offset: {get: ExpressionPropertyInterface(s.o)},
                        _name: {value: t.nm}
                    }), a.mn = t.mn, a
                }

                function p(t, e, i) {
                    var r = e.sh;

                    function s(t) {
                        if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return s.path
                    }

                    return r.setGroupProperty(function (t) {
                        return 1 == t ? s : i(--t)
                    }), Object.defineProperties(s, {
                        path: {
                            get: function () {
                                return r.k && r.getValue(), r
                            }
                        }, shape: {
                            get: function () {
                                return r.k && r.getValue(), r
                            }
                        }, _name: {value: t.nm}, ix: {value: t.ix}, mn: {value: t.mn}
                    }), s
                }

                return function (e, i, r) {
                    var s;

                    function a(t) {
                        if ("number" == typeof t) return s[t - 1];
                        for (var e = 0, i = s.length; e < i;) {
                            if (s[e]._name === t) return s[e];
                            e += 1
                        }
                    }

                    return a.propertyGroup = r, s = t(e, i, a), a.numProperties = s.length, a
                }
            }(), TextExpressionInterface = function (t) {
                var e;

                function i() {
                }

                return Object.defineProperty(i, "sourceText", {
                    get: function () {
                        t.textProperty.getValue();
                        var i = t.textProperty.currentData.t;
                        return void 0 !== i && (t.textProperty.currentData.t = void 0, (e = new String(i)).value = i || new String(i)), e
                    }
                }), i
            }, LayerExpressionInterface = function () {
                function t(t, e) {
                    var i = new Matrix;
                    if (i.reset(), this._elem.finalTransform.mProp.applyToMatrix(i), this._elem.hierarchy && this._elem.hierarchy.length) {
                        var r, s = this._elem.hierarchy.length;
                        for (r = 0; r < s; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(i);
                        return i.applyToPointArray(t[0], t[1], t[2] || 0)
                    }
                    return i.applyToPointArray(t[0], t[1], t[2] || 0)
                }

                function e(t, e) {
                    var i = new Matrix;
                    if (i.reset(), this._elem.finalTransform.mProp.applyToMatrix(i), this._elem.hierarchy && this._elem.hierarchy.length) {
                        var r, s = this._elem.hierarchy.length;
                        for (r = 0; r < s; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(i);
                        return i.inversePoint(t)
                    }
                    return i.inversePoint(t)
                }

                function i(t) {
                    var e = new Matrix;
                    if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
                        var i, r = this._elem.hierarchy.length;
                        for (i = 0; i < r; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(e);
                        return e.inversePoint(t)
                    }
                    return e.inversePoint(t)
                }

                function r() {
                    return [1, 1, 1, 1]
                }

                return function (s) {
                    var a;

                    function n(t) {
                        switch (t) {
                            case"ADBE Root Vectors Group":
                            case"Contents":
                            case 2:
                                return n.shapeInterface;
                            case 1:
                            case 6:
                            case"Transform":
                            case"transform":
                            case"ADBE Transform Group":
                                return a;
                            case 4:
                            case"ADBE Effect Parade":
                            case"effects":
                            case"Effects":
                                return n.effect
                        }
                    }

                    n.toWorld = t, n.fromWorld = e, n.toComp = t, n.fromComp = i, n.sampleImage = r, n.sourceRectAtTime = s.sourceRectAtTime.bind(s), n._elem = s;
                    var o = getDescriptor(a = TransformExpressionInterface(s.finalTransform.mProp), "anchorPoint");
                    return Object.defineProperties(n, {
                        hasParent: {
                            get: function () {
                                return s.hierarchy.length
                            }
                        },
                        parent: {
                            get: function () {
                                return s.hierarchy[0].layerInterface
                            }
                        },
                        rotation: getDescriptor(a, "rotation"),
                        scale: getDescriptor(a, "scale"),
                        position: getDescriptor(a, "position"),
                        opacity: getDescriptor(a, "opacity"),
                        anchorPoint: o,
                        anchor_point: o,
                        transform: {
                            get: function () {
                                return a
                            }
                        },
                        active: {
                            get: function () {
                                return s.isInRange
                            }
                        }
                    }), n.startTime = s.data.st, n.index = s.data.ind, n.source = s.data.refId, n.height = 0 === s.data.ty ? s.data.h : 100, n.width = 0 === s.data.ty ? s.data.w : 100, n.inPoint = s.data.ip / s.comp.globalData.frameRate, n.outPoint = s.data.op / s.comp.globalData.frameRate, n._name = s.data.nm, n.registerMaskInterface = function (t) {
                        n.mask = new MaskManagerInterface(t, s)
                    }, n.registerEffectsInterface = function (t) {
                        n.effect = t
                    }, n
                }
            }(), CompExpressionInterface = function (t) {
                function e(e) {
                    for (var i = 0, r = t.layers.length; i < r;) {
                        if (t.layers[i].nm === e || t.layers[i].ind === e) return t.elements[i].layerInterface;
                        i += 1
                    }
                    return null
                }

                return Object.defineProperty(e, "_name", {value: t.data.nm}), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e
            }, TransformExpressionInterface = function (t) {
                function e(t) {
                    switch (t) {
                        case"scale":
                        case"Scale":
                        case"ADBE Scale":
                        case 6:
                            return e.scale;
                        case"rotation":
                        case"Rotation":
                        case"ADBE Rotation":
                        case"ADBE Rotate Z":
                        case 10:
                            return e.rotation;
                        case"ADBE Rotate X":
                            return e.xRotation;
                        case"ADBE Rotate Y":
                            return e.yRotation;
                        case"position":
                        case"Position":
                        case"ADBE Position":
                        case 2:
                            return e.position;
                        case"ADBE Position_0":
                            return e.xPosition;
                        case"ADBE Position_1":
                            return e.yPosition;
                        case"ADBE Position_2":
                            return e.zPosition;
                        case"anchorPoint":
                        case"AnchorPoint":
                        case"Anchor Point":
                        case"ADBE AnchorPoint":
                        case 1:
                            return e.anchorPoint;
                        case"opacity":
                        case"Opacity":
                        case 11:
                            return e.opacity
                    }
                }

                if (Object.defineProperty(e, "rotation", {get: ExpressionPropertyInterface(t.r || t.rz)}), Object.defineProperty(e, "zRotation", {get: ExpressionPropertyInterface(t.rz || t.r)}), Object.defineProperty(e, "xRotation", {get: ExpressionPropertyInterface(t.rx)}), Object.defineProperty(e, "yRotation", {get: ExpressionPropertyInterface(t.ry)}), Object.defineProperty(e, "scale", {get: ExpressionPropertyInterface(t.s)}), t.p) var i = ExpressionPropertyInterface(t.p);
                return Object.defineProperty(e, "position", {
                    get: function () {
                        return t.p ? i() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0]
                    }
                }), Object.defineProperty(e, "xPosition", {get: ExpressionPropertyInterface(t.px)}), Object.defineProperty(e, "yPosition", {get: ExpressionPropertyInterface(t.py)}), Object.defineProperty(e, "zPosition", {get: ExpressionPropertyInterface(t.pz)}), Object.defineProperty(e, "anchorPoint", {get: ExpressionPropertyInterface(t.a)}), Object.defineProperty(e, "opacity", {get: ExpressionPropertyInterface(t.o)}), Object.defineProperty(e, "skew", {get: ExpressionPropertyInterface(t.sk)}), Object.defineProperty(e, "skewAxis", {get: ExpressionPropertyInterface(t.sa)}), Object.defineProperty(e, "orientation", {get: ExpressionPropertyInterface(t.or)}), e
            }, ProjectInterface = function () {
                function t(t) {
                    this.compositions.push(t)
                }

                return function () {
                    function e(t) {
                        for (var e = 0, i = this.compositions.length; e < i;) {
                            if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
                            e += 1
                        }
                    }

                    return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e
                }
            }(), EffectsExpressionInterface = function () {
                function t(i, r, s, a) {
                    var n, o = [], h = i.ef.length;
                    for (n = 0; n < h; n += 1) 5 === i.ef[n].ty ? o.push(t(i.ef[n], r.effectElements[n], r.effectElements[n].propertyGroup, a)) : o.push(e(r.effectElements[n], i.ef[n].ty, a, l));

                    function l(t) {
                        return 1 === t ? p : s(t - 1)
                    }

                    var p = function (t) {
                        for (var e = i.ef, r = 0, s = e.length; r < s;) {
                            if (t === e[r].nm || t === e[r].mn || t === e[r].ix) return 5 === e[r].ty ? o[r] : o[r]();
                            r += 1
                        }
                        return o[0]()
                    };
                    return p.propertyGroup = l, "ADBE Color Control" === i.mn && Object.defineProperty(p, "color", {
                        get: function () {
                            return o[0]()
                        }
                    }), Object.defineProperty(p, "numProperties", {
                        get: function () {
                            return i.np
                        }
                    }), p.active = p.enabled = 0 !== i.en, p
                }

                function e(t, e, i, r) {
                    var s = ExpressionPropertyInterface(t.p);
                    return t.p.setGroupProperty && t.p.setGroupProperty(r), function () {
                        return 10 === e ? i.comp.compInterface(t.p.v) : s()
                    }
                }

                return {
                    createEffectsInterface: function (e, i) {
                        if (e.effectsManager) {
                            var r, s = [], a = e.data.ef, n = e.effectsManager.effectElements.length;
                            for (r = 0; r < n; r += 1) s.push(t(a[r], e.effectsManager.effectElements[r], i, e));
                            return function (t) {
                                for (var i = e.data.ef || [], r = 0, a = i.length; r < a;) {
                                    if (t === i[r].nm || t === i[r].mn || t === i[r].ix) return s[r];
                                    r += 1
                                }
                            }
                        }
                    }
                }
            }(), MaskManagerInterface = function () {
                function t(t, e) {
                    this._mask = t, this._data = e
                }

                Object.defineProperty(t.prototype, "maskPath", {
                    get: function () {
                        return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
                    }
                });
                return function (e, i) {
                    var r, s = createSizedArray(e.viewData.length), a = e.viewData.length;
                    for (r = 0; r < a; r += 1) s[r] = new t(e.viewData[r], e.masksProperties[r]);
                    return function (t) {
                        for (r = 0; r < a;) {
                            if (e.masksProperties[r].nm === t) return s[r];
                            r += 1
                        }
                    }
                }
            }(), ExpressionPropertyInterface = function () {
                var t = {pv: 0, v: 0, mult: 1}, e = {pv: [0, 0, 0], v: [0, 0, 0], mult: 1};

                function i(t, e, i) {
                    Object.defineProperty(t, "velocity", {
                        get: function () {
                            return e.getVelocityAtTime(e.comp.currentFrame)
                        }
                    }), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function (r) {
                        if (t.numKeys) {
                            var s = "";
                            s = "s" in e.keyframes[r - 1] ? e.keyframes[r - 1].s : "e" in e.keyframes[r - 2] ? e.keyframes[r - 2].e : e.keyframes[r - 2].s;
                            var a = "unidimensional" === i ? new Number(s) : Object.assign({}, s);
                            return a.time = e.keyframes[r - 1].t / e.elem.comp.globalData.frameRate, a
                        }
                        return 0
                    }, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup
                }

                function r() {
                    return t
                }

                return function (s) {
                    return s ? "unidimensional" === s.propType ? function (e) {
                        e && "pv" in e || (e = t);
                        var r = 1 / e.mult, s = e.pv * r, a = new Number(s);
                        return a.value = s, i(a, e, "unidimensional"), function () {
                            return e.k && e.getValue(), s = e.v * r, a.value !== s && ((a = new Number(s)).value = s, i(a, e, "unidimensional")), a
                        }
                    }(s) : function (t) {
                        t && "pv" in t || (t = e);
                        var r = 1 / t.mult, s = t.pv.length, a = createTypedArray("float32", s),
                            n = createTypedArray("float32", s);
                        return a.value = n, i(a, t, "multidimensional"), function () {
                            t.k && t.getValue();
                            for (var e = 0; e < s; e += 1) a[e] = n[e] = t.v[e] * r;
                            return a
                        }
                    }(s) : r
                }
            }(), TextExpressionSelectorProp, propertyGetTextProp;

            function SliderEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
            }

            function AngleEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
            }

            function ColorEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, i)
            }

            function PointEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, i)
            }

            function LayerIndexEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
            }

            function MaskIndexEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
            }

            function CheckboxEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
            }

            function NoValueEffect() {
                this.p = {}
            }

            function EffectsManager() {
            }

            function EffectsManager(t, e) {
                var i = t.ef || [];
                this.effectElements = [];
                var r, s, a = i.length;
                for (r = 0; r < a; r++) s = new GroupEffect(i[r], e), this.effectElements.push(s)
            }

            function GroupEffect(t, e) {
                this.init(t, e)
            }

            TextExpressionSelectorProp = function () {
                function t(t, e) {
                    return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v
                }

                return function (e, i) {
                    this.pv = 1, this.comp = e.comp, this.elem = e, this.mult = .01, this.propType = "textSelector", this.textTotal = i.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(e, i, this), this.getMult = t, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty
                }
            }(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function (t, e, i) {
                return 1 === e.t ? new TextExpressionSelectorProp(t, e, i) : propertyGetTextProp(t, e, i)
            }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
                this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
                var i, r, s = this.data.ef.length, a = this.data.ef;
                for (i = 0; i < s; i += 1) {
                    switch (r = null, a[i].ty) {
                        case 0:
                            r = new SliderEffect(a[i], e, this);
                            break;
                        case 1:
                            r = new AngleEffect(a[i], e, this);
                            break;
                        case 2:
                            r = new ColorEffect(a[i], e, this);
                            break;
                        case 3:
                            r = new PointEffect(a[i], e, this);
                            break;
                        case 4:
                        case 7:
                            r = new CheckboxEffect(a[i], e, this);
                            break;
                        case 10:
                            r = new LayerIndexEffect(a[i], e, this);
                            break;
                        case 11:
                            r = new MaskIndexEffect(a[i], e, this);
                            break;
                        case 5:
                            r = new EffectsManager(a[i], e, this);
                            break;
                        default:
                            r = new NoValueEffect(a[i], e, this)
                    }
                    r && this.effectElements.push(r)
                }
            };
            var lottiejs = {}, _isFrozen = !1;

            function setLocationHref(t) {
                locationHref = t
            }

            function searchAnimations() {
                !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
            }

            function setSubframeRendering(t) {
                subframeEnabled = t
            }

            function loadAnimation(t) {
                return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
            }

            function setQuality(t) {
                if ("string" == typeof t) switch (t) {
                    case"high":
                        defaultCurveSegments = 200;
                        break;
                    case"medium":
                        defaultCurveSegments = 50;
                        break;
                    case"low":
                        defaultCurveSegments = 10
                } else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
                roundValues(!(defaultCurveSegments >= 50))
            }

            function inBrowser() {
                return "undefined" != typeof navigator
            }

            function installPlugin(t, e) {
                "expressions" === t && (expressionsPlugin = e)
            }

            function getFactory(t) {
                switch (t) {
                    case"propertyFactory":
                        return PropertyFactory;
                    case"shapePropertyFactory":
                        return ShapePropertyFactory;
                    case"matrix":
                        return Matrix
                }
            }

            function checkReady() {
                "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
            }

            function getQueryVariable(t) {
                for (var e = queryString.split("&"), i = 0; i < e.length; i++) {
                    var r = e[i].split("=");
                    if (decodeURIComponent(r[0]) == t) return decodeURIComponent(r[1])
                }
            }

            lottiejs.play = animationManager.play, lottiejs.pause = animationManager.pause, lottiejs.setLocationHref = setLocationHref, lottiejs.togglePause = animationManager.togglePause, lottiejs.setSpeed = animationManager.setSpeed, lottiejs.setDirection = animationManager.setDirection, lottiejs.stop = animationManager.stop, lottiejs.searchAnimations = searchAnimations, lottiejs.registerAnimation = animationManager.registerAnimation, lottiejs.loadAnimation = loadAnimation, lottiejs.setSubframeRendering = setSubframeRendering, lottiejs.resize = animationManager.resize, lottiejs.goToAndStop = animationManager.goToAndStop, lottiejs.destroy = animationManager.destroy, lottiejs.setQuality = setQuality, lottiejs.inBrowser = inBrowser, lottiejs.installPlugin = installPlugin, lottiejs.freeze = animationManager.freeze, lottiejs.unfreeze = animationManager.unfreeze, lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottiejs.__getFactory = getFactory, lottiejs.version = "5.5.1";
            var standalone = "__[STANDALONE]__", animationData = "__[ANIMATIONDATA]__", renderer = "";
            if (standalone) {
                var scripts = document.getElementsByTagName("script"), index = scripts.length - 1,
                    myScript = scripts[index] || {src: ""}, queryString = myScript.src.replace(/^[^\?]+\??/, "");
                renderer = getQueryVariable("renderer")
            }
            var readyStateCheckInterval = setInterval(checkReady, 100);
            return lottiejs
        }, void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return factory(root)
        }.call(exports, __webpack_require__, exports, module)) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    }, 21: function (t, e, i) {
        t.exports = function (t) {
            function e(r) {
                if (i[r]) return i[r].exports;
                var s = i[r] = {exports: {}, id: r, loaded: !1};
                return t[r].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports
            }

            var i = {};
            return e.m = t, e.c = i, e.p = "", e(0)
        }([function (t, e, i) {
            "use strict";
            var r = i(1), s = r.isInBrowser, a = i(2), n = new a(s ? document.body : null);
            n.setStateFromDOM(null), n.listenToDOM(), s && (window.scrollMonitor = n), t.exports = n
        }, function (t, e) {
            "use strict";
            e.VISIBILITYCHANGE = "visibilityChange", e.ENTERVIEWPORT = "enterViewport", e.FULLYENTERVIEWPORT = "fullyEnterViewport", e.EXITVIEWPORT = "exitViewport", e.PARTIALLYEXITVIEWPORT = "partiallyExitViewport", e.LOCATIONCHANGE = "locationChange", e.STATECHANGE = "stateChange", e.eventTypes = [e.VISIBILITYCHANGE, e.ENTERVIEWPORT, e.FULLYENTERVIEWPORT, e.EXITVIEWPORT, e.PARTIALLYEXITVIEWPORT, e.LOCATIONCHANGE, e.STATECHANGE], e.isOnServer = "undefined" == typeof window, e.isInBrowser = !e.isOnServer, e.defaultOffsets = {
                top: 0,
                bottom: 0
            }
        }, function (t, e, i) {
            "use strict";

            function r(t) {
                return o ? 0 : t === document.body ? window.innerHeight || document.documentElement.clientHeight : t.clientHeight
            }

            function s(t) {
                return o ? 0 : t === document.body ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) : t.scrollHeight
            }

            function a(t) {
                return o ? 0 : t === document.body ? window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop
            }

            var n = i(1), o = n.isOnServer, h = n.isInBrowser, l = n.eventTypes, p = i(3), m = !1;
            if (h) try {
                var c = Object.defineProperty({}, "passive", {
                    get: function () {
                        m = !0
                    }
                });
                window.addEventListener("test", null, c)
            } catch (t) {
            }
            var f = !!m && {capture: !1, passive: !0}, d = function () {
                function t(e, i) {
                    !function (t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n, o, h, p = this;
                    this.item = e, this.watchers = [], this.viewportTop = null, this.viewportBottom = null, this.documentHeight = s(e), this.viewportHeight = r(e), this.DOMListener = function () {
                        t.prototype.DOMListener.apply(p, arguments)
                    }, this.eventTypes = l, i && (this.containerWatcher = i.create(e)), this.update = function () {
                        (function () {
                            if (p.viewportTop = a(e), p.viewportBottom = p.viewportTop + p.viewportHeight, p.documentHeight = s(e), p.documentHeight !== n) {
                                for (o = p.watchers.length; o--;) p.watchers[o].recalculateLocation();
                                n = p.documentHeight
                            }
                        })(), function () {
                            for (h = p.watchers.length; h--;) p.watchers[h].update();
                            for (h = p.watchers.length; h--;) p.watchers[h].triggerCallbacks()
                        }()
                    }, this.recalculateLocations = function () {
                        this.documentHeight = 0, this.update()
                    }
                }

                return t.prototype.listenToDOM = function () {
                    h && (window.addEventListener ? (this.item === document.body ? window.addEventListener("scroll", this.DOMListener, f) : this.item.addEventListener("scroll", this.DOMListener, f), window.addEventListener("resize", this.DOMListener)) : (this.item === document.body ? window.attachEvent("onscroll", this.DOMListener) : this.item.attachEvent("onscroll", this.DOMListener), window.attachEvent("onresize", this.DOMListener)), this.destroy = function () {
                        window.addEventListener ? (this.item === document.body ? (window.removeEventListener("scroll", this.DOMListener, f), this.containerWatcher.destroy()) : this.item.removeEventListener("scroll", this.DOMListener, f), window.removeEventListener("resize", this.DOMListener)) : (this.item === document.body ? (window.detachEvent("onscroll", this.DOMListener), this.containerWatcher.destroy()) : this.item.detachEvent("onscroll", this.DOMListener), window.detachEvent("onresize", this.DOMListener))
                    })
                }, t.prototype.destroy = function () {
                }, t.prototype.DOMListener = function (t) {
                    this.setStateFromDOM(t)
                }, t.prototype.setStateFromDOM = function (t) {
                    var e = a(this.item), i = r(this.item), n = s(this.item);
                    this.setState(e, i, n, t)
                }, t.prototype.setState = function (t, e, i, r) {
                    var s = e !== this.viewportHeight || i !== this.contentHeight;
                    if (this.latestEvent = r, this.viewportTop = t, this.viewportHeight = e, this.viewportBottom = t + e, this.contentHeight = i, s) for (var a = this.watchers.length; a--;) this.watchers[a].recalculateLocation();
                    this.updateAndTriggerWatchers(r)
                }, t.prototype.updateAndTriggerWatchers = function (t) {
                    for (var e = this.watchers.length; e--;) this.watchers[e].update();
                    for (e = this.watchers.length; e--;) this.watchers[e].triggerCallbacks(t)
                }, t.prototype.createCustomContainer = function () {
                    return new t
                }, t.prototype.createContainer = function (e) {
                    "string" == typeof e ? e = document.querySelector(e) : e && e.length > 0 && (e = e[0]);
                    var i = new t(e, this);
                    return i.setStateFromDOM(), i.listenToDOM(), i
                }, t.prototype.create = function (t, e) {
                    "string" == typeof t ? t = document.querySelector(t) : t && t.length > 0 && (t = t[0]);
                    var i = new p(this, t, e);
                    return this.watchers.push(i), i
                }, t.prototype.beget = function (t, e) {
                    return this.create(t, e)
                }, t
            }();
            t.exports = d
        }, function (t, e, i) {
            "use strict";

            function r(t, e, i) {
                function r(t, e) {
                    if (0 !== t.length) for (g = t.length; g--;) (v = t[g]).callback.call(x, e, x), v.isOne && t.splice(g, 1)
                }

                var s, d, u, y, g, v, x = this;
                this.watchItem = e, this.container = t, this.offsets = i ? i === +i ? {
                    top: i,
                    bottom: i
                } : {top: i.top || f.top, bottom: i.bottom || f.bottom} : f, this.callbacks = {};
                for (var k = 0, b = c.length; k < b; k++) x.callbacks[c[k]] = [];
                this.locked = !1, this.triggerCallbacks = function (t) {
                    switch (this.isInViewport && !s && r(this.callbacks[n], t), this.isFullyInViewport && !d && r(this.callbacks[o], t), this.isAboveViewport !== u && this.isBelowViewport !== y && (r(this.callbacks[a], t), d || this.isFullyInViewport || (r(this.callbacks[o], t), r(this.callbacks[l], t)), s || this.isInViewport || (r(this.callbacks[n], t), r(this.callbacks[h], t))), !this.isFullyInViewport && d && r(this.callbacks[l], t), !this.isInViewport && s && r(this.callbacks[h], t), this.isInViewport !== s && r(this.callbacks[a], t), !0) {
                        case s !== this.isInViewport:
                        case d !== this.isFullyInViewport:
                        case u !== this.isAboveViewport:
                        case y !== this.isBelowViewport:
                            r(this.callbacks[m], t)
                    }
                    s = this.isInViewport, d = this.isFullyInViewport, u = this.isAboveViewport, y = this.isBelowViewport
                }, this.recalculateLocation = function () {
                    if (!this.locked) {
                        var t = this.top, e = this.bottom;
                        if (this.watchItem.nodeName) {
                            var i = this.watchItem.style.display;
                            "none" === i && (this.watchItem.style.display = "");
                            for (var s = 0, a = this.container; a.containerWatcher;) s += a.containerWatcher.top - a.containerWatcher.container.viewportTop, a = a.containerWatcher.container;
                            var n = this.watchItem.getBoundingClientRect();
                            this.top = n.top + this.container.viewportTop - s, this.bottom = n.bottom + this.container.viewportTop - s, "none" === i && (this.watchItem.style.display = i)
                        } else this.watchItem === +this.watchItem ? this.watchItem > 0 ? this.top = this.bottom = this.watchItem : this.top = this.bottom = this.container.documentHeight - this.watchItem : (this.top = this.watchItem.top, this.bottom = this.watchItem.bottom);
                        this.top -= this.offsets.top, this.bottom += this.offsets.bottom, this.height = this.bottom - this.top, void 0 === t && void 0 === e || this.top === t && this.bottom === e || r(this.callbacks[p], null)
                    }
                }, this.recalculateLocation(), this.update(), s = this.isInViewport, d = this.isFullyInViewport, u = this.isAboveViewport, y = this.isBelowViewport
            }

            var s = i(1), a = s.VISIBILITYCHANGE, n = s.ENTERVIEWPORT, o = s.FULLYENTERVIEWPORT, h = s.EXITVIEWPORT,
                l = s.PARTIALLYEXITVIEWPORT, p = s.LOCATIONCHANGE, m = s.STATECHANGE, c = s.eventTypes,
                f = s.defaultOffsets;
            r.prototype = {
                on: function (t, e, i) {
                    switch (!0) {
                        case t === a && !this.isInViewport && this.isAboveViewport:
                        case t === n && this.isInViewport:
                        case t === o && this.isFullyInViewport:
                        case t === h && this.isAboveViewport && !this.isInViewport:
                        case t === l && this.isInViewport && this.isAboveViewport:
                            if (e.call(this, this.container.latestEvent, this), i) return
                    }
                    if (!this.callbacks[t]) throw new Error("Tried to add a scroll monitor listener of type " + t + ". Your options are: " + c.join(", "));
                    this.callbacks[t].push({callback: e, isOne: i || !1})
                }, off: function (t, e) {
                    if (!this.callbacks[t]) throw new Error("Tried to remove a scroll monitor listener of type " + t + ". Your options are: " + c.join(", "));
                    for (var i, r = 0; i = this.callbacks[t][r]; r++) if (i.callback === e) {
                        this.callbacks[t].splice(r, 1);
                        break
                    }
                }, one: function (t, e) {
                    this.on(t, e, !0)
                }, recalculateSize: function () {
                    this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom, this.bottom = this.top + this.height
                }, update: function () {
                    this.isAboveViewport = this.top < this.container.viewportTop, this.isBelowViewport = this.bottom > this.container.viewportBottom, this.isInViewport = this.top < this.container.viewportBottom && this.bottom > this.container.viewportTop, this.isFullyInViewport = this.top >= this.container.viewportTop && this.bottom <= this.container.viewportBottom || this.isAboveViewport && this.isBelowViewport
                }, destroy: function () {
                    var t = this.container.watchers.indexOf(this);
                    this.container.watchers.splice(t, 1);
                    for (var e = 0, i = c.length; e < i; e++) this.callbacks[c[e]].length = 0
                }, lock: function () {
                    this.locked = !0
                }, unlock: function () {
                    this.locked = !1
                }
            };
            for (var d = function (t) {
                return function (e, i) {
                    this.on.call(this, t, e, i)
                }
            }, u = 0, y = c.length; u < y; u++) {
                var g = c[u];
                r.prototype[g] = d(g)
            }
            t.exports = r
        }])
    }, 212: function (t) {
        t.exports = {
            v: "5.5.1",
            fr: 60,
            ip: 0,
            op: 120,
            w: 2500,
            h: 448,
            nm: "sequence-b",
            ddd: 0,
            assets: [{
                id: "comp_0", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "mask Outlines",
                    td: 1,
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [256, 224, 0], ix: 2},
                        a: {a: 0, k: [240.25, 208.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 0], [0, 4.711]],
                                    o: [[0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703]],
                                    v: [[97.77, -36.168], [65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.934], [15.997, 98.129], [36.3, 86.934], [57.464, 53.363], [97.77, -10.566], [101.464, -23.371]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [378.785, 98.379], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [170.984, 208.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 2",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 2,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 0,
                    nm: "sygnet-filler",
                    tt: 1,
                    refId: "comp_1",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [256, 224, 0], ix: 2},
                        a: {a: 0, k: [256, 224, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    w: 512,
                    h: 448,
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }]
            }, {
                id: "comp_1", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "white-r Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 448, 0], ix: 2},
                        a: {a: 0, k: [0, 0, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 2",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 2,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr", it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 52,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.555, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-103.41, -152.066], [-83.105, -140.871], [-62.8, -152.066], [-1.332, -249.566], [2.364, -262.371], [-1.332, -275.168], [-33.332, -325.925], [-53.636, -337.129], [-176.566, -337.129], [-200.566, -313.129], [-196.879, -300.324]],
                                        c: !0
                                    }]
                                }, {
                                    t: 77,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.555, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-103.41, -152.066], [-83.105, -140.871], [-62.8, -152.066], [-1.332, -249.566], [2.364, -262.371], [-1.332, -275.168], [-158.16, -523.925], [-178.464, -535.129], [-301.394, -535.129], [-325.394, -511.129], [-321.707, -498.324]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [106.464, 103.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }], nm: "Group 1", np: 3, cix: 2, bm: 0, ix: 3, mn: "ADBE Vector Group", hd: !1
                    }],
                    ip: 52,
                    op: 532,
                    st: 52,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 4,
                    nm: "white-l Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 448, 0], ix: 2},
                        a: {a: 0, k: [0, 0, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 48,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-210.716, -167.797], [-231.012, -179], [-353.95, -179], [-377.95, -155], [-374.255, -142.195]],
                                        c: !0
                                    }]
                                }, {
                                    t: 73,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-413.715, -489.797], [-434.012, -501], [-556.949, -501], [-580.949, -477], [-577.254, -464.195]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [145.472, 165], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 48,
                    op: 528,
                    st: 48,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 3,
                    ty: 4,
                    nm: "sky Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 475, 0], ix: 2},
                        a: {a: 0, k: [0, 27, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {a: 0, k: {i: [[0, 0]], o: [[0, 0]], v: [[182, 502]], c: !1}, ix: 2},
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 2",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {a: 0, k: {i: [[0, 0]], o: [[0, 0]], v: [[340, 388]], c: !1}, ix: 2},
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 2,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 44,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-210.716, -167.797], [-231.013, -179], [-353.95, -179], [-377.95, -155], [-374.255, -142.195]],
                                        c: !0
                                    }]
                                }, {
                                    t: 69,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-449.019, -545.797], [-469.316, -557], [-592.254, -557], [-616.254, -533], [-612.558, -520.195]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [145.473, 165], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 3,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 44,
                    op: 524,
                    st: 44,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 4,
                    ty: 4,
                    nm: "ocean Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 448, 0], ix: 2},
                        a: {a: 0, k: [0, 0, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 40,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-210.716, -167.797], [-231.012, -179], [-353.95, -179], [-377.95, -155], [-374.255, -142.195]],
                                        c: !0
                                    }]
                                }, {
                                    t: 65,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-474.238, -585.797], [-494.535, -597], [-617.472, -597], [-641.472, -573], [-637.777, -560.195]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [145.472, 165], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 40,
                    op: 520,
                    st: 40,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 5,
                    ty: 0,
                    nm: "sygnet-outlines",
                    refId: "comp_2",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [256, 224, 0], ix: 2},
                        a: {a: 0, k: [256, 224, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    w: 512,
                    h: 448,
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }]
            }, {
                id: "comp_2", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "outline-l 3",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [186.735, 224, 0], ix: 2},
                        a: {a: 0, k: [190.734, 228, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [190.734, 228], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [100]}, {t: 70, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [0]}, {t: 70, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 20,
                    op: 500,
                    st: 20,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 4,
                    nm: "outline-l 2",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 50, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [186.735, 224, 0], ix: 2},
                        a: {a: 0, k: [190.734, 228, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [190.734, 228], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [100]}, {t: 60, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [0]}, {t: 60, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 10,
                    op: 490,
                    st: 10,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 3,
                    ty: 4,
                    nm: "outline-l",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 25, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [186.735, 224, 0], ix: 2},
                        a: {a: 0, k: [190.734, 228, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [190.734, 228], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 0, s: [100]}, {t: 50, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 0, s: [0]}, {t: 50, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 4,
                    ty: 4,
                    nm: "outline-r 3",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [394.535, 114.129, 0], ix: 2},
                        a: {a: 0, k: [121.464, 118.129, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.727], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.933], [15.997, 98.129], [36.3, 86.933], [57.464, 53.363], [97.77, -10.567], [101.464, -23.371], [97.77, -36.168]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [121.464, 118.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 30, s: [100]}, {t: 80, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 30, s: [0]}, {t: 80, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 30,
                    op: 510,
                    st: 30,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 5,
                    ty: 4,
                    nm: "outline-r 2",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 50, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [394.535, 114.129, 0], ix: 2},
                        a: {a: 0, k: [121.464, 118.129, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.727], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.933], [15.997, 98.129], [36.3, 86.933], [57.464, 53.363], [97.77, -10.567], [101.464, -23.371], [97.77, -36.168]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [121.464, 118.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [100]}, {t: 70, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [0]}, {t: 70, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 20,
                    op: 500,
                    st: 20,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 6,
                    ty: 4,
                    nm: "outline-r",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 25, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [394.535, 114.129, 0], ix: 2},
                        a: {a: 0, k: [121.464, 118.129, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.727], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.933], [15.997, 98.129], [36.3, 86.933], [57.464, 53.363], [97.77, -10.567], [101.464, -23.371], [97.77, -36.168]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [121.464, 118.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [100]}, {t: 60, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [0]}, {t: 60, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 10,
                    op: 490,
                    st: 10,
                    bm: 0
                }]
            }, {
                id: "comp_3", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "v Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 16, s: [0]}, {
                                t: 31,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 16,
                                s: [-46, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 46, s: [466, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [100.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[6.617, 0], [0, 0], [1.844, -4.586], [0, 0], [0, 0], [4.937, 0], [0, 0], [0, -6.617], [-.563, -1.406], [0, 0], [-4.938, 0], [0, 0], [-1.836, 4.586], [0, 0], [0, 1.547]],
                                    o: [[0, 0], [-4.938, 0], [0, 0], [0, 0], [-1.836, -4.586], [0, 0], [-6.617, 0], [0, 1.547], [0, 0], [1.835, 4.586], [0, 0], [4.937, 0], [0, 0], [.563, -1.406], [0, -6.617]],
                                    v: [[88, -112], [80.438, -112], [69.281, -104.453], [0, 68.758], [-69.289, -104.453], [-80.437, -112], [-88, -112], [-100, -100], [-99.148, -95.547], [-19.148, 104.453], [-8, 112], [8, 112], [19.148, 104.453], [99.148, -95.547], [100, -100]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [100.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 16,
                    op: 496,
                    st: 16,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 4,
                    nm: "u Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 12, s: [0]}, {
                                t: 27,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 12,
                                s: [194, 226, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 42, s: [706, 226, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [92.25, 114.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [6.625, 0], [0, 0], [0, -6.625], [0, 0], [33.141, 0], [0, 33.141], [0, 0], [6.625, 0], [0, 0], [0, -6.625], [0, 0], [-50.812, 0], [0, 50.812]],
                                    o: [[0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 33.141], [-33.141, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 50.812], [50.812, 0], [0, 0]],
                                    v: [[92, -102], [80, -114], [72, -114], [60, -102], [60, 22], [0, 82], [-60, 22], [-60, -102], [-72, -114], [-80, -114], [-92, -102], [-92, 22], [0, 114], [92, 22]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [92.25, 114.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 12,
                    op: 492,
                    st: 12,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 3,
                    ty: 4,
                    nm: "l Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 8, s: [0]}, {
                                t: 23,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 8,
                                s: [426, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 38, s: [938, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [76.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[6.625, 0], [0, 0], [0, 0], [6.625, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0]],
                                    o: [[0, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [6.625, 0], [0, 0], [0, -6.625]],
                                    v: [[64, 80], [-44, 80], [-44, -100], [-56, -112], [-64, -112], [-76, -100], [-76, 100], [-64, 112], [64, 112], [76, 100], [76, 92]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [76.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 8,
                    op: 488,
                    st: 8,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 4,
                    ty: 4,
                    nm: "t Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 4, s: [0]}, {
                                t: 19,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 4,
                                s: [582, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 34, s: [1094, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [96.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[6.625, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [0, 0], [0, 6.625], [0, 0]],
                                    o: [[0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [0, 0], [0, 6.625], [0, 0], [6.625, 0], [0, 0], [0, 0], [6.625, 0], [0, 0], [0, -6.625]],
                                    v: [[84, -112], [-84, -112], [-96, -100], [-96, -92], [-84, -80], [-16, -80], [-16, 100], [-4, 112], [4, 112], [16, 100], [16, -80], [84, -80], [96, -92], [96, -100]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [96.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 4,
                    op: 484,
                    st: 4,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 5,
                    ty: 4,
                    nm: "r Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 0, s: [0]}, {
                                t: 15,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 1, y: 1},
                                o: {x: 0, y: 0},
                                t: -8,
                                s: [824, 224, 0],
                                to: [21.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 0,
                                s: [952, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-64, 0, 0]
                            }, {t: 30, s: [1336, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [90.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [0, 0], [0, -19.852], [19.852, 0], [0, 0]],
                                    o: [[0, 0], [19.852, 0], [0, 19.852], [0, 0], [0, 0]],
                                    v: [[-58, -80], [18, -80], [54, -44], [18, -8], [-58, -8]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ind: 1,
                            ty: "sh",
                            ix: 2,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[1.054, 1.813], [0, 0], [0, 28.047], [37.5, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [0, 0], [0, 0], [-4.266, 0], [0, 0], [0, 6.617]],
                                    o: [[0, 0], [24.289, -10.383], [0, -37.5], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [6.625, 0], [0, 0], [0, 0], [0, 0], [2.141, 3.687], [0, 0], [6.617, 0], [0, -2.125]],
                                    v: [[88.383, 93.984], [44.641, 18.555], [86, -44], [18, -112], [-78, -112], [-90, -100], [-90, 100], [-78, 112], [-70, 112], [-58, 100], [-58, 24], [11.914, 24], [59.484, 106.016], [69.875, 112], [78, 112], [90, 100]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 2",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {ty: "mm", mm: 1, nm: "Merge Paths 1", mn: "ADBE Vector Filter - Merge", hd: !1}, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [90.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }]
            }],
            layers: [{
                ddd: 0,
                ind: 1,
                ty: 0,
                nm: "SYGNET",
                refId: "comp_0",
                sr: 1,
                ks: {
                    o: {a: 0, k: 100, ix: 11},
                    r: {a: 0, k: 0, ix: 10},
                    p: {
                        a: 1,
                        k: [{
                            i: {x: 0, y: 1},
                            o: {x: .64, y: 0},
                            t: 37,
                            s: [1250, 224, 0],
                            to: [-105, 0, 0],
                            ti: [105, 0, 0]
                        }, {t: 97, s: [620, 224, 0]}],
                        ix: 2
                    },
                    a: {a: 0, k: [256, 224, 0], ix: 1},
                    s: {a: 0, k: [100, 100, 100], ix: 6}
                },
                ao: 0,
                w: 512,
                h: 448,
                ip: 0,
                op: 480,
                st: 0,
                bm: 0
            }, {
                ddd: 0,
                ind: 2,
                ty: 0,
                nm: "vultr",
                refId: "comp_3",
                sr: 1,
                ks: {
                    o: {a: 0, k: 100, ix: 11},
                    r: {a: 0, k: 0, ix: 10},
                    p: {a: 0, k: [1590, 224, 0], ix: 2},
                    a: {a: 0, k: [896, 224, 0], ix: 1},
                    s: {a: 0, k: [100, 100, 100], ix: 6}
                },
                ao: 0,
                w: 1792,
                h: 448,
                ip: 47,
                op: 527,
                st: 47,
                bm: 0
            }],
            markers: []
        }
    }, 213: function (t) {
        t.exports = {
            v: "5.5.1",
            fr: 60,
            ip: 0,
            op: 120,
            w: 2500,
            h: 448,
            nm: "sequence-b",
            ddd: 0,
            assets: [{
                id: "comp_0", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "mask Outlines",
                    td: 1,
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [256, 224, 0], ix: 2},
                        a: {a: 0, k: [240.25, 208.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 0], [0, 4.711]],
                                    o: [[0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703]],
                                    v: [[97.77, -36.168], [65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.934], [15.997, 98.129], [36.3, 86.934], [57.464, 53.363], [97.77, -10.566], [101.464, -23.371]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [378.785, 98.379], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [1, 1, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [170.984, 208.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 2",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 2,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 0,
                    nm: "sygnet-filler",
                    tt: 1,
                    refId: "comp_1",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [256, 224, 0], ix: 2},
                        a: {a: 0, k: [256, 224, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    w: 512,
                    h: 448,
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }]
            }, {
                id: "comp_1", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "white-r Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 448, 0], ix: 2},
                        a: {a: 0, k: [0, 0, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 2",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 2,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr", it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 52,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.555, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-103.41, -152.066], [-83.105, -140.871], [-62.8, -152.066], [-1.332, -249.566], [2.364, -262.371], [-1.332, -275.168], [-33.332, -325.925], [-53.636, -337.129], [-176.566, -337.129], [-200.566, -313.129], [-196.879, -300.324]],
                                        c: !0
                                    }]
                                }, {
                                    t: 77,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.555, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-103.41, -152.066], [-83.105, -140.871], [-62.8, -152.066], [-1.332, -249.566], [2.364, -262.371], [-1.332, -275.168], [-158.16, -523.925], [-178.464, -535.129], [-301.394, -535.129], [-325.394, -511.129], [-321.707, -498.324]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [106.464, 103.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }], nm: "Group 1", np: 3, cix: 2, bm: 0, ix: 3, mn: "ADBE Vector Group", hd: !1
                    }],
                    ip: 52,
                    op: 532,
                    st: 52,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 4,
                    nm: "white-l Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 448, 0], ix: 2},
                        a: {a: 0, k: [0, 0, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 48,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-210.716, -167.797], [-231.012, -179], [-353.95, -179], [-377.95, -155], [-374.255, -142.195]],
                                        c: !0
                                    }]
                                }, {
                                    t: 73,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-413.715, -489.797], [-434.012, -501], [-556.949, -501], [-580.949, -477], [-577.254, -464.195]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [145.472, 165], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 48,
                    op: 528,
                    st: 48,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 3,
                    ty: 4,
                    nm: "sky Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 475, 0], ix: 2},
                        a: {a: 0, k: [0, 27, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {a: 0, k: {i: [[0, 0]], o: [[0, 0]], v: [[182, 502]], c: !1}, ix: 2},
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 2",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {a: 0, k: {i: [[0, 0]], o: [[0, 0]], v: [[340, 388]], c: !1}, ix: 2},
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [0, 0], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Shape 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 2,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 44,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-210.716, -167.797], [-231.013, -179], [-353.95, -179], [-377.95, -155], [-374.255, -142.195]],
                                        c: !0
                                    }]
                                }, {
                                    t: 69,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-449.019, -545.797], [-469.316, -557], [-592.254, -557], [-616.254, -533], [-612.558, -520.195]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.317999985639, .725, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [145.473, 165], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 3,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 44,
                    op: 524,
                    st: 44,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 4,
                    ty: 4,
                    nm: "ocean Outlines",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [512, 448, 0], ix: 2},
                        a: {a: 0, k: [0, 0, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [{
                                    i: {x: 0, y: 1},
                                    o: {x: .32, y: 0},
                                    t: 40,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-210.716, -167.797], [-231.012, -179], [-353.95, -179], [-377.95, -155], [-374.255, -142.195]],
                                        c: !0
                                    }]
                                }, {
                                    t: 65,
                                    s: [{
                                        i: [[0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 4.711], [2.344, 3.703], [0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711]],
                                        o: [[4.25, 6.727], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0], [-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0]],
                                        v: [[-142.255, 225.805], [-121.95, 237], [-101.645, 225.805], [-40.177, 128.305], [-36.481, 115.5], [-40.177, 102.703], [-474.238, -585.797], [-494.535, -597], [-617.472, -597], [-641.472, -573], [-637.777, -560.195]],
                                        c: !0
                                    }]
                                }],
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [.788235294118, .956862745098, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 2, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.788235294118, .956862745098, 1, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [145.472, 165], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 40,
                    op: 520,
                    st: 40,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 5,
                    ty: 0,
                    nm: "sygnet-outlines",
                    refId: "comp_2",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [256, 224, 0], ix: 2},
                        a: {a: 0, k: [256, 224, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    w: 512,
                    h: 448,
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }]
            }, {
                id: "comp_2", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "outline-l 3",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [186.735, 224, 0], ix: 2},
                        a: {a: 0, k: [190.734, 228, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [190.734, 228], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [100]}, {t: 70, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [0]}, {t: 70, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 20,
                    op: 500,
                    st: 20,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 4,
                    nm: "outline-l 2",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 50, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [186.735, 224, 0], ix: 2},
                        a: {a: 0, k: [190.734, 228, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [190.734, 228], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [100]}, {t: 60, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [0]}, {t: 60, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 10,
                    op: 490,
                    st: 10,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 3,
                    ty: 4,
                    nm: "outline-l",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 25, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [186.735, 224, 0], ix: 2},
                        a: {a: 0, k: [190.734, 228, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.554, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.726], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.726], [8.547, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[-3.492, -196.797], [-23.805, -208], [-146.734, -208], [-170.734, -184], [-167.039, -171.195], [64.96, 196.805], [85.266, 208], [105.57, 196.805], [167.039, 99.305], [170.734, 86.5], [167.039, 73.703]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [190.734, 228], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 0, s: [100]}, {t: 50, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 0, s: [0]}, {t: 50, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 4,
                    ty: 4,
                    nm: "outline-r 3",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 100, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [394.535, 114.129, 0], ix: 2},
                        a: {a: 0, k: [121.464, 118.129, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.727], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.933], [15.997, 98.129], [36.3, 86.933], [57.464, 53.363], [97.77, -10.567], [101.464, -23.371], [97.77, -36.168]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [121.464, 118.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 30, s: [100]}, {t: 80, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 30, s: [0]}, {t: 80, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 30,
                    op: 510,
                    st: 30,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 5,
                    ty: 4,
                    nm: "outline-r 2",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 50, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [394.535, 114.129, 0], ix: 2},
                        a: {a: 0, k: [121.464, 118.129, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.727], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.933], [15.997, 98.129], [36.3, 86.933], [57.464, 53.363], [97.77, -10.567], [101.464, -23.371], [97.77, -36.168]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [121.464, 118.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [100]}, {t: 70, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 20, s: [0]}, {t: 70, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 20,
                    op: 500,
                    st: 20,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 6,
                    ty: 4,
                    nm: "outline-r",
                    sr: 1,
                    ks: {
                        o: {a: 0, k: 25, ix: 11},
                        r: {a: 0, k: 0, ix: 10},
                        p: {a: 0, k: [394.535, 114.129, 0], ix: 2},
                        a: {a: 0, k: [121.464, 118.129, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [8.547, 0], [0, 0], [0, -13.258], [-2.344, -3.711], [0, 0], [-8.547, 0], [-4.25, 6.727], [0, 0], [0, 0], [0, 4.711], [2.344, 3.703]],
                                    o: [[-4.25, -6.734], [0, 0], [-13.258, 0], [0, 4.711], [0, 0], [4.25, 6.727], [8.554, 0], [0, 0], [0, 0], [2.344, -3.711], [0, -4.703], [0, 0]],
                                    v: [[65.77, -86.926], [45.464, -98.129], [-77.464, -98.129], [-101.464, -74.129], [-97.777, -61.324], [-4.308, 86.933], [15.997, 98.129], [36.3, 86.933], [57.464, 53.363], [97.77, -10.567], [101.464, -23.371], [97.77, -36.168]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "st",
                            c: {a: 0, k: [0, .4, 1, 1], ix: 3},
                            o: {a: 0, k: 100, ix: 4},
                            w: {a: 0, k: 8, ix: 5},
                            lc: 1,
                            lj: 1,
                            ml: 10,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [121.464, 118.129], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }, {
                        ty: "tm",
                        s: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [100]}, {t: 60, s: [0]}],
                            ix: 1
                        },
                        e: {a: 0, k: 100, ix: 2},
                        o: {
                            a: 1,
                            k: [{i: {x: [.36], y: [1]}, o: {x: [.64], y: [0]}, t: 10, s: [0]}, {t: 60, s: [-180]}],
                            ix: 3
                        },
                        m: 1,
                        ix: 2,
                        nm: "Trim Paths 1",
                        mn: "ADBE Vector Filter - Trim",
                        hd: !1
                    }],
                    ip: 10,
                    op: 490,
                    st: 10,
                    bm: 0
                }]
            }, {
                id: "comp_3", layers: [{
                    ddd: 0,
                    ind: 1,
                    ty: 4,
                    nm: "v Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 16, s: [0]}, {
                                t: 31,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 16,
                                s: [-46, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 46, s: [466, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [100.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[6.617, 0], [0, 0], [1.844, -4.586], [0, 0], [0, 0], [4.937, 0], [0, 0], [0, -6.617], [-.563, -1.406], [0, 0], [-4.938, 0], [0, 0], [-1.836, 4.586], [0, 0], [0, 1.547]],
                                    o: [[0, 0], [-4.938, 0], [0, 0], [0, 0], [-1.836, -4.586], [0, 0], [-6.617, 0], [0, 1.547], [0, 0], [1.835, 4.586], [0, 0], [4.937, 0], [0, 0], [.563, -1.406], [0, -6.617]],
                                    v: [[88, -112], [80.438, -112], [69.281, -104.453], [0, 68.758], [-69.289, -104.453], [-80.437, -112], [-88, -112], [-100, -100], [-99.148, -95.547], [-19.148, 104.453], [-8, 112], [8, 112], [19.148, 104.453], [99.148, -95.547], [100, -100]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.078431372549, .129411764706, .286274509804, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [100.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 16,
                    op: 496,
                    st: 16,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 2,
                    ty: 4,
                    nm: "u Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 12, s: [0]}, {
                                t: 27,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 12,
                                s: [194, 226, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 42, s: [706, 226, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [92.25, 114.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [6.625, 0], [0, 0], [0, -6.625], [0, 0], [33.141, 0], [0, 33.141], [0, 0], [6.625, 0], [0, 0], [0, -6.625], [0, 0], [-50.812, 0], [0, 50.812]],
                                    o: [[0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 33.141], [-33.141, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 50.812], [50.812, 0], [0, 0]],
                                    v: [[92, -102], [80, -114], [72, -114], [60, -102], [60, 22], [0, 82], [-60, 22], [-60, -102], [-72, -114], [-80, -114], [-92, -102], [-92, 22], [0, 114], [92, 22]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.078431372549, .129411764706, .286274509804, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [92.25, 114.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 12,
                    op: 492,
                    st: 12,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 3,
                    ty: 4,
                    nm: "l Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 8, s: [0]}, {
                                t: 23,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 8,
                                s: [426, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 38, s: [938, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [76.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[6.625, 0], [0, 0], [0, 0], [6.625, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0]],
                                    o: [[0, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [6.625, 0], [0, 0], [0, -6.625]],
                                    v: [[64, 80], [-44, 80], [-44, -100], [-56, -112], [-64, -112], [-76, -100], [-76, 100], [-64, 112], [64, 112], [76, 100], [76, 92]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.078431372549, .129411764706, .286274509804, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [76.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 8,
                    op: 488,
                    st: 8,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 4,
                    ty: 4,
                    nm: "t Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 4, s: [0]}, {
                                t: 19,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 4,
                                s: [582, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {t: 34, s: [1094, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [96.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[6.625, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [0, 0], [0, 6.625], [0, 0]],
                                    o: [[0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [0, 0], [0, 6.625], [0, 0], [6.625, 0], [0, 0], [0, 0], [6.625, 0], [0, 0], [0, -6.625]],
                                    v: [[84, -112], [-84, -112], [-96, -100], [-96, -92], [-84, -80], [-16, -80], [-16, 100], [-4, 112], [4, 112], [16, 100], [16, -80], [84, -80], [96, -92], [96, -100]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ty: "fl",
                            c: {a: 0, k: [.078431372549, .129411764706, .286274509804, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [96.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 4,
                    op: 484,
                    st: 4,
                    bm: 0
                }, {
                    ddd: 0,
                    ind: 5,
                    ty: 4,
                    nm: "r Outlines",
                    sr: 1,
                    ks: {
                        o: {
                            a: 1,
                            k: [{i: {x: [.833], y: [.833]}, o: {x: [.167], y: [.167]}, t: 0, s: [0]}, {
                                t: 15,
                                s: [100]
                            }],
                            ix: 11
                        },
                        r: {a: 0, k: 0, ix: 10},
                        p: {
                            a: 1,
                            k: [{
                                i: {x: 1, y: 1},
                                o: {x: 0, y: 0},
                                t: -8,
                                s: [824, 224, 0],
                                to: [21.333, 0, 0],
                                ti: [-85.333, 0, 0]
                            }, {
                                i: {x: 0, y: 1},
                                o: {x: 0, y: 0},
                                t: 0,
                                s: [952, 224, 0],
                                to: [85.333, 0, 0],
                                ti: [-64, 0, 0]
                            }, {t: 30, s: [1336, 224, 0]}],
                            ix: 2
                        },
                        a: {a: 0, k: [90.25, 112.25, 0], ix: 1},
                        s: {a: 0, k: [100, 100, 100], ix: 6}
                    },
                    ao: 0,
                    shapes: [{
                        ty: "gr",
                        it: [{
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[0, 0], [0, 0], [0, -19.852], [19.852, 0], [0, 0]],
                                    o: [[0, 0], [19.852, 0], [0, 19.852], [0, 0], [0, 0]],
                                    v: [[-58, -80], [18, -80], [54, -44], [18, -8], [-58, -8]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {
                            ind: 1,
                            ty: "sh",
                            ix: 2,
                            ks: {
                                a: 0,
                                k: {
                                    i: [[1.054, 1.813], [0, 0], [0, 28.047], [37.5, 0], [0, 0], [0, -6.625], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [0, 0], [0, 0], [-4.266, 0], [0, 0], [0, 6.617]],
                                    o: [[0, 0], [24.289, -10.383], [0, -37.5], [0, 0], [-6.625, 0], [0, 0], [0, 6.625], [0, 0], [6.625, 0], [0, 0], [0, 0], [0, 0], [2.141, 3.687], [0, 0], [6.617, 0], [0, -2.125]],
                                    v: [[88.383, 93.984], [44.641, 18.555], [86, -44], [18, -112], [-78, -112], [-90, -100], [-90, 100], [-78, 112], [-70, 112], [-58, 100], [-58, 24], [11.914, 24], [59.484, 106.016], [69.875, 112], [78, 112], [90, 100]],
                                    c: !0
                                },
                                ix: 2
                            },
                            nm: "Path 2",
                            mn: "ADBE Vector Shape - Group",
                            hd: !1
                        }, {ty: "mm", mm: 1, nm: "Merge Paths 1", mn: "ADBE Vector Filter - Merge", hd: !1}, {
                            ty: "fl",
                            c: {a: 0, k: [.078431372549, .129411764706, .286274509804, 1], ix: 4},
                            o: {a: 0, k: 100, ix: 5},
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: !1
                        }, {
                            ty: "tr",
                            p: {a: 0, k: [90.25, 112.25], ix: 2},
                            a: {a: 0, k: [0, 0], ix: 1},
                            s: {a: 0, k: [100, 100], ix: 3},
                            r: {a: 0, k: 0, ix: 6},
                            o: {a: 0, k: 100, ix: 7},
                            sk: {a: 0, k: 0, ix: 4},
                            sa: {a: 0, k: 0, ix: 5},
                            nm: "Transform"
                        }],
                        nm: "Group 1",
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: "ADBE Vector Group",
                        hd: !1
                    }],
                    ip: 0,
                    op: 480,
                    st: 0,
                    bm: 0
                }]
            }],
            layers: [{
                ddd: 0,
                ind: 1,
                ty: 0,
                nm: "SYGNET",
                refId: "comp_0",
                sr: 1,
                ks: {
                    o: {a: 0, k: 100, ix: 11},
                    r: {a: 0, k: 0, ix: 10},
                    p: {
                        a: 1,
                        k: [{
                            i: {x: 0, y: 1},
                            o: {x: .64, y: 0},
                            t: 37,
                            s: [1250, 224, 0],
                            to: [-105, 0, 0],
                            ti: [105, 0, 0]
                        }, {t: 97, s: [620, 224, 0]}],
                        ix: 2
                    },
                    a: {a: 0, k: [256, 224, 0], ix: 1},
                    s: {a: 0, k: [100, 100, 100], ix: 6}
                },
                ao: 0,
                w: 512,
                h: 448,
                ip: 0,
                op: 480,
                st: 0,
                bm: 0
            }, {
                ddd: 0,
                ind: 2,
                ty: 0,
                nm: "vultr",
                refId: "comp_3",
                sr: 1,
                ks: {
                    o: {a: 0, k: 100, ix: 11},
                    r: {a: 0, k: 0, ix: 10},
                    p: {a: 0, k: [1590, 224, 0], ix: 2},
                    a: {a: 0, k: [896, 224, 0], ix: 1},
                    s: {a: 0, k: [100, 100, 100], ix: 6}
                },
                ao: 0,
                w: 1792,
                h: 448,
                ip: 47,
                op: 527,
                st: 47,
                bm: 0
            }],
            markers: []
        }
    }, 510: function (t, e, i) {
        "use strict";
        i.r(e);
        var r = i(139), s = i.n(r), a = i(212), n = i(213), o = i(21), h = i.n(o),
            l = document.querySelector("[data-logo-video]"), p = h.a.create(l, {top: 50});
        p.enterViewport(function () {
            "dark" == l.dataset.logoVideo ? s.a.loadAnimation({
                container: l,
                renderer: "svg",
                autoplay: !0,
                animationData: n
            }) : s.a.loadAnimation({container: l, renderer: "svg", autoplay: !0, animationData: a}), p.destroy()
        })
    }
});