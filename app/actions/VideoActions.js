var VideoConstants = require('../constants/VideoConstants');
var AjaxFunctions = require('../common/AjaxFunctions');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var VideoActions = {

    addVideo: function(videoUrl, done) {
        var url = "/api/video/";
        AjaxFunctions.post(url, videoUrl, function(err, data) {
            
            if (err) {
                console.log("error adding data", err);
                done(err, null);
            }
            else {
                AppDispatcher.dispatch({
                    actionType: VideoConstants.VIDEOS_UPDATE
                });
                done(null, data);
            }

        });
    },
}


module.exports = VideoActions;