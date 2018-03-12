'use strict'

module.exports = app => {
  const { router } = app
  router.resources('blogs', '/api/blog', 'blog')
}