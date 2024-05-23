'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Course, { foreignKey: 'CategoryId' })
    }
  }
  Category.init({
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field categoryName must be filled."
        },
        notEmpty: {
          msg: "Field categoryName cannot be empty."
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};