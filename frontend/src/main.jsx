import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createConfig,
  WagmiConfig,
} from 'wagmi';
import {
  polygonMumbai,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// 🔧 Set up Wagmi + RainbowKit (wallet connect)
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Startup Quest',
  projectId: 'dc5996bb11855fb9f4887360371db247', // generate one free at walletconnect.com
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// 🧠 Wrap App with Ethereum providers
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </StrictMode>
);
