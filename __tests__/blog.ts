import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import dotenv from 'dotenv';
dotenv.config();
const ENV_db_URL = process.env.MONGODB_TEST_URI || '';
const DB_Password = process.env.MONGODB_PASSWORD || '';
const DB_url = ENV_db_URL.replace('<password>', DB_Password);
console.log(DB_url);
//testing coverage should be atleast 70 or 80%

beforeAll(async () => {
  await mongoose.connect(DB_url);
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Testing API', () => {
  it('/api/* for 404', async () => {
    const response = await supertest(app).get('/api/*');
    expect(response.statusCode).toBe(404);
  });
  it('getting All posts/blogs', async () => {
    const response = await supertest(app).get('/api/posts');
    expect(response.body.message).toContain('Posts Fetched Successfully');
  });

  const payload: {
    email: string;
    password: string;
  } = {
    email: 'elyse@gmail.com',
    password: '123456',
  };

  let singlePost: any;

  it('posting A blog or any thing', async () => {
    const res = await supertest(app)
      .post('/api/posts')
      .send({
        title: 'intergation',
        content: 'Testing',
      })
      .set('email', payload.email)
      .set('password', payload.password);
    singlePost = res.body.data;
    expect(res.body.message).toContain('Post Created Successfully');
  });

  it('Getting single post or fetch', async () => {
    const response = await supertest(app).get(`/api/posts/${singlePost._id}`);
    expect(response.statusCode).toBe(200);
  });

  it('getting Blog Comments', async () => {
    const response = await supertest(app)
      .get(`/api/posts/${singlePost._id}/comments`)
      .set('email', payload.email)
      .set('password', payload.password);
    expect(response.statusCode).toBe(200);
  });
});


describe('Auth Testing', () => {
  it('if user not found', async () => {
    const payload: {
      email: string;
      password: string;
    } = {
      email: '',
      password: '',
    };
    const res = await supertest(app).post('/api/posts').send({
      title: '',
      content: '',
    });
    expect(res.statusCode).toBe(404);
  });
  it('if user have invalide Emaill', async () => {
    const payload: {
      email: string;
      password: string;
    } = {
      email: 'elyse@gmail.com',
      password: '12345',
    };
    const res = await supertest(app)
      .post('/api/posts')
      .send({
        title: '',
        content: '',
      })
      .set('email', payload.email)
      .set('password', payload.password);
    expect(res.statusCode).toBe(401);
  });
  it('if user unauthorized', async () => {
    const payload: {
      email: string;
      password: string;
    } = {
      email: 'john@yahoo.fr',
      password: '123456',
    };
    const res = await supertest(app)
      .post('/api/posts')
      .send({
        title: '',
        content: '',
      })
      .set('email', payload.email)
      .set('password', payload.password);
    expect(res.statusCode).toBe(403);
  });
});

