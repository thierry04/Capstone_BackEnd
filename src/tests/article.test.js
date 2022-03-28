/* eslint-disable no-underscore-dangle */
import request from "supertest";
import mocha from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import fs from "fs";
import "dotenv/config";
import app from "../index";
import cloudinary from "../config/cloudinary";
import articleServices from "../services/article.service";
import { createdUser, userCredentials } from "./mock/mock";

const { deleteManyArticle, createArticle } = articleServices;
const { beforeEach, afterEach, describe, it } = mocha;

const mockArticle = {
  title: "this is the title for testing is okay happening",
  content:
    "hello this is working on your end of testing this should be working and I do not know why",
  imageUrl:
    "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png",
  cloudinary_id: "23ref4454232ktu4573",
};

const mockArticleDelete = {
  title: 'this is the title for testing is okay happening deleted',
  content:
    'hello this is working on your end of testing this should be working and I do not know why',
  imageUrl:
    'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
  cloudinary_id: '23ref4454232ktu4573',
};
describe('unknown route', () => {
  it('should return not found(any request)', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
    expect(res.body).to.be.have.property('message');
  });
});
describe('article related tests', async () => {
  const sandBox = sinon.createSandbox();
  beforeEach(async () => {
    await deleteManyArticle({});
    sandBox.stub(cloudinary.uploader, 'upload').resolves({
      imageUrl:
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    });
  });
  afterEach(async () => {
    await deleteManyArticle({});
    sandBox.restore();
  });
  it('should create a posts when no token provided', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `${loggedIn.body.data.token}`,
    };
    const res = await request(app)
      .post('/api/v1/posts')
      .set('content-type', 'multipart/form-data')
      .field('title', mockArticle.title)
      .field('content', mockArticle.content)
      .attach(
        'imageUrl',
        fs.readFileSync(`${__dirname}/weatherApp.png`),
        './tests/weatherApp.png'
      )
      .set('Authorization', data.token);
    expect(res.status).to.be.equal(401);
  });
  it('should create a post when provided with token', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const res = await request(app)
      .post('/api/v1/posts')
      .set('authorization', data.token)
      .set('content-type', 'multipart/form-data')
      .field('title', mockArticle.title)
      .field('content', mockArticle.content)
      .attach(
        'imageUrl',
        fs.readFileSync(`${__dirname}/weatherApp.png`),
        './tests/weatherApp.png'
      );
    expect(res.status).to.be.equal(201);
  });
  it('should find all a posts', async () => {
    const post = await createArticle(mockArticle);
    post.save();

    const res = await request(app).get('/api/v1/posts');
    expect(res.status).to.be.equal(200);
  });
  it('should not find all a posts', async () => {
    const post = await createArticle(mockArticle);
    post.save();

    const res = await request(app).get('/api/v1/postss');
    expect(res.status).to.be.equal(404);
  });
  it('should find an article by an id', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    // eslint-disable-next-line no-underscore-dangle
    const res = await request(app).get(`/api/v1/posts/${post._id}`);
    expect(res.status).to.be.equal(200);
  });
  it('should not create a post if title already exists', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app)
      .post('/api/v1/posts')
      .set('authorization', data.token)
      .set('content-type', 'multipart/form-data')
      .field('title', mockArticle.title)
      .field('content', mockArticle.content)
      .attach(
        'imageUrl',
        fs.readFileSync(`${__dirname}/weatherApp.png`),
        './tests/weatherApp.png'
      );
    expect(res.status).to.be.equal(500);
  });
  it('should not create a post if title already exists', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app)
      .post('/api/v1/posts')
      .set('authorization', data.token)
      .set('content-type', 'multipart/form-data')
      .field('title', mockArticle.title)
      .field('content', mockArticle.content)
      .attach(
        'image',
        fs.readFileSync(`${__dirname}/weatherApp.png`),
        './tests/weatherApp.png'
      );
    expect(res.status).to.be.equal(500);
  });
  it('should not create a post if a fields is missing', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app)
      .post('/api/v1/posts')
      .set('authorization', data.token)
      .set('content-type', 'multipart/form-data')
      .field('title', mockArticle.title)
      .field('contents', mockArticle.content)
      .attach(
        'imageUrl',
        fs.readFileSync(`${__dirname}/weatherApp.png`),
        './tests/weatherApp.png'
      );
    expect(res.status).to.be.equal(409);
  });
  it('should fail to create an article', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app)
      .post('/api/v1/postss')
      .set('authorization', data.token)
      .set('content-type', 'multipart/form-data')
      .field('title', mockArticle.title)
      .field('contents', mockArticle.content)
      .attach(
        'imageUrl',
        fs.readFileSync(`${__dirname}/weatherApp.png`),
        './tests/weatherApp.png'
      );
    expect(res.status).to.be.equal(404);
  });
  it('should not update an article if no token provided', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    // eslint-disable-next-line no-underscore-dangle
    const res = await request(app).put(`/api/v1/posts/${post._id}`).send({
      title: 'hello dear sir are you okay',
      content: 'this is going to work',
    });
    expect(res.status).to.be.equal(401);
  });

  it('should not update article if title or content does not match the length', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app)
      .put(`/api/v1/posts/${post._id}`)
      .set('authorization', data.token)
      .send({
        title: 'ar',
        content: 'hello dear are you there for this company',
      });
    expect(res.status).to.be.equal(400);
  });
  it('should not delete an article when no token provided', async () => {
    const post = await createArticle(mockArticle);
    post.save();
    const res = await request(app).delete(`/api/v1/posts/${post._id}`);
    expect(res.status).to.be.equal(401);
  });

  it('should fail to delete an article not found', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const loggedIn = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${loggedIn.body.data.token}`,
    };
    const post = await createArticle(mockArticleDelete);
    post.save();
    const res = await request(app)
      .delete(`/api/v1/postss/${post._id}`)
      .set('authorization', data.token);
    expect(res.status).to.be.equal(404);
  });
});
