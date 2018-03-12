'use strict'

const Controller = require('egg').Controller
const {
  ERROR,
  SUCCESS
} = require('../util/util')

class BlogController extends Controller {
  async create() {
    const {
      ctx
    } = this
    const body = ctx.request.body
    body.user_id = 1
    const created = await ctx.service.blog.create(ctx.request.body)
    if (created) {
      ctx.status = 201
      ctx.body = Object.assign({
        data: created
      }, SUCCESS)
    } else {
      ctx.body = Object.assign({}, ERROR)
    }
  }

  async index() {
    const {
      ctx
    } = this
    const res = await ctx.service.blog.index(ctx.query)
    ctx.body = Object.assign({
      data: res
    }, SUCCESS)
  }
}

module.exports = BlogController