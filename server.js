var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var Haml = require("haml"),
    fs = require("fs");


var arduino = require('duino'),
    board = new arduino.Board({
      device: "ACM"
    });

var sock2 = new arduino.Led({
  board: board,
  pin: 12
});

var sock1 = new arduino.Led({
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var sock1State = false;
var sock2State = false;

app.get("/", function( req, res ) {
  var haml = fs.readFileSync("index.html.haml", "utf8");

  res.send(Haml.render(haml));
});

app.get('/sock/1', function( request, response ) {
  if( sock1State ) {
    sock1State = false;
    sock1.on();
    response.send( 'It should be off.');
  } else {
    sock1State = true;
    sock1.off();
    response.send( 'It should be on.');
  }
  response.end();
});

app.get('/sock/2', function( request, response ) {
  if( sock2State ) {
    sock2State = false;
    sock2.on();
    response.send( 'It should be off.');
  } else {
    sock2State = true;
    sock2.off();
    response.send( 'It should be on.');
  }
  response.end();
});
