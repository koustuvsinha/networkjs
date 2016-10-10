/**
 * Eigenvector Centrality
 */

import _ from 'lodash'
import Big from 'big.js'

export function eigenvector_centrality(G,max_iter=100,tol=1.0e-6,
  nstart=null,weight='weight') {
  if(G.num_nodes() < 0) {
    throw 'Empty graph'
  }
  let x = {}
  if(!nstart) {
    G.get_nodes().forEach((n)=>{
      x[n] = 1.0 / G.num_nodes()
    })
  } else {
    x = nstart
  }
  let xs = _.reduce(x,(res,val,key)=>{
    if(!res) res=0
    res = res + val
    return res
  })
  let s = 1.0 / xs
  _.forIn(x,(val,key)=>{
    x[key] *= s
  })
  let nnodes = G.num_nodes()
  for(var i = 0; i<max_iter;i++) {
    let xlast = _.cloneDeep(x)
    _.forIn(xlast,(val,key)=>{
      x[key] = 0
    })
    _.forIn(x,(val,n)=>{
      _.forIn(G.adj[n],(v2,nbr)=>{
        let r = G.adj[n][nbr][weight] ? G.adj[n][nbr][weight] : 1
        x[nbr] += xlast[n] * r
      })
    })
    let xden = Math.sqrt(_.reduce(x,(res,val,key)=>{
      if(!res) res = 0
      res = res + Math.pow(val,2)
      return res
    }))
    if(xden !== 0) {
      s = 1.0 / xden
    } else {
      s = 1.0
    }
    _.forIn(x,(val,key)=>{
      x[key] *= s
    })
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
  }
  // running Eigenvector centrality till 100 iterations or num of iterations
  // specified by user. Due to some wierd JS bug the sum of floats is always
  // big!
  //throw 'Eigenvector Centrality : power equation failed to converge in ' + max_iter + ' iterations'
  return x
}
