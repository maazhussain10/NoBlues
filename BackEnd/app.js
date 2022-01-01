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

new Signup(app)
new Login(app)
new GetCampusDetails(app)
new Queries(app)
new Chat(app)
app.listen(5000, () => console.log("running on port 5000"))
