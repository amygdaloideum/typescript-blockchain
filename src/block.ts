import { SHA256 } from 'crypto-js';
import { mine } from './miner';
import { IBlock } from './types/IBlock';

export class Block implements IBlock {
  public id: number;
  public hash: string;
  public previousHash: string;
  public nonce: number;
  public data: any;

  constructor(previousBlock: Block, data: any) {
    this.id = previousBlock.id + 1;
    this.hash = '';
    this.previousHash = previousBlock.hash;
    this.data = data;
  }
}

export class GenesisBlock implements IBlock {
  public id: number;
  public hash: string;
  public previousHash: string;
  public nonce: number;
  public data: any;

  constructor() {
    this.id = 0;
    this.previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
    this.data = null;
    const { hash, nonce } = mine(this);
    this.hash = hash;
    this.nonce = nonce;
  }

}
