'use strict';
const sqlConfig = require('../config');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520690141955_3949';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'egg_db',
    host: 'localhost',
    port: '3306',
    username: sqlConfig.localSql.username,
    password: sqlConfig.localSql.password,
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://119.29.151.195' ],
  };

  config.cors = {
    credentials: true,
  };

  config.alinode = {
    enable: true,
    appid: 'your appid',
    secret: 'your secret',
  };

  return config;
};
