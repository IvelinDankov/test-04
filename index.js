import mongoose, { get } from "mongoose";
import express from "express";
import Student from "./models/Student.js";
import { engine } from "express-handlebars";

const app = express();
app.use(express.urlencoded({ encoding: false }));
app.use(express.static("static"));

app.engine("hbs", engine({
  extname: 'hbs'
}));
app.set("view engine", "hbs");
app.set("views", "./views");

try {
  mongoose.connect("mongodb://localhost:27017/students");
  console.log("Connected to DB.."); 
} catch (error) {
  console.log("NOT connected yet!!!");
  console.log(error.message);
}

app.get("/", (req, res) => {
  res.send("Welcome Express.js you have connection");
});

///////////////////////
// GET ALL STUDENTS
//////////////////////
app.get("/students", async (req, res) => {
  const students = Student.find();

  const arrOfStudents = Object.entries(students);

  if (req.query.minAge) {
    students.find({ age: { $gt: req.query.minAge } });
  }

  let sorted = await students.lean();

  res.render("home", { sorted });
});

///////////////////////
// CREATE -> STUDENT
//////////////////////
app.get("/students/create", async (req, res) => {
  res.render("create");
});

app.post("/students/create", async (req, res) => {
  req.body.age = await calcAge(req.body.born);
  let student = await Student.create(req.body);

  res.redirect("/students");
});

///////////////////////
// EDIT -> STUDENT
//////////////////////

app.get("/students/:studentId/edit", async (req, res) => {
  const student = await Student.findById(req.params.studentId).lean();
  res.render("edit", { student });
});

app.post("/students/:studentId/edit", async (req, res) => {
  req.body.age = await calcAge(req.body.born);
  await Student.findByIdAndUpdate(req.params.studentId, req.body);
  res.redirect("/students");
});

///////////////////////
// DELETE -> STUDENT
//////////////////////

app.get("/students/:studentId/delete", async (req, res) => {
  await Student.findByIdAndDelete(req.params.studentId);
  res.redirect("/students");
});

///////////////////////
// GET ONE -> STUDENT
//////////////////////

app.get("/students/:studentId", async (req, res) => {
  let student = await Student.findById(req.params.studentId).lean();

  const yearBorn = calcAge(student.born);
  student.age = yearBorn;

  res.render("one", { student });
});

app.listen(5001, () => `Server is working on localhost 5001`);

function calcAge(bornYear) {
  let today = new Date();
  let year = today.getFullYear();
  return year - bornYear;
}
