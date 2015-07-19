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

  it('retrieves a limited number of documents', function (done) {
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

      results.pop();

      request
        .get('/test?limit=2')
        .expect(results)
        .expect(200, done);
    };

    collection 
      .insertMany(docs)
      .then(queryDocs)
      .catch(helpers.catch);
  });

  it('retrieves a documents by an offset', function (done) {
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

      results.splice(0, 1);

      request
        .get('/test?offset=1')
        .expect(results)
        .expect(200, done);
    };

    collection
      .insertMany(docs)
      .then(queryDocs)
      .catch(helpers.catch);
  });
});