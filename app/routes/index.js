'use strict';

var path = process.cwd();
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var BookHandler = require(path + '/app/controllers/bookHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	var userHandler = new UserHandler();
	var bookHandler = new BookHandler();
	

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.json({msg:"sucessful logout"});
		});

		

	app.route('/api/searchExternal/:searchTerm')
		.get(bookHandler.searchExternal);
		
		
	app.route('/api/user/books/')
		.get(bookHandler.getBooksFromUser);
			
	app.route('/api/books/request/approve/')
		.post(bookHandler.approveRequest);
			
	app.route('/api/books/request/')
		.post(bookHandler.request)
		.get(bookHandler.getRequests)
		.delete(bookHandler.removeRequest)
		
	app.route('/api/books/available/')
		.get(bookHandler.getAvailable);
		
	app.route('/api/books/')
		.post(bookHandler.add)
		.delete(bookHandler.remove)
		.get(bookHandler.getAll);
		
		

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user);
		});
		
	app.route('/auth/github')
		.get(passport.authenticate('github', { scope: 'user:email'  }));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/Login'
		}));

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook', { scope: 'email'}));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/auth/google')
		.get(passport.authenticate('google', 
			{ scope: 'profile email' }));

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
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
};
