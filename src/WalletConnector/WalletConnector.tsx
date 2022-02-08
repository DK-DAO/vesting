import { useState, useReducer } from 'react';
import { Buffer as safeBuffer } from 'safe-buffer';
import Button from '@mui/material/Button';
import { WalletConnectorDialog } from './DialogSelectWallet';
import ModalMessage from './ModalMessage';
import { DefaultWalletConnectorContext, WalletConnectorContext, WalletConnectorReducer } from './Context';
import { CoreMetaMask } from './CoreMetaMask';
import CoreWalletConnect from './CoreWalletConnect';

// @ts-ignore
if (typeof globalThis.Buffer === 'undefined') globalThis.Buffer = safeBuffer;

declare let window: any;

export interface IWalletConnectorState {
  connected: boolean;
  address: string;
  chainId: number;
  type: 'unknown' | 'metamask' | 'walletconnect';
  dialogOpen: boolean;
  modalOpen: boolean;
  modalType: 'info' | 'error' | 'success' | 'warning';
  modalTitle: string;
  modalMessage: string;
}

export interface IWalletConnectorProps {
  onConnected: (data: any) => void;
  chainId: number;
}

export const SupportedNetwork = new Map<number, string>([
  [1, 'Ethereum Mainnet'],
  [56, 'Binance Smart Chain'],
  [137, 'Polygon Mainnet'],
  [250, 'Fantom Opera'],
  [4002, 'Fantom Testnet'],
]);

// eslint-disable-next-line no-unused-vars
export function WalletConnector(_props: any) {
  const [context, dispatch] = useReducer(WalletConnectorReducer, DefaultWalletConnectorContext);
  const [modalState, setModalState] = useState({ title: 'Unknown Error', message: 'Unknown error', type: 'info' });

  const overrideDispatch = (type: string, value: any) => dispatch({ type, value });

  const showModal = (type: string, title: string, message: string) => {
    setModalState({ title, type, message });
    overrideDispatch('open-modal', { modalOpen: true });
  };

  const handleDialogClose = (connectType: string) => {
    if (connectType === 'metamask') {
      if (typeof window.ethereum !== 'undefined') {
        const wallet = CoreMetaMask.getInstance();
        wallet
          .connect(56)
          .then((address: string) =>
            overrideDispatch('metamask-connected', { connected: true, type: connectType, address }),
          )
          .catch((err: Error) => showModal('error', err.message, err.stack || 'Unknown reason'))
          .finally(() => overrideDispatch('close-dialog', { dialogOpen: false }));
      } else {
        showModal('error', 'Metamask Not Found', "Metamask wallet wasn't installed");
      }
    } else if (connectType === 'walletconnect') {
      const wallet = CoreWalletConnect.getInstance();
      wallet
        .connect(56)
        .then((address: string) =>
          overrideDispatch('walletconnect-connected', { connected: true, type: connectType, address }),
        )
        .catch((err: Error) => showModal('error', err.message, err.stack || 'Unknown reason'))
        .finally(() => overrideDispatch('close-dialog', { dialogOpen: false }));
    } else {
      overrideDispatch('close-dialog', { dialogOpen: false });
    }
  };

  const handleButtonConnect = () => {
    overrideDispatch('close-dialog', { dialogOpen: true });
  };
  return (
    <>
      <WalletConnectorContext.Provider value={{ ...context, dispatch }}>
        <Button variant="contained" onClick={handleButtonConnect}>
          Connect
        </Button>
        <WalletConnectorDialog onClose={handleDialogClose} />
        <ModalMessage type={modalState.type} title={modalState.title}>
          {modalState.message}
        </ModalMessage>
      </WalletConnectorContext.Provider>
    </>
  );
}
