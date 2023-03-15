
const router = require("express").Router();

const mongoose = require("mongoose")
const { restrictAdmin, restrict } = require("auth")
const { validateAsync } = require("auth")
const { createUniSchema, postFeedbackSchema, putFeedbackSchema, putUniversitySchema, postDepartment, addDepartmentSchema } = require("../models/validate_uni")
const { Department } = require("../models/department");
const { University, universityFeedback } = require("../models/university");
const { object } = require("joi");


//Create
router.post("/universities", restrict, restrictAdmin, validateAsync(createUniSchema), async (req, res) => {
    try {
        var uni = new University({
            name: req.body.name,
            departments: [],
            feedbacks: []
        })

        for (const e of req.body.departments) {
            var dep = new Department({
                name: e,
                university: uni._id,
            })

            uni.departments.push(dep._id);
            await dep.save()
        }
        await uni.save();
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})

//Read
router.get("/universities", restrict, async (req, res) => {
    try {
        const limit = req.query.limit || 0;
        const universities = await University.find({}, { _id: 0, __v: 0, departments: 0, feedbacks: 0 }).limit(parseInt(limit));
        res.status(200).json(universities);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})


//get departments
router.get("/universities/:university_name/departments", restrict, async (req, res) => {
    try {
        const limit = req.query.limit || 0;
        const universities = await University.findOne({ name: req.params.university_name }, { _id: 0, __v: 0, feedbacks: 0 }).populate({ path: "departments", select: '-__v -university', }).limit(parseInt(limit));
        if (!universities) {
            return res.status(404).send("University not found")
        }
        res.status(200).json(universities);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})

//get feedbacks for university
router.get("/universities/:university_name/feedbacks", restrict, async (req, res) => {
    try {
        const limit = req.query.limit || 0;
        const universities = await University.findOne({ name: req.params.university_name }, { _id: 0, __v: 0, departments: 0 }).populate({ path: "feedbacks", select: '-__v -author -university' }).limit(parseInt(limit));

        if (!universities) {
            return res.status(404).send("University not found")
        }
        res.status(200).json(universities);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})


//testing
router.get("/all-info", restrict, async (req, res) => {
    try {
        const limit = req.query.limit || 0;
        const universities = await University.find({}, { _id: 0, __v: 0 }).populate({ path: 'departments', select: '-__v -university', populate: { path: 'teachers', select: '-__v -university -department', populate: { path: 'feedbacks', select: '-__v -author -teacher' } } }).populate({ path: "feedbacks", select: '-__v -author -university' }).limit(parseInt(limit));
        res.status(200).json(universities);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})


//add feedback
router.post("/university-feedback", restrict, validateAsync(postFeedbackSchema), async (req, res) => {

    try {
        const university = await University.findOne({ name: req.body.university_name });
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }
        const is_first_time = await universityFeedback.findOne({ author: mongoose.Types.ObjectId(req.session.user._id), university: university._id });

        if (is_first_time) {
            return res.status(404).send("You have already sumbitted your feedback for this university!");
        }
        const feedback = new universityFeedback({
            author: req.session.user._id,
            university: university._id,
            comment: req.body.comment,
            reputation: req.body.reputation,
            location: req.body.location,
            capabilities: req.body.capabilities,
            internet: req.body.internet,
            food: req.body.food,
            security: req.body.security,
            environment: req.body.environment,
            facilityComplexity: req.body.facilityComplexity,
            convenience: req.body.convenience,
            commonAreas: req.body.commonAreas,
            library: req.body.library
        });
        await feedback.save();
        university.feedbacks.push(feedback._id);
        await university.save();
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

//Update feedback
router.put("/university-feedback/:university_name/:feedback_id", restrict, validateAsync(putFeedbackSchema), async (req, res) => {
    try {
        const university = await University.findOne({ name: req.params.university_name });
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }
        var feedback;
        try {

            feedback = await universityFeedback.findOne({ _id: mongoose.Types.ObjectId(req.params.feedback_id) });
        }
        catch (err) {
            return res.status(404).send("Feedback not found for the given user");
        }
        if (!feedback || (feedback.author != req.session.user._id && !req.session.user.isAdmin)) {
            return res.status(404).send("Feedback not found for the given user");
        }

        feedback.comment = req.body.comment || feedback.comment;
        feedback.reputation = req.body.reputation || feedback.reputation;
        feedback.location = req.body.location || feedback.location;
        feedback.capabilities = req.body.capabilities || feedback.capabilities;
        feedback.internet = req.body.internet || feedback.internet;
        feedback.food = req.body.food || feedback.food;
        feedback.security = req.body.security || feedback.security;
        feedback.environment = req.body.environment || feedback.environment;
        feedback.facilityComplexity = req.body.facilityComplexity || feedback.facilityComplexity;
        feedback.convenience = req.body.convenience || feedback.convenience;
        feedback.commonAreas = req.body.commonAreas || feedback.commonAreas;
        feedback.library = req.body.library || feedback.library;

        await feedback.save();

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

//delete feedback
router.delete("/university-feedback/:university_name/:feedback_id", restrict, async (req, res) => {
    try {

        var feedback;
        try {

            feedback = await universityFeedback.findOne({ _id: mongoose.Types.ObjectId(req.params.feedback_id) });
        }
        catch (err) {

            return res.status(404).send("Feedback not found for the given user");
        }
        if (!feedback || (feedback.author != req.session.user._id && !req.session.user.isAdmin)) {

            return res.status(404).send("Feedback not found for the given user");
        }

        var university;

        try {

            university = await University.findOneAndUpdate(
                { name: req.params.university_name },
                { $pull: { feedbacks: mongoose.Types.ObjectId(feedback._id) } },
                { new: true }
            );
        } catch (err) {
            console.log(err)
            return res.status(404).json({ message: "University not found" });
        }

        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }

        await universityFeedback.deleteMany({ _id: feedback._id })
        res.status(204).send("Successfully deleted!");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})




//delete university
router.delete("/universities/:university_name", restrict, restrictAdmin, async (req, res) => {
    try {
        const universityName = req.params.university_name;
        const university = await University.findOne({ name: universityName });

        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }


        // Remove the university itself from the database
        await university.remove();

        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

})

//update university
router.put("/universities/:university_name", restrict, restrictAdmin, validateAsync(putUniversitySchema), async (req, res) => {

    try {
        const university = await University.findOne({ name: req.params.university_name });
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }
        university.name = req.body.name || university.name;

        await university.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})


//add department
router.post("/universities/:university_name/departments", restrict, restrictAdmin, validateAsync(postDepartment), async (req, res) => {
    try {
        const universityName = req.params.university_name;
        const university = await University.findOne({ name: universityName });

        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }

        for (const e of req.body.departments) {
            var dep = new Department({
                university: university._id,
                name: e,
            })
            university.departments.push(dep._id);
            await dep.save()
            await university.save();
        }


        res.status(201).json({
            message: "Department created successfully",
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})
//change department
router.put("/universities/:university_name/:department_name", restrict, restrictAdmin, validateAsync(addDepartmentSchema), async (req, res) => {
    try {
        const universityName = req.params.university_name;

        const university = await University.findOne({ name: universityName });

        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }

        const department = await Department.findOne({ name: req.params.department_name });

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        department.name = req.body.new_name;

        await department.save();

        res.json({
            message: "Department updated successfully",
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

})

//delete department
router.delete("/universities/:university_name/:department_name", restrict, restrictAdmin, async (req, res) => {

    try {
        const universityName = req.params.university_name;

        const university = await University.findOne({ name: universityName });

        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }

        const department = await Department.findOne({ name: req.params.department_name });

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }


        await department.remove();
        res.json({
            message: "Department removed successfully",
        });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})



//delete bad comment
router.delete("/delete-comment/:university_name/:feedback_id", restrict, restrictAdmin, async (req, res) => {

    try {
        const university = await University.findOne({ name: req.params.university_name });
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }

        const feedback = await universityFeedback.findById(req.params.feedback_id).catch((err) => { });
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        feedback.comment = " ";

        await feedback.save();

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

//search universities
router.get('/universities/search', restrict, async (req, res) => {
    try {
        const searchQuery = req.query.q || '';
        const limit = parseInt(req.query.limit) || 10;

        const universities = await University
            .find({ name: { $regex: searchQuery } })
            .select({ _id: 0, __v: 0, departments: 0, feedbacks: 0 })
            .limit(limit);

        res.status(200).json(universities);
    } catch (err) {
        console.log(err);
        res.sendStatus(501);
    }
});

module.exports = router
