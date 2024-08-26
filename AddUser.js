// addUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/UsersModel');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to MongoDB');

    // Check if the user already exists
    const existingUser = await User.findOne({ username: 'anu' });
    if (existingUser) {
        console.log('User already exists');
        mongoose.connection.close();
        return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('anu1234', salt);

    // Create a new user
    const user = new User({
        username: 'anu',
        password: hashedPassword,
    });

    await user.save();
    console.log('User added successfully');
    mongoose.connection.close();
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
