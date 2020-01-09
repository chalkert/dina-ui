/*
 *  /MathJax/config/AM_SVG.js
 *
 *  Copyright (c) 2010-2017 The MathJax Consortium
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 *
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Ajax.Preloading(
  "[MathJax]/jax/input/AsciiMath/config.js",
  "[MathJax]/jax/output/SVG/config.js",
  "[MathJax]/jax/output/PreviewHTML/config.js",
  "[MathJax]/extensions/asciimath2jax.js",
  "[MathJax]/extensions/MathEvents.js",
  "[MathJax]/extensions/MathZoom.js",
  "[MathJax]/extensions/MathMenu.js",
  "[MathJax]/jax/element/mml/jax.js",
  "[MathJax]/extensions/toMathML.js",
  "[MathJax]/jax/input/AsciiMath/jax.js",
  "[MathJax]/extensions/fast-preview.js",
  "[MathJax]/extensions/AssistiveMML.js",
  "[MathJax]/extensions/a11y/accessibility-menu.js"
);

MathJax.InputJax.AsciiMath = MathJax.InputJax({
  id: "AsciiMath",
  version: "2.7.1",
  directory: MathJax.InputJax.directory + "/AsciiMath",
  extensionDir: MathJax.InputJax.extensionDir + "/AsciiMath",
  config: {
    fixphi: true,
    useMathMLspacing: true,
    displaystyle: true,
    decimalsign: "."
  }
});
MathJax.InputJax.AsciiMath.Register("math/asciimath");
MathJax.InputJax.AsciiMath.loadComplete("config.js");
MathJax.OutputJax.SVG = MathJax.OutputJax({
  id: "SVG",
  version: "2.7.1",
  directory: MathJax.OutputJax.directory + "/SVG",
  extensionDir: MathJax.OutputJax.extensionDir + "/SVG",
  autoloadDir: MathJax.OutputJax.directory + "/SVG/autoload",
  fontDir: MathJax.OutputJax.directory + "/SVG/fonts",
  config: {
    scale: 100,
    minScaleAdjust: 50,
    font: "TeX",
    blacker: 1,
    mtextFontInherit: false,
    undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif",
    addMMLclasses: false,
    useFontCache: true,
    useGlobalCache: true,
    EqnChunk: MathJax.Hub.Browser.isMobile ? 10 : 50,
    EqnChunkFactor: 1.5,
    EqnChunkDelay: 100,
    linebreaks: { automatic: false, width: "container" },
    merrorStyle: {
      fontSize: "90%",
      color: "#C00",
      background: "#FF8",
      border: "1px solid #C00",
      padding: "3px"
    },
    styles: {
      ".MathJax_SVG_Display": { "text-align": "center", margin: "1em 0em" },
      ".MathJax_SVG .MJX-monospace": { "font-family": "monospace" },
      ".MathJax_SVG .MJX-sans-serif": { "font-family": "sans-serif" },
      "#MathJax_SVG_Tooltip": {
        "background-color": "InfoBackground",
        color: "InfoText",
        border: "1px solid black",
        "box-shadow": "2px 2px 5px #AAAAAA",
        "-webkit-box-shadow": "2px 2px 5px #AAAAAA",
        "-moz-box-shadow": "2px 2px 5px #AAAAAA",
        "-khtml-box-shadow": "2px 2px 5px #AAAAAA",
        padding: "3px 4px",
        "z-index": 401
      }
    }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax.SVG.Register("jax/mml");
}
MathJax.OutputJax.SVG.loadComplete("config.js");
MathJax.OutputJax.PreviewHTML = MathJax.OutputJax({
  id: "PreviewHTML",
  version: "2.7.1",
  directory: MathJax.OutputJax.directory + "/PreviewHTML",
  extensionDir: MathJax.OutputJax.extensionDir + "/PreviewHTML",
  noFastPreview: true,
  config: {
    scale: 100,
    minScaleAdjust: 50,
    mtextFontInherit: false,
    linebreaks: { automatic: false, width: "container" }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax.PreviewHTML.Register("jax/mml");
}
MathJax.OutputJax.PreviewHTML.loadComplete("config.js");
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
(function(d, h, l, g, m, b, j) {
  var p = "2.7.1";
  var i = MathJax.Extension;
  var c = (i.MathEvents = { version: p });
  var k = d.config.menuSettings;
  var o = {
    hover: 500,
    frame: {
      x: 3.5,
      y: 5,
      bwidth: 1,
      bcolor: "#A6D",
      hwidth: "15px",
      hcolor: "#83A"
    },
    button: { x: -6, y: -3, wx: -2 },
    fadeinInc: 0.2,
    fadeoutInc: 0.05,
    fadeDelay: 50,
    fadeoutStart: 400,
    fadeoutDelay: 15 * 1000,
    styles: {
      ".MathJax_Hover_Frame": {
        "border-radius": ".25em",
        "-webkit-border-radius": ".25em",
        "-moz-border-radius": ".25em",
        "-khtml-border-radius": ".25em",
        "box-shadow": "0px 0px 15px #83A",
        "-webkit-box-shadow": "0px 0px 15px #83A",
        "-moz-box-shadow": "0px 0px 15px #83A",
        "-khtml-box-shadow": "0px 0px 15px #83A",
        border: "1px solid #A6D ! important",
        display: "inline-block",
        position: "absolute"
      },
      ".MathJax_Menu_Button .MathJax_Hover_Arrow": {
        position: "absolute",
        cursor: "pointer",
        display: "inline-block",
        border: "2px solid #AAA",
        "border-radius": "4px",
        "-webkit-border-radius": "4px",
        "-moz-border-radius": "4px",
        "-khtml-border-radius": "4px",
        "font-family": "'Courier New',Courier",
        "font-size": "9px",
        color: "#F0F0F0"
      },
      ".MathJax_Menu_Button .MathJax_Hover_Arrow span": {
        display: "block",
        "background-color": "#AAA",
        border: "1px solid",
        "border-radius": "3px",
        "line-height": 0,
        padding: "4px"
      },
      ".MathJax_Hover_Arrow:hover": {
        color: "white!important",
        border: "2px solid #CCC!important"
      },
      ".MathJax_Hover_Arrow:hover span": {
        "background-color": "#CCC!important"
      }
    }
  };
  var n = (c.Event = {
    LEFTBUTTON: 0,
    RIGHTBUTTON: 2,
    MENUKEY: "altKey",
    KEY: {
      RETURN: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    },
    Mousedown: function(q) {
      return n.Handler(q, "Mousedown", this);
    },
    Mouseup: function(q) {
      return n.Handler(q, "Mouseup", this);
    },
    Mousemove: function(q) {
      return n.Handler(q, "Mousemove", this);
    },
    Mouseover: function(q) {
      return n.Handler(q, "Mouseover", this);
    },
    Mouseout: function(q) {
      return n.Handler(q, "Mouseout", this);
    },
    Click: function(q) {
      return n.Handler(q, "Click", this);
    },
    DblClick: function(q) {
      return n.Handler(q, "DblClick", this);
    },
    Menu: function(q) {
      return n.Handler(q, "ContextMenu", this);
    },
    Handler: function(t, r, s) {
      if (l.loadingMathMenu) {
        return n.False(t);
      }
      var q = b[s.jaxID];
      if (!t) {
        t = window.event;
      }
      t.isContextMenu = r === "ContextMenu";
      if (q[r]) {
        return q[r](t, s);
      }
      if (i.MathZoom) {
        return i.MathZoom.HandleEvent(t, r, s);
      }
    },
    False: function(q) {
      if (!q) {
        q = window.event;
      }
      if (q) {
        if (q.preventDefault) {
          q.preventDefault();
        } else {
          q.returnValue = false;
        }
        if (q.stopPropagation) {
          q.stopPropagation();
        }
        q.cancelBubble = true;
      }
      return false;
    },
    Keydown: function(r, q) {
      if (!r) {
        r = window.event;
      }
      if (r.keyCode === n.KEY.SPACE) {
        n.ContextMenu(r, this);
      }
    },
    ContextMenu: function(t, E, w) {
      var B = b[E.jaxID],
        v = B.getJaxFromMath(E);
      var F = (B.config.showMathMenu != null ? B : d).config.showMathMenu;
      if (!F || (k.context !== "MathJax" && !w)) {
        return;
      }
      if (c.msieEventBug) {
        t = window.event || t;
      }
      n.ClearSelection();
      f.ClearHoverTimer();
      if (v.hover) {
        if (v.hover.remove) {
          clearTimeout(v.hover.remove);
          delete v.hover.remove;
        }
        v.hover.nofade = true;
      }
      var u = MathJax.Menu;
      var G, D;
      if (u) {
        if (u.loadingDomain) {
          return n.False(t);
        }
        G = m.loadDomain("MathMenu");
        if (!G) {
          u.jax = v;
          var r = u.menu.Find("Show Math As").submenu;
          r.items[0].name = v.sourceMenuTitle;
          r.items[0].format = v.sourceMenuFormat || "MathML";
          r.items[1].name = j[v.inputJax].sourceMenuTitle;
          r.items[5].disabled = !j[v.inputJax].annotationEncoding;
          var A = r.items[2];
          A.disabled = true;
          var q = A.submenu.items;
          annotationList = MathJax.Hub.Config.semanticsAnnotations;
          for (var z = 0, y = q.length; z < y; z++) {
            var s = q[z].name[1];
            if (v.root && v.root.getAnnotation(s) !== null) {
              A.disabled = false;
              q[z].hidden = false;
            } else {
              q[z].hidden = true;
            }
          }
          var x = u.menu.Find("Math Settings", "MathPlayer");
          x.hidden = !(v.outputJax === "NativeMML" && d.Browser.hasMathPlayer);
          return u.menu.Post(t);
        }
        u.loadingDomain = true;
        D = function() {
          delete u.loadingDomain;
        };
      } else {
        if (l.loadingMathMenu) {
          return n.False(t);
        }
        l.loadingMathMenu = true;
        G = l.Require("[MathJax]/extensions/MathMenu.js");
        D = function() {
          delete l.loadingMathMenu;
          if (!MathJax.Menu) {
            MathJax.Menu = {};
          }
        };
      }
      var C = {
        pageX: t.pageX,
        pageY: t.pageY,
        clientX: t.clientX,
        clientY: t.clientY
      };
      g.Queue(G, D, ["ContextMenu", n, C, E, w]);
      return n.False(t);
    },
    AltContextMenu: function(s, r) {
      var t = b[r.jaxID];
      var q = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
      if (q) {
        q = (t.config.showMathMenuMSIE != null ? t : d).config.showMathMenuMSIE;
        if (k.context === "MathJax" && !k.mpContext && q) {
          if (!c.noContextMenuBug || s.button !== n.RIGHTBUTTON) {
            return;
          }
        } else {
          if (!s[n.MENUKEY] || s.button !== n.LEFTBUTTON) {
            return;
          }
        }
        return t.ContextMenu(s, r, true);
      }
    },
    ClearSelection: function() {
      if (c.safariContextMenuBug) {
        setTimeout("window.getSelection().empty()", 0);
      }
      if (document.selection) {
        setTimeout("document.selection.empty()", 0);
      }
    },
    getBBox: function(s) {
      s.appendChild(c.topImg);
      var r = c.topImg.offsetTop,
        t = s.offsetHeight - r,
        q = s.offsetWidth;
      s.removeChild(c.topImg);
      return { w: q, h: r, d: t };
    }
  });
  var f = (c.Hover = {
    Mouseover: function(s, r) {
      if (k.discoverable || k.zoom === "Hover") {
        var u = s.fromElement || s.relatedTarget,
          t = s.toElement || s.target;
        if (
          u &&
          t &&
          (d.isMathJaxNode(u) !== d.isMathJaxNode(t) ||
            d.getJaxFor(u) !== d.getJaxFor(t))
        ) {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            f.ReHover(q);
          } else {
            f.HoverTimer(q, r);
          }
          return n.False(s);
        }
      }
    },
    Mouseout: function(s, r) {
      if (k.discoverable || k.zoom === "Hover") {
        var u = s.fromElement || s.relatedTarget,
          t = s.toElement || s.target;
        if (
          u &&
          t &&
          (d.isMathJaxNode(u) !== d.isMathJaxNode(t) ||
            d.getJaxFor(u) !== d.getJaxFor(t))
        ) {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            f.UnHover(q);
          } else {
            f.ClearHoverTimer();
          }
          return n.False(s);
        }
      }
    },
    Mousemove: function(s, r) {
      if (k.discoverable || k.zoom === "Hover") {
        var q = this.getJaxFromMath(r);
        if (q.hover) {
          return;
        }
        if (f.lastX == s.clientX && f.lastY == s.clientY) {
          return;
        }
        f.lastX = s.clientX;
        f.lastY = s.clientY;
        f.HoverTimer(q, r);
        return n.False(s);
      }
    },
    HoverTimer: function(q, r) {
      this.ClearHoverTimer();
      this.hoverTimer = setTimeout(g(["Hover", this, q, r]), o.hover);
    },
    ClearHoverTimer: function() {
      if (this.hoverTimer) {
        clearTimeout(this.hoverTimer);
        delete this.hoverTimer;
      }
    },
    Hover: function(q, u) {
      if (i.MathZoom && i.MathZoom.Hover({}, u)) {
        return;
      }
      var t = b[q.outputJax],
        v = t.getHoverSpan(q, u),
        y = t.getHoverBBox(q, v, u),
        w = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
      var A = o.frame.x,
        z = o.frame.y,
        x = o.frame.bwidth;
      if (c.msieBorderWidthBug) {
        x = 0;
      }
      q.hover = { opacity: 0, id: q.inputID + "-Hover" };
      var r = h.Element(
        "span",
        {
          id: q.hover.id,
          isMathJax: true,
          style: {
            display: "inline-block",
            width: 0,
            height: 0,
            position: "relative"
          }
        },
        [
          [
            "span",
            {
              className: "MathJax_Hover_Frame",
              isMathJax: true,
              style: {
                display: "inline-block",
                position: "absolute",
                top: this.Px(-y.h - z - x - (y.y || 0)),
                left: this.Px(-A - x + (y.x || 0)),
                width: this.Px(y.w + 2 * A),
                height: this.Px(y.h + y.d + 2 * z),
                opacity: 0,
                filter: "alpha(opacity=0)"
              }
            }
          ]
        ]
      );
      var s = h.Element(
        "span",
        {
          isMathJax: true,
          id: q.hover.id + "Menu",
          className: "MathJax_Menu_Button",
          style: {
            display: "inline-block",
            "z-index": 1,
            width: 0,
            height: 0,
            position: "relative"
          }
        },
        [
          [
            "span",
            {
              className: "MathJax_Hover_Arrow",
              isMathJax: true,
              math: u,
              onclick: this.HoverMenu,
              jax: t.id,
              style: {
                left: this.Px(y.w + A + x + (y.x || 0) + o.button.x),
                top: this.Px(-y.h - z - x - (y.y || 0) - o.button.y),
                opacity: 0,
                filter: "alpha(opacity=0)"
              }
            },
            [["span", { isMathJax: true }, "\u25BC"]]
          ]
        ]
      );
      if (y.width) {
        r.style.width = s.style.width = y.width;
        r.style.marginRight = s.style.marginRight = "-" + y.width;
        r.firstChild.style.width = y.width;
        s.firstChild.style.left = "";
        s.firstChild.style.right = this.Px(o.button.wx);
      }
      v.parentNode.insertBefore(r, v);
      if (w) {
        v.parentNode.insertBefore(s, v);
      }
      if (v.style) {
        v.style.position = "relative";
      }
      this.ReHover(q);
    },
    ReHover: function(q) {
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      q.hover.remove = setTimeout(g(["UnHover", this, q]), o.fadeoutDelay);
      this.HoverFadeTimer(q, o.fadeinInc);
    },
    UnHover: function(q) {
      if (!q.hover.nofade) {
        this.HoverFadeTimer(q, -o.fadeoutInc, o.fadeoutStart);
      }
    },
    HoverFade: function(q) {
      delete q.hover.timer;
      q.hover.opacity = Math.max(0, Math.min(1, q.hover.opacity + q.hover.inc));
      q.hover.opacity = Math.floor(1000 * q.hover.opacity) / 1000;
      var s = document.getElementById(q.hover.id),
        r = document.getElementById(q.hover.id + "Menu");
      s.firstChild.style.opacity = q.hover.opacity;
      s.firstChild.style.filter =
        "alpha(opacity=" + Math.floor(100 * q.hover.opacity) + ")";
      if (r) {
        r.firstChild.style.opacity = q.hover.opacity;
        r.firstChild.style.filter = s.style.filter;
      }
      if (q.hover.opacity === 1) {
        return;
      }
      if (q.hover.opacity > 0) {
        this.HoverFadeTimer(q, q.hover.inc);
        return;
      }
      s.parentNode.removeChild(s);
      if (r) {
        r.parentNode.removeChild(r);
      }
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      delete q.hover;
    },
    HoverFadeTimer: function(q, s, r) {
      q.hover.inc = s;
      if (!q.hover.timer) {
        q.hover.timer = setTimeout(g(["HoverFade", this, q]), r || o.fadeDelay);
      }
    },
    HoverMenu: function(q) {
      if (!q) {
        q = window.event;
      }
      return b[this.jax].ContextMenu(q, this.math, true);
    },
    ClearHover: function(q) {
      if (q.hover.remove) {
        clearTimeout(q.hover.remove);
      }
      if (q.hover.timer) {
        clearTimeout(q.hover.timer);
      }
      f.ClearHoverTimer();
      delete q.hover;
    },
    Px: function(q) {
      if (Math.abs(q) < 0.006) {
        return "0px";
      }
      return q.toFixed(2).replace(/\.?0+$/, "") + "px";
    },
    getImages: function() {
      if (k.discoverable) {
        var q = new Image();
        q.src = o.button.src;
      }
    }
  });
  var a = (c.Touch = {
    last: 0,
    delay: 500,
    start: function(r) {
      var q = new Date().getTime();
      var s = q - a.last < a.delay && a.up;
      a.last = q;
      a.up = false;
      if (s) {
        a.timeout = setTimeout(a.menu, a.delay, r, this);
        r.preventDefault();
      }
    },
    end: function(r) {
      var q = new Date().getTime();
      a.up = q - a.last < a.delay;
      if (a.timeout) {
        clearTimeout(a.timeout);
        delete a.timeout;
        a.last = 0;
        a.up = false;
        r.preventDefault();
        return n.Handler(r.touches[0] || r.touch, "DblClick", this);
      }
    },
    menu: function(r, q) {
      delete a.timeout;
      a.last = 0;
      a.up = false;
      return n.Handler(r.touches[0] || r.touch, "ContextMenu", q);
    }
  });
  d.Browser.Select({
    MSIE: function(q) {
      var s = document.documentMode || 0;
      var r = q.versionAtLeast("8.0");
      c.msieBorderWidthBug = document.compatMode === "BackCompat";
      c.msieEventBug = q.isIE9;
      c.msieAlignBug = !r || s < 8;
      if (s < 9) {
        n.LEFTBUTTON = 1;
      }
    },
    Safari: function(q) {
      c.safariContextMenuBug = true;
    },
    Opera: function(q) {
      c.operaPositionBug = true;
    },
    Konqueror: function(q) {
      c.noContextMenuBug = true;
    }
  });
  c.topImg = c.msieAlignBug
    ? h.Element("img", {
        style: { width: 0, height: 0, position: "relative" },
        src: "about:blank"
      })
    : h.Element("span", {
        style: { width: 0, height: 0, display: "inline-block" }
      });
  if (c.operaPositionBug) {
    c.topImg.style.border = "1px solid";
  }
  c.config = o = d.CombineConfig("MathEvents", o);
  var e = function() {
    var q = o.styles[".MathJax_Hover_Frame"];
    q.border = o.frame.bwidth + "px solid " + o.frame.bcolor + " ! important";
    q["box-shadow"] = q["-webkit-box-shadow"] = q["-moz-box-shadow"] = q[
      "-khtml-box-shadow"
    ] = "0px 0px " + o.frame.hwidth + " " + o.frame.hcolor;
  };
  g.Queue(
    d.Register.StartupHook("End Config", {}),
    [e],
    ["getImages", f],
    ["Styles", l, o.styles],
    ["Post", d.Startup.signal, "MathEvents Ready"],
    ["loadComplete", l, "[MathJax]/extensions/MathEvents.js"]
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.Callback,
  MathJax.Localization,
  MathJax.OutputJax,
  MathJax.InputJax
);
(function(a, d, f, c, j) {
  var k = "2.7.1";
  var i = a.CombineConfig("MathZoom", {
    styles: {
      "#MathJax_Zoom": {
        position: "absolute",
        "background-color": "#F0F0F0",
        overflow: "auto",
        display: "block",
        "z-index": 301,
        padding: ".5em",
        border: "1px solid black",
        margin: 0,
        "font-weight": "normal",
        "font-style": "normal",
        "text-align": "left",
        "text-indent": 0,
        "text-transform": "none",
        "line-height": "normal",
        "letter-spacing": "normal",
        "word-spacing": "normal",
        "word-wrap": "normal",
        "white-space": "nowrap",
        float: "none",
        "-webkit-box-sizing": "content-box",
        "-moz-box-sizing": "content-box",
        "box-sizing": "content-box",
        "box-shadow": "5px 5px 15px #AAAAAA",
        "-webkit-box-shadow": "5px 5px 15px #AAAAAA",
        "-moz-box-shadow": "5px 5px 15px #AAAAAA",
        "-khtml-box-shadow": "5px 5px 15px #AAAAAA",
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      "#MathJax_ZoomOverlay": {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 300,
        display: "inline-block",
        width: "100%",
        height: "100%",
        border: 0,
        padding: 0,
        margin: 0,
        "background-color": "white",
        opacity: 0,
        filter: "alpha(opacity=0)"
      },
      "#MathJax_ZoomFrame": {
        position: "relative",
        display: "inline-block",
        height: 0,
        width: 0
      },
      "#MathJax_ZoomEventTrap": {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 302,
        display: "inline-block",
        border: 0,
        padding: 0,
        margin: 0,
        "background-color": "white",
        opacity: 0,
        filter: "alpha(opacity=0)"
      }
    }
  });
  var e, b, g;
  MathJax.Hub.Register.StartupHook("MathEvents Ready", function() {
    g = MathJax.Extension.MathEvents.Event;
    e = MathJax.Extension.MathEvents.Event.False;
    b = MathJax.Extension.MathEvents.Hover;
  });
  var h = (MathJax.Extension.MathZoom = {
    version: k,
    settings: a.config.menuSettings,
    scrollSize: 18,
    HandleEvent: function(n, l, m) {
      if (h.settings.CTRL && !n.ctrlKey) {
        return true;
      }
      if (h.settings.ALT && !n.altKey) {
        return true;
      }
      if (h.settings.CMD && !n.metaKey) {
        return true;
      }
      if (h.settings.Shift && !n.shiftKey) {
        return true;
      }
      if (!h[l]) {
        return true;
      }
      return h[l](n, m);
    },
    Click: function(m, l) {
      if (this.settings.zoom === "Click") {
        return this.Zoom(m, l);
      }
    },
    DblClick: function(m, l) {
      if (
        this.settings.zoom === "Double-Click" ||
        this.settings.zoom === "DoubleClick"
      ) {
        return this.Zoom(m, l);
      }
    },
    Hover: function(m, l) {
      if (this.settings.zoom === "Hover") {
        this.Zoom(m, l);
        return true;
      }
      return false;
    },
    Zoom: function(o, u) {
      this.Remove();
      b.ClearHoverTimer();
      g.ClearSelection();
      var s = MathJax.OutputJax[u.jaxID];
      var p = s.getJaxFromMath(u);
      if (p.hover) {
        b.UnHover(p);
      }
      var q = this.findContainer(u);
      var l = Math.floor(0.85 * q.clientWidth),
        t = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      if (this.getOverflow(q) !== "visible") {
        t = Math.min(q.clientHeight, t);
      }
      t = Math.floor(0.85 * t);
      var n = d.Element("span", { id: "MathJax_ZoomFrame" }, [
        ["span", { id: "MathJax_ZoomOverlay", onmousedown: this.Remove }],
        [
          "span",
          {
            id: "MathJax_Zoom",
            onclick: this.Remove,
            style: { visibility: "hidden", fontSize: this.settings.zscale }
          },
          [
            [
              "span",
              { style: { display: "inline-block", "white-space": "nowrap" } }
            ]
          ]
        ]
      ]);
      var z = n.lastChild,
        w = z.firstChild,
        r = n.firstChild;
      u.parentNode.insertBefore(n, u);
      u.parentNode.insertBefore(u, n);
      if (w.addEventListener) {
        w.addEventListener("mousedown", this.Remove, true);
      }
      var m = z.offsetWidth || z.clientWidth;
      l -= m;
      t -= m;
      z.style.maxWidth = l + "px";
      z.style.maxHeight = t + "px";
      if (this.msieTrapEventBug) {
        var y = d.Element("span", {
          id: "MathJax_ZoomEventTrap",
          onmousedown: this.Remove
        });
        n.insertBefore(y, z);
      }
      if (this.msieZIndexBug) {
        var v = d.addElement(document.body, "img", {
          src: "about:blank",
          id: "MathJax_ZoomTracker",
          width: 0,
          height: 0,
          style: { width: 0, height: 0, position: "relative" }
        });
        n.style.position = "relative";
        n.style.zIndex = i.styles["#MathJax_ZoomOverlay"]["z-index"];
        n = v;
      }
      var x = s.Zoom(p, w, u, l, t);
      if (this.msiePositionBug) {
        if (this.msieSizeBug) {
          z.style.height = x.zH + "px";
          z.style.width = x.zW + "px";
        }
        if (z.offsetHeight > t) {
          z.style.height = t + "px";
          z.style.width = x.zW + this.scrollSize + "px";
        }
        if (z.offsetWidth > l) {
          z.style.width = l + "px";
          z.style.height = x.zH + this.scrollSize + "px";
        }
      }
      if (this.operaPositionBug) {
        z.style.width = Math.min(l, x.zW) + "px";
      }
      if (
        z.offsetWidth > m &&
        z.offsetWidth - m < l &&
        z.offsetHeight - m < t
      ) {
        z.style.overflow = "visible";
      }
      this.Position(z, x);
      if (this.msieTrapEventBug) {
        y.style.height = z.clientHeight + "px";
        y.style.width = z.clientWidth + "px";
        y.style.left = parseFloat(z.style.left) + z.clientLeft + "px";
        y.style.top = parseFloat(z.style.top) + z.clientTop + "px";
      }
      z.style.visibility = "";
      if (this.settings.zoom === "Hover") {
        r.onmouseover = this.Remove;
      }
      if (window.addEventListener) {
        addEventListener("resize", this.Resize, false);
      } else {
        if (window.attachEvent) {
          attachEvent("onresize", this.Resize);
        } else {
          this.onresize = window.onresize;
          window.onresize = this.Resize;
        }
      }
      a.signal.Post(["math zoomed", p]);
      return e(o);
    },
    Position: function(p, r) {
      p.style.display = "none";
      var q = this.Resize(),
        m = q.x,
        s = q.y,
        l = r.mW;
      p.style.display = "";
      var o = -l - Math.floor((p.offsetWidth - l) / 2),
        n = r.Y;
      p.style.left = Math.max(o, 10 - m) + "px";
      p.style.top = Math.max(n, 10 - s) + "px";
      if (!h.msiePositionBug) {
        h.SetWH();
      }
    },
    Resize: function(m) {
      if (h.onresize) {
        h.onresize(m);
      }
      var q = document.getElementById("MathJax_ZoomFrame"),
        l = document.getElementById("MathJax_ZoomOverlay");
      var o = h.getXY(q),
        n = h.findContainer(q);
      if (h.getOverflow(n) !== "visible") {
        l.scroll_parent = n;
        var p = h.getXY(n);
        o.x -= p.x;
        o.y -= p.y;
        p = h.getBorder(n);
        o.x -= p.x;
        o.y -= p.y;
      }
      l.style.left = -o.x + "px";
      l.style.top = -o.y + "px";
      if (h.msiePositionBug) {
        setTimeout(h.SetWH, 0);
      } else {
        h.SetWH();
      }
      return o;
    },
    SetWH: function() {
      var l = document.getElementById("MathJax_ZoomOverlay");
      if (!l) {
        return;
      }
      l.style.display = "none";
      var m = l.scroll_parent || document.documentElement || document.body;
      l.style.width = m.scrollWidth + "px";
      l.style.height = Math.max(m.clientHeight, m.scrollHeight) + "px";
      l.style.display = "";
    },
    findContainer: function(l) {
      l = l.parentNode;
      while (
        l.parentNode &&
        l !== document.body &&
        h.getOverflow(l) === "visible"
      ) {
        l = l.parentNode;
      }
      return l;
    },
    getOverflow: window.getComputedStyle
      ? function(l) {
          return getComputedStyle(l).overflow;
        }
      : function(l) {
          return (l.currentStyle || { overflow: "visible" }).overflow;
        },
    getBorder: function(o) {
      var m = { thin: 1, medium: 2, thick: 3 };
      var n = window.getComputedStyle
        ? getComputedStyle(o)
        : o.currentStyle || { borderLeftWidth: 0, borderTopWidth: 0 };
      var l = n.borderLeftWidth,
        p = n.borderTopWidth;
      if (m[l]) {
        l = m[l];
      } else {
        l = parseInt(l);
      }
      if (m[p]) {
        p = m[p];
      } else {
        p = parseInt(p);
      }
      return { x: l, y: p };
    },
    getXY: function(o) {
      var l = 0,
        n = 0,
        m;
      m = o;
      while (m.offsetParent) {
        l += m.offsetLeft;
        m = m.offsetParent;
      }
      if (h.operaPositionBug) {
        o.style.border = "1px solid";
      }
      m = o;
      while (m.offsetParent) {
        n += m.offsetTop;
        m = m.offsetParent;
      }
      if (h.operaPositionBug) {
        o.style.border = "";
      }
      return { x: l, y: n };
    },
    Remove: function(n) {
      var p = document.getElementById("MathJax_ZoomFrame");
      if (p) {
        var o = MathJax.OutputJax[p.previousSibling.jaxID];
        var l = o.getJaxFromMath(p.previousSibling);
        a.signal.Post(["math unzoomed", l]);
        p.parentNode.removeChild(p);
        p = document.getElementById("MathJax_ZoomTracker");
        if (p) {
          p.parentNode.removeChild(p);
        }
        if (h.operaRefreshBug) {
          var m = d.addElement(document.body, "div", {
            style: {
              position: "fixed",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0
            },
            id: "MathJax_OperaDiv"
          });
          document.body.removeChild(m);
        }
        if (window.removeEventListener) {
          removeEventListener("resize", h.Resize, false);
        } else {
          if (window.detachEvent) {
            detachEvent("onresize", h.Resize);
          } else {
            window.onresize = h.onresize;
            delete h.onresize;
          }
        }
      }
      return e(n);
    }
  });
  a.Browser.Select({
    MSIE: function(l) {
      var n = document.documentMode || 0;
      var m = n >= 9;
      h.msiePositionBug = !m;
      h.msieSizeBug =
        l.versionAtLeast("7.0") &&
        (!document.documentMode || n === 7 || n === 8);
      h.msieZIndexBug = n <= 7;
      h.msieInlineBlockAlignBug = n <= 7;
      h.msieTrapEventBug = !window.addEventListener;
      if (document.compatMode === "BackCompat") {
        h.scrollSize = 52;
      }
      if (m) {
        delete i.styles["#MathJax_Zoom"].filter;
      }
    },
    Opera: function(l) {
      h.operaPositionBug = true;
      h.operaRefreshBug = true;
    }
  });
  h.topImg = h.msieInlineBlockAlignBug
    ? d.Element("img", {
        style: { width: 0, height: 0, position: "relative" },
        src: "about:blank"
      })
    : d.Element("span", {
        style: { width: 0, height: 0, display: "inline-block" }
      });
  if (h.operaPositionBug || h.msieTopBug) {
    h.topImg.style.border = "1px solid";
  }
  MathJax.Callback.Queue(
    ["StartupHook", MathJax.Hub.Register, "Begin Styles", {}],
    ["Styles", f, i.styles],
    ["Post", a.Startup.signal, "MathZoom Ready"],
    ["loadComplete", f, "[MathJax]/extensions/MathZoom.js"]
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.OutputJax["HTML-CSS"],
  MathJax.OutputJax.NativeMML
);
(function(f, o, q, e, r) {
  var p = "2.7.1";
  var d = MathJax.Callback.Signal("menu");
  MathJax.Extension.MathMenu = { version: p, signal: d };
  var t = function(u) {
    return MathJax.Localization._.apply(
      MathJax.Localization,
      [["MathMenu", u]].concat([].slice.call(arguments, 1))
    );
  };
  var i = MathJax.Object.isArray;
  var a = f.Browser.isPC,
    l = f.Browser.isMSIE,
    m = (document.documentMode || 0) > 8;
  var j = a ? null : "5px";
  var s = f.CombineConfig("MathMenu", {
    delay: 150,
    showRenderer: true,
    showMathPlayer: true,
    showFontMenu: false,
    showContext: false,
    showDiscoverable: false,
    showLocale: true,
    showLocaleURL: false,
    semanticsAnnotations: {
      TeX: ["TeX", "LaTeX", "application/x-tex"],
      StarMath: ["StarMath 5.0"],
      Maple: ["Maple"],
      ContentMathML: ["MathML-Content", "application/mathml-content+xml"],
      OpenMath: ["OpenMath"]
    },
    windowSettings: {
      status: "no",
      toolbar: "no",
      locationbar: "no",
      menubar: "no",
      directories: "no",
      personalbar: "no",
      resizable: "yes",
      scrollbars: "yes",
      width: 400,
      height: 300,
      left: Math.round((screen.width - 400) / 2),
      top: Math.round((screen.height - 300) / 3)
    },
    styles: {
      "#MathJax_About": {
        position: "fixed",
        left: "50%",
        width: "auto",
        "text-align": "center",
        border: "3px outset",
        padding: "1em 2em",
        "background-color": "#DDDDDD",
        color: "black",
        cursor: "default",
        "font-family": "message-box",
        "font-size": "120%",
        "font-style": "normal",
        "text-indent": 0,
        "text-transform": "none",
        "line-height": "normal",
        "letter-spacing": "normal",
        "word-spacing": "normal",
        "word-wrap": "normal",
        "white-space": "nowrap",
        float: "none",
        "z-index": 201,
        "border-radius": "15px",
        "-webkit-border-radius": "15px",
        "-moz-border-radius": "15px",
        "-khtml-border-radius": "15px",
        "box-shadow": "0px 10px 20px #808080",
        "-webkit-box-shadow": "0px 10px 20px #808080",
        "-moz-box-shadow": "0px 10px 20px #808080",
        "-khtml-box-shadow": "0px 10px 20px #808080",
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      "#MathJax_About.MathJax_MousePost": { outline: "none" },
      ".MathJax_Menu": {
        position: "absolute",
        "background-color": "white",
        color: "black",
        width: "auto",
        padding: a ? "2px" : "5px 0px",
        border: "1px solid #CCCCCC",
        margin: 0,
        cursor: "default",
        font: "menu",
        "text-align": "left",
        "text-indent": 0,
        "text-transform": "none",
        "line-height": "normal",
        "letter-spacing": "normal",
        "word-spacing": "normal",
        "word-wrap": "normal",
        "white-space": "nowrap",
        float: "none",
        "z-index": 201,
        "border-radius": j,
        "-webkit-border-radius": j,
        "-moz-border-radius": j,
        "-khtml-border-radius": j,
        "box-shadow": "0px 10px 20px #808080",
        "-webkit-box-shadow": "0px 10px 20px #808080",
        "-moz-box-shadow": "0px 10px 20px #808080",
        "-khtml-box-shadow": "0px 10px 20px #808080",
        filter:
          "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
      },
      ".MathJax_MenuItem": {
        padding: a ? "2px 2em" : "1px 2em",
        background: "transparent"
      },
      ".MathJax_MenuArrow": {
        position: "absolute",
        right: ".5em",
        "padding-top": ".25em",
        color: "#666666",
        "font-family": l ? "'Arial unicode MS'" : null,
        "font-size": ".75em"
      },
      ".MathJax_MenuActive .MathJax_MenuArrow": { color: "white" },
      ".MathJax_MenuArrow.RTL": { left: ".5em", right: "auto" },
      ".MathJax_MenuCheck": {
        position: "absolute",
        left: ".7em",
        "font-family": l ? "'Arial unicode MS'" : null
      },
      ".MathJax_MenuCheck.RTL": { right: ".7em", left: "auto" },
      ".MathJax_MenuRadioCheck": {
        position: "absolute",
        left: a ? "1em" : ".7em"
      },
      ".MathJax_MenuRadioCheck.RTL": {
        right: a ? "1em" : ".7em",
        left: "auto"
      },
      ".MathJax_MenuLabel": {
        padding: a ? "2px 2em 4px 1.33em" : "1px 2em 3px 1.33em",
        "font-style": "italic"
      },
      ".MathJax_MenuRule": {
        "border-top": a ? "1px solid #CCCCCC" : "1px solid #DDDDDD",
        margin: a ? "4px 1px 0px" : "4px 3px"
      },
      ".MathJax_MenuDisabled": { color: "GrayText" },
      ".MathJax_MenuActive": {
        "background-color": a ? "Highlight" : "#606872",
        color: a ? "HighlightText" : "white"
      },
      ".MathJax_MenuDisabled:focus, .MathJax_MenuLabel:focus": {
        "background-color": "#E8E8E8"
      },
      ".MathJax_ContextMenu:focus": { outline: "none" },
      ".MathJax_ContextMenu .MathJax_MenuItem:focus": { outline: "none" },
      "#MathJax_AboutClose": { top: ".2em", right: ".2em" },
      ".MathJax_Menu .MathJax_MenuClose": { top: "-10px", left: "-10px" },
      ".MathJax_MenuClose": {
        position: "absolute",
        cursor: "pointer",
        display: "inline-block",
        border: "2px solid #AAA",
        "border-radius": "18px",
        "-webkit-border-radius": "18px",
        "-moz-border-radius": "18px",
        "-khtml-border-radius": "18px",
        "font-family": "'Courier New',Courier",
        "font-size": "24px",
        color: "#F0F0F0"
      },
      ".MathJax_MenuClose span": {
        display: "block",
        "background-color": "#AAA",
        border: "1.5px solid",
        "border-radius": "18px",
        "-webkit-border-radius": "18px",
        "-moz-border-radius": "18px",
        "-khtml-border-radius": "18px",
        "line-height": 0,
        padding: "8px 0 6px"
      },
      ".MathJax_MenuClose:hover": {
        color: "white!important",
        border: "2px solid #CCC!important"
      },
      ".MathJax_MenuClose:hover span": { "background-color": "#CCC!important" },
      ".MathJax_MenuClose:hover:focus": { outline: "none" }
    }
  });
  var n, k, b;
  f.Register.StartupHook("MathEvents Ready", function() {
    n = MathJax.Extension.MathEvents.Event.False;
    k = MathJax.Extension.MathEvents.Hover;
    b = MathJax.Extension.MathEvents.Event.KEY;
  });
  var h = MathJax.Object.Subclass(
    {
      Keydown: function(u, v) {
        switch (u.keyCode) {
          case b.ESCAPE:
            this.Remove(u, v);
            break;
          case b.RIGHT:
            this.Right(u, v);
            break;
          case b.LEFT:
            this.Left(u, v);
            break;
          case b.UP:
            this.Up(u, v);
            break;
          case b.DOWN:
            this.Down(u, v);
            break;
          case b.RETURN:
          case b.SPACE:
            this.Space(u, v);
            break;
          default:
            return;
            break;
        }
        return n(u);
      },
      Escape: function(u, v) {},
      Right: function(u, v) {},
      Left: function(u, v) {},
      Up: function(u, v) {},
      Down: function(u, v) {},
      Space: function(u, v) {}
    },
    {}
  );
  var g = (MathJax.Menu = h.Subclass(
    {
      version: p,
      items: [],
      posted: false,
      title: null,
      margin: 5,
      Init: function(u) {
        this.items = [].slice.call(arguments, 0);
      },
      With: function(u) {
        if (u) {
          f.Insert(this, u);
        }
        return this;
      },
      Post: function(M, E, B) {
        if (!M) {
          M = window.event || {};
        }
        var I = document.getElementById("MathJax_MenuFrame");
        if (!I) {
          I = g.Background(this);
          delete c.lastItem;
          delete c.lastMenu;
          delete g.skipUp;
          d.Post(["post", g.jax]);
          g.isRTL = MathJax.Localization.fontDirection() === "rtl";
        }
        var v = o.Element("div", {
          onmouseup: g.Mouseup,
          ondblclick: n,
          ondragstart: n,
          onselectstart: n,
          oncontextmenu: n,
          menuItem: this,
          className: "MathJax_Menu",
          onkeydown: g.Keydown,
          role: "menu"
        });
        if (M.type === "contextmenu" || M.type === "mouseover") {
          v.className += " MathJax_ContextMenu";
        }
        if (!B) {
          MathJax.Localization.setCSS(v);
        }
        for (var N = 0, K = this.items.length; N < K; N++) {
          this.items[N].Create(v);
        }
        if (g.isMobile) {
          o.addElement(
            v,
            "span",
            {
              className: "MathJax_MenuClose",
              menu: E,
              ontouchstart: g.Close,
              ontouchend: n,
              onmousedown: g.Close,
              onmouseup: n
            },
            [["span", {}, "\u00D7"]]
          );
        }
        I.appendChild(v);
        this.posted = true;
        if (v.offsetWidth) {
          v.style.width = v.offsetWidth + 2 + "px";
        }
        var H = M.pageX,
          F = M.pageY;
        var u = document.body.getBoundingClientRect();
        var C = window.getComputedStyle
          ? window.getComputedStyle(document.body)
          : { marginLeft: "0px" };
        var A = u.right - Math.min(0, u.left) + parseFloat(C.marginLeft);
        if (!H && !F && "clientX" in M) {
          H =
            M.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          F =
            M.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        if (!E) {
          var L = g.CurrentNode() || M.target;
          if ((M.type === "keydown" || (!H && !F)) && L) {
            var P = window.pageXOffset || document.documentElement.scrollLeft;
            var O = window.pageYOffset || document.documentElement.scrollTop;
            var w = L.getBoundingClientRect();
            H = (w.right + w.left) / 2 + P;
            F = (w.bottom + w.top) / 2 + O;
          }
          if (H + v.offsetWidth > A - this.margin) {
            H = A - v.offsetWidth - this.margin;
          }
          if (g.isMobile) {
            H = Math.max(5, H - Math.floor(v.offsetWidth / 2));
            F -= 20;
          }
          g.skipUp = M.isContextMenu;
        } else {
          var z = "left",
            J = E.offsetWidth;
          H = g.isMobile ? 30 : J - 2;
          F = 0;
          while (E && E !== I) {
            H += E.offsetLeft;
            F += E.offsetTop;
            E = E.parentNode;
          }
          if (!g.isMobile) {
            if (
              (g.isRTL && H - J - v.offsetWidth > this.margin) ||
              (!g.isRTL && H + v.offsetWidth > A - this.margin)
            ) {
              z = "right";
              H = Math.max(this.margin, H - J - v.offsetWidth + 6);
            }
          }
          if (!a) {
            v.style["borderRadiusTop" + z] = 0;
            v.style["WebkitBorderRadiusTop" + z] = 0;
            v.style["MozBorderRadiusTop" + z] = 0;
            v.style["KhtmlBorderRadiusTop" + z] = 0;
          }
        }
        v.style.left = H + "px";
        v.style.top = F + "px";
        if (document.selection && document.selection.empty) {
          document.selection.empty();
        }
        var G = window.pageXOffset || document.documentElement.scrollLeft;
        var D = window.pageYOffset || document.documentElement.scrollTop;
        g.Focus(v);
        if (M.type === "keydown") {
          g.skipMouseoverFromKey = true;
          setTimeout(function() {
            delete g.skipMouseoverFromKey;
          }, s.delay);
        }
        window.scrollTo(G, D);
        return n(M);
      },
      Remove: function(u, v) {
        d.Post(["unpost", g.jax]);
        var w = document.getElementById("MathJax_MenuFrame");
        if (w) {
          w.parentNode.removeChild(w);
          if (this.msieFixedPositionBug) {
            detachEvent("onresize", g.Resize);
          }
        }
        if (g.jax.hover) {
          delete g.jax.hover.nofade;
          k.UnHover(g.jax);
        }
        g.Unfocus(v);
        if (u.type === "mousedown") {
          g.CurrentNode().blur();
        }
        return n(u);
      },
      Find: function(u) {
        return this.FindN(1, u, [].slice.call(arguments, 1));
      },
      FindId: function(u) {
        return this.FindN(0, u, [].slice.call(arguments, 1));
      },
      FindN: function(y, v, x) {
        for (var w = 0, u = this.items.length; w < u; w++) {
          if (this.items[w].name[y] === v) {
            if (x.length) {
              if (!this.items[w].submenu) {
                return null;
              }
              return this.items[w].submenu.FindN(y, x[0], x.slice(1));
            }
            return this.items[w];
          }
        }
        return null;
      },
      IndexOf: function(u) {
        return this.IndexOfN(1, u);
      },
      IndexOfId: function(u) {
        return this.IndexOfN(0, u);
      },
      IndexOfN: function(x, v) {
        for (var w = 0, u = this.items.length; w < u; w++) {
          if (this.items[w].name[x] === v) {
            return w;
          }
        }
        return null;
      },
      Right: function(u, v) {
        g.Right(u, v);
      },
      Left: function(u, v) {
        g.Left(u, v);
      },
      Up: function(v, w) {
        var u = w.lastChild;
        u.menuItem.Activate(v, u);
      },
      Down: function(v, w) {
        var u = w.firstChild;
        u.menuItem.Activate(v, u);
      },
      Space: function(u, v) {
        this.Remove(u, v);
      }
    },
    {
      config: s,
      Remove: function(u) {
        return g.Event(u, this, "Remove");
      },
      Mouseover: function(u) {
        return g.Event(u, this, "Mouseover");
      },
      Mouseout: function(u) {
        return g.Event(u, this, "Mouseout");
      },
      Mousedown: function(u) {
        return g.Event(u, this, "Mousedown");
      },
      Mouseup: function(u) {
        return g.Event(u, this, "Mouseup");
      },
      Keydown: function(u) {
        return g.Event(u, this, "Keydown");
      },
      Touchstart: function(u) {
        return g.Event(u, this, "Touchstart");
      },
      Touchend: function(u) {
        return g.Event(u, this, "Touchend");
      },
      Close: function(u) {
        return g.Event(
          u,
          this.menu || this.parentNode,
          this.menu ? "Touchend" : "Remove"
        );
      },
      Event: function(w, y, u, x) {
        if (g.skipMouseover && u === "Mouseover" && !x) {
          return n(w);
        }
        if (g.skipMouseoverFromKey && u === "Mouseover") {
          delete g.skipMouseoverFromKey;
          return n(w);
        }
        if (g.skipUp) {
          if (u.match(/Mouseup|Touchend/)) {
            delete g.skipUp;
            return n(w);
          }
          if (u === "Touchstart" || (u === "Mousedown" && !g.skipMousedown)) {
            delete g.skipUp;
          }
        }
        if (!w) {
          w = window.event;
        }
        var v = y.menuItem;
        if (v && v[u]) {
          return v[u](w, y);
        }
        return null;
      },
      BGSTYLE: {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 200,
        width: "100%",
        height: "100%",
        border: 0,
        padding: 0,
        margin: 0
      },
      Background: function(v) {
        var w = o.addElement(
          document.body,
          "div",
          { style: this.BGSTYLE, id: "MathJax_MenuFrame" },
          [
            [
              "div",
              { style: this.BGSTYLE, menuItem: v, onmousedown: this.Remove }
            ]
          ]
        );
        var u = w.firstChild;
        if (g.msieBackgroundBug) {
          u.style.backgroundColor = "white";
          u.style.filter = "alpha(opacity=0)";
        }
        if (g.msieFixedPositionBug) {
          w.width = w.height = 0;
          this.Resize();
          attachEvent("onresize", this.Resize);
        } else {
          u.style.position = "fixed";
        }
        return w;
      },
      Resize: function() {
        setTimeout(g.SetWH, 0);
      },
      SetWH: function() {
        var u = document.getElementById("MathJax_MenuFrame");
        if (u) {
          u = u.firstChild;
          u.style.width = u.style.height = "1px";
          u.style.width = document.body.scrollWidth + "px";
          u.style.height = document.body.scrollHeight + "px";
        }
      },
      posted: false,
      active: null,
      GetNode: function(u) {
        var v = document.getElementById(u.inputID + "-Frame");
        return v.isMathJax ? v : v.firstChild;
      },
      CurrentNode: function() {
        return g.GetNode(g.jax);
      },
      AllNodes: function() {
        var v = MathJax.Hub.getAllJax();
        var w = [];
        for (var x = 0, u; (u = v[x]); x++) {
          w.push(g.GetNode(u));
        }
        return w;
      },
      ActiveNode: function() {
        return g.active;
      },
      FocusNode: function(u) {
        g.active = u;
        u.focus();
      },
      Focus: function(u) {
        !g.posted ? g.Activate(u) : (g.ActiveNode().tabIndex = -1);
        u.tabIndex = 0;
        g.FocusNode(u);
      },
      Activate: function(u, v) {
        g.UnsetTabIndex();
        g.posted = true;
      },
      Unfocus: function() {
        g.ActiveNode().tabIndex = -1;
        g.SetTabIndex();
        g.FocusNode(g.CurrentNode());
        g.posted = false;
      },
      MoveHorizontal: function(y, z, w) {
        if (!y.shiftKey) {
          return;
        }
        var v = g.AllNodes();
        var u = v.length;
        if (u === 0) {
          return;
        }
        var x = v[g.Mod(w(g.IndexOf(v, g.CurrentNode())), u)];
        if (x === g.CurrentNode()) {
          return;
        }
        g.menu.Remove(y, z);
        g.jax = MathJax.Hub.getJaxFor(x);
        g.FocusNode(x);
        g.menu.Post(null);
      },
      Right: function(u, v) {
        g.MoveHorizontal(u, v, function(w) {
          return w + 1;
        });
      },
      Left: function(u, v) {
        g.MoveHorizontal(u, v, function(w) {
          return w - 1;
        });
      },
      UnsetTabIndex: function() {
        var v = g.AllNodes();
        for (var w = 0, u; (u = v[w]); w++) {
          if (u.tabIndex > 0) {
            u.oldTabIndex = u.tabIndex;
          }
          u.tabIndex = -1;
        }
      },
      SetTabIndex: function() {
        var v = g.AllNodes();
        for (var w = 0, u; (u = v[w]); w++) {
          if (u.oldTabIndex !== undefined) {
            u.tabIndex = u.oldTabIndex;
            delete u.oldTabIndex;
          } else {
            u.tabIndex = f.getTabOrder(u);
          }
        }
      },
      Mod: function(u, v) {
        return ((u % v) + v) % v;
      },
      IndexOf: Array.prototype.indexOf
        ? function(u, v, w) {
            return u.indexOf(v, w);
          }
        : function(u, x, y) {
            for (var w = y || 0, v = u.length; w < v; w++) {
              if (x === u[w]) {
                return w;
              }
            }
            return -1;
          },
      saveCookie: function() {
        o.Cookie.Set("menu", this.cookie);
      },
      getCookie: function() {
        this.cookie = o.Cookie.Get("menu");
      }
    }
  ));
  MathJax.Menu.NAV = h;
  var c = (g.ITEM = h.Subclass(
    {
      name: "",
      node: null,
      menu: null,
      Attributes: function(u) {
        return f.Insert(
          {
            onmouseup: g.Mouseup,
            ondragstart: n,
            onselectstart: n,
            onselectend: n,
            ontouchstart: g.Touchstart,
            ontouchend: g.Touchend,
            className: "MathJax_MenuItem",
            role: this.role,
            menuItem: this
          },
          u
        );
      },
      Create: function(w) {
        if (!this.hidden) {
          var v = this.Attributes();
          var u = this.Label(v, w);
          o.addElement(w, "div", v, u);
        }
      },
      Name: function() {
        return t(this.name[0], this.name[1]);
      },
      Mouseover: function(u, v) {
        if (v.parentNode === g.ActiveNode().parentNode) {
          this.Deactivate(g.ActiveNode());
        }
        this.Activate(u, v);
      },
      Mouseout: function(u, v) {
        this.Deactivate(v);
      },
      Mouseup: function(u, v) {
        return this.Remove(u, v);
      },
      DeactivateSubmenus: function(z) {
        var y = document.getElementById("MathJax_MenuFrame").childNodes,
          v = c.GetMenuNode(z).childNodes;
        for (var w = 0, u = v.length; w < u; w++) {
          var x = v[w].menuItem;
          if (x && x.submenu && x.submenu.posted && x !== z.menuItem) {
            x.Deactivate(v[w]);
          }
        }
        this.RemoveSubmenus(z, y);
      },
      RemoveSubmenus: function(w, v) {
        v = v || document.getElementById("MathJax_MenuFrame").childNodes;
        var u = v.length - 1;
        while (u >= 0 && c.GetMenuNode(w).menuItem !== v[u].menuItem) {
          v[u].menuItem.posted = false;
          v[u].parentNode.removeChild(v[u]);
          u--;
        }
      },
      Touchstart: function(u, v) {
        return this.TouchEvent(u, v, "Mousedown");
      },
      Touchend: function(u, v) {
        return this.TouchEvent(u, v, "Mouseup");
      },
      TouchEvent: function(v, w, u) {
        if (this !== c.lastItem) {
          if (c.lastMenu) {
            g.Event(v, c.lastMenu, "Mouseout");
          }
          g.Event(v, w, "Mouseover", true);
          c.lastItem = this;
          c.lastMenu = w;
        }
        if (this.nativeTouch) {
          return null;
        }
        g.Event(v, w, u);
        return false;
      },
      Remove: function(u, v) {
        v = v.parentNode.menuItem;
        return v.Remove(u, v);
      },
      With: function(u) {
        if (u) {
          f.Insert(this, u);
        }
        return this;
      },
      isRTL: function() {
        return g.isRTL;
      },
      rtlClass: function() {
        return this.isRTL() ? " RTL" : "";
      }
    },
    {
      GetMenuNode: function(u) {
        return u.parentNode;
      }
    }
  ));
  g.ENTRY = g.ITEM.Subclass({
    role: "menuitem",
    Attributes: function(u) {
      u = f.Insert(
        {
          onmouseover: g.Mouseover,
          onmouseout: g.Mouseout,
          onmousedown: g.Mousedown,
          onkeydown: g.Keydown,
          "aria-disabled": !!this.disabled
        },
        u
      );
      u = this.SUPER(arguments).Attributes.call(this, u);
      if (this.disabled) {
        u.className += " MathJax_MenuDisabled";
      }
      return u;
    },
    MoveVertical: function(u, E, w) {
      var x = c.GetMenuNode(E);
      var D = [];
      for (var z = 0, C = x.menuItem.items, y; (y = C[z]); z++) {
        if (!y.hidden) {
          D.push(y);
        }
      }
      var B = g.IndexOf(D, this);
      if (B === -1) {
        return;
      }
      var A = D.length;
      var v = x.childNodes;
      do {
        B = g.Mod(w(B), A);
      } while (D[B].hidden || !v[B].role || v[B].role === "separator");
      this.Deactivate(E);
      D[B].Activate(u, v[B]);
    },
    Up: function(v, u) {
      this.MoveVertical(v, u, function(w) {
        return w - 1;
      });
    },
    Down: function(v, u) {
      this.MoveVertical(v, u, function(w) {
        return w + 1;
      });
    },
    Right: function(v, u) {
      this.MoveHorizontal(v, u, g.Right, !this.isRTL());
    },
    Left: function(v, u) {
      this.MoveHorizontal(v, u, g.Left, this.isRTL());
    },
    MoveHorizontal: function(A, z, u, B) {
      var x = c.GetMenuNode(z);
      if (x.menuItem === g.menu && A.shiftKey) {
        u(A, z);
      }
      if (B) {
        return;
      }
      if (x.menuItem !== g.menu) {
        this.Deactivate(z);
      }
      var v = x.previousSibling.childNodes;
      var y = v.length;
      while (y--) {
        var w = v[y];
        if (w.menuItem.submenu && w.menuItem.submenu === x.menuItem) {
          g.Focus(w);
          break;
        }
      }
      this.RemoveSubmenus(z);
    },
    Space: function(u, v) {
      this.Mouseup(u, v);
    },
    Activate: function(u, v) {
      this.Deactivate(v);
      if (!this.disabled) {
        v.className += " MathJax_MenuActive";
      }
      this.DeactivateSubmenus(v);
      g.Focus(v);
    },
    Deactivate: function(u) {
      u.className = u.className.replace(/ MathJax_MenuActive/, "");
    }
  });
  g.ITEM.COMMAND = g.ENTRY.Subclass({
    action: function() {},
    Init: function(u, w, v) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      this.action = w;
      this.With(v);
    },
    Label: function(u, v) {
      return [this.Name()];
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        this.Remove(u, v);
        d.Post(["command", this]);
        this.action.call(this, u);
      }
      return n(u);
    }
  });
  g.ITEM.SUBMENU = g.ENTRY.Subclass({
    submenu: null,
    marker: "\u25BA",
    markerRTL: "\u25C4",
    Attributes: function(u) {
      u = f.Insert({ "aria-haspopup": "true" }, u);
      u = this.SUPER(arguments).Attributes.call(this, u);
      return u;
    },
    Init: function(u, w) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      var v = 1;
      if (!(w instanceof g.ITEM)) {
        this.With(w), v++;
      }
      this.submenu = g.apply(g, [].slice.call(arguments, v));
    },
    Label: function(u, v) {
      this.submenu.posted = false;
      return [
        this.Name() + " ",
        [
          "span",
          { className: "MathJax_MenuArrow" + this.rtlClass() },
          [this.isRTL() ? this.markerRTL : this.marker]
        ]
      ];
    },
    Timer: function(u, v) {
      this.ClearTimer();
      u = { type: u.type, clientX: u.clientX, clientY: u.clientY };
      this.timer = setTimeout(e(["Mouseup", this, u, v]), s.delay);
    },
    ClearTimer: function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    Touchend: function(v, x) {
      var w = this.submenu.posted;
      var u = this.SUPER(arguments).Touchend.apply(this, arguments);
      if (w) {
        this.Deactivate(x);
        delete c.lastItem;
        delete c.lastMenu;
      }
      return u;
    },
    Mouseout: function(u, v) {
      if (!this.submenu.posted) {
        this.Deactivate(v);
      }
      this.ClearTimer();
    },
    Mouseover: function(u, v) {
      this.Activate(u, v);
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        if (!this.submenu.posted) {
          this.ClearTimer();
          this.submenu.Post(u, v, this.ltr);
          g.Focus(v);
        } else {
          this.DeactivateSubmenus(v);
        }
      }
      return n(u);
    },
    Activate: function(u, v) {
      if (!this.disabled) {
        this.Deactivate(v);
        v.className += " MathJax_MenuActive";
      }
      if (!this.submenu.posted) {
        this.DeactivateSubmenus(v);
        if (!g.isMobile) {
          this.Timer(u, v);
        }
      }
      g.Focus(v);
    },
    MoveVertical: function(w, v, u) {
      this.ClearTimer();
      this.SUPER(arguments).MoveVertical.apply(this, arguments);
    },
    MoveHorizontal: function(w, y, v, x) {
      if (!x) {
        this.SUPER(arguments).MoveHorizontal.apply(this, arguments);
        return;
      }
      if (this.disabled) {
        return;
      }
      if (!this.submenu.posted) {
        this.Activate(w, y);
        return;
      }
      var u = c.GetMenuNode(y).nextSibling.childNodes;
      if (u.length > 0) {
        this.submenu.items[0].Activate(w, u[0]);
      }
    }
  });
  g.ITEM.RADIO = g.ENTRY.Subclass({
    variable: null,
    marker: a ? "\u25CF" : "\u2713",
    role: "menuitemradio",
    Attributes: function(v) {
      var u = s.settings[this.variable] === this.value ? "true" : "false";
      v = f.Insert({ "aria-checked": u }, v);
      v = this.SUPER(arguments).Attributes.call(this, v);
      return v;
    },
    Init: function(v, u, w) {
      if (!i(v)) {
        v = [v, v];
      }
      this.name = v;
      this.variable = u;
      this.With(w);
      if (this.value == null) {
        this.value = this.name[0];
      }
    },
    Label: function(v, w) {
      var u = { className: "MathJax_MenuRadioCheck" + this.rtlClass() };
      if (s.settings[this.variable] !== this.value) {
        u = { style: { display: "none" } };
      }
      return [["span", u, [this.marker]], " " + this.Name()];
    },
    Mouseup: function(x, y) {
      if (!this.disabled) {
        var z = y.parentNode.childNodes;
        for (var v = 0, u = z.length; v < u; v++) {
          var w = z[v].menuItem;
          if (w && w.variable === this.variable) {
            z[v].firstChild.style.display = "none";
          }
        }
        y.firstChild.display = "";
        s.settings[this.variable] = this.value;
        g.cookie[this.variable] = s.settings[this.variable];
        g.saveCookie();
        d.Post(["radio button", this]);
      }
      this.Remove(x, y);
      if (this.action && !this.disabled) {
        this.action.call(g, this);
      }
      return n(x);
    }
  });
  g.ITEM.CHECKBOX = g.ENTRY.Subclass({
    variable: null,
    marker: "\u2713",
    role: "menuitemcheckbox",
    Attributes: function(v) {
      var u = s.settings[this.variable] ? "true" : "false";
      v = f.Insert({ "aria-checked": u }, v);
      v = this.SUPER(arguments).Attributes.call(this, v);
      return v;
    },
    Init: function(v, u, w) {
      if (!i(v)) {
        v = [v, v];
      }
      this.name = v;
      this.variable = u;
      this.With(w);
    },
    Label: function(v, w) {
      var u = { className: "MathJax_MenuCheck" + this.rtlClass() };
      if (!s.settings[this.variable]) {
        u = { style: { display: "none" } };
      }
      return [["span", u, [this.marker]], " " + this.Name()];
    },
    Mouseup: function(u, v) {
      if (!this.disabled) {
        v.firstChild.display = s.settings[this.variable] ? "none" : "";
        s.settings[this.variable] = !s.settings[this.variable];
        g.cookie[this.variable] = s.settings[this.variable];
        g.saveCookie();
        d.Post(["checkbox", this]);
      }
      this.Remove(u, v);
      if (this.action && !this.disabled) {
        this.action.call(g, this);
      }
      return n(u);
    }
  });
  g.ITEM.LABEL = g.ENTRY.Subclass({
    role: "menuitem",
    Init: function(u, v) {
      if (!i(u)) {
        u = [u, u];
      }
      this.name = u;
      this.With(v);
    },
    Label: function(u, v) {
      u.className += " MathJax_MenuLabel";
      return [this.Name()];
    },
    Activate: function(u, v) {
      this.Deactivate(v);
      g.Focus(v);
    },
    Mouseup: function(u, v) {}
  });
  g.ITEM.RULE = g.ITEM.Subclass({
    role: "separator",
    Attributes: function(u) {
      u = f.Insert({ "aria-orientation": "vertical" }, u);
      u = this.SUPER(arguments).Attributes.call(this, u);
      return u;
    },
    Label: function(u, v) {
      u.className += " MathJax_MenuRule";
      return null;
    }
  });
  g.About = function(y) {
    var v = g.About.GetFont();
    var A = g.About.GetFormat();
    var u = ["MathJax.js v" + MathJax.fileversion, ["br"]];
    u.push([
      "div",
      { style: { "border-top": "groove 2px", margin: ".25em 0" } }
    ]);
    g.About.GetJax(u, MathJax.InputJax, ["InputJax", "%1 Input Jax v%2"]);
    g.About.GetJax(u, MathJax.OutputJax, ["OutputJax", "%1 Output Jax v%2"]);
    g.About.GetJax(u, MathJax.ElementJax, ["ElementJax", "%1 Element Jax v%2"]);
    u.push([
      "div",
      { style: { "border-top": "groove 2px", margin: ".25em 0" } }
    ]);
    g.About.GetJax(
      u,
      MathJax.Extension,
      ["Extension", "%1 Extension v%2"],
      true
    );
    u.push(
      ["div", { style: { "border-top": "groove 2px", margin: ".25em 0" } }],
      [
        "center",
        {},
        [
          f.Browser +
            " v" +
            f.Browser.version +
            (A ? " \u2014 " + t(A.replace(/ /g, ""), A) : "")
        ]
      ]
    );
    g.About.div = g.Background(g.About);
    var x = o.addElement(
      g.About.div,
      "div",
      { id: "MathJax_About", tabIndex: 0, onkeydown: g.About.Keydown },
      [
        ["b", { style: { fontSize: "120%" } }, ["MathJax"]],
        " v" + MathJax.version,
        ["br"],
        t(v.replace(/ /g, ""), "using " + v),
        ["br"],
        ["br"],
        [
          "span",
          {
            style: {
              display: "inline-block",
              "text-align": "left",
              "font-size": "80%",
              "max-height": "20em",
              overflow: "auto",
              "background-color": "#E4E4E4",
              padding: ".4em .6em",
              border: "1px inset"
            },
            tabIndex: 0
          },
          u
        ],
        ["br"],
        ["br"],
        ["a", { href: "http://www.mathjax.org/" }, ["www.mathjax.org"]],
        [
          "span",
          {
            className: "MathJax_MenuClose",
            id: "MathJax_AboutClose",
            onclick: g.About.Remove,
            onkeydown: g.About.Keydown,
            tabIndex: 0,
            role: "button",
            "aria-label": t("CloseAboutDialog", "Close about MathJax dialog")
          },
          [["span", {}, "\u00D7"]]
        ]
      ]
    );
    if (y.type === "mouseup") {
      x.className += " MathJax_MousePost";
    }
    x.focus();
    MathJax.Localization.setCSS(x);
    var z = document.documentElement || {};
    var w = window.innerHeight || z.clientHeight || z.scrollHeight || 0;
    if (g.prototype.msieAboutBug) {
      x.style.width = "20em";
      x.style.position = "absolute";
      x.style.left =
        Math.floor((document.documentElement.scrollWidth - x.offsetWidth) / 2) +
        "px";
      x.style.top =
        Math.floor((w - x.offsetHeight) / 3) + document.body.scrollTop + "px";
    } else {
      x.style.marginLeft = Math.floor(-x.offsetWidth / 2) + "px";
      x.style.top = Math.floor((w - x.offsetHeight) / 3) + "px";
    }
  };
  g.About.Remove = function(u) {
    if (g.About.div) {
      document.body.removeChild(g.About.div);
      delete g.About.div;
    }
  };
  (g.About.Keydown = function(u) {
    if (
      u.keyCode === b.ESCAPE ||
      (this.id === "MathJax_AboutClose" &&
        (u.keyCode === b.SPACE || u.keyCode === b.RETURN))
    ) {
      g.About.Remove(u);
      g.CurrentNode().focus();
      n(u);
    }
  }),
    (g.About.GetJax = function(v, A, y, x) {
      var z = [];
      for (var B in A) {
        if (A.hasOwnProperty(B) && A[B]) {
          if ((x && A[B].version) || (A[B].isa && A[B].isa(A))) {
            z.push(t(y[0], y[1], A[B].id || B, A[B].version));
          }
        }
      }
      z.sort();
      for (var w = 0, u = z.length; w < u; w++) {
        v.push(z[w], ["br"]);
      }
      return v;
    });
  g.About.GetFont = function() {
    var u = MathJax.Hub.outputJax["jax/mml"][0] || {};
    var v =
      {
        SVG: "web SVG",
        CommonHTML: "web TeX",
        "HTML-CSS": u.imgFonts
          ? "image"
          : (u.webFonts ? "web" : "local") + " " + u.fontInUse
      }[u.id] || "generic";
    return v + " fonts";
  };
  g.About.GetFormat = function() {
    var u = MathJax.Hub.outputJax["jax/mml"][0] || {};
    if (u.id !== "HTML-CSS" || !u.webFonts || u.imgFonts) {
      return;
    }
    return u.allowWebFonts.replace(/otf/, "woff or otf") + " fonts";
  };
  g.Help = function(u) {
    q.Require("[MathJax]/extensions/HelpDialog.js", function() {
      MathJax.Extension.Help.Dialog({ type: u.type });
    });
  };
  g.ShowSource = function(y) {
    if (!y) {
      y = window.event;
    }
    var x = { screenX: y.screenX, screenY: y.screenY };
    if (!g.jax) {
      return;
    }
    if (this.format === "MathML") {
      var v = MathJax.ElementJax.mml;
      if (v && typeof v.mbase.prototype.toMathML !== "undefined") {
        try {
          g.ShowSource.Text(g.jax.root.toMathML("", g.jax), y);
        } catch (w) {
          if (!w.restart) {
            throw w;
          }
          e.After([this, g.ShowSource, x], w.restart);
        }
      } else {
        if (!q.loadingToMathML) {
          q.loadingToMathML = true;
          g.ShowSource.Window(y);
          e.Queue(
            q.Require("[MathJax]/extensions/toMathML.js"),
            function() {
              delete q.loadingToMathML;
              if (!v.mbase.prototype.toMathML) {
                v.mbase.prototype.toMathML = function() {};
              }
            },
            [this, g.ShowSource, x]
          );
          return;
        }
      }
    } else {
      if (this.format === "Error") {
        g.ShowSource.Text(g.jax.errorText, y);
      } else {
        if (s.semanticsAnnotations[this.format]) {
          var u = g.jax.root.getAnnotation(this.format);
          if (u.data[0]) {
            g.ShowSource.Text(u.data[0].toString());
          }
        } else {
          if (g.jax.originalText == null) {
            alert(t("NoOriginalForm", "No original form available"));
            return;
          }
          g.ShowSource.Text(g.jax.originalText, y);
        }
      }
    }
  };
  g.ShowSource.Window = function(v) {
    if (!g.ShowSource.w) {
      var w = [],
        u = s.windowSettings;
      for (var x in u) {
        if (u.hasOwnProperty(x)) {
          w.push(x + "=" + u[x]);
        }
      }
      g.ShowSource.w = window.open("", "_blank", w.join(","));
    }
    return g.ShowSource.w;
  };
  g.ShowSource.Text = function(z, x) {
    var u = g.ShowSource.Window(x);
    delete g.ShowSource.w;
    z = z.replace(/^\s*/, "").replace(/\s*$/, "");
    z = z
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    var y = t("EqSource", "MathJax Equation Source");
    if (g.isMobile) {
      u.document.open();
      u.document.write(
        "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>" +
          y +
          "</title></head><body style='font-size:85%'>"
      );
      u.document.write("<pre>" + z + "</pre>");
      u.document.write(
        "<hr><input type='button' value='" +
          t("Close", "Close") +
          "' onclick='window.close()' />"
      );
      u.document.write("</body></html>");
      u.document.close();
    } else {
      u.document.open();
      u.document.write(
        "<html><head><title>" +
          y +
          "</title></head><body style='font-size:85%'>"
      );
      u.document.write("<table><tr><td><pre>" + z + "</pre></td></tr></table>");
      u.document.write("</body></html>");
      u.document.close();
      var v = u.document.body.firstChild;
      setTimeout(function() {
        var B = u.outerHeight - u.innerHeight || 30,
          A = u.outerWidth - u.innerWidth || 30,
          w,
          E;
        A = Math.max(
          140,
          Math.min(Math.floor(0.5 * screen.width), v.offsetWidth + A + 25)
        );
        B = Math.max(
          40,
          Math.min(Math.floor(0.5 * screen.height), v.offsetHeight + B + 25)
        );
        if (g.prototype.msieHeightBug) {
          B += 35;
        }
        u.resizeTo(A, B);
        var D;
        try {
          D = x.screenX;
        } catch (C) {}
        if (x && D != null) {
          w = Math.max(
            0,
            Math.min(x.screenX - Math.floor(A / 2), screen.width - A - 20)
          );
          E = Math.max(
            0,
            Math.min(x.screenY - Math.floor(B / 2), screen.height - B - 20)
          );
          u.moveTo(w, E);
        }
      }, 50);
    }
  };
  g.Scale = function() {
    var z = ["CommonHTML", "HTML-CSS", "SVG", "NativeMML", "PreviewHTML"],
      u = z.length,
      y = 100,
      w,
      v;
    for (w = 0; w < u; w++) {
      v = r[z[w]];
      if (v) {
        y = v.config.scale;
        break;
      }
    }
    var x = prompt(
      t("ScaleMath", "Scale all mathematics (compared to surrounding text) by"),
      y + "%"
    );
    if (x) {
      if (x.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
        x = parseFloat(x);
        if (x) {
          if (x !== y) {
            for (w = 0; w < u; w++) {
              v = r[z[w]];
              if (v) {
                v.config.scale = x;
              }
            }
            g.cookie.scale = f.config.scale = x;
            g.saveCookie();
            f.Queue(["Rerender", f]);
          }
        } else {
          alert(t("NonZeroScale", "The scale should not be zero"));
        }
      } else {
        alert(
          t("PercentScale", "The scale should be a percentage (e.g., 120%%)")
        );
      }
    }
  };
  g.Zoom = function() {
    if (!MathJax.Extension.MathZoom) {
      q.Require("[MathJax]/extensions/MathZoom.js");
    }
  };
  g.Renderer = function() {
    var v = f.outputJax["jax/mml"];
    if (v[0] !== s.settings.renderer) {
      var y = f.Browser,
        x,
        u = g.Renderer.Messages,
        w;
      switch (s.settings.renderer) {
        case "NativeMML":
          if (!s.settings.warnedMML) {
            if (y.isChrome && y.version.substr(0, 3) !== "24.") {
              x = u.MML.WebKit;
            } else {
              if (y.isSafari && !y.versionAtLeast("5.0")) {
                x = u.MML.WebKit;
              } else {
                if (y.isMSIE) {
                  if (!y.hasMathPlayer) {
                    x = u.MML.MSIE;
                  }
                } else {
                  if (y.isEdge) {
                    x = u.MML.WebKit;
                  } else {
                    x = u.MML[y];
                  }
                }
              }
            }
            w = "warnedMML";
          }
          break;
        case "SVG":
          if (!s.settings.warnedSVG) {
            if (y.isMSIE && !m) {
              x = u.SVG.MSIE;
            }
          }
          break;
      }
      if (x) {
        x = t(x[0], x[1]);
        x += "\n\n";
        x += t(
          "SwitchAnyway",
          "Switch the renderer anyway?\n\n(Press OK to switch, CANCEL to continue with the current renderer)"
        );
        g.cookie.renderer = v[0].id;
        g.saveCookie();
        if (!confirm(x)) {
          g.cookie.renderer = s.settings.renderer = o.Cookie.Get(
            "menu"
          ).renderer;
          g.saveCookie();
          return;
        }
        if (w) {
          g.cookie.warned = s.settings.warned = true;
        }
        g.cookie.renderer = s.settings.renderer;
        g.saveCookie();
      }
      f.Queue(
        ["setRenderer", f, s.settings.renderer, "jax/mml"],
        ["Rerender", f]
      );
    }
  };
  g.Renderer.Messages = {
    MML: {
      WebKit: [
        "WebkitNativeMMLWarning",
        "Your browser doesn't seem to support MathML natively, so switching to MathML output may cause the mathematics on the page to become unreadable."
      ],
      MSIE: [
        "MSIENativeMMLWarning",
        "Internet Explorer requires the MathPlayer plugin in order to process MathML output."
      ],
      Opera: [
        "OperaNativeMMLWarning",
        "Opera's support for MathML is limited, so switching to MathML output may cause some expressions to render poorly."
      ],
      Safari: [
        "SafariNativeMMLWarning",
        "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."
      ],
      Firefox: [
        "FirefoxNativeMMLWarning",
        "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."
      ]
    },
    SVG: {
      MSIE: [
        "MSIESVGWarning",
        "SVG is not implemented in Internet Explorer prior to IE9 or when it is emulating IE8 or below. Switching to SVG output will cause the mathematics to not display properly."
      ]
    }
  };
  g.AssistiveMML = function(w, u) {
    var v = MathJax.Extension.AssistiveMML;
    if (!v) {
      if (!u) {
        q.Require("[MathJax]/extensions/AssistiveMML.js", [
          "AssistiveMML",
          g,
          w,
          true
        ]);
      }
      return;
    }
    MathJax.Hub.Queue([
      (s.settings.assistiveMML ? "Add" : "Remove") + "AssistiveMathML",
      v
    ]);
  };
  g.Font = function() {
    var u = r["HTML-CSS"];
    if (!u) {
      return;
    }
    document.location.reload();
  };
  g.Locale = function() {
    MathJax.Localization.setLocale(s.settings.locale);
    MathJax.Hub.Queue(["Reprocess", MathJax.Hub]);
  };
  g.LoadLocale = function() {
    var u = prompt(t("LoadURL", "Load translation data from this URL:"));
    if (u) {
      if (!u.match(/\.js$/)) {
        alert(
          t(
            "BadURL",
            "The URL should be for a javascript file that defines MathJax translation data.  Javascript file names should end with '.js'"
          )
        );
      }
      q.Require(u, function(v) {
        if (v != q.STATUS.OK) {
          alert(t("BadData", "Failed to load translation data from %1", u));
        }
      });
    }
  };
  g.MPEvents = function(w) {
    var v = s.settings.discoverable,
      u = g.MPEvents.Messages;
    if (!m) {
      if (s.settings.mpMouse && !confirm(t.apply(t, u.IE8warning))) {
        delete g.cookie.mpContext;
        delete s.settings.mpContext;
        delete g.cookie.mpMouse;
        delete s.settings.mpMouse;
        g.saveCookie();
        return;
      }
      s.settings.mpContext = s.settings.mpMouse;
      g.cookie.mpContext = g.cookie.mpMouse = s.settings.mpMouse;
      g.saveCookie();
      MathJax.Hub.Queue(["Rerender", MathJax.Hub]);
    } else {
      if (!v && w.name[1] === "Menu Events" && s.settings.mpContext) {
        alert(t.apply(t, u.IE9warning));
      }
    }
  };
  g.MPEvents.Messages = {
    IE8warning: [
      "IE8warning",
      "This will disable the MathJax menu and zoom features, but you can Alt-Click on an expression to obtain the MathJax menu instead.\n\nReally change the MathPlayer settings?"
    ],
    IE9warning: [
      "IE9warning",
      "The MathJax contextual menu will be disabled, but you can Alt-Click on an expression to obtain the MathJax menu instead."
    ]
  };
  f.Browser.Select({
    MSIE: function(u) {
      var v = document.compatMode === "BackCompat";
      var w = u.versionAtLeast("8.0") && document.documentMode > 7;
      g.Augment({
        margin: 20,
        msieBackgroundBug: (document.documentMode || 0) < 9,
        msieFixedPositionBug: v || !w,
        msieAboutBug: v,
        msieHeightBug: (document.documentMode || 0) < 9
      });
      if (m) {
        delete s.styles["#MathJax_About"].filter;
        delete s.styles[".MathJax_Menu"].filter;
      }
    },
    Firefox: function(u) {
      g.skipMouseover = u.isMobile && u.versionAtLeast("6.0");
      g.skipMousedown = u.isMobile;
    }
  });
  g.isMobile = f.Browser.isMobile;
  g.noContextMenu = f.Browser.noContextMenu;
  g.CreateLocaleMenu = function() {
    if (!g.menu) {
      return;
    }
    var z = g.menu.Find("Language").submenu,
      w = z.items;
    var v = [],
      B = MathJax.Localization.strings;
    for (var A in B) {
      if (B.hasOwnProperty(A)) {
        v.push(A);
      }
    }
    v = v.sort();
    z.items = [];
    for (var x = 0, u = v.length; x < u; x++) {
      var y = B[v[x]].menuTitle;
      if (y) {
        y += " (" + v[x] + ")";
      } else {
        y = v[x];
      }
      z.items.push(c.RADIO([v[x], y], "locale", { action: g.Locale }));
    }
    z.items.push(w[w.length - 2], w[w.length - 1]);
  };
  g.CreateAnnotationMenu = function() {
    if (!g.menu) {
      return;
    }
    var w = g.menu.Find("Show Math As", "Annotation").submenu;
    var v = s.semanticsAnnotations;
    for (var u in v) {
      if (v.hasOwnProperty(u)) {
        w.items.push(
          c.COMMAND([u, u], g.ShowSource, {
            hidden: true,
            nativeTouch: true,
            format: u
          })
        );
      }
    }
  };
  f.Register.StartupHook("End Config", function() {
    s.settings = f.config.menuSettings;
    if (typeof s.settings.showRenderer !== "undefined") {
      s.showRenderer = s.settings.showRenderer;
    }
    if (typeof s.settings.showFontMenu !== "undefined") {
      s.showFontMenu = s.settings.showFontMenu;
    }
    if (typeof s.settings.showContext !== "undefined") {
      s.showContext = s.settings.showContext;
    }
    g.getCookie();
    g.menu = g(
      c.SUBMENU(
        ["Show", "Show Math As"],
        c.COMMAND(["MathMLcode", "MathML Code"], g.ShowSource, {
          nativeTouch: true,
          format: "MathML"
        }),
        c.COMMAND(["Original", "Original Form"], g.ShowSource, {
          nativeTouch: true
        }),
        c.SUBMENU(["Annotation", "Annotation"], { disabled: true }),
        c.RULE(),
        c.CHECKBOX(["texHints", "Show TeX hints in MathML"], "texHints"),
        c.CHECKBOX(
          ["semantics", "Add original form as annotation"],
          "semantics"
        )
      ),
      c.RULE(),
      c.SUBMENU(
        ["Settings", "Math Settings"],
        c.SUBMENU(
          ["ZoomTrigger", "Zoom Trigger"],
          c.RADIO(["Hover", "Hover"], "zoom", { action: g.Zoom }),
          c.RADIO(["Click", "Click"], "zoom", { action: g.Zoom }),
          c.RADIO(["DoubleClick", "Double-Click"], "zoom", { action: g.Zoom }),
          c.RADIO(["NoZoom", "No Zoom"], "zoom", { value: "None" }),
          c.RULE(),
          c.LABEL(["TriggerRequires", "Trigger Requires:"]),
          c.CHECKBOX(
            f.Browser.isMac ? ["Option", "Option"] : ["Alt", "Alt"],
            "ALT"
          ),
          c.CHECKBOX(["Command", "Command"], "CMD", {
            hidden: !f.Browser.isMac
          }),
          c.CHECKBOX(["Control", "Control"], "CTRL", {
            hidden: f.Browser.isMac
          }),
          c.CHECKBOX(["Shift", "Shift"], "Shift")
        ),
        c.SUBMENU(
          ["ZoomFactor", "Zoom Factor"],
          c.RADIO("125%", "zscale"),
          c.RADIO("133%", "zscale"),
          c.RADIO("150%", "zscale"),
          c.RADIO("175%", "zscale"),
          c.RADIO("200%", "zscale"),
          c.RADIO("250%", "zscale"),
          c.RADIO("300%", "zscale"),
          c.RADIO("400%", "zscale")
        ),
        c.RULE(),
        c.SUBMENU(
          ["Renderer", "Math Renderer"],
          { hidden: !s.showRenderer },
          c.RADIO(["HTML-CSS", "HTML-CSS"], "renderer", { action: g.Renderer }),
          c.RADIO(["CommonHTML", "Common HTML"], "renderer", {
            action: g.Renderer,
            value: "CommonHTML"
          }),
          c.RADIO(["PreviewHTML", "Preview HTML"], "renderer", {
            action: g.Renderer,
            value: "PreviewHTML"
          }),
          c.RADIO(["MathML", "MathML"], "renderer", {
            action: g.Renderer,
            value: "NativeMML"
          }),
          c.RADIO(["SVG", "SVG"], "renderer", { action: g.Renderer }),
          c.RADIO(["PlainSource", "Plain Source"], "renderer", {
            action: g.Renderer,
            value: "PlainSource"
          }),
          c.RULE(),
          c.CHECKBOX(["FastPreview", "Fast Preview"], "FastPreview")
        ),
        c.SUBMENU(
          "MathPlayer",
          {
            hidden: !f.Browser.isMSIE || !s.showMathPlayer,
            disabled: !f.Browser.hasMathPlayer
          },
          c.LABEL(["MPHandles", "Let MathPlayer Handle:"]),
          c.CHECKBOX(["MenuEvents", "Menu Events"], "mpContext", {
            action: g.MPEvents,
            hidden: !m
          }),
          c.CHECKBOX(["MouseEvents", "Mouse Events"], "mpMouse", {
            action: g.MPEvents,
            hidden: !m
          }),
          c.CHECKBOX(["MenuAndMouse", "Mouse and Menu Events"], "mpMouse", {
            action: g.MPEvents,
            hidden: m
          })
        ),
        c.SUBMENU(
          ["FontPrefs", "Font Preference"],
          { hidden: !s.showFontMenu },
          c.LABEL(["ForHTMLCSS", "For HTML-CSS:"]),
          c.RADIO(["Auto", "Auto"], "font", { action: g.Font }),
          c.RULE(),
          c.RADIO(["TeXLocal", "TeX (local)"], "font", { action: g.Font }),
          c.RADIO(["TeXWeb", "TeX (web)"], "font", { action: g.Font }),
          c.RADIO(["TeXImage", "TeX (image)"], "font", { action: g.Font }),
          c.RULE(),
          c.RADIO(["STIXLocal", "STIX (local)"], "font", { action: g.Font }),
          c.RADIO(["STIXWeb", "STIX (web)"], "font", { action: g.Font }),
          c.RULE(),
          c.RADIO(["AsanaMathWeb", "Asana Math (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["GyrePagellaWeb", "Gyre Pagella (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["GyreTermesWeb", "Gyre Termes (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["LatinModernWeb", "Latin Modern (web)"], "font", {
            action: g.Font
          }),
          c.RADIO(["NeoEulerWeb", "Neo Euler (web)"], "font", {
            action: g.Font
          })
        ),
        c.SUBMENU(
          ["ContextMenu", "Contextual Menu"],
          { hidden: !s.showContext },
          c.RADIO(["MathJax", "MathJax"], "context"),
          c.RADIO(["Browser", "Browser"], "context")
        ),
        c.COMMAND(["Scale", "Scale All Math ..."], g.Scale),
        c
          .RULE()
          .With({ hidden: !s.showDiscoverable, name: ["", "discover_rule"] }),
        c.CHECKBOX(["Discoverable", "Highlight on Hover"], "discoverable", {
          hidden: !s.showDiscoverable
        })
      ),
      c.SUBMENU(
        ["Accessibility", "Accessibility"],
        c.CHECKBOX(["AssistiveMML", "Assistive MathML"], "assistiveMML", {
          action: g.AssistiveMML
        }),
        c.CHECKBOX(["InTabOrder", "Include in Tab Order"], "inTabOrder")
      ),
      c.SUBMENU(
        ["Locale", "Language"],
        { hidden: !s.showLocale, ltr: true },
        c.RADIO("en", "locale", { action: g.Locale }),
        c
          .RULE()
          .With({ hidden: !s.showLocaleURL, name: ["", "localURL_rule"] }),
        c.COMMAND(["LoadLocale", "Load from URL ..."], g.LoadLocale, {
          hidden: !s.showLocaleURL
        })
      ),
      c.RULE(),
      c.COMMAND(["About", "About MathJax"], g.About),
      c.COMMAND(["Help", "MathJax Help"], g.Help)
    );
    if (g.isMobile) {
      (function() {
        var v = s.settings;
        var u = g.menu.Find("Math Settings", "Zoom Trigger").submenu;
        u.items[0].disabled = u.items[1].disabled = true;
        if (v.zoom === "Hover" || v.zoom == "Click") {
          v.zoom = "None";
        }
        u.items = u.items.slice(0, 4);
        if (navigator.appVersion.match(/[ (]Android[) ]/)) {
          g.ITEM.SUBMENU.Augment({ marker: "\u00BB" });
        }
      })();
    }
    g.CreateLocaleMenu();
    g.CreateAnnotationMenu();
  });
  g.showRenderer = function(u) {
    g.cookie.showRenderer = s.showRenderer = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Math Renderer").hidden = !u;
  };
  g.showMathPlayer = function(u) {
    g.cookie.showMathPlayer = s.showMathPlayer = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "MathPlayer").hidden = !u;
  };
  g.showFontMenu = function(u) {
    g.cookie.showFontMenu = s.showFontMenu = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Font Preference").hidden = !u;
  };
  g.showContext = function(u) {
    g.cookie.showContext = s.showContext = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Contextual Menu").hidden = !u;
  };
  g.showDiscoverable = function(u) {
    g.cookie.showDiscoverable = s.showDiscoverable = u;
    g.saveCookie();
    g.menu.Find("Math Settings", "Highlight on Hover").hidden = !u;
    g.menu.Find("Math Settings", "discover_rule").hidden = !u;
  };
  g.showLocale = function(u) {
    g.cookie.showLocale = s.showLocale = u;
    g.saveCookie();
    g.menu.Find("Language").hidden = !u;
  };
  MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function() {
    if (!MathJax.OutputJax["HTML-CSS"].config.imageFont) {
      g.menu.Find(
        "Math Settings",
        "Font Preference",
        "TeX (image)"
      ).disabled = true;
    }
  });
  e.Queue(
    f.Register.StartupHook("End Config", {}),
    ["Styles", q, s.styles],
    ["Post", f.Startup.signal, "MathMenu Ready"],
    ["loadComplete", q, "[MathJax]/extensions/MathMenu.js"]
  );
})(
  MathJax.Hub,
  MathJax.HTML,
  MathJax.Ajax,
  MathJax.CallBack,
  MathJax.OutputJax
);
MathJax.ElementJax.mml = MathJax.ElementJax(
  { mimeType: "jax/mml" },
  {
    id: "mml",
    version: "2.7.1",
    directory: MathJax.ElementJax.directory + "/mml",
    extensionDir: MathJax.ElementJax.extensionDir + "/mml",
    optableDir: MathJax.ElementJax.directory + "/mml/optable"
  }
);
MathJax.ElementJax.mml.Augment(
  {
    Init: function() {
      if (arguments.length === 1 && arguments[0].type === "math") {
        this.root = arguments[0];
      } else {
        this.root = MathJax.ElementJax.mml.math.apply(this, arguments);
      }
      if (this.root.attr && this.root.attr.mode) {
        if (!this.root.display && this.root.attr.mode === "display") {
          this.root.display = "block";
          this.root.attrNames.push("display");
        }
        delete this.root.attr.mode;
        for (var b = 0, a = this.root.attrNames.length; b < a; b++) {
          if (this.root.attrNames[b] === "mode") {
            this.root.attrNames.splice(b, 1);
            break;
          }
        }
      }
    }
  },
  {
    INHERIT: "_inherit_",
    AUTO: "_auto_",
    SIZE: {
      INFINITY: "infinity",
      SMALL: "small",
      NORMAL: "normal",
      BIG: "big"
    },
    COLOR: { TRANSPARENT: "transparent" },
    VARIANT: {
      NORMAL: "normal",
      BOLD: "bold",
      ITALIC: "italic",
      BOLDITALIC: "bold-italic",
      DOUBLESTRUCK: "double-struck",
      FRAKTUR: "fraktur",
      BOLDFRAKTUR: "bold-fraktur",
      SCRIPT: "script",
      BOLDSCRIPT: "bold-script",
      SANSSERIF: "sans-serif",
      BOLDSANSSERIF: "bold-sans-serif",
      SANSSERIFITALIC: "sans-serif-italic",
      SANSSERIFBOLDITALIC: "sans-serif-bold-italic",
      MONOSPACE: "monospace",
      INITIAL: "inital",
      TAILED: "tailed",
      LOOPED: "looped",
      STRETCHED: "stretched",
      CALIGRAPHIC: "-tex-caligraphic",
      OLDSTYLE: "-tex-oldstyle"
    },
    FORM: { PREFIX: "prefix", INFIX: "infix", POSTFIX: "postfix" },
    LINEBREAK: {
      AUTO: "auto",
      NEWLINE: "newline",
      NOBREAK: "nobreak",
      GOODBREAK: "goodbreak",
      BADBREAK: "badbreak"
    },
    LINEBREAKSTYLE: {
      BEFORE: "before",
      AFTER: "after",
      DUPLICATE: "duplicate",
      INFIXLINBREAKSTYLE: "infixlinebreakstyle"
    },
    INDENTALIGN: {
      LEFT: "left",
      CENTER: "center",
      RIGHT: "right",
      AUTO: "auto",
      ID: "id",
      INDENTALIGN: "indentalign"
    },
    INDENTSHIFT: { INDENTSHIFT: "indentshift" },
    LINETHICKNESS: { THIN: "thin", MEDIUM: "medium", THICK: "thick" },
    NOTATION: {
      LONGDIV: "longdiv",
      ACTUARIAL: "actuarial",
      RADICAL: "radical",
      BOX: "box",
      ROUNDEDBOX: "roundedbox",
      CIRCLE: "circle",
      LEFT: "left",
      RIGHT: "right",
      TOP: "top",
      BOTTOM: "bottom",
      UPDIAGONALSTRIKE: "updiagonalstrike",
      DOWNDIAGONALSTRIKE: "downdiagonalstrike",
      UPDIAGONALARROW: "updiagonalarrow",
      VERTICALSTRIKE: "verticalstrike",
      HORIZONTALSTRIKE: "horizontalstrike",
      PHASORANGLE: "phasorangle",
      MADRUWB: "madruwb"
    },
    ALIGN: {
      TOP: "top",
      BOTTOM: "bottom",
      CENTER: "center",
      BASELINE: "baseline",
      AXIS: "axis",
      LEFT: "left",
      RIGHT: "right"
    },
    LINES: { NONE: "none", SOLID: "solid", DASHED: "dashed" },
    SIDE: {
      LEFT: "left",
      RIGHT: "right",
      LEFTOVERLAP: "leftoverlap",
      RIGHTOVERLAP: "rightoverlap"
    },
    WIDTH: { AUTO: "auto", FIT: "fit" },
    ACTIONTYPE: {
      TOGGLE: "toggle",
      STATUSLINE: "statusline",
      TOOLTIP: "tooltip",
      INPUT: "input"
    },
    LENGTH: {
      VERYVERYTHINMATHSPACE: "veryverythinmathspace",
      VERYTHINMATHSPACE: "verythinmathspace",
      THINMATHSPACE: "thinmathspace",
      MEDIUMMATHSPACE: "mediummathspace",
      THICKMATHSPACE: "thickmathspace",
      VERYTHICKMATHSPACE: "verythickmathspace",
      VERYVERYTHICKMATHSPACE: "veryverythickmathspace",
      NEGATIVEVERYVERYTHINMATHSPACE: "negativeveryverythinmathspace",
      NEGATIVEVERYTHINMATHSPACE: "negativeverythinmathspace",
      NEGATIVETHINMATHSPACE: "negativethinmathspace",
      NEGATIVEMEDIUMMATHSPACE: "negativemediummathspace",
      NEGATIVETHICKMATHSPACE: "negativethickmathspace",
      NEGATIVEVERYTHICKMATHSPACE: "negativeverythickmathspace",
      NEGATIVEVERYVERYTHICKMATHSPACE: "negativeveryverythickmathspace"
    },
    OVERFLOW: {
      LINBREAK: "linebreak",
      SCROLL: "scroll",
      ELIDE: "elide",
      TRUNCATE: "truncate",
      SCALE: "scale"
    },
    UNIT: {
      EM: "em",
      EX: "ex",
      PX: "px",
      IN: "in",
      CM: "cm",
      MM: "mm",
      PT: "pt",
      PC: "pc"
    },
    TEXCLASS: {
      ORD: 0,
      OP: 1,
      BIN: 2,
      REL: 3,
      OPEN: 4,
      CLOSE: 5,
      PUNCT: 6,
      INNER: 7,
      VCENTER: 8,
      NONE: -1
    },
    TEXCLASSNAMES: [
      "ORD",
      "OP",
      "BIN",
      "REL",
      "OPEN",
      "CLOSE",
      "PUNCT",
      "INNER",
      "VCENTER"
    ],
    skipAttributes: { texClass: true, useHeight: true, texprimestyle: true },
    copyAttributes: {
      displaystyle: 1,
      scriptlevel: 1,
      open: 1,
      close: 1,
      form: 1,
      actiontype: 1,
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      class: 1,
      href: true,
      style: true
    },
    copyAttributeNames: [
      "displaystyle",
      "scriptlevel",
      "open",
      "close",
      "form",
      "actiontype",
      "fontfamily",
      "fontsize",
      "fontweight",
      "fontstyle",
      "color",
      "background",
      "id",
      "class",
      "href",
      "style"
    ],
    nocopyAttributes: {
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      class: true,
      href: true,
      style: true,
      xmlns: true
    },
    Error: function(d, e) {
      var c = this.merror(d),
        b = MathJax.Localization.fontDirection(),
        a = MathJax.Localization.fontFamily();
      if (e) {
        c = c.With(e);
      }
      if (b || a) {
        c = this.mstyle(c);
        if (b) {
          c.dir = b;
        }
        if (a) {
          c.style.fontFamily = "font-family: " + a;
        }
      }
      return c;
    }
  }
);
(function(a) {
  a.mbase = MathJax.Object.Subclass(
    {
      type: "base",
      isToken: false,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      },
      noInherit: {},
      noInheritAttribute: { texClass: true },
      getRemoved: {},
      linebreakContainer: false,
      Init: function() {
        this.data = [];
        if (
          this.inferRow &&
          !(arguments.length === 1 && arguments[0].inferred)
        ) {
          this.Append(a.mrow().With({ inferred: true, notParent: true }));
        }
        this.Append.apply(this, arguments);
      },
      With: function(e) {
        for (var f in e) {
          if (e.hasOwnProperty(f)) {
            this[f] = e[f];
          }
        }
        return this;
      },
      Append: function() {
        if (this.inferRow && this.data.length) {
          this.data[0].Append.apply(this.data[0], arguments);
        } else {
          for (var f = 0, e = arguments.length; f < e; f++) {
            this.SetData(this.data.length, arguments[f]);
          }
        }
      },
      SetData: function(e, f) {
        if (f != null) {
          if (!(f instanceof a.mbase)) {
            f = this.isToken || this.isChars ? a.chars(f) : a.mtext(f);
          }
          f.parent = this;
          f.setInherit(this.inheritFromMe ? this : this.inherit);
        }
        this.data[e] = f;
      },
      Parent: function() {
        var e = this.parent;
        while (e && e.notParent) {
          e = e.parent;
        }
        return e;
      },
      Get: function(f, k, l) {
        if (!l) {
          if (this[f] != null) {
            return this[f];
          }
          if (this.attr && this.attr[f] != null) {
            return this.attr[f];
          }
        }
        var g = this.Parent();
        if (g && g["adjustChild_" + f] != null) {
          return g["adjustChild_" + f](this.childPosition(), k);
        }
        var j = this.inherit;
        var e = j;
        while (j) {
          var i = j[f];
          if (i == null && j.attr) {
            i = j.attr[f];
          }
          if (j.removedStyles && j.getRemoved[f] && i == null) {
            i = j.removedStyles[j.getRemoved[f]];
          }
          if (i != null && j.noInheritAttribute && !j.noInheritAttribute[f]) {
            var h = j.noInherit[this.type];
            if (!(h && h[f])) {
              return i;
            }
          }
          e = j;
          j = j.inherit;
        }
        if (!k) {
          if (this.defaults[f] === a.AUTO) {
            return this.autoDefault(f);
          }
          if (this.defaults[f] !== a.INHERIT && this.defaults[f] != null) {
            return this.defaults[f];
          }
          if (e) {
            return e.defaults[f];
          }
        }
        return null;
      },
      hasValue: function(e) {
        return this.Get(e, true) != null;
      },
      getValues: function() {
        var f = {};
        for (var g = 0, e = arguments.length; g < e; g++) {
          f[arguments[g]] = this.Get(arguments[g]);
        }
        return f;
      },
      adjustChild_scriptlevel: function(f, e) {
        return this.Get("scriptlevel", e);
      },
      adjustChild_displaystyle: function(f, e) {
        return this.Get("displaystyle", e);
      },
      adjustChild_texprimestyle: function(f, e) {
        return this.Get("texprimestyle", e);
      },
      childPosition: function() {
        var h = this,
          g = h.parent;
        while (g.notParent) {
          h = g;
          g = h.parent;
        }
        for (var f = 0, e = g.data.length; f < e; f++) {
          if (g.data[f] === h) {
            return f;
          }
        }
        return null;
      },
      setInherit: function(g) {
        if (g !== this.inherit && this.inherit == null) {
          this.inherit = g;
          for (var f = 0, e = this.data.length; f < e; f++) {
            if (this.data[f] && this.data[f].setInherit) {
              this.data[f].setInherit(g);
            }
          }
        }
      },
      setTeXclass: function(e) {
        this.getPrevClass(e);
        return typeof this.texClass !== "undefined" ? this : e;
      },
      getPrevClass: function(e) {
        if (e) {
          this.prevClass = e.Get("texClass");
          this.prevLevel = e.Get("scriptlevel");
        }
      },
      updateTeXclass: function(e) {
        if (e) {
          this.prevClass = e.prevClass;
          delete e.prevClass;
          this.prevLevel = e.prevLevel;
          delete e.prevLevel;
          this.texClass = e.Get("texClass");
        }
      },
      texSpacing: function() {
        var f = this.prevClass != null ? this.prevClass : a.TEXCLASS.NONE;
        var e = this.Get("texClass") || a.TEXCLASS.ORD;
        if (f === a.TEXCLASS.NONE || e === a.TEXCLASS.NONE) {
          return "";
        }
        if (f === a.TEXCLASS.VCENTER) {
          f = a.TEXCLASS.ORD;
        }
        if (e === a.TEXCLASS.VCENTER) {
          e = a.TEXCLASS.ORD;
        }
        var g = this.TEXSPACE[f][e];
        if ((this.prevLevel > 0 || this.Get("scriptlevel") > 0) && g >= 0) {
          return "";
        }
        return this.TEXSPACELENGTH[Math.abs(g)];
      },
      TEXSPACELENGTH: [
        "",
        a.LENGTH.THINMATHSPACE,
        a.LENGTH.MEDIUMMATHSPACE,
        a.LENGTH.THICKMATHSPACE
      ],
      TEXSPACE: [
        [0, -1, 2, 3, 0, 0, 0, 1],
        [-1, -1, 0, 3, 0, 0, 0, 1],
        [2, 2, 0, 0, 2, 0, 0, 2],
        [3, 3, 0, 0, 3, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 2, 3, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1],
        [1, -1, 2, 3, 1, 0, 1, 1]
      ],
      autoDefault: function(e) {
        return "";
      },
      isSpacelike: function() {
        return false;
      },
      isEmbellished: function() {
        return false;
      },
      Core: function() {
        return this;
      },
      CoreMO: function() {
        return this;
      },
      childIndex: function(g) {
        if (g == null) {
          return;
        }
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (g === this.data[f]) {
            return f;
          }
        }
      },
      CoreIndex: function() {
        return (this.inferRow ? this.data[0] || this : this).childIndex(
          this.Core()
        );
      },
      hasNewline: function() {
        if (this.isEmbellished()) {
          return this.CoreMO().hasNewline();
        }
        if (this.isToken || this.linebreakContainer) {
          return false;
        }
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (this.data[f] && this.data[f].hasNewline()) {
            return true;
          }
        }
        return false;
      },
      array: function() {
        if (this.inferred) {
          return this.data;
        } else {
          return [this];
        }
      },
      toString: function() {
        return this.type + "(" + this.data.join(",") + ")";
      },
      getAnnotation: function() {
        return null;
      }
    },
    {
      childrenSpacelike: function() {
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (!this.data[f].isSpacelike()) {
            return false;
          }
        }
        return true;
      },
      childEmbellished: function() {
        return this.data[0] && this.data[0].isEmbellished();
      },
      childCore: function() {
        return this.inferRow && this.data[0]
          ? this.data[0].Core()
          : this.data[0];
      },
      childCoreMO: function() {
        return this.data[0] ? this.data[0].CoreMO() : null;
      },
      setChildTeXclass: function(e) {
        if (this.data[0]) {
          e = this.data[0].setTeXclass(e);
          this.updateTeXclass(this.data[0]);
        }
        return e;
      },
      setBaseTeXclasses: function(g) {
        this.getPrevClass(g);
        this.texClass = null;
        if (this.data[0]) {
          if (this.isEmbellished() || this.data[0].isa(a.mi)) {
            g = this.data[0].setTeXclass(g);
            this.updateTeXclass(this.Core());
          } else {
            this.data[0].setTeXclass();
            g = this;
          }
        } else {
          g = this;
        }
        for (var f = 1, e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        return g;
      },
      setSeparateTeXclasses: function(g) {
        this.getPrevClass(g);
        for (var f = 0, e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        if (this.isEmbellished()) {
          this.updateTeXclass(this.Core());
        }
        return this;
      }
    }
  );
  a.mi = a.mbase.Subclass({
    type: "mi",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.AUTO,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    },
    autoDefault: function(f) {
      if (f === "mathvariant") {
        var e = (this.data[0] || "").toString();
        return e.length === 1 ||
          (e.length === 2 &&
            e.charCodeAt(0) >= 55296 &&
            e.charCodeAt(0) < 56320)
          ? a.VARIANT.ITALIC
          : a.VARIANT.NORMAL;
      }
      return "";
    },
    setTeXclass: function(f) {
      this.getPrevClass(f);
      var e = this.data.join("");
      if (
        e.length > 1 &&
        e.match(/^[a-z][a-z0-9]*$/i) &&
        this.texClass === a.TEXCLASS.ORD
      ) {
        this.texClass = a.TEXCLASS.OP;
        this.autoOP = true;
      }
      return this;
    }
  });
  a.mn = a.mbase.Subclass({
    type: "mn",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    }
  });
  a.mo = a.mbase.Subclass({
    type: "mo",
    isToken: true,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      form: a.AUTO,
      fence: a.AUTO,
      separator: a.AUTO,
      lspace: a.AUTO,
      rspace: a.AUTO,
      stretchy: a.AUTO,
      symmetric: a.AUTO,
      maxsize: a.AUTO,
      minsize: a.AUTO,
      largeop: a.AUTO,
      movablelimits: a.AUTO,
      accent: a.AUTO,
      linebreak: a.LINEBREAK.AUTO,
      lineleading: a.INHERIT,
      linebreakstyle: a.AUTO,
      linebreakmultchar: a.INHERIT,
      indentalign: a.INHERIT,
      indentshift: a.INHERIT,
      indenttarget: a.INHERIT,
      indentalignfirst: a.INHERIT,
      indentshiftfirst: a.INHERIT,
      indentalignlast: a.INHERIT,
      indentshiftlast: a.INHERIT,
      texClass: a.AUTO
    },
    defaultDef: {
      form: a.FORM.INFIX,
      fence: false,
      separator: false,
      lspace: a.LENGTH.THICKMATHSPACE,
      rspace: a.LENGTH.THICKMATHSPACE,
      stretchy: false,
      symmetric: false,
      maxsize: a.SIZE.INFINITY,
      minsize: "0em",
      largeop: false,
      movablelimits: false,
      accent: false,
      linebreak: a.LINEBREAK.AUTO,
      lineleading: "1ex",
      linebreakstyle: "before",
      indentalign: a.INDENTALIGN.AUTO,
      indentshift: "0",
      indenttarget: "",
      indentalignfirst: a.INDENTALIGN.INDENTALIGN,
      indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
      indentalignlast: a.INDENTALIGN.INDENTALIGN,
      indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
      texClass: a.TEXCLASS.REL
    },
    SPACE_ATTR: { lspace: 1, rspace: 2, form: 4 },
    useMMLspacing: 7,
    autoDefault: function(g, n) {
      var l = this.def;
      if (!l) {
        if (g === "form") {
          this.useMMLspacing &= ~this.SPACE_ATTR.form;
          return this.getForm();
        }
        var k = this.data.join("");
        var f = [this.Get("form"), a.FORM.INFIX, a.FORM.POSTFIX, a.FORM.PREFIX];
        for (var h = 0, e = f.length; h < e; h++) {
          var j = this.OPTABLE[f[h]][k];
          if (j) {
            l = this.makeDef(j);
            break;
          }
        }
        if (!l) {
          l = this.CheckRange(k);
        }
        if (!l && n) {
          l = {};
        } else {
          if (!l) {
            l = MathJax.Hub.Insert({}, this.defaultDef);
          }
          if (this.parent) {
            this.def = l;
          } else {
            l = MathJax.Hub.Insert({}, l);
          }
          l.form = f[0];
        }
      }
      this.useMMLspacing &= ~(this.SPACE_ATTR[g] || 0);
      if (l[g] != null) {
        return l[g];
      } else {
        if (!n) {
          return this.defaultDef[g];
        }
      }
      return "";
    },
    CheckRange: function(j) {
      var k = j.charCodeAt(0);
      if (k >= 55296 && k < 56320) {
        k = ((k - 55296) << 10) + (j.charCodeAt(1) - 56320) + 65536;
      }
      for (
        var g = 0, e = this.RANGES.length;
        g < e && this.RANGES[g][0] <= k;
        g++
      ) {
        if (k <= this.RANGES[g][1]) {
          if (this.RANGES[g][3]) {
            var f = a.optableDir + "/" + this.RANGES[g][3] + ".js";
            this.RANGES[g][3] = null;
            MathJax.Hub.RestartAfter(MathJax.Ajax.Require(f));
          }
          var h = a.TEXCLASSNAMES[this.RANGES[g][2]];
          h = this.OPTABLE.infix[j] = a.mo.OPTYPES[h === "BIN" ? "BIN3" : h];
          return this.makeDef(h);
        }
      }
      return null;
    },
    makeDef: function(f) {
      if (f[2] == null) {
        f[2] = this.defaultDef.texClass;
      }
      if (!f[3]) {
        f[3] = {};
      }
      var e = MathJax.Hub.Insert({}, f[3]);
      e.lspace = this.SPACE[f[0]];
      e.rspace = this.SPACE[f[1]];
      e.texClass = f[2];
      if (
        e.texClass === a.TEXCLASS.REL &&
        (this.movablelimits || this.data.join("").match(/^[a-z]+$/i))
      ) {
        e.texClass = a.TEXCLASS.OP;
      }
      return e;
    },
    getForm: function() {
      var e = this,
        g = this.parent,
        f = this.Parent();
      while (f && f.isEmbellished()) {
        e = g;
        g = f.parent;
        f = f.Parent();
      }
      if (g && g.type === "mrow" && g.NonSpaceLength() !== 1) {
        if (g.FirstNonSpace() === e) {
          return a.FORM.PREFIX;
        }
        if (g.LastNonSpace() === e) {
          return a.FORM.POSTFIX;
        }
      }
      return a.FORM.INFIX;
    },
    isEmbellished: function() {
      return true;
    },
    hasNewline: function() {
      return this.Get("linebreak") === a.LINEBREAK.NEWLINE;
    },
    CoreParent: function() {
      var e = this;
      while (e && e.isEmbellished() && e.CoreMO() === this && !e.isa(a.math)) {
        e = e.Parent();
      }
      return e;
    },
    CoreText: function(e) {
      if (!e) {
        return "";
      }
      if (e.isEmbellished()) {
        return e.CoreMO().data.join("");
      }
      while (
        (((e.isa(a.mrow) ||
          e.isa(a.TeXAtom) ||
          e.isa(a.mstyle) ||
          e.isa(a.mphantom)) &&
          e.data.length === 1) ||
          e.isa(a.munderover)) &&
        e.data[0]
      ) {
        e = e.data[0];
      }
      if (!e.isToken) {
        return "";
      } else {
        return e.data.join("");
      }
    },
    remapChars: {
      "*": "\u2217",
      '"': "\u2033",
      "\u00B0": "\u2218",
      "\u00B2": "2",
      "\u00B3": "3",
      "\u00B4": "\u2032",
      "\u00B9": "1"
    },
    remap: function(f, e) {
      f = f.replace(/-/g, "\u2212");
      if (e) {
        f = f.replace(/'/g, "\u2032").replace(/`/g, "\u2035");
        if (f.length === 1) {
          f = e[f] || f;
        }
      }
      return f;
    },
    setTeXclass: function(f) {
      var e = this.getValues("form", "lspace", "rspace", "fence");
      if (this.useMMLspacing) {
        this.texClass = a.TEXCLASS.NONE;
        return this;
      }
      if (e.fence && !this.texClass) {
        if (e.form === a.FORM.PREFIX) {
          this.texClass = a.TEXCLASS.OPEN;
        }
        if (e.form === a.FORM.POSTFIX) {
          this.texClass = a.TEXCLASS.CLOSE;
        }
      }
      this.texClass = this.Get("texClass");
      if (this.data.join("") === "\u2061") {
        if (f) {
          f.texClass = a.TEXCLASS.OP;
          f.fnOP = true;
        }
        this.texClass = this.prevClass = a.TEXCLASS.NONE;
        return f;
      }
      return this.adjustTeXclass(f);
    },
    adjustTeXclass: function(f) {
      if (this.texClass === a.TEXCLASS.NONE) {
        return f;
      }
      if (f) {
        if (
          f.autoOP &&
          (this.texClass === a.TEXCLASS.BIN || this.texClass === a.TEXCLASS.REL)
        ) {
          f.texClass = a.TEXCLASS.ORD;
        }
        this.prevClass = f.texClass || a.TEXCLASS.ORD;
        this.prevLevel = f.Get("scriptlevel");
      } else {
        this.prevClass = a.TEXCLASS.NONE;
      }
      if (
        this.texClass === a.TEXCLASS.BIN &&
        (this.prevClass === a.TEXCLASS.NONE ||
          this.prevClass === a.TEXCLASS.BIN ||
          this.prevClass === a.TEXCLASS.OP ||
          this.prevClass === a.TEXCLASS.REL ||
          this.prevClass === a.TEXCLASS.OPEN ||
          this.prevClass === a.TEXCLASS.PUNCT)
      ) {
        this.texClass = a.TEXCLASS.ORD;
      } else {
        if (
          this.prevClass === a.TEXCLASS.BIN &&
          (this.texClass === a.TEXCLASS.REL ||
            this.texClass === a.TEXCLASS.CLOSE ||
            this.texClass === a.TEXCLASS.PUNCT)
        ) {
          f.texClass = this.prevClass = a.TEXCLASS.ORD;
        } else {
          if (this.texClass === a.TEXCLASS.BIN) {
            var g = this,
              e = this.parent;
            while (
              e &&
              e.parent &&
              e.isEmbellished() &&
              (e.data.length === 1 || (e.type !== "mrow" && e.Core() === g))
            ) {
              g = e;
              e = e.parent;
            }
            if (e.data[e.data.length - 1] === g) {
              this.texClass = a.TEXCLASS.ORD;
            }
          }
        }
      }
      return this;
    }
  });
  a.mtext = a.mbase.Subclass({
    type: "mtext",
    isToken: true,
    isSpacelike: function() {
      return true;
    },
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT
    }
  });
  a.mspace = a.mbase.Subclass({
    type: "mspace",
    isToken: true,
    isSpacelike: function() {
      return true;
    },
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      width: "0em",
      height: "0ex",
      depth: "0ex",
      linebreak: a.LINEBREAK.AUTO
    },
    hasDimAttr: function() {
      return (
        this.hasValue("width") ||
        this.hasValue("height") ||
        this.hasValue("depth")
      );
    },
    hasNewline: function() {
      return (
        !this.hasDimAttr() && this.Get("linebreak") === a.LINEBREAK.NEWLINE
      );
    }
  });
  a.ms = a.mbase.Subclass({
    type: "ms",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathvariant: a.INHERIT,
      mathsize: a.INHERIT,
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      lquote: '"',
      rquote: '"'
    }
  });
  a.mglyph = a.mbase.Subclass({
    type: "mglyph",
    isToken: true,
    texClass: a.TEXCLASS.ORD,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      alt: "",
      src: "",
      width: a.AUTO,
      height: a.AUTO,
      valign: "0em"
    }
  });
  a.mrow = a.mbase.Subclass({
    type: "mrow",
    isSpacelike: a.mbase.childrenSpacelike,
    inferred: false,
    notParent: false,
    isEmbellished: function() {
      var f = false;
      for (var g = 0, e = this.data.length; g < e; g++) {
        if (this.data[g] == null) {
          continue;
        }
        if (this.data[g].isEmbellished()) {
          if (f) {
            return false;
          }
          f = true;
          this.core = g;
        } else {
          if (!this.data[g].isSpacelike()) {
            return false;
          }
        }
      }
      return f;
    },
    NonSpaceLength: function() {
      var g = 0;
      for (var f = 0, e = this.data.length; f < e; f++) {
        if (this.data[f] && !this.data[f].isSpacelike()) {
          g++;
        }
      }
      return g;
    },
    FirstNonSpace: function() {
      for (var f = 0, e = this.data.length; f < e; f++) {
        if (this.data[f] && !this.data[f].isSpacelike()) {
          return this.data[f];
        }
      }
      return null;
    },
    LastNonSpace: function() {
      for (var e = this.data.length - 1; e >= 0; e--) {
        if (this.data[0] && !this.data[e].isSpacelike()) {
          return this.data[e];
        }
      }
      return null;
    },
    Core: function() {
      if (!this.isEmbellished() || typeof this.core === "undefined") {
        return this;
      }
      return this.data[this.core];
    },
    CoreMO: function() {
      if (!this.isEmbellished() || typeof this.core === "undefined") {
        return this;
      }
      return this.data[this.core].CoreMO();
    },
    toString: function() {
      if (this.inferred) {
        return "[" + this.data.join(",") + "]";
      }
      return this.SUPER(arguments).toString.call(this);
    },
    setTeXclass: function(g) {
      var f,
        e = this.data.length;
      if ((this.open || this.close) && (!g || !g.fnOP)) {
        this.getPrevClass(g);
        g = null;
        for (f = 0; f < e; f++) {
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (!this.hasOwnProperty("texClass")) {
          this.texClass = a.TEXCLASS.INNER;
        }
        return this;
      } else {
        for (f = 0; f < e; f++) {
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (this.data[0]) {
          this.updateTeXclass(this.data[0]);
        }
        return g;
      }
    },
    getAnnotation: function(e) {
      if (this.data.length != 1) {
        return null;
      }
      return this.data[0].getAnnotation(e);
    }
  });
  a.mfrac = a.mbase.Subclass({
    type: "mfrac",
    num: 0,
    den: 1,
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      linethickness: a.LINETHICKNESS.MEDIUM,
      numalign: a.ALIGN.CENTER,
      denomalign: a.ALIGN.CENTER,
      bevelled: false
    },
    adjustChild_displaystyle: function(e) {
      return false;
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get("scriptlevel");
      if (!this.Get("displaystyle") || e > 0) {
        e++;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e == this.den) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.msqrt = a.mbase.Subclass({
    type: "msqrt",
    inferRow: true,
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD,
    setTeXclass: a.mbase.setSeparateTeXclasses,
    adjustChild_texprimestyle: function(e) {
      return true;
    }
  });
  a.mroot = a.mbase.Subclass({
    type: "mroot",
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD,
    adjustChild_displaystyle: function(e) {
      if (e === 1) {
        return false;
      }
      return this.Get("displaystyle");
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get("scriptlevel");
      if (f === 1) {
        e += 2;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === 0) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mstyle = a.mbase.Subclass({
    type: "mstyle",
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    inferRow: true,
    defaults: {
      scriptlevel: a.INHERIT,
      displaystyle: a.INHERIT,
      scriptsizemultiplier: Math.sqrt(1 / 2),
      scriptminsize: "8pt",
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      dir: a.INHERIT,
      infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
      decimalseparator: "."
    },
    adjustChild_scriptlevel: function(g) {
      var f = this.scriptlevel;
      if (f == null) {
        f = this.Get("scriptlevel");
      } else {
        if (String(f).match(/^ *[-+]/)) {
          var e = this.Get("scriptlevel", null, true);
          f = e + parseInt(f);
        }
      }
      return f;
    },
    inheritFromMe: true,
    noInherit: {
      mpadded: {
        width: true,
        height: true,
        depth: true,
        lspace: true,
        voffset: true
      },
      mtable: { width: true, height: true, depth: true, align: true }
    },
    getRemoved: {
      fontfamily: "fontFamily",
      fontweight: "fontWeight",
      fontstyle: "fontStyle",
      fontsize: "fontSize"
    },
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.merror = a.mbase.Subclass({
    type: "merror",
    inferRow: true,
    linebreakContainer: true,
    texClass: a.TEXCLASS.ORD
  });
  a.mpadded = a.mbase.Subclass({
    type: "mpadded",
    inferRow: true,
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      width: "",
      height: "",
      depth: "",
      lspace: 0,
      voffset: 0
    },
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.mphantom = a.mbase.Subclass({
    type: "mphantom",
    texClass: a.TEXCLASS.ORD,
    inferRow: true,
    isSpacelike: a.mbase.childrenSpacelike,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    setTeXclass: a.mbase.setChildTeXclass
  });
  a.mfenced = a.mbase.Subclass({
    type: "mfenced",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      open: "(",
      close: ")",
      separators: ","
    },
    addFakeNodes: function() {
      var f = this.getValues("open", "close", "separators");
      f.open = f.open.replace(/[ \t\n\r]/g, "");
      f.close = f.close.replace(/[ \t\n\r]/g, "");
      f.separators = f.separators.replace(/[ \t\n\r]/g, "");
      if (f.open !== "") {
        this.SetData(
          "open",
          a
            .mo(f.open)
            .With({
              fence: true,
              form: a.FORM.PREFIX,
              texClass: a.TEXCLASS.OPEN
            })
        );
        this.data.open.useMMLspacing = 0;
      }
      if (f.separators !== "") {
        while (f.separators.length < this.data.length) {
          f.separators += f.separators.charAt(f.separators.length - 1);
        }
        for (var g = 1, e = this.data.length; g < e; g++) {
          if (this.data[g]) {
            this.SetData(
              "sep" + g,
              a.mo(f.separators.charAt(g - 1)).With({ separator: true })
            );
            this.data["sep" + g].useMMLspacing = 0;
          }
        }
      }
      if (f.close !== "") {
        this.SetData(
          "close",
          a
            .mo(f.close)
            .With({
              fence: true,
              form: a.FORM.POSTFIX,
              texClass: a.TEXCLASS.CLOSE
            })
        );
        this.data.close.useMMLspacing = 0;
      }
    },
    texClass: a.TEXCLASS.OPEN,
    setTeXclass: function(g) {
      this.addFakeNodes();
      this.getPrevClass(g);
      if (this.data.open) {
        g = this.data.open.setTeXclass(g);
      }
      if (this.data[0]) {
        g = this.data[0].setTeXclass(g);
      }
      for (var f = 1, e = this.data.length; f < e; f++) {
        if (this.data["sep" + f]) {
          g = this.data["sep" + f].setTeXclass(g);
        }
        if (this.data[f]) {
          g = this.data[f].setTeXclass(g);
        }
      }
      if (this.data.close) {
        g = this.data.close.setTeXclass(g);
      }
      this.updateTeXclass(this.data.open);
      this.texClass = a.TEXCLASS.INNER;
      return g;
    }
  });
  a.menclose = a.mbase.Subclass({
    type: "menclose",
    inferRow: true,
    linebreakContainer: true,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      notation: a.NOTATION.LONGDIV,
      texClass: a.TEXCLASS.ORD
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.msubsup = a.mbase.Subclass({
    type: "msubsup",
    base: 0,
    sub: 1,
    sup: 2,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      subscriptshift: "",
      superscriptshift: "",
      texClass: a.AUTO
    },
    autoDefault: function(e) {
      if (e === "texClass") {
        return this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD;
      }
      return 0;
    },
    adjustChild_displaystyle: function(e) {
      if (e > 0) {
        return false;
      }
      return this.Get("displaystyle");
    },
    adjustChild_scriptlevel: function(f) {
      var e = this.Get("scriptlevel");
      if (f > 0) {
        e++;
      }
      return e;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === this.sub) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setBaseTeXclasses
  });
  a.msub = a.msubsup.Subclass({ type: "msub" });
  a.msup = a.msubsup.Subclass({ type: "msup", sub: 2, sup: 1 });
  a.mmultiscripts = a.msubsup.Subclass({
    type: "mmultiscripts",
    adjustChild_texprimestyle: function(e) {
      if (e % 2 === 1) {
        return true;
      }
      return this.Get("texprimestyle");
    }
  });
  a.mprescripts = a.mbase.Subclass({ type: "mprescripts" });
  a.none = a.mbase.Subclass({ type: "none" });
  a.munderover = a.mbase.Subclass({
    type: "munderover",
    base: 0,
    under: 1,
    over: 2,
    sub: 1,
    sup: 2,
    ACCENTS: ["", "accentunder", "accent"],
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      accent: a.AUTO,
      accentunder: a.AUTO,
      align: a.ALIGN.CENTER,
      texClass: a.AUTO,
      subscriptshift: "",
      superscriptshift: ""
    },
    autoDefault: function(e) {
      if (e === "texClass") {
        return this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD;
      }
      if (e === "accent" && this.data[this.over]) {
        return this.data[this.over].CoreMO().Get("accent");
      }
      if (e === "accentunder" && this.data[this.under]) {
        return this.data[this.under].CoreMO().Get("accent");
      }
      return false;
    },
    adjustChild_displaystyle: function(e) {
      if (e > 0) {
        return false;
      }
      return this.Get("displaystyle");
    },
    adjustChild_scriptlevel: function(g) {
      var f = this.Get("scriptlevel");
      var e =
        this.data[this.base] &&
        !this.Get("displaystyle") &&
        this.data[this.base].CoreMO().Get("movablelimits");
      if (g == this.under && (e || !this.Get("accentunder"))) {
        f++;
      }
      if (g == this.over && (e || !this.Get("accent"))) {
        f++;
      }
      return f;
    },
    adjustChild_texprimestyle: function(e) {
      if (e === this.base && this.data[this.over]) {
        return true;
      }
      return this.Get("texprimestyle");
    },
    setTeXclass: a.mbase.setBaseTeXclasses
  });
  a.munder = a.munderover.Subclass({ type: "munder" });
  a.mover = a.munderover.Subclass({
    type: "mover",
    over: 1,
    under: 2,
    sup: 1,
    sub: 2,
    ACCENTS: ["", "accent", "accentunder"]
  });
  a.mtable = a.mbase.Subclass({
    type: "mtable",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      align: a.ALIGN.AXIS,
      rowalign: a.ALIGN.BASELINE,
      columnalign: a.ALIGN.CENTER,
      groupalign: "{left}",
      alignmentscope: true,
      columnwidth: a.WIDTH.AUTO,
      width: a.WIDTH.AUTO,
      rowspacing: "1ex",
      columnspacing: ".8em",
      rowlines: a.LINES.NONE,
      columnlines: a.LINES.NONE,
      frame: a.LINES.NONE,
      framespacing: "0.4em 0.5ex",
      equalrows: false,
      equalcolumns: false,
      displaystyle: false,
      side: a.SIDE.RIGHT,
      minlabelspacing: "0.8em",
      texClass: a.TEXCLASS.ORD,
      useHeight: 1
    },
    adjustChild_displaystyle: function() {
      return this.displaystyle != null
        ? this.displaystyle
        : this.defaults.displaystyle;
    },
    inheritFromMe: true,
    noInherit: {
      mover: { align: true },
      munder: { align: true },
      munderover: { align: true },
      mtable: {
        align: true,
        rowalign: true,
        columnalign: true,
        groupalign: true,
        alignmentscope: true,
        columnwidth: true,
        width: true,
        rowspacing: true,
        columnspacing: true,
        rowlines: true,
        columnlines: true,
        frame: true,
        framespacing: true,
        equalrows: true,
        equalcolumns: true,
        displaystyle: true,
        side: true,
        minlabelspacing: true,
        texClass: true,
        useHeight: 1
      }
    },
    linebreakContainer: true,
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        if (
          !(
            arguments[f] instanceof a.mtr ||
            arguments[f] instanceof a.mlabeledtr
          )
        ) {
          arguments[f] = a.mtr(arguments[f]);
        }
      }
      this.SUPER(arguments).Append.apply(this, arguments);
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mtr = a.mbase.Subclass({
    type: "mtr",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      rowalign: a.INHERIT,
      columnalign: a.INHERIT,
      groupalign: a.INHERIT
    },
    inheritFromMe: true,
    noInherit: {
      mrow: { rowalign: true, columnalign: true, groupalign: true },
      mtable: { rowalign: true, columnalign: true, groupalign: true }
    },
    linebreakContainer: true,
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        if (!(arguments[f] instanceof a.mtd)) {
          arguments[f] = a.mtd(arguments[f]);
        }
      }
      this.SUPER(arguments).Append.apply(this, arguments);
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.mtd = a.mbase.Subclass({
    type: "mtd",
    inferRow: true,
    linebreakContainer: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      rowspan: 1,
      columnspan: 1,
      rowalign: a.INHERIT,
      columnalign: a.INHERIT,
      groupalign: a.INHERIT
    },
    setTeXclass: a.mbase.setSeparateTeXclasses
  });
  a.maligngroup = a.mbase.Subclass({
    type: "maligngroup",
    isSpacelike: function() {
      return true;
    },
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      groupalign: a.INHERIT
    },
    inheritFromMe: true,
    noInherit: { mrow: { groupalign: true }, mtable: { groupalign: true } }
  });
  a.malignmark = a.mbase.Subclass({
    type: "malignmark",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      edge: a.SIDE.LEFT
    },
    isSpacelike: function() {
      return true;
    }
  });
  a.mlabeledtr = a.mtr.Subclass({ type: "mlabeledtr" });
  a.maction = a.mbase.Subclass({
    type: "maction",
    defaults: {
      mathbackground: a.INHERIT,
      mathcolor: a.INHERIT,
      actiontype: a.ACTIONTYPE.TOGGLE,
      selection: 1
    },
    selected: function() {
      return this.data[this.Get("selection") - 1] || a.NULL;
    },
    isEmbellished: function() {
      return this.selected().isEmbellished();
    },
    isSpacelike: function() {
      return this.selected().isSpacelike();
    },
    Core: function() {
      return this.selected().Core();
    },
    CoreMO: function() {
      return this.selected().CoreMO();
    },
    setTeXclass: function(f) {
      if (this.Get("actiontype") === a.ACTIONTYPE.TOOLTIP && this.data[1]) {
        this.data[1].setTeXclass();
      }
      var e = this.selected();
      f = e.setTeXclass(f);
      this.updateTeXclass(e);
      return f;
    }
  });
  a.semantics = a.mbase.Subclass({
    type: "semantics",
    notParent: true,
    isEmbellished: a.mbase.childEmbellished,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    defaults: { definitionURL: null, encoding: null },
    setTeXclass: a.mbase.setChildTeXclass,
    getAnnotation: function(g) {
      var l = MathJax.Hub.config.MathMenu.semanticsAnnotations[g];
      if (l) {
        for (var h = 0, e = this.data.length; h < e; h++) {
          var k = this.data[h].Get("encoding");
          if (k) {
            for (var f = 0, o = l.length; f < o; f++) {
              if (l[f] === k) {
                return this.data[h];
              }
            }
          }
        }
      }
      return null;
    }
  });
  a.annotation = a.mbase.Subclass({
    type: "annotation",
    isChars: true,
    linebreakContainer: true,
    defaults: {
      definitionURL: null,
      encoding: null,
      cd: "mathmlkeys",
      name: "",
      src: null
    }
  });
  a["annotation-xml"] = a.mbase.Subclass({
    type: "annotation-xml",
    linebreakContainer: true,
    defaults: {
      definitionURL: null,
      encoding: null,
      cd: "mathmlkeys",
      name: "",
      src: null
    }
  });
  a.math = a.mstyle.Subclass({
    type: "math",
    defaults: {
      mathvariant: a.VARIANT.NORMAL,
      mathsize: a.SIZE.NORMAL,
      mathcolor: "",
      mathbackground: a.COLOR.TRANSPARENT,
      dir: "ltr",
      scriptlevel: 0,
      displaystyle: a.AUTO,
      display: "inline",
      maxwidth: "",
      overflow: a.OVERFLOW.LINEBREAK,
      altimg: "",
      "altimg-width": "",
      "altimg-height": "",
      "altimg-valign": "",
      alttext: "",
      cdgroup: "",
      scriptsizemultiplier: Math.sqrt(1 / 2),
      scriptminsize: "8px",
      infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
      lineleading: "1ex",
      indentshift: "auto",
      indentalign: a.INDENTALIGN.AUTO,
      indentalignfirst: a.INDENTALIGN.INDENTALIGN,
      indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
      indentalignlast: a.INDENTALIGN.INDENTALIGN,
      indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
      decimalseparator: ".",
      texprimestyle: false
    },
    autoDefault: function(e) {
      if (e === "displaystyle") {
        return this.Get("display") === "block";
      }
      return "";
    },
    linebreakContainer: true,
    setTeXclass: a.mbase.setChildTeXclass,
    getAnnotation: function(e) {
      if (this.data.length != 1) {
        return null;
      }
      return this.data[0].getAnnotation(e);
    }
  });
  a.chars = a.mbase.Subclass({
    type: "chars",
    Append: function() {
      this.data.push.apply(this.data, arguments);
    },
    value: function() {
      return this.data.join("");
    },
    toString: function() {
      return this.data.join("");
    }
  });
  a.entity = a.mbase.Subclass({
    type: "entity",
    Append: function() {
      this.data.push.apply(this.data, arguments);
    },
    value: function() {
      if (this.data[0].substr(0, 2) === "#x") {
        return parseInt(this.data[0].substr(2), 16);
      } else {
        if (this.data[0].substr(0, 1) === "#") {
          return parseInt(this.data[0].substr(1));
        } else {
          return 0;
        }
      }
    },
    toString: function() {
      var e = this.value();
      if (e <= 65535) {
        return String.fromCharCode(e);
      }
      e -= 65536;
      return (
        String.fromCharCode((e >> 10) + 55296) +
        String.fromCharCode((e & 1023) + 56320)
      );
    }
  });
  a.xml = a.mbase.Subclass({
    type: "xml",
    Init: function() {
      this.div = document.createElement("div");
      return this.SUPER(arguments).Init.apply(this, arguments);
    },
    Append: function() {
      for (var f = 0, e = arguments.length; f < e; f++) {
        var g = this.Import(arguments[f]);
        this.data.push(g);
        this.div.appendChild(g);
      }
    },
    Import: function(j) {
      if (document.importNode) {
        return document.importNode(j, true);
      }
      var f, g, e;
      if (j.nodeType === 1) {
        f = document.createElement(j.nodeName);
        for (g = 0, e = j.attributes.length; g < e; g++) {
          var h = j.attributes[g];
          if (h.specified && h.nodeValue != null && h.nodeValue != "") {
            f.setAttribute(h.nodeName, h.nodeValue);
          }
          if (h.nodeName === "style") {
            f.style.cssText = h.nodeValue;
          }
        }
        if (j.className) {
          f.className = j.className;
        }
      } else {
        if (j.nodeType === 3 || j.nodeType === 4) {
          f = document.createTextNode(j.nodeValue);
        } else {
          if (j.nodeType === 8) {
            f = document.createComment(j.nodeValue);
          } else {
            return document.createTextNode("");
          }
        }
      }
      for (g = 0, e = j.childNodes.length; g < e; g++) {
        f.appendChild(this.Import(j.childNodes[g]));
      }
      return f;
    },
    value: function() {
      return this.div;
    },
    toString: function() {
      return this.div.innerHTML;
    }
  });
  a.TeXAtom = a.mbase.Subclass({
    type: "texatom",
    linebreakContainer: true,
    inferRow: true,
    notParent: true,
    texClass: a.TEXCLASS.ORD,
    Core: a.mbase.childCore,
    CoreMO: a.mbase.childCoreMO,
    isEmbellished: a.mbase.childEmbellished,
    setTeXclass: function(e) {
      this.data[0].setTeXclass();
      return this.adjustTeXclass(e);
    },
    adjustTeXclass: a.mo.prototype.adjustTeXclass
  });
  a.NULL = a.mbase().With({ type: "null" });
  var b = a.TEXCLASS;
  var d = {
    ORD: [0, 0, b.ORD],
    ORD11: [1, 1, b.ORD],
    ORD21: [2, 1, b.ORD],
    ORD02: [0, 2, b.ORD],
    ORD55: [5, 5, b.ORD],
    OP: [1, 2, b.OP, { largeop: true, movablelimits: true, symmetric: true }],
    OPFIXED: [1, 2, b.OP, { largeop: true, movablelimits: true }],
    INTEGRAL: [0, 1, b.OP, { largeop: true, symmetric: true }],
    INTEGRAL2: [1, 2, b.OP, { largeop: true, symmetric: true }],
    BIN3: [3, 3, b.BIN],
    BIN4: [4, 4, b.BIN],
    BIN01: [0, 1, b.BIN],
    BIN5: [5, 5, b.BIN],
    TALLBIN: [4, 4, b.BIN, { stretchy: true }],
    BINOP: [4, 4, b.BIN, { largeop: true, movablelimits: true }],
    REL: [5, 5, b.REL],
    REL1: [1, 1, b.REL, { stretchy: true }],
    REL4: [4, 4, b.REL],
    RELSTRETCH: [5, 5, b.REL, { stretchy: true }],
    RELACCENT: [5, 5, b.REL, { accent: true }],
    WIDEREL: [5, 5, b.REL, { accent: true, stretchy: true }],
    OPEN: [0, 0, b.OPEN, { fence: true, stretchy: true, symmetric: true }],
    CLOSE: [0, 0, b.CLOSE, { fence: true, stretchy: true, symmetric: true }],
    INNER: [0, 0, b.INNER],
    PUNCT: [0, 3, b.PUNCT],
    ACCENT: [0, 0, b.ORD, { accent: true }],
    WIDEACCENT: [0, 0, b.ORD, { accent: true, stretchy: true }]
  };
  a.mo.Augment(
    {
      SPACE: [
        "0em",
        "0.1111em",
        "0.1667em",
        "0.2222em",
        "0.2667em",
        "0.3333em"
      ],
      RANGES: [
        [32, 127, b.REL, "BasicLatin"],
        [160, 255, b.ORD, "Latin1Supplement"],
        [256, 383, b.ORD],
        [384, 591, b.ORD],
        [688, 767, b.ORD, "SpacingModLetters"],
        [768, 879, b.ORD, "CombDiacritMarks"],
        [880, 1023, b.ORD, "GreekAndCoptic"],
        [7680, 7935, b.ORD],
        [8192, 8303, b.PUNCT, "GeneralPunctuation"],
        [8304, 8351, b.ORD],
        [8352, 8399, b.ORD],
        [8400, 8447, b.ORD, "CombDiactForSymbols"],
        [8448, 8527, b.ORD, "LetterlikeSymbols"],
        [8528, 8591, b.ORD],
        [8592, 8703, b.REL, "Arrows"],
        [8704, 8959, b.BIN, "MathOperators"],
        [8960, 9215, b.ORD, "MiscTechnical"],
        [9312, 9471, b.ORD],
        [9472, 9631, b.ORD],
        [9632, 9727, b.ORD, "GeometricShapes"],
        [9984, 10175, b.ORD, "Dingbats"],
        [10176, 10223, b.ORD, "MiscMathSymbolsA"],
        [10224, 10239, b.REL, "SupplementalArrowsA"],
        [10496, 10623, b.REL, "SupplementalArrowsB"],
        [10624, 10751, b.ORD, "MiscMathSymbolsB"],
        [10752, 11007, b.BIN, "SuppMathOperators"],
        [11008, 11263, b.ORD, "MiscSymbolsAndArrows"],
        [119808, 120831, b.ORD]
      ],
      OPTABLE: {
        prefix: {
          "\u2200": d.ORD21,
          "\u2202": d.ORD21,
          "\u2203": d.ORD21,
          "\u2207": d.ORD21,
          "\u220F": d.OP,
          "\u2210": d.OP,
          "\u2211": d.OP,
          "\u2212": d.BIN01,
          "\u2213": d.BIN01,
          "\u221A": [1, 1, b.ORD, { stretchy: true }],
          "\u2220": d.ORD,
          "\u222B": d.INTEGRAL,
          "\u222E": d.INTEGRAL,
          "\u22C0": d.OP,
          "\u22C1": d.OP,
          "\u22C2": d.OP,
          "\u22C3": d.OP,
          "\u2308": d.OPEN,
          "\u230A": d.OPEN,
          "\u27E8": d.OPEN,
          "\u27EE": d.OPEN,
          "\u2A00": d.OP,
          "\u2A01": d.OP,
          "\u2A02": d.OP,
          "\u2A04": d.OP,
          "\u2A06": d.OP,
          "\u00AC": d.ORD21,
          "\u00B1": d.BIN01,
          "(": d.OPEN,
          "+": d.BIN01,
          "-": d.BIN01,
          "[": d.OPEN,
          "{": d.OPEN,
          "|": d.OPEN
        },
        postfix: {
          "!": [1, 0, b.CLOSE],
          "&": d.ORD,
          "\u2032": d.ORD02,
          "\u203E": d.WIDEACCENT,
          "\u2309": d.CLOSE,
          "\u230B": d.CLOSE,
          "\u23DE": d.WIDEACCENT,
          "\u23DF": d.WIDEACCENT,
          "\u266D": d.ORD02,
          "\u266E": d.ORD02,
          "\u266F": d.ORD02,
          "\u27E9": d.CLOSE,
          "\u27EF": d.CLOSE,
          ˆ: d.WIDEACCENT,
          ˇ: d.WIDEACCENT,
          ˉ: d.WIDEACCENT,
          ˊ: d.ACCENT,
          ˋ: d.ACCENT,
          "\u02D8": d.ACCENT,
          "\u02D9": d.ACCENT,
          "\u02DC": d.WIDEACCENT,
          "\u0302": d.WIDEACCENT,
          "\u00A8": d.ACCENT,
          "\u00AF": d.WIDEACCENT,
          ")": d.CLOSE,
          "]": d.CLOSE,
          "^": d.WIDEACCENT,
          _: d.WIDEACCENT,
          "`": d.ACCENT,
          "|": d.CLOSE,
          "}": d.CLOSE,
          "~": d.WIDEACCENT
        },
        infix: {
          "": d.ORD,
          "%": [3, 3, b.ORD],
          "\u2022": d.BIN4,
          "\u2026": d.INNER,
          "\u2044": d.TALLBIN,
          "\u2061": d.ORD,
          "\u2062": d.ORD,
          "\u2063": [0, 0, b.ORD, { linebreakstyle: "after", separator: true }],
          "\u2064": d.ORD,
          "\u2190": d.WIDEREL,
          "\u2191": d.RELSTRETCH,
          "\u2192": d.WIDEREL,
          "\u2193": d.RELSTRETCH,
          "\u2194": d.WIDEREL,
          "\u2195": d.RELSTRETCH,
          "\u2196": d.RELSTRETCH,
          "\u2197": d.RELSTRETCH,
          "\u2198": d.RELSTRETCH,
          "\u2199": d.RELSTRETCH,
          "\u21A6": d.WIDEREL,
          "\u21A9": d.WIDEREL,
          "\u21AA": d.WIDEREL,
          "\u21BC": d.WIDEREL,
          "\u21BD": d.WIDEREL,
          "\u21C0": d.WIDEREL,
          "\u21C1": d.WIDEREL,
          "\u21CC": d.WIDEREL,
          "\u21D0": d.WIDEREL,
          "\u21D1": d.RELSTRETCH,
          "\u21D2": d.WIDEREL,
          "\u21D3": d.RELSTRETCH,
          "\u21D4": d.WIDEREL,
          "\u21D5": d.RELSTRETCH,
          "\u2208": d.REL,
          "\u2209": d.REL,
          "\u220B": d.REL,
          "\u2212": d.BIN4,
          "\u2213": d.BIN4,
          "\u2215": d.TALLBIN,
          "\u2216": d.BIN4,
          "\u2217": d.BIN4,
          "\u2218": d.BIN4,
          "\u2219": d.BIN4,
          "\u221D": d.REL,
          "\u2223": d.REL,
          "\u2225": d.REL,
          "\u2227": d.BIN4,
          "\u2228": d.BIN4,
          "\u2229": d.BIN4,
          "\u222A": d.BIN4,
          "\u223C": d.REL,
          "\u2240": d.BIN4,
          "\u2243": d.REL,
          "\u2245": d.REL,
          "\u2248": d.REL,
          "\u224D": d.REL,
          "\u2250": d.REL,
          "\u2260": d.REL,
          "\u2261": d.REL,
          "\u2264": d.REL,
          "\u2265": d.REL,
          "\u226A": d.REL,
          "\u226B": d.REL,
          "\u227A": d.REL,
          "\u227B": d.REL,
          "\u2282": d.REL,
          "\u2283": d.REL,
          "\u2286": d.REL,
          "\u2287": d.REL,
          "\u228E": d.BIN4,
          "\u2291": d.REL,
          "\u2292": d.REL,
          "\u2293": d.BIN4,
          "\u2294": d.BIN4,
          "\u2295": d.BIN4,
          "\u2296": d.BIN4,
          "\u2297": d.BIN4,
          "\u2298": d.BIN4,
          "\u2299": d.BIN4,
          "\u22A2": d.REL,
          "\u22A3": d.REL,
          "\u22A4": d.ORD55,
          "\u22A5": d.REL,
          "\u22A8": d.REL,
          "\u22C4": d.BIN4,
          "\u22C5": d.BIN4,
          "\u22C6": d.BIN4,
          "\u22C8": d.REL,
          "\u22EE": d.ORD55,
          "\u22EF": d.INNER,
          "\u22F1": [5, 5, b.INNER],
          "\u25B3": d.BIN4,
          "\u25B5": d.BIN4,
          "\u25B9": d.BIN4,
          "\u25BD": d.BIN4,
          "\u25BF": d.BIN4,
          "\u25C3": d.BIN4,
          "\u2758": d.REL,
          "\u27F5": d.WIDEREL,
          "\u27F6": d.WIDEREL,
          "\u27F7": d.WIDEREL,
          "\u27F8": d.WIDEREL,
          "\u27F9": d.WIDEREL,
          "\u27FA": d.WIDEREL,
          "\u27FC": d.WIDEREL,
          "\u2A2F": d.BIN4,
          "\u2A3F": d.BIN4,
          "\u2AAF": d.REL,
          "\u2AB0": d.REL,
          "\u00B1": d.BIN4,
          "\u00B7": d.BIN4,
          "\u00D7": d.BIN4,
          "\u00F7": d.BIN4,
          "*": d.BIN3,
          "+": d.BIN4,
          ",": [0, 3, b.PUNCT, { linebreakstyle: "after", separator: true }],
          "-": d.BIN4,
          ".": [3, 3, b.ORD],
          "/": d.ORD11,
          ":": [1, 2, b.REL],
          ";": [0, 3, b.PUNCT, { linebreakstyle: "after", separator: true }],
          "<": d.REL,
          "=": d.REL,
          ">": d.REL,
          "?": [1, 1, b.CLOSE],
          "\\": d.ORD,
          "^": d.ORD11,
          _: d.ORD11,
          "|": [2, 2, b.ORD, { fence: true, stretchy: true, symmetric: true }],
          "#": d.ORD,
          $: d.ORD,
          "\u002E": [0, 3, b.PUNCT, { separator: true }],
          ʹ: d.ORD,
          "\u0300": d.ACCENT,
          "\u0301": d.ACCENT,
          "\u0303": d.WIDEACCENT,
          "\u0304": d.ACCENT,
          "\u0306": d.ACCENT,
          "\u0307": d.ACCENT,
          "\u0308": d.ACCENT,
          "\u030C": d.ACCENT,
          "\u0332": d.WIDEACCENT,
          "\u0338": d.REL4,
          "\u2015": [0, 0, b.ORD, { stretchy: true }],
          "\u2017": [0, 0, b.ORD, { stretchy: true }],
          "\u2020": d.BIN3,
          "\u2021": d.BIN3,
          "\u20D7": d.ACCENT,
          ℑ: d.ORD,
          ℓ: d.ORD,
          "\u2118": d.ORD,
          ℜ: d.ORD,
          "\u2205": d.ORD,
          "\u221E": d.ORD,
          "\u2305": d.BIN3,
          "\u2306": d.BIN3,
          "\u2322": d.REL4,
          "\u2323": d.REL4,
          "\u2329": d.OPEN,
          "\u232A": d.CLOSE,
          "\u23AA": d.ORD,
          "\u23AF": [0, 0, b.ORD, { stretchy: true }],
          "\u23B0": d.OPEN,
          "\u23B1": d.CLOSE,
          "\u2500": d.ORD,
          "\u25EF": d.BIN3,
          "\u2660": d.ORD,
          "\u2661": d.ORD,
          "\u2662": d.ORD,
          "\u2663": d.ORD,
          "\u3008": d.OPEN,
          "\u3009": d.CLOSE,
          "\uFE37": d.WIDEACCENT,
          "\uFE38": d.WIDEACCENT
        }
      }
    },
    { OPTYPES: d }
  );
  var c = a.mo.prototype.OPTABLE;
  c.infix["^"] = d.WIDEREL;
  c.infix._ = d.WIDEREL;
  c.prefix["\u2223"] = d.OPEN;
  c.prefix["\u2225"] = d.OPEN;
  c.postfix["\u2223"] = d.CLOSE;
  c.postfix["\u2225"] = d.CLOSE;
})(MathJax.ElementJax.mml);
MathJax.ElementJax.mml.loadComplete("jax.js");
MathJax.Hub.Register.LoadHook("[MathJax]/jax/element/mml/jax.js", function() {
  var c = "2.7.1";
  var a = MathJax.ElementJax.mml,
    b = MathJax.Hub.config.menuSettings;
  a.mbase.Augment({
    toMathML: function(l) {
      var h = this.inferred && this.parent.inferRow;
      if (l == null) {
        l = "";
      }
      var f = this.type,
        e = this.toMathMLattributes();
      if (f === "mspace") {
        return l + "<" + f + e + " />";
      }
      var k = [],
        j = this.isToken ? "" : l + (h ? "" : "  ");
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          k.push(this.data[g].toMathML(j));
        } else {
          if (!this.isToken && !this.isChars) {
            k.push(j + "<mrow />");
          }
        }
      }
      if (this.isToken || this.isChars) {
        return l + "<" + f + e + ">" + k.join("") + "</" + f + ">";
      }
      if (h) {
        return k.join("\n");
      }
      if (k.length === 0 || (k.length === 1 && k[0] === "")) {
        return l + "<" + f + e + " />";
      }
      return l + "<" + f + e + ">\n" + k.join("\n") + "\n" + l + "</" + f + ">";
    },
    toMathMLattributes: function() {
      var j =
        this.type === "mstyle" ? a.math.prototype.defaults : this.defaults;
      var h = this.attrNames || a.copyAttributeNames,
        g = a.skipAttributes,
        l = a.copyAttributes;
      var e = [];
      if (this.type === "math" && (!this.attr || !this.attr.xmlns)) {
        e.push('xmlns="http://www.w3.org/1998/Math/MathML"');
      }
      if (!this.attrNames) {
        for (var k in j) {
          if (!g[k] && !l[k] && j.hasOwnProperty(k)) {
            if (this[k] != null && this[k] !== j[k]) {
              if (this.Get(k, null, 1) !== this[k]) {
                e.push(k + '="' + this.toMathMLattribute(this[k]) + '"');
              }
            }
          }
        }
      }
      for (var f = 0, d = h.length; f < d; f++) {
        if (l[h[f]] === 1 && !j.hasOwnProperty(h[f])) {
          continue;
        }
        value = (this.attr || {})[h[f]];
        if (value == null) {
          value = this[h[f]];
        }
        if (value != null) {
          e.push(h[f] + '="' + this.toMathMLquote(value) + '"');
        }
      }
      this.toMathMLclass(e);
      if (e.length) {
        return " " + e.join(" ");
      } else {
        return "";
      }
    },
    toMathMLclass: function(d) {
      var f = [];
      if (this["class"]) {
        f.push(this["class"]);
      }
      if (this.isa(a.TeXAtom) && b.texHints) {
        var e = [
          "ORD",
          "OP",
          "BIN",
          "REL",
          "OPEN",
          "CLOSE",
          "PUNCT",
          "INNER",
          "VCENTER"
        ][this.texClass];
        if (e) {
          f.push("MJX-TeXAtom-" + e);
          if (e === "OP" && !this.movablelimits) {
            f.push("MJX-fixedlimits");
          }
        }
      }
      if (this.mathvariant && this.toMathMLvariants[this.mathvariant]) {
        f.push("MJX" + this.mathvariant);
      }
      if (this.variantForm) {
        f.push("MJX-variant");
      }
      if (f.length) {
        d.unshift('class="' + f.join(" ") + '"');
      }
    },
    toMathMLattribute: function(d) {
      if (
        typeof d === "string" &&
        d.replace(/ /g, "").match(/^(([-+])?(\d+(\.\d*)?|\.\d+))mu$/)
      ) {
        return (
          (RegExp.$2 || "") +
          ((1 / 18) * RegExp.$3).toFixed(3).replace(/\.?0+$/, "") +
          "em"
        );
      } else {
        if (this.toMathMLvariants[d]) {
          return this.toMathMLvariants[d];
        }
      }
      return this.toMathMLquote(d);
    },
    toMathMLvariants: {
      "-tex-caligraphic": a.VARIANT.SCRIPT,
      "-tex-caligraphic-bold": a.VARIANT.BOLDSCRIPT,
      "-tex-oldstyle": a.VARIANT.NORMAL,
      "-tex-oldstyle-bold": a.VARIANT.BOLD,
      "-tex-mathit": a.VARIANT.ITALIC
    },
    toMathMLquote: function(f) {
      f = String(f).split("");
      for (var g = 0, d = f.length; g < d; g++) {
        var k = f[g].charCodeAt(0);
        if (k <= 55295 || 57344 <= k) {
          if (k > 126 || (k < 32 && k !== 10 && k !== 13 && k !== 9)) {
            f[g] = "&#x" + k.toString(16).toUpperCase() + ";";
          } else {
            var j = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[
              f[g]
            ];
            if (j) {
              f[g] = j;
            }
          }
        } else {
          if (g + 1 < d) {
            var h = f[g + 1].charCodeAt(0);
            var e = ((k - 55296) << 10) + (h - 56320) + 65536;
            f[g] = "&#x" + e.toString(16).toUpperCase() + ";";
            f[g + 1] = "";
            g++;
          } else {
            f[g] = "";
          }
        }
      }
      return f.join("");
    }
  });
  a.math.Augment({
    toMathML: function(d, e) {
      var g;
      if (d == null) {
        d = "";
      }
      if (e && e.originalText && b.semantics) {
        g = MathJax.InputJax[e.inputJax].annotationEncoding;
      }
      var n = this.data[0] && this.data[0].data.length > 1;
      var p = this.type,
        k = this.toMathMLattributes();
      var j = [],
        o = d + (g ? "  " + (n ? "  " : "") : "") + "  ";
      for (var h = 0, f = this.data.length; h < f; h++) {
        if (this.data[h]) {
          j.push(this.data[h].toMathML(o));
        } else {
          j.push(o + "<mrow />");
        }
      }
      if (j.length === 0 || (j.length === 1 && j[0] === "")) {
        if (!g) {
          return "<" + p + k + " />";
        }
        j.push(o + "<mrow />");
      }
      if (g) {
        if (n) {
          j.unshift(d + "    <mrow>");
          j.push(d + "    </mrow>");
        }
        j.unshift(d + "  <semantics>");
        var l = e.originalText.replace(/[&<>]/g, function(i) {
          return { ">": "&gt;", "<": "&lt;", "&": "&amp;" }[i];
        });
        j.push(
          d + '    <annotation encoding="' + g + '">' + l + "</annotation>"
        );
        j.push(d + "  </semantics>");
      }
      return d + "<" + p + k + ">\n" + j.join("\n") + "\n" + d + "</" + p + ">";
    }
  });
  a.msubsup.Augment({
    toMathML: function(j) {
      var f = this.type;
      if (this.data[this.sup] == null) {
        f = "msub";
      }
      if (this.data[this.sub] == null) {
        f = "msup";
      }
      var e = this.toMathMLattributes();
      delete this.data[0].inferred;
      var h = [];
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          h.push(this.data[g].toMathML(j + "  "));
        }
      }
      return j + "<" + f + e + ">\n" + h.join("\n") + "\n" + j + "</" + f + ">";
    }
  });
  a.munderover.Augment({
    toMathML: function(k) {
      var f = this.type;
      var j = this.data[this.base];
      if (j && j.isa(a.TeXAtom) && j.movablelimits && !j.Get("displaystyle")) {
        type = "msubsup";
        if (this.data[this.under] == null) {
          f = "msup";
        }
        if (this.data[this.over] == null) {
          f = "msub";
        }
      } else {
        if (this.data[this.under] == null) {
          f = "mover";
        }
        if (this.data[this.over] == null) {
          f = "munder";
        }
      }
      var e = this.toMathMLattributes();
      delete this.data[0].inferred;
      var h = [];
      for (var g = 0, d = this.data.length; g < d; g++) {
        if (this.data[g]) {
          h.push(this.data[g].toMathML(k + "  "));
        }
      }
      return k + "<" + f + e + ">\n" + h.join("\n") + "\n" + k + "</" + f + ">";
    }
  });
  a.TeXAtom.Augment({
    toMathML: function(e) {
      var d = this.toMathMLattributes();
      if (!d && this.data[0].data.length === 1) {
        return e.substr(2) + this.data[0].toMathML(e);
      }
      return (
        e +
        "<mrow" +
        d +
        ">\n" +
        this.data[0].toMathML(e + "  ") +
        "\n" +
        e +
        "</mrow>"
      );
    }
  });
  a.chars.Augment({
    toMathML: function(d) {
      return (d || "") + this.toMathMLquote(this.toString());
    }
  });
  a.entity.Augment({
    toMathML: function(d) {
      return (
        (d || "") + "&" + this.data[0] + ";<!-- " + this.toString() + " -->"
      );
    }
  });
  a.xml.Augment({
    toMathML: function(d) {
      return (d || "") + this.toString();
    }
  });
  MathJax.Hub.Register.StartupHook("TeX mathchoice Ready", function() {
    a.TeXmathchoice.Augment({
      toMathML: function(d) {
        return this.Core().toMathML(d);
      }
    });
  });
  MathJax.Hub.Startup.signal.Post("toMathML Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/toMathML.js");
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
(function(b, g, f) {
  var c = b.config.menuSettings;
  var e = MathJax.OutputJax;
  var a = f.isMSIE && (document.documentMode || 0) < 8;
  var d = (MathJax.Extension["fast-preview"] = {
    version: "2.7.1",
    enabled: true,
    config: b.CombineConfig("fast-preview", {
      Chunks: { EqnChunk: 10000, EqnChunkFactor: 1, EqnChunkDelay: 0 },
      color: "inherit!important",
      updateTime: 30,
      updateDelay: 6,
      messageStyle: "none",
      disabled: f.isMSIE && !f.versionAtLeast("8.0")
    }),
    Config: function() {
      if (b.config["CHTML-preview"]) {
        MathJax.Hub.Config({ "fast-preview": b.config["CHTML-preview"] });
      }
      var m, j, k, h, l;
      var i = this.config;
      if (!i.disabled && c.FastPreview == null) {
        b.Config({ menuSettings: { FastPreview: true } });
      }
      if (c.FastPreview) {
        MathJax.Ajax.Styles({
          ".MathJax_Preview .MJXf-math": { color: i.color }
        });
        b.Config({ "HTML-CSS": i.Chunks, CommonHTML: i.Chunks, SVG: i.Chunks });
      }
      b.Register.MessageHook("Begin Math Output", function() {
        if (!h && d.Active()) {
          m = b.processUpdateTime;
          j = b.processUpdateDelay;
          k = b.config.messageStyle;
          b.processUpdateTime = i.updateTime;
          b.processUpdateDelay = i.updateDelay;
          b.Config({ messageStyle: i.messageStyle });
          MathJax.Message.Clear(0, 0);
          l = true;
        }
      });
      b.Register.MessageHook("End Math Output", function() {
        if (!h && l) {
          b.processUpdateTime = m;
          b.processUpdateDelay = j;
          b.Config({ messageStyle: k });
          h = true;
        }
      });
    },
    Disable: function() {
      this.enabled = false;
    },
    Enable: function() {
      this.enabled = true;
    },
    Active: function() {
      return (
        c.FastPreview && this.enabled && !(e[c.renderer] || {}).noFastPreview
      );
    },
    Preview: function(h) {
      if (!this.Active() || !h.script.parentNode) {
        return;
      }
      var i = h.script.MathJax.preview || h.script.previousSibling;
      if (!i || i.className !== MathJax.Hub.config.preRemoveClass) {
        i = g.Element("span", { className: MathJax.Hub.config.preRemoveClass });
        h.script.parentNode.insertBefore(i, h.script);
        h.script.MathJax.preview = i;
      }
      i.innerHTML = "";
      i.style.color = a ? "black" : "inherit";
      return this.postFilter(i, h);
    },
    postFilter: function(j, i) {
      if (!i.math.root.toPreviewHTML) {
        var h = MathJax.Callback.Queue();
        h.Push(
          [
            "Require",
            MathJax.Ajax,
            "[MathJax]/jax/output/PreviewHTML/config.js"
          ],
          ["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/jax.js"]
        );
        b.RestartAfter(h.Push({}));
      }
      i.math.root.toPreviewHTML(j);
    },
    Register: function(h) {
      b.Register.StartupHook(h + " Jax Require", function() {
        var i = MathJax.InputJax[h];
        i.postfilterHooks.Add(
          ["Preview", MathJax.Extension["fast-preview"]],
          50
        );
      });
    }
  });
  d.Register("TeX");
  d.Register("MathML");
  d.Register("AsciiMath");
  b.Register.StartupHook("End Config", ["Config", d]);
  b.Startup.signal.Post("fast-preview Ready");
})(MathJax.Hub, MathJax.HTML, MathJax.Hub.Browser);
MathJax.Ajax.loadComplete("[MathJax]/extensions/fast-preview.js");
(function(a, e, b, f) {
  var c = b.config.menuSettings;
  var d = (MathJax.Extension.AssistiveMML = {
    version: "2.7.1",
    config: b.CombineConfig("AssistiveMML", {
      disabled: false,
      styles: {
        ".MJX_Assistive_MathML": {
          position: "absolute!important",
          top: 0,
          left: 0,
          clip:
            b.Browser.isMSIE && (document.documentMode || 0) < 8
              ? "rect(1px 1px 1px 1px)"
              : "rect(1px, 1px, 1px, 1px)",
          padding: "1px 0 0 0!important",
          border: "0!important",
          height: "1px!important",
          width: "1px!important",
          overflow: "hidden!important",
          display: "block!important",
          "-webkit-touch-callout": "none",
          "-webkit-user-select": "none",
          "-khtml-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "user-select": "none"
        },
        ".MJX_Assistive_MathML.MJX_Assistive_MathML_Block": {
          width: "100%!important"
        }
      }
    }),
    Config: function() {
      if (!this.config.disabled && c.assistiveMML == null) {
        b.Config({ menuSettings: { assistiveMML: true } });
      }
      a.Styles(this.config.styles);
      b.Register.MessageHook("End Math", function(g) {
        if (c.assistiveMML) {
          return d.AddAssistiveMathML(g[1]);
        }
      });
    },
    AddAssistiveMathML: function(g) {
      var h = { jax: b.getAllJax(g), i: 0, callback: MathJax.Callback({}) };
      this.HandleMML(h);
      return h.callback;
    },
    RemoveAssistiveMathML: function(k) {
      var h = b.getAllJax(k),
        l;
      for (var j = 0, g = h.length; j < g; j++) {
        l = document.getElementById(h[j].inputID + "-Frame");
        if (l && l.getAttribute("data-mathml")) {
          l.removeAttribute("data-mathml");
          if (
            l.lastChild &&
            l.lastChild.className.match(/MJX_Assistive_MathML/)
          ) {
            l.removeChild(l.lastChild);
          }
        }
      }
    },
    HandleMML: function(l) {
      var g = l.jax.length,
        h,
        i,
        n,
        j;
      while (l.i < g) {
        h = l.jax[l.i];
        n = document.getElementById(h.inputID + "-Frame");
        if (
          h.outputJax !== "NativeMML" &&
          h.outputJax !== "PlainSource" &&
          n &&
          !n.getAttribute("data-mathml")
        ) {
          try {
            i = h.root
              .toMathML("")
              .replace(/\n */g, "")
              .replace(/<!--.*?-->/g, "");
          } catch (k) {
            if (!k.restart) {
              throw k;
            }
            return MathJax.Callback.After(["HandleMML", this, l], k.restart);
          }
          n.setAttribute("data-mathml", i);
          j = f.addElement(n, "span", {
            isMathJax: true,
            unselectable: "on",
            className:
              "MJX_Assistive_MathML" +
              (h.root.Get("display") === "block"
                ? " MJX_Assistive_MathML_Block"
                : "")
          });
          try {
            j.innerHTML = i;
          } catch (k) {}
          n.style.position = "relative";
          n.setAttribute("role", "presentation");
          n.firstChild.setAttribute("aria-hidden", "true");
          j.setAttribute("role", "presentation");
        }
        l.i++;
      }
      l.callback();
    }
  });
  b.Startup.signal.Post("AssistiveMML Ready");
})(MathJax.Ajax, MathJax.Callback, MathJax.Hub, MathJax.HTML);
MathJax.Callback.Queue(
  ["Require", MathJax.Ajax, "[MathJax]/extensions/toMathML.js"],
  ["loadComplete", MathJax.Ajax, "[MathJax]/extensions/AssistiveMML.js"],
  function() {
    MathJax.Hub.Register.StartupHook("End Config", [
      "Config",
      MathJax.Extension.AssistiveMML
    ]);
  }
);
!(function(a, b) {
  var c,
    d,
    e = a.config.menuSettings,
    f = Function.prototype.bind
      ? function(a, b) {
          return a.bind(b);
        }
      : function(a, b) {
          return function() {
            a.apply(b, arguments);
          };
        },
    g =
      Object.keys ||
      function(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && b.push(c);
        return b;
      },
    h = MathJax.Ajax.config.path;
  h.a11y || (h.a11y = a.config.root + "/extensions/a11y");
  var i = (b["accessibility-menu"] = {
      version: "1.2.0",
      prefix: "",
      default: {},
      modules: [],
      MakeOption: function(a) {
        return i.prefix + a;
      },
      GetOption: function(a) {
        return e[i.MakeOption(a)];
      },
      AddDefaults: function() {
        for (var a, b = g(i.default), c = 0; (a = b[c]); c++) {
          var d = i.MakeOption(a);
          void 0 === e[d] && (e[d] = i.default[a]);
        }
      },
      AddMenu: function() {
        for (
          var a, b = Array(this.modules.length), e = 0;
          (a = this.modules[e]);
          e++
        )
          b[e] = a.placeHolder;
        var f = d.FindId("Accessibility");
        if (f)
          b.unshift(c.RULE()), f.submenu.items.push.apply(f.submenu.items, b);
        else {
          var g = (d.FindId("Settings", "Renderer") || {}).submenu;
          g &&
            (b.unshift(c.RULE()),
            b.unshift(g.items.pop()),
            b.unshift(g.items.pop())),
            b.unshift("Accessibility");
          var f = c.SUBMENU.apply(c.SUBMENU, b),
            h = d.IndexOfId("Locale");
          h ? d.items.splice(h, 0, f) : d.items.push(c.RULE(), f);
        }
      },
      Register: function(a) {
        (i.default[a.option] = !1), i.modules.push(a);
      },
      Startup: function() {
        (c = MathJax.Menu.ITEM), (d = MathJax.Menu.menu);
        for (var a, b = 0; (a = this.modules[b]); b++) a.CreateMenu();
        this.AddMenu();
      },
      LoadExtensions: function() {
        for (var b = [], c = 0; (module = this.modules[c]); c++)
          e[module.option] && b.push(module.module);
        return b.length ? a.Startup.loadArray(b) : null;
      }
    }),
    j = (MathJax.Extension.ModuleLoader = MathJax.Object.Subclass({
      option: "",
      name: ["", ""],
      module: "",
      placeHolder: null,
      submenu: !1,
      extension: null,
      Init: function(a, b, c, d, e) {
        (this.option = a),
          (this.name = [b.replace(/ /g, ""), b]),
          (this.module = c),
          (this.extension = d),
          (this.submenu = e || !1);
      },
      CreateMenu: function() {
        var a = f(this.Load, this);
        this.submenu
          ? (this.placeHolder = c.SUBMENU(
              this.name,
              c.CHECKBOX(["Activate", "Activate"], i.MakeOption(this.option), {
                action: a
              }),
              c.RULE(),
              c.COMMAND(["OptionsWhenActive", "(Options when Active)"], null, {
                disabled: !0
              })
            ))
          : (this.placeHolder = c.CHECKBOX(
              this.name,
              i.MakeOption(this.option),
              { action: a }
            ));
      },
      Load: function() {
        a.Queue(["Require", MathJax.Ajax, this.module, ["Enable", this]]);
      },
      Enable: function(a) {
        var b = MathJax.Extension[this.extension];
        b && (b.Enable(!0, !0), MathJax.Menu.saveCookie());
      }
    }));
  i.Register(
    j("collapsible", "Collapsible Math", "[a11y]/collapsible.js", "collapsible")
  ),
    i.Register(
      j(
        "autocollapse",
        "Auto Collapse",
        "[a11y]/auto-collapse.js",
        "auto-collapse"
      )
    ),
    i.Register(j("explorer", "Explorer", "[a11y]/explorer.js", "explorer", !0)),
    i.AddDefaults(),
    a.Register.StartupHook(
      "End Extensions",
      function() {
        a.Register.StartupHook(
          "MathMenu Ready",
          function() {
            i.Startup(), a.Startup.signal.Post("Accessibility Menu Ready");
          },
          5
        );
      },
      5
    ),
    MathJax.Callback.Queue(
      ["LoadExtensions", i],
      ["loadComplete", MathJax.Ajax, "[a11y]/accessibility-menu.js"]
    );
})(MathJax.Hub, MathJax.Extension);
MathJax.Ajax.loadComplete("[MathJax]/config/AM_SVG.js");