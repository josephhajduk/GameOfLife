class FunctionalGolCell
  constructor: (seedProbability) ->
    @isAlive = Math.random() < seedProbability

  setNeighbors: (neighbors) ->
    @neighbors = neighbors
    @

  evolve: =>
    if @lazyEvolve?
      return @lazyEvolve
    else
      livingNeighbors = @neighbors.filter((x) -> x.isAlive)

      evolvedCellAlive = @isAlive
      if @isAlive or livingNeighbors.length is 3
        evolvedCellAlive = 1 < livingNeighbors.length < 4

      #need to set this before we go through neighbors, cause eventually we wil be a neighbor of ourselves so we need to trigger lazy version
      @lazyEvolve = new FunctionalGolCell(evolvedCellAlive)

      evolvedNeighbors = []
      for n in @neighbors
        evolvedNeighbors.push(n.evolve())

      @lazyEvolve = @lazyEvolve.setNeighbors(evolvedNeighbors)

      return @lazyEvolve

  click: () =>
    @isAlive = not @isAlive

  draw: (context,row,column,cellSize,paused=false) ->
    x = column * cellSize
    y = row * cellSize

    if @isAlive
      if not paused
        fillStyle = 'rgb(242, 198, 65)'
      else
        fillStyle = 'rgb(84, 84, 84)'
    else
      fillStyle = 'rgb(38, 38, 38)'

    context.strokeStyle = 'rgba(242, 198, 65, 0.1)'
    context.strokeRect x, y, cellSize, cellSize

    context.fillStyle = fillStyle
    context.fillRect x, y, cellSize, cellSize

  window.FunctionalGolCell = FunctionalGolCell