
const mongoose = require("mongoose");


const feedbackForm = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    comment: {
        type: String,
    },
    reputation: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    location: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    capabilities: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    internet: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    food: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    security: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    environment: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    facilityComplexity: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    convenience: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    commonAreas: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    library: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})


const universityForm = new mongoose.Schema({
    name: { type: String, min: 2, max: 100, required: true },
    // teachers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Teacher'
    // }],
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }],
    feedbacks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'universityFeedback', required: true },
    ],
});

universityForm.pre("remove", async function(next) {
    try {
        // Remove all departments and their associated teachers and teacher feedbacks
        const departments = await mongoose.model("Department").find({
            university: this._id,
        });

        for (let department of departments) {
            const teachers = await mongoose
                .model("Teacher")
                .find({ department: department._id });

            for (let teacher of teachers) {
                await mongoose
                    .model("teacherFeedback")
                    .deleteMany({ teacher: teacher._id });
            }

            await mongoose.model("Teacher").deleteMany({ department: department._id });
            await mongoose.model("Department").findByIdAndRemove(department._id);
        }

        // Remove all university feedbacks
        await mongoose
            .model("universityFeedback")
            .deleteMany({ _id: { $in: this.feedbacks } });

        next();
    } catch (err) {
        next(err);
    }
});

const University = mongoose.model("University", universityForm);
const universityFeedback = mongoose.model("universityFeedback", feedbackForm);

module.exports = {
    University,
    universityFeedback
}
