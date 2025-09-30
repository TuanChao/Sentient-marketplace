import OpenAI from 'openai';
import { getTopCollections, getTrendingCollections, getMarketSummary } from '../../utils/nftHelpers';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export const sendMessage = async (message: string): Promise<string> => {
  console.log('🔧 Debug: Starting sendMessage with:', message);
  console.log('🔧 Debug: API Key exists:', !!import.meta.env.VITE_OPENAI_API_KEY);
  console.log('🔧 Debug: API Key starts with:', import.meta.env.VITE_OPENAI_API_KEY?.substring(0, 10));

  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    // Get current NFT market data for context
    const topCollections = getTopCollections(3);
    const trendingCollections = getTrendingCollections();
    const marketSummary = getMarketSummary();

    const nftContext = `
Current NFT Market Data (for reference):
Top Collections by Volume:
${topCollections.map(c => `- ${c.name}: ${c.floorPrice} ETH floor, ${c.volume24h} ETH volume, ${c.change24h}% change`).join('\n')}

Market Summary: ${marketSummary.totalVolume} ETH total volume, ${marketSummary.avgChange}% avg change

Trending: ${trendingCollections.map(c => c.name).join(', ')}
`;

    console.log('🔧 Debug: Making OpenAI request...');
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are ROMA, an advanced NFT & Web3 AI assistant. You are an expert in NFTs, blockchain technology, cryptocurrency markets, and digital art. You help users with: 🎨 NFT discovery and analysis, 💎 Price predictions and market trends, 🔗 Blockchain explanations, 💰 Investment advice, 🚀 New collection launches, 📊 Portfolio analysis. Always respond in English in a helpful, knowledgeable way. Use appropriate emojis and proper formatting with line breaks for readability. Keep responses detailed but well-structured.'
        },
        {
          role: 'system',
          content: nftContext
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log('🔧 Debug: OpenAI response received:', response);
    const content = response.choices[0]?.message?.content;
    console.log('🔧 Debug: Extracted content:', content);

    return content || 'Sorry, I could not process your request.';
  } catch (error: any) {
    console.error('❌ OpenAI Error Details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
      fullError: error
    });

    // More specific error messages
    if (error.status === 401) {
      return '🔑 Authentication failed. Please check your API key.';
    }
    if (error.status === 429 || error.code === 'insufficient_quota') {
      return '💳 OpenAI API quota exceeded. Please check your billing plan at https://platform.openai.com/account/billing';
    }
    if (error.status === 403) {
      return '🚫 Access forbidden. Please check your API permissions.';
    }

    return `Error: ${error.message || 'Failed to get response from AI'}`;
  }
};