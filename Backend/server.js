const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://uday:Uday62k@erp.ajwggvx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  identifier: String,
  profilePhoto: String,
  cgpa: Number,
  staffCount: Number,
  totalAttendance: Number,
  announcement: String,
  attendance: [{
    subject: String,
    code: String,
    attended: Number,
    total: Number,
    percentage: Number
  }],
  cgpaHistory: [Number],
  schedule: {
    days: [String],
    timeSlots: [{
      time: String,
      subjects: [String]
    }]
  },
  subjects: [{
    name: String,
    subjectName: String,
    code: String,
    regulation: String,
    semester: Number
  }],
  contact: {
    phone: String,
    email: String,
    website: String
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    youtube: String,
    instagram: String
  }
});

const Student = mongoose.model('Student', studentSchema);

// Insert Sample Data
async function insertSampleData() {
  try {
    const sampleData = {
      name: "UDAY KIRAN K",
      identifier: "2116221701059",
      profilePhoto: "/src/profile-photo/profile-photo.jpg",
      cgpa: 9.99,
      staffCount: 15,
      totalAttendance: 90,
      announcement: "Semester Exams from Dec 15",
      attendance: [
        { subject: "FOAI - CD1960", code: "CD1960", attended: 11, total: 11, percentage: 100 },
        { subject: "GDD - CD19641", code: "CD19641", attended: 10, total: 11, percentage: 90.9 },
        { subject: "DV - CD19642", code: "CD19642", attended: 10, total: 11, percentage: 90.9 },
        { subject: "WE - CD19643", code: "CD19643", attended: 10, total: 11, percentage: 90.9 },
        { subject: "MP - CD19651", code: "CD19651", attended: 10, total: 11, percentage: 90.9 }
      ],
      cgpaHistory: [4, 5.2, 6.3, 7.1, 6.5, 7.2, 7.9, 8.5],
      schedule: {
        days: ["Tue", "Wed", "Thru", "Fri", "Sat"],
        timeSlots: [
          { time: "8:00 AM - 9.00 AM", subjects: ["FOAI", "GDD", "DV", "WE", "MP"] },
          { time: "9:00 AM - 9:50 AM", subjects: ["GDD Lab", "FOAI Lab", "MP Lab", "DV Lab", "WE Lab"] },
          { time: "10:10 AM - 11:00 AM", subjects: ["MP", "FOAI", "GDD", "DV", "WE"] },
          { time: "11:00 AM - 11:50 AM", subjects: ["WE", "MP", "FOAI", "GDD", "DV"] },
          { time: "12:30 PM - 1:20 PM", subjects: ["Lunch", "Lunch", "Lunch", "Lunch", "Lunch"] },
          { time: "1:20 PM - 2:10 PM", subjects: ["DV", "WE", "MP", "FOAI", "GDD"] },
          { time: "2:10 PM - 3:00 PM", subjects: ["Tutorial", "Tutorial", "Tutorial", "Tutorial", "Tutorial"] }
        ]
      },
      subjects: [
        { name: "Umamaheswararao S", subjectName: "Game Design and Development", code: "CD19641", regulation: "2019", semester: 6 },
        { name: "Preethi E", subjectName: "Fundamental of Artificial Intelligence", code: "CS3452", regulation: "2019", semester: 6 },
        { name: "Thirumalairajan G", subjectName: "Web Essentials", code: "CS3452", regulation: "2019", semester: 6 },
        { name: "Gunasekar S", subjectName: "Data Visualization", code: "CS3452", regulation: "2019", semester: 6 }
      ],
      contact: {
        phone: "91-44-68181020",
        email: "admin@rajalakshmi.edu.in",
        website: "www.rajalakshmi.org"
      },
      socialMedia: {
        facebook: "/src/logo/facebook.svg",
        twitter: "/src/logo/twitter-circle.svg",
        youtube: "/src/logo/youtube-with-circle.svg",
        instagram: "/src/logo/instagram-with-circle.svg"
      }
    };

    const existingStudent = await Student.findOne({ identifier: sampleData.identifier });
    if (!existingStudent) {
      await Student.create(sampleData);
      console.log("Sample data inserted successfully");
    }
  } catch (err) {
    console.error("Error inserting sample data:", err);
  }
}

// API Endpoints
app.get('/api/student/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ identifier: req.params.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Initialize and Start Server
async function startServer() {
  await insertSampleData();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();