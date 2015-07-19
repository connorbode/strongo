var utils = require('./utils');
var create = function (collection) {
  return function (req, res) {
    var inserted = function (doc) {
      var id = doc.insertedId.toHexString();
      var resource = req.protocol + '://' + req.headers.host + req.originalUrl + '/' + id;

      res
        .set({ 'Location': resource })
        .status(201)
        .json({ url: resource, id: id })
        .end();
    };

    var error = function (err) {
      res.status(500).json(err).end();
    };

    collection
      .insertOne(req.body)
      .then(inserted)
      .catch(error);
  };
};

module.exports = create;