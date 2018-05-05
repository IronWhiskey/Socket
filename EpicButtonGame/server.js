
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
var count = 0;
io.on('connection', function (socket) {

    socket.on('updateCount', function(data){
        // console.log('inside update count');
        count += 1;
        var data = {
            num: count
        }
        io.emit('info', { msg: data });
    })

    socket.on('resetCount', function(data){
        // console.log('inside reset count');
        count = 0;
        var data = {
            num: count
        }
        io.emit('info', { msg: data });
    })
      
});
