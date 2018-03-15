'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class CommentService extends Service {
  async create({
    blog_id,
    user_id,
    content,
  }) {
    const {
      ctx,
    } = this;
    try {
      if (!content || !user_id || !blog_id) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with content, user_id, blog_id but got: ${JSON.stringify({
            blog_id,
            user_id,
            content,
          })}`,
        });
      }
      const res = await ctx.model.Comment.create({
        user_id,
        blog_id,
        content,
      });
      ctx.status = 201;
      const blog = await ctx.model.Blog.findById(blog_id);
      blog.increment('commentSize').then().catch(err => {
        console.log(err);
      });
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del({
    id,
    user_id,
  }) {
    const {
      ctx,
    } = this;
    try {
      const comment = await ctx.model.Comment.findById(id);
      const user = await ctx.model.User.findById(user_id);
      if (!comment) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'comment is not exists',
        });
      }
      if (comment.user_id !== user_id && user.authority_id !== 1) {
        ctx.status = 403;
        return Object.assign(ERROR, {
          msg: 'you can not delete others comment',
        });
      }
      const blog = await ctx.model.Blog.findById(comment.blog_id);
      const res = await comment.destroy();
      blog.decrement('commentSize').then().catch(err => {
        console.log(err);
      });
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = CommentService;
