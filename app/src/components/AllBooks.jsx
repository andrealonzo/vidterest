/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var Book = require("./Book");
var AllBooksButtons = require("./AllBooksButtons");
var BookActions = require('../../actions/BookActions');
var BookStore = require('../../stores/BookStore');
var AuthStore = require('../../stores/AuthStore');


var AllBooks = React.createClass({
    setBooksState: function() {
        AuthStore.getLoggedInUser(function(err, user) {
            if (err) { //do nothing
            }
            console.log("logged in user", user);
            BookStore.getAll(function(books) {
                books = books.sort(function(book1, book2) {
                    //check if both books were added by the current user
                    if (user) {
                        if (book1.addedBy._id == user._id && book2.addedBy._id == user._id) {
                            return 0;
                        }
                        //put books added by the current user to the end of the list
                        if (book1.addedBy._id == user._id) {
                            return 1;
                        }
                        if (book2.addedBy._id == user._id) {
                            return -1;
                        }
                    }
                    //check if there are any requests made
                    if (!book1.user_request && !book2.user_request) {
                        return 0;
                    }
                    //put books that have no request to the front of the list
                    if (!book1.user_request) {
                        return -1;
                    }
                    if (!book2.user_request) {
                        return 1;
                    }
                    return book1.user_request.approved - book2.user_request.approved;
                });
                this.setState({
                    books: books
                });
            }.bind(this));

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
        AuthStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange);
        AuthStore.removeChangeListener(this._onChange);
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
                    <AllBooksButtons onClick={this.handleRequestBook} user = {this.props.user}/>
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