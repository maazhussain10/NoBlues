
const { json } = require('body-parser');
const sqlFunctions = require('../files/sqlFunctions')
const md5 = require('md5')

class GetCampusDetails {
    constructor(app) {
        this.registerCampus(app);
        this.getCampusDetails(app);
        this.getFriends(app);
    }

    registerCampus(app){
        app.post('/registerCampus',async(req,res)=>{
            let {campusName,campusType,planType,noOfPersons,campusEmail,campusLogo,campusPassword} = req.query;
            console.log(campusName, campusType,planType,noOfPersons,campusEmail,campusLogo,campusPassword);

            let registerCampusDetails = await sqlFunctions.registerCampusDetails(campusName,campusType,planType,noOfPersons,campusEmail,campusLogo,md5(campusPassword));
            console.log(registerCampusDetails)
        })
    }

    getCampusDetails(app) {
        app.get('/getCampusDetails', async (req, res) => {
            let { username } = req.query
            let getCampusDetails = await sqlFunctions.getCampusDetails(username)

            let campusQKeys = getCampusDetails[0].campusId.split("|");

            let campusInfo = [];
            for(let i=0;i<campusQKeys.length;i++){
                let tempCampusInfo= await sqlFunctions.getCampus(campusQKeys[i]);
                campusInfo.push(tempCampusInfo[0]);
            }
            res.send(campusInfo);
        })
    }

    getFriends(app) {
        app.get('/getfriends', async (req, res) => {
            let { username, campusId } = req.query;
            let getFriends = await sqlFunctions.getFriends(username, campusId);
            res.send(getFriends)
        })
    }
}

module.exports = GetCampusDetails;



