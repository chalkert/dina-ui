/*
 *  /MathJax/jax/input/AsciiMath/jax.js
 *
 *  Copyright (c) 2009-2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function(ab) {
  var g;
  var X = MathJax.Object.Subclass({
    firstChild: null,
    lastChild: null,
    Init: function() {
      this.childNodes = [];
    },
    appendChild: function(ac) {
      if (ac.parent) {
        ac.parent.removeChild(ac);
      }
      if (this.lastChild) {
        this.lastChild.nextSibling = ac;
      }
      if (!this.firstChild) {
        this.firstChild = ac;
      }
      this.childNodes.push(ac);
      ac.parent = this;
      this.lastChild = ac;
      return ac;
    },
    removeChild: function(ae) {
      for (var ad = 0, ac = this.childNodes.length; ad < ac; ad++) {
        if (this.childNodes[ad] === ae) {
          break;
        }
      }
      if (ad === ac) {
        return;
      }
      this.childNodes.splice(ad, 1);
      if (ae === this.firstChild) {
        this.firstChild = ae.nextSibling;
      }
      if (ae === this.lastChild) {
        if (!this.childNodes.length) {
          this.lastChild = null;
        } else {
          this.lastChild = this.childNodes[this.childNodes.length - 1];
        }
      }
      if (ad) {
        this.childNodes[ad - 1].nextSibling = ae.nextSibling;
      }
      ae.nextSibling = ae.parent = null;
      return ae;
    },
    replaceChild: function(af, ad) {
      for (var ae = 0, ac = this.childNodes.length; ae < ac; ae++) {
        if (this.childNodes[ae] === ad) {
          break;
        }
      }
      if (ae) {
        this.childNodes[ae - 1].nextSibling = af;
      } else {
        this.firstChild = af;
      }
      if (ae >= ac - 1) {
        this.lastChild = af;
      }
      this.childNodes[ae] = af;
      af.nextSibling = ad.nextSibling;
      ad.nextSibling = ad.parent = null;
      return ad;
    },
    hasChildNodes: function(ac) {
      return this.childNodes.length > 0;
    },
    toString: function() {
      return "{" + this.childNodes.join("") + "}";
    }
  });
  var x = function() {
    g = MathJax.ElementJax.mml;
    var ac = g.mbase.prototype.Init;
    g.mbase.Augment({
      firstChild: null,
      lastChild: null,
      nodeValue: null,
      nextSibling: null,
      Init: function() {
        var ad = ac.apply(this, arguments) || this;
        ad.childNodes = ad.data;
        ad.nodeName = ad.type;
        return ad;
      },
      appendChild: function(ag) {
        if (ag.parent) {
          ag.parent.removeChild(ag);
        }
        var ae = arguments;
        if (ag.isa(X)) {
          ae = ag.childNodes;
          ag.data = ag.childNodes = [];
          ag.firstChild = ag.lastChild = null;
        }
        for (var af = 0, ad = ae.length; af < ad; af++) {
          ag = ae[af];
          if (this.lastChild) {
            this.lastChild.nextSibling = ag;
          }
          if (!this.firstChild) {
            this.firstChild = ag;
          }
          this.Append(ag);
          this.lastChild = ag;
        }
        return ag;
      },
      removeChild: function(af) {
        for (var ae = 0, ad = this.childNodes.length; ae < ad; ae++) {
          if (this.childNodes[ae] === af) {
            break;
          }
        }
        if (ae === ad) {
          return;
        }
        this.childNodes.splice(ae, 1);
        if (af === this.firstChild) {
          this.firstChild = af.nextSibling;
        }
        if (af === this.lastChild) {
          if (!this.childNodes.length) {
            this.lastChild = null;
          } else {
            this.lastChild = this.childNodes[this.childNodes.length - 1];
          }
        }
        if (ae) {
          this.childNodes[ae - 1].nextSibling = af.nextSibling;
        }
        af.nextSibling = af.parent = null;
        return af;
      },
      replaceChild: function(ag, ae) {
        for (var af = 0, ad = this.childNodes.length; af < ad; af++) {
          if (this.childNodes[af] === ae) {
            break;
          }
        }
        if (af) {
          this.childNodes[af - 1].nextSibling = ag;
        } else {
          this.firstChild = ag;
        }
        if (af >= ad - 1) {
          this.lastChild = ag;
        }
        this.SetData(af, ag);
        ag.nextSibling = ae.nextSibling;
        ae.nextSibling = ae.parent = null;
        return ae;
      },
      hasChildNodes: function(ad) {
        return this.childNodes.length > 0;
      },
      setAttribute: function(ad, ae) {
        this[ad] = ae;
      }
    });
  };
  var Q = {};
  var e = {
    getElementById: true,
    createElementNS: function(ad, ac) {
      var ae = g[ac]();
      if (ac === "mo" && ab.config.useMathMLspacing) {
        ae.useMMLspacing = 128;
      }
      return ae;
    },
    createTextNode: function(ac) {
      return g.chars(ac).With({ nodeValue: ac });
    },
    createDocumentFragment: function() {
      return X();
    }
  };
  var J = { appName: "MathJax" };
  var C = "blue";
  var Z = "serif";
  var o = true;
  var v = true;
  var d = ".";
  var f = true;
  var l = J.appName.slice(0, 9) == "Microsoft";
  function E(ac) {
    if (l) {
      return e.createElement(ac);
    } else {
      return e.createElementNS("http://www.w3.org/1999/xhtml", ac);
    }
  }
  var W = "http://www.w3.org/1998/Math/MathML";
  function P(ac) {
    if (l) {
      return e.createElement("m:" + ac);
    } else {
      return e.createElementNS(W, ac);
    }
  }
  function O(ac, ae) {
    var ad;
    if (l) {
      ad = e.createElement("m:" + ac);
    } else {
      ad = e.createElementNS(W, ac);
    }
    if (ae) {
      ad.appendChild(ae);
    }
    return ad;
  }
  function u(ac, ad) {
    z.push({ input: ac, tag: "mo", output: ad, tex: null, ttype: V });
    B();
  }
  function r(ac) {
    z.push(ac);
    B();
  }
  var D = [
    "\uD835\uDC9C",
    "\u212C",
    "\uD835\uDC9E",
    "\uD835\uDC9F",
    "\u2130",
    "\u2131",
    "\uD835\uDCA2",
    "\u210B",
    "\u2110",
    "\uD835\uDCA5",
    "\uD835\uDCA6",
    "\u2112",
    "\u2133",
    "\uD835\uDCA9",
    "\uD835\uDCAA",
    "\uD835\uDCAB",
    "\uD835\uDCAC",
    "\u211B",
    "\uD835\uDCAE",
    "\uD835\uDCAF",
    "\uD835\uDCB0",
    "\uD835\uDCB1",
    "\uD835\uDCB2",
    "\uD835\uDCB3",
    "\uD835\uDCB4",
    "\uD835\uDCB5",
    "\uD835\uDCB6",
    "\uD835\uDCB7",
    "\uD835\uDCB8",
    "\uD835\uDCB9",
    "\u212F",
    "\uD835\uDCBB",
    "\u210A",
    "\uD835\uDCBD",
    "\uD835\uDCBE",
    "\uD835\uDCBF",
    "\uD835\uDCC0",
    "\uD835\uDCC1",
    "\uD835\uDCC2",
    "\uD835\uDCC3",
    "\u2134",
    "\uD835\uDCC5",
    "\uD835\uDCC6",
    "\uD835\uDCC7",
    "\uD835\uDCC8",
    "\uD835\uDCC9",
    "\uD835\uDCCA",
    "\uD835\uDCCB",
    "\uD835\uDCCC",
    "\uD835\uDCCD",
    "\uD835\uDCCE",
    "\uD835\uDCCF"
  ];
  var H = [
    "\uD835\uDD04",
    "\uD835\uDD05",
    "\u212D",
    "\uD835\uDD07",
    "\uD835\uDD08",
    "\uD835\uDD09",
    "\uD835\uDD0A",
    "\u210C",
    "\u2111",
    "\uD835\uDD0D",
    "\uD835\uDD0E",
    "\uD835\uDD0F",
    "\uD835\uDD10",
    "\uD835\uDD11",
    "\uD835\uDD12",
    "\uD835\uDD13",
    "\uD835\uDD14",
    "\u211C",
    "\uD835\uDD16",
    "\uD835\uDD17",
    "\uD835\uDD18",
    "\uD835\uDD19",
    "\uD835\uDD1A",
    "\uD835\uDD1B",
    "\uD835\uDD1C",
    "\u2128",
    "\uD835\uDD1E",
    "\uD835\uDD1F",
    "\uD835\uDD20",
    "\uD835\uDD21",
    "\uD835\uDD22",
    "\uD835\uDD23",
    "\uD835\uDD24",
    "\uD835\uDD25",
    "\uD835\uDD26",
    "\uD835\uDD27",
    "\uD835\uDD28",
    "\uD835\uDD29",
    "\uD835\uDD2A",
    "\uD835\uDD2B",
    "\uD835\uDD2C",
    "\uD835\uDD2D",
    "\uD835\uDD2E",
    "\uD835\uDD2F",
    "\uD835\uDD30",
    "\uD835\uDD31",
    "\uD835\uDD32",
    "\uD835\uDD33",
    "\uD835\uDD34",
    "\uD835\uDD35",
    "\uD835\uDD36",
    "\uD835\uDD37"
  ];
  var w = [
    "\uD835\uDD38",
    "\uD835\uDD39",
    "\u2102",
    "\uD835\uDD3B",
    "\uD835\uDD3C",
    "\uD835\uDD3D",
    "\uD835\uDD3E",
    "\u210D",
    "\uD835\uDD40",
    "\uD835\uDD41",
    "\uD835\uDD42",
    "\uD835\uDD43",
    "\uD835\uDD44",
    "\u2115",
    "\uD835\uDD46",
    "\u2119",
    "\u211A",
    "\u211D",
    "\uD835\uDD4A",
    "\uD835\uDD4B",
    "\uD835\uDD4C",
    "\uD835\uDD4D",
    "\uD835\uDD4E",
    "\uD835\uDD4F",
    "\uD835\uDD50",
    "\u2124",
    "\uD835\uDD52",
    "\uD835\uDD53",
    "\uD835\uDD54",
    "\uD835\uDD55",
    "\uD835\uDD56",
    "\uD835\uDD57",
    "\uD835\uDD58",
    "\uD835\uDD59",
    "\uD835\uDD5A",
    "\uD835\uDD5B",
    "\uD835\uDD5C",
    "\uD835\uDD5D",
    "\uD835\uDD5E",
    "\uD835\uDD5F",
    "\uD835\uDD60",
    "\uD835\uDD61",
    "\uD835\uDD62",
    "\uD835\uDD63",
    "\uD835\uDD64",
    "\uD835\uDD65",
    "\uD835\uDD66",
    "\uD835\uDD67",
    "\uD835\uDD68",
    "\uD835\uDD69",
    "\uD835\uDD6A",
    "\uD835\uDD6B"
  ];
  var c = 0,
    A = 1,
    U = 2,
    i = 3,
    b = 4,
    h = 5,
    a = 6,
    L = 7,
    V = 8,
    m = 9,
    Y = 10,
    K = 15;
  var k = { input: '"', tag: "mtext", output: "mbox", tex: null, ttype: Y };
  var z = [
    { input: "alpha", tag: "mi", output: "\u03B1", tex: null, ttype: c },
    { input: "beta", tag: "mi", output: "\u03B2", tex: null, ttype: c },
    { input: "chi", tag: "mi", output: "\u03C7", tex: null, ttype: c },
    { input: "delta", tag: "mi", output: "\u03B4", tex: null, ttype: c },
    { input: "Delta", tag: "mo", output: "\u0394", tex: null, ttype: c },
    { input: "epsi", tag: "mi", output: "\u03B5", tex: "epsilon", ttype: c },
    { input: "varepsilon", tag: "mi", output: "\u025B", tex: null, ttype: c },
    { input: "eta", tag: "mi", output: "\u03B7", tex: null, ttype: c },
    { input: "gamma", tag: "mi", output: "\u03B3", tex: null, ttype: c },
    { input: "Gamma", tag: "mo", output: "\u0393", tex: null, ttype: c },
    { input: "iota", tag: "mi", output: "\u03B9", tex: null, ttype: c },
    { input: "kappa", tag: "mi", output: "\u03BA", tex: null, ttype: c },
    { input: "lambda", tag: "mi", output: "\u03BB", tex: null, ttype: c },
    { input: "Lambda", tag: "mo", output: "\u039B", tex: null, ttype: c },
    { input: "lamda", tag: "mi", output: "\u03BB", tex: null, ttype: c },
    { input: "Lamda", tag: "mo", output: "\u039B", tex: null, ttype: c },
    { input: "mu", tag: "mi", output: "\u03BC", tex: null, ttype: c },
    { input: "nu", tag: "mi", output: "\u03BD", tex: null, ttype: c },
    { input: "omega", tag: "mi", output: "\u03C9", tex: null, ttype: c },
    { input: "Omega", tag: "mo", output: "\u03A9", tex: null, ttype: c },
    {
      input: "phi",
      tag: "mi",
      output: f ? "\u03D5" : "\u03C6",
      tex: null,
      ttype: c
    },
    {
      input: "varphi",
      tag: "mi",
      output: f ? "\u03C6" : "\u03D5",
      tex: null,
      ttype: c
    },
    { input: "Phi", tag: "mo", output: "\u03A6", tex: null, ttype: c },
    { input: "pi", tag: "mi", output: "\u03C0", tex: null, ttype: c },
    { input: "Pi", tag: "mo", output: "\u03A0", tex: null, ttype: c },
    { input: "psi", tag: "mi", output: "\u03C8", tex: null, ttype: c },
    { input: "Psi", tag: "mi", output: "\u03A8", tex: null, ttype: c },
    { input: "rho", tag: "mi", output: "\u03C1", tex: null, ttype: c },
    { input: "sigma", tag: "mi", output: "\u03C3", tex: null, ttype: c },
    { input: "Sigma", tag: "mo", output: "\u03A3", tex: null, ttype: c },
    { input: "tau", tag: "mi", output: "\u03C4", tex: null, ttype: c },
    { input: "theta", tag: "mi", output: "\u03B8", tex: null, ttype: c },
    { input: "vartheta", tag: "mi", output: "\u03D1", tex: null, ttype: c },
    { input: "Theta", tag: "mo", output: "\u0398", tex: null, ttype: c },
    { input: "upsilon", tag: "mi", output: "\u03C5", tex: null, ttype: c },
    { input: "xi", tag: "mi", output: "\u03BE", tex: null, ttype: c },
    { input: "Xi", tag: "mo", output: "\u039E", tex: null, ttype: c },
    { input: "zeta", tag: "mi", output: "\u03B6", tex: null, ttype: c },
    { input: "*", tag: "mo", output: "\u22C5", tex: "cdot", ttype: c },
    { input: "**", tag: "mo", output: "\u2217", tex: "ast", ttype: c },
    { input: "***", tag: "mo", output: "\u22C6", tex: "star", ttype: c },
    { input: "//", tag: "mo", output: "/", tex: null, ttype: c },
    { input: "\\\\", tag: "mo", output: "\\", tex: "backslash", ttype: c },
    { input: "setminus", tag: "mo", output: "\\", tex: null, ttype: c },
    { input: "xx", tag: "mo", output: "\u00D7", tex: "times", ttype: c },
    { input: "|><", tag: "mo", output: "\u22C9", tex: "ltimes", ttype: c },
    { input: "><|", tag: "mo", output: "\u22CA", tex: "rtimes", ttype: c },
    { input: "|><|", tag: "mo", output: "\u22C8", tex: "bowtie", ttype: c },
    { input: "-:", tag: "mo", output: "\u00F7", tex: "div", ttype: c },
    { input: "divide", tag: "mo", output: "-:", tex: null, ttype: V },
    { input: "@", tag: "mo", output: "\u2218", tex: "circ", ttype: c },
    { input: "o+", tag: "mo", output: "\u2295", tex: "oplus", ttype: c },
    { input: "ox", tag: "mo", output: "\u2297", tex: "otimes", ttype: c },
    { input: "o.", tag: "mo", output: "\u2299", tex: "odot", ttype: c },
    { input: "sum", tag: "mo", output: "\u2211", tex: null, ttype: L },
    { input: "prod", tag: "mo", output: "\u220F", tex: null, ttype: L },
    { input: "^^", tag: "mo", output: "\u2227", tex: "wedge", ttype: c },
    { input: "^^^", tag: "mo", output: "\u22C0", tex: "bigwedge", ttype: L },
    { input: "vv", tag: "mo", output: "\u2228", tex: "vee", ttype: c },
    { input: "vvv", tag: "mo", output: "\u22C1", tex: "bigvee", ttype: L },
    { input: "nn", tag: "mo", output: "\u2229", tex: "cap", ttype: c },
    { input: "nnn", tag: "mo", output: "\u22C2", tex: "bigcap", ttype: L },
    { input: "uu", tag: "mo", output: "\u222A", tex: "cup", ttype: c },
    { input: "uuu", tag: "mo", output: "\u22C3", tex: "bigcup", ttype: L },
    { input: "!=", tag: "mo", output: "\u2260", tex: "ne", ttype: c },
    { input: ":=", tag: "mo", output: ":=", tex: null, ttype: c },
    { input: "lt", tag: "mo", output: "<", tex: null, ttype: c },
    { input: "<=", tag: "mo", output: "\u2264", tex: "le", ttype: c },
    { input: "lt=", tag: "mo", output: "\u2264", tex: "leq", ttype: c },
    { input: "gt", tag: "mo", output: ">", tex: null, ttype: c },
    { input: ">=", tag: "mo", output: "\u2265", tex: "ge", ttype: c },
    { input: "gt=", tag: "mo", output: "\u2265", tex: "geq", ttype: c },
    { input: "-<", tag: "mo", output: "\u227A", tex: "prec", ttype: c },
    { input: "-lt", tag: "mo", output: "\u227A", tex: null, ttype: c },
    { input: ">-", tag: "mo", output: "\u227B", tex: "succ", ttype: c },
    { input: "-<=", tag: "mo", output: "\u2AAF", tex: "preceq", ttype: c },
    { input: ">-=", tag: "mo", output: "\u2AB0", tex: "succeq", ttype: c },
    { input: "in", tag: "mo", output: "\u2208", tex: null, ttype: c },
    { input: "!in", tag: "mo", output: "\u2209", tex: "notin", ttype: c },
    { input: "sub", tag: "mo", output: "\u2282", tex: "subset", ttype: c },
    { input: "sup", tag: "mo", output: "\u2283", tex: "supset", ttype: c },
    { input: "sube", tag: "mo", output: "\u2286", tex: "subseteq", ttype: c },
    { input: "supe", tag: "mo", output: "\u2287", tex: "supseteq", ttype: c },
    { input: "-=", tag: "mo", output: "\u2261", tex: "equiv", ttype: c },
    { input: "~=", tag: "mo", output: "\u2245", tex: "cong", ttype: c },
    { input: "~~", tag: "mo", output: "\u2248", tex: "approx", ttype: c },
    { input: "prop", tag: "mo", output: "\u221D", tex: "propto", ttype: c },
    { input: "and", tag: "mtext", output: "and", tex: null, ttype: a },
    { input: "or", tag: "mtext", output: "or", tex: null, ttype: a },
    { input: "not", tag: "mo", output: "\u00AC", tex: "neg", ttype: c },
    { input: "=>", tag: "mo", output: "\u21D2", tex: "implies", ttype: c },
    { input: "if", tag: "mo", output: "if", tex: null, ttype: a },
    { input: "<=>", tag: "mo", output: "\u21D4", tex: "iff", ttype: c },
    { input: "AA", tag: "mo", output: "\u2200", tex: "forall", ttype: c },
    { input: "EE", tag: "mo", output: "\u2203", tex: "exists", ttype: c },
    { input: "_|_", tag: "mo", output: "\u22A5", tex: "bot", ttype: c },
    { input: "TT", tag: "mo", output: "\u22A4", tex: "top", ttype: c },
    { input: "|--", tag: "mo", output: "\u22A2", tex: "vdash", ttype: c },
    { input: "|==", tag: "mo", output: "\u22A8", tex: "models", ttype: c },
    { input: "(", tag: "mo", output: "(", tex: null, ttype: b },
    { input: ")", tag: "mo", output: ")", tex: null, ttype: h },
    { input: "[", tag: "mo", output: "[", tex: null, ttype: b },
    { input: "]", tag: "mo", output: "]", tex: null, ttype: h },
    { input: "{", tag: "mo", output: "{", tex: null, ttype: b },
    { input: "}", tag: "mo", output: "}", tex: null, ttype: h },
    { input: "|", tag: "mo", output: "|", tex: null, ttype: m },
    { input: "(:", tag: "mo", output: "\u2329", tex: "langle", ttype: b },
    { input: ":)", tag: "mo", output: "\u232A", tex: "rangle", ttype: h },
    { input: "<<", tag: "mo", output: "\u2329", tex: null, ttype: b },
    { input: ">>", tag: "mo", output: "\u232A", tex: null, ttype: h },
    {
      input: "{:",
      tag: "mo",
      output: "{:",
      tex: null,
      ttype: b,
      invisible: true
    },
    {
      input: ":}",
      tag: "mo",
      output: ":}",
      tex: null,
      ttype: h,
      invisible: true
    },
    { input: "int", tag: "mo", output: "\u222B", tex: null, ttype: c },
    { input: "dx", tag: "mi", output: "{:d x:}", tex: null, ttype: V },
    { input: "dy", tag: "mi", output: "{:d y:}", tex: null, ttype: V },
    { input: "dz", tag: "mi", output: "{:d z:}", tex: null, ttype: V },
    { input: "dt", tag: "mi", output: "{:d t:}", tex: null, ttype: V },
    { input: "oint", tag: "mo", output: "\u222E", tex: null, ttype: c },
    { input: "del", tag: "mo", output: "\u2202", tex: "partial", ttype: c },
    { input: "grad", tag: "mo", output: "\u2207", tex: "nabla", ttype: c },
    { input: "+-", tag: "mo", output: "\u00B1", tex: "pm", ttype: c },
    { input: "O/", tag: "mo", output: "\u2205", tex: "emptyset", ttype: c },
    { input: "oo", tag: "mo", output: "\u221E", tex: "infty", ttype: c },
    { input: "aleph", tag: "mo", output: "\u2135", tex: null, ttype: c },
    { input: "...", tag: "mo", output: "...", tex: "ldots", ttype: c },
    { input: ":.", tag: "mo", output: "\u2234", tex: "therefore", ttype: c },
    { input: ":'", tag: "mo", output: "\u2235", tex: "because", ttype: c },
    { input: "/_", tag: "mo", output: "\u2220", tex: "angle", ttype: c },
    { input: "/_\\", tag: "mo", output: "\u25B3", tex: "triangle", ttype: c },
    { input: "'", tag: "mo", output: "\u2032", tex: "prime", ttype: c },
    {
      input: "tilde",
      tag: "mover",
      output: "~",
      tex: null,
      ttype: A,
      acc: true
    },
    { input: "\\ ", tag: "mo", output: "\u00A0", tex: null, ttype: c },
    { input: "frown", tag: "mo", output: "\u2322", tex: null, ttype: c },
    { input: "quad", tag: "mo", output: "\u00A0\u00A0", tex: null, ttype: c },
    {
      input: "qquad",
      tag: "mo",
      output: "\u00A0\u00A0\u00A0\u00A0",
      tex: null,
      ttype: c
    },
    { input: "cdots", tag: "mo", output: "\u22EF", tex: null, ttype: c },
    { input: "vdots", tag: "mo", output: "\u22EE", tex: null, ttype: c },
    { input: "ddots", tag: "mo", output: "\u22F1", tex: null, ttype: c },
    { input: "diamond", tag: "mo", output: "\u22C4", tex: null, ttype: c },
    { input: "square", tag: "mo", output: "\u25A1", tex: null, ttype: c },
    { input: "|__", tag: "mo", output: "\u230A", tex: "lfloor", ttype: c },
    { input: "__|", tag: "mo", output: "\u230B", tex: "rfloor", ttype: c },
    { input: "|~", tag: "mo", output: "\u2308", tex: "lceiling", ttype: c },
    { input: "~|", tag: "mo", output: "\u2309", tex: "rceiling", ttype: c },
    { input: "CC", tag: "mo", output: "\u2102", tex: null, ttype: c },
    { input: "NN", tag: "mo", output: "\u2115", tex: null, ttype: c },
    { input: "QQ", tag: "mo", output: "\u211A", tex: null, ttype: c },
    { input: "RR", tag: "mo", output: "\u211D", tex: null, ttype: c },
    { input: "ZZ", tag: "mo", output: "\u2124", tex: null, ttype: c },
    { input: "f", tag: "mi", output: "f", tex: null, ttype: A, func: true },
    { input: "g", tag: "mi", output: "g", tex: null, ttype: A, func: true },
    { input: "lim", tag: "mo", output: "lim", tex: null, ttype: L },
    { input: "Lim", tag: "mo", output: "Lim", tex: null, ttype: L },
    { input: "sin", tag: "mo", output: "sin", tex: null, ttype: A, func: true },
    { input: "cos", tag: "mo", output: "cos", tex: null, ttype: A, func: true },
    { input: "tan", tag: "mo", output: "tan", tex: null, ttype: A, func: true },
    {
      input: "sinh",
      tag: "mo",
      output: "sinh",
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: "cosh",
      tag: "mo",
      output: "cosh",
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: "tanh",
      tag: "mo",
      output: "tanh",
      tex: null,
      ttype: A,
      func: true
    },
    { input: "cot", tag: "mo", output: "cot", tex: null, ttype: A, func: true },
    { input: "sec", tag: "mo", output: "sec", tex: null, ttype: A, func: true },
    { input: "csc", tag: "mo", output: "csc", tex: null, ttype: A, func: true },
    {
      input: "arcsin",
      tag: "mo",
      output: "arcsin",
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: "arccos",
      tag: "mo",
      output: "arccos",
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: "arctan",
      tag: "mo",
      output: "arctan",
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: "coth",
      tag: "mo",
      output: "coth",
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: "sech",
      tag: "mo",
      output: "sech",
      tex: null,
      ttype: A,
      func: true
    },
    {
      input: "csch",
      tag: "mo",
      output: "csch",
      tex: null,
      ttype: A,
      func: true
    },
    { input: "exp", tag: "mo", output: "exp", tex: null, ttype: A, func: true },
    {
      input: "abs",
      tag: "mo",
      output: "abs",
      tex: null,
      ttype: A,
      rewriteleftright: ["|", "|"]
    },
    {
      input: "norm",
      tag: "mo",
      output: "norm",
      tex: null,
      ttype: A,
      rewriteleftright: ["\u2225", "\u2225"]
    },
    {
      input: "floor",
      tag: "mo",
      output: "floor",
      tex: null,
      ttype: A,
      rewriteleftright: ["\u230A", "\u230B"]
    },
    {
      input: "ceil",
      tag: "mo",
      output: "ceil",
      tex: null,
      ttype: A,
      rewriteleftright: ["\u2308", "\u2309"]
    },
    { input: "log", tag: "mo", output: "log", tex: null, ttype: A, func: true },
    { input: "ln", tag: "mo", output: "ln", tex: null, ttype: A, func: true },
    { input: "det", tag: "mo", output: "det", tex: null, ttype: A, func: true },
    { input: "dim", tag: "mo", output: "dim", tex: null, ttype: c },
    { input: "mod", tag: "mo", output: "mod", tex: null, ttype: c },
    { input: "gcd", tag: "mo", output: "gcd", tex: null, ttype: A, func: true },
    { input: "lcm", tag: "mo", output: "lcm", tex: null, ttype: A, func: true },
    { input: "lub", tag: "mo", output: "lub", tex: null, ttype: c },
    { input: "glb", tag: "mo", output: "glb", tex: null, ttype: c },
    { input: "min", tag: "mo", output: "min", tex: null, ttype: L },
    { input: "max", tag: "mo", output: "max", tex: null, ttype: L },
    { input: "uarr", tag: "mo", output: "\u2191", tex: "uparrow", ttype: c },
    { input: "darr", tag: "mo", output: "\u2193", tex: "downarrow", ttype: c },
    { input: "rarr", tag: "mo", output: "\u2192", tex: "rightarrow", ttype: c },
    { input: "->", tag: "mo", output: "\u2192", tex: "to", ttype: c },
    {
      input: ">->",
      tag: "mo",
      output: "\u21A3",
      tex: "rightarrowtail",
      ttype: c
    },
    {
      input: "->>",
      tag: "mo",
      output: "\u21A0",
      tex: "twoheadrightarrow",
      ttype: c
    },
    {
      input: ">->>",
      tag: "mo",
      output: "\u2916",
      tex: "twoheadrightarrowtail",
      ttype: c
    },
    { input: "|->", tag: "mo", output: "\u21A6", tex: "mapsto", ttype: c },
    { input: "larr", tag: "mo", output: "\u2190", tex: "leftarrow", ttype: c },
    {
      input: "harr",
      tag: "mo",
      output: "\u2194",
      tex: "leftrightarrow",
      ttype: c
    },
    { input: "rArr", tag: "mo", output: "\u21D2", tex: "Rightarrow", ttype: c },
    { input: "lArr", tag: "mo", output: "\u21D0", tex: "Leftarrow", ttype: c },
    {
      input: "hArr",
      tag: "mo",
      output: "\u21D4",
      tex: "Leftrightarrow",
      ttype: c
    },
    { input: "sqrt", tag: "msqrt", output: "sqrt", tex: null, ttype: A },
    { input: "root", tag: "mroot", output: "root", tex: null, ttype: U },
    { input: "frac", tag: "mfrac", output: "/", tex: null, ttype: U },
    { input: "/", tag: "mfrac", output: "/", tex: null, ttype: i },
    {
      input: "stackrel",
      tag: "mover",
      output: "stackrel",
      tex: null,
      ttype: U
    },
    { input: "overset", tag: "mover", output: "stackrel", tex: null, ttype: U },
    {
      input: "underset",
      tag: "munder",
      output: "stackrel",
      tex: null,
      ttype: U
    },
    { input: "_", tag: "msub", output: "_", tex: null, ttype: i },
    { input: "^", tag: "msup", output: "^", tex: null, ttype: i },
    {
      input: "hat",
      tag: "mover",
      output: "\u005E",
      tex: null,
      ttype: A,
      acc: true
    },
    {
      input: "bar",
      tag: "mover",
      output: "\u00AF",
      tex: "overline",
      ttype: A,
      acc: true
    },
    {
      input: "vec",
      tag: "mover",
      output: "\u2192",
      tex: null,
      ttype: A,
      acc: true
    },
    { input: "dot", tag: "mover", output: ".", tex: null, ttype: A, acc: true },
    {
      input: "ddot",
      tag: "mover",
      output: "..",
      tex: null,
      ttype: A,
      acc: true
    },
    {
      input: "ul",
      tag: "munder",
      output: "\u0332",
      tex: "underline",
      ttype: A,
      acc: true
    },
    {
      input: "ubrace",
      tag: "munder",
      output: "\u23DF",
      tex: "underbrace",
      ttype: K,
      acc: true
    },
    {
      input: "obrace",
      tag: "mover",
      output: "\u23DE",
      tex: "overbrace",
      ttype: K,
      acc: true
    },
    { input: "text", tag: "mtext", output: "text", tex: null, ttype: Y },
    { input: "mbox", tag: "mtext", output: "mbox", tex: null, ttype: Y },
    { input: "color", tag: "mstyle", ttype: U },
    { input: "cancel", tag: "menclose", output: "cancel", tex: null, ttype: A },
    k,
    {
      input: "bb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "bold",
      output: "bb",
      tex: null,
      ttype: A
    },
    {
      input: "mathbf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "bold",
      output: "mathbf",
      tex: null,
      ttype: A
    },
    {
      input: "sf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "sans-serif",
      output: "sf",
      tex: null,
      ttype: A
    },
    {
      input: "mathsf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "sans-serif",
      output: "mathsf",
      tex: null,
      ttype: A
    },
    {
      input: "bbb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "double-struck",
      output: "bbb",
      tex: null,
      ttype: A,
      codes: w
    },
    {
      input: "mathbb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "double-struck",
      output: "mathbb",
      tex: null,
      ttype: A,
      codes: w
    },
    {
      input: "cc",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "script",
      output: "cc",
      tex: null,
      ttype: A,
      codes: D
    },
    {
      input: "mathcal",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "script",
      output: "mathcal",
      tex: null,
      ttype: A,
      codes: D
    },
    {
      input: "tt",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "monospace",
      output: "tt",
      tex: null,
      ttype: A
    },
    {
      input: "mathtt",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "monospace",
      output: "mathtt",
      tex: null,
      ttype: A
    },
    {
      input: "fr",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "fraktur",
      output: "fr",
      tex: null,
      ttype: A,
      codes: H
    },
    {
      input: "mathfrak",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "fraktur",
      output: "mathfrak",
      tex: null,
      ttype: A,
      codes: H
    }
  ];
  function T(ad, ac) {
    if (ad.input > ac.input) {
      return 1;
    } else {
      return -1;
    }
  }
  var S = [];
  function n() {
    var ad;
    var ac = z.length;
    for (ad = 0; ad < ac; ad++) {
      if (z[ad].tex) {
        z.push({
          input: z[ad].tex,
          tag: z[ad].tag,
          output: z[ad].output,
          ttype: z[ad].ttype,
          acc: z[ad].acc || false
        });
      }
    }
    B();
  }
  function B() {
    var ac;
    z.sort(T);
    for (ac = 0; ac < z.length; ac++) {
      S[ac] = z[ac].input;
    }
  }
  function I(ac, ad) {
    z.push({ input: ac, tag: "mo", output: ad, tex: null, ttype: V });
    B();
  }
  function p(ae, af) {
    var ac;
    if (
      ae.charAt(af) == "\\" &&
      ae.charAt(af + 1) != "\\" &&
      ae.charAt(af + 1) != " "
    ) {
      ac = ae.slice(af + 1);
    } else {
      ac = ae.slice(af);
    }
    for (var ad = 0; ad < ac.length && ac.charCodeAt(ad) <= 32; ad = ad + 1) {}
    return ac.slice(ad);
  }
  function N(ad, ag, ah) {
    if (ah == 0) {
      var af, ac;
      ah = -1;
      af = ad.length;
      while (ah + 1 < af) {
        ac = (ah + af) >> 1;
        if (ad[ac] < ag) {
          ah = ac;
        } else {
          af = ac;
        }
      }
      return af;
    } else {
      for (var ae = ah; ae < ad.length && ad[ae] < ag; ae++) {}
    }
    return ae;
  }
  function j(ai) {
    var ac = 0;
    var ad = 0;
    var af;
    var al;
    var ak;
    var ag = "";
    var ah = true;
    for (var ae = 1; ae <= ai.length && ah; ae++) {
      al = ai.slice(0, ae);
      ad = ac;
      ac = N(S, al, ad);
      if (ac < S.length && ai.slice(0, S[ac].length) == S[ac]) {
        ag = S[ac];
        af = ac;
        ae = ag.length;
      }
      ah = ac < S.length && ai.slice(0, S[ac].length) >= S[ac];
    }
    s = y;
    if (ag != "") {
      y = z[af].ttype;
      return z[af];
    }
    y = c;
    ac = 1;
    al = ai.slice(0, 1);
    var aj = true;
    while ("0" <= al && al <= "9" && ac <= ai.length) {
      al = ai.slice(ac, ac + 1);
      ac++;
    }
    if (al == d) {
      al = ai.slice(ac, ac + 1);
      if ("0" <= al && al <= "9") {
        aj = false;
        ac++;
        while ("0" <= al && al <= "9" && ac <= ai.length) {
          al = ai.slice(ac, ac + 1);
          ac++;
        }
      }
    }
    if ((aj && ac > 1) || ac > 2) {
      al = ai.slice(0, ac - 1);
      ak = "mn";
    } else {
      ac = 2;
      al = ai.slice(0, 1);
      ak = ("A" > al || al > "Z") && ("a" > al || al > "z") ? "mo" : "mi";
    }
    if (al == "-" && s == i) {
      y = i;
      return { input: al, tag: ak, output: al, ttype: A, func: true };
    }
    return { input: al, tag: ak, output: al, ttype: c };
  }
  function R(ad) {
    var ac;
    if (!ad.hasChildNodes()) {
      return;
    }
    if (
      ad.firstChild.hasChildNodes() &&
      (ad.nodeName == "mrow" || ad.nodeName == "M:MROW")
    ) {
      ac = ad.firstChild.firstChild.nodeValue;
      if (ac == "(" || ac == "[" || ac == "{") {
        ad.removeChild(ad.firstChild);
      }
    }
    if (
      ad.lastChild.hasChildNodes() &&
      (ad.nodeName == "mrow" || ad.nodeName == "M:MROW")
    ) {
      ac = ad.lastChild.firstChild.nodeValue;
      if (ac == ")" || ac == "]" || ac == "}") {
        ad.removeChild(ad.lastChild);
      }
    }
  }
  var F, s, y;
  function G(ai) {
    var ae,
      ad,
      al,
      ag,
      ak,
      ah = e.createDocumentFragment();
    ai = p(ai, 0);
    ae = j(ai);
    if (ae == null || (ae.ttype == h && F > 0)) {
      return [null, ai];
    }
    if (ae.ttype == V) {
      ai = ae.output + p(ai, ae.input.length);
      ae = j(ai);
    }
    switch (ae.ttype) {
      case L:
      case c:
        ai = p(ai, ae.input.length);
        return [O(ae.tag, e.createTextNode(ae.output)), ai];
      case b:
        F++;
        ai = p(ai, ae.input.length);
        al = q(ai, true);
        F--;
        if (typeof ae.invisible == "boolean" && ae.invisible) {
          ad = O("mrow", al[0]);
        } else {
          ad = O("mo", e.createTextNode(ae.output));
          ad = O("mrow", ad);
          ad.appendChild(al[0]);
        }
        return [ad, al[1]];
      case Y:
        if (ae != k) {
          ai = p(ai, ae.input.length);
        }
        if (ai.charAt(0) == "{") {
          ag = ai.indexOf("}");
        } else {
          if (ai.charAt(0) == "(") {
            ag = ai.indexOf(")");
          } else {
            if (ai.charAt(0) == "[") {
              ag = ai.indexOf("]");
            } else {
              if (ae == k) {
                ag = ai.slice(1).indexOf('"') + 1;
              } else {
                ag = 0;
              }
            }
          }
        }
        if (ag == -1) {
          ag = ai.length;
        }
        ak = ai.slice(1, ag);
        if (ak.charAt(0) == " ") {
          ad = O("mspace");
          ad.setAttribute("width", "1ex");
          ah.appendChild(ad);
        }
        ah.appendChild(O(ae.tag, e.createTextNode(ak)));
        if (ak.charAt(ak.length - 1) == " ") {
          ad = O("mspace");
          ad.setAttribute("width", "1ex");
          ah.appendChild(ad);
        }
        ai = p(ai, ag + 1);
        return [O("mrow", ah), ai];
      case K:
      case A:
        ai = p(ai, ae.input.length);
        al = G(ai);
        if (al[0] == null) {
          return [O(ae.tag, e.createTextNode(ae.output)), ai];
        }
        if (typeof ae.func == "boolean" && ae.func) {
          ak = ai.charAt(0);
          if (
            ak == "^" ||
            ak == "_" ||
            ak == "/" ||
            ak == "|" ||
            ak == "," ||
            (ae.input.length == 1 && ae.input.match(/\w/) && ak != "(")
          ) {
            return [O(ae.tag, e.createTextNode(ae.output)), ai];
          } else {
            ad = O("mrow", O(ae.tag, e.createTextNode(ae.output)));
            ad.appendChild(al[0]);
            return [ad, al[1]];
          }
        }
        R(al[0]);
        if (ae.input == "sqrt") {
          return [O(ae.tag, al[0]), al[1]];
        } else {
          if (typeof ae.rewriteleftright != "undefined") {
            ad = O("mrow", O("mo", e.createTextNode(ae.rewriteleftright[0])));
            ad.appendChild(al[0]);
            ad.appendChild(O("mo", e.createTextNode(ae.rewriteleftright[1])));
            return [ad, al[1]];
          } else {
            if (ae.input == "cancel") {
              ad = O(ae.tag, al[0]);
              ad.setAttribute("notation", "updiagonalstrike");
              return [ad, al[1]];
            } else {
              if (typeof ae.acc == "boolean" && ae.acc) {
                ad = O(ae.tag, al[0]);
                ad.appendChild(O("mo", e.createTextNode(ae.output)));
                return [ad, al[1]];
              } else {
                if (!l && typeof ae.codes != "undefined") {
                  for (ag = 0; ag < al[0].childNodes.length; ag++) {
                    if (
                      al[0].childNodes[ag].nodeName == "mi" ||
                      al[0].nodeName == "mi"
                    ) {
                      ak =
                        al[0].nodeName == "mi"
                          ? al[0].firstChild.nodeValue
                          : al[0].childNodes[ag].firstChild.nodeValue;
                      var aj = [];
                      for (var af = 0; af < ak.length; af++) {
                        if (ak.charCodeAt(af) > 64 && ak.charCodeAt(af) < 91) {
                          aj = aj + ae.codes[ak.charCodeAt(af) - 65];
                        } else {
                          if (
                            ak.charCodeAt(af) > 96 &&
                            ak.charCodeAt(af) < 123
                          ) {
                            aj = aj + ae.codes[ak.charCodeAt(af) - 71];
                          } else {
                            aj = aj + ak.charAt(af);
                          }
                        }
                      }
                      if (al[0].nodeName == "mi") {
                        al[0] = O("mo").appendChild(e.createTextNode(aj));
                      } else {
                        al[0].replaceChild(
                          O("mo").appendChild(e.createTextNode(aj)),
                          al[0].childNodes[ag]
                        );
                      }
                    }
                  }
                }
                ad = O(ae.tag, al[0]);
                ad.setAttribute(ae.atname, ae.atval);
                return [ad, al[1]];
              }
            }
          }
        }
      case U:
        ai = p(ai, ae.input.length);
        al = G(ai);
        if (al[0] == null) {
          return [O("mo", e.createTextNode(ae.input)), ai];
        }
        R(al[0]);
        var ac = G(al[1]);
        if (ac[0] == null) {
          return [O("mo", e.createTextNode(ae.input)), ai];
        }
        R(ac[0]);
        if (ae.input == "color") {
          if (ai.charAt(0) == "{") {
            ag = ai.indexOf("}");
          } else {
            if (ai.charAt(0) == "(") {
              ag = ai.indexOf(")");
            } else {
              if (ai.charAt(0) == "[") {
                ag = ai.indexOf("]");
              }
            }
          }
          ak = ai.slice(1, ag);
          ad = O(ae.tag, ac[0]);
          ad.setAttribute("mathcolor", ak);
          return [ad, ac[1]];
        }
        if (ae.input == "root" || ae.output == "stackrel") {
          ah.appendChild(ac[0]);
        }
        ah.appendChild(al[0]);
        if (ae.input == "frac") {
          ah.appendChild(ac[0]);
        }
        return [O(ae.tag, ah), ac[1]];
      case i:
        ai = p(ai, ae.input.length);
        return [O("mo", e.createTextNode(ae.output)), ai];
      case a:
        ai = p(ai, ae.input.length);
        ad = O("mspace");
        ad.setAttribute("width", "1ex");
        ah.appendChild(ad);
        ah.appendChild(O(ae.tag, e.createTextNode(ae.output)));
        ad = O("mspace");
        ad.setAttribute("width", "1ex");
        ah.appendChild(ad);
        return [O("mrow", ah), ai];
      case m:
        F++;
        ai = p(ai, ae.input.length);
        al = q(ai, false);
        F--;
        ak = "";
        if (al[0].lastChild != null) {
          ak = al[0].lastChild.firstChild.nodeValue;
        }
        if (ak == "|") {
          ad = O("mo", e.createTextNode(ae.output));
          ad = O("mrow", ad);
          ad.appendChild(al[0]);
          return [ad, al[1]];
        } else {
          ad = O("mo", e.createTextNode("\u2223"));
          ad = O("mrow", ad);
          return [ad, ai];
        }
      default:
        ai = p(ai, ae.input.length);
        return [O(ae.tag, e.createTextNode(ae.output)), ai];
    }
  }
  function t(ai) {
    var ag, aj, ah, af, ac, ae;
    ai = p(ai, 0);
    aj = j(ai);
    ac = G(ai);
    af = ac[0];
    ai = ac[1];
    ag = j(ai);
    if (ag.ttype == i && ag.input != "/") {
      ai = p(ai, ag.input.length);
      ac = G(ai);
      if (ac[0] == null) {
        ac[0] = O("mo", e.createTextNode("\u25A1"));
      } else {
        R(ac[0]);
      }
      ai = ac[1];
      ae = aj.ttype == L || aj.ttype == K;
      if (ag.input == "_") {
        ah = j(ai);
        if (ah.input == "^") {
          ai = p(ai, ah.input.length);
          var ad = G(ai);
          R(ad[0]);
          ai = ad[1];
          af = O(ae ? "munderover" : "msubsup", af);
          af.appendChild(ac[0]);
          af.appendChild(ad[0]);
          af = O("mrow", af);
        } else {
          af = O(ae ? "munder" : "msub", af);
          af.appendChild(ac[0]);
        }
      } else {
        if (ag.input == "^" && ae) {
          af = O("mover", af);
          af.appendChild(ac[0]);
        } else {
          af = O(ag.tag, af);
          af.appendChild(ac[0]);
        }
      }
      if (typeof aj.func != "undefined" && aj.func) {
        ah = j(ai);
        if (ah.ttype != i && ah.ttype != h) {
          ac = t(ai);
          af = O("mrow", af);
          af.appendChild(ac[0]);
          ai = ac[1];
        }
      }
    }
    return [af, ai];
  }
  function q(ak, aj) {
    var ao,
      al,
      ag,
      ar,
      ah = e.createDocumentFragment();
    do {
      ak = p(ak, 0);
      ag = t(ak);
      al = ag[0];
      ak = ag[1];
      ao = j(ak);
      if (ao.ttype == i && ao.input == "/") {
        ak = p(ak, ao.input.length);
        ag = t(ak);
        if (ag[0] == null) {
          ag[0] = O("mo", e.createTextNode("\u25A1"));
        } else {
          R(ag[0]);
        }
        ak = ag[1];
        R(al);
        al = O(ao.tag, al);
        al.appendChild(ag[0]);
        ah.appendChild(al);
        ao = j(ak);
      } else {
        if (al != undefined) {
          ah.appendChild(al);
        }
      }
    } while (
      ((ao.ttype != h && (ao.ttype != m || aj)) || F == 0) &&
      ao != null &&
      ao.output != ""
    );
    if (ao.ttype == h || ao.ttype == m) {
      var at = ah.childNodes.length;
      if (
        at > 0 &&
        ah.childNodes[at - 1].nodeName == "mrow" &&
        ah.childNodes[at - 1].lastChild &&
        ah.childNodes[at - 1].lastChild.firstChild
      ) {
        var av = ah.childNodes[at - 1].lastChild.firstChild.nodeValue;
        if (av == ")" || av == "]") {
          var ad = ah.childNodes[at - 1].firstChild.firstChild.nodeValue;
          if (
            (ad == "(" && av == ")" && ao.output != "}") ||
            (ad == "[" && av == "]")
          ) {
            var ae = [];
            var ap = true;
            var am = ah.childNodes.length;
            for (ar = 0; ap && ar < am; ar = ar + 2) {
              ae[ar] = [];
              al = ah.childNodes[ar];
              if (ap) {
                ap =
                  al.nodeName == "mrow" &&
                  (ar == am - 1 ||
                    (al.nextSibling.nodeName == "mo" &&
                      al.nextSibling.firstChild.nodeValue == ",")) &&
                  al.firstChild.firstChild.nodeValue == ad &&
                  al.lastChild.firstChild.nodeValue == av;
              }
              if (ap) {
                for (var aq = 0; aq < al.childNodes.length; aq++) {
                  if (al.childNodes[aq].firstChild.nodeValue == ",") {
                    ae[ar][ae[ar].length] = aq;
                  }
                }
              }
              if (ap && ar > 1) {
                ap = ae[ar].length == ae[ar - 2].length;
              }
            }
            ap = ap && (ae.length > 1 || ae[0].length > 0);
            if (ap) {
              var af,
                ac,
                ai,
                an,
                au = e.createDocumentFragment();
              for (ar = 0; ar < am; ar = ar + 2) {
                af = e.createDocumentFragment();
                ac = e.createDocumentFragment();
                al = ah.firstChild;
                ai = al.childNodes.length;
                an = 0;
                al.removeChild(al.firstChild);
                for (aq = 1; aq < ai - 1; aq++) {
                  if (typeof ae[ar][an] != "undefined" && aq == ae[ar][an]) {
                    al.removeChild(al.firstChild);
                    af.appendChild(O("mtd", ac));
                    an++;
                  } else {
                    ac.appendChild(al.firstChild);
                  }
                }
                af.appendChild(O("mtd", ac));
                if (ah.childNodes.length > 2) {
                  ah.removeChild(ah.firstChild);
                  ah.removeChild(ah.firstChild);
                }
                au.appendChild(O("mtr", af));
              }
              al = O("mtable", au);
              if (typeof ao.invisible == "boolean" && ao.invisible) {
                al.setAttribute("columnalign", "left");
              }
              ah.replaceChild(al, ah.firstChild);
            }
          }
        }
      }
      ak = p(ak, ao.input.length);
      if (typeof ao.invisible != "boolean" || !ao.invisible) {
        al = O("mo", e.createTextNode(ao.output));
        ah.appendChild(al);
      }
    }
    return [ah, ak];
  }
  function M(ae, ad) {
    var af, ac;
    F = 0;
    ae = ae.replace(/&nbsp;/g, "");
    ae = ae.replace(/&gt;/g, ">");
    ae = ae.replace(/&lt;/g, "<");
    ae = ae.replace(
      /(Sin|Cos|Tan|Arcsin|Arccos|Arctan|Sinh|Cosh|Tanh|Cot|Sec|Csc|Log|Ln|Abs)/g,
      function(ag) {
        return ag.toLowerCase();
      }
    );
    af = q(ae.replace(/^\s+/g, ""), false)[0];
    ac = O("mstyle", af);
    if (C != "") {
      ac.setAttribute("mathcolor", C);
    }
    if (Z != "") {
      ac.setAttribute("fontfamily", Z);
    }
    if (o) {
      ac.setAttribute("displaystyle", "true");
    }
    ac = O("math", ac);
    if (v) {
      ac.setAttribute("title", ae.replace(/\s+/g, " "));
    }
    return ac;
  }
  v = false;
  Z = "";
  C = "";
  (function() {
    for (var ad = 0, ac = z.length; ad < ac; ad++) {
      if (z[ad].codes) {
        delete z[ad].codes;
      }
      if (z[ad].func) {
        z[ad].tag = "mi";
      }
    }
  })();
  ab.Augment({
    AM: {
      Init: function() {
        o = ab.config.displaystyle;
        d = ab.config.decimal || ab.config.decimalsign;
        if (!ab.config.fixphi) {
          for (var ad = 0, ac = z.length; ad < ac; ad++) {
            if (z[ad].input === "phi") {
              z[ad].output = "\u03C6";
            }
            if (z[ad].input === "varphi") {
              z[ad].output = "\u03D5";
              ad = ac;
            }
          }
        }
        x();
        n();
      },
      Augment: function(ac) {
        for (var ad in ac) {
          if (ac.hasOwnProperty(ad)) {
            switch (ad) {
              case "displaystyle":
                o = ac[ad];
                break;
              case "decimal":
                decimal = ac[ad];
                break;
              case "parseMath":
                M = ac[ad];
                break;
              case "parseExpr":
                q = ac[ad];
                break;
              case "parseIexpr":
                t = ac[ad];
                break;
              case "parseSexpr":
                G = ac[ad];
                break;
              case "removeBrackets":
                R = ac[ad];
                break;
              case "getSymbol":
                j = ac[ad];
                break;
              case "position":
                N = ac[ad];
                break;
              case "removeCharsAndBlanks":
                p = ac[ad];
                break;
              case "createMmlNode":
                O = ac[ad];
                break;
              case "createElementMathML":
                P = ac[ad];
                break;
              case "createElementXHTML":
                E = ac[ad];
                break;
              case "initSymbols":
                n = ac[ad];
                break;
              case "refreshSymbols":
                B = ac[ad];
                break;
              case "compareNames":
                T = ac[ad];
                break;
            }
            this[ad] = ac[ad];
          }
        }
      },
      parseMath: M,
      parseExpr: q,
      parseIexpr: t,
      parseSexr: G,
      removeBrackets: R,
      getSymbol: j,
      position: N,
      removeCharsAndBlanks: p,
      createMmlNode: O,
      createElementMathML: P,
      createElementXHTML: E,
      initSymbols: n,
      refreshSymbols: B,
      compareNames: T,
      createDocumentFragment: X,
      document: e,
      define: I,
      newcommand: u,
      newsymbol: r,
      symbols: z,
      names: S,
      TOKEN: {
        CONST: c,
        UNARY: A,
        BINARY: U,
        INFIX: i,
        LEFTBRACKET: b,
        RIGHTBRACKET: h,
        SPACE: a,
        UNDEROVER: L,
        DEFINITION: V,
        LEFTRIGHT: m,
        TEXT: Y,
        UNARYUNDEROVER: K
      }
    }
  });
  var aa = [Q, J];
  aa = null;
})(MathJax.InputJax.AsciiMath);
(function(b) {
  var a;
  b.Augment({
    sourceMenuTitle: ["AsciiMathInput", "AsciiMath Input"],
    annotationEncoding: "text/x-asciimath",
    prefilterHooks: MathJax.Callback.Hooks(true),
    postfilterHooks: MathJax.Callback.Hooks(true),
    Translate: function(c) {
      var d,
        f = MathJax.HTML.getScript(c);
      var g = { math: f, script: c };
      var h = this.prefilterHooks.Execute(g);
      if (h) {
        return h;
      }
      f = g.math;
      try {
        d = this.AM.parseMath(f);
      } catch (e) {
        if (!e.asciimathError) {
          throw e;
        }
        d = this.formatError(e, f);
      }
      g.math = a(d);
      this.postfilterHooks.Execute(g);
      return this.postfilterHooks.Execute(g) || g.math;
    },
    formatError: function(f, e, c) {
      var d = f.message.replace(/\n.*/, "");
      MathJax.Hub.signal.Post(["AsciiMath Jax - parse error", d, e, c]);
      return a.Error(d);
    },
    Error: function(c) {
      throw MathJax.Hub.Insert(Error(c), { asciimathError: true });
    },
    Startup: function() {
      a = MathJax.ElementJax.mml;
      this.AM.Init();
    }
  });
  b.loadComplete("jax.js");
})(MathJax.InputJax.AsciiMath);
