exports.env = process.env.NODE_ENV || 'development';
exports.host = 'localhost'
exports.httpPort = 3000
exports.cluster = { size : require("os").cpus().length }

// bunyan config
exports.log =
  { name: 'push-it'
  , level: 'trace'
  }

exports.errorPage = { debug: true }

exports.debug = true

exports.emailFrom = '"The deployer robot" <push-it@test.com>'

exports.templateOptions = {
  cache: !exports.nocache
}

if (module === require.main) {
  // just show the configs
  console.log(exports)
  process.exit(0)
}
