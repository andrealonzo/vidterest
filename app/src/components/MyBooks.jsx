/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var BookActions = require('../../actions/BookActions');
var BookStore = require('../../stores/BookStore');


module.exports = React.createClass({
    setBooksState: function() {
        BookStore.getAllFromUser(function(books) {
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
    handleRemoveBook:function(book){
        BookActions.removeBook(book);
    },
    render: function() {
        console.log(this.state.books);
        return (
             <div >
        <h1>My Books</h1>
        <BookList books = {this.state.books} bookClickAction = {this.handleRemoveBook} bookClickText = {"Remove Book"} />
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