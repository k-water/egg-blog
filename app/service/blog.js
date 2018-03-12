'use strict'

const Service = require('egg').Service

class BlogService extends Service {
  async create(blog) {
    try {
      const res = await this.ctx.model.Blog.create(blog)
      return res
    } catch (error) {
      this.logger.error(error)
      return {}
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
    return this.ctx.model.Blog.findAndCountAll({
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
  }
}

module.exports = BlogService