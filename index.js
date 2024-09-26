import mongoose from "mongoose";
import express from "express";
import Student from "./models/Student.js";

const app = express();

try {
  mongoose.connect("mongodb://localhost:27017/students");
  console.log("Connected to DB..");
} catch (error) {
  console.log("NOT connected yet!!!");
  console.log(error.message);
}

app.get('/', (req, res) => {
   res.send('Welcome Express.js you have connection')
});

///////////////////////
// GET ALL STUDENTS
//////////////////////
app.get('/students', async(req, res) => {
   const students = await Student.find();
   res.send(students)
});

///////////////////////
// CREATE -> STUDENT
//////////////////////

app.listen(5001, () => `Server is working on localhost 5001`);
