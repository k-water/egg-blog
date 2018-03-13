'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async create() {
    const {
      ctx
    } = this
    ctx.body = await ctx.service.user.create(ctx.request.body)
  }
}

module.exports = UserController
