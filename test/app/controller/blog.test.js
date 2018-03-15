'use strict';
const {
  app,
  assert,
} = require('egg-mock/bootstrap');

describe('test/controller/blog.test.js', () => {
  it('GET /api/blog should work', async () => {
    const result = await app.httpRequest().get('/api/blog');

    assert(result.status === 200);
    assert(result.body.data.count > 0);
  });

  it('GET /api/blog/:id should work', async () => {
    const result = await app.httpRequest().get('/api/blog/1');

    assert(result.status === 200);
    assert(result.body.data.readSize > 0);
  });

  it('POST /api/blog should work', async () => {
    const result = await app.httpRequest().post('/api/blog')
      .send({
        title: 'hello world',
        summary: 'first blog',
        content: '### title',
        tags: 'html,css',
        user_id: 1,
      });

    assert(result.status === 201);
    assert(result.body.code === 0);
  });

  it('GET /api/tags should work', async () => {
    const result = await app.httpRequest().get('/api/tags');

    assert(result.status === 200);
    assert(result.body.tags.length > 0);
  });
});
