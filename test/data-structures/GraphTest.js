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

  it('should be able to delete node', () => {
    G.add_nodes_from([1,2])
    G.remove_node(2)
    expect(G.has_node(1)).to.be.true
    expect(G.has_node(2)).to.be.false
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

  it('should remove added edge',()=> {
    G.add_edge(1,2)
    G.remove_edge(1,2)
    expect(_.has(G.adj,[1,2])).to.be.false
  })

  it('should be able to remove edges from list', ()=> {
    G.add_edges_from([[1,2],[3,4]])
    G.remove_edges_from([[1,2]])
    expect(_.has(G.adj,[1,2])).to.be.false
  })

  it('should have an edge which is added', ()=> {
    G.add_edges_from([[1,2],[3,4]])
    expect(G.has_edge(1,2)).to.be.true
    expect(G.has_edge(2,3)).to.be.false
  })

  it('should return iterable array for nodes in graph', ()=> {
    G.add_edges_from([[1,2],[3,4]])
    expect(G.nbunch_iter([1,3,5])).to.eql([1,3])
    expect(G.nbunch_iter([])).to.eql([1,2,3,4])
  })

  it('should return iterable array for degrees in graph', ()=> {
    G.add_edges_from([[1,2],[1,3],[1,4],[4,5]])
    let dg = G.degree_iter([1])
    expect(dg[0][0]).to.equal(1)
    expect(dg[0][1]).to.equal(3)
    G.remove_edges_from([[1,2],[1,3],[1,4],[4,5]])
    G.add_edges_from([[1,2],[1,3],[1,4],[4,5]],{'weight' : 4})
    dg = G.degree_iter([1],1)
    expect(dg[0][1]).to.equal(12)
  })

  it('should load csv', ()=> {
    G.read_csv('test/test.csv','Source','Target','Weight',(err)=>{
      expect(G.num_nodes()).to.eql(5)
    })
  })
})
