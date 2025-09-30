import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Get WalletConnect project ID from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

// Export common wallet info
export const supportedWallets = [
  {
    id: 'metaMask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using MetaMask browser extension',
    connector: 'metaMask'
  },
  {
    id: 'injected',
    name: 'Browser Wallet',
    icon: '🔗',
    description: 'Connect using browser extension wallet',
    connector: 'injected'
  },
  {
    id: 'walletConnect',
    name: 'WalletConnect',
    icon: '📱',
    description: 'Scan with mobile wallet',
    connector: 'walletConnect'
  }
]