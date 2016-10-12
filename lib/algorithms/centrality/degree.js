'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.degree_centrality = degree_centrality;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Degree Centrality of the Graph
 * G is the Graph to pass
 */
function degree_centrality(G) {
  var centrality = {};
  var s = 1.0 / (G.num_nodes() - 1.0);
  G.degree_iter().forEach(function (tuple) {
    var n = tuple[0];
    var d = tuple[1];
    centrality[n] = d * s;
  });
  return centrality;
} /**
   * Centrality Degree Algorithms
   */