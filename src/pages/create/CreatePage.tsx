import React from 'react';
import './CreatePage.css';

const CreatePage: React.FC = () => {
  return (
    <div className="create-page">
      <div className="create-header">
        <h1>Create NFT</h1>
        <p>Mint your own unique digital assets</p>
      </div>

      <div className="create-form">
        <div className="upload-section">
          <div className="upload-area">
            <div className="upload-placeholder">
              <div className="upload-icon">📁</div>
              <p>Drag and drop your file here</p>
              <span>or click to browse</span>
            </div>
          </div>
        </div>

        <div className="form-fields">
          <div className="field-group">
            <label>Name *</label>
            <input type="text" placeholder="Enter NFT name" />
          </div>

          <div className="field-group">
            <label>Description</label>
            <textarea placeholder="Describe your NFT" rows={4}></textarea>
          </div>

          <div className="field-group">
            <label>Collection</label>
            <select>
              <option>Select collection</option>
              <option>Create new collection</option>
            </select>
          </div>

          <div className="field-group">
            <label>Price *</label>
            <div className="price-input">
              <input type="number" placeholder="0.00" step="0.01" />
              <span>ETH</span>
            </div>
          </div>
        </div>

        <div className="coming-soon">
          <h3>Coming Soon!</h3>
          <p>NFT minting functionality will be available in the next update.</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;