#!/usr/bin/env node

/**
 * Command Line tool for NetworkJS
 * Author : Koustuv Sinha
 */
"use strict";

require("babel-core/register");
require("babel-polyfill");
var program = require('commander')
var co = require('co');
var prompt = require('co-prompt');
import Graph from './data-structures/Graph'
import {degree_centrality} from './algorithms/centrality/degree'
var betweenness_centrality = require('./algorithms/centrality/betweenness').betweenness_centrality
var eigenvector_centrality = require('./algorithms/centrality/eigenvector').eigenvector_centrality

program.arguments('<file.csv>')
  .option('-d,--degree','Calculate the degree centrality')
  .option('-b,--betweenness','Calculate the betweenness centrality')
  .option('-e,--eigenvector','Calculate the Eigenvector centrality')
  .action((file)=>{
    let G = new Graph()
    co(function *() {
      var sourceNode = yield prompt('sourceNode: ')
      var targetNode = yield prompt('targetNode: ')
      var weightNode = yield prompt('weightNode: ')
      G.read_csv(file,sourceNode,targetNode,weightNode,(err)=>{
        if(err) {
          console.log(err)
          process.exit(1)
        }
        else {
          console.log('Done reading file')
          console.log(G.num_nodes() + ' nodes found')
          if(program.degree) {
            console.log('Calculating Degree centrality ...')
            console.log(degree_centrality(G))
          }
          if(program.betweenness) {
            console.log('Calculating Betweenness centrality ...')
            console.log(betweenness_centrality(G,null,true,weightNode))
          }
          if(program.eigenvector) {
            console.log('Calculating Eigenvector centrality ...')
            console.log(eigenvector_centrality(G,100,1.0e-6,null,weightNode))
          }
          process.exit(0);
        }
      })
    })
  })
  .parse(process.argv)
