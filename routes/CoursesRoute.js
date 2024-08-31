const express = require('express');
const {addCourse, getCourse} = require('../controllers/CoursesController');
const router = express.Router();

router.post('/addcourse', addCourse);
router.post('/getcourse',getCourse);

module.exports = router;
