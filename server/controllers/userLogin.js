const {User} = require('../models/database');
const {
    setUser
} = require('../service/auth');
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.find({
            email: email
        });

        if (user.length == 0) {
            return res.status(201).send(
                {
                    error: "Invalid Email."
                }
            );
        }

        const matchPassword = await bcrypt.compare(password, user[0].password);
        if (!matchPassword) {
            return res.status(201).send({
                error: "Invalid Password."
            });
        }

        const token = setUser(user[0]);
        return res.status(200).send(token);
    } catch {
        return res.status(500).send();
    }
}

module.exports = loginUser;