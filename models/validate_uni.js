const { University } = require("./university")


const Joi = require("joi");


const createUniSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    departments: Joi.array().items(Joi.string()).required(),
});

const postFeedbackSchema = Joi.object({
    university_name: Joi.string().min(2).max(100).required(),
    comment: Joi.string(),
    reputation: Joi.number().integer().min(1).max(5).required(),
    location: Joi.number().integer().min(1).max(5).required(),
    capabilities: Joi.number().integer().min(1).max(5).required(),
    internet: Joi.number().integer().min(1).max(5).required(),
    food: Joi.number().integer().min(1).max(5).required(),
    security: Joi.number().integer().min(1).max(5).required(),
    environment: Joi.number().integer().min(1).max(5).required(),
    facilityComplexity: Joi.number().integer().min(1).max(5).required(),
    convenience: Joi.number().integer().min(1).max(5).required(),
    commonAreas: Joi.number().integer().min(1).max(5).required(),
    library: Joi.number().integer().min(1).max(5).required()
})

const putFeedbackSchema = Joi.object({
    comment: Joi.string(),
    reputation: Joi.number().integer().min(1).max(5),
    location: Joi.number().integer().min(1).max(5),
    capabilities: Joi.number().integer().min(1).max(5),
    internet: Joi.number().integer().min(1).max(5),
    food: Joi.number().integer().min(1).max(5),
    security: Joi.number().integer().min(1).max(5),
    environment: Joi.number().integer().min(1).max(5),
    facilityComplexity: Joi.number().integer().min(1).max(5),
    convenience: Joi.number().integer().min(1).max(5),
    commonAreas: Joi.number().integer().min(1).max(5),
    library: Joi.number().integer().min(1).max(5)
})

const putUniversitySchema = Joi.object({
    name: Joi.string().min(2).max(100),
})

const postDepartment = Joi.object({

    departments: Joi.array().items(Joi.string()).required(),
})


const addDepartmentSchema = Joi.object({
    new_name: Joi.string().min(2).max(100).required(),
})



module.exports = {
    createUniSchema,
    postFeedbackSchema,
    putFeedbackSchema,
    putUniversitySchema,
    postDepartment,
    addDepartmentSchema
}
