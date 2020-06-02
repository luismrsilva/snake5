/* tile.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

function Tile(fillStyle){
	this.fillStyle = fillStyle;
	this.x = 0;
	this.y = 0;
	this.w = 1;
	this.h = 1;
}

Tile.prototype.draw = function(ctx){
	ctx.fillStyle = this.fillStyle;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.stroke();
};

Tile.prototype.setPos = function(x, y){
	this.x = x;
	this.y = y;
};

Tile.prototype.copyPos = function(tile){
	this.x = tile.x;
	this.y = tile.y;
	this.w = tile.w;
	this.h = tile.h;
}

Tile.prototype.atSamePos = function(tile){
	return this.x == tile.x && this.y == tile.y;
};

Tile.prototype.setFillStyle = function(fillStyle){
	this.fillStyle = fillStyle;
};

Tile.prototype.isAtXY = function(x, y){
	return this.x == x && this.y == y;
}
