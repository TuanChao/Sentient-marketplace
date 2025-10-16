import { useState, useMemo } from 'react';
import HeroSection from '../../components/home/HeroSection';
import CategorySection from '../../components/home/CategorySection';
import ChainSelector from '../../components/home/ChainSelector';
import FeaturedCollections from '../../components/home/FeaturedCollections';
import StatsOverview from '../../components/home/StatsOverview';
import NFTCard from '../../components/marketplace/NFTCard';
import { type MarketplaceFilters as FiltersType } from '../../types/nft';
import { mockNFTs } from '../../data/mock/mockNFTs';
import './HomePage.css';

const HomePage = () => {
  const [filters] = useState<FiltersType>({});

  const filteredNFTs = useMemo(() => {
    let filtered = [...mockNFTs];

    // Price filter
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(nft => nft.price >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(nft => nft.price <= filters.priceMax!);
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'auction') {
        filtered = filtered.filter(nft => nft.auction);
      } else if (filters.status === 'buy_now') {
        filtered = filtered.filter(nft => nft.onSale && !nft.auction);
      }
    }

    // Collections filter
    if (filters.collections && filters.collections.length > 0) {
      filtered = filtered.filter(nft =>
        filters.collections!.includes(nft.collection.name)
      );
    }

    // Rarity filter
    if (filters.rarity && filters.rarity.length > 0) {
      filtered = filtered.filter(nft =>
        filters.rarity!.includes(nft.rarity)
      );
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_low':
            return a.price - b.price;
          case 'price_high':
            return b.price - a.price;
          case 'most_liked':
            return b.likes - a.likes;
          case 'oldest':
            return parseInt(a.id) - parseInt(b.id);
          case 'newest':
          default:
            return parseInt(b.id) - parseInt(a.id);
        }
      });
    }

    return filtered;
  }, [filters]);

  const handleLike = (id: string) => {
    console.log('Liked NFT:', id);
  };

  const handleBuy = (id: string) => {
    console.log('Buy NFT:', id);
  };

  return (
    <div className="home-page">
      {/* Category & Chain Navigation */}
      <div className="top-navigation">
        <CategorySection />
        <ChainSelector />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Stats Overview */}
      <StatsOverview />

      {/* NFT Marketplace Section */}
      <div className="home-marketplace-section">
        <div className="marketplace-content-full">
          <div className="marketplace-header">
            <h2>Explore NFTs</h2>
            <p>Browse and discover extraordinary digital collectibles</p>
            <div className="results-info">
              <span>{filteredNFTs.length} items available</span>
            </div>
          </div>

          <div className="nft-grid">
            {filteredNFTs.map(nft => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onLike={handleLike}
                onBuy={handleBuy}
              />
            ))}
          </div>

          {filteredNFTs.length === 0 && (
            <div className="no-results">
              <h3>No NFTs found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
