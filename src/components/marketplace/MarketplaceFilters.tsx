import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { type MarketplaceFilters } from '../../types/nft';
import './MarketplaceFilters-dark.css';

interface MarketplaceFiltersProps {
  filters: MarketplaceFilters;
  onFiltersChange: (filters: MarketplaceFilters) => void;
}

const MarketplaceFiltersComponent: React.FC<MarketplaceFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: false,
    status: false,
    collections: false,
    rarity: false
  });

  const collections = [
    'Bored Ape Yacht Club',
    'CryptoPunks',
    'Mutant Ape Yacht Club',
    'Azuki',
    'CloneX',
    'Moonbirds'
  ];

  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
  const statuses = [
    { value: 'all', label: 'All Items' },
    { value: 'buy_now', label: 'Buy Now' },
    { value: 'auction', label: 'On Auction' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Recently Listed' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'most_liked', label: 'Most Liked' }
  ];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (newFilters: Partial<MarketplaceFilters>) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priceMin || filters.priceMax) count++;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.collections?.length) count++;
    if (filters.rarity?.length) count++;
    return count;
  };

  return (
    <div className="marketplace-filters">
      {/* Mobile Filter Toggle */}
      <button
        className="mobile-filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={20} />
        <span>Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="filter-count">{getActiveFilterCount()}</span>
        )}
      </button>

      {/* Sort Dropdown */}
      <div className="sort-dropdown">
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="dropdown-icon" />
      </div>

      {/* Filter Panel */}
      <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h3>Filters</h3>
          <div className="filter-actions">
            {getActiveFilterCount() > 0 && (
              <button onClick={clearFilters} className="clear-btn">
                Clear All
              </button>
            )}
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Price Filter */}
        <div className="filter-section">
          <button
            className="filter-section-header"
            onClick={() => toggleSection('price')}
          >
            <span>Price</span>
            <ChevronDown
              size={16}
              className={`chevron ${openSections.price ? 'rotated' : ''}`}
            />
          </button>
          {openSections.price && (
            <div className="filter-section-content">
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => updateFilters({
                    priceMin: e.target.value ? parseFloat(e.target.value) : undefined
                  })}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => updateFilters({
                    priceMax: e.target.value ? parseFloat(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="filter-section">
          <button
            className="filter-section-header"
            onClick={() => toggleSection('status')}
          >
            <span>Status</span>
            <ChevronDown
              size={16}
              className={`chevron ${openSections.status ? 'rotated' : ''}`}
            />
          </button>
          {openSections.status && (
            <div className="filter-section-content">
              {statuses.map(status => (
                <label key={status.value} className="checkbox-label">
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={filters.status === status.value || (!filters.status && status.value === 'all')}
                    onChange={(e) => updateFilters({ status: e.target.value as any })}
                  />
                  <span>{status.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Collections Filter */}
        <div className="filter-section">
          <button
            className="filter-section-header"
            onClick={() => toggleSection('collections')}
          >
            <span>Collections</span>
            <ChevronDown
              size={16}
              className={`chevron ${openSections.collections ? 'rotated' : ''}`}
            />
          </button>
          {openSections.collections && (
            <div className="filter-section-content">
              {collections.map(collection => (
                <label key={collection} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.collections?.includes(collection) || false}
                    onChange={(e) => {
                      const current = filters.collections || [];
                      const updated = e.target.checked
                        ? [...current, collection]
                        : current.filter(c => c !== collection);
                      updateFilters({ collections: updated });
                    }}
                  />
                  <span>{collection}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rarity Filter */}
        <div className="filter-section">
          <button
            className="filter-section-header"
            onClick={() => toggleSection('rarity')}
          >
            <span>Rarity</span>
            <ChevronDown
              size={16}
              className={`chevron ${openSections.rarity ? 'rotated' : ''}`}
            />
          </button>
          {openSections.rarity && (
            <div className="filter-section-content">
              {rarities.map(rarity => (
                <label key={rarity} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.rarity?.includes(rarity) || false}
                    onChange={(e) => {
                      const current = filters.rarity || [];
                      const updated = e.target.checked
                        ? [...current, rarity]
                        : current.filter(r => r !== rarity);
                      updateFilters({ rarity: updated });
                    }}
                  />
                  <span>{rarity}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="filter-overlay" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default MarketplaceFiltersComponent;