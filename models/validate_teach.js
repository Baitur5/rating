

const Joi = require("joi");


const postTeacherSchema = Joi.object({
    teachers: Joi.array().items(Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
    })).required(),
})

const postTeacherFeedbackSchema = Joi.object({
    comment: Joi.string(),
    assess: Joi.number().required().min(1).max(5),
    teachingComplexity: Joi.number().required().min(1).max(5),
    examComplexity: Joi.number().required().min(1).max(5),
    learning: Joi.number().required().min(1).max(5),
    politeness: Joi.number().required().min(1).max(5),
    funDuringLessons: Joi.number().required().min(1).max(5),
    wouldHireAgain: Joi.string().valid('yes', 'no').required(),
    usedTextbooks: Joi.string().valid('yes', 'no').required(),
    paysAttentionToAttendance: Joi.string().valid('yes', 'no').required(),
    explainsTopicClearly: Joi.string().valid('yes', 'no').required(),
    isStrictWithStudents: Joi.string().valid('yes', 'no').required(),
});

const putTeacherFeedbackSchema = Joi.object({
    comment: Joi.string(),
    assess: Joi.number().min(1).max(5),
    teachingComplexity: Joi.number().min(1).max(5),
    examComplexity: Joi.number().min(1).max(5),
    learning: Joi.number().min(1).max(5),
    politeness: Joi.number().min(1).max(5),
    funDuringLessons: Joi.number().min(1).max(5),
    wouldHireAgain: Joi.string().valid('yes', 'no'),
    usedTextbooks: Joi.string().valid('yes', 'no'),
    paysAttentionToAttendance: Joi.string().valid('yes', 'no'),
    explainsTopicClearly: Joi.string().valid('yes', 'no'),
    isStrictWithStudents: Joi.string().valid('yes', 'no'),
});

const putTeacherSchema = Joi.object({
    fname: Joi.string().min(3),
    lname: Joi.string().min(3),
})

module.exports = {
    postTeacherSchema,
    postTeacherFeedbackSchema,
    putTeacherFeedbackSchema,
    putTeacherSchema
}
