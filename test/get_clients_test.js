const assert = require('assert');
const http = require('http');
const request = require('supertest');
const app = require('../dist/src/app');

describe('Clients controller', ()=> {
  it('gets all clients', (done) => {
    request(app)
      .get('/api/v1/clients')
      .set('x-user-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWEyYzM0MTgyNWJiNDI1N2I0OTZhYiIsImVtYWlsIjoiYWRtaW5Ac2xhdnNhbG9uLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3NTA1OTc5fQ.vjrJpj-nKVEMpxnP5i8g0Ix_zgdXA5WEH9gROt9rXqs')
      .end((err, response) => {
        console.log(response.body.length);
        // const clientsList = response.body;
        // assert(clientsList.length > )
        done();
      });
  });
});
