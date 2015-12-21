define(function (require) {

	var Ractive = require("ractive");
	var home = require("app/views/home/home");
	var test = require("app/views/test/test");
	var notFound = require("app/views/notfound/notFound");

	function routes() {

		var homeRoute = {path: 'home',
			ctrl: home
		};

		var routes = {
			home: homeRoute,
			test: {path: 'test', ctrl: test},
			notFound: {path: '*', ctrl: notFound}
		};

		Ractive.defaults.debug = true;
		
		return routes;

	}
	return routes();
});