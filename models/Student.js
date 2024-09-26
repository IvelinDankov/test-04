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

studentSchema.method('info', function (text) {
    return `${text}, I'm ${this.firstName} ${this.lastName} and I am ${this.age} years old, my email address is ${this.email}. Fill free to contact me. `
});

const Student = model('Student', studentSchema);

export default Student;