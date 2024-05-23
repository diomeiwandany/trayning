const { Profile, Category, Course, User, UsersCourse } = require('../models');

class Controller {

    static async home (req, res) {
        try {
            res.render('intro')
        } catch (error) {
            res.send (error)
        }
    }

    static async register (req, res){
        try {
            res.render('form-register')
        } catch (error) {
            res.send('error')
        }
    }

    static async postRegister (req, res){
        try {
            const { email, password, role } = req.body
            await Profile.create ({email, password, role})
        } catch (error) {
            res.send (error)
        }
    }

    static async homePage(req, res) {
        try {
            const data = await Profile.findAll({
                include: {
                    model: User,
                    include: Course
                }
            });
            // res.send(data)
            res.render('home', { data });
        } catch (error) {
            res.send(error);
        }
    }
};

module.exports = Controller;