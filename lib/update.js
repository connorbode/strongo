var ObjectID = require('mongodb').ObjectID;
var utils = require('./utils');
var update = function (collection) {
  return function (req, res) {
    var id = ObjectID(req.params.id);

    var onUpdated = function (result) {
      if (!result.value)
        res.status(404).end();
      
      res.status(200).json(result.value).end();
    };

    var onError = function (err) {

    };

    collection
      .findOneAndUpdate({ _id: id }, { $set: req.body }, { returnOriginal: false })
      .then(onUpdated)
      .catch(onError);
  };
};
module.exports = update;