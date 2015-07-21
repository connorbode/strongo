describe('delete', function () {
  it('deletes a document', function (done) {
    var insertedId;

    var onFound = function (result) {
      expect(result).to.be.null;
      done();
    };

    var onDeleted = function () {
      collection
        .findOne({ _id: insertedId })
        .then(onFound)
        .catch(helpers.catch);
    };

    var onInserted = function (inserted) {
      insertedId = inserted.insertedId;
      var id = insertedId.toString();
      var url = format('/test/{id}', { id: id });

      request
        .delete(url)
        .expect(204, onDeleted);
    };

    collection
      .insertOne({ num: 1 })
      .then(onInserted)
      .catch(helpers.catch);
  });

  it('returns 404 if the document id is not a valid object id', function (done) {
    request
      .delete('/test/1')
      .expect(404, done);
  });

  it('returns 404 if the document is not found', function (done) {
    request
      .delete('/test/55adc0b65be4ca622339a6b5')
      .expect(404, done);
  });
});