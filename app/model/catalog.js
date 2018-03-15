'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const Catalog = app.model.define('catalog', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      validate: {
        min: 2,
        max: 50,
      },
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Catalog.associate = function() {
    app.model.Catalog.belongsTo(app.model.User);
    app.model.Catalog.hasMany(app.model.Blog);
  };

  return Catalog;
};
