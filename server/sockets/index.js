'use strict';

// var messages = require('./sockets.messages'),
//   rooms = require('./sockets.rooms'),
//   users = require('./sockets.users');

module.exports = function( server ) {
  var io = require('socket.io').listen( server.listener );
  server.sockets = {};
  server.rooms = {
    lobby: {
      owner: null,
      members: {},
      private: false
    }
  };

  io.on('connection', function( socket ){
    console.log('sockets listening...' + socket.id);

    setInterval(function(){
      socket.emit('message', {a:1, b:2, c:3});
    }, 1000);

    // socket.emit( 'event:hello' );
    //
    // server.sockets[ socket.id ] = {
    //   id: socket.id,
    //   name: 'Guest-'+socket.id,
    //   rooms: []
    // };

    socket.on( 'disconnect', function(){
      // var rooms = server.sockets[ socket.id ].rooms;
      // for( var i = 0; i < rooms.length; i++ ) {
      //   if( server.rooms[ rooms[i] ] ) {
      //     if( server.rooms[ rooms[i] ].members ) {
      //       delete server.rooms[ rooms[i] ].members[ socket.id ];
      //       socket.broadcast.to( rooms[i] ).emit( 'event:room:leave', {name: rooms[i], user: socket.id } );
      //     }
      //   }
      // }
      //
      // delete server.sockets[ socket.id ];

      console.log('goodbye ' + socket.id );
    });

    // Handle Rooms
    //rooms( socket, server.rooms, server.sockets)

    // Handle Messages
    //messages( socket, server.rooms, server.sockets );

    // Handle User
    //users( socket, server.sockets );
  });
};