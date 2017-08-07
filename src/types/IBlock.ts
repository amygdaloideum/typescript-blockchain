export interface IMinedBlock {
  readonly hash: string;
  readonly nonce: number;
  readonly block: IBlock;
}

export interface IBlock {
  readonly id: number;
  readonly previousHash: string;
  readonly merkleRoot: string;
  readonly coinBase: ICoinBase;
  readonly transactions: ITransaction[];
}

export interface ICoinBase {
  readonly id: string;
  readonly output: string;
  readonly amount: number;
}

export interface ITransaction {
  readonly id: string;
  readonly inputs: string[];
  readonly outputs: string[];
  readonly signature: string;
  readonly amount: number;
}