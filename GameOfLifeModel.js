// Model for GameOfLife, representing a grid of cells, which are each living or dead.
// Allows for modifying grid cells, testing living/dead, and starting/stopping the animation.

var GameOfLifeModel = function(row_num, col_num) {
	var that = Object.create(GameOfLifeModel.prototype);
	var rows = row_num;
	var cols = col_num;

	// Grid of 1's and 0's - 1 is alive and 0 is dead
	var grid = undefined;

	// Initially no interval is set
	var timer = undefined;
	// Default delay is 100ms
	var delay = 100;
	// Array of listeners
	var listeners = [];
	
	// Create a new 2d array of size row_num by col_num
	var create2dArray = function(row_num, col_num) {
		var ret = new Array(row_num);
		for(var i = 0; i < row_num; i++) {
			ret[i] = new Array(col_num);
			for(var j = 0; j < col_num; j++) ret[i][j] = 0;
			}
		return ret;
		};

	// Create initial grid
	grid = create2dArray(rows, cols);

	// Get neighbors of cell at (row, col) that are inside the grid
	var neighbors = function(row, col) {
		var delta = [{row: -1, col: -1}, {row: 0, col: -1}, {row: 1, col: -1},
					 {row: -1, col: 0}, {row: 1, col: 0},
					 {row: -1, col: 1}, {row: 0, col: 1}, {row: 1, col: 1}];
		return delta.map(function(location) {
			return {row: row + location.row, col: col + location.col};
			}).filter(function(location) {
				return location.row >= 0 && location.row < rows &&
					location.col >= 0 && location.col < cols;
				});
		};

	// Test if cell at location is alive
	var isAlive = function(location) {
		return grid[location.row][location.col];
		};
	
	// Apply function "f" to each cell in grid
	var forEachCell = function(grid, f) {
		grid.forEach(function(ar, row) {
			ar.forEach(function(val, col) {
				f(row, col, val);
				});
			});
		};

	// Evolve the cells by 1 timestep and notify all listeners of the state change
	var evolve = function() {
		var new_grid = create2dArray(rows, cols);
		forEachCell(grid, function(row, col, val) {
			var live_adj = neighbors(row, col).map(isAlive).reduce(function(a, b) {
				return a + b;
				}, 0);
			if(grid[row][col] == 1) {
				if(live_adj < 2 || live_adj > 3) new_grid[row][col] = 0;
				else new_grid[row][col] = 1;
				}
			else {
				if(live_adj === 3) new_grid[row][col] = 1;
				else new_grid[row][col] = 0;
				}
			});
		grid = new_grid;
		// Call each listener
		listeners.forEach(function(f) {
			f();
			});
		};


	// Test is cell at (row, col) is alive
	that.isAlive = function(row, col) {
		return grid[row][col];
		};

	// Make cell at (row, col) living
	that.setCell = function(row, col) {
		grid[row][col] = 1;
		};

	// Make cell at (row, col) dead
	that.clearCell = function(row, col) {
		grid[row][col] = 0;
		};

	// Make cell at (row, col) living if it was dead, and dead if it was living
	that.flipCell = function(row, col) {
		grid[row][col] = 1 - grid[row][col];
		};

	// Kill all cells in the board
	that.clearBoard = function() {
		grid = create2dArray(rows, cols);
		};

	// Replace the board's contents with new_grid
	that.load = function(new_grid) {
		forEachCell(grid, function(row, col) {
			if(new_grid[row] !== undefined && new_grid[row][col] !== undefined) {
				grid[row][col] = new_grid[row][col];
				}
			});
		};

	// Resize the board to be new_row_num rows and new_col_num columns.
	that.resizeBoard = function(new_row_num, new_col_num) {
		rows = new_row_num;
		cols = new_col_num;
		var new_grid = create2dArray(rows, cols);
		
		forEachCell(grid, function(row, col, val) {
			if(row < rows && col < cols) {
				new_grid[row][col] = val;
				}
			});
		grid = new_grid;
		};

	// Apply function f to each cell in the grid.
	that.forEach = function(f) {
		forEachCell(grid, f);
		};

	// Start the animation.
	that.start = function() {
		clearInterval(timer);
		timer = setInterval(evolve, delay);
		};

	// Stop the animation.
	that.stop = function() {
		clearInterval(timer);
		timer = undefined;
		};

	// Set the amount of delay between generations.
	that.setDelay = function(new_delay) {
		delay = new_delay;
		if(timer !== undefined) {
			clearInterval(timer);
			timer = setInterval(evolve, delay);
			}
		};

	// Add another listener to the model, which will be notified whenever cells evolve.
	that.addActionListener = function(listener) {
		listeners.push(listener);
		};

	// Return the model, frozen to prevent modification of the object
	return Object.freeze(that);
	};
