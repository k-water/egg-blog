'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/blog')(app);
  require('./router/user')(app);
  require('./router/comment')(app);
  require('./router/catalog')(app);
  require('./router/collect')(app);
};
