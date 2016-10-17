# NetworkJS [![Build Status](https://travis-ci.com/koustuvsinha/networkjs.svg?token=5yqsyiS9tZJLYxWs2qpa&branch=master)](https://travis-ci.com/koustuvsinha/networkjs)

[NetworkX](networkx.github.io) clone in JavaScript!

Implemented modules :

* Degree Centrality
* Betweenness Centrality
* Eigenvector Centrality

## Menu

* [Installation](#installation)
* [Usage](#usage)
  * [Command Line](#command-line)
  * [Library](#library-usage)
* [API Reference](#api-reference)
* [Run Tests](#run-tests)
* [Change Log](#change-log)

## Installation

* Install [Nodejs](https://nodejs.org/en/)
* For command line install the tool via npm : `npm install -g networkjs`
* For library usage : `npm install --save networkjs`
* Makefile is also provided which will automatically install latest node if not present and then install the command line tool. To run, type the following :

```sh
make
make install
```

## Usage

### Command Line

See full options available : `networkjs --help`

* `-s`,`--source` <sourceNode>:
  Provide the column name for Source Node. Default value = "Source"

* `-t`,`--target` <targetNode>:
  Provide the column name for Target Node. Default value = "Target"

* `-w`,`--weight` <weightNode>:
  Provide the column name for Weight Node. Default value = "Weight"

* `-d`,`--degree`:
  Run Degree centrality measure over the given dataset, which is defined as the
  number of links incident upon a node. <https://en.wikipedia.org/wiki/Centrality#Degree_centrality>

* `-b`,`--betweenness`:
  Run Betweenness centrality measure over the given dataset, which for a node is
  defined as the number of times a node acts as a bridge along the shortest path
  between two other nodes. <https://en.wikipedia.org/wiki/Centrality#Betweenness_centrality>

* `-e`,`--eigenvector`:
  Run Eigenvector centrality measure over the given dataset, which calculates
  the influence of a node in the network. It assigns relative scores to all
  nodes in the network based on the concept that connections to high-scoring
  nodes contribute more to the score of the node in question than equal
  connections to low-scoring nodes. <https://en.wikipedia.org/wiki/Centrality#Eigenvector_centrality>

* `-v`,`--verbose`:
  Print detailed logs and events

* `-h`,`--help`:
  Display command line help usage for the methods available

For more details consult the man page : `man networkjs`

### Library Usage

Import the required modules either using AMD `require` or ES6 `import` :

```js
import nj from 'networkjs'
const Graph = nj.datastructures.Graph
const {betweenness_centrality,
  degree_centrality,
  eigenvector_centrality} = nj.algorithms.centrality

// Add edges
let G = new Graph()
G.add_edges_from([[1,2],[2,3]])
```

## API Reference

### datastructures.Graph

* `read_csv`
* `add_node`
* `add_nodes_from`
* `remove_node`
* `get_node`
* `order`
* `has_node`
* `num_nodes`
* `get_nodes`
* `is_directed`
* `add_edge`
* `add_edges_from`
* `add_weighted_edges_from`
* `remove_edge`
* `remove_edges_from`
* `has_edge`
* `neighbors`
* `degree_iter`
* `nbunch_iter`

### algorithms.centrality

* `degree_centrality`
* `betweenness_centrality`
* `eigenvector_centrality`

## Run Tests

```
npm test
```

## Change Log

### 0.1.1

* Changed the command line usage for providing Source, Target and Weight column headers

### 0.1.0

* Updated command line interface, now provide Source, Target and Weight headers directly
* Command line output in csv by default. To get json output provide flag `--json`

### 0.0.7

* Fix babel [module.exports issue](http://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default)
* Add man pages

### 0.0.6

* Patch fix again broken library import

### 0.0.5

* Patch fix broken library import

### 0.0.4

* Experimental Library Support

### 0.0.3

* Minor fixes
* Better readme
* Project is now public

### 0.0.2

* Published as npm package
* Supports command line features

### 0.0.1

* Initial release, supports Degree centrality, Betweenness centrality and Eigenvector centrality
* Added Tests

## License

[MIT](https://koustuvs.mit-license.org/)
