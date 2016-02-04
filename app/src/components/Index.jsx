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
var BookStore = require('../../stores/BookStore');
require("../css/main.scss")
var assign = require('object-assign');


/**
 * Retrieve the current Books data from the BookStore
 */
function getBooksState() {
    return {
        books: BookStore.getAll()
    };
}

var App = React.createClass({
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
            <div>
                <Navigation user={this.state.user} onPageChange={ this.handlePageChange}/>
            
                <div className="container text-center">
                    <p></p>
                    {this.state.showPage=="My Books"?
                    <MyBooks books = {this.state.books}/>: 
                    this.state.showPage=="Add a Book"?
                    <AddBooks/>:
                    <AllBooks books={this.state.books}/> }
                </div>
            </div>
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
    <App/>,
    document.getElementById('app')
);