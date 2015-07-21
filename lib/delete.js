var ObjectID = require('mongodb').ObjectID;

var Delete = function (collection) {
  return function (req, res) {
    var id = ObjectID(req.params.id);

    var deleted = function () {
      res.status(204).end();
    };

    var caughtError = function (err) {
      res.status(500).json(err).end();
    };

    collection
      .findOneAndDelete({ _id: id })
      .then(deleted)
      .catch(caughtError);
  };
};
module.exports = Delete;