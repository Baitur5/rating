
const mongoose = require("mongoose");


const departmentForm = new mongoose.Schema({
    name: { type: String, min: 2, max: 100, required: true },
    // university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
    // teachers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Teacher'
    // }],
});

const Department = mongoose.model('Department', departmentForm);


module.exports = {
    Department
}
