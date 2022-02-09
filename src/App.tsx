import '@fontsource/roboto';
import './App.css';
import { WalletConnector } from './WalletConnector/WalletConnector';

function App() {
  return <WalletConnector onConnect={(...p: any[]) => console.log(...p)} />;
}

export default App;
