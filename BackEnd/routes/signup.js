const md5 = require('md5')
const sqlFunctions = require('../files/sqlFunctions')
class Signup {
    constructor(app) {
        this.signup(app);
        this.getCampus(app)
    }
    signup(app) {
        app.post('/signup', (req, res) => {
            let { firstName, lastName, username, dob, email,campusQKey, password } = req.query
            console.log(firstName, lastName, username, dob, email,campusQKey, password);
            password = md5(password)
            sqlFunctions.createAccount(firstName, lastName, username, dob,campusQKey, email, password)
            res.send()
        })
    }
    getCampus(app) {
        app.get('/getCampus', async (req, res) => {
            let { campusQKey } = req.query;
            let campusInfo = await sqlFunctions.getCampus(campusQKey)
            console.log(campusInfo);
            res.send(campusInfo[0])
        })
    }
}
module.exports = Signup;