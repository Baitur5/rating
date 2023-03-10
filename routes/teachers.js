
const router = require("./universities")
const { postTeacherSchema, postTeacherFeedbackSchema, putTeacherFeedbackSchema, putTeacherSchema } = require("../models/validate_teach")

const mongoose = require("mongoose")
const { restrictAdmin, restrict } = require("auth")
const { validateAsync } = require("auth");
const { University } = require("../models/university");
const { Department } = require("../models/department");
const { Teacher, teacherFeedback } = require("../models/teacher");


//post teacher
router.post("/university/:university_name/:department_name/teachers", restrict, restrictAdmin, validateAsync(postTeacherSchema), async (req, res) => {
    try {
        const university = await University.findOne({ name: req.params.university_name })
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }
        const department = await Department.findOne({ name: req.params.department_name })

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }


        for (const t of req.body.teachers) {
            const teacher = new Teacher({
                fname: t.fname,
                lname: t.lname,
                department: department._id,
                university: university._id,
            });
            await teacher.save();

            department.teachers.push(teacher._id)
            await department.save();
        }
        res.sendStatus(201)

    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)

    }

})

//delete teachers
router.delete("/teachers/:teacher_id", restrict, restrictAdmin, async (req, res) => {
    try {
        var teacher;
        try {
            teacher = await Teacher.findOne({ _id: mongoose.Types.ObjectId(req.params.teacher_id) });
        } catch (err) {

            return res.status(404).json({ message: "Teacher not found" });
        }
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        await teacher.remove();
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }

})

//add feedback 
router.post("/teachers/:teacher_id/feedback", restrict, validateAsync(postTeacherFeedbackSchema), async (req, res) => {
    try {
        var teacher;
        try {

            teacher = await Teacher.findOne({ _id: mongoose.Types.ObjectId(req.params.teacher_id) })
        }
        catch (err) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        const is_first_time = await teacherFeedback.findOne({ author: mongoose.Types.ObjectId(req.session.user._id), teacher: teacher._id });

        if (is_first_time) {
            return res.status(404).send("You have already sumbitted your feedback for this teacher!");
        }
        const feedback = new teacherFeedback({
            teacher: teacher._id,
            author: req.session.user._id,
            comment: req.body.comment,
            assess: req.body.assess,
            teachingComplexity: req.body.teachingComplexity,
            examComplexity: req.body.examComplexity,
            learning: req.body.learning,
            politeness: req.body.politeness,
            funDuringLessons: req.body.funDuringLessons,
            wouldHireAgain: req.body.wouldHireAgain,
            usedTextbooks: req.body.usedTextbooks,
            paysAttentionToAttendance: req.body.paysAttentionToAttendance,
            explainsTopicClearly: req.body.explainsTopicClearly,
            isStrictWithStudents: req.body.isStrictWithStudents
        });
        await feedback.save();
        teacher.feedbacks.push(feedback._id);
        await teacher.save();
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

//update feedback
router.put("/teachers/:teacher_id/:feedback_id", restrict, validateAsync(putTeacherFeedbackSchema), async (req, res) => {
    try {

        var university, feedback;
        try {
            university = await Teacher.findOne({ _id: mongoose.Types.ObjectId(req.params.teacher_id) })
        } catch (err) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (!university) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        try {

            feedback = await teacherFeedback.findOne({ author: mongoose.Types.ObjectId(req.session.user._id), _id: mongoose.Types.ObjectId(req.params.feedback_id) });
        }
        catch (err) {
            return res.status(404).send("Feedback not found for the given user");
        }
        if (!feedback) {
            return res.status(404).send("Feedback not found for the given user");
        }

        feedback.comment = req.body.comment || feedback.comment;
        feedback.assess = req.body.assess || feedback.assess;
        feedback.teachingComplexity = req.body.teachingComplexity || feedback.teachingComplexity;
        feedback.examComplexity = req.body.examComplexity || feedback.examComplexity;
        feedback.learning = req.body.learning || feedback.learning;
        feedback.politeness = req.body.politeness || feedback.politeness;
        feedback.funDuringLessons = req.body.funDuringLessons || feedback.funDuringLessons;
        feedback.wouldHireAgain = req.body.wouldHireAgain || feedback.wouldHireAgain;
        feedback.usedTextbooks = req.body.usedTextbooks || feedback.usedTextbooks;
        feedback.paysAttentionToAttendance = req.body.paysAttentionToAttendance || feedback.paysAttentionToAttendance;
        feedback.explainsTopicClearly = req.body.explainsTopicClearly || feedback.explainsTopicClearly;
        feedback.isStrictWithStudents = req.body.isStrictWithStudents || feedback.isStrictWithStudents;


        await feedback.save();

        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})

//delete feedback
router.delete("/teachers/:teacher_id/:feedback_id", restrict, async (req, res) => {
    try {
        var feedback;
        try {
            feedback = await teacherFeedback.findOne({ author: mongoose.Types.ObjectId(req.session.user._id), _id: mongoose.Types.ObjectId(req.params.feedback_id) });
        }
        catch (err) {

            return res.status(404).send("Feedback not found for the given user");
        }
        if (!feedback) {
            return res.status(404).send("Feedback not found for the given user");
        }
        var teacher;

        try {

            teacher = await Teacher.findOneAndUpdate(
                { _id: req.params.teacher_id },
                { $pull: { feedbacks: mongoose.Types.ObjectId(req.params.feedback_id) } },
                { new: true }
            );
        } catch (err) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        await teacherFeedback.deleteMany({ _id: feedback._id })
        res.status(204).send("Successfully deleted!");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})


//update teachers
router.put("/teachers/:teacher_id", restrict, restrictAdmin, validateAsync(putTeacherSchema), async (req, res) => {

    try {
        const teacher = await Teacher.findById(req.params.teacher_id).catch((err) => { return; });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        teacher.fname = req.body.fname || teacher.fname;
        teacher.lname = req.body.lname || teacher.lname;

        await teacher.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

//delete bad comment
router.delete("/teachers/:teacher_id/:feedback_id/comment", restrict, restrictAdmin, async (req, res) => {

    try {
        const teacher = await University.findById(req.params.teacher_id).catch((err) => { return; });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
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

//Read
router.get("/universities/:university_name/teachers", restrict, async (req, res) => {
    try {
        const university = await University.findOne({ name: req.params.university_name })
        if (!university) {
            return res.status(404).send("University not found")
        }
        const limit = req.query.limit || 0;
        var teachers = await Teacher.find({ university: university._id }, { __v: 0 }).limit(parseInt(limit))
        res.status(200).json(teachers);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})


//get teachers by department
router.get("/universities/:university_name/:department_name/teachers", restrict, async (req, res) => {
    try {
        const university = await University.findOne({ name: req.params.university_name })
        if (!university) {
            return res.status(404).send("University not found")
        }
        const department = await Department.findOne({ name: req.params.department_name, university: university._id });
        if (!department) {
            return res.status(404).send("Department not found")
        }
        const department2 = await department.populate({ path: "teachers", select: "-__v -department -university" })
        res.status(200).json(department2.teachers.slice(0, parseInt(req.query.limit || department2.teachers.length)));
    }
    catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})

//get feedbacks for teacher
router.get("/teachers/:teacher_id/feedbacks", restrict, async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.teacher_id, { _id: 0, __v: 0, departments: 0 }).catch((err) => { return; })
        if (!teacher) {
            return res.status(404).send("Teacher not found")
        }
        const feedbacks = await teacher.populate({ path: "feedbacks", select: "-__v" })
        res.status(200).json(feedbacks.feedbacks.slice(0, parseInt(req.query.limit || feedbacks.feedbacks.length)));
    }
    catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
})


//search teachers
router.get('/teachers/search', restrict, async (req, res) => {
    try {
        const searchQuery = req.query.q || '';
        const limit = parseInt(req.query.limit) || 10;

        const teachers = await Teacher
            .find({
                $or: [
                    { fname: { $regex: searchQuery, $options: 'i' } },
                    { lname: { $regex: searchQuery, $options: 'i' } }
                ]
            })
            .populate('department', '-_id -__v')
            .populate('university', '-_id -__v -departments -feedbacks')
            .select({ _id: 0, __v: 0, feedbacks: 0 })
            .limit(limit);

        res.status(200).json(teachers);
    } catch (err) {
        console.log(err);
        res.sendStatus(501);
    }
});

module.exports = router
