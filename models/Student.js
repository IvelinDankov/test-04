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

/////////////////////
// creating virtual
////////////////////
studentSchema.virtual('domain').get(function() {
    return this.email.slice(this.email.indexOf('@') + 1);
});

studentSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
})

studentSchema.method('info', function (text) {
    return `${text},<br> Name: ${this.fullName},<br> Age: ${this.age},<br> Email: ${this.email},<br> Domain: ${this.domain}`
});

const Student = model('Student', studentSchema);

export default Student;