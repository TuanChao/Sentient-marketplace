import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Flame, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FeaturedCollections.css';

interface Collection {
  id: string;
  name: string;
  image: string;
  banner: string;
  floorPrice: string;
  volume24h: string;
  change24h: number;
  verified: boolean;
  trending?: boolean;
  items: number;
}

const FeaturedCollections = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mock data - Replace with real API data
  const collections: Collection[] = [
    {
      id: '1',
      name: 'Bored Ape Yacht Club',
      image: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500',
      banner: 'https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?w=500',
      floorPrice: '28.5',
      volume24h: '1,234.5',
      change24h: 12.5,
      verified: true,
      trending: true,
      items: 10000
    },
    {
      id: '2',
      name: 'Azuki',
      image: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500',
      banner: 'https://i.seadn.io/gae/O0XkiR-nvvaXhK6TLLy-5RZ7bmyHTy-9MI66W2z9CbZdwCv0D1AsHrLZ7gMvlGb9rRq8m_j5T8lGbJz3-FKdO1_3QWlOBmfG9Bw?w=500',
      floorPrice: '14.2',
      volume24h: '856.3',
      change24h: -5.2,
      verified: true,
      trending: true,
      items: 10000
    },
    {
      id: '3',
      name: 'CryptoPunks',
      image: 'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500',
      banner: 'https://i.seadn.io/gae/48oVuDyfe_xhs24BC2TTVcaYCX7rrU5mpuQLyTgRDbKHj2PtzKZsQ5qC3xTH4ar34wwAXxEKH8uUDPAGffbg7boeGYqX6op5vBDcbA?w=500',
      floorPrice: '45.8',
      volume24h: '2,156.7',
      change24h: 8.3,
      verified: true,
      items: 10000
    },
    {
      id: '4',
      name: 'Pudgy Penguins',
      image: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?w=500',
      banner: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?w=500',
      floorPrice: '8.9',
      volume24h: '542.1',
      change24h: 15.7,
      verified: true,
      trending: true,
      items: 8888
    },
    {
      id: '5',
      name: 'Doodles',
      image: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3UN7BJYsT-QTWO0KWmcEt6_KIZFP4H3k?w=500',
      banner: 'https://i.seadn.io/gae/svc_rQXsGJJw_sYkAEwbUcQXOzhΧO7emJU7sE-ChAm4TM-CPnRGL_SxAjwTSa10YF0WMuM8_r8i6DaZCRdAhPJqv6y8G_J0y3yNfg?w=500',
      floorPrice: '3.2',
      volume24h: '234.5',
      change24h: -2.1,
      verified: true,
      items: 10000
    },
    {
      id: '6',
      name: 'CloneX',
      image: 'https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?w=500',
      banner: 'https://i.seadn.io/gae/F-b31qPEgrQMLKjIy-9sRwOW3EvxF32RyNw8N0aqgLbK_Mvvw0_MNmOqUhFf9qJwDnTAP5r0_Pzx0GQKhfKJJiNd2hxZHLsf0F1y?w=500',
      floorPrice: '2.1',
      volume24h: '189.3',
      change24h: 6.4,
      verified: true,
      items: 20000
    }
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    scrollElement?.addEventListener('scroll', checkScroll);
    return () => scrollElement?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="featured-collections">
      <div className="featured-header">
        <div className="featured-title-group">
          <Flame className="featured-icon" size={28} />
          <h2 className="featured-title">Trending Collections</h2>
        </div>
        <button className="view-all-btn" onClick={() => navigate('/collections')}>
          View All
        </button>
      </div>

      <div className="carousel-container">
        {canScrollLeft && (
          <button
            className="carousel-button left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="collections-scroll" ref={scrollRef}>
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="collection-card"
              onClick={() => handleCollectionClick(collection.id)}
            >
              {/* Banner */}
              <div className="collection-banner">
                <img src={collection.banner} alt={`${collection.name} banner`} />
                {collection.trending && (
                  <div className="trending-badge">
                    <TrendingUp size={14} />
                    Trending
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="collection-avatar">
                <img src={collection.image} alt={collection.name} />
                {collection.verified && (
                  <CheckCircle className="verified-badge" size={20} />
                )}
              </div>

              {/* Info */}
              <div className="collection-info">
                <h3 className="collection-name">{collection.name}</h3>
                <p className="collection-items">{collection.items.toLocaleString()} items</p>

                <div className="collection-stats">
                  <div className="stat-group">
                    <span className="stat-label">Floor</span>
                    <span className="stat-value">
                      {collection.floorPrice} ETH
                    </span>
                  </div>

                  <div className="stat-group">
                    <span className="stat-label">Volume</span>
                    <div className="stat-value-group">
                      <span className="stat-value">
                        {collection.volume24h} ETH
                      </span>
                      <span className={`stat-change ${collection.change24h >= 0 ? 'positive' : 'negative'}`}>
                        {collection.change24h >= 0 ? '+' : ''}
                        {collection.change24h}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            className="carousel-button right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedCollections;
