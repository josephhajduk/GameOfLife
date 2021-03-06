// Generated by CoffeeScript 1.4.0
(function() {
  var FunctionalGameOfLife,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FunctionalGameOfLife = (function() {

    function FunctionalGameOfLife(cellSize, rows, columns, seedProbability) {
      var initial_state;
      this.cellSize = cellSize;
      this.rows = rows;
      this.columns = columns;
      this.seedProbability = seedProbability;
      this.draw_state = __bind(this.draw_state, this);

      this.evolve_state = __bind(this.evolve_state, this);

      this.loop = __bind(this.loop, this);

      this.click = __bind(this.click, this);

      this.keydown = __bind(this.keydown, this);

      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
      this.canvas.height = this.cellSize * this.rows;
      this.canvas.width = this.cellSize * this.columns;
      this.clicks = [];
      this.canvas.onclick = this.click;
      window.onkeydown = this.keydown;
      this.drawing_context = this.canvas.getContext('2d');
      initial_state = this.seed(this.seedProbability, this.rows, this.columns);
      this.paused = false;
      this.loop(initial_state)();
    }

    FunctionalGameOfLife.prototype.keydown = function(event) {
      if (event.keyCode = 32) {
        return this.paused = !this.paused;
      }
    };

    FunctionalGameOfLife.prototype.click = function(event) {
      var c, r, x, y;
      event = event || window.event;
      x = event.pageX - this.canvas.offsetLeft;
      y = event.pageY - this.canvas.offsetTop;
      c = Math.floor(x / this.cellSize);
      r = Math.floor(y / this.cellSize);
      this.clicks.push([r, c]);
      return console.log("Clicked " + r + "," + c);
    };

    FunctionalGameOfLife.prototype.loop = function(state) {
      var _this = this;
      return function() {
        var new_state;
        _this.draw_state(state, _this.drawing_context, _this.cellSize, _this.paused);
        new_state = _this.evolve_state(state);
        return requestAnimFrame(_this.loop(new_state));
      };
    };

    FunctionalGameOfLife.prototype.evolve_state = function(old_state) {
      var cell, click, column, row, _i, _ref, _results;
      _results = [];
      for (row = _i = 0, _ref = this.rows; 0 <= _ref ? _i < _ref : _i > _ref; row = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _k, _len, _ref1, _ref2, _results1;
          _results1 = [];
          for (column = _j = 0, _ref1 = this.columns; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; column = 0 <= _ref1 ? ++_j : --_j) {
            if (!this.paused) {
              cell = old_state[row][column].evolve();
            } else {
              cell = old_state[row][column];
            }
            _ref2 = this.clicks;
            for (_k = 0, _len = _ref2.length; _k < _len; _k++) {
              click = _ref2[_k];
              if (click[0] === row && click[1] === column) {
                this.clicks.splice(click);
                cell.click();
              }
            }
            _results1.push(cell);
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    FunctionalGameOfLife.prototype.draw_state = function(state, context, cellSize, paused) {
      var column, row, _i, _ref, _results;
      _results = [];
      for (row = _i = 0, _ref = this.rows; 0 <= _ref ? _i < _ref : _i > _ref; row = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (column = _j = 0, _ref1 = this.columns; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; column = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(state[row][column].draw(context, row, column, cellSize, paused));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    FunctionalGameOfLife.prototype.seed = function(probability, numberOfRows, numberOfColumns) {
      var board, column, genBoard, mod, row, _i, _j;
      genBoard = function() {
        var column, row, _i, _results;
        _results = [];
        for (row = _i = 0; 0 <= numberOfRows ? _i < numberOfRows : _i > numberOfRows; row = 0 <= numberOfRows ? ++_i : --_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (column = _j = 0; 0 <= numberOfColumns ? _j < numberOfColumns : _j > numberOfColumns; column = 0 <= numberOfColumns ? ++_j : --_j) {
              _results1.push(new FunctionalGolCell(probability));
            }
            return _results1;
          })());
        }
        return _results;
      };
      board = genBoard();
      mod = function(a, n) {
        return ((a % n) + n) % n;
      };
      for (row = _i = 0; 0 <= numberOfRows ? _i < numberOfRows : _i > numberOfRows; row = 0 <= numberOfRows ? ++_i : --_i) {
        for (column = _j = 0; 0 <= numberOfColumns ? _j < numberOfColumns : _j > numberOfColumns; column = 0 <= numberOfColumns ? ++_j : --_j) {
          board[row][column].setNeighbors([board[mod(row - 1, numberOfRows)][mod(column - 1, numberOfColumns)], board[mod(row - 1, numberOfRows)][mod(column, numberOfColumns)], board[mod(row - 1, numberOfRows)][mod(column + 1, numberOfColumns)], board[mod(row, numberOfRows)][mod(column - 1, numberOfColumns)], board[mod(row, numberOfRows)][mod(column + 1, numberOfColumns)], board[mod(row + 1, numberOfRows)][mod(column - 1, numberOfColumns)], board[mod(row + 1, numberOfRows)][mod(column, numberOfColumns)], board[mod(row + 1, numberOfRows)][mod(column + 1, numberOfColumns)]]);
        }
      }
      return board;
    };

    window.FunctionalGameOfLife = FunctionalGameOfLife;

    return FunctionalGameOfLife;

  })();

}).call(this);
