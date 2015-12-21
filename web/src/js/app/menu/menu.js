define(function (require) {
	
	var kudu = require("kudu");
	var menuTemplate = require("rvc!./menu");
	
	var $ = require("jquery");

	function menu() {

		var that = {};

		that.init = function (options) {

			// Create menu view instance
			new menuTemplate({
				
				el: options.target,
			});
		};

		return that;
	}
	return menu();
});
