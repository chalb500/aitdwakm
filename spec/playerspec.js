var Player = require('./../src/server/models/player.js');

describe("Player", function() {
  it ("has a name", function() {
    var player = new Player("Test");
    expect(player.name).toEqual("Test");
  });
  it("has an id", function() {
    var player = new Player("Test");
    expect(player.id).toBeDefined();
  });
  it("has a model name", function() {
    var player = new Player("Test");
    expect(player.modelName).toEqual("player");
  });
  it ("has an x coordinate", function() {
    var player = new Player("Test");
    expect(player.x).toBeDefined();
  });
  it ("has a y coordinate", function() {
    var player = new Player("Test");
    expect(player.y).toBeDefined();
  });

  it ("has a sprite width", function() {
    var player = new Player("Test");
    expect(player.spriteWidth).toBe(0);
  });
  it ("has a sprite height", function() {
    var player = new Player("Test");
    expect(player.spriteHeight).toBe(0);
  });

});
