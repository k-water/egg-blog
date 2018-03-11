'use strict';

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
    username: 'root',
    password: 'linzibiao',
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
