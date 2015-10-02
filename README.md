proj2
=====

a) I identified the concerns of modelling the game, displaying the game, the CSS style, the list of preset states, and the utility functions. I put these as GameOfLifeModel.js, GameOfLifeView.js, Style.css, PresetStates.js, and Utils.js respectively.

b) The program modules are:
index.html -> depends on GameOfLifeModel.js, GameOfLifeView.js, Style.css, PresetStates.js, Utils.js
tests.html -> depends on tests.js, GameOfLifeModelTesting.js, PresetStates.js
tests.js -> depends on GameOfLifeModelTesting.js, PresetStates.js
GameOfLifeModel.js -> (none)
GameOfLifeModelTesting.js -> (none)
GameOfLifeView.js -> depends on PresetStates.js, Utils.js
Style.css -> (none)
PresetStates.js -> (none)
Utils.js -> (none)

I think these dependencies are fine.

c) Just a few examples:
- Neighbors are done using a map from a list of 8 deltas to the actual neighbors, then filtered on the ones actually in the grid.
- Looping through all cells is abstracted away into a forEachCell, which is itself 2 nested for eachs.
- Counting the number of neighbors alive maps them to isAlive, then reduces using plus to count the number of living neighbors.

d) Trade-off: I originally tried to loop through all the children of the table (the tr's then the td's) to loop through the grid. Ultimately, I couldn't find the right API to get the row, col indices so I instead looped through the grid in the model and used "eq" to find the cell.
