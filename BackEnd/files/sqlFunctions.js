const connection = require('./dbconnection')
const uuid = require('uuid-random')

function getTime() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const seconds = today.getSeconds()
    return yyyy + '-' + mm + '-' + dd + " " + hour + ':' + minute + ':' + seconds;
}

// REGISTER A NEW CAMPUS 

exports.registerCampusDetails = (campusName,campusType,planType,noOfPersons,campusEmail,campusLogo,campusPassword)=>{
    let campusId = uuid().slice(0,8);
    var dateTime = getTime();
    let sql = `insert into campus values(?,?,?,?,?,?,?,?,?);`;
    return new Promise((resolve, reject) => {
        connection.query(sql,[campusId, campusName,campusType,planType,noOfPersons,campusLogo, campusEmail,campusPassword, dateTime], (err,result)=>{
            if(err) console.log(err);
            else{
                console.log("Campus Created Successfully")
                resolve(campusId);
            }
        })
    })
}

// REGISTER NEW USER

exports.createAccount = (firstName, lastName, username, dob,campusQKey, email, password) => {
    let userId = uuid();
    let dateTime = getTime();
    let sql = `insert into userAccount  values(?,?,?,?,?,?,?,?,?);`;
    connection.query(sql, [userId, firstName, lastName, dob,username, email, password,campusQKey, dateTime], (err, result) => {
        if (err) console.log(err)
        else console.log("Account created successfully")
    })
}


exports.login = (email, password) => {
    let sql = `select * from userAccount where email=? and password=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [email, password], (err, result) => {
            if (err) console.log(err)
            else if (result.length === 0) {
                console.log("Check your credentials!")
                resolve(false)
            }
            else {
                resolve(result)
            }
        })
    })
}

exports.getCampus = (campusQKey) => {
    let sql = `select * from campus where campusId=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [campusQKey] ,(err, result) => {
            if (err) console.log(err)
            else {
                resolve(result)
            }
        })
    })
}

exports.getCampusDetails = (username) => {
    let sql = `select * from userAccount where username=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username], (err, result) => {
            if (err) console.log(err)
            else {
                resolve(result)
            }
        })
    })
}

exports.postQueries = (username, CampusName, queries, hashtag) => {

    var dateTime = getTime();
    let queryId = uuid();
    let sql = `insert into queries values(?,?,?,?,?,?)`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, CampusName, queryId, queries, hashtag, dateTime], (err, result) => {
            if (err) console.log(err)
            else {
                resolve(true);
            }
        })
    })
}


exports.getMyQueries = (username, CampusName) => {
    let sql = `select * from queries where user_name=? and campus_name=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, CampusName], async (err, result) => {
            if (err) console.log(err)
            else if (result.length === 0) {
                resolve([])
            }
            else {
                let myQueries = []
                for (let i = 0; i < result.length; i++) {
                    let answerCount = await this.getQueryAnswers(result[i].query_id)
                    let query = {
                        username: result[i].user_name,
                        CampusName: result[i].campus_name,
                        queryId: result[i].query_id,
                        query: result[i].query,
                        answerCount: answerCount.length,
                        date: result[i].date
                    }
                    myQueries.push(query)

                }
                resolve(myQueries)
            }
        })
    })
}

exports.getQueryAnswers = (queryId) => {
    let sql = `select * from answers where query_id =?`
    return new Promise((resolve, reject) => {
        connection.query(sql, [queryId], (err, result) => {
            if (err) console.log(err)
            else {
                resolve(result)
            }
        })
    })
}

exports.deleteQuery = (queryId) => {
    let sql = `delete from queries where query_id =?`
    return new Promise((resolve, reject) => {
        connection.query(sql, [queryId], (err, result) => {
            if (err) console.log(err)
            else {
                resolve(true)
            }
        })
    })

}
exports.queryReply = (username, CampusName, queryId, reply) => {
    let sql = `insert into answers values(?,?,?,?,0,0,?)`
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, CampusName, queryId, reply, dateTime], (err, result) => {
            if (err) console.log(err)
            else {
                resolve(true)
            }
        })
    })

}


exports.getQueries = (username, CampusName) => {
    let sql = `select * from queries where user_name!=? and campus_name=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, CampusName], async (err, result) => {
            if (err) console.log(err)
            else if (result.length === 0) {
                resolve([])
            }
            else {
                let Queries = []
                for (let i = 0; i < result.length; i++) {
                    let answerCount = await this.getQueryAnswers(result[i].query_id)
                    let query = {
                        username: result[i].user_name,
                        CampusName: result[i].campus_name,
                        queryId: result[i].query_id,
                        query: result[i].query,
                        answerCount: answerCount.length,
                        date: result[i].date
                    }
                    Queries.push(query)

                }
                resolve(Queries)
            }
        })
    })
}

exports.getFriends = (username, campusId) => {
    let sql = `select * from userAccount where  username!=? and campusId like '%${campusId}%'`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, username, username], (err, result) => {
            if (err) console.log(err)
            else {
                resolve(result)
            }
        })
    })
}

exports.sendMessage = (username, campusId, friendUsername, message) => {
    let chatId = uuid();
    var dateTime = getTime();
    let isAnonymous = false;
    let sql = `insert into chat values(?,?,?,?,?,?,?,?);`;

    return new Promise((resolve, reject) => {
        connection.query(sql, [chatId, username, friendUsername, campusId, message, false, isAnonymous, dateTime], (err, result) => {
            if (err) console.log(err)
            else {
                resolve("success")
            }
        })
    })

}

exports.chatDetails = (username, campusId, friendUsername) => {
    let sql = `select * from chat where sender=? and reciever=? and campusId=? or sender=? and reciever=? and campusId=? order by dateCreated;`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, friendUsername, campusId, friendUsername, username, campusId], (err, result) => {
            if (err) console.log(err)
            else {
                resolve(result)
            }
        })
    })
}



