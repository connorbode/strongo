describe('create', function () {
  it('inserts a document', function (done) {

    var urlMatcher = /\/test\/[a-fA-F0-9]{24}/;
    var ObjectID = require('mongodb').ObjectID;

    var onFound = function (doc) {
      doc.num.should.equal(1);
      done();
    };

    var onCreated = function (err, res) {
      var url = res.body.url;
      var id = ObjectID(res.body.id);
      url.should.match(urlMatcher);

      collection
        .findOne({ _id: id })
        .then(onFound)
        .catch(helpers.catch);
    };

    request
      .post('/test')
      .send({ num: 1 })
      .expect('Content-Type', /json/)
      .expect('Location', urlMatcher)
      .expect(201)
      .end(onCreated);
  });
});