import { GoogleGenerativeAI } from '@google/generative-ai';
import { getTopCollections, getTrendingCollections, getMarketSummary } from '../../utils/nftHelpers';
import { romaFunctions } from '../ai/functionDefinitions';
import { mockNFTs } from '../../data/mock/mockNFTs';

// Gemini API - Free tier với 15 requests/minute
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface FunctionCall {
  name: string;
  arguments: string;
}

export interface AIResponse {
  content: string;
  functionCall?: FunctionCall;
}

// Convert ROMA functions to Gemini format
const convertToGeminiFunctions = () => {
  return romaFunctions.map(fn => ({
    name: fn.name,
    description: fn.description,
    parameters: fn.parameters
  }));
};

export const sendMessageWithFunctions = async (
  message: string,
  conversationHistory: any[] = []
): Promise<AIResponse> => {
  console.log('🔧 Debug: Starting Gemini sendMessageWithFunctions with:', message);
  console.log('🔧 Debug: Gemini API Key exists:', !!import.meta.env.VITE_GEMINI_API_KEY);

  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
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

    const systemInstruction = `You are ROMA, an advanced NFT & Web3 AI assistant with ACTION capabilities. You are an expert in NFTs, blockchain technology, cryptocurrency markets, and digital art.

Core Capabilities:
🎨 NFT discovery and analysis
💎 Price predictions and market trends
🔗 Blockchain explanations
💰 Investment advice
🚀 New collection launches
📊 Portfolio analysis

IMPORTANT: You can perform ACTIONS for users by calling functions:
- Search NFTs by collection, price, rarity
- Analyze collections in detail
- Add NFTs to cart or favorites
- Get market statistics
- Create price alerts
- Navigate to different pages

When a user asks you to DO something (search, find, show, add, analyze, etc.), you MUST call the appropriate function instead of just describing it.

Examples:
❌ "I can help you search for NFTs under 5 ETH"
✅ Call searchNFTs function with maxPrice: 5

❌ "You can find Azuki NFTs in the marketplace"
✅ Call searchNFTs function with collection: "Azuki"

❌ "I'll analyze Bored Ape Yacht Club for you"
✅ Call analyzeCollection function with collectionName: "Bored Ape Yacht Club"

Always be proactive and take action when users request something!

${nftContext}

About ROMA AI, the intelligent assistant of ROMA NFT Marketplace.

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

    console.log('🔧 Debug: Making Gemini request with function calling...');

    // Use Gemini 2.0 Flash Experimental with function calling
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      systemInstruction: systemInstruction,
      tools: [{
        functionDeclarations: convertToGeminiFunctions()
      }]
    });

    const chat = model.startChat({
      history: conversationHistory,
    });

    const result = await chat.sendMessage(message);
    const response = result.response;

    console.log('🔧 Debug: Gemini response received:', response);

    // Check if Gemini wants to call a function
    const functionCalls = response.functionCalls();

    if (functionCalls && functionCalls.length > 0) {
      const functionCall = functionCalls[0];
      console.log('🎯 Function call detected:', functionCall);
      return {
        content: '',
        functionCall: {
          name: functionCall.name,
          arguments: JSON.stringify(functionCall.args)
        }
      };
    }

    // Regular text response
    const content = response.text();
    console.log('🔧 Debug: Extracted content:', content);

    return {
      content: content || 'Sorry, I could not process your request.'
    };

  } catch (error: any) {
    console.error('❌ Gemini Error Details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      fullError: error
    });

    // More specific error messages
    if (error.message?.includes('API key') || error.message?.includes('API_KEY_INVALID')) {
      return { content: '🔑 Authentication failed. Please check your Gemini API key.' };
    }
    if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('QUOTA_EXCEEDED')) {
      return { content: '💳 Gemini API quota exceeded. Free tier: 15 requests/minute. Please try again in a minute.' };
    }
    if (error.message?.includes('RATE_LIMIT_EXCEEDED')) {
      return { content: '⏰ Too many requests. Please wait 1 minute and try again.' };
    }
    if (error.status === 403) {
      return { content: '🚫 Access forbidden. Please check your API permissions.' };
    }

    return { content: `Error: ${error.message || 'Failed to get response from AI'}` };
  }
};

// Legacy function for backward compatibility
export const sendMessage = async (message: string): Promise<string> => {
  const response = await sendMessageWithFunctions(message);
  return response.content;
};

// Keep old function for backward compatibility
export const sendMessageToGemini = async (message: string): Promise<string> => {
  const response = await sendMessageWithFunctions(message);
  return response.content;
};