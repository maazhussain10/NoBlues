const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "maaz",
    password: "root",
    database: "campusq",
});

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function (err, sequence) {
    if (err.fatal) {
        console.trace("fatal error: " + err.message);
    }
    return del.call(this, err, sequence);
};

connection.connect(function (err) {
    if (err) console.log("database connection failed");
    else console.log("database connection successfull");
});
module.exports = connection;
