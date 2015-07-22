var ObjectID = require('mongodb').ObjectID;
var utils = require('./utils');

var get = function (collection) {
  return function (req, res) {
    var foundDoc = function (doc) {
      if (!doc) return res.status(404).end();
      var jsonDoc = utils.docToJson(doc);
      res.status(200).json(jsonDoc).end();
    };

    var handleErr = function (err) {
      res.status(500).end();
    };
    
    var id = ObjectID(req.params.id);

    collection
      .findOne({ _id: id })
      .then(foundDoc)
      .catch(handleErr);
  };
};
module.exports = get;