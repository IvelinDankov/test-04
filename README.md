#### This are my steps

1. Install package json file.
2. Create .gitignore and readme.md files.
3. Installing packages express mongoose and nodemon.
4. Setting package json file and type to be modular.
5. Start set mongoose db in index.js.
6. Set express server and mongoose.
7. Make folder models and inside Student.js, import mongoose and make Student Schema and after that model and export this Student.
8. Get students from db.
9. Create student and send to db.
- to create make html field with submit button.
- to send it to db make post request and send it with create make express to use urlencoded and encoded to me false. This is needed to accept data and send it to db for bodies. Created some names with First Name, Last Name, Age, E-mail.
10. Update or Edit.
 - get one student with findById and req.params.studentId 
 - take all input fields and create values and put inside student.values. 
 - make post request. 

11. Delete.
    just find student by id and delete him. 

##### Methods
> Now creating method in Student.js file. 
> 
> [] Take studentSchema and write method 1. Schema and then method.
> [] Inside write string as method and make not arrow function. then return result. 
> [] Put method name in single id Student.

###### Virtual. 
- Take Schema write virtual and make for example. 
```
Schema.virtual('fullName').get(function(){
    return `${firstName} ${lastName}`
})
```

##### Queries.
1. Go to all students and make if statement. 
