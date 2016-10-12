#!/usr/bin/env node


/**
 * Command Line tool for NetworkJS
 * Author : Koustuv Sinha
 */
"use strict";

var _Graph = require("./data-structures/Graph");

var _Graph2 = _interopRequireDefault(_Graph);

var _degree = require("./algorithms/centrality/degree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");
require("babel-polyfill");
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');

var betweenness_centrality = require('./algorithms/centrality/betweenness').betweenness_centrality;
var eigenvector_centrality = require('./algorithms/centrality/eigenvector').eigenvector_centrality;

program.arguments('<file.csv>').option('-d,--degree', 'Calculate the degree centrality').option('-b,--betweenness', 'Calculate the betweenness centrality').option('-e,--eigenvector', 'Calculate the Eigenvector centrality').action(function (file) {
  var G = new _Graph2.default();
  co(regeneratorRuntime.mark(function _callee() {
    var sourceNode, targetNode, weightNode;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return prompt('sourceNode: ');

          case 2:
            sourceNode = _context.sent;
            _context.next = 5;
            return prompt('targetNode: ');

          case 5:
            targetNode = _context.sent;
            _context.next = 8;
            return prompt('weightNode: ');

          case 8:
            weightNode = _context.sent;

            G.read_csv(file, sourceNode, targetNode, weightNode, function (err) {
              if (err) {
                console.log(err);
                process.exit(1);
              } else {
                console.log('Done reading file');
                console.log(G.num_nodes() + ' nodes found');
                if (program.degree) {
                  console.log('Calculating Degree centrality ...');
                  console.log((0, _degree.degree_centrality)(G));
                }
                if (program.betweenness) {
                  console.log('Calculating Betweenness centrality ...');
                  console.log(betweenness_centrality(G, null, true, weightNode));
                }
                if (program.eigenvector) {
                  console.log('Calculating Eigenvector centrality ...');
                  console.log(eigenvector_centrality(G, 100, 1.0e-6, null, weightNode));
                }
                process.exit(0);
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}).parse(process.argv);
