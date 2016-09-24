var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Public folder
app.use(express.static('client'));

//Socket files
require('./server/socket/updateplayers')(io);

//Route files
app.use('/', require('./server/routes/index'));

//Server information
http.listen(80, function(){
  console.log('listening on port 80');
});
