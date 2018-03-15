'use strict'

const Controller = require('egg').Controller

class CatalogController extends Controller {
  async create() {
    const {
      ctx
    } = this
    const body = ctx.request.body
    body.user_id = 1
    ctx.body = await ctx.service.catalog.create(body)
  }
}

module.exports = CatalogController
