// Preset Patterns for Game Of Life (from wikipedia)

var presets = function() {
	var preset_none = [
		[0]];

	var preset_block = [
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0]];

	var preset_beehive = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 1, 1, 0, 0],
		[0, 1, 0, 0, 1, 0],
		[0, 0, 1, 1, 0, 0],
		[0, 0, 0, 0, 0, 0]];

	var preset_blinker = [
		[0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0]];

	var preset_toad = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]];

	var preset_beacon = [
		[0, 0, 0, 0, 0, 0],
		[0, 1, 1, 0, 0, 0],
		[0, 1, 1, 0, 0, 0],
		[0, 0, 0, 1, 1, 0],
		[0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0]];

	var preset_glider = [
		[0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 1, 1, 1, 0],
		[0, 0, 0, 0, 0]];

	var preset_acorn = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0],
		[0, 1, 1, 0, 0, 1, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]];

	return {
		"none": preset_none,
		"block": preset_block,
		"beehive": preset_beehive,
		"blinker": preset_blinker,
		"toad": preset_toad,
		"beacon": preset_beacon,
		"glider": preset_glider,
		"acorn": preset_acorn
		};
	}();
