// NFT Market Data & Helper Functions for AI Assistant

export interface NFTCollection {
  name: string;
  floorPrice: number;
  volume24h: number;
  change24h: number;
  description: string;
}

export interface MarketTrend {
  category: string;
  trending: string[];
  growth: number;
}

// Mock NFT market data for AI responses
export const mockNFTCollections: NFTCollection[] = [
  {
    name: "Bored Ape Yacht Club",
    floorPrice: 12.5,
    volume24h: 450,
    change24h: 5.2,
    description: "Iconic PFP collection with strong community"
  },
  {
    name: "CryptoPunks",
    floorPrice: 45.8,
    volume24h: 320,
    change24h: -2.1,
    description: "Original NFT collection, historical significance"
  },
  {
    name: "Azuki",
    floorPrice: 8.9,
    volume24h: 280,
    change24h: 12.3,
    description: "Anime-inspired art with roadmap focus"
  },
  {
    name: "Pudgy Penguins",
    floorPrice: 6.2,
    volume24h: 195,
    change24h: 8.7,
    description: "Cute penguin PFPs with expanding ecosystem"
  }
];

export const mockMarketTrends: MarketTrend[] = [
  {
    category: "PFP (Profile Pictures)",
    trending: ["Azuki", "Pudgy Penguins", "Doodles"],
    growth: 15.3
  },
  {
    category: "Gaming NFTs",
    trending: ["Axie Infinity", "Gods Unchained", "The Sandbox"],
    growth: 22.7
  },
  {
    category: "Art NFTs",
    trending: ["Art Blocks", "SuperRare", "Foundation"],
    growth: 8.9
  }
];

// Helper functions for AI responses
export const getTopCollections = (limit: number = 5): NFTCollection[] => {
  return mockNFTCollections
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, limit);
};

export const getTrendingCollections = (): NFTCollection[] => {
  return mockNFTCollections.filter(collection => collection.change24h > 0);
};

export const getMarketSummary = () => {
  const totalVolume = mockNFTCollections.reduce((sum, col) => sum + col.volume24h, 0);
  const avgChange = mockNFTCollections.reduce((sum, col) => sum + col.change24h, 0) / mockNFTCollections.length;

  return {
    totalVolume: totalVolume.toFixed(0),
    avgChange: avgChange.toFixed(1),
    activeCollections: mockNFTCollections.length
  };
};

export const formatPrice = (price: number): string => {
  return `${price} ETH`;
};

export const formatVolume = (volume: number): string => {
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K ETH`;
  }
  return `${volume} ETH`;
};

export const getInvestmentAdvice = (budget: number): string => {
  if (budget < 1) {
    return "Với budget dưới 1 ETH, hãy tìm hiểu các collection mới hoặc secondary traits của collection lớn. Chú ý đến utility và roadmap.";
  } else if (budget < 5) {
    return "Budget 1-5 ETH phù hợp với mid-tier collections như Pudgy Penguins, Doodles. Tìm collections có community mạnh và utility rõ ràng.";
  } else if (budget < 20) {
    return "Budget 5-20 ETH có thể target các blue-chip collections như Azuki, Clone X. Chú ý timing và market sentiment.";
  } else {
    return "Budget trên 20 ETH có thể consider BAYC, CryptoPunks hoặc rare pieces từ established collections. Diversify portfolio.";
  }
};