var express = require('express');
var bodyParser = require('body-parser');

var StrongoRouter = function (collection, options) {
  
  var router = express.Router();
  router.use(bodyParser.json());

  router.get('/', require('./query')(collection, options));
  router.get('/:id', require('./get')(collection));
  router.post('/', require('./create')(collection));
  // router.put('/:id', require('./update'));
  router.delete('/:id', require('./delete')(collection));
  
  return router;
};
module.exports = StrongoRouter;