var Player = require('./player.js');

module.exports = function Game() {
  var players = [];

  this.AddPlayerToGame = function(playerName) {
    var player = new Player(playerName);
    players.push(player);
    return player;
  }

  this.RemovePlayerFromGame = function(id) {
    players.pop(this.GetPlayer(id));
  }

  this.GetPlayer = function(playerId) {
    for (var i = 0; i < players.length;i++) {
      if (players[i].id === playerId) {
        return players[i];
      }
    }

    return null;
  }

  this.GetPlayers = function() {
    return players;
  }

  this.MovePlayer = function(playerId, x, y) {
    for(var i = 0; i < players.length;i++) {
      if (players[i].id === playerId) {
        players[i].x += x;
        players[i].y += y;
      }
    }
  }
}
