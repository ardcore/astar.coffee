agent = require './agent' if require?

mapElement = document.querySelector("#map")

handleMapClick = null
boundHandler = null
start = null

map = [ 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
  [0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,1],
  [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0],
  [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0]

]

addMapElement = (y, x, pass) ->
  el = document.createElement("div")
  elClass = if pass then "field" else "wall"
  elClass += " x" + x + "y" + y 
  el.className = elClass
  mapElement.appendChild(el) 

drawMap = () ->
  mapElement.innerHTML = ""
  for row, y in map
    for column, x in row
      addMapElement(y, x, !column)

drawMap()

selectStart = (e) ->
  e.preventDefault()
  target = e.target
  return if !target.className.match(/field/)
  target.className += " start"
  x = target.className.match(/x(\d*)/)[1]
  y = target.className.match(/y(\d*)/)[1]
  start = {x: x, y: y}
  boundHandler = selectEnd

  
selectEnd = (e) ->
  e.preventDefault()
  target = e.target
  return if !target.className.match(/field/) || target.className.match(/start/)
  target.className += " end"
  x = target.className.match(/x(\d*)/)[1]
  y = target.className.match(/y(\d*)/)[1]
  end = {x: x, y: y}
  findRoute(start, end, finalCb, stepCb, 5)
  boundHandler = () ->

resetMap = () ->
  drawMap()
  start = {}
  end = {}
  boundHandler = selectStart

boundHandler = selectStart

handleMapClick = (e) ->
  boundHandler(e)

mapElement.addEventListener("click", handleMapClick, false)

parseMap(map)

finalCb = (path) ->
  boundHandler = resetMap
  for element in path
    document.querySelector(".x" + element.x + "y" + element.y).className += " path"

stepCb = (newFrontier, node) ->
  for element in newFrontier
    if element
      document.querySelector(".x" + element.x + "y" + element.y).className += " frontier"


