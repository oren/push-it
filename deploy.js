module.exports = deploy;

function deploy(data, socket) {
  var spawn = require('child_process').spawn;

  function pushIt() {
    var deploy = spawn('deploy', ['--chdir', '/Users/ogolan/projects/push', data.host]);

    deploy.stdout.on('data', function (data) {
      console.log('deploy stdout: ' + data);
      socket.emit('progress', { msg: data.toString(), type: 'stdout' });
    });

    deploy.stderr.on('data', function (data) {
      console.log('deploy stderr: ' + data);
      socket.emit('progress', { msg: data.toString(), type: 'stderr' });
    });

    deploy.on('exit', function (code) {
      console.log('deploy process exited with code ' + code);
      socket.emit('done', { msg: 'deploy processs was exit with code ' + code, code: code });
    });
  };

  pushIt();
};

// potential errors:
//1) deploy stderr: execvp(): No such file or directory
//
//2) stderr: ssh: Could not resolve hostname push.np.wc1.yellowpages.com: nodename nor servname provided, or not known
// stderr: pre-deploy hook failed
// sdtout:
// deploy processs was exit with code 1
//
// run mongroup
// cd /Users/ogolan/projects/push
// push : 28413 : alive : uptime 5 hours
