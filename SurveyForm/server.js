// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var session = require('express-session');
var bodyparser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/static"));

// setting my sever to listen on port 1337
const server = app.listen(1337);
console.log("listening on port 1337")
const io = require('socket.io')(server);


// root route to render the index.ejs page
app.get('/', function(req, res) {
    res.render('index');
})


io.on('connection', function (socket) {

    socket.on('submitForm', function(data){
        console.log('inside server submitForm');
        num = Math.floor(Math.random() * 1000) + 1;
        var info = {
            name: data.info.name,
            location: data.info.location,
            language: data.info.language,
            comment: data.info.comment,
            random: num
        }
        console.log("before emitting on server")
        socket.emit('info', { msg: info });
        console.log(info);
    })
      
});

// document.getElementById("data").innerHTML = name;