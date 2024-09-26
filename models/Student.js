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
    return `<table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Age</td>
                <td>Email</td>
                <td>Domain</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${this.fullName}</td>
                <td>${this.age}</td>
                <td>${this.email}</td>
                <td>${this.Domain}</td>
            </tr>
        </tbody>
    </table>`
});

const Student = model('Student', studentSchema);

export default Student;