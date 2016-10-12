'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Graph DataStructure implementation library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Trying to keep the API as similar as possible with NetworkX
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _csvtojson = require('csvtojson');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
  function Graph() {
    _classCallCheck(this, Graph);

    this.nodes = {};
    this.adj = {};
    this.edge = this.adj;
  }

  _createClass(Graph, [{
    key: 'add_node',
    value: function add_node(id, attr) {
      if (!this.nodes[id]) {
        this.nodes[id] = attr ? attr : {};
        this.adj[id] = {};
      } else {
        this.nodes[id] = _lodash2.default.assignIn(this.nodes[id], attr);
      }
    }
  }, {
    key: 'add_nodes_from',
    value: function add_nodes_from(ids, attr) {
      var _this = this;

      ids.forEach(function (id) {
        _this.add_node(id, attr);
      });
    }
  }, {
    key: 'remove_node',
    value: function remove_node(id) {
      var adj = this.adj;
      var nbrs = [];
      if (this.nodes[id]) {
        nbrs = _lodash2.default.keys(adj[id]);
        delete this.nodes[id];
      }
      nbrs.forEach(function (u) {
        delete adj[u][id];
      });
      delete adj[id];
      this.adj = adj;
    }
  }, {
    key: 'get_node',
    value: function get_node(id) {
      return this.nodes[id];
    }
  }, {
    key: 'order',
    value: function order() {
      return this.nodeSize;
    }
  }, {
    key: 'has_node',
    value: function has_node(id) {
      return _lodash2.default.hasIn(this.nodes, id + '');
    }
  }, {
    key: 'num_nodes',
    value: function num_nodes() {
      return _lodash2.default.size(this.nodes);
    }
  }, {
    key: 'get_nodes',
    value: function get_nodes() {
      return _lodash2.default.keys(this.nodes);
    }
  }, {
    key: 'is_directed',
    value: function is_directed() {
      return false;
    }

    /**
     * Only supports single attribute for now
     */

  }, {
    key: 'add_edge',
    value: function add_edge(u, v, attr) {
      if (!this.nodes[u]) {
        this.adj[u] = {};
        this.nodes[u] = {};
      }
      if (!this.nodes[v]) {
        this.adj[v] = {};
        this.nodes[v] = {};
      }
      var data = this.adj[u][v] ? this.adj[u][v] : {};
      this.adj[u][v] = _lodash2.default.assignIn(data, attr);
      this.adj[v][u] = _lodash2.default.assignIn(data, attr);
    }
  }, {
    key: 'add_edges_from',
    value: function add_edges_from(edgeb, attr) {
      var _this2 = this;

      attr = attr ? attr : {};
      edgeb.forEach(function (e) {
        var u = void 0,
            v = void 0,
            d = void 0;
        if (e.length == 3) {
          u = e[0];
          v = e[1];
          d = e[2];
        } else if (e.length == 2) {
          u = e[0];
          v = e[1];
          d = {};
        } else {
          console.log('error');
        }
        if (!_this2.nodes[u]) {
          _this2.adj[u] = {};
          _this2.nodes[u] = {};
        }
        if (!_this2.nodes[v]) {
          _this2.adj[v] = {};
          _this2.nodes[v] = {};
        }
        var data = _this2.adj[u][v] ? _this2.adj[u][v] : {};
        data = _lodash2.default.assignIn(data, attr);
        data = _lodash2.default.assignIn(data, d);
        _this2.adj[u][v] = data;
        _this2.adj[v][u] = data;
      });
    }
  }, {
    key: 'add_weighted_edges_from',
    value: function add_weighted_edges_from(edgeb) {
      for (var _len = arguments.length, attr = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        attr[_key - 2] = arguments[_key];
      }

      var _this3 = this;

      var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'weight';

      edgeb.forEach(function (e) {
        var u = e[0];
        var v = e[1];
        var d = e[2];
        _this3.add_edges_from([[u, v, { weight: d }]], attr);
      });
    }
  }, {
    key: 'remove_edge',
    value: function remove_edge(u, v) {
      try {
        delete this.adj[u][v];
        if (u != v) {
          delete this.adj[v][u];
        }
      } catch (e) {
        console.log('no edge is present');
      }
    }
  }, {
    key: 'remove_edges_from',
    value: function remove_edges_from(edgeb) {
      var adj = this.adj;
      edgeb.forEach(function (e) {
        var u = e[0];
        var v = e[1];
        if (_lodash2.default.hasIn(adj, u) && _lodash2.default.hasIn(adj[u], v)) {
          delete adj[u][v];
          if (u != v) {
            delete adj[v][u];
          }
        }
      });
    }
  }, {
    key: 'has_edge',
    value: function has_edge(u, v) {
      try {
        return _lodash2.default.hasIn(this.adj[u], v);
      } catch (e) {
        return;
      }
    }
  }, {
    key: 'neighbors',
    value: function neighbors(u) {
      try {
        return this.adj[u];
      } catch (e) {
        return;
      }
    }
  }, {
    key: 'degree_iter',
    value: function degree_iter(nodeb, weight) {
      var _this4 = this;

      var nbrs = void 0;
      if (!nodeb) {
        nbrs = _lodash2.default.toPairs(this.adj);
      } else {
        nbrs = this.nbunch_iter(nodeb).map(function (n) {
          return [n, _this4.adj[n]];
        });
      }
      var deg = void 0;
      if (!weight) {
        deg = nbrs.map(function (e) {
          var n = e[0];
          var nbr = e[1];
          return [n, _lodash2.default.size(nbr)];
        });
      } else {
        // edge weighted sum
        deg = nbrs.map(function (e) {
          var n = e[0];
          var nbr = e[1];
          var wsum = 0;
          _lodash2.default.forEach(nbr, function (nb) {
            wsum = wsum + nb['weight'];
          });
          return [n, wsum];
        });
      }
      return deg;
    }
  }, {
    key: 'nbunch_iter',
    value: function nbunch_iter(nodeb) {
      var _this5 = this;

      var bunch = void 0;
      if (!nodeb || nodeb.length < 1) {
        bunch = _lodash2.default.keys(this.adj).map(function (k) {
          return parseInt(k);
        });
      } else if (nodeb.length == 1) {
        if (this.adj[nodeb[0]]) {
          bunch = nodeb;
        }
      } else {
        bunch = [];
        nodeb.forEach(function (n) {
          if (_lodash2.default.hasIn(_this5.adj, n)) {
            bunch.push(n);
          }
        });
      }
      return bunch;
    }

    /**
     * Read CSV files and create a new Graph
     */

  }, {
    key: 'read_csv',
    value: function read_csv(filename, sourceNode, targetNode, weightNode, cb) {
      var _this6 = this;

      var converter = new _csvtojson.Converter({});
      converter.on('end_parsed', function (result) {
        result.forEach(function (row) {
          _this6.add_edge(row[sourceNode], row[targetNode], { 'weight': row[weightNode] });
        });
        // execute callback
        cb(null);
      });
      _fs2.default.createReadStream(filename).pipe(converter);
    }
  }]);

  return Graph;
}();

exports.default = Graph;
module.exports = exports['default'];