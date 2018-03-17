'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class CollectService extends Service {
  async create(collect) {
    const {
      ctx,
    } = this;
    try {
      const created = await ctx.model.Collect.create(collect);
      ctx.status = 201;
      return Object.assign(SUCCESS, {
        data: created,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async list({
    offset = 0,
    limit = 10,
    order_by = 'created_at',
    order = 'DESC',
  }) {
    const {
      ctx,
    } = this;
    const options = {
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
    };
    try {
      const res = await ctx.model.Collect.findAndCountAll(options);
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
      const collect = await ctx.model.Collect.findById(id);
      if (!collect) {
        return Object.assign(ERROR, {
          msg: 'collect not found',
        });
      }
      collect.destroy();
      return Object.assign(SUCCESS, {
        data: collect,
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
      const collect = await ctx.model.Collect.findById(id);
      if (!collect) {
        return Object.assign(ERROR, {
          msg: 'collect not found',
        });
      }
      return Object.assign(SUCCESS, {
        data: collect,
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
      const collect = await ctx.model.Collect.findById(id);
      if (!collect) {
        return Object.assign(ERROR, {
          msg: 'collect not found',
        });
      }
      const res = await collect.update(updates);
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = CollectService;
