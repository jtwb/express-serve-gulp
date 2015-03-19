'use strict';


var serveGulp = require('serve-gulp');


function serveGulpMiddleware(config) {
  // BOOKMARK - if config is function, run with configurator and produce a config object

  var server = serveGulp(config);

  return function(req, res, next) {
    if (!server.accepts(req)) {
      next();
    }
    server.handle(req, res);
  }
}


module.exports = serveGulpMiddleware;
