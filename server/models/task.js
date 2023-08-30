'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsToMany(models.User, {
        through: 'UserCompletedTask',        
        foreignKey: 'taskId'
    });
    Task.belongsTo(models.Partner, {foreignKey: 'partnerId'})
    Task.hasMany(models.UserCompletedTask,{foreignKey: 'taskId' })      
    }
  };
  Task.init({
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'partner_id',
      references: {
        model: 'partners',
        key: 'id'
      }
    }, 
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    taskUrl: {
      type: DataTypes.STRING,
      field: 'task_url',
      allowNull: true
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
    modelName: 'Task',
    tableName: 'tasks'
  });
  return Task;
};