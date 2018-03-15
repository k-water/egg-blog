'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class CatalogService extends Service {
  async create(catalog) {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.model.Catalog.create(catalog);
      ctx.status = 201;
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del(id) {
    const {
      ctx,
    } = this;
    try {
      const catalog = await ctx.model.Catalog.findById(id);
      if (!catalog) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'catalog not found',
        });
      }
      const res = await catalog.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
  async list({
    order_by = 'created_at',
    order = 'DESC',
  }) {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.model.Catalog.findAndCountAll({
        order: [
          [ order_by, order.toUpperCase() ],
        ],
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

  async update({
    id,
    updates,
  }) {
    const {
      ctx,
    } = this;
    try {
      const catalog = await ctx.model.Catalog.findById(id);
      if (!catalog) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'catalog not found',
        });
      }
      const res = await catalog.update(updates);
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const {
      ctx,
    } = this;
    try {
      const catalog = await ctx.model.Catalog.findById(id);
      if (!catalog) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'catalog not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: catalog,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = CatalogService;
