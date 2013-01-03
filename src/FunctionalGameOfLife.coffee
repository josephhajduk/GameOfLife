class FunctionalGameOfLife
  constructor: (@cellSize,@rows,@columns,@seedProbability) ->
    @canvas = document.createElement 'canvas'
    document.body.appendChild @canvas
    @canvas.height = @cellSize * @rows
    @canvas.width = @cellSize * @columns
    @clicks = []
    @canvas.onclick = @click
    window.onkeydown = @keydown

    @drawing_context = @canvas.getContext '2d'
    initial_state = @seed(@seedProbability,@rows,@columns)

    @paused = false

    @loop(initial_state)()

  keydown: (event) =>
    if event.keyCode = 32
      @paused = not @paused

  click: (event) =>
    event = event || window.event
    x = event.pageX - @canvas.offsetLeft
    y = event.pageY - @canvas.offsetTop

    c = Math.floor(x/@cellSize)
    r = Math.floor(y/@cellSize)

    @clicks.push([r,c])

    console.log "Clicked #{r},#{c}"

  loop: (state) =>
    () =>
      @draw_state(state,@drawing_context,@cellSize,@paused)
      new_state = @evolve_state(state)
      requestAnimFrame @loop(new_state)

  evolve_state: (old_state)=>
    for row in [0...@rows]
      for column in [0...@columns]
        if not @paused
          cell = old_state[row][column].evolve()
        else
          cell = old_state[row][column]

        #check for clicks
        for click in @clicks
          if click[0] == row and click[1] == column
            @clicks.splice(click)
            cell.click()

        cell

  draw_state: (state,context,cellSize,paused) =>
    for row in [0...@rows]
      for column in [0...@columns]
        state[row][column].draw(context,row,column,cellSize,paused)


  seed: (probability, numberOfRows,numberOfColumns) ->
    genBoard = () ->
      for row in [0...numberOfRows]
        for column in [0...numberOfColumns]
          new FunctionalGolCell(probability)

    board = genBoard()

    mod = (a,n)->
      ((a%n)+n)%n

    for row in [0...numberOfRows]
      for column in [0...numberOfColumns]
        board[row][column].setNeighbors([
          board[mod(row - 1,numberOfRows)][mod(column - 1,numberOfColumns)]
          board[mod(row - 1,numberOfRows)][mod(column    ,numberOfColumns)]
          board[mod(row - 1,numberOfRows)][mod(column + 1,numberOfColumns)]
          board[mod(row    ,numberOfRows)][mod(column - 1,numberOfColumns)]
          #self
          board[mod(row    ,numberOfRows)][mod(column + 1,numberOfColumns)]
          board[mod(row + 1,numberOfRows)][mod(column - 1,numberOfColumns)]
          board[mod(row + 1,numberOfRows)][mod(column    ,numberOfColumns)]
          board[mod(row + 1,numberOfRows)][mod(column + 1,numberOfColumns)]
        ])

    board

  window.FunctionalGameOfLife = FunctionalGameOfLife