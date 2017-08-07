/*import { Block, getGenesisBlock } from './src/block';
import { Blockchain } from './src/blockchain';
import { mineBlock } from './src/miner';
import { IBlock, IMinedBlock } from './src/types/IBlock';

const blockchain = new Blockchain();

const mineQueue: IBlock[] = [];

const block = new Block(blockchain.getLast(), {});

const nonce = mineBlock(block);*/

import { randomBytes } from 'crypto';
import { SHA256 } from 'crypto-js';
import { ec as EC } from 'elliptic';
import * as secp256k1 from 'secp256k1';

const msgHash = SHA256('test').toString();

const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const signature = key.sign(msgHash);
const derSign = signature.toDER();
const hexSign = Buffer.from(derSign).toString('hex');

console.log(derSign);

// No private key

const publicKey = key.getPublic().encode('hex');

const key1 = ec.keyFromPublic(publicKey, 'hex');

console.log(`Public key: ${publicKey}`);

console.log(key.verify(msgHash, hexSign));