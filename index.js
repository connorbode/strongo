var StrongoRouter = require('./lib/router.js');

var Strongo = function (db) {
  var db = db;
  this.__name__ = 'Strongo';

  this.collection = function (name) {
    var collection = db.collection(name);
    return new StrongoRouter(collection);
  };
};

module.exports = Strongo;