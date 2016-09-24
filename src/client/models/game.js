function Game(socket) {
  this.socket = socket;
  this.controller = null;
}

Game.prototype.renderer = PIXI.autoDetectRenderer(800, 600);

Game.prototype.stage = new PIXI.Container();


Game.prototype.animate = function() {
  requestAnimationFrame(this.animate.bind(this));

  this.renderer.render(this.stage);
}

Game.prototype.start = function(window) {
  this.renderer.backgroundColor = 0x3498db;

  //Wire up the Controller
  this.controller = new Controller();
  window.addEventListener("keydown", this.controller.keyDown.bind(this.controller), false);
  window.addEventListener("keyup", this.controller.keyUp.bind(this.controller), false);

  var canvas = document.getElementById("gameContainer");
  canvas.appendChild(this.renderer.view);

  this.animate();
}

Game.prototype.updatePlayers = function(players) {
  //Clear the players
  this.stage.removeChildren(0, this.stage.children.length);

  var length = players.length;
  var sprite = null;
  for (var i = 0; i < length; i++) {
    //Create a sprite for the player
    sprite = PIXI.Sprite.fromImage("/assets/player.png");
    sprite.x = players[i].x;
    sprite.y = players[i].y;

    //Pass the sprite to the controller
    this.controller.playerSprite = sprite;

    //Add the player to the stage
    this.stage.addChild(sprite);
  }
}

Game.prototype.addNewPlayer = function(name) {
  //Create a new player
  var player = new Player(name);
  player.x = Math.floor((Math.random() * 200) + 50);
  player.y = Math.floor((Math.random() * 200) + 50);

  //Assign the player to the controller
  this.controller.player = player;

  //Send the new player to the server
  this.socket.emit('update players', player);
}
