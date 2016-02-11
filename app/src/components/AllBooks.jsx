/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var Book = require("./Book");
var AllBooksButtons = require("./AllBooksButtons");
var BookActions = require('../../actions/BookActions');
var BookStore = require('../../stores/BookStore');


var AllBooks = React.createClass({
    setBooksState: function() {
        BookStore.getAll(function(books) {
            this.setState({
                books:books
            });
        }.bind(this));
    },
    getInitialState: function() {
        return {
            books: []
        };
    },
    componentDidMount: function() {
        this.setBooksState();
        BookStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange);
    },
    handleRequestBook: function(book) {
        BookActions.requestBook(book);
    },

    render: function() {
        return (
            <div>
            <h1>All Books</h1>
            <BookList books = {this.state.books}>
                <Book>
                    <AllBooksButtons onClick={this.handleRequestBook}/>
                </Book>
            </BookList>

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

module.exports = AllBooks;