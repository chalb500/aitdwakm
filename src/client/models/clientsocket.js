//Has a socket.io dependency
function ClientSocket(socket) {
  this.socket = socket;
}

ClientSocket.prototype.ActivePlayerId = undefined;

//Listen for events
ClientSocket.prototype.Listen = function(publisher) {
  //Subscribe to updates
  publisher.Subscribe(this);

  var playerIdWrapper = {};
  playerIdWrapper.modelName = "playerId";

  this.socket.on('getPlayerId', function(playerId){
    playerIdWrapper.playerId = playerId;
    publisher.SendMessage(playerIdWrapper);
  });
  this.socket.on('updatePlayerLocations', function(players){
    publisher.SendMessage(players);
  });
}

//Adds a player to the game
ClientSocket.prototype.AddPlayer = function(playerName) {
  //Tell the server to add a player to the game
  this.socket.emit('addPlayer', playerName);
}

//Send a player's coordinates
ClientSocket.prototype.SendCoordinates = function(playerId, x, y) {
  this.socket.emit('movePlayer', { id: playerId, x: x, y: y });
}

//Set the dimensions of the game
ClientSocket.prototype.SetGameSize = function(width, height) {
  this.socket.emit('setGameSize', { width: width, height: height });
}

ClientSocket.prototype.SetSpriteDimensions = function(spriteDimensions) {
  this.socket.emit('setSpriteDimensions', spriteDimensions);
}

//Client socket can message itself
ClientSocket.prototype.Receive = function(message) {
  if(message.modelName === "playerId" && this.ActivePlayerId === undefined) {
    this.ActivePlayerId = message.playerId;
  }
  else if (message.modelName === "spriteDimensions") {
    this.SetSpriteDimensions(message);
  }
}
