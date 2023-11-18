!(function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ?
        (module.exports = t()) :
        "function" == typeof define && define.amd ?
        define(t) :
        ((e = e || self).firebase = t());
})(this, function() {
    "use strict";
    var r = function(e, t) {
        return (r =
            Object.setPrototypeOf ||
            ({
                    __proto__: []
                }
                instanceof Array &&
                function(e, t) {
                    e.__proto__ = t;
                }) ||
            function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
            })(e, t);
    };
    var n = function() {
        return (n =
            Object.assign ||
            function(e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                    for (var o in (t = arguments[r]))
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
            }).apply(this, arguments);
    };

    function d(e, t) {
        if (!(t instanceof Object)) return t;
        switch (t.constructor) {
            case Date:
                return new Date(t.getTime());
            case Object:
                void 0 === e && (e = {});
                break;
            case Array:
                e = [];
                break;
            default:
                return t;
        }
        for (var r in t) t.hasOwnProperty(r) && (e[r] = d(e[r], t[r]));
        return e;
    }
    var e,
        t,
        o,
        f =
        ((o = Error),
            r((e = a), (t = o)),
            void(e.prototype =
                null === t ? Object.create(t) : ((i.prototype = t.prototype), new i())),
            a);

    function i() {
        this.constructor = e;
    }

    function a(e, t) {
        var r = o.call(this, t) || this;
        return (
            (r.code = e),
            (r.name = "FirebaseError"),
            Object.setPrototypeOf(r, a.prototype),
            Error.captureStackTrace && Error.captureStackTrace(r, s.prototype.create),
            r
        );
    }
    var s =
        ((c.prototype.create = function(e) {
                for (var t = [], r = 1; r < arguments.length; r++)
                    t[r - 1] = arguments[r];
                for (
                    var n = t[0] || {},
                        o = this.service + "/" + e,
                        i = this.errors[e],
                        a = i ?
                        (function(e, n) {
                            return e.replace(h, function(e, t) {
                                var r = n[t];
                                return null != r ? r.toString() : "<" + t + "?>";
                            });
                        })(i, n) :
                        "Error",
                        s = this.serviceName + ": " + a + " (" + o + ").",
                        c = new f(o, s),
                        p = 0,
                        l = Object.keys(n); p < l.length; p++
                ) {
                    var u = l[p];
                    "_" !== u.slice(-1) &&
                        (u in c &&
                            console.warn(
                                'Overwriting FirebaseError base field "' +
                                u +
                                '" can cause unexpected behavior.'
                            ),
                            (c[u] = n[u]));
                }
                return c;
            }),
            c);

    function c(e, t, r) {
        (this.service = e), (this.serviceName = t), (this.errors = r);
    }
    var h = /\{\$([^}]+)}/g;

    function v(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }

    function p(e, t) {
        var r = new b(e, t);
        return r.subscribe.bind(r);
    }
    var l,
        u,
        b =
        ((y.prototype.next = function(t) {
                this.forEachObserver(function(e) {
                    e.next(t);
                });
            }),
            (y.prototype.error = function(t) {
                this.forEachObserver(function(e) {
                        e.error(t);
                    }),
                    this.close(t);
            }),
            (y.prototype.complete = function() {
                this.forEachObserver(function(e) {
                        e.complete();
                    }),
                    this.close();
            }),
            (y.prototype.subscribe = function(e, t, r) {
                var n,
                    o = this;
                if (void 0 === e && void 0 === t && void 0 === r)
                    throw new Error("Missing Observer.");
                void 0 ===
                    (n = (function(e, t) {
                            if ("object" != typeof e || null === e) return !1;
                            for (var r = 0, n = t; r < n.length; r++) {
                                var o = n[r];
                                if (o in e && "function" == typeof e[o]) return !0;
                            }
                            return !1;
                        })(e, ["next", "error", "complete"]) ?
                        e :
                        {
                            next: e,
                            error: t,
                            complete: r
                        }).next && (n.next = g),
                    void 0 === n.error && (n.error = g),
                    void 0 === n.complete && (n.complete = g);
                var i = this.unsubscribeOne.bind(this, this.observers.length);
                return (
                    this.finalized &&
                    this.task.then(function() {
                        try {
                            o.finalError ? n.error(o.finalError) : n.complete();
                        } catch (e) {}
                    }),
                    this.observers.push(n),
                    i
                );
            }),
            (y.prototype.unsubscribeOne = function(e) {
                void 0 !== this.observers &&
                    void 0 !== this.observers[e] &&
                    (delete this.observers[e],
                        (this.observerCount -= 1),
                        0 === this.observerCount &&
                        void 0 !== this.onNoObservers &&
                        this.onNoObservers(this));
            }),
            (y.prototype.forEachObserver = function(e) {
                if (!this.finalized)
                    for (var t = 0; t < this.observers.length; t++) this.sendOne(t, e);
            }),
            (y.prototype.sendOne = function(e, t) {
                var r = this;
                this.task.then(function() {
                    if (void 0 !== r.observers && void 0 !== r.observers[e])
                        try {
                            t(r.observers[e]);
                        } catch (e) {
                            "undefined" != typeof console &&
                                console.error &&
                                console.error(e);
                        }
                });
            }),
            (y.prototype.close = function(e) {
                var t = this;
                this.finalized ||
                    ((this.finalized = !0),
                        void 0 !== e && (this.finalError = e),
                        this.task.then(function() {
                            (t.observers = void 0), (t.onNoObservers = void 0);
                        }));
            }),
            y);

    function y(e, t) {
        var r = this;
        (this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = t),
        this.task
            .then(function() {
                e(r);
            })
            .catch(function(e) {
                r.error(e);
            });
    }

    function g() {}
    ((u = l = l || {})[(u.DEBUG = 0)] = "DEBUG"),
    (u[(u.VERBOSE = 1)] = "VERBOSE"),
    (u[(u.INFO = 2)] = "INFO"),
    (u[(u.WARN = 3)] = "WARN"),
    (u[(u.ERROR = 4)] = "ERROR"),
    (u[(u.SILENT = 5)] = "SILENT");

    function m(e, t) {
        for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
        if (!(t < e.logLevel)) {
            var o = new Date().toISOString();
            switch (t) {
                case l.DEBUG:
                case l.VERBOSE:
                    console.log.apply(
                        console, ["[" + o + "]  " + e.name + ":"].concat(r)
                    );
                    break;
                case l.INFO:
                    console.info.apply(
                        console, ["[" + o + "]  " + e.name + ":"].concat(r)
                    );
                    break;
                case l.WARN:
                    console.warn.apply(
                        console, ["[" + o + "]  " + e.name + ":"].concat(r)
                    );
                    break;
                case l.ERROR:
                    console.error.apply(
                        console, ["[" + o + "]  " + e.name + ":"].concat(r)
                    );
                    break;
                default:
                    throw new Error(
                        "Attempted to log a message with an invalid logType (value: " +
                        t +
                        ")"
                    );
            }
        }
    }
    var _,
        E = l.INFO,
        N =
        (Object.defineProperty(O.prototype, "logLevel", {
                get: function() {
                    return this._logLevel;
                },
                set: function(e) {
                    if (!(e in l))
                        throw new TypeError("Invalid value assigned to `logLevel`");
                    this._logLevel = e;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(O.prototype, "logHandler", {
                get: function() {
                    return this._logHandler;
                },
                set: function(e) {
                    if ("function" != typeof e)
                        throw new TypeError(
                            "Value assigned to `logHandler` must be a function"
                        );
                    this._logHandler = e;
                },
                enumerable: !0,
                configurable: !0
            }),
            (O.prototype.debug = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, l.DEBUG].concat(e));
            }),
            (O.prototype.log = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, l.VERBOSE].concat(e));
            }),
            (O.prototype.info = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, l.INFO].concat(e));
            }),
            (O.prototype.warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, l.WARN].concat(e));
            }),
            (O.prototype.error = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, l.ERROR].concat(e));
            }),
            O);

    function O(e) {
        (this.name = e), (this._logLevel = E), (this._logHandler = m);
    }
    var w =
        (((_ = {})["no-app"] =
                "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()"),
            (_["bad-app-name"] = "Illegal App name: '{$appName}"),
            (_["duplicate-app"] = "Firebase App named '{$appName}' already exists"),
            (_["app-deleted"] = "Firebase App named '{$appName}' already deleted"),
            (_["duplicate-service"] =
                "Firebase service named '{$appName}' already registered"),
            (_["invalid-app-argument"] =
                "firebase.{$appName}() takes either no argument or a Firebase App instance."),
            _),
        A = new s("app", "Firebase", w),
        k = "[DEFAULT]",
        R = [],
        I =
        (Object.defineProperty(T.prototype, "automaticDataCollectionEnabled", {
                get: function() {
                    return this.checkDestroyed_(), this.automaticDataCollectionEnabled_;
                },
                set: function(e) {
                    this.checkDestroyed_(), (this.automaticDataCollectionEnabled_ = e);
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(T.prototype, "name", {
                get: function() {
                    return this.checkDestroyed_(), this.name_;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(T.prototype, "options", {
                get: function() {
                    return this.checkDestroyed_(), this.options_;
                },
                enumerable: !0,
                configurable: !0
            }),
            (T.prototype.delete = function() {
                var s = this;
                return new Promise(function(e) {
                        s.checkDestroyed_(), e();
                    })
                    .then(function() {
                        s.firebase_.INTERNAL.removeApp(s.name_);
                        for (
                            var e = [], t = 0, r = Object.keys(s.services_); t < r.length; t++
                        )
                            for (
                                var n = r[t], o = 0, i = Object.keys(s.services_[n]); o < i.length; o++
                            ) {
                                var a = i[o];
                                e.push(s.services_[n][a]);
                            }
                        return Promise.all(
                            e
                            .filter(function(e) {
                                return "INTERNAL" in e;
                            })
                            .map(function(e) {
                                return e.INTERNAL.delete();
                            })
                        );
                    })
                    .then(function() {
                        (s.isDeleted_ = !0), (s.services_ = {});
                    });
            }),
            (T.prototype._getService = function(e, t) {
                if (
                    (void 0 === t && (t = k),
                        this.checkDestroyed_(),
                        this.services_[e] || (this.services_[e] = {}), !this.services_[e][t])
                ) {
                    var r = t !== k ? t : void 0,
                        n = this.firebase_.INTERNAL.factories[e](
                            this,
                            this.extendApp.bind(this),
                            r
                        );
                    this.services_[e][t] = n;
                }
                return this.services_[e][t];
            }),
            (T.prototype._removeServiceInstance = function(e, t) {
                void 0 === t && (t = k),
                    this.services_[e] &&
                    this.services_[e][t] &&
                    delete this.services_[e][t];
            }),
            (T.prototype.extendApp = function(e) {
                var t = this;
                d(this, e),
                    e.INTERNAL &&
                    e.INTERNAL.addAuthTokenListener &&
                    (R.forEach(function(e) {
                            t.INTERNAL.addAuthTokenListener(e);
                        }),
                        (R = []));
            }),
            (T.prototype.checkDestroyed_ = function() {
                if (this.isDeleted_)
                    throw A.create("app-deleted", {
                        appName: this.name_
                    });
            }),
            T);

    function T(e, t, r) {
        (this.firebase_ = r),
        (this.isDeleted_ = !1),
        (this.services_ = {}),
        (this.name_ = t.name),
        (this.automaticDataCollectionEnabled_ =
            t.automaticDataCollectionEnabled || !1),
        (this.options_ = (function(e) {
            return d(void 0, e);
        })(e)),
        (this.INTERNAL = {
            getUid: function() {
                return null;
            },
            getToken: function() {
                return Promise.resolve(null);
            },
            addAuthTokenListener: function(e) {
                R.push(e),
                    setTimeout(function() {
                        return e(null);
                    }, 0);
            },
            removeAuthTokenListener: function(t) {
                R = R.filter(function(e) {
                    return e !== t;
                });
            }
        });
    }
    (I.prototype.name && I.prototype.options) ||
    I.prototype.delete ||
        console.log("dc");
    var j = "6.3.4";
    var F = new N("@firebase/app");
    if (
        "object" == typeof self &&
        self.self === self &&
        void 0 !== self.firebase
    ) {
        F.warn(
            "\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  "
        );
        var D = self.firebase.SDK_VERSION;
        D &&
            0 <= D.indexOf("LITE") &&
            F.warn(
                "\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    "
            );
    }
    var L = (function e() {
            var t = (function(a) {
                var i = {},
                    s = {},
                    c = {},
                    p = {
                        __esModule: !0,
                        initializeApp: function(e, t) {
                            void 0 === t && (t = {}),
                                ("object" == typeof t && null !== t) || (t = {
                                    name: t
                                });
                            var r = t;
                            void 0 === r.name && (r.name = k);
                            var n = r.name;
                            if ("string" != typeof n || !n)
                                throw A.create("bad-app-name", {
                                    appName: String(n)
                                });
                            if (v(i, n)) throw A.create("duplicate-app", {
                                appName: n
                            });
                            var o = new a(e, r, p);
                            return f((i[n] = o), "create"), o;
                        },
                        app: l,
                        apps: null,
                        SDK_VERSION: j,
                        INTERNAL: {
                            registerService: function(r, e, t, n, o) {
                                if ((void 0 === o && (o = !1), s[r]))
                                    throw A.create("duplicate-service", {
                                        appName: r
                                    });

                                function i(e) {
                                    if ((void 0 === e && (e = l()), "function" != typeof e[r]))
                                        throw A.create("invalid-app-argument", {
                                            appName: r
                                        });
                                    return e[r]();
                                }
                                return (
                                    (s[r] = e),
                                    n &&
                                    ((c[r] = n),
                                        u().forEach(function(e) {
                                            n("create", e);
                                        })),
                                    void 0 !== t && d(i, t),
                                    (p[r] = i),
                                    (a.prototype[r] = function() {
                                        for (var e = [], t = 0; t < arguments.length; t++)
                                            e[t] = arguments[t];
                                        return this._getService
                                            .bind(this, r)
                                            .apply(this, o ? e : []);
                                    }),
                                    i
                                );
                            },
                            removeApp: function(e) {
                                f(i[e], "delete"), delete i[e];
                            },
                            factories: s,
                            useAsService: h
                        }
                    };

                function l(e) {
                    if (!v(i, (e = e || k))) throw A.create("no-app", {
                        appName: e
                    });
                    return i[e];
                }

                function u() {
                    return Object.keys(i).map(function(e) {
                        return i[e];
                    });
                }

                function f(e, t) {
                    for (var r = 0, n = Object.keys(s); r < n.length; r++) {
                        var o = h(0, n[r]);
                        if (null === o) return;
                        c[o] && c[o](t, e);
                    }
                }

                function h(e, t) {
                    return "serverAuth" === t ? null : t;
                }
                return (
                    (p.default = p),
                    Object.defineProperty(p, "apps", {
                        get: u
                    }),
                    (l.App = a),
                    p
                );
            })(I);
            return (
                (t.INTERNAL = n({}, t.INTERNAL, {
                    createFirebaseNamespace: e,
                    extendNamespace: function(e) {
                        d(t, e);
                    },
                    createSubscribe: p,
                    ErrorFactory: s,
                    deepExtend: d
                })),
                t
            );
        })(),
        S = L.initializeApp;
    return (
        (L.initializeApp = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return (
                (function() {
                    try {
                        return (
                            "[object process]" ===
                            Object.prototype.toString.call(global.process)
                        );
                    } catch (e) {
                        return !1;
                    }
                })() &&
                F.warn(
                    '\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '
                ),
                S.apply(void 0, e)
            );
        }),
        L
    );
});
//# sourceMappingURL=firebase-app.js.map