const request = require('supertest');
const app = require('../app');

describe('Health & Metrics Endpoints', () => {
  it('GET /health should return 200 and status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('GET /metrics should return 200', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
  });

  it('GET /unknown-route should return 404', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
  });
});
