nodes = exports ? this

class Node

  constructor: (@y, @x) ->

  visited = false
  pass: true
  symbol = "?"

  cost:10 
  
  markVisited: ->
    visited = true

  markNotVisited: ->
    visited = false

  toString: ->
    return symbol

class EmptyNode extends Node
  symbol = "."
  cost: 10
  toString: ->
    return symbol

class WallNode extends Node
  symbol = "#"
  pass: false
  toString: ->
    return symbol

class StartNode extends Node
  symbol = "@"
  cost: 10
  toString: ->
    return symbol

class EndNode extends Node
  symbol = ">"
  toString: ->
    return symbol

nodes.Node = Node
nodes.EmptyNode = EmptyNode
nodes.WallNode = WallNode
nodes.StartNode = StartNode
nodes.EndNode = EndNode
    
