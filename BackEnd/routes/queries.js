const sqlFunctions = require('../files/sqlFunctions')

class Queries {
    constructor(app) {
        this.postQueries(app);
        this.getMyQueries(app);
        this.getQueries(app);
        this.postAnswer(app);
        this.getQueryAnswers(app);
        this.deleteQuery(app);
        this.deleteAnswer(app);
        this.likeCount(app);
    }

    postQueries(app) {
        app.get('/postQuery', async (req, res) => {
            let { username, campusId, queries, tags } = req.query
            let userId = await sqlFunctions.getUserId(username);
            let hashTags="";
            for (let i = 0; i < tags.length; i++)
                hashTags = hashTags + "#" + JSON.parse(tags[i]).id + " ";
            await sqlFunctions.postQueries(userId, campusId, queries, hashTags)
            res.send()
        })
    }

    getMyQueries(app) {
        app.get('/getMyQueries', async (req, res) => {
            let { username, campusId } = req.query;
            let userId = await sqlFunctions.getUserId(username);
            let myQueries = await sqlFunctions.getMyQueries(userId, campusId)
            res.send(myQueries)
        })
    }

    getQueries(app) {
        app.get('/getQueries', async (req, res) => {
            let { username, campusId } = req.query;
            let userId = await sqlFunctions.getUserId(username);
            let queries = await sqlFunctions.getQueries(userId, campusId);
            res.send(queries)
        })
    }

    postAnswer(app) {
        app.get('/postAnswer', async (req, res) => {
            let { username, campusId, queryId, reply } = req.query;
            let userId = await sqlFunctions.getUserId(username);
            sqlFunctions.postAnswer(userId, campusId, queryId, reply);
            res.send();
        })
    }

    getQueryAnswers(app) {
        app.get('/getQueryAnswers', async (req, res) => {
            let { queryId, username } = req.query;
            let userId = await sqlFunctions.getUserId(username);
            let queryAnswers = await sqlFunctions.getQueryAnswers(userId,queryId);
            console.log(queryAnswers);
            res.send(queryAnswers);
        })
    }

    deleteQuery(app) {
        app.get('/deleteQuery', async (req, res) => {
            let { queryId } = req.query
            sqlFunctions.deleteQuery(queryId)
            res.send()
        })
    }

    deleteAnswer(app) {
        app.get('/deleteAnswer', async (req, res) => {
            let { answerId } = req.query
            sqlFunctions.deleteAnswer(answerId)
            res.send()
        })
    }

    likeCount(app) {
        app.get('/likeCount', async (req, res) => {
            let { username, campusId, type, id } = req.query
            let userId = await sqlFunctions.getUserId(username);
            sqlFunctions.likeCount(userId, campusId, type, id);
            res.send()
        })
    }
}




module.exports = Queries;



