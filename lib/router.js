var express = require('express');
var bodyParser = require('body-parser');
var objectIDValidator = require('./object-id-validator');

var StrongoRouter = function (collection, options) {
  
  var router = express.Router();
  router.use(bodyParser.json());

  router.get('/', require('./query')(collection, options));
  router.get('/:id', objectIDValidator, require('./get')(collection));
  router.post('/', require('./create')(collection));
  router.put('/:id', objectIDValidator, require('./update')(collection));
  router.delete('/:id', objectIDValidator, require('./delete')(collection));
  
  return router;
};
module.exports = StrongoRouter;