/* eslint-disable class-methods-use-this */
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { ethers } from 'ethers';
import { ITransaction, IWallet } from './Core';

const singleton = new Map<string, any>();

export class CoreWalletConnect implements IWallet {
  private chainId: number = 0;

  private address: string = '';

  private connected: boolean = false;

  private walletConnectInstance: WalletConnect = {} as WalletConnect;

  private resolve: (value: any) => void = () => undefined;

  private reject: (reason: any) => void = () => undefined;

  constructor() {
    this.reloadWalletConnect();
    this.connected = this.walletConnectInstance.connected;
  }

  private reloadWalletConnect() {
    this.walletConnectInstance = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    });

    this.walletConnectInstance.on('connect', (error, payload) => {
      if (error) {
        return this.reject(error);
      }
      // Get provided accounts and chainId
      const { accounts } = payload.params[0];
      if (payload.params[0][1] !== this.chainId) {
        return this.reject(new Error('WalletConnect Error: ChainId is different'));
      }
      this.address = accounts[0] as string;
      this.connected = true;
      // It's in the end so return  is unnecessary
      return this.resolve(accounts[0]);
    });
  }

  static getInstance(instanceName: string = 'wallet-connect'): CoreWalletConnect {
    if (!singleton.has(instanceName)) {
      singleton.set(instanceName, new CoreWalletConnect());
    }
    return singleton.get(instanceName) as CoreWalletConnect;
  }

  connect(chainId: number): Promise<string> {
    // Set target chain Id
    this.chainId = chainId;
    // If connected we have nothing to do here
    if (this.connected) return this.getAddress();

    // Perform connect
    return new Promise((resolve, reject) => {
      if (this.connected) resolve(this.address);
      this.reloadWalletConnect();
      this.resolve = resolve;
      this.reject = reject;
      this.walletConnectInstance.createSession({
        chainId,
      });
    });
  }

  async getAddress(): Promise<string> {
    if (!ethers.utils.isAddress(this.address)) {
      [this.address] = this.walletConnectInstance.accounts;
    }
    return this.address;
  }

  // eslint-disable-next-line no-unused-vars
  async switchNetwork(_chainId: number): Promise<boolean> {
    // Wallet might not support network switch yet, might be we need another approach
    return true;
  }

  async sendTransaction(transaction: ITransaction): Promise<string> {
    return this.walletConnectInstance.sendTransaction(transaction);
  }

  async isConnected(): Promise<boolean> {
    return this.connected;
  }
}

export default CoreWalletConnect;
