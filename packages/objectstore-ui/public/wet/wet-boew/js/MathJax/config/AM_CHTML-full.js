/*
 *  /MathJax/config/AM_CHTML-full.js
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
  "[MathJax]/jax/output/CommonHTML/config.js",
  "[MathJax]/jax/output/PreviewHTML/config.js",
  "[MathJax]/extensions/asciimath2jax.js",
  "[MathJax]/extensions/MathEvents.js",
  "[MathJax]/extensions/MathZoom.js",
  "[MathJax]/extensions/MathMenu.js",
  "[MathJax]/jax/element/mml/jax.js",
  "[MathJax]/extensions/toMathML.js",
  "[MathJax]/jax/input/AsciiMath/jax.js",
  "[MathJax]/jax/output/CommonHTML/jax.js",
  "[MathJax]/jax/output/CommonHTML/autoload/mtable.js",
  "[MathJax]/jax/output/PreviewHTML/jax.js",
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
MathJax.OutputJax.CommonHTML = MathJax.OutputJax({
  id: "CommonHTML",
  version: "2.7.1",
  directory: MathJax.OutputJax.directory + "/CommonHTML",
  extensionDir: MathJax.OutputJax.extensionDir + "/CommonHTML",
  autoloadDir: MathJax.OutputJax.directory + "/CommonHTML/autoload",
  fontDir: MathJax.OutputJax.directory + "/CommonHTML/fonts",
  webfontDir: MathJax.OutputJax.fontDir + "/HTML-CSS",
  config: {
    matchFontHeight: true,
    scale: 100,
    minScaleAdjust: 50,
    mtextFontInherit: false,
    undefinedFamily: "STIXGeneral,'Cambria Math','Arial Unicode MS',serif",
    EqnChunk: MathJax.Hub.Browser.isMobile ? 20 : 100,
    EqnChunkFactor: 1.5,
    EqnChunkDelay: 100,
    linebreaks: { automatic: false, width: "container" }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration) {
  MathJax.OutputJax.CommonHTML.Register("jax/mml");
}
MathJax.OutputJax.CommonHTML.loadComplete("config.js");
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
(function(j, c, f, h) {
  var i;
  var g = MathJax.Object.isArray;
  var m, b, d;
  var e = 1,
    q = 0.1,
    k = 0.025,
    a = 0.025;
  var p = {
    ".mjx-chtml": {
      display: "inline-block",
      "line-height": 0,
      "text-indent": 0,
      "text-align": "left",
      "text-transform": "none",
      "font-style": "normal",
      "font-weight": "normal",
      "font-size": "100%",
      "font-size-adjust": "none",
      "letter-spacing": "normal",
      "word-wrap": "normal",
      "word-spacing": "normal",
      "white-space": "nowrap",
      float: "none",
      direction: "ltr",
      "max-width": "none",
      "max-height": "none",
      "min-width": 0,
      "min-height": 0,
      border: 0,
      margin: 0,
      padding: "1px 0"
    },
    ".MJXc-display": {
      display: "block",
      "text-align": "center",
      margin: "1em 0",
      padding: 0
    },
    ".mjx-chtml[tabindex]:focus, body :focus .mjx-chtml[tabindex]": {
      display: "inline-table"
    },
    ".mjx-full-width": {
      "text-align": "center",
      display: "table-cell!important",
      width: "10000em"
    },
    ".mjx-math": {
      display: "inline-block",
      "border-collapse": "separate",
      "border-spacing": 0
    },
    ".mjx-math *": {
      display: "inline-block",
      "-webkit-box-sizing": "content-box!important",
      "-moz-box-sizing": "content-box!important",
      "box-sizing": "content-box!important",
      "text-align": "left"
    },
    ".mjx-numerator": { display: "block", "text-align": "center" },
    ".mjx-denominator": { display: "block", "text-align": "center" },
    ".MJXc-stacked": { height: 0, position: "relative" },
    ".MJXc-stacked > *": { position: "absolute" },
    ".MJXc-bevelled > *": { display: "inline-block" },
    ".mjx-stack": { display: "inline-block" },
    ".mjx-op": { display: "block" },
    ".mjx-under": { display: "table-cell" },
    ".mjx-over": { display: "block" },
    ".mjx-over > *": {
      "padding-left": "0px!important",
      "padding-right": "0px!important"
    },
    ".mjx-under > *": {
      "padding-left": "0px!important",
      "padding-right": "0px!important"
    },
    ".mjx-stack > .mjx-sup": { display: "block" },
    ".mjx-stack > .mjx-sub": { display: "block" },
    ".mjx-prestack > .mjx-presup": { display: "block" },
    ".mjx-prestack > .mjx-presub": { display: "block" },
    ".mjx-delim-h > .mjx-char": { display: "inline-block" },
    ".mjx-surd": { "vertical-align": "top" },
    ".mjx-mphantom *": { visibility: "hidden" },
    ".mjx-merror": {
      "background-color": "#FFFF88",
      color: "#CC0000",
      border: "1px solid #CC0000",
      padding: "2px 3px",
      "font-style": "normal",
      "font-size": "90%"
    },
    ".mjx-annotation-xml": { "line-height": "normal" },
    ".mjx-menclose > svg": { fill: "none", stroke: "currentColor" },
    ".mjx-mtr": { display: "table-row" },
    ".mjx-mlabeledtr": { display: "table-row" },
    ".mjx-mtd": { display: "table-cell", "text-align": "center" },
    ".mjx-label": { display: "table-row" },
    ".mjx-box": { display: "inline-block" },
    ".mjx-block": { display: "block" },
    ".mjx-span": { display: "inline" },
    ".mjx-char": { display: "block", "white-space": "pre" },
    ".mjx-itable": { display: "inline-table", width: "auto" },
    ".mjx-row": { display: "table-row" },
    ".mjx-cell": { display: "table-cell" },
    ".mjx-table": { display: "table", width: "100%" },
    ".mjx-line": { display: "block", height: 0 },
    ".mjx-strut": { width: 0, "padding-top": e + "em" },
    ".mjx-vsize": { width: 0 },
    ".MJXc-space1": { "margin-left": ".167em" },
    ".MJXc-space2": { "margin-left": ".222em" },
    ".MJXc-space3": { "margin-left": ".278em" },
    ".mjx-chartest": {
      display: "block",
      visibility: "hidden",
      position: "absolute",
      top: 0,
      "line-height": "normal",
      "font-size": "500%"
    },
    ".mjx-chartest .mjx-char": { display: "inline" },
    ".mjx-chartest .mjx-box": { "padding-top": "1000px" },
    ".MJXc-processing": {
      visibility: "hidden",
      position: "fixed",
      width: 0,
      height: 0,
      overflow: "hidden"
    },
    ".MJXc-processed": { display: "none" },
    ".mjx-test": {
      display: "block",
      "font-style": "normal",
      "font-weight": "normal",
      "font-size": "100%",
      "font-size-adjust": "none",
      "text-indent": 0,
      "text-transform": "none",
      "letter-spacing": "normal",
      "word-spacing": "normal",
      overflow: "hidden",
      height: "1px"
    },
    ".mjx-ex-box-test": { position: "absolute", width: "1px", height: "60ex" },
    ".mjx-line-box-test": { display: "table!important" },
    ".mjx-line-box-test span": {
      display: "table-cell!important",
      width: "10000em!important",
      "min-width": 0,
      "max-width": "none",
      padding: 0,
      border: 0,
      margin: 0
    },
    "#MathJax_CHTML_Tooltip": {
      "background-color": "InfoBackground",
      color: "InfoText",
      border: "1px solid black",
      "box-shadow": "2px 2px 5px #AAAAAA",
      "-webkit-box-shadow": "2px 2px 5px #AAAAAA",
      "-moz-box-shadow": "2px 2px 5px #AAAAAA",
      "-khtml-box-shadow": "2px 2px 5px #AAAAAA",
      padding: "3px 4px",
      "z-index": 401,
      position: "absolute",
      left: 0,
      top: 0,
      width: "auto",
      height: "auto",
      display: "none"
    }
  };
  var n = 1000000;
  var l = {},
    o = MathJax.Hub.config;
  h.Augment({
    settings: c.config.menuSettings,
    config: { styles: p },
    Config: function() {
      if (!this.require) {
        this.require = [];
      }
      this.SUPER(arguments).Config.call(this);
      var r = this.settings;
      if (r.scale) {
        this.config.scale = r.scale;
      }
      this.require.push(this.fontDir + "/TeX/fontdata.js");
      this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
      l = this.config.linebreaks;
    },
    Startup: function() {
      m = MathJax.Extension.MathEvents.Event;
      b = MathJax.Extension.MathEvents.Touch;
      d = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = m.ContextMenu;
      this.Mousedown = m.AltContextMenu;
      this.Mouseover = d.Mouseover;
      this.Mouseout = d.Mouseout;
      this.Mousemove = d.Mousemove;
      var r = h.addElement(document.body, "mjx-block", {
        style: { display: "block", width: "5in" }
      });
      this.pxPerInch = r.offsetWidth / 5;
      r.parentNode.removeChild(r);
      this.TestSpan = h.Element("mjx-test", { style: { left: "1em" } }, [
        ["mjx-ex-box-test"]
      ]);
      this.linebreakSpan = f.Element(
        "span",
        { className: "mjx-line-box-test" },
        [["span"]]
      );
      return j.Styles(this.config.styles, ["InitializeCHTML", this]);
    },
    InitializeCHTML: function() {
      this.getDefaultExEm();
      if (this.defaultEm) {
        return;
      }
      var r = MathJax.Callback();
      j.timer.start(
        j,
        function(s) {
          if (s.time(r)) {
            c.signal.Post(["CommonHTML Jax - no default em size"]);
            return;
          }
          h.getDefaultExEm();
          if (h.defaultEm) {
            r();
          } else {
            setTimeout(s, s.delay);
          }
        },
        this.defaultEmDelay,
        this.defaultEmTimeout
      );
      return r;
    },
    defaultEmDelay: 100,
    defaultEmTimeout: 1000,
    getDefaultExEm: function() {
      document.body.appendChild(this.TestSpan);
      document.body.appendChild(this.linebreakSpan);
      this.defaultEm = this.getFontSize(this.TestSpan);
      this.defaultEx = this.TestSpan.firstChild.offsetHeight / 60;
      this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
      document.body.removeChild(this.linebreakSpan);
      document.body.removeChild(this.TestSpan);
    },
    getFontSize: window.getComputedStyle
      ? function(s) {
          var r = window.getComputedStyle(s);
          return parseFloat(r.fontSize);
        }
      : function(r) {
          return r.style.pixelLeft;
        },
    getMaxWidth: window.getComputedStyle
      ? function(s) {
          var r = window.getComputedStyle(s);
          if (r.maxWidth !== "none") {
            return parseFloat(r.maxWidth);
          }
          return 0;
        }
      : function(s) {
          var r = s.currentStyle.maxWidth;
          if (r !== "none") {
            if (r.match(/\d*px/)) {
              return parseFloat(r);
            }
            var t = s.style.left;
            s.style.left = r;
            r = s.style.pixelLeft;
            s.style.left = t;
            return r;
          }
          return 0;
        },
    loadFont: function(r) {
      c.RestartAfter(j.Require(this.fontDir + "/" + r));
    },
    fontLoaded: function(r) {
      if (!r.match(/-|fontdata/)) {
        r += "-Regular";
      }
      if (!r.match(/\.js$/)) {
        r += ".js";
      }
      MathJax.Callback.Queue(
        ["Post", c.Startup.signal, ["CommonHTML - font data loaded", r]],
        ["loadComplete", j, this.fontDir + "/" + r]
      );
    },
    Element: function(r, t, s) {
      if (r.substr(0, 4) === "mjx-") {
        if (!t) {
          t = {};
        }
        if (t.isMathJax == null) {
          t.isMathJax = true;
        }
        if (t.className) {
          t.className = r + " " + t.className;
        } else {
          t.className = r;
        }
        r = "span";
      }
      return this.HTMLElement(r, t, s);
    },
    addElement: function(t, r, u, s) {
      return t.appendChild(this.Element(r, u, s));
    },
    HTMLElement: f.Element,
    ucMatch: f.ucMatch,
    setScript: f.setScript,
    getNode: function(v, u) {
      var s = RegExp("\\b" + u + "\\b");
      while (v) {
        for (var t = 0, r = v.childNodes.length; t < r; t++) {
          var w = v.childNodes[t];
          if (s.test(w.className)) {
            return w;
          }
        }
        v =
          v.firstChild && (v.firstChild.id || "") === "" ? v.firstChild : null;
      }
      return null;
    },
    preTranslate: function(v) {
      var u = v.jax[this.id],
        E,
        A = u.length,
        H,
        y,
        B,
        F,
        D,
        s,
        G,
        r;
      var x = 100000,
        w = false,
        C = 0,
        t = l.automatic,
        z = l.width;
      if (t) {
        w = !!z.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/);
        if (w) {
          z = z.replace(/\s*container\s*/, "");
        } else {
          x = this.defaultWidth;
        }
        if (z === "") {
          z = "100%";
        }
      }
      for (E = 0; E < A; E++) {
        H = u[E];
        if (!H.parentNode) {
          continue;
        }
        y = H.previousSibling;
        if (
          y &&
          y.className &&
          String(y.className).substr(0, 9) === "mjx-chtml"
        ) {
          y.parentNode.removeChild(y);
        }
        if (H.MathJax.preview) {
          H.MathJax.preview.style.display = "none";
        }
        s = H.MathJax.elementJax;
        if (!s) {
          continue;
        }
        s.CHTML = {
          display: s.root.Get("display") === "block",
          preview: (s.CHTML || {}).preview
        };
        B = h.Element("mjx-chtml", {
          id: s.inputID + "-Frame",
          className: "MathJax_CHTML",
          isMathJax: true,
          jaxID: this.id,
          oncontextmenu: m.Menu,
          onmousedown: m.Mousedown,
          onmouseover: m.Mouseover,
          onmouseout: m.Mouseout,
          onmousemove: m.Mousemove,
          onclick: m.Click,
          ondblclick: m.DblClick,
          onkeydown: m.Keydown,
          tabIndex: c.getTabOrder(s)
        });
        if (s.CHTML.display) {
          var I = h.Element("mjx-chtml", {
            className: "MJXc-display",
            isMathJax: false
          });
          I.appendChild(B);
          B = I;
        }
        if (c.Browser.noContextMenu) {
          B.ontouchstart = b.start;
          B.ontouchend = b.end;
        }
        B.className += " MJXc-processing";
        H.parentNode.insertBefore(B, H);
        H.parentNode.insertBefore(this.linebreakSpan.cloneNode(true), H);
        H.parentNode.insertBefore(this.TestSpan.cloneNode(true), H);
      }
      for (E = 0; E < A; E++) {
        H = u[E];
        if (!H.parentNode) {
          continue;
        }
        F = H.previousSibling;
        s = H.MathJax.elementJax;
        if (!s) {
          continue;
        }
        r = h.getFontSize(F);
        G = F.firstChild.offsetHeight / 60;
        C = Math.max(0, F.previousSibling.firstChild.offsetWidth - 2);
        if (G === 0 || G === "NaN") {
          G = this.defaultEx;
          C = this.defaultWidth;
        }
        if (w) {
          x = C;
        }
        scale = this.config.matchFontHeight ? G / this.TEX.x_height / r : 1;
        scale = Math.floor(
          Math.max(this.config.minScaleAdjust / 100, scale) * this.config.scale
        );
        s.CHTML.scale = scale / 100;
        s.CHTML.fontSize = scale + "%";
        s.CHTML.outerEm = r;
        s.CHTML.em = this.em = (r * scale) / 100;
        s.CHTML.ex = G;
        s.CHTML.cwidth = C / this.em;
        s.CHTML.lineWidth = t ? this.length2em(z, x / this.em, 1) : x;
      }
      for (E = 0; E < A; E++) {
        H = u[E];
        if (!H.parentNode) {
          continue;
        }
        F = H.previousSibling;
        D = F.previousSibling;
        s = H.MathJax.elementJax;
        if (!s) {
          continue;
        }
        D.parentNode.removeChild(D);
        F.parentNode.removeChild(F);
        if (H.MathJax.preview) {
          H.MathJax.preview.style.display = "";
        }
      }
      v.CHTMLeqn = v.CHTMLlast = 0;
      v.CHTMLi = -1;
      v.CHTMLchunk = this.config.EqnChunk;
      v.CHTMLdelay = false;
    },
    Translate: function(s, w) {
      if (!s.parentNode) {
        return;
      }
      if (w.CHTMLdelay) {
        w.CHTMLdelay = false;
        c.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
      }
      var r = s.MathJax.elementJax,
        v = r.root,
        u = document.getElementById(r.inputID + "-Frame");
      if (!u) {
        return;
      }
      this.getMetrics(r);
      if (this.scale !== 1) {
        u.style.fontSize = r.CHTML.fontSize;
      }
      this.initCHTML(v, u);
      this.savePreview(s);
      this.CHTMLnode = u;
      try {
        v.setTeXclass();
        v.toCommonHTML(u);
      } catch (t) {
        while (u.firstChild) {
          u.removeChild(u.firstChild);
        }
        delete this.CHTMLnode;
        this.restorePreview(s);
        throw t;
      }
      delete this.CHTMLnode;
      this.restorePreview(s);
      if (r.CHTML.display) {
        u = u.parentNode;
      }
      u.className = u.className.replace(/ [^ ]+$/, "");
      u.className += " MJXc-processed";
      if (s.MathJax.preview) {
        r.CHTML.preview = s.MathJax.preview;
        delete s.MathJax.preview;
      }
      w.CHTMLeqn += w.i - w.CHTMLi;
      w.CHTMLi = w.i;
      if (w.CHTMLeqn >= w.CHTMLlast + w.CHTMLchunk) {
        this.postTranslate(w);
        w.CHTMLchunk = Math.floor(w.CHTMLchunk * this.config.EqnChunkFactor);
        w.CHTMLdelay = true;
      }
    },
    initCHTML: function(s, r) {},
    savePreview: function(r) {
      var s = r.MathJax.preview;
      if (s && s.parentNode) {
        r.MathJax.tmpPreview = document.createElement("span");
        s.parentNode.replaceChild(r.MathJax.tmpPreview, s);
      }
    },
    restorePreview: function(r) {
      var s = r.MathJax.tmpPreview;
      if (s) {
        s.parentNode.replaceChild(r.MathJax.preview, s);
        delete r.MathJax.tmpPreview;
      }
    },
    getMetrics: function(r) {
      var s = r.CHTML;
      this.jax = r;
      this.em = s.em;
      this.outerEm = s.outerEm;
      this.scale = s.scale;
      this.cwidth = s.cwidth;
      this.linebreakWidth = s.lineWidth;
    },
    postTranslate: function(w) {
      var s = w.jax[this.id];
      for (var u = w.CHTMLlast, r = w.CHTMLeqn; u < r; u++) {
        var t = s[u];
        if (t && t.MathJax.elementJax) {
          t.previousSibling.className = t.previousSibling.className.replace(
            / [^ ]+$/,
            ""
          );
          var v = t.MathJax.elementJax.CHTML;
          if (v.preview) {
            v.preview.innerHTML = "";
            v.preview.style.display = "none";
            t.MathJax.preview = v.preview;
            delete v.preview;
          }
        }
      }
      w.CHTMLlast = w.CHTMLeqn;
    },
    getJaxFromMath: function(r) {
      if (r.parentNode.className.match(/MJXc-display/)) {
        r = r.parentNode;
      }
      do {
        r = r.nextSibling;
      } while (r && r.nodeName.toLowerCase() !== "script");
      return c.getJaxFor(r);
    },
    getHoverSpan: function(r, s) {
      return r.root.CHTMLnodeElement();
    },
    getHoverBBox: function(r, u, v) {
      var w = r.root.CHTML,
        t = r.CHTML.outerEm;
      var s = { w: w.w * t, h: w.h * t, d: w.d * t };
      if (w.width) {
        s.width = w.width;
      }
      return s;
    },
    Zoom: function(t, A, z, r, x) {
      this.getMetrics(t);
      var u = h.addElement(A, "mjx-chtml", {
        style: { "font-size": Math.floor(h.scale * 100) + "%" },
        isMathJax: false
      });
      h.CHTMLnode = u;
      this.idPostfix = "-zoom";
      t.root.toCommonHTML(u);
      this.idPostfix = "";
      var s = u.style,
        B = t.root.CHTML;
      if (B.t > B.h) {
        s.marginTop = h.Em(B.t - B.h);
      }
      if (B.b > B.d) {
        s.marginBottom = h.Em(B.b - B.d);
      }
      if (B.l < 0) {
        s.paddingLeft = h.Em(-B.l);
      }
      if (B.r > B.w) {
        s.marginRight = h.Em(B.r - B.w);
      }
      s.position = "absolute";
      var y = u.offsetWidth,
        w = u.offsetHeight,
        C = z.firstChild.offsetHeight,
        v = z.firstChild.offsetWidth;
      u.style.position = "";
      return { Y: -m.getBBox(A).h, mW: v, mH: C, zW: y, zH: w };
    },
    Remove: function(r) {
      var s = document.getElementById(r.inputID + "-Frame");
      if (s && r.CHTML.display) {
        s = s.parentNode;
      }
      if (s) {
        s.parentNode.removeChild(s);
      }
      delete r.CHTML;
    },
    ID: 0,
    idPostfix: "",
    GetID: function() {
      this.ID++;
      return this.ID;
    },
    MATHSPACE: {
      veryverythinmathspace: 1 / 18,
      verythinmathspace: 2 / 18,
      thinmathspace: 3 / 18,
      mediummathspace: 4 / 18,
      thickmathspace: 5 / 18,
      verythickmathspace: 6 / 18,
      veryverythickmathspace: 7 / 18,
      negativeveryverythinmathspace: -1 / 18,
      negativeverythinmathspace: -2 / 18,
      negativethinmathspace: -3 / 18,
      negativemediummathspace: -4 / 18,
      negativethickmathspace: -5 / 18,
      negativeverythickmathspace: -6 / 18,
      negativeveryverythickmathspace: -7 / 18,
      thin: 0.04,
      medium: 0.06,
      thick: 0.1,
      infinity: n
    },
    SPACECLASS: {
      thinmathspace: "MJXc-space1",
      mediummathspace: "MJXc-space2",
      thickmathspace: "MJXc-space3"
    },
    pxPerInch: 96,
    em: 16,
    maxStretchyParts: 1000,
    FONTDEF: {},
    TEXDEF: {
      x_height: 0.442,
      quad: 1,
      num1: 0.676508,
      num2: 0.393732,
      num3: 0.44373,
      denom1: 0.685951,
      denom2: 0.344841,
      sup1: 0.412892,
      sup2: 0.362892,
      sup3: 0.288888,
      sub1: 0.15,
      sub2: 0.247217,
      sup_drop: 0.386108,
      sub_drop: 0.05,
      delim1: 2.39,
      delim2: 1,
      axis_height: 0.25,
      rule_thickness: 0.06,
      big_op_spacing1: 0.111111,
      big_op_spacing2: 0.166666,
      big_op_spacing3: 0.2,
      big_op_spacing4: 0.45,
      big_op_spacing5: 0.1,
      surd_height: 0.075,
      scriptspace: 0.05,
      nulldelimiterspace: 0.12,
      delimiterfactor: 901,
      delimitershortfall: 0.3,
      min_rule_thickness: 1.25
    },
    unicodeChar: function(r) {
      if (r < 65535) {
        return String.fromCharCode(r);
      }
      r -= 65536;
      return (
        String.fromCharCode((r >> 10) + 55296) +
        String.fromCharCode((r & 1023) + 56320)
      );
    },
    getUnicode: function(r) {
      var s = r.text.charCodeAt(r.i);
      r.i++;
      if (s >= 55296 && s < 56319) {
        s = ((s - 55296) << 10) + (r.text.charCodeAt(r.i) - 56320) + 65536;
        r.i++;
      }
      return s;
    },
    getCharList: function(v, u) {
      var t,
        A,
        y = [],
        s = v.cache,
        D = u;
      if (s[u]) {
        return s[u];
      }
      if (u > 65535 && this.FONTDATA.RemapPlane1) {
        var z = this.FONTDATA.RemapPlane1(u, v);
        u = z.n;
        v = z.variant;
      }
      var r = this.FONTDATA.RANGES,
        C = this.FONTDATA.VARIANT;
      if (u >= r[0].low && u <= r[r.length - 1].high) {
        for (t = 0, A = r.length; t < A; t++) {
          if (r[t].name === "alpha" && v.noLowerCase) {
            continue;
          }
          var x = v["offset" + r[t].offset];
          if (x && u >= r[t].low && u <= r[t].high) {
            if (r[t].remap && r[t].remap[u]) {
              u = x + r[t].remap[u];
            } else {
              u = u - r[t].low + x;
              if (r[t].add) {
                u += r[t].add;
              }
            }
            if (v["variant" + r[t].offset]) {
              v = C[v["variant" + r[t].offset]];
            }
            break;
          }
        }
      }
      if (v.remap && v.remap[u]) {
        u = v.remap[u];
        if (v.remap.variant) {
          v = C[v.remap.variant];
        }
      } else {
        if (this.FONTDATA.REMAP[u] && !v.noRemap) {
          u = this.FONTDATA.REMAP[u];
        }
      }
      if (g(u)) {
        v = C[u[1]];
        u = u[0];
      }
      if (typeof u === "string") {
        var w = { text: u, i: 0, length: u.length };
        while (w.i < w.length) {
          u = this.getUnicode(w);
          var B = this.getCharList(v, u);
          if (B) {
            y.push.apply(y, B);
          }
        }
      } else {
        if (v.cache[u]) {
          y = v.cache[u];
        } else {
          v.cache[u] = y = [this.lookupChar(v, u)];
        }
      }
      s[D] = y;
      return y;
    },
    lookupChar: function(u, x) {
      var w = u;
      while (u) {
        for (var t = 0, r = u.fonts.length; t < r; t++) {
          var s = this.FONTDATA.FONTS[u.fonts[t]];
          if (typeof s === "string") {
            this.loadFont(s);
          }
          var v = s[x];
          if (v) {
            if (v.length === 5) {
              v[5] = {};
            }
            if (v.c == null) {
              v[0] /= 1000;
              v[1] /= 1000;
              v[2] /= 1000;
              v[3] /= 1000;
              v[4] /= 1000;
              v.c = this.unicodeChar(x);
            }
            if (v[5].space) {
              return { type: "space", w: v[2], font: s };
            }
            return { type: "char", font: s, n: x };
          } else {
            if (s.Extra) {
              this.findBlock(s, x);
            }
          }
        }
        u = this.FONTDATA.VARIANT[u.chain];
      }
      return this.unknownChar(w, x);
    },
    findBlock: function(t, x) {
      var s = t.Extra,
        u = t.file,
        w;
      for (var v = 0, r = s.length; v < r; v++) {
        if (typeof s[v] === "number") {
          if (x === s[v]) {
            w = u;
            break;
          }
        } else {
          if (x < s[v][0]) {
            return;
          }
          if (x <= s[v][1]) {
            w = u;
            break;
          }
        }
      }
      if (w) {
        delete t.Extra;
        this.loadFont(u);
      }
    },
    unknownChar: function(r, u) {
      c.signal.Post(["CommonHTML Jax - unknown char", u, r]);
      var t = "";
      if (r.bold) {
        t += "B";
      }
      if (r.italic) {
        t += "I";
      }
      var s = this.FONTDATA.UNKNOWN[t || "R"];
      if (!s[u]) {
        this.getUnknownChar(s, u);
      }
      return { type: "unknown", n: u, font: s };
    },
    getUnknownChar: function(s, u) {
      var t = this.unicodeChar(u);
      var r = this.getHDW(t, s.className);
      s[u] = [
        0.8,
        0.2,
        r.w,
        0,
        r.w,
        { a: Math.max(0, (r.h - r.d) / 2), h: r.h, d: r.d }
      ];
      s[u].c = t;
    },
    styledText: function(s, v) {
      c.signal.Post(["CommonHTML Jax - styled text", v, s]);
      var t = s.style;
      var w = "_" + (t["font-family"] || s.className || "");
      if (t["font-weight"]) {
        w += "_" + t["font-weight"];
      }
      if (t["font-style"]) {
        w += "_" + t["font-style"];
      }
      if (!this.STYLEDTEXT) {
        this.STYLEDTEXT = {};
      }
      if (!this.STYLEDTEXT[w]) {
        this.STYLEDTEXT[w] = { className: s.className || "" };
      }
      var u = this.STYLEDTEXT[w];
      if (!u["_" + v]) {
        var r = this.getHDW(v, s.className || "", t);
        u["_" + v] = [
          0.8,
          0.2,
          r.w,
          0,
          r.w,
          { a: Math.max(0, (r.h - r.d) / 2), h: r.h, d: r.d }
        ];
        u["_" + v].c = v;
      }
      return {
        type: "unknown",
        n: "_" + v,
        font: u,
        style: t,
        rscale: s.rscale
      };
    },
    getHDW: function(A, t, E) {
      var s = h.addElement(h.CHTMLnode, "mjx-chartest", { className: t }, [
        ["mjx-char", { style: E }, [A]]
      ]);
      var r = h.addElement(h.CHTMLnode, "mjx-chartest", { className: t }, [
        ["mjx-char", { style: E }, [A, ["mjx-box"]]]
      ]);
      s.firstChild.style.fontSize = r.firstChild.style.fontSize = "";
      var u = 5 * h.em;
      var D = s.offsetHeight,
        B = r.offsetHeight,
        v = s.offsetWidth;
      h.CHTMLnode.removeChild(s);
      h.CHTMLnode.removeChild(r);
      if (B === 0) {
        u = 5 * h.defaultEm;
        var z = document.body.appendChild(document.createElement("div"));
        z.appendChild(s);
        z.appendChild(r);
        (D = s.offsetHeight), (B = r.offsetHeight), (v = s.offsetWidth);
        document.body.removeChild(z);
      }
      var y = (B - 1000) / u,
        C = v / u,
        x = D / u - y;
      return { h: x, d: y, w: C };
    },
    addCharList: function(u, w, x) {
      var v = { text: "", className: null, a: 0 };
      for (var s = 0, r = w.length; s < r; s++) {
        var t = w[s];
        if (this.charList[t.type]) {
          this.charList[t.type](t, u, x, v, r);
        }
      }
      if (v.text !== "") {
        if (u.childNodes.length) {
          this.charList.flushText(u, v);
        } else {
          f.addText(u, v.text);
          if (u.className) {
            u.className += " " + v.className;
          } else {
            u.className = v.className;
          }
        }
      }
      x.b = v.flushed ? 0 : x.a;
    },
    charList: {
      char: function(u, t, x, v, r) {
        var s = u.font;
        if (v.className && s.className !== v.className) {
          this.flushText(t, v);
        }
        if (!v.a) {
          v.a = s.centerline / 1000;
        }
        if (v.a > (x.a || 0)) {
          x.a = v.a;
        }
        var w = s[u.n];
        v.text += w.c;
        v.className = s.className;
        if (x.h < w[0] + k) {
          x.t = x.h = w[0] + k;
        }
        if (x.d < w[1] + a) {
          x.b = x.d = w[1] + a;
        }
        if (x.l > x.w + w[3]) {
          x.l = x.w + w[3];
        }
        if (x.r < x.w + w[4]) {
          x.r = x.w + w[4];
        }
        x.w += w[2] * (u.rscale || 1);
        if (r == 1 && s.skew && s.skew[u.n]) {
          x.skew = s.skew[u.n];
        }
        if (w[5].rfix) {
          this.flushText(t, v).style.marginRight = h.Em(w[5].rfix / 1000);
        }
      },
      space: function(s, r, u, t) {
        if (s.w) {
          if (t.text === "") {
            t.className = s.font.className;
          }
          this.flushText(r, t).style.marginRight = h.Em(s.w);
          u.w += s.w;
        }
      },
      unknown: function(s, r, v, t) {
        this["char"](s, r, v, t, 0);
        var u = s.font[s.n];
        if (u[5].a) {
          t.a = u[5].a;
          if (v.a == null || t.a > v.a) {
            v.a = t.a;
          }
        }
        r = this.flushText(r, t, s.style);
        r.style.width = h.Em(u[2]);
      },
      flushText: function(s, t, r) {
        s = h.addElement(
          s,
          "mjx-charbox",
          { className: t.className, style: r },
          [t.text]
        );
        if (t.a) {
          s.style.paddingBottom = h.Em(t.a);
        }
        t.text = "";
        t.className = null;
        t.a = 0;
        t.flushed = true;
        return s;
      }
    },
    handleText: function(t, w, s, v) {
      if (t.childNodes.length === 0) {
        h.addElement(t, "mjx-char");
        v = h.BBOX.empty(v);
      }
      if (typeof s === "string") {
        s = this.FONTDATA.VARIANT[s];
      }
      if (!s) {
        s = this.FONTDATA.VARIANT[i.VARIANT.NORMAL];
      }
      var r = { text: w, i: 0, length: w.length },
        u = [];
      if (s.style && r.length) {
        u.push(this.styledText(s, w));
      } else {
        while (r.i < r.length) {
          var x = this.getUnicode(r);
          u.push.apply(u, this.getCharList(s, x));
        }
      }
      if (u.length) {
        this.addCharList(t.firstChild, u, v);
      }
      v.clean();
      if (v.d < 0) {
        v.D = v.d;
        v.d = 0;
      }
      if (v.h - v.a) {
        t.firstChild.style[
          v.h - v.a < 0 ? "marginTop" : "paddingTop"
        ] = this.EmRounded(v.h - v.a);
      }
      if (v.d > -v.b) {
        t.firstChild.style.paddingBottom = this.EmRounded(v.d + v.b);
      }
      return v;
    },
    createDelimiter: function(w, r, t, z, u) {
      if (!r) {
        var A = this.BBOX.zero();
        A.w = A.r = this.TEX.nulldelimiterspace;
        h.addElement(w, "mjx-box", { style: { width: A.w } });
        return A;
      }
      if (!(t instanceof Array)) {
        t = [t, t];
      }
      var y = t[1];
      t = t[0];
      var s = { alias: r };
      while (s.alias) {
        r = s.alias;
        s = this.FONTDATA.DELIMITERS[r];
        if (!s) {
          s = { HW: [0, this.FONTDATA.VARIANT[i.VARIANT.NORMAL]] };
        }
      }
      if (s.load) {
        c.RestartAfter(
          j.Require(this.fontDir + "/TeX/fontdata-" + s.load + ".js")
        );
      }
      for (var x = 0, v = s.HW.length; x < v; x++) {
        if (s.HW[x][0] >= t - 0.01 || (x == v - 1 && !s.stretch)) {
          if (s.HW[x][3]) {
            r = s.HW[x][3];
          }
          A = this.createChar(w, [r, s.HW[x][1]], s.HW[x][2] || 1, u);
          A.offset = 0.6 * A.w;
          if (z) {
            A.scale = z.scale;
            z.rscale = z.rscale;
          }
          return A;
        }
      }
      if (!s.stretch) {
        return A;
      }
      return this["extendDelimiter" + s.dir](w, y, s.stretch, z, u);
    },
    extendDelimiterV: function(D, w, O, v, B) {
      D = h.addElement(D, "mjx-delim-v");
      var M = h.Element("span");
      var A,
        z,
        N,
        u,
        G,
        s,
        E,
        x,
        F = 1,
        L;
      G = this.createChar(M, O.top || O.ext, 1, B);
      A = M.removeChild(M.firstChild);
      s = this.createChar(M, O.bot || O.ext, 1, B);
      z = M.removeChild(M.firstChild);
      E = x = h.BBOX.zero();
      var I = G.h + G.d + s.h + s.d - q;
      D.appendChild(A);
      if (O.mid) {
        E = this.createChar(M, O.mid, 1, B);
        N = M.removeChild(M.firstChild);
        I += E.h + E.d;
        F = 2;
      }
      if (O.min && w < I * O.min) {
        w = I * O.min;
      }
      if (w > I) {
        x = this.createChar(M, O.ext, 1, B);
        u = M.removeChild(M.firstChild);
        var K = x.h + x.d,
          t = K - q;
        var C = Math.min(Math.ceil((w - I) / (F * t)), this.maxStretchyParts);
        if (O.fullExtenders) {
          w = C * F * t + I;
        } else {
          t = (w - I) / (F * C);
        }
        L = x.d + x.a - K / 2;
        u.style.margin = u.style.padding = "";
        u.style.lineHeight = h.Em(t);
        u.style.marginBottom = h.Em(L - q / 2 / F);
        u.style.marginTop = h.Em(-L - q / 2 / F);
        var J = u.textContent,
          y = "\n" + J;
        while (--C > 0) {
          J += y;
        }
        u.textContent = J;
        D.appendChild(u);
        if (O.mid) {
          D.appendChild(N);
          D.appendChild(u.cloneNode(true));
        }
      } else {
        L = (w - I - q) / F;
        A.style.marginBottom = h.Em(
          L + parseFloat(A.style.marginBottom || "0")
        );
        if (O.mid) {
          D.appendChild(N);
        }
        z.style.marginTop = h.Em(L + parseFloat(z.style.marginTop || "0"));
      }
      D.appendChild(z);
      var r = h.BBOX({
        w: Math.max(G.w, x.w, s.w, E.w),
        l: Math.min(G.l, x.l, s.l, E.l),
        r: Math.max(G.r, x.r, s.r, E.r),
        h: w - s.d,
        d: s.d,
        t: w - s.d,
        b: s.d
      });
      r.offset = 0.5 * r.w;
      if (v) {
        r.scale = v.scale;
        r.rscale = v.rscale;
      }
      return r;
    },
    extendDelimiterH: function(E, r, O, u, C) {
      E = h.addElement(E, "mjx-delim-h");
      var M = h.Element("span");
      var s,
        L,
        N,
        t,
        J,
        B,
        v,
        F,
        y,
        G = 1;
      B = this.createChar(M, O.left || O.rep, 1, C);
      s = M.removeChild(M.firstChild);
      v = this.createChar(M, O.right || O.rep, 1, C);
      L = M.removeChild(M.firstChild);
      y = this.createChar(M, O.rep, 1, C);
      t = M.removeChild(M.firstChild);
      s.style.marginLeft = h.Em(-B.l);
      L.style.marginRight = h.Em(v.r - v.w);
      E.appendChild(s);
      var P = h.BBOX.zero();
      P.h = Math.max(B.h, v.h, y.h);
      P.d = Math.max(B.D || B.d, v.D || v.d, y.D || y.d);
      var x = B.r - B.l + (v.r - v.l) - q;
      if (O.mid) {
        F = this.createChar(M, O.mid, 1, C);
        N = M.removeChild(M.firstChild);
        N.style.marginleft = h.Em(-F.l);
        N.style.marginRight = h.Em(F.r - F.w);
        x += F.r - F.l + q;
        G = 2;
        if (F.h > P.h) {
          P.h = F.h;
        }
        if (F.d > P.d) {
          P.d = F.d;
        }
      }
      if (O.min && r < x * O.min) {
        r = x * O.min;
      }
      P.w = P.r = r;
      if (r > x) {
        var A = y.r - y.l,
          I = A - q;
        var D = Math.min(Math.ceil((r - x) / (G * I)), this.maxStretchyParts);
        if (O.fullExtenders) {
          r = D * G * I + x;
        } else {
          I = (r - x) / (G * D);
        }
        var K = (A - I + q / G) / 2;
        t.style.marginLeft = h.Em(-y.l - K);
        t.style.marginRight = h.Em(y.r - y.w + K);
        t.style.letterSpacing = h.Em(-(y.w - I));
        s.style.marginRight = h.Em(B.r - B.w);
        L.style.marginleft = h.Em(-v.l);
        var H = t.textContent,
          z = H;
        while (--D > 0) {
          H += z;
        }
        t.textContent = H;
        E.appendChild(t);
        if (O.mid) {
          E.appendChild(N);
          J = E.appendChild(t.cloneNode(true));
        }
      } else {
        K = (r - x - q / G) / 2;
        s.style.marginRight = h.Em(B.r - B.w + K);
        if (O.mid) {
          E.appendChild(N);
        }
        L.style.marginLeft = h.Em(-v.l + K);
      }
      E.appendChild(L);
      this.adjustHeights([s, t, N, J, L], [B, y, F, y, v], P);
      if (u) {
        P.scale = u.scale;
        P.rscale = u.rscale;
      }
      return P;
    },
    adjustHeights: function(s, v, w) {
      var t = w.h,
        x = w.d;
      if (w.d < 0) {
        x = -w.d;
        w.D = w.d;
        w.d = 0;
      }
      for (var u = 0, r = s.length; u < r; u++) {
        if (s[u]) {
          s[u].style.paddingTop = h.Em(t - v[u].a);
          s[u].style.paddingBottom = h.Em(x + v[u].a);
          s[u].style.marginTop = s[u].style.marginBottom = 0;
        }
      }
    },
    createChar: function(t, x, v, s) {
      var A = "",
        w = { fonts: [x[1]], noRemap: true, cache: {} };
      if (s && s === i.VARIANT.BOLD && this.FONTDATA.FONTS[x[1] + "-Bold"]) {
        w.fonts = [x[1] + "-Bold", x[1]];
      }
      if (typeof x[1] !== "string") {
        w = x[1];
      }
      if (x[0] instanceof Array) {
        for (var y = 0, u = x[0].length; y < u; y++) {
          A += String.fromCharCode(x[0][y]);
        }
      } else {
        A = String.fromCharCode(x[0]);
      }
      if (x[4]) {
        v *= x[4];
      }
      var z = this.handleText(t, A, w),
        r = t.firstChild.style;
      if (v !== 1) {
        r.fontSize = this.Percent(v);
      }
      if (x[2]) {
        r.paddingLeft = this.Em(x[2]);
        z.w += x[2];
        z.r += x[2];
      }
      if (x[3]) {
        r.verticalAlign = this.Em(x[3]);
        z.h += x[3];
        if (z.h < 0) {
          z.h = 0;
        }
      }
      if (x[5]) {
        r.marginTop = this.Em(x[5]);
        z.h += x[5];
        z.t += x[5];
      }
      if (x[6]) {
        r.marginBottom = this.Em(x[6]);
        z.d += x[6];
        z.b += x[6];
      }
      return z;
    },
    length2em: function(v, t, w) {
      if (typeof v !== "string") {
        v = v.toString();
      }
      if (v === "") {
        return "";
      }
      if (v === i.SIZE.NORMAL) {
        return 1;
      }
      if (v === i.SIZE.BIG) {
        return 2;
      }
      if (v === i.SIZE.SMALL) {
        return 0.71;
      }
      if (this.MATHSPACE[v]) {
        return this.MATHSPACE[v];
      }
      var s = v.match(
        /^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/
      );
      var r = parseFloat(s[1] || "1"),
        u = s[2];
      if (t == null) {
        t = 1;
      }
      if (!w) {
        w = 1;
      }
      w = 1 / this.em / w;
      if (u === "em") {
        return r;
      }
      if (u === "ex") {
        return r * this.TEX.x_height;
      }
      if (u === "%") {
        return (r / 100) * t;
      }
      if (u === "px") {
        return r * w;
      }
      if (u === "pt") {
        return r / 10;
      }
      if (u === "pc") {
        return r * 1.2;
      }
      w *= this.pxPerInch;
      if (u === "in") {
        return r * w;
      }
      if (u === "cm") {
        return (r * w) / 2.54;
      }
      if (u === "mm") {
        return (r * w) / 25.4;
      }
      if (u === "mu") {
        return r / 18;
      }
      return r * t;
    },
    thickness2em: function(r, s) {
      var t = h.TEX.rule_thickness / (s || 1);
      if (r === i.LINETHICKNESS.MEDIUM) {
        return t;
      }
      if (r === i.LINETHICKNESS.THIN) {
        return 0.67 * t;
      }
      if (r === i.LINETHICKNESS.THICK) {
        return 1.67 * t;
      }
      return this.length2em(r, t, s);
    },
    Em: function(r) {
      if (Math.abs(r) < 0.001) {
        return "0";
      }
      return r.toFixed(3).replace(/\.?0+$/, "") + "em";
    },
    EmRounded: function(r) {
      r = (Math.round(r * h.em) + 0.05) / h.em;
      if (Math.abs(r) < 0.0006) {
        return "0em";
      }
      return r.toFixed(3).replace(/\.?0+$/, "") + "em";
    },
    unEm: function(r) {
      return parseFloat(r);
    },
    Px: function(r, s) {
      r *= this.em;
      if (s && r < s) {
        r = s;
      }
      if (Math.abs(r) < 0.1) {
        return "0";
      }
      return r.toFixed(1).replace(/\.0$/, "") + "px";
    },
    Percent: function(r) {
      return (100 * r).toFixed(1).replace(/\.?0+$/, "") + "%";
    },
    Transform: function(u, s, r) {
      var t = u.style;
      t.transform = t.WebkitTransform = t.MozTransform = t["-ms-transform"] = s;
      if (r) {
        t.transformOrigin = t.WebkitTransformOrigin = t.MozTransformOrigin = t[
          "-ms-transform-origin"
        ] = r;
      }
    },
    arrayEntry: function(r, s) {
      return r[Math.max(0, Math.min(s, r.length - 1))];
    },
    removeStyles: [
      "fontSize",
      "fontFamily",
      "fontWeight",
      "fontStyle",
      "fontVariant",
      "font"
    ]
  });
  h.BBOX = MathJax.Object.Subclass(
    {
      Init: function(r) {
        for (var s in r) {
          if (r.hasOwnProperty(s)) {
            this[s] = r[s];
          }
        }
      },
      clean: function() {
        if (this.h === -n) {
          this.h = 0;
        }
        if (this.d === -n) {
          this.d = 0;
        }
        if (this.l === n) {
          this.l = 0;
        }
        if (this.r === -n) {
          this.r = 0;
        }
        if (this.t === -n) {
          this.t = 0;
        }
        if (this.b === -n) {
          this.b = 0;
        }
        if (this.D && this.d > 0) {
          delete this.D;
        }
      },
      rescale: function(r) {
        this.w *= r;
        this.h *= r;
        this.d *= r;
        this.l *= r;
        this.r *= r;
        this.t *= r;
        this.b *= r;
        if (this.L) {
          this.L *= r;
        }
        if (this.R) {
          this.R *= r;
        }
        if (this.D) {
          this.D *= r;
        }
      },
      combine: function(s, r, t) {
        s.X = r;
        s.Y = t;
        scale = s.rscale;
        if (r + scale * s.r > this.r) {
          this.r = r + scale * s.r;
        }
        if (r + scale * s.l < this.l) {
          this.l = r + scale * s.l;
        }
        if (r + scale * (s.w + (s.L || 0) + (s.R || 0)) > this.w) {
          this.w = r + scale * (s.w + (s.L || 0) + (s.R || 0));
        }
        if (t + scale * s.h > this.h) {
          this.h = t + scale * s.h;
        }
        if (
          s.D &&
          (this.D == null || scale * s.D - t > this.D) &&
          scale * s.D > this.d
        ) {
          this.D = scale * s.D - t;
        } else {
          if (s.D == null && this.D) {
            delete this.D;
          }
        }
        if (scale * s.d - t > this.d) {
          this.d = scale * s.d - t;
        }
        if (t + scale * s.t > this.t) {
          this.t = t + scale * s.t;
        }
        if (scale * s.b - t > this.b) {
          this.b = scale * s.b - t;
        }
      },
      append: function(s) {
        scale = s.rscale;
        var r = this.w;
        if (r + scale * s.r > this.r) {
          this.r = r + scale * s.r;
        }
        if (r + scale * s.l < this.l) {
          this.l = r + scale * s.l;
        }
        this.w += scale * (s.w + (s.L || 0) + (s.R || 0));
        if (scale * s.h > this.h) {
          this.h = scale * s.h;
        }
        if (
          s.D &&
          (this.D == null || scale * s.D > this.D) &&
          scale * s.D > this.d
        ) {
          this.D = scale * s.D;
        } else {
          if (s.D == null && this.D) {
            delete this.D;
          }
        }
        if (scale * s.d > this.d) {
          this.d = scale * s.d;
        }
        if (scale * s.t > this.t) {
          this.t = scale * s.t;
        }
        if (scale * s.b > this.b) {
          this.b = scale * s.b;
        }
      },
      updateFrom: function(r) {
        this.h = r.h;
        this.d = r.d;
        this.w = r.w;
        this.r = r.r;
        this.l = r.l;
        this.t = r.t;
        this.b = r.b;
        if (r.pwidth) {
          this.pwidth = r.pwidth;
        }
        if (r.D) {
          this.D = r.D;
        } else {
          delete this.D;
        }
      },
      adjust: function(s, r, u, t) {
        this[r] += h.length2em(s, 1, this.scale);
        if (t == null) {
          if (this[r] > this[u]) {
            this[u] = this[r];
          }
        } else {
          if (this[u] < t) {
            this[u] = t;
          }
        }
      }
    },
    {
      zero: function() {
        return h.BBOX({
          h: 0,
          d: 0,
          w: 0,
          l: 0,
          r: 0,
          t: 0,
          b: 0,
          scale: 1,
          rscale: 1
        });
      },
      empty: function(r) {
        if (!r) {
          r = h.BBOX.zero();
        }
        r.h = r.d = r.r = r.t = r.b = -n;
        r.w = 0;
        r.l = n;
        delete r.pwidth;
        return r;
      },
      styleAdjust: [
        ["borderTopWidth", "h", "t"],
        ["borderRightWidth", "w", "r"],
        ["borderBottomWidth", "d", "b"],
        ["borderLeftWidth", "w", "l", 0],
        ["paddingTop", "h", "t"],
        ["paddingRight", "w", "r"],
        ["paddingBottom", "d", "b"],
        ["paddingLeft", "w", "l", 0]
      ]
    }
  );
  MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
    i = MathJax.ElementJax.mml;
    i.mbase.Augment(
      {
        toCommonHTML: function(s, r) {
          return this.CHTMLdefaultNode(s, r);
        },
        CHTMLmultiline: function() {
          i.mbase.CHTMLautoloadFile("multiline");
        },
        CHTMLdefaultNode: function(u, s) {
          if (!s) {
            s = {};
          }
          u = this.CHTMLcreateNode(u);
          this.CHTML = h.BBOX.empty();
          this.CHTMLhandleStyle(u);
          if (this.isToken) {
            this.CHTMLgetVariant();
          }
          this.CHTMLhandleScale(u);
          var r = Math.max(s.minChildren || 0, this.data.length);
          for (var t = 0; t < r; t++) {
            this.CHTMLaddChild(u, t, s);
          }
          if (!s.noBBox) {
            this.CHTML.clean();
          }
          this.CHTMLhandleSpace(u);
          this.CHTMLhandleBBox(u);
          this.CHTMLhandleColor(u);
          return u;
        },
        CHTMLaddChild: function(w, s, r) {
          var y = this.data[s],
            v;
          var t = r.childNodes;
          if (t instanceof Array) {
            t = t[s] || "span";
          }
          if (y) {
            if (t) {
              w = h.addElement(w, t);
            }
            v = y.toCommonHTML(w, r.childOptions);
            if (t && y.CHTML.rscale !== 1) {
              w.style.fontSize = w.firstChild.style.fontSize;
              w.firstChild.style.fontSize = "";
            }
            if (!r.noBBox) {
              var x = this.CHTML,
                u = y.CHTML;
              x.append(u);
              if (u.ic) {
                x.ic = u.ic;
              } else {
                delete x.ic;
              }
              if (u.skew) {
                x.skew = u.skew;
              }
              if (u.pwidth) {
                x.pwidth = u.pwidth;
              }
            }
          } else {
            if (r.forceChild) {
              v = h.addElement(w, t || "mjx-box");
            }
          }
          return v;
        },
        CHTMLchildNode: function(s, r) {
          s = s.childNodes[r];
          if (s.nodeName.toLowerCase() === "a") {
            s = s.firstChild;
          }
          return s;
        },
        CHTMLcoreNode: function(r) {
          if (this.inferRow && this.data[0]) {
            return this.data[0].CHTMLcoreNode(r.firstChild);
          }
          return this.CHTMLchildNode(r, this.CoreIndex());
        },
        CHTMLstretchChildV: function(u, t, x) {
          var v = this.data[u];
          if (v) {
            var y = this.CHTML,
              s = v.CHTML;
            if (
              s.stretch ||
              (s.stretch == null && v.CHTMLcanStretch("Vertical", t, x))
            ) {
              var r = s.w;
              s = v.CHTMLstretchV(t, x);
              y.w += s.w - r;
              if (y.w > y.r) {
                y.r = y.w;
              }
              if (s.h > y.h) {
                y.h = s.h;
              }
              if (s.d > y.d) {
                y.d = s.d;
              }
              if (s.t > y.t) {
                y.t = s.t;
              }
              if (s.b > y.b) {
                y.b = s.b;
              }
            }
          }
        },
        CHTMLstretchChildH: function(u, r, v) {
          var x = this.data[u];
          if (x) {
            var y = this.CHTML,
              t = x.CHTML;
            if (
              t.stretch ||
              (t.stretch == null && x.CHTMLcanStretch("Horizontal", r))
            ) {
              var s = t.w;
              t = x.CHTMLstretchH(this.CHTMLchildNode(v, u), r);
              y.w += t.w - s;
              if (y.w > y.r) {
                y.r = y.w;
              }
              if (t.h > y.h) {
                y.h = t.h;
              }
              if (t.d > y.d) {
                y.d = t.d;
              }
              if (t.t > y.t) {
                y.t = t.t;
              }
              if (t.b > y.b) {
                y.b = t.b;
              }
            }
          }
        },
        CHTMLcanStretch: function(v, t, u) {
          var s = false;
          if (this.isEmbellished()) {
            var r = this.Core();
            if (r && r !== this) {
              s = r.CHTMLcanStretch(v, t, u);
            }
          }
          this.CHTML.stretch = s;
          return s;
        },
        CHTMLstretchV: function(r, s) {
          this.CHTML.updateFrom(this.Core().CHTMLstretchV(r, s));
          return this.CHTML;
        },
        CHTMLstretchH: function(s, r) {
          this.CHTML.updateFrom(this.CHTMLstretchCoreH(s, r));
          return this.CHTML;
        },
        CHTMLstretchCoreH: function(s, r) {
          return this.Core().CHTMLstretchH(this.CHTMLcoreNode(s), r);
        },
        CHTMLcreateNode: function(r) {
          if (!this.CHTML) {
            this.CHTML = {};
          }
          this.CHTML = h.BBOX.zero();
          if (this.href) {
            r = h.addElement(r, "a", { href: this.href, isMathJax: true });
          }
          if (!this.CHTMLnodeID) {
            this.CHTMLnodeID = h.GetID();
          }
          var s = (this.id || "MJXc-Node-" + this.CHTMLnodeID) + h.idPostfix;
          return this.CHTMLhandleAttributes(
            h.addElement(r, "mjx-" + this.type, { id: s })
          );
        },
        CHTMLnodeElement: function() {
          if (!this.CHTMLnodeID) {
            return null;
          }
          return document.getElementById(
            (this.id || "MJXc-Node-" + this.CHTMLnodeID) + h.idPostfix
          );
        },
        CHTMLlength2em: function(s, r) {
          return h.length2em(s, r, this.CHTML.scale);
        },
        CHTMLhandleAttributes: function(u) {
          if (this["class"]) {
            if (u.className) {
              u.className += " " + this["class"];
            } else {
              u.className = this["class"];
            }
          }
          if (this.attrNames) {
            var y = this.attrNames,
              t = i.nocopyAttributes,
              x = c.config.ignoreMMLattributes;
            var v =
              this.type === "mstyle"
                ? i.math.prototype.defaults
                : this.defaults;
            for (var s = 0, r = y.length; s < r; s++) {
              var w = y[s];
              if (
                x[w] == false ||
                (!t[w] && !x[w] && v[w] == null && typeof u[w] === "undefined")
              ) {
                u.setAttribute(w, this.attr[w]);
              }
            }
          }
          return u;
        },
        CHTMLhandleScale: function(u) {
          var w = 1,
            t = this.parent,
            v = t ? t.CHTML.scale : 1;
          var r = this.getValues("scriptlevel", "fontsize");
          r.mathsize = this.Get("mathsize", null, !this.isToken);
          if (r.scriptlevel !== 0) {
            if (r.scriptlevel > 2) {
              r.scriptlevel = 2;
            }
            w = Math.pow(this.Get("scriptsizemultiplier"), r.scriptlevel);
            r.scriptminsize = h.length2em(this.Get("scriptminsize"), 0.8, 1);
            if (w < r.scriptminsize) {
              w = r.scriptminsize;
            }
          }
          if (
            this.removedStyles &&
            this.removedStyles.fontSize &&
            !r.fontsize
          ) {
            r.fontsize = this.removedStyles.fontSize;
          }
          if (r.fontsize && !this.mathsize) {
            r.mathsize = r.fontsize;
          }
          if (r.mathsize !== 1) {
            w *= h.length2em(r.mathsize, 1, 1);
          }
          var s = this.CHTMLvariant;
          if (s && s.style && s.style["font-family"]) {
            w *= h.config.scale / 100 / h.scale;
          }
          this.CHTML.scale = w;
          v = this.CHTML.rscale = w / v;
          if (Math.abs(v - 1) < 0.001) {
            v = 1;
          }
          if (u && v !== 1) {
            u.style.fontSize = h.Percent(v);
          }
          return w;
        },
        CHTMLhandleStyle: function(u) {
          if (!this.style) {
            return;
          }
          var t = u.style;
          t.cssText = this.style;
          this.removedStyles = {};
          for (var s = 0, r = h.removeStyles.length; s < r; s++) {
            var v = h.removeStyles[s];
            if (t[v]) {
              this.removedStyles[v] = t[v];
              t[v] = "";
            }
          }
        },
        CHTMLhandleBBox: function(v) {
          var s = this.CHTML,
            u = v.style;
          if (this.data.length === 1 && (this.data[0].CHTML || {}).pwidth) {
            s.pwidth = this.data[0].CHTML.pwidth;
            s.mwidth = this.data[0].CHTML.mwidth;
            u.width = "100%";
          } else {
            if (s.pwidth) {
              s.mwidth = h.Em(s.w);
              u.width = "100%";
            } else {
              if (s.w < 0) {
                u.width = "0px";
                u.marginRight = h.Em(s.w);
              }
            }
          }
          if (!this.style) {
            return;
          }
          for (var t = 0, r = h.BBOX.styleAdjust.length; t < r; t++) {
            var w = h.BBOX.styleAdjust[t];
            if (w && u[w[0]]) {
              s.adjust(u[w[0]], w[1], w[2], w[3]);
            }
          }
        },
        CHTMLhandleColor: function(r) {
          if (this.mathcolor) {
            r.style.color = this.mathcolor;
          } else {
            if (this.color) {
              r.style.color = this.color;
            }
          }
          if (this.mathbackground) {
            r.style.backgroundColor = this.mathbackground;
          } else {
            if (this.background) {
              r.style.backgroundColor = this.background;
            }
          }
        },
        CHTMLhandleSpace: function(r) {
          if (!this.useMMLspacing) {
            var s = this.texSpacing();
            if (s !== "") {
              this.CHTML.L = this.CHTMLlength2em(s);
              r.className += " " + h.SPACECLASS[s];
            }
          }
        },
        CHTMLhandleText: function(s, t, r) {
          if (s.firstChild && !this.CHTML) {
            this.CHTML = h.BBOX.empty();
          }
          this.CHTML = h.handleText(s, t, r, this.CHTML);
        },
        CHTMLgetVariant: function() {
          var r = this.getValues(
              "mathvariant",
              "fontfamily",
              "fontweight",
              "fontstyle"
            ),
            t;
          r.hasVariant = this.Get("mathvariant", true);
          if (this.removedStyles) {
            t = this.removedStyles;
            if (t.fontFamily) {
              r.family = t.fontFamily;
            }
            if (t.fontWeight) {
              r.weight = t.fontWeight;
            }
            if (t.fontStyle) {
              r.style = t.fontStyle;
            }
          }
          if (!r.hasVariant) {
            if (r.fontfamily) {
              r.family = r.fontfamily;
            }
            if (r.fontweight) {
              r.weight = r.fontweight;
            }
            if (r.fontstyle) {
              r.style = r.fontstyle;
            }
          }
          if (r.weight && r.weight.match(/^\d+$/)) {
            r.weight = parseInt(r.weight) > 600 ? "bold" : "normal";
          }
          var s = r.mathvariant;
          if (this.variantForm) {
            s = "-TeX-variant";
          }
          if (r.family && !r.hasVariant) {
            if (!r.weight && r.mathvariant.match(/bold/)) {
              r.weight = "bold";
            }
            if (!r.style && r.mathvariant.match(/italic/)) {
              r.style = "italic";
            }
            this.CHTMLvariant = {
              fonts: [],
              noRemap: true,
              cache: {},
              style: {
                "font-family": r.family,
                "font-weight": r.weight || "normal",
                "font-style": r.style || "normal"
              }
            };
            return;
          }
          if (r.weight === "bold") {
            s =
              {
                normal: i.VARIANT.BOLD,
                italic: i.VARIANT.BOLDITALIC,
                fraktur: i.VARIANT.BOLDFRAKTUR,
                script: i.VARIANT.BOLDSCRIPT,
                "sans-serif": i.VARIANT.BOLDSANSSERIF,
                "sans-serif-italic": i.VARIANT.SANSSERIFBOLDITALIC
              }[s] || s;
          } else {
            if (r.weight === "normal") {
              s =
                {
                  bold: i.VARIANT.normal,
                  "bold-italic": i.VARIANT.ITALIC,
                  "bold-fraktur": i.VARIANT.FRAKTUR,
                  "bold-script": i.VARIANT.SCRIPT,
                  "bold-sans-serif": i.VARIANT.SANSSERIF,
                  "sans-serif-bold-italic": i.VARIANT.SANSSERIFITALIC
                }[s] || s;
            }
          }
          if (r.style === "italic") {
            s =
              {
                normal: i.VARIANT.ITALIC,
                bold: i.VARIANT.BOLDITALIC,
                "sans-serif": i.VARIANT.SANSSERIFITALIC,
                "bold-sans-serif": i.VARIANT.SANSSERIFBOLDITALIC
              }[s] || s;
          } else {
            if (r.style === "normal") {
              s =
                {
                  italic: i.VARIANT.NORMAL,
                  "bold-italic": i.VARIANT.BOLD,
                  "sans-serif-italic": i.VARIANT.SANSSERIF,
                  "sans-serif-bold-italic": i.VARIANT.BOLDSANSSERIF
                }[s] || s;
            }
          }
          this.CHTMLvariant =
            h.FONTDATA.VARIANT[s] || h.FONTDATA.VARIANT[i.VARIANT.NORMAL];
        },
        CHTMLbboxFor: function(r) {
          if (this.data[r] && this.data[r].CHTML) {
            return this.data[r].CHTML;
          }
          return h.BBOX.zero();
        },
        CHTMLdrawBBox: function(s, t) {
          if (!t) {
            t = this.CHTML;
          }
          var r = h.Element(
            "mjx-box",
            {
              style: { opacity: 0.25, "margin-left": h.Em(-(t.w + (t.R || 0))) }
            },
            [
              [
                "mjx-box",
                {
                  style: {
                    height: h.Em(t.h),
                    width: h.Em(t.w),
                    "background-color": "red"
                  }
                }
              ],
              [
                "mjx-box",
                {
                  style: {
                    height: h.Em(t.d),
                    width: h.Em(t.w),
                    "margin-left": h.Em(-t.w),
                    "vertical-align": h.Em(-t.d),
                    "background-color": "green"
                  }
                }
              ]
            ]
          );
          if (s.nextSibling) {
            s.parentNode.insertBefore(r, s.nextSibling);
          } else {
            s.parentNode.appendChild(r);
          }
        },
        CHTMLnotEmpty: function(r) {
          while (
            r &&
            r.data.length < 2 &&
            (r.type === "mrow" || r.type === "texatom")
          ) {
            r = r.data[0];
          }
          return !!r;
        }
      },
      {
        CHTMLautoload: function() {
          var r = h.autoloadDir + "/" + this.type + ".js";
          c.RestartAfter(j.Require(r));
        },
        CHTMLautoloadFile: function(r) {
          var s = h.autoloadDir + "/" + r + ".js";
          c.RestartAfter(j.Require(s));
        },
        CHTMLstretchV: function(r, s) {
          this.Core().CHTMLstretchV(r, s);
          this.toCommonHTML(this.CHTMLnodeElement(), { stretch: true });
          return this.CHTML;
        },
        CHTMLstretchH: function(s, r) {
          this.CHTMLstretchCoreH(s, r);
          this.toCommonHTML(s, { stretch: true });
          return this.CHTML;
        }
      }
    );
    i.chars.Augment({
      toCommonHTML: function(s, r) {
        if (r == null) {
          r = {};
        }
        var t = this.toString();
        if (r.remap) {
          t = r.remap(t, r.remapchars);
        }
        this.CHTMLhandleText(s, t, r.variant || this.parent.CHTMLvariant);
      }
    });
    i.entity.Augment({
      toCommonHTML: function(s, r) {
        if (r == null) {
          r = {};
        }
        var t = this.toString();
        if (r.remapchars) {
          t = r.remap(t, r.remapchars);
        }
        this.CHTMLhandleText(s, t, r.variant || this.parent.CHTMLvariant);
      }
    });
    i.math.Augment({
      toCommonHTML: function(w) {
        w = this.CHTMLdefaultNode(w);
        if (this.CHTML.w < 0) {
          w.parentNode.style.width = "0px";
          w.parentNode.style.marginRight = h.Em(this.CHTML.w);
        }
        var u = this.Get("alttext");
        if (u && !w.getAttribute("aria-label")) {
          w.setAttribute("aria-label", u);
        }
        if (this.CHTML.pwidth) {
          w.parentNode.style.minWidth = this.CHTML.mwidth || h.Em(this.CHTML.w);
          w.parentNode.className = "mjx-full-width " + w.parentNode.className;
          w.style.width = this.CHTML.pwidth;
        } else {
          if (!this.isMultiline && this.Get("display") === "block") {
            var t = this.getValues(
              "indentalignfirst",
              "indentshiftfirst",
              "indentalign",
              "indentshift"
            );
            if (t.indentalignfirst !== i.INDENTALIGN.INDENTALIGN) {
              t.indentalign = t.indentalignfirst;
            }
            if (t.indentalign === i.INDENTALIGN.AUTO) {
              t.indentalign = o.displayAlign;
            }
            if (t.indentshiftfirst !== i.INDENTSHIFT.INDENTSHIFT) {
              t.indentshift = t.indentshiftfirst;
            }
            if (t.indentshift === "auto") {
              t.indentshift = "0";
            }
            var s = this.CHTMLlength2em(t.indentshift, h.cwidth);
            if (o.displayIndent !== "0") {
              var r = this.CHTMLlength2em(o.displayIndent, h.cwidth);
              s += t.indentalign === i.INDENTALIGN.RIGHT ? -r : r;
            }
            var v = w.parentNode.parentNode.style;
            w.parentNode.style.textAlign = v.textAlign = t.indentalign;
            if (s) {
              s *= h.em / h.outerEm;
              c.Insert(
                v,
                {
                  left: { marginLeft: h.Em(s) },
                  right: { marginRight: h.Em(-s) },
                  center: { marginLeft: h.Em(s), marginRight: h.Em(-s) }
                }[t.indentalign]
              );
            }
          }
        }
        return w;
      }
    });
    i.mi.Augment({
      toCommonHTML: function(r) {
        r = this.CHTMLdefaultNode(r);
        var t = this.CHTML,
          s = this.data.join("");
        if (t.skew != null && s.length !== 1) {
          delete t.skew;
        }
        if (t.r > t.w && s.length === 1 && !this.CHTMLvariant.noIC) {
          t.ic = t.r - t.w;
          t.w = t.r;
          r.lastChild.style.paddingRight = h.Em(t.ic);
        }
        return r;
      }
    });
    i.mn.Augment({
      CHTMLremapMinus: function(r) {
        return r.replace(/^-/, "\u2212");
      },
      toCommonHTML: function(r) {
        r = this.CHTMLdefaultNode(r, {
          childOptions: { remap: this.CHTMLremapMinus }
        });
        var t = this.CHTML,
          s = this.data.join("");
        if (t.skew != null && s.length !== 1) {
          delete t.skew;
        }
        if (t.r > t.w && s.length === 1 && !this.CHTMLvariant.noIC) {
          t.ic = t.r - t.w;
          t.w = t.r;
          r.lastChild.style.paddingRight = h.Em(t.ic);
        }
        return r;
      }
    });
    i.mo.Augment({
      toCommonHTML: function(u) {
        u = this.CHTMLcreateNode(u);
        this.CHTMLhandleStyle(u);
        this.CHTMLgetVariant();
        this.CHTMLhandleScale(u);
        h.BBOX.empty(this.CHTML);
        var s = this.getValues("displaystyle", "largeop");
        s.variant = this.CHTMLvariant;
        s.text = this.data.join("");
        if (s.text == "") {
          if (this.fence) {
            u.style.width = h.Em(h.TEX.nulldelimiterspace);
          }
        } else {
          this.CHTMLadjustAccent(s);
          this.CHTMLadjustVariant(s);
          for (var t = 0, r = this.data.length; t < r; t++) {
            this.CHTMLaddChild(u, t, {
              childOptions: {
                variant: s.mathvariant,
                remap: this.remap,
                remapchars: s.remapchars
              }
            });
          }
          if (s.text.length !== 1) {
            delete this.CHTML.skew;
          } else {
            if (this.CHTML.w === 0 && this.CHTML.l < 0) {
              this.CHTMLfixCombiningChar(u);
            }
          }
          if (s.largeop) {
            this.CHTMLcenterOp(u);
          }
        }
        this.CHTML.clean();
        this.CHTMLhandleBBox(u);
        this.CHTMLhandleSpace(u);
        this.CHTMLhandleColor(u);
        return u;
      },
      CHTMLhandleSpace: function(u) {
        if (this.useMMLspacing) {
          var s = this.getValues("scriptlevel", "lspace", "rspace");
          s.lspace = Math.max(0, this.CHTMLlength2em(s.lspace));
          s.rspace = Math.max(0, this.CHTMLlength2em(s.rspace));
          if (s.scriptlevel > 0) {
            if (!this.hasValue("lspace")) {
              s.lspace = 0.15;
            }
            if (!this.hasValue("rspace")) {
              s.rspace = 0.15;
            }
          }
          var r = this,
            t = this.Parent();
          while (t && t.isEmbellished() && t.Core() === r) {
            r = t;
            t = t.Parent();
            u = r.CHTMLnodeElement();
          }
          if (s.lspace) {
            u.style.paddingLeft = h.Em(s.lspace);
          }
          if (s.rspace) {
            u.style.paddingRight = h.Em(s.rspace);
          }
          this.CHTML.L = s.lspace;
          this.CHTML.R = s.rspace;
        } else {
          this.SUPER(arguments).CHTMLhandleSpace.apply(this, arguments);
        }
      },
      CHTMLadjustAccent: function(t) {
        var s = this.CoreParent();
        t.parent = s;
        if (
          t.text.length === 1 &&
          s &&
          s.isa(i.munderover) &&
          this.CoreText(s.data[s.base]).length === 1
        ) {
          var u = s.data[s.over],
            r = s.data[s.under];
          if (u && this === u.CoreMO() && s.Get("accent")) {
            t.remapchars = h.FONTDATA.REMAPACCENT;
          } else {
            if (r && this === r.CoreMO() && s.Get("accentunder")) {
              t.remapchars = h.FONTDATA.REMAPACCENTUNDER;
            }
          }
        }
      },
      CHTMLadjustVariant: function(s) {
        var r = s.parent,
          t = r && r.isa(i.msubsup) && this !== r.data[r.base];
        if (s.largeop) {
          s.mathvariant = s.displaystyle ? "-largeOp" : "-smallOp";
        }
        if (t) {
          s.remapchars = this.remapChars;
          if (s.text.match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
            s.mathvariant = "-TeX-variant";
          }
        }
      },
      CHTMLfixCombiningChar: function(r) {
        r = r.firstChild;
        var s = h.Element("mjx-box", {
          style: { width: ".25em", "margin-left": "-.25em" }
        });
        r.insertBefore(s, r.firstChild);
      },
      CHTMLcenterOp: function(r) {
        var t = this.CHTML;
        var s = (t.h - t.d) / 2 - h.TEX.axis_height;
        if (Math.abs(s) > 0.001) {
          r.style.verticalAlign = h.Em(-s);
        }
        t.h -= s;
        t.d += s;
        if (t.r > t.w) {
          t.ic = t.r - t.w;
          t.w = t.r;
          r.style.paddingRight = h.Em(t.ic);
        }
      },
      CHTMLcanStretch: function(v, t, u) {
        if (!this.Get("stretchy")) {
          return false;
        }
        var w = this.data.join("");
        if (w.length !== 1) {
          return false;
        }
        var s = { text: w };
        this.CHTMLadjustAccent(s);
        if (s.remapchars) {
          w = s.remapchars[w] || w;
        }
        w = h.FONTDATA.DELIMITERS[w.charCodeAt(0)];
        var r = w && w.dir === v.substr(0, 1);
        if (r) {
          r =
            this.CHTML.h !== t ||
            this.CHTML.d !== u ||
            !!this.Get("minsize", true) ||
            !!this.Get("maxsize", true);
          if (r) {
            this.CHTML.stretch = true;
          }
        }
        return r;
      },
      CHTMLstretchV: function(u, x) {
        var v = this.CHTMLnodeElement(),
          w = this.CHTML;
        var s = this.getValues("symmetric", "maxsize", "minsize");
        var t,
          r = h.TEX.axis_height;
        if (s.symmetric) {
          t = 2 * Math.max(u - r, x + r);
        } else {
          t = u + x;
        }
        s.maxsize = this.CHTMLlength2em(s.maxsize, w.h + w.d);
        s.minsize = this.CHTMLlength2em(s.minsize, w.h + w.d);
        t = Math.max(s.minsize, Math.min(s.maxsize, t));
        if (t !== w.sH) {
          if (t != s.minsize) {
            t = [
              Math.max(
                (t * h.TEX.delimiterfactor) / 1000,
                t - h.TEX.delimitershortfall
              ),
              t
            ];
          }
          while (v.firstChild) {
            v.removeChild(v.firstChild);
          }
          this.CHTML = w = h.createDelimiter(
            v,
            this.data.join("").charCodeAt(0),
            t,
            w
          );
          w.sH = t instanceof Array ? t[1] : t;
          if (s.symmetric) {
            t = (w.h + w.d) / 2 + r;
          } else {
            t = ((w.h + w.d) * u) / (u + x);
          }
          t -= w.h;
          if (Math.abs(t) > 0.05) {
            v.style.verticalAlign = h.Em(t);
            w.h += t;
            w.d -= t;
            w.t += t;
            w.b -= t;
          }
        }
        return this.CHTML;
      },
      CHTMLstretchH: function(t, r) {
        var u = this.CHTML;
        var s = this.getValues(
          "maxsize",
          "minsize",
          "mathvariant",
          "fontweight"
        );
        if (
          (s.fontweight === "bold" ||
            (this.removedStyles || {}).fontWeight === "bold" ||
            parseInt(s.fontweight) >= 600) &&
          !this.Get("mathvariant", true)
        ) {
          s.mathvariant = i.VARIANT.BOLD;
        }
        s.maxsize = this.CHTMLlength2em(s.maxsize, u.w);
        s.minsize = this.CHTMLlength2em(s.minsize, u.w);
        r = Math.max(s.minsize, Math.min(s.maxsize, r));
        if (r !== u.sW) {
          while (t.firstChild) {
            t.removeChild(t.firstChild);
          }
          this.CHTML = u = h.createDelimiter(
            t,
            this.data.join("").charCodeAt(0),
            r,
            u,
            s.mathvariant
          );
          u.sW = r;
        }
        return this.CHTML;
      }
    });
    i.mtext.Augment({
      CHTMLgetVariant: function() {
        if (h.config.mtextFontInherit || this.Parent().type === "merror") {
          var t = h.config.scale / 100 / h.scale;
          var s = {
            cache: {},
            fonts: [],
            className: "MJXc-font-inherit",
            rscale: t,
            style: { "font-size": h.Percent(t) }
          };
          var r = this.Get("mathvariant");
          if (r.match(/bold/)) {
            s.style["font-weight"] = "bold";
          }
          if (r.match(/italic|-tex-mathit/)) {
            s.style["font-style"] = "italic";
          }
          if (r === "monospace") {
            s.className += " MJXc-monospace-font";
          }
          if (r === "double-struck") {
            s.className += " MJXc-double-struck-font";
          }
          if (r.match(/fraktur/)) {
            s.className += " MJXc-fraktur-font";
          }
          if (r.match(/sans-serif/)) {
            s.className += " MJXc-sans-serif-font";
          }
          if (r.match(/script/)) {
            s.className += " MJXc-script-font";
          }
          this.CHTMLvariant = s;
        } else {
          this.SUPER(arguments).CHTMLgetVariant.call(this);
        }
      }
    });
    i.merror.Augment({
      toCommonHTML: function(r) {
        r = this.CHTMLdefaultNode(r);
        var s = this.CHTML;
        s.rescale(0.9);
        s.h += 3 / h.em;
        if (s.h > s.t) {
          s.t = s.h;
        }
        s.d += 3 / h.em;
        if (s.d > s.b) {
          s.b = s.d;
        }
        s.w += 8 / h.em;
        s.r = s.w;
        s.l = 0;
        return r;
      }
    });
    i.mspace.Augment({
      toCommonHTML: function(u) {
        u = this.CHTMLcreateNode(u);
        this.CHTMLhandleStyle(u);
        this.CHTMLhandleScale(u);
        var s = this.getValues("height", "depth", "width");
        var r = this.CHTMLlength2em(s.width),
          t = this.CHTMLlength2em(s.height),
          x = this.CHTMLlength2em(s.depth);
        var v = this.CHTML;
        v.w = v.r = r;
        v.h = v.t = t;
        v.d = v.b = x;
        v.l = 0;
        if (r < 0) {
          u.style.marginRight = h.Em(r);
          r = 0;
        }
        u.style.width = h.Em(r);
        u.style.height = h.Em(Math.max(0, t + x));
        if (x) {
          u.style.verticalAlign = h.Em(-x);
        }
        this.CHTMLhandleBBox(u);
        this.CHTMLhandleColor(u);
        return u;
      }
    });
    i.mpadded.Augment({
      toCommonHTML: function(s, E) {
        var r;
        if (E && E.stretch) {
          s = s.firstChild;
          r = s.firstChild;
        } else {
          s = this.CHTMLdefaultNode(s, {
            childNodes: "mjx-box",
            forceChild: true
          });
          r = s.firstChild;
          s = h.addElement(s, "mjx-block");
          s.appendChild(r);
          h.addElement(s, "mjx-strut");
        }
        var v = this.CHTMLbboxFor(0);
        var C = this.getValues("width", "height", "depth", "lspace", "voffset");
        var A = 0,
          z = 0,
          B = v.w,
          t = v.h,
          u = v.d;
        r.style.width = 0;
        r.style.margin = h.Em(-t) + " 0 " + h.Em(-u);
        if (C.width !== "") {
          B = this.CHTMLdimen(C.width, "w", B, 0);
        }
        if (C.height !== "") {
          t = this.CHTMLdimen(C.height, "h", t, 0);
        }
        if (C.depth !== "") {
          u = this.CHTMLdimen(C.depth, "d", u, 0);
        }
        if (C.voffset !== "") {
          z = this.CHTMLdimen(C.voffset);
          if (z) {
            r.style.position = "relative";
            r.style.top = h.Em(-z);
          }
        }
        if (C.lspace !== "") {
          A = this.CHTMLdimen(C.lspace);
          if (A) {
            r.style.position = "relative";
            r.style.left = h.Em(A);
          }
        }
        s.style.width = 0;
        s.style.marginTop = h.Em(t - e);
        s.style.padding = "0 " + h.Em(B) + " " + h.Em(u) + " 0";
        var D = h.BBOX({
          w: B,
          h: t,
          d: u,
          l: 0,
          r: B,
          t: t,
          b: u,
          scale: this.CHTML.scale,
          rscale: this.CHTML.rscale
        });
        D.combine(v, A, z);
        D.w = B;
        D.h = t;
        D.d = u;
        this.CHTML = D;
        return s.parentNode;
      },
      CHTMLstretchV: i.mbase.CHTMLstretchV,
      CHTMLstretchH: i.mbase.CHTMLstretchH,
      CHTMLdimen: function(v, x, w, r) {
        if (r == null) {
          r = -n;
        }
        v = String(v);
        var s = v.match(/width|height|depth/);
        var t = s ? this.CHTML[s[0].charAt(0)] : x ? this.CHTML[x] : 0;
        var u = this.CHTMLlength2em(v, t) || 0;
        if (v.match(/^[-+]/) && w != null) {
          u += w;
        }
        if (r != null) {
          u = Math.max(r, u);
        }
        return u;
      }
    });
    i.munderover.Augment({
      toCommonHTML: function(v, F) {
        var D = this.getValues(
          "displaystyle",
          "accent",
          "accentunder",
          "align"
        );
        var t = this.data[this.base];
        if (
          !D.displaystyle &&
          t != null &&
          (t.movablelimits || t.CoreMO().Get("movablelimits"))
        ) {
          return i.msubsup.prototype.toCommonHTML.call(this, v, s);
        }
        var A,
          y,
          r = [],
          s = false;
        if (F && F.stretch) {
          if (this.data[this.base]) {
            t = h.getNode(v, "mjx-op");
          }
          if (this.data[this.under]) {
            A = h.getNode(v, "mjx-under");
          }
          if (this.data[this.over]) {
            y = h.getNode(v, "mjx-over");
          }
          r[0] = t;
          r[1] = A || y;
          r[2] = y;
          s = true;
        } else {
          var x = ["mjx-op", "mjx-under", "mjx-over"];
          if (this.over === 1) {
            x[1] = x[2];
          }
          v = this.CHTMLdefaultNode(v, {
            childNodes: x,
            noBBox: true,
            forceChild: true,
            minChildren: 2
          });
          r[0] = t = v.removeChild(v.firstChild);
          r[1] = A = y = v.removeChild(v.firstChild);
          if (v.firstChild) {
            r[2] = y = v.removeChild(v.firstChild);
          }
        }
        var w = [],
          u = this.CHTMLgetBBoxes(w, r, D);
        var E = w[this.base],
          B = this.CHTML;
        B.w = u;
        B.h = E.h;
        B.d = E.d;
        var z = t,
          C = 0;
        if (E.ic) {
          C = 1.3 * E.ic + 0.05;
        }
        if (this.data[this.over]) {
          z = this.CHTMLaddOverscript(y, w, D, C, t, s);
        }
        if (this.data[this.under]) {
          this.CHTMLaddUnderscript(A, w, D, C, v, z, s);
        } else {
          if (!s) {
            v.appendChild(z);
          }
        }
        this.CHTMLplaceBoxes(t, A, y, D, w);
        return v;
      },
      CHTMLgetBBoxes: function(z, v, u) {
        var x,
          s = this.data.length,
          y,
          t = -n,
          r = t;
        for (x = 0; x < s; x++) {
          z[x] = this.CHTMLbboxFor(x);
          z[x].x = z[x].y = 0;
          if (this.data[x]) {
            z[x].stretch = this.data[x].CHTMLcanStretch("Horizontal");
          }
          y = x === this.base ? 1 : z[x].rscale;
          if (x !== this.base) {
            delete z[x].L;
            delete z[x].R;
          }
          r = Math.max(r, y * (z[x].w + (z[x].L || 0) + (z[x].R || 0)));
          if (!z[x].stretch && r > t) {
            t = r;
          }
        }
        if (t === -n) {
          t = r;
        }
        for (x = 0; x < s; x++) {
          if (z[x].stretch) {
            y = x === this.base ? 1 : z[x].rscale;
            z[x] = this.data[x].CHTMLstretchH(v[x].firstChild, t / y);
            z[x].x = z[x].y = 0;
            r = Math.max(r, y * (z[x].w + (z[x].L || 0) + (z[x].R || 0)));
          }
        }
        if (!z[this.base]) {
          z[this.base] = h.BBOX.empty();
        }
        return r;
      },
      CHTMLaddOverscript: function(A, y, E, D, s, r) {
        var C = this.CHTML;
        var x,
          w,
          v = h.TEX.big_op_spacing5,
          u;
        var z = y[this.over],
          F = y[this.base],
          t = z.rscale;
        if (!r) {
          var B = h.Element("mjx-stack");
          B.appendChild(A);
          B.appendChild(s);
        }
        if (z.D) {
          z.d = z.D;
        }
        if (z.d < 0) {
          A.firstChild.style.verticalAlign = "top";
          A.style.height = h.Em(z.h + z.d);
        }
        z.x = 0;
        if (E.accent) {
          if (z.w < 0.001) {
            z.x += (z.r - z.l) / 2;
          }
          u = h.TEX.rule_thickness;
          v = 0;
          if (F.skew) {
            z.x += t * F.skew;
            C.skew = t * F.skew;
            if (z.x + t * z.w > C.w) {
              C.skew += (C.w - (z.x + t * z.w)) / 2;
            }
          }
        } else {
          x = h.TEX.big_op_spacing1;
          w = h.TEX.big_op_spacing3;
          u = Math.max(x, w - Math.max(0, t * z.d));
        }
        z.x += D / 2;
        z.y = C.h + u + v + t * z.d;
        if (u) {
          A.style.paddingBottom = h.Em(u / t);
        }
        if (v) {
          A.style.paddingTop = h.Em(v / t);
        }
        return B;
      },
      CHTMLaddUnderscript: function(A, y, D, C, s, z, r) {
        var B = this.CHTML;
        var x,
          w,
          v = h.TEX.big_op_spacing5,
          u;
        var E = y[this.under],
          t = E.rscale;
        if (!r) {
          h.addElement(s, "mjx-itable", {}, [
            ["mjx-row", {}, [["mjx-cell"]]],
            ["mjx-row"]
          ]);
          s.firstChild.firstChild.firstChild.appendChild(z);
          s.firstChild.lastChild.appendChild(A);
        }
        if (E.D) {
          E.d = E.D;
        }
        if (E.d < 0) {
          A.firstChild.style.verticalAlign = "top";
          s.firstChild.style.marginBottom = h.Em(E.d);
        }
        if (D.accentunder) {
          u = 2 * h.TEX.rule_thickness;
          v = 0;
        } else {
          x = h.TEX.big_op_spacing2;
          w = h.TEX.big_op_spacing4;
          u = Math.max(x, w - t * E.h);
        }
        E.x = -C / 2;
        E.y = -(B.d + u + v + t * E.h);
        if (u) {
          A.style.paddingTop = h.Em(u / t);
        }
        if (v) {
          A.style.paddingBottom = h.Em(v / t);
        }
      },
      CHTMLplaceBoxes: function(r, A, z, D, y) {
        var s = this.CHTML.w,
          x,
          u = y.length,
          v;
        var C = h.BBOX.zero();
        C.scale = this.CHTML.scale;
        C.rscale = this.CHTML.rscale;
        y[this.base].x = y[this.base].y = 0;
        var E = n;
        for (x = 0; x < u; x++) {
          v = x === this.base ? 1 : y[x].rscale;
          var B = v * (y[x].w + (y[x].L || 0) + (y[x].R || 0));
          y[x].x += { left: 0, center: (s - B) / 2, right: s - B }[D.align];
          if (y[x].x < E) {
            E = y[x].x;
          }
        }
        for (x = 0; x < u; x++) {
          if (this.data[x]) {
            v = x === this.base ? 1 : y[x].rscale;
            if (y[x].x - E) {
              var t = x === this.base ? r : x === this.over ? z : A;
              t.style.paddingLeft = h.Em((y[x].x - E) / v);
            }
            C.combine(y[x], y[x].x - E, y[x].y);
          }
        }
        this.CHTML = C;
      },
      CHTMLstretchV: i.mbase.CHTMLstretchV,
      CHTMLstretchH: i.mbase.CHTMLstretchH,
      CHTMLchildNode: function(t, s) {
        var r = ["mjx-op", "mjx-under", "mjx-over"];
        if (this.over === 1) {
          r[1] = r[2];
        }
        return h.getNode(t, r[s]);
      }
    });
    i.msubsup.Augment({
      toCommonHTML: function(S, C) {
        var A = this.getValues(
          "displaystyle",
          "subscriptshift",
          "superscriptshift",
          "texprimestyle"
        );
        var D, H, z;
        if (C && C.stretch) {
          if (this.data[this.base]) {
            D = h.getNode(S, "mjx-base");
          }
          if (this.data[this.sub]) {
            H = h.getNode(S, "mjx-sub");
          }
          if (this.data[this.sup]) {
            z = h.getNode(S, "mjx-sup");
          }
          E = h.getNode(S, "mjx-stack");
        } else {
          var K = ["mjx-base", "mjx-sub", "mjx-sup"];
          if (this.sup === 1) {
            K[1] = K[2];
          }
          S = this.CHTMLdefaultNode(S, {
            childNodes: K,
            noBBox: true,
            forceChild: true,
            minChildren: 3
          });
          D = S.childNodes[this.base];
          H = S.childNodes[this.sub];
          z = S.childNodes[this.sup];
          if (!this.CHTMLnotEmpty(this.data[this.sub])) {
            S.removeChild(H);
            H = null;
          }
          if (!this.CHTMLnotEmpty(this.data[this.sup])) {
            S.removeChild(z);
            z = null;
          }
          if (S.childNodes.length === 3) {
            var E = h.addElement(S, "mjx-stack");
            E.appendChild(z);
            E.appendChild(H);
          }
        }
        var F = [],
          G = h.BBOX.empty(this.CHTML);
        for (var V = 0, T = this.data.length; V < T; V++) {
          F[V] = this.CHTMLbboxFor(V);
        }
        var y = F[this.base] || h.BBOX.empty(),
          P = F[this.sub],
          W = F[this.sup];
        var B = H ? P.rscale : 1,
          w = z ? W.rscale : 1;
        G.combine(y, 0, 0);
        var X = h.TEX.x_height,
          N = h.TEX.scriptspace;
        var Q = h.TEX.sup_drop * w,
          O = h.TEX.sub_drop * B;
        var L = y.h - Q,
          J = y.d + O,
          Y = 0,
          R;
        if (y.ic) {
          G.w -= y.ic;
          D.style.marginRight = h.Em(-y.ic);
          Y = 1.3 * y.ic + 0.05;
        }
        var U = this.data[this.base];
        if (U) {
          if (
            (U.type === "mrow" || U.type === "mstyle") &&
            U.data.length === 1
          ) {
            U = U.data[0];
          }
          if (U.type === "mi" || U.type === "mo") {
            if (
              U.data.join("").length === 1 &&
              y.rscale === 1 &&
              !y.sH &&
              !U.Get("largeop")
            ) {
              L = J = 0;
            }
          }
        }
        A.subscriptshift =
          A.subscriptshift === "" ? 0 : this.CHTMLlength2em(A.subscriptshift);
        A.superscriptshift =
          A.superscriptshift === ""
            ? 0
            : this.CHTMLlength2em(A.superscriptshift);
        var I = G.w;
        if (H) {
          P.w += N;
        }
        if (z) {
          W.w += N;
        }
        if (!z) {
          if (H) {
            J = Math.max(
              J,
              h.TEX.sub1,
              B * P.h - (4 / 5) * X,
              A.subscriptshift
            );
            H.style.verticalAlign = h.Em(-J / B);
            H.style.paddingRight = h.Em(N / B);
            G.combine(P, I, -J);
          }
        } else {
          if (!H) {
            R =
              h.TEX[
                A.displaystyle ? "sup1" : A.texprimestyle ? "sup3" : "sup2"
              ];
            L = Math.max(L, R, w * W.d + (1 / 4) * X, A.superscriptshift);
            z.style.verticalAlign = h.Em(L / w);
            z.style.paddingLeft = h.Em(Y / w);
            z.style.paddingRight = h.Em(N / w);
            G.combine(W, I + Y, L);
          } else {
            J = Math.max(J, h.TEX.sub2);
            var M = h.TEX.rule_thickness;
            if (L - w * W.d - (B * P.h - J) < 3 * M) {
              J = 3 * M - L + w * W.d + B * P.h;
              Q = (4 / 5) * X - (L - w * W.d);
              if (Q > 0) {
                L += Q;
                J -= Q;
              }
            }
            L = Math.max(L, A.superscriptshift);
            J = Math.max(J, A.subscriptshift);
            H.style.paddingRight = h.Em(N / B);
            z.style.paddingBottom = h.Em(L / w + J / B - W.d - (P.h / B) * w);
            z.style.paddingLeft = h.Em(Y / w);
            z.style.paddingRight = h.Em(N / w);
            E.style.verticalAlign = h.Em(-J);
            G.combine(W, I + Y, L);
            G.combine(P, I, -J);
          }
        }
        G.clean();
        return S;
      },
      CHTMLstretchV: i.mbase.CHTMLstretchV,
      CHTMLstretchH: i.mbase.CHTMLstretchH,
      CHTMLchildNode: function(t, s) {
        var r = ["mjx-base", "mjx-sub", "mjx-sup"];
        if (this.over === 1) {
          r[1] = r[2];
        }
        return h.getNode(t, r[s]);
      }
    });
    i.mfrac.Augment({
      toCommonHTML: function(M) {
        M = this.CHTMLdefaultNode(M, {
          childNodes: ["mjx-numerator", "mjx-denominator"],
          childOptions: { autowidth: true },
          forceChild: true,
          noBBox: true,
          minChildren: 2
        });
        var w = this.getValues(
          "linethickness",
          "displaystyle",
          "numalign",
          "denomalign",
          "bevelled"
        );
        var N = w.displaystyle;
        var C = M.firstChild,
          s = M.lastChild;
        var x = h.addElement(M, "mjx-box");
        x.appendChild(C);
        x.appendChild(s);
        M.appendChild(x);
        if (w.numalign !== "center") {
          C.style.textAlign = w.numalign;
        }
        if (w.denomalign !== "center") {
          s.style.textAlign = w.denomalign;
        }
        var O = this.CHTMLbboxFor(0),
          A = this.CHTMLbboxFor(1),
          B = h.BBOX.empty(this.CHTML),
          E = O.rscale,
          y = A.rscale;
        w.linethickness = Math.max(
          0,
          h.thickness2em(w.linethickness || "0", B.scale)
        );
        var L = h.TEX.min_rule_thickness / h.em,
          S = h.TEX.axis_height;
        var I = w.linethickness,
          K,
          J,
          G,
          F;
        if (w.bevelled) {
          x.className += " MJXc-bevelled";
          var R = N ? 0.4 : 0.15;
          var D = Math.max(E * (O.h + O.d), y * (A.h + A.d)) + 2 * R;
          var Q = h.Element("mjx-bevel");
          x.insertBefore(Q, s);
          var r = h.createDelimiter(Q, 47, D);
          G = (E * (O.d - O.h)) / 2 + S + R;
          F = (y * (A.d - A.h)) / 2 + S - R;
          if (G) {
            C.style.verticalAlign = h.Em(G / E);
          }
          if (F) {
            s.style.verticalAlign = h.Em(F / y);
          }
          Q.style.marginLeft = Q.style.marginRight = h.Em(-R / 2);
          B.combine(O, 0, G);
          B.combine(r, E * O.w - R / 2, 0);
          B.combine(A, E * O.w + r.w - R, F);
          B.clean();
        } else {
          x.className += " MJXc-stacked";
          if (N) {
            G = h.TEX.num1;
            F = h.TEX.denom1;
          } else {
            G = I === 0 ? h.TEX.num3 : h.TEX.num2;
            F = h.TEX.denom2;
          }
          if (I === 0) {
            K = Math.max((N ? 7 : 3) * h.TEX.rule_thickness, 2 * L);
            J = G - O.d * E - (A.h * y - F);
            if (J < K) {
              G += (K - J) / 2;
              F += (K - J) / 2;
            }
          } else {
            K = Math.max((N ? 2 : 0) * L + I, I / 2 + 1.5 * L);
            I = Math.max(I, L);
            J = G - O.d * E - (S + I / 2);
            if (J < K) {
              G += K - J;
            }
            J = S - I / 2 - (A.h * y - F);
            if (J < K) {
              F += K - J;
            }
            O.L = O.R = A.L = A.R = 0.1;
            var z = h.addElement(x, "mjx-line", {
              style: {
                "border-bottom": h.Px(I * B.scale, 1) + " solid",
                top: h.Em(-I / 2 - S)
              }
            });
          }
          B.combine(O, 0, G);
          B.combine(A, 0, -F);
          B.clean();
          x.style.width = h.Em(B.w);
          C.style.width = h.Em(B.w / E);
          s.style.width = h.Em(B.w / y);
          if (z) {
            z.style.width = x.style.width;
          }
          C.style.top = h.Em(-B.h / E);
          s.style.bottom = h.Em(-B.d / y);
          h.addElement(M, "mjx-vsize", {
            style: { height: h.Em(B.h + B.d), verticalAlign: h.Em(-B.d) }
          });
        }
        if (!this.texWithDelims && !this.useMMLspacing) {
          var P = h.TEX.nulldelimiterspace;
          x.style.padding = "0 " + h.Em(P);
          B.l += P;
          B.r += P;
          B.w += 2 * P;
        }
        return M;
      },
      CHTMLcanStretch: function(r) {
        return false;
      }
    });
    i.msqrt.Augment({
      toCommonHTML: function(v) {
        v = this.CHTMLdefaultNode(v, {
          childNodes: ["mjx-box", "mjx-root"],
          forceChild: true,
          noBBox: true
        });
        var u = v.firstChild || h.Element("mjx-box");
        var D = h.addElement(v, "mjx-box");
        D.appendChild(u);
        var E = this.CHTMLbboxFor(0),
          B = h.BBOX.empty(this.CHTML);
        var F = h.TEX.rule_thickness,
          w = h.TEX.surd_height,
          s = F,
          r,
          C;
        if (this.Get("displaystyle")) {
          s = h.TEX.x_height;
        }
        r = F + s / 4;
        C = E.h + E.d + r + F;
        var y = h.Element("mjx-surd");
        D.insertBefore(y, u);
        var z = h.createDelimiter(y, 8730, [C - 0.04, C]);
        if (z.h + z.d > C) {
          r = (z.h + z.d - (C - F)) / 2;
        }
        C = E.h + r + F;
        var A = this.CHTMLaddRoot(v, z, z.h + z.d - C);
        u.style.paddingTop = h.Em(r);
        u.style.borderTop = h.Px(w * E.scale, 1) + " solid";
        D.style.paddingTop = h.Em(2 * F - w);
        E.h += r + 2 * F;
        B.combine(z, A, C - z.h);
        B.combine(E, A + z.w, 0);
        B.clean();
        return v;
      },
      CHTMLaddRoot: function() {
        return 0;
      }
    });
    i.mroot.Augment({
      toCommonHTML: i.msqrt.prototype.toCommonHTML,
      CHTMLaddRoot: function(z, t, u) {
        if (!this.data[1]) {
          return;
        }
        var y = this.CHTML,
          A = this.data[1].CHTML,
          v = z.firstChild;
        var r = A.rscale;
        var s = this.CHTMLrootHeight(A, t, r) - u;
        var x = Math.min(A.w, A.r);
        var B = Math.max(x, t.offset / r);
        if (s) {
          v.style.verticalAlign = h.Em(s / r);
        }
        if (B > x) {
          v.firstChild.style.paddingLeft = h.Em(B - x);
        }
        B -= t.offset / r;
        v.style.width = h.Em(B);
        y.combine(A, 0, s);
        return B * r;
      },
      CHTMLrootHeight: function(t, r, s) {
        return 0.45 * (r.h + r.d - 0.9) + r.offset + Math.max(0, t.d - 0.075);
      }
    });
    i.mfenced.Augment({
      toCommonHTML: function(u) {
        u = this.CHTMLcreateNode(u);
        this.CHTMLhandleStyle(u);
        this.CHTMLhandleScale(u);
        this.CHTMLaddChild(u, "open", {});
        for (var t = 0, r = this.data.length; t < r; t++) {
          this.CHTMLaddChild(u, "sep" + t, {});
          this.CHTMLaddChild(u, t, {});
        }
        this.CHTMLaddChild(u, "close", {});
        var s = this.CHTML.h,
          v = this.CHTML.d;
        this.CHTMLstretchChildV("open", s, v);
        for (t = 0, r = this.data.length; t < r; t++) {
          this.CHTMLstretchChildV("sep" + t, s, v);
          this.CHTMLstretchChildV(t, s, v);
        }
        this.CHTMLstretchChildV("close", s, v);
        this.CHTMLhandleSpace(u);
        this.CHTMLhandleBBox(u);
        this.CHTMLhandleColor(u);
        return u;
      }
    });
    i.mrow.Augment({
      toCommonHTML: function(v, s) {
        s = s || {};
        v = this.CHTMLdefaultNode(v);
        var y = this.CHTML,
          u = y.h,
          w = y.d,
          x;
        for (var t = 0, r = this.data.length; t < r; t++) {
          this.CHTMLstretchChildV(t, u, w);
          if (this.data[t] && this.data[t].CHTML && this.data[t].CHTML.w < 0) {
            x = true;
          }
        }
        if (this.CHTMLlineBreaks()) {
          this.CHTMLmultiline(v);
          if (s.autowidth) {
            v.style.width = "";
          }
        } else {
          if (x && y.w) {
            v.style.width = h.Em(Math.max(0, y.w));
          }
          if (y.w < 0) {
            v.style.marginRight = h.Em(y.w);
          }
        }
        return v;
      },
      CHTMLlineBreaks: function() {
        if (!this.parent.linebreakContainer) {
          return false;
        }
        return (
          (l.automatic && this.CHTML.w > h.linebreakWidth) || this.hasNewline()
        );
      },
      CHTMLstretchV: function(r, s) {
        this.CHTMLstretchChildV(this.CoreIndex(), r, s);
        return this.CHTML;
      },
      CHTMLstretchH: function(s, r) {
        this.CHTMLstretchChildH(this.CoreIndex(), r, s);
        return this.CHTML;
      }
    });
    i.mstyle.Augment({
      toCommonHTML: function(r) {
        r = this.CHTMLdefaultNode(r);
        if (this.scriptlevel && this.data[0]) {
          this.CHTML.rescale(this.data[0].CHTML.rscale);
        }
        return r;
      }
    });
    i.TeXAtom.Augment({
      toCommonHTML: function(w, u) {
        if (!u || !u.stretch) {
          w = this.CHTMLdefaultNode(w);
        }
        if (this.texClass === i.TEXCLASS.VCENTER) {
          var r = h.TEX.axis_height,
            t = this.CHTML;
          var s = r - (t.h + t.d) / 2 + t.d;
          if (Math.abs(s) > 0.001) {
            w.style.verticalAlign = h.Em(s);
            t.h += s;
            t.t += s;
            t.d -= s;
            t.b -= s;
          }
        }
        return w;
      },
      CHTMLstretchV: function(r, s) {
        this.CHTML.updateFrom(this.Core().CHTMLstretchV(r, s));
        this.toCommonHTML(this.CHTMLnodeElement(), { stretch: true });
        return this.CHTML;
      },
      CHTMLstretchH: function(s, r) {
        this.CHTML.updateFrom(this.CHTMLstretchCoreH(s, r));
        this.toCommonHTML(s, { stretch: true });
        return this.CHTML;
      }
    });
    i.semantics.Augment({
      toCommonHTML: function(r) {
        r = this.CHTMLcreateNode(r);
        if (this.data[0]) {
          this.data[0].toCommonHTML(r);
          this.CHTML.updateFrom(this.data[0].CHTML);
          this.CHTMLhandleBBox(r);
        }
        return r;
      }
    });
    i.annotation.Augment({
      toCommonHTML: function(r) {
        return this.CHTMLcreateNode(r);
      }
    });
    i["annotation-xml"].Augment({ toCommonHTML: i.mbase.CHTMLautoload });
    i.ms.Augment({ toCommonHTML: i.mbase.CHTMLautoload });
    i.mglyph.Augment({ toCommonHTML: i.mbase.CHTMLautoload });
    i.menclose.Augment({ toCommonHTML: i.mbase.CHTMLautoload });
    i.maction.Augment({ toCommonHTML: i.mbase.CHTMLautoload });
    i.mmultiscripts.Augment({ toCommonHTML: i.mbase.CHTMLautoload });
    i.mtable.Augment({ toCommonHTML: i.mbase.CHTMLautoload });
    MathJax.Hub.Register.StartupHook("onLoad", function() {
      setTimeout(MathJax.Callback(["loadComplete", h, "jax.js"]), 0);
    });
  });
  MathJax.Hub.Register.StartupHook("End Cookie", function() {
    if (c.config.menuSettings.zoom !== "None") {
      j.Require("[MathJax]/extensions/MathZoom.js");
    }
  });
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.CommonHTML);
MathJax.Hub.Register.StartupHook("CommonHTML Jax Ready", function() {
  var g = "2.7.1";
  var b = MathJax.ElementJax.mml,
    a = MathJax.Hub.config,
    e = MathJax.OutputJax.CommonHTML,
    d = MathJax.Hub.SplitList;
  var c = -1,
    f = 1000000;
  b.mtable.Augment({
    toCommonHTML: function(l) {
      var m = { rows: [], labels: [], labeled: false };
      l = this.CHTMLdefaultNode(l, { noBBox: true, childOptions: m });
      var k = e.Element("mjx-table");
      while (l.firstChild) {
        k.appendChild(l.firstChild);
      }
      l.appendChild(k);
      var h = this.getValues(
        "columnalign",
        "rowalign",
        "columnspacing",
        "rowspacing",
        "columnwidth",
        "equalcolumns",
        "equalrows",
        "columnlines",
        "rowlines",
        "frame",
        "framespacing",
        "align",
        "width",
        "side",
        "minlabelspacing",
        "useHeight"
      );
      var j = e.TEX.min_rule_thickness / e.em;
      m.t = e.Px(j * this.CHTML.scale, 1);
      this.CHTMLgetBoxSizes(h, m);
      this.CHTMLgetAttributes(h, m);
      this.CHTMLadjustCells(h, m);
      if (h.frame) {
        k.style.border = m.t + " " + h.frame;
      }
      this.CHTMLalignV(h, m, l);
      this.CHTMLcolumnWidths(h, m, l);
      this.CHTMLstretchCells(h, m);
      if (m.labeled) {
        this.CHTMLaddLabels(h, m, l, k);
      }
      var i = this.CHTML;
      i.w = i.r = m.R;
      i.h = i.t = m.T - m.B;
      i.d = i.b = m.B;
      if (!h.frame && !i.pwidth) {
        l.style.padding = "0 " + e.Em(1 / 6);
        i.L = i.R = 1 / 6;
      }
      this.CHTMLhandleSpace(l);
      this.CHTMLhandleBBox(l);
      this.CHTMLhandleColor(l);
      return l;
    },
    CHTMLgetBoxSizes: function(z, k) {
      var r = e.FONTDATA.lineH * z.useHeight,
        t = e.FONTDATA.lineD * z.useHeight;
      var y = [],
        h = [],
        l = [],
        w = -1,
        q,
        n;
      for (q = 0, n = this.data.length; q < n; q++) {
        var B = this.data[q],
          A = B.type === "mtr" ? 0 : c;
        y[q] = r;
        h[q] = t;
        for (var p = A, v = B.data.length + A; p < v; p++) {
          if (l[p] == null) {
            l[p] = -f;
            if (p > w) {
              w = p;
            }
          }
          var u = B.data[p - A].CHTML;
          if (u.h > y[q]) {
            y[q] = u.h;
          }
          if (u.d > h[q]) {
            h[q] = u.d;
          }
          if (u.w > l[p]) {
            l[p] = u.w;
          }
        }
      }
      if (z.equalrows) {
        k.HD = true;
        var x = Math.max.apply(Math, y);
        var o = Math.max.apply(Math, h);
        for (q = 0, n = y.length; q < n; q++) {
          y[q] = x;
          h[q] = o;
        }
      }
      k.H = y;
      k.D = h;
      (k.W = l), (k.J = w);
    },
    CHTMLgetAttributes: function(v, j) {
      var l = d(v.columnspacing),
        x = d(v.rowspacing),
        t = d(v.columnalign),
        r = d(v.rowalign),
        k = d(v.columnlines),
        w = d(v.rowlines),
        o = d(v.columnwidth),
        n = [],
        q,
        p,
        u = j.J,
        s = j.rows.length - 1;
      for (q = 0, p = l.length; q < p; q++) {
        l[q] = this.CHTMLlength2em(l[q]);
      }
      for (q = 0, p = x.length; q < p; q++) {
        x[q] = this.CHTMLlength2em(x[q]);
      }
      while (l.length < u) {
        l.push(l[l.length - 1]);
      }
      while (t.length <= u) {
        t.push(t[t.length - 1]);
      }
      while (k.length < u) {
        k.push(k[k.length - 1]);
      }
      while (o.length <= u) {
        o.push(o[o.length - 1]);
      }
      while (x.length < s) {
        x.push(x[x.length - 1]);
      }
      while (r.length <= s) {
        r.push(r[r.length - 1]);
      }
      while (w.length < s) {
        w.push(w[w.length - 1]);
      }
      t[c] = v.side.substr(0, 1) === "l" ? "left" : "right";
      for (q = 0; q <= s; q++) {
        var y = this.data[q];
        n[q] = [];
        if (y.rowalign) {
          r[q] = y.rowalign;
        }
        if (y.columnalign) {
          n[q] = d(y.columnalign);
          while (n[q].length <= u) {
            n[q].push(n[q][n[q].length - 1]);
          }
        }
      }
      var h = d(v.framespacing);
      if (h.length != 2) {
        h = d(this.defaults.framespacing);
      }
      h[0] = Math.max(0, this.CHTMLlength2em(h[0]));
      h[1] = Math.max(0, this.CHTMLlength2em(h[1]));
      if (
        v.columnlines.replace(/none/g, "").replace(/ /g, "") !== "" ||
        v.rowlines.replace(/none/g, "").replace(/ /g, "") !== ""
      ) {
        v.fspace = true;
      }
      if (v.frame === b.LINES.NONE) {
        delete v.frame;
      } else {
        v.fspace = true;
      }
      if (v.frame) {
        h[0] = Math.max(0, h[0]);
        h[1] = Math.max(0, h[1]);
      }
      if (v.fspace) {
        l[u] = h[0];
        x[s] = h[1];
      } else {
        l[u] = x[s] = 0;
      }
      k[u] = w[s] = b.LINES.NONE;
      j.CSPACE = l;
      j.RSPACE = x;
      j.CALIGN = t;
      j.RALIGN = r;
      j.CLINES = k;
      j.RLINES = w;
      j.CWIDTH = o;
      j.RCALIGN = n;
      j.FSPACE = h;
    },
    CHTMLadjustCells: function(k, q) {
      var P = q.rows,
        U = q.CSPACE,
        n = q.CLINES,
        w = q.RSPACE,
        E = q.RLINES,
        S = q.CALIGN,
        p = q.RALIGN,
        F = q.RCALIGN;
      U[q.J] *= 2;
      w[P.length - 1] *= 2;
      var o = "0",
        G,
        r,
        y,
        J,
        l,
        N,
        Q = 0;
      if (k.fspace) {
        Q = q.FSPACE[1];
        o = e.Em(q.FSPACE[1]);
      }
      q.RHD = [];
      q.RH = [];
      for (var O = 0, I = P.length; O < I; O++) {
        var v = P[O],
          u = this.data[O];
        G = w[O] / 2;
        J = null;
        y = "0";
        if (E[O] !== b.LINES.NONE && E[O] !== "") {
          J = q.t + " " + E[O];
        }
        q.RH[O] = Q + q.H[O];
        Q = Math.max(0, G);
        q.RHD[O] = q.RH[O] + Q + q.D[O];
        G = e.Em(Q);
        if (k.fspace) {
          y = e.Em(q.FSPACE[0]);
        }
        for (var K = 0, x = v.length; K < x; K++) {
          var C = u.type === "mtr" ? 0 : c;
          cell = v[K].style;
          l = u.data[K - C].CHTML;
          r = U[K] / 2;
          if (n[K] !== b.LINES.NONE) {
            cell.borderRight = q.t + " " + n[K];
            r -= 1 / e.em / 2;
          }
          r = e.Em(Math.max(0, r));
          cell.padding = o + " " + r + " 0px " + y;
          if (J) {
            cell.borderBottom = J;
          }
          y = r;
          N = u.data[K - C].rowalign || this.data[O].rowalign || p[O];
          var z = Math.max(1, l.h),
            A = Math.max(0.2, l.d),
            h = q.H[O] + q.D[O] - (z + A),
            t = v[K].firstChild.style;
          if (N === b.ALIGN.TOP) {
            if (h) {
              t.marginBottom = e.Em(h);
            }
            cell.verticalAlign = "top";
          } else {
            if (N === b.ALIGN.BOTTOM) {
              cell.verticalAlign = "bottom";
              if (h) {
                t.marginTop = e.Em(h);
              }
            } else {
              if (N === b.ALIGN.CENTER) {
                if (h) {
                  t.marginTop = t.marginBottom = e.Em(h / 2);
                }
                cell.verticalAlign = "middle";
              } else {
                if (z !== q.H[O]) {
                  t.marginTop = e.Em(q.H[O] - z);
                }
              }
            }
          }
          N = u.data[K - C].columnalign || F[O][K] || S[K];
          if (N !== b.ALIGN.CENTER) {
            cell.textAlign = N;
          }
        }
        v.node.style.height = e.Em(q.RHD[O]);
        o = G;
      }
      U[q.J] /= 2;
      w[P.length - 1] /= 2;
    },
    CHTMLalignV: function(w, k, o) {
      var m,
        t = k.rows.length,
        v = k.H,
        j = k.D,
        x = k.RSPACE;
      if (typeof w.align !== "string") {
        w.align = String(w.align);
      }
      if (w.align.match(/(top|bottom|center|baseline|axis)( +(-?\d+))?/)) {
        m = parseInt(RegExp.$3 || "0");
        w.align = RegExp.$1;
        if (m < 0) {
          m += k.rows.length + 1;
        }
        if (m > t || m <= 0) {
          m = null;
        }
      } else {
        w.align = this.defaults.align;
      }
      var p = 0,
        l = 0,
        u = e.TEX.axis_height;
      if (w.fspace) {
        p += k.FSPACE[1];
      }
      if (w.frame) {
        p += 2 / e.em;
        l += 1 / e.em;
      }
      for (var q = 0; q < t; q++) {
        var r = v[q],
          s = j[q];
        p += r + s + x[q];
        if (m) {
          if (q === m - 1) {
            l +=
              {
                top: r + s,
                bottom: 0,
                center: (r + s) / 2,
                baseline: s,
                axis: u + s
              }[w.align] + x[q];
          }
          if (q >= m) {
            l += r + s + x[q];
          }
        }
      }
      if (!m) {
        l = {
          top: p,
          bottom: 0,
          center: p / 2,
          baseline: p / 2,
          axis: p / 2 - u
        }[w.align];
      }
      if (l) {
        o.style.verticalAlign = e.Em(-l);
      }
      k.T = p;
      k.B = l;
    },
    CHTMLcolumnWidths: function(l, r, A) {
      var I = r.CWIDTH,
        K = r.CSPACE,
        u = r.J,
        F;
      var G = 0,
        n = false,
        y = l.width.match(/%$/);
      var H, B, v;
      if (l.width !== "auto" && !y) {
        G = Math.max(0, this.CHTMLlength2em(l.width, r.R));
        n = true;
      }
      if (l.equalcolumns) {
        if (y) {
          var z = e.Percent(1 / (u + 1));
          for (F = 0; F <= u; F++) {
            I[F] = z;
          }
        } else {
          v = Math.max.apply(Math, r.W);
          if (l.width !== "auto") {
            var q = l.fspace ? r.FSPACE[0] + (l.frame ? 2 / e.em : 0) : 0;
            for (F = 0; F <= u; F++) {
              q += K[F];
            }
            v = Math.max((G - q) / (u + 1), v);
          }
          v = e.Em(v);
          for (F = 0; F <= u; F++) {
            I[F] = v;
          }
        }
        n = true;
      }
      var E = 0;
      if (l.fspace) {
        E = r.FSPACE[0];
      }
      var s = [],
        D = [],
        h = [],
        o = [];
      var t = r.rows[0];
      for (F = 0; F <= u; F++) {
        o[F] = r.W[F];
        if (I[F] === "auto") {
          s.push(F);
        } else {
          if (I[F] === "fit") {
            D.push(F);
          } else {
            if (I[F].match(/%$/)) {
              h.push(F);
            } else {
              o[F] = this.CHTMLlength2em(I[F], o[F]);
            }
          }
        }
        E += o[F] + K[F];
        if (t[F]) {
          t[F].style.width = e.Em(o[F]);
        }
      }
      if (l.frame) {
        E += 2 / e.em;
      }
      var C = D.length > 0;
      if (n) {
        if (y) {
          for (F = 0; F <= u; F++) {
            cell = t[F].style;
            if (I[F] === "auto" && !C) {
              cell.width = "";
            } else {
              if (I[F] === "fit") {
                cell.width = "";
              } else {
                if (I[F].match(/%$/)) {
                  cell.width = I[F];
                } else {
                  cell.minWidth = cell.maxWidth = cell.width;
                }
              }
            }
          }
        } else {
          if (G > E) {
            var k = 0;
            for (H = 0, B = h.length; H < B; H++) {
              F = h[H];
              v = Math.max(o[F], this.CHTMLlength2em(I[F], G));
              k += v - o[F];
              o[F] = v;
              t[F].style.width = e.Em(v);
            }
            E += k;
          }
          if (!C) {
            D = s;
          }
          if (G > E && D.length) {
            var x = (G - E) / D.length;
            for (H = 0, B = D.length; H < B; H++) {
              F = D[H];
              o[F] += x;
              t[F].style.width = e.Em(o[F]);
            }
            E = G;
          }
        }
      }
      o[c] = r.W[c];
      r.W = o;
      r.R = E;
      if (y) {
        this.CHTML.pwidth = l.width;
        this.CHTML.mwidth = e.Em(E);
        A.style.width = A.firstChild.style.width = "100%";
      }
    },
    CHTMLstretchCells: function(x, l) {
      var y = l.rows,
        w = l.H,
        k = l.D,
        m = l.W,
        t = l.J,
        s = y.length - 1;
      for (var o = 0; o <= s; o++) {
        var z = y[o],
          q = this.data[o];
        var p = w[o],
          r = k[o];
        for (var n = 0; n <= t; n++) {
          var v = z[n],
            u = q.data[n];
          if (!u) {
            continue;
          }
          if (u.CHTML.stretch === "V") {
            u.CHTMLstretchV(p, r);
          } else {
            if (u.CHTML.stretch === "H") {
              u.CHTMLstretchH(v, m[n]);
            }
          }
        }
      }
    },
    CHTMLaddLabels: function(h, k, w, B) {
      var q = this.getValues(
        "indentalignfirst",
        "indentshiftfirst",
        "indentalign",
        "indentshift"
      );
      if (q.indentalignfirst !== b.INDENTALIGN.INDENTALIGN) {
        q.indentalign = q.indentalignfirst;
      }
      if (q.indentalign === b.INDENTALIGN.AUTO) {
        q.indentalign = a.displayAlign;
      }
      if (q.indentshiftfirst !== b.INDENTSHIFT.INDENTSHIFT) {
        q.indentshift = q.indentshiftfirst;
      }
      if (q.indentshift === "auto") {
        q.indentshift = "0";
      }
      var z = this.CHTMLlength2em(q.indentshift, e.cwidth);
      var A = this.CHTMLlength2em(h.minlabelspacing, 0.8);
      var p = A + k.W[c],
        y = 0,
        D = k.R;
      var n = this.CHTMLlength2em(a.displayIndent, e.cwidth);
      var t = k.CALIGN[c] === b.INDENTALIGN.RIGHT ? -1 : 1;
      if (q.indentalign === b.INDENTALIGN.CENTER) {
        D += 2 * (p - t * (z + n));
        z += n;
      } else {
        if (k.CALIGN[c] === q.indentalign) {
          if (n < 0) {
            y = t * n;
            n = 0;
          }
          z += t * n;
          if (p > t * z) {
            z = t * p;
          }
          z += y;
          z *= t;
          D += z;
        } else {
          D += p - t * z + n;
          z -= t * n;
          z *= -t;
        }
      }
      var o = e.addElement(w, "mjx-box", {
        style: { width: "100%", "text-align": q.indentalign }
      });
      o.appendChild(B);
      var C = e.Element("mjx-itable");
      B.style.display = "inline-table";
      if (!B.style.width) {
        B.style.width = "auto";
      }
      C.style.verticalAlign = "top";
      B.style.verticalAlign = e.Em(k.T - k.B - k.H[0]);
      w.style.verticalAlign = "";
      if (z) {
        if (q.indentalign === b.INDENTALIGN.CENTER) {
          B.style.marginLeft = e.Em(z);
          B.style.marginRight = e.Em(-z);
        } else {
          var u =
            "margin" +
            (q.indentalign === b.INDENTALIGN.RIGHT ? "Right" : "Left");
          B.style[u] = e.Em(z);
        }
      }
      if (k.CALIGN[c] === "left") {
        w.insertBefore(C, o);
        C.style.marginRight = e.Em(-k.W[c] - y);
        if (y) {
          C.style.marginLeft = e.Em(y);
        }
      } else {
        w.appendChild(C);
        C.style.marginLeft = e.Em(-k.W[c] + y);
      }
      var l = k.labels,
        j = 0;
      if (h.fspace) {
        j = k.FSPACE[0] + (h.frame ? 1 / e.em : 0);
      }
      for (var x = 0, v = l.length; x < v; x++) {
        if (l[x] && this.data[x].data[0]) {
          C.appendChild(l[x]);
          var r = this.data[x].data[0].CHTML;
          j = k.RH[x] - Math.max(1, r.h);
          if (j) {
            l[x].firstChild.firstChild.style.marginTop = e.Em(j);
          }
          l[x].style.height = e.Em(k.RHD[x]);
        } else {
          e.addElement(C, "mjx-label", { style: { height: e.Em(k.RHD[x]) } });
        }
      }
      w.style.width = this.CHTML.pwidth = "100%";
      w.style.minWidth = this.CHTML.mwidth = e.Em(Math.max(0, D));
    }
  });
  b.mtr.Augment({
    toCommonHTML: function(l, j) {
      l = this.CHTMLcreateNode(l);
      this.CHTMLhandleStyle(l);
      this.CHTMLhandleScale(l);
      if (!j) {
        j = { rows: [], labels: [] };
      }
      var n = [];
      j.rows.push(n);
      n.node = l;
      j.labels.push(null);
      for (var k = 0, h = this.data.length; k < h; k++) {
        n.push(this.CHTMLaddChild(l, k, j));
      }
      this.CHTMLhandleColor(l);
      return l;
    }
  });
  b.mlabeledtr.Augment({
    toCommonHTML: function(n, k) {
      n = this.CHTMLcreateNode(n);
      this.CHTMLhandleStyle(n);
      this.CHTMLhandleScale(n);
      if (!k) {
        k = { rows: [], labels: [] };
      }
      var o = [];
      k.rows.push(o);
      o.node = n;
      var j = e.Element("mjx-label");
      k.labels.push(j);
      this.CHTMLaddChild(j, 0, k);
      if (this.data[0]) {
        k.labeled = true;
      }
      for (var l = 1, h = this.data.length; l < h; l++) {
        o.push(this.CHTMLaddChild(n, l, k));
      }
      this.CHTMLhandleColor(n);
      return n;
    }
  });
  b.mtd.Augment({
    toCommonHTML: function(l, i) {
      l = this.CHTMLdefaultNode(l, i);
      e.addElement(l.firstChild, "mjx-strut");
      if (this.isEmbellished()) {
        var m = this.CoreMO(),
          h = this.CHTML;
        if (m.CHTMLcanStretch("Vertical")) {
          h.stretch = "V";
        } else {
          if (m.CHTMLcanStretch("Horizontal")) {
            h.stretch = "H";
          }
        }
        if (h.stretch) {
          var j = m.Get("minsize", true);
          if (j) {
            if (h.stretch === "V") {
              var n = h.h + h.d;
              if (n) {
                var k = this.CHTMLlength2em(j, n) / n;
                if (k > 1) {
                  h.h *= k;
                  h.d *= k;
                }
              }
            } else {
              h.w = Math.max(h.w, this.CHTMLlength2em(j, h.w));
            }
          }
        }
      }
      return l;
    }
  });
  MathJax.Hub.Startup.signal.Post("CommonHTML mtable Ready");
  MathJax.Ajax.loadComplete(e.autoloadDir + "/mtable.js");
});
(function(i, b, e, g) {
  var h;
  var j, a, d;
  var f = "'Times New Roman',Times,STIXGeneral,serif";
  var m = {
    ".MJXp-script": { "font-size": ".8em" },
    ".MJXp-right": {
      "-webkit-transform-origin": "right",
      "-moz-transform-origin": "right",
      "-ms-transform-origin": "right",
      "-o-transform-origin": "right",
      "transform-origin": "right"
    },
    ".MJXp-bold": { "font-weight": "bold" },
    ".MJXp-italic": { "font-style": "italic" },
    ".MJXp-scr": { "font-family": "MathJax_Script," + f },
    ".MJXp-frak": { "font-family": "MathJax_Fraktur," + f },
    ".MJXp-sf": { "font-family": "MathJax_SansSerif," + f },
    ".MJXp-cal": { "font-family": "MathJax_Caligraphic," + f },
    ".MJXp-mono": { "font-family": "MathJax_Typewriter," + f },
    ".MJXp-largeop": { "font-size": "150%" },
    ".MJXp-largeop.MJXp-int": { "vertical-align": "-.2em" },
    ".MJXp-math": {
      display: "inline-block",
      "line-height": "1.2",
      "text-indent": "0",
      "font-family": f,
      "white-space": "nowrap",
      "border-collapse": "collapse"
    },
    ".MJXp-display": {
      display: "block",
      "text-align": "center",
      margin: "1em 0"
    },
    ".MJXp-math span": { display: "inline-block" },
    ".MJXp-box": { display: "block!important", "text-align": "center" },
    ".MJXp-box:after": { content: '" "' },
    ".MJXp-rule": { display: "block!important", "margin-top": ".1em" },
    ".MJXp-char": { display: "block!important" },
    ".MJXp-mo": { margin: "0 .15em" },
    ".MJXp-mfrac": { margin: "0 .125em", "vertical-align": ".25em" },
    ".MJXp-denom": { display: "inline-table!important", width: "100%" },
    ".MJXp-denom > *": { display: "table-row!important" },
    ".MJXp-surd": { "vertical-align": "top" },
    ".MJXp-surd > *": { display: "block!important" },
    ".MJXp-script-box > * ": { display: "table!important", height: "50%" },
    ".MJXp-script-box > * > *": {
      display: "table-cell!important",
      "vertical-align": "top"
    },
    ".MJXp-script-box > *:last-child > *": { "vertical-align": "bottom" },
    ".MJXp-script-box > * > * > *": { display: "block!important" },
    ".MJXp-mphantom": { visibility: "hidden" },
    ".MJXp-munderover": { display: "inline-table!important" },
    ".MJXp-over": { display: "inline-block!important", "text-align": "center" },
    ".MJXp-over > *": { display: "block!important" },
    ".MJXp-munderover > *": { display: "table-row!important" },
    ".MJXp-mtable": { "vertical-align": ".25em", margin: "0 .125em" },
    ".MJXp-mtable > *": {
      display: "inline-table!important",
      "vertical-align": "middle"
    },
    ".MJXp-mtr": { display: "table-row!important" },
    ".MJXp-mtd": {
      display: "table-cell!important",
      "text-align": "center",
      padding: ".5em 0 0 .5em"
    },
    ".MJXp-mtr > .MJXp-mtd:first-child": { "padding-left": 0 },
    ".MJXp-mtr:first-child > .MJXp-mtd": { "padding-top": 0 },
    ".MJXp-mlabeledtr": { display: "table-row!important" },
    ".MJXp-mlabeledtr > .MJXp-mtd:first-child": { "padding-left": 0 },
    ".MJXp-mlabeledtr:first-child > .MJXp-mtd": { "padding-top": 0 },
    ".MJXp-merror": {
      "background-color": "#FFFF88",
      color: "#CC0000",
      border: "1px solid #CC0000",
      padding: "1px 3px",
      "font-style": "normal",
      "font-size": "90%"
    }
  };
  (function() {
    for (var n = 0; n < 10; n++) {
      var o = "scaleX(." + n + ")";
      m[".MJXp-scale" + n] = {
        "-webkit-transform": o,
        "-moz-transform": o,
        "-ms-transform": o,
        "-o-transform": o,
        transform: o
      };
    }
  })();
  var k = 1000000;
  var c = "V",
    l = "H";
  g.Augment({
    settings: b.config.menuSettings,
    config: { styles: m },
    hideProcessedMath: false,
    maxStretchyParts: 1000,
    Config: function() {
      if (!this.require) {
        this.require = [];
      }
      this.SUPER(arguments).Config.call(this);
      var n = this.settings;
      if (n.scale) {
        this.config.scale = n.scale;
      }
      this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
    },
    Startup: function() {
      j = MathJax.Extension.MathEvents.Event;
      a = MathJax.Extension.MathEvents.Touch;
      d = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = j.ContextMenu;
      this.Mousedown = j.AltContextMenu;
      this.Mouseover = d.Mouseover;
      this.Mouseout = d.Mouseout;
      this.Mousemove = d.Mousemove;
      var n = e.addElement(document.body, "div", { style: { width: "5in" } });
      this.pxPerInch = n.offsetWidth / 5;
      n.parentNode.removeChild(n);
      return i.Styles(this.config.styles, ["InitializePHTML", this]);
    },
    InitializePHTML: function() {},
    preTranslate: function(p) {
      var s = p.jax[this.id],
        t,
        q = s.length,
        u,
        r,
        v,
        o,
        n;
      for (t = 0; t < q; t++) {
        u = s[t];
        if (!u.parentNode) {
          continue;
        }
        r = u.previousSibling;
        if (
          r &&
          String(r.className).match(
            /^MathJax(_PHTML)?(_Display)?( MathJax_Process(ing|ed))?$/
          )
        ) {
          r.parentNode.removeChild(r);
        }
        n = u.MathJax.elementJax;
        if (!n) {
          continue;
        }
        n.PHTML = { display: n.root.Get("display") === "block" };
        v = o = e.Element("span", {
          className: "MathJax_PHTML",
          id: n.inputID + "-Frame",
          isMathJax: true,
          jaxID: this.id,
          oncontextmenu: j.Menu,
          onmousedown: j.Mousedown,
          onmouseover: j.Mouseover,
          onmouseout: j.Mouseout,
          onmousemove: j.Mousemove,
          onclick: j.Click,
          ondblclick: j.DblClick,
          onkeydown: j.Keydown,
          tabIndex: b.getTabOrder(n)
        });
        if (b.Browser.noContextMenu) {
          v.ontouchstart = a.start;
          v.ontouchend = a.end;
        }
        if (n.PHTML.display) {
          o = e.Element("div", { className: "MathJax_PHTML_Display" });
          o.appendChild(v);
        }
        o.className += " MathJax_Processing";
        u.parentNode.insertBefore(o, u);
      }
    },
    Translate: function(o, s) {
      if (!o.parentNode) {
        return;
      }
      var n = o.MathJax.elementJax,
        r = n.root,
        p = document.getElementById(n.inputID + "-Frame"),
        t = n.PHTML.display ? p.parentNode : p;
      this.initPHTML(r, p);
      try {
        r.toPreviewHTML(p);
      } catch (q) {
        if (q.restart) {
          while (p.firstChild) {
            p.removeChild(p.firstChild);
          }
        }
        throw q;
      }
      t.className = t.className.split(/ /)[0];
      if (this.hideProcessedMath) {
        t.className += " MathJax_Processed";
        if (o.MathJax.preview) {
          n.PHTML.preview = o.MathJax.preview;
          delete o.MathJax.preview;
        }
      }
    },
    postTranslate: function(s) {
      var o = s.jax[this.id];
      if (!this.hideProcessedMath) {
        return;
      }
      for (var q = 0, n = o.length; q < n; q++) {
        var p = o[q];
        if (p && p.MathJax.elementJax) {
          p.previousSibling.className = p.previousSibling.className.split(
            / /
          )[0];
          var r = p.MathJax.elementJax.PHTML;
          if (r.preview) {
            r.preview.innerHTML = "";
            r.preview.style.display = "none";
            p.MathJax.preview = r.preview;
            delete r.preview;
          }
        }
      }
    },
    getJaxFromMath: function(n) {
      if (n.parentNode.className.match(/MathJax_PHTML_Display/)) {
        n = n.parentNode;
      }
      do {
        n = n.nextSibling;
      } while (n && n.nodeName.toLowerCase() !== "script");
      return b.getJaxFor(n);
    },
    getHoverSpan: function(n, o) {
      return n.root.PHTMLspanElement();
    },
    getHoverBBox: function(n, q, r) {
      var s = n.root.PHTML,
        p = n.PHTML.outerEm;
      var o = { w: s.w * p, h: s.h * p, d: s.d * p };
      if (s.width) {
        o.width = s.width;
      }
      return o;
    },
    Zoom: function(o, u, s, n, r) {
      u.className = "MathJax";
      this.idPostfix = "-zoom";
      o.root.toPHTML(u, u);
      this.idPostfix = "";
      u.style.position = "absolute";
      if (!width) {
        s.style.position = "absolute";
      }
      var t = u.offsetWidth,
        q = u.offsetHeight,
        v = s.offsetHeight,
        p = s.offsetWidth;
      if (p === 0) {
        p = s.parentNode.offsetWidth;
      }
      u.style.position = s.style.position = "";
      return { Y: -j.getBBox(u).h, mW: p, mH: v, zW: t, zH: q };
    },
    initPHTML: function(o, n) {},
    Remove: function(n) {
      var o = document.getElementById(n.inputID + "-Frame");
      if (o) {
        if (n.PHTML.display) {
          o = o.parentNode;
        }
        o.parentNode.removeChild(o);
      }
      delete n.PHTML;
    },
    ID: 0,
    idPostfix: "",
    GetID: function() {
      this.ID++;
      return this.ID;
    },
    VARIANT: {
      bold: "MJXp-bold",
      italic: "MJXp-italic",
      "bold-italic": "MJXp-bold MJXp-italic",
      script: "MJXp-scr",
      "bold-script": "MJXp-scr MJXp-bold",
      fraktur: "MJXp-frak",
      "bold-fraktur": "MJXp-frak MJXp-bold",
      monospace: "MJXp-mono",
      "sans-serif": "MJXp-sf",
      "-tex-caligraphic": "MJXp-cal"
    },
    MATHSPACE: {
      veryverythinmathspace: 1 / 18,
      verythinmathspace: 2 / 18,
      thinmathspace: 3 / 18,
      mediummathspace: 4 / 18,
      thickmathspace: 5 / 18,
      verythickmathspace: 6 / 18,
      veryverythickmathspace: 7 / 18,
      negativeveryverythinmathspace: -1 / 18,
      negativeverythinmathspace: -2 / 18,
      negativethinmathspace: -3 / 18,
      negativemediummathspace: -4 / 18,
      negativethickmathspace: -5 / 18,
      negativeverythickmathspace: -6 / 18,
      negativeveryverythickmathspace: -7 / 18,
      thin: 0.08,
      medium: 0.1,
      thick: 0.15,
      infinity: k
    },
    TeX: { x_height: 0.430554 },
    pxPerInch: 72,
    em: 16,
    DELIMITERS: {
      "(": { dir: c },
      "{": { dir: c, w: 0.58 },
      "[": { dir: c },
      "|": { dir: c, w: 0.275 },
      ")": { dir: c },
      "}": { dir: c, w: 0.58 },
      "]": { dir: c },
      "/": { dir: c },
      "\\": { dir: c },
      "\u2223": { dir: c, w: 0.275 },
      "\u2225": { dir: c, w: 0.55 },
      "\u230A": { dir: c, w: 0.5 },
      "\u230B": { dir: c, w: 0.5 },
      "\u2308": { dir: c, w: 0.5 },
      "\u2309": { dir: c, w: 0.5 },
      "\u27E8": { dir: c, w: 0.5 },
      "\u27E9": { dir: c, w: 0.5 },
      "\u2191": { dir: c, w: 0.65 },
      "\u2193": { dir: c, w: 0.65 },
      "\u21D1": { dir: c, w: 0.75 },
      "\u21D3": { dir: c, w: 0.75 },
      "\u2195": { dir: c, w: 0.65 },
      "\u21D5": { dir: c, w: 0.75 },
      "\u27EE": { dir: c, w: 0.275 },
      "\u27EF": { dir: c, w: 0.275 },
      "\u23B0": { dir: c, w: 0.6 },
      "\u23B1": { dir: c, w: 0.6 }
    },
    REMAPACCENT: {
      "\u20D7": "\u2192",
      "'": "\u02CB",
      "`": "\u02CA",
      ".": "\u02D9",
      "^": "\u02C6",
      "-": "\u02C9",
      "~": "\u02DC",
      "\u00AF": "\u02C9",
      "\u00B0": "\u02DA",
      "\u00B4": "\u02CA",
      "\u0300": "\u02CB",
      "\u0301": "\u02CA",
      "\u0302": "\u02C6",
      "\u0303": "\u02DC",
      "\u0304": "\u02C9",
      "\u0305": "\u02C9",
      "\u0306": "\u02D8",
      "\u0307": "\u02D9",
      "\u0308": "\u00A8",
      "\u030C": "\u02C7"
    },
    REMAPACCENTUNDER: {},
    length2em: function(r, p) {
      if (typeof r !== "string") {
        r = r.toString();
      }
      if (r === "") {
        return "";
      }
      if (r === h.SIZE.NORMAL) {
        return 1;
      }
      if (r === h.SIZE.BIG) {
        return 2;
      }
      if (r === h.SIZE.SMALL) {
        return 0.71;
      }
      if (this.MATHSPACE[r]) {
        return this.MATHSPACE[r];
      }
      var o = r.match(
        /^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/
      );
      var n = parseFloat(o[1] || "1"),
        q = o[2];
      if (p == null) {
        p = 1;
      }
      if (q === "em") {
        return n;
      }
      if (q === "ex") {
        return n * this.TeX.x_height;
      }
      if (q === "%") {
        return (n / 100) * p;
      }
      if (q === "px") {
        return n / this.em;
      }
      if (q === "pt") {
        return n / 10;
      }
      if (q === "pc") {
        return n * 1.2;
      }
      if (q === "in") {
        return (n * this.pxPerInch) / this.em;
      }
      if (q === "cm") {
        return (n * this.pxPerInch) / this.em / 2.54;
      }
      if (q === "mm") {
        return (n * this.pxPerInch) / this.em / 25.4;
      }
      if (q === "mu") {
        return n / 18;
      }
      return n * p;
    },
    Em: function(n) {
      if (Math.abs(n) < 0.001) {
        return "0em";
      }
      return n.toFixed(3).replace(/\.?0+$/, "") + "em";
    },
    arrayEntry: function(n, o) {
      return n[Math.max(0, Math.min(o, n.length - 1))];
    }
  });
  MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
    h = MathJax.ElementJax.mml;
    h.mbase.Augment({
      toPreviewHTML: function(o, n) {
        return this.PHTMLdefaultSpan(o, n);
      },
      PHTMLdefaultSpan: function(q, o) {
        if (!o) {
          o = {};
        }
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        if (this.isToken) {
          this.PHTMLhandleToken(q);
        }
        for (var p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, p, o);
        }
        return q;
      },
      PHTMLaddChild: function(p, o, n) {
        var q = this.data[o];
        if (q) {
          if (n.childSpans) {
            p = e.addElement(p, "span", { className: n.className });
          }
          q.toPreviewHTML(p);
          if (!n.noBBox) {
            this.PHTML.w += q.PHTML.w + q.PHTML.l + q.PHTML.r;
            if (q.PHTML.h > this.PHTML.h) {
              this.PHTML.h = q.PHTML.h;
            }
            if (q.PHTML.d > this.PHTML.d) {
              this.PHTML.d = q.PHTML.d;
            }
            if (q.PHTML.t > this.PHTML.t) {
              this.PHTML.t = q.PHTML.t;
            }
            if (q.PHTML.b > this.PHTML.b) {
              this.PHTML.b = q.PHTML.b;
            }
          }
        } else {
          if (n.forceChild) {
            e.addElement(p, "span");
          }
        }
      },
      PHTMLstretchChild: function(q, p, s) {
        var r = this.data[q];
        if (r && r.PHTMLcanStretch("Vertical", p, s)) {
          var t = this.PHTML,
            o = r.PHTML,
            n = o.w;
          r.PHTMLstretchV(p, s);
          t.w += o.w - n;
          if (o.h > t.h) {
            t.h = o.h;
          }
          if (o.d > t.d) {
            t.d = o.d;
          }
        }
      },
      PHTMLcreateSpan: function(n) {
        if (!this.PHTML) {
          this.PHTML = {};
        }
        this.PHTML = { w: 0, h: 0, d: 0, l: 0, r: 0, t: 0, b: 0 };
        if (this.inferred) {
          return n;
        }
        if (this.type === "mo" && this.data.join("") === "\u222B") {
          g.lastIsInt = true;
        } else {
          if (
            this.type !== "mspace" ||
            this.width !== "negativethinmathspace"
          ) {
            g.lastIsInt = false;
          }
        }
        if (!this.PHTMLspanID) {
          this.PHTMLspanID = g.GetID();
        }
        var o = this.id || "MJXp-Span-" + this.PHTMLspanID;
        return e.addElement(n, "span", {
          className: "MJXp-" + this.type,
          id: o
        });
      },
      PHTMLspanElement: function() {
        if (!this.PHTMLspanID) {
          return null;
        }
        return document.getElementById(
          this.id || "MJXp-Span-" + this.PHTMLspanID
        );
      },
      PHTMLhandleToken: function(o) {
        var n = this.getValues("mathvariant");
        if (n.mathvariant !== h.VARIANT.NORMAL) {
          o.className += " " + g.VARIANT[n.mathvariant];
        }
      },
      PHTMLhandleStyle: function(n) {
        if (this.style) {
          n.style.cssText = this.style;
        }
      },
      PHTMLhandleColor: function(n) {
        if (this.mathcolor) {
          n.style.color = this.mathcolor;
        }
        if (this.mathbackground) {
          n.style.backgroundColor = this.mathbackground;
        }
      },
      PHTMLhandleScriptlevel: function(n) {
        var o = this.Get("scriptlevel");
        if (o) {
          n.className += " MJXp-script";
        }
      },
      PHTMLhandleText: function(y, A) {
        var v, p;
        var z = 0,
          o = 0,
          q = 0;
        for (var s = 0, r = A.length; s < r; s++) {
          p = A.charCodeAt(s);
          v = A.charAt(s);
          if (p >= 55296 && p < 56319) {
            s++;
            p = ((p - 55296) << 10) + (A.charCodeAt(s) - 56320) + 65536;
          }
          var t = 0.7,
            u = 0.22,
            x = 0.5;
          if (p < 127) {
            if (v.match(/[A-Za-ehik-or-xz0-9]/)) {
              u = 0;
            }
            if (v.match(/[A-HK-Z]/)) {
              x = 0.67;
            } else {
              if (v.match(/[IJ]/)) {
                x = 0.36;
              }
            }
            if (v.match(/[acegm-su-z]/)) {
              t = 0.45;
            } else {
              if (v.match(/[ij]/)) {
                t = 0.75;
              }
            }
            if (v.match(/[ijlt]/)) {
              x = 0.28;
            }
          }
          if (g.DELIMITERS[v]) {
            x = g.DELIMITERS[v].w || 0.4;
          }
          if (t > z) {
            z = t;
          }
          if (u > o) {
            o = u;
          }
          q += x;
        }
        if (!this.CHML) {
          this.PHTML = {};
        }
        this.PHTML = { h: 0.9, d: 0.3, w: q, l: 0, r: 0, t: z, b: o };
        e.addText(y, A);
      },
      PHTMLbboxFor: function(o) {
        if (this.data[o] && this.data[o].PHTML) {
          return this.data[o].PHTML;
        }
        return { w: 0, h: 0, d: 0, l: 0, r: 0, t: 0, b: 0 };
      },
      PHTMLcanStretch: function(q, o, p) {
        if (this.isEmbellished()) {
          var n = this.Core();
          if (n && n !== this) {
            return n.PHTMLcanStretch(q, o, p);
          }
        }
        return false;
      },
      PHTMLstretchV: function(n, o) {},
      PHTMLstretchH: function(n) {},
      CoreParent: function() {
        var n = this;
        while (
          n &&
          n.isEmbellished() &&
          n.CoreMO() === this &&
          !n.isa(h.math)
        ) {
          n = n.Parent();
        }
        return n;
      },
      CoreText: function(n) {
        if (!n) {
          return "";
        }
        if (n.isEmbellished()) {
          return n.CoreMO().data.join("");
        }
        while (
          (n.isa(h.mrow) ||
            n.isa(h.TeXAtom) ||
            n.isa(h.mstyle) ||
            n.isa(h.mphantom)) &&
          n.data.length === 1 &&
          n.data[0]
        ) {
          n = n.data[0];
        }
        if (!n.isToken) {
          return "";
        } else {
          return n.data.join("");
        }
      }
    });
    h.chars.Augment({
      toPreviewHTML: function(n) {
        var o = this.toString().replace(/[\u2061-\u2064]/g, "");
        this.PHTMLhandleText(n, o);
      }
    });
    h.entity.Augment({
      toPreviewHTML: function(n) {
        var o = this.toString().replace(/[\u2061-\u2064]/g, "");
        this.PHTMLhandleText(n, o);
      }
    });
    h.math.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        if (this.Get("display") === "block") {
          n.className += " MJXp-display";
        }
        return n;
      }
    });
    h.mo.Augment({
      toPreviewHTML: function(o) {
        o = this.PHTMLdefaultSpan(o);
        this.PHTMLadjustAccent(o);
        var n = this.getValues(
          "lspace",
          "rspace",
          "scriptlevel",
          "displaystyle",
          "largeop"
        );
        if (n.scriptlevel === 0) {
          this.PHTML.l = g.length2em(n.lspace);
          this.PHTML.r = g.length2em(n.rspace);
          o.style.marginLeft = g.Em(this.PHTML.l);
          o.style.marginRight = g.Em(this.PHTML.r);
        } else {
          this.PHTML.l = 0.15;
          this.PHTML.r = 0.1;
        }
        if (n.displaystyle && n.largeop) {
          var p = e.Element("span", { className: "MJXp-largeop" });
          p.appendChild(o.firstChild);
          o.appendChild(p);
          this.PHTML.h *= 1.2;
          this.PHTML.d *= 1.2;
          if (this.data.join("") === "\u222B") {
            p.className += " MJXp-int";
          }
        }
        return o;
      },
      PHTMLadjustAccent: function(p) {
        var o = this.CoreParent();
        if (
          o &&
          o.isa(h.munderover) &&
          this.CoreText(o.data[o.base]).length === 1
        ) {
          var q = o.data[o.over],
            n = o.data[o.under];
          var s = this.data.join(""),
            r;
          if (q && this === q.CoreMO() && o.Get("accent")) {
            r = g.REMAPACCENT[s];
          } else {
            if (n && this === n.CoreMO() && o.Get("accentunder")) {
              r = g.REMAPACCENTUNDER[s];
            }
          }
          if (r) {
            s = p.innerHTML = r;
          }
          if (s.match(/[\u02C6-\u02DC\u00A8]/)) {
            this.PHTML.acc = -0.52;
          } else {
            if (s === "\u2192") {
              this.PHTML.acc = -0.15;
              this.PHTML.vec = true;
            }
          }
        }
      },
      PHTMLcanStretch: function(q, o, p) {
        if (!this.Get("stretchy")) {
          return false;
        }
        var r = this.data.join("");
        if (r.length > 1) {
          return false;
        }
        r = g.DELIMITERS[r];
        var n = r && r.dir === q.substr(0, 1);
        if (n) {
          n =
            this.PHTML.h !== o ||
            this.PHTML.d !== p ||
            this.Get("minsize", true) || this.Get("maxsize", true);
        }
        return n;
      },
      PHTMLstretchV: function(p, u) {
        var o = this.PHTMLspanElement(),
          t = this.PHTML;
        var n = this.getValues("symmetric", "maxsize", "minsize");
        if (n.symmetric) {
          l = 2 * Math.max(p - 0.25, u + 0.25);
        } else {
          l = p + u;
        }
        n.maxsize = g.length2em(n.maxsize, t.h + t.d);
        n.minsize = g.length2em(n.minsize, t.h + t.d);
        l = Math.max(n.minsize, Math.min(n.maxsize, l));
        var s = l / (t.h + t.d - 0.3);
        var q = e.Element("span", { style: { "font-size": g.Em(s) } });
        if (s > 1.25) {
          var r = Math.ceil((1.25 / s) * 10);
          q.className = "MJXp-right MJXp-scale" + r;
          q.style.marginLeft = g.Em(t.w * (r / 10 - 1) + 0.07);
          t.w *= (s * r) / 10;
        }
        q.appendChild(o.firstChild);
        o.appendChild(q);
        if (n.symmetric) {
          o.style.verticalAlign = g.Em(0.25 * (1 - s));
        }
      }
    });
    h.mspace.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q);
        var o = this.getValues("height", "depth", "width");
        var n = g.length2em(o.width),
          p = g.length2em(o.height),
          s = g.length2em(o.depth);
        var r = this.PHTML;
        r.w = n;
        r.h = p;
        r.d = s;
        if (n < 0) {
          if (!g.lastIsInt) {
            q.style.marginLeft = g.Em(n);
          }
          n = 0;
        }
        q.style.width = g.Em(n);
        q.style.height = g.Em(p + s);
        if (s) {
          q.style.verticalAlign = g.Em(-s);
        }
        return q;
      }
    });
    h.mpadded.Augment({
      toPreviewHTML: function(u) {
        u = this.PHTMLdefaultSpan(u, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true
        });
        var o = u.firstChild;
        var v = this.getValues("width", "height", "depth", "lspace", "voffset");
        var s = this.PHTMLdimen(v.lspace);
        var q = 0,
          n = 0,
          t = s.len,
          r = -s.len,
          p = 0;
        if (v.width !== "") {
          s = this.PHTMLdimen(v.width, "w", 0);
          if (s.pm) {
            r += s.len;
          } else {
            u.style.width = g.Em(s.len);
          }
        }
        if (v.height !== "") {
          s = this.PHTMLdimen(v.height, "h", 0);
          if (!s.pm) {
            q += -this.PHTMLbboxFor(0).h;
          }
          q += s.len;
        }
        if (v.depth !== "") {
          s = this.PHTMLdimen(v.depth, "d", 0);
          if (!s.pm) {
            n += -this.PHTMLbboxFor(0).d;
            p += -s.len;
          }
          n += s.len;
        }
        if (v.voffset !== "") {
          s = this.PHTMLdimen(v.voffset);
          q -= s.len;
          n += s.len;
          p += s.len;
        }
        if (q) {
          o.style.marginTop = g.Em(q);
        }
        if (n) {
          o.style.marginBottom = g.Em(n);
        }
        if (t) {
          o.style.marginLeft = g.Em(t);
        }
        if (r) {
          o.style.marginRight = g.Em(r);
        }
        if (p) {
          u.style.verticalAlign = g.Em(p);
        }
        return u;
      },
      PHTMLdimen: function(q, r, n) {
        if (n == null) {
          n = -k;
        }
        q = String(q);
        var o = q.match(/width|height|depth/);
        var p = o ? this.PHTML[o[0].charAt(0)] : r ? this.PHTML[r] : 0;
        return { len: g.length2em(q, p) || 0, pm: !!q.match(/^[-+]/) };
      }
    });
    h.munderover.Augment({
      toPreviewHTML: function(r) {
        var t = this.getValues(
          "displaystyle",
          "accent",
          "accentunder",
          "align"
        );
        var n = this.data[this.base];
        if (
          !t.displaystyle &&
          n != null &&
          (n.movablelimits || n.CoreMO().Get("movablelimits"))
        ) {
          r = h.msubsup.prototype.toPreviewHTML.call(this, r);
          r.className = r.className.replace(/munderover/, "msubsup");
          return r;
        }
        r = this.PHTMLdefaultSpan(r, {
          childSpans: true,
          className: "",
          noBBox: true
        });
        var p = this.PHTMLbboxFor(this.over),
          v = this.PHTMLbboxFor(this.under),
          u = this.PHTMLbboxFor(this.base),
          s = this.PHTML,
          o = p.acc;
        if (this.data[this.over]) {
          if (r.lastChild.firstChild) {
            r.lastChild.firstChild.style.marginLeft = p.l = r.lastChild.firstChild.style.marginRight = p.r = 0;
          }
          var q = e.Element("span", {}, [["span", { className: "MJXp-over" }]]);
          q.firstChild.appendChild(r.lastChild);
          if (r.childNodes.length > (this.data[this.under] ? 1 : 0)) {
            q.firstChild.appendChild(r.firstChild);
          }
          this.data[this.over].PHTMLhandleScriptlevel(q.firstChild.firstChild);
          if (o != null) {
            if (p.vec) {
              q.firstChild.firstChild.firstChild.style.fontSize = "60%";
              p.h *= 0.6;
              p.d *= 0.6;
              p.w *= 0.6;
            }
            o = o - p.d + 0.1;
            if (u.t != null) {
              o += u.t - u.h;
            }
            q.firstChild.firstChild.style.marginBottom = g.Em(o);
          }
          if (r.firstChild) {
            r.insertBefore(q, r.firstChild);
          } else {
            r.appendChild(q);
          }
        }
        if (this.data[this.under]) {
          if (r.lastChild.firstChild) {
            r.lastChild.firstChild.style.marginLeft = v.l = r.lastChild.firstChild.marginRight = v.r = 0;
          }
          this.data[this.under].PHTMLhandleScriptlevel(r.lastChild);
        }
        s.w = Math.max(0.8 * p.w, 0.8 * v.w, u.w);
        s.h = 0.8 * (p.h + p.d + (o || 0)) + u.h;
        s.d = u.d + 0.8 * (v.h + v.d);
        return r;
      }
    });
    h.msubsup.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q, { noBBox: true });
        if (!this.data[this.base]) {
          if (q.firstChild) {
            q.insertBefore(e.Element("span"), q.firstChild);
          } else {
            q.appendChild(e.Element("span"));
          }
        }
        var s = this.data[this.base],
          p = this.data[this.sub],
          n = this.data[this.sup];
        if (!s) {
          s = { bbox: { h: 0.8, d: 0.2 } };
        }
        q.firstChild.style.marginRight = ".05em";
        var o = Math.max(0.4, s.PHTML.h - 0.4),
          u = Math.max(0.2, s.PHTML.d + 0.1);
        var t = this.PHTML;
        if (n && p) {
          var r = e.Element(
            "span",
            {
              className: "MJXp-script-box",
              style: {
                height: g.Em(o + n.PHTML.h * 0.8 + u + p.PHTML.d * 0.8),
                "vertical-align": g.Em(-u - p.PHTML.d * 0.8)
              }
            },
            [
              [
                "span",
                {},
                [
                  [
                    "span",
                    {},
                    [
                      [
                        "span",
                        {
                          style: { "margin-bottom": g.Em(-(n.PHTML.d - 0.05)) }
                        }
                      ]
                    ]
                  ]
                ]
              ],
              [
                "span",
                {},
                [
                  [
                    "span",
                    {},
                    [
                      [
                        "span",
                        { style: { "margin-top": g.Em(-(n.PHTML.h - 0.05)) } }
                      ]
                    ]
                  ]
                ]
              ]
            ]
          );
          p.PHTMLhandleScriptlevel(r.firstChild);
          n.PHTMLhandleScriptlevel(r.lastChild);
          r.firstChild.firstChild.firstChild.appendChild(q.lastChild);
          r.lastChild.firstChild.firstChild.appendChild(q.lastChild);
          q.appendChild(r);
          t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
          t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
          t.w = s.PHTML.w + Math.max(n.PHTML.w, p.PHTML.w) + 0.07;
        } else {
          if (n) {
            q.lastChild.style.verticalAlign = g.Em(o);
            n.PHTMLhandleScriptlevel(q.lastChild);
            t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
            t.d = Math.max(s.PHTML.d, n.PHTML.d * 0.8 - o);
            t.w = s.PHTML.w + n.PHTML.w + 0.07;
          } else {
            if (p) {
              q.lastChild.style.verticalAlign = g.Em(-u);
              p.PHTMLhandleScriptlevel(q.lastChild);
              t.h = Math.max(s.PHTML.h, p.PHTML.h * 0.8 - u);
              t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
              t.w = s.PHTML.w + p.PHTML.w + 0.07;
            }
          }
        }
        return q;
      }
    });
    h.mfrac.Augment({
      toPreviewHTML: function(r) {
        r = this.PHTMLdefaultSpan(r, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true,
          noBBox: true
        });
        var o = this.getValues("linethickness", "displaystyle");
        if (!o.displaystyle) {
          if (this.data[0]) {
            this.data[0].PHTMLhandleScriptlevel(r.firstChild);
          }
          if (this.data[1]) {
            this.data[1].PHTMLhandleScriptlevel(r.lastChild);
          }
        }
        var n = e.Element("span", { className: "MJXp-box" }, [
          [
            "span",
            { className: "MJXp-denom" },
            [
              [
                "span",
                {},
                [["span", { className: "MJXp-rule", style: { height: "1em" } }]]
              ],
              ["span"]
            ]
          ]
        ]);
        n.firstChild.lastChild.appendChild(r.lastChild);
        r.appendChild(n);
        var s = this.PHTMLbboxFor(0),
          p = this.PHTMLbboxFor(1),
          v = this.PHTML;
        v.w = Math.max(s.w, p.w) * 0.8;
        v.h = s.h + s.d + 0.1 + 0.25;
        v.d = p.h + p.d - 0.25;
        v.l = v.r = 0.125;
        o.linethickness = Math.max(0, g.length2em(o.linethickness || "0", 0));
        if (o.linethickness) {
          var u = n.firstChild.firstChild.firstChild;
          var q = g.Em(o.linethickness);
          u.style.borderTop = "none";
          u.style.borderBottom =
            (o.linethickness < 0.15 ? "1px" : q) + " solid";
          u.style.margin = q + " 0";
          q = o.linethickness;
          n.style.marginTop = g.Em(3 * q - 1.2);
          r.style.verticalAlign = g.Em(1.5 * q + 0.1);
          v.h += 1.5 * q - 0.1;
          v.d += 1.5 * q;
        } else {
          n.style.marginTop = "-.7em";
        }
        return r;
      }
    });
    h.msqrt.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true,
          noBBox: true
        });
        this.PHTMLlayoutRoot(n, n.firstChild);
        return n;
      },
      PHTMLlayoutRoot: function(u, n) {
        var v = this.PHTMLbboxFor(0);
        var q = Math.ceil((v.h + v.d + 0.14) * 100),
          w = g.Em(14 / q);
        var r = e.Element("span", { className: "MJXp-surd" }, [
          [
            "span",
            { style: { "font-size": q + "%", "margin-top": w } },
            ["\u221A"]
          ]
        ]);
        var s = e.Element("span", { className: "MJXp-root" }, [
          [
            "span",
            { className: "MJXp-rule", style: { "border-top": ".08em solid" } }
          ]
        ]);
        var p = ((1.2 / 2.2) * q) / 100;
        if (q > 150) {
          var o = Math.ceil((150 / q) * 10);
          r.firstChild.className = "MJXp-right MJXp-scale" + o;
          r.firstChild.style.marginLeft = g.Em(((p * (o / 10 - 1)) / q) * 100);
          p = (p * o) / 10;
          s.firstChild.style.borderTopWidth = g.Em(0.08 / Math.sqrt(o / 10));
        }
        s.appendChild(n);
        u.appendChild(r);
        u.appendChild(s);
        this.PHTML.h = v.h + 0.18;
        this.PHTML.d = v.d;
        this.PHTML.w = v.w + p;
        return u;
      }
    });
    h.mroot.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q, {
          childSpans: true,
          className: "MJXp-box",
          forceChild: true,
          noBBox: true
        });
        var p = this.PHTMLbboxFor(1),
          n = q.removeChild(q.lastChild);
        var t = this.PHTMLlayoutRoot(e.Element("span"), q.firstChild);
        n.className = "MJXp-script";
        var u = parseInt(t.firstChild.firstChild.style.fontSize);
        var o = 0.55 * (u / 120) + p.d * 0.8,
          s = -0.6 * (u / 120);
        if (u > 150) {
          s *= (0.95 * Math.ceil((150 / u) * 10)) / 10;
        }
        n.style.marginRight = g.Em(s);
        n.style.verticalAlign = g.Em(o);
        if (-s > p.w * 0.8) {
          n.style.marginLeft = g.Em(-s - p.w * 0.8);
        }
        q.appendChild(n);
        q.appendChild(t);
        this.PHTML.w += Math.max(0, p.w * 0.8 + s);
        this.PHTML.h = Math.max(this.PHTML.h, p.h * 0.8 + o);
        return q;
      },
      PHTMLlayoutRoot: h.msqrt.prototype.PHTMLlayoutRoot
    });
    h.mfenced.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        this.addFakeNodes();
        this.PHTMLaddChild(q, "open", {});
        for (var p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, "sep" + p, {});
          this.PHTMLaddChild(q, p, {});
        }
        this.PHTMLaddChild(q, "close", {});
        var o = this.PHTML.h,
          r = this.PHTML.d;
        this.PHTMLstretchChild("open", o, r);
        for (p = 0, n = this.data.length; p < n; p++) {
          this.PHTMLstretchChild("sep" + p, o, r);
          this.PHTMLstretchChild(p, o, r);
        }
        this.PHTMLstretchChild("close", o, r);
        return q;
      }
    });
    h.mrow.Augment({
      toPreviewHTML: function(q) {
        q = this.PHTMLdefaultSpan(q);
        var p = this.PHTML.h,
          r = this.PHTML.d;
        for (var o = 0, n = this.data.length; o < n; o++) {
          this.PHTMLstretchChild(o, p, r);
        }
        return q;
      }
    });
    h.mstyle.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        this.PHTMLhandleScriptlevel(n);
        return n;
      }
    });
    h.TeXAtom.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLdefaultSpan(n);
        n.className = "MJXp-mrow";
        return n;
      }
    });
    h.mtable.Augment({
      toPreviewHTML: function(E) {
        E = this.PHTMLdefaultSpan(E, { noBBox: true });
        var r = this.getValues(
          "columnalign",
          "rowalign",
          "columnspacing",
          "rowspacing",
          "columnwidth",
          "equalcolumns",
          "equalrows",
          "columnlines",
          "rowlines",
          "frame",
          "framespacing",
          "align",
          "width"
        );
        var u = MathJax.Hub.SplitList,
          F,
          A,
          D,
          z;
        var N = u(r.columnspacing),
          w = u(r.rowspacing),
          L = u(r.columnalign),
          t = u(r.rowalign);
        for (F = 0, A = N.length; F < A; F++) {
          N[F] = g.length2em(N[F]);
        }
        for (F = 0, A = w.length; F < A; F++) {
          w[F] = g.length2em(w[F]);
        }
        var K = e.Element("span");
        while (E.firstChild) {
          K.appendChild(E.firstChild);
        }
        E.appendChild(K);
        var y = 0,
          s = 0;
        for (F = 0, A = this.data.length; F < A; F++) {
          var v = this.data[F];
          if (v) {
            var J = g.arrayEntry(w, F - 1),
              C = g.arrayEntry(t, F);
            var x = v.PHTML,
              q = v.PHTMLspanElement();
            q.style.verticalAlign = C;
            var B = v.type === "mlabeledtr" ? 1 : 0;
            for (D = 0, z = v.data.length; D < z - B; D++) {
              var p = v.data[D + B];
              if (p) {
                var M = g.arrayEntry(N, D - 1),
                  G = g.arrayEntry(L, D);
                var I = p.PHTMLspanElement();
                if (D) {
                  x.w += M;
                  I.style.paddingLeft = g.Em(M);
                }
                if (F) {
                  I.style.paddingTop = g.Em(J);
                }
                I.style.textAlign = G;
              }
            }
            y += x.h + x.d;
            if (F) {
              y += J;
            }
            if (x.w > s) {
              s = x.w;
            }
          }
        }
        var o = this.PHTML;
        o.w = s;
        o.h = y / 2 + 0.25;
        o.d = y / 2 - 0.25;
        o.l = o.r = 0.125;
        return E;
      }
    });
    h.mlabeledtr.Augment({
      PHTMLdefaultSpan: function(q, o) {
        if (!o) {
          o = {};
        }
        q = this.PHTMLcreateSpan(q);
        this.PHTMLhandleStyle(q);
        this.PHTMLhandleColor(q);
        if (this.isToken) {
          this.PHTMLhandleToken(q);
        }
        for (var p = 1, n = this.data.length; p < n; p++) {
          this.PHTMLaddChild(q, p, o);
        }
        return q;
      }
    });
    h.semantics.Augment({
      toPreviewHTML: function(n) {
        n = this.PHTMLcreateSpan(n);
        if (this.data[0]) {
          this.data[0].toPreviewHTML(n);
          MathJax.Hub.Insert(this.data[0].PHTML || {}, this.PHTML);
        }
        return n;
      }
    });
    h.annotation.Augment({ toPreviewHTML: function(n) {} });
    h["annotation-xml"].Augment({ toPreviewHTML: function(n) {} });
    MathJax.Hub.Register.StartupHook("onLoad", function() {
      setTimeout(MathJax.Callback(["loadComplete", g, "jax.js"]), 0);
    });
  });
  MathJax.Hub.Register.StartupHook("End Cookie", function() {
    if (b.config.menuSettings.zoom !== "None") {
      i.Require("[MathJax]/extensions/MathZoom.js");
    }
  });
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.PreviewHTML);
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
MathJax.Ajax.loadComplete("[MathJax]/config/AM_CHTML-full.js");
