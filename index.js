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
        <br>
        <input type="text" name="lastName" placeholder="Last Name" />
        <br>
        <input type="number" name="age" placeholder="Age" />
        <br>
        <input type="email" name="email" placeholder="E-mail" />
        <input type="submit" value="create" />
      </form>
    </fieldset>
    `)
});

app.post('/students/create', async(req, res) => {
   const student = await Student.create(req.body);
   res.redirect('/students')
});

///////////////////////
// EDIT -> STUDENT
//////////////////////

app.get('/students/:studentId/edit', async(req, res) => {
   const student = await Student.findById(req.params.studentId);
   res.send(`
    <h5>Create student in db</h5>
    <fieldset>
      <legend>Create</legend>
      <form method="post">
        <input type="text" name="firstName" placeholder="First Name" value="${student.firstName}"/>
        <br>
        <input type="text" name="lastName" placeholder="Last Name" value="${student.lastName}"/>
        <br>
        <input type="number" name="age" placeholder="Age" value="${student.age}"/>
        <br>
        <input type="email" name="email" placeholder="E-mail" value="${student.email}"/>
        <input type="submit" value="edit" />
      </form>
    </fieldset>
    `)

});

app.post('/students/:studentId/edit', async(req, res) => {
   await Student.findByIdAndUpdate(req.params.studentId, req.body);
   res.redirect('/students')
});

app.listen(5001, () => `Server is working on localhost 5001`);
