var Game = require('./../models/game.js');

module.exports = function(io) {
  //Create a new game
  var game = new Game();
  var socketMapping = [];

  io.on('connection', function(socket){
    socket.on('addPlayer', function(playerName) {
      //Add player to the game
      var player = game.AddPlayerToGame(playerName);

      //Map the player to this socket
      socketMapping[socket.id] = player.id;

      //Tell this client it's player id
      io.emit('getPlayerId', player.id);

      //Tell the clients to update their players
      io.emit('updatePlayerLocations', game.GetPlayers());
    });

    socket.on('movePlayer', function(idCoordinates) {
      game.MovePlayer(idCoordinates.id, idCoordinates.x, idCoordinates.y);
      io.emit('updatePlayerLocations', game.GetPlayers());
    });

    socket.on('disconnect', function() {
      //get the player id
      var playerId = socketMapping[socket.id];

      //Remove the player from the list
      game.RemovePlayerFromGame(playerId);

      //Tell the clients to update their players
      io.emit('updatePlayerLocations', game.GetPlayers());
    });
  });
}
