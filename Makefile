BIN = node_modules/.bin

all: parse

graph: parse /var/www/graph 
	node createGraphData.js
	chmod 644 dist/index.html
	cp dist/index.html /var/www/graph/.

parse: node_modules
	${BIN}/bailey ./ ./ --node

test:
	${BIN}/mocha
/var/www/graph:
	mkdir -p /var/www/graph/
node_modules:
	npm install

.PHONY: all parse test
