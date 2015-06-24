/* cake.js
 * 
 * Snake
 * (c) 2015 by Luís Silva
 * */

function Cake(ctx, fillStyle){
	this.ctx = ctx;
	this.fillStyle = fillStyle;
	this.x = 0;
	this.y = 0;
	this.maxX = 16;
	this.maxY = 16;
	this.tile = new Tile(ctx, fillStyle);
}

Cake.prototype.setMaxPos = function(maxX, maxY){
	this.maxX = maxX;
	this.maxY = maxY;
	this.x = (this.x+maxX)%maxX;
	this.y = (this.y+maxY)%maxY;
	this.tile.setPos(gameCoordsToScreen(this.x, this.y));
}

Cake.prototype.draw = function(){
	this.tile.draw();
};

Cake.prototype.respawn = function(maxX, maxY){
	this.x = randIntMax(this.maxX);
	this.y = randIntMax(this.maxY);
	this.tile.setPos(gameCoordsToScreen(this.x, this.y));
}
