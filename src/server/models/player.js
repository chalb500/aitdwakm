var uuid = require('node-uuid');

module.exports = function Player(name) {
  this.id = uuid.v1();
  this.name = name;
  this.modelName = "player";
  this.x = Math.floor((Math.random() * 200) + 50);
  this.y = Math.floor((Math.random() * 200) + 50);
}
