// Displays the Game Of Life on a web page

var displayGameOfLife = function(body) {
	var DEFAULT_ROWS = 10;
	var DEFAULT_COLS = 10;

	var rows = DEFAULT_ROWS;
	var cols = DEFAULT_COLS;

	var game = GameOfLifeModel(rows, cols);

	var start_button = $('<button>Start</button>').appendTo(body);
	var stop_button = $('<button>Stop</button>').appendTo(body);
	body.append('Animation delay: ');
	var delay_input = $('<input type="text"></input>').appendTo(body);
	body.append(' ms<br>');

	body.append('Rows: ');
	var row_input = $('<input type="text"></input>').appendTo(body);
	body.append(' Cols: ');
	var col_input = $('<input type="text"></input>').appendTo(body);
	body.append('<br>');

	var clear_button = $('<button>Clear</button>').appendTo(body);
	body.append('Preset States');
	var preset_select = $('<select></select>').appendTo(body);
	preset_select.append('<option value="none">None</option>');
	preset_select.append('<option value="block">Block</option>');
	preset_select.append('<option value="beehive">Beehive</option>');
	preset_select.append('<option value="blinker">Blinker</option>');
	preset_select.append('<option value="toad">Toad</option>');
	preset_select.append('<option value="beacon">Beacon</option>');
	preset_select.append('<option value="glider">Glider</option>');
	preset_select.append('<option value="acorn">Acorn</option>');
	body.append('<br><br>');	

	// Update all table cells to match cells in the model	
	var update = function() {
		game.forEach(function(row, col, alive) {
			var cell = $('td').eq(row * cols + col);
			if(alive === 1) {
				cell.css('background-color', 'black');
				}
			else {
				cell.css('background-color', 'white');
				}
			});
		};

	// Creates a new table of size rows by cols and appends it to the end of the document body
	var createTable = function() {
		var table = $('<table></table>').appendTo(body);
		times(rows, function() {
			var cur_row = $('<tr></tr>').appendTo(table);
			times(cols, function() {
				var cur_cell = $('<td width="10" height="10"></td>').appendTo(cur_row);
				cur_cell.click(function() {
					var row_index = cur_row.index();
					var col_index = cur_cell.index();
					game.flipCell(row_index, col_index);
					if(game.isAlive(row_index, col_index)) {
						cur_cell.css('background-color', 'black');
						}
					else {
						cur_cell.css('background-color', 'white');
						}
					});
				});
			});	
		};

	// Creates the table on the web page
	createTable();
	// Adds a listener to the model to listen for evolution events
	game.addActionListener(update);

	start_button.click(function() {
		game.start();
		});

	stop_button.click(function() {
		game.stop();
		});

	delay_input.change(function() {
		game.setDelay(parseInt($(this).val()));
		});

	row_input.change(function() {
		rows = parseInt($(this).val());
		game.resizeBoard(rows, cols);
		$('table').remove();
		createTable();
		update();
		});
	
	col_input.change(function() {
		cols = parseInt($(this).val());
		game.resizeBoard(rows, cols);
		$('table').remove();
		createTable();
		update();
		});

	clear_button.click(function() {
		game.clearBoard();
		update();
		});

	preset_select.change(function() {
		game.clearBoard();
		game.load(presets[$(this).val()]);
		update();
		});
	};
