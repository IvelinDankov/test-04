import mongoose from "mongoose";
import express from "express";
import Student from "./models/Student.js";

const app = express();
app.use(express.urlencoded({encoded: false}));

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
app.get('/students/create', (req, res) => {
   res.send(`
    <h5>Create student in db</h5>
    <fieldset>
      <legend>Create</legend>
      <form method="post">
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="number" name="age" placeholder="Age" />
        <input type="email" name="email" placeholder="E-mail" />
        <input type="submit" value="create" />
      </form>
    </fieldset>
    `)
});

app.post('/students/create', async(req, res) => {
   const student = await Student.create(req.body);
});

app.listen(5001, () => `Server is working on localhost 5001`);
