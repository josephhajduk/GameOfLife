// Generated by CoffeeScript 1.4.0
(function() {
  var FunctionalGolCell,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FunctionalGolCell = (function() {

    function FunctionalGolCell(seedProbability) {
      this.click = __bind(this.click, this);

      this.evolve = __bind(this.evolve, this);
      this.isAlive = Math.random() < seedProbability;
    }

    FunctionalGolCell.prototype.setNeighbors = function(neighbors) {
      this.neighbors = neighbors;
      return this;
    };

    FunctionalGolCell.prototype.evolve = function() {
      var evolvedCellAlive, evolvedNeighbors, livingNeighbors, n, _i, _len, _ref, _ref1;
      if (this.lazyEvolve != null) {
        return this.lazyEvolve;
      } else {
        livingNeighbors = this.neighbors.filter(function(x) {
          return x.isAlive;
        });
        evolvedCellAlive = this.isAlive;
        if (this.isAlive || livingNeighbors.length === 3) {
          evolvedCellAlive = (1 < (_ref = livingNeighbors.length) && _ref < 4);
        }
        this.lazyEvolve = new FunctionalGolCell(evolvedCellAlive);
        evolvedNeighbors = [];
        _ref1 = this.neighbors;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          n = _ref1[_i];
          evolvedNeighbors.push(n.evolve());
        }
        this.lazyEvolve = this.lazyEvolve.setNeighbors(evolvedNeighbors);
        return this.lazyEvolve;
      }
    };

    FunctionalGolCell.prototype.click = function() {
      return this.isAlive = !this.isAlive;
    };

    FunctionalGolCell.prototype.draw = function(context, row, column, cellSize, paused) {
      var fillStyle, x, y;
      if (paused == null) {
        paused = false;
      }
      x = column * cellSize;
      y = row * cellSize;
      if (this.isAlive) {
        if (!paused) {
          fillStyle = 'rgb(242, 198, 65)';
        } else {
          fillStyle = 'rgb(84, 84, 84)';
        }
      } else {
        fillStyle = 'rgb(38, 38, 38)';
      }
      context.strokeStyle = 'rgba(242, 198, 65, 0.1)';
      context.strokeRect(x, y, cellSize, cellSize);
      context.fillStyle = fillStyle;
      return context.fillRect(x, y, cellSize, cellSize);
    };

    window.FunctionalGolCell = FunctionalGolCell;

    return FunctionalGolCell;

  })();

}).call(this);
