/**
 * Graph test suite
 */

import { expect } from 'chai'
import Graph from '../../src/data-structures/Graph'
import 'babel-polyfill'
import _ from 'lodash'

describe('Graph Test Suite', ()=> {
  let G
  beforeEach(() => {
    G = new Graph()
  })

  it('should be able to add node', ()=> {
    G.add_node(1)
    G.add_node(3)
    expect(_.size(G.nodes)).to.equal(2)
    expect(_.keys(G.nodes)).to.deep.equal(['1','3'])
  })

  it('should be able to add node as well as property',()=> {
    G.add_node(1,{'weight': 2})
    G.add_node(2,{'weight': 5})
    expect(_.size(G.nodes)).to.equal(2)
    expect(_.keys(G.nodes)).to.deep.equal(['1','2'])
    expect(_.keys(G.nodes['1'])).to.deep.equal(['weight'])
    expect(G.nodes['1'].weight).to.equal(2)
  })

  it('should be able to add multiple nodes', ()=> {
    G.add_nodes_from([1,2,3])
    expect(_.size(G.nodes)).to.equal(3)
    expect(_.keys(G.nodes)).to.deep.equal(['1','2','3'])
  })

  it('should be able to return the nodes added', ()=> {
    G.add_nodes_from([1,2])
    let n = G.nodes
    expect(_.size(n)).to.equal(2)
  })

  it('should return true if contains node and false if not', () => {
    G.add_nodes_from([1,2])
    expect(G.has_node(2)).to.be.true
    expect(G.has_node(4)).to.be.false
  })

  it('should be able to add edges',() => {
    G.add_edge(1,2)
    G.add_edge(4,5,{'weight' : 3})
    expect(G.adj[1][2]).to.be.eql({})
    expect(G.adj[4][5]).to.be.eql({'weight' : 3})
  })

  it('should be able to add edges from tuples', ()=>{
    G.add_edges_from([[1,2],[2,3]],{'weight' : 2})
    expect(G.adj[1][2]).to.be.eql({'weight' : 2})
    expect(G.adj[2][3]).to.be.eql({'weight' : 2})
    G.add_edges_from([[3,4,{'weight' : 4}]])
    expect(G.adj[3][4]).to.be.eql({'weight' : 4})
  })

  it('should be able to add weighted edges', ()=>{
    G.add_weighted_edges_from([[1,2,0.4],[2,3,0.7]])
    expect(G.adj[1][2]).to.be.eql({'weight':0.4})
    expect(G.adj[2][3]).to.be.eql({'weight':0.7})
  })
})
