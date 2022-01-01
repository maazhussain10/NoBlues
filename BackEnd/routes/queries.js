
const { json } = require('body-parser');
const { listenerCount } = require('../files/dbconnection');
const sqlFunctions = require('../files/sqlFunctions')
class Queries {
    constructor(app) {
        this.postQueries(app);
        this.getMyQueries(app);
        this.deleteQuery(app);
        this.getQueryAnswers(app);
        this.queryReply(app);
        this.getQueries(app);

    }
    postQueries(app) {
        app.get('/postquery', async (req, res) => {
            let { username, CampusName, queries, hashtag } = req.query
            sqlFunctions.postQueries(username, CampusName, queries, hashtag)
            res.send()
        })
    }

    getMyQueries(app) {
        app.get('/getmyqueries', async (req, res) => {
            let { username, CampusName } = req.query
            let MyQueries = await sqlFunctions.getMyQueries(username, CampusName)
            res.send(MyQueries)
        })
    }

    getQueries(app) {
        app.get('/getqueries', async (req, res) => {
            let { username, CampusName } = req.query
            let Queries = await sqlFunctions.getQueries(username, CampusName)
            res.send(Queries)
        })
    }

    deleteQuery(app) {
        app.get('/deletequery', async (req, res) => {
            let { queryId } = req.query
            sqlFunctions.deleteQuery(queryId)
            res.send()
        })
    }

    getQueryAnswers(app) {
        app.get('/getqueryanswers', async (req, res) => {
            let { queryId } = req.query
            let QueryAnswers = await sqlFunctions.getQueryAnswers(queryId)
            res.send(QueryAnswers)
        })
    }

    queryReply(app) {
        app.get('/queryreply', async (req, res) => {
            let { username, CampusName, queryId, reply } = req.query
            sqlFunctions.queryReply(username, CampusName, queryId, reply)
            res.send()
        })
    }
}




module.exports = Queries;



