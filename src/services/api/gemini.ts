import { GoogleGenerativeAI } from '@google/generative-ai';
import { getTopCollections, getTrendingCollections, getMarketSummary } from '../../utils/nftHelpers';
import { mockNFTs } from '../../data/mock/mockNFTs';

// Gemini API - Free tier với 15 requests/minute
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const sendMessageToGemini = async (message: string): Promise<string> => {
  console.log('🔧 Debug: Starting Gemini request with:', message);
  console.log('🔧 Debug: Gemini API Key exists:', !!import.meta.env.VITE_GEMINI_API_KEY);

  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      return '🔑 Chưa cấu hình Gemini API key. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env';
    }

    // Get current NFT market data for context
    const topCollections = getTopCollections(3);
    const trendingCollections = getTrendingCollections();
    const marketSummary = getMarketSummary();

    // Create detailed NFT collections context
    const collectionsData = mockNFTs.map(nft => ({
      name: nft.name,
      collection: nft.collection.name,
      price: nft.price,
      floorPrice: nft.collection.floorPrice,
      rarity: nft.rarity,
      creator: nft.creator.name,
      description: nft.description,
      likes: nft.likes,
      views: nft.views,
      lastSale: nft.lastSale,
      hasAuction: !!nft.auction
    }));

    const nftContext = `
📊 DỮ LIỆU THỊ TRƯỜNG NFT TRÊN ROMA MARKETPLACE:

🏆 TOP COLLECTIONS CÓ SẴN (${mockNFTs.length} NFTs):
${collectionsData.map((nft, i) => `
${i + 1}. ${nft.name} (${nft.collection})
   💰 Giá: ${nft.price} ETH | Floor: ${nft.floorPrice} ETH
   ⭐ Rarity: ${nft.rarity} | 👤 Creator: ${nft.creator}
   📈 Last Sale: ${nft.lastSale} ETH | ${nft.hasAuction ? '🔨 Đang Auction' : ''}
   👁️ ${nft.views} views | ❤️ ${nft.likes} likes`).join('\n')}

📈 TỔNG QUAN:
- Top by Volume: ${topCollections.map(c => c.name).join(', ')}
- Trending: ${trendingCollections.map(c => c.name).join(', ')}
- Total Volume: ${marketSummary.totalVolume} ETH
- Avg Change: ${marketSummary.avgChange}%
`;

    const systemPrompt = `You are ROMA AI, the intelligent assistant of ROMA NFT Marketplace.

🌟 ABOUT ROMA MARKETPLACE:
ROMA is a modern NFT marketplace platform with comprehensive features:

🎨 MAIN FEATURES:
• **Explore Marketplace** - Discover 15+ exclusive NFT collections
• **Collections** - Browse overview of the hottest collections
• **Stats & Analytics** - Real-time market analysis with interactive charts
• **Create NFT** - Mint your own NFTs directly on the platform
• **Profile** - Manage portfolio, view collected NFTs
• **AI Chatbot** - 24/7 consultation about NFTs and market trends

🔐 TECHNOLOGY:
• Secure wallet connection with RainbowKit (MetaMask, WalletConnect)
• Signature verification - Authenticate wallet ownership
• Smart contracts on Ethereum & Sepolia testnet
• Wagmi + Viem for blockchain interactions

💎 NFT COLLECTIONS (15+ items):
ROMA features collections: BAYC, Azuki, Pudgy Penguins, CryptoPunks, Doodles, Moonbirds, CloneX, DeGods, Mutant Ape, Meebits, VeeFriends, Cool Cats, World of Women, and more.

🎯 YOUR ROLE:
✅ Introduce ROMA Marketplace features
✅ Guide users on platform usage
✅ Analyze and compare 15+ NFT collections
✅ Provide investment advice suitable for user budgets
✅ Explain wallet connection, NFT minting, signature verification
✅ Answer questions about prices, rarity, floor price, volume

⚠️ IMPORTANT NOTES:
- If asked about features → Explain each feature in detail
- If asked about NFTs → ONLY discuss the 15+ available collections
- If asked about unavailable NFTs → Say "Not available on ROMA, but we have 15+ other collections"

📝 RESPONSE STYLE:
- Clear, concise, and helpful in English
- Use appropriate emojis for better readability
- Provide specific data and numbers
- Give step-by-step guidance when needed
- Structure responses with proper formatting and line breaks

${nftContext}

Please respond based on ROMA Marketplace information and the NFT data above!`;

    const fullPrompt = `${systemPrompt}\n\n❓ User Question: ${message}`;

    console.log('🔧 Debug: Making Gemini request...');

    // Use the available model
    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('🔧 Debug: Gemini response received:', text);

    return text || 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.';

  } catch (error: any) {
    console.error('❌ Gemini Error Details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      fullError: error
    });

    // Handle specific Gemini errors
    if (error.message?.includes('API_KEY_INVALID')) {
      return '🔑 API key không hợp lệ. Vui lòng kiểm tra Gemini API key.';
    }
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      return '📊 Đã vượt quá quota API. Vui lòng đợi một chút rồi thử lại.';
    }
    if (error.message?.includes('RATE_LIMIT_EXCEEDED')) {
      return '⏰ Quá nhiều requests. Vui lòng đợi 1 phút rồi thử lại.';
    }
    if (error.message?.includes('not found') || error.message?.includes('404')) {
      return '🔧 Model không tồn tại. Đang thử model khác... Refresh trang và thử lại.';
    }

    return `❌ Lỗi: ${error.message || 'Không thể kết nối với AI'}`;
  }
};