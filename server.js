var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var Haml = require("haml"),
    fs = require("fs");


var arduino = require('duino'),
    board = new arduino.Board({
      device: "ACM"
    });

var pins = {};

pins[12] = new arduino.Led({
  board: board,
  pin: 12
});

pins[11] = new arduino.Led({
  board: board,
  pin: 11
});

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join(__dirname)));

server.listen( port );

app.get("/", function( req, res ) {
  var haml = fs.readFileSync("index.html.haml", "utf8");

  res.send(Haml.render(haml));
});

io.sockets.on('connection', function( socket ) {
  socket.on('update-pins', function( data ) {
    for( var pin in data ) {
      if( data[pin] ) {
        console.log('Turning pin ' + pin + ' on.');
        pins[pin].on();
      } else {
        console.log('Turning pin ' + pin + ' off.');
        pins[pin].off();
      }
    }
    // We can add error handling once we figure out how
    // duino handles errors.
    socket.emit('message', "Your request has been processed.");
  });
});

