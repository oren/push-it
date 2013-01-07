$(function () {

  var socket = io.connect('http://localhost:3000');
  socket.on('progress', function (data) {
    console.log(data);
  });

  $('.dev1').click(function() {
    socket.emit('deploy', { project: 'push', host: 'dev1' });
  });

  $('.dev2').click(function() {
    socket.emit('deploy', { project: 'push', host: 'dev2' });
  });

});

