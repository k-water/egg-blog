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
    const { Op } = this.app.Sequelize
    const options = {
      offset: parseInt(offset),
      limit,
      order: [
        [order_by, order.toUpperCase()]
      ]
    }
    if(tags) {
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
    return Object.assign({
      data: res
    }, SUCCESS)
  }

  async del(id) {
    const blog = await this.ctx.model.Blog.findById(id)
    if (!blog) {
      return Object.assign({
        error_msg: 'blog not found'
      }, ERROR)
    } else {
      blog.destroy()
      return SUCCESS
    }
  }
}

module.exports = BlogService