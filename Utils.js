// Utility function to allow repetition of a function without loops

var times = function(n, f) {
	if(n > 0) {
		f();
		times(n-1, f);
		}
	};
