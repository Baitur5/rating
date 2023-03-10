
const mongoose = require("mongoose");

const feedbackForm = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    comment: {
        type: String,
    },
    assess: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    teachingComplexity: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    examComplexity: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    learning: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    politeness: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    funDuringLessons: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    wouldHireAgain: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    usedTextbooks: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    paysAttentionToAttendance: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    explainsTopicClearly: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    isStrictWithStudents: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    }
})


const teacherForm = new mongoose.Schema({
    fname: { type: String, min: 3, max: 100, required: true },
    lname: { type: String, min: 3, max: 100, required: true },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    feedbacks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'teacherFeedback', required: true },
    ],
});

teacherForm.pre("remove", async function(next) {
    try {
        await mongoose
            .model("teacherFeedback")
            .deleteMany({ teacher: this._id });

        next();
    }
    catch (err) {
        next(err);
    }
});



const Teacher = mongoose.model("Teacher", teacherForm);
const teacherFeedback = mongoose.model("teacherFeedback", feedbackForm);

module.exports = { Teacher, teacherFeedback }

//Usage:
// Create a new comment
// const comment = new Comment({
//   author: user._id,
//   content: 'This teacher is great!',
// });

// Create a new teacher and add the comment to their comments array
// const teacher = new Teacher({
//   name: 'Ms. Smith',
//   comments: [
//     {
//       author: user._id,
//       comment: comment._id,
//     },
//   ],
// });
//await comment.save();
// await teacher.save();
