'use strict';

module.exports = app => {
  app.post('/api/collect', 'collect.create');
  app.get('/api/collect', 'collect.list');
  app.del('/api/collect/:id', 'collect.destroy');
  app.get('/api/collect/:id', 'collect.find');
  app.put('/api/collect/:id', 'collect.update');
};
