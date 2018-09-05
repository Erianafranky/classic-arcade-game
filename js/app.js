let gameover = document.querySelector('.game-over');
let myModal = document.querySelector('.start-game');
let overlay = document.querySelector('.overlay');

var playerLives = 5;

//function to check lives
function checkLives() {
    if (alllives.length === 0) {
        gameOver()
    }
}

// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = 60 + (row - 1) * 80;
    this.speed = speed;

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
    this.x += this.speed * dt;
    if (this.x > 500) this.x = -100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-princess-girl.png';
}

Player.prototype.update = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 33) {
        this.x -= 100;
    }

    else if(key === 'right' && this.x <400) {
        this.x += 100;
    }

    else if (key === 'up' && this.y > 18) {
        this.y -=80;
    }

    else if (key === 'down' && this.y <380) {
        this.y +=80;
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;   
}

//lives class
var Lives = function(x, y){
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
}

Lives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var allEnemies = [new Enemy(-8, 60, 3), new Enemy(0, 140, 10), new Enemy(-5, 300, 15)];
//var player = new Player(200, 380);
var allEnemies = [];
for (var i = 0; i < 6; i++) {
    var random_speed = getRandomNumber(10, 35) * 10;
    var random_row = getRandomNumber(1, 4);
    allEnemies[i] = new Enemy(random_row, random_speed);
}

var player = new Player();

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var alllives =  [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540), new Lives(100, 540), new Lives(130, 540)];


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

function resetGame() {
    window.location.reload(true);
}

function gameOver() {
    gameover.classList.add('show');
    overlay.classList.add('show');
}

function startGame() {
    myModal.classList.add('hide');
    overlay.classList.add('hide');

}