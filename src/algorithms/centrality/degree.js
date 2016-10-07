/**
 * Centrality Degree Algorithms
 */

import _ from 'lodash'

/**
 * Degree Centrality of the Graph
 * G is the Graph to pass
 */
export function degree_centrality(G){
  let centrality = {}
  const s = 1.0 / (G.num_nodes() - 1.0)
  G.degree_iter().forEach((tuple)=>{
    let n = tuple[0]
    let d = tuple[1]
    centrality[n] = d * s
  })
  return centrality
}
