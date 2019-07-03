!function() {
    "use strict";
    function e() {
        this.middlewares = [],
        this.events = {}
    }
    function a(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    function i(e, t, n) {
        return t && r(e.prototype, t),
        n && r(e, n),
        e
    }
    function o(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }),
        t && n(e, t)
    }
    function c(e) {
        return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }
        )(e)
    }
    function n(e, t) {
        return (n = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t,
            e
        }
        )(e, t)
    }
    function s(e, t) {
        return !t || "object" != typeof t && "function" != typeof t ? function n(e) {
            if (void 0 === e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }
    function u(e) {
        throw new Error('"' + e + '" is read-only')
    }
    e.prototype.on = function(e, t) {
        this.events[e] = this.events[e] || [],
        this.events[e].push(t)
    }
    ,
    e.prototype.emit = function(e, t) {
        var n = this.events[e];
        if (!n || 0 === n.length)
            return !1;
        for (var r, a = 0; r = n[a++]; )
            r.call(this, t)
    }
    ,
    e.prototype.use = function(e) {
        return this.middlewares.push(e),
        this
    }
    ,
    e.prototype.init = function() {
        /*var e = "https:" == location.protocol ? "https://" : "http://"
          , t = document.createElement("script")
          , n = localStorage.getItem("PTSID");
        t.type = "text/javascript",
        t.async = !1,
        t.charset = "UTF-8",
        t.src = "./c.5ab46127.v2.js" + (new Date).getTime(),
        document.getElementsByTagName("head")[0].appendChild(t),*/
        window.$$__pt_engage_$ = this
    }
    ,
    e.prototype.run = function(e) {
        if (!e)
            return !1;
        var t = this
          , n = {
            window: window,
            setting: e,
            engager: t
        }
          , r = 0;
        !function a() {
            var e = t.middlewares[r++];
            e && e(n, a)
        }()
    }
    ;
    var l = ("https:" == location.protocol ? "https://" : "http://") + "collect.ptengine.cn/egg";
    function d(e) {
        var t = e.method
          , n = e.data
          , r = e.url
          , a = e.callback;
        t = t || "GET";
        var i = new XMLHttpRequest;
        "withCredentials"in i ? i.open(t, r, !0) : "undefined" != typeof XDomainRequest ? (u("xhr"),
        (i = new XDomainRequest).open(t, r)) : (u("xhr"),
        i = null),
        i && (a && (i.onreadystatechange = function() {
            i.readyState !== XMLHttpRequest.DONE || 200 !== i.status && 201 !== i.status || a(i.responseText)
        }
        ),
        i.send(n))
    }
    function f(e, t) {
        try {
            var n = function c(e, t, n) {
                if (1 === arguments.length) {
                    var r, a = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
                    return (r = document.cookie.match(a)) ? unescape(r[2]) : null
                }
                if (1 < arguments.length) {
                    var i, o = "";
                    n.expires && ("number" == typeof n.expires || n.expires.toUTCString) && ("number" == typeof n.expires ? (i = new Date).setTime(i.getTime() + 24 * n.expires * 60 * 60 * 1e3) : i = n.expires,
                    o = "; expires=" + i.toUTCString()),
                    document.cookie = e + "=" + t + o + "; path=/;"
                }
            }("pt_" + e);
            return -1 != n.indexOf(t) ? n.split(t + "=")[1].split("&")[0] : ""
        } catch (r) {
            console.log(r)
        }
    }
    function p(e) {
        return 1 == function t(e) {
            return +f(e = e || localStorage.getItem("PTSID"), "vn")
        }(e = e || localStorage.getItem("PTSID"))
    }
    function g() {
        try {
            var e = navigator.userAgent;
            return e ? function r() {
                var e = navigator.platform.toLowerCase();
                if (-1 < e.indexOf("win"))
                    return !0;
                for (var t = ["mac68k", "macppc", "macintosh", "macintel"], n = 0; n < t.length; n++)
                    if (e == t[n])
                        return !0;
                return !1
            }() || function a(e) {
                for (var t = ["AIX", "Amiga", "BeOS", "DragonFly", "FreeBSD", "GNU", "Haiku", "HP-UX", "IRIX", "Joli", "Java", "Macintosh", "Minix", "MorphOS", "NetBSD", "OpenBSD", "PClinuxOS", "QNX x86pc", "SunOS", "Ubuntu", "Mint", "Red Hat", "Slackware", "SUSE", "PCLinuxOS", "Debian", "Fedora", "CentOS", "Vine", "Arch Linux", "Gentoo", "Kanotix", "Mandriva"], n = 0; n < t.length; n++)
                    if (-1 < e.indexOf(t[n]))
                        return !0;
                return !1
            }(e) ? function i(e) {
                for (var t = ["Android", "AROS", "Bada", "BlackBerry", "Chromium", "CrOS", "Danger Hiptop", "Inferno", "iPhone", "iPad", "iPod", "Nintendo DS", "Nintendo Wii", "Palm OS", "PLAYSTATION", "Syllable", "SymbOS", "Symbian", "Tizen", "webOS", "WebTV", "Windows CE", "Windows Mobile", "Windows Phone", "Xbox"], n = 0; n < t.length; n++)
                    if (-1 < e.indexOf(t[n]))
                        return !0;
                return !1
            }(e) ? 3 : e.match(/.*MSIE.*Windows NT 6\.2;.*Touch\).*/) ? 4 : 2 : -1 < e.indexOf("iPad") || 1e3 <= Math.min(function n() {
                try {
                    var e = window.screen.width;
                    return e ? isNaN(parseInt(e, 10)) ? 0 : parseInt(e, 10) : 0
                } catch (t) {
                    return 0
                }
            }(), window.screen.height) ? 4 : 1 : 0
        } catch (t) {
            return 0
        }
    }
    function v(n) {
        if ("string" == typeof n) {
            return ["?", "^", "$", "*", "+", "(", ")", "|"].map(function(e) {
                var t = new RegExp("(\\" + e + ")","g");
                n = n.replace(t, "\\$1")
            }),
            n
        }
    }
    function h(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)","i")
          , n = window.location.search.substr(1).match(t);
        return null != n ? decodeURIComponent(n[2]) : null
    }
    function m(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
    }
    function H(e, t) {
        if (e) {
            var n = JSON.parse(localStorage.getItem("engager") || "{}");
            n[e] = t,
            localStorage.setItem("engager", JSON.stringify(n))
        }
    }
    function q(e) {
        var t;
        if (e) {
            var n = JSON.parse(localStorage.getItem("engager") || "{}");
            n.hasOwnProperty(e) && (t = n[e])
        }
        return t
    }
    function $(e, t) {
        "true" == (localStorage.getItem("enableLog") || "false") && console.log(e || "", t || "")
    }
    var t = function() {
        function e() {
            a(this, e),
            this.timezone = ""
        }
        return i(e, [{
            key: "setTimeZone",
            value: function(e) {
                this.timezone = e
            }
        }, {
            key: "getProfileTimeStamp",
            value: function() {
                var e = 0;
                if (this.timezone.trim()) {
                    var t, n = 60 * (new Date).getTimezoneOffset() * 1e3 * -1, r = this.timezone.replace(":", " ").split(" ");
                    2 == r.length && (t = 60 * Number(r[0].slice(1)) * 60 * 1e3 + 60 * Number(r[1]) * 1e3,
                    t = Number(r[0].slice(0, 1) + t));
                    var a = n - t;
                    e = Date.now() - a
                }
                return e
            }
        }]),
        e
    }()
      , y = new (function() {
        function e() {
            a(this, e),
            this.cache = {}
        }
        return i(e, [{
            key: "get",
            value: function(e) {
                return this.cache[e]
            }
        }, {
            key: "set",
            value: function(e, t) {
                this.cache[e] = t
            }
        }]),
        e
    }())
      , X = new t
      , w = function() {
        function e() {
            a(this, e)
        }
        return i(e, [{
            key: "validate",
            value: function() {
                throw {
                    name: "ImplementError",
                    message: "validate method should be implement by " + this.constructor.name
                }
            }
        }]),
        e
    }()
      , b = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                switch (t) {
                case "Match":
                    return e
                }
                return !1
            }
        }]),
        t
    }()
      , x = function(e) {
        function t() {
            var e;
            return a(this, t),
            (e = s(this, c(t).call(this))).currentTerminalType = g(),
            e
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                switch (t) {
                case "==":
                    return this.currentTerminalType == e;
                case "!=":
                    return this.currentTerminalType != e
                }
                return !1
            }
        }]),
        t
    }()
      , T = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = p() ? "NV" : "RV";
                switch (t) {
                case "==":
                    return n == e;
                case "!=":
                    return n != e
                }
                return !1
            }
        }]),
        t
    }()
      , k = function(e) {
        function n(e) {
            var t;
            return a(this, n),
            (t = s(this, c(n).call(this))).type = e,
            t
        }
        return o(n, w),
        i(n, [{
            key: "validate",
            value: function(e, t) {
                var n = this.type
                  , r = h(n) || "";
                if (!r) {
                    var a = n.toLowerCase().split("utm");
                    r = h(n = 0 < a.length && "utm".concat(a).replace(",", "_")) || ""
                }
                switch (t) {
                case "==":
                    return r == e;
                case "!=":
                    return r != e;
                case "Rex":
                    return new RegExp(e).test(r);
                case "[()]":
                    return -1 != r.indexOf(e);
                case "[(":
                    return new RegExp("^" + e).test(r);
                case ")]":
                    return new RegExp(e + "$").test(r)
                }
                return !1
            }
        }]),
        n
    }()
      , S = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n, r = document.referrer;
                switch (t) {
                case "==":
                    n = r == e;
                    break;
                case "Rex":
                    n = new RegExp(e).test(r);
                    break;
                case "[()]":
                    n = -1 != r.indexOf(e);
                    break;
                case "[(":
                    n = new RegExp("^" + r).test(e);
                    break;
                case ")]":
                    n = new RegExp(r + "$").test(e);
                    break;
                default:
                    n = !1
                }
                return n
            }
        }]),
        t
    }()
      , E = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n, r = location.href;
                switch (t) {
                case "==":
                    n = r == e || r.slice(0, -1) == e;
                    break;
                case "Rex":
                    n = new RegExp(e).test(r);
                    break;
                case "[()]":
                    n = -1 != r.indexOf(e);
                    break;
                case "![()]":
                    n = -1 == r.indexOf(e);
                    break;
                case "[(":
                    n = new RegExp("^" + v(e)).test(r);
                    break;
                case ")]":
                    n = new RegExp(v(e) + "$").test(r);
                    break;
                default:
                    n = !1
                }
                return n
            }
        }]),
        t
    }()
      , O = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = !1;
                try {
                    var r = location.href;
                    Array.isArray(t) || (t = JSON.parse(t));
                    for (var a = 0, i = t.length; a < i; a++) {
                        var o = t[a];
                        switch (o.pattern) {
                        case 2:
                            n = new RegExp(o.url).test(r);
                            break;
                        case 3:
                            n = new RegExp("^" + o.url).test(r);
                            break;
                        case 4:
                            n = new RegExp(o.url + "$").test(r);
                            break;
                        case 5:
                            n = o.url == r;
                            break;
                        case 8:
                            n = -1 < r.indexOf(o.url)
                        }
                    }
                } catch (c) {}
                return n
            }
        }]),
        t
    }()
      , C = function(e) {
        function t() {
            var e;
            return a(this, t),
            (e = s(this, c(t).call(this))).currentTerminalType = g(),
            e
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = e.context
                  , r = n.engager
                  , a = e.current;
                e = e.value;
                var i = !1;
                "==" == t && e && ("2" == this.currentTerminalType && m(document, "mousemove", function(e) {
                    e.clientY < 50 && !i && (r.emit("next", {
                        context: n,
                        current: a
                    }),
                    i = !0)
                }),
                "1" != this.currentTerminalType && "4" != this.currentTerminalType || (history.replaceState("beforeunload", null, null),
                history.pushState("back", null, null),
                window.addEventListener && window.addEventListener("popstate", function(e) {
                    "beforeunload" === e.state && (i || (i = !0,
                    r.emit("next", {
                        context: n,
                        current: a
                    })))
                })))
            }
        }]),
        t
    }()
      , I = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = e.context
                  , r = n.engager
                  , a = e.current;
                switch (t) {
                case "==":
                    setTimeout(function() {
                        r.emit("next", {
                            context: n,
                            current: a
                        })
                    }, 1e3 * +e.value);
                    break;
                case ">=":
                    setTimeout(function() {
                        r.emit("next", {
                            context: n,
                            current: a
                        })
                    }, 1e3 * (+e.value + 1))
                }
            }
        }]),
        t
    }()
      , A = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(r, e) {
                var a = r.context
                  , i = a.current
                  , o = a.engager
                  , c = (r = +r.value.replace("%", ""),
                !1);
                m(document, "scroll", function() {
                    setTimeout(function() {
                        var e = parseInt(document.body.scrollHeight, 10)
                          , t = document.documentElement.scrollTop || window.pageYOffset;
                        isNaN(t) && (screenTop = 0);
                        var n = (parseFloat(t) + parseInt(document.documentElement.clientHeight, 10)) / e * 100;
                        (Math.abs(n - r) <= 2 || r <= n) && !c && (c = !0,
                        o.emit("next", {
                            context: a,
                            current: i
                        }))
                    }, 50)
                })
            }
        }]),
        t
    }()
      , N = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = e.value
                  , r = e.context.current;
                switch (t) {
                case ">":
                    +JSON.parse(q(r.exp_id) || "{}").seenTimes >= n ? r.goNext = !1 : r.goNext = !0
                }
            }
        }]),
        t
    }()
      , _ = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = e.context
                  , r = e.value
                  , a = n.current
                  , i = JSON.parse(q(a.exp_id) || "{}");
                switch (t) {
                case "==":
                    !!i.hasClicked == r ? a.goNext = !1 : a.goNext = !0;
                    break;
                case "!=":
                    !!i.hasClicked != r ? a.goNext = !0 : a.goNext = !1
                }
            }
        }]),
        t
    }()
      , D = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n, r = X.getProfileTimeStamp(), a = r || Date.now();
                if (a = String(a).slice(0, -3),
                Array.isArray(e) || (e = [e]),
                0 < e.length) {
                    var i = e[0] ? a - e[0] : ""
                      , o = e[1] ? e[1] - a : "";
                    n = o ? 0 <= o && 0 <= i : i && 0 <= i
                } else
                    n = !0;
                return n
            }
        }]),
        t
    }()
      , P = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = X.getProfileTimeStamp()
                  , r = (n ? new Date(n) : new Date).getDay();
                return Array.isArray(e) || (e = [e]),
                0 == e.length || 7 == e.length || -1 < e.indexOf(r)
            }
        }]),
        t
    }()
      , R = function(e) {
        function t() {
            return a(this, t),
            s(this, c(t).call(this))
        }
        return o(t, w),
        i(t, [{
            key: "validate",
            value: function(e, t) {
                var n = X.getProfileTimeStamp()
                  , r = n ? new Date(n) : new Date
                  , a = r.getHours()
                  , i = (a = a < 10 ? "0" + a : a) + ":" + r.getMinutes();
                Array.isArray(e) || (e = [e]);
                var o = !1;
                if (0 < e.length) {
                    var c = e[0]
                      , s = e[1];
                    c <= i && i <= s && (o = !0)
                } else
                    o = !0;
                return o
            }
        }]),
        t
    }();
    function F(e) {
        var t = y.get(e);
        if (!t) {
            switch (e) {
            case "TerminalType":
                t = new x;
                break;
            case "VisitType":
                t = new T;
                break;
            case "utmCampaign":
            case "utmSource":
            case "utmMedium":
            case "utmContent":
            case "utmTerm":
                t = new k(e);
                break;
            case "EntryPage":
                t = new S;
                break;
            case "URL":
                t = new E;
                break;
            case "PageGroup":
                t = new O;
                break;
            case "UserBlur":
                t = new C;
                break;
            case "UserStay":
                t = new I;
                break;
            case "ScrollMatch":
                t = new A;
                break;
            case "UtmParameter":
                t = new k;
                break;
            case "ClickButton":
                t = new _;
                break;
            case "SeenTimes":
                t = new N;
                break;
            case "Dater":
                t = new D;
                break;
            case "Week":
                t = new P;
                break;
            case "Time":
                t = new R;
                break;
            case "AsyncUserProps":
                t = new b
            }
            y.set(e, t)
        }
        return t
    }
    var L = function() {
        function r(e, t, n) {
            a(this, r),
            this.value = e,
            this.condition = t,
            this.validator = n
        }
        return i(r, [{
            key: "setValue",
            value: function(e) {
                this.value = e
            }
        }, {
            key: "setCondition",
            value: function(e) {
                this.condition = e
            }
        }, {
            key: "setValidator",
            value: function(e) {
                this.validator = e
            }
        }, {
            key: "run",
            value: function() {
                var e;
                try {
                    return this.validator.validate(this.value, this.condition)
                } catch (t) {
                    $(t.name, t.message),
                    e = !1
                }
                return e
            }
        }]),
        r
    }();
    function W(e, t, n) {
        return new L(e,t,n)
    }
    var G = "LOCALVERSION"
      , Y = function Y(e, t) {
        if ($("the value of configs is:", t),
        t && Array.isArray(t))
            for (var n = W(), r = 0, a = t.length; r < a; r++) {
                var i = t[r]
                  , o = i.trigger || i.audiences;
                if (o.displayFor && 0 < o.displayFor.length) {
                    var c = o.displayFor;
                    $("ready to validate the trigger condition:", c);
                    for (var s = !0, u = 0, l = c.length; u < l; u++) {
                        var d = c[u];
                        if (n.setValue(d.value),
                        n.setCondition(d.condition),
                        n.setValidator(F(d.type)),
                        $("start to validate the trigger condition", n),
                        $("the result of validation is:", n.run()),
                        !n.run()) {
                            $("not satisfied with trigger condition"),
                            s = !1;
                            break
                        }
                    }
                    if (!s)
                        continue
                }
                if (Array.isArray(o)) {
                    $("ready to validate the trigger condition:", o);
                    for (var f = o, p = !1, g = 0, v = f.length; g < v; g++) {
                        $("print audiencesList", f);
                        var h = f[g].value
                          , m = !0;
                        if (Array.isArray(h)) {
                            $("print audienceValues", h);
                            for (var y = 0, w = h.length; y < w; y++) {
                                var b = h[y];
                                if (n.setValue(b.value),
                                n.setCondition(b.condition),
                                n.setValidator(F(b.type)),
                                $("start to validate the trigger condition", n),
                                $("the result of validation is:", n.run()),
                                !n.run()) {
                                    $("not satisfied with trigger condition"),
                                    m = !1;
                                    break
                                }
                            }
                        }
                        if (p = p || m) {
                            $("audienceCheckedOK", p);
                            break
                        }
                    }
                    if (!p)
                        continue
                }
                var x = i.experiments
                  , T = x.rate || i.rates
                  , k = -1;
                if (q("EXPRATE_" + i.engageId) == Array.prototype.join.call(T, ",") && (k = +q(G + "_" + i.engageId)),
                $("local version", k),
                -1 == k) {
                    var S = 0
                      , E = [];
                    for (r = 0,
                    u = T.length; r < u; r++)
                        E.push({
                            min: S,
                            max: S + T[r]
                        }),
                        S += T[r];
                    var O = Math.random();
                    for (r = 0,
                    u = E.length; r < u; r++)
                        if (O >= E[r].min && O < E[r].max) {
                            k = r,
                            H(G + "_" + i.engageId, k),
                            H("EXPRATE_" + i.engageId, Array.prototype.join.call(T, ","));
                            break
                        }
                    $(E),
                    $("random number is" + O, "whione = ")
                }
                var C = x.experiment ? x.experiment[k] : x[k];
                C && (e.current = C,
                e.current.engagerId = i.engageId);
                var I = e.current;
                I.displayAt = I.displayAt || I.config.when;
                var A = I.displayAt;
                if (!A.type || (n.setValue(A.value),
                n.setCondition(A.condition),
                n.setValidator(F(A.type)),
                $("current context ", e.current),
                $("validate value", n),
                $("the result of validation", n.run()),
                n.run())) {
                    if ($("ready to validate the stopToDisplay condition", I),
                    I.stopToDisplay = I.stopToDisplay || I.config.stop,
                    I.stopToDisplay && 0 < I.stopToDisplay.length)
                        for (var N = I.stopToDisplay, _ = 0, D = N.length; _ < D; _++) {
                            var P = N[_];
                            if (n.setValue({
                                value: P.value,
                                current: e.current,
                                context: e
                            }),
                            n.setCondition(P.condition),
                            n.setValidator(F(P.type)),
                            n.run(),
                            !e.current.goNext) {
                                $("satisfied with stopToDisplay condition,stop to render engage");
                                break
                            }
                        }
                    else
                        e.current.goNext = !0;
                    $("validate displayTime condition", I);
                    var R = !0;
                    if (I.displayTime = I.displayTime || I.config.schedule,
                    I.timezone = I.timezone || I.config.timezone,
                    I.displayTime && 0 < I.displayTime.length) {
                        var L = I.displayTime
                          , V = I.timezone || {};
                        X.setTimeZone(""),
                        !V.useVisitor && X.setTimeZone(V.profile || ""),
                        Array.isArray(L) || (L = [L]);
                        for (var M = 0; M < L.length; M++) {
                            var j = L[M];
                            if (n.setValue(j.value),
                            n.setValidator(F(j.type)),
                            $("the result of dispalyTime validation", n.run()),
                            !n.run()) {
                                R = !1,
                                $("not satisfied with dispalyTime condition", n);
                                break
                            }
                        }
                    }
                    if ($("validate startToDisplay condition", I),
                    R && e.current.goNext)
                        if (I.startToDisplay = I.startToDisplay || I.config.start,
                        I.startToDisplay && 0 < I.startToDisplay.length) {
                            var B = I.startToDisplay;
                            Array.isArray(B) || (B = [B]);
                            for (var U = 0, J = B.length; U < J; U++) {
                                var z = B[U];
                                n.setValue({
                                    value: z.value,
                                    current: e.current,
                                    context: e
                                }),
                                n.setCondition(z.condition),
                                n.setValidator(F(z.type)),
                                n.run(),
                                $("delay to enter the render staged...")
                            }
                        } else
                            $("enter the render staged immediate..."),
                            e.engager.emit("next", e)
                }
            }
    }
      , V = function V(t, e) {
        var n = Array.prototype.filter.call(e, function(e) {
            return e.id == t
        });
        return n && 0 < n.length ? n[0] : null
    }
      , M = function M(e, t) {
        for (var n in e) {
            var r = e[n];
            if (!r)
                break;
            var a = V(r.engageId, t);
            if ($("result = ", a),
            a) {
                var i = a.audiences;
                for (var o in i) {
                    var c = i[o]
                      , s = V(c.id, r.audiences)
                      , u = j(c.value, !0);
                    s.value = [{
                        type: "AsyncUserProps",
                        condition: "Match",
                        value: u
                    }]
                }
            }
        }
        return $("async configs", e),
        e
    }
      , j = function j(e, t) {
        if (e.AND || e.OR)
            t = B(e, t);
        else {
            var n = W()
              , r = e;
            n.setCondition(r.condition),
            n.setValue(r.value),
            n.setValidator(F(r.type));
            var a = n.run();
            $("and ret =", a),
            a || (t = !1),
            t = t && a
        }
        return t
    }
      , B = function B(e, t) {
        var n = e.AND
          , r = e.OR;
        if (n && Array.isArray(n) && 0 < n.length) {
            for (var a in n) {
                var i = n[a];
                if ("boolean" == typeof i) {
                    if (!i) {
                        t = !1;
                        break
                    }
                    t = t && i
                } else
                    t = j(i, t)
            }
            return t
        }
        if (r && Array.isArray(r) && 0 < r.length) {
            for (var o in r) {
                var c = n[o];
                if ("boolean" == typeof c) {
                    if (c) {
                        t = !0;
                        break
                    }
                    t = t || c
                } else
                    t = j(c, t)
            }
            return t
        }
    }
      , U = function U(e, a, i) {
        var t = e.setting.sid
          , n = "https:" == location.protocol ? "https://" : "http://";
        if (t) {
            var r = function o(e) {
                return f(e = e || localStorage.getItem("PTSID"), "uid")
            }(t);
            d({
                url: "".concat(n, "engagematch.ptengine.cn/match"),
                method: "POST",
                data: JSON.stringify({
                    uid: r,
                    sid: t
                }),
                callback: function(e) {
                    try {
                        var t = JSON.parse(e);
                        if (t.status && "Success" == t.status) {
                            var n = M(a, t.result);
                            i && i(n)
                        }
                    } catch (r) {
                        $(r)
                    }
                }
            })
        }
    };
    var J = "position"
      , z = "pos-center"
      , Z = "ptEngage"
      , K = "pt_mask_"
      , Q = 2147483647
      , ee = g()
      , te = 1;
    function ne(e) {
        if ("string" == typeof e || "number" == typeof e) {
            if (-1 != e.indexOf("<") && /<?\/[a-z]*>/.test(e)) {
                var t = document.createElement("div");
                return t.innerHTML = e,
                t
            }
            return document.createTextNode(e)
        }
        var n, r;
        1 == te && "a" == e.tag ? (n = document.createElement("div"),
        (r = e.props).hasOwnProperty("href") && delete r.href) : (n = document.createElement(e.tag),
        r = e.props),
        te++,
        function i(e, t) {
            for (var n in t)
                e.setAttribute(n, t[n])
        }(n, r);
        var a = e.children;
        return a && a.map(ne).forEach(n.appendChild.bind(n)),
        n
    }
    function re(e) {
        $("running render dom...");
        var t = e.context || e;
        t.current = e.current;
        var n = t.current
          , r = n.terminal && function i(e, t) {
            for (var n = 0, r = t.length; n < r; n++)
                if (t[n].type == e)
                    return t[n];
            return t[0]
        }(ee, n.terminal)
          , a = n.defaultOptions || r;
        r && !(n.currentTerminal = r).status || (n.currentTerminal.codeMode ? function l(e, t) {
            var n = e.current
              , r = se(ue(n.engagerId))
              , a = ce();
            r.innerHTML = function s(e) {
                var t = e.css
                  , n = e.html;
                return function r(e) {
                    var t = document.createElement("style");
                    t.type = "text/css",
                    t.appendChild(document.createTextNode(e)),
                    document.getElementsByTagName("head")[0].appendChild(t)
                }(t),
                n
            }(n.currentTerminal.codeSync),
            a.appendChild(r),
            function u(e) {
                Array.prototype.slice.call(e.querySelectorAll("script")).forEach(function(e) {
                    var t = document.createElement("script")
                      , n = "\n                try {\n                    (function(){".concat(e.innerHTML, "})();\n                } catch (error) {\n                    console.warn(error);\n                }");
                    t.innerHTML = n;
                    var r = document.getElementsByTagName("head")[0];
                    r.appendChild(t),
                    r.removeChild(t)
                })
            }(r);
            var i = !!r.querySelector("[data-pt-showmask]");
            if (e.current.shouldCreateMaskLayer = i) {
                le(n.engagerId);
                var o = r.querySelector(".engage-promo__v-common");
                if (o)
                    o.style.zIndex = Q;
                else {
                    var c = r.querySelector("[data-pt-engage-id]");
                    c && (c.style.zIndex = Q)
                }
            }
            oe(r, e, function(e) {
                return ae(e, "hasClicked")
            }),
            t && "function" == typeof t && t()
        }(t, function() {
            ie(t, n, "view"),
            ae(n.exp_id)
        }) : function o(e) {
            var t, n = y.get(J) || [];
            t = 1 == ee ? !n.length : !(-1 < n.indexOf(e));
            t && (n[n.length] = e,
            y.set(J, n));
            return t
        }(a.position || a.commonSync.position) && (y.get(n.exp_id) || function d(e, t) {
            var n = e.current
              , r = n.currentTerminal.nodes
              , a = se(ue(n.engagerId))
              , i = ce()
              , o = ne(r);
            a.appendChild(o),
            i.appendChild(a);
            var c = n.currentTerminal;
            if (c) {
                c.commonSync.position == z && (le(n.engagerId),
                e.current.shouldCreateMaskLayer = !0);
                var s = a.querySelector(".js-engage-promotion-branding,.engage-promotion__friendLink,.engage-friendLink");
                s && (c.commonSync.branding ? s.style.display = "block" : s.style.display = "none")
            }
            oe(a, e, function(e) {
                return ae(e, "hasClicked")
            }),
            te = 1;
            var u = a.querySelectorAll("img");
            Array.prototype.slice.call(u).forEach(function(e) {
                m(e, "load", function() {
                    e.style.opacity = "1",
                    e.style.visibility = "visible"
                })
            }),
            t && "function" == typeof t && t()
        }(t, function() {
            y.set(n.exp_id, n.exp_id),
            ie(t, n, "view"),
            ae(n.exp_id)
        })))
    }
    function ae(e) {
        var t = 1 < arguments.length && arguments[1] !== undefined ? arguments[1] : "seenTimes"
          , n = q(e);
        null == n ? n = {
            seenTimes: 1,
            hasClicked: 0
        } : (n = JSON.parse(n))[t] = Number(n[t]) + 1,
        H(e, JSON.stringify(n))
    }
    function ie(e, t) {
        var n = 2 < arguments.length && arguments[2] !== undefined ? arguments[2] : "view"
          , r = e.setting.sid
          , a = t.engagerId
          , i = t.exp_id
          , o = t.variant
          , c = t.triggerCondition;
        e.send(n, {
            sid: r,
            engagerId: a,
            engagerVerId: i,
            variant: o,
            triggerCondition: c
        })
    }
    function oe(l, d, f) {
        var p = d.current;
        m(l, "click", function(e) {
            for (var t, n = (e = e || window.event).target || e.srcElement, r = ["js-engage-interaction", "js-engage-close", "js-engage-promotion-close", "js-engage-promotion-button", "js-engage-promotion-image", "js-engage-promotion-a"], a = !1, i = !1, o = "", c = []; t = JSON.parse(n.getAttribute("data-pt-action") || "{}"),
            i = "false" === (n.getAttribute("data-pt-status") || String(t.status)),
            o = n.getAttribute("data-pt-type") || String(t.type),
            c = n.className || n.classList.value,
            !(a = function() {
                for (var e = 0, t = r.length; e < t; e++)
                    if (-1 !== c.indexOf(r[e]))
                        return !0
            }()) && (n = n.parentNode),
            !a && n != l; )
                ;
            if (i)
                e.preventDefault();
            else if (a) {
                if (e.preventDefault(),
                "3" === o || -1 != c.indexOf("js-engage-close") || -1 != c.indexOf("js-engage-promotion-close"))
                    return ie(d, p, "3" === o ? "click" : "close"),
                    ce().removeChild(l),
                    void (p.shouldCreateMaskLayer && function s(e) {
                        var t = document.querySelector(".engage-layer");
                        if (t) {
                            var n = "".concat(K).concat(e)
                              , r = ["engage-layer-open", n]
                              , a = document.getElementsByTagName("html")[0]
                              , i = document.body
                              , o = Array.prototype.slice.call(document.body.classList).filter(function(e) {
                                return "engage-layer-open" == e || /^pt_mask_/.test(e)
                            });
                            o.reverse().join("") == r.reverse().join("") ? (i.removeChild(t),
                            r.forEach(function(e) {
                                a.classList.remove(e),
                                i.classList.remove(e)
                            })) : (a.classList.remove(n),
                            i.classList.remove(n))
                        }
                    }(p.engagerId));
                if (ie(d, p, "click"),
                n.href && !/#|^javascript:(void\(0\))?;?$/.test(n.href))
                    if ("_blank" == n.target)
                        try {
                            window.open(n.href, "_blank")
                        } catch (u) {
                            $("not support to use window.open", u)
                        }
                    else
                        window.location.href = n.href;
                f && "function" == typeof f && f(d.current.exp_id)
            }
        })
    }
    function ce() {
        var e = document.getElementById(Z);
        return e || ((e = document.createElement("div")).setAttribute("id", Z),
        document.body.appendChild(e)),
        e
    }
    function se(e) {
        var t = document.getElementById(e);
        return t || (t = document.createElement("div")).setAttribute("id", e),
        t
    }
    function ue(e) {
        return "engage_" + e
    }
    function le(e) {
        var t = document.querySelector(".engage-layer");
        t || (t = document.createElement("div")).classList.add("engage-layer");
        var n = "".concat(K).concat(e);
        document.getElementsByTagName("html")[0].classList.add("engage-layer-open", n);
        var r = document.body;
        r.classList.add("engage-layer-open", n),
        r.appendChild(t)
    }
    var de = function(e) {
        !function t() {
            var e = document.getElementById(Z);
            e && document.body.removeChild(e)
        }(),
        e.on("next", function(e) {
            $("call render..."),
            function t(e) {
                $("running render module"),
                $(e),
                $("render finished,all over"),
                re(e)
            }(e)
        })
    }
      , fe = "__pt__engager__common__style"
      , pe = function(e) {
        e.on("next", function() {
           /* if (!document.getElementById(fe)) {
                var e = document.createElement("link");
                e.rel = "stylesheet",
                e.type = "text/css",
                e.id = fe,
                e.href = ("https:" == location.protocol ? "https://" : "http://") + "pteengagecss.ptengine.cn/styles/engager.css",
                document.getElementsByTagName("head")[0].appendChild(e)
            }
            !function t() {
                var e = document.createElement("style");
                e.type = "text/css",
                e.appendChild(document.createTextNode(".engage-promotion-wrap{display:none}")),
                document.getElementsByTagName("head")[0].appendChild(e)
            }()*/
        })
    };
    function ge(e, t) {
        window.CustomEvent = window.CustomEvent || function() {
            function e(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: undefined
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                n
            }
            return e.prototype = window.Event.prototype,
            e
        }();
        try {
            return new window.CustomEvent(e,t)
        } catch (n) {
            return null
        }
    }
    var ve = new e;
    ve.use(function he(e, t) {
        try {
            var n = new ge("ptEngageReady",{
                bubbles: !1,
                cancelable: !1,
                detail: {}
            });
            n && (document.dispatchEvent && "function" == typeof document.dispatchEvent ? document.dispatchEvent(n) : document.fireEvent && "function" == typeof document.fireEvent && document.fireEvent(n),
            window.ptEngage = e.engage)
        } catch (r) {
            console.log("catch phase invoke !")
        }
        t()
    }).use(function me(e, t) {
        $("running sender module"),
        $("mounted the send to context，send to collect package"),
        e.send = function(e, t) {
            var n = t.sid
              , r = t.engagerId
              , a = t.engagerVerId
              , i = t.variant || {}
              , o = t.triggerCondition;
            "click" == e && (o = "click");
            var c = localStorage.getItem("PT_ID_" + n);
            if (c) {
                var s = c.split(".");
                !function u(e) {
                    return d({
                        method: "POST",
                        data: encodeURIComponent(JSON.stringify(e)),
                        url: l
                    })
                }({
                    sid: n = s[0],
                    uid: s[1],
                    vid: s[2],
                    pid: s[3],
                    peid: s[4],
                    ts: (new Date).getTime(),
                    engagerId: r,
                    engagerVerId: a,
                    triggerCondition: o,
                    engagerType: e,
                    variant: i
                })
            }
        }
        ,
        $("init sender finished,ready to enter trigger staged..."),
        t()
    }).use(function ye(t) {
        if (window.localStorage) {
            $("ready to enter triger staged", t),
            localStorage.setItem("PTSID", t.setting.sid);
            for (var e = (t.setting || {}).configs || [], n = [], r = [], a = 0, i = e.length; a < i; a++) {
                var o = e[a];
                1 == o.async ? n.push(o) : r.push(o)
            }
            Y(t, r),
            0 < n.length && U(t, n, function(e) {
                return Y(t, e)
            })
        } else
            $("not support to use localstorage")
    }),
    pe(ve),
    de(ve),
    ve.init()
}();
//# sourceMappingURL=http://localhost:8080/dest/bundle.js.map
