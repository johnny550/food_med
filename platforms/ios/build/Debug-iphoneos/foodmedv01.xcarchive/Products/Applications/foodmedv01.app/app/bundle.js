module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 	    delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = global["webpackHotUpdate"];
/******/ 	global["webpackHotUpdate"] =     function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 	        hotAddUpdateChunk(chunkId, moreModules);
/******/ 	        if (parentHotUpdateCallback) {
/******/ 	            parentHotUpdateCallback(chunkId, moreModules);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadUpdateChunk(chunkId) {
/******/ 	        const requestPath = './' + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 	        try {
/******/ 	            require(requestPath);
/******/ 	        } catch (e) {
/******/ 	            console.log("Hot download for update chunk failed.");
/******/ 	            console.error(e);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadManifest() {
/******/ 	        return new Promise(function (resolve, reject) {
/******/ 	            const requestPath = './' + "" + hotCurrentHash + ".hot-update.json";
/******/ 	            try {
/******/ 	                const update = require(requestPath);
/******/ 	                resolve(update);
/******/ 	            } catch (e) {
/******/ 	                console.log("Hot download for manifest failed.");
/******/ 	                console.error(e);
/******/ 	                reject(e);
/******/ 	            }
/******/ 	        });
/******/ 	    }
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2148808b18b6ee70c9d3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./main.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/CS/HowDoYouFeel.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NowMeal_Questions2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/NowMeal/Questions2.vue");
/* harmony import */ var tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/tns-core-modules/ui/image/image.js");
/* harmony import */ var tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/data/observable-array/observable-array.js");
/* harmony import */ var tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      questions: new tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2__["ObservableArray"]([{
        id: 1,
        text: "Difficulties swallowing",
        accronym: "SwallowingDifficulties"
      }, {
        id: 2,
        text: "Feelt solid food stuck in my chest",
        accronym: "StuckFood"
      }, {
        id: 3,
        text: "Had loose stools",
        accronym: "LooseStools"
      }, {
        id: 4,
        text: "Had a sudden bowel movement",
        accronym: "SuddenBowelMvt"
      }, {
        id: 5,
        text: "Felt heaviness in my stomach",
        accronym: "StomachHeaviness"
      }, {
        id: 6,
        text: "Lower abdomen bloating",
        accronym: "AbdomenBloating"
      }, {
        id: 7,
        text: "Fatigue",
        accronym: "Fatigue"
      }, {
        id: 8,
        text: "Weakness",
        accronym: "Weakness"
      }])
    };
  },

  methods: {
    nextPage() {
      /* console.log(
        "in store weakness-------------------------" + this.$store.getters.weakness
      ) ;
            console.log(
        "in store ftaigue-------------------------" + this.$store.getters.fatigue
      );
            console.log(
        "in store loose stools-------------------------" + this.$store.getters.looseStools
      );
                  console.log(
        "in store stuck Food-------------------------" + this.$store.getters.stuckFood
      );
                        console.log(
        "in store swallowingDifficulties-------------------------" + this.$store.getters.swallowingDifficulties
      );
                        console.log(
        "in store suddenBowelMvt-------------------------" + this.$store.getters.suddenBowelMvt
      );
                        console.log(
        "in store stomachHeaviness-------------------------" + this.$store.getters.stomachHeaviness
      );
                        console.log(
        "in store abdomenBloating-------------------------" + this.$store.getters.abdomenBloating
      ); */
      this.$navigateTo(_NowMeal_Questions2__WEBPACK_IMPORTED_MODULE_0__["default"]);
    },

    onItemTap(_ref) {
      let {
        index,
        object
      } = _ref;
      //parameter: event when no observable array
      const newImage = new tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_1__["Image"]();
      newImage.src = "~/assets/images/icon_check.png";
      newImage.height = 20;
      newImage.width = 20;

      var frame = __webpack_require__("../node_modules/tns-core-modules/ui/frame/frame.js");

      var myPage = frame.topmost().currentPage;
      var place = myPage.getViewById(this.questions.getItem(index).id);
      place.addChild(newImage);
      console.log("image srccc:  " + place);
      this.$store.commit("set" + this.questions.getItem(index).accronym, true); //no observable array
      // this.$store.commit("set" + event.item.accronym, true);
      //save all answers in the store

      /*      var variableName= event.item.getterAccronym
      console.log("getter called through  "+variableName )
      console.log("checking if store reference is working:   "+this.$store.getters.variableName)
      if(this.$store.getters.variableName === true){
      this.$store.commit("set" + event.item.accronym, false);
         console.log("onItemTap****************************************"+this.$store.getters.variableName);
      }
      else{
         this.$store.commit("set" + event.item.accronym, true);
         console.log("onItemTap//////////////////////////////////////////////"+this.$store.getters.variableName);
      } */
    },

    deselection(_ref2) {
      let {
        index,
        object
      } = _ref2;

      var frame = __webpack_require__("../node_modules/tns-core-modules/ui/frame/frame.js");

      var myPage = frame.topmost().currentPage;
      var place = myPage.getViewById(this.questions.getItem(index).id);
      place.removeChildren(); // let itemSelected = this.questions.getItem(index);

      this.$store.commit("set" + this.questions.getItem(index).accronym, false);
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Log in/Login.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MealSubmission_NewM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/MealSubmission/NewM.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      userNameInput: "",
      passwordInput: ""
    };
  },

  methods: {
    onButtonTap() {
      //this.$router.pushClear('NewMeal')
      this.$navigateTo(_MealSubmission_NewM__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/MealSubmission/NewM.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CS_HowDoYouFeel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/CS/HowDoYouFeel.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {};
  },

  methods: {
    onNavigationButtonTap() {
      frameModule.topmost().goBack();
    },

    onOpenDrawerTap() {
      console.log("opening");
      this.$refs.drawer.showDrawer();
    },

    onCloseDrawerTap() {
      this.$refs.drawer.closeDrawer();
    },

    onToggleDrawerTap() {
      this.$refs.drawer.toggleDrawerState();
    },

    addANewMeal() {
      this.$navigateTo(_CS_HowDoYouFeel__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/NowMeal/Questions2.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tns_core_modules_data_observable_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/data/observable-array/observable-array.js");
/* harmony import */ var tns_core_modules_data_observable_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_data_observable_array__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CS_HowDoYouFeel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/CS/HowDoYouFeel.vue");
/* harmony import */ var _meal_pic_final_invest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/meal_pic/final_invest.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      meals: new tns_core_modules_data_observable_array__WEBPACK_IMPORTED_MODULE_0__["ObservableArray"]([{
        name: "Breakfast",
        common: "Meal"
      }, {
        name: "Lunch",
        common: "Meal"
      }, {
        name: "Dinner",
        common: "Meal"
      }, {
        name: "Snack",
        common: "Meal"
      }]),
      userAppetite: 0,
      userCondition: 0
    };
  },

  methods: {
    onItemTap(_ref) {
      let {
        index,
        object
      } = _ref;
      //Save value in the store
      // console.log("0000000000000000000000000000000000000000000  "+this.meals.getItem(index).common+"      "+object);
      this.$store.commit("set" + this.meals.getItem(index).common, this.meals.getItem(index).name);
    },

    goForward() {
      if (this.userAppetite == 0) {
        this.$store.commit("setAppetite", "Not hungry");
      } else if (this.userAppetite == 1) {
        this.$store.commit("setAppetite", "hungry");
      } else if (this.userAppetite == 2) {
        this.$store.commit("setAppetite", "Ravenous");
      }

      if (this.userCondition == 0) {
        this.$store.commit("setCondition", "Not feeling well");
      } else if (this.userCondition == 1) {
        this.$store.commit("setCondition", "Not bad");
      } else if (this.userCondition == 2) {
        this.$store.commit("setCondition", "SUper genki");
      }

      this.$navigateTo(_meal_pic_final_invest__WEBPACK_IMPORTED_MODULE_2__["default"]);
    },

    goBack() {
      this.$navigateTo(_CS_HowDoYouFeel__WEBPACK_IMPORTED_MODULE_1__["default"], {
        animated: true,
        transition: {
          name: "fade",
          duration: 1000,
          curve: "linear"
        }
      });
    },

    deselection(_ref2) {
      let {
        index,
        object
      } = _ref2;
      let itemSelected = this.meals.getItem(index).common;
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/meal_pic/final_invest.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nativescript_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-camera/camera.js");
/* harmony import */ var nativescript_camera__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_camera__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nativescript_imagepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-imagepicker/imagepicker.js");
/* harmony import */ var nativescript_imagepicker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_imagepicker__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/data/observable-array/observable-array.js");
/* harmony import */ var tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/tns-core-modules/ui/image/image.js");
/* harmony import */ var tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _NowMeal_Questions2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./components/NowMeal/Questions2.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




 //import {Folder} from "tns-core-modules/file-system"

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      images: [],
      options: new tns_core_modules_data_observable_array_observable_array__WEBPACK_IMPORTED_MODULE_2__["ObservableArray"]([{
        id: 1,
        name: "flour",
        accronym: "Flour"
      }, {
        id: 2,
        name: "wheat",
        accronym: "Wheat"
      }, {
        id: 3,
        name: "tofu",
        accronym: "Tofu"
      }, {
        id: 4,
        name: "gluten",
        accronym: "Gluten"
      }, {
        id: 5,
        name: "beans",
        accronym: "Beans"
      }])
    };
  },

  methods: {
    selectPicture() {
      let context = nativescript_imagepicker__WEBPACK_IMPORTED_MODULE_1__["create"]({
        mode: "single"
      });
      context.authorize().then(function () {
        return context.present();
      }).then(selection => {
        selection.forEach(selected => {
          let img = new tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_3__["Image"]();
          img.src = selected;
          this.images = img;
          this.$store.commit("setImageRecuperee", true);
          console.log("taille:  " + JSON.stringify(this.images.src));

          if (selected.ios) {
            console.log("we are on ios");
            const ios = selected.ios;

            if (ios && ios.mediaType === PHAssetMediaType.Image) {
              const opt = PHImageRequestOptions.new();
              const imageData = Object.create(NSData);
              const dataUTI = '';
              const orientation = Object.create(UIImageOrientation);
              const info = Object.create(NSDictionary);
              opt.version = PHImageRequestOptionsVersion.Current;
              PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler( //ios, opt, (imageData: NSData, dataUTI: string, orientation: UIImageOrientation, info: NSDictionary<any, any>) => {
              ios, opt, (imageData, dataUTI, orientation, info) => {
                console.log("image info ooooooooo" + info.objectForKey("PHImageFileURLKey").toString());
                this.$store.commit('setImagePath', info.objectForKey("PHImageFileURLKey").toString().replace("file://", ""));
              });
            }
          }

          if (selected.android) {
            console.log("we are on android"); //console.log(JSON.stringify(selected));

            this.$store.commit("setImagePath", this.images.src._android);
            console.log("path        " + this.$store.getters.imagePath); //console.log("img.src   :  "+JSON.stringify(img.src))
          }
        });
      }).catch(function (e) {
        console.log("error in selectPicture", e);
      });
    },

    deletePicture(event) {//console.log("eeeeeeeeeeee"+ this.images.indexOf({img})
      // this.images.splice(this.images.indexOf(img),1);
    },

    takePicture() {
      nativescript_camera__WEBPACK_IMPORTED_MODULE_0__["requestPermissions"]().then(() => {
        nativescript_camera__WEBPACK_IMPORTED_MODULE_0__["takePicture"]({
          width: 300,
          height: 300,
          keepAspectRatio: true,
          saveToGallery: true
        }).then(imageAsset => {
          if (imageAsset.ios) {
            console.log("i     o     s");
            const ios = imageAsset.ios;

            if (ios && ios.mediaType === PHAssetMediaType.Image) {
              const opt = PHImageRequestOptions.new();
              const imageData = Object.create(NSData);
              const dataUTI = '';
              const orientation = Object.create(UIImageOrientation);
              const info = Object.create(NSDictionary);
              opt.version = PHImageRequestOptionsVersion.Current;
              PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler( //ios, opt, (imageData: NSData, dataUTI: string, orientation: UIImageOrientation, info: NSDictionary<any, any>) => {
              ios, opt, (imageData, dataUTI, orientation, info) => {
                console.log("info of image" + info.objectForKey("PHImageFileURLKey").toString());
                this.$store.commit('setImagePath', info.objectForKey("PHImageFileURLKey").toString().replace("file://", ""));
              });
            }
          }

          if (imageAsset.android) {
            console.log("a    n    d   r   o   i   d  ");
            this.$store.commit("setImagePath", imageAsset.android);
          }

          let img = new tns_core_modules_ui_image__WEBPACK_IMPORTED_MODULE_3__["Image"]();
          img.src = imageAsset;
          this.images = img; //this.images.push(img);

          this.$store.commit("setImageRecuperee", true); //console.log('ive got '+this.images.length+' images now.');
        }).catch(e => {
          console.log("error:", e);
        });
      }).catch(e => {
        console.log("Error requesting permission");
      });
    },

    onItemTap(_ref) {
      let {
        index,
        object
      } = _ref;
      this.$store.commit("set" + this.options.getItem(index).accronym, true);
    },

    deselection(_ref2) {
      let {
        index,
        object
      } = _ref2;
      this.$store.commit("set" + this.options.getItem(index).accronym, false);
    },

    submit() {
      //submit to server
      // file path and url
      console.log("testtesttest    " + this.$store.getters.imagePath);
      var file = this.$store.getters.imagePath;
      var url = "http://210.146.64.139:8080/MealRecorder/save_file";
      var name = file.substr(file.lastIndexOf("/") + 1); //console.log("image name:---------------------" + name);
      // upload configuration

      var bghttp = __webpack_require__("../node_modules/nativescript-background-http/background-http.js");

      var session = bghttp.session("image-upload");
      var params = [{
        name: "patientID",
        value: "12345"
      }, {
        name: "imageFile",
        filename: file,
        mimeType: "image/jpg"
      }];
      var imageFile = {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "File-Name": name
        },
        description: "Uploading " + name
      };
      var task = session.multipartUpload(params, imageFile);
      task.on("complete", event => {
        console.log("Uploaded `" + this.images + "`");
      });
      task.on("error", event => {
        console.log(event);
        console.log("Could not upload `" + this.images + "`. " + event.error);
      });
      this.$store.commit('setImagePath', "");
    },

    goBack() {
      this.$store.commit("setImageRecuperee", false);
      this.$navigateTo(_NowMeal_Questions2__WEBPACK_IMPORTED_MODULE_4__["default"]);
    }

  }
});

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/CS/HowDoYouFeel.vue?vue&type=template&id=f411c144&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c(
        "ActionBar",
        {
          staticClass: "menu-bar",
          attrs: { title: "Meal reporting application" }
        },
        [
          _c(
            "GridLayout",
            { attrs: { columns: "auto, *" } },
            [
              _c("Label", {
                staticClass: "el1",
                attrs: { text: "Meal reporting application", col: "0" }
              }),
              _c("Image", {
                staticClass: "icon-left",
                attrs: {
                  src: "~/assets/images/icon_user.png",
                  width: "18",
                  height: "18"
                },
                on: {
                  tap: function($event) {
                    _vm.$refs.drawer.nativeView.showDrawer()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _c(
        "RadSideDrawer",
        {
          ref: "drawer",
          attrs: { drawerContentSize: "160", drawerLocation: "Right" }
        },
        [
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:drawerContent",
                  arg: "drawerContent",
                  modifiers: {}
                }
              ],
              staticClass: "drawer-placer",
              attrs: { backgroundColor: "#ffffff" }
            },
            [
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Notifications" }
              }),
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Logout" }
              })
            ],
            1
          ),
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:mainContent",
                  arg: "mainContent",
                  modifiers: {}
                }
              ]
            },
            [
              _c("Label", {
                staticClass: "announcer",
                attrs: {
                  text:
                    "Please specify how you felt after your previous meal by selecting one or more options below",
                  textWrap: "true"
                }
              }),
              _c(
                "RadListView",
                {
                  ref: "listView",
                  staticClass: "questionnaire-style",
                  attrs: {
                    orientation: "vertical",
                    height: "500",
                    selectionBehavior: "Press",
                    multipleSelection: "true",
                    items: _vm.questions,
                    "+alias": "question"
                  },
                  on: {
                    itemTap: _vm.onItemTap,
                    itemDeselected: _vm.deselection
                  }
                },
                [
                  _c("v-template", {
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var question = ref.question
                          var $index = ref.$index
                          var $even = ref.$even
                          var $odd = ref.$odd
                          return _c(
                            "FlexBoxLayout",
                            {
                              key: question.id,
                              staticClass: "condition-elements",
                              attrs: { id: "place" }
                            },
                            [
                              _c("StackLayout", {
                                staticClass: "check-drawer",
                                attrs: { id: question.id }
                              }),
                              _c("Label", {
                                staticStyle: { marginTop: "20" },
                                attrs: {
                                  clas: "el",
                                  text: question.text,
                                  textWrap: "true"
                                }
                              })
                            ],
                            1
                          )
                        }
                      }
                    ])
                  })
                ],
                1
              ),
              _c(
                "FlexBoxLayout",
                {
                  staticClass: "full-height",
                  attrs: { flexDirection: "column", justifyContent: "center" }
                },
                [
                  _c("Image", {
                    staticClass: "icon-margin",
                    attrs: {
                      src: "~/assets/images/icon_progress.png",
                      width: "50",
                      height: "50"
                    },
                    on: { tap: _vm.nextPage }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Log in/Login.vue?vue&type=template&id=06a4e496&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { attrs: { actionBarHidden: "true" } },
    [
      _c("ActionBar", { staticClass: "action-bar", attrs: { title: "login" } }),
      _c(
        "Gradient",
        {
          staticClass: "test",
          attrs: { direction: "to right", colors: "#39B994,#337FC7" }
        },
        [
          _c(
            "FlexBoxLayout",
            {
              staticClass: "full-height",
              attrs: { flexDirection: "column", justifyContent: "center" }
            },
            [
              _c("Image", {
                staticClass: "logo-container",
                attrs: { src: "~/assets/images/nsvue_logo.png" }
              }),
              _c(
                "StackLayout",
                { staticClass: "the-container" },
                [
                  _c(
                    "FlexBoxLayout",
                    {
                      staticClass: "border-bottom",
                      attrs: { alignItems: "center" }
                    },
                    [
                      _c("Image", {
                        staticClass: "icon-margin",
                        attrs: {
                          src: "~/assets/images/icon_user.png",
                          width: "16",
                          height: "16"
                        }
                      }),
                      _c("TextField", {
                        staticClass: "form-input",
                        attrs: { hint: "User name", text: _vm.userNameInput },
                        on: {
                          textChange: function($event) {
                            _vm.userNameInput = $event.value
                          }
                        }
                      })
                    ],
                    1
                  ),
                  _c(
                    "FlexBoxLayout",
                    {
                      staticClass: "border-bottom",
                      attrs: { alignItems: "center" }
                    },
                    [
                      _c("Image", {
                        staticClass: "icon-margin",
                        attrs: {
                          src: "~/assets/images/icon_lock.png",
                          width: "16",
                          height: "16"
                        }
                      }),
                      _c("TextField", {
                        staticClass: "form-input",
                        attrs: {
                          hint: "Password",
                          secure: "true",
                          text: _vm.passwordInput
                        },
                        on: {
                          textChange: function($event) {
                            _vm.passwordInput = $event.value
                          }
                        }
                      })
                    ],
                    1
                  ),
                  _c("Button", {
                    staticClass: "my-button",
                    attrs: { text: "Login" },
                    on: { tap: _vm.onButtonTap }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/MealSubmission/NewM.vue?vue&type=template&id=5d23ffe2&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c(
        "ActionBar",
        { staticClass: "menu-bar" },
        [
          _c(
            "GridLayout",
            { attrs: { columns: "auto, *" } },
            [
              _c("Label", {
                staticClass: "el1",
                attrs: { text: "Meal reporting application", col: "0" }
              }),
              _c("Image", {
                staticClass: "icon-left",
                attrs: {
                  src: "~/assets/images/icon_user.png",
                  width: "18",
                  height: "18"
                },
                on: {
                  tap: function($event) {
                    _vm.$refs.drawer.nativeView.showDrawer()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _c(
        "RadSideDrawer",
        {
          ref: "drawer",
          attrs: { drawerContentSize: "160", drawerLocation: "Right" }
        },
        [
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:drawerContent",
                  arg: "drawerContent",
                  modifiers: {}
                }
              ],
              staticClass: "drawer-placer",
              attrs: { backgroundColor: "#ffffff" }
            },
            [
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Notifications" }
              }),
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Logout" }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:mainContent",
                  arg: "mainContent",
                  modifiers: {}
                }
              ],
              attrs: { columns: "auto", rows: "auto" }
            },
            [
              _c("Button", {
                staticClass: "my-button",
                attrs: { text: "New meal" },
                on: { tap: _vm.addANewMeal }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/NowMeal/Questions2.vue?vue&type=template&id=71ca3bd6&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c(
        "ActionBar",
        {
          staticClass: "menu-bar",
          attrs: { title: "Meal reporting application" }
        },
        [
          _c(
            "GridLayout",
            { attrs: { columns: "auto, *" } },
            [
              _c("Label", {
                staticClass: "el1",
                attrs: { text: "Meal reporting application", col: "0" }
              }),
              _c("Image", {
                staticClass: "icon-left",
                attrs: {
                  src: "~/assets/images/icon_user.png",
                  width: "18",
                  height: "18"
                },
                on: {
                  tap: function($event) {
                    _vm.$refs.drawer.nativeView.showDrawer()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _c(
        "RadSideDrawer",
        {
          ref: "drawer",
          attrs: { drawerContentSize: "160", drawerLocation: "Right" }
        },
        [
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:drawerContent",
                  arg: "drawerContent",
                  modifiers: {}
                }
              ],
              staticClass: "drawer-placer",
              attrs: { backgroundColor: "#ffffff" }
            },
            [
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Notifications" }
              }),
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Logout" }
              })
            ],
            1
          ),
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:mainContent",
                  arg: "mainContent",
                  modifiers: {}
                }
              ]
            },
            [
              _c(
                "StackLayout",
                { staticClass: "condition-elements-meal-box" },
                [
                  _c(
                    "RadListView",
                    {
                      ref: "listView",
                      attrs: {
                        selectionBehavior: "Press",
                        multipleSelection: "false",
                        items: _vm.meals,
                        "+alias": "meal"
                      },
                      on: {
                        itemTap: _vm.onItemTap,
                        itemDeselected: _vm.deselection
                      }
                    },
                    [
                      _c("v-template", {
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(ref) {
                              var meal = ref.meal
                              var $index = ref.$index
                              var $even = ref.$even
                              var $odd = ref.$odd
                              return _c(
                                "StackLayout",
                                {
                                  staticClass: "item",
                                  attrs: { orientation: "vertical" }
                                },
                                [
                                  _c("Label", {
                                    staticClass: "meals",
                                    attrs: { text: meal.name }
                                  })
                                ],
                                1
                              )
                            }
                          }
                        ])
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _c(
                "StackLayout",
                { staticClass: "condition-elements-box-sliders" },
                [
                  _c(
                    "StackLayout",
                    { staticClass: "slider_detail" },
                    [
                      _c("Label", {
                        staticClass: "A_and_C",
                        attrs: { text: "Appetite", textWrap: "true" }
                      }),
                      _c("Slider", {
                        attrs: {
                          minValue: "0",
                          maxValue: "2",
                          value: _vm.userAppetite
                        },
                        on: {
                          valueChange: function($event) {
                            _vm.userAppetite = $event.value
                          }
                        }
                      })
                    ],
                    1
                  ),
                  _c(
                    "StackLayout",
                    { staticClass: "slider_detail" },
                    [
                      _c("Label", {
                        staticClass: "A_and_C",
                        attrs: { text: "Condition", textWrap: "true" }
                      }),
                      _c("Slider", {
                        attrs: {
                          minValue: "0",
                          maxValue: "2",
                          value: _vm.userCondition
                        },
                        on: {
                          valueChange: function($event) {
                            _vm.userCondition = $event.value
                          }
                        }
                      })
                    ],
                    1
                  ),
                  _c(
                    "FlexBoxLayout",
                    {
                      staticClass: "full-height-down",
                      attrs: { flexDirection: "row", justifyContent: "center" }
                    },
                    [
                      _c("Image", {
                        staticClass: "icon-margin",
                        attrs: {
                          src: "~/assets/images/icon_regress.png",
                          width: "50",
                          height: "50"
                        },
                        on: { tap: _vm.goBack }
                      }),
                      _c("Image", {
                        staticClass: "icon-margin",
                        attrs: {
                          src: "~/assets/images/icon_progress.png",
                          width: "50",
                          height: "50"
                        },
                        on: { tap: _vm.goForward }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/meal_pic/final_invest.vue?vue&type=template&id=26b4e294&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c(
        "ActionBar",
        {
          staticClass: "menu-bar",
          attrs: { title: "Meal reporting application" }
        },
        [
          _c(
            "GridLayout",
            { attrs: { columns: "auto, *" } },
            [
              _c("Label", {
                staticClass: "el1",
                attrs: { text: "Meal reporting application", col: "0" }
              }),
              _c("Image", {
                staticClass: "icon-left",
                attrs: {
                  src: "~/assets/images/icon_user.png",
                  width: "18",
                  height: "18"
                },
                on: {
                  tap: function($event) {
                    _vm.$refs.drawer.nativeView.showDrawer()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _c(
        "RadSideDrawer",
        {
          ref: "drawer",
          attrs: { drawerContentSize: "160", drawerLocation: "Right" }
        },
        [
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:drawerContent",
                  arg: "drawerContent",
                  modifiers: {}
                }
              ],
              staticClass: "drawer-placer",
              attrs: { backgroundColor: "#ffffff" }
            },
            [
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Notifications" }
              }),
              _c("Label", {
                staticClass: "drawer-item",
                attrs: { text: "Logout" }
              })
            ],
            1
          ),
          _c(
            "StackLayout",
            {
              directives: [
                {
                  name: "view",
                  rawName: "v-view:mainContent",
                  arg: "mainContent",
                  modifiers: {}
                }
              ]
            },
            [
              _c(
                "FlexboxLayout",
                { staticClass: "meal_image_container" },
                [
                  _c("Image", {
                    attrs: {
                      src: "~/assets/images/icon_camera.png",
                      width: "50",
                      height: "50"
                    },
                    on: { tap: _vm.takePicture }
                  }),
                  this.$store.getters.imageRecuperee
                    ? _c("Image", {
                        attrs: {
                          src: _vm.images.src,
                          width: "170",
                          height: "170",
                          text: _vm.images
                        },
                        on: {
                          tap: _vm.deletePicture,
                          textChange: function($event) {
                            _vm.images = $event.value
                          }
                        }
                      })
                    : _vm._e(),
                  !this.$store.getters.imageRecuperee
                    ? _c("Image", {
                        attrs: {
                          src: "~/assets/images/icon_meal.png",
                          width: "150"
                        }
                      })
                    : _vm._e(),
                  _c("Image", {
                    attrs: {
                      src: "~/assets/images/icon_image.png",
                      width: "50",
                      height: "50"
                    },
                    on: { tap: _vm.selectPicture }
                  })
                ],
                1
              ),
              _c(
                "StackLayout",
                [
                  _c(
                    "WrapLayout",
                    {
                      staticStyle: { marginTop: "20" },
                      attrs: {
                        orientation: "horizontal",
                        width: "420",
                        height: "10",
                        backgroundColor: "white"
                      }
                    },
                    [
                      _c("Label", {
                        attrs: {
                          text: "",
                          width: "100%",
                          height: "3",
                          backgroundColor: "black"
                        }
                      })
                    ],
                    1
                  ),
                  _c("Label", {
                    staticClass: "ann_police",
                    attrs: { text: "My meal contains" }
                  })
                ],
                1
              ),
              _c(
                "RadListView",
                {
                  ref: "listView",
                  staticClass: "questionnaire-style",
                  attrs: {
                    orientation: "vertical",
                    height: "350",
                    selectionBehavior: "Press",
                    multipleSelection: "true",
                    items: _vm.options,
                    "+alias": "option"
                  },
                  on: {
                    itemTap: _vm.onItemTap,
                    itemDeselected: _vm.deselection
                  }
                },
                [
                  _c("v-template", {
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var option = ref.option
                          var $index = ref.$index
                          var $even = ref.$even
                          var $odd = ref.$odd
                          return _c(
                            "StackLayout",
                            {
                              key: option.id,
                              staticClass: "condition-elements-ingredients"
                            },
                            [
                              _c("Label", {
                                staticStyle: { marginTop: "20" },
                                attrs: {
                                  clas: "el",
                                  text: option.name,
                                  textWrap: "true"
                                }
                              })
                            ],
                            1
                          )
                        }
                      }
                    ])
                  })
                ],
                1
              ),
              _c(
                "FlexBoxLayout",
                {
                  staticClass: "full-height",
                  attrs: { flexDirection: "row", justifyContent: "center" }
                },
                [
                  _c("Image", {
                    staticClass: "icon-margin",
                    attrs: {
                      src: "~/assets/images/icon_regress.png",
                      width: "50",
                      height: "50"
                    },
                    on: { tap: _vm.goBack }
                  }),
                  _c("Image", {
                    staticClass: "icon-margin",
                    attrs: {
                      src: "~/assets/images/icon_progress.png",
                      width: "50",
                      height: "50"
                    },
                    on: { tap: _vm.submit }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.scss": "./app.scss"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$";

/***/ }),

/***/ "./Store/Modules/Answers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const state = {
  swallowingDifficulties: false,
  stuckFood: false,
  looseStools: false,
  suddenBowelMvt: false,
  stomachHeaviness: false,
  abdomenBloating: false,
  fatigue: false,
  weakness: false
};
const mutations = {
  setSwallowingDifficulties(state, payload) {
    state.swallowingDifficulties = payload;
  },

  setStuckFood(state, payload) {
    state.stuckFood = payload;
  },

  setLooseStools(state, payload) {
    state.looseStools = payload;
  },

  setSuddenBowelMvt(state, payload) {
    state.suddenBowelMvt = payload;
  },

  setStomachHeaviness(state, payload) {
    state.stomachHeaviness = payload;
  },

  setAbdomenBloating(state, payload) {
    state.abdomenBloating = payload;
  },

  setFatigue(state, payload) {
    state.fatigue = payload;
  },

  setWeakness(state, payload) {
    state.weakness = payload;
  }

};
const getters = {
  swallowingDifficulties(state) {
    return state.swallowingDifficulties;
  },

  stuckFood(state) {
    return state.stuckFood;
  },

  looseStools(state) {
    return state.looseStools;
  },

  suddenBowelMvt(state) {
    return state.suddenBowelMvt;
  },

  stomachHeaviness(state) {
    return state.stomachHeaviness;
  },

  abdomenBloating(state) {
    return state.abdomenBloating;
  },

  fatigue(state) {
    return state.fatigue;
  },

  weakness(state) {
    return state.weakness;
  }

};
const actions = {}; // export this module.

/* harmony default export */ __webpack_exports__["default"] = ({
  state,
  mutations,
  actions,
  getters
});

/***/ }),

/***/ "./Store/Modules/Ingredients.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const state = {
  flour: false,
  gluten: false,
  beans: false,
  tofu: false,
  wheat: false,
  imageRecuperee: false,
  imagePath: ''
};
const mutations = {
  setFlour(state, payload) {
    state.flour = payload;
  },

  setGluten(state, payload) {
    state.gluten = payload;
  },

  setBeans(state, payload) {
    state.beans = payload;
  },

  setTofu(state, payload) {
    state.tofu = payload;
  },

  setWheat(state, payload) {
    state.wheat = payload;
  },

  setImageRecuperee(state, payload) {
    state.imageRecuperee = payload;
  },

  setImagePath(state, payload) {
    state.imagePath = payload;
  }

};
const getters = {
  flour(state) {
    return state.flour;
  },

  gluten(state) {
    return state.gluten;
  },

  beans(state) {
    return state.beans;
  },

  tofu(state) {
    return state.tofu;
  },

  wheat(state) {
    return state.wheat;
  },

  imageRecuperee(state) {
    return state.imageRecuperee;
  },

  imagePath(state) {
    return state.imagePath;
  }

};
const actions = {}; // export this module.

/* harmony default export */ __webpack_exports__["default"] = ({
  state,
  mutations,
  actions,
  getters
});

/***/ }),

/***/ "./Store/Modules/Meal_Answers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const state = {
  meal: '',
  appetite: '',
  condition: ''
};
const mutations = {
  setMeal(state, payload) {
    state.meal = payload;
  },

  setAppetite(state, payload) {
    state.appetite = payload;
  },

  setCondition(state, payload) {
    state.condition = payload;
  }

};
const getters = {
  meal(state) {
    return state.meal;
  },

  appetite(state) {
    return state.appetite;
  },

  condition(state) {
    return state.condition;
  }

};
const actions = {}; // export this module.

/* harmony default export */ __webpack_exports__["default"] = ({
  state,
  mutations,
  actions,
  getters
});

/***/ }),

/***/ "./Store/store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _Modules_Answers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./Store/Modules/Answers.js");
/* harmony import */ var _Modules_Meal_Answers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./Store/Modules/Meal_Answers.js");
/* harmony import */ var _Modules_Ingredients__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./Store/Modules/Ingredients.js");

 //modules




nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
let debug = "development" !== 'production';
let store = new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  modules: {
    answers: _Modules_Answers__WEBPACK_IMPORTED_MODULE_2__["default"],
    nextAnswers: _Modules_Meal_Answers__WEBPACK_IMPORTED_MODULE_3__["default"],
    ingredients: _Modules_Ingredients__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  strict: debug
});
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$store = store;
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./app.scss":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\r\n * Convenient single import for ruby variables\r\n * Includes base variables with ruby overrides\r\n **/\n/**\r\n * Light variable overrides\r\n **/\n/**\r\n * Ruby variable overrides\r\n **/\n/**\r\n * Color classes\r\n * The following creates this pattern:\r\n * .c-grey{color:#e0e0e0}.c-bg-grey{background-color:#e0e0e0}\r\n**/\n.c-white {\n  color: #fff; }\n\n.c-bg-white {\n  background-color: #fff; }\n\n.c-black {\n  color: #000; }\n\n.c-bg-black {\n  background-color: #000; }\n\n.c-aqua {\n  color: #00caab; }\n\n.c-bg-aqua {\n  background-color: #00caab; }\n\n.c-blue {\n  color: #3d5afe; }\n\n.c-bg-blue {\n  background-color: #3d5afe; }\n\n.c-charcoal {\n  color: #303030; }\n\n.c-bg-charcoal {\n  background-color: #303030; }\n\n.c-brown {\n  color: #795548; }\n\n.c-bg-brown {\n  background-color: #795548; }\n\n.c-forest {\n  color: #006968; }\n\n.c-bg-forest {\n  background-color: #006968; }\n\n.c-grey {\n  color: #e0e0e0; }\n\n.c-bg-grey {\n  background-color: #e0e0e0; }\n\n.c-grey-light {\n  color: #bababa; }\n\n.c-bg-grey-light {\n  background-color: #bababa; }\n\n.c-grey-dark {\n  color: #5c687c; }\n\n.c-bg-grey-dark {\n  background-color: #5c687c; }\n\n.c-purple {\n  color: #8130ff; }\n\n.c-bg-purple {\n  background-color: #8130ff; }\n\n.c-lemon {\n  color: #ffea00; }\n\n.c-bg-lemon {\n  background-color: #ffea00; }\n\n.c-lime {\n  color: #aee406; }\n\n.c-bg-lime {\n  background-color: #aee406; }\n\n.c-orange {\n  color: #f57c00; }\n\n.c-bg-orange {\n  background-color: #f57c00; }\n\n.c-ruby {\n  color: #ff1744; }\n\n.c-bg-ruby {\n  background-color: #ff1744; }\n\n.c-sky {\n  color: #30bcff; }\n\n.c-bg-sky {\n  background-color: #30bcff; }\n\n/* Width/Height */\n.w-full {\n  width: 100%; }\n\n.w-100 {\n  width: 100; }\n\n.h-full {\n  height: 100%; }\n\n.h-100 {\n  height: 100; }\n\n/**\r\n * Margin and Padding\r\n * The following creates this pattern:\r\n * .m-0{margin:0}.m-t-0{margin-top:0}.m-r-0{margin-right:0}.m-b-0{margin-bottom:0}.m-l-0{margin-left:0}.m-x-0{margin-right:0;margin-left:0}.m-y-0{margin-top:0;margin-bottom:0}\r\n * Same for Padding (using the 'p' abbreviation)\r\n * From 0, 2, 5, 10, 15, 20, 25, 30\r\n**/\n.m-0 {\n  margin: 0; }\n\n.m-t-0 {\n  margin-top: 0; }\n\n.m-r-0 {\n  margin-right: 0; }\n\n.m-b-0 {\n  margin-bottom: 0; }\n\n.m-l-0 {\n  margin-left: 0; }\n\n.m-x-0 {\n  margin-right: 0;\n  margin-left: 0; }\n\n.m-y-0 {\n  margin-top: 0;\n  margin-bottom: 0; }\n\n.m-2 {\n  margin: 2; }\n\n.m-t-2 {\n  margin-top: 2; }\n\n.m-r-2 {\n  margin-right: 2; }\n\n.m-b-2 {\n  margin-bottom: 2; }\n\n.m-l-2 {\n  margin-left: 2; }\n\n.m-x-2 {\n  margin-right: 2;\n  margin-left: 2; }\n\n.m-y-2 {\n  margin-top: 2;\n  margin-bottom: 2; }\n\n.m-4 {\n  margin: 4; }\n\n.m-t-4 {\n  margin-top: 4; }\n\n.m-r-4 {\n  margin-right: 4; }\n\n.m-b-4 {\n  margin-bottom: 4; }\n\n.m-l-4 {\n  margin-left: 4; }\n\n.m-x-4 {\n  margin-right: 4;\n  margin-left: 4; }\n\n.m-y-4 {\n  margin-top: 4;\n  margin-bottom: 4; }\n\n.m-5 {\n  margin: 5; }\n\n.m-t-5 {\n  margin-top: 5; }\n\n.m-r-5 {\n  margin-right: 5; }\n\n.m-b-5 {\n  margin-bottom: 5; }\n\n.m-l-5 {\n  margin-left: 5; }\n\n.m-x-5 {\n  margin-right: 5;\n  margin-left: 5; }\n\n.m-y-5 {\n  margin-top: 5;\n  margin-bottom: 5; }\n\n.m-8 {\n  margin: 8; }\n\n.m-t-8 {\n  margin-top: 8; }\n\n.m-r-8 {\n  margin-right: 8; }\n\n.m-b-8 {\n  margin-bottom: 8; }\n\n.m-l-8 {\n  margin-left: 8; }\n\n.m-x-8 {\n  margin-right: 8;\n  margin-left: 8; }\n\n.m-y-8 {\n  margin-top: 8;\n  margin-bottom: 8; }\n\n.m-10 {\n  margin: 10; }\n\n.m-t-10 {\n  margin-top: 10; }\n\n.m-r-10 {\n  margin-right: 10; }\n\n.m-b-10 {\n  margin-bottom: 10; }\n\n.m-l-10 {\n  margin-left: 10; }\n\n.m-x-10 {\n  margin-right: 10;\n  margin-left: 10; }\n\n.m-y-10 {\n  margin-top: 10;\n  margin-bottom: 10; }\n\n.m-12 {\n  margin: 12; }\n\n.m-t-12 {\n  margin-top: 12; }\n\n.m-r-12 {\n  margin-right: 12; }\n\n.m-b-12 {\n  margin-bottom: 12; }\n\n.m-l-12 {\n  margin-left: 12; }\n\n.m-x-12 {\n  margin-right: 12;\n  margin-left: 12; }\n\n.m-y-12 {\n  margin-top: 12;\n  margin-bottom: 12; }\n\n.m-15 {\n  margin: 15; }\n\n.m-t-15 {\n  margin-top: 15; }\n\n.m-r-15 {\n  margin-right: 15; }\n\n.m-b-15 {\n  margin-bottom: 15; }\n\n.m-l-15 {\n  margin-left: 15; }\n\n.m-x-15 {\n  margin-right: 15;\n  margin-left: 15; }\n\n.m-y-15 {\n  margin-top: 15;\n  margin-bottom: 15; }\n\n.m-16 {\n  margin: 16; }\n\n.m-t-16 {\n  margin-top: 16; }\n\n.m-r-16 {\n  margin-right: 16; }\n\n.m-b-16 {\n  margin-bottom: 16; }\n\n.m-l-16 {\n  margin-left: 16; }\n\n.m-x-16 {\n  margin-right: 16;\n  margin-left: 16; }\n\n.m-y-16 {\n  margin-top: 16;\n  margin-bottom: 16; }\n\n.m-20 {\n  margin: 20; }\n\n.m-t-20 {\n  margin-top: 20; }\n\n.m-r-20 {\n  margin-right: 20; }\n\n.m-b-20 {\n  margin-bottom: 20; }\n\n.m-l-20 {\n  margin-left: 20; }\n\n.m-x-20 {\n  margin-right: 20;\n  margin-left: 20; }\n\n.m-y-20 {\n  margin-top: 20;\n  margin-bottom: 20; }\n\n.m-24 {\n  margin: 24; }\n\n.m-t-24 {\n  margin-top: 24; }\n\n.m-r-24 {\n  margin-right: 24; }\n\n.m-b-24 {\n  margin-bottom: 24; }\n\n.m-l-24 {\n  margin-left: 24; }\n\n.m-x-24 {\n  margin-right: 24;\n  margin-left: 24; }\n\n.m-y-24 {\n  margin-top: 24;\n  margin-bottom: 24; }\n\n.m-25 {\n  margin: 25; }\n\n.m-t-25 {\n  margin-top: 25; }\n\n.m-r-25 {\n  margin-right: 25; }\n\n.m-b-25 {\n  margin-bottom: 25; }\n\n.m-l-25 {\n  margin-left: 25; }\n\n.m-x-25 {\n  margin-right: 25;\n  margin-left: 25; }\n\n.m-y-25 {\n  margin-top: 25;\n  margin-bottom: 25; }\n\n.m-28 {\n  margin: 28; }\n\n.m-t-28 {\n  margin-top: 28; }\n\n.m-r-28 {\n  margin-right: 28; }\n\n.m-b-28 {\n  margin-bottom: 28; }\n\n.m-l-28 {\n  margin-left: 28; }\n\n.m-x-28 {\n  margin-right: 28;\n  margin-left: 28; }\n\n.m-y-28 {\n  margin-top: 28;\n  margin-bottom: 28; }\n\n.m-30 {\n  margin: 30; }\n\n.m-t-30 {\n  margin-top: 30; }\n\n.m-r-30 {\n  margin-right: 30; }\n\n.m-b-30 {\n  margin-bottom: 30; }\n\n.m-l-30 {\n  margin-left: 30; }\n\n.m-x-30 {\n  margin-right: 30;\n  margin-left: 30; }\n\n.m-y-30 {\n  margin-top: 30;\n  margin-bottom: 30; }\n\n.p-0 {\n  padding: 0; }\n\n.p-t-0 {\n  padding-top: 0; }\n\n.p-r-0 {\n  padding-right: 0; }\n\n.p-b-0 {\n  padding-bottom: 0; }\n\n.p-l-0 {\n  padding-left: 0; }\n\n.p-x-0 {\n  padding-right: 0;\n  padding-left: 0; }\n\n.p-y-0 {\n  padding-top: 0;\n  padding-bottom: 0; }\n\n.p-2 {\n  padding: 2; }\n\n.p-t-2 {\n  padding-top: 2; }\n\n.p-r-2 {\n  padding-right: 2; }\n\n.p-b-2 {\n  padding-bottom: 2; }\n\n.p-l-2 {\n  padding-left: 2; }\n\n.p-x-2 {\n  padding-right: 2;\n  padding-left: 2; }\n\n.p-y-2 {\n  padding-top: 2;\n  padding-bottom: 2; }\n\n.p-4 {\n  padding: 4; }\n\n.p-t-4 {\n  padding-top: 4; }\n\n.p-r-4 {\n  padding-right: 4; }\n\n.p-b-4 {\n  padding-bottom: 4; }\n\n.p-l-4 {\n  padding-left: 4; }\n\n.p-x-4 {\n  padding-right: 4;\n  padding-left: 4; }\n\n.p-y-4 {\n  padding-top: 4;\n  padding-bottom: 4; }\n\n.p-5 {\n  padding: 5; }\n\n.p-t-5 {\n  padding-top: 5; }\n\n.p-r-5 {\n  padding-right: 5; }\n\n.p-b-5 {\n  padding-bottom: 5; }\n\n.p-l-5 {\n  padding-left: 5; }\n\n.p-x-5 {\n  padding-right: 5;\n  padding-left: 5; }\n\n.p-y-5 {\n  padding-top: 5;\n  padding-bottom: 5; }\n\n.p-8 {\n  padding: 8; }\n\n.p-t-8 {\n  padding-top: 8; }\n\n.p-r-8 {\n  padding-right: 8; }\n\n.p-b-8 {\n  padding-bottom: 8; }\n\n.p-l-8 {\n  padding-left: 8; }\n\n.p-x-8 {\n  padding-right: 8;\n  padding-left: 8; }\n\n.p-y-8 {\n  padding-top: 8;\n  padding-bottom: 8; }\n\n.p-10 {\n  padding: 10; }\n\n.p-t-10 {\n  padding-top: 10; }\n\n.p-r-10 {\n  padding-right: 10; }\n\n.p-b-10 {\n  padding-bottom: 10; }\n\n.p-l-10 {\n  padding-left: 10; }\n\n.p-x-10 {\n  padding-right: 10;\n  padding-left: 10; }\n\n.p-y-10 {\n  padding-top: 10;\n  padding-bottom: 10; }\n\n.p-12 {\n  padding: 12; }\n\n.p-t-12 {\n  padding-top: 12; }\n\n.p-r-12 {\n  padding-right: 12; }\n\n.p-b-12 {\n  padding-bottom: 12; }\n\n.p-l-12 {\n  padding-left: 12; }\n\n.p-x-12 {\n  padding-right: 12;\n  padding-left: 12; }\n\n.p-y-12 {\n  padding-top: 12;\n  padding-bottom: 12; }\n\n.p-15 {\n  padding: 15; }\n\n.p-t-15 {\n  padding-top: 15; }\n\n.p-r-15 {\n  padding-right: 15; }\n\n.p-b-15 {\n  padding-bottom: 15; }\n\n.p-l-15 {\n  padding-left: 15; }\n\n.p-x-15 {\n  padding-right: 15;\n  padding-left: 15; }\n\n.p-y-15 {\n  padding-top: 15;\n  padding-bottom: 15; }\n\n.p-16 {\n  padding: 16; }\n\n.p-t-16 {\n  padding-top: 16; }\n\n.p-r-16 {\n  padding-right: 16; }\n\n.p-b-16 {\n  padding-bottom: 16; }\n\n.p-l-16 {\n  padding-left: 16; }\n\n.p-x-16 {\n  padding-right: 16;\n  padding-left: 16; }\n\n.p-y-16 {\n  padding-top: 16;\n  padding-bottom: 16; }\n\n.p-20 {\n  padding: 20; }\n\n.p-t-20 {\n  padding-top: 20; }\n\n.p-r-20 {\n  padding-right: 20; }\n\n.p-b-20 {\n  padding-bottom: 20; }\n\n.p-l-20 {\n  padding-left: 20; }\n\n.p-x-20 {\n  padding-right: 20;\n  padding-left: 20; }\n\n.p-y-20 {\n  padding-top: 20;\n  padding-bottom: 20; }\n\n.p-24 {\n  padding: 24; }\n\n.p-t-24 {\n  padding-top: 24; }\n\n.p-r-24 {\n  padding-right: 24; }\n\n.p-b-24 {\n  padding-bottom: 24; }\n\n.p-l-24 {\n  padding-left: 24; }\n\n.p-x-24 {\n  padding-right: 24;\n  padding-left: 24; }\n\n.p-y-24 {\n  padding-top: 24;\n  padding-bottom: 24; }\n\n.p-25 {\n  padding: 25; }\n\n.p-t-25 {\n  padding-top: 25; }\n\n.p-r-25 {\n  padding-right: 25; }\n\n.p-b-25 {\n  padding-bottom: 25; }\n\n.p-l-25 {\n  padding-left: 25; }\n\n.p-x-25 {\n  padding-right: 25;\n  padding-left: 25; }\n\n.p-y-25 {\n  padding-top: 25;\n  padding-bottom: 25; }\n\n.p-28 {\n  padding: 28; }\n\n.p-t-28 {\n  padding-top: 28; }\n\n.p-r-28 {\n  padding-right: 28; }\n\n.p-b-28 {\n  padding-bottom: 28; }\n\n.p-l-28 {\n  padding-left: 28; }\n\n.p-x-28 {\n  padding-right: 28;\n  padding-left: 28; }\n\n.p-y-28 {\n  padding-top: 28;\n  padding-bottom: 28; }\n\n.p-30 {\n  padding: 30; }\n\n.p-t-30 {\n  padding-top: 30; }\n\n.p-r-30 {\n  padding-right: 30; }\n\n.p-b-30 {\n  padding-bottom: 30; }\n\n.p-l-30 {\n  padding-left: 30; }\n\n.p-x-30 {\n  padding-right: 30;\n  padding-left: 30; }\n\n.p-y-30 {\n  padding-top: 30;\n  padding-bottom: 30; }\n\n/* Dividers */\n.hr-light {\n  height: 1;\n  background-color: #e0e0e0;\n  width: 100%; }\n\n.hr-dark {\n  height: 1;\n  background-color: #303030;\n  width: 100%; }\n\n/* Alignment */\n.text-left {\n  text-align: left; }\n\n.text-right {\n  text-align: right; }\n\n.text-center {\n  text-align: center; }\n\n.text-lowercase {\n  text-transform: lowercase; }\n\n.text-uppercase {\n  text-transform: uppercase; }\n\n.text-capitalize {\n  text-transform: capitalize; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n/**\r\n * Font size\r\n * The following creates this pattern:\r\n * .t-10{font-size:10}\r\n * From 10, 12, 14, 15, 16, 17, 18, 19, 20\r\n**/\n.t-10 {\n  font-size: 10; }\n\n.t-12 {\n  font-size: 12; }\n\n.t-14 {\n  font-size: 14; }\n\n.t-15 {\n  font-size: 15; }\n\n.t-16 {\n  font-size: 16; }\n\n.t-17 {\n  font-size: 17; }\n\n.t-18 {\n  font-size: 18; }\n\n.t-19 {\n  font-size: 19; }\n\n.t-20 {\n  font-size: 20; }\n\n.t-25 {\n  font-size: 25; }\n\n.t-30 {\n  font-size: 30; }\n\n.img-rounded {\n  border-radius: 5; }\n\n.img-circle {\n  border-radius: 20; }\n\n.img-thumbnail {\n  border-radius: 0; }\n\n.invisible {\n  visibility: collapse; }\n\n.pull-left {\n  horizontal-align: left; }\n\n.pull-right {\n  horizontal-align: right; }\n\n.m-x-auto {\n  horizontal-align: center; }\n\n.m-y-auto {\n  vertical-align: center; }\n\n.text-primary {\n  color: #ffea00; }\n\n.text-danger {\n  color: #d50000; }\n\n.text-muted {\n  color: #9e9e9e; }\n\n.bg-primary {\n  background-color: #ffea00;\n  color: #fff; }\n\n.bg-danger {\n  background-color: #d50000;\n  color: #fff; }\n\n.action-bar {\n  background-color: #ff1744;\n  color: #fff; }\n  .action-bar .action-bar-title {\n    font-weight: bold;\n    font-size: 17;\n    vertical-align: center; }\n  .action-bar .action-item {\n    font-weight: normal; }\n\n.activity-indicator {\n  color: #ffea00;\n  width: 30;\n  height: 30; }\n\n.btn {\n  color: #ffea00;\n  background-color: transparent;\n  min-height: 36;\n  min-width: 64;\n  padding: 10 10 10 10;\n  font-size: 18;\n  margin: 8 16 8 16; }\n  .btn.btn-active:highlighted {\n    color: #fff;\n    background-color: #ffee33; }\n\n.btn-primary {\n  background-color: #ffea00;\n  border-color: #ffea00;\n  color: #303030; }\n  .btn-primary.btn-active:highlighted {\n    background-color: #ccbb00;\n    border-color: #ccbb00; }\n  .btn-primary.btn-aqua {\n    background-color: #00caab; }\n  .btn-primary.btn-blue {\n    background-color: #3d5afe; }\n  .btn-primary.btn-brown {\n    background-color: #795548; }\n  .btn-primary.btn-forest {\n    background-color: #006968; }\n  .btn-primary.btn-grey {\n    background-color: #5c687c; }\n  .btn-primary.btn-lemon {\n    background-color: #ffea00;\n    color: #000; }\n  .btn-primary.btn-lime {\n    background-color: #aee406;\n    color: #000; }\n  .btn-primary.btn-orange {\n    background-color: #f57c00; }\n  .btn-primary.btn-purple {\n    background-color: #8130ff; }\n  .btn-primary.btn-ruby {\n    background-color: #ff1744; }\n  .btn-primary.btn-sky {\n    background-color: #30bcff; }\n\n.btn-outline {\n  background-color: transparent;\n  border-color: #ffea00;\n  color: #ffea00; }\n  .btn-outline.btn-active:highlighted {\n    background-color: #ffee33; }\n\n.btn[isEnabled=false] {\n  color: #a4a4a4;\n  background-color: #e0e0e0;\n  border-color: #e0e0e0; }\n\n.fa {\n  font-family: FontAwesome, fontawesome-webfont; }\n\n.form .input {\n  padding: 16 8 16 8;\n  background-color: transparent; }\n  .form .input.input-border {\n    border-width: 1;\n    border-color: #e0e0e0;\n    border-radius: 2;\n    padding: 16; }\n  .form .input.input-rounded {\n    border-width: 1;\n    border-color: #e0e0e0;\n    border-radius: 28;\n    padding: 16; }\n  .form .input[isEnabled='false'] {\n    background-color: #fafafa; }\n\n.form .input-field {\n  margin: 8; }\n  .form .input-field .label {\n    font-size: 12;\n    color: #bababa; }\n  .form .input-field .input {\n    padding: 0;\n    margin: 0 0 8 0; }\n  .form .input-field .hr-light.active,\n  .form .input-field .hr-dark.active {\n    background-color: #ffea00; }\n  .form .input-field.input-sides .label {\n    font-size: 18;\n    margin: 0 0 8 0; }\n\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 4;\n  font-weight: normal;\n  color: #212121; }\n\n.body,\n.body2,\n.footnote {\n  font-weight: normal;\n  color: #757575; }\n\n.h1 {\n  font-size: 32; }\n\n.h2 {\n  font-size: 22; }\n\n.h3 {\n  font-size: 15; }\n\n.h4 {\n  font-size: 12; }\n\n.h5 {\n  font-size: 11; }\n\n.h6 {\n  font-size: 10; }\n\n.body {\n  font-size: 14; }\n\n.body2 {\n  font-size: 17; }\n\n.footnote {\n  font-size: 13; }\n\n.list-group .list-group-item {\n  color: #212121;\n  font-size: 16;\n  margin: 0;\n  padding: 16; }\n  .list-group .list-group-item Label {\n    vertical-align: center; }\n  .list-group .list-group-item .thumb {\n    stretch: fill;\n    width: 40;\n    height: 40;\n    margin-right: 16; }\n  .list-group .list-group-item.active {\n    background-color: #e0e0e0; }\n  .list-group .list-group-item .list-group-item-text {\n    color: #757575;\n    font-size: 14; }\n\n.page {\n  background-color: #fff; }\n\n.progress {\n  color: #ffea00;\n  background-color: #bababa; }\n\n.segmented-bar {\n  font-size: 13;\n  background-color: #fff;\n  color: #212121;\n  selected-background-color: #ffea00; }\n\n.sidedrawer-left, .sidedrawer-center {\n  background-color: #fafafa; }\n\n.sidedrawer-header {\n  background-color: #fafafa;\n  height: 148;\n  width: 100%; }\n\n.sidedrawer-left .sidedrawer-header {\n  padding: 16 16 0 16; }\n\n.sidedrawer-center .sidedrawer-header {\n  padding: 20 15 0 15; }\n\n.sidedrawer-header-image {\n  background-color: #e0e0e0; }\n\n.sidedrawer-left .sidedrawer-header-image {\n  height: 64;\n  width: 64;\n  border-radius: 32;\n  horizontal-align: left;\n  margin-bottom: 36; }\n\n.sidedrawer-center .sidedrawer-header-image {\n  height: 74;\n  width: 74;\n  border-radius: 37;\n  horizontal-align: center;\n  margin-bottom: 24; }\n\n.sidedrawer-header-brand {\n  color: #737373; }\n\n.sidedrawer-left .sidedrawer-header-brand {\n  horizontal-align: left;\n  font-size: 14; }\n\n.sidedrawer-center .sidedrawer-header-brand {\n  horizontal-align: center;\n  font-size: 15; }\n\n.sidedrawer-list-item {\n  height: 48;\n  horizontal-align: left;\n  width: 100%;\n  orientation: horizontal; }\n  .sidedrawer-list-item .sidedrawer-list-item-icon {\n    width: 24;\n    text-align: center;\n    font-size: 20;\n    height: 48;\n    vertical-align: center; }\n  .sidedrawer-list-item.active {\n    color: #000;\n    background-color: #ffea00; }\n    .sidedrawer-list-item.active .sidedrawer-list-item-icon {\n      color: #000; }\n\n.sidedrawer-left .sidedrawer-list-item-icon {\n  margin: 0 16 0 16; }\n\n.sidedrawer-center .sidedrawer-list-item-icon {\n  margin: 0 0 0 15; }\n\n.sidedrawer-list-item-text {\n  horizontal-align: left;\n  text-align: left;\n  font-size: 15;\n  background-color: transparent;\n  border-width: 0.1;\n  width: 80%;\n  vertical-align: center; }\n\n.sidedrawer-left .sidedrawer-list-item-text {\n  padding-left: 16; }\n\n.sidedrawer-center .sidedrawer-list-item-text {\n  padding-left: 15; }\n\n.slider {\n  background-color: #ffea00; }\n  .slider[isEnabled=false] {\n    background-color: #e0e0e0;\n    color: #e0e0e0; }\n\n.switch[checked=true] {\n  background-color: #ffea00;\n  color: #ffea00; }\n\n.switch[checked=true][isEnabled=false] {\n  background-color: #e0e0e0;\n  color: #fff; }\n\n.switch[isEnabled=false] {\n  background-color: #e0e0e0;\n  color: #e0e0e0; }\n\n.tab-view {\n  /*color: $secondary;*/\n  selected-color: #30bcff;\n  tabs-background-color: #fff; }\n  .tab-view .tab-view-item {\n    background-color: #fff;\n    tabs-background-color: #fff; }\n\n#login-background {\n  margin-top: -20;\n  background-size: cover;\n  background-position: center; }\n\n.login-wrap {\n  padding: 0 40; }\n\n.logo-wrap {\n  margin: 60 0 10 0;\n  padding: 20 0; }\n  .logo-wrap .login-logo {\n    text-align: center;\n    font-size: 30;\n    font-weight: bold;\n    margin-bottom: 10;\n    opacity: 1;\n    color: #212121;\n    opacity: .9; }\n  .logo-wrap .login-logo-sub {\n    color: #212121;\n    opacity: .8;\n    text-align: center; }\n\n.login-wrapper {\n  padding: 20;\n  background-color: #fff;\n  border-radius: 3; }\n  .login-wrapper TextField {\n    padding: 10 10;\n    margin: 10 0 0 0; }\n\n.go-back {\n  font-size: 14;\n  text-align: center;\n  color: #212121;\n  margin-top: 10; }\n\nActionBar {\n  background-color: #53ba82;\n  color: #ffffff; }\n\n.title {\n  text-align: left;\n  padding-left: 16; }\n\n.message {\n  vertical-align: center;\n  text-align: center;\n  font-size: 20;\n  color: #333333; }\n\n.drawer-header {\n  padding: 50 16 16 16;\n  margin-bottom: 16;\n  background-color: #53ba82;\n  color: #ffffff;\n  font-size: 24; }\n\n.drawer-item {\n  padding: 8 16;\n  color: #333333;\n  font-size: 16; }\n\n.border-bottom {\n  border-bottom-width: 1;\n  border-bottom-color: white;\n  margin-bottom: 40;\n  padding-bottom: 8; }\n\n.form-input {\n  color: white;\n  placeholder-color: white; }\n\n.icon-margin {\n  margin-right: 10; }\n\n.icon-margin-more {\n  margin-right: 50; }\n\n.check-drawer {\n  margin-right: 10; }\n\n.my-button {\n  background-color: #48b0b6;\n  color: white;\n  font-weight: bold;\n  border-radius: 25;\n  padding-top: 14;\n  padding-bottom: 14;\n  text-transform: uppercase;\n  letter-spacing: 0.1;\n  margin-bottom: 20;\n  margin-top: 10; }\n\n.full-height {\n  height: 100%;\n  margin-left: 15; }\n\n.full-height-down {\n  margin-top: 10;\n  height: 100%; }\n\n.logo-container {\n  width: 150;\n  margin-bottom: 60; }\n\n.the-container {\n  margin-left: 45;\n  margin-right: 34; }\n\n.condition-elements-meal-box {\n  margin-top: 10;\n  margin-left: 5;\n  padding-right: 20;\n  padding-left: 20;\n  padding-top: 20;\n  width: 250;\n  height: 150;\n  border-radius: 25;\n  border-style: solid;\n  border-width: 2; }\n\n.meal_image_container {\n  margin-top: 15;\n  margin-left: 5;\n  padding-left: 50;\n  height: 130;\n  border-radius: 25;\n  border-style: solid;\n  border-width: 2; }\n\n.questionnaire-style {\n  font-size: 20;\n  font-family: \"Times New Roman\", Times, serif;\n  color: #0e0d0d; }\n\n.condition-elements-ingredients {\n  margin-top: 10;\n  margin-left: 10;\n  text-align: center; }\n\n.condition-elements {\n  margin-top: 20;\n  margin-left: 15; }\n\n.condition-elements-box-sliders {\n  margin-top: 50;\n  margin-left: 15; }\n\n.slider_detail {\n  width: 400;\n  height: 100; }\n\n.condition-elements-right {\n  margin-top: 80;\n  margin-right: 10; }\n\n.el {\n  margin-top: 0;\n  font-size: 20;\n  font-family: \"Varela\";\n  color: black;\n  margin-bottom: 40; }\n\n.ann_police {\n  font-size: 20;\n  font-family: \"Varela\";\n  color: black;\n  margin-top: 10;\n  margin-left: 100; }\n\n.line {\n  width: 112px;\n  height: 47px;\n  border-bottom: 1px solid black;\n  position: absolute; }\n\n.A_and_C {\n  font-size: 25;\n  font-family: \"Varela\";\n  color: #0e0d0d; }\n\n.el1 {\n  font-size: 20;\n  font-family: \"Varela\";\n  color: #f0e8e8; }\n\n.test {\n  background: linear-gradient(to right, #39B994, #337FC7); }\n\n.announcer {\n  font-size: 15;\n  font-family: \"Varela\";\n  color: #0e0d0d; }\n\n.meals {\n  font-size: 20;\n  font-family: \"Varela\";\n  color: #0e0d0d; }\n\n.icon-left {\n  margin-left: 300; }\n\n.menu-bar {\n  background-color: #333333; }\n\n.drawer-placer {\n  background-color: magenta; }\n", ""]);

// exports
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.scss' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/CS/HowDoYouFeel.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/CS/HowDoYouFeel.vue?vue&type=template&id=f411c144&");
/* harmony import */ var _HowDoYouFeel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/CS/HowDoYouFeel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HowDoYouFeel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('f411c144', component.options)
    } else {
      api.reload('f411c144', component.options)
    }
    module.hot.accept("./components/CS/HowDoYouFeel.vue?vue&type=template&id=f411c144&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/CS/HowDoYouFeel.vue?vue&type=template&id=f411c144&");
(function () {
      api.rerender('f411c144', {
        render: _HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/CS/HowDoYouFeel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/CS/HowDoYouFeel.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HowDoYouFeel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/CS/HowDoYouFeel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HowDoYouFeel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/CS/HowDoYouFeel.vue?vue&type=template&id=f411c144&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/CS/HowDoYouFeel.vue?vue&type=template&id=f411c144&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HowDoYouFeel_vue_vue_type_template_id_f411c144___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Log in/Login.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Log in/Login.vue?vue&type=template&id=06a4e496&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Log in/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('06a4e496', component.options)
    } else {
      api.reload('06a4e496', component.options)
    }
    module.hot.accept("./components/Log in/Login.vue?vue&type=template&id=06a4e496&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Log in/Login.vue?vue&type=template&id=06a4e496&");
(function () {
      api.rerender('06a4e496', {
        render: _Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/Log in/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Log in/Login.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Log in/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Log in/Login.vue?vue&type=template&id=06a4e496&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Log in/Login.vue?vue&type=template&id=06a4e496&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_06a4e496___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/MealSubmission/NewM.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/MealSubmission/NewM.vue?vue&type=template&id=5d23ffe2&");
/* harmony import */ var _NewM_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/MealSubmission/NewM.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewM_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('5d23ffe2', component.options)
    } else {
      api.reload('5d23ffe2', component.options)
    }
    module.hot.accept("./components/MealSubmission/NewM.vue?vue&type=template&id=5d23ffe2&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/MealSubmission/NewM.vue?vue&type=template&id=5d23ffe2&");
(function () {
      api.rerender('5d23ffe2', {
        render: _NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/MealSubmission/NewM.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/MealSubmission/NewM.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_NewM_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/MealSubmission/NewM.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_NewM_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/MealSubmission/NewM.vue?vue&type=template&id=5d23ffe2&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/MealSubmission/NewM.vue?vue&type=template&id=5d23ffe2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewM_vue_vue_type_template_id_5d23ffe2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/NowMeal/Questions2.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/NowMeal/Questions2.vue?vue&type=template&id=71ca3bd6&");
/* harmony import */ var _Questions2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/NowMeal/Questions2.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Questions2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('71ca3bd6', component.options)
    } else {
      api.reload('71ca3bd6', component.options)
    }
    module.hot.accept("./components/NowMeal/Questions2.vue?vue&type=template&id=71ca3bd6&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/NowMeal/Questions2.vue?vue&type=template&id=71ca3bd6&");
(function () {
      api.rerender('71ca3bd6', {
        render: _Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/NowMeal/Questions2.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/NowMeal/Questions2.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Questions2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/NowMeal/Questions2.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Questions2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/NowMeal/Questions2.vue?vue&type=template&id=71ca3bd6&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/NowMeal/Questions2.vue?vue&type=template&id=71ca3bd6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Questions2_vue_vue_type_template_id_71ca3bd6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/meal_pic/final_invest.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/meal_pic/final_invest.vue?vue&type=template&id=26b4e294&");
/* harmony import */ var _final_invest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/meal_pic/final_invest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _final_invest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__["render"],
  _final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('26b4e294', component.options)
    } else {
      api.reload('26b4e294', component.options)
    }
    module.hot.accept("./components/meal_pic/final_invest.vue?vue&type=template&id=26b4e294&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/meal_pic/final_invest.vue?vue&type=template&id=26b4e294&");
(function () {
      api.rerender('26b4e294', {
        render: _final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/meal_pic/final_invest.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/meal_pic/final_invest.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_final_invest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/meal_pic/final_invest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_final_invest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/meal_pic/final_invest.vue?vue&type=template&id=26b4e294&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/meal_pic/final_invest.vue?vue&type=template&id=26b4e294&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_final_invest_vue_vue_type_template_id_26b4e294___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./main.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Log_in_Login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Log in/Login.vue");
/* harmony import */ var _Store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./Store/store.js");
/* harmony import */ var nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-ui-listview/vue/index.js");
/* harmony import */ var nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3__);

            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__initialHmrUpdate = true;
            global.__hmrSyncBackup = global.__onLiveSync;

            global.__onLiveSync = function () {
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                if (global.__initialHmrUpdate) {
                    return;
                }

                setTimeout(() => {
                    global.__hmrSyncBackup({ type, path });
                });
            };

            hmrUpdate().then(() => {
                global.__initialHmrUpdate = false;
            })
        }
        
            const context = __webpack_require__("./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$");
            global.registerWebpackModules(context);
            
        __webpack_require__("../node_modules/tns-core-modules/bundle-entry-points.js");
        



/**
 * Remove for an iOs build next in package.json
 */
//import VueDevtools from 'nativescript-vue-devtools'

/**
 * Remove for an iOs build
 */
//if(TNS_ENV !== 'production') {
//  Vue.use(VueDevtools)
//}
// Prints Vue logs when --env.production is *NOT* set while building

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.silent = "development" === 'production';
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(nativescript_ui_listview_vue__WEBPACK_IMPORTED_MODULE_3___default.a);
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.registerElement("Gradient", () => __webpack_require__("../node_modules/nativescript-gradient/gradient.js").Gradient);
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.registerElement('RadSideDrawer', () => __webpack_require__("../node_modules/nativescript-ui-sidedrawer/ui-sidedrawer.js").RadSideDrawer);
new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  store: _Store_store__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: h => h('frame', [h(_components_Log_in_Login__WEBPACK_IMPORTED_MODULE_1__["default"])])
}).$start();
    
        
        
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"android":{"v8Flags":"--expose_gc"},"main":"main","name":"food-med_v01","version":"1.0.0"};

/***/ })

/******/ });