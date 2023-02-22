const {DataTypes} = require('sequelize');
const {sequelize} = require('../util/database');

module.exports = {
  Poses : sequelize.define('poses', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      userId: DataTypes.INTEGER,
      savedOn: DataTypes.DATE,
      notes: DataTypes.CHAR,
  })
};