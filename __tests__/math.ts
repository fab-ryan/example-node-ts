import { describe, test, it, expect, beforeAll, afterAll } from '@jest/globals';
import request, { Request, Response } from 'supertest';
import app from '../src/server';
import mongoose from 'mongoose';

const password = process.env.MONGODB_PASSWORD || '';
const uri = process.env.MONGODB_URI || '';
const dbUrl = uri.replace('<password>', password);

beforeAll(async () => {
  await mongoose.connect(dbUrl);
  console.log('Database connected');
}, 70000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Our first Test', () => {
  it('Running Number like 2+3', () => {
    expect<number>(2 + 4).toBe(6);
  });
});

test('API Testing', async () => {
  const response = await request(app).get('/api/*');
  expect(response.statusCode).toBe(404);
}, 50000);

test('401 authized', async () => {
  const response = await request(app).get('/api/posts');
  expect(response.statusCode).toBe(401);
}, 50000);

test('authorized', async () => {
  const userAuth = {
    email: 'elyse@gmail.com',
    password: '123456',
  };
  const response = await request(app)
    .get('/api/posts')
    .set('email', userAuth.email)
    .set('password', userAuth.password);
  expect(response.statusCode).toBe(200);
});

test('authorized', async () => {
  const userAuth = {
    email: '',
    password: '',
  };
  const response = await request(app)
    .get('/api/posts')
    .set(
      'Authorization',
      `Basic ${Buffer.from(`${userAuth.email}:${userAuth.password}`).toString(
        'base64',
      )}`,
    );
  expect(response.statusCode).toBe(401);
});

test('auth Not Admin', async () => {
  const userAuth = {
    email: 'john@yahoo.fr',
    password: '123456',
  };
  const response = await request(app)
    .get('/api/posts')
    .set('email', userAuth.email)
    .set('password', userAuth.password);
  expect(response.statusCode).toBe(401);
});

test('auth Admin', async () => {
  const userAuth = {
    email: 'john@yahoo.fr',
    password: 'fhkhskhjdkahlsd',
  };
  const response = await request(app)
    .get('/api/posts')
    .set('email', userAuth.email)
    .set('password', userAuth.password);
  expect(response.statusCode).toBe(401);
});

test('no header that was set', async () => {
  const response = await request(app).get('/api/posts');
  expect(response.statusCode).toBe(401);
});

describe('Post Endpoints', () => {
  let res: any;
  it('should create a new post', async () => {
    const response = await request(app).post('/api/posts').send({
      title: 'test',
      content: 'test',
    });
    res = response.body.data;

    expect(response.statusCode).toBe(201);
  });

  it('should fetch single post', async () => {
    const response = await request(app).get(`/api/posts/${res._id}`);
    expect(response.statusCode).toBe(200);
  });
});
