import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const AdminBankDetails = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    routingNumber: '',
    bankAddress: '',
    swiftCode: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bankDetails');
    if (saved) {
      setBankDetails(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('bankDetails', JSON.stringify(bankDetails));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage Bank Details</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Bank Account Information</h2>
          {isSaved && <div className="success-message">✓ Saved successfully!</div>}
          
          <div className="form-group">
            <label>Bank Name</label>
            <input type="text" name="bankName" value={bankDetails.bankName} onChange={handleInputChange} placeholder="Enter bank name" required />
          </div>

          <div className="form-group">
            <label>Account Holder Name</label>
            <input type="text" name="accountHolder" value={bankDetails.accountHolder} onChange={handleInputChange} placeholder="Enter account holder name" required />
          </div>

          <div className="form-group">
            <label>Account Number</label>
            <input type="text" name="accountNumber" value={bankDetails.accountNumber} onChange={handleInputChange} placeholder="Enter account number" required />
          </div>

          <div className="form-group">
            <label>Routing Number</label>
            <input type="text" name="routingNumber" value={bankDetails.routingNumber} onChange={handleInputChange} placeholder="Enter routing number" />
          </div>

          <div className="form-group">
            <label>SWIFT Code</label>
            <input type="text" name="swiftCode" value={bankDetails.swiftCode} onChange={handleInputChange} placeholder="Enter SWIFT code" />
          </div>

          <div className="form-group">
            <label>Bank Address</label>
            <textarea name="bankAddress" value={bankDetails.bankAddress} onChange={handleInputChange} placeholder="Enter full bank address" rows="3"></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Bank Details</button>
          </div>
        </form>

        <div className="data-list">
          <h2>Current Bank Details</h2>
          {!bankDetails.bankName ? (
            <p className="no-data">No bank details configured yet.</p>
          ) : (
            <div className="info-display">
              <div className="info-item">
                <strong>Bank Name:</strong>
                <span>{bankDetails.bankName}</span>
              </div>
              <div className="info-item">
                <strong>Account Holder:</strong>
                <span>{bankDetails.accountHolder}</span>
              </div>
              <div className="info-item">
                <strong>Account Number:</strong>
                <span>{bankDetails.accountNumber}</span>
              </div>
              <div className="info-item">
                <strong>Routing Number:</strong>
                <span>{bankDetails.routingNumber || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>SWIFT Code:</strong>
                <span>{bankDetails.swiftCode || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>Bank Address:</strong>
                <span>{bankDetails.bankAddress}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBankDetails;
