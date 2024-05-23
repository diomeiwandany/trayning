'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Course.belongsToMany(models.User, { through: models.UsersCourse })
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