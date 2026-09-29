import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: '', date: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = events.map(ev => ev.id === editingId ? { ...formData, id: editingId } : ev);
      setEvents(updated);
      localStorage.setItem('events', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newEvent = { ...formData, id: Date.now() };
      const updated = [...events, newEvent];
      setEvents(updated);
      localStorage.setItem('events', JSON.stringify(updated));
    }
    setFormData({ title: '', date: '', description: '' });
  };

  const handleEdit = (event) => {
    setFormData(event);
    setEditingId(event.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      const updated = events.filter(ev => ev.id !== id);
      setEvents(updated);
      localStorage.setItem('events', JSON.stringify(updated));
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', date: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage Events</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{editingId ? 'Edit Event' : 'Add New Event'}</h2>
          
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter event description"
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Event' : 'Add Event'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="data-list">
          <h2>Events List ({events.length})</h2>
          {events.length === 0 ? (
            <p className="no-data">No events found. Add one to get started!</p>
          ) : (
            <div className="list-container">
              {events.map(event => (
                <div key={event.id} className="list-item">
                  <div className="item-content">
                    <h3>{event.title}</h3>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(event)} className="btn btn-edit">Edit</button>
                    <button onClick={() => handleDelete(event.id)} className="btn btn-delete">Delete</button>
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

export default AdminEvents;
