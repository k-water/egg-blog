'use strict'

module.exports = app => {
  app.post('/api/users', 'user.create')
  app.del('/api/users/:id', 'user.destroy')
}