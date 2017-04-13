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

let printBoard = () => {
    let i = 0;
    sudokuBoard.forEach(row => {
        let j = 0;
        row.forEach(ele => {
            process.stdout.write(`${ele} `);
            if(j === 2 || j === 5) process.stdout.write('|');
            j++;
        });
        process.stdout.write("\n");
        if(i === 2 || i === 5) process.stdout.write("------+------+------\n");
        i++;
    })
};

// Ready to go
console.log("Here is the initial board:\n");
printBoard();