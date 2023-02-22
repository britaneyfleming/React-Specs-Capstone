const {DataTypes} = require('sequelize');
const {sequelize} = require('../util/database');

module.exports = {
  JOURNALS : sequelize.define('journals', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      userId: DataTypes.INTEGER,
      createdOn: DataTypes.DATE,
      notes: DataTypes.CHAR,
  })
};