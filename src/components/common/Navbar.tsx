import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '../../contexts/AuthContext';
import SentientLogo from '../../assets/sentient-logo-new.png';
import './Navbar-dark.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { address, isConnected } = useAccount();
  const { connectWallet, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  // Auto-connect wallet when detected
  useEffect(() => {
    const autoConnect = async () => {
      if (isConnected && address && !user) {
        await connectWallet(address, 'injected');
      }
    };
    autoConnect();
  }, [isConnected, address, user, connectWallet]);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={SentientLogo} alt="Sentient" className="logo-image" />
          {/* <span className="logo-text">market</span> */}
        </Link>

        {/* Search Bar */}
        <div className="navbar-search">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search collections, NFTs, and creators"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* User Actions */}
        <div className="navbar-actions">
          <button className="action-btn cart-btn" title="Shopping Cart">
            <ShoppingCart size={20} />
            <span className="btn-label">Cart</span>
          </button>

          {isConnected && (
            <button className="action-btn profile-btn" onClick={handleProfileClick} title="Profile">
              <User size={20} />
              <span className="btn-label">Profile</span>
            </button>
          )}

          {/* RainbowKit Connect Button */}
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    </nav>
  );
};

export default Navbar;