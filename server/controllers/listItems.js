const {User} = require('../models/database');

async function addListItem(req, res) {
    try {
        let userData = await req.body;
        const userId = req.user._id;
        const user = await User.find({ _id: userId });
        user[0].ItemsListed.push(userData);
        await user[0].save();
        return res.status(201).send(user[0]);
    }
    catch {
        return res.status(500).json({ msg: "Server error" })
    }
}

module.exports = addListItem;