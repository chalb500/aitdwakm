var assert = require('assert');
var Player = require('../../../client/models/player');

describe("Player", function() {
  it("Has a name", function() {
    var player = new Player("Test");
    assert.equal(player.name, "Test");
  });
  it("Has an id", function() {
    var player = new Player("Test");

    var notNull = false;
    if (player.id != null)
      notNull = true;

    assert.equal(notNull, true);
  });
});
