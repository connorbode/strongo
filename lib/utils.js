var utils = {
  docToJson: function (doc) {
    doc._id = doc._id.toHexString();
    return doc;
  }
};

module.exports = utils;