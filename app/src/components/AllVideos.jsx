/** @jsx React.DOM */
'use strict'
var React = require("react");
var Masonry = require('react-masonry-component');

var masonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: 300,
    fitWidth: true,
      gutter: 10
};

var AllVideos = React.createClass({


    componentDidMount: function() {
        this.setVideoResizeListeners();
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
    render: function() {
        return (
            
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
    <iframe width="560" height="315" src="https://www.youtube.com/embed/3pzIlq7jZzw" frameBorder="0" allowFullScreen></iframe>
    </div>
       <div className="grid-item">
        <iframe src="https://vine.co/v/h3MKjWWr5XH/embed/simple?audio=1" width="300" height="300" frameBorder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>
    </div>
    
    <div className="grid-item">
    <iframe src="https://player.vimeo.com/video/155043659?title=0&byline=0&portrait=0" width="500" height="281" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
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
    <iframe width="560" height="315" src="https://www.youtube.com/embed/3pzIlq7jZzw" frameBorder="0" frameBorder></iframe>
    </div>
    <div className="grid-item">
    <iframe src="https://player.vimeo.com/video/155043659?title=0&byline=0&portrait=0" width="500" height="281" frameBorder="0" webkitallowfullscreen mozallowfullscreen frameBorder></iframe>
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

        )
    }


});

module.exports = AllVideos;