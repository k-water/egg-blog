'use strict';

module.exports = app => {
  app.post('/api/users', 'user.create');
  app.del('/api/users/:id', 'user.destroy');
  app.put('/api/users/:id', 'user.update');
  app.post('/api/users/login', 'user.login');
  app.get('/api/users/:id', 'user.find');
  app.get('/api/users/:id/edit', 'user.find');
};
