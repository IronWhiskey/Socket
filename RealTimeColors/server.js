
// ================ MAIN SERVER SETUP AND SETTINGS ================
// --- setting up all node js modules ---
var express = require("express");
// var session = require('express-session');
// var bodyparser = require('body-parser');

// --- basic app settings views path, static path, view engine ---
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/static"));

// --- setting my sever to listen on port 1337 for socket io ---
const server = app.listen(8000);
console.log("listening on port 8000");
const io = require('socket.io')(server);



// ================ ROUTES AND CONTROLLERS ================
// --- root route to render the index.ejs page ---
app.get('/', function(req, res) {
    res.render('index');
})

// --- setting up socket io functionality emitters and listeners ---
io.on('connection', function (socket) {

    socket.on('updateColor', function(data){
        // console.log('inside update color');
        var data = {
            color: data.msg.color
        }
        io.emit('info', { msg: data });
    })

});
