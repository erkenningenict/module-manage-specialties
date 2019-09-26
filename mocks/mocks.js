const ngApimock = require('ng-apimock')();

ngApimock.run({
  src: 'mocks/*',
  outputDir: '.tmp/mocks',
  done: function() {
    console.log('produced initial mocks');
  },
});

ngApimock.watch('mocks');

(function serve() {
  const http = require('http'),
    connect = require('connect'),
    ngApiMockRequest = require('ng-apimock/lib/utils').ngApimockRequest;

  const app = connect();

  app.use(ngApiMockRequest);
  app.use('/mocking', require('serve-static')('.tmp/mocks'));

  http.createServer(app).listen(3000);
})();
