import React, { useState } from 'react';
import { Heart, Eye, Clock, Zap } from 'lucide-react';
import { type NFT } from '../../types/nft';
import './NFTCard-dark.css';

interface NFTCardProps {
  nft: NFT;
  onLike?: (id: string) => void;
  onBuy?: (id: string) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onLike, onBuy }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(nft.id);
  };

  const formatPrice = (price: number) => {
    return price < 1 ? price.toFixed(3) : price.toFixed(2);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#8a939b';
      case 'Rare': return '#2081e2';
      case 'Epic': return '#9333ea';
      case 'Legendary': return '#f59e0b';
      default: return '#8a939b';
    }
  };

  return (
    <div className="nft-card">
      {/* NFT Image */}
      <div className="nft-image-container">
        <img
          src={nft.image}
          alt={nft.name}
          className={`nft-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Auction Timer */}
        {nft.auction && (
          <div className="auction-timer">
            <Clock size={14} />
            <span>2h 34m</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <Heart size={16} fill={isLiked ? '#ff6b6b' : 'none'} />
          </button>
          <div className="view-count">
            <Eye size={14} />
            <span>{nft.views}</span>
          </div>
        </div>

        {/* Rarity Badge */}
        <div
          className="rarity-badge"
          style={{ backgroundColor: getRarityColor(nft.rarity) }}
        >
          {nft.rarity}
        </div>
      </div>

      {/* NFT Info */}
      <div className="nft-info">
        {/* Collection */}
        <div className="collection-info">
          <span className="collection-name">{nft.collection.name}</span>
        </div>

        {/* NFT Name */}
        <h3 className="nft-name">{nft.name}</h3>

        {/* Price Section */}
        <div className="price-section">
          <div className="current-price">
            <span className="price-label">Price</span>
            <div className="price-value">
              <span className="price-amount">{formatPrice(nft.price)}</span>
              <span className="price-currency">{nft.currency}</span>
            </div>
          </div>

          {nft.lastSale && (
            <div className="last-sale">
              <span className="last-sale-label">Last Sale</span>
              <span className="last-sale-value">{formatPrice(nft.lastSale)} {nft.currency}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {nft.onSale && (
            <>
              {nft.auction ? (
                <button className="bid-btn" onClick={() => onBuy?.(nft.id)}>
                  <Zap size={16} />
                  Place Bid
                </button>
              ) : (
                <button className="buy-btn" onClick={() => onBuy?.(nft.id)}>
                  Buy Now
                </button>
              )}
            </>
          )}
          <button className="view-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;