'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchasedProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PurchasedProduct.init({
    transactionId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'transaction_id',
      references: {
        model: 'transactions',
        key: 'id'
      }
      },

      productId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'product_id',
        // references: {
        //   model: 'products',
        //   key: 'id'
        // }
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
    modelName: 'PurchasedProduct',
    tableName: 'purchased_products'
  });
  return PurchasedProduct;
};