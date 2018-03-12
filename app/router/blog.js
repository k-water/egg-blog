'use strict'

module.exports = app => {
  app.get('/api/blog', 'blog.index')
  app.post('/api/blog', 'blog.create')
  app.del('/api/users/:user_id/blog/:id', 'blog.destroy')
  app.put('/api/users/:user_id/blog/:id', 'blog.update')
  app.get('/api/blog/:id', 'blog.find')
}