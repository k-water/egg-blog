'use strict';

const Controller = require('egg').Controller;

class CatalogController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    body.user_id = 1;
    ctx.body = await ctx.service.catalog.create(body);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.catalog.del(id);
  }

  async list() {
    const {
      ctx,
    } = this;
    const params = ctx.query;
    ctx.body = await ctx.service.catalog.list(params);
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const updates = Object.assign({}, ctx.request.body);
    ctx.body = await ctx.service.catalog.update({
      id,
      updates,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.catalog.find(id);
  }
}

module.exports = CatalogController;
