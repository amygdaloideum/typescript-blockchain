import * as socketIo from 'socket.io-client';
import { createSignature, generateKeyPair, verifySignature } from '../helpers/crypto';
import { events } from '../helpers/events';
import { ITransaction } from '../types/IBlock';

const socket = socketIo.connect('http://localhost:8097');
const stdin = process.openStdin();
stdin.addListener('data', cliListeners);

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on(events.emitLastBlock, (block: any) => {
  console.log(block);
});

const commands = {
  getLast: 'getLast',
  addTransaction: 'addTransaction',
  getKeyPair: 'getKeyPair',
  createSignature: 'createSignature',
  verifySignature: 'verifySignature',
};

function cliListeners(d: any): void {
  const input: string = d.toString().trim();
  const command: string = input.split(' ')[0];

  switch (command) {
    case commands.getLast:
      socket.emit(events.getLastBlock);
      break;
    case commands.addTransaction:
      sendNewTransaction(input);
      break;
    case commands.getKeyPair:
      console.log(generateKeyPair());
      break;
    case commands.createSignature:
      console.log(generateSignature(input));
      break;
    case commands.verifySignature:
      console.log(verifySig(input));
      break;
  }
}

function verifySig(input: string): string {
  const args = input.split(' ').slice(1);
  if (!args[0] || !args[1] || !args[2]) {
    console.log('wrong arguments');
    return '';
  }
  return verifySignature(args[0], args[1], args[2]);
}

function generateSignature(input: string): string {
  const args = input.split(' ').slice(1);
  if (!args[0] || !args[1]) {
    console.log('wrong arguments');
    return '';
  }
  return createSignature(args[0], args[1]);
}

interface ITXArgs {
  inputs: string[];
}

function sendNewTransaction(input: string): void {
  const json = input.split(' ').slice(1).join(' ');
  const obj: ITXArgs = JSON.parse(json);
}