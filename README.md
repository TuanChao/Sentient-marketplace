# 🚀 ROMA NFT Marketplace - Complete Web3 Platform

A comprehensive NFT marketplace platform with AI-powered chatbot assistant, built with React, TypeScript, and Web3 technologies. Features wallet integration, NFT trading, creation tools, and intelligent market analysis.

## 🌟 Key Features

### 🏪 **NFT Marketplace**
- **Browse & Discover**: Advanced filtering by price, collection, rarity
- **Trading System**: Buy Now, Auctions, Make Offers with secure escrow
- **15 Premium Collections**: BAYC, Azuki, CryptoPunks, Pudgy Penguins, and more
- **Real-time Analytics**: Volume tracking, floor prices, market trends
- **Portfolio Management**: Track your NFT investments and P&L

### 🤖 **ROMA AI Assistant**
- **Multi-AI Integration**: OpenAI GPT, Google Gemini, Hugging Face models
- **NFT Expert Knowledge**: Deep insights on 15+ collections
- **Market Analysis**: Real-time price predictions and investment advice
- **24/7 Support**: Trading strategies, creation guides, wallet help
- **Personalized Recommendations**: Based on your portfolio and preferences

### 💼 **Wallet & Profile System**
- **Multi-wallet Support**: MetaMask, WalletConnect, injected wallets
- **Signature Verification**: Secure 24h authentication system
- **Profile Features**: Collected, Created, Activity, Settings tabs
- **Privacy Controls**: Customizable visibility and data sharing

### ✨ **NFT Creation Studio**
- **Easy Minting**: Step-by-step NFT creation process
- **Multiple Formats**: JPG, PNG, GIF, MP4 support
- **Collection Management**: Create new or add to existing collections
- **Royalty Settings**: Configurable creator royalties (2.5-10%)
- **Launch Strategy**: Built-in marketing and promotion tools

### 🛒 **Advanced Shopping Experience**
- **Smart Cart**: Bulk purchases with gas optimization
- **Favorites System**: Wishlist with price alerts
- **Search & Discovery**: AI-powered recommendations
- **Notification Center**: Outbid alerts, price drops, auction endings

## 🔧 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Web3 Wallet** (MetaMask recommended)

### 🔑 Required API Keys
- **OpenAI API Key** - For advanced AI responses
- **Google Gemini API Key** - Alternative AI model
- **Hugging Face API Token** - Free AI model access
- **WalletConnect Project ID** - For mobile wallet connections

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roma-ai-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```

   **Configure your `.env` file:**
   ```bash
   # AI Model APIs
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_HF_API_KEY=your_huggingface_token_here

   # Web3 Configuration
   VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

   # Network Configuration
   VITE_NETWORK=mainnet
   VITE_RPC_URL=your_ethereum_rpc_url
   ```

4. **Get API Keys**

   **🤖 OpenAI (Recommended)**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create account and generate API key
   - Add $5+ credit for usage

   **🧠 Google Gemini (Alternative)**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Generate free API key
   - No credit required

   **🤗 Hugging Face (Free)**
   - Visit [Hugging Face Tokens](https://huggingface.co/settings/tokens)
   - Create free account and generate token
   - Completely free to use

   **🔗 WalletConnect**
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create project and get Project ID
   - Required for mobile wallet connections

## Usage

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Connect your Web3 wallet (MetaMask recommended)
   - Explore the marketplace and chat with ROMA AI!

## 🎮 How to Use

### **🔗 Connect Wallet**
1. Click "Connect Wallet" in the top navigation
2. Choose your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection in your wallet
4. Sign the verification message to unlock full features

### **🤖 Chat with ROMA AI**
1. Click the chat button (bottom right corner)
2. Ask questions about NFTs, market trends, or get help
3. Try these example questions:
   ```
   "Show me marketplace features"
   "Analyze Azuki collection"
   "How do I create an NFT?"
   "What should I hold in the next 24h?"
   "Help me set up price alerts"
   ```

### **🏪 Explore Marketplace**
1. **Browse**: Use filters to find NFTs by price, collection, rarity
2. **Favorites**: Heart NFTs to add to your watchlist
3. **Cart**: Add multiple NFTs for bulk purchase (save gas fees)
4. **Analytics**: View real-time stats and market insights

### **✨ Create NFTs**
1. Go to Create page (`/create`)
2. Upload your artwork (JPG, PNG, GIF, MP4)
3. Fill in details: name, description, properties
4. Set price and royalty percentage
5. Mint your NFT on the blockchain

### **📊 Track Performance**
1. **Profile**: View your collected and created NFTs
2. **Activity**: See transaction history and P&L
3. **Stats**: Monitor marketplace metrics and trends

## 📁 Project Structure

```
roma-ai-chatbot/
├── src/
│   ├── components/           # React components
│   │   ├── auth/            # Authentication components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── common/          # Shared components
│   │   │   └── Navbar.tsx   # Navigation with wallet connect
│   │   ├── marketplace/     # NFT marketplace components
│   │   │   ├── NFTCard.tsx  # Individual NFT display
│   │   │   └── MarketplaceFilters.tsx
│   │   └── ui/              # UI components
│   │       ├── Chatbot.tsx  # Main AI chatbot
│   │       ├── ChatMessage.tsx
│   │       └── ChatInput.tsx
│   ├── pages/               # Main application pages
│   │   ├── marketplace/     # Marketplace page
│   │   ├── create/          # NFT creation studio
│   │   ├── profile/         # User profile & wallet
│   │   ├── collections/     # Collection explorer
│   │   └── stats/           # Analytics dashboard
│   ├── services/            # External API integrations
│   │   └── api/
│   │       ├── openai.ts    # OpenAI GPT integration
│   │       ├── gemini.ts    # Google Gemini AI
│   │       └── huggingface.ts # Hugging Face models
│   ├── config/              # Web3 configuration
│   │   ├── wagmi.ts         # Wagmi wallet config
│   │   ├── rainbowkit.ts    # RainbowKit setup
│   │   └── appkit.ts        # WalletConnect config
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Wallet authentication
│   ├── data/                # Mock data & constants
│   │   └── mock/
│   │       └── mockNFTs.ts  # Sample NFT data
│   ├── types/               # TypeScript definitions
│   │   ├── nft.ts           # NFT and marketplace types
│   │   └── chat.ts          # Chat system types
│   ├── utils/               # Utility functions
│   │   └── nftHelpers.ts    # NFT market calculations
│   └── assets/              # Static assets
│       └── *.jpg            # NFT collection images
├── public/                  # Public assets
├── .env.example            # Environment variables template
└── package.json            # Dependencies and scripts
```

## ⚙️ Configuration & Customization

### 🤖 AI Models Configuration

**OpenAI Settings** (`src/services/api/openai.ts`)
```typescript
// Model options: gpt-3.5-turbo, gpt-4, gpt-4-1106-preview
model: "gpt-3.5-turbo",
temperature: 0.8,        // Creativity (0.0-1.0)
max_tokens: 500,         // Response length
```

**Google Gemini Settings** (`src/services/api/gemini.ts`)
```typescript
// Model: gemini-pro, gemini-pro-vision
model: "gemini-pro",
temperature: 0.8,
topP: 0.9,
```

**Hugging Face Models** (`src/services/api/huggingface.ts`)
```typescript
// Fallback models in priority order
models: [
  'microsoft/DialoGPT-large',
  'facebook/blenderbot-400M-distill',
  'google/flan-t5-base'
]
```

### 🎨 UI Theme Customization

**Dark Theme** (`src/styles/dark-theme.css`)
```css
:root {
  --accent-primary: #8a2be2;     /* Purple gradient start */
  --accent-secondary: #ff1493;   /* Pink gradient end */
  --bg-primary: #0a0a0f;         /* Main background */
  --bg-card: #1a1a2e;            /* Card backgrounds */
}
```

**Component Styling**
- **Navbar**: `src/components/common/Navbar-dark.css`
- **Marketplace**: `src/pages/marketplace/MarketplacePage-dark.css`
- **Chatbot**: `src/components/ui/Chatbot.css`

### 🔗 Web3 Configuration

**Supported Networks** (`src/config/wagmi.ts`)
```typescript
chains: [mainnet, sepolia],  // Add more networks
transports: {
  [mainnet.id]: http(),      // Custom RPC endpoints
  [sepolia.id]: http(),
}
```

**Wallet Connectors**
- MetaMask (browser extension)
- WalletConnect (mobile wallets)
- Injected wallets (Coinbase, Brave, etc.)

### 📊 NFT Collections Data

**Add New Collections** (`src/data/mock/mockNFTs.ts`)
```typescript
// Add your NFT collection data
{
  id: 'your-collection-1',
  name: 'Your Collection Name',
  collection: {
    name: 'Collection Name',
    floorPrice: 1.5
  },
  rarity: 'Rare',
  // ... other properties
}
```

## Build for Production

```bash
npm run build
```

## 🧩 Technology Stack

### **Frontend Framework**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing and navigation

### **Web3 Integration**
- **Wagmi** - React hooks for Ethereum interactions
- **RainbowKit** - Beautiful wallet connection UI
- **WalletConnect** - Multi-wallet support and mobile wallets
- **Viem** - Type-safe Ethereum library

### **AI & Machine Learning**
- **OpenAI GPT** - Advanced conversational AI
- **Google Gemini** - Multimodal AI capabilities
- **Hugging Face** - Open-source AI models (free tier)
- **Custom AI Pipeline** - Fallback system with multiple providers

### **UI & Styling**
- **CSS3** - Modern styling with gradients and animations
- **Lucide React** - Beautiful, consistent icons
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Eye-friendly interface

### **Development Tools**
- **ESLint** - Code quality and consistency
- **TypeScript Strict Mode** - Enhanced type checking
- **Hot Module Replacement** - Instant development updates

## 🔒 Security & Best Practices

### **API Key Management**
```bash
# ✅ GOOD: Environment variables
VITE_OPENAI_API_KEY=sk-...

# ❌ BAD: Hardcoded in source
const apiKey = "sk-proj-...";
```

### **Web3 Security**
- **Signature Verification**: 24-hour expiry for wallet authentication
- **No Private Key Storage**: Only public addresses and signatures
- **Secure RPC**: Use trusted Ethereum node providers
- **Contract Verification**: All interactions through verified smart contracts

### **Production Deployment**
```bash
# Environment setup for production
NODE_ENV=production
VITE_NETWORK=mainnet
VITE_RPC_URL=https://your-secure-rpc-endpoint
```

### **Rate Limiting & Monitoring**
- **API Usage Tracking**: Monitor AI model usage and costs
- **Error Boundaries**: Graceful error handling for Web3 operations
- **Performance Monitoring**: Track Core Web Vitals and user experience

## 🚀 Deployment Options

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Netlify**
```bash
# Build for production
npm run build

# Deploy dist/ folder to Netlify
```

### **Traditional Hosting**
```bash
# Build static files
npm run build

# Upload dist/ folder to your web server
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript strict mode
- Add proper JSDoc comments for functions
- Test AI responses with multiple models
- Ensure mobile responsiveness
- Add loading states for async operations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** - GPT models for intelligent conversations
- **Google** - Gemini AI for advanced capabilities
- **Hugging Face** - Open-source AI model access
- **RainbowKit** - Beautiful Web3 wallet integration
- **React Community** - Amazing ecosystem and tools

## 📞 Support

- **Documentation**: Check our [Wiki](../../wiki) for detailed guides
- **Issues**: Report bugs via [GitHub Issues](../../issues)
- **Discord**: Join our community for real-time support
- **Email**: contact@roma-nft.com

---

**🎯 Built with ❤️ for the NFT community | Made in Vietnam 🇻🇳**
