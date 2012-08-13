nodes  = require './nodes' if require?
agent = exports ? this

nodeMap = []
startNode = null
endNode = null
frontier = []
visited = []
normalMoveCost = 10
heurestic = null

manhattanHeurestic = (a, b) ->
  return 10*(Math.abs(a.x - b.x) + Math.abs(a.y - b.y))

getNodeByYX = (y, x) ->
  return nodeMap[y] && nodeMap[y][x]

isInArray = (node, arr) ->
  return arr.indexOf(node) != -1

isGoalNode = (node) ->
  return node.isGoal

isBetter = (node, old) ->
  g = (node.parent && node.parent.g || 0) + old.cost
  return g < old.g

isStartNode = (node) ->
  return node.isStart

getNeighbours = (node) ->
  return [
    nodeMap[node.y-1] && nodeMap[node.y-1][node.x],
    nodeMap[node.y+1] && nodeMap[node.y+1][node.x],
    nodeMap[node.y] && nodeMap[node.y][node.x-1],
    nodeMap[node.y] && nodeMap[node.y][node.x+1]
  ]

getCandidateFromFrontier = () ->
  min = Infinity
  for n in frontier
    if n.f < min
      min = n.f
      t = n

  res = t
  frontier.splice( frontier.indexOf(t), 1 )
  visited.push(res)

  return res

calculateNode = (node, parent) ->
    h = heurestic(node, endNode)
    if parent
      g = parent.g || 0 + node.cost
    else if node.parent
      g = node.parent.g + node.cost
    else
      g = node.cost
    f = g + h
    return [f, g, h]
  
addToFrontier = (nodes, parent, stepCallback) ->
  for node in nodes
    continue if !node
    if shouldVisit(node, parent)
      if isInArray(node, frontier)
        [f, g, h] = calculateNode(node, parent)
      else
        [f, g, h] = calculateNode(node)
        console.log(g)
        node.parent = parent
        node.g = g
        node.f = f
        frontier.push(node)

      if g < (node.g || Infinity)
        node.g = g 
        node.f = f
      
      stepCallback(nodes, node) if stepCallback?

searchStep = (callback, stepCallback) ->
  node = getCandidateFromFrontier()
  if isGoalNode(node)
    console.log("ah!")
    buildPath(node, callback)
    resetState()
  else
    adj = getNeighbours(node)
    addToFrontier(adj, node, stepCallback)
    

shouldVisit = (node) ->
  return node.pass && !isInArray(node, visited) && !isStartNode(node)

resetState = () ->
  startNode.isStart = false
  startNode.parent = null
  endNode.isGoal = false
  endNode.parent = null
  for node in frontier
    node.parent = null
  for node in visited
    node.parent = null
  frontier = []
  visited = []

buildPath = (node, callback) ->
  console.log(node)
  path = []
  while node.parent 
    path.push({x: node.x, y: node.y})
    node = node.parent
  resetState(path)
  callback(path.reverse())

parseMap = (map) ->
  for row, y in map
    newRow = []
    nodeMap.push(newRow)
    for column, x in row
      switch column
        when 0 then node = new EmptyNode y, x
        when 1 then node = new WallNode y, x
      newRow.push( node )
  return nodeMap

agent.parseMap = (map) ->
  parseMap(map)

agent.findRoute = (start, end, callback, stepCb, delay, h) ->
  return callback([]) if (start.x == end.x && start.y == end.y) 
  heurestic = h || manhattanHeurestic
  delay = delay || 0
  startNode = getNodeByYX(start.y, start.x)
  startNode.cost = 0
  startNode.isStart = true
  endNode = getNodeByYX(end.y, end.x)
  endNode.isGoal = true
  [f, g, h] = calculateNode(startNode)
  startNode.g = g
  startNode.f = f
  frontier.push(startNode)
  step = () ->
    if frontier.length
      searchStep(callback, stepCb)
      setTimeout(step, delay)
  setTimeout(step, delay)
