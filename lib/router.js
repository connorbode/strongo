var express = require('express');
var StrongoRouter = function (collection, options) {
  var router = express.Router();
  router.get('/', require('./query')(collection, options));
  router.get('/:id', require('./get')(collection));
  // router.post('/', require('./create'));
  // router.put('/:id', require('./update'));
  // router.delete('/:id', require('./delete'));
  return router;
};
module.exports = StrongoRouter;