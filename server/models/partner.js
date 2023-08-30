'use strict';
const {
  Model
} = require('sequelize');
const task = require('./task');
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Partner.hasOne(models.Task, {foreignKey: 'partnerId', as: 'task'})
    }
  };
  Partner.init({
    name: {
      type: DataTypes.STRING
    },
    logo: {
      type: DataTypes.STRING
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
    modelName: 'Partner',
    tableName: 'partners'
  });
  return Partner;
};