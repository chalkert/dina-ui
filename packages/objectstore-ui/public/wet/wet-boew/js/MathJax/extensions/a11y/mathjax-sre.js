var $jscomp = { scope: {} };
$jscomp.defineProperty =
  "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function(a, b, c) {
        if (c.get || c.set)
          throw new TypeError("ES3 does not support getters and setters.");
        a != Array.prototype && a != Object.prototype && (a[b] = c.value);
      };
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a
    ? a
    : "undefined" != typeof global
    ? global
    : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(a) {
  return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] &&
    $jscomp.defineProperty(Array.prototype, a, {
      configurable: !0,
      writable: !0,
      value: function() {
        return $jscomp.arrayIterator(this);
      }
    });
  $jscomp.initSymbolIterator = function() {};
};
$jscomp.arrayIterator = function(a) {
  var b = 0;
  return $jscomp.iteratorPrototype(function() {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  });
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = { next: a };
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0,
    d = {
      next: function() {
        if (c < a.length) {
          var e = c++;
          return { value: b(e, a[e]), done: !1 };
        }
        d.next = function() {
          return { done: !0, value: void 0 };
        };
        return d.next();
      }
    };
  d[Symbol.iterator] = function() {
    return d;
  };
  return d;
};
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d &&
      null != b &&
      $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b
      });
  }
};
$jscomp.checkStringArgs = function(a, b, c) {
  if (null == a)
    throw new TypeError(
      "The 'this' value for String.prototype." +
        c +
        " must not be null or undefined"
    );
  if (b instanceof RegExp)
    throw new TypeError(
      "First argument to String.prototype." +
        c +
        " must not be a regular expression"
    );
  return a + "";
};
$jscomp.findInternal = function(a, b, c) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var f = a[e];
    if (b.call(c, f, e, a)) return { i: e, v: f };
  }
  return { i: -1, v: void 0 };
};
var COMPILED = !0,
  goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
  return void 0 !== a;
};
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || !c.execScript || c.execScript("var " + a[0]);
  for (var d; a.length && (d = a.shift()); )
    !a.length && goog.isDef(b)
      ? (c[d] = b)
      : (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}));
};
goog.define = function(a, b) {
  var c = b;
  COMPILED ||
    (goog.global.CLOSURE_UNCOMPILED_DEFINES &&
    Object.prototype.hasOwnProperty.call(
      goog.global.CLOSURE_UNCOMPILED_DEFINES,
      a
    )
      ? (c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a])
      : goog.global.CLOSURE_DEFINES &&
        Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) &&
        (c = goog.global.CLOSURE_DEFINES[a]));
  goog.exportPath_(a, c);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
  if (goog.isInModuleLoader_())
    throw Error("goog.provide can not be used within a goog.module.");
  if (!COMPILED && goog.isProvided_(a))
    throw Error('Namespace "' + a + '" already declared.');
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (
      var c = a;
      (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);

    )
      goog.implicitNamespaces_[c] = !0;
  }
  goog.exportPath_(a, b);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
  if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_))
    throw Error("Invalid module identifier");
  if (!goog.isInModuleLoader_())
    throw Error(
      "Module " +
        a +
        " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide."
    );
  if (goog.moduleLoaderState_.moduleName)
    throw Error("goog.module may only be called once per module.");
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a))
      throw Error('Namespace "' + a + '" already declared.');
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function(a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
  if (!COMPILED) {
    if (a in goog.loadedModules_) return goog.loadedModules_[a];
    if (!goog.implicitNamespaces_[a])
      return (a = goog.getObjectByName(a)), null != a ? a : null;
  }
  return null;
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return null != goog.moduleLoaderState_;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_())
    throw Error(
      "goog.module.declareLegacyNamespace must be called from within a goog.module"
    );
  if (!COMPILED && !goog.moduleLoaderState_.moduleName)
    throw Error(
      "goog.module must be called prior to goog.module.declareLegacyNamespace."
    );
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(a) {
  if (goog.DISALLOW_TEST_ONLY_CODE)
    throw ((a = a || ""),
    Error(
      "Importing test-only code into non-debug environment" +
        (a ? ": " + a : ".")
    ));
};
goog.forwardDeclare = function(a) {};
COMPILED ||
  ((goog.isProvided_ = function(a) {
    return (
      a in goog.loadedModules_ ||
      (!goog.implicitNamespaces_[a] &&
        goog.isDefAndNotNull(goog.getObjectByName(a)))
    );
  }),
  (goog.implicitNamespaces_ = { "goog.module": !0 }));
goog.getObjectByName = function(a, b) {
  for (var c = a.split("."), d = b || goog.global, e; (e = c.shift()); )
    if (goog.isDefAndNotNull(d[e])) d = d[e];
    else return null;
  return d;
};
goog.globalize = function(a, b) {
  var c = b || goog.global,
    d;
  for (d in a) c[d] = a[d];
};
goog.addDependency = function(a, b, c, d) {
  if (goog.DEPENDENCIES_ENABLED) {
    var e;
    a = a.replace(/\\/g, "/");
    var f = goog.dependencies_;
    (d && "boolean" !== typeof d) || (d = d ? { module: "goog" } : {});
    for (var g = 0; (e = b[g]); g++)
      (f.nameToPath[e] = a), (f.loadFlags[a] = d);
    for (d = 0; (b = c[d]); d++)
      a in f.requires || (f.requires[a] = {}), (f.requires[a][b] = !0);
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER &&
      goog.IS_OLD_IE_ &&
      goog.maybeProcessDeferredDep_(a);
    if (goog.isProvided_(a)) {
      if (goog.isInModuleLoader_()) return goog.module.getInternal_(a);
    } else if (goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if (b) goog.writeScripts_(b);
      else
        throw ((a = "goog.require could not find: " + a),
        goog.logToConsole_(a),
        Error(a));
    }
    return null;
  }
};
goog.basePath = "";
goog.nullFunction = function() {};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.instance_ = void 0;
  a.getInstance = function() {
    if (a.instance_) return a.instance_;
    goog.DEBUG &&
      (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return (a.instance_ = new a());
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js";
goog.DEPENDENCIES_ENABLED &&
  ((goog.dependencies_ = {
    loadFlags: {},
    nameToPath: {},
    requires: {},
    visited: {},
    written: {},
    deferred: {}
  }),
  (goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return null != a && "write" in a;
  }),
  (goog.findBasePath_ = function() {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH))
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
    else if (goog.inHtmlDocument_())
      for (
        var a = goog.global.document.getElementsByTagName("SCRIPT"),
          b = a.length - 1;
        0 <= b;
        --b
      ) {
        var c = a[b].src,
          d = c.lastIndexOf("?"),
          d = -1 == d ? c.length : d;
        if ("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break;
        }
      }
  }),
  (goog.importScript_ = function(a, b) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) &&
      (goog.dependencies_.written[a] = !0);
  }),
  (goog.IS_OLD_IE_ = !(
    goog.global.atob ||
    !goog.global.document ||
    !goog.global.document.all
  )),
  (goog.oldIeWaiting_ = !1),
  (goog.importProcessedScript_ = function(a, b, c) {
    goog.importScript_(
      "",
      'goog.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");"
    );
  }),
  (goog.queuedModules_ = []),
  (goog.wrapModule_ = function(a, b) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON)
      ? "goog.loadModule(" +
          goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") +
          ");"
      : 'goog.loadModule(function(exports) {"use strict";' +
          b +
          "\n;return exports});\n//# sourceURL=" +
          a +
          "\n";
  }),
  (goog.loadQueuedModules_ = function() {
    var a = goog.queuedModules_.length;
    if (0 < a) {
      var b = goog.queuedModules_;
      goog.queuedModules_ = [];
      for (var c = 0; c < a; c++) goog.maybeProcessDeferredPath_(b[c]);
    }
    goog.oldIeWaiting_ = !1;
  }),
  (goog.maybeProcessDeferredDep_ = function(a) {
    goog.isDeferredModule_(a) &&
      goog.allDepsAreAvailable_(a) &&
      ((a = goog.getPathFromDeps_(a)),
      goog.maybeProcessDeferredPath_(goog.basePath + a));
  }),
  (goog.isDeferredModule_ = function(a) {
    var b =
        ((a = goog.getPathFromDeps_(a)) && goog.dependencies_.loadFlags[a]) ||
        {},
      c = b.lang || "es3";
    return a && ("goog" == b.module || goog.needsTranspile_(c))
      ? goog.basePath + a in goog.dependencies_.deferred
      : !1;
  }),
  (goog.allDepsAreAvailable_ = function(a) {
    if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires)
      for (var b in goog.dependencies_.requires[a])
        if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) return !1;
    return !0;
  }),
  (goog.maybeProcessDeferredPath_ = function(a) {
    if (a in goog.dependencies_.deferred) {
      var b = goog.dependencies_.deferred[a];
      delete goog.dependencies_.deferred[a];
      goog.globalEval(b);
    }
  }),
  (goog.loadModuleFromUrl = function(a) {
    goog.retrieveAndExec_(a, !0, !1);
  }),
  (goog.writeScriptSrcNode_ = function(a) {
    goog.global.document.write(
      '<script type="text/javascript" src="' + a + '">\x3c/script>'
    );
  }),
  (goog.appendScriptSrcNode_ = function(a) {
    var b = goog.global.document,
      c = b.createElement("script");
    c.type = "text/javascript";
    c.src = a;
    c.defer = !1;
    c.async = !1;
    b.head.appendChild(c);
  }),
  (goog.writeScriptTag_ = function(a, b) {
    if (goog.inHtmlDocument_()) {
      var c = goog.global.document;
      if (
        !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING &&
        "complete" == c.readyState
      ) {
        if (/\bdeps.js$/.test(a)) return !1;
        throw Error('Cannot write "' + a + '" after document load');
      }
      if (void 0 === b)
        if (goog.IS_OLD_IE_) {
          goog.oldIeWaiting_ = !0;
          var d =
            " onreadystatechange='goog.onScriptLoad_(this, " +
            ++goog.lastNonModuleScriptIndex_ +
            ")' ";
          c.write(
            '<script type="text/javascript" src="' +
              a +
              '"' +
              d +
              ">\x3c/script>"
          );
        } else
          goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING
            ? goog.appendScriptSrcNode_(a)
            : goog.writeScriptSrcNode_(a);
      else
        c.write(
          '<script type="text/javascript">' +
            goog.protectScriptTag_(b) +
            "\x3c/script>"
        );
      return !0;
    }
    return !1;
  }),
  (goog.protectScriptTag_ = function(a) {
    return a.replace(/<\/(SCRIPT)/gi, "\\x3c/$1");
  }),
  (goog.needsTranspile_ = function(a) {
    if ("always" == goog.TRANSPILE) return !0;
    if ("never" == goog.TRANSPILE) return !1;
    goog.requiresTranspilation_ ||
      (goog.requiresTranspilation_ = goog.createRequiresTranspilation_());
    if (a in goog.requiresTranspilation_) return goog.requiresTranspilation_[a];
    throw Error("Unknown language mode: " + a);
  }),
  (goog.requiresTranspilation_ = null),
  (goog.lastNonModuleScriptIndex_ = 0),
  (goog.onScriptLoad_ = function(a, b) {
    "complete" == a.readyState &&
      goog.lastNonModuleScriptIndex_ == b &&
      goog.loadQueuedModules_();
    return !0;
  }),
  (goog.writeScripts_ = function(a) {
    function b(a) {
      if (!(a in e.written || a in e.visited)) {
        e.visited[a] = !0;
        if (a in e.requires)
          for (var f in e.requires[a])
            if (!goog.isProvided_(f))
              if (f in e.nameToPath) b(e.nameToPath[f]);
              else throw Error("Undefined nameToPath for " + f);
        a in d || ((d[a] = !0), c.push(a));
      }
    }
    var c = [],
      d = {},
      e = goog.dependencies_;
    b(a);
    for (a = 0; a < c.length; a++) {
      var f = c[a];
      goog.dependencies_.written[f] = !0;
    }
    var g = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    for (a = 0; a < c.length; a++)
      if ((f = c[a])) {
        var h = e.loadFlags[f] || {},
          k = goog.needsTranspile_(h.lang || "es3");
        "goog" == h.module || k
          ? goog.importProcessedScript_(
              goog.basePath + f,
              "goog" == h.module,
              k
            )
          : goog.importScript_(goog.basePath + f);
      } else
        throw ((goog.moduleLoaderState_ = g), Error("Undefined script input"));
    goog.moduleLoaderState_ = g;
  }),
  (goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath
      ? goog.dependencies_.nameToPath[a]
      : null;
  }),
  goog.findBasePath_(),
  goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function() {
  if (null == goog.hasBadLetScoping) {
    var a;
    try {
      a = !eval(
        '"use strict";let x = 1; function f() { return typeof x; };f() == "number";'
      );
    } catch (b) {
      a = !1;
    }
    goog.hasBadLetScoping = a;
  }
  return goog.hasBadLetScoping;
};
goog.workaroundSafari10EvalBug = function(a) {
  return "(function(){" + a + "\n;})();\n";
};
goog.loadModule = function(a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {
      moduleName: void 0,
      declareLegacyNamespace: !1
    };
    var c;
    if (goog.isFunction(a)) c = a.call(void 0, {});
    else if (goog.isString(a))
      goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)),
        (c = goog.loadModuleFromSource_.call(void 0, a));
    else throw Error("Invalid module definition");
    var d = goog.moduleLoaderState_.moduleName;
    if (!goog.isString(d) || !d) throw Error('Invalid module name "' + d + '"');
    goog.moduleLoaderState_.declareLegacyNamespace
      ? goog.constructNamespace_(d, c)
      : goog.SEAL_MODULE_EXPORTS &&
        Object.seal &&
        "object" == typeof c &&
        null != c &&
        Object.seal(c);
    goog.loadedModules_[d] = c;
  } finally {
    goog.moduleLoaderState_ = b;
  }
};
goog.loadModuleFromSource_ = function(a) {
  eval(a);
  return {};
};
goog.normalizePath_ = function(a) {
  a = a.split("/");
  for (var b = 0; b < a.length; )
    "." == a[b]
      ? a.splice(b, 1)
      : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1]
      ? a.splice(--b, 2)
      : b++;
  return a.join("/");
};
goog.loadFileSync_ = function(a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC)
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  try {
    var b = new goog.global.XMLHttpRequest();
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null;
  } catch (c) {
    return null;
  }
};
goog.retrieveAndExec_ = function(a, b, c) {
  if (!COMPILED) {
    var d = a;
    a = goog.normalizePath_(a);
    var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
      f = goog.loadFileSync_(a);
    if (null == f) throw Error('Load of "' + a + '" failed');
    c && (f = goog.transpile_.call(goog.global, f, a));
    f = b ? goog.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
    goog.IS_OLD_IE_ && goog.oldIeWaiting_
      ? ((goog.dependencies_.deferred[d] = f), goog.queuedModules_.push(d))
      : e(a, f);
  }
};
goog.transpile_ = function(a, b) {
  var c = goog.global.$jscomp;
  c || (goog.global.$jscomp = c = {});
  var d = c.transpile;
  if (!d) {
    var e = goog.basePath + goog.TRANSPILER,
      f = goog.loadFileSync_(e);
    if (f) {
      eval(f + "\n//# sourceURL=" + e);
      if (
        goog.global.$gwtExport &&
        goog.global.$gwtExport.$jscomp &&
        !goog.global.$gwtExport.$jscomp.transpile
      )
        throw Error(
          'The transpiler did not properly export the "transpile" method. $gwtExport: ' +
            JSON.stringify(goog.global.$gwtExport)
        );
      goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
      c = goog.global.$jscomp;
      d = c.transpile;
    }
  }
  d ||
    (d = c.transpile = function(a, b) {
      goog.logToConsole_(
        b + " requires transpilation but no transpiler was found."
      );
      return a;
    });
  return d(a, b);
};
goog.typeOf = function(a) {
  var b = typeof a;
  if ("object" == b)
    if (a) {
      if (a instanceof Array) return "array";
      if (a instanceof Object) return b;
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) return "object";
      if (
        "[object Array]" == c ||
        ("number" == typeof a.length &&
          "undefined" != typeof a.splice &&
          "undefined" != typeof a.propertyIsEnumerable &&
          !a.propertyIsEnumerable("splice"))
      )
        return "array";
      if (
        "[object Function]" == c ||
        ("undefined" != typeof a.call &&
          "undefined" != typeof a.propertyIsEnumerable &&
          !a.propertyIsEnumerable("call"))
      )
        return "function";
    } else return "null";
  else if ("function" == b && "undefined" == typeof a.call) return "object";
  return b;
};
goog.isNull = function(a) {
  return null === a;
};
goog.isDefAndNotNull = function(a) {
  return null != a;
};
goog.isArray = function(a) {
  return "array" == goog.typeOf(a);
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return "array" == b || ("object" == b && "number" == typeof a.length);
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isString = function(a) {
  return "string" == typeof a;
};
goog.isBoolean = function(a) {
  return "boolean" == typeof a;
};
goog.isNumber = function(a) {
  return "number" == typeof a;
};
goog.isFunction = function(a) {
  return "function" == goog.typeOf(a);
};
goog.isObject = function(a) {
  var b = typeof a;
  return ("object" == b && null != a) || "function" == b;
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
  return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + ((1e9 * Math.random()) >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (a.clone) return a.clone();
    var b = "array" == b ? [] : {},
      c;
    for (c in a) b[c] = goog.cloneObject(a[c]);
    return b;
  }
  return a;
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
  if (!a) throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
};
goog.bind = function(a, b, c) {
  Function.prototype.bind &&
  -1 != Function.prototype.bind.toString().indexOf("native code")
    ? (goog.bind = goog.bindNative_)
    : (goog.bind = goog.bindJs_);
  return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = c.slice();
    b.push.apply(b, arguments);
    return a.apply(this, b);
  };
};
goog.mixin = function(a, b) {
  for (var c in b) a[c] = b[c];
};
goog.now =
  (goog.TRUSTED_SITE && Date.now) ||
  function() {
    return +new Date();
  };
goog.globalEval = function(a) {
  if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
  else if (goog.global.eval) {
    if (null == goog.evalWorksForGlobals_)
      if (
        (goog.global.eval("var _evalTest_ = 1;"),
        "undefined" != typeof goog.global._evalTest_)
      ) {
        try {
          delete goog.global._evalTest_;
        } catch (d) {}
        goog.evalWorksForGlobals_ = !0;
      } else goog.evalWorksForGlobals_ = !1;
    if (goog.evalWorksForGlobals_) goog.global.eval(a);
    else {
      var b = goog.global.document,
        c = b.createElement("SCRIPT");
      c.type = "text/javascript";
      c.defer = !1;
      c.appendChild(b.createTextNode(a));
      b.body.appendChild(c);
      b.body.removeChild(c);
    }
  } else throw Error("goog.globalEval not available");
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  if ("." == String(a).charAt(0))
    throw Error(
      'className passed in goog.getCssName must not start with ".". You passed: ' +
        a
    );
  var c = function(a) {
      return goog.cssNameMapping_[a] || a;
    },
    d = function(a) {
      a = a.split("-");
      for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
      return b.join("-");
    },
    d = goog.cssNameMapping_
      ? "BY_WHOLE" == goog.cssNameMappingStyle_
        ? c
        : d
      : function(a) {
          return a;
        },
    d = b ? a + "-" + d(b) : d(a);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN
    ? goog.global.CLOSURE_CSS_NAME_MAP_FN(d)
    : d;
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED &&
  goog.global.CLOSURE_CSS_NAME_MAPPING &&
  (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  b &&
    (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
      return null != b && d in b ? b[d] : a;
    }));
  return a;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c);
};
goog.exportProperty = function(a, b, c) {
  a[b] = c;
};
goog.inherits = function(a, b) {
  function c() {}
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.base = function(a, c, f) {
    for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
      d[e - 2] = arguments[e];
    return b.prototype[c].apply(a, d);
  };
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || (goog.DEBUG && !d))
    throw Error(
      "arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C"
    );
  if (d.superClass_) {
    for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++)
      e[f - 1] = arguments[f];
    return d.superClass_.constructor.apply(a, e);
  }
  e = Array(arguments.length - 2);
  for (f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
  for (
    var f = !1, g = a.constructor;
    g;
    g = g.superClass_ && g.superClass_.constructor
  )
    if (g.prototype[b] === d) f = !0;
    else if (f) return g.prototype[b].apply(a, e);
  if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
  throw Error(
    "goog.base called from a method of one name to a method of a different name"
  );
};
goog.scope = function(a) {
  if (goog.isInModuleLoader_())
    throw Error("goog.scope is not supported within a goog.module.");
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
  var c = b.constructor,
    d = b.statics;
  (c && c != Object.prototype.constructor) ||
    (c = function() {
      throw Error("cannot instantiate an interface (no constructor defined).");
    });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d &&
    (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES) return a;
  var c = !goog.defineClass.isUnsealable_(b),
    d = function() {
      var b = a.apply(this, arguments) || this;
      b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
      this.constructor === d &&
        c &&
        Object.seal instanceof Function &&
        Object.seal(b);
      return b;
    };
  return d;
};
goog.defineClass.isUnsealable_ = function(a) {
  return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
  " "
);
goog.defineClass.applyProperties_ = function(a, b) {
  for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++)
    (c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d]),
      Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
};
goog.tagUnsealableClass = function(a) {
  !COMPILED &&
    goog.defineClass.SEAL_CLASS_INSTANCES &&
    (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.createRequiresTranspilation_ = function() {
  function a(a, b) {
    d ? (c[a] = !0) : b() ? (c[a] = !1) : (d = c[a] = !0);
  }
  function b(a) {
    try {
      return !!eval(a);
    } catch (g) {
      return !1;
    }
  }
  var c = { es3: !1 },
    d = !1,
    e =
      goog.global.navigator && goog.global.navigator.userAgent
        ? goog.global.navigator.userAgent
        : "";
  a("es5", function() {
    return b("[1,].length==1");
  });
  a("es6", function() {
    var a = e.match(/Edge\/(\d+)(\.\d)*/i);
    return a && 15 > Number(a[1])
      ? !1
      : b(
          '(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()'
        );
  });
  a("es6-impl", function() {
    return !0;
  });
  a("es7", function() {
    return b("2 ** 2 == 4");
  });
  a("es8", function() {
    return b("async () => 1, true");
  });
  return c;
};
var sre = { SystemExternal: function() {} };
sre.SystemExternal.require = function(a) {
  return "undefined" !== typeof require ? require(a) : null;
};
sre.SystemExternal.documentSupported = function() {
  return "undefined" != typeof document;
};
sre.SystemExternal.process = sre.SystemExternal.require("process");
sre.SystemExternal.xmldom = sre.SystemExternal.documentSupported()
  ? window
  : sre.SystemExternal.require("xmldom");
sre.SystemExternal.document = sre.SystemExternal.documentSupported()
  ? document
  : new sre.SystemExternal.xmldom.DOMImplementation().createDocument("", "", 0);
sre.SystemExternal.xpath = sre.SystemExternal.documentSupported()
  ? document
  : sre.SystemExternal.require("xpath");
sre.SystemExternal.commander = sre.SystemExternal.documentSupported()
  ? null
  : sre.SystemExternal.require("commander");
sre.SystemExternal.fs = sre.SystemExternal.documentSupported()
  ? null
  : sre.SystemExternal.require("fs");
sre.SystemExternal.xm = sre.SystemExternal.documentSupported()
  ? null
  : sre.SystemExternal.require("xml-mapping");
sre.SystemExternal.locationSupported = function() {
  return "undefined" != typeof location;
};
sre.SystemExternal.url = sre.SystemExternal.locationSupported()
  ? location.protocol + "//progressiveaccess.com/content"
  : "https://progressiveaccess.com/content";
sre.SystemExternal.jsonPath = (function() {
  return (
    (sre.SystemExternal.process && "undefined" !== typeof global
      ? sre.SystemExternal.process.env.SRE_JSON_PATH ||
        global.SRE_JSON_PATH ||
        sre.SystemExternal.process.cwd()
      : sre.SystemExternal.url + "/mathmaps") + "/"
  );
})();
sre.SystemExternal.WGXpath = sre.SystemExternal.url + "/wgxpath.install.js";
sre.SystemExternal.wgxpath = null;
sre.BrowserUtil = {};
sre.BrowserUtil.detectIE = function() {
  if (
    !(
      "undefined" !== typeof window &&
      "ActiveXObject" in window &&
      "clipboardData" in window
    )
  )
    return !1;
  sre.BrowserUtil.loadMapsForIE_();
  sre.BrowserUtil.loadWGXpath_();
  return !0;
};
sre.BrowserUtil.detectEdge = function() {
  if (
    !(
      "undefined" !== typeof window &&
      "MSGestureEvent" in window &&
      "chrome" in window &&
      null == window.chrome.loadTimes
    )
  )
    return !1;
  document.evaluate = null;
  sre.BrowserUtil.loadWGXpath_(!0);
  return !0;
};
sre.BrowserUtil.mapsForIE = null;
sre.BrowserUtil.loadWGXpath_ = function(a) {
  sre.BrowserUtil.loadScript(sre.SystemExternal.WGXpath);
  sre.BrowserUtil.installWGXpath_(a);
};
sre.BrowserUtil.installWGXpath_ = function(a, b) {
  var c = b || 1;
  "undefined" === typeof wgxpath && 10 > c
    ? setTimeout(function() {
        sre.BrowserUtil.installWGXpath_(a, c++);
      }, 200)
    : 10 <= c ||
      ((sre.SystemExternal.wgxpath = wgxpath),
      a
        ? sre.SystemExternal.wgxpath.install({ document: document })
        : sre.SystemExternal.wgxpath.install(),
      (sre.XpathUtil.xpathEvaluate = document.evaluate),
      (sre.XpathUtil.xpathResult = XPathResult),
      (sre.XpathUtil.createNSResolver = document.createNSResolver));
};
sre.BrowserUtil.loadMapsForIE_ = function() {
  sre.BrowserUtil.loadScript(sre.SystemExternal.jsonPath + "mathmaps_ie.js");
};
sre.BrowserUtil.loadScript = function(a) {
  var b = sre.SystemExternal.document.createElement("script");
  b.type = "text/javascript";
  b.src = a;
  sre.SystemExternal.document.head
    ? sre.SystemExternal.document.head.appendChild(b)
    : sre.SystemExternal.document.body.appendChild(b);
};
sre.DynamicProperties = function(a, b) {
  this.properties_ = a;
  this.order_ = b || Object.keys(a);
};
sre.DynamicProperties.prototype.getProperties = function() {
  return this.properties_;
};
sre.DynamicProperties.prototype.getOrder = function() {
  return this.order_;
};
sre.DynamicProperties.prototype.getAxes = function() {
  return this.order_;
};
sre.DynamicProperties.prototype.getProperty = function(a) {
  return this.properties_[a];
};
sre.DynamicProperties.prototype.toString = function() {
  var a = [];
  this.order_.forEach(
    goog.bind(function(b) {
      a.push(b + ": " + this.getProperty(b).toString());
    }, this)
  );
  return a.join("\n");
};
sre.DynamicCstr = function(a, b) {
  this.components_ = a;
  var c = {},
    d;
  for (d in a) {
    var e = a[d];
    c[d] = [e];
    sre.DynamicCstr.Values_.getInstance().add(d, e);
  }
  sre.DynamicProperties.call(this, c, b);
};
goog.inherits(sre.DynamicCstr, sre.DynamicProperties);
sre.DynamicCstr.prototype.getComponents = function() {
  return this.components_;
};
sre.DynamicCstr.prototype.getValue = function(a) {
  return this.components_[a];
};
sre.DynamicCstr.prototype.getValues = function() {
  var a = [];
  this.order_.forEach(
    goog.bind(function(b) {
      a.push(this.getValue(b));
    }, this)
  );
  return a;
};
sre.DynamicCstr.prototype.toString = function() {
  return this.getValues().join(".");
};
sre.DynamicCstr.prototype.equal = function(a) {
  var b = a.getAxes();
  if (this.order_.length !== b.length) return !1;
  for (var c = 0, d; (d = b[c]); c++) {
    var e = this.getValue(d);
    if (!e || a.getValue(d) !== e) return !1;
  }
  return !0;
};
sre.DynamicCstr.Axis = {
  DOMAIN: "domain",
  STYLE: "style",
  LANGUAGE: "language",
  TOPIC: "topic",
  MODALITY: "modality"
};
sre.DynamicCstr.Values_ = function() {
  this.axisToValues = sre.DynamicCstr.Values_.makeAxisValueObject_();
};
goog.addSingletonGetter(sre.DynamicCstr.Values_);
sre.DynamicCstr.Values_.prototype.add = function(a, b) {
  this.axisToValues[a][b] = !0;
};
sre.DynamicCstr.Values_.prototype.get = function() {
  var a = {},
    b = sre.DynamicCstr.Values_.getInstance().axisToValues,
    c;
  for (c in b) a[c] = Object.keys(b[c]);
  return a;
};
sre.DynamicCstr.Values_.makeAxisValueObject_ = function() {
  var a = {},
    b;
  for (b in sre.DynamicCstr.Axis) a[sre.DynamicCstr.Axis[b]] = {};
  return a;
};
sre.DynamicCstr.getAxisValues = function() {
  return sre.DynamicCstr.Values_.getInstance().get();
};
sre.DynamicCstr.DEFAULT_ORDER = [
  sre.DynamicCstr.Axis.DOMAIN,
  sre.DynamicCstr.Axis.STYLE,
  sre.DynamicCstr.Axis.LANGUAGE,
  sre.DynamicCstr.Axis.TOPIC,
  sre.DynamicCstr.Axis.MODALITY
];
sre.DynamicCstr.DEFAULT_VALUE = "default";
sre.DynamicCstr.Parser = function(a) {
  this.order_ = a;
};
sre.DynamicCstr.Parser.prototype.parse = function(a) {
  a = a.split(".");
  var b = {};
  if (a.length > this.order_.length)
    throw Error("Invalid dynamic constraint: " + b);
  for (var c = 0, d; (d = this.order_[c]), a.length; c++) {
    var e = a.shift();
    b[d] = e;
  }
  return new sre.DynamicCstr(b, this.order_.slice(0, c));
};
sre.DynamicCstr.Comparator = function() {};
sre.DynamicCstr.Comparator.prototype.getReference = function() {};
sre.DynamicCstr.Comparator.prototype.setReference = function(a, b) {};
sre.DynamicCstr.Comparator.prototype.match = function(a) {};
sre.DynamicCstr.Comparator.prototype.compare = function(a, b) {};
sre.DynamicCstr.DefaultComparator = function(a, b) {
  this.reference_ = a;
  this.fallback_ =
    b || new sre.DynamicProperties(a.getProperties(), a.getOrder());
  this.order_ = this.reference_.getOrder();
};
sre.DynamicCstr.DefaultComparator.prototype.getReference = function() {
  return this.reference_;
};
sre.DynamicCstr.DefaultComparator.prototype.setReference = function(a, b) {
  this.reference_ = a;
  this.fallback_ =
    b || new sre.DynamicProperties(a.getProperties(), a.getOrder());
  this.order_ = this.reference_.getOrder();
};
sre.DynamicCstr.DefaultComparator.prototype.match = function(a) {
  var b = a.getAxes();
  return (
    b.length === this.reference_.getAxes().length &&
    b.every(
      goog.bind(function(b) {
        var c = a.getValue(b);
        return (
          c === this.reference_.getValue(b) ||
          -1 !== this.fallback_.getProperty(b).indexOf(c)
        );
      }, this)
    )
  );
};
sre.DynamicCstr.DefaultComparator.prototype.compare = function(a, b) {
  for (var c = !1, d = 0, e; (e = this.order_[d]); d++) {
    var f = a.getValue(e),
      g = b.getValue(e);
    if (!c) {
      var h = this.reference_.getValue(e);
      if (h === f && h !== g) return -1;
      if (h === g && h !== f) return 1;
      if (h === f && h === g) continue;
      h !== f && h !== g && (c = !0);
    }
    e = this.fallback_.getProperty(e);
    f = e.indexOf(f);
    g = e.indexOf(g);
    if (f < g) return -1;
    if (g < f) return 1;
  }
  return 0;
};
sre.DynamicProperties.create = function(a) {
  for (
    var b = sre.DynamicCstr.DEFAULT_ORDER,
      c = {},
      d = Array.prototype.slice.call(arguments, 0),
      e = 0,
      f = d.length,
      g = b.length;
    e < f && e < g;
    e++
  )
    c[b[e]] = d[e];
  return new sre.DynamicProperties(c);
};
sre.DynamicCstr.create = function(a) {
  for (
    var b = sre.DynamicCstr.DEFAULT_ORDER,
      c = {},
      d = Array.prototype.slice.call(arguments, 0),
      e = 0,
      f = d.length,
      g = b.length;
    e < f && e < g;
    e++
  )
    c[b[e]] = d[e];
  return new sre.DynamicCstr(c);
};
sre.DynamicCstr.defaultCstr = function() {
  return sre.DynamicCstr.create.apply(null, sre.DynamicCstr.defaults_());
};
sre.DynamicCstr.defaults_ = function() {
  return Array.apply(null, Array(sre.DynamicCstr.DEFAULT_ORDER.length + 1)).map(
    function() {
      return sre.DynamicCstr.DEFAULT_VALUE;
    }
  );
};
sre.DynamicCstr.validOrder = function(a) {
  var b = sre.DynamicCstr.DEFAULT_ORDER.slice();
  return a.every(function(a) {
    a = b.indexOf(a);
    return -1 !== a && b.splice(a, 1);
  });
};
sre.Engine = function() {
  this.alternativeHost = this.activeHost = null;
  this.evaluator = sre.Engine.defaultEvaluator;
  this.dynamicCstr = sre.DynamicCstr.defaultCstr();
  this.comparator = null;
  this.domain = "default";
  this.style = "short";
  this.walker = "Syntax";
  this.semantics = !1;
  this.mode = sre.Engine.Mode.SYNC;
  this.speech = sre.Engine.Speech.NONE;
  this.ruleSets = [];
  this.cache = !0;
  this.markup = sre.Engine.Markup.NONE;
  this.isEdge = this.isIE = this.strict = !1;
  this.setupTests_ = [];
};
goog.addSingletonGetter(sre.Engine);
sre.Engine.personalityProps = {
  PITCH: "pitch",
  RATE: "rate",
  VOLUME: "volume",
  PAUSE: "pause"
};
sre.Engine.Mode = { SYNC: "sync", ASYNC: "async", HTTP: "http" };
sre.Engine.Speech = { NONE: "none", SHALLOW: "shallow", DEEP: "deep" };
sre.Engine.Markup = {
  NONE: "none",
  SSML: "ssml",
  ACSS: "acss",
  SABLE: "sable",
  VOICEXML: "voicexml"
};
sre.Engine.registerTest = function(a) {
  sre.Engine.getInstance().setupTests_.push(a);
};
sre.Engine.isReady = function() {
  return sre.Engine.getInstance().setupTests_.every(function(a) {
    return a();
  });
};
sre.Engine.prototype.setupBrowsers = function() {
  this.isIE = sre.BrowserUtil.detectIE();
  this.isEdge = sre.BrowserUtil.detectEdge();
};
sre.Engine.prototype.getAxisValues = function() {
  return sre.DynamicCstr.getAxisValues();
};
sre.Engine.defaultEvaluator = function(a, b) {
  return a;
};
sre.XpathUtil = {};
sre.XpathUtil.xpathSupported = function() {
  return "undefined" == typeof XPathResult ? !1 : !0;
};
sre.XpathUtil.currentDocument = null;
sre.XpathUtil.xpathEvaluate = sre.XpathUtil.xpathSupported()
  ? document.evaluate
  : sre.SystemExternal.xpath.evaluate;
sre.XpathUtil.xpathResult = sre.XpathUtil.xpathSupported()
  ? XPathResult
  : sre.SystemExternal.xpath.XPathResult;
sre.XpathUtil.createNSResolver = sre.XpathUtil.xpathSupported()
  ? document.createNSResolver
  : sre.SystemExternal.xpath.createNSResolver;
sre.XpathUtil.nameSpaces_ = {
  xhtml: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};
sre.XpathUtil.resolveNameSpace = function(a) {
  return sre.XpathUtil.nameSpaces_[a] || null;
};
sre.XpathUtil.resolver_ = function() {
  this.lookupNamespaceURI = sre.XpathUtil.resolveNameSpace;
};
sre.XpathUtil.evaluateXpath_ = function(a, b, c) {
  var d = sre.Engine.getInstance();
  return d.mode !== sre.Engine.Mode.HTTP || d.isIE || d.isEdge
    ? sre.XpathUtil.xpathEvaluate(a, b, new sre.XpathUtil.resolver_(), c, null)
    : sre.XpathUtil.currentDocument.evaluate(
        a,
        b,
        sre.XpathUtil.resolveNameSpace,
        c,
        null
      );
};
sre.XpathUtil.evalXPath = function(a, b) {
  try {
    var c = sre.XpathUtil.evaluateXpath_(
      a,
      b,
      sre.XpathUtil.xpathResult.ORDERED_NODE_ITERATOR_TYPE
    );
  } catch (f) {
    return [];
  }
  for (var d = [], e = c.iterateNext(); e; e = c.iterateNext()) d.push(e);
  return d;
};
sre.XpathUtil.getLeafNodes = function(a) {
  return sre.XpathUtil.evalXPath(".//*[count(*)=0]", a);
};
sre.XpathUtil.evaluateBoolean = function(a, b) {
  try {
    var c = sre.XpathUtil.evaluateXpath_(
      a,
      b,
      sre.XpathUtil.xpathResult.BOOLEAN_TYPE
    );
  } catch (d) {
    return !1;
  }
  return c.booleanValue;
};
sre.XpathUtil.evaluateString = function(a, b) {
  try {
    var c = sre.XpathUtil.evaluateXpath_(
      a,
      b,
      sre.XpathUtil.xpathResult.STRING_TYPE
    );
  } catch (d) {
    return "";
  }
  return c.stringValue;
};
sre.DomUtil = {};
sre.DomUtil.toArray = function(a) {
  for (var b = [], c = 0, d = a.length; c < d; c++) b.push(a[c]);
  return b;
};
sre.DomUtil.trimInput_ = function(a) {
  a = a.replace(/&nbsp;/g, " ");
  return a.replace(/>\s+</g, "><").trim();
};
sre.DomUtil.parseInput = function(a, b) {
  var c = b || Error,
    d = new sre.SystemExternal.xmldom.DOMParser(),
    e = sre.DomUtil.trimInput_(a);
  if (!e) throw new c("Empty input!");
  try {
    var f = d.parseFromString(e, "text/xml");
    sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP &&
      (sre.XpathUtil.currentDocument = f);
    return f.documentElement;
  } catch (g) {
    throw new c("Illegal input: " + g.message);
  }
};
sre.DomUtil.NodeType = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
};
sre.DomUtil.replaceNode = function(a, b) {
  a.parentNode &&
    (a.parentNode.insertBefore(b, a), a.parentNode.removeChild(a));
};
sre.DomUtil.createElement = function(a) {
  return sre.SystemExternal.document.createElement(a);
};
sre.DomUtil.createTextNode = function(a) {
  return sre.SystemExternal.document.createTextNode(a);
};
sre.DomUtil.formatXml = function(a) {
  var b = /(>)(<)(\/*)/g;
  a = a.replace(b, "$1\r\n$2$3");
  b = /(>)(.+)(<c)/g;
  a = a.replace(b, "$1\r\n$2\r\n$3");
  var c = "",
    d = "";
  a.split("\r\n").forEach(function(a) {
    a.match(/.+<\/\w[^>]*>$/)
      ? (c += d + a + "\r\n")
      : a.match(/^<\/\w/)
      ? d && ((d = d.slice(2)), (c += d + a + "\r\n"))
      : a.match(/^<\w[^>]*[^\/]>.*$/)
      ? ((c += d + a + "\r\n"), (d += "  "))
      : (c += d + a + "\r\n");
  });
  return c;
};
sre.DomUtil.dataAttribute = function(a) {
  a.match(/^data-/) && (a = a.substr(5));
  return a.replace(/-([a-z])/g, function(a, c) {
    return c.toUpperCase();
  });
};
sre.DomUtil.getDataAttribute = function(a, b) {
  return a.dataset
    ? a.dataset[sre.DomUtil.dataAttribute(b)]
    : a.getAttribute(b);
};
sre.DomUtil.querySelectorAllByAttr = function(a, b) {
  return a.querySelectorAll
    ? sre.DomUtil.toArray(a.querySelectorAll("[" + b + "]"))
    : sre.XpathUtil.evalXPath(".//*[@" + b + "]", a);
};
sre.DomUtil.querySelectorAllByAttrValue = function(a, b, c) {
  return a.querySelectorAll
    ? sre.DomUtil.toArray(a.querySelectorAll("[" + b + '="' + c + '"]'))
    : sre.XpathUtil.evalXPath(".//*[@" + b + '="' + c + '"]', a);
};
sre.DomUtil.querySelectorAll = function(a, b) {
  return a.querySelectorAll
    ? sre.DomUtil.toArray(a.querySelectorAll(b))
    : sre.XpathUtil.evalXPath(".//" + b, a);
};
sre.DomUtil.tagName = function(a) {
  return a.tagName.toUpperCase();
};
sre.BaseUtil = {};
sre.BaseUtil.removeEmpty = function(a) {
  return a.filter(function(a) {
    return a;
  });
};
sre.BaseUtil.interleaveLists = function(a, b) {
  for (var c = []; a.length || b.length; )
    a.length && c.push(a.shift()), b.length && c.push(b.shift());
  return c;
};
sre.BaseUtil.setdifference = function(a, b) {
  return a
    ? b
      ? a.filter(function(a) {
          return 0 > b.indexOf(a);
        })
      : a
    : [];
};
sre.BaseUtil.union = function(a, b) {
  return a && b ? a.concat(sre.BaseUtil.setdifference(b, a)) : a || b || [];
};
sre.BaseUtil.makePath = function(a) {
  return a.match("/$") ? a : a + "/";
};
sre.AuditoryDescription = function(a) {
  this.context = a.context || "";
  this.text = a.text || "";
  this.userValue = a.userValue || "";
  this.annotation = a.annotation || "";
  this.personality = a.personality || {};
};
sre.AuditoryDescription.create = function(a, b) {
  a.text = sre.Grammar.getInstance().apply(a.text, b || {});
  return new sre.AuditoryDescription(a);
};
sre.AuditoryDescription.prototype.isEmpty = function() {
  return (
    0 == this.context.length &&
    0 == this.text.length &&
    0 == this.userValue.length &&
    0 == this.annotation.length
  );
};
sre.AuditoryDescription.prototype.clone = function() {
  var a;
  if (this.personality) {
    a = {};
    for (var b in this.personality) a = this.personality[b];
  }
  return new sre.AuditoryDescription({
    context: this.context,
    text: this.text,
    userValue: this.userValue,
    annotation: this.annotation,
    personality: a
  });
};
sre.AuditoryDescription.prototype.toString = function() {
  return (
    'AuditoryDescription(context="' +
    this.context +
    '"  text="' +
    this.text +
    '"  userValue="' +
    this.userValue +
    '"  annotation="' +
    this.annotation +
    '")'
  );
};
sre.AuditoryDescription.prototype.descriptionString = function() {
  return this.context ? this.context + " " + this.text : this.text;
};
sre.AuditoryDescription.prototype.equals = function(a) {
  return (
    this.context == a.context &&
    this.text == a.text &&
    this.userValue == a.userValue &&
    this.annotation == a.annotation
  );
};
sre.AuditoryDescription.speechString = function(a, b) {
  return sre.AuditoryDescription.toString_(a, "" === b ? "" : b || " ");
};
sre.AuditoryDescription.toString_ = function(a, b) {
  switch (sre.Engine.getInstance().markup) {
    case sre.Engine.Markup.SABLE:
    case sre.Engine.Markup.SSML:
    case sre.Engine.Markup.VOICEXML:
      return sre.AuditoryDescription.toMarkupString_(a, b);
    case sre.Engine.Markup.ACSS:
      return sre.AuditoryDescription.toAcssString_(a, b);
    default:
      return sre.AuditoryDescription.toSimpleString_(a, b);
  }
};
sre.AuditoryDescription.toSimpleString_ = function(a, b) {
  return sre.BaseUtil.removeEmpty(
    a.map(function(a) {
      return a.descriptionString();
    })
  ).join(b);
};
sre.AuditoryDescription.toAcssString_ = function(a, b) {
  sre.AuditoryDescription.setScaleFunction(-2, 2, 0, 10, 0);
  for (
    var c = sre.AuditoryDescription.personalityMarkup_(a),
      d = [],
      e = { open: [] },
      f = null,
      g = !1,
      h = 0,
      k;
    (k = c[h]);
    h++
  )
    if (sre.AuditoryDescription.isMarkupElement_(k))
      sre.AuditoryDescription.mergeMarkup_(e, k);
    else if (sre.AuditoryDescription.isPauseElement_(k))
      g && (f = sre.AuditoryDescription.mergePause_(f, k, Math.max));
    else {
      k = '"' + k.string + '"';
      g = !0;
      f && (d.push(sre.AuditoryDescription.sexpPause_(f)), (f = null));
      var l = sre.AuditoryDescription.sexpProsody_(e);
      d.push(l ? "(text (" + l + ") " + k + ")" : k);
    }
  return "(exp " + d.join(b) + ")";
};
sre.AuditoryDescription.mergePause_ = function(a, b, c) {
  return a
    ? {
        pause: (
          c ||
          function(a, b) {
            return a + b;
          }
        ).call(null, a.pause, b.pause)
      }
    : b;
};
sre.AuditoryDescription.mergeMarkup_ = function(a, b) {
  delete a.open;
  b.close.forEach(function(b) {
    delete a[b];
  });
  b.open.forEach(function(c) {
    a[c] = b[c];
  });
  var c = Object.keys(a);
  a.open = c;
};
sre.AuditoryDescription.sexpProsody_ = function(a) {
  for (var b = a.open, c = [], d = 0, e; (e = b[d]); d++)
    c.push(sre.AuditoryDescription.sexpProsodyElement_(e, a[e]));
  return c.join(" ");
};
sre.AuditoryDescription.sexpProsodyElement_ = function(a, b) {
  b = sre.AuditoryDescription.applyScaleFunction(b);
  switch (a) {
    case sre.Engine.personalityProps.RATE:
      return "(richness . " + b + ")";
    case sre.Engine.personalityProps.PITCH:
      return "(average-pitch . " + b + ")";
    case sre.Engine.personalityProps.VOLUME:
      return "(stress . " + b + ")";
  }
  return "(value . " + b + ")";
};
sre.AuditoryDescription.sexpPause_ = function(a) {
  return "(pause . " + a[sre.Engine.personalityProps.PAUSE] + ")";
};
sre.AuditoryDescription.toMarkupString_ = function(a, b) {
  sre.AuditoryDescription.setScaleFunction(-2, 2, -100, 100, 2);
  for (
    var c = sre.Engine.getInstance().markup === sre.Engine.Markup.SABLE,
      d = c
        ? sre.AuditoryDescription.translateSableTags
        : sre.AuditoryDescription.translateSsmlTags,
      e = sre.AuditoryDescription.personalityMarkup_(a),
      f = [],
      g = [],
      h = 0,
      k;
    (k = e[h]);
    h++
  )
    if (k.string) f.push(k.string);
    else if (sre.AuditoryDescription.isPauseElement_(k))
      f.push(
        "<BREAK " +
          (c
            ? 'MSEC="' + k[sre.Engine.personalityProps.PAUSE] + '"/>'
            : 'TIME="' + k[sre.Engine.personalityProps.PAUSE] + 'ms"/>')
      );
    else {
      if (k.close.length)
        for (var l = 0; l < k.close.length; l++) {
          var m = g.pop();
          if (-1 === k.close.indexOf(m))
            throw Error("Unknown closing markup element: " + m);
          f.push("</" + (c ? m.toUpperCase() : "PROSODY") + ">");
        }
      k.open.length &&
        sre.AuditoryDescription.sortClose(
          k.open.slice(),
          e.slice(h + 1)
        ).forEach(function(a) {
          f.push(d(a, k[a]));
          g.push(a);
        });
    }
  return f.join(b);
};
sre.AuditoryDescription.sortClose = function(a, b) {
  if (1 >= a.length) return a;
  for (var c = [], d = 0, e; (e = b[d]), a.length; d++)
    e.close &&
      e.close.length &&
      e.close.forEach(function(b) {
        var d = a.indexOf(b);
        -1 !== d && (c.unshift(b), a.splice(d, 1));
      });
  return c;
};
sre.AuditoryDescription.translateSableTags = function(a, b) {
  b = sre.AuditoryDescription.applyScaleFunction(b);
  switch (a) {
    case sre.Engine.personalityProps.PITCH:
      return '<PITCH BASE="' + b + '%">';
    case sre.Engine.personalityProps.RATE:
      return '<RATE SPEED="' + b + '%">';
    case sre.Engine.personalityProps.VOLUME:
      return '<VOLUME LEVEL="' + b + '%">';
    default:
      return "<" + a.toUpperCase() + ' VALUE="' + b + '">';
  }
};
sre.AuditoryDescription.translateSsmlTags = function(a, b) {
  b = sre.AuditoryDescription.applyScaleFunction(b);
  var c = 0 > b ? b.toString() : "+" + b;
  return (
    "<PROSODY " +
    a.toUpperCase() +
    '="' +
    c +
    (a === sre.Engine.personalityProps.VOLUME ? ">" : '%">')
  );
};
sre.AuditoryDescription.setScaleFunction = function(a, b, c, d, e) {
  var f = e || 0;
  sre.AuditoryDescription.SCALE = function(e) {
    e = (e - a) / (b - a);
    return +(Math.round(c * (1 - e) + d * e + "e+" + f) + "e-" + f);
  };
};
sre.AuditoryDescription.applyScaleFunction = function(a) {
  return sre.AuditoryDescription.SCALE ? sre.AuditoryDescription.SCALE(a) : a;
};
sre.AuditoryDescription.PersonalityRanges_ = {};
sre.AuditoryDescription.LastOpen_ = [];
sre.AuditoryDescription.personalityMarkup_ = function(a) {
  sre.AuditoryDescription.PersonalityRanges_ = {};
  sre.AuditoryDescription.LastOpen_ = [];
  for (var b = [], c = {}, d = 0, e; (e = a[d]); d++) {
    var f = null,
      g = e.descriptionString();
    e = e.personality;
    void 0 !== e[sre.Engine.personalityProps.PAUSE] &&
      ((f = {}),
      (f[sre.Engine.personalityProps.PAUSE] =
        e[sre.Engine.personalityProps.PAUSE]),
      delete e[sre.Engine.personalityProps.PAUSE]);
    e = sre.AuditoryDescription.personalityDiff_(e, c);
    sre.AuditoryDescription.appendMarkup_(b, g, e, f, !0);
  }
  return b;
};
sre.AuditoryDescription.isMarkupElement_ = function(a) {
  return "object" === typeof a && a.open;
};
sre.AuditoryDescription.isPauseElement_ = function(a) {
  return (
    "object" === typeof a &&
    1 === Object.keys(a).length &&
    Object.keys(a)[0] === sre.Engine.personalityProps.PAUSE
  );
};
sre.AuditoryDescription.isStringElement_ = function(a) {
  return (
    "object" === typeof a &&
    1 === Object.keys(a).length &&
    "string" === Object.keys(a)[0]
  );
};
sre.AuditoryDescription.appendMarkup_ = function(a, b, c, d, e) {
  if (e) {
    if (
      (e = a[a.length - 1]) &&
      !b &&
      d &&
      sre.AuditoryDescription.isPauseElement_(e)
    ) {
      var f = sre.Engine.personalityProps.PAUSE;
      e[f] += d[f];
      d = null;
    }
    e &&
      b &&
      0 === Object.keys(c).length &&
      sre.AuditoryDescription.isStringElement_(e) &&
      ((e.string += " " + b), (b = ""));
  }
  0 !== Object.keys(c).length && a.push(c);
  b && a.push({ string: b });
  d && a.push(d);
};
sre.AuditoryDescription.personalityDiff_ = function(a, b) {
  if (!b) return a;
  var c = {},
    d;
  for (d in sre.Engine.personalityProps) {
    var e = sre.Engine.personalityProps[d],
      f = a[e],
      g = b[e];
    if (!((!f && !g) || (f && g && f === g))) {
      var h = f || 0;
      sre.AuditoryDescription.isMarkupElement_(c) ||
        ((c.open = []), (c.close = []));
      f || c.close.push(e);
      g || c.open.push(e);
      g && f && (c.close.push(e), c.open.push(e));
      b[e] = h;
      c[e] = h;
      sre.AuditoryDescription.PersonalityRanges_[e]
        ? sre.AuditoryDescription.PersonalityRanges_[e].push(h)
        : (sre.AuditoryDescription.PersonalityRanges_[e] = [h]);
    }
  }
  if (sre.AuditoryDescription.isMarkupElement_(c)) {
    for (d = c.close.slice(); 0 < d.length; )
      if (
        ((e = sre.AuditoryDescription.LastOpen_.pop()),
        (f = sre.BaseUtil.setdifference(e, d)),
        (d = sre.BaseUtil.setdifference(d, e)),
        (e = f),
        0 === d.length)
      )
        0 !== e.length && sre.AuditoryDescription.LastOpen_.push(e);
      else if (0 !== e.length)
        for (
          c.close = c.close.concat(e), c.open = c.open.concat(e), f = 0;
          (g = e[f]);
          f++
        )
          c[g] = b[g];
    sre.AuditoryDescription.LastOpen_.push(c.open);
  }
  return c;
};
sre.AuditoryDescription.mergeStrings = function(a) {
  switch (sre.Engine.getInstance().markup) {
    case sre.Engine.Markup.ACSS:
      return (
        "(exp " +
        a
          .map(function(a) {
            return a.replace(/^\(exp /, "").replace(/\)$/, "");
          })
          .join(" ") +
        ")"
      );
    default:
      return a.join(" ");
  }
};
sre.AuditoryDescription.error = function(a) {
  switch (sre.Engine.getInstance().markup) {
    case sre.Engine.Markup.ACSS:
      return '(error "' + a + '")';
    default:
      return null;
  }
};
sre.Debugger = function() {
  this.isActive_ = !1;
  this.outputFunction_ = console.log;
  this.stream_ = null;
};
goog.addSingletonGetter(sre.Debugger);
sre.Debugger.prototype.init = function(a) {
  a && this.startDebugFile_(a);
  this.isActive_ = !0;
};
sre.Debugger.prototype.startDebugFile_ = function(a) {
  this.stream_ = sre.SystemExternal.fs.createWriteStream(a);
  this.outputFunction_ = goog.bind(function(a) {
    var b = Array.prototype.slice.call(arguments, 0);
    this.stream_.write(b.join(" "));
    this.stream_.write("\n");
  }, this);
  this.stream_.on(
    "error",
    goog.bind(function(a) {
      console.log("Invalid log file. Debug information sent to console.");
      this.outputFunction_ = console.log;
    }, this)
  );
  this.stream_.on("finish", function() {
    console.log("Finalizing debug file.");
  });
};
sre.Debugger.prototype.output_ = function(a) {
  this.outputFunction_.apply(
    console.log === this.outputFunction_ ? console : this.outputFunction_,
    ["Speech Rule Engine Debugger:"].concat(a)
  );
};
sre.Debugger.prototype.output = function(a) {
  this.isActive_ && this.output_(Array.prototype.slice.call(arguments, 0));
};
sre.Debugger.prototype.generateOutput = function(a) {
  this.isActive_ && this.output_(a.apply(a, []));
};
sre.Debugger.prototype.exit = function(a) {
  this.isActive_ &&
    this.stream_ &&
    this.stream_.end("", "", a || function() {});
  this.isActive_ = !1;
};
sre.EnrichCase = function() {};
sre.EnrichCase.prototype.getMathml = function() {};
sre.AbstractEnrichCase = function(a) {
  this.semantic = a;
};
sre.AbstractEnrichCase.prototype.getMathml = goog.abstractMethod;
sre.AbstractEnrichCase.test = goog.abstractMethod;
sre.EnrichCaseFactory = function() {};
sre.EnrichCaseFactory.getEmbellishedCase = function(a) {
  return new sre.EnrichCaseFactory.embellishedCase(a);
};
sre.EnrichCaseFactory.cases = [];
sre.EnrichCaseFactory.getCase = function(a) {
  for (var b = 0, c; (c = sre.EnrichCaseFactory.cases[b]); b++)
    if (c.test(a)) return new c.constr(a);
  return null;
};
sre.SemanticUtil = function() {};
sre.SemanticUtil.objectsToKeys = function(a) {
  a = Array.prototype.slice.call(arguments, 0);
  var b = [];
  return b.concat.apply(b, a.map(Object.keys));
};
sre.SemanticUtil.objectsToValues = function(a) {
  a = Array.prototype.slice.call(arguments, 0);
  var b = [];
  a.forEach(function(a) {
    for (var c in a) b.push(a[c]);
  });
  return b;
};
sre.SemanticUtil.unicodeToNumber = function(a) {
  if (!a || 2 < a.length) return null;
  if (2 == a.length) {
    var b = a.charCodeAt(0);
    a = a.charCodeAt(1);
    return 55296 <= b && 56319 >= b && !isNaN(a)
      ? 1024 * (b - 55296) + (a - 56320) + 65536
      : null;
  }
  return a.charCodeAt(0);
};
sre.SemanticUtil.numberToUnicode = function(a) {
  return 65536 > a
    ? String.fromCharCode(a)
    : String.fromCharCode(
        (a - 65536) / 1024 + 55296,
        ((a - 65536) % 1024) + 56320
      );
};
sre.SemanticUtil.splitUnicode = function(a) {
  a = a.split("");
  for (var b = [], c = 0, d; (d = a[c]); c++)
    "\ud800" <= d && "\udbff" >= d && a[c + 1] ? b.push(d + a[++c]) : b.push(d);
  return b;
};
sre.SemanticUtil.LEAFTAGS = ["MO", "MI", "MN", "MTEXT", "MS"];
sre.SemanticUtil.IGNORETAGS = "MERROR MPHANTOM MSPACE MALIGNGROUP MALIGNMARK MPRESCRIPTS ANNOTATION ANNOTATION-XML".split(
  " "
);
sre.SemanticUtil.EMPTYTAGS = "MATH MROW MPADDED MACTION NONE MSTYLE SEMANTICS".split(
  " "
);
sre.SemanticUtil.hasMathTag = function(a) {
  return !!a && "MATH" === sre.DomUtil.tagName(a);
};
sre.SemanticUtil.hasIgnoreTag = function(a) {
  return (
    !!a && -1 !== sre.SemanticUtil.IGNORETAGS.indexOf(sre.DomUtil.tagName(a))
  );
};
sre.SemanticUtil.hasEmptyTag = function(a) {
  return (
    !!a && -1 !== sre.SemanticUtil.EMPTYTAGS.indexOf(sre.DomUtil.tagName(a))
  );
};
sre.SemanticUtil.purgeNodes = function(a) {
  for (var b = [], c = 0, d; (d = a[c]); c++) {
    var e = sre.DomUtil.tagName(d);
    -1 == sre.SemanticUtil.IGNORETAGS.indexOf(e) &&
      ((-1 != sre.SemanticUtil.EMPTYTAGS.indexOf(e) &&
        0 == d.childNodes.length) ||
        b.push(d));
  }
  return b;
};
sre.SemanticUtil.isZeroLength = function(a) {
  return a
    ? -1 !==
      "negativeveryverythinmathspace negativeverythinmathspace negativethinmathspace negativemediummathspace negativethickmathspace negativeverythickmathspace negativeveryverythickmathspace"
        .split(" ")
        .indexOf(a)
      ? !0
      : (a = a.match(/[0-9\.]+/))
      ? 0 === parseFloat(a)
        ? !0
        : !1
      : !1
    : !1;
};
sre.SemanticAttr = function() {
  this.generalPunctuations = '!"#%&:;?@\\\u00a1\u00a7\u00b6\u00bf\u2017\u2020\u2021\u2022\u2023\u2024\u2025\u2027\u2030\u2031\u2038\u203b\u203c\u203d\u203e\u2041\u2042\u2043\u2047\u2048\u2049\u204b\u204c\u204d\u204e\u204f\u2050\u2051\u2053\u2055\u2056\u2058\u2059\u205a\u205b\u205c\u205d\u205e\ufe10\ufe13\ufe14\ufe15\ufe16\ufe30\ufe45\ufe46\ufe49\ufe4a\ufe4b\ufe4c\ufe50\ufe54\ufe55\ufe56\ufe57\ufe5f\ufe60\ufe61\ufe68\ufe6a\ufe6b\uff01\uff02\uff03\uff05\uff06\uff07\uff0a\uff0c\uff0f\uff1a\uff1b\uff1f\uff20\uff3c'.split(
    ""
  );
  this.invisibleComma_ = sre.SemanticUtil.numberToUnicode(8291);
  this.commas = [",", this.invisibleComma_];
  this.ellipses = "\u2026\u22ee\u22ef\u22f0\u22f1\ufe19".split("");
  this.fullStops = [".", "\ufe52", "\uff0e"];
  this.dashes = "\u2012\u2013\u2014\u2015\u301c\ufe31\ufe32\ufe58".split("");
  this.primes = "'\u2032\u2033\u2034\u2035\u2036\u2037\u2057".split("");
  this.openClosePairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "\u2045": "\u2046",
    "\u2329": "\u232a",
    "\u2768": "\u2769",
    "\u276a": "\u276b",
    "\u276c": "\u276d",
    "\u276e": "\u276f",
    "\u2770": "\u2771",
    "\u2772": "\u2773",
    "\u2774": "\u2775",
    "\u27c5": "\u27c6",
    "\u27e6": "\u27e7",
    "\u27e8": "\u27e9",
    "\u27ea": "\u27eb",
    "\u27ec": "\u27ed",
    "\u27ee": "\u27ef",
    "\u2983": "\u2984",
    "\u2985": "\u2986",
    "\u2987": "\u2988",
    "\u2989": "\u298a",
    "\u298b": "\u298c",
    "\u298d": "\u298e",
    "\u298f": "\u2990",
    "\u2991": "\u2992",
    "\u2993": "\u2994",
    "\u2995": "\u2996",
    "\u2997": "\u2998",
    "\u29d8": "\u29d9",
    "\u29da": "\u29db",
    "\u29fc": "\u29fd",
    "\u2e22": "\u2e23",
    "\u2e24": "\u2e25",
    "\u2e26": "\u2e27",
    "\u2e28": "\u2e29",
    "\u3008": "\u3009",
    "\u300a": "\u300b",
    "\u300c": "\u300d",
    "\u300e": "\u300f",
    "\u3010": "\u3011",
    "\u3014": "\u3015",
    "\u3016": "\u3017",
    "\u3018": "\u3019",
    "\u301a": "\u301b",
    "\u301d": "\u301e",
    "\ufd3e": "\ufd3f",
    "\ufe17": "\ufe18",
    "\ufe59": "\ufe5a",
    "\ufe5b": "\ufe5c",
    "\ufe5d": "\ufe5e",
    "\uff08": "\uff09",
    "\uff3b": "\uff3d",
    "\uff5b": "\uff5d",
    "\uff5f": "\uff60",
    "\uff62": "\uff63",
    "\u2308": "\u2309",
    "\u230a": "\u230b",
    "\u230c": "\u230d",
    "\u230e": "\u230f",
    "\u231c": "\u231d",
    "\u231e": "\u231f",
    "\u239b": "\u239e",
    "\u239c": "\u239f",
    "\u239d": "\u23a0",
    "\u23a1": "\u23a4",
    "\u23a2": "\u23a5",
    "\u23a3": "\u23a6",
    "\u23a7": "\u23ab",
    "\u23a8": "\u23ac",
    "\u23a9": "\u23ad",
    "\u23b0": "\u23b1",
    "\u23b8": "\u23b9"
  };
  this.topBottomPairs = {
    "\u23b4": "\u23b5",
    "\u23dc": "\u23dd",
    "\u23de": "\u23df",
    "\u23e0": "\u23e1",
    "\ufe35": "\ufe36",
    "\ufe37": "\ufe38",
    "\ufe39": "\ufe3a",
    "\ufe3b": "\ufe3c",
    "\ufe3d": "\ufe3e",
    "\ufe3f": "\ufe40",
    "\ufe41": "\ufe42",
    "\ufe43": "\ufe44",
    "\ufe47": "\ufe48"
  };
  this.leftFences = sre.SemanticUtil.objectsToKeys(this.openClosePairs);
  this.rightFences = sre.SemanticUtil.objectsToValues(this.openClosePairs);
  this.rightFences.push("\u301f");
  this.topFences = sre.SemanticUtil.objectsToKeys(this.topBottomPairs);
  this.bottomFences = sre.SemanticUtil.objectsToValues(this.topBottomPairs);
  this.neutralFences = "|\u00a6\u2016\u2758\u2980\u2af4\uffe4\uff5c".split("");
  this.fences = this.neutralFences.concat(
    this.leftFences,
    this.rightFences,
    this.topFences,
    this.bottomFences
  );
  this.capitalLatin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  this.smallLatin = "abcdefghijklmnopqrstuvwxyz\u0131\u0237".split("");
  this.capitalLatinFullWidth = "\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff2a\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a".split(
    ""
  );
  this.smallLatinFullWidth = "\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff4a\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a".split(
    ""
  );
  this.capitalLatinBold = "\ud835\udc00 \ud835\udc01 \ud835\udc02 \ud835\udc03 \ud835\udc04 \ud835\udc05 \ud835\udc06 \ud835\udc07 \ud835\udc08 \ud835\udc09 \ud835\udc0a \ud835\udc0b \ud835\udc0c \ud835\udc0d \ud835\udc0e \ud835\udc0f \ud835\udc10 \ud835\udc11 \ud835\udc12 \ud835\udc13 \ud835\udc14 \ud835\udc15 \ud835\udc16 \ud835\udc17 \ud835\udc18 \ud835\udc19".split(
    " "
  );
  this.smallLatinBold = "\ud835\udc1a \ud835\udc1b \ud835\udc1c \ud835\udc1d \ud835\udc1e \ud835\udc1f \ud835\udc20 \ud835\udc21 \ud835\udc22 \ud835\udc23 \ud835\udc24 \ud835\udc25 \ud835\udc26 \ud835\udc27 \ud835\udc28 \ud835\udc29 \ud835\udc2a \ud835\udc2b \ud835\udc2c \ud835\udc2d \ud835\udc2e \ud835\udc2f \ud835\udc30 \ud835\udc31 \ud835\udc32 \ud835\udc33".split(
    " "
  );
  this.capitalLatinItalic = "\ud835\udc34 \ud835\udc35 \ud835\udc36 \ud835\udc37 \ud835\udc38 \ud835\udc39 \ud835\udc3a \ud835\udc3b \ud835\udc3c \ud835\udc3d \ud835\udc3e \ud835\udc3f \ud835\udc40 \ud835\udc41 \ud835\udc42 \ud835\udc43 \ud835\udc44 \ud835\udc45 \ud835\udc46 \ud835\udc47 \ud835\udc48 \ud835\udc49 \ud835\udc4a \ud835\udc4b \ud835\udc4c \ud835\udc4d".split(
    " "
  );
  this.smallLatinItalic = "\ud835\udc4e \ud835\udc4f \ud835\udc50 \ud835\udc51 \ud835\udc52 \ud835\udc53 \ud835\udc54 \u210e \ud835\udc56 \ud835\udc57 \ud835\udc58 \ud835\udc59 \ud835\udc5a \ud835\udc5b \ud835\udc5c \ud835\udc5d \ud835\udc5e \ud835\udc5f \ud835\udc60 \ud835\udc61 \ud835\udc62 \ud835\udc63 \ud835\udc64 \ud835\udc65 \ud835\udc66 \ud835\udc67 \ud835\udea4 \ud835\udea5".split(
    " "
  );
  this.capitalLatinScript = "\ud835\udc9c \u212c \ud835\udc9e \ud835\udc9f \u2130 \u2131 \ud835\udca2 \u210b \u2110 \ud835\udca5 \ud835\udca6 \u2112 \u2133 \ud835\udca9 \ud835\udcaa \ud835\udcab \ud835\udcac \u211b \ud835\udcae \ud835\udcaf \ud835\udcb0 \ud835\udcb1 \ud835\udcb2 \ud835\udcb3 \ud835\udcb4 \ud835\udcb5 \u2118".split(
    " "
  );
  this.smallLatinScript = "\ud835\udcb6 \ud835\udcb7 \ud835\udcb8 \ud835\udcb9 \u212f \ud835\udcbb \u210a \ud835\udcbd \ud835\udcbe \ud835\udcbf \ud835\udcc0 \ud835\udcc1 \ud835\udcc2 \ud835\udcc3 \u2134 \ud835\udcc5 \ud835\udcc6 \ud835\udcc7 \ud835\udcc8 \ud835\udcc9 \ud835\udcca \ud835\udccb \ud835\udccc \ud835\udccd \ud835\udcce \ud835\udccf \u2113".split(
    " "
  );
  this.capitalLatinBoldScript = "\ud835\udcd0 \ud835\udcd1 \ud835\udcd2 \ud835\udcd3 \ud835\udcd4 \ud835\udcd5 \ud835\udcd6 \ud835\udcd7 \ud835\udcd8 \ud835\udcd9 \ud835\udcda \ud835\udcdb \ud835\udcdc \ud835\udcdd \ud835\udcde \ud835\udcdf \ud835\udce0 \ud835\udce1 \ud835\udce2 \ud835\udce3 \ud835\udce4 \ud835\udce5 \ud835\udce6 \ud835\udce7 \ud835\udce8 \ud835\udce9".split(
    " "
  );
  this.smallLatinBoldScript = "\ud835\udcea \ud835\udceb \ud835\udcec \ud835\udced \ud835\udcee \ud835\udcef \ud835\udcf0 \ud835\udcf1 \ud835\udcf2 \ud835\udcf3 \ud835\udcf4 \ud835\udcf5 \ud835\udcf6 \ud835\udcf7 \ud835\udcf8 \ud835\udcf9 \ud835\udcfa \ud835\udcfb \ud835\udcfc \ud835\udcfd \ud835\udcfe \ud835\udcff \ud835\udd00 \ud835\udd01 \ud835\udd02 \ud835\udd03".split(
    " "
  );
  this.capitalLatinFraktur = "\ud835\udd04 \ud835\udd05 \u212d \ud835\udd07 \ud835\udd08 \ud835\udd09 \ud835\udd0a \u210c \u2111 \ud835\udd0d \ud835\udd0e \ud835\udd0f \ud835\udd10 \ud835\udd11 \ud835\udd12 \ud835\udd13 \ud835\udd14 \u211c \ud835\udd16 \ud835\udd17 \ud835\udd18 \ud835\udd19 \ud835\udd1a \ud835\udd1b \ud835\udd1c \u2128".split(
    " "
  );
  this.smallLatinFraktur = "\ud835\udd1e \ud835\udd1f \ud835\udd20 \ud835\udd21 \ud835\udd22 \ud835\udd23 \ud835\udd24 \ud835\udd25 \ud835\udd26 \ud835\udd27 \ud835\udd28 \ud835\udd29 \ud835\udd2a \ud835\udd2b \ud835\udd2c \ud835\udd2d \ud835\udd2e \ud835\udd2f \ud835\udd30 \ud835\udd31 \ud835\udd32 \ud835\udd33 \ud835\udd34 \ud835\udd35 \ud835\udd36 \ud835\udd37".split(
    " "
  );
  this.capitalLatinDoubleStruck = "\ud835\udd38 \ud835\udd39 \u2102 \ud835\udd3b \ud835\udd3c \ud835\udd3d \ud835\udd3e \u210d \ud835\udd40 \ud835\udd41 \ud835\udd42 \ud835\udd43 \ud835\udd44 \u2115 \ud835\udd46 \u2119 \u211a \u211d \ud835\udd4a \ud835\udd4b \ud835\udd4c \ud835\udd4d \ud835\udd4e \ud835\udd4f \ud835\udd50 \u2124".split(
    " "
  );
  this.smallLatinDoubleStruck = "\ud835\udd52 \ud835\udd53 \ud835\udd54 \ud835\udd55 \ud835\udd56 \ud835\udd57 \ud835\udd58 \ud835\udd59 \ud835\udd5a \ud835\udd5b \ud835\udd5c \ud835\udd5d \ud835\udd5e \ud835\udd5f \ud835\udd60 \ud835\udd61 \ud835\udd62 \ud835\udd63 \ud835\udd64 \ud835\udd65 \ud835\udd66 \ud835\udd67 \ud835\udd68 \ud835\udd69 \ud835\udd6a \ud835\udd6b".split(
    " "
  );
  this.capitalLatinBoldFraktur = "\ud835\udd6c \ud835\udd6d \ud835\udd6e \ud835\udd6f \ud835\udd70 \ud835\udd71 \ud835\udd72 \ud835\udd73 \ud835\udd74 \ud835\udd75 \ud835\udd76 \ud835\udd77 \ud835\udd78 \ud835\udd79 \ud835\udd7a \ud835\udd7b \ud835\udd7c \ud835\udd7d \ud835\udd7e \ud835\udd7f \ud835\udd80 \ud835\udd81 \ud835\udd82 \ud835\udd83 \ud835\udd84 \ud835\udd85".split(
    " "
  );
  this.smallLatinBoldFraktur = "\ud835\udd86 \ud835\udd87 \ud835\udd88 \ud835\udd89 \ud835\udd8a \ud835\udd8b \ud835\udd8c \ud835\udd8d \ud835\udd8e \ud835\udd8f \ud835\udd90 \ud835\udd91 \ud835\udd92 \ud835\udd93 \ud835\udd94 \ud835\udd95 \ud835\udd96 \ud835\udd97 \ud835\udd98 \ud835\udd99 \ud835\udd9a \ud835\udd9b \ud835\udd9c \ud835\udd9d \ud835\udd9e \ud835\udd9f".split(
    " "
  );
  this.capitalLatinSansSerif = "\ud835\udda0 \ud835\udda1 \ud835\udda2 \ud835\udda3 \ud835\udda4 \ud835\udda5 \ud835\udda6 \ud835\udda7 \ud835\udda8 \ud835\udda9 \ud835\uddaa \ud835\uddab \ud835\uddac \ud835\uddad \ud835\uddae \ud835\uddaf \ud835\uddb0 \ud835\uddb1 \ud835\uddb2 \ud835\uddb3 \ud835\uddb4 \ud835\uddb5 \ud835\uddb6 \ud835\uddb7 \ud835\uddb8 \ud835\uddb9".split(
    " "
  );
  this.smallLatinSansSerif = "\ud835\uddba \ud835\uddbb \ud835\uddbc \ud835\uddbd \ud835\uddbe \ud835\uddbf \ud835\uddc0 \ud835\uddc1 \ud835\uddc2 \ud835\uddc3 \ud835\uddc4 \ud835\uddc5 \ud835\uddc6 \ud835\uddc7 \ud835\uddc8 \ud835\uddc9 \ud835\uddca \ud835\uddcb \ud835\uddcc \ud835\uddcd \ud835\uddce \ud835\uddcf \ud835\uddd0 \ud835\uddd1 \ud835\uddd2 \ud835\uddd3".split(
    " "
  );
  this.capitalLatinSansSerifBold = "\ud835\uddd4 \ud835\uddd5 \ud835\uddd6 \ud835\uddd7 \ud835\uddd8 \ud835\uddd9 \ud835\uddda \ud835\udddb \ud835\udddc \ud835\udddd \ud835\uddde \ud835\udddf \ud835\udde0 \ud835\udde1 \ud835\udde2 \ud835\udde3 \ud835\udde4 \ud835\udde5 \ud835\udde6 \ud835\udde7 \ud835\udde8 \ud835\udde9 \ud835\uddea \ud835\uddeb \ud835\uddec \ud835\udded".split(
    " "
  );
  this.smallLatinSansSerifBold = "\ud835\uddee \ud835\uddef \ud835\uddf0 \ud835\uddf1 \ud835\uddf2 \ud835\uddf3 \ud835\uddf4 \ud835\uddf5 \ud835\uddf6 \ud835\uddf7 \ud835\uddf8 \ud835\uddf9 \ud835\uddfa \ud835\uddfb \ud835\uddfc \ud835\uddfd \ud835\uddfe \ud835\uddff \ud835\ude00 \ud835\ude01 \ud835\ude02 \ud835\ude03 \ud835\ude04 \ud835\ude05 \ud835\ude06 \ud835\ude07".split(
    " "
  );
  this.capitalLatinSansSerifItalic = "\ud835\ude08 \ud835\ude09 \ud835\ude0a \ud835\ude0b \ud835\ude0c \ud835\ude0d \ud835\ude0e \ud835\ude0f \ud835\ude10 \ud835\ude11 \ud835\ude12 \ud835\ude13 \ud835\ude14 \ud835\ude15 \ud835\ude16 \ud835\ude17 \ud835\ude18 \ud835\ude19 \ud835\ude1a \ud835\ude1b \ud835\ude1c \ud835\ude1d \ud835\ude1e \ud835\ude1f \ud835\ude20 \ud835\ude21".split(
    " "
  );
  this.smallLatinSansSerifItalic = "\ud835\ude22 \ud835\ude23 \ud835\ude24 \ud835\ude25 \ud835\ude26 \ud835\ude27 \ud835\ude28 \ud835\ude29 \ud835\ude2a \ud835\ude2b \ud835\ude2c \ud835\ude2d \ud835\ude2e \ud835\ude2f \ud835\ude30 \ud835\ude31 \ud835\ude32 \ud835\ude33 \ud835\ude34 \ud835\ude35 \ud835\ude36 \ud835\ude37 \ud835\ude38 \ud835\ude39 \ud835\ude3a \ud835\ude3b".split(
    " "
  );
  this.capitalLatinMonospace = "\ud835\ude70 \ud835\ude71 \ud835\ude72 \ud835\ude73 \ud835\ude74 \ud835\ude75 \ud835\ude76 \ud835\ude77 \ud835\ude78 \ud835\ude79 \ud835\ude7a \ud835\ude7b \ud835\ude7c \ud835\ude7d \ud835\ude7e \ud835\ude7f \ud835\ude80 \ud835\ude81 \ud835\ude82 \ud835\ude83 \ud835\ude84 \ud835\ude85 \ud835\ude86 \ud835\ude87 \ud835\ude88 \ud835\ude89".split(
    " "
  );
  this.smallLatinMonospace = "\ud835\ude8a \ud835\ude8b \ud835\ude8c \ud835\ude8d \ud835\ude8e \ud835\ude8f \ud835\ude90 \ud835\ude91 \ud835\ude92 \ud835\ude93 \ud835\ude94 \ud835\ude95 \ud835\ude96 \ud835\ude97 \ud835\ude98 \ud835\ude99 \ud835\ude9a \ud835\ude9b \ud835\ude9c \ud835\ude9d \ud835\ude9e \ud835\ude9f \ud835\udea0 \ud835\udea1 \ud835\udea2 \ud835\udea3".split(
    " "
  );
  this.latinDoubleStruckItalic = [
    "\u2145",
    "\u2146",
    "\u2147",
    "\u2148",
    "\u2149"
  ];
  this.capitalGreek = "\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9".split(
    ""
  );
  this.smallGreek = "\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9".split(
    ""
  );
  this.capitalGreekBold = "\ud835\udea8 \ud835\udea9 \ud835\udeaa \ud835\udeab \ud835\udeac \ud835\udead \ud835\udeae \ud835\udeaf \ud835\udeb0 \ud835\udeb1 \ud835\udeb2 \ud835\udeb3 \ud835\udeb4 \ud835\udeb5 \ud835\udeb6 \ud835\udeb7 \ud835\udeb8 \ud835\udeba \ud835\udebb \ud835\udebc \ud835\udebd \ud835\udebe \ud835\udebf \ud835\udec0".split(
    " "
  );
  this.smallGreekBold = "\ud835\udec2 \ud835\udec3 \ud835\udec4 \ud835\udec5 \ud835\udec6 \ud835\udec7 \ud835\udec8 \ud835\udec9 \ud835\udeca \ud835\udecb \ud835\udecc \ud835\udecd \ud835\udece \ud835\udecf \ud835\uded0 \ud835\uded1 \ud835\uded2 \ud835\uded3 \ud835\uded4 \ud835\uded5 \ud835\uded6 \ud835\uded7 \ud835\uded8 \ud835\uded9 \ud835\udeda".split(
    " "
  );
  this.capitalGreekItalic = "\ud835\udee2 \ud835\udee3 \ud835\udee4 \ud835\udee5 \ud835\udee6 \ud835\udee7 \ud835\udee8 \ud835\udee9 \ud835\udeea \ud835\udeeb \ud835\udeec \ud835\udeed \ud835\udeee \ud835\udeef \ud835\udef0 \ud835\udef1 \ud835\udef2 \ud835\udef4 \ud835\udef5 \ud835\udef6 \ud835\udef7 \ud835\udef8 \ud835\udef9 \ud835\udefa".split(
    " "
  );
  this.smallGreekItalic = "\ud835\udefc \ud835\udefd \ud835\udefe \ud835\udeff \ud835\udf00 \ud835\udf01 \ud835\udf02 \ud835\udf03 \ud835\udf04 \ud835\udf05 \ud835\udf06 \ud835\udf07 \ud835\udf08 \ud835\udf09 \ud835\udf0a \ud835\udf0b \ud835\udf0c \ud835\udf0d \ud835\udf0e \ud835\udf0f \ud835\udf10 \ud835\udf11 \ud835\udf12 \ud835\udf13 \ud835\udf14".split(
    " "
  );
  this.capitalGreekSansSerifBold = "\ud835\udf56 \ud835\udf57 \ud835\udf58 \ud835\udf59 \ud835\udf5a \ud835\udf5b \ud835\udf5c \ud835\udf5d \ud835\udf5e \ud835\udf5f \ud835\udf60 \ud835\udf61 \ud835\udf62 \ud835\udf63 \ud835\udf64 \ud835\udf65 \ud835\udf66 \ud835\udf68 \ud835\udf69 \ud835\udf6a \ud835\udf6b \ud835\udf6c \ud835\udf6d \ud835\udf6e".split(
    " "
  );
  this.smallGreekSansSerifBold = "\ud835\udf70 \ud835\udf71 \ud835\udf72 \ud835\udf73 \ud835\udf74 \ud835\udf75 \ud835\udf76 \ud835\udf77 \ud835\udf78 \ud835\udf79 \ud835\udf7a \ud835\udf7b \ud835\udf7c \ud835\udf7d \ud835\udf7e \ud835\udf7f \ud835\udf80 \ud835\udf81 \ud835\udf82 \ud835\udf83 \ud835\udf84 \ud835\udf85 \ud835\udf86 \ud835\udf87 \ud835\udf88".split(
    " "
  );
  this.greekDoubleStruck = ["\u213c", "\u213d", "\u213e", "\u213f"];
  this.hebrewLetters = ["\u2135", "\u2136", "\u2137", "\u2138"];
  this.allLetters = this.capitalLatin.concat(
    this.smallLatin,
    this.capitalLatinFullWidth,
    this.smallLatinFullWidth,
    this.capitalLatinBold,
    this.smallLatinBold,
    this.capitalLatinItalic,
    this.smallLatinItalic,
    this.capitalLatinScript,
    this.smallLatinScript,
    this.capitalLatinBoldScript,
    this.smallLatinBoldScript,
    this.capitalLatinFraktur,
    this.smallLatinFraktur,
    this.capitalLatinDoubleStruck,
    this.smallLatinDoubleStruck,
    this.capitalLatinBoldFraktur,
    this.smallLatinBoldFraktur,
    this.capitalLatinSansSerif,
    this.smallLatinSansSerif,
    this.capitalLatinSansSerifBold,
    this.smallLatinSansSerifBold,
    this.capitalLatinSansSerifItalic,
    this.smallLatinSansSerifItalic,
    this.capitalLatinMonospace,
    this.smallLatinMonospace,
    this.latinDoubleStruckItalic,
    this.capitalGreek,
    this.smallGreek,
    this.capitalGreekBold,
    this.smallGreekBold,
    this.capitalGreekItalic,
    this.smallGreekItalic,
    this.capitalGreekSansSerifBold,
    this.smallGreekSansSerifBold,
    this.greekDoubleStruck,
    this.hebrewLetters
  );
  this.additions = "+\u00b1\u2213\u2214\u2227\u2228\u2229\u222a\u228c\u2293\u2294\u229d\u229e\u22a4\u22a5\u22ba\u22bb\u22bc\u22c4\u22ce\u22cf\u22d2\u22d3\u25b3\u25b7\u25bd\u25c1\u2a5e\u2295".split(
    ""
  );
  this.invisiblePlus_ = sre.SemanticUtil.numberToUnicode(8292);
  this.additions.push(this.invisiblePlus_);
  this.multiplications = "\u2020\u2021\u2210\u2217\u2218\u2219\u2240\u229a\u229b\u22a0\u22a1\u22c5\u22c6\u22c7\u22c9\u22ca\u22cb\u22cc\u25cb\u00b7*".split(
    ""
  );
  this.invisibleTimes_ = sre.SemanticUtil.numberToUnicode(8290);
  this.multiplications.push(this.invisibleTimes_);
  this.subtractions = "-\u2052\u207b\u208b\u2212\u2216\u2238\u2242\u2296\u229f\u2796\u2a29\u2a2a\u2a2b\u2a2c\u2a3a\u2a41\u2a6c\ufe63\uff0d\u2010\u2011".split(
    ""
  );
  this.divisions = "/\u00f7\u2044\u2215\u2298\u27cc\u29bc\u2a38".split("");
  this.functionApplication_ = sre.SemanticUtil.numberToUnicode(8289);
  this.equalities = "=~\u207c\u208c\u223c\u223d\u2243\u2245\u2248\u224a\u224b\u224c\u224d\u224e\u2251\u2252\u2253\u2254\u2255\u2256\u2257\u2258\u2259\u225a\u225b\u225c\u225d\u225e\u225f\u2261\u2263\u29e4\u2a66\u2a6e\u2a6f\u2a70\u2a71\u2a72\u2a73\u2a74\u2a75\u2a76\u2a77\u2a78\u22d5\u2a6d\u2a6a\u2a6b\u2a6c\ufe66\uff1d".split(
    ""
  );
  this.inequalities = "<>\u2241\u2242\u2244\u2246\u2247\u2249\u224f\u2250\u2260\u2262\u2264\u2265\u2266\u2267\u2268\u2269\u226a\u226b\u226c\u226d\u226e\u226f\u2270\u2271\u2272\u2273\u2274\u2275\u2276\u2277\u2278\u2279\u227a\u227b\u227c\u227d\u227e\u227f\u2280\u2281\u22d6\u22d7\u22d8\u22d9\u22da\u22db\u22dc\u22dd\u22de\u22df\u22e0\u22e1\u22e2\u22e3\u22e4\u22e5\u22e6\u22e7\u22e8\u22e9\u2a79\u2a7a\u2a7b\u2a7c\u2a7d\u2a7e\u2a7f\u2a80\u2a81\u2a82\u2a83\u2a84\u2a85\u2a86\u2a87\u2a88\u2a89\u2a8a\u2a8b\u2a8c\u2a8d\u2a8e\u2a8f\u2a90\u2a91\u2a92\u2a93\u2a94\u2a95\u2a96\u2a97\u2a98\u2a99\u2a9a\u2a9b\u2a9c\u2a9d\u2a9e\u2a9f\u2aa0\u2aa1\u2aa2\u2aa3\u2aa4\u2aa5\u2aa6\u2aa7\u2aa8\u2aa9\u2aaa\u2aab\u2aac\u2aad\u2aae\u2aaf\u2ab0\u2ab1\u2ab2\u2ab3\u2ab4\u2ab5\u2ab6\u2ab7\u2ab8\u2ab9\u2aba\u2abb\u2abc\u2af7\u2af8\u2af9\u2afa\u29c0\u29c1\ufe64\ufe65\uff1c\uff1e".split(
    ""
  );
  this.relations = [];
  this.arrows = "\u2190\u2191\u2192\u2193\u2194\u2195\u2196\u2197\u2198\u2199\u219a\u219b\u219c\u219d\u219e\u219f\u21a0\u21a1\u21a2\u21a3\u21a4\u21a5\u21a6\u21a7\u21a8\u21a9\u21aa\u21ab\u21ac\u21ad\u21ae\u21af\u21b0\u21b1\u21b2\u21b3\u21b4\u21b5\u21b6\u21b7\u21b8\u21b9\u21ba\u21bb\u21c4\u21c5\u21c6\u21c7\u21c8\u21c9\u21ca\u21cd\u21ce\u21cf\u21d0\u21d1\u21d2\u21d3\u21d4\u21d5\u21d6\u21d7\u21d8\u21d9\u21da\u21db\u21dc\u21dd\u21de\u21df\u21e0\u21e1\u21e2\u21e3\u21e4\u21e5\u21e6\u21e7\u21e8\u21e9\u21ea\u21eb\u21ec\u21ed\u21ee\u21ef\u21f0\u21f1\u21f2\u21f3\u21f4\u21f5\u21f6\u21f7\u21f8\u21f9\u21fa\u21fb\u21fc\u21fd\u21fe\u21ff\u2301\u2303\u2304\u2324\u238b\u2794\u2798\u2799\u279a\u279b\u279c\u279d\u279e\u279f\u27a0\u27a1\u27a2\u27a3\u27a4\u27a5\u27a6\u27a7\u27a8\u27a9\u27aa\u27ab\u27ac\u27ad\u27ae\u27af\u27b1\u27b2\u27b3\u27b4\u27b5\u27b6\u27b7\u27b8\u27b9\u27ba\u27bb\u27bc\u27bd\u27be\u27f0\u27f1\u27f2\u27f3\u27f4\u27f5\u27f6\u27f7\u27f8\u27f9\u27fa\u27fb\u27fc\u27fd\u27fe\u27ff\u2900\u2901\u2902\u2903\u2904\u2905\u2906\u2907\u2908\u2909\u290a\u290b\u290c\u290d\u290e\u290f\u2910\u2911\u2912\u2913\u2914\u2915\u2916\u2917\u2918\u2919\u291a\u291b\u291c\u291d\u291e\u291f\u2920\u2921\u2922\u2923\u2924\u2925\u2926\u2927\u2928\u2929\u292a\u292d\u292e\u292f\u2930\u2931\u2932\u2933\u2934\u2935\u2936\u2937\u2938\u2939\u293a\u293b\u293c\u293d\u293e\u293f\u2940\u2941\u2942\u2943\u2944\u2945\u2946\u2947\u2948\u2949\u2970\u2971\u2972\u2973\u2974\u2975\u2976\u2977\u2978\u2979\u297a\u297b\u29b3\u29b4\u29bd\u29ea\u29ec\u29ed\u2a17\u2b00\u2b01\u2b02\u2b03\u2b04\u2b05\u2b06\u2b07\u2b08\u2b09\u2b0a\u2b0b\u2b0c\u2b0d\u2b0e\u2b0f\u2b10\u2b11\u2b30\u2b31\u2b32\u2b33\u2b34\u2b35\u2b36\u2b37\u2b38\u2b39\u2b3a\u2b3b\u2b3c\u2b3d\u2b3e\u2b3f\u2b40\u2b41\u2b42\u2b43\u2b44\u2b45\u2b46\u2b47\u2b48\u2b49\u2b4a\u2b4b\u2b4c\uffe9\uffea\uffeb\uffec\u21bc\u21bd\u21be\u21bf\u21c0\u21c1\u21c2\u21c3\u21cb\u21cc\u294a\u294b\u294c\u294d\u294e\u294f\u2950\u2951\u2952\u2953\u2954\u2955\u2956\u2957\u2958\u2959\u295a\u295b\u295c\u295d\u295e\u295f\u2960\u2961\u2962\u2963\u2964\u2965\u2966\u2967\u2968\u2969\u296a\u296b\u296c\u296d\u296e\u296f\u297c\u297d\u297e\u297f".split(
    ""
  );
  this.sumOps = "\u2140\u220f\u2210\u2211\u22c0\u22c1\u22c2\u22c3\u2a00\u2a01\u2a02\u2a03\u2a04\u2a05\u2a06\u2a07\u2a08\u2a09\u2a0a\u2a0b\u2afc\u2aff".split(
    ""
  );
  this.intOps = "\u222b\u222c\u222d\u222e\u222f\u2230\u2231\u2232\u2233\u2a0c\u2a0d\u2a0e\u2a0f\u2a10\u2a11\u2a12\u2a13\u2a14\u2a15\u2a16\u2a17\u2a18\u2a19\u2a1a\u2a1b\u2a1c".split(
    ""
  );
  this.prefixOps = ["\u2200", "\u2203"];
  this.operatorBits = "\u2320\u2321\u23b6\u23aa\u23ae\u23af\u23b2\u23b3\u23b7".split(
    ""
  );
  this.digitsNormal = "0123456789".split("");
  this.digitsFullWidth = "\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19".split(
    ""
  );
  this.digitsBold = "\ud835\udfce \ud835\udfcf \ud835\udfd0 \ud835\udfd1 \ud835\udfd2 \ud835\udfd3 \ud835\udfd4 \ud835\udfd5 \ud835\udfd6 \ud835\udfd7".split(
    " "
  );
  this.digitsDoubleStruck = "\ud835\udfd8 \ud835\udfd9 \ud835\udfda \ud835\udfdb \ud835\udfdc \ud835\udfdd \ud835\udfde \ud835\udfdf \ud835\udfe0 \ud835\udfe1".split(
    " "
  );
  this.digitsSansSerif = "\ud835\udfe2 \ud835\udfe3 \ud835\udfe4 \ud835\udfe5 \ud835\udfe6 \ud835\udfe7 \ud835\udfe8 \ud835\udfe9 \ud835\udfea \ud835\udfeb".split(
    " "
  );
  this.digitsSansSerifBold = "\ud835\udfec \ud835\udfed \ud835\udfee \ud835\udfef \ud835\udff0 \ud835\udff1 \ud835\udff2 \ud835\udff3 \ud835\udff4 \ud835\udff5".split(
    " "
  );
  this.digitsMonospace = "\ud835\udff6 \ud835\udff7 \ud835\udff8 \ud835\udff9 \ud835\udffa \ud835\udffb \ud835\udffc \ud835\udffd \ud835\udffe \ud835\udfff".split(
    " "
  );
  this.digitsSuperscript = "\u00b2\u00b3\u00b9\u2070\u2074\u2075\u2076\u2077\u2078\u2079".split(
    ""
  );
  this.digitsSubscript = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089".split(
    ""
  );
  this.fractions = "\u00bc\u00bd\u00be\u2150\u2151\u2152\u2153\u2154\u2155\u2156\u2157\u2158\u2159\u215a\u215b\u215c\u215d\u215e\u215f\u2189".split(
    ""
  );
  this.enclosedNumbers = "\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246a\u246b\u246c\u246d\u246e\u246f\u2470\u2471\u2472\u2473\u24ea\u24eb\u24ec\u24ed\u24ee\u24ef\u24f0\u24f1\u24f2\u24f3\u24f4\u24f5\u24f6\u24f7\u24f8\u24f9\u24fa\u24fb\u24fc\u24fd\u24fe\u24ff\u2776\u2777\u2778\u2779\u277a\u277b\u277c\u277d\u277e\u277f\u2780\u2781\u2782\u2783\u2784\u2785\u2786\u2787\u2788\u2789\u278a\u278b\u278c\u278d\u278e\u278f\u2790\u2791\u2792\u2793\u3248\u3249\u324a\u324b\u324c\u324d\u324e\u324f\u3251\u3252\u3253\u3254\u3255\u3256\u3257\u3258\u3259\u325a\u325b\u325c\u325d\u325e\u325f\u32b1\u32b2\u32b3\u32b4\u32b5\u32b6\u32b7\u32b8\u32b9\u32ba\u32bb\u32bc\u32bd\u32be\u32bf".split(
    ""
  );
  this.fencedNumbers = "\u2474\u2475\u2476\u2477\u2478\u2479\u247a\u247b\u247c\u247d\u247e\u247f\u2480\u2481\u2482\u2483\u2484\u2485\u2486\u2487".split(
    ""
  );
  this.punctuatedNumbers = "\u2488 \u2489 \u248a \u248b \u248c \u248d \u248e \u248f \u2490 \u2491 \u2492 \u2493 \u2494 \u2495 \u2496 \u2497 \u2498 \u2499 \u249a \u249b \ud83c\udd00 \ud83c\udd01 \ud83c\udd02 \ud83c\udd03 \ud83c\udd04 \ud83c\udd05 \ud83c\udd06 \ud83c\udd07 \ud83c\udd08 \ud83c\udd09 \ud83c\udd0a".split(
    " "
  );
  this.digits = this.digitsNormal.concat(
    this.digitsFullWidth,
    this.digitsBold,
    this.digitsDoubleStruck,
    this.digitsSansSerif,
    this.digitsSansSerifBold,
    this.digitsMonospace
  );
  this.numbers = this.fractions.concat(
    this.digitsSuperscript,
    this.digitsSubscript,
    this.enclosedNumbers,
    this.fencedNumbers,
    this.punctuatedNumbers
  );
  this.allNumbers = this.digits.concat(this.numbers);
  this.trigonometricFunctions = "cos cot csc sec sin tan arccos arccot arccsc arcsec arcsin arctan".split(
    " "
  );
  this.hyperbolicFunctions = "cosh coth csch sech sinh tanh arcosh arcoth arcsch arsech arsinh artanh arccosh arccoth arccsch arcsech arcsinh arctanh".split(
    " "
  );
  this.algebraicFunctions = "deg det dim hom ker Tr tr".split(" ");
  this.elementaryFunctions = "log ln lg exp expt gcd gcd arg im re Pr".split(
    " "
  );
  this.prefixFunctions = this.trigonometricFunctions.concat(
    this.hyperbolicFunctions,
    this.algebraicFunctions,
    this.elementaryFunctions
  );
  this.limitFunctions = "inf lim liminf limsup max min sup injlim projlim".split(
    " "
  );
  this.infixFunctions = ["mod", "rem"];
  this.symbolSetToSemantic_ = [
    {
      set: this.generalPunctuations,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.UNKNOWN
    },
    {
      set: this.commas,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.COMMA
    },
    {
      set: this.ellipses,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.ELLIPSIS
    },
    {
      set: this.fullStops,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.FULLSTOP
    },
    {
      set: this.dashes,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.DASH
    },
    {
      set: this.primes,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.PRIME
    },
    {
      set: this.leftFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.OPEN
    },
    {
      set: this.rightFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.CLOSE
    },
    {
      set: this.topFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.TOP
    },
    {
      set: this.bottomFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.BOTTOM
    },
    {
      set: this.neutralFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.NEUTRAL
    },
    {
      set: this.smallLatin,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.capitalLatin,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.smallLatinFullWidth,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.capitalLatinFullWidth,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.smallLatinBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.capitalLatinBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.smallLatinItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.capitalLatinItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.smallLatinScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SCRIPT
    },
    {
      set: this.capitalLatinScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SCRIPT
    },
    {
      set: this.smallLatinBoldScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDSCRIPT
    },
    {
      set: this.capitalLatinBoldScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDSCRIPT
    },
    {
      set: this.smallLatinFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.FRAKTUR
    },
    {
      set: this.capitalLatinFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.FRAKTUR
    },
    {
      set: this.smallLatinDoubleStruck,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.capitalLatinDoubleStruck,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.smallLatinBoldFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDFRAKTUR
    },
    {
      set: this.capitalLatinBoldFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDFRAKTUR
    },
    {
      set: this.smallLatinSansSerif,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIF
    },
    {
      set: this.capitalLatinSansSerif,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIF
    },
    {
      set: this.smallLatinSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.capitalLatinSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.smallLatinSansSerifItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFITALIC
    },
    {
      set: this.capitalLatinSansSerifItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFITALIC
    },
    {
      set: this.smallLatinMonospace,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.MONOSPACE
    },
    {
      set: this.capitalLatinMonospace,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.MONOSPACE
    },
    {
      set: this.latinDoubleStruckItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCKITALIC
    },
    {
      set: this.smallGreek,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.capitalGreek,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.smallGreekBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.capitalGreekBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.smallGreekItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.capitalGreekItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.smallGreekSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.capitalGreekSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.greekDoubleStruck,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.hebrewLetters,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.OTHERLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.digitsNormal,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.digitsFullWidth,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.digitsBold,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.digitsDoubleStruck,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.digitsSansSerif,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.SANSSERIF
    },
    {
      set: this.digitsSansSerifBold,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.digitsMonospace,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.MONOSPACE
    },
    {
      set: this.numbers,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.FLOAT
    },
    {
      set: this.additions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.ADDITION
    },
    {
      set: this.multiplications,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.MULTIPLICATION
    },
    {
      set: this.subtractions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.SUBTRACTION
    },
    {
      set: this.divisions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.DIVISION
    },
    {
      set: this.prefixOps,
      type: sre.SemanticAttr.Type.PREFIXOP,
      role: sre.SemanticAttr.Role.PREFIXFUNC
    },
    {
      set: this.equalities,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.EQUALITY
    },
    {
      set: this.inequalities,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.INEQUALITY
    },
    {
      set: this.relations,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.UNKNOWN
    },
    {
      set: this.arrows,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.ARROW
    },
    {
      set: this.sumOps,
      type: sre.SemanticAttr.Type.LARGEOP,
      role: sre.SemanticAttr.Role.SUM
    },
    {
      set: this.intOps,
      type: sre.SemanticAttr.Type.LARGEOP,
      role: sre.SemanticAttr.Role.INTEGRAL
    },
    {
      set: this.limitFunctions,
      type: sre.SemanticAttr.Type.FUNCTION,
      role: sre.SemanticAttr.Role.LIMFUNC
    },
    {
      set: this.prefixFunctions,
      type: sre.SemanticAttr.Type.FUNCTION,
      role: sre.SemanticAttr.Role.PREFIXFUNC
    },
    {
      set: this.infixFunctions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.MULTIPLICATION
    }
  ];
  this.meaning_ = this.initMeaning_();
};
goog.addSingletonGetter(sre.SemanticAttr);
sre.SemanticAttr.Type = {
  PUNCTUATION: "punctuation",
  FENCE: "fence",
  NUMBER: "number",
  IDENTIFIER: "identifier",
  TEXT: "text",
  OPERATOR: "operator",
  RELATION: "relation",
  LARGEOP: "largeop",
  FUNCTION: "function",
  ACCENT: "accent",
  FENCED: "fenced",
  FRACTION: "fraction",
  PUNCTUATED: "punctuated",
  RELSEQ: "relseq",
  MULTIREL: "multirel",
  INFIXOP: "infixop",
  PREFIXOP: "prefixop",
  POSTFIXOP: "postfixop",
  APPL: "appl",
  INTEGRAL: "integral",
  BIGOP: "bigop",
  SQRT: "sqrt",
  ROOT: "root",
  LIMUPPER: "limupper",
  LIMLOWER: "limlower",
  LIMBOTH: "limboth",
  SUBSCRIPT: "subscript",
  SUPERSCRIPT: "superscript",
  UNDERSCORE: "underscore",
  OVERSCORE: "overscore",
  TENSOR: "tensor",
  TABLE: "table",
  MULTILINE: "multiline",
  MATRIX: "matrix",
  VECTOR: "vector",
  CASES: "cases",
  ROW: "row",
  LINE: "line",
  CELL: "cell",
  ENCLOSE: "enclose",
  UNKNOWN: "unknown",
  EMPTY: "empty"
};
sre.SemanticAttr.Role = {
  COMMA: "comma",
  ELLIPSIS: "ellipsis",
  FULLSTOP: "fullstop",
  DASH: "dash",
  PRIME: "prime",
  VBAR: "vbar",
  OPENFENCE: "openfence",
  CLOSEFENCE: "closefence",
  APPLICATION: "application",
  DUMMY: "dummy",
  UNIT: "unit",
  LABEL: "label",
  OPEN: "open",
  CLOSE: "close",
  TOP: "top",
  BOTTOM: "bottom",
  NEUTRAL: "neutral",
  LATINLETTER: "latinletter",
  GREEKLETTER: "greekletter",
  OTHERLETTER: "otherletter",
  INTEGER: "integer",
  FLOAT: "float",
  OTHERNUMBER: "othernumber",
  MIXED: "mixed",
  MULTIACCENT: "multiaccent",
  OVERACCENT: "overaccent",
  UNDERACCENT: "underaccent",
  UNDEROVER: "underover",
  SUBSUP: "subsup",
  LEFTSUB: "leftsub",
  LEFTSUPER: "leftsuper",
  RIGHTSUB: "rightsub",
  RIGHTSUPER: "rightsuper",
  LEFTRIGHT: "leftright",
  ABOVEBELOW: "abovebelow",
  STRING: "string",
  SEQUENCE: "sequence",
  ENDPUNCT: "endpunct",
  STARTPUNCT: "startpunct",
  TEXT: "text",
  NEGATIVE: "negative",
  NEGATION: "negation",
  MULTIOP: "multiop",
  LIMFUNC: "limit function",
  INFIXFUNC: "infix function",
  PREFIXFUNC: "prefix function",
  POSTFIXFUNC: "postfix function",
  SIMPLEFUNC: "simple function",
  SUM: "sum",
  INTEGRAL: "integral",
  ADDITION: "addition",
  MULTIPLICATION: "multiplication",
  SUBTRACTION: "subtraction",
  IMPLICIT: "implicit",
  DIVISION: "division",
  VULGAR: "vulgar",
  EQUALITY: "equality",
  INEQUALITY: "inequality",
  ELEMENT: "element",
  BINREL: "binrel",
  ARROW: "arrow",
  DETERMINANT: "determinant",
  ROWVECTOR: "rowvector",
  BINOMIAL: "binomial",
  SQUAREMATRIX: "squarematrix",
  MULTILINE: "multiline",
  MATRIX: "matrix",
  VECTOR: "vector",
  CASES: "cases",
  TABLE: "table",
  UNKNOWN: "unknown",
  PROTECTED: "protected"
};
sre.SemanticAttr.Font = {
  BOLD: "bold",
  BOLDFRAKTUR: "bold-fraktur",
  BOLDITALIC: "bold-italic",
  BOLDSCRIPT: "bold-script",
  CALIGRAPHIC: "caligraphic",
  CALIGRAPHICBOLD: "caligraphic-bold",
  DOUBLESTRUCK: "double-struck",
  DOUBLESTRUCKITALIC: "double-struck-italic",
  FRAKTUR: "fraktur",
  ITALIC: "italic",
  MONOSPACE: "monospace",
  NORMAL: "normal",
  OLDSTYLE: "oldstyle",
  OLDSTYLEBOLD: "oldstyle-bold",
  SCRIPT: "script",
  SANSSERIF: "sans-serif",
  SANSSERIFITALIC: "sans-serif-italic",
  SANSSERIFBOLD: "sans-serif-bold",
  SANSSERIFBOLDITALIC: "sans-serif-bold-italic",
  UNKNOWN: "unknown"
};
sre.SemanticAttr.prototype.lookupType = function(a) {
  return sre.SemanticAttr.Type.UNKNOWN;
};
sre.SemanticAttr.prototype.lookupRole = function(a) {
  return sre.SemanticAttr.Role.UNKNOWN;
};
sre.SemanticAttr.lookupMeaning = function(a) {
  return sre.SemanticAttr.getInstance().lookupMeaning_(a);
};
sre.SemanticAttr.invisibleTimes = function() {
  return sre.SemanticAttr.getInstance().invisibleTimes_;
};
sre.SemanticAttr.invisibleComma = function() {
  return sre.SemanticAttr.getInstance().invisibleComma_;
};
sre.SemanticAttr.functionApplication = function() {
  return sre.SemanticAttr.getInstance().functionApplication_;
};
sre.SemanticAttr.isMatchingFenceRole = function(a, b) {
  return (
    (a == sre.SemanticAttr.Role.OPEN && b == sre.SemanticAttr.Role.CLOSE) ||
    (a == sre.SemanticAttr.Role.NEUTRAL &&
      b == sre.SemanticAttr.Role.NEUTRAL) ||
    (a == sre.SemanticAttr.Role.TOP && b == sre.SemanticAttr.Role.BOTTOM)
  );
};
sre.SemanticAttr.isMatchingFence = function(a, b) {
  return sre.SemanticAttr.getInstance().isMatchingFence_(a, b);
};
sre.SemanticAttr.isOpeningFence = function(a) {
  return a == sre.SemanticAttr.Role.OPEN || a == sre.SemanticAttr.Role.NEUTRAL;
};
sre.SemanticAttr.isClosingFence = function(a) {
  return a == sre.SemanticAttr.Role.CLOSE || a == sre.SemanticAttr.Role.NEUTRAL;
};
sre.SemanticAttr.isEmbellishedType = function(a) {
  return (
    a === sre.SemanticAttr.Type.OPERATOR ||
    a === sre.SemanticAttr.Type.RELATION ||
    a === sre.SemanticAttr.Type.FENCE ||
    a === sre.SemanticAttr.Type.PUNCTUATION
  );
};
sre.SemanticAttr.isCharacterD = function(a) {
  return (
    -1 !=
    "d \u2146 \uff44 \ud835\udc1d \ud835\udc51 \ud835\udcb9 \ud835\udced \ud835\udd21 \ud835\udd55 \ud835\udd89 \ud835\uddbd \ud835\uddf1 \ud835\ude25 \ud835\ude8d"
      .split(" ")
      .indexOf(a)
  );
};
sre.SemanticAttr.prototype.isMatchingFence_ = function(a, b) {
  return -1 != this.neutralFences.indexOf(a)
    ? a == b
    : this.openClosePairs[a] == b || this.topBottomPairs[a] == b;
};
sre.SemanticAttr.prototype.initMeaning_ = function() {
  for (var a = {}, b = 0, c; (c = this.symbolSetToSemantic_[b]); b++)
    c.set.forEach(function(b) {
      a[b] = {
        role: c.role || sre.SemanticAttr.Role.UNKNOWN,
        type: c.type || sre.SemanticAttr.Type.UNKNOWN,
        font: c.font || sre.SemanticAttr.Font.UNKNOWN
      };
    });
  return a;
};
sre.SemanticAttr.prototype.lookupMeaning_ = function(a) {
  return (
    this.meaning_[a] || {
      role: sre.SemanticAttr.Role.UNKNOWN,
      type: sre.SemanticAttr.Type.UNKNOWN,
      font: sre.SemanticAttr.Font.UNKNOWN
    }
  );
};
sre.MathUtil = {};
sre.MathUtil.isMathmlNodeOfClass_ = function(a, b) {
  return -1 != b.indexOf(a.tagName.toUpperCase());
};
sre.MathUtil.isMathjaxNodeOfClass_ = function(a, b) {
  return "SPAN" == a.tagName
    ? a.className.split(" ").some(function(a) {
        return -1 != b.indexOf(a.toUpperCase());
      })
    : !1;
};
sre.MathUtil.isMathNodeOfClass_ = function(a, b) {
  return (
    a.nodeType == sre.DomUtil.NodeType.ELEMENT_NODE &&
    (sre.MathUtil.isMathmlNodeOfClass_(a, b) ||
      sre.MathUtil.isMathjaxNodeOfClass_(a, b))
  );
};
sre.MathUtil.TOKEN_LIST = "MI MN MO MTEXT MSPACE MS".split(" ");
sre.MathUtil.isToken = function(a) {
  return sre.MathUtil.isMathNodeOfClass_(a, sre.MathUtil.TOKEN_LIST);
};
sre.MathUtil.LAYOUT_LIST = "MROW MFRAC MSQRT MROOT MSTYLE MERROR MPADDED MPHANTOM MFENCED MENCLOSE".split(
  " "
);
sre.MathUtil.isLayout = function(a) {
  return sre.MathUtil.isMathNodeOfClass_(a, sre.MathUtil.LAYOUT_LIST);
};
sre.MathUtil.SCRIPT_LIST = "MSUB MSUP MSUBSUP MUNDER MOVER MUNDEROVER MMULTISCRIPTS MPRESCRIPTS".split(
  " "
);
sre.MathUtil.isScript = function(a) {
  return sre.MathUtil.isMathNodeOfClass_(a, sre.MathUtil.SCRIPT_LIST);
};
sre.MathUtil.TABLES_LIST = "MTABLE MLABELEDTR MTR MTD MALIGNGROUP MALIGNMARK".split(
  " "
);
sre.MathUtil.isTables = function(a) {
  return sre.MathUtil.isMathNodeOfClass_(a, sre.MathUtil.TABLES_LIST);
};
sre.MathUtil.ELEMENTARY_LIST = "MSTACK MLONGDIV MSGROUP MSROW MSCARRIES MSCARRY MSLINE".split(
  " "
);
sre.MathUtil.isElementary = function(a) {
  return sre.MathUtil.isMathNodeOfClass_(a, sre.MathUtil.ELEMENTARY_LIST);
};
sre.MathUtil.MATHML_TAG_LIST = [
  sre.MathUtil.TOKEN_LIST,
  sre.MathUtil.LAYOUT_LIST,
  sre.MathUtil.SCRIPT_LIST,
  sre.MathUtil.TABLES_LIST,
  sre.MathUtil.ELEMENTARY_LIST
].reduce(function(a, b) {
  return a.concat(b);
});
sre.MathUtil.isMathmlTag = function(a) {
  return sre.MathUtil.isMathNodeOfClass_(a, sre.MathUtil.MATHML_TAG_LIST);
};
sre.MathUtil.WHITESPACE_LIST = [
  "MSROW",
  "MROW",
  "MSPACE",
  "MPHANTOM",
  "MPADDED"
];
sre.MathUtil.isWhitespace = function(a) {
  return sre.MathUtil.isMathNodeOfClass_(a, sre.MathUtil.WHITESPACE_LIST);
};
sre.MathUtil.isNotWhitespace = function(a) {
  return sre.MathUtil.isMathmlTag(a) && !sre.MathUtil.isWhitespace(a);
};
sre.MathUtil.nextSeparatorFunction = function(a) {
  if (a) {
    if (a.match(/^\s+$/)) return null;
    var b = a
      .replace(/\s/g, "")
      .split("")
      .filter(function(a) {
        return a;
      });
  } else b = [","];
  return function() {
    return 1 < b.length ? b.shift() : b[0];
  };
};
sre.SemanticNode = function(a) {
  this.id = a;
  this.mathml = [];
  this.parent = null;
  this.type = sre.SemanticAttr.Type.UNKNOWN;
  this.role = sre.SemanticAttr.Role.UNKNOWN;
  this.font = sre.SemanticAttr.Font.UNKNOWN;
  this.embellished = null;
  this.fencePointer = "";
  this.childNodes = [];
  this.textContent = "";
  this.mathmlTree = null;
  this.contentNodes = [];
};
sre.SemanticNode.prototype.querySelectorAll = function(a) {
  for (var b = [], c = 0, d; (d = this.childNodes[c]); c++)
    b = b.concat(d.querySelectorAll(a));
  a(this) && b.unshift(this);
  return b;
};
sre.SemanticNode.prototype.xml = function(a, b) {
  var c = function(c, d) {
      for (
        var e = d.map(function(c) {
            return c.xml(a, b);
          }),
          f = a.createElement(c),
          k = 0,
          l;
        (l = e[k]);
        k++
      )
        f.appendChild(l);
      return f;
    },
    d = a.createElement(this.type);
  b || this.xmlAttributes_(d);
  d.textContent = this.textContent;
  0 < this.contentNodes.length &&
    d.appendChild(c("content", this.contentNodes));
  0 < this.childNodes.length && d.appendChild(c("children", this.childNodes));
  return d;
};
sre.SemanticNode.prototype.toString = function(a) {
  var b = new sre.SystemExternal.xmldom.XMLSerializer(),
    c = new sre.SystemExternal.xmldom.DOMParser().parseFromString(
      "",
      "text/xml"
    );
  return b.serializeToString(this.xml(c, a));
};
sre.SemanticNode.prototype.xmlAttributes_ = function(a) {
  a.setAttribute("role", this.role);
  this.font != sre.SemanticAttr.Font.UNKNOWN &&
    a.setAttribute("font", this.font);
  this.embellished && a.setAttribute("embellished", this.embellished);
  this.fencePointer && a.setAttribute("fencepointer", this.fencePointer);
  a.setAttribute("id", this.id);
};
sre.SemanticNode.prototype.updateContent = function(a) {
  var b = a.trim();
  a = a && !b ? a : b;
  this.textContent != a &&
    ((b = sre.SemanticAttr.lookupMeaning(a)),
    (this.textContent = a),
    (this.role = b.role),
    (this.type = b.type),
    (this.font = b.font));
};
sre.SemanticNode.prototype.addMathmlNodes = function(a) {
  for (var b = 0, c; (c = a[b]); b++)
    -1 == this.mathml.indexOf(c) && this.mathml.push(c);
};
sre.SemanticNode.prototype.removeMathmlNodes_ = function(a) {
  for (var b = this.mathml, c = 0, d; (d = a[c]); c++)
    (d = b.indexOf(d)), -1 != d && b.splice(d, 1);
  this.mathml = b;
};
sre.SemanticNode.prototype.appendChild = function(a) {
  this.childNodes.push(a);
  this.addMathmlNodes(a.mathml);
  a.parent = this;
};
sre.SemanticNode.prototype.replaceChild = function(a, b) {
  var c = this.childNodes.indexOf(a);
  if (-1 != c) {
    a.parent = null;
    b.parent = this;
    this.childNodes[c] = b;
    var c = a.mathml.filter(function(a) {
        return -1 == b.mathml.indexOf(a);
      }),
      d = b.mathml.filter(function(b) {
        return -1 == a.mathml.indexOf(b);
      });
    this.removeMathmlNodes_(c);
    this.addMathmlNodes(d);
  }
};
sre.SemanticNode.prototype.appendContentNode = function(a) {
  a &&
    (this.contentNodes.push(a),
    this.addMathmlNodes(a.mathml),
    (a.parent = this));
};
sre.SemanticNode.prototype.removeContentNode = function(a) {
  a &&
    ((a = this.contentNodes.indexOf(a)),
    -1 != a && this.contentNodes.slice(a, 1));
};
sre.SemanticNode.prototype.equals = function(a) {
  if (
    !a ||
    this.type !== a.type ||
    this.role !== a.role ||
    this.textContent !== a.textContent ||
    this.childNodes.length !== a.childNodes.length ||
    this.contentNodes.length !== a.contentNodes.length
  )
    return !1;
  for (var b = 0, c, d; (c = this.childNodes[b]), (d = a.childNodes[b]); b++)
    if (!c.equals(d)) return !1;
  for (b = 0; (c = this.contentNodes[b]), (d = a.contentNodes[b]); b++)
    if (!c.equals(d)) return !1;
  return !0;
};
sre.SemanticNode.prototype.displayTree = function(a) {
  a++;
  var b = Array(a).join("  ");
  console.log(b + this.toString());
  console.log(b + "MathmlTree:");
  console.log(b + this.mathmlTreeString_());
  console.log(b + "MathML:");
  for (var c = 0, d; (d = this.mathml[c]); c++) console.log(b + d.toString());
  console.log(b + "Begin Content");
  this.contentNodes.forEach(function(b) {
    b.displayTree(a);
  });
  console.log(b + "End Content");
  console.log(b + "Begin Children");
  this.childNodes.forEach(function(b) {
    b.displayTree(a);
  });
  console.log(b + "End Children");
};
sre.SemanticNode.prototype.mathmlTreeString_ = function() {
  return this.mathmlTree ? this.mathmlTree.toString() : "EMPTY";
};
sre.SemanticNodeFactory = function() {
  this.idCounter_ = 0;
};
sre.SemanticNodeFactory.prototype.createNode_ = function() {
  return new sre.SemanticNode(this.idCounter_++);
};
sre.SemanticNodeFactory.prototype.makeUnprocessed = function(a) {
  var b = this.createNode_();
  b.mathml = [a];
  return b;
};
sre.SemanticNodeFactory.prototype.makeEmptyNode = function() {
  var a = this.createNode_();
  a.type = sre.SemanticAttr.Type.EMPTY;
  return a;
};
sre.SemanticNodeFactory.prototype.makeContentNode = function(a) {
  var b = this.createNode_();
  b.updateContent(a);
  return b;
};
sre.SemanticNodeFactory.prototype.makeMultipleContentNodes = function(a, b) {
  for (var c = [], d = 0; d < a; d++) c.push(this.makeContentNode(b));
  return c;
};
sre.SemanticNodeFactory.prototype.makeLeafNode = function(a, b) {
  if (!a) return this.makeEmptyNode();
  var c = this.makeContentNode(a);
  c.font = b || c.font;
  return c;
};
sre.SemanticNodeFactory.prototype.makeBranchNode = function(a, b, c, d) {
  var e = this.createNode_();
  d && e.updateContent(d);
  e.type = a;
  e.childNodes = b;
  e.contentNodes = c;
  b.concat(c).forEach(function(a) {
    a.parent = e;
    e.addMathmlNodes(a.mathml);
  });
  return e;
};
sre.SemanticParser = function() {};
sre.SemanticParser.prototype.parse = function(a) {};
sre.SemanticParser.prototype.getFactory = function() {};
sre.SemanticParser.prototype.setFactory = function(a) {};
sre.SemanticParser.prototype.getType = function() {};
sre.SemanticAbstractParser = function(a) {
  this.type_ = a;
  this.factory_ = new sre.SemanticNodeFactory();
};
sre.SemanticAbstractParser.prototype.getFactory = function() {
  return this.factory_;
};
sre.SemanticAbstractParser.prototype.setFactory = function(a) {
  this.factory_ = a;
};
sre.SemanticAbstractParser.prototype.getType = function() {
  return this.type_;
};
sre.SemanticAbstractParser.prototype.parse = goog.abstractMethod;
sre.SemanticPred = {};
sre.SemanticPred.isAttribute = function(a, b) {
  return function(c) {
    c = c[a];
    var d;
    a: switch (a) {
      case "role":
        d = sre.SemanticAttr.Role[b];
        break a;
      case "font":
        d = sre.SemanticAttr.Font[b];
        break a;
      default:
        d = sre.SemanticAttr.Type[b];
    }
    return c === d;
  };
};
sre.SemanticPred.isAccent = function(a) {
  return (
    sre.SemanticPred.isAttribute("type", "FENCE")(a) ||
    sre.SemanticPred.isAttribute("type", "PUNCTUATION")(a) ||
    sre.SemanticPred.isAttribute("type", "OPERATOR")(a) ||
    sre.SemanticPred.isAttribute("type", "RELATION")(a) ||
    (sre.SemanticPred.isAttribute("type", "IDENTIFIER")(a) &&
      sre.SemanticPred.isAttribute("role", "UNKNOWN")(a) &&
      !a.textContent.match(
        new RegExp(sre.SemanticAttr.getInstance().allLetters.join("|"))
      ))
  );
};
sre.SemanticPred.isSimpleFunction = function(a) {
  a = a.childNodes;
  if (0 === a.length) return !0;
  if (1 < a.length) return !1;
  a = a[0];
  return a.type !== sre.SemanticAttr.Type.INFIXOP ||
    (a.role === sre.SemanticAttr.Role.IMPLICIT &&
      !a.childNodes.some(sre.SemanticPred.isAttribute("type", "INFIXOP")))
    ? !0
    : !1;
};
sre.SemanticPred.isPrefixFunctionBoundary = function(a) {
  return (
    sre.SemanticPred.isOperator(a) ||
    sre.SemanticPred.isGeneralFunctionBoundary(a)
  );
};
sre.SemanticPred.isIntegralDxBoundary = function(a, b) {
  return (
    !!b &&
    sre.SemanticPred.isAttribute("type", "IDENTIFIER")(b) &&
    sre.SemanticAttr.isCharacterD(a.textContent)
  );
};
sre.SemanticPred.isIntegralDxBoundarySingle = function(a) {
  if (sre.SemanticPred.isAttribute("type", "IDENTIFIER")(a)) {
    var b = a.textContent[0];
    return b && a.textContent[1] && sre.SemanticAttr.isCharacterD(b);
  }
  return !1;
};
sre.SemanticPred.isGeneralFunctionBoundary = function(a) {
  return sre.SemanticPred.isRelation(a) || sre.SemanticPred.isPunctuation(a);
};
sre.SemanticPred.isEmbellished = function(a) {
  return a.embellished
    ? a.embellished
    : sre.SemanticAttr.isEmbellishedType(a.type)
    ? a.type
    : null;
};
sre.SemanticPred.isOperator = function(a) {
  return (
    sre.SemanticPred.isAttribute("type", "OPERATOR")(a) ||
    sre.SemanticPred.isAttribute("embellished", "OPERATOR")(a)
  );
};
sre.SemanticPred.isRelation = function(a) {
  return (
    sre.SemanticPred.isAttribute("type", "RELATION")(a) ||
    sre.SemanticPred.isAttribute("embellished", "RELATION")(a)
  );
};
sre.SemanticPred.isPunctuation = function(a) {
  return (
    sre.SemanticPred.isAttribute("type", "PUNCTUATION")(a) ||
    sre.SemanticPred.isAttribute("embellished", "PUNCTUATION")(a)
  );
};
sre.SemanticPred.isFence = function(a) {
  return (
    sre.SemanticPred.isAttribute("type", "FENCE")(a) ||
    sre.SemanticPred.isAttribute("embellished", "FENCE")(a)
  );
};
sre.SemanticPred.isElligibleEmbellishedFence = function(a) {
  if (!a || !sre.SemanticPred.isFence(a)) return !1;
  if (!a.embellished) return !0;
  var b = function(a) {
    return a.embellished
      ? !(
          !sre.SemanticPred.isAttribute("type", "TENSOR")(a) ||
          (sre.SemanticPred.isAttribute("type", "EMPTY")(a.childNodes[1]) &&
            sre.SemanticPred.isAttribute("type", "EMPTY")(a.childNodes[2])) ||
          (sre.SemanticPred.isAttribute("type", "EMPTY")(a.childNodes[3]) &&
            sre.SemanticPred.isAttribute("type", "EMPTY")(a.childNodes[4]))
        ) ||
        (sre.SemanticPred.isAttribute("role", "CLOSE")(a) &&
          sre.SemanticPred.isAttribute("type", "TENSOR")(a)) ||
        (sre.SemanticPred.isAttribute("role", "OPEN")(a) &&
          (sre.SemanticPred.isAttribute("type", "SUBSCRIPT")(a) ||
            sre.SemanticPred.isAttribute("type", "SUPERSCRIPT")(a)))
        ? !1
        : b(a.childNodes[0])
      : !0;
  };
  return b(a);
};
sre.SemanticPred.isTableOrMultiline = function(a) {
  return (
    !!a &&
    (sre.SemanticPred.isAttribute("type", "TABLE")(a) ||
      sre.SemanticPred.isAttribute("type", "MULTILINE")(a))
  );
};
sre.SemanticPred.tableIsMatrixOrVector = function(a) {
  return (
    !!a &&
    sre.SemanticPred.isAttribute("type", "FENCED")(a) &&
    (sre.SemanticPred.isAttribute("role", "LEFTRIGHT")(a) ||
      sre.SemanticPred.isAttribute("role", "NEUTRAL")(a)) &&
    1 === a.childNodes.length &&
    sre.SemanticPred.isTableOrMultiline(a.childNodes[0])
  );
};
sre.SemanticPred.tableIsCases = function(a, b) {
  return (
    0 < b.length &&
    sre.SemanticPred.isAttribute("role", "OPENFENCE")(b[b.length - 1])
  );
};
sre.SemanticPred.tableIsMultiline = function(a) {
  return a.childNodes.every(function(a) {
    return 1 >= a.childNodes.length;
  });
};
sre.SemanticPred.isBinomial = function(a) {
  return 2 === a.childNodes.length;
};
sre.SemanticPred.isLimitBase = function(a) {
  return (
    sre.SemanticPred.isAttribute("type", "LARGEOP")(a) ||
    sre.SemanticPred.isAttribute("type", "LIMBOTH")(a) ||
    sre.SemanticPred.isAttribute("type", "LIMLOWER")(a) ||
    sre.SemanticPred.isAttribute("type", "LIMUPPER")(a) ||
    (sre.SemanticPred.isAttribute("type", "FUNCTION")(a) &&
      sre.SemanticPred.isAttribute("role", "LIMFUNC")(a))
  );
};
sre.SemanticPred.isSimpleFunctionHead = function(a) {
  return (
    a.type === sre.SemanticAttr.Type.IDENTIFIER ||
    a.role === sre.SemanticAttr.Role.LATINLETTER ||
    a.role === sre.SemanticAttr.Role.GREEKLETTER ||
    a.role === sre.SemanticAttr.Role.OTHERLETTER
  );
};
sre.SemanticPred.singlePunctAtPosition = function(a, b, c) {
  return (
    1 === b.length &&
    a[c].type === sre.SemanticAttr.Type.PUNCTUATION &&
    a[c] === b[0]
  );
};
sre.SemanticProcessor = function() {
  this.factory_ = new sre.SemanticNodeFactory();
};
goog.addSingletonGetter(sre.SemanticProcessor);
sre.SemanticProcessor.prototype.setNodeFactory = function(a) {
  this.factory_ = a;
};
sre.SemanticProcessor.prototype.identifierNode = function(a, b, c) {
  a = sre.SemanticProcessor.getInstance().factory_.makeLeafNode(a, b);
  if ("MathML-Unit" === c)
    (a.type = sre.SemanticAttr.Type.IDENTIFIER),
      (a.role = sre.SemanticAttr.Role.UNIT);
  else if (
    !b &&
    1 === a.textContent.length &&
    (a.role === sre.SemanticAttr.Role.INTEGER ||
      a.role === sre.SemanticAttr.Role.LATINLETTER ||
      a.role === sre.SemanticAttr.Role.GREEKLETTER) &&
    a.font === sre.SemanticAttr.Font.NORMAL
  )
    return (a.font = sre.SemanticAttr.Font.ITALIC), a;
  a.type === sre.SemanticAttr.Type.UNKNOWN &&
    (a.type = sre.SemanticAttr.Type.IDENTIFIER);
  sre.SemanticProcessor.exprFont_(a);
  return a;
};
sre.SemanticProcessor.prototype.implicitNode_ = function(a) {
  a = sre.SemanticProcessor.getInstance().getMixedNumbers_(a);
  a = sre.SemanticProcessor.getInstance().combineUnits_(a);
  if (1 === a.length) return a[0];
  var b = sre.SemanticProcessor.getInstance().factory_.makeMultipleContentNodes(
      a.length - 1,
      sre.SemanticAttr.invisibleTimes()
    ),
    c = sre.SemanticProcessor.getInstance().infixNode_(a, b[0]);
  c.role = sre.SemanticAttr.Role.IMPLICIT;
  b.forEach(function(a) {
    a.parent = c;
  });
  c.contentNodes = b;
  return c;
};
sre.SemanticProcessor.prototype.infixNode_ = function(a, b) {
  var c = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.INFIXOP,
    a,
    [b],
    sre.SemanticProcessor.getEmbellishedInner_(b).textContent
  );
  c.role = b.role;
  return c;
};
sre.SemanticProcessor.prototype.concatNode_ = function(a, b, c) {
  if (0 === b.length) return a;
  var d = b
    .map(function(a) {
      return sre.SemanticProcessor.getEmbellishedInner_(a).textContent;
    })
    .join(" ");
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(c, [a], b, d);
  1 < b.length && (a.role = sre.SemanticAttr.Role.MULTIOP);
  return a;
};
sre.SemanticProcessor.prototype.prefixNode_ = function(a, b) {
  for (
    var c = sre.SemanticProcessor.partitionNodes_(
        b,
        sre.SemanticPred.isAttribute("role", "SUBTRACTION")
      ),
      d = sre.SemanticProcessor.getInstance().concatNode_(
        a,
        c.comp.pop(),
        sre.SemanticAttr.Type.PREFIXOP
      );
    0 < c.rel.length;

  )
    (d = sre.SemanticProcessor.getInstance().concatNode_(
      d,
      [c.rel.pop()],
      sre.SemanticAttr.Type.PREFIXOP
    )),
      (d.role = sre.SemanticAttr.Role.NEGATIVE),
      (d = sre.SemanticProcessor.getInstance().concatNode_(
        d,
        c.comp.pop(),
        sre.SemanticAttr.Type.PREFIXOP
      ));
  return d;
};
sre.SemanticProcessor.prototype.postfixNode_ = function(a, b) {
  return b.length
    ? sre.SemanticProcessor.getInstance().concatNode_(
        a,
        b,
        sre.SemanticAttr.Type.POSTFIXOP
      )
    : a;
};
sre.SemanticProcessor.prototype.text = function(a, b, c) {
  a = sre.SemanticProcessor.getInstance().factory_.makeLeafNode(a, b);
  a.type = sre.SemanticAttr.Type.TEXT;
  "MS" === c && (a.role = sre.SemanticAttr.Role.STRING);
  sre.SemanticProcessor.exprFont_(a);
  return a;
};
sre.SemanticProcessor.prototype.row = function(a) {
  a = a.filter(function(a) {
    return !sre.SemanticPred.isAttribute("type", "EMPTY")(a);
  });
  if (0 === a.length)
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  a = sre.SemanticProcessor.getInstance().getFencesInRow_(a);
  a = sre.SemanticProcessor.getInstance().tablesInRow(a);
  a = sre.SemanticProcessor.getInstance().getPunctuationInRow_(a);
  a = sre.SemanticProcessor.getInstance().getTextInRow_(a);
  a = sre.SemanticProcessor.getInstance().getFunctionsInRow_(a);
  return sre.SemanticProcessor.getInstance().relationsInRow_(a);
};
sre.SemanticProcessor.prototype.combineUnits_ = function(a) {
  var b = sre.SemanticProcessor.partitionNodes_(a, function(a) {
    return !sre.SemanticPred.isAttribute("role", "UNIT")(a);
  });
  if (a.length === b.rel.length) return b.rel;
  a = [];
  do {
    var c = b.comp.shift(),
      d = b.rel.shift();
    1 === c.length && (a = a.concat(c));
    if (1 < c.length) {
      var e = sre.SemanticProcessor.getInstance().factory_.makeContentNode(
          sre.SemanticAttr.invisibleTimes()
        ),
        c = sre.SemanticProcessor.getInstance().infixNode_(c, e);
      c.role = sre.SemanticAttr.Role.UNIT;
      a.push(c);
    }
    d && a.push(d);
  } while (d);
  return a;
};
sre.SemanticProcessor.prototype.getMixedNumbers_ = function(a) {
  var b = sre.SemanticProcessor.partitionNodes_(a, function(a) {
    return (
      sre.SemanticPred.isAttribute("type", "FRACTION")(a) &&
      sre.SemanticPred.isAttribute("role", "VULGAR")(a)
    );
  });
  if (!b.rel.length) return a;
  a = [];
  for (var c = 0, d; (d = b.rel[c]); c++) {
    var e = b.comp[c],
      f = e.length - 1;
    e[f] &&
    sre.SemanticPred.isAttribute("type", "NUMBER")(e[f]) &&
    sre.SemanticPred.isAttribute("role", "INTEGER")(e[f])
      ? ((d = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
          sre.SemanticAttr.Type.NUMBER,
          [e[f], d],
          []
        )),
        (d.role = sre.SemanticAttr.Role.MIXED),
        (a = a.concat(e.slice(0, f))))
      : (a = a.concat(e));
    a.push(d);
  }
  return a.concat(b.comp[b.comp.length - 1]);
};
sre.SemanticProcessor.prototype.getTextInRow_ = function(a) {
  if (1 >= a.length) return a;
  var b = sre.SemanticProcessor.partitionNodes_(
    a,
    sre.SemanticPred.isAttribute("type", "TEXT")
  );
  if (0 === b.rel.length) return a;
  a = [];
  var c = b.comp[0];
  0 < c.length && a.push(sre.SemanticProcessor.getInstance().row(c));
  for (var d = 0; (c = b.rel[d]); d++)
    a.push(c),
      (c = b.comp[d + 1]),
      0 < c.length && a.push(sre.SemanticProcessor.getInstance().row(c));
  return [sre.SemanticProcessor.getInstance().dummyNode_(a)];
};
sre.SemanticProcessor.prototype.relationsInRow_ = function(a) {
  var b = sre.SemanticProcessor.partitionNodes_(a, sre.SemanticPred.isRelation),
    c = b.rel[0];
  if (!c) return sre.SemanticProcessor.getInstance().operationsInRow_(a);
  if (1 === a.length) return a[0];
  a = b.comp.map(
    goog.bind(sre.SemanticProcessor.getInstance().operationsInRow_, this)
  );
  if (
    b.rel.some(function(a) {
      return !a.equals(c);
    })
  )
    return (
      (a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.MULTIREL,
        a,
        b.rel
      )),
      b.rel.every(function(a) {
        return a.role === c.role;
      }) && (a.role = c.role),
      a
    );
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.RELSEQ,
    a,
    b.rel,
    sre.SemanticProcessor.getEmbellishedInner_(c).textContent
  );
  a.role = c.role;
  return a;
};
sre.SemanticProcessor.prototype.operationsInRow_ = function(a) {
  if (0 === a.length)
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  if (1 === a.length) return a[0];
  for (var b = []; 0 < a.length && sre.SemanticPred.isOperator(a[0]); )
    b.push(a.shift());
  if (0 === a.length)
    return sre.SemanticProcessor.getInstance().prefixNode_(b.pop(), b);
  if (1 === a.length)
    return sre.SemanticProcessor.getInstance().prefixNode_(a[0], b);
  a = sre.SemanticProcessor.sliceNodes_(a, sre.SemanticPred.isOperator);
  b = sre.SemanticProcessor.getInstance().prefixNode_(
    sre.SemanticProcessor.getInstance().implicitNode_(a.head),
    b
  );
  return a.div
    ? sre.SemanticProcessor.getInstance().operationsTree_(a.tail, b, a.div)
    : b;
};
sre.SemanticProcessor.prototype.operationsTree_ = function(a, b, c, d) {
  d = d || [];
  if (0 === a.length)
    return (
      d.unshift(c),
      b.type === sre.SemanticAttr.Type.INFIXOP
        ? ((d = sre.SemanticProcessor.getInstance().postfixNode_(
            b.childNodes.pop(),
            d
          )),
          b.appendChild(d),
          b)
        : sre.SemanticProcessor.getInstance().postfixNode_(b, d)
    );
  a = sre.SemanticProcessor.sliceNodes_(a, sre.SemanticPred.isOperator);
  if (0 === a.head.length)
    return (
      d.push(a.div),
      sre.SemanticProcessor.getInstance().operationsTree_(a.tail, b, c, d)
    );
  d = sre.SemanticProcessor.getInstance().prefixNode_(
    sre.SemanticProcessor.getInstance().implicitNode_(a.head),
    d
  );
  b = sre.SemanticProcessor.getInstance().appendOperand_(b, c, d);
  return a.div
    ? sre.SemanticProcessor.getInstance().operationsTree_(a.tail, b, a.div, [])
    : b;
};
sre.SemanticProcessor.prototype.appendOperand_ = function(a, b, c) {
  return a.type !== sre.SemanticAttr.Type.INFIXOP
    ? sre.SemanticProcessor.getInstance().infixNode_([a, c], b)
    : sre.SemanticProcessor.getInstance().appendExistingOperator_(a, b, c)
    ? a
    : b.role === sre.SemanticAttr.Role.MULTIPLICATION
    ? sre.SemanticProcessor.getInstance().appendMultiplicativeOp_(a, b, c)
    : sre.SemanticProcessor.getInstance().appendAdditiveOp_(a, b, c);
};
sre.SemanticProcessor.prototype.appendMultiplicativeOp_ = function(a, b, c) {
  if (a.role === sre.SemanticAttr.Role.IMPLICIT)
    return sre.SemanticProcessor.getInstance().infixNode_([a, c], b);
  for (
    var d = a, e = a.childNodes[a.childNodes.length - 1];
    e && e.type === sre.SemanticAttr.Type.INFIXOP;

  )
    (d = e), (e = d.childNodes[a.childNodes.length - 1]);
  b = sre.SemanticProcessor.getInstance().infixNode_(
    [d.childNodes.pop(), c],
    b
  );
  d.appendChild(b);
  return a;
};
sre.SemanticProcessor.prototype.appendAdditiveOp_ = function(a, b, c) {
  return sre.SemanticProcessor.getInstance().infixNode_([a, c], b);
};
sre.SemanticProcessor.prototype.appendExistingOperator_ = function(a, b, c) {
  return a &&
    a.type === sre.SemanticAttr.Type.INFIXOP &&
    a.role !== sre.SemanticAttr.Role.IMPLICIT
    ? a.contentNodes[0].equals(b)
      ? (a.appendContentNode(b), a.appendChild(c), !0)
      : sre.SemanticProcessor.getInstance().appendExistingOperator_(
          a.childNodes[a.childNodes.length - 1],
          b,
          c
        )
    : !1;
};
sre.SemanticProcessor.prototype.getFencesInRow_ = function(a) {
  a = sre.SemanticProcessor.partitionNodes_(a, sre.SemanticPred.isFence);
  a = sre.SemanticProcessor.purgeFences_(a);
  var b = a.comp.shift();
  return sre.SemanticProcessor.getInstance().fences_(a.rel, a.comp, [], [b]);
};
sre.SemanticProcessor.prototype.fences_ = function(a, b, c, d) {
  if (0 === a.length && 0 === c.length) return d[0];
  var e = sre.SemanticPred.isAttribute("role", "OPEN");
  if (0 === a.length) {
    for (a = d.shift(); 0 < c.length; ) {
      if (e(c[0]))
        (b = c.shift()), sre.SemanticProcessor.fenceToPunct_(b), a.push(b);
      else {
        c = sre.SemanticProcessor.sliceNodes_(c, e);
        var f = c.head.length - 1,
          g = sre.SemanticProcessor.getInstance().neutralFences_(
            c.head,
            d.slice(0, f)
          );
        d = d.slice(f);
        a.push.apply(a, g);
        c.div && c.tail.unshift(c.div);
        c = c.tail;
      }
      a.push.apply(a, d.shift());
    }
    return a;
  }
  f = c[c.length - 1];
  g = a[0].role;
  if (
    g === sre.SemanticAttr.Role.OPEN ||
    (g === sre.SemanticAttr.Role.NEUTRAL &&
      (!f || a[0].textContent !== f.textContent))
  )
    return (
      c.push(a.shift()),
      (e = b.shift()) && d.push(e),
      sre.SemanticProcessor.getInstance().fences_(a, b, c, d)
    );
  if (
    f &&
    ((g === sre.SemanticAttr.Role.CLOSE &&
      f.role === sre.SemanticAttr.Role.OPEN) ||
      (g === sre.SemanticAttr.Role.NEUTRAL &&
        a[0].textContent === f.textContent))
  )
    return (
      (e = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        c.pop(),
        a.shift(),
        d.pop()
      )),
      d.push(d.pop().concat([e], b.shift())),
      sre.SemanticProcessor.getInstance().fences_(a, b, c, d)
    );
  if (
    f &&
    g === sre.SemanticAttr.Role.CLOSE &&
    f.role === sre.SemanticAttr.Role.NEUTRAL &&
    c.some(e)
  )
    return (
      (c = sre.SemanticProcessor.sliceNodes_(c, e, !0)),
      (e = d.pop()),
      (f = d.length - c.tail.length + 1),
      (g = sre.SemanticProcessor.getInstance().neutralFences_(
        c.tail,
        d.slice(f)
      )),
      (d = d.slice(0, f)),
      (e = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        c.div,
        a.shift(),
        d.pop().concat(g, e)
      )),
      d.push(d.pop().concat([e], b.shift())),
      sre.SemanticProcessor.getInstance().fences_(a, b, c.head, d)
    );
  e = a.shift();
  sre.SemanticProcessor.fenceToPunct_(e);
  d.push(d.pop().concat([e], b.shift()));
  return sre.SemanticProcessor.getInstance().fences_(a, b, c, d);
};
sre.SemanticProcessor.prototype.neutralFences_ = function(a, b) {
  if (0 === a.length) return a;
  if (1 === a.length) return sre.SemanticProcessor.fenceToPunct_(a[0]), a;
  var c = a.shift(),
    d = sre.SemanticProcessor.sliceNodes_(a, function(a) {
      return (
        sre.SemanticProcessor.getEmbellishedInner_(a).textContent ==
        sre.SemanticProcessor.getEmbellishedInner_(c).textContent
      );
    });
  if (!d.div) {
    sre.SemanticProcessor.fenceToPunct_(c);
    var e = b.shift();
    e.unshift(c);
    return e.concat(sre.SemanticProcessor.getInstance().neutralFences_(a, b));
  }
  var f = sre.SemanticProcessor.getInstance().combineFencedContent_(
    c,
    d.div,
    d.head,
    b
  );
  return 0 < d.tail.length
    ? ((e = f.shift()),
      (d = sre.SemanticProcessor.getInstance().neutralFences_(d.tail, f)),
      e.concat(d))
    : f[0];
};
sre.SemanticProcessor.prototype.combineFencedContent_ = function(a, b, c, d) {
  if (0 === c.length)
    return (
      (a = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        a,
        b,
        d.shift()
      )),
      0 < d.length ? d[0].unshift(a) : (d = [[a]]),
      d
    );
  var e = d.shift(),
    f = c.length - 1,
    g = d.slice(0, f);
  d = d.slice(f);
  f = d.shift();
  c = sre.SemanticProcessor.getInstance().neutralFences_(c, g);
  e.push.apply(e, c);
  e.push.apply(e, f);
  a = sre.SemanticProcessor.getInstance().horizontalFencedNode_(a, b, e);
  0 < d.length ? d[0].unshift(a) : (d = [[a]]);
  return d;
};
sre.SemanticProcessor.FENCE_TO_PUNCT_ = {};
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.NEUTRAL] =
  sre.SemanticAttr.Role.VBAR;
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.OPEN] =
  sre.SemanticAttr.Role.OPENFENCE;
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.CLOSE] =
  sre.SemanticAttr.Role.CLOSEFENCE;
sre.SemanticProcessor.fenceToPunct_ = function(a) {
  var b = sre.SemanticProcessor.FENCE_TO_PUNCT_[a.role];
  if (b) {
    for (; a.embellished; )
      (a.embellished = sre.SemanticAttr.Type.PUNCTUATION),
        (a.role = b),
        (a = a.childNodes[0]);
    a.type = sre.SemanticAttr.Type.PUNCTUATION;
    a.role = b;
  }
};
sre.SemanticProcessor.prototype.horizontalFencedNode_ = function(a, b, c) {
  c = sre.SemanticProcessor.getInstance().row(c);
  b = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.FENCED,
    [c],
    [a, b]
  );
  b.role =
    a.role === sre.SemanticAttr.Role.OPEN
      ? sre.SemanticAttr.Role.LEFTRIGHT
      : a.role;
  return sre.SemanticProcessor.rewriteFencedNode_(b);
};
sre.SemanticProcessor.prototype.getPunctuationInRow_ = function(a) {
  if (1 >= a.length) return a;
  var b = sre.SemanticProcessor.partitionNodes_(a, function(a) {
    return (
      sre.SemanticPred.isPunctuation(a) &&
      !sre.SemanticPred.isAttribute("role", "ELLIPSIS")(a)
    );
  });
  if (0 === b.rel.length) return a;
  a = [];
  var c = b.comp.shift();
  0 < c.length && a.push(sre.SemanticProcessor.getInstance().row(c));
  for (var d = 0; 0 < b.comp.length; )
    a.push(b.rel[d++]),
      (c = b.comp.shift()),
      0 < c.length && a.push(sre.SemanticProcessor.getInstance().row(c));
  return [sre.SemanticProcessor.getInstance().punctuatedNode_(a, b.rel)];
};
sre.SemanticProcessor.prototype.punctuatedNode_ = function(a, b) {
  var c = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.PUNCTUATED,
    a,
    b
  );
  if (b.length === a.length) {
    var d = b[0].role;
    if (
      d !== sre.SemanticAttr.Role.UNKNOWN &&
      b.every(function(a) {
        return a.role === d;
      })
    )
      return (c.role = d), c;
  }
  sre.SemanticPred.singlePunctAtPosition(a, b, 0)
    ? (c.role = sre.SemanticAttr.Role.STARTPUNCT)
    : sre.SemanticPred.singlePunctAtPosition(a, b, a.length - 1)
    ? (c.role = sre.SemanticAttr.Role.ENDPUNCT)
    : b.every(sre.SemanticPred.isAttribute("role", "DUMMY"))
    ? (c.role = sre.SemanticAttr.Role.TEXT)
    : (c.role = sre.SemanticAttr.Role.SEQUENCE);
  return c;
};
sre.SemanticProcessor.prototype.dummyNode_ = function(a) {
  var b = sre.SemanticProcessor.getInstance().factory_.makeMultipleContentNodes(
    a.length - 1,
    sre.SemanticAttr.invisibleComma()
  );
  b.forEach(function(a) {
    a.role = sre.SemanticAttr.Role.DUMMY;
  });
  return sre.SemanticProcessor.getInstance().punctuatedNode_(a, b);
};
sre.SemanticProcessor.MML_TO_LIMIT_ = {
  MSUB: sre.SemanticAttr.Type.LIMLOWER,
  MUNDER: sre.SemanticAttr.Type.LIMLOWER,
  MSUP: sre.SemanticAttr.Type.LIMUPPER,
  MOVER: sre.SemanticAttr.Type.LIMUPPER,
  MSUBSUP: sre.SemanticAttr.Type.LIMBOTH,
  MUNDEROVER: sre.SemanticAttr.Type.LIMBOTH
};
sre.SemanticProcessor.prototype.limitNode = function(a, b) {
  var c = b[0],
    d;
  if (sre.SemanticPred.isLimitBase(c))
    d = sre.SemanticProcessor.MML_TO_LIMIT_[a];
  else
    switch (a) {
      case "MSUB":
        d = sre.SemanticAttr.Type.SUBSCRIPT;
        break;
      case "MSUP":
        d = sre.SemanticAttr.Type.SUPERSCRIPT;
        break;
      case "MSUBSUP":
        var e = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
          sre.SemanticAttr.Type.SUBSCRIPT,
          [c, b[1]],
          []
        );
        e.role = sre.SemanticAttr.Role.SUBSUP;
        b = [e, b[2]];
        d = sre.SemanticAttr.Type.SUPERSCRIPT;
        break;
      case "MOVER":
        d = sre.SemanticAttr.Type.OVERSCORE;
        sre.SemanticPred.isAccent(b[1]) &&
          (b[1].role = sre.SemanticAttr.Role.OVERACCENT);
        break;
      case "MUNDER":
        d = sre.SemanticAttr.Type.UNDERSCORE;
        sre.SemanticPred.isAccent(b[1]) &&
          (b[1].role = sre.SemanticAttr.Role.UNDERACCENT);
        break;
      default:
        (e = sre.SemanticPred.isAccent(b[1])),
          (d = sre.SemanticPred.isAccent(b[2])),
          e && (b[1].role = sre.SemanticAttr.Role.UNDERACCENT),
          d && (b[2].role = sre.SemanticAttr.Role.OVERACCENT),
          d && !e
            ? ((e = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
                sre.SemanticAttr.Type.OVERSCORE,
                [c, b[2]],
                []
              )),
              (b = [e, b[1]]),
              (d = sre.SemanticAttr.Type.UNDERSCORE))
            : ((e = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
                sre.SemanticAttr.Type.UNDERSCORE,
                [c, b[1]],
                []
              )),
              (b = [e, b[2]]),
              (d = sre.SemanticAttr.Type.OVERSCORE)),
          (e.role = sre.SemanticAttr.Role.UNDEROVER);
    }
  d = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(d, b, []);
  var f = sre.SemanticPred.isEmbellished(c);
  e && (e.embellished = f);
  d.embellished = f;
  d.role = c.role;
  return d;
};
sre.SemanticProcessor.prototype.getFunctionsInRow_ = function(a, b) {
  var c = b || [];
  if (0 === a.length) return c;
  var d = a.shift(),
    e = sre.SemanticProcessor.classifyFunction_(d, a);
  if (!e)
    return (
      c.push(d), sre.SemanticProcessor.getInstance().getFunctionsInRow_(a, c)
    );
  var f = sre.SemanticProcessor.getInstance().getFunctionsInRow_(a, []),
    d = sre.SemanticProcessor.getInstance().getFunctionArgs_(d, f, e);
  return c.concat(d);
};
sre.SemanticProcessor.CLASSIFY_FUNCTION_ = {};
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.INTEGRAL] =
  "integral";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.SUM] = "bigop";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.PREFIXFUNC] =
  "prefix";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.LIMFUNC] =
  "prefix";
sre.SemanticProcessor.classifyFunction_ = function(a, b) {
  if (
    a.type === sre.SemanticAttr.Type.APPL ||
    a.type === sre.SemanticAttr.Type.BIGOP ||
    a.type === sre.SemanticAttr.Type.INTEGRAL
  )
    return "";
  if (b[0] && b[0].textContent === sre.SemanticAttr.functionApplication()) {
    b.shift();
    var c = sre.SemanticAttr.Role.SIMPLEFUNC;
    if (
      a.role === sre.SemanticAttr.Role.PREFIXFUNC ||
      a.role === sre.SemanticAttr.Role.LIMFUNC
    )
      c = a.role;
    sre.SemanticProcessor.propagateFunctionRole_(a, c);
    return "prefix";
  }
  return (c = sre.SemanticProcessor.CLASSIFY_FUNCTION_[a.role])
    ? c
    : sre.SemanticPred.isSimpleFunctionHead(a)
    ? "simple"
    : "";
};
sre.SemanticProcessor.propagateFunctionRole_ = function(a, b) {
  a &&
    (sre.SemanticPred.isAttribute("role", "SUBSUP")(a) || (a.role = b),
    sre.SemanticProcessor.propagateFunctionRole_(a.childNodes[0], b));
};
sre.SemanticProcessor.prototype.getFunctionArgs_ = function(a, b, c) {
  switch (c) {
    case "integral":
      b = sre.SemanticProcessor.getInstance().getIntegralArgs_(b);
      var d = sre.SemanticProcessor.getInstance().row(b.integrand);
      a = sre.SemanticProcessor.getInstance().integralNode_(a, d, b.intvar);
      b.rest.unshift(a);
      return b.rest;
    case "prefix":
      if (b[0] && b[0].type === sre.SemanticAttr.Type.FENCED)
        return (
          (a = sre.SemanticProcessor.getInstance().functionNode_(a, b.shift())),
          b.unshift(a),
          b
        );
    case "bigop":
      d = sre.SemanticProcessor.sliceNodes_(
        b,
        sre.SemanticPred.isPrefixFunctionBoundary
      );
      if (!d.head.length) return b.unshift(a), b;
      b = sre.SemanticProcessor.getInstance().row(d.head);
      a =
        "prefix" === c
          ? sre.SemanticProcessor.getInstance().functionNode_(a, b)
          : sre.SemanticProcessor.getInstance().bigOpNode_(a, b);
      d.div && d.tail.unshift(d.div);
      d.tail.unshift(a);
      return d.tail;
    default:
      if (0 === b.length) return [a];
      d = b[0];
      if (
        d.type === sre.SemanticAttr.Type.FENCED &&
        d.role !== sre.SemanticAttr.Role.NEUTRAL &&
        sre.SemanticPred.isSimpleFunction(d)
      )
        return (
          sre.SemanticProcessor.propagateFunctionRole_(
            a,
            sre.SemanticAttr.Role.SIMPLEFUNC
          ),
          (a = sre.SemanticProcessor.getInstance().functionNode_(a, b.shift())),
          b.unshift(a),
          b
        );
      b.unshift(a);
      return b;
  }
};
sre.SemanticProcessor.prototype.getIntegralArgs_ = function(a, b) {
  var c = b || [];
  if (0 === a.length) return { integrand: c, intvar: null, rest: a };
  var d = a[0];
  if (sre.SemanticPred.isGeneralFunctionBoundary(d))
    return { integrand: c, intvar: null, rest: a };
  if (sre.SemanticPred.isIntegralDxBoundarySingle(d))
    return { integrand: c, intvar: d, rest: a.slice(1) };
  if (a[1] && sre.SemanticPred.isIntegralDxBoundary(d, a[1])) {
    var e = sre.SemanticProcessor.getInstance().factory_.makeContentNode(
        sre.SemanticAttr.invisibleComma()
      ),
      d = sre.SemanticProcessor.getInstance().punctuatedNode_(
        [d, e, a[1]],
        [e]
      );
    d.role = sre.SemanticAttr.Role.INTEGRAL;
    return { integrand: c, intvar: d, rest: a.slice(2) };
  }
  c.push(a.shift());
  return sre.SemanticProcessor.getInstance().getIntegralArgs_(a, c);
};
sre.SemanticProcessor.prototype.functionNode_ = function(a, b) {
  var c = sre.SemanticProcessor.getInstance().factory_.makeContentNode(
    sre.SemanticAttr.functionApplication()
  );
  c.type = sre.SemanticAttr.Type.PUNCTUATION;
  c.role = sre.SemanticAttr.Role.APPLICATION;
  var d = sre.SemanticProcessor.getFunctionOp_(a, function(a) {
    return (
      sre.SemanticPred.isAttribute("type", "FUNCTION")(a) ||
      (sre.SemanticPred.isAttribute("type", "IDENTIFIER")(a) &&
        sre.SemanticPred.isAttribute("role", "SIMPLEFUNC")(a))
    );
  });
  return sre.SemanticProcessor.getInstance().functionalNode_(
    sre.SemanticAttr.Type.APPL,
    [a, b],
    d,
    [c]
  );
};
sre.SemanticProcessor.prototype.bigOpNode_ = function(a, b) {
  var c = sre.SemanticProcessor.getFunctionOp_(
    a,
    sre.SemanticPred.isAttribute("type", "LARGEOP")
  );
  return sre.SemanticProcessor.getInstance().functionalNode_(
    sre.SemanticAttr.Type.BIGOP,
    [a, b],
    c,
    []
  );
};
sre.SemanticProcessor.prototype.integralNode_ = function(a, b, c) {
  b = b || sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  c = c || sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  var d = sre.SemanticProcessor.getFunctionOp_(
    a,
    sre.SemanticPred.isAttribute("type", "LARGEOP")
  );
  return sre.SemanticProcessor.getInstance().functionalNode_(
    sre.SemanticAttr.Type.INTEGRAL,
    [a, b, c],
    d,
    []
  );
};
sre.SemanticProcessor.prototype.functionalNode_ = function(a, b, c, d) {
  var e = b[0];
  if (c) {
    var f = c.parent;
    d.push(c);
  }
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(a, b, d);
  a.role = e.role;
  f && (c.parent = f);
  return a;
};
sre.SemanticProcessor.getFunctionOp_ = function(a, b) {
  if (b(a)) return a;
  for (var c = 0, d; (d = a.childNodes[c]); c++)
    if ((d = sre.SemanticProcessor.getFunctionOp_(d, b))) return d;
  return null;
};
sre.SemanticProcessor.prototype.tablesInRow = function(a) {
  a = sre.SemanticProcessor.partitionNodes_(
    a,
    sre.SemanticPred.tableIsMatrixOrVector
  );
  for (var b = [], c = 0, d; (d = a.rel[c]); c++)
    (b = b.concat(a.comp.shift())),
      b.push(sre.SemanticProcessor.tableToMatrixOrVector_(d));
  b = b.concat(a.comp.shift());
  a = sre.SemanticProcessor.partitionNodes_(
    b,
    sre.SemanticPred.isTableOrMultiline
  );
  b = [];
  for (c = 0; (d = a.rel[c]); c++) {
    var e = a.comp.shift();
    sre.SemanticPred.tableIsCases(d, e) &&
      sre.SemanticProcessor.tableToCases_(d, e.pop());
    b = b.concat(e);
    b.push(d);
  }
  return b.concat(a.comp.shift());
};
sre.SemanticProcessor.tableToMatrixOrVector_ = function(a) {
  var b = a.childNodes[0];
  sre.SemanticPred.isAttribute("type", "MULTILINE")(b)
    ? sre.SemanticProcessor.tableToVector_(a)
    : sre.SemanticProcessor.tableToMatrix_(a);
  a.contentNodes.forEach(goog.bind(b.appendContentNode, b));
  a = 0;
  for (var c; (c = b.childNodes[a]); a++)
    sre.SemanticProcessor.assignRoleToRow_(
      c,
      sre.SemanticProcessor.getComponentRoles_(b)
    );
  b.parent = null;
  return b;
};
sre.SemanticProcessor.tableToVector_ = function(a) {
  var b = a.childNodes[0];
  b.type = sre.SemanticAttr.Type.VECTOR;
  1 === b.childNodes.length
    ? sre.SemanticProcessor.tableToSquare_(a)
    : sre.SemanticProcessor.binomialForm_(b);
};
sre.SemanticProcessor.binomialForm_ = function(a) {
  sre.SemanticPred.isBinomial(a) &&
    ((a.role = sre.SemanticAttr.Role.BINOMIAL),
    (a.childNodes[0].role = sre.SemanticAttr.Role.BINOMIAL),
    (a.childNodes[1].role = sre.SemanticAttr.Role.BINOMIAL));
};
sre.SemanticProcessor.tableToMatrix_ = function(a) {
  var b = a.childNodes[0];
  b.type = sre.SemanticAttr.Type.MATRIX;
  b.childNodes &&
  0 < b.childNodes.length &&
  b.childNodes[0].childNodes &&
  b.childNodes.length === b.childNodes[0].childNodes.length
    ? sre.SemanticProcessor.tableToSquare_(a)
    : b.childNodes &&
      1 === b.childNodes.length &&
      (b.role = sre.SemanticAttr.Role.ROWVECTOR);
};
sre.SemanticProcessor.tableToSquare_ = function(a) {
  var b = a.childNodes[0];
  sre.SemanticPred.isAttribute("role", "NEUTRAL")(a)
    ? (b.role = sre.SemanticAttr.Role.DETERMINANT)
    : (b.role = sre.SemanticAttr.Role.SQUAREMATRIX);
};
sre.SemanticProcessor.getComponentRoles_ = function(a) {
  var b = a.role;
  return b && b !== sre.SemanticAttr.Role.UNKNOWN
    ? b
    : sre.SemanticAttr.Role[a.type.toUpperCase()] ||
        sre.SemanticAttr.Role.UNKNOWN;
};
sre.SemanticProcessor.tableToCases_ = function(a, b) {
  for (var c = 0, d; (d = a.childNodes[c]); c++)
    sre.SemanticProcessor.assignRoleToRow_(d, sre.SemanticAttr.Role.CASES);
  a.type = sre.SemanticAttr.Type.CASES;
  a.appendContentNode(b);
  sre.SemanticPred.tableIsMultiline(a) &&
    sre.SemanticProcessor.binomialForm_(a);
  return a;
};
sre.SemanticProcessor.tableToMultiline = function(a) {
  if (sre.SemanticPred.tableIsMultiline(a)) {
    a.type = sre.SemanticAttr.Type.MULTILINE;
    for (var b = 0, c; (c = a.childNodes[b]); b++)
      sre.SemanticProcessor.rowToLine_(c, sre.SemanticAttr.Role.MULTILINE);
    sre.SemanticProcessor.binomialForm_(a);
  }
};
sre.SemanticProcessor.rowToLine_ = function(a, b) {
  var c = b || sre.SemanticAttr.Role.UNKNOWN;
  sre.SemanticPred.isAttribute("type", "ROW")(a) &&
    1 === a.childNodes.length &&
    sre.SemanticPred.isAttribute("type", "CELL")(a.childNodes[0]) &&
    ((a.type = sre.SemanticAttr.Type.LINE),
    (a.role = c),
    (a.childNodes = a.childNodes[0].childNodes),
    a.childNodes.forEach(function(b) {
      b.parent = a;
    }));
};
sre.SemanticProcessor.assignRoleToRow_ = function(a, b) {
  if (sre.SemanticPred.isAttribute("type", "LINE")(a)) a.role = b;
  else if (sre.SemanticPred.isAttribute("type", "ROW")(a)) {
    a.role = b;
    var c = sre.SemanticPred.isAttribute("type", "CELL");
    a.childNodes.forEach(function(a) {
      c(a) && (a.role = b);
    });
  }
};
sre.SemanticProcessor.sliceNodes_ = function(a, b, c) {
  c && a.reverse();
  for (var d = [], e = 0, f; (f = a[e]); e++) {
    if (b(f))
      return c
        ? { head: a.slice(e + 1).reverse(), div: f, tail: d.reverse() }
        : { head: d, div: f, tail: a.slice(e + 1) };
    d.push(f);
  }
  return c
    ? { head: [], div: null, tail: d.reverse() }
    : { head: d, div: null, tail: [] };
};
sre.SemanticProcessor.partitionNodes_ = function(a, b) {
  var c = a,
    d = [],
    e = [];
  do {
    var f = sre.SemanticProcessor.sliceNodes_(c, b);
    e.push(f.head);
    d.push(f.div);
    c = f.tail;
  } while (f.div);
  d.pop();
  return { rel: d, comp: e };
};
sre.SemanticProcessor.prototype.mfenced = function(a, b, c, d) {
  if (c && 0 < d.length) {
    var e = sre.MathUtil.nextSeparatorFunction(c),
      f = [d.shift()];
    d.forEach(
      goog.bind(function(a) {
        f.push(
          sre.SemanticProcessor.getInstance().factory_.makeContentNode(e())
        );
        f.push(a);
      }, this)
    );
    d = f;
  }
  if (a && b)
    return sre.SemanticProcessor.getInstance().horizontalFencedNode_(
      sre.SemanticProcessor.getInstance().factory_.makeContentNode(a),
      sre.SemanticProcessor.getInstance().factory_.makeContentNode(b),
      d
    );
  a &&
    d.unshift(sre.SemanticProcessor.getInstance().factory_.makeContentNode(a));
  b && d.push(sre.SemanticProcessor.getInstance().factory_.makeContentNode(b));
  return sre.SemanticProcessor.getInstance().row(d);
};
sre.SemanticProcessor.number = function(a) {
  if (
    a.type === sre.SemanticAttr.Type.UNKNOWN ||
    a.type === sre.SemanticAttr.Type.IDENTIFIER
  )
    a.type = sre.SemanticAttr.Type.NUMBER;
  sre.SemanticProcessor.numberRole_(a);
  sre.SemanticProcessor.exprFont_(a);
};
sre.SemanticProcessor.numberRole_ = function(a) {
  if (a.role === sre.SemanticAttr.Role.UNKNOWN) {
    var b = sre.SemanticUtil.splitUnicode(a.textContent).map(
      sre.SemanticAttr.lookupMeaning
    );
    b.every(function(a) {
      return (
        (a.type === sre.SemanticAttr.Type.NUMBER &&
          a.role === sre.SemanticAttr.Role.INTEGER) ||
        (a.type === sre.SemanticAttr.Type.PUNCTUATION &&
          a.role === sre.SemanticAttr.Role.COMMA)
      );
    })
      ? (a.role = sre.SemanticAttr.Role.INTEGER)
      : b.every(function(a) {
          return (
            (a.type === sre.SemanticAttr.Type.NUMBER &&
              a.role === sre.SemanticAttr.Role.INTEGER) ||
            a.type === sre.SemanticAttr.Type.PUNCTUATION
          );
        })
      ? (a.role = sre.SemanticAttr.Role.FLOAT)
      : (a.role = sre.SemanticAttr.Role.OTHERNUMBER);
  }
};
sre.SemanticProcessor.exprFont_ = function(a) {
  if (a.font === sre.SemanticAttr.Font.UNKNOWN) {
    var b = sre.SemanticUtil.splitUnicode(a.textContent)
      .map(sre.SemanticAttr.lookupMeaning)
      .reduce(function(a, b) {
        return a &&
          b.font &&
          b.font !== sre.SemanticAttr.Font.UNKNOWN &&
          b.font !== a
          ? a === sre.SemanticAttr.Font.UNKNOWN
            ? b.font
            : null
          : a;
      }, sre.SemanticAttr.Font.UNKNOWN);
    b && (a.font = b);
  }
};
sre.SemanticProcessor.prototype.fractionLikeNode = function(a, b, c) {
  return sre.SemanticUtil.isZeroLength(a)
    ? ((a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.LINE,
        [b],
        []
      )),
      (c = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.LINE,
        [c],
        []
      )),
      (c = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.MULTILINE,
        [a, c],
        []
      )),
      sre.SemanticProcessor.binomialForm_(c),
      c)
    : sre.SemanticProcessor.getInstance().fractionNode_(b, c);
};
sre.SemanticProcessor.prototype.fractionNode_ = function(a, b) {
  var c = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.FRACTION,
    [a, b],
    []
  );
  c.role = c.childNodes.every(function(a) {
    return sre.SemanticPred.isAttribute("role", "INTEGER")(a);
  })
    ? sre.SemanticAttr.Role.VULGAR
    : c.childNodes.every(function(a) {
        return sre.SemanticPred.isAttribute("role", "UNIT")(a);
      })
    ? sre.SemanticAttr.Role.UNIT
    : sre.SemanticAttr.Role.DIVISION;
  return c;
};
sre.SemanticProcessor.prototype.tensor = function(a, b, c, d, e) {
  b = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.TENSOR,
    [
      a,
      sre.SemanticProcessor.getInstance().scriptNode_(
        b,
        sre.SemanticAttr.Role.LEFTSUB
      ),
      sre.SemanticProcessor.getInstance().scriptNode_(
        c,
        sre.SemanticAttr.Role.LEFTSUPER
      ),
      sre.SemanticProcessor.getInstance().scriptNode_(
        d,
        sre.SemanticAttr.Role.RIGHTSUB
      ),
      sre.SemanticProcessor.getInstance().scriptNode_(
        e,
        sre.SemanticAttr.Role.RIGHTSUPER
      )
    ],
    []
  );
  b.role = a.role;
  b.embellished = sre.SemanticPred.isEmbellished(a);
  return b;
};
sre.SemanticProcessor.prototype.pseudoTensor = function(a, b, c) {
  var d = function(a) {
      return !sre.SemanticPred.isAttribute("type", "EMPTY")(a);
    },
    e = b.filter(d).length,
    d = c.filter(d).length;
  if (!e && !d) return a;
  var f = e ? (d ? "MSUBSUP" : "MSUB") : "MSUP";
  a = [a];
  e &&
    a.push(
      sre.SemanticProcessor.getInstance().scriptNode_(
        b,
        sre.SemanticAttr.Role.RIGHTSUB,
        !0
      )
    );
  d &&
    a.push(
      sre.SemanticProcessor.getInstance().scriptNode_(
        c,
        sre.SemanticAttr.Role.RIGHTSUPER,
        !0
      )
    );
  return sre.SemanticProcessor.getInstance().limitNode(f, a);
};
sre.SemanticProcessor.prototype.scriptNode_ = function(a, b, c) {
  switch (a.length) {
    case 0:
      a = sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
      break;
    case 1:
      a = a[0];
      if (c) return a;
      break;
    default:
      a = sre.SemanticProcessor.getInstance().dummyNode_(a);
  }
  a.role = b;
  return a;
};
sre.SemanticProcessor.getEmbellishedInner_ = function(a) {
  return a && a.embellished && 0 < a.childNodes.length
    ? sre.SemanticProcessor.getEmbellishedInner_(a.childNodes[0])
    : a;
};
sre.SemanticProcessor.purgeFences_ = function(a) {
  var b = a.rel;
  a = a.comp;
  for (var c = [], d = []; 0 < b.length; ) {
    var e = b.shift(),
      f = a.shift();
    sre.SemanticPred.isElligibleEmbellishedFence(e)
      ? (c.push(e), d.push(f))
      : (sre.SemanticProcessor.fenceToPunct_(e),
        f.push(e),
        (f = f.concat(a.shift())),
        a.unshift(f));
  }
  d.push(a.shift());
  return { rel: c, comp: d };
};
sre.SemanticProcessor.rewriteFencedNode_ = function(a) {
  var b = a.contentNodes[1],
    c = sre.SemanticProcessor.rewriteFence_(a, a.contentNodes[0]);
  a.contentNodes[0] = c.fence;
  c = sre.SemanticProcessor.rewriteFence_(c.node, b);
  a.contentNodes[1] = c.fence;
  a.contentNodes[0].parent = a;
  a.contentNodes[1].parent = a;
  c.node.parent = null;
  return c.node;
};
sre.SemanticProcessor.rewriteFence_ = function(a, b) {
  if (!b.embellished) return { node: a, fence: b };
  var c = b.childNodes[0],
    d = sre.SemanticProcessor.rewriteFence_(a, c);
  if (
    sre.SemanticPred.isAttribute("type", "SUPERSCRIPT")(b) ||
    sre.SemanticPred.isAttribute("type", "SUBSCRIPT")(b) ||
    sre.SemanticPred.isAttribute("type", "TENSOR")(b)
  )
    return (
      sre.SemanticPred.isAttribute("role", "SUBSUP")(b) || (b.role = a.role),
      c !== d.node && (b.replaceChild(c, d.node), (c.parent = a)),
      sre.SemanticProcessor.propagateFencePointer_(b, c),
      { node: b, fence: d.fence }
    );
  b.replaceChild(c, d.fence);
  b.mathmlTree &&
    -1 === b.mathml.indexOf(b.mathmlTree) &&
    b.mathml.push(b.mathmlTree);
  return { node: d.node, fence: b };
};
sre.SemanticProcessor.propagateFencePointer_ = function(a, b) {
  a.fencePointer = b.fencePointer || b.id.toString();
  a.embellished = null;
};
sre.SemanticProcessor.MATHJAX_FONTS = {
  "-tex-caligraphic": sre.SemanticAttr.Font.CALIGRAPHIC,
  "-tex-caligraphic-bold": sre.SemanticAttr.Font.CALIGRAPHICBOLD,
  "-tex-oldstyle": sre.SemanticAttr.Font.OLDSTYLE,
  "-tex-oldstyle-bold": sre.SemanticAttr.Font.OLDSTYLEBOLD,
  "-tex-mathit": sre.SemanticAttr.Font.ITALIC
};
sre.SemanticProcessor.prototype.font = function(a) {
  var b = sre.SemanticProcessor.MATHJAX_FONTS[a];
  return b ? b : a;
};
sre.SemanticMathml = function() {
  sre.SemanticAbstractParser.call(this, "MathML");
  this.parseMap_ = {
    SEMANTICS: goog.bind(this.semantics_, this),
    MATH: goog.bind(this.rows_, this),
    MROW: goog.bind(this.rows_, this),
    MPADDED: goog.bind(this.rows_, this),
    MSTYLE: goog.bind(this.rows_, this),
    MFRAC: goog.bind(this.fraction_, this),
    MSUB: goog.bind(this.limits_, this),
    MSUP: goog.bind(this.limits_, this),
    MSUBSUP: goog.bind(this.limits_, this),
    MOVER: goog.bind(this.limits_, this),
    MUNDER: goog.bind(this.limits_, this),
    MUNDEROVER: goog.bind(this.limits_, this),
    MROOT: goog.bind(this.root_, this),
    MSQRT: goog.bind(this.sqrt_, this),
    MTABLE: goog.bind(this.table_, this),
    MLABELEDTR: goog.bind(this.tableLabeledRow_, this),
    MTR: goog.bind(this.tableRow_, this),
    MTD: goog.bind(this.tableCell_, this),
    MS: goog.bind(this.text_, this),
    MTEXT: goog.bind(this.text_, this),
    "ANNOTATION-XML": goog.bind(this.text_, this),
    MI: goog.bind(this.identifier_, this),
    MN: goog.bind(this.number_, this),
    MO: goog.bind(this.operator_, this),
    MFENCED: goog.bind(this.fenced_, this),
    MENCLOSE: goog.bind(this.enclosed_, this),
    MMULTISCRIPTS: goog.bind(this.multiscripts_, this),
    ANNOTATION: goog.bind(this.empty_, this),
    NONE: goog.bind(this.empty_, this),
    MACTION: goog.bind(this.action_, this)
  };
};
goog.inherits(sre.SemanticMathml, sre.SemanticAbstractParser);
sre.SemanticMathml.prototype.parse = function(a) {
  sre.SemanticProcessor.getInstance().setNodeFactory(this.getFactory());
  var b = sre.DomUtil.toArray(a.childNodes),
    c = sre.DomUtil.tagName(a),
    d = this.parseMap_[c],
    b = (d ? d : this.dummy_)(a, b);
  if (-1 !== ["MATH", "MROW", "MPADDED", "MSTYLE"].indexOf(c)) return b;
  b.mathml.unshift(a);
  b.mathmlTree = a;
  return b;
};
sre.SemanticMathml.prototype.parseNodes_ = function(a) {
  for (var b = [], c = 0, d; (d = a[c]); c++) b.push(this.parse(d));
  return b;
};
sre.SemanticMathml.prototype.semantics_ = function(a, b) {
  return b.length ? this.parse(b[0]) : this.getFactory().makeEmptyNode();
};
sre.SemanticMathml.prototype.rows_ = function(a, b) {
  b = sre.SemanticUtil.purgeNodes(b);
  var c =
    1 === b.length
      ? this.parse(b[0])
      : sre.SemanticProcessor.getInstance().row(this.parseNodes_(b));
  c.mathml.unshift(a);
  return c;
};
sre.SemanticMathml.prototype.fraction_ = function(a, b) {
  return sre.SemanticProcessor.getInstance().fractionLikeNode(
    a.getAttribute("linethickness"),
    this.parse(b[0]),
    this.parse(b[1])
  );
};
sre.SemanticMathml.prototype.limits_ = function(a, b) {
  return sre.SemanticProcessor.getInstance().limitNode(
    sre.DomUtil.tagName(a),
    this.parseNodes_(b)
  );
};
sre.SemanticMathml.prototype.root_ = function(a, b) {
  return this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.ROOT,
    [this.parse(b[1]), this.parse(b[0])],
    []
  );
};
sre.SemanticMathml.prototype.sqrt_ = function(a, b) {
  var c = this.parseNodes_(sre.SemanticUtil.purgeNodes(b));
  return this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.SQRT,
    [sre.SemanticProcessor.getInstance().row(c)],
    []
  );
};
sre.SemanticMathml.prototype.table_ = function(a, b) {
  var c = this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.TABLE,
    this.parseNodes_(b),
    []
  );
  sre.SemanticProcessor.tableToMultiline(c);
  return c;
};
sre.SemanticMathml.prototype.tableRow_ = function(a, b) {
  var c = this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.ROW,
    this.parseNodes_(b),
    []
  );
  c.role = sre.SemanticAttr.Role.TABLE;
  return c;
};
sre.SemanticMathml.prototype.tableLabeledRow_ = function(a, b) {
  if (!b.length) return this.tableRow_(a, b);
  var c = this.parse(b[0]);
  c.role = sre.SemanticAttr.Role.LABEL;
  c = this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.ROW,
    this.parseNodes_(b.slice(1)),
    [c]
  );
  c.role = sre.SemanticAttr.Role.TABLE;
  return c;
};
sre.SemanticMathml.prototype.tableCell_ = function(a, b) {
  var c = this.parseNodes_(sre.SemanticUtil.purgeNodes(b)),
    c = c.length
      ? 1 === c.length && sre.SemanticPred.isAttribute("type", "EMPTY")(c[0])
        ? c
        : [sre.SemanticProcessor.getInstance().row(c)]
      : [],
    c = this.getFactory().makeBranchNode(sre.SemanticAttr.Type.CELL, c, []);
  c.role = sre.SemanticAttr.Role.TABLE;
  return c;
};
sre.SemanticMathml.prototype.text_ = function(a, b) {
  return sre.SemanticProcessor.getInstance().text(
    a.textContent,
    sre.SemanticProcessor.getInstance().font(a.getAttribute("mathvariant")),
    sre.DomUtil.tagName(a)
  );
};
sre.SemanticMathml.prototype.identifier_ = function(a, b) {
  return sre.SemanticProcessor.getInstance().identifierNode(
    a.textContent,
    sre.SemanticProcessor.getInstance().font(a.getAttribute("mathvariant")),
    a.getAttribute("class")
  );
};
sre.SemanticMathml.prototype.number_ = function(a, b) {
  var c = this.leaf_(a);
  sre.SemanticProcessor.number(c);
  return c;
};
sre.SemanticMathml.prototype.operator_ = function(a, b) {
  var c = this.leaf_(a);
  c.type === sre.SemanticAttr.Type.UNKNOWN &&
    (c.type = sre.SemanticAttr.Type.OPERATOR);
  return c;
};
sre.SemanticMathml.prototype.fenced_ = function(a, b) {
  var c = this.parseNodes_(sre.SemanticUtil.purgeNodes(b)),
    d = sre.SemanticMathml.getAttribute_(a, "separators", ","),
    e = sre.SemanticMathml.getAttribute_(a, "open", "("),
    f = sre.SemanticMathml.getAttribute_(a, "close", ")"),
    c = sre.SemanticProcessor.getInstance().mfenced(e, f, d, c);
  return sre.SemanticProcessor.getInstance().tablesInRow([c])[0];
};
sre.SemanticMathml.prototype.enclosed_ = function(a, b) {
  var c = this.parseNodes_(sre.SemanticUtil.purgeNodes(b)),
    c = this.getFactory().makeBranchNode(
      sre.SemanticAttr.Type.ENCLOSE,
      [sre.SemanticProcessor.getInstance().row(c)],
      []
    );
  c.role = a.getAttribute("notation") || sre.SemanticAttr.Role.UNKNOWN;
  return c;
};
sre.SemanticMathml.prototype.multiscripts_ = function(a, b) {
  if (!b.length) return this.getFactory().makeEmptyNode();
  var c = this.parse(b.shift());
  if (!b.length) return c;
  for (
    var d = [], e = [], f = [], g = [], h = !1, k = 0, l = 0, m;
    (m = b[l]);
    l++
  )
    "MPRESCRIPTS" === sre.DomUtil.tagName(m)
      ? ((h = !0), (k = 0))
      : (h ? (k & 1 ? d.push(m) : e.push(m)) : k & 1 ? f.push(m) : g.push(m),
        k++);
  return sre.SemanticUtil.purgeNodes(d).length ||
    sre.SemanticUtil.purgeNodes(e).length
    ? sre.SemanticProcessor.getInstance().tensor(
        c,
        this.parseNodes_(e),
        this.parseNodes_(d),
        this.parseNodes_(g),
        this.parseNodes_(f)
      )
    : sre.SemanticProcessor.getInstance().pseudoTensor(
        c,
        this.parseNodes_(g),
        this.parseNodes_(f)
      );
};
sre.SemanticMathml.prototype.empty_ = function(a, b) {
  return this.getFactory().makeEmptyNode();
};
sre.SemanticMathml.prototype.action_ = function(a, b) {
  return 1 < b.length ? this.parse(b[1]) : this.getFactory().makeUnprocessed(a);
};
sre.SemanticMathml.prototype.dummy_ = function(a, b) {
  return this.getFactory().makeUnprocessed(a);
};
sre.SemanticMathml.prototype.leaf_ = function(a) {
  return this.getFactory().makeLeafNode(
    a.textContent,
    sre.SemanticProcessor.getInstance().font(a.getAttribute("mathvariant"))
  );
};
sre.SemanticMathml.getAttribute_ = function(a, b, c) {
  if (!a.hasAttribute(b)) return c;
  a = a.getAttribute(b);
  return a.match(/^\s*$/) ? null : a;
};
sre.SemanticTree = function(a) {
  this.mathml = a;
  this.parser = new sre.SemanticMathml();
  this.root = this.parser.parse(a);
};
sre.SemanticTree.empty = function() {
  var a = sre.DomUtil.parseInput("<math/>"),
    b = new sre.SemanticTree(a);
  b.mathml = a;
  return b;
};
sre.SemanticTree.fromNode = function(a, b) {
  var c = sre.SemanticTree.empty();
  c.root = a;
  b && (c.mathml = b);
  return c;
};
sre.SemanticTree.fromRoot = function(a, b) {
  for (var c = a; c.parent; ) c = c.parent;
  c = sre.SemanticTree.fromNode(c);
  b && (c.mathml = b);
  return c;
};
sre.SemanticTree.prototype.xml = function(a) {
  var b = sre.DomUtil.parseInput("<stree></stree>");
  a = this.root.xml(b.ownerDocument, a);
  b.appendChild(a);
  return b;
};
sre.SemanticTree.prototype.toString = function(a) {
  return new sre.SystemExternal.xmldom.XMLSerializer().serializeToString(
    this.xml(a)
  );
};
sre.SemanticTree.prototype.formatXml = function(a) {
  a = this.toString(a);
  return sre.DomUtil.formatXml(a);
};
sre.SemanticTree.prototype.displayTree = function() {
  this.root.displayTree(0);
};
sre.SemanticTree.prototype.replaceNode = function(a, b) {
  var c = a.parent;
  c ? c.replaceChild(a, b) : (this.root = b);
};
sre.Semantic = {};
sre.Semantic.Font = sre.SemanticAttr.Font;
sre.Semantic.Role = sre.SemanticAttr.Role;
sre.Semantic.Type = sre.SemanticAttr.Type;
sre.Semantic.xmlTree = function(a) {
  return sre.Semantic.getTree(a).xml();
};
sre.Semantic.getTree = function(a) {
  return new sre.SemanticTree(a);
};
sre.Semantic.getTreeFromString = function(a) {
  a = sre.DomUtil.parseInput(a);
  return sre.Semantic.getTree(a);
};
sre.SemanticSkeleton = function(a) {
  this.array = a = 0 === a ? a : a || [];
  this.levelsMap = this.parents = null;
};
sre.SemanticSkeleton.prototype.populate = function() {
  (this.parents && this.levelsMap) ||
    ((this.parents = {}),
    (this.levelsMap = {}),
    this.populate_(this.array, this.array, []));
};
sre.SemanticSkeleton.prototype.populate_ = function(a, b, c) {
  if (sre.SemanticSkeleton.simpleCollapseStructure(a))
    (this.levelsMap[a] = b), (this.parents[a] = a === c[0] ? c.slice(1) : c);
  else {
    b = sre.SemanticSkeleton.contentCollapseStructure(a) ? a.slice(1) : a;
    c = [b[0]].concat(c);
    for (var d = 0, e = b.length; d < e; d++) this.populate_(b[d], a, c);
  }
};
sre.SemanticSkeleton.prototype.toString = function() {
  return sre.SemanticSkeleton.makeSexp_(this.array);
};
sre.SemanticSkeleton.makeSexp_ = function(a) {
  return sre.SemanticSkeleton.simpleCollapseStructure(a)
    ? a.toString()
    : sre.SemanticSkeleton.contentCollapseStructure(a)
    ? "(c " +
      a
        .slice(1)
        .map(sre.SemanticSkeleton.makeSexp_)
        .join(" ") +
      ")"
    : "(" + a.map(sre.SemanticSkeleton.makeSexp_).join(" ") + ")";
};
sre.SemanticSkeleton.fromTree = function(a) {
  return sre.SemanticSkeleton.fromNode(a.root);
};
sre.SemanticSkeleton.fromNode = function(a) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.fromNode_(a));
};
sre.SemanticSkeleton.fromString = function(a) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.fromString_(a));
};
sre.SemanticSkeleton.fromString_ = function(a) {
  a = a.replace(/\(/g, "[");
  a = a.replace(/\)/g, "]");
  a = a.replace(/ /g, ",");
  a = a.replace(/c/g, '"c"');
  return JSON.parse(a);
};
sre.SemanticSkeleton.fromNode_ = function(a) {
  if (!a) return [];
  var b = a.contentNodes;
  if (b.length) {
    var c = b.map(sre.SemanticSkeleton.fromNode_);
    c.unshift("c");
  }
  var d = a.childNodes;
  if (!d.length) return b.length ? [a.id, c] : a.id;
  d = d.map(sre.SemanticSkeleton.fromNode_);
  b.length && d.unshift(c);
  d.unshift(a.id);
  return d;
};
sre.SemanticSkeleton.simpleCollapseStructure = function(a) {
  return "number" === typeof a;
};
sre.SemanticSkeleton.contentCollapseStructure = function(a) {
  return (
    !!a && !sre.SemanticSkeleton.simpleCollapseStructure(a) && "c" === a[0]
  );
};
sre.SemanticSkeleton.interleaveIds = function(a, b) {
  return sre.BaseUtil.interleaveLists(
    sre.SemanticSkeleton.collapsedLeafs(a),
    sre.SemanticSkeleton.collapsedLeafs(b)
  );
};
sre.SemanticSkeleton.collapsedLeafs = function(a) {
  var b = function(a) {
    return sre.SemanticSkeleton.simpleCollapseStructure(a)
      ? [a]
      : sre.SemanticSkeleton.contentCollapseStructure(a[1])
      ? a.slice(2)
      : a.slice(1);
  };
  return Array.prototype.slice.call(arguments, 0).reduce(function(a, d) {
    return a.concat(b(d));
  }, []);
};
sre.EnrichMathml = {};
sre.EnrichMathml.Error = function(a) {
  Error.call(this);
  this.message = a || "";
  this.name = "MathML Enrichment Error";
};
goog.inherits(sre.EnrichMathml.Error, Error);
sre.EnrichMathml.SETTINGS = { collapsed: !0, implicit: !0 };
sre.EnrichMathml.ATTRIBUTE_PREFIX_ = "data-semantic-";
sre.EnrichMathml.Attribute = {
  ADDED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "added",
  ALTERNATIVE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "alternative",
  CHILDREN: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "children",
  COLLAPSED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "collapsed",
  CONTENT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "content",
  EMBELLISHED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "embellished",
  FENCEPOINTER: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "fencepointer",
  FONT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "font",
  ID: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "id",
  OPERATOR: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "operator",
  PARENT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "parent",
  PREFIX: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "prefix",
  ROLE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "role",
  SPEECH: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "speech",
  TYPE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "type"
};
sre.EnrichMathml.enrich = function(a, b) {
  var c = a.cloneNode(!0);
  sre.EnrichMathml.walkTree(b.root);
  sre.Debugger.getInstance().generateOutput(function() {
    sre.EnrichMathml.formattedOutput(c, a, b, !0);
    return [];
  });
  return a;
};
sre.EnrichMathml.walkTree = function(a) {
  var b = sre.EnrichCaseFactory.getCase(a);
  if (b) return (b = b.getMathml()), sre.EnrichMathml.ascendNewNode(b);
  if (1 === a.mathml.length)
    return (
      sre.Debugger.getInstance().output("Walktree Case 0"),
      (b = a.mathml[0]),
      sre.EnrichMathml.setAttributes(b, a),
      sre.EnrichMathml.ascendNewNode(b)
    );
  var b = a.contentNodes.map(sre.EnrichMathml.cloneContentNode),
    c = a.childNodes.map(sre.EnrichMathml.walkTree),
    c = sre.EnrichMathml.combineContentChildren_(a, b, c),
    b = a.mathmlTree;
  if (null === b)
    sre.Debugger.getInstance().output("Walktree Case 1"),
      (b = sre.EnrichMathml.introduceNewLayer(c));
  else {
    var d = sre.EnrichMathml.attachedElement_(c);
    sre.Debugger.getInstance().output("Walktree Case 2");
    d
      ? (sre.Debugger.getInstance().output("Walktree Case 2.1"),
        (b = d.parentNode))
      : (sre.Debugger.getInstance().output("Walktree Case 2.2"),
        (b = sre.EnrichMathml.getInnerNode(b)));
  }
  b = sre.EnrichMathml.rewriteMfenced(b);
  sre.EnrichMathml.mergeChildren_(b, c);
  sre.EnrichMathml.setAttributes(b, a);
  return sre.EnrichMathml.ascendNewNode(b);
};
sre.EnrichMathml.introduceNewLayer = function(a) {
  var b = sre.EnrichMathml.mathmlLca_(a),
    c = b.node;
  (b.valid && sre.SemanticUtil.hasEmptyTag(c)) ||
    (sre.Debugger.getInstance().output("Walktree Case 1.1"),
    (c = sre.DomUtil.createElement("mrow")),
    a[0] &&
      (sre.Debugger.getInstance().output("Walktree Case 1.1.1"),
      (b = sre.EnrichMathml.attachedElement_(a)),
      (a = sre.EnrichMathml.childrenSubset_(b.parentNode, a)),
      sre.DomUtil.replaceNode(b, c),
      a.forEach(function(a) {
        c.appendChild(a);
      })));
  return c;
};
sre.EnrichMathml.childrenSubset_ = function(a, b) {
  var c = sre.DomUtil.toArray(a.childNodes),
    d = Infinity,
    e = -Infinity;
  b.forEach(function(a) {
    a = c.indexOf(a);
    -1 !== a && ((d = Math.min(d, a)), (e = Math.max(e, a)));
  });
  return c.slice(d, e + 1);
};
sre.EnrichMathml.mergeChildren_ = function(a, b) {
  var c = a.childNodes;
  if (c.length)
    for (var d = 0; b.length; )
      c[d] === b[0] || sre.EnrichMathml.functionApplication_(c[d], b[0])
        ? (b.shift(), d++)
        : c[d] && -1 === b.indexOf(c[d])
        ? d++
        : (a.insertBefore(b[0], c[d] || null), b.shift());
  else
    b.forEach(function(b) {
      a.appendChild(b);
    });
};
sre.EnrichMathml.functionApplication_ = function(a, b) {
  var c = sre.SemanticAttr.functionApplication();
  return a &&
    b &&
    a.textContent &&
    b.textContent &&
    a.textContent === c &&
    b.textContent === c &&
    "true" === b.getAttribute(sre.EnrichMathml.Attribute.ADDED)
    ? (sre.DomUtil.replaceNode(a, b), !0)
    : !1;
};
sre.EnrichMathml.mathmlLca_ = function(a) {
  var b = sre.EnrichMathml.attachedElement_(a);
  if (!b) return { valid: !1, node: null };
  a = sre.EnrichMathml.attachedElement_(a.slice().reverse());
  if (b === a) return { valid: !0, node: b };
  var c = sre.EnrichMathml.pathToRoot_(b),
    b = sre.EnrichMathml.pathToRoot_(a, function(a) {
      return -1 !== c.indexOf(a);
    });
  a = b[0];
  var d = c.indexOf(a);
  return -1 === d
    ? { valid: !1, node: null }
    : { valid: sre.EnrichMathml.validLca_(c[d + 1], b[1]), node: a };
};
sre.EnrichMathml.attachedElement_ = function(a) {
  for (var b = 0, c = null; !c && b < a.length; )
    a[b].parentNode && (c = a[b]), b++;
  return c;
};
sre.EnrichMathml.pathToRoot_ = function(a, b) {
  for (
    var c =
        b ||
        function(a) {
          return !1;
        },
      d = [a];
    !c(a) && !sre.SemanticUtil.hasMathTag(a) && a.parentNode;

  )
    (a = sre.EnrichMathml.parentNode_(a)), d.unshift(a);
  return d;
};
sre.EnrichMathml.validLca_ = function(a, b) {
  return !(!a || !b || a.previousSibling || b.nextSibling);
};
sre.EnrichMathml.ascendNewNode = function(a) {
  for (; !sre.SemanticUtil.hasMathTag(a) && sre.EnrichMathml.unitChild_(a); )
    a = sre.EnrichMathml.parentNode_(a);
  return a;
};
sre.EnrichMathml.unitChild_ = function(a) {
  var b = sre.EnrichMathml.parentNode_(a);
  return b && sre.SemanticUtil.hasEmptyTag(b)
    ? sre.DomUtil.toArray(b.childNodes).every(function(b) {
        return b === a || sre.SemanticUtil.hasIgnoreTag(b);
      })
    : !1;
};
sre.EnrichMathml.parentNode_ = function(a) {
  return a.parentNode;
};
sre.EnrichMathml.addCollapsedAttribute = function(a, b) {
  var c = new sre.SemanticSkeleton(b);
  a.setAttribute(sre.EnrichMathml.Attribute.COLLAPSED, c.toString());
};
sre.EnrichMathml.cloneContentNode = function(a) {
  if (a.mathml.length) return sre.EnrichMathml.walkTree(a);
  var b = sre.EnrichMathml.SETTINGS.implicit
    ? sre.EnrichMathml.createInvisibleOperator_(a)
    : sre.DomUtil.createElement("mrow");
  a.mathml = [b];
  return b;
};
sre.EnrichMathml.makeIdList = function(a) {
  return a
    .map(function(a) {
      return a.id;
    })
    .join(",");
};
sre.EnrichMathml.setAttributes = function(a, b) {
  a.setAttribute(sre.EnrichMathml.Attribute.TYPE, b.type);
  a.setAttribute(sre.EnrichMathml.Attribute.ROLE, b.role);
  b.font != sre.Semantic.Font.UNKNOWN &&
    a.setAttribute(sre.EnrichMathml.Attribute.FONT, b.font);
  a.setAttribute(sre.EnrichMathml.Attribute.ID, b.id);
  b.childNodes.length &&
    a.setAttribute(
      sre.EnrichMathml.Attribute.CHILDREN,
      sre.EnrichMathml.makeIdList(b.childNodes)
    );
  b.contentNodes.length &&
    a.setAttribute(
      sre.EnrichMathml.Attribute.CONTENT,
      sre.EnrichMathml.makeIdList(b.contentNodes)
    );
  b.parent && a.setAttribute(sre.EnrichMathml.Attribute.PARENT, b.parent.id);
  b.embellished &&
    a.setAttribute(sre.EnrichMathml.Attribute.EMBELLISHED, b.embellished);
  b.fencePointer &&
    a.setAttribute(sre.EnrichMathml.Attribute.FENCEPOINTER, b.fencePointer);
};
sre.EnrichMathml.combineContentChildren_ = function(a, b, c) {
  sre.EnrichMathml.setOperatorAttribute_(a, b);
  switch (a.type) {
    case sre.Semantic.Type.RELSEQ:
    case sre.Semantic.Type.INFIXOP:
    case sre.Semantic.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(c, b);
    case sre.Semantic.Type.PREFIXOP:
      return b.concat(c);
    case sre.Semantic.Type.POSTFIXOP:
      return c.concat(b);
    case sre.Semantic.Type.FENCED:
      return c.unshift(b[0]), c.push(b[1]), c;
    case sre.Semantic.Type.PUNCTUATED:
      if (a.role === sre.Semantic.Role.TEXT)
        return sre.BaseUtil.interleaveLists(c, b);
      for (var d = [], e = 0, f = 0, g, h; (g = c[e]), (h = b[f]); e++)
        g.getAttribute(sre.EnrichMathml.Attribute.ID) ==
          h.getAttribute(sre.EnrichMathml.Attribute.ID) && (f++, d.push(g));
      sre.EnrichMathml.setOperatorAttribute_(a, d);
      return c;
    case sre.Semantic.Type.APPL:
      return [c[0], b[0], c[1]];
    case sre.Semantic.Type.ROOT:
      return [c[1], c[0]];
    case sre.Semantic.Type.ROW:
    case sre.Semantic.Type.LINE:
      return b.length && c.unshift(b[0]), c;
    default:
      return c;
  }
};
sre.EnrichMathml.rewriteMfenced = function(a) {
  if ("MFENCED" !== sre.DomUtil.tagName(a)) return a;
  for (
    var b = sre.DomUtil.createElement("mrow"), c = 0, d;
    (d = a.attributes[c]);
    c++
  )
    -1 === ["open", "close", "separators"].indexOf(d.name) &&
      b.setAttribute(d.name, d.value);
  sre.DomUtil.toArray(a.childNodes).forEach(function(a) {
    b.appendChild(a);
  });
  sre.DomUtil.replaceNode(a, b);
  return b;
};
sre.EnrichMathml.createInvisibleOperator_ = function(a) {
  var b = sre.DomUtil.createElement("mo"),
    c = sre.DomUtil.createTextNode(a.textContent);
  b.appendChild(c);
  sre.EnrichMathml.setAttributes(b, a);
  b.setAttribute(sre.EnrichMathml.Attribute.ADDED, "true");
  return b;
};
sre.EnrichMathml.setOperatorAttribute_ = function(a, b) {
  var c = a.type + (a.textContent ? "," + a.textContent : "");
  b.forEach(function(a) {
    sre.EnrichMathml.getInnerNode(a).setAttribute(
      sre.EnrichMathml.Attribute.OPERATOR,
      c
    );
  });
};
sre.EnrichMathml.getInnerNode = function(a) {
  var b = sre.DomUtil.toArray(a.childNodes);
  if (!b) return a;
  for (
    var b = b.filter(function(a) {
        return (
          a.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE &&
          !sre.SemanticUtil.hasIgnoreTag(a)
        );
      }),
      c = [],
      d = 0,
      e;
    (e = b[d]);
    d++
  )
    if (sre.SemanticUtil.hasEmptyTag(e)) {
      var f = sre.EnrichMathml.getInnerNode(e);
      f && f !== e && c.push(f);
    } else c.push(e);
  return 1 === c.length ? c[0] : a;
};
sre.EnrichMathml.formattedOutput = function(a, b, c, d) {
  d = d || !1;
  sre.EnrichMathml.formattedOutput_(a, "Original MathML", d);
  sre.EnrichMathml.formattedOutput_(c, "Semantic Tree", d);
  sre.EnrichMathml.formattedOutput_(b, "Semantically enriched MathML", d);
};
sre.EnrichMathml.formattedOutput_ = function(a, b, c) {
  a = sre.DomUtil.formatXml(a.toString());
  c
    ? console.log(
        b +
          ":\n```html\n" +
          sre.EnrichMathml.removeAttributePrefix(a) +
          "\n```\n"
      )
    : console.log(a);
};
sre.EnrichMathml.removeAttributePrefix = function(a) {
  return a
    .toString()
    .replace(new RegExp(sre.EnrichMathml.ATTRIBUTE_PREFIX_, "g"), "");
};
sre.EnrichMathml.printNodeList__ = function(a, b) {
  console.log(a);
  sre.DomUtil.toArray(b).forEach(function(a) {
    console.log(a.toString());
  });
  console.log("<<<<<<<<<<<<<<<<<");
};
sre.CaseBinomial = function(a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseBinomial, sre.AbstractEnrichCase);
sre.CaseBinomial.test = function(a) {
  return (
    !a.mathmlTree &&
    a.type === sre.SemanticAttr.Type.LINE &&
    a.role === sre.SemanticAttr.Role.BINOMIAL
  );
};
sre.CaseBinomial.prototype.getMathml = function() {
  if (!this.semantic.childNodes.length) return this.mml;
  this.mml = sre.EnrichMathml.walkTree(this.semantic.childNodes[0]);
  if (this.mml.hasAttribute(sre.EnrichMathml.Attribute.TYPE)) {
    var a = sre.DomUtil.createElement("mrow");
    a.setAttribute(sre.EnrichMathml.Attribute.ADDED, "true");
    sre.DomUtil.replaceNode(this.mml, a);
    a.appendChild(this.mml);
    this.mml = a;
  }
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
sre.CaseDoubleScript = function(a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseDoubleScript, sre.AbstractEnrichCase);
sre.CaseDoubleScript.test = function(a) {
  if (!a.mathmlTree || !a.childNodes.length) return !1;
  var b = sre.DomUtil.tagName(a.mathmlTree);
  a = a.childNodes[0].role;
  return (
    ("MSUBSUP" === b && a === sre.SemanticAttr.Role.SUBSUP) ||
    ("MUNDEROVER" === b && a === sre.SemanticAttr.Role.UNDEROVER)
  );
};
sre.CaseDoubleScript.prototype.getMathml = function() {
  var a = this.semantic.childNodes[0],
    b = a.childNodes[0],
    c = this.semantic.childNodes[1],
    d = a.childNodes[1],
    e = sre.EnrichMathml.walkTree(c),
    f = sre.EnrichMathml.walkTree(b),
    g = sre.EnrichMathml.walkTree(d);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  this.mml.setAttribute(
    sre.EnrichMathml.Attribute.CHILDREN,
    sre.EnrichMathml.makeIdList([b, d, c])
  );
  [f, g, e].forEach(
    goog.bind(function(a) {
      sre.EnrichMathml.getInnerNode(a).setAttribute(
        sre.EnrichMathml.Attribute.PARENT,
        this.mml.getAttribute(sre.EnrichMathml.Attribute.ID)
      );
    }, this)
  );
  this.mml.setAttribute(sre.EnrichMathml.Attribute.TYPE, a.role);
  sre.EnrichMathml.addCollapsedAttribute(this.mml, [
    this.semantic.id,
    [a.id, b.id, d.id],
    c.id
  ]);
  return this.mml;
};
sre.CaseMultiindex = function(a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseMultiindex, sre.AbstractEnrichCase);
sre.CaseMultiindex.prototype.completeMultiscript = function(a, b) {
  var c = sre.DomUtil.toArray(this.mml.childNodes).slice(1),
    d = 0,
    e = goog.bind(function(a) {
      for (var b = 0, e; (e = a[b]); b++) {
        var f = c[d];
        if (
          f &&
          e ==
            sre.EnrichMathml.getInnerNode(f).getAttribute(
              sre.EnrichMathml.Attribute.ID
            )
        )
          sre.EnrichMathml.getInnerNode(f).setAttribute(
            sre.EnrichMathml.Attribute.PARENT,
            this.semantic.id
          ),
            d++;
        else {
          var l = this.semantic.querySelectorAll(function(a) {
            return a.id === e;
          });
          this.mml.insertBefore(
            sre.CaseMultiindex.createNone_(l[0]),
            f || null
          );
        }
      }
    }, this);
  e(a);
  c[d] && "MPRESCRIPTS" !== sre.DomUtil.tagName(c[d])
    ? this.mml.insertBefore(c[d], sre.DomUtil.createElement("mprescripts"))
    : d++;
  e(b);
};
sre.CaseMultiindex.createNone_ = function(a) {
  var b = sre.DomUtil.createElement("none");
  a && sre.EnrichMathml.setAttributes(b, a);
  b.setAttribute(sre.EnrichMathml.Attribute.ADDED, "true");
  return b;
};
sre.CaseMultiindex.multiscriptIndex = function(a) {
  if (
    a.type === sre.SemanticAttr.Type.PUNCTUATED &&
    a.contentNodes[0].role === sre.SemanticAttr.Role.DUMMY
  ) {
    var b = a.parent.id,
      c = a.contentNodes.map(function(a) {
        return a.id;
      });
    c.unshift("c");
    for (var c = [a.id, c], d = 0, e; (e = a.childNodes[d]); d++) {
      var f = sre.EnrichMathml.walkTree(e);
      sre.EnrichMathml.getInnerNode(f).setAttribute(
        sre.EnrichMathml.Attribute.PARENT,
        b
      );
      c.push(e.id);
    }
    return c;
  }
  sre.EnrichMathml.walkTree(a);
  return a.id;
};
sre.CaseMultiscripts = function(a) {
  sre.CaseMultiindex.call(this, a);
};
goog.inherits(sre.CaseMultiscripts, sre.CaseMultiindex);
sre.CaseMultiscripts.test = function(a) {
  return a.mathmlTree
    ? "MMULTISCRIPTS" === sre.DomUtil.tagName(a.mathmlTree) &&
        (a.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
          a.type === sre.SemanticAttr.Type.SUBSCRIPT)
    : !1;
};
sre.CaseMultiscripts.prototype.getMathml = function() {
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  if (
    this.semantic.childNodes[0] &&
    this.semantic.childNodes[0].role === sre.SemanticAttr.Role.SUBSUP
  ) {
    var a = this.semantic.childNodes[0],
      b = a.childNodes[0],
      c = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]),
      d = sre.CaseMultiindex.multiscriptIndex(a.childNodes[1]),
      e = [this.semantic.id, [a.id, b.id, d], c];
    sre.EnrichMathml.addCollapsedAttribute(this.mml, e);
    this.mml.setAttribute(sre.EnrichMathml.Attribute.TYPE, a.role);
    this.completeMultiscript(sre.SemanticSkeleton.interleaveIds(d, c), []);
  } else
    (b = this.semantic.childNodes[0]),
      (c = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1])),
      (e = [this.semantic.id, b.id, c]),
      sre.EnrichMathml.addCollapsedAttribute(this.mml, e);
  a = sre.SemanticSkeleton.collapsedLeafs(d || [], c);
  c = sre.EnrichMathml.walkTree(b);
  sre.EnrichMathml.getInnerNode(c).setAttribute(
    sre.EnrichMathml.Attribute.PARENT,
    this.semantic.id
  );
  a.unshift(b.id);
  this.mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN, a.join(","));
  return this.mml;
};
sre.CaseEmbellished = function(a) {
  sre.AbstractEnrichCase.call(this, a);
  this.ofenceMml = this.ofence = this.fencedMml = this.fenced = null;
  this.ofenceMap = {};
  this.cfenceMml = this.cfence = null;
  this.cfenceMap = {};
  this.parentCleanup = [];
};
goog.inherits(sre.CaseEmbellished, sre.AbstractEnrichCase);
sre.CaseEmbellished.test = function(a) {
  return a.mathmlTree && a.fencePointer;
};
sre.CaseEmbellished.prototype.getMathml = function() {
  this.getFenced_();
  this.fencedMml = sre.EnrichMathml.walkTree(this.fenced);
  this.getFencesMml_();
  return this.rewrite_();
};
sre.CaseEmbellished.prototype.getFenced_ = function() {
  for (var a = this.semantic; a.type !== sre.SemanticAttr.Type.FENCED; )
    a = a.childNodes[0];
  this.fenced = a.childNodes[0];
  this.ofence = a.contentNodes[0];
  this.cfence = a.contentNodes[1];
  sre.CaseEmbellished.fencedMap_(this.ofence, this.ofenceMap);
  sre.CaseEmbellished.fencedMap_(this.cfence, this.cfenceMap);
};
sre.CaseEmbellished.fencedMap_ = function(a, b) {
  b[a.id] = a.mathmlTree;
  a.embellished && sre.CaseEmbellished.fencedMap_(a.childNodes[0], b);
};
sre.CaseEmbellished.prototype.getFencesMml_ = function() {
  for (
    var a = this.semantic,
      b = Object.keys(this.ofenceMap),
      c = Object.keys(this.cfenceMap);
    !((this.ofenceMml && this.cfenceMml) || a === this.fenced);

  )
    -1 === b.indexOf(a.fencePointer) ||
      this.ofenceMml ||
      (this.ofenceMml = a.mathmlTree),
      -1 === c.indexOf(a.fencePointer) ||
        this.cfenceMml ||
        (this.cfenceMml = a.mathmlTree),
      (a = a.childNodes[0]);
  this.ofenceMml || (this.ofenceMml = this.ofence.mathmlTree);
  this.cfenceMml || (this.cfenceMml = this.cfence.mathmlTree);
  this.ofenceMml &&
    (this.ofenceMml = sre.EnrichMathml.ascendNewNode(this.ofenceMml));
  this.cfenceMml &&
    (this.cfenceMml = sre.EnrichMathml.ascendNewNode(this.cfenceMml));
};
sre.CaseEmbellished.prototype.rewrite_ = function() {
  var a = this.semantic,
    b = null,
    c = this.introduceNewLayer_();
  for (
    sre.EnrichMathml.setAttributes(c, this.fenced.parent);
    a.type !== sre.SemanticAttr.Type.FENCED;

  ) {
    var d = a.mathmlTree,
      e = this.specialCase_(a, d);
    if (e) a = e;
    else {
      sre.EnrichMathml.setAttributes(d, a);
      for (var e = [], f = 1, g; (g = a.childNodes[f]); f++)
        e.push(sre.EnrichMathml.walkTree(g));
      a = a.childNodes[0];
    }
    e = sre.DomUtil.createElement("dummy");
    f = c.parentNode;
    g = d.childNodes[0];
    sre.DomUtil.replaceNode(d, e);
    sre.DomUtil.replaceNode(c, d);
    sre.DomUtil.replaceNode(d.childNodes[0], c);
    sre.DomUtil.replaceNode(e, g);
    d.parentNode = f;
    c = d.childNodes[0];
    b || (b = d);
  }
  sre.EnrichMathml.walkTree(this.ofence);
  sre.EnrichMathml.walkTree(this.cfence);
  this.cleanupParents_();
  return b || c;
};
sre.CaseEmbellished.prototype.specialCase_ = function(a, b) {
  var c = sre.DomUtil.tagName(b),
    d = null,
    e;
  "MSUBSUP" === c
    ? ((d = a.childNodes[0]), (e = sre.CaseDoubleScript))
    : "MMULTISCRIPTS" === c &&
      (a.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
      a.type === sre.SemanticAttr.Type.SUBSCRIPT
        ? (e = sre.CaseMultiscripts)
        : a.type === sre.SemanticAttr.Type.TENSOR && (e = sre.CaseTensor),
      (d =
        e &&
        a.childNodes[0] &&
        a.childNodes[0].role === sre.SemanticAttr.Role.SUBSUP
          ? a.childNodes[0]
          : a));
  if (!d) return null;
  var c = d.childNodes[0],
    f = sre.CaseEmbellished.makeEmptyNode_(c.id);
  d.childNodes[0] = f;
  b = new e(a).getMathml();
  d.childNodes[0] = c;
  this.parentCleanup.push(b);
  return d.childNodes[0];
};
sre.CaseEmbellished.makeEmptyNode_ = function(a) {
  var b = sre.DomUtil.createElement("mrow");
  a = new sre.SemanticNode(a);
  a.type = sre.SemanticAttr.Type.EMPTY;
  a.mathmlTree = b;
  return a;
};
sre.CaseEmbellished.prototype.introduceNewLayer_ = function() {
  var a = this.fullFence(this.ofenceMml),
    b = this.fullFence(this.cfenceMml),
    c = sre.DomUtil.createElement("mrow");
  sre.DomUtil.replaceNode(this.fencedMml, c);
  c.appendChild(this.fencedMml);
  c.insertBefore(a, this.fencedMml);
  c.appendChild(b);
  if (!c.parentNode) {
    for (a = sre.DomUtil.createElement("mrow"); 0 < c.childNodes.length; )
      a.appendChild(c.childNodes[0]);
    c.appendChild(a);
    c = a;
  }
  return c;
};
sre.CaseEmbellished.prototype.fullFence = function(a) {
  for (var b = this.fencedMml.parentNode; a.parentNode && a.parentNode !== b; )
    a = a.parentNode;
  return a;
};
sre.CaseEmbellished.prototype.cleanupParents_ = function() {
  this.parentCleanup.forEach(function(a) {
    var b = a.childNodes[1].getAttribute(sre.EnrichMathml.Attribute.PARENT);
    a.childNodes[0].setAttribute(sre.EnrichMathml.Attribute.PARENT, b);
  });
};
sre.CaseLine = function(a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseLine, sre.AbstractEnrichCase);
sre.CaseLine.test = function(a) {
  return a.mathmlTree && a.type === sre.SemanticAttr.Type.LINE;
};
sre.CaseLine.prototype.getMathml = function() {
  this.semantic.contentNodes.length &&
    sre.EnrichMathml.walkTree(this.semantic.contentNodes[0]);
  this.semantic.childNodes.length &&
    sre.EnrichMathml.walkTree(this.semantic.childNodes[0]);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
sre.CaseTable = function(a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
  this.inner = [];
};
goog.inherits(sre.CaseTable, sre.AbstractEnrichCase);
sre.CaseTable.test = function(a) {
  return (
    a.mathmlTree &&
    (a.type === sre.SemanticAttr.Type.MATRIX ||
      a.type === sre.SemanticAttr.Type.VECTOR ||
      a.type === sre.SemanticAttr.Type.CASES)
  );
};
sre.CaseTable.prototype.getMathml = function() {
  var a = sre.EnrichMathml.cloneContentNode(this.semantic.contentNodes[0]),
    b = this.semantic.contentNodes[1]
      ? sre.EnrichMathml.cloneContentNode(this.semantic.contentNodes[1])
      : null;
  this.inner = this.semantic.childNodes.map(sre.EnrichMathml.walkTree);
  "MFENCED" === sre.DomUtil.tagName(this.mml)
    ? (this.mml.insertBefore(a, this.mml.childNodes[0] || null),
      b && this.mml.appendChild(b),
      (this.mml = sre.EnrichMathml.rewriteMfenced(this.mml)))
    : ((a = [a, this.mml]),
      b && a.push(b),
      (this.mml = sre.EnrichMathml.introduceNewLayer(a)));
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
sre.CaseTensor = function(a) {
  sre.CaseMultiindex.call(this, a);
};
goog.inherits(sre.CaseTensor, sre.CaseMultiindex);
sre.CaseTensor.test = function(a) {
  return a.mathmlTree && a.type === sre.SemanticAttr.Type.TENSOR;
};
sre.CaseTensor.prototype.getMathml = function() {
  sre.EnrichMathml.walkTree(this.semantic.childNodes[0]);
  var a = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]),
    b = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[2]),
    c = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[3]),
    d = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[4]);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  sre.EnrichMathml.addCollapsedAttribute(this.mml, [
    this.semantic.id,
    this.semantic.childNodes[0].id,
    a,
    b,
    c,
    d
  ]);
  var e = sre.SemanticSkeleton.collapsedLeafs(a, b, c, d);
  e.unshift(this.semantic.childNodes[0].id);
  this.mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN, e.join(","));
  this.completeMultiscript(
    sre.SemanticSkeleton.interleaveIds(c, d),
    sre.SemanticSkeleton.interleaveIds(a, b)
  );
  return this.mml;
};
sre.EnrichCases = function() {};
sre.EnrichCaseFactory.cases.push(
  { test: sre.CaseEmbellished.test, constr: sre.CaseEmbellished },
  { test: sre.CaseDoubleScript.test, constr: sre.CaseDoubleScript },
  { test: sre.CaseTensor.test, constr: sre.CaseTensor },
  { test: sre.CaseMultiscripts.test, constr: sre.CaseMultiscripts },
  { test: sre.CaseLine.test, constr: sre.CaseLine },
  { test: sre.CaseBinomial.test, constr: sre.CaseBinomial },
  { test: sre.CaseTable.test, constr: sre.CaseTable }
);
sre.Enrich = {};
sre.Enrich.semanticMathmlNode = function(a) {
  a = a.cloneNode(!0);
  var b = sre.Semantic.getTree(a);
  return sre.EnrichMathml.enrich(a, b);
};
sre.Enrich.semanticMathmlSync = function(a) {
  a = sre.DomUtil.parseInput(a);
  return sre.Enrich.semanticMathmlNode(a);
};
sre.Enrich.semanticMathml = function(a, b) {
  if (sre.Engine.isReady()) {
    var c = sre.DomUtil.parseInput(a);
    b(sre.Enrich.semanticMathmlNode(c));
  } else
    setTimeout(function() {
      sre.Enrich.semanticMathml(a, b);
    }, 500);
};
sre.Enrich.testTranslation__ = function(a) {
  new sre.EnrichCases();
  sre.Debugger.getInstance().init();
  a = sre.Enrich.semanticMathmlSync(sre.Enrich.prepareMmlString(a)).toString();
  sre.EnrichMathml.removeAttributePrefix(a);
  sre.Debugger.getInstance().exit();
  return a;
};
sre.Enrich.prepareMmlString = function(a) {
  a.match(/^<math/) || (a = "<math>" + a);
  a.match(/\/math>$/) || (a += "</math>");
  return a;
};
sre.ColorPicker = function(a, b) {
  this.foreground = sre.ColorPicker.getChannelColor_(
    b,
    sre.ColorPicker.DEFAULT_FOREGROUND_
  );
  this.background = sre.ColorPicker.getChannelColor_(
    a,
    sre.ColorPicker.DEFAULT_BACKGROUND_
  );
};
sre.ColorPicker.DEFAULT_BACKGROUND_ = "blue";
sre.ColorPicker.DEFAULT_FOREGROUND_ = "black";
sre.ColorPicker.namedColors_ = {
  red: { red: 255, green: 0, blue: 0 },
  green: { red: 0, green: 255, blue: 0 },
  blue: { red: 0, green: 0, blue: 255 },
  yellow: { red: 255, green: 255, blue: 0 },
  cyan: { red: 0, green: 255, blue: 255 },
  magenta: { red: 255, green: 0, blue: 255 },
  white: { red: 255, green: 255, blue: 255 },
  black: { red: 0, green: 0, blue: 0 }
};
sre.ColorPicker.getChannelColor_ = function(a, b) {
  var c = a || { color: b },
    d = c.color ? sre.ColorPicker.namedColors_[c.color] : c;
  d || (d = sre.ColorPicker.namedColors_[b]);
  d.alpha = c.hasOwnProperty("alpha") ? c.alpha : 1;
  return sre.ColorPicker.normalizeColor_(d);
};
sre.ColorPicker.normalizeColor_ = function(a) {
  var b = function(a) {
    a = Math.max(a, 0);
    a = Math.min(255, a);
    return Math.round(a);
  };
  a.red = b(a.red);
  a.green = b(a.green);
  a.blue = b(a.blue);
  a.alpha = Math.max(a.alpha, 0);
  a.alpha = Math.min(1, a.alpha);
  return a;
};
sre.ColorPicker.prototype.rgba = function() {
  var a = function(a) {
    return "rgba(" + a.red + "," + a.green + "," + a.blue + "," + a.alpha + ")";
  };
  return { background: a(this.background), foreground: a(this.foreground) };
};
sre.ColorPicker.prototype.rgb = function() {
  var a = function(a) {
    return "rgb(" + a.red + "," + a.green + "," + a.blue + ")";
  };
  return {
    background: a(this.background),
    alphaback: this.background.alpha.toString(),
    foreground: a(this.foreground),
    alphafore: this.foreground.alpha.toString()
  };
};
sre.ColorPicker.prototype.hex = function() {
  var a = function(a) {
    return (
      "#" +
      sre.ColorPicker.toHex_(a.red) +
      sre.ColorPicker.toHex_(a.green) +
      sre.ColorPicker.toHex_(a.blue)
    );
  };
  return {
    background: a(this.background),
    alphaback: this.background.alpha.toString(),
    foreground: a(this.foreground),
    alphafore: this.foreground.alpha.toString()
  };
};
sre.ColorPicker.toHex_ = function(a) {
  a = a.toString(16);
  return 1 === a.length ? "0" + a : a;
};
sre.Highlighter = function() {};
sre.Highlighter.prototype.highlight = function(a) {};
sre.Highlighter.prototype.unhighlight = function() {};
sre.Highlighter.prototype.highlightAll = function(a) {};
sre.Highlighter.prototype.unhighlightAll = function() {};
sre.Highlighter.prototype.setColor = function(a) {};
sre.Highlighter.prototype.addEvents = function(a, b) {};
sre.AbstractHighlighter = function() {
  this.currentHighlights_ = [];
  this.color = null;
  this.mactionName = "";
  this.state_ = {};
};
sre.AbstractHighlighter.prototype.highlight = function(a) {
  this.currentHighlights_.push(
    a.map(
      goog.bind(function(a) {
        return this.highlightNode(a);
      }, this)
    )
  );
};
sre.AbstractHighlighter.prototype.highlightNode = goog.abstractMethod;
sre.AbstractHighlighter.prototype.highlightAll = function(a) {
  a = this.getMactionNodes(a);
  for (var b = 0, c; (c = a[b]); b++) this.highlight([c]);
};
sre.AbstractHighlighter.prototype.unhighlight = function() {
  var a = this.currentHighlights_.pop();
  a &&
    a.forEach(
      goog.bind(function(a) {
        return this.unhighlightNode(a);
      }, this)
    );
};
sre.AbstractHighlighter.prototype.unhighlightNode = goog.abstractMethod;
sre.AbstractHighlighter.prototype.unhighlightAll = function() {
  for (; 0 < this.currentHighlights_.length; ) this.unhighlight();
};
sre.AbstractHighlighter.prototype.setColor = function(a) {
  this.color = a;
};
sre.AbstractHighlighter.prototype.colorString = function() {
  return this.color.rgba();
};
sre.AbstractHighlighter.prototype.addEvents = function(a, b) {
  for (var c = this.getMactionNodes(a), d = 0, e; (e = c[d]); d++)
    for (var f in b) e.addEventListener(f, b[f]);
};
sre.AbstractHighlighter.prototype.getMactionNodes = function(a) {
  return a.getElementsByClassName(this.mactionName);
};
sre.AbstractHighlighter.prototype.isMactionNode = function(a) {
  return (a = a.className || a.getAttribute("class"))
    ? a.match(new RegExp(this.mactionName))
    : !1;
};
sre.AbstractHighlighter.prototype.resetState = function(a) {
  delete this.state_[a];
};
sre.AbstractHighlighter.prototype.setState = function(a, b) {
  this.state_[a] = b;
};
sre.AbstractHighlighter.prototype.getState = function(a) {
  return this.state_[a];
};
sre.CssHighlighter = function() {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "mjx-maction";
};
goog.inherits(sre.CssHighlighter, sre.AbstractHighlighter);
sre.CssHighlighter.prototype.highlightNode = function(a) {
  var b = {
      node: a,
      background: a.style.backgroundColor,
      foreground: a.style.color
    },
    c = this.colorString();
  a.style.backgroundColor = c.background;
  a.style.color = c.foreground;
  return b;
};
sre.CssHighlighter.prototype.unhighlightNode = function(a) {
  a.node.style.backgroundColor = a.background;
  a.node.style.color = a.foreground;
};
sre.HtmlHighlighter = function() {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "maction";
};
goog.inherits(sre.HtmlHighlighter, sre.AbstractHighlighter);
sre.HtmlHighlighter.prototype.setMode = function(a) {
  this.mode = a;
};
sre.HtmlHighlighter.prototype.highlightNode = function(a) {
  var b = { node: a, foreground: a.style.color, position: a.style.position },
    c = this.color.rgb();
  a.style.color = c.foreground;
  a.style.position = "relative";
  var d = a.bbox;
  if (d && d.w) {
    var e = document.createElement("span"),
      f = parseFloat(a.style.paddingLeft || "0");
    e.style.backgroundColor = c.background;
    e.style.opacity = c.alphaback.toString();
    e.style.display = "inline-block";
    e.style.height = d.h + d.d + 0.1 + "em";
    e.style.verticalAlign = -d.d + "em";
    e.style.marginTop = e.style.marginBottom = "-0.05em";
    e.style.width = d.w + 0 + "em";
    e.style.marginLeft = f - 0 + "em";
    e.style.marginRight = -d.w - 0 - f + "em";
    a.parentNode.insertBefore(e, a);
    b.box = e;
  }
  return b;
};
sre.HtmlHighlighter.prototype.unhighlightNode = function(a) {
  var b = a.node;
  b.style.color = a.foreground;
  b.style.position = a.position;
  a.box && a.box.parentNode.removeChild(a.box);
};
sre.MmlCssHighlighter = function() {
  sre.CssHighlighter.call(this);
  this.mactionName = "maction";
};
goog.inherits(sre.MmlCssHighlighter, sre.CssHighlighter);
sre.MmlCssHighlighter.prototype.getMactionNodes = function(a) {
  return a.getElementsByTagName(this.mactionName);
};
sre.MmlCssHighlighter.prototype.isMactionNode = function(a) {
  return a.tagName === this.mactionName;
};
sre.MmlHighlighter = function() {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "maction";
};
goog.inherits(sre.MmlHighlighter, sre.AbstractHighlighter);
sre.MmlHighlighter.prototype.highlightNode = function(a) {
  var b = a.getAttribute("style"),
    b = b + (";background-color: " + this.colorString().background),
    b = b + (";color: " + this.colorString().foreground);
  a.setAttribute("style", b);
  return { node: a };
};
sre.MmlHighlighter.prototype.unhighlightNode = function(a) {
  var b = a.node.getAttribute("style"),
    b = b.replace(";background-color: " + this.colorString().background, ""),
    b = b.replace(";color: " + this.colorString().foreground, "");
  a.node.setAttribute("style", b);
};
sre.MmlHighlighter.prototype.colorString = function() {
  return this.color.rgba();
};
sre.MmlHighlighter.prototype.getMactionNodes = function(a) {
  return a.getElementsByTagName(this.mactionName);
};
sre.MmlHighlighter.prototype.isMactionNode = function(a) {
  return a.tagName === this.mactionName;
};
sre.SvgHighlighter = function() {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "mjx-svg-maction";
};
goog.inherits(sre.SvgHighlighter, sre.AbstractHighlighter);
sre.SvgHighlighter.prototype.highlightNode = function(a) {
  if ("svg" === a.tagName) {
    var b = {
      node: a,
      background: a.style.backgroundColor,
      foreground: a.style.color
    };
    a.style.backgroundColor = this.colorString().background;
    a.style.color = this.colorString().foreground;
    return b;
  }
  var b = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
    c;
  if ("use" === a.nodeName) {
    var d = document.createElementNS("http://www.w3.org/2000/svg", "g");
    a.parentNode.insertBefore(d, a);
    d.appendChild(a);
    c = d.getBBox();
    d.parentNode.replaceChild(a, d);
  } else c = a.getBBox();
  b.setAttribute("x", c.x - 40);
  b.setAttribute("y", c.y - 40);
  b.setAttribute("width", c.width + 80);
  b.setAttribute("height", c.height + 80);
  (c = a.getAttribute("transform")) && b.setAttribute("transform", c);
  b.setAttribute("fill", this.colorString().background);
  a.parentNode.insertBefore(b, a);
  b = { node: b, foreground: a.getAttribute("fill") };
  a.setAttribute("fill", this.colorString().foreground);
  return b;
};
sre.SvgHighlighter.prototype.unhighlightNode = function(a) {
  "background" in a
    ? ((a.node.style.backgroundColor = a.background),
      (a.node.style.color = a.foreground))
    : (a.foreground
        ? a.node.nextSibling.setAttribute("fill", a.foreground)
        : a.node.nextSibling.removeAttribute("fill"),
      a.node.parentNode.removeChild(a.node));
};
sre.SvgHighlighter.prototype.isMactionNode = function(a) {
  a = a.className || a.getAttribute("class");
  return (a = a.baseVal ? a.baseVal : a)
    ? a.match(new RegExp(this.mactionName))
    : !1;
};
sre.HighlighterFactory = {};
sre.HighlighterFactory.highlighter = function(a, b, c) {
  a = new sre.ColorPicker(a, b);
  c =
    sre.HighlighterFactory.highlighterMapping_[
      "NativeMML" === c.renderer && "Safari" === c.browser
        ? "MML-CSS"
        : c.renderer
    ];
  if (!c) return null;
  c.setColor(a);
  return c;
};
sre.HighlighterFactory.addEvents = function(a, b, c) {
  (c = sre.HighlighterFactory.highlighterMapping_[c.renderer]) &&
    c.addEvents(a, b);
};
sre.HighlighterFactory.highlighterMapping_ = {
  SVG: new sre.SvgHighlighter(),
  NativeMML: new sre.MmlHighlighter(),
  "HTML-CSS": new sre.HtmlHighlighter(),
  "MML-CSS": new sre.MmlCssHighlighter(),
  CommonHTML: new sre.CssHighlighter()
};
sre.Grammar = function() {
  this.parameters_ = {};
  this.corrections_ = {};
  this.preprocessors_ = {};
  this.stateStack_ = [];
};
goog.addSingletonGetter(sre.Grammar);
sre.Grammar.ATTRIBUTE = "grammar";
sre.Grammar.prototype.clear = function() {
  this.parameters_ = {};
  this.stateStack_ = [];
};
sre.Grammar.prototype.setParameter_ = function(a, b) {
  var c = this.parameters_[a];
  b ? (this.parameters_[a] = b) : delete this.parameters_[a];
  return c;
};
sre.Grammar.prototype.getParameter = function(a) {
  return this.parameters_[a];
};
sre.Grammar.prototype.setCorrection = function(a, b) {
  this.corrections_[a] = b;
};
sre.Grammar.prototype.setPreprocessor = function(a, b) {
  this.preprocessors_[a] = b;
};
sre.Grammar.prototype.getCorrection = function(a) {
  return this.corrections_[a];
};
sre.Grammar.prototype.getState = function() {
  var a = [],
    b;
  for (b in this.parameters_) {
    var c = this.parameters_[b];
    a.push("string" === typeof c ? b + ":" + c : b);
  }
  return a.join(" ");
};
sre.Grammar.prototype.pushState = function(a) {
  for (var b in a) a[b] = this.setParameter_(b, a[b]);
  this.stateStack_.push(a);
};
sre.Grammar.prototype.popState = function() {
  var a = this.stateStack_.pop(),
    b;
  for (b in a) this.setParameter_(b, a[b]);
};
sre.Grammar.prototype.setAttribute = function(a) {
  if (a && a.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE) {
    var b = this.getState();
    b && a.setAttribute(sre.Grammar.ATTRIBUTE, b);
  }
};
sre.Grammar.prototype.preprocess = function(a) {
  return this.runProcessors_(a, this.preprocessors_);
};
sre.Grammar.prototype.correct = function(a) {
  return this.runProcessors_(a, this.corrections_);
};
sre.Grammar.prototype.runProcessors_ = function(a, b) {
  for (var c in this.parameters_) {
    var d = b[c];
    if (d) {
      var e = this.parameters_[c];
      a = !0 === e ? d(a) : d(a, e);
    }
  }
  return a;
};
sre.Grammar.translateString_ = function(a) {
  var b = sre.Engine.getInstance();
  return b.evaluator(a, b.dynamicCstr) || a;
};
sre.Grammar.prototype.apply = function(a, b) {
  var c = b || {};
  a = c.adjust || c.preprocess ? sre.Grammar.getInstance().preprocess(a) : a;
  if (this.parameters_.translate || c.translate)
    a = sre.Grammar.translateString_(a);
  return (a = c.adjust || c.correct ? sre.Grammar.getInstance().correct(a) : a);
};
sre.Grammar.parseState = function(a) {
  var b = {};
  a = a.split(" ");
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a[c].split(":"),
      f = e[1];
    b[e[0]] = f ? f : !0;
  }
  return b;
};
sre.Grammar.parseInput = function(a) {
  var b = {};
  a = a.split(":");
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a[c].split("="),
      f = e[0].trim();
    e[1]
      ? (b[f] = e[1].trim())
      : f.match(/^!/)
      ? (b[f.slice(1)] = !1)
      : (b[f] = !0);
  }
  return b;
};
sre.Grammar.correctFont_ = function(a, b) {
  if (!b || !a) return a;
  var c = b.split(/ |-/),
    c = new RegExp("^" + c.join("( |-)") + "( |-)");
  return a.replace(c, "");
};
sre.Grammar.addAnnotation_ = function(a, b) {
  return a + ":" + b;
};
sre.Grammar.getInstance().setCorrection("ignoreFont", sre.Grammar.correctFont_);
sre.Grammar.getInstance().setPreprocessor(
  "annotation",
  sre.Grammar.addAnnotation_
);
sre.SpeechRule = function(a, b, c, d) {
  this.name = a;
  this.dynamicCstr = b;
  this.precondition = c;
  this.action = d;
};
sre.SpeechRule.prototype.toString = function() {
  return (
    this.name +
    " | " +
    this.dynamicCstr.toString() +
    " | " +
    this.precondition.toString() +
    " ==> " +
    this.action.toString()
  );
};
sre.SpeechRule.Type = {
  NODE: "NODE",
  MULTI: "MULTI",
  TEXT: "TEXT",
  PERSONALITY: "PERSONALITY"
};
sre.SpeechRule.Type.fromString = function(a) {
  switch (a) {
    case "[n]":
      return sre.SpeechRule.Type.NODE;
    case "[m]":
      return sre.SpeechRule.Type.MULTI;
    case "[t]":
      return sre.SpeechRule.Type.TEXT;
    case "[p]":
      return sre.SpeechRule.Type.PERSONALITY;
    default:
      throw "Parse error: " + a;
  }
};
sre.SpeechRule.Type.toString = function(a) {
  switch (a) {
    case sre.SpeechRule.Type.NODE:
      return "[n]";
    case sre.SpeechRule.Type.MULTI:
      return "[m]";
    case sre.SpeechRule.Type.TEXT:
      return "[t]";
    case sre.SpeechRule.Type.PERSONALITY:
      return "[p]";
    default:
      throw "Unknown type error: " + a;
  }
};
sre.SpeechRule.Component = function(a) {
  this.type = a.type;
  this.content = a.content;
  this.attributes = a.attributes;
  this.grammar = a.grammar;
};
sre.SpeechRule.Component.fromString = function(a) {
  var b = {};
  b.type = sre.SpeechRule.Type.fromString(a.substring(0, 3));
  a = a.slice(3).trim();
  if (!a) throw new sre.SpeechRule.OutputError("Missing content.");
  switch (b.type) {
    case sre.SpeechRule.Type.TEXT:
      if ('"' == a[0]) {
        var c = sre.SpeechRule.splitString_(a, "\\(")[0].trim();
        if ('"' != c.slice(-1))
          throw new sre.SpeechRule.OutputError("Invalid string syntax.");
        b.content = c;
        a = a.slice(c.length).trim();
        -1 == a.indexOf("(") && (a = "");
        break;
      }
    case sre.SpeechRule.Type.NODE:
    case sre.SpeechRule.Type.MULTI:
      (c = a.indexOf(" (")),
        -1 == c
          ? ((b.content = a.trim()), (a = ""))
          : ((b.content = a.substring(0, c).trim()), (a = a.slice(c).trim()));
  }
  a &&
    ((a = sre.SpeechRule.Component.attributesFromString(a)),
    a.grammar && ((b.grammar = a.grammar), delete a.grammar),
    Object.keys(a).length && (b.attributes = a));
  return (b = new sre.SpeechRule.Component(b));
};
sre.SpeechRule.Component.prototype.toString = function() {
  var a;
  a = "" + sre.SpeechRule.Type.toString(this.type);
  a += this.content ? " " + this.content : "";
  var b = this.attributesToString();
  return a + (b ? " " + b : "");
};
sre.SpeechRule.Component.grammarFromString = function(a) {
  return sre.Grammar.parseInput(a);
};
sre.SpeechRule.Component.prototype.grammarToString = function() {
  return this.getGrammar().join(":");
};
sre.SpeechRule.Component.prototype.getGrammar = function() {
  var a = [],
    b;
  for (b in this.grammar)
    !0 === this.grammar[b]
      ? a.push(b)
      : !1 === this.grammar[b]
      ? a.push("!" + b)
      : a.push(b + "=" + this.grammar[b]);
  return a;
};
sre.SpeechRule.Component.attributesFromString = function(a) {
  if ("(" != a[0] || ")" != a.slice(-1))
    throw new sre.SpeechRule.OutputError("Invalid attribute expression: " + a);
  var b = {};
  a = sre.SpeechRule.splitString_(a.slice(1, -1), ",");
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a[c],
      f = e.indexOf(":");
    if (-1 == f) b[e.trim()] = "true";
    else {
      var g = e.substring(0, f).trim(),
        e = e.slice(f + 1).trim();
      b[g] =
        "grammar" === g
          ? sre.SpeechRule.Component.grammarFromString(e)
          : (b[g] = e);
    }
  }
  return b;
};
sre.SpeechRule.Component.prototype.attributesToString = function() {
  var a = this.getAttributes(),
    b = this.grammarToString();
  b && a.push("grammar:" + b);
  return 0 < a.length ? "(" + a.join(", ") + ")" : "";
};
sre.SpeechRule.Component.prototype.getAttributes = function() {
  var a = [],
    b;
  for (b in this.attributes) {
    var c = this.attributes[b];
    "true" === c ? a.push(b) : a.push(b + ":" + c);
  }
  return a;
};
sre.SpeechRule.Action = function(a) {
  this.components = a;
};
sre.SpeechRule.Action.fromString = function(a) {
  a = sre.SpeechRule.splitString_(a, ";")
    .filter(function(a) {
      return a.match(/\S/);
    })
    .map(function(a) {
      return a.trim();
    });
  for (var b = [], c = 0, d = a.length; c < d; c++) {
    var e = sre.SpeechRule.Component.fromString(a[c]);
    e && b.push(e);
  }
  return new sre.SpeechRule.Action(b);
};
sre.SpeechRule.Action.prototype.toString = function() {
  return this.components
    .map(function(a) {
      return a.toString();
    })
    .join("; ");
};
sre.SpeechRule.Precondition = function(a, b) {
  this.query = a;
  this.constraints = b || [];
};
sre.SpeechRule.Precondition.prototype.toString = function() {
  var a = this.constraints.join(", ");
  return this.query + ", " + a;
};
sre.SpeechRule.splitString_ = function(a, b) {
  for (var c = [], d = ""; "" != a; ) {
    var e = a.search(b);
    if (-1 == e) {
      if (0 != (a.match(/"/g) || []).length % 2)
        throw new sre.SpeechRule.OutputError(
          "Invalid string in expression: " + a
        );
      c.push(d + a);
      a = d = "";
    } else if (0 == (a.substring(0, e).match(/"/g) || []).length % 2)
      c.push(d + a.substring(0, e)), (d = ""), (a = a.substring(e + 1));
    else {
      var f = a.substring(e).search('"');
      if (-1 == f)
        throw new sre.SpeechRule.OutputError(
          "Invalid string in expression: " + a
        );
      d += a.substring(0, e + f + 1);
      a = a.substring(e + f + 1);
    }
  }
  d && c.push(d);
  return c;
};
sre.SpeechRule.OutputError = function(a) {
  Error.call(this);
  this.message = a || "";
  this.name = "RuleError";
};
goog.inherits(sre.SpeechRule.OutputError, Error);
sre.SpeechRuleEvaluator = goog.abstractMethod;
sre.SpeechRuleEvaluator.prototype.evaluateDefault = goog.abstractMethod;
sre.SpeechRuleFunctions = function() {};
sre.SpeechRuleFunctions.Store_ = function(a, b) {
  this.prefix_ = a;
  this.store_ = b;
};
sre.SpeechRuleFunctions.Store_.prototype.add = function(a, b) {
  this.checkCustomFunctionSyntax_(a) && (this.store_[a] = b);
};
sre.SpeechRuleFunctions.Store_.prototype.addStore = function(a) {
  for (var b = Object.keys(a.store_), c = 0, d; (d = b[c]); c++)
    this.add(d, a.store_[d]);
};
sre.SpeechRuleFunctions.Store_.prototype.lookup = function(a) {
  return this.store_[a];
};
sre.SpeechRuleFunctions.CustomQueries = function() {
  sre.SpeechRuleFunctions.Store_.call(this, "CQF", {});
};
goog.inherits(
  sre.SpeechRuleFunctions.CustomQueries,
  sre.SpeechRuleFunctions.Store_
);
sre.SpeechRuleFunctions.CustomStrings = function() {
  sre.SpeechRuleFunctions.Store_.call(this, "CSF", {});
};
goog.inherits(
  sre.SpeechRuleFunctions.CustomStrings,
  sre.SpeechRuleFunctions.Store_
);
sre.SpeechRuleFunctions.ContextFunctions = function() {
  sre.SpeechRuleFunctions.Store_.call(this, "CTXF", {});
};
goog.inherits(
  sre.SpeechRuleFunctions.ContextFunctions,
  sre.SpeechRuleFunctions.Store_
);
sre.SpeechRuleFunctions.Store_.prototype.checkCustomFunctionSyntax_ = function(
  a
) {
  return a.match(new RegExp("^" + this.prefix_))
    ? !0
    : (console.log(
        "FunctionError: Invalid function name. Expected prefix " + this.prefix_
      ),
      !1);
};
sre.SpeechRuleStore = goog.abstractMethod;
sre.SpeechRuleStore.prototype.addRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.deleteRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.findRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.findAllRules = goog.abstractMethod;
sre.SpeechRuleStore.prototype.lookupRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.defineRule = goog.abstractMethod;
sre.TrieNode = function() {};
sre.TrieNode.prototype.getConstraint = function() {};
sre.TrieNode.prototype.getKind = function() {};
sre.TrieNode.prototype.getTest = function() {};
sre.TrieNode.prototype.addChild = function(a) {};
sre.TrieNode.prototype.getChild = function(a) {};
sre.TrieNode.prototype.getChildren = function() {};
sre.TrieNode.prototype.findChildren = function(a) {};
sre.TrieNode.Kind = {
  ROOT: "root",
  DYNAMIC: "dynamic",
  QUERY: "query",
  BOOLEAN: "boolean",
  STATIC: "static"
};
sre.AbstractTrieNode = function(a, b) {
  this.constraint_ = a;
  this.test_ = b;
  this.children_ = {};
  this.kind = sre.TrieNode.Kind.ROOT;
};
sre.AbstractTrieNode.prototype.getConstraint = function() {
  return this.constraint_;
};
sre.AbstractTrieNode.prototype.getKind = function() {
  return this.kind;
};
sre.AbstractTrieNode.prototype.getTest = function() {
  return this.test_;
};
sre.AbstractTrieNode.prototype.addChild = function(a) {
  var b = a.getConstraint(),
    c = this.children_[b];
  this.children_[b] = a;
  return c;
};
sre.AbstractTrieNode.prototype.getChild = function(a) {
  return this.children_[a];
};
sre.AbstractTrieNode.prototype.getChildren = function() {
  var a = [],
    b;
  for (b in this.children_) a.push(this.children_[b]);
  return a;
};
sre.AbstractTrieNode.prototype.findChildren = function(a) {
  var b = [],
    c;
  for (c in this.children_) {
    var d = this.children_[c];
    d.getTest()(a) && b.push(d);
  }
  return b;
};
sre.AbstractTrieNode.prototype.toString = function() {
  return this.constraint_;
};
sre.StaticTrieNode = function(a, b) {
  sre.AbstractTrieNode.call(this, a, b);
  this.kind = sre.TrieNode.Kind.STATIC;
  this.rule_ = null;
};
goog.inherits(sre.StaticTrieNode, sre.AbstractTrieNode);
sre.StaticTrieNode.prototype.getRule = function() {
  return this.rule_;
};
sre.StaticTrieNode.prototype.setRule = function(a) {
  this.rule_ &&
    sre.Debugger.getInstance().output(
      "Replacing rule " + this.rule_ + " with " + a
    );
  this.rule_ = a;
};
sre.StaticTrieNode.prototype.toString = function() {
  return this.getRule()
    ? this.constraint_ + "\n==> " + this.getRule().action
    : this.constraint_;
};
sre.TrieNodeFactory = {};
sre.TrieNodeFactory.getNode = function(a, b, c) {
  switch (a) {
    case sre.TrieNode.Kind.ROOT:
      return new sre.RootTrieNode();
    case sre.TrieNode.Kind.DYNAMIC:
      return new sre.DynamicTrieNode(b);
    case sre.TrieNode.Kind.QUERY:
      return new sre.QueryTrieNode(b, c);
    case sre.TrieNode.Kind.BOOLEAN:
      return new sre.BooleanTrieNode(b, c);
    default:
      return null;
  }
};
sre.RootTrieNode = function() {
  sre.AbstractTrieNode.call(this, "", function() {
    return !0;
  });
  this.kind = sre.TrieNode.Kind.ROOT;
};
goog.inherits(sre.RootTrieNode, sre.AbstractTrieNode);
sre.DynamicTrieNode = function(a) {
  sre.AbstractTrieNode.call(this, a, function(b) {
    return b === a;
  });
  this.kind = sre.TrieNode.Kind.DYNAMIC;
};
goog.inherits(sre.DynamicTrieNode, sre.AbstractTrieNode);
sre.TrieNodeFactory.constraintTest_ = function(a) {
  if (a.match(/^self::\*$/))
    return function(a) {
      return !0;
    };
  if (a.match(/^self::\w+$/)) {
    var b = a.slice(6).toUpperCase();
    return function(a) {
      return a.tagName && sre.DomUtil.tagName(a) === b;
    };
  }
  if (a.match(/^self::\w+:\w+$/)) {
    a = a.split(":");
    var c = sre.XpathUtil.resolveNameSpace(a[2]);
    if (!c) return null;
    b = a[3].toUpperCase();
    return function(a) {
      return (
        a.localName && a.localName.toUpperCase() === b && a.namespaceURI === c
      );
    };
  }
  if (a.match(/^@\w+$/)) {
    var d = a.slice(1);
    return function(a) {
      return a.hasAttribute && a.hasAttribute(d);
    };
  }
  if (a.match(/^@\w+="[\w\d ]+"$/)) {
    a = a.split("=");
    var d = a[0].slice(1),
      e = a[1].slice(1, -1);
    return function(a) {
      return a.hasAttribute && a.hasAttribute(d) && a.getAttribute(d) === e;
    };
  }
  return a.match(/^@\w+!="[\w\d ]+"$/)
    ? ((a = a.split("!=")),
      (d = a[0].slice(1)),
      (e = a[1].slice(1, -1)),
      function(a) {
        return !a.hasAttribute || !a.hasAttribute(d) || a.getAttribute(d) !== e;
      })
    : a.match(/^contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)$/)
    ? ((a = a.split('"')),
      (e = a[1]),
      function(a) {
        return sre.Grammar.getInstance().getParameter(e);
      })
    : a.match(/^not\(\s*contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)\s*\)$/)
    ? ((a = a.split('"')),
      (e = a[1]),
      function(a) {
        return !sre.Grammar.getInstance().getParameter(e);
      })
    : null;
};
sre.QueryTrieNode = function(a, b) {
  var c =
    sre.TrieNodeFactory.constraintTest_(a) ||
    goog.bind(function(c) {
      return b.applyQuery(c, a) === c;
    }, b);
  sre.StaticTrieNode.call(this, a, c);
  this.kind = sre.TrieNode.Kind.QUERY;
};
goog.inherits(sre.QueryTrieNode, sre.StaticTrieNode);
sre.BooleanTrieNode = function(a, b) {
  var c =
    sre.TrieNodeFactory.constraintTest_(a) ||
    goog.bind(function(c) {
      return b.applyConstraint(c, a);
    }, b);
  sre.StaticTrieNode.call(this, a, c);
  this.kind = sre.TrieNode.Kind.BOOLEAN;
};
goog.inherits(sre.BooleanTrieNode, sre.StaticTrieNode);
sre.Trie = function(a) {
  this.store = a;
  this.root = sre.TrieNodeFactory.getNode(
    sre.TrieNode.Kind.ROOT,
    "",
    this.store
  );
};
sre.Trie.prototype.addRule = function(a) {
  for (
    var b = this.root, c = a.dynamicCstr.getValues(), d = 0, e = c.length;
    d < e;
    d++
  )
    b = this.addNode_(b, c[d], sre.TrieNode.Kind.DYNAMIC);
  b = this.addNode_(b, a.precondition.query, sre.TrieNode.Kind.QUERY);
  c = a.precondition.constraints;
  d = 0;
  for (e = c.length; d < e; d++)
    b = this.addNode_(b, c[d], sre.TrieNode.Kind.BOOLEAN);
  b.setRule(a);
};
sre.Trie.prototype.addNode_ = function(a, b, c) {
  var d = a.getChild(b);
  d || ((d = sre.TrieNodeFactory.getNode(c, b, this.store)), a.addChild(d));
  return d;
};
sre.Trie.prototype.lookupRules = function(a, b) {
  for (var c = [this.root], d = [], e = this.dynamicCstrSets_(b); e.length; ) {
    for (var f = e.shift(), g = []; c.length; ) {
      var h = c.shift(),
        h = h.getChildren();
      h.forEach(function(a) {
        (a.getKind() === sre.TrieNode.Kind.DYNAMIC &&
          -1 === f.indexOf(a.getConstraint())) ||
          g.push(a);
      });
    }
    c = g.slice();
  }
  for (; c.length; )
    (h = c.shift()),
      h.getRule && (e = h.getRule()) && d.push(e),
      (h = h.findChildren(a)),
      (c = c.concat(h));
  return d;
};
sre.Trie.prototype.dynamicCstrSets_ = function(a) {
  a = a.getValues();
  return sre.Engine.getInstance().strict
    ? a.map(function(a) {
        return [a];
      })
    : a.map(function(a) {
        return "default" === a ? [a] : [a, "default"];
      });
};
sre.Trie.prototype.toString = function() {
  return sre.Trie.printWithDepth_(this.root, 0, "");
};
sre.Trie.prototype.collectRules = function() {
  return sre.Trie.collectRules_(this.root);
};
sre.Trie.prototype.order = function() {
  return sre.Trie.order_(this.root);
};
sre.Trie.printWithDepth_ = function(a, b, c) {
  var d = Array(b + 2).join(b) + ": ";
  c += d + a.toString() + "\n";
  a = a.getChildren();
  for (var d = 0, e; (e = a[d]); d++) c = sre.Trie.printWithDepth_(e, b + 1, c);
  return c;
};
sre.Trie.order_ = function(a) {
  a = a.getChildren();
  if (!a.length) return 0;
  var b = Math.max.apply(null, a.map(sre.Trie.order_));
  return Math.max(a.length, b);
};
sre.Trie.collectRules_ = function(a) {
  var b = [];
  for (a = [a]; a.length; ) {
    var c = a.shift();
    if (
      c.getKind() === sre.TrieNode.Kind.QUERY ||
      c.getKind() === sre.TrieNode.Kind.BOOLEAN
    ) {
      var d = c.getRule();
      d && b.unshift(d);
    }
    a = a.concat(c.getChildren());
  }
  return b;
};
sre.BaseRuleStore = function() {
  this.customQueries = new sre.SpeechRuleFunctions.CustomQueries();
  this.customStrings = new sre.SpeechRuleFunctions.CustomStrings();
  this.contextFunctions = new sre.SpeechRuleFunctions.ContextFunctions();
  this.speechRules_ = [];
  this.trie = new sre.Trie(this);
  this.parseOrder = sre.DynamicCstr.DEFAULT_ORDER;
  this.parser = new sre.DynamicCstr.Parser(this.parseOrder);
};
sre.BaseRuleStore.prototype.lookupRule = function(a, b) {
  if (
    !a ||
    (a.nodeType != sre.DomUtil.NodeType.ELEMENT_NODE &&
      a.nodeType != sre.DomUtil.NodeType.TEXT_NODE)
  )
    return null;
  var c = this.trie.lookupRules(a, b);
  return 0 < c.length ? this.pickMostConstraint_(b, c) : null;
};
sre.BaseRuleStore.prototype.defineRule = function(a, b, c, d, e) {
  var f;
  try {
    var g = sre.SpeechRule.Action.fromString(c),
      h = Array.prototype.slice.call(arguments, 4),
      k = new sre.SpeechRule.Precondition(d, h),
      l = this.parser.parse(b);
    f = new sre.SpeechRule(a, l, k, g);
  } catch (m) {
    if ("RuleError" == m.name)
      return console.log("Rule Error ", d, "(" + b + "):", m.message), null;
    throw m;
  }
  this.addRule(f);
  return f;
};
sre.BaseRuleStore.prototype.addRule = function(a) {
  this.trie.addRule(a);
  this.speechRules_.unshift(a);
};
sre.BaseRuleStore.prototype.deleteRule = function(a) {
  a = this.speechRules_.indexOf(a);
  -1 != a && this.speechRules_.splice(a, 1);
};
sre.BaseRuleStore.prototype.findRule = function(a) {
  for (var b = 0, c; (c = this.speechRules_[b]); b++) if (a(c)) return c;
  return null;
};
sre.BaseRuleStore.prototype.findAllRules = function(a) {
  return this.speechRules_.filter(a);
};
sre.BaseRuleStore.prototype.evaluateDefault = function(a) {
  return [sre.AuditoryDescription.create({ text: a.textContent })];
};
sre.BaseRuleStore.prototype.debugSpeechRule = function(a, b) {
  var c = a.precondition,
    d = this.applyQuery(b, c.query);
  sre.Debugger.getInstance().output(c.query, d ? d.toString() : d);
  c.constraints.forEach(
    goog.bind(function(a) {
      sre.Debugger.getInstance().output(a, this.applyConstraint(b, a));
    }, this)
  );
};
sre.BaseRuleStore.prototype.initialize = goog.abstractMethod;
sre.BaseRuleStore.prototype.removeDuplicates = function(a) {
  for (var b = this.speechRules_.length - 1, c; (c = this.speechRules_[b]); b--)
    c != a &&
      a.dynamicCstr.equal(c.dynamicCstr) &&
      sre.BaseRuleStore.comparePreconditions_(c, a) &&
      this.speechRules_.splice(b, 1);
};
sre.BaseRuleStore.prototype.applyCustomQuery = function(a, b) {
  var c = this.customQueries.lookup(b);
  return c ? c(a) : null;
};
sre.BaseRuleStore.prototype.applySelector = function(a, b) {
  return this.applyCustomQuery(a, b) || sre.XpathUtil.evalXPath(b, a);
};
sre.BaseRuleStore.prototype.applyQuery = function(a, b) {
  var c = this.applySelector(a, b);
  return 0 < c.length ? c[0] : null;
};
sre.BaseRuleStore.prototype.applyConstraint = function(a, b) {
  return !!this.applyQuery(a, b) || sre.XpathUtil.evaluateBoolean(b, a);
};
sre.BaseRuleStore.prototype.pickMostConstraint_ = function(a, b) {
  var c = sre.Engine.getInstance().comparator;
  b.sort(function(a, b) {
    return (
      c.compare(a.dynamicCstr, b.dynamicCstr) ||
      b.precondition.constraints.length - a.precondition.constraints.length
    );
  });
  sre.Debugger.getInstance().generateOutput(
    goog.bind(function() {
      return b.map(function(a) {
        return a.name + "(" + a.dynamicCstr.toString() + ")";
      });
    }, this)
  );
  return b[0];
};
sre.BaseRuleStore.compareStaticConstraints_ = function(a, b) {
  if (a.length != b.length) return !1;
  for (var c = 0, d; (d = a[c]); c++) if (-1 == b.indexOf(d)) return !1;
  return !0;
};
sre.BaseRuleStore.comparePreconditions_ = function(a, b) {
  var c = a.precondition,
    d = b.precondition;
  return c.query != d.query
    ? !1
    : sre.BaseRuleStore.compareStaticConstraints_(c.constraints, d.constraints);
};
sre.BaseRuleStore.prototype.getSpeechRules = function() {
  return this.speechRules_;
};
sre.BaseRuleStore.prototype.setSpeechRules = function(a) {
  this.speechRules_ = a;
};
sre.MathStore = function() {
  sre.BaseRuleStore.call(this);
  this.initialized = !1;
  this.initializer = [];
};
goog.inherits(sre.MathStore, sre.BaseRuleStore);
sre.MathStore.prototype.initialize = function() {
  if (!this.initialized) {
    for (var a = 0, b; (b = this.initializer[a]); a++) b();
    this.setSpeechRules(this.trie.collectRules());
    this.initialized = !0;
  }
};
sre.MathStore.prototype.defineUniqueRuleAlias = function(a, b, c, d) {
  var e = this.parser.parse(b),
    f = this.findRule(
      goog.bind(function(b) {
        return b.name == a && e.equal(b.dynamicCstr);
      }, this)
    );
  if (!f)
    throw new sre.SpeechRule.OutputError(
      "Rule named " + a + " with style " + b + " does not exist."
    );
  this.addAlias_(f, c, Array.prototype.slice.call(arguments, 3));
};
sre.MathStore.prototype.defineRuleAlias = function(a, b, c) {
  var d = this.findRule(function(b) {
    return b.name == a;
  });
  if (!d)
    throw new sre.SpeechRule.OutputError(
      "Rule with named " + a + " does not exist."
    );
  this.addAlias_(d, b, Array.prototype.slice.call(arguments, 2));
};
sre.MathStore.prototype.defineRulesAlias = function(a, b, c) {
  var d = this.findAllRules(function(b) {
    return b.name == a;
  });
  if (0 == d.length)
    throw new sre.SpeechRule.OutputError(
      "Rule with name " + a + " does not exist."
    );
  var e = Array.prototype.slice.call(arguments, 2);
  d.forEach(
    goog.bind(function(a) {
      this.addAlias_(a, b, e);
    }, this)
  );
};
sre.MathStore.prototype.addAlias_ = function(a, b, c) {
  b = new sre.SpeechRule.Precondition(b, c);
  b = new sre.SpeechRule(a.name, a.dynamicCstr, b, a.action);
  b.name = a.name;
  this.addRule(b);
};
sre.MathStore.prototype.defineSpecialisedRule = function(a, b, c, d) {
  var e = this.parser.parse(b),
    f = this.findRule(
      goog.bind(function(b) {
        return b.name == a && e.equal(b.dynamicCstr);
      }, this)
    );
  if (!f)
    throw new sre.SpeechRule.OutputError(
      "Rule named " + a + " with style " + b + " does not exist."
    );
  b = this.parser.parse(c);
  d = d ? sre.SpeechRule.Action.fromString(d) : f.action;
  f = new sre.SpeechRule(f.name, b, f.precondition, d);
  this.addRule(f);
};
sre.MathStore.prototype.evaluateDefault = function(a) {
  return this.evaluateString_(a.textContent);
};
sre.MathStore.prototype.evaluateString_ = function(a) {
  var b = [];
  if (a.match(/^\s+$/)) return b;
  a = sre.BaseUtil.removeEmpty(a.replace(/\s/g, " ").split(" "));
  for (var c = 0, d; (d = a[c]); c++)
    if (1 == d.length) b.push(this.evaluate_(d));
    else if (d.match(/^[a-zA-Z]+$/)) b.push(this.evaluate_(d));
    else
      for (; d; ) {
        var e = d.match(/^((\d{1,3})(?=,)(,\d{3})*(\.\d+)?)|^\d*\.\d+|^\d+/),
          f = d.match(/^[a-zA-Z]+/);
        e
          ? (b.push(this.evaluate_(e[0])), (d = d.substring(e[0].length)))
          : f
          ? (b.push(this.evaluate_(f[0])), (d = d.substring(f[0].length)))
          : ((e = d[0].charCodeAt(0)),
            55296 <= e && 56319 >= e && 1 < d.length && !isNaN(d.charCodeAt(1))
              ? (b.push(this.evaluate_(d.slice(0, 2))), (d = d.substring(2)))
              : (b.push(this.evaluate_(d[0])), (d = d.substring(1))));
      }
  return b;
};
sre.MathStore.prototype.evaluate_ = function(a) {
  return sre.AuditoryDescription.create(
    { text: a },
    { adjust: !0, translate: !0 }
  );
};
sre.WalkerUtil = {};
sre.WalkerUtil.splitAttribute = function(a) {
  return a ? a.split(/,/) : [];
};
sre.WalkerUtil.getAttribute = function(a, b) {
  return sre.DomUtil.getDataAttribute(a, b);
};
sre.WalkerUtil.getSemanticRoot = function(a) {
  if (
    a.hasAttribute(sre.EnrichMathml.Attribute.TYPE) &&
    !a.hasAttribute(sre.EnrichMathml.Attribute.PARENT)
  )
    return a;
  for (
    var b = sre.DomUtil.querySelectorAllByAttr(
        a,
        sre.EnrichMathml.Attribute.TYPE
      ),
      c = 0,
      d;
    (d = b[c]);
    c++
  )
    if (!d.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) return d;
  return a;
};
sre.WalkerUtil.getBySemanticId = function(a, b) {
  return a.getAttribute(sre.EnrichMathml.Attribute.ID) === b
    ? a
    : sre.DomUtil.querySelectorAllByAttrValue(
        a,
        sre.EnrichMathml.Attribute.ID,
        b
      )[0];
};
sre.RebuildStree = function(a) {
  this.nodeDict = {};
  this.mathml = a;
  this.mmlRoot = sre.WalkerUtil.getSemanticRoot(a);
  this.streeRoot = this.assembleTree(this.mmlRoot);
  this.stree = sre.SemanticTree.fromNode(this.streeRoot, this.mathml);
  this.xml = this.stree.xml();
};
sre.RebuildStree.prototype.getTree = function() {
  return this.stree;
};
sre.RebuildStree.prototype.assembleTree = function(a) {
  var b = this.makeNode(a),
    c = sre.WalkerUtil.splitAttribute(
      sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CHILDREN)
    ),
    d = sre.WalkerUtil.splitAttribute(
      sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CONTENT)
    );
  if (0 === d.length && 0 === c.length)
    return (b.textContent = a.textContent), b;
  if (0 < d.length) {
    var e = sre.WalkerUtil.getBySemanticId(a, d[0]);
    e &&
      ((e = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(e, sre.EnrichMathml.Attribute.OPERATOR)
      )),
      1 < e.length && (b.textContent = e[1]));
  }
  e = function(c) {
    c = sre.WalkerUtil.getBySemanticId(a, c);
    c = this.assembleTree(c);
    c.parent = b;
    return c;
  };
  b.contentNodes = d.map(goog.bind(e, this));
  b.childNodes = c.map(goog.bind(e, this));
  return (c = sre.WalkerUtil.getAttribute(
    a,
    sre.EnrichMathml.Attribute.COLLAPSED
  ))
    ? this.postProcess(b, c)
    : b;
};
sre.RebuildStree.prototype.makeNode = function(a) {
  var b = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.TYPE),
    c = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.ROLE),
    d = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.FONT),
    e = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.ID),
    f = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.EMBELLISHED);
  a = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.FENCEPOINTER);
  e = this.createNode(parseInt(e, 10));
  e.type = b;
  e.role = c;
  e.font = d ? d : sre.SemanticAttr.Font.UNKNOWN;
  a && (e.fencePointer = a);
  f && (e.embellished = f);
  return e;
};
sre.RebuildStree.isPunctuated = function(a) {
  return (
    !sre.SemanticSkeleton.simpleCollapseStructure(a) &&
    a[1] &&
    sre.SemanticSkeleton.contentCollapseStructure(a[1])
  );
};
sre.RebuildStree.prototype.makePunctuation = function(a) {
  a = this.createNode(a);
  a.updateContent(sre.SemanticAttr.invisibleComma());
  a.role = sre.SemanticAttr.Role.DUMMY;
  return a;
};
sre.RebuildStree.prototype.makePunctuated = function(a, b, c) {
  var d = this.createNode(b[0]);
  d.type = sre.SemanticAttr.Type.PUNCTUATED;
  d.embellished = a.embellished;
  d.fencePointer = a.fencePointer;
  d.role = c;
  a = b.splice(1, 1)[0].slice(1);
  d.contentNodes = a.map(goog.bind(this.makePunctuation, this));
  this.collapsedChildren_(b);
};
sre.RebuildStree.prototype.makeEmpty = function(a, b, c) {
  b = this.createNode(b);
  b.type = sre.SemanticAttr.Type.EMPTY;
  b.embellished = a.embellished;
  b.fencePointer = a.fencePointer;
  b.role = c;
};
sre.RebuildStree.prototype.makeIndex = function(a, b, c) {
  sre.RebuildStree.isPunctuated(b)
    ? this.makePunctuated(a, b, c)
    : sre.SemanticSkeleton.simpleCollapseStructure(b) &&
      !this.nodeDict[b.toString()] &&
      this.makeEmpty(a, b, c);
};
sre.RebuildStree.prototype.postProcess = function(a, b) {
  var c = sre.SemanticSkeleton.fromString(b).array;
  if (a.type === sre.SemanticAttr.Role.SUBSUP) {
    var d = this.createNode(c[1][0]);
    d.type = sre.SemanticAttr.Type.SUBSCRIPT;
    d.role = sre.SemanticAttr.Role.SUBSUP;
    a.type = sre.SemanticAttr.Type.SUPERSCRIPT;
    d.embellished = a.embellished;
    d.fencePointer = a.fencePointer;
    this.makeIndex(a, c[1][2], sre.SemanticAttr.Role.RIGHTSUB);
    this.makeIndex(a, c[2], sre.SemanticAttr.Role.RIGHTSUPER);
    this.collapsedChildren_(c);
    return a;
  }
  if (a.type === sre.SemanticAttr.Type.SUBSCRIPT)
    return (
      this.makeIndex(a, c[2], sre.SemanticAttr.Role.RIGHTSUB),
      this.collapsedChildren_(c),
      a
    );
  if (a.type === sre.SemanticAttr.Type.SUPERSCRIPT)
    return (
      this.makeIndex(a, c[2], sre.SemanticAttr.Role.RIGHTSUPER),
      this.collapsedChildren_(c),
      a
    );
  if (a.type === sre.SemanticAttr.Type.TENSOR)
    return (
      this.makeIndex(a, c[2], sre.SemanticAttr.Role.LEFTSUB),
      this.makeIndex(a, c[3], sre.SemanticAttr.Role.LEFTSUPER),
      this.makeIndex(a, c[4], sre.SemanticAttr.Role.RIGHTSUB),
      this.makeIndex(a, c[5], sre.SemanticAttr.Role.RIGHTSUPER),
      this.collapsedChildren_(c),
      a
    );
  a.type === sre.SemanticAttr.Role.UNDEROVER &&
    ((d = this.createNode(c[1][0])),
    a.childNodes[1].role === sre.SemanticAttr.Role.OVERACCENT
      ? ((d.type = sre.SemanticAttr.Type.OVERSCORE),
        (a.type = sre.SemanticAttr.Type.UNDERSCORE))
      : ((d.type = sre.SemanticAttr.Type.UNDERSCORE),
        (a.type = sre.SemanticAttr.Type.OVERSCORE)),
    (d.role = sre.SemanticAttr.Role.UNDEROVER),
    (d.embellished = a.embellished),
    (d.fencePointer = a.fencePointer),
    this.collapsedChildren_(c));
  return a;
};
sre.RebuildStree.prototype.createNode = function(a) {
  var b = new sre.SemanticNode(a);
  return (this.nodeDict[a.toString()] = b);
};
sre.RebuildStree.prototype.collapsedChildren_ = function(a) {
  var b = goog.bind(function(a) {
    var c = this.nodeDict[a[0]];
    c.childNodes = [];
    for (var e = 1, f = a.length; e < f; e++) {
      var g = a[e];
      c.childNodes.push(
        sre.SemanticSkeleton.simpleCollapseStructure(g)
          ? this.nodeDict[g]
          : b(g)
      );
    }
    return c;
  }, this);
  b(a);
};
sre.SpeechGenerator = function() {};
sre.SpeechGenerator.prototype.getSpeech = function(a, b) {};
sre.SpeechGenerator.prototype.getRebuilt = function() {};
sre.SpeechGenerator.prototype.setRebuilt = function(a) {};
sre.SpeechGenerator.prototype.start = function() {};
sre.SpeechGenerator.prototype.end = function() {};
sre.MathSimpleStore = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.MathSimpleStore, sre.MathStore);
sre.MathSimpleStore.prototype.defineRulesFromMappings = function(a, b, c) {
  for (var d in c)
    for (var e in c[d])
      this.defineRule(
        a,
        d + "." + e,
        '[t] "' + c[d][e] + '"',
        "self::text()",
        '"' === b ? "self::text() = '" + b + "'" : 'self::text() = "' + b + '"'
      );
};
sre.MathSimpleStore.prototype.lookupRule = function(a, b) {
  var c = this.getSpeechRules().filter(function(a) {
    return sre.MathSimpleStore.testDynamicConstraints_(b, a);
  });
  return c.length
    ? c.sort(function(a, b) {
        return sre.Engine.getInstance().comparator.compare(
          a.dynamicCstr,
          b.dynamicCstr
        );
      })[0]
    : null;
};
sre.MathSimpleStore.testDynamicConstraints_ = function(a, b) {
  return sre.Engine.getInstance().strict
    ? b.dynamicCstr.equal(a)
    : sre.Engine.getInstance().comparator.match(b.dynamicCstr);
};
sre.MathCompoundStore = function() {
  this.subStores_ = {};
};
goog.addSingletonGetter(sre.MathCompoundStore);
sre.MathCompoundStore.prototype.defineRules = function(a, b, c) {
  var d = new sre.MathSimpleStore();
  d.defineRulesFromMappings(a, b, c);
  this.subStores_[b] = d;
};
sre.MathCompoundStore.prototype.addSymbolRules = function(a) {
  var b = sre.MathSimpleStore.parseUnicode_(a.key);
  this.defineRules(a.key, b, a.mappings);
};
sre.MathCompoundStore.prototype.addFunctionRules = function(a) {
  var b = a.names;
  a = a.mappings;
  for (var c = 0, d; (d = b[c]); c++) this.defineRules(d, d, a);
};
sre.MathCompoundStore.prototype.addUnitRules = function(a) {
  var b = a.names;
  b &&
    (a.names = b.map(function(a) {
      return a + ":unit";
    }));
  this.addFunctionRules(a);
};
sre.MathCompoundStore.prototype.lookupRule = function(a, b) {
  var c = this.subStores_[a];
  return c ? c.lookupRule(null, b) : null;
};
sre.MathCompoundStore.prototype.lookupString = function(a, b) {
  var c = this.lookupRule(a, b);
  return c
    ? c.action.components
        .map(function(a) {
          return a.content.slice(1, -1);
        })
        .join(" ")
    : "";
};
sre.MathSimpleStore.parseUnicode_ = function(a) {
  a = parseInt(a, 16);
  if (65536 > a) return String.fromCharCode(a);
  a -= 65536;
  return String.fromCharCode((a >> 10) + 55296, (a & 1023) + 56320);
};
sre.MathMap = function() {
  this.store = sre.MathCompoundStore.getInstance();
  this.retrieveMaps();
};
goog.addSingletonGetter(sre.MathMap);
sre.MathMap.toFetch_ = 0;
sre.Engine.registerTest(function() {
  return sre.MathMap.getInstance() && !sre.MathMap.toFetch_;
});
sre.MathMap.prototype.stringify = function() {
  return JSON.stringify(this);
};
sre.MathMap.SYMBOLS_PATH_ = "symbols";
sre.MathMap.FUNCTIONS_PATH_ = "functions";
sre.MathMap.UNITS_PATH_ = "units";
sre.MathMap.SYMBOLS_FILES_ = "greek-capital.json greek-small.json greek-scripts.json greek-mathfonts.json greek-symbols.json hebrew_letters.json latin-lower-double-accent.json latin-lower-normal.json latin-lower-phonetic.json latin-lower-single-accent.json latin-rest.json latin-upper-double-accent.json latin-upper-normal.json latin-upper-single-accent.json latin-mathfonts.json math_angles.json math_arrows.json math_characters.json math_delimiters.json math_digits.json math_geometry.json math_harpoons.json math_non_characters.json math_symbols.json math_whitespace.json other_stars.json".split(
  " "
);
sre.MathMap.FUNCTIONS_FILES_ = [
  "algebra.json",
  "elementary.json",
  "hyperbolic.json",
  "trigonometry.json"
];
sre.MathMap.UNITS_FILES_ = "energy.json length.json memory.json other.json speed.json temperature.json time.json volume.json weight.json".split(
  " "
);
sre.MathMap.retrieveFiles = function(a, b, c) {
  b = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath + b);
  switch (sre.Engine.getInstance().mode) {
    case sre.Engine.Mode.ASYNC:
      sre.MathMap.toFetch_ += a.length;
      for (var d = 0, e; (e = a[d]); d++)
        sre.MathMap.fromFile_(b + e, function(a, b) {
          sre.MathMap.toFetch_--;
          a ||
            JSON.parse(b).forEach(function(a) {
              c(a);
            });
        });
      break;
    case sre.Engine.Mode.HTTP:
      var f = sre.Engine.getInstance().isIE;
      sre.MathMap.toFetch_ += a.length;
      for (d = 0; (e = a[d]); d++)
        f ? sre.MathMap.getJsonIE_(e, c) : sre.MathMap.getJsonAjax_(b + e, c);
      break;
    default:
      sre.MathMap.parseFiles(
        a.map(function(a) {
          return b + a;
        })
      ).forEach(function(a) {
        c(a);
      });
  }
};
sre.MathMap.prototype.retrieveMaps = function() {
  sre.MathMap.retrieveFiles(
    sre.MathMap.FUNCTIONS_FILES_,
    sre.MathMap.FUNCTIONS_PATH_,
    goog.bind(this.store.addFunctionRules, this.store)
  );
  sre.MathMap.retrieveFiles(
    sre.MathMap.SYMBOLS_FILES_,
    sre.MathMap.SYMBOLS_PATH_,
    goog.bind(this.store.addSymbolRules, this.store)
  );
  sre.MathMap.retrieveFiles(
    sre.MathMap.UNITS_FILES_,
    sre.MathMap.UNITS_PATH_,
    goog.bind(this.store.addUnitRules, this.store)
  );
};
sre.MathMap.getJsonIE_ = function(a, b, c) {
  var d = c || 1;
  sre.BrowserUtil.mapsForIE
    ? ((c = sre.BrowserUtil.mapsForIE[a]) &&
        c.forEach(function(a) {
          b(a);
        }),
      sre.MathMap.toFetch_--)
    : 5 >= d
    ? setTimeout(function() {
        sre.MathMap.getJsonIE_(a, b, d++);
      }, 300)
    : sre.MathMap.toFetch_--;
};
sre.MathMap.fromFile_ = function(a, b) {
  return sre.SystemExternal.fs.readFile(a, "utf8", b);
};
sre.MathMap.loadFile = function(a) {
  try {
    return sre.MathMap.readJSON_(a);
  } catch (b) {
    console.log("Unable to load file: " + a + ", error: " + b);
  }
};
sre.MathMap.loadFiles = function(a) {
  return a.map(sre.MathMap.loadFile);
};
sre.MathMap.parseFiles = function(a) {
  a = sre.MathMap.loadFiles(a);
  return [].concat.apply(
    [],
    a.map(function(a) {
      return JSON.parse(a);
    })
  );
};
sre.MathMap.readJSON_ = function(a) {
  return sre.SystemExternal.fs.readFileSync(a);
};
sre.MathMap.getJsonAjax_ = function(a, b) {
  var c = new XMLHttpRequest();
  c.onreadystatechange = function() {
    4 === c.readyState &&
      (sre.MathMap.toFetch_--,
      200 === c.status &&
        JSON.parse(c.responseText).forEach(function(a) {
          b(a);
        }));
  };
  c.open("GET", a, !0);
  c.send();
};
sre.AbstractionRules = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.AbstractionRules, sre.MathStore);
goog.addSingletonGetter(sre.AbstractionRules);
sre.AbstractionRules.mathStore = sre.AbstractionRules.getInstance();
sre.AbstractionRules.defineRule_ = goog.bind(
  sre.AbstractionRules.mathStore.defineRule,
  sre.AbstractionRules.mathStore
);
sre.AbstractionRules.defineRuleAlias_ = goog.bind(
  sre.AbstractionRules.mathStore.defineRulesAlias,
  sre.AbstractionRules.mathStore
);
sre.AbstractionRules.defineSpecialisedRule_ = goog.bind(
  sre.AbstractionRules.mathStore.defineSpecialisedRule,
  sre.AbstractionRules.mathStore
);
sre.AbstractionRules.defineUniqueRuleAlias_ = goog.bind(
  sre.AbstractionRules.mathStore.defineUniqueRuleAlias,
  sre.AbstractionRules.mathStore
);
sre.AbstractionRules.initAbstractionRules_ = function() {
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-identifier",
    "mathspeak.default",
    '[t] "collapsed long identifier"',
    "self::identifier",
    "@alternative",
    "self::*",
    "self::*",
    "self::*",
    "self::*"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-identifier",
    "mathspeak.brief",
    '[t] "collapsed identifier"',
    "self::identifier",
    "@alternative",
    "self::*",
    "self::*",
    "self::*",
    "self::*"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-identifier",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-number",
    "mathspeak.default",
    '[t] "collapsed long number"',
    "self::number",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-number",
    "mathspeak.brief",
    '[t] "collapsed number"',
    "self::number",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-number",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-mixed-number",
    "mathspeak.default",
    '[t] "collapsed long mixed number"',
    "self::number",
    "@alternative",
    '@role="mixed"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-mixed-number",
    "mathspeak.brief",
    '[t] "collapsed mixed number"',
    "self::number",
    "@alternative",
    '@role="mixed"'
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-mixed-number",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-text",
    "mathspeak.default",
    '[t] "collapsed text"',
    "self::text",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-function",
    "mathspeak.default",
    '[t] "collapsed functional expression"',
    "self::function",
    "@alternative",
    "self::*"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-function",
    "mathspeak.brief",
    '[t] "collapsed function"',
    "self::function",
    "@alternative",
    "self::*"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-function",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-lim",
    "mathspeak.default",
    '[t] "collapsed limit function"',
    "self::function",
    "@alternative",
    '@role="limit function"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-lim",
    "mathspeak.brief",
    '[t] "collapsed lim"',
    "self::function",
    "@alternative",
    '@role="limit function"'
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-lim",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-fraction",
    "mathspeak.default",
    '[t] "collapsed fraction"',
    "self::fraction",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-fraction",
    "mathspeak.brief",
    '[t] "collapsed frac"',
    "self::fraction",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-fraction",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-continued-fraction",
    "mathspeak.default",
    '[t] "collapsed continued fraction"',
    "self::fraction",
    "@alternative",
    'children/*[2]/descendant-or-self::*[@role="ellipsis"]',
    "self::*",
    "self::*"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-continued-fraction",
    "mathspeak.brief",
    '[t] "collapsed continued frac"',
    "self::fraction",
    "@alternative",
    'children/*[2]/descendant-or-self::*[@role="ellipsis"]',
    "self::*",
    "self::*"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-continued-fraction",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-sqrt",
    "mathspeak.default",
    '[t] "collapsed square root"',
    "self::sqrt",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-sqrt",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-sqrt",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-sqrt-nested",
    "mathspeak.default",
    '[t] "collapsed nested square root"',
    "self::sqrt",
    "@alternative",
    "children/*/descendant::sqrt or children/*/descendant::root"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-sqrt-nested",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-sqrt-nested",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-root",
    "mathspeak.default",
    '[t] "collapsed root of index"; [n] children/*[1]; [t] "endindex"',
    "self::root",
    "@alternative",
    "following-sibling::* or ancestor::*/following-sibling::*"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-root",
    "mathspeak.brief",
    '[t] "collapsed root"',
    "self::root",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-root",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-root",
    "mathspeak.default",
    '[t] "collapsed nested root of index"; [n] children/*[1]',
    "self::root",
    "@alternative",
    "children/*/descendant::sqrt or children/*/descendant::root"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-root",
    "mathspeak.default",
    '[t] "collapsed nested root of index"; [n] children/*[1]; [t] "endindex"',
    "self::root",
    "@alternative",
    "children/*/descendant::sqrt or children/*/descendant::root",
    "following-sibling::* or ancestor::*/following-sibling::*"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-root",
    "mathspeak.brief",
    '[t] "collapsed nested root"',
    "self::root",
    "@alternative",
    "children/*/descendant::sqrt or children/*/descendant::root"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-root",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-superscript",
    "mathspeak.default",
    '[t] "collapsed power"',
    "self::superscript",
    "@alternative",
    "self::*",
    "self::*",
    "self::*"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-superscript",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-superscript",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-subscript",
    "mathspeak.default",
    '[t] "collapsed subscript"',
    "self::subscript",
    "@alternative",
    "self::*",
    "self::*",
    "self::*"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-subscript",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-subscript",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-subsup",
    "mathspeak.default",
    '[t] "collapsed power with subscript"',
    "self::superscript",
    "@alternative",
    'name(children/*[1])="subscript"',
    "self::*",
    "self::*",
    "self::*"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-subsup",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-subsup",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-infixop",
    "mathspeak.default",
    '[t] "collapsed"; [t] @role; [t] "with"; [t] count(./children/*); [t] "elements"',
    "self::infixop",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-infixop",
    "mathspeak.default",
    '[t] "collapsed"; [t] @role; [t] "with variable number of elements"',
    "self::infixop",
    "@alternative",
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-infixop",
    "mathspeak.brief",
    '[t] "collapsed"; [t] @role',
    "self::infixop",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-infixop",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-addition",
    "mathspeak.default",
    '[t] "collapsed sum with"; [t] count(./children/*); [t] "summands"',
    "self::infixop",
    "@alternative",
    '@role="addition"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-addition",
    "mathspeak.brief",
    '[t] "collapsed sum"',
    "self::infixop",
    "@alternative",
    '@role="addition"'
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-addition",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-addition",
    "mathspeak.default",
    '[t] "collapsed sum with variable number of summands"',
    "self::infixop",
    "@alternative",
    '@role="addition"',
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-multiplication",
    "mathspeak.default",
    '[t] "collapsed product with"; [t] count(./children/*); [t] "factors"',
    "self::infixop",
    "@alternative",
    '@role="multiplication"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-multiplication",
    "mathspeak.brief",
    '[t] "collapsed product"',
    "self::infixop",
    "@alternative",
    '@role="multiplication"'
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-multiplication",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRuleAlias_)(
    "abstr-multiplication",
    "self::infixop",
    "@alternative",
    '@role="implicit"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-multiplication",
    "mathspeak.default",
    '[t] "collapsed product with variable number of factors"',
    "self::infixop",
    "@alternative",
    '@role="multiplication"',
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRuleAlias_)(
    "abstr-var-multiplication",
    "self::infixop",
    "@alternative",
    '@role="implicit"',
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-vector",
    "mathspeak.default",
    '[t] "collapsed"; [t] count(./children/*) ; [t] "dimensional vector"',
    "self::vector",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-vector",
    "mathspeak.brief",
    '[t] "collapsed vector"',
    "self::vector",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-vector",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-vector",
    "mathspeak.default",
    '[t] "collapsed n dimensional vector"',
    "self::vector",
    "@alternative",
    './children/*/children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-binomial",
    "mathspeak.default",
    '[t] "collapsed binomial"',
    "self::vector",
    "@alternative",
    '@role="binomial"'
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-binomial",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-binomial",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-determinant",
    "mathspeak.default",
    '[t] "collapsed" ; [t] count(./children/*); [t] "dimensional determinant"',
    "self::matrix",
    "@alternative",
    '@role="determinant"',
    "self::*"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-determinant",
    "mathspeak.brief",
    '[t] "collapsed determinant"',
    "self::matrix",
    "@alternative",
    '@role="determinant"',
    "self::*"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-determinant",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-determinant",
    "mathspeak.default",
    '[t] "collapsed n dimensional determinant"',
    "self::matrix",
    "@alternative",
    '@role="determinant"',
    './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-squarematrix",
    "mathspeak.default",
    '[t] "collapsed" ; [t] count(./children/*); [t] "dimensional square matrix"',
    "self::matrix",
    "@alternative",
    '@role="squarematrix"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-squarematrix",
    "mathspeak.brief",
    '[t] "collapsed square matrix"',
    "self::matrix",
    "@alternative",
    '@role="squarematrix"'
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-squarematrix",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-rowvector",
    "mathspeak.default",
    '[t] "collapsed" ; [t] count(./children/row/children/*); [t] "dimensional row vector"',
    "self::matrix",
    "@alternative",
    '@role="rowvector"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-rowvector",
    "mathspeak.brief",
    '[t] "collapsed row vector"',
    "self::matrix",
    "@alternative",
    '@role="rowvector"'
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-rowvector",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-matrix",
    "mathspeak.default",
    '[t] "collapsed n dimensional row vector"',
    "self::matrix",
    "@alternative",
    '@role="rowvector"',
    './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-matrix",
    "mathspeak.default",
    '[t] "collapsed"; [t] count(children/*);  [t] "by";[t] count(children/*[1]/children/*); [t] "matrix"',
    "self::matrix",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-matrix",
    "mathspeak.brief",
    '[t] "collapsed matrix"',
    "self::matrix",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-matrix",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-matrix",
    "mathspeak.default",
    '[t] "collapsed n by m dimensional matrix"',
    "self::matrix",
    "@alternative",
    './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-cases",
    "mathspeak.default",
    '[t] "collapsed case statement";[t] "with"; [t] count(children/*); [t] "cases"',
    "self::cases",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-cases",
    "mathspeak.brief",
    '[t] "collapsed case statement"',
    "self::cases",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-cases",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-cases",
    "mathspeak.default",
    '[t] "collapsed case statement with variable number of cases"',
    "self::cases",
    "@alternative",
    './children/row/children/cell/children/punctuation[@role="ellipsis"]or ./children/line/children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-punctuated",
    "mathspeak.default",
    '[t] "collapsed"; [n] content/*[1]; [t] "separated list";[t] "of length"; [t] count(children/*) - count(content/*)',
    "self::punctuated",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-punctuated",
    "mathspeak.brief",
    '[t] "collapsed"; [n] content/*[1]; [t] "separated list"',
    "self::punctuated",
    "@alternative"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-punctuated",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-punctuated",
    "mathspeak.default",
    '[t] "collapsed"; [n] content/*[1]; [t] "separated list";[t] "of variable length"',
    "self::punctuated",
    "@alternative",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-bigop",
    "mathspeak.default",
    '[t] "collapsed"; [n] content/*[1]',
    "self::bigop",
    "@alternative",
    "self::*"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-integral",
    "mathspeak.default",
    '[t] "collapsed integral"',
    "self::*",
    "@alternative",
    '@role="integral"'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-relation",
    "mathspeak.default",
    '[t] "collapsed"; [n] @role;',
    "self::relseq",
    "@alternative",
    "count(./children/*)=2"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-relation",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-relation",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-relation",
    "mathspeak.default",
    '[t] "collapsed"; [n] @role; [t] "sequence"; [t] "with"; [t] count(./children/*); [t] "elements"',
    "self::relseq",
    "@alternative",
    "count(./children/*)>2"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-relation",
    "mathspeak.brief",
    '[t] "collapsed"; [n] @role; [t] "sequence"',
    "self::relseq",
    "@alternative",
    "count(./children/*)>2"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-relation",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-relation",
    "mathspeak.default",
    '[t] "collapsed"; [n] @role; [t] "sequence"; [t] "with variable number of elements"',
    "self::relseq",
    "@alternative",
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineUniqueRuleAlias_)(
    "abstr-relation",
    "mathspeak.default",
    "self::multirel",
    "@alternative",
    '@role!="unknown"',
    "count(./children/*)>2"
  );
  (0, sre.AbstractionRules.defineUniqueRuleAlias_)(
    "abstr-relation",
    "mathspeak.brief",
    "self::multirel",
    "@alternative",
    '@role!="unknown"',
    "count(./children/*)>2"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-relation",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRuleAlias_)(
    "abstr-var-relation",
    "self::multirel",
    "@alternative",
    '@role!="unknown"',
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-multirel",
    "mathspeak.default",
    '[t] "collapsed relation sequence"; [t] "with"; [t] count(./children/*); [t] "elements"',
    "self::multirel",
    "@alternative",
    "count(./children/*)>2"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-multirel",
    "mathspeak.brief",
    '[t] "collapsed relation sequence"',
    "self::multirel",
    "@alternative",
    "count(./children/*)>2"
  );
  (0, sre.AbstractionRules.defineSpecialisedRule_)(
    "abstr-multirel",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.AbstractionRules.defineRule_)(
    "abstr-var-multirel",
    "mathspeak.default",
    '[t] "collapsed relation sequence with variable number of elements"',
    "self::multirel",
    "@alternative",
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
};
sre.AbstractionRules.getInstance().initializer = [
  sre.AbstractionRules.initAbstractionRules_
];
sre.ClearspeakRules = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.ClearspeakRules, sre.MathStore);
goog.addSingletonGetter(sre.ClearspeakRules);
sre.ClearspeakRules.mathStore = sre.ClearspeakRules.getInstance();
sre.ClearspeakRules.defineRule_ = goog.bind(
  sre.ClearspeakRules.mathStore.defineRule,
  sre.ClearspeakRules.mathStore
);
sre.ClearspeakRules.initClearspeakRules_ = function() {
  (0, sre.ClearspeakRules.defineRule_)(
    "fraction",
    "mathspeak.clearspeak",
    '[t] "the fraction with numerator"; [n] children/*[1]; [p] (pause:300); [t] "and denominator"; [n] children/*[2]; [p] (pause:500)',
    "self::fraction"
  );
  (0, sre.ClearspeakRules.defineRule_)(
    "sqrt",
    "mathspeak.clearspeak",
    '[t] "the square root of"; [n] children/*[1]; [p] (pause:500)',
    "self::sqrt"
  );
};
sre.ClearspeakRules.getInstance().initializer = [
  sre.ClearspeakRules.initClearspeakRules_
];
sre.MathmlStoreUtil = {};
sre.MathmlStoreUtil.matchMathjaxToMathml = function(a) {
  return sre.Engine.getInstance().alternativeHost.querySelector("#" + a.id);
};
sre.MathmlStoreUtil.retrieveMathjaxExtender = function(a) {
  return (a = sre.MathmlStoreUtil.matchMathjaxToMathml(a)) ? [a] : [];
};
sre.MathmlStoreUtil.retrieveMathjaxLeaf = function(a) {
  return (a = sre.MathmlStoreUtil.matchMathjaxToMathml(a)) ? [a] : [];
};
sre.MathmlStoreUtil.checkMathjaxTag = function(a, b) {
  var c = sre.MathmlStoreUtil.matchMathjaxToMathml(a);
  return c && c.tagName.toUpperCase() == b ? [c] : [];
};
sre.MathmlStoreUtil.checkMathjaxMunder = function(a) {
  return sre.MathmlStoreUtil.checkMathjaxTag(a, "MUNDER");
};
sre.MathmlStoreUtil.checkMathjaxMover = function(a) {
  return sre.MathmlStoreUtil.checkMathjaxTag(a, "MOVER");
};
sre.MathmlStoreUtil.checkMathjaxMsub = function(a) {
  return sre.MathmlStoreUtil.checkMathjaxTag(a, "MSUB");
};
sre.MathmlStoreUtil.checkMathjaxMsup = function(a) {
  return sre.MathmlStoreUtil.checkMathjaxTag(a, "MSUP");
};
sre.MathmlStoreUtil.mfencedSeparators = function(a, b) {
  var c = sre.MathUtil.nextSeparatorFunction(b);
  return function() {
    return c
      ? [sre.AuditoryDescription.create({ text: c() }, { translate: !0 })]
      : [];
  };
};
sre.MathmlStoreUtil.contentIterator = function(a, b) {
  var c = 0 < a.length ? sre.XpathUtil.evalXPath("../../content/*", a[0]) : [];
  return function() {
    var a = c.shift(),
      e = b
        ? [sre.AuditoryDescription.create({ text: b }, { translate: !0 })]
        : [];
    if (!a) return e;
    a = sre.SpeechRuleEngine.getInstance().evaluateNode(a);
    return e.concat(a);
  };
};
sre.MathspeakUtil = {};
sre.MathspeakUtil.spaceoutText = function(a) {
  return a.textContent.split("").join(" ");
};
sre.MathspeakUtil.spaceoutNumber = function(a) {
  a = a.textContent.split("");
  for (
    var b = [], c = new sre.SystemExternal.xmldom.DOMParser(), d = 0, e;
    (e = a[d]);
    d++
  ) {
    var f = sre.Semantic.Type.NUMBER,
      g = e.match(/\W/)
        ? sre.Semantic.Role.UNKNOWN
        : sre.Semantic.Role.PROTECTED;
    e = c.parseFromString(
      "<" + f + ' role="' + g + '">' + e + "</" + f + ">",
      "text/xml"
    );
    b.push(e.documentElement);
  }
  return b;
};
sre.MathspeakUtil.spaceoutIdentifier = function(a) {
  var b = a.textContent;
  if (!b.match(/[a-zA-Z]+/))
    return a.setAttribute("role", sre.SemanticAttr.Role.PROTECTED), [a];
  a = b.split("");
  for (
    var b = [], c = new sre.SystemExternal.xmldom.DOMParser(), d = 0, e;
    (e = a[d]);
    d++
  ) {
    var f = sre.Semantic.Type.IDENTIFIER;
    e = c.parseFromString(
      "<" +
        f +
        ' role="' +
        sre.Semantic.Role.UNKNOWN +
        '">' +
        e +
        "</" +
        f +
        ">",
      "text/xml"
    );
    b.push(e.documentElement);
  }
  return b;
};
sre.MathspeakUtil.nestingBarriers = [
  sre.Semantic.Type.CASES,
  sre.Semantic.Type.CELL,
  sre.Semantic.Type.INTEGRAL,
  sre.Semantic.Type.LINE,
  sre.Semantic.Type.MATRIX,
  sre.Semantic.Type.MULTILINE,
  sre.Semantic.Type.OVERSCORE,
  sre.Semantic.Type.ROOT,
  sre.Semantic.Type.ROW,
  sre.Semantic.Type.SQRT,
  sre.Semantic.Type.SUBSCRIPT,
  sre.Semantic.Type.SUPERSCRIPT,
  sre.Semantic.Type.TABLE,
  sre.Semantic.Type.UNDERSCORE,
  sre.Semantic.Type.VECTOR
];
sre.MathspeakUtil.nestingDepth = {};
sre.MathspeakUtil.getNestingDepth = function(a, b, c, d, e, f) {
  d = d || sre.MathspeakUtil.nestingBarriers;
  e = e || {};
  f =
    f ||
    function(a) {
      return !1;
    };
  var g = new sre.SystemExternal.xmldom.XMLSerializer().serializeToString(b);
  sre.MathspeakUtil.nestingDepth[a] || (sre.MathspeakUtil.nestingDepth[a] = {});
  if (sre.MathspeakUtil.nestingDepth[a][g])
    return sre.MathspeakUtil.nestingDepth[a][g];
  if (f(b) || 0 > c.indexOf(b.tagName)) return 0;
  b = sre.MathspeakUtil.computeNestingDepth_(
    b,
    c,
    sre.BaseUtil.setdifference(d, c),
    e,
    f,
    0
  );
  return (sre.MathspeakUtil.nestingDepth[a][g] = b);
};
sre.MathspeakUtil.containsAttr = function(a, b) {
  if (!a.attributes) return !1;
  for (var c = sre.DomUtil.toArray(a.attributes), d = 0, e; (e = c[d]); d++)
    if (b[e.nodeName] === e.nodeValue) return !0;
  return !1;
};
sre.MathspeakUtil.computeNestingDepth_ = function(a, b, c, d, e, f) {
  if (e(a) || -1 < c.indexOf(a.tagName) || sre.MathspeakUtil.containsAttr(a, d))
    return f;
  -1 < b.indexOf(a.tagName) && f++;
  if (!a.childNodes || 0 === a.childNodes.length) return f;
  a = sre.DomUtil.toArray(a.childNodes);
  return Math.max.apply(
    null,
    a.map(function(a) {
      return sre.MathspeakUtil.computeNestingDepth_(a, b, c, d, e, f);
    })
  );
};
sre.MathspeakUtil.fractionNestingDepth = function(a) {
  return sre.MathspeakUtil.getNestingDepth(
    "fraction",
    a,
    ["fraction"],
    sre.MathspeakUtil.nestingBarriers,
    {},
    function(a) {
      return sre.MathspeakUtil.vulgarFractionSmall(a);
    }
  );
};
sre.MathspeakUtil.openingFractionVerbose = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return Array(a + 1).join("Start") + "Fraction";
};
sre.MathspeakUtil.closingFractionVerbose = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return Array(a + 1).join("End") + "Fraction";
};
sre.MathspeakUtil.overFractionVerbose = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return Array(a + 1).join("Over");
};
sre.MathspeakUtil.openingFractionBrief = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return Array(a + 1).join("Start") + "Frac";
};
sre.MathspeakUtil.closingFractionBrief = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return Array(a + 1).join("End") + "Frac";
};
sre.MathspeakUtil.nestingToString = function(a) {
  switch (a) {
    case 1:
      return "";
    case 2:
      return "Twice";
    default:
      return a.toString();
  }
};
sre.MathspeakUtil.openingFractionSbrief = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return 1 === a
    ? "Frac"
    : "Nest" + sre.MathspeakUtil.nestingToString(a - 1) + "Frac";
};
sre.MathspeakUtil.closingFractionSbrief = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return 1 === a
    ? "EndFrac"
    : "Nest" + sre.MathspeakUtil.nestingToString(a - 1) + "EndFrac";
};
sre.MathspeakUtil.overFractionSbrief = function(a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return 1 === a
    ? "Over"
    : "Nest" + sre.MathspeakUtil.nestingToString(a - 1) + "Over";
};
sre.MathspeakUtil.onesNumbers = " one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
  " "
);
sre.MathspeakUtil.tensNumbers = "  twenty thirty forty fifty sixty seventy eighty ninety".split(
  " "
);
sre.MathspeakUtil.largeNumbers = " thousand million billion trillion quadrillion quintillion sextillion septillion octillion nonillion decillion".split(
  " "
);
sre.MathspeakUtil.hundredsToWords = function(a) {
  a %= 1e3;
  var b;
  b =
    "" +
    (sre.MathspeakUtil.onesNumbers[Math.floor(a / 100)]
      ? sre.MathspeakUtil.onesNumbers[Math.floor(a / 100)] + "-hundred"
      : "");
  (a %= 100) &&
    (b =
      b +
      (b ? "-" : "") +
      (sre.MathspeakUtil.onesNumbers[a] ||
        sre.MathspeakUtil.tensNumbers[Math.floor(a / 10)] +
          "-" +
          sre.MathspeakUtil.onesNumbers[a % 10]));
  return b;
};
sre.MathspeakUtil.numberToWords = function(a) {
  if (a >= Math.pow(10, 36)) return a.toString();
  for (var b = 0, c = ""; 0 < a; )
    a % 1e3 &&
      (c =
        sre.MathspeakUtil.hundredsToWords(a % 1e3) +
        (b ? "-" + sre.MathspeakUtil.largeNumbers[b] + "-" : "") +
        c),
      (a = Math.floor(a / 1e3)),
      b++;
  return c;
};
sre.MathspeakUtil.numberToOrdinal = function(a, b) {
  if (2 === a) return b ? "halves" : "half";
  var c = sre.MathspeakUtil.numberToWords(a),
    c = c.match(/one$/)
      ? c.slice(0, -3) + "first"
      : c.match(/two$/)
      ? c.slice(0, -3) + "second"
      : c.match(/three$/)
      ? c.slice(0, -5) + "third"
      : c.match(/five$/)
      ? c.slice(0, -4) + "fifth"
      : c.match(/eight$/)
      ? c.slice(0, -5) + "eighth"
      : c.match(/nine$/)
      ? c.slice(0, -4) + "ninth"
      : c.match(/twelve$/)
      ? c.slice(0, -5) + "twelfth"
      : c.match(/ty$/)
      ? c.slice(0, -2) + "tieth"
      : c + "th";
  return b ? c + "s" : c;
};
sre.MathspeakUtil.simpleOrdinal = function(a) {
  var b = a % 100,
    c = a.toString();
  if (10 < b && 20 > b) return c + "th";
  switch (a % 10) {
    case 1:
      return c + "st";
    case 2:
      return c + "nd";
    case 3:
      return c + "rd";
    default:
      return c + "th";
  }
};
sre.MathspeakUtil.ordinalCounter = function(a, b) {
  var c = 0;
  return function() {
    return sre.MathspeakUtil.simpleOrdinal(++c) + " " + b;
  };
};
sre.MathspeakUtil.convertVulgarFraction_ = function(a) {
  if (
    !a.childNodes ||
    !a.childNodes[0] ||
    !a.childNodes[0].childNodes ||
    2 > a.childNodes[0].childNodes.length ||
    a.childNodes[0].childNodes[0].tagName !== sre.SemanticAttr.Type.NUMBER ||
    a.childNodes[0].childNodes[0].getAttribute("role") !==
      sre.SemanticAttr.Role.INTEGER ||
    a.childNodes[0].childNodes[1].tagName !== sre.SemanticAttr.Type.NUMBER ||
    a.childNodes[0].childNodes[1].getAttribute("role") !==
      sre.SemanticAttr.Role.INTEGER
  )
    return { convertible: !1, content: a.textContent };
  var b = a.childNodes[0].childNodes[1].textContent;
  a = a.childNodes[0].childNodes[0].textContent;
  var c = Number(b),
    d = Number(a);
  return isNaN(c) || isNaN(d)
    ? { convertible: !1, content: a + " Over " + b }
    : { convertible: !0, enumerator: d, denominator: c };
};
sre.MathspeakUtil.vulgarFraction = function(a) {
  a = sre.MathspeakUtil.convertVulgarFraction_(a);
  return a.convertible && a.enumerator && a.denominator
    ? sre.MathspeakUtil.numberToWords(a.enumerator) +
        "-" +
        sre.MathspeakUtil.numberToOrdinal(a.denominator, 1 !== a.enumerator)
    : a.content || "";
};
sre.MathspeakUtil.vulgarFractionSmall = function(a) {
  var b = sre.MathspeakUtil.convertVulgarFraction_(a);
  return b.convertible
    ? ((a = b.enumerator),
      (b = b.denominator),
      0 < a && 10 > a && 0 < b && 100 > b)
    : !1;
};
sre.MathspeakUtil.isSmallVulgarFraction = function(a) {
  return sre.MathspeakUtil.vulgarFractionSmall(a) ? [a] : [];
};
sre.MathspeakUtil.nestedSubSuper = function(a, b, c) {
  for (; a.parentNode; ) {
    var d = a.parentNode,
      e = d.parentNode,
      f = a.getAttribute && a.getAttribute("role");
    if (
      (e.tagName === sre.Semantic.Type.SUBSCRIPT && a === d.childNodes[1]) ||
      (e.tagName === sre.Semantic.Type.TENSOR &&
        f &&
        (f === sre.Semantic.Role.LEFTSUB || f === sre.Semantic.Role.RIGHTSUB))
    )
      b = c.sub + " " + b;
    if (
      (e.tagName === sre.Semantic.Type.SUPERSCRIPT && a === d.childNodes[1]) ||
      (e.tagName === sre.Semantic.Type.TENSOR &&
        f &&
        (f === sre.Semantic.Role.LEFTSUPER ||
          f === sre.Semantic.Role.RIGHTSUPER))
    )
      b = c.sup + " " + b;
    a = e;
  }
  return b.trim();
};
sre.MathspeakUtil.subscriptVerbose = function(a) {
  return sre.MathspeakUtil.nestedSubSuper(a, "Subscript", {
    sup: "Super",
    sub: "Sub"
  });
};
sre.MathspeakUtil.subscriptBrief = function(a) {
  return sre.MathspeakUtil.nestedSubSuper(a, "Sub", { sup: "Sup", sub: "Sub" });
};
sre.MathspeakUtil.superscriptVerbose = function(a) {
  return sre.MathspeakUtil.nestedSubSuper(a, "Superscript", {
    sup: "Super",
    sub: "Sub"
  });
};
sre.MathspeakUtil.superscriptBrief = function(a) {
  return sre.MathspeakUtil.nestedSubSuper(a, "Sup", { sup: "Sup", sub: "Sub" });
};
sre.MathspeakUtil.baselineVerbose = function(a) {
  return (a = sre.MathspeakUtil.nestedSubSuper(a, "", {
    sup: "Super",
    sub: "Sub"
  }))
    ? a.replace(/Sub$/, "Subscript").replace(/Super$/, "Superscript")
    : "Baseline";
};
sre.MathspeakUtil.baselineBrief = function(a) {
  return (
    sre.MathspeakUtil.nestedSubSuper(a, "", { sup: "Sup", sub: "Sub" }) ||
    "Base"
  );
};
sre.MathspeakUtil.radicalNestingDepth = function(a) {
  return sre.MathspeakUtil.getNestingDepth(
    "radical",
    a,
    ["sqrt", "root"],
    sre.MathspeakUtil.nestingBarriers,
    {}
  );
};
sre.MathspeakUtil.nestedRadical = function(a, b, c) {
  a = sre.MathspeakUtil.radicalNestingDepth(a);
  return 1 === a ? c : b + sre.MathspeakUtil.nestingToString(a - 1) + c;
};
sre.MathspeakUtil.openingRadicalVerbose = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nested", "StartRoot");
};
sre.MathspeakUtil.closingRadicalVerbose = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nested", "EndRoot");
};
sre.MathspeakUtil.indexRadicalVerbose = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nested", "RootIndex");
};
sre.MathspeakUtil.openingRadicalBrief = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nest", "StartRoot");
};
sre.MathspeakUtil.closingRadicalBrief = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nest", "EndRoot");
};
sre.MathspeakUtil.indexRadicalBrief = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nest", "RootIndex");
};
sre.MathspeakUtil.openingRadicalSbrief = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nest", "Root");
};
sre.MathspeakUtil.indexRadicalSbrief = function(a) {
  return sre.MathspeakUtil.nestedRadical(a, "Nest", "Index");
};
sre.MathspeakUtil.underscoreNestingDepth = function(a) {
  return sre.MathspeakUtil.getNestingDepth(
    "underscore",
    a,
    ["underscore"],
    sre.MathspeakUtil.nestingBarriers,
    {},
    function(a) {
      return (
        a.tagName &&
        a.tagName === sre.Semantic.Type.UNDERSCORE &&
        a.childNodes[0].childNodes[1].getAttribute("role") ===
          sre.Semantic.Role.UNDERACCENT
      );
    }
  );
};
sre.MathspeakUtil.nestedUnderscore = function(a) {
  a = sre.MathspeakUtil.underscoreNestingDepth(a);
  return Array(a).join("Under") + "Underscript";
};
sre.MathspeakUtil.overscoreNestingDepth = function(a) {
  return sre.MathspeakUtil.getNestingDepth(
    "overscore",
    a,
    ["overscore"],
    sre.MathspeakUtil.nestingBarriers,
    {},
    function(a) {
      return (
        a.tagName &&
        a.tagName === sre.Semantic.Type.OVERSCORE &&
        a.childNodes[0].childNodes[1].getAttribute("role") ===
          sre.Semantic.Role.OVERACCENT
      );
    }
  );
};
sre.MathspeakUtil.nestedOverscore = function(a) {
  a = sre.MathspeakUtil.overscoreNestingDepth(a);
  return Array(a).join("Over") + "Overscript";
};
sre.MathspeakUtil.determinantIsSimple = function(a) {
  if (
    a.tagName !== sre.Semantic.Type.MATRIX ||
    a.getAttribute("role") !== sre.Semantic.Role.DETERMINANT
  )
    return [];
  for (
    var b = sre.XpathUtil.evalXPath("children/row/children/cell/children/*", a),
      c = 0,
      d;
    (d = b[c]);
    c++
  )
    if (d.tagName !== sre.Semantic.Type.NUMBER) {
      if (
        d.tagName === sre.Semantic.Type.IDENTIFIER &&
        ((d = d.getAttribute("role")),
        d === sre.Semantic.Role.LATINLETTER ||
          d === sre.Semantic.Role.GREEKLETTER ||
          d === sre.Semantic.Role.OTHERLETTER)
      )
        continue;
      return [];
    }
  return [a];
};
sre.MathspeakUtil.generateBaselineConstraint = function() {
  for (
    var a = function(a) {
        return a.map(function(a) {
          return "ancestor::" + a;
        });
      },
      b = "not(" + a(["subscript", "superscript", "tensor"]).join(" or ") + ")",
      c = a(["relseq", "multrel"]),
      a = a(["fraction", "punctuation", "fenced", "sqrt", "root"]),
      d = [],
      e = 0,
      f;
    (f = a[e]);
    e++
  )
    d = d.concat(
      c.map(function(a) {
        return f + "/" + a;
      })
    );
  c = "not(" + d.join(" | ") + ")";
  return ["ancestor::*/following-sibling::*", b, c].join(" and ");
};
sre.StoreUtil = {};
sre.StoreUtil.nodeCounter = function(a, b) {
  var c = a.length,
    d = 0,
    e = b;
  b || (e = "");
  return function() {
    d < c && (d += 1);
    return e + " " + d;
  };
};
sre.EmacspeakRules = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.EmacspeakRules, sre.MathStore);
goog.addSingletonGetter(sre.EmacspeakRules);
sre.EmacspeakRules.mathStore = sre.EmacspeakRules.getInstance();
sre.EmacspeakRules.defineRule_ = goog.bind(
  sre.EmacspeakRules.mathStore.defineRule,
  sre.EmacspeakRules.mathStore
);
sre.EmacspeakRules.defineRuleAlias_ = goog.bind(
  sre.EmacspeakRules.mathStore.defineRuleAlias,
  sre.EmacspeakRules.mathStore
);
sre.EmacspeakRules.addContextFunction_ = goog.bind(
  sre.EmacspeakRules.mathStore.contextFunctions.add,
  sre.EmacspeakRules.mathStore.contextFunctions
);
sre.EmacspeakRules.addCustomQuery_ = goog.bind(
  sre.EmacspeakRules.mathStore.customQueries.add,
  sre.EmacspeakRules.mathStore.customQueries
);
sre.EmacspeakRules.addCustomString_ = goog.bind(
  sre.EmacspeakRules.mathStore.customStrings.add,
  sre.EmacspeakRules.mathStore.customStrings
);
sre.EmacspeakRules.initCustomFunctions_ = function() {
  (0, sre.EmacspeakRules.addContextFunction_)(
    "CTXFnodeCounter",
    sre.StoreUtil.nodeCounter
  );
  (0, sre.EmacspeakRules.addContextFunction_)(
    "CTXFcontentIterator",
    sre.MathmlStoreUtil.contentIterator
  );
  (0, sre.EmacspeakRules.addCustomQuery_)(
    "CQFvulgarFractionSmall",
    sre.MathspeakUtil.isSmallVulgarFraction
  );
  (0, sre.EmacspeakRules.addCustomString_)(
    "CSFvulgarFraction",
    sre.MathspeakUtil.vulgarFraction
  );
};
sre.EmacspeakRules.initSemanticRules_ = function() {
  (0, sre.EmacspeakRules.defineRule_)(
    "stree",
    "emacspeak.default",
    "[n] ./*[1]",
    "self::stree"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "multrel",
    "emacspeak.default",
    '[t] "multirelation"; [m] children/* (sepFunc:CTXFcontentIterator)',
    "self::multirel"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "variable-equality",
    "emacspeak.default",
    '[t] "equation sequence"; [m] ./children/* (context:"part",ctxtFunc:CTXFnodeCounter,sepFunc:CTXFcontentIterator)',
    'self::relseq[@role="equality"]',
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "multi-equality",
    "emacspeak.default",
    '[t] "equation sequence"; [m] ./children/* (context:"part",ctxtFunc:CTXFnodeCounter,sepFunc:CTXFcontentIterator)',
    'self::relseq[@role="equality"]',
    "count(./children/*)>2"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "multi-equality",
    "emacspeak.short",
    '[t] "equation sequence"; [m] ./children/* (sepFunc:CTXFcontentIterator)',
    'self::relseq[@role="equality"]',
    "count(./children/*)>2"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "equality",
    "emacspeak.default",
    '[t] "equation"; [t] "left hand side"; [n] children/*[1];[p] (pause:200); [n] content/*[1] (pause:200);[t] "right hand side"; [n] children/*[2]',
    'self::relseq[@role="equality"]',
    "count(./children/*)=2"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "simple-equality",
    "emacspeak.default",
    "[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);[n] children/*[2]",
    'self::relseq[@role="equality"]',
    "count(./children/*)=2",
    "./children/identifier or ./children/number"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "simple-equality2",
    "emacspeak.default",
    "[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);[n] children/*[2]",
    'self::relseq[@role="equality"]',
    "count(./children/*)=2",
    "./children/function or ./children/appl"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "relseq",
    "emacspeak.default",
    "[m] children/* (sepFunc:CTXFcontentIterator)",
    "self::relseq"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "implicit",
    "emacspeak.default",
    "[m] children/*",
    "self::infixop",
    '@role="implicit"',
    'children/*[1][@role="latinletter"] or children/*[1][@role="greekletter"] or children/*[1][@role="otherletter"] or name(children/*[1])="number"',
    'children/*[2][@role="latinletter"] or children/*[2][@role="greekletter"] or children/*[2][@role="otherletter"] or name(children/*[2])="number"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "binary-operation",
    "emacspeak.default",
    "[p] (pause:100); [m] ./children/* (sepFunc:CTXFcontentIterator); [p] (pause:100);",
    "self::infixop"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "variable-addition",
    "emacspeak.default",
    '[t] "sum with variable number of summands";[p] (pause:400); [m] children/* (sepFunc:CTXFcontentIterator)',
    'self::infixop[@role="addition"]',
    "count(children/*)>2",
    'children/punctuation[@role="ellipsis"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "prefix",
    "emacspeak.default",
    '[t] "prefix"; [n] text(); [t] "of" (pause 150);[n] children/*[1]',
    "self::prefixop"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "negative",
    "emacspeak.default",
    '[t] "negative"; [n] children/*[1]',
    "self::prefixop",
    'self::prefixop[@role="negative"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "postfix",
    "emacspeak.default",
    '[n] children/*[1]; [t] "postfix"; [n] text() (pause 300)',
    "self::postfixop"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "identifier",
    "emacspeak.default",
    "[n] text()",
    "self::identifier"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "number",
    "emacspeak.default",
    "[n] text()",
    "self::number"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "font",
    "mathspeak.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::*",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font!="normal"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "font-identifier-short",
    "emacspeak.default",
    "[t] @font; [n] CQFhideFont; [t] CSFshowFont",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    '@font="normal"',
    '""=translate(text(), "abcdefghijklmnopqrstuvwxyz\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9", "")',
    '@role!="unit"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "font-identifier",
    "mathspeak.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    '@font="normal"',
    'not(contains(@grammar, "ignoreFont"))',
    '@role!="unit"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "omit-font",
    "mathspeak.default",
    "[n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font="italic"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "simple-fraction",
    "emacspeak.default",
    '[p] (pause:100); [n] children/*[1] (rate:0.35); [t] "over";  [n] children/*[2] (rate:-0.35); [p] (pause:100)',
    "self::fraction",
    'name(children/*[1])="number" or name(children/*[1])="identifier"',
    'name(children/*[2])="number" or name(children/*[2])="identifier"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "vulgar-fraction",
    "emacspeak.default",
    "[t] CSFvulgarFraction",
    "self::fraction",
    '@role="vulgar"',
    "CQFvulgarFractionSmall"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "fraction",
    "emacspeak.default",
    '[p] (pause:250); [n] children/*[1] (rate:0.35); [p] (pause:250); [t] "divided by"; [p] (pause:250);  [n] children/*[2] (rate:-0.35); [p] (pause:250)',
    "self::fraction"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "superscript",
    "emacspeak.default",
    '[n] children/*[1]; [t] "super"; [n] children/*[2] (pitch:0.35);[p] (pause:300)',
    "self::superscript"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "subscript",
    "emacspeak.default",
    '[n] children/*[1]; [t] "sub"; [n] children/*[2] (pitch:-0.35);[p] (pause:300)',
    "self::subscript"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "ellipsis",
    "emacspeak.default",
    '[p] (pause:200); [t] "ellipsis"; [p] (pause:300)',
    "self::punctuation",
    'self::punctuation[@role="ellipsis"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "fence-single",
    "emacspeak.default",
    "[n] text()",
    "self::punctuation",
    'self::punctuation[@role="openfence"]'
  );
  (0, sre.EmacspeakRules.defineRuleAlias_)(
    "fence-single",
    "self::punctuation",
    'self::punctuation[@role="closefence"]'
  );
  (0, sre.EmacspeakRules.defineRuleAlias_)(
    "fence-single",
    "self::punctuation",
    'self::punctuation[@role="vbar"]'
  );
  (0, sre.EmacspeakRules.defineRuleAlias_)(
    "fence-single",
    "self::punctuation",
    'self::punctuation[@role="application"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "omit-empty",
    "emacspeak.default",
    "[p] (pause:100)",
    "self::empty"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "fences-open-close",
    "emacspeak.default",
    "[p] (pause:200); [n] children/*[1] (rate:0.35); [p] (pause:200)",
    "self::fenced",
    '@role="leftright"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "fences-open-close-in-appl",
    "emacspeak.default",
    "[p] (pause:200); [n] children/*[1]; [p] (pause:200);",
    'self::fenced[@role="leftright"]',
    "./parent::children/parent::appl"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "fences-neutral",
    "emacspeak.default",
    '[p] (pause:100); [t] "absolute value of"; [n] children/*[1];[p] (pause:350);',
    "self::fenced",
    'self::fenced[@role="neutral"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "omit-fences",
    "emacspeak.default",
    "[p] (pause:500); [n] children/*[1]; [p] (pause:200);",
    "self::fenced"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "matrix",
    "emacspeak.default",
    '[t] "matrix"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:100)',
    "self::matrix"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "matrix-row",
    "emacspeak.default",
    '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
    'self::row[@role="matrix"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "matrix-cell",
    "emacspeak.default",
    "[n] children/*[1]",
    'self::cell[@role="matrix"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "vector",
    "emacspeak.default",
    '[t] "vector"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"element",pause:100)',
    "self::vector"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "cases",
    "emacspeak.default",
    '[t] "case statement"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"case",pause:100)',
    "self::cases"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "cases-row",
    "emacspeak.default",
    "[m] children/*",
    'self::row[@role="cases"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "cases-cell",
    "emacspeak.default",
    "[n] children/*[1]",
    'self::cell[@role="cases"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "row",
    "emacspeak.default",
    '[m] ./* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
    "self::row"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "cases-end",
    "emacspeak.default",
    '[t] "case statement"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"case",pause:100);[t] "end cases"',
    "self::cases",
    "following-sibling::*"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "multiline",
    "emacspeak.default",
    '[t] "multiline equation";[m] children/* (ctxtFunc:CTXFnodeCounter,context:"line",pause:100)',
    "self::multiline"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "line",
    "emacspeak.default",
    "[m] children/*",
    "self::line"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "table",
    "emacspeak.default",
    '[t] "multiline equation";[m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:200)',
    "self::table"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "table-row",
    "emacspeak.default",
    "[m] children/* (pause:100)",
    'self::row[@role="table"]'
  );
  (0, sre.EmacspeakRules.defineRuleAlias_)(
    "cases-cell",
    'self::cell[@role="table"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "end-punct",
    "emacspeak.default",
    "[m] children/*; [p] (pause:300)",
    "self::punctuated",
    '@role="endpunct"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "start-punct",
    "emacspeak.default",
    "[n] content/*[1]; [p] (pause:200); [m] children/*[position()>1]",
    "self::punctuated",
    '@role="startpunct"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "integral-punct",
    "emacspeak.default",
    "[n] children/*[1] (rate:0.2); [n] children/*[3] (rate:0.2)",
    "self::punctuated",
    '@role="integral"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "punctuated",
    "emacspeak.default",
    "[m] children/* (pause:100)",
    "self::punctuated"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "function",
    "emacspeak.default",
    "[n] text()",
    "self::function"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "appl",
    "emacspeak.default",
    "[n] children/*[1]; [n] content/*[1]; [n] children/*[2]",
    "self::appl"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "sum-only",
    "emacspeak.default",
    '[n] children/*[1]; [t] "from"; [n] children/*[2]; [t] "to";[n] children/*[3]',
    "self::limboth",
    '@role="sum" or @role="integral"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "limboth",
    "emacspeak.default",
    '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];[t] "under"; [n] children/*[3]; [p] (pause 250);',
    "self::limboth"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "limlower",
    "emacspeak.default",
    '[n] children/*[1]; [t] "over"; [n] children/*[2];',
    "self::limlower"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "limupper",
    "emacspeak.default",
    '[n] children/*[1]; [t] "under"; [n] children/*[2];',
    "self::limupper"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "largeop",
    "emacspeak.default",
    "[n] text()",
    "self::largeop"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "bigop",
    "emacspeak.default",
    '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];[p] (pause 250);',
    "self::bigop"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "integral",
    "emacspeak.default",
    "[n] children/*[1]; [p] (pause 100); [n] children/*[2];[p] (pause 200); [n] children/*[3] (rate:0.35);",
    "self::integral"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "sqrt",
    "emacspeak.default",
    '[t] "Square root of"; [n] children/*[1] (rate:0.35); [p] (pause:400)',
    "self::sqrt"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "square",
    "emacspeak.default",
    '[n] children/*[1]; [t] "squared" (pitch:0.35); [p] (pause:200)',
    "self::superscript",
    "children/*[2][text()=2]",
    'name(./children/*[1])!="text"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "cube",
    "emacspeak.default",
    '[n] children/*[1]; [t] "cubed" (pitch:0.35); [p] (pause:200)',
    "self::superscript",
    "children/*[2][text()=3]",
    'name(./children/*[1])!="text"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "root",
    "emacspeak.default",
    '[t] "root of order"; [n] children/*[1];[t] "over"; [n] children/*[1] (rate:0.35); [p] (pause:400)',
    "self::root"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "text-no-mult",
    "emacspeak.default",
    "[n] children/*[1]; [p] (pause:200); [n] children/*[2]",
    "self::infixop",
    "children/text"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "text",
    "emacspeak.default",
    "[n] text(); [p] (pause:200)",
    "self::text"
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "unit",
    "emacspeak.default",
    "[t] text() (annotation:unit, preprocess)",
    "self::identifier",
    '@role="unit"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "unit-square",
    "emacspeak.default",
    '[t] "square"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    "children/*[2][text()=2]",
    'name(children/*[1])="identifier"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "unit-cubic",
    "emacspeak.default",
    '[t] "cubic"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    "children/*[2][text()=3]",
    'name(children/*[1])="identifier"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "reciprocal",
    "emacspeak.default",
    '[t] "reciprocal"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    'name(children/*[1])="identifier"',
    'name(children/*[2])="prefixop"',
    'children/*[2][@role="negative"]',
    "children/*[2]/children/*[1][text()=1]",
    'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "reciprocal",
    "emacspeak.default",
    '[t] "per"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    'name(children/*[1])="identifier"',
    'name(children/*[2])="prefixop"',
    'children/*[2][@role="negative"]',
    "children/*[2]/children/*[1][text()=1]",
    'preceding-sibling::*[@role="unit"]'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "unit-combine",
    "emacspeak.default",
    "[m] children/*",
    "self::infixop",
    '@role="unit"'
  );
  (0, sre.EmacspeakRules.defineRule_)(
    "unit-divide",
    "emacspeak.default",
    '[n] children/*[1] (pitch:0.3); [t] "per"; [n] children/*[2] (pitch:-0.3)',
    "self::fraction",
    '@role="unit"'
  );
};
sre.EmacspeakRules.getInstance().initializer = [
  sre.EmacspeakRules.initCustomFunctions_,
  sre.EmacspeakRules.initSemanticRules_
];
sre.MathmlStore = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.MathmlStore, sre.MathStore);
goog.addSingletonGetter(sre.MathmlStore);
sre.MathmlStore.prototype.defineMathmlRule = function(a, b, c) {
  this.defineRule(a, b, c, "self::mathml:" + a);
};
sre.MathmlStore.prototype.defineDefaultMathmlRule = function(a, b) {
  this.defineRule(a, "default.default", b, "self::mathml:" + a);
};
sre.MathmlStoreRules = function() {
  sre.MathmlStore.call(this);
};
goog.inherits(sre.MathmlStoreRules, sre.MathmlStore);
goog.addSingletonGetter(sre.MathmlStoreRules);
sre.MathmlStoreRules.mathStore = sre.MathmlStoreRules.getInstance();
sre.MathmlStoreRules.defineDefaultMathmlRule_ = goog.bind(
  sre.MathmlStoreRules.mathStore.defineDefaultMathmlRule,
  sre.MathmlStoreRules.mathStore
);
sre.MathmlStoreRules.defineRule_ = goog.bind(
  sre.MathmlStoreRules.mathStore.defineRule,
  sre.MathmlStoreRules.mathStore
);
sre.MathmlStoreRules.defineRuleAlias_ = goog.bind(
  sre.MathmlStoreRules.mathStore.defineRuleAlias,
  sre.MathmlStoreRules.mathStore
);
sre.MathmlStoreRules.addContextFunction_ = goog.bind(
  sre.MathmlStoreRules.mathStore.contextFunctions.add,
  sre.MathmlStoreRules.mathStore.contextFunctions
);
sre.MathmlStoreRules.addCustomQuery_ = goog.bind(
  sre.MathmlStoreRules.mathStore.customQueries.add,
  sre.MathmlStoreRules.mathStore.customQueries
);
sre.MathmlStoreRules.initCustomFunctions_ = function() {
  (0, sre.MathmlStoreRules.addContextFunction_)(
    "CTXFnodeCounter",
    sre.StoreUtil.nodeCounter
  );
  (0, sre.MathmlStoreRules.addContextFunction_)(
    "CTXFmfSeparators",
    sre.MathmlStoreUtil.mfencedSeparators
  );
  (0, sre.MathmlStoreRules.addCustomQuery_)(
    "CQFextender",
    sre.MathmlStoreUtil.retrieveMathjaxExtender
  );
  (0, sre.MathmlStoreRules.addCustomQuery_)(
    "CQFmathmlmunder",
    sre.MathmlStoreUtil.checkMathjaxMunder
  );
  (0, sre.MathmlStoreRules.addCustomQuery_)(
    "CQFmathmlmover",
    sre.MathmlStoreUtil.checkMathjaxMover
  );
  (0, sre.MathmlStoreRules.addCustomQuery_)(
    "CQFmathmlmsub",
    sre.MathmlStoreUtil.checkMathjaxMsub
  );
  (0, sre.MathmlStoreRules.addCustomQuery_)(
    "CQFmathmlmsup",
    sre.MathmlStoreUtil.checkMathjaxMsup
  );
  (0, sre.MathmlStoreRules.addCustomQuery_)(
    "CQFlookupleaf",
    sre.MathmlStoreUtil.retrieveMathjaxLeaf
  );
};
sre.MathmlStoreRules.initDefaultRules_ = function() {
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("math", "[m] ./*");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("semantics", "[n] ./*[1]");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "mspace",
    "[p] (pause:250)"
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("mstyle", "[m] ./*");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("mpadded", "[m] ./*");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("merror", "[m] ./*");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("mphantom", "[m] ./*");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "mtext",
    "[t] text(); [p] (pause:200)"
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("mi", "[n] text()");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "mo",
    "[n] text() (rate:-0.1)"
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("mn", "[n] text()");
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtext-variant",
    "default.default",
    '[t] "begin"; [t] @mathvariant (pause:150);[t] text() (pause:150); [t] "end"; [t] @mathvariant (pause:200)',
    "self::mathml:mtext",
    "@mathvariant",
    '@mathvariant!="normal"'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mi-variant",
    "default.default",
    "[t] @mathvariant; [n] text()",
    "self::mathml:mi",
    "@mathvariant",
    '@mathvariant!="normal"'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mi-variant",
    "self::mathml:mn",
    "@mathvariant",
    '@mathvariant!="normal"'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mo-variant",
    "default.default",
    "[t] @mathvariant; [n] text() (rate:-0.1)",
    "self::mathml:mo",
    "@mathvariant",
    '@mathvariant!="normal"'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "ms",
    '[t] "string" (pitch:0.5, rate:0.5); [t] text()'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "unit",
    "default.default",
    '[t] text() (grammar:annotation="unit":translate)',
    "self::mathml:mi",
    '@class="MathML-Unit"'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "msup",
    '[n] ./*[1]; [t] "super";[n] ./*[2] (pitch:0.35); [p] (pause:300)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "msubsup",
    '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);[t] "super"; [n] ./*[3] (pitch:0.35); [p] (pause:300)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "msub",
    '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:300)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "mover",
    '[n] ./*[2] (pitch:0.35); [p] (pause:200); [t] "over"; [n] ./*[1]; [p] (pause:400)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "munder",
    '[n] ./*[2] (pitch:-0.35); [t] "under"; [n] ./*[1]; [p] (pause:400)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "munderover",
    '[n] ./*[2] (pitch:-0.35); [t] "under and"; [n] ./*[3] (pitch:0.35); [t] "over"; [n] ./*[1]; [p] (pause:400)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)("mrow", "[m] ./*");
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "msqrt",
    '[t] "Square root of"; [m] ./* (rate:0.2); [p] (pause:400)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "mroot",
    '[t] "root of order"; [n] ./*[2]; [t] "of";[n] ./*[1] (rate:0.2); [p] (pause:400)'
  );
  (0, sre.MathmlStoreRules.defineDefaultMathmlRule_)(
    "mfrac",
    ' [p] (pause:400); [n] ./*[1] (pitch:0.3); [t] "divided by"; [n] ./*[2] (pitch:-0.3); [p] (pause:400)'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfrac",
    "default.short",
    '[p] (pause:200); [t] "start frac";[n] ./*[1] (pitch:0.3); [t] "over"; [n] ./*[2] (pitch:-0.3); [p] (pause:400); [t] "end frac"',
    "self::mathml:mfrac"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-single",
    "default.default",
    "[n] @open; [m] ./* (separator:@separators); [n] @close",
    "self::mathml:mfenced",
    "@open",
    "@close",
    "string-length(string(@separators))=1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-single",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./* (separator:@separators); [n] @close',
    "self::mathml:mfenced",
    "not(@open)",
    "@close",
    "string-length(string(@separators))=1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-single",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./* (separator:@separators); [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "not(@open)",
    "not(@close)",
    "string-length(string(@separators))=1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-single",
    "default.default",
    '[n] @open; [m] ./* (separator:@separators); [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "@open",
    "not(@close)",
    "string-length(string(@separators))=1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-omit",
    "default.default",
    "[n] @open; [m] ./*; [n] @close",
    "self::mathml:mfenced",
    "@separators",
    "@open",
    "@close",
    'string(@separators)="" or string(@separators)=" "'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-omit",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./*; [n] @close',
    "self::mathml:mfenced",
    "@separators",
    "not(@open)",
    "@close",
    'string(@separators)="" or string(@separators)=" "'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-omit",
    "default.default",
    '[n] @open; [m] ./*; [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "@separators",
    "@open",
    "not(@close)",
    'string(@separators)="" or string(@separators)=" "'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-omit",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./*; [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "@separators",
    "not(@open)",
    "not(@close)",
    'string(@separators)="" or string(@separators)=" "'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-comma",
    "default.default",
    '[n] @open; [m] ./* (separator:"comma"); [n] @close',
    "self::mathml:mfenced",
    "@open",
    "@close",
    "not(@separators)"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-comma",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./* (separator:"comma"); [n] @close',
    "self::mathml:mfenced",
    "not(@open)",
    "@close",
    "not(@separators)"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-comma",
    "default.default",
    '[n] @open; [m] ./* (separator:"comma"); [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "@open",
    "not(@close)",
    "not(@separators)"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-comma",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./* (separator:"comma"); [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "not(@open)",
    "not(@close)",
    "not(@separators)"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-multi",
    "default.default",
    "[n] @open; [m] ./* (sepFunc:CTXFmfSeparators, separator:@separators); [n] @close",
    "self::mathml:mfenced",
    "@open",
    "@close",
    "string-length(string(@separators))>1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-multi",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./* (sepFunc:CTXFmfSeparators, separator:@separators); [n] @close',
    "self::mathml:mfenced",
    "not(@open)",
    "@close",
    "string-length(string(@separators))>1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-multi",
    "default.default",
    '[n] @open; [m] ./* (sepFunc:CTXFmfSeparators, separator:@separators); [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "@open",
    "not(@close)",
    "string-length(string(@separators))>1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mfenced-multi",
    "default.default",
    '[t] "(" (grammar:translate); [m] ./* (sepFunc:CTXFmfSeparators, separator:@separators); [t] ")" (grammar:translate)',
    "self::mathml:mfenced",
    "not(@open)",
    "not(@close)",
    "string-length(string(@separators))>1"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtable",
    "default.default",
    '[t] "matrix"; [m] ./* (ctxtFunc:CTXFnodeCounter,context:"row",pause:100)',
    "self::mathml:mtable"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtr",
    "default.default",
    '[m] ./* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
    "self::mathml:mtr"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtd",
    "default.default",
    "[m] ./*",
    "self::mathml:mtd"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtable",
    "default.superbrief",
    '[t] count(child::mathml:mtr);  [t] "by";[t] count(child::mathml:mtr[1]/mathml:mtd); [t] "matrix";',
    "self::mathml:mtable"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtable",
    "default.short",
    '[t] "matrix"; [m] ./*',
    "self::mathml:mtable"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtr",
    "default.short",
    "[m] ./*",
    "self::mathml:mtr"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mtd",
    "default.short",
    '[t] "Element"; [t] count(./preceding-sibling::mathml:mtd)+1;[t] count(./parent::mathml:mtr/preceding-sibling::mathml:mtr)+1;[p] (pause:500); [m] ./*',
    "self::mathml:mtd"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-4",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
    "self::mathml:mmultiscripts"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-3-1",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
    "self::mathml:mmultiscripts",
    "./mathml:none=./*[2]",
    "./mathml:mprescripts=./*[4]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-3-2",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);',
    "self::mathml:mmultiscripts",
    "./mathml:none=./*[3]",
    "./mathml:mprescripts=./*[4]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-3-3",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
    "self::mathml:mmultiscripts",
    "./mathml:none=./*[5]",
    "./mathml:mprescripts=./*[4]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-3-4",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
    "self::mathml:mmultiscripts",
    "./mathml:none=./*[6]",
    "./mathml:mprescripts=./*[4]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-2-1",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:300);',
    "self::mathml:mmultiscripts",
    "./mathml:none=./*[2]",
    "./mathml:none=./*[3]",
    "./mathml:mprescripts=./*[4]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-1-1",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:300);',
    "self::mathml:mmultiscripts",
    "./mathml:none=./*[2]",
    "./mathml:none=./*[3]",
    "./mathml:mprescripts=./*[4]",
    "./mathml:none=./*[5]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mmultiscripts-1-2",
    "default.default",
    '[n] ./*[1]; [p] (pause:200);[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);',
    "self::mathml:mmultiscripts",
    "./mathml:none=./*[2]",
    "./mathml:none=./*[3]",
    "./mathml:mprescripts=./*[4]",
    "./mathml:none=./*[6]"
  );
};
sre.MathmlStoreRules.initMathjaxRules_ = function() {
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-math",
    "default.default",
    "[n] ./*[1]/*[1]/*[1]",
    'self::span[@class="math"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-leaf",
    "default.default",
    "[n] CQFlookupleaf",
    'self::span[@class="mi"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-leaf",
    'self::span[@class="mo"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-leaf",
    'self::span[@class="mn"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-leaf",
    'self::span[@class="mtext"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-mo-ext",
    "default.default",
    "[n] CQFextender",
    'self::span[@class="mo"]',
    "./*[1]/*[1]/text()",
    "./*[1]/*[2]/text()"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-texatom",
    "default.default",
    "[n] ./*[1]",
    'self::span[@class="texatom"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-msubsup",
    "default.default",
    '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] (pitch:-0.35);[p] (pause:200); [t] "super"; [n] ./*[1]/*[2]/*[1] (pitch:0.35);[p] (pause:300)',
    'self::span[@class="msubsup"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-msub",
    "default.default",
    '[n] ./*[1]/*[1]/*[1]; [t] "sub";[n] ./*[1]/*[2]/*[1] (pitch:-0.35); [p] (pause:300)',
    'self::span[@class="msub"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-msup",
    "default.default",
    '[n] ./*[1]/*[1]/*[1]; [t] "super";[n] ./*[1]/*[2]/*[1] (pitch:0.35); [p] (pause:300)',
    'self::span[@class="msup"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-munderover",
    "default.default",
    '[n] ./*[1]/*[2]/*[1] (pitch:0.35); [t] "under and";[n] ./*[1]/*[3]/*[1] (pitch:-0.35); [t] "over";[n] ./*[1]/*[1]/*[1]; [p] (pause:400)',
    'self::span[@class="munderover"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-munder",
    "default.default",
    '[n] ./*[1]/*[2]/*[1] (pitch:0.35); [t] "under";[n] ./*[1]/*[1]/*[1]; [p] (pause:400)',
    'self::span[@class="munder"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-mover",
    "default.default",
    '[n] ./*[1]/*[2]/*[1] (pitch:0.35); [t] "over";[n] ./*[1]/*[1]/*[1]; [p] (pause:400)',
    'self::span[@class="mover"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-mfrac",
    "default.default",
    '[p] (pause:250); [n] ./*[1]/*[1]/*[1] (pitch:0.3); [p] (pause:250); [t] "divided by"; [n] ./*[1]/*[2]/*[1] (pitch:-0.3);[p] (pause:400)',
    'self::span[@class="mfrac"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-msqrt",
    "default.default",
    '[t] "Square root of";[n] ./*[1]/*[1]/*[1] (rate:0.2); [p] (pause:400)',
    'self::span[@class="msqrt"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-mroot",
    "default.default",
    '[t] "root of order"; [n] ./*[1]/*[4]/*[1]; [t] "of";[n] ./*[1]/*[1]/*[1] (rate:0.2); [p] (pause:400)',
    'self::span[@class="mroot"]'
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-mfenced",
    "default.default",
    '[t] "opening"; [n] ./*[1]; [m] ./*[position()>1 and position()<last()]; [t] "closing"; [n] ./*[last()]',
    'self::span[@class="mfenced"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-leaf",
    'self::span[@class="mtable"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-leaf",
    'self::span[@class="mmultiscripts"]'
  );
};
sre.MathmlStoreRules.initAliases_ = function() {
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mspace",
    'self::span[@class="mspace"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mstyle",
    'self::span[@class="mstyle"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mpadded",
    'self::span[@class="mpadded"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "merror",
    'self::span[@class="merror"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mphantom",
    'self::span[@class="mphantom"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)("ms", 'self::span[@class="ms"]');
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mrow",
    'self::span[@class="mrow"]'
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-msub",
    'self::span[@class="msubsup"]',
    "CQFmathmlmsub"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-msup",
    'self::span[@class="msubsup"]',
    "CQFmathmlmsup"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-munder",
    'self::span[@class="munderover"]',
    "CQFmathmlmunder"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-mover",
    'self::span[@class="munderover"]',
    "CQFmathmlmover"
  );
};
sre.MathmlStoreRules.initSpecializationRules_ = function() {
  (0, sre.MathmlStoreRules.defineRule_)(
    "square",
    "default.default",
    '[n] ./*[1]; [t] "square" (pitch:0.35); [p] (pause:300)',
    "self::mathml:msup",
    "./*[2][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "square",
    "self::mathml:msup",
    "./mathml:mrow=./*[2]",
    "count(./*[2]/*)=1",
    "./*[2]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "cube",
    "default.default",
    '[n] ./*[1]; [t] "cube" (pitch:0.35); [p] (pause:300)',
    "self::mathml:msup",
    "./*[2][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "cube",
    "self::mathml:msup",
    "./mathml:mrow=./*[2]",
    "count(./*[2]/*)=1",
    "./*[2]/*[1][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "square-sub",
    "default.default",
    '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35);[p] (pause:300); [t] "square" (pitch:0.35); [p] (pause:400)',
    "self::mathml:msubsup",
    "./*[3][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "square-sub",
    "self::mathml:msubsup",
    "./mathml:mrow=./*[3]",
    "count(./*[3]/*)=1",
    "./*[3]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "cube-sub",
    "default.default",
    '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35);[p] (pause:300); [t] "cube" (pitch:0.35); [p] (pause:400)',
    "self::mathml:msubsup",
    "./*[3][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "cube-sub",
    "self::mathml:msubsup",
    "./mathml:mrow=./*[3]",
    "count(./*[3]/*)=1",
    "./*[3]/*[1][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-square",
    "default.default",
    '[n] ./*[1]/*[1]/*[1]; [t] "square" (pitch:0.35); [p] (pause:300)',
    'self::span[@class="msup"]',
    "./*[1]/*[2]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-square",
    'self::span[@class="msup"]',
    './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
    "count(./*[1]/*[2]/*[1]/*)=1",
    "./*[1]/*[2]/*[1]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-square",
    'self::span[@class="msubsup"]',
    "CQFmathmlmsup",
    "./*[1]/*[2]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-square",
    'self::span[@class="msubsup"]',
    "CQFmathmlmsup",
    './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
    "count(./*[1]/*[2]/*[1]/*)=1",
    "./*[1]/*[2]/*[1]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-cube",
    "default.default",
    '[n] ./*[1]/*[1]/*[1]; [t] "cube" (pitch:0.35); [p] (pause:300)',
    'self::span[@class="msup"]',
    "./*[1]/*[2]/*[1][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-cube",
    'self::span[@class="msup"]',
    './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
    "count(./*[1]/*[2]/*[1]/*)=1",
    "./*[1]/*[2]/*[1]/*[1][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-cube",
    'self::span[@class="msubsup"]',
    "CQFmathmlmsup",
    "./*[1]/*[2]/*[1][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-cube",
    'self::span[@class="msubsup"]',
    "CQFmathmlmsup",
    './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
    "count(./*[1]/*[2]/*[1]/*)=1",
    "./*[1]/*[2]/*[1]/*[1][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-square-sub",
    "default.default",
    '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] (pitch:-0.35); [p] (pause:300); [t] "square" (pitch:0.35); [p] (pause:400)',
    'self::span[@class="msubsup"]',
    "./*[1]/*[2]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-square-sub",
    'self::span[@class="msubsup"]',
    './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
    "count(./*[1]/*[2]/*[1]/*)=1",
    "./*[1]/*[2]/*[1]/*[1][text()=2]"
  );
  (0, sre.MathmlStoreRules.defineRule_)(
    "mj-cube-sub",
    "default.default",
    '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] (pitch:-0.35); [p] (pause:300); [t] "cube" (pitch:0.35); [p] (pause:400)',
    'self::span[@class="msubsup"]',
    "./*[1]/*[2]/*[1][text()=3]"
  );
  (0, sre.MathmlStoreRules.defineRuleAlias_)(
    "mj-cube-sub",
    'self::span[@class="msubsup"]',
    './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
    "count(./*[1]/*[2]/*[1]/*)=1",
    "./*[1]/*[2]/*[1]/*[1][text()=3]"
  );
};
sre.MathmlStoreRules.getInstance().initializer = [
  sre.MathmlStoreRules.initCustomFunctions_,
  sre.MathmlStoreRules.initDefaultRules_,
  sre.MathmlStoreRules.initMathjaxRules_,
  sre.MathmlStoreRules.initAliases_,
  sre.MathmlStoreRules.initSpecializationRules_
];
sre.MathspeakRules = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.MathspeakRules, sre.MathStore);
goog.addSingletonGetter(sre.MathspeakRules);
sre.MathspeakRules.mathStore = sre.MathspeakRules.getInstance();
sre.MathspeakRules.defineRule_ = goog.bind(
  sre.MathspeakRules.mathStore.defineRule,
  sre.MathspeakRules.mathStore
);
sre.MathspeakRules.defineRuleAlias_ = goog.bind(
  sre.MathspeakRules.mathStore.defineRulesAlias,
  sre.MathspeakRules.mathStore
);
sre.MathspeakRules.defineSpecialisedRule_ = goog.bind(
  sre.MathspeakRules.mathStore.defineSpecialisedRule,
  sre.MathspeakRules.mathStore
);
sre.MathspeakRules.addContextFunction_ = goog.bind(
  sre.MathspeakRules.mathStore.contextFunctions.add,
  sre.MathspeakRules.mathStore.contextFunctions
);
sre.MathspeakRules.addCustomQuery_ = goog.bind(
  sre.MathspeakRules.mathStore.customQueries.add,
  sre.MathspeakRules.mathStore.customQueries
);
sre.MathspeakRules.addCustomString_ = goog.bind(
  sre.MathspeakRules.mathStore.customStrings.add,
  sre.MathspeakRules.mathStore.customStrings
);
sre.MathspeakRules.initCustomFunctions_ = function() {
  (0, sre.MathspeakRules.addCustomQuery_)(
    "CQFspaceoutNumber",
    sre.MathspeakUtil.spaceoutNumber
  );
  (0, sre.MathspeakRules.addCustomQuery_)(
    "CQFspaceoutIdentifier",
    sre.MathspeakUtil.spaceoutIdentifier
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFspaceoutText",
    sre.MathspeakUtil.spaceoutText
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFopenFracVerbose",
    sre.MathspeakUtil.openingFractionVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFcloseFracVerbose",
    sre.MathspeakUtil.closingFractionVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFoverFracVerbose",
    sre.MathspeakUtil.overFractionVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFopenFracBrief",
    sre.MathspeakUtil.openingFractionBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFcloseFracBrief",
    sre.MathspeakUtil.closingFractionBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFopenFracSbrief",
    sre.MathspeakUtil.openingFractionSbrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFcloseFracSbrief",
    sre.MathspeakUtil.closingFractionSbrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFoverFracSbrief",
    sre.MathspeakUtil.overFractionSbrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFvulgarFraction",
    sre.MathspeakUtil.vulgarFraction
  );
  (0, sre.MathspeakRules.addCustomQuery_)(
    "CQFvulgarFractionSmall",
    sre.MathspeakUtil.isSmallVulgarFraction
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFopenRadicalVerbose",
    sre.MathspeakUtil.openingRadicalVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFcloseRadicalVerbose",
    sre.MathspeakUtil.closingRadicalVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFindexRadicalVerbose",
    sre.MathspeakUtil.indexRadicalVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFopenRadicalBrief",
    sre.MathspeakUtil.openingRadicalBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFcloseRadicalBrief",
    sre.MathspeakUtil.closingRadicalBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFindexRadicalBrief",
    sre.MathspeakUtil.indexRadicalBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFopenRadicalSbrief",
    sre.MathspeakUtil.openingRadicalSbrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFindexRadicalSbrief",
    sre.MathspeakUtil.indexRadicalSbrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFsuperscriptVerbose",
    sre.MathspeakUtil.superscriptVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFsuperscriptBrief",
    sre.MathspeakUtil.superscriptBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFsubscriptVerbose",
    sre.MathspeakUtil.subscriptVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFsubscriptBrief",
    sre.MathspeakUtil.subscriptBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFbaselineVerbose",
    sre.MathspeakUtil.baselineVerbose
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFbaselineBrief",
    sre.MathspeakUtil.baselineBrief
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFunderscript",
    sre.MathspeakUtil.nestedUnderscore
  );
  (0, sre.MathspeakRules.addCustomString_)(
    "CSFoverscript",
    sre.MathspeakUtil.nestedOverscore
  );
  (0, sre.MathspeakRules.addContextFunction_)(
    "CTXFordinalCounter",
    sre.MathspeakUtil.ordinalCounter
  );
  (0, sre.MathspeakRules.addContextFunction_)(
    "CTXFcontentIterator",
    sre.MathmlStoreUtil.contentIterator
  );
  (0, sre.MathspeakRules.addCustomQuery_)(
    "CQFdetIsSimple",
    sre.MathspeakUtil.determinantIsSimple
  );
};
sre.MathspeakRules.initMathspeakRules_ = function() {
  (0, sre.MathspeakRules.defineRule_)(
    "stree",
    "mathspeak.default",
    "[n] ./*[1]",
    "self::stree"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "unknown",
    "mathspeak.default",
    "[n] text()",
    "self::unknown"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "protected",
    "mathspeak.default",
    "[t] text()",
    "self::*",
    '@role="protected"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "omit-empty",
    "mathspeak.default",
    "",
    "self::empty"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "blank-empty",
    "mathspeak.default",
    '[t] "Blank"',
    "self::empty",
    "count(../*)=1",
    'name(../..)="cell" or name(../..)="line"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "font",
    "mathspeak.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::*",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font!="normal"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "font-identifier-short",
    "mathspeak.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font="normal"',
    '""=translate(text(), "abcdefghijklmnopqrstuvwxyz\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9", "")',
    '@role!="unit"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "font-identifier",
    "mathspeak.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    '@font="normal"',
    'not(contains(@grammar, "ignoreFont"))',
    '@role!="unit"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "omit-font",
    "mathspeak.default",
    "[n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font="italic"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "german-font",
    "mathspeak.default",
    '[t] "German"; [n] self::* (grammar:ignoreFont=@font)',
    "self::*",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font="fraktur"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "german-font",
    "mathspeak.default",
    '[t] "bold German"; [n] self::* (grammar:ignoreFont=@font)',
    "self::*",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font="bold-fraktur"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "number",
    "mathspeak.default",
    "[n] text()",
    "self::number"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "mixed-number",
    "mathspeak.default",
    '[n] children/*[1]; [t] "and"; [n] children/*[2]; ',
    "self::number",
    '@role="mixed"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "number-with-chars",
    "mathspeak.default",
    '[t] "Number"; [m] CQFspaceoutNumber',
    "self::number",
    '"" != translate(text(), "0123456789.,", "")',
    'text() != translate(text(), "0123456789.,", "")'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "number-with-chars",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "Num"; [m] CQFspaceoutNumber'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "number-with-chars",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "number-as-upper-word",
    "mathspeak.default",
    '[t] "UpperWord"; [t] CSFspaceoutText',
    "self::number",
    "string-length(text())>1",
    'text()=translate(text(), "abcdefghijklmnopqrstuvwxyz\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9", "ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9")',
    '""=translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9","")'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "number-baseline",
    "mathspeak.default",
    '[t] "Baseline"; [n] text()',
    "self::number",
    'not(contains(@grammar, "ignoreFont"))',
    "preceding-sibling::identifier",
    'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or @role="otherletter"]',
    'parent::*/parent::infixop[@role="implicit"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "number-baseline",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "Base"; [n] text()'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "number-baseline",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "number-baseline-font",
    "mathspeak.default",
    '[t] "Baseline"; [t] @font; [n] self::* (grammar:ignoreFont=@font)',
    "self::number",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font!="normal"',
    "preceding-sibling::identifier",
    'preceding-sibling::*[@role="latinletter" or @role="greekletter" or @role="otherletter"]',
    'parent::*/parent::infixop[@role="implicit"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "number-baseline-font",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "Base"; [n] text()'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "number-baseline-font",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "identifier",
    "mathspeak.default",
    "[m] CQFspaceoutIdentifier",
    "self::identifier",
    "string-length(text())>1",
    '@role!="unit"',
    '@role!="protected"',
    'not(@font) or @font="normal" or contains(@grammar, "ignoreFont")'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "identifier",
    "mathspeak.default",
    "[n] text()",
    "self::identifier",
    '@role="protected"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "negative",
    "mathspeak.default",
    '[t] "negative"; [n] children/*[1]',
    "self::prefixop",
    '@role="negative"',
    "children/identifier"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "negative",
    "self::prefixop",
    '@role="negative"',
    "children/number"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "negative",
    "self::prefixop",
    '@role="negative"',
    'children/fraction[@role="vulgar"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "negative",
    "mathspeak.default",
    '[t] "minus"; [n] children/*[1]',
    "self::prefixop",
    '@role="negative"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "prefix",
    "mathspeak.default",
    "[n] text(); [n] children/*[1]",
    "self::prefixop"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "postfix",
    "mathspeak.default",
    "[n] children/*[1]; [n] text()",
    "self::postfixop"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "binary-operation",
    "mathspeak.default",
    "[m] children/* (sepFunc:CTXFcontentIterator);",
    "self::infixop"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "implicit",
    "mathspeak.default",
    "[m] children/*",
    "self::infixop",
    '@role="implicit"'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "implicit",
    "self::infixop",
    '@role="leftsuper" or @role="leftsub" or @role="rightsuper" or @role="rightsub"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "subtraction",
    "mathspeak.default",
    '[m] children/* (separator:"minus");',
    "self::infixop",
    '@role="subtraction"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "function-unknown",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2]",
    "self::appl"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "function-prefix",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2]",
    "self::appl",
    'children/*[1][@role="prefix function"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "fences-open-close",
    "mathspeak.default",
    "[n] content/*[1]; [n] children/*[1]; [n] content/*[2]",
    "self::fenced",
    '@role="leftright"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "fences-neutral",
    "mathspeak.default",
    '[t] "StartAbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"',
    "self::fenced",
    '@role="neutral"',
    'content/*[1][text()]="|" or content/*[1][text()]="\u2758" or content/*[1][text()]="\uff5c"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "fences-neutral",
    "mathspeak.default",
    "mathspeak.sbrief",
    '[t] "AbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "fences-neutral",
    "mathspeak.default",
    "[n] content/*[1]; [n] children/*[1]; [n] content/*[2]",
    "self::fenced",
    '@role="neutral"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "fences-set",
    "mathspeak.default",
    '[t] "StartSet"; [n] children/*[1]; [t] "EndSet"',
    "self::fenced",
    '@role="leftright"',
    'content/*[1][text()]="{"',
    'content/*[2][text()]="}"',
    "count(children/*)=1",
    'not(name(../..)="appl")'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "fences-set",
    "mathspeak.default",
    "mathspeak.sbrief",
    '[t] "Set"; [n] children/*[1]; [t] "EndSet"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "text",
    "mathspeak.default",
    "[n] text()",
    "self::text"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "factorial",
    "mathspeak.default",
    '[t] "factorial"',
    "self::punctuation",
    'text()="!"',
    'name(preceding-sibling::*[1])!="text"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "minus",
    "mathspeak.default",
    '[t] "minus"',
    "self::operator",
    'text()="-"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "single-prime",
    "mathspeak.default",
    '[t] "prime"',
    "self::punctuated",
    '@role="prime"',
    "count(children/*)=1"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "double-prime",
    "mathspeak.default",
    '[t] "double-prime"',
    "self::punctuated",
    '@role="prime"',
    "count(children/*)=2"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "triple-prime",
    "mathspeak.default",
    '[t] "triple-prime"',
    "self::punctuated",
    '@role="prime"',
    "count(children/*)=3"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "quadruple-prime",
    "mathspeak.default",
    '[t] "quadruple-prime"',
    "self::punctuated",
    '@role="prime"',
    "count(children/*)=4"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "counted-prime",
    "mathspeak.default",
    '[t] count(children/*); [t] "prime"',
    "self::punctuated",
    '@role="prime"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "fraction",
    "mathspeak.default",
    "[t] CSFopenFracVerbose; [n] children/*[1]; [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose",
    "self::fraction"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "fraction",
    "mathspeak.brief",
    "[t] CSFopenFracBrief; [n] children/*[1]; [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief",
    "self::fraction"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "fraction",
    "mathspeak.sbrief",
    "[t] CSFopenFracSbrief; [n] children/*[1]; [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief",
    "self::fraction"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "vulgar-fraction",
    "mathspeak.default",
    "[t] CSFvulgarFraction",
    "self::fraction",
    '@role="vulgar"',
    "CQFvulgarFractionSmall"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "vulgar-fraction",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "vulgar-fraction",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "continued-fraction-outer",
    "mathspeak.default",
    '[t] "ContinuedFraction"; [n] children/*[1];[t] "Over"; [n] children/*[2]',
    "self::fraction",
    "not(ancestor::fraction)",
    'children/*[2]/descendant-or-self::*[@role="ellipsis" and not(following-sibling::*)]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "continued-fraction-outer",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "ContinuedFrac"; [n] children/*[1];[t] "Over"; [n] children/*[2]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "continued-fraction-outer",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "continued-fraction-inner",
    "mathspeak.default",
    '[t] "StartFraction"; [n] children/*[1];[t] "Over"; [n] children/*[2]',
    "self::fraction",
    "ancestor::fraction",
    'children/*[2]/descendant-or-self::*[@role="ellipsis" and not(following-sibling::*)]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "continued-fraction-inner",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "StartFrac"; [n] children/*[1];[t] "Over"; [n] children/*[2]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "continued-fraction-inner",
    "mathspeak.brief",
    "mathspeak.sbrief",
    '[t] "Frac"; [n] children/*[1];[t] "Over"; [n] children/*[2]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "sqrt",
    "mathspeak.default",
    "[t] CSFopenRadicalVerbose; [n] children/*[1]; [t] CSFcloseRadicalVerbose",
    "self::sqrt"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "sqrt",
    "mathspeak.brief",
    "[t] CSFopenRadicalBrief; [n] children/*[1]; [t] CSFcloseRadicalBrief",
    "self::sqrt"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "sqrt",
    "mathspeak.sbrief",
    "[t] CSFopenRadicalSbrief; [n] children/*[1]; [t] CSFcloseRadicalBrief",
    "self::sqrt"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "root",
    "mathspeak.default",
    "[t] CSFindexRadicalVerbose; [n] children/*[1];[t] CSFopenRadicalVerbose; [n] children/*[2]; [t] CSFcloseRadicalVerbose",
    "self::root"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "root",
    "mathspeak.brief",
    "[t] CSFindexRadicalBrief; [n] children/*[1];[t] CSFopenRadicalBrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
    "self::root"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "root",
    "mathspeak.sbrief",
    "[t] CSFindexRadicalSbrief; [n] children/*[1];[t] CSFopenRadicalSbrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
    "self::root"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "limboth",
    "mathspeak.default",
    "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];[t] CSFoverscript; [n] children/*[3]",
    "self::limboth",
    'name(../..)="underscore" or name(../..)="overscore"',
    'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "limlower",
    "mathspeak.default",
    "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];",
    "self::limlower",
    'name(../..)="underscore" or name(../..)="overscore"',
    'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "limupper",
    "mathspeak.default",
    "[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];",
    "self::limupper",
    'name(../..)="underscore" or name(../..)="overscore"',
    'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "limlower",
    "self::underscore",
    '@role="limit function"',
    'name(../..)="underscore" or name(../..)="overscore"',
    'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "limlower",
    "self::underscore",
    'children/*[2][@role!="underaccent"]',
    'name(../..)="underscore" or name(../..)="overscore"',
    'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "limupper",
    "self::overscore",
    'children/*[2][@role!="overaccent"]',
    'name(../..)="underscore" or name(../..)="overscore"',
    'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "limboth-end",
    "mathspeak.default",
    '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];[t] CSFoverscript; [n] children/*[3]; [t] "Endscripts"',
    "self::limboth"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "limlower-end",
    "mathspeak.default",
    '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2]; [t] "Endscripts"',
    "self::limlower"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "limupper-end",
    "mathspeak.default",
    '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2]; [t] "Endscripts"',
    "self::limupper"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "limlower-end",
    "self::underscore",
    '@role="limit function"'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)("limlower-end", "self::underscore");
  (0, sre.MathspeakRules.defineRuleAlias_)("limupper-end", "self::overscore");
  (0, sre.MathspeakRules.defineRule_)(
    "integral",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2]; [n] children/*[3];",
    "self::integral"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "integral",
    "mathspeak.default",
    '[n] children/*[1]; [t] "Subscript"; [n] children/*[2];[t] "Superscript"; [n] children/*[3]; [t] "Baseline";',
    "self::limboth",
    '@role="integral"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "integral",
    "mathspeak.default",
    "mathspeak.brief",
    '[n] children/*[1]; [t] "Sub"; [n] children/*[2];[t] "Sup"; [n] children/*[3]; [t] "Base";'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "integral",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "bigop",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2];",
    "self::bigop"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "relseq",
    "mathspeak.default",
    "[m] children/* (sepFunc:CTXFcontentIterator)",
    "self::relseq"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "equality",
    "mathspeak.default",
    "[n] children/*[1]; [n] content/*[1]; [n] children/*[2]",
    "self::relseq",
    '@role="equality"',
    "count(./children/*)=2"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "multi-equality",
    "mathspeak.default",
    "[m] ./children/* (sepFunc:CTXFcontentIterator)",
    "self::relseq",
    '@role="equality"',
    "count(./children/*)>2"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "multrel",
    "mathspeak.default",
    "[m] children/* (sepFunc:CTXFcontentIterator)",
    "self::multirel"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "subscript",
    "mathspeak.default",
    "[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]",
    "self::subscript"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "subscript",
    "mathspeak.brief",
    "[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]",
    "self::subscript"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "subscript",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "subscript-simple",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2]",
    "self::subscript",
    'name(./children/*[1])="identifier"',
    'name(./children/*[2])="number"',
    './children/*[2][@role!="mixed"]',
    './children/*[2][@role!="othernumber"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "subscript-simple",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "subscript-simple",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "subscript-baseline",
    "mathspeak.default",
    "[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]; [t] CSFbaselineVerbose",
    "self::subscript",
    "following-sibling::*",
    'not(name(following-sibling::subscript/children/*[1])="empty" or (name(following-sibling::infixop[@role="implicit"]/children/*[1])="subscript" and name(following-sibling::*/children/*[1]/children/*[1])="empty")) and @role!="subsup"',
    'not(following-sibling::*[@role="rightsuper" or @role="rightsub" or @role="leftsub" or @role="leftsub"])'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "subscript-baseline",
    "mathspeak.default",
    "mathspeak.brief",
    "[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]; [t] CSFbaselineBrief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "subscript-baseline",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "subscript-baseline",
    "self::subscript",
    "not(following-sibling::*)",
    "ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::punctuated|ancestor::fraction",
    'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub" or @role="rightsuper" or @role="rightsub"])'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "subscript-baseline",
    "self::subscript",
    "not(following-sibling::*)",
    "ancestor::relseq|ancestor::multirel",
    sre.MathspeakUtil.generateBaselineConstraint()
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "subscript-baseline",
    "self::subscript",
    "not(following-sibling::*)",
    "@embellished"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "subscript-empty-sup",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2]",
    "self::subscript",
    'name(children/*[2])="infixop"',
    'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
    'name(children/*[2]/children/*[1]/children/*[1])="empty"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "subscript-empty-sup",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "subscript-empty-sup",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "subscript-empty-sup",
    "self::subscript",
    'name(children/*[2])="superscript"',
    'name(children/*[2]/children/*[1])="empty"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "superscript",
    "mathspeak.default",
    "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]",
    "self::superscript"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "superscript",
    "mathspeak.default",
    "mathspeak.brief",
    "[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "superscript",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "superscript-baseline",
    "mathspeak.default",
    "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];[t] CSFbaselineVerbose",
    "self::superscript",
    "following-sibling::*",
    'not(name(following-sibling::superscript/children/*[1])="empty" or (name(following-sibling::infixop[@role="implicit"]/children/*[1])="superscript" and name(following-sibling::*/children/*[1]/children/*[1])="empty")) and not(following-sibling::*[@role="rightsuper" or @role="rightsub" or @role="leftsub" or @role="leftsub"])'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "superscript-baseline",
    "mathspeak.default",
    "mathspeak.brief",
    "[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];[t] CSFbaselineBrief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "superscript-baseline",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "superscript-baseline",
    "self::superscript",
    "not(following-sibling::*)",
    "ancestor::punctuated",
    'ancestor::*/following-sibling::* and not(ancestor::punctuated[@role="leftsuper" or @role="rightsub" or @role="rightsuper" or @role="rightsub"])'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "superscript-baseline",
    "self::superscript",
    "not(following-sibling::*)",
    "ancestor::fraction|ancestor::fenced|ancestor::root|ancestor::sqrt"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "superscript-baseline",
    "self::superscript",
    "not(following-sibling::*)",
    "ancestor::relseq|ancestor::multirel",
    "not(@embellished)",
    sre.MathspeakUtil.generateBaselineConstraint()
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "superscript-baseline",
    "self::superscript",
    "not(following-sibling::*)",
    "@embellished",
    'not(children/*[2][@role="prime"])'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "superscript-empty-sub",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2]",
    "self::superscript",
    'name(children/*[2])="infixop"',
    'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
    'name(children/*[2]/children/*[1]/children/*[1])="empty"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "superscript-empty-sub",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "superscript-empty-sub",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "superscript-empty-sub",
    "self::superscript",
    'name(children/*[2])="subscript"',
    'name(children/*[2]/children/*[1])="empty"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "square",
    "mathspeak.default",
    '[n] children/*[1]; [t] "squared"',
    "self::superscript",
    "children/*[2]",
    "children/*[2][text()=2]",
    'name(children/*[1])!="text" or not(name(children/*[1])="text" and (name(../../../punctuated[@role="text"]/..)="stree" or name(..)="stree"))',
    'name(children/*[1])!="subscript" or (name(children/*[1])="subscript" and name(children/*[1]/children/*[1])="identifier" and name(children/*[1]/children/*[2])="number" and children/*[1]/children/*[2][@role!="mixed"] and children/*[1]/children/*[2][@role!="othernumber"])',
    "not(@embellished)"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "square",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "square",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "cube",
    "mathspeak.default",
    '[n] children/*[1]; [t] "cubed"',
    "self::superscript",
    "children/*[2]",
    "children/*[2][text()=3]",
    'name(children/*[1])!="text" or not(name(children/*[1])="text" and (name(../../../punctuated[@role="text"]/..)="stree" or name(..)="stree"))',
    'name(children/*[1])!="subscript" or (name(children/*[1])="subscript" and name(children/*[1]/children/*[1])="identifier" and name(children/*[1]/children/*[2])="number" and children/*[1]/children/*[2][@role!="mixed"] and children/*[1]/children/*[2][@role!="othernumber"])',
    "not(@embellished)"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "cube",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "cube",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "prime",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[2]",
    "self::superscript",
    "children/*[2]",
    'children/*[2][@role="prime"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "prime-subscript",
    "mathspeak.default",
    "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]",
    "self::superscript",
    'children/*[2][@role="prime"]',
    'name(children/*[1])="subscript"',
    "not(following-sibling::*)"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime-subscript",
    "mathspeak.default",
    "mathspeak.brief",
    "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime-subscript",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "prime-subscript-baseline",
    "mathspeak.default",
    "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]; [t] CSFbaselineVerbose",
    "self::superscript",
    'children/*[2][@role="prime"]',
    'name(children/*[1])="subscript"',
    "following-sibling::*"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime-subscript-baseline",
    "mathspeak.default",
    "mathspeak.brief",
    "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]; [t] CSFbaselineBrief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime-subscript-baseline",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "prime-subscript-baseline",
    "self::superscript",
    'children/*[2][@role="prime"]',
    'name(children/*[1])="subscript"',
    "not(following-sibling::*)",
    "@embellished"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "prime-subscript-simple",
    "mathspeak.default",
    "[n] children/*[1]/children/*[1]; [n] children/*[2];[n] children/*[1]/children/*[2]",
    "self::superscript",
    'children/*[2][@role="prime"]',
    'name(children/*[1])="subscript"',
    'name(children/*[1]/children/*[1])="identifier"',
    'name(children/*[1]/children/*[2])="number"',
    'children/*[1]/children/*[2][@role!="mixed"]',
    'children/*[1]/children/*[2][@role!="othernumber"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime-subscript-simple",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "prime-subscript-simple",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "overscore",
    "mathspeak.default",
    '[t] "ModifyingAbove"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
    "self::overscore",
    'children/*[2][@role="overaccent"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "overscore",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "ModAbove"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "overscore",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "double-overscore",
    "mathspeak.default",
    '[t] "ModifyingAbove Above"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
    "self::overscore",
    'children/*[2][@role="overaccent"]',
    'name(children/*[1])="overscore"',
    'children/*[1]/children/*[2][@role="overaccent"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "double-overscore",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "ModAbove Above"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "double-overscore",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "underscore",
    "mathspeak.default",
    '[t] "ModifyingBelow"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
    "self::underscore",
    'children/*[2][@role="underaccent"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "underscore",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "ModBelow"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "underscore",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "double-underscore",
    "mathspeak.default",
    '[t] "ModifyingBelow Below"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
    "self::underscore",
    'children/*[2][@role="underaccent"]',
    'name(children/*[1])="underscore"',
    'children/*[1]/children/*[2][@role="underaccent"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "double-underscore",
    "mathspeak.default",
    "mathspeak.brief",
    '[t] "ModBelow Below"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "double-underscore",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "overbar",
    "mathspeak.default",
    '[n] children/*[1]; [t] "overbar"',
    "self::overscore",
    '@role="latinletter" or @role="greekletter" or @role="otherletter"',
    'children/*[2][@role="overaccent"]',
    'children/*[2][text()="\u00af" or text()="\uffe3" or text()="\uff3f" or text()="_" or text()="\u203e"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "overbar",
    "mathspeak.default",
    "mathspeak.brief",
    '[n] children/*[1]; [t] "overBar"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "overbar",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "underbar",
    "mathspeak.default",
    '[n] children/*[1]; [t] "underbar"',
    "self::underscore",
    '@role="latinletter" or @role="greekletter" or @role="otherletter"',
    'children/*[2][@role="underaccent"]',
    'children/*[2][text()="\u00af" or text()="\uffe3" or text()="\uff3f" or text()="_" or text()="\u203e"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "underbar",
    "mathspeak.default",
    "mathspeak.brief",
    '[n] children/*[1]; [t] "underBar"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "underbar",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "overtilde",
    "mathspeak.default",
    '[n] children/*[1]; [t] "overTilde"',
    "self::overscore",
    'children/*[2][@role="overaccent"]',
    '@role="latinletter" or @role="greekletter" or @role="otherletter"',
    'children/*[2][text()="~" or text()="\u02dc" or text()="\u223c" or text()="\uff5e"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "overtilde",
    "mathspeak.default",
    "mathspeak.brief",
    '[n] children/*[1]; [t] "overtilde"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "overtilde",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "undertilde",
    "mathspeak.default",
    '[n] children/*[1]; [t] "underTilde"',
    "self::underscore",
    '@role="latinletter" or @role="greekletter" or @role="otherletter"',
    'children/*[2][@role="underaccent"]',
    'children/*[2][text()="~" or text()="\u02dc" or text()="\u223c" or text()="\uff5e"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "undertilde",
    "mathspeak.default",
    "mathspeak.brief",
    '[n] children/*[1]; [t] "undertilde"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "undertilde",
    "mathspeak.brief",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "matrix-fence",
    "mathspeak.default",
    "[n] children/*[1];",
    "self::fenced",
    "count(children/*)=1",
    'name(children/*[1])="matrix"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "matrix",
    "mathspeak.default",
    '[t] "Start"; [t] count(children/*);  [t] "By";[t] count(children/*[1]/children/*); [t] "Matrix"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndMatrix"',
    "self::matrix"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "matrix",
    "mathspeak.sbrief",
    '[t] count(children/*);  [t] "By";[t] count(children/*[1]/children/*); [t] "Matrix"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndMatrix"',
    "self::matrix"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)("matrix", "self::vector");
  (0, sre.MathspeakRules.defineRule_)(
    "matrix-row",
    "mathspeak.default",
    '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
    "self::row"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "row-with-label",
    "mathspeak.default",
    '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
    "self::row",
    "content"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "empty-row",
    "mathspeak.default",
    '[t] "Blank"',
    "self::row",
    "count(children/*)=0"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "matrix-cell",
    "mathspeak.default",
    "[n] children/*[1]",
    "self::cell"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "empty-cell",
    "mathspeak.default",
    '[t] "Blank"',
    "self::cell",
    "count(children/*)=0"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "determinant",
    "mathspeak.default",
    '[t] "Start"; [t] count(children/*);  [t] "By";[t] count(children/*[1]/children/*); [t] "Determinant"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndDeterminant"',
    "self::matrix",
    '@role="determinant"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "determinant",
    "mathspeak.default",
    "mathspeak.sbrief",
    '[t] count(children/*);  [t] "By";[t] count(children/*[1]/children/*); [t] "Determinant"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndDeterminant"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "determinant-simple",
    "mathspeak.default",
    '[t] "Start"; [t] count(children/*);  [t] "By";[t] count(children/*[1]/children/*); [t] "Determinant"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row",grammar:simpleDet); [t] "EndDeterminant"',
    "self::matrix",
    '@role="determinant"',
    "CQFdetIsSimple"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "determinant-simple",
    "mathspeak.default",
    "mathspeak.sbrief",
    '[t] count(children/*);  [t] "By";[t] count(children/*[1]/children/*); [t] "Determinant"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row",grammar:simpleDet); [t] "EndDeterminant"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "row-simple",
    "mathspeak.default",
    "[m] children/*;",
    "self::row",
    '@role="determinant"',
    'contains(@grammar, "simpleDet")'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "layout",
    "mathspeak.default",
    '[t] "StartLayout"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndLayout"',
    "self::table"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "layout",
    "mathspeak.sbrief",
    '[t] "Layout"; [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndLayout"',
    "self::table"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "binomial",
    "mathspeak.default",
    '[t] "StartBinomialOrMatrix"; [n] children/*[1]/children/*[1]; [t] "Choose"; [n] children/*[2]/children/*[1];  [t] "EndBinomialOrMatrix"',
    "self::vector",
    '@role="binomial"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "binomial",
    "mathspeak.sbrief",
    '[t] "BinomialOrMatrix"; [n] children/*[1]/children/*[1]; [t] "Choose"; [n] children/*[2]/children/*[1];  [t] "EndBinomialOrMatrix"',
    "self::vector",
    '@role="binomial"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "cases",
    "mathspeak.default",
    '[t] "StartLayout"; [t] "Enlarged"; [n] content/*[1];[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndLayout"',
    "self::cases"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "cases",
    "mathspeak.sbrief",
    '[t] "Layout"; [t] "Enlarged"; [n] content/*[1];[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row "); [t] "EndLayout"',
    "self::cases"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)("layout", "self::multiline");
  (0, sre.MathspeakRules.defineRule_)(
    "line",
    "mathspeak.default",
    "[m] children/*",
    "self::line"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "line-with-label",
    "mathspeak.default",
    '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); [m] children/*',
    "self::line",
    "content"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "empty-line",
    "mathspeak.default",
    '[t] "Blank"',
    "self::line",
    "count(children/*)=0"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "empty-line-with-label",
    "mathspeak.default",
    '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); [t] "Blank"',
    "self::line",
    "count(children/*)=0"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "enclose",
    "mathspeak.default",
    '[t] "StartEnclose"; [t] @role; [n] children/*[1]; [t] "EndEnclose"',
    "self::enclose"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "overbar",
    "self::enclose",
    '@role="top"'
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "underbar",
    "self::enclose",
    '@role="bottom"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "leftbar",
    "mathspeak.default",
    '[t] "vertical-bar"; [n] children/*[1]',
    "self::enclose",
    '@role="left"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "rightbar",
    "mathspeak.default",
    '[t] "vertical-bar"; [n] children/*[1]',
    "self::enclose",
    '@role="right"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "crossout",
    "mathspeak.default",
    '[t] "CrossOut"; [n] children/*[1]; [t] "EndCrossOut"',
    "self::enclose",
    '@role="updiagonalstrike" or @role="downdiagonalstrike" or @role="horizontalstrike"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "cancel",
    "mathspeak.default",
    '[t] "CrossOut"; [n] children/*[1]/children/*[1]; [t] "With"; [n] children/*[2]; [t] "EndCrossOut"',
    "self::overscore",
    '@role="updiagonalstrike" or @role="downdiagonalstrike" or @role="horizontalstrike"'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "cancel",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "cancel",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "cancel",
    "self::underscore",
    '@role="updiagonalstrike" or @role="downdiagonalstrike" or @role="horizontalstrike"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "cancel-reverse",
    "mathspeak.default",
    '[t] "CrossOut"; [n] children/*[2]/children/*[1]; [t] "With"; [n] children/*[1]; [t] "EndCrossOut"',
    "self::overscore",
    'name(children/*[2])="enclose"',
    'children/*[2][@role="updiagonalstrike" or @role="downdiagonalstrike" or @role="horizontalstrike"]'
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "cancel-reverse",
    "mathspeak.default",
    "mathspeak.brief"
  );
  (0, sre.MathspeakRules.defineSpecialisedRule_)(
    "cancel-reverse",
    "mathspeak.default",
    "mathspeak.sbrief"
  );
  (0, sre.MathspeakRules.defineRuleAlias_)(
    "cancel-reverse",
    "self::underscore",
    'name(children/*[2])="enclose"',
    'children/*[2][@role="updiagonalstrike" or @role="downdiagonalstrike" or @role="horizontalstrike"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "end-punct",
    "mathspeak.default",
    "[m] children/*",
    "self::punctuated",
    '@role="endpunct"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "start-punct",
    "mathspeak.default",
    "[n] content/*[1]; [m] children/*[position()>1]",
    "self::punctuated",
    '@role="startpunct"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "integral-punct",
    "mathspeak.default",
    "[n] children/*[1]; [n] children/*[3]",
    "self::punctuated",
    '@role="integral"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "punctuated",
    "mathspeak.default",
    "[m] children/*",
    "self::punctuated"
  );
  (0, sre.MathspeakRules.defineRule_)(
    "unit",
    "mathspeak.default",
    '[t] text() (grammar:annotation="unit":translate)',
    "self::identifier",
    '@role="unit"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "unit-square",
    "mathspeak.default",
    '[t] "square"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    "children/*[2][text()=2]",
    'name(children/*[1])="identifier"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "unit-cubic",
    "mathspeak.default",
    '[t] "cubic"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    "children/*[2][text()=3]",
    'name(children/*[1])="identifier"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "reciprocal",
    "mathspeak.default",
    '[t] "reciprocal"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    'name(children/*[1])="identifier"',
    'name(children/*[2])="prefixop"',
    'children/*[2][@role="negative"]',
    "children/*[2]/children/*[1][text()=1]",
    'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "reciprocal",
    "mathspeak.default",
    '[t] "per"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    'name(children/*[1])="identifier"',
    'name(children/*[2])="prefixop"',
    'children/*[2][@role="negative"]',
    "children/*[2]/children/*[1][text()=1]",
    'preceding-sibling::*[@role="unit"]'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "unit-combine",
    "mathspeak.default",
    "[m] children/*",
    "self::infixop",
    '@role="unit"'
  );
  (0, sre.MathspeakRules.defineRule_)(
    "unit-divide",
    "mathspeak.default",
    '[n] children/*[1]; [t] "per"; [n] children/*[2]',
    "self::fraction",
    '@role="unit"'
  );
};
sre.MathspeakRules.componentString_ = {
  2: "CSFbaseline",
  1: "CSFsubscript",
  0: "CSFsuperscript"
};
sre.MathspeakRules.childNumber_ = { 4: 2, 3: 3, 2: 1, 1: 4, 0: 5 };
sre.MathspeakRules.generateTensorRuleStrings_ = function(a) {
  var b = [],
    c = "",
    d = "";
  a = parseInt(a, 2);
  for (var e = 0; 5 > e; e++) {
    var f = "children/*[" + sre.MathspeakRules.childNumber_[e] + "]";
    if (a & 1)
      var g = sre.MathspeakRules.componentString_[e % 3],
        c = "[t] " + g + "Verbose; [n] " + f + ";" + c,
        d = "[t] " + g + "Brief; [n] " + f + ";" + d;
    else b.unshift("name(" + f + ')="empty"');
    a >>= 1;
  }
  b.push(c);
  b.push(d);
  return b;
};
sre.MathspeakRules.generateMathspeakTensorRules_ = function() {
  for (
    var a = "11111 11110 11101 11100 10111 10110 10101 10100 01111 01110 01101 01100".split(
        " "
      ),
      b = 0,
      c;
    (c = a[b]);
    b++
  ) {
    var d = "tensor" + c;
    c = sre.MathspeakRules.generateTensorRuleStrings_(c);
    var e = c.pop(),
      f = c.pop(),
      g = [d, "mathspeak.default", f, "self::tensor"].concat(c),
      h = [d, "mathspeak.brief", e, "self::tensor"].concat(c);
    sre.MathspeakRules.defineRule_.apply(null, g);
    sre.MathspeakRules.defineRule_.apply(null, h);
    (0, sre.MathspeakRules.defineSpecialisedRule_)(
      d,
      "mathspeak.brief",
      "mathspeak.sbrief"
    );
    g = sre.MathspeakRules.componentString_[2];
    f += "; [t]" + g + "Verbose";
    e += "; [t]" + g + "Brief";
    d += "-baseline";
    g = [
      d,
      "mathspeak.default",
      f,
      "self::tensor",
      "following-sibling::*"
    ].concat(c);
    h = [
      d,
      "mathspeak.brief",
      e,
      "self::tensor",
      "following-sibling::*"
    ].concat(c);
    sre.MathspeakRules.defineRule_.apply(null, g);
    sre.MathspeakRules.defineRule_.apply(null, h);
    (0, sre.MathspeakRules.defineSpecialisedRule_)(
      d,
      "mathspeak.brief",
      "mathspeak.sbrief"
    );
    d = [
      d,
      "self::tensor",
      "not(following-sibling::*)",
      "ancestor::fraction|ancestor::punctuated|ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::relseq|ancestor::multirel|@embellished"
    ].concat(c);
    sre.MathspeakRules.defineRuleAlias_.apply(null, d);
  }
};
sre.MathspeakRules.getInstance().initializer = [
  sre.MathspeakRules.initCustomFunctions_,
  sre.MathspeakRules.initMathspeakRules_,
  sre.MathspeakRules.generateMathspeakTensorRules_
];
sre.PrefixRules = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.PrefixRules, sre.MathStore);
goog.addSingletonGetter(sre.PrefixRules);
sre.PrefixRules.mathStore = sre.PrefixRules.getInstance();
sre.PrefixRules.defineRule_ = goog.bind(
  sre.PrefixRules.mathStore.defineRule,
  sre.PrefixRules.mathStore
);
sre.PrefixRules.defineRuleAlias_ = goog.bind(
  sre.PrefixRules.mathStore.defineRulesAlias,
  sre.PrefixRules.mathStore
);
sre.PrefixRules.addCustomString_ = goog.bind(
  sre.PrefixRules.mathStore.customStrings.add,
  sre.PrefixRules.mathStore.customStrings
);
sre.PrefixRules.ordinalPosition = function(a) {
  var b = sre.DomUtil.toArray(a.parentNode.childNodes);
  return sre.MathspeakUtil.simpleOrdinal(b.indexOf(a) + 1).toString();
};
sre.PrefixRules.initCustomFunctions_ = function() {
  (0, sre.PrefixRules.addCustomString_)(
    "CSFordinalPosition",
    sre.PrefixRules.ordinalPosition
  );
};
sre.PrefixRules.initPrefixRules_ = function() {
  (0, sre.PrefixRules.defineRule_)(
    "numerator",
    "prefix.default",
    '[t] "Numerator"; [p] (pause:200)',
    "self::*",
    'name(../..)="fraction"',
    "count(preceding-sibling::*)=0"
  );
  (0, sre.PrefixRules.defineRule_)(
    "denominator",
    "prefix.default",
    '[t] "Denominator"; [p] (pause:200)',
    "self::*",
    'name(../..)="fraction"',
    "count(preceding-sibling::*)=1"
  );
  (0, sre.PrefixRules.defineRule_)(
    "base",
    "prefix.default",
    '[t] "Base"; [p] (pause:200)',
    "self::*",
    'name(../..)="superscript" or name(../..)="subscript" or name(../..)="overscore" or name(../..)="underscore" or name(../..)="tensor"',
    "count(preceding-sibling::*)=0"
  );
  (0, sre.PrefixRules.defineRule_)(
    "exponent",
    "prefix.default",
    '[t] "Exponent"; [p] (pause:200)',
    "self::*",
    'name(../..)="superscript"',
    "count(preceding-sibling::*)=1"
  );
  (0, sre.PrefixRules.defineRule_)(
    "subscript",
    "prefix.default",
    '[t] "Subscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="subscript"',
    "count(preceding-sibling::*)=1"
  );
  (0, sre.PrefixRules.defineRule_)(
    "overscript",
    "prefix.default",
    '[t] "Overscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="overscore"',
    "count(preceding-sibling::*)=1"
  );
  (0, sre.PrefixRules.defineRule_)(
    "underscript",
    "prefix.default",
    '[t] "Underscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="underscore"',
    "count(preceding-sibling::*)=1"
  );
  (0, sre.PrefixRules.defineRule_)(
    "radicand",
    "prefix.default",
    '[t] "Radicand"; [p] (pause:200)',
    "self::*",
    'name(../..)="sqrt"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "radicand",
    "prefix.default",
    '[t] "Radicand"; [p] (pause:200)',
    "self::*",
    'name(../..)="root"',
    "count(preceding-sibling::*)=1"
  );
  (0, sre.PrefixRules.defineRule_)(
    "index",
    "prefix.default",
    '[t] "Index"; [p] (pause:200)',
    "self::*",
    'name(../..)="root"',
    "count(preceding-sibling::*)=0"
  );
  (0, sre.PrefixRules.defineRule_)(
    "leftsub",
    "prefix.default",
    '[t] "Left Subscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="tensor"',
    '@role="leftsub"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "leftsub",
    "prefix.default",
    '[t] CSFordinalPosition; [t] "Left Subscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="punctuated"',
    'name(../../../..)="tensor"',
    '../../@role="leftsub"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "leftsuper",
    "prefix.default",
    '[t] "Left Superscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="tensor"',
    '@role="leftsuper"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "leftsuper",
    "prefix.default",
    '[t] CSFordinalPosition; [t] "Left Superscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="punctuated"',
    'name(../../../..)="tensor"',
    '../../@role="leftsuper"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "rightsub",
    "prefix.default",
    '[t] "Right Subscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="tensor"',
    '@role="rightsub"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "rightsub",
    "prefix.default",
    '[t] CSFordinalPosition; [t] "Right Subscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="punctuated"',
    'name(../../../..)="tensor"',
    '../../@role="rightsub"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "rightsuper",
    "prefix.default",
    '[t] "Right Superscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="tensor"',
    '@role="rightsuper"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "rightsuper",
    "prefix.default",
    '[t] CSFordinalPosition; [t] "Right Superscript"; [p] (pause:200)',
    "self::*",
    'name(../..)="punctuated"',
    'name(../../../..)="tensor"',
    '../../@role="rightsuper"'
  );
  (0, sre.PrefixRules.defineRule_)(
    "choice",
    "prefix.default",
    '[t] "Choice Quantity"; [p] (pause:200)',
    "self::line",
    '@role="binomial"',
    "parent::*/parent::vector",
    "count(preceding-sibling::*)=0"
  );
  (0, sre.PrefixRules.defineRule_)(
    "select",
    "prefix.default",
    '[t] "Selection Quantity"; [p] (pause:200)',
    "self::line",
    '@role="binomial"',
    "parent::*/parent::vector",
    "count(preceding-sibling::*)=1"
  );
  (0, sre.PrefixRules.defineRule_)(
    "row",
    "prefix.default",
    '[t] CSFordinalPosition; [t] "Row"; [p] (pause:200)',
    "self::row"
  );
  (0, sre.PrefixRules.defineRuleAlias_)("row", "self::line");
  (0, sre.PrefixRules.defineRule_)(
    "cell",
    "prefix.default",
    '[t] CSFordinalPosition; [t] "Column"; [p] (pause:200)',
    "self::cell"
  );
};
sre.PrefixRules.getInstance().initializer = [
  sre.PrefixRules.initCustomFunctions_,
  sre.PrefixRules.initPrefixRules_
];
sre.SemanticTreeRules = function() {
  sre.MathStore.call(this);
};
goog.inherits(sre.SemanticTreeRules, sre.MathStore);
goog.addSingletonGetter(sre.SemanticTreeRules);
sre.SemanticTreeRules.mathStore = sre.SemanticTreeRules.getInstance();
sre.SemanticTreeRules.defineRule_ = goog.bind(
  sre.SemanticTreeRules.mathStore.defineRule,
  sre.SemanticTreeRules.mathStore
);
sre.SemanticTreeRules.defineRuleAlias_ = goog.bind(
  sre.SemanticTreeRules.mathStore.defineRuleAlias,
  sre.SemanticTreeRules.mathStore
);
sre.SemanticTreeRules.addContextFunction_ = goog.bind(
  sre.SemanticTreeRules.mathStore.contextFunctions.add,
  sre.SemanticTreeRules.mathStore.contextFunctions
);
sre.SemanticTreeRules.initCustomFunctions_ = function() {
  (0, sre.SemanticTreeRules.addContextFunction_)(
    "CTXFnodeCounter",
    sre.StoreUtil.nodeCounter
  );
  (0, sre.SemanticTreeRules.addContextFunction_)(
    "CTXFcontentIterator",
    sre.MathmlStoreUtil.contentIterator
  );
};
sre.SemanticTreeRules.initSemanticRules_ = function() {
  (0, sre.SemanticTreeRules.defineRule_)(
    "stree",
    "default.default",
    "[n] ./*[1]",
    "self::stree"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "multrel",
    "default.default",
    '[t] "multirelation"; [m] children/* (sepFunc:CTXFcontentIterator)',
    "self::multirel"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "variable-equality",
    "default.default",
    '[t] "equation sequence"; [m] ./children/* (context:"part",ctxtFunc:CTXFnodeCounter,sepFunc:CTXFcontentIterator)',
    'self::relseq[@role="equality"]',
    "count(./children/*)>2",
    './children/punctuation[@role="ellipsis"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "multi-equality",
    "default.default",
    '[t] "equation sequence"; [m] ./children/* (context:"part",ctxtFunc:CTXFnodeCounter,sepFunc:CTXFcontentIterator)',
    'self::relseq[@role="equality"]',
    "count(./children/*)>2"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "multi-equality",
    "default.short",
    '[t] "equation sequence"; [m] ./children/* (sepFunc:CTXFcontentIterator)',
    'self::relseq[@role="equality"]',
    "count(./children/*)>2"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "equality",
    "default.default",
    '[t] "equation"; [t] "left hand side"; [n] children/*[1];[p] (pause:200); [n] content/*[1] (pause:200);[t] "right hand side"; [n] children/*[2]',
    'self::relseq[@role="equality"]',
    "count(./children/*)=2"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "simple-equality",
    "default.default",
    "[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);[n] children/*[2]",
    'self::relseq[@role="equality"]',
    "count(./children/*)=2",
    "./children/identifier or ./children/number"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "simple-equality2",
    "default.default",
    "[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);[n] children/*[2]",
    'self::relseq[@role="equality"]',
    "count(./children/*)=2",
    "./children/function or ./children/appl"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "relseq",
    "default.default",
    "[m] children/* (sepFunc:CTXFcontentIterator)",
    "self::relseq"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "binary-operation",
    "default.default",
    "[m] children/* (sepFunc:CTXFcontentIterator);",
    "self::infixop"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "variable-addition",
    "default.default",
    '[t] "sum with variable number of summands";[p] (pause:400); [m] children/* (sepFunc:CTXFcontentIterator)',
    'self::infixop[@role="addition"]',
    "count(children/*)>2",
    'children/punctuation[@role="ellipsis"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "multi-addition",
    "default.default",
    '[t] "sum with"; [t] count(./children/*); [t] "summands";[p] (pause:400); [m] ./children/* (sepFunc:CTXFcontentIterator)',
    'self::infixop[@role="addition"]',
    "count(./children/*)>2"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "prefix",
    "default.default",
    '[t] "prefix"; [n] text(); [t] "of" (pause 150);[n] children/*[1]',
    "self::prefixop"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "negative",
    "default.default",
    '[t] "negative"; [n] children/*[1]',
    "self::prefixop",
    'self::prefixop[@role="negative"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "postfix",
    "default.default",
    '[n] children/*[1]; [t] "postfix"; [n] text() (pause 300)',
    "self::postfixop"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "identifier",
    "default.default",
    "[n] text()",
    "self::identifier"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "number",
    "default.default",
    "[n] text()",
    "self::number"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "font",
    "default.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::*",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font!="normal"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "font-identifier-short",
    "default.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font="normal"',
    '""=translate(text(), "abcdefghijklmnopqrstuvwxyz\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9", "")',
    '@role!="unit"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "font-identifier",
    "default.default",
    "[t] @font; [n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    '@font="normal"',
    'not(contains(@grammar, "ignoreFont"))',
    '@role!="unit"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "omit-font",
    "default.default",
    "[n] self::* (grammar:ignoreFont=@font)",
    "self::identifier",
    "string-length(text())=1",
    "@font",
    'not(contains(@grammar, "ignoreFont"))',
    '@font="italic"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "fraction",
    "default.default",
    '[p] (pause:250); [n] children/*[1] (rate:0.35); [p] (pause:250); [t] "divided by"; [n] children/*[2] (rate:-0.35); [p] (pause:400)',
    "self::fraction"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "superscript",
    "default.default",
    '[n] children/*[1]; [t] "super"; [n] children/*[2] (pitch:0.35);[p] (pause:300)',
    "self::superscript"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "subscript",
    "default.default",
    '[n] children/*[1]; [t] "sub"; [n] children/*[2] (pitch:-0.35);[p] (pause:300)',
    "self::subscript"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "ellipsis",
    "default.default",
    '[p] (pause:200); [t] "ellipsis"; [p] (pause:300)',
    "self::punctuation",
    'self::punctuation[@role="ellipsis"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "fence-single",
    "default.default",
    "[n] text()",
    "self::punctuation",
    'self::punctuation[@role="openfence"]'
  );
  (0, sre.SemanticTreeRules.defineRuleAlias_)(
    "fence-single",
    "self::punctuation",
    'self::punctuation[@role="closefence"]'
  );
  (0, sre.SemanticTreeRules.defineRuleAlias_)(
    "fence-single",
    "self::punctuation",
    'self::punctuation[@role="vbar"]'
  );
  (0, sre.SemanticTreeRules.defineRuleAlias_)(
    "fence-single",
    "self::punctuation",
    'self::punctuation[@role="application"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "omit-empty",
    "default.default",
    "[p] (pause:100)",
    "self::empty"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "fences-open-close",
    "default.default",
    '[p] (pause:200); [t] "open"; [n] content/*[1]; [n] children/*[1]; [p] (pause:200); [t] "close"',
    "self::fenced",
    '@role="leftright"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "fences-open-close-in-appl",
    "default.default",
    "[p] (pause:200); [n] children/*[1]; [p] (pause:200);",
    'self::fenced[@role="leftright"]',
    "./parent::children/parent::appl"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "fences-neutral",
    "default.default",
    '[p] (pause:100); [t] "absolute value of"; [n] children/*[1];[p] (pause:350);',
    "self::fenced",
    'self::fenced[@role="neutral"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "omit-fences",
    "default.default",
    "[p] (pause:500); [n] children/*[1]; [p] (pause:200);",
    "self::fenced"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "matrix",
    "default.default",
    '[t] "matrix"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:100)',
    "self::matrix"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "matrix-row",
    "default.default",
    '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
    'self::row[@role="matrix"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "matrix-cell",
    "default.default",
    "[n] children/*[1]",
    'self::cell[@role="matrix"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "vector",
    "default.default",
    '[t] "vector"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"element",pause:100)',
    "self::vector"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "cases",
    "default.default",
    '[t] "case statement"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"case",pause:100)',
    "self::cases"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "cases-row",
    "default.default",
    "[m] children/*",
    'self::row[@role="cases"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "cases-cell",
    "default.default",
    "[n] children/*[1]",
    'self::cell[@role="cases"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "row",
    "default.default",
    '[m] ./* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
    "self::row"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "cases-end",
    "default.default",
    '[t] "case statement"; [m] children/* (ctxtFunc:CTXFnodeCounter,context:"case",pause:100);[t] "end cases"',
    "self::cases",
    "following-sibling::*"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "multiline",
    "default.default",
    '[t] "multiline equation";[m] children/* (ctxtFunc:CTXFnodeCounter,context:"line",pause:100)',
    "self::multiline"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "line",
    "default.default",
    "[m] children/*",
    "self::line"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "table",
    "default.default",
    '[t] "multiline equation";[m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:200)',
    "self::table"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "table-row",
    "default.default",
    "[m] children/* (pause:100)",
    'self::row[@role="table"]'
  );
  (0, sre.SemanticTreeRules.defineRuleAlias_)(
    "cases-cell",
    'self::cell[@role="table"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "end-punct",
    "default.default",
    "[m] children/*; [p] (pause:300)",
    "self::punctuated",
    '@role="endpunct"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "start-punct",
    "default.default",
    "[n] content/*[1]; [p] (pause:200); [m] children/*[position()>1]",
    "self::punctuated",
    '@role="startpunct"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "integral-punct",
    "default.default",
    "[n] children/*[1] (rate:0.2); [n] children/*[3] (rate:0.2)",
    "self::punctuated",
    '@role="integral"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "punctuated",
    "default.default",
    "[m] children/* (pause:100)",
    "self::punctuated"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "function",
    "default.default",
    "[n] text()",
    "self::function"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "appl",
    "default.default",
    "[n] children/*[1]; [n] content/*[1]; [n] children/*[2]",
    "self::appl"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "sum-only",
    "default.default",
    '[n] children/*[1]; [t] "from"; [n] children/*[2]; [t] "to";[n] children/*[3]',
    "self::limboth",
    'self::limboth[@role="sum"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "limboth",
    "default.default",
    '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];[t] "under"; [n] children/*[3]; [p] (pause 250);',
    "self::limboth"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "limlower",
    "default.default",
    '[n] children/*[1]; [t] "over"; [n] children/*[2];',
    "self::limlower"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "limupper",
    "default.default",
    '[n] children/*[1]; [t] "under"; [n] children/*[2];',
    "self::limupper"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "largeop",
    "default.default",
    "[n] text()",
    "self::largeop"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "bigop",
    "default.default",
    '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];[p] (pause 250);',
    "self::bigop"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "integral",
    "default.default",
    "[n] children/*[1]; [p] (pause 100); [n] children/*[2];[p] (pause 200); [n] children/*[3] (rate:0.35);",
    "self::integral"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "sqrt",
    "default.default",
    '[t] "Square root of"; [n] children/*[1] (rate:0.35); [p] (pause:400)',
    "self::sqrt"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "square",
    "default.default",
    '[n] children/*[1]; [t] "squared" (pitch:0.35); [p] (pause:300)',
    "self::superscript",
    "children/*[2][text()=2]",
    'name(./children/*[1])!="text"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "cube",
    "default.default",
    '[n] children/*[1]; [t] "cubed" (pitch:0.35); [p] (pause:300)',
    "self::superscript",
    "children/*[2][text()=3]",
    'name(./children/*[1])!="text"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "root",
    "default.default",
    '[t] "root of order"; [n] children/*[1];[t] "over"; [n] children/*[1] (rate:0.35); [p] (pause:400)',
    "self::root"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "text",
    "default.default",
    "[n] text(); [p] (pause:200)",
    "self::text"
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "unit",
    "default.default",
    '[t] text() (grammar:annotation="unit":translate)',
    "self::identifier",
    '@role="unit"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "unit-square",
    "default.default",
    '[t] "square"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    "children/*[2][text()=2]",
    'name(children/*[1])="identifier"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "unit-cubic",
    "default.default",
    '[t] "cubic"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    "children/*[2][text()=3]",
    'name(children/*[1])="identifier"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "reciprocal",
    "default.default",
    '[t] "reciprocal"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    'name(children/*[1])="identifier"',
    'name(children/*[2])="prefixop"',
    'children/*[2][@role="negative"]',
    "children/*[2]/children/*[1][text()=1]",
    'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "reciprocal",
    "default.default",
    '[t] "per"; [n] children/*[1]',
    "self::superscript",
    '@role="unit"',
    'name(children/*[1])="identifier"',
    'name(children/*[2])="prefixop"',
    'children/*[2][@role="negative"]',
    "children/*[2]/children/*[1][text()=1]",
    'preceding-sibling::*[@role="unit"]'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "unit-combine",
    "default.default",
    "[m] children/*",
    "self::infixop",
    '@role="unit"'
  );
  (0, sre.SemanticTreeRules.defineRule_)(
    "unit-divide",
    "default.default",
    '[n] children/*[1] (pitch:0.3); [t] "per"; [n] children/*[2] (pitch:-0.3)',
    "self::fraction",
    '@role="unit"'
  );
};
sre.SemanticTreeRules.getInstance().initializer = [
  sre.SemanticTreeRules.initCustomFunctions_,
  sre.SemanticTreeRules.initSemanticRules_
];
sre.SpeechRuleStores = {};
sre.SpeechRuleStores.RULE_SETS_ = {
  MathmlStoreRules: sre.MathmlStoreRules,
  SemanticTreeRules: sre.SemanticTreeRules,
  MathspeakRules: sre.MathspeakRules,
  ClearspeakRules: sre.ClearspeakRules,
  EmacspeakRules: sre.EmacspeakRules,
  AbstractionRules: sre.AbstractionRules,
  PrefixRules: sre.PrefixRules
};
sre.SpeechRuleStores.availableSets = function() {
  return Object.keys(sre.SpeechRuleStores.RULE_SETS_);
};
sre.SpeechRuleStores.getConstructor = function(a) {
  return (a = sre.SpeechRuleStores.RULE_SETS_[a]) ? a : null;
};
sre.SpeechRuleEngine = function() {
  this.activeStore_ = null;
  this.cache_ = {};
};
goog.addSingletonGetter(sre.SpeechRuleEngine);
sre.SpeechRuleEngine.prototype.parameterize = function(a) {
  for (var b = [], c = 0, d = a.length; c < d; c++) {
    var e = sre.SpeechRuleStores.getConstructor(a[c]);
    e && e.getInstance && b.push(e.getInstance());
  }
  this.parameterize_(b);
};
sre.SpeechRuleEngine.prototype.parameterize_ = function(a) {
  try {
    this.activeStore_ = this.combineStores_(a);
  } catch (b) {
    if ("StoreError" == b.name) console.log("Store Error:", b.message);
    else throw b;
  }
  this.updateEngine();
};
sre.SpeechRuleEngine.prototype.constructString = function(a, b) {
  if (!b) return "";
  if ('"' == b.charAt(0)) return b.slice(1, -1);
  var c = this.activeStore_.customStrings.lookup(b);
  return c ? c(a) : sre.XpathUtil.evaluateString(b, a);
};
sre.SpeechRuleEngine.prototype.clearCache = function() {
  this.cache_ = {};
};
sre.SpeechRuleEngine.prototype.forCache = function(a) {
  for (var b in this.cache_) a(b, this.cache_[b]);
};
sre.SpeechRuleEngine.prototype.getCacheForNode_ = function(a) {
  if (!a || !a.getAttribute) return null;
  a = a.getAttribute("id");
  return "undefined" === a || "" === a ? null : this.getCache(a);
};
sre.SpeechRuleEngine.prototype.getCache = function(a) {
  return (a = this.cache_[a]) ? this.cloneCache(a) : a;
};
sre.SpeechRuleEngine.prototype.cloneCache = function(a) {
  return a.map(function(a) {
    return a.clone();
  });
};
sre.SpeechRuleEngine.prototype.pushCache_ = function(a, b) {
  if (sre.Engine.getInstance().cache && a.getAttribute) {
    var c = a.getAttribute("id");
    c && (this.cache_[c] = this.cloneCache(b));
  }
};
sre.SpeechRuleEngine.prototype.evaluateNode = function(a) {
  var b = new Date().getTime();
  a = this.evaluateNode_(a);
  var c = new Date().getTime();
  sre.Debugger.getInstance().output("Time:", c - b);
  return a;
};
sre.SpeechRuleEngine.prototype.evaluateNode_ = function(a) {
  return a ? this.evaluateTree_(a) : [];
};
sre.SpeechRuleEngine.prototype.evaluateTree_ = function(a) {
  var b = sre.Engine.getInstance();
  if (b.cache) {
    var c = this.getCacheForNode_(a);
    if (c) return c;
  }
  sre.Grammar.getInstance().setAttribute(a);
  var d = this.activeStore_.lookupRule(a, b.dynamicCstr);
  if (!d) {
    if (b.strict) return [];
    c = this.activeStore_.evaluateDefault(a);
    this.pushCache_(a, c);
    return c;
  }
  sre.Debugger.getInstance().generateOutput(
    goog.bind(function() {
      return [d.name, d.dynamicCstr.toString(), a.toString()];
    }, this)
  );
  for (var b = d.action.components, c = [], e = 0, f; (f = b[e]); e++) {
    var g = [],
      h = f.content || "",
      k = f.attributes || {};
    f.grammar && this.processGrammar(a, f.grammar);
    switch (f.type) {
      case sre.SpeechRule.Type.NODE:
        (h = this.activeStore_.applyQuery(a, h)) && (g = this.evaluateTree_(h));
        break;
      case sre.SpeechRule.Type.MULTI:
        h = this.activeStore_.applySelector(a, h);
        0 < h.length &&
          (g = this.evaluateNodeList_(
            h,
            k.sepFunc,
            this.constructString(a, k.separator),
            k.ctxtFunc,
            this.constructString(a, k.context)
          ));
        break;
      case sre.SpeechRule.Type.TEXT:
        (h = this.constructString(a, h)) &&
          (g = [sre.AuditoryDescription.create({ text: h }, { adjust: !0 })]);
        break;
      default:
        g = [sre.AuditoryDescription.create({ text: h })];
    }
    g[0] &&
      f.type != sre.SpeechRule.Type.MULTI &&
      (k.context &&
        (g[0].context =
          this.constructString(a, k.context) + (g[0].context || "")),
      k.annotation && (g[0].annotation = k.annotation));
    f.grammar && sre.Grammar.getInstance().popState();
    c = c.concat(this.addPersonality_(g, k));
  }
  this.pushCache_(a, c);
  return c;
};
sre.SpeechRuleEngine.prototype.evaluateNodeList_ = function(a, b, c, d, e) {
  if (a == []) return [];
  var f = c || "",
    g = e || "";
  c = (c = this.activeStore_.contextFunctions.lookup(d))
    ? c(a, g)
    : function() {
        return g;
      };
  b = (b = this.activeStore_.contextFunctions.lookup(b))
    ? b(a, f)
    : function() {
        return sre.AuditoryDescription.create({ text: f }, { translate: !0 });
      };
  d = [];
  e = 0;
  for (var h; (h = a[e]); e++)
    (h = this.evaluateTree_(h)),
      0 < h.length &&
        ((h[0].context = c() + (h[0].context || "")),
        (d = d.concat(h)),
        e < a.length - 1 && ((h = b()), (d = d.concat(h))));
  return d;
};
sre.SpeechRuleEngine.prototype.addPersonality_ = function(a, b) {
  var c = {},
    d;
  for (d in sre.Engine.personalityProps) {
    var e = parseFloat(b[sre.Engine.personalityProps[d]]);
    isNaN(e) || (c[sre.Engine.personalityProps[d]] = e);
  }
  for (d = 0; (e = a[d]); d++) this.addRelativePersonality_(e, c);
  return a;
};
sre.SpeechRuleEngine.prototype.addRelativePersonality_ = function(a, b) {
  if (!a.personality) return (a.personality = b), a;
  var c = a.personality,
    d;
  for (d in b) c[d] = c[d] && "number" == typeof c[d] ? c[d] + b[d] : b[d];
  return a;
};
sre.SpeechRuleEngine.prototype.toString = function() {
  return this.activeStore_
    .findAllRules(function(a) {
      return !0;
    })
    .map(function(a) {
      return a.toString();
    })
    .join("\n");
};
sre.SpeechRuleEngine.debugSpeechRule = function(a, b) {
  var c = sre.SpeechRuleEngine.getInstance().activeStore_;
  c && c.debugSpeechRule(a, b);
};
sre.SpeechRuleEngine.debugNamedSpeechRule = function(a, b) {
  var c = sre.SpeechRuleEngine.getInstance().activeStore_;
  if (c)
    for (
      var d = c.findAllRules(function(b) {
          return b.name == a;
        }),
        e = 0,
        f;
      (f = d[e]);
      e++
    )
      sre.Debugger.getInstance().output(
        "Rule",
        a,
        "DynamicCstr:",
        f.dynamicCstr.toString(),
        "number",
        e
      ),
        c.debugSpeechRule(f, b);
};
sre.SpeechRuleEngine.prototype.runInSetting = function(a, b) {
  var c = sre.Engine.getInstance(),
    d = {},
    e = null,
    f;
  for (f in a)
    "rules" === f
      ? ((e = this.activeStore_),
        (c.ruleSets = a[f]),
        this.parameterize(c.ruleSets))
      : ((d[f] = c[f]), (c[f] = a[f]));
  c.dynamicCstr = sre.DynamicCstr.create(c.domain, c.style);
  var g = b();
  for (f in d) c[f] = d[f];
  e && (this.activeStore_ = e);
  c.dynamicCstr = sre.DynamicCstr.create(c.domain, c.style);
  return g;
};
sre.SpeechRuleEngine.prototype.combineStores_ = function(a) {
  for (var b = new sre.MathStore(), c = 0, d; (d = a[c]); c++)
    d.initialize(),
      d.getSpeechRules().forEach(function(a) {
        b.trie.addRule(a);
      }),
      b.contextFunctions.addStore(d.contextFunctions),
      b.customQueries.addStore(d.customQueries),
      b.customStrings.addStore(d.customStrings);
  b.setSpeechRules(b.trie.collectRules());
  return b;
};
sre.SpeechRuleEngine.prototype.updateEngine = function() {
  var a = sre.MathMap.getInstance();
  sre.Engine.isReady()
    ? (sre.Engine.getInstance().evaluator = goog.bind(
        a.store.lookupString,
        a.store
      ))
    : setTimeout(goog.bind(this.updateEngine, this), 500);
};
sre.SpeechRuleEngine.prototype.processGrammar = function(a, b) {
  var c = {},
    d;
  for (d in b) {
    var e = b[d];
    c[d] = "string" === typeof e ? this.constructString(a, e) : e;
  }
  sre.Grammar.getInstance().pushState(c);
};
sre.SpeechGeneratorUtil = {};
sre.SpeechGeneratorUtil.computeSpeech = function(a) {
  var b = sre.SpeechRuleEngine.getInstance();
  b.clearCache();
  return b.evaluateNode(a);
};
sre.SpeechGeneratorUtil.recomputeSpeech = function(a, b) {
  var c = sre.SemanticTree.fromNode(b);
  return sre.SpeechRuleEngine.getInstance().evaluateNode(c.xml());
};
sre.SpeechGeneratorUtil.retrieveSpeech = function(a, b) {
  var c = null;
  sre.Engine.getInstance().cache &&
    (c = sre.SpeechRuleEngine.getInstance().getCache(b.id.toString()));
  c || (c = sre.SpeechGeneratorUtil.recomputeSpeech(a, b));
  return sre.AuditoryDescription.speechString(c);
};
sre.SpeechGeneratorUtil.addSpeech = function(a, b) {
  var c = sre.SpeechGeneratorUtil.retrieveSpeech(a, b);
  a.setAttribute(sre.EnrichMathml.Attribute.SPEECH, c);
};
sre.SpeechGeneratorUtil.addPrefix = function(a, b) {
  var c = sre.SpeechGeneratorUtil.retrievePrefix(b);
  c && a.setAttribute(sre.EnrichMathml.Attribute.PREFIX, c);
};
sre.SpeechGeneratorUtil.retrievePrefix = function(a) {
  a = sre.SpeechGeneratorUtil.computePrefix_(a);
  return sre.AuditoryDescription.speechString(a);
};
sre.SpeechGeneratorUtil.computePrefix_ = function(a) {
  var b = sre.SemanticTree.fromRoot(a),
    c = sre.XpathUtil.evalXPath('.//*[@id="' + a.id + '"]', b.xml())[0];
  return c
    ? sre.SpeechRuleEngine.getInstance().runInSetting(
        {
          domain: "prefix",
          style: "default",
          strict: !0,
          cache: !1,
          speech: !0,
          rules: ["PrefixRules"]
        },
        function() {
          return sre.SpeechRuleEngine.getInstance().evaluateNode(c);
        }
      )
    : [];
};
sre.SpeechGeneratorUtil.connectMactions = function(a, b, c) {
  b = sre.DomUtil.querySelectorAll(b, "maction");
  for (var d = 0, e; (e = b[d]); d++) {
    var f = e.getAttribute("id");
    if ((f = sre.DomUtil.querySelectorAllByAttrValue(a, "id", f)[0])) {
      var g = e.childNodes[1];
      e = g.getAttribute(sre.EnrichMathml.Attribute.ID);
      var h = sre.WalkerUtil.getBySemanticId(a, e);
      (h && "dummy" !== h.getAttribute(sre.EnrichMathml.Attribute.TYPE)) ||
        ((h = f.childNodes[0]),
        (f = g.getAttribute(sre.EnrichMathml.Attribute.PARENT)) &&
          h.setAttribute(sre.EnrichMathml.Attribute.PARENT, f),
        h.setAttribute(sre.EnrichMathml.Attribute.TYPE, "dummy"),
        h.setAttribute(sre.EnrichMathml.Attribute.ID, e),
        sre.DomUtil.querySelectorAllByAttrValue(c, "id", e)[0].setAttribute(
          "alternative",
          e
        ));
    }
  }
};
sre.SpeechGeneratorUtil.connectAllMactions = function(a, b) {
  for (
    var c = sre.DomUtil.querySelectorAll(a, "maction"), d = 0, e;
    (e = c[d]);
    d++
  )
    (e = e.childNodes[1].getAttribute(sre.EnrichMathml.Attribute.ID)),
      sre.DomUtil.querySelectorAllByAttrValue(b, "id", e)[0].setAttribute(
        "alternative",
        e
      );
};
sre.AbstractSpeechGenerator = function() {
  this.rebuilt_ = null;
};
sre.AbstractSpeechGenerator.prototype.getRebuilt = function() {
  return this.rebuilt_;
};
sre.AbstractSpeechGenerator.prototype.setRebuilt = function(a) {
  this.rebuilt_ = a;
};
sre.AbstractSpeechGenerator.prototype.getSpeech = goog.abstractMethod;
sre.AbstractSpeechGenerator.prototype.start = function() {};
sre.AbstractSpeechGenerator.prototype.end = function() {};
sre.AbstractSpeechGenerator.prototype.generateSpeech = function(a, b) {
  this.rebuilt_ || (this.rebuilt_ = new sre.RebuildStree(b));
  var c = sre.SpeechGeneratorUtil.computeSpeech(this.getRebuilt().xml);
  return sre.AuditoryDescription.speechString(c);
};
sre.AdhocSpeechGenerator = function() {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.AdhocSpeechGenerator, sre.AbstractSpeechGenerator);
sre.AdhocSpeechGenerator.prototype.getSpeech = function(a, b) {
  var c = this.generateSpeech(a, b);
  a.setAttribute(sre.EnrichMathml.Attribute.SPEECH, c);
  return c;
};
sre.DirectSpeechGenerator = function() {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.DirectSpeechGenerator, sre.AbstractSpeechGenerator);
sre.DirectSpeechGenerator.prototype.getSpeech = function(a, b) {
  return sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.SPEECH);
};
sre.DummySpeechGenerator = function() {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.DummySpeechGenerator, sre.AbstractSpeechGenerator);
sre.DummySpeechGenerator.prototype.getSpeech = function(a, b) {
  return "";
};
sre.TreeSpeechGenerator = function() {};
goog.inherits(sre.TreeSpeechGenerator, sre.AbstractSpeechGenerator);
sre.TreeSpeechGenerator.prototype.getSpeech = function(a, b) {
  var c = this.generateSpeech(a, b);
  a.setAttribute(sre.EnrichMathml.Attribute.SPEECH, c);
  var d = this.getRebuilt().nodeDict,
    e;
  for (e in d) {
    var f = d[e],
      g = sre.WalkerUtil.getBySemanticId(b, e),
      h = sre.WalkerUtil.getBySemanticId(a, e);
    g &&
      h &&
      (sre.SpeechGeneratorUtil.addSpeech(h, f),
      sre.SpeechGeneratorUtil.addPrefix(h, f));
  }
  return c;
};
sre.NodeSpeechGenerator = function() {
  sre.TreeSpeechGenerator.call(this);
};
goog.inherits(sre.NodeSpeechGenerator, sre.TreeSpeechGenerator);
sre.NodeSpeechGenerator.prototype.getSpeech = function(a, b) {
  var c = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.SPEECH);
  return c ? c : sre.NodeSpeechGenerator.superClass_.getSpeech.call(this, a, b);
};
sre.SummarySpeechGenerator = function() {};
goog.inherits(sre.SummarySpeechGenerator, sre.AbstractSpeechGenerator);
sre.SummarySpeechGenerator.prototype.getSpeech = function(a, b) {
  sre.SpeechGeneratorUtil.connectAllMactions(b, this.getRebuilt().xml);
  return this.generateSpeech(a, b);
};
sre.SpeechGeneratorFactory = {};
sre.SpeechGeneratorFactory.generator = function(a) {
  return new (sre.SpeechGeneratorFactory.generatorMapping_[a] ||
    sre.SpeechGeneratorFactory.generatorMapping_.Direct)();
};
sre.SpeechGeneratorFactory.generatorMapping_ = {
  Adhoc: sre.AdhocSpeechGenerator,
  Direct: sre.DirectSpeechGenerator,
  Dummy: sre.DummySpeechGenerator,
  Node: sre.NodeSpeechGenerator,
  Summary: sre.SummarySpeechGenerator,
  Tree: sre.TreeSpeechGenerator
};
sre.EventUtil = {};
sre.EventUtil.KeyCode = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  TAB: 9,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
};
sre.EventUtil.EventType = {
  CLICK: "click",
  DBLCLICK: "dblclick",
  MOUSEDOWN: "mousedown",
  MOUSEUP: "mouseup",
  MOUSEOVER: "mouseover",
  MOUSEOUT: "mouseout",
  MOUSEMOVE: "mousemove",
  SELECTSTART: "selectstart",
  KEYPRESS: "keypress",
  KEYDOWN: "keydown",
  KEYUP: "keyup",
  TOUCHSTART: "touchstart",
  TOUCHMOVE: "touchmove",
  TOUCHEND: "touchend",
  TOUCHCANCEL: "touchcancel"
};
sre.EventUtil.Event = function(a, b, c) {
  this.src = a;
  this.type = b;
  this.callback = c;
};
sre.EventUtil.Event.prototype.add = function() {
  this.src.addEventListener(this.type, this.callback);
};
sre.EventUtil.Event.prototype.remove = function() {
  this.src.removeEventListener(this.type, this.callback);
};
sre.Focus = function(a, b) {
  this.semanticNodes_ = a;
  this.semanticPrimary_ = b;
  this.domNodes_ = [];
  this.domPrimary_ = null;
  this.allNodes_ = [];
};
sre.Focus.prototype.getSemanticPrimary = function() {
  return this.semanticPrimary_;
};
sre.Focus.prototype.getSemanticNodes = function() {
  return this.semanticNodes_;
};
sre.Focus.prototype.getNodes = function() {
  return this.allNodes_;
};
sre.Focus.prototype.getDomNodes = function() {
  return this.domNodes_;
};
sre.Focus.prototype.getDomPrimary = function() {
  return this.domPrimary_;
};
sre.Focus.prototype.toString = function() {
  return "Primary:" + this.domPrimary_ + " Nodes:" + this.domNodes_;
};
sre.Focus.prototype.clone = function() {
  var a = new sre.Focus(this.semanticNodes_, this.semanticPrimary_);
  a.domNodes_ = this.domNodes_;
  a.domPrimary_ = this.domPrimary_;
  a.allNodes_ = this.allNodes_;
  return a;
};
sre.Focus.factory = function(a, b, c, d) {
  var e = function(a) {
      return sre.WalkerUtil.getBySemanticId(d, a);
    },
    f = c.nodeDict;
  c = e(a);
  var e = b.map(e),
    g = b.map(function(a) {
      return f[a];
    });
  a = new sre.Focus(g, f[a]);
  a.domNodes_ = e;
  a.domPrimary_ = c;
  a.allNodes_ = sre.Focus.generateAllVisibleNodes_(b, e, f, d);
  return a;
};
sre.Focus.generateAllVisibleNodes_ = function(a, b, c, d) {
  for (
    var e = function(a) {
        return sre.WalkerUtil.getBySemanticId(d, a);
      },
      f = [],
      g = 0,
      h = a.length;
    g < h;
    g++
  )
    if (b[g]) f.push(b[g]);
    else {
      var k = c[a[g]];
      if (k)
        var k = k.childNodes.map(function(a) {
            return a.id.toString();
          }),
          l = k.map(e),
          f = f.concat(sre.Focus.generateAllVisibleNodes_(k, l, c, d));
    }
  return f;
};
sre.Walker = function() {};
sre.Walker.prototype.isActive = function() {};
sre.Walker.prototype.activate = function() {};
sre.Walker.prototype.deactivate = function() {};
sre.Walker.prototype.speech = function() {};
sre.Walker.prototype.getFocus = function() {};
sre.Walker.prototype.setFocus = function(a) {};
sre.Walker.prototype.getDepth = function() {};
sre.Walker.prototype.move = function(a) {};
sre.AbstractWalker = function(a, b, c, d) {
  this.node = a;
  this.xml = sre.DomUtil.parseInput(d);
  this.generator = b;
  this.rebuilt = this.rebuildStree_();
  this.generator.setRebuilt(this.rebuilt);
  this.highlighter = c;
  this.active_ = !1;
  this.keyMapping_ = {};
  this.keyMapping_[sre.EventUtil.KeyCode.UP] = goog.bind(this.up, this);
  this.keyMapping_[sre.EventUtil.KeyCode.DOWN] = goog.bind(this.down, this);
  this.keyMapping_[sre.EventUtil.KeyCode.RIGHT] = goog.bind(this.right, this);
  this.keyMapping_[sre.EventUtil.KeyCode.LEFT] = goog.bind(this.left, this);
  this.keyMapping_[sre.EventUtil.KeyCode.TAB] = goog.bind(this.repeat, this);
  this.keyMapping_[sre.EventUtil.KeyCode.ENTER] = goog.bind(this.expand, this);
  this.keyMapping_[sre.EventUtil.KeyCode.SPACE] = goog.bind(this.depth, this);
  this.keyMapping_[sre.EventUtil.KeyCode.HOME] = goog.bind(this.home, this);
  this.dummy_ = function() {};
  this.rootNode = sre.WalkerUtil.getSemanticRoot(a);
  this.rootId = this.rebuilt.stree.root.id.toString();
  this.focus_ = sre.Focus.factory(
    this.rootId,
    [this.rootId],
    this.rebuilt,
    this.node
  );
  this.moved = sre.AbstractWalker.move.ENTER;
};
sre.AbstractWalker.move = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  REPEAT: "repeat",
  DEPTH: "depth",
  ENTER: "enter",
  EXPAND: "expand",
  HOME: "home"
};
sre.AbstractWalker.prototype.isActive = function() {
  return this.active_;
};
sre.AbstractWalker.prototype.toggleActive_ = function() {
  this.active_ = !this.active_;
};
sre.AbstractWalker.prototype.activate = function() {
  this.isActive() || (this.generator.start(), this.toggleActive_());
};
sre.AbstractWalker.prototype.deactivate = function() {
  this.isActive() &&
    (this.highlighter.setState(this.node.id, this.primaryId()),
    this.generator.end(),
    this.toggleActive_());
};
sre.AbstractWalker.prototype.getFocus = function() {
  return this.focus_;
};
sre.AbstractWalker.prototype.setFocus = function(a) {
  this.focus_ = a;
};
sre.AbstractWalker.prototype.getDepth = function() {
  return this.levels.depth() - 1;
};
sre.AbstractWalker.prototype.speech = function() {
  var a = this.focus_.getDomNodes(),
    b = this.focus_.getSemanticNodes();
  if (!a.length) return "";
  var c = a[0]
    ? sre.WalkerUtil.getAttribute(a[0], sre.EnrichMathml.Attribute.PREFIX)
    : sre.SpeechGeneratorUtil.retrievePrefix(b[0]);
  if (this.moved === sre.AbstractWalker.move.DEPTH)
    return this.levelAnnouncement_(c);
  for (var d = [], e = 0, f = a.length; e < f; e++) {
    var g = a[e],
      h = b[e];
    d.push(
      g
        ? this.generator.getSpeech(g, this.xml)
        : sre.SpeechGeneratorUtil.retrieveSpeech(this.xml, h)
    );
  }
  c && d.unshift(c);
  return sre.AuditoryDescription.mergeStrings(d);
};
sre.AbstractWalker.prototype.levelAnnouncement_ = function(a) {
  var b = this.focus_.getDomPrimary(),
    b =
      (this.expandable(b) && "expandable") ||
      (this.collapsible(b) && "collapsible") ||
      "",
    c = [
      sre.AuditoryDescription.speechString([
        new sre.AuditoryDescription({
          text: "Level " + this.getDepth(),
          personality: {}
        })
      ])
    ];
  a && c.push(a);
  b && c.push(b);
  return sre.AuditoryDescription.mergeStrings(c);
};
sre.AbstractWalker.prototype.move = function(a) {
  a = this.keyMapping_[a];
  if (!a) return null;
  a = a();
  if (!a || a === this.focus_) return !1;
  this.focus_ = a;
  this.moved === sre.AbstractWalker.move.HOME &&
    (this.levels = this.initLevels());
  return !0;
};
sre.AbstractWalker.prototype.up = function() {
  this.moved = sre.AbstractWalker.move.UP;
  return this.focus_;
};
sre.AbstractWalker.prototype.down = function() {
  this.moved = sre.AbstractWalker.move.DOWN;
  return this.focus_;
};
sre.AbstractWalker.prototype.left = function() {
  this.moved = sre.AbstractWalker.move.LEFT;
  return this.focus_;
};
sre.AbstractWalker.prototype.right = function() {
  this.moved = sre.AbstractWalker.move.RIGHT;
  return this.focus_;
};
sre.AbstractWalker.prototype.repeat = function() {
  this.moved = sre.AbstractWalker.move.REPEAT;
  return this.focus_.clone();
};
sre.AbstractWalker.prototype.depth = function() {
  this.moved = sre.AbstractWalker.move.DEPTH;
  return this.focus_.clone();
};
sre.AbstractWalker.prototype.home = function() {
  this.moved = sre.AbstractWalker.move.HOME;
  return sre.Focus.factory(this.rootId, [this.rootId], this.rebuilt, this.node);
};
sre.AbstractWalker.prototype.getBySemanticId = function(a) {
  return sre.WalkerUtil.getBySemanticId(this.node, a);
};
sre.AbstractWalker.prototype.primaryId = function() {
  return this.focus_.getSemanticPrimary().id.toString();
};
sre.AbstractWalker.prototype.expand = function() {
  var a = this.focus_.getDomPrimary(),
    a = this.actionable_(a);
  if (!a) return this.focus_;
  this.moved = sre.AbstractWalker.move.EXPAND;
  a.onclick();
  return this.focus_.clone();
};
sre.AbstractWalker.prototype.actionable_ = function(a) {
  return a && a.parentNode && this.highlighter.isMactionNode(a.parentNode)
    ? a.parentNode
    : null;
};
sre.AbstractWalker.prototype.expandable = function(a) {
  return !!this.actionable_(a) && 0 === a.childNodes.length;
};
sre.AbstractWalker.prototype.collapsible = function(a) {
  return !!this.actionable_(a) && 0 < a.childNodes.length;
};
sre.AbstractWalker.prototype.restoreState = function() {
  if (this.highlighter) {
    var a = this.highlighter.getState(this.node.id);
    if (a) {
      for (var b = this.rebuilt.nodeDict[a], a = []; b; )
        a.push(b.id), (b = b.parent);
      for (a.pop(); 0 < a.length; ) {
        this.down();
        b = a.pop();
        b = this.findFocusOnLevel(b);
        if (!b) break;
        this.focus_ = b;
      }
      this.moved = sre.AbstractWalker.move.ENTER;
    }
  }
};
sre.AbstractWalker.prototype.findFocusOnLevel = goog.abstractMethod;
sre.AbstractWalker.prototype.initLevels = goog.abstractMethod;
sre.AbstractWalker.prototype.rebuildStree_ = function() {
  var a = new sre.RebuildStree(this.xml);
  sre.SpeechGeneratorUtil.connectMactions(this.node, this.xml, a.xml);
  return a;
};
sre.AbstractWalker.prototype.previousLevel = function() {
  var a = this.focus_.getDomPrimary();
  return a
    ? sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.PARENT)
    : this.focus_.getSemanticPrimary().parent.id.toString();
};
sre.AbstractWalker.prototype.nextLevel = function() {
  var a = this.focus_.getDomPrimary();
  if (a) {
    var b = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CHILDREN)
      ),
      c = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CONTENT)
      ),
      d = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.TYPE),
      a = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.ROLE);
    return this.combineContentChildren(d, a, c, b);
  }
  c = function(a) {
    return a.id.toString();
  };
  d = this.rebuilt.nodeDict[this.primaryId()];
  b = d.childNodes.map(c);
  c = d.contentNodes.map(c);
  return 0 === b.length
    ? []
    : this.combineContentChildren(d.type, d.role, c, b);
};
sre.AbstractWalker.prototype.combineContentChildren = goog.abstractMethod;
sre.AbstractWalker.prototype.singletonFocus = function(a) {
  return this.focusFromId(a, [a]);
};
sre.AbstractWalker.prototype.focusFromId = function(a, b) {
  return sre.Focus.factory(a, b, this.rebuilt, this.node);
};
sre.Levels = function() {
  this.level_ = [];
};
sre.Levels.prototype.push = function(a) {
  this.level_.push(a);
};
sre.Levels.prototype.pop = function() {
  return this.level_.pop();
};
sre.Levels.prototype.peek = function() {
  return this.level_[this.level_.length - 1] || null;
};
sre.Levels.prototype.indexOf = function(a) {
  var b = this.peek();
  return b ? b.indexOf(a) : null;
};
sre.Levels.prototype.find = function(a) {
  var b = this.peek();
  if (!b) return null;
  for (var c = 0, d = b.length; c < d; c++) if (a(b[c])) return b[c];
  return null;
};
sre.Levels.prototype.get = function(a) {
  var b = this.peek();
  return !b || 0 > a || a >= b.length ? null : b[a];
};
sre.Levels.prototype.depth = function() {
  return this.level_.length;
};
sre.Levels.prototype.toString = function() {
  for (var a = "", b = 0, c; (c = this.level_[b]); b++)
    a +=
      "\n" +
      c.map(function(a) {
        return a.toString();
      });
  return a;
};
sre.DummyWalker = function(a, b, c, d) {
  sre.AbstractWalker.call(this, a, b, c, d);
};
goog.inherits(sre.DummyWalker, sre.AbstractWalker);
sre.DummyWalker.prototype.up = function() {};
sre.DummyWalker.prototype.down = function() {};
sre.DummyWalker.prototype.left = function() {};
sre.DummyWalker.prototype.right = function() {};
sre.DummyWalker.prototype.repeat = function() {};
sre.DummyWalker.prototype.depth = function() {};
sre.DummyWalker.prototype.home = function() {};
sre.DummyWalker.prototype.getDepth = function() {
  return 0;
};
sre.DummyWalker.prototype.initLevels = function() {
  return new sre.Levels();
};
sre.SemanticWalker = function(a, b, c, d) {
  sre.AbstractWalker.call(this, a, b, c, d);
  this.levels = new sre.Levels();
  this.levels.push([this.getFocus()]);
  this.restoreState();
};
goog.inherits(sre.SemanticWalker, sre.AbstractWalker);
sre.SemanticWalker.prototype.up = function() {
  sre.SemanticWalker.superClass_.up.call(this);
  var a = this.previousLevel();
  if (!a) return null;
  this.levels.pop();
  return this.levels.find(function(b) {
    return b.getSemanticNodes().some(function(b) {
      return b.id.toString() === a;
    });
  });
};
sre.SemanticWalker.prototype.down = function() {
  sre.SemanticWalker.superClass_.down.call(this);
  var a = this.nextLevel();
  if (0 === a.length) return null;
  this.levels.push(a);
  return a[0];
};
sre.SemanticWalker.prototype.combineContentChildren = function(a, b, c, d) {
  switch (a) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return this.makePairList(d, c);
    case sre.SemanticAttr.Type.PREFIXOP:
      return [this.focusFromId(d[0], c.concat(d))];
    case sre.SemanticAttr.Type.POSTFIXOP:
      return [this.focusFromId(d[0], d.concat(c))];
    case sre.SemanticAttr.Type.MATRIX:
    case sre.SemanticAttr.Type.VECTOR:
    case sre.SemanticAttr.Type.FENCED:
      return [this.focusFromId(d[0], [c[0], d[0], c[1]])];
    case sre.SemanticAttr.Type.CASES:
      return [this.focusFromId(d[0], [c[0], d[0]])];
    case sre.SemanticAttr.Type.PUNCTUATED:
      return b === sre.SemanticAttr.Role.TEXT
        ? d.map(goog.bind(this.singletonFocus, this))
        : d.length === c.length
        ? c.map(goog.bind(this.singletonFocus, this))
        : this.combinePunctuations(d, c, [], []);
    case sre.SemanticAttr.Type.APPL:
      return [this.focusFromId(d[0], [d[0], c[0]]), this.singletonFocus(d[1])];
    case sre.SemanticAttr.Type.ROOT:
      return [this.singletonFocus(d[1]), this.singletonFocus(d[0])];
    default:
      return d.map(goog.bind(this.singletonFocus, this));
  }
};
sre.SemanticWalker.prototype.combinePunctuations = function(a, b, c, d) {
  if (0 === a.length) return d;
  var e = a.shift(),
    f = b.shift();
  if (e === f) return c.push(f), this.combinePunctuations(a, b, c, d);
  b.unshift(f);
  c.push(e);
  if (a.length === b.length) return d.push(this.focusFromId(e, c.concat(b))), d;
  d.push(this.focusFromId(e, c));
  return this.combinePunctuations(a, b, [], d);
};
sre.SemanticWalker.prototype.makePairList = function(a, b) {
  if (0 === a.length) return [];
  if (1 === a.length) return [this.singletonFocus(a[0])];
  for (
    var c = [this.singletonFocus(a.shift())], d = 0, e = a.length;
    d < e;
    d++
  )
    c.push(this.focusFromId(a[d], [b[d], a[d]]));
  return c;
};
sre.SemanticWalker.prototype.left = function() {
  sre.SemanticWalker.superClass_.left.call(this);
  var a = this.levels.indexOf(this.getFocus()) - 1;
  return (a = this.levels.get(a)) ? a : null;
};
sre.SemanticWalker.prototype.right = function() {
  sre.SemanticWalker.superClass_.right.call(this);
  var a = this.levels.indexOf(this.getFocus()) + 1;
  return (a = this.levels.get(a)) ? a : null;
};
sre.SemanticWalker.prototype.findFocusOnLevel = function(a) {
  return this.levels.find(function(b) {
    return b.getSemanticPrimary().id === a;
  });
};
sre.SyntaxWalker = function(a, b, c, d) {
  sre.AbstractWalker.call(this, a, b, c, d);
  this.levels = new sre.Levels();
  this.levels.push([this.primaryId()]);
  this.restoreState();
};
goog.inherits(sre.SyntaxWalker, sre.AbstractWalker);
sre.SyntaxWalker.prototype.up = function() {
  sre.SyntaxWalker.superClass_.up.call(this);
  var a = this.previousLevel();
  if (!a) return null;
  this.levels.pop();
  return this.singletonFocus(a);
};
sre.SyntaxWalker.prototype.down = function() {
  sre.SyntaxWalker.superClass_.down.call(this);
  var a = this.nextLevel();
  if (0 === a.length) return null;
  var b = this.singletonFocus(a[0]);
  b && this.levels.push(a);
  return b;
};
sre.SyntaxWalker.prototype.combineContentChildren = function(a, b, c, d) {
  switch (a) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(d, c);
    case sre.SemanticAttr.Type.PREFIXOP:
      return c.concat(d);
    case sre.SemanticAttr.Type.POSTFIXOP:
      return d.concat(c);
    case sre.SemanticAttr.Type.MATRIX:
    case sre.SemanticAttr.Type.VECTOR:
    case sre.SemanticAttr.Type.FENCED:
      return d.unshift(c[0]), d.push(c[1]), d;
    case sre.SemanticAttr.Type.CASES:
      return d.unshift(c[0]), d;
    case sre.SemanticAttr.Type.PUNCTUATED:
      return b === sre.SemanticAttr.Role.TEXT
        ? sre.BaseUtil.interleaveLists(d, c)
        : d;
    case sre.SemanticAttr.Type.APPL:
      return [d[0], c[0], d[1]];
    case sre.SemanticAttr.Type.ROOT:
      return [d[1], d[0]];
    default:
      return d;
  }
};
sre.SyntaxWalker.prototype.left = function() {
  sre.SyntaxWalker.superClass_.left.call(this);
  var a = this.levels.indexOf(this.primaryId()) - 1;
  return (a = this.levels.get(a)) ? this.singletonFocus(a) : null;
};
sre.SyntaxWalker.prototype.right = function() {
  sre.SyntaxWalker.superClass_.right.call(this);
  var a = this.levels.indexOf(this.primaryId()) + 1;
  return (a = this.levels.get(a)) ? this.singletonFocus(a) : null;
};
sre.SyntaxWalker.prototype.findFocusOnLevel = function(a) {
  return this.singletonFocus(a.toString());
};
sre.TableWalker = function(a, b, c, d) {
  sre.SyntaxWalker.call(this, a, b, c, d);
  this.modifier = !1;
};
goog.inherits(sre.TableWalker, sre.SyntaxWalker);
sre.TableWalker.prototype.move = function(a) {
  a = sre.TableWalker.superClass_.move.call(this, a);
  this.modifier = !1;
  return a;
};
sre.TableWalker.prototype.up = function() {
  return this.eligibleCell_()
    ? this.verticalMove_(!1)
    : sre.TableWalker.superClass_.up.call(this);
};
sre.TableWalker.prototype.down = function() {
  return this.eligibleCell_()
    ? this.verticalMove_(!0)
    : sre.TableWalker.superClass_.down.call(this);
};
sre.TableWalker.prototype.eligibleCell_ = function() {
  var a = this.getFocus().getSemanticPrimary();
  return (
    this.modifier &&
    a.type === sre.SemanticAttr.Type.CELL &&
    a.role === sre.SemanticAttr.Role.TABLE
  );
};
sre.TableWalker.prototype.verticalMove_ = function(a) {
  var b = this.previousLevel();
  if (!b) return null;
  var c = this.getFocus(),
    d = this.levels.indexOf(this.primaryId()),
    e = this.levels.pop(),
    b = this.levels.indexOf(b);
  a = this.levels.get(a ? b + 1 : b - 1);
  if (!a) return this.levels.push(e), null;
  this.setFocus(this.singletonFocus(a));
  a = this.nextLevel();
  if (!a[d]) return this.setFocus(c), this.levels.push(e), null;
  this.levels.push(a);
  return this.singletonFocus(a[d]);
};
sre.WalkerFactory = {};
sre.WalkerFactory.walker = function(a, b, c, d, e) {
  return new (sre.WalkerFactory.walkerMapping_[a] ||
    sre.WalkerFactory.walkerMapping_.Dummy)(b, c, d, e);
};
sre.WalkerFactory.walkerMapping_ = {
  Dummy: sre.DummyWalker,
  Semantic: sre.SemanticWalker,
  Syntax: sre.SyntaxWalker,
  Table: sre.TableWalker
};
sre.System = function() {
  this.version = "2.0.0-beta.1";
};
goog.addSingletonGetter(sre.System);
sre.System.Error = function(a) {
  Error.call(this);
  this.message = a || "";
  this.name = "System Error";
};
goog.inherits(sre.System.Error, Error);
sre.System.LocalStorage_ = function() {
  this.speechGenerator = this.walker = null;
};
goog.addSingletonGetter(sre.System.LocalStorage_);
sre.System.prototype.setupEngine = function(a) {
  var b = sre.Engine.getInstance(),
    c = function(c) {
      b[c] = a[c] || b[c];
    };
  c("mode");
  sre.System.prototype.configBlocks_(a);
  ["strict", "cache", "semantics"].forEach(function(c) {
    void 0 !== a[c] && (b[c] = !!a[c]);
  });
  ["markup", "style", "domain", "speech", "walker"].forEach(c);
  a.json && (sre.SystemExternal.jsonPath = sre.BaseUtil.makePath(a.json));
  a.xpath && (sre.SystemExternal.WGXpath = a.xpath);
  b.setupBrowsers();
  b.ruleSets = a.rules ? a.rules : sre.SpeechRuleStores.availableSets();
  sre.SpeechRuleEngine.getInstance().parameterize(b.ruleSets);
  b.dynamicCstr = sre.DynamicCstr.create(b.domain, b.style);
  b.comparator = new sre.DynamicCstr.DefaultComparator(
    b.dynamicCstr,
    sre.DynamicProperties.create(["default"], ["short", "default"])
  );
};
sre.System.prototype.configBlocks_ = function(a) {
  if (sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP)
    for (
      var b = document.documentElement.querySelectorAll(
          'script[type="text/x-sre-config"]'
        ),
        c = 0,
        d = b.length;
      c < d;
      c++
    )
      try {
        var e = b[c].innerHTML,
          f = JSON.parse(e),
          g;
        for (g in f) a[g] = f[g];
      } catch (h) {
        sre.Debugger.getInstance().output("Illegal configuration ", e);
      }
};
sre.System.prototype.toSpeech = function(a) {
  return (a = sre.System.getInstance().parseExpression_(
    a,
    sre.Engine.getInstance().semantics
  ))
    ? sre.System.getInstance().processXml(a)
    : "";
};
sre.System.prototype.processExpression = sre.System.prototype.toSpeech;
sre.System.prototype.toSemantic = function(a) {
  return sre.System.getInstance().parseExpression_(a, !0);
};
sre.System.prototype.toJson = function(a) {
  if (sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP)
    throw new sre.System.Error("JSON translation not possible in browser.");
  return (a = sre.System.getInstance().parseExpression_(a, !0))
    ? sre.SystemExternal.xm.tojson(a.toString())
    : {};
};
sre.System.prototype.toDescription = function(a) {
  return (a = sre.System.getInstance().parseExpression_(
    a,
    sre.Engine.getInstance().semantics
  ))
    ? sre.SpeechGeneratorUtil.computeSpeech(a)
    : [];
};
sre.System.prototype.toEnriched = function(a) {
  a = sre.Enrich.semanticMathmlSync(a);
  var b = sre.WalkerUtil.getSemanticRoot(a);
  switch (sre.Engine.getInstance().speech) {
    case sre.Engine.Speech.SHALLOW:
      var c = sre.SpeechGeneratorFactory.generator("Adhoc");
      c.getSpeech(b, a);
      break;
    case sre.Engine.Speech.DEEP:
      (c = sre.SpeechGeneratorFactory.generator("Tree")), c.getSpeech(b, a);
  }
  return a;
};
sre.System.prototype.fileToSpeech = function(a, b) {
  sre.System.getInstance().processFile_(
    sre.System.getInstance().toSpeech,
    a,
    b
  );
};
sre.System.prototype.processFile = sre.System.prototype.fileToSpeech;
sre.System.prototype.fileToSemantic = function(a, b) {
  sre.System.getInstance().processFile_(
    function(a) {
      return sre.System.getInstance()
        .toSemantic(a)
        .toString();
    },
    a,
    b
  );
};
sre.System.prototype.fileToJson = function(a, b) {
  sre.System.getInstance().processFile_(
    function(a) {
      return JSON.stringify(sre.System.getInstance().toJson(a));
    },
    a,
    b
  );
};
sre.System.prototype.fileToDescription = function(a, b) {
  sre.System.getInstance().processFile_(
    function(a) {
      return JSON.stringify(sre.System.getInstance().toDescription(a));
    },
    a,
    b
  );
};
sre.System.prototype.fileToEnriched = function(a, b) {
  sre.System.getInstance().processFile_(
    function(a) {
      return sre.System.getInstance()
        .toEnriched(a)
        .toString();
    },
    a,
    b
  );
};
sre.System.prototype.processXml = function(a) {
  a = sre.SpeechGeneratorUtil.computeSpeech(a);
  return sre.AuditoryDescription.speechString(a);
};
sre.System.prototype.parseExpression_ = function(a, b) {
  var c = null;
  try {
    (c = sre.DomUtil.parseInput(a, sre.System.Error)),
      b && (c = sre.System.getInstance().getSemanticTree(c)),
      sre.Debugger.getInstance().generateOutput(
        goog.bind(function() {
          return c.toString();
        }, this)
      );
  } catch (d) {
    console.log("Parse Error: " + d.message);
  }
  return c;
};
sre.System.prototype.getSemanticTree = function(a) {
  return sre.Semantic.xmlTree(a);
};
sre.System.prototype.inputFile_ = function(a) {
  try {
    var b = sre.SystemExternal.fs.readFileSync(a, { encoding: "utf8" });
  } catch (c) {
    throw new sre.System.Error("Can not open file: " + a);
  }
  return b;
};
sre.System.prototype.processFile_ = function(a, b, c) {
  b = sre.System.getInstance().inputFile_(b);
  a = a(b);
  if (c)
    try {
      sre.SystemExternal.fs.writeFileSync(c, a);
    } catch (d) {
      throw new sre.System.Error("Can not write to file: " + c);
    }
  else console.log(a);
};
sre.System.prototype.walk = function(a) {
  var b = sre.SpeechGeneratorFactory.generator("Node");
  sre.System.LocalStorage_.getInstance().speechGenerator = b;
  var c = sre.HighlighterFactory.highlighter(
    { color: "black" },
    { color: "white" },
    { renderer: "NativeMML" }
  );
  a = sre.System.getInstance().toEnriched(a);
  var d = new sre.SystemExternal.xmldom.XMLSerializer().serializeToString(a);
  sre.System.LocalStorage_.getInstance().walker = sre.WalkerFactory.walker(
    sre.Engine.getInstance().walker,
    a,
    b,
    c,
    d
  );
  return sre.System.LocalStorage_.getInstance().walker.speech();
};
sre.System.prototype.move = function(a) {
  if (!sre.System.LocalStorage_.getInstance().walker) return null;
  var b = "string" === typeof a ? sre.EventUtil.KeyCode[a.toUpperCase()] : a;
  return !1 === sre.System.LocalStorage_.getInstance().walker.move(b)
    ? sre.AuditoryDescription.error(a)
    : sre.System.LocalStorage_.getInstance().walker.speech();
};
sre.Mathjax = {};
(function() {
  var a = sre.System.getInstance(),
    b = MathJax.Callback.Signal("Sre");
  MathJax.Extension.Sre = {
    version: a.version,
    signal: b,
    ConfigSre: function() {
      sre.Engine.isReady()
        ? MathJax.Callback.Queue(
            MathJax.Hub.Register.StartupHook("mml Jax Ready", {}),
            ["Post", MathJax.Hub.Startup.signal, "Sre Ready"]
          )
        : setTimeout(MathJax.Extension.Sre.ConfigSre, 500);
    }
  };
  sre.System.getInstance().setupEngine({
    mode: sre.Engine.Mode.HTTP,
    json: MathJax.Ajax.config.path.SRE + "/mathmaps",
    xpath: MathJax.Ajax.config.path.SRE + "/wgxpath.install.js",
    semantics: !0
  });
  MathJax.Extension.Sre.ConfigSre();
})();
