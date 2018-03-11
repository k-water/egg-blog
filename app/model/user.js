'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE
  } = app.Sequelize

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      validate: {
        min: 2,
        max: 20
      }
    },
    password: {
      type: STRING,
      validate: {
        min: 6,
        max: 50
      }
    }
  })

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Blog, {
      as: 'blogs',
      foreignKey: 'fk_blog'
    })
    app.model.User.hasMany(app.model.Catalog, {
      as: 'catalogs',
      foreignKey: 'fk_catalog'
    })
    app.model.User.hasMany(app.model.Comment, {
      as: 'comments',
      foreignKey: 'fk_comment'
    })
  }

  return User
}