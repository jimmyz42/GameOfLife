// Helper function to count living cells
var total_living = function(game) {
	var cells_alive = 0;
	game.forEach(function(row, col, val) {
		cells_alive += val;
		});
	return cells_alive;
	};	

// Test to make sure that grid is initially empty
QUnit.test( "New grid should be empty", function (assert) {
    var game = GameOfLifeModel(10, 10);
    assert.strictEqual(total_living(game), 0, "no cells initially alive");
    });

// Test to make sure that we can add living cells correctly
QUnit.test( "Set Cell", function (assert) {
    var game = GameOfLifeModel(10, 10);
	game.setCell(5, 5);
    assert.strictEqual(game.isAlive(5, 5), 1, "Cell set correctly");
	game.setCell(5, 5);
    assert.strictEqual(game.isAlive(5, 5), 1, "Setting twice doesn't change it");
    assert.strictEqual(total_living(game), 1, "Only one cell should be living");
    });

// Test to make sure that we can add dead cells correctly
QUnit.test( "Clear Cell", function (assert) {
    var game = GameOfLifeModel(10, 10);
	game.clearCell(4, 4);
    assert.strictEqual(game.isAlive(4, 4), 0, "Clearing dead cell makes no difference");
	game.setCell(3, 6);
    assert.strictEqual(game.isAlive(3, 6), 1, "Cell should be alive now");
	game.clearCell(3, 6);
    assert.strictEqual(game.isAlive(3, 6), 0, "Clearing live cell should kill it");	
    assert.strictEqual(total_living(game), 0, "No cells should still be alive");
    });

// Test to make sure that we can flip living/dead status of cells correctly
QUnit.test( "Flip Cell", function (assert) {
    var game = GameOfLifeModel(10, 10);
    assert.strictEqual(game.isAlive(2, 3), 0, "Cell initially dead");
    game.flipCell(2, 3);
	assert.strictEqual(game.isAlive(2, 3), 1, "Flipping should make it alive");
    game.setCell(4, 6);
	assert.strictEqual(game.isAlive(4, 6), 1, "Cell initially alive");
    game.flipCell(4, 6);
	assert.strictEqual(game.isAlive(4, 6), 0, "Flipping should kill it");
    });

// Test to make sure that we can clear the board correctly
QUnit.test( "Clear Board", function (assert) {
    var game = GameOfLifeModel(10, 10);
    assert.strictEqual(total_living(game), 0, "No cells initially alive");
	game.clearBoard();
    assert.strictEqual(total_living(game), 0, "Clearing empty board makes no difference");
    game.setCell(2, 3);
	game.setCell(5, 6);
	game.setCell(8, 9);
	game.setCell(3, 4);
	game.setCell(1, 7);
    assert.strictEqual(total_living(game), 5, "Make 5 cells living");
	game.clearBoard();
    assert.strictEqual(total_living(game), 0, "Clearing should kill all cells");	
	});

// Test to make sure that we can load a preset grid correctly
QUnit.test( "Load Preset", function (assert) {
    var game = GameOfLifeModel(10, 10);
	game.load(presets["blinker"]);
    assert.strictEqual(game.isAlive(1, 2), 1, "Part of Blinker");
    assert.strictEqual(game.isAlive(2, 2), 1, "Part of Blinker");
    assert.strictEqual(game.isAlive(3, 2), 1, "Part of Blinker");
    assert.strictEqual(total_living(game), 3, "Blinker has 3 cells living total");
    });

// Test to make sure that we can evolve cells correctly
QUnit.test( "Evolve", function (assert) {
    var game = GameOfLifeModel(10, 10);
	game.load(presets["blinker"]);
	game.evolve();
    assert.strictEqual(game.isAlive(2, 1), 1, "Part of evolved Blinker");
    assert.strictEqual(game.isAlive(2, 2), 1, "Part of evolved Blinker");
    assert.strictEqual(game.isAlive(2, 3), 1, "Part of evolved Blinker");
    assert.strictEqual(total_living(game), 3, "Blinker has 3 cells living total");
    });

