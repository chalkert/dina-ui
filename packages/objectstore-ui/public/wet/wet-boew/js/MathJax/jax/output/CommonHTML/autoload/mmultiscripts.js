/*
 *  /MathJax/jax/output/CommonHTML/autoload/mmultiscripts.js
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

MathJax.Hub.Register.StartupHook("CommonHTML Jax Ready", function() {
  var c = "2.7.1";
  var a = MathJax.ElementJax.mml,
    b = MathJax.OutputJax.CommonHTML;
  a.mmultiscripts.Augment({
    toCommonHTML: function(K, k) {
      var P = (k || {}).stretch;
      if (!P) {
        K = this.CHTMLcreateNode(K);
        this.CHTMLhandleStyle(K);
        this.CHTMLgetVariant();
        this.CHTMLhandleScale(K);
      }
      b.BBOX.empty(this.CHTML);
      var m, e;
      if (P) {
        m = b.getNode(K, "mjx-base");
      } else {
        this.CHTMLaddChild(K, 0, {
          type: "mjx-base",
          noBBox: true,
          forceChild: true
        });
        m = K.firstChild;
      }
      e = this.CHTMLbboxFor(0);
      if (e.ic) {
        e.R -= e.ic;
        if (!P) {
          m.style.marginRight = b.Em(-e.ic);
        }
        R = 1.3 * e.ic + 0.05;
      }
      var E = {},
        n = {};
      this.CHTMLgetScripts(E, n, P, K);
      var w = E.sub,
        f = E.sup,
        B = E.presub,
        l = E.presup;
      var H = n.sub,
        N = n.sup,
        j = n.presub,
        o = n.presup;
      if (!P) {
        this.CHTMLaddBoxes(K, m, E);
      }
      var g = this.getValues("scriptlevel", "scriptsizemultiplier");
      var i = this.Get("scriptlevel") < 3 ? g.scriptsizemultiplier : 1;
      var O = b.TEX.x_height,
        F = b.TEX.scriptspace;
      var I = b.TEX.sup_drop * i,
        G = b.TEX.sub_drop * i;
      var C = e.h - I,
        A = e.d + G,
        R = 0,
        J;
      var L = this.data[this.base];
      if (L && (L.type === "mi" || L.type === "mo")) {
        if (
          L.data.join("").length === 1 &&
          e.rscale === 1 &&
          !e.sH &&
          !L.Get("largeop")
        ) {
          C = A = 0;
        }
      }
      g = this.getValues(
        "displaystyle",
        "subscriptshift",
        "superscriptshift",
        "texprimestyle"
      );
      g.subscriptshift =
        g.subscriptshift === "" ? 0 : this.CHTMLlength2em(g.subscriptshift);
      g.superscriptshift =
        g.superscriptshift === "" ? 0 : this.CHTMLlength2em(g.superscriptshift);
      var z = B ? F + j.w : l ? F + o.w - R : 0;
      this.CHTML.combine(e, z, 0);
      var y = this.CHTML.w;
      if (!f && !l) {
        A = Math.max(A, b.TEX.sub1, g.subscriptshift);
        if (w) {
          A = Math.max(A, H.h - (4 / 5) * O);
        }
        if (B) {
          A = Math.max(A, j.h - (4 / 5) * O);
        }
        if (w) {
          this.CHTMLplaceSubOnly(w, H, y, A, F);
        }
        if (B) {
          this.CHTMLplacePresubOnly(B, j, A, F);
        }
      } else {
        if (!w && !B) {
          J =
            b.TEX[g.displaystyle ? "sup1" : g.texprimestyle ? "sup3" : "sup2"];
          C = Math.max(C, J, g.superscriptshift);
          if (f) {
            C = Math.max(C, N.d + (1 / 4) * O);
          }
          if (l) {
            C = Math.max(C, o.d + (1 / 4) * O);
          }
          if (f) {
            this.CHTMLplaceSupOnly(f, N, y, R, C, F);
          }
          if (l) {
            this.CHTMLplacePresupOnly(l, o, R, C, F);
          }
        } else {
          A = Math.max(A, b.TEX.sub2);
          var D = b.TEX.rule_thickness;
          var M = (H || j).h,
            Q = (N || o).d;
          if (B) {
            M = Math.max(M, j.h);
          }
          if (l) {
            Q = Math.max(Q, o.d);
          }
          if (C - Q - (M - A) < 3 * D) {
            A = 3 * D - C + Q + M;
            I = (4 / 5) * O - (C - Q);
            if (I > 0) {
              C += I;
              A -= I;
            }
          }
          C = Math.max(C, g.superscriptshift);
          A = Math.max(A, g.subscriptshift);
          if (f) {
            if (w) {
              this.CHTMLplaceSubSup(w, H, f, N, y, R, C, A, F);
            } else {
              this.CHTMLplaceSupOnly(f, N, y, R, C, F);
            }
          } else {
            if (w) {
              this.CHTMLplaceSubOnly(w, H, y, A, F);
            }
          }
          if (l) {
            if (B) {
              this.CHTMLplacePresubPresup(B, j, l, o, R, C, A, F);
            } else {
              this.CHTMLplacePresupOnly(l, o, R, C, F);
            }
          } else {
            if (B) {
              this.CHTMLplacePresubOnly(B, j, A, F);
            }
          }
        }
      }
      this.CHTML.clean();
      this.CHTMLhandleSpace(K);
      this.CHTMLhandleBBox(K);
      this.CHTMLhandleColor(K);
      return K;
    },
    CHTMLgetScripts: function(e, o, g, h) {
      if (g) {
        e.sub = b.getNode(h, "mjx-sub");
        e.sup = b.getNode(h, "mjx-sup");
        e.presub = b.getNode(h, "mjx-presub");
        e.presup = b.getNode(h, "mjx-presup");
        o.sub = this.CHTMLbbox.sub;
        o.sup = this.CHTMLbbox.sup;
        o.presub = this.CHTMLbbox.presub;
        o.presup = this.CHTMLbbox.presup;
        return;
      }
      this.CHTMLbbox = o;
      var f = { i: 1, w: 0, BOX: e, BBOX: o },
        i = this.data.length;
      var d = "sub",
        j = "sup";
      while (f.i < i) {
        if ((this.data[f.i] || {}).type === "mprescripts") {
          f.i++;
          f.w = 0;
          d = "presub";
          j = "presup";
        } else {
          var k = this.CHTMLaddScript(d, f, h);
          var n = this.CHTMLaddScript(j, f, h);
          var l = Math.max(k ? k.rscale * k.w : 0, n ? n.rscale * n.w : 0);
          this.CHTMLpadScript(d, l, k, f);
          this.CHTMLpadScript(j, l, n, f);
          f.w += l;
        }
      }
      if (o.sub) {
        o.sub.clean();
      }
      if (o.sup) {
        o.sup.clean();
      }
      if (o.presub) {
        o.presub.clean();
      }
      if (o.presup) {
        o.presup.clean();
      }
    },
    CHTMLaddScript: function(f, i, g) {
      var e,
        d,
        h = this.data[i.i];
      if (h && h.type !== "none" && h.type !== "mprescripts") {
        e = i.BOX[f];
        if (!e) {
          e = i.BOX[f] = b.addElement(g, "mjx-" + f);
          d = i.BBOX[f] = b.BBOX.empty();
          if (i.w) {
            e.style.paddingLeft = b.Em(i.w);
            d.w = d.r = i.w;
            d.x = i.w;
          }
        }
        h.toCommonHTML(e);
        d = h.CHTML;
      }
      if (h && h.type !== "mprescripts") {
        i.i++;
      }
      return d;
    },
    CHTMLpadScript: function(h, j, k, g) {
      if (!k) {
        k = { w: 0, fake: 1, rscale: 1 };
      }
      var i = g.BBOX[h],
        l = 0,
        e = 0;
      if (i) {
        if (k.rscale * k.w < j) {
          var f = g.BOX[h];
          e = j - k.rscale * k.w;
          var d = b.Element("mjx-spacer", { style: { width: b.Em(e) } });
          if (h.substr(0, 3) === "pre" && !k.fake) {
            f.insertBefore(d, f.lastChild);
            l = e;
            e = 0;
          } else {
            f.appendChild(d);
          }
        }
        if (k.fake) {
          i.w += l;
        } else {
          i.combine(k, i.w + l, 0);
        }
        i.w += e;
      }
    },
    CHTMLaddBoxes: function(h, f, e) {
      var d = e.sub,
        i = e.sup,
        g = e.presub,
        k = e.presup;
      if (g && k) {
        var j = b.Element("mjx-prestack");
        h.insertBefore(j, f);
        j.appendChild(k);
        j.appendChild(g);
      } else {
        if (g) {
          h.insertBefore(g, f);
        }
        if (k) {
          h.insertBefore(k, f);
        }
      }
      if (d && i) {
        var l = b.addElement(h, "mjx-stack");
        l.appendChild(i);
        l.appendChild(d);
      } else {
        if (d) {
          h.appendChild(d);
        }
        if (i) {
          h.appendChild(i);
        }
      }
    },
    CHTMLplaceSubOnly: function(h, f, d, e, g) {
      h.style.verticalAlign = b.Em(-e);
      h.style.marginRight = b.Em(g);
      f.w += g;
      this.CHTML.combine(f, d, -e);
    },
    CHTMLplaceSupOnly: function(e, i, d, h, f, g) {
      e.style.verticalAlign = b.Em(f);
      e.style.paddingLeft = b.Em(h);
      e.style.paddingRight = b.Em(g);
      i.w += g;
      this.CHTML.combine(i, d + h, f);
    },
    CHTMLplaceSubSup: function(d, f, e, h, g, i, k, j, l) {
      d.style.paddingRight = b.Em(l);
      f.w += l;
      e.style.paddingBottom = b.Em(k + j - h.d - f.h);
      e.style.paddingLeft = b.Em(i + (h.x || 0));
      e.style.paddingRight = b.Em(l);
      h.w += l;
      e.parentNode.style.verticalAlign = b.Em(-j);
      this.CHTML.combine(f, g, -j);
      this.CHTML.combine(h, g + i, k);
    },
    CHTMLplacePresubOnly: function(e, d, f, g) {
      e.style.verticalAlign = b.Em(-f);
      e.style.marginLeft = b.Em(g);
      this.CHTML.combine(d, g, -f);
    },
    CHTMLplacePresupOnly: function(g, f, h, d, e) {
      g.style.verticalAlign = b.Em(d);
      g.style.paddingLeft = b.Em(e);
      g.style.paddingRight = b.Em(-h);
      this.CHTML.combine(f, e, d);
    },
    CHTMLplacePresubPresup: function(e, d, j, i, k, g, f, h) {
      e.style.paddingLeft = b.Em(h);
      j.style.paddingBottom = b.Em(g + f - i.d - d.h);
      j.style.paddingLeft = b.Em(k + h + (i.x || 0));
      j.style.paddingRight = b.Em(-k);
      j.parentNode.style.verticalAlign = b.Em(-f);
      this.CHTML.combine(d, h, -f);
      this.CHTML.combine(i, h + k, g);
    },
    CHTMLstretchH: a.mbase.CHTMLstretchH,
    CHTMLstretchV: a.mbase.CHTMLstretchV
  });
  MathJax.Hub.Startup.signal.Post("CommonHTML mmultiscripts Ready");
  MathJax.Ajax.loadComplete(b.autoloadDir + "/mmultiscripts.js");
});
