import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', amount: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = donations.map(d => d.id === editingId ? { ...formData, id: editingId } : d);
      setDonations(updated);
      localStorage.setItem('donations', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newDonation = { ...formData, id: Date.now() };
      const updated = [...donations, newDonation];
      setDonations(updated);
      localStorage.setItem('donations', JSON.stringify(updated));
    }
    setFormData({ title: '', description: '', amount: '' });
  };

  const handleEdit = (donation) => {
    setFormData(donation);
    setEditingId(donation.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      const updated = donations.filter(d => d.id !== id);
      setDonations(updated);
      localStorage.setItem('donations', JSON.stringify(updated));
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', amount: '' });
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage Donations</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{editingId ? 'Edit Donation' : 'Add Donation Purpose'}</h2>
          
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Building Fund" required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter description" rows="4" required></textarea>
          </div>

          <div className="form-group">
            <label>Target Amount</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="Enter target amount" required />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'}</button>
            {editingId && <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>}
          </div>
        </form>

        <div className="data-list">
          <h2>Donation Purposes ({donations.length})</h2>
          {donations.length === 0 ? (
            <p className="no-data">No donation purposes configured.</p>
          ) : (
            <div className="list-container">
              {donations.map(donation => (
                <div key={donation.id} className="list-item">
                  <div className="item-content">
                    <h3>{donation.title}</h3>
                    <p><strong>Target Amount:</strong> {donation.amount}</p>
                    <p><strong>Description:</strong> {donation.description}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(donation)} className="btn btn-edit">Edit</button>
                    <button onClick={() => handleDelete(donation.id)} className="btn btn-delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDonations;
