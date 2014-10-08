var fs = require("fs");
var redis = require("redis");
var hogan = require("hogan");

var r = redis.createClient();


var createGraphData = function(callback) {
    r.hgetall('postats', function(err, res) {
        if (err) {
            return callback(err, res);
        }

        var graphData = {
            'pages': [],
            'words': [],
            'equations': [],
            'figures': [],
            'fixmes': [],
            'days': Object.keys(res)
        };

        for (var value in res) {
            var value = JSON.parse(res[value]);
            graphData.pages.push(value.pages);
            graphData.words.push(value.words);
            graphData.equations.push(value.equations);
            graphData.figures.push(value.figures);
            graphData.fixmes.push(value.fixmes);
        }

        callback(graphData);
    });
};


module.exports = function() {
    createGraphData(function(data) {
        console.log(data);

        fs.readFile('graph.hogan', function(err, content) {
            var template = hogan.compile(content.toString());
            fs.writeFile('dist/index.html', template.render(data), function(err, res) {
                process.exit(0);
            });
        });
    });
};