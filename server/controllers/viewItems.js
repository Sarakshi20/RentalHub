const {User} = require('../models/database');

async function ViewItems(req,res){
    try{
        let userId = req.user._id;
        if(!userId) return res.status(401).send(false);
        let Useritems = await User.findById(userId,'ItemsListed');
        const items = Useritems.ItemsListed;
        res.status(200).send({"items": items});
    }catch{
        res.status(500).json({msg:"Internal Server Error"});
    }
}

module.exports = ViewItems