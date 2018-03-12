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
    return this.ctx.model.Blog.findAndCountAll({
      offset: parseInt(offset),
      limit,
      order: [
        [order_by, order.toUpperCase()]
      ],
      where: {
        tags: {
          [Op.like]: `%${tags}%`
        }
      },
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