describe("Conways Game Of Life", function(){
  var simulation;

  describe("Simulation", function(){
    beforeEach(function(){
      simulation = new Simulation(5, 5);
    });

    it("Initial Grid in 2-D", function(){
      expect(simulation.cells.length).toBe(25);
    });

    it('At start no Life or alive cell', function(){
      var allDead = true;
      simulation.cells.each(function(cell) {
        allDead = allDead && cell.isDead;
      });
      expect(allDead).toBeTruthy();
    });

    it('Get specific cell from X and Y position', function(){
      var cell = simulation.getCell(2, 1);
      expect(cell).toBeDefined();
      expect(cell.x).toBe(2);
      expect(cell.y).toBe(1);
    });
  });

  describe("Cell", function(){
    beforeEach(function(){
      simulation = new Simulation(5, 5);
    });

    it("Get neighbors", function(){
      var cell = simulation.getCell(1, 1);
      expect(cell.neighbours().length).toBe(8);
      expect(cell.neighbours()).toContain(simulation.getCell(0, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 1));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 2));
      expect(cell.neighbours()).toContain(simulation.getCell(1, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(1, 2));
      expect(cell.neighbours()).toContain(simulation.getCell(2, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(2, 1));
      expect(cell.neighbours()).toContain(simulation.getCell(2, 2));

      var cell = simulation.getCell(0, 0);
      expect(cell.neighbours().length).toBe(8);
      expect(cell.neighbours()).toContain(simulation.getCell(4, 4));
      expect(cell.neighbours()).toContain(simulation.getCell(4, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(4, 1));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 4));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 1));
      expect(cell.neighbours()).toContain(simulation.getCell(1, 4));
      expect(cell.neighbours()).toContain(simulation.getCell(1, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(1, 1));

      var cell = simulation.getCell(4, 1);
      expect(cell.neighbours().length).toBe(8);
      expect(cell.neighbours()).toContain(simulation.getCell(3, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(3, 1));
      expect(cell.neighbours()).toContain(simulation.getCell(3, 2));
      expect(cell.neighbours()).toContain(simulation.getCell(4, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(4, 2));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 1));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 2));

      var cell = simulation.getCell(1, 4);
      expect(cell.neighbours().length).toBe(8);
      expect(cell.neighbours()).toContain(simulation.getCell(0, 3));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 4));
      expect(cell.neighbours()).toContain(simulation.getCell(0, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(1, 3));
      expect(cell.neighbours()).toContain(simulation.getCell(1, 0));
      expect(cell.neighbours()).toContain(simulation.getCell(2, 3));
      expect(cell.neighbours()).toContain(simulation.getCell(2, 4));
      expect(cell.neighbours()).toContain(simulation.getCell(2, 0));
    });

    it("1: any cell having less than two live neighbours dies", function(){
      var liveCell = simulation.getCell(0, 0);
      liveCell.live();
      simulation.next();
      expect(liveCell.isDead()).toBeTruthy();

      var liveCellWithOneNeighbour = simulation.getCell(0, 0);
      var cellAtRight = simulation.getCell(0, 1);
      liveCellWithOneNeighbour.live();
      cellAtRight.live();
      simulation.next();
      expect(liveCellWithOneNeighbour.isDead()).toBeTruthy();
      expect(cellAtRight.isDead()).toBeTruthy();
    });

    it('2: Cells with two and three alive neighbours live', function(){
      var liveCellWithTwoNeighbours = simulation.getCell(0, 0);
      var cellAtRight = simulation.getCell(0, 1);
      var cellAtBottom = simulation.getCell(1, 0);
      liveCellWithTwoNeighbours.live();
      cellAtRight.live();
      cellAtBottom.live();
      simulation.next();
      expect(liveCellWithTwoNeighbours.isLive()).toBeTruthy();

      var liveCellWithThreeNeighbours = simulation.getCell(1, 1);
      var cellAtTop = simulation.getCell(0, 1);
      var cellAtRight = simulation.getCell(1, 2);
      var cellAtBottom = simulation.getCell(2, 1);
      liveCellWithThreeNeighbours.live();
      cellAtTop.live();
      cellAtRight.live();
      cellAtBottom.live();
      simulation.next();
      expect(liveCellWithTwoNeighbours.isLive()).toBeTruthy();
    });

    it('3: Cells having more than three alive neighbours dies. Reason: overcrowding', function(){
      var liveCellWithFourNeighbours = simulation.getCell(1, 1);
      var cellAtTop = simulation.getCell(0, 1);
      var cellAtLeft = simulation.getCell(1, 0);
      var cellAtRight = simulation.getCell(1, 2);
      var cellAtBottom = simulation.getCell(2, 1);
      liveCellWithFourNeighbours.live();
      cellAtTop.live();
      cellAtLeft.live();
      cellAtRight.live();
      cellAtBottom.live();
      simulation.next();
      expect(liveCellWithFourNeighbours.isDead()).toBeTruthy();
    });

    it('4: Dead cells with exactly three live neighbours become alive. Reason: reproduction', function(){
      var deadCellWithThreeNeighbours = simulation.getCell(1, 1);
      var cellAtTop = simulation.getCell(0, 1);
      var cellAtRight = simulation.getCell(1, 2);
      var cellAtBottom = simulation.getCell(2, 1);
      deadCellWithThreeNeighbours.live();
      cellAtTop.live();
      cellAtRight.live();
      cellAtBottom.live();
      simulation.next();
      expect(deadCellWithThreeNeighbours.isLive()).toBeTruthy();

      var deadCellWithFourNeighbours = simulation.getCell(3, 3);
      var cellAtTop = simulation.getCell(2, 3);
      var cellAtLeft = simulation.getCell(3, 2);
      var cellAtRight = simulation.getCell(3, 4);
      var cellAtBottom = simulation.getCell(4, 3);
      deadCellWithFourNeighbours.live();
      cellAtTop.live();
      cellAtLeft.live();
      cellAtRight.live();
      cellAtBottom.live();
      simulation.next();
      expect(deadCellWithFourNeighbours.isDead()).toBeTruthy();
    });
  });
});
