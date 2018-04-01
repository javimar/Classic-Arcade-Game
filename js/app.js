let allEnemies = [];

// canvas graphical dimensions
const canvasWidth = 505;
const cellWidth = 101; // width of png images
const cellHeight = 82; // visible height of png

// Enemies our player must avoid
class Enemy
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
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

      // reaching the water will place player back to starting position after 3ms
      if(this.y < 1)
      {
          this.resetPlayer();
      }
  }

  resetPlayer()
  {
    setTimeout(function()
    {
      player.x = cellWidth * 2;
      player.y = 400;
    }, 300);
  }

} // end of class Player

// Instantiate the objects

// Place all enemy objects in an array called allEnemies

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
