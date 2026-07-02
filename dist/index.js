(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/algoliasearch/dist/algoliasearch.umd.js
  var require_algoliasearch_umd = __commonJS({
    "node_modules/algoliasearch/dist/algoliasearch.umd.js"(exports, module) {
      !(function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).algoliasearch = t();
      })(exports, (function() {
        "use strict";
        function e(e2, t2, r2) {
          return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
        }
        function t(e2, t2) {
          var r2 = Object.keys(e2);
          if (Object.getOwnPropertySymbols) {
            var n2 = Object.getOwnPropertySymbols(e2);
            t2 && (n2 = n2.filter((function(t3) {
              return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
            }))), r2.push.apply(r2, n2);
          }
          return r2;
        }
        function r(r2) {
          for (var n2 = 1; n2 < arguments.length; n2++) {
            var a2 = null != arguments[n2] ? arguments[n2] : {};
            n2 % 2 ? t(Object(a2), true).forEach((function(t2) {
              e(r2, t2, a2[t2]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r2, Object.getOwnPropertyDescriptors(a2)) : t(Object(a2)).forEach((function(e2) {
              Object.defineProperty(r2, e2, Object.getOwnPropertyDescriptor(a2, e2));
            }));
          }
          return r2;
        }
        function n(e2, t2) {
          if (null == e2) return {};
          var r2, n2, a2 = (function(e3, t3) {
            if (null == e3) return {};
            var r3, n3, a3 = {}, o3 = Object.keys(e3);
            for (n3 = 0; n3 < o3.length; n3++) r3 = o3[n3], t3.indexOf(r3) >= 0 || (a3[r3] = e3[r3]);
            return a3;
          })(e2, t2);
          if (Object.getOwnPropertySymbols) {
            var o2 = Object.getOwnPropertySymbols(e2);
            for (n2 = 0; n2 < o2.length; n2++) r2 = o2[n2], t2.indexOf(r2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, r2) && (a2[r2] = e2[r2]);
          }
          return a2;
        }
        function a(e2, t2) {
          return (function(e3) {
            if (Array.isArray(e3)) return e3;
          })(e2) || (function(e3, t3) {
            if (!(Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3))) return;
            var r2 = [], n2 = true, a2 = false, o2 = void 0;
            try {
              for (var i2, u2 = e3[Symbol.iterator](); !(n2 = (i2 = u2.next()).done) && (r2.push(i2.value), !t3 || r2.length !== t3); n2 = true) ;
            } catch (e4) {
              a2 = true, o2 = e4;
            } finally {
              try {
                n2 || null == u2.return || u2.return();
              } finally {
                if (a2) throw o2;
              }
            }
            return r2;
          })(e2, t2) || (function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          })();
        }
        function o(e2) {
          return (function(e3) {
            if (Array.isArray(e3)) {
              for (var t2 = 0, r2 = new Array(e3.length); t2 < e3.length; t2++) r2[t2] = e3[t2];
              return r2;
            }
          })(e2) || (function(e3) {
            if (Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3)) return Array.from(e3);
          })(e2) || (function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance");
          })();
        }
        function i() {
          var e2 = "undefined" != typeof globalThis ? globalThis : void 0;
          return e2 && e2.scheduler && e2.scheduler.yield ? e2.scheduler.yield().catch((function(e3) {
            return console.error("Failed to yield to main: ", e3), new Promise((function(e4) {
              return setTimeout(e4, 0);
            }));
          })) : new Promise((function(e3) {
            return setTimeout(e3, 0);
          }));
        }
        function u(e2) {
          var t2, r2 = "algoliasearch-client-js-".concat(e2.key), n2 = function() {
            return void 0 === t2 && (t2 = e2.localStorage || window.localStorage), t2;
          }, o2 = function() {
            return JSON.parse(n2().getItem(r2) || "{}");
          }, u2 = function(e3) {
            n2().setItem(r2, JSON.stringify(e3));
          }, s2 = function() {
            var t3 = e2.timeToLive ? 1e3 * e2.timeToLive : null, r3 = o2(), n3 = (/* @__PURE__ */ new Date()).getTime();
            return Object.fromEntries(Object.entries(r3).filter((function(e3) {
              var r4 = a(e3, 2)[1];
              return !(!r4 || void 0 === r4.timestamp) && (!t3 || r4.timestamp + t3 >= n3);
            })));
          };
          return { get: function(e3, t3) {
            var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } };
            return i().then((function() {
              var n3 = s2(), a2 = n3[JSON.stringify(e3)];
              return u2(n3), a2 ? a2.value : t3().then((function(e4) {
                return r3.miss(e4).then((function() {
                  return e4;
                }));
              }));
            }));
          }, set: function(e3, t3) {
            return i().then((function() {
              var a2 = o2();
              return a2[JSON.stringify(e3)] = { timestamp: (/* @__PURE__ */ new Date()).getTime(), value: t3 }, n2().setItem(r2, JSON.stringify(a2)), t3;
            }));
          }, delete: function(e3) {
            return i().then((function() {
              var t3 = o2();
              delete t3[JSON.stringify(e3)], n2().setItem(r2, JSON.stringify(t3));
            }));
          }, clear: function() {
            return Promise.resolve().then((function() {
              n2().removeItem(r2);
            }));
          } };
        }
        function s(e2) {
          var t2 = o(e2.caches), r2 = t2.shift();
          return void 0 === r2 ? { get: function(e3, t3) {
            var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } }, n2 = t3();
            return n2.then((function(e4) {
              return Promise.all([e4, r3.miss(e4)]);
            })).then((function(e4) {
              return a(e4, 1)[0];
            }));
          }, set: function(e3, t3) {
            return Promise.resolve(t3);
          }, delete: function(e3) {
            return Promise.resolve();
          }, clear: function() {
            return Promise.resolve();
          } } : { get: function(e3, n2) {
            var a2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } };
            return r2.get(e3, n2, a2).catch((function() {
              return s({ caches: t2 }).get(e3, n2, a2);
            }));
          }, set: function(e3, n2) {
            return r2.set(e3, n2).catch((function() {
              return s({ caches: t2 }).set(e3, n2);
            }));
          }, delete: function(e3) {
            return r2.delete(e3).catch((function() {
              return s({ caches: t2 }).delete(e3);
            }));
          }, clear: function() {
            return r2.clear().catch((function() {
              return s({ caches: t2 }).clear();
            }));
          } };
        }
        function c() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: true }, t2 = {};
          return { get: function(r2, n2) {
            var a2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } }, o2 = JSON.stringify(r2);
            if (o2 in t2) return Promise.resolve(e2.serializable ? JSON.parse(t2[o2]) : t2[o2]);
            var i2 = n2(), u2 = a2 && a2.miss || function() {
              return Promise.resolve();
            };
            return i2.then((function(e3) {
              return u2(e3);
            })).then((function() {
              return i2;
            }));
          }, set: function(r2, n2) {
            return t2[JSON.stringify(r2)] = e2.serializable ? JSON.stringify(n2) : n2, Promise.resolve(n2);
          }, delete: function(e3) {
            return delete t2[JSON.stringify(e3)], Promise.resolve();
          }, clear: function() {
            return t2 = {}, Promise.resolve();
          } };
        }
        function f(e2, t2, r2) {
          var n2 = { "x-algolia-api-key": r2, "x-algolia-application-id": t2 };
          return { headers: function() {
            return e2 === g.WithinHeaders ? n2 : {};
          }, queryParameters: function() {
            return e2 === g.WithinQueryParameters ? n2 : {};
          } };
        }
        function d(e2) {
          var t2 = 0;
          return e2((function r2() {
            return t2++, new Promise((function(n2) {
              setTimeout((function() {
                n2(e2(r2));
              }), Math.min(100 * t2, 1e3));
            }));
          }));
        }
        function l(e2) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e3, t3) {
            return Promise.resolve();
          };
          return Object.assign(e2, { wait: function(r2) {
            return l(e2.then((function(e3) {
              return Promise.all([t2(e3, r2), e3]);
            })).then((function(e3) {
              return e3[1];
            })));
          } });
        }
        function h(e2) {
          for (var t2 = e2.length - 1; t2 > 0; t2--) {
            var r2 = Math.floor(Math.random() * (t2 + 1)), n2 = e2[t2];
            e2[t2] = e2[r2], e2[r2] = n2;
          }
          return e2;
        }
        function p(e2, t2) {
          return t2 ? (Object.keys(t2).forEach((function(r2) {
            e2[r2] = t2[r2](e2);
          })), e2) : e2;
        }
        function m(e2) {
          for (var t2 = arguments.length, r2 = new Array(t2 > 1 ? t2 - 1 : 0), n2 = 1; n2 < t2; n2++) r2[n2 - 1] = arguments[n2];
          var a2 = 0;
          return e2.replace(/%s/g, (function() {
            return encodeURIComponent(r2[a2++]);
          }));
        }
        var g = { WithinQueryParameters: 0, WithinHeaders: 1 };
        function y(e2, t2) {
          var r2 = e2 || {}, n2 = r2.data || {};
          return Object.keys(r2).forEach((function(e3) {
            -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e3) && (n2[e3] = r2[e3]);
          })), { data: Object.entries(n2).length > 0 ? n2 : void 0, timeout: r2.timeout || t2, headers: r2.headers || {}, queryParameters: r2.queryParameters || {}, cacheable: r2.cacheable };
        }
        var v = { Read: 1, Write: 2, Any: 3 }, b = 1, w = 2, P = 3;
        function I(e2) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : b;
          return r(r({}, e2), {}, { status: t2, lastUpdate: Date.now() });
        }
        function O(e2) {
          return "string" == typeof e2 ? { protocol: "https", url: e2, accept: v.Any } : { protocol: e2.protocol || "https", url: e2.url, accept: e2.accept || v.Any };
        }
        var x = "DELETE", j = "GET", q = "POST", D = "PUT";
        function T(e2, t2) {
          return Promise.all(t2.map((function(t3) {
            return e2.get(t3, (function() {
              return Promise.resolve(I(t3));
            }));
          }))).then((function(e3) {
            var r2 = e3.filter((function(e4) {
              return (function(e5) {
                return e5.status === b || Date.now() - e5.lastUpdate > 12e4;
              })(e4);
            })), n2 = e3.filter((function(e4) {
              return (function(e5) {
                return e5.status === P && Date.now() - e5.lastUpdate <= 12e4;
              })(e4);
            })), a2 = [].concat(o(r2), o(n2));
            return { getTimeout: function(e4, t3) {
              return (0 === n2.length && 0 === e4 ? 1 : n2.length + 3 + e4) * t3;
            }, statelessHosts: a2.length > 0 ? a2.map((function(e4) {
              return O(e4);
            })) : t2 };
          }));
        }
        function k(e2, t2, n2, a2) {
          var i2 = [], u2 = (function(e3, t3) {
            if (e3.method === j || void 0 === e3.data && void 0 === t3.data) return;
            var n3 = Array.isArray(e3.data) ? e3.data : r(r({}, e3.data), t3.data);
            return JSON.stringify(n3);
          })(n2, a2), s2 = (function(e3, t3) {
            var n3 = r(r({}, e3.headers), t3.headers), a3 = {};
            return Object.keys(n3).forEach((function(e4) {
              var t4 = n3[e4];
              a3[e4.toLowerCase()] = t4;
            })), a3;
          })(e2, a2), c2 = n2.method, f2 = n2.method !== j ? {} : r(r({}, n2.data), a2.data), d2 = r(r(r({ "x-algolia-agent": e2.userAgent.value }, e2.queryParameters), f2), a2.queryParameters), l2 = 0, h2 = function t3(r2, o2) {
            var f3 = r2.pop();
            if (void 0 === f3) throw { name: "RetryError", message: "Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the Algolia Support team: https://alg.li/support .", transporterStackTrace: R(i2) };
            var h3 = { data: u2, headers: s2, method: c2, url: A(f3, n2.path, d2), connectTimeout: o2(l2, e2.timeouts.connect), responseTimeout: o2(l2, a2.timeout) }, p2 = function(e3) {
              var t4 = { request: h3, response: e3, host: f3, triesLeft: r2.length };
              return i2.push(t4), t4;
            }, m2 = { onSuccess: function(e3) {
              return (function(e4) {
                try {
                  return JSON.parse(e4.content);
                } catch (t4) {
                  throw /* @__PURE__ */ (function(e5, t5) {
                    return { name: "DeserializationError", message: e5, response: t5 };
                  })(t4.message, e4);
                }
              })(e3);
            }, onRetry: function(n3) {
              var a3 = p2(n3);
              return n3.isTimedOut && l2++, Promise.all([e2.logger.info("Retryable failure", C(a3)), e2.hostsCache.set(f3, I(f3, n3.isTimedOut ? P : w))]).then((function() {
                return t3(r2, o2);
              }));
            }, onFail: function(e3) {
              throw p2(e3), (function(e4, t4) {
                var r3 = e4.content, n3 = e4.status, a3 = r3;
                try {
                  a3 = JSON.parse(r3).message;
                } catch (e5) {
                }
                return /* @__PURE__ */ (function(e5, t5, r4) {
                  return { name: "ApiError", message: e5, status: t5, transporterStackTrace: r4 };
                })(a3, n3, t4);
              })(e3, R(i2));
            } };
            return e2.requester.send(h3).then((function(e3) {
              return (function(e4, t4) {
                return (function(e5) {
                  var t5 = e5.status;
                  return e5.isTimedOut || (function(e6) {
                    var t6 = e6.isTimedOut, r3 = e6.status;
                    return !t6 && 0 == ~~r3;
                  })(e5) || 2 != ~~(t5 / 100) && 4 != ~~(t5 / 100);
                })(e4) ? t4.onRetry(e4) : 2 == ~~(e4.status / 100) ? t4.onSuccess(e4) : t4.onFail(e4);
              })(e3, m2);
            }));
          };
          return T(e2.hostsCache, t2).then((function(e3) {
            return h2(o(e3.statelessHosts).reverse(), e3.getTimeout);
          }));
        }
        function S(e2) {
          var t2 = e2.hostsCache, r2 = e2.logger, n2 = e2.requester, o2 = e2.requestsCache, i2 = e2.responsesCache, u2 = e2.timeouts, s2 = e2.userAgent, c2 = e2.hosts, f2 = e2.queryParameters, d2 = { hostsCache: t2, logger: r2, requester: n2, requestsCache: o2, responsesCache: i2, timeouts: u2, userAgent: s2, headers: e2.headers, queryParameters: f2, hosts: c2.map((function(e3) {
            return O(e3);
          })), read: function(e3, t3) {
            var r3 = y(t3, d2.timeouts.read), n3 = function() {
              return k(d2, d2.hosts.filter((function(e4) {
                return 0 != (e4.accept & v.Read);
              })), e3, r3);
            };
            if (true !== (void 0 !== r3.cacheable ? r3.cacheable : e3.cacheable)) return n3();
            var o3 = { request: e3, mappedRequestOptions: r3, transporter: { queryParameters: d2.queryParameters, headers: d2.headers } };
            return d2.responsesCache.get(o3, (function() {
              return d2.requestsCache.get(o3, (function() {
                return d2.requestsCache.set(o3, n3()).then((function(e4) {
                  return Promise.all([d2.requestsCache.delete(o3), e4]);
                }), (function(e4) {
                  return Promise.all([d2.requestsCache.delete(o3), Promise.reject(e4)]);
                })).then((function(e4) {
                  var t4 = a(e4, 2);
                  t4[0];
                  return t4[1];
                }));
              }));
            }), { miss: function(e4) {
              return d2.responsesCache.set(o3, e4);
            } });
          }, write: function(e3, t3) {
            return k(d2, d2.hosts.filter((function(e4) {
              return 0 != (e4.accept & v.Write);
            })), e3, y(t3, d2.timeouts.write));
          } };
          return d2;
        }
        function N(e2) {
          var t2 = { value: "Algolia for JavaScript (".concat(e2, ")"), add: function(e3) {
            var r2 = "; ".concat(e3.segment).concat(void 0 !== e3.version ? " (".concat(e3.version, ")") : "");
            return -1 === t2.value.indexOf(r2) && (t2.value = "".concat(t2.value).concat(r2)), t2;
          } };
          return t2;
        }
        function A(e2, t2, r2) {
          var n2 = E(r2), a2 = "".concat(e2.protocol, "://").concat(e2.url, "/").concat("/" === t2.charAt(0) ? t2.substr(1) : t2);
          return n2.length && (a2 += "?".concat(n2)), a2;
        }
        function E(e2) {
          return Object.keys(e2).map((function(t2) {
            return m("%s=%s", t2, (r2 = e2[t2], "[object Object]" === Object.prototype.toString.call(r2) || "[object Array]" === Object.prototype.toString.call(r2) ? JSON.stringify(e2[t2]) : e2[t2]));
            var r2;
          })).join("&");
        }
        function R(e2) {
          return e2.map((function(e3) {
            return C(e3);
          }));
        }
        function C(e2) {
          var t2 = e2.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
          return r(r({}, e2), {}, { request: r(r({}, e2.request), {}, { headers: r(r({}, e2.request.headers), t2) }) });
        }
        var U = function(e2) {
          return function(t2, r2) {
            return e2.transporter.write({ method: q, path: "2/abtests", data: t2 }, r2);
          };
        }, z = function(e2) {
          return function(t2, r2) {
            return e2.transporter.write({ method: x, path: m("2/abtests/%s", t2) }, r2);
          };
        }, F = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: j, path: m("2/abtests/%s", t2) }, r2);
          };
        }, J = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "2/abtests" }, t2);
          };
        }, W = function(e2) {
          return function(t2, r2) {
            return e2.transporter.write({ method: q, path: m("2/abtests/%s/stop", t2) }, r2);
          };
        }, H = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "1/strategies/personalization" }, t2);
          };
        }, K = function(e2) {
          return function(t2, r2) {
            return e2.transporter.write({ method: q, path: "1/strategies/personalization", data: t2 }, r2);
          };
        };
        function M(e2) {
          return (function t2(r2) {
            return e2.request(r2).then((function(n2) {
              if (void 0 !== e2.batch && e2.batch(n2.hits), !e2.shouldStop(n2)) return n2.cursor ? t2({ cursor: n2.cursor }) : t2({ page: (r2.page || 0) + 1 });
            }));
          })({});
        }
        var B = function(e2) {
          return function(t2, a2) {
            var o2 = a2 || {}, i2 = o2.queryParameters, u2 = n(o2, ["queryParameters"]), s2 = r({ acl: t2 }, void 0 !== i2 ? { queryParameters: i2 } : {});
            return l(e2.transporter.write({ method: q, path: "1/keys", data: s2 }, u2), (function(t3, r2) {
              return d((function(n2) {
                return te(e2)(t3.key, r2).catch((function(e3) {
                  if (404 !== e3.status) throw e3;
                  return n2();
                }));
              }));
            }));
          };
        }, G = function(e2) {
          return function(t2, r2, n2) {
            var a2 = y(n2);
            return a2.queryParameters["X-Algolia-User-ID"] = t2, e2.transporter.write({ method: q, path: "1/clusters/mapping", data: { cluster: r2 } }, a2);
          };
        }, L = function(e2) {
          return function(t2, r2, n2) {
            return e2.transporter.write({ method: q, path: "1/clusters/mapping/batch", data: { users: t2, cluster: r2 } }, n2);
          };
        }, Q = function(e2) {
          return function(t2, r2) {
            return l(e2.transporter.write({ method: q, path: m("/1/dictionaries/%s/batch", t2), data: { clearExistingDictionaryEntries: true, requests: { action: "addEntry", body: [] } } }, r2), (function(t3, r3) {
              return qe(e2)(t3.taskID, r3);
            }));
          };
        }, V = function(e2) {
          return function(t2, r2, n2) {
            return l(e2.transporter.write({ method: q, path: m("1/indexes/%s/operation", t2), data: { operation: "copy", destination: r2 } }, n2), (function(r3, n3) {
              return se(e2)(t2, { methods: { waitTask: lt } }).waitTask(r3.taskID, n3);
            }));
          };
        }, _ = function(e2) {
          return function(t2, n2, a2) {
            return V(e2)(t2, n2, r(r({}, a2), {}, { scope: [pt.Rules] }));
          };
        }, X = function(e2) {
          return function(t2, n2, a2) {
            return V(e2)(t2, n2, r(r({}, a2), {}, { scope: [pt.Settings] }));
          };
        }, Y = function(e2) {
          return function(t2, n2, a2) {
            return V(e2)(t2, n2, r(r({}, a2), {}, { scope: [pt.Synonyms] }));
          };
        }, Z = function(e2) {
          return function(t2, r2) {
            return t2.method === j ? e2.transporter.read(t2, r2) : e2.transporter.write(t2, r2);
          };
        }, $ = function(e2) {
          return function(t2, r2) {
            return l(e2.transporter.write({ method: x, path: m("1/keys/%s", t2) }, r2), (function(r3, n2) {
              return d((function(r4) {
                return te(e2)(t2, n2).then(r4).catch((function(e3) {
                  if (404 !== e3.status) throw e3;
                }));
              }));
            }));
          };
        }, ee = function(e2) {
          return function(t2, r2, n2) {
            var a2 = r2.map((function(e3) {
              return { action: "deleteEntry", body: { objectID: e3 } };
            }));
            return l(e2.transporter.write({ method: q, path: m("/1/dictionaries/%s/batch", t2), data: { clearExistingDictionaryEntries: false, requests: a2 } }, n2), (function(t3, r3) {
              return qe(e2)(t3.taskID, r3);
            }));
          };
        }, te = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: j, path: m("1/keys/%s", t2) }, r2);
          };
        }, re = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: j, path: m("1/task/%s", t2.toString()) }, r2);
          };
        }, ne = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "/1/dictionaries/*/settings" }, t2);
          };
        }, ae = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "1/logs" }, t2);
          };
        }, oe = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "1/clusters/mapping/top" }, t2);
          };
        }, ie = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: j, path: m("1/clusters/mapping/%s", t2) }, r2);
          };
        }, ue = function(e2) {
          return function(t2) {
            var r2 = t2 || {}, a2 = r2.retrieveMappings, o2 = n(r2, ["retrieveMappings"]);
            return true === a2 && (o2.getClusters = true), e2.transporter.read({ method: j, path: "1/clusters/mapping/pending" }, o2);
          };
        }, se = function(e2) {
          return function(t2) {
            var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = { transporter: e2.transporter, appId: e2.appId, indexName: t2 };
            return p(n2, r2.methods);
          };
        }, ce = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "1/keys" }, t2);
          };
        }, fe = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "1/clusters" }, t2);
          };
        }, de = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "1/indexes" }, t2);
          };
        }, le = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: "1/clusters/mapping" }, t2);
          };
        }, he = function(e2) {
          return function(t2, r2, n2) {
            return l(e2.transporter.write({ method: q, path: m("1/indexes/%s/operation", t2), data: { operation: "move", destination: r2 } }, n2), (function(r3, n3) {
              return se(e2)(t2, { methods: { waitTask: lt } }).waitTask(r3.taskID, n3);
            }));
          };
        }, pe = function(e2) {
          return function(t2, r2) {
            return l(e2.transporter.write({ method: q, path: "1/indexes/*/batch", data: { requests: t2 } }, r2), (function(t3, r3) {
              return Promise.all(Object.keys(t3.taskID).map((function(n2) {
                return se(e2)(n2, { methods: { waitTask: lt } }).waitTask(t3.taskID[n2], r3);
              })));
            }));
          };
        }, me = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: q, path: "1/indexes/*/objects", data: { requests: t2 } }, r2);
          };
        }, ge = function(e2) {
          return function(t2, n2) {
            var a2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { params: E(e3.params || {}) });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/queries", data: { requests: a2 }, cacheable: true }, n2);
          };
        }, ye = function(e2) {
          return function(t2, a2) {
            return Promise.all(t2.map((function(t3) {
              var o2 = t3.params, i2 = o2.facetName, u2 = o2.facetQuery, s2 = n(o2, ["facetName", "facetQuery"]);
              return se(e2)(t3.indexName, { methods: { searchForFacetValues: st } }).searchForFacetValues(i2, u2, r(r({}, a2), s2));
            })));
          };
        }, ve = function(e2) {
          return function(t2, r2) {
            var n2 = y(r2);
            return n2.queryParameters["X-Algolia-User-ID"] = t2, e2.transporter.write({ method: x, path: "1/clusters/mapping" }, n2);
          };
        }, be = function(e2) {
          return function(t2, r2, n2) {
            var a2 = r2.map((function(e3) {
              return { action: "addEntry", body: e3 };
            }));
            return l(e2.transporter.write({ method: q, path: m("/1/dictionaries/%s/batch", t2), data: { clearExistingDictionaryEntries: true, requests: a2 } }, n2), (function(t3, r3) {
              return qe(e2)(t3.taskID, r3);
            }));
          };
        }, we = function(e2) {
          return function(t2, r2) {
            return l(e2.transporter.write({ method: q, path: m("1/keys/%s/restore", t2) }, r2), (function(r3, n2) {
              return d((function(r4) {
                return te(e2)(t2, n2).catch((function(e3) {
                  if (404 !== e3.status) throw e3;
                  return r4();
                }));
              }));
            }));
          };
        }, Pe = function(e2) {
          return function(t2, r2, n2) {
            var a2 = r2.map((function(e3) {
              return { action: "addEntry", body: e3 };
            }));
            return l(e2.transporter.write({ method: q, path: m("/1/dictionaries/%s/batch", t2), data: { clearExistingDictionaryEntries: false, requests: a2 } }, n2), (function(t3, r3) {
              return qe(e2)(t3.taskID, r3);
            }));
          };
        }, Ie = function(e2) {
          return function(t2, r2, n2) {
            return e2.transporter.read({ method: q, path: m("/1/dictionaries/%s/search", t2), data: { query: r2 }, cacheable: true }, n2);
          };
        }, Oe = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: q, path: "1/clusters/mapping/search", data: { query: t2 } }, r2);
          };
        }, xe = function(e2) {
          return function(t2, r2) {
            return l(e2.transporter.write({ method: D, path: "/1/dictionaries/*/settings", data: t2 }, r2), (function(t3, r3) {
              return qe(e2)(t3.taskID, r3);
            }));
          };
        }, je = function(e2) {
          return function(t2, r2) {
            var a2 = Object.assign({}, r2), o2 = r2 || {}, i2 = o2.queryParameters, u2 = n(o2, ["queryParameters"]), s2 = i2 ? { queryParameters: i2 } : {}, c2 = ["acl", "indexes", "referers", "restrictSources", "queryParameters", "description", "maxQueriesPerIPPerHour", "maxHitsPerQuery"];
            return l(e2.transporter.write({ method: D, path: m("1/keys/%s", t2), data: s2 }, u2), (function(r3, n2) {
              return d((function(r4) {
                return te(e2)(t2, n2).then((function(e3) {
                  return (function(e4) {
                    return Object.keys(a2).filter((function(e5) {
                      return -1 !== c2.indexOf(e5);
                    })).every((function(t3) {
                      if (Array.isArray(e4[t3]) && Array.isArray(a2[t3])) {
                        var r5 = e4[t3];
                        return r5.length === a2[t3].length && r5.every((function(e5, r6) {
                          return e5 === a2[t3][r6];
                        }));
                      }
                      return e4[t3] === a2[t3];
                    }));
                  })(e3) ? Promise.resolve() : r4();
                }));
              }));
            }));
          };
        }, qe = function(e2) {
          return function(t2, r2) {
            return d((function(n2) {
              return re(e2)(t2, r2).then((function(e3) {
                return "published" !== e3.status ? n2() : void 0;
              }));
            }));
          };
        }, De = function(e2) {
          return function(t2, r2) {
            return l(e2.transporter.write({ method: q, path: m("1/indexes/%s/batch", e2.indexName), data: { requests: t2 } }, r2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, Te = function(e2) {
          return function(t2) {
            return M(r(r({ shouldStop: function(e3) {
              return void 0 === e3.cursor;
            } }, t2), {}, { request: function(r2) {
              return e2.transporter.read({ method: q, path: m("1/indexes/%s/browse", e2.indexName), data: r2 }, t2);
            } }));
          };
        }, ke = function(e2) {
          return function(t2) {
            var n2 = r({ hitsPerPage: 1e3 }, t2);
            return M(r(r({ shouldStop: function(e3) {
              return e3.hits.length < n2.hitsPerPage;
            } }, n2), {}, { request: function(t3) {
              return ct(e2)("", r(r({}, n2), t3)).then((function(e3) {
                return r(r({}, e3), {}, { hits: e3.hits.map((function(e4) {
                  return delete e4._highlightResult, e4;
                })) });
              }));
            } }));
          };
        }, Se = function(e2) {
          return function(t2) {
            var n2 = r({ hitsPerPage: 1e3 }, t2);
            return M(r(r({ shouldStop: function(e3) {
              return e3.hits.length < n2.hitsPerPage;
            } }, n2), {}, { request: function(t3) {
              return ft(e2)("", r(r({}, n2), t3)).then((function(e3) {
                return r(r({}, e3), {}, { hits: e3.hits.map((function(e4) {
                  return delete e4._highlightResult, e4;
                })) });
              }));
            } }));
          };
        }, Ne = function(e2) {
          return function(t2, r2, a2) {
            var o2 = a2 || {}, i2 = o2.batchSize, u2 = n(o2, ["batchSize"]), s2 = { taskIDs: [], objectIDs: [] };
            return l((function n2() {
              var a3, o3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, c2 = [];
              for (a3 = o3; a3 < t2.length && (c2.push(t2[a3]), c2.length !== (i2 || 1e3)); a3++) ;
              return 0 === c2.length ? Promise.resolve(s2) : De(e2)(c2.map((function(e3) {
                return { action: r2, body: e3 };
              })), u2).then((function(e3) {
                return s2.objectIDs = s2.objectIDs.concat(e3.objectIDs), s2.taskIDs.push(e3.taskID), a3++, n2(a3);
              }));
            })(), (function(t3, r3) {
              return Promise.all(t3.taskIDs.map((function(t4) {
                return lt(e2)(t4, r3);
              })));
            }));
          };
        }, Ae = function(e2) {
          return function(t2) {
            return l(e2.transporter.write({ method: q, path: m("1/indexes/%s/clear", e2.indexName) }, t2), (function(t3, r2) {
              return lt(e2)(t3.taskID, r2);
            }));
          };
        }, Ee = function(e2) {
          return function(t2) {
            var r2 = t2 || {}, a2 = r2.forwardToReplicas, o2 = y(n(r2, ["forwardToReplicas"]));
            return a2 && (o2.queryParameters.forwardToReplicas = 1), l(e2.transporter.write({ method: q, path: m("1/indexes/%s/rules/clear", e2.indexName) }, o2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, Re = function(e2) {
          return function(t2) {
            var r2 = t2 || {}, a2 = r2.forwardToReplicas, o2 = y(n(r2, ["forwardToReplicas"]));
            return a2 && (o2.queryParameters.forwardToReplicas = 1), l(e2.transporter.write({ method: q, path: m("1/indexes/%s/synonyms/clear", e2.indexName) }, o2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, Ce = function(e2) {
          return function(t2, r2) {
            return l(e2.transporter.write({ method: q, path: m("1/indexes/%s/deleteByQuery", e2.indexName), data: t2 }, r2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, Ue = function(e2) {
          return function(t2) {
            return l(e2.transporter.write({ method: x, path: m("1/indexes/%s", e2.indexName) }, t2), (function(t3, r2) {
              return lt(e2)(t3.taskID, r2);
            }));
          };
        }, ze = function(e2) {
          return function(t2, r2) {
            return l(Fe(e2)([t2], r2).then((function(e3) {
              return { taskID: e3.taskIDs[0] };
            })), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, Fe = function(e2) {
          return function(t2, r2) {
            var n2 = t2.map((function(e3) {
              return { objectID: e3 };
            }));
            return Ne(e2)(n2, ht.DeleteObject, r2);
          };
        }, Je = function(e2) {
          return function(t2, r2) {
            var a2 = r2 || {}, o2 = a2.forwardToReplicas, i2 = y(n(a2, ["forwardToReplicas"]));
            return o2 && (i2.queryParameters.forwardToReplicas = 1), l(e2.transporter.write({ method: x, path: m("1/indexes/%s/rules/%s", e2.indexName, t2) }, i2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, We = function(e2) {
          return function(t2, r2) {
            var a2 = r2 || {}, o2 = a2.forwardToReplicas, i2 = y(n(a2, ["forwardToReplicas"]));
            return o2 && (i2.queryParameters.forwardToReplicas = 1), l(e2.transporter.write({ method: x, path: m("1/indexes/%s/synonyms/%s", e2.indexName, t2) }, i2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, He = function(e2) {
          return function(t2) {
            return Ve(e2)(t2).then((function() {
              return true;
            })).catch((function(e3) {
              if (404 !== e3.status) throw e3;
              return false;
            }));
          };
        }, Ke = function(e2) {
          return function(t2, r2, n2) {
            return e2.transporter.read({ method: q, path: m("1/answers/%s/prediction", e2.indexName), data: { query: t2, queryLanguages: r2 }, cacheable: true }, n2);
          };
        }, Me = function(e2) {
          return function(t2, o2) {
            var i2 = o2 || {}, u2 = i2.query, s2 = i2.paginate, c2 = n(i2, ["query", "paginate"]), f2 = 0;
            return (function n2() {
              return ut(e2)(u2 || "", r(r({}, c2), {}, { page: f2 })).then((function(e3) {
                for (var r2 = 0, o3 = Object.entries(e3.hits); r2 < o3.length; r2++) {
                  var i3 = a(o3[r2], 2), u3 = i3[0], c3 = i3[1];
                  if (t2(c3)) return { object: c3, position: parseInt(u3, 10), page: f2 };
                }
                if (f2++, false === s2 || f2 >= e3.nbPages) throw { name: "ObjectNotFoundError", message: "Object not found." };
                return n2();
              }));
            })();
          };
        }, Be = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: j, path: m("1/indexes/%s/%s", e2.indexName, t2) }, r2);
          };
        }, Ge = function() {
          return function(e2, t2) {
            for (var r2 = 0, n2 = Object.entries(e2.hits); r2 < n2.length; r2++) {
              var o2 = a(n2[r2], 2), i2 = o2[0];
              if (o2[1].objectID === t2) return parseInt(i2, 10);
            }
            return -1;
          };
        }, Le = function(e2) {
          return function(t2, a2) {
            var o2 = a2 || {}, i2 = o2.attributesToRetrieve, u2 = n(o2, ["attributesToRetrieve"]), s2 = t2.map((function(t3) {
              return r({ indexName: e2.indexName, objectID: t3 }, i2 ? { attributesToRetrieve: i2 } : {});
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/objects", data: { requests: s2 } }, u2);
          };
        }, Qe = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: j, path: m("1/indexes/%s/rules/%s", e2.indexName, t2) }, r2);
          };
        }, Ve = function(e2) {
          return function(t2) {
            return e2.transporter.read({ method: j, path: m("1/indexes/%s/settings", e2.indexName), data: { getVersion: 2 } }, t2);
          };
        }, _e = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: j, path: m("1/indexes/%s/synonyms/%s", e2.indexName, t2) }, r2);
          };
        }, Xe = function(e2) {
          return function(t2, r2) {
            return l(Ye(e2)([t2], r2).then((function(e3) {
              return { objectID: e3.objectIDs[0], taskID: e3.taskIDs[0] };
            })), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, Ye = function(e2) {
          return function(t2, r2) {
            var a2 = r2 || {}, o2 = a2.createIfNotExists, i2 = n(a2, ["createIfNotExists"]), u2 = o2 ? ht.PartialUpdateObject : ht.PartialUpdateObjectNoCreate;
            return Ne(e2)(t2, u2, i2);
          };
        }, Ze = function(e2) {
          return function(t2, i2) {
            var u2 = i2 || {}, s2 = u2.safe, c2 = u2.autoGenerateObjectIDIfNotExist, f2 = u2.batchSize, d2 = n(u2, ["safe", "autoGenerateObjectIDIfNotExist", "batchSize"]), h2 = function(t3, r2, n2, a2) {
              return l(e2.transporter.write({ method: q, path: m("1/indexes/%s/operation", t3), data: { operation: n2, destination: r2 } }, a2), (function(t4, r3) {
                return lt(e2)(t4.taskID, r3);
              }));
            }, p2 = Math.random().toString(36).substring(7), g2 = "".concat(e2.indexName, "_tmp_").concat(p2), y2 = rt({ appId: e2.appId, transporter: e2.transporter, indexName: g2 }), v2 = [], b2 = h2(e2.indexName, g2, "copy", r(r({}, d2), {}, { scope: ["settings", "synonyms", "rules"] }));
            return v2.push(b2), l((s2 ? b2.wait(d2) : b2).then((function() {
              var e3 = y2(t2, r(r({}, d2), {}, { autoGenerateObjectIDIfNotExist: c2, batchSize: f2 }));
              return v2.push(e3), s2 ? e3.wait(d2) : e3;
            })).then((function() {
              var t3 = h2(g2, e2.indexName, "move", d2);
              return v2.push(t3), s2 ? t3.wait(d2) : t3;
            })).then((function() {
              return Promise.all(v2);
            })).then((function(e3) {
              var t3 = a(e3, 3), r2 = t3[0], n2 = t3[1], i3 = t3[2];
              return { objectIDs: n2.objectIDs, taskIDs: [r2.taskID].concat(o(n2.taskIDs), [i3.taskID]) };
            })).catch((function(t3) {
              return Ue({ appId: e2.appId, transporter: e2.transporter, indexName: g2 })().catch((function() {
              })).then((function() {
                throw t3;
              }));
            })), (function(e3, t3) {
              return Promise.all(v2.map((function(e4) {
                return e4.wait(t3);
              })));
            }));
          };
        }, $e = function(e2) {
          return function(t2, n2) {
            return at(e2)(t2, r(r({}, n2), {}, { clearExistingRules: true }));
          };
        }, et = function(e2) {
          return function(t2, n2) {
            return it(e2)(t2, r(r({}, n2), {}, { clearExistingSynonyms: true }));
          };
        }, tt = function(e2) {
          return function(t2, r2) {
            return l(rt(e2)([t2], r2).then((function(e3) {
              return { objectID: e3.objectIDs[0], taskID: e3.taskIDs[0] };
            })), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, rt = function(e2) {
          return function(t2, r2) {
            var a2 = r2 || {}, o2 = a2.autoGenerateObjectIDIfNotExist, i2 = n(a2, ["autoGenerateObjectIDIfNotExist"]), u2 = o2 ? ht.AddObject : ht.UpdateObject;
            if (u2 === ht.UpdateObject) {
              var s2 = true, c2 = false, f2 = void 0;
              try {
                for (var d2, h2 = t2[Symbol.iterator](); !(s2 = (d2 = h2.next()).done); s2 = true) {
                  if (void 0 === d2.value.objectID) return l(Promise.reject({ name: "MissingObjectIDError", message: "All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option." }));
                }
              } catch (e3) {
                c2 = true, f2 = e3;
              } finally {
                try {
                  s2 || null == h2.return || h2.return();
                } finally {
                  if (c2) throw f2;
                }
              }
            }
            return Ne(e2)(t2, u2, i2);
          };
        }, nt = function(e2) {
          return function(t2, r2) {
            return at(e2)([t2], r2);
          };
        }, at = function(e2) {
          return function(t2, r2) {
            var a2 = r2 || {}, o2 = a2.forwardToReplicas, i2 = a2.clearExistingRules, u2 = y(n(a2, ["forwardToReplicas", "clearExistingRules"]));
            return o2 && (u2.queryParameters.forwardToReplicas = 1), i2 && (u2.queryParameters.clearExistingRules = 1), l(e2.transporter.write({ method: q, path: m("1/indexes/%s/rules/batch", e2.indexName), data: t2 }, u2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, ot = function(e2) {
          return function(t2, r2) {
            return it(e2)([t2], r2);
          };
        }, it = function(e2) {
          return function(t2, r2) {
            var a2 = r2 || {}, o2 = a2.forwardToReplicas, i2 = a2.clearExistingSynonyms, u2 = a2.replaceExistingSynonyms, s2 = y(n(a2, ["forwardToReplicas", "clearExistingSynonyms", "replaceExistingSynonyms"]));
            return o2 && (s2.queryParameters.forwardToReplicas = 1), (u2 || i2) && (s2.queryParameters.replaceExistingSynonyms = 1), l(e2.transporter.write({ method: q, path: m("1/indexes/%s/synonyms/batch", e2.indexName), data: t2 }, s2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, ut = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: q, path: m("1/indexes/%s/query", e2.indexName), data: { query: t2 }, cacheable: true }, r2);
          };
        }, st = function(e2) {
          return function(t2, r2, n2) {
            return e2.transporter.read({ method: q, path: m("1/indexes/%s/facets/%s/query", e2.indexName, t2), data: { facetQuery: r2 }, cacheable: true }, n2);
          };
        }, ct = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: q, path: m("1/indexes/%s/rules/search", e2.indexName), data: { query: t2 } }, r2);
          };
        }, ft = function(e2) {
          return function(t2, r2) {
            return e2.transporter.read({ method: q, path: m("1/indexes/%s/synonyms/search", e2.indexName), data: { query: t2 } }, r2);
          };
        }, dt = function(e2) {
          return function(t2, r2) {
            var a2 = r2 || {}, o2 = a2.forwardToReplicas, i2 = y(n(a2, ["forwardToReplicas"]));
            return o2 && (i2.queryParameters.forwardToReplicas = 1), l(e2.transporter.write({ method: D, path: m("1/indexes/%s/settings", e2.indexName), data: t2 }, i2), (function(t3, r3) {
              return lt(e2)(t3.taskID, r3);
            }));
          };
        }, lt = function(e2) {
          return function(t2, r2) {
            return d((function(n2) {
              return (/* @__PURE__ */ (function(e3) {
                return function(t3, r3) {
                  return e3.transporter.read({ method: j, path: m("1/indexes/%s/task/%s", e3.indexName, t3.toString()) }, r3);
                };
              })(e2))(t2, r2).then((function(e3) {
                return "published" !== e3.status ? n2() : void 0;
              }));
            }));
          };
        }, ht = { AddObject: "addObject", UpdateObject: "updateObject", PartialUpdateObject: "partialUpdateObject", PartialUpdateObjectNoCreate: "partialUpdateObjectNoCreate", DeleteObject: "deleteObject", DeleteIndex: "delete", ClearIndex: "clear" }, pt = { Settings: "settings", Synonyms: "synonyms", Rules: "rules" }, mt = 1, gt = 2, yt = 3;
        var vt = function(e2) {
          return function(t2, n2) {
            var a2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: a2 }, cacheable: true }, n2);
          };
        }, bt = function(e2) {
          return function(t2, n2) {
            return vt(e2)(t2.map((function(e3) {
              return r(r({}, e3), {}, { fallbackParameters: {}, model: "bought-together" });
            })), n2);
          };
        }, wt = function(e2) {
          return function(t2, n2) {
            return vt(e2)(t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "related-products" });
            })), n2);
          };
        }, Pt = function(e2) {
          return function(t2, n2) {
            var a2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "trending-facets", threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: a2 }, cacheable: true }, n2);
          };
        }, It = function(e2) {
          return function(t2, n2) {
            var a2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "trending-items", threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: a2 }, cacheable: true }, n2);
          };
        }, Ot = function(e2) {
          return function(t2, n2) {
            return vt(e2)(t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "looking-similar" });
            })), n2);
          };
        }, xt = function(e2) {
          return function(t2, n2) {
            var a2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "recommended-for-you", threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: a2 }, cacheable: true }, n2);
          };
        };
        function jt(e2, t2) {
          return function(r2, a2) {
            if (!t2) throw Dt("`options.transformation.region` must be provided at client instantiation before calling this method.");
            var o2 = a2 || {}, i2 = o2.autoGenerateObjectIDIfNotExist, u2 = o2.watch, s2 = n(o2, ["autoGenerateObjectIDIfNotExist", "watch"]), c2 = i2 ? ht.AddObject : ht.UpdateObject;
            return t2.push({ indexName: e2, pushTaskPayload: { action: c2, records: r2 }, watch: u2 }, s2);
          };
        }
        function qt(e2, t2) {
          return function(r2, a2) {
            if (!t2) throw Dt("`options.transformation.region` must be provided at client instantiation before calling this method.");
            var o2 = a2 || {}, i2 = o2.createIfNotExists, u2 = o2.watch, s2 = n(o2, ["createIfNotExists", "watch"]), c2 = i2 ? ht.PartialUpdateObject : ht.PartialUpdateObjectNoCreate;
            return t2.push({ indexName: e2, pushTaskPayload: { action: c2, records: r2 }, watch: u2 }, s2);
          };
        }
        function Dt(e2) {
          return { name: "TransformationConfigurationError", message: e2 };
        }
        function Tt(e2, t2, n2) {
          var a2, o2, i2 = { appId: e2, apiKey: t2, timeouts: { connect: 1, read: 2, write: 30 }, requester: { send: function(e3) {
            return new Promise((function(t3) {
              var r2 = new XMLHttpRequest();
              r2.open(e3.method, e3.url, true), Object.keys(e3.headers).forEach((function(t4) {
                return r2.setRequestHeader(t4, e3.headers[t4]);
              }));
              var n3, a3 = function(e4, n4) {
                return setTimeout((function() {
                  r2.abort(), t3({ status: 0, content: n4, isTimedOut: true });
                }), 1e3 * e4);
              }, o3 = a3(e3.connectTimeout, "Connection timeout");
              r2.onreadystatechange = function() {
                r2.readyState > r2.OPENED && void 0 === n3 && (clearTimeout(o3), n3 = a3(e3.responseTimeout, "Socket timeout"));
              }, r2.onerror = function() {
                0 === r2.status && (clearTimeout(o3), clearTimeout(n3), t3({ content: r2.responseText || "Network request failed", status: r2.status, isTimedOut: false }));
              }, r2.onload = function() {
                clearTimeout(o3), clearTimeout(n3), t3({ content: r2.responseText, status: r2.status, isTimedOut: false });
              }, r2.send(e3.data);
            }));
          } }, logger: (a2 = yt, { debug: function(e3, t3) {
            return mt >= a2 && console.debug(e3, t3), Promise.resolve();
          }, info: function(e3, t3) {
            return gt >= a2 && console.info(e3, t3), Promise.resolve();
          }, error: function(e3, t3) {
            return console.error(e3, t3), Promise.resolve();
          } }), responsesCache: c(), requestsCache: c({ serializable: false }), hostsCache: s({ caches: [u({ key: "".concat("4.26.0", "-").concat(e2) }), c()] }), userAgent: N("4.26.0").add({ segment: "Browser" }) }, d2 = r(r({}, i2), n2), l2 = function() {
            return function(e3) {
              return (function(e4) {
                var t3 = e4.region || "us", n3 = f(g.WithinHeaders, e4.appId, e4.apiKey), a3 = S(r(r({ hosts: [{ url: "personalization.".concat(t3, ".algolia.com") }] }, e4), {}, { headers: r(r(r({}, n3.headers()), { "content-type": "application/json" }), e4.headers), queryParameters: r(r({}, n3.queryParameters()), e4.queryParameters) }));
                return p({ appId: e4.appId, transporter: a3 }, e4.methods);
              })(r(r(r({}, i2), e3), {}, { methods: { getPersonalizationStrategy: H, setPersonalizationStrategy: K } }));
            };
          };
          if (n2 && n2.transformation) {
            if (!n2.transformation.region) throw Dt("`region` must be provided when leveraging the transformation pipeline");
            o2 = (function(e3) {
              if (!e3 || !e3.transformation || !e3.transformation.region) throw Dt("`region` must be provided when leveraging the transformation pipeline");
              if ("eu" !== e3.transformation.region && "us" !== e3.transformation.region) throw Dt("`region` is required and must be one of the following: eu, us");
              var t3 = e3.appId, n3 = f(g.WithinHeaders, t3, e3.apiKey), a3 = S(r(r({ hosts: [{ url: "data.".concat(e3.transformation.region, ".algolia.com"), accept: v.ReadWrite, protocol: "https" }] }, e3), {}, { headers: r(r(r({}, n3.headers()), { "content-type": "text/plain" }), e3.headers), queryParameters: r(r({}, n3.queryParameters()), e3.queryParameters) }));
              return { transporter: a3, appId: t3, addAlgoliaAgent: function(e4, t4) {
                a3.userAgent.add({ segment: e4, version: t4 }), a3.userAgent.add({ segment: "Ingestion", version: t4 }), a3.userAgent.add({ segment: "Ingestion via Algoliasearch" });
              }, clearCache: function() {
                return Promise.all([a3.requestsCache.clear(), a3.responsesCache.clear()]).then((function() {
                }));
              }, push: function(e4, t4) {
                var n4 = e4.indexName, o3 = e4.pushTaskPayload, i3 = e4.watch;
                if (!n4) throw Dt("Parameter `indexName` is required when calling `push`.");
                if (!o3) throw Dt("Parameter `pushTaskPayload` is required when calling `push`.");
                if (!o3.action) throw Dt("Parameter `pushTaskPayload.action` is required when calling `push`.");
                if (!o3.records) throw Dt("Parameter `pushTaskPayload.records` is required when calling `push`.");
                var u2 = t4 || { queryParameters: {} };
                return a3.write({ method: q, path: m("1/push/%s", n4), data: o3 }, r(r({}, u2), {}, { queryParameters: r(r({}, u2.queryParameters), {}, { watch: void 0 !== i3 }) }));
              } };
            })(r(r({}, n2), i2));
          }
          return (function(e3) {
            var t3 = e3.appId, n3 = f(void 0 !== e3.authMode ? e3.authMode : g.WithinHeaders, t3, e3.apiKey), a3 = S(r(r({ hosts: [{ url: "".concat(t3, "-dsn.algolia.net"), accept: v.Read }, { url: "".concat(t3, ".algolia.net"), accept: v.Write }].concat(h([{ url: "".concat(t3, "-1.algolianet.com") }, { url: "".concat(t3, "-2.algolianet.com") }, { url: "".concat(t3, "-3.algolianet.com") }])) }, e3), {}, { headers: r(r(r({}, n3.headers()), { "content-type": "application/x-www-form-urlencoded" }), e3.headers), queryParameters: r(r({}, n3.queryParameters()), e3.queryParameters) }));
            return p({ transporter: a3, appId: t3, addAlgoliaAgent: function(e4, t4) {
              a3.userAgent.add({ segment: e4, version: t4 });
            }, clearCache: function() {
              return Promise.all([a3.requestsCache.clear(), a3.responsesCache.clear()]).then((function() {
              }));
            } }, e3.methods);
          })(r(r({}, d2), {}, { methods: { search: ge, searchForFacetValues: ye, multipleBatch: pe, multipleGetObjects: me, multipleQueries: ge, copyIndex: V, copySettings: X, copySynonyms: Y, copyRules: _, moveIndex: he, listIndices: de, getLogs: ae, listClusters: fe, multipleSearchForFacetValues: ye, getApiKey: te, addApiKey: B, listApiKeys: ce, updateApiKey: je, deleteApiKey: $, restoreApiKey: we, assignUserID: G, assignUserIDs: L, getUserID: ie, searchUserIDs: Oe, listUserIDs: le, getTopUserIDs: oe, removeUserID: ve, hasPendingMappings: ue, clearDictionaryEntries: Q, deleteDictionaryEntries: ee, getDictionarySettings: ne, getAppTask: re, replaceDictionaryEntries: be, saveDictionaryEntries: Pe, searchDictionaryEntries: Ie, setDictionarySettings: xe, waitAppTask: qe, customRequest: Z, initIndex: function(e3) {
            return function(t3) {
              return r(r({}, se(e3)(t3, { methods: { batch: De, delete: Ue, findAnswers: Ke, getObject: Be, getObjects: Le, saveObject: tt, saveObjects: rt, search: ut, searchForFacetValues: st, waitTask: lt, setSettings: dt, getSettings: Ve, partialUpdateObject: Xe, partialUpdateObjects: Ye, deleteObject: ze, deleteObjects: Fe, deleteBy: Ce, clearObjects: Ae, browseObjects: Te, getObjectPosition: Ge, findObject: Me, exists: He, saveSynonym: ot, saveSynonyms: it, getSynonym: _e, searchSynonyms: ft, browseSynonyms: Se, deleteSynonym: We, clearSynonyms: Re, replaceAllObjects: Ze, replaceAllSynonyms: et, searchRules: ct, getRule: Qe, deleteRule: Je, saveRule: nt, saveRules: at, replaceAllRules: $e, browseRules: ke, clearRules: Ee } })), {}, { saveObjectsWithTransformation: jt(t3, o2), partialUpdateObjectsWithTransformation: qt(t3, o2) });
            };
          }, initAnalytics: function() {
            return function(e3) {
              return (function(e4) {
                var t3 = e4.region || "us", n3 = f(g.WithinHeaders, e4.appId, e4.apiKey), a3 = S(r(r({ hosts: [{ url: "analytics.".concat(t3, ".algolia.com") }] }, e4), {}, { headers: r(r(r({}, n3.headers()), { "content-type": "application/json" }), e4.headers), queryParameters: r(r({}, n3.queryParameters()), e4.queryParameters) }));
                return p({ appId: e4.appId, transporter: a3 }, e4.methods);
              })(r(r(r({}, i2), e3), {}, { methods: { addABTest: U, getABTest: F, getABTests: J, stopABTest: W, deleteABTest: z } }));
            };
          }, initPersonalization: l2, initRecommendation: function() {
            return function(e3) {
              return d2.logger.info("The `initRecommendation` method is deprecated. Use `initPersonalization` instead."), l2()(e3);
            };
          }, getRecommendations: vt, getFrequentlyBoughtTogether: bt, getLookingSimilar: Ot, getRecommendedForYou: xt, getRelatedProducts: wt, getTrendingFacets: Pt, getTrendingItems: It } }));
        }
        return Tt.version = "4.26.0", Tt;
      }));
    }
  });

  // node_modules/@algolia/recommend/dist/recommend.umd.js
  var require_recommend_umd = __commonJS({
    "node_modules/@algolia/recommend/dist/recommend.umd.js"(exports, module) {
      !(function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self)["@algolia/recommend"] = t();
      })(exports, (function() {
        "use strict";
        function e(e2, t2, r2) {
          return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
        }
        function t(e2, t2) {
          var r2 = Object.keys(e2);
          if (Object.getOwnPropertySymbols) {
            var n2 = Object.getOwnPropertySymbols(e2);
            t2 && (n2 = n2.filter((function(t3) {
              return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
            }))), r2.push.apply(r2, n2);
          }
          return r2;
        }
        function r(r2) {
          for (var n2 = 1; n2 < arguments.length; n2++) {
            var o2 = null != arguments[n2] ? arguments[n2] : {};
            n2 % 2 ? t(Object(o2), true).forEach((function(t2) {
              e(r2, t2, o2[t2]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r2, Object.getOwnPropertyDescriptors(o2)) : t(Object(o2)).forEach((function(e2) {
              Object.defineProperty(r2, e2, Object.getOwnPropertyDescriptor(o2, e2));
            }));
          }
          return r2;
        }
        function n(e2, t2) {
          return (function(e3) {
            if (Array.isArray(e3)) return e3;
          })(e2) || (function(e3, t3) {
            if (!(Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3))) return;
            var r2 = [], n2 = true, o2 = false, a2 = void 0;
            try {
              for (var u2, i2 = e3[Symbol.iterator](); !(n2 = (u2 = i2.next()).done) && (r2.push(u2.value), !t3 || r2.length !== t3); n2 = true) ;
            } catch (e4) {
              o2 = true, a2 = e4;
            } finally {
              try {
                n2 || null == i2.return || i2.return();
              } finally {
                if (o2) throw a2;
              }
            }
            return r2;
          })(e2, t2) || (function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          })();
        }
        function o(e2) {
          return (function(e3) {
            if (Array.isArray(e3)) {
              for (var t2 = 0, r2 = new Array(e3.length); t2 < e3.length; t2++) r2[t2] = e3[t2];
              return r2;
            }
          })(e2) || (function(e3) {
            if (Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3)) return Array.from(e3);
          })(e2) || (function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance");
          })();
        }
        function a() {
          var e2 = "undefined" != typeof globalThis ? globalThis : void 0;
          return e2 && e2.scheduler && e2.scheduler.yield ? e2.scheduler.yield().catch((function(e3) {
            return console.error("Failed to yield to main: ", e3), new Promise((function(e4) {
              return setTimeout(e4, 0);
            }));
          })) : new Promise((function(e3) {
            return setTimeout(e3, 0);
          }));
        }
        function u(e2) {
          var t2, r2 = "algoliasearch-client-js-".concat(e2.key), o2 = function() {
            return void 0 === t2 && (t2 = e2.localStorage || window.localStorage), t2;
          }, u2 = function() {
            return JSON.parse(o2().getItem(r2) || "{}");
          }, i2 = function(e3) {
            o2().setItem(r2, JSON.stringify(e3));
          }, s2 = function() {
            var t3 = e2.timeToLive ? 1e3 * e2.timeToLive : null, r3 = u2(), o3 = (/* @__PURE__ */ new Date()).getTime();
            return Object.fromEntries(Object.entries(r3).filter((function(e3) {
              var r4 = n(e3, 2)[1];
              return !(!r4 || void 0 === r4.timestamp) && (!t3 || r4.timestamp + t3 >= o3);
            })));
          };
          return { get: function(e3, t3) {
            var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } };
            return a().then((function() {
              var n2 = s2(), o3 = n2[JSON.stringify(e3)];
              return i2(n2), o3 ? o3.value : t3().then((function(e4) {
                return r3.miss(e4).then((function() {
                  return e4;
                }));
              }));
            }));
          }, set: function(e3, t3) {
            return a().then((function() {
              var n2 = u2();
              return n2[JSON.stringify(e3)] = { timestamp: (/* @__PURE__ */ new Date()).getTime(), value: t3 }, o2().setItem(r2, JSON.stringify(n2)), t3;
            }));
          }, delete: function(e3) {
            return a().then((function() {
              var t3 = u2();
              delete t3[JSON.stringify(e3)], o2().setItem(r2, JSON.stringify(t3));
            }));
          }, clear: function() {
            return Promise.resolve().then((function() {
              o2().removeItem(r2);
            }));
          } };
        }
        function i(e2) {
          var t2 = o(e2.caches), r2 = t2.shift();
          return void 0 === r2 ? { get: function(e3, t3) {
            var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } }, o2 = t3();
            return o2.then((function(e4) {
              return Promise.all([e4, r3.miss(e4)]);
            })).then((function(e4) {
              return n(e4, 1)[0];
            }));
          }, set: function(e3, t3) {
            return Promise.resolve(t3);
          }, delete: function(e3) {
            return Promise.resolve();
          }, clear: function() {
            return Promise.resolve();
          } } : { get: function(e3, n2) {
            var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } };
            return r2.get(e3, n2, o2).catch((function() {
              return i({ caches: t2 }).get(e3, n2, o2);
            }));
          }, set: function(e3, n2) {
            return r2.set(e3, n2).catch((function() {
              return i({ caches: t2 }).set(e3, n2);
            }));
          }, delete: function(e3) {
            return r2.delete(e3).catch((function() {
              return i({ caches: t2 }).delete(e3);
            }));
          }, clear: function() {
            return r2.clear().catch((function() {
              return i({ caches: t2 }).clear();
            }));
          } };
        }
        function s() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: true }, t2 = {};
          return { get: function(r2, n2) {
            var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
              return Promise.resolve();
            } }, a2 = JSON.stringify(r2);
            if (a2 in t2) return Promise.resolve(e2.serializable ? JSON.parse(t2[a2]) : t2[a2]);
            var u2 = n2(), i2 = o2 && o2.miss || function() {
              return Promise.resolve();
            };
            return u2.then((function(e3) {
              return i2(e3);
            })).then((function() {
              return u2;
            }));
          }, set: function(r2, n2) {
            return t2[JSON.stringify(r2)] = e2.serializable ? JSON.stringify(n2) : n2, Promise.resolve(n2);
          }, delete: function(e3) {
            return delete t2[JSON.stringify(e3)], Promise.resolve();
          }, clear: function() {
            return t2 = {}, Promise.resolve();
          } };
        }
        function c(e2) {
          for (var t2 = e2.length - 1; t2 > 0; t2--) {
            var r2 = Math.floor(Math.random() * (t2 + 1)), n2 = e2[t2];
            e2[t2] = e2[r2], e2[r2] = n2;
          }
          return e2;
        }
        var l = { WithinQueryParameters: 0, WithinHeaders: 1 }, f = 1, d = 2, m = 3;
        function h(e2, t2) {
          var r2 = e2 || {}, n2 = r2.data || {};
          return Object.keys(r2).forEach((function(e3) {
            -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e3) && (n2[e3] = r2[e3]);
          })), { data: Object.entries(n2).length > 0 ? n2 : void 0, timeout: r2.timeout || t2, headers: r2.headers || {}, queryParameters: r2.queryParameters || {}, cacheable: r2.cacheable };
        }
        var g = { Read: 1, Write: 2, Any: 3 }, p = 1, v = 2, y = 3;
        function b(e2) {
          var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p;
          return r(r({}, e2), {}, { status: t2, lastUpdate: Date.now() });
        }
        function O(e2) {
          return "string" == typeof e2 ? { protocol: "https", url: e2, accept: g.Any } : { protocol: e2.protocol || "https", url: e2.url, accept: e2.accept || g.Any };
        }
        var P = "GET", q = "POST";
        function T(e2, t2) {
          return Promise.all(t2.map((function(t3) {
            return e2.get(t3, (function() {
              return Promise.resolve(b(t3));
            }));
          }))).then((function(e3) {
            var r2 = e3.filter((function(e4) {
              return (function(e5) {
                return e5.status === p || Date.now() - e5.lastUpdate > 12e4;
              })(e4);
            })), n2 = e3.filter((function(e4) {
              return (function(e5) {
                return e5.status === y && Date.now() - e5.lastUpdate <= 12e4;
              })(e4);
            })), a2 = [].concat(o(r2), o(n2));
            return { getTimeout: function(e4, t3) {
              return (0 === n2.length && 0 === e4 ? 1 : n2.length + 3 + e4) * t3;
            }, statelessHosts: a2.length > 0 ? a2.map((function(e4) {
              return O(e4);
            })) : t2 };
          }));
        }
        function S(e2, t2, n2, a2) {
          var u2 = [], i2 = (function(e3, t3) {
            if (e3.method === P || void 0 === e3.data && void 0 === t3.data) return;
            var n3 = Array.isArray(e3.data) ? e3.data : r(r({}, e3.data), t3.data);
            return JSON.stringify(n3);
          })(n2, a2), s2 = (function(e3, t3) {
            var n3 = r(r({}, e3.headers), t3.headers), o2 = {};
            return Object.keys(n3).forEach((function(e4) {
              var t4 = n3[e4];
              o2[e4.toLowerCase()] = t4;
            })), o2;
          })(e2, a2), c2 = n2.method, l2 = n2.method !== P ? {} : r(r({}, n2.data), a2.data), f2 = r(r(r({ "x-algolia-agent": e2.userAgent.value }, e2.queryParameters), l2), a2.queryParameters), d2 = 0, m2 = function t3(r2, o2) {
            var l3 = r2.pop();
            if (void 0 === l3) throw { name: "RetryError", message: "Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the Algolia Support team: https://alg.li/support .", transporterStackTrace: A(u2) };
            var m3 = { data: i2, headers: s2, method: c2, url: j(l3, n2.path, f2), connectTimeout: o2(d2, e2.timeouts.connect), responseTimeout: o2(d2, a2.timeout) }, h2 = function(e3) {
              var t4 = { request: m3, response: e3, host: l3, triesLeft: r2.length };
              return u2.push(t4), t4;
            }, g2 = { onSuccess: function(e3) {
              return (function(e4) {
                try {
                  return JSON.parse(e4.content);
                } catch (t4) {
                  throw /* @__PURE__ */ (function(e5, t5) {
                    return { name: "DeserializationError", message: e5, response: t5 };
                  })(t4.message, e4);
                }
              })(e3);
            }, onRetry: function(n3) {
              var a3 = h2(n3);
              return n3.isTimedOut && d2++, Promise.all([e2.logger.info("Retryable failure", C(a3)), e2.hostsCache.set(l3, b(l3, n3.isTimedOut ? y : v))]).then((function() {
                return t3(r2, o2);
              }));
            }, onFail: function(e3) {
              throw h2(e3), (function(e4, t4) {
                var r3 = e4.content, n3 = e4.status, o3 = r3;
                try {
                  o3 = JSON.parse(r3).message;
                } catch (e5) {
                }
                return /* @__PURE__ */ (function(e5, t5, r4) {
                  return { name: "ApiError", message: e5, status: t5, transporterStackTrace: r4 };
                })(o3, n3, t4);
              })(e3, A(u2));
            } };
            return e2.requester.send(m3).then((function(e3) {
              return (function(e4, t4) {
                return (function(e5) {
                  var t5 = e5.status;
                  return e5.isTimedOut || (function(e6) {
                    var t6 = e6.isTimedOut, r3 = e6.status;
                    return !t6 && 0 == ~~r3;
                  })(e5) || 2 != ~~(t5 / 100) && 4 != ~~(t5 / 100);
                })(e4) ? t4.onRetry(e4) : 2 == ~~(e4.status / 100) ? t4.onSuccess(e4) : t4.onFail(e4);
              })(e3, g2);
            }));
          };
          return T(e2.hostsCache, t2).then((function(e3) {
            return m2(o(e3.statelessHosts).reverse(), e3.getTimeout);
          }));
        }
        function w(e2) {
          var t2 = { value: "Algolia for JavaScript (".concat(e2, ")"), add: function(e3) {
            var r2 = "; ".concat(e3.segment).concat(void 0 !== e3.version ? " (".concat(e3.version, ")") : "");
            return -1 === t2.value.indexOf(r2) && (t2.value = "".concat(t2.value).concat(r2)), t2;
          } };
          return t2;
        }
        function j(e2, t2, r2) {
          var n2, o2 = (n2 = r2, Object.keys(n2).map((function(e3) {
            return (function(e4) {
              for (var t4 = arguments.length, r3 = new Array(t4 > 1 ? t4 - 1 : 0), n3 = 1; n3 < t4; n3++) r3[n3 - 1] = arguments[n3];
              var o3 = 0;
              return e4.replace(/%s/g, (function() {
                return encodeURIComponent(r3[o3++]);
              }));
            })("%s=%s", e3, (t3 = n2[e3], "[object Object]" === Object.prototype.toString.call(t3) || "[object Array]" === Object.prototype.toString.call(t3) ? JSON.stringify(n2[e3]) : n2[e3]));
            var t3;
          })).join("&")), a2 = "".concat(e2.protocol, "://").concat(e2.url, "/").concat("/" === t2.charAt(0) ? t2.substr(1) : t2);
          return o2.length && (a2 += "?".concat(o2)), a2;
        }
        function A(e2) {
          return e2.map((function(e3) {
            return C(e3);
          }));
        }
        function C(e2) {
          var t2 = e2.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
          return r(r({}, e2), {}, { request: r(r({}, e2.request), {}, { headers: r(r({}, e2.request.headers), t2) }) });
        }
        var k = function(e2) {
          var t2 = e2.appId, o2 = /* @__PURE__ */ (function(e3, t3, r2) {
            var n2 = { "x-algolia-api-key": r2, "x-algolia-application-id": t3 };
            return { headers: function() {
              return e3 === l.WithinHeaders ? n2 : {};
            }, queryParameters: function() {
              return e3 === l.WithinQueryParameters ? n2 : {};
            } };
          })(void 0 !== e2.authMode ? e2.authMode : l.WithinHeaders, t2, e2.apiKey), a2 = (function(e3) {
            var t3 = e3.hostsCache, r2 = e3.logger, o3 = e3.requester, a3 = e3.requestsCache, u2 = e3.responsesCache, i2 = e3.timeouts, s2 = e3.userAgent, c2 = e3.hosts, l2 = e3.queryParameters, f2 = { hostsCache: t3, logger: r2, requester: o3, requestsCache: a3, responsesCache: u2, timeouts: i2, userAgent: s2, headers: e3.headers, queryParameters: l2, hosts: c2.map((function(e4) {
              return O(e4);
            })), read: function(e4, t4) {
              var r3 = h(t4, f2.timeouts.read), o4 = function() {
                return S(f2, f2.hosts.filter((function(e5) {
                  return 0 != (e5.accept & g.Read);
                })), e4, r3);
              };
              if (true !== (void 0 !== r3.cacheable ? r3.cacheable : e4.cacheable)) return o4();
              var a4 = { request: e4, mappedRequestOptions: r3, transporter: { queryParameters: f2.queryParameters, headers: f2.headers } };
              return f2.responsesCache.get(a4, (function() {
                return f2.requestsCache.get(a4, (function() {
                  return f2.requestsCache.set(a4, o4()).then((function(e5) {
                    return Promise.all([f2.requestsCache.delete(a4), e5]);
                  }), (function(e5) {
                    return Promise.all([f2.requestsCache.delete(a4), Promise.reject(e5)]);
                  })).then((function(e5) {
                    var t5 = n(e5, 2);
                    t5[0];
                    return t5[1];
                  }));
                }));
              }), { miss: function(e5) {
                return f2.responsesCache.set(a4, e5);
              } });
            }, write: function(e4, t4) {
              return S(f2, f2.hosts.filter((function(e5) {
                return 0 != (e5.accept & g.Write);
              })), e4, h(t4, f2.timeouts.write));
            } };
            return f2;
          })(r(r({ hosts: [{ url: "".concat(t2, "-dsn.algolia.net"), accept: g.Read }, { url: "".concat(t2, ".algolia.net"), accept: g.Write }].concat(c([{ url: "".concat(t2, "-1.algolianet.com") }, { url: "".concat(t2, "-2.algolianet.com") }, { url: "".concat(t2, "-3.algolianet.com") }])) }, e2), {}, { headers: r(r(r({}, o2.headers()), { "content-type": "application/x-www-form-urlencoded" }), e2.headers), queryParameters: r(r({}, o2.queryParameters()), e2.queryParameters) }));
          return (function(e3, t3) {
            return t3 ? (Object.keys(t3).forEach((function(r2) {
              e3[r2] = t3[r2](e3);
            })), e3) : e3;
          })({ transporter: a2, appId: t2, addAlgoliaAgent: function(e3, t3) {
            a2.userAgent.add({ segment: e3, version: t3 });
          }, clearCache: function() {
            return Promise.all([a2.requestsCache.clear(), a2.responsesCache.clear()]).then((function() {
            }));
          } }, e2.methods);
        }, N = function(e2) {
          return function(t2, n2) {
            var o2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: o2 }, cacheable: true }, n2);
          };
        }, R = function(e2) {
          return function(t2, n2) {
            return N(e2)(t2.map((function(e3) {
              return r(r({}, e3), {}, { fallbackParameters: {}, model: "bought-together" });
            })), n2);
          };
        }, x = function(e2) {
          return function(t2, n2) {
            return N(e2)(t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "related-products" });
            })), n2);
          };
        }, J = function(e2) {
          return function(t2, n2) {
            var o2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "trending-facets", threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: o2 }, cacheable: true }, n2);
          };
        }, E = function(e2) {
          return function(t2, n2) {
            var o2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "trending-items", threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: o2 }, cacheable: true }, n2);
          };
        }, I = function(e2) {
          return function(t2, n2) {
            return N(e2)(t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "looking-similar" });
            })), n2);
          };
        }, D = function(e2) {
          return function(t2, n2) {
            var o2 = t2.map((function(e3) {
              return r(r({}, e3), {}, { model: "recommended-for-you", threshold: e3.threshold || 0 });
            }));
            return e2.transporter.read({ method: q, path: "1/indexes/*/recommendations", data: { requests: o2 }, cacheable: true }, n2);
          };
        };
        function F(e2, t2, n2) {
          var o2, a2 = { appId: e2, apiKey: t2, timeouts: { connect: 1, read: 2, write: 30 }, requester: { send: function(e3) {
            return new Promise((function(t3) {
              var r2 = new XMLHttpRequest();
              r2.open(e3.method, e3.url, true), Object.keys(e3.headers).forEach((function(t4) {
                return r2.setRequestHeader(t4, e3.headers[t4]);
              }));
              var n3, o3 = function(e4, n4) {
                return setTimeout((function() {
                  r2.abort(), t3({ status: 0, content: n4, isTimedOut: true });
                }), 1e3 * e4);
              }, a3 = o3(e3.connectTimeout, "Connection timeout");
              r2.onreadystatechange = function() {
                r2.readyState > r2.OPENED && void 0 === n3 && (clearTimeout(a3), n3 = o3(e3.responseTimeout, "Socket timeout"));
              }, r2.onerror = function() {
                0 === r2.status && (clearTimeout(a3), clearTimeout(n3), t3({ content: r2.responseText || "Network request failed", status: r2.status, isTimedOut: false }));
              }, r2.onload = function() {
                clearTimeout(a3), clearTimeout(n3), t3({ content: r2.responseText, status: r2.status, isTimedOut: false });
              }, r2.send(e3.data);
            }));
          } }, logger: (o2 = m, { debug: function(e3, t3) {
            return f >= o2 && console.debug(e3, t3), Promise.resolve();
          }, info: function(e3, t3) {
            return d >= o2 && console.info(e3, t3), Promise.resolve();
          }, error: function(e3, t3) {
            return console.error(e3, t3), Promise.resolve();
          } }), responsesCache: s(), requestsCache: s({ serializable: false }), hostsCache: i({ caches: [u({ key: "".concat("4.26.0", "-").concat(e2) }), s()] }), userAgent: w("4.26.0").add({ segment: "Recommend", version: "4.26.0" }).add({ segment: "Browser" }), authMode: l.WithinQueryParameters };
          return k(r(r(r({}, a2), n2), {}, { methods: { getFrequentlyBoughtTogether: R, getRecommendations: N, getRelatedProducts: x, getTrendingFacets: J, getTrendingItems: E, getLookingSimilar: I, getRecommendedForYou: D } }));
        }
        return F.version = "4.26.0", F.getFrequentlyBoughtTogether = R, F.getRecommendations = N, F.getRelatedProducts = x, F.getTrendingFacets = J, F.getTrendingItems = E, F.getLookingSimilar = I, F.getRecommendedForYou = D, F;
      }));
    }
  });

  // node_modules/search-insights/dist/search-insights-browser.mjs
  var version = "2.17.3";
  function extractAdditionalParams(e) {
    return e.reduce(function(e2, t) {
      var n = e2.events, e2 = e2.additionalParams;
      return "index" in t ? { additionalParams: e2, events: n.concat([t]) } : { events: n, additionalParams: t };
    }, { events: [], additionalParams: void 0 });
  }
  var supportsCookies = function() {
    try {
      return Boolean(navigator.cookieEnabled);
    } catch (e) {
      return false;
    }
  };
  var supportsSendBeacon = function() {
    try {
      return Boolean(navigator.sendBeacon);
    } catch (e) {
      return false;
    }
  };
  var supportsXMLHttpRequest = function() {
    try {
      return Boolean(XMLHttpRequest);
    } catch (e) {
      return false;
    }
  };
  var supportsNativeFetch = function() {
    try {
      return void 0 !== fetch;
    } catch (e) {
      return false;
    }
  };
  var LocalStorage = function() {
  };
  function ensureLocalStorage() {
    try {
      var e = "__test_localStorage__";
      return globalThis.localStorage.setItem(e, e), globalThis.localStorage.removeItem(e), globalThis.localStorage;
    } catch (e2) {
    }
  }
  LocalStorage.get = function(e) {
    var t = null == (t = this.store) ? void 0 : t.getItem(e);
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch (e2) {
      return null;
    }
  }, LocalStorage.set = function(t, e) {
    var n;
    try {
      null != (n = this.store) && n.setItem(t, JSON.stringify(e));
    } catch (e2) {
      console.error("Unable to set " + t + " in localStorage, storage may be full.");
    }
  }, LocalStorage.remove = function(e) {
    var t;
    null != (t = this.store) && t.removeItem(e);
  }, LocalStorage.store = ensureLocalStorage();
  var STORE = "AlgoliaObjectQueryCache";
  var LIMIT = 5e3;
  var FREE = 1e3;
  function getCache() {
    var e;
    return null != (e = LocalStorage.get(STORE)) ? e : {};
  }
  function setCache(e) {
    LocalStorage.set(STORE, limited(e));
  }
  function limited(e) {
    return Object.keys(e).length > LIMIT ? purgeOldest(e) : e;
  }
  function purgeOldest(e) {
    e = Object.entries(e).sort(function(e2, t) {
      e2 = e2[1][1];
      return t[1][1] - e2;
    });
    return e.slice(0, e.length - FREE - 1).reduce(function(e2, t) {
      var n = t[0], t = t[1];
      return Object.assign(Object.assign({}, e2), ((e2 = {})[n] = t, e2));
    }, {});
  }
  function makeKey(e, t) {
    return e + "_" + t;
  }
  function storeQueryForObject(e, t, n) {
    var i = getCache();
    i[makeKey(e, t)] = [n, Date.now()], setCache(i);
  }
  function getQueryForObject(e, t) {
    return getCache()[makeKey(e, t)];
  }
  function removeQueryForObjects(t, e) {
    var n = getCache();
    e.forEach(function(e2) {
      delete n[makeKey(t, e2)];
    }), setCache(n);
  }
  var isUndefined = function(e) {
    return void 0 === e;
  };
  var isNumber = function(e) {
    return "number" == typeof e;
  };
  var isFunction = function(e) {
    return "function" == typeof e;
  };
  var isPromise = function(e) {
    return "function" == typeof (null == e ? void 0 : e.then);
  };
  function getFunctionalInterface(i) {
    return function(e) {
      for (var t = [], n = arguments.length - 1; 0 < n--; ) t[n] = arguments[n + 1];
      if (e && isFunction(i[e])) return i[e].apply(i, t);
      console.warn("The method `" + e + "` doesn't exist.");
    };
  }
  var DEFAULT_ALGOLIA_AGENTS = ["insights-js (" + version + ")", "insights-js-browser-esm (" + version + ")"];
  function addAlgoliaAgent(e) {
    -1 === this._ua.indexOf(e) && this._ua.push(e);
  }
  function getVersion(e) {
    return isFunction(e) && e(this.version), this.version;
  }
  function __rest(e, t) {
    var n = {};
    for (r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
  }
  function addQueryId(e) {
    return e.map(function(i) {
      var r, e2;
      return !isValidEventForQueryIdLookup(i) || (r = [], e2 = null == (e2 = i.objectIDs) ? void 0 : e2.map(function(e3, t) {
        var n = null == (n = i.objectData) ? void 0 : n[t];
        return null != n && n.queryID ? n : ((t = (null != (t = getQueryForObject(i.index, e3)) ? t : [])[0]) && r.push(e3), Object.assign(Object.assign({}, n), { queryID: t }));
      }), 0 === r.length) ? i : Object.assign(Object.assign({}, i), { objectData: e2, objectIDsWithInferredQueryID: r });
    });
  }
  function isValidEventForQueryIdLookup(e) {
    return !e.queryID && "conversion" === e.eventType;
  }
  function makeSendEvents(r) {
    return function(e, t) {
      var i = this;
      if (this._userHasOptedOut) return Promise.resolve(false);
      if (!(!isUndefined(this._apiKey) && !isUndefined(this._appId) || (null == (n = null == t ? void 0 : t.headers) ? void 0 : n["X-Algolia-Application-Id"]) && (null == (n = null == t ? void 0 : t.headers) ? void 0 : n["X-Algolia-API-Key"]))) throw new Error("Before calling any methods on the analytics, you first need to call the 'init' function with appId and apiKey parameters or provide custom credentials in additional parameters.");
      !this._userToken && this._anonymousUserToken && this.setAnonymousUserToken(true);
      var n = (null != t && t.inferQueryID ? addQueryId(e) : e).map(function(e2) {
        var t2 = e2.filters, n2 = __rest(e2, ["filters"]), e2 = Object.assign(Object.assign({}, n2), { userToken: null != (n2 = null == e2 ? void 0 : e2.userToken) ? n2 : i._userToken, authenticatedUserToken: null != (n2 = null == e2 ? void 0 : e2.authenticatedUserToken) ? n2 : i._authenticatedUserToken });
        return isUndefined(t2) || (e2.filters = t2.map(encodeURIComponent)), e2;
      });
      return 0 === n.length ? Promise.resolve(false) : (e = sendRequest(r, this._ua, this._endpointOrigin, n, this._appId, this._apiKey, null == t ? void 0 : t.headers), isPromise(e) ? e.then(purgePurchased(n)) : e);
    };
  }
  function purgePurchased(t) {
    return function(e) {
      return e && t.filter(function(e2) {
        var t2 = e2.eventType, n = e2.eventSubtype, e2 = e2.objectIDs;
        return "conversion" === t2 && "purchase" === n && (null == e2 ? void 0 : e2.length);
      }).forEach(function(e2) {
        return removeQueryForObjects(e2.index, e2.objectIDs);
      }), e;
    };
  }
  function sendRequest(e, t, n, i, r, o, s) {
    var a = (s = void 0 === s ? {} : s)["X-Algolia-Application-Id"], c = s["X-Algolia-API-Key"], s = __rest(s, ["X-Algolia-Application-Id", "X-Algolia-API-Key"]), u = Object.assign({ "X-Algolia-Application-Id": null != a ? a : r, "X-Algolia-API-Key": null != c ? c : o, "X-Algolia-Agent": encodeURIComponent(t.join("; ")) }, s);
    return e(n + "/1/events?" + Object.keys(u).map(function(e2) {
      return e2 + "=" + u[e2];
    }).join("&"), { events: i });
  }
  function createUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
      var t = 16 * Math.random() | 0;
      return ("x" === e ? t : 3 & t | 8).toString(16);
    });
  }
  var COOKIE_KEY = "_ALGOLIA";
  var MONTH = 2592e6;
  var setCookie = function(e, t, n) {
    var i = /* @__PURE__ */ new Date(), n = (i.setTime(i.getTime() + n), "expires=" + i.toUTCString());
    document.cookie = e + "=" + t + ";" + n + ";path=/";
  };
  var getCookie = function(e) {
    for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
      for (var r = n[i]; " " === r.charAt(0); ) r = r.substring(1);
      if (0 === r.indexOf(t)) return r.substring(t.length, r.length);
    }
    return "";
  };
  function checkIfAnonymousToken(e) {
    return "number" != typeof e && 0 === e.indexOf("anonymous-");
  }
  function saveTokenAsCookie() {
    var e = getCookie(COOKIE_KEY);
    !this._userToken || e && "" !== e && 0 === e.indexOf("anonymous-") || setCookie(COOKIE_KEY, this._userToken, this._cookieDuration);
  }
  function setAnonymousUserToken(e) {
    (e = void 0 !== e && e) ? this.setUserToken("anonymous-" + createUUID()) : supportsCookies() && ((e = getCookie(COOKIE_KEY)) && "" !== e && 0 === e.indexOf("anonymous-") ? this.setUserToken(e) : (e = this.setUserToken("anonymous-" + createUUID()), setCookie(COOKIE_KEY, e, this._cookieDuration)));
  }
  function setUserToken(e) {
    return this._userToken = e, isFunction(this._onUserTokenChangeCallback) && this._onUserTokenChangeCallback(this._userToken), this._userToken;
  }
  function getUserToken(e, t) {
    return isFunction(t) && t(null, this._userToken), this._userToken;
  }
  function onUserTokenChange(e, t) {
    this._onUserTokenChangeCallback = e, t && t.immediate && isFunction(this._onUserTokenChangeCallback) && this._onUserTokenChangeCallback(this._userToken);
  }
  function setAuthenticatedUserToken(e) {
    return this._authenticatedUserToken = e, isFunction(this._onAuthenticatedUserTokenChangeCallback) && this._onAuthenticatedUserTokenChangeCallback(this._authenticatedUserToken), this._authenticatedUserToken;
  }
  function getAuthenticatedUserToken(e, t) {
    return isFunction(t) && t(null, this._authenticatedUserToken), this._authenticatedUserToken;
  }
  function onAuthenticatedUserTokenChange(e, t) {
    this._onAuthenticatedUserTokenChangeCallback = e, t && t.immediate && isFunction(this._onAuthenticatedUserTokenChangeCallback) && this._onAuthenticatedUserTokenChangeCallback(this._authenticatedUserToken);
  }
  function addEventType(t, e) {
    return e.map(function(e2) {
      return Object.assign({ eventType: t }, e2);
    });
  }
  function addEventTypeAndSubtype(t, n, e) {
    return e.map(function(e2) {
      return Object.assign({ eventType: t, eventSubtype: n }, e2);
    });
  }
  function clickedObjectIDsAfterSearch() {
    for (var i = this, e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), r = n.events, n = n.additionalParams;
    return r.forEach(function(e2) {
      var t2 = e2.index, n2 = e2.queryID;
      return e2.objectIDs.forEach(function(e3) {
        return !i._userHasOptedOut && storeQueryForObject(t2, e3, n2);
      });
    }), this.sendEvents(addEventType("click", r), n);
  }
  function clickedObjectIDs() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventType("click", i), n);
  }
  function clickedFilters() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventType("click", i), n);
  }
  function convertedObjectIDsAfterSearch() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventType("conversion", i), n);
  }
  function addedToCartObjectIDsAfterSearch() {
    for (var o = this, e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return i.forEach(function(e2) {
      var n2 = e2.index, i2 = e2.queryID, t2 = e2.objectIDs, r = e2.objectData;
      return t2.forEach(function(e3, t3) {
        t3 = null != (t3 = null == (t3 = null == r ? void 0 : r[t3]) ? void 0 : t3.queryID) ? t3 : i2;
        !o._userHasOptedOut && t3 && storeQueryForObject(n2, e3, t3);
      });
    }), this.sendEvents(addEventTypeAndSubtype("conversion", "addToCart", i), n);
  }
  function purchasedObjectIDsAfterSearch() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventTypeAndSubtype("conversion", "purchase", i), n);
  }
  function convertedObjectIDs() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventType("conversion", i), n);
  }
  function addedToCartObjectIDs() {
    for (var r = this, e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return i.forEach(function(e2) {
      var n2 = e2.index, t2 = e2.objectIDs, i2 = e2.objectData;
      return t2.forEach(function(e3, t3) {
        t3 = null == (t3 = null == i2 ? void 0 : i2[t3]) ? void 0 : t3.queryID;
        !r._userHasOptedOut && t3 && storeQueryForObject(n2, e3, t3);
      });
    }), this.sendEvents(addEventTypeAndSubtype("conversion", "addToCart", i), n);
  }
  function purchasedObjectIDs() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventTypeAndSubtype("conversion", "purchase", i), n);
  }
  function convertedFilters() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventType("conversion", i), n);
  }
  var SUPPORTED_REGIONS = ["de", "us"];
  function init(e) {
    var t;
    if (!isUndefined((e = void 0 === e ? {} : e).region) && -1 === SUPPORTED_REGIONS.indexOf(e.region)) throw new Error("optional region is incorrect, please provide either one of: " + SUPPORTED_REGIONS.join(", ") + ".");
    if (!(isUndefined(e.cookieDuration) || isNumber(e.cookieDuration) && isFinite(e.cookieDuration) && Math.floor(e.cookieDuration) === e.cookieDuration)) throw new Error("optional cookieDuration is incorrect, expected an integer.");
    setOptions(this, e, { _userHasOptedOut: Boolean(e.userHasOptedOut), _region: e.region, _host: e.host, _anonymousUserToken: null == (t = e.anonymousUserToken) || t, _useCookie: null != (t = e.useCookie) && t, _cookieDuration: e.cookieDuration || 6 * MONTH }), this._endpointOrigin = this._host || (this._region ? "https://insights." + this._region + ".algolia.io" : "https://insights.algolia.io"), this._ua = [].concat(DEFAULT_ALGOLIA_AGENTS), e.authenticatedUserToken && this.setAuthenticatedUserToken(e.authenticatedUserToken), e.userToken ? this.setUserToken(e.userToken) : this._userToken || this._userHasOptedOut || !this._useCookie ? checkIfTokenNeedsToBeSaved(this) && this.saveTokenAsCookie() : this.setAnonymousUserToken();
  }
  function setOptions(e, t, n) {
    var i = t.partial, r = __rest(t, ["partial"]);
    i || Object.assign(e, n), Object.assign(e, Object.keys(r).reduce(function(e2, t2) {
      return Object.assign(Object.assign({}, e2), ((e2 = {})["_" + t2] = r[t2], e2));
    }, {}));
  }
  function checkIfTokenNeedsToBeSaved(e) {
    return void 0 !== e._userToken && checkIfAnonymousToken(e._userToken) && e._useCookie && !e._userHasOptedOut;
  }
  function viewedObjectIDs() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventType("view", i), n);
  }
  function viewedFilters() {
    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
    var n = extractAdditionalParams(e), i = n.events, n = n.additionalParams;
    return this.sendEvents(addEventType("view", i), n);
  }
  var AlgoliaAnalytics = function(e) {
    e = e.requestFn;
    this._endpointOrigin = "https://insights.algolia.io", this._anonymousUserToken = true, this._userHasOptedOut = false, this._useCookie = false, this._cookieDuration = 6 * MONTH, this._ua = [], this.version = version, this.sendEvents = makeSendEvents(e).bind(this), this.init = init.bind(this), this.addAlgoliaAgent = addAlgoliaAgent.bind(this), this.saveTokenAsCookie = saveTokenAsCookie.bind(this), this.setUserToken = setUserToken.bind(this), this.setAnonymousUserToken = setAnonymousUserToken.bind(this), this.getUserToken = getUserToken.bind(this), this.onUserTokenChange = onUserTokenChange.bind(this), this.setAuthenticatedUserToken = setAuthenticatedUserToken.bind(this), this.getAuthenticatedUserToken = getAuthenticatedUserToken.bind(this), this.onAuthenticatedUserTokenChange = onAuthenticatedUserTokenChange.bind(this), this.clickedObjectIDsAfterSearch = clickedObjectIDsAfterSearch.bind(this), this.clickedObjectIDs = clickedObjectIDs.bind(this), this.clickedFilters = clickedFilters.bind(this), this.convertedObjectIDsAfterSearch = convertedObjectIDsAfterSearch.bind(this), this.purchasedObjectIDsAfterSearch = purchasedObjectIDsAfterSearch.bind(this), this.addedToCartObjectIDsAfterSearch = addedToCartObjectIDsAfterSearch.bind(this), this.convertedObjectIDs = convertedObjectIDs.bind(this), this.addedToCartObjectIDs = addedToCartObjectIDs.bind(this), this.purchasedObjectIDs = purchasedObjectIDs.bind(this), this.convertedFilters = convertedFilters.bind(this), this.viewedObjectIDs = viewedObjectIDs.bind(this), this.viewedFilters = viewedFilters.bind(this), this.getVersion = getVersion.bind(this);
  };
  function createInsightsClient(e) {
    var t, e = getFunctionalInterface(new AlgoliaAnalytics({ requestFn: e }));
    if ("object" == typeof window && !window.AlgoliaAnalyticsObject) {
      for (; t = createUUID(), void 0 !== window[t]; ) ;
      window.AlgoliaAnalyticsObject = t, window[window.AlgoliaAnalyticsObject] = e;
    }
    return e.version = version, e;
  }
  var requestWithXMLHttpRequest = function(r, o) {
    return new Promise(function(e, t) {
      var n = JSON.stringify(o), i = new XMLHttpRequest();
      i.addEventListener("readystatechange", function() {
        4 === i.readyState && 200 === i.status ? e(true) : 4 === i.readyState && e(false);
      }), i.addEventListener("error", function() {
        return t();
      }), i.addEventListener("timeout", function() {
        return e(false);
      }), i.open("POST", r), i.setRequestHeader("Content-Type", "application/json"), i.send(n);
    });
  };
  var requestWithSendBeacon = function(e, t) {
    var n = JSON.stringify(t), n = navigator.sendBeacon(e, n);
    return Promise.resolve(!!n || requestWithXMLHttpRequest(e, t));
  };
  var requestWithNativeFetch = function(e, i) {
    return new Promise(function(t, n) {
      fetch(e, { method: "POST", body: JSON.stringify(i), headers: { "Content-Type": "application/json" } }).then(function(e2) {
        t(200 === e2.status);
      }).catch(function(e2) {
        n(e2);
      });
    });
  };
  function getRequesterForBrowser() {
    if (supportsSendBeacon()) return requestWithSendBeacon;
    if (supportsXMLHttpRequest()) return requestWithXMLHttpRequest;
    if (supportsNativeFetch()) return requestWithNativeFetch;
    throw new Error("Could not find a supported HTTP request client in this environment.");
  }
  var entryBrowser = createInsightsClient(getRequesterForBrowser());

  // node_modules/search-insights/index-browser.mjs
  var index_browser_default = entryBrowser;

  // src/app.carved.js
  var import_algoliasearch = __toESM(require_algoliasearch_umd(), 1);
  var import_recommend = __toESM(require_recommend_umd(), 1);
  var insights = index_browser_default;
  var eventHandlers = /* @__PURE__ */ new Map();
  function on(e, t) {
    eventHandlers.has(e) || eventHandlers.set(e, /* @__PURE__ */ new Set()), eventHandlers.get(e).add(t);
  }
  function off(e, t) {
    eventHandlers.get(e)?.delete(t);
  }
  function emit(e, ...t) {
    eventHandlers.get(e)?.forEach((n) => {
      try {
        n(...t);
      } catch (r) {
        console.warn(`[wf-algolia] Event handler error (${e}):`, r);
      }
    });
  }
  var WEBFLOW_CSS = {
    formBlock: "w-form",
    checkboxField: "w-checkbox",
    checkboxInput: "w-checkbox-input",
    radioField: "w-radio",
    radioInput: "w-radio-input",
    checkboxOrRadioLabel: "w-form-label",
    checkboxOrRadioFocus: "w--redirected-focus",
    checkboxOrRadioChecked: "w--redirected-checked",
    successMessage: "w-form-done",
    errorMessage: "w-form-fail"
  };
  var getSiteId = (e = document) => e.documentElement.getAttribute("data-wf-site");
  var restartWebflow = async (e) => {
    let { Webflow: t } = window;
    if (!(!t || !("destroy" in t) || !("ready" in t) || !("require" in t)) && !(e && !e.length)) {
      if (e || (t.destroy(), t.ready()), !e || e.includes("ix2")) {
        let n = t.require("ix2");
        if (n) {
          let { store: r, actions: i } = n, { eventState: o } = r.getState().ixSession, l = Object.entries(o);
          e || n.destroy(), n.init(), await Promise.all(
            l.map((s) => r.dispatch(i.eventStateChanged(...s)))
          );
        }
      }
      if (!e || e.includes("commerce")) {
        let n = t.require("commerce"), r = getSiteId();
        n && r && (n.destroy(), n.init({
          siteId: r,
          apiUrl: "https://render.webflow.com"
        }));
      }
      if (e?.includes("lightbox") && t.require("lightbox")?.ready(), e?.includes("slider")) {
        let n = t.require("slider");
        n && (n.redraw(), n.ready());
      }
      return e?.includes("tabs") && t.require("tabs")?.redraw(), new Promise((n) => t.push(() => n(void 0)));
    }
  };
  function closeDropdownOnPick(e) {
    if (!e.closest("[wf-algolia-close-on-pick]")) return;
    let t = e.closest(".w-dropdown");
    if (!t) return;
    let n = window.$ ?? window.jQuery;
    if (typeof n == "function")
      try {
        n(t).trigger("w-close");
      } catch {
      }
    let r = t.querySelector(".w-dropdown-toggle"), i = t.querySelector(".w-dropdown-list");
    t.classList.remove("w--open"), r && (r.classList.remove("w--open"), r.setAttribute("aria-expanded", "false")), i && (i.classList.remove("w--open"), i.setAttribute("aria-hidden", "true")), r && r.click();
  }
  var FILTER_STATE = {};
  var STAGING_STATE = {};
  function toggleStateValue(e, t, n, r, i, o) {
    e[t] || (e[t] = {
      type: o,
      match: i,
      values: /* @__PURE__ */ new Set()
    }), r ? e[t].values.add(n) : (e[t].values.delete(n), e[t].values.size === 0 && delete e[t]);
  }
  function clearState(e) {
    Object.keys(e).forEach((t) => delete e[t]);
  }
  function stageFilter(e, t) {
    STAGING_STATE[e] = t;
  }
  function commitStaging(e) {
    let t = e && e.length > 0 ? e : Object.keys(STAGING_STATE);
    for (let n of t) {
      let r = STAGING_STATE[n];
      r !== void 0 && (FILTER_STATE[n] = r, delete STAGING_STATE[n]);
    }
  }
  function discardStaging(e) {
    if (!e || e.length === 0) {
      for (let t of Object.keys(STAGING_STATE)) delete STAGING_STATE[t];
      return;
    }
    for (let t of e) delete STAGING_STATE[t];
  }
  function getEffectiveState() {
    return {
      ...FILTER_STATE,
      ...STAGING_STATE
    };
  }
  var MAX_DEPTH = 5;
  var HIERARCHY_SEPARATOR = " > ";
  function leafValue(e) {
    let t = e.lastIndexOf(HIERARCHY_SEPARATOR);
    return t === -1 ? e : e.slice(t + HIERARCHY_SEPARATOR.length);
  }
  function getLabelMode(e) {
    return e.getAttribute("wf-algolia-label") === "leaf" ? "leaf" : "full";
  }
  function formatFacetLabel(e, t) {
    return t === "leaf" ? leafValue(e) : e;
  }
  var groupFieldById = /* @__PURE__ */ new Map();
  var groupElById = /* @__PURE__ */ new Map();
  var childLinksByParentId = /* @__PURE__ */ new Map();
  var linkByChildEl = /* @__PURE__ */ new WeakMap();
  var allChildLinks = [];
  var linkByGroupId = /* @__PURE__ */ new Map();
  var warnedWhenParentEmpty = /* @__PURE__ */ new WeakSet();
  function parseWhenParentEmpty(e) {
    let t = e.getAttribute("wf-algolia-when-parent-empty");
    return t === null ? null : t === "hide" ? "hide" : t === "disable" ? "disable" : (warnedWhenParentEmpty.has(e) || (warnedWhenParentEmpty.add(e), console.warn(
      `[wf-algolia] Unknown wf-algolia-when-parent-empty='${t}'; valid values: 'hide' | 'disable'. Treating as absent.`,
      e
    )), null);
  }
  function registerGroup(e, t, n) {
    groupFieldById.set(e, t), groupElById.set(e, n);
  }
  function getGroupField(e) {
    return groupFieldById.get(e) ?? null;
  }
  function registerChildLink(e) {
    let t = childLinksByParentId.get(e.parentGroupId) ?? [];
    t.push(e), childLinksByParentId.set(e.parentGroupId, t), linkByChildEl.set(e.childEl, e), linkByGroupId.set(e.groupId, e), allChildLinks.push(e);
  }
  function getChildLink(e) {
    return linkByGroupId.get(e) ?? null;
  }
  function isParentGroup(e) {
    return childLinksByParentId.has(e);
  }
  function getAllChildLinks() {
    return allChildLinks.slice();
  }
  function hideEl(e, t = "is-hidden") {
    e.classList.add(t), e.style.setProperty("display", "none", "important");
  }
  function unhideEl(e, t = "is-hidden") {
    e.classList.remove(t), e.style.removeProperty("display");
  }
  function disableEl(e, t = "is-disabled") {
    e.classList.add(t), e.setAttribute("data-wf-algolia-disabled", "true"), e.setAttribute("aria-disabled", "true"), e.style.pointerEvents = "none";
  }
  function enableEl(e, t = "is-disabled") {
    e.classList.remove(t), e.removeAttribute("data-wf-algolia-disabled"), e.removeAttribute("aria-disabled"), e.style.removeProperty("pointer-events");
  }
  function applyParentEmptyBehavior(e, t) {
    t === "hide" ? hideEl(e) : t === "disable" && disableEl(e);
  }
  function clearParentEmptyBehavior(e, t) {
    t === "hide" ? unhideEl(e) : t === "disable" && enableEl(e);
  }
  function collectAncestors(e) {
    let t = [], n = /* @__PURE__ */ new Set(), r = linkByGroupId.get(e);
    for (; r; ) {
      if (n.has(r.groupId)) {
        console.warn(
          `[wf-algolia] Cycle detected in hierarchy at '${r.groupId}'`
        ), emit(
          "error",
          new Error(`wf-algolia: hierarchy cycle at '${r.groupId}'`)
        );
        break;
      }
      if (n.add(r.groupId), t.length >= MAX_DEPTH) {
        console.warn(
          `[wf-algolia] collectAncestors exceeded MAX_DEPTH=${MAX_DEPTH} at '${r.groupId}'`
        );
        break;
      }
      let i = linkByGroupId.get(r.parentGroupId);
      if (!i) break;
      t.unshift(i), r = i;
    }
    return t;
  }
  function collectDescendants(e) {
    let t = [], n = [
      {
        id: e,
        depthFromRoot: 0
      }
    ], r = /* @__PURE__ */ new WeakSet(), i = /* @__PURE__ */ new Set([e]);
    for (; n.length > 0; ) {
      let { id: o, depthFromRoot: l } = n.shift();
      if (l >= MAX_DEPTH) continue;
      let s = childLinksByParentId.get(o) ?? [];
      for (let c of s)
        r.has(c.childEl) || (r.add(c.childEl), t.push(c), i.has(c.groupId) || (i.add(c.groupId), n.push({
          id: c.groupId,
          depthFromRoot: l + 1
        })));
    }
    return t;
  }
  function getAncestorSelections(e, t) {
    let n = collectAncestors(e.groupId), r = [];
    for (let o of n) {
      let l = firstValueOf(t, o.childField);
      if (l === null) return r;
      r.push({
        field: o.childField,
        value: l
      });
    }
    let i = firstValueOf(t, e.parentField);
    return i === null || r.push({
      field: e.parentField,
      value: i
    }), r;
  }
  function firstValueOf(e, t) {
    let n = e[t];
    return !n || !n.values || n.values.size === 0 ? null : Array.from(n.values)[0] ?? null;
  }
  function syncHierarchyVisibility(e) {
    for (let t of allChildLinks)
      getAncestorSelections(t, e).length === t.depth ? clearParentEmptyBehavior(t.childEl, t.whenParentEmpty) : applyParentEmptyBehavior(t.childEl, t.whenParentEmpty);
  }
  var activeLabelClassCache = /* @__PURE__ */ new WeakMap();
  var WF_INPUT_VISUAL_SELECTOR = `.${WEBFLOW_CSS.radioInput}, .${WEBFLOW_CSS.checkboxInput}`;
  function syncWebflowInputVisual(e, t) {
    let n = e.closest("label");
    if (!n || !(n.classList.contains(WEBFLOW_CSS.radioField) || n.classList.contains(WEBFLOW_CSS.checkboxField)))
      return;
    let i = n.querySelector(WF_INPUT_VISUAL_SELECTOR);
    i && (t ? i.classList.add(WEBFLOW_CSS.checkboxOrRadioChecked) : (i.classList.remove(WEBFLOW_CSS.checkboxOrRadioChecked), i.classList.remove(WEBFLOW_CSS.checkboxOrRadioFocus)));
  }
  function detectActiveLabelClasses(e, t) {
    let n = [...e.querySelectorAll("label")];
    if (n.length < 2) return null;
    let r = null;
    for (let h of n)
      if (h.querySelector("input")?.getAttribute("wf-algolia-reset") === t) {
        r = h;
        break;
      }
    if (!r) {
      for (let h of n)
        if (h.querySelector("input")?.hasAttribute("checked")) {
          r = h;
          break;
        }
    }
    if (!r) {
      let h = n.map((b) => {
        let w = [...b.classList].filter(Boolean), E = 0;
        for (let T of w)
          n.some((D) => D !== b && D.classList.contains(T)) || E++;
        return E;
      }), y = Math.max(...h);
      if (y > 0) {
        let b = n.filter((w, E) => h[E] === y);
        b.length === 1 && (r = b[0] ?? null);
      }
    }
    if (!r) return null;
    let i = n.find((h) => h !== r);
    if (!i) return null;
    let o = /* @__PURE__ */ new Set([
      WEBFLOW_CSS.checkboxOrRadioChecked,
      WEBFLOW_CSS.checkboxOrRadioFocus
    ]), l = new Set([...r.classList].filter(Boolean)), s = new Set([...i.classList].filter(Boolean)), c = [...l].filter((h) => !s.has(h) && !o.has(h)), m = r.querySelector(WF_INPUT_VISUAL_SELECTOR), g = i.querySelector(WF_INPUT_VISUAL_SELECTOR), u = [];
    if (m && g) {
      let h = new Set([...m.classList].filter(Boolean)), y = new Set([...g.classList].filter(Boolean));
      u = [...h].filter((b) => !y.has(b) && !o.has(b));
    }
    return {
      labelClasses: c,
      innerDivClasses: u,
      activeLabel: r
    };
  }
  function applyActiveLabelClasses(e, t) {
    let n = activeLabelClassCache.get(e);
    if (!n) return;
    let { labelClasses: r, innerDivClasses: i } = n;
    if (!(r.length === 0 && i.length === 0) && (e.querySelectorAll("label").forEach((o) => {
      if (o === t) return;
      r.forEach((s) => o.classList.remove(s));
      let l = o.querySelector(WF_INPUT_VISUAL_SELECTOR);
      l && i.forEach((s) => l.classList.remove(s));
    }), t)) {
      r.forEach((l) => t.classList.add(l));
      let o = t.querySelector(WF_INPUT_VISUAL_SELECTOR);
      o && i.forEach((l) => o.classList.add(l));
    }
  }
  function getFieldOrFacet(e) {
    return e.getAttribute("wf-algolia-field") || e.getAttribute("wf-algolia-facet") || null;
  }
  function setActiveDataAttr(e, t) {
    t ? e.setAttribute("data-wf-algolia-active", "true") : e.removeAttribute("data-wf-algolia-active");
  }
  function syncGroupActiveClasses(e) {
    let t = e.getAttribute("wf-algolia-activeclass") || "is-active";
    e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((n) => {
      let r = isItemChecked(n);
      setActiveDataAttr(n, r);
      let i = n instanceof HTMLInputElement ? n.closest("label") : null;
      r ? (n.classList.add(t), i && i.classList.add(t)) : (n.classList.remove(t), i && i.classList.remove(t));
    });
  }
  function isItemChecked(e) {
    let t = e.querySelector('input[type="radio"]');
    if (t) return t.checked;
    let n = e.querySelector('input[type="checkbox"]');
    return n ? n.checked : e.getAttribute("data-wf-algolia-active") === "true";
  }
  function toggleDivItemActive(e, t, n, r) {
    if (!!t.querySelector("input")) return;
    if (r) {
      let l = t.getAttribute("data-wf-algolia-active") === "true";
      e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((s) => s.removeAttribute("data-wf-algolia-active")), l || t.setAttribute("data-wf-algolia-active", "true");
      return;
    }
    if (n === "radio") {
      e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((l) => l.removeAttribute("data-wf-algolia-active")), t.setAttribute("data-wf-algolia-active", "true");
      return;
    }
    t.getAttribute("data-wf-algolia-active") === "true" ? t.removeAttribute("data-wf-algolia-active") : t.setAttribute("data-wf-algolia-active", "true");
  }
  var warnedCascadeApplyMode = /* @__PURE__ */ new WeakSet();
  function enforceDeferredCascade() {
    document.querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-refines]').forEach((e) => {
      let t = e.getAttribute("wf-algolia-refines");
      if (!t) return;
      let n = document.querySelector(
        `[wf-algolia-element="filter-group"][wf-algolia-group-id="${t}"]`
      );
      if (!n) return;
      let r = n.getAttribute("wf-algolia-apply-mode") ?? "immediate", i = e.getAttribute("wf-algolia-apply-mode") ?? "immediate";
      if (r === "deferred" && i === "immediate") {
        if (!warnedCascadeApplyMode.has(e)) {
          warnedCascadeApplyMode.add(e);
          let o = n.getAttribute("wf-algolia-field") ?? "<unknown>", l = e.getAttribute("wf-algolia-field") ?? "<unknown>";
          console.warn(
            `[wf-algolia] Cascade "${o}" \u2192 "${l}" has deferred parent + immediate child. Forcing child to deferred to avoid querying against an uncommitted parent. See spec docs/specs/active/2026-05-20-deferred-apply-filter-design.md \xA711 (E2).`
          );
        }
        e.setAttribute("wf-algolia-apply-mode", "deferred");
      }
    });
  }
  function initFilterGroups(e) {
    enforceDeferredCascade();
    let t = [...document.querySelectorAll('[wf-algolia-element="filter-group"]')];
    t.forEach((n) => {
      let r = getFieldOrFacet(n), i = n.getAttribute("wf-algolia-group-id");
      r && i && registerGroup(i, r, n);
    }), t.forEach((n) => {
      let r = n.getAttribute("wf-algolia-refines");
      if (!r) return;
      let i = getFieldOrFacet(n);
      if (!i) return;
      let o = getGroupField(r), l = parseWhenParentEmpty(n);
      if (!o) {
        console.warn(
          `[wf-algolia] filter-group refines '${r}' but no parent group with that id was found; falling back to independent facet.`
        ), emit(
          "error",
          new Error(`wf-algolia: unknown refines target '${r}'`)
        );
        return;
      }
      let s = getChildLink(r), c = s ? s.depth + 1 : 1;
      if (c > MAX_DEPTH) {
        console.warn(
          `[wf-algolia] Hierarchy chain depth exceeds MAX_DEPTH=${MAX_DEPTH}; skipping group '${n.getAttribute("wf-algolia-group-id") || i}' (falls back to independent facet).`
        ), emit("error", new Error(`wf-algolia: chain depth > ${MAX_DEPTH}`));
        return;
      }
      applyParentEmptyBehavior(n, l), registerChildLink({
        groupId: n.getAttribute("wf-algolia-group-id") || `__child:${i}`,
        parentGroupId: r,
        childEl: n,
        childField: i,
        parentField: o,
        whenParentEmpty: l,
        depth: c
      });
    }), t.forEach((n) => {
      let r = n.getAttribute("wf-algolia-group-id");
      if (!r || !isParentGroup(r)) return;
      let i = n.getAttribute("wf-algolia-type") || "checkbox";
      i !== "radio" && (console.warn(
        `[wf-algolia] Non-leaf filter-group '${r}' has type='${i}'; hierarchical scoping requires radio. Coercing.`
      ), emit(
        "error",
        new Error(`wf-algolia: non-leaf '${r}' coerced to radio`)
      ), n.setAttribute("wf-algolia-type", "radio"));
    }), t.forEach((n) => {
      let r = getFieldOrFacet(n);
      if (!r || n.getAttribute("wf-algolia-type") === "select" || n.querySelector('[wf-algolia-element="range-min"]') || n.querySelector('[wf-algolia-element="range-max"]'))
        return;
      let i = n.getAttribute("wf-algolia-type") || (n.getAttribute("wf-algolia-match") === "numeric-min" ? "radio" : "checkbox"), o = n.getAttribute("wf-algolia-match") || "or", l = i === "radio" && o === "numeric-min", s = n.getAttribute("wf-algolia-apply-mode"), c = s === "deferred";
      s !== null && s !== "deferred" && s !== "immediate" && console.warn(
        `[wf-algolia] Unknown wf-algolia-apply-mode='${s}' on filter-group; falling back to immediate. Valid values: 'immediate' (default) | 'deferred'.`
      );
      let m = (w) => {
        let E = w.target;
        if (!E) return;
        let T = n.getAttribute("wf-algolia-click");
        if (T === "noop" || T === "navigate" || E.closest('[wf-algolia-element="hit-preview"]'))
          return;
        let k = E.closest('[wf-algolia-element="filter-item"]');
        if (!k || !n.contains(k)) return;
        let D = k.getAttribute("wf-algolia-value") ?? (k instanceof HTMLInputElement ? k.value : null);
        D == null || D === "" || (toggleDivItemActive(n, k, i, l), window.setTimeout(() => {
          if (c) {
            let C = isItemChecked(k);
            if (l) {
              if (C) {
                let ye = {
                  type: "number",
                  match: "or",
                  min: parseFloat(D)
                };
                stageFilter(r, ye);
              } else delete STAGING_STATE[r];
            } else
              i === "radio" && C && delete STAGING_STATE[r], toggleStateValue(STAGING_STATE, r, D, C, o, "checkbox");
            k.setAttribute("data-wf-algolia-staged", "true"), renderSelectedValues(), renderSelectedCounts();
            let ee = n.getAttribute("wf-algolia-group-id");
            ee && isParentGroup(ee) && emit("filter:parent-stage-change", {
              field: r
            }), closeDropdownOnPick(k);
            return;
          }
          if (l)
            isItemChecked(k) ? FILTER_STATE[r] = {
              type: "number",
              match: "or",
              min: parseFloat(D)
            } : delete FILTER_STATE[r];
          else {
            let C = isItemChecked(k);
            i === "radio" && C && delete FILTER_STATE[r], toggleStateValue(FILTER_STATE, r, D, C, o, "checkbox");
          }
          syncGroupActiveClasses(n);
          let K = n.getAttribute("wf-algolia-group-id");
          if (K && isParentGroup(K)) {
            let C = FILTER_STATE[r]?.values ?? /* @__PURE__ */ new Set();
            emit("filter:parent-change", {
              parentGroupId: K,
              parentField: r,
              newValue: C.size > 0 ? Array.from(C)[0] ?? "" : "",
              selectedValues: Array.from(C)
            });
          }
          closeDropdownOnPick(k), e();
        }, 0));
      };
      n.addEventListener("click", m), n.addEventListener("keydown", (w) => {
        if (w.key !== "Enter" && w.key !== " ") return;
        let E = w.target;
        if (!E) return;
        let T = E.closest('[wf-algolia-element="filter-item"]');
        !T || !n.contains(T) || T.querySelector("input") || (w.preventDefault(), T.click());
      });
      let g = n.querySelector("form");
      g && g.addEventListener("submit", (w) => w.preventDefault());
      let u = n.closest('[wf-algolia-element="browse"]')?.querySelector(`[wf-algolia-reset="${r}"]`);
      u && u.addEventListener("click", () => {
        delete FILTER_STATE[r], n.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((E) => {
          E !== u && (E.checked = false, syncWebflowInputVisual(E, false), E.dispatchEvent(
            new Event("change", {
              bubbles: true
            })
          ));
        }), u instanceof HTMLInputElement && u.type === "radio" && (u.checked = true, syncWebflowInputVisual(u, true), u.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        )), n.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((E) => {
          E.removeAttribute("data-wf-algolia-active");
        });
        let w = u instanceof HTMLInputElement ? u.closest("label") : null;
        applyActiveLabelClasses(n, w), syncGroupActiveClasses(n), e();
      });
      let h = detectActiveLabelClasses(n, r);
      h && activeLabelClassCache.set(n, {
        labelClasses: h.labelClasses,
        innerDivClasses: h.innerDivClasses
      });
      let b = FILTER_STATE[r]?.values;
      if (b && b.size > 0) {
        let w = null;
        n.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((E) => {
          let T = E.getAttribute("wf-algolia-value") ?? (E instanceof HTMLInputElement ? E.value : null);
          if (T == null || T === "") return;
          let k = b.has(T), D = E instanceof HTMLInputElement ? E : E.querySelector(
            'input[type="radio"], input[type="checkbox"]'
          );
          D && (D.checked = k, syncWebflowInputVisual(D, k), D.dispatchEvent(
            new Event("change", {
              bubbles: true
            })
          ), k && (w = D.closest("label"))), k && E.setAttribute("data-wf-algolia-active", "true");
        }), i === "radio" && u instanceof HTMLInputElement && u.type === "radio" && (u.checked = false, syncWebflowInputVisual(u, false), u.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        )), applyActiveLabelClasses(n, w), syncGroupActiveClasses(n), window.setTimeout(() => {
          let E = FILTER_STATE[r]?.values;
          if (!E || E.size === 0) return;
          let T = null;
          n.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((k) => {
            let D = k.getAttribute("wf-algolia-value") ?? (k instanceof HTMLInputElement ? k.value : null);
            if (D == null || D === "") return;
            let K = E.has(D), C = k instanceof HTMLInputElement ? k : k.querySelector(
              'input[type="radio"], input[type="checkbox"]'
            );
            C && (C.checked = K, syncWebflowInputVisual(C, K), K && (T = C.closest("label")));
          }), i === "radio" && u instanceof HTMLInputElement && u.type === "radio" && (u.checked = false, syncWebflowInputVisual(u, false)), applyActiveLabelClasses(n, T), syncGroupActiveClasses(n);
        }, 0);
      }
    });
  }
  var showMoreReapplyFns = /* @__PURE__ */ new WeakMap();
  function initShowMore() {
    document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((e) => {
      let t = parseInt(e.getAttribute("wf-algolia-limit") || "0");
      if (t <= 0) return;
      let n = e.getAttribute("wf-algolia-hideclass") || "is-hidden", r = e.querySelector('[wf-algolia-element="filter-show-more"]'), i = e.getAttribute("wf-algolia-text-more"), o = e.getAttribute("wf-algolia-text-less"), l = r?.textContent ?? "", s = i ?? l, c = o ?? "Show less", m = false, g = () => {
        let u = e.querySelectorAll('[wf-algolia-element="filter-item"]'), h = 0;
        u.forEach((y) => {
          let b = y.closest('[role="listitem"]') || y;
          m || h < t ? (b.classList.remove(n), h += 1) : b.classList.add(n);
        }), r && (r.textContent = m ? c : s);
      };
      r && r.addEventListener("click", () => {
        m = !m, g();
      }), showMoreReapplyFns.set(e, g), g();
    });
  }
  function reapplyShowMore(e) {
    let t = showMoreReapplyFns.get(e);
    t && t();
  }
  function interpolate(e, t) {
    return e.replace(/\{(\w+)\}/g, (n, r) => {
      let i = t[r];
      return i == null ? "" : String(i);
    });
  }
  var textTemplateCache = /* @__PURE__ */ new WeakMap();
  function getTextTemplate(e, t) {
    let n = textTemplateCache.get(e);
    if (n === void 0) {
      let r = e.getAttribute("wf-algolia-text-template");
      if (r !== null) n = r;
      else {
        let i = (e.textContent ?? "").trim();
        n = i.includes("{") && i.includes("}") ? i : t;
      }
      textTemplateCache.set(e, n);
    }
    return n;
  }
  var originalTextCache = /* @__PURE__ */ new WeakMap();
  function getOriginalText(e) {
    let t = originalTextCache.get(e);
    return t === void 0 && (t = (e.textContent ?? "").trim(), originalTextCache.set(e, t)), t;
  }
  function syncFilterDOM(e = FILTER_STATE) {
    document.querySelectorAll("[data-wf-algolia-staged]").forEach((t) => {
      t.removeAttribute("data-wf-algolia-staged");
    }), document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((t) => {
      let n = t.getAttribute("wf-algolia-field") || t.getAttribute("wf-algolia-facet") || "", r = t.getAttribute("wf-algolia-activeclass") || "is-active";
      if (synthesizeMissingSelected(t, n, e), t.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((l) => {
        let s = l.getAttribute("wf-algolia-value") || "", m = e[n]?.values?.has(s) ?? false;
        (l instanceof HTMLInputElement ? [l] : [
          ...l.querySelectorAll(
            'input[type="checkbox"], input[type="radio"]'
          )
        ]).forEach((y) => {
          y.checked = m;
        }), m ? l.setAttribute("data-wf-algolia-active", "true") : l.removeAttribute("data-wf-algolia-active");
        let u = l instanceof HTMLInputElement ? l.closest("label") : null;
        m ? (l.classList.add(r), u && u.classList.add(r)) : (l.classList.remove(r), u && u.classList.remove(r)), t.getAttribute("wf-algolia-type") === "radio" ? l.setAttribute("aria-selected", String(m)) : l.setAttribute("aria-pressed", String(m));
      }), !e[n]) {
        let l = t.querySelector('[wf-algolia-element="range-min"]'), s = t.querySelector('[wf-algolia-element="range-max"]');
        l && (l.value = l.min), s && (s.value = s.max);
        let c = t.querySelector('[wf-algolia-element="range-display"]');
        c && l && s && (c.textContent = `${l.min} \u2013 ${s.max}`);
      }
      t.querySelectorAll(
        'input[type="checkbox"], input[type="radio"]'
      ).forEach((l) => {
        syncWebflowInputVisual(l, l.checked);
      });
      let i = null, o = t.querySelector(
        '[wf-algolia-element="filter-item"] input:checked, input[wf-algolia-element="filter-item"]:checked'
      );
      if (o) i = o.closest("label");
      else {
        let s = t.closest('[wf-algolia-element="browse"]')?.querySelector(`[wf-algolia-reset="${n}"]`);
        s instanceof HTMLInputElement && s.type === "radio" && (s.checked = true, syncWebflowInputVisual(s, true), i = s.closest("label"));
      }
      applyActiveLabelClasses(t, i), sortFilterItems(t, n, e), reapplyShowMore(t);
    }), renderSelectedCounts(e), renderSelectedValues(e);
  }
  function synthesizeMissingSelected(e, t, n) {
    if (e.getAttribute("wf-algolia-show-selected-missing") !== "true" || !t)
      return;
    let r = n[t]?.values;
    if (e.querySelectorAll('[data-wf-algolia-synthesized="true"]').forEach((g) => {
      let u = g.getAttribute("wf-algolia-value") || "";
      (!r || !r.has(u)) && g.remove();
    }), !r || r.size === 0)
      return;
    let i = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')], o = new Set(i.map((g) => g.getAttribute("wf-algolia-value") || "")), l = [...r].filter((g) => !o.has(g));
    if (l.length === 0) return;
    let s = e.querySelector('[wf-algolia-element="filter-template"]') || i[0] || null;
    if (!s) return;
    let c = i[0]?.parentElement ?? s.parentElement ?? e, m = c.firstChild;
    for (let g of l) {
      let u = s.cloneNode(true);
      u.removeAttribute("wf-algolia-element"), u.setAttribute("wf-algolia-element", "filter-item"), u.setAttribute("wf-algolia-value", g), u.setAttribute("data-wf-algolia-synthesized", "true"), u.style.display === "none" && (u.style.display = ""), u.querySelectorAll("*").forEach((b) => {
        b.style.display === "none" && (b.style.display = "");
      });
      let h = u.querySelector('[wf-algolia-element="filter-value-text"]') || u.querySelector(".wf-fi-name");
      h && (h.textContent = g);
      let y = u.querySelector('[wf-algolia-element="filter-count"]');
      y && (y.textContent = ""), u.querySelector("input") || (u.setAttribute("role", "button"), u.setAttribute("tabindex", "0")), c.insertBefore(u, m);
    }
  }
  function sortFilterItems(e, t, n) {
    let r = e.getAttribute("wf-algolia-sort");
    if (!r || r === "natural" || r !== "selected-first" && r !== "alpha" && r !== "count")
      return;
    let i = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')];
    if (i.length < 2) return;
    let o = i[0].parentElement;
    if (!o) return;
    for (let g of i) if (g.parentElement !== o) return;
    let l = (g) => g.getAttribute("wf-algolia-value") || "", s = (g) => n[t]?.values?.has(l(g)) ?? false, c = (g) => {
      let u = g.querySelector('[wf-algolia-element="filter-count"]'), h = parseInt((u?.textContent ?? "0").trim(), 10);
      return Number.isFinite(h) ? h : 0;
    }, m;
    if (r === "selected-first") {
      let g = [], u = [];
      for (let h of i) (s(h) ? g : u).push(h);
      m = [...g, ...u];
    } else
      r === "alpha" ? m = [...i].sort(
        (g, u) => l(g).localeCompare(l(u), void 0, {
          sensitivity: "base"
        })
      ) : m = [...i].sort((g, u) => c(u) - c(g));
    for (let g of m) o.appendChild(g);
  }
  var warnedCountNoField = /* @__PURE__ */ new WeakSet();
  function resolveCountField(e) {
    let t = e.getAttribute("wf-algolia-field");
    if (t) return t;
    let n = e.closest('[wf-algolia-element="filter-group"]');
    if (n) {
      let r = n.getAttribute("wf-algolia-field") || n.getAttribute("wf-algolia-facet");
      if (r) return r;
    }
    return null;
  }
  var warnedCountNoSlot = /* @__PURE__ */ new WeakSet();
  function renderSelectedCounts(e = getEffectiveState()) {
    document.querySelectorAll('[wf-algolia-element="filter-selected-count"]').forEach((t) => {
      let n = resolveCountField(t);
      if (!n) {
        warnedCountNoField.has(t) || (warnedCountNoField.add(t), console.warn(
          '[wf-algolia] filter-selected-count cannot resolve its field. Place the badge inside a `wf-algolia-element="filter-group"` wrapper (Model A \u2014 inherits its `wf-algolia-field`), or set `wf-algolia-field="<facet>"` on the badge itself (Model B \u2014 explicit cross-scope pointer).',
          t
        ));
        return;
      }
      let r = e[n]?.values, i = r?.size ?? 0, o = i > 0 ? [...r].join(", ") : "", l = {
        count: i,
        value: o
      }, s = t.querySelectorAll('[wf-algolia-element="filter-count-text"]');
      if (s.length > 0)
        s.forEach((g) => {
          let u = getTextTemplate(g, "{count}");
          g.textContent = interpolate(u, l);
        });
      else if (t.children.length === 0) {
        let g = getTextTemplate(t, "{count}");
        t.textContent = interpolate(g, l);
      } else
        warnedCountNoSlot.has(t) || (warnedCountNoSlot.add(t), console.warn(
          '[wf-algolia] filter-selected-count outer has inner elements but no `wf-algolia-element="filter-count-text"` descendant. Add the role to the inner text element so the count can be rendered without overwriting your Pill DOM.',
          t
        ));
      let c = t.getAttribute("wf-algolia-hide-empty") === "true";
      c && i === 0 ? t.style.display = "none" : c && t.style.removeProperty("display");
      let m = t.getAttribute("wf-algolia-zeroclass");
      if (m) {
        let g = m.split(/\s+/).filter(Boolean);
        g.length > 0 && (i === 0 ? t.classList.add(...g) : t.classList.remove(...g));
      }
    });
  }
  var warnedValueNoField = /* @__PURE__ */ new WeakSet();
  var warnedValueNoSlot = /* @__PURE__ */ new WeakSet();
  function resolveValueField(e) {
    let t = e.getAttribute("wf-algolia-field");
    if (t) return t;
    let n = e.closest('[wf-algolia-element="filter-group"]');
    if (n) {
      let r = n.getAttribute("wf-algolia-field") || n.getAttribute("wf-algolia-facet");
      if (r) return r;
    }
    return null;
  }
  function renderValueSlot(e, t) {
    let n = getOriginalText(e);
    if (t.count === 0) {
      e.textContent = n;
      return;
    }
    let r = getTextTemplate(e, "{value}");
    e.textContent = interpolate(r, t);
  }
  function renderSelectedValues(e = getEffectiveState()) {
    document.querySelectorAll('[wf-algolia-element="filter-selected-value"]').forEach((t) => {
      let n = resolveValueField(t);
      if (!n) {
        warnedValueNoField.has(t) || (warnedValueNoField.add(t), console.warn(
          '[wf-algolia] filter-selected-value cannot resolve its field. Place the slot inside a `wf-algolia-element="filter-group"` wrapper (Model A \u2014 inherits its `wf-algolia-field`), or set `wf-algolia-field="<facet>"` on the slot itself (Model B \u2014 explicit cross-scope pointer).',
          t
        ));
        return;
      }
      let r = e[n]?.values, i = r?.size ?? 0, l = {
        value: i > 0 ? [...r].join(", ") : "",
        count: i
      }, s = t.querySelectorAll(
        '[wf-algolia-element="filter-value-text-target"]'
      );
      s.length > 0 ? s.forEach((m) => renderValueSlot(m, l)) : t.children.length === 0 ? renderValueSlot(t, l) : warnedValueNoSlot.has(t) || (warnedValueNoSlot.add(t), console.warn(
        '[wf-algolia] filter-selected-value outer has inner elements but no `wf-algolia-element="filter-value-text-target"` descendant. Add the role to the inner text element so the selected value can be rendered without overwriting your toggle DOM.',
        t
      ));
      let c = t.getAttribute("wf-algolia-hide-empty") === "true";
      c && i === 0 ? t.style.display = "none" : c && t.style.removeProperty("display");
    });
  }
  function clearAllFilters(e) {
    clearState(FILTER_STATE), discardStaging(), document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((t) => {
      let n = t.querySelector('[wf-algolia-element="range-min"]'), r = t.querySelector('[wf-algolia-element="range-max"]');
      if (!n || !r) return;
      let i = n.getAttribute("min") ?? n.min ?? "0", o = r.getAttribute("max") ?? r.max ?? "100";
      n.value !== i && (n.value = i, n.dispatchEvent(
        new Event("input", {
          bubbles: true
        })
      )), r.value !== o && (r.value = o, r.dispatchEvent(
        new Event("input", {
          bubbles: true
        })
      ));
    }), syncFilterDOM(), getAllChildLinks().forEach((t) => {
      applyParentEmptyBehavior(t.childEl, t.whenParentEmpty), t.childEl.querySelectorAll(".wf-algolia-injected").forEach((n) => n.remove());
    }), emit("filter", FILTER_STATE), e();
  }
  function clearFilter(e, t) {
    delete FILTER_STATE[e], syncFilterDOM(), emit("filter", FILTER_STATE), t();
  }
  function setFilter(e, t, n) {
    FILTER_STATE[e] = {
      type: "checkbox",
      match: "or",
      values: new Set(t)
    }, syncFilterDOM(), emit("filter", FILTER_STATE), n();
  }
  function commitStagingAndSync(e) {
    commitStaging(e), renderSelectedValues(), renderSelectedCounts();
  }
  function discardStagingAndSync(e) {
    discardStaging(e), renderSelectedValues(), renderSelectedCounts();
  }
  function setQuery(e, t) {
    let n = document.querySelector('[wf-algolia-element="browse-search"]') || document.querySelector('[wf-algolia-element="search-input"]');
    n && (n.value = e), emit("search", e), t();
  }
  var insightsReady = false;
  var indexNameResolver = null;
  function setIndexNameResolver(e) {
    indexNameResolver = e;
  }
  function hasEventAttrAncestor(e) {
    let t = e instanceof Element ? e : e?.parentElement;
    return t ? !!t.closest("[wf-algolia-event], [wf-algolia-conversion]") : false;
  }
  function initInsights(e) {
    insights("init", {
      appId: e.appId,
      apiKey: e.searchKey,
      useCookie: e.insightsCookie
    }), insightsReady = true, window.aa = insights, document.addEventListener("click", (t) => {
      let n = t.target.closest(".wf-algolia-injected");
      if (!n || hasEventAttrAncestor(t.target)) return;
      let r = n.dataset.wfAlgoliaHitObjectid, i = n.dataset.wfAlgoliaHitIndex, o = n.dataset.wfAlgoliaHitQueryid, l = parseInt(n.dataset.wfAlgoliaHitPosition || "0");
      !r || !i || trackClick({
        index: i,
        objectIDs: [r],
        queryID: o || void 0,
        positions: l > 0 ? [l] : void 0
      });
    }), document.addEventListener("click", (t) => {
      let n = t.target;
      if (n.closest('[wf-algolia-element="hit-preview"]')) return;
      let r = n.closest('[wf-algolia-element="filter-item"]');
      if (!r) return;
      let i = r.closest('[wf-algolia-element="filter-group"]');
      if (!i) return;
      let o = i.getAttribute("wf-algolia-field") || i.getAttribute("wf-algolia-facet"), l = r.getAttribute("wf-algolia-value"), s = i.closest("[wf-algolia-index]")?.getAttribute("wf-algolia-index") || indexNameResolver?.() || "";
      o && l && s && insights("clickedFilters", {
        index: s,
        filters: [`${o}:${l}`],
        eventName: "Filter Clicked"
      });
    }), document.addEventListener("click", (t) => {
      let n = t.target.closest("[wf-algolia-event]");
      if (!n) return;
      let r = n.getAttribute("wf-algolia-event"), i = n.getAttribute("wf-algolia-event-name"), o = n.closest(".wf-algolia-injected") || n, l = o.dataset?.wfAlgoliaHitObjectid, s = o.dataset?.wfAlgoliaHitIndex, c = o.dataset?.wfAlgoliaHitQueryid;
      if (!(!l || !s))
        switch (r) {
          case "click":
            trackClick({
              index: s,
              objectIDs: [l],
              queryID: c || void 0,
              eventName: i || void 0
            });
            break;
          case "conversion":
            trackConversion({
              index: s,
              objectIDs: [l],
              queryID: c || void 0,
              eventName: i || "Converted"
            });
            break;
          case "view":
            trackView(s, [l]);
            break;
        }
    }), document.addEventListener("click", (t) => {
      let n = t.target.closest("[wf-algolia-conversion]");
      if (!n) return;
      let r = n.getAttribute("wf-algolia-conversion"), i = n.closest(".wf-algolia-injected") || n, o = i.dataset?.wfAlgoliaHitObjectid, l = i.dataset?.wfAlgoliaHitIndex, s = i.dataset?.wfAlgoliaHitQueryid;
      o && l && trackConversion({
        index: l,
        objectIDs: [o],
        eventName: r,
        queryID: s || void 0
      });
    });
  }
  var VIEW_CHUNK_SIZE = 20;
  var MAX_EVENT_NAME_LEN = 64;
  function chunkArray(e, t) {
    let n = [];
    for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
    return n;
  }
  function validObjectIDs(e) {
    return e.filter((t) => typeof t == "string" && t.length > 0);
  }
  function truncateEventName(e) {
    return e.length > MAX_EVENT_NAME_LEN ? e.slice(0, MAX_EVENT_NAME_LEN) : e;
  }
  function trackView(e, t) {
    if (!insightsReady) return;
    let n = validObjectIDs(t);
    if (n.length !== 0)
      for (let r of chunkArray(n, VIEW_CHUNK_SIZE))
        insights("viewedObjectIDs", {
          index: e,
          objectIDs: r,
          eventName: "Hits Viewed"
        });
  }
  function trackClick(e) {
    if (!insightsReady) return;
    let t = validObjectIDs(e.objectIDs);
    if (t.length === 0) return;
    let n = truncateEventName(e.eventName || "Hit Clicked");
    e.queryID ? insights("clickedObjectIDsAfterSearch", {
      index: e.index,
      objectIDs: t,
      queryID: e.queryID,
      positions: e.positions || [1],
      eventName: n
    }) : insights("clickedObjectIDs", {
      index: e.index,
      objectIDs: t,
      eventName: n
    });
  }
  function trackConversion(e) {
    if (!insightsReady) return;
    let t = validObjectIDs(e.objectIDs);
    if (t.length === 0) return;
    let n = truncateEventName(e.eventName || "Hit Converted");
    e.queryID ? insights("convertedObjectIDsAfterSearch", {
      index: e.index,
      objectIDs: t,
      queryID: e.queryID,
      eventName: n
    }) : insights("convertedObjectIDs", {
      index: e.index,
      objectIDs: t,
      eventName: n
    });
  }
  function isInsightsReady() {
    return insightsReady;
  }
  var warnedDisplayBlock = /* @__PURE__ */ new WeakSet();
  function showElement(e, t) {
    if (!e) return;
    let n = e.getAttribute("wf-algolia-display");
    if (n) {
      e.style.display = n;
      return;
    }
    if (t !== void 0) {
      e.style.display = t;
      return;
    }
    warnedDisplayBlock.has(e) || (warnedDisplayBlock.add(e), console.warn(
      '[wf-algolia] showing element with display:block. If your Webflow layout uses flex/grid, add wf-algolia-display="flex" (or grid/inline-flex/etc.). See https://wf-algolia-docs.candidleap.com/attribute-reference#wf-algolia-display',
      e
    )), e.style.display = "block";
  }
  function hideElement(e) {
    e && (e.style.display = "none");
  }
  function sanitizeUrl(e) {
    let t = e.trim(), n = t.toLowerCase();
    return n.startsWith("javascript:") || n.startsWith("data:") || n.startsWith("vbscript:") ? (console.warn("[wf-algolia] Blocked unsafe URL:", t), "#") : t;
  }
  var ALLOWED_TAGS = {
    em: /* @__PURE__ */ new Set(),
    mark: /* @__PURE__ */ new Set(),
    strong: /* @__PURE__ */ new Set(),
    b: /* @__PURE__ */ new Set(),
    i: /* @__PURE__ */ new Set(),
    u: /* @__PURE__ */ new Set(),
    p: /* @__PURE__ */ new Set(),
    br: /* @__PURE__ */ new Set(),
    ul: /* @__PURE__ */ new Set(),
    ol: /* @__PURE__ */ new Set(),
    li: /* @__PURE__ */ new Set(),
    h1: /* @__PURE__ */ new Set(),
    h2: /* @__PURE__ */ new Set(),
    h3: /* @__PURE__ */ new Set(),
    h4: /* @__PURE__ */ new Set(),
    blockquote: /* @__PURE__ */ new Set(),
    code: /* @__PURE__ */ new Set(),
    pre: /* @__PURE__ */ new Set(),
    a: /* @__PURE__ */ new Set(["href", "title", "target", "rel"]),
    img: /* @__PURE__ */ new Set(["src", "alt", "title", "width", "height"])
  };
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;
  function sanitizeHtml(e) {
    let t = new DOMParser().parseFromString(e, "text/html");
    return sanitizeNode(t.head), sanitizeNode(t.body), t.head.innerHTML + t.body.innerHTML;
  }
  function sanitizeNode(e) {
    let t = Array.from(e.childNodes);
    for (let n of t)
      if (n.nodeType === ELEMENT_NODE) {
        let r = n, i = r.tagName.toLowerCase();
        if (!(i in ALLOWED_TAGS)) {
          sanitizeNode(r);
          let l = r.parentNode;
          if (l) {
            for (; r.firstChild; ) l.insertBefore(r.firstChild, r);
            l.removeChild(r);
          }
          continue;
        }
        let o = ALLOWED_TAGS[i] ?? /* @__PURE__ */ new Set();
        for (let l of Array.from(r.attributes))
          o.has(l.name.toLowerCase()) || r.removeAttribute(l.name);
        i === "a" && r.hasAttribute("href") && r.setAttribute("href", sanitizeUrl(r.getAttribute("href") ?? "")), i === "img" && r.hasAttribute("src") && r.setAttribute("src", sanitizeUrl(r.getAttribute("src") ?? "")), sanitizeNode(r);
      } else n.nodeType !== TEXT_NODE && n.parentNode?.removeChild(n);
  }
  function escapeFilterValue(e) {
    return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }
  function getPath(e, t) {
    return t.split(".").reduce((n, r) => n?.[r], e);
  }
  function slugify(e, t = "-") {
    return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/ /g, t);
  }
  function restartIx2() {
    try {
      restartWebflow(["ix2"]);
    } catch (e) {
      console.warn("[wf-algolia] Could not restart Webflow interactions:", e);
    }
  }
  var COMPARATORS = ["!==", "===", ">=", "<=", ">", "<"];
  function evalCondition(e, t) {
    let n = COMPARATORS.find((g) => e.includes(g));
    if (!n) return !!getPath(t, e.trim());
    let [r, i] = e.split(n).map((g) => g.trim());
    if (r === void 0 || i === void 0) return false;
    let o = getPath(t, r), l = i.replace(/^["']|["']$/g, ""), s = parseFloat(o), c = parseFloat(l), m = !isNaN(s) && !isNaN(c);
    switch (n) {
      case "===":
        return String(o) === l;
      case "!==":
        return String(o) !== l;
      case ">":
        return m && s > c;
      case ">=":
        return m && s >= c;
      case "<":
        return m && s < c;
      case "<=":
        return m && s <= c;
      default:
        return false;
    }
  }
  function formatValue(e, t) {
    if (e == null || e === "") return "";
    switch (t) {
      case "rating": {
        let n = parseFloat(e);
        return isNaN(n) ? "" : `\u2605 ${n.toFixed(1)}`;
      }
      case "year": {
        let n = String(e);
        if (/^\d{4}$/.test(n)) return n;
        let r = new Date(n);
        return isNaN(r.getTime()) ? "" : String(r.getFullYear());
      }
      case "currency": {
        let n = parseFloat(e);
        return isNaN(n) ? "" : `$${n.toFixed(2)}`;
      }
      case "number": {
        let n = parseFloat(e);
        return isNaN(n) ? "" : n.toLocaleString();
      }
      default:
        return String(e);
    }
  }
  function applySlugifyAttr(e, t) {
    return e.getAttribute("wf-algolia-slugify") === "true" ? slugify(t) : t;
  }
  var warnedEmptyAlt = /* @__PURE__ */ new WeakSet();
  function populateCard(e, t, n) {
    let r = n?.highlightTag || "mark", i = `<${r}>`, o = `</${r}>`;
    e.querySelectorAll("[wf-algolia-text]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-text"), c = l.getAttribute("wf-algolia-format"), m = l.getAttribute("wf-algolia-highlight") === "true", g = s.split("|").map((y) => y.trim()), u, h = g[0];
        for (let y of g) {
          let b = getPath(t, y);
          if (b != null && b !== "") {
            u = b, h = y;
            break;
          }
        }
        if (c) {
          let y = formatValue(u, c);
          l.textContent = y, l.style.display = y ? "" : "none";
        } else if (m && h !== void 0 && t._highlightResult?.[h]?.value) {
          let y = sanitizeHtml(t._highlightResult[h].value).replace(/<em>/g, i).replace(/<\/em>/g, o);
          l.innerHTML = y;
        } else l.textContent = u ?? "";
      } catch (s) {
        console.warn("[wf-algolia] populateCard text error:", s);
      }
    }), e.querySelectorAll("[wf-algolia-html]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-html"), c = getPath(t, s);
        l.innerHTML = c ? sanitizeHtml(c) : "";
      } catch (s) {
        console.warn("[wf-algolia] populateCard html error:", s);
      }
    }), e.querySelectorAll("[wf-algolia-snippet]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-snippet"), c = t._snippetResult?.[s]?.value;
        if (c) {
          let m = sanitizeHtml(c).replace(/<em>/g, i).replace(/<\/em>/g, o);
          l.innerHTML = m;
        } else {
          let m = getPath(t, s);
          l.textContent = m ?? "";
        }
      } catch (s) {
        console.warn("[wf-algolia] populateCard snippet error:", s);
      }
    }), e.querySelectorAll("[wf-algolia-image]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-image").split("|"), c = "";
        for (let u of s) {
          let h = getPath(t, u.trim());
          if (h) {
            c = h;
            break;
          }
        }
        l.removeAttribute("data-src"), l.removeAttribute("data-srcset"), l.removeAttribute("srcset"), l.src = c || "";
        let m = l.getAttribute("wf-algolia-alt"), g = "";
        if (m !== null) {
          if (m === "") g = "";
          else {
            let u = m.split("|").map((h) => h.trim());
            for (let h of u) {
              let y = getPath(t, h);
              if (y) {
                g = String(y);
                break;
              }
            }
          }
        } else
          g = t.name || t.title || "", !g && !warnedEmptyAlt.has(l) && (warnedEmptyAlt.add(l), console.warn(
            '[wf-algolia] image has empty alt and no wf-algolia-alt attribute. Add wf-algolia-alt="fieldName" (e.g. imageAlt|name|title), or wf-algolia-alt="" to mark as decorative. See https://wf-algolia-docs.candidleap.com/attribute-reference#wf-algolia-alt',
            l
          ));
        l.alt = g, l.loading = "lazy";
      } catch (s) {
        console.warn("[wf-algolia] populateCard image error:", s);
      }
    }), e.querySelectorAll("[wf-algolia-link], [wf-algolia-link-url]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-link-url");
        if (s) {
          let h = getPath(t, s);
          l.href = sanitizeUrl(h || "#");
          return;
        }
        let c = l.getAttribute("wf-algolia-link"), m = l.getAttribute("wf-algolia-link-prefix") || l.getAttribute("wf-algolia-link-folder") || "", g = l.getAttribute("wf-algolia-link-suffix") || "", u = getPath(t, c);
        l.href = sanitizeUrl(m + applySlugifyAttr(l, u || "") + g);
      } catch (s) {
        console.warn("[wf-algolia] populateCard link error:", s);
      }
    }), e.querySelectorAll("[wf-algolia-if]").forEach((l) => {
      let s = l.getAttribute("wf-algolia-if");
      evalCondition(s, t) ? showElement(l) : hideElement(l);
    });
  }
  function cloneAndPopulate(e, t, n) {
    let r = e.cloneNode(true);
    r.style.display = "", r.removeAttribute("wf-algolia-element"), r.classList.add("wf-algolia-injected");
    let i = r.getAttribute("wf-algolia-link-url"), o = r.getAttribute("wf-algolia-link");
    if (i) {
      let l = getPath(t, i);
      r.href = sanitizeUrl(l || "#");
    } else if (o) {
      let l = r.getAttribute("wf-algolia-link-prefix") || r.getAttribute("wf-algolia-link-folder") || "", s = r.getAttribute("wf-algolia-link-suffix") || "";
      if (l.includes("|") && t.__indexName) {
        let m = l.split("|"), g = m[0] ?? "";
        for (let u of m.slice(1)) {
          let h = u.indexOf(":");
          if (h > 0) {
            let y = u.substring(0, h), b = u.substring(h + 1);
            if (t.__indexName === y) {
              g = b;
              break;
            }
          }
        }
        l = g;
      }
      let c = getPath(t, o) || "";
      r.href = sanitizeUrl(l + applySlugifyAttr(r, c) + s);
    }
    return populateCard(r, t, n), r.dataset.wfAlgoliaHitObjectid = t.objectID, r.dataset.wfAlgoliaHitIndex = t.__indexName || "", t.__queryID && (r.dataset.wfAlgoliaHitQueryid = t.__queryID), r;
  }
  function removeInjected(e) {
    e.querySelectorAll(".wf-algolia-injected").forEach((t) => t.remove());
  }
  var detachedTemplates = /* @__PURE__ */ new WeakSet();
  function detachTemplateOnce(e) {
    return detachedTemplates.has(e) || (detachedTemplates.add(e), e.remove()), e;
  }
  function renderHits(e, t, n, r = false, i) {
    r || removeInjected(e), detachTemplateOnce(t);
    let o = document.createDocumentFragment(), l = r ? e.querySelectorAll(".wf-algolia-injected").length : 0;
    if (n.forEach((s, c) => {
      try {
        let m = cloneAndPopulate(t, s, i);
        m.dataset.wfAlgoliaHitPosition = String(l + c + 1), o.appendChild(m);
      } catch (m) {
        console.warn("[wf-algolia] Failed to clone hit:", s.objectID, m);
      }
    }), e.appendChild(o), restartIx2(), isInsightsReady()) {
      let s = n[0]?.__indexName || "", c = n.map((m) => m.objectID).filter(Boolean);
      s && c.length && trackView(s, c);
    }
  }
  var middlewares = [];
  function registerMiddleware(e) {
    middlewares.push(e);
  }
  function applyBeforeSearch(e) {
    let t = e;
    for (let n of middlewares) n.beforeSearch && (t = n.beforeSearch(t) ?? t);
    return t;
  }
  function applyAfterSearch(e) {
    let t = e;
    for (let n of middlewares) n.afterSearch && (t = n.afterSearch(t) ?? t);
    return t;
  }
  async function searchWithMiddleware(e, t) {
    let n = applyBeforeSearch(e), r = await t(n);
    return applyAfterSearch(r);
  }
  async function multiQueryWithMiddleware(e, t) {
    let n = t.map((i) => ({
      ...i,
      params: applyBeforeSearch(i.params)
    })), r = await e.multipleQueries(n);
    return {
      ...r,
      results: r.results.map((i) => applyAfterSearch(i))
    };
  }
  function exposePublicAPI(e, t) {
    let n = () => emit("refresh");
    window.WfAlgolia = {
      version: "1.0.0",
      getClient: () => e,
      search: (r, i, o) => e.initIndex(r).search(i, {
        clickAnalytics: true,
        ...o
      }),
      multiSearch: (r) => e.multipleQueries(r),
      getObject: (r, i) => e.initIndex(r).getObject(i),
      cloneAndPopulate: (r, i) => cloneAndPopulate(r, i, t),
      populateCard: (r, i) => populateCard(r, i, t),
      trackClick,
      trackConversion,
      getInsights: () => insights,
      on,
      off,
      setFilter: (r, i) => setFilter(r, i, n),
      clearFilter: (r) => clearFilter(r, n),
      clearAllFilters: () => clearAllFilters(n),
      commitStaging: commitStagingAndSync,
      discardStaging: discardStagingAndSync,
      getFilterState: () => {
        let r = {};
        return Object.entries(FILTER_STATE).forEach(([i, o]) => {
          r[i] = {
            ...o,
            values: o.values ? [...o.values] : void 0
          };
        }), r;
      },
      setQuery: (r) => setQuery(r, n),
      getQuery: () => (document.querySelector('[wf-algolia-element="browse-search"]') || document.querySelector('[wf-algolia-element="search-input"]'))?.value || "",
      refresh: n,
      use: (r) => registerMiddleware(r),
      destroy: () => {
        document.querySelectorAll(".wf-algolia-injected").forEach((r) => r.remove()), delete window.WfAlgolia;
      }
    };
  }
  function scanAttributes() {
    let e = /* @__PURE__ */ new Map();
    return document.querySelectorAll("[wf-algolia-element]").forEach((n) => {
      let r = n.getAttribute("wf-algolia-element");
      e.has(r) || e.set(r, []), e.get(r).push(n);
    }), [
      "template",
      "autocomplete-template",
      "filter-template",
      "filter-tag-template"
    ].forEach((n) => {
      (e.get(n) || []).forEach((r) => {
        let i = r.parentElement;
        if (!i) {
          r.remove();
          return;
        }
        let o = TEMPLATE_ANCHOR_SELECTORS[n], l = o ? r.closest(o) ?? null : null;
        o && !l && !warnedTemplateAnchor.has(r) && (warnedTemplateAnchor.add(r), console.warn(
          `[wf-algolia] "${n}" has no ancestor matching "${o}". Falling back to immediate parent for matching \u2014 confirm the template lives inside the right wrapper.`,
          r
        )), registerTemplateHome(r, i, l ?? i), r.remove();
      });
    }), e;
  }
  var TEMPLATE_ANCHOR_SELECTORS = {
    template: null,
    "autocomplete-template": null,
    "filter-template": '[wf-algolia-element="filter-group"]',
    "filter-tag-template": '[wf-algolia-element="filter-tag-wrapper"]'
  };
  var warnedTemplateAnchor = /* @__PURE__ */ new WeakSet();
  function getCascadingAttr(e, t, n = "") {
    let r = e.getAttribute(`wf-algolia-${t}`);
    if (r !== null) return r;
    let i = e.closest(`[wf-algolia-${t}]`);
    if (i) return i.getAttribute(`wf-algolia-${t}`);
    let l = document.querySelector("script[data-app-id]")?.getAttribute(`data-${t}`);
    return l ?? n;
  }
  var templateAnchorByEl = /* @__PURE__ */ new WeakMap();
  var templateParentByEl = /* @__PURE__ */ new WeakMap();
  function registerTemplateHome(e, t, n) {
    templateParentByEl.set(e, t), templateAnchorByEl.set(e, n);
  }
  function findTemplateFor(e, t, n = "template") {
    return (t.get(n) || []).find((i) => templateAnchorByEl.get(i) === e) || null;
  }
  function getTemplateParent(e) {
    return templateParentByEl.get(e) ?? null;
  }
  function cssEscape(e) {
    return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }
  async function fetchFacetValues(e, t, n, r) {
    let o = (await e.initIndex(t).search("", {
      facets: [n],
      hitsPerPage: 0,
      ...r && r.length > 0 ? {
        facetFilters: r
      } : {}
    })).facets?.[n];
    return !o || Object.keys(o).length === 0 ? [] : Object.entries(o).sort((l, s) => s[1] - l[1]);
  }
  async function fetchFacetsBatch(e, t, n, r) {
    let i = await e.initIndex(t).search("", {
      facets: n,
      hitsPerPage: 0,
      maxValuesPerFacet: 50,
      ...r && r.length > 0 ? {
        facetFilters: r
      } : {}
    }), o = /* @__PURE__ */ new Map();
    for (let l of n) {
      let s = i.facets?.[l];
      s && Object.keys(s).length > 0 && o.set(
        l,
        Object.entries(s).sort((c, m) => m[1] - c[1])
      );
    }
    return o;
  }
  function initDynamicFilters(e, t, n) {
    let r = [
      ...document.querySelectorAll(
        '[wf-algolia-element="filter-group"][wf-algolia-facet]'
      )
    ].filter((i) => i.closest('[wf-algolia-element="browse"]'));
    r.length !== 0 && Promise.all(r.map((i) => populateDynamicGroup(e, t, i))).then(() => n()).catch((i) => console.error("[wf-algolia] Dynamic filters failed:", i));
  }
  async function populateDynamicGroup(e, t, n, r) {
    let i = n.getAttribute("wf-algolia-facet"), o = n.querySelector(
      `[wf-algolia-element="filter-group"][wf-algolia-field="${cssEscape(i)}"], [wf-algolia-element="filter-group"][wf-algolia-facet="${cssEscape(i)}"]`
    );
    if (o && o !== n) return;
    let l = n.querySelector('[wf-algolia-element="filter-field-text"]');
    if (l) {
      let m = n.getAttribute("wf-algolia-field-label") ?? i, g = getTextTemplate(l, "{field}");
      l.textContent = interpolate(g, {
        field: m
      });
    }
    let s = n.getAttribute("wf-algolia-index") || n.closest('[wf-algolia-element="browse"]')?.getAttribute("wf-algolia-index") || null, c = findTemplateFor(n, t, "filter-template");
    if (!s || !c) {
      console.error(
        `[wf-algolia] Dynamic filter "${i}" missing index=${!!s} template=${!!c}. Elements map has filter-template: ${t.has("filter-template")} (${(t.get("filter-template") || []).length} items)`
      );
      return;
    }
    try {
      let m = await fetchFacetValues(e, s, i, r?.facetFilters);
      if (m.length === 0) {
        console.error(`[wf-algolia] No facet values for "${i}" on "${s}"`);
        return;
      }
      let g = getTemplateParent(c) ?? n, u = getLabelMode(n);
      removeInjected(n), m.forEach(([y, b]) => {
        let w = c.cloneNode(true);
        w.removeAttribute("wf-algolia-element"), w.classList.add("wf-algolia-injected"), w.setAttribute("wf-algolia-element", "filter-item"), w.setAttribute("wf-algolia-value", y), w.querySelectorAll("*").forEach((k) => {
          k.style.display === "none" && (k.style.display = "");
        });
        let E = w.querySelector('[wf-algolia-element="filter-value-text"]') || w.querySelector(".wf-fi-name") || Array.from(w.children).find(
          (k) => !k.getAttribute?.("wf-algolia-element")
        );
        E && (E.textContent = formatFacetLabel(y, u));
        let T = w.querySelector('[wf-algolia-element="filter-count"]');
        T && (T.textContent = String(b)), w.querySelector("input") || (w.setAttribute("role", "button"), w.setAttribute("tabindex", "0")), g.appendChild(w);
      }), reapplyShowMore(n);
      let h = n.querySelector('[wf-algolia-element="filter-group-count"]');
      if (h) {
        let y = m.length, b = getTextTemplate(h, "{count}");
        h.textContent = interpolate(b, {
          distinct: y,
          count: y
        });
      }
    } catch (m) {
      console.error(`[wf-algolia] Dynamic filter "${i}" failed:`, m);
    }
  }
  async function refreshChildGroup(e, t, n, r) {
    if (r.length === 0) return;
    let i = r.map(({ field: o, value: l }) => [`${o}:${l}`]);
    await populateDynamicGroup(e, t, n, {
      facetFilters: i
    });
  }
  function syncDynamicFacetCounts(e) {
    document.querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-facet]').forEach((t) => {
      if (!t.closest('[wf-algolia-element="browse"]')) return;
      let n = t.getAttribute("wf-algolia-facet"), r = e[n] || {};
      t.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((i) => {
        let o = i.getAttribute("wf-algolia-value");
        if (!o) return;
        let l = r[o] ?? 0, s = i.querySelector('[wf-algolia-element="filter-count"]');
        s && (s.textContent = String(l));
        let c = t.getAttribute("wf-algolia-zeroclass") || "is-disabled", m = i.hasAttribute("data-wf-algolia-active");
        l === 0 && !m ? i.classList.add(c) : i.classList.remove(c);
      });
    });
  }
  function toggleGroupsByFacetPresence(e) {
    document.querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-field]').forEach((t) => {
      if (t.hasAttribute("wf-algolia-refines")) return;
      let n = t.getAttribute("wf-algolia-field"), r = e[n], i = r && Object.keys(r).length > 0, o = !!FILTER_STATE[n];
      i || o ? t.style.display = "" : t.style.display = "none";
    });
  }
  function parseFieldColonValue(e) {
    if (e === null) return null;
    let t = e.trim(), n = t.indexOf(":");
    if (n <= 0 || n >= t.length - 1) return null;
    let r = t.slice(0, n).trim(), i = t.slice(n + 1).trim();
    return !r || !i ? null : [[`${r}:${i}`]];
  }
  function pairToFacetFilter(e, t) {
    let n = e?.trim() ?? "", r = t?.trim() ?? "";
    return !n || !r ? null : [[`${n}:${r}`]];
  }
  function readBaseFilter(e, t, n) {
    let r = e.getAttribute(`${t}-value`);
    if (r !== null && r.trim() !== "") {
      let o = pairToFacetFilter(e.getAttribute(`${t}-field`), r);
      return o === null && n?.(`${t}-value is set but ${t}-field is missing/empty; ignoring.`), o;
    }
    let i = e.getAttribute(t);
    if (i !== null) {
      let o = parseFieldColonValue(i);
      return o === null && n?.(`${t}="${i}" is malformed (expected "field:value"); ignoring.`), o;
    }
    return null;
  }
  function syncFacetCounts(e) {
    document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((t) => {
      if (!t.closest('[wf-algolia-element="browse"]')) return;
      let n = getFieldOrFacet(t);
      if (!n) return;
      let r = e[n] || {}, i = t.getAttribute("wf-algolia-zeroclass") || "is-disabled";
      t.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((l) => {
        let s = l.getAttribute("wf-algolia-value");
        if (!s) return;
        let c = l.querySelector('[wf-algolia-element="filter-count"]'), m = r[s] ?? 0;
        c && (c.textContent = String(m));
        let g = l.hasAttribute("data-wf-algolia-active");
        m === 0 && !g ? l.classList.add(i) : l.classList.remove(i);
      });
      let o = t.querySelector('[wf-algolia-element="filter-group-count"]');
      if (o) {
        let l = Object.keys(r).length, s = getTextTemplate(o, "{count}");
        o.textContent = interpolate(s, {
          distinct: l,
          count: l
        });
      }
    });
  }
  function stateToAlgoliaFilters(e) {
    let t = [], n = [];
    return Object.entries(e).forEach(([r, i]) => {
      if (i.type === "checkbox" || i.type === "boolean") {
        if (!i.values || i.values.size === 0) return;
        i.match === "and" ? i.values.forEach((o) => t.push([`${r}:${escapeFilterValue(o)}`])) : t.push([...i.values].map((o) => `${r}:${escapeFilterValue(o)}`));
      }
      (i.type === "number" || i.type === "date") && (i.min !== void 0 && n.push(`${r}>=${i.min}`), i.max !== void 0 && n.push(`${r}<=${i.max}`));
    }), {
      facetFilters: t,
      numericFilters: n
    };
  }
  function debounce(e, t) {
    let n;
    return (...r) => {
      clearTimeout(n), n = setTimeout(() => e(...r), t);
    };
  }
  var SFFV_DEFAULT_DEBOUNCE = 200;
  var warnedNotSearchable = /* @__PURE__ */ new WeakSet();
  var LOCAL_HIDDEN_ATTR = "data-wf-algolia-local-hidden";
  function localFilterSearch(e, t, n) {
    let r = n.trim().toLowerCase(), i = [...e.querySelectorAll('[wf-algolia-element="filter-search-results"]')], o = (m) => i.some((g) => g.contains(m)), l = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')].filter(
      (m) => !o(m)
    ), s = 0;
    for (let m of l) {
      if (r === "") {
        m.hasAttribute(LOCAL_HIDDEN_ATTR) && (m.removeAttribute(LOCAL_HIDDEN_ATTR), m.style.removeProperty("display")), s++;
        continue;
      }
      (m.querySelector('[wf-algolia-element="filter-value-text"]')?.textContent ?? m.textContent ?? "").trim().toLowerCase().includes(r) ? (m.hasAttribute(LOCAL_HIDDEN_ATTR) && (m.removeAttribute(LOCAL_HIDDEN_ATTR), m.style.removeProperty("display")), s++) : (m.setAttribute(LOCAL_HIDDEN_ATTR, "true"), m.style.display = "none");
    }
    let c = r === "" ? true : s > 0;
    renderSffvEmpty(t, n.trim(), c);
  }
  function resolveGroupIndex(e) {
    let t = e.getAttribute("wf-algolia-index");
    if (t) return t;
    let n = e.closest("[wf-algolia-index]");
    if (n && n !== e) {
      let o = n.getAttribute("wf-algolia-index");
      if (o) return o;
    }
    return document.querySelector("script[data-app-id]")?.getAttribute("data-index") ?? null;
  }
  function resolveSffvDebounce(e, t) {
    let n = e.getAttribute("wf-algolia-debounce") ?? t.getAttribute("wf-algolia-debounce");
    if (n === null || n === "") return SFFV_DEFAULT_DEBOUNCE;
    let r = parseInt(n, 10);
    return Number.isNaN(r) ? SFFV_DEFAULT_DEBOUNCE : Math.max(0, r);
  }
  function parentScopeFacetFilters(e) {
    let t = e.getAttribute("wf-algolia-refines");
    if (!t) return;
    let n = document.querySelector(
      `[wf-algolia-element="filter-group"][wf-algolia-group-id="${t}"]`
    );
    if (!n) return;
    let r = n.getAttribute("wf-algolia-field");
    if (!r) return;
    let i = FILTER_STATE[r];
    return !i?.values || i.values.size === 0 ? void 0 : [[...i.values].map((l) => `${r}:${l}`)];
  }
  function renderSffvInline(e, t, n, r) {
    let i = getTemplateParent(r) ?? e;
    removeInjected(e);
    let o = e.getAttribute("wf-algolia-activeclass") || "is-active", s = FILTER_STATE[t]?.values ?? /* @__PURE__ */ new Set();
    n.forEach(({ value: c, count: m }) => {
      let g = r.cloneNode(true);
      g.removeAttribute("wf-algolia-element"), g.classList.add("wf-algolia-injected"), g.setAttribute("wf-algolia-element", "filter-item"), g.setAttribute("wf-algolia-value", c), g.querySelectorAll("*").forEach((y) => {
        y.style.display === "none" && (y.style.display = "");
      });
      let u = g.querySelector('[wf-algolia-element="filter-value-text"]') || g.querySelector(".wf-fi-name") || Array.from(g.children).find(
        (y) => !y.getAttribute?.("wf-algolia-element")
      );
      u && (u.textContent = c);
      let h = g.querySelector('[wf-algolia-element="filter-count"]');
      h && (h.textContent = String(m)), g.querySelector("input") || (g.setAttribute("role", "button"), g.setAttribute("tabindex", "0")), s.has(c) && (g.setAttribute("data-wf-algolia-active", "true"), g.classList.add(o)), i.appendChild(g);
    });
  }
  function renderSffvEmpty(e, t, n) {
    if (!e) return;
    if (n) {
      e.style.display = "none";
      return;
    }
    let r = getTextTemplate(e, "");
    r && (e.textContent = interpolate(r, {
      query: t
    })), e.style.display = "";
  }
  function findScopedRole(e, t, n) {
    let r = e.querySelector(`[wf-algolia-element="${n}"]`);
    if (r) return r;
    let i = typeof CSS < "u" && CSS.escape ? CSS.escape(t) : t, o = document.querySelectorAll(
      `[wf-algolia-element="${n}"][wf-algolia-field="${i}"]`
    );
    for (let l of o) {
      let s = l.closest('[wf-algolia-element="filter-group"]');
      if (s === null || s === e) return l;
    }
    return null;
  }
  function initFilterSearch(e, t, n) {
    document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((r) => {
      let i = r.getAttribute("wf-algolia-field");
      if (!i) return;
      let o = findScopedRole(r, i, "filter-search");
      if (!o) return;
      if (o.getAttribute("wf-algolia-search-mode") === "local") {
        let b = findScopedRole(r, i, "filter-search-empty");
        o.addEventListener("input", () => {
          localFilterSearch(r, b, o.value);
        });
        return;
      }
      let s = r.getAttribute("wf-algolia-facet") ?? i, c = resolveGroupIndex(r);
      if (!s || !c) return;
      let m = findScopedRole(r, i, "filter-search-empty"), g = findScopedRole(r, i, "filter-search-results"), u = g ? g.querySelector(
        '[wf-algolia-element="filter-search-result-template"]'
      ) : null;
      u && u.parentElement && u.parentElement.removeChild(u);
      let h = () => {
        if (g)
          for (g.style.display = "none"; g.firstChild; )
            g.removeChild(g.firstChild);
      }, y = debounce(
        async (b) => {
          if (b.length === 0) {
            m && (m.style.display = "none"), g ? h() : n();
            return;
          }
          try {
            let w = parentScopeFacetFilters(r), E = await e.initIndex(c).searchForFacetValues(s, b, {
              ...w ? {
                facetFilters: w
              } : {}
            });
            renderSffvEmpty(m, b, E.facetHits.length > 0);
            let T = findTemplateFor(r, t, "filter-template");
            if (g) {
              let k = u ?? T;
              k && (renderSffvOverlay(g, r, i, E.facetHits, k, u !== null), g.style.display = "");
            } else
              T && (renderSffvInline(r, i, E.facetHits, T), reapplyShowMore(r));
          } catch (w) {
            let E = w;
            if (E.status === 400 && /searchable/i.test(E.message ?? "")) {
              warnedNotSearchable.has(r) || (warnedNotSearchable.add(r), console.error(`[wf-algolia] filter-search on field "${i}" requires the attribute to be marked \`searchable(${s})\` in your Algolia index's attributesForFaceting setting. SFFV disabled for this group until the index config is updated.

Fix in the Algolia dashboard:
  Configuration \u2192 Filtering and Faceting \u2192 Facets \u2192
  find "${s}" \u2192 change to "Searchable (will return facets list)" \u2192
  Review and Save Settings.

Or via the API:
  index.setSettings({ attributesForFaceting: [ "searchable(${s})", ... ] });

Verbatim Algolia error: ${E.message ?? "(no message)"}`));
              return;
            }
            throw w;
          }
        },
        resolveSffvDebounce(o, r)
      );
      o.addEventListener("input", () => y(o.value.trim())), g && (g.addEventListener("click", (b) => {
        let w = b.target;
        if (!w) return;
        let E = w.closest('[wf-algolia-element="filter-item"]');
        if (!E || !g.contains(E)) return;
        let T = E.getAttribute("wf-algolia-value");
        if (!T) return;
        b.preventDefault(), b.stopPropagation(), ensureFilterItem(r, T, E).click(), h(), o.value = "";
      }), document.addEventListener("click", (b) => {
        let w = b.target;
        w && (r.contains(w) || g.contains(w) || h());
      }));
    });
  }
  function renderSffvOverlay(e, t, n, r, i, o = false) {
    for (; e.firstChild; ) e.removeChild(e.firstChild);
    let l = t.getAttribute("wf-algolia-activeclass") || "is-active", c = FILTER_STATE[n]?.values ?? /* @__PURE__ */ new Set();
    r.forEach(({ value: m, count: g }) => {
      let u = i.cloneNode(true);
      u.removeAttribute("wf-algolia-element"), u.classList.add("wf-algolia-injected"), u.setAttribute("wf-algolia-element", "filter-item"), u.setAttribute("wf-algolia-value", m), o && u.setAttribute("data-wf-algolia-overlay-result", "true"), u.querySelectorAll("*").forEach((b) => {
        b.style.display === "none" && (b.style.display = "");
      });
      let h = u.querySelector('[wf-algolia-element="filter-value-text"]') || u.querySelector(".wf-fi-name") || Array.from(u.children).find(
        (b) => !b.getAttribute?.("wf-algolia-element")
      );
      h && (h.textContent = m);
      let y = u.querySelector('[wf-algolia-element="filter-count"]');
      y && (y.textContent = String(g)), u.querySelector("input") || (u.setAttribute("role", "button"), u.setAttribute("tabindex", "0")), c.has(m) && (u.setAttribute("data-wf-algolia-active", "true"), u.classList.add(l)), e.appendChild(u);
    });
  }
  function ensureFilterItem(e, t, n) {
    let r = e.querySelector('[wf-algolia-element="filter-search-results"]'), i = typeof CSS < "u" && CSS.escape ? CSS.escape(t) : t, o = Array.from(
      e.querySelectorAll('[wf-algolia-element="filter-item"]')
    ).filter((b) => !r || !r.contains(b)), l = o.find((b) => b.getAttribute("wf-algolia-value") === t);
    if (l) return l;
    let m = (e.querySelector('[wf-algolia-element="filter-template"]') ?? o[0] ?? n).cloneNode(true);
    m.removeAttribute("wf-algolia-element"), m.setAttribute("wf-algolia-element", "filter-item"), m.setAttribute("wf-algolia-value", t), m.setAttribute("data-wf-algolia-synthesized", "true"), m.removeAttribute("data-wf-algolia-active"), m.removeAttribute("data-wf-algolia-overlay-result");
    let g = e.getAttribute("wf-algolia-activeclass") || "is-active";
    m.classList.remove(g), m.classList.add("wf-algolia-injected"), m.style.display === "none" && (m.style.display = ""), m.querySelectorAll("*").forEach((b) => {
      b.style.display === "none" && (b.style.display = "");
    }), m.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((b) => {
      b.checked = false;
    });
    let u = m.querySelector('[wf-algolia-element="filter-value-text"]') || m.querySelector(".wf-fi-name");
    u && (u.textContent = t);
    let h = m.querySelector('[wf-algolia-element="filter-count"]');
    h && (h.textContent = "");
    let y = o[0]?.parentElement ?? e;
    return y.insertBefore(m, y.firstChild), reapplyShowMore(e), m;
  }
  var warnedNoChipTemplate = /* @__PURE__ */ new WeakSet();
  function renderFilterTags(e, t, n) {
    let r = document.querySelector('[wf-algolia-element="filter-tag-wrapper"]');
    if (!r) return;
    let i = findTemplateFor(r, t, "filter-tag-template");
    if (!i) {
      Object.keys(e).length > 0 && !warnedNoChipTemplate.has(r) && (warnedNoChipTemplate.add(r), console.warn(
        '[wf-algolia] active filter detected but no [wf-algolia-element="filter-tag-template"] in DOM. Chips will not render. See https://wf-algolia-docs.candidleap.com/filters/dynamic-filters',
        r
      ));
      return;
    }
    removeInjected(r);
    let o = getTemplateParent(i) ?? r, l = parseReplaceFieldMap(r);
    Object.entries(e).forEach(([s, c]) => {
      if (c.values && c.values.size > 0)
        c.values.forEach((m) => {
          let g = buildValueChip(i, s, m, c, e, n, l);
          o.appendChild(g);
        });
      else if (c.min !== void 0 && c.max !== void 0) {
        let m = buildRangeChip(i, s, c, e, n, l);
        o.appendChild(m);
      }
    });
  }
  function buildValueChip(e, t, n, r, i, o, l) {
    let s = cloneChip(e), c = getFieldPrefixSuffix(t), m = s.querySelector('[wf-algolia-element="filter-tag-text"]');
    if (m) {
      let u = formatFacetLabel(n, getLabelMode(m)), h = getTextTemplate(m, "{value}");
      m.textContent = interpolate(h, {
        field: fieldDisplayName(l, t),
        value: `${c.prefix}${u}${c.suffix}`
      });
    }
    let g = s.querySelector('[wf-algolia-element="filter-tag-remove"]');
    return g && g.addEventListener("click", (u) => {
      u.stopPropagation(), r.values.delete(n), r.values.size === 0 && delete i[t], delete STAGING_STATE[t], syncFilterDOM(i), o();
    }), s;
  }
  function fieldDisplayName(e, t) {
    let n = e?.[t];
    return typeof n == "string" ? n : t;
  }
  function parseReplaceFieldMap(e) {
    let t = e.getAttribute("wf-algolia-replace-field");
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch {
    }
    try {
      return JSON.parse(t.replace(/'/g, '"'));
    } catch {
      return console.error(
        "[wf-algolia] invalid wf-algolia-replace-field JSON on filter-tag-wrapper; rendering raw field names",
        e
      ), null;
    }
  }
  function getFieldPrefixSuffix(e) {
    let t = typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e, n = document.querySelector(
      `[wf-algolia-element="filter-group"][wf-algolia-field="${t}"]`
    );
    return {
      prefix: n?.getAttribute("wf-algolia-prefix") ?? "",
      suffix: n?.getAttribute("wf-algolia-suffix") ?? ""
    };
  }
  function buildRangeChip(e, t, n, r, i, o) {
    let l = cloneChip(e), s = n.min, c = n.max, m = getFieldPrefixSuffix(t), g = `${m.prefix}${s}${m.suffix}`, u = `${m.prefix}${c}${m.suffix}`, h = l.querySelector('[wf-algolia-element="filter-tag-text"]');
    if (h) {
      let b = getTextTemplate(h, "{min} \u2013 {max}");
      h.textContent = interpolate(b, {
        field: fieldDisplayName(o, t),
        min: g,
        max: u,
        value: `${g} \u2013 ${u}`
      });
    }
    let y = l.querySelector('[wf-algolia-element="filter-tag-remove"]');
    return y && y.addEventListener("click", (b) => {
      b.stopPropagation(), delete r[t], delete STAGING_STATE[t], document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((w) => {
        if (getFieldOrFacet(w) !== t) return;
        let E = w.querySelector('[wf-algolia-element="range-min"]'), T = w.querySelector('[wf-algolia-element="range-max"]');
        E && (E.value = E.defaultValue), T && (T.value = T.defaultValue);
      }), i();
    }), l;
  }
  function cloneChip(e) {
    let t = e.cloneNode(true);
    return t.style.display = "", t.removeAttribute("wf-algolia-element"), t.classList.add("wf-algolia-injected"), t;
  }
  var rangeDefaults = {};
  function readRangeBounds(e, t, n) {
    let r = e.getAttribute("fs-rangeslider-min"), i = e.getAttribute("fs-rangeslider-max"), o = r ?? t.getAttribute("min"), l = i ?? n.getAttribute("max");
    if (o === null || l === null) return null;
    let s = parseFloat(o), c = parseFloat(l);
    return !Number.isFinite(s) || !Number.isFinite(c) ? null : {
      min: s,
      max: c
    };
  }
  function initRangeFilters(e, t = 250) {
    for (let n of Object.keys(rangeDefaults)) delete rangeDefaults[n];
    document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
      let r = n.getAttribute("wf-algolia-field");
      if (!r) return;
      let i = n.querySelector('[wf-algolia-element="range-min"]'), o = n.querySelector('[wf-algolia-element="range-max"]'), l = n.querySelector('[wf-algolia-element="range-display"]');
      if (!i || !o) return;
      let s = n.getAttribute("wf-algolia-debounce"), c = s === null ? NaN : parseInt(s, 10), m = Number.isFinite(c) && c >= 0 ? c : t, g = n.getAttribute("wf-algolia-apply-mode"), u = g === "deferred";
      g !== null && g !== "deferred" && g !== "immediate" && console.warn(
        `[wf-algolia] Unknown wf-algolia-apply-mode='${g}' on filter-group; falling back to immediate. Valid values: 'immediate' (default) | 'deferred'.`
      );
      let h = readRangeBounds(n, i, o);
      h && (rangeDefaults[r] = h);
      let y = () => {
        let w = parseFloat(i.value), E = parseFloat(o.value);
        if (!Number.isFinite(w) || !Number.isFinite(E)) return;
        if (w > E) {
          i.value = o.value;
          return;
        }
        if (l && (l.textContent = `${w} \u2013 ${E}`), h && w === h.min && E === h.max) {
          if (u) {
            FILTER_STATE[r] && (delete FILTER_STATE[r], e());
            return;
          }
          FILTER_STATE[r] && (delete FILTER_STATE[r], e());
          return;
        }
        let T = {
          type: "number",
          match: "or",
          min: w,
          max: E
        };
        if (u) {
          stageFilter(r, T), n.setAttribute("data-wf-algolia-staged", "true");
          return;
        }
        FILTER_STATE[r] = T, e();
      }, b = m > 0 ? debounce(y, m) : y;
      i.addEventListener("input", b), o.addEventListener("input", b), l && (l.textContent = `${i.value} \u2013 ${o.value}`);
    });
  }
  function initInfiniteScroll(e, t) {
    let n = document.createElement("div");
    n.className = "wf-algolia-sentinel", n.style.height = "1px", e.parentElement?.appendChild(n);
    let r = false;
    new IntersectionObserver(
      (o) => {
        !o[0]?.isIntersecting || r || (r = true, (async () => {
          try {
            await t();
          } catch (s) {
            console.warn("[wf-algolia] infinite-scroll loader rejected:", s);
          } finally {
            r = false;
          }
        })());
      },
      {
        rootMargin: "200px"
      }
    ).observe(n);
  }
  var currentSortIndex = "";
  var sortInitialized = false;
  var primarySortIndex = "";
  var warnedUnknownReplica = /* @__PURE__ */ new Set();
  var warnedEmptySortGroup = /* @__PURE__ */ new WeakSet();
  var SORT_URL_PARAM = "sort";
  function getCurrentSort() {
    return currentSortIndex;
  }
  function sortIndexOf(e) {
    let t = e.getAttribute("wf-algolia-sort-index");
    return t === null || t === "" ? primarySortIndex : t;
  }
  function knownReplicaIndexes(e) {
    let t = /* @__PURE__ */ new Set([primarySortIndex]);
    return document.querySelectorAll(
      '[wf-algolia-element="sort-item"][wf-algolia-sort-index]'
    ).forEach((n) => {
      if (n === e) return;
      let r = n.getAttribute("wf-algolia-sort-index");
      r && t.add(r);
    }), document.querySelectorAll('[wf-algolia-element="mode-btn"][wf-algolia-mode]').forEach((n) => {
      let r = n.getAttribute("wf-algolia-mode");
      r && r !== "all" && t.add(r);
    }), t;
  }
  function syncSortUI() {
    document.querySelectorAll('[wf-algolia-element="sort-group"]').forEach((e) => {
      let t = [...e.querySelectorAll('[wf-algolia-element="sort-item"]')], n = null;
      for (let r of t) {
        let i = sortIndexOf(r);
        i === currentSortIndex || i === (currentSortIndex || primarySortIndex) ? (r.setAttribute("data-wf-algolia-active", "true"), n = n ?? r) : r.removeAttribute("data-wf-algolia-active");
      }
      if (n) {
        let r = (n.textContent ?? "").trim();
        e.querySelectorAll(
          '[wf-algolia-element="sort-selected-label"]'
        ).forEach((i) => {
          let o = getTextTemplate(i, "{value}");
          i.textContent = interpolate(o, {
            value: r,
            count: 1
          });
        });
      }
    });
  }
  function writeSortToURL() {
    let e = new URL(window.location.href);
    !currentSortIndex || currentSortIndex === primarySortIndex ? e.searchParams.delete(SORT_URL_PARAM) : e.searchParams.set(SORT_URL_PARAM, currentSortIndex);
    let t = e.toString();
    t !== window.location.href && window.history.pushState(null, "", t);
  }
  function readSortFromURL() {
    return new URL(window.location.href).searchParams.get(SORT_URL_PARAM) ?? "";
  }
  function pickInitialSortItem(e, t) {
    if (e.length === 0) return null;
    if (t) {
      let r = e.find((i) => i.getAttribute("wf-algolia-sort-index") === t);
      if (r) return r;
    }
    let n = e.find((r) => {
      let i = r.getAttribute("wf-algolia-sort-index");
      return i === null || i === "";
    });
    return n || e[0];
  }
  function onSortItemClick(e, t, n) {
    let r = sortIndexOf(e);
    r === primarySortIndex || !knownReplicaIndexes(e).has(r) && !warnedUnknownReplica.has(r) && (warnedUnknownReplica.add(r), console.warn(
      `[wf-algolia] sort-by: replica "${r}" is not registered on the page; falling back to primary index "${primarySortIndex}" if Algolia rejects it.`,
      e
    )), currentSortIndex = r, writeSortToURL(), syncSortUI(), t.page = 0, closeDropdownOnPick(e), n();
  }
  function initSortGroups(e, t, n) {
    primarySortIndex = n;
    let r = [...document.querySelectorAll('[wf-algolia-element="sort-group"]')];
    if (r.length === 0) return;
    sortInitialized = true;
    let i = readSortFromURL(), o = false;
    for (let l of r) {
      let s = [...l.querySelectorAll('[wf-algolia-element="sort-item"]')];
      if (s.length === 0) {
        warnedEmptySortGroup.has(l) || (warnedEmptySortGroup.add(l), console.warn(
          '[wf-algolia] sort-group has no sort-item descendants. Add `[wf-algolia-element="sort-item"]` children to enable sorting.',
          l
        ));
        continue;
      }
      if (!o) {
        let c = pickInitialSortItem(s, i);
        c && (currentSortIndex = sortIndexOf(c), o = true);
      }
      for (let c of s)
        c.addEventListener("click", () => onSortItemClick(c, e, t));
    }
    syncSortUI();
  }
  function resetSortOnPopState(e) {
    if (!sortInitialized) return;
    primarySortIndex = e, currentSortIndex = readSortFromURL() || e, syncSortUI();
  }
  function buildSnippetParam(e, t) {
    return t === "*" ? [`*:${e}`] : t.split(",").map((n) => `${n.trim()}:${e}`);
  }
  var HASH_PREFIX = "#wfa=";
  function enc(e) {
    return encodeURIComponent(e);
  }
  function dec(e) {
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  }
  function stateToQueryString(e, t) {
    let r = new URL(t).searchParams;
    ["q", "mode", "page"].forEach((s) => r.delete(s)), [...r.keys()].filter((s) => s.startsWith("f_")).forEach((s) => r.delete(s)), e.query && r.set("q", e.query), e.mode && e.mode !== "all" && r.set("mode", e.mode), e.pagination !== "infinite-scroll" && e.page && e.page > 0 && r.set("page", String(e.page + 1));
    let i = r.toString(), o = [];
    e.filters && Object.entries(e.filters).forEach(([s, c]) => {
      let m = encodeURIComponent(s);
      if (c.type === "checkbox" || c.type === "boolean") {
        if (c.values && c.values.size > 0) {
          let g = [...c.values].map(enc).join(",");
          o.push(`f_${m}=${g}`);
        }
      } else
        (c.type === "number" || c.type === "date") && (c.min !== void 0 && o.push(`f_${m}_min=${encodeURIComponent(String(c.min))}`), c.max !== void 0 && o.push(`f_${m}_max=${encodeURIComponent(String(c.max))}`));
    });
    let l = o.join("&");
    return i && l ? `${i}&${l}` : i || l;
  }
  function stateToHashPayload(e) {
    let t = {};
    return e.filters && Object.entries(e.filters).forEach(([n, r]) => {
      t[n] = {
        type: r.type,
        match: r.match,
        ...r.values ? {
          values: [...r.values]
        } : {},
        ...r.min !== void 0 ? {
          min: r.min
        } : {},
        ...r.max !== void 0 ? {
          max: r.max
        } : {}
      };
    }), encodeURIComponent(
      JSON.stringify({
        q: e.query || "",
        mode: e.mode || "",
        page: e.page || 0,
        f: t
      })
    );
  }
  function writeStateToURL(e) {
    let t = window.location.href.split("#")[0] ?? "", n = stateToQueryString(e, t), r = new URL(t);
    r.search = n ? `?${n}` : "";
    let i = r.toString(), o;
    if (i.length <= 2e3) o = i;
    else {
      let l = new URL(t).searchParams;
      ["q", "mode", "page"].forEach((m) => l.delete(m)), [...l.keys()].filter((m) => m.startsWith("f_")).forEach((m) => l.delete(m));
      let s = new URL(t);
      s.search = l.toString();
      let c = stateToHashPayload(e);
      o = `${s.toString()}${HASH_PREFIX}${c}`;
    }
    o !== window.location.href && window.history.pushState(null, "", o);
  }
  function readStateFromURL() {
    let { hash: e } = window.location;
    return e.startsWith(HASH_PREFIX) ? parseHashState(e.slice(HASH_PREFIX.length)) : parseQueryState();
  }
  function parseHashState(e) {
    try {
      let t = JSON.parse(decodeURIComponent(e)), n = {};
      return Object.entries(t.f || {}).forEach(([r, i]) => {
        let o = {
          type: i.type,
          match: i.match
        };
        i.values && (o.values = new Set(i.values)), i.min !== void 0 && (o.min = i.min), i.max !== void 0 && (o.max = i.max), n[r] = o;
      }), {
        query: t.q || "",
        mode: t.mode || "all",
        page: typeof t.page == "number" ? t.page : 0,
        filters: n
      };
    } catch {
      return {
        query: "",
        mode: "all",
        page: 0,
        filters: {}
      };
    }
  }
  function parseQueryState() {
    let e = new URL(window.location.href), t = e.searchParams.get("q") || "", n = e.searchParams.get("mode") || "all", r = e.searchParams.get("page"), i = r ? Math.max(0, parseInt(r) - 1) : 0, o = {}, l = e.search.startsWith("?") ? e.search.slice(1) : e.search;
    return l.length > 0 && l.split("&").forEach((s) => {
      if (!s.startsWith("f_")) return;
      let c = s.indexOf("=");
      if (c === -1) return;
      let m = s.slice(0, c), g = s.slice(c + 1), u = dec(m);
      if (u.endsWith("_min")) {
        let h = u.slice(2, -4);
        o[h] || (o[h] = {
          type: "number",
          match: "or"
        }), o[h].min = parseFloat(dec(g));
      } else if (u.endsWith("_max")) {
        let h = u.slice(2, -4);
        o[h] || (o[h] = {
          type: "number",
          match: "or"
        }), o[h].max = parseFloat(dec(g));
      } else {
        let h = u.slice(2);
        o[h] = {
          type: "checkbox",
          match: "or",
          values: new Set(g.split(",").filter(Boolean).map(dec))
        };
      }
    }), {
      query: t,
      mode: n,
      page: i,
      filters: o
    };
  }
  function initModeButtons(e, t, n, r, i) {
    let o = document.querySelectorAll('[wf-algolia-element="mode-btn"]');
    function l() {
      document.querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-index]').forEach((s) => {
        if (s.hasAttribute("wf-algolia-refines")) return;
        let c = s.getAttribute("wf-algolia-index"), m = e.mode === "all" || e.mode === c;
        if (s.style.display = m ? "" : "none", !m) {
          let g = s.getAttribute("wf-algolia-field");
          g && t[g] && delete t[g];
        }
      });
    }
    o.forEach((s) => {
      s.getAttribute("wf-algolia-mode") === e.mode && s.classList.add(r);
    }), l(), o.forEach((s) => {
      s.addEventListener("click", () => {
        e.mode = s.getAttribute("wf-algolia-mode") || "all", e.page = 0, o.forEach((c) => c.classList.remove(r)), s.classList.add(r), l(), n();
      });
    });
  }
  function initSortSelect(e, t) {
    let n = document.querySelector('[wf-algolia-element="sort"]');
    n && n.addEventListener("change", () => {
      e.sort = n.value, e.page = 0, t();
    });
  }
  var urlSyncEnabled = false;
  var paginationMode = "load-more";
  var baseFilters = [];
  function withBaseFilters(e) {
    return baseFilters.length ? [...e, ...baseFilters] : e;
  }
  var browseState;
  var browseClient;
  var browseIndex;
  var modeIndexes = [];
  var browseElements;
  var browseConfig;
  async function initBrowsePage(e, t, n) {
    let r = (n.get("browse") || []).filter(
      (m) => m.getAttribute("wf-algolia-disable-filters") !== "true"
    );
    r.length > 1 && console.warn(
      '[wf-algolia] multiple interactive browse wrappers found; only the first is initialized. Mark the others wf-algolia-disable-filters="true" to render them as static lists.',
      r.slice(1)
    );
    let i = r[0];
    if (!i) return;
    if (browseClient = e, browseConfig = t, browseElements = n, browseConfig = t, browseIndex = i.getAttribute("wf-algolia-index") || "", !browseIndex) {
      console.error(
        "[wf-algolia] Browse page missing wf-algolia-index attribute"
      );
      return;
    }
    if (document.querySelectorAll('[wf-algolia-element="mode-btn"]').forEach((m) => {
      let g = m.getAttribute("wf-algolia-mode");
      g && g !== "all" && !modeIndexes.includes(g) && modeIndexes.push(g);
    }), modeIndexes.length === 0 && (modeIndexes = [browseIndex]), browseState = {
      mode: "all",
      sort: "",
      query: "",
      page: 0,
      hitsPerPage: parseInt(i.getAttribute("wf-algolia-per-page") || "12"),
      topOffset: parseInt(i.getAttribute("wf-algolia-top-offset") || "0")
    }, urlSyncEnabled = i.getAttribute("wf-algolia-url-sync") === "true", baseFilters = readBaseFilter(
      i,
      "wf-algolia-base-filter",
      (m) => console.warn(`[wf-algolia] ${m}`, i)
    ) ?? [], urlSyncEnabled) {
      let m = readStateFromURL();
      if (m.query || m.mode !== "all" || m.page > 0 || Object.keys(m.filters).length > 0) {
        browseState.query = m.query, browseState.mode = m.mode, browseState.page = m.page, Object.assign(FILTER_STATE, m.filters);
        let g = i.querySelector('[wf-algolia-element="browse-search"]');
        g && m.query && (g.value = m.query);
      }
    }
    let o = () => {
      browseState.page = 0, runBrowseQuery();
    };
    initFilterGroups(o), syncHierarchyVisibility(FILTER_STATE), initDynamicFilters(e, n, runBrowseQuery), initFilterSearch(e, n, runBrowseQuery), initRangeFilters(o), initShowMore(), initModeButtons(
      browseState,
      FILTER_STATE,
      runBrowseQuery,
      t.activeClass,
      browseIndex
    ), initSortSelect(browseState, runBrowseQuery), initSortGroups(browseState, runBrowseQuery, browseIndex);
    let l = i.querySelector('[wf-algolia-element="browse-search"]');
    l && l.addEventListener(
      "input",
      debounce((m) => {
        browseState.query = m.target.value.trim(), browseState.page = 0, runBrowseQuery();
      }, t.debounce)
    );
    let s = i.getAttribute("wf-algolia-pagination") || "load-more";
    paginationMode = s === "infinite-scroll" || s === "numbered" ? s : "load-more";
    let c = paginationMode === "load-more";
    if (document.querySelector('[wf-algolia-element="page-next"]')?.addEventListener("click", () => {
      browseState.page++, runBrowseQuery(c);
    }), document.querySelector('[wf-algolia-element="page-prev"]')?.addEventListener("click", () => {
      browseState.page > 0 && (browseState.page--, runBrowseQuery());
    }), document.querySelector('[wf-algolia-button="reset"]')?.addEventListener("click", () => {
      browseState.page = 0, browseState.query = "";
      let m = i.querySelector('[wf-algolia-element="browse-search"]');
      m && (m.value = ""), clearAllFilters(() => runBrowseQuery());
    }), document.querySelectorAll('[wf-algolia-button="apply"]').forEach((m) => {
      m.addEventListener("click", () => {
        let g = resolveApplyTargetFields(m);
        g.length !== 0 && (commitStaging(g), browseState.page = 0, runBrowseQuery());
      });
    }), document.querySelectorAll('[wf-algolia-button="apply-cancel"]').forEach((m) => {
      m.addEventListener("click", () => {
        let g = resolveApplyTargetFields(m);
        discardStaging(g.length > 0 ? g : void 0), syncFilterDOM();
      });
    }), window.addEventListener("popstate", () => {
      if (discardStaging(), resetSortOnPopState(browseIndex), !urlSyncEnabled)
        return;
      let m = readStateFromURL();
      browseState.query = m.query, browseState.mode = m.mode, browseState.page = m.page, Object.keys(FILTER_STATE).forEach((u) => delete FILTER_STATE[u]), Object.assign(FILTER_STATE, m.filters), syncHierarchyVisibility(FILTER_STATE);
      let g = document.querySelector('[wf-algolia-element="browse-search"]');
      g && (g.value = m.query), runBrowseQuery();
    }), on("refresh", () => runBrowseQuery()), on("filter:parent-change", (m) => {
      let g = collectDescendants(m.parentGroupId);
      g.length !== 0 && g.forEach((u) => {
        delete FILTER_STATE[u.childField];
        let h = getAncestorSelections(u, FILTER_STATE);
        h.length === u.depth ? (clearParentEmptyBehavior(u.childEl, u.whenParentEmpty), refreshChildGroup(
          browseClient,
          browseElements,
          u.childEl,
          h
        ).catch((y) => {
          console.warn("[wf-algolia] refreshChildGroup failed:", y), emit("error", y);
        })) : (applyParentEmptyBehavior(u.childEl, u.whenParentEmpty), u.childEl.querySelectorAll(".wf-algolia-injected").forEach((y) => y.remove()));
      });
    }), on("filter:parent-stage-change", (m) => {
      let g = getAllChildLinks().filter((h) => h.parentField === m.field);
      if (g.length === 0) return;
      let u = {
        ...FILTER_STATE,
        ...STAGING_STATE
      };
      g.forEach((h) => {
        let y = getAncestorSelections(h, u);
        y.length === h.depth ? (clearParentEmptyBehavior(h.childEl, h.whenParentEmpty), refreshChildGroup(browseClient, browseElements, h.childEl, y).catch(
          (b) => {
            console.warn(
              "[wf-algolia] refreshChildGroup (staged) failed:",
              b
            ), emit("error", b);
          }
        )) : (applyParentEmptyBehavior(h.childEl, h.whenParentEmpty), h.childEl.querySelectorAll(".wf-algolia-injected").forEach((b) => b.remove()));
      });
    }), setIndexNameResolver(
      () => getCurrentSort() || browseState.sort || (browseState.mode !== "all" ? browseState.mode : browseIndex)
    ), await runBrowseQuery(), paginationMode === "infinite-scroll") {
      let m = i.querySelector('[wf-algolia-element="results"]');
      m && initInfiniteScroll(m, async () => {
        browseState.page++, await runBrowseQuery(true);
      });
    }
  }
  function resolveApplyTargetFields(e) {
    let t = e.getAttribute("wf-algolia-fields");
    if (t !== null)
      return t.split(",").map((i) => i.trim()).filter(Boolean);
    let n = e.closest('[wf-algolia-element="filter-group"]');
    if (n) {
      let i = n.getAttribute("wf-algolia-field");
      return i ? [i] : [];
    }
    let r = e.closest('[wf-algolia-element="browse"]');
    return r ? Array.from(
      r.querySelectorAll(
        '[wf-algolia-element="filter-group"][wf-algolia-apply-mode="deferred"]'
      )
    ).map((i) => i.getAttribute("wf-algolia-field")).filter((i) => !!i) : [];
  }
  function buildPerIndexFilters() {
    let e = {}, t = /* @__PURE__ */ new Map();
    document.querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-index]').forEach((n) => {
      let r = n.getAttribute("wf-algolia-field"), i = n.getAttribute("wf-algolia-index");
      r && i && t.set(r, i);
    });
    for (let n of modeIndexes) {
      let r = {};
      Object.entries(FILTER_STATE).forEach(([i, o]) => {
        let l = t.get(i);
        (!l || l === n) && (r[i] = o);
      }), e[n] = stateToAlgoliaFilters(r);
    }
    return e;
  }
  function refreshFromPageZero() {
    browseState.page = 0, runBrowseQuery();
  }
  function runBrowseQuery(e = false) {
    renderSelectedCounts(FILTER_STATE), renderSelectedValues(FILTER_STATE);
    let t = document.querySelector(
      '[wf-algolia-element="browse"] [wf-algolia-element="results"]'
    ), n = t ? findTemplateFor(t, browseElements) : null, r = document.querySelector(
      '[wf-algolia-element="browse"] [wf-algolia-element="loader"]'
    ), i = document.querySelector(
      '[wf-algolia-element="browse"] [wf-algolia-element="no-results"]'
    );
    return !t || !n ? Promise.resolve() : (showElement(r), browseState.mode === "all" && !browseState.sort && !getCurrentSort() ? runFederatedQuery(t, n, r, i, e) : runSingleIndexQuery(t, n, r, i, e));
  }
  function runSingleIndexQuery(e, t, n, r, i) {
    let { facetFilters: o, numericFilters: l } = stateToAlgoliaFilters(FILTER_STATE), s = getCurrentSort() || browseState.sort || (browseState.mode !== "all" ? browseState.mode : browseIndex), c = withBaseFilters(o), m = {
      hitsPerPage: browseState.hitsPerPage,
      page: browseState.page,
      facets: ["*"],
      facetFilters: c,
      numericFilters: l,
      clickAnalytics: true,
      attributesToSnippet: snippetParam(
        browseConfig.snippetWords,
        browseConfig.snippetAttrs
      )
    };
    return searchWithMiddleware(
      m,
      (g) => browseClient.initIndex(s).search(browseState.query || "", g)
    ).then((g) => {
      hideElement(n);
      let u = g.hits.map((h) => ({
        ...h,
        __queryID: g.queryID,
        __indexName: s
      }));
      i || removeInjected(e), u.length === 0 && !i ? showElement(r) : (hideElement(r), renderHits(e, t, u, i, browseConfig)), syncFacetCounts(g.facets || {}), syncDynamicFacetCounts(g.facets || {}), toggleGroupsByFacetPresence(g.facets || {}), syncFilterDOM(), renderFilterTags(FILTER_STATE, browseElements, refreshFromPageZero), syncResultsCount(g.nbHits, g.nbPages), renderPaginationControls(g.nbPages), emit("results", g);
    }).catch((g) => {
      hideElement(n), console.error("[wf-algolia] Browse query failed:", g), emit("error", g);
    });
  }
  function runFederatedQuery(e, t, n, r, i) {
    let o = buildPerIndexFilters(), l = Math.ceil(browseState.hitsPerPage / modeIndexes.length), s = modeIndexes.map((c) => {
      let m = o[c] || {
        facetFilters: [],
        numericFilters: []
      }, g = withBaseFilters(m.facetFilters);
      return {
        indexName: c,
        query: browseState.query || "",
        params: {
          hitsPerPage: l,
          page: browseState.page,
          facets: ["*"],
          facetFilters: g,
          numericFilters: m.numericFilters,
          clickAnalytics: true,
          attributesToSnippet: snippetParam(
            browseConfig.snippetWords,
            browseConfig.snippetAttrs
          )
        }
      };
    });
    return multiQueryWithMiddleware(browseClient, s).then(({ results: c }) => {
      hideElement(n);
      let m = [], g = {}, u = 0, h = 0;
      c.forEach((y, b) => {
        let w = modeIndexes[b], E = y.hits.map((T) => ({
          ...T,
          __queryID: y.queryID,
          __indexName: w
        }));
        m.push(...E), u += y.nbHits, h = Math.max(h, y.nbPages), y.facets && Object.entries(y.facets).forEach(([T, k]) => {
          let D = g[T] ?? (g[T] = {});
          Object.entries(k).forEach(([K, C]) => {
            D[K] = (D[K] ?? 0) + C;
          });
        });
      }), i || removeInjected(e), m.length === 0 && !i ? showElement(r) : (hideElement(r), renderHits(e, t, m, i, browseConfig)), syncFacetCounts(g), syncDynamicFacetCounts(g), toggleGroupsByFacetPresence(g), syncFilterDOM(), renderFilterTags(FILTER_STATE, browseElements, refreshFromPageZero), syncResultsCount(u, h), renderPaginationControls(h), emit("results", {
        results: c,
        nbHits: u,
        nbPages: h
      });
    }).catch((c) => {
      hideElement(n), console.error("[wf-algolia] Browse multi-query failed:", c), emit("error", c);
    });
  }
  function snippetParam(e, t) {
    return buildSnippetParam(e, t);
  }
  var DEFAULT_PAGE_WINDOW = 5;
  function getPageWindow(e) {
    if (!e) return DEFAULT_PAGE_WINDOW;
    let t = e.getAttribute("wf-algolia-page-window");
    if (t === null || t === "") return DEFAULT_PAGE_WINDOW;
    let n = parseInt(t, 10);
    return Number.isNaN(n) ? DEFAULT_PAGE_WINDOW : Math.max(1, n);
  }
  function renderResultsCount(e, t) {
    let n = getTextTemplate(e, "Showing {shown} of {total}");
    e.textContent = interpolate(n, {
      shown: t.shown,
      total: t.total,
      count: t.total,
      page: t.page,
      pages: t.pages
    });
  }
  function renderPageInfo(e, t) {
    let n = getTextTemplate(e, "Page {page} of {pages}");
    e.textContent = interpolate(n, t);
  }
  function clonePageNumber(e, t, n) {
    let r = e.cloneNode(true);
    return r.style.display = "", r.classList.add("wf-algolia-page-num"), r.removeAttribute("wf-algolia-element"), r.textContent = String(t + 1), n && r.setAttribute("data-wf-algolia-active", "true"), r;
  }
  function syncResultsCount(e, t) {
    document.querySelectorAll('[wf-algolia-element="results-count"]').forEach((n) => {
      let r = Math.min(e, (browseState.page + 1) * browseState.hitsPerPage);
      renderResultsCount(n, {
        shown: r,
        total: e,
        page: browseState.page + 1,
        pages: t
      });
    });
  }
  function renderPaginationControls(e) {
    let t = document.querySelector('[wf-algolia-element="page-prev"]'), n = document.querySelector('[wf-algolia-element="page-next"]');
    t && (t.style.display = browseState.page > 0 ? "" : "none"), n && (n.style.display = browseState.page < e - 1 ? "" : "none"), document.querySelectorAll('[wf-algolia-element="page-info"]').forEach((i) => {
      renderPageInfo(i, {
        page: browseState.page + 1,
        pages: e
      });
    });
    let r = document.querySelector('[wf-algolia-element="page-number"]');
    if (r) {
      let i = r.parentElement;
      if (i) {
        i.querySelectorAll(".wf-algolia-page-num").forEach((m) => m.remove()), r.style.display = "none";
        let o = document.querySelector('[wf-algolia-element="browse"]'), l = getPageWindow(o), s = Math.max(0, browseState.page - Math.floor(l / 2)), c = Math.min(e, s + l);
        s = Math.max(0, c - l);
        for (let m = s; m < c; m++) {
          let g = clonePageNumber(r, m, m === browseState.page);
          g.addEventListener("click", () => {
            browseState.page = m, runBrowseQuery();
          }), n ? i.insertBefore(g, n) : i.appendChild(g);
        }
      }
    }
    urlSyncEnabled && writeStateToURL({
      query: browseState.query,
      mode: browseState.mode,
      page: browseState.page,
      filters: FILTER_STATE,
      pagination: paginationMode
    }), browseState.topOffset && browseState.page > 0 && window.scrollTo({
      top: browseState.topOffset,
      behavior: "smooth"
    });
  }
  function initAccessibility(e) {
    (e.get("search-input") || []).forEach((t) => {
      t.setAttribute("role", "searchbox"), t.getAttribute("aria-label") || t.setAttribute("aria-label", "Search");
    }), (e.get("browse-search") || []).forEach((t) => {
      t.setAttribute("role", "searchbox"), t.getAttribute("aria-label") || t.setAttribute("aria-label", "Search");
    }), ["results", "autocomplete"].forEach((t) => {
      (e.get(t) || []).forEach((n) => {
        n.setAttribute("role", "listbox"), n.getAttribute("aria-label") || n.setAttribute("aria-label", "Search results");
      });
    }), (e.get("results-count") || []).forEach((t) => {
      t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite");
    }), (e.get("no-results") || []).forEach((t) => {
      t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite");
    }), (e.get("mode-btn") || []).forEach((t) => {
      t.setAttribute("role", "tab"), t.setAttribute("tabindex", "0"), t.addEventListener("keydown", (n) => {
        (n.key === "Enter" || n.key === " ") && (n.preventDefault(), t.click());
      });
    }), document.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((t) => {
      t.querySelector("input") || (t.setAttribute("role", "button"), t.setAttribute("tabindex", "0"));
    });
  }
  var clientSingleton = null;
  function initClient(e) {
    return clientSingleton || (clientSingleton = (0, import_algoliasearch.default)(e.appId, e.searchKey)), clientSingleton;
  }
  var TAG_NAME_RE = /^[a-z][a-z0-9-]*$/;
  function initConfig() {
    let e = document.querySelector("script[data-app-id]");
    if (!e)
      throw new Error("[wf-algolia] Script tag missing data-app-id attribute");
    let t = e.getAttribute("data-app-id");
    t && console.log(
      `%c[wf-algolia] Script initialized with App ID: ${t} at ${(/* @__PURE__ */ new Date()).toISOString()}`,
      "font-size:1.5em; font-weight:bold; color:#76B900;"
    );
    let n = e.getAttribute("data-app-id"), r = e.getAttribute("data-search-key");
    if (!n || !r)
      throw new Error(
        "[wf-algolia] data-app-id and data-search-key are required"
      );
    let i = e.getAttribute("data-highlight-tag") || "mark", o = TAG_NAME_RE.test(i) ? i : "mark";
    return {
      appId: n,
      searchKey: r,
      insights: e.getAttribute("data-insights") === "true",
      insightsCookie: e.getAttribute("data-insights-cookie") === "true",
      debounce: parseInt(e.getAttribute("data-debounce") || "250"),
      autocompleteDebounce: parseInt(
        e.getAttribute("data-autocomplete-debounce") || e.getAttribute("data-debounce") || "150"
      ),
      highlightTag: o,
      snippetWords: (() => {
        let l = e.getAttribute("data-snippet-words");
        if (l === null) return 30;
        let s = parseInt(l, 10);
        return Number.isNaN(s) ? 30 : Math.max(1, s);
      })(),
      snippetAttrs: e.getAttribute("data-snippet-attrs") || "*",
      activeClass: e.getAttribute("data-activeclass") || "is-active",
      hideClass: e.getAttribute("data-hideclass") || "is-hidden"
    };
  }
  var TEMPLATE_ROLES = [
    "filter-template",
    "template",
    "filter-tag-template",
    "autocomplete-template"
  ];
  var SLOT_ROLES = ["filter-value-text", "filter-count"];
  function resolveFieldScope(e) {
    let t = e.getAttribute("wf-algolia-field") || e.getAttribute("wf-algolia-facet");
    if (t) return t;
    let n = e.closest("[wf-algolia-field], [wf-algolia-facet]");
    return !n || n === e ? null : n.getAttribute("wf-algolia-field") || n.getAttribute("wf-algolia-facet") || null;
  }
  function collectFilterGroups(e) {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
      let r = n.getAttribute("wf-algolia-field") || n.getAttribute("wf-algolia-facet");
      r && t.push({
        el: n,
        field: r
      });
    }), t;
  }
  function makeIssue(e, t, n, r, i) {
    return {
      ruleId: e,
      severity: t,
      element: n,
      message: r,
      fix: i
    };
  }
  var ruleFilterItemOrphan = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((n) => {
      resolveFieldScope(n) || t.push(
        makeIssue(
          "filter-item-orphan",
          "error",
          n,
          "filter-item has no resolvable filter scope.",
          'Wrap in a `wf-algolia-field="\u2026"` container or add `wf-algolia-field="\u2026"` to the item.'
        )
      );
    }), t;
  };
  var ruleFilterGroupMissingField = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
      n.getAttribute("wf-algolia-field") || n.getAttribute("wf-algolia-facet") || t.push(
        makeIssue(
          "filter-group-missing-field",
          "error",
          n,
          "filter-group is missing the field it controls.",
          'Add `wf-algolia-field="<facet>"` (or `wf-algolia-facet` for dynamic groups).'
        )
      );
    }), t;
  };
  var ruleFilterSearchOrphan = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="filter-search"]').forEach((n) => {
      resolveFieldScope(n) || t.push(
        makeIssue(
          "filter-search-orphan",
          "error",
          n,
          "filter-search input has no resolvable filter scope.",
          'Place inside a `wf-algolia-field="\u2026"` wrapper or add `wf-algolia-field="\u2026"` to the input.'
        )
      );
    }), t;
  };
  var ruleFilterSearchResultsOrphan = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="filter-search-results"]').forEach((n) => {
      let r = resolveFieldScope(n);
      if (!r) {
        t.push(
          makeIssue(
            "filter-search-results-orphan",
            "error",
            n,
            "filter-search-results has no resolvable filter scope.",
            'Place inside the same `wf-algolia-field="\u2026"` wrapper as the matching filter-search input.'
          )
        );
        return;
      }
      Array.from(
        e.querySelectorAll('[wf-algolia-element="filter-search"]')
      ).filter((o) => resolveFieldScope(o) === r).length === 0 && t.push(
        makeIssue(
          "filter-search-results-orphan",
          "error",
          n,
          `filter-search-results for field "${r}" has no matching filter-search input on the page.`,
          'Add a `wf-algolia-element="filter-search"` input inside the same field wrapper.'
        )
      );
    }), t;
  };
  var ruleDuplicateFieldWrapper = (e) => {
    let t = [], n = /* @__PURE__ */ new Map();
    return collectFilterGroups(e).forEach(({ el: r, field: i }) => {
      n.get(i) ? t.push(
        makeIssue(
          "duplicate-filter-field-wrapper",
          "error",
          r,
          `Another filter-group on this page already declares field "${i}".`,
          "Merge into one filter-group, or rename one of the fields."
        )
      ) : n.set(i, r);
    }), t;
  };
  var ruleTemplateNotDirectChild = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="filter-template"]').forEach((n) => {
      let r = n.parentElement;
      r && r.getAttribute("wf-algolia-element") !== "filter-group" && t.push(
        makeIssue(
          "filter-template-not-direct-child",
          "error",
          n,
          "filter-template is not a direct child of its filter-group.",
          "Move the template up one level so it is a direct child of the filter-group."
        )
      );
    }), t;
  };
  var ruleFieldButNoRole = (e) => {
    let t = [];
    return e.querySelectorAll("[wf-algolia-field]").forEach((n) => {
      n.hasAttribute("wf-algolia-element") || n.querySelector("[wf-algolia-element]") || t.push(
        makeIssue(
          "field-but-no-role",
          "warn",
          n,
          "Element has `wf-algolia-field` but no `wf-algolia-element` role.",
          "Either remove the field attribute (if unused) or add the role you intended."
        )
      );
    }), t;
  };
  var ruleRoleButNoField = (e) => {
    let t = [], n = /* @__PURE__ */ new Set([
      "filter-group",
      "filter-item",
      "filter-search",
      "filter-search-results",
      "filter-template"
    ]);
    return e.querySelectorAll("[wf-algolia-element]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-element");
      n.has(i) && i !== "filter-template" && i !== "filter-group" && (resolveFieldScope(r) || t.push(
        makeIssue(
          "role-but-no-field",
          "warn",
          r,
          `Element role "${i}" resolves to no field.`,
          'Wrap in a `wf-algolia-field="\u2026"` container or add the field attribute directly.'
        )
      ));
    }), t;
  };
  var ruleConflictingType = (e) => {
    let t = [];
    return e.querySelectorAll(
      '[wf-algolia-element="filter-group"][wf-algolia-type]'
    ).forEach((n) => {
      let r = n.getAttribute("wf-algolia-type");
      if (r !== "checkbox" && r !== "radio") return;
      let i = Array.from(
        n.querySelectorAll('[wf-algolia-element="filter-item"]')
      );
      if (i.length === 0) return;
      let o = i.filter((c) => !!c.querySelector('input[type="radio"]')), l = i.filter((c) => !!c.querySelector('input[type="checkbox"]'));
      if (o.length === 0 && l.length === 0) return;
      let s = (c) => (c === "radio" ? o.length : l.length) === i.length && (c === "radio" ? l.length : o.length) === 0;
      r === "checkbox" && s("radio") && t.push(
        makeIssue(
          "conflicting-type",
          "warn",
          n,
          'filter-group declares type="checkbox" but every filter-item contains a radio input.',
          'Set `wf-algolia-type="radio"` (or change the inputs to checkboxes).'
        )
      ), r === "radio" && s("checkbox") && t.push(
        makeIssue(
          "conflicting-type",
          "warn",
          n,
          'filter-group declares type="radio" but every filter-item contains a checkbox input.',
          'Set `wf-algolia-type="checkbox"` (or change the inputs to radios).'
        )
      );
    }), t;
  };
  var ruleHitPreviewNestedInBrowse = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
      n.closest('[wf-algolia-element="browse"]') && t.push(
        makeIssue(
          "hit-preview-nested-in-browse",
          "error",
          n,
          "hit-preview is nested inside a browse element.",
          "Move hit-preview outside the browse wrapper."
        )
      );
    }), t;
  };
  var ruleHitPreviewNoTemplate = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
      n.querySelector(
        "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]"
      ) || t.push(
        makeIssue(
          "hit-preview-no-template",
          "error",
          n,
          "hit-preview has no descendant carrying a bind attribute.",
          "Add a child with `wf-algolia-text` / `wf-algolia-image` / `wf-algolia-hit-link-template`."
        )
      );
    }), t;
  };
  var ruleHitPreviewMissingFieldValue = (e) => {
    let t = [];
    return e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
      n.hasAttribute("wf-algolia-field") && n.hasAttribute("wf-algolia-value") || n.closest('[wf-algolia-element="scope-facet"]') || n.closest('[wf-algolia-element="filter-item"]') || t.push(
        makeIssue(
          "hit-preview-missing-field-value",
          "error",
          n,
          "hit-preview has no own (field, value) pair and no scope-facet / filter-item ancestor.",
          "Add `wf-algolia-field` + `wf-algolia-value`, or wrap in a `scope-facet`."
        )
      );
    }), t;
  };
  var ruleRefinesTargetMissing = (e) => {
    let t = [], n = /* @__PURE__ */ new Set();
    return e.querySelectorAll("[wf-algolia-group-id]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-group-id");
      i && n.add(i);
    }), e.querySelectorAll("[wf-algolia-refines]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-refines");
      i && (n.has(i) || t.push(
        makeIssue(
          "refines-target-missing",
          "error",
          r,
          `wf-algolia-refines="${i}" points at a group-id that does not exist on this page.`,
          "Add the parent group with the matching `wf-algolia-group-id`, or fix the refines value."
        )
      ));
    }), t;
  };
  var ruleDuplicateGroupId = (e) => {
    let t = [], n = /* @__PURE__ */ new Map();
    return e.querySelectorAll("[wf-algolia-group-id]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-group-id");
      if (!i) return;
      n.get(i) ? t.push(
        makeIssue(
          "duplicate-group-id",
          "error",
          r,
          `Another element on this page already declares wf-algolia-group-id="${i}".`,
          "Rename one of the duplicate group ids."
        )
      ) : n.set(i, r);
    }), t;
  };
  var ruleCascadeCollision = (e) => {
    let t = [], n = e instanceof Document ? e : e.ownerDocument ?? null;
    return n && [n.body, n.documentElement].forEach((i) => {
      i && i.hasAttribute("wf-algolia-index") && t.push(
        makeIssue(
          "cascade-collision",
          "warn",
          i,
          "`wf-algolia-index` is set on <body> or <html>, overriding every Browse / Detail / Search on the page.",
          "Move the index attribute to a smaller ancestor that scopes only the relevant section."
        )
      );
    }), t;
  };
  var ruleDataAlgoliaOnCanvas = (e) => {
    let t = [];
    return e.querySelectorAll("*").forEach((n) => {
      if (n.tagName.toLowerCase() !== "script") {
        for (let r of Array.from(n.attributes))
          if (r.name.startsWith("data-algolia-")) {
            t.push(
              makeIssue(
                "data-asterisk-on-canvas",
                "error",
                n,
                `Canvas element has \`${r.name}\` \u2014 canvas uses the \`wf-algolia-*\` namespace.`,
                `Rename \`${r.name}\` to \`wf-${r.name.slice(5)}\`.`
              )
            );
            return;
          }
      }
    }), t;
  };
  var ruleWfAlgoliaOnScriptTag = (e) => {
    let t = [];
    return e.querySelectorAll("script").forEach((n) => {
      for (let r of Array.from(n.attributes))
        if (r.name.startsWith("wf-algolia-")) {
          t.push(
            makeIssue(
              "wf-algolia-on-script-tag",
              "error",
              n,
              `<script> tag has \`${r.name}\` \u2014 script-tag attributes use the \`data-*\` namespace.`,
              `Rename \`${r.name}\` to \`data-${r.name.slice(11)}\`.`
            )
          );
          return;
        }
    }), t;
  };
  var ruleTemplateNotHidden = (e) => {
    let t = [];
    return TEMPLATE_ROLES.forEach((n) => {
      e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
        r.hasAttribute("hidden") || r.style && r.style.display === "none" || t.push(
          makeIssue(
            "template-not-hidden",
            "warn",
            r,
            `Template element (${n}) is not hidden \u2014 visitors may briefly see the prototype.`,
            "Set Display: None on the template in the Designer Style panel (or add the `hidden` attribute)."
          )
        );
      });
    }), t;
  };
  var ruleSlotWithoutTemplateParent = (e) => {
    let t = [];
    return SLOT_ROLES.forEach((n) => {
      e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
        let i = TEMPLATE_ROLES.map((o) => `[wf-algolia-element="${o}"]`).join(
          ", "
        );
        r.closest(i) || t.push(
          makeIssue(
            "slot-without-template-parent",
            "warn",
            r,
            `Slot role "${n}" is not inside any template element.`,
            "Move into a template (filter-template / template / filter-tag-template / autocomplete-template)."
          )
        );
      });
    }), t;
  };
  var ruleFieldPointerUndefined = (e) => {
    let t = [], n = new Set(collectFilterGroups(e).map((r) => r.field));
    return e.querySelectorAll("[wf-algolia-field]").forEach((r) => {
      if (r.getAttribute("wf-algolia-element") === "filter-group") return;
      let i = r.getAttribute("wf-algolia-field");
      if (!i) return;
      let o = r.closest('[wf-algolia-element="filter-group"]');
      o && (o.getAttribute("wf-algolia-field") === i || o.getAttribute("wf-algolia-facet") === i) || n.has(i) || t.push(
        makeIssue(
          "field-pointer-to-undefined-filter",
          "error",
          r,
          `Element points at field "${i}" but no filter-group on this page declares that field.`,
          "Either author the filter-group, or fix the field pointer."
        )
      );
    }), t;
  };
  var ruleDuplicateFieldPointer = (e) => {
    let t = [], n = /* @__PURE__ */ new Map();
    return e.querySelectorAll("[wf-algolia-field][wf-algolia-element]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-element"), o = r.getAttribute("wf-algolia-field");
      if (!i || !o) return;
      let l = r.closest('[wf-algolia-element="filter-group"]');
      if (l && (l.getAttribute("wf-algolia-field") === o || l.getAttribute("wf-algolia-facet") === o) || i === "filter-group")
        return;
      let s = `${i}::${o}`;
      n.get(s) ? t.push(
        makeIssue(
          "duplicate-field-pointer-same-role",
          "warn",
          r,
          `Another cross-scope element on this page already declares role="${i}" + field="${o}".`,
          "Confirm intentional; otherwise remove the duplicate."
        )
      ) : n.set(s, r);
    }), t;
  };
  var ALL_RULES = [
    ruleFilterItemOrphan,
    ruleFilterGroupMissingField,
    ruleFilterSearchOrphan,
    ruleFilterSearchResultsOrphan,
    ruleDuplicateFieldWrapper,
    ruleTemplateNotDirectChild,
    ruleFieldButNoRole,
    ruleRoleButNoField,
    ruleConflictingType,
    ruleHitPreviewNestedInBrowse,
    ruleHitPreviewNoTemplate,
    ruleHitPreviewMissingFieldValue,
    ruleRefinesTargetMissing,
    ruleDuplicateGroupId,
    ruleCascadeCollision,
    ruleDataAlgoliaOnCanvas,
    ruleWfAlgoliaOnScriptTag,
    ruleTemplateNotHidden,
    ruleSlotWithoutTemplateParent,
    ruleFieldPointerUndefined,
    ruleDuplicateFieldPointer
  ];
  function runAudit(e, t = ALL_RULES) {
    let n = [];
    for (let r of t) n.push(...r(e));
    return n;
  }
  var DEBUG_ATTR = "data-wf-algolia-debug";
  var ISSUE_ATTR = "data-wf-algolia-issue";
  var DEBUG_LOG_PREFIX = "[wf-algolia debug]";
  function isDebugEnabled(e = document) {
    let t = e.querySelector(`script[${DEBUG_ATTR}]`);
    return t ? t.getAttribute(DEBUG_ATTR) === "true" : false;
  }
  var OBSERVED_ATTRS = [
    "wf-algolia-element",
    "wf-algolia-field",
    "wf-algolia-facet",
    "wf-algolia-value",
    "wf-algolia-index",
    "wf-algolia-type",
    "wf-algolia-match",
    "wf-algolia-group-id",
    "wf-algolia-refines",
    "wf-algolia-text",
    "wf-algolia-image",
    "wf-algolia-hit-link-template"
  ];
  function newSeenMap() {
    return /* @__PURE__ */ new Map();
  }
  function alreadyReported(e, t) {
    let n = e.get(t.ruleId);
    return n || (n = /* @__PURE__ */ new WeakSet(), e.set(t.ruleId, n)), n.has(t.element) ? true : (n.add(t.element), false);
  }
  function tagIssue(e, t) {
    let n = e.getAttribute(ISSUE_ATTR);
    if (!n) {
      e.setAttribute(ISSUE_ATTR, t);
      return;
    }
    let r = n.split(/\s+/).filter(Boolean);
    r.includes(t) || (r.push(t), e.setAttribute(ISSUE_ATTR, r.join(" ")));
  }
  function logIssue(e) {
    let t = `${DEBUG_LOG_PREFIX} ${e.ruleId}: ${e.message} \u2014 fix: ${e.fix}`;
    e.severity === "error" ? console.error(t, e.element) : console.warn(t, e.element);
  }
  function auditAndLog(e = document, t = newSeenMap(), n = ALL_RULES) {
    let r = runAudit(e, n), i = 0;
    for (let o of r)
      alreadyReported(t, o) || (logIssue(o), tagIssue(o.element, o.ruleId), i += 1);
    return {
      issues: r,
      newlyLogged: i
    };
  }
  var debugStarted = false;
  var debugObserver = null;
  function initDebugAudit(e = document) {
    if (debugStarted || !isDebugEnabled(e)) return null;
    debugStarted = true;
    let t = newSeenMap();
    auditAndLog(e, t);
    let n = false, r = () => {
      if (n) return;
      n = true, (typeof requestAnimationFrame < "u" ? requestAnimationFrame : (s) => setTimeout(() => s(0), 16))(() => {
        n = false, auditAndLog(e, t);
      });
    }, i = new MutationObserver((l) => {
      for (let s of l) {
        if (s.type === "attributes") {
          r();
          return;
        }
        if (s.type === "childList")
          for (let c of [
            ...Array.from(s.addedNodes),
            ...Array.from(s.removedNodes)
          ]) {
            if (c.nodeType !== 1) continue;
            let m = c;
            if (m.hasAttribute?.("wf-algolia-element") || m.hasAttribute?.("wf-algolia-field") || m.hasAttribute?.("wf-algolia-facet") || m.querySelector?.(
              "[wf-algolia-element], [wf-algolia-field], [wf-algolia-facet]"
            )) {
              r();
              return;
            }
          }
      }
    }), o = e.body || e.documentElement;
    return i.observe(o, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: OBSERVED_ATTRS
    }), debugObserver = i, i;
  }
  var STAT_KEYS = ["min", "max", "avg", "sum"];
  var warnedStatNoField = /* @__PURE__ */ new WeakSet();
  var warnedStatBadStat = /* @__PURE__ */ new WeakSet();
  var warnedStatNoIndex = /* @__PURE__ */ new WeakSet();
  var warnedStatNoStats = /* @__PURE__ */ new WeakSet();
  function resolveStatIndex(e) {
    let t = e.getAttribute("wf-algolia-index");
    if (t) return t;
    let n = e.closest("[wf-algolia-index]");
    if (n && n !== e) {
      let i = n.getAttribute("wf-algolia-index");
      if (i) return i;
    }
    return document.querySelector("script[data-app-id]")?.getAttribute("data-index") || "";
  }
  function initFacetStats(e, t) {
    (t.get("facet-stat") ?? []).forEach((r) => void renderFacetStat(e, r));
  }
  function renderFacetStat(e, t) {
    let n = t.getAttribute("wf-algolia-field");
    if (!n)
      return warnedStatNoField.has(t) || (warnedStatNoField.add(t), console.error(
        "[wf-algolia] facet-stat missing required wf-algolia-field.",
        t
      )), Promise.resolve();
    let r = t.getAttribute("wf-algolia-stat");
    if (!r || !STAT_KEYS.includes(r))
      return warnedStatBadStat.has(t) || (warnedStatBadStat.add(t), console.error(
        `[wf-algolia] facet-stat wf-algolia-stat must be one of ${STAT_KEYS.join("|")} (got "${r ?? ""}").`,
        t
      )), Promise.resolve();
    let i = resolveStatIndex(t);
    if (!i)
      return warnedStatNoIndex.has(t) || (warnedStatNoIndex.add(t), console.error(
        "[wf-algolia] facet-stat missing required wf-algolia-index.",
        t
      )), Promise.resolve();
    let o = t.closest(
      "[wf-algolia-base-filter-value], [wf-algolia-base-filter-field], [wf-algolia-base-filter]"
    ) ?? t, l = readBaseFilter(
      o,
      "wf-algolia-base-filter",
      (c) => console.warn(`[wf-algolia] facet-stat ${c}`, t)
    ), s = {
      facets: [n],
      hitsPerPage: 0,
      ...l ? {
        facetFilters: l
      } : {}
    };
    return searchWithMiddleware(s, (c) => e.initIndex(i).search("", c)).then((c) => {
      let g = c.facets_stats?.[n]?.[r];
      if (g == null) {
        warnedStatNoStats.has(t) || (warnedStatNoStats.add(t), console.warn(
          `[wf-algolia] facet-stat: no numeric stats for "${n}" on "${i}". Ensure "${n}" is numeric and listed in attributesForFaceting. Leaving the authored text.`,
          t
        ));
        return;
      }
      let u = t.getAttribute("wf-algolia-format"), h = u ? formatValue(g, u) : String(g), y = getTextTemplate(t, "{value}");
      t.textContent = interpolate(y, {
        value: h
      });
    }).catch((c) => {
      console.error("[wf-algolia] facet-stat query failed:", c);
    });
  }
  var warnedPreviewNoField = /* @__PURE__ */ new WeakSet();
  var warnedPreviewNoValue = /* @__PURE__ */ new WeakSet();
  var warnedPreviewNoTemplate = /* @__PURE__ */ new WeakSet();
  var warnedPreviewInBrowse = /* @__PURE__ */ new WeakSet();
  var warnedPreviewHasFilterTemplate = /* @__PURE__ */ new WeakSet();
  var warnedDuplicatePair = /* @__PURE__ */ new WeakSet();
  var warnedZeroHits = /* @__PURE__ */ new WeakSet();
  var warnedScopeFacetNoField = /* @__PURE__ */ new WeakSet();
  var warnedUnresolvedScopeValue = /* @__PURE__ */ new WeakSet();
  var renderedPairKeys = /* @__PURE__ */ new Map();
  function resolvePreviewFieldValue(e) {
    let t = e.getAttribute("wf-algolia-field"), n = e.getAttribute("wf-algolia-value"), r = null, i = null, o = null, l = true;
    (!t || !n) && (r = e.closest('[wf-algolia-element="scope-facet"]'), r && (i = r.getAttribute("wf-algolia-field"), o = r.getAttribute("wf-algolia-value"), l = i !== null && i !== ""));
    let s = false;
    if (!t && !i) {
      let c = e.closest('[wf-algolia-element="filter-item"]');
      if (c) {
        let m = c.closest('[wf-algolia-element="filter-group"]'), g = m?.getAttribute("wf-algolia-facet") ?? m?.getAttribute("wf-algolia-field") ?? null, u = c.getAttribute("wf-algolia-value");
        g && (i = g), !n && !o && u !== null && (o = u), s = g !== null;
      }
    } else if (!n && !o) {
      let m = e.closest('[wf-algolia-element="filter-item"]')?.getAttribute("wf-algolia-value") ?? null;
      m !== null && (o = m);
    }
    return s && r === null && (l = true), {
      field: t || i || null,
      value: n || o || null,
      scopeFacetEl: r,
      scopeFacetHasField: l
    };
  }
  function resolvePreviewIndex(e) {
    let t = e.getAttribute("wf-algolia-index");
    if (t) return t;
    let n = e.closest("[wf-algolia-index]");
    if (n && n !== e) {
      let o = n.getAttribute("wf-algolia-index");
      if (o) return o;
    }
    return document.querySelector("script[data-app-id]")?.getAttribute("data-index") || "";
  }
  function findPreviewTemplate(e) {
    let t = "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]";
    for (let n of Array.from(e.children)) {
      let r = n;
      if (r.matches(t) || r.querySelector(t)) return r;
    }
    return null;
  }
  function fillLinkTemplate(e, t) {
    return e.replace(/\{([a-zA-Z0-9_.-]+)\}/g, (n, r) => {
      let i = t[r];
      return i == null ? "" : String(i);
    });
  }
  function populatePreviewCard(e, t) {
    e.querySelectorAll("[wf-algolia-text]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-text");
      if (!i) return;
      let o = t[i];
      r.textContent = o == null ? "" : String(o);
    }), e.querySelectorAll("[wf-algolia-image]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-image");
      if (!i) return;
      let o = t[i];
      r.removeAttribute("srcset"), r.removeAttribute("data-src"), r.removeAttribute("data-srcset"), r.src = o == null ? "" : String(o);
    });
    let n = [];
    e.hasAttribute("wf-algolia-hit-link-template") && n.push(e), e.querySelectorAll("[wf-algolia-hit-link-template]").forEach((r) => n.push(r));
    for (let r of n) {
      let i = r.getAttribute("wf-algolia-hit-link-template");
      if (!i) continue;
      let o = fillLinkTemplate(i, t);
      r instanceof HTMLAnchorElement ? r.setAttribute("href", o) : r.setAttribute("data-wf-algolia-href", o);
    }
  }
  function isInsideHitPreview(e) {
    return e ? e.closest('[wf-algolia-element="hit-preview"]') !== null : false;
  }
  var clickTrapInstalled = false;
  function installClickTrap() {
    clickTrapInstalled || (clickTrapInstalled = true, document.addEventListener(
      "click",
      (e) => {
        let t = e.target;
        isInsideHitPreview(t) && e.stopPropagation();
      },
      true
    ));
  }
  var PREVIEW_BATCH_SIZE = 50;
  function chunkQueries(e, t) {
    let n = [];
    for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
    return n;
  }
  async function batchedPreviewFetch(e, t, n) {
    let r = t.map((s) => ({
      indexName: s.indexName,
      query: "",
      params: {
        facetFilters: [[`${s.field}:${s.value}`]],
        hitsPerPage: s.hitsPerPreview
      }
    })), i = chunkQueries(r, PREVIEW_BATCH_SIZE), o = await Promise.all(
      i.map(async (s) => {
        try {
          return (await e.multipleQueries(s)).results;
        } catch (c) {
          return console.error(`[wf-algolia] ${n} batched fetch failed:`, c), null;
        }
      })
    ), l = [];
    return o.forEach((s, c) => {
      let m = i[c];
      for (let g = 0; g < m.length; g++)
        l.push(
          s === null ? null : s[g] ?? {
            hits: []
          }
        );
    }), l;
  }
  async function initHitPreviews(e, t) {
    let n = t.get("hit-preview") ?? [];
    if (n.length === 0) return;
    installClickTrap();
    let r = /* @__PURE__ */ new Set();
    (t.get("filter-template") ?? []).forEach((c) => {
      let m = getTemplateParent(c);
      m && r.add(m);
    });
    let i = Array.from(
      document.querySelectorAll('[wf-algolia-element="filter-template"]')
    ), o = [], l = /* @__PURE__ */ new Map();
    for (let c of n) {
      if (!c.isConnected) continue;
      let m = resolvePreviewFieldValue(c);
      if (m.scopeFacetEl && !m.scopeFacetHasField) {
        let C = m.scopeFacetEl;
        warnedScopeFacetNoField.has(C) || (warnedScopeFacetNoField.add(C), console.error(
          "[wf-algolia] scope-facet ancestor is missing required wf-algolia-field attribute.",
          C
        ));
        continue;
      }
      let { field: g, value: u, scopeFacetEl: h } = m;
      if (!g) {
        warnedPreviewNoField.has(c) || (warnedPreviewNoField.add(c), console.error(
          "[wf-algolia] hit-preview is missing required wf-algolia-field attribute.",
          c
        ));
        continue;
      }
      if (!u) {
        if (h) {
          warnedUnresolvedScopeValue.has(c) || (warnedUnresolvedScopeValue.add(c), console.warn(
            "[wf-algolia] hit-preview scope-facet value is unresolved at init \u2014 will render once the parent (standalone-filter-groups) populates the wf-algolia-value attribute.",
            c
          ));
          continue;
        }
        warnedPreviewNoValue.has(c) || (warnedPreviewNoValue.add(c), console.error(
          "[wf-algolia] hit-preview is missing required wf-algolia-value attribute.",
          c
        ));
        continue;
      }
      let y = c.closest('[wf-algolia-element="browse"]');
      if (y && y !== c) {
        warnedPreviewInBrowse.has(c) || (warnedPreviewInBrowse.add(c), console.error(
          '[wf-algolia] hit-preview cannot be nested inside a wf-algolia-element="browse" container.',
          c
        ));
        continue;
      }
      let b = i.some((C) => C !== c && c.contains(C)), w = Array.from(r).some((C) => C !== c && c.contains(C));
      if (b || w) {
        warnedPreviewHasFilterTemplate.has(c) || (warnedPreviewHasFilterTemplate.add(c), console.error(
          '[wf-algolia] hit-preview cannot contain a wf-algolia-element="filter-template" descendant.',
          c
        ));
        continue;
      }
      let E = findPreviewTemplate(c);
      if (!E) {
        warnedPreviewNoTemplate.has(c) || (warnedPreviewNoTemplate.add(c), console.error(
          "[wf-algolia] hit-preview has no card template \u2014 add at least one descendant with wf-algolia-text, wf-algolia-image, or wf-algolia-hit-link-template.",
          c
        ));
        continue;
      }
      let T = c.getAttribute("wf-algolia-hits-per-preview"), k = 3;
      if (T !== null) {
        let C = parseInt(T, 10);
        !Number.isNaN(C) && C > 0 && (k = C);
      }
      let D = resolvePreviewIndex(c), K = `${g}::${u}`;
      l.has(K) ? warnedDuplicatePair.has(c) || (warnedDuplicatePair.add(c), console.warn(
        `[wf-algolia] hit-preview duplicate (field, value) pair "${g}=${u}" \u2014 multiple previews share the same filter.`,
        c
      )) : l.set(K, c), o.push({
        el: c,
        field: g,
        value: u,
        hitsPerPreview: k,
        indexName: D,
        template: E
      });
    }
    if (o.length === 0) return;
    let s = await batchedPreviewFetch(e, o, "hit-preview");
    o.forEach((c, m) => {
      let g = s[m];
      if (g == null) return;
      let u = g.hits ?? [];
      if (u.length === 0) {
        warnedZeroHits.has(c.el) || (warnedZeroHits.add(c.el), console.warn(
          `[wf-algolia] hit-preview returned zero hits for "${c.field}=${c.value}".`,
          c.el
        )), c.template.style.display = "none", renderedPairKeys.set(c.el, previewKey(c));
        return;
      }
      let h = c.template.parentElement ?? c.el, y = document.createDocumentFragment();
      for (let b of u) {
        let w = c.template.cloneNode(true);
        w.setAttribute("data-wf-algolia-hit-preview", "true"), w.classList.add("wf-algolia-injected"), w.style.display = "", populatePreviewCard(w, b), y.appendChild(w);
      }
      h.appendChild(y), c.template.style.display = "none", renderedPairKeys.set(c.el, previewKey(c));
    });
  }
  function previewKey(e) {
    return `${e.indexName}::${e.field}::${e.value}::${e.hitsPerPreview}`;
  }
  function clearPreviewCards(e) {
    e.querySelectorAll('[data-wf-algolia-hit-preview="true"]').forEach(
      (t) => t.remove()
    );
  }
  async function refreshHitPreviews(e) {
    let t = Array.from(
      document.querySelectorAll('[wf-algolia-element="hit-preview"]')
    );
    if (t.length === 0) return;
    let n = [];
    for (let i of t) {
      let o = resolvePreviewFieldValue(i);
      if (o.scopeFacetEl && !o.scopeFacetHasField) {
        let b = o.scopeFacetEl;
        warnedScopeFacetNoField.has(b) || (warnedScopeFacetNoField.add(b), console.error(
          "[wf-algolia] scope-facet ancestor is missing required wf-algolia-field attribute.",
          b
        ));
        continue;
      }
      let { field: l, value: s, scopeFacetEl: c } = o;
      if (!l) continue;
      if (!s) {
        c && (warnedUnresolvedScopeValue.has(i) || (warnedUnresolvedScopeValue.add(i), console.warn(
          "[wf-algolia] hit-preview scope-facet value is unresolved at refresh \u2014 skipping render.",
          i
        )));
        continue;
      }
      let m = findPreviewTemplate(i);
      if (!m) continue;
      let g = i.getAttribute("wf-algolia-hits-per-preview"), u = 3;
      if (g !== null) {
        let b = parseInt(g, 10);
        !Number.isNaN(b) && b > 0 && (u = b);
      }
      let h = resolvePreviewIndex(i), y = previewKey({
        indexName: h,
        field: l,
        value: s,
        hitsPerPreview: u
      });
      renderedPairKeys.get(i) !== y && n.push({
        el: i,
        field: l,
        value: s,
        hitsPerPreview: u,
        indexName: h,
        template: m,
        pairKey: y
      });
    }
    if (n.length === 0) return;
    let r = await batchedPreviewFetch(e, n, "hit-preview refresh");
    n.forEach((i, o) => {
      let l = r[o];
      if (l == null) return;
      let s = l.hits ?? [];
      if (clearPreviewCards(i.el), s.length === 0) {
        warnedZeroHits.has(i.el) || (warnedZeroHits.add(i.el), console.warn(
          `[wf-algolia] hit-preview returned zero hits for "${i.field}=${i.value}".`,
          i.el
        )), i.template.style.display = "none", renderedPairKeys.set(i.el, i.pairKey);
        return;
      }
      let c = i.template.parentElement ?? i.el, m = document.createDocumentFragment();
      for (let g of s) {
        let u = i.template.cloneNode(true);
        u.setAttribute("data-wf-algolia-hit-preview", "true"), u.classList.add("wf-algolia-injected"), u.style.display = "", populatePreviewCard(u, g), m.appendChild(u);
      }
      c.appendChild(m), i.template.style.display = "none", renderedPairKeys.set(i.el, i.pairKey);
    });
  }
  function initSelectFilters(e) {
    document.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((t) => {
      let n = t.getAttribute("wf-algolia-type");
      if (n !== "select" && n !== "select-multiple") return;
      let r = t.getAttribute("wf-algolia-field");
      if (!r) return;
      let i = t.querySelector("select");
      if (!i) return;
      let o = t.getAttribute("wf-algolia-apply-mode"), l = o === "deferred";
      o !== null && o !== "deferred" && o !== "immediate" && console.warn(
        `[wf-algolia] Unknown wf-algolia-apply-mode='${o}' on filter-group; falling back to immediate. Valid values: 'immediate' (default) | 'deferred'.`
      ), i.addEventListener("change", () => {
        let s;
        if (i.multiple) {
          let c = [...i.selectedOptions].map((m) => m.value).filter(Boolean);
          s = c.length === 0 ? null : {
            type: "checkbox",
            match: "or",
            values: new Set(c)
          };
        } else {
          let { value: c } = i;
          s = c ? {
            type: "checkbox",
            match: "or",
            values: /* @__PURE__ */ new Set([c])
          } : null;
        }
        if (l) {
          s === null ? delete STAGING_STATE[r] : stageFilter(r, s), i.setAttribute("data-wf-algolia-staged", "true"), renderSelectedValues(), renderSelectedCounts();
          let c = t.getAttribute("wf-algolia-group-id");
          c && isParentGroup(c) && emit("filter:parent-stage-change", {
            field: r
          }), closeDropdownOnPick(i);
          return;
        }
        s === null ? delete FILTER_STATE[r] : FILTER_STATE[r] = s, closeDropdownOnPick(i), e();
      });
    });
  }
  var standaloneParentSelection = /* @__PURE__ */ new Map();
  var linkTemplateByGroup = /* @__PURE__ */ new Map();
  var slugifyByGroup = /* @__PURE__ */ new Map();
  var standaloneParentChangeHandler = null;
  var standaloneConfigByEl = /* @__PURE__ */ new Map();
  function getGroupTemplate(e, t) {
    return findTemplateFor(e, t, "filter-template");
  }
  function resolveLinkTemplate(e, t) {
    let n = e.getAttribute("wf-algolia-link-template");
    if (n) return n;
    let r = e.closest("[wf-algolia-link-template]");
    if (r) return r.getAttribute("wf-algolia-link-template");
    if (t) {
      let i = linkTemplateByGroup.get(t);
      if (i) return i;
    }
    return null;
  }
  function resolveSlugify(e, t) {
    let n = e.getAttribute("wf-algolia-slugify");
    if (n !== null) return n === "true";
    let r = e.closest("[wf-algolia-slugify]");
    if (r) return r.getAttribute("wf-algolia-slugify") === "true";
    if (t) {
      let i = slugifyByGroup.get(t);
      if (i !== void 0) return i;
    }
    return false;
  }
  function stampScopeFacetValue(e, t) {
    e.querySelectorAll('[wf-algolia-element="scope-facet"]').forEach(
      (n) => n.setAttribute("wf-algolia-value", t)
    );
  }
  function renderStandaloneItems(e, t, n) {
    removeInjected(e);
    let r = getTemplateParent(t) ?? e, i = [], o = getCascadingAttr(e, "activeclass", "is-active"), l = getCascadingAttr(e, "hideclass", "is-hidden"), s = getCascadingAttr(e, "zeroclass", "is-disabled"), c = getLabelMode(e);
    return n.forEach(([m, g]) => {
      let u = t.cloneNode(true);
      u.removeAttribute("wf-algolia-element"), u.classList.add("wf-algolia-injected"), u.setAttribute("wf-algolia-element", "filter-item"), u.setAttribute("wf-algolia-value", m), u.classList.remove(o, l, s), u.removeAttribute("data-wf-algolia-active"), u.querySelectorAll("*").forEach((b) => {
        b.style.display === "none" && (b.style.display = "");
      });
      let h = u.querySelector('[wf-algolia-element="filter-value-text"]') || u.querySelector(".wf-fi-name") || Array.from(u.children).find(
        (b) => !b.getAttribute?.("wf-algolia-element")
      );
      h && (h.textContent = formatFacetLabel(m, c));
      let y = u.querySelector('[wf-algolia-element="filter-count"]');
      y && (y.textContent = String(g)), u.querySelector("input") || (u.setAttribute("role", "button"), u.setAttribute("tabindex", "0")), stampScopeFacetValue(u, m), r.appendChild(u), i.push(u);
    }), i;
  }
  function populateNestedChildGroups(e, t, n, r, i) {
    let o = Array.from(n.querySelectorAll('[wf-algolia-element="filter-group"]'));
    o.length !== 0 && o.forEach((l) => {
      let s = l.getAttribute("wf-algolia-facet") || l.getAttribute("wf-algolia-field");
      if (!s) return;
      let c = getGroupTemplate(l, i);
      if (!c) return;
      let m = l.getAttribute("wf-algolia-group-id"), g = null;
      if (m && (g = e.querySelector(
        `[wf-algolia-element="filter-group"][wf-algolia-group-id="${m}"]`
      )), g || (g = e.querySelector(
        `[wf-algolia-element="filter-group"][wf-algolia-facet="${s}"]`
      )), !g)
        return;
      let u = t + HIERARCHY_SEPARATOR, y = (r.get(s) ?? []).filter(([D]) => D.startsWith(u)).map(([D, K]) => [D, K]);
      if (y.length === 0) return;
      let b = getCascadingAttr(l, "activeclass", "is-active"), w = getCascadingAttr(l, "hideclass", "is-hidden"), E = getCascadingAttr(l, "zeroclass", "is-disabled"), T = getTemplateParent(c) ?? g, k = g.contains(T) ? T : g;
      y.forEach(([D, K]) => {
        let C = c.cloneNode(true);
        C.removeAttribute("wf-algolia-element"), C.classList.add("wf-algolia-injected"), C.setAttribute("wf-algolia-element", "filter-item"), C.setAttribute("wf-algolia-value", D), C.classList.remove(b, w, E), C.removeAttribute("data-wf-algolia-active"), C.querySelectorAll("*").forEach((X) => {
          X.style.display === "none" && (X.style.display = "");
        });
        let ee = D.startsWith(u) ? D.slice(u.length) : D, ye = C.querySelector('[wf-algolia-element="filter-value-text"]') || C.querySelector(".wf-fi-name") || Array.from(C.children).find(
          (X) => !X.getAttribute?.("wf-algolia-element")
        );
        ye && (ye.textContent = ee);
        let he = C.querySelector('[wf-algolia-element="filter-count"]');
        he && (he.textContent = String(K)), C.querySelector("input") || (C.setAttribute("role", "button"), C.setAttribute("tabindex", "0")), stampScopeFacetValue(C, D), k.appendChild(C);
      });
    });
  }
  function buildNavUrl(e, t, n, r = false) {
    let i = r ? slugify(leafValue(n)) : enc(n);
    return e.replace("{field}", enc(t)).replace("{value}", i);
  }
  function snapshotParentSelections() {
    let e = {};
    return standaloneParentSelection.forEach((t, n) => {
      let r = getGroupField(n);
      r && (e[r] = {
        type: "checkbox",
        match: "or",
        values: /* @__PURE__ */ new Set([t])
      });
    }), e;
  }
  async function initStandaloneFilterGroups(e, t, n) {
    let r = Array.from(n.querySelectorAll('[wf-algolia-element="filter-group"]')), i = t.get("filter-group") ?? [], l = Array.from(/* @__PURE__ */ new Set([...r, ...i])).filter(
      (u) => !(u.closest('[wf-algolia-element="browse"]') || !u.getAttribute("wf-algolia-index"))
    );
    if (l.length === 0) return;
    l.forEach((u) => {
      let h = u.getAttribute("wf-algolia-field") || u.getAttribute("wf-algolia-facet") || null, y = u.getAttribute("wf-algolia-group-id");
      if (h && y && registerGroup(y, h, u), y) {
        let b = u.getAttribute("wf-algolia-link-template");
        b && linkTemplateByGroup.set(y, b);
        let w = u.getAttribute("wf-algolia-slugify");
        w !== null && slugifyByGroup.set(y, w === "true");
      }
    }), l.forEach((u) => {
      let h = u.getAttribute("wf-algolia-refines");
      if (!h) return;
      let y = u.getAttribute("wf-algolia-field") || u.getAttribute("wf-algolia-facet") || null;
      if (!y) return;
      let b = getGroupField(h);
      if (!b) {
        console.warn(
          `[wf-algolia] standalone filter-group refines '${h}' but no parent with that id was found; skipping hierarchy.`
        );
        return;
      }
      let w = parseWhenParentEmpty(u);
      applyParentEmptyBehavior(u, w);
      let E = getChildLink(h), T = E ? E.depth + 1 : 1;
      registerChildLink({
        groupId: u.getAttribute("wf-algolia-group-id") || `__standalone:${y}`,
        parentGroupId: h,
        childEl: u,
        childField: y,
        parentField: b,
        whenParentEmpty: w,
        depth: T
      });
    });
    let s = l.map((u) => {
      let h = u.getAttribute("wf-algolia-facet") || u.getAttribute("wf-algolia-field") || null, y = u.getAttribute("wf-algolia-index"), b = u.getAttribute("wf-algolia-refines");
      if (!h || !y) return null;
      let w = resolveLinkTemplate(u, b), E = resolveSlugify(u, b), T = u.getAttribute("wf-algolia-group-id") || `__standalone:${h}`, k = getGroupTemplate(u, t);
      return {
        el: u,
        facetField: h,
        indexName: y,
        linkTemplate: w,
        slugify: E,
        groupId: T,
        template: k
      };
    }).filter((u) => u !== null);
    if (s.length === 0) return;
    s.forEach((u) => standaloneConfigByEl.set(u.el, u)), s.forEach((u) => {
      u.el.addEventListener("click", (h) => {
        let y = h.target;
        if (!y) return;
        let b = y.closest('[wf-algolia-element="filter-item"]');
        if (!b || !u.el.contains(b)) return;
        let w = b.getAttribute("wf-algolia-value") ?? (b instanceof HTMLInputElement ? b.value : null);
        w == null || w === "" || (h.preventDefault(), isParentGroup(u.groupId) ? (standaloneParentSelection.set(u.groupId, w), emit("filter:parent-change", {
          parentGroupId: u.groupId,
          parentField: u.facetField,
          newValue: w,
          selectedValues: [w]
        })) : u.linkTemplate && window.location.assign(
          buildNavUrl(u.linkTemplate, u.facetField, w, u.slugify)
        ));
      }), u.el.addEventListener("keydown", (h) => {
        if (h.key !== "Enter" && h.key !== " ") return;
        let y = h.target;
        if (!y) return;
        let b = y.closest('[wf-algolia-element="filter-item"]');
        !b || !u.el.contains(b) || b.querySelector("input") || (h.preventDefault(), b.click());
      });
    }), standaloneParentChangeHandler === null && (standaloneParentChangeHandler = (u) => {
      let h = collectDescendants(u.parentGroupId);
      h.length !== 0 && h.forEach((y) => {
        if (y.childEl.closest('[wf-algolia-element="browse"]')) return;
        let b = standaloneConfigByEl.get(y.childEl);
        if (!b || !b.template) return;
        let w = snapshotParentSelections(), E = getAncestorSelections(y, w);
        if (E.length === y.depth) {
          clearParentEmptyBehavior(y.childEl, y.whenParentEmpty);
          let T = E.map(({ field: k, value: D }) => [`${k}:${D}`]);
          fetchFacetValues(e, b.indexName, b.facetField, T).then((k) => {
            k.length > 0 && b.template && (renderStandaloneItems(y.childEl, b.template, k), refreshHitPreviews(e));
          }).catch((k) => {
            console.warn(
              "[wf-algolia] standalone child re-scope failed:",
              k
            ), emit("error", k);
          });
        } else
          applyParentEmptyBehavior(y.childEl, y.whenParentEmpty), y.childEl.querySelectorAll(".wf-algolia-injected").forEach((T) => T.remove());
      });
    }, on("filter:parent-change", standaloneParentChangeHandler));
    let c = /* @__PURE__ */ new Set();
    s.forEach((u) => {
      u.template && u.template.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((h) => c.add(h));
    });
    let m = s.filter(
      (u) => c.has(u.el) ? false : u.el.getAttribute("wf-algolia-refines") ? parseWhenParentEmpty(u.el) !== "hide" : true
    );
    async function g(u) {
      if (u.template && !u.el.querySelector(".wf-algolia-injected"))
        try {
          let h = Array.from(
            u.template.querySelectorAll('[wf-algolia-element="filter-group"]')
          );
          if (h.length > 0) {
            let y = h.map(
              (T) => T.getAttribute("wf-algolia-facet") || T.getAttribute("wf-algolia-field") || ""
            ).filter((T) => T !== ""), b = [u.facetField, ...y], w = await fetchFacetsBatch(e, u.indexName, b), E = w.get(u.facetField) ?? [];
            E.length > 0 && renderStandaloneItems(u.el, u.template, E).forEach((k) => {
              let D = k.getAttribute("wf-algolia-value");
              D != null && populateNestedChildGroups(k, D, u.template, w, t);
            });
          } else {
            let y = await fetchFacetValues(e, u.indexName, u.facetField);
            y.length > 0 && renderStandaloneItems(u.el, u.template, y);
          }
        } catch (h) {
          console.error(
            `[wf-algolia] standalone filter-group "${u.facetField}" failed:`,
            h
          );
        }
    }
    await Promise.all(m.map(g));
    try {
      await refreshHitPreviews(e);
    } catch (u) {
      console.error(
        "[wf-algolia] standalone post-population hit-preview refresh failed:",
        u
      );
    }
  }
  function getMaxRecommendations(e) {
    let t = e.getAttribute("wf-algolia-max-results");
    if (!t) return 8;
    let n = parseInt(t, 10);
    return Number.isNaN(n) ? 8 : Math.max(1, n);
  }
  async function initRecommendations(e, t, n) {
    let r = (0, import_recommend.default)(t.appId, t.searchKey), i = n.get("recommend") || [];
    for (let o of i) {
      let l = o.getAttribute("wf-algolia-model"), s = o.getAttribute("wf-algolia-index"), c = o.querySelector('[wf-algolia-element="recommend-grid"]'), m = c ? findTemplateFor(c, n) : null;
      if (!l || !s || !c || !m) {
        console.warn(
          "[wf-algolia] recommend section missing model, index, grid, or template"
        );
        return;
      }
      let u = document.querySelector('[wf-algolia-element="detail"]')?.getAttribute("wf-algolia-objectid") || "id", h = new URLSearchParams(window.location.search).get(u);
      if (l !== "trending-items" && !h) {
        hideElement(o);
        return;
      }
      try {
        let b = [], w = getMaxRecommendations(o);
        if (l === "related-products" ? b = (await r.getRelatedProducts([
          {
            indexName: s,
            objectID: h,
            maxRecommendations: w
          }
        ])).results[0]?.hits || [] : l === "looking-similar" ? b = (await r.getLookingSimilar([
          {
            indexName: s,
            objectID: h,
            maxRecommendations: w
          }
        ])).results[0]?.hits || [] : l === "trending-items" ? b = (await r.getTrendingItems([
          {
            indexName: s,
            maxRecommendations: w
          }
        ])).results[0]?.hits || [] : l === "frequently-bought-together" && (b = (await r.getFrequentlyBoughtTogether([
          {
            indexName: s,
            objectID: h,
            maxRecommendations: w
          }
        ])).results[0]?.hits || []), h && (b = b.filter((E) => E.objectID !== h)), b.length === 0) {
          hideElement(o);
          return;
        }
        removeInjected(c), renderHits(c, m, b, false, t), showElement(o);
      } catch (b) {
        console.error(`[wf-algolia] Recommend (${l}) failed:`, b), hideElement(o);
      }
    }
  }
  function findArrayWrapper(e) {
    let t = e.closest('[wf-algolia-element="array-wrapper"]');
    return t || e.parentElement;
  }
  function resolveDetailObjectID(e) {
    let t = e.getAttribute("wf-algolia-objectid-value");
    if (t)
      return {
        objectID: t,
        isSlug: true
      };
    if (e.getAttribute("wf-algolia-objectid-from") === "path") {
      let o = window.location.pathname.split("/").filter(Boolean);
      return {
        objectID: o[o.length - 1] || null,
        isSlug: true
      };
    }
    let r = e.getAttribute("wf-algolia-objectid") || "id";
    return {
      objectID: new URLSearchParams(window.location.search).get(r),
      isSlug: false
    };
  }
  function initDetailPage(e, t, n) {
    let r = (n.get("detail") || [])[0];
    if (!r) return;
    let i = r.getAttribute("wf-algolia-index");
    if (!i) {
      console.warn("[wf-algolia] Detail page missing wf-algolia-index");
      return;
    }
    let { objectID: o, isSlug: l } = resolveDetailObjectID(r);
    if (!o) {
      console.warn(
        "[wf-algolia] Detail page: no objectID found in URL or attributes"
      );
      return;
    }
    let s = e.initIndex(i), c = r.getAttribute("wf-algolia-objectid-field") || "slug", m = escapeFilterValue(o);
    (l ? s.search("", {
      filters: `${c}:"${m}"`,
      hitsPerPage: 1
    }).then(
      (u) => u.hits.length === 0 && c !== "objectid" ? s.search("", {
        filters: `objectid:"${m}"`,
        hitsPerPage: 1
      }).then((h) => h.hits[0] || null) : u.hits[0]
    ) : s.getObject(o)).then((u) => {
      if (!u) {
        console.warn("[wf-algolia] Detail page: object not found for", o);
        return;
      }
      populateCard(r, u, t), r.querySelectorAll('[wf-algolia-element="array-item"]').forEach((h) => {
        let y = h.getAttribute("wf-algolia-text");
        if (!y) return;
        let b = u[y];
        if (!Array.isArray(b)) return;
        let w = findArrayWrapper(h);
        w && (hideElement(h), removeInjected(w), b.forEach((E) => {
          let T = h.cloneNode(true);
          showElement(T, "inline-block"), T.removeAttribute("wf-algolia-element"), T.classList.add("wf-algolia-injected"), T.textContent = E, w.appendChild(T);
        }));
      }), restartIx2();
    }).catch((u) => {
      console.error("[wf-algolia] Detail page fetch failed:", u);
    });
  }
  var warnedMultiAnchorCard = /* @__PURE__ */ new WeakSet();
  function initAutocomplete(e, t, n) {
    (n.get("autocomplete") || []).forEach((i) => {
      let o = i.parentElement, l = o?.querySelector('[wf-algolia-element="search-input"]');
      if (!l || !o) return;
      let s = i.querySelectorAll('[wf-algolia-element="autocomplete-section"]'), c = [...s].filter(
        (y) => y.getAttribute("wf-algolia-show-on-focus") === "true"
      ), m = new AbortController(), g = -1;
      async function u(y, b) {
        m.abort(), m = new AbortController(), g = -1;
        let w = [];
        for (let T of b) {
          let k = T.getAttribute("wf-algolia-index") ?? T.closest('[wf-algolia-element="autocomplete"]')?.getAttribute(
            "wf-algolia-index"
          ) ?? null;
          if (!k) {
            console.warn(
              '[wf-algolia] Autocomplete section is missing wf-algolia-index. Add it to the section element or to the parent [wf-algolia-element="autocomplete"] container. Section skipped.',
              T
            );
            continue;
          }
          w.push({
            sec: T,
            q: {
              indexName: k,
              query: y,
              params: {
                hitsPerPage: parseInt(T.getAttribute("wf-algolia-hits") || "4"),
                clickAnalytics: true
              }
            }
          });
        }
        let E = w.map(({ q: T }) => T);
        if (E.length !== 0) {
          showElement(i);
          try {
            let { results: T } = await multiQueryWithMiddleware(e, E);
            T.forEach((D, K) => {
              let C = w[K]?.sec;
              if (!C) return;
              let ee = findTemplateFor(C, n, "autocomplete-template");
              if (!ee) return;
              let ye = D.hits.map((he) => ({
                ...he,
                __queryID: D.queryID,
                __indexName: E[K]?.indexName
              }));
              removeInjected(C), ye.length ? (renderHits(C, ee, ye, false, t), showElement(C)) : hideElement(C);
            }), i.querySelectorAll(
              '[wf-algolia-element="autocomplete-section-label"]'
            ).forEach((D) => {
              let K = D.closest(
                '[wf-algolia-element="autocomplete-section"]'
              );
              K && (K.querySelector(".wf-algolia-injected") ? showElement(D) : hideElement(D));
            });
          } catch (T) {
            T.name !== "AbortError" && console.error("[wf-algolia] Autocomplete search failed:", T);
          }
        }
      }
      let h = debounce(async (y) => {
        if (!y.trim()) {
          hideElement(i);
          return;
        }
        await u(y, [...s]);
      }, t.autocompleteDebounce);
      l.addEventListener("input", (y) => {
        h(y.target.value);
      }), l.addEventListener("keydown", (y) => {
        let b = i.querySelectorAll(".wf-algolia-injected");
        if (b.length)
          if (y.key === "ArrowDown") {
            y.preventDefault(), g = Math.min(g + 1, b.length - 1), b.forEach(
              (E, T) => E.classList.toggle("wf-algolia-focused", T === g)
            );
            let w = b[g];
            w?.id && l.setAttribute("aria-activedescendant", w.id);
          } else if (y.key === "ArrowUp")
            y.preventDefault(), g = Math.max(g - 1, 0), b.forEach(
              (w, E) => w.classList.toggle("wf-algolia-focused", E === g)
            );
          else if (y.key === "Enter" && g >= 0) {
            y.preventDefault();
            let w = b[g], E = w?.querySelector(
              "a[wf-algolia-link-url], a[wf-algolia-link]"
            ) || w?.querySelector("a") || (w instanceof HTMLAnchorElement ? w : null), T = w?.querySelectorAll("a") ?? [], k = w?.querySelector(
              "a[wf-algolia-link-url], a[wf-algolia-link]"
            );
            T.length > 1 && !k && w && !warnedMultiAnchorCard.has(w) && (warnedMultiAnchorCard.add(w), console.warn(
              "[wf-algolia] Autocomplete card has multiple <a> elements. Enter navigates to the first one. Mark the primary link with wf-algolia-link-url to make this explicit.",
              w
            )), E?.href && (window.location.href = E.href);
          } else y.key === "Escape" && (hideElement(i), g = -1);
      }), document.addEventListener("click", (y) => {
        o.contains(y.target) || (hideElement(i), g = -1);
      }), l.addEventListener("focus", () => {
        l.value.trim() && i.querySelector(".wf-algolia-injected") ? showElement(i) : !l.value.trim() && c.length > 0 && u("", c);
      });
    });
  }
  function initMergedSearch(e, t, n) {
    document.querySelectorAll("[wf-algolia-index]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-index");
      if (!i.includes(",")) return;
      let o = i.split(",").map((b) => b.trim()).filter(Boolean);
      if (o.length < 2) return;
      let l = r.querySelector('[wf-algolia-element="search-input"]'), s = r.querySelector('[wf-algolia-element="results"]'), c = s ? findTemplateFor(s, n) : null, m = r.querySelector('[wf-algolia-element="no-results"]'), g = r.querySelector('[wf-algolia-element="loader"]'), u = parseInt(r.getAttribute("wf-algolia-hits") || "8");
      if (!l || !s || !c) return;
      let h = new AbortController(), y = debounce(async (b) => {
        if (h.abort(), h = new AbortController(), !b.trim()) {
          hideElement(s);
          return;
        }
        showElement(s), showElement(g);
        let w = Math.ceil(u / o.length), E = o.map((T) => ({
          indexName: T,
          query: b,
          params: {
            hitsPerPage: w,
            clickAnalytics: true
          }
        }));
        try {
          let { results: T } = await multiQueryWithMiddleware(e, E);
          hideElement(g);
          let k = T.map(
            (C, ee) => C.hits.map((ye) => ({
              ...ye,
              __queryID: C.queryID,
              __indexName: o[ee]
            }))
          ), D = [], K = Math.max(...k.map((C) => C.length));
          for (let C = 0; C < K; C++)
            for (let ee of k) C < ee.length && D.push(ee[C]);
          removeInjected(s), D.length === 0 ? showElement(m) : (hideElement(m), renderHits(s, c, D, false, t));
        } catch (T) {
          T.name !== "AbortError" && console.error("[wf-algolia] Merged search failed:", T), hideElement(g);
        }
      }, t.debounce);
      l.addEventListener("input", (b) => {
        y(b.target.value);
      }), document.addEventListener("click", (b) => {
        r.contains(b.target) || hideElement(s);
      });
    });
  }
  function initSectionSearch(e, t, n) {
    (n.get("search-input") || []).filter((i) => !i.closest("[wf-algolia-index]")).forEach((i) => {
      let o = i.closest('[wf-algolia-element="search-wrapper"]') || i.closest('[wf-algolia-element="results"]')?.parentElement || i.parentElement, l = o?.querySelector('[wf-algolia-element="results"]');
      if (!l) return;
      let s = l.querySelectorAll('[wf-algolia-element="section"]'), c = l.querySelector('[wf-algolia-element="no-results"]'), m = l.querySelector('[wf-algolia-element="divider"]'), g = l.querySelector('[wf-algolia-element="loader"]'), u = new AbortController(), h = debounce(async (y) => {
        if (u.abort(), u = new AbortController(), !y.trim()) {
          hideElement(l);
          return;
        }
        showElement(l), showElement(g);
        let b = buildSnippetParam(t.snippetWords, t.snippetAttrs), w = [...s].map((E) => ({
          indexName: E.getAttribute("wf-algolia-index"),
          query: y,
          params: {
            hitsPerPage: parseInt(E.getAttribute("wf-algolia-hits") || "5"),
            clickAnalytics: true,
            attributesToSnippet: b
          }
        }));
        try {
          let { results: E } = await multiQueryWithMiddleware(e, w);
          hideElement(g);
          let T = 0, k = 0;
          E.forEach((K, C) => {
            let ee = s[C];
            if (!ee) return;
            let ye = findTemplateFor(ee, n);
            if (!ye) return;
            let he = K.hits.map((X) => ({
              ...X,
              __queryID: K.queryID,
              __indexName: w[C]?.indexName
            }));
            removeInjected(ee), he.length ? (renderHits(ee, ye, he, false, t), showElement(ee), k++) : hideElement(ee), T += he.length;
          }), k > 1 ? showElement(m) : hideElement(m), T === 0 ? showElement(c) : hideElement(c);
          let D = o?.querySelector('[wf-algolia-element="results-count"]');
          if (D) {
            let K = getTextTemplate(D, "{count} results");
            D.textContent = interpolate(K, {
              count: T,
              total: T
            });
          }
        } catch (E) {
          if (E.name === "AbortError") return;
          console.error("[wf-algolia] Multi-section search failed:", E), hideElement(g);
        }
      }, t.debounce);
      i.addEventListener("input", (y) => {
        h(y.target.value);
      }), document.addEventListener("click", (y) => {
        o?.contains(y.target) || hideElement(l);
      }), i.addEventListener("focus", () => {
        i.value.trim() && showElement(l);
      }), i.addEventListener("keydown", (y) => {
        y.key === "Escape" && hideElement(l);
      });
    });
  }
  function initScopedSearch(e, t, n) {
    (n.get("search-input") || []).filter((i) => !!i.closest("[wf-algolia-index]")).forEach((i) => {
      let o = i.closest("[wf-algolia-index]"), l = o.getAttribute("wf-algolia-index"), s = o.querySelector('[wf-algolia-element="results"]'), c = s ? findTemplateFor(s, n) : null, m = o.querySelector('[wf-algolia-element="no-results"]'), g = o.querySelector('[wf-algolia-element="loader"]'), u = parseInt(o.getAttribute("wf-algolia-hits") || "8");
      if (!s || !c) return;
      let h = new AbortController(), y = debounce(async (b) => {
        if (h.abort(), h = new AbortController(), !b.trim()) {
          hideElement(s);
          return;
        }
        showElement(s), showElement(g);
        try {
          let w = await searchWithMiddleware(
            {
              hitsPerPage: u,
              clickAnalytics: true,
              attributesToSnippet: buildSnippetParam(
                t.snippetWords,
                t.snippetAttrs
              )
            },
            (k) => e.initIndex(l).search(b, k)
          );
          hideElement(g);
          let E = w.hits.map((k) => ({
            ...k,
            __queryID: w.queryID,
            __indexName: l
          }));
          E.length === 0 ? (removeInjected(s), showElement(m)) : (hideElement(m), renderHits(s, c, E, false, t));
          let T = o.querySelector('[wf-algolia-element="results-count"]');
          if (T) {
            let k = getTextTemplate(T, "{count} results");
            T.textContent = interpolate(k, {
              count: w.nbHits,
              total: w.nbHits
            });
          }
        } catch (w) {
          hideElement(g), console.error(
            `[wf-algolia] Scoped search failed for "${l}":`,
            w
          );
        }
      }, t.debounce);
      i.addEventListener("input", (b) => {
        y(b.target.value);
      }), document.addEventListener("click", (b) => {
        o.contains(b.target) || hideElement(s);
      });
    });
  }
  var STATIC_DEFAULT_PER_PAGE = 12;
  var warnedStaticNoIndex = /* @__PURE__ */ new WeakSet();
  var warnedStaticBadFilter = /* @__PURE__ */ new WeakSet();
  var warnedStaticNoTemplate = /* @__PURE__ */ new WeakSet();
  function initStaticLists(e, t, n) {
    (n.get("browse") || []).filter((i) => i.getAttribute("wf-algolia-disable-filters") === "true").forEach((i) => void renderStaticList(e, t, n, i));
  }
  function renderStaticList(e, t, n, r) {
    let i = r.getAttribute("wf-algolia-index");
    if (!i)
      return warnedStaticNoIndex.has(r) || (warnedStaticNoIndex.add(r), console.error(
        "[wf-algolia] static list (wf-algolia-disable-filters) missing required wf-algolia-index.",
        r
      )), Promise.resolve();
    let o = r.querySelector('[wf-algolia-element="results"]'), l = o ? findTemplateFor(o, n) : null;
    if (!o || !l)
      return warnedStaticNoTemplate.has(r) || (warnedStaticNoTemplate.add(r), console.warn(
        "[wf-algolia] static list has no results container/template; skipping.",
        r
      )), Promise.resolve();
    let s = readBaseFilter(r, "wf-algolia-filter", (y) => {
      warnedStaticBadFilter.has(r) || (warnedStaticBadFilter.add(r), console.warn(`[wf-algolia] static list ${y}`, r));
    }), c = parseInt(r.getAttribute("wf-algolia-per-page") || "", 10), m = Number.isNaN(c) || c <= 0 ? STATIC_DEFAULT_PER_PAGE : c, g = r.querySelector('[wf-algolia-element="loader"]'), u = r.querySelector('[wf-algolia-element="no-results"]');
    showElement(g);
    let h = {
      hitsPerPage: m,
      clickAnalytics: true,
      attributesToSnippet: buildSnippetParam(t.snippetWords, t.snippetAttrs),
      ...s ? {
        facetFilters: s
      } : {}
    };
    return searchWithMiddleware(h, (y) => e.initIndex(i).search("", y)).then((y) => {
      hideElement(g);
      let b = y.hits.map((w) => ({
        ...w,
        __queryID: y.queryID,
        __indexName: i
      }));
      removeInjected(o), b.length === 0 ? showElement(u) : (hideElement(u), renderHits(o, l, b, false, t)), r.querySelectorAll('[wf-algolia-element="results-count"]').forEach((w) => {
        renderResultsCount(w, {
          shown: b.length,
          total: y.nbHits,
          page: 1,
          pages: y.nbPages
        });
      });
    }).catch((y) => {
      hideElement(g), console.error("[wf-algolia] static list query failed:", y);
    });
  }
  function handleFormBlocks() {
    let e = /* @__PURE__ */ new Set();
    document.querySelectorAll("[wf-algolia-element]").forEach((t) => {
      let n = t.closest("form");
      n && e.add(n);
    }), e.forEach((t) => {
      t.addEventListener("submit", (i) => {
        i.preventDefault(), i.stopPropagation();
      });
      let n = t.closest(".w-form") || t.parentElement;
      if (n) {
        let i = n.querySelector(".w-form-done"), o = n.querySelector(".w-form-fail");
        i && (i.style.display = "none"), o && (o.style.display = "none");
      }
      let r = t.querySelector('input[type="submit"], button[type="submit"]');
      r && (r.style.display = "none");
    });
  }
  window.Webflow || (window.Webflow = []);
  window.Webflow.push(async () => {
    try {
      initDebugAudit();
      let e = initConfig(), t = initClient(e), n = scanAttributes();
      handleFormBlocks(), initAccessibility(n), n.has("browse") && initBrowsePage(t, e, n), n.has("browse") && initStaticLists(t, e, n), initStandaloneFilterGroups(t, n, document), n.has("hit-preview") && initHitPreviews(t, n), n.has("facet-stat") && initFacetStats(t, n), initSelectFilters(() => emit("refresh")), n.has("detail") && initDetailPage(t, e, n), n.has("recommend") && initRecommendations(t, e, n), initScopedSearch(t, e, n), initSectionSearch(t, e, n), initMergedSearch(t, e, n), n.has("autocomplete") && initAutocomplete(t, e, n), e.insights && initInsights(e), exposePublicAPI(t, e), window.WfAlgolia.__sanitize = sanitizeHtml, emit("ready");
    } catch (e) {
      console.error("[wf-algolia] Initialization failed:", e);
    }
  });
})();
/*! Bundled license information:

algoliasearch/dist/algoliasearch.umd.js:
  (*! algoliasearch.umd.js | 4.26.0 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript *)

@algolia/recommend/dist/recommend.umd.js:
  (*! recommend.umd.js | 4.26.0 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript *)
*/
