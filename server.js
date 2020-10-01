global.express = require('express');
var bodyParser = require('body-parser')
global.app = express();
global.http = require('http').Server(app);
global.io = require('socket.io')(http);
var dbcnt=require('./dbConnection.js');
var getmsg=require('./controller/messageCtrl');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.get('/messages', getmsg.messages); 
app.get('/messages/:user', getmsg.getMeessage); 
app.post('/postmessages', getmsg.postmessages); 
app.get('/messagesfindOne', getmsg.messagesfindOne); 
io.on('connection', () =>{
  console.log('socket is connected')
})
var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
