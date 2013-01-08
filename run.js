module.exports = run;

function run(data, socket) {
  var spawn = require('child_process').spawn;

  function runIt() {
    var deploy = spawn('deploy', ['--chdir', '/Users/ogolan/projects/push', data.host, 'run', data.command]);

    deploy.stdout.on('data', function (data) {
      console.log('run stdout: ' + data);
      socket.emit('run-progress', { msg: data.toString(), type: 'stdout' });
    });

    deploy.stderr.on('data', function (data) {
      console.log('run stderr: ' + data);
      socket.emit('run-progress', { msg: data.toString(), type: 'stderr' });
    });

    deploy.on('exit', function (code) {
      console.log('run process exited with code ' + code);
      // socket.emit('done', { msg: 'deploy processs was exit with code ' + code, code: code });
    });
  };

  runIt();
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
