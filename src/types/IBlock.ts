export interface IMinedBlock {
  readonly hash: string;
  readonly nonce: number;
  readonly block: IBlock;
}

export interface IBlock {
  readonly id: number;
  readonly previousHash: string;
  readonly data: any;
}

export interface ITransaction {
  readonly id: string;
  readonly sender: string;
  readonly reciever: string;
  readonly signature: string;
  readonly amount: number;
}