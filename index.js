import mongoose from "mongoose";
import express from "express";

const app = express();

try {
  mongoose.connect("mongodb://localhost:27017/testdb");
  console.log("Connected to DB..");
} catch (error) {
  console.log("NOT connected yet!!!");
  console.log(error.message);
}

app.get('/', (req, res) => {
   res.send('Welcome Express.js you have connection')
});

app.listen(5001, () => `Server is working on localhost 5001`);
