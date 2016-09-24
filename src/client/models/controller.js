function Controller(e) { }

Controller.prototype.keys = [];

Controller.prototype.playerSprite = null;

Controller.prototype.keyDown = function(e) {

  if (this.playerSprite === null) {
    return;
  }

  this.keys[e.keyCode] = true;

  if (this.keys[87]) {
    this.playerSprite.y -= 5;
  }
  if (this.keys[68]) {
    this.playerSprite.x += 5;
  }
  if (this.keys[65]) {
    this.playerSprite.x -= 5;
  }
  if (this.keys[83]) {
    this.playerSprite.y += 5;
  }
}

Controller.prototype.keyUp = function(e) {
  this.keys[e.keyCode] = false;
}
