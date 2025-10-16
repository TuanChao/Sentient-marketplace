import OpenAI from 'openai';
import { getTopCollections, getTrendingCollections, getMarketSummary } from '../../utils/nftHelpers';
import { romaFunctions } from '../ai/functionDefinitions';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// DeepSeek client using OpenAI SDK (DeepSeek API is OpenAI-compatible)
const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface FunctionCall {
  name: string;
  arguments: string;
}

export interface AIResponse {
  content: string;
  functionCall?: FunctionCall;
}

export const sendMessageWithFunctions = async (
  message: string,
  conversationHistory: ChatCompletionMessageParam[] = []
): Promise<AIResponse> => {
  console.log('🔧 Debug: Starting DeepSeek sendMessageWithFunctions with:', message);
  console.log('🔧 Debug: API Key exists:', !!import.meta.env.VITE_DEEPSEEK_API_KEY);

  try {
    if (!import.meta.env.VITE_DEEPSEEK_API_KEY) {
      throw new Error('DeepSeek API key is not configured');
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

Available Collections: Bored Ape Yacht Club, CryptoPunks, Azuki, Pudgy Penguins, Doodles, Clone X, Moonbirds, Otherdeed, Mutant Ape Yacht Club, DeGods, Art Blocks, VeeFriends, Meebits, Cool Cats, World of Women
`;

    const systemMessage: ChatCompletionMessageParam = {
      role: 'system',
      content: `You are ROMA, an advanced NFT & Web3 AI assistant with ACTION capabilities. You are an expert in NFTs, blockchain technology, cryptocurrency markets, and digital art.

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

${nftContext}`
    };

    const messages: ChatCompletionMessageParam[] = [
      systemMessage,
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    console.log('🔧 Debug: Making DeepSeek request with function calling...');
    const response = await deepseek.chat.completions.create({
      model: 'deepseek-chat', // DeepSeek's main model
      messages: messages,
      tools: romaFunctions.map(fn => ({
        type: 'function' as const,
        function: fn
      })),
      tool_choice: 'auto',
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log('🔧 Debug: DeepSeek response received:', response);
    const choice = response.choices[0];
    const aiMessage = choice?.message;

    // Check if AI wants to call a function (DeepSeek uses tool_calls)
    if (aiMessage?.tool_calls && aiMessage.tool_calls.length > 0) {
      const toolCall = aiMessage.tool_calls[0];
      if (toolCall.type === 'function') {
        console.log('🎯 Function call detected:', toolCall.function);
        return {
          content: '',
          functionCall: {
            name: toolCall.function.name,
            arguments: toolCall.function.arguments
          }
        };
      }
    }

    // Regular text response
    const content = aiMessage?.content;
    console.log('🔧 Debug: Extracted content:', content);

    return {
      content: content || 'Sorry, I could not process your request.'
    };

  } catch (error: any) {
    console.error('❌ DeepSeek Error Details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
      fullError: error
    });

    // More specific error messages
    if (error.status === 401) {
      return { content: '🔑 Authentication failed. Please check your DeepSeek API key.' };
    }
    if (error.status === 429 || error.code === 'insufficient_quota') {
      return { content: '💳 DeepSeek API quota exceeded. Please check your account at https://platform.deepseek.com' };
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
