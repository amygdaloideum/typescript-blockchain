import { getMerkleRoot, hash, hashObjProps } from './helpers/crypto';
import { IBlock, ICoinBase, IMinedBlock, ITransaction } from './types/IBlock';

export class Block implements IBlock {
  public id: number;
  public previousHash: string;
  public transactions: ITransaction[];
  public merkleRoot: string;
  public coinBase: ICoinBase;

  constructor(previousBlock: IMinedBlock, transactions: ITransaction[], payoutAddress: string) {
    this.id = previousBlock.block.id + 1;
    this.previousHash = previousBlock.hash;
    this.transactions = transactions;
    this.coinBase = new CoinBase(payoutAddress, 50);
    this.merkleRoot = getMerkleRoot(this);
  }
}

export class CoinBase implements ICoinBase {
  public id: string;
  public output: string;
  public amount: number;

  constructor(output: string, amount: number) {
    this.output = output;
    this.amount = amount;
    this.id = hash(`${output}${amount}`);
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
    merkleRoot: '',
    coinBase: {
      id: hash(`04f7a1e58f404d8644c6410d3a97d5a14fa1d0cd8e945444f3eed11bcd988c704475d372cfecb691ebd654d2d0a60b7f7e4ee213e679f368713cb9df7a6bfeb5a250`),
      output: '04f7a1e58f404d8644c6410d3a97d5a14fa1d0cd8e945444f3eed11bcd988c704475d372cfecb691ebd654d2d0a60b7f7e4ee213e679f368713cb9df7a6bfeb5a2',
      amount: 50,
    },
    transactions: [],
  }
});
