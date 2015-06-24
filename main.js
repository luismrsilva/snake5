/* main.js
 * 
 * Snake
 * (c) 2015 by Luís Silva
 * */

var KEY_LEFT	= 37;	var KEY_A = 65;
var KEY_UP		= 38;	var KEY_W = 87;
var KEY_RIGHT	= 39;	var KEY_D = 68;
var KEY_DOWN	= 40;	var KEY_S = 83;

var tileWidth = 50;

var c = document.getElementById("myCanvas");
var maxX = 0;
var maxY = 0;

function gameCoordsToScreen(x, y){
	return {x: x*tileWidth,
			y: y*tileWidth,
			w: tileWidth,
			h: tileWidth};
}

var ctx = c.getContext("2d");

var snake = new Snake(ctx, "#76FF03", "#64DD17");
var cake = new Cake(ctx, "#FFFF00");

function drawFrame(){
	ctx.clearRect(0, 0, c.width, c.height);
	cake.draw();
	snake.draw();
}

function OnKeyDown(ev){
	switch(ev.keyCode){
		case KEY_LEFT:
		case KEY_A:
			snake.setAngle(Math.PI);
			break;
		case KEY_UP:
		case KEY_W:
			snake.setAngle(-Math.PI/2);
			break;
		case KEY_RIGHT:
		case KEY_D:
			snake.setAngle(0);
			break;
		case KEY_DOWN:
		case KEY_S:
			snake.setAngle(Math.PI/2);
			break;
		default:
			break;
	}
	drawFrame();
}

function computeSizes(){
	c.width = document.documentElement.clientWidth || 0;
	c.height = document.documentElement.clientHeight || 0;
	maxX = Math.floor(c.width/tileWidth);
	maxY = Math.floor(c.height/tileWidth);
	snake.setMaxPos(maxX, maxY);
	cake.setMaxPos(maxX, maxY);
}

function updateStuff(){
	snake.move();
	drawFrame();
	if(snake.x == cake.x && snake.y == cake.y){
		snake.grow();
		cake.respawn();
	}
	setTimeout(updateStuff, 10+100/Math.log10(snake.getSize()/2+3));
}


document.body.onresize = computeSizes;
computeSizes();
cake.respawn();
drawFrame();
updateStuff();

document.onkeydown = OnKeyDown;
