/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mocha from 'mocha';
import { expect } from 'chai';
import 'dotenv/config';
import app from '../index';
import userService from '../services/user.service';
import { createdUser, userCredentials } from './mock/mock';

const { registerUser, deleteUsers } = userService;
const { beforeEach, afterEach, describe, it } = mocha;

const updateUser = {
  userName: 'Richard Jule',
  email: 'julebi@gmail.com',
  password: 'hellorichmunye',
};
describe('user testing', () => {
  beforeEach(async () => {
    await deleteUsers({});
  });
  afterEach(async () => {
    await deleteUsers({});
  });
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/v1/users/register')
      .send(createdUser);
    expect(res.status).to.be.equal(201);
  });
  it('should not register a user', async () => {
    const res = await request(app)
      .post('/api/v1/users/registers')
      .send(createdUser);
    expect(res.status).to.be.equal(404);
  });
  it('should not create user with email already registered,async', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app)
      .post('/api/v1/users/register')
      .send(createdUser);
    expect(res.status).to.be.equal(400);
  });
  it('should not register a user if all fields are not filled', async () => {
    const res = await request(app)
      .post('/api/v1/users/register')
      .send({ email: 'richmunye@gmail.com' });
    expect(res.status).to.be.equal(400);
  });
  it('should log in the user', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(userCredentials);
    expect(res.status).to.be.equal(200);
  });
  it('should not log in a user if credentials are not provided', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'richardmunyemana', password: 'test123' });
    expect(res.status).to.be.equal(400);
  });
  it('should not login a user if credentials does not match', async () => {
    await request(app).post('/api/v1/users/register').send(createdUser);
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'richmunye@gmail.com', password: 'test567' });
    expect(res.status).to.be.equal(401);
  });
  it('should find users registered ', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app).get('/api/v1/users');
    expect(res.status).to.be.equal(200);
  });
  it('should find a user with a provided id', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app).get(`/api/v1/users/${user._id}`);
    expect(res.status).to.be.equal(200);
  });
  it('should fail to find a user ', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app).get(`/api/v1/userss/${user._id}`);
    expect(res.status).to.be.equal(404);
  });
  it('should delete a user if found', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app).delete(`/api/v1/users/${user._id}`);
    expect(res.status).to.be.equal(204);
  });
  it('should not delete a user if found', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app).delete(`/api/v1/userss/${user._id}`);
    expect(res.status).to.be.equal(404);
  });
  it('should not update a user ', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app)
      .put(`/api/v1/users/${user._id}`)
      .send({ userName: 'Jules', password: 'test5678' });
    expect(res.status).to.be.equal(400);
  });

  it('should update a user ', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app)
      .put(`/api/v1/users/${user._id}`)
      .send(updateUser);
    expect(res.status).to.be.equal(200);
  });
  it('should fail to update user', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app)
      .put(`/api/v1/userss/${user._id}`)
      .send({ email: 'srichardmunyemana' });
    expect(res.status).to.be.equal(404);
  });
  it('should fail to update user if field does not exist', async () => {
    const user = await registerUser(createdUser);
    user.save();
    const res = await request(app)
      .put(`/api/v1/users/${user._id}`)
      .send({ email: 'srichardmunyemana' });
    expect(res.status).to.be.equal(400);
  });
});
