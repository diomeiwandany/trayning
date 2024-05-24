const { Profile, Category, Course, User, UsersCourse } = require('../models');
const { Op } = require("sequelize");
class Controller {

    // static async home(req, res) {
    //     try {
    //         res.render('intro')
    //     } catch (error) {
    //         res.send(error)
    //     }
    // }

    // static async register(req, res) {
    //     try {
    //         res.render('form-register')
    //     } catch (error) {
    //         res.send('error')
    //     }
    // }

    // static async postRegister(req, res) {
    //     try {
    //         const { email, password, role } = req.body
    //         await User.create({ email, password, role })

    //     } catch (error) {
    //         res.send(error)
    //     }
    // }

    static async homePage(req, res) {
        try {
            // const data = await Profile.findAll({
            //     include: {
            //         model: User,
            //         include: Course
            //     }
            // });
           
            // res.render('home', { data });
            res.redirect('/courses')
        } catch (error) {
            res.send(error);
        }
    }

    static async readCourses(req, res) {
        try {
            let { search, del } = req.query;
            let option = {};
            if (search) {
                option.courseName = {
                    [Op.iLike]: `%${search}%`,
                };
            }
            let data = await Course.getCourses(Category, option);

            
            res.render("show-courses", { data, del });
        } catch (error) {
            
            res.send(error);
        }
    }

    static async readCoursesUser(req, res) {
        try {
            let { search } = req.query;
            let option = {};
            if (search) {
                option.courseName = {
                    [Op.iLike]: `%${search}%`,
                };
            }
            let data = await Course.findAll({
                include: {
                    model: Category,
                },
                where: option,
                order: [[`courseName`, "asc"]],
            });
            res.render("show-courses-user", { data });
        } catch (error) {
            res.send(error);
        }
    }

    static async courseDetail(req, res) {
        try {
            let { id } = req.params;
            let course = await Course.findByPk(id); 
            let usersCourse = await course.getUsers(); 
            for (let i = 0; i < usersCourse.length; i++) {
                let userProfile = await usersCourse[i].getProfile();
                usersCourse[i].profile = userProfile; 
            }

            res.render("show-courses-detail", { data: course, usersCourse });
        } catch (error) {
           
            res.send(error);
        }
    }

    static async addCourse(req, res) {
        try {
            let { error } = req.query;
            let data = await Category.findAll();
            console.log(data);
            res.render("form-course", { data, error });
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddCourse(req, res) {
        try {
            // console.log(req.body);
            let { courseName, duration, CategoryId } = req.body;
            
            await Course.create({ courseName, duration, CategoryId });
            res.redirect("/courses");
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errs = error.errors.map((el) => {
                    return el.message;
                });
               
                res.redirect(`/courses/add?error=${errs}`);
            } else {
                res.send(error);
            }
        }
    }

    static async updateCourse(req, res) {
        try {
            
            let { error } = req.query;
            let { id } = req.params;
            let dataCourse = await Course.findByPk(id);
            let dataCategory = await Category.findAll();

            res.render("form-update-course", {
                dataCourse,
                dataCategory,
                error,
            });
        } catch (error) {
           
            res.send(error);
        }
    }

    static async postUpdateCourse(req, res) {
        try {
            let { id } = req.params;
           
            let { courseName, duration, CategoryId } = req.body;
            let input = { courseName, duration, CategoryId};
            
            await Course.update(input, {
                where: { id },
            });
            res.redirect("/courses");
        } catch (error) {
            let { id } = req.params;
            if (error.name === "SequelizeValidationError") {
                let errs = error.errors.map((el) => {
                    return el.message;
                });
                
                res.redirect(`/courses/update/${id}?error=${errs}`);
            } else {
                res.send(error);
            }
        }
    }
    static async deleteCourse(req, res) {
        try {
            let { id } = req.params;
            // res.send(`ini courses delete`);
            let delData = await Course.findByPk(id);
            await Course.destroy({
                where: { id },
            });
            res.redirect(`/courses?del=${delData.courseNamename}`);
        } catch (error) {
            res.send(error);
        }
    }
};


module.exports = Controller;