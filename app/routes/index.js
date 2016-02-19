'use strict';

var path = process.cwd();
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var VideoHandler = require(path + '/app/controllers/videoHandler.server.js');

module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/');
		}
	}

	var userHandler = new UserHandler();
	var videoHandler = new VideoHandler();


	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.json({
				msg: "sucessful logout"
			});
		});

	app.route('/api/user/video/')
		.get(videoHandler.getAllFromUser);
		
	app.route('/api/video/')
		.post(videoHandler.add)
		.delete(videoHandler.remove)
		.get(videoHandler.getAll);



	app.route('/api/:id')
		.get(isLoggedIn, function(req, res) {
			res.json(req.user);
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter', {
			scope: 'user:email'
		}));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/Login'
		}));

	app.route('/auth/github')
		.get(passport.authenticate('github', {
			scope: 'user:email'
		}));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/Login'
		}));

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook', {
			authType: 'rerequest',
			scope: 'email'
		}));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/Login',
			failureFlash: true
		}));

	app.route('/auth/google')
		.get(passport.authenticate('google', {
			scope: 'profile email'
		}));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));


	app.route('/updateUser')
		.post(userHandler.updateUser);
	app.route('/signup')
		.post(userHandler.signup);
	app.route('/login')
		.post(userHandler.login);

	app.route('/*')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

};
