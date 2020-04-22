const assert = require('assert');
const request = require('supertest');
const app = require('../dist/src/app');
const { v4 } = require('uuid');
const mongoose = require('mongoose');
const ClientModel = mongoose.model('client');

it('Removes the client', (done) => {
  const test_client = new ClientModel({ name: 'test_client', id: v4() });
  test_client.save().then(() => {
    request(app)
      .delete(`/api/v1/clients/${test_client.id}`)
      .set('x-user-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWEyYzM0MTgyNWJiNDI1N2I0OTZhYiIsImVtYWlsIjoiYWRtaW5Ac2xhdnNhbG9uLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3NTA1OTc5fQ.vjrJpj-nKVEMpxnP5i8g0Ix_zgdXA5WEH9gROt9rXqs')
      .end(() => {
        ClientModel.findOne({ name: 'test_client' })
          .then(client => {
            assert(client === null);
            done();
          });
      });
  });
});
