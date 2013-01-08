$(function () {

  var socket = io.connect('http://localhost:3000');

  // deploy events
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

  // run events
  socket.on('run-progress', function (data) {
    if (data.type === 'stderr') {
      $('.console').append('<div class="red">' + data.msg + '</div>');
    } else {
      $('.console').append(data.msg);
    }
  });

  // UI events
  $('.dev1').click(function() {
    $('.console').empty().removeClass('hidden');
    var command = $('.run input').val();
    
    if (command === '') {
      socket.emit('deploy', { project: 'push', host: 'dev1' });
    } else {
      socket.emit('run', { project: 'push', host: 'dev1', command: command  });
    }
  });

  $('.dev2').click(function() {
    $('.console').empty().removeClass('hidden');
    var command = $('.run input').val();
    
    if (command === '') {
      socket.emit('deploy', { project: 'push', host: 'dev2' });
    } else {
      socket.emit('run', { project: 'push', host: 'dev2', command: command  });
    }
  });

});

