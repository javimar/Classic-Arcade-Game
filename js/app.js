let allEnemies = [];

const CANVAS_WIDTH = 505; // canvas graphical dimensions
const CELL_WIDTH = 101; // width of png images
const CELL_HEIGHT = 83; // visible height of png
const SPRITE_HEIGHT = 70; // height of image

// Superclass representing a character
class Character
{
    constructor(x, y, sprite)
    {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    // Draw the character on the screen, required method for game
    render()
    {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character
{
  constructor(x, y, speed, sprite = 'images/enemy-bug.png')
  {
      super(x, y, sprite);
      this.speed = speed;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt)
  {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      this.x = this.x + (this.speed * dt); // move from left to right at specified speed

      // when bugs move out of canvas, place them way back at the beginning
      // and update their speed
      if(this.x > CANVAS_WIDTH)
      {
          this.x = -CELL_WIDTH;
          this.speed = (Math.random() * 120) + 100;
      }

      // handle collision with Player
      if(player.x < this.x + 60 &&
          player.x + 60 > this.x &&
          player.y < this.y + SPRITE_HEIGHT &&
      	  player.y + SPRITE_HEIGHT > this.y)
      {
          player.reset();
      }
  }
} // end of Enemy class

// Player class
class Player extends Character
{
  constructor(x, y, sprite='images/char-boy.png')
  {
      super(x, y, sprite);
  }

  update(dt)
  {
  }

  handleInput(key) // check keys pressed by player
  {
      if(key === "left" && this.x > 0)
      {
          this.x -= CELL_WIDTH;
      }
      else if(key === "left" && this.x < 0)
      {
          this.x = 0;
      }

      if(key === "right" && this.x < (4 * CELL_WIDTH))
      {
          this.x += CELL_WIDTH;
      }
      else if(key === "right" && this.x > (4 * CELL_WIDTH))
      {
          this.x = 4 * CELL_WIDTH;
      }

      if(key === "up" && this.y > 0)
      {
          this.y -= CELL_HEIGHT;
      }

      if(key === "down" && this.y < 400)
      {
          this.y += CELL_HEIGHT;
      }
      else if(key === "down" && this.y > 400)
      {
          this.y = 400;
      }

      // reaching the water will place player back at starting position after 3ms
      if(this.y < 1)
      {
          this.reset();
      }
  }

  reset()
  {
    setTimeout(function()
    {
      player.x = CELL_WIDTH * 2;
      player.y = 400;
    }, 300);
  }

} // end of class Player


// Instantiate the objects
const rows = [
    SPRITE_HEIGHT, SPRITE_HEIGHT + CELL_HEIGHT, SPRITE_HEIGHT + CELL_HEIGHT * 2,
    SPRITE_HEIGHT, SPRITE_HEIGHT + CELL_HEIGHT, SPRITE_HEIGHT + CELL_HEIGHT * 2,
    SPRITE_HEIGHT, SPRITE_HEIGHT + CELL_HEIGHT, SPRITE_HEIGHT + CELL_HEIGHT * 2];
const enemySpeed = (Math.random() * 200) + 50;

rows.forEach(function (yCoord)
{
	enemy = new Enemy(0, yCoord, enemySpeed);
    // Place all enemy objects in an array called allEnemies
	allEnemies.push(enemy);
});

// new player initial position based on image and canvas size
const player = new Player(CELL_WIDTH * 2, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(evt)
{
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[evt.keyCode]);
});
