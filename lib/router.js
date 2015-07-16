var express = require('express');
var StrongoRouter = function (collection) {
  var router = express.Router();
  router.get('/', require('./query'));
  router.get('/:id', require('./get'));
  router.post('/', require('./create'));
  router.put('/:id', require('./update'));
  router.delete('/:id', require('./delete'));
};
module.exports = StrongoRouter;