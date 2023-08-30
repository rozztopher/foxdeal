'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCompletedTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCompletedTask.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      UserCompletedTask.belongsTo(models.Task,{
        foreignKey: 'taskId',
        onDelete: 'CASCADE'
      });
    }
  };
  UserCompletedTask.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'    
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'task_id'    
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
    modelName: 'UserCompletedTask',
    tableName: 'user_completed_tasks'
  });
  return UserCompletedTask;
};