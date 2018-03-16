'use strict'

module.exports = app => {
  app.post('/api/collect', 'collect.create')
  app.get('/api/collect', 'collect.list')
}