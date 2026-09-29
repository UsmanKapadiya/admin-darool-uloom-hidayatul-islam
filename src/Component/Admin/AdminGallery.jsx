import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({ title: '', category: '', imageUrl: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedGallery = localStorage.getItem('gallery');
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = gallery.map(item => item.id === editingId ? { ...formData, id: editingId } : item);
      setGallery(updated);
      localStorage.setItem('gallery', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newItem = { ...formData, id: Date.now() };
      const updated = [...gallery, newItem];
      setGallery(updated);
      localStorage.setItem('gallery', JSON.stringify(updated));
    }
    setFormData({ title: '', category: '', imageUrl: '', description: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      const updated = gallery.filter(item => item.id !== id);
      setGallery(updated);
      localStorage.setItem('gallery', JSON.stringify(updated));
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', category: '', imageUrl: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage Gallery</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
          
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter title" required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Select category</option>
              <option value="events">Events</option>
              <option value="madrassa">Madrassa</option>
              <option value="activities">Activities</option>
            </select>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Enter image URL" required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter description" rows="4"></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editingId ? 'Update Item' : 'Add Item'}</button>
            {editingId && <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>}
          </div>
        </form>

        <div className="data-list">
          <h2>Gallery Items ({gallery.length})</h2>
          {gallery.length === 0 ? (
            <p className="no-data">No gallery items found.</p>
          ) : (
            <div className="list-container">
              {gallery.map(item => (
                <div key={item.id} className="list-item">
                  <div className="item-content">
                    <h3>{item.title}</h3>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Image:</strong> <a href={item.imageUrl} target="_blank" rel="noopener noreferrer">View</a></p>
                    <p><strong>Description:</strong> {item.description}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(item)} className="btn btn-edit">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="btn btn-delete">Delete</button>
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

export default AdminGallery;
