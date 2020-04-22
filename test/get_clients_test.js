const assert = require('assert');
const request = require('supertest');
const app = require('../dist/src/app');
const { v4 } = require('uuid');
const mongoose = require('mongoose');
const ClientModel = mongoose.model('client');

describe('Clients controller', ()=> {
  it('gets a client from DB', (done) => {
    const test_client = new ClientModel({ name: 'test_client', id: v4() });
    test_client.save()
      .then(() => {
        request(app)
          .get('/api/v1/clients')
          .set('x-user-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWEyYzM0MTgyNWJiNDI1N2I0OTZhYiIsImVtYWlsIjoiYWRtaW5Ac2xhdnNhbG9uLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3NTA1OTc5fQ.vjrJpj-nKVEMpxnP5i8g0Ix_zgdXA5WEH9gROt9rXqs')
          .end((err, response) => {
            const clientsList = response.body;
            assert(clientsList.length > 0)
            done();
          });
      });
  });
});
