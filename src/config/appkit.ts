import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia } from '@reown/appkit/networks'

// Get projectId from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// Set up the Wagmi Adapter với existing config
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, sepolia],
  projectId,
  ssr: false
})

// Set up metadata
const metadata = {
  name: 'ROMA NFT Marketplace',
  description: 'Connect to ROMA NFT - The Premier NFT Marketplace',
  url: window.location.origin,
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, sepolia],
  metadata,
  projectId,
  features: {
    analytics: true,
    email: false,
    socials: false,
    emailShowWallets: false
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#4F46E5',
    '--w3m-border-radius-master': '12px'
  }
})

export { modal }