// controllers/authController.js
const User = require('../models/UsersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const XLSX = require('xlsx');


exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log({username,password})
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.createUser = async (req,res) => {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile('C:/Users/komal/Desktop/Excel_Into_Mongo.xlsx');
   // Get the first sheet name
   const sheetName = workbook.SheetNames[0];
    
   // Convert the sheet data to JSON
   const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const exists = await User.find({  });
  console.log(exists)
   // Iterate over each entry and hash the password
   const users = await Promise.all(sheetData.map(async (row) => {
     // Check if user already exists
     const existingUser = await User.findOne({ username: row.Username });
     if (existingUser) {
       console.log(`User with username ${row.Username} already exists. Skipping...`);
       return null; // Skip this user
     }

     // Hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(row.Password, salt);

     // Return the formatted user object
     return {
       username: row.Username,
       password: hashedPassword,
       name : row.Name
     };
   }));

   // Filter out any null values (skipped users)
   const filteredUsers = users.filter(user => user !== null);

   // Insert the users into MongoDB
   if (filteredUsers.length > 0) {
     await User.insertMany(filteredUsers);
     console.log('Users inserted successfully!');
   } else {
     console.log('No new users to insert.');
   }
   return res.status(200).json({ success: true, message: 'Users inserted successfully.' });
 } catch (error) {
   console.error('Error inserting users from Excel:', error.message);
 }
};