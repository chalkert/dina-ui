/*
 *  /MathJax/extensions/asciimath2jax.js
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

MathJax.Extension.asciimath2jax = {
  version: "2.7.1",
  config: {
    delimiters: [["`", "`"]],
    skipTags: [
      "script",
      "noscript",
      "style",
      "textarea",
      "pre",
      "code",
      "annotation",
      "annotation-xml"
    ],
    ignoreClass: "asciimath2jax_ignore",
    processClass: "asciimath2jax_process",
    preview: "AsciiMath"
  },
  ignoreTags: {
    br: MathJax.Hub.Browser.isMSIE && document.documentMode < 9 ? "\n" : " ",
    wbr: "",
    "#comment": ""
  },
  PreProcess: function(a) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig("asciimath2jax", this.config);
      if (this.config.Augment) {
        MathJax.Hub.Insert(this, this.config.Augment);
      }
      this.configured = true;
    }
    if (typeof a === "string") {
      a = document.getElementById(a);
    }
    if (!a) {
      a = document.body;
    }
    if (this.createPatterns()) {
      this.scanElement(a, a.nextSibling);
    }
  },
  createPatterns: function() {
    var d = [],
      c,
      a,
      b = this.config;
    this.match = {};
    if (b.delimiters.length === 0) {
      return false;
    }
    for (c = 0, a = b.delimiters.length; c < a; c++) {
      d.push(this.patternQuote(b.delimiters[c][0]));
      this.match[b.delimiters[c][0]] = {
        mode: "",
        end: b.delimiters[c][1],
        pattern: this.endPattern(b.delimiters[c][1])
      };
    }
    this.start = new RegExp(d.sort(this.sortLength).join("|"), "g");
    this.skipTags = new RegExp("^(" + b.skipTags.join("|") + ")$", "i");
    var e = [];
    if (MathJax.Hub.config.preRemoveClass) {
      e.push(MathJax.Hub.config.preRemoveClass);
    }
    if (b.ignoreClass) {
      e.push(b.ignoreClass);
    }
    this.ignoreClass = e.length
      ? new RegExp("(^| )(" + e.join("|") + ")( |$)")
      : /^$/;
    this.processClass = new RegExp("(^| )(" + b.processClass + ")( |$)");
    return true;
  },
  patternQuote: function(a) {
    return a.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, "\\$1");
  },
  endPattern: function(a) {
    return new RegExp(this.patternQuote(a) + "|\\\\.", "g");
  },
  sortLength: function(d, c) {
    if (d.length !== c.length) {
      return c.length - d.length;
    }
    return d == c ? 0 : d < c ? -1 : 1;
  },
  scanElement: function(c, b, g) {
    var a, e, d, f;
    while (c && c != b) {
      if (c.nodeName.toLowerCase() === "#text") {
        if (!g) {
          c = this.scanText(c);
        }
      } else {
        a = typeof c.className === "undefined" ? "" : c.className;
        e = typeof c.tagName === "undefined" ? "" : c.tagName;
        if (typeof a !== "string") {
          a = String(a);
        }
        f = this.processClass.exec(a);
        if (
          c.firstChild &&
          !a.match(/(^| )MathJax/) &&
          (f || !this.skipTags.exec(e))
        ) {
          d = (g || this.ignoreClass.exec(a)) && !f;
          this.scanElement(c.firstChild, b, d);
        }
      }
      if (c) {
        c = c.nextSibling;
      }
    }
  },
  scanText: function(b) {
    if (b.nodeValue.replace(/\s+/, "") == "") {
      return b;
    }
    var a, c;
    this.search = { start: true };
    this.pattern = this.start;
    while (b) {
      this.pattern.lastIndex = 0;
      while (
        b &&
        b.nodeName.toLowerCase() === "#text" &&
        (a = this.pattern.exec(b.nodeValue))
      ) {
        if (this.search.start) {
          b = this.startMatch(a, b);
        } else {
          b = this.endMatch(a, b);
        }
      }
      if (this.search.matched) {
        b = this.encloseMath(b);
      }
      if (b) {
        do {
          c = b;
          b = b.nextSibling;
        } while (b && this.ignoreTags[b.nodeName.toLowerCase()] != null);
        if (!b || b.nodeName !== "#text") {
          return c;
        }
      }
    }
    return b;
  },
  startMatch: function(a, b) {
    var c = this.match[a[0]];
    if (c != null) {
      this.search = {
        end: c.end,
        mode: c.mode,
        open: b,
        olen: a[0].length,
        opos: this.pattern.lastIndex - a[0].length
      };
      this.switchPattern(c.pattern);
    }
    return b;
  },
  endMatch: function(a, b) {
    if (a[0] == this.search.end) {
      this.search.close = b;
      this.search.cpos = this.pattern.lastIndex;
      this.search.clen = this.search.isBeginEnd ? 0 : a[0].length;
      this.search.matched = true;
      b = this.encloseMath(b);
      this.switchPattern(this.start);
    }
    return b;
  },
  switchPattern: function(a) {
    a.lastIndex = this.pattern.lastIndex;
    this.pattern = a;
    this.search.start = a === this.start;
  },
  encloseMath: function(b) {
    var a = this.search,
      g = a.close,
      f,
      d,
      c;
    if (a.cpos === g.length) {
      g = g.nextSibling;
    } else {
      g = g.splitText(a.cpos);
    }
    if (!g) {
      f = g = MathJax.HTML.addText(a.close.parentNode, "");
    }
    a.close = g;
    d = a.opos ? a.open.splitText(a.opos) : a.open;
    while ((c = d.nextSibling) && c !== g) {
      if (c.nodeValue !== null) {
        if (c.nodeName === "#comment") {
          d.nodeValue += c.nodeValue.replace(
            /^\[CDATA\[((.|\n|\r)*)\]\]$/,
            "$1"
          );
        } else {
          d.nodeValue += d.nextSibling.nodeValue;
        }
      } else {
        var h = this.ignoreTags[c.nodeName.toLowerCase()];
        d.nodeValue += h == null ? " " : h;
      }
      d.parentNode.removeChild(c);
    }
    var e = d.nodeValue.substr(a.olen, d.nodeValue.length - a.olen - a.clen);
    d.parentNode.removeChild(d);
    if (this.config.preview !== "none") {
      this.createPreview(a.mode, e);
    }
    d = this.createMathTag(a.mode, e);
    this.search = {};
    this.pattern.lastIndex = 0;
    if (f) {
      f.parentNode.removeChild(f);
    }
    return d;
  },
  insertNode: function(b) {
    var a = this.search;
    a.close.parentNode.insertBefore(b, a.close);
  },
  createPreview: function(d, a) {
    var b = MathJax.Hub.config.preRemoveClass;
    var c = this.config.preview;
    if (c === "none") {
      return;
    }
    if ((this.search.close.previousSibling || {}).className === b) {
      return;
    }
    if (c === "AsciiMath") {
      c = [this.filterPreview(a)];
    }
    if (c) {
      c = MathJax.HTML.Element("span", { className: b }, c);
      this.insertNode(c);
    }
  },
  createMathTag: function(c, a) {
    var b = document.createElement("script");
    b.type = "math/asciimath" + c;
    MathJax.HTML.setScript(b, a);
    this.insertNode(b);
    return b;
  },
  filterPreview: function(a) {
    return a;
  }
};
MathJax.Hub.Register.PreProcessor([
  "PreProcess",
  MathJax.Extension.asciimath2jax
]);
MathJax.Ajax.loadComplete("[MathJax]/extensions/asciimath2jax.js");
