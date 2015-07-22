var utils = require('./utils');
var ObjectIDValidator = function (req, res, next) {
  if (req.params.id && !utils.isValidObjectID(req.params.id))
    res.status(404).end();
  else
    next();
};

module.exports = ObjectIDValidator;