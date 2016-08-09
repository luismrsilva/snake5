/* snake.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

function Snake(ctx, headFillStyle, fillStyle){
	this.ctx = ctx;
	this.headFillStyle = headFillStyle;
	this.fillStyle = fillStyle;
	this.tail = new Array();
	this.head = new Tile(ctx, headFillStyle);
	this.tail.push(this.head);

	this.x = 0;
	this.y = 0;
	this.maxX = 16;
	this.maxY = 16;
	this.angle = 0;

	this.head.setPos(gameCoordsToScreen(this.x, this.y));
}

Snake.prototype.getSize = function(){
	return this.tail.length;
}

Snake.prototype.setMaxPos = function(maxX, maxY){
	this.maxX = maxX;
	this.maxY = maxY;
	this.x = (this.x+maxX)%maxX;
	this.y = (this.y+maxY)%maxY;
	this.head.setPos(gameCoordsToScreen(this.x, this.y));
}

Snake.prototype.draw = function(){
	for(var i = this.tail.length-1; i>=0; i--){
		this.tail[i].draw();
	}
}

Snake.prototype.move = function(){

	this.x = (this.maxX+this.x+Math.cos(this.angle))%this.maxX;
	this.y = (this.maxY+this.y+Math.sin(this.angle))%this.maxY;

	for(var i = this.tail.length-1; i > 0; i--){
		var pos = this.tail[i-1].getPos();
		this.tail[i].setPos(pos);
	}

	this.head.setPos(gameCoordsToScreen(this.x, this.y));
}

Snake.prototype.setAngle = function(angle){
	var prev = this.angle;
	this.angle = angle;
	if(prev == angle){
		this.move();
	}
}

Snake.prototype.grow = function(){
	var tile = new Tile(this.ctx, this.fillStyle);
	var pos = this.tail[this.tail.length-1].getPos();
	tile.setPos(pos);
	this.tail.push(tile);
}

Snake.prototype.turnLeft = function(){
	this.setAngle(Math.PI);
}

Snake.prototype.turnUp = function(){
	this.setAngle(-Math.PI/2);
}

Snake.prototype.turnRight = function(){
	this.setAngle(0);
}

Snake.prototype.turnDown = function(){
	this.setAngle(Math.PI/2);
}
