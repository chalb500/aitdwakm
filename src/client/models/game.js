function Game(socket) {
  this.socket = socket;
  this.controller = null;
  this.player = null;
}

Game.prototype.renderer = PIXI.autoDetectRenderer(800, 600);

Game.prototype.stage = new PIXI.Container();

Game.prototype.start = function() {
  this.renderer.backgroundColor = 0x3498db;

  var canvas = document.getElementById("gameContainer");
  canvas.appendChild(this.renderer.view);

  this.animate();
}

Game.prototype.animate = function() {
  requestAnimationFrame(this.animate.bind(this));

  var moved = this.movePlayer(this.player, this.controller);
  if (moved) {
    this.sendPlayerUpdate(this.player);
  }

  this.renderer.render(this.stage);
}

Game.prototype.movePlayer = function(player, controller) {
  var moved = false;

  if (player.x !== controller.x) {
    moved = true;
    player.x = controller.x;
  }
  if (player.y !== controller.y) {
    moved = true;
    player.y = controller.y;
  }

  return moved;
}

Game.prototype.updatePlayers = function(players) {
  //Clear the stage
  this.stage = new PIXI.Container();

  //Redraw the players
  console.log(players.length);
  for (var i = 0; i < players.length; i++) {
    var player = players[i];

    var sprite = this.getSprite(player.x, player.y);
    this.stage.addChild(sprite);
  }
}

Game.prototype.getSprite = function(x, y) {
  var sprite = PIXI.Sprite.fromImage("/assets/player.png");
  sprite.x = x;
  sprite.y = y;

  return sprite;
}

Game.prototype.addPlayerToGame = function(player) {
  //Assign this player to the game
  this.player = player;
  this.sendPlayerUpdate(player);
}

Game.prototype.sendPlayerUpdate = function(player) {
  this.socket.emit('update players', player);
}

Game.prototype.connectController = function(controller) {
  this.controller = controller;
}
