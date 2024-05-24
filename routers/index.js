const Controller = require('../controllers/controller');

const router = require('express').Router();


router.get('/', Controller.homePage);
router.get('/coursesUser', Controller.readCoursesUser)
router.get('/courses', Controller.readCourses)
router.get("/courses/detail/:id", Controller.courseDetail)

router.get("/courses/add", Controller.addCourse);
router.post("/courses/add", Controller.postAddCourse);
router.get("/courses/update/:id", Controller.updateCourse);
router.post("/courses/update/:id", Controller.postUpdateCourse);
router.get("/courses/delete/:id", Controller.deleteCourse);

module.exports = router;