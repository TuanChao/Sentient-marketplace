// Function definitions for OpenAI Function Calling
// These define what actions ROMA AI can perform

export const romaFunctions = [
  {
    name: "searchNFTs",
    description: "Search and filter NFTs in the marketplace based on user criteria like price range, collection, or rarity",
    parameters: {
      type: "object",
      properties: {
        collection: {
          type: "string",
          description: "The NFT collection name (e.g., 'Bored Ape Yacht Club', 'Azuki', 'CryptoPunks')"
        },
        minPrice: {
          type: "number",
          description: "Minimum price in ETH"
        },
        maxPrice: {
          type: "number",
          description: "Maximum price in ETH"
        },
        rarity: {
          type: "string",
          enum: ["Common", "Uncommon", "Rare", "Epic", "Legendary"],
          description: "Rarity tier of the NFT"
        },
        sortBy: {
          type: "string",
          enum: ["price_low", "price_high", "newest", "oldest"],
          description: "Sort order for results"
        }
      },
      required: []
    }
  },
  {
    name: "analyzeCollection",
    description: "Get detailed analysis and statistics for a specific NFT collection including floor price, volume, and market trends",
    parameters: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the NFT collection to analyze"
        }
      },
      required: ["collectionName"]
    }
  },
  {
    name: "addToCart",
    description: "Add a specific NFT to the user's shopping cart for purchase",
    parameters: {
      type: "object",
      properties: {
        nftId: {
          type: "string",
          description: "The unique identifier of the NFT"
        },
        nftName: {
          type: "string",
          description: "The name of the NFT"
        }
      },
      required: ["nftId", "nftName"]
    }
  },
  {
    name: "addToFavorites",
    description: "Add an NFT to the user's favorites/watchlist",
    parameters: {
      type: "object",
      properties: {
        nftId: {
          type: "string",
          description: "The unique identifier of the NFT"
        },
        nftName: {
          type: "string",
          description: "The name of the NFT"
        }
      },
      required: ["nftId", "nftName"]
    }
  },
  {
    name: "getMarketStats",
    description: "Get current NFT market statistics including top collections, trending items, and overall market health",
    parameters: {
      type: "object",
      properties: {
        timeframe: {
          type: "string",
          enum: ["24h", "7d", "30d"],
          description: "Time period for statistics"
        }
      },
      required: []
    }
  },
  {
    name: "createPriceAlert",
    description: "Create a price alert that notifies the user when an NFT or collection reaches a specific price",
    parameters: {
      type: "object",
      properties: {
        collectionName: {
          type: "string",
          description: "Name of the collection to track"
        },
        targetPrice: {
          type: "number",
          description: "Target price in ETH to trigger alert"
        },
        alertType: {
          type: "string",
          enum: ["below", "above"],
          description: "Trigger when price goes below or above target"
        }
      },
      required: ["collectionName", "targetPrice", "alertType"]
    }
  },
  {
    name: "getInvestmentAdvice",
    description: "Get personalized NFT investment advice based on user's budget and preferences",
    parameters: {
      type: "object",
      properties: {
        budget: {
          type: "number",
          description: "Investment budget in ETH"
        },
        riskTolerance: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "User's risk tolerance level"
        },
        interests: {
          type: "array",
          items: {
            type: "string"
          },
          description: "User's interests (e.g., 'art', 'gaming', 'pfp', 'utility')"
        }
      },
      required: ["budget"]
    }
  },
  {
    name: "navigateToPage",
    description: "Navigate user to a specific page in the ROMA marketplace",
    parameters: {
      type: "object",
      properties: {
        page: {
          type: "string",
          enum: ["marketplace", "create", "profile", "collections", "stats"],
          description: "The page to navigate to"
        }
      },
      required: ["page"]
    }
  }
];

// Type definitions for function parameters
export interface SearchNFTsParams {
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  rarity?: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  sortBy?: "price_low" | "price_high" | "newest" | "oldest";
}

export interface AnalyzeCollectionParams {
  collectionName: string;
}

export interface AddToCartParams {
  nftId: string;
  nftName: string;
}

export interface AddToFavoritesParams {
  nftId: string;
  nftName: string;
}

export interface GetMarketStatsParams {
  timeframe?: "24h" | "7d" | "30d";
}

export interface CreatePriceAlertParams {
  collectionName: string;
  targetPrice: number;
  alertType: "below" | "above";
}

export interface GetInvestmentAdviceParams {
  budget: number;
  riskTolerance?: "low" | "medium" | "high";
  interests?: string[];
}

export interface NavigateToPageParams {
  page: "marketplace" | "create" | "profile" | "collections" | "stats";
}

// Union type for all function parameters
export type FunctionParams =
  | SearchNFTsParams
  | AnalyzeCollectionParams
  | AddToCartParams
  | AddToFavoritesParams
  | GetMarketStatsParams
  | CreatePriceAlertParams
  | GetInvestmentAdviceParams
  | NavigateToPageParams;
