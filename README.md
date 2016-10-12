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
  * Library - _Todo_
* [API Reference](#api-reference)
* [Run Tests](#run-tests)
* [Change Log](#change-log)

## Installation

* Install [Nodejs](https://nodejs.org/en/)
* For command line install the tool via npm : `npm install -g networkjs`
* For library usage : `npm install --save networkjs`

## Usage

### Command Line

See full options available : `networkjs --help`

```sh
Usage: networkjs [options] <file.csv>

 Options:

   -h, --help        output usage information
   -d,--degree       Calculate the degree centrality
   -b,--betweenness  Calculate the betweenness centrality
   -e,--eigenvector  Calculate the Eigenvector centrality

```

## API Reference

_Todo_

## Run Tests

```
npm test
```

## Change Log

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
