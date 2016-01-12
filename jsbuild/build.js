var cli = require('./mods/cli');
var config = require('./mods/config');
var optimize = require('./mods/optimize');
var fs = require('fs-extra');
var versioning = require("node-version-assets");
var glob = require("glob");
var copyDereferenceSync = require('copy-dereference').sync;

build();

function build() {

// Read in the build config file
    var rConfig = fs.readFileSync("./config/r.build.js", 'utf8');
    rConfig = eval(rConfig);
    var appConfig = config.get("app");

// Remove the deploy folder in case of previous builds
    clean(rConfig);

    optimize(rConfig, appConfig).then(function (buildResponse) {

        try {
            renameConfigToRequire(rConfig);
            copyExpressArtifact(rConfig);

            versionAssets(rConfig).then(function () {
                console.log("Build completed successfully!");
            });
        } catch (e) {
            console.error(e.stack);
        }
    });

    function versionAssets(rConfig) {

        var version = new versioning({
            assets: [rConfig.dir + '/css/site.css', rConfig.dir + '/js/lib/require.js'],
            grepFiles: [rConfig.dir + '/index.jsp']
        });

        var promise = new Promise(function (resolve, reject) {

            version.run(function () {
                resolve();
            });
        });

        return promise;
    }

    function copyExpressArtifact(rConfig) {
        var source = "./artifacts";
        var target = rConfig.dir;

        fs.copySync(source, target);
        console.log(source + " copied Node Express artifacts to " + target);
    }

    function renameConfigToRequire(rConfig) {
        var source = rConfig.dir + "js/app/config/config.js";
        var target = rConfig.dir + "js/lib/require.js";

        fs.renameSync(source, target);
        console.log(source + " renamed to " + target);
    }

    function clean(rConfig) {
        fs.removeSync(rConfig.dir);
        fs.removeSync("../../kudu-examples-pages/js");
        console.log("Removed previous buildpath: " + rConfig.dir);
    }

    console.log("Running build in", config.environment(), "mode");
}