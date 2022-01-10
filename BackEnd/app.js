const express = require('express')
const path = require('path')
const cors = require('cors');
const Signup = require('./routes/signup');
const Login = require('./routes/login');
const GetCampusDetails = require('./routes/getcampusdetails');
const Queries = require('./routes/queries');
const Chat = require('./routes/chat');
const app = express();

app.use(cors())

app.get('/', function (req, res) {
    res.send('<html><head><title>AAA</title><body><h1>Maaz Hussain</h1></body></head></html>');
});

new Signup(app)
new Login(app)
new GetCampusDetails(app)
new Queries(app)
new Chat(app)


app.listen(process.env.PORT||5000, () => console.log("running on port 5000"))
