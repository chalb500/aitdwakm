var Player = require('./player.js');

function Game() {
  this.Players = [];
  this.Width = 0;
  this.Height = 0;
}

Game.prototype.AddPlayerToGame = function(playerName) {
  var player = new Player(playerName);
  this.Players.push(player);
  return player;
}

Game.prototype.SetGameSize = function(width, height) {
  this.Width = width;
  this.Height = height;
}

Game.prototype.RemovePlayerFromGame = function(id) {
  var player = this.FindPlayerById(id);
  this.Players.pop(player);
}

Game.prototype.GetPlayers = function() {
  return this.Players;
}

Game.prototype.UpdatePlayerSpriteInformation = function(id, width, height) {
  var player = this.FindPlayerById(id);
  player.spriteWidth = width;
  player.spriteHeight = height;
}

Game.prototype.FindPlayerById = function(id) {
  for (var i = 0; i < this.Players.length; i++) {
    if (this.Players[i].id === id) {
      return this.Players[i];
    }
  }

  return undefined;
}

Game.prototype.MovePlayer = function(id, x, y) {
  var player = this.FindPlayerById(id);

  player.x += x;
  player.y += y;

  if (this.CheckLeftBound(player) > 0) {
    player.x += this.CheckLeftBound(player);
  }
  if (this.CheckRightBound(player, this.Width) > 0) {
    player.x -= this.CheckRightBound(player, this.Width);
  }
  if (this.CheckTopBound(player) > 0) {
    player.y += this.CheckTopBound(player);
  }
  if (this.CheckBottomBound(player, this.Height) > 0) {
    player.y -= this.CheckBottomBound(player, this.Height);
  }
}

Game.prototype.CheckLeftBound = function(player) {
  if (player.x < 0) {
    return Math.abs(player.x);
  }
}

Game.prototype.CheckRightBound = function(player, width) {
  if ((player.x + player.spriteWidth) > width) {
    return ((player.x + player.spriteWidth) - width);
  }
}

Game.prototype.CheckTopBound = function(player) {
  if (player.y < 0) {
    return Math.abs(player.y);
  }
}

Game.prototype.CheckBottomBound = function(player, height) {
  if ((player.y + player.spriteHeight) > height) {
    return ((player.y + player.spriteHeight) - height);
  }
}

module.exports = Game;
