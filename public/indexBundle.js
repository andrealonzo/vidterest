/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var ReactDOM = __webpack_require__(1)
	var React = __webpack_require__(2);
	var Navigation = __webpack_require__(3)
	var MyBooks = __webpack_require__(4)
	var AllBooks = __webpack_require__(6)
	var AddBooks = __webpack_require__(18)
	var Footer = __webpack_require__(19)
	var BookActions = __webpack_require__(7);
	var BookStore = __webpack_require__(15);
	__webpack_require__(20)
	var assign = __webpack_require__(17);


	/**
	 * Retrieve the current Books data from the BookStore
	 */
	function getBooksState() {
	    return {
	        books: BookStore.getAll()
	    };
	}

	var App = React.createClass({displayName: "App",
	    handlePageChange: function(page) {
	        this.setState({
	            showPage: page
	        });
	    },
	    handleLogin: function() {
	        location.reload();
	    },
	    getInitialState: function() {
	        var initialState = assign({}, getBooksState(), {
	            showPage: "AllBooks",
	            user: null
	        });
	        return initialState;
	    },
	    componentDidMount: function() {

	        BookStore.addChangeListener(this._onChange);
	        BookActions.loadAll();
	        this.loadLoggedInUser();
	    },
	    componentWillUnmount: function() {
	        BookStore.removeChangeListener(this._onChange);
	    },
	    loadLoggedInUser: function() {
	        var userApiUrl = "/api/user";
	        $.ajax({
	            type: "GET",
	            url: userApiUrl,
	            contentType: "application/json",
	            success: function(data) {
	                console.log("user successfully retrieved", data);
	                this.setState({
	                    user: data
	                });
	            }.bind(this),
	            error: function(data) {
	                //user not logged in
	                console.log("error receiving user", data);
	                this.setState({
	                    user: null
	                })
	            }.bind(this),
	            dataType: 'json'
	        });
	    },
	    render: function() {
	        return (
	            React.createElement("div", null, 
	                React.createElement(Navigation, {user: this.state.user, onPageChange:  this.handlePageChange}), 
	            
	                React.createElement("div", {className: "container text-center"}, 
	                    React.createElement("p", null), 
	                    this.state.showPage=="My Books"?
	                    React.createElement(MyBooks, {books: this.state.books}): 
	                    this.state.showPage=="Add a Book"?
	                    React.createElement(AddBooks, null):
	                    React.createElement(AllBooks, {books: this.state.books})
	                )
	            )
	        )
	    },
	    /**
	     * Event handler for 'change' events coming from the BookStore
	     */
	    _onChange: function() {
	        this.setState(getBooksState());
	    }
	});


	ReactDOM.render(
	    React.createElement(App, null),
	    document.getElementById('app')
	);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var React = __webpack_require__(2);
	module.exports = React.createClass({displayName: "module.exports",
	        handlePageChange:function(e){
	           e.preventDefault();
	           this.props.onPageChange(e.target.innerText);
	        },
			  render:function(){
			    return(
			       React.createElement("nav", {className: "navbar navbar-default zs-nav"}, 
	        React.createElement("div", {className: "container"}, 
	            React.createElement("div", {className: "navbar-header"}, 
	                React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false"}, 
	                    React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
	                    React.createElement("span", {className: "icon-bar"}), 
	                    React.createElement("span", {className: "icon-bar"}), 
	                    React.createElement("span", {className: "icon-bar"})
	                ), React.createElement("a", {href: "#", className: "navbar-brand", onClick: this.handlePageChange, id: "AllBooks"}, "ZOTSWAP ", React.createElement("span", {className: "zs-subhead"}, "online book exchange"), " ")), 
	            React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 

	                React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
	                    React.createElement("li", null, React.createElement("a", {href: "#", id: "MyRequests", onClick: this.handlePageChange}, React.createElement("div", {className: "zs-nav-button"}, "My Requests"))), 
	                    React.createElement("li", null, React.createElement("a", {href: "#", id: "MyBooks", onClick: this.handlePageChange}, React.createElement("div", {className: "zs-nav-button"}, "My Books"))), 
	                    React.createElement("li", null, React.createElement("a", {href: "#", id: "MyBooks", onClick: this.handlePageChange}, React.createElement("div", {className: "zs-nav-button"}, "Add a Book"))), 
	                    React.createElement("li", null, React.createElement("a", {href: "#", "data-toggle": "modal", "data-target": "#myModal"}, React.createElement("div", {className: "zs-nav-button"}, "Login")))
	                )
	            )
	        )
	    )
	)
			  }
			});
			

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var React = __webpack_require__(2);
	var BookList = __webpack_require__(25);
	var BookActions = __webpack_require__(7);

	module.exports = React.createClass({displayName: "module.exports",
	    
	    handleRemoveBook:function(book){
	        BookActions.removeBook(book);
	    },
	    render: function() {
	        return (
	             React.createElement("div", null, 
	        React.createElement("h1", null, "My Books"), 
	        React.createElement(BookList, {books: this.props.books, bookClickAction: this.handleRemoveBook, bookClickText: "Remove Book"})

	    )
	        )
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var React = __webpack_require__(2);


	module.exports = React.createClass({displayName: "module.exports",

	    handleOnClick:function(){
	      this.props.onClick(this.props.book);  
	    },
	    render: function() {
	        return(
	        React.createElement("div", {key: this.props.book.id, className: "col-sm-3"}, 
	            React.createElement("div", {className: "panel panel-default"}, 
	              React.createElement("div", {className: "panel-body"}, 
	                  
	            React.createElement("img", {className: "img-responsive", src: this.props.book.thumbnail}
	            ), 
	            React.createElement("div", null, React.createElement("a", {href: "#"}, this.props.book.title)), 
	            React.createElement("div", null, this.props.book.authors?this.props.book.authors[0]:null), 
	              React.createElement("button", {className: "btn btn-default", onClick: this.handleOnClick}, this.props.clickText)
	              )
	            )
	        )
	        );
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var React = __webpack_require__(2);
	var BookList = __webpack_require__(25);

	var AllBooks = React.createClass({displayName: "AllBooks",


	    render: function() {
	        return (
	            React.createElement("div", null, 
	            React.createElement("h1", null, "All Books"), 
	            React.createElement(BookList, {books: this.props.books, bookClickAction: this.handleRequestBook, bookClickText: "Request Book"})

	        )

	        )
	    },  


	});

	module.exports = AllBooks;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(8);
	var BookConstants = __webpack_require__(13);

	var BookActions = {

	    loadAll: function() {
	        var url = "/api/books/";
	        $.ajax({
	            type: "GET",
	            url: url,
	            contentType: "application/json",
	            success: function(data) {
	                AppDispatcher.dispatch({
	                    actionType: BookConstants.BOOKS_LOAD,
	                    data: data
	                });
	            },
	            error: function(data) {
	                console.log("error receiving data", data);
	                AppDispatcher.dispatch({
	                    actionType: BookConstants.BOOKS_LOAD,
	                    data: []
	                });
	            },
	            dataType: 'json'
	        });

	    },
	    addBook:function(book){
	        var url = "/api/books/";
	        $.ajax({
	            type: "POST",
	            url: url,
	            data: JSON.stringify(book),
	            contentType: "application/json",
	            success: function(data) {
	                //once book is added, load all the books again
	                this.loadAll();
	            }.bind(this),
	            error: function(data) {
	               console.log("error adding data", data);

	            },
	            dataType: 'json'
	        });
	    },
	    removeBook:function(book){
	        var url = "/api/books/";
	        $.ajax({
	            type: "DELETE",
	            url: url,
	            data: JSON.stringify(book),
	            contentType: "application/json",
	            success: function(data) {
	                //once book is remove, load all the books again
	                this.loadAll();
	            }.bind(this),
	            error: function(data) {
	               console.log("error remove data", data);
	            },
	            dataType: 'json'
	        });
	    },
	    searchExternal: function(searchTerm) {
	        if (!searchTerm) {
	            AppDispatcher.dispatch({
	                    actionType: BookConstants.SEARCH_EXTERNAL_RESULTS,
	                    data: []
	                });
	            return;
	        }
	        var url = "/api/searchExternal/" + searchTerm;
	        $.ajax({
	            type: "GET",
	            url: url,
	            contentType: "application/json",
	            success: function(data) {
	                AppDispatcher.dispatch({
	                    actionType: BookConstants.SEARCH_EXTERNAL_RESULTS,
	                    data: data
	                });
	            }.bind(this),
	            error: function(data) {
	                 console.log("error receiving data", data);
	                 AppDispatcher.dispatch({
	                    actionType: BookConstants.SEARCH_EXTERNAL_RESULTS,
	                    data: []
	                });
	            }.bind(this),
	            dataType: 'json'
	        });
	    },


	};

	module.exports = BookActions;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * AppDispatcher
	 *
	 * A singleton that operates as the central hub for application updates.
	 */

	var Dispatcher = __webpack_require__(9).Dispatcher;

	module.exports = new Dispatcher();


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(10);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(12);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	})();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * TodoConstants
	 */

	var keyMirror = __webpack_require__(14);

	module.exports = keyMirror({
	  BOOKS_LOAD: null,
	  SEARCH_EXTERNAL_RESULTS:null
	});


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	"use strict";

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(8);
	var EventEmitter = __webpack_require__(16).EventEmitter;
	var BookConstants = __webpack_require__(13);
	var assign = __webpack_require__(17);

	var CHANGE_EVENT = 'change';

	var _books = [];

	/**
	 * Create a TODO item.
	 * @param  {string} text The content of the TODO
	 */
	function load(books) {
	  _books = books;
	}

	var BookStore = assign({}, EventEmitter.prototype, {


	  /**
	   * Get the entire collection of TODOs.
	   * @return {object}
	   */
	  getAll: function() {
	    return _books;
	  },

	  emitChange: function() {
	    this.emit(CHANGE_EVENT);
	  },

	  /**
	   * @param {function} callback
	   */
	  addChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },

	  /**
	   * @param {function} callback
	   */
	  removeChangeListener: function(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});

	// Register callback to handle all updates
	AppDispatcher.register(function(action) {
	  var text;

	  switch (action.actionType) {


	    case BookConstants.BOOKS_LOAD:
	      var books = action.data;
	      load(books);
	      BookStore.emitChange();
	      break;

	    default:
	      // no op
	  }
	});

	module.exports = BookStore;


/***/ },
/* 16 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var React = __webpack_require__(2);
	var BookList = __webpack_require__(25);
	var BookActions = __webpack_require__(7);
	var ExternalSearchStore = __webpack_require__(24);
	var assign = __webpack_require__(17);

	function getExternalSearchState() {
	    return {
	        books: ExternalSearchStore.getAll()
	    };
	}

	module.exports = React.createClass({displayName: "module.exports",

	    typingTimer: null, //timer identifier
	    doneTypingInterval: 1000, //time in ms, 5 second for example
	    getInitialState: function() {
	        var initialState = assign({}, getExternalSearchState(), {
	            searching: false
	        });
	        return initialState;
	    },
	    componentDidMount: function() {
	        ExternalSearchStore.addChangeListener(this._onChange);
	    },
	    componentWillUnmount: function() {
	        ExternalSearchStore.removeChangeListener(this._onChange);
	    },
	    handleOnChange: function(e) {
	        this.setState({
	            searching: true
	        });
	        //wait til user is done typing
	        //setup before functions

	        clearTimeout(this.typingTimer);
	        this.typingTimer = setTimeout(function() {
	            BookActions.searchExternal(e.target.value);
	        }.bind(this, e), this.doneTypingInterval);


	    },
	    handleAddBook: function(book) {
	        BookActions.addBook(book);
	    },
	    render: function() {

	        return (
	            React.createElement("div", null, 

	        
	        React.createElement("h1", null, "Add Book"), 
	            React.createElement("div", {className: "form-group"}, 
	                React.createElement("input", {type: "text", className: "form-control", id: "exampleInputName2", placeholder: "Search For a Book To Add", onChange: this.handleOnChange})
	            ), 

	        this.state.searching?React.createElement("img", {src: "/public/img/ajax-loader.gif"}):null, 
	        React.createElement(BookList, {books: this.state.books, bookClickAction: this.handleAddBook, bookClickText: "Add Book"})

	    )
	        )
	    },
	    /**
	     * Event handler for 'change' events coming from the BookStore
	     */
	    _onChange: function() {
	        this.setState(assign({}, getExternalSearchState(), {
	            searching: false
	        }));
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var React = __webpack_require__(2);
	module.exports = React.createClass({displayName: "module.exports",
	    
			  render:function(){
			    return(
			      
			React.createElement("nav", {className: "navbar navbar-default"}, 
	          React.createElement("div", {className: "container text-center"}, 
	           "API provided by Yelp.com.  Site design inspired by zomato.com."
	          )
	        )
	)
			  }
			});
			

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Lato:400,900);", ""]);

	// module
	exports.push([module.id, "body {\n  font-family: 'Lato', sans-serif; }\n\n.zs-nav {\n  background-color: #0064a4;\n  color: white;\n  border-radius: 0px;\n  border: 0px; }\n\n.navbar-default .navbar-brand {\n  color: #ffd200;\n  font-weight: 900; }\n\n.img-responsive {\n  margin: 0 auto; }\n\n.zs-nav-button {\n  color: white; }\n\n.zs-subhead {\n  color: white; }\n", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(8);
	var EventEmitter = __webpack_require__(16).EventEmitter;
	var BookConstants = __webpack_require__(13);
	var assign = __webpack_require__(17);

	var CHANGE_EVENT = 'change';

	var _books = [];

	/**
	 * Create a TODO item.
	 * @param  {string} text The content of the TODO
	 */
	function load(books) {
	  _books = books;
	}


	var ExternalSearchStore = assign({}, EventEmitter.prototype, {

	  /**
	   * Get the entire collection of TODOs.
	   * @return {object}
	   */
	  getAll: function() {
	    return _books;
	  },

	  emitChange: function() {
	    this.emit(CHANGE_EVENT);
	  },

	  /**
	   * @param {function} callback
	   */
	  addChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },

	  /**
	   * @param {function} callback
	   */
	  removeChangeListener: function(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});

	// Register callback to handle all updates
	AppDispatcher.register(function(action) {
	  var text;

	  switch(action.actionType) {
	    
	    
	    case BookConstants.SEARCH_EXTERNAL_RESULTS:
	      var books = action.data;
	      load(books);
	      ExternalSearchStore.emitChange();
	      break;
	      
	    default:
	      // no op
	  }
	});

	module.exports = ExternalSearchStore;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict'
	var React = __webpack_require__(2);
	var Book = __webpack_require__(5);

	var BookList = React.createClass({displayName: "BookList",

	    handleOnClick: function(book) {
	        this.props.bookClickAction(book);
	    },
	    render: function() {

	        var columnsPerRow = 4;
	        return (

	            React.createElement("div", {className: "row"}, 
	        this.props.books.map(function(book, index){
	             var rowEnd;
	             if(index%columnsPerRow == columnsPerRow-1){
	                 rowEnd = React.createElement("div", {className: "clearfix"})
	             }
	            return(
	            React.createElement("div", {key: book.id}, 
	            React.createElement(Book, {book: book, onClick: this.handleOnClick, clickText: this.props.bookClickText}), 
	            rowEnd
	            )
	            )
	        }.bind(this))
	            
	        )

	        )
	    }

	});

	module.exports = BookList;

/***/ }
/******/ ]);