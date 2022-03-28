/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mocha from 'mocha';
import { expect } from 'chai';
import 'dotenv/config';
import app from '../index';
import commentsService from '../services/comment.service';
import articleServices from '../services/article.service';
import queryMessage from '../services/query.service';
import { createdUser, userCredentials } from './mock/mock';

const { describe, afterEach, beforeEach, it } = mocha;
const { deleteAllComments } = commentsService;
const { deleteAllQueries } = queryMessage;
const { deleteManyArticle, createArticle } = articleServices;

const mockArticle = {
  title: 'this is the title for testing is okay happening',
  content:
    'hello this is working on your end of testing this should be working and I do not know why',
  imageUrl:
    'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
  cloudinary_id: '23ref4454232ktu4573',
};
const comments = {
  name: 'Richard',
  comment: 'hello there',
};
describe('comments testing', () => {
  beforeEach(async () => {
    await deleteAllComments({});
    await deleteManyArticle({});
    await deleteAllQueries({});
  });
  afterEach(async () => {
    await deleteAllComments({});
    await deleteManyArticle({});
    await deleteAllQueries({});
  });
  it('should create comment', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app)
      .post(`/api/v1/${post._id}/comment`)
      .send(comments);
    expect(res.status).to.be.equal(201);
  });
  it('should not create comment if field is not filled', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app)
      .post(`/api/v1/${post._id}/comment`)
      .send({ name: 'Richard', comment: '' });
    expect(res.status).to.be.equal(400);
  });
  it('should not comment if post not found', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app).post(`/api/v1/postss/${post._id}/comment`);
    expect(res.status).to.be.equal(404);
  });
  it('should get all comments', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app).get(`/api/v1/${post._id}/all-comments`);
    expect(res.status).to.be.equal(200);
  });
  it('should create a query for the admin', async () => {
    const res = await request(app).post('/api/v1/queries/send-message').send({
      guestName: 'Richard',
      email: 'richmunye@gmail.com',
      message: 'hello richard are doing good?',
    });
    expect(res.status).to.be.equal(201);
  });
  it('should not create a query for the admin if there is a field missing', async () => {
    const res = await request(app).post('/api/v1/queries/send-message').send({
      guestName: 'Richard',
      email: '',
      message: 'hello richard are doing good?',
    });
    expect(res.status).to.be.equal(400);
  });
  it('should retrieve all queries sent', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const res = await request(app)
      .get('/api/v1/queries/all-messages')
      .set('authorization', data.token);
    expect(res.status).to.be.equal(200);
  });
  it('should not retrieve all queries sent', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const res = await request(app)
      .get('/api/v1/queries/all-messagess')
      .set('authorization', data.token);
    expect(res.status).to.be.equal(404);
  });
  it('should be able to like an article', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app).post(`/api/v1/post/${post._id}/likes`);
    expect(res.status).to.be.equal(200);
  });
  it('should not be able to like an article', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app).post(`/apii/v1/posts/${post._id}/likes`);
    expect(res.status).to.be.equal(404);
  });
});
