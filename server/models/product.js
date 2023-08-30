'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductFeature, {foreignKey: 'productId' })
      Product.hasMany(models.ProductImage)
    }
  };
  Product.init({
    title: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.TEXT
    },
    credits: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    shopifyId: {
      type: DataTypes.STRING,
      field: 'shopify_id'
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
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};
