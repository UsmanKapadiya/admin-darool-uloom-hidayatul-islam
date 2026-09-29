import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import './AdminDashboardStyle.css';

const AdminDashboard = () => {
  const { logout, adminUser } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { title: 'Manage About', path: '/admin/about', icon: 'ℹ️' },
    { title: 'Manage Introductions', path: '/admin/introductions', icon: '📝' },
    { title: 'Manage Events', path: '/admin/events', icon: '📅' },
    { title: 'Manage Gallery', path: '/admin/gallery', icon: '🖼️' },
    { title: 'Manage Magazines', path: '/admin/magazines', icon: '📚' },
    { title: 'Manage Donations', path: '/admin/donations', icon: '💰' },
    { title: 'Manage Bank Details', path: '/admin/bank-details', icon: '🏦' },
    { title: 'Manage Contact', path: '/admin/contact', icon: '📧' },
   
  ];

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, {adminUser?.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin/dashboard" className="nav-item active">
              🏠 Dashboard
            </Link>
            <div className="nav-divider"></div>
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} className="nav-item">
                {item.icon} {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="admin-content">
          <div className="dashboard-grid">
            <h2>Manage Your Website Content</h2>
            <div className="menu-cards">
              {menuItems.map((item, index) => (
                <Link key={index} to={item.path} className="menu-card">
                  <div className="card-icon">{item.icon}</div>
                  <div className="card-title">{item.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
