/* tile.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

function Tile(fillStyle){
	this.fillStyle = fillStyle;
	this.x = 0;
	this.y = 0;
	this.w = 100;
	this.h = 100;
}

Tile.prototype.draw = function(ctx){
	ctx.fillStyle = this.fillStyle;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.stroke();
};

Tile.prototype.getPos = function(){
	return {x:this.x, y:this.y, w:this.w, h:this.h};
}
Tile.prototype.setPos = function(o){
	this.x = o.x;
	this.y = o.y;
	this.w = o.w;
	this.h = o.h;
}
