module.exports = deploy;

function deploy(data, socket) {
  var spawn = require('child_process').spawn;

  function pushIt() {
    var deploy = spawn('deploy', ['--chdir', '/Users/ogolan/projects/push', data.host]);

    deploy.stdout.on('data', function (data) {
      console.log('deploy stdout: ' + data);
      socket.emit('progress', { msg: 'sdtout:' + data });
    });

    deploy.stderr.on('data', function (data) {
      console.log('deploy stderr: ' + data);
      socket.emit('progress', { msg: 'stderr: ' + data });
    });

    deploy.on('exit', function (code) {
      console.log('deploy process exited with code ' + code);
      socket.emit('progress', { msg: 'deploy processs was exit with code ' + code });
    });
  };

  pushIt();
};

// potential errors:
// deploy stderr: execvp(): No such file or directory
//
// run mongroup
// cd /Users/ogolan/projects/push
// push : 28413 : alive : uptime 5 hours
