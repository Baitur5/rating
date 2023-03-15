

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user.
 *           example: 6075f853d1137a5a50e5f5d5
 *         fname:
 *           type: string
 *           description: The first name of the user.
 *           example: John
 *         lname:
 *           type: string
 *           description: The last name of the user.
 *           example: Doe
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: $2b$10$5.O5XOZ5b/7vCfW0Y8J/Muhmyb1SvtH1tZbGoRL8B4tZ4xTF4R84y
 *         salt:
 *           type: string
 *           description: The salt used to generate the hash of the user's password.
 *           example: $2b$10$5.O5XOZ5b/7vCfW0Y8J/Mu
 *         hash:
 *           type: string
 *           description: The hash of the user's password.
 *           example: yb1SvtH1tZbGoRL8B4tZ4xTF4R84y
 *         isActive:
 *           type: boolean
 *           description: Indicates whether the user account is active.
 *           example: true
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user is an admin.
 *           example: false
 *         secretKey:
 *           type: string
 *           description: The secret key used for two-factor authentication.
 *           example: ABCD1234
 *       required:
 *         - fname
 *         - lname
 *         - email
 *         - password
 *         - salt
 *         - hash
 *         - isActive
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     University:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the university.
 *         name:
 *           type: string
 *           description: The name of the university.
 *         departments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Department'
 *           description: The departments of the university.
 *         feedbacks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/universityFeedback'
 *           description: The feedbacks for the university.
 *       required:
 *         - name
 *     universityFeedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the feedback.
 *         author:
 *           type: string
 *           description: The ID of the user who created the feedback.
 *         university:
 *           type: string
 *           description: The ID of the university the feedback is for.
 *         comment:
 *           type: string
 *           description: The feedback comment.
 *         reputation:
 *           type: integer
 *           description: The reputation score (1-5).
 *         location:
 *           type: integer
 *           description: The location score (1-5).
 *         capabilities:
 *           type: integer
 *           description: The capabilities score (1-5).
 *         internet:
 *           type: integer
 *           description: The internet score (1-5).
 *         food:
 *           type: integer
 *           description: The food score (1-5).
 *         security:
 *           type: integer
 *           description: The security score (1-5).
 *         environment:
 *           type: integer
 *           description: The environment score (1-5).
 *         facilityComplexity:
 *           type: integer
 *           description: The facility complexity score (1-5).
 *         convenience:
 *           type: integer
 *           description: The convenience score (1-5).
 *         commonAreas:
 *           type: integer
 *           description: The common areas score (1-5).
 *         library:
 *           type: integer
 *           description: The library score (1-5).
 *       required:
 *         - author
 *         - university
 *         - reputation
 *         - location
 *         - capabilities
 *         - internet
 *         - food
 *         - security
 *         - environment
 *         - facilityComplexity
 *         - convenience
 *         - commonAreas
 *         - library
 *     Department:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the department.
 *           example: 6075f853d1137a5a50e5f5d5
 *         name:
 *           type: string
 *           description: The name of the department.
 *           example: Computer Science
 *         university:
 *           type: string
 *           description: The ID of the university that the department belongs to.
 *           example: 6075f7e0d1137a5a50e5f5d3
 *         teachers:
 *           type: array
 *           description: An array of teacher IDs that belong to the department.
 *           items:
 *             type: string
 *             example: 60760f10e87c4131d8517364
 *       required:
 *         - name
 *         - university 
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the teacher.
 *           example: 60760f10e87c4131d8517364
 *         fname:
 *           type: string
 *           description: The first name of the teacher.
 *           example: John
 *         lname:
 *           type: string
 *           description: The last name of the teacher.
 *           example: Smith
 *         department:
 *           type: string
 *           description: The ID of the department that the teacher belongs to.
 *           example: 6075f853d1137a5a50e5f5d5
 *         university:
 *           type: string
 *           description: The ID of the university that the teacher belongs to.
 *           example: 6075f7e0d1137a5a50e5f5d3
 *         feedbacks:
 *           type: array
 *           description: An array of feedback IDs that belong to the teacher.
 *           items:
 *             type: string
 *             example: 60760f52e87c4131d8517365
 *       required:
 *         - fname
 *         - lname
 *         - department
 *         - university
 *
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     teacherFeedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the teacher feedback.
 *           example: 60760f10e87c4131d8517364
 *         author:
 *           type: string
 *           description: The ID of the user who authored the feedback.
 *           example: 6075f7e0d1137a5a50e5f5d3
 *         teacher:
 *           type: string
 *           description: The ID of the teacher who is the subject of the feedback.
 *           example: 60760f10e87c4131d8517364
 *         comment:
 *           type: string
 *           description: A comment provided by the user who authored the feedback.
 *           example: This teacher was great!
 *         assess:
 *           type: number
 *           description: A rating of the teacher's overall performance.
 *           example: 5
 *         teachingComplexity:
 *           type: number
 *           description: A rating of the complexity of the material taught by the teacher.
 *           example: 3
 *         examComplexity:
 *           type: number
 *           description: A rating of the complexity of the teacher's exams.
 *           example: 4
 *         learning:
 *           type: number
 *           description: A rating of the user's perceived level of learning under the teacher.
 *           example: 5
 *         politeness:
 *           type: number
 *           description: A rating of the teacher's politeness and demeanor.
 *           example: 5
 *         funDuringLessons:
 *           type: number
 *           description: A rating of the user's enjoyment during lessons with the teacher.
 *           example: 4
 *         wouldHireAgain:
 *           type: string
 *           description: A response indicating whether or not the user would hire the teacher again.
 *           example: yes
 *         usedTextbooks:
 *           type: string
 *           description: A response indicating whether or not the teacher used textbooks.
 *           example: yes
 *         paysAttentionToAttendance:
 *           type: string
 *           description: A response indicating whether or not the teacher pays attention to attendance.
 *           example: yes
 *         explainsTopicClearly:
 *           type: string
 *           description: A response indicating whether or not the teacher explains topics clearly.
 *           example: yes
 *         isStrictWithStudents:
 *           type: string
 *           description: A response indicating whether or not the teacher is strict with students.
 *           example: yes
 *       required:
 *         - author
 *         - teacher
 *         - assess
 *         - teachingComplexity
 *         - examComplexity
 *         - learning
 *         - politeness
 *         - funDuringLessons
 *         - wouldHireAgain
 *         - usedTextbooks
 *         - paysAttentionToAttendance
 *         - explainsTopicClearly
 *         - isStrictWithStudents
 */

