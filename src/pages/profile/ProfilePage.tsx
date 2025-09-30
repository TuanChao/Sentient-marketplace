import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { user, signAndVerify, isSigningMessage } = useAuth();
  const [activeTab, setActiveTab] = useState('collected');

  const handleVerify = async () => {
    const success = await signAndVerify();
    if (success) {
      console.log('Verification successful!');
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  const getTimeRemaining = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    const expiresAt = timestamp + 24 * 60 * 60 * 1000;
    const remaining = expiresAt - Date.now();
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    return `${hours} hours`;
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user?.walletAddress}`} alt="Profile" />
            {user?.isVerified && (
              <div className="verified-badge" title="Wallet Verified">
                <CheckCircle size={24} />
              </div>
            )}
          </div>
          <h1>{user?.username}</h1>
          <p className="wallet-address">{user?.walletAddress}</p>

          {/* Verification Status */}
          <div className="verification-status">
            {user?.isVerified ? (
              <div className="verified-info">
                <Shield className="shield-icon verified" size={20} />
                <div className="status-details">
                  <span className="status-label">Wallet Verified</span>
                  <div className="signature-info">
                    <Clock size={14} />
                    <span>Verified {formatDate(user.signedAt)}</span>
                  </div>
                  <div className="signature-info">
                    <span>Expires in {getTimeRemaining(user.signedAt)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="verify-prompt">
                <Shield className="shield-icon" size={20} />
                <div className="prompt-content">
                  <p>Verify wallet ownership to access full features</p>
                  <button
                    className="verify-btn"
                    onClick={handleVerify}
                    disabled={isSigningMessage}
                  >
                    {isSigningMessage ? 'Signing...' : 'Sign & Verify'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'collected' ? 'active' : ''}`}
          onClick={() => setActiveTab('collected')}
        >
          Collected
        </button>
        <button
          className={`tab-button ${activeTab === 'created' ? 'active' : ''}`}
          onClick={() => setActiveTab('created')}
        >
          Created
        </button>
        <button
          className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="profile-content">
        {user?.isVerified ? (
          <div className="coming-soon">
            <h2>Profile Features Coming Soon</h2>
            <p>We're building a comprehensive profile system with NFT management, trading history, and more!</p>

            {/* Display signature for verification */}
            {user.signature && (
              <div className="signature-display">
                <h3>🔐 Your Signature</h3>
                <code className="signature-code">
                  {user.signature.slice(0, 20)}...{user.signature.slice(-20)}
                </code>
              </div>
            )}
          </div>
        ) : (
          <div className="verify-required">
            <Shield size={64} className="shield-icon-large" />
            <h2>Verification Required</h2>
            <p>Please verify your wallet ownership by signing a message to access your profile features.</p>
            <button
              className="verify-btn-large"
              onClick={handleVerify}
              disabled={isSigningMessage}
            >
              {isSigningMessage ? 'Signing Message...' : '🔐 Sign & Verify Wallet'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;