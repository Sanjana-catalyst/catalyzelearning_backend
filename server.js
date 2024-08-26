const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const {createUser} = require('./controllers/UserController');

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/create", createUser);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
    console.log('Connected to MongoDB');

    // Require the User model
    require('./models/UsersModel');
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
