/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var BookActions = require('../../actions/BookActions');

module.exports = React.createClass({
    
    handleRemoveBook:function(book){
        BookActions.removeBook(book);
    },
    render: function() {
        return (
             <div >
        <h1>My Books</h1>
        <BookList books = {this.props.books} bookClickAction = {this.handleRemoveBook} bookClickText = {"Remove Book"} />

    </div>
        )
    }
});