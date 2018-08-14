/* main.js
 *
 * Snake
 * (c) 2015 by Luís Silva
 * */

var KEY_LEFT	= 37;	var KEY_A = 65;
var KEY_UP		= 38;	var KEY_W = 87;
var KEY_RIGHT	= 39;	var KEY_D = 68;
var KEY_DOWN	= 40;	var KEY_S = 83;
var KEY_SPACE	= 32;
var KEY_RETURN	= 13;

var sideTileCount = 24;
var tileWidth;

/* Elements */
var c = document.getElementById("myCanvas");
var gameOverOverlay = document.getElementById("gameOverOverlay");
var restartButton = document.getElementById("restartButton");

var arenaTop = 0;
var arenaBottom = 0;
var arenaLeft = 0;
var arenaRight = 0;

var arenaFillStyle;

function gameCoordsToScreen(x, y){
	return {xScreen: arenaLeft + x*tileWidth,
			yScreen: arenaTop + y*tileWidth,
			w: tileWidth,
			h: tileWidth};
}

var ctx = c.getContext("2d");
var snake, cake;

function initGame(){
	arenaFillStyle = "#4CAF50";
	snake = new Snake("#76FF03", "#64DD17");
	cake = new Cake("#FFFF00");

	snake.setOnDieCallback(function(){
		arenaFillStyle = "#AF4C50";
		gameOverOverlay.style.display = "";
	});

	computeSizes();
	cake.respawn(snake);
	drawFrame();

	gameOverOverlay.style.display = "none";
}

restartButton.onclick = initGame;


var sizeChanged = true;
document.body.onresize = function (){
	sizeChanged = true;
};

function drawFrame(){
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = arenaFillStyle;
	ctx.fillRect(arenaLeft, arenaTop, arenaRight, arenaBottom);
	cake.draw(ctx);
	snake.draw(ctx);
}

function onLeft(){
	snake.turnLeft();
}

function onUp(){
	snake.turnUp();
}

function onRight(){
	snake.turnRight();
}

function onDown(){
	snake.turnDown();
}

function tryRestart(){
	if(snake.isDead()){
		initGame();
	}
}

function OnKeyDown(ev){
	switch(ev.keyCode){
		case KEY_LEFT:
		case KEY_A:
			onLeft();
			break;
		case KEY_UP:
		case KEY_W:
			onUp();
			break;
		case KEY_RIGHT:
		case KEY_D:
			onRight();
			break;
		case KEY_DOWN:
		case KEY_S:
			onDown();
			break;
		case KEY_SPACE:
		case KEY_RETURN:
			tryRestart();
			break;
		default:
			break;
	}
	drawFrame();
}

function computeSizes(){
	c.width = document.documentElement.clientWidth || 0;
	c.height = document.documentElement.clientHeight || 0;

	tileWidth = Math.max(c.width, c.height)/sideTileCount;
	var maxX = Math.floor(c.width/tileWidth);
	var maxY = Math.floor(c.height/tileWidth);

	var marginX = (c.width - maxX * tileWidth)/2;
	var marginY = (c.height - maxY * tileWidth)/2;

	arenaLeft = marginX;
	arenaTop = marginY;
	arenaRight = maxX*tileWidth;
	arenaBottom = maxY*tileWidth;

	snake.setMaxPos(maxX, maxY);
	cake.setMaxPos(maxX, maxY);
}

function updateStuff(){
	if(sizeChanged == true){
		computeSizes();
		sizeChanged = false;
	}
	snake.move();
	drawFrame();
	if(snake.x == cake.x && snake.y == cake.y){
		snake.grow();
		cake.respawn(snake);
	}
	setTimeout(updateStuff, 10+100/Math.log10(snake.getSize()/2+3));
}

initGame();
updateStuff();

document.onkeydown = OnKeyDown;

var swipeHandler = new SwipeHander(c);

swipeHandler.setOnRight(onRight);
swipeHandler.setOnUp(onUp);
swipeHandler.setOnLeft(onLeft);
swipeHandler.setOnDown(onDown);
