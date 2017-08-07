import { Block, getGenesisBlock, MinedBlock } from './block';
import { verifyBlockPOW } from './miner';
import { IBlock, IMinedBlock } from './types/IBlock';

export class Blockchain {
  public blocks: IMinedBlock[];

  constructor() {
    this.blocks = [getGenesisBlock()];
  }

  public getLast(): IMinedBlock {
    return [...this.blocks].pop() || getGenesisBlock();
  }

  public addBlock(block: IBlock, nonce: number): boolean {
    const hash = verifyBlockPOW(block, nonce);
    if(!hash) {
      return false;
    }
    this.blocks.push(new MinedBlock(block, nonce, hash));
    return true;
  }
}