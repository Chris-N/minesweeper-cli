
function Space(){
    bomb = false;

}

Space.prototype.isBomb = function(){
    return this.bomb;
}
Space.prototype.setBomb = function(){
    this.bomb = true;
}
Space.prototype.test = function(){
    console.log('TEST from import SPACE class');
}

module.exports = Space;