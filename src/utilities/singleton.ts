/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { ethers } from 'ethers';
import abiErc20 from '../abi/ERC20.json';
import abiVestingContract from '../abi/VestingContract.json';
import { ERC20 } from '../types/ERC20';
import { VestingContract } from '../types/VestingContract';

const singleton: { [key: string]: any } = {};

export function formatNumber(v: number | string) {
  if (typeof singleton.formatNumber === 'undefined') {
    singleton.formatNumber = new Intl.NumberFormat('en-US');
  }
  return singleton.formatNumber.format(v);
}

export function getProvider() {
  if (typeof singleton.provider === 'undefined') {
    singleton.provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/'); // https://bsc-dataseed.binance.org/
  }
  return singleton.provider;
}

export function getToken(): ERC20 {
  if (typeof singleton.token === 'undefined') {
    singleton.token = new ethers.Contract('0x7Ceb519718A80Dd78a8545AD8e7f401dE4f2faA7', abiErc20, getProvider());
  }
  return singleton.token;
}

export function getVestingContract(address: string): VestingContract {
  const vesting = `vesting-${address}`;
  if (typeof singleton[vesting] === 'undefined') {
    singleton[vesting] = new ethers.Contract(address, abiVestingContract, getProvider());
  }
  return singleton[vesting];
}

const onceSync = new Map<string, boolean>();

export const once = (name: string, callback: () => void) => {
  if (!onceSync.has(name) || !onceSync.get(name)) {
    callback();
    onceSync.set(name, true);
  }
};
