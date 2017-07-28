import { SHA256 } from 'crypto-js';
import { IBlock } from './types/IBlock';

export function mine(block: IBlock): {hash: string, nonce: number} {
  let hash = block.hash || '';
  let nonce = 0;
  while (hash.substring(0, 4) !== '0000') {
    hash = SHA256(`${block.id}${block.previousHash}${block.data}${nonce++}`);
  }
  console.log(`block ${block.id} mined in ${nonce} cycles`);

  return { hash, nonce };
}

export function verifyBlockPOW(block: IBlock): boolean {
  return block.hash === SHA256(`${block.id}${block.previousHash}${block.data}${block.nonce++}`);
}