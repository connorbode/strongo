var ObjectID = require('mongodb').ObjectID;
var utils = require('./utils');
var get = function (collection) {
  return function (req, res) {
    var id = ObjectID(req.params.id);
    collection.findOne({
        _id: id
      })
      .then(function (doc) {
        var jsonDoc = utils.docToJson(doc);
        res.status(200).json(jsonDoc).end();
      });
  };
};
module.exports = get;