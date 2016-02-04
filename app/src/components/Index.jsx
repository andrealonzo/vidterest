/** @jsx React.DOM */
'use strict'
var ReactDOM = require('react-dom')
var React = require("react");
var Navigation = require('./Navigation')
var MyBooks = require('./MyBooks')
var AllBooks = require('./AllBooks')
var AddBooks = require('./AddBooks')
var Footer = require('./Footer')
var BookActions = require('../../actions/BookActions');
require("../css/main.scss");
var assign = require('object-assign');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;


var App = React.createClass({

    handleLogin: function() {
        location.reload();
    },
    getInitialState: function() {
        return {
            user: null
        };
    },
    componentDidMount: function() {
        BookActions.loadAll();
        this.loadLoggedInUser();
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
        console.log(this.props);
        return (
            <div>
                <Navigation user={this.state.user} onPageChange={ this.handlePageChange}/>
            
                <div className="container text-center">
                    <p></p>
                    {this.props.children}
                </div>
            </div>
        )
    }
});


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="addBooks" component={AddBooks}/>
      <Route path="myBooks" component={MyBooks}/>
      <IndexRoute component={AllBooks}/>
    </Route>
  </Router>
), document.getElementById('app'));
