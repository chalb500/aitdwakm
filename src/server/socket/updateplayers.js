module.exports = function(io) {
  var players = [];

  io.on('connection', function(socket){
    socket.on('update players', function(player) {
      //Add this player to the list of players
      player.socketId = socket.id;
      players.push(player);

      //Send the list of players back to the
      //clients for them to draw
      io.emit("update players", players);
    });

    socket.on('disconnect', function() {
      //Remove this player
      var player = null;
      for(i = 0; i < players.length; i++) {
        if (players[i].socketId == socket.id) {
          player = players[i];
        }
      }

      if (player != null) {
        players.pop(player);
      }

      io.emit("update players", players);
    });
  });
}
