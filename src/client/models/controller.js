function Controller() {
  this.x = 0;
  this.y = 0;
}

Controller.prototype.keys = [];

Controller.prototype.keyDown = function(e) {

  this.keys[e.keyCode] = true;

  if (this.keys[87]) {
    this.y -= 5;
  }
  if (this.keys[68]) {
    this.x += 5;
  }
  if (this.keys[65]) {
    this.x -= 5;
  }
  if (this.keys[83]) {
    this.y += 5;
  }
}

Controller.prototype.keyUp = function(e) {
  this.keys[e.keyCode] = false;
}
