define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var template = require("rvc!./test");

	function test() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		function createView() {

			var view = new template({

			});
			return view;
		}

		return that;
	}
	return test;
});
