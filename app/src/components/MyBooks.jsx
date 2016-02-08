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

            //sort books based on pending, and approved requests
            books.sort(function(book1, book2) {
                if (!book1.user_request && !book2.user_request)

                {
                    return 0;
                }
                if (!book1.user_request && book2.user_request.approved) {
                    return -1;
                }
                if (!book1.user_request && !book2.user_request.approved) {
                    return 1;
                }
                if (!book2.user_request && book1.user_request.approved) {
                    return 1;
                }
                if (!book2.user_request && !book1.user_request.approved) {
                    return -1;
                }
                return book1.user_request.approved - book2.user_request.approved;
            })
            this.setState({
                books: books
            });
        }.bind(this));
    },
    getInitialState: function() {
        return {
            books: []
        }
    },
    componentDidMount: function() {
        this.setBooksState();
        BookStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange);
    },
    handleRemoveBook: function(book) {
        BookActions.removeBook(book);
    },
    handleDenyRequest: function(book) {
        BookActions.removeRequest(book);
    },
    handleApproveRequest: function(book) {
        BookActions.approveRequest(book);
    },
    render: function() {
        return (
            <div >
        <h1>My Books</h1>
        <BookList books = {this.state.books} >
            <Book onClick={this.handleRemoveBook} clickText = {"Remove Book"} displayRequestActions = {true} onApproveRequest={this.handleApproveRequest} onDenyRequest={this.handleDenyRequest}  />
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