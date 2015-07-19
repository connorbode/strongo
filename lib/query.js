var utils = require('./utils');

var query = function (collection, options) {
  return function (req, res) {
    var offset = req.query.offset || req.query.skip || 0;
    var limit = req.query.limit || options.DEFAULT_LIMIT;

    var docs = [];
    var error;

    var each = function (err, doc) {
      if (err) error = err;

      if (doc) {
        jsonDoc = utils.docToJson(doc);
        docs.push(jsonDoc);
      }
      else
        done();
    };

    var done = function () {
      if (error)
        res.status(500).json(error).end();
      else
        res.status(200).json(docs).end();
    };

    collection
      .find()
      .skip(offset)
      .limit(limit)
      .each(each);
  };
};

module.exports = query;