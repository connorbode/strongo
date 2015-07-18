var colors = require('colors');
var mongodb = require('mongodb');
var express = require('express');
var supertest = require('supertest');
var Strongo = require('../index.js');
var MongoClient = mongodb.MongoClient;
global.chai = require('chai');
global.should = chai.should();
global.Promise = require('es6-promise').Promise;
global.format = require('string-template');

global.helpers = {
  rageQuit: function (err) {
    console.log(err.red);
    console.log('bye.');
    console.log();
    process.exit(0);
  },

  catch: function (err) {
    var error = "CAUGHT EXCEPTION:\n" + err;
    helpers.rageQuit(error);
  }
};

if (!process.env.MONGO_URL) {
  var error = 'MONGO_URL environment variable must be defined to run tests';
  helpers.rageQuit(error);
}

var handleDbConnected = function (db) {
  global.db = db;
  return Promise.resolve();
};

var createCollection = function () {
  global.strongo = new Strongo(db);
  global.app = express();
  return db.createCollection('test');
};

var handleCollectionCreated = function (collection) {
  global.collection = collection;
  app.use('/test', strongo.collection('test'));
  global.request = supertest(app);
  return Promise.resolve();
};

before(function (done) {
  MongoClient
    .connect(process.env.MONGO_URL)
    .then(handleDbConnected)
    .then(done)
    .catch(helpers.catch);
});

beforeEach(function (done) {
  createCollection()
    .then(handleCollectionCreated)
    .then(done)
    .catch(helpers.catch);
});

var closeDb = function () {
  db.close();
  return Promise.resolve();
};

afterEach(function (done) {
  db.dropDatabase()
    .then(function () {
      done();
    })
    .catch(helpers.catch);
});

after(function (done) {
  closeDb()
    .then(done)
    .catch(helpers.catch);
});