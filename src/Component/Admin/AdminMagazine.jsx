import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const AdminMagazine = () => {
  const [magazines, setMagazines] = useState([]);
  const [formData, setFormData] = useState({
    month: '',
    name: 'મકસદે મુસ્તફા ﷺ',
    serialNumber: '',
    thumbnail: null,
    pdf: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [pdfName, setPdfName] = useState('');

  useEffect(() => {
    const savedMagazines = localStorage.getItem('magazines');
    if (savedMagazines) {
      setMagazines(JSON.parse(savedMagazines));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result });
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, pdf: reader.result });
        setPdfName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.month || !formData.name || !formData.serialNumber || !formData.thumbnail || !formData.pdf) {
      alert('Please fill in all fields and upload both thumbnail and PDF');
      return;
    }

    if (editingId) {
      const updated = magazines.map(item =>
        item.id === editingId ? { ...formData, id: editingId } : item
      );
      setMagazines(updated);
      localStorage.setItem('magazines', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newMagazine = { ...formData, id: Date.now() };
      const updated = [...magazines, newMagazine];
      setMagazines(updated);
      localStorage.setItem('magazines', JSON.stringify(updated));
    }

    setFormData({
      month: '',
      name: '',
      serialNumber: '',
      thumbnail: null,
      pdf: null,
    });
    setThumbnailPreview(null);
    setPdfName('');
  };

  const handleEdit = (item) => {
    setFormData(item);
    setThumbnailPreview(item.thumbnail);
    setPdfName(item.pdfName || 'PDF uploaded');
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this magazine?')) {
      const updated = magazines.filter(item => item.id !== id);
      setMagazines(updated);
      localStorage.setItem('magazines', JSON.stringify(updated));
    }
  };

  const handleCancel = () => {
    setFormData({
      month: '',
      name: '',
      serialNumber: '',
      thumbnail: null,
      pdf: null,
    });
    setThumbnailPreview(null);
    setPdfName('');
    setEditingId(null);
  };

  const downloadPdf = (pdfData) => {
    const link = document.createElement('a');
    link.href = pdfData;
    link.download = 'magazine.pdf';
    link.click();
  };

  console.log('Current Magazines:', magazines);
  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage Magazines</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{editingId ? 'Edit Magazine' : 'Add Magazine'}</h2>

          <div className="form-group">
            <label>Month</label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              placeholder="Select month"
              required
            />
          </div>

          <div className="form-group">
            <label>Magazine Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter magazine name"
              required
            />
          </div>

          <div className="form-group">
            <label>Serial Number</label>
            <input
              type="number"
              MIN="1"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
              placeholder="Enter serial number"
              required
            />
          </div>

          <div className="form-group">
            <label>Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              required={!editingId}
            />
            {thumbnailPreview && (
              <div className="preview">
                <img src={thumbnailPreview} alt="Thumbnail preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>PDF File</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
              required={!editingId}
            />
            {pdfName && <p style={{ color: '#28a745' }}>✓ {pdfName}</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Magazine' : 'Add Magazine'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="data-list">
          <h2>Magazines ({magazines.length})</h2>
          {magazines.length === 0 ? (
            <p className="no-data">No magazines found.</p>
          ) : (
            <div className="list-container">
              {magazines.map(item => (
                <div key={item.id} className="list-item">
                  <div className="item-content">
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <h3>{item.name}</h3>
                        <p><strong>Month:</strong> {new Date(item.month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                        <p><strong>Serial Number:</strong> {item.serialNumber}</p>
                        <p><strong>PDF:</strong> <button
                          type="button"
                          onClick={() => downloadPdf(item.pdf)}
                          className="btn btn-link"
                          style={{ textDecoration: 'underline', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                        >
                          Download
                        </button></p>
                      </div>
                    </div>
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

export default AdminMagazine;
