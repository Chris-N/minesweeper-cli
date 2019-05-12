
function Space(){
    this.bomb = false;
    this.flag = false;
    this.visable = false;
    this.bombCount = 0;
}

Space.prototype.select = function(){
    this.visable = true;
}

Space.prototype.setFlag = function(){
    this.flag = !this.flag;
}
Space.prototype.isFlagged = function(){
    return this.flag;
}
Space.prototype.isVisable = function(){
    return this.visable;
}
Space.prototype.isBomb = function(){
    return this.bomb;
}
Space.prototype.setBomb = function(){
    this.bomb = true;
}
Space.prototype.getBombCount = function(){
    return this.bombCount;
}
Space.prototype.countNearBombs = function(){
    this.bombCount++;
}
Space.prototype.test = function(){
    console.log('TEST from import SPACE class');
}

module.exports = Space;