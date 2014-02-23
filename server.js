var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var arduino = require('duino'),
    board = new arduino.Board();

var led = new arduino.Led({
  board: board,
  pin: 13
});

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname)));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var blinking = false;

app.get('/blink', function( request, response ) {
  if( blinking ) {
    blinking = false;
    led.on();
    response.send( 'It should not be on.');
  } else {
    blinking = true;
    led.off();
    response.send( 'It should be on.');
  }
  response.end();
});





