const mongoose = require('mongoose');
const User = require('./models/UsersModel');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Check if the user already exists
    const existingUser = await User.findOne({ username: 'newuser' });
    if (existingUser) {
      console.log('User already exists:', existingUser.username);
    } else {
      // Create a new test user
      const testUser = new User({
        username: 'newuser',
        password: 'password1234', // This will be hashed automatically
      });

      await testUser.save();
      console.log('Test user created');
    }

    mongoose.connection.close();
  })
  .catch(err => console.log(err));
