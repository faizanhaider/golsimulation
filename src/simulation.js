function Simulation(width, heigth) {
  //Width of grid
  this.width = width;
  //Height of grid
  this.heigth = heigth;

  var i = width * heigth;
  var x, y;

  this.cells = [];
  while(i--) {
    x = Math.floor(i / width);
    y = i - (x * width);
    //Initializing cells
    this.cells.unshift(new Cell(this, x, y));
  }
}

Simulation.prototype.getCell = function(x, y) {
  return this.cells[(x * this.width) + y];
}

//For steping into next generation
Simulation.prototype.next = function() {
  var affected = [];
  this.cells.each(function(currentCell){
    var liveNeighboursCount = currentCell.liveNeighbours().length;
    if(currentCell.isLive()){
      if (liveNeighboursCount < 2) {
        affected.unshift(currentCell);
      } else if(liveNeighboursCount > 3) {
        affected.unshift(currentCell);
      }
    } else {
      if(liveNeighboursCount == 3) {
        affected.unshift(currentCell);
      }
    }
  });

  affected.each(function(cell){
    cell.toggle();
  })
}

function Cell(simulation, x, y) {
  this.simulation = simulation;
  this.x = x;
  this.y = y;
  this.dead = true;
}

Cell.prototype.neighbours = function() {
  var neighbourX, neighbourY, realX, realY;
  var found = [];
  neighbourX = this.x - 1;
  while(neighbourX <= this.x + 1) {
    realX = neighbourX;
    if(neighbourX == -1) {
      realX = this.simulation.heigth - 1;
    } else if(neighbourX == this.simulation.heigth) {
      realX = 0;
    }
    neighbourY = this.y - 1;
    while(neighbourY <= this.y + 1) {
      realY = neighbourY;
      if(neighbourY == -1) {
        realY = this.simulation.width - 1;
      } else if(neighbourY == this.simulation.width) {
        realY = 0;
      }
      if(realX != this.x || realY != this.y) {
        found.push(this.simulation.getCell(realX, realY));
      }
      neighbourY++;
    }
    neighbourX++;
  }
  return found;
}

Cell.prototype.liveNeighbours = function() {
  return this.neighbours().map(function(cell){
    return cell.isLive();
  });
}

Cell.prototype.die = function() {
  return this.dead = true;
}

Cell.prototype.isDead = function() {
  return this.dead;
}

Cell.prototype.live = function() {
  return this.dead = false;
}

Cell.prototype.isLive = function() {
  return !this.isDead();
}

Cell.prototype.toggle = function() {
  this.dead = !this.dead;
  return this.dead;
}
