var utils = require('./utils');

var query = function (collection, options) {
  return function (req, res) {
    var offset = parseInt(req.query.offset) || parseInt(req.query.skip) || 0;
    var limit = parseInt(req.query.limit) || options.DEFAULT_LIMIT;
    var fields = {};
    var query = req.query.query || {};

    if (req.query.fields) {
      var fieldsArray = req.query.fields.split(',');
      fields = fieldsArray.reduce(function (result, val) {
        result[val] = 1;
        return result;
      }, {});
    }

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
      .find(query, fields)
      .skip(offset)
      .limit(limit)
      .each(each);
  };
};

module.exports = query;