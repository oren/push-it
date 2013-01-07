// core modules
var http = require('http');
var path = require("path");

// npm packages
var url = require("url");
var app = http.createServer(handler);
var io = require('socket.io').listen(app);

// my modules
var router = require("./router.js");
var config = require("./config.js");
var decorate = require('./decorate.js')
var webSitePort = config.httpPort;
var deploy = require('./deploy.js');

app.listen(webSitePort);

// request goes here
function handler(req, res) {
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
};

io.sockets.on('connection', function (socket) {

  socket.on('deploy', function (data) {
    console.log('deploying', data);
    socket.emit('progress', { msg: 'start deploying to ' + data.host });
    deploy(data, socket);
  });

});

console.log('website running. port ' + webSitePort);
