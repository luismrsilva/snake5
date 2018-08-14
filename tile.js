/* tile.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

function Tile(fillStyle){
	this.fillStyle = fillStyle;
	this.x = 0;
	this.y = 0;
	this.xScreen = 0;
	this.yScreen = 0;
	this.w = 100;
	this.h = 100;
}

Tile.prototype.draw = function(ctx){
	ctx.fillStyle = this.fillStyle;
	ctx.fillRect(this.xScreen, this.yScreen, this.w, this.h);
	ctx.stroke();
};

Tile.prototype.setPos = function(x, y){
	this.x = x;
	this.y = y;
	var o = gameCoordsToScreen(x, y);
	this.xScreen = o.xScreen;
	this.yScreen = o.yScreen;
	this.w = o.w;
	this.h = o.h;
};

Tile.prototype.copyPos = function(tile){
	this.x = tile.x;
	this.y = tile.y;
	this.xScreen = tile.xScreen;
	this.yScreen = tile.yScreen;
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