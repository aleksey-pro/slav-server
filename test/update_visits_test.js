const assert = require('assert');
const request = require('supertest');
const app = require('../dist/src/app');
const { v4 } = require('uuid');
const crypto = require('../dist/src/utils/encrypt');
const mongoose = require('mongoose');
const ClientModel = mongoose.model('client');

it('eddits an existing client', (done) => {
  const test_client = new ClientModel({ name: 'test_client', id: v4() });
  test_client.save().then(() => {
    ClientModel.findOne({ name: 'test_client' }).then(initClient => {
      const encryptedId = crypto.encrypt(initClient.id);
      request(app)
        .get(`/api/v1/register/${encryptedId}`)
        .set('x-user-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWEyYzM0MTgyNWJiNDI1N2I0OTZhYiIsImVtYWlsIjoiYWRtaW5Ac2xhdnNhbG9uLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3NTA1OTc5fQ.vjrJpj-nKVEMpxnP5i8g0Ix_zgdXA5WEH9gROt9rXqs')
        .end(() => {
          ClientModel.findOne({ name: 'test_client' })
            .then(client => {
              assert(client.visits === initClient.visits + 1);
              done();
            });
        });      
    });
  });
});
