describe("Canvas", function(){

  function Player(name) {
    this.id = 1;
    this.name = name;
    this.modelName = "player";
    this.x = Math.floor((Math.random() * 200) + 50);
    this.y = Math.floor((Math.random() * 200) + 50);
  }

  var fakePlayer = new Player("Bob");

  it("Can create a new sprite for a player", function(){
    var publisher = new Publisher();
    var canvas = new Canvas(publisher);
    var sprite = canvas.CreatePlayer(fakePlayer);
    expect(fakePlayer.x).toEqual(sprite.x);
  });
  it("Can add a sprite to the stage", function(){
    var publisher = new Publisher();
    var canvas = new Canvas(publisher);
    var sprite = canvas.CreatePlayer(fakePlayer);
    canvas.AddPlayerToStage(sprite);
    var foundSprite = undefined;
    for(var i = 0; i < canvas.stage.children.length;i++) {
      if (canvas.stage.children[i].x === sprite.x) {
        foundSprite = canvas.stage.children[i];
      }
    }
    expect(foundSprite.x).toEqual(sprite.x);
  });
  it("Can clear the stage", function(){
    var publisher = new Publisher();
    var canvas = new Canvas(publisher);
    var sprite = canvas.CreatePlayer(fakePlayer);
    canvas.AddPlayerToStage(sprite);
    canvas.ClearStage();
    expect(canvas.stage.children.length).toBe(0);
  });
  it("Can update a player's location on the stage", function(){
    var publisher = new Publisher();
    var canvas = new Canvas(publisher);
    publisher.Subscribe(canvas);
    var playerList = [];
    playerList.push(fakePlayer);
    publisher.SendMessage(playerList);
    expect(canvas.stage.children.length).toEqual(1);
  });
});
