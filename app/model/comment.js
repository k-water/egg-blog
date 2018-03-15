'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: STRING,
      validate: {
        min: 2,
        max: 500,
      },
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Comment.associate = function() {
    app.model.Comment.belongsTo(app.model.User);
    app.model.Comment.belongsTo(app.model.Blog);
  };

  return Comment;
};
