import * as socketIo from 'socket.io';

import { Blockchain } from '../blockchain';

const PORT = 8097;
const io = socketIo.listen(PORT);
console.log('server listening to port 8097');

const events = {
  getLastBlock: 'GET_LAST_BLOCK',
  emitLastBlock: 'EMIT_LAST_BLOCK',
};

const blockchain = new Blockchain();

io.sockets.on('connection', socket => {
  console.log(`client ${socket.id} connected`);

  socket.on(events.getLastBlock, (body: any) => {
    socket.emit(events.emitLastBlock, blockchain.getLast());
  });
});