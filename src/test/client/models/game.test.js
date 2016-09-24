assert = require('assert');
var Game = require('../../../client/models/game');
var Player = require('../../../client/models/player');

describe("Game", function() {
  it("Allows players to join", function() {
    var player = new Player("Test");
    var game = new Game();
    game.addPlayer(player);

    var foundPlayer = false;
    if (game.playerIds[player.id] != null) {
      foundPlayer = true;
    }

    assert(true, foundPlayer);
  });
});
