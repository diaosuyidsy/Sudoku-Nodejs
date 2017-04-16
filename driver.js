/**
 * Name:
 * Email:
 * VUnet ID:
 * Class: CS 3270
 * Team: Yilin & Suyi
 * Date: 4.16
 * Description: Sudoku solver in nodejs
 * Honor Statement: I have neither given nor received
 * unauthorized help in this project
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

// Print the sudoku board
let printBoard = () => {
    let i = 0;
    // for each row of the sudoku board
    sudokuBoard.forEach(row => {
        let j = 0;
        // for each element of the row
        row.forEach(ele => {
            // using javascript string literal
            process.stdout.write(`${ele} `);
            if(j === 2 || j === 5) process.stdout.write('|');
            j++;
        });
        process.stdout.write("\n");
        if(i === 2 || i === 5) process.stdout.write("------+------+------\n");
        i++;
    })
};

// the actual solver, takes (0,0) in as a starter param
// use recursion to solve the board
let solve = (row, col) => {
    // if row is 9, return solved
    if(row === 9) return true;
    // if col is 9, solve next row
    if(col === 9) return solve(row + 1, 0);
    // if the current position is occupied, solve next col
    if(sudokuBoard[row][col] !== 0) return solve(row, col + 1);
    // try out every number in the current position
    for(let i = 1; i <= 9; i++){
        if(check(row, col, i)){
            sudokuBoard[row][col] = i;
            if(solve(row, col + 1)) return true;
        }
    }
    sudokuBoard[row][col] = 0;
    return false;
};

// Function to check column
function checkCol(col,num){
    for (let row = 0; row < 9; row ++){
        if (sudokuBoard[row][col] == num){
            return false;
        }
    }
    return true;
}

// Function to check row
function checkRow(row,num){
    for (let col = 0; col < 9; col ++){
        if (sudokuBoard[row][col] == num){
            return false;
        }
    }
    return true;
}

// Function to check 3x3 subgrid
function checkSubgrid(row,col,num){
    let startRow = 3 * Math.floor(row/3);
    let startCol = 3 * Math.floor(col/3);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (sudokuBoard[i+startRow][j+startCol] == num) {
                return false;
            }
        }
    }
    return true;
}

// function to combine check
function check(row,col,num){
    return checkCol(col,num) && checkRow(row,num) && checkSubgrid(row,col,num)
}


// Ready to go
console.log("Here is the initial board:\n");
printBoard();
// time the solution
console.time("Sudoku-solver");
// if we can solve it, print the solved board
// else don't print it
if (solve(0,0)){
    console.log("\nHere is the solved Board\n");
    printBoard();
    console.timeEnd("Sudoku-solver");
}else {
    console.log("No solution");
}


