var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var speedX = 0;
var speedY = 0;
var gravity = 0.05;
var yspeed = 0;
var xspeed = 0;
var ballRadius = 10;
var ballColor = "#0095DD";
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


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

 function draw(){
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.canvas.style.cursor = "none";

 	drawBall();
    if (rightPressed == true && x < canvas.width-ballRadius-2) {
    	xspeed = 3;
    }
    if (leftPressed == true && x > ballRadius+2) {
    	xspeed = -3;
    }
    if (upPressed == true && y > ballRadius && (y > canvas.height-ballRadius*2 + 8)) {
    	this.yspeed = -3;
    }
    
    if (downPressed == true && y < canvas.height-ballRadius) {
    	this.yspeed = 3;
    }
    x += xspeed;
    y += yspeed;


    collisionDetection();

 }

 function collisionDetection(){
 	if (y + speedY >= canvas.height - ballRadius){
 		y = canvas.height - ballRadius;
        this.yspeed = 0;
 	}
 	else if (y + speedY <= ballRadius){
 		this.yspeed = 0;
 	}
 	else if (x + speedX >= canvas.width - ballRadius){
 		speedX = 0;
        this.xspeed = -this.xspeed;
 	}
 	else if (x + speedX <= ballRadius){
 		speedX = 0;
        this.xspeed = -this.xspeed;
 	}

 }



function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }

    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
    else if(e.keyCode == 32) {
        spacePressed = false;
    }
}


setInterval(draw, 10);

