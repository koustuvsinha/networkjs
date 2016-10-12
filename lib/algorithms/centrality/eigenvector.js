'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eigenvector_centrality = eigenvector_centrality;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Eigenvector Centrality
 */

function eigenvector_centrality(G) {
  var max_iter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var tol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0e-6;
  var nstart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var weight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'weight';

  if (G.num_nodes() < 0) {
    throw 'Empty graph';
  }
  var x = {};
  if (!nstart) {
    G.get_nodes().forEach(function (n) {
      x[n] = 1.0 / G.num_nodes();
    });
  } else {
    x = nstart;
  }
  var xs = _lodash2.default.reduce(x, function (res, val, key) {
    if (!res) res = 0;
    res = res + val;
    return res;
  });
  var s = 1.0 / xs;
  _lodash2.default.forIn(x, function (val, key) {
    x[key] *= s;
  });
  var nnodes = G.num_nodes();

  var _loop = function _loop() {
    var xlast = _lodash2.default.cloneDeep(x);
    _lodash2.default.forIn(xlast, function (val, key) {
      x[key] = 0;
    });
    _lodash2.default.forIn(x, function (val, n) {
      _lodash2.default.forIn(G.adj[n], function (v2, nbr) {
        var r = G.adj[n][nbr][weight] ? G.adj[n][nbr][weight] : 1;
        x[nbr] += xlast[n] * r;
      });
    });
    var xden = Math.sqrt(_lodash2.default.reduce(x, function (res, val, key) {
      if (!res) res = 0;
      res = res + Math.pow(val, 2);
      return res;
    }));
    if (xden !== 0) {
      s = 1.0 / xden;
    } else {
      s = 1.0;
    }
    _lodash2.default.forIn(x, function (val, key) {
      x[key] *= s;
    });
    /*
    let err = _.reduce(x,(res,val,n)=>{
      if(!res) res = 0
      let diff = Big(x[n]).minus(Big(xlast[n])).abs()
      diff = parseInt(diff.toFixed(6))
      res += diff
      return res
    })
     if(err < nnodes*tol) {
      return x
    }
    */
  };

  for (var i = 0; i < max_iter; i++) {
    _loop();
  }
  // running Eigenvector centrality till 100 iterations or num of iterations
  // specified by user. Due to some wierd JS bug the sum of floats is always
  // big!
  //throw 'Eigenvector Centrality : power equation failed to converge in ' + max_iter + ' iterations'
  return x;
}