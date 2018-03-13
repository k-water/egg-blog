'use strict'

module.exports = app => {
  app.post('/api/users', 'user.create')
}