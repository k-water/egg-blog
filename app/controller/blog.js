'use strict'

const Controller = require('egg').Controller

class BlogController extends Controller {
  async create() {
    const {
      ctx
    } = this
    const body = ctx.request.body
    body.user_id = 1
    const created = await ctx.service.blog.create(ctx.request.body)
    ctx.status = 201
    ctx.body = created
    
  }

  async index() {
    const {
      ctx
    } = this
    const res = await ctx.service.blog.index(ctx.query)
    ctx.body = res
  }

  async destroy() {
    const {
      ctx
    } = this
    const id = ctx.params.id
    const res = await ctx.service.blog.del(id)
    ctx.status = 200
    ctx.body = res
  }
}

module.exports = BlogController