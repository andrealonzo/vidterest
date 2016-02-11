var AppDispatcher = require('../dispatcher/AppDispatcher');
var BookConstants = require('../constants/BookConstants');
var AjaxFunctions = require('../common/AjaxFunctions');

var BookActions = {

    addBook:function(book){
        var url = "/api/books/";
        AjaxFunctions.post(url, book, function(err, data){
            if(err){
               console.log("error adding data", err);
            }else{
                AppDispatcher.dispatch({
                    actionType: BookConstants.BOOKS_UPDATE
                });
            }
            
        });
    },
    removeBook:function(book){
        
        var url = "/api/books/";
        
        AjaxFunctions.delete(url, JSON.stringify(book), function(err, data){
            if(err){
               console.log("error deleting book", err);
            }else{
                AppDispatcher.dispatch({
                    actionType: BookConstants.BOOKS_UPDATE
                });
            }
            
        });
       
    },
    requestBook:function(book){
        var url = "/api/books/request";
        AjaxFunctions.post(url, book, function(err, data){
            if(err){
               console.log("error requesting book", err);
            }else{
                AppDispatcher.dispatch({
                    actionType: BookConstants.BOOKS_UPDATE
                });
            }
            
        });
    },
    removeRequest:function(book){
        var url = "/api/books/request";
        AjaxFunctions.delete(url, JSON.stringify(book), function(err, data){
            if(err){
               console.log("error removing request", err);
            }else{
                AppDispatcher.dispatch({
                    actionType: BookConstants.BOOKS_UPDATE
                });
            }
            
        });
    },
    
    approveRequest:function(book){
        var url = "/api/books/request/approve/";
        AjaxFunctions.post(url, book, function(err, data){
            if(err){
               console.log("error approving request", err);
            }else{
                AppDispatcher.dispatch({
                    actionType: BookConstants.BOOKS_UPDATE
                });
            }
            
        });
    }


};

module.exports = BookActions;
