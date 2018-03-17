'use strict';

const Controller = require('egg').Controller;

class CollectController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.collect.create(ctx.request.body);
  }

  async list() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.collect.list(ctx.query);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.collect.del(ctx.params.id);
  }

  async find() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.collect.find(ctx.params.id);
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const updates = Object.assign({}, ctx.request.body);
    ctx.body = await ctx.service.collect.update({
      id,
      updates,
    });
  }
}

module.exports = CollectController;
