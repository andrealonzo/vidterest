/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");

var AllBooks = React.createClass({


    render: function() {
        return (
            <div>
            <h1>All Books</h1>
            <BookList books = {this.props.books} bookClickAction = {this.handleRequestBook} bookClickText = {"Request Book"} />

        </div>

        )
    },  


});

module.exports = AllBooks;