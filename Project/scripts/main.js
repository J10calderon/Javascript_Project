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
var numTrees = 4;
var treePositions = [{x:15, y:15}, {x:75, y:75}, {x:35, y:35}, {x:45, y:65}];
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// TODO: add var environment which holds tree/other environment info?

function randomColor() {
  ballColor = '#'+Math.floor(Math.random()*16777215).toString(16);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawTree(x, y){
    // ctx.beginPath();
    // ctx.arc(x, y, treeRadius, 0, Math.PI*2);
    // ctx.fillStyle = treeColor;
    // ctx.fill();
    // ctx.closePath();

    drawing = new Image();
	drawing.src = "images/tree.png";
	ctx.drawImage(drawing,x,y, treeSize, treeSize); //draw(image, x, y, width, height)
}

function draw() {
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.canvas.style.cursor = "none";

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
    for (var i = 0; i < numTrees; i++){
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


setInterval(draw, 10);
