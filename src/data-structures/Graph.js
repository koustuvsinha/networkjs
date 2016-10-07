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
    this.nodeSize = 0
    this.edgeSize = 0
  }

  add_node(id) {
    if(!this.nodes[id]) {
      this.nodeSize++
      this.nodes[id] = {}
      this.adj[id] = {}
    }
  }

  add_nodes_from(ids) {
    ids.forEach((id) => {
      this.add_node(id)
    })
  }

  remove_node(id) {
    let node_to_remove = this.nodes[id]
    if(node_to_remove) {
      //
    } else {
      return
    }
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

}
