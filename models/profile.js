'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field fullName must be filled."
        },
        notEmpty: {
          msg: "Field fullName cannot be empty."
        },
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field gender must be filled."
        },
        notEmpty: {
          msg: "Field gender cannot be empty."
        },
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field age must be filled."
        },
        notEmpty: {
          msg: "Field age cannot be empty."
        },
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field UserId must be filled."
        },
        notEmpty: {
          msg: "Field UserId cannot be empty."
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};