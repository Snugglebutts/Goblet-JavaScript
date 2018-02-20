(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
 
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"),
    frameNo = 0,
    width = window.innerWidth - 30,
    height = (window.innerHeight / 3) * 2,
    // player = new character(width / 2, height - 32, 'resources/characters/Wizard/SVG/Wizard-Right-2.svg', 32, 32, 3, 1.5),
    player = {
        x : width / 2,
        y : height - 32,
        width : 32,
        height : 32,
        direction : "right",
        walking : false,
        running : false,
        speed : 3,
        sprint : 1.5,
        character : "wizard",
        image : new Image(),
        imagePath : 'resources/characters/Wizard/SVG/Wizard-Right-2.svg',
        velX : 0,
        velY : 0,
        jumping : false,
        grounded : true,
        collideLeft : false,
        collideRight : false,
        doubleJump : 0,
        stepCount : 0,
        score : 0
    },
    keysdown = [],
    keysup = [],
    friction = 0.8,
    gravity = 0.5;

function character(x, y, path, width, height, speed, sprintMult) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = path;
    this.velX = 0;
    this.velY = 0;
    this.direction = "right";
    this.walking = false;
    this.running = false;
    this.speed = speed;
    this.sprint = sprintMult;
    this.character = "wizard";
    this.jumping = false;
    this.grounded = true;
    this.collideLeft = false;
    this.collideRight = false;
    this.doubleJump = 0;
    this.stepCount = 0;
    this.score = 0;
    this.update = function() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.velX;
        this.y += this.velY;
    }
}
 
var obstacles = [];

// Bounding dimensions
obstacles.push({
    x : 0,
    y : 0,
    width : 5,
    height : height
});
obstacles.push({
    x : 0,
    y : height - 2,
    width : width,
    height : 50
});
obstacles.push({
    x : width - 5,
    y : 0,
    width : 10,
    height : height
});
obstacles.push({
    x : width / 3 * 2,
    y : height - 15,
    width : 25,
    height : 25
});

canvas.width = width;
canvas.height = height;
document.body.insertBefore(canvas, document.body.childNodes[0]);
 
function update() {
    // check keys
    if (keysdown[38] || keysdown[32]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keysdown[39]) {
        // right arrow
        if (player.velX < player.speed) {             
            player.velX++;         
        }    
    }     
    if (keysdown[37]) {         
        // left arrow         
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
 
    player.velX *= friction;
    player.velY += gravity;
 
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();
 
    player.grounded = false;
    for (var i = 0; i < obstacles.length; i++) {
        ctx.rect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
 
        var dir = colCheck(player, obstacles[i]);
 
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
 
    }
 
    if(player.grounded){
         player.velY = 0;
    }
 
    player.x += player.velX;
    player.y += player.velY;
 
    ctx.fill();
    // player.newPos();
    // player.update();
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
 
    requestAnimationFrame(update);
}
 
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         
        var oX = hWidths - Math.abs(vX),             
            oY = hHeights - Math.abs(vY);         
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
 
document.body.addEventListener("keydown", function (e) {
    keysdown[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function (e) {
    keysdown[e.keyCode] = false;
});
 
window.addEventListener("load", function () {
    update();
});