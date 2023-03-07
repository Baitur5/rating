const { University } = require("./university")


const Joi = require("joi");


const createUniSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    departments: Joi.array().items(Joi.string().min(2).max(100)).min(1).required(),
});


module.exports = {
    createUniSchema,
}
