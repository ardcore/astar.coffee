(function() {
  var addMapElement, agent, boundHandler, drawMap, finalCb, handleMapClick, map, mapElement, resetMap, selectEnd, selectStart, start, stepCb;
  if (typeof require != "undefined" && require !== null) {
    agent = require('./agent');
  }
  mapElement = document.querySelector("#map");
  handleMapClick = null;
  boundHandler = null;
  start = null;
  map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1], [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]];
  addMapElement = function(y, x, pass) {
    var el, elClass;
    el = document.createElement("div");
    elClass = pass ? "field" : "wall";
    elClass += " x" + x + "y" + y;
    el.className = elClass;
    return mapElement.appendChild(el);
  };
  drawMap = function() {
    var column, row, x, y, _len, _results;
    mapElement.innerHTML = "";
    _results = [];
    for (y = 0, _len = map.length; y < _len; y++) {
      row = map[y];
      _results.push((function() {
        var _len, _results;
        _results = [];
        for (x = 0, _len = row.length; x < _len; x++) {
          column = row[x];
          _results.push(addMapElement(y, x, !column));
        }
        return _results;
      })());
    }
    return _results;
  };
  drawMap();
  selectStart = function(e) {
    var target, x, y;
    e.preventDefault();
    target = e.target;
    if (!target.className.match(/field/)) {
      return;
    }
    target.className += " start";
    x = target.className.match(/x(\d*)/)[1];
    y = target.className.match(/y(\d*)/)[1];
    start = {
      x: x,
      y: y
    };
    return boundHandler = selectEnd;
  };
  selectEnd = function(e) {
    var end, target, x, y;
    e.preventDefault();
    target = e.target;
    if (!target.className.match(/field/) || target.className.match(/start/)) {
      return;
    }
    target.className += " end";
    x = target.className.match(/x(\d*)/)[1];
    y = target.className.match(/y(\d*)/)[1];
    end = {
      x: x,
      y: y
    };
    findRoute(start, end, finalCb, stepCb, 5);
    return boundHandler = function() {};
  };
  resetMap = function() {
    var end;
    drawMap();
    start = {};
    end = {};
    return boundHandler = selectStart;
  };
  boundHandler = selectStart;
  handleMapClick = function(e) {
    return boundHandler(e);
  };
  mapElement.addEventListener("click", handleMapClick, false);
  parseMap(map);
  finalCb = function(path) {
    var element, _i, _len, _results;
    boundHandler = resetMap;
    _results = [];
    for (_i = 0, _len = path.length; _i < _len; _i++) {
      element = path[_i];
      _results.push(document.querySelector(".x" + element.x + "y" + element.y).className += " path");
    }
    return _results;
  };
  stepCb = function(newFrontier, node) {
    var element, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = newFrontier.length; _i < _len; _i++) {
      element = newFrontier[_i];
      _results.push(element ? document.querySelector(".x" + element.x + "y" + element.y).className += " frontier" : void 0);
    }
    return _results;
  };
}).call(this);
