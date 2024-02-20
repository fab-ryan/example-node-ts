import { describe, test, it, expect, beforeAll } from '@jest/globals';
import request, { Request } from 'supertest';
import app from '../src/server';

describe('Our first Test', () => {
  var token: string = '';

  it('Running Number like 2+3', () => {
    expect<number>(2 + 4).toBe(6);
  });
});
test('API Testing', (done) => {
  describe('Our First Testing API', () => {
    it('Should return 404', async () => {
      const response: Request = request(app).get('/api/*');
      expect((await response).statusCode).toBe(404);
    }, 10000);
  });
  // 66% or 70% coverage

  done();
}, 10000);
