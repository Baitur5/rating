const { Teacher, teacherFeedback } = require("./teacher")
const { University, universityFeedback } = require("./university")
const { Department } = require("./department")




const newDepartment = new Department({
    name: "Computer Science",
    teachers: []
});
const secondDep = new Department({
    name: "Marketing",
    teachers: []
});

const newUniversity = new University({
    name: "Alatoo",
    teachers: [],
    departments: [newDepartment._id, secondDep._id],
    feedbacks: []
});

const newTeacher = new Teacher({
    fname: "John",
    lname: "Doe",
    department: newDepartment._id, // the _id of an existing department
    university: newUniversity._id, // the _id of an existing university
    feedbacks: []
});


async function hello() {

    newDepartment.save();
    secondDep.save();
    await newUniversity.save();
    await newTeacher.save();
    // find a teacher by name and populate their department and university
    const teacher = await Teacher.findOne({ fname: "John", lname: "Doe" })
        .populate({ path: "department", select: "name -_id" })
        .populate({ path: "university", select: "name -_id" });
    console.log(teacher)
}

require("dotenv").config();
const mongoose = require("mongoose");
const connect = mongoose.connect;
const dbURL = process.env.DB_URL;
console.log(dbURL)

connect(
    dbURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => {
    hello()
})
