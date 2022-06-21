const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model {}

    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A course title is required'
              },
              notEmpty: {
                msg: 'Please provide a course title'
              }
            }
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A course description is required'
              },
              notEmpty: {
                msg: 'Please provide a course description'
              }
            }
          },
          estimatedTime: {
            type: DataTypes.STRING,
          },
          materialsNeeded: {
            type: DataTypes.STRING,  
          },
    } , { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
          foreignKey: {
            fieldName: 'userId',
            allowNull: false,
          },
        });
      };

    return Course;
};