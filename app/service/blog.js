'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class BlogService extends Service {
  async create(blog) {
    const {
      ctx,
    } = this;
    try {
      const res = await this.ctx.model.Blog.create(blog);
      return Object.assign({
        data: res,
      }, SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async index({
    offset = 0,
    limit = 5,
    order_by = 'created_at',
    order = 'DESC',
    tags = '',
    catalog_id = '',
  }) {
    const {
      Op,
    } = this.app.Sequelize;
    const options = {
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
    };
    if (tags) {
      options.where = {
        tags: {
          [Op.like]: `%${tags}%`,
        },
      };
    }
    if (catalog_id) {
      options.where = {
        catalog_id: parseInt(catalog_id, 10),
      };
    }
    const res = await this.ctx.model.Blog.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }, {
        model: this.ctx.model.Catalog,
        as: 'catalog',
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async del({
    id,
    user_id,
  }) {
    const blog = await this.ctx.model.Blog.findById(id);
    if (!blog) {
      return Object.assign({
        error_msg: 'blog not found',
      }, ERROR);
    } else if (blog.user_id !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to delete others blog',
      });
    }
    blog.destroy();
    return SUCCESS;

  }

  async update({
    id,
    user_id,
    updates,
  }) {
    const blog = await this.ctx.model.Blog.findById(id);
    if (!blog) {
      return Object.assign(ERROR, {
        msg: 'blog not found',
      });
    } else if (blog.user_id !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to modify others blog',
      });
    }
    blog.update(updates);
    return SUCCESS;

  }

  async find(id) {
    const blog = await this.ctx.model.Blog.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }, {
        model: this.ctx.model.Comment,
        as: 'comment',
        attributes: [ 'id', 'content', 'created_at', 'updated_at' ],
        include: [{
          model: this.ctx.model.User,
          attributes: [ 'username' ],
        }],
      }, {
        model: this.ctx.model.Catalog,
        as: 'catalog',
        attributes: [ 'id', 'name', 'created_at', 'updated_at' ],
        include: [{
          model: this.ctx.model.User,
          attributes: [ 'username' ],
        }],
      }],
    });
    blog.set('readSize', blog.get('readSize') + 1);
    blog.increment('readSize').then().catch(err => {
      console.log(err);
    });
    if (!blog) {
      return Object.assign(ERROR, {
        msg: 'blog not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: blog,
    });

  }

  async edit(id) {
    const blog = await this.ctx.model.Blog.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }, {
        model: this.ctx.model.Catalog,
        as: 'catalog',
      }],
    });
    if (!blog) {
      return Object.assign(ERROR, {
        msg: 'blog not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: blog,
    });

  }

  async getTags() {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.model.Blog.findAndCountAll({
        attributes: [ 'tags' ],
      });
      const arrTag = [];
      res.rows.map(item => {
        return arrTag.push(item.tags);
      });
      const tags = unique(arrTag.join(',').split(','));
      return Object.assign(SUCCESS, {
        tags,
      });
    } catch (error) {
      ctx.status = 500;
      throw (500);
    }
  }

  async archive(year) {
    const {
      ctx,
    } = this;
    const {
      Op,
    } = this.app.Sequelize;
    try {
      if (!year) {
        return Object.assign(ERROR, {
          msg: 'expected an param with year, password but got null',
        });
      }
      const blogs = await ctx.model.Blog.findAndCountAll({
        where: {
          created_at: {
            [Op.between]: [ new Date(`${year}-1-1`), new Date(`${year}-12-31 23:59`) ],
          },
        },
      });
      return Object.assign(SUCCESS, {
        data: blogs,
        year,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = BlogService;
