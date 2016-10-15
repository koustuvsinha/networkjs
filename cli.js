#!/usr/bin/env node

/**
 * Command Line tool for NetworkJS
 * Author : Koustuv Sinha
 */
"use strict";

require("babel-core/register");
require("babel-polyfill");
var json2csv = require("json2csv")
var program = require('commander')
var co = require('co');
var prompt = require('co-prompt');
var _ = require('lodash')
import Graph from './data-structures/Graph'
import {degree_centrality} from './algorithms/centrality/degree'
var betweenness_centrality = require('./algorithms/centrality/betweenness').betweenness_centrality
var eigenvector_centrality = require('./algorithms/centrality/eigenvector').eigenvector_centrality

program.arguments('<file.csv> <sourceNode> <targetNode> [weightNode]')
  .option('-d,--degree','Calculate the degree centrality')
  .option('-b,--betweenness','Calculate the betweenness centrality')
  .option('-e,--eigenvector','Calculate the Eigenvector centrality')
  .option('-j,--json','Return the results in json, else csv')
  .action((file,sourceNode,targetNode,weightNode)=>{
    let G = new Graph()
    co(function *() {
      sourceNode = sourceNode ? sourceNode : 'Source'
      targetNode = targetNode ? targetNode : 'Target'
      weightNode = weightNode ? weightNode : 'Weight'
      G.read_csv(file,sourceNode,targetNode,weightNode,(err)=>{
        if(err) {
          console.log(err)
          process.exit(1)
        }
        else {
          //console.log('Done reading file')
          //console.log(G.num_nodes() + ' nodes found')
          var res = {}
          var fields = ['node']
          if(program.degree) {
            //console.log('Calculating Degree centrality ...')
            res['degree_centrality'] = degree_centrality(G)
            fields.push('degree_centrality')
          }
          if(program.betweenness) {
            //var k = yield prompt('k: (default null)')
            //var normalized = yield prompt('t: true,f: false (default true)')
            //normalized = normalized === 'f' ? false : true
            //console.log('Calculating Betweenness centrality ...')
            res['betweenness_centrality'] = betweenness_centrality(G,null,true,weightNode)
            fields.push('betweenness_centrality')
          }
          if(program.eigenvector) {
            //console.log('Calculating Eigenvector centrality ...')
            res['eigenvector_centrality'] = eigenvector_centrality(G,100,1.0e-6,null,weightNode)
            fields.push('eigenvector_centrality')
          }
          if(program.json) {
            console.log(res)
          }
          else {
            console.log(json2csv({data: reformat(res),fields : fields}))
          }
          process.exit(0);
        }
      })
    })
  })
  .parse(process.argv)

  function reformat(output) {
    var m = []
    _.each(output,function(result,property) {
      _.each(result,function(value,key) {
        var prevRec = _.find(m,{'node' : parseInt(key)})
        if(prevRec) {
          _.remove(m,function(rec) {
            return rec.node == parseInt(key)
          })
          prevRec[property] = value
          m.push(prevRec)
        } else {
          var rec = {}
          rec['node'] = parseInt(key)
          rec[property] = value
          m.push(rec)
        }
      })
    })
    return m
  }
