
// const Space = require('./space.js');
const Board = require('./board.js');
const readline = require('readline');
const rd = readline.createInterface({ input: process.stdin, output: process.stdout });

// Game logic
let quit = false;
let playing = false;
let newGame = false;
let ROW = 5;
let COL = 10;
const board = new Board(ROW, COL);

async function main(){
    while(!quit){
        if(!playing) await greeting();
        else { 
            await minesweeper(); 
        }
    }
}

function greeting(){
    return new Promise((res, rej) => {
        rd.question('Want to play? (y/n): ', ans => {
            if(ans === 'Y' || ans === 'y'){
                newGame = true;
                playing = true;
            }
            else if(ans === 'N' || ans === 'n'){
                quit = true;
                console.log('Good-bye, come back soon!\n');
                process.exit();
            }
            res();
        });
    });
}

function minesweeper(){
    return new Promise((res, rej) => {
        if(newGame){
            console.log('PLAY!!');
            board.buildInitBoard();
            board.setBoard();

            // display board
            board.displayBoard();
            newGame = false;
        }

        // make selection
        rd.question("Select a square? (Ex: A3, G5x [x - flag spot]): ", spot => {
            // result of that selection
            if(board.discover(spot)){
                // Bomb!
                // Display with bomb
                playing = false;
                console.log('Game Over, you lose\n');
            }
            else {
                // Display from new move
            }

            res();
        })
    });
}

main();