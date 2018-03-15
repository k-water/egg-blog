'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const {
      blog_id,
      user_id,
      content,
    } = ctx.request.body;
    ctx.body = await ctx.service.comment.create({
      blog_id,
      user_id,
      content,
    });
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const user_id = +ctx.params.user_id;
    console.log(id, user_id);
    ctx.body = await ctx.service.comment.del({
      id,
      user_id,
    });
  }
}

module.exports = CommentController;
