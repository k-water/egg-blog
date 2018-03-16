'use strict';

const Controller = require('egg').Controller;

class CollectController extends Controller {
  async create() {
    const {
      ctx
    } = this
    ctx.body = await ctx.service.collect.create(ctx.request.body)
  }

  async list() {
    const {
      ctx
    } = this
    ctx.body = await ctx.service.collect.list(ctx.query)
  }
}

module.exports = CollectController;
