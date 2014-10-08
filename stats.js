var __module_child_process = require("child_process");
var moment = require("moment");
var redis = require("redis");
var exec = __module_child_process.exec;

var r = redis.createClient();


var generate_stats = function(path, filename) {
    var stats = {};
    var execOptions = {
        'cwd': path
    };
    exec('make stats', execOptions, function(error, stdout, stderr) {
        var matchPages = /Pages\:(?:[^0-9]*)(\d+)/.exec(stdout);
        var matchWords = /Sum count\:(?:[^0-9]*)(\d+)/.exec(stdout);
        var matchEquations = /math displayed\:(?:[^0-9]*)(\d+)/.exec(stdout);
        var matchFigures = /floats\/tables\/figures\:(?:[^0-9]*)(\d+)/.exec(stdout);
        var matchFixmes = /FIXME\:(?:[^0-9]*)(\d+)/.exec(stdout);
        stats.pages = parseInt(matchPages[1], 10);
        stats.words = parseInt(matchWords[1], 10);
        stats.equations = parseInt(matchEquations[1], 10);
        stats.figures = parseInt(matchFigures[1], 10);
        stats.fixmes = parseInt(matchFixmes[1], 10);
        r.hset('postats', moment().format('YYYYMMDD'), JSON.stringify(stats), function(err, res) {
            console.log(stats);
            process.exit(0);
        });
    });
};


module.exports = generate_stats;