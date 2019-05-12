
const Space = require('./space.js');
const columnNAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function Board(r, c){
    this.row = r;
    this.col = c;
    this.board = new Array(r * c);
    this.display = '';
}
Board.prototype.buildInitBoard = function(){
    for(let i = 0; i < this.board.length; i++){
        this.board[i] = new Space();
    }

    let vis = '  A';
    for(let i = 1; i < this.col; i++){
        vis += ` ${columnNAMES[i]}`;
    }
    vis += '\n';

    for(let i = 0; i < this.board.length; i++){
        if(i%this.col === 0)
            vis += (rowNumber(vis) === this.row) ? `${rowNumber(vis)}  |` : `${rowNumber(vis)} _|`;
        else if(i%this.col < this.col-1){
            vis += (rowNumber(vis) === this.row) ? ' |' : '_|';
        }
        else if(i%this.col === this.col-1){
            vis += (rowNumber(vis) === this.row) ? '\n' : '_\n';
        }
    }
    this.display = vis;
}

Board.prototype.discover = function(spot){
    let index = (Number(spot[1]) - 1) * this.col;
    index += columnNAMES.indexOf(spot[0]);

    if(spot[3] !== undefined) this.board[index].setFlag();
    else{
        if(this.board[index].isBomb()) return true;

        this.board[index].select();
        this.board.checkBombs();
        // check surrounding for bombs?
    }

    return false;
}

Board.prototype.checkBombs = function(index){
    let colLimit = index%this.col;
    let rowLimit = index%this.row;
    let direction = {up: true, right: true, down: true, left: true};

    if(colLimit ===  0){ direction.left = false; }
    if(colLimit ===  this.col-1){ direction.right = false; }
    if(rowLimit === 0){ direction.up = false; }
    if(rowLimit ===  this.row-1){ direction.down = false; }

    if(direction.up){
        let topRow = index - this.col;
        if(!this.board[topRow].isBomb()) this.board[index].countNearBombs();
        if(direction.right){
            if(!this.board[topRow+1].isBomb()) this.board[index].countNearBombs();
        }
        if(direction.left){
            if(!this.board[topRow-1].isBomb()) this.board[index].countNearBombs();
        }
    }
    if(direction.down){
        let lowerRow = index + this.col;
        if(!this.board[lowerRow].isBomb()) this.board[index].countNearBombs();
        if(direction.right){
            if(!this.board[lowerRow+1].isBomb()) this.board[index].countNearBombs();
        }
        if(direction.left){
            if(!this.board[lowerRow-1].isBomb()) this.board[index].countNearBombs();
        }
    }
    if(direction.right){
        if (!this.board[index + 1].isBomb()) this.board[index].countNearBombs();
    }
    if(direction.left){
        if (!this.board[index - 1].isBomb()) this.board[index].countNearBombs();
    }
}

Board.prototype.displayBoard = function(){
    console.log(this.display);
}
Board.prototype.applyBoard = function(){

}

Board.prototype.setBoard = function(){
    let totalBombs = Math.floor((this.row * this.col) * .3);
    while(totalBombs > 0){
        let index = Math.floor(Math.random() * Math.floor(this.row * this.col));
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