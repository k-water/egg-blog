'use strict'

const Service = require('egg').Service
const {
  ERROR,
  SUCCESS,
  unique
} = require('../util/util')
class BlogService extends Service {
  async create(blog) {
    try {
      const res = await this.ctx.model.Blog.create(blog)
      return Object.assign({
        data: res
      }, SUCCESS)
    } catch (error) {
      throw(error)
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
    const res = await this.ctx.model.Blog.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: ['id', 'username'],
        include: [{
          model: this.ctx.model.Authority,
          attributes: ['id', 'name']
        }]
      }, {
        model: this.ctx.model.Comment,
        as: 'comment'
      }]
    }))
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
      }, {
        model: this.ctx.model.Comment,
        as: 'comment'
      }]
    })
    blog.set('readSize', blog.get('readSize') + 1)
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

  async getTags() {
    const {
      ctx
    } = this
    try {
      const res = await ctx.model.Blog.findAndCountAll({
        attributes: ['tags']
      })
      let arrTag = new Array()
      res.rows.map((item) => {
       return arrTag.push(item['tags'])
      })
      const tags = unique(arrTag.join(',').split(','))
      return Object.assign(SUCCESS, {
        tags
      })
    } catch (error) {
      ctx.status = 500
      throw(500)
    }
  }
}

module.exports = BlogService
