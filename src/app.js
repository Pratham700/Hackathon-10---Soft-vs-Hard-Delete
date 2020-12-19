const express = require("express");
const Student = require("./models/Student");

const app = express();

// middleware
app.use(express.json());

// Routes

// Get all the students
app.get("/students", async (req, res) => {
  // write your codes here
  try {
    const allStudents = await Student.find({});
    res.status(200).json(allStudents);
  } catch (error) {
    res.statusCode(404);
  }
});

// Add student to database
app.post("/students", async (req, res) => {
  // write your codes here
  try {
    const newStudents = new Student(req.body);

    const savingStudents = await newStudents.save();

    res.status(200).send(savingStudents);
  } catch (error) {
    res.statusCode(404);
  }
});

// Get specific student
app.get("/students/:id", async (req, res) => {
  // write your codes here
  try {
    const _id = req.params.id;
    const specificStudents = await Student.findById(_id);
    res.status(200).json(specificStudents);
  } catch (error) {
    res.statusCode(404);
  }
});

// delete specific student
app.delete("/students/:id", async (req, res) => {
  // write your codes
  if (req.query.type.toLowerCase() === "soft") {
    await Student.updateOne({ _id: req.params.id }, { isDeleted: true });
  } else if (req.query.type.toLowerCase() === "hard") {
    await Student.deleteOne({ _id: req.params.id });
  }
  res.sendStatus(200);
});

module.exports = app;
