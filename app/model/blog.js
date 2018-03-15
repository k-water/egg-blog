'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
    DATE,
  } = app.Sequelize;

  const Blog = app.model.define('blog', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      validate: {
        min: 2,
        max: 50,
      },
    },
    summary: {
      type: STRING,
      validate: {
        min: 2,
        max: 255,
      },
    },
    content: {
      type: TEXT,
    },
    readSize: {
      type: INTEGER,
      defaultValue: 0,
    },
    commentSize: {
      type: INTEGER,
      defaultValue: 0,
    },
    tags: {
      type: STRING(100),
    },
    created_at: DATE,
    updated_at: DATE,

  });

  Blog.associate = function() {
    app.model.Blog.belongsTo(app.model.User);
    app.model.Blog.belongsTo(app.model.Catalog);
    app.model.Blog.hasMany(app.model.Comment, {
      as: 'comment',
    });
  };
  return Blog;
};
