'use strict'

const Service = require('egg').Service
const {
  ERROR,
  SUCCESS
} = require('../util/util')
class CommentService extends Service {
  async create({
    blog_id,
    user_id,
    content
  }) {
    const {
      ctx
    } = this
    try {
      if (!content || !user_id || !blog_id) {
        ctx.status = 400
        return Object.assign(ERROR, {
          msg: `expected an object with content, user_id, blog_id but got: ${JSON.stringify(comments)}`
        })
      } else {
        const res = await ctx.model.Comment.create({
          user_id,
          blog_id,
          content
        })
        ctx.status = 201
        const blog = await ctx.model.Blog.findById(blog_id)
        blog.increment('commentSize').then(res => {}).catch(err => {
          console.log(err)
        })
        return Object.assign(SUCCESS, {
          data: res
        })
      }
    } catch(error) {
      throw(error)
      ctx.throw(500)
    }
  }
}

module.exports = CommentService
