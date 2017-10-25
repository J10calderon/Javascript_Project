  var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var speedX = 0;
var speedY = 0;
var gravity = 0.05;
var gravitySpeed = 0;
var momentum = 0;
var ballRadius = 10;
var ballColor = "#0095DD";
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var circleBounce = .5;
var squareBounce = 0;
var circleMode = true;
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
function drawSquare() {
	ctx.beginPath();
    ctx.rect(x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}
 function draw(){
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.canvas.style.cursor = "none";

    if (spacePressed == true && circleMode == true ){
        circleMode = false;
    } else if (spacePressed == true && circleMode == false){
        circleMode = true;
    }
 	swap();
 	
    if (rightPressed == true && x < canvas.width-ballRadius-2) {
    	momentum = 3;
    }
    if (leftPressed == true && x > ballRadius+2) {
    	momentum = -3;
    }
    if (upPressed == true && y > ballRadius && (y > canvas.height-ballRadius*2 + 8)) {
    	this.gravitySpeed = -3;
    }
    
    if (downPressed == true && y < canvas.height-ballRadius) {
    	this.gravitySpeed = 3;
    }
    
    this.gravitySpeed += this.gravity;
    x += momentum;
    y += gravitySpeed;

    if (circleMode == true){
        collisionDetectionBounce();
    } else {
        collisionDetection();
    }

 }
 function swap(){
 	if (circleMode == true){
 		drawBall();
 	} else {
 		drawSquare();
 	}
 }

 function collisionDetection(){
 	if (y + speedY >= canvas.height - ballRadius){
 		y = canvas.height - ballRadius;
        this.gravitySpeed = 0;
 	}
 	else if (y + speedY <= ballRadius){
 		this.gravitySpeed = 0;
 	}
 	else if (x + speedX >= canvas.width - ballRadius){
 		speedX = 0;
        this.momentum = -this.momentum;
 	}
 	else if (x + speedX <= ballRadius){
 		speedX = 0;
        this.momentum = -this.momentum;
 	}

 }
 function collisionDetectionBounce(){
    if (y + speedY >= canvas.height - ballRadius){
        y = canvas.height - ballRadius;
        this.gravitySpeed = -this.gravitySpeed;
    }
    else if (y + speedY <= ballRadius){
        this.gravitySpeed = 0;
        this.momentum = 0;
    }
    else if (x + speedX >= canvas.width - ballRadius){
        this.momentum = -this.momentum;
    }
    else if (x + speedX <= ballRadius){
        this.momentum = -this.momentum;
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

