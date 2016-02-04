/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var BookActions = require('../../actions/BookActions');
var ExternalSearchStore = require('../../stores/ExternalSearchStore');
var assign = require('object-assign');

function getExternalSearchState() {
    return {
        books: ExternalSearchStore.getAll()
    };
}

module.exports = React.createClass({

    typingTimer: null, //timer identifier
    doneTypingInterval: 1000, //time in ms, 5 second for example
    getInitialState: function() {
        var initialState = assign({}, getExternalSearchState(), {
            searching: false
        });
        return initialState;
    },
    componentDidMount: function() {
        ExternalSearchStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ExternalSearchStore.removeChangeListener(this._onChange);
    },
    handleOnChange: function(e) {
        this.setState({
            searching: true
        });
        //wait til user is done typing
        //setup before functions

        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(function() {
            BookActions.searchExternal(e.target.value);
        }.bind(this, e), this.doneTypingInterval);


    },
    handleAddBook: function(book) {
        BookActions.addBook(book);
    },
    render: function() {

        return (
            <div >

        
        <h1>Add Book</h1>
            <div className="form-group">
                <input type="text" className="form-control" id="exampleInputName2" placeholder="Search For a Book To Add" onChange={this.handleOnChange}/>
            </div>

        {this.state.searching?<img src="/public/img/ajax-loader.gif"></img>:null}
        <BookList books = {this.state.books} bookClickAction = {this.handleAddBook} bookClickText = {"Add Book"} />

    </div>
        )
    },
    /**
     * Event handler for 'change' events coming from the BookStore
     */
    _onChange: function() {
        this.setState(assign({}, getExternalSearchState(), {
            searching: false
        }));
    }
});