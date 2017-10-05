var express = require("express");
// var bodyParser = require('body-parser');// posting data
var path = require("path");


var app = express();


app.set('views', path.join(__dirname, './views'));
// app.use(express.static(path.join(__dirname, "./static")));
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
  response.render('index');
})

var server = app.listen(8000, function() {
  console.log("listening on port 8000");

});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  console.log("Client/socket id is: ", socket.id);


  socket.on('button_push', function(data) {

    console.log(data.count++);
    count = data.count;
    socket.emit('increment', {
      count: count
    })
  })
  socket.on('reset_push', function(data) {
    data.count = 0;
    count = data.count;
    console.log(count);
    socket.emit('increment', {
      count: count
    })
  })
});
