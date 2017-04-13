/**
 * Created by diaosuyi on 4/12/17.
 */
let fs = require('fs'),
    readline = require('readline');

/************************************************************/
// Main
// Setup the sudoku board
let sudokuBoard = [];

// Read file synchronously
let lines = fs.readFileSync('./sudoku.txt', 'utf-8')
    .split("\n")
    .filter(Boolean);

// Map the read lines into sudoku board
lines.forEach(line => {
    sudokuBoard.push(line.split(' ').map(x => {
        return parseInt(x);
    }))
});

// Ready to go
console.log(sudokuBoard);