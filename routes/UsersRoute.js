const express = require('express');
const { loginUser, createUser } = require('../controllers/UsersController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/create', createUser);

module.exports = router;
