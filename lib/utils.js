var utils = {
  docToJson: function (doc) {
    doc._id = doc._id.toHexString();
    return doc;
  },

  isValidObjectID: function (id) {
    var pattern = /^[0-9a-fA-F]{24}$/;
    return id.match(pattern) !== null;
  }
};

module.exports = utils;