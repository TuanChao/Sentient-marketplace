import { TrendingUp, Users, Package, Activity } from 'lucide-react';
import './StatsOverview.css';

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  description: string;
}

const StatsOverview = () => {
  const stats: Stat[] = [
    {
      icon: <Activity size={28} />,
      label: 'Total Volume',
      value: '$40.2B',
      change: '+12.5%',
      changeType: 'positive',
      description: 'All-time trading volume'
    },
    {
      icon: <Package size={28} />,
      label: 'NFTs Sold',
      value: '80M+',
      change: '+8.3%',
      changeType: 'positive',
      description: 'Total NFTs traded'
    },
    {
      icon: <Users size={28} />,
      label: 'Active Users',
      value: '2.5M',
      change: '+15.7%',
      changeType: 'positive',
      description: 'Monthly active traders'
    },
    {
      icon: <TrendingUp size={28} />,
      label: 'Collections',
      value: '2M+',
      change: '+6.2%',
      changeType: 'positive',
      description: 'Unique collections listed'
    }
  ];

  return (
    <div className="stats-overview">
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">ROMA in Numbers</h2>
          <p className="stats-subtitle">
            Real-time statistics showcasing the world's leading NFT marketplace
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon-wrapper">
                <div className="stat-icon">
                  {stat.icon}
                </div>
              </div>

              <div className="stat-content">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value-row">
                  <h3 className="stat-value">{stat.value}</h3>
                  <span className={`stat-change ${stat.changeType}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="stat-description">{stat.description}</p>
              </div>

              <div className="stat-glow" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="stats-footer">
          <div className="stats-info-card">
            <div className="info-icon">📊</div>
            <div>
              <h4>Live Market Data</h4>
              <p>Statistics updated in real-time from blockchain data</p>
            </div>
          </div>
          <div className="stats-info-card">
            <div className="info-icon">🔒</div>
            <div>
              <h4>Secure Trading</h4>
              <p>Smart contracts audited and battle-tested</p>
            </div>
          </div>
          <div className="stats-info-card">
            <div className="info-icon">⚡</div>
            <div>
              <h4>Fast Transactions</h4>
              <p>Lightning-fast trades on Ethereum network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
