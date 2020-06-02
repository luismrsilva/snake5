/* snake.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

const INITIAL_SNAKE_LEN	= 2;

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

	this.goFaster = false;
	this.dead = false;
	this.onDieCallback = undefined;

	this.head.setPos(this.x, this.y);

	for(let i = 0; i < INITIAL_SNAKE_LEN; i++){
		this.grow();
	}
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

	var newX = (this.maxX+this.x+Math.cos(this.angle))%this.maxX;
	var newY = (this.maxY+this.y+Math.sin(this.angle))%this.maxY;

	/* check if the new postion for the head is taken by the snake,
		except for the last tile on the tail, which is going to move */
	if(this.isTakingPos(newX, newY, 1)){
		this.die();
		return;
	}

	this.x = newX;
	this.y = newY;

	for(var i = this.tail.length-1; i > 0; i--){
		this.tail[i].copyPos(this.tail[i-1]);
	}

	this.head.setPos(this.x, this.y);

	this.lastAngle = this.angle;
}

Snake.prototype.setAngle = function(angle){
	var prev = this.angle;
	if(Math.abs(angle - this.lastAngle) == Math.PI){
		return;
	}

	this.angle = angle;
	if(prev == angle){
		this.goFaster = true;
	}
}

Snake.prototype.setFaster = function(faster){
	this.goFaster = faster;
}

Snake.prototype.getInterval = function(){
	return 10+100/Math.log10(snake.getSize()/2+3);
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

/*
	exclude:	Number of tiles to exclude from check, starting from the tail.
				Can be 0 (check the whole snake) to tail.length-1 (only check the head)
*/
Snake.prototype.isTakingPos = function(x, y, exclude=0){
	for(var i = this.tail.length - 1 - (exclude % (this.tail.length)); i >= 0; i--){
		if(this.tail[i].isAtXY(x, y)){
			return true;
		}
	}
	return false;
}
