/** @jsx React.DOM */
'use strict'
var React = require("react");
var BookList = require("./BookList");
var Book = require("./Book");
var BookActions = require('../../actions/BookActions');
var ExternalSearchStore = require('../../stores/ExternalSearchStore');
var assign = require('object-assign');



module.exports = React.createClass({

    typingTimer: null, //timer identifier
    doneTypingInterval: 1000, //time in ms, 5 second for example
    getInitialState: function() {
        return {
            books:[],
            searching: false
        };
    },
    handleOnChange: function(e) {
        this.setState({
            searching: true
        });
        //wait til user is done typing
        //setup before functions

        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(function() {
            ExternalSearchStore.getAll(e.target.value, function(books){
                this.setState({
                    books:books,
                    searching:false
                    })
            }.bind(this))
           // BookActions.searchExternal(e.target.value);
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
        <BookList books = {this.state.books}>
                <Book onClick={this.handleAddBook} clickText = {"Add Book"}  />
        </BookList>

    </div>
        )
    }
});