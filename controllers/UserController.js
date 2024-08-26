const User = require('../models/UsersModel');

const createUser = async (req, res) => {    
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    createUser
}