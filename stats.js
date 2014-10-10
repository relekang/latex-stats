var __module_child_process = require("child_process");
var moment = require("moment");
var redis = require("redis");
var exec = __module_child_process.exec;


var save_stats = function(key, stats, path, callback) {
    try {
        var r = redis.createClient();
        r.hset('postats', key, JSON.stringify(stats), function(err, res) {
            callback(null, stats);
        });
    } catch (e) {
        callback('Could not save to redis', stats);
    }
};

var generate_stats = function(path, filename, callback) {
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
        save_stats(moment().format('YYYYMMDD'), stats, callback);
    });
};


module.exports = generate_stats;