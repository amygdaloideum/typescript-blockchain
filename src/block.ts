import { IBlock, IMinedBlock } from './types/IBlock';

export class Block implements IBlock {
  public id: number;
  public previousHash: string;
  public data: any;

  constructor(previousBlock: IMinedBlock, data: any) {
    this.id = previousBlock.block.id + 1;
    this.previousHash = previousBlock.hash;
    this.data = data;
  }
}

export class MinedBlock implements IMinedBlock {
  public nonce: number;
  public hash: string;
  public block: IBlock;

  constructor(block: IBlock, nonce: number, hash: string) {
    this.block = block;
    this.nonce = nonce;
    this.hash = hash;
  }
}

export const getGenesisBlock = (): IMinedBlock => ({
  hash: '123456789',
  nonce: 0,
  block: {
    id: 0,
    previousHash: '',
    data: {},
  }
});
