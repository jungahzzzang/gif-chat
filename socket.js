//const WebSocket = require('ws');
const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware)=>{
    //const wss = new WebSocket.Server({server});
    const io = SocketIO(server,{path:'/socket.io'});

    // wss.on('connection',(ws,req)=>{
    //     //웹소캣 연결 시
    //     const ip = req.headers['x-forwarded-for']||req.connection.remoteAddress;
    //     console.log('새로운 클라이언트 접속',ip);
    //     ws.on('message',(message)=>{
    //         //클라이언트로부터 메시지 수신 시
    //         console.log(message.toString());
    //     });
    //     ws.on('error',(error)=>{
    //         //에러 시
    //         console.error(error);
    //     });
    //     ws.on('close',()=>{
    //         //연결 종료 시
    //         console.log('클라이언트 접속 해제',ip);
    //         clearInterval(ws.interval);
    //     });
    //
    //     ws.interval = setInterval(()=>{
    //         //3초마다 클라이언트로 메시지 전송
    //         if(ws.readyState === ws.OPEN){
    //             ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
    //         }
    //     },3000);
    // });

    // io.on('connection',(socket)=>{
    //     //웹 소켓 연결 시
    //     const req = socket.request;
    //     const ip = req.headers['x-forwarded-for']||req.connection.remoteAddress;
    //     console.log('새로운 클라이언트 접속!',ip,socket.id,req.ip);
    //     socket.on('disconnect',()=>{
    //         //연결 종료 시
    //         console.log('클라이언트 접속 해제',ip,socket.id);
    //         clearInterval(socket.interval);
    //     });
    //     socket.on('error',(error)=>{
    //         //에러 시
    //         console.error(error);
    //     });
    //     socket.on('reply',(data)=>{
    //         //클라이언트로부터 메시지 수신 시
    //         console.log(data);
    //     });
    //     socket.interval = setInterval(()=>{
    //         //3초마다 메시지 전송
    //         socket.emit('news','Hello Socket.IO');
    //     },3000);
    // });

    app.set('io',io);

    //of : Socket.IO에 네임스페이스를 부여하는 메서드
    const room = io.of('/room');
    const chat = io.of('/chat');

    room.on('connection',(socket)=>{
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect',()=>{
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection',(socket)=>{
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const {headers: {referer}}=req;
        const roomId = referer
            .split('/')[referer.split('/').length-1]
            .replace(/\?.+/,'');
        socket.join(roomId);

        socket.on('disconnect',()=>{
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
        });
    });
};