var StrongoRouter = require('./lib/router.js');

var setDefaultOptions = function (options) {
  options.DEFAULT_LIMIT = options.DEFAULT_LIMIT || 10;
};

var Strongo = function (db, options) {
  var db = db;
  this.__name__ = 'Strongo';
  options = options || {};
  setDefaultOptions(options);

  this.collection = function (name) {
    var collection = db.collection(name);
    return StrongoRouter(collection, options);
  };
};

module.exports = Strongo;