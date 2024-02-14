const {User} = require('../models/database');

async function Items(req,res){
    try{
        const Useritems = await User.find().select({ ItemsListed: 1, _id: 0 });
        res.status(200).send({"items":Useritems});
    }catch{
        res.status(500).json({msg:"Internal Server Error"});
    }
}

module.exports = Items