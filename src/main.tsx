import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { WagmiConfig, createConfig, configureChains  } from 'wagmi'
import { mainnet, localhost} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';



import { NavBar } from './components/NavBar'
import { Routes, Route, HashRouter } from 'react-router-dom'

import { App } from '@/App.tsx'
import { Mimis } from '@/pages/Mimis/Mimis.tsx'
import { MintMimis } from '@/pages/Mimis/MintMimis.tsx'
import { UnwrapMimis } from "./pages/Mimis/UnwrapMimis.tsx"
import { StakeMimis } from "./pages/Mimis/StakeMimis.tsx"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, localhost],
  [
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Mimisbrunnr',
  projectId: import.meta.env.VITE_WALLETCONNECT_CLOUD_API_KEY,
  chains
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const theme = extendTheme(withDefaultColorScheme({
  colorScheme: 'purple'
}))

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <RainbowKitProvider coolMode chains={chains}>
          <HashRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/mimis" element={<Mimis/>} />
            <Route path="/mimis/mint" element={<MintMimis/>} />
            <Route path="/mimis/unwrap" element={<UnwrapMimis/>} />
            <Route path="/mimis/stake" element={<StakeMimis/>} />
          </Routes>
          </HashRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
)