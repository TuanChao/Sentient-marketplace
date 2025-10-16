# 🤖 ROMA AI Agent - Function Calling Guide

## ✨ What's New?

ROMA is now a **full AI Agent** powered by GPT-4 with **Function Calling** capabilities!

Instead of just talking, ROMA can now **TAKE ACTION**:
- 🔍 Search and filter NFTs
- 📊 Analyze collections
- 🛒 Add items to cart
- ❤️ Manage favorites
- 🔔 Create price alerts
- 💰 Provide investment advice
- 🔗 Navigate to pages

## 🚀 Setup

### 1. Environment Variables

Make sure you have your OpenAI API key in `.env`:

```bash
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Important:** Function calling works best with **GPT-4**. The code is configured to use `gpt-4` model.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

## 🧪 Test Commands

Try these commands in the chatbot to see ROMA in action:

### 🔍 Search NFTs
```
"Search for Azuki NFTs under 10 ETH"
"Show me rare Pudgy Penguins"
"Find NFTs between 5 and 15 ETH"
"Search for expensive CryptoPunks"
```

### 📊 Analyze Collections
```
"Analyze Bored Ape Yacht Club"
"Tell me about Azuki collection"
"Show me CryptoPunks stats"
"What's happening with Pudgy Penguins?"
```

### 📈 Market Stats
```
"Show market statistics"
"What's trending in NFTs?"
"Give me market overview"
"Show me top collections"
```

### 💰 Investment Advice
```
"What should I buy with 5 ETH?"
"Give me investment advice for 15 ETH"
"I have 2 ETH, what's the best investment?"
"Recommend NFTs for 20 ETH budget with high risk"
```

### 🔔 Price Alerts
```
"Alert me when BAYC drops below 15 ETH"
"Create a price alert for Azuki above 10 ETH"
"Notify me when CryptoPunks goes below 50 ETH"
```

### 🛒 Cart & Favorites
```
"Add Azuki #1234 to my cart"
"Add this NFT to favorites"
"Add Pudgy Penguin #5678 to watchlist"
```

### 🔗 Navigation
```
"Take me to marketplace"
"Go to create page"
"Show me my profile"
"Navigate to collections"
"Open stats page"
```

## 🏗️ Architecture

### Files Created/Modified

1. **`src/services/ai/functionDefinitions.ts`** - Defines all available functions
2. **`src/services/ai/functionHandlers.ts`** - Executes function logic
3. **`src/services/api/openai.ts`** - Updated with function calling
4. **`src/types/chat.ts`** - Added function call types
5. **`src/components/ui/Chatbot.tsx`** - Integrated function calling

### How It Works

```
User Message
    ↓
GPT-4 with Function Definitions
    ↓
AI decides: Talk or Take Action?
    ↓
┌─────────┴─────────┐
│                   │
Text Response    Function Call
    ↓                ↓
Display         Execute Handler
                     ↓
                Show Result
                     ↓
                Optional Navigation
```

## 🎯 Available Functions

### 1. **searchNFTs**
Searches marketplace with filters.

**Parameters:**
- `collection` - Collection name
- `minPrice` - Minimum price in ETH
- `maxPrice` - Maximum price in ETH
- `rarity` - Common, Uncommon, Rare, Epic, Legendary
- `sortBy` - price_low, price_high, newest, oldest

### 2. **analyzeCollection**
Detailed collection analysis.

**Parameters:**
- `collectionName` - Name of collection (required)

### 3. **addToCart**
Add NFT to shopping cart.

**Parameters:**
- `nftId` - NFT identifier (required)
- `nftName` - NFT name (required)

### 4. **addToFavorites**
Add NFT to watchlist.

**Parameters:**
- `nftId` - NFT identifier (required)
- `nftName` - NFT name (required)

### 5. **getMarketStats**
Get market statistics.

**Parameters:**
- `timeframe` - 24h, 7d, 30d (optional)

### 6. **createPriceAlert**
Create price notification.

**Parameters:**
- `collectionName` - Collection to watch (required)
- `targetPrice` - Price threshold in ETH (required)
- `alertType` - below or above (required)

### 7. **getInvestmentAdvice**
Personalized investment recommendations.

**Parameters:**
- `budget` - Investment amount in ETH (required)
- `riskTolerance` - low, medium, high (optional)
- `interests` - Array of interests (optional)

### 8. **navigateToPage**
Navigate to app pages.

**Parameters:**
- `page` - marketplace, create, profile, collections, stats (required)

## 🔧 Development

### Adding New Functions

1. **Define function** in `functionDefinitions.ts`:
```typescript
{
  name: "yourFunction",
  description: "What it does",
  parameters: {
    type: "object",
    properties: {
      param1: {
        type: "string",
        description: "Parameter description"
      }
    },
    required: ["param1"]
  }
}
```

2. **Create handler** in `functionHandlers.ts`:
```typescript
export const handleYourFunction = (params: YourParams): FunctionResult => {
  // Your logic here
  return {
    success: true,
    message: "Success message",
    data: params,
    action: {
      type: 'YOUR_ACTION',
      payload: params
    }
  };
};
```

3. **Add to router** in `executeFunctionCall`:
```typescript
case 'yourFunction':
  return handleYourFunction(params);
```

## 🐛 Debugging

Enable console logs to see function calling in action:

```
🤖 Chatbot: Sending message: [user message]
🔧 Debug: Making OpenAI request with function calling...
🎯 Function call detected: [function name and args]
🔍 Executing searchNFTs: [parameters]
✅ Function result: [result object]
```

## 💡 Tips

1. **Be Specific**: "Show me Azuki NFTs" works better than "show nfts"
2. **Natural Language**: ROMA understands conversational commands
3. **Combine Actions**: "Find cheap Pudgy Penguins and add to cart"
4. **Use Context**: ROMA remembers conversation history

## 🚨 Troubleshooting

### Function not being called?
- Check API key is valid
- Ensure using GPT-4 (not 3.5)
- Be more specific in your request
- Check console for errors

### Navigation not working?
- Ensure React Router is configured
- Check browser console for errors
- Verify page routes exist

### Getting errors?
- Check OpenAI API quota
- Verify .env file is loaded
- Check function parameters are valid

## 📊 Performance

- **GPT-4 Response Time**: 2-5 seconds
- **Function Execution**: <100ms
- **Total Time**: ~3-6 seconds

## 🎉 Success Metrics

ROMA can now:
- ✅ Understand user intent
- ✅ Execute actions automatically
- ✅ Navigate between pages
- ✅ Provide real-time feedback
- ✅ Remember conversation context

## 🔮 Future Enhancements

- [ ] Real blockchain integration
- [ ] Multi-step workflows
- [ ] Confirmation dialogs
- [ ] Action history
- [ ] Undo functionality
- [ ] Voice commands
- [ ] Autonomous trading (with approval)

---

**Built with ❤️ for ROMA NFT Marketplace**
