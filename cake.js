/* cake.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

function Cake(fillStyle){
	this.fillStyle = fillStyle;
	this.x = undefined;
	this.y = undefined;
	this.maxX = 16;
	this.maxY = 16;
	this.tile = new Tile(fillStyle);
}

Cake.prototype.setMaxPos = function(maxX, maxY){
	this.maxX = maxX;
	this.maxY = maxY;
	this.x = (this.x+maxX)%maxX;
	this.y = (this.y+maxY)%maxY;
	this.updatePos();
}

Cake.prototype.draw = function(ctx){
	this.tile.draw(ctx);
};

Cake.prototype.respawn = function(snake){
	var tries = 0;
	var maxTries = this.maxX * this.maxY; // very unlikely, depending on snake/screen ratio.
	var x = y = 0;

	do {
		x = randIntMax(this.maxX);
		y = randIntMax(this.maxY);
		tries++;
	} while(snake.isTakingPos(x, y) && tries < maxTries);
	
	this.x = x;
	this.y = y;
	this.updatePos();
}

Cake.prototype.updatePos = function(){
	if(this.x != undefined && this.y != undefined){
		this.tile.setPos(this.x, this.y);
	}
}
