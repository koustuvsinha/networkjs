'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betweenness_centrality = betweenness_centrality;
exports._single_source_shortest_path_basic = _single_source_shortest_path_basic;
exports._single_source_dijkstra_path_basic = _single_source_dijkstra_path_basic;
exports._accumulate_basic = _accumulate_basic;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _heap = require('heap');

var _heap2 = _interopRequireDefault(_heap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Betweenness Centrality Algorithms
 */
function betweenness_centrality(G) {
  var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var normalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var endpoints = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var seed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var betweenness = {};
  G.get_nodes().forEach(function (v) {
    betweenness[v] = 0.0;
  });
  var nodes = void 0;
  if (!k) {
    nodes = G.get_nodes();
  } else {
    k = k ? k : G.get_nodes().length;
    nodes = _lodash2.default.sampleSize(G.get_nodes(), k);
  }
  if (nodes) {
    nodes.forEach(function (s) {
      var S = void 0,
          P = void 0,
          sigma = void 0;
      if (!weight) {
        var _single_source_shorte = _single_source_shortest_path_basic(G, s);

        var St = _single_source_shorte.S;
        var Pt = _single_source_shorte.P;
        var sigmat = _single_source_shorte.sigma;

        S = St;
        P = Pt;
        sigma = sigmat;
      } else {
        var _single_source_dijkst = _single_source_dijkstra_path_basic(G, s, weight);

        var _St = _single_source_dijkst.S;
        var _Pt = _single_source_dijkst.P;
        var _sigmat = _single_source_dijkst.sigma;

        S = _St;
        P = _Pt;
        sigma = _sigmat;
      }
      if (endpoints) {
        betweenness = _accumulate_endpoints(betweenness, S, P, sigma, s);
      } else {
        betweenness = _accumulate_basic(betweenness, S, P, sigma, s);
      }
    });
  }
  betweenness = _rescale(betweenness, G.num_nodes(), normalized, G.is_directed(), k);
  return betweenness;
}

function _single_source_shortest_path_basic(G, s) {
  var S = [];
  var P = {};
  var sigma = {};
  var D = {};
  _lodash2.default.forEach(G.adj, function (vd, v) {
    P[v] = [];
    sigma[v] = 0.0;
  });
  sigma[s] = 1.0;
  D[s] = 0;
  var Q = [s];
  // BFS

  var _loop = function _loop() {
    var v = Q.shift();
    S.push(parseInt(v));
    var Dv = D[v];
    var sigmav = sigma[v];
    _lodash2.default.forEach(G.adj[v], function (wd, w) {
      if (!_lodash2.default.hasIn(D, w)) {
        Q.push(parseInt(w));
        D[w] = Dv + 1;
      }
      if (D[w] == Dv + 1) {
        sigma[w] += sigmav;
        P[w].push(parseInt(v));
      }
    });
  };

  while (Q.length > 0) {
    _loop();
  }
  return { S: S, P: P, sigma: sigma };
}

function _single_source_dijkstra_path_basic(G, s) {
  var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'weight';

  var S = [];
  var P = {};
  var sigma = {};
  var D = {};
  _lodash2.default.forEach(G.nodes, function (vd, v) {
    P[v] = [];
    sigma[v] = 0.0;
  });
  sigma[s] = 1.0;
  // what to do???
  //push = heappush
  //pop = heappop
  var Q = new _heap2.default(function (a, b) {
    return a.dist - b.dist;
  });
  var seen = { s: 0 };
  var c = 0;
  //let Q = []   // use Q as heap with (distance,node id) tuples
  Q.push({ dist: 0, ct: c + 1, pred: s, v: s });
  c++;

  var _loop2 = function _loop2() {
    var _Q$pop = Q.pop();

    var dist = _Q$pop.dist;
    var ct = _Q$pop.ct;
    var pred = _Q$pop.pred;
    var v = _Q$pop.v;

    if (_lodash2.default.hasIn(D, v)) {
      return 'continue'; //# already searched this node.
    }
    sigma[v] += sigma[pred]; //# count paths
    S.push(parseInt(v));
    D[v] = dist;
    _lodash2.default.forEach(G.adj[v], function (edgedata, w) {
      var vw_dist = dist + (edgedata[weight] || 1);
      if (!_lodash2.default.has(D, w) && (!_lodash2.default.has(seen, w) || vw_dist < seen[w])) {
        seen[w] = vw_dist;
        Q.push({ dist: vw_dist, ct: c + 1, pred: v, v: w });
        c++;
        sigma[w] = 0.0;
        P[w] = [v];
      } else if (vw_dist == seen[w]) {
        // handle equal paths
        sigma[w] += sigma[v];
        P[w].push(v);
      }
    });
  };

  while (Q.size() > 0) {
    var _ret2 = _loop2();

    if (_ret2 === 'continue') continue;
  }
  return { S: S, P: P, sigma: sigma };
}

function _accumulate_basic(betweenness, S, P, sigma, s) {
  var delta = {};
  S.forEach(function (v) {
    delta[v] = 0;
  });

  var _loop3 = function _loop3() {
    var w = S.pop();
    var coeff = (1.0 + delta[w]) / sigma[w];
    P[w].forEach(function (v) {
      delta[v] += sigma[v] * coeff;
    });
    // fucking javascript, doesn't even equal properly
    var wt = w + '';
    var st = s + '';
    if (wt !== st) {
      betweenness[w] += delta[w];
    }
  };

  while (S.length > 0) {
    _loop3();
  }
  return betweenness;
}

function _accumulate_endpoints(betweenness, S, P, sigma, s) {
  betweenness[s] += S.length - 1;
  var delta = {};
  S.forEach(function (v) {
    delta[v] = 0;
  });

  var _loop4 = function _loop4() {
    var w = S.pop();
    var coeff = (1.0 + delta[w]) / sigma[w];
    P[w].forEach(function (v) {
      delta[v] = sigma[v] * coeff;
    });
    if (w !== s) {
      betweenness[w] += delta[w] + 1;
    }
  };

  while (S.length > 0) {
    _loop4();
  }
  return betweenness;
}

function _rescale(betweenness, n, normalized) {
  var directed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var k = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var scale = void 0;
  if (normalized) {
    if (n <= 2) {
      scale = null;
    } else {
      scale = 1.0 / ((n - 1) * (n - 2));
    }
  } else {
    if (!directed) {
      scale = 1.0 / 2.0;
    } else {
      scale = null;
    }
  }
  if (scale) {
    if (k) {
      scale = scale * n / k;
    }
    _lodash2.default.forEach(betweenness, function (val, key) {
      betweenness[key] *= scale;
    });
  }
  return betweenness;
}