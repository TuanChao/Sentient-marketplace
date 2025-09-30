export type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: 'ETH' | 'BTC' | 'SOL';
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  collection: {
    name: string;
    floorPrice: number;
  };
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  likes: number;
  views: number;
  lastSale?: number;
  onSale: boolean;
  auction?: {
    endTime: Date;
    highestBid: number;
  };
}

export type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  banner: string;
  creator: string;
  floorPrice: number;
  volume: number;
  items: number;
  owners: number;
  verified: boolean;
}

export type MarketplaceFilters = {
  priceMin?: number;
  priceMax?: number;
  currency?: string;
  status?: 'buy_now' | 'auction' | 'all';
  collections?: string[];
  rarity?: string[];
  sortBy?: 'price_low' | 'price_high' | 'newest' | 'oldest' | 'most_liked';
}