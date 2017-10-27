var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dy = 0;
var dx = 0;
var treeSize = 80;
var ballRadius = 10;
var treeColor = "#28B463";
var ballColor = "#0095DD";
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var charSize = 50;
var orientation = 1;
var treePositions = [];
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// TODO: add var environment which holds tree/other environment info?

function randomColor() {
  ballColor = '#'+Math.floor(Math.random()*16777215).toString(16);
}

function drawBall() {
    // ctx.beginPath();
    // ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    // ctx.fillStyle = ballColor;
    // ctx.fill();
    // ctx.closePath();

    drawing = new Image();
    if (orientation == 0){
		drawing.src = "images/butch_left.png";
    } else{
		drawing.src = "images/butch_right.png";
    }

	ctx.drawImage(drawing,x,y, charSize, charSize);
}

function drawTree(x, y){
    // ctx.beginPath();
    // ctx.arc(x, y, treeRadius, 0, Math.PI*2);
    // ctx.fillStyle = treeColor;
    // ctx.fill();
    // ctx.closePath();

    drawing = new Image();
	drawing.src = "images/tree_NL.png";
	ctx.drawImage(drawing,x,y, treeSize, treeSize); //draw(image, x, y, width, height)
}

function draw() {
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.canvas.style.cursor = "none";

    if (rightPressed){
    	orientation = 1;
	}
	if (leftPressed){
		orientation = 0;
    }

    if (rightPressed && x < canvas.width-ballRadius) {
    	dx += 1;
    }
    if (leftPressed && x > ballRadius) {
    	dx += -1;
    }
    if (upPressed && y > ballRadius) {
    	dy += -1;
    }
    if (downPressed && y < canvas.height-ballRadius) {
    	dy += 1;
    }
    drawBall();
    for (var i = 0; i < treePositions.length; i++){
    	drawTree(treePositions[i].x, treePositions[i].y);
    }
    collisionDetection();

    x += dx;
    y += dy;
    dx = 0;
    dy = 0;
 }

 function collisionDetection() {
   var newx = x + dx;
   var newy = y + dy;
   for (var i = 0; i < treePositions.length; i++) {
     var tx = treePositions[i].x;
     var ty = treePositions[i].y;

     if (dx != 0 && (newx + ballRadius == tx || newx - ballRadius == tx + treeSize) &&
       newy + ballRadius >= ty && newy + ballRadius <= ty + treeSize) {
       dx = 0;
     }
     if (dy != 0 && (newy + ballRadius == ty || newy - ballRadius == ty + treeSize) &&
       newx + ballRadius >= tx && newx + ballRadius <= tx + treeSize) {
       dy = 0;
     }
   }
 }

function populateTrees(n){
	minx = 1;
	maxx = canvas.width;
	miny = 1;
	maxy = canvas.height;
	for (var i = 0; i < n; i++){
		treePositions.push({x:getRandomArbitrary(minx, maxx), y:getRandomArbitrary(miny, maxy)})
	}

}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 38) {
        upPressed = true;
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
    else if (e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
    else if (e.keyCode == 32) {
        spacePressed = false;
    }
}

populateTrees(100);
setInterval(draw, 10);
