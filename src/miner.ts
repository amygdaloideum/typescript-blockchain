import { SHA256 } from 'crypto-js';
import { IBlock } from './types/IBlock';

const getHashInput = (block: IBlock, nonce: number): string => `${block.id}${block.previousHash}${block.merkleRoot}${nonce}`;

export function verifyBlockPOW(block: IBlock, nonce: number): string {
  const hash = SHA256(getHashInput(block, nonce)).toString();
  return hash.substring(0, 5) === '00000' ? hash: '';
}

export function mineBlock(block: IBlock): number {
  let nonce = 0;
  while(!verifyBlockPOW(block, nonce)) {
    if(nonce% 10000 === 0) {
      console.log(nonce);
    }
    nonce++;
  }
  return nonce;
}