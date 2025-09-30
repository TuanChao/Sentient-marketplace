import React from 'react';
import './CollectionsPage.css';

const CollectionsPage: React.FC = () => {
  return (
    <div className="collections-page">
      <div className="collections-header">
        <h1>Featured Collections</h1>
        <p>Discover trending and popular NFT collections</p>
      </div>

      <div className="collections-grid">
        <div className="collection-card">
          <div className="collection-banner">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop" alt="Collection" />
          </div>
          <div className="collection-info">
            <h3>Cosmic Wanderers</h3>
            <p>Floor: 2.5 ETH • Volume: 1.2K ETH</p>
          </div>
        </div>

        <div className="coming-soon">
          <h2>More Collections Coming Soon</h2>
          <p>We're working on bringing you more amazing collections!</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;