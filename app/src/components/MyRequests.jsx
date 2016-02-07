/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var BookActions = require('../../actions/BookActions');
var BookStore = require('../../stores/BookStore');


module.exports = React.createClass({
    setBooksState: function() {
        BookStore.getUserRequests(function(books) {
            this.setState({
                outstandingRequests:books
            });
        }.bind(this));
    },
    getInitialState: function() {
        return{
            outstandingRequests:[]
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
        <BookList books = {this.state.outstandingRequests} bookClickAction = {this.handleRemoveRequest} bookClickText = {"Remove Request"} />
    
        <h1>My Approved Requests</h1>
        
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