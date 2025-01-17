var requirejs, require, define;
!(function (global) {
	function commentReplace(e, t, n, i) {
		return i || '';
	}
	function isFunction(e) {
		return '[object Function]' === ostring.call(e);
	}
	function isArray(e) {
		return '[object Array]' === ostring.call(e);
	}
	function each(e, t) {
		if (e) {
			var n;
			for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
		}
	}
	function eachReverse(e, t) {
		if (e) {
			var n;
			for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
		}
	}
	function hasProp(e, t) {
		return hasOwn.call(e, t);
	}
	function getOwn(e, t) {
		return hasProp(e, t) && e[t];
	}
	function eachProp(e, t) {
		var n;
		for (n in e) if (hasProp(e, n) && t(e[n], n)) break;
	}
	function mixin(e, t, n, i) {
		return (
			t &&
				eachProp(t, function (t, o) {
					(n || !hasProp(e, o)) &&
						(!i || 'object' != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp
							? (e[o] = t)
							: (e[o] || (e[o] = {}), mixin(e[o], t, n, i)));
				}),
			e
		);
	}
	function bind(e, t) {
		return function () {
			return t.apply(e, arguments);
		};
	}
	function scripts() {
		return document.getElementsByTagName('script');
	}
	function defaultOnError(e) {
		throw e;
	}
	function getGlobal(e) {
		if (!e) return e;
		var t = global;
		return (
			each(e.split('.'), function (e) {
				t = t[e];
			}),
			t
		);
	}
	function makeError(e, t, n, i) {
		var o = new Error(t + '\nhttp://requirejs.org/docs/errors.html#' + e);
		return (o.requireType = e), (o.requireModules = i), n && (o.originalError = n), o;
	}
	function newContext(e) {
		function t(e) {
			var t, n;
			for (t = 0; t < e.length; t++)
				if (((n = e[t]), '.' === n)) e.splice(t, 1), (t -= 1);
				else if ('..' === n) {
					if (0 === t || (1 === t && '..' === e[2]) || '..' === e[t - 1]) continue;
					t > 0 && (e.splice(t - 1, 2), (t -= 2));
				}
		}
		function n(e, n, i) {
			var o,
				r,
				s,
				a,
				u,
				l,
				c,
				h,
				p,
				d,
				f,
				g,
				v = n && n.split('/'),
				m = S.map,
				y = m && m['*'];
			if (
				(e &&
					((e = e.split('/')),
					(c = e.length - 1),
					S.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, '')),
					'.' === e[0].charAt(0) && v && ((g = v.slice(0, v.length - 1)), (e = g.concat(e))),
					t(e),
					(e = e.join('/'))),
				i && m && (v || y))
			) {
				s = e.split('/');
				e: for (a = s.length; a > 0; a -= 1) {
					if (((l = s.slice(0, a).join('/')), v))
						for (u = v.length; u > 0; u -= 1)
							if (((r = getOwn(m, v.slice(0, u).join('/'))), r && (r = getOwn(r, l)))) {
								(h = r), (p = a);
								break e;
							}
					!d && y && getOwn(y, l) && ((d = getOwn(y, l)), (f = a));
				}
				!h && d && ((h = d), (p = f)), h && (s.splice(0, p, h), (e = s.join('/')));
			}
			return (o = getOwn(S.pkgs, e)), o ? o : e;
		}
		function i(e) {
			isBrowser &&
				each(scripts(), function (t) {
					return t.getAttribute('data-requiremodule') === e &&
						t.getAttribute('data-requirecontext') === E.contextName
						? (t.parentNode.removeChild(t), !0)
						: void 0;
				});
		}
		function o(e) {
			var t = getOwn(S.paths, e);
			return t && isArray(t) && t.length > 1
				? (t.shift(), E.require.undef(e), E.makeRequire(null, { skipMap: !0 })([e]), !0)
				: void 0;
		}
		function r(e) {
			var t,
				n = e ? e.indexOf('!') : -1;
			return n > -1 && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))), [t, e];
		}
		function s(e, t, i, o) {
			var s,
				a,
				u,
				l,
				c = null,
				h = t ? t.name : null,
				p = e,
				d = !0,
				f = '';
			return (
				e || ((d = !1), (e = '_@r' + (R += 1))),
				(l = r(e)),
				(c = l[0]),
				(e = l[1]),
				c && ((c = n(c, h, o)), (a = getOwn(O, c))),
				e &&
					(c
						? (f =
								a && a.normalize
									? a.normalize(e, function (e) {
											return n(e, h, o);
									  })
									: -1 === e.indexOf('!')
									? n(e, h, o)
									: e)
						: ((f = n(e, h, o)),
						  (l = r(f)),
						  (c = l[0]),
						  (f = l[1]),
						  (i = !0),
						  (s = E.nameToUrl(f)))),
				(u = !c || a || i ? '' : '_unnormalized' + (P += 1)),
				{
					prefix: c,
					name: f,
					parentMap: t,
					unnormalized: !!u,
					url: s,
					originalName: p,
					isDefine: d,
					id: (c ? c + '!' + f : f) + u
				}
			);
		}
		function a(e) {
			var t = e.id,
				n = getOwn(x, t);
			return n || (n = x[t] = new E.Module(e)), n;
		}
		function u(e, t, n) {
			var i = e.id,
				o = getOwn(x, i);
			!hasProp(O, i) || (o && !o.defineEmitComplete)
				? ((o = a(e)), o.error && 'error' === t ? n(o.error) : o.on(t, n))
				: 'defined' === t && n(O[i]);
		}
		function l(e, t) {
			var n = e.requireModules,
				i = !1;
			t
				? t(e)
				: (each(n, function (t) {
						var n = getOwn(x, t);
						n && ((n.error = e), n.events.error && ((i = !0), n.emit('error', e)));
				  }),
				  i || req.onError(e));
		}
		function c() {
			globalDefQueue.length &&
				(each(globalDefQueue, function (e) {
					var t = e[0];
					'string' == typeof t && (E.defQueueMap[t] = !0), T.push(e);
				}),
				(globalDefQueue = []));
		}
		function h(e) {
			delete x[e], delete $[e];
		}
		function p(e, t, n) {
			var i = e.map.id;
			e.error
				? e.emit('error', e.error)
				: ((t[i] = !0),
				  each(e.depMaps, function (i, o) {
						var r = i.id,
							s = getOwn(x, r);
						!s ||
							e.depMatched[o] ||
							n[r] ||
							(getOwn(t, r) ? (e.defineDep(o, O[r]), e.check()) : p(s, t, n));
				  }),
				  (n[i] = !0));
		}
		function d() {
			var e,
				t,
				n = 1e3 * S.waitSeconds,
				r = n && E.startTime + n < new Date().getTime(),
				s = [],
				a = [],
				u = !1,
				c = !0;
			if (!y) {
				if (
					((y = !0),
					eachProp($, function (e) {
						var n = e.map,
							l = n.id;
						if (e.enabled && (n.isDefine || a.push(e), !e.error))
							if (!e.inited && r) o(l) ? ((t = !0), (u = !0)) : (s.push(l), i(l));
							else if (!e.inited && e.fetched && n.isDefine && ((u = !0), !n.prefix))
								return (c = !1);
					}),
					r && s.length)
				)
					return (
						(e = makeError('timeout', 'Load timeout for modules: ' + s, null, s)),
						(e.contextName = E.contextName),
						l(e)
					);
				c &&
					each(a, function (e) {
						p(e, {}, {});
					}),
					(r && !t) ||
						!u ||
						(!isBrowser && !isWebWorker) ||
						w ||
						(w = setTimeout(function () {
							(w = 0), d();
						}, 50)),
					(y = !1);
			}
		}
		function f(e) {
			hasProp(O, e[0]) || a(s(e[0], null, !0)).init(e[1], e[2]);
		}
		function g(e, t, n, i) {
			e.detachEvent && !isOpera ? i && e.detachEvent(i, t) : e.removeEventListener(n, t, !1);
		}
		function v(e) {
			var t = e.currentTarget || e.srcElement;
			return (
				g(t, E.onScriptLoad, 'load', 'onreadystatechange'),
				g(t, E.onScriptError, 'error'),
				{ node: t, id: t && t.getAttribute('data-requiremodule') }
			);
		}
		function m() {
			var e;
			for (c(); T.length; ) {
				if (((e = T.shift()), null === e[0]))
					return l(
						makeError('mismatch', 'Mismatched anonymous define() module: ' + e[e.length - 1])
					);
				f(e);
			}
			E.defQueueMap = {};
		}
		var y,
			b,
			E,
			_,
			w,
			S = { waitSeconds: 7, baseUrl: './', paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} },
			x = {},
			$ = {},
			I = {},
			T = [],
			O = {},
			A = {},
			C = {},
			R = 1,
			P = 1;
		return (
			(_ = {
				require: function (e) {
					return e.require ? e.require : (e.require = E.makeRequire(e.map));
				},
				exports: function (e) {
					return (
						(e.usingExports = !0),
						e.map.isDefine
							? e.exports
								? (O[e.map.id] = e.exports)
								: (e.exports = O[e.map.id] = {})
							: void 0
					);
				},
				module: function (e) {
					return e.module
						? e.module
						: (e.module = {
								id: e.map.id,
								uri: e.map.url,
								config: function () {
									return getOwn(S.config, e.map.id) || {};
								},
								exports: e.exports || (e.exports = {})
						  });
				}
			}),
			(b = function (e) {
				(this.events = getOwn(I, e.id) || {}),
					(this.map = e),
					(this.shim = getOwn(S.shim, e.id)),
					(this.depExports = []),
					(this.depMaps = []),
					(this.depMatched = []),
					(this.pluginMaps = {}),
					(this.depCount = 0);
			}),
			(b.prototype = {
				init: function (e, t, n, i) {
					(i = i || {}),
						this.inited ||
							((this.factory = t),
							n
								? this.on('error', n)
								: this.events.error &&
								  (n = bind(this, function (e) {
										this.emit('error', e);
								  })),
							(this.depMaps = e && e.slice(0)),
							(this.errback = n),
							(this.inited = !0),
							(this.ignore = i.ignore),
							i.enabled || this.enabled ? this.enable() : this.check());
				},
				defineDep: function (e, t) {
					this.depMatched[e] ||
						((this.depMatched[e] = !0), (this.depCount -= 1), (this.depExports[e] = t));
				},
				fetch: function () {
					if (!this.fetched) {
						(this.fetched = !0), (E.startTime = new Date().getTime());
						var e = this.map;
						return this.shim
							? void E.makeRequire(this.map, { enableBuildCallback: !0 })(
									this.shim.deps || [],
									bind(this, function () {
										return e.prefix ? this.callPlugin() : this.load();
									})
							  )
							: e.prefix
							? this.callPlugin()
							: this.load();
					}
				},
				load: function () {
					var e = this.map.url;
					A[e] || ((A[e] = !0), E.load(this.map.id, e));
				},
				check: function () {
					if (this.enabled && !this.enabling) {
						var e,
							t,
							n = this.map.id,
							i = this.depExports,
							o = this.exports,
							r = this.factory;
						if (this.inited) {
							if (this.error) this.emit('error', this.error);
							else if (!this.defining) {
								if (((this.defining = !0), this.depCount < 1 && !this.defined)) {
									if (isFunction(r)) {
										if ((this.events.error && this.map.isDefine) || req.onError !== defaultOnError)
											try {
												o = E.execCb(n, r, i, o);
											} catch (s) {
												e = s;
											}
										else o = E.execCb(n, r, i, o);
										if (
											(this.map.isDefine &&
												void 0 === o &&
												((t = this.module),
												t ? (o = t.exports) : this.usingExports && (o = this.exports)),
											e)
										)
											return (
												(e.requireMap = this.map),
												(e.requireModules = this.map.isDefine ? [this.map.id] : null),
												(e.requireType = this.map.isDefine ? 'define' : 'require'),
												l((this.error = e))
											);
									} else o = r;
									if (
										((this.exports = o),
										this.map.isDefine && !this.ignore && ((O[n] = o), req.onResourceLoad))
									) {
										var a = [];
										each(this.depMaps, function (e) {
											a.push(e.normalizedMap || e);
										}),
											req.onResourceLoad(E, this.map, a);
									}
									h(n), (this.defined = !0);
								}
								(this.defining = !1),
									this.defined &&
										!this.defineEmitted &&
										((this.defineEmitted = !0),
										this.emit('defined', this.exports),
										(this.defineEmitComplete = !0));
							}
						} else hasProp(E.defQueueMap, n) || this.fetch();
					}
				},
				callPlugin: function () {
					var e = this.map,
						t = e.id,
						i = s(e.prefix);
					this.depMaps.push(i),
						u(
							i,
							'defined',
							bind(this, function (i) {
								var o,
									r,
									c,
									p = getOwn(C, this.map.id),
									d = this.map.name,
									f = this.map.parentMap ? this.map.parentMap.name : null,
									g = E.makeRequire(e.parentMap, { enableBuildCallback: !0 });
								return this.map.unnormalized
									? (i.normalize &&
											(d =
												i.normalize(d, function (e) {
													return n(e, f, !0);
												}) || ''),
									  (r = s(e.prefix + '!' + d, this.map.parentMap)),
									  u(
											r,
											'defined',
											bind(this, function (e) {
												(this.map.normalizedMap = r),
													this.init(
														[],
														function () {
															return e;
														},
														null,
														{ enabled: !0, ignore: !0 }
													);
											})
									  ),
									  (c = getOwn(x, r.id)),
									  void (
											c &&
											(this.depMaps.push(r),
											this.events.error &&
												c.on(
													'error',
													bind(this, function (e) {
														this.emit('error', e);
													})
												),
											c.enable())
									  ))
									: p
									? ((this.map.url = E.nameToUrl(p)), void this.load())
									: ((o = bind(this, function (e) {
											this.init(
												[],
												function () {
													return e;
												},
												null,
												{ enabled: !0 }
											);
									  })),
									  (o.error = bind(this, function (e) {
											(this.inited = !0),
												(this.error = e),
												(e.requireModules = [t]),
												eachProp(x, function (e) {
													0 === e.map.id.indexOf(t + '_unnormalized') && h(e.map.id);
												}),
												l(e);
									  })),
									  (o.fromText = bind(this, function (n, i) {
											var r = e.name,
												u = s(r),
												c = useInteractive;
											i && (n = i),
												c && (useInteractive = !1),
												a(u),
												hasProp(S.config, t) && (S.config[r] = S.config[t]);
											try {
												req.exec(n);
											} catch (h) {
												return l(
													makeError('fromtexteval', 'fromText eval for ' + t + ' failed: ' + h, h, [
														t
													])
												);
											}
											c && (useInteractive = !0),
												this.depMaps.push(u),
												E.completeLoad(r),
												g([r], o);
									  })),
									  void i.load(e.name, g, o, S));
							})
						),
						E.enable(i, this),
						(this.pluginMaps[i.id] = i);
				},
				enable: function () {
					($[this.map.id] = this),
						(this.enabled = !0),
						(this.enabling = !0),
						each(
							this.depMaps,
							bind(this, function (e, t) {
								var n, i, o;
								if ('string' == typeof e) {
									if (
										((e = s(
											e,
											this.map.isDefine ? this.map : this.map.parentMap,
											!1,
											!this.skipMap
										)),
										(this.depMaps[t] = e),
										(o = getOwn(_, e.id)))
									)
										return void (this.depExports[t] = o(this));
									(this.depCount += 1),
										u(
											e,
											'defined',
											bind(this, function (e) {
												this.undefed || (this.defineDep(t, e), this.check());
											})
										),
										this.errback
											? u(e, 'error', bind(this, this.errback))
											: this.events.error &&
											  u(
													e,
													'error',
													bind(this, function (e) {
														this.emit('error', e);
													})
											  );
								}
								(n = e.id), (i = x[n]), hasProp(_, n) || !i || i.enabled || E.enable(e, this);
							})
						),
						eachProp(
							this.pluginMaps,
							bind(this, function (e) {
								var t = getOwn(x, e.id);
								t && !t.enabled && E.enable(e, this);
							})
						),
						(this.enabling = !1),
						this.check();
				},
				on: function (e, t) {
					var n = this.events[e];
					n || (n = this.events[e] = []), n.push(t);
				},
				emit: function (e, t) {
					each(this.events[e], function (e) {
						e(t);
					}),
						'error' === e && delete this.events[e];
				}
			}),
			(E = {
				config: S,
				contextName: e,
				registry: x,
				defined: O,
				urlFetched: A,
				defQueue: T,
				defQueueMap: {},
				Module: b,
				makeModuleMap: s,
				nextTick: req.nextTick,
				onError: l,
				configure: function (e) {
					if (
						(e.baseUrl && '/' !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += '/'),
						'string' == typeof e.urlArgs)
					) {
						var t = e.urlArgs;
						e.urlArgs = function (e, n) {
							return (-1 === n.indexOf('?') ? '?' : '&') + t;
						};
					}
					var n = S.shim,
						i = { paths: !0, bundles: !0, config: !0, map: !0 };
					eachProp(e, function (e, t) {
						i[t] ? (S[t] || (S[t] = {}), mixin(S[t], e, !0, !0)) : (S[t] = e);
					}),
						e.bundles &&
							eachProp(e.bundles, function (e, t) {
								each(e, function (e) {
									e !== t && (C[e] = t);
								});
							}),
						e.shim &&
							(eachProp(e.shim, function (e, t) {
								isArray(e) && (e = { deps: e }),
									(!e.exports && !e.init) || e.exportsFn || (e.exportsFn = E.makeShimExports(e)),
									(n[t] = e);
							}),
							(S.shim = n)),
						e.packages &&
							each(e.packages, function (e) {
								var t, n;
								(e = 'string' == typeof e ? { name: e } : e),
									(n = e.name),
									(t = e.location),
									t && (S.paths[n] = e.location),
									(S.pkgs[n] =
										e.name +
										'/' +
										(e.main || 'main').replace(currDirRegExp, '').replace(jsSuffixRegExp, ''));
							}),
						eachProp(x, function (e, t) {
							e.inited || e.map.unnormalized || (e.map = s(t, null, !0));
						}),
						(e.deps || e.callback) && E.require(e.deps || [], e.callback);
				},
				makeShimExports: function (e) {
					function t() {
						var t;
						return (
							e.init && (t = e.init.apply(global, arguments)),
							t || (e.exports && getGlobal(e.exports))
						);
					}
					return t;
				},
				makeRequire: function (t, o) {
					function r(n, i, u) {
						var c, h, p;
						return (
							o.enableBuildCallback && i && isFunction(i) && (i.__requireJsBuild = !0),
							'string' == typeof n
								? isFunction(i)
									? l(makeError('requireargs', 'Invalid require call'), u)
									: t && hasProp(_, n)
									? _[n](x[t.id])
									: req.get
									? req.get(E, n, t, r)
									: ((h = s(n, t, !1, !0)),
									  (c = h.id),
									  hasProp(O, c)
											? O[c]
											: l(
													makeError(
														'notloaded',
														'Module name "' +
															c +
															'" has not been loaded yet for context: ' +
															e +
															(t ? '' : '. Use require([])')
													)
											  ))
								: (m(),
								  E.nextTick(function () {
										m(),
											(p = a(s(null, t))),
											(p.skipMap = o.skipMap),
											p.init(n, i, u, { enabled: !0 }),
											d();
								  }),
								  r)
						);
					}
					return (
						(o = o || {}),
						mixin(r, {
							isBrowser: isBrowser,
							toUrl: function (e) {
								var i,
									o = e.lastIndexOf('.'),
									r = e.split('/')[0],
									s = '.' === r || '..' === r;
								return (
									-1 !== o &&
										(!s || o > 1) &&
										((i = e.substring(o, e.length)), (e = e.substring(0, o))),
									E.nameToUrl(n(e, t && t.id, !0), i, !0)
								);
							},
							defined: function (e) {
								return hasProp(O, s(e, t, !1, !0).id);
							},
							specified: function (e) {
								return (e = s(e, t, !1, !0).id), hasProp(O, e) || hasProp(x, e);
							}
						}),
						t ||
							(r.undef = function (e) {
								c();
								var n = s(e, t, !0),
									o = getOwn(x, e);
								(o.undefed = !0),
									i(e),
									delete O[e],
									delete A[n.url],
									delete I[e],
									eachReverse(T, function (t, n) {
										t[0] === e && T.splice(n, 1);
									}),
									delete E.defQueueMap[e],
									o && (o.events.defined && (I[e] = o.events), h(e));
							}),
						r
					);
				},
				enable: function (e) {
					var t = getOwn(x, e.id);
					t && a(e).enable();
				},
				completeLoad: function (e) {
					var t,
						n,
						i,
						r = getOwn(S.shim, e) || {},
						s = r.exports;
					for (c(); T.length; ) {
						if (((n = T.shift()), null === n[0])) {
							if (((n[0] = e), t)) break;
							t = !0;
						} else n[0] === e && (t = !0);
						f(n);
					}
					if (((E.defQueueMap = {}), (i = getOwn(x, e)), !t && !hasProp(O, e) && i && !i.inited)) {
						if (!(!S.enforceDefine || (s && getGlobal(s))))
							return o(e) ? void 0 : l(makeError('nodefine', 'No define call for ' + e, null, [e]));
						f([e, r.deps || [], r.exportsFn]);
					}
					d();
				},
				nameToUrl: function (e, t, n) {
					var i,
						o,
						r,
						s,
						a,
						u,
						l,
						c = getOwn(S.pkgs, e);
					if ((c && (e = c), (l = getOwn(C, e)))) return E.nameToUrl(l, t, n);
					if (req.jsExtRegExp.test(e)) a = e + (t || '');
					else {
						for (i = S.paths, o = e.split('/'), r = o.length; r > 0; r -= 1)
							if (((s = o.slice(0, r).join('/')), (u = getOwn(i, s)))) {
								isArray(u) && (u = u[0]), o.splice(0, r, u);
								break;
							}
						(a = o.join('/')),
							(a += t || (/^data\:|^blob\:|\?/.test(a) || n ? '' : '.js')),
							(a = ('/' === a.charAt(0) || a.match(/^[\w\+\.\-]+:/) ? '' : S.baseUrl) + a);
					}
					return S.urlArgs && !/^blob\:/.test(a) ? a + S.urlArgs(e, a) : a;
				},
				load: function (e, t) {
					req.load(E, e, t);
				},
				execCb: function (e, t, n, i) {
					return t.apply(i, n);
				},
				onScriptLoad: function (e) {
					if ('load' === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
						interactiveScript = null;
						var t = v(e);
						E.completeLoad(t.id);
					}
				},
				onScriptError: function (e) {
					var t = v(e);
					if (!o(t.id)) {
						var n = [];
						return (
							eachProp(x, function (e, i) {
								0 !== i.indexOf('_@r') &&
									each(e.depMaps, function (e) {
										return e.id === t.id ? (n.push(i), !0) : void 0;
									});
							}),
							l(
								makeError(
									'scripterror',
									'Script error for "' + t.id + (n.length ? '", needed by: ' + n.join(', ') : '"'),
									e,
									[t.id]
								)
							)
						);
					}
				}
			}),
			(E.require = E.makeRequire()),
			E
		);
	}
	function getInteractiveScript() {
		return interactiveScript && 'interactive' === interactiveScript.readyState
			? interactiveScript
			: (eachReverse(scripts(), function (e) {
					return 'interactive' === e.readyState ? (interactiveScript = e) : void 0;
			  }),
			  interactiveScript);
	}
	var req,
		s,
		head,
		baseElement,
		dataMain,
		src,
		interactiveScript,
		currentlyAddingScript,
		mainScript,
		subPath,
		version = '2.2.0',
		commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
		cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
		jsSuffixRegExp = /\.js$/,
		currDirRegExp = /^\.\//,
		op = Object.prototype,
		ostring = op.toString,
		hasOwn = op.hasOwnProperty,
		isBrowser = !(
			'undefined' == typeof window ||
			'undefined' == typeof navigator ||
			!window.document
		),
		isWebWorker = !isBrowser && 'undefined' != typeof importScripts,
		readyRegExp =
			isBrowser && 'PLAYSTATION 3' === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
		defContextName = '_',
		isOpera = 'undefined' != typeof opera && '[object Opera]' === opera.toString(),
		contexts = {},
		cfg = {},
		globalDefQueue = [],
		useInteractive = !1;
	if ('undefined' == typeof define) {
		if ('undefined' != typeof requirejs) {
			if (isFunction(requirejs)) return;
			(cfg = requirejs), (requirejs = void 0);
		}
		'undefined' == typeof require || isFunction(require) || ((cfg = require), (require = void 0)),
			(req = requirejs =
				function (e, t, n, i) {
					var o,
						r,
						s = defContextName;
					return (
						isArray(e) ||
							'string' == typeof e ||
							((r = e), isArray(t) ? ((e = t), (t = n), (n = i)) : (e = [])),
						r && r.context && (s = r.context),
						(o = getOwn(contexts, s)),
						o || (o = contexts[s] = req.s.newContext(s)),
						r && o.configure(r),
						o.require(e, t, n)
					);
				}),
			(req.config = function (e) {
				return req(e);
			}),
			(req.nextTick =
				'undefined' != typeof setTimeout
					? function (e) {
							setTimeout(e, 4);
					  }
					: function (e) {
							e();
					  }),
			require || (require = req),
			(req.version = version),
			(req.jsExtRegExp = /^\/|:|\?|\.js$/),
			(req.isBrowser = isBrowser),
			(s = req.s = { contexts: contexts, newContext: newContext }),
			req({}),
			each(['toUrl', 'undef', 'defined', 'specified'], function (e) {
				req[e] = function () {
					var t = contexts[defContextName];
					return t.require[e].apply(t, arguments);
				};
			}),
			isBrowser &&
				((head = s.head = document.getElementsByTagName('head')[0]),
				(baseElement = document.getElementsByTagName('base')[0]),
				baseElement && (head = s.head = baseElement.parentNode)),
			(req.onError = defaultOnError),
			(req.createNode = function (e, t, n) {
				var i = e.xhtml
					? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script')
					: document.createElement('script');
				return (
					(i.type = e.scriptType || 'text/javascript'), (i.charset = 'utf-8'), (i.async = !0), i
				);
			}),
			(req.load = function (e, t, n) {
				var i,
					o = (e && e.config) || {};
				if (isBrowser)
					return (
						(i = req.createNode(o, t, n)),
						i.setAttribute('data-requirecontext', e.contextName),
						i.setAttribute('data-requiremodule', t),
						!i.attachEvent ||
						(i.attachEvent.toString && i.attachEvent.toString().indexOf('[native code') < 0) ||
						isOpera
							? (i.addEventListener('load', e.onScriptLoad, !1),
							  i.addEventListener('error', e.onScriptError, !1))
							: ((useInteractive = !0), i.attachEvent('onreadystatechange', e.onScriptLoad)),
						(i.src = n),
						o.onNodeCreated && o.onNodeCreated(i, o, t, n),
						(currentlyAddingScript = i),
						baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i),
						(currentlyAddingScript = null),
						i
					);
				if (isWebWorker)
					try {
						setTimeout(function () {}, 0), importScripts(n), e.completeLoad(t);
					} catch (r) {
						e.onError(
							makeError('importscripts', 'importScripts failed for ' + t + ' at ' + n, r, [t])
						);
					}
			}),
			isBrowser &&
				!cfg.skipDataMain &&
				eachReverse(scripts(), function (e) {
					return (
						head || (head = e.parentNode),
						(dataMain = e.getAttribute('data-main')),
						dataMain
							? ((mainScript = dataMain),
							  cfg.baseUrl ||
									-1 !== mainScript.indexOf('!') ||
									((src = mainScript.split('/')),
									(mainScript = src.pop()),
									(subPath = src.length ? src.join('/') + '/' : './'),
									(cfg.baseUrl = subPath)),
							  (mainScript = mainScript.replace(jsSuffixRegExp, '')),
							  req.jsExtRegExp.test(mainScript) && (mainScript = dataMain),
							  (cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript]),
							  !0)
							: void 0
					);
				}),
			(define = function (e, t, n) {
				var i, o;
				'string' != typeof e && ((n = t), (t = e), (e = null)),
					isArray(t) || ((n = t), (t = null)),
					!t &&
						isFunction(n) &&
						((t = []),
						n.length &&
							(n
								.toString()
								.replace(commentRegExp, commentReplace)
								.replace(cjsRequireRegExp, function (e, n) {
									t.push(n);
								}),
							(t = (1 === n.length ? ['require'] : ['require', 'exports', 'module']).concat(t)))),
					useInteractive &&
						((i = currentlyAddingScript || getInteractiveScript()),
						i &&
							(e || (e = i.getAttribute('data-requiremodule')),
							(o = contexts[i.getAttribute('data-requirecontext')]))),
					o
						? (o.defQueue.push([e, t, n]), (o.defQueueMap[e] = !0))
						: globalDefQueue.push([e, t, n]);
			}),
			(define.amd = { jQuery: !0 }),
			(req.exec = function (text) {
				return eval(text);
			}),
			req(cfg);
	}
})(this),
	define('requireLib', function () {}),
	!(function () {
		function e(e) {
			this.message = e;
		}
		var t = 'undefined' != typeof exports ? exports : self,
			n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		(e.prototype = new Error()),
			(e.prototype.name = 'InvalidCharacterError'),
			t.btoa ||
				(t.btoa = function (t) {
					for (
						var i, o, r = String(t), s = 0, a = n, u = '';
						r.charAt(0 | s) || ((a = '='), s % 1);
						u += a.charAt(63 & (i >> (8 - (s % 1) * 8)))
					) {
						if (((o = r.charCodeAt((s += 0.75))), o > 255))
							throw new e(
								"'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
							);
						i = (i << 8) | o;
					}
					return u;
				}),
			t.atob ||
				(t.atob = function (t) {
					var i = String(t).replace(/=+$/, '');
					if (i.length % 4 == 1)
						throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
					for (
						var o, r, s = 0, a = 0, u = '';
						(r = i.charAt(a++));
						~r && ((o = s % 4 ? 64 * o + r : r), s++ % 4)
							? (u += String.fromCharCode(255 & (o >> ((-2 * s) & 6))))
							: 0
					)
						r = n.indexOf(r);
					return u;
				});
	})(),
	define('lib/base64.min.js', function () {}),
	(window.browserDetect = {
		init: function () {
			(this.browser = this.searchString(this.dataBrowser) || 'Other'),
				(this.version =
					this.searchVersion(navigator.userAgent) ||
					this.searchVersion(navigator.appVersion) ||
					'Unknown'),
				'Explorer' == this.browser &&
					'7' == this.version &&
					navigator.userAgent.match(/Trident/i) &&
					(this.version = this.searchVersionIE());
		},
		searchString: function (e) {
			for (var t = 0; t < e.length; t++) {
				var n = e[t].string;
				if (((this.versionSearchString = e[t].subString), -1 != n.indexOf(e[t].subString)))
					return e[t].identity;
			}
		},
		searchVersion: function (e) {
			var t = e.indexOf(this.versionSearchString);
			if (-1 != t) return parseFloat(e.substring(t + this.versionSearchString.length + 1));
		},
		searchVersionIE: function () {
			var e,
				t = navigator.userAgent.toString().toLowerCase(),
				n = /(trident)(?:.*rv:([\w.]+))?/.exec(t) || /(msie) ([\w.]+)/.exec(t) || ['', null, -1];
			try {
				e = n[2].split('.')[0];
			} catch (i) {
				e = 'unknown';
			}
			return e;
		},
		dataBrowser: [
			{ string: navigator.userAgent, subString: 'Chrome', identity: 'Chrome' },
			{ string: navigator.userAgent, subString: 'MSIE', identity: 'Explorer' },
			{ string: navigator.userAgent, subString: 'Trident', identity: 'Explorer' },
			{ string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox' },
			{ string: navigator.userAgent, subString: 'Safari', identity: 'Safari' },
			{ string: navigator.userAgent, subString: 'Opera', identity: 'Opera' }
		]
	}),
	window.browserDetect.init(),
	define('lib/browserdetect.js', function () {}),
	(function (e) {
		(jQuery.browser = jQuery.browser || {}).mobile =
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|android|ipad|playbook|silk|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				e
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				e.substr(0, 4)
			);
	})(navigator.userAgent || navigator.vendor || window.opera),
	define('lib/detectmobilebrowser.js', function () {}),
	(function (e) {
		e(jQuery);
	})(function (e) {
		if (e.support.cors || !e.ajaxTransport || !window.XDomainRequest) return e;
		var t = /^(https?:)?\/\//i,
			n = /^get|post$/i,
			i = new RegExp('^(//|' + location.protocol + ')', 'i');
		return (
			e.ajaxTransport('* text html xml json', function (o, r, s) {
				if (o.crossDomain && o.async && n.test(o.type) && t.test(o.url) && i.test(o.url)) {
					var a = null;
					return {
						send: function (t, n) {
							var i = '',
								s = (r.dataType || '').toLowerCase();
							(a = new XDomainRequest()),
								/^\d+$/.test(r.timeout) && (a.timeout = r.timeout),
								(a.ontimeout = function () {
									n(500, 'timeout');
								}),
								(a.onload = function () {
									var t =
											'Content-Length: ' +
											a.responseText.length +
											'\r\nContent-Type: ' +
											a.contentType,
										i = { code: 200, message: 'success' },
										o = { text: a.responseText };
									try {
										if ('html' === s || /text\/html/i.test(a.contentType)) o.html = a.responseText;
										else if ('json' === s || ('text' !== s && /\/json/i.test(a.contentType)))
											try {
												o.json = e.parseJSON(a.responseText);
											} catch (r) {
												(i.code = 500), (i.message = 'parseerror');
											}
										else if ('xml' === s || ('text' !== s && /\/xml/i.test(a.contentType))) {
											var u = new ActiveXObject('Microsoft.XMLDOM');
											u.async = !1;
											try {
												u.loadXML(a.responseText);
											} catch (r) {
												u = void 0;
											}
											if (!u || !u.documentElement || u.getElementsByTagName('parsererror').length)
												throw (
													((i.code = 500),
													(i.message = 'parseerror'),
													'Invalid XML: ' + a.responseText)
												);
											o.xml = u;
										}
									} catch (l) {
										throw l;
									} finally {
										n(i.code, i.message, o, t);
									}
								}),
								(a.onprogress = function () {}),
								(a.onerror = function () {
									n(401, 'error', { text: a.responseText });
								}),
								r.data && (i = 'string' === e.type(r.data) ? r.data : e.param(r.data)),
								a.open(o.type, o.url),
								a.send(i);
						},
						abort: function () {
							a && a.abort();
						}
					};
				}
			}),
			e
		);
	}),
	define('lib/jquery.xdomainrequest.js', function () {}),
	(window.Modernizr = (function (e, t, n) {
		function i(e) {
			f.cssText = e;
		}
		function o(e, t) {
			return typeof e === t;
		}
		function r() {
			(l.input = (function (n) {
				for (var i = 0, o = n.length; o > i; i++) b[n[i]] = n[i] in g;
				return b.list && (b.list = !!t.createElement('datalist') && !!e.HTMLDataListElement), b;
			})(
				'autocomplete autofocus list placeholder max min multiple pattern required step'.split(' ')
			)),
				(l.inputtypes = (function (e) {
					for (var i, o, r, s = 0, a = e.length; a > s; s++)
						g.setAttribute('type', (o = e[s])),
							(i = 'text' !== g.type),
							i &&
								((g.value = v),
								(g.style.cssText = 'position:absolute;visibility:hidden;'),
								/^range$/.test(o) && g.style.WebkitAppearance !== n
									? (h.appendChild(g),
									  (r = t.defaultView),
									  (i =
											r.getComputedStyle &&
											'textfield' !== r.getComputedStyle(g, null).WebkitAppearance &&
											0 !== g.offsetHeight),
									  h.removeChild(g))
									: /^(search|tel)$/.test(o) ||
									  (i = /^(url|email)$/.test(o)
											? g.checkValidity && g.checkValidity() === !1
											: g.value != v)),
							(y[e[s]] = !!i);
					return y;
				})(
					'search tel url email datetime date month week time datetime-local number range color'.split(
						' '
					)
				));
		}
		var s,
			a,
			u = '2.8.3',
			l = {},
			c = !0,
			h = t.documentElement,
			p = 'modernizr',
			d = t.createElement(p),
			f = d.style,
			g = t.createElement('input'),
			v = ':)',
			m = ({}.toString, {}),
			y = {},
			b = {},
			E = [],
			_ = E.slice,
			w = {}.hasOwnProperty;
		(a =
			o(w, 'undefined') || o(w.call, 'undefined')
				? function (e, t) {
						return t in e && o(e.constructor.prototype[t], 'undefined');
				  }
				: function (e, t) {
						return w.call(e, t);
				  }),
			Function.prototype.bind ||
				(Function.prototype.bind = function (e) {
					var t = this;
					if ('function' != typeof t) throw new TypeError();
					var n = _.call(arguments, 1),
						i = function () {
							if (this instanceof i) {
								var o = function () {};
								o.prototype = t.prototype;
								var r = new o(),
									s = t.apply(r, n.concat(_.call(arguments)));
								return Object(s) === s ? s : r;
							}
							return t.apply(e, n.concat(_.call(arguments)));
						};
					return i;
				});
		for (var S in m)
			a(m, S) && ((s = S.toLowerCase()), (l[s] = m[S]()), E.push((l[s] ? '' : 'no-') + s));
		return (
			l.input || r(),
			(l.addTest = function (e, t) {
				if ('object' == typeof e) for (var i in e) a(e, i) && l.addTest(i, e[i]);
				else {
					if (((e = e.toLowerCase()), l[e] !== n)) return l;
					(t = 'function' == typeof t ? t() : t),
						'undefined' != typeof c && c && (h.className += ' ' + (t ? '' : 'no-') + e),
						(l[e] = t);
				}
				return l;
			}),
			i(''),
			(d = g = null),
			(l._version = u),
			(h.className =
				h.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + (c ? ' js ' + E.join(' ') : '')),
			l
		);
	})(this, this.document)),
	(function (e, t, n) {
		function i(e) {
			return '[object Function]' == v.call(e);
		}
		function o(e) {
			return 'string' == typeof e;
		}
		function r() {}
		function s(e) {
			return !e || 'loaded' == e || 'complete' == e || 'uninitialized' == e;
		}
		function a() {
			var e = m.shift();
			(y = 1),
				e
					? e.t
						? f(function () {
								('c' == e.t ? p.injectCss : p.injectJs)(e.s, 0, e.a, e.x, e.e, 1);
						  }, 0)
						: (e(), a())
					: (y = 0);
		}
		function u(e, n, i, o, r, u, l) {
			function c(t) {
				if (
					!d &&
					s(h.readyState) &&
					((b.r = d = 1), !y && a(), (h.onload = h.onreadystatechange = null), t)
				) {
					'img' != e &&
						f(function () {
							_.removeChild(h);
						}, 50);
					for (var i in I[n]) I[n].hasOwnProperty(i) && I[n][i].onload();
				}
			}
			var l = l || p.errorTimeout,
				h = t.createElement(e),
				d = 0,
				v = 0,
				b = { t: i, s: n, e: r, a: u, x: l };
			1 === I[n] && ((v = 1), (I[n] = [])),
				'object' == e ? (h.data = n) : ((h.src = n), (h.type = e)),
				(h.width = h.height = '0'),
				(h.onerror =
					h.onload =
					h.onreadystatechange =
						function () {
							c.call(this, v);
						}),
				m.splice(o, 0, b),
				'img' != e && (v || 2 === I[n] ? (_.insertBefore(h, E ? null : g), f(c, l)) : I[n].push(h));
		}
		function l(e, t, n, i, r) {
			return (
				(y = 0),
				(t = t || 'j'),
				o(e)
					? u('c' == t ? S : w, e, t, this.i++, n, i, r)
					: (m.splice(this.i++, 0, e), 1 == m.length && a()),
				this
			);
		}
		function c() {
			var e = p;
			return (e.loader = { load: l, i: 0 }), e;
		}
		var h,
			p,
			d = t.documentElement,
			f = e.setTimeout,
			g = t.getElementsByTagName('script')[0],
			v = {}.toString,
			m = [],
			y = 0,
			b = 'MozAppearance' in d.style,
			E = b && !!t.createRange().compareNode,
			_ = E ? d : g.parentNode,
			d = e.opera && '[object Opera]' == v.call(e.opera),
			d = !!t.attachEvent && !d,
			w = b ? 'object' : d ? 'script' : 'img',
			S = d ? 'script' : w,
			x =
				Array.isArray ||
				function (e) {
					return '[object Array]' == v.call(e);
				},
			$ = [],
			I = {},
			T = {
				timeout: function (e, t) {
					return t.length && (e.timeout = t[0]), e;
				}
			};
		(p = function (e) {
			function t(e) {
				var t,
					n,
					i,
					e = e.split('!'),
					o = $.length,
					r = e.pop(),
					s = e.length,
					r = { url: r, origUrl: r, prefixes: e };
				for (n = 0; s > n; n++) (i = e[n].split('=')), (t = T[i.shift()]) && (r = t(r, i));
				for (n = 0; o > n; n++) r = $[n](r);
				return r;
			}
			function s(e, o, r, s, a) {
				var u = t(e),
					l = u.autoCallback;
				u.url.split('.').pop().split('?').shift(),
					u.bypass ||
						(o && (o = i(o) ? o : o[e] || o[s] || o[e.split('/').pop().split('?')[0]]),
						u.instead
							? u.instead(e, o, r, s, a)
							: (I[u.url] ? (u.noexec = !0) : (I[u.url] = 1),
							  r.load(
									u.url,
									u.forceCSS || (!u.forceJS && 'css' == u.url.split('.').pop().split('?').shift())
										? 'c'
										: n,
									u.noexec,
									u.attrs,
									u.timeout
							  ),
							  (i(o) || i(l)) &&
									r.load(function () {
										c(), o && o(u.origUrl, a, s), l && l(u.origUrl, a, s), (I[u.url] = 2);
									})));
			}
			function a(e, t) {
				function n(e, n) {
					if (e) {
						if (o(e))
							n ||
								(h = function () {
									var e = [].slice.call(arguments);
									p.apply(this, e), d();
								}),
								s(e, h, t, 0, l);
						else if (Object(e) === e)
							for (u in ((a = (function () {
								var t,
									n = 0;
								for (t in e) e.hasOwnProperty(t) && n++;
								return n;
							})()),
							e))
								e.hasOwnProperty(u) &&
									(!n &&
										!--a &&
										(i(h)
											? (h = function () {
													var e = [].slice.call(arguments);
													p.apply(this, e), d();
											  })
											: (h[u] = (function (e) {
													return function () {
														var t = [].slice.call(arguments);
														e && e.apply(this, t), d();
													};
											  })(p[u]))),
									s(e[u], h, t, u, l));
					} else !n && d();
				}
				var a,
					u,
					l = !!e.test,
					c = e.load || e.both,
					h = e.callback || r,
					p = h,
					d = e.complete || r;
				n(l ? e.yep : e.nope, !!c), c && n(c);
			}
			var u,
				l,
				h = this.yepnope.loader;
			if (o(e)) s(e, 0, h, 0);
			else if (x(e))
				for (u = 0; u < e.length; u++)
					(l = e[u]), o(l) ? s(l, 0, h, 0) : x(l) ? p(l) : Object(l) === l && a(l, h);
			else Object(e) === e && a(e, h);
		}),
			(p.addPrefix = function (e, t) {
				T[e] = t;
			}),
			(p.addFilter = function (e) {
				$.push(e);
			}),
			(p.errorTimeout = 1e4),
			null == t.readyState &&
				t.addEventListener &&
				((t.readyState = 'loading'),
				t.addEventListener(
					'DOMContentLoaded',
					(h = function () {
						t.removeEventListener('DOMContentLoaded', h, 0), (t.readyState = 'complete');
					}),
					0
				)),
			(e.yepnope = c()),
			(e.yepnope.executeStack = a),
			(e.yepnope.injectJs = function (e, n, i, o, u, l) {
				var c,
					h,
					d = t.createElement('script'),
					o = o || p.errorTimeout;
				d.src = e;
				for (h in i) d.setAttribute(h, i[h]);
				(n = l ? a : n || r),
					(d.onreadystatechange = d.onload =
						function () {
							!c && s(d.readyState) && ((c = 1), n(), (d.onload = d.onreadystatechange = null));
						}),
					f(function () {
						c || ((c = 1), n(1));
					}, o),
					u ? d.onload() : g.parentNode.insertBefore(d, g);
			}),
			(e.yepnope.injectCss = function (e, n, i, o, s, u) {
				var l,
					o = t.createElement('link'),
					n = u ? a : n || r;
				(o.href = e), (o.rel = 'stylesheet'), (o.type = 'text/css');
				for (l in i) o.setAttribute(l, i[l]);
				s || (g.parentNode.insertBefore(o, g), f(n, 0));
			});
	})(this, document),
	(Modernizr.load = function () {
		yepnope.apply(window, [].slice.call(arguments, 0));
	}),
	Modernizr.addTest('cors', !!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest())),
	define('lib/modernizr.js', function () {});
var __extends =
		(this && this.__extends) ||
		(function () {
			var e =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (e, t) {
						e.__proto__ = t;
					}) ||
				function (e, t) {
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
				};
			return function (t, n) {
				function i() {
					this.constructor = t;
				}
				e(t, n),
					(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
			};
		})(),
	exjs;
!(function (e) {
	e.version = '0.5.1';
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	Array.isArray ||
		(Array.isArray = function (e) {
			return '[object Array]' === Object.prototype.toString.call(e);
		});
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	var t = (function () {
		function e() {}
		return (
			(e.prototype.getEnumerator = function () {
				return {
					moveNext: function () {
						return !1;
					},
					current: void 0
				};
			}),
			(e.prototype.aggregate = function (e, t) {
				for (var n = e, i = this.getEnumerator(); i.moveNext(); ) n = t(n, i.current);
				return n;
			}),
			(e.prototype.all = function (e) {
				if (e)
					for (var t = this.getEnumerator(), n = 0; t.moveNext(); ) {
						if (!e(t.current, n)) return !1;
						n++;
					}
				return !0;
			}),
			(e.prototype.any = function (e) {
				for (var t = this.getEnumerator(), n = 0; t.moveNext(); ) {
					if (!e) return !0;
					if (e(t.current, n)) return !0;
					n++;
				}
				return !1;
			}),
			(e.prototype.append = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				throw new Error('Not implemented');
			}),
			(e.prototype.apply = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.at = function (e) {
				for (var t = this.getEnumerator(), n = 0; t.moveNext(); ) {
					if (n === e) return t.current;
					n++;
				}
			}),
			(e.prototype.average = function (e) {
				var t = 0,
					n = 0;
				e =
					e ||
					function (e) {
						if ('number' != typeof e) throw new Error('Object is not a number.');
						return e;
					};
				for (var i = this.getEnumerator(); i.moveNext(); ) (n += e(i.current)), t++;
				return 0 === t ? 0 : n / t;
			}),
			(e.prototype.concat = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.count = function (e) {
				for (var t = 0, n = this.getEnumerator(); n.moveNext(); ) (e && !e(n.current)) || t++;
				return t;
			}),
			(e.prototype.difference = function (e, t) {
				return (
					(t =
						t ||
						function (e, t) {
							return e === t;
						}),
					e instanceof Array && (e = e.en()),
					{
						intersection: this.intersect(e, t).toArray().en(),
						aNotB: this.except(e, t).toArray().en(),
						bNotA: e.except(this, t).toArray().en()
					}
				);
			}),
			(e.prototype.distinct = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.except = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.first = function (e) {
				for (var t = this.getEnumerator(); t.moveNext(); ) if (!e || e(t.current)) return t.current;
			}),
			(e.prototype.firstIndex = function (e) {
				for (var t = this.getEnumerator(), n = 0; t.moveNext(); n++)
					if (!e || e(t.current)) return n;
				return -1;
			}),
			(e.prototype.forEach = function (e) {
				for (var t = this.getEnumerator(); t.moveNext(); ) e(t.current);
			}),
			(e.prototype.groupBy = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.intersect = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.join = function (e, t, n, i, o) {
				throw new Error('Not implemented');
			}),
			(e.prototype.last = function (e) {
				for (var t, n = this.getEnumerator(); n.moveNext(); )
					(e && !e(n.current)) || (t = n.current);
				return t;
			}),
			(e.prototype.lastIndex = function (e) {
				for (var t = -1, n = this.getEnumerator(), i = 0; n.moveNext(); i++)
					(e && !e(n.current)) || (t = i);
				return t;
			}),
			(e.prototype.max = function (e) {
				var t = this.getEnumerator();
				if (!t.moveNext()) return 0;
				e =
					e ||
					function (e) {
						if ('number' != typeof e) throw new Error('Object is not a number.');
						return e;
					};
				for (var n = e(t.current); t.moveNext(); ) n = Math.max(n, e(t.current));
				return n;
			}),
			(e.prototype.min = function (e) {
				var t = this.getEnumerator();
				if (!t.moveNext()) return 0;
				e =
					e ||
					function (e) {
						if ('number' != typeof e) throw new Error('Object is not a number.');
						return e;
					};
				for (var n = e(t.current); t.moveNext(); ) n = Math.min(n, e(t.current));
				return n;
			}),
			(e.prototype.orderBy = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.orderByDescending = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.prepend = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				throw new Error('Not implemented');
			}),
			(e.prototype.reverse = function () {
				throw new Error('Not implemented');
			}),
			(e.prototype.select = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.selectMany = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.skip = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.skipWhile = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.standardDeviation = function (e) {
				var t = this.average(e),
					n = 0,
					i = 0;
				e =
					e ||
					function (e) {
						if ('number' != typeof e) throw new Error('Object is not a number.');
						return e;
					};
				for (var o = this.getEnumerator(); o.moveNext(); ) {
					var r = e(o.current) - t;
					(n += r * r), i++;
				}
				return Math.sqrt(n / i);
			}),
			(e.prototype.sum = function (e) {
				var t = 0;
				e =
					e ||
					function (e) {
						if ('number' != typeof e) throw new Error('Object is not a number.');
						return e;
					};
				for (var n = this.getEnumerator(); n.moveNext(); ) t += e(n.current);
				return t;
			}),
			(e.prototype.take = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.takeWhile = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.traverse = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.traverseUnique = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.toArray = function () {
				for (var e = [], t = this.getEnumerator(); t.moveNext(); ) e.push(t.current);
				return e;
			}),
			(e.prototype.toMap = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.toList = function () {
				throw new Error('Not implemented');
			}),
			(e.prototype.union = function (e, t) {
				throw new Error('Not implemented');
			}),
			(e.prototype.where = function (e) {
				throw new Error('Not implemented');
			}),
			(e.prototype.zip = function (e, t) {
				throw new Error('Not implemented');
			}),
			e
		);
	})();
	e.Enumerable = t;
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	var t = (function () {
		function t(e) {
			(this.size = 0), (this._keys = []), (this._values = []);
			var t;
			if (
				(e instanceof Array ? (t = e.en()) : e && e.getEnumerator instanceof Function && (t = e), t)
			)
				for (var n = t.getEnumerator(); n && n.moveNext(); ) this.set(n.current[0], n.current[1]);
		}
		return (
			(t.prototype.clear = function () {
				(this._keys.length = 0), (this._values.length = 0), (this.size = 0);
			}),
			(t.prototype['delete'] = function (e) {
				var t = this._keys.indexOf(e);
				return t > -1 && (this._keys.splice(t, 1), this._values.splice(t, 1), this.size--, !0);
			}),
			(t.prototype.entries = function () {
				var t = this;
				return e.range(0, this.size).select(function (e) {
					return [t._keys[e], t._values[e]];
				});
			}),
			(t.prototype.forEach = function (e, t) {
				null == t && (t = this);
				for (var n = 0, i = this._keys, o = this._values, r = i.length; r > n; n++)
					e.call(t, o[n], i[n], this);
			}),
			(t.prototype.get = function (e) {
				var t = this._keys.indexOf(e);
				return this._values[t];
			}),
			(t.prototype.has = function (e) {
				return this._keys.indexOf(e) > -1;
			}),
			(t.prototype.keys = function () {
				return this._keys.en();
			}),
			(t.prototype.set = function (e, t) {
				var n = this._keys.indexOf(e);
				n > -1 ? (this._values[n] = t) : (this._keys.push(e), this._values.push(t), this.size++);
			}),
			(t.prototype.values = function () {
				return this._values.en();
			}),
			t
		);
	})();
	(e.Map3 = t),
		(e.Enumerable.prototype.toMap = function (e, n) {
			for (var i = new t(), o = this.getEnumerator(); o.moveNext(); )
				i.set(e(o.current), n(o.current));
			return i;
		}),
		e.List && (e.List.prototype.toMap = e.Enumerable.prototype.toMap);
})(exjs || (exjs = {})),
	(function (e) {
		e.Map || (e.Map = exjs.Map3);
	})('undefined' == typeof window ? global : window);
var exjs;
!(function (e) {
	function t(t) {
		var n = new e.Enumerable();
		return (
			(n.getEnumerator = function () {
				var e = {
					current: void 0,
					moveNext: function () {
						return t(e);
					}
				};
				return e;
			}),
			n
		);
	}
	e.anonymous = t;
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i,
			o = 1,
			r = {
				current: void 0,
				moveNext: function () {
					if (2 > o) {
						if (((n = n || e.getEnumerator()), n.moveNext())) return (r.current = n.current), !0;
						o++;
					}
					return (
						(i = i || t.en().getEnumerator()),
						i.moveNext() ? ((r.current = i.current), !0) : ((r.current = void 0), !1)
					);
				}
			};
		return r;
	}
	(e.Enumerable.prototype.append = function () {
		for (var n = this, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
		var r = new e.Enumerable();
		return (
			(r.getEnumerator = function () {
				return t(n, i);
			}),
			r
		);
	}),
		e.List && (e.List.prototype.append = e.Enumerable.prototype.append);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i = 0,
			o = {
				current: void 0,
				moveNext: function () {
					return (
						n || (n = e.getEnumerator()), !!n.moveNext() && (t((o.current = n.current), i), i++, !0)
					);
				}
			};
		return o;
	}
	(e.Enumerable.prototype.apply = function (n) {
		var i = this,
			o = new e.Enumerable();
		return (
			(o.getEnumerator = function () {
				return t(i, n);
			}),
			o
		);
	}),
		e.List && (e.List.prototype.apply = e.Enumerable.prototype.apply);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e) {
		var t = e.length,
			n = { moveNext: void 0, current: void 0 },
			i = -1;
		return (
			(n.moveNext = function () {
				return i++, i >= t ? ((n.current = void 0), !1) : ((n.current = e[i]), !0);
			}),
			n
		);
	}
	function n() {
		return this && Array.isArray(this) ? new i(this) : new e.Enumerable();
	}
	var i = (function (e) {
		function n(n) {
			var i = e.call(this) || this;
			return (
				(i.getEnumerator = function () {
					return t(n);
				}),
				(i.toArray = function () {
					return n.slice(0);
				}),
				i
			);
		}
		return __extends(n, e), n;
	})(e.Enumerable);
	try {
		Object.defineProperty(Array.prototype, 'en', {
			value: n,
			enumerable: !1,
			writable: !1,
			configurable: !1
		});
	} catch (e) {
		Array.prototype.en = n;
	}
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i = !1,
			o = {
				current: void 0,
				moveNext: function () {
					return (
						n || (n = e.getEnumerator()),
						(o.current = void 0),
						n.moveNext()
							? ((o.current = n.current), !0)
							: !i &&
							  ((i = !0), (n = t.getEnumerator()), !!n.moveNext() && ((o.current = n.current), !0))
					);
				}
			};
		return o;
	}
	(e.Enumerable.prototype.concat = function (n) {
		var i = this,
			o = n instanceof Array ? n.en() : n,
			r = new e.Enumerable();
		return (
			(r.getEnumerator = function () {
				return t(i, o);
			}),
			r
		);
	}),
		e.List && (e.List.prototype.concat = e.Enumerable.prototype.concat);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i = [],
			o = {
				current: void 0,
				moveNext: function () {
					if ((n || (n = e.getEnumerator()), (o.current = void 0), !t)) {
						for (; n.moveNext(); )
							if (i.indexOf(n.current) < 0) return i.push((o.current = n.current)), !0;
						return !1;
					}
					for (; n.moveNext(); ) {
						for (var r = 0, s = i.length, a = !1; s > r && !a; r++) a = !!t(i[r], n.current);
						if (!a) return i.push((o.current = n.current)), !0;
					}
					return !1;
				}
			};
		return o;
	}
	(e.Enumerable.prototype.distinct = function (n) {
		var i = this,
			o = new e.Enumerable();
		return (
			(o.getEnumerator = function () {
				return t(i, n);
			}),
			o
		);
	}),
		e.List && (e.List.prototype.distinct = e.Enumerable.prototype.distinct);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t, n) {
		n =
			n ||
			function (e, t) {
				return e === t;
			};
		var i,
			o = {
				current: void 0,
				moveNext: function () {
					for (i || (i = e.getEnumerator()), o.current = void 0; i.moveNext(); ) {
						for (var r = !1, s = t.getEnumerator(); s.moveNext() && !r; )
							r = n(i.current, s.current);
						if (!r) return (o.current = i.current), !0;
					}
					return !1;
				}
			};
		return o;
	}
	(e.Enumerable.prototype.except = function (n, i) {
		var o = this,
			r = n instanceof Array ? n.en() : n,
			s = new e.Enumerable();
		return (
			(s.getEnumerator = function () {
				return t(o, r, i);
			}),
			s
		);
	}),
		e.List && (e.List.prototype.except = e.Enumerable.prototype.except);
})(exjs || (exjs = {})),
	(Function.prototype.fromJson = function (e, t) {
		function n(e, t) {
			if (null == e) return e;
			if (t instanceof Function) return t(e);
			if (t instanceof Array) {
				if (((t = t[0]), !(t instanceof Function && e instanceof Array))) return;
				for (var n = [], i = 0; i < e.length; i++) n.push(t(e[i]));
				return n;
			}
		}
		var i = new this();
		if (null == e) return i;
		var o = [];
		for (var r in t) {
			var s = n(e[r], t[r]);
			void 0 !== s && ((i[r] = s), o.push(r));
		}
		for (var r in this.$jsonMappings)
			if (!(o.indexOf(r) > -1)) {
				var s = n(e[r], this.$jsonMappings[r]);
				void 0 !== s && ((i[r] = s), o.push(r));
			}
		for (var r in e) o.indexOf(r) > -1 || (i[r] = e[r]);
		return i;
	});
var exjs;
!(function (e) {
	function t(e, t, i) {
		var o,
			r = 0,
			s = {
				current: void 0,
				moveNext: function () {
					return (
						o || (o = n(e, t, i)),
						(s.current = void 0),
						!(r >= o.length || ((s.current = o[r]), r++, 0))
					);
				}
			};
		return s;
	}
	function n(e, t, n) {
		n =
			n ||
			function (e, t) {
				return e === t;
			};
		for (var o, r = [], s = [], a = e.getEnumerator(); a.moveNext(); ) {
			o = t(a.current);
			for (var u = -1, l = 0, c = s.length; c > l; l++)
				if (n(o, s[l])) {
					u = l;
					break;
				}
			var h;
			0 > u ? (s.push(o), r.push((h = new i(o)))) : (h = r[u]), h._add(a.current);
		}
		return r;
	}
	var i = (function (e) {
		function t(t) {
			var n = e.call(this) || this;
			return (
				(n.key = t),
				(n._arr = []),
				(n.getEnumerator = function () {
					return n._arr.en().getEnumerator();
				}),
				n
			);
		}
		return (
			__extends(t, e),
			(t.prototype._add = function (e) {
				this._arr.push(e);
			}),
			t
		);
	})(e.Enumerable);
	(e.Enumerable.prototype.groupBy = function (n, i) {
		var o = this,
			r = new e.Enumerable();
		return (
			(r.getEnumerator = function () {
				return t(o, n, i);
			}),
			r
		);
	}),
		e.List && (e.List.prototype.groupBy = e.Enumerable.prototype.groupBy);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(t, n, i) {
		i =
			i ||
			function (e, t) {
				return e === t;
			};
		var o,
			r = {
				current: void 0,
				moveNext: function () {
					for (o || (o = e.en(t).distinct().getEnumerator()), r.current = void 0; o.moveNext(); ) {
						for (var s = !1, a = n.getEnumerator(); a.moveNext() && !s; )
							s = i(o.current, a.current);
						if (s) return (r.current = o.current), !0;
					}
					return !1;
				}
			};
		return r;
	}
	(e.Enumerable.prototype.intersect = function (n, i) {
		var o = this,
			r = n instanceof Array ? n.en() : n,
			s = new e.Enumerable();
		return (
			(s.getEnumerator = function () {
				return t(o, r, i);
			}),
			s
		);
	}),
		e.List && (e.List.prototype.intersect = e.Enumerable.prototype.intersect);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(t, n, i, o, r, s) {
		s =
			s ||
			function (e, t) {
				return e === t;
			};
		var a,
			u,
			l = 0,
			c = {
				current: void 0,
				moveNext: function () {
					if (((c.current = void 0), !a)) {
						if (((a = t.getEnumerator()), !a.moveNext())) return !1;
						u = e.en(n).toArray();
					}
					var h;
					do {
						for (; l < u.length; l++)
							if (((h = u[l]), s(i(a.current), o(h))))
								return l++, (c.current = r(a.current, h)), !0;
						l = 0;
					} while (a.moveNext());
					return !1;
				}
			};
		return c;
	}
	(e.Enumerable.prototype.join = function (n, i, o, r, s) {
		var a = this,
			u = n instanceof Array ? n.en() : n,
			l = new e.Enumerable();
		return (
			(l.getEnumerator = function () {
				return t(a, u, i, o, r, s);
			}),
			l
		);
	}),
		e.List && (e.List.prototype.join = e.Enumerable.prototype.join);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t() {
		this.constructor = n;
	}
	e.Enumerable.prototype.toList = function () {
		for (var e = new n(), t = this.getEnumerator(); t.moveNext(); ) e.push(t.current);
		return e;
	};
	var n = (function (e) {
		function t() {
			return (null !== e && e.apply(this, arguments)) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.toString = function () {
				throw new Error('Not implemented');
			}),
			(t.prototype.toLocaleString = function () {
				throw new Error('Not implemented');
			}),
			(t.prototype.pop = function () {
				throw new Error('Not implemented');
			}),
			(t.prototype.push = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				throw new Error('Not implemented');
			}),
			(t.prototype.shift = function () {
				throw new Error('Not implemented');
			}),
			(t.prototype.slice = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.sort = function (e) {
				throw new Error('Not implemented');
			}),
			(t.prototype.splice = function () {
				throw new Error('Not implemented');
			}),
			(t.prototype.unshift = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				throw new Error('Not implemented');
			}),
			(t.prototype.indexOf = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.lastIndexOf = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.every = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.some = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.forEach = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.map = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.filter = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.reduce = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.reduceRight = function (e, t) {
				throw new Error('Not implemented');
			}),
			(t.prototype.remove = function (e) {
				throw new Error('Not implemented');
			}),
			(t.prototype.removeWhere = function (e) {
				throw new Error('Not implemented');
			}),
			t
		);
	})(e.Enumerable);
	e.List = n;
	for (var i in Array) Array.hasOwnProperty(i) && (n[i] = Array[i]);
	(t.prototype = Array.prototype), (n.prototype = new t());
	for (var o in e.Enumerable.prototype)
		'getEnumerator' !== o && (n.prototype[o] = e.Enumerable.prototype[o]);
	(n.prototype.getEnumerator = function () {
		var e = this,
			t = e.length,
			n = { moveNext: void 0, current: void 0 },
			i = -1;
		return (
			(n.moveNext = function () {
				return i++, i >= t ? ((n.current = void 0), !1) : ((n.current = e[i]), !0);
			}),
			n
		);
	}),
		(n.prototype.remove = function (e) {
			return this.removeWhere(function (t) {
				return t === e;
			}).any();
		}),
		(n.prototype.removeWhere = function (e) {
			for (var t, n = [], i = this.length - 1; i >= 0; i--)
				(t = this[i]), e(t, i) === !0 && (this.splice(i, 1), n.push(t));
			return n.en().reverse();
		});
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t, i, o) {
		return new n(e, t, i, o);
	}
	var n = (function (t) {
			function n(e, n, i, o) {
				var r = t.call(this) || this;
				(r.Source = e),
					(o =
						o ||
						function (e, t) {
							return e > t ? 1 : t > e ? -1 : 0;
						});
				var s = i === !0 ? -1 : 1;
				return (
					(r.Sorter = function (e, t) {
						return s * o(n(e), n(t));
					}),
					r
				);
			}
			return (
				__extends(n, t),
				(n.prototype.getEnumerator = function () {
					var t,
						n = this.Source,
						i = this.Sorter,
						o = 0,
						r = {
							current: void 0,
							moveNext: function () {
								return (
									t || ((t = e.en(n).toArray()), t.sort(i)),
									(r.current = void 0),
									!(o >= t.length || ((r.current = t[o]), o++, 0))
								);
							}
						};
					return r;
				}),
				(n.prototype.thenBy = function (e, t) {
					return new i(this, e, !1, t);
				}),
				(n.prototype.thenByDescending = function (e, t) {
					return new i(this, e, !0, t);
				}),
				n
			);
		})(e.Enumerable),
		i = (function (e) {
			function t(t, n, i, o) {
				var r = e.call(this, t, n, i, o) || this,
					s = t.Sorter,
					a = r.Sorter;
				return (
					(r.Sorter = function (e, t) {
						return s(e, t) || a(e, t);
					}),
					r
				);
			}
			return __extends(t, e), t;
		})(n),
		o = e.Enumerable.prototype;
	(o.orderBy = function (e, n) {
		return t(this, e, !1, n);
	}),
		(o.orderByDescending = function (e, n) {
			return t(this, e, !0, n);
		}),
		e.List &&
			((e.List.prototype.orderBy = e.Enumerable.prototype.orderBy),
			(e.List.prototype.orderByDescending = e.Enumerable.prototype.orderByDescending));
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i,
			o = 1,
			r = {
				current: void 0,
				moveNext: function () {
					if (2 > o) {
						if (((n = n || t.en().getEnumerator()), n.moveNext()))
							return (r.current = n.current), !0;
						o++;
					}
					return (
						(i = i || e.getEnumerator()),
						i.moveNext() ? ((r.current = i.current), !0) : ((r.current = void 0), !1)
					);
				}
			};
		return r;
	}
	(e.Enumerable.prototype.prepend = function () {
		for (var n = this, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
		var r = new e.Enumerable();
		return (
			(r.getEnumerator = function () {
				return t(n, i);
			}),
			r
		);
	}),
		e.List && (e.List.prototype.prepend = e.Enumerable.prototype.prepend);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t, n) {
		var i = e - n,
			o = {
				current: void 0,
				moveNext: function () {
					return (i += n), !(i >= t || ((o.current = i), 0));
				}
			};
		return o;
	}
	function n(n, i, o) {
		if (((n = n || 0), (i = i || 0), n > i)) throw new Error('Start cannot be greater than end.');
		null == o && (o = 1);
		var r = new e.Enumerable();
		return (
			(r.getEnumerator = function () {
				return t(n, i, o);
			}),
			r
		);
	}
	e.range = n;
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(t) {
		var n,
			i = 0,
			o = {
				current: void 0,
				moveNext: function () {
					return n || ((n = e.en(t).toArray()), (i = n.length)), i--, (o.current = n[i]), i >= 0;
				}
			};
		return o;
	}
	(e.Enumerable.prototype.reverse = function () {
		var n = this,
			i = new e.Enumerable();
		return (
			(i.getEnumerator = function () {
				return t(n);
			}),
			i
		);
	}),
		e.List && (e.List.prototype.reverse = e.Enumerable.prototype.reverse);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		if (((t = t || 0), 0 === t)) return Math.round(e);
		var n = Math.pow(10, t);
		return Math.round(e * n) / n;
	}
	e.round = t;
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i = 0,
			o = {
				current: void 0,
				moveNext: function () {
					return (
						n || (n = e.getEnumerator()), !!n.moveNext() && ((o.current = t(n.current, i)), i++, !0)
					);
				}
			};
		return o;
	}
	function n(t, n) {
		var i,
			o,
			r = {
				current: void 0,
				moveNext: function () {
					for (r.current = void 0, i || (i = t.getEnumerator()); !o || !o.moveNext(); ) {
						if (!i.moveNext()) return !1;
						o = e.selectorEnumerator(n(i.current));
					}
					return (r.current = o.current), !0;
				}
			};
		return r;
	}
	(e.Enumerable.prototype.select = function (n) {
		var i = this,
			o = new e.Enumerable();
		return (
			(o.getEnumerator = function () {
				return t(i, n);
			}),
			o
		);
	}),
		(e.Enumerable.prototype.selectMany = function (t) {
			var i = this,
				o = new e.Enumerable();
			return (
				(o.getEnumerator = function () {
					return n(i, t);
				}),
				o
			);
		}),
		e.List &&
			((e.List.prototype.select = e.Enumerable.prototype.select),
			(e.List.prototype.selectMany = e.Enumerable.prototype.selectMany));
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e) {
		return Array.isArray(e)
			? e.en().getEnumerator()
			: null != e && 'function' == typeof e.getEnumerator
			? e.getEnumerator()
			: null;
	}
	e.selectorEnumerator = t;
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i = {
				current: void 0,
				moveNext: function () {
					if (!n) {
						n = e.getEnumerator();
						for (var o = 0; t > o; o++) if (!n.moveNext()) return !1;
					}
					return n.moveNext() ? ((i.current = n.current), !0) : ((i.current = void 0), !1);
				}
			};
		return i;
	}
	function n(e, t) {
		var n,
			i = {
				current: void 0,
				moveNext: function () {
					if (!n) {
						n = e.getEnumerator();
						for (var o = 0; n.moveNext(); o++) if (!t((i.current = n.current), o)) return !0;
						return (i.current = void 0), !1;
					}
					return n.moveNext() ? ((i.current = n.current), !0) : ((i.current = void 0), !1);
				}
			};
		return i;
	}
	(e.Enumerable.prototype.skip = function (n) {
		var i = this,
			o = new e.Enumerable();
		return (
			(o.getEnumerator = function () {
				return t(i, n);
			}),
			o
		);
	}),
		(e.Enumerable.prototype.skipWhile = function (t) {
			var i = this,
				o = new e.Enumerable();
			return (
				(o.getEnumerator = function () {
					return n(i, t);
				}),
				o
			);
		}),
		e.List &&
			((e.List.prototype.skip = e.Enumerable.prototype.skip),
			(e.List.prototype.skipWhile = e.Enumerable.prototype.skipWhile));
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i = 0,
			o = {
				current: void 0,
				moveNext: function () {
					return (
						n || (n = e.getEnumerator()),
						i++,
						!(i > t || ((o.current = void 0), !n.moveNext() || ((o.current = n.current), 0)))
					);
				}
			};
		return o;
	}
	function n(e, t) {
		var n,
			i = 0,
			o = {
				current: void 0,
				moveNext: function () {
					return (
						n || (n = e.getEnumerator()),
						n.moveNext() && t(n.current, i)
							? (i++, (o.current = n.current), !0)
							: ((o.current = void 0), !1)
					);
				}
			};
		return o;
	}
	(e.Enumerable.prototype.take = function (n) {
		var i = this,
			o = new e.Enumerable();
		return (
			(o.getEnumerator = function () {
				return t(i, n);
			}),
			o
		);
	}),
		(e.Enumerable.prototype.takeWhile = function (t) {
			var i = this,
				o = new e.Enumerable();
			return (
				(o.getEnumerator = function () {
					return n(i, t);
				}),
				o
			);
		}),
		e.List &&
			((e.List.prototype.take = e.Enumerable.prototype.take),
			(e.List.prototype.takeWhile = e.Enumerable.prototype.takeWhile));
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(t, n) {
		var i,
			o = !1,
			r = [],
			s = {
				current: void 0,
				moveNext: function () {
					if (o) {
						if (null == i) return !1;
						r.push(i), (i = e.selectorEnumerator(n(s.current)));
					} else (i = t.getEnumerator()), (o = !0);
					for (; !((i && i.moveNext()) || r.length < 1); ) i = r.pop();
					return (s.current = null == i ? void 0 : i.current), void 0 !== s.current;
				}
			};
		return s;
	}
	function n(t, n, i) {
		var o,
			r = !1,
			s = [],
			a = {
				current: void 0,
				moveNext: function () {
					if (r) {
						if (null == o) return !1;
						s.push(o), (o = e.selectorEnumerator(n(a.current)));
					} else (o = t.getEnumerator()), (r = !0);
					do {
						for (; !((o && o.moveNext()) || s.length < 1); ) o = s.pop();
						a.current = null == o ? void 0 : o.current;
					} while (i(a.current));
					return void 0 !== a.current;
				}
			};
		return a;
	}
	(e.Enumerable.prototype.traverse = function (n) {
		var i = this,
			o = new e.Enumerable();
		return (
			(o.getEnumerator = function () {
				return t(i, n);
			}),
			o
		);
	}),
		(e.Enumerable.prototype.traverseUnique = function (t, i) {
			var o = this,
				r = [],
				s = new e.Enumerable();
			return (
				i
					? (s.getEnumerator = function () {
							return n(o, t, function (e) {
								return (
									!!r.some(function (t) {
										return i(e, t);
									}) || (r.push(e), !1)
								);
							});
					  })
					: (s.getEnumerator = function () {
							return n(o, t, function (e) {
								return r.indexOf(e) > -1 || (r.push(e), !1);
							});
					  }),
				s
			);
		}),
		e.List &&
			((e.List.prototype.traverse = e.Enumerable.prototype.traverse),
			(e.List.prototype.traverseUnique = e.Enumerable.prototype.traverseUnique));
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(t, n, i) {
		i =
			i ||
			function (e, t) {
				return e === t;
			};
		var o,
			r,
			s = [],
			a = {
				current: void 0,
				moveNext: function () {
					if (
						(o || (o = e.en(t).distinct().getEnumerator()),
						(a.current = void 0),
						!r && o.moveNext())
					)
						return s.push((a.current = o.current)), !0;
					for (r = r || e.en(n).distinct().getEnumerator(); r.moveNext(); ) {
						for (var u = 0, l = !1, c = s.length; c > u && !l; u++) l = i(s[u], r.current);
						if (!l) return (a.current = r.current), !0;
					}
					return !1;
				}
			};
		return a;
	}
	(e.Enumerable.prototype.union = function (n, i) {
		var o = this,
			r = n instanceof Array ? n.en() : n,
			s = new e.Enumerable();
		return (
			(s.getEnumerator = function () {
				return t(o, r, i);
			}),
			s
		);
	}),
		e.List && (e.List.prototype.union = e.Enumerable.prototype.union);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(e, t) {
		var n,
			i = {
				current: void 0,
				moveNext: function () {
					n || (n = e.getEnumerator());
					for (var o; n.moveNext(); ) if (t((o = n.current))) return (i.current = o), !0;
					return !1;
				}
			};
		return i;
	}
	(e.Enumerable.prototype.where = function (n) {
		var i = this,
			o = new e.Enumerable();
		return (
			(o.getEnumerator = function () {
				return t(i, n);
			}),
			o
		);
	}),
		e.List && (e.List.prototype.where = e.Enumerable.prototype.where);
})(exjs || (exjs = {}));
var exjs;
!(function (e) {
	function t(t) {
		var i = new e.Enumerable();
		return (
			(i.getEnumerator = function () {
				return n(t);
			}),
			i
		);
	}
	function n(e) {
		var t = e.getEnumerator(),
			n = { current: void 0, moveNext: void 0 };
		return (
			(n.moveNext = function () {
				return t.moveNext() ? ((n.current = t.current), !0) : ((n.current = void 0), !1);
			}),
			n
		);
	}
	e.en = t;
})(exjs || (exjs = {}));
var ex = exjs.en,
	exjs;
!(function (e) {
	function t(e, t, n) {
		var i,
			o,
			r = {
				current: void 0,
				moveNext: function () {
					return (
						i || (i = e.getEnumerator()),
						o || (o = t.getEnumerator()),
						(r.current = void 0),
						!(!i.moveNext() || !o.moveNext() || ((r.current = n(i.current, o.current)), 0))
					);
				}
			};
		return r;
	}
	(e.Enumerable.prototype.zip = function (n, i) {
		var o = this,
			r = n instanceof Array ? n.en() : n,
			s = new e.Enumerable();
		return (
			(s.getEnumerator = function () {
				return t(o, r, i);
			}),
			s
		);
	}),
		e.List && (e.List.prototype.zip = e.Enumerable.prototype.zip);
})(exjs || (exjs = {})),
	define('lib/ex.es3.min.js', function () {});
var _Components;
!(function (e) {
	var t = (function () {
		function e(e) {
			(this.options = e), (this.options.data = $.extend(this.data(), e.data));
		}
		return (
			(e.prototype._init = function () {
				return (
					(this._$element = $(this.options.target)),
					this._$element.length
						? (this._$element.empty(), !0)
						: (console.warn('element not found'), !1)
				);
			}),
			(e.prototype.data = function () {
				return {};
			}),
			(e.prototype.on = function (e, t, n) {
				var i = this._e || (this._e = {});
				(i[e] || (i[e] = [])).push({ fn: t, ctx: n });
			}),
			(e.prototype.fire = function (e) {
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				var i = [].slice.call(arguments, 1),
					o = ((this._e || (this._e = {}))[e] || []).slice(),
					r = 0,
					s = o.length;
				for (r; s > r; r++) o[r].fn.apply(o[r].ctx, i);
			}),
			(e.prototype._resize = function () {}),
			(e.prototype.set = function (e) {}),
			e
		);
	})();
	e.BaseComponent = t;
})(_Components || (_Components = {})),
	(function (e) {
		e._Components || (e._Components = _Components);
	})(window),
	define('lib/BaseComponent.js', function () {});
var KeyCodes;
!(function (e) {
	var t;
	!(function (e) {
		(e.Backspace = 8),
			(e.Tab = 9),
			(e.Enter = 13),
			(e.Shift = 16),
			(e.Ctrl = 17),
			(e.Alt = 18),
			(e.PauseBreak = 19),
			(e.CapsLock = 20),
			(e.Escape = 27),
			(e.Spacebar = 32),
			(e.PageUp = 33),
			(e.PageDown = 34),
			(e.End = 35),
			(e.Home = 36),
			(e.LeftArrow = 37),
			(e.UpArrow = 38),
			(e.RightArrow = 39),
			(e.DownArrow = 40),
			(e.PrintScrn = 44),
			(e.Insert = 45),
			(e.Delete = 46),
			(e.Zero = 48),
			(e.One = 49),
			(e.Two = 50),
			(e.Three = 51),
			(e.Four = 52),
			(e.Five = 53),
			(e.Six = 54),
			(e.Seven = 55),
			(e.Eight = 56),
			(e.Nine = 57),
			(e.a = 65),
			(e.b = 66),
			(e.c = 67),
			(e.d = 68),
			(e.e = 69),
			(e.f = 70),
			(e.g = 71),
			(e.h = 72),
			(e.i = 73),
			(e.j = 74),
			(e.k = 75),
			(e.l = 76),
			(e.m = 77),
			(e.n = 78),
			(e.o = 79),
			(e.p = 80),
			(e.q = 81),
			(e.r = 82),
			(e.s = 83),
			(e.t = 84),
			(e.u = 85),
			(e.v = 86),
			(e.w = 87),
			(e.x = 88),
			(e.y = 89),
			(e.z = 90),
			(e.LeftWindowKey = 91),
			(e.RightWindowKey = 92),
			(e.SelectKey = 93),
			(e.Numpad0 = 96),
			(e.Numpad1 = 97),
			(e.Numpad2 = 98),
			(e.Numpad3 = 99),
			(e.Numpad4 = 100),
			(e.Numpad5 = 101),
			(e.Numpad6 = 102),
			(e.Numpad7 = 103),
			(e.Numpad8 = 104),
			(e.Numpad9 = 105),
			(e.Multiply = 106),
			(e.NumpadPlus = 107),
			(e.NumpadMinus = 109),
			(e.DecimalPoint = 110),
			(e.Divide = 111),
			(e.F1 = 112),
			(e.F2 = 113),
			(e.F3 = 114),
			(e.F4 = 115),
			(e.F5 = 116),
			(e.F6 = 117),
			(e.F7 = 118),
			(e.F8 = 119),
			(e.F9 = 120),
			(e.F10 = 121),
			(e.F11 = 122),
			(e.F12 = 123),
			(e.NumLock = 144),
			(e.ScrollLock = 145),
			(e.Semicolon = 186),
			(e.Equals = 187),
			(e.Comma = 188),
			(e.LessThan = 188),
			(e.Dash = 189),
			(e.Period = 190),
			(e.GreaterThan = 190),
			(e.ForwardSlash = 191),
			(e.QuestionMark = 191),
			(e.GraveAccent = 192),
			(e.Tilde = 192),
			(e.OpenCurlyBracket = 219),
			(e.OpenSquareBracket = 219),
			(e.BackSlash = 220),
			(e.VerticalPipe = 220),
			(e.CloseCurlyBracket = 221),
			(e.CloseSquareBracket = 221),
			(e.Quote = 222),
			(e.CommandFF = 224);
	})((t = e.KeyDown || (e.KeyDown = {})));
})(KeyCodes || (KeyCodes = {})),
	(function (e) {
		var t;
		!(function (e) {
			(e.Backspace = 8),
				(e.Enter = 13),
				(e.Spacebar = 32),
				(e.Hash = 35),
				(e.GraveAccent = 39),
				(e.DoubleQuote = 34),
				(e.Asterisk = 42),
				(e.Plus = 43),
				(e.Comma = 44),
				(e.Minus = 45),
				(e.Period = 46),
				(e.ForwardSlash = 47),
				(e.Zero = 48),
				(e.One = 49),
				(e.Two = 50),
				(e.Three = 51),
				(e.Four = 52),
				(e.Five = 53),
				(e.Six = 54),
				(e.Seven = 55),
				(e.Eight = 56),
				(e.Nine = 57),
				(e.Colon = 58),
				(e.Semicolon = 59),
				(e.LessThan = 60),
				(e.Equals = 61),
				(e.GreaterThan = 62),
				(e.QuestionMark = 63),
				(e.At = 64),
				(e.OpenSquareBracket = 91),
				(e.BackSlash = 92),
				(e.CloseSquareBracket = 93),
				(e.a = 97),
				(e.b = 98),
				(e.c = 99),
				(e.d = 100),
				(e.e = 101),
				(e.f = 102),
				(e.g = 103),
				(e.h = 104),
				(e.i = 105),
				(e.j = 106),
				(e.k = 107),
				(e.l = 108),
				(e.m = 109),
				(e.n = 110),
				(e.o = 111),
				(e.p = 112),
				(e.q = 113),
				(e.r = 114),
				(e.s = 115),
				(e.t = 116),
				(e.u = 117),
				(e.v = 118),
				(e.w = 119),
				(e.x = 120),
				(e.y = 121),
				(e.z = 122),
				(e.OpenCurlyBracket = 123),
				(e.VerticalPipe = 124),
				(e.CloseCurlyBracket = 125),
				(e.Tilde = 126);
		})((t = e.KeyPress || (e.KeyPress = {})));
	})(KeyCodes || (KeyCodes = {})),
	(function (e) {
		e.KeyCodes || (e.KeyCodes = KeyCodes);
	})(window),
	define('lib/KeyCodes.js', function () {});
var HTTPStatusCode;
!(function (e) {
	(e.CONTINUE = 100),
		(e.SWITCHING_PROTOCOLS = 101),
		(e.PROCESSING = 102),
		(e.OK = 200),
		(e.CREATED = 201),
		(e.ACCEPTED = 202),
		(e.NON_AUTHORITATIVE_INFORMATION = 203),
		(e.NO_CONTENT = 204),
		(e.RESET_CONTENT = 205),
		(e.PARTIAL_CONTENT = 206),
		(e.MULTI_STATUS = 207),
		(e.MULTIPLE_CHOICES = 300),
		(e.MOVED_PERMANENTLY = 301),
		(e.MOVED_TEMPORARILY = 302),
		(e.SEE_OTHER = 303),
		(e.NOT_MODIFIED = 304),
		(e.USE_PROXY = 305),
		(e.TEMPORARY_REDIRECT = 307),
		(e.BAD_REQUEST = 400),
		(e.UNAUTHORIZED = 401),
		(e.PAYMENT_REQUIRED = 402),
		(e.FORBIDDEN = 403),
		(e.NOT_FOUND = 404),
		(e.METHOD_NOT_ALLOWED = 405),
		(e.NOT_ACCEPTABLE = 406),
		(e.PROXY_AUTHENTICATION_REQUIRED = 407),
		(e.REQUEST_TIME_OUT = 408),
		(e.CONFLICT = 409),
		(e.GONE = 410),
		(e.LENGTH_REQUIRED = 411),
		(e.PRECONDITION_FAILED = 412),
		(e.REQUEST_ENTITY_TOO_LARGE = 413),
		(e.REQUEST_URI_TOO_LARGE = 414),
		(e.UNSUPPORTED_MEDIA_TYPE = 415),
		(e.REQUESTED_RANGE_NOT_SATISFIABLE = 416),
		(e.EXPECTATION_FAILED = 417),
		(e.IM_A_TEAPOT = 418),
		(e.UNPROCESSABLE_ENTITY = 422),
		(e.LOCKED = 423),
		(e.FAILED_DEPENDENCY = 424),
		(e.UNORDERED_COLLECTION = 425),
		(e.UPGRADE_REQUIRED = 426),
		(e.PRECONDITION_REQUIRED = 428),
		(e.TOO_MANY_REQUESTS = 429),
		(e.REQUEST_HEADER_FIELDS_TOO_LARGE = 431),
		(e.INTERNAL_SERVER_ERROR = 500),
		(e.NOT_IMPLEMENTED = 501),
		(e.BAD_GATEWAY = 502),
		(e.SERVICE_UNAVAILABLE = 503),
		(e.GATEWAY_TIME_OUT = 504),
		(e.HTTP_VERSION_NOT_SUPPORTED = 505),
		(e.VARIANT_ALSO_NEGOTIATES = 506),
		(e.INSUFFICIENT_STORAGE = 507),
		(e.BANDWIDTH_LIMIT_EXCEEDED = 509),
		(e.NOT_EXTENDED = 510),
		(e.NETWORK_AUTHENTICATION_REQUIRED = 511);
})(HTTPStatusCode || (HTTPStatusCode = {})),
	(function (e) {
		e.HTTPStatusCode || (e.HTTPStatusCode = HTTPStatusCode);
	})(window),
	define('lib/HTTPStatusCode.js', function () {}),
	(function (e) {
		function t() {
			var n = this === document ? e(this) : e(this).contents();
			n.mousemove(function (e) {
				jQuery.mlp = { x: e.pageX, y: e.pageY };
			}),
				n.find('iframe').on('load', t);
		}
		(e.fn.checkboxButton = function (t) {
			return this.each(function () {
				var n = e(this);
				n.on('click', function (n) {
					var i = n.target.tagName,
						o = e(this).find(':checkbox');
					'INPUT' !== i && (n.preventDefault(), o.prop('checked', !o.prop('checked')));
					var r = o.is(':checked');
					t.call(this, r);
				});
			});
		}),
			(e.fn.disable = function () {
				return this.each(function () {
					var t = e(this);
					t.addClass('disabled'), t.data('tabindex', t.attr('tabindex')), t.removeAttr('tabindex');
				});
			}),
			(e.fn.ellipsis = function (t) {
				return this.each(function () {
					var n = e(this),
						i = n.text();
					if (i.length > t) {
						var o = i.substr(0, t);
						(o = o.substr(0, Math.min(o.length, o.lastIndexOf(' ')))),
							n.empty().html(o + '&hellip;');
					}
				});
			}),
			(e.fn.ellipsisFill = function (t) {
				var n = !0;
				return (
					t || (n = !1),
					this.each(function () {
						var i = e(this);
						n || (t = i.text()), i.empty();
						var o = e('<span title="' + t + '"></span>');
						if (
							(i.append(o),
							i.css('overflow', 'hidden'),
							o.css('white-space', 'nowrap'),
							o.html(t),
							o.width() > i.width())
						)
							for (var r = null; o.width() > i.width(); ) {
								var s = o.html();
								if (((s = s.substring(0, s.lastIndexOf(' ')) + '&hellip;'), s === r)) break;
								o.html(s), (r = s);
							}
					})
				);
			}),
			(e.fn.ellipsisHtmlFixed = function (t, n) {
				return this.each(function () {
					var i = e(this),
						o = i.html(),
						r = e('<span></span>');
					if (
						(r.html(
							i
								.html()
								.replace(/\s[\s]*/g, ' ')
								.trim()
						),
						!(r.text().trim().length <= t))
					) {
						for (; r.text().trim().length > t; ) r.removeLastWord(t);
						var s = r.html(),
							a = !1;
						(i.toggle = function () {
							i.empty();
							var t = e('<a href="#" class="toggle"></a>');
							a
								? (i.html(o + ' '), t.text('less'), t.switchClass('less', 'more'))
								: (i.html(s + '&hellip; '), t.text('more'), t.switchClass('more', 'less')),
								t.one('click', function (e) {
									e.preventDefault(), i.toggle();
								}),
								(a = !a),
								i.append(t),
								n && n();
						}),
							i.toggle();
					}
				});
			}),
			(e.fn.enable = function () {
				return this.each(function () {
					var t = e(this);
					t.removeClass('disabled'), t.attr('tabindex', t.data('tabindex'));
				});
			}),
			(e.fn.equaliseHeight = function (t, n) {
				var i = -1,
					o = Number.MAX_VALUE,
					r = [];
				t &&
					this.each(function () {
						e(this).height('auto');
					}),
					this.each(function () {
						var t = e(this).height();
						r.push(t), (i = i > t ? i : t), (o = t > o ? o : t);
					});
				var s = i;
				if (n) {
					r.sort(function (e, t) {
						return e - t;
					});
					var a = Math.floor(r.length / 2);
					s = r.length % 2 ? r[a] : (r[a - 1] + r[a]) / 2;
				}
				return (
					this.each(function () {
						e(this).height(s);
					}),
					this
				);
			}),
			(e.fn.getVisibleElementWithGreatestTabIndex = function () {
				var t = e(this),
					n = 0,
					i = null;
				return (
					t.find('*:visible[tabindex]').each(function (t, o) {
						var r = e(o),
							s = parseInt(r.attr('tabindex'));
						s > n && ((n = s), (i = r));
					}),
					i
				);
			}),
			(e.fn.horizontalMargins = function () {
				var t = e(this);
				return parseInt(t.css('marginLeft')) + parseInt(t.css('marginRight'));
			}),
			(e.fn.leftMargin = function () {
				var t = e(this);
				return parseInt(t.css('marginLeft'));
			}),
			(e.fn.rightMargin = function () {
				var t = e(this);
				return parseInt(t.css('marginRight'));
			}),
			(e.fn.horizontalPadding = function () {
				var t = e(this);
				return parseInt(t.css('paddingLeft')) + parseInt(t.css('paddingRight'));
			}),
			(e.fn.leftPadding = function () {
				var t = e(this);
				return parseInt(t.css('paddingLeft'));
			}),
			(e.fn.rightPadding = function () {
				var t = e(this);
				return parseInt(t.css('paddingRight'));
			}),
			(e.mlp = { x: 0, y: 0 }),
			e(t),
			(e.fn.ismouseover = function () {
				var t = !1;
				return (
					this.eq(0).each(function () {
						var n = e(this).is('iframe') ? e(this).contents().find('body') : e(this),
							i = n.offset();
						t =
							i.left <= e.mlp.x &&
							i.left + n.outerWidth() > e.mlp.x &&
							i.top <= e.mlp.y &&
							i.top + n.outerHeight() > e.mlp.y;
					}),
					t
				);
			});
		var n,
			i = e.fn.on;
		(e.fn.on = function () {
			var e = Array.apply(null, arguments),
				t = e[e.length - 1];
			if (isNaN(t) || (1 === t && e.pop())) return i.apply(this, e);
			var o = e.pop(),
				r = e.pop();
			return (
				e.push(function () {
					var e = this,
						t = arguments;
					clearTimeout(n),
						(n = setTimeout(function () {
							r.apply(e, t);
						}, o));
				}),
				i.apply(this, e)
			);
		}),
			(e.fn.onEnter = function (t) {
				return this.each(function () {
					var n = e(this);
					n.on('keyup', function (e) {
						13 === e.keyCode && (e.preventDefault(), t());
					});
				});
			}),
			(e.fn.onPressed = function (t) {
				return this.each(function () {
					var n = e(this);
					n.on('touchstart click', function (e) {
						e.preventDefault(), t(e);
					}),
						n.on('keyup', function (e) {
							13 === e.keyCode && (e.preventDefault(), t(e));
						});
				});
			}),
			(e.fn.removeLastWord = function (t, n) {
				return (
					void 0 === t && (t = 8),
					void 0 === n && (n = 0),
					this.each(function () {
						var i = e(this);
						if (i.contents().length > 0) {
							var o = i.contents().last();
							if (3 === o[0].nodeType) {
								var r = o.text().trim().split(' ');
								if (r.length > 1) return r.splice(r.length - 1, 1), void (o[0].data = r.join(' '));
								if ('undefined' != typeof t && 1 === r.length && r[0].length > t)
									return void (o[0].data = r.join(' ').substring(0, t));
							}
							o.removeLastWord(t, n + 1);
						} else n > 0 && i.remove();
					})
				);
			}),
			(e.fn.switchClass = function (t, n) {
				return this.each(function () {
					e(this).removeClass(t).addClass(n);
				});
			}),
			(e.fn.targetBlank = function () {
				return this.each(function () {
					e(this).find('a').prop('target', '_blank');
				});
			}),
			(e.fn.toggleExpandText = function (t, n, i, o) {
				return this.each(function () {
					var r = e(this),
						s = r.html();
					if (!(t > s.length)) {
						var a = !1,
							u = s.substr(0, t);
						(u = u.substr(0, Math.min(u.length, u.lastIndexOf(' ')))),
							(r.toggle = function () {
								r.empty();
								var t = e('<a href="#" class="toggle"></a>');
								a
									? (r.html(s + '&nbsp;'), t.text(n), t.switchClass('less', 'more'))
									: (r.html(u + '&nbsp;'), t.text(i), t.switchClass('more', 'less')),
									t.one('click', function (e) {
										e.preventDefault(), r.toggle();
									}),
									(a = !a),
									r.append(t),
									o && o();
							}),
							r.toggle();
					}
				});
			}),
			(e.fn.toggleExpandTextByLines = function (t, n, i, o) {
				return this.each(function () {
					for (
						var r = e(this),
							s = r.html(),
							a = e('<span>&hellip; <a href="#" class="toggle more">morepad</a></span>'),
							u = [s],
							l = r.height();
						r.text().length > 0;

					) {
						r.removeLastWord();
						var c = r.html();
						r.append(a), l > r.height() && (u.unshift(c), (l = r.height())), a.remove();
					}
					if (u.length <= t) return void r.html(s);
					var h = u[t - 1],
						p = !1;
					(r.toggle = function () {
						r.empty();
						var t = e('<a href="#" class="toggle"></a>');
						p
							? (r.html(s + ' '), t.text(n), t.switchClass('less', 'more'))
							: (r.html(h + '&hellip; '), t.text(i), t.switchClass('more', 'less')),
							t.one('click', function (e) {
								e.preventDefault(), r.toggle();
							}),
							(p = !p),
							r.append(t),
							o && o();
					}),
						r.toggle();
				});
			}),
			(e.fn.toggleText = function (t, n) {
				return this.each(function () {
					var i = e(this);
					i.text() === t ? e(this).text(n) : e(this).text(t);
				});
			}),
			(e.fn.updateAttr = function (t, n, i) {
				return this.each(function () {
					var o = e(this),
						r = o.attr(t);
					r && 0 === r.indexOf(n) && ((r = r.replace(n, i)), o.attr(t, r));
				});
			}),
			(e.fn.verticalMargins = function () {
				var t = e(this);
				return parseInt(t.css('marginTop')) + parseInt(t.css('marginBottom'));
			}),
			(e.fn.verticalPadding = function () {
				var t = e(this);
				return parseInt(t.css('paddingTop')) + parseInt(t.css('paddingBottom'));
			});
	})(jQuery),
	define('lib/jquery-plugins.js', function () {}),
	(function (e) {
		var t = null;
		(e.initPubSub = function () {
			t = e({});
		}),
			(e.subscribe = function () {
				t || e.initPubSub(), t.on.apply(t, arguments);
			}),
			(e.unsubscribe = function () {
				t || e.initPubSub(), t.off.apply(t, arguments);
			}),
			(e.disposePubSub = function () {
				t = null;
			}),
			(e.publish = function () {
				t || e.initPubSub(), t.trigger.apply(t, arguments);
			});
	})(jQuery),
	define('lib/ba-tiny-pubsub.js', function () {}),
	(function (e) {
		if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e();
		else if ('function' == typeof define && define.amd) define('lib/manifesto.js', [], e);
		else {
			var t;
			(t =
				'undefined' != typeof window
					? window
					: 'undefined' != typeof global
					? global
					: 'undefined' != typeof self
					? self
					: this),
				(t.manifesto = e());
		}
	})(function () {
		var e;
		return (function () {
			function e(t, n, i) {
				function o(s, a) {
					if (!n[s]) {
						if (!t[s]) {
							var u = 'function' == typeof require && require;
							if (!a && u) return u(s, !0);
							if (r) return r(s, !0);
							var l = new Error("Cannot find module '" + s + "'");
							throw ((l.code = 'MODULE_NOT_FOUND'), l);
						}
						var c = (n[s] = { exports: {} });
						t[s][0].call(
							c.exports,
							function (e) {
								var n = t[s][1][e];
								return o(n || e);
							},
							c,
							c.exports,
							e,
							t,
							n,
							i
						);
					}
					return n[s].exports;
				}
				for (var r = 'function' == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
				return o;
			}
			return e;
		})()(
			{
				1: [
					function (e, t, n) {
						(function (n) {
							var i;
							!(function (e) {
								var t = (function () {
									function e(e) {
										(this.value = ''), e && (this.value = e.toLowerCase());
									}
									return (
										(e.prototype.toString = function () {
											return this.value;
										}),
										e
									);
								})();
								e.StringValue = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function e(e, t) {
										(this.start = e), (this.end = t);
									}
									return (
										(e.prototype.getLength = function () {
											return this.end - this.start;
										}),
										e
									);
								})();
								e.Duration = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.bookmarking = function () {
											return new t(t.BOOKMARKING.toString());
										}),
										(t.prototype.classifying = function () {
											return new t(t.CLASSIFYING.toString());
										}),
										(t.prototype.commenting = function () {
											return new t(t.COMMENTING.toString());
										}),
										(t.prototype.describing = function () {
											return new t(t.DESCRIBING.toString());
										}),
										(t.prototype.editing = function () {
											return new t(t.EDITING.toString());
										}),
										(t.prototype.highlighting = function () {
											return new t(t.HIGHLIGHTING.toString());
										}),
										(t.prototype.identifying = function () {
											return new t(t.IDENTIFYING.toString());
										}),
										(t.prototype.linking = function () {
											return new t(t.LINKING.toString());
										}),
										(t.prototype.moderating = function () {
											return new t(t.MODERATING.toString());
										}),
										(t.prototype.painting = function () {
											return new t(t.PAINTING.toString());
										}),
										(t.prototype.questioning = function () {
											return new t(t.QUESTIONING.toString());
										}),
										(t.prototype.replying = function () {
											return new t(t.REPLYING.toString());
										}),
										(t.prototype.tagging = function () {
											return new t(t.TAGGING.toString());
										}),
										(t.prototype.transcribing = function () {
											return new t(t.TRANSCRIBING.toString());
										}),
										(t.BOOKMARKING = new t('oa:bookmarking')),
										(t.CLASSIFYING = new t('oa:classifying')),
										(t.COMMENTING = new t('oa:commenting')),
										(t.DESCRIBING = new t('oa:describing')),
										(t.EDITING = new t('oa:editing')),
										(t.HIGHLIGHTING = new t('oa:highlighting')),
										(t.IDENTIFYING = new t('oa:identifying')),
										(t.LINKING = new t('oa:linking')),
										(t.MODERATING = new t('oa:moderating')),
										(t.PAINTING = new t('sc:painting')),
										(t.QUESTIONING = new t('oa:questioning')),
										(t.REPLYING = new t('oa:replying')),
										(t.TAGGING = new t('oa:tagging')),
										(t.TRANSCRIBING = new t('oad:transcribing')),
										t
									);
								})(e.StringValue);
								e.AnnotationMotivation = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.autoadvance = function () {
											return new t(t.AUTOADVANCE.toString());
										}),
										(t.prototype.nonav = function () {
											return new t(t.NONAV.toString());
										}),
										(t.prototype.paged = function () {
											return new t(t.PAGED.toString());
										}),
										(t.AUTOADVANCE = new t('auto-advance')),
										(t.NONAV = new t('no-nav')),
										(t.PAGED = new t('paged')),
										t
									);
								})(e.StringValue);
								e.Behavior = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.annotation = function () {
											return new t(t.ANNOTATION.toString());
										}),
										(t.prototype.canvas = function () {
											return new t(t.CANVAS.toString());
										}),
										(t.prototype.collection = function () {
											return new t(t.COLLECTION.toString());
										}),
										(t.prototype.manifest = function () {
											return new t(t.MANIFEST.toString());
										}),
										(t.prototype.range = function () {
											return new t(t.RANGE.toString());
										}),
										(t.prototype.sequence = function () {
											return new t(t.SEQUENCE.toString());
										}),
										(t.ANNOTATION = new t('annotation')),
										(t.CANVAS = new t('canvas')),
										(t.COLLECTION = new t('collection')),
										(t.MANIFEST = new t('manifest')),
										(t.RANGE = new t('range')),
										(t.SEQUENCE = new t('sequence')),
										t
									);
								})(e.StringValue);
								e.IIIFResourceType = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.empty = function () {
											return new t(t.EMPTY.toString());
										}),
										(t.prototype.manuscript = function () {
											return new t(t.MANUSCRIPT.toString());
										}),
										(t.prototype.monograph = function () {
											return new t(t.MONOGRAPH.toString());
										}),
										(t.EMPTY = new t('')),
										(t.MANUSCRIPT = new t('manuscript')),
										(t.MONOGRAPH = new t('monograph')),
										t
									);
								})(e.StringValue);
								e.ManifestType = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.pdf = function () {
											return new t(t.PDF.toString());
										}),
										(t.prototype.doc = function () {
											return new t(t.DOC.toString());
										}),
										(t.prototype.docx = function () {
											return new t(t.DOCX.toString());
										}),
										(t.PDF = new t('application/pdf')),
										(t.DOC = new t('application/msword')),
										(t.DOCX = new t(
											'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
										)),
										t
									);
								})(e.StringValue);
								e.RenderingFormat = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.jpg = function () {
											return new t(t.JPG.toString());
										}),
										(t.prototype.mp4 = function () {
											return new t(t.MP4.toString());
										}),
										(t.prototype.pdf = function () {
											return new t(t.PDF.toString());
										}),
										(t.prototype.threejs = function () {
											return new t(t.THREEJS.toString());
										}),
										(t.prototype.webm = function () {
											return new t(t.WEBM.toString());
										}),
										(t.JPG = new t('image/jpeg')),
										(t.MP4 = new t('video/mp4')),
										(t.PDF = new t('application/pdf')),
										(t.THREEJS = new t('application/vnd.threejs+json')),
										(t.WEBM = new t('video/webm')),
										t
									);
								})(e.StringValue);
								e.MediaType = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.canvas = function () {
											return new t(t.CANVAS.toString());
										}),
										(t.prototype.choice = function () {
											return new t(t.CHOICE.toString());
										}),
										(t.prototype.document = function () {
											return new t(t.DOCUMENT.toString());
										}),
										(t.prototype.image = function () {
											return new t(t.IMAGE.toString());
										}),
										(t.prototype.movingimage = function () {
											return new t(t.MOVINGIMAGE.toString());
										}),
										(t.prototype.physicalobject = function () {
											return new t(t.PHYSICALOBJECT.toString());
										}),
										(t.prototype.sound = function () {
											return new t(t.SOUND.toString());
										}),
										(t.prototype.text = function () {
											return new t(t.TEXT.toString());
										}),
										(t.CANVAS = new t('canvas')),
										(t.CHOICE = new t('choice')),
										(t.DOCUMENT = new t('document')),
										(t.IMAGE = new t('image')),
										(t.MOVINGIMAGE = new t('movingimage')),
										(t.PHYSICALOBJECT = new t('physicalobject')),
										(t.SOUND = new t('sound')),
										(t.TEXT = new t('textualbody')),
										t
									);
								})(e.StringValue);
								e.ResourceType = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.auth1Clickthrough = function () {
											return new t(t.AUTH1CLICKTHROUGH.toString());
										}),
										(t.prototype.auth1External = function () {
											return new t(t.AUTH1EXTERNAL.toString());
										}),
										(t.prototype.auth1Kiosk = function () {
											return new t(t.AUTH1KIOSK.toString());
										}),
										(t.prototype.auth1Login = function () {
											return new t(t.AUTH1LOGIN.toString());
										}),
										(t.prototype.auth1Logout = function () {
											return new t(t.AUTH1LOGOUT.toString());
										}),
										(t.prototype.auth1Probe = function () {
											return new t(t.AUTH1PROBE.toString());
										}),
										(t.prototype.auth1Token = function () {
											return new t(t.AUTH1TOKEN.toString());
										}),
										(t.prototype.autoComplete = function () {
											return new t(t.AUTOCOMPLETE.toString());
										}),
										(t.prototype.iiif1ImageLevel1 = function () {
											return new t(t.IIIF1IMAGELEVEL1.toString());
										}),
										(t.prototype.iiif1ImageLevel2 = function () {
											return new t(t.IIIF1IMAGELEVEL2.toString());
										}),
										(t.prototype.iiif2ImageLevel1 = function () {
											return new t(t.IIIF2IMAGELEVEL1.toString());
										}),
										(t.prototype.iiif2ImageLevel2 = function () {
											return new t(t.IIIF2IMAGELEVEL2.toString());
										}),
										(t.prototype.ixif = function () {
											return new t(t.IXIF.toString());
										}),
										(t.prototype.login = function () {
											return new t(t.AUTHLOGIN.toString());
										}),
										(t.prototype.clickThrough = function () {
											return new t(t.AUTHCLICKTHROUGH.toString());
										}),
										(t.prototype.restricted = function () {
											return new t(t.AUTHRESTRICTED.toString());
										}),
										(t.prototype.logout = function () {
											return new t(t.AUTHLOGOUT.toString());
										}),
										(t.prototype.otherManifestations = function () {
											return new t(t.OTHERMANIFESTATIONS.toString());
										}),
										(t.prototype.search = function () {
											return new t(t.SEARCH.toString());
										}),
										(t.prototype.stanfordIIIFImageCompliance1 = function () {
											return new t(t.STANFORDIIIFIMAGECOMPLIANCE1.toString());
										}),
										(t.prototype.stanfordIIIFImageCompliance2 = function () {
											return new t(t.STANFORDIIIFIMAGECOMPLIANCE2.toString());
										}),
										(t.prototype.stanfordIIIFImageConformance1 = function () {
											return new t(t.STANFORDIIIFIMAGECONFORMANCE1.toString());
										}),
										(t.prototype.stanfordIIIFImageConformance2 = function () {
											return new t(t.STANFORDIIIFIMAGECONFORMANCE2.toString());
										}),
										(t.prototype.stanfordIIIF1ImageCompliance1 = function () {
											return new t(t.STANFORDIIIF1IMAGECOMPLIANCE1.toString());
										}),
										(t.prototype.stanfordIIIF1ImageCompliance2 = function () {
											return new t(t.STANFORDIIIF1IMAGECOMPLIANCE2.toString());
										}),
										(t.prototype.stanfordIIIF1ImageConformance1 = function () {
											return new t(t.STANFORDIIIF1IMAGECONFORMANCE1.toString());
										}),
										(t.prototype.stanfordIIIF1ImageConformance2 = function () {
											return new t(t.STANFORDIIIF1IMAGECONFORMANCE2.toString());
										}),
										(t.prototype.token = function () {
											return new t(t.AUTHTOKEN.toString());
										}),
										(t.prototype.trackingExtensions = function () {
											return new t(t.TRACKINGEXTENSIONS.toString());
										}),
										(t.prototype.uiExtensions = function () {
											return new t(t.UIEXTENSIONS.toString());
										}),
										(t.prototype.printExtensions = function () {
											return new t(t.PRINTEXTENSIONS.toString());
										}),
										(t.prototype.shareExtensions = function () {
											return new t(t.SHAREEXTENSIONS.toString());
										}),
										(t.STANFORDIIIFIMAGECOMPLIANCE0 = new t(
											'http://library.stanford.edu/iiif/image-api/compliance.html#level0'
										)),
										(t.STANFORDIIIFIMAGECOMPLIANCE1 = new t(
											'http://library.stanford.edu/iiif/image-api/compliance.html#level1'
										)),
										(t.STANFORDIIIFIMAGECOMPLIANCE2 = new t(
											'http://library.stanford.edu/iiif/image-api/compliance.html#level2'
										)),
										(t.STANFORDIIIFIMAGECONFORMANCE0 = new t(
											'http://library.stanford.edu/iiif/image-api/conformance.html#level0'
										)),
										(t.STANFORDIIIFIMAGECONFORMANCE1 = new t(
											'http://library.stanford.edu/iiif/image-api/conformance.html#level1'
										)),
										(t.STANFORDIIIFIMAGECONFORMANCE2 = new t(
											'http://library.stanford.edu/iiif/image-api/conformance.html#level2'
										)),
										(t.STANFORDIIIF1IMAGECOMPLIANCE0 = new t(
											'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0'
										)),
										(t.STANFORDIIIF1IMAGECOMPLIANCE1 = new t(
											'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1'
										)),
										(t.STANFORDIIIF1IMAGECOMPLIANCE2 = new t(
											'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2'
										)),
										(t.STANFORDIIIF1IMAGECONFORMANCE0 = new t(
											'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0'
										)),
										(t.STANFORDIIIF1IMAGECONFORMANCE1 = new t(
											'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1'
										)),
										(t.STANFORDIIIF1IMAGECONFORMANCE2 = new t(
											'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2'
										)),
										(t.IIIF1IMAGELEVEL0 = new t('http://iiif.io/api/image/1/level0.json')),
										(t.IIIF1IMAGELEVEL0PROFILE = new t(
											'http://iiif.io/api/image/1/profiles/level0.json'
										)),
										(t.IIIF1IMAGELEVEL1 = new t('http://iiif.io/api/image/1/level1.json')),
										(t.IIIF1IMAGELEVEL1PROFILE = new t(
											'http://iiif.io/api/image/1/profiles/level1.json'
										)),
										(t.IIIF1IMAGELEVEL2 = new t('http://iiif.io/api/image/1/level2.json')),
										(t.IIIF1IMAGELEVEL2PROFILE = new t(
											'http://iiif.io/api/image/1/profiles/level2.json'
										)),
										(t.IIIF2IMAGELEVEL0 = new t('http://iiif.io/api/image/2/level0.json')),
										(t.IIIF2IMAGELEVEL0PROFILE = new t(
											'http://iiif.io/api/image/2/profiles/level0.json'
										)),
										(t.IIIF2IMAGELEVEL1 = new t('http://iiif.io/api/image/2/level1.json')),
										(t.IIIF2IMAGELEVEL1PROFILE = new t(
											'http://iiif.io/api/image/2/profiles/level1.json'
										)),
										(t.IIIF2IMAGELEVEL2 = new t('http://iiif.io/api/image/2/level2.json')),
										(t.IIIF2IMAGELEVEL2PROFILE = new t(
											'http://iiif.io/api/image/2/profiles/level2.json'
										)),
										(t.AUTHCLICKTHROUGH = new t('http://iiif.io/api/auth/0/login/clickthrough')),
										(t.AUTHLOGIN = new t('http://iiif.io/api/auth/0/login')),
										(t.AUTHLOGOUT = new t('http://iiif.io/api/auth/0/logout')),
										(t.AUTHRESTRICTED = new t('http://iiif.io/api/auth/0/login/restricted')),
										(t.AUTHTOKEN = new t('http://iiif.io/api/auth/0/token')),
										(t.AUTH1CLICKTHROUGH = new t('http://iiif.io/api/auth/1/clickthrough')),
										(t.AUTH1EXTERNAL = new t('http://iiif.io/api/auth/1/external')),
										(t.AUTH1KIOSK = new t('http://iiif.io/api/auth/1/kiosk')),
										(t.AUTH1LOGIN = new t('http://iiif.io/api/auth/1/login')),
										(t.AUTH1LOGOUT = new t('http://iiif.io/api/auth/1/logout')),
										(t.AUTH1PROBE = new t('http://iiif.io/api/auth/1/probe')),
										(t.AUTH1TOKEN = new t('http://iiif.io/api/auth/1/token')),
										(t.AUTOCOMPLETE = new t('http://iiif.io/api/search/0/autocomplete')),
										(t.SEARCH = new t('http://iiif.io/api/search/0/search')),
										(t.TRACKINGEXTENSIONS = new t(
											'http://universalviewer.io/tracking-extensions-profile'
										)),
										(t.UIEXTENSIONS = new t('http://universalviewer.io/ui-extensions-profile')),
										(t.PRINTEXTENSIONS = new t(
											'http://universalviewer.io/print-extensions-profile'
										)),
										(t.SHAREEXTENSIONS = new t(
											'http://universalviewer.io/share-extensions-profile'
										)),
										(t.OTHERMANIFESTATIONS = new t('http://iiif.io/api/otherManifestations.json')),
										(t.IXIF = new t('http://wellcomelibrary.org/ld/ixif/0/alpha.json')),
										t
									);
								})(e.StringValue);
								e.ServiceProfile = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.leftToRight = function () {
											return new t(t.LEFTTORIGHT.toString());
										}),
										(t.prototype.rightToLeft = function () {
											return new t(t.RIGHTTOLEFT.toString());
										}),
										(t.prototype.topToBottom = function () {
											return new t(t.TOPTOBOTTOM.toString());
										}),
										(t.prototype.bottomToTop = function () {
											return new t(t.BOTTOMTOTOP.toString());
										}),
										(t.LEFTTORIGHT = new t('left-to-right')),
										(t.RIGHTTOLEFT = new t('right-to-left')),
										(t.TOPTOBOTTOM = new t('top-to-bottom')),
										(t.BOTTOMTOTOP = new t('bottom-to-top')),
										t
									);
								})(e.StringValue);
								e.ViewingDirection = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.continuous = function () {
											return new t(t.CONTINUOUS.toString());
										}),
										(t.prototype.empty = function () {
											return new t(t.EMPTY.toString());
										}),
										(t.prototype.individuals = function () {
											return new t(t.INDIVIDUALS.toString());
										}),
										(t.prototype.nonPaged = function () {
											return new t(t.NONPAGED.toString());
										}),
										(t.prototype.paged = function () {
											return new t(t.PAGED.toString());
										}),
										(t.prototype.top = function () {
											return new t(t.TOP.toString());
										}),
										(t.CONTINUOUS = new t('continuous')),
										(t.EMPTY = new t('')),
										(t.INDIVIDUALS = new t('individuals')),
										(t.NONPAGED = new t('non-paged')),
										(t.PAGED = new t('paged')),
										(t.TOP = new t('top')),
										t
									);
								})(e.StringValue);
								e.ViewingHint = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function e(e) {
										(this.__jsonld = e),
											(this.context = this.getProperty('context')),
											(this.id = this.getProperty('id'));
									}
									return (
										(e.prototype.getProperty = function (e) {
											var t = null;
											return (
												this.__jsonld &&
													((t = this.__jsonld[e]), t || (t = this.__jsonld['@' + e])),
												t
											);
										}),
										e
									);
								})();
								e.JSONLDResource = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										var i = t.call(this, e) || this;
										return (i.options = n), i;
									}
									return (
										o(n, t),
										(n.prototype.getIIIFResourceType = function () {
											return new e.IIIFResourceType(
												e.Utils.normaliseType(this.getProperty('type'))
											);
										}),
										(n.prototype.getLabel = function () {
											var t = this.getProperty('label');
											return t ? e.LanguageMap.parse(t, this.options.locale) : [];
										}),
										(n.prototype.getDefaultLabel = function () {
											return e.LanguageMap.getValue(this.getLabel());
										}),
										(n.prototype.getMetadata = function () {
											var t = this.getProperty('metadata'),
												n = [];
											if (!t) return n;
											for (var i = 0; i < t.length; i++) {
												var o = t[i],
													r = new e.LabelValuePair(this.options.locale);
												r.parse(o), n.push(r);
											}
											return n;
										}),
										(n.prototype.getRendering = function (e) {
											var t = this.getRenderings();
											'string' != typeof e && (e = e.toString());
											for (var n = 0; n < t.length; n++) {
												var i = t[n];
												if (i.getFormat().toString() === e) return i;
											}
											return null;
										}),
										(n.prototype.getRenderings = function () {
											var t;
											t = this.__jsonld ? this.__jsonld.rendering : this.rendering;
											var n = [];
											if (!t) return n;
											Array.isArray(t) || (t = [t]);
											for (var i = 0; i < t.length; i++) {
												var o = t[i];
												n.push(new e.Rendering(o, this.options));
											}
											return n;
										}),
										(n.prototype.getService = function (t) {
											return e.Utils.getService(this, t);
										}),
										(n.prototype.getServices = function () {
											return e.Utils.getServices(this);
										}),
										(n.prototype.getThumbnail = function () {
											var t = this.getProperty('thumbnail');
											return (
												Array.isArray(t) && (t = t[0]), t ? new e.Thumbnail(t, this.options) : null
											);
										}),
										(n.prototype.isAnnotation = function () {
											return (
												this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.ANNOTATION.toString()
											);
										}),
										(n.prototype.isCanvas = function () {
											return (
												this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.CANVAS.toString()
											);
										}),
										(n.prototype.isCollection = function () {
											return (
												this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.COLLECTION.toString()
											);
										}),
										(n.prototype.isManifest = function () {
											return (
												this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.MANIFEST.toString()
											);
										}),
										(n.prototype.isRange = function () {
											return (
												this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.RANGE.toString()
											);
										}),
										(n.prototype.isSequence = function () {
											return (
												this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.SEQUENCE.toString()
											);
										}),
										n
									);
								})(e.JSONLDResource);
								e.ManifestResource = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										return t.call(this, e, n) || this;
									}
									return (
										o(n, t),
										(n.prototype.getFormat = function () {
											var t = this.getProperty('format');
											return t ? new e.MediaType(t.toLowerCase()) : null;
										}),
										(n.prototype.getResources = function () {
											var t = [];
											if (!this.__jsonld.resources) return t;
											for (var n = 0; n < this.__jsonld.resources.length; n++) {
												var i = this.__jsonld.resources[n],
													o = new e.Annotation(i, this.options);
												t.push(o);
											}
											return t;
										}),
										(n.prototype.getType = function () {
											var t = this.getProperty('type');
											return t ? new e.ResourceType(e.Utils.normaliseType(t)) : null;
										}),
										(n.prototype.getWidth = function () {
											return this.getProperty('width');
										}),
										(n.prototype.getHeight = function () {
											return this.getProperty('height');
										}),
										(n.prototype.getMaxWidth = function () {
											return this.getProperty('maxWidth');
										}),
										(n.prototype.getMaxHeight = function () {
											var e = this.getProperty('maxHeight');
											return e ? null : this.getMaxWidth();
										}),
										n
									);
								})(e.ManifestResource);
								e.Resource = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										return t.call(this, e, n) || this;
									}
									return (
										o(n, t),
										(n.prototype.getCanonicalImageUri = function (t) {
											var n,
												i = null,
												o = 'full',
												r = 0,
												s = 'default',
												a = t;
											if (
												this.externalResource &&
												this.externalResource.data &&
												this.externalResource.data['@id']
											)
												(i = this.externalResource.data['@id']),
													a || (a = this.externalResource.data.width),
													this.externalResource.data['@context'] &&
														(this.externalResource.data['@context'].indexOf('/1.0/context.json') >
															-1 ||
															this.externalResource.data['@context'].indexOf('/1.1/context.json') >
																-1 ||
															this.externalResource.data['@context'].indexOf('/1/context.json') >
																-1) &&
														(s = 'native');
											else {
												var u = this.getImages();
												if (u && u.length) {
													var l = u[0],
														c = l.getResource(),
														h = c.getServices();
													if ((a || (a = c.getWidth()), h.length)) {
														var p = h[0];
														(i = p.id), (s = e.Utils.getImageQuality(p.getProfile()));
													} else if (a === c.getWidth()) return c.id;
												}
												if (!i) {
													var d = this.getProperty('thumbnail');
													if (d) {
														if ('string' == typeof d) return d;
														if (d['@id']) return d['@id'];
														if (d.length) return d[0].id;
													}
												}
											}
											(n = a + ','), i && i.endsWith('/') && (i = i.substr(0, i.length - 1));
											var f = [i, o, n, r, s + '.jpg'].join('/');
											return f;
										}),
										(n.prototype.getMaxDimensions = function () {
											var t,
												n = null;
											return (
												this.externalResource.data &&
													this.externalResource.data.profile &&
													((t = this.externalResource.data.profile),
													Array.isArray(t) &&
														((t = t
															.en()
															.where(function (e) {
																return e.maxWidth;
															})
															.first()),
														t &&
															(n = new e.Size(
																t.maxWidth,
																t.maxHeight ? t.maxHeight : t.maxWidth
															)))),
												n
											);
										}),
										(n.prototype.getContent = function () {
											var t = [],
												n = this.__jsonld.items || this.__jsonld.content;
											if (!n) return t;
											var i = null;
											if ((n.length && (i = new e.AnnotationPage(n[0], this.options)), !i))
												return t;
											for (var o = i.getItems(), r = 0; r < o.length; r++) {
												var s = o[r],
													a = new e.Annotation(s, this.options);
												t.push(a);
											}
											return t;
										}),
										(n.prototype.getDuration = function () {
											return this.getProperty('duration');
										}),
										(n.prototype.getImages = function () {
											var t = [];
											if (!this.__jsonld.images) return t;
											for (var n = 0; n < this.__jsonld.images.length; n++) {
												var i = this.__jsonld.images[n],
													o = new e.Annotation(i, this.options);
												t.push(o);
											}
											return t;
										}),
										(n.prototype.getIndex = function () {
											return this.getProperty('index');
										}),
										(n.prototype.getOtherContent = function () {
											var t = this,
												n = Array.isArray(this.getProperty('otherContent'))
													? this.getProperty('otherContent')
													: [this.getProperty('otherContent')],
												i = function (e, t) {
													return 'string' != typeof e || 'string' != typeof t
														? !1
														: e.toLowerCase() === e.toLowerCase();
												},
												o = n
													.filter(function (e) {
														return e && i(e['@type'], 'sc:AnnotationList');
													})
													.map(function (n, i) {
														return new e.AnnotationList(
															n.label || 'Annotation list ' + i,
															n,
															t.options
														);
													})
													.map(function (e) {
														return e.load();
													});
											return Promise.all(o);
										}),
										(n.prototype.getWidth = function () {
											return this.getProperty('width');
										}),
										(n.prototype.getHeight = function () {
											return this.getProperty('height');
										}),
										n
									);
								})(e.Resource);
								e.Canvas = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										var i = t.call(this, e, n) || this;
										(i.index = -1), (i.isLoaded = !1);
										var o = {
											defaultLabel: '-',
											locale: 'en-GB',
											resource: i,
											pessimisticAccessControl: !1
										};
										return (i.options = Object.assign(o, n)), i;
									}
									return (
										o(n, t),
										(n.prototype.getAttribution = function () {
											console.warn(
												'getAttribution will be deprecated, use getRequiredStatement instead.'
											);
											var t = this.getProperty('attribution');
											return t ? e.LanguageMap.parse(t, this.options.locale) : [];
										}),
										(n.prototype.getDescription = function () {
											var t = this.getProperty('description');
											return t ? e.LanguageMap.parse(t, this.options.locale) : [];
										}),
										(n.prototype.getIIIFResourceType = function () {
											return new e.IIIFResourceType(
												e.Utils.normaliseType(this.getProperty('type'))
											);
										}),
										(n.prototype.getLogo = function () {
											var e = this.getProperty('logo');
											return e
												? 'string' == typeof e
													? e
													: (Array.isArray(e) && e.length && (e = e[0]), e['@id'] || e.id)
												: null;
										}),
										(n.prototype.getLicense = function () {
											return e.Utils.getLocalisedValue(
												this.getProperty('license'),
												this.options.locale
											);
										}),
										(n.prototype.getNavDate = function () {
											return new Date(this.getProperty('navDate'));
										}),
										(n.prototype.getRelated = function () {
											return this.getProperty('related');
										}),
										(n.prototype.getSeeAlso = function () {
											return this.getProperty('seeAlso');
										}),
										(n.prototype.getDefaultTree = function () {
											return (
												(this.defaultTree = new e.TreeNode('root')),
												(this.defaultTree.data = this),
												this.defaultTree
											);
										}),
										(n.prototype.getRequiredStatement = function () {
											var t = null,
												n = this.getProperty('requiredStatement');
											if (n) (t = new e.LabelValuePair(this.options.locale)), t.parse(n);
											else {
												var i = this.getAttribution();
												i && ((t = new e.LabelValuePair(this.options.locale)), (t.value = i));
											}
											return t;
										}),
										(n.prototype.isCollection = function () {
											return this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.COLLECTION.toString()
												? !0
												: !1;
										}),
										(n.prototype.isManifest = function () {
											return this.getIIIFResourceType().toString() ===
												e.IIIFResourceType.MANIFEST.toString()
												? !0
												: !1;
										}),
										(n.prototype.load = function () {
											var t = this;
											return new Promise(function (n, i) {
												if (t.isLoaded) n(t);
												else {
													var o = t.options;
													o.navDate = t.getNavDate();
													var r = t.__jsonld.id;
													r || (r = t.__jsonld['@id']),
														e.Utils.loadResource(r).then(function (i) {
															t.parentLabel = e.LanguageMap.getValue(t.getLabel(), o.locale);
															var r = e.Deserialiser.parse(i, o);
															(t = Object.assign(t, r)), (t.index = o.index), n(t);
														});
												}
											});
										}),
										n
									);
								})(e.ManifestResource);
								e.IIIFResource = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										var i = t.call(this, e, n) || this;
										if (
											((i.index = 0),
											(i._allRanges = null),
											(i.items = []),
											(i._topRanges = []),
											i.__jsonld.structures && i.__jsonld.structures.length)
										)
											for (var o = i._getTopRanges(), r = 0; r < o.length; r++) {
												var s = o[r];
												i._parseRanges(s, String(r));
											}
										return i;
									}
									return (
										o(n, t),
										(n.prototype.getPosterCanvas = function () {
											var t = this.getProperty('posterCanvas');
											return t && (t = new e.Canvas(t, this.options)), t;
										}),
										(n.prototype.getBehavior = function () {
											var t = this.getProperty('behavior');
											return Array.isArray(t) && (t = t[0]), t ? new e.Behavior(t) : null;
										}),
										(n.prototype.getDefaultTree = function () {
											if (
												(t.prototype.getDefaultTree.call(this),
												(this.defaultTree.data.type = e.Utils.normaliseType(
													e.TreeNodeType.MANIFEST.toString()
												)),
												!this.isLoaded)
											)
												return this.defaultTree;
											var n = this.getTopRanges();
											return (
												n.length && n[0].getTree(this.defaultTree),
												e.Utils.generateTreeNodeIds(this.defaultTree),
												this.defaultTree
											);
										}),
										(n.prototype._getTopRanges = function () {
											var t = [];
											if (this.__jsonld.structures && this.__jsonld.structures.length) {
												for (var n = 0; n < this.__jsonld.structures.length; n++) {
													var i = this.__jsonld.structures[n];
													i.viewingHint === e.ViewingHint.TOP.toString() && t.push(i);
												}
												if (!t.length) {
													var o = {};
													(o.ranges = this.__jsonld.structures), t.push(o);
												}
											}
											return t;
										}),
										(n.prototype.getTopRanges = function () {
											return this._topRanges;
										}),
										(n.prototype._getRangeById = function (e) {
											if (this.__jsonld.structures && this.__jsonld.structures.length)
												for (var t = 0; t < this.__jsonld.structures.length; t++) {
													var n = this.__jsonld.structures[t];
													if (n['@id'] === e || n.id === e) return n;
												}
											return null;
										}),
										(n.prototype._parseRanges = function (t, n, i) {
											var o,
												r = null;
											if (('string' == typeof t && ((r = t), (t = this._getRangeById(r))), !t))
												return void console.warn('Range:', r, 'does not exist');
											(o = new e.Range(t, this.options)),
												(o.parentRange = i),
												(o.path = n),
												i ? i.items.push(o) : this._topRanges.push(o);
											var s = t.items || t.members;
											if (s)
												for (var a = 0; a < s.length; a++) {
													var u = s[a];
													if (
														(u['@type'] && 'sc:range' === u['@type'].toLowerCase()) ||
														(u.type && 'range' === u.type.toLowerCase())
													)
														this._parseRanges(u, n + '/' + a, o);
													else if (
														(u['@type'] && 'sc:canvas' === u['@type'].toLowerCase()) ||
														(u.type && 'canvas' === u.type.toLowerCase())
													) {
														o.canvases || (o.canvases = []);
														var l = u.id || u['@id'];
														o.canvases.push(l);
													}
												}
											else if (t.ranges)
												for (var a = 0; a < t.ranges.length; a++)
													this._parseRanges(t.ranges[a], n + '/' + a, o);
										}),
										(n.prototype.getAllRanges = function () {
											if (null != this._allRanges) return this._allRanges;
											this._allRanges = [];
											for (var e = this.getTopRanges(), t = 0; t < e.length; t++) {
												var n = e[t];
												n.id && this._allRanges.push(n);
												var i = n.getRanges();
												this._allRanges = this._allRanges.concat(
													i
														.en()
														.traverseUnique(function (e) {
															return e.getRanges();
														})
														.toArray()
												);
											}
											return this._allRanges;
										}),
										(n.prototype.getRangeById = function (e) {
											for (var t = this.getAllRanges(), n = 0; n < t.length; n++) {
												var i = t[n];
												if (i.id === e) return i;
											}
											return null;
										}),
										(n.prototype.getRangeByPath = function (e) {
											for (var t = this.getAllRanges(), n = 0; n < t.length; n++) {
												var i = t[n];
												if (i.path === e) return i;
											}
											return null;
										}),
										(n.prototype.getSequences = function () {
											if (this.items.length) return this.items;
											var t = this.__jsonld.mediaSequences || this.__jsonld.sequences;
											if (t)
												for (var n = 0; n < t.length; n++) {
													var i = t[n],
														o = new e.Sequence(i, this.options);
													this.items.push(o);
												}
											else if (this.__jsonld.items) {
												var o = new e.Sequence(this.__jsonld.items, this.options);
												this.items.push(o);
											}
											return this.items;
										}),
										(n.prototype.getSequenceByIndex = function (e) {
											return this.getSequences()[e];
										}),
										(n.prototype.getTotalSequences = function () {
											return this.getSequences().length;
										}),
										(n.prototype.getManifestType = function () {
											var t = this.getService(e.ServiceProfile.UIEXTENSIONS);
											return t
												? new e.ManifestType(t.getProperty('manifestType'))
												: new e.ManifestType('');
										}),
										(n.prototype.getTrackingLabel = function () {
											var t = this.getService(e.ServiceProfile.TRACKINGEXTENSIONS);
											return t ? t.getProperty('trackingLabel') : '';
										}),
										(n.prototype.isMultiSequence = function () {
											return this.getTotalSequences() > 1;
										}),
										(n.prototype.isPagingEnabled = function () {
											var t = this.getViewingHint();
											if (t) return t.toString() === e.ViewingHint.PAGED.toString();
											var n = this.getBehavior();
											return n ? n.toString() === e.Behavior.PAGED.toString() : !1;
										}),
										(n.prototype.getViewingDirection = function () {
											return this.getProperty('viewingDirection')
												? new e.ViewingDirection(this.getProperty('viewingDirection'))
												: null;
										}),
										(n.prototype.getViewingHint = function () {
											return this.getProperty('viewingHint')
												? new e.ViewingHint(this.getProperty('viewingHint'))
												: null;
										}),
										n
									);
								})(e.IIIFResource);
								e.Manifest = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										var i = t.call(this, e, n) || this;
										return (
											(i.items = []),
											(i._collections = null),
											(i._manifests = null),
											(e.__collection = i),
											i
										);
									}
									return (
										o(n, t),
										(n.prototype.getCollections = function () {
											return this._collections
												? this._collections
												: (this._collections = this.items
														.en()
														.where(function (e) {
															return e.isCollection();
														})
														.toArray());
										}),
										(n.prototype.getManifests = function () {
											return this._manifests
												? this._manifests
												: (this._manifests = this.items
														.en()
														.where(function (e) {
															return e.isManifest();
														})
														.toArray());
										}),
										(n.prototype.getCollectionByIndex = function (e) {
											var t = this.getCollections();
											if (!t[e]) throw new Error('Collection index is outside range of array');
											var n = t[e];
											return (n.options.index = e), n.load();
										}),
										(n.prototype.getManifestByIndex = function (e) {
											var t = this.getManifests();
											if (!t[e]) throw new Error('Manifest index is outside range of array');
											var n = t[e];
											return (n.options.index = e), n.load();
										}),
										(n.prototype.getTotalCollections = function () {
											return this.getCollections().length;
										}),
										(n.prototype.getTotalManifests = function () {
											return this.getManifests().length;
										}),
										(n.prototype.getTotalItems = function () {
											return this.items.length;
										}),
										(n.prototype.getViewingDirection = function () {
											return this.getProperty('viewingDirection')
												? new e.ViewingDirection(this.getProperty('viewingDirection'))
												: e.ViewingDirection.LEFTTORIGHT;
										}),
										(n.prototype.getDefaultTree = function () {
											return (
												t.prototype.getDefaultTree.call(this),
												(this.defaultTree.data.type = e.Utils.normaliseType(
													e.TreeNodeType.COLLECTION.toString()
												)),
												this._parseManifests(this),
												this._parseCollections(this),
												e.Utils.generateTreeNodeIds(this.defaultTree),
												this.defaultTree
											);
										}),
										(n.prototype._parseManifests = function (t) {
											if (t.getManifests() && t.getManifests().length)
												for (var n = 0; n < t.getManifests().length; n++) {
													var i = t.getManifests()[n],
														o = i.getDefaultTree();
													(o.label =
														i.parentLabel ||
														e.LanguageMap.getValue(i.getLabel(), this.options.locale) ||
														'manifest ' + (n + 1)),
														(o.navDate = i.getNavDate()),
														(o.data.id = i.id),
														(o.data.type = e.Utils.normaliseType(
															e.TreeNodeType.MANIFEST.toString()
														)),
														t.defaultTree.addNode(o);
												}
										}),
										(n.prototype._parseCollections = function (t) {
											if (t.getCollections() && t.getCollections().length)
												for (var n = 0; n < t.getCollections().length; n++) {
													var i = t.getCollections()[n],
														o = i.getDefaultTree();
													(o.label =
														i.parentLabel ||
														e.LanguageMap.getValue(i.getLabel(), this.options.locale) ||
														'collection ' + (n + 1)),
														(o.navDate = i.getNavDate()),
														(o.data.id = i.id),
														(o.data.type = e.Utils.normaliseType(
															e.TreeNodeType.COLLECTION.toString()
														)),
														t.defaultTree.addNode(o),
														this._parseCollections(i);
												}
										}),
										n
									);
								})(e.IIIFResource);
								e.Collection = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										var i = t.call(this, e, n) || this;
										return (i._ranges = null), (i.canvases = null), (i.items = []), i;
									}
									return (
										o(n, t),
										(n.prototype.getCanvasIds = function () {
											return this.__jsonld.canvases
												? this.__jsonld.canvases
												: this.canvases
												? this.canvases
												: [];
										}),
										(n.prototype.getDuration = function () {
											var t, n;
											if (this.canvases && this.canvases.length)
												for (var i = 0; i < this.canvases.length; i++) {
													var o = this.canvases[i],
														r = e.Utils.getTemporalComponent(o);
													r &&
														r.length > 1 &&
														(0 === i && (t = Number(r[0])),
														i === this.canvases.length - 1 && (n = Number(r[1])));
												}
											else
												for (var s = this.getRanges(), i = 0; i < s.length; i++) {
													var a = s[i],
														u = a.getDuration();
													u && (0 === i && (t = u.start), i === s.length - 1 && (n = u.end));
												}
											return void 0 !== t && void 0 !== n ? new e.Duration(t, n) : void 0;
										}),
										(n.prototype.getRanges = function () {
											return this._ranges
												? this._ranges
												: (this._ranges = this.items
														.en()
														.where(function (e) {
															return e.isRange();
														})
														.toArray());
										}),
										(n.prototype.getBehavior = function () {
											var t = this.getProperty('behavior');
											return Array.isArray(t) && (t = t[0]), t ? new e.Behavior(t) : null;
										}),
										(n.prototype.getViewingDirection = function () {
											return this.getProperty('viewingDirection')
												? new e.ViewingDirection(this.getProperty('viewingDirection'))
												: null;
										}),
										(n.prototype.getViewingHint = function () {
											return this.getProperty('viewingHint')
												? new e.ViewingHint(this.getProperty('viewingHint'))
												: null;
										}),
										(n.prototype.getTree = function (t) {
											(t.data = this), (this.treeNode = t);
											var n = this.getRanges();
											if (n && n.length)
												for (var i = 0; i < n.length; i++) {
													var o = n[i],
														r = new e.TreeNode();
													t.addNode(r), this._parseTreeNode(r, o);
												}
											return e.Utils.generateTreeNodeIds(t), t;
										}),
										(n.prototype.spansTime = function (e) {
											var t = this.getDuration();
											return t && e >= t.start && e <= t.end ? !0 : !1;
										}),
										(n.prototype._parseTreeNode = function (t, n) {
											(t.label = e.LanguageMap.getValue(n.getLabel(), this.options.locale)),
												(t.data = n),
												(t.data.type = e.Utils.normaliseType(e.TreeNodeType.RANGE.toString())),
												(n.treeNode = t);
											var i = n.getRanges();
											if (i && i.length)
												for (var o = 0; o < i.length; o++) {
													var r = i[o],
														s = r.getBehavior();
													if (!s || s.toString() !== e.Behavior.NONAV.toString()) {
														var a = new e.TreeNode();
														t.addNode(a), this._parseTreeNode(a, r);
													}
												}
										}),
										n
									);
								})(e.ManifestResource);
								e.Range = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										return t.call(this, e, n) || this;
									}
									return (
										o(n, t),
										(n.prototype.getFormat = function () {
											return new e.RenderingFormat(this.getProperty('format'));
										}),
										n
									);
								})(e.ManifestResource);
								e.Rendering = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										var i = t.call(this, e, n) || this;
										return (i.items = []), (i._thumbnails = null), i;
									}
									return (
										o(n, t),
										(n.prototype.getCanvases = function () {
											if (this.items.length) return this.items;
											var t = this.__jsonld.canvases || this.__jsonld.elements;
											if (t)
												for (var n = 0; n < t.length; n++) {
													var i = t[n],
														o = new e.Canvas(i, this.options);
													(o.index = n), this.items.push(o);
												}
											else if (this.__jsonld)
												for (var n = 0; n < this.__jsonld.length; n++) {
													var i = this.__jsonld[n],
														o = new e.Canvas(i, this.options);
													(o.index = n), this.items.push(o);
												}
											return this.items;
										}),
										(n.prototype.getCanvasById = function (t) {
											for (var n = 0; n < this.getTotalCanvases(); n++) {
												var i = this.getCanvasByIndex(n),
													o = e.Utils.normaliseUrl(i.id);
												if (e.Utils.normaliseUrl(t) === o) return i;
											}
											return null;
										}),
										(n.prototype.getCanvasByIndex = function (e) {
											return this.getCanvases()[e];
										}),
										(n.prototype.getCanvasIndexById = function (e) {
											for (var t = 0; t < this.getTotalCanvases(); t++) {
												var n = this.getCanvasByIndex(t);
												if (n.id === e) return t;
											}
											return null;
										}),
										(n.prototype.getCanvasIndexByLabel = function (t, n) {
											(t = t.trim()),
												isNaN(t) || ((t = parseInt(t, 10).toString()), n && (t += 'r'));
											for (
												var i, o, r, s, a, u = /(\d*)\D+(\d*)/, l = 0;
												l < this.getTotalCanvases();
												l++
											) {
												var c = this.getCanvasByIndex(l);
												if (e.LanguageMap.getValue(c.getLabel(), this.options.locale) === t)
													return l;
												if (
													((i = u.exec(t)),
													i &&
														((s = i[1]),
														(a = i[2]),
														a &&
															((r = '^' + s + '\\D+' + a + '$'),
															(o = new RegExp(r)),
															o.test(c.getLabel().toString()))))
												)
													return l;
											}
											return -1;
										}),
										(n.prototype.getLastCanvasLabel = function (t) {
											for (var n = this.getTotalCanvases() - 1; n >= 0; n--) {
												var i = this.getCanvasByIndex(n),
													o = e.LanguageMap.getValue(i.getLabel(), this.options.locale);
												if (t) {
													var r = /^[a-zA-Z0-9]*$/;
													if (r.test(o)) return o;
												} else if (o) return o;
											}
											return this.options.defaultLabel;
										}),
										(n.prototype.getLastPageIndex = function () {
											return this.getTotalCanvases() - 1;
										}),
										(n.prototype.getNextPageIndex = function (t, n) {
											var i;
											if (n) {
												var o = this.getPagedIndices(t),
													r = this.getViewingDirection();
												i =
													r && r.toString() === e.ViewingDirection.RIGHTTOLEFT.toString()
														? o[0] + 1
														: o[o.length - 1] + 1;
											} else i = t + 1;
											return i > this.getLastPageIndex() ? -1 : i;
										}),
										(n.prototype.getPagedIndices = function (t, n) {
											var i = [];
											if (n) {
												i =
													this.isFirstCanvas(t) || this.isLastCanvas(t)
														? [t]
														: t % 2
														? [t, t + 1]
														: [t - 1, t];
												var o = this.getViewingDirection();
												o &&
													o.toString() === e.ViewingDirection.RIGHTTOLEFT.toString() &&
													(i = i.reverse());
											} else i.push(t);
											return i;
										}),
										(n.prototype.getPrevPageIndex = function (t, n) {
											var i;
											if (n) {
												var o = this.getPagedIndices(t),
													r = this.getViewingDirection();
												i =
													r && r.toString() === e.ViewingDirection.RIGHTTOLEFT.toString()
														? o[o.length - 1] - 1
														: o[0] - 1;
											} else i = t - 1;
											return i;
										}),
										(n.prototype.getStartCanvasIndex = function () {
											var e = this.getStartCanvas();
											if (e)
												for (var t = 0; t < this.getTotalCanvases(); t++) {
													var n = this.getCanvasByIndex(t);
													if (n.id === e) return t;
												}
											return 0;
										}),
										(n.prototype.getThumbs = function (t, n) {
											console.warn('getThumbs will be deprecated, use getThumbnails instead');
											for (var i = [], o = this.getTotalCanvases(), r = 0; o > r; r++) {
												var s = this.getCanvasByIndex(r),
													a = new e.Thumb(t, s);
												i.push(a);
											}
											return i;
										}),
										(n.prototype.getThumbnails = function () {
											if (null != this._thumbnails) return this._thumbnails;
											this._thumbnails = [];
											for (var e = this.getCanvases(), t = 0; t < e.length; t++) {
												var n = e[t].getThumbnail();
												n && this._thumbnails.push(n);
											}
											return this._thumbnails;
										}),
										(n.prototype.getStartCanvas = function () {
											return this.getProperty('startCanvas');
										}),
										(n.prototype.getTotalCanvases = function () {
											return this.getCanvases().length;
										}),
										(n.prototype.getViewingDirection = function () {
											return this.getProperty('viewingDirection')
												? new e.ViewingDirection(this.getProperty('viewingDirection'))
												: this.options.resource.getViewingDirection
												? this.options.resource.getViewingDirection()
												: null;
										}),
										(n.prototype.getViewingHint = function () {
											return this.getProperty('viewingHint')
												? new e.ViewingHint(this.getProperty('viewingHint'))
												: null;
										}),
										(n.prototype.isCanvasIndexOutOfRange = function (e) {
											return e > this.getTotalCanvases() - 1;
										}),
										(n.prototype.isFirstCanvas = function (e) {
											return 0 === e;
										}),
										(n.prototype.isLastCanvas = function (e) {
											return e === this.getTotalCanvases() - 1;
										}),
										(n.prototype.isMultiCanvas = function () {
											return this.getTotalCanvases() > 1;
										}),
										(n.prototype.isPagingEnabled = function () {
											var t = this.getViewingHint();
											return t ? t.toString() === e.ViewingHint.PAGED.toString() : !1;
										}),
										(n.prototype.isTotalCanvasesEven = function () {
											return this.getTotalCanvases() % 2 === 0;
										}),
										n
									);
								})(e.ManifestResource);
								e.Sequence = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function t() {}
									return (
										(t.parse = function (e, t) {
											return 'string' == typeof e && (e = JSON.parse(e)), this.parseJson(e, t);
										}),
										(t.parseJson = function (e, t) {
											var n;
											if (
												(t &&
													t.navDate &&
													!isNaN(t.navDate.getTime()) &&
													(e.navDate = t.navDate.toString()),
												e['@type'])
											)
												switch (e['@type']) {
													case 'sc:Collection':
														n = this.parseCollection(e, t);
														break;
													case 'sc:Manifest':
														n = this.parseManifest(e, t);
														break;
													default:
														return null;
												}
											else
												switch (e.type) {
													case 'Collection':
														n = this.parseCollection(e, t);
														break;
													case 'Manifest':
														n = this.parseManifest(e, t);
														break;
													default:
														return null;
												}
											return (n.isLoaded = !0), n;
										}),
										(t.parseCollection = function (t, n) {
											var i = new e.Collection(t, n);
											return (
												n ? (i.index = n.index || 0) : (i.index = 0),
												this.parseCollections(i, n),
												this.parseManifests(i, n),
												this.parseItems(i, n),
												i
											);
										}),
										(t.parseCollections = function (e, t) {
											var n;
											if (
												(e.__jsonld.collections
													? (n = e.__jsonld.collections)
													: e.__jsonld.items &&
													  (n = e.__jsonld.items
															.en()
															.where(function (e) {
																return 'collection' === e.type.toLowerCase();
															})
															.toArray()),
												n)
											)
												for (var i = 0; i < n.length; i++) {
													t && (t.index = i);
													var o = this.parseCollection(n[i], t);
													(o.index = i), (o.parentCollection = e), e.items.push(o);
												}
										}),
										(t.parseManifest = function (t, n) {
											var i = new e.Manifest(t, n);
											return i;
										}),
										(t.parseManifests = function (e, t) {
											var n;
											if (
												(e.__jsonld.manifests
													? (n = e.__jsonld.manifests)
													: e.__jsonld.items &&
													  (n = e.__jsonld.items
															.en()
															.where(function (e) {
																return 'manifest' === e.type.toLowerCase();
															})
															.toArray()),
												n)
											)
												for (var i = 0; i < n.length; i++) {
													var o = this.parseManifest(n[i], t);
													(o.index = i), (o.parentCollection = e), e.items.push(o);
												}
										}),
										(t.parseItem = function (e, t) {
											if (e['@type']) {
												if ('sc:manifest' === e['@type'].toLowerCase())
													return this.parseManifest(e, t);
												if ('sc:collection' === e['@type'].toLowerCase())
													return this.parseCollection(e, t);
											} else if (e.type) {
												if ('manifest' === e.type.toLowerCase()) return this.parseManifest(e, t);
												if ('collection' === e.type.toLowerCase())
													return this.parseCollection(e, t);
											}
											return null;
										}),
										(t.parseItems = function (e, t) {
											var n = e.__jsonld.members || e.__jsonld.items;
											if (n)
												for (
													var i = function (i) {
															t && (t.index = i);
															var r = o.parseItem(n[i], t);
															return r
																? e.items
																		.en()
																		.where(function (e) {
																			return e.id === r.id;
																		})
																		.first()
																	? 'continue'
																	: ((r.index = i), (r.parentCollection = e), void e.items.push(r))
																: { value: void 0 };
														},
														o = this,
														r = 0;
													r < n.length;
													r++
												) {
													var s = i(r);
													if ('object' == typeof s) return s.value;
												}
										}),
										t
									);
								})();
								e.Deserialiser = t;
								var n = (function () {
									function e() {}
									return (
										(e.serialise = function (e) {
											return '';
										}),
										e
									);
								})();
								e.Serialiser = n;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										return t.call(this, e, n) || this;
									}
									return (
										o(n, t),
										(n.prototype.getProfile = function () {
											var t = this.getProperty('profile');
											return (
												t || (t = this.getProperty('dcterms:conformsTo')),
												Array.isArray(t) ? new e.ServiceProfile(t[0]) : new e.ServiceProfile(t)
											);
										}),
										(n.prototype.getConfirmLabel = function () {
											return e.Utils.getLocalisedValue(
												this.getProperty('confirmLabel'),
												this.options.locale
											);
										}),
										(n.prototype.getDescription = function () {
											return e.Utils.getLocalisedValue(
												this.getProperty('description'),
												this.options.locale
											);
										}),
										(n.prototype.getFailureDescription = function () {
											return e.Utils.getLocalisedValue(
												this.getProperty('failureDescription'),
												this.options.locale
											);
										}),
										(n.prototype.getFailureHeader = function () {
											return e.Utils.getLocalisedValue(
												this.getProperty('failureHeader'),
												this.options.locale
											);
										}),
										(n.prototype.getHeader = function () {
											return e.Utils.getLocalisedValue(
												this.getProperty('header'),
												this.options.locale
											);
										}),
										(n.prototype.getServiceLabel = function () {
											return e.Utils.getLocalisedValue(
												this.getProperty('label'),
												this.options.locale
											);
										}),
										(n.prototype.getInfoUri = function () {
											var e = this.id;
											return e.endsWith('/') || (e += '/'), (e += 'info.json');
										}),
										n
									);
								})(e.ManifestResource);
								e.Service = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function t(t, n) {
										(this.data = n), (this.index = n.index), (this.width = t);
										var i = n.getHeight() / n.getWidth();
										i ? (this.height = Math.floor(this.width * i)) : (this.height = t),
											(this.uri = n.getCanonicalImageUri(t)),
											(this.label = e.LanguageMap.getValue(n.getLabel()));
									}
									return t;
								})();
								e.Thumb = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function t(e, t) {
										(this.label = e), (this.data = t || {}), (this.nodes = []);
									}
									return (
										(t.prototype.addNode = function (e) {
											this.nodes.push(e), (e.parentNode = this);
										}),
										(t.prototype.isCollection = function () {
											return (
												this.data.type ===
												e.Utils.normaliseType(e.TreeNodeType.COLLECTION.toString())
											);
										}),
										(t.prototype.isManifest = function () {
											return (
												this.data.type === e.Utils.normaliseType(e.TreeNodeType.MANIFEST.toString())
											);
										}),
										(t.prototype.isRange = function () {
											return (
												this.data.type === e.Utils.normaliseType(e.TreeNodeType.RANGE.toString())
											);
										}),
										t
									);
								})();
								e.TreeNode = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										o(t, e),
										(t.prototype.collection = function () {
											return new t(t.COLLECTION.toString());
										}),
										(t.prototype.manifest = function () {
											return new t(t.MANIFEST.toString());
										}),
										(t.prototype.range = function () {
											return new t(t.RANGE.toString());
										}),
										(t.COLLECTION = new t('collection')),
										(t.MANIFEST = new t('manifest')),
										(t.RANGE = new t('range')),
										t
									);
								})(e.StringValue);
								e.TreeNodeType = t;
							})(i || (i = {}));
							var i,
								r =
									(this && this.__awaiter) ||
									function (e, t, n, i) {
										return new (n || (n = Promise))(function (o, r) {
											function s(e) {
												try {
													u(i.next(e));
												} catch (t) {
													r(t);
												}
											}
											function a(e) {
												try {
													u(i['throw'](e));
												} catch (t) {
													r(t);
												}
											}
											function u(e) {
												e.done
													? o(e.value)
													: new n(function (t) {
															t(e.value);
													  }).then(s, a);
											}
											u((i = i.apply(e, t || [])).next());
										});
									},
								s =
									(this && this.__generator) ||
									function (e, t) {
										function n(e) {
											return function (t) {
												return i([e, t]);
											};
										}
										function i(n) {
											if (o) throw new TypeError('Generator is already executing.');
											for (; u; )
												try {
													if (
														((o = 1),
														r &&
															(s =
																2 & n[0]
																	? r['return']
																	: n[0]
																	? r['throw'] || ((s = r['return']) && s.call(r), 0)
																	: r.next) &&
															!(s = s.call(r, n[1])).done)
													)
														return s;
													switch (((r = 0), s && (n = [2 & n[0], s.value]), n[0])) {
														case 0:
														case 1:
															s = n;
															break;
														case 4:
															return u.label++, { value: n[1], done: !1 };
														case 5:
															u.label++, (r = n[1]), (n = [0]);
															continue;
														case 7:
															(n = u.ops.pop()), u.trys.pop();
															continue;
														default:
															if (
																((s = u.trys),
																!(s = s.length > 0 && s[s.length - 1]) &&
																	(6 === n[0] || 2 === n[0]))
															) {
																u = 0;
																continue;
															}
															if (3 === n[0] && (!s || (n[1] > s[0] && n[1] < s[3]))) {
																u.label = n[1];
																break;
															}
															if (6 === n[0] && u.label < s[1]) {
																(u.label = s[1]), (s = n);
																break;
															}
															if (s && u.label < s[2]) {
																(u.label = s[2]), u.ops.push(n);
																break;
															}
															s[2] && u.ops.pop(), u.trys.pop();
															continue;
													}
													n = t.call(e, u);
												} catch (i) {
													(n = [6, i]), (r = 0);
												} finally {
													o = s = 0;
												}
											if (5 & n[0]) throw n[1];
											return { value: n[0] ? n[1] : void 0, done: !0 };
										}
										var o,
											r,
											s,
											a,
											u = {
												label: 0,
												sent: function () {
													if (1 & s[0]) throw s[1];
													return s[1];
												},
												trys: [],
												ops: []
											};
										return (
											(a = { next: n(0), throw: n(1), return: n(2) }),
											'function' == typeof Symbol &&
												(a[Symbol.iterator] = function () {
													return this;
												}),
											a
										);
									},
								a = e('http'),
								u = e('https'),
								l = e('url');
							!(function (e) {
								var t = (function () {
									function t() {}
									return (
										(t.getMediaType = function (e) {
											return (e = e.toLowerCase()), (e = e.split(';')[0]), e.trim();
										}),
										(t.getImageQuality = function (t) {
											var n = t.toString();
											return n === e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1.toString() ||
												n === e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2.toString() ||
												n === e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE1.toString() ||
												n === e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2.toString() ||
												n === e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1.toString() ||
												n === e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2.toString() ||
												n === e.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1.toString() ||
												n === e.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2.toString() ||
												n === e.ServiceProfile.IIIF1IMAGELEVEL1.toString() ||
												n === e.ServiceProfile.IIIF1IMAGELEVEL1PROFILE.toString() ||
												n === e.ServiceProfile.IIIF1IMAGELEVEL2.toString() ||
												n === e.ServiceProfile.IIIF1IMAGELEVEL2PROFILE.toString()
												? 'native'
												: 'default';
										}),
										(t.getInexactLocale = function (e) {
											return -1 !== e.indexOf('-') ? e.substr(0, e.indexOf('-')) : e;
										}),
										(t.getLocalisedValue = function (e, t) {
											if (!Array.isArray(e)) return e;
											for (var n = 0; n < e.length; n++) {
												var i = e[n],
													o = i['@language'];
												if (t === o) return i['@value'];
											}
											for (var r = t.substr(0, t.indexOf('-')), n = 0; n < e.length; n++) {
												var s = e[n],
													a = s['@language'];
												if (a === r) return s['@value'];
											}
											return null;
										}),
										(t.generateTreeNodeIds = function (e, n) {
											void 0 === n && (n = 0);
											var i;
											(i = e.parentNode ? e.parentNode.id + '-' + n : '0'), (e.id = i);
											for (var o = 0; o < e.nodes.length; o++) {
												var r = e.nodes[o];
												t.generateTreeNodeIds(r, o);
											}
										}),
										(t.normaliseType = function (e) {
											if (((e = e.toLowerCase()), -1 !== e.indexOf(':'))) {
												var t = e.split(':');
												return t[1];
											}
											return e;
										}),
										(t.normaliseUrl = function (e) {
											return (
												(e = e.substr(e.indexOf('://'))),
												-1 !== e.indexOf('#') && (e = e.split('#')[0]),
												e
											);
										}),
										(t.normalisedUrlsMatch = function (e, n) {
											return t.normaliseUrl(e) === t.normaliseUrl(n);
										}),
										(t.isImageProfile = function (n) {
											return (
												'string' == typeof n && (n = new e.ServiceProfile(n)),
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL0PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL1PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL2PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL0PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL1PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL2PROFILE.toString()
												)
													? !0
													: !1
											);
										}),
										(t.isLevel0ImageProfile = function (n) {
											return (
												'string' == typeof n && (n = new e.ServiceProfile(n)),
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL0PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL0.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL0PROFILE.toString()
												)
													? !0
													: !1
											);
										}),
										(t.isLevel1ImageProfile = function (n) {
											return (
												'string' == typeof n && (n = new e.ServiceProfile(n)),
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL1PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL1.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL1PROFILE.toString()
												)
													? !0
													: !1
											);
										}),
										(t.isLevel2ImageProfile = function (n) {
											return (
												'string' == typeof n && (n = new e.ServiceProfile(n)),
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF1IMAGELEVEL2PROFILE.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL2.toString()
												) ||
												t.normalisedUrlsMatch(
													n.toString(),
													e.ServiceProfile.IIIF2IMAGELEVEL2PROFILE.toString()
												)
													? !0
													: !1
											);
										}),
										(t.loadResource = function (e) {
											return new Promise(function (t, n) {
												var i,
													o = l.parse(e),
													r = {
														host: o.hostname,
														port: o.port,
														path: o.path,
														method: 'GET',
														withCredentials: !1
													};
												switch (o.protocol) {
													case 'https:':
														(i = u.request(r, function (e) {
															var n = '';
															e.on('data', function (e) {
																n += e;
															}),
																e.on('end', function () {
																	t(n);
																});
														})),
															i.on('error', function (e) {
																n(e);
															}),
															i.end();
														break;
													case 'dat:':
														var s = new XMLHttpRequest();
														(s.onreadystatechange = function () {
															4 === s.readyState && t(s.response);
														}),
															s.open('GET', e, !0),
															s.send();
														break;
													default:
														(i = a.request(r, function (e) {
															var n = '';
															e.on('data', function (e) {
																n += e;
															}),
																e.on('end', function () {
																	t(n);
																});
														})),
															i.on('error', function (e) {
																n(e);
															}),
															i.end();
												}
											});
										}),
										(t.loadExternalResourcesAuth1 = function (e, n, i, o, r, s, a, u) {
											return new Promise(function (l, c) {
												var h = e.map(function (e) {
													return t.loadExternalResourceAuth1(e, n, i, o, r, s, a, u);
												});
												Promise.all(h)
													.then(function () {
														l(e);
													})
													['catch'](function (e) {
														c(e);
													});
											});
										}),
										(t.loadExternalResourceAuth1 = function (e, n, i, o, a, u, l, c) {
											return r(this, void 0, void 0, function () {
												var r;
												return s(this, function (s) {
													switch (s.label) {
														case 0:
															return [4, o(e)];
														case 1:
															return (r = s.sent()), r ? [4, e.getData(r)] : [3, 6];
														case 2:
															return s.sent(), e.status !== HTTPStatusCode.OK ? [3, 3] : [2, e];
														case 3:
															return [4, t.doAuthChain(e, n, i, a, u, l, c)];
														case 4:
															s.sent(), (s.label = 5);
														case 5:
															if (
																e.status === HTTPStatusCode.OK ||
																e.status === HTTPStatusCode.MOVED_TEMPORARILY
															)
																return [2, e];
															throw t.createAuthorizationFailedError();
														case 6:
															return [4, e.getData()];
														case 7:
															return (
																s.sent(),
																e.status !== HTTPStatusCode.MOVED_TEMPORARILY &&
																e.status !== HTTPStatusCode.UNAUTHORIZED
																	? [3, 9]
																	: [4, t.doAuthChain(e, n, i, a, u, l, c)]
															);
														case 8:
															s.sent(), (s.label = 9);
														case 9:
															if (
																e.status === HTTPStatusCode.OK ||
																e.status === HTTPStatusCode.MOVED_TEMPORARILY
															)
																return [2, e];
															throw t.createAuthorizationFailedError();
													}
												});
											});
										}),
										(t.doAuthChain = function (e, n, i, o, a, u, l) {
											return r(this, void 0, void 0, function () {
												var r, c, h, p, d, f, g, v, v;
												return s(this, function (s) {
													switch (s.label) {
														case 0:
															return e.isAccessControlled()
																? ((r = e.externalService),
																  r && (r.options = e.options),
																  (c = e.kioskService),
																  c && (c.options = e.options),
																  (h = e.clickThroughService),
																  h && (h.options = e.options),
																  (p = e.loginService),
																  p && (p.options = e.options),
																  e.isResponseHandled ||
																  e.status !== HTTPStatusCode.MOVED_TEMPORARILY
																		? [3, 2]
																		: [4, u(e)])
																: [2, e];
														case 1:
															return s.sent(), [2, e];
														case 2:
															return (
																(d = null),
																(f = null),
																(d = r)
																	? ((f = d), [4, t.attemptResourceWithToken(e, i, d)])
																	: [3, 4]
															);
														case 3:
															return s.sent(), [2, e];
														case 4:
															return (d = c)
																? ((f = d), (g = n(d)), g ? [4, o(g)] : [3, 7])
																: [3, 7];
														case 5:
															return s.sent(), [4, t.attemptResourceWithToken(e, i, d)];
														case 6:
															return s.sent(), [2, e];
														case 7:
															return (d = h) ? ((f = d), [4, a(e, d)]) : [3, 11];
														case 8:
															return (v = s.sent()), v ? [4, o(v)] : [3, 11];
														case 9:
															return s.sent(), [4, t.attemptResourceWithToken(e, i, d)];
														case 10:
															return s.sent(), [2, e];
														case 11:
															return (d = p) ? ((f = d), [4, a(e, d)]) : [3, 15];
														case 12:
															return (v = s.sent()), v ? [4, o(v)] : [3, 15];
														case 13:
															return s.sent(), [4, t.attemptResourceWithToken(e, i, d)];
														case 14:
															return s.sent(), [2, e];
														case 15:
															return f && l(e, f), [2];
													}
												});
											});
										}),
										(t.attemptResourceWithToken = function (t, n, i) {
											return r(this, void 0, void 0, function () {
												var o, r;
												return s(this, function (s) {
													switch (s.label) {
														case 0:
															return (
																(o = i.getService(e.ServiceProfile.AUTH1TOKEN.toString())),
																o ? [4, n(t, o)] : [3, 3]
															);
														case 1:
															return (
																(r = s.sent()), r && r.accessToken ? [4, t.getData(r)] : [3, 3]
															);
														case 2:
															return s.sent(), [2, t];
														case 3:
															return [2];
													}
												});
											});
										}),
										(t.loadExternalResourcesAuth09 = function (e, n, i, o, r, s, a, u, l, c) {
											return new Promise(function (h, p) {
												var d = e.map(function (e) {
													return t.loadExternalResourceAuth09(e, n, i, o, r, s, a, u, l, c);
												});
												Promise.all(d)
													.then(function () {
														h(e);
													})
													['catch'](function (e) {
														p(e);
													});
											});
										}),
										(t.loadExternalResourceAuth09 = function (e, n, i, o, r, s, a, u, l, c) {
											return new Promise(function (h, p) {
												c && c.pessimisticAccessControl
													? e
															.getData()
															.then(function () {
																e.isAccessControlled()
																	? e.clickThroughService
																		? (h(i(e)), h(o(e)))
																		: r(e)
																				.then(function () {
																					s(e, !0)
																						.then(function (n) {
																							e.getData(n)
																								.then(function () {
																									h(l(e));
																								})
																								['catch'](function (e) {
																									p(t.createInternalServerError(e));
																								});
																						})
																						['catch'](function (e) {
																							p(t.createInternalServerError(e));
																						});
																				})
																				['catch'](function (e) {
																					p(t.createInternalServerError(e));
																				})
																	: h(e);
															})
															['catch'](function (e) {
																p(t.createInternalServerError(e));
															})
													: u(e, n)
															.then(function (c) {
																c
																	? e
																			.getData(c)
																			.then(function () {
																				e.status === HTTPStatusCode.OK
																					? h(l(e))
																					: t
																							.authorize(e, n, i, o, r, s, a, u)
																							.then(function () {
																								h(l(e));
																							})
																							['catch'](function (e) {
																								p(t.createAuthorizationFailedError());
																							});
																			})
																			['catch'](function (e) {
																				p(t.createAuthorizationFailedError());
																			})
																	: t
																			.authorize(e, n, i, o, r, s, a, u)
																			.then(function () {
																				h(l(e));
																			})
																			['catch'](function (e) {
																				p(t.createAuthorizationFailedError());
																			});
															})
															['catch'](function (e) {
																p(t.createAuthorizationFailedError());
															});
											});
										}),
										(t.createError = function (e, t) {
											var n = new Error();
											return (n.message = t), (n.name = e), n;
										}),
										(t.createAuthorizationFailedError = function () {
											return t.createError(
												manifesto.StatusCodes.AUTHORIZATION_FAILED.toString(),
												'Authorization failed'
											);
										}),
										(t.createRestrictedError = function () {
											return t.createError(
												manifesto.StatusCodes.RESTRICTED.toString(),
												'Restricted'
											);
										}),
										(t.createInternalServerError = function (e) {
											return t.createError(
												manifesto.StatusCodes.INTERNAL_SERVER_ERROR.toString(),
												e
											);
										}),
										(t.authorize = function (e, n, i, o, r, s, a, u) {
											return new Promise(function (l, c) {
												e.getData().then(function () {
													e.isAccessControlled()
														? u(e, n)
																.then(function (u) {
																	u
																		? e
																				.getData(u)
																				.then(function () {
																					e.status === HTTPStatusCode.OK
																						? l(e)
																						: t.showAuthInteraction(e, n, i, o, r, s, a, l, c);
																				})
																				['catch'](function (e) {
																					c(t.createInternalServerError(e));
																				})
																		: s(e, !1).then(function (u) {
																				u
																					? a(e, u, n)
																							.then(function () {
																								e.getData(u)
																									.then(function () {
																										e.status === HTTPStatusCode.OK
																											? l(e)
																											: t.showAuthInteraction(
																													e,
																													n,
																													i,
																													o,
																													r,
																													s,
																													a,
																													l,
																													c
																											  );
																									})
																									['catch'](function (e) {
																										c(t.createInternalServerError(e));
																									});
																							})
																							['catch'](function (e) {
																								c(t.createInternalServerError(e));
																							})
																					: t.showAuthInteraction(e, n, i, o, r, s, a, l, c);
																		  });
																})
																['catch'](function (e) {
																	c(t.createInternalServerError(e));
																})
														: l(e);
												});
											});
										}),
										(t.showAuthInteraction = function (e, n, i, o, r, s, a, u, l) {
											e.status !== HTTPStatusCode.MOVED_TEMPORARILY || e.isResponseHandled
												? e.clickThroughService && !e.isResponseHandled
													? i(e).then(function () {
															s(e, !0)
																.then(function (i) {
																	a(e, i, n)
																		.then(function () {
																			e.getData(i)
																				.then(function () {
																					u(e);
																				})
																				['catch'](function (e) {
																					l(t.createInternalServerError(e));
																				});
																		})
																		['catch'](function (e) {
																			l(t.createInternalServerError(e));
																		});
																})
																['catch'](function (e) {
																	l(t.createInternalServerError(e));
																});
													  })
													: r(e).then(function () {
															s(e, !0)
																.then(function (i) {
																	a(e, i, n)
																		.then(function () {
																			e.getData(i)
																				.then(function () {
																					u(e);
																				})
																				['catch'](function (e) {
																					l(t.createInternalServerError(e));
																				});
																		})
																		['catch'](function (e) {
																			l(t.createInternalServerError(e));
																		});
																})
																['catch'](function (e) {
																	l(t.createInternalServerError(e));
																});
													  })
												: u(e);
										}),
										(t.getService = function (e, t) {
											var n = this.getServices(e);
											'string' != typeof t && (t = t.toString());
											for (var i = 0; i < n.length; i++) {
												var o = n[i];
												if (o.getProfile().toString() === t) return o;
											}
											return null;
										}),
										(t.getResourceById = function (e, n) {
											return [e.__jsonld]
												.en()
												.traverseUnique(function (e) {
													return t.getAllArrays(e);
												})
												.first(function (e) {
													return e['@id'] === n;
												});
										}),
										(t.getAllArrays = function (e) {
											var t = [].en();
											if (!e) return t;
											for (var n in e) {
												var i = e[n];
												Array.isArray(i) && (t = t.concat(i));
											}
											return t;
										}),
										(t.getServices = function (t) {
											var n;
											n = t.__jsonld ? t.__jsonld.service : t.service;
											var i = [];
											if (!n) return i;
											Array.isArray(n) || (n = [n]);
											for (var o = 0; o < n.length; o++) {
												var r = n[o];
												if ('string' == typeof r) {
													var s = this.getResourceById(t.options.resource, r);
													s && i.push(new e.Service(s.__jsonld || s, t.options));
												} else i.push(new e.Service(r, t.options));
											}
											return i;
										}),
										(t.getTemporalComponent = function (e) {
											var t = /t=([^&]+)/g.exec(e),
												n = null;
											return t && t[1] && (n = t[1].split(',')), n;
										}),
										t
									);
								})();
								e.Utils = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function e(e, t) {
										Array.isArray(e)
											? 1 === e.length
												? (this.value = e[0])
												: (this.value = e.join('<br/>'))
											: (this.value = e),
											(this.locale = t);
									}
									return e;
								})();
								e.Language = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n() {
										return (null !== t && t.apply(this, arguments)) || this;
									}
									return (
										o(n, t),
										(n.parse = function (t, n) {
											var i,
												o = [];
											if (!t) return o;
											if (Array.isArray(t))
												for (var r = 0; r < t.length; r++) {
													var s = t[r];
													(i =
														'string' == typeof s
															? new e.Language(s, n)
															: new e.Language(s['@value'], s['@language'] || n)),
														o.push(i);
												}
											else {
												if ('string' == typeof t) return (i = new e.Language(t, n)), o.push(i), o;
												t['@value']
													? ((i = new e.Language(t['@value'], t['@language'] || n)), o.push(i))
													: Object.keys(t).forEach(function (n) {
															if (!t[n].length) throw new Error('language must have a value');
															(i = new e.Language(t[n], n)), o.push(i);
													  });
											}
											return o;
										}),
										(n.getValue = function (t, n) {
											if (t.length) {
												if (n) {
													var i = t
														.en()
														.where(function (t) {
															return (
																t.locale === n ||
																e.Utils.getInexactLocale(t.locale) === e.Utils.getInexactLocale(n)
															);
														})
														.first();
													if (i) return i.value;
												}
												return t[0].value;
											}
											return null;
										}),
										n
									);
								})(Array);
								e.LanguageMap = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function t(e) {
										this.defaultLocale = e;
									}
									return (
										(t.prototype.parse = function (t) {
											(this.resource = t),
												(this.label = e.LanguageMap.parse(this.resource.label, this.defaultLocale)),
												(this.value = e.LanguageMap.parse(this.resource.value, this.defaultLocale));
										}),
										(t.prototype.getLabel = function () {
											return this.label
												? e.LanguageMap.getValue(this.label, this.defaultLocale)
												: null;
										}),
										(t.prototype.setLabel = function (t) {
											var n = this;
											if (this.label && this.label.length) {
												var i = this.label
													.en()
													.where(function (t) {
														return (
															t.locale === n.defaultLocale ||
															t.locale === e.Utils.getInexactLocale(n.defaultLocale)
														);
													})
													.first();
												i && (i.value = t);
											}
										}),
										(t.prototype.getValue = function () {
											if (this.value) {
												var t = this.defaultLocale;
												return (
													this.label &&
														this.label.length &&
														this.label[0].locale &&
														(t = this.label[0].locale),
													e.LanguageMap.getValue(this.value, t)
												);
											}
											return null;
										}),
										(t.prototype.setValue = function (t) {
											var n = this;
											if (this.value && this.value.length) {
												var i = this.value
													.en()
													.where(function (t) {
														return (
															t.locale === n.defaultLocale ||
															t.locale === e.Utils.getInexactLocale(n.defaultLocale)
														);
													})
													.first();
												i && (i.value = t);
											}
										}),
										t
									);
								})();
								e.LabelValuePair = t;
							})(i || (i = {}));
							var i;
							!(function (e) {
								var t = (function () {
									function e(e, t) {
										(this.width = e), (this.height = t);
									}
									return e;
								})();
								e.Size = t;
							})(i || (i = {})),
								(n.manifesto =
									n.Manifesto =
									t.exports =
										{
											AnnotationMotivation: new i.AnnotationMotivation(),
											Behavior: new i.Behavior(),
											IIIFResourceType: new i.IIIFResourceType(),
											LabelValuePair: i.LabelValuePair,
											Language: i.Language,
											LanguageMap: i.LanguageMap,
											ManifestType: new i.ManifestType(),
											MediaType: new i.MediaType(),
											RenderingFormat: new i.RenderingFormat(),
											ResourceType: new i.ResourceType(),
											ServiceProfile: new i.ServiceProfile(),
											Size: i.Size,
											TreeNode: i.TreeNode,
											TreeNodeType: new i.TreeNodeType(),
											Utils: i.Utils,
											ViewingDirection: new i.ViewingDirection(),
											ViewingHint: new i.ViewingHint(),
											StatusCodes: {
												AUTHORIZATION_FAILED: 1,
												FORBIDDEN: 2,
												INTERNAL_SERVER_ERROR: 3,
												RESTRICTED: 4
											},
											create: function (e, t) {
												return i.Deserialiser.parse(e, t);
											},
											loadManifest: function (e) {
												return i.Utils.loadResource(e);
											}
										});
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										return t.call(this, e, n) || this;
									}
									return (
										o(n, t),
										(n.prototype.getBody = function () {
											var t = [],
												n = this.getProperty('body');
											if (n)
												if (Array.isArray(n))
													for (var i = 0; i < n.length; i++) {
														var o = n[i];
														if (o.items)
															for (var r = 0; r < o.items.length; r++) {
																var s = o.items[r];
																t.push(new e.AnnotationBody(s, this.options));
															}
														else t.push(new e.AnnotationBody(o, this.options));
													}
												else if (n.items)
													for (var i = 0; i < n.items.length; i++) {
														var o = n.items[i];
														t.push(new e.AnnotationBody(o, this.options));
													}
												else t.push(new e.AnnotationBody(n, this.options));
											return t;
										}),
										(n.prototype.getMotivation = function () {
											var t = this.getProperty('motivation');
											return t ? new e.AnnotationMotivation(t.toLowerCase()) : null;
										}),
										(n.prototype.getOn = function () {
											return this.getProperty('on');
										}),
										(n.prototype.getTarget = function () {
											return this.getProperty('target');
										}),
										(n.prototype.getResource = function () {
											return new e.Resource(this.getProperty('resource'), this.options);
										}),
										n
									);
								})(e.ManifestResource);
								e.Annotation = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n) {
										return t.call(this, e, n) || this;
									}
									return (
										o(n, t),
										(n.prototype.getFormat = function () {
											var t = this.getProperty('format');
											return t ? new e.MediaType(e.Utils.getMediaType(t)) : null;
										}),
										(n.prototype.getType = function () {
											var t = this.getProperty('type');
											return t
												? new e.ResourceType(e.Utils.normaliseType(this.getProperty('type')))
												: null;
										}),
										(n.prototype.getWidth = function () {
											return this.getProperty('width');
										}),
										(n.prototype.getHeight = function () {
											return this.getProperty('height');
										}),
										n
									);
								})(e.ManifestResource);
								e.AnnotationBody = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (t) {
									function n(e, n, i) {
										var o = t.call(this, n) || this;
										return (o.label = e), (o.options = i), o;
									}
									return (
										o(n, t),
										(n.prototype.getIIIFResourceType = function () {
											return new e.IIIFResourceType(
												e.Utils.normaliseType(this.getProperty('type'))
											);
										}),
										(n.prototype.getLabel = function () {
											return this.label;
										}),
										(n.prototype.getResources = function () {
											var t = this,
												n = this.getProperty('resources');
											return n.map(function (n) {
												return new e.Annotation(n, t.options);
											});
										}),
										(n.prototype.load = function () {
											var t = this;
											return new Promise(function (n, i) {
												if (t.isLoaded) n(t);
												else {
													var o = t.__jsonld.id;
													o || (o = t.__jsonld['@id']),
														e.Utils.loadResource(o)
															.then(function (e) {
																(t.__jsonld = JSON.parse(e)),
																	(t.context = t.getProperty('context')),
																	(t.id = t.getProperty('id')),
																	(t.isLoaded = !0),
																	n(t);
															})
															['catch'](i);
												}
											});
										}),
										n
									);
								})(e.JSONLDResource);
								e.AnnotationList = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t(t, n) {
										return e.call(this, t, n) || this;
									}
									return (
										o(t, e),
										(t.prototype.getItems = function () {
											return this.getProperty('items');
										}),
										t
									);
								})(e.ManifestResource);
								e.AnnotationPage = t;
							})(i || (i = {}));
							var i,
								o =
									(this && this.__extends) ||
									(function () {
										var e = function (t, n) {
											return (e =
												Object.setPrototypeOf ||
												({ __proto__: [] } instanceof Array &&
													function (e, t) {
														e.__proto__ = t;
													}) ||
												function (e, t) {
													for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
												})(t, n);
										};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t(t, n) {
										return e.call(this, t, n) || this;
									}
									return o(t, e), t;
								})(e.Resource);
								e.Thumbnail = t;
							})(i || (i = {}));
						}.call(
							this,
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{ http: 30, https: 8, url: 36 }
				],
				2: [
					function (e, t, n) {
						'use strict';
						function i(e) {
							var t = e.length;
							if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
							var n = e.indexOf('=');
							-1 === n && (n = t);
							var i = n === t ? 0 : 4 - (n % 4);
							return [n, i];
						}
						function o(e) {
							var t = i(e),
								n = t[0],
								o = t[1];
							return (3 * (n + o)) / 4 - o;
						}
						function r(e, t, n) {
							return (3 * (t + n)) / 4 - n;
						}
						function s(e) {
							for (
								var t,
									n = i(e),
									o = n[0],
									s = n[1],
									a = new p(r(e, o, s)),
									u = 0,
									l = s > 0 ? o - 4 : o,
									c = 0;
								l > c;
								c += 4
							)
								(t =
									(h[e.charCodeAt(c)] << 18) |
									(h[e.charCodeAt(c + 1)] << 12) |
									(h[e.charCodeAt(c + 2)] << 6) |
									h[e.charCodeAt(c + 3)]),
									(a[u++] = (t >> 16) & 255),
									(a[u++] = (t >> 8) & 255),
									(a[u++] = 255 & t);
							return (
								2 === s &&
									((t = (h[e.charCodeAt(c)] << 2) | (h[e.charCodeAt(c + 1)] >> 4)),
									(a[u++] = 255 & t)),
								1 === s &&
									((t =
										(h[e.charCodeAt(c)] << 10) |
										(h[e.charCodeAt(c + 1)] << 4) |
										(h[e.charCodeAt(c + 2)] >> 2)),
									(a[u++] = (t >> 8) & 255),
									(a[u++] = 255 & t)),
								a
							);
						}
						function a(e) {
							return c[(e >> 18) & 63] + c[(e >> 12) & 63] + c[(e >> 6) & 63] + c[63 & e];
						}
						function u(e, t, n) {
							for (var i, o = [], r = t; n > r; r += 3)
								(i = ((e[r] << 16) & 16711680) + ((e[r + 1] << 8) & 65280) + (255 & e[r + 2])),
									o.push(a(i));
							return o.join('');
						}
						function l(e) {
							for (
								var t, n = e.length, i = n % 3, o = [], r = 16383, s = 0, a = n - i;
								a > s;
								s += r
							)
								o.push(u(e, s, s + r > a ? a : s + r));
							return (
								1 === i
									? ((t = e[n - 1]), o.push(c[t >> 2] + c[(t << 4) & 63] + '=='))
									: 2 === i &&
									  ((t = (e[n - 2] << 8) + e[n - 1]),
									  o.push(c[t >> 10] + c[(t >> 4) & 63] + c[(t << 2) & 63] + '=')),
								o.join('')
							);
						}
						(n.byteLength = o), (n.toByteArray = s), (n.fromByteArray = l);
						for (
							var c = [],
								h = [],
								p = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
								d = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
								f = 0,
								g = d.length;
							g > f;
							++f
						)
							(c[f] = d[f]), (h[d.charCodeAt(f)] = f);
						(h['-'.charCodeAt(0)] = 62), (h['_'.charCodeAt(0)] = 63);
					},
					{}
				],
				3: [function (e, t, n) {}, {}],
				4: [
					function (e, t, n) {
						(function (t) {
							'use strict';
							function i() {
								try {
									var e = new Uint8Array(1);
									return (
										(e.__proto__ = {
											__proto__: Uint8Array.prototype,
											foo: function () {
												return 42;
											}
										}),
										42 === e.foo() &&
											'function' == typeof e.subarray &&
											0 === e.subarray(1, 1).byteLength
									);
								} catch (t) {
									return !1;
								}
							}
							function o() {
								return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
							}
							function r(e, t) {
								if (o() < t) throw new RangeError('Invalid typed array length');
								return (
									s.TYPED_ARRAY_SUPPORT
										? ((e = new Uint8Array(t)), (e.__proto__ = s.prototype))
										: (null === e && (e = new s(t)), (e.length = t)),
									e
								);
							}
							function s(e, t, n) {
								if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(e, t, n);
								if ('number' == typeof e) {
									if ('string' == typeof t)
										throw new Error(
											'If encoding is specified then the first argument must be a string'
										);
									return c(this, e);
								}
								return a(this, e, t, n);
							}
							function a(e, t, n, i) {
								if ('number' == typeof t)
									throw new TypeError('"value" argument must not be a number');
								return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
									? d(e, t, n, i)
									: 'string' == typeof t
									? h(e, t, n)
									: f(e, t);
							}
							function u(e) {
								if ('number' != typeof e) throw new TypeError('"size" argument must be a number');
								if (0 > e) throw new RangeError('"size" argument must not be negative');
							}
							function l(e, t, n, i) {
								return (
									u(t),
									0 >= t
										? r(e, t)
										: void 0 !== n
										? 'string' == typeof i
											? r(e, t).fill(n, i)
											: r(e, t).fill(n)
										: r(e, t)
								);
							}
							function c(e, t) {
								if ((u(t), (e = r(e, 0 > t ? 0 : 0 | g(t))), !s.TYPED_ARRAY_SUPPORT))
									for (var n = 0; t > n; ++n) e[n] = 0;
								return e;
							}
							function h(e, t, n) {
								if ((('string' != typeof n || '' === n) && (n = 'utf8'), !s.isEncoding(n)))
									throw new TypeError('"encoding" must be a valid string encoding');
								var i = 0 | m(t, n);
								e = r(e, i);
								var o = e.write(t, n);
								return o !== i && (e = e.slice(0, o)), e;
							}
							function p(e, t) {
								var n = t.length < 0 ? 0 : 0 | g(t.length);
								e = r(e, n);
								for (var i = 0; n > i; i += 1) e[i] = 255 & t[i];
								return e;
							}
							function d(e, t, n, i) {
								if ((t.byteLength, 0 > n || t.byteLength < n))
									throw new RangeError("'offset' is out of bounds");
								if (t.byteLength < n + (i || 0)) throw new RangeError("'length' is out of bounds");
								return (
									(t =
										void 0 === n && void 0 === i
											? new Uint8Array(t)
											: void 0 === i
											? new Uint8Array(t, n)
											: new Uint8Array(t, n, i)),
									s.TYPED_ARRAY_SUPPORT ? ((e = t), (e.__proto__ = s.prototype)) : (e = p(e, t)),
									e
								);
							}
							function f(e, t) {
								if (s.isBuffer(t)) {
									var n = 0 | g(t.length);
									return (e = r(e, n)), 0 === e.length ? e : (t.copy(e, 0, 0, n), e);
								}
								if (t) {
									if (
										('undefined' != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer) ||
										'length' in t
									)
										return 'number' != typeof t.length || Y(t.length) ? r(e, 0) : p(e, t);
									if ('Buffer' === t.type && Q(t.data)) return p(e, t.data);
								}
								throw new TypeError(
									'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
								);
							}
							function g(e) {
								if (e >= o())
									throw new RangeError(
										'Attempt to allocate Buffer larger than maximum size: 0x' +
											o().toString(16) +
											' bytes'
									);
								return 0 | e;
							}
							function v(e) {
								return +e != e && (e = 0), s.alloc(+e);
							}
							function m(e, t) {
								if (s.isBuffer(e)) return e.length;
								if (
									'undefined' != typeof ArrayBuffer &&
									'function' == typeof ArrayBuffer.isView &&
									(ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
								)
									return e.byteLength;
								'string' != typeof e && (e = '' + e);
								var n = e.length;
								if (0 === n) return 0;
								for (var i = !1; ; )
									switch (t) {
										case 'ascii':
										case 'latin1':
										case 'binary':
											return n;
										case 'utf8':
										case 'utf-8':
										case void 0:
											return q(e).length;
										case 'ucs2':
										case 'ucs-2':
										case 'utf16le':
										case 'utf-16le':
											return 2 * n;
										case 'hex':
											return n >>> 1;
										case 'base64':
											return X(e).length;
										default:
											if (i) return q(e).length;
											(t = ('' + t).toLowerCase()), (i = !0);
									}
							}
							function y(e, t, n) {
								var i = !1;
								if (((void 0 === t || 0 > t) && (t = 0), t > this.length)) return '';
								if (((void 0 === n || n > this.length) && (n = this.length), 0 >= n)) return '';
								if (((n >>>= 0), (t >>>= 0), t >= n)) return '';
								for (e || (e = 'utf8'); ; )
									switch (e) {
										case 'hex':
											return D(this, t, n);
										case 'utf8':
										case 'utf-8':
											return A(this, t, n);
										case 'ascii':
											return R(this, t, n);
										case 'latin1':
										case 'binary':
											return P(this, t, n);
										case 'base64':
											return O(this, t, n);
										case 'ucs2':
										case 'ucs-2':
										case 'utf16le':
										case 'utf-16le':
											return B(this, t, n);
										default:
											if (i) throw new TypeError('Unknown encoding: ' + e);
											(e = (e + '').toLowerCase()), (i = !0);
									}
							}
							function b(e, t, n) {
								var i = e[t];
								(e[t] = e[n]), (e[n] = i);
							}
							function E(e, t, n, i, o) {
								if (0 === e.length) return -1;
								if (
									('string' == typeof n
										? ((i = n), (n = 0))
										: n > 2147483647
										? (n = 2147483647)
										: -2147483648 > n && (n = -2147483648),
									(n = +n),
									isNaN(n) && (n = o ? 0 : e.length - 1),
									0 > n && (n = e.length + n),
									n >= e.length)
								) {
									if (o) return -1;
									n = e.length - 1;
								} else if (0 > n) {
									if (!o) return -1;
									n = 0;
								}
								if (('string' == typeof t && (t = s.from(t, i)), s.isBuffer(t)))
									return 0 === t.length ? -1 : _(e, t, n, i, o);
								if ('number' == typeof t)
									return (
										(t = 255 & t),
										s.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
											? o
												? Uint8Array.prototype.indexOf.call(e, t, n)
												: Uint8Array.prototype.lastIndexOf.call(e, t, n)
											: _(e, [t], n, i, o)
									);
								throw new TypeError('val must be string, number or Buffer');
							}
							function _(e, t, n, i, o) {
								function r(e, t) {
									return 1 === s ? e[t] : e.readUInt16BE(t * s);
								}
								var s = 1,
									a = e.length,
									u = t.length;
								if (
									void 0 !== i &&
									((i = String(i).toLowerCase()),
									'ucs2' === i || 'ucs-2' === i || 'utf16le' === i || 'utf-16le' === i)
								) {
									if (e.length < 2 || t.length < 2) return -1;
									(s = 2), (a /= 2), (u /= 2), (n /= 2);
								}
								var l;
								if (o) {
									var c = -1;
									for (l = n; a > l; l++)
										if (r(e, l) === r(t, -1 === c ? 0 : l - c)) {
											if ((-1 === c && (c = l), l - c + 1 === u)) return c * s;
										} else -1 !== c && (l -= l - c), (c = -1);
								} else
									for (n + u > a && (n = a - u), l = n; l >= 0; l--) {
										for (var h = !0, p = 0; u > p; p++)
											if (r(e, l + p) !== r(t, p)) {
												h = !1;
												break;
											}
										if (h) return l;
									}
								return -1;
							}
							function w(e, t, n, i) {
								n = Number(n) || 0;
								var o = e.length - n;
								i ? ((i = Number(i)), i > o && (i = o)) : (i = o);
								var r = t.length;
								if (r % 2 !== 0) throw new TypeError('Invalid hex string');
								i > r / 2 && (i = r / 2);
								for (var s = 0; i > s; ++s) {
									var a = parseInt(t.substr(2 * s, 2), 16);
									if (isNaN(a)) return s;
									e[n + s] = a;
								}
								return s;
							}
							function S(e, t, n, i) {
								return K(q(t, e.length - n), e, n, i);
							}
							function x(e, t, n, i) {
								return K(W(t), e, n, i);
							}
							function $(e, t, n, i) {
								return x(e, t, n, i);
							}
							function I(e, t, n, i) {
								return K(X(t), e, n, i);
							}
							function T(e, t, n, i) {
								return K(z(t, e.length - n), e, n, i);
							}
							function O(e, t, n) {
								return 0 === t && n === e.length
									? J.fromByteArray(e)
									: J.fromByteArray(e.slice(t, n));
							}
							function A(e, t, n) {
								n = Math.min(e.length, n);
								for (var i = [], o = t; n > o; ) {
									var r = e[o],
										s = null,
										a = r > 239 ? 4 : r > 223 ? 3 : r > 191 ? 2 : 1;
									if (n >= o + a) {
										var u, l, c, h;
										switch (a) {
											case 1:
												128 > r && (s = r);
												break;
											case 2:
												(u = e[o + 1]),
													128 === (192 & u) &&
														((h = ((31 & r) << 6) | (63 & u)), h > 127 && (s = h));
												break;
											case 3:
												(u = e[o + 1]),
													(l = e[o + 2]),
													128 === (192 & u) &&
														128 === (192 & l) &&
														((h = ((15 & r) << 12) | ((63 & u) << 6) | (63 & l)),
														h > 2047 && (55296 > h || h > 57343) && (s = h));
												break;
											case 4:
												(u = e[o + 1]),
													(l = e[o + 2]),
													(c = e[o + 3]),
													128 === (192 & u) &&
														128 === (192 & l) &&
														128 === (192 & c) &&
														((h = ((15 & r) << 18) | ((63 & u) << 12) | ((63 & l) << 6) | (63 & c)),
														h > 65535 && 1114112 > h && (s = h));
										}
									}
									null === s
										? ((s = 65533), (a = 1))
										: s > 65535 &&
										  ((s -= 65536), i.push(((s >>> 10) & 1023) | 55296), (s = 56320 | (1023 & s))),
										i.push(s),
										(o += a);
								}
								return C(i);
							}
							function C(e) {
								var t = e.length;
								if (ee >= t) return String.fromCharCode.apply(String, e);
								for (var n = '', i = 0; t > i; )
									n += String.fromCharCode.apply(String, e.slice(i, (i += ee)));
								return n;
							}
							function R(e, t, n) {
								var i = '';
								n = Math.min(e.length, n);
								for (var o = t; n > o; ++o) i += String.fromCharCode(127 & e[o]);
								return i;
							}
							function P(e, t, n) {
								var i = '';
								n = Math.min(e.length, n);
								for (var o = t; n > o; ++o) i += String.fromCharCode(e[o]);
								return i;
							}
							function D(e, t, n) {
								var i = e.length;
								(!t || 0 > t) && (t = 0), (!n || 0 > n || n > i) && (n = i);
								for (var o = '', r = t; n > r; ++r) o += G(e[r]);
								return o;
							}
							function B(e, t, n) {
								for (var i = e.slice(t, n), o = '', r = 0; r < i.length; r += 2)
									o += String.fromCharCode(i[r] + 256 * i[r + 1]);
								return o;
							}
							function N(e, t, n) {
								if (e % 1 !== 0 || 0 > e) throw new RangeError('offset is not uint');
								if (e + t > n) throw new RangeError('Trying to access beyond buffer length');
							}
							function L(e, t, n, i, o, r) {
								if (!s.isBuffer(e))
									throw new TypeError('"buffer" argument must be a Buffer instance');
								if (t > o || r > t) throw new RangeError('"value" argument is out of bounds');
								if (n + i > e.length) throw new RangeError('Index out of range');
							}
							function M(e, t, n, i) {
								0 > t && (t = 65535 + t + 1);
								for (var o = 0, r = Math.min(e.length - n, 2); r > o; ++o)
									e[n + o] = (t & (255 << (8 * (i ? o : 1 - o)))) >>> (8 * (i ? o : 1 - o));
							}
							function U(e, t, n, i) {
								0 > t && (t = 4294967295 + t + 1);
								for (var o = 0, r = Math.min(e.length - n, 4); r > o; ++o)
									e[n + o] = (t >>> (8 * (i ? o : 3 - o))) & 255;
							}
							function F(e, t, n, i, o, r) {
								if (n + i > e.length) throw new RangeError('Index out of range');
								if (0 > n) throw new RangeError('Index out of range');
							}
							function k(e, t, n, i, o) {
								return (
									o || F(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
									Z.write(e, t, n, i, 23, 4),
									n + 4
								);
							}
							function H(e, t, n, i, o) {
								return (
									o || F(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
									Z.write(e, t, n, i, 52, 8),
									n + 8
								);
							}
							function V(e) {
								if (((e = j(e).replace(te, '')), e.length < 2)) return '';
								for (; e.length % 4 !== 0; ) e += '=';
								return e;
							}
							function j(e) {
								return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
							}
							function G(e) {
								return 16 > e ? '0' + e.toString(16) : e.toString(16);
							}
							function q(e, t) {
								t = t || 1 / 0;
								for (var n, i = e.length, o = null, r = [], s = 0; i > s; ++s) {
									if (((n = e.charCodeAt(s)), n > 55295 && 57344 > n)) {
										if (!o) {
											if (n > 56319) {
												(t -= 3) > -1 && r.push(239, 191, 189);
												continue;
											}
											if (s + 1 === i) {
												(t -= 3) > -1 && r.push(239, 191, 189);
												continue;
											}
											o = n;
											continue;
										}
										if (56320 > n) {
											(t -= 3) > -1 && r.push(239, 191, 189), (o = n);
											continue;
										}
										n = (((o - 55296) << 10) | (n - 56320)) + 65536;
									} else o && (t -= 3) > -1 && r.push(239, 191, 189);
									if (((o = null), 128 > n)) {
										if ((t -= 1) < 0) break;
										r.push(n);
									} else if (2048 > n) {
										if ((t -= 2) < 0) break;
										r.push((n >> 6) | 192, (63 & n) | 128);
									} else if (65536 > n) {
										if ((t -= 3) < 0) break;
										r.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
									} else {
										if (!(1114112 > n)) throw new Error('Invalid code point');
										if ((t -= 4) < 0) break;
										r.push(
											(n >> 18) | 240,
											((n >> 12) & 63) | 128,
											((n >> 6) & 63) | 128,
											(63 & n) | 128
										);
									}
								}
								return r;
							}
							function W(e) {
								for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
								return t;
							}
							function z(e, t) {
								for (var n, i, o, r = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)
									(n = e.charCodeAt(s)), (i = n >> 8), (o = n % 256), r.push(o), r.push(i);
								return r;
							}
							function X(e) {
								return J.toByteArray(V(e));
							}
							function K(e, t, n, i) {
								for (var o = 0; i > o && !(o + n >= t.length || o >= e.length); ++o)
									t[o + n] = e[o];
								return o;
							}
							function Y(e) {
								return e !== e;
							}
							var J = e('base64-js'),
								Z = e('ieee754'),
								Q = e('isarray');
							(n.Buffer = s),
								(n.SlowBuffer = v),
								(n.INSPECT_MAX_BYTES = 50),
								(s.TYPED_ARRAY_SUPPORT =
									void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i()),
								(n.kMaxLength = o()),
								(s.poolSize = 8192),
								(s._augment = function (e) {
									return (e.__proto__ = s.prototype), e;
								}),
								(s.from = function (e, t, n) {
									return a(null, e, t, n);
								}),
								s.TYPED_ARRAY_SUPPORT &&
									((s.prototype.__proto__ = Uint8Array.prototype),
									(s.__proto__ = Uint8Array),
									'undefined' != typeof Symbol &&
										Symbol.species &&
										s[Symbol.species] === s &&
										Object.defineProperty(s, Symbol.species, { value: null, configurable: !0 })),
								(s.alloc = function (e, t, n) {
									return l(null, e, t, n);
								}),
								(s.allocUnsafe = function (e) {
									return c(null, e);
								}),
								(s.allocUnsafeSlow = function (e) {
									return c(null, e);
								}),
								(s.isBuffer = function (e) {
									return !(null == e || !e._isBuffer);
								}),
								(s.compare = function (e, t) {
									if (!s.isBuffer(e) || !s.isBuffer(t))
										throw new TypeError('Arguments must be Buffers');
									if (e === t) return 0;
									for (var n = e.length, i = t.length, o = 0, r = Math.min(n, i); r > o; ++o)
										if (e[o] !== t[o]) {
											(n = e[o]), (i = t[o]);
											break;
										}
									return i > n ? -1 : n > i ? 1 : 0;
								}),
								(s.isEncoding = function (e) {
									switch (String(e).toLowerCase()) {
										case 'hex':
										case 'utf8':
										case 'utf-8':
										case 'ascii':
										case 'latin1':
										case 'binary':
										case 'base64':
										case 'ucs2':
										case 'ucs-2':
										case 'utf16le':
										case 'utf-16le':
											return !0;
										default:
											return !1;
									}
								}),
								(s.concat = function (e, t) {
									if (!Q(e)) throw new TypeError('"list" argument must be an Array of Buffers');
									if (0 === e.length) return s.alloc(0);
									var n;
									if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
									var i = s.allocUnsafe(t),
										o = 0;
									for (n = 0; n < e.length; ++n) {
										var r = e[n];
										if (!s.isBuffer(r))
											throw new TypeError('"list" argument must be an Array of Buffers');
										r.copy(i, o), (o += r.length);
									}
									return i;
								}),
								(s.byteLength = m),
								(s.prototype._isBuffer = !0),
								(s.prototype.swap16 = function () {
									var e = this.length;
									if (e % 2 !== 0)
										throw new RangeError('Buffer size must be a multiple of 16-bits');
									for (var t = 0; e > t; t += 2) b(this, t, t + 1);
									return this;
								}),
								(s.prototype.swap32 = function () {
									var e = this.length;
									if (e % 4 !== 0)
										throw new RangeError('Buffer size must be a multiple of 32-bits');
									for (var t = 0; e > t; t += 4) b(this, t, t + 3), b(this, t + 1, t + 2);
									return this;
								}),
								(s.prototype.swap64 = function () {
									var e = this.length;
									if (e % 8 !== 0)
										throw new RangeError('Buffer size must be a multiple of 64-bits');
									for (var t = 0; e > t; t += 8)
										b(this, t, t + 7),
											b(this, t + 1, t + 6),
											b(this, t + 2, t + 5),
											b(this, t + 3, t + 4);
									return this;
								}),
								(s.prototype.toString = function () {
									var e = 0 | this.length;
									return 0 === e
										? ''
										: 0 === arguments.length
										? A(this, 0, e)
										: y.apply(this, arguments);
								}),
								(s.prototype.equals = function (e) {
									if (!s.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
									return this === e ? !0 : 0 === s.compare(this, e);
								}),
								(s.prototype.inspect = function () {
									var e = '',
										t = n.INSPECT_MAX_BYTES;
									return (
										this.length > 0 &&
											((e = this.toString('hex', 0, t).match(/.{2}/g).join(' ')),
											this.length > t && (e += ' ... ')),
										'<Buffer ' + e + '>'
									);
								}),
								(s.prototype.compare = function (e, t, n, i, o) {
									if (!s.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
									if (
										(void 0 === t && (t = 0),
										void 0 === n && (n = e ? e.length : 0),
										void 0 === i && (i = 0),
										void 0 === o && (o = this.length),
										0 > t || n > e.length || 0 > i || o > this.length)
									)
										throw new RangeError('out of range index');
									if (i >= o && t >= n) return 0;
									if (i >= o) return -1;
									if (t >= n) return 1;
									if (((t >>>= 0), (n >>>= 0), (i >>>= 0), (o >>>= 0), this === e)) return 0;
									for (
										var r = o - i,
											a = n - t,
											u = Math.min(r, a),
											l = this.slice(i, o),
											c = e.slice(t, n),
											h = 0;
										u > h;
										++h
									)
										if (l[h] !== c[h]) {
											(r = l[h]), (a = c[h]);
											break;
										}
									return a > r ? -1 : r > a ? 1 : 0;
								}),
								(s.prototype.includes = function (e, t, n) {
									return -1 !== this.indexOf(e, t, n);
								}),
								(s.prototype.indexOf = function (e, t, n) {
									return E(this, e, t, n, !0);
								}),
								(s.prototype.lastIndexOf = function (e, t, n) {
									return E(this, e, t, n, !1);
								}),
								(s.prototype.write = function (e, t, n, i) {
									if (void 0 === t) (i = 'utf8'), (n = this.length), (t = 0);
									else if (void 0 === n && 'string' == typeof t)
										(i = t), (n = this.length), (t = 0);
									else {
										if (!isFinite(t))
											throw new Error(
												'Buffer.write(string, encoding, offset[, length]) is no longer supported'
											);
										(t = 0 | t),
											isFinite(n)
												? ((n = 0 | n), void 0 === i && (i = 'utf8'))
												: ((i = n), (n = void 0));
									}
									var o = this.length - t;
									if (
										((void 0 === n || n > o) && (n = o),
										(e.length > 0 && (0 > n || 0 > t)) || t > this.length)
									)
										throw new RangeError('Attempt to write outside buffer bounds');
									i || (i = 'utf8');
									for (var r = !1; ; )
										switch (i) {
											case 'hex':
												return w(this, e, t, n);
											case 'utf8':
											case 'utf-8':
												return S(this, e, t, n);
											case 'ascii':
												return x(this, e, t, n);
											case 'latin1':
											case 'binary':
												return $(this, e, t, n);
											case 'base64':
												return I(this, e, t, n);
											case 'ucs2':
											case 'ucs-2':
											case 'utf16le':
											case 'utf-16le':
												return T(this, e, t, n);
											default:
												if (r) throw new TypeError('Unknown encoding: ' + i);
												(i = ('' + i).toLowerCase()), (r = !0);
										}
								}),
								(s.prototype.toJSON = function () {
									return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
								});
							var ee = 4096;
							(s.prototype.slice = function (e, t) {
								var n = this.length;
								(e = ~~e),
									(t = void 0 === t ? n : ~~t),
									0 > e ? ((e += n), 0 > e && (e = 0)) : e > n && (e = n),
									0 > t ? ((t += n), 0 > t && (t = 0)) : t > n && (t = n),
									e > t && (t = e);
								var i;
								if (s.TYPED_ARRAY_SUPPORT) (i = this.subarray(e, t)), (i.__proto__ = s.prototype);
								else {
									var o = t - e;
									i = new s(o, void 0);
									for (var r = 0; o > r; ++r) i[r] = this[r + e];
								}
								return i;
							}),
								(s.prototype.readUIntLE = function (e, t, n) {
									(e = 0 | e), (t = 0 | t), n || N(e, t, this.length);
									for (var i = this[e], o = 1, r = 0; ++r < t && (o *= 256); ) i += this[e + r] * o;
									return i;
								}),
								(s.prototype.readUIntBE = function (e, t, n) {
									(e = 0 | e), (t = 0 | t), n || N(e, t, this.length);
									for (var i = this[e + --t], o = 1; t > 0 && (o *= 256); ) i += this[e + --t] * o;
									return i;
								}),
								(s.prototype.readUInt8 = function (e, t) {
									return t || N(e, 1, this.length), this[e];
								}),
								(s.prototype.readUInt16LE = function (e, t) {
									return t || N(e, 2, this.length), this[e] | (this[e + 1] << 8);
								}),
								(s.prototype.readUInt16BE = function (e, t) {
									return t || N(e, 2, this.length), (this[e] << 8) | this[e + 1];
								}),
								(s.prototype.readUInt32LE = function (e, t) {
									return (
										t || N(e, 4, this.length),
										(this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + 16777216 * this[e + 3]
									);
								}),
								(s.prototype.readUInt32BE = function (e, t) {
									return (
										t || N(e, 4, this.length),
										16777216 * this[e] + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
									);
								}),
								(s.prototype.readIntLE = function (e, t, n) {
									(e = 0 | e), (t = 0 | t), n || N(e, t, this.length);
									for (var i = this[e], o = 1, r = 0; ++r < t && (o *= 256); ) i += this[e + r] * o;
									return (o *= 128), i >= o && (i -= Math.pow(2, 8 * t)), i;
								}),
								(s.prototype.readIntBE = function (e, t, n) {
									(e = 0 | e), (t = 0 | t), n || N(e, t, this.length);
									for (var i = t, o = 1, r = this[e + --i]; i > 0 && (o *= 256); )
										r += this[e + --i] * o;
									return (o *= 128), r >= o && (r -= Math.pow(2, 8 * t)), r;
								}),
								(s.prototype.readInt8 = function (e, t) {
									return (
										t || N(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
									);
								}),
								(s.prototype.readInt16LE = function (e, t) {
									t || N(e, 2, this.length);
									var n = this[e] | (this[e + 1] << 8);
									return 32768 & n ? 4294901760 | n : n;
								}),
								(s.prototype.readInt16BE = function (e, t) {
									t || N(e, 2, this.length);
									var n = this[e + 1] | (this[e] << 8);
									return 32768 & n ? 4294901760 | n : n;
								}),
								(s.prototype.readInt32LE = function (e, t) {
									return (
										t || N(e, 4, this.length),
										this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
									);
								}),
								(s.prototype.readInt32BE = function (e, t) {
									return (
										t || N(e, 4, this.length),
										(this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
									);
								}),
								(s.prototype.readFloatLE = function (e, t) {
									return t || N(e, 4, this.length), Z.read(this, e, !0, 23, 4);
								}),
								(s.prototype.readFloatBE = function (e, t) {
									return t || N(e, 4, this.length), Z.read(this, e, !1, 23, 4);
								}),
								(s.prototype.readDoubleLE = function (e, t) {
									return t || N(e, 8, this.length), Z.read(this, e, !0, 52, 8);
								}),
								(s.prototype.readDoubleBE = function (e, t) {
									return t || N(e, 8, this.length), Z.read(this, e, !1, 52, 8);
								}),
								(s.prototype.writeUIntLE = function (e, t, n, i) {
									if (((e = +e), (t = 0 | t), (n = 0 | n), !i)) {
										var o = Math.pow(2, 8 * n) - 1;
										L(this, e, t, n, o, 0);
									}
									var r = 1,
										s = 0;
									for (this[t] = 255 & e; ++s < n && (r *= 256); ) this[t + s] = (e / r) & 255;
									return t + n;
								}),
								(s.prototype.writeUIntBE = function (e, t, n, i) {
									if (((e = +e), (t = 0 | t), (n = 0 | n), !i)) {
										var o = Math.pow(2, 8 * n) - 1;
										L(this, e, t, n, o, 0);
									}
									var r = n - 1,
										s = 1;
									for (this[t + r] = 255 & e; --r >= 0 && (s *= 256); ) this[t + r] = (e / s) & 255;
									return t + n;
								}),
								(s.prototype.writeUInt8 = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 1, 255, 0),
										s.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
										(this[t] = 255 & e),
										t + 1
									);
								}),
								(s.prototype.writeUInt16LE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 2, 65535, 0),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
											: M(this, e, t, !0),
										t + 2
									);
								}),
								(s.prototype.writeUInt16BE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 2, 65535, 0),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
											: M(this, e, t, !1),
										t + 2
									);
								}),
								(s.prototype.writeUInt32LE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 4, 4294967295, 0),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t + 3] = e >>> 24),
											  (this[t + 2] = e >>> 16),
											  (this[t + 1] = e >>> 8),
											  (this[t] = 255 & e))
											: U(this, e, t, !0),
										t + 4
									);
								}),
								(s.prototype.writeUInt32BE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 4, 4294967295, 0),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t] = e >>> 24),
											  (this[t + 1] = e >>> 16),
											  (this[t + 2] = e >>> 8),
											  (this[t + 3] = 255 & e))
											: U(this, e, t, !1),
										t + 4
									);
								}),
								(s.prototype.writeIntLE = function (e, t, n, i) {
									if (((e = +e), (t = 0 | t), !i)) {
										var o = Math.pow(2, 8 * n - 1);
										L(this, e, t, n, o - 1, -o);
									}
									var r = 0,
										s = 1,
										a = 0;
									for (this[t] = 255 & e; ++r < n && (s *= 256); )
										0 > e && 0 === a && 0 !== this[t + r - 1] && (a = 1),
											(this[t + r] = (((e / s) >> 0) - a) & 255);
									return t + n;
								}),
								(s.prototype.writeIntBE = function (e, t, n, i) {
									if (((e = +e), (t = 0 | t), !i)) {
										var o = Math.pow(2, 8 * n - 1);
										L(this, e, t, n, o - 1, -o);
									}
									var r = n - 1,
										s = 1,
										a = 0;
									for (this[t + r] = 255 & e; --r >= 0 && (s *= 256); )
										0 > e && 0 === a && 0 !== this[t + r + 1] && (a = 1),
											(this[t + r] = (((e / s) >> 0) - a) & 255);
									return t + n;
								}),
								(s.prototype.writeInt8 = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 1, 127, -128),
										s.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
										0 > e && (e = 255 + e + 1),
										(this[t] = 255 & e),
										t + 1
									);
								}),
								(s.prototype.writeInt16LE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 2, 32767, -32768),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
											: M(this, e, t, !0),
										t + 2
									);
								}),
								(s.prototype.writeInt16BE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 2, 32767, -32768),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
											: M(this, e, t, !1),
										t + 2
									);
								}),
								(s.prototype.writeInt32LE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 4, 2147483647, -2147483648),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t] = 255 & e),
											  (this[t + 1] = e >>> 8),
											  (this[t + 2] = e >>> 16),
											  (this[t + 3] = e >>> 24))
											: U(this, e, t, !0),
										t + 4
									);
								}),
								(s.prototype.writeInt32BE = function (e, t, n) {
									return (
										(e = +e),
										(t = 0 | t),
										n || L(this, e, t, 4, 2147483647, -2147483648),
										0 > e && (e = 4294967295 + e + 1),
										s.TYPED_ARRAY_SUPPORT
											? ((this[t] = e >>> 24),
											  (this[t + 1] = e >>> 16),
											  (this[t + 2] = e >>> 8),
											  (this[t + 3] = 255 & e))
											: U(this, e, t, !1),
										t + 4
									);
								}),
								(s.prototype.writeFloatLE = function (e, t, n) {
									return k(this, e, t, !0, n);
								}),
								(s.prototype.writeFloatBE = function (e, t, n) {
									return k(this, e, t, !1, n);
								}),
								(s.prototype.writeDoubleLE = function (e, t, n) {
									return H(this, e, t, !0, n);
								}),
								(s.prototype.writeDoubleBE = function (e, t, n) {
									return H(this, e, t, !1, n);
								}),
								(s.prototype.copy = function (e, t, n, i) {
									if (
										(n || (n = 0),
										i || 0 === i || (i = this.length),
										t >= e.length && (t = e.length),
										t || (t = 0),
										i > 0 && n > i && (i = n),
										i === n)
									)
										return 0;
									if (0 === e.length || 0 === this.length) return 0;
									if (0 > t) throw new RangeError('targetStart out of bounds');
									if (0 > n || n >= this.length) throw new RangeError('sourceStart out of bounds');
									if (0 > i) throw new RangeError('sourceEnd out of bounds');
									i > this.length && (i = this.length),
										e.length - t < i - n && (i = e.length - t + n);
									var o,
										r = i - n;
									if (this === e && t > n && i > t)
										for (o = r - 1; o >= 0; --o) e[o + t] = this[o + n];
									else if (1e3 > r || !s.TYPED_ARRAY_SUPPORT)
										for (o = 0; r > o; ++o) e[o + t] = this[o + n];
									else Uint8Array.prototype.set.call(e, this.subarray(n, n + r), t);
									return r;
								}),
								(s.prototype.fill = function (e, t, n, i) {
									if ('string' == typeof e) {
										if (
											('string' == typeof t
												? ((i = t), (t = 0), (n = this.length))
												: 'string' == typeof n && ((i = n), (n = this.length)),
											1 === e.length)
										) {
											var o = e.charCodeAt(0);
											256 > o && (e = o);
										}
										if (void 0 !== i && 'string' != typeof i)
											throw new TypeError('encoding must be a string');
										if ('string' == typeof i && !s.isEncoding(i))
											throw new TypeError('Unknown encoding: ' + i);
									} else 'number' == typeof e && (e = 255 & e);
									if (0 > t || this.length < t || this.length < n)
										throw new RangeError('Out of range index');
									if (t >= n) return this;
									(t >>>= 0), (n = void 0 === n ? this.length : n >>> 0), e || (e = 0);
									var r;
									if ('number' == typeof e) for (r = t; n > r; ++r) this[r] = e;
									else {
										var a = s.isBuffer(e) ? e : q(new s(e, i).toString()),
											u = a.length;
										for (r = 0; n - t > r; ++r) this[r + t] = a[r % u];
									}
									return this;
								});
							var te = /[^+\/0-9A-Za-z-_]/g;
						}.call(
							this,
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{ 'base64-js': 2, ieee754: 9, isarray: 12 }
				],
				5: [
					function (e, t, n) {
						t.exports = {
							100: 'Continue',
							101: 'Switching Protocols',
							102: 'Processing',
							200: 'OK',
							201: 'Created',
							202: 'Accepted',
							203: 'Non-Authoritative Information',
							204: 'No Content',
							205: 'Reset Content',
							206: 'Partial Content',
							207: 'Multi-Status',
							208: 'Already Reported',
							226: 'IM Used',
							300: 'Multiple Choices',
							301: 'Moved Permanently',
							302: 'Found',
							303: 'See Other',
							304: 'Not Modified',
							305: 'Use Proxy',
							307: 'Temporary Redirect',
							308: 'Permanent Redirect',
							400: 'Bad Request',
							401: 'Unauthorized',
							402: 'Payment Required',
							403: 'Forbidden',
							404: 'Not Found',
							405: 'Method Not Allowed',
							406: 'Not Acceptable',
							407: 'Proxy Authentication Required',
							408: 'Request Timeout',
							409: 'Conflict',
							410: 'Gone',
							411: 'Length Required',
							412: 'Precondition Failed',
							413: 'Payload Too Large',
							414: 'URI Too Long',
							415: 'Unsupported Media Type',
							416: 'Range Not Satisfiable',
							417: 'Expectation Failed',
							418: "I'm a teapot",
							421: 'Misdirected Request',
							422: 'Unprocessable Entity',
							423: 'Locked',
							424: 'Failed Dependency',
							425: 'Unordered Collection',
							426: 'Upgrade Required',
							428: 'Precondition Required',
							429: 'Too Many Requests',
							431: 'Request Header Fields Too Large',
							451: 'Unavailable For Legal Reasons',
							500: 'Internal Server Error',
							501: 'Not Implemented',
							502: 'Bad Gateway',
							503: 'Service Unavailable',
							504: 'Gateway Timeout',
							505: 'HTTP Version Not Supported',
							506: 'Variant Also Negotiates',
							507: 'Insufficient Storage',
							508: 'Loop Detected',
							509: 'Bandwidth Limit Exceeded',
							510: 'Not Extended',
							511: 'Network Authentication Required'
						};
					},
					{}
				],
				6: [
					function (e, t, n) {
						(function (e) {
							function t(e) {
								return Array.isArray ? Array.isArray(e) : '[object Array]' === v(e);
							}
							function i(e) {
								return 'boolean' == typeof e;
							}
							function o(e) {
								return null === e;
							}
							function r(e) {
								return null == e;
							}
							function s(e) {
								return 'number' == typeof e;
							}
							function a(e) {
								return 'string' == typeof e;
							}
							function u(e) {
								return 'symbol' == typeof e;
							}
							function l(e) {
								return void 0 === e;
							}
							function c(e) {
								return '[object RegExp]' === v(e);
							}
							function h(e) {
								return 'object' == typeof e && null !== e;
							}
							function p(e) {
								return '[object Date]' === v(e);
							}
							function d(e) {
								return '[object Error]' === v(e) || e instanceof Error;
							}
							function f(e) {
								return 'function' == typeof e;
							}
							function g(e) {
								return (
									null === e ||
									'boolean' == typeof e ||
									'number' == typeof e ||
									'string' == typeof e ||
									'symbol' == typeof e ||
									'undefined' == typeof e
								);
							}
							function v(e) {
								return Object.prototype.toString.call(e);
							}
							(n.isArray = t),
								(n.isBoolean = i),
								(n.isNull = o),
								(n.isNullOrUndefined = r),
								(n.isNumber = s),
								(n.isString = a),
								(n.isSymbol = u),
								(n.isUndefined = l),
								(n.isRegExp = c),
								(n.isObject = h),
								(n.isDate = p),
								(n.isError = d),
								(n.isFunction = f),
								(n.isPrimitive = g),
								(n.isBuffer = e.isBuffer);
						}.call(this, { isBuffer: e('../../is-buffer/index.js') }));
					},
					{ '../../is-buffer/index.js': 11 }
				],
				7: [
					function (e, t, n) {
						function i() {
							(this._events = this._events || {}),
								(this._maxListeners = this._maxListeners || void 0);
						}
						function o(e) {
							return 'function' == typeof e;
						}
						function r(e) {
							return 'number' == typeof e;
						}
						function s(e) {
							return 'object' == typeof e && null !== e;
						}
						function a(e) {
							return void 0 === e;
						}
						(t.exports = i),
							(i.EventEmitter = i),
							(i.prototype._events = void 0),
							(i.prototype._maxListeners = void 0),
							(i.defaultMaxListeners = 10),
							(i.prototype.setMaxListeners = function (e) {
								if (!r(e) || 0 > e || isNaN(e)) throw TypeError('n must be a positive number');
								return (this._maxListeners = e), this;
							}),
							(i.prototype.emit = function (e) {
								var t, n, i, r, u, l;
								if (
									(this._events || (this._events = {}),
									'error' === e &&
										(!this._events.error || (s(this._events.error) && !this._events.error.length)))
								) {
									if (((t = arguments[1]), t instanceof Error)) throw t;
									var c = new Error('Uncaught, unspecified "error" event. (' + t + ')');
									throw ((c.context = t), c);
								}
								if (((n = this._events[e]), a(n))) return !1;
								if (o(n))
									switch (arguments.length) {
										case 1:
											n.call(this);
											break;
										case 2:
											n.call(this, arguments[1]);
											break;
										case 3:
											n.call(this, arguments[1], arguments[2]);
											break;
										default:
											(r = Array.prototype.slice.call(arguments, 1)), n.apply(this, r);
									}
								else if (s(n))
									for (
										r = Array.prototype.slice.call(arguments, 1),
											l = n.slice(),
											i = l.length,
											u = 0;
										i > u;
										u++
									)
										l[u].apply(this, r);
								return !0;
							}),
							(i.prototype.addListener = function (e, t) {
								var n;
								if (!o(t)) throw TypeError('listener must be a function');
								return (
									this._events || (this._events = {}),
									this._events.newListener &&
										this.emit('newListener', e, o(t.listener) ? t.listener : t),
									this._events[e]
										? s(this._events[e])
											? this._events[e].push(t)
											: (this._events[e] = [this._events[e], t])
										: (this._events[e] = t),
									s(this._events[e]) &&
										!this._events[e].warned &&
										((n = a(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners),
										n &&
											n > 0 &&
											this._events[e].length > n &&
											((this._events[e].warned = !0),
											console.error(
												'(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
												this._events[e].length
											),
											'function' == typeof console.trace && console.trace())),
									this
								);
							}),
							(i.prototype.on = i.prototype.addListener),
							(i.prototype.once = function (e, t) {
								function n() {
									this.removeListener(e, n), i || ((i = !0), t.apply(this, arguments));
								}
								if (!o(t)) throw TypeError('listener must be a function');
								var i = !1;
								return (n.listener = t), this.on(e, n), this;
							}),
							(i.prototype.removeListener = function (e, t) {
								var n, i, r, a;
								if (!o(t)) throw TypeError('listener must be a function');
								if (!this._events || !this._events[e]) return this;
								if (
									((n = this._events[e]),
									(r = n.length),
									(i = -1),
									n === t || (o(n.listener) && n.listener === t))
								)
									delete this._events[e],
										this._events.removeListener && this.emit('removeListener', e, t);
								else if (s(n)) {
									for (a = r; a-- > 0; )
										if (n[a] === t || (n[a].listener && n[a].listener === t)) {
											i = a;
											break;
										}
									if (0 > i) return this;
									1 === n.length ? ((n.length = 0), delete this._events[e]) : n.splice(i, 1),
										this._events.removeListener && this.emit('removeListener', e, t);
								}
								return this;
							}),
							(i.prototype.removeAllListeners = function (e) {
								var t, n;
								if (!this._events) return this;
								if (!this._events.removeListener)
									return (
										0 === arguments.length
											? (this._events = {})
											: this._events[e] && delete this._events[e],
										this
									);
								if (0 === arguments.length) {
									for (t in this._events) 'removeListener' !== t && this.removeAllListeners(t);
									return this.removeAllListeners('removeListener'), (this._events = {}), this;
								}
								if (((n = this._events[e]), o(n))) this.removeListener(e, n);
								else if (n) for (; n.length; ) this.removeListener(e, n[n.length - 1]);
								return delete this._events[e], this;
							}),
							(i.prototype.listeners = function (e) {
								var t;
								return (t =
									this._events && this._events[e]
										? o(this._events[e])
											? [this._events[e]]
											: this._events[e].slice()
										: []);
							}),
							(i.prototype.listenerCount = function (e) {
								if (this._events) {
									var t = this._events[e];
									if (o(t)) return 1;
									if (t) return t.length;
								}
								return 0;
							}),
							(i.listenerCount = function (e, t) {
								return e.listenerCount(t);
							});
					},
					{}
				],
				8: [
					function (e, t, n) {
						var i = e('http'),
							o = t.exports;
						for (var r in i) i.hasOwnProperty(r) && (o[r] = i[r]);
						o.request = function (e, t) {
							return (
								e || (e = {}),
								(e.scheme = 'https'),
								(e.protocol = 'https:'),
								i.request.call(this, e, t)
							);
						};
					},
					{ http: 30 }
				],
				9: [
					function (e, t, n) {
						(n.read = function (e, t, n, i, o) {
							var r,
								s,
								a = 8 * o - i - 1,
								u = (1 << a) - 1,
								l = u >> 1,
								c = -7,
								h = n ? o - 1 : 0,
								p = n ? -1 : 1,
								d = e[t + h];
							for (
								h += p, r = d & ((1 << -c) - 1), d >>= -c, c += a;
								c > 0;
								r = 256 * r + e[t + h], h += p, c -= 8
							);
							for (
								s = r & ((1 << -c) - 1), r >>= -c, c += i;
								c > 0;
								s = 256 * s + e[t + h], h += p, c -= 8
							);
							if (0 === r) r = 1 - l;
							else {
								if (r === u) return s ? NaN : (d ? -1 : 1) * (1 / 0);
								(s += Math.pow(2, i)), (r -= l);
							}
							return (d ? -1 : 1) * s * Math.pow(2, r - i);
						}),
							(n.write = function (e, t, n, i, o, r) {
								var s,
									a,
									u,
									l = 8 * r - o - 1,
									c = (1 << l) - 1,
									h = c >> 1,
									p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
									d = i ? 0 : r - 1,
									f = i ? 1 : -1,
									g = 0 > t || (0 === t && 0 > 1 / t) ? 1 : 0;
								for (
									t = Math.abs(t),
										isNaN(t) || t === 1 / 0
											? ((a = isNaN(t) ? 1 : 0), (s = c))
											: ((s = Math.floor(Math.log(t) / Math.LN2)),
											  t * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
											  (t += s + h >= 1 ? p / u : p * Math.pow(2, 1 - h)),
											  t * u >= 2 && (s++, (u /= 2)),
											  s + h >= c
													? ((a = 0), (s = c))
													: s + h >= 1
													? ((a = (t * u - 1) * Math.pow(2, o)), (s += h))
													: ((a = t * Math.pow(2, h - 1) * Math.pow(2, o)), (s = 0)));
									o >= 8;
									e[n + d] = 255 & a, d += f, a /= 256, o -= 8
								);
								for (s = (s << o) | a, l += o; l > 0; e[n + d] = 255 & s, d += f, s /= 256, l -= 8);
								e[n + d - f] |= 128 * g;
							});
					},
					{}
				],
				10: [
					function (e, t, n) {
						'function' == typeof Object.create
							? (t.exports = function (e, t) {
									(e.super_ = t),
										(e.prototype = Object.create(t.prototype, {
											constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
										}));
							  })
							: (t.exports = function (e, t) {
									e.super_ = t;
									var n = function () {};
									(n.prototype = t.prototype),
										(e.prototype = new n()),
										(e.prototype.constructor = e);
							  });
					},
					{}
				],
				11: [
					function (e, t, n) {
						function i(e) {
							return (
								!!e.constructor &&
								'function' == typeof e.constructor.isBuffer &&
								e.constructor.isBuffer(e)
							);
						}
						function o(e) {
							return (
								'function' == typeof e.readFloatLE &&
								'function' == typeof e.slice &&
								i(e.slice(0, 0))
							);
						}
						t.exports = function (e) {
							return null != e && (i(e) || o(e) || !!e._isBuffer);
						};
					},
					{}
				],
				12: [
					function (e, t, n) {
						var i = {}.toString;
						t.exports =
							Array.isArray ||
							function (e) {
								return '[object Array]' == i.call(e);
							};
					},
					{}
				],
				13: [
					function (e, t, n) {
						function i() {
							throw new Error('setTimeout has not been defined');
						}
						function o() {
							throw new Error('clearTimeout has not been defined');
						}
						function r(e) {
							if (h === setTimeout) return setTimeout(e, 0);
							if ((h === i || !h) && setTimeout) return (h = setTimeout), setTimeout(e, 0);
							try {
								return h(e, 0);
							} catch (t) {
								try {
									return h.call(null, e, 0);
								} catch (t) {
									return h.call(this, e, 0);
								}
							}
						}
						function s(e) {
							if (p === clearTimeout) return clearTimeout(e);
							if ((p === o || !p) && clearTimeout) return (p = clearTimeout), clearTimeout(e);
							try {
								return p(e);
							} catch (t) {
								try {
									return p.call(null, e);
								} catch (t) {
									return p.call(this, e);
								}
							}
						}
						function a() {
							v && f && ((v = !1), f.length ? (g = f.concat(g)) : (m = -1), g.length && u());
						}
						function u() {
							if (!v) {
								var e = r(a);
								v = !0;
								for (var t = g.length; t; ) {
									for (f = g, g = []; ++m < t; ) f && f[m].run();
									(m = -1), (t = g.length);
								}
								(f = null), (v = !1), s(e);
							}
						}
						function l(e, t) {
							(this.fun = e), (this.array = t);
						}
						function c() {}
						var h,
							p,
							d = (t.exports = {});
						!(function () {
							try {
								h = 'function' == typeof setTimeout ? setTimeout : i;
							} catch (e) {
								h = i;
							}
							try {
								p = 'function' == typeof clearTimeout ? clearTimeout : o;
							} catch (e) {
								p = o;
							}
						})();
						var f,
							g = [],
							v = !1,
							m = -1;
						(d.nextTick = function (e) {
							var t = new Array(arguments.length - 1);
							if (arguments.length > 1)
								for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
							g.push(new l(e, t)), 1 !== g.length || v || r(u);
						}),
							(l.prototype.run = function () {
								this.fun.apply(null, this.array);
							}),
							(d.title = 'browser'),
							(d.browser = !0),
							(d.env = {}),
							(d.argv = []),
							(d.version = ''),
							(d.versions = {}),
							(d.on = c),
							(d.addListener = c),
							(d.once = c),
							(d.off = c),
							(d.removeListener = c),
							(d.removeAllListeners = c),
							(d.emit = c),
							(d.prependListener = c),
							(d.prependOnceListener = c),
							(d.listeners = function (e) {
								return [];
							}),
							(d.binding = function (e) {
								throw new Error('process.binding is not supported');
							}),
							(d.cwd = function () {
								return '/';
							}),
							(d.chdir = function (e) {
								throw new Error('process.chdir is not supported');
							}),
							(d.umask = function () {
								return 0;
							});
					},
					{}
				],
				14: [
					function (t, n, i) {
						(function (t) {
							!(function (o) {
								function r(e) {
									throw new RangeError(B[e]);
								}
								function s(e, t) {
									for (var n = e.length, i = []; n--; ) i[n] = t(e[n]);
									return i;
								}
								function a(e, t) {
									var n = e.split('@'),
										i = '';
									n.length > 1 && ((i = n[0] + '@'), (e = n[1])), (e = e.replace(D, '.'));
									var o = e.split('.'),
										r = s(o, t).join('.');
									return i + r;
								}
								function u(e) {
									for (var t, n, i = [], o = 0, r = e.length; r > o; )
										(t = e.charCodeAt(o++)),
											t >= 55296 && 56319 >= t && r > o
												? ((n = e.charCodeAt(o++)),
												  56320 == (64512 & n)
														? i.push(((1023 & t) << 10) + (1023 & n) + 65536)
														: (i.push(t), o--))
												: i.push(t);
									return i;
								}
								function l(e) {
									return s(e, function (e) {
										var t = '';
										return (
											e > 65535 &&
												((e -= 65536),
												(t += M(((e >>> 10) & 1023) | 55296)),
												(e = 56320 | (1023 & e))),
											(t += M(e))
										);
									}).join('');
								}
								function c(e) {
									return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : S;
								}
								function h(e, t) {
									return e + 22 + 75 * (26 > e) - ((0 != t) << 5);
								}
								function p(e, t, n) {
									var i = 0;
									for (e = n ? L(e / T) : e >> 1, e += L(e / t); e > (N * $) >> 1; i += S)
										e = L(e / N);
									return L(i + ((N + 1) * e) / (e + I));
								}
								function d(e) {
									var t,
										n,
										i,
										o,
										s,
										a,
										u,
										h,
										d,
										f,
										g = [],
										v = e.length,
										m = 0,
										y = A,
										b = O;
									for (n = e.lastIndexOf(C), 0 > n && (n = 0), i = 0; n > i; ++i)
										e.charCodeAt(i) >= 128 && r('not-basic'), g.push(e.charCodeAt(i));
									for (o = n > 0 ? n + 1 : 0; v > o; ) {
										for (
											s = m, a = 1, u = S;
											o >= v && r('invalid-input'),
												(h = c(e.charCodeAt(o++))),
												(h >= S || h > L((w - m) / a)) && r('overflow'),
												(m += h * a),
												(d = b >= u ? x : u >= b + $ ? $ : u - b),
												!(d > h);
											u += S
										)
											(f = S - d), a > L(w / f) && r('overflow'), (a *= f);
										(t = g.length + 1),
											(b = p(m - s, t, 0 == s)),
											L(m / t) > w - y && r('overflow'),
											(y += L(m / t)),
											(m %= t),
											g.splice(m++, 0, y);
									}
									return l(g);
								}
								function f(e) {
									var t,
										n,
										i,
										o,
										s,
										a,
										l,
										c,
										d,
										f,
										g,
										v,
										m,
										y,
										b,
										E = [];
									for (e = u(e), v = e.length, t = A, n = 0, s = O, a = 0; v > a; ++a)
										(g = e[a]), 128 > g && E.push(M(g));
									for (i = o = E.length, o && E.push(C); v > i; ) {
										for (l = w, a = 0; v > a; ++a) (g = e[a]), g >= t && l > g && (l = g);
										for (
											m = i + 1,
												l - t > L((w - n) / m) && r('overflow'),
												n += (l - t) * m,
												t = l,
												a = 0;
											v > a;
											++a
										)
											if (((g = e[a]), t > g && ++n > w && r('overflow'), g == t)) {
												for (
													c = n, d = S;
													(f = s >= d ? x : d >= s + $ ? $ : d - s), !(f > c);
													d += S
												)
													(b = c - f), (y = S - f), E.push(M(h(f + (b % y), 0))), (c = L(b / y));
												E.push(M(h(c, 0))), (s = p(n, m, i == o)), (n = 0), ++i;
											}
										++n, ++t;
									}
									return E.join('');
								}
								function g(e) {
									return a(e, function (e) {
										return R.test(e) ? d(e.slice(4).toLowerCase()) : e;
									});
								}
								function v(e) {
									return a(e, function (e) {
										return P.test(e) ? 'xn--' + f(e) : e;
									});
								}
								var m = 'object' == typeof i && i && !i.nodeType && i,
									y = 'object' == typeof n && n && !n.nodeType && n,
									b = 'object' == typeof t && t;
								(b.global === b || b.window === b || b.self === b) && (o = b);
								var E,
									_,
									w = 2147483647,
									S = 36,
									x = 1,
									$ = 26,
									I = 38,
									T = 700,
									O = 72,
									A = 128,
									C = '-',
									R = /^xn--/,
									P = /[^\x20-\x7E]/,
									D = /[\x2E\u3002\uFF0E\uFF61]/g,
									B = {
										overflow: 'Overflow: input needs wider integers to process',
										'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
										'invalid-input': 'Invalid input'
									},
									N = S - x,
									L = Math.floor,
									M = String.fromCharCode;
								if (
									((E = {
										version: '1.4.1',
										ucs2: { decode: u, encode: l },
										decode: d,
										encode: f,
										toASCII: v,
										toUnicode: g
									}),
									'function' == typeof e && 'object' == typeof e.amd && e.amd)
								)
									e('punycode', function () {
										return E;
									});
								else if (m && y)
									if (n.exports == m) y.exports = E;
									else for (_ in E) E.hasOwnProperty(_) && (m[_] = E[_]);
								else o.punycode = E;
							})(this);
						}.call(
							this,
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{}
				],
				15: [
					function (e, t, n) {
						function i(e, t) {
							return Object.prototype.hasOwnProperty.call(e, t);
						}
						t.exports = function (e, t, n, r) {
							(t = t || '&'), (n = n || '=');
							var s = {};
							if ('string' != typeof e || 0 === e.length) return s;
							var a = /\+/g;
							e = e.split(t);
							var u = 1e3;
							r && 'number' == typeof r.maxKeys && (u = r.maxKeys);
							var l = e.length;
							u > 0 && l > u && (l = u);
							for (var c = 0; l > c; ++c) {
								var h,
									p,
									d,
									f,
									g = e[c].replace(a, '%20'),
									v = g.indexOf(n);
								v >= 0 ? ((h = g.substr(0, v)), (p = g.substr(v + 1))) : ((h = g), (p = '')),
									(d = decodeURIComponent(h)),
									(f = decodeURIComponent(p)),
									i(s, d) ? (o(s[d]) ? s[d].push(f) : (s[d] = [s[d], f])) : (s[d] = f);
							}
							return s;
						};
						var o =
							Array.isArray ||
							function (e) {
								return '[object Array]' === Object.prototype.toString.call(e);
							};
					},
					{}
				],
				16: [
					function (e, t, n) {
						function i(e, t) {
							if (e.map) return e.map(t);
							for (var n = [], i = 0; i < e.length; i++) n.push(t(e[i], i));
							return n;
						}
						var o = function (e) {
							switch (typeof e) {
								case 'string':
									return e;
								case 'boolean':
									return e ? 'true' : 'false';
								case 'number':
									return isFinite(e) ? e : '';
								default:
									return '';
							}
						};
						t.exports = function (e, t, n, a) {
							return (
								(t = t || '&'),
								(n = n || '='),
								null === e && (e = void 0),
								'object' == typeof e
									? i(s(e), function (s) {
											var a = encodeURIComponent(o(s)) + n;
											return r(e[s])
												? i(e[s], function (e) {
														return a + encodeURIComponent(o(e));
												  }).join(t)
												: a + encodeURIComponent(o(e[s]));
									  }).join(t)
									: a
									? encodeURIComponent(o(a)) + n + encodeURIComponent(o(e))
									: ''
							);
						};
						var r =
								Array.isArray ||
								function (e) {
									return '[object Array]' === Object.prototype.toString.call(e);
								},
							s =
								Object.keys ||
								function (e) {
									var t = [];
									for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
									return t;
								};
					},
					{}
				],
				17: [
					function (e, t, n) {
						'use strict';
						(n.decode = n.parse = e('./decode')), (n.encode = n.stringify = e('./encode'));
					},
					{ './decode': 15, './encode': 16 }
				],
				18: [
					function (e, t, n) {
						function i(e) {
							return this instanceof i
								? (l.call(this, e),
								  c.call(this, e),
								  e && e.readable === !1 && (this.readable = !1),
								  e && e.writable === !1 && (this.writable = !1),
								  (this.allowHalfOpen = !0),
								  e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1),
								  void this.once('end', o))
								: new i(e);
						}
						function o() {
							this.allowHalfOpen || this._writableState.ended || s.nextTick(r, this);
						}
						function r(e) {
							e.end();
						}
						var s = e('process-nextick-args'),
							a =
								Object.keys ||
								function (e) {
									var t = [];
									for (var n in e) t.push(n);
									return t;
								};
						t.exports = i;
						var u = e('core-util-is');
						u.inherits = e('inherits');
						var l = e('./_stream_readable'),
							c = e('./_stream_writable');
						u.inherits(i, l);
						for (var h = a(c.prototype), p = 0; p < h.length; p++) {
							var d = h[p];
							i.prototype[d] || (i.prototype[d] = c.prototype[d]);
						}
						Object.defineProperty(i.prototype, 'writableHighWaterMark', {
							enumerable: !1,
							get: function () {
								return this._writableState.highWaterMark;
							}
						}),
							Object.defineProperty(i.prototype, 'destroyed', {
								get: function () {
									return void 0 === this._readableState || void 0 === this._writableState
										? !1
										: this._readableState.destroyed && this._writableState.destroyed;
								},
								set: function (e) {
									void 0 !== this._readableState &&
										void 0 !== this._writableState &&
										((this._readableState.destroyed = e), (this._writableState.destroyed = e));
								}
							}),
							(i.prototype._destroy = function (e, t) {
								this.push(null), this.end(), s.nextTick(t, e);
							});
					},
					{
						'./_stream_readable': 20,
						'./_stream_writable': 22,
						'core-util-is': 6,
						inherits: 10,
						'process-nextick-args': 26
					}
				],
				19: [
					function (e, t, n) {
						function i(e) {
							return this instanceof i ? void o.call(this, e) : new i(e);
						}
						t.exports = i;
						var o = e('./_stream_transform'),
							r = e('core-util-is');
						(r.inherits = e('inherits')),
							r.inherits(i, o),
							(i.prototype._transform = function (e, t, n) {
								n(null, e);
							});
					},
					{ './_stream_transform': 21, 'core-util-is': 6, inherits: 10 }
				],
				20: [
					function (e, t, n) {
						(function (n, i) {
							function o(e) {
								return M.from(e);
							}
							function r(e) {
								return M.isBuffer(e) || e instanceof U;
							}
							function s(e, t, n) {
								return 'function' == typeof e.prependListener
									? e.prependListener(t, n)
									: void (e._events && e._events[t]
											? B(e._events[t])
												? e._events[t].unshift(n)
												: (e._events[t] = [n, e._events[t]])
											: e.on(t, n));
							}
							function a(t, n) {
								(D = D || e('./_stream_duplex')), (t = t || {});
								var i = n instanceof D;
								(this.objectMode = !!t.objectMode),
									i && (this.objectMode = this.objectMode || !!t.readableObjectMode);
								var o = t.highWaterMark,
									r = t.readableHighWaterMark,
									s = this.objectMode ? 16 : 16384;
								o || 0 === o
									? (this.highWaterMark = o)
									: i && (r || 0 === r)
									? (this.highWaterMark = r)
									: (this.highWaterMark = s),
									(this.highWaterMark = Math.floor(this.highWaterMark)),
									(this.buffer = new j()),
									(this.length = 0),
									(this.pipes = null),
									(this.pipesCount = 0),
									(this.flowing = null),
									(this.ended = !1),
									(this.endEmitted = !1),
									(this.reading = !1),
									(this.sync = !0),
									(this.needReadable = !1),
									(this.emittedReadable = !1),
									(this.readableListening = !1),
									(this.resumeScheduled = !1),
									(this.destroyed = !1),
									(this.defaultEncoding = t.defaultEncoding || 'utf8'),
									(this.awaitDrain = 0),
									(this.readingMore = !1),
									(this.decoder = null),
									(this.encoding = null),
									t.encoding &&
										(V || (V = e('string_decoder/').StringDecoder),
										(this.decoder = new V(t.encoding)),
										(this.encoding = t.encoding));
							}
							function u(t) {
								return (
									(D = D || e('./_stream_duplex')),
									this instanceof u
										? ((this._readableState = new a(t, this)),
										  (this.readable = !0),
										  t &&
												('function' == typeof t.read && (this._read = t.read),
												'function' == typeof t.destroy && (this._destroy = t.destroy)),
										  void L.call(this))
										: new u(t)
								);
							}
							function l(e, t, n, i, r) {
								var s = e._readableState;
								if (null === t) (s.reading = !1), g(e, s);
								else {
									var a;
									r || (a = h(s, t)),
										a
											? e.emit('error', a)
											: s.objectMode || (t && t.length > 0)
											? ('string' == typeof t ||
													s.objectMode ||
													Object.getPrototypeOf(t) === M.prototype ||
													(t = o(t)),
											  i
													? s.endEmitted
														? e.emit('error', new Error('stream.unshift() after end event'))
														: c(e, s, t, !0)
													: s.ended
													? e.emit('error', new Error('stream.push() after EOF'))
													: ((s.reading = !1),
													  s.decoder && !n
															? ((t = s.decoder.write(t)),
															  s.objectMode || 0 !== t.length ? c(e, s, t, !1) : y(e, s))
															: c(e, s, t, !1)))
											: i || (s.reading = !1);
								}
								return p(s);
							}
							function c(e, t, n, i) {
								t.flowing && 0 === t.length && !t.sync
									? (e.emit('data', n), e.read(0))
									: ((t.length += t.objectMode ? 1 : n.length),
									  i ? t.buffer.unshift(n) : t.buffer.push(n),
									  t.needReadable && v(e)),
									y(e, t);
							}
							function h(e, t) {
								var n;
								return (
									r(t) ||
										'string' == typeof t ||
										void 0 === t ||
										e.objectMode ||
										(n = new TypeError('Invalid non-string/buffer chunk')),
									n
								);
							}
							function p(e) {
								return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length);
							}
							function d(e) {
								return (
									e >= W
										? (e = W)
										: (e--,
										  (e |= e >>> 1),
										  (e |= e >>> 2),
										  (e |= e >>> 4),
										  (e |= e >>> 8),
										  (e |= e >>> 16),
										  e++),
									e
								);
							}
							function f(e, t) {
								return 0 >= e || (0 === t.length && t.ended)
									? 0
									: t.objectMode
									? 1
									: e !== e
									? t.flowing && t.length
										? t.buffer.head.data.length
										: t.length
									: (e > t.highWaterMark && (t.highWaterMark = d(e)),
									  e <= t.length ? e : t.ended ? t.length : ((t.needReadable = !0), 0));
							}
							function g(e, t) {
								if (!t.ended) {
									if (t.decoder) {
										var n = t.decoder.end();
										n && n.length && (t.buffer.push(n), (t.length += t.objectMode ? 1 : n.length));
									}
									(t.ended = !0), v(e);
								}
							}
							function v(e) {
								var t = e._readableState;
								(t.needReadable = !1),
									t.emittedReadable ||
										(H('emitReadable', t.flowing),
										(t.emittedReadable = !0),
										t.sync ? P.nextTick(m, e) : m(e));
							}
							function m(e) {
								H('emit readable'), e.emit('readable'), x(e);
							}
							function y(e, t) {
								t.readingMore || ((t.readingMore = !0), P.nextTick(b, e, t));
							}
							function b(e, t) {
								for (
									var n = t.length;
									!t.reading &&
									!t.flowing &&
									!t.ended &&
									t.length < t.highWaterMark &&
									(H('maybeReadMore read 0'), e.read(0), n !== t.length);

								)
									n = t.length;
								t.readingMore = !1;
							}
							function E(e) {
								return function () {
									var t = e._readableState;
									H('pipeOnDrain', t.awaitDrain),
										t.awaitDrain && t.awaitDrain--,
										0 === t.awaitDrain && N(e, 'data') && ((t.flowing = !0), x(e));
								};
							}
							function _(e) {
								H('readable nexttick read 0'), e.read(0);
							}
							function w(e, t) {
								t.resumeScheduled || ((t.resumeScheduled = !0), P.nextTick(S, e, t));
							}
							function S(e, t) {
								t.reading || (H('resume read 0'), e.read(0)),
									(t.resumeScheduled = !1),
									(t.awaitDrain = 0),
									e.emit('resume'),
									x(e),
									t.flowing && !t.reading && e.read(0);
							}
							function x(e) {
								var t = e._readableState;
								for (H('flow', t.flowing); t.flowing && null !== e.read(); );
							}
							function $(e, t) {
								if (0 === t.length) return null;
								var n;
								return (
									t.objectMode
										? (n = t.buffer.shift())
										: !e || e >= t.length
										? ((n = t.decoder
												? t.buffer.join('')
												: 1 === t.buffer.length
												? t.buffer.head.data
												: t.buffer.concat(t.length)),
										  t.buffer.clear())
										: (n = I(e, t.buffer, t.decoder)),
									n
								);
							}
							function I(e, t, n) {
								var i;
								return (
									e < t.head.data.length
										? ((i = t.head.data.slice(0, e)), (t.head.data = t.head.data.slice(e)))
										: (i = e === t.head.data.length ? t.shift() : n ? T(e, t) : O(e, t)),
									i
								);
							}
							function T(e, t) {
								var n = t.head,
									i = 1,
									o = n.data;
								for (e -= o.length; (n = n.next); ) {
									var r = n.data,
										s = e > r.length ? r.length : e;
									if (((o += s === r.length ? r : r.slice(0, e)), (e -= s), 0 === e)) {
										s === r.length
											? (++i, n.next ? (t.head = n.next) : (t.head = t.tail = null))
											: ((t.head = n), (n.data = r.slice(s)));
										break;
									}
									++i;
								}
								return (t.length -= i), o;
							}
							function O(e, t) {
								var n = M.allocUnsafe(e),
									i = t.head,
									o = 1;
								for (i.data.copy(n), e -= i.data.length; (i = i.next); ) {
									var r = i.data,
										s = e > r.length ? r.length : e;
									if ((r.copy(n, n.length - e, 0, s), (e -= s), 0 === e)) {
										s === r.length
											? (++o, i.next ? (t.head = i.next) : (t.head = t.tail = null))
											: ((t.head = i), (i.data = r.slice(s)));
										break;
									}
									++o;
								}
								return (t.length -= o), n;
							}
							function A(e) {
								var t = e._readableState;
								if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
								t.endEmitted || ((t.ended = !0), P.nextTick(C, t, e));
							}
							function C(e, t) {
								e.endEmitted ||
									0 !== e.length ||
									((e.endEmitted = !0), (t.readable = !1), t.emit('end'));
							}
							function R(e, t) {
								for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
								return -1;
							}
							var P = e('process-nextick-args');
							t.exports = u;
							var D,
								B = e('isarray');
							u.ReadableState = a;
							var N =
									(e('events').EventEmitter,
									function (e, t) {
										return e.listeners(t).length;
									}),
								L = e('./internal/streams/stream'),
								M = e('safe-buffer').Buffer,
								U = i.Uint8Array || function () {},
								F = e('core-util-is');
							F.inherits = e('inherits');
							var k = e('util'),
								H = void 0;
							H = k && k.debuglog ? k.debuglog('stream') : function () {};
							var V,
								j = e('./internal/streams/BufferList'),
								G = e('./internal/streams/destroy');
							F.inherits(u, L);
							var q = ['error', 'close', 'destroy', 'pause', 'resume'];
							Object.defineProperty(u.prototype, 'destroyed', {
								get: function () {
									return void 0 === this._readableState ? !1 : this._readableState.destroyed;
								},
								set: function (e) {
									this._readableState && (this._readableState.destroyed = e);
								}
							}),
								(u.prototype.destroy = G.destroy),
								(u.prototype._undestroy = G.undestroy),
								(u.prototype._destroy = function (e, t) {
									this.push(null), t(e);
								}),
								(u.prototype.push = function (e, t) {
									var n,
										i = this._readableState;
									return (
										i.objectMode
											? (n = !0)
											: 'string' == typeof e &&
											  ((t = t || i.defaultEncoding),
											  t !== i.encoding && ((e = M.from(e, t)), (t = '')),
											  (n = !0)),
										l(this, e, t, !1, n)
									);
								}),
								(u.prototype.unshift = function (e) {
									return l(this, e, null, !0, !1);
								}),
								(u.prototype.isPaused = function () {
									return this._readableState.flowing === !1;
								}),
								(u.prototype.setEncoding = function (t) {
									return (
										V || (V = e('string_decoder/').StringDecoder),
										(this._readableState.decoder = new V(t)),
										(this._readableState.encoding = t),
										this
									);
								});
							var W = 8388608;
							(u.prototype.read = function (e) {
								H('read', e), (e = parseInt(e, 10));
								var t = this._readableState,
									n = e;
								if (
									(0 !== e && (t.emittedReadable = !1),
									0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended))
								)
									return (
										H('read: emitReadable', t.length, t.ended),
										0 === t.length && t.ended ? A(this) : v(this),
										null
									);
								if (((e = f(e, t)), 0 === e && t.ended)) return 0 === t.length && A(this), null;
								var i = t.needReadable;
								H('need readable', i),
									(0 === t.length || t.length - e < t.highWaterMark) &&
										((i = !0), H('length less than watermark', i)),
									t.ended || t.reading
										? ((i = !1), H('reading or ended', i))
										: i &&
										  (H('do read'),
										  (t.reading = !0),
										  (t.sync = !0),
										  0 === t.length && (t.needReadable = !0),
										  this._read(t.highWaterMark),
										  (t.sync = !1),
										  t.reading || (e = f(n, t)));
								var o;
								return (
									(o = e > 0 ? $(e, t) : null),
									null === o ? ((t.needReadable = !0), (e = 0)) : (t.length -= e),
									0 === t.length &&
										(t.ended || (t.needReadable = !0), n !== e && t.ended && A(this)),
									null !== o && this.emit('data', o),
									o
								);
							}),
								(u.prototype._read = function (e) {
									this.emit('error', new Error('_read() is not implemented'));
								}),
								(u.prototype.pipe = function (e, t) {
									function i(e, t) {
										H('onunpipe'),
											e === p && t && t.hasUnpiped === !1 && ((t.hasUnpiped = !0), r());
									}
									function o() {
										H('onend'), e.end();
									}
									function r() {
										H('cleanup'),
											e.removeListener('close', l),
											e.removeListener('finish', c),
											e.removeListener('drain', v),
											e.removeListener('error', u),
											e.removeListener('unpipe', i),
											p.removeListener('end', o),
											p.removeListener('end', h),
											p.removeListener('data', a),
											(m = !0),
											!d.awaitDrain || (e._writableState && !e._writableState.needDrain) || v();
									}
									function a(t) {
										H('ondata'), (y = !1);
										var n = e.write(t);
										!1 !== n ||
											y ||
											(((1 === d.pipesCount && d.pipes === e) ||
												(d.pipesCount > 1 && -1 !== R(d.pipes, e))) &&
												!m &&
												(H('false write response, pause', p._readableState.awaitDrain),
												p._readableState.awaitDrain++,
												(y = !0)),
											p.pause());
									}
									function u(t) {
										H('onerror', t),
											h(),
											e.removeListener('error', u),
											0 === N(e, 'error') && e.emit('error', t);
									}
									function l() {
										e.removeListener('finish', c), h();
									}
									function c() {
										H('onfinish'), e.removeListener('close', l), h();
									}
									function h() {
										H('unpipe'), p.unpipe(e);
									}
									var p = this,
										d = this._readableState;
									switch (d.pipesCount) {
										case 0:
											d.pipes = e;
											break;
										case 1:
											d.pipes = [d.pipes, e];
											break;
										default:
											d.pipes.push(e);
									}
									(d.pipesCount += 1), H('pipe count=%d opts=%j', d.pipesCount, t);
									var f = (!t || t.end !== !1) && e !== n.stdout && e !== n.stderr,
										g = f ? o : h;
									d.endEmitted ? P.nextTick(g) : p.once('end', g), e.on('unpipe', i);
									var v = E(p);
									e.on('drain', v);
									var m = !1,
										y = !1;
									return (
										p.on('data', a),
										s(e, 'error', u),
										e.once('close', l),
										e.once('finish', c),
										e.emit('pipe', p),
										d.flowing || (H('pipe resume'), p.resume()),
										e
									);
								}),
								(u.prototype.unpipe = function (e) {
									var t = this._readableState,
										n = { hasUnpiped: !1 };
									if (0 === t.pipesCount) return this;
									if (1 === t.pipesCount)
										return e && e !== t.pipes
											? this
											: (e || (e = t.pipes),
											  (t.pipes = null),
											  (t.pipesCount = 0),
											  (t.flowing = !1),
											  e && e.emit('unpipe', this, n),
											  this);
									if (!e) {
										var i = t.pipes,
											o = t.pipesCount;
										(t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
										for (var r = 0; o > r; r++) i[r].emit('unpipe', this, n);
										return this;
									}
									var s = R(t.pipes, e);
									return -1 === s
										? this
										: (t.pipes.splice(s, 1),
										  (t.pipesCount -= 1),
										  1 === t.pipesCount && (t.pipes = t.pipes[0]),
										  e.emit('unpipe', this, n),
										  this);
								}),
								(u.prototype.on = function (e, t) {
									var n = L.prototype.on.call(this, e, t);
									if ('data' === e) this._readableState.flowing !== !1 && this.resume();
									else if ('readable' === e) {
										var i = this._readableState;
										i.endEmitted ||
											i.readableListening ||
											((i.readableListening = i.needReadable = !0),
											(i.emittedReadable = !1),
											i.reading ? i.length && v(this) : P.nextTick(_, this));
									}
									return n;
								}),
								(u.prototype.addListener = u.prototype.on),
								(u.prototype.resume = function () {
									var e = this._readableState;
									return e.flowing || (H('resume'), (e.flowing = !0), w(this, e)), this;
								}),
								(u.prototype.pause = function () {
									return (
										H('call pause flowing=%j', this._readableState.flowing),
										!1 !== this._readableState.flowing &&
											(H('pause'), (this._readableState.flowing = !1), this.emit('pause')),
										this
									);
								}),
								(u.prototype.wrap = function (e) {
									var t = this,
										n = this._readableState,
										i = !1;
									e.on('end', function () {
										if ((H('wrapped end'), n.decoder && !n.ended)) {
											var e = n.decoder.end();
											e && e.length && t.push(e);
										}
										t.push(null);
									}),
										e.on('data', function (o) {
											if (
												(H('wrapped data'),
												n.decoder && (o = n.decoder.write(o)),
												(!n.objectMode || (null !== o && void 0 !== o)) &&
													(n.objectMode || (o && o.length)))
											) {
												var r = t.push(o);
												r || ((i = !0), e.pause());
											}
										});
									for (var o in e)
										void 0 === this[o] &&
											'function' == typeof e[o] &&
											(this[o] = (function (t) {
												return function () {
													return e[t].apply(e, arguments);
												};
											})(o));
									for (var r = 0; r < q.length; r++) e.on(q[r], this.emit.bind(this, q[r]));
									return (
										(this._read = function (t) {
											H('wrapped _read', t), i && ((i = !1), e.resume());
										}),
										this
									);
								}),
								Object.defineProperty(u.prototype, 'readableHighWaterMark', {
									enumerable: !1,
									get: function () {
										return this._readableState.highWaterMark;
									}
								}),
								(u._fromList = $);
						}.call(
							this,
							e('_process'),
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{
						'./_stream_duplex': 18,
						'./internal/streams/BufferList': 23,
						'./internal/streams/destroy': 24,
						'./internal/streams/stream': 25,
						_process: 13,
						'core-util-is': 6,
						events: 7,
						inherits: 10,
						isarray: 12,
						'process-nextick-args': 26,
						'safe-buffer': 29,
						'string_decoder/': 27,
						util: 3
					}
				],
				21: [
					function (e, t, n) {
						function i(e, t) {
							var n = this._transformState;
							n.transforming = !1;
							var i = n.writecb;
							if (!i) return this.emit('error', new Error('write callback called multiple times'));
							(n.writechunk = null), (n.writecb = null), null != t && this.push(t), i(e);
							var o = this._readableState;
							(o.reading = !1),
								(o.needReadable || o.length < o.highWaterMark) && this._read(o.highWaterMark);
						}
						function o(e) {
							return this instanceof o
								? (a.call(this, e),
								  (this._transformState = {
										afterTransform: i.bind(this),
										needTransform: !1,
										transforming: !1,
										writecb: null,
										writechunk: null,
										writeencoding: null
								  }),
								  (this._readableState.needReadable = !0),
								  (this._readableState.sync = !1),
								  e &&
										('function' == typeof e.transform && (this._transform = e.transform),
										'function' == typeof e.flush && (this._flush = e.flush)),
								  void this.on('prefinish', r))
								: new o(e);
						}
						function r() {
							var e = this;
							'function' == typeof this._flush
								? this._flush(function (t, n) {
										s(e, t, n);
								  })
								: s(this, null, null);
						}
						function s(e, t, n) {
							if (t) return e.emit('error', t);
							if ((null != n && e.push(n), e._writableState.length))
								throw new Error('Calling transform done when ws.length != 0');
							if (e._transformState.transforming)
								throw new Error('Calling transform done when still transforming');
							return e.push(null);
						}
						t.exports = o;
						var a = e('./_stream_duplex'),
							u = e('core-util-is');
						(u.inherits = e('inherits')),
							u.inherits(o, a),
							(o.prototype.push = function (e, t) {
								return (this._transformState.needTransform = !1), a.prototype.push.call(this, e, t);
							}),
							(o.prototype._transform = function (e, t, n) {
								throw new Error('_transform() is not implemented');
							}),
							(o.prototype._write = function (e, t, n) {
								var i = this._transformState;
								if (((i.writecb = n), (i.writechunk = e), (i.writeencoding = t), !i.transforming)) {
									var o = this._readableState;
									(i.needTransform || o.needReadable || o.length < o.highWaterMark) &&
										this._read(o.highWaterMark);
								}
							}),
							(o.prototype._read = function (e) {
								var t = this._transformState;
								null !== t.writechunk && t.writecb && !t.transforming
									? ((t.transforming = !0),
									  this._transform(t.writechunk, t.writeencoding, t.afterTransform))
									: (t.needTransform = !0);
							}),
							(o.prototype._destroy = function (e, t) {
								var n = this;
								a.prototype._destroy.call(this, e, function (e) {
									t(e), n.emit('close');
								});
							});
					},
					{ './_stream_duplex': 18, 'core-util-is': 6, inherits: 10 }
				],
				22: [
					function (e, t, n) {
						(function (n, i, o) {
							function r(e) {
								var t = this;
								(this.next = null),
									(this.entry = null),
									(this.finish = function () {
										T(t, e);
									});
							}
							function s(e) {
								return B.from(e);
							}
							function a(e) {
								return B.isBuffer(e) || e instanceof N;
							}
							function u() {}
							function l(t, n) {
								(A = A || e('./_stream_duplex')), (t = t || {});
								var i = n instanceof A;
								(this.objectMode = !!t.objectMode),
									i && (this.objectMode = this.objectMode || !!t.writableObjectMode);
								var o = t.highWaterMark,
									s = t.writableHighWaterMark,
									a = this.objectMode ? 16 : 16384;
								o || 0 === o
									? (this.highWaterMark = o)
									: i && (s || 0 === s)
									? (this.highWaterMark = s)
									: (this.highWaterMark = a),
									(this.highWaterMark = Math.floor(this.highWaterMark)),
									(this.finalCalled = !1),
									(this.needDrain = !1),
									(this.ending = !1),
									(this.ended = !1),
									(this.finished = !1),
									(this.destroyed = !1);
								var u = t.decodeStrings === !1;
								(this.decodeStrings = !u),
									(this.defaultEncoding = t.defaultEncoding || 'utf8'),
									(this.length = 0),
									(this.writing = !1),
									(this.corked = 0),
									(this.sync = !0),
									(this.bufferProcessing = !1),
									(this.onwrite = function (e) {
										y(n, e);
									}),
									(this.writecb = null),
									(this.writelen = 0),
									(this.bufferedRequest = null),
									(this.lastBufferedRequest = null),
									(this.pendingcb = 0),
									(this.prefinished = !1),
									(this.errorEmitted = !1),
									(this.bufferedRequestCount = 0),
									(this.corkedRequestsFree = new r(this));
							}
							function c(t) {
								return (
									(A = A || e('./_stream_duplex')),
									M.call(c, this) || this instanceof A
										? ((this._writableState = new l(t, this)),
										  (this.writable = !0),
										  t &&
												('function' == typeof t.write && (this._write = t.write),
												'function' == typeof t.writev && (this._writev = t.writev),
												'function' == typeof t.destroy && (this._destroy = t.destroy),
												'function' == typeof t['final'] && (this._final = t['final'])),
										  void D.call(this))
										: new c(t)
								);
							}
							function h(e, t) {
								var n = new Error('write after end');
								e.emit('error', n), O.nextTick(t, n);
							}
							function p(e, t, n, i) {
								var o = !0,
									r = !1;
								return (
									null === n
										? (r = new TypeError('May not write null values to stream'))
										: 'string' == typeof n ||
										  void 0 === n ||
										  t.objectMode ||
										  (r = new TypeError('Invalid non-string/buffer chunk')),
									r && (e.emit('error', r), O.nextTick(i, r), (o = !1)),
									o
								);
							}
							function d(e, t, n) {
								return (
									e.objectMode ||
										e.decodeStrings === !1 ||
										'string' != typeof t ||
										(t = B.from(t, n)),
									t
								);
							}
							function f(e, t, n, i, o, r) {
								if (!n) {
									var s = d(t, i, o);
									i !== s && ((n = !0), (o = 'buffer'), (i = s));
								}
								var a = t.objectMode ? 1 : i.length;
								t.length += a;
								var u = t.length < t.highWaterMark;
								if ((u || (t.needDrain = !0), t.writing || t.corked)) {
									var l = t.lastBufferedRequest;
									(t.lastBufferedRequest = {
										chunk: i,
										encoding: o,
										isBuf: n,
										callback: r,
										next: null
									}),
										l
											? (l.next = t.lastBufferedRequest)
											: (t.bufferedRequest = t.lastBufferedRequest),
										(t.bufferedRequestCount += 1);
								} else g(e, t, !1, a, i, o, r);
								return u;
							}
							function g(e, t, n, i, o, r, s) {
								(t.writelen = i),
									(t.writecb = s),
									(t.writing = !0),
									(t.sync = !0),
									n ? e._writev(o, t.onwrite) : e._write(o, r, t.onwrite),
									(t.sync = !1);
							}
							function v(e, t, n, i, o) {
								--t.pendingcb,
									n
										? (O.nextTick(o, i),
										  O.nextTick($, e, t),
										  (e._writableState.errorEmitted = !0),
										  e.emit('error', i))
										: (o(i), (e._writableState.errorEmitted = !0), e.emit('error', i), $(e, t));
							}
							function m(e) {
								(e.writing = !1), (e.writecb = null), (e.length -= e.writelen), (e.writelen = 0);
							}
							function y(e, t) {
								var n = e._writableState,
									i = n.sync,
									o = n.writecb;
								if ((m(n), t)) v(e, n, i, t, o);
								else {
									var r = w(n);
									r || n.corked || n.bufferProcessing || !n.bufferedRequest || _(e, n),
										i ? C(b, e, n, r, o) : b(e, n, r, o);
								}
							}
							function b(e, t, n, i) {
								n || E(e, t), t.pendingcb--, i(), $(e, t);
							}
							function E(e, t) {
								0 === t.length && t.needDrain && ((t.needDrain = !1), e.emit('drain'));
							}
							function _(e, t) {
								t.bufferProcessing = !0;
								var n = t.bufferedRequest;
								if (e._writev && n && n.next) {
									var i = t.bufferedRequestCount,
										o = new Array(i),
										s = t.corkedRequestsFree;
									s.entry = n;
									for (var a = 0, u = !0; n; )
										(o[a] = n), n.isBuf || (u = !1), (n = n.next), (a += 1);
									(o.allBuffers = u),
										g(e, t, !0, t.length, o, '', s.finish),
										t.pendingcb++,
										(t.lastBufferedRequest = null),
										s.next
											? ((t.corkedRequestsFree = s.next), (s.next = null))
											: (t.corkedRequestsFree = new r(t)),
										(t.bufferedRequestCount = 0);
								} else {
									for (; n; ) {
										var l = n.chunk,
											c = n.encoding,
											h = n.callback,
											p = t.objectMode ? 1 : l.length;
										if (
											(g(e, t, !1, p, l, c, h), (n = n.next), t.bufferedRequestCount--, t.writing)
										)
											break;
									}
									null === n && (t.lastBufferedRequest = null);
								}
								(t.bufferedRequest = n), (t.bufferProcessing = !1);
							}
							function w(e) {
								return (
									e.ending &&
									0 === e.length &&
									null === e.bufferedRequest &&
									!e.finished &&
									!e.writing
								);
							}
							function S(e, t) {
								e._final(function (n) {
									t.pendingcb--,
										n && e.emit('error', n),
										(t.prefinished = !0),
										e.emit('prefinish'),
										$(e, t);
								});
							}
							function x(e, t) {
								t.prefinished ||
									t.finalCalled ||
									('function' == typeof e._final
										? (t.pendingcb++, (t.finalCalled = !0), O.nextTick(S, e, t))
										: ((t.prefinished = !0), e.emit('prefinish')));
							}
							function $(e, t) {
								var n = w(t);
								return (
									n && (x(e, t), 0 === t.pendingcb && ((t.finished = !0), e.emit('finish'))), n
								);
							}
							function I(e, t, n) {
								(t.ending = !0),
									$(e, t),
									n && (t.finished ? O.nextTick(n) : e.once('finish', n)),
									(t.ended = !0),
									(e.writable = !1);
							}
							function T(e, t, n) {
								var i = e.entry;
								for (e.entry = null; i; ) {
									var o = i.callback;
									t.pendingcb--, o(n), (i = i.next);
								}
								t.corkedRequestsFree ? (t.corkedRequestsFree.next = e) : (t.corkedRequestsFree = e);
							}
							var O = e('process-nextick-args');
							t.exports = c;
							var A,
								C =
									!n.browser && ['v0.10', 'v0.9.'].indexOf(n.version.slice(0, 5)) > -1
										? o
										: O.nextTick;
							c.WritableState = l;
							var R = e('core-util-is');
							R.inherits = e('inherits');
							var P = { deprecate: e('util-deprecate') },
								D = e('./internal/streams/stream'),
								B = e('safe-buffer').Buffer,
								N = i.Uint8Array || function () {},
								L = e('./internal/streams/destroy');
							R.inherits(c, D),
								(l.prototype.getBuffer = function () {
									for (var e = this.bufferedRequest, t = []; e; ) t.push(e), (e = e.next);
									return t;
								}),
								(function () {
									try {
										Object.defineProperty(l.prototype, 'buffer', {
											get: P.deprecate(
												function () {
													return this.getBuffer();
												},
												'_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
												'DEP0003'
											)
										});
									} catch (e) {}
								})();
							var M;
							'function' == typeof Symbol &&
							Symbol.hasInstance &&
							'function' == typeof Function.prototype[Symbol.hasInstance]
								? ((M = Function.prototype[Symbol.hasInstance]),
								  Object.defineProperty(c, Symbol.hasInstance, {
										value: function (e) {
											return M.call(this, e)
												? !0
												: this !== c
												? !1
												: e && e._writableState instanceof l;
										}
								  }))
								: (M = function (e) {
										return e instanceof this;
								  }),
								(c.prototype.pipe = function () {
									this.emit('error', new Error('Cannot pipe, not readable'));
								}),
								(c.prototype.write = function (e, t, n) {
									var i = this._writableState,
										o = !1,
										r = !i.objectMode && a(e);
									return (
										r && !B.isBuffer(e) && (e = s(e)),
										'function' == typeof t && ((n = t), (t = null)),
										r ? (t = 'buffer') : t || (t = i.defaultEncoding),
										'function' != typeof n && (n = u),
										i.ended
											? h(this, n)
											: (r || p(this, i, e, n)) && (i.pendingcb++, (o = f(this, i, r, e, t, n))),
										o
									);
								}),
								(c.prototype.cork = function () {
									var e = this._writableState;
									e.corked++;
								}),
								(c.prototype.uncork = function () {
									var e = this._writableState;
									e.corked &&
										(e.corked--,
										e.writing ||
											e.corked ||
											e.finished ||
											e.bufferProcessing ||
											!e.bufferedRequest ||
											_(this, e));
								}),
								(c.prototype.setDefaultEncoding = function (e) {
									if (
										('string' == typeof e && (e = e.toLowerCase()),
										!(
											[
												'hex',
												'utf8',
												'utf-8',
												'ascii',
												'binary',
												'base64',
												'ucs2',
												'ucs-2',
												'utf16le',
												'utf-16le',
												'raw'
											].indexOf((e + '').toLowerCase()) > -1
										))
									)
										throw new TypeError('Unknown encoding: ' + e);
									return (this._writableState.defaultEncoding = e), this;
								}),
								Object.defineProperty(c.prototype, 'writableHighWaterMark', {
									enumerable: !1,
									get: function () {
										return this._writableState.highWaterMark;
									}
								}),
								(c.prototype._write = function (e, t, n) {
									n(new Error('_write() is not implemented'));
								}),
								(c.prototype._writev = null),
								(c.prototype.end = function (e, t, n) {
									var i = this._writableState;
									'function' == typeof e
										? ((n = e), (e = null), (t = null))
										: 'function' == typeof t && ((n = t), (t = null)),
										null !== e && void 0 !== e && this.write(e, t),
										i.corked && ((i.corked = 1), this.uncork()),
										i.ending || i.finished || I(this, i, n);
								}),
								Object.defineProperty(c.prototype, 'destroyed', {
									get: function () {
										return void 0 === this._writableState ? !1 : this._writableState.destroyed;
									},
									set: function (e) {
										this._writableState && (this._writableState.destroyed = e);
									}
								}),
								(c.prototype.destroy = L.destroy),
								(c.prototype._undestroy = L.undestroy),
								(c.prototype._destroy = function (e, t) {
									this.end(), t(e);
								});
						}.call(
							this,
							e('_process'),
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {},
							e('timers').setImmediate
						));
					},
					{
						'./_stream_duplex': 18,
						'./internal/streams/destroy': 24,
						'./internal/streams/stream': 25,
						_process: 13,
						'core-util-is': 6,
						inherits: 10,
						'process-nextick-args': 26,
						'safe-buffer': 29,
						timers: 34,
						'util-deprecate': 38
					}
				],
				23: [
					function (e, t, n) {
						'use strict';
						function i(e, t) {
							if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
						}
						function o(e, t, n) {
							e.copy(t, n);
						}
						var r = e('safe-buffer').Buffer,
							s = e('util');
						(t.exports = (function () {
							function e() {
								i(this, e), (this.head = null), (this.tail = null), (this.length = 0);
							}
							return (
								(e.prototype.push = function (e) {
									var t = { data: e, next: null };
									this.length > 0 ? (this.tail.next = t) : (this.head = t),
										(this.tail = t),
										++this.length;
								}),
								(e.prototype.unshift = function (e) {
									var t = { data: e, next: this.head };
									0 === this.length && (this.tail = t), (this.head = t), ++this.length;
								}),
								(e.prototype.shift = function () {
									if (0 !== this.length) {
										var e = this.head.data;
										return (
											1 === this.length
												? (this.head = this.tail = null)
												: (this.head = this.head.next),
											--this.length,
											e
										);
									}
								}),
								(e.prototype.clear = function () {
									(this.head = this.tail = null), (this.length = 0);
								}),
								(e.prototype.join = function (e) {
									if (0 === this.length) return '';
									for (var t = this.head, n = '' + t.data; (t = t.next); ) n += e + t.data;
									return n;
								}),
								(e.prototype.concat = function (e) {
									if (0 === this.length) return r.alloc(0);
									if (1 === this.length) return this.head.data;
									for (var t = r.allocUnsafe(e >>> 0), n = this.head, i = 0; n; )
										o(n.data, t, i), (i += n.data.length), (n = n.next);
									return t;
								}),
								e
							);
						})()),
							s &&
								s.inspect &&
								s.inspect.custom &&
								(t.exports.prototype[s.inspect.custom] = function () {
									var e = s.inspect({ length: this.length });
									return this.constructor.name + ' ' + e;
								});
					},
					{ 'safe-buffer': 29, util: 3 }
				],
				24: [
					function (e, t, n) {
						'use strict';
						function i(e, t) {
							var n = this,
								i = this._readableState && this._readableState.destroyed,
								o = this._writableState && this._writableState.destroyed;
							return i || o
								? (t
										? t(e)
										: !e ||
										  (this._writableState && this._writableState.errorEmitted) ||
										  s.nextTick(r, this, e),
								  this)
								: (this._readableState && (this._readableState.destroyed = !0),
								  this._writableState && (this._writableState.destroyed = !0),
								  this._destroy(e || null, function (e) {
										!t && e
											? (s.nextTick(r, n, e),
											  n._writableState && (n._writableState.errorEmitted = !0))
											: t && t(e);
								  }),
								  this);
						}
						function o() {
							this._readableState &&
								((this._readableState.destroyed = !1),
								(this._readableState.reading = !1),
								(this._readableState.ended = !1),
								(this._readableState.endEmitted = !1)),
								this._writableState &&
									((this._writableState.destroyed = !1),
									(this._writableState.ended = !1),
									(this._writableState.ending = !1),
									(this._writableState.finished = !1),
									(this._writableState.errorEmitted = !1));
						}
						function r(e, t) {
							e.emit('error', t);
						}
						var s = e('process-nextick-args');
						t.exports = { destroy: i, undestroy: o };
					},
					{ 'process-nextick-args': 26 }
				],
				25: [
					function (e, t, n) {
						t.exports = e('events').EventEmitter;
					},
					{ events: 7 }
				],
				26: [
					function (e, t, n) {
						(function (e) {
							'use strict';
							function n(t, n, i, o) {
								if ('function' != typeof t)
									throw new TypeError('"callback" argument must be a function');
								var r,
									s,
									a = arguments.length;
								switch (a) {
									case 0:
									case 1:
										return e.nextTick(t);
									case 2:
										return e.nextTick(function () {
											t.call(null, n);
										});
									case 3:
										return e.nextTick(function () {
											t.call(null, n, i);
										});
									case 4:
										return e.nextTick(function () {
											t.call(null, n, i, o);
										});
									default:
										for (r = new Array(a - 1), s = 0; s < r.length; ) r[s++] = arguments[s];
										return e.nextTick(function () {
											t.apply(null, r);
										});
								}
							}
							!e.version ||
							0 === e.version.indexOf('v0.') ||
							(0 === e.version.indexOf('v1.') && 0 !== e.version.indexOf('v1.8.'))
								? (t.exports = { nextTick: n })
								: (t.exports = e);
						}.call(this, e('_process')));
					},
					{ _process: 13 }
				],
				27: [
					function (e, t, n) {
						function i(e) {
							if (!e) return 'utf8';
							for (var t; ; )
								switch (e) {
									case 'utf8':
									case 'utf-8':
										return 'utf8';
									case 'ucs2':
									case 'ucs-2':
									case 'utf16le':
									case 'utf-16le':
										return 'utf16le';
									case 'latin1':
									case 'binary':
										return 'latin1';
									case 'base64':
									case 'ascii':
									case 'hex':
										return e;
									default:
										if (t) return;
										(e = ('' + e).toLowerCase()), (t = !0);
								}
						}
						function o(e) {
							var t = i(e);
							if ('string' != typeof t && (y.isEncoding === b || !b(e)))
								throw new Error('Unknown encoding: ' + e);
							return t || e;
						}
						function r(e) {
							this.encoding = o(e);
							var t;
							switch (this.encoding) {
								case 'utf16le':
									(this.text = p), (this.end = d), (t = 4);
									break;
								case 'utf8':
									(this.fillLast = l), (t = 4);
									break;
								case 'base64':
									(this.text = f), (this.end = g), (t = 3);
									break;
								default:
									return (this.write = v), void (this.end = m);
							}
							(this.lastNeed = 0), (this.lastTotal = 0), (this.lastChar = y.allocUnsafe(t));
						}
						function s(e) {
							return 127 >= e
								? 0
								: e >> 5 === 6
								? 2
								: e >> 4 === 14
								? 3
								: e >> 3 === 30
								? 4
								: e >> 6 === 2
								? -1
								: -2;
						}
						function a(e, t, n) {
							var i = t.length - 1;
							if (n > i) return 0;
							var o = s(t[i]);
							return o >= 0
								? (o > 0 && (e.lastNeed = o - 1), o)
								: --i < n || -2 === o
								? 0
								: ((o = s(t[i])),
								  o >= 0
										? (o > 0 && (e.lastNeed = o - 2), o)
										: --i < n || -2 === o
										? 0
										: ((o = s(t[i])),
										  o >= 0 ? (o > 0 && (2 === o ? (o = 0) : (e.lastNeed = o - 3)), o) : 0));
						}
						function u(e, t, n) {
							if (128 !== (192 & t[0])) return (e.lastNeed = 0), '�';
							if (e.lastNeed > 1 && t.length > 1) {
								if (128 !== (192 & t[1])) return (e.lastNeed = 1), '�';
								if (e.lastNeed > 2 && t.length > 2 && 128 !== (192 & t[2]))
									return (e.lastNeed = 2), '�';
							}
						}
						function l(e) {
							var t = this.lastTotal - this.lastNeed,
								n = u(this, e, t);
							return void 0 !== n
								? n
								: this.lastNeed <= e.length
								? (e.copy(this.lastChar, t, 0, this.lastNeed),
								  this.lastChar.toString(this.encoding, 0, this.lastTotal))
								: (e.copy(this.lastChar, t, 0, e.length), void (this.lastNeed -= e.length));
						}
						function c(e, t) {
							var n = a(this, e, t);
							if (!this.lastNeed) return e.toString('utf8', t);
							this.lastTotal = n;
							var i = e.length - (n - this.lastNeed);
							return e.copy(this.lastChar, 0, i), e.toString('utf8', t, i);
						}
						function h(e) {
							var t = e && e.length ? this.write(e) : '';
							return this.lastNeed ? t + '�' : t;
						}
						function p(e, t) {
							if ((e.length - t) % 2 === 0) {
								var n = e.toString('utf16le', t);
								if (n) {
									var i = n.charCodeAt(n.length - 1);
									if (i >= 55296 && 56319 >= i)
										return (
											(this.lastNeed = 2),
											(this.lastTotal = 4),
											(this.lastChar[0] = e[e.length - 2]),
											(this.lastChar[1] = e[e.length - 1]),
											n.slice(0, -1)
										);
								}
								return n;
							}
							return (
								(this.lastNeed = 1),
								(this.lastTotal = 2),
								(this.lastChar[0] = e[e.length - 1]),
								e.toString('utf16le', t, e.length - 1)
							);
						}
						function d(e) {
							var t = e && e.length ? this.write(e) : '';
							if (this.lastNeed) {
								var n = this.lastTotal - this.lastNeed;
								return t + this.lastChar.toString('utf16le', 0, n);
							}
							return t;
						}
						function f(e, t) {
							var n = (e.length - t) % 3;
							return 0 === n
								? e.toString('base64', t)
								: ((this.lastNeed = 3 - n),
								  (this.lastTotal = 3),
								  1 === n
										? (this.lastChar[0] = e[e.length - 1])
										: ((this.lastChar[0] = e[e.length - 2]), (this.lastChar[1] = e[e.length - 1])),
								  e.toString('base64', t, e.length - n));
						}
						function g(e) {
							var t = e && e.length ? this.write(e) : '';
							return this.lastNeed ? t + this.lastChar.toString('base64', 0, 3 - this.lastNeed) : t;
						}
						function v(e) {
							return e.toString(this.encoding);
						}
						function m(e) {
							return e && e.length ? this.write(e) : '';
						}
						var y = e('safe-buffer').Buffer,
							b =
								y.isEncoding ||
								function (e) {
									switch (((e = '' + e), e && e.toLowerCase())) {
										case 'hex':
										case 'utf8':
										case 'utf-8':
										case 'ascii':
										case 'binary':
										case 'base64':
										case 'ucs2':
										case 'ucs-2':
										case 'utf16le':
										case 'utf-16le':
										case 'raw':
											return !0;
										default:
											return !1;
									}
								};
						(n.StringDecoder = r),
							(r.prototype.write = function (e) {
								if (0 === e.length) return '';
								var t, n;
								if (this.lastNeed) {
									if (((t = this.fillLast(e)), void 0 === t)) return '';
									(n = this.lastNeed), (this.lastNeed = 0);
								} else n = 0;
								return n < e.length ? (t ? t + this.text(e, n) : this.text(e, n)) : t || '';
							}),
							(r.prototype.end = h),
							(r.prototype.text = c),
							(r.prototype.fillLast = function (e) {
								return this.lastNeed <= e.length
									? (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
									  this.lastChar.toString(this.encoding, 0, this.lastTotal))
									: (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
									  void (this.lastNeed -= e.length));
							});
					},
					{ 'safe-buffer': 29 }
				],
				28: [
					function (e, t, n) {
						(n = t.exports = e('./lib/_stream_readable.js')),
							(n.Stream = n),
							(n.Readable = n),
							(n.Writable = e('./lib/_stream_writable.js')),
							(n.Duplex = e('./lib/_stream_duplex.js')),
							(n.Transform = e('./lib/_stream_transform.js')),
							(n.PassThrough = e('./lib/_stream_passthrough.js'));
					},
					{
						'./lib/_stream_duplex.js': 18,
						'./lib/_stream_passthrough.js': 19,
						'./lib/_stream_readable.js': 20,
						'./lib/_stream_transform.js': 21,
						'./lib/_stream_writable.js': 22
					}
				],
				29: [
					function (e, t, n) {
						function i(e, t) {
							for (var n in e) t[n] = e[n];
						}
						function o(e, t, n) {
							return s(e, t, n);
						}
						var r = e('buffer'),
							s = r.Buffer;
						s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow
							? (t.exports = r)
							: (i(r, n), (n.Buffer = o)),
							i(s, o),
							(o.from = function (e, t, n) {
								if ('number' == typeof e) throw new TypeError('Argument must not be a number');
								return s(e, t, n);
							}),
							(o.alloc = function (e, t, n) {
								if ('number' != typeof e) throw new TypeError('Argument must be a number');
								var i = s(e);
								return (
									void 0 !== t ? ('string' == typeof n ? i.fill(t, n) : i.fill(t)) : i.fill(0), i
								);
							}),
							(o.allocUnsafe = function (e) {
								if ('number' != typeof e) throw new TypeError('Argument must be a number');
								return s(e);
							}),
							(o.allocUnsafeSlow = function (e) {
								if ('number' != typeof e) throw new TypeError('Argument must be a number');
								return r.SlowBuffer(e);
							});
					},
					{ buffer: 4 }
				],
				30: [
					function (e, t, n) {
						(function (t) {
							var i = e('./lib/request'),
								o = e('./lib/response'),
								r = e('xtend'),
								s = e('builtin-status-codes'),
								a = e('url'),
								u = n;
							(u.request = function (e, n) {
								e = 'string' == typeof e ? a.parse(e) : r(e);
								var o = -1 === t.location.protocol.search(/^https?:$/) ? 'http:' : '',
									s = e.protocol || o,
									u = e.hostname || e.host,
									l = e.port,
									c = e.path || '/';
								u && -1 !== u.indexOf(':') && (u = '[' + u + ']'),
									(e.url = (u ? s + '//' + u : '') + (l ? ':' + l : '') + c),
									(e.method = (e.method || 'GET').toUpperCase()),
									(e.headers = e.headers || {});
								var h = new i(e);
								return n && h.on('response', n), h;
							}),
								(u.get = function (e, t) {
									var n = u.request(e, t);
									return n.end(), n;
								}),
								(u.ClientRequest = i),
								(u.IncomingMessage = o.IncomingMessage),
								(u.Agent = function () {}),
								(u.Agent.defaultMaxSockets = 4),
								(u.globalAgent = new u.Agent()),
								(u.STATUS_CODES = s),
								(u.METHODS = [
									'CHECKOUT',
									'CONNECT',
									'COPY',
									'DELETE',
									'GET',
									'HEAD',
									'LOCK',
									'M-SEARCH',
									'MERGE',
									'MKACTIVITY',
									'MKCOL',
									'MOVE',
									'NOTIFY',
									'OPTIONS',
									'PATCH',
									'POST',
									'PROPFIND',
									'PROPPATCH',
									'PURGE',
									'PUT',
									'REPORT',
									'SEARCH',
									'SUBSCRIBE',
									'TRACE',
									'UNLOCK',
									'UNSUBSCRIBE'
								]);
						}.call(
							this,
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{
						'./lib/request': 32,
						'./lib/response': 33,
						'builtin-status-codes': 5,
						url: 36,
						xtend: 39
					}
				],
				31: [
					function (e, t, n) {
						(function (e) {
							function t() {
								if (void 0 !== s) return s;
								if (e.XMLHttpRequest) {
									s = new e.XMLHttpRequest();
									try {
										s.open('GET', e.XDomainRequest ? '/' : 'https://example.com');
									} catch (t) {
										s = null;
									}
								} else s = null;
								return s;
							}
							function i(e) {
								var n = t();
								if (!n) return !1;
								try {
									return (n.responseType = e), n.responseType === e;
								} catch (i) {}
								return !1;
							}
							function o(e) {
								return 'function' == typeof e;
							}
							(n.fetch = o(e.fetch) && o(e.ReadableStream)),
								(n.writableStream = o(e.WritableStream)),
								(n.abortController = o(e.AbortController)),
								(n.blobConstructor = !1);
							try {
								new Blob([new ArrayBuffer(1)]), (n.blobConstructor = !0);
							} catch (r) {}
							var s,
								a = 'undefined' != typeof e.ArrayBuffer,
								u = a && o(e.ArrayBuffer.prototype.slice);
							(n.arraybuffer = n.fetch || (a && i('arraybuffer'))),
								(n.msstream = !n.fetch && u && i('ms-stream')),
								(n.mozchunkedarraybuffer = !n.fetch && a && i('moz-chunked-arraybuffer')),
								(n.overrideMimeType = n.fetch || (t() ? o(t().overrideMimeType) : !1)),
								(n.vbArray = o(e.VBArray)),
								(s = null);
						}.call(
							this,
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{}
				],
				32: [
					function (e, t, n) {
						(function (n, i, o) {
							function r(e, t) {
								return a.fetch && t
									? 'fetch'
									: a.mozchunkedarraybuffer
									? 'moz-chunked-arraybuffer'
									: a.msstream
									? 'ms-stream'
									: a.arraybuffer && e
									? 'arraybuffer'
									: a.vbArray && e
									? 'text:vbarray'
									: 'text';
							}
							function s(e) {
								try {
									var t = e.status;
									return null !== t && 0 !== t;
								} catch (n) {
									return !1;
								}
							}
							var a = e('./capability'),
								u = e('inherits'),
								l = e('./response'),
								c = e('readable-stream'),
								h = e('to-arraybuffer'),
								p = l.IncomingMessage,
								d = l.readyStates,
								f = (t.exports = function (e) {
									var t = this;
									c.Writable.call(t),
										(t._opts = e),
										(t._body = []),
										(t._headers = {}),
										e.auth &&
											t.setHeader('Authorization', 'Basic ' + new o(e.auth).toString('base64')),
										Object.keys(e.headers).forEach(function (n) {
											t.setHeader(n, e.headers[n]);
										});
									var n,
										i = !0;
									if ('disable-fetch' === e.mode || ('requestTimeout' in e && !a.abortController))
										(i = !1), (n = !0);
									else if ('prefer-streaming' === e.mode) n = !1;
									else if ('allow-wrong-content-type' === e.mode) n = !a.overrideMimeType;
									else {
										if (e.mode && 'default' !== e.mode && 'prefer-fast' !== e.mode)
											throw new Error('Invalid value for opts.mode');
										n = !0;
									}
									(t._mode = r(n, i)),
										(t._fetchTimer = null),
										t.on('finish', function () {
											t._onFinish();
										});
								});
							u(f, c.Writable),
								(f.prototype.setHeader = function (e, t) {
									var n = this,
										i = e.toLowerCase();
									-1 === g.indexOf(i) && (n._headers[i] = { name: e, value: t });
								}),
								(f.prototype.getHeader = function (e) {
									var t = this._headers[e.toLowerCase()];
									return t ? t.value : null;
								}),
								(f.prototype.removeHeader = function (e) {
									var t = this;
									delete t._headers[e.toLowerCase()];
								}),
								(f.prototype._onFinish = function () {
									var e = this;
									if (!e._destroyed) {
										var t = e._opts,
											r = e._headers,
											s = null;
										'GET' !== t.method &&
											'HEAD' !== t.method &&
											(s = a.arraybuffer
												? h(o.concat(e._body))
												: a.blobConstructor
												? new i.Blob(
														e._body.map(function (e) {
															return h(e);
														}),
														{ type: (r['content-type'] || {}).value || '' }
												  )
												: o.concat(e._body).toString());
										var u = [];
										if (
											(Object.keys(r).forEach(function (e) {
												var t = r[e].name,
													n = r[e].value;
												Array.isArray(n)
													? n.forEach(function (e) {
															u.push([t, e]);
													  })
													: u.push([t, n]);
											}),
											'fetch' === e._mode)
										) {
											var l = null;
											if (a.abortController) {
												var c = new AbortController();
												(l = c.signal),
													(e._fetchAbortController = c),
													'requestTimeout' in t &&
														0 !== t.requestTimeout &&
														(e._fetchTimer = i.setTimeout(function () {
															e.emit('requestTimeout'),
																e._fetchAbortController && e._fetchAbortController.abort();
														}, t.requestTimeout));
											}
											i.fetch(e._opts.url, {
												method: e._opts.method,
												headers: u,
												body: s || void 0,
												mode: 'cors',
												credentials: t.withCredentials ? 'include' : 'same-origin',
												signal: l
											}).then(
												function (t) {
													(e._fetchResponse = t), e._connect();
												},
												function (t) {
													i.clearTimeout(e._fetchTimer), e._destroyed || e.emit('error', t);
												}
											);
										} else {
											var p = (e._xhr = new i.XMLHttpRequest());
											try {
												p.open(e._opts.method, e._opts.url, !0);
											} catch (f) {
												return void n.nextTick(function () {
													e.emit('error', f);
												});
											}
											'responseType' in p && (p.responseType = e._mode.split(':')[0]),
												'withCredentials' in p && (p.withCredentials = !!t.withCredentials),
												'text' === e._mode &&
													'overrideMimeType' in p &&
													p.overrideMimeType('text/plain; charset=x-user-defined'),
												'requestTimeout' in t &&
													((p.timeout = t.requestTimeout),
													(p.ontimeout = function () {
														e.emit('requestTimeout');
													})),
												u.forEach(function (e) {
													p.setRequestHeader(e[0], e[1]);
												}),
												(e._response = null),
												(p.onreadystatechange = function () {
													switch (p.readyState) {
														case d.LOADING:
														case d.DONE:
															e._onXHRProgress();
													}
												}),
												'moz-chunked-arraybuffer' === e._mode &&
													(p.onprogress = function () {
														e._onXHRProgress();
													}),
												(p.onerror = function () {
													e._destroyed || e.emit('error', new Error('XHR error'));
												});
											try {
												p.send(s);
											} catch (f) {
												return void n.nextTick(function () {
													e.emit('error', f);
												});
											}
										}
									}
								}),
								(f.prototype._onXHRProgress = function () {
									var e = this;
									s(e._xhr) &&
										!e._destroyed &&
										(e._response || e._connect(), e._response._onXHRProgress());
								}),
								(f.prototype._connect = function () {
									var e = this;
									e._destroyed ||
										((e._response = new p(e._xhr, e._fetchResponse, e._mode, e._fetchTimer)),
										e._response.on('error', function (t) {
											e.emit('error', t);
										}),
										e.emit('response', e._response));
								}),
								(f.prototype._write = function (e, t, n) {
									var i = this;
									i._body.push(e), n();
								}),
								(f.prototype.abort = f.prototype.destroy =
									function () {
										var e = this;
										(e._destroyed = !0),
											i.clearTimeout(e._fetchTimer),
											e._response && (e._response._destroyed = !0),
											e._xhr
												? e._xhr.abort()
												: e._fetchAbortController && e._fetchAbortController.abort();
									}),
								(f.prototype.end = function (e, t, n) {
									var i = this;
									'function' == typeof e && ((n = e), (e = void 0)),
										c.Writable.prototype.end.call(i, e, t, n);
								}),
								(f.prototype.flushHeaders = function () {}),
								(f.prototype.setTimeout = function () {}),
								(f.prototype.setNoDelay = function () {}),
								(f.prototype.setSocketKeepAlive = function () {});
							var g = [
								'accept-charset',
								'accept-encoding',
								'access-control-request-headers',
								'access-control-request-method',
								'connection',
								'content-length',
								'cookie',
								'cookie2',
								'date',
								'dnt',
								'expect',
								'host',
								'keep-alive',
								'origin',
								'referer',
								'te',
								'trailer',
								'transfer-encoding',
								'upgrade',
								'via'
							];
						}.call(
							this,
							e('_process'),
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {},
							e('buffer').Buffer
						));
					},
					{
						'./capability': 31,
						'./response': 33,
						_process: 13,
						buffer: 4,
						inherits: 10,
						'readable-stream': 28,
						'to-arraybuffer': 35
					}
				],
				33: [
					function (e, t, n) {
						(function (t, i, o) {
							var r = e('./capability'),
								s = e('inherits'),
								a = e('readable-stream'),
								u = (n.readyStates = {
									UNSENT: 0,
									OPENED: 1,
									HEADERS_RECEIVED: 2,
									LOADING: 3,
									DONE: 4
								}),
								l = (n.IncomingMessage = function (e, n, s, u) {
									function l() {
										d.read()
											.then(function (e) {
												if (!c._destroyed) {
													if (e.done) return i.clearTimeout(u), void c.push(null);
													c.push(new o(e.value)), l();
												}
											})
											['catch'](function (e) {
												i.clearTimeout(u), c._destroyed || c.emit('error', e);
											});
									}
									var c = this;
									if (
										(a.Readable.call(c),
										(c._mode = s),
										(c.headers = {}),
										(c.rawHeaders = []),
										(c.trailers = {}),
										(c.rawTrailers = []),
										c.on('end', function () {
											t.nextTick(function () {
												c.emit('close');
											});
										}),
										'fetch' === s)
									) {
										if (
											((c._fetchResponse = n),
											(c.url = n.url),
											(c.statusCode = n.status),
											(c.statusMessage = n.statusText),
											n.headers.forEach(function (e, t) {
												(c.headers[t.toLowerCase()] = e), c.rawHeaders.push(t, e);
											}),
											r.writableStream)
										) {
											var h = new WritableStream({
												write: function (e) {
													return new Promise(function (t, n) {
														c._destroyed ? n() : c.push(new o(e)) ? t() : (c._resumeFetch = t);
													});
												},
												close: function () {
													i.clearTimeout(u), c._destroyed || c.push(null);
												},
												abort: function (e) {
													c._destroyed || c.emit('error', e);
												}
											});
											try {
												return void n.body.pipeTo(h)['catch'](function (e) {
													i.clearTimeout(u), c._destroyed || c.emit('error', e);
												});
											} catch (p) {}
										}
										var d = n.body.getReader();
										l();
									} else {
										(c._xhr = e),
											(c._pos = 0),
											(c.url = e.responseURL),
											(c.statusCode = e.status),
											(c.statusMessage = e.statusText);
										var f = e.getAllResponseHeaders().split(/\r?\n/);
										if (
											(f.forEach(function (e) {
												var t = e.match(/^([^:]+):\s*(.*)/);
												if (t) {
													var n = t[1].toLowerCase();
													'set-cookie' === n
														? (void 0 === c.headers[n] && (c.headers[n] = []),
														  c.headers[n].push(t[2]))
														: void 0 !== c.headers[n]
														? (c.headers[n] += ', ' + t[2])
														: (c.headers[n] = t[2]),
														c.rawHeaders.push(t[1], t[2]);
												}
											}),
											(c._charset = 'x-user-defined'),
											!r.overrideMimeType)
										) {
											var g = c.rawHeaders['mime-type'];
											if (g) {
												var v = g.match(/;\s*charset=([^;])(;|$)/);
												v && (c._charset = v[1].toLowerCase());
											}
											c._charset || (c._charset = 'utf-8');
										}
									}
								});
							s(l, a.Readable),
								(l.prototype._read = function () {
									var e = this,
										t = e._resumeFetch;
									t && ((e._resumeFetch = null), t());
								}),
								(l.prototype._onXHRProgress = function () {
									var e = this,
										t = e._xhr,
										n = null;
									switch (e._mode) {
										case 'text:vbarray':
											if (t.readyState !== u.DONE) break;
											try {
												n = new i.VBArray(t.responseBody).toArray();
											} catch (r) {}
											if (null !== n) {
												e.push(new o(n));
												break;
											}
										case 'text':
											try {
												n = t.responseText;
											} catch (r) {
												e._mode = 'text:vbarray';
												break;
											}
											if (n.length > e._pos) {
												var s = n.substr(e._pos);
												if ('x-user-defined' === e._charset) {
													for (var a = new o(s.length), l = 0; l < s.length; l++)
														a[l] = 255 & s.charCodeAt(l);
													e.push(a);
												} else e.push(s, e._charset);
												e._pos = n.length;
											}
											break;
										case 'arraybuffer':
											if (t.readyState !== u.DONE || !t.response) break;
											(n = t.response), e.push(new o(new Uint8Array(n)));
											break;
										case 'moz-chunked-arraybuffer':
											if (((n = t.response), t.readyState !== u.LOADING || !n)) break;
											e.push(new o(new Uint8Array(n)));
											break;
										case 'ms-stream':
											if (((n = t.response), t.readyState !== u.LOADING)) break;
											var c = new i.MSStreamReader();
											(c.onprogress = function () {
												c.result.byteLength > e._pos &&
													(e.push(new o(new Uint8Array(c.result.slice(e._pos)))),
													(e._pos = c.result.byteLength));
											}),
												(c.onload = function () {
													e.push(null);
												}),
												c.readAsArrayBuffer(n);
									}
									e._xhr.readyState === u.DONE && 'ms-stream' !== e._mode && e.push(null);
								});
						}.call(
							this,
							e('_process'),
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {},
							e('buffer').Buffer
						));
					},
					{ './capability': 31, _process: 13, buffer: 4, inherits: 10, 'readable-stream': 28 }
				],
				34: [
					function (e, t, n) {
						(function (t, i) {
							function o(e, t) {
								(this._id = e), (this._clearFn = t);
							}
							var r = e('process/browser.js').nextTick,
								s = Function.prototype.apply,
								a = Array.prototype.slice,
								u = {},
								l = 0;
							(n.setTimeout = function () {
								return new o(s.call(setTimeout, window, arguments), clearTimeout);
							}),
								(n.setInterval = function () {
									return new o(s.call(setInterval, window, arguments), clearInterval);
								}),
								(n.clearTimeout = n.clearInterval =
									function (e) {
										e.close();
									}),
								(o.prototype.unref = o.prototype.ref = function () {}),
								(o.prototype.close = function () {
									this._clearFn.call(window, this._id);
								}),
								(n.enroll = function (e, t) {
									clearTimeout(e._idleTimeoutId), (e._idleTimeout = t);
								}),
								(n.unenroll = function (e) {
									clearTimeout(e._idleTimeoutId), (e._idleTimeout = -1);
								}),
								(n._unrefActive = n.active =
									function (e) {
										clearTimeout(e._idleTimeoutId);
										var t = e._idleTimeout;
										t >= 0 &&
											(e._idleTimeoutId = setTimeout(function () {
												e._onTimeout && e._onTimeout();
											}, t));
									}),
								(n.setImmediate =
									'function' == typeof t
										? t
										: function (e) {
												var t = l++,
													i = arguments.length < 2 ? !1 : a.call(arguments, 1);
												return (
													(u[t] = !0),
													r(function () {
														u[t] && (i ? e.apply(null, i) : e.call(null), n.clearImmediate(t));
													}),
													t
												);
										  }),
								(n.clearImmediate =
									'function' == typeof i
										? i
										: function (e) {
												delete u[e];
										  });
						}.call(this, e('timers').setImmediate, e('timers').clearImmediate));
					},
					{ 'process/browser.js': 13, timers: 34 }
				],
				35: [
					function (e, t, n) {
						var i = e('buffer').Buffer;
						t.exports = function (e) {
							if (e instanceof Uint8Array) {
								if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength) return e.buffer;
								if ('function' == typeof e.buffer.slice)
									return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
							}
							if (i.isBuffer(e)) {
								for (var t = new Uint8Array(e.length), n = e.length, o = 0; n > o; o++) t[o] = e[o];
								return t.buffer;
							}
							throw new Error('Argument must be a Buffer');
						};
					},
					{ buffer: 4 }
				],
				36: [
					function (e, t, n) {
						function i() {
							(this.protocol = null),
								(this.slashes = null),
								(this.auth = null),
								(this.host = null),
								(this.port = null),
								(this.hostname = null),
								(this.hash = null),
								(this.search = null),
								(this.query = null),
								(this.pathname = null),
								(this.path = null),
								(this.href = null);
						}
						function o(e, t, n) {
							if (e && l.isObject(e) && e instanceof i) return e;
							var o = new i();
							return o.parse(e, t, n), o;
						}
						function r(e) {
							return (
								l.isString(e) && (e = o(e)),
								e instanceof i ? e.format() : i.prototype.format.call(e)
							);
						}
						function s(e, t) {
							return o(e, !1, !0).resolve(t);
						}
						function a(e, t) {
							return e ? o(e, !1, !0).resolveObject(t) : t;
						}
						var u = e('punycode'),
							l = e('./util');
						(n.parse = o), (n.resolve = s), (n.resolveObject = a), (n.format = r), (n.Url = i);
						var c = /^([a-z0-9.+-]+:)/i,
							h = /:[0-9]*$/,
							p = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
							d = ['<', '>', '"', '`', ' ', '\r', '\n', '	'],
							f = ['{', '}', '|', '\\', '^', '`'].concat(d),
							g = ["'"].concat(f),
							v = ['%', '/', '?', ';', '#'].concat(g),
							m = ['/', '?', '#'],
							y = 255,
							b = /^[+a-z0-9A-Z_-]{0,63}$/,
							E = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
							_ = { javascript: !0, 'javascript:': !0 },
							w = { javascript: !0, 'javascript:': !0 },
							S = {
								http: !0,
								https: !0,
								ftp: !0,
								gopher: !0,
								file: !0,
								'http:': !0,
								'https:': !0,
								'ftp:': !0,
								'gopher:': !0,
								'file:': !0
							},
							x = e('querystring');
						(i.prototype.parse = function (e, t, n) {
							if (!l.isString(e))
								throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
							var i = e.indexOf('?'),
								o = -1 !== i && i < e.indexOf('#') ? '?' : '#',
								r = e.split(o),
								s = /\\/g;
							(r[0] = r[0].replace(s, '/')), (e = r.join(o));
							var a = e;
							if (((a = a.trim()), !n && 1 === e.split('#').length)) {
								var h = p.exec(a);
								if (h)
									return (
										(this.path = a),
										(this.href = a),
										(this.pathname = h[1]),
										h[2]
											? ((this.search = h[2]),
											  t
													? (this.query = x.parse(this.search.substr(1)))
													: (this.query = this.search.substr(1)))
											: t && ((this.search = ''), (this.query = {})),
										this
									);
							}
							var d = c.exec(a);
							if (d) {
								d = d[0];
								var f = d.toLowerCase();
								(this.protocol = f), (a = a.substr(d.length));
							}
							if (n || d || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
								var $ = '//' === a.substr(0, 2);
								!$ || (d && w[d]) || ((a = a.substr(2)), (this.slashes = !0));
							}
							if (!w[d] && ($ || (d && !S[d]))) {
								for (var I = -1, T = 0; T < m.length; T++) {
									var O = a.indexOf(m[T]);
									-1 !== O && (-1 === I || I > O) && (I = O);
								}
								var A, C;
								(C = -1 === I ? a.lastIndexOf('@') : a.lastIndexOf('@', I)),
									-1 !== C &&
										((A = a.slice(0, C)),
										(a = a.slice(C + 1)),
										(this.auth = decodeURIComponent(A))),
									(I = -1);
								for (var T = 0; T < v.length; T++) {
									var O = a.indexOf(v[T]);
									-1 !== O && (-1 === I || I > O) && (I = O);
								}
								-1 === I && (I = a.length),
									(this.host = a.slice(0, I)),
									(a = a.slice(I)),
									this.parseHost(),
									(this.hostname = this.hostname || '');
								var R = '[' === this.hostname[0] && ']' === this.hostname[this.hostname.length - 1];
								if (!R)
									for (var P = this.hostname.split(/\./), T = 0, D = P.length; D > T; T++) {
										var B = P[T];
										if (B && !B.match(b)) {
											for (var N = '', L = 0, M = B.length; M > L; L++)
												N += B.charCodeAt(L) > 127 ? 'x' : B[L];
											if (!N.match(b)) {
												var U = P.slice(0, T),
													F = P.slice(T + 1),
													k = B.match(E);
												k && (U.push(k[1]), F.unshift(k[2])),
													F.length && (a = '/' + F.join('.') + a),
													(this.hostname = U.join('.'));
												break;
											}
										}
									}
								this.hostname.length > y
									? (this.hostname = '')
									: (this.hostname = this.hostname.toLowerCase()),
									R || (this.hostname = u.toASCII(this.hostname));
								var H = this.port ? ':' + this.port : '',
									V = this.hostname || '';
								(this.host = V + H),
									(this.href += this.host),
									R &&
										((this.hostname = this.hostname.substr(1, this.hostname.length - 2)),
										'/' !== a[0] && (a = '/' + a));
							}
							if (!_[f])
								for (var T = 0, D = g.length; D > T; T++) {
									var j = g[T];
									if (-1 !== a.indexOf(j)) {
										var G = encodeURIComponent(j);
										G === j && (G = escape(j)), (a = a.split(j).join(G));
									}
								}
							var q = a.indexOf('#');
							-1 !== q && ((this.hash = a.substr(q)), (a = a.slice(0, q)));
							var W = a.indexOf('?');
							if (
								(-1 !== W
									? ((this.search = a.substr(W)),
									  (this.query = a.substr(W + 1)),
									  t && (this.query = x.parse(this.query)),
									  (a = a.slice(0, W)))
									: t && ((this.search = ''), (this.query = {})),
								a && (this.pathname = a),
								S[f] && this.hostname && !this.pathname && (this.pathname = '/'),
								this.pathname || this.search)
							) {
								var H = this.pathname || '',
									z = this.search || '';
								this.path = H + z;
							}
							return (this.href = this.format()), this;
						}),
							(i.prototype.format = function () {
								var e = this.auth || '';
								e && ((e = encodeURIComponent(e)), (e = e.replace(/%3A/i, ':')), (e += '@'));
								var t = this.protocol || '',
									n = this.pathname || '',
									i = this.hash || '',
									o = !1,
									r = '';
								this.host
									? (o = e + this.host)
									: this.hostname &&
									  ((o =
											e +
											(-1 === this.hostname.indexOf(':')
												? this.hostname
												: '[' + this.hostname + ']')),
									  this.port && (o += ':' + this.port)),
									this.query &&
										l.isObject(this.query) &&
										Object.keys(this.query).length &&
										(r = x.stringify(this.query));
								var s = this.search || (r && '?' + r) || '';
								return (
									t && ':' !== t.substr(-1) && (t += ':'),
									this.slashes || ((!t || S[t]) && o !== !1)
										? ((o = '//' + (o || '')), n && '/' !== n.charAt(0) && (n = '/' + n))
										: o || (o = ''),
									i && '#' !== i.charAt(0) && (i = '#' + i),
									s && '?' !== s.charAt(0) && (s = '?' + s),
									(n = n.replace(/[?#]/g, function (e) {
										return encodeURIComponent(e);
									})),
									(s = s.replace('#', '%23')),
									t + o + n + s + i
								);
							}),
							(i.prototype.resolve = function (e) {
								return this.resolveObject(o(e, !1, !0)).format();
							}),
							(i.prototype.resolveObject = function (e) {
								if (l.isString(e)) {
									var t = new i();
									t.parse(e, !1, !0), (e = t);
								}
								for (var n = new i(), o = Object.keys(this), r = 0; r < o.length; r++) {
									var s = o[r];
									n[s] = this[s];
								}
								if (((n.hash = e.hash), '' === e.href)) return (n.href = n.format()), n;
								if (e.slashes && !e.protocol) {
									for (var a = Object.keys(e), u = 0; u < a.length; u++) {
										var c = a[u];
										'protocol' !== c && (n[c] = e[c]);
									}
									return (
										S[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = '/'),
										(n.href = n.format()),
										n
									);
								}
								if (e.protocol && e.protocol !== n.protocol) {
									if (!S[e.protocol]) {
										for (var h = Object.keys(e), p = 0; p < h.length; p++) {
											var d = h[p];
											n[d] = e[d];
										}
										return (n.href = n.format()), n;
									}
									if (((n.protocol = e.protocol), e.host || w[e.protocol])) n.pathname = e.pathname;
									else {
										for (
											var f = (e.pathname || '').split('/');
											f.length && !(e.host = f.shift());

										);
										e.host || (e.host = ''),
											e.hostname || (e.hostname = ''),
											'' !== f[0] && f.unshift(''),
											f.length < 2 && f.unshift(''),
											(n.pathname = f.join('/'));
									}
									if (
										((n.search = e.search),
										(n.query = e.query),
										(n.host = e.host || ''),
										(n.auth = e.auth),
										(n.hostname = e.hostname || e.host),
										(n.port = e.port),
										n.pathname || n.search)
									) {
										var g = n.pathname || '',
											v = n.search || '';
										n.path = g + v;
									}
									return (n.slashes = n.slashes || e.slashes), (n.href = n.format()), n;
								}
								var m = n.pathname && '/' === n.pathname.charAt(0),
									y = e.host || (e.pathname && '/' === e.pathname.charAt(0)),
									b = y || m || (n.host && e.pathname),
									E = b,
									_ = (n.pathname && n.pathname.split('/')) || [],
									f = (e.pathname && e.pathname.split('/')) || [],
									x = n.protocol && !S[n.protocol];
								if (
									(x &&
										((n.hostname = ''),
										(n.port = null),
										n.host && ('' === _[0] ? (_[0] = n.host) : _.unshift(n.host)),
										(n.host = ''),
										e.protocol &&
											((e.hostname = null),
											(e.port = null),
											e.host && ('' === f[0] ? (f[0] = e.host) : f.unshift(e.host)),
											(e.host = null)),
										(b = b && ('' === f[0] || '' === _[0]))),
									y)
								)
									(n.host = e.host || '' === e.host ? e.host : n.host),
										(n.hostname = e.hostname || '' === e.hostname ? e.hostname : n.hostname),
										(n.search = e.search),
										(n.query = e.query),
										(_ = f);
								else if (f.length)
									_ || (_ = []),
										_.pop(),
										(_ = _.concat(f)),
										(n.search = e.search),
										(n.query = e.query);
								else if (!l.isNullOrUndefined(e.search)) {
									if (x) {
										n.hostname = n.host = _.shift();
										var $ = n.host && n.host.indexOf('@') > 0 ? n.host.split('@') : !1;
										$ && ((n.auth = $.shift()), (n.host = n.hostname = $.shift()));
									}
									return (
										(n.search = e.search),
										(n.query = e.query),
										(l.isNull(n.pathname) && l.isNull(n.search)) ||
											(n.path = (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
										(n.href = n.format()),
										n
									);
								}
								if (!_.length)
									return (
										(n.pathname = null),
										n.search ? (n.path = '/' + n.search) : (n.path = null),
										(n.href = n.format()),
										n
									);
								for (
									var I = _.slice(-1)[0],
										T =
											((n.host || e.host || _.length > 1) && ('.' === I || '..' === I)) || '' === I,
										O = 0,
										A = _.length;
									A >= 0;
									A--
								)
									(I = _[A]),
										'.' === I
											? _.splice(A, 1)
											: '..' === I
											? (_.splice(A, 1), O++)
											: O && (_.splice(A, 1), O--);
								if (!b && !E) for (; O--; O) _.unshift('..');
								!b || '' === _[0] || (_[0] && '/' === _[0].charAt(0)) || _.unshift(''),
									T && '/' !== _.join('/').substr(-1) && _.push('');
								var C = '' === _[0] || (_[0] && '/' === _[0].charAt(0));
								if (x) {
									n.hostname = n.host = C ? '' : _.length ? _.shift() : '';
									var $ = n.host && n.host.indexOf('@') > 0 ? n.host.split('@') : !1;
									$ && ((n.auth = $.shift()), (n.host = n.hostname = $.shift()));
								}
								return (
									(b = b || (n.host && _.length)),
									b && !C && _.unshift(''),
									_.length ? (n.pathname = _.join('/')) : ((n.pathname = null), (n.path = null)),
									(l.isNull(n.pathname) && l.isNull(n.search)) ||
										(n.path = (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
									(n.auth = e.auth || n.auth),
									(n.slashes = n.slashes || e.slashes),
									(n.href = n.format()),
									n
								);
							}),
							(i.prototype.parseHost = function () {
								var e = this.host,
									t = h.exec(e);
								t &&
									((t = t[0]),
									':' !== t && (this.port = t.substr(1)),
									(e = e.substr(0, e.length - t.length))),
									e && (this.hostname = e);
							});
					},
					{ './util': 37, punycode: 14, querystring: 17 }
				],
				37: [
					function (e, t, n) {
						'use strict';
						t.exports = {
							isString: function (e) {
								return 'string' == typeof e;
							},
							isObject: function (e) {
								return 'object' == typeof e && null !== e;
							},
							isNull: function (e) {
								return null === e;
							},
							isNullOrUndefined: function (e) {
								return null == e;
							}
						};
					},
					{}
				],
				38: [
					function (e, t, n) {
						(function (e) {
							function n(e, t) {
								function n() {
									if (!o) {
										if (i('throwDeprecation')) throw new Error(t);
										i('traceDeprecation') ? console.trace(t) : console.warn(t), (o = !0);
									}
									return e.apply(this, arguments);
								}
								if (i('noDeprecation')) return e;
								var o = !1;
								return n;
							}
							function i(t) {
								try {
									if (!e.localStorage) return !1;
								} catch (n) {
									return !1;
								}
								var i = e.localStorage[t];
								return null == i ? !1 : 'true' === String(i).toLowerCase();
							}
							t.exports = n;
						}.call(
							this,
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{}
				],
				39: [
					function (e, t, n) {
						function i() {
							for (var e = {}, t = 0; t < arguments.length; t++) {
								var n = arguments[t];
								for (var i in n) o.call(n, i) && (e[i] = n[i]);
							}
							return e;
						}
						t.exports = i;
						var o = Object.prototype.hasOwnProperty;
					},
					{}
				]
			},
			{},
			[1]
		)(1);
	}),
	(function (e) {
		if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e();
		else if ('function' == typeof define && define.amd) define('lib/manifold.js', [], e);
		else {
			var t;
			(t =
				'undefined' != typeof window
					? window
					: 'undefined' != typeof global
					? global
					: 'undefined' != typeof self
					? self
					: this),
				(t.iiifmanifold = e());
		}
	})(function () {
		return (function () {
			function e(t, n, i) {
				function o(s, a) {
					if (!n[s]) {
						if (!t[s]) {
							var u = 'function' == typeof require && require;
							if (!a && u) return u(s, !0);
							if (r) return r(s, !0);
							var l = new Error("Cannot find module '" + s + "'");
							throw ((l.code = 'MODULE_NOT_FOUND'), l);
						}
						var c = (n[s] = { exports: {} });
						t[s][0].call(
							c.exports,
							function (e) {
								var n = t[s][1][e];
								return o(n || e);
							},
							c,
							c.exports,
							e,
							t,
							n,
							i
						);
					}
					return n[s].exports;
				}
				for (var r = 'function' == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
				return o;
			}
			return e;
		})()(
			{
				1: [
					function (e, t, n) {
						(function (e) {
							var t;
							!(function (e) {
								var t = (function () {
									function e(e) {
										(this.value = ''), e && (this.value = e.toLowerCase());
									}
									return (
										(e.prototype.toString = function () {
											return this.value;
										}),
										e
									);
								})();
								e.StringValue = t;
							})(t || (t = {}));
							var t,
								n =
									(this && this.__extends) ||
									(function () {
										var e =
											Object.setPrototypeOf ||
											({ __proto__: [] } instanceof Array &&
												function (e, t) {
													e.__proto__ = t;
												}) ||
											function (e, t) {
												for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
											};
										return function (t, n) {
											function i() {
												this.constructor = t;
											}
											e(t, n),
												(t.prototype =
													null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
										};
									})();
							!(function (e) {
								var t = (function (e) {
									function t() {
										return (null !== e && e.apply(this, arguments)) || this;
									}
									return (
										n(t, e),
										(t.prototype.date = function () {
											return new t(t.DATE.toString());
										}),
										(t.prototype.none = function () {
											return new t(t.NONE.toString());
										}),
										(t.DATE = new t('date')),
										(t.NONE = new t('none')),
										t
									);
								})(e.StringValue);
								e.TreeSortType = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function t(e, t) {
										(this.rects = []), (this.canvasIndex = t), this.addRect(e);
									}
									return (
										(t.prototype.addRect = function (t) {
											var n = new e.AnnotationRect(t);
											(n.canvasIndex = this.canvasIndex),
												(n.index = this.rects.length),
												this.rects.push(n),
												this.rects.sort(function (e, t) {
													return e.index - t.index;
												});
										}),
										t
									);
								})();
								e.AnnotationGroup = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function e(e) {
										this.isVisible = !0;
										var t = e.on.match(/.*xywh=(\d*),(\d*),(\d*),(\d*)/);
										(this.x = Number(t[1])),
											(this.y = Number(t[2])),
											(this.width = Number(t[3])),
											(this.height = Number(t[4])),
											(this.chars = e.resource.chars);
									}
									return e;
								})();
								e.AnnotationRect = t;
							})(t || (t = {}));
							var t;
							!(function (t) {
								var n = (function () {
									function n(e) {
										(this._options = e), (this._options.locale = this._options.locale || 'en-GB');
									}
									return (
										(n.prototype.bootstrap = function (t, n) {
											var i = this;
											return new Promise(function (o, r) {
												t && n && ((o = t), (r = n));
												var s = i._detectIE();
												if (s === !1)
													manifesto.loadManifest(i._options.iiifResourceUri).then(function (e) {
														i._loaded(i, e, o, r);
													});
												else if (s > 0)
													if (9 === s) {
														var a = {
															url: i._options.iiifResourceUri,
															type: 'GET',
															dataType: 'jsonp',
															jsonp: 'callback',
															jsonpCallback: 'manifestCallback'
														};
														$.ajax(a),
															(e.manifestCallback = function (e) {
																i._loaded(i, JSON.stringify(e), o, r);
															});
													} else
														$.getJSON(i._options.iiifResourceUri, function (e) {
															i._loaded(i, JSON.stringify(e), o, r);
														});
											});
										}),
										(n.prototype._loaded = function (e, n, i, o) {
											var r = manifesto.create(n, { locale: e._options.locale });
											if (
												(e._options.iiifResource || (e._options.iiifResource = r),
												r.getIIIFResourceType().toString() ===
													manifesto.IIIFResourceType.collection().toString() ||
													'collection' === r.getIIIFResourceType().toString().toLowerCase())
											) {
												var s = r.getCollections();
												s && s.length
													? r.getCollectionByIndex(e._options.collectionIndex).then(function (n) {
															n || o('Collection index not found'),
																0 === n.getTotalManifests() &&
																0 === e._options.manifestIndex &&
																n.getTotalCollections() > 0
																	? ((e._options.collectionIndex = 0),
																	  (e._options.iiifResourceUri = n.id),
																	  e.bootstrap(i, o))
																	: n
																			.getManifestByIndex(e._options.manifestIndex)
																			.then(function (n) {
																				e._options.manifest = n;
																				var o = new t.Helper(e._options);
																				i(o);
																			});
													  })
													: r.getManifestByIndex(e._options.manifestIndex).then(function (n) {
															e._options.manifest = n;
															var o = new t.Helper(e._options);
															i(o);
													  });
											} else {
												e._options.manifest = r;
												var a = new t.Helper(e._options);
												i(a);
											}
										}),
										(n.prototype._detectIE = function () {
											var e = window.navigator.userAgent,
												t = e.indexOf('MSIE ');
											if (t > 0) return parseInt(e.substring(t + 5, e.indexOf('.', t)), 10);
											var n = e.indexOf('Trident/');
											if (n > 0) {
												var i = e.indexOf('rv:');
												return parseInt(e.substring(i + 3, e.indexOf('.', i)), 10);
											}
											var o = e.indexOf('Edge/');
											return o > 0 ? parseInt(e.substring(o + 5, e.indexOf('.', o)), 10) : !1;
										}),
										n
									);
								})();
								t.Bootstrapper = n;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function e(e, t) {
										(this.authHoldingPage = null),
											(this.clickThroughService = null),
											(this.externalService = null),
											(this.isProbed = !1),
											(this.isResponseHandled = !1),
											(this.kioskService = null),
											(this.loginService = null),
											(this.logoutService = null),
											(this.probeService = null),
											(this.restrictedService = null),
											(this.tokenService = null),
											(e.externalResource = this),
											(this.dataUri = this._getDataUri(e)),
											(this.index = e.index),
											(this.authAPIVersion = t.authApiVersion),
											this._parseAuthServices(e),
											this._parseDimensions(e);
									}
									return (
										(e.prototype._getImageServiceDescriptor = function (e) {
											for (var t = null, n = 0; n < e.length; n++) {
												var i = e[n],
													o = i.id;
												o.endsWith('/') || (o += '/'),
													manifesto.Utils.isImageProfile(i.getProfile()) && (t = o + 'info.json');
											}
											return t;
										}),
										(e.prototype._getDataUri = function (e) {
											var t = e.getContent(),
												n = e.getImages(),
												i = null;
											if (t && t.length) {
												var o = t[0],
													r = o.getBody();
												if (r.length) {
													var s = r[0],
														a = s.getServices();
													return a.length && (i = this._getImageServiceDescriptor(a)) ? i : r[0].id;
												}
												return null;
											}
											if (n && n.length) {
												var u = n[0],
													l = u.getResource(),
													a = l.getServices();
												return a.length && (i = this._getImageServiceDescriptor(a)) ? i : l.id;
											}
											var c = e.getService(manifesto.ServiceProfile.ixif());
											return c ? c.getInfoUri() : e.id;
										}),
										(e.prototype._parseAuthServices = function (e) {
											if (0.9 === this.authAPIVersion)
												(this.clickThroughService = manifesto.Utils.getService(
													e,
													manifesto.ServiceProfile.clickThrough().toString()
												)),
													(this.loginService = manifesto.Utils.getService(
														e,
														manifesto.ServiceProfile.login().toString()
													)),
													(this.restrictedService = manifesto.Utils.getService(
														e,
														manifesto.ServiceProfile.restricted().toString()
													)),
													this.clickThroughService
														? ((this.logoutService = this.clickThroughService.getService(
																manifesto.ServiceProfile.logout().toString()
														  )),
														  (this.tokenService = this.clickThroughService.getService(
																manifesto.ServiceProfile.token().toString()
														  )))
														: this.loginService
														? ((this.logoutService = this.loginService.getService(
																manifesto.ServiceProfile.logout().toString()
														  )),
														  (this.tokenService = this.loginService.getService(
																manifesto.ServiceProfile.token().toString()
														  )))
														: this.restrictedService &&
														  ((this.logoutService = this.restrictedService.getService(
																manifesto.ServiceProfile.logout().toString()
														  )),
														  (this.tokenService = this.restrictedService.getService(
																manifesto.ServiceProfile.token().toString()
														  )));
											else {
												if (void 0 !== e.isCanvas && e.isCanvas()) {
													var t = e.getContent();
													if (t && t.length) {
														var n = t[0].getBody();
														if (n && n.length) {
															var i = n[0];
															e = i;
														}
													}
												}
												(this.clickThroughService = manifesto.Utils.getService(
													e,
													manifesto.ServiceProfile.auth1Clickthrough().toString()
												)),
													(this.loginService = manifesto.Utils.getService(
														e,
														manifesto.ServiceProfile.auth1Login().toString()
													)),
													(this.externalService = manifesto.Utils.getService(
														e,
														manifesto.ServiceProfile.auth1External().toString()
													)),
													(this.kioskService = manifesto.Utils.getService(
														e,
														manifesto.ServiceProfile.auth1Kiosk().toString()
													)),
													this.clickThroughService
														? ((this.logoutService = this.clickThroughService.getService(
																manifesto.ServiceProfile.auth1Logout().toString()
														  )),
														  (this.tokenService = this.clickThroughService.getService(
																manifesto.ServiceProfile.auth1Token().toString()
														  )),
														  (this.probeService = this.clickThroughService.getService(
																manifesto.ServiceProfile.auth1Probe().toString()
														  )))
														: this.loginService
														? ((this.logoutService = this.loginService.getService(
																manifesto.ServiceProfile.auth1Logout().toString()
														  )),
														  (this.tokenService = this.loginService.getService(
																manifesto.ServiceProfile.auth1Token().toString()
														  )),
														  (this.probeService = this.loginService.getService(
																manifesto.ServiceProfile.auth1Probe().toString()
														  )))
														: this.externalService
														? ((this.logoutService = this.externalService.getService(
																manifesto.ServiceProfile.auth1Logout().toString()
														  )),
														  (this.tokenService = this.externalService.getService(
																manifesto.ServiceProfile.auth1Token().toString()
														  )),
														  (this.probeService = this.externalService.getService(
																manifesto.ServiceProfile.auth1Probe().toString()
														  )))
														: this.kioskService &&
														  ((this.logoutService = this.kioskService.getService(
																manifesto.ServiceProfile.auth1Logout().toString()
														  )),
														  (this.tokenService = this.kioskService.getService(
																manifesto.ServiceProfile.auth1Token().toString()
														  )),
														  (this.probeService = this.kioskService.getService(
																manifesto.ServiceProfile.auth1Probe().toString()
														  )));
											}
										}),
										(e.prototype._parseDimensions = function (e) {
											var t = e.getImages();
											if (t && t.length) {
												var n = t[0],
													i = n.getResource();
												(this.width = i.getWidth()), (this.height = i.getHeight());
											} else if (((t = e.getContent()), t.length)) {
												var o = t[0],
													r = o.getBody();
												r.length &&
													((this.width = r[0].getWidth()), (this.height = r[0].getHeight()));
											}
										}),
										(e.prototype.isAccessControlled = function () {
											return this.clickThroughService ||
												this.loginService ||
												this.externalService ||
												this.kioskService ||
												this.probeService
												? !0
												: !1;
										}),
										(e.prototype.hasServiceDescriptor = function () {
											return this.dataUri ? this.dataUri.endsWith('info.json') : !1;
										}),
										(e.prototype.getData = function (e) {
											var t = this,
												n = this;
											return (
												(n.data = {}),
												new Promise(function (i, o) {
													if (
														(t.dataUri || o('There is no dataUri to fetch'),
														n.probeService && !n.isProbed)
													)
														(n.isProbed = !0),
															$.ajax({ url: n.probeService.id, type: 'GET', dataType: 'json' })
																.done(function (e) {
																	var t = unescape(e.contentLocation);
																	t !== n.dataUri
																		? (n.status = HTTPStatusCode.MOVED_TEMPORARILY)
																		: (n.status = HTTPStatusCode.OK),
																		i(n);
																})
																.fail(function (e) {
																	(n.status = e.status), (n.error = e), i(n);
																});
													else {
														var r = 'GET';
														if (!n.hasServiceDescriptor()) {
															if (!n.isAccessControlled())
																return (n.status = HTTPStatusCode.OK), void i(n);
															r = 'HEAD';
														}
														$.ajax({
															url: n.dataUri,
															type: r,
															dataType: 'json',
															beforeSend: function (t) {
																e && t.setRequestHeader('Authorization', 'Bearer ' + e.accessToken);
															}
														})
															.done(function (e) {
																if (e) {
																	var t = unescape(e['@id']);
																	(n.data = e),
																		n._parseAuthServices(n.data),
																		t.endsWith('/info.json') &&
																			(t = t.substr(0, t.lastIndexOf('/')));
																	var o = n.dataUri;
																	o &&
																		o.endsWith('/info.json') &&
																		(o = o.substr(0, o.lastIndexOf('/'))),
																		t !== o && n.loginService
																			? (n.status = HTTPStatusCode.MOVED_TEMPORARILY)
																			: (n.status = HTTPStatusCode.OK),
																		i(n);
																} else (n.status = HTTPStatusCode.OK), i(n);
															})
															.fail(function (e) {
																(n.status = e.status),
																	(n.error = e),
																	e.responseJSON && n._parseAuthServices(e.responseJSON),
																	i(n);
															});
													}
												})
											);
										}),
										e
									);
								})();
								e.ExternalResource = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function t(e) {
										(this.options = e),
											(this.iiifResource = this.options.iiifResource),
											(this.iiifResourceUri = this.options.iiifResourceUri),
											(this.manifest = this.options.manifest),
											(this.collectionIndex = this.options.collectionIndex || 0),
											(this.manifestIndex = this.options.manifestIndex || 0),
											(this.sequenceIndex = this.options.sequenceIndex || 0),
											(this.canvasIndex = this.options.canvasIndex || 0);
									}
									return (
										(t.prototype.getAutoCompleteService = function () {
											var e = this.getSearchService();
											return e ? e.getService(manifesto.ServiceProfile.autoComplete()) : null;
										}),
										(t.prototype.getAttribution = function () {
											console.warn(
												'getAttribution will be deprecated, use getRequiredStatement instead.'
											);
											var e = this.manifest.getAttribution();
											return e ? Manifesto.LanguageMap.getValue(e, this.options.locale) : null;
										}),
										(t.prototype.getCanvases = function () {
											return this.getCurrentSequence().getCanvases();
										}),
										(t.prototype.getCanvasById = function (e) {
											return this.getCurrentSequence().getCanvasById(e);
										}),
										(t.prototype.getCanvasesById = function (e) {
											for (var t = [], n = 0; n < e.length; n++) {
												var i = e[n],
													o = this.getCanvasById(i);
												o && t.push(o);
											}
											return t;
										}),
										(t.prototype.getCanvasByIndex = function (e) {
											return this.getCurrentSequence().getCanvasByIndex(e);
										}),
										(t.prototype.getCanvasIndexById = function (e) {
											return this.getCurrentSequence().getCanvasIndexById(e);
										}),
										(t.prototype.getCanvasIndexByLabel = function (e) {
											var t =
												this.getManifestType().toString() ===
												manifesto.ManifestType.manuscript().toString();
											return this.getCurrentSequence().getCanvasIndexByLabel(e, t);
										}),
										(t.prototype.getCanvasRange = function (e, t) {
											var n = this.getCanvasRanges(e);
											if (t) {
												for (var i = 0; i < n.length; i++) {
													var o = n[i];
													if (o.path === t) return o;
												}
												return null;
											}
											return n[0];
										}),
										(t.prototype.getCanvasRanges = function (e) {
											return e.ranges
												? e.ranges
												: ((e.ranges = this.manifest
														.getAllRanges()
														.en()
														.where(function (t) {
															return t
																.getCanvasIds()
																.en()
																.any(function (t) {
																	return (
																		manifesto.Utils.normaliseUrl(t) ===
																		manifesto.Utils.normaliseUrl(e.id)
																	);
																});
														})
														.toArray()),
												  e.ranges);
										}),
										(t.prototype.getCollectionIndex = function (e) {
											var t = null;
											return e.parentCollection && (t = e.parentCollection.index), t;
										}),
										(t.prototype.getCurrentCanvas = function () {
											return this.getCurrentSequence().getCanvasByIndex(this.canvasIndex);
										}),
										(t.prototype.getCurrentSequence = function () {
											return this.getSequenceByIndex(this.sequenceIndex);
										}),
										(t.prototype.getDescription = function () {
											var e = this.manifest.getDescription();
											return e ? Manifesto.LanguageMap.getValue(e, this.options.locale) : null;
										}),
										(t.prototype.getFirstPageIndex = function () {
											return 0;
										}),
										(t.prototype.getLabel = function () {
											var e = this.manifest.getLabel();
											return e ? Manifesto.LanguageMap.getValue(e, this.options.locale) : null;
										}),
										(t.prototype.getLastCanvasLabel = function (e) {
											return this.getCurrentSequence().getLastCanvasLabel(e);
										}),
										(t.prototype.getLastPageIndex = function () {
											return this.getTotalCanvases() - 1;
										}),
										(t.prototype.getLicense = function () {
											return this.manifest.getLicense();
										}),
										(t.prototype.getLogo = function () {
											return this.manifest.getLogo();
										}),
										(t.prototype.getManifestType = function () {
											var e = this.manifest.getManifestType();
											return '' === e.toString() && (e = manifesto.ManifestType.monograph()), e;
										}),
										(t.prototype.getMetadata = function (t) {
											var n = [],
												i = this.manifest.getMetadata(),
												o = new e.MetadataGroup(this.manifest);
											if (
												(i && i.length && o.addMetadata(i, !0),
												this.manifest.getDescription().length)
											) {
												var r = new Manifesto.LabelValuePair(this.options.locale);
												(r.label = [new Manifesto.Language('description', this.options.locale)]),
													(r.value = this.manifest.getDescription()),
													(r.isRootLevel = !0),
													o.addItem(r);
											}
											if (this.manifest.getAttribution().length) {
												var r = new Manifesto.LabelValuePair(this.options.locale);
												(r.label = [new Manifesto.Language('attribution', this.options.locale)]),
													(r.value = this.manifest.getAttribution()),
													(r.isRootLevel = !0),
													o.addItem(r);
											}
											var s = this.manifest.getLicense();
											if (s) {
												var a = {
														label: 'license',
														value: t && t.licenseFormatter ? t.licenseFormatter.format(s) : s
													},
													r = new Manifesto.LabelValuePair(this.options.locale);
												r.parse(a), (r.isRootLevel = !0), o.addItem(r);
											}
											if (this.manifest.getLogo()) {
												var a = {
														label: 'logo',
														value: '<img src="' + this.manifest.getLogo() + '"/>'
													},
													r = new Manifesto.LabelValuePair(this.options.locale);
												r.parse(a), (r.isRootLevel = !0), o.addItem(r);
											}
											return n.push(o), t ? this._parseMetadataOptions(t, n) : n;
										}),
										(t.prototype.getRequiredStatement = function () {
											var e = this.manifest.getRequiredStatement();
											return e ? { label: e.getLabel(), value: e.getValue() } : null;
										}),
										(t.prototype._parseMetadataOptions = function (t, n) {
											var i = this.getCurrentSequence(),
												o = i.getMetadata();
											if (o && o.length) {
												var r = new e.MetadataGroup(i);
												r.addMetadata(o), n.push(r);
											}
											if (t.range) {
												var s = this._getRangeMetadata([], t.range);
												(s = s.reverse()), (n = n.concat(s));
											}
											if (t.canvases && t.canvases.length)
												for (var a = 0; a < t.canvases.length; a++) {
													var u = t.canvases[a],
														l = u.getMetadata();
													if (l && l.length) {
														var c = new e.MetadataGroup(u);
														c.addMetadata(u.getMetadata()), n.push(c);
													}
													for (var h = u.getImages(), p = 0; p < h.length; p++) {
														var d = h[p],
															f = d.getMetadata();
														if (f && f.length) {
															var g = new e.MetadataGroup(d);
															g.addMetadata(f), n.push(g);
														}
													}
												}
											return n;
										}),
										(t.prototype._getRangeMetadata = function (t, n) {
											var i = n.getMetadata();
											if (i && i.length) {
												var o = new e.MetadataGroup(n);
												o.addMetadata(i), t.push(o);
											} else if (n.parentRange) return this._getRangeMetadata(t, n.parentRange);
											return t;
										}),
										(t.prototype.getMultiSelectState = function () {
											return (
												this._multiSelectState ||
													((this._multiSelectState = new e.MultiSelectState()),
													(this._multiSelectState.ranges = this.getRanges().slice(0)),
													(this._multiSelectState.canvases = this.getCurrentSequence()
														.getCanvases()
														.slice(0))),
												this._multiSelectState
											);
										}),
										(t.prototype.getCurrentRange = function () {
											return this.rangeId ? this.getRangeById(this.rangeId) : null;
										}),
										(t.prototype.getPosterCanvas = function () {
											return this.manifest.getPosterCanvas();
										}),
										(t.prototype.getPosterImage = function () {
											var e = this.getPosterCanvas();
											if (e) {
												var t = e.getContent();
												if (t && t.length) {
													var n = t[0],
														i = n.getBody();
													return i[0].id;
												}
											}
											return null;
										}),
										(t.prototype.getPreviousRange = function (e) {
											var t = null;
											if ((t = e ? e : this.getCurrentRange()))
												for (var n = this.getFlattenedTree(), i = 0; i < n.length; i++) {
													var o = n[i];
													if (o.data.id === t.id) {
														for (; i > 0; ) {
															i--;
															var r = n[i];
															return r.data;
														}
														break;
													}
												}
											return null;
										}),
										(t.prototype.getNextRange = function (e) {
											var t = null;
											if ((t = e ? e : this.getCurrentRange()))
												for (var n = this.getFlattenedTree(), i = 0; i < n.length; i++) {
													var o = n[i];
													if (o.data.id === t.id) {
														for (; i < n.length - 1; ) {
															i++;
															var r = n[i];
															if (r.data.canvases && r.data.canvases.length) return r.data;
														}
														break;
													}
												}
											return null;
										}),
										(t.prototype.getFlattenedTree = function () {
											return this._flattenTree(this.getTree(), 'nodes');
										}),
										(t.prototype._flattenTree = function (e, t) {
											var n = this,
												i = [Object.assign({}, e)];
											return (
												delete i[0][t],
												e[t] && e[t].length > 0
													? i.concat(
															e[t]
																.map(function (e) {
																	return n._flattenTree(e, t);
																})
																.reduce(function (e, t) {
																	return e.concat(t);
																}, [])
													  )
													: i
											);
										}),
										(t.prototype.getRanges = function () {
											return this.manifest.getAllRanges();
										}),
										(t.prototype.getRangeByPath = function (e) {
											return this.manifest.getRangeByPath(e);
										}),
										(t.prototype.getRangeById = function (e) {
											return this.manifest.getRangeById(e);
										}),
										(t.prototype.getRangeCanvases = function (e) {
											var t = e.getCanvasIds();
											return this.getCanvasesById(t);
										}),
										(t.prototype.getRelated = function () {
											return this.manifest.getRelated();
										}),
										(t.prototype.getSearchService = function () {
											return this.manifest.getService(manifesto.ServiceProfile.search());
										}),
										(t.prototype.getSeeAlso = function () {
											return this.manifest.getSeeAlso();
										}),
										(t.prototype.getSequenceByIndex = function (e) {
											return this.manifest.getSequenceByIndex(e);
										}),
										(t.prototype.getShareServiceUrl = function () {
											var e = null,
												t = this.manifest.getService(manifesto.ServiceProfile.shareExtensions());
											return t && (t.length && (t = t[0]), (e = t.__jsonld.shareUrl)), e;
										}),
										(t.prototype.getSortedTreeNodesByDate = function (e, t) {
											var n = t.nodes
													.en()
													.traverseUnique(function (e) {
														return e.nodes;
													})
													.where(function (e) {
														return (
															e.data.type === manifesto.TreeNodeType.collection().toString() ||
															e.data.type === manifesto.TreeNodeType.manifest().toString()
														);
													})
													.toArray(),
												i = t.nodes
													.en()
													.traverseUnique(function (e) {
														return e.nodes;
													})
													.where(function (e) {
														return e.data.type === manifesto.TreeNodeType.manifest().toString();
													})
													.toArray();
											this.createDecadeNodes(e, n),
												this.sortDecadeNodes(e),
												this.createYearNodes(e, n),
												this.sortYearNodes(e),
												this.createMonthNodes(e, i),
												this.sortMonthNodes(e),
												this.createDateNodes(e, i),
												this.pruneDecadeNodes(e);
										}),
										(t.prototype.getStartCanvasIndex = function () {
											return this.getCurrentSequence().getStartCanvasIndex();
										}),
										(t.prototype.getThumbs = function (e, t) {
											return this.getCurrentSequence().getThumbs(e, t);
										}),
										(t.prototype.getTopRanges = function () {
											return this.manifest.getTopRanges();
										}),
										(t.prototype.getTotalCanvases = function () {
											return this.getCurrentSequence().getTotalCanvases();
										}),
										(t.prototype.getTrackingLabel = function () {
											return this.manifest.getTrackingLabel();
										}),
										(t.prototype._getTopRanges = function () {
											return this.iiifResource.getTopRanges();
										}),
										(t.prototype.getTree = function (t, n) {
											if (
												(void 0 === t && (t = 0),
												void 0 === n && (n = e.TreeSortType.NONE),
												!this.iiifResource)
											)
												return null;
											var i;
											if (this.iiifResource.isCollection()) i = this.iiifResource.getDefaultTree();
											else {
												var o = this._getTopRanges(),
													r = new manifesto.TreeNode();
												if (((r.label = 'root'), (r.data = this.iiifResource), !o.length)) return r;
												var s = o[t];
												i = s.getTree(r);
											}
											var a = new manifesto.TreeNode();
											switch (n.toString()) {
												case e.TreeSortType.DATE.toString():
													if (this.treeHasNavDates(i)) {
														this.getSortedTreeNodesByDate(a, i);
														break;
													}
												default:
													a = i;
											}
											return a;
										}),
										(t.prototype.treeHasNavDates = function (e) {
											var t = e.nodes
												.en()
												.traverseUnique(function (e) {
													return e.nodes;
												})
												.where(function (e) {
													return !isNaN(e.navDate);
												})
												.first();
											return t ? !0 : !1;
										}),
										(t.prototype.getViewingDirection = function () {
											var e = this.getCurrentSequence().getViewingDirection();
											return e || (e = this.manifest.getViewingDirection()), e;
										}),
										(t.prototype.getViewingHint = function () {
											var e = this.getCurrentSequence().getViewingHint();
											return e || (e = this.manifest.getViewingHint()), e;
										}),
										(t.prototype.hasParentCollection = function () {
											return !!this.manifest.parentCollection;
										}),
										(t.prototype.hasRelatedPage = function () {
											var e = this.getRelated();
											return e ? (e.length && (e = e[0]), 'text/html' === e.format) : !1;
										}),
										(t.prototype.hasResources = function () {
											var e = this.getCurrentCanvas();
											return e.getResources().length > 0;
										}),
										(t.prototype.isBottomToTop = function () {
											var e = this.getViewingDirection();
											return e
												? e.toString() === manifesto.ViewingDirection.bottomToTop().toString()
												: !1;
										}),
										(t.prototype.isCanvasIndexOutOfRange = function (e) {
											return this.getCurrentSequence().isCanvasIndexOutOfRange(e);
										}),
										(t.prototype.isContinuous = function () {
											var e = this.getViewingHint();
											return e
												? e.toString() === manifesto.ViewingHint.continuous().toString()
												: !1;
										}),
										(t.prototype.isFirstCanvas = function (e) {
											return 'undefined' != typeof e
												? this.getCurrentSequence().isFirstCanvas(e)
												: this.getCurrentSequence().isFirstCanvas(this.canvasIndex);
										}),
										(t.prototype.isHorizontallyAligned = function () {
											return this.isLeftToRight() || this.isRightToLeft();
										}),
										(t.prototype.isLastCanvas = function (e) {
											return 'undefined' != typeof e
												? this.getCurrentSequence().isLastCanvas(e)
												: this.getCurrentSequence().isLastCanvas(this.canvasIndex);
										}),
										(t.prototype.isLeftToRight = function () {
											var e = this.getViewingDirection();
											return e
												? e.toString() === manifesto.ViewingDirection.leftToRight().toString()
												: !1;
										}),
										(t.prototype.isMultiCanvas = function () {
											return this.getCurrentSequence().isMultiCanvas();
										}),
										(t.prototype.isMultiSequence = function () {
											return this.manifest.isMultiSequence();
										}),
										(t.prototype.isPaged = function () {
											var e = this.getViewingHint();
											return e
												? e.toString() === manifesto.ViewingHint.paged().toString()
												: this.manifest.isPagingEnabled();
										}),
										(t.prototype.isPagingAvailable = function () {
											return this.isPagingEnabled() && this.getTotalCanvases() > 2;
										}),
										(t.prototype.isPagingEnabled = function () {
											return (
												this.manifest.isPagingEnabled() ||
												this.getCurrentSequence().isPagingEnabled()
											);
										}),
										(t.prototype.isRightToLeft = function () {
											var e = this.getViewingDirection();
											return e
												? e.toString() === manifesto.ViewingDirection.rightToLeft().toString()
												: !1;
										}),
										(t.prototype.isTopToBottom = function () {
											var e = this.getViewingDirection();
											return e
												? e.toString() === manifesto.ViewingDirection.topToBottom().toString()
												: !1;
										}),
										(t.prototype.isTotalCanvasesEven = function () {
											return this.getCurrentSequence().isTotalCanvasesEven();
										}),
										(t.prototype.isUIEnabled = function (e) {
											var t = this.manifest.getService(manifesto.ServiceProfile.uiExtensions());
											if (t) {
												var n = t.getProperty('disableUI');
												if (n && (-1 !== n.indexOf(e) || -1 !== n.indexOf(e.toLowerCase())))
													return !1;
											}
											return !0;
										}),
										(t.prototype.isVerticallyAligned = function () {
											return this.isTopToBottom() || this.isBottomToTop();
										}),
										(t.prototype.createDateNodes = function (e, t) {
											for (var n = 0; n < t.length; n++) {
												var i = t[n],
													o = this.getNodeYear(i),
													r = this.getNodeMonth(i),
													s = new manifesto.TreeNode();
												(s.id = i.id),
													(s.label = this.getNodeDisplayDate(i)),
													(s.data = i.data),
													(s.data.type = manifesto.TreeNodeType.manifest().toString()),
													(s.data.year = o),
													(s.data.month = r);
												var a = this.getDecadeNode(e, o);
												if (a) {
													var u = this.getYearNode(a, o);
													if (u) {
														var l = this.getMonthNode(u, r);
														l && l.addNode(s);
													}
												}
											}
										}),
										(t.prototype.createDecadeNodes = function (e, t) {
											for (var n = 0; n < t.length; n++) {
												var i = t[n],
													o = this.getNodeYear(i),
													r = Number(o.toString().substr(0, 3) + '9');
												if (!this.getDecadeNode(e, o)) {
													var s = new manifesto.TreeNode();
													(s.label = o + ' - ' + r),
														(s.navDate = i.navDate),
														(s.data.startYear = o),
														(s.data.endYear = r),
														e.addNode(s);
												}
											}
										}),
										(t.prototype.createMonthNodes = function (e, t) {
											for (var n = 0; n < t.length; n++) {
												var i = t[n],
													o = this.getNodeYear(i),
													r = this.getNodeMonth(i),
													s = this.getDecadeNode(e, o),
													a = null;
												if (
													(s && (a = this.getYearNode(s, o)), s && a && !this.getMonthNode(a, r))
												) {
													var u = new manifesto.TreeNode();
													(u.label = this.getNodeDisplayMonth(i)),
														(u.navDate = i.navDate),
														(u.data.year = o),
														(u.data.month = r),
														a.addNode(u);
												}
											}
										}),
										(t.prototype.createYearNodes = function (e, t) {
											for (var n = 0; n < t.length; n++) {
												var i = t[n],
													o = this.getNodeYear(i),
													r = this.getDecadeNode(e, o);
												if (r && !this.getYearNode(r, o)) {
													var s = new manifesto.TreeNode();
													(s.label = o.toString()),
														(s.navDate = i.navDate),
														(s.data.year = o),
														r.addNode(s);
												}
											}
										}),
										(t.prototype.getDecadeNode = function (e, t) {
											for (var n = 0; n < e.nodes.length; n++) {
												var i = e.nodes[n];
												if (t >= i.data.startYear && t <= i.data.endYear) return i;
											}
											return null;
										}),
										(t.prototype.getMonthNode = function (e, t) {
											for (var n = 0; n < e.nodes.length; n++) {
												var i = e.nodes[n];
												if (t === this.getNodeMonth(i)) return i;
											}
											return null;
										}),
										(t.prototype.getNodeDisplayDate = function (e) {
											return e.navDate.toDateString();
										}),
										(t.prototype.getNodeDisplayMonth = function (e) {
											var t = [
												'January',
												'February',
												'March',
												'April',
												'May',
												'June',
												'July',
												'August',
												'September',
												'October',
												'November',
												'December'
											];
											return t[e.navDate.getMonth()];
										}),
										(t.prototype.getNodeMonth = function (e) {
											return e.navDate.getMonth();
										}),
										(t.prototype.getNodeYear = function (e) {
											return e.navDate.getFullYear();
										}),
										(t.prototype.getYearNode = function (e, t) {
											for (var n = 0; n < e.nodes.length; n++) {
												var i = e.nodes[n];
												if (t === this.getNodeYear(i)) return i;
											}
											return null;
										}),
										(t.prototype.pruneDecadeNodes = function (e) {
											for (var t = [], n = 0; n < e.nodes.length; n++) {
												var i = e.nodes[n];
												i.nodes.length || t.push(i);
											}
											for (var o = 0; o < t.length; o++) {
												var r = t[o],
													s = e.nodes.indexOf(r);
												s > -1 && e.nodes.splice(s, 1);
											}
										}),
										(t.prototype.sortDecadeNodes = function (e) {
											e.nodes = e.nodes.sort(function (e, t) {
												return e.data.startYear - t.data.startYear;
											});
										}),
										(t.prototype.sortMonthNodes = function (e) {
											for (var t = this, n = 0; n < e.nodes.length; n++)
												for (var i = e.nodes[n], o = 0; o < i.nodes.length; o++) {
													var r = i.nodes[o];
													r.nodes = r.nodes.sort(function (e, n) {
														return t.getNodeMonth(e) - t.getNodeMonth(n);
													});
												}
										}),
										(t.prototype.sortYearNodes = function (e) {
											for (var t = this, n = 0; n < e.nodes.length; n++) {
												var i = e.nodes[n];
												i.nodes = i.nodes.sort(function (e, n) {
													return t.getNodeYear(e) - t.getNodeYear(n);
												});
											}
										}),
										t
									);
								})();
								e.Helper = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function e() {}
									return e;
								})();
								e.ILabelValuePair = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								function t(t) {
									var n = new e.Bootstrapper(t);
									return n.bootstrap();
								}
								e.loadManifest = t;
							})(t || (t = {})),
								(function (e) {
									e.Manifold || (e.Manifold = t);
								})(e);
							var t;
							!(function (e) {
								var t = (function () {
									function e(e, t) {
										(this.items = []), (this.resource = e), (this.label = t);
									}
									return (
										(e.prototype.addItem = function (e) {
											this.items.push(e);
										}),
										(e.prototype.addMetadata = function (e, t) {
											void 0 === t && (t = !1);
											for (var n = 0; n < e.length; n++) {
												var i = e[n];
												(i.isRootLevel = t), this.addItem(i);
											}
										}),
										e
									);
								})();
								e.MetadataGroup = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function e() {}
									return e;
								})();
								e.MetadataOptions = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function e() {
										(this.isEnabled = !1), (this.ranges = []), (this.canvases = []);
									}
									return (
										(e.prototype.allCanvasesSelected = function () {
											return (
												this.canvases.length > 0 &&
												this.getAllSelectedCanvases().length === this.canvases.length
											);
										}),
										(e.prototype.allRangesSelected = function () {
											return (
												this.ranges.length > 0 &&
												this.getAllSelectedRanges().length === this.ranges.length
											);
										}),
										(e.prototype.allSelected = function () {
											return this.allRangesSelected() && this.allCanvasesSelected();
										}),
										(e.prototype.getAll = function () {
											return this.canvases.concat(this.ranges);
										}),
										(e.prototype.getAllSelectedCanvases = function () {
											return this.canvases
												.en()
												.where(function (e) {
													return e.multiSelected;
												})
												.toArray();
										}),
										(e.prototype.getAllSelectedRanges = function () {
											return this.ranges
												.en()
												.where(function (e) {
													return e.multiSelected;
												})
												.toArray();
										}),
										(e.prototype.getCanvasById = function (e) {
											return this.canvases
												.en()
												.where(function (t) {
													return t.id === e;
												})
												.first();
										}),
										(e.prototype.getCanvasesByIds = function (e) {
											for (var t = [], n = 0; n < e.length; n++) {
												var i = e[n];
												t.push(this.getCanvasById(i));
											}
											return t;
										}),
										(e.prototype.getRangeCanvases = function (e) {
											var t = e.getCanvasIds();
											return this.getCanvasesByIds(t);
										}),
										(e.prototype.selectAll = function (e) {
											this.selectRanges(this.ranges, e), this.selectCanvases(this.canvases, e);
										}),
										(e.prototype.selectCanvas = function (e, t) {
											var n = this.canvases
												.en()
												.where(function (t) {
													return t.id === e.id;
												})
												.first();
											n.multiSelected = t;
										}),
										(e.prototype.selectAllCanvases = function (e) {
											this.selectCanvases(this.canvases, e);
										}),
										(e.prototype.selectCanvases = function (e, t) {
											for (var n = 0; n < e.length; n++) {
												var i = e[n];
												i.multiSelected = t;
											}
										}),
										(e.prototype.selectRange = function (e, t) {
											var n = this.ranges
												.en()
												.where(function (t) {
													return t.id === e.id;
												})
												.first();
											n.multiSelected = t;
											var i = this.getRangeCanvases(n);
											this.selectCanvases(i, t);
										}),
										(e.prototype.selectAllRanges = function (e) {
											this.selectRanges(this.ranges, e);
										}),
										(e.prototype.selectRanges = function (e, t) {
											for (var n = 0; n < e.length; n++) {
												var i = e[n];
												i.multiSelected = t;
												var o = this.getCanvasesByIds(i.getCanvasIds());
												this.selectCanvases(o, t);
											}
										}),
										(e.prototype.setEnabled = function (e) {
											this.isEnabled = e;
											for (var t = this.getAll(), n = 0; n < t.length; n++) {
												var i = t[n];
												(i.multiSelectEnabled = this.isEnabled), e || (i.multiSelected = !1);
											}
										}),
										e
									);
								})();
								e.MultiSelectState = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function e(e, t) {
										(this.value = e), (this.locale = t);
									}
									return e;
								})();
								e.Translation = t;
							})(t || (t = {}));
							var t;
							!(function (e) {
								var t = (function () {
									function e(e) {
										this.labels = e;
									}
									return (
										(e.prototype.format = function (e) {
											if (-1 != e.indexOf('<a')) return e;
											var t = this.labels[e] ? this.labels[e] : e;
											return '<a href="' + e + '">' + t + '</a>';
										}),
										e
									);
								})();
								e.UriLabeller = t;
							})(t || (t = {}));
						}.call(
							this,
							'undefined' != typeof global
								? global
								: 'undefined' != typeof self
								? self
								: 'undefined' != typeof window
								? window
								: {}
						));
					},
					{}
				]
			},
			{},
			[1]
		)(1);
	});
var Utils;
!(function (e) {
	var t = (function () {
		function e() {}
		return (
			(e.waitFor = function (t, n, i, o, r, s) {
				o || (o = 200),
					r || (r = 100),
					s || (s = 0),
					(s += 1),
					s > r
						? i && i()
						: t()
						? n()
						: setTimeout(function () {
								e.waitFor(t, n, i, o, r, s);
						  }, o);
			}),
			e
		);
	})();
	e.Async = t;
	var n = (function () {
		function e() {}
		return (
			(e.getBool = function (e, t) {
				return null === e || 'undefined' == typeof e ? t : e;
			}),
			e
		);
	})();
	e.Bools = n;
	var i = (function () {
		function e() {}
		return (
			(e.supportsCopy = function () {
				return document.queryCommandSupported && document.queryCommandSupported('copy');
			}),
			(e.copy = function (t) {
				t = e.convertBrToNewLine(t);
				var n = document.createElement('textarea');
				(n.value = t),
					e.hideButKeepEnabled(n),
					document.body.appendChild(n),
					n.focus(),
					n.select(),
					document.execCommand('copy'),
					document.body.removeChild(n);
			}),
			(e.hideButKeepEnabled = function (e) {
				(e.style.position = 'fixed'),
					(e.style.top = '0'),
					(e.style.left = '0'),
					(e.style.width = '2em'),
					(e.style.height = '2em'),
					(e.style.padding = '0'),
					(e.style.border = 'none'),
					(e.style.outline = 'none'),
					(e.style.boxShadow = 'none'),
					(e.style.background = 'transparent');
			}),
			(e.convertBrToNewLine = function (e) {
				var t = /<br\s*[\/]?>/gi;
				return (e = e.replace(t, '\n'));
			}),
			e
		);
	})();
	e.Clipboard = i;
	var o = (function () {
		function e() {}
		return (
			(e.float32ColorToARGB = function (e) {
				var t = (4278190080 & e) >>> 24,
					n = (16711680 & e) >>> 16,
					i = (65280 & e) >>> 8,
					o = 255 & e,
					r = [t, n, i, o];
				return r;
			}),
			(e._componentToHex = function (e) {
				var t = e.toString(16);
				return 1 == t.length ? '0' + t : t;
			}),
			(e.rgbToHexString = function (t) {
				return (
					e.coalesce(t),
					'#' + e._componentToHex(t[0]) + e._componentToHex(t[1]) + e._componentToHex(t[2])
				);
			}),
			(e.argbToHexString = function (t) {
				return (
					'#' +
					e._componentToHex(t[0]) +
					e._componentToHex(t[1]) +
					e._componentToHex(t[2]) +
					e._componentToHex(t[3])
				);
			}),
			(e.coalesce = function (e) {
				for (var t = 1; t < e.length; t++) 'undefined' == typeof e[t] && (e[t] = e[t - 1]);
			}),
			e
		);
	})();
	e.Colors = o;
	var r = (function () {
		function e() {}
		return (
			(e.getTimeStamp = function () {
				return new Date().getTime();
			}),
			e
		);
	})();
	e.Dates = r;
	var s = (function () {
		function e() {}
		return (
			(e.getPixelRatio = function (e) {
				var t = window.devicePixelRatio || 1,
					n =
						e.webkitBackingStorePixelRatio ||
						e.mozBackingStorePixelRatio ||
						e.msBackingStorePixelRatio ||
						e.oBackingStorePixelRatio ||
						e.backingStorePixelRatio ||
						1;
				return t / n;
			}),
			(e.isTouch = function () {
				return !!('ontouchstart' in window) || window.navigator.msMaxTouchPoints > 0;
			}),
			e
		);
	})();
	e.Device = s;
	var a = (function () {
		function e() {}
		return (
			(e.isInIFrame = function () {
				try {
					return window.self !== window.top;
				} catch (e) {
					return !0;
				}
			}),
			(e.supportsFullscreen = function () {
				var e = document.documentElement,
					t =
						e.requestFullscreen ||
						e.mozRequestFullScreen ||
						e.webkitRequestFullScreen ||
						e.msRequestFullscreen;
				return void 0 !== t;
			}),
			(e.isHidden = function () {
				var t = e.getHiddenProp();
				return t ? !0 : !1;
			}),
			(e.getHiddenProp = function () {
				var e = ['webkit', 'moz', 'ms', 'o'];
				if ('hidden' in document) return 'hidden';
				for (var t = 0; t < e.length; t++) if (e[t] + 'Hidden' in document) return e[t] + 'Hidden';
				return null;
			}),
			e
		);
	})();
	e.Documents = a;
	var u = (function () {
		function e() {}
		return (
			(e.debounce = function (e, t) {
				return (
					(t = t || 100),
					function () {
						if (!e.debouncing) {
							var n = Array.prototype.slice.apply(arguments);
							(e.lastReturnVal = e.apply(window, n)), (e.debouncing = !0);
						}
						return (
							clearTimeout(e.debounceTimeout),
							(e.debounceTimeout = setTimeout(function () {
								e.debouncing = !1;
							}, t)),
							e.lastReturnVal
						);
					}
				);
			}),
			e
		);
	})();
	e.Events = u;
	var l = (function () {
		function e() {}
		return (
			(e.simplifyMimeType = function (e) {
				switch (e) {
					case 'text/plain':
						return 'txt';
					case 'image/jpeg':
						return 'jpg';
					case 'application/msword':
						return 'doc';
					case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
						return 'docx';
					default:
						var t = e.split('/');
						return t[t.length - 1];
				}
			}),
			e
		);
	})();
	e.Files = l;
	var c = (function () {
		function e() {}
		return (
			(e.getCharCode = function (e) {
				var t = 'number' == typeof e.which ? e.which : e.keyCode;
				return t;
			}),
			e
		);
	})();
	e.Keyboard = c;
	var h = (function () {
		function e() {}
		return (
			(e.normalise = function (e, t, n) {
				return (e - t) / (n - t);
			}),
			(e.median = function (e) {
				e.sort(function (e, t) {
					return e - t;
				});
				var t = Math.floor(e.length / 2);
				return e.length % 2 ? e[t] : (e[t - 1] + e[t]) / 2;
			}),
			(e.clamp = function (e, t, n) {
				return Math.min(Math.max(e, t), n);
			}),
			e
		);
	})();
	e.Maths = h;
	var p = (function () {
		function e(e, t) {
			(this.width = e), (this.height = t);
		}
		return e;
	})();
	e.Size = p;
	var d = (function () {
		function e() {}
		return (
			(e.fitRect = function (e, t, n, i) {
				var o,
					r = t / e,
					s = i / n,
					a = 0,
					u = 0;
				return (
					s > r ? ((o = n / e), (a = e * o), (u = t * o)) : ((o = i / t), (a = e * o), (u = t * o)),
					new p(Math.floor(a), Math.floor(u))
				);
			}),
			(e.hitRect = function (e, t, n, i, o, r) {
				return o > e && e + n > o && r > t && t + i > r ? !0 : !1;
			}),
			e
		);
	})();
	e.Dimensions = d;
	var f = (function () {
		function e() {}
		return (
			(e.numericalInput = function (e) {
				return 46 == e.keyCode ||
					8 == e.keyCode ||
					9 == e.keyCode ||
					27 == e.keyCode ||
					(65 == e.keyCode && e.ctrlKey === !0) ||
					(e.keyCode >= 35 && e.keyCode <= 39)
					? !0
					: e.shiftKey ||
					  ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))
					? (e.preventDefault(), !1)
					: !0;
			}),
			e
		);
	})();
	e.Numbers = f;
	var g = (function () {
		function e() {}
		return (
			(e.toPlainObject = function (e) {
				e = Object(e);
				var t = {};
				for (var n in e) t[n] = e[n];
				return t;
			}),
			e
		);
	})();
	e.Objects = g;
	var v = (function () {
		function e() {}
		return (
			(e.clear = function (e) {
				switch ((void 0 === e && (e = y.memory), e.value)) {
					case y.memory.value:
						this._memoryStorage = {};
						break;
					case y.session.value:
						sessionStorage.clear();
						break;
					case y.local.value:
						localStorage.clear();
				}
			}),
			(e.clearExpired = function (e) {
				void 0 === e && (e = y.memory);
				for (var t = this.getItems(e), n = 0; n < t.length; n++) {
					var i = t[n];
					this._isExpired(i) && this.remove(i.key);
				}
			}),
			(e.get = function (e, t) {
				void 0 === t && (t = y.memory);
				var n = null;
				switch (t.value) {
					case y.memory.value:
						n = this._memoryStorage[e];
						break;
					case y.session.value:
						n = sessionStorage.getItem(e);
						break;
					case y.local.value:
						n = localStorage.getItem(e);
				}
				if (!n) return null;
				var i = null;
				try {
					i = JSON.parse(n);
				} catch (o) {
					return null;
				}
				return i ? (this._isExpired(i) ? null : ((i.key = e), i)) : null;
			}),
			(e._isExpired = function (e) {
				return new Date().getTime() < e.expiresAt ? !1 : !0;
			}),
			(e.getItems = function (e) {
				void 0 === e && (e = y.memory);
				var t = [];
				switch (e.value) {
					case y.memory.value:
						for (var n = Object.keys(this._memoryStorage), i = 0; i < n.length; i++) {
							var o = this.get(n[i], y.memory);
							o && t.push(o);
						}
						break;
					case y.session.value:
						for (var i = 0; i < sessionStorage.length; i++) {
							var r = sessionStorage.key(i);
							if (r) {
								var o = this.get(r, y.session);
								o && t.push(o);
							}
						}
						break;
					case y.local.value:
						for (var i = 0; i < localStorage.length; i++) {
							var r = localStorage.key(i);
							if (r) {
								var o = this.get(r, y.local);
								o && t.push(o);
							}
						}
				}
				return t;
			}),
			(e.remove = function (e, t) {
				switch ((void 0 === t && (t = y.memory), t.value)) {
					case y.memory.value:
						delete this._memoryStorage[e];
						break;
					case y.session.value:
						sessionStorage.removeItem(e);
						break;
					case y.local.value:
						localStorage.removeItem(e);
				}
			}),
			(e.set = function (e, t, n, i) {
				void 0 === i && (i = y.memory);
				var o = 1e3 * n,
					r = new m();
				switch (((r.value = t), (r.expiresAt = new Date().getTime() + o), i.value)) {
					case y.memory.value:
						this._memoryStorage[e] = JSON.stringify(r);
						break;
					case y.session.value:
						sessionStorage.setItem(e, JSON.stringify(r));
						break;
					case y.local.value:
						localStorage.setItem(e, JSON.stringify(r));
				}
				return r;
			}),
			(e._memoryStorage = {}),
			e
		);
	})();
	e.Storage = v;
	var m = (function () {
		function e() {}
		return e;
	})();
	e.StorageItem = m;
	var y = (function () {
		function e(e) {
			this.value = e;
		}
		return (
			(e.prototype.toString = function () {
				return this.value;
			}),
			(e.memory = new e('memory')),
			(e.session = new e('session')),
			(e.local = new e('local')),
			e
		);
	})();
	e.StorageType = y;
	var b = (function () {
		function e() {}
		return (
			(e.ellipsis = function (e, t) {
				if (e.length <= t) return e;
				var n = e.substr(0, t),
					i = n.lastIndexOf(' ');
				return -1 != i && (n = n.substr(0, Math.min(n.length, i))), n + '&hellip;';
			}),
			(e.htmlDecode = function (e) {
				var t = document.createElement('div');
				return (t.innerHTML = e), t.firstChild.nodeValue;
			}),
			(e.format = function (e) {
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				for (var i = 0; i < t.length; i++) {
					var o = new RegExp('\\{' + i + '\\}', 'gm');
					e = e.replace(o, t[i]);
				}
				return e;
			}),
			(e.isAlphanumeric = function (e) {
				return /^[a-zA-Z0-9]*$/.test(e);
			}),
			(e.toCssClass = function (e) {
				return e.replace(/[^a-z0-9]/g, function (e) {
					var t = e.charCodeAt(0);
					return 32 == t
						? '-'
						: t >= 65 && 90 >= t
						? '_' + e.toLowerCase()
						: '__' + ('000' + t.toString(16)).slice(-4);
				});
			}),
			(e.toFileName = function (e) {
				return e.replace(/[^a-z0-9]/gi, '_').toLowerCase();
			}),
			(e.utf8_to_b64 = function (e) {
				return window.btoa(unescape(encodeURIComponent(e)));
			}),
			e
		);
	})();
	e.Strings = b;
	var E = (function () {
		function e() {}
		return (
			(e.getHashParameter = function (e, t) {
				return (
					t || (t = window.document),
					t && t.location ? this.getHashParameterFromString(e, t.location.hash) : null
				);
			}),
			(e.getHashParameterFromString = function (e, t) {
				var n = new RegExp('#.*[?&]' + e + '=([^&]+)(&|$)'),
					i = n.exec(t);
				return i ? decodeURIComponent(i[1].replace(/\+/g, ' ')) : null;
			}),
			(e.setHashParameter = function (e, t, n) {
				if ((n || (n = window.document), n && n.location)) {
					var i = this.updateURIKeyValuePair(n.location.hash.replace('#?', ''), e, t),
						o = '#?' + i,
						r = n.URL,
						s = r.indexOf('#');
					-1 != s && (r = r.substr(0, r.indexOf('#'))), n.location.replace(r + o);
				}
			}),
			(e.getQuerystringParameter = function (e, t) {
				return t || (t = window), this.getQuerystringParameterFromString(e, t.location.search);
			}),
			(e.getQuerystringParameterFromString = function (e, t) {
				e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
				var n = new RegExp('[\\?&]' + e + '=([^&#]*)'),
					i = n.exec(t);
				return i ? decodeURIComponent(i[1].replace(/\+/g, ' ')) : null;
			}),
			(e.setQuerystringParameter = function (e, t, n) {
				if ((n || (n = window.document), n && n.location)) {
					var i = this.updateURIKeyValuePair(n.location.hash.replace('#?', ''), e, t);
					window.location.search = i;
				}
			}),
			(e.updateURIKeyValuePair = function (e, t, n) {
				(t = encodeURIComponent(t)), (n = encodeURIComponent(n));
				var i = e.split('&');
				'' == i[0] && i.shift();
				for (var o, r = i.length; r--; )
					if (((o = i[r].split('=')), o[0] == t)) {
						(o[1] = n), (i[r] = o.join('='));
						break;
					}
				return 0 > r && (i[i.length] = [t, n].join('=')), i.join('&');
			}),
			(e.getUrlParts = function (e) {
				var t = document.createElement('a');
				return (t.href = e), t;
			}),
			(e.convertToRelativeUrl = function (e) {
				var t = this.getUrlParts(e),
					n = t.pathname + t.searchWithin;
				return n.startsWith('/') || (n = '/' + n), n;
			}),
			e
		);
	})();
	e.Urls = E;
})(Utils || (Utils = {})),
	(window.Utils = Utils),
	define('lib/Utils.js', function () {}),
	(function e(t, n, i) {
		function o(s, a) {
			if (!n[s]) {
				if (!t[s]) {
					var u = 'function' == typeof require && require;
					if (!a && u) return u(s, !0);
					if (r) return r(s, !0);
					var l = new Error("Cannot find module '" + s + "'");
					throw ((l.code = 'MODULE_NOT_FOUND'), l);
				}
				var c = (n[s] = { exports: {} });
				t[s][0].call(
					c.exports,
					function (e) {
						var n = t[s][1][e];
						return o(n ? n : e);
					},
					c,
					c.exports,
					e,
					t,
					n,
					i
				);
			}
			return n[s].exports;
		}
		for (var r = 'function' == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
		return o;
	})(
		{
			1: [
				function (e, t, n) {
					function i() {
						return {
							a: ['target', 'href', 'title'],
							abbr: ['title'],
							address: [],
							area: ['shape', 'coords', 'href', 'alt'],
							article: [],
							aside: [],
							audio: ['autoplay', 'controls', 'loop', 'preload', 'src'],
							b: [],
							bdi: ['dir'],
							bdo: ['dir'],
							big: [],
							blockquote: ['cite'],
							br: [],
							caption: [],
							center: [],
							cite: [],
							code: [],
							col: ['align', 'valign', 'span', 'width'],
							colgroup: ['align', 'valign', 'span', 'width'],
							dd: [],
							del: ['datetime'],
							details: ['open'],
							div: [],
							dl: [],
							dt: [],
							em: [],
							font: ['color', 'size', 'face'],
							footer: [],
							h1: [],
							h2: [],
							h3: [],
							h4: [],
							h5: [],
							h6: [],
							header: [],
							hr: [],
							i: [],
							img: ['src', 'alt', 'title', 'width', 'height'],
							ins: ['datetime'],
							li: [],
							mark: [],
							nav: [],
							ol: [],
							p: [],
							pre: [],
							s: [],
							section: [],
							small: [],
							span: [],
							sub: [],
							sup: [],
							strong: [],
							table: ['width', 'border', 'align', 'valign'],
							tbody: ['align', 'valign'],
							td: ['width', 'rowspan', 'colspan', 'align', 'valign'],
							tfoot: ['align', 'valign'],
							th: ['width', 'rowspan', 'colspan', 'align', 'valign'],
							thead: ['align', 'valign'],
							tr: ['rowspan', 'align', 'valign'],
							tt: [],
							u: [],
							ul: [],
							video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width']
						};
					}
					function o(e, t, n) {}
					function r(e, t, n) {}
					function s(e, t, n) {}
					function a(e, t, n) {}
					function u(e) {
						return e.replace($, '&lt;').replace(I, '&gt;');
					}
					function l(e, t, n, i) {
						if (((n = g(n)), 'href' === t || 'src' === t)) {
							if (((n = S.trim(n)), '#' === n)) return '#';
							if (
								'http://' !== n.substr(0, 7) &&
								'https://' !== n.substr(0, 8) &&
								'mailto:' !== n.substr(0, 7) &&
								'tel:' !== n.substr(0, 4) &&
								'#' !== n[0] &&
								'/' !== n[0]
							)
								return '';
						} else if ('background' === t) {
							if (((P.lastIndex = 0), P.test(n))) return '';
						} else if ('style' === t) {
							if (((D.lastIndex = 0), D.test(n))) return '';
							if (((B.lastIndex = 0), B.test(n) && ((P.lastIndex = 0), P.test(n)))) return '';
							i !== !1 && ((i = i || x), (n = i.process(n)));
						}
						return (n = v(n));
					}
					function c(e) {
						return e.replace(T, '&quot;');
					}
					function h(e) {
						return e.replace(O, '"');
					}
					function p(e) {
						return e.replace(A, function (e, t) {
							return 'x' === t[0] || 'X' === t[0]
								? String.fromCharCode(parseInt(t.substr(1), 16))
								: String.fromCharCode(parseInt(t, 10));
						});
					}
					function d(e) {
						return e.replace(C, ':').replace(R, ' ');
					}
					function f(e) {
						for (var t = '', n = 0, i = e.length; i > n; n++)
							t += e.charCodeAt(n) < 32 ? ' ' : e.charAt(n);
						return S.trim(t);
					}
					function g(e) {
						return (e = h(e)), (e = p(e)), (e = d(e)), (e = f(e));
					}
					function v(e) {
						return (e = c(e)), (e = u(e));
					}
					function m() {
						return '';
					}
					function y(e, t) {
						function n(t) {
							return i ? !0 : -1 !== S.indexOf(e, t);
						}
						'function' != typeof t && (t = function () {});
						var i = !Array.isArray(e),
							o = [],
							r = !1;
						return {
							onIgnoreTag: function (e, i, s) {
								if (n(e)) {
									if (s.isClosing) {
										var a = '[/removed]',
											u = s.position + a.length;
										return o.push([r !== !1 ? r : s.position, u]), (r = !1), a;
									}
									return r || (r = s.position), '[removed]';
								}
								return t(e, i, s);
							},
							remove: function (e) {
								var t = '',
									n = 0;
								return (
									S.forEach(o, function (i) {
										(t += e.slice(n, i[0])), (n = i[1]);
									}),
									(t += e.slice(n))
								);
							}
						};
					}
					function b(e) {
						return e.replace(N, '');
					}
					function E(e) {
						var t = e.split('');
						return (
							(t = t.filter(function (e) {
								var t = e.charCodeAt(0);
								return 127 === t ? !1 : 31 >= t ? (10 === t || 13 === t ? !0 : !1) : !0;
							})),
							t.join('')
						);
					}
					var _ = e('cssfilter').FilterCSS,
						w = e('cssfilter').getDefaultWhiteList,
						S = e('./util'),
						x = new _(),
						$ = /</g,
						I = />/g,
						T = /"/g,
						O = /&quot;/g,
						A = /&#([a-zA-Z0-9]*);?/gim,
						C = /&colon;?/gim,
						R = /&newline;?/gim,
						P =
							/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,
						D = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,
						B = /u\s*r\s*l\s*\(.*/gi,
						N = /<!--[\s\S]*?-->/g;
					(n.whiteList = i()),
						(n.getDefaultWhiteList = i),
						(n.onTag = o),
						(n.onIgnoreTag = r),
						(n.onTagAttr = s),
						(n.onIgnoreTagAttr = a),
						(n.safeAttrValue = l),
						(n.escapeHtml = u),
						(n.escapeQuote = c),
						(n.unescapeQuote = h),
						(n.escapeHtmlEntities = p),
						(n.escapeDangerHtml5Entities = d),
						(n.clearNonPrintableCharacter = f),
						(n.friendlyAttrValue = g),
						(n.escapeAttrValue = v),
						(n.onIgnoreTagStripAll = m),
						(n.StripTagBody = y),
						(n.stripCommentTag = b),
						(n.stripBlankChar = E),
						(n.cssFilter = x),
						(n.getDefaultCSSWhiteList = w);
				},
				{ './util': 4, cssfilter: 8 }
			],
			2: [
				function (e, t, n) {
					function i(e, t) {
						var n = new a(t);
						return n.process(e);
					}
					function o() {
						return (
							'undefined' != typeof self &&
							'undefined' != typeof DedicatedWorkerGlobalScope &&
							self instanceof DedicatedWorkerGlobalScope
						);
					}
					var r = e('./default'),
						s = e('./parser'),
						a = e('./xss');
					(n = t.exports = i), (n.FilterXSS = a);
					for (var u in r) n[u] = r[u];
					for (var u in s) n[u] = s[u];
					'undefined' != typeof window && (window.filterXSS = t.exports),
						o() && (self.filterXSS = t.exports);
				},
				{ './default': 1, './parser': 3, './xss': 5 }
			],
			3: [
				function (e, t, n) {
					function i(e) {
						var t = h.spaceIndex(e);
						if (-1 === t) var n = e.slice(1, -1);
						else var n = e.slice(1, t + 1);
						return (
							(n = h.trim(n).toLowerCase()),
							'/' === n.slice(0, 1) && (n = n.slice(1)),
							'/' === n.slice(-1) && (n = n.slice(0, -1)),
							n
						);
					}
					function o(e) {
						return '</' === e.slice(0, 2);
					}
					function r(e, t, n) {
						'user strict';
						var r = '',
							s = 0,
							a = !1,
							u = !1,
							l = 0,
							c = e.length,
							h = '',
							p = '';
						for (l = 0; c > l; l++) {
							var d = e.charAt(l);
							if (a === !1) {
								if ('<' === d) {
									a = l;
									continue;
								}
							} else if (u === !1) {
								if ('<' === d) {
									(r += n(e.slice(s, l))), (a = l), (s = l);
									continue;
								}
								if ('>' === d) {
									(r += n(e.slice(s, a))),
										(p = e.slice(a, l + 1)),
										(h = i(p)),
										(r += t(a, r.length, h, p, o(p))),
										(s = l + 1),
										(a = !1);
									continue;
								}
								if (('"' === d || "'" === d) && '=' === e.charAt(l - 1)) {
									u = d;
									continue;
								}
							} else if (d === u) {
								u = !1;
								continue;
							}
						}
						return s < e.length && (r += n(e.substr(s))), r;
					}
					function s(e, t) {
						'user strict';
						function n(e, n) {
							if (((e = h.trim(e)), (e = e.replace(p, '').toLowerCase()), !(e.length < 1))) {
								var i = t(e, n || '');
								i && o.push(i);
							}
						}
						for (var i = 0, o = [], r = !1, s = e.length, l = 0; s > l; l++) {
							var d,
								f,
								g = e.charAt(l);
							if (r !== !1 || '=' !== g)
								if (r === !1 || l !== i || ('"' !== g && "'" !== g) || '=' !== e.charAt(l - 1))
									if (/\s|\n|\t/.test(g)) {
										if (((e = e.replace(/\s|\n|\t/g, ' ')), r === !1)) {
											if (((f = a(e, l)), -1 === f)) {
												(d = h.trim(e.slice(i, l))), n(d), (r = !1), (i = l + 1);
												continue;
											}
											l = f - 1;
											continue;
										}
										if (((f = u(e, l - 1)), -1 === f)) {
											(d = h.trim(e.slice(i, l))), (d = c(d)), n(r, d), (r = !1), (i = l + 1);
											continue;
										}
									} else;
								else {
									if (((f = e.indexOf(g, l + 1)), -1 === f)) break;
									(d = h.trim(e.slice(i + 1, f))), n(r, d), (r = !1), (l = f), (i = l + 1);
								}
							else (r = e.slice(i, l)), (i = l + 1);
						}
						return (
							i < e.length && (r === !1 ? n(e.slice(i)) : n(r, c(h.trim(e.slice(i))))),
							h.trim(o.join(' '))
						);
					}
					function a(e, t) {
						for (; t < e.length; t++) {
							var n = e[t];
							if (' ' !== n) return '=' === n ? t : -1;
						}
					}
					function u(e, t) {
						for (; t > 0; t--) {
							var n = e[t];
							if (' ' !== n) return '=' === n ? t : -1;
						}
					}
					function l(e) {
						return ('"' === e[0] && '"' === e[e.length - 1]) ||
							("'" === e[0] && "'" === e[e.length - 1])
							? !0
							: !1;
					}
					function c(e) {
						return l(e) ? e.substr(1, e.length - 2) : e;
					}
					var h = e('./util'),
						p = /[^a-zA-Z0-9_:\.\-]/gim;
					(n.parseTag = r), (n.parseAttr = s);
				},
				{ './util': 4 }
			],
			4: [
				function (e, t, n) {
					t.exports = {
						indexOf: function (e, t) {
							var n, i;
							if (Array.prototype.indexOf) return e.indexOf(t);
							for (n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
							return -1;
						},
						forEach: function (e, t, n) {
							var i, o;
							if (Array.prototype.forEach) return e.forEach(t, n);
							for (i = 0, o = e.length; o > i; i++) t.call(n, e[i], i, e);
						},
						trim: function (e) {
							return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, '');
						},
						spaceIndex: function (e) {
							var t = /\s|\n|\t/,
								n = t.exec(e);
							return n ? n.index : -1;
						}
					};
				},
				{}
			],
			5: [
				function (e, t, n) {
					function i(e) {
						return void 0 === e || null === e;
					}
					function o(e) {
						var t = p.spaceIndex(e);
						if (-1 === t) return { html: '', closing: '/' === e[e.length - 2] };
						e = p.trim(e.slice(t + 1, -1));
						var n = '/' === e[e.length - 1];
						return n && (e = p.trim(e.slice(0, -1))), { html: e, closing: n };
					}
					function r(e) {
						var t = {};
						for (var n in e) t[n] = e[n];
						return t;
					}
					function s(e) {
						(e = r(e || {})),
							e.stripIgnoreTag &&
								(e.onIgnoreTag &&
									console.error(
										'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
									),
								(e.onIgnoreTag = u.onIgnoreTagStripAll)),
							(e.whiteList = e.whiteList || u.whiteList),
							(e.onTag = e.onTag || u.onTag),
							(e.onTagAttr = e.onTagAttr || u.onTagAttr),
							(e.onIgnoreTag = e.onIgnoreTag || u.onIgnoreTag),
							(e.onIgnoreTagAttr = e.onIgnoreTagAttr || u.onIgnoreTagAttr),
							(e.safeAttrValue = e.safeAttrValue || u.safeAttrValue),
							(e.escapeHtml = e.escapeHtml || u.escapeHtml),
							(this.options = e),
							e.css === !1
								? (this.cssFilter = !1)
								: ((e.css = e.css || {}), (this.cssFilter = new a(e.css)));
					}
					var a = e('cssfilter').FilterCSS,
						u = e('./default'),
						l = e('./parser'),
						c = l.parseTag,
						h = l.parseAttr,
						p = e('./util');
					(s.prototype.process = function (e) {
						if (((e = e || ''), (e = e.toString()), !e)) return '';
						var t = this,
							n = t.options,
							r = n.whiteList,
							s = n.onTag,
							a = n.onIgnoreTag,
							l = n.onTagAttr,
							d = n.onIgnoreTagAttr,
							f = n.safeAttrValue,
							g = n.escapeHtml,
							v = t.cssFilter;
						n.stripBlankChar && (e = u.stripBlankChar(e)),
							n.allowCommentTag || (e = u.stripCommentTag(e));
						var m = !1;
						if (n.stripIgnoreTagBody) {
							var m = u.StripTagBody(n.stripIgnoreTagBody, a);
							a = m.onIgnoreTag;
						}
						var y = c(
							e,
							function (e, t, n, u, c) {
								var m = {
										sourcePosition: e,
										position: t,
										isClosing: c,
										isWhite: r.hasOwnProperty(n)
									},
									y = s(n, u, m);
								if (!i(y)) return y;
								if (m.isWhite) {
									if (m.isClosing) return '</' + n + '>';
									var b = o(u),
										E = r[n],
										_ = h(b.html, function (e, t) {
											var o = -1 !== p.indexOf(E, e),
												r = l(n, e, t, o);
											if (!i(r)) return r;
											if (o) return (t = f(n, e, t, v)), t ? e + '="' + t + '"' : e;
											var r = d(n, e, t, o);
											return i(r) ? void 0 : r;
										}),
										u = '<' + n;
									return _ && (u += ' ' + _), b.closing && (u += ' /'), (u += '>');
								}
								var y = a(n, u, m);
								return i(y) ? g(u) : y;
							},
							g
						);
						return m && (y = m.remove(y)), y;
					}),
						(t.exports = s);
				},
				{ './default': 1, './parser': 3, './util': 4, cssfilter: 8 }
			],
			6: [
				function (e, t, n) {
					function i(e) {
						return void 0 === e || null === e;
					}
					function o(e) {
						var t = {};
						for (var n in e) t[n] = e[n];
						return t;
					}
					function r(e) {
						(e = o(e || {})),
							(e.whiteList = e.whiteList || s.whiteList),
							(e.onAttr = e.onAttr || s.onAttr),
							(e.onIgnoreAttr = e.onIgnoreAttr || s.onIgnoreAttr),
							(e.safeAttrValue = e.safeAttrValue || s.safeAttrValue),
							(this.options = e);
					}
					var s = e('./default'),
						a = e('./parser');
					e('./util');
					(r.prototype.process = function (e) {
						if (((e = e || ''), (e = e.toString()), !e)) return '';
						var t = this,
							n = t.options,
							o = n.whiteList,
							r = n.onAttr,
							s = n.onIgnoreAttr,
							u = n.safeAttrValue,
							l = a(e, function (e, t, n, a, l) {
								var c = o[n],
									h = !1;
								if (
									(c === !0
										? (h = c)
										: 'function' == typeof c
										? (h = c(a))
										: c instanceof RegExp && (h = c.test(a)),
									h !== !0 && (h = !1),
									(a = u(n, a)))
								) {
									var p = { position: t, sourcePosition: e, source: l, isWhite: h };
									if (h) {
										var d = r(n, a, p);
										return i(d) ? n + ':' + a : d;
									}
									var d = s(n, a, p);
									return i(d) ? void 0 : d;
								}
							});
						return l;
					}),
						(t.exports = r);
				},
				{ './default': 7, './parser': 9, './util': 10 }
			],
			7: [
				function (e, t, n) {
					function i() {
						var e = {};
						return (
							(e['align-content'] = !1),
							(e['align-items'] = !1),
							(e['align-self'] = !1),
							(e['alignment-adjust'] = !1),
							(e['alignment-baseline'] = !1),
							(e.all = !1),
							(e['anchor-point'] = !1),
							(e.animation = !1),
							(e['animation-delay'] = !1),
							(e['animation-direction'] = !1),
							(e['animation-duration'] = !1),
							(e['animation-fill-mode'] = !1),
							(e['animation-iteration-count'] = !1),
							(e['animation-name'] = !1),
							(e['animation-play-state'] = !1),
							(e['animation-timing-function'] = !1),
							(e.azimuth = !1),
							(e['backface-visibility'] = !1),
							(e.background = !0),
							(e['background-attachment'] = !0),
							(e['background-clip'] = !0),
							(e['background-color'] = !0),
							(e['background-image'] = !0),
							(e['background-origin'] = !0),
							(e['background-position'] = !0),
							(e['background-repeat'] = !0),
							(e['background-size'] = !0),
							(e['baseline-shift'] = !1),
							(e.binding = !1),
							(e.bleed = !1),
							(e['bookmark-label'] = !1),
							(e['bookmark-level'] = !1),
							(e['bookmark-state'] = !1),
							(e.border = !0),
							(e['border-bottom'] = !0),
							(e['border-bottom-color'] = !0),
							(e['border-bottom-left-radius'] = !0),
							(e['border-bottom-right-radius'] = !0),
							(e['border-bottom-style'] = !0),
							(e['border-bottom-width'] = !0),
							(e['border-collapse'] = !0),
							(e['border-color'] = !0),
							(e['border-image'] = !0),
							(e['border-image-outset'] = !0),
							(e['border-image-repeat'] = !0),
							(e['border-image-slice'] = !0),
							(e['border-image-source'] = !0),
							(e['border-image-width'] = !0),
							(e['border-left'] = !0),
							(e['border-left-color'] = !0),
							(e['border-left-style'] = !0),
							(e['border-left-width'] = !0),
							(e['border-radius'] = !0),
							(e['border-right'] = !0),
							(e['border-right-color'] = !0),
							(e['border-right-style'] = !0),
							(e['border-right-width'] = !0),
							(e['border-spacing'] = !0),
							(e['border-style'] = !0),
							(e['border-top'] = !0),
							(e['border-top-color'] = !0),
							(e['border-top-left-radius'] = !0),
							(e['border-top-right-radius'] = !0),
							(e['border-top-style'] = !0),
							(e['border-top-width'] = !0),
							(e['border-width'] = !0),
							(e.bottom = !1),
							(e['box-decoration-break'] = !0),
							(e['box-shadow'] = !0),
							(e['box-sizing'] = !0),
							(e['box-snap'] = !0),
							(e['box-suppress'] = !0),
							(e['break-after'] = !0),
							(e['break-before'] = !0),
							(e['break-inside'] = !0),
							(e['caption-side'] = !1),
							(e.chains = !1),
							(e.clear = !0),
							(e.clip = !1),
							(e['clip-path'] = !1),
							(e['clip-rule'] = !1),
							(e.color = !0),
							(e['color-interpolation-filters'] = !0),
							(e['column-count'] = !1),
							(e['column-fill'] = !1),
							(e['column-gap'] = !1),
							(e['column-rule'] = !1),
							(e['column-rule-color'] = !1),
							(e['column-rule-style'] = !1),
							(e['column-rule-width'] = !1),
							(e['column-span'] = !1),
							(e['column-width'] = !1),
							(e.columns = !1),
							(e.contain = !1),
							(e.content = !1),
							(e['counter-increment'] = !1),
							(e['counter-reset'] = !1),
							(e['counter-set'] = !1),
							(e.crop = !1),
							(e.cue = !1),
							(e['cue-after'] = !1),
							(e['cue-before'] = !1),
							(e.cursor = !1),
							(e.direction = !1),
							(e.display = !0),
							(e['display-inside'] = !0),
							(e['display-list'] = !0),
							(e['display-outside'] = !0),
							(e['dominant-baseline'] = !1),
							(e.elevation = !1),
							(e['empty-cells'] = !1),
							(e.filter = !1),
							(e.flex = !1),
							(e['flex-basis'] = !1),
							(e['flex-direction'] = !1),
							(e['flex-flow'] = !1),
							(e['flex-grow'] = !1),
							(e['flex-shrink'] = !1),
							(e['flex-wrap'] = !1),
							(e['float'] = !1),
							(e['float-offset'] = !1),
							(e['flood-color'] = !1),
							(e['flood-opacity'] = !1),
							(e['flow-from'] = !1),
							(e['flow-into'] = !1),
							(e.font = !0),
							(e['font-family'] = !0),
							(e['font-feature-settings'] = !0),
							(e['font-kerning'] = !0),
							(e['font-language-override'] = !0),
							(e['font-size'] = !0),
							(e['font-size-adjust'] = !0),
							(e['font-stretch'] = !0),
							(e['font-style'] = !0),
							(e['font-synthesis'] = !0),
							(e['font-variant'] = !0),
							(e['font-variant-alternates'] = !0),
							(e['font-variant-caps'] = !0),
							(e['font-variant-east-asian'] = !0),
							(e['font-variant-ligatures'] = !0),
							(e['font-variant-numeric'] = !0),
							(e['font-variant-position'] = !0),
							(e['font-weight'] = !0),
							(e.grid = !1),
							(e['grid-area'] = !1),
							(e['grid-auto-columns'] = !1),
							(e['grid-auto-flow'] = !1),
							(e['grid-auto-rows'] = !1),
							(e['grid-column'] = !1),
							(e['grid-column-end'] = !1),
							(e['grid-column-start'] = !1),
							(e['grid-row'] = !1),
							(e['grid-row-end'] = !1),
							(e['grid-row-start'] = !1),
							(e['grid-template'] = !1),
							(e['grid-template-areas'] = !1),
							(e['grid-template-columns'] = !1),
							(e['grid-template-rows'] = !1),
							(e['hanging-punctuation'] = !1),
							(e.height = !0),
							(e.hyphens = !1),
							(e.icon = !1),
							(e['image-orientation'] = !1),
							(e['image-resolution'] = !1),
							(e['ime-mode'] = !1),
							(e['initial-letters'] = !1),
							(e['inline-box-align'] = !1),
							(e['justify-content'] = !1),
							(e['justify-items'] = !1),
							(e['justify-self'] = !1),
							(e.left = !1),
							(e['letter-spacing'] = !0),
							(e['lighting-color'] = !0),
							(e['line-box-contain'] = !1),
							(e['line-break'] = !1),
							(e['line-grid'] = !1),
							(e['line-height'] = !1),
							(e['line-snap'] = !1),
							(e['line-stacking'] = !1),
							(e['line-stacking-ruby'] = !1),
							(e['line-stacking-shift'] = !1),
							(e['line-stacking-strategy'] = !1),
							(e['list-style'] = !0),
							(e['list-style-image'] = !0),
							(e['list-style-position'] = !0),
							(e['list-style-type'] = !0),
							(e.margin = !0),
							(e['margin-bottom'] = !0),
							(e['margin-left'] = !0),
							(e['margin-right'] = !0),
							(e['margin-top'] = !0),
							(e['marker-offset'] = !1),
							(e['marker-side'] = !1),
							(e.marks = !1),
							(e.mask = !1),
							(e['mask-box'] = !1),
							(e['mask-box-outset'] = !1),
							(e['mask-box-repeat'] = !1),
							(e['mask-box-slice'] = !1),
							(e['mask-box-source'] = !1),
							(e['mask-box-width'] = !1),
							(e['mask-clip'] = !1),
							(e['mask-image'] = !1),
							(e['mask-origin'] = !1),
							(e['mask-position'] = !1),
							(e['mask-repeat'] = !1),
							(e['mask-size'] = !1),
							(e['mask-source-type'] = !1),
							(e['mask-type'] = !1),
							(e['max-height'] = !0),
							(e['max-lines'] = !1),
							(e['max-width'] = !0),
							(e['min-height'] = !0),
							(e['min-width'] = !0),
							(e['move-to'] = !1),
							(e['nav-down'] = !1),
							(e['nav-index'] = !1),
							(e['nav-left'] = !1),
							(e['nav-right'] = !1),
							(e['nav-up'] = !1),
							(e['object-fit'] = !1),
							(e['object-position'] = !1),
							(e.opacity = !1),
							(e.order = !1),
							(e.orphans = !1),
							(e.outline = !1),
							(e['outline-color'] = !1),
							(e['outline-offset'] = !1),
							(e['outline-style'] = !1),
							(e['outline-width'] = !1),
							(e.overflow = !1),
							(e['overflow-wrap'] = !1),
							(e['overflow-x'] = !1),
							(e['overflow-y'] = !1),
							(e.padding = !0),
							(e['padding-bottom'] = !0),
							(e['padding-left'] = !0),
							(e['padding-right'] = !0),
							(e['padding-top'] = !0),
							(e.page = !1),
							(e['page-break-after'] = !1),
							(e['page-break-before'] = !1),
							(e['page-break-inside'] = !1),
							(e['page-policy'] = !1),
							(e.pause = !1),
							(e['pause-after'] = !1),
							(e['pause-before'] = !1),
							(e.perspective = !1),
							(e['perspective-origin'] = !1),
							(e.pitch = !1),
							(e['pitch-range'] = !1),
							(e['play-during'] = !1),
							(e.position = !1),
							(e['presentation-level'] = !1),
							(e.quotes = !1),
							(e['region-fragment'] = !1),
							(e.resize = !1),
							(e.rest = !1),
							(e['rest-after'] = !1),
							(e['rest-before'] = !1),
							(e.richness = !1),
							(e.right = !1),
							(e.rotation = !1),
							(e['rotation-point'] = !1),
							(e['ruby-align'] = !1),
							(e['ruby-merge'] = !1),
							(e['ruby-position'] = !1),
							(e['shape-image-threshold'] = !1),
							(e['shape-outside'] = !1),
							(e['shape-margin'] = !1),
							(e.size = !1),
							(e.speak = !1),
							(e['speak-as'] = !1),
							(e['speak-header'] = !1),
							(e['speak-numeral'] = !1),
							(e['speak-punctuation'] = !1),
							(e['speech-rate'] = !1),
							(e.stress = !1),
							(e['string-set'] = !1),
							(e['tab-size'] = !1),
							(e['table-layout'] = !1),
							(e['text-align'] = !0),
							(e['text-align-last'] = !0),
							(e['text-combine-upright'] = !0),
							(e['text-decoration'] = !0),
							(e['text-decoration-color'] = !0),
							(e['text-decoration-line'] = !0),
							(e['text-decoration-skip'] = !0),
							(e['text-decoration-style'] = !0),
							(e['text-emphasis'] = !0),
							(e['text-emphasis-color'] = !0),
							(e['text-emphasis-position'] = !0),
							(e['text-emphasis-style'] = !0),
							(e['text-height'] = !0),
							(e['text-indent'] = !0),
							(e['text-justify'] = !0),
							(e['text-orientation'] = !0),
							(e['text-overflow'] = !0),
							(e['text-shadow'] = !0),
							(e['text-space-collapse'] = !0),
							(e['text-transform'] = !0),
							(e['text-underline-position'] = !0),
							(e['text-wrap'] = !0),
							(e.top = !1),
							(e.transform = !1),
							(e['transform-origin'] = !1),
							(e['transform-style'] = !1),
							(e.transition = !1),
							(e['transition-delay'] = !1),
							(e['transition-duration'] = !1),
							(e['transition-property'] = !1),
							(e['transition-timing-function'] = !1),
							(e['unicode-bidi'] = !1),
							(e['vertical-align'] = !1),
							(e.visibility = !1),
							(e['voice-balance'] = !1),
							(e['voice-duration'] = !1),
							(e['voice-family'] = !1),
							(e['voice-pitch'] = !1),
							(e['voice-range'] = !1),
							(e['voice-rate'] = !1),
							(e['voice-stress'] = !1),
							(e['voice-volume'] = !1),
							(e.volume = !1),
							(e['white-space'] = !1),
							(e.widows = !1),
							(e.width = !0),
							(e['will-change'] = !1),
							(e['word-break'] = !0),
							(e['word-spacing'] = !0),
							(e['word-wrap'] = !0),
							(e['wrap-flow'] = !1),
							(e['wrap-through'] = !1),
							(e['writing-mode'] = !1),
							(e['z-index'] = !1),
							e
						);
					}
					function o(e, t, n) {}
					function r(e, t, n) {}
					function s(e, t) {
						return a.test(t) ? '' : t;
					}
					var a = /javascript\s*\:/gim;
					(n.whiteList = i()),
						(n.getDefaultWhiteList = i),
						(n.onAttr = o),
						(n.onIgnoreAttr = r),
						(n.safeAttrValue = s);
				},
				{}
			],
			8: [
				function (e, t, n) {
					function i(e, t) {
						var n = new r(t);
						return n.process(e);
					}
					var o = e('./default'),
						r = e('./css');
					(n = t.exports = i), (n.FilterCSS = r);
					for (var s in o) n[s] = o[s];
					'undefined' != typeof window && (window.filterCSS = t.exports);
				},
				{ './css': 6, './default': 7 }
			],
			9: [
				function (e, t, n) {
					function i(e, t) {
						function n() {
							if (!r) {
								var n = o.trim(e.slice(s, a)),
									i = n.indexOf(':');
								if (-1 !== i) {
									var l = o.trim(n.slice(0, i)),
										c = o.trim(n.slice(i + 1));
									if (l) {
										var h = t(s, u.length, l, c, n);
										h && (u += h + '; ');
									}
								}
							}
							s = a + 1;
						}
						(e = o.trimRight(e)), ';' !== e[e.length - 1] && (e += ';');
						for (var i = e.length, r = !1, s = 0, a = 0, u = ''; i > a; a++) {
							var l = e[a];
							if ('/' === l && '*' === e[a + 1]) {
								var c = e.indexOf('*/', a + 2);
								if (-1 === c) break;
								(a = c + 1), (s = a + 1), (r = !1);
							} else
								'(' === l
									? (r = !0)
									: ')' === l
									? (r = !1)
									: ';' === l
									? r || n()
									: '\n' === l && n();
						}
						return o.trim(u);
					}
					var o = e('./util');
					t.exports = i;
				},
				{ './util': 10 }
			],
			10: [
				function (e, t, n) {
					t.exports = {
						indexOf: function (e, t) {
							var n, i;
							if (Array.prototype.indexOf) return e.indexOf(t);
							for (n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
							return -1;
						},
						forEach: function (e, t, n) {
							var i, o;
							if (Array.prototype.forEach) return e.forEach(t, n);
							for (i = 0, o = e.length; o > i; i++) t.call(n, e[i], i, e);
						},
						trim: function (e) {
							return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, '');
						},
						trimRight: function (e) {
							return String.prototype.trimRight ? e.trimRight() : e.replace(/(\s*$)/g, '');
						}
					};
				},
				{}
			]
		},
		{},
		[2]
	),
	define('lib/xss.min.js', function () {}),
	define('UVDataProvider', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e) {
				(this.readonly = !1), (this.readonly = e);
			}
			return (
				(e.prototype.get = function (e, t) {
					return null;
				}),
				(e.prototype.set = function (e, t) {}),
				e
			);
		})();
		t.UVDataProvider = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('URLDataProvider', ['require', 'exports', './UVDataProvider'], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.get = function (e, t) {
				return Utils.Urls.getHashParameter(e, document) || t;
			}),
			(t.prototype.set = function (e, t) {
				this.readonly ||
					(t
						? Utils.Urls.setHashParameter(e, t.toString(), document)
						: Utils.Urls.setHashParameter(e, '', document));
			}),
			t
		);
	})(n.UVDataProvider);
	t['default'] = i;
}),
	define('modules/uv-shared-module/BaseEvents', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return (
				(e.ACCEPT_TERMS = 'acceptTerms'),
				(e.ANNOTATION_CANVAS_CHANGED = 'annotationCanvasChanged'),
				(e.ANNOTATION_CHANGED = 'annotationChanged'),
				(e.ANNOTATIONS_CLEARED = 'annotationsCleared'),
				(e.ANNOTATIONS_EMPTY = 'annotationsEmpty'),
				(e.ANNOTATIONS = 'annotations'),
				(e.BOOKMARK = 'bookmark'),
				(e.CANVAS_INDEX_CHANGE_FAILED = 'canvasIndexChangeFailed'),
				(e.CANVAS_INDEX_CHANGED = 'canvasIndexChanged'),
				(e.CLEAR_ANNOTATIONS = 'clearAnnotations'),
				(e.CLICKTHROUGH = 'clickthrough'),
				(e.CLOSE_ACTIVE_DIALOGUE = 'closeActiveDialogue'),
				(e.CLOSE_LEFT_PANEL = 'closeLeftPanel'),
				(e.CLOSE_RIGHT_PANEL = 'closeRightPanel'),
				(e.COLLECTION_INDEX_CHANGED = 'collectionIndexChanged'),
				(e.CREATE = 'create'),
				(e.CREATED = 'created'),
				(e.DOWN_ARROW = 'downArrow'),
				(e.DOWNLOAD = 'download'),
				(e.DROP = 'drop'),
				(e.END = 'end'),
				(e.ERROR = 'error'),
				(e.ESCAPE = 'escape'),
				(e.EXIT_FULLSCREEN = 'exitFullScreen'),
				(e.EXTERNAL_LINK_CLICKED = 'externalLinkClicked'),
				(e.FEEDBACK = 'feedback'),
				(e.FIRST = 'first'),
				(e.FORBIDDEN = 'forbidden'),
				(e.GALLERY_DECREASE_SIZE = 'galleryDecreaseSize'),
				(e.GALLERY_INCREASE_SIZE = 'galleryIncreaseSize'),
				(e.GALLERY_THUMB_SELECTED = 'galleryThumbSelected'),
				(e.HIDE_AUTH_DIALOGUE = 'hideAuthDialogue'),
				(e.HIDE_CLICKTHROUGH_DIALOGUE = 'hideClickthroughDialogue'),
				(e.HIDE_DOWNLOAD_DIALOGUE = 'hideDownloadDialogue'),
				(e.HIDE_EMBED_DIALOGUE = 'hideEmbedDialogue'),
				(e.HIDE_EXTERNALCONTENT_DIALOGUE = 'hideExternalContentDialogue'),
				(e.HIDE_GENERIC_DIALOGUE = 'hideGenericDialogue'),
				(e.HIDE_HELP_DIALOGUE = 'hideHelpDialogue'),
				(e.HIDE_INFORMATION = 'hideInformation'),
				(e.HIDE_LOGIN_DIALOGUE = 'hideLoginDialogue'),
				(e.HIDE_MOREINFO_DIALOGUE = 'hideMoreInfoDialogue'),
				(e.HIDE_MULTISELECT_DIALOGUE = 'hideMultiSelectDialogue'),
				(e.HIDE_OVERLAY = 'hideOverlay'),
				(e.HIDE_RESTRICTED_DIALOGUE = 'hideRestrictedDialogue'),
				(e.HIDE_SETTINGS_DIALOGUE = 'hideSettingsDialogue'),
				(e.HIDE_SHARE_DIALOGUE = 'hideShareDialogue'),
				(e.HOME = 'home'),
				(e.LAST = 'last'),
				(e.LEFT_ARROW = 'leftArrow'),
				(e.LEFTPANEL_COLLAPSE_FULL_FINISH = 'leftPanelCollapseFullFinish'),
				(e.LEFTPANEL_COLLAPSE_FULL_START = 'leftPanelCollapseFullStart'),
				(e.LEFTPANEL_EXPAND_FULL_FINISH = 'leftPanelExpandFullFinish'),
				(e.LEFTPANEL_EXPAND_FULL_START = 'leftPanelExpandFullStart'),
				(e.LOAD_FAILED = 'loadFailed'),
				(e.LOGIN_FAILED = 'loginFailed'),
				(e.LOGIN = 'login'),
				(e.LOGOUT = 'logout'),
				(e.MANIFEST_INDEX_CHANGED = 'manifestIndexChanged'),
				(e.METRIC_CHANGED = 'metricChanged'),
				(e.MINUS = 'minus'),
				(e.MULTISELECT_CHANGE = 'multiSelectChange'),
				(e.MULTISELECTION_MADE = 'multiSelectionMade'),
				(e.NEXT = 'next'),
				(e.NOT_FOUND = 'notFound'),
				(e.OPEN_EXTERNAL_RESOURCE = 'openExternalResource'),
				(e.OPEN_LEFT_PANEL = 'openLeftPanel'),
				(e.OPEN_RIGHT_PANEL = 'openRightPanel'),
				(e.OPEN_THUMBS_VIEW = 'openThumbsView'),
				(e.OPEN_TREE_VIEW = 'openTreeView'),
				(e.OPEN = 'open'),
				(e.PAGE_DOWN = 'pageDown'),
				(e.PAGE_UP = 'pageUp'),
				(e.PLUS = 'plus'),
				(e.PREV = 'prev'),
				(e.RANGE_CHANGED = 'rangeChanged'),
				(e.REDIRECT = 'redirect'),
				(e.REFRESH = 'refresh'),
				(e.RELOAD = 'reload'),
				(e.RESIZE = 'resize'),
				(e.RESOURCE_DEGRADED = 'resourceDegraded'),
				(e.RETRY = 'retry'),
				(e.RETURN = 'return'),
				(e.RIGHT_ARROW = 'rightArrow'),
				(e.RIGHTPANEL_COLLAPSE_FULL_FINISH = 'rightPanelCollapseFullFinish'),
				(e.RIGHTPANEL_COLLAPSE_FULL_START = 'rightPanelCollapseFullStart'),
				(e.RIGHTPANEL_EXPAND_FULL_FINISH = 'rightPanelExpandFullFinish'),
				(e.RIGHTPANEL_EXPAND_FULL_START = 'rightPanelExpandFullStart'),
				(e.SEQUENCE_INDEX_CHANGED = 'sequenceIndexChanged'),
				(e.SETTINGS_CHANGED = 'settingsChanged'),
				(e.SHOW_AUTH_DIALOGUE = 'showAuthDialogue'),
				(e.SHOW_CLICKTHROUGH_DIALOGUE = 'showClickThroughDialogue'),
				(e.SHOW_DOWNLOAD_DIALOGUE = 'showDownloadDialogue'),
				(e.SHOW_EMBED_DIALOGUE = 'showEmbedDialogue'),
				(e.SHOW_EXTERNALCONTENT_DIALOGUE = 'showExternalContentDialogue'),
				(e.SHOW_GENERIC_DIALOGUE = 'showGenericDialogue'),
				(e.SHOW_HELP_DIALOGUE = 'showHelpDialogue'),
				(e.SHOW_INFORMATION = 'showInformation'),
				(e.SHOW_LOGIN_DIALOGUE = 'showLoginDialogue'),
				(e.SHOW_MESSAGE = 'showMessage'),
				(e.SHOW_MOREINFO_DIALOGUE = 'showMoreInfoDialogue'),
				(e.SHOW_MULTISELECT_DIALOGUE = 'showMultiSelectDialogue'),
				(e.SHOW_OVERLAY = 'showOverlay'),
				(e.SHOW_RESTRICTED_DIALOGUE = 'showRestrictedDialogue'),
				(e.SHOW_SETTINGS_DIALOGUE = 'showSettingsDialogue'),
				(e.SHOW_SHARE_DIALOGUE = 'showShareDialogue'),
				(e.SHOW_TERMS_OF_USE = 'showTermsOfUse'),
				(e.THUMB_MULTISELECTED = 'thumbMultiSelected'),
				(e.THUMB_SELECTED = 'thumbSelected'),
				(e.TOGGLE_EXPAND_LEFT_PANEL = 'toggleExpandLeftPanel'),
				(e.TOGGLE_EXPAND_RIGHT_PANEL = 'toggleExpandRightPanel'),
				(e.TOGGLE_FULLSCREEN = 'toggleFullScreen'),
				(e.TREE_NODE_MULTISELECTED = 'treeNodeMultiSelected'),
				(e.TREE_NODE_SELECTED = 'treeNodeSelected'),
				(e.UP_ARROW = 'upArrow'),
				(e.UPDATE_SETTINGS = 'updateSettings'),
				(e.VIEW_FULL_TERMS = 'viewFullTerms'),
				(e.WINDOW_UNLOAD = 'windowUnload'),
				e
			);
		})();
		t.BaseEvents = n;
	}),
	define(
		'modules/uv-shared-module/Panel',
		['require', 'exports', './BaseEvents'],
		function (e, t, n) {
			'use strict';
			Object.defineProperty(t, '__esModule', { value: !0 });
			var i = (function () {
				function e(e, t, n) {
					(this.isResized = !1),
						(this.$element = e),
						(this.fitToParentWidth = t || !1),
						(this.fitToParentHeight = n || !1),
						this.create();
				}
				return (
					(e.prototype.create = function () {
						var e = this;
						$.subscribe(n.BaseEvents.RESIZE, function () {
							e.resize();
						});
					}),
					(e.prototype.whenResized = function (e) {
						var t = this;
						Utils.Async.waitFor(function () {
							return t.isResized;
						}, e);
					}),
					(e.prototype.resize = function () {
						var e = this.$element.parent();
						this.fitToParentWidth && this.$element.width(e.width()),
							this.fitToParentHeight && this.$element.height(e.height()),
							(this.isResized = !0);
					}),
					e
				);
			})();
			t.Panel = i;
		}
	);
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/BaseView', ['require', 'exports', './Panel'], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t, n, i) {
			return e.call(this, t, n, i) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				(this.component = this.$element.closest('.uv').data('component')),
					e.prototype.create.call(this),
					(this.extension = this.component.extension),
					(this.config = {}),
					(this.config.content = {}),
					(this.config.options = {});
				var t = this;
				t.modules &&
					t.modules.length &&
					((t.modules = t.modules.reverse()),
					t.modules.forEach(function (e) {
						t.config = $.extend(!0, t.config, t.extension.data.config.modules[e]);
					})),
					(this.content = this.config.content),
					(this.options = this.config.options);
			}),
			(t.prototype.init = function () {}),
			(t.prototype.setConfig = function (e) {
				this.modules || (this.modules = []), this.modules.push(e);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(n.Panel);
	t.BaseView = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/Dialogue', [
	'require',
	'exports',
	'./BaseView',
	'./BaseEvents'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			var n = e.call(this, t, !1, !1) || this;
			return (n.allowClose = !0), (n.isActive = !1), (n.isUnopened = !0), n;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('dialogue'),
					e.prototype.create.call(this),
					$.subscribe(i.BaseEvents.CLOSE_ACTIVE_DIALOGUE, function () {
						t.isActive && t.allowClose && t.close();
					}),
					$.subscribe(i.BaseEvents.ESCAPE, function () {
						t.isActive && t.allowClose && t.close();
					}),
					(this.$top = $('<div class="top"></div>')),
					this.$element.append(this.$top),
					(this.$closeButton = $(
						'<button type="button" class="btn btn-default close" tabindex="0">' +
							this.content.close +
							'</button>'
					)),
					(this.$middle = $('<div class="middle"></div>')),
					this.$element.append(this.$middle),
					(this.$content = $('<div class="content"></div>')),
					this.$middle.append(this.$content),
					(this.$buttons = $('<div class="buttons"></div>')),
					this.$middle.append(this.$buttons),
					(this.$bottom = $('<div class="bottom"></div>')),
					this.$element.append(this.$bottom),
					this.config.topCloseButtonEnabled
						? this.$top.append(this.$closeButton)
						: this.$buttons.append(this.$closeButton),
					this.$closeButton.on('click', function (e) {
						e.preventDefault(), t.close();
					}),
					(this.returnFunc = this.close);
			}),
			(t.prototype.enableClose = function () {
				(this.allowClose = !0), this.$closeButton.show();
			}),
			(t.prototype.disableClose = function () {
				(this.allowClose = !1), this.$closeButton.hide();
			}),
			(t.prototype.setDockedPosition = function () {
				var e = Math.floor(this.extension.height() - this.$element.outerHeight(!0)),
					t = 0,
					n = 0,
					i = 0;
				if (this.$triggerButton) {
					var o = 4,
						r = 2,
						s = this.$triggerButton.offset().top,
						a = this.extension.$element.offset().top,
						u = this.$element.outerHeight(!0),
						l = s - a - u;
					e = l + o;
					var c = this.$triggerButton.offset().left,
						h = this.extension.$element.offset().left,
						p = c - h;
					(i = Utils.Maths.normalise(p, 0, this.extension.width())),
						(t = Math.floor(this.extension.width() * i - this.$element.width() * i) + r),
						(n = Math.floor(this.$element.width() * i));
				}
				this.$bottom.css('backgroundPosition', n + 'px 0px'),
					this.$element.css({ top: e, left: t });
			}),
			(t.prototype.open = function (e) {
				var t = this;
				this.$element.attr('aria-hidden', 'false'),
					this.$element.show(),
					e && e.length ? ((this.$triggerButton = e), this.$bottom.show()) : this.$bottom.hide(),
					(this.isActive = !0),
					setTimeout(function () {
						var e = t.$element.find('.default');
						if (e.length) e.focus();
						else {
							var n = t.$element.find('input:visible').first();
							n.length ? n.focus() : t.$closeButton.focus();
						}
					}, 1),
					$.publish(i.BaseEvents.SHOW_OVERLAY),
					this.isUnopened && ((this.isUnopened = !1), this.afterFirstOpen()),
					this.resize();
			}),
			(t.prototype.afterFirstOpen = function () {}),
			(t.prototype.close = function () {
				this.isActive &&
					(this.$element.attr('aria-hidden', 'true'),
					this.$element.hide(),
					(this.isActive = !1),
					$.publish(this.closeCommand),
					$.publish(i.BaseEvents.HIDE_OVERLAY));
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.$element.css({
						top: Math.floor(this.extension.height() / 2 - this.$element.height() / 2),
						left: Math.floor(this.extension.width() / 2 - this.$element.width() / 2)
					});
			}),
			t
		);
	})(n.BaseView);
	t.Dialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/GenericDialogue', [
	'require',
	'exports',
	'./BaseEvents',
	'./Dialogue'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('genericDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_GENERIC_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_GENERIC_DIALOGUE),
					$.subscribe(this.openCommand, function (e, n) {
						(t.acceptCallback = n.acceptCallback), t.showMessage(n);
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					(this.$message = $('<p></p>')),
					this.$content.append(this.$message),
					(this.$acceptButton = $(
						'\n          <button class="btn btn-primary accept default">\n            ' +
							this.content.ok +
							'\n          </button>\n        '
					)),
					this.$buttons.append(this.$acceptButton),
					this.$buttons.find('.close').hide(),
					this.$acceptButton.onPressed(function () {
						t.accept();
					}),
					(this.returnFunc = function () {
						t.isActive && t.accept();
					}),
					this.$element.hide();
			}),
			(t.prototype.accept = function () {
				$.publish(n.BaseEvents.CLOSE_ACTIVE_DIALOGUE), this.acceptCallback && this.acceptCallback();
			}),
			(t.prototype.showMessage = function (e) {
				this.$message.html(e.message),
					e.buttonText
						? this.$acceptButton.text(e.buttonText)
						: this.$acceptButton.text(this.content.ok),
					e.allowClose === !1 && this.disableClose(),
					this.open();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(i.Dialogue);
	t.GenericDialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-shared-module/Shell',
	['require', 'exports', './BaseEvents', './BaseView', './GenericDialogue'],
	function (e, t, n, i, o) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var r = (function (e) {
			function t(n) {
				var i = this;
				return (t.$element = n), (i = e.call(this, t.$element, !0, !0) || this);
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					e.prototype.create.call(this),
						$.subscribe(n.BaseEvents.SHOW_OVERLAY, function () {
							t.$overlays.show();
						}),
						$.subscribe(n.BaseEvents.HIDE_OVERLAY, function () {
							t.$overlays.hide();
						}),
						(t.$headerPanel = $('<div class="headerPanel"></div>')),
						t.$element.append(t.$headerPanel),
						(t.$mainPanel = $('<div class="mainPanel"></div>')),
						t.$element.append(t.$mainPanel),
						(t.$centerPanel = $('<div class="centerPanel"></div>')),
						t.$mainPanel.append(t.$centerPanel),
						(t.$leftPanel = $('<div class="leftPanel"></div>')),
						t.$mainPanel.append(t.$leftPanel),
						(t.$rightPanel = $('<div class="rightPanel"></div>')),
						t.$mainPanel.append(t.$rightPanel),
						(t.$footerPanel = $('<div class="footerPanel"></div>')),
						t.$element.append(t.$footerPanel),
						(t.$mobileFooterPanel = $('<div class="mobileFooterPanel"></div>')),
						t.$element.append(t.$mobileFooterPanel),
						(t.$overlays = $('<div class="overlays"></div>')),
						t.$element.append(t.$overlays),
						(t.$genericDialogue = $(
							'<div class="overlay genericDialogue" aria-hidden="true"></div>'
						)),
						t.$overlays.append(t.$genericDialogue),
						t.$overlays.on('click', function (e) {
							$(e.target).hasClass('overlays') &&
								(e.preventDefault(), $.publish(n.BaseEvents.CLOSE_ACTIVE_DIALOGUE));
						}),
						new o.GenericDialogue(t.$genericDialogue);
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this),
						t.$overlays.width(this.extension.width()),
						t.$overlays.height(this.extension.height());
					var n =
						this.$element.height() -
						parseInt(t.$mainPanel.css('paddingTop')) -
						(t.$headerPanel.is(':visible') ? t.$headerPanel.height() : 0) -
						(t.$footerPanel.is(':visible') ? t.$footerPanel.height() : 0) -
						(t.$mobileFooterPanel.is(':visible') ? t.$mobileFooterPanel.height() : 0);
					t.$mainPanel.height(n);
				}),
				t
			);
		})(i.BaseView);
		t.Shell = r;
	}
),
	define('modules/uv-shared-module/Position', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n;
		!(function (e) {
			(e[(e.TOP_LEFT = 0)] = 'TOP_LEFT'),
				(e[(e.TOP_CENTER = 1)] = 'TOP_CENTER'),
				(e[(e.TOP_RIGHT = 2)] = 'TOP_RIGHT'),
				(e[(e.CENTER_LEFT = 3)] = 'CENTER_LEFT'),
				(e[(e.CENTER = 4)] = 'CENTER'),
				(e[(e.CENTER_RIGHT = 5)] = 'CENTER_RIGHT'),
				(e[(e.BOTTOM_LEFT = 6)] = 'BOTTOM_LEFT'),
				(e[(e.BOTTOM_CENTER = 7)] = 'BOTTOM_CENTER'),
				(e[(e.BOTTOM_RIGHT = 8)] = 'BOTTOM_RIGHT');
		})((n = t.Position || (t.Position = {})));
	}),
	define('Utils', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return (
				(e.sanitize = function (e) {
					return filterXSS(e, {
						whiteList: {
							a: ['href', 'title', 'target', 'class'],
							b: [],
							br: [],
							i: [],
							img: ['src'],
							p: [],
							small: [],
							span: [],
							sub: [],
							sup: []
						}
					});
				}),
				(e.isValidUrl = function (e) {
					var t = document.createElement('a');
					return (t.href = e), !!t.host && t.host !== window.location.host;
				}),
				(e.propertiesChanged = function (t, n, i) {
					for (var o = !1, r = 0; r < i.length && !(o = e.propertyChanged(t, n, i[r])); r++);
					return o;
				}),
				(e.propertyChanged = function (e, t, n) {
					return void 0 !== e[n] && t[n] !== e[n];
				}),
				e
			);
		})();
		t.UVUtils = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/CenterPanel', [
	'require',
	'exports',
	'./Shell',
	'./BaseView',
	'./Position',
	'../../Utils'
], function (e, t, n, i, o, r) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var s = (function (e) {
		function t(t) {
			var n = e.call(this, t, !1, !0) || this;
			return (n.isAttributionOpen = !1), (n.attributionPosition = o.Position.BOTTOM_LEFT), n;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				e.prototype.create.call(this),
					(this.$title = $('<div class="title"></div>')),
					this.$element.append(this.$title),
					(this.$content = $('<div id="content" class="content"></div>')),
					this.$element.append(this.$content),
					(this.$attribution = $(
						'\n                                <div class="attribution">\n                                  <div class="header">\n                                    <div class="title"></div>\n                                    <button type="button" class="close" aria-label="Close">\n                                      <span aria-hidden="true">&times;</span>\n                                    </button>\n                                  </div>\n                                  <div class="main">\n                                    <div class="attribution-text"></div>\n                                    <div class="license"></div>\n                                    <div class="logo"></div>\n                                  </div>\n                                </div>\n        '
					)),
					this.$attribution.find('.header .title').text(this.content.attribution),
					this.$content.append(this.$attribution),
					this.closeAttribution(),
					(this.$closeAttributionButton = this.$attribution.find('.header .close')),
					this.$closeAttributionButton.on('click', function (e) {
						e.preventDefault(), t.closeAttribution();
					}),
					Utils.Bools.getBool(this.options.titleEnabled, !0) || this.$title.hide(),
					this.whenResized(function () {
						t.updateRequiredStatement();
					});
			}),
			(t.prototype.openAttribution = function () {
				this.$attribution.show(), (this.isAttributionOpen = !0);
			}),
			(t.prototype.closeAttribution = function () {
				this.$attribution.hide(), (this.isAttributionOpen = !1);
			}),
			(t.prototype.updateRequiredStatement = function () {
				var e = this,
					t = this.extension.helper.getRequiredStatement(),
					n = Utils.Bools.getBool(this.options.requiredStatementEnabled, !0);
				if (t && t.value && n) {
					this.openAttribution();
					var i = this.$attribution.find('.title'),
						o = this.$attribution.find('.attribution-text'),
						s = this.$attribution.find('.license'),
						a = this.$attribution.find('.logo');
					if (t.label) {
						var u = r.UVUtils.sanitize(t.label);
						i.html(u);
					} else i.text(this.content.attribution);
					if (t.value) {
						var l = r.UVUtils.sanitize(t.value);
						o.html(l),
							o
								.find('img')
								.one('load', function () {
									e.resize();
								})
								.each(function () {
									this.complete && $(this).load();
								}),
							o.targetBlank();
					}
					s.hide(), a.hide(), this.resize();
				}
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
				var t = n.Shell.$leftPanel.is(':visible') ? Math.floor(n.Shell.$leftPanel.width()) : 0,
					i = n.Shell.$rightPanel.is(':visible') ? Math.floor(n.Shell.$rightPanel.width()) : 0,
					r = Math.floor(this.$element.parent().width() - t - i);
				this.$element.css({ left: t, width: r });
				var s;
				if (
					((s =
						(this.options && this.options.titleEnabled === !1) || !this.$title.is(':visible')
							? 0
							: this.$title.height()),
					this.$content.height(this.$element.height() - s),
					this.$content.width(this.$element.width()),
					this.$attribution && this.isAttributionOpen)
				) {
					switch (this.attributionPosition) {
						case o.Position.BOTTOM_LEFT:
							this.$attribution.css(
								'top',
								this.$content.height() -
									this.$attribution.outerHeight() -
									this.$attribution.verticalMargins()
							),
								this.$attribution.css('left', 0);
							break;
						case o.Position.BOTTOM_RIGHT:
							this.$attribution.css(
								'top',
								this.$content.height() -
									this.$attribution.outerHeight() -
									this.$attribution.verticalMargins()
							),
								this.$attribution.css(
									'left',
									this.$content.width() -
										this.$attribution.outerWidth() -
										this.$attribution.horizontalMargins()
								);
					}
					this.$content.width() <= this.$attribution.width()
						? this.$attribution.hide()
						: this.$attribution.show();
				}
			}),
			t
		);
	})(i.BaseView);
	t.CenterPanel = s;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-avcenterpanel-module/AVCenterPanel',
	[
		'require',
		'exports',
		'../uv-shared-module/BaseEvents',
		'../uv-shared-module/CenterPanel',
		'../uv-shared-module/Position'
	],
	function (e, t, n, i, o) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var r = (function (e) {
			function t(t) {
				var n = e.call(this, t) || this;
				return (
					(n._mediaReady = !1),
					(n._isThumbsViewOpen = !1),
					(n.attributionPosition = o.Position.BOTTOM_RIGHT),
					n
				);
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					this.setConfig('avCenterPanel'), e.prototype.create.call(this);
					var i = this;
					$.subscribe(n.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, t) {
						i.openMedia(t);
					}),
						$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
							t._viewCanvas(n);
						}),
						$.subscribe(n.BaseEvents.RANGE_CHANGED, function (e, n) {
							t._observeRangeChanges() &&
								t._whenMediaReady(function () {
									i._viewRange(n), i._setTitle();
								});
						}),
						$.subscribe(n.BaseEvents.METRIC_CHANGED, function () {
							t._whenMediaReady(function () {
								t.avcomponent &&
									t.avcomponent.set({
										limitToRange: t._limitToRange(),
										constrainNavigationToRange: t._limitToRange()
									});
							});
						}),
						$.subscribe(n.BaseEvents.CREATED, function () {
							t._setTitle();
						}),
						$.subscribe(n.BaseEvents.OPEN_THUMBS_VIEW, function () {
							(t._isThumbsViewOpen = !0),
								t._whenMediaReady(function () {
									if (t.avcomponent) {
										t.avcomponent.set({ virtualCanvasEnabled: !1 });
										var e = t.extension.helper.getCurrentCanvas();
										e && t._viewCanvas(t.extension.helper.canvasIndex);
									}
								});
						}),
						$.subscribe(n.BaseEvents.OPEN_TREE_VIEW, function () {
							(t._isThumbsViewOpen = !1),
								t._whenMediaReady(function () {
									t.avcomponent && t.avcomponent.set({ virtualCanvasEnabled: !0 });
								});
						}),
						this._createAVComponent();
				}),
				(t.prototype._createAVComponent = function () {
					var e = this;
					(this.$avcomponent = $('<div class="iiif-av-component"></div>')),
						this.$content.prepend(this.$avcomponent),
						(this.avcomponent = new IIIFComponents.AVComponent({ target: this.$avcomponent[0] })),
						this.avcomponent.on(
							'mediaready',
							function () {
								console.log('mediaready'), (e._mediaReady = !0);
							},
							!1
						),
						this.avcomponent.on(
							'rangechanged',
							function (t) {
								if (t) {
									e._setTitle();
									var i = e.extension.helper.getRangeById(t);
									if (i) {
										var o = e.extension.helper.getCurrentRange();
										i !== o && $.publish(n.BaseEvents.RANGE_CHANGED, [i]);
									} else $.publish(n.BaseEvents.RANGE_CHANGED, [null]);
								} else $.publish(n.BaseEvents.RANGE_CHANGED, [null]);
							},
							!1
						);
				}),
				(t.prototype._observeRangeChanges = function () {
					return this._isThumbsViewOpen ? !1 : !0;
				}),
				(t.prototype._setTitle = function () {
					var e,
						t,
						n = '',
						i = this.extension.helper.getCurrentRange();
					(t = i ? i.getLabel() : this.extension.helper.getCurrentCanvas().getLabel()),
						(e = Manifesto.LanguageMap.getValue(t)),
						e && (n = e),
						Utils.Bools.getBool(this.config.options.includeParentInTitleEnabled, !1) &&
							(i
								? i.parentRange &&
								  ((t = i.parentRange.getLabel()), (e = Manifesto.LanguageMap.getValue(t)))
								: (e = this.extension.helper.getLabel()),
							e && (n += this.content.delimiter + e)),
						(this.title = n),
						this.resize(!1);
				}),
				(t.prototype._isCurrentResourceAccessControlled = function () {
					var e = this.extension.helper.getCurrentCanvas();
					return e.externalResource.isAccessControlled();
				}),
				(t.prototype.openMedia = function (e) {
					var t = this;
					this.extension.getExternalResources(e).then(function () {
						t.avcomponent &&
							(t.extension.helper.canvasIndex === t._lastCanvasIndex && t.avcomponent.reset(),
							(t._lastCanvasIndex = t.extension.helper.canvasIndex),
							t.avcomponent.set({
								helper: t.extension.helper,
								adaptiveAuthEnabled: t._isCurrentResourceAccessControlled(),
								autoPlay: t.config.options.autoPlay,
								autoSelectRange: !0,
								constrainNavigationToRange: t._limitToRange(),
								content: t.content,
								defaultAspectRatio: 0.56,
								doubleClickMS: 350,
								limitToRange: t._limitToRange(),
								posterImageRatio: t.config.options.posterImageRatio
							}),
							t.resize());
					});
				}),
				(t.prototype._limitToRange = function () {
					return !this.extension.isDesktopMetric();
				}),
				(t.prototype._whenMediaReady = function (e) {
					var t = this;
					Utils.Async.waitFor(function () {
						return t._mediaReady;
					}, e);
				}),
				(t.prototype._viewRange = function (e) {
					var t = this;
					this._whenMediaReady(function () {
						e && t.avcomponent && t.avcomponent.playRange(e.id), t.resize(!1);
					});
				}),
				(t.prototype._viewCanvas = function (e) {
					var t = this;
					this._whenMediaReady(function () {
						var n = t.extension.helper.getCanvasByIndex(e);
						t.avcomponent && t.avcomponent.showCanvas(n.id);
					});
				}),
				(t.prototype.resize = function (t) {
					void 0 === t && (t = !0),
						e.prototype.resize.call(this),
						this.title && this.$title.ellipsisFill(this.title),
						t &&
							this.avcomponent &&
							(this.$avcomponent.height(this.$content.height()), this.avcomponent.resize());
				}),
				t
			);
		})(i.CenterPanel);
		t.AVCenterPanel = r;
	}
),
	define('modules/uv-shared-module/InformationArgs', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e, t) {
				(this.informationType = e), (this.param = t);
			}
			return e;
		})();
		t.InformationArgs = n;
	}),
	define('modules/uv-shared-module/InformationType', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n;
		!(function (e) {
			(e[(e.AUTH_CORS_ERROR = 0)] = 'AUTH_CORS_ERROR'),
				(e[(e.DEGRADED_RESOURCE = 1)] = 'DEGRADED_RESOURCE');
		})((n = t.InformationType || (t.InformationType = {})));
	}),
	define('modules/uv-shared-module/LoginWarningMessages', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return (e.FORBIDDEN = 'forbiddenResourceMessage'), e;
		})();
		t.LoginWarningMessages = n;
	}),
	define(
		'modules/uv-shared-module/Auth09',
		[
			'require',
			'exports',
			'./BaseEvents',
			'./InformationArgs',
			'./InformationType',
			'./LoginWarningMessages'
		],
		function (e, t, n, i, o, r) {
			'use strict';
			Object.defineProperty(t, '__esModule', { value: !0 });
			var s = (function () {
				function e() {}
				return (
					(e.loadExternalResources = function (t, i) {
						return new Promise(function (o) {
							manifesto.Utils.loadExternalResourcesAuth09(
								t,
								i,
								e.clickThrough,
								e.restricted,
								e.login,
								e.getAccessToken,
								e.storeAccessToken,
								e.getStoredAccessToken,
								e.handleExternalResourceResponse
							)
								.then(function (e) {
									o(e);
								})
								['catch'](function (e) {
									switch (e.name) {
										case manifesto.StatusCodes.AUTHORIZATION_FAILED.toString():
											$.publish(n.BaseEvents.LOGIN_FAILED);
											break;
										case manifesto.StatusCodes.FORBIDDEN.toString():
											$.publish(n.BaseEvents.FORBIDDEN);
											break;
										case manifesto.StatusCodes.RESTRICTED.toString():
											break;
										default:
											$.publish(n.BaseEvents.SHOW_MESSAGE, [e.message || e]);
									}
								});
						});
					}),
					(e.clickThrough = function (e) {
						return new Promise(function (t) {
							$.publish(n.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE, [
								{
									resource: e,
									acceptCallback: function () {
										if (e.clickThroughService)
											var i = window.open(e.clickThroughService.id),
												o = window.setInterval(function () {
													i &&
														i.closed &&
														(window.clearInterval(o), $.publish(n.BaseEvents.CLICKTHROUGH), t());
												}, 500);
									}
								}
							]);
						});
					}),
					(e.restricted = function (e) {
						return new Promise(function (t, i) {
							$.publish(n.BaseEvents.SHOW_RESTRICTED_DIALOGUE, [
								{
									resource: e,
									acceptCallback: function () {
										$.publish(n.BaseEvents.LOAD_FAILED), i(e);
									}
								}
							]);
						});
					}),
					(e.login = function (e) {
						return new Promise(function (t) {
							var i = {};
							e.status === HTTPStatusCode.FORBIDDEN &&
								((i.warningMessage = r.LoginWarningMessages.FORBIDDEN), (i.showCancelButton = !0)),
								$.publish(n.BaseEvents.SHOW_LOGIN_DIALOGUE, [
									{
										resource: e,
										loginCallback: function () {
											if (e.loginService)
												var i = window.open(e.loginService.id + '?t=' + new Date().getTime()),
													o = window.setInterval(function () {
														i &&
															i.closed &&
															(window.clearInterval(o), $.publish(n.BaseEvents.LOGIN), t());
													}, 500);
										},
										logoutCallback: function () {
											if (e.logoutService)
												var i = window.open(e.logoutService.id + '?t=' + new Date().getTime()),
													o = window.setInterval(function () {
														i &&
															i.closed &&
															(window.clearInterval(o), $.publish(n.BaseEvents.LOGOUT), t());
													}, 500);
										},
										options: i
									}
								]);
						});
					}),
					(e.getAccessToken = function (e, t) {
						return new Promise(function (n, i) {
							if (e.tokenService) {
								var o = e.tokenService.id,
									r = o + '|' + new Date().getTime(),
									s = function (e) {
										window.removeEventListener('message', s);
										var o = e.data;
										o.error ? (t ? i(o.errorDescription) : n(void 0)) : n(o);
									};
								window.addEventListener('message', s, !1);
								var a = o + '?messageId=' + r;
								$('#commsFrame').prop('src', a);
							} else i('Token service not found');
						});
					}),
					(e.storeAccessToken = function (e, t, n) {
						return new Promise(function (i, o) {
							e.tokenService
								? (Utils.Storage.set(e.tokenService.id, t, t.expiresIn, new Utils.StorageType(n)),
								  i())
								: o('Token service not found');
						});
					}),
					(e.getStoredAccessToken = function (e, t) {
						return new Promise(function (n, i) {
							var o = [],
								r = null;
							if (
								(e.tokenService &&
									(r = Utils.Storage.get(e.tokenService.id, new Utils.StorageType(t))),
								r)
							)
								o.push(r);
							else
								for (
									var s = Utils.Urls.getUrlParts(e.dataUri).hostname,
										a = Utils.Storage.getItems(new Utils.StorageType(t)),
										u = 0;
									u < a.length;
									u++
								)
									(r = a[u]), r.key.includes(s) && o.push(r);
							o = o.sort(function (e, t) {
								return e.expiresAt - t.expiresAt;
							});
							var l;
							o.length && (l = o[o.length - 1].value), n(l);
						});
					}),
					(e.handleExternalResourceResponse = function (e) {
						return new Promise(function (t, r) {
							if (((e.isResponseHandled = !0), e.status === HTTPStatusCode.OK)) t(e);
							else if (e.status === HTTPStatusCode.MOVED_TEMPORARILY)
								t(e), $.publish(n.BaseEvents.RESOURCE_DEGRADED, [e]);
							else if (
								e.error.status === HTTPStatusCode.UNAUTHORIZED ||
								e.error.status === HTTPStatusCode.INTERNAL_SERVER_ERROR
							)
								if (Modernizr.cors) r(e.error.statusText);
								else {
									var s = new i.InformationArgs(o.InformationType.AUTH_CORS_ERROR, null);
									$.publish(n.BaseEvents.SHOW_INFORMATION, [s]), t(e);
								}
							else if (e.error.status === HTTPStatusCode.FORBIDDEN) {
								var a = new Error();
								(a.message = 'Forbidden'),
									(a.name = manifesto.StatusCodes.FORBIDDEN.toString()),
									r(a);
							} else r(e.error.statusText);
						});
					}),
					(e.handleDegraded = function (e) {
						var t = new i.InformationArgs(o.InformationType.DEGRADED_RESOURCE, e);
						$.publish(n.BaseEvents.SHOW_INFORMATION, [t]);
					}),
					e
				);
			})();
			t.Auth09 = s;
		}
	),
	define(
		'modules/uv-shared-module/Auth1',
		['require', 'exports', './BaseEvents', '../../Utils', './InformationArgs', './InformationType'],
		function (e, t, n, i, o, r) {
			'use strict';
			Object.defineProperty(t, '__esModule', { value: !0 });
			var s = (function () {
				function e() {}
				return (
					(e.loadExternalResources = function (t, i, o) {
						return new Promise(function (r) {
							(e.storageStrategy = i),
								(t = t.map(function (e) {
									return (e.authAPIVersion = 1), (e.options = o), e;
								})),
								manifesto.Utils.loadExternalResourcesAuth1(
									t,
									e.openContentProviderInteraction,
									e.openTokenService,
									e.getStoredAccessToken,
									e.userInteractedWithContentProvider,
									e.getContentProviderInteraction,
									e.handleMovedTemporarily,
									e.showOutOfOptionsMessages
								)
									.then(function (e) {
										r(e);
									})
									['catch'](function (e) {
										switch (e.name) {
											case manifesto.StatusCodes.AUTHORIZATION_FAILED.toString():
												$.publish(n.BaseEvents.LOGIN_FAILED);
												break;
											case manifesto.StatusCodes.FORBIDDEN.toString():
												$.publish(n.BaseEvents.FORBIDDEN);
												break;
											case manifesto.StatusCodes.RESTRICTED.toString():
												break;
											default:
												$.publish(n.BaseEvents.SHOW_MESSAGE, [e.message || e]);
										}
									});
						});
					}),
					(e.getCookieServiceUrl = function (t) {
						var n = t.id + '?origin=' + e.getOrigin();
						return n;
					}),
					(e.openContentProviderInteraction = function (t) {
						var n = e.getCookieServiceUrl(t);
						return window.open(n);
					}),
					(e.getOrigin = function (e) {
						var t = window.location;
						return (
							e && ((t = document.createElement('a')), (t.href = e)),
							t.protocol + '//' + t.hostname + (t.port ? ':' + t.port : '')
						);
					}),
					(e.userInteractedWithContentProvider = function (e) {
						return new Promise(function (t) {
							var n = window.setInterval(function () {
								e.closed && (window.clearInterval(n), t(!0));
							}, 500);
						});
					}),
					(e.handleMovedTemporarily = function (t) {
						return new Promise(function (n) {
							e.showDegradedMessage(t), (t.isResponseHandled = !0), n();
						});
					}),
					(e.showDegradedMessage = function (e) {
						var t = new o.InformationArgs(r.InformationType.DEGRADED_RESOURCE, e);
						$.publish(n.BaseEvents.SHOW_INFORMATION, [t]);
					}),
					(e.storeAccessToken = function (t, n) {
						return new Promise(function (i, o) {
							t.tokenService
								? (Utils.Storage.set(
										t.tokenService.id,
										n,
										n.expiresIn,
										new Utils.StorageType(e.storageStrategy)
								  ),
								  i())
								: o('Token service not found');
						});
					}),
					(e.getStoredAccessToken = function (t) {
						return new Promise(function (n, i) {
							var o = [],
								r = null;
							if (
								(t.tokenService &&
									(r = Utils.Storage.get(
										t.tokenService.id,
										new Utils.StorageType(e.storageStrategy)
									)),
								r)
							)
								o.push(r);
							else
								for (
									var s = Utils.Urls.getUrlParts(t.dataUri).hostname,
										a = Utils.Storage.getItems(new Utils.StorageType(e.storageStrategy)),
										u = 0;
									u < a.length;
									u++
								)
									(r = a[u]), r.key.includes(s) && o.push(r);
							o = o.sort(function (e, t) {
								return e.expiresAt - t.expiresAt;
							});
							var l = null;
							o.length && (l = o[o.length - 1].value), n(l);
						});
					}),
					(e.getContentProviderInteraction = function (t, i) {
						return new Promise(function (o) {
							t.isResponseHandled && !t.authHoldingPage
								? (e.showDegradedMessage(t), o(null))
								: t.authHoldingPage
								? ((t.authHoldingPage.location.href = e.getCookieServiceUrl(i)),
								  o(t.authHoldingPage))
								: $.publish(n.BaseEvents.SHOW_AUTH_DIALOGUE, [
										{
											service: i,
											closeCallback: function () {
												o(null);
											},
											confirmCallback: function () {
												var t = e.openContentProviderInteraction(i);
												o(t);
											},
											cancelCallback: function () {
												o(null);
											}
										}
								  ]);
						});
					}),
					(e.openTokenService = function (t, n) {
						return new Promise(function (i, o) {
							var r = e.getOrigin(n.id),
								s = new Date().getTime();
							(e.messages[s] = { resolve: i, reject: o, serviceOrigin: r, resource: t }),
								window.addEventListener('message', e.receiveToken, !1);
							var a = n.id + '?messageId=' + s + '&origin=' + e.getOrigin();
							$('#commsFrame').prop('src', a);
							var u = 5e3;
							setTimeout(function () {
								e.messages[s] &&
									(e.messages[s].reject('Message unhandled after ' + u + 'ms, rejecting'),
									delete e.messages[s]);
							}, u);
						});
					}),
					(e.receiveToken = function (t) {
						if (t.data.hasOwnProperty('messageId')) {
							var n = e.messages[t.data.messageId];
							n &&
								t.origin == n.serviceOrigin &&
								e.storeAccessToken(n.resource, t.data).then(function () {
									n.resolve(t.data), delete e.messages[t.data.messageId];
								});
						}
					}),
					(e.showOutOfOptionsMessages = function (e, t) {
						if (e.status != HTTPStatusCode.MOVED_TEMPORARILY) {
							var o = '';
							t.getFailureHeader() && (o += '<p>' + t.getFailureHeader() + '</p>'),
								t.getFailureDescription() && (o += t.getFailureDescription()),
								$.publish(n.BaseEvents.SHOW_MESSAGE, [i.UVUtils.sanitize(o)]);
						}
					}),
					(e.messages = {}),
					e
				);
			})();
			t.Auth1 = s;
		}
	);
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-dialogues-module/AuthDialogue', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/Dialogue',
	'../../Utils'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('authDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_AUTH_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_AUTH_DIALOGUE),
					$.subscribe(this.openCommand, function (e, n) {
						(t.closeCallback = n.closeCallback),
							(t.confirmCallback = n.confirmCallback),
							(t.cancelCallback = n.cancelCallback),
							(t.service = n.service),
							t.open();
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					(this.$title = $('<h1></h1>')),
					this.$content.append(this.$title),
					this.$content.append(
						'            <div>                <p class="message scroll"></p>            </div>'
					),
					this.$buttons.prepend(this._buttonsToAdd()),
					(this.$message = this.$content.find('.message')),
					(this.$confirmButton = this.$buttons.find('.confirm')),
					this.$confirmButton.text(this.content.confirm),
					(this.$cancelButton = this.$buttons.find('.close')),
					this.$cancelButton.text(this.content.cancel),
					this.$element.hide(),
					this.$confirmButton.on('click', function (e) {
						e.preventDefault(), t.confirmCallback && t.confirmCallback(), t.close();
					}),
					this.$cancelButton.on('click', function (e) {
						e.preventDefault(), t.cancelCallback && t.cancelCallback(), t.close();
					});
			}),
			(t.prototype.open = function () {
				e.prototype.open.call(this);
				var t = this.service.getHeader(),
					i = this.service.getDescription(),
					r = this.service.getConfirmLabel();
				t && this.$title.text(o.UVUtils.sanitize(t)),
					i &&
						(this.$message.html(o.UVUtils.sanitize(i)),
						this.$message.targetBlank(),
						this.$message.find('a').on('click', function () {
							var e = $(this).attr('href');
							$.publish(n.BaseEvents.EXTERNAL_LINK_CLICKED, [e]);
						})),
					r && this.$confirmButton.text(o.UVUtils.sanitize(r)),
					this.resize();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			(t.prototype._buttonsToAdd = function () {
				var e = '<a class="confirm btn btn-primary" href="#" target="_parent"></a>';
				return (
					this.config.topCloseButtonEnabled &&
						(e += '<button class="close btn btn-default"></button>'),
					e
				);
			}),
			t
		);
	})(i.Dialogue);
	t.AuthDialogue = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-dialogues-module/ClickThroughDialogue', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/Dialogue'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('clickThroughDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_CLICKTHROUGH_DIALOGUE),
					$.subscribe(this.openCommand, function (e, n) {
						(t.acceptCallback = n.acceptCallback), (t.resource = n.resource), t.open();
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					(this.$title = $('<h1></h1>')),
					this.$content.append(this.$title),
					this.$content.append(
						'            <div>                <p class="message scroll"></p>                <div class="buttons">                    <a class="acceptTerms btn btn-primary" href="#" target="_parent"></a>                </div>            </div>'
					),
					(this.$message = this.$content.find('.message')),
					(this.$acceptTermsButton = this.$content.find('.acceptTerms')),
					this.$acceptTermsButton.text('Accept Terms and Open'),
					this.$element.hide(),
					this.$acceptTermsButton.on('click', function (e) {
						e.preventDefault(),
							t.close(),
							$.publish(n.BaseEvents.ACCEPT_TERMS),
							t.acceptCallback && t.acceptCallback();
					});
			}),
			(t.prototype.open = function () {
				e.prototype.open.call(this),
					this.resource.clickThroughService &&
						(this.$title.text(this.resource.clickThroughService.getProperty('label')),
						this.$message.html(this.resource.clickThroughService.getProperty('description')),
						this.$message.targetBlank()),
					this.$message.find('a').on('click', function () {
						var e = $(this).attr('href');
						$.publish(n.BaseEvents.EXTERNAL_LINK_CLICKED, [e]);
					}),
					this.resize();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(i.Dialogue);
	t.ClickThroughDialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-dialogues-module/LoginDialogue',
	['require', 'exports', '../uv-shared-module/BaseEvents', '../uv-shared-module/Dialogue'],
	function (e, t, n, i) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var o = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					this.setConfig('loginDialogue'),
						e.prototype.create.call(this),
						(this.openCommand = n.BaseEvents.SHOW_LOGIN_DIALOGUE),
						(this.closeCommand = n.BaseEvents.HIDE_LOGIN_DIALOGUE),
						$.subscribe(this.openCommand, function (e, n) {
							(t.loginCallback = n.loginCallback),
								(t.logoutCallback = n.logoutCallback),
								(t.options = n.options),
								(t.resource = n.resource),
								t.open();
						}),
						$.subscribe(this.closeCommand, function () {
							t.close();
						}),
						(this.$title = $('<h1></h1>')),
						this.$content.append(this.$title),
						this.$content.append(
							'            <div>                <p class="message scroll"></p>                <div class="buttons">                    <a class="logout btn btn-primary" href="#" target="_parent"></a>                    <a class="login btn btn-primary" href="#" target="_parent"></a>                    <a class="cancel btn btn-primary" href="#"></a>                </div>            </div>'
						),
						(this.$message = this.$content.find('.message')),
						(this.$loginButton = this.$content.find('.login')),
						this.$loginButton.text(this.content.login),
						(this.$logoutButton = this.$content.find('.logout')),
						this.$logoutButton.text(this.content.logout),
						(this.$cancelButton = this.$content.find('.cancel')),
						this.$cancelButton.text(this.content.cancel),
						this.$element.hide(),
						this.$loginButton.on('click', function (e) {
							e.preventDefault(), t.close(), t.loginCallback && t.loginCallback();
						}),
						this.$logoutButton.on('click', function (e) {
							e.preventDefault(), t.close(), t.logoutCallback && t.logoutCallback();
						}),
						this.$cancelButton.on('click', function (e) {
							e.preventDefault(), t.close();
						}),
						this.updateLogoutButton();
				}),
				(t.prototype.open = function () {
					e.prototype.open.call(this);
					var t = '';
					this.resource.loginService &&
						(this.$title.text(this.resource.loginService.getProperty('label')),
						(t = this.resource.loginService.getProperty('description'))),
						this.options.warningMessage &&
							(t =
								'<span class="warning">' +
								this.extension.data.config.content[this.options.warningMessage] +
								'</span><span class="description">' +
								t +
								'</span>'),
						this.updateLogoutButton(),
						this.$message.html(t),
						this.$message.targetBlank(),
						this.$message.find('a').on('click', function () {
							var e = $(this).attr('href');
							$.publish(n.BaseEvents.EXTERNAL_LINK_CLICKED, [e]);
						}),
						this.options.showCancelButton ? this.$cancelButton.show() : this.$cancelButton.hide(),
						this.resize();
				}),
				(t.prototype.updateLogoutButton = function () {
					this.extension.isLoggedIn ? this.$logoutButton.show() : this.$logoutButton.hide();
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this);
				}),
				t
			);
		})(i.Dialogue);
		t.LoginDialogue = o;
	}
),
	define('modules/uv-shared-module/StringValue', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e) {
				(this.value = ''), e && (this.value = e.toLowerCase());
			}
			return (
				(e.prototype.toString = function () {
					return this.value;
				}),
				e
			);
		})();
		t.StringValue = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/MetricType', ['require', 'exports', './StringValue'], function (
	e,
	t,
	n
) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t() {
			return (null !== e && e.apply(this, arguments)) || this;
		}
		return (
			__extends(t, e),
			(t.DESKTOP = new t('desktop')),
			(t.MOBILELANDSCAPE = new t('mobilelandscape')),
			(t.MOBILEPORTRAIT = new t('mobileportrait')),
			(t.NONE = new t('none')),
			(t.WATCH = new t('watch')),
			t
		);
	})(n.StringValue);
	t.MetricType = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-dialogues-module/RestrictedDialogue',
	['require', 'exports', '../uv-shared-module/BaseEvents', '../uv-shared-module/Dialogue'],
	function (e, t, n, i) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var o = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					this.setConfig('restrictedDialogue'),
						e.prototype.create.call(this),
						(this.openCommand = n.BaseEvents.SHOW_RESTRICTED_DIALOGUE),
						(this.closeCommand = n.BaseEvents.HIDE_RESTRICTED_DIALOGUE),
						$.subscribe(this.openCommand, function (e, n) {
							(t.acceptCallback = n.acceptCallback),
								(t.options = n.options),
								(t.resource = n.resource),
								t.open();
						}),
						$.subscribe(this.closeCommand, function () {
							t.close();
						}),
						(this.$title = $('<h1></h1>')),
						this.$content.append(this.$title),
						this.$content.append(
							'            <div>                <p class="message scroll"></p>                <div class="buttons">                    <a class="cancel btn btn-primary" href="#" target="_parent"></a>                </div>            </div>'
						),
						(this.$message = this.$content.find('.message')),
						this.$message.targetBlank(),
						(this.$cancelButton = this.$content.find('.cancel')),
						this.$cancelButton.text(this.content.cancel),
						this.$element.hide(),
						this.$cancelButton.on('click', function (e) {
							e.preventDefault(), t.close();
						});
				}),
				(t.prototype.open = function () {
					e.prototype.open.call(this), (this.isAccepted = !1);
					var t = '';
					this.resource.restrictedService &&
						(this.$title.text(this.resource.restrictedService.getProperty('label')),
						(t = this.resource.restrictedService.getProperty('description'))),
						this.$message.html(t),
						this.$message.targetBlank(),
						this.$message.find('a').on('click', function () {
							var e = $(this).attr('href');
							$.publish(n.BaseEvents.EXTERNAL_LINK_CLICKED, [e]);
						}),
						this.resize();
				}),
				(t.prototype.close = function () {
					e.prototype.close.call(this),
						!this.isAccepted &&
							this.acceptCallback &&
							((this.isAccepted = !0), this.acceptCallback());
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this);
				}),
				t
			);
		})(i.Dialogue);
		t.RestrictedDialogue = o;
	}
),
	define('SynchronousRequire', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return (
				(e.load = function (e, t) {
					for (var n = [], o = 0; o < e.length; o++) {
						var r = new i(o, e[o], e, t);
						n.push(r);
					}
					var s = Promise.resolve();
					return (
						n.forEach(function (e) {
							s = s.then(function () {
								return e.load();
							});
						}),
						s
					);
				}),
				e
			);
		})();
		t.SynchronousRequire = n;
		var i = (function () {
			function e(e, t, n, i) {
				(this._dep = t), (this._deps = n), (this._cb = i), (this._index = e);
			}
			return (
				(e.prototype.getDependencyIndex = function (e) {
					return this._deps.findIndex(function (t) {
						return t.includes(e);
					});
				}),
				(e.prototype.load = function () {
					var e = this;
					return new Promise(function (t) {
						requirejs([e._dep], function (n) {
							e._cb(e._index, n), t();
						});
					});
				}),
				e
			);
		})();
		t.DependencyLoader = i;
	}),
	define(
		'modules/uv-shared-module/BaseExtension',
		[
			'require',
			'exports',
			'../../Utils',
			'./Auth09',
			'./Auth1',
			'../../modules/uv-dialogues-module/AuthDialogue',
			'./BaseEvents',
			'../../modules/uv-dialogues-module/ClickThroughDialogue',
			'../../modules/uv-dialogues-module/LoginDialogue',
			'../../modules/uv-shared-module/MetricType',
			'../../modules/uv-dialogues-module/RestrictedDialogue',
			'./Shell',
			'../../SynchronousRequire'
		],
		function (e, t, n, i, o, r, s, a, u, l, c, h, p) {
			'use strict';
			Object.defineProperty(t, '__esModule', { value: !0 });
			var d = (function () {
				function e() {
					(this.isCreated = !1),
						(this.isLoggedIn = !1),
						(this.metric = l.MetricType.NONE),
						(this.metrics = []),
						(this.shifted = !1),
						(this.tabbing = !1);
				}
				return (
					(e.prototype.create = function () {
						var e = this,
							t = this;
						if (
							((this.$element = $(this.component.options.target)),
							this.$element.data('component', this.component),
							this.fire(s.BaseEvents.CREATE, {
								data: this.data,
								settings: this.getSettings(),
								preview: this.getSharePreview()
							}),
							this._parseMetrics(),
							this._initLocales(),
							this.$element.empty(),
							this.$element.removeClass(),
							this.$element.addClass('uv'),
							this.data.locales && this.$element.addClass(this.data.locales[0].name.toLowerCase()),
							this.$element.addClass(this.name),
							this.$element.addClass('browser-' + window.browserDetect.browser),
							this.$element.addClass('browser-version-' + window.browserDetect.version),
							this.$element.prop('tabindex', 0),
							this.isMobile() && this.$element.addClass('mobile'),
							this.data.isLightbox && this.$element.addClass('lightbox'),
							Utils.Documents.supportsFullscreen() &&
								this.$element.addClass('fullscreen-supported'),
							this.$element.on('mousemove', function (t) {
								(e.mouseX = t.pageX), (e.mouseY = t.pageY);
							}),
							!this.data.isReload)
						) {
							var n = Utils.Documents.getHiddenProp();
							if (n) {
								var o = n.replace(/[H|h]idden/, '') + 'visibilitychange';
								document.addEventListener(o, function () {
									Utils.Documents.isHidden() || e.resize();
								});
							}
							Utils.Bools.getBool(this.data.config.options.dropEnabled, !0) &&
								this.$element.on('drop', function (t) {
									t.preventDefault();
									var n = t.originalEvent.dataTransfer.getData('URL'),
										i = Utils.Urls.getUrlParts(n),
										o = Utils.Urls.getQuerystringParameterFromString('manifest', i.search);
									if (
										(o ||
											(o = Utils.Urls.getQuerystringParameterFromString('collection', i.search)),
										o)
									) {
										e.fire(s.BaseEvents.DROP, o);
										var r = {};
										(r.iiifResourceUri = o), e.reload(r);
									}
								}),
								this.$element.on('dragover', function (e) {
									e.preventDefault();
								}),
								this.$element.on('keyup keydown', function (t) {
									(e.shifted = t.shiftKey), (e.tabbing = t.keyCode === KeyCodes.KeyDown.Tab);
								}),
								this.$element.on('keydown', function (e) {
									var n = null,
										i = !0;
									e.ctrlKey ||
										e.altKey ||
										e.shiftKey ||
										(e.keyCode === KeyCodes.KeyDown.Enter && ((n = s.BaseEvents.RETURN), (i = !1)),
										e.keyCode === KeyCodes.KeyDown.Escape && (n = s.BaseEvents.ESCAPE),
										e.keyCode === KeyCodes.KeyDown.PageUp && (n = s.BaseEvents.PAGE_UP),
										e.keyCode === KeyCodes.KeyDown.PageDown && (n = s.BaseEvents.PAGE_DOWN),
										e.keyCode === KeyCodes.KeyDown.End && (n = s.BaseEvents.END),
										e.keyCode === KeyCodes.KeyDown.Home && (n = s.BaseEvents.HOME),
										(e.keyCode === KeyCodes.KeyDown.NumpadPlus ||
											171 === e.keyCode ||
											e.keyCode === KeyCodes.KeyDown.Equals) &&
											((n = s.BaseEvents.PLUS), (i = !1)),
										(e.keyCode === KeyCodes.KeyDown.NumpadMinus ||
											173 === e.keyCode ||
											e.keyCode === KeyCodes.KeyDown.Dash) &&
											((n = s.BaseEvents.MINUS), (i = !1)),
										t.useArrowKeysToNavigate() &&
											(e.keyCode === KeyCodes.KeyDown.LeftArrow && (n = s.BaseEvents.LEFT_ARROW),
											e.keyCode === KeyCodes.KeyDown.UpArrow && (n = s.BaseEvents.UP_ARROW),
											e.keyCode === KeyCodes.KeyDown.RightArrow && (n = s.BaseEvents.RIGHT_ARROW),
											e.keyCode === KeyCodes.KeyDown.DownArrow && (n = s.BaseEvents.DOWN_ARROW))),
										n && (i && e.preventDefault(), $.publish(n));
								});
						}
						$.subscribe(s.BaseEvents.EXIT_FULLSCREEN, function () {
							e.isOverlayActive() && $.publish(s.BaseEvents.ESCAPE),
								$.publish(s.BaseEvents.ESCAPE),
								$.publish(s.BaseEvents.RESIZE);
						}),
							this.$element.append('<a href="/" id="top"></a>'),
							this.$element.append('<iframe id="commsFrame" style="display:none"></iframe>'),
							this.$element.append(
								'<div id="debug"><span id="watch">Watch</span><span id="mobile-portrait">Mobile Portrait</span><span id="mobile-landscape">Mobile Landscape</span><span id="desktop">Desktop</span></div>'
							),
							$.subscribe(s.BaseEvents.ACCEPT_TERMS, function () {
								e.fire(s.BaseEvents.ACCEPT_TERMS);
							}),
							$.subscribe(s.BaseEvents.LOGIN_FAILED, function () {
								e.fire(s.BaseEvents.LOGIN_FAILED),
									e.showMessage(e.data.config.content.authorisationFailedMessage);
							}),
							$.subscribe(s.BaseEvents.LOGIN, function () {
								(e.isLoggedIn = !0), e.fire(s.BaseEvents.LOGIN);
							}),
							$.subscribe(s.BaseEvents.LOGOUT, function () {
								(e.isLoggedIn = !1), e.fire(s.BaseEvents.LOGOUT);
							}),
							$.subscribe(s.BaseEvents.BOOKMARK, function () {
								e.bookmark(), e.fire(s.BaseEvents.BOOKMARK);
							}),
							$.subscribe(s.BaseEvents.CANVAS_INDEX_CHANGE_FAILED, function () {
								e.fire(s.BaseEvents.CANVAS_INDEX_CHANGE_FAILED);
							}),
							$.subscribe(s.BaseEvents.CANVAS_INDEX_CHANGED, function (t, n) {
								(e.data.canvasIndex = n),
									(e.lastCanvasIndex = e.helper.canvasIndex),
									(e.helper.canvasIndex = n),
									e.fire(s.BaseEvents.CANVAS_INDEX_CHANGED, e.data.canvasIndex);
							}),
							$.subscribe(s.BaseEvents.CLICKTHROUGH, function () {
								e.fire(s.BaseEvents.CLICKTHROUGH);
							}),
							$.subscribe(s.BaseEvents.CLOSE_ACTIVE_DIALOGUE, function () {
								e.fire(s.BaseEvents.CLOSE_ACTIVE_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.CLOSE_LEFT_PANEL, function () {
								e.fire(s.BaseEvents.CLOSE_LEFT_PANEL), e.resize();
							}),
							$.subscribe(s.BaseEvents.CLOSE_RIGHT_PANEL, function () {
								e.fire(s.BaseEvents.CLOSE_RIGHT_PANEL), e.resize();
							}),
							$.subscribe(s.BaseEvents.COLLECTION_INDEX_CHANGED, function (t, n) {
								(e.data.collectionIndex = n),
									e.fire(s.BaseEvents.COLLECTION_INDEX_CHANGED, e.data.collectionIndex);
							}),
							$.subscribe(s.BaseEvents.CREATED, function () {
								(e.isCreated = !0), e.fire(s.BaseEvents.CREATED);
							}),
							$.subscribe(s.BaseEvents.DOWN_ARROW, function () {
								e.fire(s.BaseEvents.DOWN_ARROW);
							}),
							$.subscribe(s.BaseEvents.DOWNLOAD, function (t, n) {
								e.fire(s.BaseEvents.DOWNLOAD, n);
							}),
							$.subscribe(s.BaseEvents.END, function () {
								e.fire(s.BaseEvents.END);
							}),
							$.subscribe(s.BaseEvents.ESCAPE, function () {
								e.fire(s.BaseEvents.ESCAPE),
									e.isFullScreen() &&
										!e.isOverlayActive() &&
										$.publish(s.BaseEvents.TOGGLE_FULLSCREEN);
							}),
							$.subscribe(s.BaseEvents.EXTERNAL_LINK_CLICKED, function (t, n) {
								e.fire(s.BaseEvents.EXTERNAL_LINK_CLICKED, n);
							}),
							$.subscribe(s.BaseEvents.FEEDBACK, function () {
								e.feedback();
							}),
							$.subscribe(s.BaseEvents.FORBIDDEN, function () {
								e.fire(s.BaseEvents.FORBIDDEN), $.publish(s.BaseEvents.OPEN_EXTERNAL_RESOURCE);
							}),
							$.subscribe(s.BaseEvents.HIDE_DOWNLOAD_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_DOWNLOAD_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HIDE_EMBED_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_EMBED_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HIDE_GENERIC_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_GENERIC_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HIDE_HELP_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_HELP_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HIDE_INFORMATION, function () {
								e.fire(s.BaseEvents.HIDE_INFORMATION);
							}),
							$.subscribe(s.BaseEvents.HIDE_LOGIN_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_LOGIN_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HIDE_OVERLAY, function () {
								e.fire(s.BaseEvents.HIDE_OVERLAY);
							}),
							$.subscribe(s.BaseEvents.HIDE_RESTRICTED_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_RESTRICTED_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HIDE_SETTINGS_DIALOGUE, function () {
								e.fire(s.BaseEvents.HIDE_SETTINGS_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.HOME, function () {
								e.fire(s.BaseEvents.HOME);
							}),
							$.subscribe(s.BaseEvents.LEFT_ARROW, function () {
								e.fire(s.BaseEvents.LEFT_ARROW);
							}),
							$.subscribe(s.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
								e.fire(s.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH);
							}),
							$.subscribe(s.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START, function () {
								e.fire(s.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START);
							}),
							$.subscribe(s.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH, function () {
								e.fire(s.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH);
							}),
							$.subscribe(s.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
								e.fire(s.BaseEvents.LEFTPANEL_EXPAND_FULL_START);
							}),
							$.subscribe(s.BaseEvents.LOAD_FAILED, function () {
								e.fire(s.BaseEvents.LOAD_FAILED),
									null == !t.lastCanvasIndex &&
										t.lastCanvasIndex !== t.helper.canvasIndex &&
										$.publish(s.BaseEvents.CANVAS_INDEX_CHANGED, [t.lastCanvasIndex]);
							}),
							$.subscribe(s.BaseEvents.MANIFEST_INDEX_CHANGED, function (t, n) {
								(e.data.manifestIndex = n),
									e.fire(s.BaseEvents.MANIFEST_INDEX_CHANGED, e.data.manifestIndex);
							}),
							$.subscribe(s.BaseEvents.NOT_FOUND, function () {
								e.fire(s.BaseEvents.NOT_FOUND);
							}),
							$.subscribe(s.BaseEvents.OPEN, function () {
								e.fire(s.BaseEvents.OPEN);
								var t = Utils.Strings.format(
									e.data.config.options.openTemplate,
									e.helper.iiifResourceUri
								);
								window.open(t);
							}),
							$.subscribe(s.BaseEvents.OPEN_LEFT_PANEL, function () {
								e.fire(s.BaseEvents.OPEN_LEFT_PANEL), e.resize();
							}),
							$.subscribe(s.BaseEvents.OPEN_EXTERNAL_RESOURCE, function () {
								e.fire(s.BaseEvents.OPEN_EXTERNAL_RESOURCE);
							}),
							$.subscribe(s.BaseEvents.OPEN_RIGHT_PANEL, function () {
								e.fire(s.BaseEvents.OPEN_RIGHT_PANEL), e.resize();
							}),
							$.subscribe(s.BaseEvents.PAGE_DOWN, function () {
								e.fire(s.BaseEvents.PAGE_DOWN);
							}),
							$.subscribe(s.BaseEvents.PAGE_UP, function () {
								e.fire(s.BaseEvents.PAGE_UP);
							}),
							$.subscribe(s.BaseEvents.RANGE_CHANGED, function (t, n) {
								n
									? ((e.data.rangeId = n.id),
									  (e.helper.rangeId = n.id),
									  e.fire(s.BaseEvents.RANGE_CHANGED, e.data.rangeId))
									: ((e.data.rangeId = void 0),
									  (e.helper.rangeId = null),
									  e.fire(s.BaseEvents.RANGE_CHANGED, null));
							}),
							$.subscribe(s.BaseEvents.RESOURCE_DEGRADED, function (t, n) {
								e.fire(s.BaseEvents.RESOURCE_DEGRADED), i.Auth09.handleDegraded(n);
							}),
							$.subscribe(s.BaseEvents.RETURN, function () {
								e.fire(s.BaseEvents.RETURN);
							}),
							$.subscribe(s.BaseEvents.RIGHT_ARROW, function () {
								e.fire(s.BaseEvents.RIGHT_ARROW);
							}),
							$.subscribe(s.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_FINISH, function () {
								e.fire(s.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_FINISH);
							}),
							$.subscribe(s.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_START, function () {
								e.fire(s.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_START);
							}),
							$.subscribe(s.BaseEvents.RIGHTPANEL_EXPAND_FULL_FINISH, function () {
								e.fire(s.BaseEvents.RIGHTPANEL_EXPAND_FULL_FINISH);
							}),
							$.subscribe(s.BaseEvents.RIGHTPANEL_EXPAND_FULL_START, function () {
								e.fire(s.BaseEvents.RIGHTPANEL_EXPAND_FULL_START);
							}),
							$.subscribe(s.BaseEvents.SEQUENCE_INDEX_CHANGED, function (t, n) {
								(e.data.sequenceIndex = n),
									e.fire(s.BaseEvents.SEQUENCE_INDEX_CHANGED, e.data.sequenceIndex);
							}),
							$.subscribe(s.BaseEvents.SETTINGS_CHANGED, function (t, n) {
								e.fire(s.BaseEvents.SETTINGS_CHANGED, n);
							}),
							$.subscribe(s.BaseEvents.SHOW_DOWNLOAD_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_DOWNLOAD_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_EMBED_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_EMBED_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_GENERIC_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_GENERIC_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_HELP_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_HELP_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_INFORMATION, function () {
								e.fire(s.BaseEvents.SHOW_INFORMATION);
							}),
							$.subscribe(s.BaseEvents.SHOW_LOGIN_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_LOGIN_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_MESSAGE, function (t, n) {
								e.showMessage(n);
							}),
							$.subscribe(s.BaseEvents.SHOW_RESTRICTED_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_RESTRICTED_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_OVERLAY, function () {
								e.fire(s.BaseEvents.SHOW_OVERLAY);
							}),
							$.subscribe(s.BaseEvents.SHOW_SETTINGS_DIALOGUE, function () {
								e.fire(s.BaseEvents.SHOW_SETTINGS_DIALOGUE);
							}),
							$.subscribe(s.BaseEvents.SHOW_TERMS_OF_USE, function () {
								e.fire(s.BaseEvents.SHOW_TERMS_OF_USE);
								var t = e.helper.getLicense();
								if (!t) {
									var n = e.helper.getRequiredStatement();
									n && n.value && (t = n.value);
								}
								t && e.showMessage(t);
							}),
							$.subscribe(s.BaseEvents.THUMB_SELECTED, function (t, n) {
								e.fire(s.BaseEvents.THUMB_SELECTED, n.index);
							}),
							$.subscribe(s.BaseEvents.TOGGLE_FULLSCREEN, function () {
								$('#top').focus(),
									(e.component.isFullScreen = !e.component.isFullScreen),
									e.component.isFullScreen
										? e.$element.addClass('fullscreen')
										: e.$element.removeClass('fullscreen'),
									e.fire(s.BaseEvents.TOGGLE_FULLSCREEN, {
										isFullScreen: e.component.isFullScreen,
										overrideFullScreen: e.data.config.options.overrideFullScreen
									});
							}),
							$.subscribe(s.BaseEvents.UP_ARROW, function () {
								e.fire(s.BaseEvents.UP_ARROW);
							}),
							$.subscribe(s.BaseEvents.UPDATE_SETTINGS, function () {
								e.fire(s.BaseEvents.UPDATE_SETTINGS);
							}),
							$.subscribe(s.BaseEvents.VIEW_FULL_TERMS, function () {
								e.fire(s.BaseEvents.VIEW_FULL_TERMS);
							}),
							$.subscribe(s.BaseEvents.WINDOW_UNLOAD, function () {
								e.fire(s.BaseEvents.WINDOW_UNLOAD);
							}),
							(this.shell = new h.Shell(this.$element)),
							this.getDependencies(function (t) {
								e.loadDependencies(t);
							});
					}),
					(e.prototype.createModules = function () {
						(this.$authDialogue = $('<div class="overlay auth" aria-hidden="true"></div>')),
							h.Shell.$overlays.append(this.$authDialogue),
							(this.authDialogue = new r.AuthDialogue(this.$authDialogue)),
							(this.$clickThroughDialogue = $(
								'<div class="overlay clickthrough" aria-hidden="true"></div>'
							)),
							h.Shell.$overlays.append(this.$clickThroughDialogue),
							(this.clickThroughDialogue = new a.ClickThroughDialogue(this.$clickThroughDialogue)),
							(this.$restrictedDialogue = $(
								'<div class="overlay login" aria-hidden="true"></div>'
							)),
							h.Shell.$overlays.append(this.$restrictedDialogue),
							(this.restrictedDialogue = new c.RestrictedDialogue(this.$restrictedDialogue)),
							(this.$loginDialogue = $('<div class="overlay login" aria-hidden="true"></div>')),
							h.Shell.$overlays.append(this.$loginDialogue),
							(this.loginDialogue = new u.LoginDialogue(this.$loginDialogue));
					}),
					(e.prototype.modulesCreated = function () {}),
					(e.prototype.getDependencies = function (e) {
						var t = this,
							n = this.data.root + '/lib/' + this.name + '-dependencies',
							i = $('script[data-requiremodule]').filter(function () {
								var e = $(this).attr('data-requiremodule');
								return -1 !== e.indexOf(t.name) && -1 !== e.indexOf('dependencies');
							});
						i.length
							? e(null)
							: requirejs([n], function (n) {
									var i = t.helper.getCurrentCanvas(),
										o = t.getMediaFormats(i),
										r = [];
									o &&
										o.length &&
										(r = o.map(function (e) {
											return e.getFormat().toString();
										}));
									var s = n(r),
										a = t.data.root + '/lib/';
									if (s.sync)
										for (var u = 0; u < s.sync.length; u++) {
											var l = s.sync[u];
											l.startsWith('!') || (s.sync[u] = a + l);
										}
									if (s.async)
										for (var u = 0; u < s.async.length; u++) {
											var l = s.async[u];
											l.startsWith('!') || (s.async[u] = a + l);
										}
									e(s);
							  });
					}),
					(e.prototype.loadDependencies = function (e) {
						var t = this;
						e
							? e.sync
								? p.SynchronousRequire.load(e.sync, t.dependencyLoaded).then(function () {
										e.async
											? requirejs(e.async, function () {
													t.dependenciesLoaded(arguments);
											  })
											: t.dependenciesLoaded();
								  })
								: e.async
								? requirejs(e.async, function () {
										t.dependenciesLoaded(arguments);
								  })
								: t.dependenciesLoaded()
							: t.dependenciesLoaded();
					}),
					(e.prototype.dependencyLoaded = function (e, t) {}),
					(e.prototype.dependenciesLoaded = function () {
						for (var e = this, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
						this.createModules(),
							this.modulesCreated(),
							$.publish(s.BaseEvents.RESIZE),
							setTimeout(function () {
								e.render(), $.publish(s.BaseEvents.CREATED), e._setDefaultFocus();
							}, 1);
					}),
					(e.prototype.render = function () {
						if (
							((this.isCreated && this.data.collectionIndex === this.helper.collectionIndex) ||
								$.publish(s.BaseEvents.COLLECTION_INDEX_CHANGED, [this.data.collectionIndex]),
							(this.isCreated && this.data.manifestIndex === this.helper.manifestIndex) ||
								$.publish(s.BaseEvents.MANIFEST_INDEX_CHANGED, [this.data.manifestIndex]),
							(this.isCreated && this.data.sequenceIndex === this.helper.sequenceIndex) ||
								$.publish(s.BaseEvents.SEQUENCE_INDEX_CHANGED, [this.data.sequenceIndex]),
							(this.isCreated && this.data.canvasIndex === this.helper.canvasIndex) ||
								$.publish(s.BaseEvents.CANVAS_INDEX_CHANGED, [this.data.canvasIndex]),
							(!this.isCreated || this.data.rangeId !== this.helper.rangeId) && this.data.rangeId)
						) {
							var e = this.helper.getRangeById(this.data.rangeId);
							e
								? $.publish(s.BaseEvents.RANGE_CHANGED, [e])
								: console.warn('range id not found:', this.data.rangeId);
						}
					}),
					(e.prototype._setDefaultFocus = function () {
						var e = this;
						setTimeout(function () {
							e.data.config.options.allowStealFocus && $('[tabindex=0]').focus();
						}, 1);
					}),
					(e.prototype.width = function () {
						return this.$element.width();
					}),
					(e.prototype.height = function () {
						return this.$element.height();
					}),
					(e.prototype.exitFullScreen = function () {
						$.publish(s.BaseEvents.EXIT_FULLSCREEN);
					}),
					(e.prototype.fire = function (e) {
						for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
						this.component.fire(e, arguments[1]);
					}),
					(e.prototype.redirect = function (e) {
						this.fire(s.BaseEvents.REDIRECT, e);
					}),
					(e.prototype.refresh = function () {
						this.fire(s.BaseEvents.REFRESH, null);
					}),
					(e.prototype._initLocales = function () {
						var e = this.data.config.localisation.locales.slice(0),
							t = this.data.locales,
							n = [];
						if (t) {
							t.forEach(function (t) {
								var i = e.filter(function (e) {
									return e.name === t.name;
								});
								if (i.length) {
									var o = i[0];
									t.label && (o.label = t.label), (o.added = !0), n.push(o);
								}
							});
							var i = Utils.Bools.getBool(this.data.config.options.limitLocales, !1);
							i ||
								e.forEach(function (e) {
									e.added || n.push(e), delete e.added;
								}),
								(this.data.locales = n);
						} else console.warn('No locales configured');
					}),
					(e.prototype._parseMetrics = function () {
						var e = this.data.config.options.metrics;
						if (e)
							for (var t = 0; t < e.length; t++) {
								var n = e[t];
								'string' == typeof n.type && (n.type = new l.MetricType(n.type)),
									this.metrics.push(n);
							}
					}),
					(e.prototype._updateMetric = function () {
						var e = this;
						setTimeout(function () {
							for (var t = !1, n = 0; n < e.metrics.length; n++) {
								var i = e.metrics[n];
								e.width() >= i.minWidth &&
									e.width() <= i.maxWidth &&
									e.height() >= i.minHeight &&
									e.height() <= i.maxHeight &&
									((t = !0),
									e.metric !== i.type &&
										((e.metric = i.type), $.publish(s.BaseEvents.METRIC_CHANGED)));
							}
							t ||
								(e.metric !== l.MetricType.NONE &&
									((e.metric = l.MetricType.NONE), $.publish(s.BaseEvents.METRIC_CHANGED)));
						}, 1);
					}),
					(e.prototype.resize = function () {
						this._updateMetric(), $.publish(s.BaseEvents.RESIZE);
					}),
					(e.prototype.reload = function (e) {
						$.publish(s.BaseEvents.RELOAD, [e]);
					}),
					(e.prototype.isSeeAlsoEnabled = function () {
						return this.data.config.options.seeAlsoEnabled !== !1;
					}),
					(e.prototype.getShareUrl = function () {
						if (!this.data.embedded)
							return Utils.Documents.isInIFrame()
								? parent.document.location.href
								: document.location.href;
						if (this.helper.hasRelatedPage()) {
							var e = this.helper.getRelated();
							return e && e.length && (e = e[0]), e['@id'];
						}
						return null;
					}),
					(e.prototype.getIIIFShareUrl = function () {
						return this.helper.iiifResourceUri + '?manifest=' + this.helper.iiifResourceUri;
					}),
					(e.prototype.addTimestamp = function (e) {
						return e + '?t=' + Utils.Dates.getTimeStamp();
					}),
					(e.prototype.getDomain = function () {
						var e = Utils.Urls.getUrlParts(this.helper.iiifResourceUri);
						return e.host;
					}),
					(e.prototype.getAppUri = function () {
						var e = Utils.Urls.getUrlParts(document.location.href),
							t =
								window.location.protocol +
								'//' +
								window.location.hostname +
								(window.location.port ? ':' + window.location.port : ''),
							i = e.pathname;
						i.startsWith('/') || (i = '/' + i), (i = i.substr(0, i.lastIndexOf('/') + 1));
						var o = t + i,
							r = '';
						return (
							Utils.Documents.isInIFrame() ||
								((r = this.data.root || ''),
								r.startsWith('./') && (r = r.substr(2)),
								r && !r.endsWith('/') && (r += '/')),
							n.UVUtils.isValidUrl(r) ? r + 'uv.html' : o + r + 'uv.html'
						);
					}),
					(e.prototype.getSettings = function () {
						if (Utils.Bools.getBool(this.data.config.options.saveUserSettings, !1)) {
							var e = Utils.Storage.get('uv.settings', Utils.StorageType.local);
							if (e) return $.extend(this.data.config.options, e.value);
						}
						return this.data.config.options;
					}),
					(e.prototype.updateSettings = function (e) {
						if (Utils.Bools.getBool(this.data.config.options.saveUserSettings, !1)) {
							var t = Utils.Storage.get('uv.settings', Utils.StorageType.local);
							t && (e = $.extend(t.value, e)),
								Utils.Storage.set('uv.settings', e, 31536e4, Utils.StorageType.local);
						}
						this.data.config.options = $.extend(this.data.config.options, e);
					}),
					(e.prototype.getLocale = function () {
						return this.helper.options.locale;
					}),
					(e.prototype.getSharePreview = function () {
						var e = this.helper.getLabel(),
							t = this.helper.getCurrentCanvas(),
							n = t.getProperty('thumbnail');
						return (
							(n && 'string' == typeof n) ||
								(n = t.getCanonicalImageUri(this.data.config.options.bookmarkThumbWidth)),
							{ title: e, image: n }
						);
					}),
					(e.prototype.getPagedIndices = function (e) {
						return void 0 === e && (e = this.helper.canvasIndex), [e];
					}),
					(e.prototype.getCurrentCanvases = function () {
						for (
							var e = this.getPagedIndices(this.helper.canvasIndex), t = [], n = 0;
							n < e.length;
							n++
						) {
							var i = e[n],
								o = this.helper.getCanvasByIndex(i);
							t.push(o);
						}
						return t;
					}),
					(e.prototype.getCanvasLabels = function (e) {
						var t = this.getPagedIndices(),
							n = '';
						if (1 === t.length) n = e;
						else for (var i = 1; i <= t.length; i++) n.length && (n += ','), (n += e + ' ' + i);
						return n;
					}),
					(e.prototype.getCurrentCanvasRange = function () {
						var e = this.helper.getCanvasRange(this.helper.getCurrentCanvas());
						return e;
					}),
					(e.prototype.getExternalResources = function (e) {
						var t = this,
							n = this.getPagedIndices(),
							r = [];
						n.forEach(function (n) {
							var i,
								o = t.helper.getCanvasByIndex(n);
							if (
								((i = o.externalResource
									? o.externalResource
									: new Manifold.ExternalResource(o, {
											authApiVersion: t.data.config.options.authAPIVersion
									  })),
								e)
							) {
								var s = e.find(function (e) {
									return e.dataUri === i.dataUri;
								});
								s ? r.push(s) : r.push(i);
							} else r.push(i);
						});
						var s = this.data.config.options.tokenStorage,
							a = this.data.config.options.authAPIVersion;
						return 1 === a
							? new Promise(function (e) {
									var n = { locale: t.helper.options.locale };
									o.Auth1.loadExternalResources(r, s, n).then(function (n) {
										(t.resources = n.map(function (e) {
											return t._prepareResourceData(e);
										})),
											e(t.resources);
									});
							  })
							: new Promise(function (e) {
									i.Auth09.loadExternalResources(r, s).then(function (n) {
										(t.resources = n.map(function (e) {
											return t._prepareResourceData(e);
										})),
											e(t.resources);
									});
							  });
					}),
					(e.prototype._prepareResourceData = function (e) {
						return (
							(e.data.hasServiceDescriptor = e.hasServiceDescriptor()),
							e.hasServiceDescriptor() ||
								((e.data.id = e.dataUri), (e.data.width = e.width), (e.data.height = e.height)),
							(e.data.index = e.index),
							Utils.Objects.toPlainObject(e.data)
						);
					}),
					(e.prototype.getMediaFormats = function (e) {
						var t = e.getContent();
						if (t && t.length) {
							var n = t[0];
							return n.getBody();
						}
						var i = {
							id: e.id,
							type: e.getType(),
							getFormat: function () {
								return '';
							}
						};
						return [i];
					}),
					(e.prototype.viewCanvas = function (e) {
						return this.helper.isCanvasIndexOutOfRange(e)
							? void this.showMessage(this.data.config.content.canvasIndexOutOfRange)
							: void $.publish(s.BaseEvents.OPEN_EXTERNAL_RESOURCE);
					}),
					(e.prototype.showMessage = function (e, t, n, i) {
						this.closeActiveDialogue(),
							$.publish(s.BaseEvents.SHOW_GENERIC_DIALOGUE, [
								{ message: e, acceptCallback: t, buttonText: n, allowClose: i }
							]);
					}),
					(e.prototype.closeActiveDialogue = function () {
						$.publish(s.BaseEvents.CLOSE_ACTIVE_DIALOGUE);
					}),
					(e.prototype.isOverlayActive = function () {
						return h.Shell.$overlays.is(':visible');
					}),
					(e.prototype.isDesktopMetric = function () {
						return this.metric.toString() === l.MetricType.DESKTOP.toString();
					}),
					(e.prototype.isWatchMetric = function () {
						return this.metric.toString() === l.MetricType.WATCH.toString();
					}),
					(e.prototype.isCatchAllMetric = function () {
						return this.metric.toString() === l.MetricType.NONE.toString();
					}),
					(e.prototype.viewManifest = function (e) {
						var t = {};
						(t.iiifResourceUri = this.helper.iiifResourceUri),
							(t.collectionIndex = this.helper.getCollectionIndex(e) || 0),
							(t.manifestIndex = e.index),
							(t.sequenceIndex = 0),
							(t.canvasIndex = 0),
							this.reload(t);
					}),
					(e.prototype.viewCollection = function (e) {
						var t = {};
						(t.iiifResourceUri = this.helper.iiifResourceUri),
							(t.collectionIndex = e.index),
							(t.manifestIndex = 0),
							(t.sequenceIndex = 0),
							(t.canvasIndex = 0),
							this.reload(t);
					}),
					(e.prototype.isFullScreen = function () {
						return this.component.isFullScreen;
					}),
					(e.prototype.isHeaderPanelEnabled = function () {
						return Utils.Bools.getBool(this.data.config.options.headerPanelEnabled, !0);
					}),
					(e.prototype.isLeftPanelEnabled = function () {
						if (Utils.Bools.getBool(this.data.config.options.leftPanelEnabled, !0)) {
							if (this.helper.hasParentCollection()) return !0;
							if (this.helper.isMultiCanvas()) {
								var e = this.helper.getViewingHint();
								if (!e || (e && e.toString() !== manifesto.ViewingHint.continuous().toString()))
									return !0;
							}
						}
						return !1;
					}),
					(e.prototype.isRightPanelEnabled = function () {
						return Utils.Bools.getBool(this.data.config.options.rightPanelEnabled, !0);
					}),
					(e.prototype.isFooterPanelEnabled = function () {
						return Utils.Bools.getBool(this.data.config.options.footerPanelEnabled, !0);
					}),
					(e.prototype.isMobile = function () {
						return $.browser.mobile;
					}),
					(e.prototype.useArrowKeysToNavigate = function () {
						return Utils.Bools.getBool(this.data.config.options.useArrowKeysToNavigate, !0);
					}),
					(e.prototype.bookmark = function () {}),
					(e.prototype.feedback = function () {
						this.fire(s.BaseEvents.FEEDBACK, this.data);
					}),
					(e.prototype.getAlternateLocale = function () {
						var e = null;
						return (
							this.data.locales && this.data.locales.length > 1 && (e = this.data.locales[1]), e
						);
					}),
					(e.prototype.getSerializedLocales = function () {
						return this.data.locales ? this.serializeLocales(this.data.locales) : null;
					}),
					(e.prototype.serializeLocales = function (e) {
						for (var t = '', n = 0; n < e.length; n++) {
							var i = e[n];
							n > 0 && (t += ','), (t += i.name), i.label && (t += ':' + i.label);
						}
						return t;
					}),
					(e.prototype.changeLocale = function (e) {
						var t = {};
						if (this.data.locales) {
							t.locales = this.data.locales.slice(0);
							var n = t.locales.findIndex(function (t) {
									return t.name === e;
								}),
								i = 0;
							t.locales.splice(i, 0, t.locales.splice(n, 1)[0]), this.reload(t);
						}
					}),
					e
				);
			})();
			t.BaseExtension = d;
		}
	);
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-contentleftpanel-module/GalleryView', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/BaseView'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			var n = e.call(this, t, !0, !0) || this;
			return (n.isOpen = !1), n;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('contentLeftPanel'),
					e.prototype.create.call(this),
					(this.$gallery = $('<div class="iiif-gallery-component"></div>')),
					this.$element.append(this.$gallery);
			}),
			(t.prototype.setup = function () {
				(this.galleryComponent = new IIIFComponents.GalleryComponent({ target: this.$gallery[0] })),
					this.galleryComponent.on(
						'thumbSelected',
						function (e) {
							$.publish(n.BaseEvents.GALLERY_THUMB_SELECTED, [e]),
								$.publish(n.BaseEvents.THUMB_SELECTED, [e]);
						},
						!1
					),
					this.galleryComponent.on(
						'decreaseSize',
						function () {
							$.publish(n.BaseEvents.GALLERY_DECREASE_SIZE);
						},
						!1
					),
					this.galleryComponent.on(
						'increaseSize',
						function () {
							$.publish(n.BaseEvents.GALLERY_INCREASE_SIZE);
						},
						!1
					);
			}),
			(t.prototype.databind = function () {
				(this.galleryComponent.options.data = this.galleryData),
					this.galleryComponent.set(this.galleryData),
					this.resize();
			}),
			(t.prototype.show = function () {
				var e = this;
				(this.isOpen = !0),
					this.$element.show(),
					setTimeout(function () {
						e.galleryComponent.selectIndex(e.extension.helper.canvasIndex);
					}, 10);
			}),
			(t.prototype.hide = function () {
				(this.isOpen = !1), this.$element.hide();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
				var t = this.$gallery.find('.main'),
					n = this.$gallery.find('.header');
				t.height(this.$element.height() - n.height());
			}),
			t
		);
	})(i.BaseView);
	t.GalleryView = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/BaseExpandPanel', ['require', 'exports', './BaseView'], function (
	e,
	t,
	n
) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			var n = e.call(this, t, !1, !0) || this;
			return (
				(n.isExpanded = !1),
				(n.isFullyExpanded = !1),
				(n.isUnopened = !0),
				(n.autoToggled = !1),
				(n.expandFullEnabled = !0),
				n
			);
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				e.prototype.create.call(this),
					(this.$top = $('<div class="top"></div>')),
					this.$element.append(this.$top),
					(this.$title = $('<div class="title"></div>')),
					this.$title.prop('title', this.content.title),
					this.$top.append(this.$title),
					(this.$expandFullButton = $('<a class="expandFullButton" tabindex="0"></a>')),
					this.$expandFullButton.prop('title', this.content.expandFull),
					this.$top.append(this.$expandFullButton),
					Utils.Bools.getBool(this.config.options.expandFullEnabled, !0) ||
						this.$expandFullButton.hide(),
					(this.$collapseButton = $('<div class="collapseButton" tabindex="0"></div>')),
					this.$collapseButton.prop('title', this.content.collapse),
					this.$top.append(this.$collapseButton),
					(this.$closed = $('<div class="closed"></div>')),
					this.$element.append(this.$closed),
					(this.$expandButton = $('<a class="expandButton" tabindex="0"></a>')),
					this.$expandButton.prop('title', this.content.expand),
					this.$closed.append(this.$expandButton),
					(this.$closedTitle = $('<a class="title"></a>')),
					this.$closedTitle.prop('title', this.content.title),
					this.$closed.append(this.$closedTitle),
					(this.$main = $('<div class="main"></div>')),
					this.$element.append(this.$main),
					this.$expandButton.onPressed(function () {
						t.toggle();
					}),
					this.$expandFullButton.onPressed(function () {
						t.expandFull();
					}),
					this.$closedTitle.onPressed(function () {
						t.toggle();
					}),
					this.$title.onPressed(function () {
						t.isFullyExpanded ? t.collapseFull() : t.toggle();
					}),
					this.$collapseButton.onPressed(function () {
						t.isFullyExpanded ? t.collapseFull() : t.toggle();
					}),
					this.$top.hide(),
					this.$main.hide();
			}),
			(t.prototype.init = function () {
				e.prototype.init.call(this);
			}),
			(t.prototype.setTitle = function (e) {
				this.$title.text(e), this.$closedTitle.text(e);
			}),
			(t.prototype.toggle = function (e) {
				var t = this;
				e ? (this.autoToggled = !0) : (this.autoToggled = !1),
					this.isExpanded &&
						(this.$top.attr('aria-hidden', 'true'),
						this.$main.attr('aria-hidden', 'true'),
						this.$closed.attr('aria-hidden', 'false'),
						this.$top.hide(),
						this.$main.hide(),
						this.$closed.show()),
					this.$element
						.stop()
						.animate(
							{ width: this.getTargetWidth(), left: this.getTargetLeft() },
							this.options.panelAnimationDuration,
							function () {
								t.toggled();
							}
						);
			}),
			(t.prototype.toggled = function () {
				this.toggleStart(),
					(this.isExpanded = !this.isExpanded),
					this.isExpanded &&
						(this.$top.attr('aria-hidden', 'false'),
						this.$main.attr('aria-hidden', 'false'),
						this.$closed.attr('aria-hidden', 'true'),
						this.$closed.hide(),
						this.$top.show(),
						this.$main.show()),
					this.toggleFinish(),
					(this.isUnopened = !1);
			}),
			(t.prototype.expandFull = function () {
				var e = this;
				this.isExpanded || this.toggled();
				var t = this.getFullTargetWidth(),
					n = this.getFullTargetLeft();
				this.expandFullStart(),
					this.$element
						.stop()
						.animate({ width: t, left: n }, this.options.panelAnimationDuration, function () {
							e.expandFullFinish();
						});
			}),
			(t.prototype.collapseFull = function () {
				var e = this,
					t = this.getTargetWidth(),
					n = this.getTargetLeft();
				this.collapseFullStart(),
					this.$element
						.stop()
						.animate({ width: t, left: n }, this.options.panelAnimationDuration, function () {
							e.collapseFullFinish();
						});
			}),
			(t.prototype.getTargetWidth = function () {
				return 0;
			}),
			(t.prototype.getTargetLeft = function () {
				return 0;
			}),
			(t.prototype.getFullTargetWidth = function () {
				return 0;
			}),
			(t.prototype.getFullTargetLeft = function () {
				return 0;
			}),
			(t.prototype.toggleStart = function () {}),
			(t.prototype.toggleFinish = function () {
				this.isExpanded && !this.autoToggled
					? this.focusCollapseButton()
					: this.focusExpandButton();
			}),
			(t.prototype.expandFullStart = function () {}),
			(t.prototype.expandFullFinish = function () {
				(this.isFullyExpanded = !0), this.$expandFullButton.hide(), this.focusCollapseButton();
			}),
			(t.prototype.collapseFullStart = function () {}),
			(t.prototype.collapseFullFinish = function () {
				(this.isFullyExpanded = !1),
					this.expandFullEnabled && this.$expandFullButton.show(),
					this.focusExpandFullButton();
			}),
			(t.prototype.focusExpandButton = function () {
				var e = this;
				setTimeout(function () {
					e.$expandButton.focus();
				}, 1);
			}),
			(t.prototype.focusExpandFullButton = function () {
				var e = this;
				setTimeout(function () {
					e.$expandFullButton.focus();
				}, 1);
			}),
			(t.prototype.focusCollapseButton = function () {
				var e = this;
				setTimeout(function () {
					e.$collapseButton.focus();
				}, 1);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.$main.height(this.$element.parent().height() - this.$top.outerHeight(!0));
			}),
			t
		);
	})(n.BaseView);
	t.BaseExpandPanel = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-shared-module/LeftPanel',
	['require', 'exports', './BaseEvents', './BaseExpandPanel'],
	function (e, t, n, i) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var o = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					e.prototype.create.call(this),
						this.$element.width(this.options.panelCollapsedWidth),
						$.subscribe(n.BaseEvents.TOGGLE_EXPAND_LEFT_PANEL, function () {
							t.isFullyExpanded ? t.collapseFull() : t.expandFull();
						});
				}),
				(t.prototype.init = function () {
					e.prototype.init.call(this);
					var t = Utils.Bools.getBool(
						this.extension.getSettings().leftPanelOpen,
						this.options.panelOpen
					);
					t && this.toggle(!0);
				}),
				(t.prototype.getTargetWidth = function () {
					return this.isFullyExpanded || !this.isExpanded
						? this.options.panelExpandedWidth
						: this.options.panelCollapsedWidth;
				}),
				(t.prototype.getFullTargetWidth = function () {
					return this.$element.parent().width();
				}),
				(t.prototype.toggleFinish = function () {
					e.prototype.toggleFinish.call(this),
						this.isExpanded
							? $.publish(n.BaseEvents.OPEN_LEFT_PANEL)
							: $.publish(n.BaseEvents.CLOSE_LEFT_PANEL),
						this.extension.updateSettings({ leftPanelOpen: this.isExpanded });
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this),
						this.isFullyExpanded && this.$element.width(this.$element.parent().width());
				}),
				t
			);
		})(i.BaseExpandPanel);
		t.LeftPanel = o;
	}
),
	define('extensions/uv-seadragon-extension/Mode', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e) {
				this.value = e;
			}
			return (
				(e.prototype.toString = function () {
					return this.value;
				}),
				(e.image = new e('image')),
				(e.page = new e('page')),
				e
			);
		})();
		t.Mode = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-shared-module/ThumbsView',
	['require', 'exports', './BaseEvents', './BaseView'],
	function (e, t, n, i) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var o = (function (e) {
			function t(t) {
				var n = e.call(this, t, !0, !0) || this;
				return (n.isCreated = !1), (n.isOpen = !1), n;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					e.prototype.create.call(this),
						$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
							t.selectIndex(parseInt(n));
						}),
						$.subscribe(n.BaseEvents.LOGIN, function () {
							t.loadThumbs();
						}),
						$.subscribe(n.BaseEvents.CLICKTHROUGH, function () {
							t.loadThumbs();
						}),
						(this.$thumbs = $('<div class="thumbs"></div>')),
						this.$element.append(this.$thumbs);
					var i =
						this.extension.helper.getViewingDirection() || manifesto.ViewingDirection.leftToRight();
					this.$thumbs.addClass(i.toString());
					var o = this;
					$.templates({
						thumbsTemplate:
							'<div id="thumb{{>index}}" class="{{:~className()}}" data-src="{{>uri}}" data-visible="{{>visible}}" data-index="{{>index}}">                                <div class="wrap" style="height:{{>height + ~extraHeight()}}px"></div>                                <div class="info">                                    <span class="index">{{:#index + 1}}</span>                                    <span class="label" title="{{>label}}">{{>label}}&nbsp;</span>                                    <span class="searchResults" title="{{:~searchResultsTitle()}}">{{>data.searchResults}}</span>                                </div>                             </div>                             {{if ~separator()}}                                  <div class="separator"></div>                              {{/if}}'
					});
					var r = this.options.thumbsExtraHeight;
					$.views.helpers({
						separator: function () {
							return !1;
						},
						extraHeight: function () {
							return r;
						},
						className: function () {
							var e = 'thumb';
							0 === this.data.index && (e += ' first'), this.data.uri || (e += ' placeholder');
							var t = o.extension.helper.getViewingDirection();
							return (e +=
								!t ||
								(t.toString() !== manifesto.ViewingDirection.leftToRight().toString() &&
									t.toString() !== manifesto.ViewingDirection.rightToLeft().toString())
									? o.extension.helper.isPaged()
										? ' twoCol'
										: ' oneCol'
									: ' twoCol');
						},
						searchResultsTitle: function () {
							var e = Number(this.data.data.searchResults);
							return e
								? e > 1
									? Utils.Strings.format(o.content.searchResults, e.toString())
									: Utils.Strings.format(o.content.searchResult, e.toString())
								: '';
						}
					}),
						this.$element.on(
							'scroll',
							function () {
								t.scrollStop();
							},
							100
						),
						this.resize();
				}),
				(t.prototype.databind = function () {
					this.thumbs &&
						((this._$thumbsCache = null),
						this.createThumbs(),
						this.loadThumbs(0),
						this.selectIndex(this.extension.helper.canvasIndex));
				}),
				(t.prototype.createThumbs = function () {
					var e = this;
					if (this.thumbs) {
						for (var t = [], i = 0; i < this.thumbs.length; i++) {
							var o = this.thumbs[i];
							t.push(o.height);
						}
						for (var r = Utils.Maths.median(t), i = 0; i < this.thumbs.length; i++) {
							var o = this.thumbs[i];
							o.height = r;
						}
						this.$thumbs.link($.templates.thumbsTemplate, this.thumbs),
							this.$thumbs.undelegate('.thumb', 'click'),
							this.$thumbs.delegate('.thumb', 'click', function (t) {
								t.preventDefault();
								var i = $.view(this).data;
								(e.lastThumbClickedIndex = i.index), $.publish(n.BaseEvents.THUMB_SELECTED, [i]);
							}),
							this.setLabel(),
							(this.isCreated = !0);
					}
				}),
				(t.prototype.scrollStop = function () {
					var e =
						1 / ((this.$thumbs.height() - this.$element.height()) / this.$element.scrollTop());
					e > 1 && (e = 1);
					var t = Math.floor((this.thumbs.length - 1) * e);
					this.loadThumbs(t);
				}),
				(t.prototype.loadThumbs = function (e) {
					if (
						(void 0 === e && (e = this.extension.helper.canvasIndex),
						this.thumbs && this.thumbs.length)
					) {
						var t,
							n = this.extension.helper.getCanvasByIndex(e),
							i = n.getContent();
						if (i.length) {
							var o = i[0],
								r = o.getBody();
							if (r.length) {
								var s = r[0].getType();
								s && (t = s.toString().toLowerCase());
							}
						}
						for (
							var a = e,
								u = this.options.thumbsLoadRange,
								l = {
									start: a > u ? a - u : 0,
									end: a < this.thumbs.length - 1 - u ? a + u : this.thumbs.length - 1
								},
								c = this.options.thumbsImageFadeInDuration,
								h = this,
								p = l.start;
							p <= l.end;
							p++
						) {
							var d = this.getThumbByIndex(p),
								f = d.find('.wrap');
							if (!f.hasClass('loading') && !f.hasClass('loaded')) {
								var g = d.attr('data-visible');
								if ('false' !== g) {
									f.removeClass('loadingFailed'), f.addClass('loading'), t && f.addClass(t);
									var v = d.attr('data-src');
									h.config.options.thumbsCacheInvalidation &&
										h.config.options.thumbsCacheInvalidation.enabled &&
										(v +=
											h.config.options.thumbsCacheInvalidation.paramType +
											't=' +
											Utils.Dates.getTimeStamp());
									var m = $('<img src="' + v + '" alt=""/>');
									m.hide(),
										m.on('load', function () {
											$(this).fadeIn(c, function () {
												$(this).parent().switchClass('loading', 'loaded');
											});
										}),
										m.on('error', function () {
											$(this).parent().switchClass('loading', 'loadingFailed');
										}),
										f.append(m);
								} else f.addClass('hidden');
							}
						}
					}
				}),
				(t.prototype.show = function () {
					var e = this;
					(this.isOpen = !0),
						this.$element.show(),
						setTimeout(function () {
							e.selectIndex(e.extension.helper.canvasIndex);
						}, 1);
				}),
				(t.prototype.hide = function () {
					(this.isOpen = !1), this.$element.hide();
				}),
				(t.prototype.isPDF = function () {
					var e = this.extension.helper.getCurrentCanvas(),
						t = e.getType();
					return t ? t.toString().includes('pdf') : !1;
				}),
				(t.prototype.setLabel = function () {
					$(this.$thumbs).find('span.index').hide(), $(this.$thumbs).find('span.label').show();
				}),
				(t.prototype.addSelectedClassToThumbs = function (e) {
					this.getThumbByIndex(e).addClass('selected');
				}),
				(t.prototype.selectIndex = function (e) {
					if (-1 !== e && this.thumbs && this.thumbs.length) {
						this.getAllThumbs().removeClass('selected'),
							(this.$selectedThumb = this.getThumbByIndex(e)),
							this.addSelectedClassToThumbs(e);
						var t = this.extension.getPagedIndices(e);
						~t.indexOf(this.lastThumbClickedIndex) ||
							this.$element.scrollTop(this.$selectedThumb.position().top),
							this.loadThumbs(e);
					}
				}),
				(t.prototype.getAllThumbs = function () {
					return (
						this._$thumbsCache || (this._$thumbsCache = this.$thumbs.find('.thumb')),
						this._$thumbsCache
					);
				}),
				(t.prototype.getThumbByIndex = function (e) {
					return this.$thumbs.find('[data-index="' + e + '"]');
				}),
				(t.prototype.scrollToThumb = function (e) {
					var t = this.getThumbByIndex(e);
					this.$element.scrollTop(t.position().top);
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this);
				}),
				t
			);
		})(i.BaseView);
		t.ThumbsView = o;
	}
),
	define('extensions/uv-seadragon-extension/Events', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return (
				(e.namespace = 'openseadragonExtension.'),
				(e.CURRENT_VIEW_URI = e.namespace + 'currentViewUri'),
				(e.IMAGE_SEARCH = e.namespace + 'imageSearch'),
				(e.MODE_CHANGED = e.namespace + 'modeChanged'),
				(e.NEXT_SEARCH_RESULT = e.namespace + 'nextSearchResult'),
				(e.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE =
					e.namespace + 'nextImagesSearchResultUnavailable'),
				(e.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE =
					e.namespace + 'prevImagesSearchResultUnavailable'),
				(e.PAGE_SEARCH = e.namespace + 'pageSearch'),
				(e.PAGING_TOGGLED = e.namespace + 'pagingToggled'),
				(e.PREV_SEARCH_RESULT = e.namespace + 'prevSearchResult'),
				(e.PRINT = e.namespace + 'print'),
				(e.ROTATE = e.namespace + 'rotate'),
				(e.SEADRAGON_ANIMATION_FINISH = e.namespace + 'animationFinish'),
				(e.SEADRAGON_ANIMATION_START = e.namespace + 'animationStart'),
				(e.SEADRAGON_ANIMATION = e.namespace + 'animation'),
				(e.SEADRAGON_OPEN = e.namespace + 'open'),
				(e.SEADRAGON_RESIZE = e.namespace + 'resize'),
				(e.SEADRAGON_ROTATION = e.namespace + 'rotationChanged'),
				(e.SEARCH_PREVIEW_FINISH = e.namespace + 'searchPreviewFinish'),
				(e.SEARCH_PREVIEW_START = e.namespace + 'searchPreviewStart'),
				(e.SEARCH = e.namespace + 'search'),
				(e.XYWH_CHANGED = e.namespace + 'xywhChanged'),
				(e.ZOOM_IN = e.namespace + 'zoomIn'),
				(e.ZOOM_OUT = e.namespace + 'zoomOut'),
				e
			);
		})();
		t.Events = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-contentleftpanel-module/ThumbsView', [
	'require',
	'exports',
	'../uv-shared-module/ThumbsView',
	'../../extensions/uv-seadragon-extension/Events',
	'../../extensions/uv-seadragon-extension/Mode'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t() {
			return (null !== e && e.apply(this, arguments)) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('contentLeftPanel'),
					e.prototype.create.call(this),
					$.subscribe(i.Events.MODE_CHANGED, function () {
						t.setLabel();
					}),
					$.subscribe(i.Events.SEARCH_PREVIEW_START, function (e, n) {
						t.searchPreviewStart(n);
					}),
					$.subscribe(i.Events.SEARCH_PREVIEW_FINISH, function () {
						t.searchPreviewFinish();
					}),
					this.extension.helper.isPaged() && this.$thumbs.addClass('paged');
				var n = this;
				$.views.helpers({
					separator: function () {
						return n.extension.helper.isPaged() && (this.data.index - 1) % 2 == 0 ? !1 : !0;
					}
				});
			}),
			(t.prototype.addSelectedClassToThumbs = function (e) {
				for (var t = this.extension.getPagedIndices(e), n = 0; n < t.length; n++)
					this.getThumbByIndex(t[n]).addClass('selected');
			}),
			(t.prototype.isPageModeEnabled = function () {
				return 'function' == typeof this.extension.getMode
					? this.config.options.pageModeEnabled &&
							this.extension.getMode().toString() === o.Mode.page.toString()
					: this.config.options.pageModeEnabled;
			}),
			(t.prototype.searchPreviewStart = function (e) {
				this.scrollToThumb(e);
				var t = this.getThumbByIndex(e);
				t.addClass('searchpreview');
			}),
			(t.prototype.searchPreviewFinish = function () {
				this.scrollToThumb(this.extension.helper.canvasIndex),
					this.getAllThumbs().removeClass('searchpreview');
			}),
			(t.prototype.setLabel = function () {
				this.isPDF()
					? ($(this.$thumbs).find('span.index').hide(), $(this.$thumbs).find('span.label').hide())
					: this.isPageModeEnabled()
					? ($(this.$thumbs).find('span.index').hide(), $(this.$thumbs).find('span.label').show())
					: ($(this.$thumbs).find('span.index').show(), $(this.$thumbs).find('span.label').hide());
			}),
			t
		);
	})(n.ThumbsView);
	t.ThumbsView = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-contentleftpanel-module/TreeView', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/BaseView'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			var n = e.call(this, t, !0, !0) || this;
			return (n.isOpen = !1), n;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('contentLeftPanel'),
					e.prototype.create.call(this),
					(this.$tree = $('<div class="iiif-tree-component"></div>')),
					this.$element.append(this.$tree);
			}),
			(t.prototype.setup = function () {
				(this.treeComponent = new IIIFComponents.TreeComponent({
					target: this.$tree[0],
					data: this.treeData
				})),
					this.treeComponent.on(
						'treeNodeSelected',
						function (e) {
							$.publish(n.BaseEvents.TREE_NODE_SELECTED, [e]);
						},
						!1
					),
					this.treeComponent.on(
						'treeNodeMultiSelected',
						function (e) {
							$.publish(n.BaseEvents.TREE_NODE_MULTISELECTED, [e]);
						},
						!1
					);
			}),
			(t.prototype.databind = function () {
				this.treeComponent.set(this.treeData), this.resize();
			}),
			(t.prototype.show = function () {
				(this.isOpen = !0), this.$element.show();
			}),
			(t.prototype.hide = function () {
				(this.isOpen = !1), this.$element.hide();
			}),
			(t.prototype.selectNode = function (e) {
				this.treeComponent.selectNode(e);
			}),
			(t.prototype.deselectCurrentNode = function () {
				this.treeComponent.deselectCurrentNode();
			}),
			(t.prototype.getNodeById = function (e) {
				return this.treeComponent.getNodeById(e);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(i.BaseView);
	t.TreeView = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-contentleftpanel-module/ContentLeftPanel',
	[
		'require',
		'exports',
		'../uv-shared-module/BaseEvents',
		'./GalleryView',
		'../uv-shared-module/LeftPanel',
		'../../extensions/uv-seadragon-extension/Mode',
		'./ThumbsView',
		'./TreeView'
	],
	function (e, t, n, i, o, r, s, a) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var u = (function (e) {
			function t(t) {
				var n = e.call(this, t) || this;
				return (
					(n.expandFullEnabled = !1),
					(n.isThumbsViewOpen = !1),
					(n.isTreeViewOpen = !1),
					(n.treeSortType = Manifold.TreeSortType.NONE),
					n
				);
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					this.setConfig('contentLeftPanel'),
						e.prototype.create.call(this),
						$.subscribe(n.BaseEvents.SETTINGS_CHANGED, function () {
							t.databind();
						}),
						$.subscribe(n.BaseEvents.GALLERY_THUMB_SELECTED, function () {
							t.collapseFull();
						}),
						$.subscribe(n.BaseEvents.METRIC_CHANGED, function () {
							t.extension.isDesktopMetric() || (t.isFullyExpanded && t.collapseFull());
						}),
						$.subscribe(n.BaseEvents.ANNOTATIONS, function () {
							t.databindThumbsView(), t.databindGalleryView();
						}),
						$.subscribe(n.BaseEvents.ANNOTATIONS_CLEARED, function () {
							t.databindThumbsView(), t.databindGalleryView();
						}),
						$.subscribe(n.BaseEvents.ANNOTATIONS_EMPTY, function () {
							t.databindThumbsView(), t.databindGalleryView();
						}),
						$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function () {
							t.isFullyExpanded && t.collapseFull(),
								t.selectCurrentTreeNode(),
								t.updateTreeTabBySelection();
						}),
						$.subscribe(n.BaseEvents.RANGE_CHANGED, function () {
							t.isFullyExpanded && t.collapseFull(),
								t.selectCurrentTreeNode(),
								t.updateTreeTabBySelection();
						}),
						(this.$tabs = $('<div class="tabs"></div>')),
						this.$main.append(this.$tabs),
						(this.$treeButton = $(
							'<a class="index tab" tabindex="0">' + this.content.index + '</a>'
						)),
						this.$tabs.append(this.$treeButton),
						(this.$thumbsButton = $(
							'<a class="thumbs tab" tabindex="0">' + this.content.thumbnails + '</a>'
						)),
						this.$thumbsButton.prop('title', this.content.thumbnails),
						this.$tabs.append(this.$thumbsButton),
						(this.$tabsContent = $('<div class="tabsContent"></div>')),
						this.$main.append(this.$tabsContent),
						(this.$options = $('<div class="options"></div>')),
						this.$tabsContent.append(this.$options),
						(this.$topOptions = $('<div class="top"></div>')),
						this.$options.append(this.$topOptions),
						(this.$treeSelect = $(
							'<select aria-label="' + this.content.manifestRanges + '"></select>'
						)),
						this.$topOptions.append(this.$treeSelect),
						(this.$bottomOptions = $('<div class="bottom"></div>')),
						this.$options.append(this.$bottomOptions),
						(this.$leftOptions = $('<div class="left"></div>')),
						this.$bottomOptions.append(this.$leftOptions),
						(this.$rightOptions = $('<div class="right"></div>')),
						this.$bottomOptions.append(this.$rightOptions),
						(this.$treeViewOptions = $('<div class="treeView"></div>')),
						this.$leftOptions.append(this.$treeViewOptions),
						(this.$sortByLabel = $('<span class="sort">' + this.content.sortBy + '</span>')),
						this.$treeViewOptions.append(this.$sortByLabel),
						(this.$sortButtonGroup = $('<div class="btn-group"></div>')),
						this.$treeViewOptions.append(this.$sortButtonGroup),
						(this.$sortByDateButton = $(
							'<button class="btn tabindex="0"">' + this.content.date + '</button>'
						)),
						this.$sortButtonGroup.append(this.$sortByDateButton),
						(this.$sortByVolumeButton = $(
							'<button class="btn" tabindex="0">' + this.content.volume + '</button>'
						)),
						this.$sortButtonGroup.append(this.$sortByVolumeButton),
						(this.$views = $('<div class="views"></div>')),
						this.$tabsContent.append(this.$views),
						(this.$treeView = $('<div class="treeView"></div>')),
						this.$views.append(this.$treeView),
						(this.$thumbsView = $('<div class="thumbsView" tabindex="0"></div>')),
						this.$views.append(this.$thumbsView),
						(this.$galleryView = $('<div class="galleryView"></div>')),
						this.$views.append(this.$galleryView),
						this.$treeSelect.hide(),
						this.$treeSelect.change(function () {
							t.databindTreeView(), t.selectCurrentTreeNode(), t.updateTreeTabBySelection();
						}),
						this.$sortByDateButton.on('click', function () {
							t.sortByDate();
						}),
						this.$sortByVolumeButton.on('click', function () {
							t.sortByVolume();
						}),
						this.$treeViewOptions.hide(),
						this.$treeButton.onPressed(function () {
							t.openTreeView();
						}),
						this.$thumbsButton.onPressed(function () {
							t.openThumbsView();
						}),
						this.setTitle(this.content.title),
						this.$sortByVolumeButton.addClass('on');
					var i = this.options.tabOrder;
					if (i) {
						(i = i.toLowerCase()), (i = i.replace(/ /g, ''));
						var o = i.split(',');
						'thumbs' === o[0]
							? (this.$treeButton.before(this.$thumbsButton), this.$thumbsButton.addClass('first'))
							: this.$treeButton.addClass('first');
					}
				}),
				(t.prototype.createTreeView = function () {
					(this.treeView = new a.TreeView(this.$treeView)),
						(this.treeView.treeData = this.getTreeData()),
						this.treeView.setup(),
						this.databindTreeView();
					var e = this.extension.helper.getTopRanges();
					if (e.length > 1)
						for (var t = 0; t < e.length; t++) {
							var n = e[t];
							this.$treeSelect.append(
								'<option value="' +
									n.id +
									'">' +
									Manifesto.LanguageMap.getValue(n.getLabel()) +
									'</option>'
							);
						}
					this.updateTreeViewOptions();
				}),
				(t.prototype.databind = function () {
					this.databindThumbsView(), this.databindTreeView(), this.databindGalleryView();
				}),
				(t.prototype.updateTreeViewOptions = function () {
					var e = this.getTree();
					e &&
						(this.isCollection() && this.extension.helper.treeHasNavDates(e)
							? this.$treeViewOptions.show()
							: this.$treeViewOptions.hide(),
						this.$treeSelect.find('option').length
							? this.$treeSelect.show()
							: this.$treeSelect.hide());
				}),
				(t.prototype.sortByDate = function () {
					(this.treeSortType = Manifold.TreeSortType.DATE),
						(this.treeView.treeData = this.getTreeData()),
						this.treeView.databind(),
						this.selectCurrentTreeNode(),
						this.$sortByDateButton.addClass('on'),
						this.$sortByVolumeButton.removeClass('on'),
						this.resize();
				}),
				(t.prototype.sortByVolume = function () {
					(this.treeSortType = Manifold.TreeSortType.NONE),
						(this.treeView.treeData = this.getTreeData()),
						this.treeView.databind(),
						this.selectCurrentTreeNode(),
						this.$sortByDateButton.removeClass('on'),
						this.$sortByVolumeButton.addClass('on'),
						this.resize();
				}),
				(t.prototype.isCollection = function () {
					var e = this.getTree();
					if (e) return e.data.type === manifesto.TreeNodeType.collection().toString();
					throw new Error('Tree not available');
				}),
				(t.prototype.databindTreeView = function () {
					this.treeView &&
						((this.treeView.treeData = this.getTreeData()),
						this.treeView.databind(),
						this.selectCurrentTreeNode());
				}),
				(t.prototype.getTreeData = function () {
					return {
						autoExpand: this._isTreeAutoExpanded(),
						branchNodesExpandOnClick: Utils.Bools.getBool(
							this.config.options.branchNodesExpandOnClick,
							!0
						),
						branchNodesSelectable: Utils.Bools.getBool(
							this.config.options.branchNodesSelectable,
							!1
						),
						helper: this.extension.helper,
						topRangeIndex: this.getSelectedTopRangeIndex(),
						treeSortType: this.treeSortType
					};
				}),
				(t.prototype._isTreeAutoExpanded = function () {
					var e = Utils.Bools.getBool(this.config.options.autoExpandTreeEnabled, !1),
						t = this.config.options.autoExpandTreeIfFewerThan || 0;
					if (e) {
						var n = this.extension.helper.getFlattenedTree();
						if (n.length < t) return !0;
					}
					return !1;
				}),
				(t.prototype.updateTreeTabByCanvasIndex = function () {
					var e = this.extension.helper.getTopRanges();
					if (e.length > 1) {
						var t = this.getCurrentCanvasTopRangeIndex();
						if (-1 === t) return;
						var n = e[t];
						this.setTreeTabTitle(Manifesto.LanguageMap.getValue(n.getLabel()));
					} else this.setTreeTabTitle(this.content.index);
				}),
				(t.prototype.setTreeTabTitle = function (e) {
					this.$treeButton.text(e), this.$treeButton.prop('title', e);
				}),
				(t.prototype.updateTreeTabBySelection = function () {
					var e = null,
						t = this.extension.helper.getTopRanges();
					t.length > 1 &&
						(e = this.treeView
							? this.getSelectedTree().text()
							: Manifesto.LanguageMap.getValue(t[0].getLabel())),
						e ? this.setTreeTabTitle(e) : this.setTreeTabTitle(this.content.index);
				}),
				(t.prototype.getViewingHint = function () {
					return this.extension.helper.getViewingHint();
				}),
				(t.prototype.getViewingDirection = function () {
					return this.extension.helper.getViewingDirection();
				}),
				(t.prototype.createThumbsView = function () {
					(this.thumbsView = new s.ThumbsView(this.$thumbsView)), this.databindThumbsView();
				}),
				(t.prototype.databindThumbsView = function () {
					if (this.thumbsView) {
						var e,
							t,
							n = this.getViewingHint(),
							i = this.getViewingDirection();
						!i ||
						(i.toString() !== manifesto.ViewingDirection.leftToRight().toString() &&
							i.toString() !== manifesto.ViewingDirection.rightToLeft().toString())
							? n && n.toString() === manifesto.ViewingHint.paged().toString()
								? ((e = this.config.options.twoColThumbWidth),
								  (t = this.config.options.twoColThumbHeight))
								: ((e = this.config.options.oneColThumbWidth),
								  (t = this.config.options.oneColThumbHeight))
							: ((e = this.config.options.twoColThumbWidth),
							  (t = this.config.options.twoColThumbHeight));
						var o = this.extension.helper.getThumbs(e, t);
						i &&
							i.toString() === manifesto.ViewingDirection.bottomToTop().toString() &&
							o.reverse();
						var r = this.extension.annotations;
						if (r && r.length)
							for (
								var s = function (e) {
										var t = r[e],
											n = o
												.en()
												.where(function (e) {
													return e.index === t.canvasIndex;
												})
												.first();
										if (n) {
											var i = $.extend(!0, {}, n.data);
											(i.searchResults = t.rects.length), (n.data = i);
										}
									},
									a = 0;
								a < r.length;
								a++
							)
								s(a);
						(this.thumbsView.thumbs = o), this.thumbsView.databind();
					}
				}),
				(t.prototype.createGalleryView = function () {
					(this.galleryView = new i.GalleryView(this.$galleryView)),
						(this.galleryView.galleryData = this.getGalleryData()),
						this.galleryView.setup(),
						this.databindGalleryView();
				}),
				(t.prototype.databindGalleryView = function () {
					this.galleryView &&
						((this.galleryView.galleryData = this.getGalleryData()), this.galleryView.databind());
				}),
				(t.prototype.getGalleryData = function () {
					return {
						helper: this.extension.helper,
						chunkedResizingThreshold: this.config.options.galleryThumbChunkedResizingThreshold,
						content: this.config.content,
						debug: !1,
						imageFadeInDuration: 300,
						initialZoom: 6,
						minLabelWidth: 20,
						pageModeEnabled: this.isPageModeEnabled(),
						scrollStopDuration: 100,
						searchResults: this.extension.annotations,
						sizingEnabled: Modernizr.inputtypes.range,
						thumbHeight: this.config.options.galleryThumbHeight,
						thumbLoadPadding: this.config.options.galleryThumbLoadPadding,
						thumbWidth: this.config.options.galleryThumbWidth,
						viewingDirection: this.getViewingDirection()
					};
				}),
				(t.prototype.isPageModeEnabled = function () {
					return 'function' == typeof this.extension.getMode
						? Utils.Bools.getBool(this.config.options.pageModeEnabled, !0) &&
								this.extension.getMode().toString() === r.Mode.page.toString()
						: Utils.Bools.getBool(this.config.options.pageModeEnabled, !0);
				}),
				(t.prototype.getSelectedTree = function () {
					return this.$treeSelect.find(':selected');
				}),
				(t.prototype.getSelectedTopRangeIndex = function () {
					var e = this.getSelectedTree().index();
					return -1 === e && (e = 0), e;
				}),
				(t.prototype.getTree = function () {
					var e = this.getSelectedTopRangeIndex();
					return this.extension.helper.getTree(e, Manifold.TreeSortType.NONE);
				}),
				(t.prototype.toggleFinish = function () {
					if ((e.prototype.toggleFinish.call(this), this.isUnopened)) {
						var t = Utils.Bools.getBool(this.config.options.treeEnabled, !0),
							n = Utils.Bools.getBool(this.config.options.thumbsEnabled, !0),
							i = this.getTree();
						(i && i.nodes.length) || (t = !1),
							(t && n) || this.$tabs.hide(),
							n && this.defaultToThumbsView() ? this.openThumbsView() : t && this.openTreeView();
					}
				}),
				(t.prototype.defaultToThumbsView = function () {
					var e = Utils.Bools.getBool(this.config.options.defaultToTreeEnabled, !1),
						t = this.config.options.defaultToTreeIfGreaterThan || 0,
						n = this.getTree();
					return e && n && n.nodes.length > t ? !1 : !0;
				}),
				(t.prototype.expandFullStart = function () {
					e.prototype.expandFullStart.call(this),
						$.publish(n.BaseEvents.LEFTPANEL_EXPAND_FULL_START);
				}),
				(t.prototype.expandFullFinish = function () {
					e.prototype.expandFullFinish.call(this),
						this.$treeButton.hasClass('on')
							? this.openTreeView()
							: this.$thumbsButton.hasClass('on') && this.openThumbsView(),
						$.publish(n.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH);
				}),
				(t.prototype.collapseFullStart = function () {
					e.prototype.collapseFullStart.call(this),
						$.publish(n.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START);
				}),
				(t.prototype.collapseFullFinish = function () {
					e.prototype.collapseFullFinish.call(this),
						this.$thumbsButton.hasClass('on') && this.openThumbsView(),
						$.publish(n.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH);
				}),
				(t.prototype.openTreeView = function () {
					(this.isTreeViewOpen = !0),
						(this.isThumbsViewOpen = !1),
						this.treeView || this.createTreeView(),
						this.$treeButton.addClass('on'),
						this.$thumbsButton.removeClass('on'),
						this.treeView.show(),
						this.thumbsView && this.thumbsView.hide(),
						this.galleryView && this.galleryView.hide(),
						this.updateTreeViewOptions(),
						this.selectCurrentTreeNode(),
						this.resize(),
						this.treeView.resize(),
						$.publish(n.BaseEvents.OPEN_TREE_VIEW);
				}),
				(t.prototype.openThumbsView = function () {
					(this.isTreeViewOpen = !1),
						(this.isThumbsViewOpen = !0),
						this.thumbsView || this.createThumbsView(),
						this.isFullyExpanded && !this.galleryView && this.createGalleryView(),
						this.$treeButton.removeClass('on'),
						this.$thumbsButton.addClass('on'),
						this.treeView && this.treeView.hide(),
						this.$treeSelect.hide(),
						this.$treeViewOptions.hide(),
						this.resize(),
						this.isFullyExpanded
							? (this.thumbsView.hide(),
							  this.galleryView && this.galleryView.show(),
							  this.galleryView && this.galleryView.resize())
							: (this.galleryView && this.galleryView.hide(),
							  this.thumbsView.show(),
							  this.thumbsView.resize()),
						$.publish(n.BaseEvents.OPEN_THUMBS_VIEW);
				}),
				(t.prototype.selectTopRangeIndex = function (e) {
					this.$treeSelect.prop('selectedIndex', e);
				}),
				(t.prototype.getCurrentCanvasTopRangeIndex = function () {
					var e = -1,
						t = this.extension.getCurrentCanvasRange();
					return t && (e = Number(t.path.split('/')[0])), e;
				}),
				(t.prototype.selectCurrentTreeNode = function () {
					'uv-seadragon-extension' === this.extension.name
						? this.selectCurrentTreeNodeByCanvas()
						: this.selectCurrentTreeNodeByRange();
				}),
				(t.prototype.selectCurrentTreeNodeByRange = function () {
					if (this.treeView) {
						var e = this.extension.helper.getCurrentRange(),
							t = null;
						e && e.treeNode && (t = this.treeView.getNodeById(e.treeNode.id)),
							t ? this.treeView.selectNode(t) : this.treeView.deselectCurrentNode();
					}
				}),
				(t.prototype.selectCurrentTreeNodeByCanvas = function () {
					if (this.treeView) {
						var e = null,
							t = this.getCurrentCanvasTopRangeIndex(),
							n = this.getSelectedTopRangeIndex(),
							i = t === n,
							o = null;
						-1 !== t &&
							((o = this.extension.getCurrentCanvasRange()),
							o && o.treeNode && (e = this.treeView.getNodeById(o.treeNode.id))),
							e && i
								? this.treeView.selectNode(e)
								: ((o = this.extension.helper.getCurrentRange()),
								  o && o.treeNode && (e = this.treeView.getNodeById(o.treeNode.id)),
								  e ? this.treeView.selectNode(e) : this.treeView.deselectCurrentNode());
					}
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this),
						this.$tabsContent.height(
							this.$main.height() -
								(this.$tabs.is(':visible') ? this.$tabs.height() : 0) -
								this.$tabsContent.verticalPadding()
						),
						this.$views.height(this.$tabsContent.height() - this.$options.outerHeight());
				}),
				t
			);
		})(o.LeftPanel);
		t.ContentLeftPanel = u;
	}
),
	define('modules/uv-shared-module/DownloadOption', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e) {
				this.value = e;
			}
			return (
				(e.prototype.toString = function () {
					return this.value;
				}),
				(e.currentViewAsJpg = new e('currentViewAsJpg')),
				(e.dynamicCanvasRenderings = new e('dynamicCanvasRenderings')),
				(e.dynamicImageRenderings = new e('dynamicImageRenderings')),
				(e.dynamicSequenceRenderings = new e('dynamicSequenceRenderings')),
				(e.entireFileAsOriginal = new e('entireFileAsOriginal')),
				(e.rangeRendering = new e('rangeRendering')),
				(e.selection = new e('selection')),
				(e.wholeImageHighRes = new e('wholeImageHighRes')),
				(e.wholeImageLowResAsJpg = new e('wholeImageLowResAsJpg')),
				(e.wholeImagesHighRes = new e('wholeImagesHighRes')),
				e
			);
		})();
		t.DownloadOption = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-dialogues-module/DownloadDialogue',
	[
		'require',
		'exports',
		'../uv-shared-module/BaseEvents',
		'../uv-shared-module/Dialogue',
		'../uv-shared-module/DownloadOption'
	],
	function (e, t, n, i, o) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var r = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					this.setConfig('downloadDialogue'),
						e.prototype.create.call(this),
						(this.openCommand = n.BaseEvents.SHOW_DOWNLOAD_DIALOGUE),
						(this.closeCommand = n.BaseEvents.HIDE_DOWNLOAD_DIALOGUE),
						$.subscribe(this.openCommand, function (e, n) {
							t.open(n);
						}),
						$.subscribe(this.closeCommand, function () {
							t.close();
						}),
						(this.$title = $('<h1>' + this.content.title + '</h1>')),
						this.$content.append(this.$title),
						(this.$noneAvailable = $(
							'<div class="noneAvailable">' + this.content.noneAvailable + '</div>'
						)),
						this.$content.append(this.$noneAvailable),
						(this.$downloadOptions = $('<ol class="options"></ol>')),
						this.$content.append(this.$downloadOptions),
						(this.$footer = $('<div class="footer"></div>')),
						this.$content.append(this.$footer),
						(this.$termsOfUseButton = $(
							'<a href="#">' + this.extension.data.config.content.termsOfUse + '</a>'
						)),
						this.$footer.append(this.$termsOfUseButton),
						this.$termsOfUseButton.onPressed(function () {
							$.publish(n.BaseEvents.SHOW_TERMS_OF_USE);
						}),
						this.$element.hide(),
						this.updateTermsOfUseButton();
				}),
				(t.prototype.addEntireFileDownloadOptions = function () {
					if (this.isDownloadOptionAvailable(o.DownloadOption.entireFileAsOriginal)) {
						this.$downloadOptions.empty();
						for (
							var e = this.extension.helper.getCurrentCanvas(),
								t = !1,
								n = e.getRenderings(),
								i = 0;
							i < n.length;
							i++
						) {
							var r = n[i],
								s = r.getFormat(),
								a = '';
							s && (a = s.toString()),
								this.addEntireFileDownloadOption(
									r.id,
									Manifesto.LanguageMap.getValue(r.getLabel()),
									a
								),
								(t = !0);
						}
						if (!t) {
							for (var u = !1, l = e.getContent(), i = 0; i < l.length; i++) {
								var c = l[i],
									h = c.getBody();
								if (h.length) {
									var a = h[0].getFormat();
									a && (this.addEntireFileDownloadOption(h[0].id, '', a.toString()), (u = !0));
								}
							}
							u || this.addEntireFileDownloadOption(e.id, '', '');
						}
					}
				}),
				(t.prototype.addEntireFileDownloadOption = function (e, t, n) {
					var i;
					(i = n ? Utils.Files.simplifyMimeType(n) : this.getFileExtension(e)),
						t || (t = this.content.entireFileAsOriginal),
						i && (t += ' (' + i + ')'),
						this.$downloadOptions.append(
							'<li><a href="' + e + '" target="_blank" download tabindex="0">' + t + '</li>'
						);
				}),
				(t.prototype.resetDynamicDownloadOptions = function () {
					(this.renderingUrls = []),
						(this.renderingUrlsCount = 0),
						this.$downloadOptions.find('li.dynamic').remove();
				}),
				(t.prototype.getDownloadOptionsForRenderings = function (e, t, n) {
					for (var i = e.getRenderings(), o = [], r = 0; r < i.length; r++) {
						var s = i[r];
						if (s) {
							var a = Manifesto.LanguageMap.getValue(s.getLabel(), this.extension.getLocale()),
								u = 'downloadOption' + ++this.renderingUrlsCount;
							a ? (a += ' ({0})') : (a = t);
							var l = Utils.Files.simplifyMimeType(s.getFormat().toString());
							(a = Utils.Strings.format(a, l)), (this.renderingUrls[u] = s.id);
							var c = $(
								'<li class="option dynamic"><input id="' +
									u +
									'" data-mime="' +
									l +
									'" title="' +
									a +
									'" type="radio" name="downloadOptions" tabindex="0" /><label for="' +
									u +
									'">' +
									a +
									'</label></li>'
							);
							o.push({ type: n, button: c });
						}
					}
					return o;
				}),
				(t.prototype.getSelectedOption = function () {
					return this.$downloadOptions.find('li.option input:checked');
				}),
				(t.prototype.getCurrentResourceId = function () {
					var e = this.extension.helper.getCurrentCanvas();
					return e.externalResource.data.id;
				}),
				(t.prototype.getCurrentResourceFormat = function () {
					var e = this.getCurrentResourceId();
					return e.substr(e.lastIndexOf('.') + 1).toLowerCase();
				}),
				(t.prototype.updateNoneAvailable = function () {
					this.$downloadOptions.find('li:visible').length
						? this.$noneAvailable.hide()
						: this.$noneAvailable.show();
				}),
				(t.prototype.updateTermsOfUseButton = function () {
					var e = this.extension.helper.getRequiredStatement();
					Utils.Bools.getBool(this.extension.data.config.options.termsOfUseEnabled, !1) &&
					e &&
					e.value
						? this.$termsOfUseButton.show()
						: this.$termsOfUseButton.hide();
				}),
				(t.prototype.getFileExtension = function (e) {
					var t = e.split('.').pop();
					return t.length > 5 || -1 !== t.indexOf('/') ? null : t;
				}),
				(t.prototype.isDownloadOptionAvailable = function (e) {
					switch (e) {
						case o.DownloadOption.entireFileAsOriginal:
							var t = this.extension.helper.manifest.getService(
								manifesto.ServiceProfile.uiExtensions()
							);
							if (t && !this.extension.helper.isUIEnabled('mediaDownload')) return !1;
					}
					return !0;
				}),
				(t.prototype.close = function () {
					e.prototype.close.call(this);
				}),
				(t.prototype.resize = function () {
					this.setDockedPosition();
				}),
				t
			);
		})(i.Dialogue);
		t.DownloadDialogue = r;
	}
),
	define('extensions/uv-seadragon-extension/DownloadType', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n;
		!(function (e) {
			(e.CURRENTVIEW = 'currentView'),
				(e.ENTIREDOCUMENTASPDF = 'entireDocumentAsPdf'),
				(e.ENTIREDOCUMENTASTEXT = 'entireDocumentAsText'),
				(e.WHOLEIMAGEHIGHRES = 'wholeImageHighRes'),
				(e.WHOLEIMAGESHIGHRES = 'wholeImageHighRes'),
				(e.WHOLEIMAGELOWRES = 'wholeImageLowRes'),
				(e.UNKNOWN = 'unknown');
		})((n = t.DownloadType || (t.DownloadType = {})));
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-av-extension/DownloadDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/DownloadDialogue',
	'../../modules/uv-shared-module/DownloadOption',
	'../uv-seadragon-extension/DownloadType',
	'../../modules/uv-shared-module/BaseEvents'
], function (e, t, n, i, o, r) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var s = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('downloadDialogue'),
					e.prototype.create.call(this),
					(this.$entireFileAsOriginal = $(
						'<li class="option single"><input id="' +
							i.DownloadOption.entireFileAsOriginal.toString() +
							'" type="radio" name="downloadOptions" tabindex="0" /><label id="' +
							i.DownloadOption.entireFileAsOriginal.toString() +
							'label" for="' +
							i.DownloadOption.entireFileAsOriginal.toString() +
							'"></label></li>'
					)),
					this.$downloadOptions.append(this.$entireFileAsOriginal),
					this.$entireFileAsOriginal.hide(),
					(this.$downloadButton = $(
						'<a class="btn btn-primary" href="#" tabindex="0">' + this.content.download + '</a>'
					)),
					this.$buttons.prepend(this.$downloadButton);
				var n = this;
				this.$downloadButton.on('click', function (e) {
					e.preventDefault();
					var i = n.getSelectedOption(),
						s = i.attr('id'),
						a = i.attr('title'),
						u = o.DownloadType.UNKNOWN;
					if (t.renderingUrls[s]) window.open(t.renderingUrls[s]);
					else {
						var l = t.getCurrentResourceId();
						window.open(l);
					}
					$.publish(r.BaseEvents.DOWNLOAD, [{ type: u, label: a }]), t.close();
				});
			}),
			(t.prototype._isAdaptive = function () {
				var e = this.getCurrentResourceFormat();
				return 'mpd' === e || 'm3u8' === e;
			}),
			(t.prototype.open = function (t) {
				if (
					(e.prototype.open.call(this, t),
					this.isDownloadOptionAvailable(i.DownloadOption.entireFileAsOriginal) &&
						!this._isAdaptive())
				) {
					var n = this.$entireFileAsOriginal.find('input'),
						o = this.$entireFileAsOriginal.find('label'),
						r = Utils.Strings.format(
							this.content.entireFileAsOriginalWithFormat,
							this.getCurrentResourceFormat()
						);
					o.text(r), n.prop('title', r), this.$entireFileAsOriginal.show();
				}
				if (
					(this.resetDynamicDownloadOptions(),
					this.isDownloadOptionAvailable(i.DownloadOption.rangeRendering))
				) {
					var s = this.extension.helper.getCurrentRange();
					if (s) {
						var a = this.getDownloadOptionsForRenderings(
							s,
							this.content.entireFileAsOriginal,
							i.DownloadOption.dynamicCanvasRenderings
						);
						this.addDownloadOptionsForRenderings(a);
					}
				}
				this.$downloadOptions.find('li.option:visible').length
					? (this.$downloadOptions.find('li.option input:visible:first').prop('checked', !0),
					  this.$noneAvailable.hide(),
					  this.$downloadButton.show())
					: (this.$noneAvailable.show(), this.$downloadButton.hide()),
					this.resize();
			}),
			(t.prototype.addDownloadOptionsForRenderings = function (e) {
				var t = this;
				e.forEach(function (e) {
					t.$downloadOptions.append(e.button);
				});
			}),
			(t.prototype.isDownloadOptionAvailable = function (t) {
				return e.prototype.isDownloadOptionAvailable.call(this, t);
			}),
			t
		);
	})(n.DownloadDialogue);
	t.DownloadDialogue = s;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/FooterPanel', [
	'require',
	'exports',
	'./BaseEvents',
	'./BaseView'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('footerPanel'),
					e.prototype.create.call(this),
					$.subscribe(n.BaseEvents.TOGGLE_FULLSCREEN, function () {
						t.updateFullScreenButton();
					}),
					$.subscribe(n.BaseEvents.METRIC_CHANGED, function () {
						t.updateMinimisedButtons(), t.updateMoreInfoButton();
					}),
					$.subscribe(n.BaseEvents.SETTINGS_CHANGED, function () {
						t.updateDownloadButton();
					}),
					(this.$options = $('<div class="options"></div>')),
					this.$element.append(this.$options),
					(this.$feedbackButton = $(
						'\n          <button class="feedback btn imageBtn" title="' +
							this.content.feedback +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-feedback" aria-hidden="true"></i>' +
							this.content.feedback +
							'\n          </button>\n        '
					)),
					this.$options.prepend(this.$feedbackButton),
					(this.$openButton = $(
						'\n          <button class="open btn imageBtn" title="' +
							this.content.open +
							'" tabindex="0">\n            <i class="uv-icon-open" aria-hidden="true"></i>' +
							this.content.open +
							'\n          </button>\n        '
					)),
					this.$options.prepend(this.$openButton),
					(this.$bookmarkButton = $(
						'\n          <button class="bookmark btn imageBtn" title="' +
							this.content.bookmark +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-bookmark" aria-hidden="true"></i>' +
							this.content.bookmark +
							'\n          </button>\n        '
					)),
					this.$options.prepend(this.$bookmarkButton),
					(this.$shareButton = $(
						'\n          <button class="share btn imageBtn" title="' +
							this.content.share +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-share" aria-hidden="true"></i>' +
							this.content.share +
							'\n          </button>\n        '
					)),
					this.$options.append(this.$shareButton),
					(this.$embedButton = $(
						'\n          <button class="embed btn imageBtn" title="' +
							this.content.embed +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-embed" aria-hidden="true"></i>' +
							this.content.embed +
							'\n          </button>\n        '
					)),
					this.$options.append(this.$embedButton),
					(this.$downloadButton = $(
						'\n          <button class="download btn imageBtn" title="' +
							this.content.download +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-download" aria-hidden="true"></i>' +
							this.content.download +
							'\n          </button>\n        '
					)),
					this.$options.prepend(this.$downloadButton),
					(this.$moreInfoButton = $(
						'\n          <button class="moreInfo btn imageBtn" title="' +
							this.content.moreInfo +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-more-info" aria-hidden="true"></i>' +
							this.content.moreInfo +
							'\n          </button>\n        '
					)),
					this.$options.prepend(this.$moreInfoButton),
					(this.$fullScreenBtn = $(
						'\n          <button class="fullScreen btn imageBtn" title="' +
							this.content.fullScreen +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-fullscreen" aria-hidden="true"></i>' +
							this.content.fullScreen +
							'\n          </button>\n        '
					)),
					this.$options.append(this.$fullScreenBtn),
					this.$openButton.onPressed(function () {
						$.publish(n.BaseEvents.OPEN);
					}),
					this.$feedbackButton.onPressed(function () {
						$.publish(n.BaseEvents.FEEDBACK);
					}),
					this.$bookmarkButton.onPressed(function () {
						$.publish(n.BaseEvents.BOOKMARK);
					}),
					this.$shareButton.onPressed(function () {
						$.publish(n.BaseEvents.SHOW_SHARE_DIALOGUE, [t.$shareButton]);
					}),
					this.$embedButton.onPressed(function () {
						$.publish(n.BaseEvents.SHOW_EMBED_DIALOGUE, [t.$embedButton]);
					}),
					this.$downloadButton.onPressed(function () {
						$.publish(n.BaseEvents.SHOW_DOWNLOAD_DIALOGUE, [t.$downloadButton]);
					}),
					this.$moreInfoButton.onPressed(function () {
						$.publish(n.BaseEvents.SHOW_MOREINFO_DIALOGUE, [t.$moreInfoButton]);
					}),
					this.$fullScreenBtn.on('click', function (e) {
						e.preventDefault(), $.publish(n.BaseEvents.TOGGLE_FULLSCREEN);
					}),
					Utils.Bools.getBool(this.options.embedEnabled, !0) || this.$embedButton.hide(),
					this.updateMoreInfoButton(),
					this.updateOpenButton(),
					this.updateFeedbackButton(),
					this.updateBookmarkButton(),
					this.updateEmbedButton(),
					this.updateDownloadButton(),
					this.updateFullScreenButton(),
					this.updateShareButton(),
					this.updateMinimisedButtons();
			}),
			(t.prototype.updateMinimisedButtons = function () {
				return Utils.Bools.getBool(this.options.minimiseButtons, !1)
					? void this.$options.addClass('minimiseButtons')
					: void (this.extension.isDesktopMetric()
							? this.$options.removeClass('minimiseButtons')
							: this.$options.addClass('minimiseButtons'));
			}),
			(t.prototype.updateMoreInfoButton = function () {
				var e = Utils.Bools.getBool(this.options.moreInfoEnabled, !1);
				!e || this.extension.isDesktopMetric() || this.extension.isCatchAllMetric()
					? this.$moreInfoButton.hide()
					: this.$moreInfoButton.show();
			}),
			(t.prototype.updateOpenButton = function () {
				var e = Utils.Bools.getBool(this.options.openEnabled, !1);
				e && Utils.Documents.isInIFrame() ? this.$openButton.show() : this.$openButton.hide();
			}),
			(t.prototype.updateFullScreenButton = function () {
				return Utils.Bools.getBool(this.options.fullscreenEnabled, !0) &&
					Utils.Documents.supportsFullscreen()
					? (this.extension.data.isLightbox && this.$fullScreenBtn.addClass('lightbox'),
					  void (this.extension.isFullScreen()
							? (this.$fullScreenBtn.switchClass('fullScreen', 'exitFullscreen'),
							  this.$fullScreenBtn
									.find('i')
									.switchClass('uv-icon-fullscreen', 'uv-icon-exit-fullscreen'),
							  this.$fullScreenBtn.attr('title', this.content.exitFullScreen),
							  $(this.$fullScreenBtn[0].firstChild.nextSibling.nextSibling).replaceWith(
									this.content.exitFullScreen
							  ))
							: (this.$fullScreenBtn.switchClass('exitFullscreen', 'fullScreen'),
							  this.$fullScreenBtn
									.find('i')
									.switchClass('uv-icon-exit-fullscreen', 'uv-icon-fullscreen'),
							  this.$fullScreenBtn.attr('title', this.content.fullScreen),
							  $(this.$fullScreenBtn[0].firstChild.nextSibling.nextSibling).replaceWith(
									this.content.fullScreen
							  ))))
					: void this.$fullScreenBtn.hide();
			}),
			(t.prototype.updateEmbedButton = function () {
				this.extension.helper.isUIEnabled('embed') &&
				Utils.Bools.getBool(this.options.embedEnabled, !1)
					? this.extension.isMobile() || this.$embedButton.show()
					: this.$embedButton.hide();
			}),
			(t.prototype.updateShareButton = function () {
				this.extension.helper.isUIEnabled('share') &&
				Utils.Bools.getBool(this.options.shareEnabled, !0)
					? this.$shareButton.show()
					: this.$shareButton.hide();
			}),
			(t.prototype.updateDownloadButton = function () {
				var e = Utils.Bools.getBool(this.options.downloadEnabled, !0);
				e ? this.$downloadButton.show() : this.$downloadButton.hide();
			}),
			(t.prototype.updateFeedbackButton = function () {
				var e = Utils.Bools.getBool(this.options.feedbackEnabled, !1);
				e ? this.$feedbackButton.show() : this.$feedbackButton.hide();
			}),
			(t.prototype.updateBookmarkButton = function () {
				var e = Utils.Bools.getBool(this.options.bookmarkEnabled, !1);
				e ? this.$bookmarkButton.show() : this.$bookmarkButton.hide();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(i.BaseView);
	t.FooterPanel = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-avmobilefooterpanel-module/MobileFooter',
	['require', 'exports', '../uv-shared-module/FooterPanel'],
	function (e, t, n) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var i = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					this.setConfig('mobileFooterPanel'), e.prototype.create.call(this);
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this),
						this.$options.css(
							'left',
							Math.floor(this.$element.width() / 2 - this.$options.width() / 2)
						);
				}),
				t
			);
		})(n.FooterPanel);
		t.FooterPanel = i;
	}
),
	define('modules/uv-shared-module/Information', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e, t) {
				(this.message = e), (this.actions = t);
			}
			return e;
		})();
		t.Information = n;
	}),
	define('modules/uv-shared-module/InformationAction', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return e;
		})();
		t.InformationAction = n;
	}),
	define(
		'modules/uv-shared-module/InformationFactory',
		[
			'require',
			'exports',
			'./BaseEvents',
			'./Information',
			'./InformationAction',
			'./InformationType'
		],
		function (e, t, n, i, o, r) {
			'use strict';
			Object.defineProperty(t, '__esModule', { value: !0 });
			var s = (function () {
				function e(e) {
					this.extension = e;
				}
				return (
					(e.prototype.Get = function (e) {
						switch (e.informationType) {
							case r.InformationType.AUTH_CORS_ERROR:
								return new i.Information(this.extension.data.config.content.authCORSError, []);
							case r.InformationType.DEGRADED_RESOURCE:
								var t = [],
									s = new o.InformationAction(),
									a = e.param.loginService.getConfirmLabel();
								a || (a = this.extension.data.config.content.fallbackDegradedLabel), (s.label = a);
								var u = e.param;
								(s.action = function () {
									(u.authHoldingPage = window.open('', '_blank')),
										$.publish(n.BaseEvents.HIDE_INFORMATION),
										$.publish(n.BaseEvents.OPEN_EXTERNAL_RESOURCE, [[u]]);
								}),
									t.push(s);
								var l = e.param.loginService.getServiceLabel();
								return (
									l || (l = this.extension.data.config.content.fallbackDegradedMessage),
									new i.Information(l, t)
								);
						}
					}),
					e
				);
			})();
			t.InformationFactory = s;
		}
	);
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/HeaderPanel', [
	'require',
	'exports',
	'./BaseEvents',
	'./BaseView',
	'../uv-shared-module/InformationFactory'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			return e.call(this, t, !1, !1) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('headerPanel'),
					e.prototype.create.call(this),
					$.subscribe(n.BaseEvents.SHOW_INFORMATION, function (e, n) {
						t.showInformation(n);
					}),
					$.subscribe(n.BaseEvents.HIDE_INFORMATION, function () {
						t.hideInformation();
					}),
					(this.$options = $('<div class="options"></div>')),
					this.$element.append(this.$options),
					(this.$centerOptions = $('<div class="centerOptions"></div>')),
					this.$options.append(this.$centerOptions),
					(this.$rightOptions = $('<div class="rightOptions"></div>')),
					this.$options.append(this.$rightOptions),
					(this.$localeToggleButton = $('<a class="localeToggle" tabindex="0"></a>')),
					this.$rightOptions.append(this.$localeToggleButton),
					(this.$settingsButton = $(
						'\n          <button class="btn imageBtn settings" tabindex="0" title="' +
							this.content.settings +
							'">\n            <i class="uv-icon-settings" aria-hidden="true"></i>' +
							this.content.settings +
							'\n          </button>\n        '
					)),
					this.$settingsButton.attr('title', this.content.settings),
					this.$rightOptions.append(this.$settingsButton),
					(this.$informationBox = $(
						'<div class="informationBox" aria-hidden="true">                                     <div class="message"></div>                                     <div class="actions"></div>                                     <button type="button" class="close" aria-label="Close">                                         <span aria-hidden="true">&times;</span>                                    </button>                                   </div>'
					)),
					this.$element.append(this.$informationBox),
					this.$informationBox.hide(),
					this.$informationBox.find('.close').attr('title', this.content.close),
					this.$informationBox.find('.close').on('click', function (e) {
						e.preventDefault(), $.publish(n.BaseEvents.HIDE_INFORMATION);
					}),
					this.$localeToggleButton.on('click', function () {
						t.extension.changeLocale(String(t.$localeToggleButton.data('locale')));
					}),
					this.$settingsButton.onPressed(function () {
						$.publish(n.BaseEvents.SHOW_SETTINGS_DIALOGUE);
					}),
					Utils.Bools.getBool(this.options.centerOptionsEnabled, !0) || this.$centerOptions.hide(),
					this.updateLocaleToggle(),
					this.updateSettingsButton();
			}),
			(t.prototype.updateLocaleToggle = function () {
				if (!this.localeToggleIsVisible()) return void this.$localeToggleButton.hide();
				var e = this.extension.getAlternateLocale(),
					t = e.name.split('-')[0].toUpperCase();
				this.$localeToggleButton.data('locale', e.name),
					this.$localeToggleButton.attr('title', e.label),
					this.$localeToggleButton.text(t);
			}),
			(t.prototype.updateSettingsButton = function () {
				var e = Utils.Bools.getBool(this.options.settingsButtonEnabled, !0);
				e ? this.$settingsButton.show() : this.$settingsButton.hide();
			}),
			(t.prototype.localeToggleIsVisible = function () {
				var e = this.extension.data.locales;
				return e ? e.length > 1 && Utils.Bools.getBool(this.options.localeToggleEnabled, !1) : !1;
			}),
			(t.prototype.showInformation = function (e) {
				var t = new o.InformationFactory(this.extension);
				this.information = t.Get(e);
				var n = this.$informationBox.find('.message');
				n.html(this.information.message).find('a').attr('target', '_top');
				var i = this.$informationBox.find('.actions');
				i.empty();
				for (var r = 0; r < this.information.actions.length; r++) {
					var s = this.information.actions[r],
						a = $('<a href="#" class="btn btn-default">' + s.label + '</a>');
					a.on('click', s.action), i.append(a);
				}
				this.$informationBox.attr('aria-hidden', 'false'),
					this.$informationBox.show(),
					this.$element.addClass('showInformation'),
					this.extension.resize();
			}),
			(t.prototype.hideInformation = function () {
				this.$element.removeClass('showInformation'),
					this.$informationBox.attr('aria-hidden', 'true'),
					this.$informationBox.hide(),
					this.extension.resize();
			}),
			(t.prototype.getSettings = function () {
				return this.extension.getSettings();
			}),
			(t.prototype.updateSettings = function (e) {
				this.extension.updateSettings(e), $.publish(n.BaseEvents.UPDATE_SETTINGS, [e]);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
				var t = this.$element.width(),
					n = t / 2,
					i = this.$centerOptions.outerWidth(),
					o = n - i / 2;
				if ((this.$centerOptions.css({ left: o }), this.$informationBox.is(':visible'))) {
					var r = this.$informationBox.find('.actions'),
						s = this.$informationBox.find('.message');
					s.width(
						Math.floor(this.$element.width()) -
							Math.ceil(s.horizontalMargins()) -
							Math.ceil(r.outerWidth(!0)) -
							Math.ceil(this.$informationBox.find('.close').outerWidth(!0)) -
							2
					),
						s.ellipsisFill(this.information.message);
				}
				this.extension.width() < this.extension.data.config.options.minWidthBreakPoint
					? this.localeToggleIsVisible() && this.$localeToggleButton.hide()
					: this.localeToggleIsVisible() && this.$localeToggleButton.show();
			}),
			t
		);
	})(i.BaseView);
	t.HeaderPanel = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-shared-module/RightPanel', [
	'require',
	'exports',
	'./BaseEvents',
	'./BaseExpandPanel'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				e.prototype.create.call(this), this.$element.width(this.options.panelCollapsedWidth);
			}),
			(t.prototype.init = function () {
				var t = this;
				e.prototype.init.call(this);
				var i = Utils.Bools.getBool(
					this.extension.getSettings().rightPanelOpen,
					this.options.panelOpen
				);
				i && this.toggle(!0),
					$.subscribe(n.BaseEvents.TOGGLE_EXPAND_RIGHT_PANEL, function () {
						t.isFullyExpanded ? t.collapseFull() : t.expandFull();
					});
			}),
			(t.prototype.getTargetWidth = function () {
				return this.isExpanded ? this.options.panelCollapsedWidth : this.options.panelExpandedWidth;
			}),
			(t.prototype.getTargetLeft = function () {
				return this.isExpanded
					? this.$element.parent().width() - this.options.panelCollapsedWidth
					: this.$element.parent().width() - this.options.panelExpandedWidth;
			}),
			(t.prototype.toggleFinish = function () {
				e.prototype.toggleFinish.call(this),
					this.isExpanded
						? $.publish(n.BaseEvents.OPEN_RIGHT_PANEL)
						: $.publish(n.BaseEvents.CLOSE_RIGHT_PANEL),
					this.extension.updateSettings({ rightPanelOpen: this.isExpanded });
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.$element.css({
						left: Math.floor(this.$element.parent().width() - this.$element.outerWidth())
					});
			}),
			t
		);
	})(i.BaseExpandPanel);
	t.RightPanel = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-moreinforightpanel-module/MoreInfoRightPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/RightPanel',
	'../../Utils'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('moreInfoRightPanel'),
					e.prototype.create.call(this),
					$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function () {
						t.databind();
					}),
					$.subscribe(n.BaseEvents.RANGE_CHANGED, function () {
						t.databind();
					}),
					this.setTitle(this.config.content.title),
					(this.$metadata = $('<div class="iiif-metadata-component"></div>')),
					this.$main.append(this.$metadata),
					(this.metadataComponent = new IIIFComponents.MetadataComponent({
						target: this.$metadata[0],
						data: this._getData()
					})),
					this.metadataComponent.on(
						'iiifViewerLinkClicked',
						function (e) {
							var i = Utils.Urls.getHashParameterFromString('rid', e);
							if (i) {
								var o = t.extension.helper.getRangeById(i);
								o && $.publish(n.BaseEvents.RANGE_CHANGED, [o]);
							}
						},
						!1
					);
			}),
			(t.prototype.toggleFinish = function () {
				e.prototype.toggleFinish.call(this), this.databind();
			}),
			(t.prototype.databind = function () {
				this.metadataComponent.set(this._getData());
			}),
			(t.prototype._getCurrentRange = function () {
				var e = this.extension.helper.getCurrentRange();
				return e;
			}),
			(t.prototype._getData = function () {
				return {
					canvasDisplayOrder: this.config.options.canvasDisplayOrder,
					canvases: this.extension.getCurrentCanvases(),
					canvasExclude: this.config.options.canvasExclude,
					canvasLabels: this.extension.getCanvasLabels(this.content.page),
					content: this.config.content,
					copiedMessageDuration: 2e3,
					copyToClipboardEnabled: Utils.Bools.getBool(
						this.config.options.copyToClipboardEnabled,
						!1
					),
					helper: this.extension.helper,
					licenseFormatter: new Manifold.UriLabeller(
						this.config.license ? this.config.license : {}
					),
					limit: this.config.options.textLimit || 4,
					limitType: IIIFComponents.LimitType.LINES,
					limitToRange: Utils.Bools.getBool(this.config.options.limitToRange, !1),
					manifestDisplayOrder: this.config.options.manifestDisplayOrder,
					manifestExclude: this.config.options.manifestExclude,
					range: this._getCurrentRange(),
					rtlLanguageCodes: this.config.options.rtlLanguageCodes,
					sanitizer: function (e) {
						return o.UVUtils.sanitize(e);
					},
					showAllLanguages: this.config.options.showAllLanguages
				};
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.$main.height(
						this.$element.height() - this.$top.height() - this.$main.verticalMargins()
					);
			}),
			t
		);
	})(i.RightPanel);
	t.MoreInfoRightPanel = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-dialogues-module/SettingsDialogue', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/Dialogue'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('settingsDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_SETTINGS_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_SETTINGS_DIALOGUE),
					$.subscribe(this.openCommand, function () {
						t.open();
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					(this.$title = $('<h1></h1>')),
					this.$content.append(this.$title),
					(this.$scroll = $('<div class="scroll"></div>')),
					this.$content.append(this.$scroll),
					(this.$version = $('<div class="version"></div>')),
					this.$content.append(this.$version),
					(this.$website = $('<div class="website"></div>')),
					this.$content.append(this.$website),
					(this.$locale = $('<div class="setting locale"></div>')),
					this.$scroll.append(this.$locale),
					(this.$localeLabel = $('<label for="locale">' + this.content.locale + '</label>')),
					this.$locale.append(this.$localeLabel),
					(this.$localeDropDown = $('<select id="locale"></select>')),
					this.$locale.append(this.$localeDropDown),
					this.$title.text(this.content.title),
					this.$website.html(this.content.website),
					this.$website.targetBlank(),
					this._createLocalesMenu(),
					this.$element.hide();
			}),
			(t.prototype.getSettings = function () {
				return this.extension.getSettings();
			}),
			(t.prototype.updateSettings = function (e) {
				this.extension.updateSettings(e), $.publish(n.BaseEvents.UPDATE_SETTINGS, [e]);
			}),
			(t.prototype.open = function () {
				var t = this;
				e.prototype.open.call(this),
					$.getJSON(this.extension.data.root + '/info.json', function (e) {
						t.$version.text('v' + e.version);
					});
			}),
			(t.prototype._createLocalesMenu = function () {
				var e = this,
					t = this.extension.data.locales;
				if (t && t.length > 1) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						this.$localeDropDown.append('<option value="' + i.name + '">' + i.label + '</option>');
					}
					this.$localeDropDown.val(t[0].name);
				} else this.$locale.hide();
				this.$localeDropDown.change(function () {
					e.extension.changeLocale(e.$localeDropDown.val());
				});
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(i.Dialogue);
	t.SettingsDialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-av-extension/SettingsDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/SettingsDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('settingsDialogue'), e.prototype.create.call(this);
			}),
			t
		);
	})(n.SettingsDialogue);
	t.SettingsDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-dialogues-module/ShareDialogue', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/Dialogue'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			var n = e.call(this, t) || this;
			return (
				(n.aspectRatio = 0.75),
				(n.isEmbedViewVisible = !1),
				(n.isShareViewVisible = !1),
				(n.maxWidth = 8e3),
				(n.maxHeight = n.maxWidth * n.aspectRatio),
				(n.minWidth = 200),
				(n.minHeight = n.minWidth * n.aspectRatio),
				n
			);
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('shareDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_SHARE_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_SHARE_DIALOGUE),
					$.subscribe(this.openCommand, function (e, n) {
						t.open(n), t.isShareAvailable() ? t.openShareView() : t.openEmbedView();
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					$.subscribe(n.BaseEvents.SHOW_EMBED_DIALOGUE, function (e, n) {
						t.open(n), t.openEmbedView();
					}),
					(this.$tabs = $('<div class="tabs"></div>')),
					this.$content.append(this.$tabs),
					(this.$shareButton = $(
						'<a class="share tab default" tabindex="0">' + this.content.share + '</a>'
					)),
					this.$shareButton.prop('title', this.content.share),
					this.$tabs.append(this.$shareButton),
					(this.$embedButton = $(
						'<a class="embed tab" tabindex="0">' + this.content.embed + '</a>'
					)),
					this.$embedButton.prop('title', this.content.embed),
					this.$tabs.append(this.$embedButton),
					(this.$tabsContent = $('<div class="tabsContent"></div>')),
					this.$content.append(this.$tabsContent),
					(this.$footer = $('<div class="footer"></div>')),
					this.$content.append(this.$footer),
					(this.$shareView = $('<div class="shareView view"></div>')),
					this.$tabsContent.append(this.$shareView),
					(this.$shareHeader = $('<div class="header"></div>')),
					this.$shareView.append(this.$shareHeader),
					(this.$shareLink = $('<a class="shareLink" onclick="return false;"></a>')),
					this.$shareView.append(this.$shareLink),
					(this.$shareInput = $(
						'<input class="shareInput" type="text" readonly aria-label="' +
							this.content.shareUrl +
							'"/>'
					)),
					this.$shareView.append(this.$shareInput),
					(this.$shareFrame = $('<iframe class="shareFrame"></iframe>')),
					this.$shareView.append(this.$shareFrame),
					(this.$embedView = $('<div class="embedView view"></div>')),
					this.$tabsContent.append(this.$embedView),
					(this.$embedHeader = $('<div class="header"></div>')),
					this.$embedView.append(this.$embedHeader),
					(this.$code = $(
						'<input class="code" type="text" readonly aria-label="' + this.content.embed + '"/>'
					)),
					this.$embedView.append(this.$code),
					(this.$customSize = $('<div class="customSize"></div>')),
					this.$embedView.append(this.$customSize),
					(this.$size = $('<span class="size">' + this.content.size + '</span>')),
					this.$customSize.append(this.$size),
					(this.$customSizeDropDown = $(
						'<select id="size" aria-label="' + this.content.size + '"></select>'
					)),
					this.$customSize.append(this.$customSizeDropDown),
					this.$customSizeDropDown.append(
						'<option value="small" data-width="560" data-height="420">560 x 420</option>'
					),
					this.$customSizeDropDown.append(
						'<option value="medium" data-width="640" data-height="480">640 x 480</option>'
					),
					this.$customSizeDropDown.append(
						'<option value="large" data-width="800" data-height="600">800 x 600</option>'
					),
					this.$customSizeDropDown.append(
						'<option value="custom">' + this.content.customSize + '</option>'
					),
					(this.$widthInput = $(
						'<input class="width" type="text" maxlength="10" aria-label="' +
							this.content.width +
							'"/>'
					)),
					this.$customSize.append(this.$widthInput),
					(this.$x = $('<span class="x">x</span>')),
					this.$customSize.append(this.$x),
					(this.$heightInput = $(
						'<input class="height" type="text" maxlength="10" aria-label="' +
							this.content.height +
							'"/>'
					)),
					this.$customSize.append(this.$heightInput);
				var i = this.extension.getIIIFShareUrl();
				(this.$iiifButton = $(
					'<a class="imageBtn iiif" href="' +
						i +
						'" title="' +
						this.content.iiif +
						'" target="_blank"></a>'
				)),
					this.$footer.append(this.$iiifButton),
					(this.$termsOfUseButton = $(
						'<a href="#">' + this.extension.data.config.content.termsOfUse + '</a>'
					)),
					this.$footer.append(this.$termsOfUseButton),
					this.$widthInput.on('keydown', function (e) {
						return Utils.Numbers.numericalInput(e);
					}),
					this.$heightInput.on('keydown', function (e) {
						return Utils.Numbers.numericalInput(e);
					}),
					this.$shareInput.focus(function () {
						$(this).select();
					}),
					this.$code.focus(function () {
						$(this).select();
					}),
					this.$shareButton.onPressed(function () {
						t.openShareView();
					}),
					this.$embedButton.onPressed(function () {
						t.openEmbedView();
					}),
					this.$customSizeDropDown.change(function () {
						t.update();
					}),
					this.$widthInput.change(function () {
						t.updateHeightRatio(), t.update();
					}),
					this.$heightInput.change(function () {
						t.updateWidthRatio(), t.update();
					}),
					this.$termsOfUseButton.onPressed(function () {
						$.publish(n.BaseEvents.SHOW_TERMS_OF_USE);
					}),
					this.$element.hide(),
					this.update();
			}),
			(t.prototype.open = function (t) {
				e.prototype.open.call(this, t), this.update();
			}),
			(t.prototype.getShareUrl = function () {
				return this.extension.getShareUrl();
			}),
			(t.prototype.isShareAvailable = function () {
				return !!this.getShareUrl();
			}),
			(t.prototype.update = function () {
				this.isShareAvailable() ? this.$shareButton.show() : this.$shareButton.hide();
				var e = this.getSelectedSize();
				'custom' === e.val()
					? (this.$widthInput.show(), this.$x.show(), this.$heightInput.show())
					: (this.$widthInput.hide(),
					  this.$x.hide(),
					  this.$heightInput.hide(),
					  (this.currentWidth = Number(e.data('width'))),
					  (this.currentHeight = Number(e.data('height'))),
					  this.$widthInput.val(String(this.currentWidth)),
					  this.$heightInput.val(String(this.currentHeight))),
					this.updateInstructions(),
					this.updateShareOptions(),
					this.updateShareFrame(),
					this.updateTermsOfUseButton();
			}),
			(t.prototype.updateShareOptions = function () {
				var e = this.getShareUrl();
				e && (this.$shareInput.val(e), this.$shareLink.prop('href', e), this.$shareLink.text(e)),
					this.extension.isMobile()
						? (this.$shareInput.hide(), this.$shareLink.show())
						: (this.$shareInput.show(), this.$shareLink.hide());
			}),
			(t.prototype.updateInstructions = function () {
				Utils.Bools.getBool(this.options.instructionsEnabled, !1)
					? (this.$shareHeader.show(),
					  this.$embedHeader.show(),
					  this.$shareHeader.text(this.content.shareInstructions),
					  this.$embedHeader.text(this.content.embedInstructions))
					: (this.$shareHeader.hide(), this.$embedHeader.hide());
			}),
			(t.prototype.getSelectedSize = function () {
				return this.$customSizeDropDown.find(':selected');
			}),
			(t.prototype.updateWidthRatio = function () {
				(this.currentHeight = Number(this.$heightInput.val())),
					this.currentHeight < this.minHeight
						? ((this.currentHeight = this.minHeight),
						  this.$heightInput.val(String(this.currentHeight)))
						: this.currentHeight > this.maxHeight &&
						  ((this.currentHeight = this.maxHeight),
						  this.$heightInput.val(String(this.currentHeight))),
					(this.currentWidth = Math.floor(this.currentHeight / this.aspectRatio)),
					this.$widthInput.val(String(this.currentWidth));
			}),
			(t.prototype.updateHeightRatio = function () {
				(this.currentWidth = Number(this.$widthInput.val())),
					this.currentWidth < this.minWidth
						? ((this.currentWidth = this.minWidth), this.$widthInput.val(String(this.currentWidth)))
						: this.currentWidth > this.maxWidth &&
						  ((this.currentWidth = this.maxWidth),
						  this.$widthInput.val(String(this.currentWidth))),
					(this.currentHeight = Math.floor(this.currentWidth * this.aspectRatio)),
					this.$heightInput.val(String(this.currentHeight));
			}),
			(t.prototype.updateShareFrame = function () {
				var e = this.extension.helper.getShareServiceUrl();
				e &&
					(Utils.Bools.getBool(this.config.options.shareFrameEnabled, !0) && e
						? (this.$shareFrame.prop('src', e), this.$shareFrame.show())
						: this.$shareFrame.hide());
			}),
			(t.prototype.updateTermsOfUseButton = function () {
				var e = this.extension.helper.getRequiredStatement();
				Utils.Bools.getBool(this.extension.data.config.options.termsOfUseEnabled, !1) &&
				e &&
				e.value
					? this.$termsOfUseButton.show()
					: this.$termsOfUseButton.hide();
			}),
			(t.prototype.openShareView = function () {
				(this.isShareViewVisible = !0),
					(this.isEmbedViewVisible = !1),
					this.$embedView.hide(),
					this.$shareView.show(),
					this.$shareButton.addClass('on default'),
					this.$embedButton.removeClass('on default'),
					this.resize();
			}),
			(t.prototype.openEmbedView = function () {
				(this.isShareViewVisible = !1),
					(this.isEmbedViewVisible = !0),
					this.$embedView.show(),
					this.$shareView.hide(),
					this.$shareButton.removeClass('on default'),
					this.$embedButton.addClass('on default'),
					this.resize();
			}),
			(t.prototype.close = function () {
				e.prototype.close.call(this);
			}),
			(t.prototype.getViews = function () {
				return this.$tabsContent.find('.view');
			}),
			(t.prototype.equaliseViewHeights = function () {
				this.getViews().equaliseHeight(!0);
			}),
			(t.prototype.resize = function () {
				this.equaliseViewHeights(), this.setDockedPosition();
			}),
			t
		);
	})(i.Dialogue);
	t.ShareDialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-av-extension/ShareDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/ShareDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('shareDialogue'), e.prototype.create.call(this);
			}),
			(t.prototype.update = function () {
				e.prototype.update.call(this),
					(this.code = this.extension.getEmbedScript(
						this.options.embedTemplate,
						this.currentWidth,
						this.currentHeight
					)),
					this.$code.val(this.code);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(n.ShareDialogue);
	t.ShareDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-av-extension/Extension', [
	'require',
	'exports',
	'../../modules/uv-avcenterpanel-module/AVCenterPanel',
	'../../modules/uv-shared-module/BaseEvents',
	'../../modules/uv-shared-module/BaseExtension',
	'../../modules/uv-contentleftpanel-module/ContentLeftPanel',
	'./DownloadDialogue',
	'../../modules/uv-shared-module/FooterPanel',
	'../../modules/uv-avmobilefooterpanel-module/MobileFooter',
	'../../modules/uv-shared-module/HeaderPanel',
	'../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel',
	'./SettingsDialogue',
	'./ShareDialogue',
	'../../modules/uv-shared-module/Shell'
], function (e, t, n, i, o, r, s, a, u, l, c, h, p, d) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var f = (function (e) {
		function t() {
			return (null !== e && e.apply(this, arguments)) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				e.prototype.create.call(this),
					$.subscribe(i.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
						t.viewCanvas(n);
					}),
					$.subscribe(i.BaseEvents.TREE_NODE_SELECTED, function (e, n) {
						t.fire(i.BaseEvents.TREE_NODE_SELECTED, n.data.path), t.treeNodeSelected(n);
					}),
					$.subscribe(i.BaseEvents.THUMB_SELECTED, function (e, t) {
						$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.index]);
					});
			}),
			(t.prototype.dependencyLoaded = function (e, t) {
				e === this.getDependencyIndex('waveform-data')
					? (window.WaveformData = t)
					: e === this.getDependencyIndex('hls') && (window.Hls = t);
			}),
			(t.prototype.createModules = function () {
				e.prototype.createModules.call(this),
					this.isHeaderPanelEnabled()
						? (this.headerPanel = new l.HeaderPanel(d.Shell.$headerPanel))
						: d.Shell.$headerPanel.hide(),
					this.isLeftPanelEnabled()
						? (this.leftPanel = new r.ContentLeftPanel(d.Shell.$leftPanel))
						: d.Shell.$leftPanel.hide(),
					(this.centerPanel = new n.AVCenterPanel(d.Shell.$centerPanel)),
					this.isRightPanelEnabled()
						? (this.rightPanel = new c.MoreInfoRightPanel(d.Shell.$rightPanel))
						: d.Shell.$rightPanel.hide(),
					this.isFooterPanelEnabled()
						? ((this.footerPanel = new a.FooterPanel(d.Shell.$footerPanel)),
						  (this.mobileFooterPanel = new u.FooterPanel(d.Shell.$mobileFooterPanel)))
						: d.Shell.$footerPanel.hide(),
					(this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>')),
					d.Shell.$overlays.append(this.$shareDialogue),
					(this.shareDialogue = new p.ShareDialogue(this.$shareDialogue)),
					(this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>')),
					d.Shell.$overlays.append(this.$downloadDialogue),
					(this.downloadDialogue = new s.DownloadDialogue(this.$downloadDialogue)),
					(this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>')),
					d.Shell.$overlays.append(this.$settingsDialogue),
					(this.settingsDialogue = new h.SettingsDialogue(this.$settingsDialogue)),
					this.isHeaderPanelEnabled() && this.headerPanel.init(),
					this.isLeftPanelEnabled() && this.leftPanel.init(),
					this.isRightPanelEnabled() && this.rightPanel.init(),
					this.isFooterPanelEnabled() && this.footerPanel.init();
			}),
			(t.prototype.isLeftPanelEnabled = function () {
				var t = e.prototype.isLeftPanelEnabled.call(this),
					n = this.helper.getTree();
				return n && n.nodes.length && (t = !0), t;
			}),
			(t.prototype.render = function () {
				e.prototype.render.call(this);
			}),
			(t.prototype.getEmbedScript = function (e, t, n) {
				var i = this.getAppUri(),
					o =
						i +
						'#?manifest=' +
						this.helper.iiifResourceUri +
						'&c=' +
						this.helper.collectionIndex +
						'&m=' +
						this.helper.manifestIndex +
						'&s=' +
						this.helper.sequenceIndex +
						'&cv=' +
						this.helper.canvasIndex +
						'&rid=' +
						this.helper.rangeId,
					r = Utils.Strings.format(e, o, t.toString(), n.toString());
				return r;
			}),
			(t.prototype.treeNodeSelected = function (e) {
				var t = e.data;
				if (t.type)
					switch (t.type) {
						case manifesto.IIIFResourceType.manifest().toString():
							break;
						case manifesto.IIIFResourceType.collection().toString():
							break;
						default:
							this.viewRange(t.path);
					}
			}),
			(t.prototype.viewRange = function (e) {
				var t = this.helper.getRangeByPath(e);
				t && $.publish(i.BaseEvents.RANGE_CHANGED, [t]);
			}),
			t
		);
	})(o.BaseExtension);
	t.Extension = f;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-filelinkcenterpanel-module/FileLinkCenterPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/CenterPanel',
	'../../Utils'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('fileLinkCenterPanel'),
					e.prototype.create.call(this),
					$.subscribe(n.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, n) {
						t.openMedia(n);
					}),
					(this.$scroll = $('<div class="scroll"><div>')),
					this.$content.append(this.$scroll),
					(this.$downloadItems = $('<ol></ol>')),
					this.$scroll.append(this.$downloadItems),
					(this.$downloadItemTemplate = $(
						'<li><img><div class="col2"><a class="filename" target="_blank" download></a><span class="label"></span><a class="description" target="_blank" download></a></div></li>'
					)),
					(this.title = this.extension.helper.getLabel());
			}),
			(t.prototype.openMedia = function (e) {
				var t = this;
				this.extension.getExternalResources(e).then(function () {
					for (
						var e, n = t.extension.helper.getCurrentCanvas(), i = n.getContent(), r = 0;
						r < i.length;
						r++
					) {
						var s = i[r];
						if (s.getBody().length) {
							e = t.$downloadItemTemplate.clone();
							var a = e.find('.filename'),
								u = e.find('.label'),
								l = e.find('img'),
								c = e.find('.description'),
								h = s.getBody()[0],
								p = h.getProperty('id');
							p && (a.prop('href', p), a.text(p.substr(p.lastIndexOf('/') + 1)));
							var d = Manifesto.LanguageMap.getValue(h.getLabel());
							d && u.text(o.UVUtils.sanitize(d));
							var f = s.getProperty('thumbnail');
							f ? l.prop('src', f) : l.hide();
							var g = h.getProperty('description');
							g && (c.text(o.UVUtils.sanitize(g)), p && c.prop('href', p)),
								t.$downloadItems.append(e);
						}
					}
				});
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.title && this.$title.ellipsisFill(this.title),
					this.$scroll.height(this.$content.height() - this.$scroll.verticalMargins());
			}),
			t
		);
	})(i.CenterPanel);
	t.FileLinkCenterPanel = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-dialogues-module/HelpDialogue', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/Dialogue'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('helpDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_HELP_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_HELP_DIALOGUE),
					$.subscribe(this.openCommand, function () {
						t.open();
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					(this.$title = $('<h1></h1>')),
					this.$content.append(this.$title),
					(this.$scroll = $('<div class="scroll"></div>')),
					this.$content.append(this.$scroll),
					(this.$message = $('<p></p>')),
					this.$scroll.append(this.$message),
					this.$title.text(this.content.title),
					this.$message.html(this.content.text),
					this.$message.targetBlank(),
					this.$element.hide();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(i.Dialogue);
	t.HelpDialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-resourcesleftpanel-module/ThumbsView', [
	'require',
	'exports',
	'../uv-shared-module/ThumbsView'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t() {
			return (null !== e && e.apply(this, arguments)) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('resourcesLeftPanel'), e.prototype.create.call(this);
			}),
			t
		);
	})(n.ThumbsView);
	t.ThumbsView = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-resourcesleftpanel-module/ResourcesLeftPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/LeftPanel',
	'./ThumbsView'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('resourcesLeftPanel'),
					e.prototype.create.call(this),
					this.setTitle(this.content.title),
					(this.$tabsContent = $('<div class="tabsContent"></div>')),
					this.$main.append(this.$tabsContent),
					(this.$views = $('<div class="views"></div>')),
					this.$tabsContent.append(this.$views),
					(this.$thumbsView = $('<div class="thumbsView"></div>')),
					this.$views.append(this.$thumbsView),
					(this.$resourcesView = $('<div class="resourcesView"></div>')),
					(this.$resources = $('<ul></ul>')),
					this.$resourcesView.append(this.$resources),
					this.$views.append(this.$resourcesView),
					(this.thumbsView = new o.ThumbsView(this.$thumbsView)),
					this.dataBind();
			}),
			(t.prototype.dataBind = function () {
				this.dataBindThumbsView();
				var e = this.extension.helper.getCurrentCanvas().getResources();
				0 === e.length && this.$resourcesView.hide();
				for (var t = 0; t < e.length; t++) {
					var n = e[t],
						i = n.getResource();
					if (i) {
						var o = Manifesto.LanguageMap.getValue(i.getLabel());
						if (o) {
							var r = Utils.Files.simplifyMimeType(i.getFormat().toString()),
								s = $('<li><a href="' + i.id + '" target="_blank">' + o + ' (' + r + ')</li>');
							this.$resources.append(s);
						}
					}
				}
			}),
			(t.prototype.dataBindThumbsView = function () {
				if (this.thumbsView) {
					var e,
						t,
						n = this.extension.helper.getViewingDirection();
					!n ||
					(n.toString() !== manifesto.ViewingDirection.leftToRight().toString() &&
						n.toString() !== manifesto.ViewingDirection.rightToLeft().toString())
						? ((e = this.config.options.oneColThumbWidth),
						  (t = this.config.options.oneColThumbHeight))
						: ((e = this.config.options.twoColThumbWidth),
						  (t = this.config.options.twoColThumbHeight)),
						'undefined' == typeof e && (e = 100),
						'undefined' == typeof t && (t = 100),
						(this.thumbsView.thumbs = this.extension.helper.getThumbs(e, t)),
						this.thumbsView.thumbs.length < 2 && this.$thumbsView.hide(),
						this.thumbsView.databind();
				}
			}),
			(t.prototype.expandFullStart = function () {
				e.prototype.expandFullStart.call(this), $.publish(n.BaseEvents.LEFTPANEL_EXPAND_FULL_START);
			}),
			(t.prototype.expandFullFinish = function () {
				e.prototype.expandFullFinish.call(this),
					$.publish(n.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH);
			}),
			(t.prototype.collapseFullStart = function () {
				e.prototype.collapseFullStart.call(this),
					$.publish(n.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START);
			}),
			(t.prototype.collapseFullFinish = function () {
				e.prototype.collapseFullFinish.call(this),
					$.publish(n.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.$views.height(this.$main.height()),
					this.$resources.height(this.$main.height());
			}),
			t
		);
	})(i.LeftPanel);
	t.ResourcesLeftPanel = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-default-extension/SettingsDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/SettingsDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('settingsDialogue'), e.prototype.create.call(this);
			}),
			t
		);
	})(n.SettingsDialogue);
	t.SettingsDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-default-extension/ShareDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/ShareDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('shareDialogue'), e.prototype.create.call(this);
			}),
			(t.prototype.update = function () {
				e.prototype.update.call(this),
					(this.code = this.extension.getEmbedScript(
						this.options.embedTemplate,
						this.currentWidth,
						this.currentHeight
					)),
					this.$code.val(this.code);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(n.ShareDialogue);
	t.ShareDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'extensions/uv-default-extension/Extension',
	[
		'require',
		'exports',
		'../../modules/uv-shared-module/BaseEvents',
		'../../modules/uv-shared-module/BaseExtension',
		'../../modules/uv-filelinkcenterpanel-module/FileLinkCenterPanel',
		'../../modules/uv-shared-module/FooterPanel',
		'../../modules/uv-shared-module/HeaderPanel',
		'../../modules/uv-dialogues-module/HelpDialogue',
		'../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel',
		'../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel',
		'./SettingsDialogue',
		'./ShareDialogue',
		'../../modules/uv-shared-module/Shell'
	],
	function (e, t, n, i, o, r, s, a, u, l, c, h, p) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var d = (function (e) {
			function t() {
				return (null !== e && e.apply(this, arguments)) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					e.prototype.create.call(this),
						$(window).bind('enterfullscreen', function () {
							$.publish(n.BaseEvents.TOGGLE_FULLSCREEN);
						}),
						$(window).bind('exitfullscreen', function () {
							$.publish(n.BaseEvents.TOGGLE_FULLSCREEN);
						}),
						$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
							t.viewCanvas(n);
						}),
						$.subscribe(n.BaseEvents.THUMB_SELECTED, function (e, t) {
							$.publish(n.BaseEvents.CANVAS_INDEX_CHANGED, [t]);
						});
				}),
				(t.prototype.createModules = function () {
					e.prototype.createModules.call(this),
						this.isHeaderPanelEnabled()
							? (this.headerPanel = new s.HeaderPanel(p.Shell.$headerPanel))
							: p.Shell.$headerPanel.hide(),
						this.isLeftPanelEnabled() &&
							(this.leftPanel = new l.ResourcesLeftPanel(p.Shell.$leftPanel)),
						(this.centerPanel = new o.FileLinkCenterPanel(p.Shell.$centerPanel)),
						this.isRightPanelEnabled() &&
							(this.rightPanel = new u.MoreInfoRightPanel(p.Shell.$rightPanel)),
						this.isFooterPanelEnabled()
							? (this.footerPanel = new r.FooterPanel(p.Shell.$footerPanel))
							: p.Shell.$footerPanel.hide(),
						(this.$helpDialogue = $('<div class="overlay help" aria-hidden="true"></div>')),
						p.Shell.$overlays.append(this.$helpDialogue),
						(this.helpDialogue = new a.HelpDialogue(this.$helpDialogue)),
						(this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>')),
						p.Shell.$overlays.append(this.$shareDialogue),
						(this.shareDialogue = new h.ShareDialogue(this.$shareDialogue)),
						(this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>')),
						p.Shell.$overlays.append(this.$settingsDialogue),
						(this.settingsDialogue = new c.SettingsDialogue(this.$settingsDialogue)),
						this.isLeftPanelEnabled() && this.leftPanel.init(),
						this.isRightPanelEnabled() && this.rightPanel.init();
				}),
				(t.prototype.render = function () {
					e.prototype.render.call(this);
				}),
				(t.prototype.isLeftPanelEnabled = function () {
					return (
						Utils.Bools.getBool(this.data.config.options.leftPanelEnabled, !0) &&
						(this.helper.isMultiCanvas() ||
							this.helper.isMultiSequence() ||
							this.helper.hasResources())
					);
				}),
				(t.prototype.getEmbedScript = function (e, t, n) {
					var i = this.getAppUri(),
						o =
							i +
							'#?manifest=' +
							this.helper.iiifResourceUri +
							'&c=' +
							this.helper.collectionIndex +
							'&m=' +
							this.helper.manifestIndex +
							'&s=' +
							this.helper.sequenceIndex +
							'&cv=' +
							this.helper.canvasIndex,
						r = Utils.Strings.format(e, o, t.toString(), n.toString());
					return r;
				}),
				t
			);
		})(i.BaseExtension);
		t.Extension = d;
	}
),
	define('modules/uv-shared-module/Bookmark', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return e;
		})();
		t.Bookmark = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'extensions/uv-mediaelement-extension/DownloadDialogue',
	['require', 'exports', '../../modules/uv-dialogues-module/DownloadDialogue'],
	function (e, t, n) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var i = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					this.setConfig('downloadDialogue'), e.prototype.create.call(this);
				}),
				(t.prototype.open = function (t) {
					e.prototype.open.call(this, t),
						this.addEntireFileDownloadOptions(),
						this.updateNoneAvailable(),
						this.resize();
				}),
				(t.prototype.isDownloadOptionAvailable = function (t) {
					return e.prototype.isDownloadOptionAvailable.call(this, t);
				}),
				t
			);
		})(n.DownloadDialogue);
		t.DownloadDialogue = i;
	}
),
	define('extensions/uv-mediaelement-extension/Events', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return (
				(e.namespace = 'mediaelementExtension.'),
				(e.MEDIA_ENDED = e.namespace + 'mediaEnded'),
				(e.MEDIA_PAUSED = e.namespace + 'mediaPaused'),
				(e.MEDIA_PLAYED = e.namespace + 'mediaPlayed'),
				e
			);
		})();
		t.Events = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../../extensions/uv-mediaelement-extension/Events',
	'../uv-shared-module/CenterPanel'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('mediaelementCenterPanel'), e.prototype.create.call(this);
				var t = this;
				this.isVideo() &&
					$.subscribe(n.BaseEvents.TOGGLE_FULLSCREEN, function () {
						t.component.isFullScreen ? t.player.enterFullScreen(!1) : t.player.exitFullScreen(!1);
					}),
					$.subscribe(n.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, n) {
						t.openMedia(n);
					}),
					(this.$container = $('<div class="container"></div>')),
					this.$content.append(this.$container),
					(this.title = this.extension.helper.getLabel());
			}),
			(t.prototype.openMedia = function (e) {
				var t = this,
					n = this;
				this.extension.getExternalResources(e).then(function () {
					t.$container.empty();
					var e = t.extension.helper.getCurrentCanvas();
					(t.mediaHeight = t.config.defaultHeight),
						(t.mediaWidth = t.config.defaultWidth),
						t.$container.height(t.mediaHeight),
						t.$container.width(t.mediaWidth);
					var o = t.extension.getPosterImageUri(),
						r = [],
						s = e.getRenderings();
					if (s && s.length)
						e.getRenderings().forEach(function (e) {
							r.push({ type: e.getFormat().toString(), src: e.id });
						});
					else {
						var a = t.extension.getMediaFormats(t.extension.helper.getCurrentCanvas());
						a &&
							a.length &&
							a.forEach(function (e) {
								var t = e.getFormat();
								t && r.push({ type: t.toString(), src: e.id });
							});
					}
					t.isVideo()
						? ((t.$media = $('<video controls="controls" preload="none"></video>')),
						  t.$container.append(t.$media),
						  (t.player = new MediaElementPlayer($('video')[0], {
								poster: o,
								features: ['playpause', 'current', 'progress', 'volume'],
								success: function (e, t) {
									e.addEventListener('canplay', function () {
										n.resize();
									}),
										e.addEventListener('play', function () {
											$.publish(i.Events.MEDIA_PLAYED, [Math.floor(e.currentTime)]);
										}),
										e.addEventListener('pause', function () {
											Math.floor(e.currentTime) != Math.floor(e.duration) &&
												$.publish(i.Events.MEDIA_PAUSED, [Math.floor(e.currentTime)]);
										}),
										e.addEventListener('ended', function () {
											$.publish(i.Events.MEDIA_ENDED, [Math.floor(e.duration)]);
										}),
										e.setSrc(r);
								}
						  })))
						: ((t.$media = $('<audio controls="controls" preload="none"></audio>')),
						  t.$container.append(t.$media),
						  (t.player = new MediaElementPlayer($('audio')[0], {
								poster: o,
								defaultAudioWidth: 'auto',
								defaultAudioHeight: 'auto',
								showPosterWhenPaused: !0,
								showPosterWhenEnded: !0,
								success: function (e, t) {
									e.addEventListener('canplay', function () {
										n.resize();
									}),
										e.addEventListener('play', function () {
											$.publish(i.Events.MEDIA_PLAYED, [Math.floor(e.currentTime)]);
										}),
										e.addEventListener('pause', function () {
											Math.floor(e.currentTime) != Math.floor(e.duration) &&
												$.publish(i.Events.MEDIA_PAUSED, [Math.floor(e.currentTime)]);
										}),
										e.addEventListener('ended', function () {
											$.publish(i.Events.MEDIA_ENDED, [Math.floor(e.duration)]);
										}),
										e.setSrc(r);
								}
						  }))),
						t.resize();
				});
			}),
			(t.prototype.isVideo = function () {
				return this.extension.isVideo();
			}),
			(t.prototype.resize = function () {
				if (
					(e.prototype.resize.call(this),
					'Firefox' === window.browserDetect.browser && window.browserDetect.version < 13)
				)
					this.$container.width(this.mediaWidth), this.$container.height(this.mediaHeight);
				else {
					var t = Utils.Dimensions.fitRect(
						this.mediaWidth,
						this.mediaHeight,
						this.$content.width(),
						this.$content.height()
					);
					this.$container.height(t.height),
						this.$container.width(t.width),
						this.player &&
							!this.extension.isFullScreen() &&
							(this.$media.width(t.width), this.$media.height(t.height));
				}
				var n = Math.floor((this.$content.width() - this.$container.width()) / 2),
					i = Math.floor((this.$content.height() - this.$container.height()) / 2);
				if (
					(this.$container.css({ left: n, top: i }),
					this.title && this.$title.ellipsisFill(this.title),
					this.player && (!this.isVideo() || (this.isVideo() && !this.component.isFullScreen)))
				) {
					this.player.setPlayerSize(), this.player.setControlsSize();
					var o = $('.mejs__container');
					o.css({ 'margin-top': (this.$container.height() - o.height()) / 2 });
				}
			}),
			t
		);
	})(o.CenterPanel);
	t.MediaElementCenterPanel = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-mediaelement-extension/SettingsDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/SettingsDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('settingsDialogue'), e.prototype.create.call(this);
			}),
			t
		);
	})(n.SettingsDialogue);
	t.SettingsDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-mediaelement-extension/ShareDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/ShareDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('shareDialogue'), e.prototype.create.call(this);
			}),
			(t.prototype.update = function () {
				e.prototype.update.call(this),
					(this.code = this.extension.getEmbedScript(
						this.options.embedTemplate,
						this.currentWidth,
						this.currentHeight
					)),
					this.$code.val(this.code);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(n.ShareDialogue);
	t.ShareDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'extensions/uv-mediaelement-extension/Extension',
	[
		'require',
		'exports',
		'../../modules/uv-shared-module/BaseEvents',
		'../../modules/uv-shared-module/BaseExtension',
		'../../modules/uv-shared-module/Bookmark',
		'./DownloadDialogue',
		'./Events',
		'../../modules/uv-shared-module/FooterPanel',
		'../../modules/uv-shared-module/HeaderPanel',
		'../../modules/uv-dialogues-module/HelpDialogue',
		'../../modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel',
		'../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel',
		'../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel',
		'./SettingsDialogue',
		'./ShareDialogue',
		'../../modules/uv-shared-module/Shell'
	],
	function (e, t, n, i, o, r, s, a, u, l, c, h, p, d, f, g) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var v = (function (e) {
			function t() {
				return (null !== e && e.apply(this, arguments)) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					e.prototype.create.call(this),
						$(window).bind('enterfullscreen', function () {
							$.publish(n.BaseEvents.TOGGLE_FULLSCREEN);
						}),
						$(window).bind('exitfullscreen', function () {
							$.publish(n.BaseEvents.TOGGLE_FULLSCREEN);
						}),
						$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
							t.viewCanvas(n);
						}),
						$.subscribe(n.BaseEvents.THUMB_SELECTED, function (e, t) {
							$.publish(n.BaseEvents.CANVAS_INDEX_CHANGED, [t.index]);
						}),
						$.subscribe(n.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
							g.Shell.$centerPanel.hide(), g.Shell.$rightPanel.hide();
						}),
						$.subscribe(n.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
							g.Shell.$centerPanel.show(), g.Shell.$rightPanel.show(), t.resize();
						}),
						$.subscribe(s.Events.MEDIA_ENDED, function () {
							t.fire(s.Events.MEDIA_ENDED);
						}),
						$.subscribe(s.Events.MEDIA_PAUSED, function () {
							t.fire(s.Events.MEDIA_PAUSED);
						}),
						$.subscribe(s.Events.MEDIA_PLAYED, function () {
							t.fire(s.Events.MEDIA_PLAYED);
						});
				}),
				(t.prototype.createModules = function () {
					e.prototype.createModules.call(this),
						this.isHeaderPanelEnabled()
							? (this.headerPanel = new u.HeaderPanel(g.Shell.$headerPanel))
							: g.Shell.$headerPanel.hide(),
						this.isLeftPanelEnabled() &&
							(this.leftPanel = new p.ResourcesLeftPanel(g.Shell.$leftPanel)),
						(this.centerPanel = new c.MediaElementCenterPanel(g.Shell.$centerPanel)),
						this.isRightPanelEnabled() &&
							(this.rightPanel = new h.MoreInfoRightPanel(g.Shell.$rightPanel)),
						this.isFooterPanelEnabled()
							? (this.footerPanel = new a.FooterPanel(g.Shell.$footerPanel))
							: g.Shell.$footerPanel.hide(),
						(this.$helpDialogue = $('<div class="overlay help" aria-hidden="true"></div>')),
						g.Shell.$overlays.append(this.$helpDialogue),
						(this.helpDialogue = new l.HelpDialogue(this.$helpDialogue)),
						(this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>')),
						g.Shell.$overlays.append(this.$downloadDialogue),
						(this.downloadDialogue = new r.DownloadDialogue(this.$downloadDialogue)),
						(this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>')),
						g.Shell.$overlays.append(this.$shareDialogue),
						(this.shareDialogue = new f.ShareDialogue(this.$shareDialogue)),
						(this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>')),
						g.Shell.$overlays.append(this.$settingsDialogue),
						(this.settingsDialogue = new d.SettingsDialogue(this.$settingsDialogue)),
						this.isLeftPanelEnabled() && this.leftPanel.init(),
						this.isRightPanelEnabled() && this.rightPanel.init();
				}),
				(t.prototype.render = function () {
					e.prototype.render.call(this);
				}),
				(t.prototype.isLeftPanelEnabled = function () {
					return (
						Utils.Bools.getBool(this.data.config.options.leftPanelEnabled, !0) &&
						(this.helper.isMultiCanvas() ||
							this.helper.isMultiSequence() ||
							this.helper.hasResources())
					);
				}),
				(t.prototype.bookmark = function () {
					e.prototype.bookmark.call(this);
					var t = this.extensions.helper.getCurrentCanvas(),
						i = new o.Bookmark();
					(i.index = this.helper.canvasIndex),
						(i.label = Manifesto.LanguageMap.getValue(t.getLabel())),
						(i.thumb = t.getProperty('thumbnail')),
						(i.title = this.helper.getLabel()),
						(i.trackingLabel = window.trackingLabel),
						this.isVideo()
							? (i.type = manifesto.ResourceType.movingimage().toString())
							: (i.type = manifesto.ResourceType.sound().toString()),
						this.fire(n.BaseEvents.BOOKMARK, i);
				}),
				(t.prototype.getEmbedScript = function (e, t, n) {
					var i = this.getAppUri(),
						o =
							i +
							'#?manifest=' +
							this.helper.iiifResourceUri +
							'&c=' +
							this.helper.collectionIndex +
							'&m=' +
							this.helper.manifestIndex +
							'&s=' +
							this.helper.sequenceIndex +
							'&cv=' +
							this.helper.canvasIndex,
						r = Utils.Strings.format(e, o, t.toString(), n.toString());
					return r;
				}),
				(t.prototype.getPosterImageUri = function () {
					var e = this.helper.getCurrentCanvas(),
						t = e.getContent();
					return t && t.length ? t[0].getProperty('thumbnail') : e.getProperty('thumbnail');
				}),
				(t.prototype.isVideoFormat = function (e) {
					var t = [manifesto.MediaType.mp4().toString(), manifesto.MediaType.webm().toString()];
					return -1 != t.indexOf(e);
				}),
				(t.prototype.isVideo = function () {
					var e = this.helper.getCurrentCanvas(),
						t = e.getContent();
					if (t && t.length)
						for (var n = this.getMediaFormats(e), i = 0; i < n.length; i++) {
							var o = n[i],
								r = o.getFormat();
							if (r && this.isVideoFormat(r.toString())) return !0;
						}
					else {
						var r = e.getType();
						if (r) return r.toString() === manifesto.ResourceType.movingimage().toString();
					}
					throw new Error('Unable to determine media type');
				}),
				t
			);
		})(i.BaseExtension);
		t.Extension = v;
	}
),
	define('modules/uv-shared-module/AnnotationResults', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return e;
		})();
		t.AnnotationResults = n;
	}),
	define('modules/uv-shared-module/Point', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e, t) {
				(this.x = e), (this.y = t);
			}
			return e;
		})();
		t.Point = n;
	}),
	define(
		'extensions/uv-seadragon-extension/CroppedImageDimensions',
		['require', 'exports', '../../modules/uv-shared-module/Point'],
		function (e, t, n) {
			'use strict';
			Object.defineProperty(t, '__esModule', { value: !0 });
			var i = Utils.Size,
				o = (function () {
					function e() {
						(this.region = new i(0, 0)),
							(this.regionPos = new n.Point(0, 0)),
							(this.size = new i(0, 0));
					}
					return e;
				})();
			t.CroppedImageDimensions = o;
		}
	);
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-seadragon-extension/DownloadDialogue', [
	'require',
	'exports',
	'../../modules/uv-shared-module/BaseEvents',
	'../../modules/uv-dialogues-module/DownloadDialogue',
	'../../modules/uv-shared-module/DownloadOption',
	'./DownloadType'
], function (e, t, n, i, o, r) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var s = Manifesto.Size,
		a = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					this.setConfig('downloadDialogue'),
						e.prototype.create.call(this),
						(this.$settingsButton = $(
							'<a class="settings" href="#">' + this.content.editSettings + '</a>'
						)),
						(this.$pagingNote = $(
							'<div class="pagingNote">' + this.content.pagingNote + ' </div>'
						)),
						this.$pagingNote.append(this.$settingsButton),
						this.$content.append(this.$pagingNote),
						(this.$imageOptionsContainer = $('<li class="group image"></li>')),
						this.$downloadOptions.append(this.$imageOptionsContainer),
						(this.$imageOptions = $('<ul></ul>')),
						this.$imageOptionsContainer.append(this.$imageOptions),
						(this.$currentViewAsJpgButton = $(
							'<li class="option single"><input id="' +
								o.DownloadOption.currentViewAsJpg.toString() +
								'" type="radio" name="downloadOptions" tabindex="0" /><label for="' +
								o.DownloadOption.currentViewAsJpg.toString() +
								'"></label></li>'
						)),
						this.$imageOptions.append(this.$currentViewAsJpgButton),
						this.$currentViewAsJpgButton.hide(),
						(this.$wholeImageHighResButton = $(
							'<li class="option single"><input id="' +
								o.DownloadOption.wholeImageHighRes.toString() +
								'" type="radio" name="downloadOptions" tabindex="0" /><label id="' +
								o.DownloadOption.wholeImageHighRes.toString() +
								'label" for="' +
								o.DownloadOption.wholeImageHighRes.toString() +
								'"></label></li>'
						)),
						this.$imageOptions.append(this.$wholeImageHighResButton),
						this.$wholeImageHighResButton.hide(),
						(this.$wholeImagesHighResButton = $(
							'<li class="option multiple"><input id="' +
								o.DownloadOption.wholeImagesHighRes.toString() +
								'" type="radio" name="downloadOptions" tabindex="0" /><label id="' +
								o.DownloadOption.wholeImagesHighRes.toString() +
								'label" for="' +
								o.DownloadOption.wholeImagesHighRes.toString() +
								'"></label></li>'
						)),
						this.$imageOptions.append(this.$wholeImagesHighResButton),
						this.$wholeImageHighResButton.hide(),
						(this.$wholeImageLowResAsJpgButton = $(
							'<li class="option single"><input id="' +
								o.DownloadOption.wholeImageLowResAsJpg.toString() +
								'" type="radio" name="downloadOptions" tabindex="0" /><label for="' +
								o.DownloadOption.wholeImageLowResAsJpg.toString() +
								'">' +
								this.content.wholeImageLowResAsJpg +
								'</label></li>'
						)),
						this.$imageOptions.append(this.$wholeImageLowResAsJpgButton),
						this.$wholeImageLowResAsJpgButton.hide(),
						(this.$canvasOptionsContainer = $('<li class="group canvas"></li>')),
						this.$downloadOptions.append(this.$canvasOptionsContainer),
						(this.$canvasOptions = $('<ul></ul>')),
						this.$canvasOptionsContainer.append(this.$canvasOptions),
						(this.$sequenceOptionsContainer = $('<li class="group sequence"></li>')),
						this.$downloadOptions.append(this.$sequenceOptionsContainer),
						(this.$sequenceOptions = $('<ul></ul>')),
						this.$sequenceOptionsContainer.append(this.$sequenceOptions),
						(this.$selectionButton = $(
							'<li class="option"><input id="' +
								o.DownloadOption.selection.toString() +
								'" type="radio" name="downloadOptions" tabindex="0" /><label id="' +
								o.DownloadOption.selection.toString() +
								'label" for="' +
								o.DownloadOption.selection.toString() +
								'"></label></li>'
						)),
						this.$sequenceOptions.append(this.$selectionButton),
						this.$selectionButton.hide(),
						(this.$downloadButton = $(
							'<a class="btn btn-primary" href="#" tabindex="0">' + this.content.download + '</a>'
						)),
						this.$buttons.prepend(this.$downloadButton),
						(this.$explanatoryTextTemplate = $('<span class="explanatory"></span>'));
					var i = this;
					this.$downloadButton.on('click', function (e) {
						e.preventDefault();
						var s = i.getSelectedOption(),
							a = s.attr('id'),
							u = s.attr('title'),
							l = s.data('mime'),
							c = r.DownloadType.UNKNOWN,
							h = t.extension.helper.getCurrentCanvas();
						if (t.renderingUrls[a])
							l &&
								(-1 !== l.toLowerCase().indexOf('pdf')
									? (c = r.DownloadType.ENTIREDOCUMENTASPDF)
									: -1 !== l.toLowerCase().indexOf('txt') &&
									  (c = r.DownloadType.ENTIREDOCUMENTASTEXT)),
								(c = r.DownloadType.ENTIREDOCUMENTASPDF) && window.open(t.renderingUrls[a]);
						else
							switch (a) {
								case o.DownloadOption.currentViewAsJpg.toString():
									var p = i.extension.getViewer();
									window.open(i.extension.getCroppedImageUri(h, p)),
										(c = r.DownloadType.CURRENTVIEW);
									break;
								case o.DownloadOption.selection.toString():
									Utils.Async.waitFor(
										function () {
											return !t.isActive;
										},
										function () {
											$.publish(n.BaseEvents.SHOW_MULTISELECT_DIALOGUE);
										}
									);
									break;
								case o.DownloadOption.wholeImageHighRes.toString():
									window.open(t.getCanvasHighResImageUri(t.extension.helper.getCurrentCanvas())),
										(c = r.DownloadType.WHOLEIMAGEHIGHRES);
									break;
								case o.DownloadOption.wholeImagesHighRes.toString():
									for (var d = t.extension.getPagedIndices(), f = 0; f < d.length; f++)
										window.open(
											t.getCanvasHighResImageUri(t.extension.helper.getCanvasByIndex(d[f]))
										);
									c = r.DownloadType.WHOLEIMAGESHIGHRES;
									break;
								case o.DownloadOption.wholeImageLowResAsJpg.toString():
									var g = i.extension.getConfinedImageUri(h, i.options.confinedImageSize);
									g && window.open(g), (c = r.DownloadType.WHOLEIMAGELOWRES);
							}
						$.publish(n.BaseEvents.DOWNLOAD, [{ type: c, label: u }]), t.close();
					}),
						this.$settingsButton.onPressed(function () {
							$.publish(n.BaseEvents.HIDE_DOWNLOAD_DIALOGUE),
								$.publish(n.BaseEvents.SHOW_SETTINGS_DIALOGUE);
						});
				}),
				(t.prototype.open = function (t) {
					e.prototype.open.call(this, t);
					var n = this.extension.helper.getCurrentCanvas(),
						i = this.extension.getViewerRotation(),
						r = i % 180 == 0;
					if (this.isDownloadOptionAvailable(o.DownloadOption.currentViewAsJpg)) {
						var s = this.$currentViewAsJpgButton.find('input'),
							a = this.$currentViewAsJpgButton.find('label'),
							u = this.content.currentViewAsJpg,
							l = this.extension.getViewer(),
							c = this.extension.getCroppedImageDimensions(n, l);
						if (
							(c
								? ((u = r
										? Utils.Strings.format(u, c.size.width.toString(), c.size.height.toString())
										: Utils.Strings.format(u, c.size.height.toString(), c.size.width.toString())),
								  a.text(u),
								  s.prop('title', u),
								  this.$currentViewAsJpgButton.data('width', c.size.width),
								  this.$currentViewAsJpgButton.data('height', c.size.height),
								  this.$currentViewAsJpgButton.show())
								: this.$currentViewAsJpgButton.hide(),
							Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, !1))
						) {
							var h = this.content.currentViewAsJpgExplanation;
							if (h) {
								var p = this.$explanatoryTextTemplate.clone();
								p.text(h), a.append(p);
							}
						}
					} else this.$currentViewAsJpgButton.hide();
					if (this.isDownloadOptionAvailable(o.DownloadOption.wholeImageHighRes)) {
						var s = this.$wholeImageHighResButton.find('input'),
							a = this.$wholeImageHighResButton.find('label'),
							d = this.getCanvasMimeType(this.extension.helper.getCurrentCanvas());
						d = d ? Utils.Files.simplifyMimeType(d) : '?';
						var f = this.getCanvasComputedDimensions(this.extension.helper.getCurrentCanvas());
						if (f) {
							var u = r
								? Utils.Strings.format(
										this.content.wholeImageHighRes,
										f.width.toString(),
										f.height.toString(),
										d
								  )
								: Utils.Strings.format(
										this.content.wholeImageHighRes,
										f.height.toString(),
										f.width.toString(),
										d
								  );
							a.text(u),
								s.prop('title', u),
								this.$wholeImageHighResButton.data('width', f.width),
								this.$wholeImageHighResButton.data('height', f.height),
								this.$wholeImageHighResButton.show();
						} else if (n.externalResource && !n.externalResource.hasServiceDescriptor()) {
							var u = Utils.Strings.format(this.content.wholeImageHighRes, '?', '?', d);
							a.text(u), s.prop('title', u), this.$wholeImageHighResButton.show();
						} else this.$wholeImageHighResButton.hide();
						if (Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, !1)) {
							var h = this.content.wholeImageHighResExplanation;
							if (h) {
								var p = this.$explanatoryTextTemplate.clone();
								p.text(h), a.append(p);
							}
						}
					} else this.$wholeImageHighResButton.hide();
					if (this.isDownloadOptionAvailable(o.DownloadOption.wholeImagesHighRes)) {
						var s = this.$wholeImagesHighResButton.find('input'),
							a = this.$wholeImagesHighResButton.find('label'),
							d = this.getCanvasMimeType(this.extension.helper.getCurrentCanvas());
						d = d ? Utils.Files.simplifyMimeType(d) : '?';
						var u = Utils.Strings.format(this.content.wholeImagesHighRes, d);
						if (
							(a.text(u),
							s.prop('title', u),
							this.$wholeImagesHighResButton.show(),
							Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, !1))
						) {
							var h = this.content.wholeImagesHighResExplanation;
							if (h) {
								var p = this.$explanatoryTextTemplate.clone();
								p.text(h), a.append(p);
							}
						}
					} else this.$wholeImagesHighResButton.hide();
					if (this.isDownloadOptionAvailable(o.DownloadOption.wholeImageLowResAsJpg)) {
						var s = this.$wholeImageLowResAsJpgButton.find('input'),
							a = this.$wholeImageLowResAsJpgButton.find('label'),
							f = this.extension.getConfinedImageDimensions(n, this.options.confinedImageSize),
							u = r
								? Utils.Strings.format(
										this.content.wholeImageLowResAsJpg,
										f.width.toString(),
										f.height.toString()
								  )
								: Utils.Strings.format(
										this.content.wholeImageLowResAsJpg,
										f.height.toString(),
										f.width.toString()
								  );
						if (
							(a.text(u),
							s.prop('title', u),
							this.$wholeImageLowResAsJpgButton.data('width', f.width),
							this.$wholeImageLowResAsJpgButton.data('height', f.height),
							this.$wholeImageLowResAsJpgButton.show(),
							Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, !1))
						) {
							var h = this.content.wholeImageLowResAsJpgExplanation;
							if (h) {
								var p = this.$explanatoryTextTemplate.clone();
								p.text(h), a.append(p);
							}
						}
					} else this.$wholeImageLowResAsJpgButton.hide();
					if (this.isDownloadOptionAvailable(o.DownloadOption.selection)) {
						var s = this.$selectionButton.find('input'),
							a = this.$selectionButton.find('label');
						if (
							(a.text(this.content.downloadSelection),
							s.prop('title', this.content.downloadSelection),
							this.$selectionButton.show(),
							Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, !1))
						) {
							var h = this.content.selectionExplanation;
							if (h) {
								var p = this.$explanatoryTextTemplate.clone();
								p.text(h), a.append(p);
							}
						}
					} else this.$selectionButton.hide();
					if (
						(this.resetDynamicDownloadOptions(),
						this.isDownloadOptionAvailable(o.DownloadOption.rangeRendering) &&
							n.ranges &&
							n.ranges.length)
					)
						for (var g = 0; g < n.ranges.length; g++) {
							var v = n.ranges[g],
								m = this.getDownloadOptionsForRenderings(
									v,
									this.content.entireFileAsOriginal,
									o.DownloadOption.dynamicCanvasRenderings
								);
							this.addDownloadOptionsForRenderings(m);
						}
					if (this.isDownloadOptionAvailable(o.DownloadOption.dynamicImageRenderings))
						for (var y = n.getImages(), g = 0; g < y.length; g++) {
							var m = this.getDownloadOptionsForRenderings(
								y[g].getResource(),
								this.content.entireFileAsOriginal,
								o.DownloadOption.dynamicImageRenderings
							);
							this.addDownloadOptionsForRenderings(m);
						}
					if (this.isDownloadOptionAvailable(o.DownloadOption.dynamicCanvasRenderings)) {
						var m = this.getDownloadOptionsForRenderings(
							n,
							this.content.entireFileAsOriginal,
							o.DownloadOption.dynamicCanvasRenderings
						);
						this.addDownloadOptionsForRenderings(m);
					}
					if (this.isDownloadOptionAvailable(o.DownloadOption.dynamicSequenceRenderings)) {
						var m = this.getDownloadOptionsForRenderings(
							this.extension.helper.getCurrentSequence(),
							this.content.entireDocument,
							o.DownloadOption.dynamicSequenceRenderings
						);
						this.addDownloadOptionsForRenderings(m);
					}
					if (this.isDownloadOptionAvailable(o.DownloadOption.currentViewAsJpg)) {
						var b = parseInt(this.$currentViewAsJpgButton.data('width').toString()),
							E = parseInt(this.$currentViewAsJpgButton.data('height').toString()),
							_ = parseInt(this.$wholeImageHighResButton.data('width').toString()),
							w = parseInt(this.$wholeImageHighResButton.data('height').toString()),
							S = (b / _) * 100,
							x = (E / w) * 100,
							I = this.options.currentViewDisabledPercentage;
						S >= I && x >= I
							? this.$currentViewAsJpgButton.hide()
							: this.$currentViewAsJpgButton.show();
					}
					var T = this.$imageOptions.find('li.single');
					(T = T.sort(function (e, t) {
						var n = $(e).data('width');
						n ? (n = parseInt(n.toString())) : 0;
						var i = $(e).data('height');
						i ? (i = parseInt(i.toString())) : 0;
						var o = $(t).data('width');
						o ? (o = parseInt(o.toString())) : 0;
						var r = $(t).data('height');
						r ? (r = parseInt(r.toString())) : 0;
						var s = n * i,
							a = o * r;
						return a > s ? -1 : s > a ? 1 : 0;
					})),
						T.detach().appendTo(this.$imageOptions);
					var O = this.$downloadOptions.find('li.group');
					O.each(function (e, t) {
						var n = $(t);
						n.show(), n.find('li.option:hidden').length === n.find('li.option').length && n.hide();
					}),
						this.$downloadOptions.find('li.group:visible').last().addClass('lastVisible'),
						this.extension.isPagingSettingEnabled() && this.config.options.downloadPagingNoteEnabled
							? this.$pagingNote.show()
							: this.$pagingNote.hide(),
						this.$downloadOptions.find('li.option:visible').length
							? (this.$downloadOptions.find('li.option input:visible:first').prop('checked', !0),
							  this.$noneAvailable.hide(),
							  this.$downloadButton.show())
							: (this.$noneAvailable.show(), this.$downloadButton.hide()),
						this.resize();
				}),
				(t.prototype.addDownloadOptionsForRenderings = function (e) {
					var t = this;
					e.forEach(function (e) {
						switch (e.type) {
							case o.DownloadOption.dynamicImageRenderings:
								t.$imageOptions.append(e.button);
								break;
							case o.DownloadOption.dynamicCanvasRenderings:
								t.$canvasOptions.append(e.button);
								break;
							case o.DownloadOption.dynamicSequenceRenderings:
								t.$sequenceOptions.append(e.button);
						}
					});
				}),
				(t.prototype.getCanvasImageResource = function (e) {
					var t = e.getImages();
					return t[0] ? t[0].getResource() : null;
				}),
				(t.prototype.getCanvasHighResImageUri = function (e) {
					var t = this.getCanvasComputedDimensions(e);
					if (t) {
						var n = t.width,
							i = e.getCanonicalImageUri(n);
						if (e.externalResource && e.externalResource.hasServiceDescriptor()) {
							var o = i.split('/'),
								r = this.extension.getViewerRotation();
							(o[o.length - 2] = String(r)), (i = o.join('/'));
						}
						return i;
					}
					return e.externalResource && !e.externalResource.hasServiceDescriptor()
						? e.externalResource.dataUri
						: '';
				}),
				(t.prototype.getCanvasMimeType = function (e) {
					var t = this.getCanvasImageResource(e);
					if (t) {
						var n = t.getFormat();
						if (n) return n.toString();
					}
					return null;
				}),
				(t.prototype.getCanvasDimensions = function (e) {
					if (e.externalResource.data) {
						var t = e.externalResource.data.width,
							n = e.externalResource.data.height;
						if (t && n) return new s(t, n);
					}
					return null;
				}),
				(t.prototype.getCanvasComputedDimensions = function (e) {
					var t = this.getCanvasDimensions(e),
						n = e.getMaxDimensions();
					if (!t) return null;
					if (!n) return t;
					if (t.width <= n.width && t.height <= n.height) return t;
					var i = n.width / t.width,
						o = n.height / t.height,
						r = Math.min(i, o);
					return new s(Math.floor(t.width * r), Math.floor(t.height * r));
				}),
				(t.prototype._isLevel0 = function (e) {
					return e && e.length ? manifesto.Utils.isLevel0ImageProfile(e[0]) : !1;
				}),
				(t.prototype.isDownloadOptionAvailable = function (t) {
					if (!this.extension.resources) return !1;
					var n = this.extension.helper.getCurrentCanvas();
					if (
						!n.externalResource.hasServiceDescriptor() ||
						this._isLevel0(n.externalResource.data.profile)
					)
						return t === o.DownloadOption.wholeImageHighRes &&
							(!this.extension.isPagingSettingEnabled() ||
								(this.extension.isPagingSettingEnabled() &&
									this.extension.resources &&
									1 === this.extension.resources.length))
							? !0
							: !1;
					switch (t) {
						case o.DownloadOption.currentViewAsJpg:
						case o.DownloadOption.dynamicCanvasRenderings:
						case o.DownloadOption.dynamicImageRenderings:
						case o.DownloadOption.wholeImageHighRes:
							if (
								!this.extension.isPagingSettingEnabled() ||
								(this.extension.isPagingSettingEnabled() &&
									this.extension.resources &&
									1 === this.extension.resources.length)
							) {
								var i = n.getMaxDimensions();
								return i ? (i.width <= this.options.maxImageWidth ? !0 : !1) : !0;
							}
							return !1;
						case o.DownloadOption.wholeImagesHighRes:
							return this.extension.isPagingSettingEnabled() &&
								this.extension.resources &&
								this.extension.resources.length > 1
								? !0
								: !1;
						case o.DownloadOption.wholeImageLowResAsJpg:
							var r = this.getCanvasComputedDimensions(n);
							return r
								? !this.extension.isPagingSettingEnabled() &&
										r.width > this.options.confinedImageSize
								: !1;
						case o.DownloadOption.selection:
							return this.options.selectionEnabled;
						case o.DownloadOption.rangeRendering:
							if (n.ranges && n.ranges.length) {
								var s = n.ranges[0];
								return s.getRenderings().length > 0;
							}
							return !1;
						default:
							return e.prototype.isDownloadOptionAvailable.call(this, t);
					}
				}),
				t
			);
		})(i.DownloadDialogue);
	t.DownloadDialogue = a;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-dialogues-module/ExternalContentDialogue', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/Dialogue'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('externalContentDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE),
					$.subscribe(this.openCommand, function (e, n) {
						t.open(), t.$iframe.prop('src', n.uri);
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					(this.$iframe = $('<iframe></iframe>')),
					this.$content.append(this.$iframe),
					this.$element.hide();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.$iframe.width(this.$content.width()),
					this.$iframe.height(this.$content.height());
			}),
			t
		);
	})(i.Dialogue);
	t.ExternalContentDialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-osdmobilefooterpanel-module/MobileFooter',
	[
		'require',
		'exports',
		'../uv-shared-module/FooterPanel',
		'../../extensions/uv-seadragon-extension/Events'
	],
	function (e, t, n, i) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var o = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					this.setConfig('mobileFooterPanel'),
						e.prototype.create.call(this),
						(this.$spacer = $('<div class="spacer"></div>')),
						this.$options.prepend(this.$spacer),
						(this.$rotateButton = $(
							'\n            <button class="btn imageBtn rotate" title="' +
								this.content.rotateRight +
								'">\n                <i class="uv-icon-rotate" aria-hidden="true"></i>' +
								this.content.rotateRight +
								'\n            </button>\n        '
						)),
						this.$options.prepend(this.$rotateButton),
						(this.$zoomOutButton = $(
							'\n            <button class="btn imageBtn zoomOut" title="' +
								this.content.zoomOut +
								'">\n                <i class="uv-icon-zoom-out" aria-hidden="true"></i>' +
								this.content.zoomOut +
								'\n            </button>\n        '
						)),
						this.$options.prepend(this.$zoomOutButton),
						(this.$zoomInButton = $(
							'\n            <button class="btn imageBtn zoomIn" title="' +
								this.content.zoomIn +
								'">\n                <i class="uv-icon-zoom-in" aria-hidden="true"></i>' +
								this.content.zoomIn +
								'\n            </button>\n        '
						)),
						this.$options.prepend(this.$zoomInButton),
						this.$zoomInButton.onPressed(function () {
							$.publish(i.Events.ZOOM_IN);
						}),
						this.$zoomOutButton.onPressed(function () {
							$.publish(i.Events.ZOOM_OUT);
						}),
						this.$rotateButton.onPressed(function () {
							$.publish(i.Events.ROTATE);
						});
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this),
						this.$options.css(
							'left',
							Math.floor(this.$element.width() / 2 - this.$options.width() / 2)
						);
				}),
				t
			);
		})(n.FooterPanel);
		t.FooterPanel = o;
	}
),
	define('modules/uv-shared-module/AutoComplete', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e, t, n, i, o, r, s, a) {
				void 0 === o && (o = 300),
					void 0 === r && (r = 2),
					void 0 === s && (s = !1),
					void 0 === a && (a = !1);
				var u = this;
				(this._$element = e),
					(this._autoCompleteFunc = t),
					(this._delay = o),
					(this._minChars = r),
					(this._onSelect = i),
					(this._parseResultsFunc = n),
					(this._positionAbove = s),
					(this._allowWords = a),
					(this._$searchResultsList = $('<ul class="autocomplete"></ul>')),
					this._positionAbove
						? this._$element.parent().prepend(this._$searchResultsList)
						: this._$element.parent().append(this._$searchResultsList),
					(this._$searchResultTemplate = $(
						'<li class="result"><a href="#" tabindex="-1"></a></li>'
					));
				var l = (function () {
						var e = 0;
						return function (t, n) {
							clearTimeout(e), (e = setTimeout(t, n));
						};
					})(),
					c = this;
				this._$element.on('keydown', function (e) {
					var t = e.originalEvent,
						n = Utils.Keyboard.getCharCode(t),
						i = !1;
					n === KeyCodes.KeyDown.LeftArrow
						? (i = !0)
						: n === KeyCodes.KeyDown.RightArrow && (i = !0),
						i && ((t.cancelBubble = !0), t.stopPropagation && t.stopPropagation());
				}),
					this._$element.on('keyup', function (e) {
						if (!c._getSelectedListItem().length && e.keyCode === KeyCodes.KeyDown.Enter)
							return void c._onSelect(c._getTerms());
						if (c._$searchResultsList.is(':visible') && c._results.length)
							if (e.keyCode === KeyCodes.KeyDown.Enter) c._searchForItem(c._getSelectedListItem());
							else {
								if (e.keyCode === KeyCodes.KeyDown.DownArrow)
									return void c._setSelectedResultIndex(1);
								if (e.keyCode === KeyCodes.KeyDown.UpArrow)
									return void c._setSelectedResultIndex(-1);
							}
						e.keyCode !== KeyCodes.KeyDown.Enter &&
							l(function () {
								var e = c._getTerms();
								e && e.length > c._minChars && c._searchForWords(e)
									? c._search(e)
									: (c._clearResults(), c._hideResults());
							}, c._delay);
					}),
					$(document).on('mouseup', function (e) {
						0 === u._$searchResultsList.parent().has($(e.target)[0]).length &&
							(u._clearResults(), u._hideResults());
					}),
					this._hideResults();
			}
			return (
				(e.prototype._searchForWords = function (e) {
					return this._allowWords || !e.includes(' ') ? !0 : !1;
				}),
				(e.prototype._getTerms = function () {
					return this._$element.val().trim();
				}),
				(e.prototype._setSelectedResultIndex = function (e) {
					var t;
					t = 1 === e ? this._selectedResultIndex + 1 : this._selectedResultIndex - 1;
					var n = this._$searchResultsList.find('li');
					0 > t ? (t = n.length - 1) : t > n.length - 1 && (t = 0),
						(this._selectedResultIndex = t),
						n.removeClass('selected');
					var i = n.eq(this._selectedResultIndex);
					i.addClass('selected');
					var o = i.outerHeight(!0) * this._selectedResultIndex;
					this._$searchResultsList.scrollTop(o);
				}),
				(e.prototype._search = function (e) {
					(this._results = []),
						this._clearResults(),
						this._showResults(),
						this._$searchResultsList.append('<li class="loading"></li>'),
						this._updateListPosition();
					var t = this;
					this._autoCompleteFunc(e, function (e) {
						t._listResults(e);
					});
				}),
				(e.prototype._clearResults = function () {
					this._$searchResultsList.empty();
				}),
				(e.prototype._hideResults = function () {
					this._$searchResultsList.hide();
				}),
				(e.prototype._showResults = function () {
					(this._selectedResultIndex = -1), this._$searchResultsList.show();
				}),
				(e.prototype._updateListPosition = function () {
					this._positionAbove
						? this._$searchResultsList.css({ top: -1 * this._$searchResultsList.outerHeight(!0) })
						: this._$searchResultsList.css({ top: this._$element.outerHeight(!0) });
				}),
				(e.prototype._listResults = function (e) {
					if (
						((this._results = this._parseResultsFunc(e)),
						this._clearResults(),
						!this._results.length)
					)
						return void this._hideResults();
					for (var t = 0; t < this._results.length; t++) {
						var n = this._results[t],
							i = this._$searchResultTemplate.clone(),
							o = i.find('a');
						o.text(n), this._$searchResultsList.append(i);
					}
					this._updateListPosition();
					var r = this;
					this._$searchResultsList.find('li').on('click', function (e) {
						e.preventDefault(), r._searchForItem($(this));
					});
				}),
				(e.prototype._searchForItem = function (e) {
					var t = e.find('a').text();
					this._$element.val(t),
						this._hideResults(),
						this._onSelect(t),
						this._clearResults(),
						this._hideResults();
				}),
				(e.prototype._getSelectedListItem = function () {
					return this._$searchResultsList.find('li.selected');
				}),
				e
			);
		})();
		t.AutoComplete = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-searchfooterpanel-module/FooterPanel', [
	'require',
	'exports',
	'../uv-shared-module/AutoComplete',
	'../uv-shared-module/BaseEvents',
	'../../extensions/uv-seadragon-extension/Events',
	'../uv-shared-module/FooterPanel',
	'../../extensions/uv-seadragon-extension/Mode',
	'../../Utils'
], function (e, t, n, i, o, r, s, a) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var u = (function (e) {
		function t(t) {
			var n = e.call(this, t) || this;
			return (n.placemarkerTouched = !1), n;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('searchFooterPanel'),
					e.prototype.create.call(this),
					$.subscribe(i.BaseEvents.CANVAS_INDEX_CHANGED, function () {
						t.canvasIndexChanged(),
							t.setCurrentSearchResultPlacemarker(),
							t.updatePrevButton(),
							t.updateNextButton();
					}),
					$.subscribe(i.BaseEvents.CLEAR_ANNOTATIONS, function () {
						t.clearSearchResults();
					}),
					$.subscribe(o.Events.MODE_CHANGED, function () {
						t.settingsChanged();
					}),
					$.subscribe(o.Events.SEARCH, function (e, n) {
						t.terms = n;
					}),
					$.subscribe(i.BaseEvents.ANNOTATIONS, function (e, n) {
						t.displaySearchResults(n.annotations, n.terms),
							t.setCurrentSearchResultPlacemarker(),
							t.updatePrevButton(),
							t.updateNextButton();
					}),
					$.subscribe(i.BaseEvents.ANNOTATIONS_EMPTY, function () {
						t.hideSearchSpinner();
					}),
					$.subscribe(i.BaseEvents.ANNOTATION_CHANGED, function () {
						t.updatePrevButton(), t.updateNextButton();
					}),
					(this.$printButton = $(
						'\n          <button class="print btn imageBtn" title="' +
							this.content.print +
							'" tabindex="0">\n            <i class="uv-icon uv-icon-print" aria-hidden="true"></i>' +
							this.content.print +
							'\n          </button>\n        '
					)),
					this.$options.prepend(this.$printButton),
					(this.$searchContainer = $('<div class="search"></div>')),
					this.$element.prepend(this.$searchContainer),
					(this.$searchOptions = $('<div class="searchOptions"></div>')),
					this.$searchContainer.append(this.$searchOptions),
					(this.$searchLabel = $('<span class="label">' + this.content.searchWithin + '</span>')),
					this.$searchOptions.append(this.$searchLabel),
					(this.$searchTextContainer = $('<div class="searchTextContainer"></div>')),
					this.$searchOptions.append(this.$searchTextContainer),
					(this.$searchText = $(
						'<input class="searchText" type="text" maxlength="100" value="' +
							this.content.enterKeyword +
							'" aria-label="' +
							this.content.searchWithin +
							'"/>'
					)),
					this.$searchTextContainer.append(this.$searchText),
					(this.$searchButton = $('<a class="imageButton searchButton" tabindex="0"></a>')),
					this.$searchTextContainer.append(this.$searchButton),
					(this.$searchPagerContainer = $('<div class="searchPager"></div>')),
					this.$element.prepend(this.$searchPagerContainer),
					(this.$searchPagerControls = $('<div class="controls"></div>')),
					this.$searchPagerContainer.prepend(this.$searchPagerControls),
					(this.$previousResultButton = $(
						'<a class="previousResult" title="' +
							this.content.previousResult +
							'">' +
							this.content.previousResult +
							'</a>'
					)),
					this.$searchPagerControls.append(this.$previousResultButton),
					(this.$searchResultsInfo = $(
						'<div class="searchResultsInfo"><span class="info"><span class="number">x</span> <span class="foundFor"></span> \'<span class="terms">y</span>\'<?span></div>'
					)),
					this.$searchPagerControls.append(this.$searchResultsInfo),
					(this.$clearSearchResultsButton = $(
						'<a class="clearSearch" title="' +
							this.content.clearSearch +
							'">' +
							this.content.clearSearch +
							'</a>'
					)),
					this.$searchResultsInfo.append(this.$clearSearchResultsButton),
					(this.$nextResultButton = $(
						'<a class="nextResult" title="' +
							this.content.nextResult +
							'">' +
							this.content.nextResult +
							'</a>'
					)),
					this.$searchPagerControls.append(this.$nextResultButton),
					(this.$searchResultsContainer = $('<div class="searchResults"></div>')),
					this.$element.prepend(this.$searchResultsContainer),
					(this.$line = $('<div class="line"></div>')),
					this.$searchResultsContainer.append(this.$line),
					(this.$pagePositionMarker = $('<div class="positionPlacemarker"></div>')),
					this.$searchResultsContainer.append(this.$pagePositionMarker),
					(this.$pagePositionLabel = $('<div class="label"></div>')),
					this.$searchResultsContainer.append(this.$pagePositionLabel),
					(this.$placemarkerDetails = $('<div class="placeMarkerDetails"></div>')),
					this.$searchResultsContainer.append(this.$placemarkerDetails),
					(this.$placemarkerDetailsTop = $('<h1></h1>')),
					this.$placemarkerDetails.append(this.$placemarkerDetailsTop),
					(this.$placemarkerDetailsBottom = $('<p></p>')),
					this.$placemarkerDetails.append(this.$placemarkerDetailsBottom),
					this.$searchPagerContainer.hide(),
					this.$placemarkerDetails.hide();
				var r = this;
				this.$searchButton.on('click', function (e) {
					e.preventDefault(), t.search(t.$searchText.val());
				}),
					this.$searchText.on('focus', function () {
						t.$searchText.val() === t.content.enterKeyword && t.$searchText.val('');
					}),
					this.$placemarkerDetails.on('mouseover', function () {
						$.publish(o.Events.SEARCH_PREVIEW_START, [t.currentPlacemarkerIndex]);
					}),
					this.$placemarkerDetails.on('mouseleave', function () {
						$(this).hide(), $.publish(o.Events.SEARCH_PREVIEW_FINISH);
						var e = r.getSearchResultPlacemarkers();
						e.removeClass('hover');
					}),
					this.$placemarkerDetails.on('click', function () {
						$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.currentPlacemarkerIndex]);
					}),
					this.$previousResultButton.on('click', function (e) {
						e.preventDefault(),
							t.isPreviousButtonEnabled() && $.publish(o.Events.PREV_SEARCH_RESULT);
					}),
					this.$nextResultButton.on('click', function (e) {
						e.preventDefault(), t.isNextButtonEnabled() && $.publish(o.Events.NEXT_SEARCH_RESULT);
					}),
					this.$clearSearchResultsButton.on('click', function (e) {
						e.preventDefault(), $.publish(i.BaseEvents.CLEAR_ANNOTATIONS);
					}),
					this.isSearchEnabled() ||
						(this.$searchContainer.hide(),
						this.$searchPagerContainer.hide(),
						this.$searchResultsContainer.hide(),
						this.$element.addClass('min')),
					1 === this.extension.helper.getTotalCanvases() && this.$searchResultsContainer.hide();
				var s = this.extension.getAutoCompleteUri();
				s
					? new n.AutoComplete(
							this.$searchText,
							function (e, t) {
								$.getJSON(Utils.Strings.format(s, e), function (e) {
									t(e);
								});
							},
							function (e) {
								return $.map(e.terms, function (e) {
									return e.match;
								});
							},
							function (e) {
								t.search(e);
							},
							300,
							2,
							!0,
							Utils.Bools.getBool(this.options.autocompleteAllowWords, !1)
					  )
					: this.$searchText.on('keyup', function (e) {
							e.keyCode === KeyCodes.KeyDown.Enter && r.search(r.$searchText.val());
					  }),
					this.$printButton.onPressed(function () {
						$.publish(o.Events.PRINT);
					}),
					this.updatePrintButton();
				var a = Utils.Bools.getBool(this.config.options.positionMarkerEnabled, !0);
				a || (this.$pagePositionMarker.hide(), this.$pagePositionLabel.hide());
			}),
			(t.prototype.isSearchEnabled = function () {
				return this.extension.isSearchEnabled();
			}),
			(t.prototype.isZoomToSearchResultEnabled = function () {
				return Utils.Bools.getBool(
					this.extension.data.config.options.zoomToSearchResultEnabled,
					!0
				);
			}),
			(t.prototype.isPreviousButtonEnabled = function () {
				var e = this.extension.helper.canvasIndex,
					t = this.getFirstSearchResultCanvasIndex(),
					n = this.getCurrentSearchResultRectIndex();
				return this.isZoomToSearchResultEnabled() && this.extension.currentAnnotationRect
					? t > e
						? !1
						: e === t && 0 === n
						? !1
						: !0
					: e > t;
			}),
			(t.prototype.isNextButtonEnabled = function () {
				var e = this.extension.helper.canvasIndex,
					t = this.getLastSearchResultCanvasIndex(),
					n = this.getCurrentSearchResultRectIndex();
				return this.isZoomToSearchResultEnabled() && this.extension.currentAnnotationRect
					? e > t
						? !1
						: e === t && n === this.getLastSearchResultRectIndex()
						? !1
						: !0
					: t > e;
			}),
			(t.prototype.getSearchResults = function () {
				return this.extension.annotations;
			}),
			(t.prototype.getCurrentSearchResultRectIndex = function () {
				return this.extension.getCurrentAnnotationRectIndex();
			}),
			(t.prototype.getFirstSearchResultCanvasIndex = function () {
				var e = this.getSearchResults();
				if (!e) return -1;
				var t = e[0].canvasIndex;
				return t;
			}),
			(t.prototype.getLastSearchResultCanvasIndex = function () {
				var e = this.getSearchResults();
				if (!e) return -1;
				var t = e[e.length - 1].canvasIndex;
				return t;
			}),
			(t.prototype.getLastSearchResultRectIndex = function () {
				return this.extension.getLastAnnotationRectIndex();
			}),
			(t.prototype.updateNextButton = function () {
				var e = this.getSearchResults();
				e &&
					e.length &&
					(this.isNextButtonEnabled()
						? this.$nextResultButton.removeClass('disabled')
						: this.$nextResultButton.addClass('disabled'));
			}),
			(t.prototype.updatePrevButton = function () {
				var e = this.getSearchResults();
				e &&
					e.length &&
					(this.isPreviousButtonEnabled()
						? this.$previousResultButton.removeClass('disabled')
						: this.$previousResultButton.addClass('disabled'));
			}),
			(t.prototype.updatePrintButton = function () {
				var e = Utils.Bools.getBool(this.options.printEnabled, !1);
				e ? this.$printButton.show() : this.$printButton.hide();
			}),
			(t.prototype.search = function (e) {
				return (
					(this.terms = e),
					'' === this.terms || this.terms === this.content.enterKeyword
						? void this.extension.showMessage(
								this.config.modules.genericDialogue.content.emptyValue,
								function () {
									this.$searchText.focus();
								}
						  )
						: (this.$searchText.blur(),
						  this.showSearchSpinner(),
						  void $.publish(o.Events.SEARCH, [this.terms]))
				);
			}),
			(t.prototype.getSearchResultPlacemarkers = function () {
				return this.$searchResultsContainer.find('.searchResultPlacemarker');
			}),
			(t.prototype.setCurrentSearchResultPlacemarker = function () {
				var e = this.getSearchResultPlacemarkers();
				e.parent().find('.current').removeClass('current');
				var t = $(
					'.searchResultPlacemarker[data-index="' + this.extension.helper.canvasIndex + '"]'
				);
				t.addClass('current');
			}),
			(t.prototype.positionSearchResultPlacemarkers = function () {
				var e = this.getSearchResults();
				if (e && e.length) {
					var t = this.getSearchResultPlacemarkers();
					t.remove();
					for (
						var n = this.getPageLineRatio(),
							i = this.$line.position().top,
							o = this.$line.position().left,
							r = this,
							s = 0;
						s < e.length;
						s++
					) {
						var a = e[s],
							u = a.canvasIndex * n,
							l = $(
								'<div class="searchResultPlacemarker" data-index="' + a.canvasIndex + '"></div>'
							);
						(l[0].ontouchstart = function (e) {
							r.onPlacemarkerTouchStart.call(this, r);
						}),
							l.click(function (e) {
								r.onPlacemarkerClick.call(this, r);
							}),
							l.mouseenter(function (e) {
								r.onPlacemarkerMouseEnter.call(this, r);
							}),
							l.mouseleave(function (e) {
								r.onPlacemarkerMouseLeave.call(this, e, r);
							}),
							this.$searchResultsContainer.append(l);
						var c = i - l.height(),
							h = o + u - l.width() / 2;
						l.css({ top: c, left: h });
					}
				}
			}),
			(t.prototype.onPlacemarkerTouchStart = function (e) {
				e.placemarkerTouched = !0;
			}),
			(t.prototype.onPlacemarkerClick = function (e) {
				e.placemarkerTouched || (e.placemarkerTouched = !1);
			}),
			(t.prototype.onPlacemarkerMouseEnter = function (e) {
				if (!e.placemarkerTouched) {
					var t = $(this);
					t.addClass('hover');
					var n = parseInt(t.attr('data-index'));
					$.publish(o.Events.SEARCH_PREVIEW_START, [n]);
					var i = e.getSearchResultPlacemarkers(),
						r = i.index(t[0]);
					(e.currentPlacemarkerIndex = n), e.$placemarkerDetails.show();
					var s = '{0} {1}';
					if (e.isPageModeEnabled()) {
						var a = e.extension.helper.getCanvasByIndex(n),
							u = Manifesto.LanguageMap.getValue(a.getLabel());
						u || (u = this.extension.helper.manifest.options.defaultLabel),
							(s = Utils.Strings.format(s, e.content.pageCaps, u));
					} else s = Utils.Strings.format(s, e.content.imageCaps, String(n + 1));
					e.$placemarkerDetailsTop.html(s);
					var l = e.getSearchResults();
					if (l) {
						var c = l[r],
							h = '';
						e.terms && (h = Utils.Strings.ellipsis(e.terms, e.options.elideDetailsTermsCount));
						var p = e.content.instanceFound,
							d = e.content.instancesFound,
							f = '';
						1 === c.rects.length
							? ((f = Utils.Strings.format(p, h)), e.$placemarkerDetailsBottom.html(f))
							: ((f = Utils.Strings.format(d, String(c.rects.length), h)),
							  e.$placemarkerDetailsBottom.html(f));
					}
					var g = t.position(),
						v = g.top - e.$placemarkerDetails.height(),
						m = g.left;
					m < e.$placemarkerDetails.width() / 2
						? (m = 0 - t.width() / 2)
						: m > e.$line.width() - e.$placemarkerDetails.width() / 2
						? (m = e.$line.width() - e.$placemarkerDetails.width() + t.width() / 2)
						: (m -= e.$placemarkerDetails.width() / 2),
						e.$placemarkerDetails.css({ top: v, left: m });
				}
			}),
			(t.prototype.onPlacemarkerMouseLeave = function (e, t) {
				$.publish(o.Events.SEARCH_PREVIEW_FINISH);
				var n = $(this),
					i = e.toElement || e.relatedTarget,
					r = $(i).closest(t.$placemarkerDetails).length;
				i != t.$placemarkerDetails.get(0) &&
					0 === r &&
					(t.$placemarkerDetails.hide(), n.removeClass('hover'));
			}),
			(t.prototype.setPageMarkerPosition = function () {
				if (null !== this.extension.helper.canvasIndex) {
					var e = this.getPageLineRatio(),
						t = this.$line.position().top,
						n = this.$line.position().left,
						i = this.extension.helper.canvasIndex * e,
						o = t,
						r = n + i;
					this.$pagePositionMarker.css({ top: o, left: r });
					var s = this.$line.width();
					r + this.$pagePositionLabel.outerWidth(!0) > s
						? ((r -= this.$pagePositionLabel.outerWidth(!0)),
						  this.$pagePositionLabel.removeClass('right'),
						  this.$pagePositionLabel.addClass('left'))
						: (this.$pagePositionLabel.removeClass('left'),
						  this.$pagePositionLabel.addClass('right')),
						this.$pagePositionLabel.css({ top: o, left: r });
				}
			}),
			(t.prototype.clearSearchResults = function () {
				if (this.isSearchEnabled()) {
					var e = this.getSearchResultPlacemarkers();
					e.remove(),
						this.$searchText.val(this.content.enterKeyword),
						this.$searchContainer.show(),
						this.$searchPagerContainer.hide(),
						this.$searchText.focus();
				}
			}),
			(t.prototype.getPageLineRatio = function () {
				var e = this.$line.width();
				return 1 === this.extension.helper.getTotalCanvases()
					? 0
					: e / (this.extension.helper.getTotalCanvases() - 1);
			}),
			(t.prototype.canvasIndexChanged = function () {
				this.setPageMarkerPosition(), this.setPlacemarkerLabel();
			}),
			(t.prototype.settingsChanged = function () {
				this.setPlacemarkerLabel();
			}),
			(t.prototype.setPlacemarkerLabel = function () {
				var e = this.content.displaying,
					t = this.extension.helper.canvasIndex;
				if (this.isPageModeEnabled()) {
					var n = this.extension.helper.getCanvasByIndex(t),
						i = Manifesto.LanguageMap.getValue(n.getLabel());
					i || (i = this.content.defaultLabel);
					var o = this.extension.helper.getLastCanvasLabel(!0);
					o &&
						this.$pagePositionLabel.html(
							Utils.Strings.format(
								e,
								this.content.page,
								a.UVUtils.sanitize(i),
								a.UVUtils.sanitize(o)
							)
						);
				} else
					this.$pagePositionLabel.html(
						Utils.Strings.format(
							e,
							this.content.image,
							String(t + 1),
							this.extension.helper.getTotalCanvases().toString()
						)
					);
			}),
			(t.prototype.isPageModeEnabled = function () {
				return (
					this.config.options.pageModeEnabled &&
					this.extension.getMode().toString() === s.Mode.page.toString() &&
					!Utils.Bools.getBool(this.config.options.forceImageMode, !1)
				);
			}),
			(t.prototype.showSearchSpinner = function () {
				this.$searchText.addClass('searching');
			}),
			(t.prototype.hideSearchSpinner = function () {
				this.$searchText.removeClass('searching');
			}),
			(t.prototype.displaySearchResults = function (e, t) {
				if (this.isSearchEnabled()) {
					this.hideSearchSpinner(),
						this.positionSearchResultPlacemarkers(),
						this.$searchContainer.hide(),
						this.$searchPagerControls.css({ left: 0 });
					var n = this.$searchResultsInfo.find('.info'),
						i = n.find('.number'),
						o = n.find('.foundFor'),
						r = n.find('.terms');
					t
						? (n.show(),
						  i.text(this.extension.getTotalAnnotationRects()),
						  1 === e.length
								? o.html(this.content.resultFoundFor)
								: o.html(this.content.resultsFoundFor),
						  r.html(Utils.Strings.ellipsis(t, this.options.elideResultsTermsCount)),
						  r.prop('title', t))
						: n.hide(),
						this.$searchPagerContainer.show(),
						this.resize();
				}
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
				var t = this.getSearchResults();
				t && t.length && this.positionSearchResultPlacemarkers(),
					this.setPageMarkerPosition(),
					this.$searchPagerContainer.width(this.$element.width());
				var n = this.$element.width() / 2;
				this.$searchPagerControls.css({ left: n - this.$searchPagerControls.width() / 2 }),
					this.$searchOptions.css({ left: n - this.$searchOptions.outerWidth() / 2 });
			}),
			t
		);
	})(r.FooterPanel);
	t.FooterPanel = u;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-dialogues-module/MoreInfoDialogue', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/Dialogue',
	'../../Utils'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('moreInfoDialogue'),
					e.prototype.create.call(this),
					(this.openCommand = n.BaseEvents.SHOW_MOREINFO_DIALOGUE),
					(this.closeCommand = n.BaseEvents.HIDE_MOREINFO_DIALOGUE),
					$.subscribe(this.openCommand, function (e, n) {
						t.open(n);
					}),
					$.subscribe(this.closeCommand, function () {
						t.close();
					}),
					(this.config.content = this.extension.data.config.modules.moreInfoRightPanel.content),
					(this.config.options = this.extension.data.config.modules.moreInfoRightPanel.options),
					(this.$title = $('<h1>' + this.config.content.title + '</h1>')),
					this.$content.append(this.$title),
					(this.$metadata = $('<div class="iiif-metadata-component"></div>')),
					this.$content.append(this.$metadata),
					(this.metadataComponent = new IIIFComponents.MetadataComponent({
						target: this.$metadata[0]
					})),
					this.$element.hide();
			}),
			(t.prototype.open = function (t) {
				e.prototype.open.call(this, t), this.metadataComponent.set(this._getData());
			}),
			(t.prototype._getData = function () {
				return {
					canvasDisplayOrder: this.config.options.canvasDisplayOrder,
					canvases: this.extension.getCurrentCanvases(),
					canvasExclude: this.config.options.canvasExclude,
					canvasLabels: this.extension.getCanvasLabels(this.content.page),
					content: this.config.content,
					copiedMessageDuration: 2e3,
					copyToClipboardEnabled: Utils.Bools.getBool(
						this.config.options.copyToClipboardEnabled,
						!1
					),
					helper: this.extension.helper,
					licenseFormatter: null,
					limit: this.config.options.textLimit || 4,
					limitType: IIIFComponents.LimitType.LINES,
					manifestDisplayOrder: this.config.options.manifestDisplayOrder,
					manifestExclude: this.config.options.manifestExclude,
					range: this.extension.getCurrentCanvasRange(),
					rtlLanguageCodes: this.config.options.rtlLanguageCodes,
					sanitizer: function (e) {
						return o.UVUtils.sanitize(e);
					},
					showAllLanguages: this.config.options.showAllLanguages
				};
			}),
			(t.prototype.close = function () {
				e.prototype.close.call(this);
			}),
			(t.prototype.resize = function () {
				this.setDockedPosition();
			}),
			t
		);
	})(i.Dialogue);
	t.MoreInfoDialogue = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-multiselectdialogue-module/MultiSelectDialogue',
	[
		'require',
		'exports',
		'../../modules/uv-shared-module/BaseEvents',
		'../../modules/uv-shared-module/Dialogue',
		'../../extensions/uv-seadragon-extension/Mode'
	],
	function (e, t, n, i, o) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var r = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					this.setConfig('multiSelectDialogue'), e.prototype.create.call(this);
					var i = this;
					(this.openCommand = n.BaseEvents.SHOW_MULTISELECT_DIALOGUE),
						(this.closeCommand = n.BaseEvents.HIDE_MULTISELECT_DIALOGUE),
						$.subscribe(this.openCommand, function () {
							t.open();
							var e = t.extension.helper.getMultiSelectState();
							e.setEnabled(!0), t.galleryComponent.set(t.data);
						}),
						$.subscribe(this.closeCommand, function () {
							t.close();
							var e = t.extension.helper.getMultiSelectState();
							e.setEnabled(!1);
						}),
						(this.$title = $('<h1></h1>')),
						this.$content.append(this.$title),
						this.$title.text(this.content.title),
						(this.$gallery = $('<div class="iiif-gallery-component"></div>')),
						this.$content.append(this.$gallery),
						(this.data = {
							helper: this.extension.helper,
							chunkedResizingThreshold: this.config.options.galleryThumbChunkedResizingThreshold,
							content: this.config.content,
							debug: !1,
							imageFadeInDuration: 300,
							initialZoom: 4,
							minLabelWidth: 20,
							pageModeEnabled: this.isPageModeEnabled(),
							searchResults: [],
							scrollStopDuration: 100,
							sizingEnabled: !0,
							thumbHeight: this.config.options.galleryThumbHeight,
							thumbLoadPadding: this.config.options.galleryThumbLoadPadding,
							thumbWidth: this.config.options.galleryThumbWidth,
							viewingDirection: this.extension.helper.getViewingDirection()
						}),
						(this.galleryComponent = new IIIFComponents.GalleryComponent({
							target: this.$gallery[0]
						}));
					var o = this.$gallery.find('a.select');
					o.addClass('btn btn-primary'),
						this.galleryComponent.on(
							'multiSelectionMade',
							function (e) {
								$.publish(n.BaseEvents.MULTISELECTION_MADE, [e]), i.close();
							},
							!1
						),
						this.$element.hide();
				}),
				(t.prototype.isPageModeEnabled = function () {
					return (
						Utils.Bools.getBool(this.config.options.pageModeEnabled, !0) &&
						this.extension.getMode().toString() === o.Mode.page.toString()
					);
				}),
				(t.prototype.open = function () {
					e.prototype.open.call(this);
				}),
				(t.prototype.close = function () {
					e.prototype.close.call(this);
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this);
					var t = this.$gallery.find('.main'),
						n = this.$gallery.find('.header');
					t.height(
						this.$content.height() -
							this.$title.outerHeight() -
							this.$title.verticalMargins() -
							n.height()
					);
				}),
				t
			);
		})(i.Dialogue);
		t.MultiSelectDialogue = r;
	}
),
	define(
		'extensions/uv-seadragon-extension/MultiSelectionArgs',
		['require', 'exports'],
		function (e, t) {
			'use strict';
			Object.defineProperty(t, '__esModule', { value: !0 });
			var n = (function () {
				function e() {}
				return e;
			})();
			t.MultiSelectionArgs = n;
		}
	);
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'modules/uv-pagingheaderpanel-module/PagingHeaderPanel',
	[
		'require',
		'exports',
		'../uv-shared-module/AutoComplete',
		'../uv-shared-module/BaseEvents',
		'../../extensions/uv-seadragon-extension/Events',
		'../uv-shared-module/HeaderPanel',
		'../../extensions/uv-seadragon-extension/Mode',
		'../../Utils'
	],
	function (e, t, n, i, o, r, s, a) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var u = (function (e) {
			function t(t) {
				var n = e.call(this, t) || this;
				return (
					(n.firstButtonEnabled = !1),
					(n.lastButtonEnabled = !1),
					(n.nextButtonEnabled = !1),
					(n.prevButtonEnabled = !1),
					n
				);
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					if (
						(this.setConfig('pagingHeaderPanel'),
						e.prototype.create.call(this),
						$.subscribe(i.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
							t.canvasIndexChanged(n);
						}),
						$.subscribe(i.BaseEvents.SETTINGS_CHANGED, function () {
							t.modeChanged(), t.updatePagingToggle();
						}),
						$.subscribe(i.BaseEvents.CANVAS_INDEX_CHANGE_FAILED, function () {
							t.setSearchFieldValue(t.extension.helper.canvasIndex);
						}),
						$.subscribe(i.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
							t.openGallery();
						}),
						$.subscribe(i.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START, function () {
							t.closeGallery();
						}),
						(this.$prevOptions = $('<div class="prevOptions"></div>')),
						this.$centerOptions.append(this.$prevOptions),
						(this.$firstButton = $(
							'\n          <button class="btn imageBtn first" tabindex="0" title="' +
								this.content.first +
								'">\n            <i class="uv-icon-first" aria-hidden="true"></i><span>' +
								this.content.first +
								'</span>\n          </button>\n        '
						)),
						this.$prevOptions.append(this.$firstButton),
						(this.$prevButton = $(
							'\n          <button class="btn imageBtn prev" tabindex="0" title="' +
								this.content.previous +
								'">\n            <i class="uv-icon-prev" aria-hidden="true"></i><span>' +
								this.content.previous +
								'</span>\n          </button>\n        '
						)),
						this.$prevOptions.append(this.$prevButton),
						(this.$modeOptions = $('<div class="mode"></div>')),
						this.$centerOptions.append(this.$modeOptions),
						(this.$imageModeLabel = $('<label for="image">' + this.content.image + '</label>')),
						this.$modeOptions.append(this.$imageModeLabel),
						(this.$imageModeOption = $(
							'<input type="radio" id="image" name="mode" tabindex="0"/>'
						)),
						this.$modeOptions.append(this.$imageModeOption),
						(this.$pageModeLabel = $('<label for="page"></label>')),
						this.$modeOptions.append(this.$pageModeLabel),
						(this.$pageModeOption = $('<input type="radio" id="page" name="mode" tabindex="0"/>')),
						this.$modeOptions.append(this.$pageModeOption),
						(this.$search = $('<div class="search"></div>')),
						this.$centerOptions.append(this.$search),
						(this.$searchText = $(
							'<input class="searchText" maxlength="50" type="text" tabindex="0" aria-label="' +
								this.content.pageSearchLabel +
								'"/>'
						)),
						this.$search.append(this.$searchText),
						Utils.Bools.getBool(this.options.autoCompleteBoxEnabled, !0))
					)
						this.$searchText.hide(),
							(this.$autoCompleteBox = $(
								'<input class="autocompleteText" type="text" maxlength="100" aria-label="' +
									this.content.pageSearchLabel +
									'"/>'
							)),
							this.$search.append(this.$autoCompleteBox),
							new n.AutoComplete(
								this.$autoCompleteBox,
								function (e, n) {
									var i = [],
										o = t.extension.helper.getCanvases();
									if (t.isPageModeEnabled())
										for (var r = 0; r < o.length; r++) {
											var s = o[r],
												a = Manifesto.LanguageMap.getValue(s.getLabel());
											a && a.startsWith(e) && i.push(a);
										}
									else
										for (var r = 0; r < o.length; r++) {
											var s = o[r];
											s.index.toString().startsWith(e) && i.push(s.index.toString());
										}
									n(i);
								},
								function (e) {
									return e;
								},
								function (e) {
									t.search(e);
								},
								300,
								0,
								Utils.Bools.getBool(this.options.autocompleteAllowWords, !1)
							);
					else if (Utils.Bools.getBool(this.options.imageSelectionBoxEnabled, !0)) {
						(this.$selectionBoxOptions = $('<div class="image-selectionbox-options"></div>')),
							this.$centerOptions.append(this.$selectionBoxOptions),
							(this.$imageSelectionBox = $(
								'<select class="image-selectionbox" name="image-select" tabindex="0" ></select>'
							)),
							this.$selectionBoxOptions.append(this.$imageSelectionBox);
						for (var r = 0; r < this.extension.helper.getTotalCanvases(); r++) {
							var u = this.extension.helper.getCanvasByIndex(r),
								l = a.UVUtils.sanitize(
									Manifesto.LanguageMap.getValue(u.getLabel(), this.extension.helper.options.locale)
								);
							this.$imageSelectionBox.append('<option value=' + r + '>' + l + '</option>');
						}
						this.$imageSelectionBox.change(function () {
							var e = parseInt(t.$imageSelectionBox.val());
							$.publish(o.Events.IMAGE_SEARCH, [e]);
						});
					}
					(this.$total = $('<span class="total"></span>')),
						this.$search.append(this.$total),
						(this.$searchButton = $(
							'<a class="go btn btn-primary" title="' +
								this.content.go +
								'" tabindex="0">' +
								this.content.go +
								'</a>'
						)),
						this.$search.append(this.$searchButton),
						(this.$nextOptions = $('<div class="nextOptions"></div>')),
						this.$centerOptions.append(this.$nextOptions),
						(this.$nextButton = $(
							'\n          <button class="btn imageBtn next" tabindex="0" title="' +
								this.content.next +
								'">\n            <i class="uv-icon-next" aria-hidden="true"></i><span>' +
								this.content.next +
								'</span>\n          </button>\n        '
						)),
						this.$nextOptions.append(this.$nextButton),
						(this.$lastButton = $(
							'\n          <button class="btn imageBtn last" tabindex="0" title="' +
								this.content.last +
								'">\n            <i class="uv-icon-last" aria-hidden="true"></i><span>' +
								this.content.last +
								'</span>\n          </button>\n        '
						)),
						this.$nextOptions.append(this.$lastButton),
						this.isPageModeEnabled()
							? (this.$pageModeOption.attr('checked', 'checked'),
							  this.$pageModeOption.removeAttr('disabled'),
							  this.$pageModeLabel.removeClass('disabled'))
							: (this.$imageModeOption.attr('checked', 'checked'),
							  this.$pageModeOption.attr('disabled', 'disabled'),
							  this.$pageModeLabel.addClass('disabled')),
						this.extension.helper.getManifestType().toString() ===
						manifesto.ManifestType.manuscript().toString()
							? this.$pageModeLabel.text(this.content.folio)
							: this.$pageModeLabel.text(this.content.page),
						(this.$galleryButton = $(
							'\n          <button class="btn imageBtn gallery" title="' +
								this.content.gallery +
								'" tabindex="0">\n            <i class="uv-icon-gallery" aria-hidden="true"></i>' +
								this.content.gallery +
								'\n          </button>\n        '
						)),
						this.$rightOptions.prepend(this.$galleryButton),
						(this.$pagingToggleButtons = $('<div class="pagingToggleButtons"></div>')),
						this.$rightOptions.prepend(this.$pagingToggleButtons),
						(this.$oneUpButton = $(
							'\n          <button class="btn imageBtn one-up" title="' +
								this.content.oneUp +
								'" tabindex="0">\n            <i class="uv-icon-one-up" aria-hidden="true"></i>' +
								this.content.oneUp +
								'\n          </button>'
						)),
						this.$pagingToggleButtons.append(this.$oneUpButton),
						(this.$twoUpButton = $(
							'\n          <button class="btn imageBtn two-up" title="' +
								this.content.twoUp +
								'" tabindex="0">\n            <i class="uv-icon-two-up" aria-hidden="true"></i>' +
								this.content.twoUp +
								'\n          </button>\n        '
						)),
						this.$pagingToggleButtons.append(this.$twoUpButton),
						this.updatePagingToggle(),
						this.updateGalleryButton(),
						this.$oneUpButton.onPressed(function () {
							var e = !1;
							t.updateSettings({ pagingEnabled: e }), $.publish(o.Events.PAGING_TOGGLED, [e]);
						}),
						this.$twoUpButton.onPressed(function () {
							var e = !0;
							t.updateSettings({ pagingEnabled: e }), $.publish(o.Events.PAGING_TOGGLED, [e]);
						}),
						this.$galleryButton.onPressed(function () {
							$.publish(i.BaseEvents.TOGGLE_EXPAND_LEFT_PANEL);
						}),
						this.setNavigationTitles(),
						this.setTotal();
					var c =
						this.extension.helper.getViewingDirection() || manifesto.ViewingDirection.leftToRight();
					1 === this.extension.helper.getTotalCanvases() && this.$centerOptions.hide(),
						this.$firstButton.onPressed(function () {
							switch (c.toString()) {
								case manifesto.ViewingDirection.leftToRight().toString():
								case manifesto.ViewingDirection.topToBottom().toString():
								case manifesto.ViewingDirection.bottomToTop().toString():
									$.publish(i.BaseEvents.FIRST);
									break;
								case manifesto.ViewingDirection.rightToLeft().toString():
									$.publish(i.BaseEvents.LAST);
							}
						}),
						this.$prevButton.onPressed(function () {
							switch (c.toString()) {
								case manifesto.ViewingDirection.leftToRight().toString():
								case manifesto.ViewingDirection.bottomToTop().toString():
								case manifesto.ViewingDirection.topToBottom().toString():
									$.publish(i.BaseEvents.PREV);
									break;
								case manifesto.ViewingDirection.rightToLeft().toString():
									$.publish(i.BaseEvents.NEXT);
							}
						}),
						this.$nextButton.onPressed(function () {
							switch (c.toString()) {
								case manifesto.ViewingDirection.leftToRight().toString():
								case manifesto.ViewingDirection.bottomToTop().toString():
								case manifesto.ViewingDirection.topToBottom().toString():
									$.publish(i.BaseEvents.NEXT);
									break;
								case manifesto.ViewingDirection.rightToLeft().toString():
									$.publish(i.BaseEvents.PREV);
							}
						}),
						this.$lastButton.onPressed(function () {
							switch (c.toString()) {
								case manifesto.ViewingDirection.leftToRight().toString():
								case manifesto.ViewingDirection.topToBottom().toString():
								case manifesto.ViewingDirection.bottomToTop().toString():
									$.publish(i.BaseEvents.LAST);
									break;
								case manifesto.ViewingDirection.rightToLeft().toString():
									$.publish(i.BaseEvents.FIRST);
							}
						}),
						this.config.options.pageModeEnabled
							? (this.$imageModeOption.on('click', function (e) {
									$.publish(o.Events.MODE_CHANGED, [s.Mode.image.toString()]);
							  }),
							  this.$pageModeOption.on('click', function (e) {
									$.publish(o.Events.MODE_CHANGED, [s.Mode.page.toString()]);
							  }))
							: (this.$imageModeOption.hide(),
							  this.$pageModeLabel.hide(),
							  this.$pageModeOption.hide()),
						this.$searchText.onEnter(function () {
							t.$searchText.blur(), t.search(t.$searchText.val());
						}),
						this.$searchText.click(function () {
							$(this).select();
						}),
						this.$searchButton.onPressed(function () {
							t.options.autoCompleteBoxEnabled
								? t.search(t.$autoCompleteBox.val())
								: t.search(t.$searchText.val());
						}),
						this.options.modeOptionsEnabled === !1 &&
							(this.$modeOptions.hide(), this.$centerOptions.addClass('modeOptionsDisabled')),
						this.options.imageSelectionBoxEnabled === !0 &&
							this.options.autoCompleteBoxEnabled !== !0 &&
							this.$search.hide(),
						this.options.helpEnabled === !1 && this.$helpButton.hide(),
						Utils.Bools.getBool(this.options.pagingToggleEnabled, !0) ||
							this.$pagingToggleButtons.hide();
				}),
				(t.prototype.openGallery = function () {
					this.$oneUpButton.removeClass('on'),
						this.$twoUpButton.removeClass('on'),
						this.$galleryButton.addClass('on');
				}),
				(t.prototype.closeGallery = function () {
					this.updatePagingToggle(), this.$galleryButton.removeClass('on');
				}),
				(t.prototype.isPageModeEnabled = function () {
					return (
						this.config.options.pageModeEnabled &&
						this.extension.getMode().toString() === s.Mode.page.toString()
					);
				}),
				(t.prototype.setNavigationTitles = function () {
					this.isPageModeEnabled()
						? this.extension.helper.isRightToLeft()
							? (this.$firstButton.prop('title', this.content.lastPage),
							  this.$firstButton.find('span').text(this.content.lastPage),
							  this.$prevButton.prop('title', this.content.nextPage),
							  this.$prevButton.find('span').text(this.content.nextPage),
							  this.$nextButton.prop('title', this.content.previousPage),
							  this.$nextButton.find('span').text(this.content.previousPage),
							  this.$lastButton.prop('title', this.content.firstPage),
							  this.$lastButton.find('span').text(this.content.firstPage))
							: (this.$firstButton.prop('title', this.content.firstPage),
							  this.$firstButton.find('span').text(this.content.firstPage),
							  this.$prevButton.prop('title', this.content.previousPage),
							  this.$prevButton.find('span').text(this.content.previousPage),
							  this.$nextButton.prop('title', this.content.nextPage),
							  this.$nextButton.find('span').text(this.content.nextPage),
							  this.$lastButton.prop('title', this.content.lastPage),
							  this.$lastButton.find('span').text(this.content.lastPage))
						: this.extension.helper.isRightToLeft()
						? (this.$firstButton.prop('title', this.content.lastImage),
						  this.$firstButton.find('span').text(this.content.lastPage),
						  this.$prevButton.prop('title', this.content.nextImage),
						  this.$prevButton.find('span').text(this.content.nextImage),
						  this.$nextButton.prop('title', this.content.previousImage),
						  this.$nextButton.find('span').text(this.content.previousImage),
						  this.$lastButton.prop('title', this.content.firstImage),
						  this.$lastButton.find('span').text(this.content.firstImage))
						: (this.$firstButton.prop('title', this.content.firstImage),
						  this.$firstButton.find('span').text(this.content.firstImage),
						  this.$prevButton.prop('title', this.content.previousImage),
						  this.$prevButton.find('span').text(this.content.previousImage),
						  this.$nextButton.prop('title', this.content.nextImage),
						  this.$nextButton.find('span').text(this.content.nextImage),
						  this.$lastButton.prop('title', this.content.lastImage),
						  this.$lastButton.find('span').text(this.content.lastImage));
				}),
				(t.prototype.updatePagingToggle = function () {
					return this.pagingToggleIsVisible()
						? void (this.extension.isPagingSettingEnabled()
								? (this.$oneUpButton.removeClass('on'), this.$twoUpButton.addClass('on'))
								: (this.$twoUpButton.removeClass('on'), this.$oneUpButton.addClass('on')))
						: void this.$pagingToggleButtons.hide();
				}),
				(t.prototype.pagingToggleIsVisible = function () {
					return (
						Utils.Bools.getBool(this.options.pagingToggleEnabled, !0) &&
						this.extension.helper.isPagingAvailable()
					);
				}),
				(t.prototype.updateGalleryButton = function () {
					this.galleryIsVisible() || this.$galleryButton.hide();
				}),
				(t.prototype.galleryIsVisible = function () {
					return (
						Utils.Bools.getBool(this.options.galleryButtonEnabled, !0) &&
						this.extension.isLeftPanelEnabled()
					);
				}),
				(t.prototype.setTotal = function () {
					var e = this.content.of;
					this.isPageModeEnabled()
						? this.$total.html(
								Utils.Strings.format(e, this.extension.helper.getLastCanvasLabel(!0))
						  )
						: this.$total.html(
								Utils.Strings.format(e, this.extension.helper.getTotalCanvases().toString())
						  );
				}),
				(t.prototype.setSearchFieldValue = function (e) {
					var t = this.extension.helper.getCanvasByIndex(e),
						n = null;
					if (this.isPageModeEnabled()) {
						var i = Manifesto.LanguageMap.getValue(t.getLabel());
						n = '-' === i ? '' : i;
					} else (e += 1), (n = e.toString());
					this.options.autoCompleteBoxEnabled
						? this.$autoCompleteBox.val(n)
						: this.$searchText.val(n);
				}),
				(t.prototype.search = function (e) {
					if (!e)
						return (
							this.extension.showMessage(this.content.emptyValue),
							void $.publish(i.BaseEvents.CANVAS_INDEX_CHANGE_FAILED)
						);
					if (this.isPageModeEnabled()) $.publish(o.Events.PAGE_SEARCH, [e]);
					else {
						var t = void 0;
						if (
							((t = this.options.autoCompleteBoxEnabled
								? parseInt(this.$autoCompleteBox.val(), 10)
								: parseInt(this.$searchText.val(), 10)),
							(t -= 1),
							isNaN(t))
						)
							return (
								this.extension.showMessage(
									this.extension.data.config.modules.genericDialogue.content.invalidNumber
								),
								void $.publish(i.BaseEvents.CANVAS_INDEX_CHANGE_FAILED)
							);
						var n = this.extension.helper.getCanvasByIndex(t);
						if (!n)
							return (
								this.extension.showMessage(
									this.extension.data.config.modules.genericDialogue.content.pageNotFound
								),
								void $.publish(i.BaseEvents.CANVAS_INDEX_CHANGE_FAILED)
							);
						$.publish(o.Events.IMAGE_SEARCH, [t]);
					}
				}),
				(t.prototype.canvasIndexChanged = function (e) {
					this.setSearchFieldValue(e),
						this.options.imageSelectionBoxEnabled === !0 &&
							this.options.autoCompleteBoxEnabled !== !0 &&
							this.$imageSelectionBox.val(e);
					var t =
						this.extension.helper.getViewingDirection() || manifesto.ViewingDirection.leftToRight();
					t.toString() === manifesto.ViewingDirection.rightToLeft().toString()
						? (this.extension.helper.isFirstCanvas()
								? (this.disableLastButton(), this.disableNextButton())
								: (this.enableLastButton(), this.enableNextButton()),
						  this.extension.helper.isLastCanvas()
								? (this.disableFirstButton(), this.disablePrevButton())
								: (this.enableFirstButton(), this.enablePrevButton()))
						: (this.extension.helper.isFirstCanvas()
								? (this.disableFirstButton(), this.disablePrevButton())
								: (this.enableFirstButton(), this.enablePrevButton()),
						  this.extension.helper.isLastCanvas()
								? (this.disableLastButton(), this.disableNextButton())
								: (this.enableLastButton(), this.enableNextButton()));
				}),
				(t.prototype.disableFirstButton = function () {
					(this.firstButtonEnabled = !1), this.$firstButton.disable();
				}),
				(t.prototype.enableFirstButton = function () {
					(this.firstButtonEnabled = !0), this.$firstButton.enable();
				}),
				(t.prototype.disableLastButton = function () {
					(this.lastButtonEnabled = !1), this.$lastButton.disable();
				}),
				(t.prototype.enableLastButton = function () {
					(this.lastButtonEnabled = !0), this.$lastButton.enable();
				}),
				(t.prototype.disablePrevButton = function () {
					(this.prevButtonEnabled = !1), this.$prevButton.disable();
				}),
				(t.prototype.enablePrevButton = function () {
					(this.prevButtonEnabled = !0), this.$prevButton.enable();
				}),
				(t.prototype.disableNextButton = function () {
					(this.nextButtonEnabled = !1), this.$nextButton.disable();
				}),
				(t.prototype.enableNextButton = function () {
					(this.nextButtonEnabled = !0), this.$nextButton.enable();
				}),
				(t.prototype.modeChanged = function () {
					this.setSearchFieldValue(this.extension.helper.canvasIndex),
						this.setNavigationTitles(),
						this.setTotal();
				}),
				(t.prototype.resize = function () {
					e.prototype.resize.call(this),
						this.extension.width() < this.extension.data.config.options.minWidthBreakPoint
							? (this.pagingToggleIsVisible() && this.$pagingToggleButtons.hide(),
							  this.galleryIsVisible() && this.$galleryButton.hide())
							: (this.pagingToggleIsVisible() && this.$pagingToggleButtons.show(),
							  this.galleryIsVisible() && this.$galleryButton.show());
				}),
				t
			);
		})(r.HeaderPanel);
		t.PagingHeaderPanel = u;
	}
),
	define('extensions/uv-seadragon-extension/Bounds', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e(e, t, n, i) {
				(this.x = e), (this.y = t), (this.w = n), (this.h = i);
			}
			return (
				(e.prototype.toString = function () {
					return this.x + ',' + this.y + ',' + this.w + ',' + this.h;
				}),
				(e.fromString = function (t) {
					var n = t.split(',');
					return new e(Number(n[0]), Number(n[1]), Number(n[2]), Number(n[3]));
				}),
				e
			);
		})();
		t.Bounds = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-seadragoncenterpanel-module/SeadragonCenterPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../../extensions/uv-seadragon-extension/Bounds',
	'../uv-shared-module/CenterPanel',
	'../../extensions/uv-seadragon-extension/Events',
	'../../Utils'
], function (e, t, n, i, o, r, s) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var a = (function (e) {
		function t(t) {
			var n = e.call(this, t) || this;
			return (
				(n.controlsVisible = !1),
				(n.isCreated = !1),
				(n.isFirstLoad = !0),
				(n.navigatedFromSearch = !1),
				(n.nextButtonEnabled = !1),
				(n.prevButtonEnabled = !1),
				n
			);
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('seadragonCenterPanel'),
					e.prototype.create.call(this),
					(this.$viewer = $('<div id="viewer"></div>')),
					this.$content.prepend(this.$viewer),
					$.subscribe(n.BaseEvents.ANNOTATIONS, function (e, n) {
						t.overlayAnnotations(), t.zoomToInitialAnnotation();
					}),
					$.subscribe(n.BaseEvents.SETTINGS_CHANGED, function (e, n) {
						t.viewer.gestureSettingsMouse.clickToZoom = n.clickToZoomEnabled;
					}),
					$.subscribe(n.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, n) {
						t.whenResized(function () {
							t.isCreated || t.createUI(), t.openMedia(n);
						});
					}),
					$.subscribe(n.BaseEvents.CLEAR_ANNOTATIONS, function () {
						t.whenCreated(function () {
							(t.extension.currentAnnotationRect = null), t.clearAnnotations();
						});
					}),
					$.subscribe(r.Events.NEXT_SEARCH_RESULT, function () {
						t.whenCreated(function () {
							t.nextAnnotation();
						});
					}),
					$.subscribe(r.Events.PREV_SEARCH_RESULT, function () {
						t.whenCreated(function () {
							t.prevAnnotation();
						});
					}),
					$.subscribe(r.Events.ZOOM_IN, function () {
						t.whenCreated(function () {
							t.zoomIn();
						});
					}),
					$.subscribe(r.Events.ZOOM_OUT, function () {
						t.whenCreated(function () {
							t.zoomOut();
						});
					}),
					$.subscribe(r.Events.ROTATE, function () {
						t.whenCreated(function () {
							t.rotateRight();
						});
					}),
					$.subscribe(n.BaseEvents.METRIC_CHANGED, function () {
						t.whenCreated(function () {
							t.updateResponsiveView();
						});
					});
			}),
			(t.prototype.whenCreated = function (e) {
				var t = this;
				Utils.Async.waitFor(function () {
					return t.isCreated;
				}, e);
			}),
			(t.prototype.zoomIn = function () {
				this.viewer.viewport.zoomTo(2 * this.viewer.viewport.getZoom(!0));
			}),
			(t.prototype.zoomOut = function () {
				this.viewer.viewport.zoomTo(0.5 * this.viewer.viewport.getZoom(!0));
			}),
			(t.prototype.rotateRight = function () {
				this.viewer.viewport.setRotation(this.viewer.viewport.getRotation() + 90);
			}),
			(t.prototype.updateResponsiveView = function () {
				this.setNavigatorVisible(),
					this.extension.isDesktopMetric()
						? ((this.viewer.autoHideControls = !0), this.$viewportNavButtons.show())
						: ((this.viewer.autoHideControls = !1), this.$viewportNavButtons.hide());
			}),
			(t.prototype.createUI = function () {
				var e = this;
				(this.$spinner = $('<div class="spinner"></div>')),
					this.$content.append(this.$spinner),
					(window.openSeadragonViewer = this.viewer =
						OpenSeadragon({
							id: 'viewer',
							ajaxWithCredentials: !1,
							showNavigationControl: !0,
							showNavigator: !0,
							showRotationControl: !0,
							showHomeControl: Utils.Bools.getBool(this.config.options.showHomeControl, !1),
							showFullPageControl: !1,
							defaultZoomLevel: this.config.options.defaultZoomLevel || 0,
							maxZoomPixelRatio: this.config.options.maxZoomPixelRatio || 2,
							controlsFadeDelay: this.config.options.controlsFadeDelay || 250,
							controlsFadeLength: this.config.options.controlsFadeLength || 250,
							navigatorPosition: this.config.options.navigatorPosition || 'BOTTOM_RIGHT',
							animationTime: this.config.options.animationTime || 1.2,
							visibilityRatio: this.config.options.visibilityRatio || 0.5,
							constrainDuringPan: Utils.Bools.getBool(this.config.options.constrainDuringPan, !1),
							immediateRender: Utils.Bools.getBool(this.config.options.immediateRender, !1),
							blendTime: this.config.options.blendTime || 0,
							autoHideControls: Utils.Bools.getBool(this.config.options.autoHideControls, !0),
							prefixUrl: this.extension.data.root + '/img/',
							gestureSettingsMouse: {
								clickToZoom: Utils.Bools.getBool(
									this.extension.data.config.options.clickToZoomEnabled,
									!0
								)
							},
							navImages: {
								zoomIn: {
									REST: 'pixel.gif',
									GROUP: 'pixel.gif',
									HOVER: 'pixel.gif',
									DOWN: 'pixel.gif'
								},
								zoomOut: {
									REST: 'pixel.gif',
									GROUP: 'pixel.gif',
									HOVER: 'pixel.gif',
									DOWN: 'pixel.gif'
								},
								home: {
									REST: 'pixel.gif',
									GROUP: 'pixel.gif',
									HOVER: 'pixel.gif',
									DOWN: 'pixel.gif'
								},
								rotateright: {
									REST: 'pixel.gif',
									GROUP: 'pixel.gif',
									HOVER: 'pixel.gif',
									DOWN: 'pixel.gif'
								},
								rotateleft: {
									REST: 'pixel.gif',
									GROUP: 'pixel.gif',
									HOVER: 'pixel.gif',
									DOWN: 'pixel.gif'
								},
								next: {
									REST: 'pixel.gif',
									GROUP: 'pixel.gif',
									HOVER: 'pixel.gif',
									DOWN: 'pixel.gif'
								},
								previous: {
									REST: 'pixel.gif',
									GROUP: 'pixel.gif',
									HOVER: 'pixel.gif',
									DOWN: 'pixel.gif'
								}
							}
						})),
					(this.$zoomInButton = this.$viewer.find('div[title="Zoom in"]')),
					this.$zoomInButton.attr('tabindex', 0),
					this.$zoomInButton.prop('title', this.content.zoomIn),
					this.$zoomInButton.addClass('zoomIn viewportNavButton'),
					(this.$zoomOutButton = this.$viewer.find('div[title="Zoom out"]')),
					this.$zoomOutButton.attr('tabindex', 0),
					this.$zoomOutButton.prop('title', this.content.zoomOut),
					this.$zoomOutButton.addClass('zoomOut viewportNavButton'),
					(this.$goHomeButton = this.$viewer.find('div[title="Go home"]')),
					this.$goHomeButton.attr('tabindex', 0),
					this.$goHomeButton.prop('title', this.content.goHome),
					this.$goHomeButton.addClass('goHome viewportNavButton'),
					(this.$rotateButton = this.$viewer.find('div[title="Rotate right"]')),
					this.$rotateButton.attr('tabindex', 0),
					this.$rotateButton.prop('title', this.content.rotateRight),
					this.$rotateButton.addClass('rotate viewportNavButton'),
					(this.$viewportNavButtonsContainer = this.$viewer.find(
						'.openseadragon-container > div:not(.openseadragon-canvas):first'
					)),
					(this.$viewportNavButtons = this.$viewportNavButtonsContainer.find('.viewportNavButton')),
					(this.$canvas = $(this.viewer.canvas)),
					this.$canvas.on('contextmenu', function () {
						return !1;
					}),
					(this.$navigator = this.$viewer.find('.navigator')),
					this.setNavigatorVisible(),
					this.$element.on('mousemove', function () {
						e.controlsVisible || ((e.controlsVisible = !0), e.viewer.setControlsEnabled(!0));
					}),
					this.$element.on('mouseleave', function () {
						e.controlsVisible && ((e.controlsVisible = !1), e.viewer.setControlsEnabled(!1));
					}),
					this.$element.on(
						'mousemove',
						function () {
							if (
								!e.$prevButton.ismouseover() &&
								!e.$nextButton.ismouseover() &&
								!e.$viewer.find('.navigator').ismouseover()
							) {
								if (!e.controlsVisible) return;
								(e.controlsVisible = !1), e.viewer.setControlsEnabled(!1);
							}
						},
						this.config.options.controlsFadeAfterInactive
					),
					this.viewer.addHandler('tile-drawn', function () {
						e.$spinner.hide();
					}),
					this.viewer.addHandler('resize', function (t) {
						$.publish(r.Events.SEADRAGON_RESIZE, [t]), e.viewerResize(t);
					}),
					this.viewer.addHandler('animation-start', function (e) {
						$.publish(r.Events.SEADRAGON_ANIMATION_START, [e]);
					}),
					this.viewer.addHandler('animation', function (e) {
						$.publish(r.Events.SEADRAGON_ANIMATION, [e]);
					}),
					this.viewer.addHandler('animation-finish', function (t) {
						(e.currentBounds = e.getViewportBounds()),
							e.updateVisibleAnnotationRects(),
							$.publish(r.Events.SEADRAGON_ANIMATION_FINISH, [t]);
					}),
					this.viewer.addHandler('rotate', function (e) {
						$.publish(r.Events.SEADRAGON_ROTATION, [e.degrees]);
					}),
					(this.title = this.extension.helper.getLabel()),
					this.createNavigationButtons(),
					this.hidePrevButton(),
					this.hideNextButton(),
					(this.isCreated = !0),
					this.resize();
			}),
			(t.prototype.createNavigationButtons = function () {
				var e = this,
					t =
						this.extension.helper.getViewingDirection() || manifesto.ViewingDirection.leftToRight();
				switch (
					((this.$prevButton = $('<div class="paging btn prev" tabindex="0"></div>')),
					this.extension.helper.isRightToLeft()
						? this.$prevButton.prop('title', this.content.next)
						: this.$prevButton.prop('title', this.content.previous),
					(this.$nextButton = $('<div class="paging btn next" tabindex="0"></div>')),
					this.extension.helper.isRightToLeft()
						? this.$nextButton.prop('title', this.content.previous)
						: this.$nextButton.prop('title', this.content.next),
					this.viewer.addControl(this.$prevButton[0], {
						anchor: OpenSeadragon.ControlAnchor.TOP_LEFT
					}),
					this.viewer.addControl(this.$nextButton[0], {
						anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT
					}),
					t.toString())
				) {
					case manifesto.ViewingDirection.bottomToTop().toString():
					case manifesto.ViewingDirection.topToBottom().toString():
						this.$prevButton.addClass('vertical'), this.$nextButton.addClass('vertical');
				}
				var i = this;
				this.$prevButton.onPressed(function (e) {
					if ((e.preventDefault(), OpenSeadragon.cancelEvent(e), i.prevButtonEnabled))
						switch (t.toString()) {
							case manifesto.ViewingDirection.leftToRight().toString():
							case manifesto.ViewingDirection.bottomToTop().toString():
							case manifesto.ViewingDirection.topToBottom().toString():
								$.publish(n.BaseEvents.PREV);
								break;
							case manifesto.ViewingDirection.rightToLeft().toString():
								$.publish(n.BaseEvents.NEXT);
						}
				}),
					this.$nextButton.onPressed(function (e) {
						if ((e.preventDefault(), OpenSeadragon.cancelEvent(e), i.nextButtonEnabled))
							switch (t.toString()) {
								case manifesto.ViewingDirection.leftToRight().toString():
								case manifesto.ViewingDirection.bottomToTop().toString():
								case manifesto.ViewingDirection.topToBottom().toString():
									$.publish(n.BaseEvents.NEXT);
									break;
								case manifesto.ViewingDirection.rightToLeft().toString():
									$.publish(n.BaseEvents.PREV);
							}
					}),
					this.$prevButton.on('focus', function () {
						e.controlsVisible || ((e.controlsVisible = !0), e.viewer.setControlsEnabled(!0));
					}),
					this.$nextButton.on('focus', function () {
						e.controlsVisible || ((e.controlsVisible = !0), e.viewer.setControlsEnabled(!0));
					});
			}),
			(t.prototype.openMedia = function (e) {
				var t = this;
				this.$spinner.show(),
					(this.items = []),
					this.extension.getExternalResources(e).then(function (e) {
						t.viewer.close(), (e = t.getPagePositions(e));
						for (var n = 0; n < e.length; n++) {
							var i = e[n],
								o = void 0;
							(o = i.hasServiceDescriptor ? i : { type: 'image', url: i.id, buildPyramid: !1 }),
								t.viewer.addTiledImage({
									tileSource: o,
									x: i.x,
									y: i.y,
									width: i.width,
									success: function (n) {
										t.items.push(n),
											t.items.length === e.length && t.openPagesHandler(),
											t.resize();
									}
								});
						}
					});
			}),
			(t.prototype.getPagePositions = function (e) {
				var t, n, i, o, r, s;
				if (e.length > 1)
					if (2 === e.length)
						this.extension.helper.isVerticallyAligned()
							? ((i = e[0]), (i.y = 0), (o = e[1]), (o.y = i.height + this.config.options.pageGap))
							: ((t = e[0]), (t.x = 0), (n = e[1]), (n.x = t.width + this.config.options.pageGap));
					else if (this.extension.helper.isVerticallyAligned())
						if (this.extension.helper.isTopToBottom())
							for (var a = 0; a < e.length - 1; a++)
								(r = e[a]), (s = e[a + 1]), (s.y = (r.y || 0) + r.height);
						else
							for (var a = e.length; a > 0; a--)
								(r = e[a]), (s = e[a - 1]), (s.y = (r.y || 0) - r.height);
					else if (this.extension.helper.isLeftToRight())
						for (var a = 0; a < e.length - 1; a++)
							(r = e[a]), (s = e[a + 1]), (s.x = (r.x || 0) + r.width);
					else
						for (var a = e.length - 1; a > 0; a--)
							(r = e[a]), (s = e[a - 1]), (s.x = (r.x || 0) - r.width);
				return e;
			}),
			(t.prototype.openPagesHandler = function () {
				if (
					($.publish(r.Events.SEADRAGON_OPEN),
					this.extension.helper.isMultiCanvas() && !this.extension.helper.isContinuous())
				) {
					this.showPrevButton(), this.showNextButton(), $('.navigator').addClass('extraMargin');
					var e =
						this.extension.helper.getViewingDirection() || manifesto.ViewingDirection.leftToRight();
					e.toString() === manifesto.ViewingDirection.rightToLeft().toString()
						? (this.extension.helper.isFirstCanvas()
								? this.disableNextButton()
								: this.enableNextButton(),
						  this.extension.helper.isLastCanvas()
								? this.disablePrevButton()
								: this.enablePrevButton())
						: (this.extension.helper.isFirstCanvas()
								? this.disablePrevButton()
								: this.enablePrevButton(),
						  this.extension.helper.isLastCanvas()
								? this.disableNextButton()
								: this.enableNextButton());
				}
				this.setNavigatorVisible(),
					this.overlayAnnotations(),
					this.updateBounds(),
					this.navigatedFromSearch &&
						((this.navigatedFromSearch = !1), this.zoomToInitialAnnotation()),
					(this.isFirstLoad = !1);
			}),
			(t.prototype.zoomToInitialAnnotation = function () {
				var e = this.getInitialAnnotationRect();
				(this.extension.previousAnnotationRect = null),
					(this.extension.currentAnnotationRect = null),
					e && this.isZoomToSearchResultEnabled() && this.zoomToAnnotation(e);
			}),
			(t.prototype.overlayAnnotations = function () {
				for (var e = this.getAnnotationsForCurrentImages(), t = 0; t < e.length; t++)
					for (var n = e[t], i = this.getAnnotationOverlayRects(n), o = 0; o < i.length; o++) {
						var r = i[o],
							a = document.createElement('div');
						(a.id = 'searchResult-' + r.canvasIndex + '-' + r.resultIndex),
							(a.className = 'searchOverlay'),
							(a.title = s.UVUtils.sanitize(r.chars)),
							this.viewer.addOverlay(a, r);
					}
			}),
			(t.prototype.updateBounds = function () {
				var e = this.extension.getSettings();
				this.isFirstLoad
					? ((this.initialRotation = this.extension.data.rotation),
					  this.initialRotation &&
							this.viewer.viewport.setRotation(parseInt(this.initialRotation)),
					  (this.initialBounds = this.extension.data.xywh),
					  this.initialBounds &&
							((this.initialBounds = i.Bounds.fromString(this.initialBounds)),
							(this.currentBounds = this.initialBounds),
							this.fitToBounds(this.currentBounds)))
					: e.preserveViewport
					? this.fitToBounds(this.currentBounds)
					: this.goHome();
			}),
			(t.prototype.goHome = function () {
				this.viewer.viewport.goHome(!0);
			}),
			(t.prototype.disablePrevButton = function () {
				(this.prevButtonEnabled = !1), this.$prevButton.addClass('disabled');
			}),
			(t.prototype.enablePrevButton = function () {
				(this.prevButtonEnabled = !0), this.$prevButton.removeClass('disabled');
			}),
			(t.prototype.hidePrevButton = function () {
				this.disablePrevButton(), this.$prevButton.hide();
			}),
			(t.prototype.showPrevButton = function () {
				this.enablePrevButton(), this.$prevButton.show();
			}),
			(t.prototype.disableNextButton = function () {
				(this.nextButtonEnabled = !1), this.$nextButton.addClass('disabled');
			}),
			(t.prototype.enableNextButton = function () {
				(this.nextButtonEnabled = !0), this.$nextButton.removeClass('disabled');
			}),
			(t.prototype.hideNextButton = function () {
				this.disableNextButton(), this.$nextButton.hide();
			}),
			(t.prototype.showNextButton = function () {
				this.enableNextButton(), this.$nextButton.show();
			}),
			(t.prototype.fitToBounds = function (e, t) {
				void 0 === t && (t = !0);
				var n = new OpenSeadragon.Rect();
				(n.x = Number(e.x)),
					(n.y = Number(e.y)),
					(n.width = Number(e.w)),
					(n.height = Number(e.h)),
					this.viewer.viewport.fitBoundsWithConstraints(n, t);
			}),
			(t.prototype.getCroppedImageBounds = function () {
				if (!this.viewer || !this.viewer.viewport) return null;
				var e = this.extension.helper.getCurrentCanvas(),
					t = this.extension.getCroppedImageDimensions(e, this.viewer);
				if (t) {
					var n = new i.Bounds(t.regionPos.x, t.regionPos.y, t.region.width, t.region.height);
					return n.toString();
				}
				return null;
			}),
			(t.prototype.getViewportBounds = function () {
				if (!this.viewer || !this.viewer.viewport) return null;
				var e = this.viewer.viewport.getBounds(!0),
					t = new i.Bounds(
						Math.floor(e.x),
						Math.floor(e.y),
						Math.floor(e.width),
						Math.floor(e.height)
					);
				return t;
			}),
			(t.prototype.viewerResize = function (e) {
				if (e.viewport) {
					var t = e.viewport.getCenter(!0);
					t &&
						setTimeout(function () {
							e.viewport.panTo(t, !0);
						}, 1);
				}
			}),
			(t.prototype.clearAnnotations = function () {
				this.$canvas.find('.searchOverlay').hide();
			}),
			(t.prototype.getAnnotationsForCurrentImages = function () {
				var e = [],
					t = this.extension.annotations;
				if (!t || !t.length) return e;
				for (var n = this.extension.getPagedIndices(), i = 0; i < n.length; i++)
					for (var o = n[i], r = 0; r < t.length; r++)
						if (t[r].canvasIndex === o) {
							e.push(t[r]);
							break;
						}
				return e;
			}),
			(t.prototype.getAnnotationRectsForCurrentImages = function () {
				var e = this.getAnnotationsForCurrentImages();
				return e
					.en()
					.selectMany(function (e) {
						return e.rects;
					})
					.toArray();
			}),
			(t.prototype.updateVisibleAnnotationRects = function () {
				for (var e = this.getAnnotationRectsForCurrentImages(), t = 0; t < e.length; t++) {
					var n = e[t],
						i = this.viewer.viewport.getBounds();
					n.isVisible = Utils.Dimensions.hitRect(
						i.x,
						i.y,
						i.width,
						i.height,
						n.viewportX,
						n.viewportY
					);
				}
			}),
			(t.prototype.getAnnotationRectIndex = function (e) {
				var t = this.getAnnotationRectsForCurrentImages();
				return t.indexOf(e);
			}),
			(t.prototype.isZoomToSearchResultEnabled = function () {
				return Utils.Bools.getBool(
					this.extension.data.config.options.zoomToSearchResultEnabled,
					!0
				);
			}),
			(t.prototype.prevAnnotation = function () {
				for (
					var e = this.getAnnotationRectsForCurrentImages(),
						t = this.extension.currentAnnotationRect,
						i = t ? this.getAnnotationRectIndex(t) : e.length,
						o = null,
						s = i - 1;
					s >= 0;
					s--
				) {
					var a = e[s];
					o = a;
					break;
				}
				o && this.isZoomToSearchResultEnabled()
					? o.canvasIndex < this.extension.helper.canvasIndex
						? ((this.extension.currentAnnotationRect = o),
						  (this.navigatedFromSearch = !0),
						  $.publish(n.BaseEvents.ANNOTATION_CANVAS_CHANGED, [o]))
						: this.zoomToAnnotation(o)
					: ((this.navigatedFromSearch = !0),
					  $.publish(r.Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE));
			}),
			(t.prototype.nextAnnotation = function () {
				for (
					var e = this.getAnnotationRectsForCurrentImages(),
						t = this.extension.currentAnnotationRect,
						i = t ? this.getAnnotationRectIndex(t) : -1,
						o = null,
						s = i + 1;
					s < e.length;
					s++
				) {
					var a = e[s];
					o = a;
					break;
				}
				o && this.isZoomToSearchResultEnabled()
					? o.canvasIndex > this.extension.helper.canvasIndex
						? ((this.extension.currentAnnotationRect = o),
						  (this.navigatedFromSearch = !0),
						  $.publish(n.BaseEvents.ANNOTATION_CANVAS_CHANGED, [o]))
						: this.zoomToAnnotation(o)
					: ((this.navigatedFromSearch = !0),
					  $.publish(r.Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE));
			}),
			(t.prototype.getAnnotationRectByIndex = function (e) {
				var t = this.getAnnotationRectsForCurrentImages();
				return t.length ? t[e] : null;
			}),
			(t.prototype.getInitialAnnotationRect = function () {
				var e = this,
					t = this.getAnnotationRectsForCurrentImages();
				if (!t.length) return null;
				var n = this.extension.previousAnnotationRect;
				return !n && this.extension.lastCanvasIndex > this.extension.helper.canvasIndex
					? t
							.en()
							.where(function (t) {
								return t.canvasIndex === e.extension.helper.canvasIndex;
							})
							.last()
					: t
							.en()
							.where(function (t) {
								return t.canvasIndex === e.extension.helper.canvasIndex;
							})
							.first();
			}),
			(t.prototype.zoomToAnnotation = function (e) {
				if (
					((this.extension.previousAnnotationRect = this.extension.currentAnnotationRect || e),
					(this.extension.currentAnnotationRect = e),
					Utils.Bools.getBool(this.config.options.zoomToBoundsEnabled, !1))
				)
					this.fitToBounds(new i.Bounds(e.viewportX, e.viewportY, e.width, e.height), !1);
				else {
					var t = e.viewportX - (0.5 * this.currentBounds.w - 0.5 * e.width),
						o = e.viewportY - (0.5 * this.currentBounds.h - 0.5 * e.height),
						r = this.currentBounds.w,
						s = this.currentBounds.h,
						a = new i.Bounds(t, o, r, s);
					this.fitToBounds(a);
				}
				this.highlightAnnotationRect(e), $.publish(n.BaseEvents.ANNOTATION_CHANGED);
			}),
			(t.prototype.highlightAnnotationRect = function (e) {
				var t = $('#searchResult-' + e.canvasIndex + '-' + e.index);
				t.addClass('current'), $('.searchOverlay').not(t).removeClass('current');
			}),
			(t.prototype.getAnnotationOverlayRects = function (e) {
				var t = [];
				if (!this.extension.resources) return t;
				var n = this.extension.resources
						.en()
						.where(function (t) {
							return t.index === e.canvasIndex;
						})
						.first(),
					i = this.extension.resources.indexOf(n),
					o = 0;
				i > 0 && (o = this.extension.resources[i - 1].width);
				for (var r = 0; r < e.rects.length; r++) {
					var s = e.rects[r],
						a = s.x + o + (i > 0 ? this.config.options.pageGap : 0),
						u = s.y,
						l = s.width,
						c = s.height,
						h = new OpenSeadragon.Rect(a, u, l, c);
					(s.viewportX = a),
						(s.viewportY = u),
						(h.canvasIndex = s.canvasIndex),
						(h.resultIndex = s.index),
						(h.chars = s.chars),
						t.push(h);
				}
				return t;
			}),
			(t.prototype.resize = function () {
				var t = this;
				if (
					(e.prototype.resize.call(this),
					this.$viewer.height(this.$content.height() - this.$viewer.verticalMargins()),
					this.$viewer.width(this.$content.width() - this.$viewer.horizontalMargins()),
					this.isCreated)
				) {
					this.title && this.$title.ellipsisFill(s.UVUtils.sanitize(this.title)),
						this.$spinner.css('top', this.$content.height() / 2 - this.$spinner.height() / 2),
						this.$spinner.css('left', this.$content.width() / 2 - this.$spinner.width() / 2);
					var n =
						this.extension.helper.getViewingDirection() || manifesto.ViewingDirection.leftToRight();
					if (this.extension.helper.isMultiCanvas() && this.$prevButton && this.$nextButton) {
						var i = Math.floor(this.$content.width() / 2);
						switch (n.toString()) {
							case manifesto.ViewingDirection.bottomToTop().toString():
								this.$prevButton.addClass('down'),
									this.$nextButton.addClass('up'),
									this.$prevButton.css('left', i - this.$prevButton.outerWidth() / 2),
									this.$prevButton.css('top', this.$content.height() - this.$prevButton.height()),
									this.$nextButton.css('left', -1 * i - this.$nextButton.outerWidth() / 2);
								break;
							case manifesto.ViewingDirection.topToBottom().toString():
								this.$prevButton.css('left', i - this.$prevButton.outerWidth() / 2),
									this.$nextButton.css('left', -1 * i - this.$nextButton.outerWidth() / 2),
									this.$nextButton.css('top', this.$content.height() - this.$nextButton.height());
								break;
							default:
								this.$prevButton.css(
									'top',
									(this.$content.height() - this.$prevButton.height()) / 2
								),
									this.$nextButton.css(
										'top',
										(this.$content.height() - this.$nextButton.height()) / 2
									);
						}
					}
					setTimeout(function () {
						if (t.extension.helper.isContinuous())
							if (t.extension.helper.isHorizontallyAligned()) {
								var e = t.$viewer.width() - t.$viewer.rightMargin();
								t.$navigator.width(e);
							} else t.$navigator.height(t.$viewer.height());
					}, 100);
				}
			}),
			(t.prototype.setFocus = function () {
				this.$canvas.is(':focus') ||
					(this.extension.data.config.options.allowStealFocus && this.$canvas.focus());
			}),
			(t.prototype.setNavigatorVisible = function () {
				var e =
					Utils.Bools.getBool(this.extension.getSettings().navigatorEnabled, !0) &&
					this.extension.isDesktopMetric();
				this.viewer.navigator.setVisible(e), e ? this.$navigator.show() : this.$navigator.hide();
			}),
			t
		);
	})(o.CenterPanel);
	t.SeadragonCenterPanel = a;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-seadragon-extension/SettingsDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/SettingsDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('settingsDialogue'),
					e.prototype.create.call(this),
					(this.$navigatorEnabled = $('<div class="setting navigatorEnabled"></div>')),
					this.$scroll.append(this.$navigatorEnabled),
					(this.$navigatorEnabledCheckbox = $(
						'<input id="navigatorEnabled" type="checkbox" tabindex="0" />'
					)),
					this.$navigatorEnabled.append(this.$navigatorEnabledCheckbox),
					(this.$navigatorEnabledLabel = $(
						'<label for="navigatorEnabled">' + this.content.navigatorEnabled + '</label>'
					)),
					this.$navigatorEnabled.append(this.$navigatorEnabledLabel),
					(this.$pagingEnabled = $('<div class="setting pagingEnabled"></div>')),
					this.$scroll.append(this.$pagingEnabled),
					(this.$pagingEnabledCheckbox = $(
						'<input id="pagingEnabled" type="checkbox" tabindex="0" />'
					)),
					this.$pagingEnabled.append(this.$pagingEnabledCheckbox),
					(this.$pagingEnabledLabel = $(
						'<label for="pagingEnabled">' + this.content.pagingEnabled + '</label>'
					)),
					this.$pagingEnabled.append(this.$pagingEnabledLabel),
					(this.$clickToZoomEnabled = $('<div class="setting clickToZoom"></div>')),
					this.$scroll.append(this.$clickToZoomEnabled),
					(this.$clickToZoomEnabledCheckbox = $(
						'<input id="clickToZoomEnabled" type="checkbox" />'
					)),
					this.$clickToZoomEnabled.append(this.$clickToZoomEnabledCheckbox),
					(this.$clickToZoomEnabledLabel = $(
						'<label for="clickToZoomEnabled">' + this.content.clickToZoomEnabled + '</label>'
					)),
					this.$clickToZoomEnabled.append(this.$clickToZoomEnabledLabel),
					(this.$preserveViewport = $('<div class="setting preserveViewport"></div>')),
					this.$scroll.append(this.$preserveViewport),
					(this.$preserveViewportCheckbox = $(
						'<input id="preserveViewport" type="checkbox" tabindex="0" />'
					)),
					this.$preserveViewport.append(this.$preserveViewportCheckbox),
					(this.$preserveViewportLabel = $(
						'<label for="preserveViewport">' + this.content.preserveViewport + '</label>'
					)),
					this.$preserveViewport.append(this.$preserveViewportLabel),
					this.$navigatorEnabledCheckbox.change(function () {
						var e = {};
						t.$navigatorEnabledCheckbox.is(':checked')
							? (e.navigatorEnabled = !0)
							: (e.navigatorEnabled = !1),
							t.updateSettings(e);
					}),
					this.$clickToZoomEnabledCheckbox.change(function () {
						var e = {};
						t.$clickToZoomEnabledCheckbox.is(':checked')
							? (e.clickToZoomEnabled = !0)
							: (e.clickToZoomEnabled = !1),
							t.updateSettings(e);
					}),
					this.$pagingEnabledCheckbox.change(function () {
						var e = {};
						t.$pagingEnabledCheckbox.is(':checked')
							? (e.pagingEnabled = !0)
							: (e.pagingEnabled = !1),
							t.updateSettings(e);
					}),
					this.$preserveViewportCheckbox.change(function () {
						var e = {};
						t.$preserveViewportCheckbox.is(':checked')
							? (e.preserveViewport = !0)
							: (e.preserveViewport = !1),
							t.updateSettings(e);
					});
			}),
			(t.prototype.open = function () {
				e.prototype.open.call(this);
				var t = this.getSettings();
				t.navigatorEnabled
					? this.$navigatorEnabledCheckbox.prop('checked', !0)
					: this.$navigatorEnabledCheckbox.removeAttr('checked'),
					t.clickToZoomEnabled
						? this.$clickToZoomEnabledCheckbox.prop('checked', !0)
						: this.$clickToZoomEnabledCheckbox.removeAttr('checked'),
					this.extension.helper.isPagingAvailable()
						? t.pagingEnabled
							? this.$pagingEnabledCheckbox.prop('checked', !0)
							: this.$pagingEnabledCheckbox.removeAttr('checked')
						: this.$pagingEnabled.hide(),
					t.preserveViewport
						? this.$preserveViewportCheckbox.prop('checked', !0)
						: this.$preserveViewportCheckbox.removeAttr('checked');
			}),
			t
		);
	})(n.SettingsDialogue);
	t.SettingsDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-seadragon-extension/ShareDialogue', [
	'require',
	'exports',
	'./Events',
	'../../modules/uv-dialogues-module/ShareDialogue'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			var i = e.call(this, t) || this;
			return (
				$.subscribe(n.Events.SEADRAGON_OPEN, function () {
					i.update();
				}),
				$.subscribe(n.Events.SEADRAGON_ANIMATION_FINISH, function () {
					i.update();
				}),
				i
			);
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('shareDialogue'), e.prototype.create.call(this);
			}),
			(t.prototype.update = function () {
				e.prototype.update.call(this);
				var t = this.extension.getViewportBounds(),
					n = this.extension.getViewerRotation();
				(this.code = this.extension.getEmbedScript(
					this.options.embedTemplate,
					this.currentWidth,
					this.currentHeight,
					t,
					n
				)),
					this.$code.val(this.code);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(i.ShareDialogue);
	t.ShareDialogue = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-seadragon-extension/Extension', [
	'require',
	'exports',
	'../../modules/uv-shared-module/AnnotationResults',
	'../../modules/uv-shared-module/BaseEvents',
	'../../modules/uv-shared-module/BaseExtension',
	'../../modules/uv-shared-module/Bookmark',
	'../../modules/uv-contentleftpanel-module/ContentLeftPanel',
	'./CroppedImageDimensions',
	'./DownloadDialogue',
	'./Events',
	'../../modules/uv-dialogues-module/ExternalContentDialogue',
	'../../modules/uv-osdmobilefooterpanel-module/MobileFooter',
	'../../modules/uv-searchfooterpanel-module/FooterPanel',
	'../../modules/uv-dialogues-module/HelpDialogue',
	'./Mode',
	'../../modules/uv-dialogues-module/MoreInfoDialogue',
	'../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel',
	'../../modules/uv-multiselectdialogue-module/MultiSelectDialogue',
	'./MultiSelectionArgs',
	'../../modules/uv-pagingheaderpanel-module/PagingHeaderPanel',
	'../../modules/uv-shared-module/Point',
	'../../modules/uv-seadragoncenterpanel-module/SeadragonCenterPanel',
	'./SettingsDialogue',
	'./ShareDialogue',
	'../../modules/uv-shared-module/Shell'
], function (e, t, n, i, o, r, s, a, u, l, c, h, p, d, f, g, v, m, y, b, E, _, w, S, x) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var I = Manifold.AnnotationGroup,
		T = (function (e) {
			function t() {
				var t = (null !== e && e.apply(this, arguments)) || this;
				return (t.annotations = []), (t.currentRotation = 0), (t.isAnnotating = !1), t;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					var t = this;
					e.prototype.create.call(this),
						$.subscribe(i.BaseEvents.METRIC_CHANGED, function () {
							if (t.isDesktopMetric()) x.Shell.$rightPanel.show();
							else {
								var e = {};
								(e.pagingEnabled = !1),
									t.updateSettings(e),
									$.publish(i.BaseEvents.UPDATE_SETTINGS),
									x.Shell.$rightPanel.hide();
							}
						}),
						$.subscribe(i.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
							(t.previousAnnotationRect = null), (t.currentAnnotationRect = null), t.viewPage(n);
						}),
						$.subscribe(i.BaseEvents.CLEAR_ANNOTATIONS, function () {
							t.clearAnnotations(),
								$.publish(i.BaseEvents.ANNOTATIONS_CLEARED),
								t.fire(i.BaseEvents.CLEAR_ANNOTATIONS);
						}),
						$.subscribe(i.BaseEvents.DOWN_ARROW, function () {
							t.useArrowKeysToNavigate() || t.centerPanel.setFocus();
						}),
						$.subscribe(i.BaseEvents.END, function () {
							$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.helper.getLastPageIndex()]);
						}),
						$.subscribe(i.BaseEvents.FIRST, function () {
							t.fire(i.BaseEvents.FIRST),
								$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.helper.getFirstPageIndex()]);
						}),
						$.subscribe(i.BaseEvents.GALLERY_DECREASE_SIZE, function () {
							t.fire(i.BaseEvents.GALLERY_DECREASE_SIZE);
						}),
						$.subscribe(i.BaseEvents.GALLERY_INCREASE_SIZE, function () {
							t.fire(i.BaseEvents.GALLERY_INCREASE_SIZE);
						}),
						$.subscribe(i.BaseEvents.GALLERY_THUMB_SELECTED, function () {
							t.fire(i.BaseEvents.GALLERY_THUMB_SELECTED);
						}),
						$.subscribe(i.BaseEvents.HOME, function () {
							$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.helper.getFirstPageIndex()]);
						}),
						$.subscribe(l.Events.IMAGE_SEARCH, function (e, n) {
							t.fire(l.Events.IMAGE_SEARCH, n), $.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [n]);
						}),
						$.subscribe(i.BaseEvents.LAST, function () {
							t.fire(i.BaseEvents.LAST),
								$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.helper.getLastPageIndex()]);
						}),
						$.subscribe(i.BaseEvents.LEFT_ARROW, function () {
							t.useArrowKeysToNavigate()
								? $.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.getPrevPageIndex()])
								: t.centerPanel.setFocus();
						}),
						$.subscribe(i.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START, function () {
							t.isDesktopMetric() && x.Shell.$rightPanel.show();
						}),
						$.subscribe(i.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
							x.Shell.$centerPanel.show(), t.resize();
						}),
						$.subscribe(i.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
							x.Shell.$centerPanel.hide(), x.Shell.$rightPanel.hide();
						}),
						$.subscribe(i.BaseEvents.MINUS, function () {
							t.centerPanel.setFocus();
						}),
						$.subscribe(l.Events.MODE_CHANGED, function (e, n) {
							t.fire(l.Events.MODE_CHANGED, n), (t.mode = new f.Mode(n));
							var o = t.getSettings();
							$.publish(i.BaseEvents.SETTINGS_CHANGED, [o]);
						}),
						$.subscribe(i.BaseEvents.MULTISELECTION_MADE, function (e, n) {
							var o = new y.MultiSelectionArgs();
							(o.manifestUri = t.helper.iiifResourceUri),
								(o.allCanvases = n.length === t.helper.getCanvases().length),
								(o.canvases = n),
								(o.format = t.data.config.options.multiSelectionMimeType),
								(o.sequence = t.helper.getCurrentSequence().id),
								t.fire(i.BaseEvents.MULTISELECTION_MADE, o);
						}),
						$.subscribe(i.BaseEvents.NEXT, function () {
							t.fire(i.BaseEvents.NEXT),
								$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.getNextPageIndex()]);
						}),
						$.subscribe(l.Events.NEXT_SEARCH_RESULT, function () {
							t.fire(l.Events.NEXT_SEARCH_RESULT);
						}),
						$.subscribe(l.Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
							t.fire(l.Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE), t.nextSearchResult();
						}),
						$.subscribe(l.Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
							t.fire(l.Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE), t.prevSearchResult();
						}),
						$.subscribe(i.BaseEvents.OPEN_THUMBS_VIEW, function () {
							t.fire(i.BaseEvents.OPEN_THUMBS_VIEW);
						}),
						$.subscribe(i.BaseEvents.OPEN_TREE_VIEW, function () {
							t.fire(i.BaseEvents.OPEN_TREE_VIEW);
						}),
						$.subscribe(i.BaseEvents.PAGE_DOWN, function () {
							$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.getNextPageIndex()]);
						}),
						$.subscribe(l.Events.PAGE_SEARCH, function (e, n) {
							t.fire(l.Events.PAGE_SEARCH, n), t.viewLabel(n);
						}),
						$.subscribe(i.BaseEvents.PAGE_UP, function () {
							$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.getPrevPageIndex()]);
						}),
						$.subscribe(l.Events.PAGING_TOGGLED, function (e, n) {
							t.fire(l.Events.PAGING_TOGGLED, n);
						}),
						$.subscribe(i.BaseEvents.PLUS, function () {
							t.centerPanel.setFocus();
						}),
						$.subscribe(i.BaseEvents.PREV, function () {
							t.fire(i.BaseEvents.PREV),
								$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.getPrevPageIndex()]);
						}),
						$.subscribe(l.Events.PREV_SEARCH_RESULT, function () {
							t.fire(l.Events.PREV_SEARCH_RESULT);
						}),
						$.subscribe(l.Events.PRINT, function () {
							t.print();
						}),
						$.subscribe(i.BaseEvents.RELOAD, function () {
							$.publish(i.BaseEvents.CLEAR_ANNOTATIONS);
						}),
						$.subscribe(i.BaseEvents.RIGHT_ARROW, function () {
							t.useArrowKeysToNavigate()
								? $.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.getNextPageIndex()])
								: t.centerPanel.setFocus();
						}),
						$.subscribe(l.Events.SEADRAGON_ANIMATION, function () {
							t.fire(l.Events.SEADRAGON_ANIMATION);
						}),
						$.subscribe(l.Events.SEADRAGON_ANIMATION_FINISH, function (e, n) {
							var i = t.centerPanel.getViewportBounds();
							t.centerPanel &&
								i &&
								($.publish(l.Events.XYWH_CHANGED, [i.toString()]),
								(t.data.xywh = i.toString()),
								t.fire(l.Events.XYWH_CHANGED, t.data.xywh));
							var o = t.helper.getCurrentCanvas();
							t.fire(l.Events.CURRENT_VIEW_URI, {
								cropUri: t.getCroppedImageUri(o, t.getViewer()),
								fullUri: t.getConfinedImageUri(o, o.getWidth())
							});
						}),
						$.subscribe(l.Events.SEADRAGON_ANIMATION_START, function () {
							t.fire(l.Events.SEADRAGON_ANIMATION_START);
						}),
						$.subscribe(l.Events.SEADRAGON_OPEN, function () {
							t.useArrowKeysToNavigate() || t.centerPanel.setFocus(),
								t.fire(l.Events.SEADRAGON_OPEN);
						}),
						$.subscribe(l.Events.SEADRAGON_RESIZE, function () {
							t.fire(l.Events.SEADRAGON_RESIZE);
						}),
						$.subscribe(l.Events.SEADRAGON_ROTATION, function (e, n) {
							(t.data.rotation = n),
								t.fire(l.Events.SEADRAGON_ROTATION, t.data.rotation),
								(t.currentRotation = n);
						}),
						$.subscribe(l.Events.SEARCH, function (e, n) {
							t.fire(l.Events.SEARCH, n), t.search(n);
						}),
						$.subscribe(l.Events.SEARCH_PREVIEW_FINISH, function () {
							t.fire(l.Events.SEARCH_PREVIEW_FINISH);
						}),
						$.subscribe(l.Events.SEARCH_PREVIEW_START, function () {
							t.fire(l.Events.SEARCH_PREVIEW_START);
						}),
						$.subscribe(i.BaseEvents.ANNOTATIONS, function (e, n) {
							t.fire(i.BaseEvents.ANNOTATIONS, n);
						}),
						$.subscribe(i.BaseEvents.ANNOTATION_CANVAS_CHANGED, function (e, t) {
							$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.canvasIndex]);
						}),
						$.subscribe(i.BaseEvents.ANNOTATIONS_EMPTY, function () {
							t.fire(i.BaseEvents.ANNOTATIONS_EMPTY);
						}),
						$.subscribe(i.BaseEvents.THUMB_SELECTED, function (e, t) {
							$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.index]);
						}),
						$.subscribe(i.BaseEvents.TREE_NODE_SELECTED, function (e, n) {
							t.fire(i.BaseEvents.TREE_NODE_SELECTED, n.data.path), t.treeNodeSelected(n);
						}),
						$.subscribe(i.BaseEvents.UP_ARROW, function () {
							t.useArrowKeysToNavigate() || t.centerPanel.setFocus();
						}),
						$.subscribe(i.BaseEvents.UPDATE_SETTINGS, function () {
							$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.helper.canvasIndex]);
							var e = t.getSettings();
							$.publish(i.BaseEvents.SETTINGS_CHANGED, [e]);
						});
				}),
				(t.prototype.createModules = function () {
					e.prototype.createModules.call(this),
						this.isHeaderPanelEnabled()
							? (this.headerPanel = new b.PagingHeaderPanel(x.Shell.$headerPanel))
							: x.Shell.$headerPanel.hide(),
						this.isLeftPanelEnabled()
							? (this.leftPanel = new s.ContentLeftPanel(x.Shell.$leftPanel))
							: x.Shell.$leftPanel.hide(),
						(this.centerPanel = new _.SeadragonCenterPanel(x.Shell.$centerPanel)),
						this.isRightPanelEnabled()
							? (this.rightPanel = new v.MoreInfoRightPanel(x.Shell.$rightPanel))
							: x.Shell.$rightPanel.hide(),
						this.isFooterPanelEnabled()
							? ((this.footerPanel = new p.FooterPanel(x.Shell.$footerPanel)),
							  (this.mobileFooterPanel = new h.FooterPanel(x.Shell.$mobileFooterPanel)))
							: x.Shell.$footerPanel.hide(),
						(this.$helpDialogue = $('<div class="overlay help" aria-hidden="true"></div>')),
						x.Shell.$overlays.append(this.$helpDialogue),
						(this.helpDialogue = new d.HelpDialogue(this.$helpDialogue)),
						(this.$moreInfoDialogue = $('<div class="overlay moreInfo" aria-hidden="true"></div>')),
						x.Shell.$overlays.append(this.$moreInfoDialogue),
						(this.moreInfoDialogue = new g.MoreInfoDialogue(this.$moreInfoDialogue)),
						(this.$multiSelectDialogue = $(
							'<div class="overlay multiSelect" aria-hidden="true"></div>'
						)),
						x.Shell.$overlays.append(this.$multiSelectDialogue),
						(this.multiSelectDialogue = new m.MultiSelectDialogue(this.$multiSelectDialogue)),
						(this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>')),
						x.Shell.$overlays.append(this.$shareDialogue),
						(this.shareDialogue = new S.ShareDialogue(this.$shareDialogue)),
						(this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>')),
						x.Shell.$overlays.append(this.$downloadDialogue),
						(this.downloadDialogue = new u.DownloadDialogue(this.$downloadDialogue)),
						(this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>')),
						x.Shell.$overlays.append(this.$settingsDialogue),
						(this.settingsDialogue = new w.SettingsDialogue(this.$settingsDialogue)),
						(this.$externalContentDialogue = $(
							'<div class="overlay externalContent" aria-hidden="true"></div>'
						)),
						x.Shell.$overlays.append(this.$externalContentDialogue),
						(this.externalContentDialogue = new c.ExternalContentDialogue(
							this.$externalContentDialogue
						)),
						this.isHeaderPanelEnabled() && this.headerPanel.init(),
						this.isLeftPanelEnabled() && this.leftPanel.init(),
						this.isRightPanelEnabled() && this.rightPanel.init(),
						this.isFooterPanelEnabled() && this.footerPanel.init();
				}),
				(t.prototype.render = function () {
					e.prototype.render.call(this),
						this.checkForAnnotations(),
						this.checkForSearchParam(),
						this.checkForRotationParam();
				}),
				(t.prototype.checkForAnnotations = function () {
					if (this.data.annotations) {
						var e = this.parseAnnotationList(this.data.annotations);
						$.publish(i.BaseEvents.CLEAR_ANNOTATIONS), this.annotate(e);
					}
				}),
				(t.prototype.annotate = function (e, t) {
					(this.annotations = e),
						(this.annotations = e.sort(function (e, t) {
							return e.canvasIndex - t.canvasIndex;
						}));
					var o = new n.AnnotationResults();
					(o.terms = t),
						(o.annotations = this.annotations),
						$.publish(i.BaseEvents.ANNOTATIONS, [o]);
				}),
				(t.prototype.checkForSearchParam = function () {
					var e = this.data.highlight;
					e && (e.replace(/\+/g, ' ').replace(/"/g, ''), $.publish(l.Events.SEARCH, [e]));
				}),
				(t.prototype.checkForRotationParam = function () {
					var e = this.data.rotation;
					e && $.publish(l.Events.SEADRAGON_ROTATION, [e]);
				}),
				(t.prototype.viewPage = function (e) {
					if (-1 !== e) {
						var t = !1;
						if (
							(e === this.helper.canvasIndex && (t = !0),
							this.helper.isCanvasIndexOutOfRange(e) &&
								(this.showMessage(this.data.config.content.canvasIndexOutOfRange), (e = 0)),
							this.isPagingSettingEnabled() && !t)
						) {
							var n = this.getPagedIndices(e);
							if (n.includes(this.helper.canvasIndex)) return void this.viewCanvas(e);
						}
						this.viewCanvas(e);
					}
				}),
				(t.prototype.getViewer = function () {
					return this.centerPanel.viewer;
				}),
				(t.prototype.getMode = function () {
					if (this.mode) return this.mode;
					switch (this.helper.getManifestType().toString()) {
						case manifesto.ManifestType.monograph().toString():
							return f.Mode.page;
						case manifesto.ManifestType.manuscript().toString():
							return f.Mode.page;
						default:
							return f.Mode.image;
					}
				}),
				(t.prototype.getViewportBounds = function () {
					if (!this.centerPanel) return null;
					var e = this.centerPanel.getViewportBounds();
					return e ? e.toString() : null;
				}),
				(t.prototype.getViewerRotation = function () {
					return this.centerPanel ? this.currentRotation : null;
				}),
				(t.prototype.viewRange = function (e) {
					var t = this.helper.getRangeByPath(e);
					if (t) {
						var n = t.getCanvasIds()[0],
							o = this.helper.getCanvasIndexById(n);
						$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [o]);
					}
				}),
				(t.prototype.viewLabel = function (e) {
					if (!e)
						return (
							this.showMessage(this.data.config.modules.genericDialogue.content.emptyValue),
							void $.publish(i.BaseEvents.CANVAS_INDEX_CHANGE_FAILED)
						);
					var t = this.helper.getCanvasIndexByLabel(e);
					-1 != t
						? $.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t])
						: (this.showMessage(this.data.config.modules.genericDialogue.content.pageNotFound),
						  $.publish(i.BaseEvents.CANVAS_INDEX_CHANGE_FAILED));
				}),
				(t.prototype.treeNodeSelected = function (e) {
					var t = e.data;
					if (t.type)
						switch (t.type) {
							case manifesto.IIIFResourceType.manifest().toString():
								this.viewManifest(t);
								break;
							case manifesto.IIIFResourceType.collection().toString():
								this.viewCollection(t);
								break;
							default:
								this.viewRange(t.path);
						}
				}),
				(t.prototype.clearAnnotations = function () {
					(this.annotations = null),
						$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [this.helper.canvasIndex]);
				}),
				(t.prototype.prevSearchResult = function () {
					var e;
					if (this.annotations)
						for (var t = this.annotations.length - 1; t >= 0; t--) {
							var n = this.annotations[t];
							if (n.canvasIndex <= this.getPrevPageIndex()) {
								(e = n), $.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [e.canvasIndex]);
								break;
							}
						}
				}),
				(t.prototype.nextSearchResult = function () {
					if (this.annotations)
						for (var e = 0; e < this.annotations.length; e++) {
							var t = this.annotations[e];
							if (t && t.canvasIndex >= this.getNextPageIndex()) {
								$.publish(i.BaseEvents.CANVAS_INDEX_CHANGED, [t.canvasIndex]);
								break;
							}
						}
				}),
				(t.prototype.bookmark = function () {
					e.prototype.bookmark.call(this);
					var t = this.helper.getCurrentCanvas(),
						n = new r.Bookmark();
					(n.index = this.helper.canvasIndex),
						(n.label = Manifesto.LanguageMap.getValue(t.getLabel())),
						(n.path = this.getCroppedImageUri(t, this.getViewer())),
						(n.thumb = t.getCanonicalImageUri(this.data.config.options.bookmarkThumbWidth)),
						(n.title = this.helper.getLabel()),
						(n.trackingLabel = window.trackingLabel),
						(n.type = manifesto.ResourceType.image().toString()),
						this.fire(i.BaseEvents.BOOKMARK, n);
				}),
				(t.prototype.print = function () {
					window.print(), this.fire(l.Events.PRINT);
				}),
				(t.prototype.getCroppedImageDimensions = function (e, t) {
					if (!t) return null;
					if (!t.viewport) return null;
					if (!e.getHeight() || !e.getWidth()) return null;
					var n = t.viewport.getBounds(!0),
						i = new a.CroppedImageDimensions(),
						o = Math.floor(n.width),
						r = Math.floor(n.height),
						s = Math.floor(n.x),
						u = Math.floor(n.y);
					s + o > e.getWidth() ? (o = e.getWidth() - s) : 0 > s && (o += s),
						0 > s && (s = 0),
						u + r > e.getHeight() ? (r = e.getHeight() - u) : 0 > u && (r += u),
						0 > u && (u = 0),
						(o = Math.min(o, e.getWidth())),
						(r = Math.min(r, e.getHeight()));
					var l = o,
						c = r,
						h = e.getMaxDimensions();
					if (h) {
						if (o > h.width) {
							var p = h.width;
							(r = Math.round(p * (r / o))), (o = p);
						}
						if (r > h.height) {
							var d = h.height;
							(o = Math.round((o / r) * d)), (r = d);
						}
					}
					return (
						(i.region = new manifesto.Size(l, c)),
						(i.regionPos = new E.Point(s, u)),
						(i.size = new manifesto.Size(o, r)),
						i
					);
				}),
				(t.prototype.getCroppedImageUri = function (e, t) {
					if (!t) return null;
					if (!t.viewport) return null;
					var n = this.getCroppedImageDimensions(e, t);
					if (!n) return null;
					var i = this.getImageBaseUri(e),
						o = this.getImageId(e);
					if (!o) return null;
					var r =
							n.regionPos.x + ',' + n.regionPos.y + ',' + n.region.width + ',' + n.region.height,
						s = n.size.width + ',' + n.size.height,
						a = this.getViewerRotation(),
						u = 'default';
					return i + '/' + o + '/' + r + '/' + s + '/' + a + '/' + u + '.jpg';
				}),
				(t.prototype.getConfinedImageDimensions = function (e, t) {
					var n = new manifesto.Size(0, 0);
					n.width = t;
					var i = Utils.Maths.normalise(t, 0, e.getWidth());
					return (n.height = Math.floor(e.getHeight() * i)), n;
				}),
				(t.prototype.getConfinedImageUri = function (e, t) {
					var n = this.getImageBaseUri(e),
						i = this.getImageId(e);
					if (!i) return null;
					var o = 'full',
						r = this.getConfinedImageDimensions(e, t),
						s = r.width + ',' + r.height,
						a = this.getViewerRotation(),
						u = 'default';
					return n + '/' + i + '/' + o + '/' + s + '/' + a + '/' + u + '.jpg';
				}),
				(t.prototype.getImageId = function (e) {
					if (e.externalResource) {
						var t = e.externalResource.data['@id'];
						if (t) return t.substr(t.lastIndexOf('/') + 1);
					}
					return null;
				}),
				(t.prototype.getImageBaseUri = function (e) {
					var t = this.getInfoUri(e);
					return (t = t.substr(0, t.lastIndexOf('/'))), t.substr(0, t.lastIndexOf('/'));
				}),
				(t.prototype.getInfoUri = function (e) {
					var t = null,
						n = e.getImages();
					if (n && n.length)
						for (var i = n[0], o = i.getResource(), r = o.getServices(), s = 0; s < r.length; s++) {
							var a = r[s],
								u = a.id;
							u.endsWith('/') || (u += '/'),
								manifesto.Utils.isImageProfile(a.getProfile()) && (t = u + 'info.json');
						}
					return t || (t = 'lib/imageunavailable.json'), t;
				}),
				(t.prototype.getEmbedScript = function (e, t, n, i, o) {
					var r = this.data.config.uri || '',
						s = this.getSerializedLocales(),
						a = this.getAppUri(),
						u =
							a +
							'#?manifest=' +
							this.helper.iiifResourceUri +
							'&c=' +
							this.helper.collectionIndex +
							'&m=' +
							this.helper.manifestIndex +
							'&s=' +
							this.helper.sequenceIndex +
							'&cv=' +
							this.helper.canvasIndex +
							'&config=' +
							r +
							'&locales=' +
							s +
							'&xywh=' +
							i +
							'&r=' +
							o,
						l = Utils.Strings.format(e, u, t.toString(), n.toString());
					return l;
				}),
				(t.prototype.getPrevPageIndex = function (e) {
					void 0 === e && (e = this.helper.canvasIndex);
					var t;
					if (this.isPagingSettingEnabled()) {
						var n = this.getPagedIndices(e);
						t = this.helper.isRightToLeft() ? n[n.length - 1] - 1 : n[0] - 1;
					} else t = e - 1;
					return t;
				}),
				(t.prototype.isSearchEnabled = function () {
					return Utils.Bools.getBool(this.data.config.options.searchWithinEnabled, !1) &&
						this.helper.getSearchService()
						? !0
						: !1;
				}),
				(t.prototype.isPagingSettingEnabled = function () {
					return this.helper.isPagingAvailable() ? this.getSettings().pagingEnabled : !1;
				}),
				(t.prototype.getNextPageIndex = function (e) {
					void 0 === e && (e = this.helper.canvasIndex);
					var t;
					if (this.isPagingSettingEnabled()) {
						var n = this.getPagedIndices(e);
						t = this.helper.isRightToLeft() ? n[0] + 1 : n[n.length - 1] + 1;
					} else t = e + 1;
					return t > this.helper.getTotalCanvases() - 1 ? -1 : t;
				}),
				(t.prototype.getAutoCompleteService = function () {
					var e = this.helper.getSearchService();
					return e ? e.getService(manifesto.ServiceProfile.autoComplete()) : null;
				}),
				(t.prototype.getAutoCompleteUri = function () {
					var e = this.getAutoCompleteService();
					return e ? e.id + '?q={0}' : null;
				}),
				(t.prototype.getSearchServiceUri = function () {
					var e = this.helper.getSearchService();
					if (!e) return null;
					var t = e.id;
					return (t += '?q={0}');
				}),
				(t.prototype.search = function (e) {
					if (!this.isAnnotating) {
						(this.isAnnotating = !0), (this.annotations = []);
						var t = this,
							n = this.getSearchServiceUri();
						n &&
							((n = Utils.Strings.format(n, encodeURIComponent(e))),
							this.getSearchResults(n, e, this.annotations, function (n) {
								(t.isAnnotating = !1),
									n.length
										? t.annotate(n, e)
										: t.showMessage(
												t.data.config.modules.genericDialogue.content.noMatches,
												function () {
													$.publish(i.BaseEvents.ANNOTATIONS_EMPTY);
												}
										  );
							}));
					}
				}),
				(t.prototype.getSearchResults = function (e, t, n, i) {
					var o = this;
					$.getJSON(e, function (e) {
						e.resources && e.resources.length && (n = n.concat(o.parseAnnotationList(e))),
							e.next ? o.getSearchResults(e.next, t, n, i) : i(n);
					});
				}),
				(t.prototype.parseAnnotationList = function (e) {
					for (
						var t = [],
							n = function (n) {
								var o = e.resources[n],
									r = i.helper.getCanvasIndexById(o.on.match(/(.*)#/)[1]),
									s = new I(o, r),
									a = t
										.en()
										.where(function (e) {
											return e.canvasIndex === s.canvasIndex;
										})
										.first();
								a ? a.addRect(o) : t.push(s);
							},
							i = this,
							o = 0;
						o < e.resources.length;
						o++
					)
						n(o);
					return (
						t.sort(function (e, t) {
							return e.canvasIndex - t.canvasIndex;
						}),
						t
					);
				}),
				(t.prototype.getAnnotationRects = function () {
					return this.annotations
						? this.annotations
								.en()
								.selectMany(function (e) {
									return e.rects;
								})
								.toArray()
						: [];
				}),
				(t.prototype.getCurrentAnnotationRectIndex = function () {
					var e = this.getAnnotationRects();
					return this.currentAnnotationRect ? e.indexOf(this.currentAnnotationRect) : -1;
				}),
				(t.prototype.getTotalAnnotationRects = function () {
					var e = this.getAnnotationRects();
					return e.length;
				}),
				(t.prototype.isFirstAnnotationRect = function () {
					return 0 === this.getCurrentAnnotationRectIndex();
				}),
				(t.prototype.getLastAnnotationRectIndex = function () {
					return this.getTotalAnnotationRects() - 1;
				}),
				(t.prototype.getPagedIndices = function (e) {
					void 0 === e && (e = this.helper.canvasIndex);
					var t = [];
					return (
						this.helper.isContinuous()
							? (t = $.map(this.helper.getCanvases(), function (e, t) {
									return t;
							  }))
							: this.isPagingSettingEnabled()
							? ((t =
									this.helper.isFirstCanvas(e) ||
									(this.helper.isLastCanvas(e) && this.helper.isTotalCanvasesEven())
										? [e]
										: e % 2
										? [e, e + 1]
										: [e - 1, e]),
							  this.helper.isRightToLeft() && (t = t.reverse()))
							: t.push(this.helper.canvasIndex),
						t
					);
				}),
				t
			);
		})(o.BaseExtension);
	t.Extension = T;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'extensions/uv-pdf-extension/DownloadDialogue',
	['require', 'exports', '../../modules/uv-dialogues-module/DownloadDialogue'],
	function (e, t, n) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var i = (function (e) {
			function t(t) {
				return e.call(this, t) || this;
			}
			return (
				__extends(t, e),
				(t.prototype.create = function () {
					this.setConfig('downloadDialogue'), e.prototype.create.call(this);
				}),
				(t.prototype.open = function (t) {
					e.prototype.open.call(this, t),
						this.addEntireFileDownloadOptions(),
						this.$downloadOptions.find('li:visible').length
							? this.$noneAvailable.hide()
							: this.$noneAvailable.show(),
						this.resize();
				}),
				(t.prototype.isDownloadOptionAvailable = function (t) {
					return e.prototype.isDownloadOptionAvailable.call(this, t);
				}),
				t
			);
		})(n.DownloadDialogue);
		t.DownloadDialogue = i;
	}
),
	define('extensions/uv-pdf-extension/Events', ['require', 'exports'], function (e, t) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var n = (function () {
			function e() {}
			return (
				(e.namespace = 'pdfExtension.'),
				(e.PDF_LOADED = e.namespace + 'pdfLoaded'),
				(e.PAGE_INDEX_CHANGED = e.namespace + 'pageIndexChanged'),
				(e.SEARCH = e.namespace + 'search'),
				e
			);
		})();
		t.Events = n;
	});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-pdfcenterpanel-module/PDFCenterPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/CenterPanel',
	'../../extensions/uv-pdf-extension/Events'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			var n = e.call(this, t) || this;
			return (
				(n._maxScale = 5),
				(n._minScale = 0.7),
				(n._nextButtonEnabled = !1),
				(n._pageIndex = 1),
				(n._pageIndexPending = null),
				(n._pageRendering = !1),
				(n._pdfDoc = null),
				(n._prevButtonEnabled = !1),
				(n._scale = 0.7),
				n
			);
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('pdfCenterPanel'),
					e.prototype.create.call(this),
					(this._$pdfContainer = $('<div class="pdfContainer"></div>')),
					(this._$canvas = $('<canvas></canvas>')),
					(this._$spinner = $('<div class="spinner"></div>')),
					(this._canvas = this._$canvas[0]),
					(this._ctx = this._canvas.getContext('2d')),
					this.$content.append(this._$spinner),
					(this._$prevButton = $('<div class="btn prev" tabindex="0"></div>')),
					this.$content.append(this._$prevButton),
					(this._$nextButton = $('<div class="btn next" tabindex="0"></div>')),
					this.$content.append(this._$nextButton),
					(this._$zoomInButton = $('<div class="btn zoomIn" tabindex="0"></div>')),
					this.$content.append(this._$zoomInButton),
					(this._$zoomOutButton = $('<div class="btn zoomOut" tabindex="0"></div>')),
					this.$content.append(this._$zoomOutButton),
					this._$pdfContainer.append(this._$canvas),
					this.$content.prepend(this._$pdfContainer),
					$.subscribe(n.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, n) {
						t.openMedia(n);
					}),
					$.subscribe(n.BaseEvents.FIRST, function () {
						t._pdfDoc && ((t._pageIndex = 1), t._queueRenderPage(t._pageIndex));
					}),
					$.subscribe(n.BaseEvents.PREV, function () {
						t._pdfDoc && (t._pageIndex <= 1 || (t._pageIndex--, t._queueRenderPage(t._pageIndex)));
					}),
					$.subscribe(n.BaseEvents.NEXT, function () {
						t._pdfDoc &&
							(t._pageIndex >= t._pdfDoc.numPages ||
								(t._pageIndex++, t._queueRenderPage(t._pageIndex)));
					}),
					$.subscribe(n.BaseEvents.LAST, function () {
						t._pdfDoc && ((t._pageIndex = t._pdfDoc.numPages), t._queueRenderPage(t._pageIndex));
					}),
					$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function () {
						t._pdfDoc && ((t._pageIndex = 1), t._queueRenderPage(t._pageIndex));
					}),
					$.subscribe(o.Events.SEARCH, function (e, n) {
						t._pdfDoc &&
							(1 > n ||
								n > t._pdfDoc.numPages ||
								((t._pageIndex = n), t._queueRenderPage(t._pageIndex)));
					}),
					this._$prevButton.onPressed(function (e) {
						e.preventDefault(), t._prevButtonEnabled && $.publish(n.BaseEvents.PREV);
					}),
					this.disablePrevButton(),
					this._$nextButton.onPressed(function (e) {
						e.preventDefault(), t._nextButtonEnabled && $.publish(n.BaseEvents.NEXT);
					}),
					this.disableNextButton(),
					this._$zoomInButton.onPressed(function (e) {
						e.preventDefault();
						var n = t._scale + 0.5;
						n < t._maxScale ? (t._scale = n) : (t._scale = t._maxScale), t._render(t._pageIndex);
					}),
					this._$zoomOutButton.onPressed(function (e) {
						e.preventDefault();
						var n = t._scale - 0.5;
						n > t._minScale ? (t._scale = n) : (t._scale = t._minScale), t._render(t._pageIndex);
					});
			}),
			(t.prototype.disablePrevButton = function () {
				(this._prevButtonEnabled = !1), this._$prevButton.addClass('disabled');
			}),
			(t.prototype.enablePrevButton = function () {
				(this._prevButtonEnabled = !0), this._$prevButton.removeClass('disabled');
			}),
			(t.prototype.hidePrevButton = function () {
				this.disablePrevButton(), this._$prevButton.hide();
			}),
			(t.prototype.showPrevButton = function () {
				this.enablePrevButton(), this._$prevButton.show();
			}),
			(t.prototype.disableNextButton = function () {
				(this._nextButtonEnabled = !1), this._$nextButton.addClass('disabled');
			}),
			(t.prototype.enableNextButton = function () {
				(this._nextButtonEnabled = !0), this._$nextButton.removeClass('disabled');
			}),
			(t.prototype.hideNextButton = function () {
				this.disableNextButton(), this._$nextButton.hide();
			}),
			(t.prototype.showNextButton = function () {
				this.enableNextButton(), this._$nextButton.show();
			}),
			(t.prototype.openMedia = function (e) {
				var t = this;
				this._$spinner.show(),
					this.extension.getExternalResources(e).then(function () {
						var e = null,
							n = t.extension.helper.getCurrentCanvas(),
							i = t.extension.getMediaFormats(n);
						(e = i && i.length ? i[0].id : n.id),
							(PDFJS.disableWorker = !0),
							PDFJS.getDocument(e).then(function (e) {
								(t._pdfDoc = e),
									t._render(t._pageIndex),
									$.publish(o.Events.PDF_LOADED, [e]),
									t._$spinner.hide();
							});
					});
			}),
			(t.prototype._render = function (e) {
				var t = this;
				(this._pageRendering = !0), this._$zoomOutButton.enable(), this._$zoomInButton.enable();
				var n = this._scale - 0.5,
					i = this._scale + 0.5;
				n < this._minScale && this._$zoomOutButton.disable(),
					i > this._maxScale && this._$zoomInButton.disable(),
					this._pdfDoc.getPage(e).then(function (e) {
						t._renderTask && t._renderTask.cancel(),
							(t._viewport = e.getViewport(t._scale)),
							(t._canvas.height = t._viewport.height),
							(t._canvas.width = t._viewport.width);
						var n = { canvasContext: t._ctx, viewport: t._viewport };
						(t._renderTask = e.render(n)),
							t._renderTask.promise
								.then(function () {
									$.publish(o.Events.PAGE_INDEX_CHANGED, [t._pageIndex]),
										(t._pageRendering = !1),
										null !== t._pageIndexPending &&
											(t._render(t._pageIndexPending), (t._pageIndexPending = null)),
										1 === t._pageIndex ? t.disablePrevButton() : t.enablePrevButton(),
										t._pageIndex === t._pdfDoc.numPages
											? t.disableNextButton()
											: t.enableNextButton();
								})
								['catch'](function (e) {});
					});
			}),
			(t.prototype._queueRenderPage = function (e) {
				this._pageRendering ? (this._pageIndexPending = e) : this._render(e);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this._$pdfContainer.width(this.$content.width()),
					this._$pdfContainer.height(this.$content.height()),
					this._$spinner.css('top', this.$content.height() / 2 - this._$spinner.height() / 2),
					this._$spinner.css('left', this.$content.width() / 2 - this._$spinner.width() / 2),
					this._$prevButton.css({
						top: (this.$content.height() - this._$prevButton.height()) / 2,
						left: this._$prevButton.horizontalMargins()
					}),
					this._$nextButton.css({
						top: (this.$content.height() - this._$nextButton.height()) / 2,
						left:
							this.$content.width() -
							(this._$nextButton.width() + this._$nextButton.horizontalMargins())
					}),
					this._viewport && this._render(this._pageIndex);
			}),
			t
		);
	})(i.CenterPanel);
	t.PDFCenterPanel = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-pdfheaderpanel-module/PDFHeaderPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../../extensions/uv-pdf-extension/Events',
	'../uv-shared-module/HeaderPanel'
], function (e, t, n, i, o) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var r = (function (e) {
		function t(t) {
			var n = e.call(this, t) || this;
			return (
				(n.firstButtonEnabled = !1),
				(n.lastButtonEnabled = !1),
				(n.nextButtonEnabled = !1),
				(n.prevButtonEnabled = !1),
				(n._pageIndex = 0),
				(n._pdfDoc = null),
				n
			);
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('pdfHeaderPanel'),
					e.prototype.create.call(this),
					$.subscribe(i.Events.PAGE_INDEX_CHANGED, function (e, n) {
						(t._pageIndex = n), t.render();
					}),
					$.subscribe(i.Events.PDF_LOADED, function (e, n) {
						t._pdfDoc = n;
					}),
					(this.$prevOptions = $('<div class="prevOptions"></div>')),
					this.$centerOptions.append(this.$prevOptions),
					(this.$firstButton = $(
						'\n          <button class="btn imageBtn first" tabindex="0" title="' +
							this.content.first +
							'">\n            <i class="uv-icon-first" aria-hidden="true"></i>' +
							this.content.first +
							'\n          </button>\n        '
					)),
					this.$prevOptions.append(this.$firstButton),
					this.$firstButton.disable(),
					(this.$prevButton = $(
						'\n          <button class="btn imageBtn prev" tabindex="0" title="' +
							this.content.previous +
							'">\n            <i class="uv-icon-prev" aria-hidden="true"></i>' +
							this.content.previous +
							'\n          </button>\n        '
					)),
					this.$prevOptions.append(this.$prevButton),
					this.$prevButton.disable(),
					(this.$search = $('<div class="search"></div>')),
					this.$centerOptions.append(this.$search),
					(this.$searchText = $(
						'<input class="searchText" maxlength="50" type="text" tabindex="0" aria-label="' +
							this.content.pageSearchLabel +
							'"/>'
					)),
					this.$search.append(this.$searchText),
					(this.$total = $('<span class="total"></span>')),
					this.$search.append(this.$total),
					(this.$searchButton = $(
						'<a class="go btn btn-primary" tabindex="0">' + this.content.go + '</a>'
					)),
					this.$search.append(this.$searchButton),
					this.$searchButton.disable(),
					(this.$nextOptions = $('<div class="nextOptions"></div>')),
					this.$centerOptions.append(this.$nextOptions),
					(this.$nextButton = $(
						'\n          <button class="btn imageBtn next" tabindex="0" title="' +
							this.content.next +
							'">\n            <i class="uv-icon-next" aria-hidden="true"></i>' +
							this.content.next +
							'\n          </button>\n        '
					)),
					this.$nextOptions.append(this.$nextButton),
					this.$nextButton.disable(),
					(this.$lastButton = $(
						'\n          <button class="btn imageBtn last" tabindex="0" title="' +
							this.content.last +
							'">\n            <i class="uv-icon-last" aria-hidden="true"></i>' +
							this.content.last +
							'\n          </button>\n        '
					)),
					this.$nextOptions.append(this.$lastButton),
					this.$lastButton.disable(),
					this.$firstButton.onPressed(function () {
						$.publish(n.BaseEvents.FIRST);
					}),
					this.$prevButton.onPressed(function () {
						$.publish(n.BaseEvents.PREV);
					}),
					this.$nextButton.onPressed(function () {
						$.publish(n.BaseEvents.NEXT);
					}),
					this.$lastButton.onPressed(function () {
						$.publish(n.BaseEvents.LAST);
					}),
					this.$searchText.onEnter(function () {
						t.$searchText.blur(), t.search(t.$searchText.val());
					}),
					this.$searchText.click(function () {
						$(this).select();
					}),
					this.$searchButton.onPressed(function () {
						t.search(t.$searchText.val());
					});
			}),
			(t.prototype.render = function () {
				1 === this._pdfDoc.numPages ? this.$centerOptions.hide() : this.$centerOptions.show(),
					this.$searchText.val(this._pageIndex);
				var e = this.content.of;
				this.$total.html(Utils.Strings.format(e, this._pdfDoc.numPages.toString())),
					this.$searchButton.enable(),
					1 === this._pageIndex
						? (this.$firstButton.disable(), this.$prevButton.disable())
						: (this.$firstButton.enable(), this.$prevButton.enable()),
					this._pageIndex === this._pdfDoc.numPages
						? (this.$lastButton.disable(), this.$nextButton.disable())
						: (this.$lastButton.enable(), this.$nextButton.enable());
			}),
			(t.prototype.search = function (e) {
				if (!e) return void this.extension.showMessage(this.content.emptyValue);
				var t = parseInt(this.$searchText.val(), 10);
				return isNaN(t)
					? void this.extension.showMessage(
							this.extension.data.config.modules.genericDialogue.content.invalidNumber
					  )
					: void $.publish(i.Events.SEARCH, [t]);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(o.HeaderPanel);
	t.PDFHeaderPanel = r;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-pdf-extension/SettingsDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/SettingsDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('settingsDialogue'), e.prototype.create.call(this);
			}),
			t
		);
	})(n.SettingsDialogue);
	t.SettingsDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-pdf-extension/ShareDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/ShareDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('shareDialogue'), e.prototype.create.call(this);
			}),
			(t.prototype.update = function () {
				e.prototype.update.call(this),
					(this.code = this.extension.getEmbedScript(
						this.options.embedTemplate,
						this.currentWidth,
						this.currentHeight
					)),
					this.$code.val(this.code);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(n.ShareDialogue);
	t.ShareDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-pdf-extension/Extension', [
	'require',
	'exports',
	'../../modules/uv-shared-module/BaseEvents',
	'../../modules/uv-shared-module/BaseExtension',
	'../../modules/uv-shared-module/Bookmark',
	'./DownloadDialogue',
	'../../modules/uv-shared-module/FooterPanel',
	'../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel',
	'../../modules/uv-pdfcenterpanel-module/PDFCenterPanel',
	'../../modules/uv-pdfheaderpanel-module/PDFHeaderPanel',
	'../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel',
	'./SettingsDialogue',
	'./ShareDialogue',
	'../../modules/uv-shared-module/Shell'
], function (e, t, n, i, o, r, s, a, u, l, c, h, p, d) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var f = (function (e) {
		function t() {
			return (null !== e && e.apply(this, arguments)) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				requirejs.config({
					paths: { 'pdfjs-dist/build/pdf.combined': this.data.root + '/lib/pdf.combined' }
				}),
					e.prototype.create.call(this),
					$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
						t.viewCanvas(n);
					}),
					$.subscribe(n.BaseEvents.THUMB_SELECTED, function (e, t) {
						$.publish(n.BaseEvents.CANVAS_INDEX_CHANGED, [t.index]);
					}),
					$.subscribe(n.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
						d.Shell.$centerPanel.hide(), d.Shell.$rightPanel.hide();
					}),
					$.subscribe(n.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
						d.Shell.$centerPanel.show(), d.Shell.$rightPanel.show(), t.resize();
					}),
					$.subscribe(n.BaseEvents.SHOW_OVERLAY, function () {
						t.IsOldIE() && t.centerPanel.$element.hide();
					}),
					$.subscribe(n.BaseEvents.HIDE_OVERLAY, function () {
						t.IsOldIE() && t.centerPanel.$element.show();
					}),
					$.subscribe(n.BaseEvents.EXIT_FULLSCREEN, function () {
						setTimeout(function () {
							t.resize();
						}, 10);
					});
			}),
			(t.prototype.render = function () {
				e.prototype.render.call(this);
			}),
			(t.prototype.IsOldIE = function () {
				var e = window.browserDetect.browser,
					t = window.browserDetect.version;
				return 'Explorer' === e && 9 >= t ? !0 : !1;
			}),
			(t.prototype.createModules = function () {
				e.prototype.createModules.call(this),
					this.isHeaderPanelEnabled()
						? (this.headerPanel = new l.PDFHeaderPanel(d.Shell.$headerPanel))
						: d.Shell.$headerPanel.hide(),
					this.isLeftPanelEnabled() &&
						(this.leftPanel = new c.ResourcesLeftPanel(d.Shell.$leftPanel)),
					(this.centerPanel = new u.PDFCenterPanel(d.Shell.$centerPanel)),
					this.isRightPanelEnabled() &&
						(this.rightPanel = new a.MoreInfoRightPanel(d.Shell.$rightPanel)),
					this.isFooterPanelEnabled()
						? (this.footerPanel = new s.FooterPanel(d.Shell.$footerPanel))
						: d.Shell.$footerPanel.hide(),
					(this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>')),
					d.Shell.$overlays.append(this.$downloadDialogue),
					(this.downloadDialogue = new r.DownloadDialogue(this.$downloadDialogue)),
					(this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>')),
					d.Shell.$overlays.append(this.$shareDialogue),
					(this.shareDialogue = new p.ShareDialogue(this.$shareDialogue)),
					(this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>')),
					d.Shell.$overlays.append(this.$settingsDialogue),
					(this.settingsDialogue = new h.SettingsDialogue(this.$settingsDialogue)),
					this.isLeftPanelEnabled() && this.leftPanel.init(),
					this.isRightPanelEnabled() && this.rightPanel.init();
			}),
			(t.prototype.bookmark = function () {
				e.prototype.bookmark.call(this);
				var t = this.helper.getCurrentCanvas(),
					i = new o.Bookmark();
				(i.index = this.helper.canvasIndex),
					(i.label = Manifesto.LanguageMap.getValue(t.getLabel())),
					(i.thumb = t.getProperty('thumbnail')),
					(i.title = this.helper.getLabel()),
					(i.trackingLabel = window.trackingLabel),
					(i.type = manifesto.ResourceType.document().toString()),
					this.fire(n.BaseEvents.BOOKMARK, i);
			}),
			(t.prototype.getEmbedScript = function (e, t, n) {
				var i = this.getAppUri(),
					o =
						i +
						'#?manifest=' +
						this.helper.iiifResourceUri +
						'&c=' +
						this.helper.collectionIndex +
						'&m=' +
						this.helper.manifestIndex +
						'&s=' +
						this.helper.sequenceIndex +
						'&cv=' +
						this.helper.canvasIndex,
					r = Utils.Strings.format(e, o, t.toString(), n.toString());
				return r;
			}),
			t
		);
	})(i.BaseExtension);
	t.Extension = f;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-virtex-extension/DownloadDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/DownloadDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('downloadDialogue'), e.prototype.create.call(this);
			}),
			(t.prototype.open = function (t) {
				e.prototype.open.call(this, t),
					this.addEntireFileDownloadOptions(),
					this.updateNoneAvailable(),
					this.resize();
			}),
			(t.prototype.isDownloadOptionAvailable = function (t) {
				return e.prototype.isDownloadOptionAvailable.call(this, t);
			}),
			t
		);
	})(n.DownloadDialogue);
	t.DownloadDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-virtex-extension/SettingsDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/SettingsDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {
		value: !0
	});
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('settingsDialogue'), e.prototype.create.call(this);
			}),
			t
		);
	})(n.SettingsDialogue);
	t.SettingsDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-virtex-extension/ShareDialogue', [
	'require',
	'exports',
	'../../modules/uv-dialogues-module/ShareDialogue'
], function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var i = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				this.setConfig('shareDialogue'), e.prototype.create.call(this);
			}),
			(t.prototype.update = function () {
				e.prototype.update.call(this),
					(this.code = this.extension.getEmbedScript(
						this.options.embedTemplate,
						this.currentWidth,
						this.currentHeight
					)),
					this.$code.val(this.code);
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this);
			}),
			t
		);
	})(n.ShareDialogue);
	t.ShareDialogue = i;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('modules/uv-virtexcenterpanel-module/VirtexCenterPanel', [
	'require',
	'exports',
	'../uv-shared-module/BaseEvents',
	'../uv-shared-module/CenterPanel'
], function (e, t, n, i) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var o = (function (e) {
		function t(t) {
			return e.call(this, t) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				this.setConfig('virtexCenterPanel'), e.prototype.create.call(this);
				var i = this;
				$.subscribe(n.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, t) {
					i.openMedia(t);
				}),
					(this.$navigation = $('<div class="navigation"></div>')),
					this.$content.prepend(this.$navigation),
					(this.$zoomInButton = $(
						'\n          <button class="btn imageBtn zoomIn" title="' +
							this.content.zoomIn +
							'">\n            <i class="uv-icon-zoom-in" aria-hidden="true"></i>' +
							this.content.zoomIn +
							'\n          </button>\n        '
					)),
					this.$navigation.append(this.$zoomInButton),
					(this.$zoomOutButton = $(
						'\n          <button class="btn imageBtn zoomOut" title="' +
							this.content.zoomOut +
							'">\n            <i class="uv-icon-zoom-out" aria-hidden="true"></i>' +
							this.content.zoomOut +
							'\n          </button>\n        '
					)),
					this.$navigation.append(this.$zoomOutButton),
					(this.$vrButton = $(
						'\n          <button class="btn imageBtn vr" title="' +
							this.content.vr +
							'">\n            <i class="uv-icon-vr" aria-hidden="true"></i>' +
							this.content.vr +
							'\n          </button>\n        '
					)),
					this.$navigation.append(this.$vrButton),
					(this.$viewport = $('<div class="virtex"></div>')),
					this.$content.prepend(this.$viewport),
					(this.title = this.extension.helper.getLabel()),
					this.$zoomInButton.on('click', function (e) {
						e.preventDefault(), t.viewport && t.viewport.zoomIn();
					}),
					this.$zoomOutButton.on('click', function (e) {
						e.preventDefault(), t.viewport && t.viewport.zoomOut();
					}),
					this.$vrButton.on('click', function (e) {
						e.preventDefault(), t.viewport && t.viewport.toggleVR();
					}),
					this._isVREnabled() || this.$vrButton.hide();
			}),
			(t.prototype.openMedia = function (e) {
				var t = this;
				this.extension.getExternalResources(e).then(function () {
					t.$viewport.empty();
					var e = null,
						n = t.extension.helper.getCurrentCanvas(),
						i = t.extension.getMediaFormats(n),
						o = null,
						r = new Virtex.FileType('application/vnd.threejs+json');
					i && i.length ? ((e = i[0].id), (o = i[0].getFormat())) : (e = n.id),
						o && (r = new Virtex.FileType(o.toString()));
					var s = navigator.userAgent.toLowerCase().indexOf('android') > -1;
					(t.viewport = new Virtex.Viewport({
						target: t.$viewport[0],
						data: {
							antialias: !s,
							file: e,
							fullscreenEnabled: !1,
							type: r,
							showStats: t.options.showStats
						}
					})),
						t.viewport &&
							(t.viewport.on(
								'vravailable',
								function () {
									t.$vrButton.show();
								},
								!1
							),
							t.viewport.on(
								'vrunavailable',
								function () {
									t.$vrButton.hide();
								},
								!1
							)),
						t.resize();
				});
			}),
			(t.prototype._isVREnabled = function () {
				return Utils.Bools.getBool(this.config.options.vrEnabled, !1) && WEBVR.isAvailable();
			}),
			(t.prototype.resize = function () {
				e.prototype.resize.call(this),
					this.title && this.$title.ellipsisFill(this.title),
					this.$viewport.width(this.$content.width()),
					this.$viewport.height(this.$content.height()),
					this.viewport && this.viewport.resize();
			}),
			t
		);
	})(i.CenterPanel);
	t.VirtexCenterPanel = o;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define('extensions/uv-virtex-extension/Extension', [
	'require',
	'exports',
	'../../modules/uv-shared-module/BaseEvents',
	'../../modules/uv-shared-module/BaseExtension',
	'../../modules/uv-shared-module/Bookmark',
	'../../modules/uv-contentleftpanel-module/ContentLeftPanel',
	'./DownloadDialogue',
	'../../modules/uv-shared-module/FooterPanel',
	'../../modules/uv-shared-module/HeaderPanel',
	'../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel',
	'./SettingsDialogue',
	'./ShareDialogue',
	'../../modules/uv-shared-module/Shell',
	'../../modules/uv-virtexcenterpanel-module/VirtexCenterPanel'
], function (e, t, n, i, o, r, s, a, u, l, c, h, p, d) {
	'use strict';
	Object.defineProperty(t, '__esModule', { value: !0 });
	var f = (function (e) {
		function t() {
			return (null !== e && e.apply(this, arguments)) || this;
		}
		return (
			__extends(t, e),
			(t.prototype.create = function () {
				var t = this;
				e.prototype.create.call(this),
					$.subscribe(n.BaseEvents.CANVAS_INDEX_CHANGED, function (e, n) {
						t.viewCanvas(n);
					}),
					$.subscribe(n.BaseEvents.THUMB_SELECTED, function (e, t) {
						$.publish(n.BaseEvents.CANVAS_INDEX_CHANGED, [t]);
					});
			}),
			(t.prototype.createModules = function () {
				e.prototype.createModules.call(this),
					this.isHeaderPanelEnabled()
						? (this.headerPanel = new u.HeaderPanel(p.Shell.$headerPanel))
						: p.Shell.$headerPanel.hide(),
					this.isLeftPanelEnabled() &&
						(this.leftPanel = new r.ContentLeftPanel(p.Shell.$leftPanel)),
					(this.centerPanel = new d.VirtexCenterPanel(p.Shell.$centerPanel)),
					this.isRightPanelEnabled() &&
						(this.rightPanel = new l.MoreInfoRightPanel(p.Shell.$rightPanel)),
					this.isFooterPanelEnabled()
						? (this.footerPanel = new a.FooterPanel(p.Shell.$footerPanel))
						: p.Shell.$footerPanel.hide(),
					(this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>')),
					p.Shell.$overlays.append(this.$downloadDialogue),
					(this.downloadDialogue = new s.DownloadDialogue(this.$downloadDialogue)),
					(this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>')),
					p.Shell.$overlays.append(this.$shareDialogue),
					(this.shareDialogue = new h.ShareDialogue(this.$shareDialogue)),
					(this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>')),
					p.Shell.$overlays.append(this.$settingsDialogue),
					(this.settingsDialogue = new c.SettingsDialogue(this.$settingsDialogue)),
					this.isLeftPanelEnabled() ? this.leftPanel.init() : p.Shell.$leftPanel.hide(),
					this.isRightPanelEnabled() ? this.rightPanel.init() : p.Shell.$rightPanel.hide();
			}),
			(t.prototype.render = function () {
				e.prototype.render.call(this);
			}),
			(t.prototype.dependencyLoaded = function (e, t) {
				0 === e && (window.THREE = t);
			}),
			(t.prototype.isLeftPanelEnabled = function () {
				return (
					Utils.Bools.getBool(this.data.config.options.leftPanelEnabled, !0) &&
					(this.helper.isMultiCanvas() || this.helper.isMultiSequence())
				);
			}),
			(t.prototype.bookmark = function () {
				e.prototype.bookmark.call(this);
				var t = this.helper.getCurrentCanvas(),
					i = new o.Bookmark();
				(i.index = this.helper.canvasIndex),
					(i.label = Manifesto.LanguageMap.getValue(t.getLabel())),
					(i.thumb = t.getProperty('thumbnail')),
					(i.title = this.helper.getLabel()),
					(i.trackingLabel = window.trackingLabel),
					(i.type = manifesto.ResourceType.physicalobject().toString()),
					this.fire(n.BaseEvents.BOOKMARK, i);
			}),
			(t.prototype.getEmbedScript = function (e, t, n) {
				var i = this.getAppUri(),
					o =
						i +
						'#?manifest=' +
						this.helper.iiifResourceUri +
						'&c=' +
						this.helper.collectionIndex +
						'&m=' +
						this.helper.manifestIndex +
						'&s=' +
						this.helper.sequenceIndex +
						'&cv=' +
						this.helper.canvasIndex,
					r = Utils.Strings.format(e, o, t.toString(), n.toString());
				return r;
			}),
			t
		);
	})(i.BaseExtension);
	t.Extension = f;
});
var __extends =
	(this && this.__extends) ||
	(function () {
		var e =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
			};
		return function (t, n) {
			function i() {
				this.constructor = t;
			}
			e(t, n),
				(t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
		};
	})();
define(
	'UVComponent',
	[
		'require',
		'exports',
		'./modules/uv-shared-module/BaseEvents',
		'./extensions/uv-av-extension/Extension',
		'./extensions/uv-default-extension/Extension',
		'./extensions/uv-mediaelement-extension/Extension',
		'./extensions/uv-seadragon-extension/Extension',
		'./extensions/uv-pdf-extension/Extension',
		'./extensions/uv-virtex-extension/Extension',
		'./Utils'
	],
	function (e, t, n, i, o, r, s, a, u, l) {
		'use strict';
		Object.defineProperty(t, '__esModule', { value: !0 });
		var c = (function (e) {
			function t(t) {
				var n = e.call(this, t) || this;
				return (n.isFullScreen = !1), n._init(), n._resize(), n;
			}
			return (
				__extends(t, e),
				(t.prototype._init = function () {
					var t = e.prototype._init.call(this);
					return (
						t || console.error('UV failed to initialise'),
						(this._extensions = {}),
						(this._extensions[manifesto.ResourceType.canvas().toString()] = {
							type: s.Extension,
							name: 'uv-seadragon-extension'
						}),
						(this._extensions[manifesto.ResourceType.image().toString()] = {
							type: s.Extension,
							name: 'uv-seadragon-extension'
						}),
						(this._extensions[manifesto.ResourceType.movingimage().toString()] = {
							type: r.Extension,
							name: 'uv-mediaelement-extension'
						}),
						(this._extensions[manifesto.ResourceType.physicalobject().toString()] = {
							type: u.Extension,
							name: 'uv-virtex-extension'
						}),
						(this._extensions[manifesto.ResourceType.sound().toString()] = {
							type: r.Extension,
							name: 'uv-mediaelement-extension'
						}),
						(this._extensions[manifesto.RenderingFormat.pdf().toString()] = {
							type: a.Extension,
							name: 'uv-pdf-extension'
						}),
						(this._extensions[manifesto.MediaType.jpg().toString()] = {
							type: s.Extension,
							name: 'uv-seadragon-extension'
						}),
						(this._extensions[manifesto.MediaType.pdf().toString()] = {
							type: a.Extension,
							name: 'uv-pdf-extension'
						}),
						(this._extensions[manifesto.MediaType.mp4().toString()] = {
							type: i.Extension,
							name: 'uv-av-extension'
						}),
						(this._extensions[manifesto.MediaType.webm().toString()] = {
							type: i.Extension,
							name: 'uv-av-extension'
						}),
						(this._extensions[manifesto.MediaType.threejs().toString()] = {
							type: u.Extension,
							name: 'uv-virtex-extension'
						}),
						(this._extensions.av = { type: i.Extension, name: 'uv-av-extension' }),
						(this._extensions.video = { type: i.Extension, name: 'uv-av-extension' }),
						(this._extensions['audio/mp3'] = { type: i.Extension, name: 'uv-av-extension' }),
						(this._extensions['audio/mp4'] = { type: i.Extension, name: 'uv-av-extension' }),
						(this._extensions['application/vnd.apple.mpegurl'] = {
							type: i.Extension,
							name: 'uv-av-extension'
						}),
						(this._extensions['application/dash+xml'] = {
							type: i.Extension,
							name: 'uv-av-extension'
						}),
						(this._extensions['default'] = { type: o.Extension, name: 'uv-default-extension' }),
						this.set(this.options.data),
						t
					);
				}),
				(t.prototype.data = function () {
					return {
						annotations: void 0,
						root: './uv',
						canvasIndex: 0,
						collectionIndex: 0,
						config: void 0,
						configUri: void 0,
						embedded: !1,
						iiifResourceUri: '',
						isLightbox: !1,
						isReload: !1,
						limitLocales: !1,
						locales: [{ name: 'en-GB' }],
						manifestIndex: 0,
						rangeId: void 0,
						rotation: 0,
						sequenceIndex: 0,
						xywh: ''
					};
				}),
				(t.prototype.set = function (e) {
					if (this.extension)
						l.UVUtils.propertiesChanged(e, this.extension.data, [
							'collectionIndex',
							'manifestIndex',
							'config',
							'configUri',
							'domain',
							'embedDomain',
							'embedScriptUri',
							'iiifResourceUri',
							'isHomeDomain',
							'isLightbox',
							'isOnlyInstance',
							'isReload',
							'locales',
							'root'
						])
							? ((this.extension.data = Object.assign({}, this.extension.data, e)),
							  this._reload(this.extension.data))
							: ((this.extension.data = Object.assign({}, this.extension.data, e)),
							  this.extension.render());
					else {
						if (!e.iiifResourceUri) return void this._error('iiifResourceUri is required.');
						e.root && e.root.endsWith('/') && (e.root = e.root.substring(0, e.root.length - 1)),
							this._reload(e);
					}
				}),
				(t.prototype.get = function (e) {
					return this.extension ? this.extension.data[e] : void 0;
				}),
				(t.prototype._reload = function (e) {
					var t = this;
					$.disposePubSub(),
						$.subscribe(n.BaseEvents.RELOAD, function (e, i) {
							t.fire(n.BaseEvents.RELOAD, i);
						});
					var i = $(this.options.target);
					i.empty(), i.addClass('loading'), (jQuery.support.cors = !0);
					var o = this;
					Manifold.loadManifest({
						iiifResourceUri: e.iiifResourceUri,
						collectionIndex: e.collectionIndex,
						manifestIndex: e.manifestIndex,
						sequenceIndex: e.sequenceIndex,
						canvasIndex: e.canvasIndex,
						rangeId: e.rangeId,
						locale: e.locales ? e.locales[0].name : void 0
					})
						.then(function (t) {
							var n = t.getTrackingLabel();
							(n += document.referrer), (window.trackingLabel = n);
							var i;
							if (void 0 !== e.sequenceIndex && ((i = t.getSequenceByIndex(e.sequenceIndex)), !i))
								return void o._error('Sequence ' + e.sequenceIndex + ' not found.');
							var r;
							if ((void 0 !== e.canvasIndex && (r = t.getCanvasByIndex(e.canvasIndex)), !r))
								return void o._error('Canvas ' + e.canvasIndex + ' not found.');
							var s = void 0,
								a = r.getContent();
							if (a.length) {
								var u = a[0],
									l = u.getBody();
								if (l && l.length) {
									var c = l[0].getFormat();
									if (c) {
										if (((s = o._extensions[c.toString()]), !s)) {
											var h = l[0].getType();
											h && (s = o._extensions[h.toString()]);
										}
									} else {
										var h = l[0].getType();
										h && (s = o._extensions[h.toString()]);
									}
								}
							} else {
								var p = r.getType();
								if ((p && (s = o._extensions[p.toString()]), !s)) {
									var c = r.getProperty('format');
									s = o._extensions[c];
								}
							}
							s || (s = o._extensions['default']),
								o._configure(e, s, function (n) {
									(e.config = n),
										o._injectCss(e, s, function () {
											o._createExtension(s, e, t);
										});
								});
						})
						['catch'](function () {
							o._error('Failed to load manifest.');
						});
				}),
				(t.prototype._isCORSEnabled = function () {
					return Modernizr.cors;
				}),
				(t.prototype._error = function (e) {
					this.fire(n.BaseEvents.ERROR, e);
				}),
				(t.prototype._configure = function (e, t, n) {
					var i = this;
					this._getConfigExtension(e, t, function (o) {
						if (e.locales) {
							var r = e.root + '/lib/' + t.name + '.' + e.locales[0].name + '.config.json';
							$.getJSON(r, function (r) {
								i._extendConfig(e, t, r, o, n);
							});
						}
					});
				}),
				(t.prototype._extendConfig = function (e, t, n, i, o) {
					(n.name = t.name), i && ((n.uri = e.configUri), $.extend(!0, n, i)), o(n);
				}),
				(t.prototype._getConfigExtension = function (e, t, n) {
					if (e.locales) {
						var i = sessionStorage.getItem(t.name + '.' + e.locales[0].name),
							o = e.configUri;
						if (i) n(JSON.parse(i));
						else if (o)
							if (this._isCORSEnabled())
								$.getJSON(o, function (e) {
									n(e);
								});
							else {
								var r = {
									url: o,
									type: 'GET',
									dataType: 'jsonp',
									jsonp: 'callback',
									jsonpCallback: 'configExtensionCallback'
								};
								$.ajax(r),
									(window.configExtensionCallback = function (e) {
										n(e);
									});
							}
						else n(null);
					}
				}),
				(t.prototype._injectCss = function (e, t, n) {
					if (e.locales) {
						var i = e.root + '/themes/' + e.config.options.theme + '/css/' + t.name + '/theme.css',
							o = e.locales[0].name,
							r = t.name.toLowerCase() + '-theme-' + o.toLowerCase(),
							s = $('#' + r.toLowerCase());
						s.length
							? n()
							: ($('head').append(
									'<link rel="stylesheet" id="' + r + '" href="' + i.toLowerCase() + '" />'
							  ),
							  n());
					}
				}),
				(t.prototype._createExtension = function (e, t, n) {
					(this.extension = new e.type()),
						this.extension &&
							((this.extension.component = this),
							(this.extension.data = t),
							(this.extension.helper = n),
							(this.extension.name = e.name),
							this.extension.create());
				}),
				(t.prototype.exitFullScreen = function () {
					this.extension && this.extension.exitFullScreen();
				}),
				(t.prototype.resize = function () {
					this.extension && this.extension.resize();
				}),
				t
			);
		})(_Components.BaseComponent);
		t['default'] = c;
	}
),
	'function' == typeof jQuery &&
		define('jquery', [], function () {
			return jQuery;
		}),
	(function () {
		function e(e, t) {
			t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
			var n = document.createEvent('CustomEvent');
			return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
		}
		return 'function' == typeof window.CustomEvent
			? !1
			: ((e.prototype = window.Event.prototype), void (window.CustomEvent = e));
	})(),
	requirejs(
		[
			'./lib/base64.min.js',
			'./lib/browserdetect.js',
			'./lib/detectmobilebrowser.js',
			'./lib/jquery.xdomainrequest.js',
			'./lib/modernizr.js',
			'./lib/ex.es3.min.js',
			'./lib/BaseComponent.js',
			'./lib/KeyCodes.js',
			'./lib/HTTPStatusCode.js',
			'./lib/jquery-plugins.js',
			'./lib/ba-tiny-pubsub.js',
			'./lib/manifesto.js',
			'./lib/manifold.js',
			'./lib/Utils.js',
			'./lib/xss.min.js',
			'URLDataProvider',
			'UVComponent'
		],
		function (e, t, n, i, o, r, s, a, u, l, c, h, p, d, f, g, v) {
			(window.UV = v['default']),
				(window.UV.URLDataProvider = g['default']),
				window.dispatchEvent(new CustomEvent('uvLoaded', {}));
		}
	),
	define('app', function () {});
