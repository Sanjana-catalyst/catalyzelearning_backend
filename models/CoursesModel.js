// models/Course.js
const mongoose = require('mongoose');

const SubTopicSchema = new mongoose.Schema({
  day: String,
  topics: [String],
});

const TopicSchema = new mongoose.Schema({
  name: String,
  subTopics: [SubTopicSchema],
});

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  weeks: [String],
  meetLinks: [String],
  topics: [TopicSchema],
});

module.exports = mongoose.model('Course', CourseSchema);
