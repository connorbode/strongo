describe('query', function () {
  it('retrieves documents', function (done) {
    var docs = [
      { num: 1 },
      { num: 2 },
      { num: 3 }
    ];

    var queryDocs = function (results) {
      var results = results.ops.map(function (op) {
        op._id = op._id.toString();
        return op;
      });

      request
        .get('/test')
        .expect('Content-Type', /json/)
        .expect(results)
        .expect(200, done);
    };

    collection
      .insertMany(docs)
      .then(queryDocs)
      .catch(helpers.catch);
  });
});