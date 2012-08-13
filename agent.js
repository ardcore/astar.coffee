(function() {
  var addToFrontier, agent, buildPath, calculateNode, endNode, frontier, getCandidateFromFrontier, getNeighbours, getNodeByYX, heurestic, isBetter, isGoalNode, isInArray, isStartNode, manhattanHeurestic, nodeMap, nodes, normalMoveCost, parseMap, resetState, searchStep, shouldVisit, startNode, visited;
  if (typeof require != "undefined" && require !== null) {
    nodes = require('./nodes');
  }
  agent = typeof exports != "undefined" && exports !== null ? exports : this;
  nodeMap = [];
  startNode = null;
  endNode = null;
  frontier = [];
  visited = [];
  normalMoveCost = 10;
  heurestic = null;
  manhattanHeurestic = function(a, b) {
    return 10 * (Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
  };
  getNodeByYX = function(y, x) {
    return nodeMap[y] && nodeMap[y][x];
  };
  isInArray = function(node, arr) {
    return arr.indexOf(node) !== -1;
  };
  isGoalNode = function(node) {
    return node.isGoal;
  };
  isBetter = function(node, old) {
    var g;
    g = (node.parent && node.parent.g || 0) + old.cost;
    return g < old.g;
  };
  isStartNode = function(node) {
    return node.isStart;
  };
  getNeighbours = function(node) {
    return [nodeMap[node.y - 1] && nodeMap[node.y - 1][node.x], nodeMap[node.y + 1] && nodeMap[node.y + 1][node.x], nodeMap[node.y] && nodeMap[node.y][node.x - 1], nodeMap[node.y] && nodeMap[node.y][node.x + 1]];
  };
  getCandidateFromFrontier = function() {
    var min, n, res, t, _i, _len;
    min = Infinity;
    for (_i = 0, _len = frontier.length; _i < _len; _i++) {
      n = frontier[_i];
      if (n.f < min) {
        min = n.f;
        t = n;
      }
    }
    res = t;
    frontier.splice(frontier.indexOf(t), 1);
    visited.push(res);
    return res;
  };
  calculateNode = function(node, parent) {
    var f, g, h;
    h = heurestic(node, endNode);
    if (parent) {
      g = parent.g || 0 + node.cost;
    } else if (node.parent) {
      g = node.parent.g + node.cost;
    } else {
      g = node.cost;
    }
    f = g + h;
    return [f, g, h];
  };
  addToFrontier = function(nodes, parent, stepCallback) {
    var f, g, h, node, _i, _len, _ref, _ref2, _results;
    _results = [];
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
      if (!node) {
        continue;
      }
      _results.push(shouldVisit(node, parent) ? (isInArray(node, frontier) ? (_ref = calculateNode(node, parent), f = _ref[0], g = _ref[1], h = _ref[2], _ref) : ((_ref2 = calculateNode(node), f = _ref2[0], g = _ref2[1], h = _ref2[2], _ref2), console.log(g), node.parent = parent, node.g = g, node.f = f, frontier.push(node)), g < (node.g || Infinity) ? (node.g = g, node.f = f) : void 0, stepCallback != null ? stepCallback(nodes, node) : void 0) : void 0);
    }
    return _results;
  };
  searchStep = function(callback, stepCallback) {
    var adj, node;
    node = getCandidateFromFrontier();
    if (isGoalNode(node)) {
      console.log("ah!");
      buildPath(node, callback);
      return resetState();
    } else {
      adj = getNeighbours(node);
      return addToFrontier(adj, node, stepCallback);
    }
  };
  shouldVisit = function(node) {
    return node.pass && !isInArray(node, visited) && !isStartNode(node);
  };
  resetState = function() {
    var node, _i, _j, _len, _len2;
    startNode.isStart = false;
    startNode.parent = null;
    endNode.isGoal = false;
    endNode.parent = null;
    for (_i = 0, _len = frontier.length; _i < _len; _i++) {
      node = frontier[_i];
      node.parent = null;
    }
    for (_j = 0, _len2 = visited.length; _j < _len2; _j++) {
      node = visited[_j];
      node.parent = null;
    }
    frontier = [];
    return visited = [];
  };
  buildPath = function(node, callback) {
    var path;
    console.log(node);
    path = [];
    while (node.parent) {
      path.push({
        x: node.x,
        y: node.y
      });
      node = node.parent;
    }
    resetState(path);
    return callback(path.reverse());
  };
  parseMap = function(map) {
    var column, newRow, node, row, x, y, _len, _len2;
    for (y = 0, _len = map.length; y < _len; y++) {
      row = map[y];
      newRow = [];
      nodeMap.push(newRow);
      for (x = 0, _len2 = row.length; x < _len2; x++) {
        column = row[x];
        switch (column) {
          case 0:
            node = new EmptyNode(y, x);
            break;
          case 1:
            node = new WallNode(y, x);
        }
        newRow.push(node);
      }
    }
    return nodeMap;
  };
  agent.parseMap = function(map) {
    return parseMap(map);
  };
  agent.findRoute = function(start, end, callback, stepCb, delay, h) {
    var f, g, step, _ref;
    if (start.x === end.x && start.y === end.y) {
      return callback([]);
    }
    heurestic = h || manhattanHeurestic;
    delay = delay || 0;
    startNode = getNodeByYX(start.y, start.x);
    startNode.cost = 0;
    startNode.isStart = true;
    endNode = getNodeByYX(end.y, end.x);
    endNode.isGoal = true;
    _ref = calculateNode(startNode), f = _ref[0], g = _ref[1], h = _ref[2];
    startNode.g = g;
    startNode.f = f;
    frontier.push(startNode);
    step = function() {
      if (frontier.length) {
        searchStep(callback, stepCb);
        return setTimeout(step, delay);
      }
    };
    return setTimeout(step, delay);
  };
}).call(this);
