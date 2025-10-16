import { useState } from 'react';
import './ChainSelector.css';

interface Chain {
  id: string;
  name: string;
  logo: string;
  volume: string;
  collections: string;
  color: string;
}

const ChainSelector = () => {
  const [activeChain, setActiveChain] = useState<string>('ethereum');

  const chains: Chain[] = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      logo: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
      volume: '$35B+',
      collections: '1.5M+',
      color: '#627eea'
    },
    {
      id: 'polygon',
      name: 'Polygon',
      logo: 'https://coin-images.coingecko.com/coins/images/4713/large/polygon.png',
      volume: '$2.8B+',
      collections: '250K+',
      color: '#8247e5'
    },
    {
      id: 'solana',
      name: 'Solana',
      logo: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
      volume: '$1.5B+',
      collections: '180K+',
      color: '#14f195'
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      logo: 'https://coin-images.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg',
      volume: '$850M+',
      collections: '95K+',
      color: '#28a0f0'
    },
    {
      id: 'optimism',
      name: 'Optimism',
      logo: 'https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png',
      volume: '$620M+',
      collections: '72K+',
      color: '#ff0420'
    },
    {
      id: 'base',
      name: 'Base',
      logo: 'https://github.com/base-org/brand-kit/blob/main/logo/symbol/Base_Symbol_Blue.png?raw=true',
      volume: '$480M+',
      collections: '58K+',
      color: '#0052ff'
    },
    {
      id: 'avalanche',
      name: 'Avalanche',
      logo: 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      volume: '$350M+',
      collections: '42K+',
      color: '#e84142'
    },
    {
      id: 'bnb',
      name: 'BNB Chain',
      logo: 'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      volume: '$520M+',
      collections: '68K+',
      color: '#f3ba2f'
    }
  ];

  return (
    <div className="chain-selector">
      <div className="chain-container">
        <div className="chains-scroll">
          {chains.map((chain) => (
            <button
              key={chain.id}
              className={`chain-pill ${activeChain === chain.id ? 'active' : ''}`}
              onClick={() => setActiveChain(chain.id)}
              style={{
                '--chain-color': chain.color
              } as React.CSSProperties}
              title={chain.name}
            >
              <div className="chain-logo">
                <img src={chain.logo} alt={chain.name} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChainSelector;
