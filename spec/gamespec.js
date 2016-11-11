var Game = require('./../src/server/models/game.js');

describe("Game", function() {
  it ("can connect a new player to the game", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    expect(player.name).toBeDefined("Bob");
  });
  it("can retrieve an active player, given a player id", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    var activePlayer = game.GetPlayer(player.id);

    expect(activePlayer.name).toEqual("Bob");
  });

  it ("can remove a player from the game, given an id", function(){
    var game = new Game();
    var id = game.AddPlayerToGame("Bob");
    game.RemovePlayerFromGame(id);
    var player = game.GetPlayer(id);
    expect(player).toEqual(null);
  });
  it ("can move a player", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    game.MovePlayer(player.id, 15, 20);
    var newPlayer = game.GetPlayer(player.id);
    expect((newPlayer.x + newPlayer.y) - (player.x + player.y)).toEqual(0);
  });

  it ("can get player locations", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    var locations = game.GetPlayerLocations();
  });
});
