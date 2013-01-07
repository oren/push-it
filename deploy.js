module.exports = deploy;

function deploy(data, socket) {

  var exec = require('child_process').exec;
  var child;

  function pushIt(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  };

  child = exec('cd /Users/ogolan/projects/push && deploy ' + data.host, pushIt);

  socket.emit('progress', { msg: 'completed deployment to ' + data.host });

};
