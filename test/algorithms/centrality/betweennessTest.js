/**
 * Betweenness Centrality Test Suite
 */
 import { expect } from 'chai'
 import Graph from '../../../src/data-structures/Graph'
 import {
   _single_source_shortest_path_basic,
   _single_source_dijkstra_path_basic,
   betweenness_centrality,
   _accumulate_basic
 } from '../../../src/algorithms/centrality/betweenness'
 import 'babel-polyfill'
 import _ from 'lodash'

 describe('Betweenness Centrality Test Suite', ()=> {
   let G
   beforeEach(() => {
     G = new Graph()
   })

   it('should be able to return shortest path basic', ()=> {
     G.add_edges_from([[1,2],[2,3],[2,4],[3,5]])
     let {S,P,sigma} = _single_source_shortest_path_basic(G,5)
     expect(S).to.eql([5,3,2,1,4])
   })

   it('should return shortest path djikstra', ()=>{
     G.add_edges_from([[1,2]],{'weight':2})
     G.add_edges_from([[2,3]],{'weight':1})
     G.add_edges_from([[1,3]],{'weight':8})
     G.add_edges_from([[1,4]],{'weight':5})
     G.add_edges_from([[3,5]],{'weight':3})
     G.add_edges_from([[4,5]],{'weight':4})
     let {S,P,sigma} = _single_source_dijkstra_path_basic(G,4)
     expect(S).to.eql([4,5,1,3,2])
   })

   it('should return betweenness centrality of weighted edges',()=>{
     G.add_edges_from([[1,2],[2,3],[1,3],[1,4],[3,5],[4,5]])
     var bet = {'1': 0.25, '2': 0.0, '3': 0.25,
       '4': 0.08333333333333333, '5': 0.08333333333333333}
     expect(betweenness_centrality(G)).to.eql(bet)
   })

   it('should return betweenness centrality of weighted edges',()=>{
     G.add_edges_from([[1,2]],{'weight':2})
     G.add_edges_from([[2,3]],{'weight':1})
     G.add_edges_from([[1,3]],{'weight':8})
     G.add_edges_from([[1,4]],{'weight':5})
     G.add_edges_from([[3,5]],{'weight':3})
     G.add_edges_from([[4,5]],{'weight':4})
     var bet = { '1': 0.16666666666666666,'2': 0.3333333333333333,
     '3': 0.3333333333333333,'4': 0,'5': 0.16666666666666666 }
     expect(betweenness_centrality(G,null,true,'weight')).to.eql(bet)
   })
 })
