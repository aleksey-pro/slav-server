const mongoose = require('mongoose');

const options = {
 useFindAndModify: false,
};

before(done => {
  mongoose.connect('mongodb://localhost/muber_test', options);
  mongoose.connection
    .once('open', () => done()) // that is why we dont use 'else' in app.js when create db
    .on('error', () => {
      console.log('Warning', error);
    });
});

// каждый раз обнуляем тестовую базу перед тестом
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop() // происходит после того, как загружается PointSchema -> удаляются все индексы из базы,  в т.ч. координаты
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' })) // восстанавливает индекс при drop-е
    .then(() => done())
    .catch(() => done()); // первый раз коллекция может не создаться и её удаление приведет к ошибке
});
