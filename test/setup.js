var colors = require('colors');
var mongodb = require('mongodb');
var Promise = require('es6-promise').Promise;
var MongoClient = mongodb.MongoClient;
global.chai = require('chai');
global.should = chai.should();

if (!process.env.MONGO_URL) {
  var error = 'MONGO_URL environment variable must be defined to run tests';
  console.log(error.red);
  console.log('bye.');
  console.log();
  process.exit(0);
}

var handleDbConnected = function (db) {
  global.db = db;
  return db.createCollection('test');
};

var handleCollectionCreated = function (collection) {
  global.collection = collection;
  return Promise.resolve();
};

beforeEach(function (done) {
  MongoClient
    .connect(process.env.MONGO_URL)
    .then(handleDbConnected)
    .then(handleCollectionCreated)
    .then(done)
    .catch(function (err) {
      throw err;
    });
});

var closeDb = function () {
  db.close();
  return Promise.resolve();
};

afterEach(function (done) {
  db.dropDatabase()
    .then(closeDb)
    .then(done)
    .catch(function (err) {
      throw err;
    });
});