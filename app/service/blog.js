'use strict'

const Service = require('egg').Service
const {
  ERROR,
  SUCCESS
} = require('../util/util')
class BlogService extends Service {
  async create(blog) {
    try {
      const res = await this.ctx.model.Blog.create(blog)
      return Object.assign({
        data: res
      }, SUCCESS)
    } catch (error) {
      this.logger.error(error)
      return ERROR
    }
  }

  async index({
    offset = 0,
    limit = 5,
    order_by = 'created_at',
    order = 'DESC',
    tags = ''
  }) {
    const {
      Op
    } = this.app.Sequelize
    const options = {
      offset: parseInt(offset),
      limit,
      order: [
        [order_by, order.toUpperCase()]
      ]
    }
    if (tags) {
      options.where = {
        tags: {
          [Op.like]: `%${tags}%`
        }
      }
    }
    const res = await this.ctx.model.Blog.findAndCountAll({
      options,
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: ['id', 'username'],
        include: [{
          model: this.ctx.model.Authority,
          attributes: ['id', 'name']
        }]
      }]
    })
    return Object.assign(SUCCESS, {
      data: res
    })
  }

  async del({
    id,
    user_id
  }) {
    const blog = await this.ctx.model.Blog.findById(id)
    if (!blog) {
      return Object.assign({
        error_msg: 'blog not found'
      }, ERROR)
    } else if (blog.user_id !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to delete others blog'
      })
    } else {
      blog.destroy()
      return SUCCESS
    }
  }

  async update({
    id,
    user_id,
    updates
  }) {
    const blog = await this.ctx.model.Blog.findById(id)
    if (!blog) {
      return Object.assign(ERROR, {
        msg: 'blog not found'
      })
    } else if (blog.user_id !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to modify others blog'
      })
    } else {
      blog.update(updates)
      return SUCCESS
    }
  }

  async find(id) {
    const blog = await this.ctx.model.Blog.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: ['id', 'username'],
        include: [{
          model: this.ctx.model.Authority,
          attributes: ['id', 'name']
        }]
      }]
    })
    blog.increment('readSize').then(res => {}).catch(err => {
      console.log(err)
    })
    if (!blog) {
      return Object.assign(ERROR, {
        msg: 'blog not found'
      })
    } else {
      return Object.assign(SUCCESS, {
        data: blog
      })
    }
  }

  async edit(id) {
    const blog = await this.ctx.model.Blog.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: ['id', 'username'],
        include: [{
          model: this.ctx.model.Authority,
          attributes: ['id', 'name']
        }]
      }]
    })
    if (!blog) {
      return Object.assign(ERROR, {
        msg: 'blog not found'
      })
    } else {
      return Object.assign(SUCCESS, {
        data: blog
      })
    }
  }
}

module.exports = BlogService