function Canvas(publisher, width, height) {
  this.publisher = publisher;
  this.width = width;
  this.height = height;
}

Canvas.prototype.renderer = PIXI.autoDetectRenderer(this.width, this.height);

Canvas.prototype.stage = new PIXI.Container();

Canvas.prototype.CreatePlayerSprite = function(player) {
  var sprite = PIXI.Sprite.fromImage("/assets/player.png");
  sprite.x = player.x;
  sprite.y = player.y;

  return sprite;
}

Canvas.prototype.ClearStage = function() {
    this.stage.removeChildren();
}

Canvas.prototype.AddPlayerToStage = function(player) {
  this.stage.addChild(player);
}

Canvas.prototype.Show = function() {
  this.renderer.backgroundColor = 0x3498db;

  var canvas = document.getElementById("gameContainer");
  canvas.appendChild(this.renderer.view);

  this.animate();

  //subscribe to updates
  this.publisher.Subscribe(this);
}

Canvas.prototype.animate = function() {
  requestAnimationFrame(this.animate.bind(this));

  this.renderer.render(this.stage);
}

Canvas.prototype.Receive = function(message) {
  if (Array.isArray(message) && message[0].modelName === "player") {
    //Update the canvas with the new player locations
    this.ClearStage();
    for (var i = 0; i < message.length; i++) {
      var sprite = this.CreatePlayerSprite(message[i]);

      //Tell the server about the sprite dimensions
      this.publisher.SendMessage({modelName: "spriteDimensions", id: message[i].id, width: sprite.width, height: sprite.height});

      this.AddPlayerToStage(sprite);
    }
  }
}
