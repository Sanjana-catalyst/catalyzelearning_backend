const Course = require('../models/CoursesModel');
const XLSX = require('xlsx');
const addCourse = async (req, res) => {
    try {
        // Read the Excel file
        const workbook = XLSX.readFile('C:/Users/komal/Desktop/Excel_Into_Mongo.xlsx');
   // Get the first sheet name
   const sheetName = workbook.SheetNames[0];
    
   // Convert the sheet data to JSON
   const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

   // Initialize arrays to collect data
   const weeks = [];
   const meetLinks = [];
   const allTopics = [];

   // Prepare data for insertion as a single document
   sheetData.forEach((row) => {
     // Collect weeks and meet links
     weeks.push(row.Weeks);
     meetLinks.push(row.Meet);

     // Process topics
     const topicsArray = row.Topic.split('|').map((topic, topicIndex) => {
       // Process SubTopics for each topic
       const subTopicsArray = row.SubTopics.split('|').map((dayData, dayIndex, array) => {
         // Check if it is the last day
         const dayLabel = dayIndex === array.length - 1 ? 'Revision Day' : `Day-${dayIndex + 1}`;

         return {
           day: dayLabel,  // Dynamically create Day-1, Day-2, etc., and Revision Day for the last day
           topics: dayData.split(',').map(subTopic => subTopic.trim()),  // Split by "," to get individual subtopics
         };
       });

       return {
         name: topic.trim(),
         subTopics: subTopicsArray,
       };
     });

     // Add topics for the week
     allTopics.push(...topicsArray);
   });

   // Create a single document for insertion
   const courseDocument = new Course({
     courseName: "Front End Program", // Fixed value for courseName
     weeks,
     meetLinks,
     topics: allTopics,
   });

   // Insert the single course document into MongoDB
   await courseDocument.save();
   console.log('Courses inserted successfully as a single document!');
   return res.status(200).json({ success: true, message: 'Courses inserted successfully!' });

 } catch (error) {
   console.error('Error inserting courses from Excel:', error.message);
   return res.status(500).json({ success: false, message: 'Error inserting courses from Excel' });

 }
 
}

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({courseName: req.body.courseName});
        return res.status(200).json({ success: true, course : course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {addCourse,getAllCourses,getCourse}