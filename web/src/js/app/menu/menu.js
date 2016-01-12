define(function (require) {

    var kudu = require("kudu");
    var menuTemplate = require("rvc!./menu");
    var home = require("../views/home/home");

    function menu() {

        var that = {};

        that.init = function (options) {

            // Create menu view instance
            new menuTemplate({
                el: options.target,
                gotohome: function () {
                    kudu.go({ctrl: home, routeParams: {"a": ["b", "c"]}});
                    return false;
                }
            });
        };

        return that;
    }
    return menu();
});
