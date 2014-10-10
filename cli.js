var program = require("commander");
var stats = require("./stats");
var createGraph = require("./createGraph");

var version = require('./package.json').version;


program.version(version).usage('<command> (<filename>)').option('-p, --path <path>').option('-f, --file <name>').parse(process.argv);

program.path = program.path || process.cwd();
program.file = program.file || 'main';
program.command = program.args[0];


if (!program.command) {
    console.log('Missing command');
    process.exit(1);
}

if (program.command === 'log') {
    stats(program.path, program.file, function(err, stats) {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log('Collected these stats ' + stats + '');
            process.exit(0);
        }
    });
} else if (program.command === 'graph') {
    createGraph(program.path, function(err, filename) {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log('Created file ' + filename + '');
            process.exit(0);
        }
    });
}


module.exports = program;