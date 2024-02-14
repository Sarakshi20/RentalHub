const {User} = require('../models/database');
const bcrypt = require('bcrypt');
const {setUser} = require('../service/auth');

async function registerUser(req,res){
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    try{
        let user = {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        };
        const check = await checkEmail(user.email);
        if (!check) return res.status(200).send(false);
        const newUser = await User.create(user);
        const token = setUser(newUser);
        return res.status(200).send(token);
    }catch{
        res.status(500).send();
    }
}

async function checkEmail(email){
    if(await User.findOne({email: email}) === null){
        return true;
    }
    return false;
}

module.exports = {
    registerUser,
};