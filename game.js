
// const Space = require('./space.js');
const Board = require('./board.js');
const readline = require('readline');
const rd = readline.createInterface({ input: process.stdin, output: process.stdout });

// Game logic
let quit = false;
let playing = false;
const board = new Board();

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
        rd.question('Want to play? (y/n)', ans => {
            if(ans === 'Y' || ans === 'y'){
                playing = true;
            }
            else if(ans === 'N' || ans === 'n'){
                quit = true;
                console.log('Good-bye, come back soon!');
                process.exit();
            }
            res();
        });
    });
}

function minesweeper(){
    return new Promise((res, rej) => {
        console.log('PLAY!!');
        board.buildInitBoard();
        board.setBoard();


        let tile = new Space();
        tile.test();

        // display board

        // make selection

        // result of that selection
    })
}

main();