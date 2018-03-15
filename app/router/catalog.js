'use strict'

module.exports = app => {
  app.post('/api/users/catalog', 'catalog.create')
}