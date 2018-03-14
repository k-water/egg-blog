'use strict'

const Controller = require('egg').Controller

class CommentController extends Controller {
  async create() {
    const {
      ctx
    } = this
    const {
      blog_id,
      user_id,
      content
    } = ctx.request.body
    ctx.body = await ctx.service.comment.create({
      blog_id,
      user_id,
      content
    })
  }
}

module.exports = CommentController
