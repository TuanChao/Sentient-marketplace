import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Flame, CheckCircle, ArrowUpDown, BarChart3, Users, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MiniChart from '../../components/collections/MiniChart';
import './CollectionsPage.css';
import doodles from '../../assets/Doodles.jpg';

interface Collection {
  id: string;
  name: string;
  image: string;
  banner: string;
  floorPrice: number;
  volume24h: number;
  change24h: number;
  verified: boolean;
  trending?: boolean;
  items: number;
  owners: number;
  blockchain: string;
  category: string;
  chartData: Array<{ value: number }>;
}

// Generate random chart data
const generateChartData = (isPositive: boolean): Array<{ value: number }> => {
  const points = 20;
  const data = [];
  let value = 100;

  for (let i = 0; i < points; i++) {
    const change = (Math.random() - (isPositive ? 0.4 : 0.6)) * 10;
    value += change;
    data.push({ value: Math.max(50, value) });
  }

  return data;
}

const CollectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  // Mock data - Replace with real API data
  const allCollections: Collection[] = [
    {
      id: '1',
      name: 'Bored Ape Yacht Club',
      image: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500',
      banner: 'https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?w=500',
      floorPrice: 28.5,
      volume24h: 1234.5,
      change24h: 12.5,
      verified: true,
      trending: true,
      items: 10000,
      owners: 6000,
      blockchain: 'ethereum',
      category: 'pfp',
      chartData: generateChartData(true)
    },
    {
      id: '2',
      name: 'Azuki',
      image: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500',
      banner: 'https://i.seadn.io/gae/O0XkiR-nvvaXhK6TLLy-5RZ7bmyHTy-9MI66W2z9CbZdwCv0D1AsHrLZ7gMvlGb9rRq8m_j5T8lGbJz3-FKdO1_3QWlOBmfG9Bw?w=500',
      floorPrice: 14.2,
      volume24h: 856.3,
      change24h: -5.2,
      verified: true,
      trending: true,
      items: 10000,
      owners: 5200,
      blockchain: 'ethereum',
      category: 'pfp',
      chartData: generateChartData(false)
    },
    {
      id: '3',
      name: 'CryptoPunks',
      image: 'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500',
      banner: 'https://i.seadn.io/gae/48oVuDyfe_xhs24BC2TTVcaYCX7rrU5mpuQLyTgRDbKHj2PtzKZsQ5qC3xTH4ar34wwAXxEKH8uUDPAGffbg7boeGYqX6op5vBDcbA?w=500',
      floorPrice: 45.8,
      volume24h: 2156.7,
      change24h: 8.3,
      verified: true,
      items: 10000,
      owners: 3700,
      blockchain: 'ethereum',
      category: 'pfp',
      chartData: generateChartData(true)
    },
    {
      id: '4',
      name: 'Pudgy Penguins',
      image: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?w=500',
      banner: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?w=500',
      floorPrice: 8.9,
      volume24h: 542.1,
      change24h: 15.7,
      verified: true,
      trending: true,
      items: 8888,
      owners: 4100,
      blockchain: 'ethereum',
      category: 'pfp',
      chartData: generateChartData(true)
    },
    {
      id: '5',
      name: 'Doodles',
      image: doodles,
      banner: doodles,
      floorPrice: 3.2,
      volume24h: 234.5,
      change24h: -2.1,
      verified: true,
      items: 10000,
      owners: 5500,
      blockchain: 'ethereum',
      category: 'art',
      chartData: generateChartData(false)
    },
    {
      id: '6',
      name: 'CloneX',
      image: 'https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?w=500',
      banner: 'https://i.seadn.io/gae/F-b31qPEgrQMLKjIy-9sRwOW3EvxF32RyNw8N0aqgLbK_Mvvw0_MNmOqUhFf9qJwDnTAP5r0_Pzx0GQKhfKJJiNd2hxZHLsf0F1y?w=500',
      floorPrice: 2.1,
      volume24h: 189.3,
      change24h: 6.4,
      verified: true,
      items: 20000,
      owners: 12000,
      blockchain: 'ethereum',
      category: 'pfp',
      chartData: generateChartData(true)
    },
    {
      id: '7',
      name: 'Cosmic Wanderers',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop',
      floorPrice: 2.5,
      volume24h: 120.5,
      change24h: 22.3,
      verified: false,
      trending: true,
      items: 5000,
      owners: 2800,
      blockchain: 'polygon',
      category: 'art',
      chartData: generateChartData(true)
    },
    {
      id: '8',
      name: 'Moonbirds',
      image: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?w=500',
      banner: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?w=500',
      floorPrice: 6.7,
      volume24h: 445.8,
      change24h: -3.5,
      verified: true,
      items: 10000,
      owners: 6500,
      blockchain: 'ethereum',
      category: 'pfp',
      chartData: generateChartData(false)
    }
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    const totalVolume = allCollections.reduce((sum, col) => sum + col.volume24h, 0);
    const totalItems = allCollections.reduce((sum, col) => sum + col.items, 0);
    const totalOwners = allCollections.reduce((sum, col) => sum + col.owners, 0);
    const avgChange = allCollections.reduce((sum, col) => sum + col.change24h, 0) / allCollections.length;

    return {
      totalVolume: totalVolume.toFixed(1),
      totalItems: totalItems.toLocaleString(),
      totalOwners: totalOwners.toLocaleString(),
      avgChange: avgChange.toFixed(1)
    };
  }, []);

  // Filter and sort collections
  const filteredCollections = useMemo(() => {
    let filtered = allCollections.filter(collection => {
      const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesChain = selectedChain === 'all' || collection.blockchain === selectedChain;
      const matchesPrice = collection.floorPrice >= priceRange.min && collection.floorPrice <= priceRange.max;

      return matchesSearch && matchesChain && matchesPrice;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.volume24h - a.volume24h;
        case 'floor-high':
          return b.floorPrice - a.floorPrice;
        case 'floor-low':
          return a.floorPrice - b.floorPrice;
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'items':
          return b.items - a.items;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allCollections, searchQuery, selectedChain, sortBy, priceRange]);

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="collections-page">
      {/* Header */}
      <div className="collections-header">
        <div className="header-content">
          <h1>Top NFT Collections</h1>
          <p>The top NFTs ranked by volume, floor price and other statistics</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="collections-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="control-buttons">
          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filters
          </button>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="trending">Trending</option>
            <option value="volume">Volume</option>
            <option value="floor-high">Floor: High to Low</option>
            <option value="floor-low">Floor: Low to High</option>
            <option value="items">Items</option>
          </select>

          <select
            className="chain-select"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="all">All Chains</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="advanced-filters">
          <div className="filter-section">
            <label>Floor Price Range</label>
            <div className="price-range">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 100 })}
              />
              <span>ETH</span>
            </div>
          </div>
        </div>
      )}

      {/* Collections Table */}
      <div className="collections-container">
        <div className="collections-table">
          {/* Table Header */}
          <div className="table-header">
            <div className="table-cell rank-cell">#</div>
            <div className="table-cell collection-cell">Collection</div>
            <div className="table-cell stat-cell">Floor Price</div>
            <div className="table-cell stat-cell">Volume</div>
            <div className="table-cell stat-cell">24h %</div>
            <div className="table-cell chart-cell">Last 7 Days</div>
            <div className="table-cell stat-cell">Items</div>
            <div className="table-cell stat-cell">Owners</div>
          </div>

          {/* Table Body */}
          <div className="table-body">
            {filteredCollections.map((collection, index) => (
              <div
                key={collection.id}
                className="table-row"
                onClick={() => handleCollectionClick(collection.id)}
              >
                {/* Rank */}
                <div className="table-cell rank-cell">
                  <span className="rank-number">{index + 1}</span>
                </div>

                {/* Collection Info */}
                <div className="table-cell collection-cell">
                  <div className="collection-info-row">
                    <div className="collection-avatar-small">
                      <img src={collection.image} alt={collection.name} />
                    </div>
                    <div className="collection-details">
                      <div className="collection-name-row">
                        <span className="collection-name">{collection.name}</span>
                        {collection.verified && (
                          <CheckCircle className="verified-icon" size={16} />
                        )}
                        {collection.trending && (
                          <span className="trending-tag">
                            <Flame size={12} />
                          </span>
                        )}
                      </div>
                      <span className="chain-badge-small">{collection.blockchain}</span>
                    </div>
                  </div>
                </div>

                {/* Floor Price */}
                <div className="table-cell stat-cell">
                  <span className="stat-value-eth">{collection.floorPrice} ETH</span>
                </div>

                {/* Volume */}
                <div className="table-cell stat-cell">
                  <span className="stat-value-eth">{collection.volume24h.toLocaleString()} ETH</span>
                </div>

                {/* 24h Change */}
                <div className="table-cell stat-cell">
                  <span className={`percent-change ${collection.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {collection.change24h >= 0 ? '+' : ''}{collection.change24h}%
                  </span>
                </div>

                {/* Chart */}
                <div className="table-cell chart-cell">
                  <MiniChart
                    data={collection.chartData}
                    isPositive={collection.change24h >= 0}
                  />
                </div>

                {/* Items */}
                <div className="table-cell stat-cell">
                  <span className="stat-value-text">{collection.items.toLocaleString()}</span>
                </div>

                {/* Owners */}
                <div className="table-cell stat-cell">
                  <span className="stat-value-text">{collection.owners.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="empty-state">
          <Search size={48} />
          <h2>No collections found</h2>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;