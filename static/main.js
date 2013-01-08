$(function () {

  var socket = io.connect('http://localhost:3000');

  socket.on('start', function (data) {
    $('.console').append('<div><b>' + data.msg + '</b></div><br />');
  });

  socket.on('progress', function (data) {
    if (data.type === 'stderr') {
      $('.console').append('<div class="red">' + data.msg + '</div>');
    } else {
      $('.console').append('<div>' + data.msg + '</div>');
    }
  });

  socket.on('done', function (data) {
    if (data.code === 0) {
      $('.console').append('<div class="green">' + data.msg + '</div>');
    } else {
      $('.console').append('<div class="red">' + data.msg + '</div>');
    }
  });

  $('.dev1').click(function() {
   $('.console').empty();
    socket.emit('deploy', { project: 'push', host: 'dev1' });
  });

  $('.dev2').click(function() {
   $('.console').empty();
    socket.emit('deploy', { project: 'push', host: 'dev2' });
  });

});

