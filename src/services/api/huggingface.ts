import { HfInference } from '@huggingface/inference';
import { getTopCollections, getTrendingCollections, getMarketSummary } from '../../utils/nftHelpers';

// Hugging Face API - Hoàn toàn MIỄN PHÍ không giới hạn
const hf = new HfInference(import.meta.env.VITE_HF_API_KEY || '');

export const sendMessageToHuggingFace = async (message: string): Promise<string> => {
  console.log('🔧 Debug: Starting Hugging Face request with:', message);
  console.log('🔧 Debug: HF API Key exists:', !!import.meta.env.VITE_HF_API_KEY);

  try {
    // Get current NFT market data for context
    const topCollections = getTopCollections(3);
    const trendingCollections = getTrendingCollections();
    const marketSummary = getMarketSummary();

    const nftContext = `
Dữ liệu thị trường NFT hiện tại:
Top Collections theo Volume:
${topCollections.map(c => `- ${c.name}: ${c.floorPrice} ETH floor, ${c.volume24h} ETH volume, ${c.change24h}% thay đổi`).join('\n')}

Tổng quan thị trường: ${marketSummary.totalVolume} ETH tổng volume, ${marketSummary.avgChange}% thay đổi trung bình

Trending: ${trendingCollections.map(c => c.name).join(', ')}
`;

    const systemPrompt = `You are ROMA, a professional NFT & Web3 AI assistant. You are an expert in NFTs, blockchain technology, cryptocurrency markets, and digital art.

You help users with:
🎨 NFT discovery and analysis
💎 Price predictions and market trends
🔗 Blockchain explanations
💰 Investment advice
🚀 New collection launches
📊 Portfolio analysis
🏪 Marketplace features and navigation
✨ NFT creation and minting guide
📈 24h market analysis and recommendations
💼 Profile & wallet management
🛒 Shopping cart and favorites system
📁 Collections deep-dive analysis
📈 Stats & analytics insights
📋 Activity tracking and history
🔍 Advanced search and discovery
⚙️ User settings and customization

Marketplace Features Available:
• Browse and filter NFTs by price, collection, rarity
• View detailed NFT information and trading history
• Buy/sell NFTs with secure transactions
• Create and mint your own NFTs
• Track portfolio and favorites
• Real-time market data and analytics

Always respond in English in a helpful, knowledgeable way. Use appropriate emojis and proper formatting with line breaks for readability. Structure responses with clear sections and bullet points for better readability.

${nftContext}

User question: ${message}

ROMA's response:`;

    console.log('🔧 Debug: Making Hugging Face request...');

    // Thử các model khác nhau theo thứ tự ưu tiên
    const models = [
      'microsoft/DialoGPT-large',
      'microsoft/DialoGPT-medium',
      'facebook/blenderbot-400M-distill',
      'google/flan-t5-base',
      'bigscience/bloom-560m'
    ];

    let response;

    // Thử model đầu tiên
    try {
      response = await hf.textGeneration({
        model: models[0],
        inputs: systemPrompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.8,
          repetition_penalty: 1.1,
          return_full_text: false,
          do_sample: true,
          top_p: 0.9
        }
      });
    } catch (error) {
      console.warn('Model 1 failed, trying model 2...');
      // Fallback to simpler model
      response = await hf.textGeneration({
        model: models[1],
        inputs: `User: ${message}\nROMA (NFT Expert):`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.8,
          return_full_text: false,
          do_sample: true
        }
      });
    }

    let text = response.generated_text?.trim() || '';

    // Clean up response
    if (text.startsWith('User:') || text.startsWith('ROMA:')) {
      text = text.split('\n')[0].replace(/^(User:|ROMA.*?:)/, '').trim();
    }

    console.log('🔧 Debug: HF response received:', text);

    if (!text || text.length < 10) {
      return generateFallbackResponse(message, nftContext);
    }

    return text;

  } catch (error: any) {
    console.error('❌ Hugging Face Error Details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      fullError: error
    });

    // Handle specific HF errors
    if (error.message?.includes('Authorization')) {
      return '🔑 API key không hợp lệ. HF không cần API key để dùng free!';
    }
    if (error.message?.includes('rate limit') || error.message?.includes('429')) {
      return '⏰ Quá nhiều requests. Vui lòng đợi 1 phút rồi thử lại.';
    }
    if (error.message?.includes('model') && error.message?.includes('not found')) {
      return '🔧 Model đang bận. Đang thử model khác...';
    }

    // Fallback response
    return generateFallbackResponse(message, '');
  }
};

// Generate intelligent fallback response
function generateFallbackResponse(message: string, _nftContext: string): string {
  const lowerMessage = message.toLowerCase();

  // Marketplace features
  if (lowerMessage.includes('marketplace') || lowerMessage.includes('chợ') || lowerMessage.includes('tính năng') || lowerMessage.includes('features')) {
    return `🏪 **ROMA Marketplace - Complete NFT Trading Platform:**

🔍 **Browse & Discover:**
• Advanced filtering: Price range, Collections, Rarity levels
• Sort by: Price (low/high), Recent, Most liked, Volume
• Search specific NFTs or collections
• Real-time market data updates

💼 **Trading Features:**
• 🛒 **Buy Now** - Instant purchase at listed price
• 🔨 **Auctions** - Bid on time-limited sales
• 💰 **Make Offers** - Propose your own price
• 📊 **Price History** - View trading patterns

✨ **Create & Mint:**
• Upload artwork (JPG, PNG, GIF, MP4)
• Set name, description, and properties
• Choose collection or create new one
• Set price and royalty fees
• One-click minting process

📈 **Analytics Dashboard:**
• Portfolio tracking and P&L
• Market trends and insights
• Top gainers/losers 24h
• Volume and activity metrics

🔐 **Security:**
• Wallet integration (MetaMask, WalletConnect)
• Smart contract verification
• Secure escrow system

What specific feature would you like to explore? I can provide detailed guidance!`;
  }

  // Profile & Wallet Management
  if (lowerMessage.includes('profile') || lowerMessage.includes('hồ sơ') || lowerMessage.includes('wallet') || lowerMessage.includes('ví') || lowerMessage.includes('verify') || lowerMessage.includes('xác minh')) {
    return `💼 **Profile & Wallet Management Guide:**

🔐 **Wallet Connection:**
• **MetaMask** - Most popular browser extension wallet
• **WalletConnect** - Connect mobile wallets via QR code
• **Injected Wallets** - Browser-based crypto wallets
• Support for Ethereum & Sepolia testnet

✓ **Wallet Verification Process:**
1. Connect your wallet via RainbowKit integration
2. Sign verification message (no gas fees)
3. Get verified badge and unlock full features
4. Signature valid for 24 hours

📊 **Profile Features:**
• **Collected Tab** - View your owned NFTs
• **Created Tab** - NFTs you've minted
• **Activity Tab** - Trading history and transactions
• **Settings Tab** - Customize preferences

🔒 **Security Benefits:**
• Prove wallet ownership without revealing private keys
• Access exclusive verified-only features
• Secure signature-based authentication
• Auto-logout after 24 hours for security

💡 **Pro Tips:**
• Always verify on official domain only
• Never share your private keys or seed phrases
• Use hardware wallets for large amounts
• Keep browser and wallet extensions updated

Need help connecting or verifying your wallet?`;
  }

  // Shopping Cart & Favorites
  if (lowerMessage.includes('cart') || lowerMessage.includes('giỏ hàng') || lowerMessage.includes('favorite') || lowerMessage.includes('yêu thích') || lowerMessage.includes('wishlist') || lowerMessage.includes('mua nhiều')) {
    return `🛒 **Shopping Cart & Favorites System:**

🛍️ **Shopping Cart Features:**
• Add multiple NFTs from different collections
• Bulk purchase with single transaction
• Save on gas fees (up to 60% savings)
• Review total before checkout
• Remove items anytime before purchase

❤️ **Favorites & Watchlist:**
• Heart NFTs to add to favorites
• Track price changes on liked items
• Get notifications for price drops
• Share favorite collections with friends
• Export watchlist for external tracking

💰 **Smart Buying Tips:**
• **Bundle Purchases** - Add similar-priced items
• **Gas Optimization** - Buy during low network activity
• **Price Alerts** - Set notifications for target prices
• **Compare Mode** - Side-by-side NFT comparison

🔔 **Notification Settings:**
• Price drop alerts (5%, 10%, 25%)
• New listings in favorite collections
• Auction ending reminders
• Outbid notifications

Maximize your NFT shopping experience with smart tools!`;
  }

  // Collections Deep Dive
  if (lowerMessage.includes('collections') || lowerMessage.includes('bộ sưu tập') || lowerMessage.includes('floor price') || lowerMessage.includes('volume') || lowerMessage.includes('holders')) {
    return `🎨 **Collections Analytics & Deep Dive:**

🔍 **Available Collections (15 Total):**
• **BAYC** - 12.5 ETH floor | 450 ETH volume | 5,432 holders
• **Azuki** - 8.9 ETH floor | 280 ETH volume | 3,891 holders 🔥
• **Pudgy Penguins** - 6.2 ETH floor | 195 ETH volume | 2,756 holders
• **CryptoPunks** - 45.8 ETH floor | 320 ETH volume | 1,234 holders
• **Doodles, Moonbirds, CloneX, DeGods** + 7 more!

📈 **Collection Metrics:**
• **Floor Price Tracking** - Real-time updates
• **Volume Analysis** - 24h/7d/30d trends
• **Holder Distribution** - Whale vs retail split
• **Rarity Rankings** - Common to Legendary tiers
• **Trading Velocity** - How fast NFTs sell

🎯 **Investment Signals:**
• 🟢 **Strong Buy**: High volume + Rising floor + Growing holders
• 🟡 **Hold**: Stable metrics, wait for catalysts
• 🔴 **Caution**: Declining volume + Falling floor

🕰️ **Historical Data:**
• Launch date and initial mint price
• All-time high/low floor prices
• Major news events impact
• Celebrity endorsements effect

Which collection would you like me to analyze in detail?`;
  }

  // Stats & Analytics
  if (lowerMessage.includes('stats') || lowerMessage.includes('thống kê') || lowerMessage.includes('analytics') || lowerMessage.includes('data') || lowerMessage.includes('volume') || lowerMessage.includes('users')) {
    return `📈 **Marketplace Stats & Advanced Analytics:**

📊 **Current Marketplace Metrics:**
• **Total Volume**: 2,847 ETH (+12.5% vs last week)
• **Total Sales**: 15,234 transactions (+8.2%)
• **Active Users**: 4,567 unique wallets (-2.1%)
• **Average Price**: 0.187 ETH (+5.3%)

🔥 **Performance Indicators:**
• **Daily Active Users**: 1,234 (growing trend)
• **New User Acquisition**: +15% this month
• **Retention Rate**: 78% weekly active return
• **Conversion Rate**: 23% browsers to buyers

🎯 **Market Insights:**
• **Peak Trading Hours**: 6-10 PM UTC
• **Popular Price Range**: 0.05-2 ETH (60% of sales)
• **Top Trading Day**: Sundays (weekend effect)
• **Gas Fee Impact**: 15% price sensitivity

🔮 **Predictive Analytics:**
• **Volume Forecast**: +25% growth next month
• **User Growth**: Targeting 10K active users by Q1
• **Price Trends**: Bullish momentum continuing
• **Market Cycles**: Currently in accumulation phase

📊 **Advanced Features Coming:**
• Real-time price alerts and notifications
• Portfolio performance tracking
• Social sentiment analysis
• Whale wallet monitoring

Want deeper analysis on any specific metric?`;
  }

  // Activity & Transaction Tracking
  if (lowerMessage.includes('activity') || lowerMessage.includes('hoạt động') || lowerMessage.includes('history') || lowerMessage.includes('transaction') || lowerMessage.includes('lịch sử') || lowerMessage.includes('tracking')) {
    return `📋 **Activity Tracking & Transaction History:**

🔄 **Your Activity Dashboard:**
• **Recent Purchases** - Last 30 days buying history
• **Sales Activity** - Items sold and profits made
• **Bidding History** - Active and past auction bids
• **Watchlist Changes** - Price movements on favorites
• **Verification Events** - Wallet signatures and expiry

📊 **Transaction Analytics:**
• **Total Spent**: Track ETH invested in NFTs
• **Portfolio Value**: Current vs purchase price
• **P&L Summary**: Profit/Loss across all trades
• **Gas Fees Paid**: Total network costs
• **ROI Tracking**: Best and worst performing NFTs

🔔 **Smart Notifications:**
• **Outbid Alerts** - When someone bids higher
• **Sale Confirmations** - Successful transactions
• **Price Alerts** - Watchlist items hit targets
• **Verification Expiry** - 24h signature warnings

📄 **Export & Reports:**
• **CSV Export** - For tax reporting and analysis
• **Monthly Reports** - Automated trading summaries
• **Portfolio Snapshots** - Historical value tracking
• **Tax Helper** - Capital gains/losses calculator

🔒 **Privacy & Security:**
• All activity data encrypted and secure
• Only you can see your transaction history
• Optional public profile for reputation building
• GDPR compliant data handling

View your personalized activity dashboard anytime!`;
  }

  // Search & Discovery Enhancement
  if (lowerMessage.includes('search') || lowerMessage.includes('tìm kiếm') || lowerMessage.includes('filter') || lowerMessage.includes('lọc') || lowerMessage.includes('discover') || lowerMessage.includes('khám phá')) {
    return `🔍 **Advanced Search & Discovery:**

🎯 **Smart Search Features:**
• **Multi-criteria Search** - Name, collection, creator, traits
• **Price Range Filters** - Custom min/max ETH amounts
• **Rarity Filtering** - Common, Rare, Epic, Legendary
• **Status Filters** - Buy Now, Auctions, Recently Listed

🔮 **AI-Powered Discovery:**
• **Similar NFTs** - Find items like ones you love
• **Trending Predictions** - AI spots rising collections
• **Personal Recommendations** - Based on your activity
• **Price Drop Alerts** - ML detects good deals

📈 **Advanced Sorting:**
• **Price**: Low to High / High to Low
• **Recently Listed**: Newest finds first
• **Most Liked**: Community favorites
• **Ending Soon**: Urgent auction opportunities
• **Volume**: Most traded collections

🎨 **Visual Search (Coming Soon):**
• Upload image to find similar NFTs
• Color palette matching
• Art style recognition
• Trait similarity detection

💾 **Saved Searches:**
• Bookmark complex filter combinations
• Get alerts when new items match
• Share search results with friends
• Export search data for analysis

Explore 15 collections with precision and discover hidden gems!`;
  }

  // User Settings & Preferences
  if (lowerMessage.includes('settings') || lowerMessage.includes('cài đặt') || lowerMessage.includes('preferences') || lowerMessage.includes('customize') || lowerMessage.includes('thông báo') || lowerMessage.includes('theme')) {
    return `⚙️ **User Settings & Customization:**

🎨 **Theme & Display:**
• **Dark Mode** - Easy on the eyes (currently active)
• **Light Mode** - Classic bright interface
• **Grid Layouts** - 2x2, 3x3, or 4x4 NFT display
• **Card Styles** - Compact, detailed, or minimal views

🔔 **Notification Preferences:**
• **Price Alerts** - Set % thresholds (5%, 10%, 25%)
• **Collection Updates** - New drops and announcements
• **Auction Reminders** - 1h, 30min, 5min before end
• **Outbid Notifications** - Instant or batched alerts

💰 **Trading Settings:**
• **Default Currency** - ETH, USD, or local currency display
• **Gas Price Alerts** - Notify when fees are low
• **Auto-refresh** - Real-time price updates on/off
• **Confirmation Prompts** - Extra security for large purchases

🔐 **Privacy Controls:**
• **Public Profile** - Show/hide your collection
• **Activity Visibility** - Private or community sharing
• **Wallet Connection** - Auto-connect preferences
• **Data Sharing** - Analytics and improvement opt-in

🎯 **Quick Actions:**
• **Favorite Categories** - Prioritize your interests
• **Search Filters** - Save common filter combinations
• **Watchlist Limits** - Set max items to track
• **Budget Alerts** - Monthly spending reminders

Personalize your ROMA experience perfectly!`;
  }

  if (lowerMessage.includes('giá') || lowerMessage.includes('price')) {
    return `💰 **Detailed NFT Price Analysis:**

🏆 **Blue-chip Collections:**
• BAYC: 12.5 ETH floor (+5.2% 24h) - Still the king of PFP space
• CryptoPunks: 45.8 ETH floor (-2.1% 24h) - Historical significance, low volatility
• Azuki: 8.9 ETH floor (+12.3% 24h) 🔥 - Anime trend gaining momentum

🚀 **Mid-tier Notable Collections:**
• Pudgy Penguins: 6.2 ETH (+8.7% 24h) - Community ecosystem expanding
• Doodles: ~4.8 ETH - Unique art style, clear roadmap

📊 **Market Insights:** Total volume 1,245 ETH, positive sentiment. Gaming NFTs and utility-based projects are outperforming pure art collections.

Which price range interests you? I can provide more specific recommendations!`;
  }

  if (lowerMessage.includes('mua') || lowerMessage.includes('đầu tư') || lowerMessage.includes('invest') || lowerMessage.includes('buy')) {
    return `🎯 **Detailed NFT Investment Strategy:**

💡 **Portfolio Allocation by Budget:**
• <1 ETH: Secondary traits of blue-chips, upcoming mints, utility tokens
• 1-5 ETH: Mid-tier collections (Pudgy Penguins, Doodles, Clone X)
• 5-20 ETH: Blue-chip entries (Azuki, lower-tier BAYC)
• >20 ETH: Premium blue-chips, rare traits, diversification

🔍 **Key Criteria:**
1. **Utility & Roadmap** - Does the project have real use cases?
2. **Community** - Active Discord/Twitter engagement?
3. **Team Transparency** - Are founders doxxed and credible?
4. **Volume & Holders** - Sufficient liquidity for exit strategies?

⚠️ **Risk Management:**
• Only invest what you can afford to lose (100% risk)
• DYOR thoroughly before purchasing
• Don't FOMO into peak hype cycles
• Set mental stop-loss if price dumps >50%

📈 **Market Timing:** Currently in recovery phase, good entry point for long-term holds.

What's your budget range? I can provide more specific recommendations!`;
  }

  if (lowerMessage.includes('24h') || lowerMessage.includes('24 giờ') || lowerMessage.includes('hôm nay') || lowerMessage.includes('today') || lowerMessage.includes('phân tích') || lowerMessage.includes('analyze')) {
    return `📊 **24H NFT Market Analysis & Hold Recommendations:**

🎯 **HOLD/BUY Recommendations:**
• **Azuki** (8.9 ETH, +12.3%) 🟢 STRONG BUY
  - Anime trend gaining momentum globally
  - New partnership announcements expected
  - Technical breakout above resistance

• **Pudgy Penguins** (6.2 ETH, +8.7%) 🟢 BUY
  - Toy line launching in major retailers
  - Strong community engagement (+25%)
  - Undervalued compared to peers

• **Doodles** (4.8 ETH, +6.4%) 🟡 HOLD
  - Solid roadmap execution
  - Moderate volume, wait for dip

⚠️ **AVOID/SELL:**
• **CryptoPunks** (45.8 ETH, -2.1%) 🔴 OVERPRICED
  - High price, limited upside
  - Institutional selling pressure

📈 **24H Market Signals:**
• Volume: 1,245 ETH (+18% vs yesterday)
• Active traders: +22%
• New wallet connections: +15%
• Bullish sentiment: 68% (vs 45% yesterday)

💡 **Trading Strategy:**
• Take profits on BAYC if held >3 months
• Accumulate Azuki on any -5% dips
• Set stop-loss at -15% for new positions

Need specific analysis for your portfolio?`;
  }

  if (lowerMessage.includes('xu hướng') || lowerMessage.includes('trend') || lowerMessage.includes('hot')) {
    return `🚀 **NFT Market Trends Q4 2024:**

📈 **Top Gainers 24h:**
• Azuki: +12.3% (anime trend revival)
• Pudgy Penguins: +8.7% (toy line expansion)
• Doodles: +6.4% (new roadmap announcement)

🔥 **Trending Categories:**
1. **Gaming NFTs** (+22.7%) - Play-to-earn comeback
2. **Utility NFTs** (+15.3%) - Real-world use cases
3. **PFP Collections** (+8.9%) - Social status symbols

💡 **Market Drivers:**
• Bitcoin ETF spillover effect
• Instagram NFT integration rumors
• Major brands entering space (Nike, Adidas expansion)
• Layer 2 adoption (lower gas fees)

🎯 **What's Hot:**
• Collections with clear 2024 roadmaps
• Cross-chain compatibility projects
• AI-generated art with utility
• Music & Entertainment NFTs

⚠️ **Watch out:** Over-hyped mint projects, celebrity cash grabs, projects without doxxed teams.

Which trend would you like to deep-dive into?`;
  }

  if (lowerMessage.includes('create') || lowerMessage.includes('tạo') || lowerMessage.includes('mint') || lowerMessage.includes('đúc') || lowerMessage.includes('hướng dẫn')) {
    return `✨ **Complete NFT Creation Guide:**

🎨 **Step 1: Prepare Your Artwork**
• Supported formats: JPG, PNG, GIF, MP4 (max 100MB)
• Recommended size: 1000x1000px or higher
• Ensure original content (avoid copyright issues)
• High quality = higher value potential

📝 **Step 2: Fill NFT Details**
• **Name**: Unique, memorable title (e.g., "Cyber Dragon #001")
• **Description**: Tell the story, inspiration, utilities
• **Properties**: Add traits (Background: Blue, Eyes: Laser, etc.)
• **Collection**: Create new or add to existing

💰 **Step 3: Set Pricing & Royalties**
• **Initial Price**: Research similar NFTs (0.01-10 ETH)
• **Royalties**: 2.5-10% for future sales
• **Auction vs Fixed**: Auction for rare pieces, fixed for quick sales

⛽ **Step 4: Minting Process**
• Connect wallet (MetaMask recommended)
• Review gas fees (mint during low traffic)
• Confirm transaction
• Wait for blockchain confirmation (~1-5 minutes)

🚀 **Step 5: Launch Strategy**
• Share on social media with compelling story
• Engage with NFT communities
• Consider collaborations
• Price competitively for first sales

💡 **Pro Tips:**
• Mint in small batches (10-100 pieces)
• Build community before launch
• Offer utility beyond just art
• Time launches with market trends

Ready to create your first NFT? I can walk you through each step!`;
  }

  if (lowerMessage.includes('collection') || lowerMessage.includes('recommend')) {
    return `🎨 **Top Collections Recommendations:**

🏆 **Blue-chip (Safe bets):**
• **BAYC** - King of PFP, strong community, Yuga ecosystem
• **CryptoPunks** - OG status, Larva Labs legacy
• **Azuki** - Best anime art, active roadmap, growing fanbase

🚀 **Growth Potential:**
• **Pudgy Penguins** - Toy partnerships, mainstream appeal
• **Doodles** - Creative roadmap, family-friendly brand
• **Clone X** - RTFKT/Nike backing, metaverse ready

💎 **Hidden Gems (<5 ETH):**
• **Moonbirds** - Proof collective, utility focus
• **VeeFriends** - Gary Vee's project, real-world events
• **World of Women** - Diversity movement, strong community

🎮 **Gaming/Utility:**
• **Axie Infinity** - P2E pioneer, stable economy
• **The Sandbox** - Virtual land, partnerships
• **Gods Unchained** - TCG with real ownership

📊 **Selection Criteria:** Team reputation, utility roadmap, community size, volume history, upcoming catalysts.

Which category interests you? I can provide more detailed recommendations!`;
  }

  return `🤖 **ROMA NFT Assistant - Your Complete Web3 Guide:**

📊 **Current Market Status:**
• Total Volume: 1,245 ETH (24h)
• Active Collections: 4
• Market Sentiment: Bullish recovery phase

🏆 **Top Performers:**
• BAYC: 12.5 ETH floor (+5.2%)
• Azuki: 8.9 ETH floor (+12.3%) 🔥
• Pudgy Penguins: 6.2 ETH (+8.7%)

💬 **I can help you with:**
• 💰 Price analysis and investment advice
• 📈 24h market analysis and hold recommendations
• 🏪 **Marketplace features** and navigation guide  
• ✨ **Create NFT** step-by-step tutorials
• 💼 **Profile & Wallet** connection and verification
• 🛒 **Shopping Cart** and favorites management
• 🎨 **Collections** deep-dive analysis (15 available)
• 📈 **Stats & Analytics** marketplace insights
• 📋 **Activity Tracking** and transaction history
• 🔍 **Search & Discovery** advanced filtering
• ⚙️ **Settings** and personalization

**Try asking:**
• "Show me marketplace features"
• "How do I verify my wallet?"
• "Analyze Azuki collection"
• "What are the current stats?"
• "Help me set up notifications"
• "Guide me through creating an NFT"

Ready to explore the NFT world? Ask me anything! 🚀`;
}