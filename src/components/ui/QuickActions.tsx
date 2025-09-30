import React from 'react';
import { Sparkles, GalleryVertical, LineChart, Wallet, BookOpen } from 'lucide-react';
import './QuickActions.css';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    {
      id: 'features',
      icon: <Sparkles size={16} />,
      label: 'Features',
      prompt: 'What features does ROMA NFT Marketplace offer?'
    },
    {
      id: 'collections',
      icon: <GalleryVertical size={16} />,
      label: 'Collections',
      prompt: 'Show me the top NFT collections available on ROMA'
    },
    {
      id: 'price-compare',
      icon: <LineChart size={16} />,
      label: 'Price Analysis',
      prompt: 'Compare prices between Bored Ape and Azuki collections'
    },
    {
      id: 'investment',
      icon: <Wallet size={16} />,
      label: 'Investment',
      prompt: 'I have 5 ETH budget, which NFTs should I consider buying?'
    },
    {
      id: 'how-to',
      icon: <BookOpen size={16} />,
      label: 'Guide',
      prompt: 'How do I connect my wallet and start buying NFTs?'
    }
  ];

  return (
    <div className="quick-actions">
      <div className="quick-actions-title">🚀 Quick Actions</div>
      <div className="actions-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            className="action-button"
            onClick={() => onActionClick(action.prompt)}
          >
            <div className="action-icon">{action.icon}</div>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;