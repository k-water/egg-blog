'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async create() {
    const {
      ctx
    } = this
    ctx.body = await ctx.service.user.create(ctx.request.body)
  }

  async destroy() {
    const {
      ctx
    } = this
    const id = +ctx.params.id
    ctx.body = await ctx.service.user.del(id)
  }

  async update() {
    const {
      ctx
    } = this
    const id = +ctx.params.id
    const user = ctx.request.body
    ctx.body = await ctx.service.user.update({
      id,
      user
    })
  }
}

module.exports = UserController
