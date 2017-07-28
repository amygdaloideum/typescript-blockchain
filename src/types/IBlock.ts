export interface IBlock {
  readonly id: number;
  hash: string;
  previousHash: string;
  nonce: number;
  data: any;
}