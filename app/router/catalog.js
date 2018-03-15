'use strict';

module.exports = app => {
  app.post('/api/catalog', 'catalog.create');
  app.del('/api/catalog/:id', 'catalog.destroy');
  app.get('/api/catalog', 'catalog.list');
  app.get('/api/catalog/:id', 'catalog.find');
  app.put('/api/catalog/:id', 'catalog.update');
};
