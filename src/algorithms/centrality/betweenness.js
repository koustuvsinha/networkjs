/**
 * Betweenness Centrality Algorithms
 */
import _ from 'lodash'
import Heap from 'heap'

export function betweenness_centrality(G,k=null,normalized=true,weight=null,
  endpoints=false,seed=null) {
  let betweenness = {}
  G.get_nodes().forEach((v)=>{
    betweenness[v] = 0.0
  })
  let nodes
  if(!k) {
    nodes = G.get_nodes()
  } else {
    k = k ? k : G.get_nodes().length
    nodes = _.sampleSize(G.get_nodes(),k)
  }
  if(nodes) {
    nodes.forEach((s)=>{
      let S,P,sigma
      if(!weight) {
        let {S:St,P:Pt,sigma:sigmat} = _single_source_shortest_path_basic(G,s)
        S = St
        P = Pt
        sigma = sigmat
      } else {
        let {S:St,P:Pt,sigma:sigmat} = _single_source_dijkstra_path_basic(G,s,weight)
        S = St
        P = Pt
        sigma = sigmat
      }
      if(endpoints) {
        betweenness = _accumulate_endpoints(betweenness,S,P,sigma,s)
      } else {
        betweenness = _accumulate_basic(betweenness,S,P,sigma,s)
      }
    })
  }
  betweenness = _rescale(betweenness, G.num_nodes(),normalized,G.is_directed(),k)
  return betweenness
}

export function _single_source_shortest_path_basic(G,s) {
  let S = []
  let P = {}
  let sigma = {}
  let D = {}
  _.forEach(G.adj, ((vd,v)=>{
    P[v] = []
    sigma[v] = 0.0
  }))
  sigma[s] = 1.0
  D[s] = 0
  let Q = [s]
  // BFS
  while(Q.length > 0) {
    let v = Q.shift()
    S.push(parseInt(v))
    let Dv = D[v]
    let sigmav = sigma[v]
    _.forEach(G.adj[v],((wd,w)=>{
      if(!_.hasIn(D,w)) {
        Q.push(parseInt(w))
        D[w] = Dv + 1
      }
      if(D[w] == (Dv + 1)) {
        sigma[w] += sigmav
        P[w].push(parseInt(v))
      }
    }))
  }
  return {S,P,sigma}
}

export function _single_source_dijkstra_path_basic(G,s,weight='weight') {
  let S = []
  let P = {}
  let sigma = {}
  let D = {}
  _.forEach(G.nodes, ((vd,v)=>{
    P[v] = []
    sigma[v] = 0.0
  }))
  sigma[s] = 1.0
  // what to do???
  //push = heappush
  //pop = heappop
  let Q = new Heap((a,b)=>{
    return (a.dist - b.dist)
  })
  let seen = {s: 0}
  let c = 0
  //let Q = []   // use Q as heap with (distance,node id) tuples
  Q.push({dist : 0, ct : c + 1, pred: s, v: s})
  c++
  while(Q.size() > 0) {
    let {dist, ct, pred, v} = Q.pop()
    if(_.hasIn(D,v)) {
        continue  //# already searched this node.
    }
    sigma[v] += sigma[pred]  //# count paths
    S.push(parseInt(v))
    D[v] = dist
    _.forEach(G.adj[v],(edgedata,w)=>{
        let vw_dist = dist + (edgedata[weight] || 1)
        if(!_.has(D,w) && (!_.has(seen,w) || vw_dist < seen[w])) {
          seen[w] = vw_dist
          Q.push({dist : vw_dist, ct : c + 1, pred: v, v: w})
          c++
          sigma[w] = 0.0
          P[w] = [v]
        }
        else if(vw_dist == seen[w]) {  // handle equal paths
          sigma[w] += sigma[v]
          P[w].push(v)
        }
      })
  }
  return {S, P, sigma}
}

export function _accumulate_basic(betweenness, S, P, sigma, s) {
  let delta = {}
  S.forEach((v)=>{
    delta[v] = 0
  })
  while(S.length > 0) {
    let w = S.pop()
    let coeff = (1.0 + delta[w]) / sigma[w]
    P[w].forEach((v)=>{
      delta[v] += sigma[v] * coeff
    })
    // fucking javascript, doesn't even equal properly
    let wt = w + ''
    let st = s + ''
    if(wt!==st) {
      betweenness[w] += delta[w]
    }
  }
  return betweenness
}

function _accumulate_endpoints(betweenness, S, P, sigma, s) {
  betweenness[s] += S.length - 1
  let delta = {}
  S.forEach((v)=>{
    delta[v] = 0
  })
  while(S.length > 0) {
    let w = S.pop()
    const coeff = (1.0 + delta[w]) / sigma[w]
    P[w].forEach((v)=>{
      delta[v] = sigma[v] * coeff
    })
    if(w!==s) {
      betweenness[w] += delta[w] + 1
    }
  }
  return betweenness
}

function _rescale(betweenness, n, normalized, directed=false, k=null) {
  let scale
  if(normalized) {
    if(n<=2) {
      scale = null
    } else {
      scale = 1.0 / ((n - 1) * (n - 2))
    }
  } else {
    if(!directed) {
      scale = 1.0 / 2.0
    } else {
      scale = null
    }
  }
  if(scale) {
    if(k) {
      scale = scale * n / k
    }
    _.forEach(betweenness,((val,key)=>{
      betweenness[key] *= scale
    }))
  }
  return betweenness
}
