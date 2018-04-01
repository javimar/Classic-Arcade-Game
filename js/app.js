let allEnemies = [];

// canvas graphical dimensions
const canvasWidth = 505;
const cellWidth = 101; // width of png images
const cellHeight = 82; // visible height of png

const spriteHeight = 70; // height of image

// Enemies our player must avoid
class Enemy
{
  constructor(x, y, speed)
  {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
      if(this.x > canvasWidth)
      {
          this.x = -100;
          this.speed = (Math.random() * 120) + 100;
      }

      // handle collision with Player
      if(player.x < this.x + 60 &&
          player.x + 60 > this.x &&
          player.y < this.y + spriteHeight &&
      	  player.y + spriteHeight > this.y)
      {
          player.reset();
      }
  }

  // Draw the enemy on the screen, required method for game
  render()
  {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// Player class
class Player
{
  constructor(x, y, sprite)
  {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }

  update(dt)
  {
  }

  render()
  {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) // check keys pressed by player
  {
      if(key === "left" && this.x > 0)
      {
          this.x -= cellWidth;
      }
      else if(key === "left" && this.x < 0)
      {
          this.x = 0;
      }

      if(key === "right" && this.x < (4 * cellWidth))
      {
          this.x += cellWidth;
      }
      else if(key === "right" && this.x > (4 * cellWidth))
      {
          this.x = 4 * cellWidth;
      }

      if(key === "up" && this.y > 0)
      {
          this.y -= cellHeight;
      }

      if(key === "down" && this.y < 400)
      {
          this.y += cellHeight;
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
      player.x = cellWidth * 2;
      player.y = 400;
    }, 300);
  }

} // end of class Player

// Instantiate the objects
const rows = [
    spriteHeight, spriteHeight+cellHeight, spriteHeight+cellHeight*2,
    spriteHeight, spriteHeight+cellHeight, spriteHeight+cellHeight*2,
    spriteHeight, spriteHeight+cellHeight, spriteHeight+cellHeight*2];
const enemySpeed = (Math.random() * 200) + 50;

rows.forEach(function (yCoord)
{
	enemy = new Enemy(0, yCoord, enemySpeed);
    // Place all enemy objects in an array called allEnemies
	allEnemies.push(enemy);
});

// new player initial position based on image and canvas size
const player = new Player(cellWidth * 2, 400);

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
