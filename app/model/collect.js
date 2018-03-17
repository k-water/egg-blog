'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;
  const Collect = app.model.define('collect', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: STRING,
    date: STRING,
    link: STRING,
    title: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Collect;
};
