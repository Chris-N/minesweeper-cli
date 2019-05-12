
const Space = require('./space.js');
const ROW = 5;
const COL = 10;
const columnNAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function Board(){
    const board = new Array(ROW * COL);
    let display = '';
}
Board.prototype.buildInitBoard = function(){
    this.board = new Array(ROW * COL).map(() => new Space());

    let vis = '  A';
    for(let i = 1; i < COL; i++){
        vis += ` ${columnNAMES[i]}`;
    }
    vis += '\n';

    for(let i = 0; i < this.board.length; i++){
        if(i%COL === 0)
            vis += (rowNumber(vis) === ROW) ? `${rowNumber(vis)}  |` : `${rowNumber(vis)} _|`;
        else if(i%COL < COL-1){
            vis += (rowNumber(vis) === ROW) ? ' |' : '_|';
        }
        else if(i%COL === COL-1){
            vis += (rowNumber(vis) === ROW) ? '\n' : '_\n';
        }
    }
    this.display = vis;
}

Board.prototype.setBoard = function(){
    let totalBombs = Math.floor((ROW * COL) * .4);
    while(totalBombs > 0){
        let index = Math.floor(Math.random() * Math.floor(ROW * COL));
        if(!this.board[index].isBomb()){
            this.board[index].setBomb();
            totalBombs--;
        }
    }
}

Board.prototype.test = function(){
    console.log('TEST from import BOARD class');
}

function rowNumber(str){
    return str.split(/[\n]/g).length - 1;
}

module.exports = Board;