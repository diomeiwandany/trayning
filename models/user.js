'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: 'UserId' });
      User.belongsToMany(models.Course, { through: models.UsersCourse });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field email must be filled."
        },
        notEmpty: {
          msg: "Field email cannot be empty."
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field password must be filled."
        },
        notEmpty: {
          msg: "Field password cannot be empty."
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field role must be filled."
        },
        notEmpty: {
          msg: "Field role cannot be empty."
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};