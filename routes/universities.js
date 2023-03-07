const router = require("express").Router();

const { restrictAdmin, restrict } = require("auth")
const { validateAsync } = require("auth")
const { createUniSchema } = require("../models/validate_uni")
const { Department } = require("../models/department");
const { University } = require("../models/university");


router.post("/create-university", restrict, restrictAdmin, validateAsync(createUniSchema), async (req, res) => {
    try {
        var departments = []
        for (const e of req.body.departments) {
            var dep = new Department({
                name: e,
            })
            departments.push(dep._id);
            await dep.save()
        }
        var uni = new University({
            name: req.body.name,
            departments: departments,
            feedbacks: []
        })
        await uni.save();
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})


module.exports = router
