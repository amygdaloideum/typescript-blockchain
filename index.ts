import { Block, getGenesisBlock } from './src/block';
import { Blockchain } from './src/blockchain';
import { mineBlock } from './src/miner';
import { IBlock, IMinedBlock } from './src/types/IBlock';

const blockchain = new Blockchain();

const block = new Block(blockchain.getLast(), {}, '63352');

const nonce = mineBlock(block);
