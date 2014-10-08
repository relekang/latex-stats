var program = require("commander");
var stats = require("./stats");
var createGraphData = require("./createGraphData");

var version = require('./package.json').version;


program.version(version).usage('<command> (<working-dir> <filename>)').parse(process.argv);

if (!program.args[0]) {
    console.log('Missing command');
    process.exit(1);
}

if (program.args[0] === 'log') {
    if (!program.args[1]) {
        console.log('Missing path');
        process.exit(1);
    }

    if (!program.args[2]) {
        console.log('Missing filename');
        process.exit(1);
    }

    stats(program.args[1], program.args[2]);
} else if (program.args[0] === 'graph') {
    createGraphData(function() {
        process.exit(0);
    });
}


module.exports = program;