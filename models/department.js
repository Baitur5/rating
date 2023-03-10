
const mongoose = require("mongoose");


const departmentForm = new mongoose.Schema({
    name: { type: String, min: 2, max: 100, required: true },

    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    // university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
});


departmentForm.pre("remove", async function(next) {
    try {
        const teachers = await mongoose
            .model("Teacher")
            .find({ department: this._id });

        for (let teacher of teachers) {
            await mongoose
                .model("teacherFeedback")
                .deleteMany({ teacher: teacher._id });

            await mongoose.model("Teacher").deleteMany({ department: this._id });
        }

        next();
    } catch (err) {
        next(err);
    }
});


const Department = mongoose.model('Department', departmentForm);


module.exports = {
    Department
}
