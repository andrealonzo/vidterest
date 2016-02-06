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
                books:books
            });
        }.bind(this));
    },
    getInitialState: function() {
        return{
            books:[]
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
        <h1>My Requests</h1>
        <BookList books = {this.state.books} bookClickAction = {this.handleRemoveRequest} bookClickText = {"Remove Request"} />
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