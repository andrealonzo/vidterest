/** @jsx React.DOM */
'use strict'
var React = require("react");


module.exports = React.createClass({

      getInitialState:function(){
        return {
            books:[]
        };
      },
      componentDidMount:function(){
      },
      handleOnChange:function(e){
          this.search(e.target.value);
      },
      search:function(searchTerm){
        var url = "/api/searchExternal/"+searchTerm;
       $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        success: function(data){
           console.log("Successfully retrieved", data);
           this.setState({books:data});
        }.bind(this),
        error: function(data){
          //user not logged in
           console.log("error receiving data", data);
            this.setState({books:{}})
                }.bind(this),
        dataType: 'json'
      });
      },
      render:function(){
          console.log("calling render",this.state.books);
            return(

    <div className="container text-center">
        <p></p>
        
        <h2>Add Book</h2>
        <form className="form-inline">
            <div className="form-group">
                <input type="text" className="form-control" id="exampleInputName2" placeholder="Search For a Book To Add" onChange={this.handleOnChange}/>
            </div>
        </form>
        <div className="row">
        {this.state.books.map(function(book){
            return(
            <div key = {book.id} className="col-sm-3">
                <div className="panel panel-default">
                  <div className="panel-body">
                      
                <img className="img-responsive" src={book.thumbnail}>
                </img>
                <div><a href="#">{book.title}</a></div>
                <div>{book.authors?book.authors[0]:null}</div>
                  <button className="btn btn-default">Add Book</button>
                  </div>
                </div>
            </div>
            )
        })}
            
        </div>

    </div>
                  )
      }
});