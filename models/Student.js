import mongoose, { model, Schema } from "mongoose";

const studentSchema = new Schema({
    firstName: {  
        type: String,  
        required: true,  
    },  
    lastName: {  
        type: String,  
        required: true,  
    },  
    age: {  
        type: Number,  
        required: true,  
    },  
    email: {  
        type: String,  
        required: true,  
        unique: true,  
    } 
});

const Student = model('Student', studentSchema);

export default Student;