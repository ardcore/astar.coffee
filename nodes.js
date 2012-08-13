(function() {
  var EmptyNode, EndNode, Node, StartNode, WallNode, nodes;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  nodes = typeof exports != "undefined" && exports !== null ? exports : this;
  Node = (function() {
    var symbol, visited;
    function Node(y, x) {
      this.y = y;
      this.x = x;
    }
    visited = false;
    Node.prototype.pass = true;
    symbol = "?";
    Node.prototype.cost = 10;
    Node.prototype.markVisited = function() {
      return visited = true;
    };
    Node.prototype.markNotVisited = function() {
      return visited = false;
    };
    Node.prototype.toString = function() {
      return symbol;
    };
    return Node;
  })();
  EmptyNode = (function() {
    var symbol;
    function EmptyNode() {
      EmptyNode.__super__.constructor.apply(this, arguments);
    }
    __extends(EmptyNode, Node);
    symbol = ".";
    EmptyNode.prototype.cost = 10;
    EmptyNode.prototype.toString = function() {
      return symbol;
    };
    return EmptyNode;
  })();
  WallNode = (function() {
    var symbol;
    function WallNode() {
      WallNode.__super__.constructor.apply(this, arguments);
    }
    __extends(WallNode, Node);
    symbol = "#";
    WallNode.prototype.pass = false;
    WallNode.prototype.toString = function() {
      return symbol;
    };
    return WallNode;
  })();
  StartNode = (function() {
    var symbol;
    function StartNode() {
      StartNode.__super__.constructor.apply(this, arguments);
    }
    __extends(StartNode, Node);
    symbol = "@";
    StartNode.prototype.cost = 10;
    StartNode.prototype.toString = function() {
      return symbol;
    };
    return StartNode;
  })();
  EndNode = (function() {
    var symbol;
    function EndNode() {
      EndNode.__super__.constructor.apply(this, arguments);
    }
    __extends(EndNode, Node);
    symbol = ">";
    EndNode.prototype.toString = function() {
      return symbol;
    };
    return EndNode;
  })();
  nodes.Node = Node;
  nodes.EmptyNode = EmptyNode;
  nodes.WallNode = WallNode;
  nodes.StartNode = StartNode;
  nodes.EndNode = EndNode;
}).call(this);
