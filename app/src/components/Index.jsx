/** @jsx React.DOM */
'use strict'
var ReactDOM = require('react-dom')
var React = require("react");
var Navigation = require('./Navigation')
var MyBooks = require('./MyBooks')
var AllBooks = require('./AllBooks')
var AddBooks = require('./AddBooks')
var MyRequests = require('./MyRequests')
var EditProfile = require('./EditProfile')
var Login = require('./Login')
var AuthStore = require('../../stores/AuthStore');
require("../css/main.scss");
var assign = require('object-assign');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var Masonry = require('react-masonry-component');

var masonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: 300,
    fitWidth: true,
      gutter: 10
};



var App = React.createClass({

    getInitialState: function() {
        return {
            user: null
        }
    },
    handleLogin: function() {
        location.reload();
    },
    componentDidMount: function() {
        this.setAuthState();
        this.setVideoResizeListeners();
        AuthStore.addChangeListener(this._onChange);

    },
    componentWillUnmount: function() {
        AuthStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps) {
        this.previousChildren = this.props.children

    },
    setVideoResizeListeners: function() {
        // Find all YouTube videos
        var $allVideos = $("iframe[src^='https://vine.co'], iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube.com']");
        // The element that is fluid width
        var $fluidEl = $(".grid-item");

        // Figure out and save aspect ratio for each video
        $allVideos.each(function() {
            $(this)
                .data('aspectRatio', this.height / this.width)
            // and remove the hard coded width/height
            .removeAttr('height')
                .removeAttr('width')
            .addClass('video-item');
                

        });
        // When the window is resized
        $(window).resize(function() {
            var newWidth = $fluidEl.width();
                console.log(newWidth);
            // Resize all videos according to their own aspect ratio
            $allVideos.each(function() {
                var $el = $(this);
                $el
                    .width(newWidth)
                    .height(newWidth * $el.data('aspectRatio'));

            });

            // Kick off one resize to fix all videos on page load
        }).resize();
    },
    setAuthState: function() {
        AuthStore.getLoggedInUser(function(err, user) {
            if (err) {
                //user not logged in
                console.log("user not logged in");
                this.setState({
                    user: null
                })
            }
            else {
                console.log("user successfully retrieved", user);
                this.setState({
                    user: user
                });
            }
        }.bind(this));
    },
    _onChange: function() {
        this.setAuthState();
    },
    render: function() {

        return (
            
                <div className="container-fluid text-center">
                <Navigation user={this.state.user} onPageChange={ this.handlePageChange}/>
            <h1 className="title text-center">Vidterest</h1>
            <div>
            <a href="#"><i className="fa fa-plus-square-o"></i></a>
            </div>
<Masonry className="grid " options={masonryOptions} disableImagesLoaded={false}>
    <div className="grid-sizer"></div>
    <div className="grid-item">
        <blockquote className="instagram-media"  data-instgrm-version="6">
            <div className = "ig-wrapper" >
                <div className = 'ig-image-wrapper'>
                    <div className = 'ig-image' style = {{ background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC)'}}></div>
                </div>
                <p className = 'ig-link-wrapper'> <a className='ig-link' href="https://www.instagram.com/p/_zMLE-K84y/" target="_blank">&nbsp;</a></p>
                <p className='ig-meta' >&nbsp;
                </p>
            </div>
        </blockquote>
    </div>
        <div className="grid-item youtube-item">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/3pzIlq7jZzw" frameborder="0" allowfullscreen></iframe>
    </div>
       <div className="grid-item">
        <iframe src="https://vine.co/v/h3MKjWWr5XH/embed/simple?audio=1" width="300" height="300" frameborder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>
    </div>
    
    <div className="grid-item">
    <iframe src="https://player.vimeo.com/video/155043659?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
    <div className="grid-item">
        <blockquote className="instagram-media"  data-instgrm-version="6">
            <div className = "ig-wrapper" >
                <div className = 'ig-image-wrapper'>
                    <div className = 'ig-image' style = {{ background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC)'}}></div>
                </div>
                <p className = 'ig-link-wrapper'> <a className='ig-link' href="https://www.instagram.com/p/BBES4RhBM1I/"  target="_blank">&nbsp;</a></p>
                <p className='ig-meta' >&nbsp;
                </p>
            </div>
        </blockquote>
    </div>
    
    <div className="grid-item">
        <blockquote className="instagram-media"  data-instgrm-version="6">
            <div className = "ig-wrapper" >
                <div className = 'ig-image-wrapper'>
                    <div className = 'ig-image' style = {{ background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC)'}}></div>
                </div>
                <p className = 'ig-link-wrapper'> <a className='ig-link' href="https://www.instagram.com/p/BBgd3L6vwx6/"  target="_blank">&nbsp;</a></p>
                <p className='ig-meta' >&nbsp;
                </p>
            </div>
        </blockquote>
    </div>
    
    
    <div className="grid-item">
        <blockquote className="instagram-media"  data-instgrm-version="6">
            <div className = "ig-wrapper" >
                <div className = 'ig-image-wrapper'>
                    <div className = 'ig-image' style = {{ background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC)'}}></div>
                </div>
                <p className = 'ig-link-wrapper'> <a className='ig-link' href="https://www.instagram.com/p/kVFiyIAp1w/"  target="_blank">&nbsp;</a></p>
                <p className='ig-meta' >&nbsp;
                </p>
            </div>
        </blockquote>
    </div>
    

 
    
    <div className="grid-item youtube-item">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/3pzIlq7jZzw" frameborder="0" allowfullscreen></iframe>
    </div>
    <div className="grid-item">
    <iframe src="https://player.vimeo.com/video/155043659?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
    <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/look-out.jpg" />
    </div>
    <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/one-world-trade.jpg" />
    </div>
    <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg" />
    </div>
    <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/cat-nose.jpg" />
    </div>
    <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/contrail.jpg" />
    </div>
    <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/golden-hour.jpg" />
    </div>
    <div className="grid-item">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/flight-formation.jpg" />
    </div>
</Masonry>
</div>
            )
            // return (
            //     <div>
            //         <Navigation user={this.state.user} onPageChange={ this.handlePageChange}/>
            //         <div className="container text-center">
            //             <p></p>
            //             {this.props.location.state && this.props.location.state.modal?
            //                 this.previousChildren:null}


        //             {
        //                 //add the user property to each of the children
        //                 React.Children.map(this.props.children, function(child) {
        //                     return React.cloneElement(child, { user: this.state.user });
        //                 }.bind(this))

        //             }

        //         </div>
        //     </div>
        // )
    }
});


ReactDOM.render((
    <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="AddBooks" component={AddBooks}/>
      <Route path="MyBooks" component={MyBooks}/>
      <Route path="MyRequests" component={MyRequests}/>
      <Route path="Login" component={Login}/>
      <Route path="EditProfile" component={EditProfile}/>
      <IndexRoute component={AllBooks}/>
    </Route>
  </Router>
), document.getElementById('app'));
