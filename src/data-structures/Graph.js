/**
 * Graph DataStructure implementation library
 * Trying to keep the API as similar as possible with NetworkX
 */
import _ from 'lodash'
import {Converter} from 'csvtojson'
import fs from 'fs'

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
    let adj = this.adj
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

  get_nodes() {
    return _.keys(this.nodes)
  }

  is_directed() {
    return false
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

  remove_edge(u,v) {
    try {
      delete this.adj[u][v]
      if(u!=v) {
        delete this.adj[v][u]
      }
    } catch(e) {
      console.log('no edge is present')
    }
  }

  remove_edges_from(edgeb) {
    let adj = this.adj
    edgeb.forEach((e)=> {
      let u = e[0]
      let v = e[1]
      if(_.hasIn(adj,u) && _.hasIn(adj[u],v)) {
        delete adj[u][v]
        if(u!=v) {
          delete adj[v][u]
        }
      }
    })
  }

  has_edge(u,v) {
    try {
        return _.hasIn(this.adj[u],v)
    } catch(e) {
      return
    }
  }

  neighbors(u) {
    try {
        return this.adj[u]
    } catch(e) {
      return
    }
  }

  degree_iter(nodeb,weight) {
    let nbrs
    if(!nodeb) {
      nbrs = _.toPairs(this.adj)
    } else {
      nbrs = this.nbunch_iter(nodeb).map((n)=>{
        return [n,this.adj[n]]
      })
    }
    let deg
    if(!weight) {
      deg = nbrs.map((e)=>{
        let n = e[0]
        let nbr = e[1]
        return [n,_.size(nbr)]
      })
    } else {
      // edge weighted sum
      deg = nbrs.map((e)=>{
        let n = e[0]
        let nbr = e[1]
        let wsum = 0
        _.forEach(nbr,(nb)=>{
          wsum = wsum + nb['weight']
        })
        return [n,wsum]
      })
    }
    return deg
  }

  nbunch_iter(nodeb) {
    let bunch
    if(!nodeb || nodeb.length < 1) {
      bunch = _.keys(this.adj).map((k)=>{return parseInt(k)})
    } else if(nodeb.length == 1) {
      if(this.adj[nodeb[0]]) {
        bunch = nodeb
      }
    } else {
      bunch = []
      nodeb.forEach((n)=>{
        if(_.hasIn(this.adj,n)) {
          bunch.push(n)
        }
      })
    }
    return bunch
  }

  /**
   * Read CSV files and create a new Graph
   */
  read_csv(filename,sourceNode,targetNode,weightNode,cb) {
    const converter = new Converter({})
    converter.on('end_parsed',(result)=>{
      result.forEach((row)=>{
        this.add_edge(row[sourceNode],row[targetNode],{'weight':row[weightNode]})
      })
      // execute callback
      cb(null)
    })
    fs.createReadStream(filename).pipe(converter)
  }

}
