import React from 'react';
import './StatsPage.css';

const StatsPage: React.FC = () => {
  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1>Marketplace Stats</h1>
        <p>Real-time statistics and analytics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Volume</h3>
          <div className="stat-value">2,847 ETH</div>
          <div className="stat-change positive">+12.5%</div>
        </div>

        <div className="stat-card">
          <h3>Total Sales</h3>
          <div className="stat-value">15,234</div>
          <div className="stat-change positive">+8.2%</div>
        </div>

        <div className="stat-card">
          <h3>Active Users</h3>
          <div className="stat-value">4,567</div>
          <div className="stat-change negative">-2.1%</div>
        </div>

        <div className="stat-card">
          <h3>Average Price</h3>
          <div className="stat-value">0.187 ETH</div>
          <div className="stat-change positive">+5.3%</div>
        </div>
      </div>

      <div className="coming-soon">
        <h2>Advanced Analytics Coming Soon</h2>
        <p>We're building comprehensive analytics and insights for the marketplace!</p>
      </div>
    </div>
  );
};

export default StatsPage;