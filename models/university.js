
const mongoose = require("mongoose");


const feedbackForm = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: {
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
        {
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            comment: { type: mongoose.Schema.Types.ObjectId, ref: 'universityFeedback', required: true },
        },
    ],
});


const University = mongoose.model("University", universityForm);
const universityFeedback = mongoose.model("universityFeedback", feedbackForm);

module.exports = {
    University,
    universityFeedback
}
