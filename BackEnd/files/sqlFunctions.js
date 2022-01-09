const connection = require("./dbconnection");
const uuid = require("uuid-random");

function getTime() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const seconds = today.getSeconds();
    return (
        yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + seconds
    );
}

// REGISTER A NEW CAMPUS

exports.registerCampusDetails = (
    campusName,
    campusType,
    planType,
    noOfPersons,
    campusEmail,
    campusLogo,
    campusPassword
) => {
    let campusId = uuid().slice(0, 8);
    var dateTime = getTime();
    let sql = `insert into campus values(?,?,?,?,?,?,?,?,?);`;
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            [
                campusId,
                campusName,
                campusType,
                planType,
                noOfPersons,
                campusLogo,
                campusEmail,
                campusPassword,
                dateTime,
            ],
            (err, result) => {
                if (err) console.log(err);
                else {
                    console.log("Campus Created Successfully");
                    resolve(campusId);
                }
            }
        );
    });
};

// REGISTER NEW USER

exports.createAccount = (
    firstName,
    lastName,
    username,
    dob,
    campusQKey,
    email,
    password
) => {
    let userId = uuid();
    let dateTime = getTime();
    let sql = `insert into userAccount  values(?,?,?,?,?,?,?,?,?);`;
    connection.query(
        sql,
        [
            userId,
            firstName,
            lastName,
            dob,
            username,
            email,
            password,
            campusQKey,
            dateTime,
        ],
        (err, result) => {
            if (err) console.log(err);
            else console.log("Account created successfully");
        }
    );
};

exports.login = (email, password) => {
    let sql = `select * from userAccount where email=? and password=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [email, password], (err, result) => {
            if (err) console.log(err);
            else if (result.length === 0) {
                console.log("Check your credentials!");
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getCampus = (campusQKey) => {
    let sql = `select * from campus where campusId=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [campusQKey], (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};

exports.getCampusDetails = (username) => {
    let sql = `select * from userAccount where username=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username], (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};

exports.getUserId = (username) => {
    let sql = `select * from userAccount where username=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username], (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result[0].userId);
            }
        });
    });
};

exports.getUsername = (userId) => {
    let sql = `select * from userAccount where userId=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [userId], (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result[0].username);
            }
        });
    });
};

exports.postQueries = (userId, campusId, queries, hashTags) => {
    var dateTime = getTime();
    let queryId = uuid();
    let sql = `insert into queries values(?,?,?,?,?,?,?);`;
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            [userId, campusId, queryId, queries, hashTags, false, dateTime],
            (err, result) => {
                if (err) console.log(err);
                else {
                    resolve(true);
                }
            }
        );
    });
};

exports.getMyQueries = (userId, campusId) => {
    let sql = `select * from queries where userId=? and campusId=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [userId, campusId], async (err, result) => {
            if (err) console.log(err);
            else if (result.length === 0) {
                resolve([]);
            } else {
                let myQueries = [];
                for (let i = 0; i < result.length; i++) {
                    let queryLikesCount = await this.likesCount(
                        "query",
                        result[i].queryId
                    );
                    let userLikeStatus;

                    for (let k = 0; k < queryLikesCount.length; k++) {
                        if (userId === queryLikesCount[k].userId) {
                            userLikeStatus = queryLikesCount[k].queryLikes;
                            break;
                        }
                    }

                    let answerCount = await this.getQueryAnswers(userId,
                        result[i].queryId
                    );
                    let query = {
                        userId: result[i].userId,
                        campusId: result[i].campusId,
                        queryId: result[i].queryId,
                        likeCount: queryLikesCount.length,
                        userLikeStatus:userLikeStatus,
                        query: result[i].query,
                        answerCount: answerCount.length,
                        date: result[i].dateCreated,
                    };
                    myQueries.push(query);
                }
                resolve(myQueries);
            }
        });
    });
};

exports.getQueryAnswers = (userId,queryId) => {
    let sql = `select * from answers where queryId =?;`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [queryId], async (err, result) => {
            if (err) console.log(err);
            else {
                let queries = [];
                for (let i = 0; i < result.length; i++) {
                    let answerLikesCount = await this.likesCount(
                        "answer",
                        result[i].answerId
                    );
                    let userLikeStatus;
                    for (let k = 0; k < answerLikesCount.length; k++) {
                        if (userId === answerLikesCount[k].userId) {
                            userLikeStatus = answerLikesCount[k].answerLikes;
                            break;
                        }
                    }
                    let query = {
                        username: await this.getUsername(result[i].userId),
                        userId: result[i].userId,
                        campusId: result[i].campusId,
                        answerId: result[i].answerId,
                        answers: result[i].answers,
                        likeCount: answerLikesCount.length,
                        userLikeStatus: userLikeStatus,
                        anonymous: result[i].anonymous,
                        dateCreated: result[i].dateCreated,
                    };
                    queries.push(query);
                }
                resolve(queries);
            }
        });
    });
};

exports.deleteQuery = (queryId) => {
    let sql = `delete from queries where queryId =?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [queryId], (err, result) => {
            if (err) console.log(err);
            else {
                resolve(true);
            }
        });
    });
};

exports.deleteAnswer = (answerId) => {
    let sql = `delete from answers where answerId =?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [answerId], (err, result) => {
            if (err) console.log(err);
            else {
                resolve(true);
            }
        });
    });
};

exports.likeCount = (userId, campusId, type, id) => {
    let sql = `insert into likes values(?,?,?,?,?,?,?);`;
    return new Promise((resolve, reject) => {
        if (type === "query") {
            let queryLikes;
            connection.query(
                `select * from likes where userId=? and campusId=? and queryId=?;`,
                [userId, campusId, id],
                (err1, result1) => {
                    if (err1) console.log(err1);
                    else if (result1.length === 0) {
                        connection.query(
                            sql,
                            [userId, campusId, id, null, true, false, false],
                            (err, result) => {
                                if (err) console.log(err);
                                else {
                                    resolve(true);
                                }
                            }
                        );
                    } else {
                        queryLikes = result1[0].queryLikes;
                        sql = `update likes set queryLikes=? where userId=? and campusId=? and queryId=?;`;
                        connection.query(
                            sql,
                            [!queryLikes, userId, campusId, id],
                            (err, result) => {
                                if (err) console.log(err);
                                else {
                                    resolve(true);
                                }
                            }
                        );
                    }
                }
            );
        } else if (type === "answer") {
            let answerLikes;
            connection.query(
                `select * from likes where userId=? and campusId=? and answerId=?;`,
                [userId, campusId, id],
                (err1, result1) => {
                    if (err1) console.log(err1);
                    else if (result1.length === 0) {
                        connection.query(
                            sql,
                            [userId, campusId, null, id, false, true, false],
                            (err, result) => {
                                if (err) console.log(err);
                                else {
                                    resolve(true);
                                }
                            }
                        );
                    } else {
                        answerLikes = result1[0].answerLikes;
                        sql = `update likes set answerLikes=? where userId=? and campusId=? and answerId=?;`;
                        connection.query(
                            sql,
                            [!answerLikes, userId, campusId, id],
                            (err, result) => {
                                if (err) console.log(err);
                                else {
                                    resolve(true);
                                }
                            }
                        );
                    }
                }
            );
        }
    });
};

exports.likesCount = (type, id) => {
    return new Promise((resolve, reject) => {
        if (type === "query") {
            let sql = `select * from likes where queryId=? and queryLikes=true;`;
            connection.query(sql, [id], (err, result) => {
                if (err) console.log(err);
                else {
                    resolve(result);
                }
            });
        } else if (type === "answer") {
            let sql = `select * from likes where answerId=? and answerLikes=true;`;
            connection.query(sql, [id], (err, result) => {
                if (err) console.log(err);
                else {
                    resolve(result);
                }
            });
        }
    });
};

exports.postAnswer = (userId, campusId, queryId, reply) => {
    let sql = `insert into answers values(?,?,?,?,?,?,?)`;
    let answerId = uuid();
    var dateTime = getTime();
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            [userId, campusId, queryId, answerId, reply, false, dateTime],
            (err, result) => {
                if (err) console.log(err);
                else {
                    resolve(true);
                }
            }
        );
    });
};

exports.getQueries = (userId, campusId) => {
    let sql = `select * from queries where userId!=? and campusId=?;`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [userId, campusId], async (err, result) => {
            if (err) console.log(err);
            else if (result.length === 0) {
                resolve([]);
            } else {
                let queries = [];
                for (let i = 0; i < result.length; i++) {
                    let queryLikesCount = await this.likesCount(
                        "query",
                        result[i].queryId
                    );
                    let userLikeStatus;

                    for (let k = 0; k < queryLikesCount.length; k++) {
                        if (userId === queryLikesCount[k].userId) {
                            userLikeStatus = queryLikesCount[k].queryLikes;
                            break;
                        }
                    }

                    let answerCount = await this.getQueryAnswers(userId,userId,
                        result[i].queryId
                    );
                    let query = {
                        username: await this.getUsername(result[i].userId),
                        campusId: result[i].campusId,
                        queryId: result[i].queryId,
                        query: result[i].query,
                        likeCount: queryLikesCount.length,
                        userLikeStatus:userLikeStatus,
                        answerCount: answerCount.length,
                        date: result[i].dateCreated,
                    };
                    queries.push(query);
                }
                resolve(queries);
            }
        });
    });
};

exports.getFriends = (username, campusId) => {
    let sql = `select * from userAccount where  username!=? and campusId like '%${campusId}%'`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, campusId], (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};

exports.sendMessage = (username, campusId, friendUsername, message, depressedPortal) => {
    let chatId = uuid();
    var dateTime = getTime();
    let isAnonymous = false;
    if (depressedPortal === "true")
        isAnonymous = true;
    let sql = `insert into chat values(?,?,?,?,?,?,?,?);`;

    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            [
                chatId,
                username,
                friendUsername,
                campusId,
                message,
                false,
                isAnonymous,
                dateTime,
            ],
            (err, result) => {
                if (err) console.log(err);
                else {
                    resolve("success");
                }
            }
        );
    });
};

exports.chatDetails = (username, campusId, friendUsername, depressedPortal) => {
    var isAnonymous = false;
    if (depressedPortal === "true")
        isAnonymous = true;
    let sql = `select * from chat where sender=? and reciever=? and campusId=? and isAnonymous=? or sender=? and reciever=? and campusId=? and isAnonymous=? order by dateCreated;`;
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            [
                username,
                friendUsername,
                campusId,
                isAnonymous,
                friendUsername,
                username,
                campusId,
                isAnonymous
            ],
            (err, result) => {
                if (err) console.log(err);
                else {
                    resolve(result);
                }
            }
        );
    });
};
