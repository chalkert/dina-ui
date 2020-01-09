// OpenLayers 3. See https://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
// Version: v3.20.1
(function(root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
})(this, function() {
  var OPENLAYERS = {};
  var k,
    aa = this;
  function t(a, b) {
    var c = a.split("."),
      d = OPENLAYERS || aa;
    c[0] in d || !d.execScript || d.execScript("var " + c[0]);
    for (var e; c.length && (e = c.shift()); )
      c.length || void 0 === b
        ? d[e]
          ? (d = d[e])
          : (d = d[e] = {})
        : (d[e] = b);
  }
  var ba, da;
  function v(a, b) {
    a.prototype = Object.create(b.prototype);
    a.prototype.constructor = a;
  }
  function ea() {}
  function x(a) {
    return a.ao || (a.ao = ++fa);
  }
  var fa = 0;
  function ga(a) {
    this.message =
      "Assertion failed. See https://openlayers.org/en/v3.20.1/doc/errors/#" +
      a +
      " for details.";
    this.code = a;
    this.name = "AssertionError";
  }
  v(ga, Error);
  function ha(a, b) {
    if (!a) throw new ga(b);
  }
  function ia(a, b, c) {
    return Math.min(Math.max(a, b), c);
  }
  var ja = (function() {
    var a;
    "cosh" in Math
      ? (a = Math.cosh)
      : (a = function(a) {
          a = Math.exp(a);
          return (a + 1 / a) / 2;
        });
    return a;
  })();
  function ka(a) {
    ha(0 < a, 29);
    return Math.pow(2, Math.ceil(Math.log(a) / Math.LN2));
  }
  function la(a, b, c, d, e, f) {
    var g = e - c,
      h = f - d;
    if (0 !== g || 0 !== h) {
      var l = ((a - c) * g + (b - d) * h) / (g * g + h * h);
      1 < l ? ((c = e), (d = f)) : 0 < l && ((c += g * l), (d += h * l));
    }
    return ma(a, b, c, d);
  }
  function ma(a, b, c, d) {
    a = c - a;
    b = d - b;
    return a * a + b * b;
  }
  function na(a) {
    return (a * Math.PI) / 180;
  }
  function oa(a, b) {
    var c = a % b;
    return 0 > c * b ? c + b : c;
  }
  function pa(a, b, c) {
    return a + c * (b - a);
  }
  function qa(a) {
    return function(b) {
      if (b) return [ia(b[0], a[0], a[2]), ia(b[1], a[1], a[3])];
    };
  }
  function ra(a) {
    return a;
  }
  function sa(a, b, c) {
    this.center = a;
    this.resolution = b;
    this.rotation = c;
  }
  var ta =
    "function" === typeof Object.assign
      ? Object.assign
      : function(a, b) {
          if (!a || !a)
            throw new TypeError("Cannot convert undefined or null to object");
          for (var c = Object(a), d = 1, e = arguments.length; d < e; ++d) {
            var f = arguments[d];
            if (void 0 !== f && null !== f)
              for (var g in f) f.hasOwnProperty(g) && (c[g] = f[g]);
          }
          return c;
        };
  function ua(a) {
    for (var b in a) delete a[b];
  }
  function va(a) {
    var b = [],
      c;
    for (c in a) b.push(a[c]);
    return b;
  }
  function wa(a) {
    for (var b in a) return !1;
    return !b;
  }
  function xa(a) {
    function b(b) {
      var d = a.listener,
        e = a.xg || a.target;
      a.zg && ya(a);
      return d.call(e, b);
    }
    return (a.yg = b);
  }
  function za(a, b, c, d) {
    for (var e, f = 0, g = a.length; f < g; ++f)
      if (((e = a[f]), e.listener === b && e.xg === c))
        return d && (e.deleteIndex = f), e;
  }
  function Aa(a, b) {
    var c = a.eb;
    return c ? c[b] : void 0;
  }
  function Ba(a) {
    var b = a.eb;
    b || (b = a.eb = {});
    return b;
  }
  function Ca(a, b) {
    var c = Aa(a, b);
    if (c) {
      for (var d = 0, e = c.length; d < e; ++d)
        a.removeEventListener(b, c[d].yg), ua(c[d]);
      c.length = 0;
      if ((c = a.eb)) delete c[b], 0 === Object.keys(c).length && delete a.eb;
    }
  }
  function B(a, b, c, d, e) {
    var f = Ba(a),
      g = f[b];
    g || (g = f[b] = []);
    (f = za(g, c, d, !1))
      ? e || (f.zg = !1)
      : ((f = { xg: d, zg: !!e, listener: c, target: a, type: b }),
        a.addEventListener(b, xa(f)),
        g.push(f));
    return f;
  }
  function Da(a, b, c, d) {
    return B(a, b, c, d, !0);
  }
  function Ea(a, b, c, d) {
    (a = Aa(a, b)) && (c = za(a, c, d, !0)) && ya(c);
  }
  function ya(a) {
    if (a && a.target) {
      a.target.removeEventListener(a.type, a.yg);
      var b = Aa(a.target, a.type);
      if (b) {
        var c = "deleteIndex" in a ? a.deleteIndex : b.indexOf(a);
        -1 !== c && b.splice(c, 1);
        0 === b.length && Ca(a.target, a.type);
      }
      ua(a);
    }
  }
  function Fa(a) {
    var b = Ba(a),
      c;
    for (c in b) Ca(a, c);
  }
  function Ga() {}
  Ga.prototype.zb = !1;
  function Ha(a) {
    a.zb || ((a.zb = !0), a.oa());
  }
  Ga.prototype.oa = ea;
  function Ia(a) {
    this.type = a;
    this.target = null;
  }
  Ia.prototype.preventDefault = Ia.prototype.stopPropagation = function() {
    this.xo = !0;
  };
  function Ka(a) {
    a.stopPropagation();
  }
  function Na() {
    this.Qa = {};
    this.va = {};
    this.ra = {};
  }
  v(Na, Ga);
  Na.prototype.addEventListener = function(a, b) {
    var c = this.ra[a];
    c || (c = this.ra[a] = []);
    -1 === c.indexOf(b) && c.push(b);
  };
  Na.prototype.b = function(a) {
    var b = "string" === typeof a ? new Ia(a) : a;
    a = b.type;
    b.target = this;
    var c = this.ra[a],
      d;
    if (c) {
      a in this.va || ((this.va[a] = 0), (this.Qa[a] = 0));
      ++this.va[a];
      for (var e = 0, f = c.length; e < f; ++e)
        if (!1 === c[e].call(this, b) || b.xo) {
          d = !1;
          break;
        }
      --this.va[a];
      if (0 === this.va[a]) {
        b = this.Qa[a];
        for (delete this.Qa[a]; b--; ) this.removeEventListener(a, ea);
        delete this.va[a];
      }
      return d;
    }
  };
  Na.prototype.oa = function() {
    Fa(this);
  };
  function Oa(a, b) {
    return b ? b in a.ra : 0 < Object.keys(a.ra).length;
  }
  Na.prototype.removeEventListener = function(a, b) {
    var c = this.ra[a];
    if (c) {
      var d = c.indexOf(b);
      a in this.Qa
        ? ((c[d] = ea), ++this.Qa[a])
        : (c.splice(d, 1), 0 === c.length && delete this.ra[a]);
    }
  };
  function Pa() {
    Na.call(this);
    this.g = 0;
  }
  v(Pa, Na);
  function Qa(a) {
    if (Array.isArray(a)) for (var b = 0, c = a.length; b < c; ++b) ya(a[b]);
    else ya(a);
  }
  k = Pa.prototype;
  k.s = function() {
    ++this.g;
    this.b("change");
  };
  k.M = function() {
    return this.g;
  };
  k.J = function(a, b, c) {
    if (Array.isArray(a)) {
      for (var d = a.length, e = Array(d), f = 0; f < d; ++f)
        e[f] = B(this, a[f], b, c);
      return e;
    }
    return B(this, a, b, c);
  };
  k.N = function(a, b, c) {
    if (Array.isArray(a)) {
      for (var d = a.length, e = Array(d), f = 0; f < d; ++f)
        e[f] = Da(this, a[f], b, c);
      return e;
    }
    return Da(this, a, b, c);
  };
  k.K = function(a, b, c) {
    if (Array.isArray(a))
      for (var d = 0, e = a.length; d < e; ++d) Ea(this, a[d], b, c);
    else Ea(this, a, b, c);
  };
  k.O = Qa;
  function Sa(a) {
    Pa.call(this);
    x(this);
    this.H = {};
    void 0 !== a && this.I(a);
  }
  v(Sa, Pa);
  var Ta = {};
  function Ua(a) {
    return Ta.hasOwnProperty(a) ? Ta[a] : (Ta[a] = "change:" + a);
  }
  k = Sa.prototype;
  k.get = function(a) {
    var b;
    this.H.hasOwnProperty(a) && (b = this.H[a]);
    return b;
  };
  k.S = function() {
    return Object.keys(this.H);
  };
  k.R = function() {
    return ta({}, this.H);
  };
  function Va(a, b, c) {
    var d;
    d = Ua(b);
    a.b(new Wa(d, b, c));
    d = Xa;
    a.b(new Wa(d, b, c));
  }
  k.set = function(a, b, c) {
    c
      ? (this.H[a] = b)
      : ((c = this.H[a]), (this.H[a] = b), c !== b && Va(this, a, c));
  };
  k.I = function(a, b) {
    for (var c in a) this.set(c, a[c], b);
  };
  k.T = function(a, b) {
    if (a in this.H) {
      var c = this.H[a];
      delete this.H[a];
      b || Va(this, a, c);
    }
  };
  var Xa = "propertychange";
  function Wa(a, b, c) {
    Ia.call(this, a);
    this.key = b;
    this.oldValue = c;
  }
  v(Wa, Ia);
  function Ya(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  function Za(a, b) {
    return 0 <= a.indexOf(b);
  }
  function $a(a, b, c) {
    var d = a.length;
    if (a[0] <= b) return 0;
    if (!(b <= a[d - 1]))
      if (0 < c)
        for (c = 1; c < d; ++c) {
          if (a[c] < b) return c - 1;
        }
      else if (0 > c)
        for (c = 1; c < d; ++c) {
          if (a[c] <= b) return c;
        }
      else
        for (c = 1; c < d; ++c) {
          if (a[c] == b) return c;
          if (a[c] < b) return a[c - 1] - b < b - a[c] ? c - 1 : c;
        }
    return d - 1;
  }
  function ab(a) {
    return a.reduce(function(a, c) {
      return Array.isArray(c) ? a.concat(ab(c)) : a.concat(c);
    }, []);
  }
  function bb(a, b) {
    var c,
      d = Array.isArray(b) ? b : [b],
      e = d.length;
    for (c = 0; c < e; c++) a[a.length] = d[c];
  }
  function cb(a, b) {
    for (var c = a.length >>> 0, d, e = 0; e < c; e++)
      if (((d = a[e]), b(d, e, a))) return d;
    return null;
  }
  function db(a, b) {
    var c = a.length;
    if (c !== b.length) return !1;
    for (var d = 0; d < c; d++) if (a[d] !== b[d]) return !1;
    return !0;
  }
  function eb(a) {
    var b = fb,
      c = a.length,
      d = Array(a.length),
      e;
    for (e = 0; e < c; e++) d[e] = { index: e, value: a[e] };
    d.sort(function(a, c) {
      return b(a.value, c.value) || a.index - c.index;
    });
    for (e = 0; e < a.length; e++) a[e] = d[e].value;
  }
  function gb(a, b) {
    var c;
    return a.every(function(d, e) {
      c = e;
      return !b(d, e, a);
    })
      ? -1
      : c;
  }
  function hb(a, b) {
    var c = b || Ya;
    return a.every(function(b, e) {
      if (0 === e) return !0;
      var f = c(a[e - 1], b);
      return !(0 < f || 0 === f);
    });
  }
  function ib(a) {
    return function(b, c, d) {
      if (void 0 !== b)
        return (
          (b = $a(a, b, d)),
          (b = ia(b + c, 0, a.length - 1)),
          (c = Math.floor(b)),
          b != c && c < a.length - 1
            ? a[c] / Math.pow(a[c] / a[c + 1], b - c)
            : a[c]
        );
    };
  }
  function jb(a, b, c) {
    return function(d, e, f) {
      if (void 0 !== d)
        return (
          (d = Math.max(
            Math.floor(Math.log(b / d) / Math.log(a) + (-f / 2 + 0.5)) + e,
            0
          )),
          void 0 !== c && (d = Math.min(d, c)),
          b / Math.pow(a, d)
        );
    };
  }
  function lb(a) {
    if (void 0 !== a) return 0;
  }
  function mb(a, b) {
    if (void 0 !== a) return a + b;
  }
  function nb(a) {
    var b = (2 * Math.PI) / a;
    return function(a, d) {
      if (void 0 !== a) return (a = Math.floor((a + d) / b + 0.5) * b);
    };
  }
  function ob() {
    var a = na(5);
    return function(b, c) {
      if (void 0 !== b) return Math.abs(b + c) <= a ? 0 : b + c;
    };
  }
  function pb(a, b) {
    var c = void 0 !== b ? a.toFixed(b) : "" + a,
      d = c.indexOf("."),
      d = -1 === d ? c.length : d;
    return 2 < d ? c : Array(3 - d).join("0") + c;
  }
  function qb(a) {
    a = ("" + a).split(".");
    for (var b = ["1", "3"], c = 0; c < Math.max(a.length, b.length); c++) {
      var d = parseInt(a[c] || "0", 10),
        e = parseInt(b[c] || "0", 10);
      if (d > e) return 1;
      if (e > d) return -1;
    }
    return 0;
  }
  function rb(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    return a;
  }
  function sb(a, b) {
    var c = a[0],
      d = a[1],
      e = b[0],
      f = b[1],
      g = e[0],
      e = e[1],
      h = f[0],
      f = f[1],
      l = h - g,
      m = f - e,
      c =
        0 === l && 0 === m
          ? 0
          : (l * (c - g) + m * (d - e)) / (l * l + m * m || 0);
    0 >= c || (1 <= c ? ((g = h), (e = f)) : ((g += c * l), (e += c * m)));
    return [g, e];
  }
  function tb(a, b, c) {
    a = oa(a + 180, 360) - 180;
    var d = Math.abs(3600 * a);
    return (
      Math.floor(d / 3600) +
      "\u00b0 " +
      pb(Math.floor((d / 60) % 60)) +
      "\u2032 " +
      pb(d % 60, c || 0) +
      "\u2033 " +
      b.charAt(0 > a ? 1 : 0)
    );
  }
  function ub(a, b, c) {
    return a
      ? b.replace("{x}", a[0].toFixed(c)).replace("{y}", a[1].toFixed(c))
      : "";
  }
  function vb(a, b) {
    for (var c = !0, d = a.length - 1; 0 <= d; --d)
      if (a[d] != b[d]) {
        c = !1;
        break;
      }
    return c;
  }
  function wb(a, b) {
    var c = Math.cos(b),
      d = Math.sin(b),
      e = a[1] * c + a[0] * d;
    a[0] = a[0] * c - a[1] * d;
    a[1] = e;
    return a;
  }
  function xb(a, b) {
    a[0] *= b;
    a[1] *= b;
  }
  function yb(a, b) {
    var c = a[0] - b[0],
      d = a[1] - b[1];
    return c * c + d * d;
  }
  function zb(a, b) {
    return yb(a, sb(a, b));
  }
  function Ab(a, b) {
    return ub(a, "{x}, {y}", b);
  }
  function Bb(a) {
    return Math.pow(a, 3);
  }
  function Cb(a) {
    return 1 - Bb(1 - a);
  }
  function Db(a) {
    return 3 * a * a - 2 * a * a * a;
  }
  function Eb(a) {
    return a;
  }
  function Fb(a) {
    return 0.5 > a ? Db(2 * a) : 1 - Db(2 * (a - 0.5));
  }
  function Gb(a) {
    for (var b = Hb(), c = 0, d = a.length; c < d; ++c) Ib(b, a[c]);
    return b;
  }
  function Jb(a, b, c) {
    return c
      ? ((c[0] = a[0] - b),
        (c[1] = a[1] - b),
        (c[2] = a[2] + b),
        (c[3] = a[3] + b),
        c)
      : [a[0] - b, a[1] - b, a[2] + b, a[3] + b];
  }
  function Kb(a, b) {
    return b
      ? ((b[0] = a[0]), (b[1] = a[1]), (b[2] = a[2]), (b[3] = a[3]), b)
      : a.slice();
  }
  function Lb(a, b, c) {
    b = b < a[0] ? a[0] - b : a[2] < b ? b - a[2] : 0;
    a = c < a[1] ? a[1] - c : a[3] < c ? c - a[3] : 0;
    return b * b + a * a;
  }
  function Mb(a, b) {
    return Nb(a, b[0], b[1]);
  }
  function Ob(a, b) {
    return a[0] <= b[0] && b[2] <= a[2] && a[1] <= b[1] && b[3] <= a[3];
  }
  function Nb(a, b, c) {
    return a[0] <= b && b <= a[2] && a[1] <= c && c <= a[3];
  }
  function Qb(a, b) {
    var c = a[1],
      d = a[2],
      e = a[3],
      f = b[0],
      g = b[1],
      h = 0;
    f < a[0] ? (h |= 16) : f > d && (h |= 4);
    g < c ? (h |= 8) : g > e && (h |= 2);
    0 === h && (h = 1);
    return h;
  }
  function Hb() {
    return [Infinity, Infinity, -Infinity, -Infinity];
  }
  function Rb(a, b, c, d, e) {
    return e
      ? ((e[0] = a), (e[1] = b), (e[2] = c), (e[3] = d), e)
      : [a, b, c, d];
  }
  function Sb(a, b) {
    var c = a[0],
      d = a[1];
    return Rb(c, d, c, d, b);
  }
  function Tb(a, b, c, d, e) {
    e = Rb(Infinity, Infinity, -Infinity, -Infinity, e);
    return Ub(e, a, b, c, d);
  }
  function Vb(a, b) {
    return a[0] == b[0] && a[2] == b[2] && a[1] == b[1] && a[3] == b[3];
  }
  function Wb(a, b) {
    b[0] < a[0] && (a[0] = b[0]);
    b[2] > a[2] && (a[2] = b[2]);
    b[1] < a[1] && (a[1] = b[1]);
    b[3] > a[3] && (a[3] = b[3]);
    return a;
  }
  function Ib(a, b) {
    b[0] < a[0] && (a[0] = b[0]);
    b[0] > a[2] && (a[2] = b[0]);
    b[1] < a[1] && (a[1] = b[1]);
    b[1] > a[3] && (a[3] = b[1]);
  }
  function Ub(a, b, c, d, e) {
    for (; c < d; c += e) {
      var f = a,
        g = b[c],
        h = b[c + 1];
      f[0] = Math.min(f[0], g);
      f[1] = Math.min(f[1], h);
      f[2] = Math.max(f[2], g);
      f[3] = Math.max(f[3], h);
    }
    return a;
  }
  function Xb(a, b, c) {
    var d;
    return (d = b.call(c, Yb(a))) ||
      (d = b.call(c, Zb(a))) ||
      (d = b.call(c, $b(a)))
      ? d
      : (d = b.call(c, ac(a)))
      ? d
      : !1;
  }
  function bc(a) {
    var b = 0;
    cc(a) || (b = dc(a) * ec(a));
    return b;
  }
  function Yb(a) {
    return [a[0], a[1]];
  }
  function Zb(a) {
    return [a[2], a[1]];
  }
  function gc(a) {
    return [(a[0] + a[2]) / 2, (a[1] + a[3]) / 2];
  }
  function hc(a, b, c, d, e) {
    var f = (b * d[0]) / 2;
    d = (b * d[1]) / 2;
    b = Math.cos(c);
    var g = Math.sin(c);
    c = f * b;
    f *= g;
    b *= d;
    var h = d * g,
      l = a[0],
      m = a[1];
    a = l - c + h;
    d = l - c - h;
    g = l + c - h;
    c = l + c + h;
    var h = m - f - b,
      l = m - f + b,
      p = m + f + b,
      f = m + f - b;
    return Rb(
      Math.min(a, d, g, c),
      Math.min(h, l, p, f),
      Math.max(a, d, g, c),
      Math.max(h, l, p, f),
      e
    );
  }
  function ec(a) {
    return a[3] - a[1];
  }
  function ic(a, b, c) {
    c = c ? c : Hb();
    jc(a, b) &&
      ((c[0] = a[0] > b[0] ? a[0] : b[0]),
      (c[1] = a[1] > b[1] ? a[1] : b[1]),
      (c[2] = a[2] < b[2] ? a[2] : b[2]),
      (c[3] = a[3] < b[3] ? a[3] : b[3]));
    return c;
  }
  function ac(a) {
    return [a[0], a[3]];
  }
  function $b(a) {
    return [a[2], a[3]];
  }
  function dc(a) {
    return a[2] - a[0];
  }
  function jc(a, b) {
    return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
  }
  function cc(a) {
    return a[2] < a[0] || a[3] < a[1];
  }
  function kc(a, b) {
    var c = ((a[2] - a[0]) / 2) * (b - 1),
      d = ((a[3] - a[1]) / 2) * (b - 1);
    a[0] -= c;
    a[2] += c;
    a[1] -= d;
    a[3] += d;
  }
  function lc(a, b, c) {
    a = [a[0], a[1], a[0], a[3], a[2], a[1], a[2], a[3]];
    b(a, a, 2);
    var d = [a[0], a[2], a[4], a[6]],
      e = [a[1], a[3], a[5], a[7]];
    b = Math.min.apply(null, d);
    a = Math.min.apply(null, e);
    d = Math.max.apply(null, d);
    e = Math.max.apply(null, e);
    return Rb(b, a, d, e, c);
  }
  function mc() {
    return !0;
  }
  function nc() {
    return !1;
  } /*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
  function oc(a) {
    this.radius = a;
  }
  oc.prototype.a = function(a) {
    for (
      var b = 0, c = a.length, d = a[c - 1][0], e = a[c - 1][1], f = 0;
      f < c;
      f++
    )
      var g = a[f][0],
        h = a[f][1],
        b = b + na(g - d) * (2 + Math.sin(na(e)) + Math.sin(na(h))),
        d = g,
        e = h;
    return (b * this.radius * this.radius) / 2;
  };
  oc.prototype.b = function(a, b) {
    var c = na(a[1]),
      d = na(b[1]),
      e = (d - c) / 2,
      f = na(b[0] - a[0]) / 2,
      c =
        Math.sin(e) * Math.sin(e) +
        Math.sin(f) * Math.sin(f) * Math.cos(c) * Math.cos(d);
    return 2 * this.radius * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
  };
  oc.prototype.offset = function(a, b, c) {
    var d = na(a[1]);
    b /= this.radius;
    var e = Math.asin(
      Math.sin(d) * Math.cos(b) + Math.cos(d) * Math.sin(b) * Math.cos(c)
    );
    return [
      (180 *
        (na(a[0]) +
          Math.atan2(
            Math.sin(c) * Math.sin(b) * Math.cos(d),
            Math.cos(b) - Math.sin(d) * Math.sin(e)
          ))) /
        Math.PI,
      (180 * e) / Math.PI
    ];
  };
  var pc = new oc(6370997);
  var qc = {};
  qc.degrees = (2 * Math.PI * pc.radius) / 360;
  qc.ft = 0.3048;
  qc.m = 1;
  qc["us-ft"] = 1200 / 3937;
  var rc = null;
  function sc(a) {
    this.hb = a.code;
    this.c = a.units;
    this.f = void 0 !== a.extent ? a.extent : null;
    this.i = void 0 !== a.worldExtent ? a.worldExtent : null;
    this.b = void 0 !== a.axisOrientation ? a.axisOrientation : "enu";
    this.g = void 0 !== a.global ? a.global : !1;
    this.a = !(!this.g || !this.f);
    this.l = a.getPointResolution;
    this.j = null;
    this.o = a.metersPerUnit;
    var b = a.code,
      c = rc || window.proj4;
    "function" == typeof c &&
      ((b = c.defs(b)),
      void 0 !== b &&
        (void 0 !== b.axis && void 0 === a.axisOrientation && (this.b = b.axis),
        void 0 === a.metersPerUnit && (this.o = b.to_meter),
        void 0 === a.units && (this.c = b.units)));
  }
  k = sc.prototype;
  k.Zj = function() {
    return this.hb;
  };
  k.G = function() {
    return this.f;
  };
  k.Eb = function() {
    return this.c;
  };
  k.ic = function() {
    return this.o || qc[this.c];
  };
  k.Jk = function() {
    return this.i;
  };
  k.rl = function() {
    return this.g;
  };
  k.hp = function(a) {
    this.g = a;
    this.a = !(!a || !this.f);
  };
  k.Sm = function(a) {
    this.f = a;
    this.a = !(!this.g || !a);
  };
  k.op = function(a) {
    this.i = a;
  };
  k.gp = function(a) {
    this.l = a;
  };
  var tc = {};
  var uc = {};
  function vc(a, b, c) {
    a = a.hb;
    b = b.hb;
    a in uc || (uc[a] = {});
    uc[a][b] = c;
  }
  function wc(a, b) {
    var c;
    a in uc && b in uc[a] && (c = uc[a][b]);
    return c;
  }
  function xc(a, b, c) {
    var d = a.l;
    d
      ? (b = d(b, c))
      : "degrees" != a.Eb() &&
        ((d = yc(a, zc("EPSG:4326"))),
        (b = [
          c[0] - b / 2,
          c[1],
          c[0] + b / 2,
          c[1],
          c[0],
          c[1] - b / 2,
          c[0],
          c[1] + b / 2
        ]),
        (b = d(b, b, 2)),
        (b =
          (pc.b(b.slice(0, 2), b.slice(2, 4)) +
            pc.b(b.slice(4, 6), b.slice(6, 8))) /
          2),
        (a = a.ic()),
        void 0 !== a && (b /= a));
    return b;
  }
  function Ac(a) {
    Bc(a);
    a.forEach(function(b) {
      a.forEach(function(a) {
        b !== a && vc(b, a, Cc);
      });
    });
  }
  function Dc() {
    var a = Ec,
      b = Fc,
      c = Gc;
    Hc.forEach(function(d) {
      a.forEach(function(a) {
        vc(d, a, b);
        vc(a, d, c);
      });
    });
  }
  function Ic(a) {
    tc[a.hb] = a;
    vc(a, a, Cc);
  }
  function Bc(a) {
    var b = [];
    a.forEach(function(a) {
      b.push(Ic(a));
    });
  }
  function Jc(a) {
    return a ? ("string" === typeof a ? zc(a) : a) : zc("EPSG:3857");
  }
  function Kc(a, b, c, d) {
    a = zc(a);
    b = zc(b);
    vc(a, b, Lc(c));
    vc(b, a, Lc(d));
  }
  function Lc(a) {
    return function(b, c, d) {
      var e = b.length;
      d = void 0 !== d ? d : 2;
      c = void 0 !== c ? c : Array(e);
      var f, g;
      for (g = 0; g < e; g += d)
        for (
          f = a([b[g], b[g + 1]]), c[g] = f[0], c[g + 1] = f[1], f = d - 1;
          2 <= f;
          --f
        )
          c[g + f] = b[g + f];
      return c;
    };
  }
  function zc(a) {
    var b = null;
    if (a instanceof sc) b = a;
    else if ("string" === typeof a) {
      var b = tc[a] || null,
        c = rc || window.proj4;
      b ||
        "function" != typeof c ||
        void 0 === c.defs(a) ||
        ((b = new sc({ code: a })), Ic(b));
    }
    return b;
  }
  function Mc(a, b) {
    if (a === b) return !0;
    var c = a.Eb() === b.Eb();
    return a.hb === b.hb ? c : yc(a, b) === Cc && c;
  }
  function Nc(a, b) {
    var c = zc(a),
      d = zc(b);
    return yc(c, d);
  }
  function yc(a, b) {
    var c = a.hb,
      d = b.hb,
      e = wc(c, d);
    if (!e) {
      var f = rc || window.proj4;
      if ("function" == typeof f) {
        var g = f.defs(c),
          h = f.defs(d);
        void 0 !== g &&
          void 0 !== h &&
          (g === h
            ? Ac([b, a])
            : ((e = f(d, c)), Kc(b, a, e.forward, e.inverse)),
          (e = wc(c, d)));
      }
    }
    e || (e = Oc);
    return e;
  }
  function Oc(a, b) {
    if (void 0 !== b && a !== b) {
      for (var c = 0, d = a.length; c < d; ++c) b[c] = a[c];
      a = b;
    }
    return a;
  }
  function Cc(a, b) {
    var c;
    if (void 0 !== b) {
      c = 0;
      for (var d = a.length; c < d; ++c) b[c] = a[c];
      c = b;
    } else c = a.slice();
    return c;
  }
  function Pc(a, b, c) {
    return Nc(b, c)(a, void 0, a.length);
  }
  function Qc(a, b, c) {
    b = Nc(b, c);
    return lc(a, b);
  }
  function Rc() {
    Sa.call(this);
    this.v = Hb();
    this.u = -1;
    this.i = {};
    this.o = this.j = 0;
  }
  v(Rc, Sa);
  k = Rc.prototype;
  k.Cb = function(a, b) {
    var c = b ? b : [NaN, NaN];
    this.Ab(a[0], a[1], c, Infinity);
    return c;
  };
  k.mb = function(a) {
    return this.Hc(a[0], a[1]);
  };
  k.Hc = nc;
  k.G = function(a) {
    this.u != this.g && ((this.v = this.Yd(this.v)), (this.u = this.g));
    var b = this.v;
    a ? ((a[0] = b[0]), (a[1] = b[1]), (a[2] = b[2]), (a[3] = b[3])) : (a = b);
    return a;
  };
  k.Jb = function(a) {
    return this.Bd(a * a);
  };
  k.ob = function(a, b) {
    this.sc(Nc(a, b));
    return this;
  };
  function Sc(a, b, c, d, e, f) {
    for (var g = f ? f : [], h = 0; b < c; b += d) {
      var l = a[b],
        m = a[b + 1];
      g[h++] = e[0] * l + e[2] * m + e[4];
      g[h++] = e[1] * l + e[3] * m + e[5];
    }
    f && g.length != h && (g.length = h);
    return g;
  }
  function Tc(a, b, c, d, e, f) {
    var g = f ? f : [],
      h = 0,
      l,
      m;
    for (l = 0; l < b; l += c)
      for (g[h++] = a[l] + d, g[h++] = a[l + 1] + e, m = l + 2; m < l + c; ++m)
        g[h++] = a[m];
    f && g.length != h && (g.length = h);
    return g;
  }
  function Uc() {
    Rc.call(this);
    this.ka = "XY";
    this.a = 2;
    this.B = null;
  }
  v(Uc, Rc);
  function Vc(a) {
    var b;
    "XY" == a
      ? (b = 2)
      : "XYZ" == a || "XYM" == a
      ? (b = 3)
      : "XYZM" == a && (b = 4);
    return b;
  }
  k = Uc.prototype;
  k.Hc = nc;
  k.Yd = function(a) {
    return Tb(this.B, 0, this.B.length, this.a, a);
  };
  k.Rb = function() {
    return this.B.slice(0, this.a);
  };
  k.ia = function() {
    return this.B;
  };
  k.Sb = function() {
    return this.B.slice(this.B.length - this.a);
  };
  k.Tb = function() {
    return this.ka;
  };
  k.Bd = function(a) {
    this.o != this.g && (ua(this.i), (this.j = 0), (this.o = this.g));
    if (0 > a || (0 !== this.j && a <= this.j)) return this;
    var b = a.toString();
    if (this.i.hasOwnProperty(b)) return this.i[b];
    var c = this.$c(a);
    if (c.ia().length < this.B.length) return (this.i[b] = c);
    this.j = a;
    return this;
  };
  k.$c = function() {
    return this;
  };
  k.pa = function() {
    return this.a;
  };
  function Xc(a, b, c) {
    a.a = Vc(b);
    a.ka = b;
    a.B = c;
  }
  function Yc(a, b, c, d) {
    if (b) c = Vc(b);
    else {
      for (b = 0; b < d; ++b) {
        if (0 === c.length) {
          a.ka = "XY";
          a.a = 2;
          return;
        }
        c = c[0];
      }
      c = c.length;
      var e;
      2 == c ? (e = "XY") : 3 == c ? (e = "XYZ") : 4 == c && (e = "XYZM");
      b = e;
    }
    a.ka = b;
    a.a = c;
  }
  k.sc = function(a) {
    this.B && (a(this.B, this.B, this.a), this.s());
  };
  k.rotate = function(a, b) {
    var c = this.ia();
    if (c) {
      for (
        var d = c.length,
          e = this.pa(),
          f = c ? c : [],
          g = Math.cos(a),
          h = Math.sin(a),
          l = b[0],
          m = b[1],
          p = 0,
          n = 0;
        n < d;
        n += e
      ) {
        var q = c[n] - l,
          r = c[n + 1] - m;
        f[p++] = l + q * g - r * h;
        f[p++] = m + q * h + r * g;
        for (q = n + 2; q < n + e; ++q) f[p++] = c[q];
      }
      c && f.length != p && (f.length = p);
      this.s();
    }
  };
  k.scale = function(a, b, c) {
    var d = b;
    void 0 === d && (d = a);
    var e = c;
    e || (e = gc(this.G()));
    if ((c = this.ia())) {
      b = c.length;
      for (
        var f = this.pa(), g = c ? c : [], h = e[0], e = e[1], l = 0, m = 0;
        m < b;
        m += f
      ) {
        var p = c[m] - h,
          n = c[m + 1] - e;
        g[l++] = h + a * p;
        g[l++] = e + d * n;
        for (p = m + 2; p < m + f; ++p) g[l++] = c[p];
      }
      c && g.length != l && (g.length = l);
      this.s();
    }
  };
  k.translate = function(a, b) {
    var c = this.ia();
    c && (Tc(c, c.length, this.pa(), a, b, c), this.s());
  };
  function Zc(a, b, c, d) {
    for (var e = 0, f = a[c - d], g = a[c - d + 1]; b < c; b += d)
      var h = a[b], l = a[b + 1], e = e + (g * h - f * l), f = h, g = l;
    return e / 2;
  }
  function $c(a, b, c, d) {
    var e = 0,
      f,
      g;
    f = 0;
    for (g = c.length; f < g; ++f) {
      var h = c[f],
        e = e + Zc(a, b, h, d);
      b = h;
    }
    return e;
  }
  function ad(a, b, c, d, e, f, g) {
    var h = a[b],
      l = a[b + 1],
      m = a[c] - h,
      p = a[c + 1] - l;
    if (0 !== m || 0 !== p)
      if (((f = ((e - h) * m + (f - l) * p) / (m * m + p * p)), 1 < f)) b = c;
      else if (0 < f) {
        for (e = 0; e < d; ++e) g[e] = pa(a[b + e], a[c + e], f);
        g.length = d;
        return;
      }
    for (e = 0; e < d; ++e) g[e] = a[b + e];
    g.length = d;
  }
  function bd(a, b, c, d, e) {
    var f = a[b],
      g = a[b + 1];
    for (b += d; b < c; b += d) {
      var h = a[b],
        l = a[b + 1],
        f = ma(f, g, h, l);
      f > e && (e = f);
      f = h;
      g = l;
    }
    return e;
  }
  function cd(a, b, c, d, e) {
    var f, g;
    f = 0;
    for (g = c.length; f < g; ++f) {
      var h = c[f];
      e = bd(a, b, h, d, e);
      b = h;
    }
    return e;
  }
  function dd(a, b, c, d, e, f, g, h, l, m, p) {
    if (b == c) return m;
    var n;
    if (0 === e) {
      n = ma(g, h, a[b], a[b + 1]);
      if (n < m) {
        for (p = 0; p < d; ++p) l[p] = a[b + p];
        l.length = d;
        return n;
      }
      return m;
    }
    for (var q = p ? p : [NaN, NaN], r = b + d; r < c; )
      if ((ad(a, r - d, r, d, g, h, q), (n = ma(g, h, q[0], q[1])), n < m)) {
        m = n;
        for (p = 0; p < d; ++p) l[p] = q[p];
        l.length = d;
        r += d;
      } else r += d * Math.max(((Math.sqrt(n) - Math.sqrt(m)) / e) | 0, 1);
    if (f && (ad(a, c - d, b, d, g, h, q), (n = ma(g, h, q[0], q[1])), n < m)) {
      m = n;
      for (p = 0; p < d; ++p) l[p] = q[p];
      l.length = d;
    }
    return m;
  }
  function ed(a, b, c, d, e, f, g, h, l, m, p) {
    p = p ? p : [NaN, NaN];
    var n, q;
    n = 0;
    for (q = c.length; n < q; ++n) {
      var r = c[n];
      m = dd(a, b, r, d, e, f, g, h, l, m, p);
      b = r;
    }
    return m;
  }
  function fd(a, b) {
    var c = 0,
      d,
      e;
    d = 0;
    for (e = b.length; d < e; ++d) a[c++] = b[d];
    return c;
  }
  function gd(a, b, c, d) {
    var e, f;
    e = 0;
    for (f = c.length; e < f; ++e) {
      var g = c[e],
        h;
      for (h = 0; h < d; ++h) a[b++] = g[h];
    }
    return b;
  }
  function hd(a, b, c, d, e) {
    e = e ? e : [];
    var f = 0,
      g,
      h;
    g = 0;
    for (h = c.length; g < h; ++g) (b = gd(a, b, c[g], d)), (e[f++] = b);
    e.length = f;
    return e;
  }
  function id(a, b, c, d, e) {
    e = void 0 !== e ? e : [];
    for (var f = 0; b < c; b += d) e[f++] = a.slice(b, b + d);
    e.length = f;
    return e;
  }
  function jd(a, b, c, d, e) {
    e = void 0 !== e ? e : [];
    var f = 0,
      g,
      h;
    g = 0;
    for (h = c.length; g < h; ++g) {
      var l = c[g];
      e[f++] = id(a, b, l, d, e[f]);
      b = l;
    }
    e.length = f;
    return e;
  }
  function kd(a, b, c, d, e, f, g) {
    var h = (c - b) / d;
    if (3 > h) {
      for (; b < c; b += d) (f[g++] = a[b]), (f[g++] = a[b + 1]);
      return g;
    }
    var l = Array(h);
    l[0] = 1;
    l[h - 1] = 1;
    c = [b, c - d];
    for (var m = 0, p; 0 < c.length; ) {
      var n = c.pop(),
        q = c.pop(),
        r = 0,
        u = a[q],
        w = a[q + 1],
        y = a[n],
        z = a[n + 1];
      for (p = q + d; p < n; p += d) {
        var A = la(a[p], a[p + 1], u, w, y, z);
        A > r && ((m = p), (r = A));
      }
      r > e &&
        ((l[(m - b) / d] = 1),
        q + d < m && c.push(q, m),
        m + d < n && c.push(m, n));
    }
    for (p = 0; p < h; ++p)
      l[p] && ((f[g++] = a[b + p * d]), (f[g++] = a[b + p * d + 1]));
    return g;
  }
  function ld(a, b, c, d, e, f, g, h) {
    var l, m;
    l = 0;
    for (m = c.length; l < m; ++l) {
      var p = c[l];
      a: {
        var n = a,
          q = p,
          r = d,
          u = e,
          w = f;
        if (b != q) {
          var y = u * Math.round(n[b] / u),
            z = u * Math.round(n[b + 1] / u);
          b += r;
          w[g++] = y;
          w[g++] = z;
          var A, O;
          do
            if (
              ((A = u * Math.round(n[b] / u)),
              (O = u * Math.round(n[b + 1] / u)),
              (b += r),
              b == q)
            ) {
              w[g++] = A;
              w[g++] = O;
              break a;
            }
          while (A == y && O == z);
          for (; b < q; ) {
            var Ja, ca;
            Ja = u * Math.round(n[b] / u);
            ca = u * Math.round(n[b + 1] / u);
            b += r;
            if (Ja != A || ca != O) {
              var Ma = A - y,
                D = O - z,
                La = Ja - y,
                kb = ca - z;
              (Ma * kb == D * La &&
                ((0 > Ma && La < Ma) || Ma == La || (0 < Ma && La > Ma)) &&
                ((0 > D && kb < D) || D == kb || (0 < D && kb > D))) ||
                ((w[g++] = A), (w[g++] = O), (y = A), (z = O));
              A = Ja;
              O = ca;
            }
          }
          w[g++] = A;
          w[g++] = O;
        }
      }
      h.push(g);
      b = p;
    }
    return g;
  }
  function md(a, b) {
    Uc.call(this);
    this.c = this.l = -1;
    this.qa(a, b);
  }
  v(md, Uc);
  k = md.prototype;
  k.clone = function() {
    var a = new md(null);
    nd(a, this.ka, this.B.slice());
    return a;
  };
  k.Ab = function(a, b, c, d) {
    if (d < Lb(this.G(), a, b)) return d;
    this.c != this.g &&
      ((this.l = Math.sqrt(bd(this.B, 0, this.B.length, this.a, 0))),
      (this.c = this.g));
    return dd(this.B, 0, this.B.length, this.a, this.l, !0, a, b, c, d);
  };
  k.rm = function() {
    return Zc(this.B, 0, this.B.length, this.a);
  };
  k.$ = function() {
    return id(this.B, 0, this.B.length, this.a);
  };
  k.$c = function(a) {
    var b = [];
    b.length = kd(this.B, 0, this.B.length, this.a, a, b, 0);
    a = new md(null);
    nd(a, "XY", b);
    return a;
  };
  k.Y = function() {
    return "LinearRing";
  };
  k.qa = function(a, b) {
    a
      ? (Yc(this, b, a, 1),
        this.B || (this.B = []),
        (this.B.length = gd(this.B, 0, a, this.a)),
        this.s())
      : nd(this, "XY", null);
  };
  function nd(a, b, c) {
    Xc(a, b, c);
    a.s();
  }
  function C(a, b) {
    Uc.call(this);
    this.qa(a, b);
  }
  v(C, Uc);
  k = C.prototype;
  k.clone = function() {
    var a = new C(null);
    a.da(this.ka, this.B.slice());
    return a;
  };
  k.Ab = function(a, b, c, d) {
    var e = this.B;
    a = ma(a, b, e[0], e[1]);
    if (a < d) {
      d = this.a;
      for (b = 0; b < d; ++b) c[b] = e[b];
      c.length = d;
      return a;
    }
    return d;
  };
  k.$ = function() {
    return this.B ? this.B.slice() : [];
  };
  k.Yd = function(a) {
    return Sb(this.B, a);
  };
  k.Y = function() {
    return "Point";
  };
  k.Ta = function(a) {
    return Nb(a, this.B[0], this.B[1]);
  };
  k.qa = function(a, b) {
    a
      ? (Yc(this, b, a, 0),
        this.B || (this.B = []),
        (this.B.length = fd(this.B, a)),
        this.s())
      : this.da("XY", null);
  };
  k.da = function(a, b) {
    Xc(this, a, b);
    this.s();
  };
  function pd(a, b, c, d, e) {
    return !Xb(e, function(e) {
      return !qd(a, b, c, d, e[0], e[1]);
    });
  }
  function qd(a, b, c, d, e, f) {
    for (var g = 0, h = a[c - d], l = a[c - d + 1]; b < c; b += d) {
      var m = a[b],
        p = a[b + 1];
      l <= f
        ? p > f && 0 < (m - h) * (f - l) - (e - h) * (p - l) && g++
        : p <= f && 0 > (m - h) * (f - l) - (e - h) * (p - l) && g--;
      h = m;
      l = p;
    }
    return 0 !== g;
  }
  function rd(a, b, c, d, e, f) {
    if (0 === c.length || !qd(a, b, c[0], d, e, f)) return !1;
    var g;
    b = 1;
    for (g = c.length; b < g; ++b)
      if (qd(a, c[b - 1], c[b], d, e, f)) return !1;
    return !0;
  }
  function sd(a, b, c, d, e, f, g) {
    var h,
      l,
      m,
      p,
      n,
      q = e[f + 1],
      r = [],
      u = c[0];
    m = a[u - d];
    n = a[u - d + 1];
    for (h = b; h < u; h += d) {
      p = a[h];
      l = a[h + 1];
      if ((q <= n && l <= q) || (n <= q && q <= l))
        (m = ((q - n) / (l - n)) * (p - m) + m), r.push(m);
      m = p;
      n = l;
    }
    u = NaN;
    n = -Infinity;
    r.sort(Ya);
    m = r[0];
    h = 1;
    for (l = r.length; h < l; ++h) {
      p = r[h];
      var w = Math.abs(p - m);
      w > n && ((m = (m + p) / 2), rd(a, b, c, d, m, q) && ((u = m), (n = w)));
      m = p;
    }
    isNaN(u) && (u = e[f]);
    return g ? (g.push(u, q), g) : [u, q];
  }
  function td(a, b, c, d, e, f) {
    for (var g = [a[b], a[b + 1]], h = [], l; b + d < c; b += d) {
      h[0] = a[b + d];
      h[1] = a[b + d + 1];
      if ((l = e.call(f, g, h))) return l;
      g[0] = h[0];
      g[1] = h[1];
    }
    return !1;
  }
  function ud(a, b, c, d, e) {
    var f = Ub(Hb(), a, b, c, d);
    return jc(e, f)
      ? Ob(e, f) ||
        (f[0] >= e[0] && f[2] <= e[2]) ||
        (f[1] >= e[1] && f[3] <= e[3])
        ? !0
        : td(a, b, c, d, function(a, b) {
            var c = !1,
              d = Qb(e, a),
              f = Qb(e, b);
            if (1 === d || 1 === f) c = !0;
            else {
              var n = e[0],
                q = e[1],
                r = e[2],
                u = e[3],
                w = b[0],
                y = b[1],
                z = (y - a[1]) / (w - a[0]);
              f & 2 &&
                !(d & 2) &&
                ((c = w - (y - u) / z), (c = c >= n && c <= r));
              c ||
                !(f & 4) ||
                d & 4 ||
                ((c = y - (w - r) * z), (c = c >= q && c <= u));
              c ||
                !(f & 8) ||
                d & 8 ||
                ((c = w - (y - q) / z), (c = c >= n && c <= r));
              c ||
                !(f & 16) ||
                d & 16 ||
                ((c = y - (w - n) * z), (c = c >= q && c <= u));
            }
            return c;
          })
      : !1;
  }
  function vd(a, b, c, d, e) {
    var f = c[0];
    if (
      !(
        ud(a, b, f, d, e) ||
        qd(a, b, f, d, e[0], e[1]) ||
        qd(a, b, f, d, e[0], e[3]) ||
        qd(a, b, f, d, e[2], e[1]) ||
        qd(a, b, f, d, e[2], e[3])
      )
    )
      return !1;
    if (1 === c.length) return !0;
    b = 1;
    for (f = c.length; b < f; ++b) if (pd(a, c[b - 1], c[b], d, e)) return !1;
    return !0;
  }
  function wd(a, b, c, d) {
    for (var e = 0, f = a[c - d], g = a[c - d + 1]; b < c; b += d)
      var h = a[b], l = a[b + 1], e = e + (h - f) * (l + g), f = h, g = l;
    return 0 < e;
  }
  function xd(a, b, c, d) {
    var e = 0;
    d = void 0 !== d ? d : !1;
    var f, g;
    f = 0;
    for (g = b.length; f < g; ++f) {
      var h = b[f],
        e = wd(a, e, h, c);
      if (0 === f) {
        if ((d && e) || (!d && !e)) return !1;
      } else if ((d && !e) || (!d && e)) return !1;
      e = h;
    }
    return !0;
  }
  function yd(a, b, c, d, e) {
    e = void 0 !== e ? e : !1;
    var f, g;
    f = 0;
    for (g = c.length; f < g; ++f) {
      var h = c[f],
        l = wd(a, b, h, d);
      if (0 === f ? (e && l) || (!e && !l) : (e && !l) || (!e && l))
        for (var l = a, m = h, p = d; b < m - p; ) {
          var n;
          for (n = 0; n < p; ++n) {
            var q = l[b + n];
            l[b + n] = l[m - p + n];
            l[m - p + n] = q;
          }
          b += p;
          m -= p;
        }
      b = h;
    }
    return b;
  }
  function zd(a, b, c, d) {
    var e = 0,
      f,
      g;
    f = 0;
    for (g = b.length; f < g; ++f) e = yd(a, e, b[f], c, d);
    return e;
  }
  function E(a, b) {
    Uc.call(this);
    this.c = [];
    this.A = -1;
    this.C = null;
    this.P = this.D = this.L = -1;
    this.l = null;
    this.qa(a, b);
  }
  v(E, Uc);
  k = E.prototype;
  k.Fj = function(a) {
    this.B ? bb(this.B, a.ia()) : (this.B = a.ia().slice());
    this.c.push(this.B.length);
    this.s();
  };
  k.clone = function() {
    var a = new E(null);
    a.da(this.ka, this.B.slice(), this.c.slice());
    return a;
  };
  k.Ab = function(a, b, c, d) {
    if (d < Lb(this.G(), a, b)) return d;
    this.D != this.g &&
      ((this.L = Math.sqrt(cd(this.B, 0, this.c, this.a, 0))),
      (this.D = this.g));
    return ed(this.B, 0, this.c, this.a, this.L, !0, a, b, c, d);
  };
  k.Hc = function(a, b) {
    return rd(this.Vb(), 0, this.c, this.a, a, b);
  };
  k.um = function() {
    return $c(this.Vb(), 0, this.c, this.a);
  };
  k.$ = function(a) {
    var b;
    void 0 !== a
      ? ((b = this.Vb().slice()), yd(b, 0, this.c, this.a, a))
      : (b = this.B);
    return jd(b, 0, this.c, this.a);
  };
  k.Kb = function() {
    return this.c;
  };
  function Ad(a) {
    if (a.A != a.g) {
      var b = gc(a.G());
      a.C = sd(a.Vb(), 0, a.c, a.a, b, 0);
      a.A = a.g;
    }
    return a.C;
  }
  k.ik = function() {
    return new C(Ad(this));
  };
  k.nk = function() {
    return this.c.length;
  };
  k.Qg = function(a) {
    if (0 > a || this.c.length <= a) return null;
    var b = new md(null);
    nd(b, this.ka, this.B.slice(0 === a ? 0 : this.c[a - 1], this.c[a]));
    return b;
  };
  k.Zc = function() {
    var a = this.ka,
      b = this.B,
      c = this.c,
      d = [],
      e = 0,
      f,
      g;
    f = 0;
    for (g = c.length; f < g; ++f) {
      var h = c[f],
        l = new md(null);
      nd(l, a, b.slice(e, h));
      d.push(l);
      e = h;
    }
    return d;
  };
  k.Vb = function() {
    if (this.P != this.g) {
      var a = this.B;
      xd(a, this.c, this.a)
        ? (this.l = a)
        : ((this.l = a.slice()),
          (this.l.length = yd(this.l, 0, this.c, this.a)));
      this.P = this.g;
    }
    return this.l;
  };
  k.$c = function(a) {
    var b = [],
      c = [];
    b.length = ld(this.B, 0, this.c, this.a, Math.sqrt(a), b, 0, c);
    a = new E(null);
    a.da("XY", b, c);
    return a;
  };
  k.Y = function() {
    return "Polygon";
  };
  k.Ta = function(a) {
    return vd(this.Vb(), 0, this.c, this.a, a);
  };
  k.qa = function(a, b) {
    if (a) {
      Yc(this, b, a, 2);
      this.B || (this.B = []);
      var c = hd(this.B, 0, a, this.a, this.c);
      this.B.length = 0 === c.length ? 0 : c[c.length - 1];
      this.s();
    } else this.da("XY", null, this.c);
  };
  k.da = function(a, b, c) {
    Xc(this, a, b);
    this.c = c;
    this.s();
  };
  function Bd(a, b, c, d) {
    var e = d ? d : 32;
    d = [];
    var f;
    for (f = 0; f < e; ++f) bb(d, a.offset(b, c, (2 * Math.PI * f) / e));
    d.push(d[0], d[1]);
    a = new E(null);
    a.da("XY", d, [d.length]);
    return a;
  }
  function Cd(a) {
    var b = a[0],
      c = a[1],
      d = a[2];
    a = a[3];
    b = [b, c, b, a, d, a, d, c, b, c];
    c = new E(null);
    c.da("XY", b, [b.length]);
    return c;
  }
  function Dd(a, b, c) {
    var d = b ? b : 32,
      e = a.pa();
    b = a.ka;
    for (
      var f = new E(null, b), d = e * (d + 1), e = Array(d), g = 0;
      g < d;
      g++
    )
      e[g] = 0;
    f.da(b, e, [e.length]);
    Ed(f, a.Fd(), a.qe(), c);
    return f;
  }
  function Ed(a, b, c, d) {
    var e = a.ia(),
      f = a.ka,
      g = a.pa(),
      h = a.Kb(),
      l = e.length / g - 1;
    d = d ? d : 0;
    for (var m, p, n = 0; n <= l; ++n)
      (p = n * g),
        (m = d + (2 * oa(n, l) * Math.PI) / l),
        (e[p] = b[0] + c * Math.cos(m)),
        (e[p + 1] = b[1] + c * Math.sin(m));
    a.da(f, e, h);
  }
  function Fd(a) {
    Sa.call(this);
    a = a || {};
    this.i = [0, 0];
    this.f = [];
    this.Pe = this.Pe.bind(this);
    var b = {};
    b[Gd] = void 0 !== a.center ? a.center : null;
    this.o = Jc(a.projection);
    var c,
      d,
      e,
      f = void 0 !== a.minZoom ? a.minZoom : 0;
    c = void 0 !== a.maxZoom ? a.maxZoom : 28;
    var g = void 0 !== a.zoomFactor ? a.zoomFactor : 2;
    if (void 0 !== a.resolutions)
      (c = a.resolutions), (d = c[0]), (e = c[c.length - 1]), (c = ib(c));
    else {
      d = Jc(a.projection);
      e = d.G();
      var h =
          (e ? Math.max(dc(e), ec(e)) : (360 * qc.degrees) / d.ic()) /
          256 /
          Math.pow(2, 0),
        l = h / Math.pow(2, 28);
      d = a.maxResolution;
      void 0 !== d ? (f = 0) : (d = h / Math.pow(g, f));
      e = a.minResolution;
      void 0 === e &&
        (e =
          void 0 !== a.maxZoom
            ? void 0 !== a.maxResolution
              ? d / Math.pow(g, c)
              : h / Math.pow(g, c)
            : l);
      c = f + Math.floor(Math.log(d / e) / Math.log(g));
      e = d / Math.pow(g, c - f);
      c = jb(g, d, c - f);
    }
    this.a = d;
    this.j = e;
    this.A = g;
    this.c = a.resolutions;
    this.l = f;
    f = void 0 !== a.extent ? qa(a.extent) : ra;
    (void 0 !== a.enableRotation
    ? a.enableRotation
    : 1)
      ? ((g = a.constrainRotation),
        (g =
          void 0 === g || !0 === g
            ? ob()
            : !1 === g
            ? mb
            : "number" === typeof g
            ? nb(g)
            : mb))
      : (g = lb);
    this.u = new sa(f, c, g);
    void 0 !== a.resolution
      ? (b[Hd] = a.resolution)
      : void 0 !== a.zoom &&
        (b[Hd] = this.constrainResolution(this.a, a.zoom - this.l));
    b[Id] = void 0 !== a.rotation ? a.rotation : 0;
    this.I(b);
  }
  v(Fd, Sa);
  k = Fd.prototype;
  k.animate = function(a) {
    var b = Date.now(),
      c = this.fb().slice(),
      d = this.Oa(),
      e = this.Ra(),
      f = arguments.length,
      g;
    1 < f &&
      "function" === typeof arguments[f - 1] &&
      ((g = arguments[f - 1]), --f);
    for (var h = [], l = 0; l < f; ++l) {
      var m = arguments[l],
        p = {
          start: b,
          complete: !1,
          anchor: m.anchor,
          duration: void 0 !== m.duration ? m.duration : 1e3,
          easing: m.easing || Db
        };
      m.center && ((p.fg = c), (p.hg = m.center), (c = p.hg));
      void 0 !== m.zoom
        ? ((p.Me = d),
          (p.Ne = this.constrainResolution(this.a, m.zoom - this.l, 0)),
          (d = p.Ne))
        : m.resolution && ((p.Me = d), (p.Ne = m.resolution), (d = p.Ne));
      void 0 !== m.rotation && ((p.gg = e), (p.Hi = m.rotation), (e = p.Hi));
      p.Vc = g;
      b += p.duration;
      h.push(p);
    }
    this.f.push(h);
    Jd(this, Kd, 1);
    this.Pe();
  };
  function Ld(a) {
    Jd(a, Kd, -Md(a)[Kd]);
    for (var b = 0, c = a.f.length; b < c; ++b) {
      var d = a.f[b];
      d[0].Vc && d[0].Vc(!1);
    }
    a.f.length = 0;
  }
  k.Pe = function() {
    void 0 !== this.v && (cancelAnimationFrame(this.v), (this.v = void 0));
    if (0 < Md(this)[Kd]) {
      for (var a = Date.now(), b = !1, c = this.f.length - 1; 0 <= c; --c) {
        for (var d = this.f[c], e = !0, f = 0, g = d.length; f < g; ++f) {
          var h = d[f];
          if (!h.complete) {
            b = a - h.start;
            b = 0 < h.duration ? b / h.duration : 1;
            1 <= b ? ((h.complete = !0), (b = 1)) : (e = !1);
            b = h.easing(b);
            if (h.fg) {
              var l = h.fg[0],
                m = h.fg[1];
              this.set(Gd, [l + b * (h.hg[0] - l), m + b * (h.hg[1] - m)]);
            }
            h.Me &&
              ((l = h.Me + b * (h.Ne - h.Me)),
              h.anchor && this.set(Gd, Nd(this, l, h.anchor)),
              this.set(Hd, l));
            void 0 !== h.gg &&
              ((b = h.gg + b * (h.Hi - h.gg)),
              h.anchor && this.set(Gd, Od(this, b, h.anchor)),
              this.set(Id, b));
            b = !0;
            if (!h.complete) break;
          }
        }
        e && ((this.f[c] = null), Jd(this, Kd, -1), (d = d[0].Vc) && d(!0));
      }
      this.f = this.f.filter(Boolean);
      b && void 0 === this.v && (this.v = requestAnimationFrame(this.Pe));
    }
  };
  function Od(a, b, c) {
    var d,
      e = a.fb();
    void 0 !== e &&
      ((d = [e[0] - c[0], e[1] - c[1]]), wb(d, b - a.Ra()), rb(d, c));
    return d;
  }
  function Nd(a, b, c) {
    var d,
      e = a.fb();
    a = a.Oa();
    void 0 !== e &&
      void 0 !== a &&
      (d = [c[0] - (b * (c[0] - e[0])) / a, c[1] - (b * (c[1] - e[1])) / a]);
    return d;
  }
  k.Zd = function(a) {
    return this.u.center(a);
  };
  k.constrainResolution = function(a, b, c) {
    return this.u.resolution(a, b || 0, c || 0);
  };
  k.constrainRotation = function(a, b) {
    return this.u.rotation(a, b || 0);
  };
  k.fb = function() {
    return this.get(Gd);
  };
  function Md(a, b) {
    return void 0 !== b ? ((b[0] = a.i[0]), (b[1] = a.i[1]), b) : a.i.slice();
  }
  k.Uc = function(a) {
    var b = this.fb();
    ha(b, 1);
    var c = this.Oa();
    ha(void 0 !== c, 2);
    var d = this.Ra();
    ha(void 0 !== d, 3);
    return hc(b, c, d, a);
  };
  k.Zl = function() {
    return this.a;
  };
  k.$l = function() {
    return this.j;
  };
  k.am = function() {
    return this.o;
  };
  k.Oa = function() {
    return this.get(Hd);
  };
  k.bm = function() {
    return this.c;
  };
  function Pd(a, b) {
    return Math.max(dc(a) / b[0], ec(a) / b[1]);
  }
  function Qd(a) {
    var b = a.a,
      c = Math.log(b / a.j) / Math.log(2);
    return function(a) {
      return b / Math.pow(2, a * c);
    };
  }
  k.Ra = function() {
    return this.get(Id);
  };
  function Rd(a) {
    var b = a.a,
      c = Math.log(b / a.j) / Math.log(2);
    return function(a) {
      return Math.log(b / a) / Math.log(2) / c;
    };
  }
  k.W = function() {
    var a = this.fb(),
      b = this.o,
      c = this.Oa(),
      d = this.Ra();
    return {
      center: a.slice(),
      projection: void 0 !== b ? b : null,
      resolution: c,
      rotation: d
    };
  };
  k.Kk = function() {
    var a,
      b = this.Oa();
    if (void 0 !== b && b >= this.j && b <= this.a) {
      a = this.l || 0;
      var c, d;
      if (this.c) {
        d = $a(this.c, b, 1);
        a += d;
        if (d == this.c.length - 1) return a;
        c = this.c[d];
        d = c / this.c[d + 1];
      } else (c = this.a), (d = this.A);
      a += Math.log(c / b) / Math.log(d);
    }
    return a;
  };
  k.lf = function(a, b, c) {
    a instanceof Uc || (ha(Array.isArray(a), 24), ha(!cc(a), 25), (a = Cd(a)));
    c = c || {};
    var d = void 0 !== c.padding ? c.padding : [0, 0, 0, 0],
      e = void 0 !== c.constrainResolution ? c.constrainResolution : !0,
      f = void 0 !== c.nearest ? c.nearest : !1,
      g;
    void 0 !== c.minResolution
      ? (g = c.minResolution)
      : void 0 !== c.maxZoom
      ? (g = this.constrainResolution(this.a, c.maxZoom - this.l, 0))
      : (g = 0);
    var h = a.ia(),
      l = this.Ra(),
      m = Math.cos(-l),
      l = Math.sin(-l),
      p = Infinity,
      n = Infinity,
      q = -Infinity,
      r = -Infinity;
    a = a.pa();
    for (var u = 0, w = h.length; u < w; u += a)
      var y = h[u] * m - h[u + 1] * l,
        z = h[u] * l + h[u + 1] * m,
        p = Math.min(p, y),
        n = Math.min(n, z),
        q = Math.max(q, y),
        r = Math.max(r, z);
    b = Pd([p, n, q, r], [b[0] - d[1] - d[3], b[1] - d[0] - d[2]]);
    b = isNaN(b) ? g : Math.max(b, g);
    e &&
      ((g = this.constrainResolution(b, 0, 0)),
      !f && g < b && (g = this.constrainResolution(g, -1, 0)),
      (b = g));
    l = -l;
    f = (p + q) / 2 + ((d[1] - d[3]) / 2) * b;
    d = (n + r) / 2 + ((d[0] - d[2]) / 2) * b;
    m = [f * m - d * l, d * m + f * l];
    void 0 !== c.duration
      ? this.animate({
          resolution: b,
          center: m,
          duration: c.duration,
          easing: c.easing
        })
      : (this.Oc(b), this.Mb(m));
  };
  k.Kj = function(a, b, c) {
    var d = this.Ra(),
      e = Math.cos(-d),
      d = Math.sin(-d),
      f = a[0] * e - a[1] * d;
    a = a[1] * e + a[0] * d;
    var g = this.Oa(),
      f = f + (b[0] / 2 - c[0]) * g;
    a += (c[1] - b[1] / 2) * g;
    d = -d;
    this.Mb([f * e - a * d, a * e + f * d]);
  };
  function Sd(a) {
    return !!a.fb() && void 0 !== a.Oa();
  }
  k.rotate = function(a, b) {
    if (void 0 !== b) {
      var c = Od(this, a, b);
      this.Mb(c);
    }
    this.pe(a);
  };
  k.Mb = function(a) {
    this.set(Gd, a);
    0 < Md(this)[Kd] && Ld(this);
  };
  function Jd(a, b, c) {
    a.i[b] += c;
    a.s();
  }
  k.Oc = function(a) {
    this.set(Hd, a);
    0 < Md(this)[Kd] && Ld(this);
  };
  k.pe = function(a) {
    this.set(Id, a);
    0 < Md(this)[Kd] && Ld(this);
  };
  k.pp = function(a) {
    a = this.constrainResolution(this.a, a - this.l, 0);
    this.Oc(a);
  };
  var Gd = "center",
    Hd = "resolution",
    Id = "rotation",
    Kd = 0;
  function Td(a, b, c, d) {
    this.ea = a;
    this.ca = b;
    this.ga = c;
    this.ja = d;
  }
  function Ud(a, b, c) {
    return a.ea <= b && b <= a.ca && a.ga <= c && c <= a.ja;
  }
  function Vd(a, b) {
    return a.ea == b.ea && a.ga == b.ga && a.ca == b.ca && a.ja == b.ja;
  }
  function Wd(a, b) {
    return a.ea <= b.ca && a.ca >= b.ea && a.ga <= b.ja && a.ja >= b.ga;
  }
  function Xd(a, b, c) {
    void 0 === c && (c = [0, 0]);
    c[0] = a[0] + 2 * b;
    c[1] = a[1] + 2 * b;
    return c;
  }
  function Yd(a, b, c) {
    void 0 === c && (c = [0, 0]);
    c[0] = (a[0] * b + 0.5) | 0;
    c[1] = (a[1] * b + 0.5) | 0;
    return c;
  }
  function Zd(a, b) {
    if (Array.isArray(a)) return a;
    void 0 === b ? (b = [a, a]) : (b[0] = b[1] = a);
    return b;
  }
  function $d(a, b, c, d) {
    return void 0 !== d ? ((d[0] = a), (d[1] = b), (d[2] = c), d) : [a, b, c];
  }
  function ae(a) {
    var b = a[0],
      c = Array(b),
      d = 1 << (b - 1),
      e,
      f;
    for (e = 0; e < b; ++e)
      (f = 48),
        a[1] & d && (f += 1),
        a[2] & d && (f += 2),
        (c[e] = String.fromCharCode(f)),
        (d >>= 1);
    return c.join("");
  }
  function be(a) {
    this.minZoom = void 0 !== a.minZoom ? a.minZoom : 0;
    this.b = a.resolutions;
    ha(
      hb(this.b, function(a, b) {
        return b - a;
      }),
      17
    );
    this.maxZoom = this.b.length - 1;
    this.g = void 0 !== a.origin ? a.origin : null;
    this.f = null;
    void 0 !== a.origins &&
      ((this.f = a.origins), ha(this.f.length == this.b.length, 20));
    var b = a.extent;
    void 0 === b || this.g || this.f || (this.g = ac(b));
    ha((!this.g && this.f) || (this.g && !this.f), 18);
    this.c = null;
    void 0 !== a.tileSizes &&
      ((this.c = a.tileSizes), ha(this.c.length == this.b.length, 19));
    this.i = void 0 !== a.tileSize ? a.tileSize : this.c ? null : 256;
    ha((!this.i && this.c) || (this.i && !this.c), 22);
    this.v = void 0 !== b ? b : null;
    this.a = null;
    this.j = [0, 0];
    void 0 !== a.sizes
      ? (this.a = a.sizes.map(function(a) {
          return new Td(
            Math.min(0, a[0]),
            Math.max(a[0] - 1, -1),
            Math.min(0, a[1]),
            Math.max(a[1] - 1, -1)
          );
        }, this))
      : b && ce(this, b);
  }
  var ee = [0, 0, 0];
  k = be.prototype;
  k.Hg = function(a, b, c) {
    a = fe(this, a, b);
    for (var d = a.ea, e = a.ca; d <= e; ++d)
      for (var f = a.ga, g = a.ja; f <= g; ++f) c([b, d, f]);
  };
  function ge(a, b, c, d, e) {
    e = a.Na(b, e);
    for (b = b[0] - 1; b >= a.minZoom; ) {
      if (c.call(null, b, fe(a, e, b, d))) return !0;
      --b;
    }
    return !1;
  }
  k.G = function() {
    return this.v;
  };
  k.Rg = function() {
    return this.maxZoom;
  };
  k.Sg = function() {
    return this.minZoom;
  };
  k.Kc = function(a) {
    return this.g ? this.g : this.f[a];
  };
  k.Ha = function(a) {
    return this.b[a];
  };
  k.Wh = function() {
    return this.b;
  };
  function he(a, b, c, d) {
    return b[0] < a.maxZoom ? ((d = a.Na(b, d)), fe(a, d, b[0] + 1, c)) : null;
  }
  function ie(a, b, c, d) {
    je(a, b[0], b[1], c, !1, ee);
    var e = ee[1],
      f = ee[2];
    je(a, b[2], b[3], c, !0, ee);
    a = ee[1];
    b = ee[2];
    void 0 !== d
      ? ((d.ea = e), (d.ca = a), (d.ga = f), (d.ja = b))
      : (d = new Td(e, a, f, b));
    return d;
  }
  function fe(a, b, c, d) {
    c = a.Ha(c);
    return ie(a, b, c, d);
  }
  function ke(a, b) {
    var c = a.Kc(b[0]),
      d = a.Ha(b[0]),
      e = Zd(a.Za(b[0]), a.j);
    return [c[0] + (b[1] + 0.5) * e[0] * d, c[1] + (b[2] + 0.5) * e[1] * d];
  }
  k.Na = function(a, b) {
    var c = this.Kc(a[0]),
      d = this.Ha(a[0]),
      e = Zd(this.Za(a[0]), this.j),
      f = c[0] + a[1] * e[0] * d,
      c = c[1] + a[2] * e[1] * d;
    return Rb(f, c, f + e[0] * d, c + e[1] * d, b);
  };
  k.fe = function(a, b, c) {
    return je(this, a[0], a[1], b, !1, c);
  };
  function je(a, b, c, d, e, f) {
    var g = a.Ec(d),
      h = d / a.Ha(g),
      l = a.Kc(g);
    a = Zd(a.Za(g), a.j);
    b = (h * Math.floor((b - l[0]) / d + (e ? 0.5 : 0))) / a[0];
    c = (h * Math.floor((c - l[1]) / d + (e ? 0 : 0.5))) / a[1];
    e
      ? ((b = Math.ceil(b) - 1), (c = Math.ceil(c) - 1))
      : ((b = Math.floor(b)), (c = Math.floor(c)));
    return $d(g, b, c, f);
  }
  k.wf = function(a, b, c) {
    b = this.Ha(b);
    return je(this, a[0], a[1], b, !1, c);
  };
  k.Za = function(a) {
    return this.i ? this.i : this.c[a];
  };
  k.Ec = function(a, b) {
    return ia($a(this.b, a, b || 0), this.minZoom, this.maxZoom);
  };
  function ce(a, b) {
    for (var c = a.b.length, d = Array(c), e = a.minZoom; e < c; ++e)
      d[e] = fe(a, b, e);
    a.a = d;
  }
  function le(a) {
    var b = a.j;
    if (!b) {
      var b = me(a),
        c = ne(b, void 0, void 0),
        b = new be({
          extent: b,
          origin: ac(b),
          resolutions: c,
          tileSize: void 0
        });
      a.j = b;
    }
    return b;
  }
  function oe(a) {
    var b = {};
    ta(b, void 0 !== a ? a : {});
    void 0 === b.extent && (b.extent = zc("EPSG:3857").G());
    b.resolutions = ne(b.extent, b.maxZoom, b.tileSize);
    delete b.maxZoom;
    return new be(b);
  }
  function ne(a, b, c) {
    b = void 0 !== b ? b : 42;
    var d = ec(a);
    a = dc(a);
    c = Zd(void 0 !== c ? c : 256);
    c = Math.max(a / c[0], d / c[1]);
    b += 1;
    d = Array(b);
    for (a = 0; a < b; ++a) d[a] = c / Math.pow(2, a);
    return d;
  }
  function me(a) {
    a = zc(a);
    var b = a.G();
    b || ((a = (180 * qc.degrees) / a.ic()), (b = Rb(-a, -a, a, a)));
    return b;
  }
  function pe(a) {
    this.b = a.html;
    this.a = a.tileRanges ? a.tileRanges : null;
  }
  pe.prototype.g = function() {
    return this.b;
  };
  function qe(a) {
    Sa.call(this);
    this.a = a ? a : [];
    re(this);
  }
  v(qe, Sa);
  k = qe.prototype;
  k.clear = function() {
    for (; 0 < this.Ub(); ) this.pop();
  };
  k.Bf = function(a) {
    var b, c;
    b = 0;
    for (c = a.length; b < c; ++b) this.push(a[b]);
    return this;
  };
  k.forEach = function(a, b) {
    this.a.forEach(a, b);
  };
  k.Il = function() {
    return this.a;
  };
  k.item = function(a) {
    return this.a[a];
  };
  k.Ub = function() {
    return this.get(se);
  };
  k.ke = function(a, b) {
    this.a.splice(a, 0, b);
    re(this);
    this.b(new te(ue, b));
  };
  k.pop = function() {
    return this.Zf(this.Ub() - 1);
  };
  k.push = function(a) {
    var b = this.Ub();
    this.ke(b, a);
    return this.Ub();
  };
  k.remove = function(a) {
    var b = this.a,
      c,
      d;
    c = 0;
    for (d = b.length; c < d; ++c) if (b[c] === a) return this.Zf(c);
  };
  k.Zf = function(a) {
    var b = this.a[a];
    this.a.splice(a, 1);
    re(this);
    this.b(new te(ve, b));
    return b;
  };
  k.ep = function(a, b) {
    var c = this.Ub();
    if (a < c)
      (c = this.a[a]),
        (this.a[a] = b),
        this.b(new te(ve, c)),
        this.b(new te(ue, b));
    else {
      for (; c < a; ++c) this.ke(c, void 0);
      this.ke(a, b);
    }
  };
  function re(a) {
    a.set(se, a.a.length);
  }
  var se = "length",
    ue = "add",
    ve = "remove";
  function te(a, b) {
    Ia.call(this, a);
    this.element = b;
  }
  v(te, Ia);
  var we = /^#(?:[0-9a-f]{3}){1,2}$/i,
    xe = /^([a-z]*)$/i;
  function ye(a) {
    return Array.isArray(a) ? a : ze(a);
  }
  function Ae(a) {
    if ("string" !== typeof a) {
      var b = a[0];
      b != (b | 0) && (b = (b + 0.5) | 0);
      var c = a[1];
      c != (c | 0) && (c = (c + 0.5) | 0);
      var d = a[2];
      d != (d | 0) && (d = (d + 0.5) | 0);
      a =
        "rgba(" +
        b +
        "," +
        c +
        "," +
        d +
        "," +
        (void 0 === a[3] ? 1 : a[3]) +
        ")";
    }
    return a;
  }
  var ze = (function() {
    var a = {},
      b = 0;
    return function(c) {
      var d;
      if (a.hasOwnProperty(c)) d = a[c];
      else {
        if (1024 <= b) {
          d = 0;
          for (var e in a) 0 === (d++ & 3) && (delete a[e], --b);
        }
        d = c;
        var f;
        xe.exec(d) &&
          ((e = document.createElement("div")),
          (e.style.color = d),
          document.body.appendChild(e),
          (d = getComputedStyle(e).color),
          document.body.removeChild(e));
        if (we.exec(d)) {
          f = d.length - 1;
          ha(3 == f || 6 == f, 54);
          var g = 3 == f ? 1 : 2;
          f = parseInt(d.substr(1 + 0 * g, g), 16);
          e = parseInt(d.substr(1 + 1 * g, g), 16);
          d = parseInt(d.substr(1 + 2 * g, g), 16);
          1 == g &&
            ((f = (f << 4) + f), (e = (e << 4) + e), (d = (d << 4) + d));
          f = [f, e, d, 1];
        } else
          0 == d.indexOf("rgba(")
            ? ((d = d
                .slice(5, -1)
                .split(",")
                .map(Number)),
              (f = Be(d)))
            : 0 == d.indexOf("rgb(")
            ? ((d = d
                .slice(4, -1)
                .split(",")
                .map(Number)),
              d.push(1),
              (f = Be(d)))
            : ha(!1, 14);
        d = f;
        a[c] = d;
        ++b;
      }
      return d;
    };
  })();
  function Be(a) {
    var b = [];
    b[0] = ia((a[0] + 0.5) | 0, 0, 255);
    b[1] = ia((a[1] + 0.5) | 0, 0, 255);
    b[2] = ia((a[2] + 0.5) | 0, 0, 255);
    b[3] = ia(a[3], 0, 1);
    return b;
  }
  function Ce(a) {
    return "string" === typeof a ||
      a instanceof CanvasPattern ||
      a instanceof CanvasGradient
      ? a
      : Ae(a);
  }
  function De(a, b) {
    var c = document.createElement("CANVAS");
    a && (c.width = a);
    b && (c.height = b);
    return c.getContext("2d");
  }
  function Ee(a, b) {
    var c = b.parentNode;
    c && c.replaceChild(a, b);
  }
  function Fe(a) {
    a && a.parentNode && a.parentNode.removeChild(a);
  }
  function Ge(a, b, c) {
    Ia.call(this, a);
    this.map = b;
    this.frameState = void 0 !== c ? c : null;
  }
  v(Ge, Ia);
  function Ie(a) {
    Sa.call(this);
    this.element = a.element ? a.element : null;
    this.a = this.P = null;
    this.v = [];
    this.render = a.render ? a.render : ea;
    a.target && this.c(a.target);
  }
  v(Ie, Sa);
  Ie.prototype.oa = function() {
    Fe(this.element);
    Sa.prototype.oa.call(this);
  };
  Ie.prototype.i = function() {
    return this.a;
  };
  Ie.prototype.setMap = function(a) {
    this.a && Fe(this.element);
    for (var b = 0, c = this.v.length; b < c; ++b) ya(this.v[b]);
    this.v.length = 0;
    if ((this.a = a))
      (this.P ? this.P : a.u).appendChild(this.element),
        this.render !== ea &&
          this.v.push(B(a, "postrender", this.render, this)),
        a.render();
  };
  Ie.prototype.c = function(a) {
    this.P = "string" === typeof a ? document.getElementById(a) : a;
  };
  function Je(a) {
    a = a ? a : {};
    this.L = document.createElement("UL");
    this.u = document.createElement("LI");
    this.L.appendChild(this.u);
    this.u.style.display = "none";
    this.f = void 0 !== a.collapsed ? a.collapsed : !0;
    this.l = void 0 !== a.collapsible ? a.collapsible : !0;
    this.l || (this.f = !1);
    var b = void 0 !== a.className ? a.className : "ol-attribution",
      c = void 0 !== a.tipLabel ? a.tipLabel : "Attributions",
      d = void 0 !== a.collapseLabel ? a.collapseLabel : "\u00bb";
    "string" === typeof d
      ? ((this.A = document.createElement("span")), (this.A.textContent = d))
      : (this.A = d);
    d = void 0 !== a.label ? a.label : "i";
    "string" === typeof d
      ? ((this.C = document.createElement("span")), (this.C.textContent = d))
      : (this.C = d);
    var e = this.l && !this.f ? this.A : this.C,
      d = document.createElement("button");
    d.setAttribute("type", "button");
    d.title = c;
    d.appendChild(e);
    B(d, "click", this.em, this);
    c = document.createElement("div");
    c.className =
      b +
      " ol-unselectable ol-control" +
      (this.f && this.l ? " ol-collapsed" : "") +
      (this.l ? "" : " ol-uncollapsible");
    c.appendChild(this.L);
    c.appendChild(d);
    Ie.call(this, {
      element: c,
      render: a.render ? a.render : Ke,
      target: a.target
    });
    this.D = !0;
    this.o = {};
    this.j = {};
    this.U = {};
  }
  v(Je, Ie);
  function Ke(a) {
    if ((a = a.frameState)) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        l,
        m,
        p,
        n,
        q = a.layerStatesArray,
        r = ta({}, a.attributions),
        u = {},
        w = {},
        y = a.viewState.projection;
      c = 0;
      for (b = q.length; c < b; c++)
        if ((g = q[c].layer.la()))
          if (((p = x(g).toString()), (m = g.j)))
            for (d = 0, e = m.length; d < e; d++)
              if (((h = m[d]), (l = x(h).toString()), !(l in r))) {
                if ((f = a.usedTiles[p])) {
                  var z = g.Db(y);
                  a: {
                    n = h;
                    var A = y;
                    if (n.a) {
                      var O,
                        Ja,
                        ca,
                        Ma = void 0;
                      for (Ma in f)
                        if (Ma in n.a) {
                          ca = f[Ma];
                          var D;
                          O = 0;
                          for (Ja = n.a[Ma].length; O < Ja; ++O) {
                            D = n.a[Ma][O];
                            if (Wd(D, ca)) {
                              n = !0;
                              break a;
                            }
                            var La = fe(z, me(A), parseInt(Ma, 10)),
                              kb = La.ca - La.ea + 1;
                            if (ca.ea < La.ea || ca.ca > La.ca)
                              if (
                                Wd(
                                  D,
                                  new Td(
                                    oa(ca.ea, kb),
                                    oa(ca.ca, kb),
                                    ca.ga,
                                    ca.ja
                                  )
                                ) ||
                                (ca.ca - ca.ea + 1 > kb && Wd(D, La))
                              ) {
                                n = !0;
                                break a;
                              }
                          }
                        }
                      n = !1;
                    } else n = !0;
                  }
                } else n = !1;
                n
                  ? (l in u && delete u[l],
                    (n = h.b),
                    n in w || ((w[n] = !0), (r[l] = h)))
                  : (u[l] = h);
              }
      b = [r, u];
      c = b[0];
      b = b[1];
      for (var W in this.o)
        W in c
          ? (this.j[W] || ((this.o[W].style.display = ""), (this.j[W] = !0)),
            delete c[W])
          : W in b
          ? (this.j[W] &&
              ((this.o[W].style.display = "none"), delete this.j[W]),
            delete b[W])
          : (Fe(this.o[W]), delete this.o[W], delete this.j[W]);
      for (W in c)
        (d = document.createElement("LI")),
          (d.innerHTML = c[W].b),
          this.L.appendChild(d),
          (this.o[W] = d),
          (this.j[W] = !0);
      for (W in b)
        (d = document.createElement("LI")),
          (d.innerHTML = b[W].b),
          (d.style.display = "none"),
          this.L.appendChild(d),
          (this.o[W] = d);
      W = !wa(this.j) || !wa(a.logos);
      this.D != W &&
        ((this.element.style.display = W ? "" : "none"), (this.D = W));
      W && wa(this.j)
        ? this.element.classList.add("ol-logo-only")
        : this.element.classList.remove("ol-logo-only");
      var Ra;
      a = a.logos;
      W = this.U;
      for (Ra in W) Ra in a || (Fe(W[Ra]), delete W[Ra]);
      for (var Pb in a)
        (b = a[Pb]),
          b instanceof HTMLElement && (this.u.appendChild(b), (W[Pb] = b)),
          Pb in W ||
            ((Ra = new Image()),
            (Ra.src = Pb),
            "" === b
              ? (c = Ra)
              : ((c = document.createElement("a")),
                (c.href = b),
                c.appendChild(Ra)),
            this.u.appendChild(c),
            (W[Pb] = c));
      this.u.style.display = wa(a) ? "none" : "";
    } else this.D && ((this.element.style.display = "none"), (this.D = !1));
  }
  k = Je.prototype;
  k.em = function(a) {
    a.preventDefault();
    Le(this);
  };
  function Le(a) {
    a.element.classList.toggle("ol-collapsed");
    a.f ? Ee(a.A, a.C) : Ee(a.C, a.A);
    a.f = !a.f;
  }
  k.dm = function() {
    return this.l;
  };
  k.gm = function(a) {
    this.l !== a &&
      ((this.l = a),
      this.element.classList.toggle("ol-uncollapsible"),
      !a && this.f && Le(this));
  };
  k.fm = function(a) {
    this.l && this.f !== a && Le(this);
  };
  k.cm = function() {
    return this.f;
  };
  function Me(a) {
    a = a ? a : {};
    this.f = void 0 !== a.className ? a.className : "ol-full-screen";
    var b = void 0 !== a.label ? a.label : "\u2922";
    this.l = "string" === typeof b ? document.createTextNode(b) : b;
    b = void 0 !== a.labelActive ? a.labelActive : "\u00d7";
    this.o = "string" === typeof b ? document.createTextNode(b) : b;
    var c = a.tipLabel ? a.tipLabel : "Toggle full-screen",
      b = document.createElement("button");
    b.className = this.f + "-" + Ne();
    b.setAttribute("type", "button");
    b.title = c;
    b.appendChild(this.l);
    B(b, "click", this.C, this);
    c = document.createElement("div");
    c.className =
      this.f + " ol-unselectable ol-control " + (Oe() ? "" : "ol-unsupported");
    c.appendChild(b);
    Ie.call(this, { element: c, target: a.target });
    this.A = void 0 !== a.keys ? a.keys : !1;
    this.j = a.source;
  }
  v(Me, Ie);
  Me.prototype.C = function(a) {
    a.preventDefault();
    Oe() &&
      (a = this.a) &&
      (Ne()
        ? document.exitFullscreen
          ? document.exitFullscreen()
          : document.msExitFullscreen
          ? document.msExitFullscreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitExitFullscreen && document.webkitExitFullscreen()
        : ((a = this.j
            ? "string" === typeof this.j
              ? document.getElementById(this.j)
              : this.j
            : a.Cc()),
          this.A
            ? a.mozRequestFullScreenWithKeys
              ? a.mozRequestFullScreenWithKeys()
              : a.webkitRequestFullscreen
              ? a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
              : Pe(a)
            : Pe(a)));
  };
  Me.prototype.u = function() {
    var a = this.element.firstElementChild,
      b = this.a;
    Ne()
      ? ((a.className = this.f + "-true"), Ee(this.o, this.l))
      : ((a.className = this.f + "-false"), Ee(this.l, this.o));
    b && b.ld();
  };
  Me.prototype.setMap = function(a) {
    Ie.prototype.setMap.call(this, a);
    a && this.v.push(B(document, Qe(), this.u, this));
  };
  function Oe() {
    var a = document.body;
    return !!(
      a.webkitRequestFullscreen ||
      (a.mozRequestFullScreen && document.mozFullScreenEnabled) ||
      (a.msRequestFullscreen && document.msFullscreenEnabled) ||
      (a.requestFullscreen && document.fullscreenEnabled)
    );
  }
  function Ne() {
    return !!(
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    );
  }
  function Pe(a) {
    a.requestFullscreen
      ? a.requestFullscreen()
      : a.msRequestFullscreen
      ? a.msRequestFullscreen()
      : a.mozRequestFullScreen
      ? a.mozRequestFullScreen()
      : a.webkitRequestFullscreen && a.webkitRequestFullscreen();
  }
  var Qe = (function() {
    var a;
    return function() {
      if (!a) {
        var b = document.body;
        b.webkitRequestFullscreen
          ? (a = "webkitfullscreenchange")
          : b.mozRequestFullScreen
          ? (a = "mozfullscreenchange")
          : b.msRequestFullscreen
          ? (a = "MSFullscreenChange")
          : b.requestFullscreen && (a = "fullscreenchange");
      }
      return a;
    };
  })();
  function Re(a) {
    a = a ? a : {};
    var b = void 0 !== a.className ? a.className : "ol-rotate",
      c = void 0 !== a.label ? a.label : "\u21e7";
    this.f = null;
    "string" === typeof c
      ? ((this.f = document.createElement("span")),
        (this.f.className = "ol-compass"),
        (this.f.textContent = c))
      : ((this.f = c), this.f.classList.add("ol-compass"));
    var d = a.tipLabel ? a.tipLabel : "Reset rotation",
      c = document.createElement("button");
    c.className = b + "-reset";
    c.setAttribute("type", "button");
    c.title = d;
    c.appendChild(this.f);
    B(c, "click", Re.prototype.A, this);
    d = document.createElement("div");
    d.className = b + " ol-unselectable ol-control";
    d.appendChild(c);
    b = a.render ? a.render : Se;
    this.l = a.resetNorth ? a.resetNorth : void 0;
    Ie.call(this, { element: d, render: b, target: a.target });
    this.o = void 0 !== a.duration ? a.duration : 250;
    this.j = void 0 !== a.autoHide ? a.autoHide : !0;
    this.u = void 0;
    this.j && this.element.classList.add("ol-hidden");
  }
  v(Re, Ie);
  Re.prototype.A = function(a) {
    a.preventDefault();
    void 0 !== this.l
      ? this.l()
      : (a = this.a.aa()) &&
        void 0 !== a.Ra() &&
        (0 < this.o
          ? a.animate({ rotation: 0, duration: this.o, easing: Cb })
          : a.pe(0));
  };
  function Se(a) {
    if ((a = a.frameState)) {
      a = a.viewState.rotation;
      if (a != this.u) {
        var b = "rotate(" + a + "rad)";
        if (this.j) {
          var c = this.element.classList.contains("ol-hidden");
          c || 0 !== a
            ? c && 0 !== a && this.element.classList.remove("ol-hidden")
            : this.element.classList.add("ol-hidden");
        }
        this.f.style.msTransform = b;
        this.f.style.webkitTransform = b;
        this.f.style.transform = b;
      }
      this.u = a;
    }
  }
  function Te(a) {
    a = a ? a : {};
    var b = void 0 !== a.className ? a.className : "ol-zoom",
      c = void 0 !== a.delta ? a.delta : 1,
      d = void 0 !== a.zoomInLabel ? a.zoomInLabel : "+",
      e = void 0 !== a.zoomOutLabel ? a.zoomOutLabel : "\u2212",
      f = void 0 !== a.zoomInTipLabel ? a.zoomInTipLabel : "Zoom in",
      g = void 0 !== a.zoomOutTipLabel ? a.zoomOutTipLabel : "Zoom out",
      h = document.createElement("button");
    h.className = b + "-in";
    h.setAttribute("type", "button");
    h.title = f;
    h.appendChild("string" === typeof d ? document.createTextNode(d) : d);
    B(h, "click", Te.prototype.j.bind(this, c));
    d = document.createElement("button");
    d.className = b + "-out";
    d.setAttribute("type", "button");
    d.title = g;
    d.appendChild("string" === typeof e ? document.createTextNode(e) : e);
    B(d, "click", Te.prototype.j.bind(this, -c));
    c = document.createElement("div");
    c.className = b + " ol-unselectable ol-control";
    c.appendChild(h);
    c.appendChild(d);
    Ie.call(this, { element: c, target: a.target });
    this.f = void 0 !== a.duration ? a.duration : 250;
  }
  v(Te, Ie);
  Te.prototype.j = function(a, b) {
    b.preventDefault();
    var c = this.a.aa();
    if (c) {
      var d = c.Oa();
      d &&
        ((d = c.constrainResolution(d, a)),
        0 < this.f
          ? (0 < Md(c)[Kd] && Ld(c),
            c.animate({ resolution: d, duration: this.f, easing: Cb }))
          : c.Oc(d));
    }
  };
  function Ue(a) {
    a = a ? a : {};
    var b = new qe();
    (void 0 !== a.zoom ? a.zoom : 1) && b.push(new Te(a.zoomOptions));
    (void 0 !== a.rotate ? a.rotate : 1) && b.push(new Re(a.rotateOptions));
    (void 0 !== a.attribution ? a.attribution : 1) &&
      b.push(new Je(a.attributionOptions));
    return b;
  }
  function Ve(a) {
    a = a ? a : {};
    var b = document.createElement("DIV");
    b.className = void 0 !== a.className ? a.className : "ol-mouse-position";
    Ie.call(this, {
      element: b,
      render: a.render ? a.render : We,
      target: a.target
    });
    B(this, Ua(Xe), this.hm, this);
    a.coordinateFormat && this.oi(a.coordinateFormat);
    a.projection && this.sh(zc(a.projection));
    this.u = void 0 !== a.undefinedHTML ? a.undefinedHTML : "";
    this.o = b.innerHTML;
    this.l = this.j = this.f = null;
  }
  v(Ve, Ie);
  function We(a) {
    a = a.frameState;
    a
      ? this.f != a.viewState.projection &&
        ((this.f = a.viewState.projection), (this.j = null))
      : (this.f = null);
    Ye(this, this.l);
  }
  k = Ve.prototype;
  k.hm = function() {
    this.j = null;
  };
  k.Lg = function() {
    return this.get(Ze);
  };
  k.rh = function() {
    return this.get(Xe);
  };
  k.$k = function(a) {
    this.l = this.a.ce(a);
    Ye(this, this.l);
  };
  k.al = function() {
    Ye(this, null);
    this.l = null;
  };
  k.setMap = function(a) {
    Ie.prototype.setMap.call(this, a);
    a &&
      ((a = a.f),
      this.v.push(
        B(a, "mousemove", this.$k, this),
        B(a, "mouseout", this.al, this)
      ));
  };
  k.oi = function(a) {
    this.set(Ze, a);
  };
  k.sh = function(a) {
    this.set(Xe, a);
  };
  function Ye(a, b) {
    var c = a.u;
    if (b && a.f) {
      if (!a.j) {
        var d = a.rh();
        a.j = d ? yc(a.f, d) : Oc;
      }
      if ((d = a.a.Sa(b))) a.j(d, d), (c = (c = a.Lg()) ? c(d) : d.toString());
    }
    (a.o && c == a.o) || ((a.element.innerHTML = c), (a.o = c));
  }
  var Xe = "projection",
    Ze = "coordinateFormat";
  function $e(a, b, c, d, e) {
    Ge.call(this, a, b, e);
    this.originalEvent = c;
    this.pixel = b.ce(c);
    this.coordinate = b.Sa(this.pixel);
    this.dragging = void 0 !== d ? d : !1;
  }
  v($e, Ge);
  $e.prototype.preventDefault = function() {
    Ge.prototype.preventDefault.call(this);
    this.originalEvent.preventDefault();
  };
  $e.prototype.stopPropagation = function() {
    Ge.prototype.stopPropagation.call(this);
    this.originalEvent.stopPropagation();
  };
  var af = {
    Np: "singleclick",
    Cp: "click",
    Dp: "dblclick",
    Gp: "pointerdrag",
    Jp: "pointermove",
    Fp: "pointerdown",
    Mp: "pointerup",
    Lp: "pointerover",
    Kp: "pointerout",
    Hp: "pointerenter",
    Ip: "pointerleave",
    Ep: "pointercancel"
  };
  function cf(a, b, c, d, e) {
    $e.call(this, a, b, c.b, d, e);
    this.b = c;
  }
  v(cf, $e);
  var df = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];
  function ef(a, b) {
    var c,
      d,
      e = df.length;
    for (d = 0; d < e; ++d)
      try {
        if ((c = a.getContext(df[d], b))) return c;
      } catch (f) {}
    return null;
  }
  var ff,
    gf =
      "undefined" !== typeof navigator ? navigator.userAgent.toLowerCase() : "",
    hf = -1 !== gf.indexOf("firefox"),
    jf = -1 !== gf.indexOf("safari") && -1 == gf.indexOf("chrom"),
    kf = -1 !== gf.indexOf("webkit") && -1 == gf.indexOf("edge"),
    lf = -1 !== gf.indexOf("macintosh"),
    mf = window.devicePixelRatio || 1,
    nf = !1,
    of = (function() {
      if (!("HTMLCanvasElement" in window)) return !1;
      try {
        var a = document.createElement("CANVAS").getContext("2d");
        return a ? (void 0 !== a.setLineDash && (nf = !0), !0) : !1;
      } catch (b) {
        return !1;
      }
    })(),
    pf = "DeviceOrientationEvent" in window,
    qf = "geolocation" in navigator,
    rf = "ontouchstart" in window,
    sf = "PointerEvent" in window,
    tf = !!navigator.msPointerEnabled,
    uf = !1,
    vf,
    wf = [];
  if ("WebGLRenderingContext" in window)
    try {
      var xf = ef(document.createElement("CANVAS"), {
        failIfMajorPerformanceCaveat: !0
      });
      xf &&
        ((uf = !0),
        (vf = xf.getParameter(xf.MAX_TEXTURE_SIZE)),
        (wf = xf.getSupportedExtensions()));
    } catch (a) {}
  ff = uf;
  da = wf;
  ba = vf;
  function yf(a, b) {
    this.b = a;
    this.c = b;
  }
  function zf(a) {
    yf.call(this, a, {
      mousedown: this.tl,
      mousemove: this.ul,
      mouseup: this.xl,
      mouseover: this.wl,
      mouseout: this.vl
    });
    this.a = a.g;
    this.g = [];
  }
  v(zf, yf);
  function Af(a, b) {
    for (
      var c = a.g, d = b.clientX, e = b.clientY, f = 0, g = c.length, h;
      f < g && (h = c[f]);
      f++
    ) {
      var l = Math.abs(e - h[1]);
      if (25 >= Math.abs(d - h[0]) && 25 >= l) return !0;
    }
    return !1;
  }
  function Bf(a) {
    var b = Cf(a, a),
      c = b.preventDefault;
    b.preventDefault = function() {
      a.preventDefault();
      c();
    };
    b.pointerId = 1;
    b.isPrimary = !0;
    b.pointerType = "mouse";
    return b;
  }
  k = zf.prototype;
  k.tl = function(a) {
    if (!Af(this, a)) {
      if ((1).toString() in this.a) {
        var b = Bf(a);
        Df(this.b, "pointercancel", b, a);
        delete this.a[(1).toString()];
      }
      b = Bf(a);
      this.a[(1).toString()] = a;
      Df(this.b, "pointerdown", b, a);
    }
  };
  k.ul = function(a) {
    if (!Af(this, a)) {
      var b = Bf(a);
      Df(this.b, "pointermove", b, a);
    }
  };
  k.xl = function(a) {
    if (!Af(this, a)) {
      var b = this.a[(1).toString()];
      b &&
        b.button === a.button &&
        ((b = Bf(a)),
        Df(this.b, "pointerup", b, a),
        delete this.a[(1).toString()]);
    }
  };
  k.wl = function(a) {
    if (!Af(this, a)) {
      var b = Bf(a);
      Ef(this.b, b, a);
    }
  };
  k.vl = function(a) {
    if (!Af(this, a)) {
      var b = Bf(a);
      Ff(this.b, b, a);
    }
  };
  function Gf(a) {
    yf.call(this, a, {
      MSPointerDown: this.Cl,
      MSPointerMove: this.Dl,
      MSPointerUp: this.Gl,
      MSPointerOut: this.El,
      MSPointerOver: this.Fl,
      MSPointerCancel: this.Bl,
      MSGotPointerCapture: this.zl,
      MSLostPointerCapture: this.Al
    });
    this.a = a.g;
    this.g = ["", "unavailable", "touch", "pen", "mouse"];
  }
  v(Gf, yf);
  function Hf(a, b) {
    var c = b;
    "number" === typeof b.pointerType &&
      ((c = Cf(b, b)), (c.pointerType = a.g[b.pointerType]));
    return c;
  }
  k = Gf.prototype;
  k.Cl = function(a) {
    this.a[a.pointerId.toString()] = a;
    var b = Hf(this, a);
    Df(this.b, "pointerdown", b, a);
  };
  k.Dl = function(a) {
    var b = Hf(this, a);
    Df(this.b, "pointermove", b, a);
  };
  k.Gl = function(a) {
    var b = Hf(this, a);
    Df(this.b, "pointerup", b, a);
    delete this.a[a.pointerId.toString()];
  };
  k.El = function(a) {
    var b = Hf(this, a);
    Ff(this.b, b, a);
  };
  k.Fl = function(a) {
    var b = Hf(this, a);
    Ef(this.b, b, a);
  };
  k.Bl = function(a) {
    var b = Hf(this, a);
    Df(this.b, "pointercancel", b, a);
    delete this.a[a.pointerId.toString()];
  };
  k.Al = function(a) {
    this.b.b(new If("lostpointercapture", a, a));
  };
  k.zl = function(a) {
    this.b.b(new If("gotpointercapture", a, a));
  };
  function Jf(a) {
    yf.call(this, a, {
      pointerdown: this.po,
      pointermove: this.qo,
      pointerup: this.to,
      pointerout: this.ro,
      pointerover: this.so,
      pointercancel: this.oo,
      gotpointercapture: this.Lk,
      lostpointercapture: this.sl
    });
  }
  v(Jf, yf);
  k = Jf.prototype;
  k.po = function(a) {
    Kf(this.b, a);
  };
  k.qo = function(a) {
    Kf(this.b, a);
  };
  k.to = function(a) {
    Kf(this.b, a);
  };
  k.ro = function(a) {
    Kf(this.b, a);
  };
  k.so = function(a) {
    Kf(this.b, a);
  };
  k.oo = function(a) {
    Kf(this.b, a);
  };
  k.sl = function(a) {
    Kf(this.b, a);
  };
  k.Lk = function(a) {
    Kf(this.b, a);
  };
  function If(a, b, c) {
    Ia.call(this, a);
    this.b = b;
    a = c ? c : {};
    this.buttons = Lf(a);
    this.pressure = Mf(a, this.buttons);
    this.bubbles = "bubbles" in a ? a.bubbles : !1;
    this.cancelable = "cancelable" in a ? a.cancelable : !1;
    this.view = "view" in a ? a.view : null;
    this.detail = "detail" in a ? a.detail : null;
    this.screenX = "screenX" in a ? a.screenX : 0;
    this.screenY = "screenY" in a ? a.screenY : 0;
    this.clientX = "clientX" in a ? a.clientX : 0;
    this.clientY = "clientY" in a ? a.clientY : 0;
    this.button = "button" in a ? a.button : 0;
    this.relatedTarget = "relatedTarget" in a ? a.relatedTarget : null;
    this.pointerId = "pointerId" in a ? a.pointerId : 0;
    this.width = "width" in a ? a.width : 0;
    this.height = "height" in a ? a.height : 0;
    this.pointerType = "pointerType" in a ? a.pointerType : "";
    this.isPrimary = "isPrimary" in a ? a.isPrimary : !1;
    b.preventDefault &&
      (this.preventDefault = function() {
        b.preventDefault();
      });
  }
  v(If, Ia);
  function Lf(a) {
    if (a.buttons || Nf) a = a.buttons;
    else
      switch (a.which) {
        case 1:
          a = 1;
          break;
        case 2:
          a = 4;
          break;
        case 3:
          a = 2;
          break;
        default:
          a = 0;
      }
    return a;
  }
  function Mf(a, b) {
    var c = 0;
    a.pressure ? (c = a.pressure) : (c = b ? 0.5 : 0);
    return c;
  }
  var Nf = !1;
  try {
    Nf = 1 === new MouseEvent("click", { buttons: 1 }).buttons;
  } catch (a) {}
  function Of(a, b) {
    yf.call(this, a, {
      touchstart: this.up,
      touchmove: this.tp,
      touchend: this.sp,
      touchcancel: this.rp
    });
    this.a = a.g;
    this.j = b;
    this.g = void 0;
    this.i = 0;
    this.f = void 0;
  }
  v(Of, yf);
  k = Of.prototype;
  k.mi = function() {
    this.i = 0;
    this.f = void 0;
  };
  function Pf(a, b, c) {
    b = Cf(b, c);
    b.pointerId = c.identifier + 2;
    b.bubbles = !0;
    b.cancelable = !0;
    b.detail = a.i;
    b.button = 0;
    b.buttons = 1;
    b.width = c.webkitRadiusX || c.radiusX || 0;
    b.height = c.webkitRadiusY || c.radiusY || 0;
    b.pressure = c.webkitForce || c.force || 0.5;
    b.isPrimary = a.g === c.identifier;
    b.pointerType = "touch";
    b.clientX = c.clientX;
    b.clientY = c.clientY;
    b.screenX = c.screenX;
    b.screenY = c.screenY;
    return b;
  }
  function Qf(a, b, c) {
    function d() {
      b.preventDefault();
    }
    var e = Array.prototype.slice.call(b.changedTouches),
      f = e.length,
      g,
      h;
    for (g = 0; g < f; ++g)
      (h = Pf(a, b, e[g])), (h.preventDefault = d), c.call(a, b, h);
  }
  k.up = function(a) {
    var b = a.touches,
      c = Object.keys(this.a),
      d = c.length;
    if (d >= b.length) {
      var e = [],
        f,
        g,
        h;
      for (f = 0; f < d; ++f) {
        g = c[f];
        h = this.a[g];
        var l;
        if (!(l = 1 == g))
          a: {
            l = b.length;
            for (var m, p = 0; p < l; p++)
              if (((m = b[p]), m.identifier === g - 2)) {
                l = !0;
                break a;
              }
            l = !1;
          }
        l || e.push(h.out);
      }
      for (f = 0; f < e.length; ++f) this.ef(a, e[f]);
    }
    b = a.changedTouches[0];
    c = Object.keys(this.a).length;
    if (0 === c || (1 === c && (1).toString() in this.a))
      (this.g = b.identifier), void 0 !== this.f && clearTimeout(this.f);
    Rf(this, a);
    this.i++;
    Qf(this, a, this.ko);
  };
  k.ko = function(a, b) {
    this.a[b.pointerId] = { target: b.target, out: b, Xh: b.target };
    var c = this.b;
    b.bubbles = !0;
    Df(c, "pointerover", b, a);
    c = this.b;
    b.bubbles = !1;
    Df(c, "pointerenter", b, a);
    Df(this.b, "pointerdown", b, a);
  };
  k.tp = function(a) {
    a.preventDefault();
    Qf(this, a, this.yl);
  };
  k.yl = function(a, b) {
    var c = this.a[b.pointerId];
    if (c) {
      var d = c.out,
        e = c.Xh;
      Df(this.b, "pointermove", b, a);
      d &&
        e !== b.target &&
        ((d.relatedTarget = b.target),
        (b.relatedTarget = e),
        (d.target = e),
        b.target
          ? (Ff(this.b, d, a), Ef(this.b, b, a))
          : ((b.target = e), (b.relatedTarget = null), this.ef(a, b)));
      c.out = b;
      c.Xh = b.target;
    }
  };
  k.sp = function(a) {
    Rf(this, a);
    Qf(this, a, this.vp);
  };
  k.vp = function(a, b) {
    Df(this.b, "pointerup", b, a);
    this.b.out(b, a);
    Sf(this.b, b, a);
    delete this.a[b.pointerId];
    b.isPrimary &&
      ((this.g = void 0), (this.f = setTimeout(this.mi.bind(this), 200)));
  };
  k.rp = function(a) {
    Qf(this, a, this.ef);
  };
  k.ef = function(a, b) {
    Df(this.b, "pointercancel", b, a);
    this.b.out(b, a);
    Sf(this.b, b, a);
    delete this.a[b.pointerId];
    b.isPrimary &&
      ((this.g = void 0), (this.f = setTimeout(this.mi.bind(this), 200)));
  };
  function Rf(a, b) {
    var c = a.j.g,
      d = b.changedTouches[0];
    if (a.g === d.identifier) {
      var e = [d.clientX, d.clientY];
      c.push(e);
      setTimeout(function() {
        var a = c.indexOf(e);
        -1 < a && c.splice(a, 1);
      }, 2500);
    }
  }
  function Tf(a) {
    Na.call(this);
    this.i = a;
    this.g = {};
    this.c = {};
    this.a = [];
    sf
      ? Uf(this, new Jf(this))
      : tf
      ? Uf(this, new Gf(this))
      : ((a = new zf(this)), Uf(this, a), rf && Uf(this, new Of(this, a)));
    a = this.a.length;
    for (var b, c = 0; c < a; c++) (b = this.a[c]), Vf(this, Object.keys(b.c));
  }
  v(Tf, Na);
  function Uf(a, b) {
    var c = Object.keys(b.c);
    c &&
      (c.forEach(function(a) {
        var c = b.c[a];
        c && (this.c[a] = c.bind(b));
      }, a),
      a.a.push(b));
  }
  Tf.prototype.f = function(a) {
    var b = this.c[a.type];
    b && b(a);
  };
  function Vf(a, b) {
    b.forEach(function(a) {
      B(this.i, a, this.f, this);
    }, a);
  }
  function Wf(a, b) {
    b.forEach(function(a) {
      Ea(this.i, a, this.f, this);
    }, a);
  }
  function Cf(a, b) {
    for (var c = {}, d, e = 0, f = Xf.length; e < f; e++)
      (d = Xf[e][0]), (c[d] = a[d] || b[d] || Xf[e][1]);
    return c;
  }
  function Sf(a, b, c) {
    b.bubbles = !1;
    Df(a, "pointerleave", b, c);
  }
  Tf.prototype.out = function(a, b) {
    a.bubbles = !0;
    Df(this, "pointerout", a, b);
  };
  function Ff(a, b, c) {
    a.out(b, c);
    var d = b.target,
      e = b.relatedTarget;
    (d && e && d.contains(e)) || Sf(a, b, c);
  }
  function Ef(a, b, c) {
    b.bubbles = !0;
    Df(a, "pointerover", b, c);
    var d = b.target,
      e = b.relatedTarget;
    (d && e && d.contains(e)) ||
      ((b.bubbles = !1), Df(a, "pointerenter", b, c));
  }
  function Df(a, b, c, d) {
    a.b(new If(b, d, c));
  }
  function Kf(a, b) {
    a.b(new If(b.type, b, b));
  }
  Tf.prototype.oa = function() {
    for (var a = this.a.length, b, c = 0; c < a; c++)
      (b = this.a[c]), Wf(this, Object.keys(b.c));
    Na.prototype.oa.call(this);
  };
  var Xf = [
    ["bubbles", !1],
    ["cancelable", !1],
    ["view", null],
    ["detail", null],
    ["screenX", 0],
    ["screenY", 0],
    ["clientX", 0],
    ["clientY", 0],
    ["ctrlKey", !1],
    ["altKey", !1],
    ["shiftKey", !1],
    ["metaKey", !1],
    ["button", 0],
    ["relatedTarget", null],
    ["buttons", 0],
    ["pointerId", 0],
    ["width", 0],
    ["height", 0],
    ["pressure", 0],
    ["tiltX", 0],
    ["tiltY", 0],
    ["pointerType", ""],
    ["hwTimestamp", 0],
    ["isPrimary", !1],
    ["type", ""],
    ["target", null],
    ["currentTarget", null],
    ["which", 0]
  ];
  function Yf(a) {
    Na.call(this);
    this.f = a;
    this.j = 0;
    this.l = !1;
    this.c = [];
    this.g = null;
    a = this.f.f;
    this.u = 0;
    this.H = {};
    this.i = new Tf(a);
    this.a = null;
    this.o = B(this.i, "pointerdown", this.cl, this);
    this.v = B(this.i, "pointermove", this.So, this);
  }
  v(Yf, Na);
  function Zf(a, b) {
    var c = new cf("click", a.f, b);
    a.b(c);
    0 !== a.j
      ? (clearTimeout(a.j), (a.j = 0), (c = new cf("dblclick", a.f, b)), a.b(c))
      : (a.j = setTimeout(
          function() {
            this.j = 0;
            var a = new cf("singleclick", this.f, b);
            this.b(a);
          }.bind(a),
          250
        ));
  }
  function $f(a, b) {
    "pointerup" == b.type || "pointercancel" == b.type
      ? delete a.H[b.pointerId]
      : "pointerdown" == b.type && (a.H[b.pointerId] = !0);
    a.u = Object.keys(a.H).length;
  }
  k = Yf.prototype;
  k.$g = function(a) {
    $f(this, a);
    var b = new cf("pointerup", this.f, a);
    this.b(b);
    !this.l && 0 === a.button && Zf(this, this.g);
    0 === this.u &&
      (this.c.forEach(ya),
      (this.c.length = 0),
      (this.l = !1),
      (this.g = null),
      Ha(this.a),
      (this.a = null));
  };
  k.cl = function(a) {
    $f(this, a);
    var b = new cf("pointerdown", this.f, a);
    this.b(b);
    this.g = a;
    0 === this.c.length &&
      ((this.a = new Tf(document)),
      this.c.push(
        B(this.a, "pointermove", this.Vl, this),
        B(this.a, "pointerup", this.$g, this),
        B(this.i, "pointercancel", this.$g, this)
      ));
  };
  k.Vl = function(a) {
    if (a.clientX != this.g.clientX || a.clientY != this.g.clientY) {
      this.l = !0;
      var b = new cf("pointerdrag", this.f, a, this.l);
      this.b(b);
    }
    a.preventDefault();
  };
  k.So = function(a) {
    this.b(
      new cf(
        a.type,
        this.f,
        a,
        !(
          !this.g ||
          (a.clientX == this.g.clientX && a.clientY == this.g.clientY)
        )
      )
    );
  };
  k.oa = function() {
    this.v && (ya(this.v), (this.v = null));
    this.o && (ya(this.o), (this.o = null));
    this.c.forEach(ya);
    this.c.length = 0;
    this.a && (Ha(this.a), (this.a = null));
    this.i && (Ha(this.i), (this.i = null));
    Na.prototype.oa.call(this);
  };
  function ag(a, b) {
    Na.call(this);
    this.Ca = a;
    this.state = b;
    this.a = null;
    this.key = "";
  }
  v(ag, Na);
  ag.prototype.s = function() {
    this.b("change");
  };
  ag.prototype.bb = function() {
    return this.key + "/" + this.Ca;
  };
  function bg(a) {
    if (!a.a) return a;
    var b = a.a;
    do {
      if (b.W() == cg) return b;
      b = b.a;
    } while (b);
    return a;
  }
  ag.prototype.c = function() {
    return this.Ca;
  };
  ag.prototype.W = function() {
    return this.state;
  };
  var cg = 2;
  function dg(a, b) {
    this.o = a;
    this.f = b;
    this.b = [];
    this.g = [];
    this.a = {};
  }
  dg.prototype.clear = function() {
    this.b.length = 0;
    this.g.length = 0;
    ua(this.a);
  };
  function eg(a) {
    var b = a.b,
      c = a.g,
      d = b[0];
    1 == b.length
      ? ((b.length = 0), (c.length = 0))
      : ((b[0] = b.pop()), (c[0] = c.pop()), fg(a, 0));
    b = a.f(d);
    delete a.a[b];
    return d;
  }
  dg.prototype.c = function(a) {
    ha(!(this.f(a) in this.a), 31);
    var b = this.o(a);
    return Infinity != b
      ? (this.b.push(a),
        this.g.push(b),
        (this.a[this.f(a)] = !0),
        gg(this, 0, this.b.length - 1),
        !0)
      : !1;
  };
  function fg(a, b) {
    for (
      var c = a.b, d = a.g, e = c.length, f = c[b], g = d[b], h = b;
      b < e >> 1;

    ) {
      var l = 2 * b + 1,
        m = 2 * b + 2,
        l = m < e && d[m] < d[l] ? m : l;
      c[b] = c[l];
      d[b] = d[l];
      b = l;
    }
    c[b] = f;
    d[b] = g;
    gg(a, h, b);
  }
  function gg(a, b, c) {
    var d = a.b;
    a = a.g;
    for (var e = d[c], f = a[c]; c > b; ) {
      var g = (c - 1) >> 1;
      if (a[g] > f) (d[c] = d[g]), (a[c] = a[g]), (c = g);
      else break;
    }
    d[c] = e;
    a[c] = f;
  }
  function hg(a) {
    var b = a.o,
      c = a.b,
      d = a.g,
      e = 0,
      f = c.length,
      g,
      h,
      l;
    for (h = 0; h < f; ++h)
      (g = c[h]),
        (l = b(g)),
        Infinity == l ? delete a.a[a.f(g)] : ((d[e] = l), (c[e++] = g));
    c.length = e;
    d.length = e;
    for (b = (a.b.length >> 1) - 1; 0 <= b; b--) fg(a, b);
  }
  function ig(a, b) {
    dg.call(
      this,
      function(b) {
        return a.apply(null, b);
      },
      function(a) {
        return a[0].bb();
      }
    );
    this.v = b;
    this.j = 0;
    this.i = {};
  }
  v(ig, dg);
  ig.prototype.c = function(a) {
    var b = dg.prototype.c.call(this, a);
    b && B(a[0], "change", this.l, this);
    return b;
  };
  ig.prototype.l = function(a) {
    a = a.target;
    var b = a.W();
    if (b === cg || 3 === b || 4 === b || 5 === b)
      Ea(a, "change", this.l, this),
        (a = a.bb()),
        a in this.i && (delete this.i[a], --this.j),
        this.v();
  };
  function jg(a, b, c) {
    for (var d = 0, e, f; a.j < b && d < c && 0 < a.b.length; )
      (e = eg(a)[0]),
        (f = e.bb()),
        0 !== e.W() || f in a.i || ((a.i[f] = !0), ++a.j, ++d, e.load());
  }
  function kg(a, b, c) {
    this.c = a;
    this.f = b;
    this.i = c;
    this.b = [];
    this.a = this.g = 0;
  }
  function lg(a) {
    Sa.call(this);
    this.v = null;
    this.Ea(!0);
    this.handleEvent = a.handleEvent;
  }
  v(lg, Sa);
  lg.prototype.f = function() {
    return this.get(mg);
  };
  lg.prototype.c = function() {
    return this.v;
  };
  lg.prototype.Ea = function(a) {
    this.set(mg, a);
  };
  lg.prototype.setMap = function(a) {
    this.v = a;
  };
  function ng(a, b, c, d) {
    if (void 0 !== b) {
      var e = a.Ra(),
        f = a.fb();
      void 0 !== e && f && 0 < d
        ? a.animate({ rotation: b, anchor: c, duration: d, easing: Cb })
        : a.rotate(b, c);
    }
  }
  function og(a, b, c, d) {
    var e = a.Oa();
    b = a.constrainResolution(e, b, 0);
    pg(a, b, c, d);
  }
  function pg(a, b, c, d) {
    if (b) {
      var e = a.Oa(),
        f = a.fb();
      void 0 !== e && f && b !== e && d
        ? a.animate({ resolution: b, anchor: c, duration: d, easing: Cb })
        : (c && ((c = Nd(a, b, c)), a.Mb(c)), a.Oc(b));
    }
  }
  var mg = "active";
  function qg(a) {
    a = a ? a : {};
    this.a = a.delta ? a.delta : 1;
    lg.call(this, { handleEvent: rg });
    this.i = void 0 !== a.duration ? a.duration : 250;
  }
  v(qg, lg);
  function rg(a) {
    var b = !1,
      c = a.originalEvent;
    if ("dblclick" == a.type) {
      var b = a.coordinate,
        c = c.shiftKey ? -this.a : this.a,
        d = a.map.aa();
      og(d, c, b, this.i);
      a.preventDefault();
      b = !0;
    }
    return !b;
  }
  function sg(a) {
    a = a.originalEvent;
    return a.altKey && !(a.metaKey || a.ctrlKey) && a.shiftKey;
  }
  function tg(a) {
    a = a.originalEvent;
    return 0 == a.button && !(kf && lf && a.ctrlKey);
  }
  function ug(a) {
    return "pointermove" == a.type;
  }
  function vg(a) {
    return "singleclick" == a.type;
  }
  function wg(a) {
    a = a.originalEvent;
    return !a.altKey && !(a.metaKey || a.ctrlKey) && !a.shiftKey;
  }
  function xg(a) {
    a = a.originalEvent;
    return !a.altKey && !(a.metaKey || a.ctrlKey) && a.shiftKey;
  }
  function yg(a) {
    a = a.originalEvent.target.tagName;
    return "INPUT" !== a && "SELECT" !== a && "TEXTAREA" !== a;
  }
  function zg(a) {
    ha(a.b, 56);
    return "mouse" == a.b.pointerType;
  }
  function Ag(a) {
    a = a.b;
    return a.isPrimary && 0 === a.button;
  }
  function Bg(a) {
    a = a ? a : {};
    lg.call(this, { handleEvent: a.handleEvent ? a.handleEvent : Cg });
    this.Ve = a.handleDownEvent ? a.handleDownEvent : nc;
    this.bf = a.handleDragEvent ? a.handleDragEvent : ea;
    this.cf = a.handleMoveEvent ? a.handleMoveEvent : ea;
    this.df = a.handleUpEvent ? a.handleUpEvent : nc;
    this.A = !1;
    this.Z = {};
    this.l = [];
  }
  v(Bg, lg);
  function Dg(a) {
    for (var b = a.length, c = 0, d = 0, e = 0; e < b; e++)
      (c += a[e].clientX), (d += a[e].clientY);
    return [c / b, d / b];
  }
  function Cg(a) {
    if (!(a instanceof cf)) return !0;
    var b = !1,
      c = a.type;
    if ("pointerdown" === c || "pointerdrag" === c || "pointerup" === c)
      (c = a.b),
        "pointerup" == a.type
          ? delete this.Z[c.pointerId]
          : "pointerdown" == a.type
          ? (this.Z[c.pointerId] = c)
          : c.pointerId in this.Z && (this.Z[c.pointerId] = c),
        (this.l = va(this.Z));
    this.A &&
      ("pointerdrag" == a.type
        ? this.bf(a)
        : "pointerup" == a.type && (this.A = this.df(a)));
    "pointerdown" == a.type
      ? ((this.A = a = this.Ve(a)), (b = this.Qc(a)))
      : "pointermove" == a.type && this.cf(a);
    return !b;
  }
  Bg.prototype.Qc = function(a) {
    return a;
  };
  function Eg(a) {
    Bg.call(this, {
      handleDownEvent: Fg,
      handleDragEvent: Gg,
      handleUpEvent: Hg
    });
    a = a ? a : {};
    this.a = a.kinetic;
    this.i = null;
    this.o = a.condition ? a.condition : wg;
    this.j = !1;
  }
  v(Eg, Bg);
  function Gg(a) {
    var b = Dg(this.l);
    this.a && this.a.b.push(b[0], b[1], Date.now());
    if (this.i) {
      var c = this.i[0] - b[0],
        d = b[1] - this.i[1];
      a = a.map.aa();
      var e = a.W(),
        c = [c, d];
      xb(c, e.resolution);
      wb(c, e.rotation);
      rb(c, e.center);
      c = a.Zd(c);
      a.Mb(c);
    }
    this.i = b;
  }
  function Hg(a) {
    var b = a.map;
    a = b.aa();
    if (0 === this.l.length) {
      var c;
      if ((c = !this.j && this.a))
        if (((c = this.a), 6 > c.b.length)) c = !1;
        else {
          var d = Date.now() - c.i,
            e = c.b.length - 3;
          if (c.b[e + 2] < d) c = !1;
          else {
            for (var f = e - 3; 0 < f && c.b[f + 2] > d; ) f -= 3;
            var d = c.b[e + 2] - c.b[f + 2],
              g = c.b[e] - c.b[f],
              e = c.b[e + 1] - c.b[f + 1];
            c.g = Math.atan2(e, g);
            c.a = Math.sqrt(g * g + e * e) / d;
            c = c.a > c.f;
          }
        }
      c &&
        ((c = this.a),
        (c = (c.f - c.a) / c.c),
        (e = this.a.g),
        (f = a.fb()),
        (f = b.Ga(f)),
        (b = b.Sa([f[0] - c * Math.cos(e), f[1] - c * Math.sin(e)])),
        a.animate({ center: a.Zd(b), duration: 500, easing: Cb }));
      Jd(a, 1, -1);
      return !1;
    }
    this.i = null;
    return !0;
  }
  function Fg(a) {
    if (0 < this.l.length && this.o(a)) {
      var b = a.map.aa();
      this.i = null;
      this.A || Jd(b, 1, 1);
      b.Mb(a.frameState.viewState.center);
      this.a && ((a = this.a), (a.b.length = 0), (a.g = 0), (a.a = 0));
      this.j = 1 < this.l.length;
      return !0;
    }
    return !1;
  }
  Eg.prototype.Qc = nc;
  function Ig(a) {
    a = a ? a : {};
    Bg.call(this, {
      handleDownEvent: Jg,
      handleDragEvent: Kg,
      handleUpEvent: Lg
    });
    this.i = a.condition ? a.condition : sg;
    this.a = void 0;
    this.j = void 0 !== a.duration ? a.duration : 250;
  }
  v(Ig, Bg);
  function Kg(a) {
    if (zg(a)) {
      var b = a.map,
        c = b.nb();
      a = a.pixel;
      c = Math.atan2(c[1] / 2 - a[1], a[0] - c[0] / 2);
      if (void 0 !== this.a) {
        a = c - this.a;
        var b = b.aa(),
          d = b.Ra();
        ng(b, d - a);
      }
      this.a = c;
    }
  }
  function Lg(a) {
    if (!zg(a)) return !0;
    a = a.map.aa();
    Jd(a, 1, -1);
    var b = a.Ra(),
      c = this.j,
      b = a.constrainRotation(b, 0);
    ng(a, b, void 0, c);
    return !1;
  }
  function Jg(a) {
    return zg(a) && tg(a) && this.i(a)
      ? (Jd(a.map.aa(), 1, 1), (this.a = void 0), !0)
      : !1;
  }
  Ig.prototype.Qc = nc;
  function Mg(a) {
    this.f = null;
    this.a = document.createElement("div");
    this.a.style.position = "absolute";
    this.a.className = "ol-box " + a;
    this.g = this.c = this.b = null;
  }
  v(Mg, Ga);
  Mg.prototype.oa = function() {
    this.setMap(null);
  };
  function Ng(a) {
    var b = a.c,
      c = a.g;
    a = a.a.style;
    a.left = Math.min(b[0], c[0]) + "px";
    a.top = Math.min(b[1], c[1]) + "px";
    a.width = Math.abs(c[0] - b[0]) + "px";
    a.height = Math.abs(c[1] - b[1]) + "px";
  }
  Mg.prototype.setMap = function(a) {
    if (this.b) {
      this.b.A.removeChild(this.a);
      var b = this.a.style;
      b.left = b.top = b.width = b.height = "inherit";
    }
    (this.b = a) && this.b.A.appendChild(this.a);
  };
  function Og(a) {
    var b = a.c,
      c = a.g,
      b = [b, [b[0], c[1]], c, [c[0], b[1]]].map(a.b.Sa, a.b);
    b[4] = b[0].slice();
    a.f ? a.f.qa([b]) : (a.f = new E([b]));
  }
  Mg.prototype.V = function() {
    return this.f;
  };
  function Pg(a) {
    Bg.call(this, {
      handleDownEvent: Qg,
      handleDragEvent: Rg,
      handleUpEvent: Sg
    });
    a = a ? a : {};
    this.a = new Mg(a.className || "ol-dragbox");
    this.i = null;
    this.u = a.condition ? a.condition : mc;
    this.o = a.boxEndCondition ? a.boxEndCondition : Tg;
  }
  v(Pg, Bg);
  function Tg(a, b, c) {
    a = c[0] - b[0];
    b = c[1] - b[1];
    return 64 <= a * a + b * b;
  }
  function Rg(a) {
    if (zg(a)) {
      var b = this.a,
        c = a.pixel;
      b.c = this.i;
      b.g = c;
      Og(b);
      Ng(b);
      this.b(new Ug(Vg, a.coordinate, a));
    }
  }
  Pg.prototype.V = function() {
    return this.a.V();
  };
  Pg.prototype.j = ea;
  function Sg(a) {
    if (!zg(a)) return !0;
    this.a.setMap(null);
    this.o(a, this.i, a.pixel) &&
      (this.j(a), this.b(new Ug(Wg, a.coordinate, a)));
    return !1;
  }
  function Qg(a) {
    if (zg(a) && tg(a) && this.u(a)) {
      this.i = a.pixel;
      this.a.setMap(a.map);
      var b = this.a,
        c = this.i;
      b.c = this.i;
      b.g = c;
      Og(b);
      Ng(b);
      this.b(new Ug(Xg, a.coordinate, a));
      return !0;
    }
    return !1;
  }
  var Xg = "boxstart",
    Vg = "boxdrag",
    Wg = "boxend";
  function Ug(a, b, c) {
    Ia.call(this, a);
    this.coordinate = b;
    this.mapBrowserEvent = c;
  }
  v(Ug, Ia);
  function Yg(a) {
    a = a ? a : {};
    var b = a.condition ? a.condition : xg;
    this.C = void 0 !== a.duration ? a.duration : 200;
    this.D = void 0 !== a.out ? a.out : !1;
    Pg.call(this, { condition: b, className: a.className || "ol-dragzoom" });
  }
  v(Yg, Pg);
  Yg.prototype.j = function() {
    var a = this.v,
      b = a.aa(),
      c = a.nb(),
      d = this.V().G();
    if (this.D) {
      var e = b.Uc(c),
        d = [a.Ga(Yb(d)), a.Ga($b(d))],
        a = Rb(Infinity, Infinity, -Infinity, -Infinity, void 0),
        f,
        g;
      f = 0;
      for (g = d.length; f < g; ++f) Ib(a, d[f]);
      kc(e, 1 / Pd(a, c));
      d = e;
    }
    c = b.constrainResolution(Pd(d, c));
    b.animate({ resolution: c, center: gc(d), duration: this.C, easing: Cb });
  };
  function Zg(a) {
    lg.call(this, { handleEvent: $g });
    a = a || {};
    this.a = function(a) {
      return wg(a) && yg(a);
    };
    this.i = void 0 !== a.condition ? a.condition : this.a;
    this.j = void 0 !== a.duration ? a.duration : 100;
    this.l = void 0 !== a.pixelDelta ? a.pixelDelta : 128;
  }
  v(Zg, lg);
  function $g(a) {
    var b = !1;
    if ("keydown" == a.type) {
      var c = a.originalEvent.keyCode;
      if (this.i(a) && (40 == c || 37 == c || 39 == c || 38 == c)) {
        var b = a.map.aa(),
          d = b.Oa() * this.l,
          e = 0,
          f = 0;
        40 == c ? (f = -d) : 37 == c ? (e = -d) : 39 == c ? (e = d) : (f = d);
        d = [e, f];
        wb(d, b.Ra());
        c = this.j;
        if ((e = b.fb()))
          (d = b.Zd([e[0] + d[0], e[1] + d[1]])),
            c ? b.animate({ duration: c, easing: Eb, center: d }) : b.Mb(d);
        a.preventDefault();
        b = !0;
      }
    }
    return !b;
  }
  function ah(a) {
    lg.call(this, { handleEvent: bh });
    a = a ? a : {};
    this.i = a.condition ? a.condition : yg;
    this.a = a.delta ? a.delta : 1;
    this.j = void 0 !== a.duration ? a.duration : 100;
  }
  v(ah, lg);
  function bh(a) {
    var b = !1;
    if ("keydown" == a.type || "keypress" == a.type) {
      var c = a.originalEvent.charCode;
      !this.i(a) ||
        (43 != c && 45 != c) ||
        ((b = 43 == c ? this.a : -this.a),
        (c = a.map.aa()),
        og(c, b, void 0, this.j),
        a.preventDefault(),
        (b = !0));
    }
    return !b;
  }
  function ch(a) {
    lg.call(this, { handleEvent: dh });
    a = a || {};
    this.j = 0;
    this.L = void 0 !== a.duration ? a.duration : 250;
    this.U = void 0 !== a.timeout ? a.timeout : 80;
    this.A = void 0 !== a.useAnchor ? a.useAnchor : !0;
    this.a = null;
    this.o = this.l = this.u = this.i = void 0;
  }
  v(ch, lg);
  function dh(a) {
    var b = a.type;
    if ("wheel" !== b && "mousewheel" !== b) return !0;
    a.preventDefault();
    var b = a.map,
      c = a.originalEvent;
    this.A && (this.a = a.coordinate);
    var d;
    "wheel" == a.type
      ? ((d = c.deltaY),
        hf && c.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (d /= mf),
        c.deltaMode === WheelEvent.DOM_DELTA_LINE && (d *= 40))
      : "mousewheel" == a.type && ((d = -c.wheelDeltaY), jf && (d /= 3));
    if (0 === d) return !1;
    a = Date.now();
    void 0 === this.i && (this.i = a);
    if (!this.l || 400 < a - this.i) this.l = 4 > Math.abs(d) ? eh : fh;
    if (this.l === eh) {
      b = b.aa();
      this.o ? clearTimeout(this.o) : Jd(b, 1, 1);
      this.o = setTimeout(this.C.bind(this), 400);
      d = b.Oa() * Math.pow(2, d / 300);
      var c = b.j,
        e = b.a,
        f = 0;
      d < c
        ? ((d = Math.max(d, c / 1.5)), (f = 1))
        : d > e && ((d = Math.min(d, 1.5 * e)), (f = -1));
      if (this.a) {
        var g = Nd(b, d, this.a);
        b.Mb(g);
      }
      b.Oc(d);
      0 < f
        ? b.animate({
            resolution: c,
            easing: Cb,
            anchor: this.a,
            duration: 500
          })
        : 0 > f &&
          b.animate({
            resolution: e,
            easing: Cb,
            anchor: this.a,
            duration: 500
          });
      this.i = a;
      return !1;
    }
    this.j += d;
    a = Math.max(this.U - (a - this.i), 0);
    clearTimeout(this.u);
    this.u = setTimeout(this.D.bind(this, b), a);
    return !1;
  }
  ch.prototype.C = function() {
    this.o = void 0;
    Jd(this.v.aa(), 1, -1);
  };
  ch.prototype.D = function(a) {
    a = a.aa();
    0 < Md(a)[Kd] && Ld(a);
    og(a, -ia(this.j, -1, 1), this.a, this.L);
    this.l = void 0;
    this.j = 0;
    this.a = null;
    this.u = this.i = void 0;
  };
  ch.prototype.P = function(a) {
    this.A = a;
    a || (this.a = null);
  };
  var eh = "trackpad",
    fh = "wheel";
  function gh(a) {
    Bg.call(this, {
      handleDownEvent: hh,
      handleDragEvent: ih,
      handleUpEvent: jh
    });
    a = a || {};
    this.i = null;
    this.j = void 0;
    this.a = !1;
    this.o = 0;
    this.C = void 0 !== a.threshold ? a.threshold : 0.3;
    this.u = void 0 !== a.duration ? a.duration : 250;
  }
  v(gh, Bg);
  function ih(a) {
    var b = 0,
      c = this.l[0],
      d = this.l[1],
      c = Math.atan2(d.clientY - c.clientY, d.clientX - c.clientX);
    void 0 !== this.j &&
      ((b = c - this.j),
      (this.o += b),
      !this.a && Math.abs(this.o) > this.C && (this.a = !0));
    this.j = c;
    a = a.map;
    c = a.f.getBoundingClientRect();
    d = Dg(this.l);
    d[0] -= c.left;
    d[1] -= c.top;
    this.i = a.Sa(d);
    this.a && ((c = a.aa()), (d = c.Ra()), a.render(), ng(c, d + b, this.i));
  }
  function jh(a) {
    if (2 > this.l.length) {
      a = a.map.aa();
      Jd(a, 1, -1);
      if (this.a) {
        var b = a.Ra(),
          c = this.i,
          d = this.u,
          b = a.constrainRotation(b, 0);
        ng(a, b, c, d);
      }
      return !1;
    }
    return !0;
  }
  function hh(a) {
    return 2 <= this.l.length
      ? ((a = a.map),
        (this.i = null),
        (this.j = void 0),
        (this.a = !1),
        (this.o = 0),
        this.A || Jd(a.aa(), 1, 1),
        !0)
      : !1;
  }
  gh.prototype.Qc = nc;
  function kh(a) {
    Bg.call(this, {
      handleDownEvent: lh,
      handleDragEvent: nh,
      handleUpEvent: oh
    });
    a = a ? a : {};
    this.o = a.constrainResolution || !1;
    this.i = null;
    this.u = void 0 !== a.duration ? a.duration : 400;
    this.a = void 0;
    this.j = 1;
  }
  v(kh, Bg);
  function nh(a) {
    var b = 1,
      c = this.l[0],
      d = this.l[1],
      e = c.clientX - d.clientX,
      c = c.clientY - d.clientY,
      e = Math.sqrt(e * e + c * c);
    void 0 !== this.a && (b = this.a / e);
    this.a = e;
    1 != b && (this.j = b);
    a = a.map;
    var e = a.aa(),
      c = e.Oa(),
      d = a.f.getBoundingClientRect(),
      f = Dg(this.l);
    f[0] -= d.left;
    f[1] -= d.top;
    this.i = a.Sa(f);
    a.render();
    pg(e, c * b, this.i);
  }
  function oh(a) {
    if (2 > this.l.length) {
      a = a.map.aa();
      Jd(a, 1, -1);
      if (this.o) {
        var b = a.Oa(),
          c = this.i,
          d = this.u,
          b = a.constrainResolution(b, 0, this.j - 1);
        pg(a, b, c, d);
      }
      return !1;
    }
    return !0;
  }
  function lh(a) {
    return 2 <= this.l.length
      ? ((a = a.map),
        (this.i = null),
        (this.a = void 0),
        (this.j = 1),
        this.A || Jd(a.aa(), 1, 1),
        !0)
      : !1;
  }
  kh.prototype.Qc = nc;
  function ph(a) {
    a = a ? a : {};
    var b = new qe(),
      c = new kg(-0.005, 0.05, 100);
    (void 0 !== a.altShiftDragRotate ? a.altShiftDragRotate : 1) &&
      b.push(new Ig());
    (void 0 !== a.doubleClickZoom ? a.doubleClickZoom : 1) &&
      b.push(new qg({ delta: a.zoomDelta, duration: a.zoomDuration }));
    (void 0 !== a.dragPan ? a.dragPan : 1) && b.push(new Eg({ kinetic: c }));
    (void 0 !== a.pinchRotate ? a.pinchRotate : 1) && b.push(new gh());
    (void 0 !== a.pinchZoom ? a.pinchZoom : 1) &&
      b.push(new kh({ duration: a.zoomDuration }));
    if (void 0 !== a.keyboard ? a.keyboard : 1)
      b.push(new Zg()),
        b.push(new ah({ delta: a.zoomDelta, duration: a.zoomDuration }));
    (void 0 !== a.mouseWheelZoom ? a.mouseWheelZoom : 1) &&
      b.push(new ch({ duration: a.zoomDuration }));
    (void 0 !== a.shiftDragZoom ? a.shiftDragZoom : 1) &&
      b.push(new Yg({ duration: a.zoomDuration }));
    return b;
  }
  function qh(a) {
    Sa.call(this);
    var b = ta({}, a);
    b[rh] = void 0 !== a.opacity ? a.opacity : 1;
    b[sh] = void 0 !== a.visible ? a.visible : !0;
    b[th] = void 0 !== a.zIndex ? a.zIndex : 0;
    b[uh] = void 0 !== a.maxResolution ? a.maxResolution : Infinity;
    b[vh] = void 0 !== a.minResolution ? a.minResolution : 0;
    this.I(b);
    this.a = { layer: this, me: !0 };
  }
  v(qh, Sa);
  function wh(a) {
    a.a.opacity = ia(a.Yb(), 0, 1);
    a.a.Ei = a.uf();
    a.a.visible = a.Fb();
    a.a.extent = a.G();
    a.a.zIndex = a.Zb();
    a.a.maxResolution = a.Wb();
    a.a.minResolution = Math.max(a.Xb(), 0);
    return a.a;
  }
  k = qh.prototype;
  k.G = function() {
    return this.get(xh);
  };
  k.Wb = function() {
    return this.get(uh);
  };
  k.Xb = function() {
    return this.get(vh);
  };
  k.Yb = function() {
    return this.get(rh);
  };
  k.Fb = function() {
    return this.get(sh);
  };
  k.Zb = function() {
    return this.get(th);
  };
  k.kc = function(a) {
    this.set(xh, a);
  };
  k.pc = function(a) {
    this.set(uh, a);
  };
  k.qc = function(a) {
    this.set(vh, a);
  };
  k.lc = function(a) {
    this.set(rh, a);
  };
  k.mc = function(a) {
    this.set(sh, a);
  };
  k.nc = function(a) {
    this.set(th, a);
  };
  var rh = "opacity",
    sh = "visible",
    xh = "extent",
    th = "zIndex",
    uh = "maxResolution",
    vh = "minResolution";
  function yh(a) {
    var b = a || {};
    a = ta({}, b);
    delete a.layers;
    b = b.layers;
    qh.call(this, a);
    this.c = [];
    this.f = {};
    B(this, Ua(zh), this.Wk, this);
    b
      ? Array.isArray(b)
        ? (b = new qe(b.slice()))
        : ha(b instanceof qe, 43)
      : (b = new qe());
    this.yh(b);
  }
  v(yh, qh);
  k = yh.prototype;
  k.ie = function() {
    this.Fb() && this.s();
  };
  k.Wk = function() {
    this.c.forEach(ya);
    this.c.length = 0;
    var a = this.cd();
    this.c.push(B(a, ue, this.Vk, this), B(a, ve, this.Xk, this));
    for (var b in this.f) this.f[b].forEach(ya);
    ua(this.f);
    var a = a.a,
      c,
      d;
    b = 0;
    for (c = a.length; b < c; b++)
      (d = a[b]),
        (this.f[x(d).toString()] = [
          B(d, Xa, this.ie, this),
          B(d, "change", this.ie, this)
        ]);
    this.s();
  };
  k.Vk = function(a) {
    a = a.element;
    var b = x(a).toString();
    this.f[b] = [B(a, Xa, this.ie, this), B(a, "change", this.ie, this)];
    this.s();
  };
  k.Xk = function(a) {
    a = x(a.element).toString();
    this.f[a].forEach(ya);
    delete this.f[a];
    this.s();
  };
  k.cd = function() {
    return this.get(zh);
  };
  k.yh = function(a) {
    this.set(zh, a);
  };
  k.sf = function(a) {
    var b = void 0 !== a ? a : [],
      c = b.length;
    this.cd().forEach(function(a) {
      a.sf(b);
    });
    a = wh(this);
    var d, e;
    for (d = b.length; c < d; c++)
      (e = b[c]),
        (e.opacity *= a.opacity),
        (e.visible = e.visible && a.visible),
        (e.maxResolution = Math.min(e.maxResolution, a.maxResolution)),
        (e.minResolution = Math.max(e.minResolution, a.minResolution)),
        void 0 !== a.extent &&
          (e.extent = void 0 !== e.extent ? ic(e.extent, a.extent) : a.extent);
    return b;
  };
  k.uf = function() {
    return "ready";
  };
  var zh = "layers";
  function Ah(a) {
    sc.call(this, {
      code: a,
      units: "m",
      extent: Bh,
      global: !0,
      worldExtent: Ch,
      getPointResolution: function(a, c) {
        return a / ja(c[1] / 6378137);
      }
    });
  }
  v(Ah, sc);
  var Dh = 6378137 * Math.PI,
    Bh = [-Dh, -Dh, Dh, Dh],
    Ch = [-180, -85, 180, 85],
    Ec = "EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857"
      .split(" ")
      .map(function(a) {
        return new Ah(a);
      });
  function Fc(a, b, c) {
    var d = a.length;
    c = 1 < c ? c : 2;
    void 0 === b && (2 < c ? (b = a.slice()) : (b = Array(d)));
    for (var e = 0; e < d; e += c) {
      b[e] = (Dh * a[e]) / 180;
      var f = 6378137 * Math.log(Math.tan((Math.PI * (a[e + 1] + 90)) / 360));
      f > Dh ? (f = Dh) : f < -Dh && (f = -Dh);
      b[e + 1] = f;
    }
    return b;
  }
  function Gc(a, b, c) {
    var d = a.length;
    c = 1 < c ? c : 2;
    void 0 === b && (2 < c ? (b = a.slice()) : (b = Array(d)));
    for (var e = 0; e < d; e += c)
      (b[e] = (180 * a[e]) / Dh),
        (b[e + 1] =
          (360 * Math.atan(Math.exp(a[e + 1] / 6378137))) / Math.PI - 90);
    return b;
  }
  var Eh = new oc(6378137);
  function Fh(a, b) {
    sc.call(this, {
      code: a,
      units: "degrees",
      extent: Gh,
      axisOrientation: b,
      global: !0,
      metersPerUnit: Hh,
      worldExtent: Gh
    });
  }
  v(Fh, sc);
  var Gh = [-180, -90, 180, 90],
    Hh = (Math.PI * Eh.radius) / 180,
    Hc = [
      new Fh("CRS:84"),
      new Fh("EPSG:4326", "neu"),
      new Fh("urn:ogc:def:crs:EPSG::4326", "neu"),
      new Fh("urn:ogc:def:crs:EPSG:6.6:4326", "neu"),
      new Fh("urn:ogc:def:crs:OGC:1.3:CRS84"),
      new Fh("urn:ogc:def:crs:OGC:2:84"),
      new Fh("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
      new Fh("urn:x-ogc:def:crs:EPSG:4326", "neu")
    ];
  function Ih() {
    Ac(Ec);
    Ac(Hc);
    Dc();
  }
  function Jh(a, b, c, d, e) {
    Ia.call(this, a);
    this.vectorContext = b;
    this.frameState = c;
    this.context = d;
    this.glContext = e;
  }
  v(Jh, Ia);
  function Kh(a) {
    var b = ta({}, a);
    delete b.source;
    qh.call(this, b);
    this.A = this.v = this.o = null;
    a.map && this.setMap(a.map);
    B(this, Ua("source"), this.il, this);
    this.Pc(a.source ? a.source : null);
  }
  v(Kh, qh);
  function Lh(a, b) {
    return a.visible && b >= a.minResolution && b < a.maxResolution;
  }
  k = Kh.prototype;
  k.sf = function(a) {
    a = a ? a : [];
    a.push(wh(this));
    return a;
  };
  k.la = function() {
    return this.get("source") || null;
  };
  k.uf = function() {
    var a = this.la();
    return a ? a.W() : "undefined";
  };
  k.Rm = function() {
    this.s();
  };
  k.il = function() {
    this.A && (ya(this.A), (this.A = null));
    var a = this.la();
    a && (this.A = B(a, "change", this.Rm, this));
    this.s();
  };
  k.setMap = function(a) {
    this.o && (ya(this.o), (this.o = null));
    a || this.s();
    this.v && (ya(this.v), (this.v = null));
    a &&
      ((this.o = B(
        a,
        "precompose",
        function(a) {
          var c = wh(this);
          c.me = !1;
          c.zIndex = Infinity;
          a.frameState.layerStatesArray.push(c);
          a.frameState.layerStates[x(this)] = c;
        },
        this
      )),
      (this.v = B(this, "change", a.render, a)),
      this.s());
  };
  k.Pc = function(a) {
    this.set("source", a);
  };
  function Mh() {
    this.b = {};
    this.a = 0;
  }
  Mh.prototype.clear = function() {
    this.b = {};
    this.a = 0;
  };
  Mh.prototype.get = function(a, b, c) {
    a = b + ":" + a + ":" + (c ? Ae(c) : "null");
    return a in this.b ? this.b[a] : null;
  };
  Mh.prototype.set = function(a, b, c, d) {
    this.b[b + ":" + a + ":" + (c ? Ae(c) : "null")] = d;
    ++this.a;
  };
  var Nh = new Mh();
  var Oh = Array(6);
  function Ph() {
    return [1, 0, 0, 1, 0, 0];
  }
  function Qh(a) {
    return Rh(a, 1, 0, 0, 1, 0, 0);
  }
  function Sh(a, b) {
    var c = a[0],
      d = a[1],
      e = a[2],
      f = a[3],
      g = a[4],
      h = a[5],
      l = b[0],
      m = b[1],
      p = b[2],
      n = b[3],
      q = b[4],
      r = b[5];
    a[0] = c * l + e * m;
    a[1] = d * l + f * m;
    a[2] = c * p + e * n;
    a[3] = d * p + f * n;
    a[4] = c * q + e * r + g;
    a[5] = d * q + f * r + h;
    return a;
  }
  function Rh(a, b, c, d, e, f, g) {
    a[0] = b;
    a[1] = c;
    a[2] = d;
    a[3] = e;
    a[4] = f;
    a[5] = g;
    return a;
  }
  function Th(a, b) {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];
    return a;
  }
  function Uh(a, b) {
    var c = b[0],
      d = b[1];
    b[0] = a[0] * c + a[2] * d + a[4];
    b[1] = a[1] * c + a[3] * d + a[5];
    return b;
  }
  function Vh(a, b) {
    var c = Math.cos(b),
      d = Math.sin(b);
    Sh(a, Rh(Oh, c, d, -d, c, 0, 0));
  }
  function Wh(a, b, c) {
    return Sh(a, Rh(Oh, b, 0, 0, c, 0, 0));
  }
  function Xh(a, b, c) {
    Sh(a, Rh(Oh, 1, 0, 0, 1, b, c));
  }
  function Yh(a, b, c, d, e, f, g, h) {
    var l = Math.sin(f);
    f = Math.cos(f);
    a[0] = d * f;
    a[1] = e * l;
    a[2] = -d * l;
    a[3] = e * f;
    a[4] = g * d * f - h * d * l + b;
    a[5] = g * e * l + h * e * f + c;
    return a;
  }
  function Zh(a) {
    var b = a[0] * a[3] - a[1] * a[2];
    ha(0 !== b, 32);
    var c = a[0],
      d = a[1],
      e = a[2],
      f = a[3],
      g = a[4],
      h = a[5];
    a[0] = f / b;
    a[1] = -d / b;
    a[2] = -e / b;
    a[3] = c / b;
    a[4] = (e * h - f * g) / b;
    a[5] = -(c * h - d * g) / b;
    return a;
  }
  function $h(a, b) {
    this.l = b;
    this.f = {};
    this.v = {};
  }
  v($h, Ga);
  function ai(a) {
    var b = a.viewState,
      c = a.coordinateToPixelTransform,
      d = a.pixelToCoordinateTransform;
    Yh(
      c,
      a.size[0] / 2,
      a.size[1] / 2,
      1 / b.resolution,
      -1 / b.resolution,
      -b.rotation,
      -b.center[0],
      -b.center[1]
    );
    Zh(Th(d, c));
  }
  k = $h.prototype;
  k.oa = function() {
    for (var a in this.f) Ha(this.f[a]);
  };
  function bi() {
    if (32 < Nh.a) {
      var a = 0,
        b,
        c;
      for (b in Nh.b)
        (c = Nh.b[b]), 0 !== (a++ & 3) || Oa(c) || (delete Nh.b[b], --Nh.a);
    }
  }
  k.Ba = function(a, b, c, d, e, f, g) {
    function h(a, c) {
      var f = x(a).toString(),
        g = b.layerStates[x(c)].me;
      if (!(f in b.skippedFeatureUids) || g) return d.call(e, a, g ? c : null);
    }
    var l,
      m = b.viewState,
      p = m.resolution,
      n = m.projection,
      m = a;
    if (n.a) {
      var n = n.G(),
        q = dc(n),
        r = a[0];
      if (r < n[0] || r > n[2]) m = [r + q * Math.ceil((n[0] - r) / q), a[1]];
    }
    n = b.layerStatesArray;
    for (q = n.length - 1; 0 <= q; --q) {
      var u = n[q],
        r = u.layer;
      if (
        Lh(u, p) &&
        f.call(g, r) &&
        ((u = ci(this, r)),
        r.la() && (l = u.Ba(r.la().D ? m : a, b, c, h, e)),
        l)
      )
        return l;
    }
  };
  k.Ch = function(a, b, c, d, e) {
    return void 0 !== this.Ba(a, b, c, mc, this, d, e);
  };
  function ci(a, b) {
    var c = x(b).toString();
    if (c in a.f) return a.f[c];
    var d = a.Ag(b);
    a.f[c] = d;
    a.v[c] = B(d, "change", a.Uk, a);
    return d;
  }
  k.Uk = function() {
    this.l.render();
  };
  k.ag = ea;
  k.Yo = function(a, b) {
    for (var c in this.f)
      if (!(b && c in b.layerStates)) {
        var d = c,
          e = this.f[d];
        delete this.f[d];
        ya(this.v[d]);
        delete this.v[d];
        Ha(e);
      }
  };
  function di(a, b) {
    for (var c in a.f)
      if (!(c in b.layerStates)) {
        b.postRenderFunctions.push(a.Yo.bind(a));
        break;
      }
  }
  function fb(a, b) {
    return a.zIndex - b.zIndex;
  }
  function ei(a) {
    Kh.call(this, a ? a : {});
  }
  v(ei, Kh);
  function F(a) {
    a = a ? a : {};
    var b = ta({}, a);
    delete b.preload;
    delete b.useInterimTilesOnError;
    Kh.call(this, b);
    this.l(void 0 !== a.preload ? a.preload : 0);
    this.C(void 0 !== a.useInterimTilesOnError ? a.useInterimTilesOnError : !0);
  }
  v(F, Kh);
  F.prototype.f = function() {
    return this.get(fi);
  };
  F.prototype.l = function(a) {
    this.set(fi, a);
  };
  F.prototype.c = function() {
    return this.get(gi);
  };
  F.prototype.C = function(a) {
    this.set(gi, a);
  };
  var fi = "preload",
    gi = "useInterimTilesOnError";
  function hi(a, b, c, d, e) {
    Na.call(this);
    this.j = e;
    this.extent = a;
    this.f = c;
    this.resolution = b;
    this.state = d;
  }
  v(hi, Na);
  hi.prototype.s = function() {
    this.b("change");
  };
  hi.prototype.G = function() {
    return this.extent;
  };
  hi.prototype.W = function() {
    return this.state;
  };
  function ii(a, b, c, d, e, f, g) {
    hi.call(this, a, b, c, ji, d);
    this.o = e;
    this.g = new Image();
    null !== f && (this.g.crossOrigin = f);
    this.i = {};
    this.c = null;
    this.state = ji;
    this.l = g;
  }
  v(ii, hi);
  ii.prototype.a = function(a) {
    if (void 0 !== a) {
      var b;
      a = x(a);
      if (a in this.i) return this.i[a];
      wa(this.i) ? (b = this.g) : (b = this.g.cloneNode(!1));
      return (this.i[a] = b);
    }
    return this.g;
  };
  ii.prototype.v = function() {
    this.state = ki;
    this.c.forEach(ya);
    this.c = null;
    this.s();
  };
  ii.prototype.H = function() {
    void 0 === this.resolution &&
      (this.resolution = ec(this.extent) / this.g.height);
    this.state = li;
    this.c.forEach(ya);
    this.c = null;
    this.s();
  };
  ii.prototype.load = function() {
    if (this.state == ji || this.state == ki)
      (this.state = mi),
        this.s(),
        (this.c = [
          Da(this.g, "error", this.v, this),
          Da(this.g, "load", this.H, this)
        ]),
        this.l(this, this.o);
  };
  var ji = 0,
    mi = 1,
    li = 2,
    ki = 3;
  var ni = [0, 0, 0, 1],
    oi = [],
    pi = [0, 0, 0, 1];
  function qi(a, b, c, d) {
    0 !== b && (a.translate(c, d), a.rotate(b), a.translate(-c, -d));
  }
  function ri(a) {
    this.l = a.opacity;
    this.H = a.rotateWithView;
    this.o = a.rotation;
    this.i = a.scale;
    this.u = a.snapToPixel;
  }
  k = ri.prototype;
  k.ye = function() {
    return this.l;
  };
  k.ze = function() {
    return this.H;
  };
  k.Ae = function() {
    return this.o;
  };
  k.Be = function() {
    return this.i;
  };
  k.ee = function() {
    return this.u;
  };
  k.dd = function(a) {
    this.l = a;
  };
  k.Ce = function(a) {
    this.o = a;
  };
  k.ed = function(a) {
    this.i = a;
  };
  function si(a) {
    this.C = this.A = this.j = null;
    this.f = void 0 !== a.fill ? a.fill : null;
    this.P = [0, 0];
    this.b = a.points;
    this.a = void 0 !== a.radius ? a.radius : a.radius1;
    this.c = void 0 !== a.radius2 ? a.radius2 : this.a;
    this.v = void 0 !== a.angle ? a.angle : 0;
    this.g = void 0 !== a.stroke ? a.stroke : null;
    this.L = this.va = this.U = this.ra = null;
    this.D = a.atlasManager;
    ti(this, this.D);
    ri.call(this, {
      opacity: 1,
      rotateWithView: void 0 !== a.rotateWithView ? a.rotateWithView : !1,
      rotation: void 0 !== a.rotation ? a.rotation : 0,
      scale: 1,
      snapToPixel: void 0 !== a.snapToPixel ? a.snapToPixel : !0
    });
  }
  v(si, ri);
  k = si.prototype;
  k.clone = function() {
    var a = new si({
      fill: this.f ? this.f.clone() : void 0,
      points: this.c !== this.a ? this.b / 2 : this.b,
      radius: this.a,
      radius2: this.c,
      angle: this.v,
      snapToPixel: this.u,
      stroke: this.g ? this.g.clone() : void 0,
      rotation: this.o,
      rotateWithView: this.H,
      atlasManager: this.D
    });
    a.dd(this.l);
    a.ed(this.i);
    return a;
  };
  k.Ac = function() {
    return this.ra;
  };
  k.Nh = function() {
    return this.v;
  };
  k.Oh = function() {
    return this.f;
  };
  k.Lf = function() {
    return this.C;
  };
  k.Ic = function() {
    return this.A;
  };
  k.de = function() {
    return this.va;
  };
  k.xe = function() {
    return li;
  };
  k.Jc = function() {
    return this.P;
  };
  k.Ph = function() {
    return this.b;
  };
  k.Qh = function() {
    return this.a;
  };
  k.Vg = function() {
    return this.c;
  };
  k.ac = function() {
    return this.U;
  };
  k.Rh = function() {
    return this.g;
  };
  k.eh = ea;
  k.load = ea;
  k.Ii = ea;
  function ti(a, b) {
    var c,
      d = "",
      e = "",
      f = 0,
      g = null,
      h,
      l = 0;
    a.g &&
      ((h = Ce(a.g.b)),
      (l = a.g.f),
      void 0 === l && (l = 1),
      (g = a.g.g),
      nf || (g = null),
      (e = a.g.i),
      void 0 === e && (e = "round"),
      (d = a.g.c),
      void 0 === d && (d = "round"),
      (f = a.g.j),
      void 0 === f && (f = 10));
    var m = 2 * (a.a + l) + 1,
      d = {
        strokeStyle: h,
        Fi: l,
        size: m,
        lineCap: d,
        lineDash: g,
        lineJoin: e,
        miterLimit: f
      };
    void 0 === b
      ? ((e = De(m, m)),
        (a.A = e.canvas),
        (c = m = a.A.width),
        a.Eg(d, e, 0, 0),
        (a.L = [d.size, d.size]),
        a.f
          ? (a.C = a.A)
          : ((e = De(d.size, d.size)), (a.C = e.canvas), a.Dg(d, e, 0, 0)))
      : ((m = Math.round(m)),
        (e = !a.f) && (c = a.Dg.bind(a, d)),
        a.g
          ? ((f = a.g),
            void 0 === f.a &&
              ((f.a = "s"),
              (f.a = f.b
                ? "string" === typeof f.b
                  ? f.a + f.b
                  : f.a + x(f.b).toString()
                : f.a + "-"),
              (f.a +=
                "," +
                (void 0 !== f.c ? f.c.toString() : "-") +
                "," +
                (f.g ? f.g.toString() : "-") +
                "," +
                (void 0 !== f.i ? f.i : "-") +
                "," +
                (void 0 !== f.j ? f.j.toString() : "-") +
                "," +
                (void 0 !== f.f ? f.f.toString() : "-"))),
            (f = f.a))
          : (f = "-"),
        a.f
          ? ((g = a.f),
            void 0 === g.a &&
              (g.a =
                g.b instanceof CanvasPattern || g.b instanceof CanvasGradient
                  ? x(g.b).toString()
                  : "f" + (g.b ? Ae(g.b) : "-")),
            (g = g.a))
          : (g = "-"),
        (a.j &&
          f == a.j[1] &&
          g == a.j[2] &&
          a.a == a.j[3] &&
          a.c == a.j[4] &&
          a.v == a.j[5] &&
          a.b == a.j[6]) ||
          (a.j = [
            "r" +
              f +
              g +
              (void 0 !== a.a ? a.a.toString() : "-") +
              (void 0 !== a.c ? a.c.toString() : "-") +
              (void 0 !== a.v ? a.v.toString() : "-") +
              (void 0 !== a.b ? a.b.toString() : "-"),
            f,
            g,
            a.a,
            a.c,
            a.v,
            a.b
          ]),
        (d = b.add(a.j[0], m, m, a.Eg.bind(a, d), c)),
        (a.A = d.image),
        (a.P = [d.offsetX, d.offsetY]),
        (c = d.image.width),
        e
          ? ((a.C = d.yf), (a.L = [d.yf.width, d.yf.height]))
          : ((a.C = a.A), (a.L = [c, c])));
    a.ra = [m / 2, m / 2];
    a.U = [m, m];
    a.va = [c, c];
  }
  k.Eg = function(a, b, c, d) {
    var e;
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.translate(c, d);
    b.beginPath();
    if (Infinity === this.b)
      b.arc(a.size / 2, a.size / 2, this.a, 0, 2 * Math.PI, !0);
    else
      for (this.c !== this.a && (this.b *= 2), c = 0; c <= this.b; c++)
        (d = (2 * c * Math.PI) / this.b - Math.PI / 2 + this.v),
          (e = 0 === c % 2 ? this.a : this.c),
          b.lineTo(a.size / 2 + e * Math.cos(d), a.size / 2 + e * Math.sin(d));
    this.f && ((b.fillStyle = Ce(this.f.b)), b.fill());
    this.g &&
      ((b.strokeStyle = a.strokeStyle),
      (b.lineWidth = a.Fi),
      a.lineDash && b.setLineDash(a.lineDash),
      (b.lineCap = a.lineCap),
      (b.lineJoin = a.lineJoin),
      (b.miterLimit = a.miterLimit),
      b.stroke());
    b.closePath();
  };
  k.Dg = function(a, b, c, d) {
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.translate(c, d);
    b.beginPath();
    if (Infinity === this.b)
      b.arc(a.size / 2, a.size / 2, this.a, 0, 2 * Math.PI, !0);
    else {
      this.c !== this.a && (this.b *= 2);
      var e;
      for (c = 0; c <= this.b; c++)
        (e = (2 * c * Math.PI) / this.b - Math.PI / 2 + this.v),
          (d = 0 === c % 2 ? this.a : this.c),
          b.lineTo(a.size / 2 + d * Math.cos(e), a.size / 2 + d * Math.sin(e));
    }
    b.fillStyle = ni;
    b.fill();
    this.g &&
      ((b.strokeStyle = a.strokeStyle),
      (b.lineWidth = a.Fi),
      a.lineDash && b.setLineDash(a.lineDash),
      b.stroke());
    b.closePath();
  };
  function ui(a) {
    a = a || {};
    si.call(this, {
      points: Infinity,
      fill: a.fill,
      radius: a.radius,
      snapToPixel: a.snapToPixel,
      stroke: a.stroke,
      atlasManager: a.atlasManager
    });
  }
  v(ui, si);
  ui.prototype.clone = function() {
    var a = new ui({
      fill: this.f ? this.f.clone() : void 0,
      stroke: this.g ? this.g.clone() : void 0,
      radius: this.a,
      snapToPixel: this.u,
      atlasManager: this.D
    });
    a.dd(this.l);
    a.ed(this.i);
    return a;
  };
  ui.prototype.Qa = function(a) {
    this.a = a;
    ti(this, this.D);
  };
  function vi(a) {
    a = a || {};
    this.b = void 0 !== a.color ? a.color : null;
    this.a = void 0;
  }
  vi.prototype.clone = function() {
    var a = this.b;
    return new vi({ color: a && a.slice ? a.slice() : a || void 0 });
  };
  vi.prototype.g = function() {
    return this.b;
  };
  vi.prototype.f = function(a) {
    this.b = a;
    this.a = void 0;
  };
  function wi(a) {
    a = a || {};
    this.b = void 0 !== a.color ? a.color : null;
    this.c = a.lineCap;
    this.g = void 0 !== a.lineDash ? a.lineDash : null;
    this.i = a.lineJoin;
    this.j = a.miterLimit;
    this.f = a.width;
    this.a = void 0;
  }
  k = wi.prototype;
  k.clone = function() {
    var a = this.b;
    return new wi({
      color: a && a.slice ? a.slice() : a || void 0,
      lineCap: this.c,
      lineDash: this.g ? this.g.slice() : void 0,
      lineJoin: this.i,
      miterLimit: this.j,
      width: this.f
    });
  };
  k.In = function() {
    return this.b;
  };
  k.kk = function() {
    return this.c;
  };
  k.Jn = function() {
    return this.g;
  };
  k.lk = function() {
    return this.i;
  };
  k.rk = function() {
    return this.j;
  };
  k.Kn = function() {
    return this.f;
  };
  k.Ln = function(a) {
    this.b = a;
    this.a = void 0;
  };
  k.ip = function(a) {
    this.c = a;
    this.a = void 0;
  };
  k.setLineDash = function(a) {
    this.g = a;
    this.a = void 0;
  };
  k.jp = function(a) {
    this.i = a;
    this.a = void 0;
  };
  k.kp = function(a) {
    this.j = a;
    this.a = void 0;
  };
  k.np = function(a) {
    this.f = a;
    this.a = void 0;
  };
  function xi(a) {
    a = a || {};
    this.i = null;
    this.c = yi;
    void 0 !== a.geometry && this.Pa(a.geometry);
    this.f = void 0 !== a.fill ? a.fill : null;
    this.a = void 0 !== a.image ? a.image : null;
    this.g = void 0 !== a.stroke ? a.stroke : null;
    this.j = void 0 !== a.text ? a.text : null;
    this.b = a.zIndex;
  }
  k = xi.prototype;
  k.clone = function() {
    var a = this.V();
    a && a.clone && (a = a.clone());
    return new xi({
      geometry: a,
      fill: this.f ? this.f.clone() : void 0,
      image: this.a ? this.a.clone() : void 0,
      stroke: this.g ? this.g.clone() : void 0,
      text: this.Ka() ? this.Ka().clone() : void 0,
      zIndex: this.b
    });
  };
  k.V = function() {
    return this.i;
  };
  k.fk = function() {
    return this.c;
  };
  k.Mn = function() {
    return this.f;
  };
  k.Qn = function(a) {
    this.f = a;
  };
  k.Nn = function() {
    return this.a;
  };
  k.Rn = function(a) {
    this.a = a;
  };
  k.On = function() {
    return this.g;
  };
  k.Sn = function(a) {
    this.g = a;
  };
  k.Ka = function() {
    return this.j;
  };
  k.Tn = function(a) {
    this.j = a;
  };
  k.Pn = function() {
    return this.b;
  };
  k.Pa = function(a) {
    "function" === typeof a
      ? (this.c = a)
      : "string" === typeof a
      ? (this.c = function(b) {
          return b.get(a);
        })
      : a
      ? a &&
        (this.c = function() {
          return a;
        })
      : (this.c = yi);
    this.i = a;
  };
  k.Un = function(a) {
    this.b = a;
  };
  function zi(a) {
    if ("function" !== typeof a) {
      var b;
      Array.isArray(a) ? (b = a) : (ha(a instanceof xi, 41), (b = [a]));
      a = function() {
        return b;
      };
    }
    return a;
  }
  var Ai = null;
  function Bi() {
    if (!Ai) {
      var a = new vi({ color: "rgba(255,255,255,0.4)" }),
        b = new wi({ color: "#3399CC", width: 1.25 });
      Ai = [
        new xi({
          image: new ui({ fill: a, stroke: b, radius: 5 }),
          fill: a,
          stroke: b
        })
      ];
    }
    return Ai;
  }
  function Ci() {
    var a = {},
      b = [255, 255, 255, 1],
      c = [0, 153, 255, 1];
    a.Polygon = [new xi({ fill: new vi({ color: [255, 255, 255, 0.5] }) })];
    a.MultiPolygon = a.Polygon;
    a.LineString = [
      new xi({ stroke: new wi({ color: b, width: 5 }) }),
      new xi({ stroke: new wi({ color: c, width: 3 }) })
    ];
    a.MultiLineString = a.LineString;
    a.Circle = a.Polygon.concat(a.LineString);
    a.Point = [
      new xi({
        image: new ui({
          radius: 6,
          fill: new vi({ color: c }),
          stroke: new wi({ color: b, width: 1.5 })
        }),
        zIndex: Infinity
      })
    ];
    a.MultiPoint = a.Point;
    a.GeometryCollection = a.Polygon.concat(a.LineString, a.Point);
    return a;
  }
  function yi(a) {
    return a.V();
  }
  function G(a) {
    a = a ? a : {};
    var b = ta({}, a);
    delete b.style;
    delete b.renderBuffer;
    delete b.updateWhileAnimating;
    delete b.updateWhileInteracting;
    Kh.call(this, b);
    this.i = void 0 !== a.renderBuffer ? a.renderBuffer : 100;
    this.C = null;
    this.j = void 0;
    this.l(a.style);
    this.Z = void 0 !== a.updateWhileAnimating ? a.updateWhileAnimating : !1;
    this.fa =
      void 0 !== a.updateWhileInteracting ? a.updateWhileInteracting : !1;
  }
  v(G, Kh);
  G.prototype.D = function() {
    return this.C;
  };
  G.prototype.L = function() {
    return this.j;
  };
  G.prototype.l = function(a) {
    this.C = void 0 !== a ? a : Bi;
    this.j = null === a ? void 0 : zi(this.C);
    this.s();
  };
  function H(a) {
    a = a ? a : {};
    var b = ta({}, a);
    delete b.preload;
    delete b.useInterimTilesOnError;
    G.call(this, b);
    this.P(a.preload ? a.preload : 0);
    this.U(a.useInterimTilesOnError ? a.useInterimTilesOnError : !0);
    ha(
      void 0 == a.renderMode ||
        a.renderMode == Di ||
        a.renderMode == Ei ||
        a.renderMode == Fi,
      28
    );
    this.u = a.renderMode || Ei;
  }
  v(H, G);
  H.prototype.f = function() {
    return this.get(Gi);
  };
  H.prototype.c = function() {
    return this.get(Hi);
  };
  H.prototype.P = function(a) {
    this.set(fi, a);
  };
  H.prototype.U = function(a) {
    this.set(gi, a);
  };
  var Gi = "preload",
    Hi = "useInterimTilesOnError",
    Di = "image",
    Ei = "hybrid",
    Fi = "vector";
  function Ii() {}
  function Ji(a, b, c, d, e) {
    this.f = a;
    this.A = b;
    this.c = c;
    this.C = d;
    this.fc = e;
    this.i = this.b = this.a = this.Z = this.Qa = this.U = null;
    this.fa = this.eb = this.H = this.ra = this.L = this.D = 0;
    this.sa = !1;
    this.j = this.zb = 0;
    this.na = !1;
    this.va = 0;
    this.g = "";
    this.xa = this.Fa = 0;
    this.Ja = !1;
    this.o = this.Ua = 0;
    this.P = this.v = this.l = null;
    this.u = [];
    this.Ob = Ph();
  }
  v(Ji, Ii);
  function Ki(a, b, c) {
    if (a.i) {
      b = Sc(b, 0, c, 2, a.C, a.u);
      c = a.f;
      var d = a.Ob,
        e = c.globalAlpha;
      1 != a.H && (c.globalAlpha = e * a.H);
      var f = a.zb;
      a.sa && (f += a.fc);
      var g, h;
      g = 0;
      for (h = b.length; g < h; g += 2) {
        var l = b[g] - a.D,
          m = b[g + 1] - a.L;
        a.na && ((l = Math.round(l)), (m = Math.round(m)));
        if (0 !== f || 1 != a.j) {
          var p = l + a.D,
            n = m + a.L;
          Yh(d, p, n, a.j, a.j, f, -p, -n);
          c.setTransform.apply(c, d);
        }
        c.drawImage(a.i, a.eb, a.fa, a.va, a.ra, l, m, a.va, a.ra);
      }
      (0 === f && 1 == a.j) || c.setTransform(1, 0, 0, 1, 0, 0);
      1 != a.H && (c.globalAlpha = e);
    }
  }
  function Li(a, b, c, d) {
    var e = 0;
    if (a.P && "" !== a.g) {
      a.l && Mi(a, a.l);
      a.v && Ni(a, a.v);
      var f = a.P,
        g = a.f,
        h = a.Z;
      h
        ? (h.font != f.font && (h.font = g.font = f.font),
          h.textAlign != f.textAlign &&
            (h.textAlign = g.textAlign = f.textAlign),
          h.textBaseline != f.textBaseline &&
            (h.textBaseline = g.textBaseline = f.textBaseline))
        : ((g.font = f.font),
          (g.textAlign = f.textAlign),
          (g.textBaseline = f.textBaseline),
          (a.Z = {
            font: f.font,
            textAlign: f.textAlign,
            textBaseline: f.textBaseline
          }));
      b = Sc(b, e, c, d, a.C, a.u);
      f = a.f;
      g = a.Ua;
      for (a.Ja && (g += a.fc); e < c; e += d) {
        var h = b[e] + a.Fa,
          l = b[e + 1] + a.xa;
        if (0 !== g || 1 != a.o) {
          var m = Yh(a.Ob, h, l, a.o, a.o, g, -h, -l);
          f.setTransform.apply(f, m);
        }
        a.v && f.strokeText(a.g, h, l);
        a.l && f.fillText(a.g, h, l);
      }
      (0 === g && 1 == a.o) || f.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
  function Oi(a, b, c, d, e, f) {
    var g = a.f;
    a = Sc(b, c, d, e, a.C, a.u);
    g.moveTo(a[0], a[1]);
    b = a.length;
    f && (b -= 2);
    for (c = 2; c < b; c += 2) g.lineTo(a[c], a[c + 1]);
    f && g.closePath();
    return d;
  }
  function Pi(a, b, c, d, e) {
    var f, g;
    f = 0;
    for (g = d.length; f < g; ++f) c = Oi(a, b, c, d[f], e, !0);
    return c;
  }
  k = Ji.prototype;
  k.hc = function(a) {
    if (jc(this.c, a.G())) {
      if (this.a || this.b) {
        this.a && Mi(this, this.a);
        this.b && Ni(this, this.b);
        var b;
        b = this.C;
        var c = this.u,
          d = a.ia();
        b = d ? Sc(d, 0, d.length, a.pa(), b, c) : null;
        c = b[2] - b[0];
        d = b[3] - b[1];
        c = Math.sqrt(c * c + d * d);
        d = this.f;
        d.beginPath();
        d.arc(b[0], b[1], c, 0, 2 * Math.PI);
        this.a && d.fill();
        this.b && d.stroke();
      }
      "" !== this.g && Li(this, a.Fd(), 2, 2);
    }
  };
  k.Gd = function(a) {
    this.Ma(a.f, a.g);
    this.dc(a.a);
    this.$b(a.Ka());
  };
  k.tc = function(a) {
    switch (a.Y()) {
      case "Point":
        this.xc(a);
        break;
      case "LineString":
        this.Pb(a);
        break;
      case "Polygon":
        this.yc(a);
        break;
      case "MultiPoint":
        this.vc(a);
        break;
      case "MultiLineString":
        this.uc(a);
        break;
      case "MultiPolygon":
        this.wc(a);
        break;
      case "GeometryCollection":
        this.kf(a);
        break;
      case "Circle":
        this.hc(a);
    }
  };
  k.jf = function(a, b) {
    var c = (0, b.c)(a);
    c && jc(this.c, c.G()) && (this.Gd(b), this.tc(c));
  };
  k.kf = function(a) {
    a = a.f;
    var b, c;
    b = 0;
    for (c = a.length; b < c; ++b) this.tc(a[b]);
  };
  k.xc = function(a) {
    var b = a.ia();
    a = a.pa();
    this.i && Ki(this, b, b.length);
    "" !== this.g && Li(this, b, b.length, a);
  };
  k.vc = function(a) {
    var b = a.ia();
    a = a.pa();
    this.i && Ki(this, b, b.length);
    "" !== this.g && Li(this, b, b.length, a);
  };
  k.Pb = function(a) {
    if (jc(this.c, a.G())) {
      if (this.b) {
        Ni(this, this.b);
        var b = this.f,
          c = a.ia();
        b.beginPath();
        Oi(this, c, 0, c.length, a.pa(), !1);
        b.stroke();
      }
      "" !== this.g && ((a = Qi(a)), Li(this, a, 2, 2));
    }
  };
  k.uc = function(a) {
    var b = a.G();
    if (jc(this.c, b)) {
      if (this.b) {
        Ni(this, this.b);
        var b = this.f,
          c = a.ia(),
          d = 0,
          e = a.Kb(),
          f = a.pa();
        b.beginPath();
        var g, h;
        g = 0;
        for (h = e.length; g < h; ++g) d = Oi(this, c, d, e[g], f, !1);
        b.stroke();
      }
      "" !== this.g && ((a = Ri(a)), Li(this, a, a.length, 2));
    }
  };
  k.yc = function(a) {
    if (jc(this.c, a.G())) {
      if (this.b || this.a) {
        this.a && Mi(this, this.a);
        this.b && Ni(this, this.b);
        var b = this.f;
        b.beginPath();
        Pi(this, a.Vb(), 0, a.Kb(), a.pa());
        this.a && b.fill();
        this.b && b.stroke();
      }
      "" !== this.g && ((a = Ad(a)), Li(this, a, 2, 2));
    }
  };
  k.wc = function(a) {
    if (jc(this.c, a.G())) {
      if (this.b || this.a) {
        this.a && Mi(this, this.a);
        this.b && Ni(this, this.b);
        var b = this.f,
          c = Si(a),
          d = 0,
          e = a.c,
          f = a.pa(),
          g,
          h;
        b.beginPath();
        g = 0;
        for (h = e.length; g < h; ++g) d = Pi(this, c, d, e[g], f);
        this.a && b.fill();
        this.b && b.stroke();
      }
      "" !== this.g && ((a = Ti(a)), Li(this, a, a.length, 2));
    }
  };
  function Mi(a, b) {
    var c = a.f,
      d = a.U;
    d
      ? d.fillStyle != b.fillStyle && (d.fillStyle = c.fillStyle = b.fillStyle)
      : ((c.fillStyle = b.fillStyle), (a.U = { fillStyle: b.fillStyle }));
  }
  function Ni(a, b) {
    var c = a.f,
      d = a.Qa;
    d
      ? (d.lineCap != b.lineCap && (d.lineCap = c.lineCap = b.lineCap),
        nf &&
          !db(d.lineDash, b.lineDash) &&
          c.setLineDash((d.lineDash = b.lineDash)),
        d.lineJoin != b.lineJoin && (d.lineJoin = c.lineJoin = b.lineJoin),
        d.lineWidth != b.lineWidth && (d.lineWidth = c.lineWidth = b.lineWidth),
        d.miterLimit != b.miterLimit &&
          (d.miterLimit = c.miterLimit = b.miterLimit),
        d.strokeStyle != b.strokeStyle &&
          (d.strokeStyle = c.strokeStyle = b.strokeStyle))
      : ((c.lineCap = b.lineCap),
        nf && c.setLineDash(b.lineDash),
        (c.lineJoin = b.lineJoin),
        (c.lineWidth = b.lineWidth),
        (c.miterLimit = b.miterLimit),
        (c.strokeStyle = b.strokeStyle),
        (a.Qa = {
          lineCap: b.lineCap,
          lineDash: b.lineDash,
          lineJoin: b.lineJoin,
          lineWidth: b.lineWidth,
          miterLimit: b.miterLimit,
          strokeStyle: b.strokeStyle
        }));
  }
  k.Ma = function(a, b) {
    if (a) {
      var c = a.b;
      this.a = { fillStyle: Ce(c ? c : ni) };
    } else this.a = null;
    if (b) {
      var c = b.b,
        d = b.c,
        e = b.g,
        f = b.i,
        g = b.f,
        h = b.j;
      this.b = {
        lineCap: void 0 !== d ? d : "round",
        lineDash: e ? e : oi,
        lineJoin: void 0 !== f ? f : "round",
        lineWidth: this.A * (void 0 !== g ? g : 1),
        miterLimit: void 0 !== h ? h : 10,
        strokeStyle: Ce(c ? c : pi)
      };
    } else this.b = null;
  };
  k.dc = function(a) {
    if (a) {
      var b = a.Ac(),
        c = a.Ic(1),
        d = a.Jc(),
        e = a.ac();
      this.D = b[0];
      this.L = b[1];
      this.ra = e[1];
      this.i = c;
      this.H = a.l;
      this.eb = d[0];
      this.fa = d[1];
      this.sa = a.H;
      this.zb = a.o;
      this.j = a.i;
      this.na = a.u;
      this.va = e[0];
    } else this.i = null;
  };
  k.$b = function(a) {
    if (a) {
      var b = a.b;
      b
        ? ((b = b.b), (this.l = { fillStyle: Ce(b ? b : ni) }))
        : (this.l = null);
      var c = a.f;
      if (c) {
        var b = c.b,
          d = c.c,
          e = c.g,
          f = c.i,
          g = c.f,
          c = c.j;
        this.v = {
          lineCap: void 0 !== d ? d : "round",
          lineDash: e ? e : oi,
          lineJoin: void 0 !== f ? f : "round",
          lineWidth: void 0 !== g ? g : 1,
          miterLimit: void 0 !== c ? c : 10,
          strokeStyle: Ce(b ? b : pi)
        };
      } else this.v = null;
      var b = a.g,
        d = a.c,
        e = a.i,
        f = a.v,
        g = a.j,
        c = a.a,
        h = a.Ka(),
        l = a.l;
      a = a.o;
      this.P = {
        font: void 0 !== b ? b : "10px sans-serif",
        textAlign: void 0 !== l ? l : "center",
        textBaseline: void 0 !== a ? a : "middle"
      };
      this.g = void 0 !== h ? h : "";
      this.Fa = void 0 !== d ? this.A * d : 0;
      this.xa = void 0 !== e ? this.A * e : 0;
      this.Ja = void 0 !== f ? f : !1;
      this.Ua = void 0 !== g ? g : 0;
      this.o = this.A * (void 0 !== c ? c : 1);
    } else this.g = "";
  };
  function Ui(a) {
    Pa.call(this);
    this.a = a;
  }
  v(Ui, Pa);
  Ui.prototype.Ba = ea;
  Ui.prototype.te = nc;
  Ui.prototype.hf = function(a, b, c) {
    return function(d, e) {
      return Vi(a, b, d, e, function(a) {
        c[d] || (c[d] = {});
        c[d][a.Ca.toString()] = a;
      });
    };
  };
  Ui.prototype.Fa = function(a) {
    a.target.W() === li && Wi(this);
  };
  function Xi(a, b) {
    var c = b.W();
    c != li && c != ki && B(b, "change", a.Fa, a);
    c == ji && (b.load(), (c = b.W()));
    return c == li;
  }
  function Wi(a) {
    var b = a.a;
    b.Fb() && "ready" == b.uf() && a.s();
  }
  function Yi(a, b) {
    b.Ih() &&
      a.postRenderFunctions.push(
        function(a, b, e) {
          b = x(a).toString();
          a.Wc(e.viewState.projection, e.usedTiles[b]);
        }.bind(null, b)
      );
  }
  function Zi(a, b) {
    if (b) {
      var c, d, e;
      d = 0;
      for (e = b.length; d < e; ++d) (c = b[d]), (a[x(c).toString()] = c);
    }
  }
  function $i(a, b) {
    var c = b.L;
    void 0 !== c &&
      ("string" === typeof c
        ? (a.logos[c] = "")
        : c &&
          (ha("string" == typeof c.href, 44),
          ha("string" == typeof c.src, 45),
          (a.logos[c.src] = c.href)));
  }
  function aj(a, b, c, d) {
    b = x(b).toString();
    c = c.toString();
    b in a
      ? c in a[b]
        ? ((a = a[b][c]),
          d.ea < a.ea && (a.ea = d.ea),
          d.ca > a.ca && (a.ca = d.ca),
          d.ga < a.ga && (a.ga = d.ga),
          d.ja > a.ja && (a.ja = d.ja))
        : (a[b][c] = d)
      : ((a[b] = {}), (a[b][c] = d));
  }
  function bj(a, b, c, d, e, f, g, h, l, m) {
    var p = x(b).toString();
    p in a.wantedTiles || (a.wantedTiles[p] = {});
    var n = a.wantedTiles[p];
    a = a.tileQueue;
    var q = c.minZoom,
      r,
      u,
      w,
      y,
      z,
      A;
    for (A = g; A >= q; --A)
      for (u = fe(c, f, A, u), w = c.Ha(A), y = u.ea; y <= u.ca; ++y)
        for (z = u.ga; z <= u.ja; ++z)
          g - A <= h
            ? ((r = b.Dc(A, y, z, d, e)),
              0 == r.W() &&
                ((n[r.bb()] = !0),
                r.bb() in a.a || a.c([r, p, ke(c, r.Ca), w])),
              void 0 !== l && l.call(m, r))
            : b.ig(A, y, z, e);
  }
  function cj(a) {
    Ui.call(this, a);
    this.xa = Ph();
  }
  v(cj, Ui);
  function dj(a, b, c) {
    var d = b.pixelRatio,
      e = b.size[0] * d,
      f = b.size[1] * d,
      g = b.viewState.rotation,
      h = ac(c),
      l = $b(c),
      m = Zb(c);
    c = Yb(c);
    Uh(b.coordinateToPixelTransform, h);
    Uh(b.coordinateToPixelTransform, l);
    Uh(b.coordinateToPixelTransform, m);
    Uh(b.coordinateToPixelTransform, c);
    a.save();
    qi(a, -g, e / 2, f / 2);
    a.beginPath();
    a.moveTo(h[0] * d, h[1] * d);
    a.lineTo(l[0] * d, l[1] * d);
    a.lineTo(m[0] * d, m[1] * d);
    a.lineTo(c[0] * d, c[1] * d);
    a.clip();
    qi(a, g, e / 2, f / 2);
  }
  function ej(a, b, c, d, e) {
    var f = a.a;
    if (Oa(f, b)) {
      var g = d.size[0] * d.pixelRatio,
        h = d.size[1] * d.pixelRatio,
        l = d.viewState.rotation;
      qi(c, -l, g / 2, h / 2);
      a = void 0 !== e ? e : fj(a, d, 0);
      f.b(
        new Jh(
          b,
          new Ji(c, d.pixelRatio, d.extent, a, d.viewState.rotation),
          d,
          c,
          null
        )
      );
      qi(c, l, g / 2, h / 2);
    }
  }
  cj.prototype.C = function(a, b, c, d) {
    if (this.Ba(a, b, 0, mc, this)) return c.call(d, this.a, null);
  };
  cj.prototype.v = function(a, b, c, d) {
    ej(this, "postcompose", a, b, d);
  };
  function fj(a, b, c) {
    var d = b.viewState,
      e = b.pixelRatio,
      f = e / d.resolution;
    return Yh(
      a.xa,
      (e * b.size[0]) / 2,
      (e * b.size[1]) / 2,
      f,
      -f,
      -d.rotation,
      -d.center[0] + c,
      -d.center[1]
    );
  }
  function gj(a) {
    cj.call(this, a);
    this.u = Ph();
    this.i = null;
  }
  v(gj, cj);
  gj.prototype.D = function(a, b, c) {
    ej(this, "precompose", c, a, void 0);
    var d = this.l();
    if (d) {
      var e = b.extent,
        f = void 0 !== e;
      f && dj(c, a, e);
      var e = this.P(),
        g = c.globalAlpha;
      c.globalAlpha = b.opacity;
      c.drawImage(
        d,
        0,
        0,
        +d.width,
        +d.height,
        Math.round(e[4]),
        Math.round(e[5]),
        Math.round(d.width * e[0]),
        Math.round(d.height * e[3])
      );
      c.globalAlpha = g;
      f && c.restore();
    }
    this.v(c, a, b);
  };
  gj.prototype.Ba = function(a, b, c, d, e) {
    var f = this.a;
    return f
      .la()
      .Ba(
        a,
        b.viewState.resolution,
        b.viewState.rotation,
        c,
        b.skippedFeatureUids,
        function(a) {
          return d.call(e, a, f);
        }
      );
  };
  gj.prototype.C = function(a, b, c, d) {
    if (this.l()) {
      if (this.a.la().Ba !== ea) return cj.prototype.C.apply(this, arguments);
      var e = Uh(this.u, a.slice());
      xb(e, b.viewState.resolution / this.c);
      this.i || (this.i = De(1, 1));
      this.i.clearRect(0, 0, 1, 1);
      this.i.drawImage(this.l(), e[0], e[1], 1, 1, 0, 0, 1, 1);
      e = this.i.getImageData(0, 0, 1, 1).data;
      if (0 < e[3]) return c.call(d, this.a, e);
    }
  };
  function hj(a) {
    gj.call(this, a);
    this.f = null;
    this.j = Ph();
  }
  v(hj, gj);
  hj.prototype.l = function() {
    return this.f ? this.f.a() : null;
  };
  hj.prototype.P = function() {
    return this.j;
  };
  hj.prototype.o = function(a, b) {
    var c = a.pixelRatio,
      d = a.size,
      e = a.viewState,
      f = e.center,
      g = e.resolution,
      h = this.a.la(),
      l = a.viewHints,
      m = a.extent;
    void 0 !== b.extent && (m = ic(m, b.extent));
    l[Kd] ||
      l[1] ||
      cc(m) ||
      ((e = h.U(m, g, c, e.projection)) &&
        Xi(this, e) &&
        ((this.f = e), (this.c = g)));
    if (this.f) {
      var e = this.f,
        l = e.G(),
        m = e.resolution,
        p = e.f,
        n = (c * m) / (g * p),
        l = Yh(
          this.j,
          (c * d[0]) / 2,
          (c * d[1]) / 2,
          n,
          n,
          0,
          (p * (l[0] - f[0])) / m,
          (p * (f[1] - l[3])) / m
        );
      Yh(
        this.u,
        (c * d[0]) / 2 - l[4],
        (c * d[1]) / 2 - l[5],
        c / g,
        -c / g,
        0,
        -f[0],
        -f[1]
      );
      Zi(a.attributions, e.j);
      $i(a, h);
    }
    return !!this.f;
  };
  function ij(a) {
    gj.call(this, a);
    this.L = De();
    this.j = null;
    this.f = [];
    this.H = Hb();
    this.Ua = new Td(0, 0, 0, 0);
    this.U = Ph();
    this.na = 0;
  }
  v(ij, gj);
  ij.prototype.o = function(a, b) {
    var c = a.pixelRatio,
      d = a.size,
      e = a.viewState,
      f = e.projection,
      g = e.resolution,
      e = e.center,
      h = this.a,
      l = h.la(),
      m = l.g,
      p = l.Db(f),
      n = p.Ec(g, this.na),
      q = p.Ha(n),
      r = a.extent;
    void 0 !== b.extent && (r = ic(r, b.extent));
    if (cc(r)) return !1;
    var u = ie(p, r, q),
      w,
      y = p.Kc(n);
    w = p.Ha(n);
    var z = Zd(p.Za(n), p.j);
    w = Rb(
      y[0] + u.ea * z[0] * w,
      y[1] + u.ga * z[1] * w,
      y[0] + (u.ca + 1) * z[0] * w,
      y[1] + (u.ja + 1) * z[1] * w,
      void 0
    );
    y = l.jb(c);
    z = {};
    z[n] = {};
    var A = this.hf(l, f, z),
      O = h.c(),
      Ja = this.H,
      ca = this.Ua,
      Ma = !1,
      D,
      La,
      kb;
    for (La = u.ea; La <= u.ca; ++La)
      for (kb = u.ga; kb <= u.ja; ++kb) {
        D = l.Dc(n, La, kb, c, f);
        var W = D.W();
        W == cg || 4 == W || (3 == W && !O)
          ? W == cg &&
            ((z[n][D.Ca.toString()] = D),
            Ma || -1 != this.f.indexOf(D) || (Ma = !0))
          : ((D = bg(D)),
            ge(p, D.Ca, A, ca, Ja) ||
              ((D = he(p, D.Ca, ca, Ja)) && A(n + 1, D)));
      }
    La = a.viewHints;
    if (
      !(
        (this.c && 16 < Date.now() - a.time && (La[Kd] || La[1])) ||
        (!Ma && this.j && Vb(this.j, w) && this.Ja == m)
      )
    ) {
      D = l.Dd(n, c, f);
      La = (u.ca - u.ea + 1) * D[0];
      D = (u.ja - u.ga + 1) * D[0];
      Ma = this.L;
      kb = Ma.canvas;
      A = l.tf(f);
      kb.width != La || kb.height != D
        ? ((kb.width = La), (kb.height = D))
        : Ma.clearRect(0, 0, La, D);
      this.f.length = 0;
      O = Object.keys(z).map(Number);
      O.sort(Ya);
      var Ra,
        Pb,
        fc,
        Wc,
        de,
        He,
        W = 0;
      for (Pb = O.length; W < Pb; ++W) {
        La = O[W];
        ca = l.Dd(La, c, f);
        D = p.Ha(La);
        Ra = D / q;
        fc = y * l.qf(f);
        Wc = z[La];
        for (var od in Wc)
          (D = Wc[od]),
            (kb = p.Na(D.Ca, Ja)),
            (La = ((kb[0] - w[0]) / q) * y),
            (kb = ((w[3] - kb[3]) / q) * y),
            (de = ca[0] * Ra),
            (He = ca[1] * Ra),
            A || Ma.clearRect(La, kb, de, He),
            this.A(D, a, b, La, kb, de, He, fc),
            this.f.push(D);
      }
      this.Ja = m;
      this.c = q;
      this.j = w;
    }
    od = ((c / y) * this.c) / g;
    od = Yh(
      this.U,
      (c * d[0]) / 2,
      (c * d[1]) / 2,
      od,
      od,
      0,
      (y * (this.j[0] - e[0])) / this.c,
      (y * (e[1] - this.j[3])) / this.c
    );
    Yh(
      this.u,
      (c * d[0]) / 2 - od[4],
      (c * d[1]) / 2 - od[5],
      c / g,
      -c / g,
      0,
      -e[0],
      -e[1]
    );
    aj(a.usedTiles, l, n, u);
    bj(a, l, p, c, f, r, n, h.f());
    Yi(a, l);
    $i(a, l);
    return 0 < this.f.length;
  };
  ij.prototype.A = function(a, b, c, d, e, f, g, h) {
    (a = a.ub()) &&
      this.L.drawImage(a, h, h, a.width - 2 * h, a.height - 2 * h, d, e, f, g);
  };
  ij.prototype.l = function() {
    return this.L.canvas;
  };
  ij.prototype.P = function() {
    return this.U;
  };
  function jj() {}
  function kj(a, b, c, d) {
    this.zb = a;
    this.Qa = b;
    this.overlaps = d;
    this.c = 0;
    this.resolution = c;
    this.va = this.ra = null;
    this.a = [];
    this.coordinates = [];
    this.Z = Ph();
    this.b = [];
    this.eb = [];
    this.sa = Ph();
    this.fa = Ph();
  }
  v(kj, Ii);
  function lj(a, b, c, d, e, f, g) {
    var h = a.coordinates.length,
      l = a.mf();
    g && (c += e);
    g = [b[c], b[c + 1]];
    var m = [NaN, NaN],
      p = !0,
      n,
      q,
      r;
    for (n = c + e; n < d; n += e)
      (m[0] = b[n]),
        (m[1] = b[n + 1]),
        (r = Qb(l, m)),
        r !== q
          ? (p && ((a.coordinates[h++] = g[0]), (a.coordinates[h++] = g[1])),
            (a.coordinates[h++] = m[0]),
            (a.coordinates[h++] = m[1]),
            (p = !1))
          : 1 === r
          ? ((a.coordinates[h++] = m[0]), (a.coordinates[h++] = m[1]), (p = !1))
          : (p = !0),
        (g[0] = m[0]),
        (g[1] = m[1]),
        (q = r);
    if ((f && p) || n === c + e)
      (a.coordinates[h++] = g[0]), (a.coordinates[h++] = g[1]);
    return h;
  }
  function mj(a, b) {
    a.ra = [0, b, 0];
    a.a.push(a.ra);
    a.va = [0, b, 0];
    a.b.push(a.va);
  }
  function nj(a, b, c) {
    if (a.U) {
      var d = Uh(a.Z, a.U.slice());
      b.translate(d[0], d[1]);
      b.rotate(c);
    }
    b.fill();
    a.U && b.setTransform.apply(b, a.fa);
  }
  function oj(a, b, c, d, e, f, g, h, l) {
    var m;
    db(d, a.Z)
      ? (m = a.eb)
      : ((m = Sc(a.coordinates, 0, a.coordinates.length, 2, d, a.eb)),
        Th(a.Z, d));
    d = !wa(f);
    for (
      var p = 0,
        n = g.length,
        q = 0,
        r,
        u = a.sa,
        w = a.fa,
        y,
        z,
        A,
        O,
        Ja = 0,
        ca = 0,
        Ma = a.a != g || a.overlaps ? 0 : 200;
      p < n;

    ) {
      var D = g[p],
        La,
        kb,
        W,
        Ra;
      switch (D[0]) {
        case 0:
          q = D[1];
          (d && f[x(q).toString()]) || !q.V()
            ? (p = D[2])
            : void 0 === l || jc(l, q.V().G())
            ? ++p
            : (p = D[2] + 1);
          break;
        case 1:
          Ja > Ma && (nj(a, b, e), (Ja = 0));
          ca > Ma && (b.stroke(), (ca = 0));
          Ja || ca || b.beginPath();
          ++p;
          break;
        case 2:
          q = D[1];
          r = m[q];
          D = m[q + 1];
          A = m[q + 2] - r;
          q = m[q + 3] - D;
          q = Math.sqrt(A * A + q * q);
          b.moveTo(r + q, D);
          b.arc(r, D, q, 0, 2 * Math.PI, !0);
          ++p;
          break;
        case 3:
          b.closePath();
          ++p;
          break;
        case 4:
          q = D[1];
          r = D[2];
          La = D[3];
          kb = D[4] * c;
          W = D[5] * c;
          var Pb = D[6],
            fc = D[7],
            Wc = D[8],
            de = D[9];
          Ra = D[10];
          A = D[11];
          O = D[12];
          var He = D[13],
            od = D[14];
          for (Ra && (A += e); q < r; q += 2) {
            D = m[q] - kb;
            Ra = m[q + 1] - W;
            He && ((D = Math.round(D)), (Ra = Math.round(Ra)));
            if (1 != O || 0 !== A) {
              var bf = D + kb,
                mh = Ra + W;
              Yh(u, bf, mh, O, O, A, -bf, -mh);
              b.setTransform.apply(b, u);
            }
            bf = b.globalAlpha;
            1 != fc && (b.globalAlpha = bf * fc);
            var mh = od + Wc > La.width ? La.width - Wc : od,
              xo = Pb + de > La.height ? La.height - de : Pb;
            b.drawImage(La, Wc, de, mh, xo, D, Ra, mh * c, xo * c);
            1 != fc && (b.globalAlpha = bf);
            (1 == O && 0 === A) || b.setTransform.apply(b, w);
          }
          ++p;
          break;
        case 5:
          q = D[1];
          r = D[2];
          W = D[3];
          Pb = D[4] * c;
          fc = D[5] * c;
          A = D[6];
          O = D[7] * c;
          La = D[8];
          kb = D[9];
          for ((Ra = D[10]) && (A += e); q < r; q += 2) {
            D = m[q] + Pb;
            Ra = m[q + 1] + fc;
            if (1 != O || 0 !== A)
              Yh(u, D, Ra, O, O, A, -D, -Ra), b.setTransform.apply(b, u);
            Wc = W.split("\n");
            de = Wc.length;
            1 < de
              ? ((He = Math.round(1.5 * b.measureText("M").width)),
                (Ra -= ((de - 1) / 2) * He))
              : (He = 0);
            for (od = 0; od < de; od++)
              (bf = Wc[od]),
                kb && b.strokeText(bf, D, Ra),
                La && b.fillText(bf, D, Ra),
                (Ra += He);
            (1 == O && 0 === A) || b.setTransform.apply(b, w);
          }
          ++p;
          break;
        case 6:
          if (void 0 !== h && ((q = D[1]), (q = h(q)))) return q;
          ++p;
          break;
        case 7:
          Ma ? Ja++ : nj(a, b, e);
          ++p;
          break;
        case 8:
          q = D[1];
          r = D[2];
          D = m[q];
          Ra = m[q + 1];
          A = (D + 0.5) | 0;
          O = (Ra + 0.5) | 0;
          if (A !== y || O !== z) b.moveTo(D, Ra), (y = A), (z = O);
          for (q += 2; q < r; q += 2)
            if (
              ((D = m[q]),
              (Ra = m[q + 1]),
              (A = (D + 0.5) | 0),
              (O = (Ra + 0.5) | 0),
              q == r - 2 || A !== y || O !== z)
            )
              b.lineTo(D, Ra), (y = A), (z = O);
          ++p;
          break;
        case 9:
          a.U = D[2];
          Ja && (nj(a, b, e), (Ja = 0));
          b.fillStyle = D[1];
          ++p;
          break;
        case 10:
          y = void 0 !== D[7] ? D[7] : !0;
          var yo = D[8];
          z = D[2];
          ca && (b.stroke(), (ca = 0));
          b.strokeStyle = D[1];
          b.lineWidth = y ? z * c : z;
          b.lineCap = D[3];
          b.lineJoin = D[4];
          b.miterLimit = D[5];
          nf &&
            ((z = D[6]),
            y &&
              c !== yo &&
              ((z = z.map(function(a) {
                return (a * c) / yo;
              })),
              (D[6] = z),
              (D[8] = c)),
            b.setLineDash(z));
          z = y = NaN;
          ++p;
          break;
        case 11:
          b.font = D[1];
          b.textAlign = D[2];
          b.textBaseline = D[3];
          ++p;
          break;
        case 12:
          Ma ? ca++ : b.stroke();
          ++p;
          break;
        default:
          ++p;
      }
    }
    Ja && nj(a, b, e);
    ca && b.stroke();
  }
  kj.prototype.f = function(a, b, c, d, e) {
    oj(this, a, b, c, d, e, this.a, void 0, void 0);
  };
  function pj(a) {
    var b = a.b;
    b.reverse();
    var c,
      d = b.length,
      e,
      f,
      g = -1;
    for (c = 0; c < d; ++c)
      if (((e = b[c]), (f = e[0]), 6 == f)) g = c;
      else if (0 == f) {
        e[2] = c;
        e = a.b;
        for (f = c; g < f; ) {
          var h = e[g];
          e[g] = e[f];
          e[f] = h;
          ++g;
          --f;
        }
        g = -1;
      }
  }
  function qj(a, b) {
    a.ra[2] = a.a.length;
    a.ra = null;
    a.va[2] = a.b.length;
    a.va = null;
    var c = [6, b];
    a.a.push(c);
    a.b.push(c);
  }
  kj.prototype.se = ea;
  kj.prototype.mf = function() {
    return this.Qa;
  };
  function rj(a, b, c, d) {
    kj.call(this, a, b, c, d);
    this.l = this.P = null;
    this.L = this.D = this.C = this.A = this.u = this.H = this.v = this.o = this.j = this.i = this.g = void 0;
  }
  v(rj, kj);
  rj.prototype.xc = function(a, b) {
    if (this.l) {
      mj(this, b);
      var c = a.ia(),
        d = this.coordinates.length,
        c = lj(this, c, 0, c.length, a.pa(), !1, !1);
      this.a.push([
        4,
        d,
        c,
        this.l,
        this.g,
        this.i,
        this.j,
        this.o,
        this.v,
        this.H,
        this.u,
        this.A,
        this.C,
        this.D,
        this.L
      ]);
      this.b.push([
        4,
        d,
        c,
        this.P,
        this.g,
        this.i,
        this.j,
        this.o,
        this.v,
        this.H,
        this.u,
        this.A,
        this.C,
        this.D,
        this.L
      ]);
      qj(this, b);
    }
  };
  rj.prototype.vc = function(a, b) {
    if (this.l) {
      mj(this, b);
      var c = a.ia(),
        d = this.coordinates.length,
        c = lj(this, c, 0, c.length, a.pa(), !1, !1);
      this.a.push([
        4,
        d,
        c,
        this.l,
        this.g,
        this.i,
        this.j,
        this.o,
        this.v,
        this.H,
        this.u,
        this.A,
        this.C,
        this.D,
        this.L
      ]);
      this.b.push([
        4,
        d,
        c,
        this.P,
        this.g,
        this.i,
        this.j,
        this.o,
        this.v,
        this.H,
        this.u,
        this.A,
        this.C,
        this.D,
        this.L
      ]);
      qj(this, b);
    }
  };
  rj.prototype.se = function() {
    pj(this);
    this.i = this.g = void 0;
    this.l = this.P = null;
    this.L = this.D = this.A = this.u = this.H = this.v = this.o = this.C = this.j = void 0;
  };
  rj.prototype.dc = function(a) {
    var b = a.Ac(),
      c = a.ac(),
      d = a.Lf(1),
      e = a.Ic(1),
      f = a.Jc();
    this.g = b[0];
    this.i = b[1];
    this.P = d;
    this.l = e;
    this.j = c[1];
    this.o = a.l;
    this.v = f[0];
    this.H = f[1];
    this.u = a.H;
    this.A = a.o;
    this.C = a.i;
    this.D = a.u;
    this.L = c[0];
  };
  function sj(a, b, c, d) {
    kj.call(this, a, b, c, d);
    this.i = null;
    this.g = {
      wd: void 0,
      rd: void 0,
      sd: null,
      td: void 0,
      ud: void 0,
      vd: void 0,
      Af: 0,
      strokeStyle: void 0,
      lineCap: void 0,
      lineDash: null,
      lineJoin: void 0,
      lineWidth: void 0,
      miterLimit: void 0
    };
  }
  v(sj, kj);
  function tj(a, b, c, d, e) {
    var f = a.coordinates.length;
    b = lj(a, b, c, d, e, !1, !1);
    f = [8, f, b];
    a.a.push(f);
    a.b.push(f);
    return d;
  }
  k = sj.prototype;
  k.mf = function() {
    this.i ||
      ((this.i = Kb(this.Qa)),
      0 < this.c && Jb(this.i, (this.resolution * (this.c + 1)) / 2, this.i));
    return this.i;
  };
  function uj(a) {
    var b = a.g,
      c = b.strokeStyle,
      d = b.lineCap,
      e = b.lineDash,
      f = b.lineJoin,
      g = b.lineWidth,
      h = b.miterLimit;
    (b.wd == c &&
      b.rd == d &&
      db(b.sd, e) &&
      b.td == f &&
      b.ud == g &&
      b.vd == h) ||
      (b.Af != a.coordinates.length &&
        (a.a.push([12]), (b.Af = a.coordinates.length)),
      a.a.push([10, c, g, d, f, h, e, !0, 1], [1]),
      (b.wd = c),
      (b.rd = d),
      (b.sd = e),
      (b.td = f),
      (b.ud = g),
      (b.vd = h));
  }
  k.Pb = function(a, b) {
    var c = this.g,
      d = c.lineWidth;
    void 0 !== c.strokeStyle &&
      void 0 !== d &&
      (uj(this),
      mj(this, b),
      this.b.push(
        [
          10,
          c.strokeStyle,
          c.lineWidth,
          c.lineCap,
          c.lineJoin,
          c.miterLimit,
          c.lineDash,
          !0,
          1
        ],
        [1]
      ),
      (c = a.ia()),
      tj(this, c, 0, c.length, a.pa()),
      this.b.push([12]),
      qj(this, b));
  };
  k.uc = function(a, b) {
    var c = this.g,
      d = c.lineWidth;
    if (void 0 !== c.strokeStyle && void 0 !== d) {
      uj(this);
      mj(this, b);
      this.b.push(
        [
          10,
          c.strokeStyle,
          c.lineWidth,
          c.lineCap,
          c.lineJoin,
          c.miterLimit,
          c.lineDash,
          !0,
          1
        ],
        [1]
      );
      var c = a.Kb(),
        d = a.ia(),
        e = a.pa(),
        f = 0,
        g,
        h;
      g = 0;
      for (h = c.length; g < h; ++g) f = tj(this, d, f, c[g], e);
      this.b.push([12]);
      qj(this, b);
    }
  };
  k.se = function() {
    this.g.Af != this.coordinates.length && this.a.push([12]);
    pj(this);
    this.g = null;
  };
  k.Ma = function(a, b) {
    var c = b.b;
    this.g.strokeStyle = Ce(c ? c : pi);
    c = b.c;
    this.g.lineCap = void 0 !== c ? c : "round";
    c = b.g;
    this.g.lineDash = c ? c : oi;
    c = b.i;
    this.g.lineJoin = void 0 !== c ? c : "round";
    c = b.f;
    this.g.lineWidth = void 0 !== c ? c : 1;
    c = b.j;
    this.g.miterLimit = void 0 !== c ? c : 10;
    this.g.lineWidth > this.c && ((this.c = this.g.lineWidth), (this.i = null));
  };
  function vj(a, b, c, d) {
    kj.call(this, a, b, c, d);
    this.i = null;
    this.g = {
      Bg: void 0,
      wd: void 0,
      rd: void 0,
      sd: null,
      td: void 0,
      ud: void 0,
      vd: void 0,
      fillStyle: void 0,
      strokeStyle: void 0,
      lineCap: void 0,
      lineDash: null,
      lineJoin: void 0,
      lineWidth: void 0,
      miterLimit: void 0
    };
  }
  v(vj, kj);
  function wj(a, b, c, d, e) {
    var f = a.g,
      g = void 0 !== f.fillStyle,
      f = void 0 != f.strokeStyle,
      h = d.length,
      l = [1];
    a.a.push(l);
    a.b.push(l);
    for (l = 0; l < h; ++l) {
      var m = d[l],
        p = a.coordinates.length;
      c = lj(a, b, c, m, e, !0, !f);
      c = [8, p, c];
      a.a.push(c);
      a.b.push(c);
      f && ((c = [3]), a.a.push(c), a.b.push(c));
      c = m;
    }
    b = [7];
    a.b.push(b);
    g && a.a.push(b);
    f && ((g = [12]), a.a.push(g), a.b.push(g));
    return c;
  }
  k = vj.prototype;
  k.hc = function(a, b) {
    var c = this.g,
      d = c.strokeStyle;
    if (void 0 !== c.fillStyle || void 0 !== d) {
      xj(this, a);
      mj(this, b);
      this.b.push([9, Ae(ni)]);
      void 0 !== c.strokeStyle &&
        this.b.push([
          10,
          c.strokeStyle,
          c.lineWidth,
          c.lineCap,
          c.lineJoin,
          c.miterLimit,
          c.lineDash,
          !0,
          1
        ]);
      var e = a.ia(),
        d = this.coordinates.length;
      lj(this, e, 0, e.length, a.pa(), !1, !1);
      e = [1];
      d = [2, d];
      this.a.push(e, d);
      this.b.push(e, d);
      d = [7];
      this.b.push(d);
      void 0 !== c.fillStyle && this.a.push(d);
      void 0 !== c.strokeStyle && ((c = [12]), this.a.push(c), this.b.push(c));
      qj(this, b);
    }
  };
  k.yc = function(a, b) {
    var c = this.g;
    xj(this, a);
    mj(this, b);
    this.b.push([9, Ae(ni)]);
    void 0 !== c.strokeStyle &&
      this.b.push([
        10,
        c.strokeStyle,
        c.lineWidth,
        c.lineCap,
        c.lineJoin,
        c.miterLimit,
        c.lineDash,
        !0,
        1
      ]);
    var c = a.Kb(),
      d = a.Vb();
    wj(this, d, 0, c, a.pa());
    qj(this, b);
  };
  k.wc = function(a, b) {
    var c = this.g,
      d = c.strokeStyle;
    if (void 0 !== c.fillStyle || void 0 !== d) {
      xj(this, a);
      mj(this, b);
      this.b.push([9, Ae(ni)]);
      void 0 !== c.strokeStyle &&
        this.b.push([
          10,
          c.strokeStyle,
          c.lineWidth,
          c.lineCap,
          c.lineJoin,
          c.miterLimit,
          c.lineDash,
          !0,
          1
        ]);
      var c = a.c,
        d = Si(a),
        e = a.pa(),
        f = 0,
        g,
        h;
      g = 0;
      for (h = c.length; g < h; ++g) f = wj(this, d, f, c[g], e);
      qj(this, b);
    }
  };
  k.se = function() {
    pj(this);
    this.g = null;
    var a = this.zb;
    if (0 !== a) {
      var b = this.coordinates,
        c,
        d;
      c = 0;
      for (d = b.length; c < d; ++c) b[c] = a * Math.round(b[c] / a);
    }
  };
  k.mf = function() {
    this.i ||
      ((this.i = Kb(this.Qa)),
      0 < this.c && Jb(this.i, (this.resolution * (this.c + 1)) / 2, this.i));
    return this.i;
  };
  k.Ma = function(a, b) {
    var c = this.g;
    if (a) {
      var d = a.b;
      c.fillStyle = Ce(d ? d : ni);
    } else c.fillStyle = void 0;
    b
      ? ((d = b.b),
        (c.strokeStyle = Ce(d ? d : pi)),
        (d = b.c),
        (c.lineCap = void 0 !== d ? d : "round"),
        (d = b.g),
        (c.lineDash = d ? d.slice() : oi),
        (d = b.i),
        (c.lineJoin = void 0 !== d ? d : "round"),
        (d = b.f),
        (c.lineWidth = void 0 !== d ? d : 1),
        (d = b.j),
        (c.miterLimit = void 0 !== d ? d : 10),
        c.lineWidth > this.c && ((this.c = c.lineWidth), (this.i = null)))
      : ((c.strokeStyle = void 0),
        (c.lineCap = void 0),
        (c.lineDash = null),
        (c.lineJoin = void 0),
        (c.lineWidth = void 0),
        (c.miterLimit = void 0));
  };
  function xj(a, b) {
    var c = a.g,
      d = c.fillStyle,
      e = c.strokeStyle,
      f = c.lineCap,
      g = c.lineDash,
      h = c.lineJoin,
      l = c.lineWidth,
      m = c.miterLimit;
    if (void 0 !== d && ("string" !== typeof d || c.Bg != d)) {
      var p = [9, d];
      "string" !== typeof d && ((d = b.G()), p.push([d[0], d[3]]));
      a.a.push(p);
      c.Bg = c.fillStyle;
    }
    void 0 === e ||
      (c.wd == e &&
        c.rd == f &&
        db(c.sd, g) &&
        c.td == h &&
        c.ud == l &&
        c.vd == m) ||
      (a.a.push([10, e, l, f, h, m, g, !0, 1]),
      (c.wd = e),
      (c.rd = f),
      (c.sd = g),
      (c.td = h),
      (c.ud = l),
      (c.vd = m));
  }
  function yj(a, b, c, d) {
    kj.call(this, a, b, c, d);
    this.L = this.D = this.C = null;
    this.l = "";
    this.v = this.o = 0;
    this.H = void 0;
    this.A = this.u = 0;
    this.j = this.i = this.g = null;
  }
  v(yj, kj);
  function zj(a, b, c, d, e) {
    if ("" !== a.l && a.j && (a.g || a.i)) {
      if (a.g) {
        var f = a.g,
          g = a.C;
        if (!g || g.fillStyle != f.fillStyle) {
          var h = [9, f.fillStyle];
          a.a.push(h);
          a.b.push(h);
          g ? (g.fillStyle = f.fillStyle) : (a.C = { fillStyle: f.fillStyle });
        }
      }
      a.i &&
        ((f = a.i),
        (g = a.D),
        (g &&
          g.lineCap == f.lineCap &&
          g.lineDash == f.lineDash &&
          g.lineJoin == f.lineJoin &&
          g.lineWidth == f.lineWidth &&
          g.miterLimit == f.miterLimit &&
          g.strokeStyle == f.strokeStyle) ||
          ((h = [
            10,
            f.strokeStyle,
            f.lineWidth,
            f.lineCap,
            f.lineJoin,
            f.miterLimit,
            f.lineDash,
            !1,
            1
          ]),
          a.a.push(h),
          a.b.push(h),
          g
            ? ((g.lineCap = f.lineCap),
              (g.lineDash = f.lineDash),
              (g.lineJoin = f.lineJoin),
              (g.lineWidth = f.lineWidth),
              (g.miterLimit = f.miterLimit),
              (g.strokeStyle = f.strokeStyle))
            : (a.D = {
                lineCap: f.lineCap,
                lineDash: f.lineDash,
                lineJoin: f.lineJoin,
                lineWidth: f.lineWidth,
                miterLimit: f.miterLimit,
                strokeStyle: f.strokeStyle
              })));
      f = a.j;
      g = a.L;
      (g &&
        g.font == f.font &&
        g.textAlign == f.textAlign &&
        g.textBaseline == f.textBaseline) ||
        ((h = [11, f.font, f.textAlign, f.textBaseline]),
        a.a.push(h),
        a.b.push(h),
        g
          ? ((g.font = f.font),
            (g.textAlign = f.textAlign),
            (g.textBaseline = f.textBaseline))
          : (a.L = {
              font: f.font,
              textAlign: f.textAlign,
              textBaseline: f.textBaseline
            }));
      mj(a, e);
      f = a.coordinates.length;
      b = lj(a, b, 0, c, d, !1, !1);
      b = [5, f, b, a.l, a.o, a.v, a.u, a.A, !!a.g, !!a.i, a.H];
      a.a.push(b);
      a.b.push(b);
      qj(a, e);
    }
  }
  yj.prototype.$b = function(a) {
    if (a) {
      var b = a.b;
      b
        ? ((b = b.b),
          (b = Ce(b ? b : ni)),
          this.g ? (this.g.fillStyle = b) : (this.g = { fillStyle: b }))
        : (this.g = null);
      var c = a.f;
      if (c) {
        var b = c.b,
          d = c.c,
          e = c.g,
          f = c.i,
          g = c.f,
          c = c.j,
          d = void 0 !== d ? d : "round",
          e = e ? e.slice() : oi,
          f = void 0 !== f ? f : "round",
          g = void 0 !== g ? g : 1,
          c = void 0 !== c ? c : 10,
          b = Ce(b ? b : pi);
        if (this.i) {
          var h = this.i;
          h.lineCap = d;
          h.lineDash = e;
          h.lineJoin = f;
          h.lineWidth = g;
          h.miterLimit = c;
          h.strokeStyle = b;
        } else
          this.i = {
            lineCap: d,
            lineDash: e,
            lineJoin: f,
            lineWidth: g,
            miterLimit: c,
            strokeStyle: b
          };
      } else this.i = null;
      var l = a.g,
        b = a.c,
        d = a.i,
        e = a.v,
        g = a.j,
        c = a.a,
        f = a.Ka(),
        h = a.l,
        m = a.o;
      a = void 0 !== l ? l : "10px sans-serif";
      h = void 0 !== h ? h : "center";
      m = void 0 !== m ? m : "middle";
      this.j
        ? ((l = this.j), (l.font = a), (l.textAlign = h), (l.textBaseline = m))
        : (this.j = { font: a, textAlign: h, textBaseline: m });
      this.l = void 0 !== f ? f : "";
      this.o = void 0 !== b ? b : 0;
      this.v = void 0 !== d ? d : 0;
      this.H = void 0 !== e ? e : !1;
      this.u = void 0 !== g ? g : 0;
      this.A = void 0 !== c ? c : 1;
    } else this.l = "";
  };
  var Aj = ["Polygon", "Circle", "LineString", "Image", "Text"];
  function Bj(a, b, c, d, e) {
    this.H = a;
    this.c = b;
    this.o = d;
    this.v = c;
    this.i = e;
    this.a = {};
    this.j = De(1, 1);
    this.l = Ph();
  }
  v(Bj, jj);
  var Cj = { 0: [[!0]] };
  function Dj(a, b, c) {
    var d,
      e = Math.floor(a.length / 2);
    if (b >= e) for (d = e; d < b; d++) a[d][c] = !0;
    else if (b < e) for (d = b + 1; d < e; d++) a[d][c] = !0;
  }
  function Ej(a) {
    if (void 0 !== Cj[a]) return Cj[a];
    for (var b = 2 * a + 1, c = Array(b), d = 0; d < b; d++) c[d] = Array(b);
    for (var b = a, e = (d = 0); b >= d; )
      Dj(c, a + b, a + d),
        Dj(c, a + d, a + b),
        Dj(c, a - d, a + b),
        Dj(c, a - b, a + d),
        Dj(c, a - b, a - d),
        Dj(c, a - d, a - b),
        Dj(c, a + d, a - b),
        Dj(c, a + b, a - d),
        d++,
        (e += 1 + 2 * d),
        0 < 2 * (e - b) + 1 && (--b, (e += 1 - 2 * b));
    return (Cj[a] = c);
  }
  function Fj(a) {
    for (var b in a.a) {
      var c = a.a[b],
        d;
      for (d in c) c[d].se();
    }
  }
  Bj.prototype.Ba = function(a, b, c, d, e, f) {
    d = Math.round(d);
    var g = 2 * d + 1,
      h = Yh(this.l, d + 0.5, d + 0.5, 1 / b, -1 / b, -c, -a[0], -a[1]),
      l = this.j;
    l.canvas.width !== g || l.canvas.height !== g
      ? ((l.canvas.width = g), (l.canvas.height = g))
      : l.clearRect(0, 0, g, g);
    var m;
    void 0 !== this.i && ((m = Hb()), Ib(m, a), Jb(m, b * (this.i + d), m));
    var p = Ej(d);
    return Gj(
      this,
      l,
      h,
      c,
      e,
      function(a) {
        for (var b = l.getImageData(0, 0, g, g).data, c = 0; c < g; c++)
          for (var d = 0; d < g; d++)
            if (p[c][d] && 0 < b[4 * (d * g + c) + 3]) {
              if ((a = f(a))) return a;
              l.clearRect(0, 0, g, g);
              return;
            }
      },
      m
    );
  };
  function Hj(a, b) {
    var c = a.c,
      d = c[0],
      e = c[1],
      f = c[2],
      c = c[3],
      d = [d, e, d, c, f, c, f, e];
    Sc(d, 0, 8, 2, b, d);
    return d;
  }
  Bj.prototype.b = function(a, b) {
    var c = void 0 !== a ? a.toString() : "0",
      d = this.a[c];
    void 0 === d && ((d = {}), (this.a[c] = d));
    c = d[b];
    void 0 === c &&
      ((c = new Ij[b](this.H, this.c, this.v, this.o)), (d[b] = c));
    return c;
  };
  Bj.prototype.g = function() {
    return wa(this.a);
  };
  Bj.prototype.f = function(a, b, c, d, e, f) {
    var g = Object.keys(this.a).map(Number);
    g.sort(Ya);
    var h = Hj(this, c);
    a.save();
    a.beginPath();
    a.moveTo(h[0], h[1]);
    a.lineTo(h[2], h[3]);
    a.lineTo(h[4], h[5]);
    a.lineTo(h[6], h[7]);
    a.clip();
    f = f ? f : Aj;
    var l,
      m,
      p,
      n,
      q,
      h = 0;
    for (l = g.length; h < l; ++h)
      for (n = this.a[g[h].toString()], m = 0, p = f.length; m < p; ++m)
        (q = n[f[m]]), void 0 !== q && q.f(a, b, c, d, e);
    a.restore();
  };
  function Gj(a, b, c, d, e, f, g) {
    var h = Object.keys(a.a).map(Number);
    h.sort(function(a, b) {
      return b - a;
    });
    var l, m, p, n, q;
    l = 0;
    for (m = h.length; l < m; ++l)
      for (n = a.a[h[l].toString()], p = Aj.length - 1; 0 <= p; --p)
        if (
          ((q = n[Aj[p]]),
          void 0 !== q && (q = oj(q, b, 1, c, d, e, q.b, f, g)))
        )
          return q;
  }
  var Ij = { Circle: vj, Image: rj, LineString: sj, Polygon: vj, Text: yj };
  function Jj(a, b) {
    return x(a) - x(b);
  }
  function Kj(a, b) {
    var c = (0.5 * a) / b;
    return c * c;
  }
  function Lj(a, b, c, d, e, f) {
    var g = !1,
      h,
      l;
    if ((h = c.a))
      (l = h.xe()),
        l == li || l == ki
          ? h.Ii(e, f)
          : (l == ji && h.load(), h.eh(e, f), (g = !0));
    if ((e = (0, c.c)(b))) (d = e.Bd(d)), (0, Mj[d.Y()])(a, d, c, b);
    return g;
  }
  var Mj = {
    Point: function(a, b, c, d) {
      var e = c.a;
      if (e) {
        if (e.xe() != li) return;
        var f = a.b(c.b, "Image");
        f.dc(e);
        f.xc(b, d);
      }
      if ((e = c.Ka())) (a = a.b(c.b, "Text")), a.$b(e), zj(a, b.ia(), 2, 2, d);
    },
    LineString: function(a, b, c, d) {
      var e = c.g;
      if (e) {
        var f = a.b(c.b, "LineString");
        f.Ma(null, e);
        f.Pb(b, d);
      }
      if ((e = c.Ka())) (a = a.b(c.b, "Text")), a.$b(e), zj(a, Qi(b), 2, 2, d);
    },
    Polygon: function(a, b, c, d) {
      var e = c.f,
        f = c.g;
      if (e || f) {
        var g = a.b(c.b, "Polygon");
        g.Ma(e, f);
        g.yc(b, d);
      }
      if ((e = c.Ka())) (a = a.b(c.b, "Text")), a.$b(e), zj(a, Ad(b), 2, 2, d);
    },
    MultiPoint: function(a, b, c, d) {
      var e = c.a;
      if (e) {
        if (e.xe() != li) return;
        var f = a.b(c.b, "Image");
        f.dc(e);
        f.vc(b, d);
      }
      if ((e = c.Ka()))
        (a = a.b(c.b, "Text")),
          a.$b(e),
          (c = b.ia()),
          zj(a, c, c.length, b.pa(), d);
    },
    MultiLineString: function(a, b, c, d) {
      var e = c.g;
      if (e) {
        var f = a.b(c.b, "LineString");
        f.Ma(null, e);
        f.uc(b, d);
      }
      if ((e = c.Ka()))
        (a = a.b(c.b, "Text")), a.$b(e), (b = Ri(b)), zj(a, b, b.length, 2, d);
    },
    MultiPolygon: function(a, b, c, d) {
      var e = c.f,
        f = c.g;
      if (f || e) {
        var g = a.b(c.b, "Polygon");
        g.Ma(e, f);
        g.wc(b, d);
      }
      if ((e = c.Ka()))
        (a = a.b(c.b, "Text")), a.$b(e), (b = Ti(b)), zj(a, b, b.length, 2, d);
    },
    GeometryCollection: function(a, b, c, d) {
      b = b.f;
      var e, f;
      e = 0;
      for (f = b.length; e < f; ++e) (0, Mj[b[e].Y()])(a, b[e], c, d);
    },
    Circle: function(a, b, c, d) {
      var e = c.f,
        f = c.g;
      if (e || f) {
        var g = a.b(c.b, "Circle");
        g.Ma(e, f);
        g.hc(b, d);
      }
      if ((e = c.Ka())) (a = a.b(c.b, "Text")), a.$b(e), zj(a, b.Fd(), 2, 2, d);
    }
  };
  function Nj(a) {
    cj.call(this, a);
    this.f = !1;
    this.u = -1;
    this.H = NaN;
    this.j = Hb();
    this.c = this.l = null;
    this.i = De();
  }
  v(Nj, cj);
  Nj.prototype.D = function(a, b, c) {
    var d = a.extent,
      e = a.pixelRatio,
      f = b.me ? a.skippedFeatureUids : {},
      g = a.viewState,
      h = g.projection,
      g = g.rotation,
      l = h.G(),
      m = this.a.la(),
      p = fj(this, a, 0);
    ej(this, "precompose", c, a, p);
    var n = b.extent,
      q = void 0 !== n;
    q && dj(c, a, n);
    if ((n = this.c) && !n.g()) {
      var r = 0,
        u = 0,
        w;
      if (Oa(this.a, "render")) {
        w = c.canvas.width;
        var y = c.canvas.height;
        if (g) {
          var z = Math.round(Math.sqrt(w * w + y * y)),
            r = (z - w) / 2,
            u = (z - y) / 2;
          w = y = z;
        }
        this.i.canvas.width = w;
        this.i.canvas.height = y;
        w = this.i;
      } else w = c;
      y = w.globalAlpha;
      w.globalAlpha = b.opacity;
      w != c && w.translate(r, u);
      var z = a.size[0] * e,
        A = a.size[1] * e;
      qi(w, -g, z / 2, A / 2);
      n.f(w, e, p, g, f);
      if (m.D && h.a && !Ob(l, d)) {
        for (var h = d[0], m = dc(l), O = 0; h < l[0]; )
          --O, (p = m * O), (p = fj(this, a, p)), n.f(w, e, p, g, f), (h += m);
        O = 0;
        for (h = d[2]; h > l[2]; )
          ++O, (p = m * O), (p = fj(this, a, p)), n.f(w, e, p, g, f), (h -= m);
        p = fj(this, a, 0);
      }
      qi(w, g, z / 2, A / 2);
      w != c &&
        (ej(this, "render", w, a, p),
        c.drawImage(w.canvas, -r, -u),
        w.translate(-r, -u));
      w.globalAlpha = y;
    }
    q && c.restore();
    this.v(c, a, b, p);
  };
  Nj.prototype.Ba = function(a, b, c, d, e) {
    if (this.c) {
      var f = this.a,
        g = {};
      return this.c.Ba(
        a,
        b.viewState.resolution,
        b.viewState.rotation,
        c,
        {},
        function(a) {
          var b = x(a).toString();
          if (!(b in g)) return (g[b] = !0), d.call(e, a, f);
        }
      );
    }
  };
  Nj.prototype.A = function() {
    Wi(this);
  };
  Nj.prototype.o = function(a) {
    function b(a) {
      var b,
        d = a.Gc();
      d ? (b = d.call(a, m)) : (d = c.j) && (b = d(a, m));
      if (b) {
        if (b) {
          d = !1;
          if (Array.isArray(b))
            for (var e = 0, f = b.length; e < f; ++e)
              d = Lj(q, a, b[e], Kj(m, p), this.A, this) || d;
          else d = Lj(q, a, b, Kj(m, p), this.A, this) || d;
          a = d;
        } else a = !1;
        this.f = this.f || a;
      }
    }
    var c = this.a,
      d = c.la();
    Zi(a.attributions, d.j);
    $i(a, d);
    var e = a.viewHints[Kd],
      f = a.viewHints[1],
      g = c.Z,
      h = c.fa;
    if ((!this.f && !g && e) || (!h && f)) return !0;
    var l = a.extent,
      h = a.viewState,
      e = h.projection,
      m = h.resolution,
      p = a.pixelRatio,
      f = c.g,
      n = c.i,
      g = c.get("renderOrder");
    void 0 === g && (g = Jj);
    l = Jb(l, n * m);
    n = h.projection.G();
    d.D &&
      h.projection.a &&
      !Ob(n, a.extent) &&
      ((a = Math.max(dc(l) / 2, dc(n))), (l[0] = n[0] - a), (l[2] = n[2] + a));
    if (!this.f && this.H == m && this.u == f && this.l == g && Ob(this.j, l))
      return !0;
    this.c = null;
    this.f = !1;
    var q = new Bj((0.5 * m) / p, l, m, d.xa, c.i);
    d.Ed(l, m, e);
    if (g) {
      var r = [];
      d.Qb(
        l,
        function(a) {
          r.push(a);
        },
        this
      );
      r.sort(g);
      r.forEach(b, this);
    } else d.Qb(l, b, this);
    Fj(q);
    this.H = m;
    this.u = f;
    this.l = g;
    this.j = l;
    this.c = q;
    return !0;
  };
  function Oj(a) {
    ij.call(this, a);
    this.Z = !1;
    this.sa = Ph();
    this.na = a.u == Fi ? 1 : 0;
  }
  v(Oj, ij);
  var Pj = { image: Aj, hybrid: ["Polygon", "LineString"] },
    Qj = { hybrid: ["Image", "Text"], vector: Aj };
  function Rj(a, b, c) {
    function d(a) {
      var b,
        c = a.Gc();
      c ? (b = c.call(a, r)) : (c = e.j) && (b = c(a, r));
      if (b) {
        Array.isArray(b) || (b = [b]);
        var c = A,
          d = z;
        if (b) {
          var f = !1;
          if (Array.isArray(b))
            for (var g = 0, h = b.length; g < h; ++g)
              f = Lj(d, a, b[g], c, this.fa, this) || f;
          else f = Lj(d, a, b, c, this.fa, this) || f;
          a = f;
        } else a = !1;
        this.Z = this.Z || a;
        l.xd = l.xd || a;
      }
    }
    var e = a.a,
      f = c.pixelRatio;
    c = c.viewState.projection;
    var g = e.g,
      h = e.get("renderOrder") || null,
      l = b.g;
    if (l.xd || l.li != g || l.bg != h) {
      l.jd = null;
      l.xd = !1;
      var m = e.la(),
        p = m.tileGrid,
        n = b.Ca,
        q = b.j,
        r = p.Ha(n[0]),
        u,
        w,
        y;
      "tile-pixels" == q.Eb()
        ? ((u = y = m.jb()),
          (p = Zd(p.Za(n[0]))),
          (u = [0, 0, p[0] * u, p[1] * u]))
        : ((y = r), (u = p.Na(n)), Mc(c, q) || ((w = !0), b.Ff(c)));
      l.xd = !1;
      var z = new Bj(0, u, y, m.i, e.i),
        A = Kj(y, f);
      b = b.i;
      h && h !== l.bg && b.sort(h);
      m = 0;
      for (y = b.length; m < y; ++m)
        (f = b[m]), w && f.V().ob(q, c), d.call(a, f);
      Fj(z);
      l.li = g;
      l.bg = h;
      l.jd = z;
      l.resolution = NaN;
    }
  }
  Oj.prototype.A = function(a, b, c, d, e, f, g, h) {
    var l = a;
    Rj(this, l, b);
    if (this.a.u != Fi) {
      var m = l,
        p = b,
        n = this.a,
        l = m.g,
        q = n.g,
        r = Pj[n.u];
      if (r && l.cg !== q) {
        l.cg = q;
        var u = m.Ca,
          w = m.Ca[0],
          q = p.pixelRatio,
          y = n.la(),
          z = y.tileGrid,
          A = y.jb(),
          n = Qh(this.sa);
        "tile-pixels" == m.j.Eb()
          ? ((u = q / A), Wh(n, u, u))
          : ((A = z.Ha(w)),
            (A = q / A),
            (u = z.Na(u, this.H)),
            Wh(n, A, -A),
            Xh(n, -u[0], -u[3]));
        m = m.f;
        p = y.Dd(w, q, p.viewState.projection);
        m.canvas.width = p[0];
        m.canvas.height = p[1];
        l.jd.f(m, q, n, 0, {}, r);
      }
    }
    ij.prototype.A.apply(this, arguments);
  };
  Oj.prototype.Ba = function(a, b, c, d, e) {
    var f = b.viewState.resolution;
    b = b.viewState.rotation;
    c = void 0 == c ? 0 : c;
    var g = this.a,
      h = {},
      l = this.f,
      m = g.la(),
      p = m.tileGrid,
      n,
      q,
      r,
      u,
      w,
      y;
    r = 0;
    for (u = l.length; r < u; ++r)
      (y = l[r]),
        (q = y.Ca),
        (w = m.tileGrid.Na(q, this.H)),
        Mb(Jb(w, c * f), a) &&
          ("tile-pixels" === y.j.Eb()
            ? ((w = ac(w)),
              (f = m.jb()),
              (q = p.Ha(q[0]) / f),
              (q = [(a[0] - w[0]) / q, (w[1] - a[1]) / q]))
            : (q = a),
          (y = y.g.jd),
          (n =
            n ||
            y.Ba(q, f, b, c, {}, function(a) {
              var b = x(a).toString();
              if (!(b in h)) return (h[b] = !0), d.call(e, a, g);
            })));
    return n;
  };
  Oj.prototype.fa = function() {
    Wi(this);
  };
  Oj.prototype.v = function(a, b, c) {
    var d = Qj[this.a.u];
    if (d)
      for (
        var e = b.pixelRatio,
          f = b.viewState.rotation,
          g = b.size,
          h = Math.round((e * g[0]) / 2),
          g = Math.round((e * g[1]) / 2),
          l = this.f,
          m = [],
          p = [],
          n = l.length - 1;
        0 <= n;
        --n
      ) {
        var q = l[n],
          r;
        var u = q;
        r = b;
        if ("tile-pixels" == u.j.Eb()) {
          var w = this.a.la(),
            y = w.tileGrid,
            z = u.Ca,
            w = y.Ha(z[0]) / w.jb(),
            u = r.viewState,
            A = r.pixelRatio,
            O = u.resolution / A,
            z = y.Na(z, this.H),
            y = u.center,
            z = ac(z);
          r = r.size;
          r = Yh(
            this.sa,
            Math.round((A * r[0]) / 2),
            Math.round((A * r[1]) / 2),
            w / O,
            w / O,
            u.rotation,
            (z[0] - y[0]) / w,
            (y[1] - z[1]) / w
          );
        } else r = fj(this, r, 0);
        w = Hj(q.g.jd, r);
        u = q.Ca[0];
        a.save();
        a.globalAlpha = c.opacity;
        qi(a, -f, h, g);
        A = 0;
        for (O = m.length; A < O; ++A)
          (y = m[A]),
            u < p[A] &&
              (a.beginPath(),
              a.moveTo(w[0], w[1]),
              a.lineTo(w[2], w[3]),
              a.lineTo(w[4], w[5]),
              a.lineTo(w[6], w[7]),
              a.moveTo(y[6], y[7]),
              a.lineTo(y[4], y[5]),
              a.lineTo(y[2], y[3]),
              a.lineTo(y[0], y[1]),
              a.clip());
        q.g.jd.f(a, e, r, f, {}, d);
        a.restore();
        m.push(w);
        p.push(u);
      }
    ij.prototype.v.apply(this, arguments);
  };
  function Sj(a, b) {
    $h.call(this, 0, b);
    this.g = De();
    this.b = this.g.canvas;
    this.b.style.width = "100%";
    this.b.style.height = "100%";
    this.b.className = "ol-unselectable";
    a.insertBefore(this.b, a.childNodes[0] || null);
    this.a = !0;
    this.c = Ph();
  }
  v(Sj, $h);
  Sj.prototype.Ag = function(a) {
    return a instanceof ei
      ? new hj(a)
      : a instanceof F
      ? new ij(a)
      : a instanceof H
      ? new Oj(a)
      : a instanceof G
      ? new Nj(a)
      : null;
  };
  function Tj(a, b, c) {
    var d = a.l,
      e = a.g;
    if (Oa(d, b)) {
      var f = c.extent,
        g = c.pixelRatio,
        h = c.viewState.rotation,
        l = c.viewState,
        m = c.pixelRatio / l.resolution;
      a = Yh(
        a.c,
        a.b.width / 2,
        a.b.height / 2,
        m,
        -m,
        -l.rotation,
        -l.center[0],
        -l.center[1]
      );
      d.b(new Jh(b, new Ji(e, g, f, a, h), c, e, null));
    }
  }
  Sj.prototype.Y = function() {
    return "canvas";
  };
  Sj.prototype.ag = function(a) {
    if (a) {
      var b = this.g,
        c = a.pixelRatio,
        d = Math.round(a.size[0] * c),
        c = Math.round(a.size[1] * c);
      this.b.width != d || this.b.height != c
        ? ((this.b.width = d), (this.b.height = c))
        : b.clearRect(0, 0, d, c);
      var e = a.viewState.rotation;
      ai(a);
      Tj(this, "precompose", a);
      var f = a.layerStatesArray;
      eb(f);
      qi(b, e, d / 2, c / 2);
      var g = a.viewState.resolution,
        h,
        l,
        m,
        p;
      h = 0;
      for (l = f.length; h < l; ++h)
        (p = f[h]),
          (m = p.layer),
          (m = ci(this, m)),
          Lh(p, g) && "ready" == p.Ei && m.o(a, p) && m.D(a, p, b);
      qi(b, -e, d / 2, c / 2);
      Tj(this, "postcompose", a);
      this.a || ((this.b.style.display = ""), (this.a = !0));
      di(this, a);
      a.postRenderFunctions.push(bi);
    } else this.a && ((this.b.style.display = "none"), (this.a = !1));
  };
  Sj.prototype.Bh = function(a, b, c, d, e, f) {
    var g,
      h = b.viewState.resolution,
      l = b.layerStatesArray,
      m = l.length;
    a = Uh(b.pixelToCoordinateTransform, a.slice());
    for (--m; 0 <= m; --m) {
      g = l[m];
      var p = g.layer;
      if (Lh(g, h) && e.call(f, p) && (g = ci(this, p).C(a, b, c, d))) return g;
    }
  };
  var Uj = [0, 0, 0, 1],
    Vj = [],
    Wj = [0, 0, 0, 1];
  function Xj(a, b, c, d, e, f) {
    a = (c - a) * (f - b) - (e - a) * (d - b);
    return a <= Yj && a >= -Yj ? void 0 : 0 < a;
  }
  var Yj = Number.EPSILON || 2.220446049250313e-16;
  function Zj(a) {
    this.b = a;
  }
  function ak(a) {
    this.b = a;
  }
  v(ak, Zj);
  ak.prototype.Y = function() {
    return 35632;
  };
  function bk(a) {
    this.b = a;
  }
  v(bk, Zj);
  bk.prototype.Y = function() {
    return 35633;
  };
  function ck() {
    this.b =
      "precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}";
  }
  v(ck, ak);
  var dk = new ck();
  function ek() {
    this.b =
      "varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;if(f==0.0){offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}";
  }
  v(ek, bk);
  var fk = new ek();
  function gk(a, b) {
    this.D = a.getUniformLocation(b, "n");
    this.L = a.getUniformLocation(b, "k");
    this.f = a.getUniformLocation(b, "j");
    this.c = a.getUniformLocation(b, "i");
    this.a = a.getUniformLocation(b, "m");
    this.ra = a.getUniformLocation(b, "l");
    this.g = a.getUniformLocation(b, "h");
    this.va = a.getUniformLocation(b, "p");
    this.P = a.getUniformLocation(b, "o");
    this.j = a.getAttribLocation(b, "f");
    this.b = a.getAttribLocation(b, "e");
    this.u = a.getAttribLocation(b, "g");
  }
  function hk() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  function ik(a, b) {
    a[0] = b[0];
    a[1] = b[1];
    a[4] = b[2];
    a[5] = b[3];
    a[12] = b[4];
    a[13] = b[5];
    return a;
  }
  function jk(a, b) {
    this.origin = gc(b);
    this.Ua = Ph();
    this.xa = Ph();
    this.Ja = Ph();
    this.na = hk();
    this.b = [];
    this.o = null;
    this.g = [];
    this.i = [];
    this.a = [];
    this.v = null;
    this.j = void 0;
  }
  v(jk, Ii);
  jk.prototype.f = function(a, b, c, d, e, f, g, h, l, m, p) {
    var n = a.b,
      q,
      r,
      u,
      w,
      y,
      z,
      A,
      O;
    this.j &&
      ((q = n.isEnabled(n.STENCIL_TEST)),
      (r = n.getParameter(n.STENCIL_FUNC)),
      (u = n.getParameter(n.STENCIL_VALUE_MASK)),
      (w = n.getParameter(n.STENCIL_REF)),
      (y = n.getParameter(n.STENCIL_WRITEMASK)),
      (z = n.getParameter(n.STENCIL_FAIL)),
      (A = n.getParameter(n.STENCIL_PASS_DEPTH_PASS)),
      (O = n.getParameter(n.STENCIL_PASS_DEPTH_FAIL)),
      n.enable(n.STENCIL_TEST),
      n.clear(n.STENCIL_BUFFER_BIT),
      n.stencilMask(255),
      n.stencilFunc(n.ALWAYS, 1, 255),
      n.stencilOp(n.KEEP, n.KEEP, n.REPLACE),
      this.j.f(a, b, c, d, e, f, g, h, l, m, p),
      n.stencilMask(0),
      n.stencilFunc(n.NOTEQUAL, 1, 255));
    kk(a, 34962, this.v);
    kk(a, 34963, this.o);
    f = this.Ke(n, a, e, f);
    var Ja = Qh(this.Ua);
    Wh(Ja, 2 / (c * e[0]), 2 / (c * e[1]));
    Vh(Ja, -d);
    Xh(Ja, -(b[0] - this.origin[0]), -(b[1] - this.origin[1]));
    b = Qh(this.Ja);
    Wh(b, 2 / e[0], 2 / e[1]);
    e = Qh(this.xa);
    0 !== d && Vh(e, -d);
    n.uniformMatrix4fv(f.g, !1, ik(this.na, Ja));
    n.uniformMatrix4fv(f.c, !1, ik(this.na, b));
    n.uniformMatrix4fv(f.f, !1, ik(this.na, e));
    n.uniform1f(f.a, g);
    var ca;
    void 0 === l
      ? this.yd(n, a, h, !1)
      : (m
          ? (a = this.$d(n, a, h, l, p))
          : (n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT),
            this.yd(n, a, h, !0),
            (a = (a = l(null)) ? a : void 0)),
        (ca = a));
    this.Le(n, f);
    this.j &&
      (q || n.disable(n.STENCIL_TEST),
      n.clear(n.STENCIL_BUFFER_BIT),
      n.stencilFunc(r, w, u),
      n.stencilMask(y),
      n.stencilOp(z, O, A));
    return ca;
  };
  function lk(a, b, c, d) {
    a.drawElements(4, d - c, b.i ? 5125 : 5123, c * (b.i ? 4 : 2));
  }
  function mk(a) {
    this.b = void 0 !== a ? a : [];
    this.a = nk;
  }
  var nk = 35044;
  function ok(a, b) {
    jk.call(this, 0, b);
    this.H = null;
    this.l = [];
    this.u = [];
    this.A = 0;
    this.c = {
      fillColor: null,
      strokeColor: null,
      lineDash: null,
      lineWidth: void 0,
      s: !1
    };
  }
  v(ok, jk);
  k = ok.prototype;
  k.hc = function(a, b) {
    var c = a.qe(),
      d = a.pa();
    if (c) {
      this.g.push(this.b.length);
      this.i.push(b);
      this.c.s && (this.u.push(this.b.length), (this.c.s = !1));
      this.A = c;
      var c = a.ia(),
        c = Tc(c, 2, d, -this.origin[0], -this.origin[1]),
        e = this.a.length,
        f = this.b.length,
        g = e / 4,
        h;
      for (h = 0; 2 > h; h += d)
        (this.a[e++] = c[h]),
          (this.a[e++] = c[h + 1]),
          (this.a[e++] = 0),
          (this.a[e++] = this.A),
          (this.a[e++] = c[h]),
          (this.a[e++] = c[h + 1]),
          (this.a[e++] = 1),
          (this.a[e++] = this.A),
          (this.a[e++] = c[h]),
          (this.a[e++] = c[h + 1]),
          (this.a[e++] = 2),
          (this.a[e++] = this.A),
          (this.a[e++] = c[h]),
          (this.a[e++] = c[h + 1]),
          (this.a[e++] = 3),
          (this.a[e++] = this.A),
          (this.b[f++] = g),
          (this.b[f++] = g + 1),
          (this.b[f++] = g + 2),
          (this.b[f++] = g + 2),
          (this.b[f++] = g + 3),
          (this.b[f++] = g),
          (g += 4);
    } else
      this.c.s &&
        (this.l.pop(),
        this.l.length &&
          ((d = this.l[this.l.length - 1]),
          (this.c.fillColor = d[0]),
          (this.c.strokeColor = d[1]),
          (this.c.lineWidth = d[2]),
          (this.c.s = !1)));
  };
  k.vb = function() {
    this.v = new mk(this.a);
    this.o = new mk(this.b);
    this.g.push(this.b.length);
    0 === this.u.length && 0 < this.l.length && (this.l = []);
    this.b = this.a = null;
  };
  k.wb = function(a) {
    var b = this.v,
      c = this.o;
    return function() {
      pk(a, b);
      pk(a, c);
    };
  };
  k.Ke = function(a, b, c, d) {
    var e = qk(b, dk, fk),
      f;
    this.H ? (f = this.H) : (this.H = f = new gk(a, e));
    b.Lc(e);
    a.enableVertexAttribArray(f.b);
    a.vertexAttribPointer(f.b, 2, 5126, !1, 16, 0);
    a.enableVertexAttribArray(f.j);
    a.vertexAttribPointer(f.j, 1, 5126, !1, 16, 8);
    a.enableVertexAttribArray(f.u);
    a.vertexAttribPointer(f.u, 1, 5126, !1, 16, 12);
    a.uniform2fv(f.va, c);
    a.uniform1f(f.ra, d);
    return f;
  };
  k.Le = function(a, b) {
    a.disableVertexAttribArray(b.b);
    a.disableVertexAttribArray(b.j);
    a.disableVertexAttribArray(b.u);
  };
  k.yd = function(a, b, c) {
    if (wa(c)) {
      var d, e, f;
      e = this.g[this.g.length - 1];
      for (c = this.u.length - 1; 0 <= c; --c)
        (d = this.u[c]),
          (f = this.l[c]),
          a.uniform4fv(this.H.D, f[0]),
          rk(this, a, f[1], f[2]),
          lk(a, b, d, e),
          (e = d);
    } else {
      var g, h, l, m;
      l = this.g.length - 2;
      f = e = this.g[l + 1];
      for (d = this.u.length - 1; 0 <= d; --d) {
        g = this.l[d];
        a.uniform4fv(this.H.D, g[0]);
        rk(this, a, g[1], g[2]);
        for (g = this.u[d]; 0 <= l && this.g[l] >= g; )
          (m = this.g[l]),
            (h = this.i[l]),
            (h = x(h).toString()),
            c[h] && (e !== f && lk(a, b, e, f), (f = m)),
            l--,
            (e = m);
        e !== f && lk(a, b, e, f);
        e = f = g;
      }
    }
  };
  k.$d = function(a, b, c, d, e) {
    var f, g, h, l, m, p, n;
    n = this.g.length - 2;
    h = this.g[n + 1];
    for (f = this.u.length - 1; 0 <= f; --f)
      for (
        g = this.l[f],
          a.uniform4fv(this.H.D, g[0]),
          rk(this, a, g[1], g[2]),
          l = this.u[f];
        0 <= n && this.g[n] >= l;

      ) {
        g = this.g[n];
        m = this.i[n];
        p = x(m).toString();
        if (
          void 0 === c[p] &&
          m.V() &&
          (void 0 === e || jc(e, m.V().G())) &&
          (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
          lk(a, b, g, h),
          (h = d(m)))
        )
          return h;
        n--;
        h = g;
      }
  };
  function rk(a, b, c, d) {
    b.uniform4fv(a.H.P, c);
    b.uniform1f(a.H.L, d);
  }
  k.Ma = function(a, b) {
    var c, d;
    b
      ? ((c = b.g),
        (this.c.lineDash = c ? c : Vj),
        (c = b.b),
        c instanceof CanvasGradient || c instanceof CanvasPattern
          ? (c = Wj)
          : (c =
              ye(c).map(function(a, b) {
                return 3 != b ? a / 255 : a;
              }) || Wj),
        (d = b.f),
        (d = void 0 !== d ? d : 1))
      : ((c = [0, 0, 0, 0]), (d = 0));
    var e = a ? a.b : [0, 0, 0, 0];
    e instanceof CanvasGradient || e instanceof CanvasPattern
      ? (e = Uj)
      : (e =
          ye(e).map(function(a, b) {
            return 3 != b ? a / 255 : a;
          }) || Uj);
    (this.c.strokeColor &&
      db(this.c.strokeColor, c) &&
      this.c.fillColor &&
      db(this.c.fillColor, e) &&
      this.c.lineWidth === d) ||
      ((this.c.s = !0),
      (this.c.fillColor = e),
      (this.c.strokeColor = c),
      (this.c.lineWidth = d),
      this.l.push([e, c, d]));
  };
  function sk() {
    this.b =
      "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}";
  }
  v(sk, ak);
  var tk = new sk();
  function uk() {
    this.b =
      "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}";
  }
  v(uk, bk);
  var vk = new uk();
  function wk(a, b) {
    this.f = a.getUniformLocation(b, "j");
    this.c = a.getUniformLocation(b, "i");
    this.a = a.getUniformLocation(b, "k");
    this.g = a.getUniformLocation(b, "h");
    this.v = a.getAttribLocation(b, "e");
    this.H = a.getAttribLocation(b, "f");
    this.b = a.getAttribLocation(b, "c");
    this.A = a.getAttribLocation(b, "g");
    this.C = a.getAttribLocation(b, "d");
  }
  function xk(a, b) {
    this.j = a;
    this.b = b;
    this.a = {};
    this.f = {};
    this.g = {};
    this.o = this.v = this.c = this.l = null;
    (this.i = Za(da, "OES_element_index_uint")) &&
      b.getExtension("OES_element_index_uint");
    B(this.j, "webglcontextlost", this.co, this);
    B(this.j, "webglcontextrestored", this.eo, this);
  }
  v(xk, Ga);
  function kk(a, b, c) {
    var d = a.b,
      e = c.b,
      f = String(x(c));
    if (f in a.a) d.bindBuffer(b, a.a[f].buffer);
    else {
      var g = d.createBuffer();
      d.bindBuffer(b, g);
      var h;
      34962 == b
        ? (h = new Float32Array(e))
        : 34963 == b && (h = a.i ? new Uint32Array(e) : new Uint16Array(e));
      d.bufferData(b, h, c.a);
      a.a[f] = { gc: c, buffer: g };
    }
  }
  function pk(a, b) {
    var c = a.b,
      d = String(x(b)),
      e = a.a[d];
    c.isContextLost() || c.deleteBuffer(e.buffer);
    delete a.a[d];
  }
  k = xk.prototype;
  k.oa = function() {
    Fa(this.j);
    var a = this.b;
    if (!a.isContextLost()) {
      for (var b in this.a) a.deleteBuffer(this.a[b].buffer);
      for (b in this.g) a.deleteProgram(this.g[b]);
      for (b in this.f) a.deleteShader(this.f[b]);
      a.deleteFramebuffer(this.c);
      a.deleteRenderbuffer(this.o);
      a.deleteTexture(this.v);
    }
  };
  k.bo = function() {
    return this.b;
  };
  function yk(a) {
    if (!a.c) {
      var b = a.b,
        c = b.createFramebuffer();
      b.bindFramebuffer(b.FRAMEBUFFER, c);
      var d = zk(b, 1, 1),
        e = b.createRenderbuffer();
      b.bindRenderbuffer(b.RENDERBUFFER, e);
      b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, 1, 1);
      b.framebufferTexture2D(
        b.FRAMEBUFFER,
        b.COLOR_ATTACHMENT0,
        b.TEXTURE_2D,
        d,
        0
      );
      b.framebufferRenderbuffer(
        b.FRAMEBUFFER,
        b.DEPTH_ATTACHMENT,
        b.RENDERBUFFER,
        e
      );
      b.bindTexture(b.TEXTURE_2D, null);
      b.bindRenderbuffer(b.RENDERBUFFER, null);
      b.bindFramebuffer(b.FRAMEBUFFER, null);
      a.c = c;
      a.v = d;
      a.o = e;
    }
    return a.c;
  }
  function Ak(a, b) {
    var c = String(x(b));
    if (c in a.f) return a.f[c];
    var d = a.b,
      e = d.createShader(b.Y());
    d.shaderSource(e, b.b);
    d.compileShader(e);
    return (a.f[c] = e);
  }
  function qk(a, b, c) {
    var d = x(b) + "/" + x(c);
    if (d in a.g) return a.g[d];
    var e = a.b,
      f = e.createProgram();
    e.attachShader(f, Ak(a, b));
    e.attachShader(f, Ak(a, c));
    e.linkProgram(f);
    return (a.g[d] = f);
  }
  k.co = function() {
    ua(this.a);
    ua(this.f);
    ua(this.g);
    this.o = this.v = this.c = this.l = null;
  };
  k.eo = function() {};
  k.Lc = function(a) {
    if (a == this.l) return !1;
    this.b.useProgram(a);
    this.l = a;
    return !0;
  };
  function Bk(a, b, c) {
    var d = a.createTexture();
    a.bindTexture(a.TEXTURE_2D, d);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
    void 0 !== b && a.texParameteri(3553, 10242, b);
    void 0 !== c && a.texParameteri(3553, 10243, c);
    return d;
  }
  function zk(a, b, c) {
    var d = Bk(a, void 0, void 0);
    a.texImage2D(
      a.TEXTURE_2D,
      0,
      a.RGBA,
      b,
      c,
      0,
      a.RGBA,
      a.UNSIGNED_BYTE,
      null
    );
    return d;
  }
  function Ck(a, b) {
    var c = Bk(a, 33071, 33071);
    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b);
    return c;
  }
  function Dk(a, b) {
    jk.call(this, 0, b);
    this.D = this.C = void 0;
    this.A = [];
    this.H = [];
    this.ra = void 0;
    this.l = [];
    this.c = [];
    this.P = this.va = void 0;
    this.L = null;
    this.sa = this.fa = this.eb = this.Z = this.Qa = this.U = void 0;
    this.Fa = [];
    this.u = [];
    this.zb = void 0;
  }
  v(Dk, jk);
  k = Dk.prototype;
  k.wb = function(a) {
    var b = this.v,
      c = this.o,
      d = this.Fa,
      e = this.u,
      f = a.b;
    return function() {
      if (!f.isContextLost()) {
        var g, h;
        g = 0;
        for (h = d.length; g < h; ++g) f.deleteTexture(d[g]);
        g = 0;
        for (h = e.length; g < h; ++g) f.deleteTexture(e[g]);
      }
      pk(a, b);
      pk(a, c);
    };
  };
  function Ek(a, b, c, d) {
    var e = a.C,
      f = a.D,
      g = a.ra,
      h = a.va,
      l = a.P,
      m = a.U,
      p = a.Qa,
      n = a.Z,
      q = a.eb ? 1 : 0,
      r = -a.fa,
      u = a.sa,
      w = a.zb,
      y = Math.cos(r),
      r = Math.sin(r),
      z = a.b.length,
      A = a.a.length,
      O,
      Ja,
      ca,
      Ma,
      D,
      La;
    for (O = 0; O < c; O += d)
      (D = b[O] - a.origin[0]),
        (La = b[O + 1] - a.origin[1]),
        (Ja = A / 8),
        (ca = -u * e),
        (Ma = -u * (g - f)),
        (a.a[A++] = D),
        (a.a[A++] = La),
        (a.a[A++] = ca * y - Ma * r),
        (a.a[A++] = ca * r + Ma * y),
        (a.a[A++] = p / l),
        (a.a[A++] = (n + g) / h),
        (a.a[A++] = m),
        (a.a[A++] = q),
        (ca = u * (w - e)),
        (Ma = -u * (g - f)),
        (a.a[A++] = D),
        (a.a[A++] = La),
        (a.a[A++] = ca * y - Ma * r),
        (a.a[A++] = ca * r + Ma * y),
        (a.a[A++] = (p + w) / l),
        (a.a[A++] = (n + g) / h),
        (a.a[A++] = m),
        (a.a[A++] = q),
        (ca = u * (w - e)),
        (Ma = u * f),
        (a.a[A++] = D),
        (a.a[A++] = La),
        (a.a[A++] = ca * y - Ma * r),
        (a.a[A++] = ca * r + Ma * y),
        (a.a[A++] = (p + w) / l),
        (a.a[A++] = n / h),
        (a.a[A++] = m),
        (a.a[A++] = q),
        (ca = -u * e),
        (Ma = u * f),
        (a.a[A++] = D),
        (a.a[A++] = La),
        (a.a[A++] = ca * y - Ma * r),
        (a.a[A++] = ca * r + Ma * y),
        (a.a[A++] = p / l),
        (a.a[A++] = n / h),
        (a.a[A++] = m),
        (a.a[A++] = q),
        (a.b[z++] = Ja),
        (a.b[z++] = Ja + 1),
        (a.b[z++] = Ja + 2),
        (a.b[z++] = Ja),
        (a.b[z++] = Ja + 2),
        (a.b[z++] = Ja + 3);
  }
  k.vc = function(a, b) {
    this.g.push(this.b.length);
    this.i.push(b);
    var c = a.ia();
    Ek(this, c, c.length, a.pa());
  };
  k.xc = function(a, b) {
    this.g.push(this.b.length);
    this.i.push(b);
    var c = a.ia();
    Ek(this, c, c.length, a.pa());
  };
  k.vb = function(a) {
    a = a.b;
    this.A.push(this.b.length);
    this.H.push(this.b.length);
    this.v = new mk(this.a);
    this.o = new mk(this.b);
    var b = {};
    Fk(this.Fa, this.l, b, a);
    Fk(this.u, this.c, b, a);
    this.ra = this.D = this.C = void 0;
    this.c = this.l = null;
    this.P = this.va = void 0;
    this.b = null;
    this.sa = this.fa = this.eb = this.Z = this.Qa = this.U = void 0;
    this.a = null;
    this.zb = void 0;
  };
  function Fk(a, b, c, d) {
    var e,
      f,
      g,
      h = b.length;
    for (g = 0; g < h; ++g)
      (e = b[g]),
        (f = x(e).toString()),
        f in c ? (e = c[f]) : ((e = Ck(d, e)), (c[f] = e)),
        (a[g] = e);
  }
  k.Ke = function(a, b) {
    var c = qk(b, tk, vk),
      d;
    this.L ? (d = this.L) : (this.L = d = new wk(a, c));
    b.Lc(c);
    a.enableVertexAttribArray(d.b);
    a.vertexAttribPointer(d.b, 2, 5126, !1, 32, 0);
    a.enableVertexAttribArray(d.v);
    a.vertexAttribPointer(d.v, 2, 5126, !1, 32, 8);
    a.enableVertexAttribArray(d.C);
    a.vertexAttribPointer(d.C, 2, 5126, !1, 32, 16);
    a.enableVertexAttribArray(d.H);
    a.vertexAttribPointer(d.H, 1, 5126, !1, 32, 24);
    a.enableVertexAttribArray(d.A);
    a.vertexAttribPointer(d.A, 1, 5126, !1, 32, 28);
    return d;
  };
  k.Le = function(a, b) {
    a.disableVertexAttribArray(b.b);
    a.disableVertexAttribArray(b.v);
    a.disableVertexAttribArray(b.C);
    a.disableVertexAttribArray(b.H);
    a.disableVertexAttribArray(b.A);
  };
  k.yd = function(a, b, c, d) {
    var e = d ? this.u : this.Fa;
    d = d ? this.H : this.A;
    if (wa(c)) {
      var f, g;
      c = 0;
      f = e.length;
      for (g = 0; c < f; ++c) {
        a.bindTexture(3553, e[c]);
        var h = d[c];
        lk(a, b, g, h);
        g = h;
      }
    } else
      for (g = f = 0, h = e.length; g < h; ++g) {
        a.bindTexture(3553, e[g]);
        for (
          var l = 0 < g ? d[g - 1] : 0, m = d[g], p = l;
          f < this.g.length && this.g[f] <= m;

        ) {
          var n = x(this.i[f]).toString();
          void 0 !== c[n]
            ? (p !== l && lk(a, b, p, l),
              (l = p = f === this.g.length - 1 ? m : this.g[f + 1]))
            : (l = f === this.g.length - 1 ? m : this.g[f + 1]);
          f++;
        }
        p !== l && lk(a, b, p, l);
      }
  };
  k.$d = function(a, b, c, d, e) {
    var f,
      g,
      h,
      l,
      m,
      p,
      n = this.g.length - 1;
    for (f = this.u.length - 1; 0 <= f; --f)
      for (
        a.bindTexture(3553, this.u[f]),
          g = 0 < f ? this.H[f - 1] : 0,
          l = this.H[f];
        0 <= n && this.g[n] >= g;

      ) {
        h = this.g[n];
        m = this.i[n];
        p = x(m).toString();
        if (
          void 0 === c[p] &&
          m.V() &&
          (void 0 === e || jc(e, m.V().G())) &&
          (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
          lk(a, b, h, l),
          (l = d(m)))
        )
          return l;
        l = h;
        n--;
      }
  };
  k.dc = function(a) {
    var b = a.Ac(),
      c = a.Ic(1),
      d = a.de(),
      e = a.Lf(1),
      f = a.l,
      g = a.Jc(),
      h = a.H,
      l = a.o,
      m = a.ac();
    a = a.i;
    var p;
    0 === this.l.length
      ? this.l.push(c)
      : ((p = this.l[this.l.length - 1]),
        x(p) != x(c) && (this.A.push(this.b.length), this.l.push(c)));
    0 === this.c.length
      ? this.c.push(e)
      : ((p = this.c[this.c.length - 1]),
        x(p) != x(e) && (this.H.push(this.b.length), this.c.push(e)));
    this.C = b[0];
    this.D = b[1];
    this.ra = m[1];
    this.va = d[1];
    this.P = d[0];
    this.U = f;
    this.Qa = g[0];
    this.Z = g[1];
    this.fa = l;
    this.eb = h;
    this.sa = a;
    this.zb = m[0];
  };
  function Gk(a, b, c) {
    var d = b - c;
    return a[0] === a[d] && a[1] === a[d + 1] && 3 < (b - 0) / c
      ? !!Zc(a, 0, b, c)
      : !1;
  }
  function Hk() {
    this.b =
      "precision mediump float;varying float a;varying vec2 b;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((b.x+1.0)/2.0*o.x*p,(b.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}";
  }
  v(Hk, ak);
  var Ik = new Hk();
  function Jk() {
    this.b =
      "varying float a;varying vec2 b;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;b=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}";
  }
  v(Jk, bk);
  var Kk = new Jk();
  function Lk(a, b) {
    this.D = a.getUniformLocation(b, "n");
    this.L = a.getUniformLocation(b, "k");
    this.P = a.getUniformLocation(b, "l");
    this.f = a.getUniformLocation(b, "j");
    this.c = a.getUniformLocation(b, "i");
    this.a = a.getUniformLocation(b, "m");
    this.ra = a.getUniformLocation(b, "p");
    this.g = a.getUniformLocation(b, "h");
    this.va = a.getUniformLocation(b, "o");
    this.i = a.getAttribLocation(b, "g");
    this.l = a.getAttribLocation(b, "d");
    this.o = a.getAttribLocation(b, "f");
    this.b = a.getAttribLocation(b, "e");
  }
  function Mk(a, b) {
    jk.call(this, 0, b);
    this.H = null;
    this.u = [];
    this.l = [];
    this.c = {
      strokeColor: null,
      lineCap: void 0,
      lineDash: null,
      lineJoin: void 0,
      lineWidth: void 0,
      miterLimit: void 0,
      s: !1
    };
  }
  v(Mk, jk);
  function Nk(a, b, c, d) {
    var e,
      f = a.a.length,
      g = a.b.length,
      h = "bevel" === a.c.lineJoin ? 0 : "miter" === a.c.lineJoin ? 1 : 2,
      l = "butt" === a.c.lineCap ? 0 : "square" === a.c.lineCap ? 1 : 2,
      m = Gk(b, c, d),
      p,
      n,
      q,
      r = g,
      u = 1,
      w,
      y,
      z;
    for (e = 0; e < c; e += d) {
      q = f / 7;
      w = y;
      y = z || [b[e], b[e + 1]];
      if (0 === e) {
        z = [b[e + d], b[e + d + 1]];
        if (c - 0 === 2 * d && db(y, z)) break;
        if (m) (w = [b[c - 2 * d], b[c - 2 * d + 1]]), (p = z);
        else {
          l &&
            ((f = Ok(a, [0, 0], y, z, 7 * u * l, f)),
            (f = Ok(a, [0, 0], y, z, 7 * -u * l, f)),
            (a.b[g++] = q + 2),
            (a.b[g++] = q),
            (a.b[g++] = q + 1),
            (a.b[g++] = q + 1),
            (a.b[g++] = q + 3),
            (a.b[g++] = q + 2));
          f = Ok(a, [0, 0], y, z, 3 * u * (l || 1), f);
          f = Ok(a, [0, 0], y, z, 3 * -u * (l || 1), f);
          r = f / 7 - 1;
          continue;
        }
      } else if (e === c - d) {
        m
          ? (z = p)
          : ((w = w || [0, 0]),
            (f = Ok(a, w, y, [0, 0], 5 * u * (l || 1), f)),
            (f = Ok(a, w, y, [0, 0], 5 * -u * (l || 1), f)),
            (a.b[g++] = q),
            (a.b[g++] = r - 1),
            (a.b[g++] = r),
            (a.b[g++] = r),
            (a.b[g++] = q + 1),
            (a.b[g++] = q),
            l &&
              ((f = Ok(a, w, y, [0, 0], 11 * u * l, f)),
              (f = Ok(a, w, y, [0, 0], 11 * -u * l, f)),
              (a.b[g++] = q + 2),
              (a.b[g++] = q),
              (a.b[g++] = q + 1),
              (a.b[g++] = q + 1),
              (a.b[g++] = q + 3),
              (a.b[g++] = q + 2)));
        break;
      } else z = [b[e + d], b[e + d + 1]];
      n = Xj(w[0], w[1], y[0], y[1], z[0], z[1]) ? -1 : 1;
      f = Ok(a, w, y, z, 13 * n * (h || 1), f);
      f = Ok(a, w, y, z, 17 * n * (h || 1), f);
      f = Ok(a, w, y, z, 19 * -n * (h || 1), f);
      0 < e &&
        ((a.b[g++] = q),
        (a.b[g++] = r - 1),
        (a.b[g++] = r),
        (a.b[g++] = q + 2),
        (a.b[g++] = q),
        (a.b[g++] = 0 < u * n ? r : r - 1));
      a.b[g++] = q;
      a.b[g++] = q + 2;
      a.b[g++] = q + 1;
      r = q + 2;
      u = n;
      h &&
        ((f = Ok(a, w, y, z, 23 * n * h, f)),
        (a.b[g++] = q + 1),
        (a.b[g++] = q + 3),
        (a.b[g++] = q));
    }
    m &&
      ((q = q || f / 7),
      (n = wd([w[0], w[1], y[0], y[1], z[0], z[1]], 0, 6, 2) ? 1 : -1),
      (f = Ok(a, w, y, z, 13 * n * (h || 1), f)),
      Ok(a, w, y, z, 19 * -n * (h || 1), f),
      (a.b[g++] = q),
      (a.b[g++] = r - 1),
      (a.b[g++] = r),
      (a.b[g++] = q + 1),
      (a.b[g++] = q),
      (a.b[g++] = 0 < u * n ? r : r - 1));
  }
  function Ok(a, b, c, d, e, f) {
    a.a[f++] = b[0];
    a.a[f++] = b[1];
    a.a[f++] = c[0];
    a.a[f++] = c[1];
    a.a[f++] = d[0];
    a.a[f++] = d[1];
    a.a[f++] = e;
    return f;
  }
  function Pk(a, b, c) {
    b -= 0;
    return b < 2 * c
      ? !1
      : b === 2 * c
      ? !db([a[0], a[1]], [a[0 + c], a[c + 1]])
      : !0;
  }
  k = Mk.prototype;
  k.Pb = function(a, b) {
    var c = a.ia(),
      d = a.pa();
    Pk(c, c.length, d) &&
      ((c = Tc(c, c.length, d, -this.origin[0], -this.origin[1])),
      this.c.s && (this.l.push(this.b.length), (this.c.s = !1)),
      this.g.push(this.b.length),
      this.i.push(b),
      Nk(this, c, c.length, d));
  };
  k.uc = function(a, b) {
    var c = this.b.length,
      d = a.Yc(),
      e,
      f;
    e = 0;
    for (f = d.length; e < f; ++e) {
      var g = d[e].ia(),
        h = d[e].pa();
      Pk(g, g.length, h) &&
        ((g = Tc(g, g.length, h, -this.origin[0], -this.origin[1])),
        Nk(this, g, g.length, h));
    }
    this.b.length > c &&
      (this.g.push(c),
      this.i.push(b),
      this.c.s && (this.l.push(c), (this.c.s = !1)));
  };
  function Qk(a, b, c, d) {
    Gk(b, b.length, d) || (b.push(b[0]), b.push(b[1]));
    Nk(a, b, b.length, d);
    if (c.length) {
      var e;
      b = 0;
      for (e = c.length; b < e; ++b)
        Gk(c[b], c[b].length, d) || (c[b].push(c[b][0]), c[b].push(c[b][1])),
          Nk(a, c[b], c[b].length, d);
    }
  }
  function Rk(a, b, c) {
    c = void 0 === c ? a.b.length : c;
    a.g.push(c);
    a.i.push(b);
    a.c.s && (a.l.push(c), (a.c.s = !1));
  }
  k.vb = function() {
    this.v = new mk(this.a);
    this.o = new mk(this.b);
    this.g.push(this.b.length);
    0 === this.l.length && 0 < this.u.length && (this.u = []);
    this.b = this.a = null;
  };
  k.wb = function(a) {
    var b = this.v,
      c = this.o;
    return function() {
      pk(a, b);
      pk(a, c);
    };
  };
  k.Ke = function(a, b, c, d) {
    var e = qk(b, Ik, Kk),
      f;
    this.H ? (f = this.H) : (this.H = f = new Lk(a, e));
    b.Lc(e);
    a.enableVertexAttribArray(f.l);
    a.vertexAttribPointer(f.l, 2, 5126, !1, 28, 0);
    a.enableVertexAttribArray(f.b);
    a.vertexAttribPointer(f.b, 2, 5126, !1, 28, 8);
    a.enableVertexAttribArray(f.o);
    a.vertexAttribPointer(f.o, 2, 5126, !1, 28, 16);
    a.enableVertexAttribArray(f.i);
    a.vertexAttribPointer(f.i, 1, 5126, !1, 28, 24);
    a.uniform2fv(f.va, c);
    a.uniform1f(f.ra, d);
    return f;
  };
  k.Le = function(a, b) {
    a.disableVertexAttribArray(b.l);
    a.disableVertexAttribArray(b.b);
    a.disableVertexAttribArray(b.o);
    a.disableVertexAttribArray(b.i);
  };
  k.yd = function(a, b, c, d) {
    var e = a.getParameter(a.DEPTH_FUNC),
      f = a.getParameter(a.DEPTH_WRITEMASK);
    d || (a.enable(a.DEPTH_TEST), a.depthMask(!0), a.depthFunc(a.NOTEQUAL));
    if (wa(c)) {
      var g, h, l;
      h = this.g[this.g.length - 1];
      for (c = this.l.length - 1; 0 <= c; --c)
        (g = this.l[c]),
          (l = this.u[c]),
          Sk(this, a, l[0], l[1], l[2]),
          lk(a, b, g, h),
          a.clear(a.DEPTH_BUFFER_BIT),
          (h = g);
    } else {
      var m, p, n, q;
      n = this.g.length - 2;
      l = h = this.g[n + 1];
      for (g = this.l.length - 1; 0 <= g; --g) {
        m = this.u[g];
        Sk(this, a, m[0], m[1], m[2]);
        for (m = this.l[g]; 0 <= n && this.g[n] >= m; )
          (q = this.g[n]),
            (p = this.i[n]),
            (p = x(p).toString()),
            c[p] &&
              (h !== l && (lk(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT)),
              (l = q)),
            n--,
            (h = q);
        h !== l && (lk(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT));
        h = l = m;
      }
    }
    d ||
      (a.disable(a.DEPTH_TEST),
      a.clear(a.DEPTH_BUFFER_BIT),
      a.depthMask(f),
      a.depthFunc(e));
  };
  k.$d = function(a, b, c, d, e) {
    var f, g, h, l, m, p, n;
    n = this.g.length - 2;
    h = this.g[n + 1];
    for (f = this.l.length - 1; 0 <= f; --f)
      for (
        g = this.u[f], Sk(this, a, g[0], g[1], g[2]), l = this.l[f];
        0 <= n && this.g[n] >= l;

      ) {
        g = this.g[n];
        m = this.i[n];
        p = x(m).toString();
        if (
          void 0 === c[p] &&
          m.V() &&
          (void 0 === e || jc(e, m.V().G())) &&
          (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
          lk(a, b, g, h),
          (h = d(m)))
        )
          return h;
        n--;
        h = g;
      }
  };
  function Sk(a, b, c, d, e) {
    b.uniform4fv(a.H.D, c);
    b.uniform1f(a.H.L, d);
    b.uniform1f(a.H.P, e);
  }
  k.Ma = function(a, b) {
    var c = b.c;
    this.c.lineCap = void 0 !== c ? c : "round";
    c = b.g;
    this.c.lineDash = c ? c : Vj;
    c = b.i;
    this.c.lineJoin = void 0 !== c ? c : "round";
    c = b.b;
    c instanceof CanvasGradient || c instanceof CanvasPattern
      ? (c = Wj)
      : (c =
          ye(c).map(function(a, b) {
            return 3 != b ? a / 255 : a;
          }) || Wj);
    var d = b.f,
      d = void 0 !== d ? d : 1,
      e = b.j,
      e = void 0 !== e ? e : 10;
    (this.c.strokeColor &&
      db(this.c.strokeColor, c) &&
      this.c.lineWidth === d &&
      this.c.miterLimit === e) ||
      ((this.c.s = !0),
      (this.c.strokeColor = c),
      (this.c.lineWidth = d),
      (this.c.miterLimit = e),
      this.u.push([c, d, e]));
  };
  function Tk() {
    this.b =
      "precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}";
  }
  v(Tk, ak);
  var Uk = new Tk();
  function Vk() {
    this.b =
      "attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}";
  }
  v(Vk, bk);
  var Wk = new Vk();
  function Xk(a, b) {
    this.D = a.getUniformLocation(b, "e");
    this.f = a.getUniformLocation(b, "d");
    this.c = a.getUniformLocation(b, "c");
    this.a = a.getUniformLocation(b, "f");
    this.g = a.getUniformLocation(b, "b");
    this.b = a.getAttribLocation(b, "a");
  }
  function Yk(a) {
    this.b = this.a = this.g = void 0;
    this.c = void 0 === a ? !0 : a;
    this.f = 0;
  }
  function Zk(a) {
    var b = a.b;
    if (b) {
      var c = b.next,
        d = b.pb;
      c && (c.pb = d);
      d && (d.next = c);
      a.b = c || d;
      a.g === a.a
        ? ((a.b = void 0), (a.g = void 0), (a.a = void 0))
        : a.g === b
        ? (a.g = a.b)
        : a.a === b && (a.a = d ? a.b.pb : a.b);
      a.f--;
    }
  }
  function $k(a) {
    a.b = a.g;
    if (a.b) return a.b.data;
  }
  function al(a) {
    if (a.b && a.b.next) return (a.b = a.b.next), a.b.data;
  }
  function bl(a) {
    if (a.b && a.b.next) return a.b.next.data;
  }
  function cl(a) {
    if (a.b && a.b.pb) return (a.b = a.b.pb), a.b.data;
  }
  function dl(a) {
    if (a.b && a.b.pb) return a.b.pb.data;
  }
  function el(a) {
    if (a.b) return a.b.data;
  }
  Yk.prototype.concat = function(a) {
    if (a.b) {
      if (this.b) {
        var b = this.b.next;
        this.b.next = a.g;
        a.g.pb = this.b;
        b.pb = a.a;
        a.a.next = b;
        this.f += a.f;
      } else (this.b = a.b), (this.g = a.g), (this.a = a.a), (this.f = a.f);
      a.b = void 0;
      a.g = void 0;
      a.a = void 0;
      a.f = 0;
    }
  };
  var fl, gl, hl, il;
  (function() {
    var a = {},
      b = { ma: a };
    (function(c) {
      if ("object" === typeof a && "undefined" !== typeof b) b.ma = c();
      else {
        var d;
        "undefined" !== typeof window
          ? (d = window)
          : "undefined" !== typeof global
          ? (d = global)
          : "undefined" !== typeof self
          ? (d = self)
          : (d = this);
        d.Tp = c();
      }
    })(function() {
      return (function d(a, b, g) {
        function h(m, n) {
          if (!b[m]) {
            if (!a[m]) {
              var q = "function" == typeof require && require;
              if (!n && q) return q(m, !0);
              if (l) return l(m, !0);
              q = Error("Cannot find module '" + m + "'");
              throw ((q.code = "MODULE_NOT_FOUND"), q);
            }
            q = b[m] = { ma: {} };
            a[m][0].call(
              q.ma,
              function(b) {
                var d = a[m][1][b];
                return h(d ? d : b);
              },
              q,
              q.ma,
              d,
              a,
              b,
              g
            );
          }
          return b[m].ma;
        }
        for (
          var l = "function" == typeof require && require, m = 0;
          m < g.length;
          m++
        )
          h(g[m]);
        return h;
      })(
        {
          1: [
            function(a, b) {
              function f(a, b, d, e, q) {
                d = d || 0;
                e = e || a.length - 1;
                for (q = q || h; e > d; ) {
                  if (600 < e - d) {
                    var r = e - d + 1,
                      u = b - d + 1,
                      w = Math.log(r),
                      y = 0.5 * Math.exp((2 * w) / 3),
                      w =
                        0.5 *
                        Math.sqrt((w * y * (r - y)) / r) *
                        (0 > u - r / 2 ? -1 : 1);
                    f(
                      a,
                      b,
                      Math.max(d, Math.floor(b - (u * y) / r + w)),
                      Math.min(e, Math.floor(b + ((r - u) * y) / r + w)),
                      q
                    );
                  }
                  r = a[b];
                  u = d;
                  y = e;
                  g(a, d, b);
                  for (0 < q(a[e], r) && g(a, d, e); u < y; ) {
                    g(a, u, y);
                    u++;
                    for (y--; 0 > q(a[u], r); ) u++;
                    for (; 0 < q(a[y], r); ) y--;
                  }
                  0 === q(a[d], r) ? g(a, d, y) : (y++, g(a, y, e));
                  y <= b && (d = y + 1);
                  b <= y && (e = y - 1);
                }
              }
              function g(a, b, d) {
                var e = a[b];
                a[b] = a[d];
                a[d] = e;
              }
              function h(a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
              }
              b.ma = f;
            },
            {}
          ],
          2: [
            function(a, b) {
              function f(a, b) {
                if (!(this instanceof f)) return new f(a, b);
                this.af = Math.max(4, a || 9);
                this.rg = Math.max(2, Math.ceil(0.4 * this.af));
                b && this.vj(b);
                this.clear();
              }
              function g(a, b) {
                h(a, 0, a.children.length, b, a);
              }
              function h(a, b, d, e, f) {
                f || (f = w(null));
                f.ea = Infinity;
                f.ga = Infinity;
                f.ca = -Infinity;
                f.ja = -Infinity;
                for (var g; b < d; b++)
                  (g = a.children[b]), l(f, a.ab ? e(g) : g);
                return f;
              }
              function l(a, b) {
                a.ea = Math.min(a.ea, b.ea);
                a.ga = Math.min(a.ga, b.ga);
                a.ca = Math.max(a.ca, b.ca);
                a.ja = Math.max(a.ja, b.ja);
              }
              function m(a, b) {
                return a.ea - b.ea;
              }
              function p(a, b) {
                return a.ga - b.ga;
              }
              function n(a) {
                return (a.ca - a.ea) * (a.ja - a.ga);
              }
              function q(a) {
                return a.ca - a.ea + (a.ja - a.ga);
              }
              function r(a, b) {
                return (
                  a.ea <= b.ea && a.ga <= b.ga && b.ca <= a.ca && b.ja <= a.ja
                );
              }
              function u(a, b) {
                return (
                  b.ea <= a.ca && b.ga <= a.ja && b.ca >= a.ea && b.ja >= a.ga
                );
              }
              function w(a) {
                return {
                  children: a,
                  height: 1,
                  ab: !0,
                  ea: Infinity,
                  ga: Infinity,
                  ca: -Infinity,
                  ja: -Infinity
                };
              }
              function y(a, b, d, e, f) {
                for (var g = [b, d], h; g.length; )
                  (d = g.pop()),
                    (b = g.pop()),
                    d - b <= e ||
                      ((h = b + Math.ceil((d - b) / e / 2) * e),
                      z(a, h, b, d, f),
                      g.push(b, h, h, d));
              }
              b.ma = f;
              var z = a("quickselect");
              f.prototype = {
                all: function() {
                  return this.mg(this.data, []);
                },
                search: function(a) {
                  var b = this.data,
                    d = [],
                    e = this.tb;
                  if (!u(a, b)) return d;
                  for (var f = [], g, h, l, m; b; ) {
                    g = 0;
                    for (h = b.children.length; g < h; g++)
                      (l = b.children[g]),
                        (m = b.ab ? e(l) : l),
                        u(a, m) &&
                          (b.ab
                            ? d.push(l)
                            : r(a, m)
                            ? this.mg(l, d)
                            : f.push(l));
                    b = f.pop();
                  }
                  return d;
                },
                load: function(a) {
                  if (!a || !a.length) return this;
                  if (a.length < this.rg) {
                    for (var b = 0, d = a.length; b < d; b++) this.Da(a[b]);
                    return this;
                  }
                  a = this.og(a.slice(), 0, a.length - 1, 0);
                  this.data.children.length
                    ? this.data.height === a.height
                      ? this.tg(this.data, a)
                      : (this.data.height < a.height &&
                          ((b = this.data), (this.data = a), (a = b)),
                        this.qg(a, this.data.height - a.height - 1, !0))
                    : (this.data = a);
                  return this;
                },
                Da: function(a) {
                  a && this.qg(a, this.data.height - 1);
                  return this;
                },
                clear: function() {
                  this.data = w([]);
                  return this;
                },
                remove: function(a, b) {
                  if (!a) return this;
                  for (
                    var d = this.data,
                      e = this.tb(a),
                      f = [],
                      g = [],
                      h,
                      l,
                      m,
                      p;
                    d || f.length;

                  ) {
                    d ||
                      ((d = f.pop()),
                      (l = f[f.length - 1]),
                      (h = g.pop()),
                      (p = !0));
                    if (d.ab) {
                      a: {
                        m = a;
                        var n = d.children,
                          q = b;
                        if (q) {
                          for (var u = 0; u < n.length; u++)
                            if (q(m, n[u])) {
                              m = u;
                              break a;
                            }
                          m = -1;
                        } else m = n.indexOf(m);
                      }
                      if (-1 !== m) {
                        d.children.splice(m, 1);
                        f.push(d);
                        this.tj(f);
                        break;
                      }
                    }
                    p || d.ab || !r(d, e)
                      ? l
                        ? (h++, (d = l.children[h]), (p = !1))
                        : (d = null)
                      : (f.push(d),
                        g.push(h),
                        (h = 0),
                        (l = d),
                        (d = d.children[0]));
                  }
                  return this;
                },
                tb: function(a) {
                  return a;
                },
                ff: m,
                gf: p,
                toJSON: function() {
                  return this.data;
                },
                mg: function(a, b) {
                  for (var d = []; a; )
                    a.ab
                      ? b.push.apply(b, a.children)
                      : d.push.apply(d, a.children),
                      (a = d.pop());
                  return b;
                },
                og: function(a, b, d, e) {
                  var f = d - b + 1,
                    h = this.af,
                    l;
                  if (f <= h)
                    return (l = w(a.slice(b, d + 1))), g(l, this.tb), l;
                  e ||
                    ((e = Math.ceil(Math.log(f) / Math.log(h))),
                    (h = Math.ceil(f / Math.pow(h, e - 1))));
                  l = w([]);
                  l.ab = !1;
                  l.height = e;
                  var f = Math.ceil(f / h),
                    h = f * Math.ceil(Math.sqrt(h)),
                    m,
                    p,
                    n;
                  for (y(a, b, d, h, this.ff); b <= d; b += h)
                    for (
                      p = Math.min(b + h - 1, d), y(a, b, p, f, this.gf), m = b;
                      m <= p;
                      m += f
                    )
                      (n = Math.min(m + f - 1, p)),
                        l.children.push(this.og(a, m, n, e - 1));
                  g(l, this.tb);
                  return l;
                },
                sj: function(a, b, d, e) {
                  for (var f, g, h, l, m, p, q, r; ; ) {
                    e.push(b);
                    if (b.ab || e.length - 1 === d) break;
                    q = r = Infinity;
                    f = 0;
                    for (g = b.children.length; f < g; f++)
                      (h = b.children[f]),
                        (m = n(h)),
                        (p =
                          (Math.max(h.ca, a.ca) - Math.min(h.ea, a.ea)) *
                            (Math.max(h.ja, a.ja) - Math.min(h.ga, a.ga)) -
                          m),
                        p < r
                          ? ((r = p), (q = m < q ? m : q), (l = h))
                          : p === r && m < q && ((q = m), (l = h));
                    b = l || b.children[0];
                  }
                  return b;
                },
                qg: function(a, b, d) {
                  var e = this.tb;
                  d = d ? a : e(a);
                  var e = [],
                    f = this.sj(d, this.data, b, e);
                  f.children.push(a);
                  for (l(f, d); 0 <= b; )
                    if (e[b].children.length > this.af) this.Aj(e, b), b--;
                    else break;
                  this.pj(d, e, b);
                },
                Aj: function(a, b) {
                  var d = a[b],
                    e = d.children.length,
                    f = this.rg;
                  this.qj(d, f, e);
                  e = this.rj(d, f, e);
                  e = w(d.children.splice(e, d.children.length - e));
                  e.height = d.height;
                  e.ab = d.ab;
                  g(d, this.tb);
                  g(e, this.tb);
                  b ? a[b - 1].children.push(e) : this.tg(d, e);
                },
                tg: function(a, b) {
                  this.data = w([a, b]);
                  this.data.height = a.height + 1;
                  this.data.ab = !1;
                  g(this.data, this.tb);
                },
                rj: function(a, b, d) {
                  var e, f, g, l, m, p, q;
                  m = p = Infinity;
                  for (e = b; e <= d - b; e++)
                    (f = h(a, 0, e, this.tb)),
                      (g = h(a, e, d, this.tb)),
                      (l =
                        Math.max(
                          0,
                          Math.min(f.ca, g.ca) - Math.max(f.ea, g.ea)
                        ) *
                        Math.max(
                          0,
                          Math.min(f.ja, g.ja) - Math.max(f.ga, g.ga)
                        )),
                      (f = n(f) + n(g)),
                      l < m
                        ? ((m = l), (q = e), (p = f < p ? f : p))
                        : l === m && f < p && ((p = f), (q = e));
                  return q;
                },
                qj: function(a, b, d) {
                  var e = a.ab ? this.ff : m,
                    f = a.ab ? this.gf : p,
                    g = this.ng(a, b, d, e);
                  b = this.ng(a, b, d, f);
                  g < b && a.children.sort(e);
                },
                ng: function(a, b, d, e) {
                  a.children.sort(e);
                  e = this.tb;
                  var f = h(a, 0, b, e),
                    g = h(a, d - b, d, e),
                    m = q(f) + q(g),
                    p,
                    n;
                  for (p = b; p < d - b; p++)
                    (n = a.children[p]), l(f, a.ab ? e(n) : n), (m += q(f));
                  for (p = d - b - 1; p >= b; p--)
                    (n = a.children[p]), l(g, a.ab ? e(n) : n), (m += q(g));
                  return m;
                },
                pj: function(a, b, d) {
                  for (; 0 <= d; d--) l(b[d], a);
                },
                tj: function(a) {
                  for (var b = a.length - 1, d; 0 <= b; b--)
                    0 === a[b].children.length
                      ? 0 < b
                        ? ((d = a[b - 1].children),
                          d.splice(d.indexOf(a[b]), 1))
                        : this.clear()
                      : g(a[b], this.tb);
                },
                vj: function(a) {
                  var b = ["return a", " - b", ";"];
                  this.ff = new Function("a", "b", b.join(a[0]));
                  this.gf = new Function("a", "b", b.join(a[1]));
                  this.tb = new Function(
                    "a",
                    "return {minX: a" +
                      a[0] +
                      ", minY: a" +
                      a[1] +
                      ", maxX: a" +
                      a[2] +
                      ", maxY: a" +
                      a[3] +
                      "};"
                  );
                }
              };
            },
            { quickselect: 1 }
          ]
        },
        {},
        [2]
      )(2);
    });
    fl = b.ma;
  })();
  function jl(a) {
    this.b = fl(a);
    this.a = {};
  }
  k = jl.prototype;
  k.Da = function(a, b) {
    var c = { ea: a[0], ga: a[1], ca: a[2], ja: a[3], value: b };
    this.b.Da(c);
    this.a[x(b)] = c;
  };
  k.load = function(a, b) {
    for (var c = Array(b.length), d = 0, e = b.length; d < e; d++) {
      var f = a[d],
        g = b[d],
        f = { ea: f[0], ga: f[1], ca: f[2], ja: f[3], value: g };
      c[d] = f;
      this.a[x(g)] = f;
    }
    this.b.load(c);
  };
  k.remove = function(a) {
    a = x(a);
    var b = this.a[a];
    delete this.a[a];
    return null !== this.b.remove(b);
  };
  function kl(a, b, c) {
    var d = a.a[x(c)];
    Vb([d.ea, d.ga, d.ca, d.ja], b) || (a.remove(c), a.Da(b, c));
  }
  function ll(a) {
    return a.b.all().map(function(a) {
      return a.value;
    });
  }
  function ml(a, b) {
    return a.b
      .search({ ea: b[0], ga: b[1], ca: b[2], ja: b[3] })
      .map(function(a) {
        return a.value;
      });
  }
  k.forEach = function(a, b) {
    return nl(ll(this), a, b);
  };
  function pl(a, b, c, d) {
    return nl(ml(a, b), c, d);
  }
  function nl(a, b, c) {
    for (var d, e = 0, f = a.length; e < f && !(d = b.call(c, a[e])); e++);
    return d;
  }
  k.clear = function() {
    this.b.clear();
    this.a = {};
  };
  k.G = function() {
    var a = this.b.data;
    return [a.ea, a.ga, a.ca, a.ja];
  };
  function ql(a, b) {
    jk.call(this, 0, b);
    this.j = new Mk(0, b);
    this.H = null;
    this.u = [];
    this.c = [];
    this.l = { fillColor: null, s: !1 };
  }
  v(ql, jk);
  function rl(a, b, c, d) {
    var e = new Yk(),
      f = new jl();
    b = sl(a, b, d, e, f, !0);
    if (c.length) {
      var g,
        h,
        l = [];
      g = 0;
      for (h = c.length; g < h; ++g) {
        var m = { list: new Yk(), ca: void 0 };
        l.push(m);
        m.ca = sl(a, c[g], d, m.list, f, !1);
      }
      l.sort(function(a, b) {
        return b.ca - a.ca;
      });
      for (g = 0; g < l.length; ++g) tl(l[g].list, l[g].ca, e, b, f);
    }
    ul(e, f, !1);
    vl(a, e, f);
  }
  function sl(a, b, c, d, e, f) {
    var g,
      h,
      l = a.a.length / 2,
      m,
      p,
      n,
      q = [],
      r = [];
    if (f === wd(b, 0, b.length, c))
      for (
        p = m = wl(a, b[0], b[1], l++), f = b[0], g = c, h = b.length;
        g < h;
        g += c
      )
        (n = wl(a, b[g], b[g + 1], l++)),
          r.push(xl(p, n, d)),
          q.push([
            Math.min(p.x, n.x),
            Math.min(p.y, n.y),
            Math.max(p.x, n.x),
            Math.max(p.y, n.y)
          ]),
          (f = b[g] > f ? b[g] : f),
          (p = n);
    else
      for (
        g = b.length - c,
          p = m = wl(a, b[g], b[g + 1], l++),
          f = b[g],
          g -= c,
          h = 0;
        g >= h;
        g -= c
      )
        (n = wl(a, b[g], b[g + 1], l++)),
          r.push(xl(p, n, d)),
          q.push([
            Math.min(p.x, n.x),
            Math.min(p.y, n.y),
            Math.max(p.x, n.x),
            Math.max(p.y, n.y)
          ]),
          (f = b[g] > f ? b[g] : f),
          (p = n);
    r.push(xl(n, m, d));
    q.push([
      Math.min(p.x, n.x),
      Math.min(p.y, n.y),
      Math.max(p.x, n.x),
      Math.max(p.y, n.y)
    ]);
    e.load(q, r);
    return f;
  }
  function ul(a, b, c) {
    var d = $k(a),
      e = d,
      f = al(a),
      g = !1;
    do {
      var h = c
        ? Xj(f.X.x, f.X.y, e.X.x, e.X.y, e.ba.x, e.ba.y)
        : Xj(e.ba.x, e.ba.y, e.X.x, e.X.y, f.X.x, f.X.y);
      void 0 === h
        ? (yl(e, f, a, b), (g = !0), f === d && (d = bl(a)), (f = e), cl(a))
        : e.X.qb !== h && ((e.X.qb = h), (g = !0));
      e = f;
      f = al(a);
    } while (e !== d);
    return g;
  }
  function tl(a, b, c, d, e) {
    ul(a, e, !0);
    for (var f = $k(a); f.X.x !== b; ) f = al(a);
    b = f.X;
    d = { x: d, y: b.y, $a: -1 };
    var g = Infinity,
      h,
      l,
      m,
      p;
    m = zl({ ba: b, X: d }, e, !0);
    h = 0;
    for (l = m.length; h < l; ++h) {
      var n = m[h];
      if (void 0 === n.ba.qb) {
        var q = Al(b, d, n.ba, n.X, !0),
          r = Math.abs(b.x - q[0]);
        r < g && ((g = r), (p = { x: q[0], y: q[1], $a: -1 }), (f = n));
      }
    }
    if (Infinity !== g) {
      m = f.X;
      if (0 < g && ((f = Bl(b, p, f.X, e)), f.length))
        for (p = Infinity, h = 0, l = f.length; h < l; ++h)
          if (
            ((g = f[h]),
            (n = Math.atan2(b.y - g.y, d.x - g.x)),
            n < p || (n === p && g.x < m.x))
          )
            (p = n), (m = g);
      for (f = $k(c); f.X !== m; ) f = al(c);
      d = { x: b.x, y: b.y, $a: b.$a, qb: void 0 };
      h = { x: f.X.x, y: f.X.y, $a: f.X.$a, qb: void 0 };
      bl(a).ba = d;
      xl(b, f.X, a, e);
      xl(h, d, a, e);
      f.X = h;
      a.c && a.b && ((a.g = a.b), (a.a = a.b.pb));
      c.concat(a);
    }
  }
  function vl(a, b, c) {
    for (var d = !1, e = Cl(b, c); 3 < b.f; )
      if (e) {
        if (!Dl(a, b, c, e, d) && !ul(b, c, d) && !El(a, b, c, !0)) break;
      } else if (!Dl(a, b, c, e, d) && !ul(b, c, d) && !El(a, b, c))
        if ((e = Cl(b, c))) {
          var d = b,
            f = 2 * d.f,
            g = Array(f),
            h = $k(d),
            l = h,
            m = 0;
          do (g[m++] = l.ba.x), (g[m++] = l.ba.y), (l = al(d));
          while (l !== h);
          d = !wd(g, 0, f, 2);
          ul(b, c, d);
        } else {
          e = a;
          d = b;
          f = g = $k(d);
          do {
            h = zl(f, c);
            if (h.length) {
              g = h[0];
              h = Al(f.ba, f.X, g.ba, g.X);
              h = wl(e, h[0], h[1], e.a.length / 2);
              l = new Yk();
              m = new jl();
              xl(h, f.X, l, m);
              f.X = h;
              kl(
                c,
                [
                  Math.min(f.ba.x, h.x),
                  Math.min(f.ba.y, h.y),
                  Math.max(f.ba.x, h.x),
                  Math.max(f.ba.y, h.y)
                ],
                f
              );
              for (f = al(d); f !== g; )
                xl(f.ba, f.X, l, m), c.remove(f), Zk(d), (f = el(d));
              xl(g.ba, h, l, m);
              g.ba = h;
              kl(
                c,
                [
                  Math.min(g.X.x, h.x),
                  Math.min(g.X.y, h.y),
                  Math.max(g.X.x, h.x),
                  Math.max(g.X.y, h.y)
                ],
                g
              );
              ul(d, c, !1);
              vl(e, d, c);
              ul(l, m, !1);
              vl(e, l, m);
              break;
            }
            f = al(d);
          } while (f !== g);
          break;
        }
    3 === b.f &&
      ((e = a.b.length),
      (a.b[e++] = dl(b).ba.$a),
      (a.b[e++] = el(b).ba.$a),
      (a.b[e++] = bl(b).ba.$a));
  }
  function Dl(a, b, c, d, e) {
    var f = a.b.length,
      g = $k(b),
      h = dl(b),
      l = g,
      m = al(b),
      p = bl(b),
      n,
      q,
      r,
      u = !1;
    do {
      n = l.ba;
      q = l.X;
      r = m.X;
      if (!1 === q.qb) {
        var w = e ? Fl(p.X, r, q, n, h.ba) : Fl(h.ba, n, q, r, p.X);
        (!d && 0 !== zl({ ba: n, X: r }, c).length) ||
          !w ||
          0 !== Bl(n, q, r, c, !0).length ||
          (!d &&
            !1 !== n.qb &&
            !1 !== r.qb &&
            wd(
              [h.ba.x, h.ba.y, n.x, n.y, q.x, q.y, r.x, r.y, p.X.x, p.X.y],
              0,
              10,
              2
            ) !== !e) ||
          ((a.b[f++] = n.$a),
          (a.b[f++] = q.$a),
          (a.b[f++] = r.$a),
          yl(l, m, b, c),
          m === g && (g = p),
          (u = !0));
      }
      h = dl(b);
      l = el(b);
      m = al(b);
      p = bl(b);
    } while (l !== g && 3 < b.f);
    return u;
  }
  function El(a, b, c, d) {
    var e = $k(b);
    al(b);
    var f = e,
      g = al(b),
      h = !1;
    do {
      var l = Al(f.ba, f.X, g.ba, g.X, d);
      if (l) {
        var m,
          h = a.b.length,
          p = a.a.length / 2,
          n = cl(b);
        Zk(b);
        c.remove(n);
        m = n === e;
        d
          ? (l[0] === f.ba.x && l[1] === f.ba.y
              ? (cl(b), (l = f.ba), (g.ba = l), c.remove(f), (m = m || f === e))
              : ((l = g.X), (f.X = l), c.remove(g), (m = m || g === e)),
            Zk(b))
          : ((l = wl(a, l[0], l[1], p)),
            (f.X = l),
            (g.ba = l),
            kl(
              c,
              [
                Math.min(f.ba.x, f.X.x),
                Math.min(f.ba.y, f.X.y),
                Math.max(f.ba.x, f.X.x),
                Math.max(f.ba.y, f.X.y)
              ],
              f
            ),
            kl(
              c,
              [
                Math.min(g.ba.x, g.X.x),
                Math.min(g.ba.y, g.X.y),
                Math.max(g.ba.x, g.X.x),
                Math.max(g.ba.y, g.X.y)
              ],
              g
            ));
        a.b[h++] = n.ba.$a;
        a.b[h++] = n.X.$a;
        a.b[h++] = l.$a;
        h = !0;
        if (m) break;
      }
      f = dl(b);
      g = al(b);
    } while (f !== e);
    return h;
  }
  function Cl(a, b) {
    var c = $k(a),
      d = c;
    do {
      if (zl(d, b).length) return !1;
      d = al(a);
    } while (d !== c);
    return !0;
  }
  function wl(a, b, c, d) {
    var e = a.a.length;
    a.a[e++] = b;
    a.a[e++] = c;
    return { x: b, y: c, $a: d, qb: void 0 };
  }
  function xl(a, b, c, d) {
    var e = { ba: a, X: b },
      f = { pb: void 0, next: void 0, data: e },
      g = c.b;
    if (g) {
      var h = g.next;
      f.pb = g;
      f.next = h;
      g.next = f;
      h && (h.pb = f);
      g === c.a && (c.a = f);
    } else (c.g = f), (c.a = f), c.c && ((f.next = f), (f.pb = f));
    c.b = f;
    c.f++;
    d &&
      d.Da(
        [
          Math.min(a.x, b.x),
          Math.min(a.y, b.y),
          Math.max(a.x, b.x),
          Math.max(a.y, b.y)
        ],
        e
      );
    return e;
  }
  function yl(a, b, c, d) {
    el(c) === b &&
      (Zk(c),
      (a.X = b.X),
      d.remove(b),
      kl(
        d,
        [
          Math.min(a.ba.x, a.X.x),
          Math.min(a.ba.y, a.X.y),
          Math.max(a.ba.x, a.X.x),
          Math.max(a.ba.y, a.X.y)
        ],
        a
      ));
  }
  function Bl(a, b, c, d, e) {
    var f,
      g,
      h,
      l = [],
      m = ml(d, [
        Math.min(a.x, b.x, c.x),
        Math.min(a.y, b.y, c.y),
        Math.max(a.x, b.x, c.x),
        Math.max(a.y, b.y, c.y)
      ]);
    d = 0;
    for (f = m.length; d < f; ++d)
      for (g in m[d])
        (h = m[d][g]),
          "object" !== typeof h ||
            (e && !h.qb) ||
            (h.x === a.x && h.y === a.y) ||
            (h.x === b.x && h.y === b.y) ||
            (h.x === c.x && h.y === c.y) ||
            -1 !== l.indexOf(h) ||
            !qd([a.x, a.y, b.x, b.y, c.x, c.y], 0, 6, 2, h.x, h.y) ||
            l.push(h);
    return l;
  }
  function zl(a, b, c) {
    var d = a.ba,
      e = a.X;
    b = ml(b, [
      Math.min(d.x, e.x),
      Math.min(d.y, e.y),
      Math.max(d.x, e.x),
      Math.max(d.y, e.y)
    ]);
    var f = [],
      g,
      h;
    g = 0;
    for (h = b.length; g < h; ++g) {
      var l = b[g];
      a !== l &&
        (c || l.ba !== e || l.X !== d) &&
        Al(d, e, l.ba, l.X, c) &&
        f.push(l);
    }
    return f;
  }
  function Al(a, b, c, d, e) {
    var f = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);
    if (
      0 !== f &&
      ((d = ((d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)) / f),
      (c = ((b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x)) / f),
      (!e && d > Yj && d < 1 - Yj && c > Yj && c < 1 - Yj) ||
        (e && 0 <= d && 1 >= d && 0 <= c && 1 >= c))
    )
      return [a.x + d * (b.x - a.x), a.y + d * (b.y - a.y)];
  }
  function Fl(a, b, c, d, e) {
    if (void 0 === b.qb || void 0 === d.qb) return !1;
    var f = (c.x - d.x) * (b.y - d.y) > (c.y - d.y) * (b.x - d.x);
    e = (e.x - d.x) * (b.y - d.y) < (e.y - d.y) * (b.x - d.x);
    a = (a.x - b.x) * (d.y - b.y) > (a.y - b.y) * (d.x - b.x);
    c = (c.x - b.x) * (d.y - b.y) < (c.y - b.y) * (d.x - b.x);
    b = b.qb ? c || a : c && a;
    return (d.qb ? e || f : e && f) && b;
  }
  k = ql.prototype;
  k.wc = function(a, b) {
    var c = a.Ad(),
      d = a.pa(),
      e = this.b.length,
      f = this.j.b.length,
      g,
      h,
      l,
      m;
    g = 0;
    for (h = c.length; g < h; ++g) {
      var p = c[g].Zc();
      if (0 < p.length) {
        var n = p[0].ia(),
          n = Tc(n, n.length, d, -this.origin[0], -this.origin[1]),
          q = [],
          r;
        l = 1;
        for (m = p.length; l < m; ++l)
          (r = p[l].ia()),
            (r = Tc(r, r.length, d, -this.origin[0], -this.origin[1])),
            q.push(r);
        Qk(this.j, n, q, d);
        rl(this, n, q, d);
      }
    }
    this.b.length > e &&
      (this.g.push(e),
      this.i.push(b),
      this.l.s && (this.c.push(e), (this.l.s = !1)));
    this.j.b.length > f && Rk(this.j, b, f);
  };
  k.yc = function(a, b) {
    var c = a.Zc(),
      d = a.pa();
    if (0 < c.length) {
      this.g.push(this.b.length);
      this.i.push(b);
      this.l.s && (this.c.push(this.b.length), (this.l.s = !1));
      Rk(this.j, b);
      var e = c[0].ia(),
        e = Tc(e, e.length, d, -this.origin[0], -this.origin[1]),
        f = [],
        g,
        h,
        l;
      g = 1;
      for (h = c.length; g < h; ++g)
        (l = c[g].ia()),
          (l = Tc(l, l.length, d, -this.origin[0], -this.origin[1])),
          f.push(l);
      Qk(this.j, e, f, d);
      rl(this, e, f, d);
    }
  };
  k.vb = function(a) {
    this.v = new mk(this.a);
    this.o = new mk(this.b);
    this.g.push(this.b.length);
    this.j.vb(a);
    0 === this.c.length && 0 < this.u.length && (this.u = []);
    this.b = this.a = null;
  };
  k.wb = function(a) {
    var b = this.v,
      c = this.o,
      d = this.j.wb(a);
    return function() {
      pk(a, b);
      pk(a, c);
      d();
    };
  };
  k.Ke = function(a, b) {
    var c = qk(b, Uk, Wk),
      d;
    this.H ? (d = this.H) : (this.H = d = new Xk(a, c));
    b.Lc(c);
    a.enableVertexAttribArray(d.b);
    a.vertexAttribPointer(d.b, 2, 5126, !1, 8, 0);
    return d;
  };
  k.Le = function(a, b) {
    a.disableVertexAttribArray(b.b);
  };
  k.yd = function(a, b, c, d) {
    var e = a.getParameter(a.DEPTH_FUNC),
      f = a.getParameter(a.DEPTH_WRITEMASK);
    d || (a.enable(a.DEPTH_TEST), a.depthMask(!0), a.depthFunc(a.NOTEQUAL));
    if (wa(c)) {
      var g, h, l;
      h = this.g[this.g.length - 1];
      for (c = this.c.length - 1; 0 <= c; --c)
        (g = this.c[c]),
          (l = this.u[c]),
          a.uniform4fv(this.H.D, l),
          lk(a, b, g, h),
          (h = g);
    } else {
      var m, p, n, q;
      n = this.g.length - 2;
      l = h = this.g[n + 1];
      for (g = this.c.length - 1; 0 <= g; --g) {
        m = this.u[g];
        a.uniform4fv(this.H.D, m);
        for (m = this.c[g]; 0 <= n && this.g[n] >= m; )
          (q = this.g[n]),
            (p = this.i[n]),
            (p = x(p).toString()),
            c[p] &&
              (h !== l && (lk(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT)),
              (l = q)),
            n--,
            (h = q);
        h !== l && (lk(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT));
        h = l = m;
      }
    }
    d ||
      (a.disable(a.DEPTH_TEST),
      a.clear(a.DEPTH_BUFFER_BIT),
      a.depthMask(f),
      a.depthFunc(e));
  };
  k.$d = function(a, b, c, d, e) {
    var f, g, h, l, m, p, n;
    n = this.g.length - 2;
    h = this.g[n + 1];
    for (f = this.c.length - 1; 0 <= f; --f)
      for (
        g = this.u[f], a.uniform4fv(this.H.D, g), l = this.c[f];
        0 <= n && this.g[n] >= l;

      ) {
        g = this.g[n];
        m = this.i[n];
        p = x(m).toString();
        if (
          void 0 === c[p] &&
          m.V() &&
          (void 0 === e || jc(e, m.V().G())) &&
          (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
          lk(a, b, g, h),
          (h = d(m)))
        )
          return h;
        n--;
        h = g;
      }
  };
  k.Ma = function(a, b) {
    var c = a ? a.b : [0, 0, 0, 0];
    c instanceof CanvasGradient || c instanceof CanvasPattern
      ? (c = Uj)
      : (c =
          ye(c).map(function(a, b) {
            return 3 != b ? a / 255 : a;
          }) || Uj);
    (this.l.fillColor && db(c, this.l.fillColor)) ||
      ((this.l.fillColor = c), (this.l.s = !0), this.u.push(c));
    b
      ? this.j.Ma(null, b)
      : this.j.Ma(null, new wi({ color: [0, 0, 0, 0], lineWidth: 0 }));
  };
  function Gl() {}
  Gl.prototype.f = function() {};
  function Hl(a, b, c) {
    this.i = b;
    this.j = a;
    this.c = c;
    this.a = {};
  }
  v(Hl, jj);
  function Il(a, b) {
    var c = [],
      d;
    for (d in a.a) {
      var e = a.a[d],
        f;
      for (f in e) c.push(e[f].wb(b));
    }
    return function() {
      for (var a = c.length, b, d = 0; d < a; d++)
        b = c[d].apply(this, arguments);
      return b;
    };
  }
  function Jl(a, b) {
    for (var c in a.a) {
      var d = a.a[c],
        e;
      for (e in d) d[e].vb(b);
    }
  }
  Hl.prototype.b = function(a, b) {
    var c = void 0 !== a ? a.toString() : "0",
      d = this.a[c];
    void 0 === d && ((d = {}), (this.a[c] = d));
    c = d[b];
    void 0 === c && ((c = new Kl[b](this.j, this.i)), (d[b] = c));
    return c;
  };
  Hl.prototype.g = function() {
    return wa(this.a);
  };
  Hl.prototype.f = function(a, b, c, d, e, f, g, h) {
    var l = Object.keys(this.a).map(Number);
    l.sort(Ya);
    var m, p, n, q, r, u;
    m = 0;
    for (p = l.length; m < p; ++m)
      for (r = this.a[l[m].toString()], n = 0, q = Aj.length; n < q; ++n)
        (u = r[Aj[n]]), void 0 !== u && u.f(a, b, c, d, e, f, g, h, void 0, !1);
  };
  function Ll(a, b, c, d, e, f, g, h, l, m, p) {
    var n = Ml,
      q = Object.keys(a.a).map(Number);
    q.sort(function(a, b) {
      return b - a;
    });
    var r, u, w, y, z;
    r = 0;
    for (u = q.length; r < u; ++r)
      for (y = a.a[q[r].toString()], w = Aj.length - 1; 0 <= w; --w)
        if (
          ((z = y[Aj[w]]),
          void 0 !== z && (z = z.f(b, c, d, e, n, f, g, h, l, m, p)))
        )
          return z;
  }
  Hl.prototype.Ba = function(a, b, c, d, e, f, g, h, l, m) {
    var p = b.b;
    p.bindFramebuffer(p.FRAMEBUFFER, yk(b));
    var n;
    void 0 !== this.c && (n = Jb(Sb(a), d * this.c));
    return Ll(
      this,
      b,
      a,
      d,
      e,
      g,
      h,
      l,
      function(a) {
        var b = new Uint8Array(4);
        p.readPixels(0, 0, 1, 1, p.RGBA, p.UNSIGNED_BYTE, b);
        if (0 < b[3] && (a = m(a))) return a;
      },
      !0,
      n
    );
  };
  function Nl(a, b, c, d, e, f, g, h) {
    var l = c.b;
    l.bindFramebuffer(l.FRAMEBUFFER, yk(c));
    return (
      void 0 !==
      Ll(
        a,
        c,
        b,
        d,
        e,
        f,
        g,
        h,
        function() {
          var a = new Uint8Array(4);
          l.readPixels(0, 0, 1, 1, l.RGBA, l.UNSIGNED_BYTE, a);
          return 0 < a[3];
        },
        !1
      )
    );
  }
  var Ml = [1, 1],
    Kl = { Circle: ok, Image: Dk, LineString: Mk, Polygon: ql, Text: Gl };
  function Ol(a, b, c, d, e, f, g) {
    this.b = a;
    this.g = b;
    this.a = f;
    this.f = g;
    this.j = e;
    this.i = d;
    this.c = c;
    this.l = this.o = this.v = null;
  }
  v(Ol, Ii);
  k = Ol.prototype;
  k.Gd = function(a) {
    this.Ma(a.f, a.g);
    this.dc(a.a);
  };
  k.tc = function(a) {
    switch (a.Y()) {
      case "Point":
        this.xc(a, null);
        break;
      case "LineString":
        this.Pb(a, null);
        break;
      case "Polygon":
        this.yc(a, null);
        break;
      case "MultiPoint":
        this.vc(a, null);
        break;
      case "MultiLineString":
        this.uc(a, null);
        break;
      case "MultiPolygon":
        this.wc(a, null);
        break;
      case "GeometryCollection":
        this.kf(a, null);
        break;
      case "Circle":
        this.hc(a, null);
    }
  };
  k.jf = function(a, b) {
    var c = (0, b.c)(a);
    c && jc(this.a, c.G()) && (this.Gd(b), this.tc(c));
  };
  k.kf = function(a) {
    a = a.f;
    var b, c;
    b = 0;
    for (c = a.length; b < c; ++b) this.tc(a[b]);
  };
  k.xc = function(a, b) {
    var c = this.b,
      d = new Hl(1, this.a).b(0, "Image");
    d.dc(this.v);
    d.xc(a, b);
    d.vb(c);
    d.f(this.b, this.g, this.c, this.i, this.j, this.f, 1, {}, void 0, !1);
    d.wb(c)();
  };
  k.vc = function(a, b) {
    var c = this.b,
      d = new Hl(1, this.a).b(0, "Image");
    d.dc(this.v);
    d.vc(a, b);
    d.vb(c);
    d.f(this.b, this.g, this.c, this.i, this.j, this.f, 1, {}, void 0, !1);
    d.wb(c)();
  };
  k.Pb = function(a, b) {
    var c = this.b,
      d = new Hl(1, this.a).b(0, "LineString");
    d.Ma(null, this.l);
    d.Pb(a, b);
    d.vb(c);
    d.f(this.b, this.g, this.c, this.i, this.j, this.f, 1, {}, void 0, !1);
    d.wb(c)();
  };
  k.uc = function(a, b) {
    var c = this.b,
      d = new Hl(1, this.a).b(0, "LineString");
    d.Ma(null, this.l);
    d.uc(a, b);
    d.vb(c);
    d.f(this.b, this.g, this.c, this.i, this.j, this.f, 1, {}, void 0, !1);
    d.wb(c)();
  };
  k.yc = function(a, b) {
    var c = this.b,
      d = new Hl(1, this.a).b(0, "Polygon");
    d.Ma(this.o, this.l);
    d.yc(a, b);
    d.vb(c);
    d.f(this.b, this.g, this.c, this.i, this.j, this.f, 1, {}, void 0, !1);
    d.wb(c)();
  };
  k.wc = function(a, b) {
    var c = this.b,
      d = new Hl(1, this.a).b(0, "Polygon");
    d.Ma(this.o, this.l);
    d.wc(a, b);
    d.vb(c);
    d.f(this.b, this.g, this.c, this.i, this.j, this.f, 1, {}, void 0, !1);
    d.wb(c)();
  };
  k.hc = function(a, b) {
    var c = this.b,
      d = new Hl(1, this.a).b(0, "Circle");
    d.Ma(this.o, this.l);
    d.hc(a, b);
    d.vb(c);
    d.f(this.b, this.g, this.c, this.i, this.j, this.f, 1, {}, void 0, !1);
    d.wb(c)();
  };
  k.dc = function(a) {
    this.v = a;
  };
  k.Ma = function(a, b) {
    this.o = a;
    this.l = b;
  };
  function Pl() {
    this.b =
      "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}";
  }
  v(Pl, ak);
  var Ql = new Pl();
  function Rl() {
    this.b =
      "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}";
  }
  v(Rl, bk);
  var Sl = new Rl();
  function Tl(a, b) {
    this.g = a.getUniformLocation(b, "f");
    this.f = a.getUniformLocation(b, "e");
    this.i = a.getUniformLocation(b, "d");
    this.c = a.getUniformLocation(b, "g");
    this.b = a.getAttribLocation(b, "b");
    this.a = a.getAttribLocation(b, "c");
  }
  function Ul(a, b) {
    Ui.call(this, b);
    this.f = a;
    this.U = new mk([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);
    this.i = this.yb = null;
    this.j = void 0;
    this.v = Ph();
    this.u = Ph();
    this.C = hk();
    this.H = null;
  }
  v(Ul, Ui);
  function Vl(a, b, c) {
    var d = a.f.g;
    if (void 0 === a.j || a.j != c) {
      b.postRenderFunctions.push(
        function(a, b, c) {
          a.isContextLost() || (a.deleteFramebuffer(b), a.deleteTexture(c));
        }.bind(null, d, a.i, a.yb)
      );
      b = zk(d, c, c);
      var e = d.createFramebuffer();
      d.bindFramebuffer(36160, e);
      d.framebufferTexture2D(36160, 36064, 3553, b, 0);
      a.yb = b;
      a.i = e;
      a.j = c;
    } else d.bindFramebuffer(36160, a.i);
  }
  Ul.prototype.Dh = function(a, b, c) {
    Wl(this, "precompose", c, a);
    kk(c, 34962, this.U);
    var d = c.b,
      e = qk(c, Ql, Sl),
      f;
    this.H ? (f = this.H) : (this.H = f = new Tl(d, e));
    c.Lc(e) &&
      (d.enableVertexAttribArray(f.b),
      d.vertexAttribPointer(f.b, 2, 5126, !1, 16, 0),
      d.enableVertexAttribArray(f.a),
      d.vertexAttribPointer(f.a, 2, 5126, !1, 16, 8),
      d.uniform1i(f.c, 0));
    d.uniformMatrix4fv(f.i, !1, ik(this.C, this.v));
    d.uniformMatrix4fv(f.f, !1, ik(this.C, this.u));
    d.uniform1f(f.g, b.opacity);
    d.bindTexture(3553, this.yb);
    d.drawArrays(5, 0, 4);
    Wl(this, "postcompose", c, a);
  };
  function Wl(a, b, c, d) {
    a = a.a;
    if (Oa(a, b)) {
      var e = d.viewState;
      a.b(
        new Jh(
          b,
          new Ol(
            c,
            e.center,
            e.resolution,
            e.rotation,
            d.size,
            d.extent,
            d.pixelRatio
          ),
          d,
          null,
          c
        )
      );
    }
  }
  Ul.prototype.If = function() {
    this.i = this.yb = null;
    this.j = void 0;
  };
  function Xl(a, b, c, d, e, f) {
    this.c = void 0 !== f ? f : null;
    hi.call(this, a, b, c, void 0 !== f ? ji : li, d);
    this.g = e;
  }
  v(Xl, hi);
  Xl.prototype.i = function(a) {
    this.state = a ? ki : li;
    this.s();
  };
  Xl.prototype.load = function() {
    this.state == ji &&
      ((this.state = mi), this.s(), this.c(this.i.bind(this)));
  };
  Xl.prototype.a = function() {
    return this.g;
  };
  var Yl,
    Zl = -1 < navigator.userAgent.indexOf("OPR"),
    $l = -1 < navigator.userAgent.indexOf("Edge");
  Yl = !(
    !navigator.userAgent.match("CriOS") &&
    "chrome" in window &&
    "Google Inc." === navigator.vendor &&
    0 == Zl &&
    0 == $l
  );
  function am(a, b, c, d) {
    var e = Pc(c, b, a);
    c = xc(b, d, c);
    b = b.ic();
    void 0 !== b && (c *= b);
    b = a.ic();
    void 0 !== b && (c /= b);
    a = xc(a, c, e) / c;
    isFinite(a) && 0 < a && (c /= a);
    return c;
  }
  function bm(a, b, c, d) {
    a = c - a;
    b = d - b;
    var e = Math.sqrt(a * a + b * b);
    return [Math.round(c + a / e), Math.round(d + b / e)];
  }
  function cm(a, b, c, d, e, f, g, h, l, m, p) {
    var n = De(Math.round(c * a), Math.round(c * b));
    if (0 === l.length) return n.canvas;
    n.scale(c, c);
    var q = Hb();
    l.forEach(function(a) {
      Wb(q, a.extent);
    });
    var r = De(Math.round((c * dc(q)) / d), Math.round((c * ec(q)) / d)),
      u = c / d;
    l.forEach(function(a) {
      r.drawImage(
        a.image,
        m,
        m,
        a.image.width - 2 * m,
        a.image.height - 2 * m,
        (a.extent[0] - q[0]) * u,
        -(a.extent[3] - q[3]) * u,
        dc(a.extent) * u,
        ec(a.extent) * u
      );
    });
    var w = ac(g);
    h.f.forEach(function(a) {
      var b = a.source,
        e = a.target,
        g = b[1][0],
        h = b[1][1],
        l = b[2][0],
        m = b[2][1];
      a = (e[0][0] - w[0]) / f;
      var p = -(e[0][1] - w[1]) / f,
        u = (e[1][0] - w[0]) / f,
        kb = -(e[1][1] - w[1]) / f,
        W = (e[2][0] - w[0]) / f,
        Ra = -(e[2][1] - w[1]) / f,
        e = b[0][0],
        b = b[0][1],
        g = g - e,
        h = h - b,
        l = l - e,
        m = m - b;
      a: {
        g = [
          [g, h, 0, 0, u - a],
          [l, m, 0, 0, W - a],
          [0, 0, g, h, kb - p],
          [0, 0, l, m, Ra - p]
        ];
        h = g.length;
        for (l = 0; l < h; l++) {
          for (var m = l, Pb = Math.abs(g[l][l]), fc = l + 1; fc < h; fc++) {
            var Wc = Math.abs(g[fc][l]);
            Wc > Pb && ((Pb = Wc), (m = fc));
          }
          if (0 === Pb) {
            g = null;
            break a;
          }
          Pb = g[m];
          g[m] = g[l];
          g[l] = Pb;
          for (m = l + 1; m < h; m++)
            for (Pb = -g[m][l] / g[l][l], fc = l; fc < h + 1; fc++)
              g[m][fc] = l == fc ? 0 : g[m][fc] + Pb * g[l][fc];
        }
        l = Array(h);
        for (m = h - 1; 0 <= m; m--)
          for (l[m] = g[m][h] / g[m][m], Pb = m - 1; 0 <= Pb; Pb--)
            g[Pb][h] -= g[Pb][m] * l[m];
        g = l;
      }
      g &&
        (n.save(),
        n.beginPath(),
        Yl
          ? ((l = (a + u + W) / 3),
            (m = (p + kb + Ra) / 3),
            (h = bm(l, m, a, p)),
            (u = bm(l, m, u, kb)),
            (W = bm(l, m, W, Ra)),
            n.moveTo(u[0], u[1]),
            n.lineTo(h[0], h[1]),
            n.lineTo(W[0], W[1]))
          : (n.moveTo(u, kb), n.lineTo(a, p), n.lineTo(W, Ra)),
        n.clip(),
        n.transform(g[0], g[2], g[1], g[3], a, p),
        n.translate(q[0] - e, q[3] - b),
        n.scale(d / c, -d / c),
        n.drawImage(r.canvas, 0, 0),
        n.restore());
    });
    p &&
      (n.save(),
      (n.strokeStyle = "black"),
      (n.lineWidth = 1),
      h.f.forEach(function(a) {
        var b = a.target;
        a = (b[0][0] - w[0]) / f;
        var c = -(b[0][1] - w[1]) / f,
          d = (b[1][0] - w[0]) / f,
          e = -(b[1][1] - w[1]) / f,
          g = (b[2][0] - w[0]) / f,
          b = -(b[2][1] - w[1]) / f;
        n.beginPath();
        n.moveTo(d, e);
        n.lineTo(a, c);
        n.lineTo(g, b);
        n.closePath();
        n.stroke();
      }),
      n.restore());
    return n.canvas;
  }
  function dm(a, b, c, d, e) {
    this.g = a;
    this.c = b;
    var f = {},
      g = Nc(this.c, this.g);
    this.a = function(a) {
      var b = a[0] + "/" + a[1];
      f[b] || (f[b] = g(a));
      return f[b];
    };
    this.i = d;
    this.v = e * e;
    this.f = [];
    this.l = !1;
    this.o = this.g.a && !!d && !!this.g.G() && dc(d) == dc(this.g.G());
    this.b = this.g.G() ? dc(this.g.G()) : null;
    this.j = this.c.G() ? dc(this.c.G()) : null;
    a = ac(c);
    b = $b(c);
    d = Zb(c);
    c = Yb(c);
    e = this.a(a);
    var h = this.a(b),
      l = this.a(d),
      m = this.a(c);
    em(this, a, b, d, c, e, h, l, m, 10);
    if (this.l) {
      var p = Infinity;
      this.f.forEach(function(a) {
        p = Math.min(p, a.source[0][0], a.source[1][0], a.source[2][0]);
      });
      this.f.forEach(function(a) {
        if (
          Math.max(a.source[0][0], a.source[1][0], a.source[2][0]) - p >
          this.b / 2
        ) {
          var b = [
            [a.source[0][0], a.source[0][1]],
            [a.source[1][0], a.source[1][1]],
            [a.source[2][0], a.source[2][1]]
          ];
          b[0][0] - p > this.b / 2 && (b[0][0] -= this.b);
          b[1][0] - p > this.b / 2 && (b[1][0] -= this.b);
          b[2][0] - p > this.b / 2 && (b[2][0] -= this.b);
          Math.max(b[0][0], b[1][0], b[2][0]) -
            Math.min(b[0][0], b[1][0], b[2][0]) <
            this.b / 2 && (a.source = b);
        }
      }, this);
    }
    f = {};
  }
  function em(a, b, c, d, e, f, g, h, l, m) {
    var p = Gb([f, g, h, l]),
      n = a.b ? dc(p) / a.b : null,
      q = a.b,
      r = a.g.a && 0.5 < n && 1 > n,
      u = !1;
    if (0 < m) {
      if (a.c.g && a.j)
        var w = Gb([b, c, d, e]),
          u = u | (0.25 < dc(w) / a.j);
      !r && a.g.g && n && (u |= 0.25 < n);
    }
    if (u || !a.i || jc(p, a.i)) {
      if (
        !(
          u ||
          (isFinite(f[0]) &&
            isFinite(f[1]) &&
            isFinite(g[0]) &&
            isFinite(g[1]) &&
            isFinite(h[0]) &&
            isFinite(h[1]) &&
            isFinite(l[0]) &&
            isFinite(l[1]))
        )
      )
        if (0 < m) u = !0;
        else return;
      if (
        0 < m &&
        (u ||
          ((p = a.a([(b[0] + d[0]) / 2, (b[1] + d[1]) / 2])),
          (q = r
            ? (oa(f[0], q) + oa(h[0], q)) / 2 - oa(p[0], q)
            : (f[0] + h[0]) / 2 - p[0]),
          (p = (f[1] + h[1]) / 2 - p[1]),
          (u = q * q + p * p > a.v)),
        u)
      ) {
        Math.abs(b[0] - d[0]) <= Math.abs(b[1] - d[1])
          ? ((r = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2]),
            (q = a.a(r)),
            (p = [(e[0] + b[0]) / 2, (e[1] + b[1]) / 2]),
            (n = a.a(p)),
            em(a, b, c, r, p, f, g, q, n, m - 1),
            em(a, p, r, d, e, n, q, h, l, m - 1))
          : ((r = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2]),
            (q = a.a(r)),
            (p = [(d[0] + e[0]) / 2, (d[1] + e[1]) / 2]),
            (n = a.a(p)),
            em(a, b, r, p, e, f, q, n, l, m - 1),
            em(a, r, c, d, p, q, g, h, n, m - 1));
        return;
      }
      if (r) {
        if (!a.o) return;
        a.l = !0;
      }
      a.f.push({ source: [f, h, l], target: [b, d, e] });
      a.f.push({ source: [f, g, h], target: [b, c, d] });
    }
  }
  function fm(a) {
    var b = Hb();
    a.f.forEach(function(a) {
      a = a.source;
      Ib(b, a[0]);
      Ib(b, a[1]);
      Ib(b, a[2]);
    });
    return b;
  }
  function gm(a, b, c, d, e, f) {
    this.H = b;
    this.v = a.G();
    var g = b.G(),
      h = g ? ic(c, g) : c,
      g = am(a, b, gc(h), d);
    this.l = new dm(a, b, h, this.v, 0.5 * g);
    this.c = d;
    this.g = c;
    a = fm(this.l);
    this.o = (this.xb = f(a, g, e)) ? this.xb.f : 1;
    this.Md = this.i = null;
    e = li;
    f = [];
    this.xb && ((e = ji), (f = this.xb.j));
    hi.call(this, c, d, this.o, e, f);
  }
  v(gm, hi);
  gm.prototype.oa = function() {
    this.state == mi && (ya(this.Md), (this.Md = null));
    hi.prototype.oa.call(this);
  };
  gm.prototype.a = function() {
    return this.i;
  };
  gm.prototype.Ld = function() {
    var a = this.xb.W();
    a == li &&
      (this.i = cm(
        dc(this.g) / this.c,
        ec(this.g) / this.c,
        this.o,
        this.xb.resolution,
        0,
        this.c,
        this.g,
        this.l,
        [{ extent: this.xb.G(), image: this.xb.a() }],
        0
      ));
    this.state = a;
    this.s();
  };
  gm.prototype.load = function() {
    if (this.state == ji) {
      this.state = mi;
      this.s();
      var a = this.xb.W();
      a == li || a == ki
        ? this.Ld()
        : ((this.Md = B(
            this.xb,
            "change",
            function() {
              var a = this.xb.W();
              if (a == li || a == ki) ya(this.Md), (this.Md = null), this.Ld();
            },
            this
          )),
          this.xb.load());
    }
  };
  function hm(a) {
    Sa.call(this);
    this.f = zc(a.projection);
    this.j = im(a.attributions);
    this.L = a.logo;
    this.Fa = void 0 !== a.state ? a.state : "ready";
    this.D = void 0 !== a.wrapX ? a.wrapX : !1;
  }
  v(hm, Sa);
  function im(a) {
    if ("string" === typeof a) return [new pe({ html: a })];
    if (a instanceof pe) return [a];
    if (Array.isArray(a)) {
      for (var b = a.length, c = Array(b), d = 0; d < b; d++) {
        var e = a[d];
        c[d] = "string" === typeof e ? new pe({ html: e }) : e;
      }
      return c;
    }
    return null;
  }
  k = hm.prototype;
  k.Ba = ea;
  k.za = function() {
    return this.j;
  };
  k.ya = function() {
    return this.L;
  };
  k.Aa = function() {
    return this.f;
  };
  k.W = function() {
    return this.Fa;
  };
  k.wa = function() {
    this.s();
  };
  k.ua = function(a) {
    this.j = im(a);
    this.s();
  };
  function jm(a, b) {
    a.Fa = b;
    a.s();
  }
  function km(a) {
    hm.call(this, {
      attributions: a.attributions,
      extent: a.extent,
      logo: a.logo,
      projection: a.projection,
      state: a.state
    });
    this.A = void 0 !== a.resolutions ? a.resolutions : null;
    this.a = null;
    this.sa = 0;
  }
  v(km, hm);
  function lm(a, b) {
    a.A && (b = a.A[$a(a.A, b, 0)]);
    return b;
  }
  km.prototype.U = function(a, b, c, d) {
    var e = this.f;
    if (e && d && !Mc(e, d)) {
      if (this.a) {
        if (
          this.sa == this.g &&
          Mc(this.a.H, d) &&
          this.a.resolution == b &&
          this.a.f == c &&
          Vb(this.a.G(), a)
        )
          return this.a;
        Ha(this.a);
        this.a = null;
      }
      this.a = new gm(
        e,
        d,
        a,
        b,
        c,
        function(a, b, c) {
          return this.Xc(a, b, c, e);
        }.bind(this)
      );
      this.sa = this.g;
      return this.a;
    }
    e && (d = e);
    return this.Xc(a, b, c, d);
  };
  km.prototype.o = function(a) {
    a = a.target;
    switch (a.W()) {
      case mi:
        this.b(new mm(nm, a));
        break;
      case li:
        this.b(new mm(om, a));
        break;
      case ki:
        this.b(new mm(pm, a));
    }
  };
  function qm(a, b) {
    a.a().src = b;
  }
  function mm(a, b) {
    Ia.call(this, a);
    this.image = b;
  }
  v(mm, Ia);
  var nm = "imageloadstart",
    om = "imageloadend",
    pm = "imageloaderror";
  function rm(a) {
    km.call(this, {
      attributions: a.attributions,
      logo: a.logo,
      projection: a.projection,
      resolutions: a.resolutions,
      state: a.state
    });
    this.fa = a.canvasFunction;
    this.P = null;
    this.Z = 0;
    this.na = void 0 !== a.ratio ? a.ratio : 1.5;
  }
  v(rm, km);
  rm.prototype.Xc = function(a, b, c, d) {
    b = lm(this, b);
    var e = this.P;
    if (e && this.Z == this.g && e.resolution == b && e.f == c && Ob(e.G(), a))
      return e;
    a = a.slice();
    kc(a, this.na);
    (d = this.fa(a, b, c, [(dc(a) / b) * c, (ec(a) / b) * c], d)) &&
      (e = new Xl(a, b, c, this.j, d));
    this.P = e;
    this.Z = this.g;
    return e;
  };
  function sm(a) {
    this.c = a.source;
    this.Ja = Ph();
    this.i = De();
    this.l = [0, 0];
    this.xa = void 0 == a.renderBuffer ? 100 : a.renderBuffer;
    this.u = null;
    rm.call(this, {
      attributions: a.attributions,
      canvasFunction: this.Jj.bind(this),
      logo: a.logo,
      projection: a.projection,
      ratio: a.ratio,
      resolutions: a.resolutions,
      state: this.c.W()
    });
    this.C = null;
    this.v = void 0;
    this.Fh(a.style);
    B(this.c, "change", this.kn, this);
  }
  v(sm, rm);
  k = sm.prototype;
  k.Jj = function(a, b, c, d, e) {
    var f = new Bj((0.5 * b) / c, a, b, this.c.xa, this.xa);
    this.c.Ed(a, b, e);
    var g = !1;
    this.c.Qb(
      a,
      function(a) {
        var d;
        if (!(d = g)) {
          var e;
          (d = a.Gc()) ? (e = d.call(a, b)) : this.v && (e = this.v(a, b));
          if (e) {
            var p,
              n = !1;
            Array.isArray(e) || (e = [e]);
            d = 0;
            for (p = e.length; d < p; ++d)
              n = Lj(f, a, e[d], Kj(b, c), this.jn, this) || n;
            d = n;
          } else d = !1;
        }
        g = d;
      },
      this
    );
    Fj(f);
    if (g) return null;
    this.l[0] != d[0] || this.l[1] != d[1]
      ? ((this.i.canvas.width = d[0]),
        (this.i.canvas.height = d[1]),
        (this.l[0] = d[0]),
        (this.l[1] = d[1]))
      : this.i.clearRect(0, 0, d[0], d[1]);
    a = tm(this, gc(a), b, c, d);
    f.f(this.i, c, a, 0, {});
    this.u = f;
    return this.i.canvas;
  };
  k.Ba = function(a, b, c, d, e, f) {
    if (this.u) {
      var g = {};
      return this.u.Ba(a, b, 0, d, e, function(a) {
        var b = x(a).toString();
        if (!(b in g)) return (g[b] = !0), f(a);
      });
    }
  };
  k.fn = function() {
    return this.c;
  };
  k.gn = function() {
    return this.C;
  };
  k.hn = function() {
    return this.v;
  };
  function tm(a, b, c, d, e) {
    c = d / c;
    return Yh(a.Ja, e[0] / 2, e[1] / 2, c, -c, 0, -b[0], -b[1]);
  }
  k.jn = function() {
    this.s();
  };
  k.kn = function() {
    jm(this, this.c.W());
  };
  k.Fh = function(a) {
    this.C = void 0 !== a ? a : Bi;
    this.v = a ? zi(this.C) : void 0;
    this.s();
  };
  function um(a, b) {
    Ul.call(this, a, b);
    this.o = this.l = this.c = null;
  }
  v(um, Ul);
  function vm(a, b) {
    var c = b.a();
    return Ck(a.f.g, c);
  }
  um.prototype.Ba = function(a, b, c, d, e) {
    var f = this.a;
    return f
      .la()
      .Ba(
        a,
        b.viewState.resolution,
        b.viewState.rotation,
        c,
        b.skippedFeatureUids,
        function(a) {
          return d.call(e, a, f);
        }
      );
  };
  um.prototype.Jf = function(a, b) {
    var c = this.f.g,
      d = a.pixelRatio,
      e = a.viewState,
      f = e.center,
      g = e.resolution,
      h = e.rotation,
      l = this.c,
      m = this.yb,
      p = this.a.la(),
      n = a.viewHints,
      q = a.extent;
    void 0 !== b.extent && (q = ic(q, b.extent));
    n[Kd] ||
      n[1] ||
      cc(q) ||
      ((e = p.U(q, g, d, e.projection)) &&
        Xi(this, e) &&
        ((l = e),
        (m = vm(this, e)),
        this.yb &&
          a.postRenderFunctions.push(
            function(a, b) {
              a.isContextLost() || a.deleteTexture(b);
            }.bind(null, c, this.yb)
          )));
    l &&
      ((c = this.f.c.j),
      wm(this, c.width, c.height, d, f, g, h, l.G()),
      (this.o = null),
      (d = this.v),
      Qh(d),
      Wh(d, 1, -1),
      Xh(d, 0, -1),
      (this.c = l),
      (this.yb = m),
      Zi(a.attributions, l.j),
      $i(a, p));
    return !!l;
  };
  function wm(a, b, c, d, e, f, g, h) {
    b *= f;
    c *= f;
    a = a.u;
    Qh(a);
    Wh(a, (2 * d) / b, (2 * d) / c);
    Vh(a, -g);
    Xh(a, h[0] - e[0], h[1] - e[1]);
    Wh(a, (h[2] - h[0]) / 2, (h[3] - h[1]) / 2);
    Xh(a, 1, 1);
  }
  um.prototype.te = function(a, b) {
    return void 0 !== this.Ba(a, b, 0, mc, this);
  };
  um.prototype.Hf = function(a, b, c, d) {
    if (this.c && this.c.a())
      if (this.a.la() instanceof sm) {
        var e = Uh(b.pixelToCoordinateTransform, a.slice());
        if (this.Ba(e, b, 0, mc, this)) return c.call(d, this.a, null);
      } else {
        e = [this.c.a().width, this.c.a().height];
        if (!this.o) {
          var f = b.size;
          b = Ph();
          Xh(b, -1, -1);
          Wh(b, 2 / f[0], 2 / f[1]);
          Xh(b, 0, f[1]);
          Wh(b, 1, -1);
          var f = Zh(this.u.slice()),
            g = Ph();
          Xh(g, 0, e[1]);
          Wh(g, 1, -1);
          Wh(g, e[0] / 2, e[1] / 2);
          Xh(g, 1, 1);
          Sh(g, f);
          Sh(g, b);
          this.o = g;
        }
        a = Uh(this.o, a.slice());
        if (
          !(0 > a[0] || a[0] > e[0] || 0 > a[1] || a[1] > e[1]) &&
          (this.l || (this.l = De(1, 1)),
          this.l.clearRect(0, 0, 1, 1),
          this.l.drawImage(this.c.a(), a[0], a[1], 1, 1, 0, 0, 1, 1),
          (e = this.l.getImageData(0, 0, 1, 1).data),
          0 < e[3])
        )
          return c.call(d, this.a, e);
      }
  };
  function xm() {
    this.b =
      "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}";
  }
  v(xm, ak);
  var ym = new xm();
  function zm() {
    this.b =
      "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}";
  }
  v(zm, bk);
  var Am = new zm();
  function Bm(a, b) {
    this.g = a.getUniformLocation(b, "e");
    this.f = a.getUniformLocation(b, "d");
    this.b = a.getAttribLocation(b, "b");
    this.a = a.getAttribLocation(b, "c");
  }
  function Cm(a, b) {
    Ul.call(this, a, b);
    this.L = ym;
    this.Z = Am;
    this.c = null;
    this.D = new mk([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]);
    this.A = this.l = null;
    this.o = -1;
    this.P = [0, 0];
  }
  v(Cm, Ul);
  k = Cm.prototype;
  k.oa = function() {
    pk(this.f.c, this.D);
    Ul.prototype.oa.call(this);
  };
  k.hf = function(a, b, c) {
    var d = this.f;
    return function(e, f) {
      return Vi(a, b, e, f, function(a) {
        var b = d.a.b.hasOwnProperty(a.bb());
        b && (c[e] || (c[e] = {}), (c[e][a.Ca.toString()] = a));
        return b;
      });
    };
  };
  k.If = function() {
    Ul.prototype.If.call(this);
    this.c = null;
  };
  k.Jf = function(a, b, c) {
    var d = this.f,
      e = c.b,
      f = a.viewState,
      g = f.projection,
      h = this.a,
      l = h.la(),
      m = l.Db(g),
      p = m.Ec(f.resolution),
      n = m.Ha(p),
      q = l.Dd(p, a.pixelRatio, g),
      r = q[0] / Zd(m.Za(p), this.P)[0],
      u = n / r,
      w = l.jb(r) * l.qf(g),
      y = f.center,
      z = a.extent,
      A = ie(m, z, n);
    if (this.l && Vd(this.l, A) && this.o == l.g) u = this.A;
    else {
      var O = [A.ca - A.ea + 1, A.ja - A.ga + 1],
        Ja = ka(Math.max(O[0] * q[0], O[1] * q[1])),
        O = u * Ja,
        ca = m.Kc(p),
        Ma = ca[0] + A.ea * q[0] * u,
        u = ca[1] + A.ga * q[1] * u,
        u = [Ma, u, Ma + O, u + O];
      Vl(this, a, Ja);
      e.viewport(0, 0, Ja, Ja);
      e.clearColor(0, 0, 0, 0);
      e.clear(16384);
      e.disable(3042);
      Ja = qk(c, this.L, this.Z);
      c.Lc(Ja);
      this.c || (this.c = new Bm(e, Ja));
      kk(c, 34962, this.D);
      e.enableVertexAttribArray(this.c.b);
      e.vertexAttribPointer(this.c.b, 2, 5126, !1, 16, 0);
      e.enableVertexAttribArray(this.c.a);
      e.vertexAttribPointer(this.c.a, 2, 5126, !1, 16, 8);
      e.uniform1i(this.c.g, 0);
      c = {};
      c[p] = {};
      var D = this.hf(l, g, c),
        La = h.c(),
        Ja = !0,
        Ma = Hb(),
        kb = new Td(0, 0, 0, 0),
        W,
        Ra,
        Pb;
      for (Ra = A.ea; Ra <= A.ca; ++Ra)
        for (Pb = A.ga; Pb <= A.ja; ++Pb) {
          ca = l.Dc(p, Ra, Pb, r, g);
          if (void 0 !== b.extent && ((W = m.Na(ca.Ca, Ma)), !jc(W, b.extent)))
            continue;
          W = ca.W();
          (W = W == cg || 4 == W || (3 == W && !La)) || (ca = bg(ca));
          W = ca.W();
          if (W == cg) {
            if (d.a.b.hasOwnProperty(ca.bb())) {
              c[p][ca.Ca.toString()] = ca;
              continue;
            }
          } else if (4 == W || (3 == W && !La)) continue;
          Ja = !1;
          W = ge(m, ca.Ca, D, kb, Ma);
          W || ((ca = he(m, ca.Ca, kb, Ma)) && D(p + 1, ca));
        }
      b = Object.keys(c).map(Number);
      b.sort(Ya);
      for (
        var D = new Float32Array(4), fc, La = 0, kb = b.length;
        La < kb;
        ++La
      )
        for (fc in ((Ra = c[b[La]]), Ra))
          (ca = Ra[fc]),
            (W = m.Na(ca.Ca, Ma)),
            (D[0] = (2 * (W[2] - W[0])) / O),
            (D[1] = (2 * (W[3] - W[1])) / O),
            (D[2] = (2 * (W[0] - u[0])) / O - 1),
            (D[3] = (2 * (W[1] - u[1])) / O - 1),
            e.uniform4fv(this.c.f, D),
            Dm(d, ca, q, w * r),
            e.drawArrays(5, 0, 4);
      Ja
        ? ((this.l = A), (this.A = u), (this.o = l.g))
        : ((this.A = this.l = null), (this.o = -1), (a.animate = !0));
    }
    aj(a.usedTiles, l, p, A);
    var Wc = d.j;
    bj(
      a,
      l,
      m,
      r,
      g,
      z,
      p,
      h.f(),
      function(a) {
        a.W() != cg ||
          d.a.b.hasOwnProperty(a.bb()) ||
          a.bb() in Wc.a ||
          Wc.c([a, ke(m, a.Ca), m.Ha(a.Ca[0]), q, w * r]);
      },
      this
    );
    Yi(a, l);
    $i(a, l);
    e = this.v;
    Qh(e);
    Xh(
      e,
      (Math.round(y[0] / n) * n - u[0]) / (u[2] - u[0]),
      (Math.round(y[1] / n) * n - u[1]) / (u[3] - u[1])
    );
    0 !== f.rotation && Vh(e, f.rotation);
    Wh(
      e,
      (a.size[0] * f.resolution) / (u[2] - u[0]),
      (a.size[1] * f.resolution) / (u[3] - u[1])
    );
    Xh(e, -0.5, -0.5);
    return !0;
  };
  k.Hf = function(a, b, c, d) {
    if (this.i) {
      a = Uh(
        this.v,
        [a[0] / b.size[0], (b.size[1] - a[1]) / b.size[1]].slice()
      );
      a = [a[0] * this.j, a[1] * this.j];
      b = this.f.c.b;
      b.bindFramebuffer(b.FRAMEBUFFER, this.i);
      var e = new Uint8Array(4);
      b.readPixels(a[0], a[1], 1, 1, b.RGBA, b.UNSIGNED_BYTE, e);
      if (0 < e[3]) return c.call(d, this.a, e);
    }
  };
  function Em(a, b) {
    Ul.call(this, a, b);
    this.o = !1;
    this.P = -1;
    this.L = NaN;
    this.A = Hb();
    this.l = this.c = this.D = null;
  }
  v(Em, Ul);
  k = Em.prototype;
  k.Dh = function(a, b, c) {
    this.l = b;
    var d = a.viewState,
      e = this.c,
      f = a.size,
      g = a.pixelRatio,
      h = this.f.g;
    e &&
      !e.g() &&
      (h.enable(h.SCISSOR_TEST),
      h.scissor(0, 0, f[0] * g, f[1] * g),
      e.f(
        c,
        d.center,
        d.resolution,
        d.rotation,
        f,
        g,
        b.opacity,
        b.me ? a.skippedFeatureUids : {}
      ),
      h.disable(h.SCISSOR_TEST));
  };
  k.oa = function() {
    var a = this.c;
    a && (Il(a, this.f.c)(), (this.c = null));
    Ul.prototype.oa.call(this);
  };
  k.Ba = function(a, b, c, d, e) {
    if (this.c && this.l) {
      c = b.viewState;
      var f = this.a,
        g = {};
      return this.c.Ba(
        a,
        this.f.c,
        c.center,
        c.resolution,
        c.rotation,
        b.size,
        b.pixelRatio,
        this.l.opacity,
        {},
        function(a) {
          var b = x(a).toString();
          if (!(b in g)) return (g[b] = !0), d.call(e, a, f);
        }
      );
    }
  };
  k.te = function(a, b) {
    if (this.c && this.l) {
      var c = b.viewState;
      return Nl(
        this.c,
        a,
        this.f.c,
        c.resolution,
        c.rotation,
        b.pixelRatio,
        this.l.opacity,
        b.skippedFeatureUids
      );
    }
    return !1;
  };
  k.Hf = function(a, b, c, d) {
    a = Uh(b.pixelToCoordinateTransform, a.slice());
    if (this.te(a, b)) return c.call(d, this.a, null);
  };
  k.Eh = function() {
    Wi(this);
  };
  k.Jf = function(a, b, c) {
    function d(a) {
      var b,
        c = a.Gc();
      c ? (b = c.call(a, m)) : (c = e.j) && (b = c(a, m));
      if (b) {
        if (b) {
          c = !1;
          if (Array.isArray(b))
            for (var d = b.length - 1; 0 <= d; --d)
              c = Lj(q, a, b[d], Kj(m, p), this.Eh, this) || c;
          else c = Lj(q, a, b, Kj(m, p), this.Eh, this) || c;
          a = c;
        } else a = !1;
        this.o = this.o || a;
      }
    }
    var e = this.a;
    b = e.la();
    Zi(a.attributions, b.j);
    $i(a, b);
    var f = a.viewHints[Kd],
      g = a.viewHints[1],
      h = e.Z,
      l = e.fa;
    if ((!this.o && !h && f) || (!l && g)) return !0;
    var g = a.extent,
      h = a.viewState,
      f = h.projection,
      m = h.resolution,
      p = a.pixelRatio,
      h = e.g,
      n = e.i,
      l = e.get("renderOrder");
    void 0 === l && (l = Jj);
    g = Jb(g, n * m);
    if (!this.o && this.L == m && this.P == h && this.D == l && Ob(this.A, g))
      return !0;
    this.c && a.postRenderFunctions.push(Il(this.c, c));
    this.o = !1;
    var q = new Hl((0.5 * m) / p, g, e.i);
    b.Ed(g, m, f);
    if (l) {
      var r = [];
      b.Qb(
        g,
        function(a) {
          r.push(a);
        },
        this
      );
      r.sort(l);
      r.forEach(d, this);
    } else b.Qb(g, d, this);
    Jl(q, c);
    this.L = m;
    this.P = h;
    this.D = l;
    this.A = g;
    this.c = q;
    return !0;
  };
  function Fm() {
    this.f = 0;
    this.b = {};
    this.g = this.a = null;
  }
  k = Fm.prototype;
  k.clear = function() {
    this.f = 0;
    this.b = {};
    this.g = this.a = null;
  };
  k.forEach = function(a, b) {
    for (var c = this.a; c; ) a.call(b, c.Rc, c.jc, this), (c = c.Gb);
  };
  k.get = function(a) {
    a = this.b[a];
    ha(void 0 !== a, 15);
    if (a === this.g) return a.Rc;
    a === this.a
      ? ((this.a = this.a.Gb), (this.a.fd = null))
      : ((a.Gb.fd = a.fd), (a.fd.Gb = a.Gb));
    a.Gb = null;
    a.fd = this.g;
    this.g = this.g.Gb = a;
    return a.Rc;
  };
  k.pop = function() {
    var a = this.a;
    delete this.b[a.jc];
    a.Gb && (a.Gb.fd = null);
    this.a = a.Gb;
    this.a || (this.g = null);
    --this.f;
    return a.Rc;
  };
  k.replace = function(a, b) {
    this.get(a);
    this.b[a].Rc = b;
  };
  k.set = function(a, b) {
    ha(!(a in this.b), 16);
    var c = { jc: a, Gb: null, fd: this.g, Rc: b };
    this.g ? (this.g.Gb = c) : (this.a = c);
    this.g = c;
    this.b[a] = c;
    ++this.f;
  };
  function Gm(a, b) {
    $h.call(this, 0, b);
    this.b = document.createElement("CANVAS");
    this.b.style.width = "100%";
    this.b.style.height = "100%";
    this.b.className = "ol-unselectable";
    a.insertBefore(this.b, a.childNodes[0] || null);
    this.u = this.A = 0;
    this.C = De();
    this.o = !0;
    this.g = ef(this.b, {
      antialias: !0,
      depth: !0,
      failIfMajorPerformanceCaveat: !0,
      preserveDrawingBuffer: !1,
      stencil: !0
    });
    this.c = new xk(this.b, this.g);
    B(this.b, "webglcontextlost", this.Um, this);
    B(this.b, "webglcontextrestored", this.Vm, this);
    this.a = new Fm();
    this.H = null;
    this.j = new dg(
      function(a) {
        var b = a[1];
        a = a[2];
        var e = b[0] - this.H[0],
          b = b[1] - this.H[1];
        return 65536 * Math.log(a) + Math.sqrt(e * e + b * b) / a;
      }.bind(this),
      function(a) {
        return a[0].bb();
      }
    );
    this.D = function() {
      if (0 !== this.j.b.length) {
        hg(this.j);
        var a = eg(this.j);
        Dm(this, a[0], a[3], a[4]);
      }
      return !1;
    }.bind(this);
    this.i = 0;
    Hm(this);
  }
  v(Gm, $h);
  function Dm(a, b, c, d) {
    var e = a.g,
      f = b.bb();
    if (a.a.b.hasOwnProperty(f))
      (a = a.a.get(f)),
        e.bindTexture(3553, a.yb),
        9729 != a.gh && (e.texParameteri(3553, 10240, 9729), (a.gh = 9729)),
        9729 != a.ih && (e.texParameteri(3553, 10241, 9729), (a.ih = 9729));
    else {
      var g = e.createTexture();
      e.bindTexture(3553, g);
      if (0 < d) {
        var h = a.C.canvas,
          l = a.C;
        a.A !== c[0] || a.u !== c[1]
          ? ((h.width = c[0]), (h.height = c[1]), (a.A = c[0]), (a.u = c[1]))
          : l.clearRect(0, 0, c[0], c[1]);
        l.drawImage(b.ub(), d, d, c[0], c[1], 0, 0, c[0], c[1]);
        e.texImage2D(3553, 0, 6408, 6408, 5121, h);
      } else e.texImage2D(3553, 0, 6408, 6408, 5121, b.ub());
      e.texParameteri(3553, 10240, 9729);
      e.texParameteri(3553, 10241, 9729);
      e.texParameteri(3553, 10242, 33071);
      e.texParameteri(3553, 10243, 33071);
      a.a.set(f, { yb: g, gh: 9729, ih: 9729 });
    }
  }
  k = Gm.prototype;
  k.Ag = function(a) {
    return a instanceof ei
      ? new um(this, a)
      : a instanceof F
      ? new Cm(this, a)
      : a instanceof G
      ? new Em(this, a)
      : null;
  };
  function Im(a, b, c) {
    var d = a.l;
    if (Oa(d, b)) {
      a = a.c;
      var e = c.viewState;
      d.b(
        new Jh(
          b,
          new Ol(
            a,
            e.center,
            e.resolution,
            e.rotation,
            c.size,
            c.extent,
            c.pixelRatio
          ),
          c,
          null,
          a
        )
      );
    }
  }
  k.oa = function() {
    var a = this.g;
    a.isContextLost() ||
      this.a.forEach(function(b) {
        b && a.deleteTexture(b.yb);
      });
    Ha(this.c);
    $h.prototype.oa.call(this);
  };
  k.Nj = function(a, b) {
    for (var c = this.g, d; 1024 < this.a.f - this.i; ) {
      if ((d = this.a.a.Rc)) c.deleteTexture(d.yb);
      else if (+this.a.a.jc == b.index) break;
      else --this.i;
      this.a.pop();
    }
  };
  k.Y = function() {
    return "webgl";
  };
  k.Um = function(a) {
    a.preventDefault();
    this.a.clear();
    this.i = 0;
    a = this.f;
    for (var b in a) a[b].If();
  };
  k.Vm = function() {
    Hm(this);
    this.l.render();
  };
  function Hm(a) {
    a = a.g;
    a.activeTexture(33984);
    a.blendFuncSeparate(770, 771, 1, 771);
    a.disable(2884);
    a.disable(2929);
    a.disable(3089);
    a.disable(2960);
  }
  k.ag = function(a) {
    var b = this.c,
      c = this.g;
    if (c.isContextLost()) return !1;
    if (!a)
      return this.o && ((this.b.style.display = "none"), (this.o = !1)), !1;
    this.H = a.focus;
    this.a.set((-a.index).toString(), null);
    ++this.i;
    Im(this, "precompose", a);
    var d = [],
      e = a.layerStatesArray;
    eb(e);
    var f = a.viewState.resolution,
      g,
      h,
      l,
      m;
    g = 0;
    for (h = e.length; g < h; ++g)
      (m = e[g]),
        Lh(m, f) &&
          "ready" == m.Ei &&
          ((l = ci(this, m.layer)), l.Jf(a, m, b) && d.push(m));
    e = a.size[0] * a.pixelRatio;
    f = a.size[1] * a.pixelRatio;
    if (this.b.width != e || this.b.height != f)
      (this.b.width = e), (this.b.height = f);
    c.bindFramebuffer(36160, null);
    c.clearColor(0, 0, 0, 0);
    c.clear(16384);
    c.enable(3042);
    c.viewport(0, 0, this.b.width, this.b.height);
    g = 0;
    for (h = d.length; g < h; ++g)
      (m = d[g]), (l = ci(this, m.layer)), l.Dh(a, m, b);
    this.o || ((this.b.style.display = ""), (this.o = !0));
    ai(a);
    1024 < this.a.f - this.i && a.postRenderFunctions.push(this.Nj.bind(this));
    0 !== this.j.b.length &&
      (a.postRenderFunctions.push(this.D), (a.animate = !0));
    Im(this, "postcompose", a);
    di(this, a);
    a.postRenderFunctions.push(bi);
  };
  k.Ba = function(a, b, c, d, e, f, g) {
    var h;
    if (this.g.isContextLost()) return !1;
    var l = b.viewState,
      m = b.layerStatesArray,
      p;
    for (p = m.length - 1; 0 <= p; --p) {
      h = m[p];
      var n = h.layer;
      if (
        Lh(h, l.resolution) &&
        f.call(g, n) &&
        (h = ci(this, n).Ba(a, b, c, d, e))
      )
        return h;
    }
  };
  k.Ch = function(a, b, c, d, e) {
    c = !1;
    if (this.g.isContextLost()) return !1;
    var f = b.viewState,
      g = b.layerStatesArray,
      h;
    for (h = g.length - 1; 0 <= h; --h) {
      var l = g[h],
        m = l.layer;
      if (Lh(l, f.resolution) && d.call(e, m) && (c = ci(this, m).te(a, b)))
        return !0;
    }
    return c;
  };
  k.Bh = function(a, b, c, d, e) {
    if (this.g.isContextLost()) return !1;
    var f = b.viewState,
      g,
      h = b.layerStatesArray,
      l;
    for (l = h.length - 1; 0 <= l; --l) {
      g = h[l];
      var m = g.layer;
      if (
        Lh(g, f.resolution) &&
        e.call(d, m) &&
        (g = ci(this, m).Hf(a, b, c, d))
      )
        return g;
    }
  };
  var Jm = ["canvas", "webgl"];
  function I(a) {
    Sa.call(this);
    var b = Km(a);
    this.Xe =
      void 0 !== a.loadTilesWhileAnimating ? a.loadTilesWhileAnimating : !1;
    this.Ve =
      void 0 !== a.loadTilesWhileInteracting ? a.loadTilesWhileInteracting : !1;
    this.cf = void 0 !== a.pixelRatio ? a.pixelRatio : mf;
    this.bf = b.logos;
    this.sa = function() {
      this.i = void 0;
      this.Zo.call(this, Date.now());
    }.bind(this);
    this.Ob = Ph();
    this.df = Ph();
    this.fc = 0;
    this.a = null;
    this.Ua = Hb();
    this.D = this.L = this.P = null;
    this.f = document.createElement("DIV");
    this.f.className = "ol-viewport" + (rf ? " ol-touch" : "");
    this.f.style.position = "relative";
    this.f.style.overflow = "hidden";
    this.f.style.width = "100%";
    this.f.style.height = "100%";
    this.f.style.msTouchAction = "none";
    this.f.style.touchAction = "none";
    this.A = document.createElement("DIV");
    this.A.className = "ol-overlaycontainer";
    this.f.appendChild(this.A);
    this.u = document.createElement("DIV");
    this.u.className = "ol-overlaycontainer-stopevent";
    a = "click dblclick mousedown touchstart mspointerdown pointerdown mousewheel wheel".split(
      " "
    );
    for (var c = 0, d = a.length; c < d; ++c) B(this.u, a[c], Ka);
    this.f.appendChild(this.u);
    this.Fa = new Yf(this);
    for (var e in af) B(this.Fa, af[e], this.Zg, this);
    this.na = b.keyboardEventTarget;
    this.v = null;
    B(this.f, "wheel", this.ad, this);
    B(this.f, "mousewheel", this.ad, this);
    this.l = b.controls;
    this.j = b.interactions;
    this.o = b.overlays;
    this.Mf = {};
    this.C = new b.ap(this.f, this);
    this.U = null;
    this.Z = [];
    this.Ja = [];
    this.xa = new ig(this.Gk.bind(this), this.kl.bind(this));
    this.fa = {};
    B(this, Ua(Lm), this.Tk, this);
    B(this, Ua(Mm), this.ll, this);
    B(this, Ua(Nm), this.hl, this);
    B(this, Ua(Om), this.jl, this);
    this.I(b.values);
    this.l.forEach(function(a) {
      a.setMap(this);
    }, this);
    B(
      this.l,
      ue,
      function(a) {
        a.element.setMap(this);
      },
      this
    );
    B(
      this.l,
      ve,
      function(a) {
        a.element.setMap(null);
      },
      this
    );
    this.j.forEach(function(a) {
      a.setMap(this);
    }, this);
    B(
      this.j,
      ue,
      function(a) {
        a.element.setMap(this);
      },
      this
    );
    B(
      this.j,
      ve,
      function(a) {
        a.element.setMap(null);
      },
      this
    );
    this.o.forEach(this.wg, this);
    B(
      this.o,
      ue,
      function(a) {
        this.wg(a.element);
      },
      this
    );
    B(
      this.o,
      ve,
      function(a) {
        var b = a.element.i;
        void 0 !== b && delete this.Mf[b.toString()];
        a.element.setMap(null);
      },
      this
    );
  }
  v(I, Sa);
  k = I.prototype;
  k.Bj = function(a) {
    this.l.push(a);
  };
  k.Cj = function(a) {
    this.j.push(a);
  };
  k.ug = function(a) {
    this.Bc()
      .cd()
      .push(a);
  };
  k.vg = function(a) {
    this.o.push(a);
  };
  k.wg = function(a) {
    var b = a.i;
    void 0 !== b && (this.Mf[b.toString()] = a);
    a.setMap(this);
  };
  k.Ij = function(a) {
    this.render();
    Array.prototype.push.apply(this.Z, arguments);
  };
  k.oa = function() {
    Ha(this.Fa);
    Ha(this.C);
    Ea(this.f, "wheel", this.ad, this);
    Ea(this.f, "mousewheel", this.ad, this);
    void 0 !== this.c &&
      (window.removeEventListener("resize", this.c, !1), (this.c = void 0));
    this.i && (cancelAnimationFrame(this.i), (this.i = void 0));
    this.ph(null);
    Sa.prototype.oa.call(this);
  };
  k.ae = function(a, b, c) {
    if (this.a)
      return (
        (a = this.Sa(a)),
        (c = void 0 !== c ? c : {}),
        this.C.Ba(
          a,
          this.a,
          void 0 !== c.hitTolerance ? c.hitTolerance * this.a.pixelRatio : 0,
          b,
          null,
          void 0 !== c.layerFilter ? c.layerFilter : mc,
          null
        )
      );
  };
  k.Wl = function(a, b, c, d, e) {
    if (this.a)
      return this.C.Bh(
        a,
        this.a,
        b,
        void 0 !== c ? c : null,
        void 0 !== d ? d : mc,
        void 0 !== e ? e : null
      );
  };
  k.ml = function(a, b) {
    if (!this.a) return !1;
    var c = this.Sa(a);
    b = void 0 !== b ? b : {};
    return this.C.Ch(
      c,
      this.a,
      void 0 !== b.hitTolerance ? b.hitTolerance * this.a.pixelRatio : 0,
      void 0 !== b.layerFilter ? b.layerFilter : mc,
      null
    );
  };
  k.ck = function(a) {
    return this.Sa(this.ce(a));
  };
  k.ce = function(a) {
    var b = this.f.getBoundingClientRect();
    a = a.changedTouches ? a.changedTouches[0] : a;
    return [a.clientX - b.left, a.clientY - b.top];
  };
  k.vf = function() {
    return this.get(Om);
  };
  k.Cc = function() {
    var a = this.vf();
    return void 0 !== a
      ? "string" === typeof a
        ? document.getElementById(a)
        : a
      : null;
  };
  k.Sa = function(a) {
    var b = this.a;
    return b ? Uh(b.pixelToCoordinateTransform, a.slice()) : null;
  };
  k.ak = function() {
    return this.l;
  };
  k.vk = function() {
    return this.o;
  };
  k.uk = function(a) {
    a = this.Mf[a.toString()];
    return void 0 !== a ? a : null;
  };
  k.hk = function() {
    return this.j;
  };
  k.Bc = function() {
    return this.get(Lm);
  };
  k.oh = function() {
    return this.Bc().cd();
  };
  k.Ga = function(a) {
    var b = this.a;
    return b ? Uh(b.coordinateToPixelTransform, a.slice(0, 2)) : null;
  };
  k.nb = function() {
    return this.get(Nm);
  };
  k.aa = function() {
    return this.get(Mm);
  };
  k.Ik = function() {
    return this.f;
  };
  k.Gk = function(a, b, c, d) {
    var e = this.a;
    if (!(e && b in e.wantedTiles && e.wantedTiles[b][a.bb()])) return Infinity;
    a = c[0] - e.focus[0];
    c = c[1] - e.focus[1];
    return 65536 * Math.log(d) + Math.sqrt(a * a + c * c) / d;
  };
  k.ad = function(a, b) {
    var c = new $e(b || a.type, this, a);
    this.Zg(c);
  };
  k.Zg = function(a) {
    if (this.a) {
      this.U = a.coordinate;
      a.frameState = this.a;
      var b = this.j.a,
        c;
      if (!1 !== this.b(a))
        for (c = b.length - 1; 0 <= c; c--) {
          var d = b[c];
          if (d.f() && !d.handleEvent(a)) break;
        }
    }
  };
  k.fl = function() {
    var a = this.a,
      b = this.xa;
    if (0 !== b.b.length) {
      var c = 16,
        d = c;
      if (a) {
        var e = a.viewHints;
        e[Kd] && ((c = this.Xe ? 8 : 0), (d = 2));
        e[1] && ((c = this.Ve ? 8 : 0), (d = 2));
      }
      b.j < c && (hg(b), jg(b, c, d));
    }
    b = this.Ja;
    c = 0;
    for (d = b.length; c < d; ++c) b[c](this, a);
    b.length = 0;
  };
  k.hl = function() {
    this.render();
  };
  k.jl = function() {
    var a;
    this.vf() && (a = this.Cc());
    if (this.v) {
      for (var b = 0, c = this.v.length; b < c; ++b) ya(this.v[b]);
      this.v = null;
    }
    a
      ? (a.appendChild(this.f),
        (a = this.na ? this.na : a),
        (this.v = [
          B(a, "keydown", this.ad, this),
          B(a, "keypress", this.ad, this)
        ]),
        this.c ||
          ((this.c = this.ld.bind(this)),
          window.addEventListener("resize", this.c, !1)))
      : (Fe(this.f),
        void 0 !== this.c &&
          (window.removeEventListener("resize", this.c, !1),
          (this.c = void 0)));
    this.ld();
  };
  k.kl = function() {
    this.render();
  };
  k.bh = function() {
    this.render();
  };
  k.ll = function() {
    this.P && (ya(this.P), (this.P = null));
    this.L && (ya(this.L), (this.L = null));
    var a = this.aa();
    a &&
      ((this.P = B(a, Xa, this.bh, this)),
      (this.L = B(a, "change", this.bh, this)));
    this.render();
  };
  k.Tk = function() {
    this.D && (this.D.forEach(ya), (this.D = null));
    var a = this.Bc();
    a &&
      (this.D = [
        B(a, Xa, this.render, this),
        B(a, "change", this.render, this)
      ]);
    this.render();
  };
  k.$o = function() {
    this.i && cancelAnimationFrame(this.i);
    this.sa();
  };
  k.render = function() {
    void 0 === this.i && (this.i = requestAnimationFrame(this.sa));
  };
  k.To = function(a) {
    return this.l.remove(a);
  };
  k.Uo = function(a) {
    return this.j.remove(a);
  };
  k.Wo = function(a) {
    return this.Bc()
      .cd()
      .remove(a);
  };
  k.Xo = function(a) {
    return this.o.remove(a);
  };
  k.Zo = function(a) {
    var b,
      c,
      d,
      e = this.nb(),
      f = this.aa(),
      g = Hb(),
      h = null;
    if (void 0 !== e && 0 < e[0] && 0 < e[1] && f && Sd(f)) {
      var h = Md(f, this.a ? this.a.viewHints : void 0),
        l = this.Bc().sf(),
        m = {};
      b = 0;
      for (c = l.length; b < c; ++b) m[x(l[b].layer)] = l[b];
      d = f.W();
      h = {
        animate: !1,
        attributions: {},
        coordinateToPixelTransform: this.Ob,
        extent: g,
        focus: this.U ? this.U : d.center,
        index: this.fc++,
        layerStates: m,
        layerStatesArray: l,
        logos: ta({}, this.bf),
        pixelRatio: this.cf,
        pixelToCoordinateTransform: this.df,
        postRenderFunctions: [],
        size: e,
        skippedFeatureUids: this.fa,
        tileQueue: this.xa,
        time: a,
        usedTiles: {},
        viewState: d,
        viewHints: h,
        wantedTiles: {}
      };
    }
    if (h) {
      a = this.Z;
      b = e = 0;
      for (c = a.length; b < c; ++b) (f = a[b]), f(this, h) && (a[e++] = f);
      a.length = e;
      h.extent = hc(d.center, d.resolution, d.rotation, h.size, g);
    }
    this.a = h;
    this.C.ag(h);
    h &&
      (h.animate && this.render(),
      Array.prototype.push.apply(this.Ja, h.postRenderFunctions),
      0 !== this.Z.length ||
        h.viewHints[Kd] ||
        h.viewHints[1] ||
        Vb(h.extent, this.Ua) ||
        (this.b(new Ge("moveend", this, h)), Kb(h.extent, this.Ua)));
    this.b(new Ge("postrender", this, h));
    setTimeout(this.fl.bind(this), 0);
  };
  k.vi = function(a) {
    this.set(Lm, a);
  };
  k.eg = function(a) {
    this.set(Nm, a);
  };
  k.ph = function(a) {
    this.set(Om, a);
  };
  k.mp = function(a) {
    this.set(Mm, a);
  };
  k.Di = function(a) {
    a = x(a).toString();
    this.fa[a] = !0;
    this.render();
  };
  k.ld = function() {
    var a = this.Cc();
    if (a) {
      var b = getComputedStyle(a);
      this.eg([
        a.offsetWidth -
          parseFloat(b.borderLeftWidth) -
          parseFloat(b.paddingLeft) -
          parseFloat(b.paddingRight) -
          parseFloat(b.borderRightWidth),
        a.offsetHeight -
          parseFloat(b.borderTopWidth) -
          parseFloat(b.paddingTop) -
          parseFloat(b.paddingBottom) -
          parseFloat(b.borderBottomWidth)
      ]);
    } else this.eg(void 0);
  };
  k.Ji = function(a) {
    a = x(a).toString();
    delete this.fa[a];
    this.render();
  };
  function Km(a) {
    var b = null;
    void 0 !== a.keyboardEventTarget &&
      (b =
        "string" === typeof a.keyboardEventTarget
          ? document.getElementById(a.keyboardEventTarget)
          : a.keyboardEventTarget);
    var c = {},
      d = {};
    if (void 0 === a.logo || ("boolean" === typeof a.logo && a.logo))
      d[
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"
      ] = "https://openlayers.org/";
    else {
      var e = a.logo;
      "string" === typeof e
        ? (d[e] = "")
        : e instanceof HTMLElement
        ? (d[x(e).toString()] = e)
        : e &&
          (ha("string" == typeof e.href, 44),
          ha("string" == typeof e.src, 45),
          (d[e.src] = e.href));
    }
    e = a.layers instanceof yh ? a.layers : new yh({ layers: a.layers });
    c[Lm] = e;
    c[Om] = a.target;
    c[Mm] = void 0 !== a.view ? a.view : new Fd();
    var e = $h,
      f;
    void 0 !== a.renderer
      ? (Array.isArray(a.renderer)
          ? (f = a.renderer)
          : "string" === typeof a.renderer
          ? (f = [a.renderer])
          : ha(!1, 46),
        0 <= f.indexOf("dom") && (f = f.concat(Jm)))
      : (f = Jm);
    var g, h;
    g = 0;
    for (h = f.length; g < h; ++g) {
      var l = f[g];
      if ("canvas" == l) {
        if (of) {
          e = Sj;
          break;
        }
      } else if ("webgl" == l && ff) {
        e = Gm;
        break;
      }
    }
    void 0 !== a.controls
      ? Array.isArray(a.controls)
        ? (f = new qe(a.controls.slice()))
        : (ha(a.controls instanceof qe, 47), (f = a.controls))
      : (f = Ue());
    void 0 !== a.interactions
      ? Array.isArray(a.interactions)
        ? (g = new qe(a.interactions.slice()))
        : (ha(a.interactions instanceof qe, 48), (g = a.interactions))
      : (g = ph());
    void 0 !== a.overlays
      ? Array.isArray(a.overlays)
        ? (a = new qe(a.overlays.slice()))
        : (ha(a.overlays instanceof qe, 49), (a = a.overlays))
      : (a = new qe());
    return {
      controls: f,
      interactions: g,
      keyboardEventTarget: b,
      logos: d,
      overlays: a,
      ap: e,
      values: c
    };
  }
  var Lm = "layergroup",
    Nm = "size",
    Om = "target",
    Mm = "view";
  Ih();
  function Pm(a) {
    Sa.call(this);
    this.i = a.id;
    this.o = void 0 !== a.insertFirst ? a.insertFirst : !0;
    this.v = void 0 !== a.stopEvent ? a.stopEvent : !0;
    this.f = document.createElement("DIV");
    this.f.className = "ol-overlay-container";
    this.f.style.position = "absolute";
    this.autoPan = void 0 !== a.autoPan ? a.autoPan : !1;
    this.j = a.autoPanAnimation || {};
    this.l = void 0 !== a.autoPanMargin ? a.autoPanMargin : 20;
    this.a = { Xd: "", le: "", Je: "", Oe: "", visible: !0 };
    this.c = null;
    B(this, Ua(Qm), this.Ok, this);
    B(this, Ua(Rm), this.Yk, this);
    B(this, Ua(Sm), this.bl, this);
    B(this, Ua(Tm), this.dl, this);
    B(this, Ua(Um), this.el, this);
    void 0 !== a.element && this.pi(a.element);
    this.xi(void 0 !== a.offset ? a.offset : [0, 0]);
    this.Ai(void 0 !== a.positioning ? a.positioning : Vm);
    void 0 !== a.position && this.Ef(a.position);
  }
  v(Pm, Sa);
  k = Pm.prototype;
  k.be = function() {
    return this.get(Qm);
  };
  k.Xl = function() {
    return this.i;
  };
  k.oe = function() {
    return this.get(Rm);
  };
  k.Tg = function() {
    return this.get(Sm);
  };
  k.qh = function() {
    return this.get(Tm);
  };
  k.Ug = function() {
    return this.get(Um);
  };
  k.Ok = function() {
    for (var a = this.f; a.lastChild; ) a.removeChild(a.lastChild);
    (a = this.be()) && this.f.appendChild(a);
  };
  k.Yk = function() {
    this.c && (Fe(this.f), ya(this.c), (this.c = null));
    var a = this.oe();
    a &&
      ((this.c = B(a, "postrender", this.render, this)),
      Wm(this),
      (a = this.v ? a.u : a.A),
      this.o
        ? a.insertBefore(this.f, a.childNodes[0] || null)
        : a.appendChild(this.f));
  };
  k.render = function() {
    Wm(this);
  };
  k.bl = function() {
    Wm(this);
  };
  k.dl = function() {
    Wm(this);
    if (void 0 !== this.get(Tm) && this.autoPan) {
      var a = this.oe();
      if (void 0 !== a && a.Cc()) {
        var b = Xm(a.Cc(), a.nb()),
          c = this.be(),
          d = c.offsetWidth,
          e = c.currentStyle || getComputedStyle(c),
          d = d + (parseInt(e.marginLeft, 10) + parseInt(e.marginRight, 10)),
          e = c.offsetHeight,
          f = c.currentStyle || getComputedStyle(c),
          e = e + (parseInt(f.marginTop, 10) + parseInt(f.marginBottom, 10)),
          g = Xm(c, [d, e]),
          c = this.l;
        Ob(b, g) ||
          ((d = g[0] - b[0]),
          (e = b[2] - g[2]),
          (f = g[1] - b[1]),
          (g = b[3] - g[3]),
          (b = [0, 0]),
          0 > d ? (b[0] = d - c) : 0 > e && (b[0] = Math.abs(e) + c),
          0 > f ? (b[1] = f - c) : 0 > g && (b[1] = Math.abs(g) + c),
          0 === b[0] && 0 === b[1]) ||
          ((c = a.aa().fb()),
          (c = a.Ga(c)),
          (b = [c[0] + b[0], c[1] + b[1]]),
          a
            .aa()
            .animate({
              center: a.Sa(b),
              duration: this.j.duration,
              easing: this.j.easing
            }));
      }
    }
  };
  k.el = function() {
    Wm(this);
  };
  k.pi = function(a) {
    this.set(Qm, a);
  };
  k.setMap = function(a) {
    this.set(Rm, a);
  };
  k.xi = function(a) {
    this.set(Sm, a);
  };
  k.Ef = function(a) {
    this.set(Tm, a);
  };
  function Xm(a, b) {
    var c = a.getBoundingClientRect(),
      d = c.left + window.pageXOffset,
      c = c.top + window.pageYOffset;
    return [d, c, d + b[0], c + b[1]];
  }
  k.Ai = function(a) {
    this.set(Um, a);
  };
  function Ym(a, b) {
    a.a.visible !== b &&
      ((a.f.style.display = b ? "" : "none"), (a.a.visible = b));
  }
  function Wm(a) {
    var b = a.oe(),
      c = a.qh();
    if (void 0 !== b && b.a && void 0 !== c) {
      var c = b.Ga(c),
        d = b.nb(),
        b = a.f.style,
        e = a.Tg(),
        f = a.Ug(),
        g = e[0],
        e = e[1];
      if (f == Zm || f == $m || f == an)
        "" !== a.a.le && (a.a.le = b.left = ""),
          (g = Math.round(d[0] - c[0] - g) + "px"),
          a.a.Je != g && (a.a.Je = b.right = g);
      else {
        "" !== a.a.Je && (a.a.Je = b.right = "");
        if (f == bn || f == cn || f == dn) g -= a.f.offsetWidth / 2;
        g = Math.round(c[0] + g) + "px";
        a.a.le != g && (a.a.le = b.left = g);
      }
      if (f == en || f == bn || f == Zm)
        "" !== a.a.Oe && (a.a.Oe = b.top = ""),
          (c = Math.round(d[1] - c[1] - e) + "px"),
          a.a.Xd != c && (a.a.Xd = b.bottom = c);
      else {
        "" !== a.a.Xd && (a.a.Xd = b.bottom = "");
        if (f == fn || f == cn || f == $m) e -= a.f.offsetHeight / 2;
        c = Math.round(c[1] + e) + "px";
        a.a.Oe != c && (a.a.Oe = b.top = c);
      }
      Ym(a, !0);
    } else Ym(a, !1);
  }
  var en = "bottom-left",
    bn = "bottom-center",
    Zm = "bottom-right",
    fn = "center-left",
    cn = "center-center",
    $m = "center-right",
    Vm = "top-left",
    dn = "top-center",
    an = "top-right",
    Qm = "element",
    Rm = "map",
    Sm = "offset",
    Tm = "position",
    Um = "positioning";
  function gn(a) {
    a = a ? a : {};
    this.j = void 0 !== a.collapsed ? a.collapsed : !0;
    this.l = void 0 !== a.collapsible ? a.collapsible : !0;
    this.l || (this.j = !1);
    var b = void 0 !== a.className ? a.className : "ol-overviewmap",
      c = void 0 !== a.tipLabel ? a.tipLabel : "Overview map",
      d = void 0 !== a.collapseLabel ? a.collapseLabel : "\u00ab";
    "string" === typeof d
      ? ((this.o = document.createElement("span")), (this.o.textContent = d))
      : (this.o = d);
    d = void 0 !== a.label ? a.label : "\u00bb";
    "string" === typeof d
      ? ((this.u = document.createElement("span")), (this.u.textContent = d))
      : (this.u = d);
    var e = this.l && !this.j ? this.o : this.u,
      d = document.createElement("button");
    d.setAttribute("type", "button");
    d.title = c;
    d.appendChild(e);
    B(d, "click", this.km, this);
    c = document.createElement("DIV");
    c.className = "ol-overviewmap-map";
    var f = (this.f = new I({
      controls: new qe(),
      interactions: new qe(),
      target: c,
      view: a.view
    }));
    a.layers &&
      a.layers.forEach(function(a) {
        f.ug(a);
      }, this);
    e = document.createElement("DIV");
    e.className = "ol-overviewmap-box";
    e.style.boxSizing = "border-box";
    this.A = new Pm({ position: [0, 0], positioning: en, element: e });
    this.f.vg(this.A);
    e = document.createElement("div");
    e.className =
      b +
      " ol-unselectable ol-control" +
      (this.j && this.l ? " ol-collapsed" : "") +
      (this.l ? "" : " ol-uncollapsible");
    e.appendChild(c);
    e.appendChild(d);
    Ie.call(this, {
      element: e,
      render: a.render ? a.render : hn,
      target: a.target
    });
  }
  v(gn, Ie);
  k = gn.prototype;
  k.setMap = function(a) {
    var b = this.a;
    a !== b &&
      (b && (b = b.aa()) && Ea(b, Ua(Id), this.je, this),
      Ie.prototype.setMap.call(this, a),
      a &&
        (this.v.push(B(a, Xa, this.Zk, this)),
        0 === this.f.oh().Ub() && this.f.vi(a.Bc()),
        (a = a.aa()))) &&
      (B(a, Ua(Id), this.je, this), Sd(a) && (this.f.ld(), jn(this)));
  };
  k.Zk = function(a) {
    a.key === Mm &&
      ((a = a.oldValue) && Ea(a, Ua(Id), this.je, this),
      (a = this.a.aa()),
      B(a, Ua(Id), this.je, this));
  };
  k.je = function() {
    this.f.aa().pe(this.a.aa().Ra());
  };
  function hn() {
    var a = this.a,
      b = this.f;
    if (a.a && b.a) {
      var c = a.nb(),
        a = a.aa().Uc(c),
        d = b.nb(),
        c = b.aa().Uc(d),
        e = b.Ga(ac(a)),
        f = b.Ga(Zb(a)),
        b = Math.abs(e[0] - f[0]),
        e = Math.abs(e[1] - f[1]),
        f = d[0],
        d = d[1];
      b < 0.1 * f || e < 0.1 * d || b > 0.75 * f || e > 0.75 * d
        ? jn(this)
        : Ob(c, a) || ((a = this.f), (c = this.a.aa()), a.aa().Mb(c.fb()));
    }
    kn(this);
  }
  function jn(a) {
    var b = a.a;
    a = a.f;
    var c = b.nb(),
      b = b.aa().Uc(c),
      c = a.nb();
    a = a.aa();
    kc(b, 1 / (0.1 * Math.pow(2, Math.log(7.5) / Math.LN2 / 2)));
    a.lf(b, c);
  }
  function kn(a) {
    var b = a.a,
      c = a.f;
    if (b.a && c.a) {
      var d = b.nb(),
        e = b.aa(),
        f = c.aa(),
        c = e.Ra(),
        b = a.A,
        g = a.A.be(),
        h = e.Uc(d),
        d = f.Oa(),
        e = Yb(h),
        f = $b(h),
        l;
      if ((a = a.a.aa().fb()))
        (l = [e[0] - a[0], e[1] - a[1]]), wb(l, c), rb(l, a);
      b.Ef(l);
      g &&
        ((g.style.width = Math.abs((e[0] - f[0]) / d) + "px"),
        (g.style.height = Math.abs((f[1] - e[1]) / d) + "px"));
    }
  }
  k.km = function(a) {
    a.preventDefault();
    ln(this);
  };
  function ln(a) {
    a.element.classList.toggle("ol-collapsed");
    a.j ? Ee(a.o, a.u) : Ee(a.u, a.o);
    a.j = !a.j;
    var b = a.f;
    a.j ||
      b.a ||
      (b.ld(),
      jn(a),
      Da(
        b,
        "postrender",
        function() {
          kn(this);
        },
        a
      ));
  }
  k.jm = function() {
    return this.l;
  };
  k.mm = function(a) {
    this.l !== a &&
      ((this.l = a),
      this.element.classList.toggle("ol-uncollapsible"),
      !a && this.j && ln(this));
  };
  k.lm = function(a) {
    this.l && this.j !== a && ln(this);
  };
  k.im = function() {
    return this.j;
  };
  k.wk = function() {
    return this.f;
  };
  function mn(a) {
    a = a ? a : {};
    var b = void 0 !== a.className ? a.className : "ol-scale-line";
    this.l = document.createElement("DIV");
    this.l.className = b + "-inner";
    this.f = document.createElement("DIV");
    this.f.className = b + " ol-unselectable";
    this.f.appendChild(this.l);
    this.u = null;
    this.o = void 0 !== a.minWidth ? a.minWidth : 64;
    this.j = !1;
    this.C = void 0;
    this.A = "";
    Ie.call(this, {
      element: this.f,
      render: a.render ? a.render : nn,
      target: a.target
    });
    B(this, Ua(on), this.L, this);
    this.D(a.units || pn);
  }
  v(mn, Ie);
  var qn = [1, 2, 5];
  mn.prototype.Eb = function() {
    return this.get(on);
  };
  function nn(a) {
    (a = a.frameState) ? (this.u = a.viewState) : (this.u = null);
    rn(this);
  }
  mn.prototype.L = function() {
    rn(this);
  };
  mn.prototype.D = function(a) {
    this.set(on, a);
  };
  function rn(a) {
    var b = a.u;
    if (b) {
      var c = b.projection,
        d = c.ic(),
        b = xc(c, b.resolution, b.center) * d,
        d = a.o * b,
        c = "",
        e = a.Eb();
      e == sn
        ? ((c = qc.degrees),
          (b /= c),
          d < c / 60
            ? ((c = "\u2033"), (b *= 3600))
            : d < c
            ? ((c = "\u2032"), (b *= 60))
            : (c = "\u00b0"))
        : e == tn
        ? 0.9144 > d
          ? ((c = "in"), (b /= 0.0254))
          : 1609.344 > d
          ? ((c = "ft"), (b /= 0.3048))
          : ((c = "mi"), (b /= 1609.344))
        : e == un
        ? ((b /= 1852), (c = "nm"))
        : e == pn
        ? 1 > d
          ? ((c = "mm"), (b *= 1e3))
          : 1e3 > d
          ? (c = "m")
          : ((c = "km"), (b /= 1e3))
        : e == vn
        ? 0.9144 > d
          ? ((c = "in"), (b *= 39.37))
          : 1609.344 > d
          ? ((c = "ft"), (b /= 0.30480061))
          : ((c = "mi"), (b /= 1609.3472))
        : ha(!1, 33);
      for (var e = 3 * Math.floor(Math.log(a.o * b) / Math.log(10)), f; ; ) {
        f = qn[((e % 3) + 3) % 3] * Math.pow(10, Math.floor(e / 3));
        d = Math.round(f / b);
        if (isNaN(d)) {
          a.f.style.display = "none";
          a.j = !1;
          return;
        }
        if (d >= a.o) break;
        ++e;
      }
      b = f + " " + c;
      a.A != b && ((a.l.innerHTML = b), (a.A = b));
      a.C != d && ((a.l.style.width = d + "px"), (a.C = d));
      a.j || ((a.f.style.display = ""), (a.j = !0));
    } else a.j && ((a.f.style.display = "none"), (a.j = !1));
  }
  var on = "units",
    sn = "degrees",
    tn = "imperial",
    un = "nautical",
    pn = "metric",
    vn = "us";
  function wn(a) {
    a = a ? a : {};
    this.f = void 0;
    this.j = xn;
    this.u = [];
    this.C = this.o = 0;
    this.U = null;
    this.fa = !1;
    this.Z = void 0 !== a.duration ? a.duration : 200;
    var b = void 0 !== a.className ? a.className : "ol-zoomslider",
      c = document.createElement("button");
    c.setAttribute("type", "button");
    c.className = b + "-thumb ol-unselectable";
    var d = document.createElement("div");
    d.className = b + " ol-unselectable ol-control";
    d.appendChild(c);
    this.l = new Tf(d);
    B(this.l, "pointerdown", this.Nk, this);
    B(this.l, "pointermove", this.Xg, this);
    B(this.l, "pointerup", this.Yg, this);
    B(d, "click", this.Mk, this);
    B(c, "click", Ka);
    Ie.call(this, { element: d, render: a.render ? a.render : yn });
  }
  v(wn, Ie);
  wn.prototype.oa = function() {
    Ha(this.l);
    Ie.prototype.oa.call(this);
  };
  var xn = 0;
  k = wn.prototype;
  k.setMap = function(a) {
    Ie.prototype.setMap.call(this, a);
    a && a.render();
  };
  function yn(a) {
    if (a.frameState) {
      if (!this.fa) {
        var b = this.element,
          c = b.offsetWidth,
          d = b.offsetHeight,
          e = b.firstElementChild,
          f = getComputedStyle(e),
          b =
            e.offsetWidth +
            parseFloat(f.marginRight) +
            parseFloat(f.marginLeft),
          e =
            e.offsetHeight +
            parseFloat(f.marginTop) +
            parseFloat(f.marginBottom);
        this.U = [b, e];
        c > d
          ? ((this.j = 1), (this.C = c - b))
          : ((this.j = xn), (this.o = d - e));
        this.fa = !0;
      }
      a = a.frameState.viewState.resolution;
      a !== this.f && ((this.f = a), zn(this, a));
    }
  }
  k.Mk = function(a) {
    var b = this.a.aa();
    a = An(
      this,
      ia(
        1 === this.j
          ? (a.offsetX - this.U[0] / 2) / this.C
          : (a.offsetY - this.U[1] / 2) / this.o,
        0,
        1
      )
    );
    b.animate({
      resolution: b.constrainResolution(a),
      duration: this.Z,
      easing: Cb
    });
  };
  k.Nk = function(a) {
    if (
      !this.A &&
      a.b.target === this.element.firstElementChild &&
      (Jd(this.a.aa(), 1, 1),
      (this.D = a.clientX),
      (this.L = a.clientY),
      (this.A = !0),
      0 === this.u.length)
    ) {
      a = this.Xg;
      var b = this.Yg;
      this.u.push(
        B(document, "mousemove", a, this),
        B(document, "touchmove", a, this),
        B(document, "pointermove", a, this),
        B(document, "mouseup", b, this),
        B(document, "touchend", b, this),
        B(document, "pointerup", b, this)
      );
    }
  };
  k.Xg = function(a) {
    if (this.A) {
      var b = this.element.firstElementChild;
      this.f = An(
        this,
        ia(
          1 === this.j
            ? (a.clientX - this.D + parseInt(b.style.left, 10)) / this.C
            : (a.clientY - this.L + parseInt(b.style.top, 10)) / this.o,
          0,
          1
        )
      );
      this.a.aa().Oc(this.f);
      zn(this, this.f);
      this.D = a.clientX;
      this.L = a.clientY;
    }
  };
  k.Yg = function() {
    if (this.A) {
      var a = this.a.aa();
      Jd(a, 1, -1);
      a.animate({
        resolution: a.constrainResolution(this.f),
        duration: this.Z,
        easing: Cb
      });
      this.A = !1;
      this.L = this.D = void 0;
      this.u.forEach(ya);
      this.u.length = 0;
    }
  };
  function zn(a, b) {
    var c;
    c = 1 - Rd(a.a.aa())(b);
    var d = a.element.firstElementChild;
    1 == a.j ? (d.style.left = a.C * c + "px") : (d.style.top = a.o * c + "px");
  }
  function An(a, b) {
    return Qd(a.a.aa())(1 - b);
  }
  function Bn(a) {
    a = a ? a : {};
    this.f = a.extent ? a.extent : null;
    var b = void 0 !== a.className ? a.className : "ol-zoom-extent",
      c = void 0 !== a.label ? a.label : "E",
      d = void 0 !== a.tipLabel ? a.tipLabel : "Fit to extent",
      e = document.createElement("button");
    e.setAttribute("type", "button");
    e.title = d;
    e.appendChild("string" === typeof c ? document.createTextNode(c) : c);
    B(e, "click", this.j, this);
    c = document.createElement("div");
    c.className = b + " ol-unselectable ol-control";
    c.appendChild(e);
    Ie.call(this, { element: c, target: a.target });
  }
  v(Bn, Ie);
  Bn.prototype.j = function(a) {
    a.preventDefault();
    var b = this.a;
    a = b.aa();
    var c = this.f ? this.f : a.o.G(),
      b = b.nb();
    a.lf(c, b);
  };
  function Cn(a) {
    Sa.call(this);
    a = a ? a : {};
    this.a = null;
    B(this, Ua(Dn), this.Kl, this);
    this.Cf(void 0 !== a.tracking ? a.tracking : !1);
  }
  v(Cn, Sa);
  k = Cn.prototype;
  k.oa = function() {
    this.Cf(!1);
    Sa.prototype.oa.call(this);
  };
  k.io = function(a) {
    if (null !== a.alpha) {
      var b = na(a.alpha);
      this.set(En, b);
      "boolean" === typeof a.absolute && a.absolute
        ? this.set(Fn, b)
        : "number" === typeof a.webkitCompassHeading &&
          -1 != a.webkitCompassAccuracy &&
          this.set(Fn, na(a.webkitCompassHeading));
    }
    null !== a.beta && this.set(Gn, na(a.beta));
    null !== a.gamma && this.set(Hn, na(a.gamma));
    this.s();
  };
  k.Vj = function() {
    return this.get(En);
  };
  k.Yj = function() {
    return this.get(Gn);
  };
  k.ek = function() {
    return this.get(Hn);
  };
  k.Jl = function() {
    return this.get(Fn);
  };
  k.kh = function() {
    return this.get(Dn);
  };
  k.Kl = function() {
    if (pf) {
      var a = this.kh();
      a && !this.a
        ? (this.a = B(window, "deviceorientation", this.io, this))
        : a || null === this.a || (ya(this.a), (this.a = null));
    }
  };
  k.Cf = function(a) {
    this.set(Dn, a);
  };
  var En = "alpha",
    Gn = "beta",
    Hn = "gamma",
    Fn = "heading",
    Dn = "tracking";
  function J(a) {
    Sa.call(this);
    this.f = void 0;
    this.a = "geometry";
    this.i = null;
    this.j = void 0;
    this.c = null;
    B(this, Ua(this.a), this.he, this);
    void 0 !== a && (a instanceof Rc || !a ? this.Pa(a) : this.I(a));
  }
  v(J, Sa);
  k = J.prototype;
  k.clone = function() {
    var a = new J(this.R());
    a.Nc(this.a);
    var b = this.V();
    b && a.Pa(b.clone());
    (b = this.i) && a.Df(b);
    return a;
  };
  k.V = function() {
    return this.get(this.a);
  };
  k.Ll = function() {
    return this.f;
  };
  k.gk = function() {
    return this.a;
  };
  k.Ml = function() {
    return this.i;
  };
  k.Gc = function() {
    return this.j;
  };
  k.Nl = function() {
    this.s();
  };
  k.he = function() {
    this.c && (ya(this.c), (this.c = null));
    var a = this.V();
    a && (this.c = B(a, "change", this.Nl, this));
    this.s();
  };
  k.Pa = function(a) {
    this.set(this.a, a);
  };
  k.Df = function(a) {
    this.j = (this.i = a) ? In(a) : void 0;
    this.s();
  };
  k.cc = function(a) {
    this.f = a;
    this.s();
  };
  k.Nc = function(a) {
    Ea(this, Ua(this.a), this.he, this);
    this.a = a;
    B(this, Ua(this.a), this.he, this);
    this.he();
  };
  function In(a) {
    if ("function" !== typeof a) {
      var b;
      Array.isArray(a) ? (b = a) : (ha(a instanceof xi, 41), (b = [a]));
      a = function() {
        return b;
      };
    }
    return a;
  }
  var Jn = document.implementation.createDocument("", "", null);
  function Kn(a, b) {
    return Jn.createElementNS(a, b);
  }
  function Ln(a, b) {
    return Mn(a, b, []).join("");
  }
  function Mn(a, b, c) {
    if (a.nodeType == Node.CDATA_SECTION_NODE || a.nodeType == Node.TEXT_NODE)
      b
        ? c.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
        : c.push(a.nodeValue);
    else for (a = a.firstChild; a; a = a.nextSibling) Mn(a, b, c);
    return c;
  }
  function Nn(a) {
    return a instanceof Document;
  }
  function On(a) {
    return a instanceof Node;
  }
  function Pn(a) {
    return new DOMParser().parseFromString(a, "application/xml");
  }
  function Qn(a, b) {
    return function(c, d) {
      var e = a.call(b, c, d);
      void 0 !== e && bb(d[d.length - 1], e);
    };
  }
  function Rn(a, b) {
    return function(c, d) {
      var e = a.call(void 0 !== b ? b : this, c, d);
      void 0 !== e && d[d.length - 1].push(e);
    };
  }
  function Sn(a, b) {
    return function(c, d) {
      var e = a.call(void 0 !== b ? b : this, c, d);
      void 0 !== e && (d[d.length - 1] = e);
    };
  }
  function Tn(a) {
    return function(b, c) {
      var d = a.call(this, b, c);
      if (void 0 !== d) {
        var e = c[c.length - 1],
          f = b.localName,
          g;
        f in e ? (g = e[f]) : (g = e[f] = []);
        g.push(d);
      }
    };
  }
  function K(a, b) {
    return function(c, d) {
      var e = a.call(this, c, d);
      void 0 !== e && (d[d.length - 1][void 0 !== b ? b : c.localName] = e);
    };
  }
  function L(a, b) {
    return function(c, d, e) {
      a.call(void 0 !== b ? b : this, c, d, e);
      e[e.length - 1].node.appendChild(c);
    };
  }
  function Un(a) {
    var b, c;
    return function(d, e, f) {
      if (!b) {
        b = {};
        var g = {};
        g[d.localName] = a;
        b[d.namespaceURI] = g;
        c = Vn(d.localName);
      }
      Wn(b, c, e, f);
    };
  }
  function Vn(a, b) {
    return function(c, d, e) {
      c = d[d.length - 1].node;
      d = a;
      void 0 === d && (d = e);
      e = b;
      void 0 === b && (e = c.namespaceURI);
      return Kn(e, d);
    };
  }
  var Xn = Vn();
  function Yn(a, b) {
    for (var c = b.length, d = Array(c), e = 0; e < c; ++e) d[e] = a[b[e]];
    return d;
  }
  function M(a, b, c) {
    c = void 0 !== c ? c : {};
    var d, e;
    d = 0;
    for (e = a.length; d < e; ++d) c[a[d]] = b;
    return c;
  }
  function Zn(a, b, c, d) {
    for (b = b.firstElementChild; b; b = b.nextElementSibling) {
      var e = a[b.namespaceURI];
      void 0 !== e && (e = e[b.localName]) && e.call(d, b, c);
    }
  }
  function N(a, b, c, d, e) {
    d.push(a);
    Zn(b, c, d, e);
    return d.pop();
  }
  function Wn(a, b, c, d, e, f) {
    for (var g = (void 0 !== e ? e : c).length, h, l, m = 0; m < g; ++m)
      (h = c[m]),
        void 0 !== h &&
          ((l = b.call(f, h, d, void 0 !== e ? e[m] : void 0)),
          void 0 !== l && a[l.namespaceURI][l.localName].call(f, l, h, d));
  }
  function $n(a, b, c, d, e, f, g) {
    e.push(a);
    Wn(b, c, d, e, f, g);
    e.pop();
  }
  function ao(a, b, c, d) {
    return function(e, f, g) {
      var h = new XMLHttpRequest();
      h.open("GET", "function" === typeof a ? a(e, f, g) : a, !0);
      "arraybuffer" == b.Y() && (h.responseType = "arraybuffer");
      h.onload = function() {
        if (!h.status || (200 <= h.status && 300 > h.status)) {
          var a = b.Y(),
            e;
          "json" == a || "text" == a
            ? (e = h.responseText)
            : "xml" == a
            ? (e = h.responseXML) || (e = Pn(h.responseText))
            : "arraybuffer" == a && (e = h.response);
          e
            ? c.call(this, b.La(e, { featureProjection: g }), b.Wa(e))
            : d.call(this);
        } else d.call(this);
      }.bind(this);
      h.send();
    };
  }
  function bo(a, b) {
    return ao(
      a,
      b,
      function(a) {
        this.Tc(a);
      },
      ea
    );
  }
  function co() {
    this.j = this.defaultDataProjection = null;
  }
  function eo(a, b, c) {
    var d;
    c &&
      (d = {
        dataProjection: c.dataProjection ? c.dataProjection : a.Wa(b),
        featureProjection: c.featureProjection
      });
    return fo(a, d);
  }
  function fo(a, b) {
    return ta(
      { dataProjection: a.defaultDataProjection, featureProjection: a.j },
      b
    );
  }
  function go(a, b, c) {
    var d = c ? zc(c.featureProjection) : null,
      e = c ? zc(c.dataProjection) : null,
      f;
    d && e && !Mc(d, e)
      ? a instanceof Rc
        ? (f = (b ? a.clone() : a).ob(b ? d : e, b ? e : d))
        : (f = Qc(b ? a.slice() : a, b ? d : e, b ? e : d))
      : (f = a);
    if (b && c && c.decimals) {
      var g = Math.pow(10, c.decimals);
      a = function(a) {
        for (var b = 0, c = a.length; b < c; ++b)
          a[b] = Math.round(a[b] * g) / g;
        return a;
      };
      Array.isArray(f) ? a(f) : f.sc(a);
    }
    return f;
  }
  function ho() {
    co.call(this);
  }
  v(ho, co);
  function io(a) {
    return "string" === typeof a
      ? (a = JSON.parse(a))
        ? a
        : null
      : null !== a
      ? a
      : null;
  }
  k = ho.prototype;
  k.Y = function() {
    return "json";
  };
  k.bc = function(a, b) {
    return this.gd(io(a), eo(this, a, b));
  };
  k.La = function(a, b) {
    return this.Sf(io(a), eo(this, a, b));
  };
  k.hd = function(a, b) {
    return this.ci(io(a), eo(this, a, b));
  };
  k.Wa = function(a) {
    return this.ii(io(a));
  };
  k.Od = function(a, b) {
    return JSON.stringify(this.md(a, b));
  };
  k.ec = function(a, b) {
    return JSON.stringify(this.Se(a, b));
  };
  k.od = function(a, b) {
    return JSON.stringify(this.Te(a, b));
  };
  function jo(a, b, c, d, e, f) {
    var g = NaN,
      h = NaN,
      l = (c - b) / d;
    if (0 !== l)
      if (1 == l) (g = a[b]), (h = a[b + 1]);
      else if (2 == l)
        (g = (1 - e) * a[b] + e * a[b + d]),
          (h = (1 - e) * a[b + 1] + e * a[b + d + 1]);
      else {
        var h = a[b],
          l = a[b + 1],
          m = 0,
          g = [0],
          p;
        for (p = b + d; p < c; p += d) {
          var n = a[p],
            q = a[p + 1],
            m = m + Math.sqrt((n - h) * (n - h) + (q - l) * (q - l));
          g.push(m);
          h = n;
          l = q;
        }
        c = e * m;
        l = 0;
        m = g.length;
        for (p = !1; l < m; )
          (e = l + ((m - l) >> 1)),
            (h = +Ya(g[e], c)),
            0 > h ? (l = e + 1) : ((m = e), (p = !h));
        e = p ? l : ~l;
        0 > e
          ? ((c = (c - g[-e - 2]) / (g[-e - 1] - g[-e - 2])),
            (b += (-e - 2) * d),
            (g = pa(a[b], a[b + d], c)),
            (h = pa(a[b + 1], a[b + d + 1], c)))
          : ((g = a[b + e * d]), (h = a[b + e * d + 1]));
      }
    return f ? ((f[0] = g), (f[1] = h), f) : [g, h];
  }
  function ko(a, b, c, d, e, f) {
    if (c == b) return null;
    if (e < a[b + d - 1])
      return f ? ((c = a.slice(b, b + d)), (c[d - 1] = e), c) : null;
    if (a[c - 1] < e)
      return f ? ((c = a.slice(c - d, c)), (c[d - 1] = e), c) : null;
    if (e == a[b + d - 1]) return a.slice(b, b + d);
    b /= d;
    for (c /= d; b < c; )
      (f = (b + c) >> 1), e < a[(f + 1) * d - 1] ? (c = f) : (b = f + 1);
    c = a[b * d - 1];
    if (e == c) return a.slice((b - 1) * d, (b - 1) * d + d);
    f = (e - c) / (a[(b + 1) * d - 1] - c);
    c = [];
    var g;
    for (g = 0; g < d - 1; ++g) c.push(pa(a[(b - 1) * d + g], a[b * d + g], f));
    c.push(e);
    return c;
  }
  function lo(a, b, c, d, e, f) {
    var g = 0;
    if (f) return ko(a, g, b[b.length - 1], c, d, e);
    if (d < a[c - 1])
      return e ? ((a = a.slice(0, c)), (a[c - 1] = d), a) : null;
    if (a[a.length - 1] < d)
      return e ? ((a = a.slice(a.length - c)), (a[c - 1] = d), a) : null;
    e = 0;
    for (f = b.length; e < f; ++e) {
      var h = b[e];
      if (g != h) {
        if (d < a[g + c - 1]) break;
        if (d <= a[h - 1]) return ko(a, g, h, c, d, !1);
        g = h;
      }
    }
    return null;
  }
  function P(a, b) {
    Uc.call(this);
    this.c = null;
    this.A = this.C = this.l = -1;
    this.qa(a, b);
  }
  v(P, Uc);
  k = P.prototype;
  k.Dj = function(a) {
    this.B ? bb(this.B, a) : (this.B = a.slice());
    this.s();
  };
  k.clone = function() {
    var a = new P(null);
    a.da(this.ka, this.B.slice());
    return a;
  };
  k.Ab = function(a, b, c, d) {
    if (d < Lb(this.G(), a, b)) return d;
    this.A != this.g &&
      ((this.C = Math.sqrt(bd(this.B, 0, this.B.length, this.a, 0))),
      (this.A = this.g));
    return dd(this.B, 0, this.B.length, this.a, this.C, !1, a, b, c, d);
  };
  k.Sj = function(a, b) {
    return td(this.B, 0, this.B.length, this.a, a, b);
  };
  k.pm = function(a, b) {
    return "XYM" != this.ka && "XYZM" != this.ka
      ? null
      : ko(this.B, 0, this.B.length, this.a, a, void 0 !== b ? b : !1);
  };
  k.$ = function() {
    return id(this.B, 0, this.B.length, this.a);
  };
  k.Kg = function(a, b) {
    return jo(this.B, 0, this.B.length, this.a, a, b);
  };
  k.qm = function() {
    var a = this.B,
      b = this.a,
      c = a[0],
      d = a[1],
      e = 0,
      f;
    for (f = 0 + b; f < this.B.length; f += b)
      var g = a[f],
        h = a[f + 1],
        e = e + Math.sqrt((g - c) * (g - c) + (h - d) * (h - d)),
        c = g,
        d = h;
    return e;
  };
  function Qi(a) {
    a.l != a.g && ((a.c = a.Kg(0.5, a.c)), (a.l = a.g));
    return a.c;
  }
  k.$c = function(a) {
    var b = [];
    b.length = kd(this.B, 0, this.B.length, this.a, a, b, 0);
    a = new P(null);
    a.da("XY", b);
    return a;
  };
  k.Y = function() {
    return "LineString";
  };
  k.Ta = function(a) {
    return ud(this.B, 0, this.B.length, this.a, a);
  };
  k.qa = function(a, b) {
    a
      ? (Yc(this, b, a, 1),
        this.B || (this.B = []),
        (this.B.length = gd(this.B, 0, a, this.a)),
        this.s())
      : this.da("XY", null);
  };
  k.da = function(a, b) {
    Xc(this, a, b);
    this.s();
  };
  function Q(a, b) {
    Uc.call(this);
    this.c = [];
    this.l = this.A = -1;
    this.qa(a, b);
  }
  v(Q, Uc);
  k = Q.prototype;
  k.Ej = function(a) {
    this.B ? bb(this.B, a.ia().slice()) : (this.B = a.ia().slice());
    this.c.push(this.B.length);
    this.s();
  };
  k.clone = function() {
    var a = new Q(null);
    a.da(this.ka, this.B.slice(), this.c.slice());
    return a;
  };
  k.Ab = function(a, b, c, d) {
    if (d < Lb(this.G(), a, b)) return d;
    this.l != this.g &&
      ((this.A = Math.sqrt(cd(this.B, 0, this.c, this.a, 0))),
      (this.l = this.g));
    return ed(this.B, 0, this.c, this.a, this.A, !1, a, b, c, d);
  };
  k.sm = function(a, b, c) {
    return ("XYM" != this.ka && "XYZM" != this.ka) || 0 === this.B.length
      ? null
      : lo(
          this.B,
          this.c,
          this.a,
          a,
          void 0 !== b ? b : !1,
          void 0 !== c ? c : !1
        );
  };
  k.$ = function() {
    return jd(this.B, 0, this.c, this.a);
  };
  k.Kb = function() {
    return this.c;
  };
  k.mk = function(a) {
    if (0 > a || this.c.length <= a) return null;
    var b = new P(null);
    b.da(this.ka, this.B.slice(0 === a ? 0 : this.c[a - 1], this.c[a]));
    return b;
  };
  k.Yc = function() {
    var a = this.B,
      b = this.c,
      c = this.ka,
      d = [],
      e = 0,
      f,
      g;
    f = 0;
    for (g = b.length; f < g; ++f) {
      var h = b[f],
        l = new P(null);
      l.da(c, a.slice(e, h));
      d.push(l);
      e = h;
    }
    return d;
  };
  function Ri(a) {
    var b = [],
      c = a.B,
      d = 0,
      e = a.c;
    a = a.a;
    var f, g;
    f = 0;
    for (g = e.length; f < g; ++f) {
      var h = e[f],
        d = jo(c, d, h, a, 0.5);
      bb(b, d);
      d = h;
    }
    return b;
  }
  k.$c = function(a) {
    var b = [],
      c = [],
      d = this.B,
      e = this.c,
      f = this.a,
      g = 0,
      h = 0,
      l,
      m;
    l = 0;
    for (m = e.length; l < m; ++l) {
      var p = e[l],
        h = kd(d, g, p, f, a, b, h);
      c.push(h);
      g = p;
    }
    b.length = h;
    a = new Q(null);
    a.da("XY", b, c);
    return a;
  };
  k.Y = function() {
    return "MultiLineString";
  };
  k.Ta = function(a) {
    a: {
      var b = this.B,
        c = this.c,
        d = this.a,
        e = 0,
        f,
        g;
      f = 0;
      for (g = c.length; f < g; ++f) {
        if (ud(b, e, c[f], d, a)) {
          a = !0;
          break a;
        }
        e = c[f];
      }
      a = !1;
    }
    return a;
  };
  k.qa = function(a, b) {
    if (a) {
      Yc(this, b, a, 2);
      this.B || (this.B = []);
      var c = hd(this.B, 0, a, this.a, this.c);
      this.B.length = 0 === c.length ? 0 : c[c.length - 1];
      this.s();
    } else this.da("XY", null, this.c);
  };
  k.da = function(a, b, c) {
    Xc(this, a, b);
    this.c = c;
    this.s();
  };
  function mo(a, b) {
    var c = a.ka,
      d = [],
      e = [],
      f,
      g;
    f = 0;
    for (g = b.length; f < g; ++f) {
      var h = b[f];
      0 === f && (c = h.ka);
      bb(d, h.ia());
      e.push(d.length);
    }
    a.da(c, d, e);
  }
  function R(a, b) {
    Uc.call(this);
    this.qa(a, b);
  }
  v(R, Uc);
  k = R.prototype;
  k.Gj = function(a) {
    this.B ? bb(this.B, a.ia()) : (this.B = a.ia().slice());
    this.s();
  };
  k.clone = function() {
    var a = new R(null);
    a.da(this.ka, this.B.slice());
    return a;
  };
  k.Ab = function(a, b, c, d) {
    if (d < Lb(this.G(), a, b)) return d;
    var e = this.B,
      f = this.a,
      g,
      h,
      l;
    g = 0;
    for (h = e.length; g < h; g += f)
      if (((l = ma(a, b, e[g], e[g + 1])), l < d)) {
        d = l;
        for (l = 0; l < f; ++l) c[l] = e[g + l];
        c.length = f;
      }
    return d;
  };
  k.$ = function() {
    return id(this.B, 0, this.B.length, this.a);
  };
  k.yk = function(a) {
    var b = this.B ? this.B.length / this.a : 0;
    if (0 > a || b <= a) return null;
    b = new C(null);
    b.da(this.ka, this.B.slice(a * this.a, (a + 1) * this.a));
    return b;
  };
  k.re = function() {
    var a = this.B,
      b = this.ka,
      c = this.a,
      d = [],
      e,
      f;
    e = 0;
    for (f = a.length; e < f; e += c) {
      var g = new C(null);
      g.da(b, a.slice(e, e + c));
      d.push(g);
    }
    return d;
  };
  k.Y = function() {
    return "MultiPoint";
  };
  k.Ta = function(a) {
    var b = this.B,
      c = this.a,
      d,
      e,
      f,
      g;
    d = 0;
    for (e = b.length; d < e; d += c)
      if (((f = b[d]), (g = b[d + 1]), Nb(a, f, g))) return !0;
    return !1;
  };
  k.qa = function(a, b) {
    a
      ? (Yc(this, b, a, 1),
        this.B || (this.B = []),
        (this.B.length = gd(this.B, 0, a, this.a)),
        this.s())
      : this.da("XY", null);
  };
  k.da = function(a, b) {
    Xc(this, a, b);
    this.s();
  };
  function S(a, b) {
    Uc.call(this);
    this.c = [];
    this.A = -1;
    this.C = null;
    this.P = this.D = this.L = -1;
    this.l = null;
    this.qa(a, b);
  }
  v(S, Uc);
  k = S.prototype;
  k.Hj = function(a) {
    if (this.B) {
      var b = this.B.length;
      bb(this.B, a.ia());
      a = a.Kb().slice();
      var c, d;
      c = 0;
      for (d = a.length; c < d; ++c) a[c] += b;
    } else (this.B = a.ia().slice()), (a = a.Kb().slice()), this.c.push();
    this.c.push(a);
    this.s();
  };
  k.clone = function() {
    for (
      var a = new S(null), b = this.c.length, c = Array(b), d = 0;
      d < b;
      ++d
    )
      c[d] = this.c[d].slice();
    no(a, this.ka, this.B.slice(), c);
    return a;
  };
  k.Ab = function(a, b, c, d) {
    if (d < Lb(this.G(), a, b)) return d;
    if (this.D != this.g) {
      var e = this.c,
        f = 0,
        g = 0,
        h,
        l;
      h = 0;
      for (l = e.length; h < l; ++h)
        var m = e[h], g = cd(this.B, f, m, this.a, g), f = m[m.length - 1];
      this.L = Math.sqrt(g);
      this.D = this.g;
    }
    e = Si(this);
    f = this.c;
    g = this.a;
    h = this.L;
    l = 0;
    var m = [NaN, NaN],
      p,
      n;
    p = 0;
    for (n = f.length; p < n; ++p) {
      var q = f[p];
      d = ed(e, l, q, g, h, !0, a, b, c, d, m);
      l = q[q.length - 1];
    }
    return d;
  };
  k.Hc = function(a, b) {
    var c;
    a: {
      c = Si(this);
      var d = this.c,
        e = this.a,
        f = 0;
      if (0 !== d.length) {
        var g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
          var l = d[g];
          if (rd(c, f, l, e, a, b)) {
            c = !0;
            break a;
          }
          f = l[l.length - 1];
        }
      }
      c = !1;
    }
    return c;
  };
  k.tm = function() {
    var a = Si(this),
      b = this.c,
      c = 0,
      d = 0,
      e,
      f;
    e = 0;
    for (f = b.length; e < f; ++e)
      var g = b[e], d = d + $c(a, c, g, this.a), c = g[g.length - 1];
    return d;
  };
  k.$ = function(a) {
    var b;
    void 0 !== a
      ? ((b = Si(this).slice()), zd(b, this.c, this.a, a))
      : (b = this.B);
    a = b;
    b = this.c;
    var c = this.a,
      d = 0,
      e = [],
      f = 0,
      g,
      h;
    g = 0;
    for (h = b.length; g < h; ++g) {
      var l = b[g];
      e[f++] = jd(a, d, l, c, e[f]);
      d = l[l.length - 1];
    }
    e.length = f;
    return e;
  };
  function Ti(a) {
    if (a.A != a.g) {
      var b = a.B,
        c = a.c,
        d = a.a,
        e = 0,
        f = [],
        g,
        h;
      g = 0;
      for (h = c.length; g < h; ++g) {
        var l = c[g],
          e = Tb(b, e, l[0], d);
        f.push((e[0] + e[2]) / 2, (e[1] + e[3]) / 2);
        e = l[l.length - 1];
      }
      b = Si(a);
      c = a.c;
      d = a.a;
      g = 0;
      h = [];
      l = 0;
      for (e = c.length; l < e; ++l) {
        var m = c[l];
        h = sd(b, g, m, d, f, 2 * l, h);
        g = m[m.length - 1];
      }
      a.C = h;
      a.A = a.g;
    }
    return a.C;
  }
  k.jk = function() {
    var a = new R(null);
    a.da("XY", Ti(this).slice());
    return a;
  };
  function Si(a) {
    if (a.P != a.g) {
      var b = a.B,
        c;
      a: {
        c = a.c;
        var d, e;
        d = 0;
        for (e = c.length; d < e; ++d)
          if (!xd(b, c[d], a.a, void 0)) {
            c = !1;
            break a;
          }
        c = !0;
      }
      c ? (a.l = b) : ((a.l = b.slice()), (a.l.length = zd(a.l, a.c, a.a)));
      a.P = a.g;
    }
    return a.l;
  }
  k.$c = function(a) {
    var b = [],
      c = [],
      d = this.B,
      e = this.c,
      f = this.a;
    a = Math.sqrt(a);
    var g = 0,
      h = 0,
      l,
      m;
    l = 0;
    for (m = e.length; l < m; ++l) {
      var p = e[l],
        n = [],
        h = ld(d, g, p, f, a, b, h, n);
      c.push(n);
      g = p[p.length - 1];
    }
    b.length = h;
    d = new S(null);
    no(d, "XY", b, c);
    return d;
  };
  k.zk = function(a) {
    if (0 > a || this.c.length <= a) return null;
    var b;
    0 === a ? (b = 0) : ((b = this.c[a - 1]), (b = b[b.length - 1]));
    a = this.c[a].slice();
    var c = a[a.length - 1];
    if (0 !== b) {
      var d, e;
      d = 0;
      for (e = a.length; d < e; ++d) a[d] -= b;
    }
    d = new E(null);
    d.da(this.ka, this.B.slice(b, c), a);
    return d;
  };
  k.Ad = function() {
    var a = this.ka,
      b = this.B,
      c = this.c,
      d = [],
      e = 0,
      f,
      g,
      h,
      l;
    f = 0;
    for (g = c.length; f < g; ++f) {
      var m = c[f].slice(),
        p = m[m.length - 1];
      if (0 !== e) for (h = 0, l = m.length; h < l; ++h) m[h] -= e;
      h = new E(null);
      h.da(a, b.slice(e, p), m);
      d.push(h);
      e = p;
    }
    return d;
  };
  k.Y = function() {
    return "MultiPolygon";
  };
  k.Ta = function(a) {
    a: {
      var b = Si(this),
        c = this.c,
        d = this.a,
        e = 0,
        f,
        g;
      f = 0;
      for (g = c.length; f < g; ++f) {
        var h = c[f];
        if (vd(b, e, h, d, a)) {
          a = !0;
          break a;
        }
        e = h[h.length - 1];
      }
      a = !1;
    }
    return a;
  };
  k.qa = function(a, b) {
    if (a) {
      Yc(this, b, a, 3);
      this.B || (this.B = []);
      var c = this.B,
        d = this.a,
        e = this.c,
        f = 0,
        e = e ? e : [],
        g = 0,
        h,
        l;
      h = 0;
      for (l = a.length; h < l; ++h)
        (f = hd(c, f, a[h], d, e[g])), (e[g++] = f), (f = f[f.length - 1]);
      e.length = g;
      0 === e.length
        ? (this.B.length = 0)
        : ((c = e[e.length - 1]),
          (this.B.length = 0 === c.length ? 0 : c[c.length - 1]));
      this.s();
    } else no(this, "XY", null, this.c);
  };
  function no(a, b, c, d) {
    Xc(a, b, c);
    a.c = d;
    a.s();
  }
  function oo(a, b) {
    var c = a.ka,
      d = [],
      e = [],
      f,
      g,
      h;
    f = 0;
    for (g = b.length; f < g; ++f) {
      var l = b[f];
      0 === f && (c = l.ka);
      var m = d.length;
      h = l.Kb();
      var p, n;
      p = 0;
      for (n = h.length; p < n; ++p) h[p] += m;
      bb(d, l.ia());
      e.push(h);
    }
    no(a, c, d, e);
  }
  function po(a) {
    a = a ? a : {};
    co.call(this);
    this.b = a.geometryName;
  }
  v(po, ho);
  function qo(a, b) {
    if (!a) return null;
    var c;
    if ("number" === typeof a.x && "number" === typeof a.y) c = "Point";
    else if (a.points) c = "MultiPoint";
    else if (a.paths)
      c = 1 === a.paths.length ? "LineString" : "MultiLineString";
    else if (a.rings) {
      var d = a.rings,
        e = ro(a),
        f = [];
      c = [];
      var g, h;
      g = 0;
      for (h = d.length; g < h; ++g) {
        var l = ab(d[g]);
        wd(l, 0, l.length, e.length) ? f.push([d[g]]) : c.push(d[g]);
      }
      for (; c.length; ) {
        d = c.shift();
        e = !1;
        for (g = f.length - 1; 0 <= g; g--)
          if (Ob(new md(f[g][0]).G(), new md(d).G())) {
            f[g].push(d);
            e = !0;
            break;
          }
        e || f.push([d.reverse()]);
      }
      a = ta({}, a);
      1 === f.length
        ? ((c = "Polygon"), (a.rings = f[0]))
        : ((c = "MultiPolygon"), (a.rings = f));
    }
    return go((0, so[c])(a), !1, b);
  }
  function ro(a) {
    var b = "XY";
    !0 === a.hasZ && !0 === a.hasM
      ? (b = "XYZM")
      : !0 === a.hasZ
      ? (b = "XYZ")
      : !0 === a.hasM && (b = "XYM");
    return b;
  }
  function to(a) {
    a = a.ka;
    return {
      hasZ: "XYZ" === a || "XYZM" === a,
      hasM: "XYM" === a || "XYZM" === a
    };
  }
  var so = {
      Point: function(a) {
        return void 0 !== a.m && void 0 !== a.z
          ? new C([a.x, a.y, a.z, a.m], "XYZM")
          : void 0 !== a.z
          ? new C([a.x, a.y, a.z], "XYZ")
          : void 0 !== a.m
          ? new C([a.x, a.y, a.m], "XYM")
          : new C([a.x, a.y]);
      },
      LineString: function(a) {
        return new P(a.paths[0], ro(a));
      },
      Polygon: function(a) {
        return new E(a.rings, ro(a));
      },
      MultiPoint: function(a) {
        return new R(a.points, ro(a));
      },
      MultiLineString: function(a) {
        return new Q(a.paths, ro(a));
      },
      MultiPolygon: function(a) {
        return new S(a.rings, ro(a));
      }
    },
    uo = {
      Point: function(a) {
        var b = a.$(),
          c;
        a = a.ka;
        "XYZ" === a
          ? (c = { x: b[0], y: b[1], z: b[2] })
          : "XYM" === a
          ? (c = { x: b[0], y: b[1], m: b[2] })
          : "XYZM" === a
          ? (c = { x: b[0], y: b[1], z: b[2], m: b[3] })
          : "XY" === a
          ? (c = { x: b[0], y: b[1] })
          : ha(!1, 34);
        return c;
      },
      LineString: function(a) {
        var b = to(a);
        return { hasZ: b.hasZ, hasM: b.hasM, paths: [a.$()] };
      },
      Polygon: function(a) {
        var b = to(a);
        return { hasZ: b.hasZ, hasM: b.hasM, rings: a.$(!1) };
      },
      MultiPoint: function(a) {
        var b = to(a);
        return { hasZ: b.hasZ, hasM: b.hasM, points: a.$() };
      },
      MultiLineString: function(a) {
        var b = to(a);
        return { hasZ: b.hasZ, hasM: b.hasM, paths: a.$() };
      },
      MultiPolygon: function(a) {
        var b = to(a);
        a = a.$(!1);
        for (var c = [], d = 0; d < a.length; d++)
          for (var e = a[d].length - 1; 0 <= e; e--) c.push(a[d][e]);
        return { hasZ: b.hasZ, hasM: b.hasM, rings: c };
      }
    };
  k = po.prototype;
  k.gd = function(a, b) {
    var c = qo(a.geometry, b),
      d = new J();
    this.b && d.Nc(this.b);
    d.Pa(c);
    b && b.zf && a.attributes[b.zf] && d.cc(a.attributes[b.zf]);
    a.attributes && d.I(a.attributes);
    return d;
  };
  k.Sf = function(a, b) {
    var c = b ? b : {};
    if (a.features) {
      var d = [],
        e = a.features,
        f,
        g;
      c.zf = a.objectIdFieldName;
      f = 0;
      for (g = e.length; f < g; ++f) d.push(this.gd(e[f], c));
      return d;
    }
    return [this.gd(a, c)];
  };
  k.ci = function(a, b) {
    return qo(a, b);
  };
  k.ii = function(a) {
    return a.spatialReference && a.spatialReference.wkid
      ? zc("EPSG:" + a.spatialReference.wkid)
      : null;
  };
  function vo(a, b) {
    return (0, uo[a.Y()])(go(a, !0, b), b);
  }
  k.Te = function(a, b) {
    return vo(a, fo(this, b));
  };
  k.md = function(a, b) {
    b = fo(this, b);
    var c = {},
      d = a.V();
    d && (c.geometry = vo(d, b));
    d = a.R();
    delete d[a.a];
    c.attributes = wa(d) ? {} : d;
    b &&
      b.featureProjection &&
      (c.spatialReference = {
        wkid: zc(b.featureProjection)
          .hb.split(":")
          .pop()
      });
    return c;
  };
  k.Se = function(a, b) {
    b = fo(this, b);
    var c = [],
      d,
      e;
    d = 0;
    for (e = a.length; d < e; ++d) c.push(this.md(a[d], b));
    return { features: c };
  };
  function wo(a) {
    this.Nb = a;
  }
  function zo(a) {
    this.Nb = a;
  }
  v(zo, wo);
  function Ao(a, b, c) {
    this.Nb = a;
    this.b = b;
    this.a = c;
  }
  v(Ao, zo);
  function Bo(a, b) {
    Ao.call(this, "And", a, b);
  }
  v(Bo, Ao);
  function Co(a, b, c) {
    this.Nb = "BBOX";
    this.geometryName = a;
    this.extent = b;
    this.srsName = c;
  }
  v(Co, wo);
  function Do(a, b) {
    this.Nb = a;
    this.b = b;
  }
  v(Do, wo);
  function Eo(a, b, c, d) {
    Do.call(this, a, b);
    this.g = c;
    this.a = d;
  }
  v(Eo, Do);
  function Fo(a, b, c) {
    Eo.call(this, "PropertyIsEqualTo", a, b, c);
  }
  v(Fo, Eo);
  function Go(a, b) {
    Eo.call(this, "PropertyIsGreaterThan", a, b);
  }
  v(Go, Eo);
  function Ho(a, b) {
    Eo.call(this, "PropertyIsGreaterThanOrEqualTo", a, b);
  }
  v(Ho, Eo);
  function Io(a, b, c, d) {
    this.Nb = a;
    this.geometryName = b || "the_geom";
    this.geometry = c;
    this.srsName = d;
  }
  v(Io, wo);
  function Jo(a, b, c) {
    Io.call(this, "Intersects", a, b, c);
  }
  v(Jo, Io);
  function Ko(a, b, c) {
    Do.call(this, "PropertyIsBetween", a);
    this.a = b;
    this.g = c;
  }
  v(Ko, Do);
  function Lo(a, b, c, d, e, f) {
    Do.call(this, "PropertyIsLike", a);
    this.f = b;
    this.i = void 0 !== c ? c : "*";
    this.c = void 0 !== d ? d : ".";
    this.g = void 0 !== e ? e : "!";
    this.a = f;
  }
  v(Lo, Do);
  function Mo(a) {
    Do.call(this, "PropertyIsNull", a);
  }
  v(Mo, Do);
  function No(a, b) {
    Eo.call(this, "PropertyIsLessThan", a, b);
  }
  v(No, Eo);
  function Oo(a, b) {
    Eo.call(this, "PropertyIsLessThanOrEqualTo", a, b);
  }
  v(Oo, Eo);
  function Po(a) {
    this.Nb = "Not";
    this.condition = a;
  }
  v(Po, zo);
  function Qo(a, b, c) {
    Eo.call(this, "PropertyIsNotEqualTo", a, b, c);
  }
  v(Qo, Eo);
  function Ro(a, b) {
    Ao.call(this, "Or", a, b);
  }
  v(Ro, Ao);
  function So(a, b, c) {
    Io.call(this, "Within", a, b, c);
  }
  v(So, Io);
  function To(a, b) {
    return new Bo(a, b);
  }
  function Uo(a, b, c) {
    return new Co(a, b, c);
  }
  function Vo(a) {
    Rc.call(this);
    this.f = a ? a : null;
    Wo(this);
  }
  v(Vo, Rc);
  function Xo(a) {
    var b = [],
      c,
      d;
    c = 0;
    for (d = a.length; c < d; ++c) b.push(a[c].clone());
    return b;
  }
  function Yo(a) {
    var b, c;
    if (a.f)
      for (b = 0, c = a.f.length; b < c; ++b) Ea(a.f[b], "change", a.s, a);
  }
  function Wo(a) {
    var b, c;
    if (a.f)
      for (b = 0, c = a.f.length; b < c; ++b) B(a.f[b], "change", a.s, a);
  }
  k = Vo.prototype;
  k.clone = function() {
    var a = new Vo(null);
    a.ti(this.f);
    return a;
  };
  k.Ab = function(a, b, c, d) {
    if (d < Lb(this.G(), a, b)) return d;
    var e = this.f,
      f,
      g;
    f = 0;
    for (g = e.length; f < g; ++f) d = e[f].Ab(a, b, c, d);
    return d;
  };
  k.Hc = function(a, b) {
    var c = this.f,
      d,
      e;
    d = 0;
    for (e = c.length; d < e; ++d) if (c[d].Hc(a, b)) return !0;
    return !1;
  };
  k.Yd = function(a) {
    Rb(Infinity, Infinity, -Infinity, -Infinity, a);
    for (var b = this.f, c = 0, d = b.length; c < d; ++c) Wb(a, b[c].G());
    return a;
  };
  k.pf = function() {
    return Xo(this.f);
  };
  k.Bd = function(a) {
    this.o != this.g && (ua(this.i), (this.j = 0), (this.o = this.g));
    if (0 > a || (0 !== this.j && a < this.j)) return this;
    var b = a.toString();
    if (this.i.hasOwnProperty(b)) return this.i[b];
    var c = [],
      d = this.f,
      e = !1,
      f,
      g;
    f = 0;
    for (g = d.length; f < g; ++f) {
      var h = d[f],
        l = h.Bd(a);
      c.push(l);
      l !== h && (e = !0);
    }
    if (e)
      return (
        (a = new Vo(null)), Yo(a), (a.f = c), Wo(a), a.s(), (this.i[b] = a)
      );
    this.j = a;
    return this;
  };
  k.Y = function() {
    return "GeometryCollection";
  };
  k.Ta = function(a) {
    var b = this.f,
      c,
      d;
    c = 0;
    for (d = b.length; c < d; ++c) if (b[c].Ta(a)) return !0;
    return !1;
  };
  k.rotate = function(a, b) {
    for (var c = this.f, d = 0, e = c.length; d < e; ++d) c[d].rotate(a, b);
    this.s();
  };
  k.scale = function(a, b, c) {
    c || (c = gc(this.G()));
    for (var d = this.f, e = 0, f = d.length; e < f; ++e) d[e].scale(a, b, c);
    this.s();
  };
  k.ti = function(a) {
    a = Xo(a);
    Yo(this);
    this.f = a;
    Wo(this);
    this.s();
  };
  k.sc = function(a) {
    var b = this.f,
      c,
      d;
    c = 0;
    for (d = b.length; c < d; ++c) b[c].sc(a);
    this.s();
  };
  k.translate = function(a, b) {
    var c = this.f,
      d,
      e;
    d = 0;
    for (e = c.length; d < e; ++d) c[d].translate(a, b);
    this.s();
  };
  k.oa = function() {
    Yo(this);
    Rc.prototype.oa.call(this);
  };
  function Zo(a) {
    a = a ? a : {};
    co.call(this);
    this.defaultDataProjection = zc(
      a.defaultDataProjection ? a.defaultDataProjection : "EPSG:4326"
    );
    a.featureProjection && (this.j = zc(a.featureProjection));
    this.b = a.geometryName;
  }
  v(Zo, ho);
  function $o(a, b) {
    return a ? go((0, ap[a.type])(a), !1, b) : null;
  }
  function bp(a, b) {
    return (0, cp[a.Y()])(go(a, !0, b), b);
  }
  var ap = {
      Point: function(a) {
        return new C(a.coordinates);
      },
      LineString: function(a) {
        return new P(a.coordinates);
      },
      Polygon: function(a) {
        return new E(a.coordinates);
      },
      MultiPoint: function(a) {
        return new R(a.coordinates);
      },
      MultiLineString: function(a) {
        return new Q(a.coordinates);
      },
      MultiPolygon: function(a) {
        return new S(a.coordinates);
      },
      GeometryCollection: function(a, b) {
        var c = a.geometries.map(function(a) {
          return $o(a, b);
        });
        return new Vo(c);
      }
    },
    cp = {
      Point: function(a) {
        return { type: "Point", coordinates: a.$() };
      },
      LineString: function(a) {
        return { type: "LineString", coordinates: a.$() };
      },
      Polygon: function(a, b) {
        var c;
        b && (c = b.rightHanded);
        return { type: "Polygon", coordinates: a.$(c) };
      },
      MultiPoint: function(a) {
        return { type: "MultiPoint", coordinates: a.$() };
      },
      MultiLineString: function(a) {
        return { type: "MultiLineString", coordinates: a.$() };
      },
      MultiPolygon: function(a, b) {
        var c;
        b && (c = b.rightHanded);
        return { type: "MultiPolygon", coordinates: a.$(c) };
      },
      GeometryCollection: function(a, b) {
        return {
          type: "GeometryCollection",
          geometries: a.f.map(function(a) {
            var d = ta({}, b);
            delete d.featureProjection;
            return bp(a, d);
          })
        };
      },
      Circle: function() {
        return { type: "GeometryCollection", geometries: [] };
      }
    };
  k = Zo.prototype;
  k.gd = function(a, b) {
    var c;
    c = "Feature" === a.type ? a : { type: "Feature", geometry: a };
    var d = $o(c.geometry, b),
      e = new J();
    this.b && e.Nc(this.b);
    e.Pa(d);
    void 0 !== c.id && e.cc(c.id);
    c.properties && e.I(c.properties);
    return e;
  };
  k.Sf = function(a, b) {
    var c;
    if ("FeatureCollection" === a.type) {
      c = [];
      var d = a.features,
        e,
        f;
      e = 0;
      for (f = d.length; e < f; ++e) c.push(this.gd(d[e], b));
    } else c = [this.gd(a, b)];
    return c;
  };
  k.ci = function(a, b) {
    return $o(a, b);
  };
  k.ii = function(a) {
    a = a.crs;
    var b;
    a
      ? "name" == a.type
        ? (b = zc(a.properties.name))
        : "EPSG" == a.type
        ? (b = zc("EPSG:" + a.properties.code))
        : ha(!1, 36)
      : (b = this.defaultDataProjection);
    return b;
  };
  k.md = function(a, b) {
    b = fo(this, b);
    var c = { type: "Feature" },
      d = a.f;
    void 0 !== d && (c.id = d);
    (d = a.V()) ? (c.geometry = bp(d, b)) : (c.geometry = null);
    d = a.R();
    delete d[a.a];
    wa(d) ? (c.properties = null) : (c.properties = d);
    return c;
  };
  k.Se = function(a, b) {
    b = fo(this, b);
    var c = [],
      d,
      e;
    d = 0;
    for (e = a.length; d < e; ++d) c.push(this.md(a[d], b));
    return { type: "FeatureCollection", features: c };
  };
  k.Te = function(a, b) {
    return bp(a, fo(this, b));
  };
  function dp() {
    this.f = new XMLSerializer();
    co.call(this);
  }
  v(dp, co);
  k = dp.prototype;
  k.Y = function() {
    return "xml";
  };
  k.bc = function(a, b) {
    if (Nn(a)) return ep(this, a, b);
    if (On(a)) return this.ai(a, b);
    if ("string" === typeof a) {
      var c = Pn(a);
      return ep(this, c, b);
    }
    return null;
  };
  function ep(a, b, c) {
    a = fp(a, b, c);
    return 0 < a.length ? a[0] : null;
  }
  k.La = function(a, b) {
    if (Nn(a)) return fp(this, a, b);
    if (On(a)) return this.oc(a, b);
    if ("string" === typeof a) {
      var c = Pn(a);
      return fp(this, c, b);
    }
    return [];
  };
  function fp(a, b, c) {
    var d = [];
    for (b = b.firstChild; b; b = b.nextSibling)
      b.nodeType == Node.ELEMENT_NODE && bb(d, a.oc(b, c));
    return d;
  }
  k.hd = function(a, b) {
    if (Nn(a)) return this.u(a, b);
    if (On(a)) {
      var c = this.Ee(a, [eo(this, a, b ? b : {})]);
      return c ? c : null;
    }
    return "string" === typeof a ? ((c = Pn(a)), this.u(c, b)) : null;
  };
  k.Wa = function(a) {
    return Nn(a)
      ? this.Xf(a)
      : On(a)
      ? this.He(a)
      : "string" === typeof a
      ? ((a = Pn(a)), this.Xf(a))
      : null;
  };
  k.Xf = function() {
    return this.defaultDataProjection;
  };
  k.He = function() {
    return this.defaultDataProjection;
  };
  k.Od = function(a, b) {
    var c = this.C(a, b);
    return this.f.serializeToString(c);
  };
  k.ec = function(a, b) {
    var c = this.a(a, b);
    return this.f.serializeToString(c);
  };
  k.od = function(a, b) {
    var c = this.H(a, b);
    return this.f.serializeToString(c);
  };
  function gp(a) {
    a = a ? a : {};
    this.featureType = a.featureType;
    this.featureNS = a.featureNS;
    this.srsName = a.srsName;
    this.schemaLocation = "";
    this.b = {};
    this.b["http://www.opengis.net/gml"] = {
      featureMember: Sn(gp.prototype.Id),
      featureMembers: Sn(gp.prototype.Id)
    };
    dp.call(this);
  }
  v(gp, dp);
  var hp = /^[\s\xa0]*$/;
  k = gp.prototype;
  k.Id = function(a, b) {
    var c = a.localName,
      d = null;
    if ("FeatureCollection" == c)
      "http://www.opengis.net/wfs" === a.namespaceURI
        ? (d = N([], this.b, a, b, this))
        : (d = N(null, this.b, a, b, this));
    else if ("featureMembers" == c || "featureMember" == c) {
      var e = b[0],
        f = e.featureType,
        g = e.featureNS,
        h,
        l;
      if (!f && a.childNodes) {
        f = [];
        g = {};
        h = 0;
        for (l = a.childNodes.length; h < l; ++h) {
          var m = a.childNodes[h];
          if (1 === m.nodeType) {
            var p = m.nodeName.split(":").pop();
            if (-1 === f.indexOf(p)) {
              var n = "",
                q = 0,
                m = m.namespaceURI,
                r;
              for (r in g) {
                if (g[r] === m) {
                  n = r;
                  break;
                }
                ++q;
              }
              n || ((n = "p" + q), (g[n] = m));
              f.push(n + ":" + p);
            }
          }
        }
        "featureMember" != c && ((e.featureType = f), (e.featureNS = g));
      }
      "string" === typeof g && ((h = g), (g = {}), (g.p0 = h));
      var e = {},
        f = Array.isArray(f) ? f : [f],
        u;
      for (u in g) {
        p = {};
        h = 0;
        for (l = f.length; h < l; ++h)
          (-1 === f[h].indexOf(":") ? "p0" : f[h].split(":")[0]) === u &&
            (p[f[h].split(":").pop()] =
              "featureMembers" == c ? Rn(this.Rf, this) : Sn(this.Rf, this));
        e[g[u]] = p;
      }
      "featureMember" == c ? (d = N(void 0, e, a, b)) : (d = N([], e, a, b));
    }
    null === d && (d = []);
    return d;
  };
  k.Ee = function(a, b) {
    var c = b[0];
    c.srsName = a.firstElementChild.getAttribute("srsName");
    var d = N(null, this.lg, a, b, this);
    if (d) return go(d, !1, c);
  };
  k.Rf = function(a, b) {
    var c, d;
    (d = a.getAttribute("fid")) ||
      (d = a.getAttributeNS("http://www.opengis.net/gml", "id") || "");
    var e = {},
      f;
    for (c = a.firstElementChild; c; c = c.nextElementSibling) {
      var g = c.localName;
      if (
        0 === c.childNodes.length ||
        (1 === c.childNodes.length &&
          (3 === c.firstChild.nodeType || 4 === c.firstChild.nodeType))
      ) {
        var h = Ln(c, !1);
        hp.test(h) && (h = void 0);
        e[g] = h;
      } else "boundedBy" !== g && (f = g), (e[g] = this.Ee(c, b));
    }
    c = new J(e);
    f && c.Nc(f);
    d && c.cc(d);
    return c;
  };
  k.hi = function(a, b) {
    var c = this.De(a, b);
    if (c) {
      var d = new C(null);
      d.da("XYZ", c);
      return d;
    }
  };
  k.fi = function(a, b) {
    var c = N([], this.cj, a, b, this);
    if (c) return new R(c);
  };
  k.ei = function(a, b) {
    var c = N([], this.bj, a, b, this);
    if (c) {
      var d = new Q(null);
      mo(d, c);
      return d;
    }
  };
  k.gi = function(a, b) {
    var c = N([], this.dj, a, b, this);
    if (c) {
      var d = new S(null);
      oo(d, c);
      return d;
    }
  };
  k.Yh = function(a, b) {
    Zn(this.gj, a, b, this);
  };
  k.dh = function(a, b) {
    Zn(this.$i, a, b, this);
  };
  k.Zh = function(a, b) {
    Zn(this.hj, a, b, this);
  };
  k.Fe = function(a, b) {
    var c = this.De(a, b);
    if (c) {
      var d = new P(null);
      d.da("XYZ", c);
      return d;
    }
  };
  k.Do = function(a, b) {
    var c = N(null, this.Qd, a, b, this);
    if (c) return c;
  };
  k.di = function(a, b) {
    var c = this.De(a, b);
    if (c) {
      var d = new md(null);
      nd(d, "XYZ", c);
      return d;
    }
  };
  k.Ge = function(a, b) {
    var c = N([null], this.We, a, b, this);
    if (c && c[0]) {
      var d = new E(null),
        e = c[0],
        f = [e.length],
        g,
        h;
      g = 1;
      for (h = c.length; g < h; ++g) bb(e, c[g]), f.push(e.length);
      d.da("XYZ", e, f);
      return d;
    }
  };
  k.De = function(a, b) {
    return N(null, this.Qd, a, b, this);
  };
  k.cj = {
    "http://www.opengis.net/gml": {
      pointMember: Rn(gp.prototype.Yh),
      pointMembers: Rn(gp.prototype.Yh)
    }
  };
  k.bj = {
    "http://www.opengis.net/gml": {
      lineStringMember: Rn(gp.prototype.dh),
      lineStringMembers: Rn(gp.prototype.dh)
    }
  };
  k.dj = {
    "http://www.opengis.net/gml": {
      polygonMember: Rn(gp.prototype.Zh),
      polygonMembers: Rn(gp.prototype.Zh)
    }
  };
  k.gj = { "http://www.opengis.net/gml": { Point: Rn(gp.prototype.De) } };
  k.$i = { "http://www.opengis.net/gml": { LineString: Rn(gp.prototype.Fe) } };
  k.hj = { "http://www.opengis.net/gml": { Polygon: Rn(gp.prototype.Ge) } };
  k.Rd = { "http://www.opengis.net/gml": { LinearRing: Sn(gp.prototype.Do) } };
  k.oc = function(a, b) {
    var c = { featureType: this.featureType, featureNS: this.featureNS };
    b && ta(c, eo(this, a, b));
    return this.Id(a, [c]) || [];
  };
  k.He = function(a) {
    return zc(
      this.srsName ? this.srsName : a.firstElementChild.getAttribute("srsName")
    );
  };
  function ip(a) {
    a = Ln(a, !1);
    return jp(a);
  }
  function jp(a) {
    if ((a = /^\s*(true|1)|(false|0)\s*$/.exec(a)))
      return void 0 !== a[1] || !1;
  }
  function kp(a) {
    a = Ln(a, !1);
    a = Date.parse(a);
    return isNaN(a) ? void 0 : a / 1e3;
  }
  function lp(a) {
    a = Ln(a, !1);
    return mp(a);
  }
  function mp(a) {
    if ((a = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a)))
      return parseFloat(a[1]);
  }
  function np(a) {
    a = Ln(a, !1);
    return op(a);
  }
  function op(a) {
    if ((a = /^\s*(\d+)\s*$/.exec(a))) return parseInt(a[1], 10);
  }
  function T(a) {
    return Ln(a, !1).trim();
  }
  function pp(a, b) {
    qp(a, b ? "1" : "0");
  }
  function rp(a, b) {
    a.appendChild(Jn.createTextNode(b.toPrecision()));
  }
  function sp(a, b) {
    a.appendChild(Jn.createTextNode(b.toString()));
  }
  function qp(a, b) {
    a.appendChild(Jn.createTextNode(b));
  }
  function tp(a) {
    a = a ? a : {};
    gp.call(this, a);
    this.v = void 0 !== a.surface ? a.surface : !1;
    this.i = void 0 !== a.curve ? a.curve : !1;
    this.l = void 0 !== a.multiCurve ? a.multiCurve : !0;
    this.o = void 0 !== a.multiSurface ? a.multiSurface : !0;
    this.schemaLocation = a.schemaLocation
      ? a.schemaLocation
      : "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd";
  }
  v(tp, gp);
  k = tp.prototype;
  k.Ho = function(a, b) {
    var c = N([], this.aj, a, b, this);
    if (c) {
      var d = new Q(null);
      mo(d, c);
      return d;
    }
  };
  k.Io = function(a, b) {
    var c = N([], this.ej, a, b, this);
    if (c) {
      var d = new S(null);
      oo(d, c);
      return d;
    }
  };
  k.Cg = function(a, b) {
    Zn(this.Xi, a, b, this);
  };
  k.Gi = function(a, b) {
    Zn(this.lj, a, b, this);
  };
  k.Lo = function(a, b) {
    return N([null], this.fj, a, b, this);
  };
  k.Oo = function(a, b) {
    return N([null], this.kj, a, b, this);
  };
  k.Mo = function(a, b) {
    return N([null], this.We, a, b, this);
  };
  k.Go = function(a, b) {
    return N([null], this.Qd, a, b, this);
  };
  k.ql = function(a, b) {
    var c = N(void 0, this.Rd, a, b, this);
    c && b[b.length - 1].push(c);
  };
  k.Oj = function(a, b) {
    var c = N(void 0, this.Rd, a, b, this);
    c && (b[b.length - 1][0] = c);
  };
  k.ji = function(a, b) {
    var c = N([null], this.mj, a, b, this);
    if (c && c[0]) {
      var d = new E(null),
        e = c[0],
        f = [e.length],
        g,
        h;
      g = 1;
      for (h = c.length; g < h; ++g) bb(e, c[g]), f.push(e.length);
      d.da("XYZ", e, f);
      return d;
    }
  };
  k.$h = function(a, b) {
    var c = N([null], this.Yi, a, b, this);
    if (c) {
      var d = new P(null);
      d.da("XYZ", c);
      return d;
    }
  };
  k.Co = function(a, b) {
    var c = N([null], this.Zi, a, b, this);
    return Rb(c[1][0], c[1][1], c[2][0], c[2][1]);
  };
  k.Eo = function(a, b) {
    for (
      var c = Ln(a, !1),
        d = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/,
        e = [],
        f;
      (f = d.exec(c));

    )
      e.push(parseFloat(f[1])), (c = c.substr(f[0].length));
    if ("" === c) {
      c = b[0].srsName;
      d = "enu";
      c && (d = zc(c).b);
      if ("neu" === d)
        for (c = 0, d = e.length; c < d; c += 3)
          (f = e[c]), (e[c] = e[c + 1]), (e[c + 1] = f);
      c = e.length;
      2 == c && e.push(0);
      return 0 === c ? void 0 : e;
    }
  };
  k.Vf = function(a, b) {
    var c = Ln(a, !1).replace(/^\s*|\s*$/g, ""),
      d = b[0].srsName,
      e = a.parentNode.getAttribute("srsDimension"),
      f = "enu";
    d && (f = zc(d).b);
    c = c.split(/\s+/);
    d = 2;
    a.getAttribute("srsDimension")
      ? (d = op(a.getAttribute("srsDimension")))
      : a.getAttribute("dimension")
      ? (d = op(a.getAttribute("dimension")))
      : e && (d = op(e));
    for (var g, h, l = [], m = 0, p = c.length; m < p; m += d)
      (e = parseFloat(c[m])),
        (g = parseFloat(c[m + 1])),
        (h = 3 === d ? parseFloat(c[m + 2]) : 0),
        "en" === f.substr(0, 2) ? l.push(e, g, h) : l.push(g, e, h);
    return l;
  };
  k.Qd = {
    "http://www.opengis.net/gml": {
      pos: Sn(tp.prototype.Eo),
      posList: Sn(tp.prototype.Vf)
    }
  };
  k.We = {
    "http://www.opengis.net/gml": {
      interior: tp.prototype.ql,
      exterior: tp.prototype.Oj
    }
  };
  k.lg = {
    "http://www.opengis.net/gml": {
      Point: Sn(gp.prototype.hi),
      MultiPoint: Sn(gp.prototype.fi),
      LineString: Sn(gp.prototype.Fe),
      MultiLineString: Sn(gp.prototype.ei),
      LinearRing: Sn(gp.prototype.di),
      Polygon: Sn(gp.prototype.Ge),
      MultiPolygon: Sn(gp.prototype.gi),
      Surface: Sn(tp.prototype.ji),
      MultiSurface: Sn(tp.prototype.Io),
      Curve: Sn(tp.prototype.$h),
      MultiCurve: Sn(tp.prototype.Ho),
      Envelope: Sn(tp.prototype.Co)
    }
  };
  k.aj = {
    "http://www.opengis.net/gml": {
      curveMember: Rn(tp.prototype.Cg),
      curveMembers: Rn(tp.prototype.Cg)
    }
  };
  k.ej = {
    "http://www.opengis.net/gml": {
      surfaceMember: Rn(tp.prototype.Gi),
      surfaceMembers: Rn(tp.prototype.Gi)
    }
  };
  k.Xi = {
    "http://www.opengis.net/gml": {
      LineString: Rn(gp.prototype.Fe),
      Curve: Rn(tp.prototype.$h)
    }
  };
  k.lj = {
    "http://www.opengis.net/gml": {
      Polygon: Rn(gp.prototype.Ge),
      Surface: Rn(tp.prototype.ji)
    }
  };
  k.mj = { "http://www.opengis.net/gml": { patches: Sn(tp.prototype.Lo) } };
  k.Yi = { "http://www.opengis.net/gml": { segments: Sn(tp.prototype.Oo) } };
  k.Zi = {
    "http://www.opengis.net/gml": {
      lowerCorner: Rn(tp.prototype.Vf),
      upperCorner: Rn(tp.prototype.Vf)
    }
  };
  k.fj = {
    "http://www.opengis.net/gml": { PolygonPatch: Sn(tp.prototype.Mo) }
  };
  k.kj = {
    "http://www.opengis.net/gml": { LineStringSegment: Sn(tp.prototype.Go) }
  };
  function up(a, b, c) {
    c = c[c.length - 1].srsName;
    b = b.$();
    for (var d = b.length, e = Array(d), f, g = 0; g < d; ++g) {
      f = b[g];
      var h = g,
        l = "enu";
      c && (l = zc(c).b);
      e[h] = "en" === l.substr(0, 2) ? f[0] + " " + f[1] : f[1] + " " + f[0];
    }
    qp(a, e.join(" "));
  }
  k.Ti = function(a, b, c) {
    var d = c[c.length - 1].srsName;
    d && a.setAttribute("srsName", d);
    d = Kn(a.namespaceURI, "pos");
    a.appendChild(d);
    c = c[c.length - 1].srsName;
    a = "enu";
    c && (a = zc(c).b);
    b = b.$();
    qp(d, "en" === a.substr(0, 2) ? b[0] + " " + b[1] : b[1] + " " + b[0]);
  };
  var vp = {
    "http://www.opengis.net/gml": { lowerCorner: L(qp), upperCorner: L(qp) }
  };
  k = tp.prototype;
  k.zp = function(a, b, c) {
    var d = c[c.length - 1].srsName;
    d && a.setAttribute("srsName", d);
    $n(
      { node: a },
      vp,
      Xn,
      [b[0] + " " + b[1], b[2] + " " + b[3]],
      c,
      ["lowerCorner", "upperCorner"],
      this
    );
  };
  k.Qi = function(a, b, c) {
    var d = c[c.length - 1].srsName;
    d && a.setAttribute("srsName", d);
    d = Kn(a.namespaceURI, "posList");
    a.appendChild(d);
    up(d, b, c);
  };
  k.jj = function(a, b) {
    var c = b[b.length - 1],
      d = c.node,
      e = c.exteriorWritten;
    void 0 === e && (c.exteriorWritten = !0);
    return Kn(d.namespaceURI, void 0 !== e ? "interior" : "exterior");
  };
  k.Ue = function(a, b, c) {
    var d = c[c.length - 1].srsName;
    "PolygonPatch" !== a.nodeName && d && a.setAttribute("srsName", d);
    "Polygon" === a.nodeName || "PolygonPatch" === a.nodeName
      ? ((b = b.Zc()),
        $n({ node: a, srsName: d }, wp, this.jj, b, c, void 0, this))
      : "Surface" === a.nodeName &&
        ((d = Kn(a.namespaceURI, "patches")),
        a.appendChild(d),
        (a = Kn(d.namespaceURI, "PolygonPatch")),
        d.appendChild(a),
        this.Ue(a, b, c));
  };
  k.Qe = function(a, b, c) {
    var d = c[c.length - 1].srsName;
    "LineStringSegment" !== a.nodeName && d && a.setAttribute("srsName", d);
    "LineString" === a.nodeName || "LineStringSegment" === a.nodeName
      ? ((d = Kn(a.namespaceURI, "posList")), a.appendChild(d), up(d, b, c))
      : "Curve" === a.nodeName &&
        ((d = Kn(a.namespaceURI, "segments")),
        a.appendChild(d),
        (a = Kn(d.namespaceURI, "LineStringSegment")),
        d.appendChild(a),
        this.Qe(a, b, c));
  };
  k.Si = function(a, b, c) {
    var d = c[c.length - 1],
      e = d.srsName,
      d = d.surface;
    e && a.setAttribute("srsName", e);
    b = b.Ad();
    $n({ node: a, srsName: e, surface: d }, xp, this.c, b, c, void 0, this);
  };
  k.Ap = function(a, b, c) {
    var d = c[c.length - 1].srsName;
    d && a.setAttribute("srsName", d);
    b = b.re();
    $n({ node: a, srsName: d }, yp, Vn("pointMember"), b, c, void 0, this);
  };
  k.Ri = function(a, b, c) {
    var d = c[c.length - 1],
      e = d.srsName,
      d = d.curve;
    e && a.setAttribute("srsName", e);
    b = b.Yc();
    $n({ node: a, srsName: e, curve: d }, zp, this.c, b, c, void 0, this);
  };
  k.Ui = function(a, b, c) {
    var d = Kn(a.namespaceURI, "LinearRing");
    a.appendChild(d);
    this.Qi(d, b, c);
  };
  k.Vi = function(a, b, c) {
    var d = this.g(b, c);
    d && (a.appendChild(d), this.Ue(d, b, c));
  };
  k.Bp = function(a, b, c) {
    var d = Kn(a.namespaceURI, "Point");
    a.appendChild(d);
    this.Ti(d, b, c);
  };
  k.Pi = function(a, b, c) {
    var d = this.g(b, c);
    d && (a.appendChild(d), this.Qe(d, b, c));
  };
  k.pd = function(a, b, c) {
    var d = c[c.length - 1],
      e = ta({}, d);
    e.node = a;
    var f;
    Array.isArray(b)
      ? d.dataProjection
        ? (f = Qc(b, d.featureProjection, d.dataProjection))
        : (f = b)
      : (f = go(b, !0, d));
    $n(e, Ap, this.g, [f], c, void 0, this);
  };
  k.Ni = function(a, b, c) {
    var d = b.f;
    d && a.setAttribute("fid", d);
    var d = c[c.length - 1],
      e = d.featureNS,
      f = b.a;
    d.Mc || ((d.Mc = {}), (d.Mc[e] = {}));
    var g = b.R();
    b = [];
    var h = [],
      l;
    for (l in g) {
      var m = g[l];
      null !== m &&
        (b.push(l),
        h.push(m),
        l == f || m instanceof Rc
          ? l in d.Mc[e] || (d.Mc[e][l] = L(this.pd, this))
          : l in d.Mc[e] || (d.Mc[e][l] = L(qp)));
    }
    l = ta({}, d);
    l.node = a;
    $n(l, d.Mc, Vn(void 0, e), h, c, b);
  };
  var xp = {
      "http://www.opengis.net/gml": {
        surfaceMember: L(tp.prototype.Vi),
        polygonMember: L(tp.prototype.Vi)
      }
    },
    yp = { "http://www.opengis.net/gml": { pointMember: L(tp.prototype.Bp) } },
    zp = {
      "http://www.opengis.net/gml": {
        lineStringMember: L(tp.prototype.Pi),
        curveMember: L(tp.prototype.Pi)
      }
    },
    wp = {
      "http://www.opengis.net/gml": {
        exterior: L(tp.prototype.Ui),
        interior: L(tp.prototype.Ui)
      }
    },
    Ap = {
      "http://www.opengis.net/gml": {
        Curve: L(tp.prototype.Qe),
        MultiCurve: L(tp.prototype.Ri),
        Point: L(tp.prototype.Ti),
        MultiPoint: L(tp.prototype.Ap),
        LineString: L(tp.prototype.Qe),
        MultiLineString: L(tp.prototype.Ri),
        LinearRing: L(tp.prototype.Qi),
        Polygon: L(tp.prototype.Ue),
        MultiPolygon: L(tp.prototype.Si),
        Surface: L(tp.prototype.Ue),
        MultiSurface: L(tp.prototype.Si),
        Envelope: L(tp.prototype.zp)
      }
    },
    Bp = {
      MultiLineString: "lineStringMember",
      MultiCurve: "curveMember",
      MultiPolygon: "polygonMember",
      MultiSurface: "surfaceMember"
    };
  tp.prototype.c = function(a, b) {
    return Kn("http://www.opengis.net/gml", Bp[b[b.length - 1].node.nodeName]);
  };
  tp.prototype.g = function(a, b) {
    var c = b[b.length - 1],
      d = c.multiSurface,
      e = c.surface,
      f = c.curve,
      c = c.multiCurve,
      g;
    Array.isArray(a)
      ? (g = "Envelope")
      : ((g = a.Y()),
        "MultiPolygon" === g && !0 === d
          ? (g = "MultiSurface")
          : "Polygon" === g && !0 === e
          ? (g = "Surface")
          : "LineString" === g && !0 === f
          ? (g = "Curve")
          : "MultiLineString" === g && !0 === c && (g = "MultiCurve"));
    return Kn("http://www.opengis.net/gml", g);
  };
  tp.prototype.H = function(a, b) {
    b = fo(this, b);
    var c = Kn("http://www.opengis.net/gml", "geom"),
      d = {
        node: c,
        srsName: this.srsName,
        curve: this.i,
        surface: this.v,
        multiSurface: this.o,
        multiCurve: this.l
      };
    b && ta(d, b);
    this.pd(c, a, [d]);
    return c;
  };
  tp.prototype.a = function(a, b) {
    b = fo(this, b);
    var c = Kn("http://www.opengis.net/gml", "featureMembers");
    c.setAttributeNS(
      "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation",
      this.schemaLocation
    );
    var d = {
      srsName: this.srsName,
      curve: this.i,
      surface: this.v,
      multiSurface: this.o,
      multiCurve: this.l,
      featureNS: this.featureNS,
      featureType: this.featureType
    };
    b && ta(d, b);
    var d = [d],
      e = d[d.length - 1],
      f = e.featureType,
      g = e.featureNS,
      h = {};
    h[g] = {};
    h[g][f] = L(this.Ni, this);
    e = ta({}, e);
    e.node = c;
    $n(e, h, Vn(f, g), a, d);
    return c;
  };
  function Cp(a) {
    a = a ? a : {};
    gp.call(this, a);
    this.b["http://www.opengis.net/gml"].featureMember = Rn(gp.prototype.Id);
    this.schemaLocation = a.schemaLocation
      ? a.schemaLocation
      : "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd";
  }
  v(Cp, gp);
  k = Cp.prototype;
  k.bi = function(a, b) {
    var c = Ln(a, !1).replace(/^\s*|\s*$/g, ""),
      d = b[0].srsName,
      e = a.parentNode.getAttribute("srsDimension"),
      f = "enu";
    d && (d = zc(d)) && (f = d.b);
    c = c.split(/[\s,]+/);
    d = 2;
    a.getAttribute("srsDimension")
      ? (d = op(a.getAttribute("srsDimension")))
      : a.getAttribute("dimension")
      ? (d = op(a.getAttribute("dimension")))
      : e && (d = op(e));
    for (var g, h, l = [], m = 0, p = c.length; m < p; m += d)
      (e = parseFloat(c[m])),
        (g = parseFloat(c[m + 1])),
        (h = 3 === d ? parseFloat(c[m + 2]) : 0),
        "en" === f.substr(0, 2) ? l.push(e, g, h) : l.push(g, e, h);
    return l;
  };
  k.Ao = function(a, b) {
    var c = N([null], this.Wi, a, b, this);
    return Rb(c[1][0], c[1][1], c[1][3], c[1][4]);
  };
  k.ol = function(a, b) {
    var c = N(void 0, this.Rd, a, b, this);
    c && b[b.length - 1].push(c);
  };
  k.jo = function(a, b) {
    var c = N(void 0, this.Rd, a, b, this);
    c && (b[b.length - 1][0] = c);
  };
  k.Qd = { "http://www.opengis.net/gml": { coordinates: Sn(Cp.prototype.bi) } };
  k.We = {
    "http://www.opengis.net/gml": {
      innerBoundaryIs: Cp.prototype.ol,
      outerBoundaryIs: Cp.prototype.jo
    }
  };
  k.Wi = { "http://www.opengis.net/gml": { coordinates: Rn(Cp.prototype.bi) } };
  k.lg = {
    "http://www.opengis.net/gml": {
      Point: Sn(gp.prototype.hi),
      MultiPoint: Sn(gp.prototype.fi),
      LineString: Sn(gp.prototype.Fe),
      MultiLineString: Sn(gp.prototype.ei),
      LinearRing: Sn(gp.prototype.di),
      Polygon: Sn(gp.prototype.Ge),
      MultiPolygon: Sn(gp.prototype.gi),
      Box: Sn(Cp.prototype.Ao)
    }
  };
  function Dp(a) {
    a = a ? a : {};
    dp.call(this);
    this.defaultDataProjection = zc("EPSG:4326");
    this.b = a.readExtensions;
  }
  v(Dp, dp);
  var Ep = [
    null,
    "http://www.topografix.com/GPX/1/0",
    "http://www.topografix.com/GPX/1/1"
  ];
  function Fp(a, b, c, d) {
    a.push(
      parseFloat(c.getAttribute("lon")),
      parseFloat(c.getAttribute("lat"))
    );
    "ele" in d ? (a.push(d.ele), delete d.ele, (b.hasZ = !0)) : a.push(0);
    "time" in d ? (a.push(d.time), delete d.time, (b.hasM = !0)) : a.push(0);
    return a;
  }
  function Gp(a, b, c) {
    var d = "XY",
      e = 2;
    a.hasZ && a.hasM
      ? ((d = "XYZM"), (e = 4))
      : a.hasZ
      ? ((d = "XYZ"), (e = 3))
      : a.hasM && ((d = "XYM"), (e = 3));
    if (4 !== e) {
      var f, g;
      f = 0;
      for (g = b.length / 4; f < g; f++)
        (b[f * e] = b[4 * f]),
          (b[f * e + 1] = b[4 * f + 1]),
          a.hasZ && (b[f * e + 2] = b[4 * f + 2]),
          a.hasM && (b[f * e + 2] = b[4 * f + 3]);
      b.length = (b.length / 4) * e;
      if (c) for (f = 0, g = c.length; f < g; f++) c[f] = (c[f] / 4) * e;
    }
    return d;
  }
  function Hp(a, b) {
    var c = b[b.length - 1],
      d = a.getAttribute("href");
    null !== d && (c.link = d);
    Zn(Ip, a, b);
  }
  function Jp(a, b) {
    b[b.length - 1].extensionsNode_ = a;
  }
  function Kp(a, b) {
    var c = b[0],
      d = N({ flatCoordinates: [], layoutOptions: {} }, Lp, a, b);
    if (d) {
      var e = d.flatCoordinates;
      delete d.flatCoordinates;
      var f = d.layoutOptions;
      delete d.layoutOptions;
      var f = Gp(f, e),
        g = new P(null);
      g.da(f, e);
      go(g, !1, c);
      c = new J(g);
      c.I(d);
      return c;
    }
  }
  function Mp(a, b) {
    var c = b[0],
      d = N({ flatCoordinates: [], ends: [], layoutOptions: {} }, Np, a, b);
    if (d) {
      var e = d.flatCoordinates;
      delete d.flatCoordinates;
      var f = d.ends;
      delete d.ends;
      var g = d.layoutOptions;
      delete d.layoutOptions;
      var g = Gp(g, e, f),
        h = new Q(null);
      h.da(g, e, f);
      go(h, !1, c);
      c = new J(h);
      c.I(d);
      return c;
    }
  }
  function Op(a, b) {
    var c = b[0],
      d = N({}, Pp, a, b);
    if (d) {
      var e = {},
        f = Fp([], e, a, d),
        e = Gp(e, f),
        f = new C(f, e);
      go(f, !1, c);
      c = new J(f);
      c.I(d);
      return c;
    }
  }
  var Qp = { rte: Kp, trk: Mp, wpt: Op },
    Rp = M(Ep, { rte: Rn(Kp), trk: Rn(Mp), wpt: Rn(Op) }),
    Ip = M(Ep, { text: K(T, "linkText"), type: K(T, "linkType") }),
    Lp = M(Ep, {
      name: K(T),
      cmt: K(T),
      desc: K(T),
      src: K(T),
      link: Hp,
      number: K(np),
      extensions: Jp,
      type: K(T),
      rtept: function(a, b) {
        var c = N({}, Sp, a, b);
        if (c) {
          var d = b[b.length - 1];
          Fp(d.flatCoordinates, d.layoutOptions, a, c);
        }
      }
    }),
    Sp = M(Ep, { ele: K(lp), time: K(kp) }),
    Np = M(Ep, {
      name: K(T),
      cmt: K(T),
      desc: K(T),
      src: K(T),
      link: Hp,
      number: K(np),
      type: K(T),
      extensions: Jp,
      trkseg: function(a, b) {
        var c = b[b.length - 1];
        Zn(Tp, a, b);
        c.ends.push(c.flatCoordinates.length);
      }
    }),
    Tp = M(Ep, {
      trkpt: function(a, b) {
        var c = N({}, Up, a, b);
        if (c) {
          var d = b[b.length - 1];
          Fp(d.flatCoordinates, d.layoutOptions, a, c);
        }
      }
    }),
    Up = M(Ep, { ele: K(lp), time: K(kp) }),
    Pp = M(Ep, {
      ele: K(lp),
      time: K(kp),
      magvar: K(lp),
      geoidheight: K(lp),
      name: K(T),
      cmt: K(T),
      desc: K(T),
      src: K(T),
      link: Hp,
      sym: K(T),
      type: K(T),
      fix: K(T),
      sat: K(np),
      hdop: K(lp),
      vdop: K(lp),
      pdop: K(lp),
      ageofdgpsdata: K(lp),
      dgpsid: K(np),
      extensions: Jp
    });
  function Vp(a, b) {
    b || (b = []);
    for (var c = 0, d = b.length; c < d; ++c) {
      var e = b[c];
      if (a.b) {
        var f = e.get("extensionsNode_") || null;
        a.b(e, f);
      }
      e.set("extensionsNode_", void 0);
    }
  }
  Dp.prototype.ai = function(a, b) {
    if (!Za(Ep, a.namespaceURI)) return null;
    var c = Qp[a.localName];
    if (!c) return null;
    c = c(a, [eo(this, a, b)]);
    if (!c) return null;
    Vp(this, [c]);
    return c;
  };
  Dp.prototype.oc = function(a, b) {
    if (!Za(Ep, a.namespaceURI)) return [];
    if ("gpx" == a.localName) {
      var c = N([], Rp, a, [eo(this, a, b)]);
      if (c) return Vp(this, c), c;
    }
    return [];
  };
  function Wp(a, b, c) {
    a.setAttribute("href", b);
    b = c[c.length - 1].properties;
    $n({ node: a }, Xp, Xn, [b.linkText, b.linkType], c, Yp);
  }
  function Zp(a, b, c) {
    var d = c[c.length - 1],
      e = d.node.namespaceURI,
      f = d.properties;
    a.setAttributeNS(null, "lat", b[1]);
    a.setAttributeNS(null, "lon", b[0]);
    switch (d.geometryLayout) {
      case "XYZM":
        0 !== b[3] && (f.time = b[3]);
      case "XYZ":
        0 !== b[2] && (f.ele = b[2]);
        break;
      case "XYM":
        0 !== b[2] && (f.time = b[2]);
    }
    b = "rtept" == a.nodeName ? $p[e] : aq[e];
    d = Yn(f, b);
    $n({ node: a, properties: f }, bq, Xn, d, c, b);
  }
  var Yp = ["text", "type"],
    Xp = M(Ep, { text: L(qp), type: L(qp) }),
    cq = M(Ep, "name cmt desc src link number type rtept".split(" ")),
    dq = M(Ep, {
      name: L(qp),
      cmt: L(qp),
      desc: L(qp),
      src: L(qp),
      link: L(Wp),
      number: L(sp),
      type: L(qp),
      rtept: Un(L(Zp))
    }),
    $p = M(Ep, ["ele", "time"]),
    eq = M(Ep, "name cmt desc src link number type trkseg".split(" ")),
    hq = M(Ep, {
      name: L(qp),
      cmt: L(qp),
      desc: L(qp),
      src: L(qp),
      link: L(Wp),
      number: L(sp),
      type: L(qp),
      trkseg: Un(
        L(function(a, b, c) {
          $n(
            { node: a, geometryLayout: b.ka, properties: {} },
            fq,
            gq,
            b.$(),
            c
          );
        })
      )
    }),
    gq = Vn("trkpt"),
    fq = M(Ep, { trkpt: L(Zp) }),
    aq = M(
      Ep,
      "ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(
        " "
      )
    ),
    bq = M(Ep, {
      ele: L(rp),
      time: L(function(a, b) {
        var c = new Date(1e3 * b);
        a.appendChild(
          Jn.createTextNode(
            c.getUTCFullYear() +
              "-" +
              pb(c.getUTCMonth() + 1) +
              "-" +
              pb(c.getUTCDate()) +
              "T" +
              pb(c.getUTCHours()) +
              ":" +
              pb(c.getUTCMinutes()) +
              ":" +
              pb(c.getUTCSeconds()) +
              "Z"
          )
        );
      }),
      magvar: L(rp),
      geoidheight: L(rp),
      name: L(qp),
      cmt: L(qp),
      desc: L(qp),
      src: L(qp),
      link: L(Wp),
      sym: L(qp),
      type: L(qp),
      fix: L(qp),
      sat: L(sp),
      hdop: L(rp),
      vdop: L(rp),
      pdop: L(rp),
      ageofdgpsdata: L(rp),
      dgpsid: L(sp)
    }),
    iq = { Point: "wpt", LineString: "rte", MultiLineString: "trk" };
  function jq(a, b) {
    var c = a.V();
    if (c && (c = iq[c.Y()])) return Kn(b[b.length - 1].node.namespaceURI, c);
  }
  var kq = M(Ep, {
    rte: L(function(a, b, c) {
      var d = c[0],
        e = b.R();
      a = { node: a, properties: e };
      if ((b = b.V()))
        (b = go(b, !0, d)), (a.geometryLayout = b.ka), (e.rtept = b.$());
      d = cq[c[c.length - 1].node.namespaceURI];
      e = Yn(e, d);
      $n(a, dq, Xn, e, c, d);
    }),
    trk: L(function(a, b, c) {
      var d = c[0],
        e = b.R();
      a = { node: a, properties: e };
      if ((b = b.V())) (b = go(b, !0, d)), (e.trkseg = b.Yc());
      d = eq[c[c.length - 1].node.namespaceURI];
      e = Yn(e, d);
      $n(a, hq, Xn, e, c, d);
    }),
    wpt: L(function(a, b, c) {
      var d = c[0],
        e = c[c.length - 1];
      e.properties = b.R();
      if ((b = b.V()))
        (b = go(b, !0, d)), (e.geometryLayout = b.ka), Zp(a, b.$(), c);
    })
  });
  Dp.prototype.a = function(a, b) {
    b = fo(this, b);
    var c = Kn("http://www.topografix.com/GPX/1/1", "gpx");
    c.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xsi",
      "http://www.w3.org/2001/XMLSchema-instance"
    );
    c.setAttributeNS(
      "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation",
      "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"
    );
    c.setAttribute("version", "1.1");
    c.setAttribute("creator", "OpenLayers 3");
    $n({ node: c }, kq, jq, a, [b]);
    return c;
  };
  function lq() {
    co.call(this);
  }
  v(lq, co);
  function mq(a) {
    return "string" === typeof a ? a : "";
  }
  k = lq.prototype;
  k.Y = function() {
    return "text";
  };
  k.bc = function(a, b) {
    return this.Hd(mq(a), fo(this, b));
  };
  k.La = function(a, b) {
    return this.Tf(mq(a), fo(this, b));
  };
  k.hd = function(a, b) {
    return this.Jd(mq(a), fo(this, b));
  };
  k.Wa = function() {
    return this.defaultDataProjection;
  };
  k.Od = function(a, b) {
    return this.Re(a, fo(this, b));
  };
  k.ec = function(a, b) {
    return this.Oi(a, fo(this, b));
  };
  k.od = function(a, b) {
    return this.Pd(a, fo(this, b));
  };
  function nq(a) {
    a = a ? a : {};
    co.call(this);
    this.defaultDataProjection = zc("EPSG:4326");
    this.b = a.altitudeMode ? a.altitudeMode : oq;
  }
  v(nq, lq);
  var pq = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,
    qq = /^H.([A-Z]{3}).*?:(.*)/,
    rq = /^HFDTE(\d{2})(\d{2})(\d{2})/,
    sq = /\r\n|\r|\n/;
  nq.prototype.Hd = function(a, b) {
    var c = this.b,
      d = a.split(sq),
      e = {},
      f = [],
      g = 2e3,
      h = 0,
      l = 1,
      m = -1,
      p,
      n;
    p = 0;
    for (n = d.length; p < n; ++p) {
      var q = d[p],
        r;
      if ("B" == q.charAt(0)) {
        if ((r = pq.exec(q))) {
          var q = parseInt(r[1], 10),
            u = parseInt(r[2], 10),
            w = parseInt(r[3], 10),
            y = parseInt(r[4], 10) + parseInt(r[5], 10) / 6e4;
          "S" == r[6] && (y = -y);
          var z = parseInt(r[7], 10) + parseInt(r[8], 10) / 6e4;
          "W" == r[9] && (z = -z);
          f.push(z, y);
          c != oq &&
            f.push(
              c == tq ? parseInt(r[11], 10) : c == uq ? parseInt(r[12], 10) : 0
            );
          r = Date.UTC(g, h, l, q, u, w);
          r < m && (r = Date.UTC(g, h, l + 1, q, u, w));
          f.push(r / 1e3);
          m = r;
        }
      } else
        "H" == q.charAt(0) &&
          ((r = rq.exec(q))
            ? ((l = parseInt(r[1], 10)),
              (h = parseInt(r[2], 10) - 1),
              (g = 2e3 + parseInt(r[3], 10)))
            : (r = qq.exec(q)) && (e[r[1]] = r[2].trim()));
    }
    if (0 === f.length) return null;
    d = new P(null);
    d.da(c == oq ? "XYM" : "XYZM", f);
    c = new J(go(d, !1, b));
    c.I(e);
    return c;
  };
  nq.prototype.Tf = function(a, b) {
    var c = this.Hd(a, b);
    return c ? [c] : [];
  };
  var uq = "barometric",
    tq = "gps",
    oq = "none";
  function vq(a, b, c, d, e, f) {
    Na.call(this);
    this.l = null;
    this.a = a ? a : new Image();
    null !== d && (this.a.crossOrigin = d);
    this.c = f ? document.createElement("CANVAS") : null;
    this.j = f;
    this.i = null;
    this.f = e;
    this.g = c;
    this.o = b;
    this.v = !1;
    this.f == li && wq(this);
  }
  v(vq, Na);
  function wq(a) {
    var b = De(1, 1);
    try {
      b.drawImage(a.a, 0, 0), b.getImageData(0, 0, 1, 1);
    } catch (c) {
      a.v = !0;
    }
  }
  vq.prototype.H = function() {
    this.f = ki;
    this.i.forEach(ya);
    this.i = null;
    this.b("change");
  };
  vq.prototype.u = function() {
    this.f = li;
    this.g && ((this.a.width = this.g[0]), (this.a.height = this.g[1]));
    this.g = [this.a.width, this.a.height];
    this.i.forEach(ya);
    this.i = null;
    wq(this);
    if (!this.v && null !== this.j) {
      this.c.width = this.a.width;
      this.c.height = this.a.height;
      var a = this.c.getContext("2d");
      a.drawImage(this.a, 0, 0);
      for (
        var b = a.getImageData(0, 0, this.a.width, this.a.height),
          c = b.data,
          d = this.j[0] / 255,
          e = this.j[1] / 255,
          f = this.j[2] / 255,
          g = 0,
          h = c.length;
        g < h;
        g += 4
      )
        (c[g] *= d), (c[g + 1] *= e), (c[g + 2] *= f);
      a.putImageData(b, 0, 0);
    }
    this.b("change");
  };
  vq.prototype.load = function() {
    if (this.f == ji) {
      this.f = mi;
      this.i = [
        Da(this.a, "error", this.H, this),
        Da(this.a, "load", this.u, this)
      ];
      try {
        this.a.src = this.o;
      } catch (a) {
        this.H();
      }
    }
  };
  function xq(a) {
    a = a || {};
    this.c = void 0 !== a.anchor ? a.anchor : [0.5, 0.5];
    this.j = null;
    this.a = void 0 !== a.anchorOrigin ? a.anchorOrigin : yq;
    this.C = void 0 !== a.anchorXUnits ? a.anchorXUnits : zq;
    this.D = void 0 !== a.anchorYUnits ? a.anchorYUnits : zq;
    this.ra = void 0 !== a.crossOrigin ? a.crossOrigin : null;
    var b = void 0 !== a.img ? a.img : null,
      c = void 0 !== a.imgSize ? a.imgSize : null,
      d = a.src;
    ha(!(void 0 !== d && b), 4);
    ha(!b || (b && c), 5);
    (void 0 !== d && 0 !== d.length) || !b || (d = b.src || x(b).toString());
    ha(void 0 !== d && 0 < d.length, 6);
    var e = void 0 !== a.src ? ji : li;
    this.f = void 0 !== a.color ? ye(a.color) : null;
    var f = this.ra,
      g = this.f,
      h = Nh.get(d, f, g);
    h || ((h = new vq(b, d, c, f, e, g)), Nh.set(d, f, g, h));
    this.b = h;
    this.L = void 0 !== a.offset ? a.offset : [0, 0];
    this.g = void 0 !== a.offsetOrigin ? a.offsetOrigin : yq;
    this.v = null;
    this.A = void 0 !== a.size ? a.size : null;
    ri.call(this, {
      opacity: void 0 !== a.opacity ? a.opacity : 1,
      rotation: void 0 !== a.rotation ? a.rotation : 0,
      scale: void 0 !== a.scale ? a.scale : 1,
      snapToPixel: void 0 !== a.snapToPixel ? a.snapToPixel : !0,
      rotateWithView: void 0 !== a.rotateWithView ? a.rotateWithView : !1
    });
  }
  v(xq, ri);
  k = xq.prototype;
  k.clone = function() {
    var a = this.Ic(1),
      b;
    if (this.b.f === li)
      if ("IMG" === a.tagName.toUpperCase()) b = a.cloneNode(!0);
      else {
        b = document.createElement("canvas");
        var c = b.getContext("2d");
        b.width = a.width;
        b.height = a.height;
        c.drawImage(a, 0, 0);
      }
    return new xq({
      anchor: this.c.slice(),
      anchorOrigin: this.a,
      anchorXUnits: this.C,
      anchorYUnits: this.D,
      crossOrigin: this.ra,
      color: this.f && this.f.slice ? this.f.slice() : this.f || void 0,
      img: b ? b : void 0,
      imgSize: b ? this.b.g.slice() : void 0,
      src: b ? void 0 : this.b.o,
      offset: this.L.slice(),
      offsetOrigin: this.g,
      size: null !== this.A ? this.A.slice() : void 0,
      opacity: this.l,
      scale: this.i,
      snapToPixel: this.u,
      rotation: this.o,
      rotateWithView: this.H
    });
  };
  k.Ac = function() {
    if (this.j) return this.j;
    var a = this.c,
      b = this.ac();
    if (this.C == zq || this.D == zq) {
      if (!b) return null;
      a = this.c.slice();
      this.C == zq && (a[0] *= b[0]);
      this.D == zq && (a[1] *= b[1]);
    }
    if (this.a != yq) {
      if (!b) return null;
      a === this.c && (a = this.c.slice());
      if (this.a == Aq || this.a == Bq) a[0] = -a[0] + b[0];
      if (this.a == Cq || this.a == Bq) a[1] = -a[1] + b[1];
    }
    return (this.j = a);
  };
  k.Gn = function() {
    return this.f;
  };
  k.Ic = function() {
    var a = this.b;
    return a.c ? a.c : a.a;
  };
  k.de = function() {
    return this.b.g;
  };
  k.xe = function() {
    return this.b.f;
  };
  k.Lf = function() {
    var a = this.b;
    if (!a.l)
      if (a.v) {
        var b = a.g[0],
          c = a.g[1],
          d = De(b, c);
        d.fillRect(0, 0, b, c);
        a.l = d.canvas;
      } else a.l = a.a;
    return a.l;
  };
  k.Jc = function() {
    if (this.v) return this.v;
    var a = this.L;
    if (this.g != yq) {
      var b = this.ac(),
        c = this.b.g;
      if (!b || !c) return null;
      a = a.slice();
      if (this.g == Aq || this.g == Bq) a[0] = c[0] - b[0] - a[0];
      if (this.g == Cq || this.g == Bq) a[1] = c[1] - b[1] - a[1];
    }
    return (this.v = a);
  };
  k.Hn = function() {
    return this.b.o;
  };
  k.ac = function() {
    return this.A ? this.A : this.b.g;
  };
  k.eh = function(a, b) {
    return B(this.b, "change", a, b);
  };
  k.load = function() {
    this.b.load();
  };
  k.Ii = function(a, b) {
    Ea(this.b, "change", a, b);
  };
  var zq = "fraction",
    Cq = "bottom-left",
    Bq = "bottom-right",
    yq = "top-left",
    Aq = "top-right";
  function Dq(a) {
    a = a || {};
    this.g = a.font;
    this.j = a.rotation;
    this.v = a.rotateWithView;
    this.a = a.scale;
    this.H = a.text;
    this.l = a.textAlign;
    this.o = a.textBaseline;
    this.b = void 0 !== a.fill ? a.fill : new vi({ color: "#333" });
    this.f = void 0 !== a.stroke ? a.stroke : null;
    this.c = void 0 !== a.offsetX ? a.offsetX : 0;
    this.i = void 0 !== a.offsetY ? a.offsetY : 0;
  }
  k = Dq.prototype;
  k.clone = function() {
    return new Dq({
      font: this.g,
      rotation: this.j,
      rotateWithView: this.v,
      scale: this.a,
      text: this.Ka(),
      textAlign: this.l,
      textBaseline: this.o,
      fill: this.b ? this.b.clone() : void 0,
      stroke: this.f ? this.f.clone() : void 0,
      offsetX: this.c,
      offsetY: this.i
    });
  };
  k.dk = function() {
    return this.g;
  };
  k.sk = function() {
    return this.c;
  };
  k.tk = function() {
    return this.i;
  };
  k.Vn = function() {
    return this.b;
  };
  k.Wn = function() {
    return this.v;
  };
  k.Xn = function() {
    return this.j;
  };
  k.Yn = function() {
    return this.a;
  };
  k.Zn = function() {
    return this.f;
  };
  k.Ka = function() {
    return this.H;
  };
  k.Dk = function() {
    return this.l;
  };
  k.Ek = function() {
    return this.o;
  };
  k.si = function(a) {
    this.g = a;
  };
  k.yi = function(a) {
    this.c = a;
  };
  k.zi = function(a) {
    this.i = a;
  };
  k.Sh = function(a) {
    this.b = a;
  };
  k.$n = function(a) {
    this.j = a;
  };
  k.Th = function(a) {
    this.a = a;
  };
  k.Uh = function(a) {
    this.f = a;
  };
  k.Vh = function(a) {
    this.H = a;
  };
  k.Bi = function(a) {
    this.l = a;
  };
  k.lp = function(a) {
    this.o = a;
  };
  function Eq(a) {
    a = a ? a : {};
    dp.call(this);
    Fq ||
      ((Gq = [255, 255, 255, 1]),
      (Hq = new vi({ color: Gq })),
      (Iq = [20, 2]),
      (Jq = Kq = "pixels"),
      (Lq = [64, 64]),
      (Mq = "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"),
      (Nq = 0.5),
      (Oq = new xq({
        anchor: Iq,
        anchorOrigin: Cq,
        anchorXUnits: Kq,
        anchorYUnits: Jq,
        crossOrigin: "anonymous",
        rotation: 0,
        scale: Nq,
        size: Lq,
        src: Mq
      })),
      (Pq = "NO_IMAGE"),
      (Qq = new wi({ color: Gq, width: 1 })),
      (Rq = new wi({ color: [51, 51, 51, 1], width: 2 })),
      (Sq = new Dq({
        font: "bold 16px Helvetica",
        fill: Hq,
        stroke: Rq,
        scale: 0.8
      })),
      (Tq = new xi({ fill: Hq, image: Oq, text: Sq, stroke: Qq, zIndex: 0 })),
      (Fq = [Tq]));
    this.defaultDataProjection = zc("EPSG:4326");
    this.g = a.defaultStyle ? a.defaultStyle : Fq;
    this.c = void 0 !== a.extractStyles ? a.extractStyles : !0;
    this.l = void 0 !== a.writeStyles ? a.writeStyles : !0;
    this.b = {};
    this.i = void 0 !== a.showPointNames ? a.showPointNames : !0;
  }
  var Fq, Gq, Hq, Iq, Kq, Jq, Lq, Mq, Nq, Oq, Pq, Qq, Rq, Sq, Tq;
  v(Eq, dp);
  var Uq = ["http://www.google.com/kml/ext/2.2"],
    Vq = [
      null,
      "http://earth.google.com/kml/2.0",
      "http://earth.google.com/kml/2.1",
      "http://earth.google.com/kml/2.2",
      "http://www.opengis.net/kml/2.2"
    ],
    Wq = { fraction: zq, pixels: "pixels" };
  function Xq(a, b) {
    var c,
      d = [0, 0],
      e = "start";
    a.a &&
      ((c = a.a.de()),
      null === c && (c = Lq),
      2 == c.length &&
        ((e = a.a.i),
        (d[0] = (e * c[0]) / 2),
        (d[1] = (-e * c[1]) / 2),
        (e = "left")));
    if (null !== a.Ka()) {
      var f = a.Ka();
      c = f.clone();
      c.si(f.g || Sq.g);
      c.Th(f.a || Sq.a);
      c.Sh(f.b || Sq.b);
      c.Uh(f.f || Rq);
    } else c = Sq.clone();
    c.Vh(b);
    c.yi(d[0]);
    c.zi(d[1]);
    c.Bi(e);
    return new xi({ text: c });
  }
  function Yq(a, b, c, d, e) {
    return function() {
      var f = e,
        g = "";
      f && this.V() && (f = "Point" === this.V().Y());
      f && ((g = this.get("name")), (f = f && g));
      if (a) return f ? ((f = Xq(a[0], g)), a.concat(f)) : a;
      if (b) {
        var h = Zq(b, c, d);
        return f ? ((f = Xq(h[0], g)), h.concat(f)) : h;
      }
      return f ? ((f = Xq(c[0], g)), c.concat(f)) : c;
    };
  }
  function Zq(a, b, c) {
    return Array.isArray(a)
      ? a
      : "string" === typeof a
      ? (!(a in c) && "#" + a in c && (a = "#" + a), Zq(c[a], b, c))
      : b;
  }
  function $q(a) {
    a = Ln(a, !1);
    if ((a = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a)))
      return (
        (a = a[1]),
        [
          parseInt(a.substr(6, 2), 16),
          parseInt(a.substr(4, 2), 16),
          parseInt(a.substr(2, 2), 16),
          parseInt(a.substr(0, 2), 16) / 255
        ]
      );
  }
  function ar(a) {
    a = Ln(a, !1);
    for (
      var b = [],
        c = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,
        d;
      (d = c.exec(a));

    )
      b.push(parseFloat(d[1]), parseFloat(d[2]), d[3] ? parseFloat(d[3]) : 0),
        (a = a.substr(d[0].length));
    return "" !== a ? void 0 : b;
  }
  function br(a) {
    var b = Ln(a, !1).trim();
    return a.baseURI ? new URL(b, a.baseURI).href : b;
  }
  function cr(a) {
    return lp(a);
  }
  function dr(a, b) {
    return N(null, er, a, b);
  }
  function fr(a, b) {
    var c = N({ B: [], Mi: [] }, gr, a, b);
    if (c) {
      var d = c.B,
        c = c.Mi,
        e,
        f;
      e = 0;
      for (f = Math.min(d.length, c.length); e < f; ++e) d[4 * e + 3] = c[e];
      c = new P(null);
      c.da("XYZM", d);
      return c;
    }
  }
  function hr(a, b) {
    var c = N({}, ir, a, b),
      d = N(null, jr, a, b);
    if (d) {
      var e = new P(null);
      e.da("XYZ", d);
      e.I(c);
      return e;
    }
  }
  function kr(a, b) {
    var c = N({}, ir, a, b),
      d = N(null, jr, a, b);
    if (d) {
      var e = new E(null);
      e.da("XYZ", d, [d.length]);
      e.I(c);
      return e;
    }
  }
  function lr(a, b) {
    var c = N([], mr, a, b);
    if (!c) return null;
    if (0 === c.length) return new Vo(c);
    var d,
      e = !0,
      f = c[0].Y(),
      g,
      h,
      l;
    h = 1;
    for (l = c.length; h < l; ++h)
      if (((g = c[h]), g.Y() != f)) {
        e = !1;
        break;
      }
    if (e)
      if ("Point" == f) {
        d = c[0];
        e = d.ka;
        f = d.ia();
        h = 1;
        for (l = c.length; h < l; ++h) (g = c[h]), bb(f, g.ia());
        d = new R(null);
        d.da(e, f);
        nr(d, c);
      } else
        "LineString" == f
          ? ((d = new Q(null)), mo(d, c), nr(d, c))
          : "Polygon" == f
          ? ((d = new S(null)), oo(d, c), nr(d, c))
          : "GeometryCollection" == f
          ? (d = new Vo(c))
          : ha(!1, 37);
    else d = new Vo(c);
    return d;
  }
  function or(a, b) {
    var c = N({}, ir, a, b),
      d = N(null, jr, a, b);
    if (d) {
      var e = new C(null);
      e.da("XYZ", d);
      e.I(c);
      return e;
    }
  }
  function pr(a, b) {
    var c = N({}, ir, a, b),
      d = N([null], qr, a, b);
    if (d && d[0]) {
      var e = new E(null),
        f = d[0],
        g = [f.length],
        h,
        l;
      h = 1;
      for (l = d.length; h < l; ++h) bb(f, d[h]), g.push(f.length);
      e.da("XYZ", f, g);
      e.I(c);
      return e;
    }
  }
  function rr(a, b) {
    var c = N({}, sr, a, b);
    if (!c) return null;
    var d = "fillStyle" in c ? c.fillStyle : Hq,
      e = c.fill;
    void 0 === e || e || (d = null);
    e = "imageStyle" in c ? c.imageStyle : Oq;
    e == Pq && (e = void 0);
    var f = "textStyle" in c ? c.textStyle : Sq,
      g = "strokeStyle" in c ? c.strokeStyle : Qq,
      c = c.outline;
    void 0 === c || c || (g = null);
    return [new xi({ fill: d, image: e, stroke: g, text: f, zIndex: void 0 })];
  }
  function nr(a, b) {
    var c = b.length,
      d = Array(b.length),
      e = Array(b.length),
      f,
      g,
      h,
      l;
    h = l = !1;
    for (g = 0; g < c; ++g)
      (f = b[g]),
        (d[g] = f.get("extrude")),
        (e[g] = f.get("altitudeMode")),
        (h = h || void 0 !== d[g]),
        (l = l || e[g]);
    h && a.set("extrude", d);
    l && a.set("altitudeMode", e);
  }
  function tr(a, b) {
    Zn(ur, a, b);
  }
  function vr(a, b) {
    Zn(wr, a, b);
  }
  var xr = M(Vq, { displayName: K(T), value: K(T) }),
    ur = M(Vq, {
      Data: function(a, b) {
        var c = a.getAttribute("name");
        Zn(xr, a, b);
        var d = b[b.length - 1];
        null !== c
          ? (d[c] = d.value)
          : null !== d.displayName && (d[d.displayName] = d.value);
      },
      SchemaData: function(a, b) {
        Zn(yr, a, b);
      }
    }),
    wr = M(Vq, {
      LatLonAltBox: function(a, b) {
        var c = N({}, zr, a, b);
        if (c) {
          var d = b[b.length - 1];
          d.extent = [
            parseFloat(c.west),
            parseFloat(c.south),
            parseFloat(c.east),
            parseFloat(c.north)
          ];
          d.altitudeMode = c.altitudeMode;
          d.minAltitude = parseFloat(c.minAltitude);
          d.maxAltitude = parseFloat(c.maxAltitude);
        }
      },
      Lod: function(a, b) {
        var c = N({}, Ar, a, b);
        if (c) {
          var d = b[b.length - 1];
          d.minLodPixels = parseFloat(c.minLodPixels);
          d.maxLodPixels = parseFloat(c.maxLodPixels);
          d.minFadeExtent = parseFloat(c.minFadeExtent);
          d.maxFadeExtent = parseFloat(c.maxFadeExtent);
        }
      }
    }),
    zr = M(Vq, {
      altitudeMode: K(T),
      minAltitude: K(lp),
      maxAltitude: K(lp),
      north: K(lp),
      south: K(lp),
      east: K(lp),
      west: K(lp)
    }),
    Ar = M(Vq, {
      minLodPixels: K(lp),
      maxLodPixels: K(lp),
      minFadeExtent: K(lp),
      maxFadeExtent: K(lp)
    }),
    ir = M(Vq, { extrude: K(ip), altitudeMode: K(T) }),
    er = M(Vq, { coordinates: Sn(ar) }),
    qr = M(Vq, {
      innerBoundaryIs: function(a, b) {
        var c = N(void 0, Br, a, b);
        c && b[b.length - 1].push(c);
      },
      outerBoundaryIs: function(a, b) {
        var c = N(void 0, Cr, a, b);
        c && (b[b.length - 1][0] = c);
      }
    }),
    gr = M(
      Vq,
      {
        when: function(a, b) {
          var c = b[b.length - 1].Mi,
            d = Ln(a, !1),
            d = Date.parse(d);
          c.push(isNaN(d) ? 0 : d);
        }
      },
      M(Uq, {
        coord: function(a, b) {
          var c = b[b.length - 1].B,
            d = Ln(a, !1);
          (d = /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(
            d
          ))
            ? c.push(parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]), 0)
            : c.push(0, 0, 0, 0);
        }
      })
    ),
    jr = M(Vq, { coordinates: Sn(ar) }),
    Dr = M(
      Vq,
      { href: K(br) },
      M(Uq, { x: K(lp), y: K(lp), w: K(lp), h: K(lp) })
    ),
    Er = M(Vq, {
      Icon: K(function(a, b) {
        var c = N({}, Dr, a, b);
        return c ? c : null;
      }),
      heading: K(lp),
      hotSpot: K(function(a) {
        var b = a.getAttribute("xunits"),
          c = a.getAttribute("yunits");
        return {
          x: parseFloat(a.getAttribute("x")),
          jg: Wq[b],
          y: parseFloat(a.getAttribute("y")),
          kg: Wq[c]
        };
      }),
      scale: K(cr)
    }),
    Br = M(Vq, { LinearRing: Sn(dr) }),
    Fr = M(Vq, { color: K($q), scale: K(cr) }),
    Gr = M(Vq, { color: K($q), width: K(lp) }),
    mr = M(Vq, {
      LineString: Rn(hr),
      LinearRing: Rn(kr),
      MultiGeometry: Rn(lr),
      Point: Rn(or),
      Polygon: Rn(pr)
    }),
    Hr = M(Uq, { Track: Rn(fr) }),
    Jr = M(Vq, {
      ExtendedData: tr,
      Region: vr,
      Link: function(a, b) {
        Zn(Ir, a, b);
      },
      address: K(T),
      description: K(T),
      name: K(T),
      open: K(ip),
      phoneNumber: K(T),
      visibility: K(ip)
    }),
    Ir = M(Vq, { href: K(br) }),
    Cr = M(Vq, { LinearRing: Sn(dr) }),
    Kr = M(Vq, { Style: K(rr), key: K(T), styleUrl: K(br) }),
    Mr = M(
      Vq,
      {
        ExtendedData: tr,
        Region: vr,
        MultiGeometry: K(lr, "geometry"),
        LineString: K(hr, "geometry"),
        LinearRing: K(kr, "geometry"),
        Point: K(or, "geometry"),
        Polygon: K(pr, "geometry"),
        Style: K(rr),
        StyleMap: function(a, b) {
          var c = N(void 0, Lr, a, b);
          if (c) {
            var d = b[b.length - 1];
            Array.isArray(c)
              ? (d.Style = c)
              : "string" === typeof c
              ? (d.styleUrl = c)
              : ha(!1, 38);
          }
        },
        address: K(T),
        description: K(T),
        name: K(T),
        open: K(ip),
        phoneNumber: K(T),
        styleUrl: K(br),
        visibility: K(ip)
      },
      M(Uq, {
        MultiTrack: K(function(a, b) {
          var c = N([], Hr, a, b);
          if (c) {
            var d = new Q(null);
            mo(d, c);
            return d;
          }
        }, "geometry"),
        Track: K(fr, "geometry")
      })
    ),
    Nr = M(Vq, { color: K($q), fill: K(ip), outline: K(ip) }),
    yr = M(Vq, {
      SimpleData: function(a, b) {
        var c = a.getAttribute("name");
        if (null !== c) {
          var d = T(a);
          b[b.length - 1][c] = d;
        }
      }
    }),
    sr = M(Vq, {
      IconStyle: function(a, b) {
        var c = N({}, Er, a, b);
        if (c) {
          var d = b[b.length - 1],
            e = "Icon" in c ? c.Icon : {},
            f = !("Icon" in c) || 0 < Object.keys(e).length,
            g,
            h = e.href;
          h ? (g = h) : f && (g = Mq);
          var l, m, p;
          (h = c.hotSpot)
            ? ((l = [h.x, h.y]), (m = h.jg), (p = h.kg))
            : g === Mq
            ? ((l = Iq), (m = Kq), (p = Jq))
            : /^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g) &&
              ((l = [0.5, 0]), (p = m = zq));
          var n,
            h = e.x,
            q = e.y;
          void 0 !== h && void 0 !== q && (n = [h, q]);
          var r,
            h = e.w,
            e = e.h;
          void 0 !== h && void 0 !== e && (r = [h, e]);
          var u,
            e = c.heading;
          void 0 !== e && (u = na(e));
          c = c.scale;
          f
            ? (g == Mq && ((r = Lq), void 0 === c && (c = Nq)),
              (f = new xq({
                anchor: l,
                anchorOrigin: Cq,
                anchorXUnits: m,
                anchorYUnits: p,
                crossOrigin: "anonymous",
                offset: n,
                offsetOrigin: Cq,
                rotation: u,
                scale: c,
                size: r,
                src: g
              })),
              (d.imageStyle = f))
            : (d.imageStyle = Pq);
        }
      },
      LabelStyle: function(a, b) {
        var c = N({}, Fr, a, b);
        c &&
          (b[b.length - 1].textStyle = new Dq({
            fill: new vi({ color: "color" in c ? c.color : Gq }),
            scale: c.scale
          }));
      },
      LineStyle: function(a, b) {
        var c = N({}, Gr, a, b);
        c &&
          (b[b.length - 1].strokeStyle = new wi({
            color: "color" in c ? c.color : Gq,
            width: "width" in c ? c.width : 1
          }));
      },
      PolyStyle: function(a, b) {
        var c = N({}, Nr, a, b);
        if (c) {
          var d = b[b.length - 1];
          d.fillStyle = new vi({ color: "color" in c ? c.color : Gq });
          var e = c.fill;
          void 0 !== e && (d.fill = e);
          c = c.outline;
          void 0 !== c && (d.outline = c);
        }
      }
    }),
    Lr = M(Vq, {
      Pair: function(a, b) {
        var c = N({}, Kr, a, b);
        if (c) {
          var d = c.key;
          d &&
            "normal" == d &&
            ((d = c.styleUrl) && (b[b.length - 1] = d),
            (c = c.Style) && (b[b.length - 1] = c));
        }
      }
    });
  k = Eq.prototype;
  k.Qf = function(a, b) {
    var c = M(Vq, {
      Document: Qn(this.Qf, this),
      Folder: Qn(this.Qf, this),
      Placemark: Rn(this.Wf, this),
      Style: this.Qo.bind(this),
      StyleMap: this.Po.bind(this)
    });
    if ((c = N([], c, a, b, this))) return c;
  };
  k.Wf = function(a, b) {
    var c = N({ geometry: null }, Mr, a, b);
    if (c) {
      var d = new J(),
        e = a.getAttribute("id");
      null !== e && d.cc(e);
      var e = b[0],
        f = c.geometry;
      f && go(f, !1, e);
      d.Pa(f);
      delete c.geometry;
      this.c && d.Df(Yq(c.Style, c.styleUrl, this.g, this.b, this.i));
      delete c.Style;
      d.I(c);
      return d;
    }
  };
  k.Qo = function(a, b) {
    var c = a.getAttribute("id");
    if (null !== c) {
      var d = rr(a, b);
      d &&
        ((c = a.baseURI ? new URL("#" + c, a.baseURI).href : "#" + c),
        (this.b[c] = d));
    }
  };
  k.Po = function(a, b) {
    var c = a.getAttribute("id");
    if (null !== c) {
      var d = N(void 0, Lr, a, b);
      d &&
        ((c = a.baseURI ? new URL("#" + c, a.baseURI).href : "#" + c),
        (this.b[c] = d));
    }
  };
  k.ai = function(a, b) {
    if (!Za(Vq, a.namespaceURI)) return null;
    var c = this.Wf(a, [eo(this, a, b)]);
    return c ? c : null;
  };
  k.oc = function(a, b) {
    if (!Za(Vq, a.namespaceURI)) return [];
    var c;
    c = a.localName;
    if ("Document" == c || "Folder" == c)
      return (c = this.Qf(a, [eo(this, a, b)])) ? c : [];
    if ("Placemark" == c) return (c = this.Wf(a, [eo(this, a, b)])) ? [c] : [];
    if ("kml" == c) {
      c = [];
      var d;
      for (d = a.firstElementChild; d; d = d.nextElementSibling) {
        var e = this.oc(d, b);
        e && bb(c, e);
      }
      return c;
    }
    return [];
  };
  k.Jo = function(a) {
    if (Nn(a)) return Or(this, a);
    if (On(a)) return Pr(this, a);
    if ("string" === typeof a) return (a = Pn(a)), Or(this, a);
  };
  function Or(a, b) {
    var c;
    for (c = b.firstChild; c; c = c.nextSibling)
      if (c.nodeType == Node.ELEMENT_NODE) {
        var d = Pr(a, c);
        if (d) return d;
      }
  }
  function Pr(a, b) {
    var c;
    for (c = b.firstElementChild; c; c = c.nextElementSibling)
      if (Za(Vq, c.namespaceURI) && "name" == c.localName) return T(c);
    for (c = b.firstElementChild; c; c = c.nextElementSibling) {
      var d = c.localName;
      if (
        Za(Vq, c.namespaceURI) &&
        ("Document" == d || "Folder" == d || "Placemark" == d || "kml" == d) &&
        (d = Pr(a, c))
      )
        return d;
    }
  }
  k.Ko = function(a) {
    var b = [];
    Nn(a)
      ? bb(b, Qr(this, a))
      : On(a)
      ? bb(b, Rr(this, a))
      : "string" === typeof a && ((a = Pn(a)), bb(b, Qr(this, a)));
    return b;
  };
  function Qr(a, b) {
    var c,
      d = [];
    for (c = b.firstChild; c; c = c.nextSibling)
      c.nodeType == Node.ELEMENT_NODE && bb(d, Rr(a, c));
    return d;
  }
  function Rr(a, b) {
    var c,
      d = [];
    for (c = b.firstElementChild; c; c = c.nextElementSibling)
      if (Za(Vq, c.namespaceURI) && "NetworkLink" == c.localName) {
        var e = N({}, Jr, c, []);
        d.push(e);
      }
    for (c = b.firstElementChild; c; c = c.nextElementSibling)
      (e = c.localName),
        !Za(Vq, c.namespaceURI) ||
          ("Document" != e && "Folder" != e && "kml" != e) ||
          bb(d, Rr(a, c));
    return d;
  }
  k.No = function(a) {
    var b = [];
    Nn(a)
      ? bb(b, Sr(this, a))
      : On(a)
      ? bb(b, this.Ie(a))
      : "string" === typeof a && ((a = Pn(a)), bb(b, Sr(this, a)));
    return b;
  };
  function Sr(a, b) {
    var c,
      d = [];
    for (c = b.firstChild; c; c = c.nextSibling)
      c.nodeType == Node.ELEMENT_NODE && bb(d, a.Ie(c));
    return d;
  }
  k.Ie = function(a) {
    var b,
      c = [];
    for (b = a.firstElementChild; b; b = b.nextElementSibling)
      if (Za(Vq, b.namespaceURI) && "Region" == b.localName) {
        var d = N({}, wr, b, []);
        c.push(d);
      }
    for (b = a.firstElementChild; b; b = b.nextElementSibling)
      (a = b.localName),
        !Za(Vq, b.namespaceURI) ||
          ("Document" != a && "Folder" != a && "kml" != a) ||
          bb(c, this.Ie(b));
    return c;
  };
  function Tr(a, b) {
    var c = ye(b),
      c = [255 * (4 == c.length ? c[3] : 1), c[2], c[1], c[0]],
      d;
    for (d = 0; 4 > d; ++d) {
      var e = parseInt(c[d], 10).toString(16);
      c[d] = 1 == e.length ? "0" + e : e;
    }
    qp(a, c.join(""));
  }
  function Ur(a, b, c) {
    a = { node: a };
    var d = b.Y(),
      e,
      f;
    "GeometryCollection" == d
      ? ((e = b.pf()), (f = Vr))
      : "MultiPoint" == d
      ? ((e = b.re()), (f = Wr))
      : "MultiLineString" == d
      ? ((e = b.Yc()), (f = Xr))
      : "MultiPolygon" == d
      ? ((e = b.Ad()), (f = Yr))
      : ha(!1, 39);
    $n(a, Zr, f, e, c);
  }
  function $r(a, b, c) {
    $n({ node: a }, as, bs, [b], c);
  }
  function cs(a, b, c) {
    var d = { node: a };
    b.f && a.setAttribute("id", b.f);
    a = b.R();
    var e = {
      address: 1,
      description: 1,
      name: 1,
      open: 1,
      phoneNumber: 1,
      styleUrl: 1,
      visibility: 1
    };
    e[b.a] = 1;
    var f = Object.keys(a || {})
      .sort()
      .filter(function(a) {
        return !e[a];
      });
    if (0 < f.length) {
      var g = Yn(a, f);
      $n(d, ds, es, [{ names: f, values: g }], c);
    }
    if ((f = b.Gc()))
      if ((f = f.call(b, 0)))
        (f = Array.isArray(f) ? f[0] : f),
          this.l && (a.Style = f),
          (f = f.Ka()) && (a.name = f.Ka());
    f = fs[c[c.length - 1].node.namespaceURI];
    a = Yn(a, f);
    $n(d, ds, Xn, a, c, f);
    a = c[0];
    (b = b.V()) && (b = go(b, !0, a));
    $n(d, ds, Vr, [b], c);
  }
  function gs(a, b, c) {
    var d = b.ia();
    a = { node: a };
    a.layout = b.ka;
    a.stride = b.pa();
    $n(a, hs, is, [d], c);
  }
  function js(a, b, c) {
    b = b.Zc();
    var d = b.shift();
    a = { node: a };
    $n(a, ks, ls, b, c);
    $n(a, ks, ms, [d], c);
  }
  function ns(a, b) {
    rp(a, Math.round(1e6 * b) / 1e6);
  }
  var os = M(Vq, ["Document", "Placemark"]),
    rs = M(Vq, {
      Document: L(function(a, b, c) {
        $n({ node: a }, ps, qs, b, c, void 0, this);
      }),
      Placemark: L(cs)
    }),
    ps = M(Vq, { Placemark: L(cs) }),
    ss = M(Vq, {
      Data: L(function(a, b, c) {
        a.setAttribute("name", b.name);
        a = { node: a };
        b = b.value;
        "object" == typeof b
          ? (null !== b &&
              b.displayName &&
              $n(a, ss, Xn, [b.displayName], c, ["displayName"]),
            null !== b && b.value && $n(a, ss, Xn, [b.value], c, ["value"]))
          : $n(a, ss, Xn, [b], c, ["value"]);
      }),
      value: L(function(a, b) {
        qp(a, b);
      }),
      displayName: L(function(a, b) {
        a.appendChild(Jn.createCDATASection(b));
      })
    }),
    ts = {
      Point: "Point",
      LineString: "LineString",
      LinearRing: "LinearRing",
      Polygon: "Polygon",
      MultiPoint: "MultiGeometry",
      MultiLineString: "MultiGeometry",
      MultiPolygon: "MultiGeometry",
      GeometryCollection: "MultiGeometry"
    },
    us = M(Vq, ["href"], M(Uq, ["x", "y", "w", "h"])),
    vs = M(
      Vq,
      { href: L(qp) },
      M(Uq, { x: L(rp), y: L(rp), w: L(rp), h: L(rp) })
    ),
    ws = M(Vq, ["scale", "heading", "Icon", "hotSpot"]),
    ys = M(Vq, {
      Icon: L(function(a, b, c) {
        a = { node: a };
        var d = us[c[c.length - 1].node.namespaceURI],
          e = Yn(b, d);
        $n(a, vs, Xn, e, c, d);
        d = us[Uq[0]];
        e = Yn(b, d);
        $n(a, vs, xs, e, c, d);
      }),
      heading: L(rp),
      hotSpot: L(function(a, b) {
        a.setAttribute("x", b.x);
        a.setAttribute("y", b.y);
        a.setAttribute("xunits", b.jg);
        a.setAttribute("yunits", b.kg);
      }),
      scale: L(ns)
    }),
    zs = M(Vq, ["color", "scale"]),
    As = M(Vq, { color: L(Tr), scale: L(ns) }),
    Bs = M(Vq, ["color", "width"]),
    Cs = M(Vq, { color: L(Tr), width: L(rp) }),
    as = M(Vq, { LinearRing: L(gs) }),
    Zr = M(Vq, {
      LineString: L(gs),
      Point: L(gs),
      Polygon: L(js),
      GeometryCollection: L(Ur)
    }),
    fs = M(
      Vq,
      "name open visibility address phoneNumber description styleUrl Style".split(
        " "
      )
    ),
    ds = M(Vq, {
      ExtendedData: L(function(a, b, c) {
        a = { node: a };
        var d = b.names;
        b = b.values;
        for (var e = d.length, f = 0; f < e; f++)
          $n(a, ss, Ds, [{ name: d[f], value: b[f] }], c);
      }),
      MultiGeometry: L(Ur),
      LineString: L(gs),
      LinearRing: L(gs),
      Point: L(gs),
      Polygon: L(js),
      Style: L(function(a, b, c) {
        a = { node: a };
        var d = {},
          e = b.f,
          f = b.g,
          g = b.a;
        b = b.Ka();
        g instanceof xq && (d.IconStyle = g);
        b && (d.LabelStyle = b);
        f && (d.LineStyle = f);
        e && (d.PolyStyle = e);
        b = Es[c[c.length - 1].node.namespaceURI];
        d = Yn(d, b);
        $n(a, Fs, Xn, d, c, b);
      }),
      address: L(qp),
      description: L(qp),
      name: L(qp),
      open: L(pp),
      phoneNumber: L(qp),
      styleUrl: L(qp),
      visibility: L(pp)
    }),
    hs = M(Vq, {
      coordinates: L(function(a, b, c) {
        c = c[c.length - 1];
        var d = c.layout;
        c = c.stride;
        var e;
        "XY" == d || "XYM" == d
          ? (e = 2)
          : "XYZ" == d || "XYZM" == d
          ? (e = 3)
          : ha(!1, 34);
        var f,
          g = b.length,
          h = "";
        if (0 < g) {
          h += b[0];
          for (d = 1; d < e; ++d) h += "," + b[d];
          for (f = c; f < g; f += c)
            for (h += " " + b[f], d = 1; d < e; ++d) h += "," + b[f + d];
        }
        qp(a, h);
      })
    }),
    ks = M(Vq, { outerBoundaryIs: L($r), innerBoundaryIs: L($r) }),
    Gs = M(Vq, { color: L(Tr) }),
    Es = M(Vq, ["IconStyle", "LabelStyle", "LineStyle", "PolyStyle"]),
    Fs = M(Vq, {
      IconStyle: L(function(a, b, c) {
        a = { node: a };
        var d = {},
          e = b.ac(),
          f = b.de(),
          g = { href: b.b.o };
        if (e) {
          g.w = e[0];
          g.h = e[1];
          var h = b.Ac(),
            l = b.Jc();
          l &&
            f &&
            0 !== l[0] &&
            l[1] !== e[1] &&
            ((g.x = l[0]), (g.y = f[1] - (l[1] + e[1])));
          h &&
            0 !== h[0] &&
            h[1] !== e[1] &&
            (d.hotSpot = {
              x: h[0],
              jg: "pixels",
              y: e[1] - h[1],
              kg: "pixels"
            });
        }
        d.Icon = g;
        e = b.i;
        1 !== e && (d.scale = e);
        b = b.o;
        0 !== b && (d.heading = b);
        b = ws[c[c.length - 1].node.namespaceURI];
        d = Yn(d, b);
        $n(a, ys, Xn, d, c, b);
      }),
      LabelStyle: L(function(a, b, c) {
        a = { node: a };
        var d = {},
          e = b.b;
        e && (d.color = e.b);
        (b = b.a) && 1 !== b && (d.scale = b);
        b = zs[c[c.length - 1].node.namespaceURI];
        d = Yn(d, b);
        $n(a, As, Xn, d, c, b);
      }),
      LineStyle: L(function(a, b, c) {
        a = { node: a };
        var d = Bs[c[c.length - 1].node.namespaceURI];
        b = Yn({ color: b.b, width: b.f }, d);
        $n(a, Cs, Xn, b, c, d);
      }),
      PolyStyle: L(function(a, b, c) {
        $n({ node: a }, Gs, Hs, [b.b], c);
      })
    });
  function xs(a, b, c) {
    return Kn(Uq[0], "gx:" + c);
  }
  function qs(a, b) {
    return Kn(b[b.length - 1].node.namespaceURI, "Placemark");
  }
  function Vr(a, b) {
    if (a) return Kn(b[b.length - 1].node.namespaceURI, ts[a.Y()]);
  }
  var Hs = Vn("color"),
    is = Vn("coordinates"),
    Ds = Vn("Data"),
    es = Vn("ExtendedData"),
    ls = Vn("innerBoundaryIs"),
    Wr = Vn("Point"),
    Xr = Vn("LineString"),
    bs = Vn("LinearRing"),
    Yr = Vn("Polygon"),
    ms = Vn("outerBoundaryIs");
  Eq.prototype.a = function(a, b) {
    b = fo(this, b);
    var c = Kn(Vq[4], "kml");
    c.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:gx", Uq[0]);
    c.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xsi",
      "http://www.w3.org/2001/XMLSchema-instance"
    );
    c.setAttributeNS(
      "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation",
      "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd"
    );
    var d = { node: c },
      e = {};
    1 < a.length ? (e.Document = a) : 1 == a.length && (e.Placemark = a[0]);
    var f = os[c.namespaceURI],
      e = Yn(e, f);
    $n(d, rs, Xn, e, [b], f, this);
    return c;
  };
  (function() {
    var a = {},
      b = { ma: a };
    (function(c) {
      if ("object" === typeof a && "undefined" !== typeof b) b.ma = c();
      else {
        var d;
        "undefined" !== typeof window
          ? (d = window)
          : "undefined" !== typeof global
          ? (d = global)
          : "undefined" !== typeof self
          ? (d = self)
          : (d = this);
        d.Rp = c();
      }
    })(function() {
      return (function d(a, b, g) {
        function h(m, n) {
          if (!b[m]) {
            if (!a[m]) {
              var q = "function" == typeof require && require;
              if (!n && q) return q(m, !0);
              if (l) return l(m, !0);
              q = Error("Cannot find module '" + m + "'");
              throw ((q.code = "MODULE_NOT_FOUND"), q);
            }
            q = b[m] = { ma: {} };
            a[m][0].call(
              q.ma,
              function(b) {
                var d = a[m][1][b];
                return h(d ? d : b);
              },
              q,
              q.ma,
              d,
              a,
              b,
              g
            );
          }
          return b[m].ma;
        }
        for (
          var l = "function" == typeof require && require, m = 0;
          m < g.length;
          m++
        )
          h(g[m]);
        return h;
      })(
        {
          1: [
            function(a, b, f) {
              f.read = function(a, b, d, e, f) {
                var n;
                n = 8 * f - e - 1;
                var q = (1 << n) - 1,
                  r = q >> 1,
                  u = -7;
                f = d ? f - 1 : 0;
                var w = d ? -1 : 1,
                  y = a[b + f];
                f += w;
                d = y & ((1 << -u) - 1);
                y >>= -u;
                for (u += n; 0 < u; d = 256 * d + a[b + f], f += w, u -= 8);
                n = d & ((1 << -u) - 1);
                d >>= -u;
                for (u += e; 0 < u; n = 256 * n + a[b + f], f += w, u -= 8);
                if (0 === d) d = 1 - r;
                else {
                  if (d === q) return n ? NaN : Infinity * (y ? -1 : 1);
                  n += Math.pow(2, e);
                  d -= r;
                }
                return (y ? -1 : 1) * n * Math.pow(2, d - e);
              };
              f.write = function(a, b, d, e, f, n) {
                var q,
                  r = 8 * n - f - 1,
                  u = (1 << r) - 1,
                  w = u >> 1,
                  y = 23 === f ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                n = e ? 0 : n - 1;
                var z = e ? 1 : -1,
                  A = 0 > b || (0 === b && 0 > 1 / b) ? 1 : 0;
                b = Math.abs(b);
                isNaN(b) || Infinity === b
                  ? ((b = isNaN(b) ? 1 : 0), (e = u))
                  : ((e = Math.floor(Math.log(b) / Math.LN2)),
                    1 > b * (q = Math.pow(2, -e)) && (e--, (q *= 2)),
                    (b = 1 <= e + w ? b + y / q : b + y * Math.pow(2, 1 - w)),
                    2 <= b * q && (e++, (q /= 2)),
                    e + w >= u
                      ? ((b = 0), (e = u))
                      : 1 <= e + w
                      ? ((b = (b * q - 1) * Math.pow(2, f)), (e += w))
                      : ((b = b * Math.pow(2, w - 1) * Math.pow(2, f)),
                        (e = 0)));
                for (; 8 <= f; a[d + n] = b & 255, n += z, b /= 256, f -= 8);
                e = (e << f) | b;
                for (
                  r += f;
                  0 < r;
                  a[d + n] = e & 255, n += z, e /= 256, r -= 8
                );
                a[d + n - z] |= 128 * A;
              };
            },
            {}
          ],
          2: [
            function(a, b) {
              function f(a) {
                this.gc =
                  ArrayBuffer.isView && ArrayBuffer.isView(a)
                    ? a
                    : new Uint8Array(a || 0);
                this.type = this.ha = 0;
                this.length = this.gc.length;
              }
              function g(a, b, d) {
                var e = d.gc,
                  f,
                  g;
                g = e[d.ha++];
                f = (g & 112) >> 4;
                if (128 > g) return h(a, f, b);
                g = e[d.ha++];
                f |= (g & 127) << 3;
                if (128 > g) return h(a, f, b);
                g = e[d.ha++];
                f |= (g & 127) << 10;
                if (128 > g) return h(a, f, b);
                g = e[d.ha++];
                f |= (g & 127) << 17;
                if (128 > g) return h(a, f, b);
                g = e[d.ha++];
                f |= (g & 127) << 24;
                if (128 > g) return h(a, f, b);
                g = e[d.ha++];
                if (128 > g) return h(a, f | ((g & 1) << 31), b);
                throw Error("Expected varint not more than 10 bytes");
              }
              function h(a, b, d) {
                return d
                  ? 4294967296 * b + (a >>> 0)
                  : 4294967296 * (b >>> 0) + (a >>> 0);
              }
              b.ma = f;
              var l = a("ieee754");
              f.f = 0;
              f.g = 1;
              f.b = 2;
              f.a = 5;
              f.prototype = {
                Uf: function(a, b, d) {
                  for (d = d || this.length; this.ha < d; ) {
                    var e = this.Ia(),
                      f = e >> 3,
                      g = this.ha;
                    this.type = e & 7;
                    a(f, b, this);
                    this.ha === g && this.qp(e);
                  }
                  return b;
                },
                Fo: function() {
                  var a = l.read(this.gc, this.ha, !0, 23, 4);
                  this.ha += 4;
                  return a;
                },
                Bo: function() {
                  var a = l.read(this.gc, this.ha, !0, 52, 8);
                  this.ha += 8;
                  return a;
                },
                Ia: function(a) {
                  var b = this.gc,
                    d,
                    e;
                  e = b[this.ha++];
                  d = e & 127;
                  if (128 > e) return d;
                  e = b[this.ha++];
                  d |= (e & 127) << 7;
                  if (128 > e) return d;
                  e = b[this.ha++];
                  d |= (e & 127) << 14;
                  if (128 > e) return d;
                  e = b[this.ha++];
                  d |= (e & 127) << 21;
                  if (128 > e) return d;
                  e = b[this.ha];
                  return g(d | ((e & 15) << 28), a, this);
                },
                Ro: function() {
                  return this.Ia(!0);
                },
                Kd: function() {
                  var a = this.Ia();
                  return 1 === a % 2 ? (a + 1) / -2 : a / 2;
                },
                zo: function() {
                  return !!this.Ia();
                },
                Yf: function() {
                  for (
                    var a = this.Ia() + this.ha,
                      b = this.gc,
                      d = "",
                      e = this.ha;
                    e < a;

                  ) {
                    var f = b[e],
                      g = null,
                      h = 239 < f ? 4 : 223 < f ? 3 : 191 < f ? 2 : 1;
                    if (e + h > a) break;
                    var l, z, A;
                    if (1 === h) 128 > f && (g = f);
                    else if (2 === h)
                      (l = b[e + 1]),
                        128 === (l & 192) &&
                          ((g = ((f & 31) << 6) | (l & 63)),
                          127 >= g && (g = null));
                    else if (3 === h) {
                      if (
                        ((l = b[e + 1]),
                        (z = b[e + 2]),
                        128 === (l & 192) &&
                          128 === (z & 192) &&
                          ((g = ((f & 15) << 12) | ((l & 63) << 6) | (z & 63)),
                          2047 >= g || (55296 <= g && 57343 >= g)))
                      )
                        g = null;
                    } else
                      4 === h &&
                        ((l = b[e + 1]),
                        (z = b[e + 2]),
                        (A = b[e + 3]),
                        128 === (l & 192) &&
                          128 === (z & 192) &&
                          128 === (A & 192) &&
                          ((g =
                            ((f & 15) << 18) |
                            ((l & 63) << 12) |
                            ((z & 63) << 6) |
                            (A & 63)),
                          65535 >= g || 1114112 <= g)) &&
                        (g = null);
                    null === g
                      ? ((g = 65533), (h = 1))
                      : 65535 < g &&
                        ((g -= 65536),
                        (d += String.fromCharCode(((g >>> 10) & 1023) | 55296)),
                        (g = 56320 | (g & 1023)));
                    d += String.fromCharCode(g);
                    e += h;
                  }
                  this.ha = a;
                  return d;
                },
                qp: function(a) {
                  a &= 7;
                  if (a === f.f) for (; 127 < this.gc[this.ha++]; );
                  else if (a === f.b) this.ha = this.Ia() + this.ha;
                  else if (a === f.a) this.ha += 4;
                  else if (a === f.g) this.ha += 8;
                  else throw Error("Unimplemented type: " + a);
                }
              };
            },
            { ieee754: 1 }
          ]
        },
        {},
        [2]
      )(2);
    });
    gl = b.ma;
  })();
  (function() {
    var a = {},
      b = { ma: a };
    (function(c) {
      if ("object" === typeof a && "undefined" !== typeof b) b.ma = c();
      else {
        var d;
        "undefined" !== typeof window
          ? (d = window)
          : "undefined" !== typeof global
          ? (d = global)
          : "undefined" !== typeof self
          ? (d = self)
          : (d = this);
        d.Up = c();
      }
    })(function() {
      return (function d(a, b, g) {
        function h(m, n) {
          if (!b[m]) {
            if (!a[m]) {
              var q = "function" == typeof require && require;
              if (!n && q) return q(m, !0);
              if (l) return l(m, !0);
              q = Error("Cannot find module '" + m + "'");
              throw ((q.code = "MODULE_NOT_FOUND"), q);
            }
            q = b[m] = { ma: {} };
            a[m][0].call(
              q.ma,
              function(b) {
                var d = a[m][1][b];
                return h(d ? d : b);
              },
              q,
              q.ma,
              d,
              a,
              b,
              g
            );
          }
          return b[m].ma;
        }
        for (
          var l = "function" == typeof require && require, m = 0;
          m < g.length;
          m++
        )
          h(g[m]);
        return h;
      })(
        {
          1: [
            function(a, b) {
              function f(a, b) {
                this.x = a;
                this.y = b;
              }
              b.ma = f;
              f.prototype = {
                clone: function() {
                  return new f(this.x, this.y);
                },
                add: function(a) {
                  return this.clone().oj(a);
                },
                rotate: function(a) {
                  return this.clone().yj(a);
                },
                round: function() {
                  return this.clone().zj();
                },
                angle: function() {
                  return Math.atan2(this.y, this.x);
                },
                oj: function(a) {
                  this.x += a.x;
                  this.y += a.y;
                  return this;
                },
                yj: function(a) {
                  var b = Math.cos(a);
                  a = Math.sin(a);
                  var d = a * this.x + b * this.y;
                  this.x = b * this.x - a * this.y;
                  this.y = d;
                  return this;
                },
                zj: function() {
                  this.x = Math.round(this.x);
                  this.y = Math.round(this.y);
                  return this;
                }
              };
              f.b = function(a) {
                return a instanceof f
                  ? a
                  : Array.isArray(a)
                  ? new f(a[0], a[1])
                  : a;
              };
            },
            {}
          ],
          2: [
            function(a, b) {
              b.ma.nj = a("./lib/vectortile.js");
              b.ma.Op = a("./lib/vectortilefeature.js");
              b.ma.Pp = a("./lib/vectortilelayer.js");
            },
            {
              "./lib/vectortile.js": 3,
              "./lib/vectortilefeature.js": 4,
              "./lib/vectortilelayer.js": 5
            }
          ],
          3: [
            function(a, b) {
              function f(a, b, d) {
                3 === a &&
                  ((a = new g(d, d.Ia() + d.ha)), a.length && (b[a.name] = a));
              }
              var g = a("./vectortilelayer");
              b.ma = function(a, b) {
                this.layers = a.Uf(f, {}, b);
              };
            },
            { "./vectortilelayer": 5 }
          ],
          4: [
            function(a, b) {
              function f(a, b, d, e, f) {
                this.properties = {};
                this.extent = d;
                this.type = 0;
                this.rc = a;
                this.Ye = -1;
                this.Td = e;
                this.Vd = f;
                a.Uf(g, this, b);
              }
              function g(a, b, d) {
                if (1 == a) b.id = d.Ia();
                else if (2 == a)
                  for (a = d.Ia() + d.ha; d.ha < a; ) {
                    var e = b.Td[d.Ia()],
                      f = b.Vd[d.Ia()];
                    b.properties[e] = f;
                  }
                else 3 == a ? (b.type = d.Ia()) : 4 == a && (b.Ye = d.ha);
              }
              var h = a("point-geometry");
              b.ma = f;
              f.b = ["Unknown", "Point", "LineString", "Polygon"];
              f.prototype.fh = function() {
                var a = this.rc;
                a.ha = this.Ye;
                for (
                  var b = a.Ia() + a.ha, d = 1, e = 0, f = 0, g = 0, u = [], w;
                  a.ha < b;

                )
                  if (
                    (e || ((e = a.Ia()), (d = e & 7), (e >>= 3)),
                    e--,
                    1 === d || 2 === d)
                  )
                    (f += a.Kd()),
                      (g += a.Kd()),
                      1 === d && (w && u.push(w), (w = [])),
                      w.push(new h(f, g));
                  else if (7 === d) w && w.push(w[0].clone());
                  else throw Error("unknown command " + d);
                w && u.push(w);
                return u;
              };
              f.prototype.bbox = function() {
                var a = this.rc;
                a.ha = this.Ye;
                for (
                  var b = a.Ia() + a.ha,
                    d = 1,
                    e = 0,
                    f = 0,
                    g = 0,
                    h = Infinity,
                    w = -Infinity,
                    y = Infinity,
                    z = -Infinity;
                  a.ha < b;

                )
                  if (
                    (e || ((e = a.Ia()), (d = e & 7), (e >>= 3)),
                    e--,
                    1 === d || 2 === d)
                  )
                    (f += a.Kd()),
                      (g += a.Kd()),
                      f < h && (h = f),
                      f > w && (w = f),
                      g < y && (y = g),
                      g > z && (z = g);
                  else if (7 !== d) throw Error("unknown command " + d);
                return [h, y, w, z];
              };
            },
            { "point-geometry": 1 }
          ],
          5: [
            function(a, b) {
              function f(a, b) {
                this.version = 1;
                this.name = null;
                this.extent = 4096;
                this.length = 0;
                this.rc = a;
                this.Td = [];
                this.Vd = [];
                this.Sd = [];
                a.Uf(g, this, b);
                this.length = this.Sd.length;
              }
              function g(a, b, d) {
                15 === a
                  ? (b.version = d.Ia())
                  : 1 === a
                  ? (b.name = d.Yf())
                  : 5 === a
                  ? (b.extent = d.Ia())
                  : 2 === a
                  ? b.Sd.push(d.ha)
                  : 3 === a
                  ? b.Td.push(d.Yf())
                  : 4 === a && b.Vd.push(h(d));
              }
              function h(a) {
                for (var b = null, d = a.Ia() + a.ha; a.ha < d; )
                  (b = a.Ia() >> 3),
                    (b =
                      1 === b
                        ? a.Yf()
                        : 2 === b
                        ? a.Fo()
                        : 3 === b
                        ? a.Bo()
                        : 4 === b
                        ? a.Ro()
                        : 5 === b
                        ? a.Ia()
                        : 6 === b
                        ? a.Kd()
                        : 7 === b
                        ? a.zo()
                        : null);
                return b;
              }
              var l = a("./vectortilefeature.js");
              b.ma = f;
              f.prototype.feature = function(a) {
                if (0 > a || a >= this.Sd.length)
                  throw Error("feature index out of bounds");
                this.rc.ha = this.Sd[a];
                a = this.rc.Ia() + this.rc.ha;
                return new l(this.rc, a, this.extent, this.Td, this.Vd);
              };
            },
            { "./vectortilefeature.js": 4 }
          ]
        },
        {},
        [2]
      )(2);
    });
    hl = b.ma;
  })();
  function Is(a, b, c, d) {
    this.g = a;
    this.b = b;
    this.c = c;
    this.f = d;
  }
  k = Is.prototype;
  k.get = function(a) {
    return this.f[a];
  };
  k.Kb = function() {
    return this.c;
  };
  k.G = function() {
    this.a ||
      (this.a =
        "Point" === this.g ? Sb(this.b) : Tb(this.b, 0, this.b.length, 2));
    return this.a;
  };
  k.Vb = function() {
    return this.b;
  };
  k.ia = Is.prototype.Vb;
  k.V = function() {
    return this;
  };
  k.Tm = function() {
    return this.f;
  };
  k.Bd = Is.prototype.V;
  k.pa = function() {
    return 2;
  };
  k.Gc = ea;
  k.Y = function() {
    return this.g;
  };
  function Js(a) {
    co.call(this);
    a = a ? a : {};
    this.defaultDataProjection = new sc({ code: "", units: "tile-pixels" });
    this.b = a.featureClass ? a.featureClass : Is;
    this.g = a.geometryName ? a.geometryName : "geometry";
    this.a = a.layerName ? a.layerName : "layer";
    this.f = a.layers ? a.layers : null;
  }
  v(Js, co);
  Js.prototype.Y = function() {
    return "arraybuffer";
  };
  Js.prototype.La = function(a, b) {
    var c = this.f,
      d = new gl(a),
      d = new hl.nj(d),
      e = [],
      f = this.b,
      g,
      h,
      l;
    for (l in d.layers)
      if (!c || -1 != c.indexOf(l)) {
        g = d.layers[l];
        for (var m = 0, p = g.length; m < p; ++m) {
          if (f === Is) {
            var n = g.feature(m);
            h = l;
            var q = n.fh(),
              r = [],
              u = [];
            Ks(q, u, r);
            var w = n.type,
              y = void 0;
            1 === w
              ? (y = 1 === q.length ? "Point" : "MultiPoint")
              : 2 === w
              ? (y = 1 === q.length ? "LineString" : "MultiLineString")
              : 3 === w && (y = "Polygon");
            n = n.properties;
            n[this.a] = h;
            h = new this.b(y, u, r, n);
          } else {
            q = g.feature(m);
            n = l;
            y = b;
            h = new this.b();
            r = q.id;
            u = q.properties;
            u[this.a] = n;
            n = q.type;
            if (0 === n) n = null;
            else {
              var q = q.fh(),
                w = [],
                z = [];
              Ks(q, z, w);
              var A = void 0;
              1 === n
                ? (A = 1 === q.length ? new C(null) : new R(null))
                : 2 === n
                ? 1 === q.length
                  ? (A = new P(null))
                  : (A = new Q(null))
                : 3 === n && (A = new E(null));
              A.da("XY", z, w);
              n = A;
            }
            (y = go(n, !1, fo(this, y))) && (u[this.g] = y);
            h.cc(r);
            h.I(u);
            h.Nc(this.g);
          }
          e.push(h);
        }
      }
    return e;
  };
  Js.prototype.Wa = function() {
    return this.defaultDataProjection;
  };
  Js.prototype.c = function(a) {
    this.f = a;
  };
  function Ks(a, b, c) {
    for (var d = 0, e = 0, f = a.length; e < f; ++e) {
      var g = a[e],
        h,
        l;
      h = 0;
      for (l = g.length; h < l; ++h) {
        var m = g[h];
        b.push(m.x, m.y);
      }
      d += 2 * h;
      c.push(d);
    }
  }
  function Ls() {
    dp.call(this);
    this.defaultDataProjection = zc("EPSG:4326");
  }
  v(Ls, dp);
  function Ms(a, b) {
    b[b.length - 1].Nd[a.getAttribute("k")] = a.getAttribute("v");
  }
  var Ns = [null],
    Os = M(Ns, {
      nd: function(a, b) {
        b[b.length - 1].bd.push(a.getAttribute("ref"));
      },
      tag: Ms
    }),
    Qs = M(Ns, {
      node: function(a, b) {
        var c = b[0],
          d = b[b.length - 1],
          e = a.getAttribute("id"),
          f = [
            parseFloat(a.getAttribute("lon")),
            parseFloat(a.getAttribute("lat"))
          ];
        d.jh[e] = f;
        var g = N({ Nd: {} }, Ps, a, b);
        wa(g.Nd) ||
          ((f = new C(f)),
          go(f, !1, c),
          (c = new J(f)),
          c.cc(e),
          c.I(g.Nd),
          d.features.push(c));
      },
      way: function(a, b) {
        for (
          var c = b[0],
            d = a.getAttribute("id"),
            e = N({ bd: [], Nd: {} }, Os, a, b),
            f = b[b.length - 1],
            g = [],
            h = 0,
            l = e.bd.length;
          h < l;
          h++
        )
          bb(g, f.jh[e.bd[h]]);
        e.bd[0] == e.bd[e.bd.length - 1]
          ? ((h = new E(null)), h.da("XY", g, [g.length]))
          : ((h = new P(null)), h.da("XY", g));
        go(h, !1, c);
        c = new J(h);
        c.cc(d);
        c.I(e.Nd);
        f.features.push(c);
      }
    }),
    Ps = M(Ns, { tag: Ms });
  Ls.prototype.oc = function(a, b) {
    var c = eo(this, a, b);
    return "osm" == a.localName &&
      ((c = N({ jh: {}, features: [] }, Qs, a, [c])), c.features)
      ? c.features
      : [];
  };
  function Rs(a) {
    return a.getAttributeNS("http://www.w3.org/1999/xlink", "href");
  }
  function Ss() {}
  Ss.prototype.read = function(a) {
    return Nn(a)
      ? this.a(a)
      : On(a)
      ? this.b(a)
      : "string" === typeof a
      ? ((a = Pn(a)), this.a(a))
      : null;
  };
  function Ts() {}
  v(Ts, Ss);
  Ts.prototype.a = function(a) {
    for (a = a.firstChild; a; a = a.nextSibling)
      if (a.nodeType == Node.ELEMENT_NODE) return this.b(a);
    return null;
  };
  Ts.prototype.b = function(a) {
    return (a = N({}, Us, a, [])) ? a : null;
  };
  var Vs = [null, "http://www.opengis.net/ows/1.1"],
    Us = M(Vs, {
      ServiceIdentification: K(function(a, b) {
        return N({}, Ws, a, b);
      }),
      ServiceProvider: K(function(a, b) {
        return N({}, Xs, a, b);
      }),
      OperationsMetadata: K(function(a, b) {
        return N({}, Ys, a, b);
      })
    }),
    Zs = M(Vs, {
      DeliveryPoint: K(T),
      City: K(T),
      AdministrativeArea: K(T),
      PostalCode: K(T),
      Country: K(T),
      ElectronicMailAddress: K(T)
    }),
    $s = M(Vs, {
      Value: Tn(function(a) {
        return T(a);
      })
    }),
    at = M(Vs, {
      AllowedValues: K(function(a, b) {
        return N({}, $s, a, b);
      })
    }),
    ct = M(Vs, {
      Phone: K(function(a, b) {
        return N({}, bt, a, b);
      }),
      Address: K(function(a, b) {
        return N({}, Zs, a, b);
      })
    }),
    et = M(Vs, {
      HTTP: K(function(a, b) {
        return N({}, dt, a, b);
      })
    }),
    dt = M(Vs, {
      Get: Tn(function(a, b) {
        var c = Rs(a);
        return c ? N({ href: c }, ft, a, b) : void 0;
      }),
      Post: void 0
    }),
    gt = M(Vs, {
      DCP: K(function(a, b) {
        return N({}, et, a, b);
      })
    }),
    Ys = M(Vs, {
      Operation: function(a, b) {
        var c = a.getAttribute("name"),
          d = N({}, gt, a, b);
        d && (b[b.length - 1][c] = d);
      }
    }),
    bt = M(Vs, { Voice: K(T), Facsimile: K(T) }),
    ft = M(Vs, {
      Constraint: Tn(function(a, b) {
        var c = a.getAttribute("name");
        return c ? N({ name: c }, at, a, b) : void 0;
      })
    }),
    ht = M(Vs, {
      IndividualName: K(T),
      PositionName: K(T),
      ContactInfo: K(function(a, b) {
        return N({}, ct, a, b);
      })
    }),
    Ws = M(Vs, { Title: K(T), ServiceTypeVersion: K(T), ServiceType: K(T) }),
    Xs = M(Vs, {
      ProviderName: K(T),
      ProviderSite: K(Rs),
      ServiceContact: K(function(a, b) {
        return N({}, ht, a, b);
      })
    });
  function it(a, b, c, d) {
    var e;
    void 0 !== d ? (e = d) : (e = []);
    for (var f = (d = 0); f < b; ) {
      var g = a[f++];
      e[d++] = a[f++];
      e[d++] = g;
      for (g = 2; g < c; ++g) e[d++] = a[f++];
    }
    e.length = d;
  }
  function jt(a) {
    a = a ? a : {};
    co.call(this);
    this.defaultDataProjection = zc("EPSG:4326");
    this.b = a.factor ? a.factor : 1e5;
    this.a = a.geometryLayout ? a.geometryLayout : "XY";
  }
  v(jt, lq);
  function kt(a, b, c) {
    var d,
      e = Array(b);
    for (d = 0; d < b; ++d) e[d] = 0;
    var f, g;
    f = 0;
    for (g = a.length; f < g; )
      for (d = 0; d < b; ++d, ++f) {
        var h = a[f],
          l = h - e[d];
        e[d] = h;
        a[f] = l;
      }
    return lt(a, c ? c : 1e5);
  }
  function mt(a, b, c) {
    var d,
      e = Array(b);
    for (d = 0; d < b; ++d) e[d] = 0;
    a = nt(a, c ? c : 1e5);
    var f;
    c = 0;
    for (f = a.length; c < f; )
      for (d = 0; d < b; ++d, ++c) (e[d] += a[c]), (a[c] = e[d]);
    return a;
  }
  function lt(a, b) {
    var c = b ? b : 1e5,
      d,
      e;
    d = 0;
    for (e = a.length; d < e; ++d) a[d] = Math.round(a[d] * c);
    c = 0;
    for (d = a.length; c < d; ++c)
      (e = a[c]), (a[c] = 0 > e ? ~(e << 1) : e << 1);
    c = "";
    d = 0;
    for (e = a.length; d < e; ++d) {
      for (var f = a[d], g, h = ""; 32 <= f; )
        (g = (32 | (f & 31)) + 63), (h += String.fromCharCode(g)), (f >>= 5);
      h += String.fromCharCode(f + 63);
      c += h;
    }
    return c;
  }
  function nt(a, b) {
    var c = b ? b : 1e5,
      d = [],
      e = 0,
      f = 0,
      g,
      h;
    g = 0;
    for (h = a.length; g < h; ++g) {
      var l = a.charCodeAt(g) - 63,
        e = e | ((l & 31) << f);
      32 > l ? (d.push(e), (f = e = 0)) : (f += 5);
    }
    e = 0;
    for (f = d.length; e < f; ++e)
      (g = d[e]), (d[e] = g & 1 ? ~(g >> 1) : g >> 1);
    e = 0;
    for (f = d.length; e < f; ++e) d[e] /= c;
    return d;
  }
  k = jt.prototype;
  k.Hd = function(a, b) {
    var c = this.Jd(a, b);
    return new J(c);
  };
  k.Tf = function(a, b) {
    return [this.Hd(a, b)];
  };
  k.Jd = function(a, b) {
    var c = Vc(this.a),
      d = mt(a, c, this.b);
    it(d, d.length, c, d);
    c = id(d, 0, d.length, c);
    return go(new P(c, this.a), !1, fo(this, b));
  };
  k.Re = function(a, b) {
    var c = a.V();
    if (c) return this.Pd(c, b);
    ha(!1, 40);
    return "";
  };
  k.Oi = function(a, b) {
    return this.Re(a[0], b);
  };
  k.Pd = function(a, b) {
    a = go(a, !0, fo(this, b));
    var c = a.ia(),
      d = a.pa();
    it(c, c.length, d, c);
    return kt(c, d, this.b);
  };
  function ot(a) {
    a = a ? a : {};
    co.call(this);
    this.defaultDataProjection = zc(
      a.defaultDataProjection ? a.defaultDataProjection : "EPSG:4326"
    );
  }
  v(ot, ho);
  function pt(a, b) {
    var c = [],
      d,
      e,
      f,
      g;
    f = 0;
    for (g = a.length; f < g; ++f)
      (d = a[f]),
        0 < f && c.pop(),
        0 <= d ? (e = b[d]) : (e = b[~d].slice().reverse()),
        c.push.apply(c, e);
    d = 0;
    for (e = c.length; d < e; ++d) c[d] = c[d].slice();
    return c;
  }
  function qt(a, b, c, d, e) {
    a = a.geometries;
    var f = [],
      g,
      h;
    g = 0;
    for (h = a.length; g < h; ++g) f[g] = rt(a[g], b, c, d, e);
    return f;
  }
  function rt(a, b, c, d, e) {
    var f = a.type,
      g = st[f];
    b = "Point" === f || "MultiPoint" === f ? g(a, c, d) : g(a, b);
    c = new J();
    c.Pa(go(b, !1, e));
    void 0 !== a.id && c.cc(a.id);
    a.properties && c.I(a.properties);
    return c;
  }
  ot.prototype.Sf = function(a, b) {
    if ("Topology" == a.type) {
      var c,
        d = null,
        e = null;
      a.transform && ((c = a.transform), (d = c.scale), (e = c.translate));
      var f = a.arcs;
      if (c) {
        c = d;
        var g = e,
          h,
          l;
        h = 0;
        for (l = f.length; h < l; ++h) {
          var m = f[h],
            p = c,
            n = g,
            q = 0,
            r = 0,
            u,
            w,
            y;
          w = 0;
          for (y = m.length; w < y; ++w)
            (u = m[w]),
              (q += u[0]),
              (r += u[1]),
              (u[0] = q),
              (u[1] = r),
              tt(u, p, n);
        }
      }
      c = [];
      g = va(a.objects);
      h = 0;
      for (l = g.length; h < l; ++h)
        "GeometryCollection" === g[h].type
          ? ((m = g[h]), c.push.apply(c, qt(m, f, d, e, b)))
          : ((m = g[h]), c.push(rt(m, f, d, e, b)));
      return c;
    }
    return [];
  };
  function tt(a, b, c) {
    a[0] = a[0] * b[0] + c[0];
    a[1] = a[1] * b[1] + c[1];
  }
  ot.prototype.Wa = function() {
    return this.defaultDataProjection;
  };
  var st = {
    Point: function(a, b, c) {
      a = a.coordinates;
      b && c && tt(a, b, c);
      return new C(a);
    },
    LineString: function(a, b) {
      var c = pt(a.arcs, b);
      return new P(c);
    },
    Polygon: function(a, b) {
      var c = [],
        d,
        e;
      d = 0;
      for (e = a.arcs.length; d < e; ++d) c[d] = pt(a.arcs[d], b);
      return new E(c);
    },
    MultiPoint: function(a, b, c) {
      a = a.coordinates;
      var d, e;
      if (b && c) for (d = 0, e = a.length; d < e; ++d) tt(a[d], b, c);
      return new R(a);
    },
    MultiLineString: function(a, b) {
      var c = [],
        d,
        e;
      d = 0;
      for (e = a.arcs.length; d < e; ++d) c[d] = pt(a.arcs[d], b);
      return new Q(c);
    },
    MultiPolygon: function(a, b) {
      var c = [],
        d,
        e,
        f,
        g,
        h,
        l;
      h = 0;
      for (l = a.arcs.length; h < l; ++h) {
        d = a.arcs[h];
        e = [];
        f = 0;
        for (g = d.length; f < g; ++f) e[f] = pt(d[f], b);
        c[h] = e;
      }
      return new S(c);
    }
  };
  function ut(a) {
    a = a ? a : {};
    this.i = a.featureType;
    this.g = a.featureNS;
    this.b = a.gmlFormat ? a.gmlFormat : new tp();
    this.c = a.schemaLocation
      ? a.schemaLocation
      : "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";
    dp.call(this);
  }
  v(ut, dp);
  ut.prototype.oc = function(a, b) {
    var c = { featureType: this.i, featureNS: this.g };
    ta(c, eo(this, a, b ? b : {}));
    c = [c];
    this.b.b["http://www.opengis.net/gml"].featureMember = Rn(gp.prototype.Id);
    (c = N([], this.b.b, a, c, this.b)) || (c = []);
    return c;
  };
  ut.prototype.o = function(a) {
    if (Nn(a)) return vt(a);
    if (On(a)) return N({}, wt, a, []);
    if ("string" === typeof a) return (a = Pn(a)), vt(a);
  };
  ut.prototype.l = function(a) {
    if (Nn(a)) return xt(this, a);
    if (On(a)) return yt(this, a);
    if ("string" === typeof a) return (a = Pn(a)), xt(this, a);
  };
  function xt(a, b) {
    for (var c = b.firstChild; c; c = c.nextSibling)
      if (c.nodeType == Node.ELEMENT_NODE) return yt(a, c);
  }
  var zt = {
    "http://www.opengis.net/gml": { boundedBy: K(gp.prototype.Ee, "bounds") }
  };
  function yt(a, b) {
    var c = {},
      d = op(b.getAttribute("numberOfFeatures"));
    c.numberOfFeatures = d;
    return N(c, zt, b, [], a.b);
  }
  var At = {
      "http://www.opengis.net/wfs": {
        totalInserted: K(np),
        totalUpdated: K(np),
        totalDeleted: K(np)
      }
    },
    Bt = {
      "http://www.opengis.net/ogc": {
        FeatureId: Rn(function(a) {
          return a.getAttribute("fid");
        })
      }
    },
    Ct = {
      "http://www.opengis.net/wfs": {
        Feature: function(a, b) {
          Zn(Bt, a, b);
        }
      }
    },
    wt = {
      "http://www.opengis.net/wfs": {
        TransactionSummary: K(function(a, b) {
          return N({}, At, a, b);
        }, "transactionSummary"),
        InsertResults: K(function(a, b) {
          return N([], Ct, a, b);
        }, "insertIds")
      }
    };
  function vt(a) {
    for (a = a.firstChild; a; a = a.nextSibling)
      if (a.nodeType == Node.ELEMENT_NODE) return N({}, wt, a, []);
  }
  var Dt = { "http://www.opengis.net/wfs": { PropertyName: L(qp) } };
  function Et(a, b) {
    var c = Kn("http://www.opengis.net/ogc", "Filter"),
      d = Kn("http://www.opengis.net/ogc", "FeatureId");
    c.appendChild(d);
    d.setAttribute("fid", b);
    a.appendChild(c);
  }
  var Ft = {
    "http://www.opengis.net/wfs": {
      Insert: L(function(a, b, c) {
        var d = c[c.length - 1],
          d = Kn(d.featureNS, d.featureType);
        a.appendChild(d);
        tp.prototype.Ni(d, b, c);
      }),
      Update: L(function(a, b, c) {
        var d = c[c.length - 1];
        ha(void 0 !== b.f, 27);
        var e = d.featureType,
          f = d.featurePrefix,
          f = f ? f : "feature",
          g = d.featureNS;
        a.setAttribute("typeName", f + ":" + e);
        a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + f, g);
        e = b.f;
        if (void 0 !== e) {
          for (var f = b.S(), g = [], h = 0, l = f.length; h < l; h++) {
            var m = b.get(f[h]);
            void 0 !== m && g.push({ name: f[h], value: m });
          }
          $n({ node: a, srsName: d.srsName }, Ft, Vn("Property"), g, c);
          Et(a, e);
        }
      }),
      Delete: L(function(a, b, c) {
        var d = c[c.length - 1];
        ha(void 0 !== b.f, 26);
        c = d.featureType;
        var e = d.featurePrefix,
          e = e ? e : "feature",
          d = d.featureNS;
        a.setAttribute("typeName", e + ":" + c);
        a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + e, d);
        b = b.f;
        void 0 !== b && Et(a, b);
      }),
      Property: L(function(a, b, c) {
        var d = Kn("http://www.opengis.net/wfs", "Name");
        a.appendChild(d);
        qp(d, b.name);
        void 0 !== b.value &&
          null !== b.value &&
          ((d = Kn("http://www.opengis.net/wfs", "Value")),
          a.appendChild(d),
          b.value instanceof Rc
            ? tp.prototype.pd(d, b.value, c)
            : qp(d, b.value));
      }),
      Native: L(function(a, b) {
        b.yp && a.setAttribute("vendorId", b.yp);
        void 0 !== b.cp && a.setAttribute("safeToIgnore", b.cp);
        void 0 !== b.value && qp(a, b.value);
      })
    }
  };
  function Gt(a, b, c) {
    a = { node: a };
    var d = b.b;
    $n(a, Ht, Vn(d.Nb), [d], c);
    b = b.a;
    $n(a, Ht, Vn(b.Nb), [b], c);
  }
  function It(a, b) {
    void 0 !== b.a && a.setAttribute("matchCase", b.a.toString());
    Jt(a, b.b);
    Kt(a, "" + b.g);
  }
  function Lt(a, b, c) {
    a = Kn("http://www.opengis.net/ogc", a);
    qp(a, c);
    b.appendChild(a);
  }
  function Jt(a, b) {
    Lt("PropertyName", a, b);
  }
  function Kt(a, b) {
    Lt("Literal", a, b);
  }
  var Ht = {
    "http://www.opengis.net/wfs": {
      Query: L(function(a, b, c) {
        var d = c[c.length - 1],
          e = d.featurePrefix,
          f = d.featureNS,
          g = d.propertyNames,
          h = d.srsName;
        a.setAttribute("typeName", (e ? e + ":" : "") + b);
        h && a.setAttribute("srsName", h);
        f && a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + e, f);
        b = ta({}, d);
        b.node = a;
        $n(b, Dt, Vn("PropertyName"), g, c);
        if ((d = d.filter))
          (g = Kn("http://www.opengis.net/ogc", "Filter")),
            a.appendChild(g),
            $n({ node: g }, Ht, Vn(d.Nb), [d], c);
      })
    },
    "http://www.opengis.net/ogc": {
      And: L(Gt),
      Or: L(Gt),
      Not: L(function(a, b, c) {
        b = b.condition;
        $n({ node: a }, Ht, Vn(b.Nb), [b], c);
      }),
      BBOX: L(function(a, b, c) {
        c[c.length - 1].srsName = b.srsName;
        Jt(a, b.geometryName);
        tp.prototype.pd(a, b.extent, c);
      }),
      Intersects: L(function(a, b, c) {
        c[c.length - 1].srsName = b.srsName;
        Jt(a, b.geometryName);
        tp.prototype.pd(a, b.geometry, c);
      }),
      Within: L(function(a, b, c) {
        c[c.length - 1].srsName = b.srsName;
        Jt(a, b.geometryName);
        tp.prototype.pd(a, b.geometry, c);
      }),
      PropertyIsEqualTo: L(It),
      PropertyIsNotEqualTo: L(It),
      PropertyIsLessThan: L(It),
      PropertyIsLessThanOrEqualTo: L(It),
      PropertyIsGreaterThan: L(It),
      PropertyIsGreaterThanOrEqualTo: L(It),
      PropertyIsNull: L(function(a, b) {
        Jt(a, b.b);
      }),
      PropertyIsBetween: L(function(a, b) {
        Jt(a, b.b);
        var c = Kn("http://www.opengis.net/ogc", "LowerBoundary");
        a.appendChild(c);
        Kt(c, "" + b.a);
        c = Kn("http://www.opengis.net/ogc", "UpperBoundary");
        a.appendChild(c);
        Kt(c, "" + b.g);
      }),
      PropertyIsLike: L(function(a, b) {
        a.setAttribute("wildCard", b.i);
        a.setAttribute("singleChar", b.c);
        a.setAttribute("escapeChar", b.g);
        void 0 !== b.a && a.setAttribute("matchCase", b.a.toString());
        Jt(a, b.b);
        Kt(a, "" + b.f);
      })
    }
  };
  ut.prototype.v = function(a) {
    var b = Kn("http://www.opengis.net/wfs", "GetFeature");
    b.setAttribute("service", "WFS");
    b.setAttribute("version", "1.1.0");
    var c;
    if (
      a &&
      (a.handle && b.setAttribute("handle", a.handle),
      a.outputFormat && b.setAttribute("outputFormat", a.outputFormat),
      void 0 !== a.maxFeatures && b.setAttribute("maxFeatures", a.maxFeatures),
      a.resultType && b.setAttribute("resultType", a.resultType),
      void 0 !== a.startIndex && b.setAttribute("startIndex", a.startIndex),
      void 0 !== a.count && b.setAttribute("count", a.count),
      (c = a.filter),
      a.bbox)
    ) {
      ha(a.geometryName, 12);
      var d = Uo(a.geometryName, a.bbox, a.srsName);
      c ? (c = To(c, d)) : (c = d);
    }
    b.setAttributeNS(
      "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation",
      this.c
    );
    c = {
      node: b,
      srsName: a.srsName,
      featureNS: a.featureNS ? a.featureNS : this.g,
      featurePrefix: a.featurePrefix,
      geometryName: a.geometryName,
      filter: c,
      propertyNames: a.propertyNames ? a.propertyNames : []
    };
    ha(Array.isArray(a.featureTypes), 11);
    a = a.featureTypes;
    c = [c];
    d = ta({}, c[c.length - 1]);
    d.node = b;
    $n(d, Ht, Vn("Query"), a, c);
    return b;
  };
  ut.prototype.A = function(a, b, c, d) {
    var e = [],
      f = Kn("http://www.opengis.net/wfs", "Transaction");
    f.setAttribute("service", "WFS");
    f.setAttribute("version", "1.1.0");
    var g, h;
    d &&
      ((g = d.gmlOptions ? d.gmlOptions : {}),
      d.handle && f.setAttribute("handle", d.handle));
    f.setAttributeNS(
      "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation",
      this.c
    );
    a &&
      ((h = {
        node: f,
        featureNS: d.featureNS,
        featureType: d.featureType,
        featurePrefix: d.featurePrefix,
        srsName: d.srsName
      }),
      ta(h, g),
      $n(h, Ft, Vn("Insert"), a, e));
    b &&
      ((h = {
        node: f,
        featureNS: d.featureNS,
        featureType: d.featureType,
        featurePrefix: d.featurePrefix,
        srsName: d.srsName
      }),
      ta(h, g),
      $n(h, Ft, Vn("Update"), b, e));
    c &&
      $n(
        {
          node: f,
          featureNS: d.featureNS,
          featureType: d.featureType,
          featurePrefix: d.featurePrefix,
          srsName: d.srsName
        },
        Ft,
        Vn("Delete"),
        c,
        e
      );
    d.nativeElements &&
      $n(
        {
          node: f,
          featureNS: d.featureNS,
          featureType: d.featureType,
          featurePrefix: d.featurePrefix,
          srsName: d.srsName
        },
        Ft,
        Vn("Native"),
        d.nativeElements,
        e
      );
    return f;
  };
  ut.prototype.Xf = function(a) {
    for (a = a.firstChild; a; a = a.nextSibling)
      if (a.nodeType == Node.ELEMENT_NODE) return this.He(a);
    return null;
  };
  ut.prototype.He = function(a) {
    if (a.firstElementChild && a.firstElementChild.firstElementChild)
      for (
        a = a.firstElementChild.firstElementChild, a = a.firstElementChild;
        a;
        a = a.nextElementSibling
      )
        if (
          0 !== a.childNodes.length &&
          (1 !== a.childNodes.length || 3 !== a.firstChild.nodeType)
        ) {
          var b = [{}];
          this.b.Ee(a, b);
          return zc(b.pop().srsName);
        }
    return null;
  };
  function Mt(a) {
    a = a ? a : {};
    co.call(this);
    this.b = void 0 !== a.splitCollection ? a.splitCollection : !1;
  }
  v(Mt, lq);
  function Nt(a) {
    a = a.$();
    return 0 === a.length ? "" : a.join(" ");
  }
  function Ot(a) {
    a = a.$();
    for (var b = [], c = 0, d = a.length; c < d; ++c) b.push(a[c].join(" "));
    return b.join(",");
  }
  function Pt(a) {
    var b = [];
    a = a.Zc();
    for (var c = 0, d = a.length; c < d; ++c) b.push("(" + Ot(a[c]) + ")");
    return b.join(",");
  }
  function Qt(a) {
    var b = a.Y(),
      c = (0, Rt[b])(a),
      b = b.toUpperCase();
    if (a instanceof Uc) {
      a = a.ka;
      var d = "";
      if ("XYZ" === a || "XYZM" === a) d += "Z";
      if ("XYM" === a || "XYZM" === a) d += "M";
      a = d;
      0 < a.length && (b += " " + a);
    }
    return 0 === c.length ? b + " EMPTY" : b + "(" + c + ")";
  }
  var Rt = {
    Point: Nt,
    LineString: Ot,
    Polygon: Pt,
    MultiPoint: function(a) {
      var b = [];
      a = a.re();
      for (var c = 0, d = a.length; c < d; ++c) b.push("(" + Nt(a[c]) + ")");
      return b.join(",");
    },
    MultiLineString: function(a) {
      var b = [];
      a = a.Yc();
      for (var c = 0, d = a.length; c < d; ++c) b.push("(" + Ot(a[c]) + ")");
      return b.join(",");
    },
    MultiPolygon: function(a) {
      var b = [];
      a = a.Ad();
      for (var c = 0, d = a.length; c < d; ++c) b.push("(" + Pt(a[c]) + ")");
      return b.join(",");
    },
    GeometryCollection: function(a) {
      var b = [];
      a = a.pf();
      for (var c = 0, d = a.length; c < d; ++c) b.push(Qt(a[c]));
      return b.join(",");
    }
  };
  k = Mt.prototype;
  k.Hd = function(a, b) {
    var c = this.Jd(a, b);
    if (c) {
      var d = new J();
      d.Pa(c);
      return d;
    }
    return null;
  };
  k.Tf = function(a, b) {
    var c = [],
      d = this.Jd(a, b);
    this.b && "GeometryCollection" == d.Y() ? (c = d.f) : (c = [d]);
    for (var e = [], f = 0, g = c.length; f < g; ++f)
      (d = new J()), d.Pa(c[f]), e.push(d);
    return e;
  };
  k.Jd = function(a, b) {
    var c;
    c = new St(new Tt(a));
    Ut(c);
    return (c = Vt(c)) ? go(c, !1, b) : null;
  };
  k.Re = function(a, b) {
    var c = a.V();
    return c ? this.Pd(c, b) : "";
  };
  k.Oi = function(a, b) {
    if (1 == a.length) return this.Re(a[0], b);
    for (var c = [], d = 0, e = a.length; d < e; ++d) c.push(a[d].V());
    c = new Vo(c);
    return this.Pd(c, b);
  };
  k.Pd = function(a, b) {
    return Qt(go(a, !0, b));
  };
  function Tt(a) {
    this.a = a;
    this.b = -1;
  }
  function Wt(a) {
    var b = a.a.charAt(++a.b),
      c = { position: a.b, value: b };
    if ("(" == b) c.type = 2;
    else if ("," == b) c.type = 5;
    else if (")" == b) c.type = 3;
    else if (("0" <= b && "9" >= b) || "." == b || "-" == b) {
      c.type = 4;
      var d,
        b = a.b,
        e = !1,
        f = !1;
      do {
        if ("." == d) e = !0;
        else if ("e" == d || "E" == d) f = !0;
        d = a.a.charAt(++a.b);
      } while (
        ("0" <= d && "9" >= d) ||
        ("." == d && (void 0 === e || !e)) ||
        (!f && ("e" == d || "E" == d)) ||
        (f && ("-" == d || "+" == d))
      );
      a = parseFloat(a.a.substring(b, a.b--));
      c.value = a;
    } else if (("a" <= b && "z" >= b) || ("A" <= b && "Z" >= b)) {
      c.type = 1;
      b = a.b;
      do d = a.a.charAt(++a.b);
      while (("a" <= d && "z" >= d) || ("A" <= d && "Z" >= d));
      a = a.a.substring(b, a.b--).toUpperCase();
      c.value = a;
    } else {
      if (" " == b || "\t" == b || "\r" == b || "\n" == b) return Wt(a);
      if ("" === b) c.type = 6;
      else throw Error("Unexpected character: " + b);
    }
    return c;
  }
  function St(a) {
    this.g = a;
    this.a = "XY";
  }
  function Ut(a) {
    a.b = Wt(a.g);
  }
  function Xt(a, b) {
    var c = a.b.type == b;
    c && Ut(a);
    return c;
  }
  function Vt(a) {
    var b = a.b;
    if (Xt(a, 1)) {
      var b = b.value,
        c = "XY",
        d = a.b;
      1 == a.b.type &&
        ((d = d.value),
        "Z" === d
          ? (c = "XYZ")
          : "M" === d
          ? (c = "XYM")
          : "ZM" === d && (c = "XYZM"),
        "XY" !== c && Ut(a));
      a.a = c;
      if ("GEOMETRYCOLLECTION" == b) {
        a: {
          if (Xt(a, 2)) {
            b = [];
            do b.push(Vt(a));
            while (Xt(a, 5));
            if (Xt(a, 3)) {
              a = b;
              break a;
            }
          } else if (Yt(a)) {
            a = [];
            break a;
          }
          throw Error(Zt(a));
        }
        return new Vo(a);
      }
      d = $t[b];
      c = au[b];
      if (!d || !c) throw Error("Invalid geometry type: " + b);
      b = d.call(a);
      return new c(b, a.a);
    }
    throw Error(Zt(a));
  }
  k = St.prototype;
  k.Of = function() {
    if (Xt(this, 2)) {
      var a = bu(this);
      if (Xt(this, 3)) return a;
    } else if (Yt(this)) return null;
    throw Error(Zt(this));
  };
  k.Nf = function() {
    if (Xt(this, 2)) {
      var a = cu(this);
      if (Xt(this, 3)) return a;
    } else if (Yt(this)) return [];
    throw Error(Zt(this));
  };
  k.Pf = function() {
    if (Xt(this, 2)) {
      var a = du(this);
      if (Xt(this, 3)) return a;
    } else if (Yt(this)) return [];
    throw Error(Zt(this));
  };
  k.mo = function() {
    if (Xt(this, 2)) {
      var a;
      if (2 == this.b.type)
        for (a = [this.Of()]; Xt(this, 5); ) a.push(this.Of());
      else a = cu(this);
      if (Xt(this, 3)) return a;
    } else if (Yt(this)) return [];
    throw Error(Zt(this));
  };
  k.lo = function() {
    if (Xt(this, 2)) {
      var a = du(this);
      if (Xt(this, 3)) return a;
    } else if (Yt(this)) return [];
    throw Error(Zt(this));
  };
  k.no = function() {
    if (Xt(this, 2)) {
      for (var a = [this.Pf()]; Xt(this, 5); ) a.push(this.Pf());
      if (Xt(this, 3)) return a;
    } else if (Yt(this)) return [];
    throw Error(Zt(this));
  };
  function bu(a) {
    for (var b = [], c = a.a.length, d = 0; d < c; ++d) {
      var e = a.b;
      if (Xt(a, 4)) b.push(e.value);
      else break;
    }
    if (b.length == c) return b;
    throw Error(Zt(a));
  }
  function cu(a) {
    for (var b = [bu(a)]; Xt(a, 5); ) b.push(bu(a));
    return b;
  }
  function du(a) {
    for (var b = [a.Nf()]; Xt(a, 5); ) b.push(a.Nf());
    return b;
  }
  function Yt(a) {
    var b = 1 == a.b.type && "EMPTY" == a.b.value;
    b && Ut(a);
    return b;
  }
  function Zt(a) {
    return (
      "Unexpected `" +
      a.b.value +
      "` at position " +
      a.b.position +
      " in `" +
      a.g.a +
      "`"
    );
  }
  var au = {
      POINT: C,
      LINESTRING: P,
      POLYGON: E,
      MULTIPOINT: R,
      MULTILINESTRING: Q,
      MULTIPOLYGON: S
    },
    $t = {
      POINT: St.prototype.Of,
      LINESTRING: St.prototype.Nf,
      POLYGON: St.prototype.Pf,
      MULTIPOINT: St.prototype.mo,
      MULTILINESTRING: St.prototype.lo,
      MULTIPOLYGON: St.prototype.no
    };
  function eu() {
    this.version = void 0;
  }
  v(eu, Ss);
  eu.prototype.a = function(a) {
    for (a = a.firstChild; a; a = a.nextSibling)
      if (a.nodeType == Node.ELEMENT_NODE) return this.b(a);
    return null;
  };
  eu.prototype.b = function(a) {
    this.version = a.getAttribute("version").trim();
    return (a = N({ version: this.version }, fu, a, [])) ? a : null;
  };
  function gu(a, b) {
    return N({}, hu, a, b);
  }
  function iu(a, b) {
    return N({}, ju, a, b);
  }
  function ku(a, b) {
    var c = gu(a, b);
    if (c) {
      var d = [op(a.getAttribute("width")), op(a.getAttribute("height"))];
      c.size = d;
      return c;
    }
  }
  function lu(a, b) {
    return N([], mu, a, b);
  }
  var nu = [null, "http://www.opengis.net/wms"],
    fu = M(nu, {
      Service: K(function(a, b) {
        return N({}, ou, a, b);
      }),
      Capability: K(function(a, b) {
        return N({}, pu, a, b);
      })
    }),
    pu = M(nu, {
      Request: K(function(a, b) {
        return N({}, qu, a, b);
      }),
      Exception: K(function(a, b) {
        return N([], ru, a, b);
      }),
      Layer: K(function(a, b) {
        return N({}, su, a, b);
      })
    }),
    ou = M(nu, {
      Name: K(T),
      Title: K(T),
      Abstract: K(T),
      KeywordList: K(lu),
      OnlineResource: K(Rs),
      ContactInformation: K(function(a, b) {
        return N({}, tu, a, b);
      }),
      Fees: K(T),
      AccessConstraints: K(T),
      LayerLimit: K(np),
      MaxWidth: K(np),
      MaxHeight: K(np)
    }),
    tu = M(nu, {
      ContactPersonPrimary: K(function(a, b) {
        return N({}, uu, a, b);
      }),
      ContactPosition: K(T),
      ContactAddress: K(function(a, b) {
        return N({}, vu, a, b);
      }),
      ContactVoiceTelephone: K(T),
      ContactFacsimileTelephone: K(T),
      ContactElectronicMailAddress: K(T)
    }),
    uu = M(nu, { ContactPerson: K(T), ContactOrganization: K(T) }),
    vu = M(nu, {
      AddressType: K(T),
      Address: K(T),
      City: K(T),
      StateOrProvince: K(T),
      PostCode: K(T),
      Country: K(T)
    }),
    ru = M(nu, { Format: Rn(T) }),
    su = M(nu, {
      Name: K(T),
      Title: K(T),
      Abstract: K(T),
      KeywordList: K(lu),
      CRS: Tn(T),
      EX_GeographicBoundingBox: K(function(a, b) {
        var c = N({}, wu, a, b);
        if (c) {
          var d = c.westBoundLongitude,
            e = c.southBoundLatitude,
            f = c.eastBoundLongitude,
            c = c.northBoundLatitude;
          return void 0 === d || void 0 === e || void 0 === f || void 0 === c
            ? void 0
            : [d, e, f, c];
        }
      }),
      BoundingBox: Tn(function(a) {
        var b = [
            mp(a.getAttribute("minx")),
            mp(a.getAttribute("miny")),
            mp(a.getAttribute("maxx")),
            mp(a.getAttribute("maxy"))
          ],
          c = [mp(a.getAttribute("resx")), mp(a.getAttribute("resy"))];
        return { crs: a.getAttribute("CRS"), extent: b, res: c };
      }),
      Dimension: Tn(function(a) {
        return {
          name: a.getAttribute("name"),
          units: a.getAttribute("units"),
          unitSymbol: a.getAttribute("unitSymbol"),
          default: a.getAttribute("default"),
          multipleValues: jp(a.getAttribute("multipleValues")),
          nearestValue: jp(a.getAttribute("nearestValue")),
          current: jp(a.getAttribute("current")),
          values: T(a)
        };
      }),
      Attribution: K(function(a, b) {
        return N({}, xu, a, b);
      }),
      AuthorityURL: Tn(function(a, b) {
        var c = gu(a, b);
        if (c) return (c.name = a.getAttribute("name")), c;
      }),
      Identifier: Tn(T),
      MetadataURL: Tn(function(a, b) {
        var c = gu(a, b);
        if (c) return (c.type = a.getAttribute("type")), c;
      }),
      DataURL: Tn(gu),
      FeatureListURL: Tn(gu),
      Style: Tn(function(a, b) {
        return N({}, yu, a, b);
      }),
      MinScaleDenominator: K(lp),
      MaxScaleDenominator: K(lp),
      Layer: Tn(function(a, b) {
        var c = b[b.length - 1],
          d = N({}, su, a, b);
        if (d) {
          var e = jp(a.getAttribute("queryable"));
          void 0 === e && (e = c.queryable);
          d.queryable = void 0 !== e ? e : !1;
          e = op(a.getAttribute("cascaded"));
          void 0 === e && (e = c.cascaded);
          d.cascaded = e;
          e = jp(a.getAttribute("opaque"));
          void 0 === e && (e = c.opaque);
          d.opaque = void 0 !== e ? e : !1;
          e = jp(a.getAttribute("noSubsets"));
          void 0 === e && (e = c.noSubsets);
          d.noSubsets = void 0 !== e ? e : !1;
          (e = mp(a.getAttribute("fixedWidth"))) || (e = c.fixedWidth);
          d.fixedWidth = e;
          (e = mp(a.getAttribute("fixedHeight"))) || (e = c.fixedHeight);
          d.fixedHeight = e;
          ["Style", "CRS", "AuthorityURL"].forEach(function(a) {
            a in c && (d[a] = (d[a] || []).concat(c[a]));
          });
          "EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator"
            .split(" ")
            .forEach(function(a) {
              a in d || (d[a] = c[a]);
            });
          return d;
        }
      })
    }),
    xu = M(nu, { Title: K(T), OnlineResource: K(Rs), LogoURL: K(ku) }),
    wu = M(nu, {
      westBoundLongitude: K(lp),
      eastBoundLongitude: K(lp),
      southBoundLatitude: K(lp),
      northBoundLatitude: K(lp)
    }),
    qu = M(nu, {
      GetCapabilities: K(iu),
      GetMap: K(iu),
      GetFeatureInfo: K(iu)
    }),
    ju = M(nu, {
      Format: Tn(T),
      DCPType: Tn(function(a, b) {
        return N({}, zu, a, b);
      })
    }),
    zu = M(nu, {
      HTTP: K(function(a, b) {
        return N({}, Au, a, b);
      })
    }),
    Au = M(nu, { Get: K(gu), Post: K(gu) }),
    yu = M(nu, {
      Name: K(T),
      Title: K(T),
      Abstract: K(T),
      LegendURL: Tn(ku),
      StyleSheetURL: K(gu),
      StyleURL: K(gu)
    }),
    hu = M(nu, { Format: K(T), OnlineResource: K(Rs) }),
    mu = M(nu, { Keyword: Rn(T) });
  function Bu(a) {
    a = a ? a : {};
    this.g = "http://mapserver.gis.umn.edu/mapserver";
    this.b = new Cp();
    this.c = a.layers ? a.layers : null;
    dp.call(this);
  }
  v(Bu, dp);
  Bu.prototype.oc = function(a, b) {
    var c = {};
    b && ta(c, eo(this, a, b));
    var d = [c];
    a.setAttribute("namespaceURI", this.g);
    var e = a.localName,
      c = [];
    if (0 !== a.childNodes.length) {
      if ("msGMLOutput" == e)
        for (var f = 0, g = a.childNodes.length; f < g; f++) {
          var h = a.childNodes[f];
          if (h.nodeType === Node.ELEMENT_NODE) {
            var l = d[0],
              m = h.localName.replace("_layer", "");
            if (!this.c || Za(this.c, m)) {
              m += "_feature";
              l.featureType = m;
              l.featureNS = this.g;
              var p = {};
              p[m] = Rn(this.b.Rf, this.b);
              l = M([l.featureNS, null], p);
              h.setAttribute("namespaceURI", this.g);
              (h = N([], l, h, d, this.b)) && bb(c, h);
            }
          }
        }
      "FeatureCollection" == e &&
        (d = N([], this.b.b, a, [{}], this.b)) &&
        (c = d);
    }
    return c;
  };
  function Cu() {
    this.g = new Ts();
  }
  v(Cu, Ss);
  Cu.prototype.a = function(a) {
    for (a = a.firstChild; a; a = a.nextSibling)
      if (a.nodeType == Node.ELEMENT_NODE) return this.b(a);
    return null;
  };
  Cu.prototype.b = function(a) {
    var b = a.getAttribute("version").trim(),
      c = this.g.b(a);
    if (!c) return null;
    c.version = b;
    return (c = N(c, Du, a, [])) ? c : null;
  };
  function Eu(a) {
    var b = T(a).split(" ");
    if (b && 2 == b.length)
      return (a = +b[0]), (b = +b[1]), isNaN(a) || isNaN(b) ? void 0 : [a, b];
  }
  var Fu = [null, "http://www.opengis.net/wmts/1.0"],
    Gu = [null, "http://www.opengis.net/ows/1.1"],
    Du = M(Fu, {
      Contents: K(function(a, b) {
        return N({}, Hu, a, b);
      })
    }),
    Hu = M(Fu, {
      Layer: Tn(function(a, b) {
        return N({}, Iu, a, b);
      }),
      TileMatrixSet: Tn(function(a, b) {
        return N({}, Ju, a, b);
      })
    }),
    Iu = M(
      Fu,
      {
        Style: Tn(function(a, b) {
          var c = N({}, Ku, a, b);
          if (c) {
            var d = "true" === a.getAttribute("isDefault");
            c.isDefault = d;
            return c;
          }
        }),
        Format: Tn(T),
        TileMatrixSetLink: Tn(function(a, b) {
          return N({}, Lu, a, b);
        }),
        Dimension: Tn(function(a, b) {
          return N({}, Mu, a, b);
        }),
        ResourceURL: Tn(function(a) {
          var b = a.getAttribute("format"),
            c = a.getAttribute("template");
          a = a.getAttribute("resourceType");
          var d = {};
          b && (d.format = b);
          c && (d.template = c);
          a && (d.resourceType = a);
          return d;
        })
      },
      M(Gu, {
        Title: K(T),
        Abstract: K(T),
        WGS84BoundingBox: K(function(a, b) {
          var c = N([], Nu, a, b);
          return 2 != c.length ? void 0 : Gb(c);
        }),
        Identifier: K(T)
      })
    ),
    Ku = M(
      Fu,
      {
        LegendURL: Tn(function(a) {
          var b = {};
          b.format = a.getAttribute("format");
          b.href = Rs(a);
          return b;
        })
      },
      M(Gu, { Title: K(T), Identifier: K(T) })
    ),
    Lu = M(Fu, {
      TileMatrixSet: K(T),
      TileMatrixSetLimits: K(function(a, b) {
        return N([], Ou, a, b);
      })
    }),
    Ou = M(Fu, {
      TileMatrixLimits: Rn(function(a, b) {
        return N({}, Pu, a, b);
      })
    }),
    Pu = M(Fu, {
      TileMatrix: K(T),
      MinTileRow: K(np),
      MaxTileRow: K(np),
      MinTileCol: K(np),
      MaxTileCol: K(np)
    }),
    Mu = M(Fu, { Default: K(T), Value: Tn(T) }, M(Gu, { Identifier: K(T) })),
    Nu = M(Gu, { LowerCorner: Rn(Eu), UpperCorner: Rn(Eu) }),
    Ju = M(
      Fu,
      {
        WellKnownScaleSet: K(T),
        TileMatrix: Tn(function(a, b) {
          return N({}, Qu, a, b);
        })
      },
      M(Gu, { SupportedCRS: K(T), Identifier: K(T) })
    ),
    Qu = M(
      Fu,
      {
        TopLeftCorner: K(Eu),
        ScaleDenominator: K(lp),
        TileWidth: K(np),
        TileHeight: K(np),
        MatrixWidth: K(np),
        MatrixHeight: K(np)
      },
      M(Gu, { Identifier: K(T) })
    );
  function Ru(a) {
    Sa.call(this);
    a = a || {};
    this.a = null;
    this.c = Oc;
    this.f = void 0;
    B(this, Ua(Su), this.Ql, this);
    B(this, Ua(Tu), this.Rl, this);
    void 0 !== a.projection && this.nh(zc(a.projection));
    void 0 !== a.trackingOptions && this.Ci(a.trackingOptions);
    this.ne(void 0 !== a.tracking ? a.tracking : !1);
  }
  v(Ru, Sa);
  k = Ru.prototype;
  k.oa = function() {
    this.ne(!1);
    Sa.prototype.oa.call(this);
  };
  k.Ql = function() {
    var a = this.lh();
    a &&
      ((this.c = yc(zc("EPSG:4326"), a)),
      this.a && this.set(Uu, this.c(this.a)));
  };
  k.Rl = function() {
    if (qf) {
      var a = this.mh();
      a && void 0 === this.f
        ? (this.f = navigator.geolocation.watchPosition(
            this.uo.bind(this),
            this.vo.bind(this),
            this.Wg()
          ))
        : a ||
          void 0 === this.f ||
          (navigator.geolocation.clearWatch(this.f), (this.f = void 0));
    }
  };
  k.uo = function(a) {
    a = a.coords;
    this.set(Vu, a.accuracy);
    this.set(Wu, null === a.altitude ? void 0 : a.altitude);
    this.set(Xu, null === a.altitudeAccuracy ? void 0 : a.altitudeAccuracy);
    this.set(Yu, null === a.heading ? void 0 : na(a.heading));
    this.a
      ? ((this.a[0] = a.longitude), (this.a[1] = a.latitude))
      : (this.a = [a.longitude, a.latitude]);
    var b = this.c(this.a);
    this.set(Uu, b);
    this.set(Zu, null === a.speed ? void 0 : a.speed);
    a = Bd(Eh, this.a, a.accuracy);
    a.sc(this.c);
    this.set($u, a);
    this.s();
  };
  k.vo = function(a) {
    a.type = "error";
    this.ne(!1);
    this.b(a);
  };
  k.Tj = function() {
    return this.get(Vu);
  };
  k.Uj = function() {
    return this.get($u) || null;
  };
  k.Wj = function() {
    return this.get(Wu);
  };
  k.Xj = function() {
    return this.get(Xu);
  };
  k.Ol = function() {
    return this.get(Yu);
  };
  k.Pl = function() {
    return this.get(Uu);
  };
  k.lh = function() {
    return this.get(Su);
  };
  k.Bk = function() {
    return this.get(Zu);
  };
  k.mh = function() {
    return this.get(Tu);
  };
  k.Wg = function() {
    return this.get(av);
  };
  k.nh = function(a) {
    this.set(Su, a);
  };
  k.ne = function(a) {
    this.set(Tu, a);
  };
  k.Ci = function(a) {
    this.set(av, a);
  };
  var Vu = "accuracy",
    $u = "accuracyGeometry",
    Wu = "altitude",
    Xu = "altitudeAccuracy",
    Yu = "heading",
    Uu = "position",
    Su = "projection",
    Zu = "speed",
    Tu = "tracking",
    av = "trackingOptions";
  function bv(a, b, c) {
    Uc.call(this);
    this.dg(a, b ? b : 0, c);
  }
  v(bv, Uc);
  k = bv.prototype;
  k.clone = function() {
    var a = new bv(null);
    Xc(a, this.ka, this.B.slice());
    a.s();
    return a;
  };
  k.Ab = function(a, b, c, d) {
    var e = this.B;
    a -= e[0];
    var f = b - e[1];
    b = a * a + f * f;
    if (b < d) {
      if (0 === b) for (d = 0; d < this.a; ++d) c[d] = e[d];
      else
        for (
          d = this.qe() / Math.sqrt(b),
            c[0] = e[0] + d * a,
            c[1] = e[1] + d * f,
            d = 2;
          d < this.a;
          ++d
        )
          c[d] = e[d];
      c.length = this.a;
      return b;
    }
    return d;
  };
  k.Hc = function(a, b) {
    var c = this.B,
      d = a - c[0],
      c = b - c[1];
    return d * d + c * c <= cv(this);
  };
  k.Fd = function() {
    return this.B.slice(0, this.a);
  };
  k.Yd = function(a) {
    var b = this.B,
      c = b[this.a] - b[0];
    return Rb(b[0] - c, b[1] - c, b[0] + c, b[1] + c, a);
  };
  k.qe = function() {
    return Math.sqrt(cv(this));
  };
  function cv(a) {
    var b = a.B[a.a] - a.B[0];
    a = a.B[a.a + 1] - a.B[1];
    return b * b + a * a;
  }
  k.Y = function() {
    return "Circle";
  };
  k.Ta = function(a) {
    var b = this.G();
    return jc(a, b)
      ? ((b = this.Fd()),
        (a[0] <= b[0] && a[2] >= b[0]) || (a[1] <= b[1] && a[3] >= b[1])
          ? !0
          : Xb(a, this.mb, this))
      : !1;
  };
  k.nm = function(a) {
    var b = this.a,
      c = a.slice();
    c[b] = c[0] + (this.B[b] - this.B[0]);
    var d;
    for (d = 1; d < b; ++d) c[b + d] = a[d];
    Xc(this, this.ka, c);
    this.s();
  };
  k.dg = function(a, b, c) {
    if (a) {
      Yc(this, c, a, 0);
      this.B || (this.B = []);
      c = this.B;
      a = fd(c, a);
      c[a++] = c[0] + b;
      var d;
      b = 1;
      for (d = this.a; b < d; ++b) c[a++] = c[b];
      c.length = a;
    } else Xc(this, "XY", null);
    this.s();
  };
  k.om = function(a) {
    this.B[this.a] = this.B[0] + a;
    this.s();
  };
  function dv(a, b, c) {
    for (
      var d = [],
        e = a(0),
        f = a(1),
        g = b(e),
        h = b(f),
        l = [f, e],
        m = [h, g],
        p = [1, 0],
        n = {},
        q = 1e5,
        r,
        u,
        w,
        y,
        z;
      0 < --q && 0 < p.length;

    )
      (w = p.pop()),
        (e = l.pop()),
        (g = m.pop()),
        (f = w.toString()),
        f in n || (d.push(g[0], g[1]), (n[f] = !0)),
        (y = p.pop()),
        (f = l.pop()),
        (h = m.pop()),
        (z = (w + y) / 2),
        (r = a(z)),
        (u = b(r)),
        la(u[0], u[1], g[0], g[1], h[0], h[1]) < c
          ? (d.push(h[0], h[1]), (f = y.toString()), (n[f] = !0))
          : (p.push(y, z, z, w), m.push(h, u, u, g), l.push(f, r, r, e));
    return d;
  }
  function ev(a, b, c, d, e) {
    var f = zc("EPSG:4326");
    return dv(
      function(d) {
        return [a, b + (c - b) * d];
      },
      Nc(f, d),
      e
    );
  }
  function fv(a, b, c, d, e) {
    var f = zc("EPSG:4326");
    return dv(
      function(d) {
        return [b + (c - b) * d, a];
      },
      Nc(f, d),
      e
    );
  }
  function gv(a) {
    a = a || {};
    this.c = this.l = null;
    this.g = this.i = Infinity;
    this.f = this.j = -Infinity;
    this.A = this.u = Infinity;
    this.D = this.C = -Infinity;
    this.va = void 0 !== a.targetSize ? a.targetSize : 100;
    this.L = void 0 !== a.maxLines ? a.maxLines : 100;
    this.b = [];
    this.a = [];
    this.ra = void 0 !== a.strokeStyle ? a.strokeStyle : hv;
    this.H = this.o = void 0;
    this.v = null;
    this.setMap(void 0 !== a.map ? a.map : null);
  }
  var hv = new wi({ color: "rgba(0,0,0,0.2)" }),
    iv = [
      90,
      45,
      30,
      20,
      10,
      5,
      2,
      1,
      0.5,
      0.2,
      0.1,
      0.05,
      0.01,
      0.005,
      0.002,
      0.001
    ];
  function jv(a, b, c, d, e, f, g) {
    var h = g;
    b = ev(b, c, d, a.c, e);
    h = void 0 !== a.b[h] ? a.b[h] : new P(null);
    h.da("XY", b);
    jc(h.G(), f) && (a.b[g++] = h);
    return g;
  }
  function kv(a, b, c, d, e) {
    var f = e;
    b = fv(b, a.f, a.g, a.c, c);
    f = void 0 !== a.a[f] ? a.a[f] : new P(null);
    f.da("XY", b);
    jc(f.G(), d) && (a.a[e++] = f);
    return e;
  }
  k = gv.prototype;
  k.Sl = function() {
    return this.l;
  };
  k.qk = function() {
    return this.b;
  };
  k.xk = function() {
    return this.a;
  };
  k.ah = function(a) {
    var b = a.vectorContext,
      c = a.frameState,
      d = c.extent;
    a = c.viewState;
    var e = a.center,
      f = a.projection,
      g = a.resolution;
    a = c.pixelRatio;
    a = (g * g) / (4 * a * a);
    if (!this.c || !Mc(this.c, f)) {
      var h = zc("EPSG:4326"),
        l = f.G(),
        m = f.i,
        p = Qc(m, h, f),
        n = m[2],
        q = m[1],
        r = m[0],
        u = p[3],
        w = p[2],
        y = p[1],
        p = p[0];
      this.i = m[3];
      this.g = n;
      this.j = q;
      this.f = r;
      this.u = u;
      this.A = w;
      this.C = y;
      this.D = p;
      this.o = Nc(h, f);
      this.H = Nc(f, h);
      this.v = this.H(gc(l));
      this.c = f;
    }
    f.a &&
      ((f = f.G()), (h = dc(f)), (c = c.focus[0]), c < f[0] || c > f[2]) &&
      ((c = h * Math.ceil((f[0] - c) / h)),
      (d = [d[0] + c, d[1], d[2] + c, d[3]]));
    c = this.v[0];
    f = this.v[1];
    h = -1;
    m = Math.pow(this.va * g, 2);
    n = [];
    q = [];
    g = 0;
    for (l = iv.length; g < l; ++g) {
      r = iv[g] / 2;
      n[0] = c - r;
      n[1] = f - r;
      q[0] = c + r;
      q[1] = f + r;
      this.o(n, n);
      this.o(q, q);
      r = Math.pow(q[0] - n[0], 2) + Math.pow(q[1] - n[1], 2);
      if (r <= m) break;
      h = iv[g];
    }
    g = h;
    if (-1 == g) this.b.length = this.a.length = 0;
    else {
      c = this.H(e);
      e = c[0];
      c = c[1];
      f = this.L;
      h = [
        Math.max(d[0], this.D),
        Math.max(d[1], this.C),
        Math.min(d[2], this.A),
        Math.min(d[3], this.u)
      ];
      h = Qc(h, this.c, "EPSG:4326");
      m = h[3];
      q = h[1];
      e = Math.floor(e / g) * g;
      n = ia(e, this.f, this.g);
      l = jv(this, n, q, m, a, d, 0);
      for (h = 0; n != this.f && h++ < f; )
        (n = Math.max(n - g, this.f)), (l = jv(this, n, q, m, a, d, l));
      n = ia(e, this.f, this.g);
      for (h = 0; n != this.g && h++ < f; )
        (n = Math.min(n + g, this.g)), (l = jv(this, n, q, m, a, d, l));
      this.b.length = l;
      c = Math.floor(c / g) * g;
      e = ia(c, this.j, this.i);
      l = kv(this, e, a, d, 0);
      for (h = 0; e != this.j && h++ < f; )
        (e = Math.max(e - g, this.j)), (l = kv(this, e, a, d, l));
      e = ia(c, this.j, this.i);
      for (h = 0; e != this.i && h++ < f; )
        (e = Math.min(e + g, this.i)), (l = kv(this, e, a, d, l));
      this.a.length = l;
    }
    b.Ma(null, this.ra);
    a = 0;
    for (e = this.b.length; a < e; ++a) (g = this.b[a]), b.Pb(g, null);
    a = 0;
    for (e = this.a.length; a < e; ++a) (g = this.a[a]), b.Pb(g, null);
  };
  k.setMap = function(a) {
    this.l && (this.l.K("postcompose", this.ah, this), this.l.render());
    a && (a.J("postcompose", this.ah, this), a.render());
    this.l = a;
  };
  function lv(a, b, c, d, e) {
    ag.call(this, a, b);
    this.l = c;
    this.g = new Image();
    null !== d && (this.g.crossOrigin = d);
    this.i = null;
    this.o = e;
  }
  v(lv, ag);
  k = lv.prototype;
  k.oa = function() {
    1 == this.state && mv(this);
    this.a && Ha(this.a);
    this.state = 5;
    this.s();
    ag.prototype.oa.call(this);
  };
  k.ub = function() {
    return this.g;
  };
  k.bb = function() {
    return this.l;
  };
  k.Tl = function() {
    this.state = 3;
    mv(this);
    this.s();
  };
  k.Ul = function() {
    this.state = this.g.naturalWidth && this.g.naturalHeight ? cg : 4;
    mv(this);
    this.s();
  };
  k.load = function() {
    if (0 == this.state || 3 == this.state)
      (this.state = 1),
        this.s(),
        (this.i = [
          Da(this.g, "error", this.Tl, this),
          Da(this.g, "load", this.Ul, this)
        ]),
        this.o(this, this.l);
  };
  function mv(a) {
    a.i.forEach(ya);
    a.i = null;
  }
  function nv(a) {
    a = a ? a : {};
    lg.call(this, { handleEvent: mc });
    this.i = a.formatConstructors ? a.formatConstructors : [];
    this.l = a.projection ? zc(a.projection) : null;
    this.a = null;
    this.target = a.target ? a.target : null;
  }
  v(nv, lg);
  function ov(a) {
    a = a.dataTransfer.files;
    var b, c, d;
    b = 0;
    for (c = a.length; b < c; ++b) {
      d = a.item(b);
      var e = new FileReader();
      e.addEventListener("load", this.j.bind(this, d));
      e.readAsText(d);
    }
  }
  function pv(a) {
    a.stopPropagation();
    a.preventDefault();
    a.dataTransfer.dropEffect = "copy";
  }
  nv.prototype.j = function(a, b) {
    var c = b.target.result,
      d = this.v,
      e = this.l;
    e || (e = d.aa().o);
    var d = this.i,
      f = [],
      g,
      h;
    g = 0;
    for (h = d.length; g < h; ++g) {
      var l = new d[g]();
      var m = { featureProjection: e };
      try {
        f = l.La(c, m);
      } catch (p) {
        f = null;
      }
      if (f && 0 < f.length) break;
    }
    this.b(new qv(rv, a, f, e));
  };
  nv.prototype.setMap = function(a) {
    this.a && (this.a.forEach(ya), (this.a = null));
    lg.prototype.setMap.call(this, a);
    a &&
      ((a = this.target ? this.target : a.f),
      (this.a = [
        B(a, "drop", ov, this),
        B(a, "dragenter", pv, this),
        B(a, "dragover", pv, this),
        B(a, "drop", pv, this)
      ]));
  };
  var rv = "addfeatures";
  function qv(a, b, c, d) {
    Ia.call(this, a);
    this.features = c;
    this.file = b;
    this.projection = d;
  }
  v(qv, Ia);
  function sv(a) {
    a = a ? a : {};
    Bg.call(this, {
      handleDownEvent: tv,
      handleDragEvent: uv,
      handleUpEvent: vv
    });
    this.o = a.condition ? a.condition : xg;
    this.a = this.i = void 0;
    this.j = 0;
    this.u = void 0 !== a.duration ? a.duration : 400;
  }
  v(sv, Bg);
  function uv(a) {
    if (zg(a)) {
      var b = a.map,
        c = b.nb(),
        d = a.pixel;
      a = d[0] - c[0] / 2;
      d = c[1] / 2 - d[1];
      c = Math.atan2(d, a);
      a = Math.sqrt(a * a + d * d);
      b = b.aa();
      void 0 !== this.i && ((d = c - this.i), ng(b, b.Ra() - d));
      this.i = c;
      void 0 !== this.a && ((c = this.a * (b.Oa() / a)), pg(b, c));
      void 0 !== this.a && (this.j = this.a / a);
      this.a = a;
    }
  }
  function vv(a) {
    if (!zg(a)) return !0;
    a = a.map.aa();
    Jd(a, 1, -1);
    var b = this.j - 1,
      c = a.Ra(),
      c = a.constrainRotation(c, 0);
    ng(a, c, void 0, void 0);
    var c = a.Oa(),
      d = this.u,
      c = a.constrainResolution(c, 0, b);
    pg(a, c, void 0, d);
    this.j = 0;
    return !1;
  }
  function tv(a) {
    return zg(a) && this.o(a)
      ? (Jd(a.map.aa(), 1, 1), (this.a = this.i = void 0), !0)
      : !1;
  }
  function wv() {
    return [[-Infinity, -Infinity, Infinity, Infinity]];
  }
  function U(a) {
    a = a || {};
    hm.call(this, {
      attributions: a.attributions,
      logo: a.logo,
      projection: void 0,
      state: "ready",
      wrapX: void 0 !== a.wrapX ? a.wrapX : !0
    });
    this.U = ea;
    this.P = a.format;
    this.xa = void 0 == a.overlaps ? !0 : a.overlaps;
    this.Z = a.url;
    void 0 !== a.loader
      ? (this.U = a.loader)
      : void 0 !== this.Z && (ha(this.P, 7), (this.U = bo(this.Z, this.P)));
    this.fc = void 0 !== a.strategy ? a.strategy : wv;
    var b = void 0 !== a.useSpatialIndex ? a.useSpatialIndex : !0;
    this.a = b ? new jl() : null;
    this.sa = new jl();
    this.i = {};
    this.l = {};
    this.o = {};
    this.v = {};
    this.c = null;
    var c, d;
    a.features instanceof qe
      ? ((c = a.features), (d = c.a))
      : Array.isArray(a.features) && (d = a.features);
    b || void 0 !== c || (c = new qe(d));
    void 0 !== d && xv(this, d);
    void 0 !== c && yv(this, c);
  }
  v(U, hm);
  k = U.prototype;
  k.gb = function(a) {
    var b = x(a).toString();
    if (zv(this, b, a)) {
      Av(this, b, a);
      var c = a.V();
      c ? ((b = c.G()), this.a && this.a.Da(b, a)) : (this.i[b] = a);
      this.b(new Bv(Cv, a));
    }
    this.s();
  };
  function Av(a, b, c) {
    a.v[b] = [B(c, "change", a.Mh, a), B(c, Xa, a.Mh, a)];
  }
  function zv(a, b, c) {
    var d = !0,
      e = c.f;
    void 0 !== e
      ? e.toString() in a.l
        ? (d = !1)
        : (a.l[e.toString()] = c)
      : (ha(!(b in a.o), 30), (a.o[b] = c));
    return d;
  }
  k.Tc = function(a) {
    xv(this, a);
    this.s();
  };
  function xv(a, b) {
    var c,
      d,
      e,
      f,
      g = [],
      h = [],
      l = [];
    d = 0;
    for (e = b.length; d < e; d++)
      (f = b[d]), (c = x(f).toString()), zv(a, c, f) && h.push(f);
    d = 0;
    for (e = h.length; d < e; d++) {
      f = h[d];
      c = x(f).toString();
      Av(a, c, f);
      var m = f.V();
      m ? ((c = m.G()), g.push(c), l.push(f)) : (a.i[c] = f);
    }
    a.a && a.a.load(g, l);
    d = 0;
    for (e = h.length; d < e; d++) a.b(new Bv(Cv, h[d]));
  }
  function yv(a, b) {
    var c = !1;
    B(a, Cv, function(a) {
      c || ((c = !0), b.push(a.feature), (c = !1));
    });
    B(a, Dv, function(a) {
      c || ((c = !0), b.remove(a.feature), (c = !1));
    });
    B(
      b,
      ue,
      function(a) {
        c || ((c = !0), this.gb(a.element), (c = !1));
      },
      a
    );
    B(
      b,
      ve,
      function(a) {
        c || ((c = !0), this.rb(a.element), (c = !1));
      },
      a
    );
    a.c = b;
  }
  k.clear = function(a) {
    if (a) {
      for (var b in this.v) this.v[b].forEach(ya);
      this.c || ((this.v = {}), (this.l = {}), (this.o = {}));
    } else if (this.a) {
      this.a.forEach(this.$f, this);
      for (var c in this.i) this.$f(this.i[c]);
    }
    this.c && this.c.clear();
    this.a && this.a.clear();
    this.sa.clear();
    this.i = {};
    this.b(new Bv(Ev));
    this.s();
  };
  k.Fg = function(a, b) {
    if (this.a) return this.a.forEach(a, b);
    if (this.c) return this.c.forEach(a, b);
  };
  function Fv(a, b, c) {
    a.Qb([b[0], b[1], b[0], b[1]], function(a) {
      if (a.V().mb(b)) return c.call(void 0, a);
    });
  }
  k.Qb = function(a, b, c) {
    if (this.a) return pl(this.a, a, b, c);
    if (this.c) return this.c.forEach(b, c);
  };
  k.Gg = function(a, b, c) {
    return this.Qb(a, function(d) {
      if (d.V().Ta(a) && (d = b.call(c, d))) return d;
    });
  };
  k.Og = function() {
    return this.c;
  };
  k.we = function() {
    var a;
    this.c
      ? (a = this.c.a)
      : this.a && ((a = ll(this.a)), wa(this.i) || bb(a, va(this.i)));
    return a;
  };
  k.Ng = function(a) {
    var b = [];
    Fv(this, a, function(a) {
      b.push(a);
    });
    return b;
  };
  k.nf = function(a) {
    return ml(this.a, a);
  };
  k.Jg = function(a, b) {
    var c = a[0],
      d = a[1],
      e = null,
      f = [NaN, NaN],
      g = Infinity,
      h = [-Infinity, -Infinity, Infinity, Infinity],
      l = b ? b : mc;
    pl(this.a, h, function(a) {
      if (l(a)) {
        var b = a.V(),
          n = g;
        g = b.Ab(c, d, f, g);
        g < n &&
          ((e = a),
          (a = Math.sqrt(g)),
          (h[0] = c - a),
          (h[1] = d - a),
          (h[2] = c + a),
          (h[3] = d + a));
      }
    });
    return e;
  };
  k.G = function() {
    return this.a.G();
  };
  k.Mg = function(a) {
    a = this.l[a.toString()];
    return void 0 !== a ? a : null;
  };
  k.Kh = function() {
    return this.P;
  };
  k.Lh = function() {
    return this.Z;
  };
  k.Mh = function(a) {
    a = a.target;
    var b = x(a).toString(),
      c = a.V();
    c
      ? ((c = c.G()),
        b in this.i
          ? (delete this.i[b], this.a && this.a.Da(c, a))
          : this.a && kl(this.a, c, a))
      : b in this.i || (this.a && this.a.remove(a), (this.i[b] = a));
    c = a.f;
    void 0 !== c
      ? ((c = c.toString()),
        b in this.o
          ? (delete this.o[b], (this.l[c] = a))
          : this.l[c] !== a && (Gv(this, a), (this.l[c] = a)))
      : b in this.o || (Gv(this, a), (this.o[b] = a));
    this.s();
    this.b(new Bv(Hv, a));
  };
  k.Ed = function(a, b, c) {
    var d = this.sa;
    a = this.fc(a, b);
    var e, f;
    e = 0;
    for (f = a.length; e < f; ++e) {
      var g = a[e];
      pl(d, g, function(a) {
        return Ob(a.extent, g);
      }) || (this.U.call(this, g, b, c), d.Da(g, { extent: g.slice() }));
    }
  };
  k.rb = function(a) {
    var b = x(a).toString();
    b in this.i ? delete this.i[b] : this.a && this.a.remove(a);
    this.$f(a);
    this.s();
  };
  k.$f = function(a) {
    var b = x(a).toString();
    this.v[b].forEach(ya);
    delete this.v[b];
    var c = a.f;
    void 0 !== c ? delete this.l[c.toString()] : delete this.o[b];
    this.b(new Bv(Dv, a));
  };
  function Gv(a, b) {
    for (var c in a.l)
      if (a.l[c] === b) {
        delete a.l[c];
        break;
      }
  }
  function Bv(a, b) {
    Ia.call(this, a);
    this.feature = b;
  }
  v(Bv, Ia);
  var Cv = "addfeature",
    Hv = "changefeature",
    Ev = "clear",
    Dv = "removefeature";
  function Iv(a) {
    Bg.call(this, { handleDownEvent: Jv, handleEvent: Kv, handleUpEvent: Lv });
    this.fa = null;
    this.u = !1;
    this.Ua = a.source ? a.source : null;
    this.xa = a.features ? a.features : null;
    this.Mj = a.snapTolerance ? a.snapTolerance : 12;
    this.U = a.type;
    this.i = Mv(this.U);
    this.Fa = a.minPoints ? a.minPoints : this.i === Nv ? 3 : 2;
    this.na = a.maxPoints ? a.maxPoints : Infinity;
    this.fc = a.finishCondition ? a.finishCondition : mc;
    var b = a.geometryFunction;
    if (!b)
      if ("Circle" === this.U)
        b = function(a, b) {
          var c = b ? b : new bv([NaN, NaN]);
          c.dg(a[0], Math.sqrt(yb(a[0], a[1])));
          return c;
        };
      else {
        var c,
          d = this.i;
        d === Ov ? (c = C) : d === Pv ? (c = P) : d === Nv && (c = E);
        b = function(a, b) {
          var g = b;
          g
            ? d === Nv
              ? g.qa([a[0].concat([a[0][0]])])
              : g.qa(a)
            : (g = new c(a));
          return g;
        };
      }
    this.D = b;
    this.P = this.C = this.a = this.L = this.j = this.o = null;
    this.Ob = a.clickTolerance ? a.clickTolerance * a.clickTolerance : 36;
    this.sa = new G({
      source: new U({ useSpatialIndex: !1, wrapX: a.wrapX ? a.wrapX : !1 }),
      style: a.style ? a.style : Qv()
    });
    this.Ja = a.geometryName;
    this.Lj = a.condition ? a.condition : wg;
    this.Xe = a.freehand ? mc : a.freehandCondition ? a.freehandCondition : xg;
    B(this, Ua(mg), this.Li, this);
  }
  v(Iv, Bg);
  function Qv() {
    var a = Ci();
    return function(b) {
      return a[b.V().Y()];
    };
  }
  k = Iv.prototype;
  k.setMap = function(a) {
    Bg.prototype.setMap.call(this, a);
    this.Li();
  };
  function Kv(a) {
    this.u = this.i !== Ov && this.Xe(a);
    var b = !this.u;
    this.u && "pointerdrag" === a.type && null !== this.j
      ? (Rv(this, a), (b = !1))
      : "pointermove" === a.type
      ? (b = Sv(this, a))
      : "dblclick" === a.type && (b = !1);
    return Cg.call(this, a) && b;
  }
  function Jv(a) {
    return this.u
      ? ((this.fa = a.pixel), this.o || Tv(this, a), !0)
      : this.Lj(a)
      ? ((this.fa = a.pixel), !0)
      : !1;
  }
  function Lv(a) {
    var b = this.fa,
      c = a.pixel,
      d = b[0] - c[0],
      b = b[1] - c[1],
      d = d * d + b * b,
      b = !0,
      c = this.i === Uv;
    (this.u
    ? d > this.Ob
    : d <= this.Ob)
      ? (Sv(this, a),
        this.o
          ? this.u || c
            ? this.zd()
            : Vv(this, a)
            ? this.fc(a) && this.zd()
            : Rv(this, a)
          : (Tv(this, a), this.i === Ov && this.zd()),
        (b = !1))
      : c && (this.o = null);
    return b;
  }
  function Sv(a, b) {
    if (a.o) {
      var c = b.coordinate,
        d = a.j.V(),
        e;
      a.i === Ov
        ? (e = a.a)
        : a.i === Nv
        ? ((e = a.a[0]), (e = e[e.length - 1]), Vv(a, b) && (c = a.o.slice()))
        : ((e = a.a), (e = e[e.length - 1]));
      e[0] = c[0];
      e[1] = c[1];
      a.D(a.a, d);
      a.L && a.L.V().qa(c);
      d instanceof E && a.i !== Nv
        ? (a.C || (a.C = new J(new P(null))),
          (d = d.Qg(0)),
          (c = a.C.V()),
          c.da(d.ka, d.ia()))
        : a.P && ((c = a.C.V()), c.qa(a.P));
      Wv(a);
    } else (c = b.coordinate.slice()), a.L ? a.L.V().qa(c) : ((a.L = new J(new C(c))), Wv(a));
    return !0;
  }
  function Vv(a, b) {
    var c = !1;
    if (a.j) {
      var d = !1,
        e = [a.o];
      a.i === Pv
        ? (d = a.a.length > a.Fa)
        : a.i === Nv &&
          ((d = a.a[0].length > a.Fa),
          (e = [a.a[0][0], a.a[0][a.a[0].length - 2]]));
      if (d)
        for (var d = b.map, f = 0, g = e.length; f < g; f++) {
          var h = e[f],
            l = d.Ga(h),
            m = b.pixel,
            c = m[0] - l[0],
            l = m[1] - l[1];
          if ((c = Math.sqrt(c * c + l * l) <= (a.u ? 1 : a.Mj))) {
            a.o = h;
            break;
          }
        }
    }
    return c;
  }
  function Tv(a, b) {
    var c = b.coordinate;
    a.o = c;
    a.i === Ov
      ? (a.a = c.slice())
      : a.i === Nv
      ? ((a.a = [[c.slice(), c.slice()]]), (a.P = a.a[0]))
      : ((a.a = [c.slice(), c.slice()]), a.i === Uv && (a.P = a.a));
    a.P && (a.C = new J(new P(a.P)));
    c = a.D(a.a);
    a.j = new J();
    a.Ja && a.j.Nc(a.Ja);
    a.j.Pa(c);
    Wv(a);
    a.b(new Xv(Yv, a.j));
  }
  function Rv(a, b) {
    var c = b.coordinate,
      d = a.j.V(),
      e,
      f;
    a.i === Pv
      ? ((a.o = c.slice()),
        (f = a.a),
        f.length >= a.na && (a.u ? f.pop() : (e = !0)),
        f.push(c.slice()),
        a.D(f, d))
      : a.i === Nv &&
        ((f = a.a[0]),
        f.length >= a.na && (a.u ? f.pop() : (e = !0)),
        f.push(c.slice()),
        e && (a.o = f[0]),
        a.D(a.a, d));
    Wv(a);
    e && a.zd();
  }
  k.Vo = function() {
    var a = this.j.V(),
      b,
      c;
    this.i === Pv
      ? ((b = this.a), b.splice(-2, 1), this.D(b, a))
      : this.i === Nv &&
        ((b = this.a[0]),
        b.splice(-2, 1),
        (c = this.C.V()),
        c.qa(b),
        this.D(this.a, a));
    0 === b.length && (this.o = null);
    Wv(this);
  };
  k.zd = function() {
    var a = Zv(this),
      b = this.a,
      c = a.V();
    this.i === Pv
      ? (b.pop(), this.D(b, c))
      : this.i === Nv && (b[0].pop(), this.D(b, c), (b = c.$()));
    "MultiPoint" === this.U
      ? a.Pa(new R([b]))
      : "MultiLineString" === this.U
      ? a.Pa(new Q([b]))
      : "MultiPolygon" === this.U && a.Pa(new S([b]));
    this.b(new Xv($v, a));
    this.xa && this.xa.push(a);
    this.Ua && this.Ua.gb(a);
  };
  function Zv(a) {
    a.o = null;
    var b = a.j;
    b && ((a.j = null), (a.L = null), (a.C = null), a.sa.la().clear(!0));
    return b;
  }
  k.vm = function(a) {
    var b = a.V();
    this.j = a;
    this.a = b.$();
    a = this.a[this.a.length - 1];
    this.o = a.slice();
    this.a.push(a.slice());
    Wv(this);
    this.b(new Xv(Yv, this.j));
  };
  k.Qc = nc;
  function Wv(a) {
    var b = [];
    a.j && b.push(a.j);
    a.C && b.push(a.C);
    a.L && b.push(a.L);
    a = a.sa.la();
    a.clear(!0);
    a.Tc(b);
  }
  k.Li = function() {
    var a = this.v,
      b = this.f();
    (a && b) || Zv(this);
    this.sa.setMap(b ? a : null);
  };
  function Mv(a) {
    var b;
    "Point" === a || "MultiPoint" === a
      ? (b = Ov)
      : "LineString" === a || "MultiLineString" === a
      ? (b = Pv)
      : "Polygon" === a || "MultiPolygon" === a
      ? (b = Nv)
      : "Circle" === a && (b = Uv);
    return b;
  }
  var Ov = "Point",
    Pv = "LineString",
    Nv = "Polygon",
    Uv = "Circle";
  function Xv(a, b) {
    Ia.call(this, a);
    this.feature = b;
  }
  v(Xv, Ia);
  var Yv = "drawstart",
    $v = "drawend";
  function aw(a) {
    this.a = this.j = null;
    this.C = !1;
    this.D = this.o = null;
    a || (a = {});
    a.extent && this.i(a.extent);
    Bg.call(this, {
      handleDownEvent: bw,
      handleDragEvent: cw,
      handleEvent: dw,
      handleUpEvent: ew
    });
    this.u = new G({
      source: new U({ useSpatialIndex: !1, wrapX: !!a.wrapX }),
      style: a.boxStyle ? a.boxStyle : fw(),
      updateWhileAnimating: !0,
      updateWhileInteracting: !0
    });
    this.L = new G({
      source: new U({ useSpatialIndex: !1, wrapX: !!a.wrapX }),
      style: a.pointerStyle ? a.pointerStyle : gw(),
      updateWhileAnimating: !0,
      updateWhileInteracting: !0
    });
  }
  v(aw, Bg);
  function dw(a) {
    if (!(a instanceof cf)) return !0;
    if ("pointermove" == a.type && !this.A) {
      var b = a.pixel,
        c = a.map,
        d = hw(this, b, c);
      d || (d = c.Sa(b));
      iw(this, d);
    }
    Cg.call(this, a);
    return !1;
  }
  function bw(a) {
    function b(a) {
      var b = null,
        c = null;
      a[0] == e[0] ? (b = e[2]) : a[0] == e[2] && (b = e[0]);
      a[1] == e[1] ? (c = e[3]) : a[1] == e[3] && (c = e[1]);
      return null !== b && null !== c ? [b, c] : null;
    }
    var c = a.pixel,
      d = a.map,
      e = this.G();
    (a = hw(this, c, d)) && e
      ? ((c = a[0] == e[0] || a[0] == e[2] ? a[0] : null),
        (d = a[1] == e[1] || a[1] == e[3] ? a[1] : null),
        null !== c && null !== d
          ? (this.a = jw(b(a)))
          : null !== c
          ? (this.a = kw(b([c, e[1]]), b([c, e[3]])))
          : null !== d && (this.a = kw(b([e[0], d]), b([e[2], d]))))
      : ((a = d.Sa(c)), this.i([a[0], a[1], a[0], a[1]]), (this.a = jw(a)));
    return !0;
  }
  function cw(a) {
    this.a && ((a = a.coordinate), this.i(this.a(a)), iw(this, a));
    return !0;
  }
  function ew() {
    this.a = null;
    var a = this.G();
    (a && 0 !== bc(a)) || this.i(null);
    return !1;
  }
  function fw() {
    var a = Ci();
    return function() {
      return a.Polygon;
    };
  }
  function gw() {
    var a = Ci();
    return function() {
      return a.Point;
    };
  }
  function jw(a) {
    return function(b) {
      return Gb([a, b]);
    };
  }
  function kw(a, b) {
    return a[0] == b[0]
      ? function(c) {
          return Gb([a, [c[0], b[1]]]);
        }
      : a[1] == b[1]
      ? function(c) {
          return Gb([a, [b[0], c[1]]]);
        }
      : null;
  }
  function hw(a, b, c) {
    function d(a, b) {
      return zb(e, a) - zb(e, b);
    }
    var e = c.Sa(b),
      f = a.G();
    if (f) {
      f = [
        [
          [f[0], f[1]],
          [f[0], f[3]]
        ],
        [
          [f[0], f[3]],
          [f[2], f[3]]
        ],
        [
          [f[2], f[3]],
          [f[2], f[1]]
        ],
        [
          [f[2], f[1]],
          [f[0], f[1]]
        ]
      ];
      f.sort(d);
      var f = f[0],
        g = sb(e, f),
        h = c.Ga(g);
      if (10 >= Math.sqrt(yb(b, h)))
        return (
          (b = c.Ga(f[0])),
          (c = c.Ga(f[1])),
          (b = yb(h, b)),
          (c = yb(h, c)),
          (a.C = 10 >= Math.sqrt(Math.min(b, c))),
          a.C && (g = b > c ? f[1] : f[0]),
          g
        );
    }
    return null;
  }
  function iw(a, b) {
    var c = a.D;
    c ? c.V().qa(b) : ((c = new J(new C(b))), (a.D = c), a.L.la().gb(c));
  }
  aw.prototype.setMap = function(a) {
    this.u.setMap(a);
    this.L.setMap(a);
    Bg.prototype.setMap.call(this, a);
  };
  aw.prototype.G = function() {
    return this.j;
  };
  aw.prototype.i = function(a) {
    this.j = a ? a : null;
    var b = this.o;
    b
      ? a
        ? b.Pa(Cd(a))
        : b.Pa(void 0)
      : ((this.o = b = a ? new J(Cd(a)) : new J({})), this.u.la().gb(b));
    this.b(new lw(this.j));
  };
  function lw(a) {
    Ia.call(this, mw);
    this.b = a;
  }
  v(lw, Ia);
  var mw = "extentchanged";
  function nw(a) {
    Bg.call(this, {
      handleDownEvent: ow,
      handleDragEvent: pw,
      handleEvent: qw,
      handleUpEvent: rw
    });
    this.Ua = a.condition ? a.condition : Ag;
    this.xa = function(a) {
      return wg(a) && vg(a);
    };
    this.Ja = a.deleteCondition ? a.deleteCondition : this.xa;
    this.Fa = this.a = null;
    this.sa = [0, 0];
    this.C = this.L = !1;
    this.i = new jl();
    this.fa = void 0 !== a.pixelTolerance ? a.pixelTolerance : 10;
    this.o = this.na = !1;
    this.j = [];
    this.D = new G({
      source: new U({ useSpatialIndex: !1, wrapX: !!a.wrapX }),
      style: a.style ? a.style : sw(),
      updateWhileAnimating: !0,
      updateWhileInteracting: !0
    });
    this.U = {
      Point: this.Cm,
      LineString: this.uh,
      LinearRing: this.uh,
      Polygon: this.Dm,
      MultiPoint: this.Am,
      MultiLineString: this.zm,
      MultiPolygon: this.Bm,
      GeometryCollection: this.ym
    };
    this.u = a.features;
    this.u.forEach(this.Gf, this);
    B(this.u, ue, this.wm, this);
    B(this.u, ve, this.xm, this);
    this.P = null;
  }
  v(nw, Bg);
  k = nw.prototype;
  k.Gf = function(a) {
    var b = a.V();
    b && b.Y() in this.U && this.U[b.Y()].call(this, a, b);
    (b = this.v) && b.a && tw(this, this.sa, b);
    B(a, "change", this.th, this);
  };
  function uw(a, b) {
    a.C || ((a.C = !0), a.b(new vw(ww, a.u, b)));
  }
  function xw(a, b) {
    yw(a, b);
    a.a && 0 === a.u.Ub() && (a.D.la().rb(a.a), (a.a = null));
    Ea(b, "change", a.th, a);
  }
  function yw(a, b) {
    var c = a.i,
      d = [];
    c.forEach(function(a) {
      b === a.feature && d.push(a);
    });
    for (var e = d.length - 1; 0 <= e; --e) c.remove(d[e]);
  }
  k.Ea = function(a) {
    this.a && !a && (this.D.la().rb(this.a), (this.a = null));
    Bg.prototype.Ea.call(this, a);
  };
  k.setMap = function(a) {
    this.D.setMap(a);
    Bg.prototype.setMap.call(this, a);
  };
  k.wm = function(a) {
    this.Gf(a.element);
  };
  k.th = function(a) {
    this.o || ((a = a.target), xw(this, a), this.Gf(a));
  };
  k.xm = function(a) {
    xw(this, a.element);
  };
  k.Cm = function(a, b) {
    var c = b.$(),
      c = { feature: a, geometry: b, ta: [c, c] };
    this.i.Da(b.G(), c);
  };
  k.Am = function(a, b) {
    var c = b.$(),
      d,
      e,
      f;
    e = 0;
    for (f = c.length; e < f; ++e)
      (d = c[e]),
        (d = { feature: a, geometry: b, depth: [e], index: e, ta: [d, d] }),
        this.i.Da(b.G(), d);
  };
  k.uh = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g;
    d = 0;
    for (e = c.length - 1; d < e; ++d)
      (f = c.slice(d, d + 2)),
        (g = { feature: a, geometry: b, index: d, ta: f }),
        this.i.Da(Gb(f), g);
  };
  k.zm = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g,
      h,
      l,
      m;
    g = 0;
    for (h = c.length; g < h; ++g)
      for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
        (l = d.slice(e, e + 2)),
          (m = { feature: a, geometry: b, depth: [g], index: e, ta: l }),
          this.i.Da(Gb(l), m);
  };
  k.Dm = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g,
      h,
      l,
      m;
    g = 0;
    for (h = c.length; g < h; ++g)
      for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
        (l = d.slice(e, e + 2)),
          (m = { feature: a, geometry: b, depth: [g], index: e, ta: l }),
          this.i.Da(Gb(l), m);
  };
  k.Bm = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g,
      h,
      l,
      m,
      p,
      n,
      q;
    l = 0;
    for (m = c.length; l < m; ++l)
      for (p = c[l], g = 0, h = p.length; g < h; ++g)
        for (d = p[g], e = 0, f = d.length - 1; e < f; ++e)
          (n = d.slice(e, e + 2)),
            (q = { feature: a, geometry: b, depth: [g, l], index: e, ta: n }),
            this.i.Da(Gb(n), q);
  };
  k.ym = function(a, b) {
    var c,
      d = b.f;
    for (c = 0; c < d.length; ++c) this.U[d[c].Y()].call(this, a, d[c]);
  };
  function zw(a, b) {
    var c = a.a;
    c ? c.V().qa(b) : ((c = new J(new C(b))), (a.a = c), a.D.la().gb(c));
  }
  function Aw(a, b) {
    return a.index - b.index;
  }
  function ow(a) {
    if (!this.Ua(a)) return !1;
    tw(this, a.pixel, a.map);
    this.j.length = 0;
    this.C = !1;
    var b = this.a;
    if (b) {
      var c = [],
        b = b.V().$(),
        d = Gb([b]),
        d = ml(this.i, d),
        e = {};
      d.sort(Aw);
      for (var f = 0, g = d.length; f < g; ++f) {
        var h = d[f],
          l = h.ta,
          m = x(h.feature),
          p = h.depth;
        p && (m += "-" + p.join("-"));
        e[m] || (e[m] = Array(2));
        if (vb(l[0], b) && !e[m][0]) this.j.push([h, 0]), (e[m][0] = h);
        else if (vb(l[1], b) && !e[m][1]) {
          if (
            ("LineString" !== h.geometry.Y() &&
              "MultiLineString" !== h.geometry.Y()) ||
            !e[m][0] ||
            0 !== e[m][0].index
          )
            this.j.push([h, 1]), (e[m][1] = h);
        } else x(l) in this.Fa && !e[m][0] && !e[m][1] && c.push([h, b]);
      }
      c.length && uw(this, a);
      for (a = c.length - 1; 0 <= a; --a) this.pl.apply(this, c[a]);
    }
    return !!this.a;
  }
  function pw(a) {
    this.L = !1;
    uw(this, a);
    a = a.coordinate;
    for (var b = 0, c = this.j.length; b < c; ++b) {
      for (
        var d = this.j[b],
          e = d[0],
          f = e.depth,
          g = e.geometry,
          h = g.$(),
          l = e.ta,
          d = d[1];
        a.length < g.pa();

      )
        a.push(l[d][a.length]);
      switch (g.Y()) {
        case "Point":
          h = a;
          l[0] = l[1] = a;
          break;
        case "MultiPoint":
          h[e.index] = a;
          l[0] = l[1] = a;
          break;
        case "LineString":
          h[e.index + d] = a;
          l[d] = a;
          break;
        case "MultiLineString":
          h[f[0]][e.index + d] = a;
          l[d] = a;
          break;
        case "Polygon":
          h[f[0]][e.index + d] = a;
          l[d] = a;
          break;
        case "MultiPolygon":
          (h[f[1]][f[0]][e.index + d] = a), (l[d] = a);
      }
      e = g;
      this.o = !0;
      e.qa(h);
      this.o = !1;
    }
    zw(this, a);
  }
  function rw(a) {
    for (var b, c = this.j.length - 1; 0 <= c; --c)
      (b = this.j[c][0]), kl(this.i, Gb(b.ta), b);
    this.C && (this.b(new vw(Bw, this.u, a)), (this.C = !1));
    return !1;
  }
  function qw(a) {
    if (!(a instanceof cf)) return !0;
    this.P = a;
    var b;
    Md(a.map.aa())[1] ||
      "pointermove" != a.type ||
      this.A ||
      ((this.sa = a.pixel), tw(this, a.pixel, a.map));
    this.a &&
      this.Ja(a) &&
      (b = "singleclick" == a.type && this.L ? !0 : this.ki());
    "singleclick" == a.type && (this.L = !1);
    return Cg.call(this, a) && !b;
  }
  function tw(a, b, c) {
    function d(a, b) {
      return zb(e, a.ta) - zb(e, b.ta);
    }
    var e = c.Sa(b),
      f = Jb(Sb(e), c.aa().Oa() * a.fa),
      f = ml(a.i, f);
    if (0 < f.length) {
      f.sort(d);
      var g = f[0].ta,
        h = sb(e, g),
        l = c.Ga(h);
      if (Math.sqrt(yb(b, l)) <= a.fa) {
        b = c.Ga(g[0]);
        c = c.Ga(g[1]);
        b = yb(l, b);
        l = yb(l, c);
        a.na = Math.sqrt(Math.min(b, l)) <= a.fa;
        a.na && (h = b > l ? g[1] : g[0]);
        zw(a, h);
        h = {};
        h[x(g)] = !0;
        c = 1;
        for (b = f.length; c < b; ++c)
          if (
            ((l = f[c].ta),
            (vb(g[0], l[0]) && vb(g[1], l[1])) ||
              (vb(g[0], l[1]) && vb(g[1], l[0])))
          )
            h[x(l)] = !0;
          else break;
        a.Fa = h;
        return;
      }
    }
    a.a && (a.D.la().rb(a.a), (a.a = null));
  }
  k.pl = function(a, b) {
    for (
      var c = a.ta, d = a.feature, e = a.geometry, f = a.depth, g = a.index, h;
      b.length < e.pa();

    )
      b.push(0);
    switch (e.Y()) {
      case "MultiLineString":
        h = e.$();
        h[f[0]].splice(g + 1, 0, b);
        break;
      case "Polygon":
        h = e.$();
        h[f[0]].splice(g + 1, 0, b);
        break;
      case "MultiPolygon":
        h = e.$();
        h[f[1]][f[0]].splice(g + 1, 0, b);
        break;
      case "LineString":
        h = e.$();
        h.splice(g + 1, 0, b);
        break;
      default:
        return;
    }
    this.o = !0;
    e.qa(h);
    this.o = !1;
    h = this.i;
    h.remove(a);
    Cw(this, e, g, f, 1);
    var l = { ta: [c[0], b], feature: d, geometry: e, depth: f, index: g };
    h.Da(Gb(l.ta), l);
    this.j.push([l, 1]);
    c = { ta: [b, c[1]], feature: d, geometry: e, depth: f, index: g + 1 };
    h.Da(Gb(c.ta), c);
    this.j.push([c, 0]);
    this.L = !0;
  };
  k.ki = function() {
    if (this.P && "pointerdrag" != this.P.type) {
      var a = this.P;
      uw(this, a);
      var b = this.j,
        c = {},
        d,
        e,
        f,
        g,
        h,
        l,
        m,
        p,
        n;
      for (h = b.length - 1; 0 <= h; --h)
        (g = b[h]),
          (p = g[0]),
          (n = x(p.feature)),
          p.depth && (n += "-" + p.depth.join("-")),
          n in c || (c[n] = {}),
          0 === g[1]
            ? ((c[n].right = p), (c[n].index = p.index))
            : 1 == g[1] && ((c[n].left = p), (c[n].index = p.index + 1));
      for (n in c) {
        m = c[n].right;
        h = c[n].left;
        g = c[n].index;
        l = g - 1;
        p = void 0 !== h ? h : m;
        0 > l && (l = 0);
        b = p.geometry;
        e = f = b.$();
        d = !1;
        switch (b.Y()) {
          case "MultiLineString":
            2 < f[p.depth[0]].length && (f[p.depth[0]].splice(g, 1), (d = !0));
            break;
          case "LineString":
            2 < f.length && (f.splice(g, 1), (d = !0));
            break;
          case "MultiPolygon":
            e = e[p.depth[1]];
          case "Polygon":
            (e = e[p.depth[0]]),
              4 < e.length &&
                (g == e.length - 1 && (g = 0),
                e.splice(g, 1),
                (d = !0),
                0 === g && (e.pop(), e.push(e[0]), (l = e.length - 1)));
        }
        d &&
          ((d = b),
          (this.o = !0),
          d.qa(f),
          (this.o = !1),
          (f = []),
          void 0 !== h && (this.i.remove(h), f.push(h.ta[0])),
          void 0 !== m && (this.i.remove(m), f.push(m.ta[1])),
          void 0 !== h &&
            void 0 !== m &&
            ((h = {
              depth: p.depth,
              feature: p.feature,
              geometry: p.geometry,
              index: l,
              ta: f
            }),
            this.i.Da(Gb(h.ta), h)),
          Cw(this, b, g, p.depth, -1),
          this.a && (this.D.la().rb(this.a), (this.a = null)));
      }
      this.b(new vw(Bw, this.u, a));
      this.C = !1;
      return !0;
    }
    return !1;
  };
  function Cw(a, b, c, d, e) {
    pl(a.i, b.G(), function(a) {
      a.geometry === b &&
        (void 0 === d || void 0 === a.depth || db(a.depth, d)) &&
        a.index > c &&
        (a.index += e);
    });
  }
  function sw() {
    var a = Ci();
    return function() {
      return a.Point;
    };
  }
  function vw(a, b, c) {
    Ia.call(this, a);
    this.features = b;
    this.mapBrowserEvent = c;
  }
  v(vw, Ia);
  var ww = "modifystart",
    Bw = "modifyend";
  function Dw(a) {
    lg.call(this, { handleEvent: Ew });
    a = a ? a : {};
    this.C = a.condition ? a.condition : vg;
    this.A = a.addCondition ? a.addCondition : nc;
    this.D = a.removeCondition ? a.removeCondition : nc;
    this.L = a.toggleCondition ? a.toggleCondition : xg;
    this.o = a.multi ? a.multi : !1;
    this.l = a.filter ? a.filter : mc;
    this.j = a.hitTolerance ? a.hitTolerance : 0;
    this.i = new G({
      source: new U({
        useSpatialIndex: !1,
        features: a.features,
        wrapX: a.wrapX
      }),
      style: a.style ? a.style : Fw(),
      updateWhileAnimating: !0,
      updateWhileInteracting: !0
    });
    if (a.layers)
      if ("function" === typeof a.layers) a = a.layers;
      else {
        var b = a.layers;
        a = function(a) {
          return Za(b, a);
        };
      }
    else a = mc;
    this.u = a;
    this.a = {};
    a = this.i.la().c;
    B(a, ue, this.Em, this);
    B(a, ve, this.Im, this);
  }
  v(Dw, lg);
  k = Dw.prototype;
  k.Fm = function() {
    return this.i.la().c;
  };
  k.Gm = function() {
    return this.j;
  };
  k.Hm = function(a) {
    a = x(a);
    return this.a[a];
  };
  function Ew(a) {
    if (!this.C(a)) return !0;
    var b = this.A(a),
      c = this.D(a),
      d = this.L(a),
      e = !b && !c && !d,
      f = a.map,
      g = this.i.la().c,
      h = [],
      l = [];
    if (e) {
      ua(this.a);
      f.ae(
        a.pixel,
        function(a, b) {
          if (this.l(a, b)) {
            l.push(a);
            var c = x(a);
            this.a[c] = b;
            return !this.o;
          }
        }.bind(this),
        { layerFilter: this.u, hitTolerance: this.j }
      );
      for (e = g.Ub() - 1; 0 <= e; --e) {
        var f = g.item(e),
          m = l.indexOf(f);
        -1 < m ? l.splice(m, 1) : (g.remove(f), h.push(f));
      }
      0 !== l.length && g.Bf(l);
    } else {
      f.ae(
        a.pixel,
        function(a, e) {
          if (this.l(a, e)) {
            if ((!b && !d) || Za(g.a, a))
              (c || d) &&
                Za(g.a, a) &&
                (h.push(a), (f = x(a)), delete this.a[f]);
            else {
              l.push(a);
              var f = x(a);
              this.a[f] = e;
            }
            return !this.o;
          }
        }.bind(this),
        { layerFilter: this.u, hitTolerance: this.j }
      );
      for (e = h.length - 1; 0 <= e; --e) g.remove(h[e]);
      g.Bf(l);
    }
    (0 < l.length || 0 < h.length) && this.b(new Gw(Hw, l, h, a));
    return ug(a);
  }
  k.Jm = function(a) {
    this.j = a;
  };
  k.setMap = function(a) {
    var b = this.v,
      c = this.i.la().c;
    b && c.forEach(b.Ji, b);
    lg.prototype.setMap.call(this, a);
    this.i.setMap(a);
    a && c.forEach(a.Di, a);
  };
  function Fw() {
    var a = Ci();
    bb(a.Polygon, a.LineString);
    bb(a.GeometryCollection, a.LineString);
    return function(b) {
      return b.V() ? a[b.V().Y()] : null;
    };
  }
  k.Em = function(a) {
    var b = this.v;
    b && b.Di(a.element);
  };
  k.Im = function(a) {
    var b = this.v;
    b && b.Ji(a.element);
  };
  function Gw(a, b, c, d) {
    Ia.call(this, a);
    this.selected = b;
    this.deselected = c;
    this.mapBrowserEvent = d;
  }
  v(Gw, Ia);
  var Hw = "select";
  function Iw(a) {
    Bg.call(this, { handleEvent: Jw, handleDownEvent: mc, handleUpEvent: Kw });
    a = a ? a : {};
    this.o = a.source ? a.source : null;
    this.sa = void 0 !== a.vertex ? a.vertex : !0;
    this.P = void 0 !== a.edge ? a.edge : !0;
    this.j = a.features ? a.features : null;
    this.na = [];
    this.C = {};
    this.D = {};
    this.U = {};
    this.u = {};
    this.L = null;
    this.i = void 0 !== a.pixelTolerance ? a.pixelTolerance : 10;
    this.Fa = Lw.bind(this);
    this.a = new jl();
    this.fa = {
      Point: this.Pm,
      LineString: this.xh,
      LinearRing: this.xh,
      Polygon: this.Qm,
      MultiPoint: this.Nm,
      MultiLineString: this.Mm,
      MultiPolygon: this.Om,
      GeometryCollection: this.Lm
    };
  }
  v(Iw, Bg);
  k = Iw.prototype;
  k.gb = function(a, b) {
    var c = void 0 !== b ? b : !0,
      d = x(a),
      e = a.V();
    if (e) {
      var f = this.fa[e.Y()];
      f &&
        ((this.U[d] = e.G(Hb())),
        f.call(this, a, e),
        c && (this.D[d] = B(e, "change", this.Pk.bind(this, a), this)));
    }
    c && (this.C[d] = B(a, Ua(a.a), this.Km, this));
  };
  k.Qj = function(a) {
    this.gb(a);
  };
  k.Rj = function(a) {
    this.rb(a);
  };
  k.vh = function(a) {
    var b;
    a instanceof Bv ? (b = a.feature) : a instanceof te && (b = a.element);
    this.gb(b);
  };
  k.wh = function(a) {
    var b;
    a instanceof Bv ? (b = a.feature) : a instanceof te && (b = a.element);
    this.rb(b);
  };
  k.Km = function(a) {
    a = a.target;
    this.rb(a, !0);
    this.gb(a, !0);
  };
  k.Pk = function(a) {
    if (this.A) {
      var b = x(a);
      b in this.u || (this.u[b] = a);
    } else this.Ki(a);
  };
  k.rb = function(a, b) {
    var c = void 0 !== b ? b : !0,
      d = x(a),
      e = this.U[d];
    if (e) {
      var f = this.a,
        g = [];
      pl(f, e, function(b) {
        a === b.feature && g.push(b);
      });
      for (e = g.length - 1; 0 <= e; --e) f.remove(g[e]);
      c && (Qa(this.D[d]), delete this.D[d]);
    }
    c && (Qa(this.C[d]), delete this.C[d]);
  };
  k.setMap = function(a) {
    var b = this.v,
      c = this.na,
      d;
    this.j ? (d = this.j) : this.o && (d = this.o.we());
    b && (c.forEach(Qa), (c.length = 0), d.forEach(this.Rj, this));
    Bg.prototype.setMap.call(this, a);
    a &&
      (this.j
        ? c.push(B(this.j, ue, this.vh, this), B(this.j, ve, this.wh, this))
        : this.o &&
          c.push(B(this.o, Cv, this.vh, this), B(this.o, Dv, this.wh, this)),
      d.forEach(this.Qj, this));
  };
  k.Qc = nc;
  k.Ki = function(a) {
    this.rb(a, !1);
    this.gb(a, !1);
  };
  k.Lm = function(a, b) {
    var c,
      d = b.f;
    for (c = 0; c < d.length; ++c) this.fa[d[c].Y()].call(this, a, d[c]);
  };
  k.xh = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g;
    d = 0;
    for (e = c.length - 1; d < e; ++d)
      (f = c.slice(d, d + 2)), (g = { feature: a, ta: f }), this.a.Da(Gb(f), g);
  };
  k.Mm = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g,
      h,
      l,
      m;
    g = 0;
    for (h = c.length; g < h; ++g)
      for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
        (l = d.slice(e, e + 2)),
          (m = { feature: a, ta: l }),
          this.a.Da(Gb(l), m);
  };
  k.Nm = function(a, b) {
    var c = b.$(),
      d,
      e,
      f;
    e = 0;
    for (f = c.length; e < f; ++e)
      (d = c[e]), (d = { feature: a, ta: [d, d] }), this.a.Da(b.G(), d);
  };
  k.Om = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g,
      h,
      l,
      m,
      p,
      n,
      q;
    l = 0;
    for (m = c.length; l < m; ++l)
      for (p = c[l], g = 0, h = p.length; g < h; ++g)
        for (d = p[g], e = 0, f = d.length - 1; e < f; ++e)
          (n = d.slice(e, e + 2)),
            (q = { feature: a, ta: n }),
            this.a.Da(Gb(n), q);
  };
  k.Pm = function(a, b) {
    var c = b.$(),
      c = { feature: a, ta: [c, c] };
    this.a.Da(b.G(), c);
  };
  k.Qm = function(a, b) {
    var c = b.$(),
      d,
      e,
      f,
      g,
      h,
      l,
      m;
    g = 0;
    for (h = c.length; g < h; ++g)
      for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
        (l = d.slice(e, e + 2)),
          (m = { feature: a, ta: l }),
          this.a.Da(Gb(l), m);
  };
  function Jw(a) {
    var b,
      c,
      d = a.pixel,
      e = a.coordinate;
    b = a.map;
    var f = b.Sa([d[0] - this.i, d[1] + this.i]);
    c = b.Sa([d[0] + this.i, d[1] - this.i]);
    var f = Gb([f, c]),
      g = ml(this.a, f),
      h,
      f = !1,
      l = null;
    c = null;
    if (0 < g.length) {
      this.L = e;
      g.sort(this.Fa);
      g = g[0].ta;
      if (this.sa && !this.P) {
        if (
          ((e = b.Ga(g[0])),
          (h = b.Ga(g[1])),
          (e = yb(d, e)),
          (d = yb(d, h)),
          (h = Math.sqrt(Math.min(e, d))),
          (h = h <= this.i))
        )
          (f = !0), (l = e > d ? g[1] : g[0]), (c = b.Ga(l));
      } else
        this.P &&
          ((l = sb(e, g)),
          (c = b.Ga(l)),
          Math.sqrt(yb(d, c)) <= this.i &&
            ((f = !0),
            this.sa &&
              ((e = b.Ga(g[0])),
              (h = b.Ga(g[1])),
              (e = yb(c, e)),
              (d = yb(c, h)),
              (h = Math.sqrt(Math.min(e, d))),
              (h = h <= this.i)))) &&
          ((l = e > d ? g[1] : g[0]), (c = b.Ga(l)));
      f && (c = [Math.round(c[0]), Math.round(c[1])]);
    }
    b = l;
    f && ((a.coordinate = b.slice(0, 2)), (a.pixel = c));
    return Cg.call(this, a);
  }
  function Kw() {
    var a = va(this.u);
    a.length && (a.forEach(this.Ki, this), (this.u = {}));
    return !1;
  }
  function Lw(a, b) {
    return zb(this.L, a.ta) - zb(this.L, b.ta);
  }
  function Mw(a) {
    Bg.call(this, {
      handleDownEvent: Nw,
      handleDragEvent: Ow,
      handleMoveEvent: Pw,
      handleUpEvent: Qw
    });
    a = a ? a : {};
    this.o = void 0;
    this.a = null;
    this.j = void 0 !== a.features ? a.features : null;
    var b;
    if (a.layers)
      if ("function" === typeof a.layers) b = a.layers;
      else {
        var c = a.layers;
        b = function(a) {
          return Za(c, a);
        };
      }
    else b = mc;
    this.C = b;
    this.u = a.hitTolerance ? a.hitTolerance : 0;
    this.i = null;
  }
  v(Mw, Bg);
  function Nw(a) {
    this.i = Rw(this, a.pixel, a.map);
    if (!this.a && this.i) {
      this.a = a.coordinate;
      Pw.call(this, a);
      var b = this.j || new qe([this.i]);
      this.b(new Sw(Tw, b, a.coordinate));
      return !0;
    }
    return !1;
  }
  function Qw(a) {
    if (this.a) {
      this.a = null;
      Pw.call(this, a);
      var b = this.j || new qe([this.i]);
      this.b(new Sw(Uw, b, a.coordinate));
      return !0;
    }
    return !1;
  }
  function Ow(a) {
    if (this.a) {
      a = a.coordinate;
      var b = a[0] - this.a[0],
        c = a[1] - this.a[1],
        d = this.j || new qe([this.i]);
      d.forEach(function(a) {
        var d = a.V();
        d.translate(b, c);
        a.Pa(d);
      });
      this.a = a;
      this.b(new Sw(Vw, d, a));
    }
  }
  function Pw(a) {
    var b = a.map.Cc();
    Rw(this, a.pixel, a.map)
      ? ((this.o = b.style.cursor),
        (b.style.cursor = this.a ? "-webkit-grabbing" : "-webkit-grab"),
        (b.style.cursor = this.a ? "grabbing" : "grab"))
      : ((b.style.cursor = void 0 !== this.o ? this.o : ""), (this.o = void 0));
  }
  function Rw(a, b, c) {
    return c.ae(
      b,
      function(a) {
        if (!this.j || Za(this.j.a, a)) return a;
      }.bind(a),
      { layerFilter: a.C, hitTolerance: a.u }
    );
  }
  Mw.prototype.D = function() {
    return this.u;
  };
  Mw.prototype.L = function(a) {
    this.u = a;
  };
  function Sw(a, b, c) {
    Ia.call(this, a);
    this.features = b;
    this.coordinate = c;
  }
  v(Sw, Ia);
  var Tw = "translatestart",
    Vw = "translating",
    Uw = "translateend";
  function V(a) {
    a = a ? a : {};
    var b = ta({}, a);
    delete b.gradient;
    delete b.radius;
    delete b.blur;
    delete b.shadow;
    delete b.weight;
    G.call(this, b);
    this.f = null;
    this.U = void 0 !== a.shadow ? a.shadow : 250;
    this.P = void 0;
    this.c = null;
    B(this, Ua(Ww), this.Qk, this);
    this.ui(a.gradient ? a.gradient : Xw);
    this.ni(void 0 !== a.blur ? a.blur : 15);
    this.Ah(void 0 !== a.radius ? a.radius : 8);
    B(this, Ua(Yw), this.xf, this);
    B(this, Ua(Zw), this.xf, this);
    this.xf();
    var c = a.weight ? a.weight : "weight",
      d;
    "string" === typeof c
      ? (d = function(a) {
          return a.get(c);
        })
      : (d = c);
    this.l(
      function(a) {
        a = d(a);
        a = void 0 !== a ? ia(a, 0, 1) : 1;
        var b = (255 * a) | 0,
          c = this.c[b];
        c ||
          ((c = [new xi({ image: new xq({ opacity: a, src: this.P }) })]),
          (this.c[b] = c));
        return c;
      }.bind(this)
    );
    this.set("renderOrder", null);
    B(this, "render", this.gl, this);
  }
  v(V, G);
  var Xw = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"];
  k = V.prototype;
  k.Ig = function() {
    return this.get(Yw);
  };
  k.Pg = function() {
    return this.get(Ww);
  };
  k.zh = function() {
    return this.get(Zw);
  };
  k.Qk = function() {
    for (
      var a = this.Pg(),
        b = De(1, 256),
        c = b.createLinearGradient(0, 0, 1, 256),
        d = 1 / (a.length - 1),
        e = 0,
        f = a.length;
      e < f;
      ++e
    )
      c.addColorStop(e * d, a[e]);
    b.fillStyle = c;
    b.fillRect(0, 0, 1, 256);
    this.f = b.getImageData(0, 0, 1, 256).data;
  };
  k.xf = function() {
    var a = this.zh(),
      b = this.Ig(),
      c = a + b + 1,
      d = 2 * c,
      d = De(d, d);
    d.shadowOffsetX = d.shadowOffsetY = this.U;
    d.shadowBlur = b;
    d.shadowColor = "#000";
    d.beginPath();
    b = c - this.U;
    d.arc(b, b, a, 0, 2 * Math.PI, !0);
    d.fill();
    this.P = d.canvas.toDataURL();
    this.c = Array(256);
    this.s();
  };
  k.gl = function(a) {
    a = a.context;
    var b = a.canvas,
      b = a.getImageData(0, 0, b.width, b.height),
      c = b.data,
      d,
      e,
      f;
    d = 0;
    for (e = c.length; d < e; d += 4)
      if ((f = 4 * c[d + 3]))
        (c[d] = this.f[f]),
          (c[d + 1] = this.f[f + 1]),
          (c[d + 2] = this.f[f + 2]);
    a.putImageData(b, 0, 0);
  };
  k.ni = function(a) {
    this.set(Yw, a);
  };
  k.ui = function(a) {
    this.set(Ww, a);
  };
  k.Ah = function(a) {
    this.set(Zw, a);
  };
  var Yw = "blur",
    Ww = "gradient",
    Zw = "radius";
  function $w(a, b, c, d) {
    function e() {
      delete window[g];
      f.parentNode.removeChild(f);
    }
    var f = document.createElement("script"),
      g = "olc_" + x(b);
    f.async = !0;
    f.src =
      a + (-1 == a.indexOf("?") ? "?" : "&") + (d || "callback") + "=" + g;
    var h = setTimeout(function() {
      e();
      c && c();
    }, 1e4);
    window[g] = function(a) {
      clearTimeout(h);
      e();
      b(a);
    };
    document.getElementsByTagName("head")[0].appendChild(f);
  }
  function ax(a, b, c, d, e, f, g, h, l, m, p) {
    ag.call(this, e, 0);
    this.C = void 0 !== p ? p : !1;
    this.A = g;
    this.u = h;
    this.H = null;
    this.f = b;
    this.l = d;
    this.o = f ? f : e;
    this.g = [];
    this.kd = null;
    this.i = 0;
    f = d.Na(this.o);
    h = this.l.G();
    e = this.f.G();
    f = h ? ic(f, h) : f;
    if (0 === bc(f)) this.state = 4;
    else if (
      ((h = a.G()) && (e ? (e = ic(e, h)) : (e = h)),
      (d = d.Ha(this.o[0])),
      (d = am(a, c, gc(f), d)),
      !isFinite(d) || 0 >= d)
    )
      this.state = 4;
    else if (
      ((this.v = new dm(a, c, f, e, d * (void 0 !== m ? m : 0.5))),
      0 === this.v.f.length)
    )
      this.state = 4;
    else if (
      ((this.i = b.Ec(d)),
      (c = fm(this.v)),
      e &&
        (a.a
          ? ((c[1] = ia(c[1], e[1], e[3])), (c[3] = ia(c[3], e[1], e[3])))
          : (c = ic(c, e))),
      bc(c))
    ) {
      a = fe(b, c, this.i);
      for (b = a.ea; b <= a.ca; b++)
        for (c = a.ga; c <= a.ja; c++)
          (m = l(this.i, b, c, g)) && this.g.push(m);
      0 === this.g.length && (this.state = 4);
    } else this.state = 4;
  }
  v(ax, ag);
  ax.prototype.oa = function() {
    1 == this.state && (this.kd.forEach(ya), (this.kd = null));
    ag.prototype.oa.call(this);
  };
  ax.prototype.ub = function() {
    return this.H;
  };
  ax.prototype.Ld = function() {
    var a = [];
    this.g.forEach(function(b) {
      b && b.W() == cg && a.push({ extent: this.f.Na(b.Ca), image: b.ub() });
    }, this);
    this.g.length = 0;
    if (0 === a.length) this.state = 3;
    else {
      var b = this.o[0],
        c = this.l.Za(b),
        d = "number" === typeof c ? c : c[0],
        c = "number" === typeof c ? c : c[1],
        b = this.l.Ha(b),
        e = this.f.Ha(this.i),
        f = this.l.Na(this.o);
      this.H = cm(d, c, this.A, e, this.f.G(), b, f, this.v, a, this.u, this.C);
      this.state = cg;
    }
    this.s();
  };
  ax.prototype.load = function() {
    if (0 == this.state) {
      this.state = 1;
      this.s();
      var a = 0;
      this.kd = [];
      this.g.forEach(function(b) {
        var c = b.W();
        if (0 == c || 1 == c) {
          a++;
          var d;
          d = B(
            b,
            "change",
            function() {
              var c = b.W();
              if (c == cg || 3 == c || 4 == c)
                ya(d),
                  a--,
                  0 === a && (this.kd.forEach(ya), (this.kd = null), this.Ld());
            },
            this
          );
          this.kd.push(d);
        }
      }, this);
      this.g.forEach(function(a) {
        0 == a.W() && a.load();
      });
      0 === a && setTimeout(this.Ld.bind(this), 0);
    }
  };
  function bx(a, b) {
    var c = /\{z\}/g,
      d = /\{x\}/g,
      e = /\{y\}/g,
      f = /\{-y\}/g;
    return function(g) {
      if (g)
        return a
          .replace(c, g[0].toString())
          .replace(d, g[1].toString())
          .replace(e, function() {
            return (-g[2] - 1).toString();
          })
          .replace(f, function() {
            var a = b.a ? b.a[g[0]] : null;
            ha(a, 55);
            return (a.ja - a.ga + 1 + g[2]).toString();
          });
    };
  }
  function cx(a, b) {
    for (var c = a.length, d = Array(c), e = 0; e < c; ++e) d[e] = bx(a[e], b);
    return dx(d);
  }
  function dx(a) {
    return 1 === a.length
      ? a[0]
      : function(b, c, d) {
          if (b) return a[oa((b[1] << b[0]) + b[2], a.length)](b, c, d);
        };
  }
  function ex() {}
  function fx(a) {
    var b = [],
      c = /\{([a-z])-([a-z])\}/.exec(a);
    if (c) {
      var d = c[2].charCodeAt(0),
        e;
      for (e = c[1].charCodeAt(0); e <= d; ++e)
        b.push(a.replace(c[0], String.fromCharCode(e)));
      return b;
    }
    if ((c = c = /\{(\d+)-(\d+)\}/.exec(a))) {
      d = parseInt(c[2], 10);
      for (e = parseInt(c[1], 10); e <= d; e++)
        b.push(a.replace(c[0], e.toString()));
      return b;
    }
    b.push(a);
    return b;
  }
  function gx(a) {
    Fm.call(this);
    this.c = void 0 !== a ? a : 2048;
  }
  v(gx, Fm);
  function hx(a) {
    return a.f > a.c;
  }
  gx.prototype.Wc = function(a) {
    for (var b, c; hx(this); ) {
      b = this.a.Rc;
      c = b.Ca[0].toString();
      var d;
      if ((d = c in a)) (b = b.Ca), (d = Ud(a[c], b[1], b[2]));
      if (d) break;
      else Ha(this.pop());
    }
  };
  function ix(a) {
    hm.call(this, {
      attributions: a.attributions,
      extent: a.extent,
      logo: a.logo,
      projection: a.projection,
      state: a.state,
      wrapX: a.wrapX
    });
    this.sa = void 0 !== a.opaque ? a.opaque : !1;
    this.xa = void 0 !== a.tilePixelRatio ? a.tilePixelRatio : 1;
    this.tileGrid = void 0 !== a.tileGrid ? a.tileGrid : null;
    this.a = new gx(a.cacheSize);
    this.l = [0, 0];
    this.jc = "";
  }
  v(ix, hm);
  k = ix.prototype;
  k.Ih = function() {
    return hx(this.a);
  };
  k.Wc = function(a, b) {
    var c = this.Cd(a);
    c && c.Wc(b);
  };
  function Vi(a, b, c, d, e) {
    b = a.Cd(b);
    if (!b) return !1;
    for (var f = !0, g, h, l = d.ea; l <= d.ca; ++l)
      for (var m = d.ga; m <= d.ja; ++m)
        (g = a.Lb(c, l, m)),
          (h = !1),
          b.b.hasOwnProperty(g) &&
            ((g = b.get(g)), (h = g.W() === cg) && (h = !1 !== e(g))),
          h || (f = !1);
    return f;
  }
  k.qf = function() {
    return 0;
  };
  function jx(a, b) {
    a.jc !== b && ((a.jc = b), a.s());
  }
  k.Lb = function(a, b, c) {
    return a + "/" + b + "/" + c;
  };
  k.tf = function() {
    return this.sa;
  };
  k.Va = function() {
    return this.tileGrid;
  };
  k.Db = function(a) {
    return this.tileGrid ? this.tileGrid : le(a);
  };
  k.Cd = function(a) {
    var b = this.f;
    return b && !Mc(b, a) ? null : this.a;
  };
  k.jb = function() {
    return this.xa;
  };
  k.Dd = function(a, b, c) {
    c = this.Db(c);
    b = this.jb(b);
    a = Zd(c.Za(a), this.l);
    return 1 == b ? a : Yd(a, b, this.l);
  };
  function kx(a, b, c) {
    var d = void 0 !== c ? c : a.f;
    c = a.Db(d);
    if (a.D && d.g) {
      var e = b;
      b = e[0];
      a = ke(c, e);
      d = me(d);
      Mb(d, a)
        ? (b = e)
        : ((e = dc(d)),
          (a[0] += e * Math.ceil((d[0] - a[0]) / e)),
          (b = c.wf(a, b)));
    }
    e = b[0];
    d = b[1];
    a = b[2];
    if (c.minZoom > e || e > c.maxZoom) c = !1;
    else {
      var f = c.G();
      c = (c = f ? fe(c, f, e) : c.a ? c.a[e] : null) ? Ud(c, d, a) : !0;
    }
    return c ? b : null;
  }
  k.wa = function() {
    this.a.clear();
    this.s();
  };
  k.ig = ea;
  function lx(a, b) {
    Ia.call(this, a);
    this.tile = b;
  }
  v(lx, Ia);
  function mx(a) {
    ix.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      extent: a.extent,
      logo: a.logo,
      opaque: a.opaque,
      projection: a.projection,
      state: a.state,
      tileGrid: a.tileGrid,
      tilePixelRatio: a.tilePixelRatio,
      wrapX: a.wrapX
    });
    this.tileLoadFunction = a.tileLoadFunction;
    this.tileUrlFunction = this.zc ? this.zc.bind(this) : ex;
    this.urls = null;
    a.urls ? this.Ya(a.urls) : a.url && this.cb(a.url);
    a.tileUrlFunction && this.Xa(a.tileUrlFunction);
  }
  v(mx, ix);
  k = mx.prototype;
  k.ib = function() {
    return this.tileLoadFunction;
  };
  k.kb = function() {
    return this.tileUrlFunction;
  };
  k.lb = function() {
    return this.urls;
  };
  k.Jh = function(a) {
    a = a.target;
    switch (a.W()) {
      case 1:
        this.b(new lx("tileloadstart", a));
        break;
      case cg:
        this.b(new lx("tileloadend", a));
        break;
      case 3:
        this.b(new lx("tileloaderror", a));
    }
  };
  k.sb = function(a) {
    this.a.clear();
    this.tileLoadFunction = a;
    this.s();
  };
  k.Xa = function(a, b) {
    this.tileUrlFunction = a;
    "undefined" !== typeof b ? jx(this, b) : this.s();
  };
  k.cb = function(a) {
    var b = (this.urls = fx(a));
    this.Xa(this.zc ? this.zc.bind(this) : cx(b, this.tileGrid), a);
  };
  k.Ya = function(a) {
    this.urls = a;
    var b = a.join("\n");
    this.Xa(this.zc ? this.zc.bind(this) : cx(a, this.tileGrid), b);
  };
  k.ig = function(a, b, c) {
    a = this.Lb(a, b, c);
    this.a.b.hasOwnProperty(a) && this.a.get(a);
  };
  function X(a) {
    mx.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      extent: a.extent,
      logo: a.logo,
      opaque: a.opaque,
      projection: a.projection,
      state: a.state,
      tileGrid: a.tileGrid,
      tileLoadFunction: a.tileLoadFunction ? a.tileLoadFunction : nx,
      tilePixelRatio: a.tilePixelRatio,
      tileUrlFunction: a.tileUrlFunction,
      url: a.url,
      urls: a.urls,
      wrapX: a.wrapX
    });
    this.crossOrigin = void 0 !== a.crossOrigin ? a.crossOrigin : null;
    this.tileClass = void 0 !== a.tileClass ? a.tileClass : lv;
    this.i = {};
    this.v = {};
    this.na = a.reprojectionErrorThreshold;
    this.C = !1;
  }
  v(X, mx);
  k = X.prototype;
  k.Ih = function() {
    if (hx(this.a)) return !0;
    for (var a in this.i) if (hx(this.i[a])) return !0;
    return !1;
  };
  k.Wc = function(a, b) {
    var c = this.Cd(a);
    this.a.Wc(this.a == c ? b : {});
    for (var d in this.i) {
      var e = this.i[d];
      e.Wc(e == c ? b : {});
    }
  };
  k.qf = function(a) {
    return this.f && a && !Mc(this.f, a) ? 0 : this.rf();
  };
  k.rf = function() {
    return 0;
  };
  k.tf = function(a) {
    return this.f && a && !Mc(this.f, a) ? !1 : mx.prototype.tf.call(this, a);
  };
  k.Db = function(a) {
    var b = this.f;
    return !this.tileGrid || (b && !Mc(b, a))
      ? ((b = x(a).toString()), b in this.v || (this.v[b] = le(a)), this.v[b])
      : this.tileGrid;
  };
  k.Cd = function(a) {
    var b = this.f;
    if (!b || Mc(b, a)) return this.a;
    a = x(a).toString();
    a in this.i || (this.i[a] = new gx());
    return this.i[a];
  };
  function ox(a, b, c, d, e, f, g) {
    b = [b, c, d];
    e = (c = kx(a, b, f)) ? a.tileUrlFunction(c, e, f) : void 0;
    e = new a.tileClass(
      b,
      void 0 !== e ? 0 : 4,
      void 0 !== e ? e : "",
      a.crossOrigin,
      a.tileLoadFunction
    );
    e.key = g;
    B(e, "change", a.Jh, a);
    return e;
  }
  k.Dc = function(a, b, c, d, e) {
    if (this.f && e && !Mc(this.f, e)) {
      var f = this.Cd(e);
      c = [a, b, c];
      var g;
      a = this.Lb.apply(this, c);
      f.b.hasOwnProperty(a) && (g = f.get(a));
      b = this.jc;
      if (g && g.key == b) return g;
      var h = this.f,
        l = this.Db(h),
        m = this.Db(e),
        p = kx(this, c, e);
      d = new ax(
        h,
        l,
        e,
        m,
        c,
        p,
        this.jb(d),
        this.rf(),
        function(a, b, c, d) {
          return px(this, a, b, c, d, h);
        }.bind(this),
        this.na,
        this.C
      );
      d.key = b;
      g ? ((d.a = g), f.replace(a, d)) : f.set(a, d);
      return d;
    }
    return px(this, a, b, c, d, e);
  };
  function px(a, b, c, d, e, f) {
    var g,
      h = a.Lb(b, c, d),
      l = a.jc;
    if (a.a.b.hasOwnProperty(h)) {
      if (((g = a.a.get(h)), g.key != l)) {
        var m = g;
        g = ox(a, b, c, d, e, f, l);
        0 == m.W() ? (g.a = m.a) : (g.a = m);
        if (g.a) {
          b = g.a;
          c = g;
          do {
            if (b.W() == cg) {
              b.a = null;
              break;
            } else 1 == b.W() ? (c = b) : 0 == b.W() ? (c.a = b.a) : (c = b);
            b = c.a;
          } while (b);
        }
        a.a.replace(h, g);
      }
    } else (g = ox(a, b, c, d, e, f, l)), a.a.set(h, g);
    return g;
  }
  k.Hb = function(a) {
    if (this.C != a) {
      this.C = a;
      for (var b in this.i) this.i[b].clear();
      this.s();
    }
  };
  k.Ib = function(a, b) {
    var c = zc(a);
    c && ((c = x(c).toString()), c in this.v || (this.v[c] = b));
  };
  function nx(a, b) {
    a.ub().src = b;
  }
  function qx(a) {
    this.A = void 0 !== a.hidpi ? a.hidpi : !1;
    X.call(this, {
      cacheSize: a.cacheSize,
      crossOrigin: "anonymous",
      opaque: !0,
      projection: zc("EPSG:3857"),
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      state: "loading",
      tileLoadFunction: a.tileLoadFunction,
      tilePixelRatio: this.A ? 2 : 1,
      wrapX: void 0 !== a.wrapX ? a.wrapX : !0
    });
    this.P = void 0 !== a.culture ? a.culture : "en-us";
    this.u = void 0 !== a.maxZoom ? a.maxZoom : -1;
    this.c = a.key;
    this.o = a.imagerySet;
    $w(
      "https://dev.virtualearth.net/REST/v1/Imagery/Metadata/" +
        this.o +
        "?uriScheme=https&include=ImageryProviders&key=" +
        this.c,
      this.fa.bind(this),
      void 0,
      "jsonp"
    );
  }
  v(qx, X);
  var rx = new pe({
    html:
      '<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'
  });
  qx.prototype.U = function() {
    return this.c;
  };
  qx.prototype.Z = function() {
    return this.o;
  };
  qx.prototype.fa = function(a) {
    if (
      200 != a.statusCode ||
      "OK" != a.statusDescription ||
      "ValidCredentials" != a.authenticationResultCode ||
      1 != a.resourceSets.length ||
      1 != a.resourceSets[0].resources.length
    )
      jm(this, "error");
    else {
      var b = a.brandLogoUri;
      -1 == b.indexOf("https") && (b = b.replace("http", "https"));
      var c = a.resourceSets[0].resources[0],
        d = -1 == this.u ? c.zoomMax : this.u;
      a = me(this.f);
      var e = oe({
        extent: a,
        minZoom: c.zoomMin,
        maxZoom: d,
        tileSize:
          (c.imageWidth == c.imageHeight
            ? c.imageWidth
            : [c.imageWidth, c.imageHeight]) / this.jb()
      });
      this.tileGrid = e;
      var f = this.P,
        g = this.A;
      this.tileUrlFunction = dx(
        c.imageUrlSubdomains.map(function(a) {
          var b = [0, 0, 0],
            d = c.imageUrl.replace("{subdomain}", a).replace("{culture}", f);
          return function(a) {
            if (a)
              return (
                $d(a[0], a[1], -a[2] - 1, b),
                (a = d),
                g && (a += "&dpi=d1&device=mobile"),
                a.replace("{quadkey}", ae(b))
              );
          };
        })
      );
      if (c.imageryProviders) {
        var h = yc(zc("EPSG:4326"), this.f);
        a = c.imageryProviders.map(function(a) {
          var b = a.attribution,
            c = {};
          a.coverageAreas.forEach(function(a) {
            var b = a.zoomMin,
              f = Math.min(a.zoomMax, d);
            a = a.bbox;
            a = lc([a[1], a[0], a[3], a[2]], h);
            var g, l;
            for (g = b; g <= f; ++g)
              (l = g.toString()),
                (b = fe(e, a, g)),
                l in c ? c[l].push(b) : (c[l] = [b]);
          });
          return new pe({ html: b, tileRanges: c });
        });
        a.push(rx);
        this.ua(a);
      }
      this.L = b;
      jm(this, "ready");
    }
  };
  function sx(a) {
    a = a || {};
    var b = void 0 !== a.projection ? a.projection : "EPSG:3857",
      c =
        void 0 !== a.tileGrid
          ? a.tileGrid
          : oe({
              extent: me(b),
              maxZoom: a.maxZoom,
              minZoom: a.minZoom,
              tileSize: a.tileSize
            });
    X.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      crossOrigin: a.crossOrigin,
      logo: a.logo,
      opaque: a.opaque,
      projection: b,
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      tileGrid: c,
      tileLoadFunction: a.tileLoadFunction,
      tilePixelRatio: a.tilePixelRatio,
      tileUrlFunction: a.tileUrlFunction,
      url: a.url,
      urls: a.urls,
      wrapX: void 0 !== a.wrapX ? a.wrapX : !0
    });
  }
  v(sx, X);
  function tx(a) {
    this.u = a.account;
    this.A = a.map || "";
    this.c = a.config || {};
    this.o = {};
    sx.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      crossOrigin: a.crossOrigin,
      logo: a.logo,
      maxZoom: void 0 !== a.maxZoom ? a.maxZoom : 18,
      minZoom: a.minZoom,
      projection: a.projection,
      state: "loading",
      wrapX: a.wrapX
    });
    ux(this);
  }
  v(tx, sx);
  k = tx.prototype;
  k.$j = function() {
    return this.c;
  };
  k.wp = function(a) {
    ta(this.c, a);
    ux(this);
  };
  k.fp = function(a) {
    this.c = a || {};
    ux(this);
  };
  function ux(a) {
    var b = JSON.stringify(a.c);
    if (a.o[b]) vx(a, a.o[b]);
    else {
      var c = "https://" + a.u + ".cartodb.com/api/v1/map";
      a.A && (c += "/named/" + a.A);
      var d = new XMLHttpRequest();
      d.addEventListener("load", a.Sk.bind(a, b));
      d.addEventListener("error", a.Rk.bind(a));
      d.open("POST", c);
      d.setRequestHeader("Content-type", "application/json");
      d.send(JSON.stringify(a.c));
    }
  }
  k.Sk = function(a, b) {
    var c = b.target;
    if (!c.status || (200 <= c.status && 300 > c.status)) {
      var d;
      try {
        d = JSON.parse(c.responseText);
      } catch (e) {
        jm(this, "error");
        return;
      }
      vx(this, d);
      this.o[a] = d;
      jm(this, "ready");
    } else jm(this, "error");
  };
  k.Rk = function() {
    jm(this, "error");
  };
  function vx(a, b) {
    a.cb(
      "https://" +
        b.cdn_url.https +
        "/" +
        a.u +
        "/api/v1/map/" +
        b.layergroupid +
        "/{z}/{x}/{y}.png"
    );
  }
  function Y(a) {
    U.call(this, {
      attributions: a.attributions,
      extent: a.extent,
      logo: a.logo,
      projection: a.projection,
      wrapX: a.wrapX
    });
    this.C = void 0;
    this.fa = void 0 !== a.distance ? a.distance : 20;
    this.A = [];
    this.na =
      a.geometryFunction ||
      function(a) {
        a = a.V();
        ha(a instanceof C, 10);
        return a;
      };
    this.u = a.source;
    this.u.J("change", Y.prototype.Ja, this);
  }
  v(Y, U);
  Y.prototype.Ua = function() {
    return this.u;
  };
  Y.prototype.Ed = function(a, b, c) {
    this.u.Ed(a, b, c);
    b !== this.C && (this.clear(), (this.C = b), wx(this), this.Tc(this.A));
  };
  Y.prototype.Ob = function(a) {
    this.fa = a;
    this.Ja();
  };
  Y.prototype.Ja = function() {
    this.clear();
    wx(this);
    this.Tc(this.A);
    this.s();
  };
  function wx(a) {
    if (void 0 !== a.C) {
      a.A.length = 0;
      for (
        var b = Hb(), c = a.fa * a.C, d = a.u.we(), e = {}, f = 0, g = d.length;
        f < g;
        f++
      ) {
        var h = d[f];
        x(h).toString() in e ||
          !(h = a.na(h)) ||
          ((h = h.$()),
          Sb(h, b),
          Jb(b, c, b),
          (h = a.u.nf(b)),
          (h = h.filter(function(a) {
            a = x(a).toString();
            return a in e ? !1 : (e[a] = !0);
          })),
          a.A.push(xx(a, h)));
      }
    }
  }
  function xx(a, b) {
    for (var c = [0, 0], d = b.length - 1; 0 <= d; --d) {
      var e = a.na(b[d]);
      e ? rb(c, e.$()) : b.splice(d, 1);
    }
    xb(c, 1 / b.length);
    c = new J(new C(c));
    c.set("features", b);
    return c;
  }
  function yx(a, b) {
    var c = [];
    Object.keys(b).forEach(function(a) {
      null !== b[a] &&
        void 0 !== b[a] &&
        c.push(a + "=" + encodeURIComponent(b[a]));
    });
    var d = c.join("&");
    a = a.replace(/[?&]$/, "");
    a = -1 === a.indexOf("?") ? a + "?" : a + "&";
    return a + d;
  }
  function zx(a) {
    a = a || {};
    km.call(this, {
      attributions: a.attributions,
      logo: a.logo,
      projection: a.projection,
      resolutions: a.resolutions
    });
    this.Z = void 0 !== a.crossOrigin ? a.crossOrigin : null;
    this.i = a.url;
    this.l = void 0 !== a.imageLoadFunction ? a.imageLoadFunction : qm;
    this.u = a.params || {};
    this.c = null;
    this.v = [0, 0];
    this.P = 0;
    this.C = void 0 !== a.ratio ? a.ratio : 1.5;
  }
  v(zx, km);
  k = zx.prototype;
  k.Xm = function() {
    return this.u;
  };
  k.Xc = function(a, b, c, d) {
    if (void 0 === this.i) return null;
    b = lm(this, b);
    var e = this.c;
    if (e && this.P == this.g && e.resolution == b && e.f == c && Ob(e.G(), a))
      return e;
    e = { F: "image", FORMAT: "PNG32", TRANSPARENT: !0 };
    ta(e, this.u);
    a = a.slice();
    var f = (a[0] + a[2]) / 2,
      g = (a[1] + a[3]) / 2;
    if (1 != this.C) {
      var h = (this.C * dc(a)) / 2,
        l = (this.C * ec(a)) / 2;
      a[0] = f - h;
      a[1] = g - l;
      a[2] = f + h;
      a[3] = g + l;
    }
    var h = b / c,
      l = Math.ceil(dc(a) / h),
      m = Math.ceil(ec(a) / h);
    a[0] = f - (h * l) / 2;
    a[2] = f + (h * l) / 2;
    a[1] = g - (h * m) / 2;
    a[3] = g + (h * m) / 2;
    this.v[0] = l;
    this.v[1] = m;
    f = a;
    g = this.v;
    d = d.hb.split(":").pop();
    e.SIZE = g[0] + "," + g[1];
    e.BBOX = f.join(",");
    e.BBOXSR = d;
    e.IMAGESR = d;
    e.DPI = 90 * c;
    d = this.i;
    f = d
      .replace(/MapServer\/?$/, "MapServer/export")
      .replace(/ImageServer\/?$/, "ImageServer/exportImage");
    f == d && ha(!1, 50);
    e = yx(f, e);
    this.c = new ii(a, b, c, this.j, e, this.Z, this.l);
    this.P = this.g;
    B(this.c, "change", this.o, this);
    return this.c;
  };
  k.Wm = function() {
    return this.l;
  };
  k.Ym = function() {
    return this.i;
  };
  k.Zm = function(a) {
    this.c = null;
    this.l = a;
    this.s();
  };
  k.$m = function(a) {
    a != this.i && ((this.i = a), (this.c = null), this.s());
  };
  k.an = function(a) {
    ta(this.u, a);
    this.c = null;
    this.s();
  };
  function Ax(a) {
    km.call(this, { projection: a.projection, resolutions: a.resolutions });
    this.Z = void 0 !== a.crossOrigin ? a.crossOrigin : null;
    this.v = void 0 !== a.displayDpi ? a.displayDpi : 96;
    this.l = a.params || {};
    this.P = a.url;
    this.c = void 0 !== a.imageLoadFunction ? a.imageLoadFunction : qm;
    this.fa = void 0 !== a.hidpi ? a.hidpi : !0;
    this.na = void 0 !== a.metersPerUnit ? a.metersPerUnit : 1;
    this.u = void 0 !== a.ratio ? a.ratio : 1;
    this.xa = void 0 !== a.useOverlay ? a.useOverlay : !1;
    this.i = null;
    this.C = 0;
  }
  v(Ax, km);
  k = Ax.prototype;
  k.cn = function() {
    return this.l;
  };
  k.Xc = function(a, b, c) {
    b = lm(this, b);
    c = this.fa ? c : 1;
    var d = this.i;
    if (d && this.C == this.g && d.resolution == b && d.f == c && Ob(d.G(), a))
      return d;
    1 != this.u && ((a = a.slice()), kc(a, this.u));
    var e = [(dc(a) / b) * c, (ec(a) / b) * c];
    if (void 0 !== this.P) {
      var d = this.P,
        f = gc(a),
        g = this.na,
        h = dc(a),
        l = ec(a),
        m = e[0],
        p = e[1],
        n = 0.0254 / this.v,
        e = {
          OPERATION: this.xa ? "GETDYNAMICMAPOVERLAYIMAGE" : "GETMAPIMAGE",
          VERSION: "2.0.0",
          LOCALE: "en",
          CLIENTAGENT: "ol.source.ImageMapGuide source",
          CLIP: "1",
          SETDISPLAYDPI: this.v,
          SETDISPLAYWIDTH: Math.round(e[0]),
          SETDISPLAYHEIGHT: Math.round(e[1]),
          SETVIEWSCALE: p * h > m * l ? (h * g) / (m * n) : (l * g) / (p * n),
          SETVIEWCENTERX: f[0],
          SETVIEWCENTERY: f[1]
        };
      ta(e, this.l);
      d = yx(d, e);
      d = new ii(a, b, c, this.j, d, this.Z, this.c);
      B(d, "change", this.o, this);
    } else d = null;
    this.i = d;
    this.C = this.g;
    return d;
  };
  k.bn = function() {
    return this.c;
  };
  k.en = function(a) {
    ta(this.l, a);
    this.s();
  };
  k.dn = function(a) {
    this.i = null;
    this.c = a;
    this.s();
  };
  function Bx(a) {
    var b = a.imageExtent,
      c = void 0 !== a.crossOrigin ? a.crossOrigin : null,
      d = void 0 !== a.imageLoadFunction ? a.imageLoadFunction : qm;
    km.call(this, {
      attributions: a.attributions,
      logo: a.logo,
      projection: zc(a.projection)
    });
    this.c = new ii(b, void 0, 1, this.j, a.url, c, d);
    this.i = a.imageSize ? a.imageSize : null;
    B(this.c, "change", this.o, this);
  }
  v(Bx, km);
  Bx.prototype.Xc = function(a) {
    return jc(a, this.c.G()) ? this.c : null;
  };
  Bx.prototype.o = function(a) {
    if (this.c.W() == li) {
      var b = this.c.G(),
        c = this.c.a(),
        d,
        e;
      this.i
        ? ((d = this.i[0]), (e = this.i[1]))
        : ((d = c.width), (e = c.height));
      b = Math.ceil(dc(b) / (ec(b) / e));
      if (b != d) {
        var b = De(b, e),
          f = b.canvas;
        b.drawImage(c, 0, 0, d, e, 0, 0, f.width, f.height);
        this.c.g = f;
      }
    }
    km.prototype.o.call(this, a);
  };
  function Cx(a) {
    a = a || {};
    km.call(this, {
      attributions: a.attributions,
      logo: a.logo,
      projection: a.projection,
      resolutions: a.resolutions
    });
    this.na = void 0 !== a.crossOrigin ? a.crossOrigin : null;
    this.l = a.url;
    this.C = void 0 !== a.imageLoadFunction ? a.imageLoadFunction : qm;
    this.i = a.params || {};
    this.u = !0;
    Dx(this);
    this.fa = a.serverType;
    this.xa = void 0 !== a.hidpi ? a.hidpi : !0;
    this.c = null;
    this.P = [0, 0];
    this.Z = 0;
    this.v = void 0 !== a.ratio ? a.ratio : 1.5;
  }
  v(Cx, km);
  var Ex = [101, 101];
  k = Cx.prototype;
  k.ln = function(a, b, c, d) {
    if (void 0 !== this.l) {
      var e = hc(a, b, 0, Ex),
        f = {
          SERVICE: "WMS",
          VERSION: "1.3.0",
          REQUEST: "GetFeatureInfo",
          FORMAT: "image/png",
          TRANSPARENT: !0,
          QUERY_LAYERS: this.i.LAYERS
        };
      ta(f, this.i, d);
      d = Math.floor((e[3] - a[1]) / b);
      f[this.u ? "I" : "X"] = Math.floor((a[0] - e[0]) / b);
      f[this.u ? "J" : "Y"] = d;
      return Fx(this, e, Ex, 1, zc(c), f);
    }
  };
  k.nn = function() {
    return this.i;
  };
  k.Xc = function(a, b, c, d) {
    if (void 0 === this.l) return null;
    b = lm(this, b);
    1 == c || (this.xa && void 0 !== this.fa) || (c = 1);
    a = a.slice();
    var e = (a[0] + a[2]) / 2,
      f = (a[1] + a[3]) / 2,
      g = b / c,
      h = dc(a) / g,
      g = ec(a) / g,
      l = this.c;
    if (l && this.Z == this.g && l.resolution == b && l.f == c && Ob(l.G(), a))
      return l;
    if (1 != this.v) {
      var l = (this.v * dc(a)) / 2,
        m = (this.v * ec(a)) / 2;
      a[0] = e - l;
      a[1] = f - m;
      a[2] = e + l;
      a[3] = f + m;
    }
    e = {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: !0
    };
    ta(e, this.i);
    this.P[0] = Math.ceil(h * this.v);
    this.P[1] = Math.ceil(g * this.v);
    d = Fx(this, a, this.P, c, d, e);
    this.c = new ii(a, b, c, this.j, d, this.na, this.C);
    this.Z = this.g;
    B(this.c, "change", this.o, this);
    return this.c;
  };
  k.mn = function() {
    return this.C;
  };
  function Fx(a, b, c, d, e, f) {
    ha(void 0 !== a.l, 9);
    f[a.u ? "CRS" : "SRS"] = e.hb;
    "STYLES" in a.i || (f.STYLES = "");
    if (1 != d)
      switch (a.fa) {
        case "geoserver":
          d = (90 * d + 0.5) | 0;
          f.FORMAT_OPTIONS =
            "FORMAT_OPTIONS" in f
              ? f.FORMAT_OPTIONS + (";dpi:" + d)
              : "dpi:" + d;
          break;
        case "mapserver":
          f.MAP_RESOLUTION = 90 * d;
          break;
        case "carmentaserver":
        case "qgis":
          f.DPI = 90 * d;
          break;
        default:
          ha(!1, 8);
      }
    f.WIDTH = c[0];
    f.HEIGHT = c[1];
    c = e.b;
    var g;
    a.u && "ne" == c.substr(0, 2) ? (g = [b[1], b[0], b[3], b[2]]) : (g = b);
    f.BBOX = g.join(",");
    return yx(a.l, f);
  }
  k.pn = function() {
    return this.l;
  };
  k.qn = function(a) {
    this.c = null;
    this.C = a;
    this.s();
  };
  k.rn = function(a) {
    a != this.l && ((this.l = a), (this.c = null), this.s());
  };
  k.sn = function(a) {
    ta(this.i, a);
    Dx(this);
    this.c = null;
    this.s();
  };
  function Dx(a) {
    a.u = 0 <= qb(a.i.VERSION || "1.3.0");
  }
  function Gx(a) {
    a = a || {};
    var b;
    void 0 !== a.attributions ? (b = a.attributions) : (b = [Hx]);
    sx.call(this, {
      attributions: b,
      cacheSize: a.cacheSize,
      crossOrigin: void 0 !== a.crossOrigin ? a.crossOrigin : "anonymous",
      opaque: void 0 !== a.opaque ? a.opaque : !0,
      maxZoom: void 0 !== a.maxZoom ? a.maxZoom : 19,
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      tileLoadFunction: a.tileLoadFunction,
      url:
        void 0 !== a.url
          ? a.url
          : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      wrapX: a.wrapX
    });
  }
  v(Gx, sx);
  var Hx = new pe({
    html:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'
  });
  (function() {
    var a = {},
      b = { ma: a };
    (function(c) {
      if ("object" === typeof a && "undefined" !== typeof b) b.ma = c();
      else {
        var d;
        "undefined" !== typeof window
          ? (d = window)
          : "undefined" !== typeof global
          ? (d = global)
          : "undefined" !== typeof self
          ? (d = self)
          : (d = this);
        d.Sp = c();
      }
    })(function() {
      return (function d(a, b, g) {
        function h(m, n) {
          if (!b[m]) {
            if (!a[m]) {
              var q = "function" == typeof require && require;
              if (!n && q) return q(m, !0);
              if (l) return l(m, !0);
              q = Error("Cannot find module '" + m + "'");
              throw ((q.code = "MODULE_NOT_FOUND"), q);
            }
            q = b[m] = { ma: {} };
            a[m][0].call(
              q.ma,
              function(b) {
                var d = a[m][1][b];
                return h(d ? d : b);
              },
              q,
              q.ma,
              d,
              a,
              b,
              g
            );
          }
          return b[m].ma;
        }
        for (
          var l = "function" == typeof require && require, m = 0;
          m < g.length;
          m++
        )
          h(g[m]);
        return h;
      })(
        {
          1: [
            function(a, b, f) {
              a = a("./processor");
              f.ij = a;
            },
            { "./processor": 2 }
          ],
          2: [
            function(a, b) {
              function f(a) {
                var b = !0;
                try {
                  new ImageData(10, 10);
                } catch (d) {
                  b = !1;
                }
                return function(d) {
                  var e = d.buffers,
                    f = d.meta,
                    g = d.width,
                    h = d.height,
                    l = e.length,
                    m = e[0].byteLength;
                  if (d.imageOps) {
                    m = Array(l);
                    for (d = 0; d < l; ++d) {
                      var O = m,
                        Ja = d,
                        ca;
                      ca = new Uint8ClampedArray(e[d]);
                      var Ma = g,
                        D = h;
                      ca = b
                        ? new ImageData(ca, Ma, D)
                        : { data: ca, width: Ma, height: D };
                      O[Ja] = ca;
                    }
                    g = a(m, f).data;
                  } else {
                    g = new Uint8ClampedArray(m);
                    h = Array(l);
                    O = Array(l);
                    for (d = 0; d < l; ++d)
                      (h[d] = new Uint8ClampedArray(e[d])),
                        (O[d] = [0, 0, 0, 0]);
                    for (e = 0; e < m; e += 4) {
                      for (d = 0; d < l; ++d)
                        (Ja = h[d]),
                          (O[d][0] = Ja[e]),
                          (O[d][1] = Ja[e + 1]),
                          (O[d][2] = Ja[e + 2]),
                          (O[d][3] = Ja[e + 3]);
                      d = a(O, f);
                      g[e] = d[0];
                      g[e + 1] = d[1];
                      g[e + 2] = d[2];
                      g[e + 3] = d[3];
                    }
                  }
                  return g.buffer;
                };
              }
              function g(a, b) {
                var d = Object.keys(a.lib || {})
                    .map(function(b) {
                      return "var " + b + " = " + a.lib[b].toString() + ";";
                    })
                    .concat([
                      "var __minion__ = (" + f.toString() + ")(",
                      a.operation.toString(),
                      ");",
                      'self.addEventListener("message", function(event) {',
                      "  var buffer = __minion__(event.data);",
                      "  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);",
                      "});"
                    ]),
                  d = URL.createObjectURL(
                    new Blob(d, { type: "text/javascript" })
                  ),
                  d = new Worker(d);
                d.addEventListener("message", b);
                return d;
              }
              function h(a, b) {
                var d = f(a.operation);
                return {
                  postMessage: function(a) {
                    setTimeout(function() {
                      b({ data: { buffer: d(a), meta: a.meta } });
                    }, 0);
                  }
                };
              }
              function l(a) {
                this.Ze = !!a.nl;
                var b;
                0 === a.threads
                  ? (b = 0)
                  : this.Ze
                  ? (b = 1)
                  : (b = a.threads || 1);
                var d = [];
                if (b)
                  for (var e = 0; e < b; ++e)
                    d[e] = g(a, this.sg.bind(this, e));
                else d[0] = h(a, this.sg.bind(this, 0));
                this.Wd = d;
                this.qd = [];
                this.wj = a.yo || Infinity;
                this.Ud = 0;
                this.Sc = {};
                this.$e = null;
              }
              var m = a("./util").Hl;
              l.prototype.wo = function(a, b, d) {
                this.uj({ Fc: a, hh: b, Vc: d });
                this.pg();
              };
              l.prototype.uj = function(a) {
                for (this.qd.push(a); this.qd.length > this.wj; )
                  this.qd.shift().Vc(null, null);
              };
              l.prototype.pg = function() {
                if (0 === this.Ud && 0 < this.qd.length) {
                  var a = (this.$e = this.qd.shift()),
                    b = a.Fc[0].width,
                    d = a.Fc[0].height,
                    e = a.Fc.map(function(a) {
                      return a.data.buffer;
                    }),
                    f = this.Wd.length;
                  this.Ud = f;
                  if (1 === f)
                    this.Wd[0].postMessage(
                      {
                        buffers: e,
                        meta: a.hh,
                        imageOps: this.Ze,
                        width: b,
                        height: d
                      },
                      e
                    );
                  else
                    for (
                      var g = 4 * Math.ceil(a.Fc[0].data.length / 4 / f), h = 0;
                      h < f;
                      ++h
                    ) {
                      for (
                        var l = h * g, m = [], O = 0, Ja = e.length;
                        O < Ja;
                        ++O
                      )
                        m.push(e[h].slice(l, l + g));
                      this.Wd[h].postMessage(
                        {
                          buffers: m,
                          meta: a.hh,
                          imageOps: this.Ze,
                          width: b,
                          height: d
                        },
                        m
                      );
                    }
                }
              };
              l.prototype.sg = function(a, b) {
                this.Qp ||
                  ((this.Sc[a] = b.data),
                  --this.Ud,
                  0 === this.Ud && this.xj());
              };
              l.prototype.xj = function() {
                var a = this.$e,
                  b = this.Wd.length,
                  d,
                  e;
                if (1 === b)
                  (d = new Uint8ClampedArray(this.Sc[0].buffer)),
                    (e = this.Sc[0].meta);
                else {
                  var f = a.Fc[0].data.length;
                  d = new Uint8ClampedArray(f);
                  e = Array(f);
                  for (var f = 4 * Math.ceil(f / 4 / b), g = 0; g < b; ++g) {
                    var h = g * f;
                    d.set(new Uint8ClampedArray(this.Sc[g].buffer), h);
                    e[g] = this.Sc[g].meta;
                  }
                }
                this.$e = null;
                this.Sc = {};
                a.Vc(null, m(d, a.Fc[0].width, a.Fc[0].height), e);
                this.pg();
              };
              b.ma = l;
            },
            { "./util": 3 }
          ],
          3: [
            function(a, b, f) {
              var g = !0;
              try {
                new ImageData(10, 10);
              } catch (l) {
                g = !1;
              }
              var h = document.createElement("canvas").getContext("2d");
              f.Hl = function(a, b, d) {
                if (g) return new ImageData(a, b, d);
                b = h.createImageData(b, d);
                b.data.set(a);
                return b;
              };
            },
            {}
          ]
        },
        {},
        [1]
      )(1);
    });
    il = b.ma;
  })();
  function Ix(a) {
    this.C = null;
    this.xa = void 0 !== a.operationType ? a.operationType : Jx;
    this.Ja = void 0 !== a.threads ? a.threads : 1;
    this.c = Kx(a.sources);
    for (var b = 0, c = this.c.length; b < c; ++b)
      B(this.c[b], "change", this.s, this);
    this.i = De();
    this.fa = new ig(function() {
      return 1;
    }, this.s.bind(this));
    for (var b = Lx(this.c), c = {}, d = 0, e = b.length; d < e; ++d)
      c[x(b[d].layer)] = b[d];
    this.l = this.v = null;
    this.Z = {
      animate: !1,
      attributions: {},
      coordinateToPixelTransform: Ph(),
      extent: null,
      focus: null,
      index: 0,
      layerStates: c,
      layerStatesArray: b,
      logos: {},
      pixelRatio: 1,
      pixelToCoordinateTransform: Ph(),
      postRenderFunctions: [],
      size: [0, 0],
      skippedFeatureUids: {},
      tileQueue: this.fa,
      time: Date.now(),
      usedTiles: {},
      viewState: { rotation: 0 },
      viewHints: [],
      wantedTiles: {}
    };
    km.call(this, {});
    void 0 !== a.operation && this.u(a.operation, a.lib);
  }
  v(Ix, km);
  Ix.prototype.u = function(a, b) {
    this.C = new il.ij({
      operation: a,
      nl: this.xa === Mx,
      yo: 1,
      lib: b,
      threads: this.Ja
    });
    this.s();
  };
  function Nx(a, b, c) {
    var d = a.v;
    return !d || a.g !== d.bp || c !== d.resolution || !Vb(b, d.extent);
  }
  Ix.prototype.U = function(a, b, c, d) {
    c = !0;
    for (var e, f = 0, g = this.c.length; f < g; ++f)
      if (((e = this.c[f].a.la()), "ready" !== e.W())) {
        c = !1;
        break;
      }
    if (!c) return null;
    a = a.slice();
    if (!Nx(this, a, b)) return this.l;
    c = this.i.canvas;
    e = Math.round(dc(a) / b);
    f = Math.round(ec(a) / b);
    if (e !== c.width || f !== c.height) (c.width = e), (c.height = f);
    e = ta({}, this.Z);
    e.viewState = ta({}, e.viewState);
    var f = gc(a),
      g = Math.round(dc(a) / b),
      h = Math.round(ec(a) / b);
    e.extent = a;
    e.focus = gc(a);
    e.size[0] = g;
    e.size[1] = h;
    g = e.viewState;
    g.center = f;
    g.projection = d;
    g.resolution = b;
    this.l = d = new Xl(a, b, 1, this.j, c, this.P.bind(this, e));
    this.v = { extent: a, resolution: b, bp: this.g };
    return d;
  };
  Ix.prototype.P = function(a, b) {
    for (var c = this.c.length, d = Array(c), e = 0; e < c; ++e) {
      var f;
      f = this.c[e];
      var g = a,
        h = a.layerStatesArray[e];
      if (f.o(g, h)) {
        var l = g.size[0],
          m = g.size[1];
        if (Ox) {
          var p = Ox.canvas;
          p.width !== l || p.height !== m
            ? (Ox = De(l, m))
            : Ox.clearRect(0, 0, l, m);
        } else Ox = De(l, m);
        f.D(g, h, Ox);
        f = Ox.getImageData(0, 0, l, m);
      } else f = null;
      if (f) d[e] = f;
      else {
        d = null;
        break;
      }
    }
    d &&
      ((c = {}),
      this.b(new Px(Qx, a, c)),
      this.C.wo(d, c, this.na.bind(this, a, b)));
    jg(a.tileQueue, 16, 16);
  };
  Ix.prototype.na = function(a, b, c, d, e) {
    c
      ? b(c)
      : d &&
        (this.b(new Px(Rx, a, e)),
        Nx(this, a.extent, a.viewState.resolution / a.pixelRatio) ||
          this.i.putImageData(d, 0, 0),
        b(null));
  };
  var Ox = null;
  function Lx(a) {
    return a.map(function(a) {
      return wh(a.a);
    });
  }
  function Kx(a) {
    for (var b = a.length, c = Array(b), d = 0; d < b; ++d) {
      var e = d,
        f = a[d],
        g = null;
      f instanceof ix
        ? ((f = new F({ source: f })), (g = new ij(f)))
        : f instanceof km && ((f = new ei({ source: f })), (g = new hj(f)));
      c[e] = g;
    }
    return c;
  }
  function Px(a, b, c) {
    Ia.call(this, a);
    this.extent = b.extent;
    this.resolution = b.viewState.resolution / b.pixelRatio;
    this.data = c;
  }
  v(Px, Ia);
  var Qx = "beforeoperations",
    Rx = "afteroperations",
    Jx = "pixel",
    Mx = "image";
  function Sx(a) {
    var b = a.layer.indexOf("-"),
      b = Tx[-1 == b ? a.layer : a.layer.slice(0, b)],
      c = Ux[a.layer];
    sx.call(this, {
      attributions: Vx,
      cacheSize: a.cacheSize,
      crossOrigin: "anonymous",
      maxZoom: void 0 != a.maxZoom ? a.maxZoom : b.maxZoom,
      minZoom: void 0 != a.minZoom ? a.minZoom : b.minZoom,
      opaque: c.opaque,
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      tileLoadFunction: a.tileLoadFunction,
      url:
        void 0 !== a.url
          ? a.url
          : "https://stamen-tiles-{a-d}.a.ssl.fastly.net/" +
            a.layer +
            "/{z}/{x}/{y}." +
            c.Bb
    });
  }
  v(Sx, sx);
  var Vx = [
      new pe({
        html:
          'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
      }),
      Hx
    ],
    Ux = {
      terrain: { Bb: "jpg", opaque: !0 },
      "terrain-background": { Bb: "jpg", opaque: !0 },
      "terrain-labels": { Bb: "png", opaque: !1 },
      "terrain-lines": { Bb: "png", opaque: !1 },
      "toner-background": { Bb: "png", opaque: !0 },
      toner: { Bb: "png", opaque: !0 },
      "toner-hybrid": { Bb: "png", opaque: !1 },
      "toner-labels": { Bb: "png", opaque: !1 },
      "toner-lines": { Bb: "png", opaque: !1 },
      "toner-lite": { Bb: "png", opaque: !0 },
      watercolor: { Bb: "jpg", opaque: !0 }
    },
    Tx = {
      terrain: { minZoom: 4, maxZoom: 18 },
      toner: { minZoom: 0, maxZoom: 20 },
      watercolor: { minZoom: 1, maxZoom: 16 }
    };
  function Wx(a) {
    a = a || {};
    X.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      crossOrigin: a.crossOrigin,
      logo: a.logo,
      projection: a.projection,
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      tileGrid: a.tileGrid,
      tileLoadFunction: a.tileLoadFunction,
      url: a.url,
      urls: a.urls,
      wrapX: void 0 !== a.wrapX ? a.wrapX : !0
    });
    this.c = a.params || {};
    this.o = Hb();
    jx(this, Xx(this));
  }
  v(Wx, X);
  function Xx(a) {
    var b = 0,
      c = [],
      d;
    for (d in a.c) c[b++] = d + "-" + a.c[d];
    return c.join("/");
  }
  Wx.prototype.u = function() {
    return this.c;
  };
  Wx.prototype.jb = function(a) {
    return a;
  };
  Wx.prototype.zc = function(a, b, c) {
    var d = this.tileGrid;
    d || (d = this.Db(c));
    if (!(d.b.length <= a[0])) {
      var e = d.Na(a, this.o),
        f = Zd(d.Za(a[0]), this.l);
      1 != b && (f = Yd(f, b, this.l));
      d = { F: "image", FORMAT: "PNG32", TRANSPARENT: !0 };
      ta(d, this.c);
      var g = this.urls;
      g
        ? ((c = c.hb.split(":").pop()),
          (d.SIZE = f[0] + "," + f[1]),
          (d.BBOX = e.join(",")),
          (d.BBOXSR = c),
          (d.IMAGESR = c),
          (d.DPI = Math.round(d.DPI ? d.DPI * b : 90 * b)),
          (a = (1 == g.length ? g[0] : g[oa((a[1] << a[0]) + a[2], g.length)])
            .replace(/MapServer\/?$/, "MapServer/export")
            .replace(/ImageServer\/?$/, "ImageServer/exportImage")),
          (a = yx(a, d)))
        : (a = void 0);
      return a;
    }
  };
  Wx.prototype.A = function(a) {
    ta(this.c, a);
    jx(this, Xx(this));
  };
  function Yx(a) {
    ix.call(this, {
      opaque: !1,
      projection: a.projection,
      tileGrid: a.tileGrid,
      wrapX: void 0 !== a.wrapX ? a.wrapX : !0
    });
  }
  v(Yx, ix);
  Yx.prototype.Dc = function(a, b, c) {
    var d = this.Lb(a, b, c);
    if (this.a.b.hasOwnProperty(d)) return this.a.get(d);
    var e = Zd(this.tileGrid.Za(a));
    a = [a, b, c];
    b = (b = kx(this, a)) ? kx(this, b).toString() : "";
    e = new Zx(a, e, b);
    this.a.set(d, e);
    return e;
  };
  function Zx(a, b, c) {
    ag.call(this, a, cg);
    this.i = b;
    this.f = c;
    this.g = null;
  }
  v(Zx, ag);
  Zx.prototype.ub = function() {
    if (this.g) return this.g;
    var a = this.i,
      b = De(a[0], a[1]);
    b.strokeStyle = "black";
    b.strokeRect(0.5, 0.5, a[0] + 0.5, a[1] + 0.5);
    b.fillStyle = "black";
    b.textAlign = "center";
    b.textBaseline = "middle";
    b.font = "24px sans-serif";
    b.fillText(this.f, a[0] / 2, a[1] / 2);
    return (this.g = b.canvas);
  };
  function $x(a) {
    this.c = null;
    X.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      crossOrigin: a.crossOrigin,
      projection: zc("EPSG:3857"),
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      state: "loading",
      tileLoadFunction: a.tileLoadFunction,
      wrapX: void 0 !== a.wrapX ? a.wrapX : !0
    });
    if (a.jsonp) $w(a.url, this.Gh.bind(this), this.ue.bind(this));
    else {
      var b = new XMLHttpRequest();
      b.addEventListener("load", this.vn.bind(this));
      b.addEventListener("error", this.tn.bind(this));
      b.open("GET", a.url);
      b.send();
    }
  }
  v($x, X);
  k = $x.prototype;
  k.vn = function(a) {
    a = a.target;
    if (!a.status || (200 <= a.status && 300 > a.status)) {
      var b;
      try {
        b = JSON.parse(a.responseText);
      } catch (c) {
        this.ue();
        return;
      }
      this.Gh(b);
    } else this.ue();
  };
  k.tn = function() {
    this.ue();
  };
  k.Fk = function() {
    return this.c;
  };
  k.Gh = function(a) {
    var b = zc("EPSG:4326"),
      c = this.f,
      d;
    if (void 0 !== a.bounds) {
      var e = yc(b, c);
      d = lc(a.bounds, e);
    }
    var f = a.minzoom || 0,
      e = a.maxzoom || 22;
    this.tileGrid = c = oe({ extent: me(c), maxZoom: e, minZoom: f });
    this.tileUrlFunction = cx(a.tiles, c);
    if (void 0 !== a.attribution && !this.j) {
      b = void 0 !== d ? d : b.G();
      d = {};
      for (var g; f <= e; ++f) (g = f.toString()), (d[g] = [fe(c, b, f)]);
      this.ua([new pe({ html: a.attribution, tileRanges: d })]);
    }
    this.c = a;
    jm(this, "ready");
  };
  k.ue = function() {
    jm(this, "error");
  };
  function ay(a) {
    ix.call(this, { projection: zc("EPSG:3857"), state: "loading" });
    this.v = void 0 !== a.preemptive ? a.preemptive : !0;
    this.o = ex;
    this.i = void 0;
    this.c = a.jsonp || !1;
    if (a.url)
      if (this.c) $w(a.url, this.Kf.bind(this), this.ve.bind(this));
      else {
        var b = new XMLHttpRequest();
        b.addEventListener("load", this.zn.bind(this));
        b.addEventListener("error", this.yn.bind(this));
        b.open("GET", a.url);
        b.send();
      }
    else a.tileJSON ? this.Kf(a.tileJSON) : ha(!1, 51);
  }
  v(ay, ix);
  k = ay.prototype;
  k.zn = function(a) {
    a = a.target;
    if (!a.status || (200 <= a.status && 300 > a.status)) {
      var b;
      try {
        b = JSON.parse(a.responseText);
      } catch (c) {
        this.ve();
        return;
      }
      this.Kf(b);
    } else this.ve();
  };
  k.yn = function() {
    this.ve();
  };
  k.Ck = function() {
    return this.i;
  };
  k.Pj = function(a, b, c, d, e) {
    this.tileGrid
      ? ((b = this.tileGrid.fe(a, b)),
        by(this.Dc(b[0], b[1], b[2], 1, this.f), a, c, d, e))
      : !0 === e
      ? setTimeout(function() {
          c.call(d, null);
        }, 0)
      : c.call(d, null);
  };
  k.ve = function() {
    jm(this, "error");
  };
  k.Kf = function(a) {
    var b = zc("EPSG:4326"),
      c = this.f,
      d;
    if (void 0 !== a.bounds) {
      var e = yc(b, c);
      d = lc(a.bounds, e);
    }
    var f = a.minzoom || 0,
      e = a.maxzoom || 22;
    this.tileGrid = c = oe({ extent: me(c), maxZoom: e, minZoom: f });
    this.i = a.template;
    var g = a.grids;
    if (g) {
      this.o = cx(g, c);
      if (void 0 !== a.attribution) {
        b = void 0 !== d ? d : b.G();
        for (d = {}; f <= e; ++f) (g = f.toString()), (d[g] = [fe(c, b, f)]);
        this.ua([new pe({ html: a.attribution, tileRanges: d })]);
      }
      jm(this, "ready");
    } else jm(this, "error");
  };
  k.Dc = function(a, b, c, d, e) {
    var f = this.Lb(a, b, c);
    if (this.a.b.hasOwnProperty(f)) return this.a.get(f);
    a = [a, b, c];
    b = kx(this, a, e);
    d = this.o(b, d, e);
    d = new cy(
      a,
      void 0 !== d ? 0 : 4,
      void 0 !== d ? d : "",
      this.tileGrid.Na(a),
      this.v,
      this.c
    );
    this.a.set(f, d);
    return d;
  };
  k.ig = function(a, b, c) {
    a = this.Lb(a, b, c);
    this.a.b.hasOwnProperty(a) && this.a.get(a);
  };
  function cy(a, b, c, d, e, f) {
    ag.call(this, a, b);
    this.o = c;
    this.g = d;
    this.H = e;
    this.f = this.l = this.i = null;
    this.v = f;
  }
  v(cy, ag);
  k = cy.prototype;
  k.ub = function() {
    return null;
  };
  k.getData = function(a) {
    if (!this.i || !this.l) return null;
    var b = this.i[
      Math.floor(
        (1 - (a[1] - this.g[1]) / (this.g[3] - this.g[1])) * this.i.length
      )
    ];
    if ("string" !== typeof b) return null;
    b = b.charCodeAt(
      Math.floor(((a[0] - this.g[0]) / (this.g[2] - this.g[0])) * b.length)
    );
    93 <= b && b--;
    35 <= b && b--;
    b -= 32;
    a = null;
    b in this.l &&
      ((b = this.l[b]), this.f && b in this.f ? (a = this.f[b]) : (a = b));
    return a;
  };
  function by(a, b, c, d, e) {
    0 == a.state && !0 === e
      ? (Da(
          a,
          "change",
          function() {
            c.call(d, this.getData(b));
          },
          a
        ),
        dy(a))
      : !0 === e
      ? setTimeout(
          function() {
            c.call(d, this.getData(b));
          }.bind(a),
          0
        )
      : c.call(d, a.getData(b));
  }
  k.bb = function() {
    return this.o;
  };
  k.ge = function() {
    this.state = 3;
    this.s();
  };
  k.Hh = function(a) {
    this.i = a.grid;
    this.l = a.keys;
    this.f = a.data;
    this.state = 4;
    this.s();
  };
  function dy(a) {
    if (0 == a.state)
      if (((a.state = 1), a.v)) $w(a.o, a.Hh.bind(a), a.ge.bind(a));
      else {
        var b = new XMLHttpRequest();
        b.addEventListener("load", a.xn.bind(a));
        b.addEventListener("error", a.wn.bind(a));
        b.open("GET", a.o);
        b.send();
      }
  }
  k.xn = function(a) {
    a = a.target;
    if (!a.status || (200 <= a.status && 300 > a.status)) {
      var b;
      try {
        b = JSON.parse(a.responseText);
      } catch (c) {
        this.ge();
        return;
      }
      this.Hh(b);
    } else this.ge();
  };
  k.wn = function() {
    this.ge();
  };
  k.load = function() {
    this.H && dy(this);
  };
  function ey(a) {
    a = a || {};
    var b = a.params || {};
    X.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      crossOrigin: a.crossOrigin,
      logo: a.logo,
      opaque: !("TRANSPARENT" in b ? b.TRANSPARENT : 1),
      projection: a.projection,
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      tileGrid: a.tileGrid,
      tileLoadFunction: a.tileLoadFunction,
      url: a.url,
      urls: a.urls,
      wrapX: void 0 !== a.wrapX ? a.wrapX : !0
    });
    this.u = void 0 !== a.gutter ? a.gutter : 0;
    this.c = b;
    this.o = !0;
    this.A = a.serverType;
    this.U = void 0 !== a.hidpi ? a.hidpi : !0;
    this.P = "";
    fy(this);
    this.Z = Hb();
    gy(this);
    jx(this, hy(this));
  }
  v(ey, X);
  k = ey.prototype;
  k.An = function(a, b, c, d) {
    c = zc(c);
    var e = this.tileGrid;
    e || (e = this.Db(c));
    b = e.fe(a, b);
    if (!(e.b.length <= b[0])) {
      var f = e.Ha(b[0]),
        g = e.Na(b, this.Z),
        e = Zd(e.Za(b[0]), this.l),
        h = this.u;
      0 !== h && ((e = Xd(e, h, this.l)), (g = Jb(g, f * h, g)));
      h = {
        SERVICE: "WMS",
        VERSION: "1.3.0",
        REQUEST: "GetFeatureInfo",
        FORMAT: "image/png",
        TRANSPARENT: !0,
        QUERY_LAYERS: this.c.LAYERS
      };
      ta(h, this.c, d);
      d = Math.floor((g[3] - a[1]) / f);
      h[this.o ? "I" : "X"] = Math.floor((a[0] - g[0]) / f);
      h[this.o ? "J" : "Y"] = d;
      return iy(this, b, e, g, 1, c, h);
    }
  };
  k.rf = function() {
    return this.u;
  };
  k.Lb = function(a, b, c) {
    return this.P + X.prototype.Lb.call(this, a, b, c);
  };
  k.Bn = function() {
    return this.c;
  };
  function iy(a, b, c, d, e, f, g) {
    var h = a.urls;
    if (h) {
      g.WIDTH = c[0];
      g.HEIGHT = c[1];
      g[a.o ? "CRS" : "SRS"] = f.hb;
      "STYLES" in a.c || (g.STYLES = "");
      if (1 != e)
        switch (a.A) {
          case "geoserver":
            c = (90 * e + 0.5) | 0;
            g.FORMAT_OPTIONS =
              "FORMAT_OPTIONS" in g
                ? g.FORMAT_OPTIONS + (";dpi:" + c)
                : "dpi:" + c;
            break;
          case "mapserver":
            g.MAP_RESOLUTION = 90 * e;
            break;
          case "carmentaserver":
          case "qgis":
            g.DPI = 90 * e;
            break;
          default:
            ha(!1, 52);
        }
      f = f.b;
      a.o &&
        "ne" == f.substr(0, 2) &&
        ((a = d[0]),
        (d[0] = d[1]),
        (d[1] = a),
        (a = d[2]),
        (d[2] = d[3]),
        (d[3] = a));
      g.BBOX = d.join(",");
      return yx(
        1 == h.length ? h[0] : h[oa((b[1] << b[0]) + b[2], h.length)],
        g
      );
    }
  }
  k.jb = function(a) {
    return this.U && void 0 !== this.A ? a : 1;
  };
  function fy(a) {
    var b = 0,
      c = [];
    if (a.urls) {
      var d, e;
      d = 0;
      for (e = a.urls.length; d < e; ++d) c[b++] = a.urls[d];
    }
    a.P = c.join("#");
  }
  function hy(a) {
    var b = 0,
      c = [],
      d;
    for (d in a.c) c[b++] = d + "-" + a.c[d];
    return c.join("/");
  }
  k.zc = function(a, b, c) {
    var d = this.tileGrid;
    d || (d = this.Db(c));
    if (!(d.b.length <= a[0])) {
      1 == b || (this.U && void 0 !== this.A) || (b = 1);
      var e = d.Ha(a[0]),
        f = d.Na(a, this.Z),
        d = Zd(d.Za(a[0]), this.l),
        g = this.u;
      0 !== g && ((d = Xd(d, g, this.l)), (f = Jb(f, e * g, f)));
      1 != b && (d = Yd(d, b, this.l));
      e = {
        SERVICE: "WMS",
        VERSION: "1.3.0",
        REQUEST: "GetMap",
        FORMAT: "image/png",
        TRANSPARENT: !0
      };
      ta(e, this.c);
      return iy(this, a, d, f, b, c, e);
    }
  };
  k.Ya = function(a) {
    X.prototype.Ya.call(this, a);
    fy(this);
  };
  k.Cn = function(a) {
    ta(this.c, a);
    fy(this);
    gy(this);
    jx(this, hy(this));
  };
  function gy(a) {
    a.o = 0 <= qb(a.c.VERSION || "1.3.0");
  }
  function jy(a, b, c, d, e) {
    ag.call(this, a, b);
    this.f = De();
    this.l = d;
    this.i = null;
    this.g = { xd: !1, bg: null, li: -1, cg: -1, jd: null };
    this.H = e;
    this.o = c;
  }
  v(jy, ag);
  k = jy.prototype;
  k.ub = function() {
    return -1 == this.g.cg ? null : this.f.canvas;
  };
  k.Yl = function() {
    return this.l;
  };
  k.bb = function() {
    return this.o;
  };
  k.load = function() {
    0 == this.state &&
      ((this.state = 1),
      this.s(),
      this.H(this, this.o),
      this.v(null, NaN, null));
  };
  k.ho = function(a, b) {
    this.Ff(b);
    this.ri(a);
  };
  k.fo = function() {
    this.state = 3;
    this.s();
  };
  k.ri = function(a) {
    this.i = a;
    this.state = cg;
    this.s();
  };
  k.Ff = function(a) {
    this.j = a;
  };
  k.wi = function(a) {
    this.v = a;
  };
  function ky(a, b) {
    a.wi(ao(b, a.l, a.ho.bind(a), a.fo.bind(a)));
  }
  function ly(a) {
    mx.call(this, {
      attributions: a.attributions,
      cacheSize: void 0 !== a.cacheSize ? a.cacheSize : 128,
      extent: a.extent,
      logo: a.logo,
      opaque: !1,
      projection: a.projection,
      state: a.state,
      tileGrid: a.tileGrid,
      tileLoadFunction: a.tileLoadFunction ? a.tileLoadFunction : ky,
      tileUrlFunction: a.tileUrlFunction,
      tilePixelRatio: a.tilePixelRatio,
      url: a.url,
      urls: a.urls,
      wrapX: void 0 === a.wrapX ? !0 : a.wrapX
    });
    this.c = a.format ? a.format : null;
    this.i = void 0 == a.overlaps ? !0 : a.overlaps;
    this.tileClass = a.tileClass ? a.tileClass : jy;
  }
  v(ly, mx);
  ly.prototype.Dc = function(a, b, c, d, e) {
    var f = this.Lb(a, b, c);
    if (this.a.b.hasOwnProperty(f)) return this.a.get(f);
    a = [a, b, c];
    d = (b = kx(this, a, e)) ? this.tileUrlFunction(b, d, e) : void 0;
    d = new this.tileClass(
      a,
      void 0 !== d ? 0 : 4,
      void 0 !== d ? d : "",
      this.c,
      this.tileLoadFunction
    );
    B(d, "change", this.Jh, this);
    this.a.set(f, d);
    return d;
  };
  ly.prototype.jb = function(a) {
    return void 0 == a ? mx.prototype.jb.call(this, a) : a;
  };
  ly.prototype.Dd = function(a, b) {
    var c = Zd(this.tileGrid.Za(a));
    return [Math.round(c[0] * b), Math.round(c[1] * b)];
  };
  function my(a) {
    this.l = a.matrixIds;
    be.call(this, {
      extent: a.extent,
      origin: a.origin,
      origins: a.origins,
      resolutions: a.resolutions,
      tileSize: a.tileSize,
      tileSizes: a.tileSizes,
      sizes: a.sizes
    });
  }
  v(my, be);
  my.prototype.o = function() {
    return this.l;
  };
  function ny(a, b, c) {
    var d = [],
      e = [],
      f = [],
      g = [],
      h = [],
      l = void 0 !== c ? c : [];
    c = zc(
      a.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3")
    );
    var m = c.ic(),
      p = "ne" == c.b.substr(0, 2);
    a.TileMatrix.sort(function(a, b) {
      return b.ScaleDenominator - a.ScaleDenominator;
    });
    a.TileMatrix.forEach(function(a) {
      var b;
      0 < l.length
        ? (b = cb(l, function(b) {
            return a.Identifier == b.TileMatrix;
          }))
        : (b = !0);
      if (b) {
        e.push(a.Identifier);
        b = (2.8e-4 * a.ScaleDenominator) / m;
        var c = a.TileWidth,
          u = a.TileHeight;
        p
          ? f.push([a.TopLeftCorner[1], a.TopLeftCorner[0]])
          : f.push(a.TopLeftCorner);
        d.push(b);
        g.push(c == u ? c : [c, u]);
        h.push([a.MatrixWidth, -a.MatrixHeight]);
      }
    });
    return new my({
      extent: b,
      origins: f,
      resolutions: d,
      matrixIds: e,
      tileSizes: g,
      sizes: h
    });
  }
  function Z(a) {
    function b(a) {
      a =
        d == oy
          ? yx(a, f)
          : a.replace(/\{(\w+?)\}/g, function(a, b) {
              return b.toLowerCase() in f ? f[b.toLowerCase()] : a;
            });
      return function(b) {
        if (b) {
          var c = { TileMatrix: e.l[b[0]], TileCol: b[1], TileRow: -b[2] - 1 };
          ta(c, g);
          b = a;
          return (b =
            d == oy
              ? yx(b, c)
              : b.replace(/\{(\w+?)\}/g, function(a, b) {
                  return c[b];
                }));
        }
      };
    }
    this.Z = void 0 !== a.version ? a.version : "1.0.0";
    this.u = void 0 !== a.format ? a.format : "image/jpeg";
    this.c = void 0 !== a.dimensions ? a.dimensions : {};
    this.A = a.layer;
    this.o = a.matrixSet;
    this.P = a.style;
    var c = a.urls;
    void 0 === c && void 0 !== a.url && (c = fx(a.url));
    var d = (this.U = void 0 !== a.requestEncoding ? a.requestEncoding : oy),
      e = a.tileGrid,
      f = { layer: this.A, style: this.P, tilematrixset: this.o };
    d == oy &&
      ta(f, {
        Service: "WMTS",
        Request: "GetTile",
        Version: this.Z,
        Format: this.u
      });
    var g = this.c,
      h = c && 0 < c.length ? dx(c.map(b)) : ex;
    X.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      crossOrigin: a.crossOrigin,
      logo: a.logo,
      projection: a.projection,
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      tileClass: a.tileClass,
      tileGrid: e,
      tileLoadFunction: a.tileLoadFunction,
      tilePixelRatio: a.tilePixelRatio,
      tileUrlFunction: h,
      urls: c,
      wrapX: void 0 !== a.wrapX ? a.wrapX : !1
    });
    jx(this, py(this));
  }
  v(Z, X);
  k = Z.prototype;
  k.bk = function() {
    return this.c;
  };
  k.Dn = function() {
    return this.u;
  };
  k.En = function() {
    return this.A;
  };
  k.pk = function() {
    return this.o;
  };
  k.Ak = function() {
    return this.U;
  };
  k.Fn = function() {
    return this.P;
  };
  k.Hk = function() {
    return this.Z;
  };
  function py(a) {
    var b = 0,
      c = [],
      d;
    for (d in a.c) c[b++] = d + "-" + a.c[d];
    return c.join("/");
  }
  k.xp = function(a) {
    ta(this.c, a);
    jx(this, py(this));
  };
  var oy = "KVP";
  function qy(a) {
    a = a || {};
    var b = a.size,
      c = b[0],
      d = b[1],
      e = [],
      f = 256;
    switch (void 0 !== a.tierSizeCalculation ? a.tierSizeCalculation : ry) {
      case ry:
        for (; c > f || d > f; )
          e.push([Math.ceil(c / f), Math.ceil(d / f)]), (f += f);
        break;
      case sy:
        for (; c > f || d > f; )
          e.push([Math.ceil(c / f), Math.ceil(d / f)]), (c >>= 1), (d >>= 1);
        break;
      default:
        ha(!1, 53);
    }
    e.push([1, 1]);
    e.reverse();
    for (var f = [1], g = [0], d = 1, c = e.length; d < c; d++)
      f.push(1 << d), g.push(e[d - 1][0] * e[d - 1][1] + g[d - 1]);
    f.reverse();
    var b = [0, -b[1], b[0], 0],
      b = new be({ extent: b, origin: ac(b), resolutions: f }),
      h = a.url;
    X.call(this, {
      attributions: a.attributions,
      cacheSize: a.cacheSize,
      crossOrigin: a.crossOrigin,
      logo: a.logo,
      reprojectionErrorThreshold: a.reprojectionErrorThreshold,
      tileClass: ty,
      tileGrid: b,
      tileUrlFunction: function(a) {
        if (a) {
          var b = a[0],
            c = a[1];
          a = -a[2] - 1;
          return (
            h +
            "TileGroup" +
            (((c + a * e[b][0] + g[b]) / 256) | 0) +
            "/" +
            b +
            "-" +
            c +
            "-" +
            a +
            ".jpg"
          );
        }
      }
    });
  }
  v(qy, X);
  function ty(a, b, c, d, e) {
    lv.call(this, a, b, c, d, e);
    this.f = null;
  }
  v(ty, lv);
  ty.prototype.ub = function() {
    if (this.f) return this.f;
    var a = lv.prototype.ub.call(this);
    if (this.state == cg) {
      if (256 == a.width && 256 == a.height) return (this.f = a);
      var b = De(256, 256);
      b.drawImage(a, 0, 0);
      return (this.f = b.canvas);
    }
    return a;
  };
  var ry = "default",
    sy = "truncated";
  function uy(a, b) {
    this.b = b;
    this.a = [{ x: 0, y: 0, width: a, height: a }];
    this.f = {};
    this.g = De(a, a);
    this.c = this.g.canvas;
  }
  uy.prototype.get = function(a) {
    return this.f[a] || null;
  };
  uy.prototype.add = function(a, b, c, d, e) {
    var f, g, h;
    g = 0;
    for (h = this.a.length; g < h; ++g)
      if (((f = this.a[g]), f.width >= b + this.b && f.height >= c + this.b))
        return (
          (h = { offsetX: f.x + this.b, offsetY: f.y + this.b, image: this.c }),
          (this.f[a] = h),
          d.call(e, this.g, f.x + this.b, f.y + this.b),
          (a = g),
          (b += this.b),
          (d = c + this.b),
          f.width - b > f.height - d
            ? ((c = {
                x: f.x + b,
                y: f.y,
                width: f.width - b,
                height: f.height
              }),
              (b = { x: f.x, y: f.y + d, width: b, height: f.height - d }),
              vy(this, a, c, b))
            : ((c = { x: f.x + b, y: f.y, width: f.width - b, height: d }),
              (b = {
                x: f.x,
                y: f.y + d,
                width: f.width,
                height: f.height - d
              }),
              vy(this, a, c, b)),
          h
        );
    return null;
  };
  function vy(a, b, c, d) {
    b = [b, 1];
    0 < c.width && 0 < c.height && b.push(c);
    0 < d.width && 0 < d.height && b.push(d);
    a.a.splice.apply(a.a, b);
  }
  function wy(a) {
    a = a || {};
    this.a = void 0 !== a.initialSize ? a.initialSize : 256;
    this.g = void 0 !== a.maxSize ? a.maxSize : void 0 !== ba ? ba : 2048;
    this.b = void 0 !== a.space ? a.space : 1;
    this.c = [new uy(this.a, this.b)];
    this.f = this.a;
    this.i = [new uy(this.f, this.b)];
  }
  wy.prototype.add = function(a, b, c, d, e, f) {
    if (b + this.b > this.g || c + this.b > this.g) return null;
    d = xy(this, !1, a, b, c, d, f);
    if (!d) return null;
    a = xy(this, !0, a, b, c, void 0 !== e ? e : ea, f);
    return {
      offsetX: d.offsetX,
      offsetY: d.offsetY,
      image: d.image,
      yf: a.image
    };
  };
  function xy(a, b, c, d, e, f, g) {
    var h = b ? a.i : a.c,
      l,
      m,
      p;
    m = 0;
    for (p = h.length; m < p; ++m) {
      l = h[m];
      if ((l = l.add(c, d, e, f, g))) return l;
      l ||
        m !== p - 1 ||
        (b
          ? ((l = Math.min(2 * a.f, a.g)), (a.f = l))
          : ((l = Math.min(2 * a.a, a.g)), (a.a = l)),
        (l = new uy(l, a.b)),
        h.push(l),
        ++p);
    }
    return null;
  }
  t("ol.animation.bounce", function(a) {
    var b = a.resolution,
      c = a.start ? a.start : Date.now(),
      d = void 0 !== a.duration ? a.duration : 1e3,
      e = a.easing ? a.easing : Fb;
    return function(a, g) {
      if (g.time < c) return (g.animate = !0), (g.viewHints[Kd] += 1), !0;
      if (g.time < c + d) {
        var h = e((g.time - c) / d),
          l = b - g.viewState.resolution;
        g.animate = !0;
        g.viewState.resolution += h * l;
        g.viewHints[Kd] += 1;
        return !0;
      }
      return !1;
    };
  });
  t("ol.animation.pan", function(a) {
    var b = a.source,
      c = a.start ? a.start : Date.now(),
      d = b[0],
      e = b[1],
      f = void 0 !== a.duration ? a.duration : 1e3,
      g = a.easing ? a.easing : Db;
    return function(a, b) {
      if (b.time < c) return (b.animate = !0), (b.viewHints[Kd] += 1), !0;
      if (b.time < c + f) {
        var m = 1 - g((b.time - c) / f),
          p = d - b.viewState.center[0],
          n = e - b.viewState.center[1];
        b.animate = !0;
        b.viewState.center[0] += m * p;
        b.viewState.center[1] += m * n;
        b.viewHints[Kd] += 1;
        return !0;
      }
      return !1;
    };
  });
  t("ol.animation.rotate", function(a) {
    var b = a.rotation ? a.rotation : 0,
      c = a.start ? a.start : Date.now(),
      d = void 0 !== a.duration ? a.duration : 1e3,
      e = a.easing ? a.easing : Db,
      f = a.anchor ? a.anchor : null;
    return function(a, h) {
      if (h.time < c) return (h.animate = !0), (h.viewHints[Kd] += 1), !0;
      if (h.time < c + d) {
        var l = 1 - e((h.time - c) / d),
          l = (b - h.viewState.rotation) * l;
        h.animate = !0;
        h.viewState.rotation += l;
        if (f) {
          var m = h.viewState.center;
          m[0] -= f[0];
          m[1] -= f[1];
          wb(m, l);
          rb(m, f);
        }
        h.viewHints[Kd] += 1;
        return !0;
      }
      return !1;
    };
  });
  t("ol.animation.zoom", function(a) {
    var b = a.resolution,
      c = a.start ? a.start : Date.now(),
      d = void 0 !== a.duration ? a.duration : 1e3,
      e = a.easing ? a.easing : Db;
    return function(a, g) {
      if (g.time < c) return (g.animate = !0), (g.viewHints[Kd] += 1), !0;
      if (g.time < c + d) {
        var h = 1 - e((g.time - c) / d),
          l = b - g.viewState.resolution;
        g.animate = !0;
        g.viewState.resolution += h * l;
        g.viewHints[Kd] += 1;
        return !0;
      }
      return !1;
    };
  });
  ga.prototype.code = ga.prototype.code;
  t("ol.Attribution", pe);
  pe.prototype.getHTML = pe.prototype.g;
  t("ol.Collection", qe);
  qe.prototype.clear = qe.prototype.clear;
  qe.prototype.extend = qe.prototype.Bf;
  qe.prototype.forEach = qe.prototype.forEach;
  qe.prototype.getArray = qe.prototype.Il;
  qe.prototype.item = qe.prototype.item;
  qe.prototype.getLength = qe.prototype.Ub;
  qe.prototype.insertAt = qe.prototype.ke;
  qe.prototype.pop = qe.prototype.pop;
  qe.prototype.push = qe.prototype.push;
  qe.prototype.remove = qe.prototype.remove;
  qe.prototype.removeAt = qe.prototype.Zf;
  qe.prototype.setAt = qe.prototype.ep;
  te.prototype.element = te.prototype.element;
  t("ol.color.asArray", ye);
  t("ol.color.asString", Ae);
  t("ol.colorlike.asColorLike", Ce);
  t("ol.coordinate.add", rb);
  t("ol.coordinate.createStringXY", function(a) {
    return function(b) {
      return Ab(b, a);
    };
  });
  t("ol.coordinate.format", ub);
  t("ol.coordinate.rotate", wb);
  t("ol.coordinate.toStringHDMS", function(a, b) {
    return a ? tb(a[1], "NS", b) + " " + tb(a[0], "EW", b) : "";
  });
  t("ol.coordinate.toStringXY", Ab);
  t("ol.DeviceOrientation", Cn);
  Cn.prototype.getAlpha = Cn.prototype.Vj;
  Cn.prototype.getBeta = Cn.prototype.Yj;
  Cn.prototype.getGamma = Cn.prototype.ek;
  Cn.prototype.getHeading = Cn.prototype.Jl;
  Cn.prototype.getTracking = Cn.prototype.kh;
  Cn.prototype.setTracking = Cn.prototype.Cf;
  t("ol.easing.easeIn", Bb);
  t("ol.easing.easeOut", Cb);
  t("ol.easing.inAndOut", Db);
  t("ol.easing.linear", Eb);
  t("ol.easing.upAndDown", Fb);
  t("ol.Feature", J);
  J.prototype.clone = J.prototype.clone;
  J.prototype.getGeometry = J.prototype.V;
  J.prototype.getId = J.prototype.Ll;
  J.prototype.getGeometryName = J.prototype.gk;
  J.prototype.getStyle = J.prototype.Ml;
  J.prototype.getStyleFunction = J.prototype.Gc;
  J.prototype.setGeometry = J.prototype.Pa;
  J.prototype.setStyle = J.prototype.Df;
  J.prototype.setId = J.prototype.cc;
  J.prototype.setGeometryName = J.prototype.Nc;
  t("ol.featureloader.xhr", bo);
  t("ol.Geolocation", Ru);
  Ru.prototype.getAccuracy = Ru.prototype.Tj;
  Ru.prototype.getAccuracyGeometry = Ru.prototype.Uj;
  Ru.prototype.getAltitude = Ru.prototype.Wj;
  Ru.prototype.getAltitudeAccuracy = Ru.prototype.Xj;
  Ru.prototype.getHeading = Ru.prototype.Ol;
  Ru.prototype.getPosition = Ru.prototype.Pl;
  Ru.prototype.getProjection = Ru.prototype.lh;
  Ru.prototype.getSpeed = Ru.prototype.Bk;
  Ru.prototype.getTracking = Ru.prototype.mh;
  Ru.prototype.getTrackingOptions = Ru.prototype.Wg;
  Ru.prototype.setProjection = Ru.prototype.nh;
  Ru.prototype.setTracking = Ru.prototype.ne;
  Ru.prototype.setTrackingOptions = Ru.prototype.Ci;
  t("ol.Graticule", gv);
  gv.prototype.getMap = gv.prototype.Sl;
  gv.prototype.getMeridians = gv.prototype.qk;
  gv.prototype.getParallels = gv.prototype.xk;
  gv.prototype.setMap = gv.prototype.setMap;
  t("ol.has.DEVICE_PIXEL_RATIO", mf);
  t("ol.has.CANVAS", of);
  t("ol.has.DEVICE_ORIENTATION", pf);
  t("ol.has.GEOLOCATION", qf);
  t("ol.has.TOUCH", rf);
  t("ol.has.WEBGL", ff);
  ii.prototype.getImage = ii.prototype.a;
  ii.prototype.load = ii.prototype.load;
  lv.prototype.getImage = lv.prototype.ub;
  lv.prototype.load = lv.prototype.load;
  t("ol.inherits", v);
  t("ol.Kinetic", kg);
  t("ol.loadingstrategy.all", wv);
  t("ol.loadingstrategy.bbox", function(a) {
    return [a];
  });
  t("ol.loadingstrategy.tile", function(a) {
    return function(b, c) {
      var d = a.Ec(c),
        e = fe(a, b, d),
        f = [],
        d = [d, 0, 0];
      for (d[1] = e.ea; d[1] <= e.ca; ++d[1])
        for (d[2] = e.ga; d[2] <= e.ja; ++d[2]) f.push(a.Na(d));
      return f;
    };
  });
  t("ol.Map", I);
  I.prototype.addControl = I.prototype.Bj;
  I.prototype.addInteraction = I.prototype.Cj;
  I.prototype.addLayer = I.prototype.ug;
  I.prototype.addOverlay = I.prototype.vg;
  I.prototype.beforeRender = I.prototype.Ij;
  I.prototype.forEachFeatureAtPixel = I.prototype.ae;
  I.prototype.forEachLayerAtPixel = I.prototype.Wl;
  I.prototype.hasFeatureAtPixel = I.prototype.ml;
  I.prototype.getEventCoordinate = I.prototype.ck;
  I.prototype.getEventPixel = I.prototype.ce;
  I.prototype.getTarget = I.prototype.vf;
  I.prototype.getTargetElement = I.prototype.Cc;
  I.prototype.getCoordinateFromPixel = I.prototype.Sa;
  I.prototype.getControls = I.prototype.ak;
  I.prototype.getOverlays = I.prototype.vk;
  I.prototype.getOverlayById = I.prototype.uk;
  I.prototype.getInteractions = I.prototype.hk;
  I.prototype.getLayerGroup = I.prototype.Bc;
  I.prototype.getLayers = I.prototype.oh;
  I.prototype.getPixelFromCoordinate = I.prototype.Ga;
  I.prototype.getSize = I.prototype.nb;
  I.prototype.getView = I.prototype.aa;
  I.prototype.getViewport = I.prototype.Ik;
  I.prototype.renderSync = I.prototype.$o;
  I.prototype.render = I.prototype.render;
  I.prototype.removeControl = I.prototype.To;
  I.prototype.removeInteraction = I.prototype.Uo;
  I.prototype.removeLayer = I.prototype.Wo;
  I.prototype.removeOverlay = I.prototype.Xo;
  I.prototype.setLayerGroup = I.prototype.vi;
  I.prototype.setSize = I.prototype.eg;
  I.prototype.setTarget = I.prototype.ph;
  I.prototype.setView = I.prototype.mp;
  I.prototype.updateSize = I.prototype.ld;
  $e.prototype.originalEvent = $e.prototype.originalEvent;
  $e.prototype.pixel = $e.prototype.pixel;
  $e.prototype.coordinate = $e.prototype.coordinate;
  $e.prototype.dragging = $e.prototype.dragging;
  Ge.prototype.map = Ge.prototype.map;
  Ge.prototype.frameState = Ge.prototype.frameState;
  t("ol.Object", Sa);
  Sa.prototype.get = Sa.prototype.get;
  Sa.prototype.getKeys = Sa.prototype.S;
  Sa.prototype.getProperties = Sa.prototype.R;
  Sa.prototype.set = Sa.prototype.set;
  Sa.prototype.setProperties = Sa.prototype.I;
  Sa.prototype.unset = Sa.prototype.T;
  Wa.prototype.key = Wa.prototype.key;
  Wa.prototype.oldValue = Wa.prototype.oldValue;
  t("ol.Observable", Pa);
  t("ol.Observable.unByKey", Qa);
  Pa.prototype.changed = Pa.prototype.s;
  Pa.prototype.dispatchEvent = Pa.prototype.b;
  Pa.prototype.getRevision = Pa.prototype.M;
  Pa.prototype.on = Pa.prototype.J;
  Pa.prototype.once = Pa.prototype.N;
  Pa.prototype.un = Pa.prototype.K;
  Pa.prototype.unByKey = Pa.prototype.O;
  t("ol.Overlay", Pm);
  Pm.prototype.getElement = Pm.prototype.be;
  Pm.prototype.getId = Pm.prototype.Xl;
  Pm.prototype.getMap = Pm.prototype.oe;
  Pm.prototype.getOffset = Pm.prototype.Tg;
  Pm.prototype.getPosition = Pm.prototype.qh;
  Pm.prototype.getPositioning = Pm.prototype.Ug;
  Pm.prototype.setElement = Pm.prototype.pi;
  Pm.prototype.setMap = Pm.prototype.setMap;
  Pm.prototype.setOffset = Pm.prototype.xi;
  Pm.prototype.setPosition = Pm.prototype.Ef;
  Pm.prototype.setPositioning = Pm.prototype.Ai;
  t("ol.render.toContext", function(a, b) {
    var c = a.canvas,
      d = b ? b : {},
      e = d.pixelRatio || mf;
    if ((d = d.size))
      (c.width = d[0] * e),
        (c.height = d[1] * e),
        (c.style.width = d[0] + "px"),
        (c.style.height = d[1] + "px");
    c = [0, 0, c.width, c.height];
    d = Wh(Ph(), e, e);
    return new Ji(a, e, c, d, 0);
  });
  t("ol.size.toSize", Zd);
  ag.prototype.getTileCoord = ag.prototype.c;
  ag.prototype.load = ag.prototype.load;
  jy.prototype.getFormat = jy.prototype.Yl;
  jy.prototype.setFeatures = jy.prototype.ri;
  jy.prototype.setProjection = jy.prototype.Ff;
  jy.prototype.setLoader = jy.prototype.wi;
  t("ol.View", Fd);
  Fd.prototype.animate = Fd.prototype.animate;
  Fd.prototype.constrainCenter = Fd.prototype.Zd;
  Fd.prototype.constrainResolution = Fd.prototype.constrainResolution;
  Fd.prototype.constrainRotation = Fd.prototype.constrainRotation;
  Fd.prototype.getCenter = Fd.prototype.fb;
  Fd.prototype.calculateExtent = Fd.prototype.Uc;
  Fd.prototype.getMaxResolution = Fd.prototype.Zl;
  Fd.prototype.getMinResolution = Fd.prototype.$l;
  Fd.prototype.getProjection = Fd.prototype.am;
  Fd.prototype.getResolution = Fd.prototype.Oa;
  Fd.prototype.getResolutions = Fd.prototype.bm;
  Fd.prototype.getRotation = Fd.prototype.Ra;
  Fd.prototype.getZoom = Fd.prototype.Kk;
  Fd.prototype.fit = Fd.prototype.lf;
  Fd.prototype.centerOn = Fd.prototype.Kj;
  Fd.prototype.rotate = Fd.prototype.rotate;
  Fd.prototype.setCenter = Fd.prototype.Mb;
  Fd.prototype.setResolution = Fd.prototype.Oc;
  Fd.prototype.setRotation = Fd.prototype.pe;
  Fd.prototype.setZoom = Fd.prototype.pp;
  t("ol.xml.getAllTextContent", Ln);
  t("ol.xml.parse", Pn);
  xk.prototype.getGL = xk.prototype.bo;
  xk.prototype.useProgram = xk.prototype.Lc;
  t("ol.tilegrid.createXYZ", oe);
  t("ol.tilegrid.TileGrid", be);
  be.prototype.forEachTileCoord = be.prototype.Hg;
  be.prototype.getMaxZoom = be.prototype.Rg;
  be.prototype.getMinZoom = be.prototype.Sg;
  be.prototype.getOrigin = be.prototype.Kc;
  be.prototype.getResolution = be.prototype.Ha;
  be.prototype.getResolutions = be.prototype.Wh;
  be.prototype.getTileCoordExtent = be.prototype.Na;
  be.prototype.getTileCoordForCoordAndResolution = be.prototype.fe;
  be.prototype.getTileCoordForCoordAndZ = be.prototype.wf;
  be.prototype.getTileSize = be.prototype.Za;
  be.prototype.getZForResolution = be.prototype.Ec;
  t("ol.tilegrid.WMTS", my);
  my.prototype.getMatrixIds = my.prototype.o;
  t("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet", ny);
  t("ol.style.AtlasManager", wy);
  t("ol.style.Circle", ui);
  ui.prototype.clone = ui.prototype.clone;
  ui.prototype.setRadius = ui.prototype.Qa;
  t("ol.style.Fill", vi);
  vi.prototype.clone = vi.prototype.clone;
  vi.prototype.getColor = vi.prototype.g;
  vi.prototype.setColor = vi.prototype.f;
  t("ol.style.Icon", xq);
  xq.prototype.clone = xq.prototype.clone;
  xq.prototype.getAnchor = xq.prototype.Ac;
  xq.prototype.getColor = xq.prototype.Gn;
  xq.prototype.getImage = xq.prototype.Ic;
  xq.prototype.getOrigin = xq.prototype.Jc;
  xq.prototype.getSrc = xq.prototype.Hn;
  xq.prototype.getSize = xq.prototype.ac;
  xq.prototype.load = xq.prototype.load;
  t("ol.style.Image", ri);
  ri.prototype.getOpacity = ri.prototype.ye;
  ri.prototype.getRotateWithView = ri.prototype.ze;
  ri.prototype.getRotation = ri.prototype.Ae;
  ri.prototype.getScale = ri.prototype.Be;
  ri.prototype.getSnapToPixel = ri.prototype.ee;
  ri.prototype.setOpacity = ri.prototype.dd;
  ri.prototype.setRotation = ri.prototype.Ce;
  ri.prototype.setScale = ri.prototype.ed;
  t("ol.style.RegularShape", si);
  si.prototype.clone = si.prototype.clone;
  si.prototype.getAnchor = si.prototype.Ac;
  si.prototype.getAngle = si.prototype.Nh;
  si.prototype.getFill = si.prototype.Oh;
  si.prototype.getImage = si.prototype.Ic;
  si.prototype.getOrigin = si.prototype.Jc;
  si.prototype.getPoints = si.prototype.Ph;
  si.prototype.getRadius = si.prototype.Qh;
  si.prototype.getRadius2 = si.prototype.Vg;
  si.prototype.getSize = si.prototype.ac;
  si.prototype.getStroke = si.prototype.Rh;
  t("ol.style.Stroke", wi);
  wi.prototype.clone = wi.prototype.clone;
  wi.prototype.getColor = wi.prototype.In;
  wi.prototype.getLineCap = wi.prototype.kk;
  wi.prototype.getLineDash = wi.prototype.Jn;
  wi.prototype.getLineJoin = wi.prototype.lk;
  wi.prototype.getMiterLimit = wi.prototype.rk;
  wi.prototype.getWidth = wi.prototype.Kn;
  wi.prototype.setColor = wi.prototype.Ln;
  wi.prototype.setLineCap = wi.prototype.ip;
  wi.prototype.setLineDash = wi.prototype.setLineDash;
  wi.prototype.setLineJoin = wi.prototype.jp;
  wi.prototype.setMiterLimit = wi.prototype.kp;
  wi.prototype.setWidth = wi.prototype.np;
  t("ol.style.Style", xi);
  xi.prototype.clone = xi.prototype.clone;
  xi.prototype.getGeometry = xi.prototype.V;
  xi.prototype.getGeometryFunction = xi.prototype.fk;
  xi.prototype.getFill = xi.prototype.Mn;
  xi.prototype.setFill = xi.prototype.Qn;
  xi.prototype.getImage = xi.prototype.Nn;
  xi.prototype.setImage = xi.prototype.Rn;
  xi.prototype.getStroke = xi.prototype.On;
  xi.prototype.setStroke = xi.prototype.Sn;
  xi.prototype.getText = xi.prototype.Ka;
  xi.prototype.setText = xi.prototype.Tn;
  xi.prototype.getZIndex = xi.prototype.Pn;
  xi.prototype.setGeometry = xi.prototype.Pa;
  xi.prototype.setZIndex = xi.prototype.Un;
  t("ol.style.Text", Dq);
  Dq.prototype.clone = Dq.prototype.clone;
  Dq.prototype.getFont = Dq.prototype.dk;
  Dq.prototype.getOffsetX = Dq.prototype.sk;
  Dq.prototype.getOffsetY = Dq.prototype.tk;
  Dq.prototype.getFill = Dq.prototype.Vn;
  Dq.prototype.getRotateWithView = Dq.prototype.Wn;
  Dq.prototype.getRotation = Dq.prototype.Xn;
  Dq.prototype.getScale = Dq.prototype.Yn;
  Dq.prototype.getStroke = Dq.prototype.Zn;
  Dq.prototype.getText = Dq.prototype.Ka;
  Dq.prototype.getTextAlign = Dq.prototype.Dk;
  Dq.prototype.getTextBaseline = Dq.prototype.Ek;
  Dq.prototype.setFont = Dq.prototype.si;
  Dq.prototype.setOffsetX = Dq.prototype.yi;
  Dq.prototype.setOffsetY = Dq.prototype.zi;
  Dq.prototype.setFill = Dq.prototype.Sh;
  Dq.prototype.setRotation = Dq.prototype.$n;
  Dq.prototype.setScale = Dq.prototype.Th;
  Dq.prototype.setStroke = Dq.prototype.Uh;
  Dq.prototype.setText = Dq.prototype.Vh;
  Dq.prototype.setTextAlign = Dq.prototype.Bi;
  Dq.prototype.setTextBaseline = Dq.prototype.lp;
  t("ol.Sphere", oc);
  oc.prototype.geodesicArea = oc.prototype.a;
  oc.prototype.haversineDistance = oc.prototype.b;
  t("ol.source.BingMaps", qx);
  t("ol.source.BingMaps.TOS_ATTRIBUTION", rx);
  qx.prototype.getApiKey = qx.prototype.U;
  qx.prototype.getImagerySet = qx.prototype.Z;
  t("ol.source.CartoDB", tx);
  tx.prototype.getConfig = tx.prototype.$j;
  tx.prototype.updateConfig = tx.prototype.wp;
  tx.prototype.setConfig = tx.prototype.fp;
  t("ol.source.Cluster", Y);
  Y.prototype.getSource = Y.prototype.Ua;
  Y.prototype.setDistance = Y.prototype.Ob;
  t("ol.source.Image", km);
  mm.prototype.image = mm.prototype.image;
  t("ol.source.ImageArcGISRest", zx);
  zx.prototype.getParams = zx.prototype.Xm;
  zx.prototype.getImageLoadFunction = zx.prototype.Wm;
  zx.prototype.getUrl = zx.prototype.Ym;
  zx.prototype.setImageLoadFunction = zx.prototype.Zm;
  zx.prototype.setUrl = zx.prototype.$m;
  zx.prototype.updateParams = zx.prototype.an;
  t("ol.source.ImageCanvas", rm);
  t("ol.source.ImageMapGuide", Ax);
  Ax.prototype.getParams = Ax.prototype.cn;
  Ax.prototype.getImageLoadFunction = Ax.prototype.bn;
  Ax.prototype.updateParams = Ax.prototype.en;
  Ax.prototype.setImageLoadFunction = Ax.prototype.dn;
  t("ol.source.ImageStatic", Bx);
  t("ol.source.ImageVector", sm);
  sm.prototype.getSource = sm.prototype.fn;
  sm.prototype.getStyle = sm.prototype.gn;
  sm.prototype.getStyleFunction = sm.prototype.hn;
  sm.prototype.setStyle = sm.prototype.Fh;
  t("ol.source.ImageWMS", Cx);
  Cx.prototype.getGetFeatureInfoUrl = Cx.prototype.ln;
  Cx.prototype.getParams = Cx.prototype.nn;
  Cx.prototype.getImageLoadFunction = Cx.prototype.mn;
  Cx.prototype.getUrl = Cx.prototype.pn;
  Cx.prototype.setImageLoadFunction = Cx.prototype.qn;
  Cx.prototype.setUrl = Cx.prototype.rn;
  Cx.prototype.updateParams = Cx.prototype.sn;
  t("ol.source.OSM", Gx);
  t("ol.source.OSM.ATTRIBUTION", Hx);
  t("ol.source.Raster", Ix);
  Ix.prototype.setOperation = Ix.prototype.u;
  Px.prototype.extent = Px.prototype.extent;
  Px.prototype.resolution = Px.prototype.resolution;
  Px.prototype.data = Px.prototype.data;
  t("ol.source.Source", hm);
  hm.prototype.getAttributions = hm.prototype.za;
  hm.prototype.getLogo = hm.prototype.ya;
  hm.prototype.getProjection = hm.prototype.Aa;
  hm.prototype.getState = hm.prototype.W;
  hm.prototype.refresh = hm.prototype.wa;
  hm.prototype.setAttributions = hm.prototype.ua;
  t("ol.source.Stamen", Sx);
  t("ol.source.Tile", ix);
  ix.prototype.getTileGrid = ix.prototype.Va;
  lx.prototype.tile = lx.prototype.tile;
  t("ol.source.TileArcGISRest", Wx);
  Wx.prototype.getParams = Wx.prototype.u;
  Wx.prototype.updateParams = Wx.prototype.A;
  t("ol.source.TileDebug", Yx);
  t("ol.source.TileImage", X);
  X.prototype.setRenderReprojectionEdges = X.prototype.Hb;
  X.prototype.setTileGridForProjection = X.prototype.Ib;
  t("ol.source.TileJSON", $x);
  $x.prototype.getTileJSON = $x.prototype.Fk;
  t("ol.source.TileUTFGrid", ay);
  ay.prototype.getTemplate = ay.prototype.Ck;
  ay.prototype.forDataAtCoordinateAndResolution = ay.prototype.Pj;
  t("ol.source.TileWMS", ey);
  ey.prototype.getGetFeatureInfoUrl = ey.prototype.An;
  ey.prototype.getParams = ey.prototype.Bn;
  ey.prototype.updateParams = ey.prototype.Cn;
  mx.prototype.getTileLoadFunction = mx.prototype.ib;
  mx.prototype.getTileUrlFunction = mx.prototype.kb;
  mx.prototype.getUrls = mx.prototype.lb;
  mx.prototype.setTileLoadFunction = mx.prototype.sb;
  mx.prototype.setTileUrlFunction = mx.prototype.Xa;
  mx.prototype.setUrl = mx.prototype.cb;
  mx.prototype.setUrls = mx.prototype.Ya;
  t("ol.source.Vector", U);
  U.prototype.addFeature = U.prototype.gb;
  U.prototype.addFeatures = U.prototype.Tc;
  U.prototype.clear = U.prototype.clear;
  U.prototype.forEachFeature = U.prototype.Fg;
  U.prototype.forEachFeatureInExtent = U.prototype.Qb;
  U.prototype.forEachFeatureIntersectingExtent = U.prototype.Gg;
  U.prototype.getFeaturesCollection = U.prototype.Og;
  U.prototype.getFeatures = U.prototype.we;
  U.prototype.getFeaturesAtCoordinate = U.prototype.Ng;
  U.prototype.getFeaturesInExtent = U.prototype.nf;
  U.prototype.getClosestFeatureToCoordinate = U.prototype.Jg;
  U.prototype.getExtent = U.prototype.G;
  U.prototype.getFeatureById = U.prototype.Mg;
  U.prototype.getFormat = U.prototype.Kh;
  U.prototype.getUrl = U.prototype.Lh;
  U.prototype.removeFeature = U.prototype.rb;
  Bv.prototype.feature = Bv.prototype.feature;
  t("ol.source.VectorTile", ly);
  t("ol.source.WMTS", Z);
  Z.prototype.getDimensions = Z.prototype.bk;
  Z.prototype.getFormat = Z.prototype.Dn;
  Z.prototype.getLayer = Z.prototype.En;
  Z.prototype.getMatrixSet = Z.prototype.pk;
  Z.prototype.getRequestEncoding = Z.prototype.Ak;
  Z.prototype.getStyle = Z.prototype.Fn;
  Z.prototype.getVersion = Z.prototype.Hk;
  Z.prototype.updateDimensions = Z.prototype.xp;
  t("ol.source.WMTS.optionsFromCapabilities", function(a, b) {
    var c = cb(a.Contents.Layer, function(a) {
        return a.Identifier == b.layer;
      }),
      d = a.Contents.TileMatrixSet,
      e,
      f,
      g;
    e =
      1 < c.TileMatrixSetLink.length
        ? "projection" in b
          ? gb(c.TileMatrixSetLink, function(a) {
              var c = cb(d, function(b) {
                  return b.Identifier == a.TileMatrixSet;
                }).SupportedCRS.replace(
                  /urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,
                  "$1:$3"
                ),
                e = zc(c),
                f = zc(b.projection);
              return e && f ? Mc(e, f) : c == b.projection;
            })
          : gb(c.TileMatrixSetLink, function(a) {
              return a.TileMatrixSet == b.matrixSet;
            })
        : 0;
    0 > e && (e = 0);
    f = c.TileMatrixSetLink[e].TileMatrixSet;
    g = c.TileMatrixSetLink[e].TileMatrixSetLimits;
    var h = c.Format[0];
    "format" in b && (h = b.format);
    e = gb(c.Style, function(a) {
      return "style" in b ? a.Title == b.style : a.isDefault;
    });
    0 > e && (e = 0);
    e = c.Style[e].Identifier;
    var l = {};
    "Dimension" in c &&
      c.Dimension.forEach(function(a) {
        var b = a.Identifier,
          c = a.Default;
        void 0 === c && (c = a.Value[0]);
        l[b] = c;
      });
    var m = cb(a.Contents.TileMatrixSet, function(a) {
        return a.Identifier == f;
      }),
      p;
    p =
      "projection" in b
        ? zc(b.projection)
        : zc(
            m.SupportedCRS.replace(
              /urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,
              "$1:$3"
            )
          );
    var n = c.WGS84BoundingBox,
      q,
      r;
    void 0 !== n &&
      ((r = zc("EPSG:4326").G()),
      (r = n[0] == r[0] && n[2] == r[2]),
      (q = Qc(n, "EPSG:4326", p)),
      (n = p.G()) && (Ob(n, q) || (q = void 0)));
    g = ny(m, q, g);
    var u = [],
      m = b.requestEncoding,
      m = void 0 !== m ? m : "";
    if ("OperationsMetadata" in a && "GetTile" in a.OperationsMetadata) {
      q = a.OperationsMetadata.GetTile.DCP.HTTP.Get;
      for (var n = 0, w = q.length; n < w; ++n) {
        var y = cb(q[n].Constraint, function(a) {
          return "GetEncoding" == a.name;
        }).AllowedValues.Value;
        "" === m && (m = y[0]);
        if (m === oy) Za(y, oy) && u.push(q[n].href);
        else break;
      }
    }
    0 === u.length &&
      ((m = "REST"),
      c.ResourceURL.forEach(function(a) {
        "tile" === a.resourceType && ((h = a.format), u.push(a.template));
      }));
    return {
      urls: u,
      layer: b.layer,
      matrixSet: f,
      format: h,
      projection: p,
      requestEncoding: m,
      tileGrid: g,
      style: e,
      dimensions: l,
      wrapX: r
    };
  });
  t("ol.source.XYZ", sx);
  t("ol.source.Zoomify", qy);
  Jh.prototype.vectorContext = Jh.prototype.vectorContext;
  Jh.prototype.frameState = Jh.prototype.frameState;
  Jh.prototype.context = Jh.prototype.context;
  Jh.prototype.glContext = Jh.prototype.glContext;
  Is.prototype.get = Is.prototype.get;
  Is.prototype.getExtent = Is.prototype.G;
  Is.prototype.getGeometry = Is.prototype.V;
  Is.prototype.getProperties = Is.prototype.Tm;
  Is.prototype.getType = Is.prototype.Y;
  t("ol.render.VectorContext", Ii);
  Ol.prototype.setStyle = Ol.prototype.Gd;
  Ol.prototype.drawGeometry = Ol.prototype.tc;
  Ol.prototype.drawFeature = Ol.prototype.jf;
  Ji.prototype.drawCircle = Ji.prototype.hc;
  Ji.prototype.setStyle = Ji.prototype.Gd;
  Ji.prototype.drawGeometry = Ji.prototype.tc;
  Ji.prototype.drawFeature = Ji.prototype.jf;
  t("ol.proj.common.add", Ih);
  t("ol.proj.METERS_PER_UNIT", qc);
  t("ol.proj.setProj4", function(a) {
    rc = a;
  });
  t("ol.proj.getPointResolution", xc);
  t("ol.proj.addEquivalentProjections", Ac);
  t("ol.proj.addProjection", Ic);
  t("ol.proj.addCoordinateTransforms", Kc);
  t("ol.proj.fromLonLat", function(a, b) {
    return Pc(a, "EPSG:4326", void 0 !== b ? b : "EPSG:3857");
  });
  t("ol.proj.toLonLat", function(a, b) {
    return Pc(a, void 0 !== b ? b : "EPSG:3857", "EPSG:4326");
  });
  t("ol.proj.get", zc);
  t("ol.proj.equivalent", Mc);
  t("ol.proj.getTransform", Nc);
  t("ol.proj.transform", Pc);
  t("ol.proj.transformExtent", Qc);
  t("ol.proj.Projection", sc);
  sc.prototype.getCode = sc.prototype.Zj;
  sc.prototype.getExtent = sc.prototype.G;
  sc.prototype.getUnits = sc.prototype.Eb;
  sc.prototype.getMetersPerUnit = sc.prototype.ic;
  sc.prototype.getWorldExtent = sc.prototype.Jk;
  sc.prototype.isGlobal = sc.prototype.rl;
  sc.prototype.setGlobal = sc.prototype.hp;
  sc.prototype.setExtent = sc.prototype.Sm;
  sc.prototype.setWorldExtent = sc.prototype.op;
  sc.prototype.setGetPointResolution = sc.prototype.gp;
  t("ol.proj.Units.METERS_PER_UNIT", qc);
  t("ol.layer.Base", qh);
  qh.prototype.getExtent = qh.prototype.G;
  qh.prototype.getMaxResolution = qh.prototype.Wb;
  qh.prototype.getMinResolution = qh.prototype.Xb;
  qh.prototype.getOpacity = qh.prototype.Yb;
  qh.prototype.getVisible = qh.prototype.Fb;
  qh.prototype.getZIndex = qh.prototype.Zb;
  qh.prototype.setExtent = qh.prototype.kc;
  qh.prototype.setMaxResolution = qh.prototype.pc;
  qh.prototype.setMinResolution = qh.prototype.qc;
  qh.prototype.setOpacity = qh.prototype.lc;
  qh.prototype.setVisible = qh.prototype.mc;
  qh.prototype.setZIndex = qh.prototype.nc;
  t("ol.layer.Group", yh);
  yh.prototype.getLayers = yh.prototype.cd;
  yh.prototype.setLayers = yh.prototype.yh;
  t("ol.layer.Heatmap", V);
  V.prototype.getBlur = V.prototype.Ig;
  V.prototype.getGradient = V.prototype.Pg;
  V.prototype.getRadius = V.prototype.zh;
  V.prototype.setBlur = V.prototype.ni;
  V.prototype.setGradient = V.prototype.ui;
  V.prototype.setRadius = V.prototype.Ah;
  t("ol.layer.Image", ei);
  ei.prototype.getSource = ei.prototype.la;
  t("ol.layer.Layer", Kh);
  Kh.prototype.getSource = Kh.prototype.la;
  Kh.prototype.setMap = Kh.prototype.setMap;
  Kh.prototype.setSource = Kh.prototype.Pc;
  t("ol.layer.Tile", F);
  F.prototype.getPreload = F.prototype.f;
  F.prototype.getSource = F.prototype.la;
  F.prototype.setPreload = F.prototype.l;
  F.prototype.getUseInterimTilesOnError = F.prototype.c;
  F.prototype.setUseInterimTilesOnError = F.prototype.C;
  t("ol.layer.Vector", G);
  G.prototype.getSource = G.prototype.la;
  G.prototype.getStyle = G.prototype.D;
  G.prototype.getStyleFunction = G.prototype.L;
  G.prototype.setStyle = G.prototype.l;
  t("ol.layer.VectorTile", H);
  H.prototype.getPreload = H.prototype.f;
  H.prototype.getUseInterimTilesOnError = H.prototype.c;
  H.prototype.setPreload = H.prototype.P;
  H.prototype.setUseInterimTilesOnError = H.prototype.U;
  t("ol.interaction.DoubleClickZoom", qg);
  t("ol.interaction.DoubleClickZoom.handleEvent", rg);
  t("ol.interaction.DragAndDrop", nv);
  t("ol.interaction.DragAndDrop.handleEvent", mc);
  qv.prototype.features = qv.prototype.features;
  qv.prototype.file = qv.prototype.file;
  qv.prototype.projection = qv.prototype.projection;
  t("ol.interaction.DragBox", Pg);
  Pg.prototype.getGeometry = Pg.prototype.V;
  Ug.prototype.coordinate = Ug.prototype.coordinate;
  Ug.prototype.mapBrowserEvent = Ug.prototype.mapBrowserEvent;
  t("ol.interaction.DragPan", Eg);
  t("ol.interaction.DragRotate", Ig);
  t("ol.interaction.DragRotateAndZoom", sv);
  t("ol.interaction.DragZoom", Yg);
  t("ol.interaction.Draw", Iv);
  t("ol.interaction.Draw.handleEvent", Kv);
  Iv.prototype.removeLastPoint = Iv.prototype.Vo;
  Iv.prototype.finishDrawing = Iv.prototype.zd;
  Iv.prototype.extend = Iv.prototype.vm;
  t("ol.interaction.Draw.createRegularPolygon", function(a, b) {
    return function(c, d) {
      var e = c[0],
        f = c[1],
        g = Math.sqrt(yb(e, f)),
        h = d ? d : Dd(new bv(e), a);
      Ed(h, e, g, b ? b : Math.atan((f[1] - e[1]) / (f[0] - e[0])));
      return h;
    };
  });
  t("ol.interaction.Draw.createBox", function() {
    return function(a, b) {
      var c = Gb(a),
        d = b || new E(null);
      d.qa([[Yb(c), Zb(c), $b(c), ac(c), Yb(c)]]);
      return d;
    };
  });
  Xv.prototype.feature = Xv.prototype.feature;
  t("ol.interaction.Extent", aw);
  aw.prototype.getExtent = aw.prototype.G;
  aw.prototype.setExtent = aw.prototype.i;
  lw.prototype.extent_ = lw.prototype.b;
  t("ol.interaction.defaults", ph);
  t("ol.interaction.Interaction", lg);
  lg.prototype.getActive = lg.prototype.f;
  lg.prototype.getMap = lg.prototype.c;
  lg.prototype.setActive = lg.prototype.Ea;
  t("ol.interaction.KeyboardPan", Zg);
  t("ol.interaction.KeyboardPan.handleEvent", $g);
  t("ol.interaction.KeyboardZoom", ah);
  t("ol.interaction.KeyboardZoom.handleEvent", bh);
  t("ol.interaction.Modify", nw);
  t("ol.interaction.Modify.handleEvent", qw);
  nw.prototype.removePoint = nw.prototype.ki;
  vw.prototype.features = vw.prototype.features;
  vw.prototype.mapBrowserEvent = vw.prototype.mapBrowserEvent;
  t("ol.interaction.MouseWheelZoom", ch);
  t("ol.interaction.MouseWheelZoom.handleEvent", dh);
  ch.prototype.setMouseAnchor = ch.prototype.P;
  t("ol.interaction.PinchRotate", gh);
  t("ol.interaction.PinchZoom", kh);
  t("ol.interaction.Pointer", Bg);
  t("ol.interaction.Pointer.handleEvent", Cg);
  t("ol.interaction.Select", Dw);
  Dw.prototype.getFeatures = Dw.prototype.Fm;
  Dw.prototype.getHitTolerance = Dw.prototype.Gm;
  Dw.prototype.getLayer = Dw.prototype.Hm;
  t("ol.interaction.Select.handleEvent", Ew);
  Dw.prototype.setHitTolerance = Dw.prototype.Jm;
  Dw.prototype.setMap = Dw.prototype.setMap;
  Gw.prototype.selected = Gw.prototype.selected;
  Gw.prototype.deselected = Gw.prototype.deselected;
  Gw.prototype.mapBrowserEvent = Gw.prototype.mapBrowserEvent;
  t("ol.interaction.Snap", Iw);
  Iw.prototype.addFeature = Iw.prototype.gb;
  Iw.prototype.removeFeature = Iw.prototype.rb;
  t("ol.interaction.Translate", Mw);
  Mw.prototype.getHitTolerance = Mw.prototype.D;
  Mw.prototype.setHitTolerance = Mw.prototype.L;
  Sw.prototype.features = Sw.prototype.features;
  Sw.prototype.coordinate = Sw.prototype.coordinate;
  t("ol.geom.Circle", bv);
  bv.prototype.clone = bv.prototype.clone;
  bv.prototype.getCenter = bv.prototype.Fd;
  bv.prototype.getRadius = bv.prototype.qe;
  bv.prototype.getType = bv.prototype.Y;
  bv.prototype.intersectsExtent = bv.prototype.Ta;
  bv.prototype.setCenter = bv.prototype.nm;
  bv.prototype.setCenterAndRadius = bv.prototype.dg;
  bv.prototype.setRadius = bv.prototype.om;
  bv.prototype.transform = bv.prototype.ob;
  t("ol.geom.Geometry", Rc);
  Rc.prototype.getClosestPoint = Rc.prototype.Cb;
  Rc.prototype.intersectsCoordinate = Rc.prototype.mb;
  Rc.prototype.getExtent = Rc.prototype.G;
  Rc.prototype.rotate = Rc.prototype.rotate;
  Rc.prototype.scale = Rc.prototype.scale;
  Rc.prototype.simplify = Rc.prototype.Jb;
  Rc.prototype.transform = Rc.prototype.ob;
  t("ol.geom.GeometryCollection", Vo);
  Vo.prototype.clone = Vo.prototype.clone;
  Vo.prototype.getGeometries = Vo.prototype.pf;
  Vo.prototype.getType = Vo.prototype.Y;
  Vo.prototype.intersectsExtent = Vo.prototype.Ta;
  Vo.prototype.setGeometries = Vo.prototype.ti;
  Vo.prototype.applyTransform = Vo.prototype.sc;
  Vo.prototype.translate = Vo.prototype.translate;
  t("ol.geom.LinearRing", md);
  md.prototype.clone = md.prototype.clone;
  md.prototype.getArea = md.prototype.rm;
  md.prototype.getCoordinates = md.prototype.$;
  md.prototype.getType = md.prototype.Y;
  md.prototype.setCoordinates = md.prototype.qa;
  t("ol.geom.LineString", P);
  P.prototype.appendCoordinate = P.prototype.Dj;
  P.prototype.clone = P.prototype.clone;
  P.prototype.forEachSegment = P.prototype.Sj;
  P.prototype.getCoordinateAtM = P.prototype.pm;
  P.prototype.getCoordinates = P.prototype.$;
  P.prototype.getCoordinateAt = P.prototype.Kg;
  P.prototype.getLength = P.prototype.qm;
  P.prototype.getType = P.prototype.Y;
  P.prototype.intersectsExtent = P.prototype.Ta;
  P.prototype.setCoordinates = P.prototype.qa;
  t("ol.geom.MultiLineString", Q);
  Q.prototype.appendLineString = Q.prototype.Ej;
  Q.prototype.clone = Q.prototype.clone;
  Q.prototype.getCoordinateAtM = Q.prototype.sm;
  Q.prototype.getCoordinates = Q.prototype.$;
  Q.prototype.getLineString = Q.prototype.mk;
  Q.prototype.getLineStrings = Q.prototype.Yc;
  Q.prototype.getType = Q.prototype.Y;
  Q.prototype.intersectsExtent = Q.prototype.Ta;
  Q.prototype.setCoordinates = Q.prototype.qa;
  t("ol.geom.MultiPoint", R);
  R.prototype.appendPoint = R.prototype.Gj;
  R.prototype.clone = R.prototype.clone;
  R.prototype.getCoordinates = R.prototype.$;
  R.prototype.getPoint = R.prototype.yk;
  R.prototype.getPoints = R.prototype.re;
  R.prototype.getType = R.prototype.Y;
  R.prototype.intersectsExtent = R.prototype.Ta;
  R.prototype.setCoordinates = R.prototype.qa;
  t("ol.geom.MultiPolygon", S);
  S.prototype.appendPolygon = S.prototype.Hj;
  S.prototype.clone = S.prototype.clone;
  S.prototype.getArea = S.prototype.tm;
  S.prototype.getCoordinates = S.prototype.$;
  S.prototype.getInteriorPoints = S.prototype.jk;
  S.prototype.getPolygon = S.prototype.zk;
  S.prototype.getPolygons = S.prototype.Ad;
  S.prototype.getType = S.prototype.Y;
  S.prototype.intersectsExtent = S.prototype.Ta;
  S.prototype.setCoordinates = S.prototype.qa;
  t("ol.geom.Point", C);
  C.prototype.clone = C.prototype.clone;
  C.prototype.getCoordinates = C.prototype.$;
  C.prototype.getType = C.prototype.Y;
  C.prototype.intersectsExtent = C.prototype.Ta;
  C.prototype.setCoordinates = C.prototype.qa;
  t("ol.geom.Polygon", E);
  E.prototype.appendLinearRing = E.prototype.Fj;
  E.prototype.clone = E.prototype.clone;
  E.prototype.getArea = E.prototype.um;
  E.prototype.getCoordinates = E.prototype.$;
  E.prototype.getInteriorPoint = E.prototype.ik;
  E.prototype.getLinearRingCount = E.prototype.nk;
  E.prototype.getLinearRing = E.prototype.Qg;
  E.prototype.getLinearRings = E.prototype.Zc;
  E.prototype.getType = E.prototype.Y;
  E.prototype.intersectsExtent = E.prototype.Ta;
  E.prototype.setCoordinates = E.prototype.qa;
  t("ol.geom.Polygon.circular", Bd);
  t("ol.geom.Polygon.fromExtent", Cd);
  t("ol.geom.Polygon.fromCircle", Dd);
  t("ol.geom.SimpleGeometry", Uc);
  Uc.prototype.getFirstCoordinate = Uc.prototype.Rb;
  Uc.prototype.getLastCoordinate = Uc.prototype.Sb;
  Uc.prototype.getLayout = Uc.prototype.Tb;
  Uc.prototype.applyTransform = Uc.prototype.sc;
  Uc.prototype.translate = Uc.prototype.translate;
  t("ol.format.EsriJSON", po);
  po.prototype.readFeature = po.prototype.bc;
  po.prototype.readFeatures = po.prototype.La;
  po.prototype.readGeometry = po.prototype.hd;
  po.prototype.readProjection = po.prototype.Wa;
  po.prototype.writeGeometry = po.prototype.od;
  po.prototype.writeGeometryObject = po.prototype.Te;
  po.prototype.writeFeature = po.prototype.Od;
  po.prototype.writeFeatureObject = po.prototype.md;
  po.prototype.writeFeatures = po.prototype.ec;
  po.prototype.writeFeaturesObject = po.prototype.Se;
  t("ol.format.Feature", co);
  t("ol.format.GeoJSON", Zo);
  Zo.prototype.readFeature = Zo.prototype.bc;
  Zo.prototype.readFeatures = Zo.prototype.La;
  Zo.prototype.readGeometry = Zo.prototype.hd;
  Zo.prototype.readProjection = Zo.prototype.Wa;
  Zo.prototype.writeFeature = Zo.prototype.Od;
  Zo.prototype.writeFeatureObject = Zo.prototype.md;
  Zo.prototype.writeFeatures = Zo.prototype.ec;
  Zo.prototype.writeFeaturesObject = Zo.prototype.Se;
  Zo.prototype.writeGeometry = Zo.prototype.od;
  Zo.prototype.writeGeometryObject = Zo.prototype.Te;
  t("ol.format.GML", tp);
  tp.prototype.writeFeatures = tp.prototype.ec;
  tp.prototype.writeFeaturesNode = tp.prototype.a;
  t("ol.format.GML2", Cp);
  t("ol.format.GML3", tp);
  tp.prototype.writeGeometryNode = tp.prototype.H;
  tp.prototype.writeFeatures = tp.prototype.ec;
  tp.prototype.writeFeaturesNode = tp.prototype.a;
  gp.prototype.readFeatures = gp.prototype.La;
  t("ol.format.GPX", Dp);
  Dp.prototype.readFeature = Dp.prototype.bc;
  Dp.prototype.readFeatures = Dp.prototype.La;
  Dp.prototype.readProjection = Dp.prototype.Wa;
  Dp.prototype.writeFeatures = Dp.prototype.ec;
  Dp.prototype.writeFeaturesNode = Dp.prototype.a;
  t("ol.format.IGC", nq);
  nq.prototype.readFeature = nq.prototype.bc;
  nq.prototype.readFeatures = nq.prototype.La;
  nq.prototype.readProjection = nq.prototype.Wa;
  t("ol.format.KML", Eq);
  Eq.prototype.readFeature = Eq.prototype.bc;
  Eq.prototype.readFeatures = Eq.prototype.La;
  Eq.prototype.readName = Eq.prototype.Jo;
  Eq.prototype.readNetworkLinks = Eq.prototype.Ko;
  Eq.prototype.readRegion = Eq.prototype.No;
  Eq.prototype.readRegionFromNode = Eq.prototype.Ie;
  Eq.prototype.readProjection = Eq.prototype.Wa;
  Eq.prototype.writeFeatures = Eq.prototype.ec;
  Eq.prototype.writeFeaturesNode = Eq.prototype.a;
  t("ol.format.MVT", Js);
  Js.prototype.readFeatures = Js.prototype.La;
  Js.prototype.readProjection = Js.prototype.Wa;
  Js.prototype.setLayers = Js.prototype.c;
  t("ol.format.OSMXML", Ls);
  Ls.prototype.readFeatures = Ls.prototype.La;
  Ls.prototype.readProjection = Ls.prototype.Wa;
  t("ol.format.Polyline", jt);
  t("ol.format.Polyline.encodeDeltas", kt);
  t("ol.format.Polyline.decodeDeltas", mt);
  t("ol.format.Polyline.encodeFloats", lt);
  t("ol.format.Polyline.decodeFloats", nt);
  jt.prototype.readFeature = jt.prototype.bc;
  jt.prototype.readFeatures = jt.prototype.La;
  jt.prototype.readGeometry = jt.prototype.hd;
  jt.prototype.readProjection = jt.prototype.Wa;
  jt.prototype.writeGeometry = jt.prototype.od;
  t("ol.format.TopoJSON", ot);
  ot.prototype.readFeatures = ot.prototype.La;
  ot.prototype.readProjection = ot.prototype.Wa;
  t("ol.format.WFS", ut);
  ut.prototype.readFeatures = ut.prototype.La;
  ut.prototype.readTransactionResponse = ut.prototype.o;
  ut.prototype.readFeatureCollectionMetadata = ut.prototype.l;
  ut.prototype.writeGetFeature = ut.prototype.v;
  ut.prototype.writeTransaction = ut.prototype.A;
  ut.prototype.readProjection = ut.prototype.Wa;
  t("ol.format.WKT", Mt);
  Mt.prototype.readFeature = Mt.prototype.bc;
  Mt.prototype.readFeatures = Mt.prototype.La;
  Mt.prototype.readGeometry = Mt.prototype.hd;
  Mt.prototype.writeFeature = Mt.prototype.Od;
  Mt.prototype.writeFeatures = Mt.prototype.ec;
  Mt.prototype.writeGeometry = Mt.prototype.od;
  t("ol.format.WMSCapabilities", eu);
  eu.prototype.read = eu.prototype.read;
  t("ol.format.WMSGetFeatureInfo", Bu);
  Bu.prototype.readFeatures = Bu.prototype.La;
  t("ol.format.WMTSCapabilities", Cu);
  Cu.prototype.read = Cu.prototype.read;
  t("ol.format.filter.And", Bo);
  t("ol.format.filter.Bbox", Co);
  t("ol.format.filter.Comparison", Do);
  t("ol.format.filter.ComparisonBinary", Eo);
  t("ol.format.filter.EqualTo", Fo);
  t("ol.format.filter.Filter", wo);
  t("ol.format.filter.GreaterThan", Go);
  t("ol.format.filter.GreaterThanOrEqualTo", Ho);
  t("ol.format.filter.and", To);
  t("ol.format.filter.or", function(a, b) {
    return new Ro(a, b);
  });
  t("ol.format.filter.not", function(a) {
    return new Po(a);
  });
  t("ol.format.filter.bbox", Uo);
  t("ol.format.filter.intersects", function(a, b, c) {
    return new Jo(a, b, c);
  });
  t("ol.format.filter.within", function(a, b, c) {
    return new So(a, b, c);
  });
  t("ol.format.filter.equalTo", function(a, b, c) {
    return new Fo(a, b, c);
  });
  t("ol.format.filter.notEqualTo", function(a, b, c) {
    return new Qo(a, b, c);
  });
  t("ol.format.filter.lessThan", function(a, b) {
    return new No(a, b);
  });
  t("ol.format.filter.lessThanOrEqualTo", function(a, b) {
    return new Oo(a, b);
  });
  t("ol.format.filter.greaterThan", function(a, b) {
    return new Go(a, b);
  });
  t("ol.format.filter.greaterThanOrEqualTo", function(a, b) {
    return new Ho(a, b);
  });
  t("ol.format.filter.isNull", function(a) {
    return new Mo(a);
  });
  t("ol.format.filter.between", function(a, b, c) {
    return new Ko(a, b, c);
  });
  t("ol.format.filter.like", function(a, b, c, d, e, f) {
    return new Lo(a, b, c, d, e, f);
  });
  t("ol.format.filter.Intersects", Jo);
  t("ol.format.filter.IsBetween", Ko);
  t("ol.format.filter.IsLike", Lo);
  t("ol.format.filter.IsNull", Mo);
  t("ol.format.filter.LessThan", No);
  t("ol.format.filter.LessThanOrEqualTo", Oo);
  t("ol.format.filter.Not", Po);
  t("ol.format.filter.NotEqualTo", Qo);
  t("ol.format.filter.Or", Ro);
  t("ol.format.filter.Spatial", Io);
  t("ol.format.filter.Within", So);
  t("ol.extent.boundingExtent", Gb);
  t("ol.extent.buffer", Jb);
  t("ol.extent.containsCoordinate", Mb);
  t("ol.extent.containsExtent", Ob);
  t("ol.extent.containsXY", Nb);
  t("ol.extent.createEmpty", Hb);
  t("ol.extent.equals", Vb);
  t("ol.extent.extend", Wb);
  t("ol.extent.getBottomLeft", Yb);
  t("ol.extent.getBottomRight", Zb);
  t("ol.extent.getCenter", gc);
  t("ol.extent.getHeight", ec);
  t("ol.extent.getIntersection", ic);
  t("ol.extent.getSize", function(a) {
    return [a[2] - a[0], a[3] - a[1]];
  });
  t("ol.extent.getTopLeft", ac);
  t("ol.extent.getTopRight", $b);
  t("ol.extent.getWidth", dc);
  t("ol.extent.intersects", jc);
  t("ol.extent.isEmpty", cc);
  t("ol.extent.applyTransform", lc);
  t("ol.events.condition.altKeyOnly", function(a) {
    a = a.originalEvent;
    return a.altKey && !(a.metaKey || a.ctrlKey) && !a.shiftKey;
  });
  t("ol.events.condition.altShiftKeysOnly", sg);
  t("ol.events.condition.always", mc);
  t("ol.events.condition.click", function(a) {
    return "click" == a.type;
  });
  t("ol.events.condition.never", nc);
  t("ol.events.condition.pointerMove", ug);
  t("ol.events.condition.singleClick", vg);
  t("ol.events.condition.doubleClick", function(a) {
    return "dblclick" == a.type;
  });
  t("ol.events.condition.noModifierKeys", wg);
  t("ol.events.condition.platformModifierKeyOnly", function(a) {
    a = a.originalEvent;
    return !a.altKey && (lf ? a.metaKey : a.ctrlKey) && !a.shiftKey;
  });
  t("ol.events.condition.shiftKeyOnly", xg);
  t("ol.events.condition.targetNotEditable", yg);
  t("ol.events.condition.mouseOnly", zg);
  t("ol.events.condition.primaryAction", Ag);
  Ia.prototype.type = Ia.prototype.type;
  Ia.prototype.target = Ia.prototype.target;
  Ia.prototype.preventDefault = Ia.prototype.preventDefault;
  Ia.prototype.stopPropagation = Ia.prototype.stopPropagation;
  t("ol.control.Attribution", Je);
  t("ol.control.Attribution.render", Ke);
  Je.prototype.getCollapsible = Je.prototype.dm;
  Je.prototype.setCollapsible = Je.prototype.gm;
  Je.prototype.setCollapsed = Je.prototype.fm;
  Je.prototype.getCollapsed = Je.prototype.cm;
  t("ol.control.Control", Ie);
  Ie.prototype.getMap = Ie.prototype.i;
  Ie.prototype.setMap = Ie.prototype.setMap;
  Ie.prototype.setTarget = Ie.prototype.c;
  t("ol.control.FullScreen", Me);
  t("ol.control.defaults", Ue);
  t("ol.control.MousePosition", Ve);
  t("ol.control.MousePosition.render", We);
  Ve.prototype.getCoordinateFormat = Ve.prototype.Lg;
  Ve.prototype.getProjection = Ve.prototype.rh;
  Ve.prototype.setCoordinateFormat = Ve.prototype.oi;
  Ve.prototype.setProjection = Ve.prototype.sh;
  t("ol.control.OverviewMap", gn);
  t("ol.control.OverviewMap.render", hn);
  gn.prototype.getCollapsible = gn.prototype.jm;
  gn.prototype.setCollapsible = gn.prototype.mm;
  gn.prototype.setCollapsed = gn.prototype.lm;
  gn.prototype.getCollapsed = gn.prototype.im;
  gn.prototype.getOverviewMap = gn.prototype.wk;
  t("ol.control.Rotate", Re);
  t("ol.control.Rotate.render", Se);
  t("ol.control.ScaleLine", mn);
  mn.prototype.getUnits = mn.prototype.Eb;
  t("ol.control.ScaleLine.render", nn);
  mn.prototype.setUnits = mn.prototype.D;
  t("ol.control.Zoom", Te);
  t("ol.control.ZoomSlider", wn);
  t("ol.control.ZoomSlider.render", yn);
  t("ol.control.ZoomToExtent", Bn);
  Sa.prototype.changed = Sa.prototype.s;
  Sa.prototype.dispatchEvent = Sa.prototype.b;
  Sa.prototype.getRevision = Sa.prototype.M;
  Sa.prototype.on = Sa.prototype.J;
  Sa.prototype.once = Sa.prototype.N;
  Sa.prototype.un = Sa.prototype.K;
  Sa.prototype.unByKey = Sa.prototype.O;
  qe.prototype.get = qe.prototype.get;
  qe.prototype.getKeys = qe.prototype.S;
  qe.prototype.getProperties = qe.prototype.R;
  qe.prototype.set = qe.prototype.set;
  qe.prototype.setProperties = qe.prototype.I;
  qe.prototype.unset = qe.prototype.T;
  qe.prototype.changed = qe.prototype.s;
  qe.prototype.dispatchEvent = qe.prototype.b;
  qe.prototype.getRevision = qe.prototype.M;
  qe.prototype.on = qe.prototype.J;
  qe.prototype.once = qe.prototype.N;
  qe.prototype.un = qe.prototype.K;
  qe.prototype.unByKey = qe.prototype.O;
  te.prototype.type = te.prototype.type;
  te.prototype.target = te.prototype.target;
  te.prototype.preventDefault = te.prototype.preventDefault;
  te.prototype.stopPropagation = te.prototype.stopPropagation;
  Cn.prototype.get = Cn.prototype.get;
  Cn.prototype.getKeys = Cn.prototype.S;
  Cn.prototype.getProperties = Cn.prototype.R;
  Cn.prototype.set = Cn.prototype.set;
  Cn.prototype.setProperties = Cn.prototype.I;
  Cn.prototype.unset = Cn.prototype.T;
  Cn.prototype.changed = Cn.prototype.s;
  Cn.prototype.dispatchEvent = Cn.prototype.b;
  Cn.prototype.getRevision = Cn.prototype.M;
  Cn.prototype.on = Cn.prototype.J;
  Cn.prototype.once = Cn.prototype.N;
  Cn.prototype.un = Cn.prototype.K;
  Cn.prototype.unByKey = Cn.prototype.O;
  J.prototype.get = J.prototype.get;
  J.prototype.getKeys = J.prototype.S;
  J.prototype.getProperties = J.prototype.R;
  J.prototype.set = J.prototype.set;
  J.prototype.setProperties = J.prototype.I;
  J.prototype.unset = J.prototype.T;
  J.prototype.changed = J.prototype.s;
  J.prototype.dispatchEvent = J.prototype.b;
  J.prototype.getRevision = J.prototype.M;
  J.prototype.on = J.prototype.J;
  J.prototype.once = J.prototype.N;
  J.prototype.un = J.prototype.K;
  J.prototype.unByKey = J.prototype.O;
  Ru.prototype.get = Ru.prototype.get;
  Ru.prototype.getKeys = Ru.prototype.S;
  Ru.prototype.getProperties = Ru.prototype.R;
  Ru.prototype.set = Ru.prototype.set;
  Ru.prototype.setProperties = Ru.prototype.I;
  Ru.prototype.unset = Ru.prototype.T;
  Ru.prototype.changed = Ru.prototype.s;
  Ru.prototype.dispatchEvent = Ru.prototype.b;
  Ru.prototype.getRevision = Ru.prototype.M;
  Ru.prototype.on = Ru.prototype.J;
  Ru.prototype.once = Ru.prototype.N;
  Ru.prototype.un = Ru.prototype.K;
  Ru.prototype.unByKey = Ru.prototype.O;
  lv.prototype.getTileCoord = lv.prototype.c;
  I.prototype.get = I.prototype.get;
  I.prototype.getKeys = I.prototype.S;
  I.prototype.getProperties = I.prototype.R;
  I.prototype.set = I.prototype.set;
  I.prototype.setProperties = I.prototype.I;
  I.prototype.unset = I.prototype.T;
  I.prototype.changed = I.prototype.s;
  I.prototype.dispatchEvent = I.prototype.b;
  I.prototype.getRevision = I.prototype.M;
  I.prototype.on = I.prototype.J;
  I.prototype.once = I.prototype.N;
  I.prototype.un = I.prototype.K;
  I.prototype.unByKey = I.prototype.O;
  Ge.prototype.type = Ge.prototype.type;
  Ge.prototype.target = Ge.prototype.target;
  Ge.prototype.preventDefault = Ge.prototype.preventDefault;
  Ge.prototype.stopPropagation = Ge.prototype.stopPropagation;
  $e.prototype.map = $e.prototype.map;
  $e.prototype.frameState = $e.prototype.frameState;
  $e.prototype.type = $e.prototype.type;
  $e.prototype.target = $e.prototype.target;
  $e.prototype.preventDefault = $e.prototype.preventDefault;
  $e.prototype.stopPropagation = $e.prototype.stopPropagation;
  cf.prototype.originalEvent = cf.prototype.originalEvent;
  cf.prototype.pixel = cf.prototype.pixel;
  cf.prototype.coordinate = cf.prototype.coordinate;
  cf.prototype.dragging = cf.prototype.dragging;
  cf.prototype.preventDefault = cf.prototype.preventDefault;
  cf.prototype.stopPropagation = cf.prototype.stopPropagation;
  cf.prototype.map = cf.prototype.map;
  cf.prototype.frameState = cf.prototype.frameState;
  cf.prototype.type = cf.prototype.type;
  cf.prototype.target = cf.prototype.target;
  Wa.prototype.type = Wa.prototype.type;
  Wa.prototype.target = Wa.prototype.target;
  Wa.prototype.preventDefault = Wa.prototype.preventDefault;
  Wa.prototype.stopPropagation = Wa.prototype.stopPropagation;
  Pm.prototype.get = Pm.prototype.get;
  Pm.prototype.getKeys = Pm.prototype.S;
  Pm.prototype.getProperties = Pm.prototype.R;
  Pm.prototype.set = Pm.prototype.set;
  Pm.prototype.setProperties = Pm.prototype.I;
  Pm.prototype.unset = Pm.prototype.T;
  Pm.prototype.changed = Pm.prototype.s;
  Pm.prototype.dispatchEvent = Pm.prototype.b;
  Pm.prototype.getRevision = Pm.prototype.M;
  Pm.prototype.on = Pm.prototype.J;
  Pm.prototype.once = Pm.prototype.N;
  Pm.prototype.un = Pm.prototype.K;
  Pm.prototype.unByKey = Pm.prototype.O;
  jy.prototype.getTileCoord = jy.prototype.c;
  Fd.prototype.get = Fd.prototype.get;
  Fd.prototype.getKeys = Fd.prototype.S;
  Fd.prototype.getProperties = Fd.prototype.R;
  Fd.prototype.set = Fd.prototype.set;
  Fd.prototype.setProperties = Fd.prototype.I;
  Fd.prototype.unset = Fd.prototype.T;
  Fd.prototype.changed = Fd.prototype.s;
  Fd.prototype.dispatchEvent = Fd.prototype.b;
  Fd.prototype.getRevision = Fd.prototype.M;
  Fd.prototype.on = Fd.prototype.J;
  Fd.prototype.once = Fd.prototype.N;
  Fd.prototype.un = Fd.prototype.K;
  Fd.prototype.unByKey = Fd.prototype.O;
  my.prototype.forEachTileCoord = my.prototype.Hg;
  my.prototype.getMaxZoom = my.prototype.Rg;
  my.prototype.getMinZoom = my.prototype.Sg;
  my.prototype.getOrigin = my.prototype.Kc;
  my.prototype.getResolution = my.prototype.Ha;
  my.prototype.getResolutions = my.prototype.Wh;
  my.prototype.getTileCoordExtent = my.prototype.Na;
  my.prototype.getTileCoordForCoordAndResolution = my.prototype.fe;
  my.prototype.getTileCoordForCoordAndZ = my.prototype.wf;
  my.prototype.getTileSize = my.prototype.Za;
  my.prototype.getZForResolution = my.prototype.Ec;
  si.prototype.getOpacity = si.prototype.ye;
  si.prototype.getRotateWithView = si.prototype.ze;
  si.prototype.getRotation = si.prototype.Ae;
  si.prototype.getScale = si.prototype.Be;
  si.prototype.getSnapToPixel = si.prototype.ee;
  si.prototype.setOpacity = si.prototype.dd;
  si.prototype.setRotation = si.prototype.Ce;
  si.prototype.setScale = si.prototype.ed;
  ui.prototype.getAngle = ui.prototype.Nh;
  ui.prototype.getFill = ui.prototype.Oh;
  ui.prototype.getPoints = ui.prototype.Ph;
  ui.prototype.getRadius = ui.prototype.Qh;
  ui.prototype.getRadius2 = ui.prototype.Vg;
  ui.prototype.getStroke = ui.prototype.Rh;
  ui.prototype.getOpacity = ui.prototype.ye;
  ui.prototype.getRotateWithView = ui.prototype.ze;
  ui.prototype.getRotation = ui.prototype.Ae;
  ui.prototype.getScale = ui.prototype.Be;
  ui.prototype.getSnapToPixel = ui.prototype.ee;
  ui.prototype.setOpacity = ui.prototype.dd;
  ui.prototype.setRotation = ui.prototype.Ce;
  ui.prototype.setScale = ui.prototype.ed;
  xq.prototype.getOpacity = xq.prototype.ye;
  xq.prototype.getRotateWithView = xq.prototype.ze;
  xq.prototype.getRotation = xq.prototype.Ae;
  xq.prototype.getScale = xq.prototype.Be;
  xq.prototype.getSnapToPixel = xq.prototype.ee;
  xq.prototype.setOpacity = xq.prototype.dd;
  xq.prototype.setRotation = xq.prototype.Ce;
  xq.prototype.setScale = xq.prototype.ed;
  hm.prototype.get = hm.prototype.get;
  hm.prototype.getKeys = hm.prototype.S;
  hm.prototype.getProperties = hm.prototype.R;
  hm.prototype.set = hm.prototype.set;
  hm.prototype.setProperties = hm.prototype.I;
  hm.prototype.unset = hm.prototype.T;
  hm.prototype.changed = hm.prototype.s;
  hm.prototype.dispatchEvent = hm.prototype.b;
  hm.prototype.getRevision = hm.prototype.M;
  hm.prototype.on = hm.prototype.J;
  hm.prototype.once = hm.prototype.N;
  hm.prototype.un = hm.prototype.K;
  hm.prototype.unByKey = hm.prototype.O;
  ix.prototype.getAttributions = ix.prototype.za;
  ix.prototype.getLogo = ix.prototype.ya;
  ix.prototype.getProjection = ix.prototype.Aa;
  ix.prototype.getState = ix.prototype.W;
  ix.prototype.refresh = ix.prototype.wa;
  ix.prototype.setAttributions = ix.prototype.ua;
  ix.prototype.get = ix.prototype.get;
  ix.prototype.getKeys = ix.prototype.S;
  ix.prototype.getProperties = ix.prototype.R;
  ix.prototype.set = ix.prototype.set;
  ix.prototype.setProperties = ix.prototype.I;
  ix.prototype.unset = ix.prototype.T;
  ix.prototype.changed = ix.prototype.s;
  ix.prototype.dispatchEvent = ix.prototype.b;
  ix.prototype.getRevision = ix.prototype.M;
  ix.prototype.on = ix.prototype.J;
  ix.prototype.once = ix.prototype.N;
  ix.prototype.un = ix.prototype.K;
  ix.prototype.unByKey = ix.prototype.O;
  mx.prototype.getTileGrid = mx.prototype.Va;
  mx.prototype.refresh = mx.prototype.wa;
  mx.prototype.getAttributions = mx.prototype.za;
  mx.prototype.getLogo = mx.prototype.ya;
  mx.prototype.getProjection = mx.prototype.Aa;
  mx.prototype.getState = mx.prototype.W;
  mx.prototype.setAttributions = mx.prototype.ua;
  mx.prototype.get = mx.prototype.get;
  mx.prototype.getKeys = mx.prototype.S;
  mx.prototype.getProperties = mx.prototype.R;
  mx.prototype.set = mx.prototype.set;
  mx.prototype.setProperties = mx.prototype.I;
  mx.prototype.unset = mx.prototype.T;
  mx.prototype.changed = mx.prototype.s;
  mx.prototype.dispatchEvent = mx.prototype.b;
  mx.prototype.getRevision = mx.prototype.M;
  mx.prototype.on = mx.prototype.J;
  mx.prototype.once = mx.prototype.N;
  mx.prototype.un = mx.prototype.K;
  mx.prototype.unByKey = mx.prototype.O;
  X.prototype.getTileLoadFunction = X.prototype.ib;
  X.prototype.getTileUrlFunction = X.prototype.kb;
  X.prototype.getUrls = X.prototype.lb;
  X.prototype.setTileLoadFunction = X.prototype.sb;
  X.prototype.setTileUrlFunction = X.prototype.Xa;
  X.prototype.setUrl = X.prototype.cb;
  X.prototype.setUrls = X.prototype.Ya;
  X.prototype.getTileGrid = X.prototype.Va;
  X.prototype.refresh = X.prototype.wa;
  X.prototype.getAttributions = X.prototype.za;
  X.prototype.getLogo = X.prototype.ya;
  X.prototype.getProjection = X.prototype.Aa;
  X.prototype.getState = X.prototype.W;
  X.prototype.setAttributions = X.prototype.ua;
  X.prototype.get = X.prototype.get;
  X.prototype.getKeys = X.prototype.S;
  X.prototype.getProperties = X.prototype.R;
  X.prototype.set = X.prototype.set;
  X.prototype.setProperties = X.prototype.I;
  X.prototype.unset = X.prototype.T;
  X.prototype.changed = X.prototype.s;
  X.prototype.dispatchEvent = X.prototype.b;
  X.prototype.getRevision = X.prototype.M;
  X.prototype.on = X.prototype.J;
  X.prototype.once = X.prototype.N;
  X.prototype.un = X.prototype.K;
  X.prototype.unByKey = X.prototype.O;
  qx.prototype.setRenderReprojectionEdges = qx.prototype.Hb;
  qx.prototype.setTileGridForProjection = qx.prototype.Ib;
  qx.prototype.getTileLoadFunction = qx.prototype.ib;
  qx.prototype.getTileUrlFunction = qx.prototype.kb;
  qx.prototype.getUrls = qx.prototype.lb;
  qx.prototype.setTileLoadFunction = qx.prototype.sb;
  qx.prototype.setTileUrlFunction = qx.prototype.Xa;
  qx.prototype.setUrl = qx.prototype.cb;
  qx.prototype.setUrls = qx.prototype.Ya;
  qx.prototype.getTileGrid = qx.prototype.Va;
  qx.prototype.refresh = qx.prototype.wa;
  qx.prototype.getAttributions = qx.prototype.za;
  qx.prototype.getLogo = qx.prototype.ya;
  qx.prototype.getProjection = qx.prototype.Aa;
  qx.prototype.getState = qx.prototype.W;
  qx.prototype.setAttributions = qx.prototype.ua;
  qx.prototype.get = qx.prototype.get;
  qx.prototype.getKeys = qx.prototype.S;
  qx.prototype.getProperties = qx.prototype.R;
  qx.prototype.set = qx.prototype.set;
  qx.prototype.setProperties = qx.prototype.I;
  qx.prototype.unset = qx.prototype.T;
  qx.prototype.changed = qx.prototype.s;
  qx.prototype.dispatchEvent = qx.prototype.b;
  qx.prototype.getRevision = qx.prototype.M;
  qx.prototype.on = qx.prototype.J;
  qx.prototype.once = qx.prototype.N;
  qx.prototype.un = qx.prototype.K;
  qx.prototype.unByKey = qx.prototype.O;
  sx.prototype.setRenderReprojectionEdges = sx.prototype.Hb;
  sx.prototype.setTileGridForProjection = sx.prototype.Ib;
  sx.prototype.getTileLoadFunction = sx.prototype.ib;
  sx.prototype.getTileUrlFunction = sx.prototype.kb;
  sx.prototype.getUrls = sx.prototype.lb;
  sx.prototype.setTileLoadFunction = sx.prototype.sb;
  sx.prototype.setTileUrlFunction = sx.prototype.Xa;
  sx.prototype.setUrl = sx.prototype.cb;
  sx.prototype.setUrls = sx.prototype.Ya;
  sx.prototype.getTileGrid = sx.prototype.Va;
  sx.prototype.refresh = sx.prototype.wa;
  sx.prototype.getAttributions = sx.prototype.za;
  sx.prototype.getLogo = sx.prototype.ya;
  sx.prototype.getProjection = sx.prototype.Aa;
  sx.prototype.getState = sx.prototype.W;
  sx.prototype.setAttributions = sx.prototype.ua;
  sx.prototype.get = sx.prototype.get;
  sx.prototype.getKeys = sx.prototype.S;
  sx.prototype.getProperties = sx.prototype.R;
  sx.prototype.set = sx.prototype.set;
  sx.prototype.setProperties = sx.prototype.I;
  sx.prototype.unset = sx.prototype.T;
  sx.prototype.changed = sx.prototype.s;
  sx.prototype.dispatchEvent = sx.prototype.b;
  sx.prototype.getRevision = sx.prototype.M;
  sx.prototype.on = sx.prototype.J;
  sx.prototype.once = sx.prototype.N;
  sx.prototype.un = sx.prototype.K;
  sx.prototype.unByKey = sx.prototype.O;
  tx.prototype.setRenderReprojectionEdges = tx.prototype.Hb;
  tx.prototype.setTileGridForProjection = tx.prototype.Ib;
  tx.prototype.getTileLoadFunction = tx.prototype.ib;
  tx.prototype.getTileUrlFunction = tx.prototype.kb;
  tx.prototype.getUrls = tx.prototype.lb;
  tx.prototype.setTileLoadFunction = tx.prototype.sb;
  tx.prototype.setTileUrlFunction = tx.prototype.Xa;
  tx.prototype.setUrl = tx.prototype.cb;
  tx.prototype.setUrls = tx.prototype.Ya;
  tx.prototype.getTileGrid = tx.prototype.Va;
  tx.prototype.refresh = tx.prototype.wa;
  tx.prototype.getAttributions = tx.prototype.za;
  tx.prototype.getLogo = tx.prototype.ya;
  tx.prototype.getProjection = tx.prototype.Aa;
  tx.prototype.getState = tx.prototype.W;
  tx.prototype.setAttributions = tx.prototype.ua;
  tx.prototype.get = tx.prototype.get;
  tx.prototype.getKeys = tx.prototype.S;
  tx.prototype.getProperties = tx.prototype.R;
  tx.prototype.set = tx.prototype.set;
  tx.prototype.setProperties = tx.prototype.I;
  tx.prototype.unset = tx.prototype.T;
  tx.prototype.changed = tx.prototype.s;
  tx.prototype.dispatchEvent = tx.prototype.b;
  tx.prototype.getRevision = tx.prototype.M;
  tx.prototype.on = tx.prototype.J;
  tx.prototype.once = tx.prototype.N;
  tx.prototype.un = tx.prototype.K;
  tx.prototype.unByKey = tx.prototype.O;
  U.prototype.getAttributions = U.prototype.za;
  U.prototype.getLogo = U.prototype.ya;
  U.prototype.getProjection = U.prototype.Aa;
  U.prototype.getState = U.prototype.W;
  U.prototype.refresh = U.prototype.wa;
  U.prototype.setAttributions = U.prototype.ua;
  U.prototype.get = U.prototype.get;
  U.prototype.getKeys = U.prototype.S;
  U.prototype.getProperties = U.prototype.R;
  U.prototype.set = U.prototype.set;
  U.prototype.setProperties = U.prototype.I;
  U.prototype.unset = U.prototype.T;
  U.prototype.changed = U.prototype.s;
  U.prototype.dispatchEvent = U.prototype.b;
  U.prototype.getRevision = U.prototype.M;
  U.prototype.on = U.prototype.J;
  U.prototype.once = U.prototype.N;
  U.prototype.un = U.prototype.K;
  U.prototype.unByKey = U.prototype.O;
  Y.prototype.addFeature = Y.prototype.gb;
  Y.prototype.addFeatures = Y.prototype.Tc;
  Y.prototype.clear = Y.prototype.clear;
  Y.prototype.forEachFeature = Y.prototype.Fg;
  Y.prototype.forEachFeatureInExtent = Y.prototype.Qb;
  Y.prototype.forEachFeatureIntersectingExtent = Y.prototype.Gg;
  Y.prototype.getFeaturesCollection = Y.prototype.Og;
  Y.prototype.getFeatures = Y.prototype.we;
  Y.prototype.getFeaturesAtCoordinate = Y.prototype.Ng;
  Y.prototype.getFeaturesInExtent = Y.prototype.nf;
  Y.prototype.getClosestFeatureToCoordinate = Y.prototype.Jg;
  Y.prototype.getExtent = Y.prototype.G;
  Y.prototype.getFeatureById = Y.prototype.Mg;
  Y.prototype.getFormat = Y.prototype.Kh;
  Y.prototype.getUrl = Y.prototype.Lh;
  Y.prototype.removeFeature = Y.prototype.rb;
  Y.prototype.getAttributions = Y.prototype.za;
  Y.prototype.getLogo = Y.prototype.ya;
  Y.prototype.getProjection = Y.prototype.Aa;
  Y.prototype.getState = Y.prototype.W;
  Y.prototype.refresh = Y.prototype.wa;
  Y.prototype.setAttributions = Y.prototype.ua;
  Y.prototype.get = Y.prototype.get;
  Y.prototype.getKeys = Y.prototype.S;
  Y.prototype.getProperties = Y.prototype.R;
  Y.prototype.set = Y.prototype.set;
  Y.prototype.setProperties = Y.prototype.I;
  Y.prototype.unset = Y.prototype.T;
  Y.prototype.changed = Y.prototype.s;
  Y.prototype.dispatchEvent = Y.prototype.b;
  Y.prototype.getRevision = Y.prototype.M;
  Y.prototype.on = Y.prototype.J;
  Y.prototype.once = Y.prototype.N;
  Y.prototype.un = Y.prototype.K;
  Y.prototype.unByKey = Y.prototype.O;
  km.prototype.getAttributions = km.prototype.za;
  km.prototype.getLogo = km.prototype.ya;
  km.prototype.getProjection = km.prototype.Aa;
  km.prototype.getState = km.prototype.W;
  km.prototype.refresh = km.prototype.wa;
  km.prototype.setAttributions = km.prototype.ua;
  km.prototype.get = km.prototype.get;
  km.prototype.getKeys = km.prototype.S;
  km.prototype.getProperties = km.prototype.R;
  km.prototype.set = km.prototype.set;
  km.prototype.setProperties = km.prototype.I;
  km.prototype.unset = km.prototype.T;
  km.prototype.changed = km.prototype.s;
  km.prototype.dispatchEvent = km.prototype.b;
  km.prototype.getRevision = km.prototype.M;
  km.prototype.on = km.prototype.J;
  km.prototype.once = km.prototype.N;
  km.prototype.un = km.prototype.K;
  km.prototype.unByKey = km.prototype.O;
  mm.prototype.type = mm.prototype.type;
  mm.prototype.target = mm.prototype.target;
  mm.prototype.preventDefault = mm.prototype.preventDefault;
  mm.prototype.stopPropagation = mm.prototype.stopPropagation;
  zx.prototype.getAttributions = zx.prototype.za;
  zx.prototype.getLogo = zx.prototype.ya;
  zx.prototype.getProjection = zx.prototype.Aa;
  zx.prototype.getState = zx.prototype.W;
  zx.prototype.refresh = zx.prototype.wa;
  zx.prototype.setAttributions = zx.prototype.ua;
  zx.prototype.get = zx.prototype.get;
  zx.prototype.getKeys = zx.prototype.S;
  zx.prototype.getProperties = zx.prototype.R;
  zx.prototype.set = zx.prototype.set;
  zx.prototype.setProperties = zx.prototype.I;
  zx.prototype.unset = zx.prototype.T;
  zx.prototype.changed = zx.prototype.s;
  zx.prototype.dispatchEvent = zx.prototype.b;
  zx.prototype.getRevision = zx.prototype.M;
  zx.prototype.on = zx.prototype.J;
  zx.prototype.once = zx.prototype.N;
  zx.prototype.un = zx.prototype.K;
  zx.prototype.unByKey = zx.prototype.O;
  rm.prototype.getAttributions = rm.prototype.za;
  rm.prototype.getLogo = rm.prototype.ya;
  rm.prototype.getProjection = rm.prototype.Aa;
  rm.prototype.getState = rm.prototype.W;
  rm.prototype.refresh = rm.prototype.wa;
  rm.prototype.setAttributions = rm.prototype.ua;
  rm.prototype.get = rm.prototype.get;
  rm.prototype.getKeys = rm.prototype.S;
  rm.prototype.getProperties = rm.prototype.R;
  rm.prototype.set = rm.prototype.set;
  rm.prototype.setProperties = rm.prototype.I;
  rm.prototype.unset = rm.prototype.T;
  rm.prototype.changed = rm.prototype.s;
  rm.prototype.dispatchEvent = rm.prototype.b;
  rm.prototype.getRevision = rm.prototype.M;
  rm.prototype.on = rm.prototype.J;
  rm.prototype.once = rm.prototype.N;
  rm.prototype.un = rm.prototype.K;
  rm.prototype.unByKey = rm.prototype.O;
  Ax.prototype.getAttributions = Ax.prototype.za;
  Ax.prototype.getLogo = Ax.prototype.ya;
  Ax.prototype.getProjection = Ax.prototype.Aa;
  Ax.prototype.getState = Ax.prototype.W;
  Ax.prototype.refresh = Ax.prototype.wa;
  Ax.prototype.setAttributions = Ax.prototype.ua;
  Ax.prototype.get = Ax.prototype.get;
  Ax.prototype.getKeys = Ax.prototype.S;
  Ax.prototype.getProperties = Ax.prototype.R;
  Ax.prototype.set = Ax.prototype.set;
  Ax.prototype.setProperties = Ax.prototype.I;
  Ax.prototype.unset = Ax.prototype.T;
  Ax.prototype.changed = Ax.prototype.s;
  Ax.prototype.dispatchEvent = Ax.prototype.b;
  Ax.prototype.getRevision = Ax.prototype.M;
  Ax.prototype.on = Ax.prototype.J;
  Ax.prototype.once = Ax.prototype.N;
  Ax.prototype.un = Ax.prototype.K;
  Ax.prototype.unByKey = Ax.prototype.O;
  Bx.prototype.getAttributions = Bx.prototype.za;
  Bx.prototype.getLogo = Bx.prototype.ya;
  Bx.prototype.getProjection = Bx.prototype.Aa;
  Bx.prototype.getState = Bx.prototype.W;
  Bx.prototype.refresh = Bx.prototype.wa;
  Bx.prototype.setAttributions = Bx.prototype.ua;
  Bx.prototype.get = Bx.prototype.get;
  Bx.prototype.getKeys = Bx.prototype.S;
  Bx.prototype.getProperties = Bx.prototype.R;
  Bx.prototype.set = Bx.prototype.set;
  Bx.prototype.setProperties = Bx.prototype.I;
  Bx.prototype.unset = Bx.prototype.T;
  Bx.prototype.changed = Bx.prototype.s;
  Bx.prototype.dispatchEvent = Bx.prototype.b;
  Bx.prototype.getRevision = Bx.prototype.M;
  Bx.prototype.on = Bx.prototype.J;
  Bx.prototype.once = Bx.prototype.N;
  Bx.prototype.un = Bx.prototype.K;
  Bx.prototype.unByKey = Bx.prototype.O;
  sm.prototype.getAttributions = sm.prototype.za;
  sm.prototype.getLogo = sm.prototype.ya;
  sm.prototype.getProjection = sm.prototype.Aa;
  sm.prototype.getState = sm.prototype.W;
  sm.prototype.refresh = sm.prototype.wa;
  sm.prototype.setAttributions = sm.prototype.ua;
  sm.prototype.get = sm.prototype.get;
  sm.prototype.getKeys = sm.prototype.S;
  sm.prototype.getProperties = sm.prototype.R;
  sm.prototype.set = sm.prototype.set;
  sm.prototype.setProperties = sm.prototype.I;
  sm.prototype.unset = sm.prototype.T;
  sm.prototype.changed = sm.prototype.s;
  sm.prototype.dispatchEvent = sm.prototype.b;
  sm.prototype.getRevision = sm.prototype.M;
  sm.prototype.on = sm.prototype.J;
  sm.prototype.once = sm.prototype.N;
  sm.prototype.un = sm.prototype.K;
  sm.prototype.unByKey = sm.prototype.O;
  Cx.prototype.getAttributions = Cx.prototype.za;
  Cx.prototype.getLogo = Cx.prototype.ya;
  Cx.prototype.getProjection = Cx.prototype.Aa;
  Cx.prototype.getState = Cx.prototype.W;
  Cx.prototype.refresh = Cx.prototype.wa;
  Cx.prototype.setAttributions = Cx.prototype.ua;
  Cx.prototype.get = Cx.prototype.get;
  Cx.prototype.getKeys = Cx.prototype.S;
  Cx.prototype.getProperties = Cx.prototype.R;
  Cx.prototype.set = Cx.prototype.set;
  Cx.prototype.setProperties = Cx.prototype.I;
  Cx.prototype.unset = Cx.prototype.T;
  Cx.prototype.changed = Cx.prototype.s;
  Cx.prototype.dispatchEvent = Cx.prototype.b;
  Cx.prototype.getRevision = Cx.prototype.M;
  Cx.prototype.on = Cx.prototype.J;
  Cx.prototype.once = Cx.prototype.N;
  Cx.prototype.un = Cx.prototype.K;
  Cx.prototype.unByKey = Cx.prototype.O;
  Gx.prototype.setRenderReprojectionEdges = Gx.prototype.Hb;
  Gx.prototype.setTileGridForProjection = Gx.prototype.Ib;
  Gx.prototype.getTileLoadFunction = Gx.prototype.ib;
  Gx.prototype.getTileUrlFunction = Gx.prototype.kb;
  Gx.prototype.getUrls = Gx.prototype.lb;
  Gx.prototype.setTileLoadFunction = Gx.prototype.sb;
  Gx.prototype.setTileUrlFunction = Gx.prototype.Xa;
  Gx.prototype.setUrl = Gx.prototype.cb;
  Gx.prototype.setUrls = Gx.prototype.Ya;
  Gx.prototype.getTileGrid = Gx.prototype.Va;
  Gx.prototype.refresh = Gx.prototype.wa;
  Gx.prototype.getAttributions = Gx.prototype.za;
  Gx.prototype.getLogo = Gx.prototype.ya;
  Gx.prototype.getProjection = Gx.prototype.Aa;
  Gx.prototype.getState = Gx.prototype.W;
  Gx.prototype.setAttributions = Gx.prototype.ua;
  Gx.prototype.get = Gx.prototype.get;
  Gx.prototype.getKeys = Gx.prototype.S;
  Gx.prototype.getProperties = Gx.prototype.R;
  Gx.prototype.set = Gx.prototype.set;
  Gx.prototype.setProperties = Gx.prototype.I;
  Gx.prototype.unset = Gx.prototype.T;
  Gx.prototype.changed = Gx.prototype.s;
  Gx.prototype.dispatchEvent = Gx.prototype.b;
  Gx.prototype.getRevision = Gx.prototype.M;
  Gx.prototype.on = Gx.prototype.J;
  Gx.prototype.once = Gx.prototype.N;
  Gx.prototype.un = Gx.prototype.K;
  Gx.prototype.unByKey = Gx.prototype.O;
  Ix.prototype.getAttributions = Ix.prototype.za;
  Ix.prototype.getLogo = Ix.prototype.ya;
  Ix.prototype.getProjection = Ix.prototype.Aa;
  Ix.prototype.getState = Ix.prototype.W;
  Ix.prototype.refresh = Ix.prototype.wa;
  Ix.prototype.setAttributions = Ix.prototype.ua;
  Ix.prototype.get = Ix.prototype.get;
  Ix.prototype.getKeys = Ix.prototype.S;
  Ix.prototype.getProperties = Ix.prototype.R;
  Ix.prototype.set = Ix.prototype.set;
  Ix.prototype.setProperties = Ix.prototype.I;
  Ix.prototype.unset = Ix.prototype.T;
  Ix.prototype.changed = Ix.prototype.s;
  Ix.prototype.dispatchEvent = Ix.prototype.b;
  Ix.prototype.getRevision = Ix.prototype.M;
  Ix.prototype.on = Ix.prototype.J;
  Ix.prototype.once = Ix.prototype.N;
  Ix.prototype.un = Ix.prototype.K;
  Ix.prototype.unByKey = Ix.prototype.O;
  Px.prototype.type = Px.prototype.type;
  Px.prototype.target = Px.prototype.target;
  Px.prototype.preventDefault = Px.prototype.preventDefault;
  Px.prototype.stopPropagation = Px.prototype.stopPropagation;
  Sx.prototype.setRenderReprojectionEdges = Sx.prototype.Hb;
  Sx.prototype.setTileGridForProjection = Sx.prototype.Ib;
  Sx.prototype.getTileLoadFunction = Sx.prototype.ib;
  Sx.prototype.getTileUrlFunction = Sx.prototype.kb;
  Sx.prototype.getUrls = Sx.prototype.lb;
  Sx.prototype.setTileLoadFunction = Sx.prototype.sb;
  Sx.prototype.setTileUrlFunction = Sx.prototype.Xa;
  Sx.prototype.setUrl = Sx.prototype.cb;
  Sx.prototype.setUrls = Sx.prototype.Ya;
  Sx.prototype.getTileGrid = Sx.prototype.Va;
  Sx.prototype.refresh = Sx.prototype.wa;
  Sx.prototype.getAttributions = Sx.prototype.za;
  Sx.prototype.getLogo = Sx.prototype.ya;
  Sx.prototype.getProjection = Sx.prototype.Aa;
  Sx.prototype.getState = Sx.prototype.W;
  Sx.prototype.setAttributions = Sx.prototype.ua;
  Sx.prototype.get = Sx.prototype.get;
  Sx.prototype.getKeys = Sx.prototype.S;
  Sx.prototype.getProperties = Sx.prototype.R;
  Sx.prototype.set = Sx.prototype.set;
  Sx.prototype.setProperties = Sx.prototype.I;
  Sx.prototype.unset = Sx.prototype.T;
  Sx.prototype.changed = Sx.prototype.s;
  Sx.prototype.dispatchEvent = Sx.prototype.b;
  Sx.prototype.getRevision = Sx.prototype.M;
  Sx.prototype.on = Sx.prototype.J;
  Sx.prototype.once = Sx.prototype.N;
  Sx.prototype.un = Sx.prototype.K;
  Sx.prototype.unByKey = Sx.prototype.O;
  lx.prototype.type = lx.prototype.type;
  lx.prototype.target = lx.prototype.target;
  lx.prototype.preventDefault = lx.prototype.preventDefault;
  lx.prototype.stopPropagation = lx.prototype.stopPropagation;
  Wx.prototype.setRenderReprojectionEdges = Wx.prototype.Hb;
  Wx.prototype.setTileGridForProjection = Wx.prototype.Ib;
  Wx.prototype.getTileLoadFunction = Wx.prototype.ib;
  Wx.prototype.getTileUrlFunction = Wx.prototype.kb;
  Wx.prototype.getUrls = Wx.prototype.lb;
  Wx.prototype.setTileLoadFunction = Wx.prototype.sb;
  Wx.prototype.setTileUrlFunction = Wx.prototype.Xa;
  Wx.prototype.setUrl = Wx.prototype.cb;
  Wx.prototype.setUrls = Wx.prototype.Ya;
  Wx.prototype.getTileGrid = Wx.prototype.Va;
  Wx.prototype.refresh = Wx.prototype.wa;
  Wx.prototype.getAttributions = Wx.prototype.za;
  Wx.prototype.getLogo = Wx.prototype.ya;
  Wx.prototype.getProjection = Wx.prototype.Aa;
  Wx.prototype.getState = Wx.prototype.W;
  Wx.prototype.setAttributions = Wx.prototype.ua;
  Wx.prototype.get = Wx.prototype.get;
  Wx.prototype.getKeys = Wx.prototype.S;
  Wx.prototype.getProperties = Wx.prototype.R;
  Wx.prototype.set = Wx.prototype.set;
  Wx.prototype.setProperties = Wx.prototype.I;
  Wx.prototype.unset = Wx.prototype.T;
  Wx.prototype.changed = Wx.prototype.s;
  Wx.prototype.dispatchEvent = Wx.prototype.b;
  Wx.prototype.getRevision = Wx.prototype.M;
  Wx.prototype.on = Wx.prototype.J;
  Wx.prototype.once = Wx.prototype.N;
  Wx.prototype.un = Wx.prototype.K;
  Wx.prototype.unByKey = Wx.prototype.O;
  Yx.prototype.getTileGrid = Yx.prototype.Va;
  Yx.prototype.refresh = Yx.prototype.wa;
  Yx.prototype.getAttributions = Yx.prototype.za;
  Yx.prototype.getLogo = Yx.prototype.ya;
  Yx.prototype.getProjection = Yx.prototype.Aa;
  Yx.prototype.getState = Yx.prototype.W;
  Yx.prototype.setAttributions = Yx.prototype.ua;
  Yx.prototype.get = Yx.prototype.get;
  Yx.prototype.getKeys = Yx.prototype.S;
  Yx.prototype.getProperties = Yx.prototype.R;
  Yx.prototype.set = Yx.prototype.set;
  Yx.prototype.setProperties = Yx.prototype.I;
  Yx.prototype.unset = Yx.prototype.T;
  Yx.prototype.changed = Yx.prototype.s;
  Yx.prototype.dispatchEvent = Yx.prototype.b;
  Yx.prototype.getRevision = Yx.prototype.M;
  Yx.prototype.on = Yx.prototype.J;
  Yx.prototype.once = Yx.prototype.N;
  Yx.prototype.un = Yx.prototype.K;
  Yx.prototype.unByKey = Yx.prototype.O;
  $x.prototype.setRenderReprojectionEdges = $x.prototype.Hb;
  $x.prototype.setTileGridForProjection = $x.prototype.Ib;
  $x.prototype.getTileLoadFunction = $x.prototype.ib;
  $x.prototype.getTileUrlFunction = $x.prototype.kb;
  $x.prototype.getUrls = $x.prototype.lb;
  $x.prototype.setTileLoadFunction = $x.prototype.sb;
  $x.prototype.setTileUrlFunction = $x.prototype.Xa;
  $x.prototype.setUrl = $x.prototype.cb;
  $x.prototype.setUrls = $x.prototype.Ya;
  $x.prototype.getTileGrid = $x.prototype.Va;
  $x.prototype.refresh = $x.prototype.wa;
  $x.prototype.getAttributions = $x.prototype.za;
  $x.prototype.getLogo = $x.prototype.ya;
  $x.prototype.getProjection = $x.prototype.Aa;
  $x.prototype.getState = $x.prototype.W;
  $x.prototype.setAttributions = $x.prototype.ua;
  $x.prototype.get = $x.prototype.get;
  $x.prototype.getKeys = $x.prototype.S;
  $x.prototype.getProperties = $x.prototype.R;
  $x.prototype.set = $x.prototype.set;
  $x.prototype.setProperties = $x.prototype.I;
  $x.prototype.unset = $x.prototype.T;
  $x.prototype.changed = $x.prototype.s;
  $x.prototype.dispatchEvent = $x.prototype.b;
  $x.prototype.getRevision = $x.prototype.M;
  $x.prototype.on = $x.prototype.J;
  $x.prototype.once = $x.prototype.N;
  $x.prototype.un = $x.prototype.K;
  $x.prototype.unByKey = $x.prototype.O;
  ay.prototype.getTileGrid = ay.prototype.Va;
  ay.prototype.refresh = ay.prototype.wa;
  ay.prototype.getAttributions = ay.prototype.za;
  ay.prototype.getLogo = ay.prototype.ya;
  ay.prototype.getProjection = ay.prototype.Aa;
  ay.prototype.getState = ay.prototype.W;
  ay.prototype.setAttributions = ay.prototype.ua;
  ay.prototype.get = ay.prototype.get;
  ay.prototype.getKeys = ay.prototype.S;
  ay.prototype.getProperties = ay.prototype.R;
  ay.prototype.set = ay.prototype.set;
  ay.prototype.setProperties = ay.prototype.I;
  ay.prototype.unset = ay.prototype.T;
  ay.prototype.changed = ay.prototype.s;
  ay.prototype.dispatchEvent = ay.prototype.b;
  ay.prototype.getRevision = ay.prototype.M;
  ay.prototype.on = ay.prototype.J;
  ay.prototype.once = ay.prototype.N;
  ay.prototype.un = ay.prototype.K;
  ay.prototype.unByKey = ay.prototype.O;
  ey.prototype.setRenderReprojectionEdges = ey.prototype.Hb;
  ey.prototype.setTileGridForProjection = ey.prototype.Ib;
  ey.prototype.getTileLoadFunction = ey.prototype.ib;
  ey.prototype.getTileUrlFunction = ey.prototype.kb;
  ey.prototype.getUrls = ey.prototype.lb;
  ey.prototype.setTileLoadFunction = ey.prototype.sb;
  ey.prototype.setTileUrlFunction = ey.prototype.Xa;
  ey.prototype.setUrl = ey.prototype.cb;
  ey.prototype.setUrls = ey.prototype.Ya;
  ey.prototype.getTileGrid = ey.prototype.Va;
  ey.prototype.refresh = ey.prototype.wa;
  ey.prototype.getAttributions = ey.prototype.za;
  ey.prototype.getLogo = ey.prototype.ya;
  ey.prototype.getProjection = ey.prototype.Aa;
  ey.prototype.getState = ey.prototype.W;
  ey.prototype.setAttributions = ey.prototype.ua;
  ey.prototype.get = ey.prototype.get;
  ey.prototype.getKeys = ey.prototype.S;
  ey.prototype.getProperties = ey.prototype.R;
  ey.prototype.set = ey.prototype.set;
  ey.prototype.setProperties = ey.prototype.I;
  ey.prototype.unset = ey.prototype.T;
  ey.prototype.changed = ey.prototype.s;
  ey.prototype.dispatchEvent = ey.prototype.b;
  ey.prototype.getRevision = ey.prototype.M;
  ey.prototype.on = ey.prototype.J;
  ey.prototype.once = ey.prototype.N;
  ey.prototype.un = ey.prototype.K;
  ey.prototype.unByKey = ey.prototype.O;
  Bv.prototype.type = Bv.prototype.type;
  Bv.prototype.target = Bv.prototype.target;
  Bv.prototype.preventDefault = Bv.prototype.preventDefault;
  Bv.prototype.stopPropagation = Bv.prototype.stopPropagation;
  ly.prototype.getTileLoadFunction = ly.prototype.ib;
  ly.prototype.getTileUrlFunction = ly.prototype.kb;
  ly.prototype.getUrls = ly.prototype.lb;
  ly.prototype.setTileLoadFunction = ly.prototype.sb;
  ly.prototype.setTileUrlFunction = ly.prototype.Xa;
  ly.prototype.setUrl = ly.prototype.cb;
  ly.prototype.setUrls = ly.prototype.Ya;
  ly.prototype.getTileGrid = ly.prototype.Va;
  ly.prototype.refresh = ly.prototype.wa;
  ly.prototype.getAttributions = ly.prototype.za;
  ly.prototype.getLogo = ly.prototype.ya;
  ly.prototype.getProjection = ly.prototype.Aa;
  ly.prototype.getState = ly.prototype.W;
  ly.prototype.setAttributions = ly.prototype.ua;
  ly.prototype.get = ly.prototype.get;
  ly.prototype.getKeys = ly.prototype.S;
  ly.prototype.getProperties = ly.prototype.R;
  ly.prototype.set = ly.prototype.set;
  ly.prototype.setProperties = ly.prototype.I;
  ly.prototype.unset = ly.prototype.T;
  ly.prototype.changed = ly.prototype.s;
  ly.prototype.dispatchEvent = ly.prototype.b;
  ly.prototype.getRevision = ly.prototype.M;
  ly.prototype.on = ly.prototype.J;
  ly.prototype.once = ly.prototype.N;
  ly.prototype.un = ly.prototype.K;
  ly.prototype.unByKey = ly.prototype.O;
  Z.prototype.setRenderReprojectionEdges = Z.prototype.Hb;
  Z.prototype.setTileGridForProjection = Z.prototype.Ib;
  Z.prototype.getTileLoadFunction = Z.prototype.ib;
  Z.prototype.getTileUrlFunction = Z.prototype.kb;
  Z.prototype.getUrls = Z.prototype.lb;
  Z.prototype.setTileLoadFunction = Z.prototype.sb;
  Z.prototype.setTileUrlFunction = Z.prototype.Xa;
  Z.prototype.setUrl = Z.prototype.cb;
  Z.prototype.setUrls = Z.prototype.Ya;
  Z.prototype.getTileGrid = Z.prototype.Va;
  Z.prototype.refresh = Z.prototype.wa;
  Z.prototype.getAttributions = Z.prototype.za;
  Z.prototype.getLogo = Z.prototype.ya;
  Z.prototype.getProjection = Z.prototype.Aa;
  Z.prototype.getState = Z.prototype.W;
  Z.prototype.setAttributions = Z.prototype.ua;
  Z.prototype.get = Z.prototype.get;
  Z.prototype.getKeys = Z.prototype.S;
  Z.prototype.getProperties = Z.prototype.R;
  Z.prototype.set = Z.prototype.set;
  Z.prototype.setProperties = Z.prototype.I;
  Z.prototype.unset = Z.prototype.T;
  Z.prototype.changed = Z.prototype.s;
  Z.prototype.dispatchEvent = Z.prototype.b;
  Z.prototype.getRevision = Z.prototype.M;
  Z.prototype.on = Z.prototype.J;
  Z.prototype.once = Z.prototype.N;
  Z.prototype.un = Z.prototype.K;
  Z.prototype.unByKey = Z.prototype.O;
  qy.prototype.setRenderReprojectionEdges = qy.prototype.Hb;
  qy.prototype.setTileGridForProjection = qy.prototype.Ib;
  qy.prototype.getTileLoadFunction = qy.prototype.ib;
  qy.prototype.getTileUrlFunction = qy.prototype.kb;
  qy.prototype.getUrls = qy.prototype.lb;
  qy.prototype.setTileLoadFunction = qy.prototype.sb;
  qy.prototype.setTileUrlFunction = qy.prototype.Xa;
  qy.prototype.setUrl = qy.prototype.cb;
  qy.prototype.setUrls = qy.prototype.Ya;
  qy.prototype.getTileGrid = qy.prototype.Va;
  qy.prototype.refresh = qy.prototype.wa;
  qy.prototype.getAttributions = qy.prototype.za;
  qy.prototype.getLogo = qy.prototype.ya;
  qy.prototype.getProjection = qy.prototype.Aa;
  qy.prototype.getState = qy.prototype.W;
  qy.prototype.setAttributions = qy.prototype.ua;
  qy.prototype.get = qy.prototype.get;
  qy.prototype.getKeys = qy.prototype.S;
  qy.prototype.getProperties = qy.prototype.R;
  qy.prototype.set = qy.prototype.set;
  qy.prototype.setProperties = qy.prototype.I;
  qy.prototype.unset = qy.prototype.T;
  qy.prototype.changed = qy.prototype.s;
  qy.prototype.dispatchEvent = qy.prototype.b;
  qy.prototype.getRevision = qy.prototype.M;
  qy.prototype.on = qy.prototype.J;
  qy.prototype.once = qy.prototype.N;
  qy.prototype.un = qy.prototype.K;
  qy.prototype.unByKey = qy.prototype.O;
  ax.prototype.getTileCoord = ax.prototype.c;
  ax.prototype.load = ax.prototype.load;
  Ui.prototype.changed = Ui.prototype.s;
  Ui.prototype.dispatchEvent = Ui.prototype.b;
  Ui.prototype.getRevision = Ui.prototype.M;
  Ui.prototype.on = Ui.prototype.J;
  Ui.prototype.once = Ui.prototype.N;
  Ui.prototype.un = Ui.prototype.K;
  Ui.prototype.unByKey = Ui.prototype.O;
  Ul.prototype.changed = Ul.prototype.s;
  Ul.prototype.dispatchEvent = Ul.prototype.b;
  Ul.prototype.getRevision = Ul.prototype.M;
  Ul.prototype.on = Ul.prototype.J;
  Ul.prototype.once = Ul.prototype.N;
  Ul.prototype.un = Ul.prototype.K;
  Ul.prototype.unByKey = Ul.prototype.O;
  um.prototype.changed = um.prototype.s;
  um.prototype.dispatchEvent = um.prototype.b;
  um.prototype.getRevision = um.prototype.M;
  um.prototype.on = um.prototype.J;
  um.prototype.once = um.prototype.N;
  um.prototype.un = um.prototype.K;
  um.prototype.unByKey = um.prototype.O;
  Cm.prototype.changed = Cm.prototype.s;
  Cm.prototype.dispatchEvent = Cm.prototype.b;
  Cm.prototype.getRevision = Cm.prototype.M;
  Cm.prototype.on = Cm.prototype.J;
  Cm.prototype.once = Cm.prototype.N;
  Cm.prototype.un = Cm.prototype.K;
  Cm.prototype.unByKey = Cm.prototype.O;
  Em.prototype.changed = Em.prototype.s;
  Em.prototype.dispatchEvent = Em.prototype.b;
  Em.prototype.getRevision = Em.prototype.M;
  Em.prototype.on = Em.prototype.J;
  Em.prototype.once = Em.prototype.N;
  Em.prototype.un = Em.prototype.K;
  Em.prototype.unByKey = Em.prototype.O;
  cj.prototype.changed = cj.prototype.s;
  cj.prototype.dispatchEvent = cj.prototype.b;
  cj.prototype.getRevision = cj.prototype.M;
  cj.prototype.on = cj.prototype.J;
  cj.prototype.once = cj.prototype.N;
  cj.prototype.un = cj.prototype.K;
  cj.prototype.unByKey = cj.prototype.O;
  gj.prototype.changed = gj.prototype.s;
  gj.prototype.dispatchEvent = gj.prototype.b;
  gj.prototype.getRevision = gj.prototype.M;
  gj.prototype.on = gj.prototype.J;
  gj.prototype.once = gj.prototype.N;
  gj.prototype.un = gj.prototype.K;
  gj.prototype.unByKey = gj.prototype.O;
  hj.prototype.changed = hj.prototype.s;
  hj.prototype.dispatchEvent = hj.prototype.b;
  hj.prototype.getRevision = hj.prototype.M;
  hj.prototype.on = hj.prototype.J;
  hj.prototype.once = hj.prototype.N;
  hj.prototype.un = hj.prototype.K;
  hj.prototype.unByKey = hj.prototype.O;
  ij.prototype.changed = ij.prototype.s;
  ij.prototype.dispatchEvent = ij.prototype.b;
  ij.prototype.getRevision = ij.prototype.M;
  ij.prototype.on = ij.prototype.J;
  ij.prototype.once = ij.prototype.N;
  ij.prototype.un = ij.prototype.K;
  ij.prototype.unByKey = ij.prototype.O;
  Nj.prototype.changed = Nj.prototype.s;
  Nj.prototype.dispatchEvent = Nj.prototype.b;
  Nj.prototype.getRevision = Nj.prototype.M;
  Nj.prototype.on = Nj.prototype.J;
  Nj.prototype.once = Nj.prototype.N;
  Nj.prototype.un = Nj.prototype.K;
  Nj.prototype.unByKey = Nj.prototype.O;
  Oj.prototype.changed = Oj.prototype.s;
  Oj.prototype.dispatchEvent = Oj.prototype.b;
  Oj.prototype.getRevision = Oj.prototype.M;
  Oj.prototype.on = Oj.prototype.J;
  Oj.prototype.once = Oj.prototype.N;
  Oj.prototype.un = Oj.prototype.K;
  Oj.prototype.unByKey = Oj.prototype.O;
  Jh.prototype.type = Jh.prototype.type;
  Jh.prototype.target = Jh.prototype.target;
  Jh.prototype.preventDefault = Jh.prototype.preventDefault;
  Jh.prototype.stopPropagation = Jh.prototype.stopPropagation;
  If.prototype.type = If.prototype.type;
  If.prototype.target = If.prototype.target;
  If.prototype.preventDefault = If.prototype.preventDefault;
  If.prototype.stopPropagation = If.prototype.stopPropagation;
  qh.prototype.get = qh.prototype.get;
  qh.prototype.getKeys = qh.prototype.S;
  qh.prototype.getProperties = qh.prototype.R;
  qh.prototype.set = qh.prototype.set;
  qh.prototype.setProperties = qh.prototype.I;
  qh.prototype.unset = qh.prototype.T;
  qh.prototype.changed = qh.prototype.s;
  qh.prototype.dispatchEvent = qh.prototype.b;
  qh.prototype.getRevision = qh.prototype.M;
  qh.prototype.on = qh.prototype.J;
  qh.prototype.once = qh.prototype.N;
  qh.prototype.un = qh.prototype.K;
  qh.prototype.unByKey = qh.prototype.O;
  yh.prototype.getExtent = yh.prototype.G;
  yh.prototype.getMaxResolution = yh.prototype.Wb;
  yh.prototype.getMinResolution = yh.prototype.Xb;
  yh.prototype.getOpacity = yh.prototype.Yb;
  yh.prototype.getVisible = yh.prototype.Fb;
  yh.prototype.getZIndex = yh.prototype.Zb;
  yh.prototype.setExtent = yh.prototype.kc;
  yh.prototype.setMaxResolution = yh.prototype.pc;
  yh.prototype.setMinResolution = yh.prototype.qc;
  yh.prototype.setOpacity = yh.prototype.lc;
  yh.prototype.setVisible = yh.prototype.mc;
  yh.prototype.setZIndex = yh.prototype.nc;
  yh.prototype.get = yh.prototype.get;
  yh.prototype.getKeys = yh.prototype.S;
  yh.prototype.getProperties = yh.prototype.R;
  yh.prototype.set = yh.prototype.set;
  yh.prototype.setProperties = yh.prototype.I;
  yh.prototype.unset = yh.prototype.T;
  yh.prototype.changed = yh.prototype.s;
  yh.prototype.dispatchEvent = yh.prototype.b;
  yh.prototype.getRevision = yh.prototype.M;
  yh.prototype.on = yh.prototype.J;
  yh.prototype.once = yh.prototype.N;
  yh.prototype.un = yh.prototype.K;
  yh.prototype.unByKey = yh.prototype.O;
  Kh.prototype.getExtent = Kh.prototype.G;
  Kh.prototype.getMaxResolution = Kh.prototype.Wb;
  Kh.prototype.getMinResolution = Kh.prototype.Xb;
  Kh.prototype.getOpacity = Kh.prototype.Yb;
  Kh.prototype.getVisible = Kh.prototype.Fb;
  Kh.prototype.getZIndex = Kh.prototype.Zb;
  Kh.prototype.setExtent = Kh.prototype.kc;
  Kh.prototype.setMaxResolution = Kh.prototype.pc;
  Kh.prototype.setMinResolution = Kh.prototype.qc;
  Kh.prototype.setOpacity = Kh.prototype.lc;
  Kh.prototype.setVisible = Kh.prototype.mc;
  Kh.prototype.setZIndex = Kh.prototype.nc;
  Kh.prototype.get = Kh.prototype.get;
  Kh.prototype.getKeys = Kh.prototype.S;
  Kh.prototype.getProperties = Kh.prototype.R;
  Kh.prototype.set = Kh.prototype.set;
  Kh.prototype.setProperties = Kh.prototype.I;
  Kh.prototype.unset = Kh.prototype.T;
  Kh.prototype.changed = Kh.prototype.s;
  Kh.prototype.dispatchEvent = Kh.prototype.b;
  Kh.prototype.getRevision = Kh.prototype.M;
  Kh.prototype.on = Kh.prototype.J;
  Kh.prototype.once = Kh.prototype.N;
  Kh.prototype.un = Kh.prototype.K;
  Kh.prototype.unByKey = Kh.prototype.O;
  G.prototype.setMap = G.prototype.setMap;
  G.prototype.setSource = G.prototype.Pc;
  G.prototype.getExtent = G.prototype.G;
  G.prototype.getMaxResolution = G.prototype.Wb;
  G.prototype.getMinResolution = G.prototype.Xb;
  G.prototype.getOpacity = G.prototype.Yb;
  G.prototype.getVisible = G.prototype.Fb;
  G.prototype.getZIndex = G.prototype.Zb;
  G.prototype.setExtent = G.prototype.kc;
  G.prototype.setMaxResolution = G.prototype.pc;
  G.prototype.setMinResolution = G.prototype.qc;
  G.prototype.setOpacity = G.prototype.lc;
  G.prototype.setVisible = G.prototype.mc;
  G.prototype.setZIndex = G.prototype.nc;
  G.prototype.get = G.prototype.get;
  G.prototype.getKeys = G.prototype.S;
  G.prototype.getProperties = G.prototype.R;
  G.prototype.set = G.prototype.set;
  G.prototype.setProperties = G.prototype.I;
  G.prototype.unset = G.prototype.T;
  G.prototype.changed = G.prototype.s;
  G.prototype.dispatchEvent = G.prototype.b;
  G.prototype.getRevision = G.prototype.M;
  G.prototype.on = G.prototype.J;
  G.prototype.once = G.prototype.N;
  G.prototype.un = G.prototype.K;
  G.prototype.unByKey = G.prototype.O;
  V.prototype.getSource = V.prototype.la;
  V.prototype.getStyle = V.prototype.D;
  V.prototype.getStyleFunction = V.prototype.L;
  V.prototype.setStyle = V.prototype.l;
  V.prototype.setMap = V.prototype.setMap;
  V.prototype.setSource = V.prototype.Pc;
  V.prototype.getExtent = V.prototype.G;
  V.prototype.getMaxResolution = V.prototype.Wb;
  V.prototype.getMinResolution = V.prototype.Xb;
  V.prototype.getOpacity = V.prototype.Yb;
  V.prototype.getVisible = V.prototype.Fb;
  V.prototype.getZIndex = V.prototype.Zb;
  V.prototype.setExtent = V.prototype.kc;
  V.prototype.setMaxResolution = V.prototype.pc;
  V.prototype.setMinResolution = V.prototype.qc;
  V.prototype.setOpacity = V.prototype.lc;
  V.prototype.setVisible = V.prototype.mc;
  V.prototype.setZIndex = V.prototype.nc;
  V.prototype.get = V.prototype.get;
  V.prototype.getKeys = V.prototype.S;
  V.prototype.getProperties = V.prototype.R;
  V.prototype.set = V.prototype.set;
  V.prototype.setProperties = V.prototype.I;
  V.prototype.unset = V.prototype.T;
  V.prototype.changed = V.prototype.s;
  V.prototype.dispatchEvent = V.prototype.b;
  V.prototype.getRevision = V.prototype.M;
  V.prototype.on = V.prototype.J;
  V.prototype.once = V.prototype.N;
  V.prototype.un = V.prototype.K;
  V.prototype.unByKey = V.prototype.O;
  ei.prototype.setMap = ei.prototype.setMap;
  ei.prototype.setSource = ei.prototype.Pc;
  ei.prototype.getExtent = ei.prototype.G;
  ei.prototype.getMaxResolution = ei.prototype.Wb;
  ei.prototype.getMinResolution = ei.prototype.Xb;
  ei.prototype.getOpacity = ei.prototype.Yb;
  ei.prototype.getVisible = ei.prototype.Fb;
  ei.prototype.getZIndex = ei.prototype.Zb;
  ei.prototype.setExtent = ei.prototype.kc;
  ei.prototype.setMaxResolution = ei.prototype.pc;
  ei.prototype.setMinResolution = ei.prototype.qc;
  ei.prototype.setOpacity = ei.prototype.lc;
  ei.prototype.setVisible = ei.prototype.mc;
  ei.prototype.setZIndex = ei.prototype.nc;
  ei.prototype.get = ei.prototype.get;
  ei.prototype.getKeys = ei.prototype.S;
  ei.prototype.getProperties = ei.prototype.R;
  ei.prototype.set = ei.prototype.set;
  ei.prototype.setProperties = ei.prototype.I;
  ei.prototype.unset = ei.prototype.T;
  ei.prototype.changed = ei.prototype.s;
  ei.prototype.dispatchEvent = ei.prototype.b;
  ei.prototype.getRevision = ei.prototype.M;
  ei.prototype.on = ei.prototype.J;
  ei.prototype.once = ei.prototype.N;
  ei.prototype.un = ei.prototype.K;
  ei.prototype.unByKey = ei.prototype.O;
  F.prototype.setMap = F.prototype.setMap;
  F.prototype.setSource = F.prototype.Pc;
  F.prototype.getExtent = F.prototype.G;
  F.prototype.getMaxResolution = F.prototype.Wb;
  F.prototype.getMinResolution = F.prototype.Xb;
  F.prototype.getOpacity = F.prototype.Yb;
  F.prototype.getVisible = F.prototype.Fb;
  F.prototype.getZIndex = F.prototype.Zb;
  F.prototype.setExtent = F.prototype.kc;
  F.prototype.setMaxResolution = F.prototype.pc;
  F.prototype.setMinResolution = F.prototype.qc;
  F.prototype.setOpacity = F.prototype.lc;
  F.prototype.setVisible = F.prototype.mc;
  F.prototype.setZIndex = F.prototype.nc;
  F.prototype.get = F.prototype.get;
  F.prototype.getKeys = F.prototype.S;
  F.prototype.getProperties = F.prototype.R;
  F.prototype.set = F.prototype.set;
  F.prototype.setProperties = F.prototype.I;
  F.prototype.unset = F.prototype.T;
  F.prototype.changed = F.prototype.s;
  F.prototype.dispatchEvent = F.prototype.b;
  F.prototype.getRevision = F.prototype.M;
  F.prototype.on = F.prototype.J;
  F.prototype.once = F.prototype.N;
  F.prototype.un = F.prototype.K;
  F.prototype.unByKey = F.prototype.O;
  H.prototype.getSource = H.prototype.la;
  H.prototype.getStyle = H.prototype.D;
  H.prototype.getStyleFunction = H.prototype.L;
  H.prototype.setStyle = H.prototype.l;
  H.prototype.setMap = H.prototype.setMap;
  H.prototype.setSource = H.prototype.Pc;
  H.prototype.getExtent = H.prototype.G;
  H.prototype.getMaxResolution = H.prototype.Wb;
  H.prototype.getMinResolution = H.prototype.Xb;
  H.prototype.getOpacity = H.prototype.Yb;
  H.prototype.getVisible = H.prototype.Fb;
  H.prototype.getZIndex = H.prototype.Zb;
  H.prototype.setExtent = H.prototype.kc;
  H.prototype.setMaxResolution = H.prototype.pc;
  H.prototype.setMinResolution = H.prototype.qc;
  H.prototype.setOpacity = H.prototype.lc;
  H.prototype.setVisible = H.prototype.mc;
  H.prototype.setZIndex = H.prototype.nc;
  H.prototype.get = H.prototype.get;
  H.prototype.getKeys = H.prototype.S;
  H.prototype.getProperties = H.prototype.R;
  H.prototype.set = H.prototype.set;
  H.prototype.setProperties = H.prototype.I;
  H.prototype.unset = H.prototype.T;
  H.prototype.changed = H.prototype.s;
  H.prototype.dispatchEvent = H.prototype.b;
  H.prototype.getRevision = H.prototype.M;
  H.prototype.on = H.prototype.J;
  H.prototype.once = H.prototype.N;
  H.prototype.un = H.prototype.K;
  H.prototype.unByKey = H.prototype.O;
  lg.prototype.get = lg.prototype.get;
  lg.prototype.getKeys = lg.prototype.S;
  lg.prototype.getProperties = lg.prototype.R;
  lg.prototype.set = lg.prototype.set;
  lg.prototype.setProperties = lg.prototype.I;
  lg.prototype.unset = lg.prototype.T;
  lg.prototype.changed = lg.prototype.s;
  lg.prototype.dispatchEvent = lg.prototype.b;
  lg.prototype.getRevision = lg.prototype.M;
  lg.prototype.on = lg.prototype.J;
  lg.prototype.once = lg.prototype.N;
  lg.prototype.un = lg.prototype.K;
  lg.prototype.unByKey = lg.prototype.O;
  qg.prototype.getActive = qg.prototype.f;
  qg.prototype.getMap = qg.prototype.c;
  qg.prototype.setActive = qg.prototype.Ea;
  qg.prototype.get = qg.prototype.get;
  qg.prototype.getKeys = qg.prototype.S;
  qg.prototype.getProperties = qg.prototype.R;
  qg.prototype.set = qg.prototype.set;
  qg.prototype.setProperties = qg.prototype.I;
  qg.prototype.unset = qg.prototype.T;
  qg.prototype.changed = qg.prototype.s;
  qg.prototype.dispatchEvent = qg.prototype.b;
  qg.prototype.getRevision = qg.prototype.M;
  qg.prototype.on = qg.prototype.J;
  qg.prototype.once = qg.prototype.N;
  qg.prototype.un = qg.prototype.K;
  qg.prototype.unByKey = qg.prototype.O;
  nv.prototype.getActive = nv.prototype.f;
  nv.prototype.getMap = nv.prototype.c;
  nv.prototype.setActive = nv.prototype.Ea;
  nv.prototype.get = nv.prototype.get;
  nv.prototype.getKeys = nv.prototype.S;
  nv.prototype.getProperties = nv.prototype.R;
  nv.prototype.set = nv.prototype.set;
  nv.prototype.setProperties = nv.prototype.I;
  nv.prototype.unset = nv.prototype.T;
  nv.prototype.changed = nv.prototype.s;
  nv.prototype.dispatchEvent = nv.prototype.b;
  nv.prototype.getRevision = nv.prototype.M;
  nv.prototype.on = nv.prototype.J;
  nv.prototype.once = nv.prototype.N;
  nv.prototype.un = nv.prototype.K;
  nv.prototype.unByKey = nv.prototype.O;
  qv.prototype.type = qv.prototype.type;
  qv.prototype.target = qv.prototype.target;
  qv.prototype.preventDefault = qv.prototype.preventDefault;
  qv.prototype.stopPropagation = qv.prototype.stopPropagation;
  Bg.prototype.getActive = Bg.prototype.f;
  Bg.prototype.getMap = Bg.prototype.c;
  Bg.prototype.setActive = Bg.prototype.Ea;
  Bg.prototype.get = Bg.prototype.get;
  Bg.prototype.getKeys = Bg.prototype.S;
  Bg.prototype.getProperties = Bg.prototype.R;
  Bg.prototype.set = Bg.prototype.set;
  Bg.prototype.setProperties = Bg.prototype.I;
  Bg.prototype.unset = Bg.prototype.T;
  Bg.prototype.changed = Bg.prototype.s;
  Bg.prototype.dispatchEvent = Bg.prototype.b;
  Bg.prototype.getRevision = Bg.prototype.M;
  Bg.prototype.on = Bg.prototype.J;
  Bg.prototype.once = Bg.prototype.N;
  Bg.prototype.un = Bg.prototype.K;
  Bg.prototype.unByKey = Bg.prototype.O;
  Pg.prototype.getActive = Pg.prototype.f;
  Pg.prototype.getMap = Pg.prototype.c;
  Pg.prototype.setActive = Pg.prototype.Ea;
  Pg.prototype.get = Pg.prototype.get;
  Pg.prototype.getKeys = Pg.prototype.S;
  Pg.prototype.getProperties = Pg.prototype.R;
  Pg.prototype.set = Pg.prototype.set;
  Pg.prototype.setProperties = Pg.prototype.I;
  Pg.prototype.unset = Pg.prototype.T;
  Pg.prototype.changed = Pg.prototype.s;
  Pg.prototype.dispatchEvent = Pg.prototype.b;
  Pg.prototype.getRevision = Pg.prototype.M;
  Pg.prototype.on = Pg.prototype.J;
  Pg.prototype.once = Pg.prototype.N;
  Pg.prototype.un = Pg.prototype.K;
  Pg.prototype.unByKey = Pg.prototype.O;
  Ug.prototype.type = Ug.prototype.type;
  Ug.prototype.target = Ug.prototype.target;
  Ug.prototype.preventDefault = Ug.prototype.preventDefault;
  Ug.prototype.stopPropagation = Ug.prototype.stopPropagation;
  Eg.prototype.getActive = Eg.prototype.f;
  Eg.prototype.getMap = Eg.prototype.c;
  Eg.prototype.setActive = Eg.prototype.Ea;
  Eg.prototype.get = Eg.prototype.get;
  Eg.prototype.getKeys = Eg.prototype.S;
  Eg.prototype.getProperties = Eg.prototype.R;
  Eg.prototype.set = Eg.prototype.set;
  Eg.prototype.setProperties = Eg.prototype.I;
  Eg.prototype.unset = Eg.prototype.T;
  Eg.prototype.changed = Eg.prototype.s;
  Eg.prototype.dispatchEvent = Eg.prototype.b;
  Eg.prototype.getRevision = Eg.prototype.M;
  Eg.prototype.on = Eg.prototype.J;
  Eg.prototype.once = Eg.prototype.N;
  Eg.prototype.un = Eg.prototype.K;
  Eg.prototype.unByKey = Eg.prototype.O;
  Ig.prototype.getActive = Ig.prototype.f;
  Ig.prototype.getMap = Ig.prototype.c;
  Ig.prototype.setActive = Ig.prototype.Ea;
  Ig.prototype.get = Ig.prototype.get;
  Ig.prototype.getKeys = Ig.prototype.S;
  Ig.prototype.getProperties = Ig.prototype.R;
  Ig.prototype.set = Ig.prototype.set;
  Ig.prototype.setProperties = Ig.prototype.I;
  Ig.prototype.unset = Ig.prototype.T;
  Ig.prototype.changed = Ig.prototype.s;
  Ig.prototype.dispatchEvent = Ig.prototype.b;
  Ig.prototype.getRevision = Ig.prototype.M;
  Ig.prototype.on = Ig.prototype.J;
  Ig.prototype.once = Ig.prototype.N;
  Ig.prototype.un = Ig.prototype.K;
  Ig.prototype.unByKey = Ig.prototype.O;
  sv.prototype.getActive = sv.prototype.f;
  sv.prototype.getMap = sv.prototype.c;
  sv.prototype.setActive = sv.prototype.Ea;
  sv.prototype.get = sv.prototype.get;
  sv.prototype.getKeys = sv.prototype.S;
  sv.prototype.getProperties = sv.prototype.R;
  sv.prototype.set = sv.prototype.set;
  sv.prototype.setProperties = sv.prototype.I;
  sv.prototype.unset = sv.prototype.T;
  sv.prototype.changed = sv.prototype.s;
  sv.prototype.dispatchEvent = sv.prototype.b;
  sv.prototype.getRevision = sv.prototype.M;
  sv.prototype.on = sv.prototype.J;
  sv.prototype.once = sv.prototype.N;
  sv.prototype.un = sv.prototype.K;
  sv.prototype.unByKey = sv.prototype.O;
  Yg.prototype.getGeometry = Yg.prototype.V;
  Yg.prototype.getActive = Yg.prototype.f;
  Yg.prototype.getMap = Yg.prototype.c;
  Yg.prototype.setActive = Yg.prototype.Ea;
  Yg.prototype.get = Yg.prototype.get;
  Yg.prototype.getKeys = Yg.prototype.S;
  Yg.prototype.getProperties = Yg.prototype.R;
  Yg.prototype.set = Yg.prototype.set;
  Yg.prototype.setProperties = Yg.prototype.I;
  Yg.prototype.unset = Yg.prototype.T;
  Yg.prototype.changed = Yg.prototype.s;
  Yg.prototype.dispatchEvent = Yg.prototype.b;
  Yg.prototype.getRevision = Yg.prototype.M;
  Yg.prototype.on = Yg.prototype.J;
  Yg.prototype.once = Yg.prototype.N;
  Yg.prototype.un = Yg.prototype.K;
  Yg.prototype.unByKey = Yg.prototype.O;
  Iv.prototype.getActive = Iv.prototype.f;
  Iv.prototype.getMap = Iv.prototype.c;
  Iv.prototype.setActive = Iv.prototype.Ea;
  Iv.prototype.get = Iv.prototype.get;
  Iv.prototype.getKeys = Iv.prototype.S;
  Iv.prototype.getProperties = Iv.prototype.R;
  Iv.prototype.set = Iv.prototype.set;
  Iv.prototype.setProperties = Iv.prototype.I;
  Iv.prototype.unset = Iv.prototype.T;
  Iv.prototype.changed = Iv.prototype.s;
  Iv.prototype.dispatchEvent = Iv.prototype.b;
  Iv.prototype.getRevision = Iv.prototype.M;
  Iv.prototype.on = Iv.prototype.J;
  Iv.prototype.once = Iv.prototype.N;
  Iv.prototype.un = Iv.prototype.K;
  Iv.prototype.unByKey = Iv.prototype.O;
  Xv.prototype.type = Xv.prototype.type;
  Xv.prototype.target = Xv.prototype.target;
  Xv.prototype.preventDefault = Xv.prototype.preventDefault;
  Xv.prototype.stopPropagation = Xv.prototype.stopPropagation;
  aw.prototype.getActive = aw.prototype.f;
  aw.prototype.getMap = aw.prototype.c;
  aw.prototype.setActive = aw.prototype.Ea;
  aw.prototype.get = aw.prototype.get;
  aw.prototype.getKeys = aw.prototype.S;
  aw.prototype.getProperties = aw.prototype.R;
  aw.prototype.set = aw.prototype.set;
  aw.prototype.setProperties = aw.prototype.I;
  aw.prototype.unset = aw.prototype.T;
  aw.prototype.changed = aw.prototype.s;
  aw.prototype.dispatchEvent = aw.prototype.b;
  aw.prototype.getRevision = aw.prototype.M;
  aw.prototype.on = aw.prototype.J;
  aw.prototype.once = aw.prototype.N;
  aw.prototype.un = aw.prototype.K;
  aw.prototype.unByKey = aw.prototype.O;
  lw.prototype.type = lw.prototype.type;
  lw.prototype.target = lw.prototype.target;
  lw.prototype.preventDefault = lw.prototype.preventDefault;
  lw.prototype.stopPropagation = lw.prototype.stopPropagation;
  Zg.prototype.getActive = Zg.prototype.f;
  Zg.prototype.getMap = Zg.prototype.c;
  Zg.prototype.setActive = Zg.prototype.Ea;
  Zg.prototype.get = Zg.prototype.get;
  Zg.prototype.getKeys = Zg.prototype.S;
  Zg.prototype.getProperties = Zg.prototype.R;
  Zg.prototype.set = Zg.prototype.set;
  Zg.prototype.setProperties = Zg.prototype.I;
  Zg.prototype.unset = Zg.prototype.T;
  Zg.prototype.changed = Zg.prototype.s;
  Zg.prototype.dispatchEvent = Zg.prototype.b;
  Zg.prototype.getRevision = Zg.prototype.M;
  Zg.prototype.on = Zg.prototype.J;
  Zg.prototype.once = Zg.prototype.N;
  Zg.prototype.un = Zg.prototype.K;
  Zg.prototype.unByKey = Zg.prototype.O;
  ah.prototype.getActive = ah.prototype.f;
  ah.prototype.getMap = ah.prototype.c;
  ah.prototype.setActive = ah.prototype.Ea;
  ah.prototype.get = ah.prototype.get;
  ah.prototype.getKeys = ah.prototype.S;
  ah.prototype.getProperties = ah.prototype.R;
  ah.prototype.set = ah.prototype.set;
  ah.prototype.setProperties = ah.prototype.I;
  ah.prototype.unset = ah.prototype.T;
  ah.prototype.changed = ah.prototype.s;
  ah.prototype.dispatchEvent = ah.prototype.b;
  ah.prototype.getRevision = ah.prototype.M;
  ah.prototype.on = ah.prototype.J;
  ah.prototype.once = ah.prototype.N;
  ah.prototype.un = ah.prototype.K;
  ah.prototype.unByKey = ah.prototype.O;
  nw.prototype.getActive = nw.prototype.f;
  nw.prototype.getMap = nw.prototype.c;
  nw.prototype.setActive = nw.prototype.Ea;
  nw.prototype.get = nw.prototype.get;
  nw.prototype.getKeys = nw.prototype.S;
  nw.prototype.getProperties = nw.prototype.R;
  nw.prototype.set = nw.prototype.set;
  nw.prototype.setProperties = nw.prototype.I;
  nw.prototype.unset = nw.prototype.T;
  nw.prototype.changed = nw.prototype.s;
  nw.prototype.dispatchEvent = nw.prototype.b;
  nw.prototype.getRevision = nw.prototype.M;
  nw.prototype.on = nw.prototype.J;
  nw.prototype.once = nw.prototype.N;
  nw.prototype.un = nw.prototype.K;
  nw.prototype.unByKey = nw.prototype.O;
  vw.prototype.type = vw.prototype.type;
  vw.prototype.target = vw.prototype.target;
  vw.prototype.preventDefault = vw.prototype.preventDefault;
  vw.prototype.stopPropagation = vw.prototype.stopPropagation;
  ch.prototype.getActive = ch.prototype.f;
  ch.prototype.getMap = ch.prototype.c;
  ch.prototype.setActive = ch.prototype.Ea;
  ch.prototype.get = ch.prototype.get;
  ch.prototype.getKeys = ch.prototype.S;
  ch.prototype.getProperties = ch.prototype.R;
  ch.prototype.set = ch.prototype.set;
  ch.prototype.setProperties = ch.prototype.I;
  ch.prototype.unset = ch.prototype.T;
  ch.prototype.changed = ch.prototype.s;
  ch.prototype.dispatchEvent = ch.prototype.b;
  ch.prototype.getRevision = ch.prototype.M;
  ch.prototype.on = ch.prototype.J;
  ch.prototype.once = ch.prototype.N;
  ch.prototype.un = ch.prototype.K;
  ch.prototype.unByKey = ch.prototype.O;
  gh.prototype.getActive = gh.prototype.f;
  gh.prototype.getMap = gh.prototype.c;
  gh.prototype.setActive = gh.prototype.Ea;
  gh.prototype.get = gh.prototype.get;
  gh.prototype.getKeys = gh.prototype.S;
  gh.prototype.getProperties = gh.prototype.R;
  gh.prototype.set = gh.prototype.set;
  gh.prototype.setProperties = gh.prototype.I;
  gh.prototype.unset = gh.prototype.T;
  gh.prototype.changed = gh.prototype.s;
  gh.prototype.dispatchEvent = gh.prototype.b;
  gh.prototype.getRevision = gh.prototype.M;
  gh.prototype.on = gh.prototype.J;
  gh.prototype.once = gh.prototype.N;
  gh.prototype.un = gh.prototype.K;
  gh.prototype.unByKey = gh.prototype.O;
  kh.prototype.getActive = kh.prototype.f;
  kh.prototype.getMap = kh.prototype.c;
  kh.prototype.setActive = kh.prototype.Ea;
  kh.prototype.get = kh.prototype.get;
  kh.prototype.getKeys = kh.prototype.S;
  kh.prototype.getProperties = kh.prototype.R;
  kh.prototype.set = kh.prototype.set;
  kh.prototype.setProperties = kh.prototype.I;
  kh.prototype.unset = kh.prototype.T;
  kh.prototype.changed = kh.prototype.s;
  kh.prototype.dispatchEvent = kh.prototype.b;
  kh.prototype.getRevision = kh.prototype.M;
  kh.prototype.on = kh.prototype.J;
  kh.prototype.once = kh.prototype.N;
  kh.prototype.un = kh.prototype.K;
  kh.prototype.unByKey = kh.prototype.O;
  Dw.prototype.getActive = Dw.prototype.f;
  Dw.prototype.getMap = Dw.prototype.c;
  Dw.prototype.setActive = Dw.prototype.Ea;
  Dw.prototype.get = Dw.prototype.get;
  Dw.prototype.getKeys = Dw.prototype.S;
  Dw.prototype.getProperties = Dw.prototype.R;
  Dw.prototype.set = Dw.prototype.set;
  Dw.prototype.setProperties = Dw.prototype.I;
  Dw.prototype.unset = Dw.prototype.T;
  Dw.prototype.changed = Dw.prototype.s;
  Dw.prototype.dispatchEvent = Dw.prototype.b;
  Dw.prototype.getRevision = Dw.prototype.M;
  Dw.prototype.on = Dw.prototype.J;
  Dw.prototype.once = Dw.prototype.N;
  Dw.prototype.un = Dw.prototype.K;
  Dw.prototype.unByKey = Dw.prototype.O;
  Gw.prototype.type = Gw.prototype.type;
  Gw.prototype.target = Gw.prototype.target;
  Gw.prototype.preventDefault = Gw.prototype.preventDefault;
  Gw.prototype.stopPropagation = Gw.prototype.stopPropagation;
  Iw.prototype.getActive = Iw.prototype.f;
  Iw.prototype.getMap = Iw.prototype.c;
  Iw.prototype.setActive = Iw.prototype.Ea;
  Iw.prototype.get = Iw.prototype.get;
  Iw.prototype.getKeys = Iw.prototype.S;
  Iw.prototype.getProperties = Iw.prototype.R;
  Iw.prototype.set = Iw.prototype.set;
  Iw.prototype.setProperties = Iw.prototype.I;
  Iw.prototype.unset = Iw.prototype.T;
  Iw.prototype.changed = Iw.prototype.s;
  Iw.prototype.dispatchEvent = Iw.prototype.b;
  Iw.prototype.getRevision = Iw.prototype.M;
  Iw.prototype.on = Iw.prototype.J;
  Iw.prototype.once = Iw.prototype.N;
  Iw.prototype.un = Iw.prototype.K;
  Iw.prototype.unByKey = Iw.prototype.O;
  Mw.prototype.getActive = Mw.prototype.f;
  Mw.prototype.getMap = Mw.prototype.c;
  Mw.prototype.setActive = Mw.prototype.Ea;
  Mw.prototype.get = Mw.prototype.get;
  Mw.prototype.getKeys = Mw.prototype.S;
  Mw.prototype.getProperties = Mw.prototype.R;
  Mw.prototype.set = Mw.prototype.set;
  Mw.prototype.setProperties = Mw.prototype.I;
  Mw.prototype.unset = Mw.prototype.T;
  Mw.prototype.changed = Mw.prototype.s;
  Mw.prototype.dispatchEvent = Mw.prototype.b;
  Mw.prototype.getRevision = Mw.prototype.M;
  Mw.prototype.on = Mw.prototype.J;
  Mw.prototype.once = Mw.prototype.N;
  Mw.prototype.un = Mw.prototype.K;
  Mw.prototype.unByKey = Mw.prototype.O;
  Sw.prototype.type = Sw.prototype.type;
  Sw.prototype.target = Sw.prototype.target;
  Sw.prototype.preventDefault = Sw.prototype.preventDefault;
  Sw.prototype.stopPropagation = Sw.prototype.stopPropagation;
  Rc.prototype.get = Rc.prototype.get;
  Rc.prototype.getKeys = Rc.prototype.S;
  Rc.prototype.getProperties = Rc.prototype.R;
  Rc.prototype.set = Rc.prototype.set;
  Rc.prototype.setProperties = Rc.prototype.I;
  Rc.prototype.unset = Rc.prototype.T;
  Rc.prototype.changed = Rc.prototype.s;
  Rc.prototype.dispatchEvent = Rc.prototype.b;
  Rc.prototype.getRevision = Rc.prototype.M;
  Rc.prototype.on = Rc.prototype.J;
  Rc.prototype.once = Rc.prototype.N;
  Rc.prototype.un = Rc.prototype.K;
  Rc.prototype.unByKey = Rc.prototype.O;
  Uc.prototype.getClosestPoint = Uc.prototype.Cb;
  Uc.prototype.intersectsCoordinate = Uc.prototype.mb;
  Uc.prototype.getExtent = Uc.prototype.G;
  Uc.prototype.rotate = Uc.prototype.rotate;
  Uc.prototype.scale = Uc.prototype.scale;
  Uc.prototype.simplify = Uc.prototype.Jb;
  Uc.prototype.transform = Uc.prototype.ob;
  Uc.prototype.get = Uc.prototype.get;
  Uc.prototype.getKeys = Uc.prototype.S;
  Uc.prototype.getProperties = Uc.prototype.R;
  Uc.prototype.set = Uc.prototype.set;
  Uc.prototype.setProperties = Uc.prototype.I;
  Uc.prototype.unset = Uc.prototype.T;
  Uc.prototype.changed = Uc.prototype.s;
  Uc.prototype.dispatchEvent = Uc.prototype.b;
  Uc.prototype.getRevision = Uc.prototype.M;
  Uc.prototype.on = Uc.prototype.J;
  Uc.prototype.once = Uc.prototype.N;
  Uc.prototype.un = Uc.prototype.K;
  Uc.prototype.unByKey = Uc.prototype.O;
  bv.prototype.getFirstCoordinate = bv.prototype.Rb;
  bv.prototype.getLastCoordinate = bv.prototype.Sb;
  bv.prototype.getLayout = bv.prototype.Tb;
  bv.prototype.rotate = bv.prototype.rotate;
  bv.prototype.scale = bv.prototype.scale;
  bv.prototype.getClosestPoint = bv.prototype.Cb;
  bv.prototype.intersectsCoordinate = bv.prototype.mb;
  bv.prototype.getExtent = bv.prototype.G;
  bv.prototype.simplify = bv.prototype.Jb;
  bv.prototype.get = bv.prototype.get;
  bv.prototype.getKeys = bv.prototype.S;
  bv.prototype.getProperties = bv.prototype.R;
  bv.prototype.set = bv.prototype.set;
  bv.prototype.setProperties = bv.prototype.I;
  bv.prototype.unset = bv.prototype.T;
  bv.prototype.changed = bv.prototype.s;
  bv.prototype.dispatchEvent = bv.prototype.b;
  bv.prototype.getRevision = bv.prototype.M;
  bv.prototype.on = bv.prototype.J;
  bv.prototype.once = bv.prototype.N;
  bv.prototype.un = bv.prototype.K;
  bv.prototype.unByKey = bv.prototype.O;
  Vo.prototype.getClosestPoint = Vo.prototype.Cb;
  Vo.prototype.intersectsCoordinate = Vo.prototype.mb;
  Vo.prototype.getExtent = Vo.prototype.G;
  Vo.prototype.rotate = Vo.prototype.rotate;
  Vo.prototype.scale = Vo.prototype.scale;
  Vo.prototype.simplify = Vo.prototype.Jb;
  Vo.prototype.transform = Vo.prototype.ob;
  Vo.prototype.get = Vo.prototype.get;
  Vo.prototype.getKeys = Vo.prototype.S;
  Vo.prototype.getProperties = Vo.prototype.R;
  Vo.prototype.set = Vo.prototype.set;
  Vo.prototype.setProperties = Vo.prototype.I;
  Vo.prototype.unset = Vo.prototype.T;
  Vo.prototype.changed = Vo.prototype.s;
  Vo.prototype.dispatchEvent = Vo.prototype.b;
  Vo.prototype.getRevision = Vo.prototype.M;
  Vo.prototype.on = Vo.prototype.J;
  Vo.prototype.once = Vo.prototype.N;
  Vo.prototype.un = Vo.prototype.K;
  Vo.prototype.unByKey = Vo.prototype.O;
  md.prototype.getFirstCoordinate = md.prototype.Rb;
  md.prototype.getLastCoordinate = md.prototype.Sb;
  md.prototype.getLayout = md.prototype.Tb;
  md.prototype.rotate = md.prototype.rotate;
  md.prototype.scale = md.prototype.scale;
  md.prototype.getClosestPoint = md.prototype.Cb;
  md.prototype.intersectsCoordinate = md.prototype.mb;
  md.prototype.getExtent = md.prototype.G;
  md.prototype.simplify = md.prototype.Jb;
  md.prototype.transform = md.prototype.ob;
  md.prototype.get = md.prototype.get;
  md.prototype.getKeys = md.prototype.S;
  md.prototype.getProperties = md.prototype.R;
  md.prototype.set = md.prototype.set;
  md.prototype.setProperties = md.prototype.I;
  md.prototype.unset = md.prototype.T;
  md.prototype.changed = md.prototype.s;
  md.prototype.dispatchEvent = md.prototype.b;
  md.prototype.getRevision = md.prototype.M;
  md.prototype.on = md.prototype.J;
  md.prototype.once = md.prototype.N;
  md.prototype.un = md.prototype.K;
  md.prototype.unByKey = md.prototype.O;
  P.prototype.getFirstCoordinate = P.prototype.Rb;
  P.prototype.getLastCoordinate = P.prototype.Sb;
  P.prototype.getLayout = P.prototype.Tb;
  P.prototype.rotate = P.prototype.rotate;
  P.prototype.scale = P.prototype.scale;
  P.prototype.getClosestPoint = P.prototype.Cb;
  P.prototype.intersectsCoordinate = P.prototype.mb;
  P.prototype.getExtent = P.prototype.G;
  P.prototype.simplify = P.prototype.Jb;
  P.prototype.transform = P.prototype.ob;
  P.prototype.get = P.prototype.get;
  P.prototype.getKeys = P.prototype.S;
  P.prototype.getProperties = P.prototype.R;
  P.prototype.set = P.prototype.set;
  P.prototype.setProperties = P.prototype.I;
  P.prototype.unset = P.prototype.T;
  P.prototype.changed = P.prototype.s;
  P.prototype.dispatchEvent = P.prototype.b;
  P.prototype.getRevision = P.prototype.M;
  P.prototype.on = P.prototype.J;
  P.prototype.once = P.prototype.N;
  P.prototype.un = P.prototype.K;
  P.prototype.unByKey = P.prototype.O;
  Q.prototype.getFirstCoordinate = Q.prototype.Rb;
  Q.prototype.getLastCoordinate = Q.prototype.Sb;
  Q.prototype.getLayout = Q.prototype.Tb;
  Q.prototype.rotate = Q.prototype.rotate;
  Q.prototype.scale = Q.prototype.scale;
  Q.prototype.getClosestPoint = Q.prototype.Cb;
  Q.prototype.intersectsCoordinate = Q.prototype.mb;
  Q.prototype.getExtent = Q.prototype.G;
  Q.prototype.simplify = Q.prototype.Jb;
  Q.prototype.transform = Q.prototype.ob;
  Q.prototype.get = Q.prototype.get;
  Q.prototype.getKeys = Q.prototype.S;
  Q.prototype.getProperties = Q.prototype.R;
  Q.prototype.set = Q.prototype.set;
  Q.prototype.setProperties = Q.prototype.I;
  Q.prototype.unset = Q.prototype.T;
  Q.prototype.changed = Q.prototype.s;
  Q.prototype.dispatchEvent = Q.prototype.b;
  Q.prototype.getRevision = Q.prototype.M;
  Q.prototype.on = Q.prototype.J;
  Q.prototype.once = Q.prototype.N;
  Q.prototype.un = Q.prototype.K;
  Q.prototype.unByKey = Q.prototype.O;
  R.prototype.getFirstCoordinate = R.prototype.Rb;
  R.prototype.getLastCoordinate = R.prototype.Sb;
  R.prototype.getLayout = R.prototype.Tb;
  R.prototype.rotate = R.prototype.rotate;
  R.prototype.scale = R.prototype.scale;
  R.prototype.getClosestPoint = R.prototype.Cb;
  R.prototype.intersectsCoordinate = R.prototype.mb;
  R.prototype.getExtent = R.prototype.G;
  R.prototype.simplify = R.prototype.Jb;
  R.prototype.transform = R.prototype.ob;
  R.prototype.get = R.prototype.get;
  R.prototype.getKeys = R.prototype.S;
  R.prototype.getProperties = R.prototype.R;
  R.prototype.set = R.prototype.set;
  R.prototype.setProperties = R.prototype.I;
  R.prototype.unset = R.prototype.T;
  R.prototype.changed = R.prototype.s;
  R.prototype.dispatchEvent = R.prototype.b;
  R.prototype.getRevision = R.prototype.M;
  R.prototype.on = R.prototype.J;
  R.prototype.once = R.prototype.N;
  R.prototype.un = R.prototype.K;
  R.prototype.unByKey = R.prototype.O;
  S.prototype.getFirstCoordinate = S.prototype.Rb;
  S.prototype.getLastCoordinate = S.prototype.Sb;
  S.prototype.getLayout = S.prototype.Tb;
  S.prototype.rotate = S.prototype.rotate;
  S.prototype.scale = S.prototype.scale;
  S.prototype.getClosestPoint = S.prototype.Cb;
  S.prototype.intersectsCoordinate = S.prototype.mb;
  S.prototype.getExtent = S.prototype.G;
  S.prototype.simplify = S.prototype.Jb;
  S.prototype.transform = S.prototype.ob;
  S.prototype.get = S.prototype.get;
  S.prototype.getKeys = S.prototype.S;
  S.prototype.getProperties = S.prototype.R;
  S.prototype.set = S.prototype.set;
  S.prototype.setProperties = S.prototype.I;
  S.prototype.unset = S.prototype.T;
  S.prototype.changed = S.prototype.s;
  S.prototype.dispatchEvent = S.prototype.b;
  S.prototype.getRevision = S.prototype.M;
  S.prototype.on = S.prototype.J;
  S.prototype.once = S.prototype.N;
  S.prototype.un = S.prototype.K;
  S.prototype.unByKey = S.prototype.O;
  C.prototype.getFirstCoordinate = C.prototype.Rb;
  C.prototype.getLastCoordinate = C.prototype.Sb;
  C.prototype.getLayout = C.prototype.Tb;
  C.prototype.rotate = C.prototype.rotate;
  C.prototype.scale = C.prototype.scale;
  C.prototype.getClosestPoint = C.prototype.Cb;
  C.prototype.intersectsCoordinate = C.prototype.mb;
  C.prototype.getExtent = C.prototype.G;
  C.prototype.simplify = C.prototype.Jb;
  C.prototype.transform = C.prototype.ob;
  C.prototype.get = C.prototype.get;
  C.prototype.getKeys = C.prototype.S;
  C.prototype.getProperties = C.prototype.R;
  C.prototype.set = C.prototype.set;
  C.prototype.setProperties = C.prototype.I;
  C.prototype.unset = C.prototype.T;
  C.prototype.changed = C.prototype.s;
  C.prototype.dispatchEvent = C.prototype.b;
  C.prototype.getRevision = C.prototype.M;
  C.prototype.on = C.prototype.J;
  C.prototype.once = C.prototype.N;
  C.prototype.un = C.prototype.K;
  C.prototype.unByKey = C.prototype.O;
  E.prototype.getFirstCoordinate = E.prototype.Rb;
  E.prototype.getLastCoordinate = E.prototype.Sb;
  E.prototype.getLayout = E.prototype.Tb;
  E.prototype.rotate = E.prototype.rotate;
  E.prototype.scale = E.prototype.scale;
  E.prototype.getClosestPoint = E.prototype.Cb;
  E.prototype.intersectsCoordinate = E.prototype.mb;
  E.prototype.getExtent = E.prototype.G;
  E.prototype.simplify = E.prototype.Jb;
  E.prototype.transform = E.prototype.ob;
  E.prototype.get = E.prototype.get;
  E.prototype.getKeys = E.prototype.S;
  E.prototype.getProperties = E.prototype.R;
  E.prototype.set = E.prototype.set;
  E.prototype.setProperties = E.prototype.I;
  E.prototype.unset = E.prototype.T;
  E.prototype.changed = E.prototype.s;
  E.prototype.dispatchEvent = E.prototype.b;
  E.prototype.getRevision = E.prototype.M;
  E.prototype.on = E.prototype.J;
  E.prototype.once = E.prototype.N;
  E.prototype.un = E.prototype.K;
  E.prototype.unByKey = E.prototype.O;
  tp.prototype.readFeatures = tp.prototype.La;
  Cp.prototype.readFeatures = Cp.prototype.La;
  tp.prototype.readFeatures = tp.prototype.La;
  Ie.prototype.get = Ie.prototype.get;
  Ie.prototype.getKeys = Ie.prototype.S;
  Ie.prototype.getProperties = Ie.prototype.R;
  Ie.prototype.set = Ie.prototype.set;
  Ie.prototype.setProperties = Ie.prototype.I;
  Ie.prototype.unset = Ie.prototype.T;
  Ie.prototype.changed = Ie.prototype.s;
  Ie.prototype.dispatchEvent = Ie.prototype.b;
  Ie.prototype.getRevision = Ie.prototype.M;
  Ie.prototype.on = Ie.prototype.J;
  Ie.prototype.once = Ie.prototype.N;
  Ie.prototype.un = Ie.prototype.K;
  Ie.prototype.unByKey = Ie.prototype.O;
  Je.prototype.getMap = Je.prototype.i;
  Je.prototype.setMap = Je.prototype.setMap;
  Je.prototype.setTarget = Je.prototype.c;
  Je.prototype.get = Je.prototype.get;
  Je.prototype.getKeys = Je.prototype.S;
  Je.prototype.getProperties = Je.prototype.R;
  Je.prototype.set = Je.prototype.set;
  Je.prototype.setProperties = Je.prototype.I;
  Je.prototype.unset = Je.prototype.T;
  Je.prototype.changed = Je.prototype.s;
  Je.prototype.dispatchEvent = Je.prototype.b;
  Je.prototype.getRevision = Je.prototype.M;
  Je.prototype.on = Je.prototype.J;
  Je.prototype.once = Je.prototype.N;
  Je.prototype.un = Je.prototype.K;
  Je.prototype.unByKey = Je.prototype.O;
  Me.prototype.getMap = Me.prototype.i;
  Me.prototype.setMap = Me.prototype.setMap;
  Me.prototype.setTarget = Me.prototype.c;
  Me.prototype.get = Me.prototype.get;
  Me.prototype.getKeys = Me.prototype.S;
  Me.prototype.getProperties = Me.prototype.R;
  Me.prototype.set = Me.prototype.set;
  Me.prototype.setProperties = Me.prototype.I;
  Me.prototype.unset = Me.prototype.T;
  Me.prototype.changed = Me.prototype.s;
  Me.prototype.dispatchEvent = Me.prototype.b;
  Me.prototype.getRevision = Me.prototype.M;
  Me.prototype.on = Me.prototype.J;
  Me.prototype.once = Me.prototype.N;
  Me.prototype.un = Me.prototype.K;
  Me.prototype.unByKey = Me.prototype.O;
  Ve.prototype.getMap = Ve.prototype.i;
  Ve.prototype.setMap = Ve.prototype.setMap;
  Ve.prototype.setTarget = Ve.prototype.c;
  Ve.prototype.get = Ve.prototype.get;
  Ve.prototype.getKeys = Ve.prototype.S;
  Ve.prototype.getProperties = Ve.prototype.R;
  Ve.prototype.set = Ve.prototype.set;
  Ve.prototype.setProperties = Ve.prototype.I;
  Ve.prototype.unset = Ve.prototype.T;
  Ve.prototype.changed = Ve.prototype.s;
  Ve.prototype.dispatchEvent = Ve.prototype.b;
  Ve.prototype.getRevision = Ve.prototype.M;
  Ve.prototype.on = Ve.prototype.J;
  Ve.prototype.once = Ve.prototype.N;
  Ve.prototype.un = Ve.prototype.K;
  Ve.prototype.unByKey = Ve.prototype.O;
  gn.prototype.getMap = gn.prototype.i;
  gn.prototype.setMap = gn.prototype.setMap;
  gn.prototype.setTarget = gn.prototype.c;
  gn.prototype.get = gn.prototype.get;
  gn.prototype.getKeys = gn.prototype.S;
  gn.prototype.getProperties = gn.prototype.R;
  gn.prototype.set = gn.prototype.set;
  gn.prototype.setProperties = gn.prototype.I;
  gn.prototype.unset = gn.prototype.T;
  gn.prototype.changed = gn.prototype.s;
  gn.prototype.dispatchEvent = gn.prototype.b;
  gn.prototype.getRevision = gn.prototype.M;
  gn.prototype.on = gn.prototype.J;
  gn.prototype.once = gn.prototype.N;
  gn.prototype.un = gn.prototype.K;
  gn.prototype.unByKey = gn.prototype.O;
  Re.prototype.getMap = Re.prototype.i;
  Re.prototype.setMap = Re.prototype.setMap;
  Re.prototype.setTarget = Re.prototype.c;
  Re.prototype.get = Re.prototype.get;
  Re.prototype.getKeys = Re.prototype.S;
  Re.prototype.getProperties = Re.prototype.R;
  Re.prototype.set = Re.prototype.set;
  Re.prototype.setProperties = Re.prototype.I;
  Re.prototype.unset = Re.prototype.T;
  Re.prototype.changed = Re.prototype.s;
  Re.prototype.dispatchEvent = Re.prototype.b;
  Re.prototype.getRevision = Re.prototype.M;
  Re.prototype.on = Re.prototype.J;
  Re.prototype.once = Re.prototype.N;
  Re.prototype.un = Re.prototype.K;
  Re.prototype.unByKey = Re.prototype.O;
  mn.prototype.getMap = mn.prototype.i;
  mn.prototype.setMap = mn.prototype.setMap;
  mn.prototype.setTarget = mn.prototype.c;
  mn.prototype.get = mn.prototype.get;
  mn.prototype.getKeys = mn.prototype.S;
  mn.prototype.getProperties = mn.prototype.R;
  mn.prototype.set = mn.prototype.set;
  mn.prototype.setProperties = mn.prototype.I;
  mn.prototype.unset = mn.prototype.T;
  mn.prototype.changed = mn.prototype.s;
  mn.prototype.dispatchEvent = mn.prototype.b;
  mn.prototype.getRevision = mn.prototype.M;
  mn.prototype.on = mn.prototype.J;
  mn.prototype.once = mn.prototype.N;
  mn.prototype.un = mn.prototype.K;
  mn.prototype.unByKey = mn.prototype.O;
  Te.prototype.getMap = Te.prototype.i;
  Te.prototype.setMap = Te.prototype.setMap;
  Te.prototype.setTarget = Te.prototype.c;
  Te.prototype.get = Te.prototype.get;
  Te.prototype.getKeys = Te.prototype.S;
  Te.prototype.getProperties = Te.prototype.R;
  Te.prototype.set = Te.prototype.set;
  Te.prototype.setProperties = Te.prototype.I;
  Te.prototype.unset = Te.prototype.T;
  Te.prototype.changed = Te.prototype.s;
  Te.prototype.dispatchEvent = Te.prototype.b;
  Te.prototype.getRevision = Te.prototype.M;
  Te.prototype.on = Te.prototype.J;
  Te.prototype.once = Te.prototype.N;
  Te.prototype.un = Te.prototype.K;
  Te.prototype.unByKey = Te.prototype.O;
  wn.prototype.getMap = wn.prototype.i;
  wn.prototype.setMap = wn.prototype.setMap;
  wn.prototype.setTarget = wn.prototype.c;
  wn.prototype.get = wn.prototype.get;
  wn.prototype.getKeys = wn.prototype.S;
  wn.prototype.getProperties = wn.prototype.R;
  wn.prototype.set = wn.prototype.set;
  wn.prototype.setProperties = wn.prototype.I;
  wn.prototype.unset = wn.prototype.T;
  wn.prototype.changed = wn.prototype.s;
  wn.prototype.dispatchEvent = wn.prototype.b;
  wn.prototype.getRevision = wn.prototype.M;
  wn.prototype.on = wn.prototype.J;
  wn.prototype.once = wn.prototype.N;
  wn.prototype.un = wn.prototype.K;
  wn.prototype.unByKey = wn.prototype.O;
  Bn.prototype.getMap = Bn.prototype.i;
  Bn.prototype.setMap = Bn.prototype.setMap;
  Bn.prototype.setTarget = Bn.prototype.c;
  Bn.prototype.get = Bn.prototype.get;
  Bn.prototype.getKeys = Bn.prototype.S;
  Bn.prototype.getProperties = Bn.prototype.R;
  Bn.prototype.set = Bn.prototype.set;
  Bn.prototype.setProperties = Bn.prototype.I;
  Bn.prototype.unset = Bn.prototype.T;
  Bn.prototype.changed = Bn.prototype.s;
  Bn.prototype.dispatchEvent = Bn.prototype.b;
  Bn.prototype.getRevision = Bn.prototype.M;
  Bn.prototype.on = Bn.prototype.J;
  Bn.prototype.once = Bn.prototype.N;
  Bn.prototype.un = Bn.prototype.K;
  Bn.prototype.unByKey = Bn.prototype.O;
  return OPENLAYERS.ol;
});
