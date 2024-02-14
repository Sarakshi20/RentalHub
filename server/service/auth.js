require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email 
    }, secretKey); // user will be sent as payload in the header
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secretKey);
    }catch{
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}