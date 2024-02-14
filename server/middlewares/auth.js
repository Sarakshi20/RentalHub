const {getUser} = require('../service/auth');

async function restrictToLoggedInUser(req,res,next){
    try{
        const userToken = req.headers['authorization'];
        if(!userToken){
            return res.status(401).json({message:"You are not logged in!"});
        }

        const token = userToken.split(' ')[1];
        const user = getUser(token);
        if(!user){
            return res.status(401).json({message:"Token invalid!"});
        }
        req.user = user;
        next();
    }catch{
        res.status(500).json({message: "Error verifying user."});
    }
}

module.exports = restrictToLoggedInUser;