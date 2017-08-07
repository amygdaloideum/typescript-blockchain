import { Block, getGenesisBlock } from './src/block';
import { Blockchain } from './src/blockchain';
import { mineBlock } from './src/miner';
import { IBlock, IMinedBlock } from './src/types/IBlock';

const blockchain = new Blockchain();

const mineQueue: IBlock[] = [];

const block = new Block(blockchain.getLast(), {});

const nonce = mineBlock(block);
