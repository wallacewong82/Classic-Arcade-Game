// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; //set input x to the object's x.
    this.y = y; //set input y to the object's y.
    this.speed = speed; //set input speed to the object's speed.

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt; //updates the speed of the enemy...
    //via the engine refresh

    // reset enemy's x position once they go out of canvas.
    if (this.x > 500) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 350); //reset the speed
    }

// collision check. if confirmed, the player's position is reset.
    if (player.x < this.x + 50 &&  // includes sprite width
        player.x + 50 > this.x &&  //includes player width
        player.y < this.y + 50 && // includes sprite height
        player.y +50 > this.y) { //includes player height
        player.x = 200; //reset player's x position
        player.y = 380; //reset player's y position
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x; //set input x to the object's x.
    this.y = y; //set input y to the object's y.
    this.speed = speed; //set input speed to the object's speed.
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) { // cannot go lower than the canvas' limit
        this.y = 380;
    }

    if (this.x > 400) { //cannot go more right than the canvas' limit
        this.x = 400;
    }

    if (this.x < 0) { //cannot go more left than the canva's limit
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) { //player will reset position when they hit the water.
        this.x = 200;
        this.y = 380;
    }
};

//updates the position of the player as they move up, down, left, right
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50; // shift left by 50
            break;
        case 'up':
            this.y -= this.speed + 30; // shift up by 50
            break;
        case 'right':
            this.x += this.speed + 50; //shift right by 50
            break;
        case 'down':
            this.y += this.speed + 30; //shift down by 50
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = []; // empty array for ow

var enemyPosition = [60, 140, 220]; // height where the 3 enemies will be created
var player = new Player(200, 380, 50); //start position and speed
var enemy;

// initialize enemy's position and speed.
enemyPosition.forEach(function(myY) {
    enemy = new Enemy(0, myY, 100 + Math.floor(Math.random() * 350));
    allEnemies.push(enemy); //add enemy into the array
});

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
