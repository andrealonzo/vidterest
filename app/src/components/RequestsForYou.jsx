/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var Book = require("./Book");
var BookActions = require('../../actions/BookActions');
var BookStore = require('../../stores/BookStore');


module.exports = React.createClass({
    setBooksState: function() {
        BookStore.getAllFromUser(function(books) {
            var requestsFromOtherUsers = books.filter(function(book){
                return (book.user_request && !book.user_request.approved);
            });
            var approvedRequests = books.filter(function(book){
                return (book.user_request && book.user_request.approved);
            });
            this.setState({
                requestsFromOtherUsers:requestsFromOtherUsers,
                approvedRequests:approvedRequests
            });
        }.bind(this));
    },
    getInitialState: function() {
        return{
            requestsFromOtherUsers:[],
            approvedRequests:[],
        }
    },
    componentDidMount: function() {
        this.setBooksState();
        BookStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange);
    },
    handleApproveRequest:function(book){
        BookActions.approveRequest(book);
    },
    render: function() {
        console.log(this.state.books);
        return (
             <div >
        <h1>Requests From Other Users</h1>
        <BookList books = {this.state.requestsFromOtherUsers}>
           <Book onClick={this.handleApproveRequest} clickText = {"Approve Request"}  />
        </BookList > 
        
        <h1>Requests You've Approved</h1>
        <BookList books = {this.state.approvedRequests}>          
            <Book />
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