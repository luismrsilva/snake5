/* snake.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

function Snake(headFillStyle, fillStyle){
	this.headFillStyle = headFillStyle;
	this.fillStyle = fillStyle;
	this.tail = new Array();
	this.head = new Tile(headFillStyle);
	this.tail.push(this.head);

	this.x = 0;
	this.y = 0;
	this.maxX = 16;
	this.maxY = 16;
	this.angle = 0;
	this.lastAngle = 0;

	this.dead = false;
	this.onDieCallback = undefined;

	this.head.setPos(this.x, this.y);
}

Snake.prototype.getSize = function(){
	return this.tail.length;
}

Snake.prototype.setMaxPos = function(maxX, maxY){
	this.maxX = maxX;
	this.maxY = maxY;
	this.x = (this.x+maxX)%maxX;
	this.y = (this.y+maxY)%maxY;
	this.head.setPos(this.x, this.y);
}

Snake.prototype.draw = function(ctx){
	for(var i = this.tail.length-1; i>=0; i--){
		this.tail[i].draw(ctx);
	}
}

Snake.prototype.shouldDie = function(){
	var len = this.tail.length;
	for(var i = 0; i < len; i++){
		for(var j = i+4; j < len; j++){
			if(this.tail[i].atSamePos(this.tail[j])){
				return true;
			}
		}
	}
	return false;
}

Snake.prototype.isDead = function(){
	return this.dead;
}

Snake.prototype.die = function(){
	this.dead = true;
	this.headFillStyle = "#7cc144";
	this.fillStyle = "#72a054";

	this.tail[0].setFillStyle(this.headFillStyle);
	for(var i = this.tail.length-1; i > 0; i--){
		this.tail[i].setFillStyle(this.fillStyle);
	}

	if(this.onDieCallback){
		this.onDieCallback();
	}
}

Snake.prototype.move = function(){
	if(this.dead){
		return;
	}

	this.x = (this.maxX+this.x+Math.cos(this.angle))%this.maxX;
	this.y = (this.maxY+this.y+Math.sin(this.angle))%this.maxY;

	for(var i = this.tail.length-1; i > 0; i--){
		this.tail[i].copyPos(this.tail[i-1]);
	}

	this.head.setPos(this.x, this.y);

	this.lastAngle = this.angle;

	if(this.shouldDie()){
		this.die();
	}
}

Snake.prototype.setAngle = function(angle){
	var prev = this.angle;
	if(Math.abs(angle - this.lastAngle) == Math.PI){
		return;
	}

	this.angle = angle;
	if(prev == angle){
		this.move();
	}
}

Snake.prototype.grow = function(){
	var tile = new Tile(this.fillStyle);
	tile.copyPos(this.tail[this.tail.length-1]);
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

Snake.prototype.setOnDieCallback = function(callback){
	this.onDieCallback = callback;
}

Snake.prototype.isTakingPos = function(x, y){
	for(var i = this.tail.length-1; i >= 0; i--){
		if(this.tail[i].isAtXY(x, y)){
			return true;
		}
	}
	return false;
}