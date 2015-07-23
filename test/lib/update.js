describe('update', function () {
  it('updates the document', function (done) {
    var doc = { num: 1, name: 'test' };

    var handleInserted = function (result) {
      var id = result.insertedId.toString();
      var url = format('/test/{id}', { id: id });

      request
        .put(url)
        .send({ name: 'not-a-test' })
        .expect({ num: 1, name: 'not-a-test', _id: id })
        .expect(200, done);
    };

    collection
      .insertOne(doc)
      .then(handleInserted)
      .catch(helpers.catch);
  });
});