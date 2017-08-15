function SimulationRenderer(simulation, targetId) {
  this.simulation = simulation;
  this.targetId = targetId;
  $('#' + targetId).prepend('<div id="simulation" />');
  this.render();
}

SimulationRenderer.prototype.toggle = function(cell) {
  $('.cell[pos-x=' + cell.x +'][pos-y=' + cell.y+ ']').toggleClass('dead').toggleClass('live');
}

SimulationRenderer.prototype.render = function() {
  var cellsDivs = '<div class="row">';
  var xLevel = 0;
  simulation.cells.each(function(cell){
    if (xLevel != cell.x) {
      cellsDivs += '</div><div class="row">';
      xLevel = cell.x;
    }
    cellsDivs += '<div class="cell ' + (cell.isDead() ? 'dead' : 'live') + '" pos-x="' + cell.x +'" pos-y="' + cell.y + '"></div>';
  });
  $('#'+this.targetId+' > #simulation').replaceWith('<div id="simulation">' + cellsDivs + '</div>');
}

