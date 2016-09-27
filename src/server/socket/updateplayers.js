module.exports = function(io) {
  var players = [];

  function findPlayerIndex(players, id) {
    var foundPlayer = false;
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === id) {
        return i;
      }
    }

    return -1;
  }

  io.on('connection', function(socket){
    socket.on('update players', function(player) {

      var index = findPlayerIndex(players, player.id);
      if (index !== -1) {
        players.splice(index, 1);
      }

      players.push(player);

      //Send the list of players back to the
      //clients for them to draw
      io.emit("update players", players);
    });

    socket.on('disconnect', function() {
      //Remove this player
      // var index = findPlayerIndex(players, player.id)
      // if (index !== -1) {
      //   players = players.splice(index, 1);
      // }

      io.emit("update players", players);
    });
  });
}
