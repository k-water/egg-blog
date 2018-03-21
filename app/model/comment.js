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
