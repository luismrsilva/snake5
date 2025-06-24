/* swipe.js
 *
 * Handle left, right, up and down touch swipes.
 *
 * (c) 2016 by Luís Silva
 * https://github.com/luismrsilva
 * */

var RIGHT = 0;
var UP = 1;
var LEFT = 2;
var DOWN = 3;

function SwipeHander(element){
	this.startX = null;
	this.startY = null;

	var that = this;
	let options = {
		passive: false
	};
	element.addEventListener("touchstart", (e) => {that.onTouchStart(e)}, options);
	element.addEventListener("touchend", (e) => {that.onTouchEnd(e)}, options);
}

SwipeHander.prototype.onRight = function(){};
SwipeHander.prototype.onUp = function(){};
SwipeHander.prototype.onLeft = function(){};
SwipeHander.prototype.onDown = function(){};

SwipeHander.prototype.setOnRight = function(f){
	this.onRight = f;
};

SwipeHander.prototype.setOnUp = function(f){
	this.onUp = f;
};

SwipeHander.prototype.setOnLeft = function(f){
	this.onLeft = f;
};

SwipeHander.prototype.setOnDown = function(f){
	this.onDown = f;
};

SwipeHander.prototype.onTouchStart = function(e){
	var touch = e.changedTouches[0];
	this.startX = touch.clientX;
	this.startY = touch.clientY;
	e.preventDefault();
}

SwipeHander.prototype.onTouchEnd = function(e){
	var touch = e.changedTouches[0];
	this.handleSimpleTouch(this.startX, this.startY, touch.clientX, touch.clientY);
	e.preventDefault();
}

SwipeHander.prototype.handleSimpleTouch = function(startX, startY, endX, endY){
	var dir = this.getVectorDirection(startX, startY, endX, endY);
	switch(dir){
		case RIGHT:
			this.onRight();
			break;
		case UP:
			this.onUp();
			break;
		case LEFT:
			this.onLeft();
			break;
		case DOWN:
			this.onDown();
			break;
		default:
			break;
	}
}

SwipeHander.prototype.getVectorDirection = function(startX, startY, endX, endY){
	var dx = endX - startX;
	var dy = endY - startY;

	if(dx > 0){
		if(dy > 0){
			if(dx > dy){
				return RIGHT;
			} else{
				return DOWN;
			}
		} else {
			if(dx > -dy){
				return RIGHT;
			} else{
				return UP;
			}
		}
	} else {
		if(dy > 0){
			if(-dx > dy){
				return LEFT;
			} else{
				return DOWN;
			}
		} else {
			if(dx > dy){
				return UP;
			} else{
				return LEFT;
			}
		}
	}
}
