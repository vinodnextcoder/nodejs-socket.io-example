
var Message = require('../msg');
let msg={}
function getMeessage(req, res) {
    var user = req.params.user
    Message.find({ name: user }, (err, messages) => {
        res.send(messages);
    })
}
msg.getMeessage=getMeessage;
function messages(req, res) {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
}
msg.messages=messages;
async function postmessages(req, res) {
    console.log(req.body)
    try {
        var message = new Message(req.body);
        var savedMessage = await message.save()
        var censored = await Message.findOne({ message: 'badword' });
        if (censored)
            await Message.remove({ _id: censored.id })
        else
            io.emit('message', req.body);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500);
        return
    }
    finally {
        console.log('Message Posted')
    }
}
msg.postmessages=postmessages;
module.exports=msg;