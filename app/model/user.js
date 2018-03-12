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

  User.associate = function() {
    app.model.User.hasMany(app.model.Blog, {
      as: 'blogs'
    })
    app.model.User.hasMany(app.model.Catalog, {
      as: 'catalogs'
    })
    app.model.User.hasMany(app.model.Comment, {
      as: 'comments'
    })
    app.model.User.hasOne(app.model.Authority)
  }

  return User
}