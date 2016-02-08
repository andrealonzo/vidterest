/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var Book = require("./Book");
var BookActions = require('../../actions/BookActions');
var BookStore = require('../../stores/BookStore');


module.exports = React.createClass({
    setBooksState: function() {
        BookStore.getUserRequests(function(books) {
            var outstandingRequests = books.filter(function(book){
                return (!book.user_request.approved);
            });
            var approvedRequests = books.filter(function(book){
                return (book.user_request.approved);
            });
            this.setState({
                outstandingRequests:outstandingRequests,
                approvedRequests:approvedRequests
            });
        }.bind(this));
    },
    getInitialState: function() {
        return{
            outstandingRequests:[],
            approvedRequests:[]
        }
    },
    componentDidMount: function() {
        this.setBooksState();
        BookStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange);
    },
    handleRemoveRequest:function(book){
        BookActions.removeRequest(book);
    },
    render: function() {
        return (
             <div >
        <h1>My Outstanding Requests</h1>
        <BookList books = {this.state.outstandingRequests}>
            <Book onClick={this.handleRemoveRequest} clickText = {"Remove Request"}  />
        </BookList >
    
        <h1>My Approved Requests</h1>
        <BookList books = {this.state.approvedRequests}>
            <Book onClick={this.handleRemoveRequest} clickText = {"Remove Request"}  />
        </BookList >
         
    </div>
        )
    },
        /**
     * Event handler for 'change' events coming from the BookStore
     */
    _onChange: function() {
        this.setBooksState();
    }
});