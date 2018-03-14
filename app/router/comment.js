'use strict'

module.exports = app => {
  app.post('/api/users/comment', 'comment.create')
}