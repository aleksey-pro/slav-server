const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({hi: 'there'});
  },


  index(req, res, next) {
    const { lat, lng } = req.query; // 'http://google.com?lng=80&ltd=20'

    // Doesn't works with mongoose 5
    // Driver.geoNear(
    //   { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, // parseFloat converts string from query into numbers (comes as strings)
    //   { spherical: true, maxDistance: 200000 }, // 20km
    // )
    // https://medium.com/optional-type/geonear-and-mongo-c58039f3adb7
    Driver.aggregate([
        {
            $geoNear: {
                near: {
                  type: 'Point',
                  coordinates: [parseFloat(lng), parseFloat(lat)],
                },
                distanceField: "dist.calculated",
                maxDistance: 200000,
                spherical: true
            }
        }
    ])
    .then(drivers => res.send(drivers))
    .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps) //MyModel.create(docs) does new MyModel(doc).save() for every doc in docs. Triggers the save() hook.
      .then((driver) => {
        res.send(driver);
      })
      .catch(next); // выдаст нужный объект ошибки - мы поймем в каком месте ошибка, то есть передаст request в middleware, перехватывающий нашу ошибку
  },

  edit(req, res, next) {
    const driverId = req.params.id; // match name after :
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ id:  driverId}))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findOneAndDelete({ _id: driverId })
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  },

};
