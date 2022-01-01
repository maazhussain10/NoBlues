const md5 = require('md5')
const sqlFunctions = require('../files/sqlFunctions')
class Login {
    constructor(app) {
        this.login(app);
    }
    login(app) {
        app.post('/login', async (req, res) => {
            let { email, password } = req.query;
            password = md5(password);
            let loginDetails = await sqlFunctions.login(email, password);
            res.send(loginDetails);
        })
    }
}

module.exports = Login;



