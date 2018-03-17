'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class UserService extends Service {
  async create(user) {
    const {
      ctx,
    } = this;
    try {
      if (!user.username || !user.password) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with username, password but got: ${JSON.stringify(user)}`,
        });
      }
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(user.password, salt);
      user = Object.assign(user, {
        password: hash,
      });
      const userDB = await ctx.model.User.findOne({
        where: {
          username: user.username,
        },
      });
      if (!userDB) {
        const res = await this.ctx.model.User.create(user);
        ctx.status = 201;
        return Object.assign(SUCCESS, {
          data: res,
        });
      }
      ctx.status = 406;
      return Object.assign(ERROR, {
        msg: 'username already exists',
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
      const user = await ctx.model.User.findById(id);
      if (!user) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      user.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, user }) {
    const {
      ctx,
    } = this;
    try {
      const userDB = await ctx.model.User.findById(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(user.password, salt);
      user = Object.assign(user, {
        password: hash,
      });
      const res = await userDB.update(user);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async login({ username, password }) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return Object.assign(ERROR, {
          msg: 'username is error',
        });
      }
      if (await bcrypt.compare(password, user.password)) {
        ctx.status = 200;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        ctx.cookies.set('token', hash, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        ctx.cookies.set('user_id', user.id, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        ctx.cookies.set('username', user.username, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        return Object.assign(SUCCESS, {
          data: Object.assign(user, {
            password: '',
          }),
        });
      } else {
        return Object.assign(ERROR, {
          msg: 'password is error',
        });
      }

    } catch (error) {
      throw (error);
    }
  }

  async find(id) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findById(id, {
        include: [{
          model: ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      });
      if (!user) {
        ctx.status = 401;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });

    } catch (error) {
      throw (500);
    }
  }
}

module.exports = UserService;
