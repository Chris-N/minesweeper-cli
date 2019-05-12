
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
}

Board.prototype.columnHeader = function(){
    this.display += '  A';
    for(let i = 1; i < this.col; i++){
        this.display += ` ${columnNAMES[i]}`;
    }
    this.display += '\n';
}

Board.prototype.displayRow = function(i, x = '_'){
    if (i % this.col === 0)
        this.display += (this.rowNumber() === this.row && x === '_') ? `${this.rowNumber()}  |` : `${this.rowNumber()} ${x}|`;
    else if (i % this.col < this.col - 1) {
        this.display += (this.rowNumber() === this.row && x === '_') ? ` |` : `${x}|`;
    }
    else if (i % this.col === this.col - 1) {
        this.display += (this.rowNumber() === this.row && x === '_') ? '\n' : `${x}\n`;
    }
}

Board.prototype.displayCurrent = function(){
    this.display = '';
    this.columnHeader();

    for(let i = 0; i < this.board.length; i++){
        if(this.board[i].isVisable()){
            // can see number
            this.displayRow(i, this.board[i].getBombCount());
        }
        else if(this.board[i].isFlagged()){
            // can see flag
            this.displayRow(i, 'F');
        }
        else{
            // default hidden
            this.displayRow(i);
        }
    }
}

Board.prototype.discover = function(spot){
    let index = (Number(spot[1]) - 1) * this.col;
    index += columnNAMES.indexOf(spot[0]);
    console.log(this.board[index]);

    if(spot[2] !== undefined) this.board[index].setFlag();
    else{
        if(this.board[index].isBomb()) return true;

        this.board[index].select();
        this.checkBombs(index);
        console.log(this.board[index]);
    }

    return false;
}

Board.prototype.checkBombs = function(index){
    let direction = {up: true, right: true, down: true, left: true};

    if(index%this.col ===  0){ direction.left = false; }
    if(index%this.col ===  this.col-1){ direction.right = false; }
    if(index - this.col < 0){ direction.up = false; }
    if(index + this.col >=  this.row * this.col){ direction.down = false; }

    if(direction.up){
        let topRow = index - this.col;
        if(this.board[topRow].isBomb()) this.board[index].countNearBombs();
        if(direction.right){
            if(this.board[topRow+1].isBomb()) this.board[index].countNearBombs();
        }
        if(direction.left){
            if(this.board[topRow-1].isBomb()) this.board[index].countNearBombs();
        }
    }
    if(direction.down){
        let lowerRow = index + this.col;
        if(this.board[lowerRow].isBomb()) this.board[index].countNearBombs();
        if(direction.right){
            if(this.board[lowerRow+1].isBomb()) this.board[index].countNearBombs();
        }
        if(direction.left){
            if(this.board[lowerRow-1].isBomb()) this.board[index].countNearBombs();
        }
    }
    if(direction.right){
        if (this.board[index + 1].isBomb()) this.board[index].countNearBombs();
    }
    if(direction.left){
        if (this.board[index - 1].isBomb()) this.board[index].countNearBombs();
    }
}

Board.prototype.displayBoard = function(){
    console.log(this.display);
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
Board.prototype.winCheck = function(){
    let win = true;
    console.log(this.board);
    for(let i = 0; i < this.board.length; i++){
        if(this.board[i].isFlagged() !== this.board[i].isBomb()){
            win = false;
            break;
        }
    }
    return win;
}

Board.prototype.test = function(){
    console.log('TEST from import BOARD class');
}

Board.prototype.rowNumber = function(){
    return this.display.split(/[\n]/g).length-1;
}

module.exports = Board;