'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const Authority = app.model.define('authority', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(30),
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Authority.associate = function() {
    app.model.Authority.hasMany(app.model.User);
  };


  return Authority;
};
