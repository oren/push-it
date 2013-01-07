// core modules
var http = require('http');
var path = require("path");

// npm packages
var url = require("url");

// my modules
var router = require("./router.js");
var config = require("./config.js");
var decorate = require('./decorate.js')

var webSitePort = config.httpPort;

// request goes here
http.createServer(function(req, res) {
  decorate(req, res, config)

  var parsed = url.parse(req.url)
  var pathname = parsed.pathname
  var normalPathname = path.normalize(pathname).replace(/\\/g, '/');

  // multiple //// chars in the path are stupid and should not be,
  // nor should empty search queries, since that's just dumb.
  // make things a bit more canonical.
  if (pathname !== normalPathname || parsed.search === '?') {
    var tp = normalPathname
    if (parsed.query)
      tp += parsed.search
    return res.redirect(tp, 301)
  }

  var route = router.match(normalPathname);
  if (!route) return res.error(404)

  Object.keys(route).forEach(function (k) {
    req[k] = route[k]
  })

  route.fn(req, res)

}).listen(webSitePort);

console.log('website running. port ' + webSitePort);
