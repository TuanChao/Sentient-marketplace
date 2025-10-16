import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  Package,
  TrendingUp,
  PlusSquare,
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import MarketplaceFilters from '../marketplace/MarketplaceFilters';
import { type MarketplaceFilters as FiltersType } from '../../types/nft';
import './Sidebar.css';

interface SidebarProps {
  filters?: FiltersType;
  onFiltersChange?: (filters: FiltersType) => void;
  showFilters?: boolean;
}

const Sidebar = ({ filters, onFiltersChange, showFilters = false }: SidebarProps) => {
  const location = useLocation();
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(showFilters);

  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { path: '/collections', icon: Package, label: 'Collections' },
    { path: '/stats', icon: TrendingUp, label: 'Stats' },
    { path: '/create', icon: PlusSquare, label: 'Create' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Navigation</h3>
            <ul className="nav-links">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                    >
                      <Icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Marketplace Filters (if applicable) */}
        {showFilters && filters && onFiltersChange && (
          <div className="sidebar-filters">
            <button
              className="filters-toggle"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            >
              <span>Filters</span>
              {isFiltersExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            {isFiltersExpanded && (
              <div className="filters-content">
                <MarketplaceFilters
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
