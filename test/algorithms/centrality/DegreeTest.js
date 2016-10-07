/**
 * Degree Centrality Test Suite
 */

 import { expect } from 'chai'
 import Graph from '../../../src/data-structures/Graph'
 import { degree_centrality } from '../../../src/algorithms/centrality/degree'
 import 'babel-polyfill'
 import _ from 'lodash'

 describe('Degree Centrality Test Suite', ()=> {
   let G
   beforeEach(() => {
     G = new Graph()
   })

   it('should be able calculate degree centrality', ()=> {
     G.add_edges_from([[1,3],[2,3]])
     expect(degree_centrality(G)).to.eql({ '1': 0.5, '2': 0.5, '3': 1 })
   })
 })
