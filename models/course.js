'use strict';
const helper = require("../helpers");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Course.belongsToMany(models.User, { through: models.UsersCourse })
    }

    static async getCourses(Category, option) {
      try {
        let data = await Course.findAll({
          include: {
            model: Category,
          },
          where: option,
          order: [[`courseName`, "asc"]],
        });
        return data;

      } catch (error) {
        throw error;
      }
    }
    get codeCourse() {
      let value = `${this.courseName[0]}${this.id}`;
      return helper.formatCode(value, this.CategoryId);
  }

   get timeConvert (){
    const minutes = Math.floor(this.duration[0] / 60);
        const seconds = this.duration % 60
        return `${minutes}:${seconds < 10 ? `0` : ``}${sec} `
  }
  }
  Course.init({
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field courseName must be filled."
        },
        notEmpty: {
          msg: "Field courseName cannot be empty."
        },
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field duration must be filled."
        },
        notEmpty: {
          msg: "Field duration cannot be empty."
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};