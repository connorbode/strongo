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

  it('cant find a document', function (done) {
    var url = '/test/507f191e810c19729de860ea';
    request
      .get(url)
      .expect(404, done);
  });

  it('receives an invalid object id', function (done) {
    request
      .get('/test/1')
      .expect(404, done);
  });
});