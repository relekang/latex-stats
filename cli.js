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
    stats(program.path, program.args[1]);
} else if (program.command === 'graph') {
    createGraph(program.path, function() {
        process.exit(0);
    });
}


module.exports = program;