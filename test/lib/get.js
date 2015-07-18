describe('get', function () {
  it('retrieves a document', function (done) {
    var doc = { fake: 'test' };

    var handleInserted = function (result) {
      var id = result.insertedId.toString();
      var url = format('/test/{id}', { id: id });
      doc._id = id;
      request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(doc)
        .expect(200, done);
    };

    collection
      .insertOne(doc)
      .then(handleInserted)
      .catch(helpers.catch);
  });
});