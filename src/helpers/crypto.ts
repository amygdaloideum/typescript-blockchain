/**
 * A wrapper for the elliptic library to abstract the details and only deal with hex-strings.
 */
import { IBlock, ICoinBase, ITransaction } from './../types/IBlock';

import { SHA256 } from 'crypto-js';
import { ec as EC } from 'elliptic';
import * as merkle from 'merkle';

const ec = new EC('secp256k1');

export function hash(data: string): string {
  return SHA256(data).toString();
}

export function hashObjProps(obj: any, ...props: string[]): string {
  const hashString = props.reduce((sum, value) => `${sum}${value}`);
  return hash(hashString);
}

export function getMerkleRoot(block: IBlock): string {
  const arr: string[] = [block.coinBase.id, ...block.transactions.map(x => x.id)];
  const tree = merkle('sha256').sync(arr);
  return tree.root();
}

export function generateKeyPair(): { public: string; private: string } {
  const keys = ec.genKeyPair();
  return {
    public: keys.getPublic().encode('hex'),
    private: keys.getPrivate().toString('hex'),
  };
}

export function createSignature(privateKey: string, msg: string): string {
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const msgHash = SHA256(msg).toString();
  const signature = key.sign(msgHash);
  const derSign = signature.toDER();
  const hexSign = Buffer.from(derSign).toString('hex');
  return hexSign;
}

export function verifySignature(publicKey: string, signature: string, msg: string): string {
  const key = ec.keyFromPublic(publicKey, 'hex');
  const msgHash = SHA256(msg).toString();
  return key.verify(msgHash, signature);
}