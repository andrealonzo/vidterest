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
	var AddBooks = __webpack_require__(4)
	var Footer = __webpack_require__(6)

	var App = React.createClass({displayName: "App",
	      handleLogin:function(){
	        location.reload();
	      },
	      getInitialState:function(){
	        return {user:null};
	      },
	      componentDidMount:function(){
	        this.loadLoggedInUser();
	      },
	      loadLoggedInUser:function(){
	        var userApiUrl = "/api/user";
	       $.ajax({
	        type: "GET",
	        url: userApiUrl,
	        contentType: "application/json",
	        success: function(data){
	           console.log("user successfully retrieved", data);
	           this.setState({user:data});
	        }.bind(this),
	        error: function(data){
	          //user not logged in
	           console.log("error receiving user", data);
	            this.setState({user:null})
	                }.bind(this),
	        dataType: 'json'
	      });
	      },
	      render:function(){
	            return(
	                  React.createElement("div", null, 
	                        React.createElement(Navigation, {user: this.state.user}), 
	                        React.createElement(AddBooks, null), 
	                        React.createElement(Footer, null)
	                  )
	                  )
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
	                ), React.createElement("div", {className: "navbar-brand"}, "ZOTSWAP ", React.createElement("span", {className: "zs-subhead"}, "online book exchange"), " ")), 
	            React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 

	                React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
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


	module.exports = React.createClass({displayName: "module.exports",

	      getInitialState:function(){
	        return {
	            books:[]
	        };
	      },
	      componentDidMount:function(){
	      },
	      handleOnChange:function(e){
	          this.search(e.target.value);
	      },
	      search:function(searchTerm){
	        var url = "/api/searchExternal/"+searchTerm;
	       $.ajax({
	        type: "GET",
	        url: url,
	        contentType: "application/json",
	        success: function(data){
	           console.log("Successfully retrieved", data);
	           this.setState({books:data});
	        }.bind(this),
	        error: function(data){
	          //user not logged in
	           console.log("error receiving data", data);
	            this.setState({books:{}})
	                }.bind(this),
	        dataType: 'json'
	      });
	      },
	      render:function(){
	          console.log("calling render",this.state.books);
	            return(

	    React.createElement("div", {className: "container text-center"}, 
	        React.createElement("p", null), 
	        
	        React.createElement("h2", null, "Add Book"), 
	        React.createElement("form", {className: "form-inline"}, 
	            React.createElement("div", {className: "form-group"}, 
	                React.createElement("input", {type: "text", className: "form-control", id: "exampleInputName2", placeholder: "Search For a Book To Add", onChange: this.handleOnChange})
	            )
	        ), 
	        React.createElement("div", {className: "row"}, 
	        this.state.books.map(function(book){
	            return(
	            React.createElement("div", {key: book.id, className: "col-sm-3"}, 
	                React.createElement("div", {className: "panel panel-default"}, 
	                  React.createElement("div", {className: "panel-body"}, 
	                      
	                React.createElement("img", {className: "img-responsive", src: book.thumbnail}
	                ), 
	                React.createElement("div", null, React.createElement("a", {href: "#"}, book.title)), 
	                React.createElement("div", null, book.authors?book.authors[0]:null), 
	                  React.createElement("button", {className: "btn btn-default"}, "Add Book")
	                  )
	                )
	            )
	            )
	        })
	            
	        )

	    )
	                  )
	      }
	});

/***/ },
/* 5 */,
/* 6 */
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
			

/***/ }
/******/ ]);