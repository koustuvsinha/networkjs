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
    expect(G.nodeSize).to.equal(2)
    expect(_.keys(G.nodes)).to.deep.equal(['1','3'])
  })

  it('should be able to add multiple nodes', ()=> {
    G.add_nodes_from([1,2,3])
    expect(G.nodeSize).to.equal(3)
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
})
