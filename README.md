# express-serve-gulp

With **express-serve-gulp**,

* You do not need to install `gulp`
* You do not need to run `gulp watch`

In this example, requests to the webserver matching `^/assets/` are transpiled and served on-the-fly. If your project root contains a file named **gulpfile.js**, tasks from that file are used to process assets; otherwise there is a built-in Gulpfile. See [#Bring your own Gulpfile](https://github.com/jtwb/serve-gulp#bring-your-own-gulpfile) and [#Default Gulpfile](https://github.com/jtwb/serve-gulp#default-gulpfile).

See [serve-gulp](https://github.com/jtwb/serve-gulp) for detailed docs.


```javascript
'use strict';

var path = require('path');
var express = require('express');
var serve_gulp = require('express-serve-gulp');
var morgan = require('morgan');
var app = express();


app.use(morgan('combined'));
app.use(serve_gulp(path.resolve('./assets/')))


app.get('/', function(req, res) {
  res.send({ status: 'ok' });
});


var server = app.listen(9180, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Requests to http://%s:%s/assets/* will be processed by gulp on the fly', host, port)

});
```
