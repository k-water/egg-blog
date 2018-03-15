'use strict'

const Service = require('egg').Service
const {
  ERROR,
  SUCCESS
} = require('../util/util')
class CatalogService extends Service {
  async create(catalog) {
    const {
      ctx
    } = this
    try {
      const res = await ctx.model.Catalog.create(catalog)
      ctx.status = 201
      return Object.assign(SUCCESS, {
        data: res
      })
    } catch (error) {
      ctx.status = 500
      throw(erro)
    }
  }
}

module.exports = CatalogService
