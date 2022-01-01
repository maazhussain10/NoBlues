const md5 = require('md5')
const sqlFunctions = require('../files/sqlFunctions')
class Chat {
    constructor(app) {
        this.sendMessage(app);
        this.chatDetails(app);
    }
    sendMessage(app) {
        app.get('/sendmessage', async (req, res) => {
            let { username, campusId, friendUsername, message } = req.query
            let sendMessage = await sqlFunctions.sendMessage(username, campusId, friendUsername, message)
            res.send(sendMessage)
        })
    }

    chatDetails(app) {
        app.get('/chatdetails', async (req, res) => {
            let { username, campusId, friendUsername } = req.query
            let chatDetails = await sqlFunctions.chatDetails(username, campusId, friendUsername)
            res.send(chatDetails)
        })
    }
}
module.exports = Chat;



