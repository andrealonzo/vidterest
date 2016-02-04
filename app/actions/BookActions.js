var AppDispatcher = require('../dispatcher/AppDispatcher');
var BookConstants = require('../constants/BookConstants');

var BookActions = {

    loadAll: function() {
        var url = "/api/books/";
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            success: function(data) {
                AppDispatcher.dispatch({
                    actionType: BookConstants.BOOKS_LOAD,
                    data: data
                });
            },
            error: function(data) {
                console.log("error receiving data", data);
                AppDispatcher.dispatch({
                    actionType: BookConstants.BOOKS_LOAD,
                    data: []
                });
            },
            dataType: 'json'
        });

    },
    addBook:function(book){
        var url = "/api/books/";
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(book),
            contentType: "application/json",
            success: function(data) {
                //once book is added, load all the books again
                this.loadAll();
            }.bind(this),
            error: function(data) {
               console.log("error adding data", data);

            },
            dataType: 'json'
        });
    },
    removeBook:function(book){
        var url = "/api/books/";
        $.ajax({
            type: "DELETE",
            url: url,
            data: JSON.stringify(book),
            contentType: "application/json",
            success: function(data) {
                //once book is remove, load all the books again
                this.loadAll();
            }.bind(this),
            error: function(data) {
               console.log("error remove data", data);
            },
            dataType: 'json'
        });
    },
    searchExternal: function(searchTerm) {
        if (!searchTerm) {
            AppDispatcher.dispatch({
                    actionType: BookConstants.SEARCH_EXTERNAL_RESULTS,
                    data: []
                });
            return;
        }
        var url = "/api/searchExternal/" + searchTerm;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            success: function(data) {
                AppDispatcher.dispatch({
                    actionType: BookConstants.SEARCH_EXTERNAL_RESULTS,
                    data: data
                });
            }.bind(this),
            error: function(data) {
                 console.log("error receiving data", data);
                 AppDispatcher.dispatch({
                    actionType: BookConstants.SEARCH_EXTERNAL_RESULTS,
                    data: []
                });
            }.bind(this),
            dataType: 'json'
        });
    },


};

module.exports = BookActions;
