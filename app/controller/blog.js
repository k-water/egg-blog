'use strict';

const Controller = require('egg').Controller;
class BlogController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    body.user_id = 1;
    const created = await ctx.service.blog.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;

  }

  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.blog.index(ctx.query);
    ctx.body = res;
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const user_id = +ctx.params.user_id;
    const res = await ctx.service.blog.del({
      id,
      user_id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const user_id = +ctx.params.user_id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.blog.update({
      id,
      user_id,
      updates: body,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.blog.find(id);
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.blog.edit(id);
  }

  async tags() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.blog.getTags();
  }

  async archive() {
    const {
      ctx,
    } = this;
    const year = ctx.query.year;
    ctx.body = await ctx.service.blog.archive(year);
  }
}

module.exports = BlogController;
