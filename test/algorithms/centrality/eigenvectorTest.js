/**
 * Eigenvector Centrality Test Suite
 */

 import { expect } from 'chai'
 import Graph from '../../../src/data-structures/Graph'
 import { eigenvector_centrality } from '../../../src/algorithms/centrality/eigenvector'
 import 'babel-polyfill'
 import _ from 'lodash'

 describe('Eigenvector Centrality Test Suite', ()=> {
   let G
   beforeEach(() => {
     G = new Graph()
   })

   it('should be able calculate eigenvector centrality', ()=> {
     G.add_edges_from([[1,2],[2,3],[1,3],[1,4],[3,5],[4,5]])
     let eig = { '1': 0.5510941264178472,'2': 0.44421682373603405,
     '3': 0.5510941264178472,'4': 0.37206065733264654,
     '5': 0.37206065733264654
    }
     expect(eigenvector_centrality(G)).to.eql(eig)
   })
 })
