const assert = require('assert');
const request = require('supertest');
const app = require('../dist/src/app');
const mongoose = require('mongoose');
const ClientModel = mongoose.model('client');

describe('Clients controller', ()=> {
  it('creates one more client', (done) => {
    ClientModel.countDocuments().then(count => {
      request(app)
        .post('/api/v1/clients')
        .set('x-user-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWEyYzM0MTgyNWJiNDI1N2I0OTZhYiIsImVtYWlsIjoiYWRtaW5Ac2xhdnNhbG9uLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3NTA1OTc5fQ.vjrJpj-nKVEMpxnP5i8g0Ix_zgdXA5WEH9gROt9rXqs')
        .send({ name: 'test_client' })
        .end(() => {
          ClientModel.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
});
