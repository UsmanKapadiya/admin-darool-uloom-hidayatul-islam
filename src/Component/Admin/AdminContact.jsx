import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const AdminContact = () => {
  const [contact, setContact] = useState({
    email: '',
    phone: '',
    address: '',
    whatsapp: '',
    facebook: '',
    instagram: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('contactInfo');
    if (saved) {
      setContact(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('contactInfo', JSON.stringify(contact));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage Contact Information</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Contact Details</h2>
          {isSaved && <div className="success-message">✓ Saved successfully!</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={contact.email} onChange={handleInputChange} placeholder="Enter email" required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={contact.phone} onChange={handleInputChange} placeholder="Enter phone number" required />
          </div>

          <div className="form-group">
            <label>WhatsApp Number</label>
            <input type="tel" name="whatsapp" value={contact.whatsapp} onChange={handleInputChange} placeholder="Enter WhatsApp number" />
          </div>

          <div className="form-group">
            <label>Physical Address</label>
            <textarea name="address" value={contact.address} onChange={handleInputChange} placeholder="Enter full address" rows="3" required></textarea>
          </div>

          <div className="form-group">
            <label>Facebook URL</label>
            <input type="url" name="facebook" value={contact.facebook} onChange={handleInputChange} placeholder="Enter Facebook profile URL" />
          </div>

          <div className="form-group">
            <label>Instagram URL</label>
            <input type="url" name="instagram" value={contact.instagram} onChange={handleInputChange} placeholder="Enter Instagram profile URL" />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Contact Information</button>
          </div>
        </form>

        <div className="data-list">
          <h2>Current Contact Details</h2>
          {!contact.email ? (
            <p className="no-data">No contact information configured yet.</p>
          ) : (
            <div className="info-display">
              <div className="info-item">
                <strong>Email:</strong>
                <span><a href={`mailto:${contact.email}`}>{contact.email}</a></span>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <span><a href={`tel:${contact.phone}`}>{contact.phone}</a></span>
              </div>
              {contact.whatsapp && (
                <div className="info-item">
                  <strong>WhatsApp:</strong>
                  <span>{contact.whatsapp}</span>
                </div>
              )}
              <div className="info-item">
                <strong>Address:</strong>
                <span>{contact.address}</span>
              </div>
              {contact.facebook && (
                <div className="info-item">
                  <strong>Facebook:</strong>
                  <span><a href={contact.facebook} target="_blank" rel="noopener noreferrer">View Profile</a></span>
                </div>
              )}
              {contact.instagram && (
                <div className="info-item">
                  <strong>Instagram:</strong>
                  <span><a href={contact.instagram} target="_blank" rel="noopener noreferrer">View Profile</a></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
