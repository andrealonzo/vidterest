/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var BookActions = require('../../actions/BookActions');
var BookStore = require('../../stores/BookStore');
/**
 * Retrieve the current Books data from the BookStore
 */
function getBooksState() {
    return {
        books: BookStore.getAll()
    };
}
var AllBooks = React.createClass({
getInitialState: function() {
        return getBooksState();
    },
    componentDidMount: function() {

        BookStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange);
    },
    handleRemoveBook:function(book){
        BookActions.removeBook(book);
    },

    render: function() {
        return (
            <div>
            <h1>All Books</h1>
            <BookList books = {this.state.books} bookClickAction = {this.handleRequestBook} bookClickText = {"Request Book"} />

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

module.exports = AllBooks;