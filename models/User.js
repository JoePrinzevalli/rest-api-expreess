const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}

    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A first name is required'
              },
              notEmpty: {
                msg: 'Please provide a first name'
              }
            }
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A last name is required'
              },
              notEmpty: {
                msg: 'Please provide a last name'
              }
            }
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'An email is required'
              },
              notEmpty: {
                msg: 'Please provide an email'
              }
            }
          },
          password: {
            type: DataTypes.VIRTUAL,  
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A password is required'
              },
              notEmpty: {
                msg: 'Please provide a password'
              },
              len: {
                args: [8, 20],
                msg: 'The password should be between 8 and 20 characters in length'
              }
            }
          }
    } , { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, {
          foreignKey: {
            fieldName: 'userId',
            allowNull: false,
          },
        });
      };

    return User;
};