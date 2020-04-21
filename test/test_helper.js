const mongoose = require('mongoose');

const options = {
 "useFindAndModify": false,
 "useNewUrlParser": true,
 "useUnifiedTopology": true,
 "user": "aleks",
 "pass": "7a068ae27", 
};

before(done => {
  mongoose.connect('mongodb://ds035016.mlab.com:35016/slavsalon_test', options);
  mongoose.connection
    .once('open', done())
    .on('error', () => {
      console.log('Warning');
    });
});

// каждый раз обнуляем тестовую базу перед тестом
beforeEach(done => {
  const { clients } = mongoose.connection.collections;
  clients.drop()
    .then(() => done())
    .catch(() => done()); // первый раз коллекция может не создаться и её удаление приведет к ошибке
});
