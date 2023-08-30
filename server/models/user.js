'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Task, {
        through: 'UserCompletedTask',        
        foreignKey: 'userId',
        as: 'completedTasks'
    }),
      User.hasMany(models.UserCompletedTask,{foreignKey: 'userId' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      unique: false        
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },      
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
      
    },
    createdAt: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};