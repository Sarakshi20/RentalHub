const {User} = require("../models/database");

async function sendProfileData(req,res){
    try{
        let user = await User.findById(req.user._id);
        if(!user) return res.status(401).send({message: "User not found"});
        res.send({username :user.username,email : user.email});
    }catch{
        res.status(500).send({message: "server error"});
    }
}

module.exports = sendProfileData;