(MathJax.Extension["semantic-enrich"] = {
  version: "1.2.2",
  config: MathJax.Hub.CombineConfig("semantic-enrich", { disabled: !1 }),
  dependents: [],
  running: !1,
  mstyleLookup: {
    mi: ["mathvariant"],
    mo: [
      "mathvariant",
      "accent",
      "largeop",
      "form",
      "fence",
      "separator",
      "movablelimits"
    ],
    mn: ["mathvariant"],
    mtext: ["mathvariant"],
    ms: ["mathvariant"],
    mfrac: ["linethickness"],
    mfenced: ["open", "close", "separators"],
    menclose: ["notation"],
    munder: ["accentunder"],
    mover: ["accent"],
    munderover: ["accent", "accentunder"]
  },
  Filter: function(a, b, c) {
    if ((delete a.enriched, !this.config.disabled))
      try {
        this.running = !0;
        var d = sre.Enrich.semanticMathmlSync(a.root.toMathML());
        (a.root = MathJax.InputJax.MathML.Parse.prototype.MakeMML(d)),
          (a.root.inputID = c.id),
          (a.enriched = !0),
          (this.running = !1);
      } catch (a) {
        throw ((this.running = !1), a);
      }
  },
  Enable: function(a, b) {
    (this.config.disabled = !1),
      a && MathJax.Hub.Queue(["Reprocess", MathJax.Hub]);
  },
  Disable: function(a, b) {
    this.config.disabled = !0;
    for (var c = this.dependents.length - 1; c >= 0; c--) {
      var d = this.dependents[c];
      d.Disable && d.Disable(!1, b);
    }
    a && MathJax.Hub.Queue(["Reprocess", MathJax.Hub]);
  },
  Dependent: function(a) {
    this.dependents.push(a);
  }
}),
  (function() {
    var a = MathJax.Ajax.config.path;
    a.a11y || (a.a11y = HUB.config.root + "/extensions/a11y"),
      a.SRE || (a.SRE = MathJax.Ajax.fileURL(a.a11y)),
      MathJax.Ajax.Load("[SRE]/mathjax-sre.js"),
      MathJax.Hub.Register.StartupHook("Sre Ready", [
        "loadComplete",
        MathJax.Ajax,
        "[SRE]/mathjax-sre.js"
      ]);
  })(),
  MathJax.Callback.Queue(
    ["Require", MathJax.Ajax, "[MathJax]/jax/element/mml/jax.js"],
    ["Require", MathJax.Ajax, "[MathJax]/jax/input/MathML/config.js"],
    ["Require", MathJax.Ajax, "[MathJax]/jax/input/MathML/jax.js"],
    ["Require", MathJax.Ajax, "[MathJax]/extensions/toMathML.js"],
    MathJax.Hub.Register.StartupHook("Sre Ready", function() {
      var a = MathJax.ElementJax.mml,
        b = MathJax.Extension["semantic-enrich"];
      a.mbase.Augment({
        toMathMLattributes: function() {
          var c =
              "mstyle" === this.type
                ? a.math.prototype.defaults
                : this.defaults,
            d = this.attrNames || a.copyAttributeNames,
            e = a.skipAttributes,
            f = a.copyAttributes,
            g = b.running ? b.mstyleLookup[this.type] || [] : [],
            h = [],
            i = this.attr || {};
          if (
            ("math" !== this.type ||
              (this.attr && this.attr.xmlns) ||
              h.push('xmlns="http://www.w3.org/1998/Math/MathML"'),
            !this.attrNames)
          )
            for (var j in c)
              e[j] ||
                f[j] ||
                !c.hasOwnProperty(j) ||
                (null != this[j] &&
                  this[j] !== c[j] &&
                  this.Get(j, null, 1) !== this[j] &&
                  this.toMathMLaddAttr(h, j, this[j]));
          for (var k = 0, l = d.length; k < l; k++)
            (1 !== f[d[k]] || c.hasOwnProperty(d[k])) &&
              ((value = i[d[k]]),
              null == value && (value = this[d[k]]),
              null != value && this.toMathMLaddAttr(h, d[k], value));
          for (k = 0, l = g.length; k < l; k++)
            (j = g[k]),
              c.hasOwnProperty(j) &&
                !h["_" + j] &&
                ((value = this.Get(j, 1)),
                null != value && this.toMathMLaddAttr(h, j, value));
          return this.toMathMLclass(h), h.length ? " " + h.join(" ") : "";
        },
        toMathMLaddAttr: function(a, b, c) {
          a.push(b + '="' + this.toMathMLquote(c) + '"'), (a["_" + b] = 1);
        }
      });
      var c = a.mo.prototype.setTeXclass;
      a.mo.Augment({
        setTeXclass: function(b) {
          this.getValues("form", "lspace", "rspace");
          return this.useMMLspacing
            ? ((this.texClass = a.TEXCLASS.NONE), this)
            : this.attr && this.attr["data-semantic-added"]
            ? ((this.texClass = this.prevClass = a.TEXCLASS.NONE), b)
            : c.apply(this, arguments);
        }
      });
    }),
    function() {
      MathJax.Hub.postInputHooks.Add(
        ["Filter", MathJax.Extension["semantic-enrich"]],
        50
      ),
        MathJax.Hub.Startup.signal.Post("Semantic Enrich Ready"),
        MathJax.Ajax.loadComplete("[a11y]/semantic-enrich.js");
    }
  );
