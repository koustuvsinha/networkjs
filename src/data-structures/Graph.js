/**
 * Graph DataStructure implementation library
 * Trying to keep the API as similar as possible with NetworkX
 */
import _ from 'lodash'

export default class Graph {
  constructor() {
    this.nodes = {}
    this.adj = {}
    this.edge = this.adj
  }

  add_node(id,attr) {
    if(!this.nodes[id]) {
      this.nodes[id] = attr ? attr : {}
      this.adj[id] = {}
    } else {
      this.nodes[id] = _.assignIn(this.nodes[id],attr)
    }
  }

  add_nodes_from(ids,attr) {
    ids.forEach((id) => {
      this.add_node(id,attr)
    })
  }

  remove_node(id) {
    let adj = self.adj
    let nbrs = []
    if(this.nodes[id]) {
      nbrs = _.keys(adj[id])
      delete this.nodes[id]
    }
    nbrs.forEach((u)=>{
      delete adj[u][id]
    })
    delete adj[id]
    this.adj = adj
  }

  get_node(id) {
    return this.nodes[id]
  }

  order() {
    return this.nodeSize
  }

  has_node(id) {
    return _.hasIn(this.nodes,id + '')
  }

  num_nodes() {
    return _.size(this.nodes)
  }

  /**
   * Only supports single attribute for now
   */
  add_edge(u,v,attr) {
    if(!this.nodes[u]) {
      this.adj[u] = {}
      this.nodes[u] = {}
    }
    if(!this.nodes[v]) {
      this.adj[v] = {}
      this.nodes[v] = {}
    }
    let data = this.adj[u][v] ? this.adj[u][v] : {}
    this.adj[u][v] = _.assignIn(data,attr)
    this.adj[v][u] = _.assignIn(data,attr)
  }

  add_edges_from(edgeb,attr) {
    attr = attr ? attr : {}
    edgeb.forEach((e)=> {
      let u,v,d
      if(e.length == 3) {
          u = e[0]
          v = e[1]
          d = e[2]
      } else if(e.length == 2) {
        u = e[0]
        v = e[1]
        d = {}
      } else {
        console.log('error')
      }
      if(!this.nodes[u]) {
        this.adj[u] = {}
        this.nodes[u] = {}
      }
      if(!this.nodes[v]) {
        this.adj[v] = {}
        this.nodes[v] = {}
      }
      let data = this.adj[u][v] ? this.adj[u][v] : {}
      data = _.assignIn(data,attr)
      data = _.assignIn(data,d)
      this.adj[u][v] = data
      this.adj[v][u] = data
    })
  }

  add_weighted_edges_from(edgeb,weight='weight',...attr) {
    edgeb.forEach((e)=> {
      let u = e[0]
      let v = e[1]
      let d = e[2]
      this.add_edges_from([[u,v,{weight:d}]],attr)
    })
  }

  remove_edge() {

  }

}
