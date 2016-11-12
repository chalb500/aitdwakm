var Game = require('./../src/server/models/game.js');
var Player = require('./../src/server/models/player.js')

describe("Game", function() {
  it ("can connect a new player to the game", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    expect(player.name).toBeDefined("Bob");
  });

  it("can set the width of the game", function() {
    var game = new Game();
    game.SetGameSize(5, 5);

    expect(game.Width).toEqual(5);
  });

  it("can set the height of the game", function() {
    var game = new Game();
    game.SetGameSize(5, 5);

    expect(game.Height).toEqual(5);
  });

  it ("can remove a player from the game, given an id", function(){
    var game = new Game();
    var id = game.AddPlayerToGame("Bob");
    game.RemovePlayerFromGame(id);
    var player = game.FindPlayerById(id);
    expect(player).toEqual(undefined);
  });

  it ("can get the players of the game", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    var players = game.GetPlayers();
    expect(players[0].id).toEqual(player.id);
  });

  it("can update a player's sprite information", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    game.UpdatePlayerSpriteInformation(player.id, 5, 5);
    var updatedPlayer = game.FindPlayerById(player.id);
    var same = false;
    if (updatedPlayer.spriteWidth === 5 && updatedPlayer.spriteHeight === 5) {
      same = true;
    }
    expect(same).toEqual(true);
  });

  it("can find a player, given the player's id", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    var activePlayer = game.FindPlayerById(player.id);

    expect(activePlayer.name).toEqual("Bob");
  });

  it ("can move a player", function() {
    var game = new Game();
    var player = game.AddPlayerToGame("Bob");
    game.MovePlayer(player.id, 15, 20);
    var newPlayer = game.FindPlayerById(player.id);
    expect((newPlayer.x + newPlayer.y) - (player.x + player.y)).toEqual(0);
  });

  it ("can check if the player overran the left bound", function() {
    var game = new Game();
    //game height and width are 0
    var player = new Player("test");
    player.x = -1;
    player.y = 1;
    player.spriteWidth = 1;
    player.spriteHeight = 1;
    var overrun = game.CheckLeftBound(player);
    expect(overrun).toEqual(1);
  });

  it ("can check if the player overran the right bound", function() {
    var game = new Game();
    //game height and width are 0
    var player = new Player("test");
    player.x = 1;
    player.y = 1;
    player.spriteWidth = 1;
    player.spriteHeight = 1;
    var overrun = game.CheckRightBound(player, 0);
    expect(overrun).toEqual(2);
  });

  it ("can check if the player overran the bottom bound", function() {
    var game = new Game();
    //game height and width are 0
    var player = new Player("test");
    player.x = 1;
    player.y = 1;
    player.spriteWidth = 1;
    player.spriteHeight = 1;
    var overrun = game.CheckBottomBound(player, 0);
    expect(overrun).toEqual(2);
  });

  it ("can check if the player overran the top bound", function() {
    var game = new Game();
    //game height and width are 0
    var player = new Player("test");
    player.x = 1;
    player.y = -1;
    player.spriteWidth = 1;
    player.spriteHeight = 1;
    var overrun = game.CheckTopBound(player);
    expect(overrun).toEqual(1);
  });
});
