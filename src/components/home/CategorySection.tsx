import { useState } from 'react';
import { Sparkles, Image, Music, Video, Trophy, Gamepad2, Palette, TrendingUp } from 'lucide-react';
import './CategorySection.css';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: string;
  color: string;
}

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: Category[] = [
    {
      id: 'all',
      name: 'All',
      icon: <Sparkles size={18} />,
      count: '80M+',
      color: '#667eea'
    },
    {
      id: 'art',
      name: 'Art',
      icon: <Palette size={18} />,
      count: '12M+',
      color: '#f093fb'
    },
    {
      id: 'collectibles',
      name: 'Collectibles',
      icon: <Trophy size={18} />,
      count: '25M+',
      color: '#ffd700'
    },
    {
      id: 'pfp',
      name: 'PFPs',
      icon: <Image size={18} />,
      count: '18M+',
      color: '#4facfe'
    },
    {
      id: 'music',
      name: 'Music',
      icon: <Music size={18} />,
      count: '2M+',
      color: '#43e97b'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad2 size={18} />,
      count: '8M+',
      color: '#fa709a'
    },
    {
      id: 'trending',
      name: 'Trending',
      icon: <TrendingUp size={18} />,
      count: 'Hot',
      color: '#ff6b6b'
    }
  ];

  return (
    <div className="category-section">
      <div className="category-container">
        <div className="categories-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-pill ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{
                '--category-color': category.color
              } as React.CSSProperties}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
