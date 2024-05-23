const { Profile, Category, Course, User, UsersCourse } = require('../models');

class Controller {
    static async homePage(req, res) {
        try {
            const data = await Profile.findAll({
                include: {
                    model: User,
                    include: Course
                }
            });
            res.send(data)
            res.render('home', { data });
        } catch (error) {
            res.send(error);
        }
    }
};

module.exports = Controller;