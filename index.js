'use strict';


var path = require('path');
var _ = require('underscore');
var serveGulp = require('serve-gulp');


// BOOKMARK - serve-gulp API must select internal gulpfile if none given
// BOOKMARK - specify local gulpfile if it exists
// BOOKMARK - basedir
var DEFAULTS = {
  basedir: path.resolve('.'),
  restrict: path.resolve(',')
};


function isString(x) {
  return x instanceof String || typeof x === 'string';
}
function isArray(x) {
  return x instanceof Array;
}
function isFunction(x) {
  return x instanceof Function;
}
function isObject(x) {
  return typeof x === 'object';
}


function readGulpfilePath() {
  var local_gulpfile_found;
  try {
    local_gulpfile_found = fs.statSync(path.resolve('./gulpfile.js'));
  } catch(e) { }
  return local_gulpfile_found ? 'gulpfile.js' : path.join(__dirname, './node_modules/serve-gulp/gulpfile.js')
}


function resolveConfig(config) {
  if (false && isFunction(config)) {
    /* Interpret as configurator callback */
    config(configurator);
    config = unpackConfigurator(configurator);
  }

  if (isString(config)) {
    /* Interpret as single allow path */
    config = {
      restrict: [ config ]
    }
  }

  if (isArray(config)) {
    /* Interpret as list of allow paths */
    config = { restrict: config }
  }

  return config;
}


function serveGulpMiddleware(config) {
  config = resolveConfig(config);
  _.defaults(config, DEFAULTS);

  if (!config.gulpfile) {
    /* Default to user gulpfile, then library gulpfile */
    config.gulpfile = readGulpfilePath();
  }

  var handler = serveGulp.handler(config);

  return function serve(req, res, next) {
    if (!handler.accepts(req)) {
      return next();
    }
    handler.handleRequest(req, res);
  }
}


module.exports = serveGulpMiddleware;
