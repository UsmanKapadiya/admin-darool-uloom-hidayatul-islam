import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminLogin from './Component/Admin/AdminLogin';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AdminEvents from './Component/Admin/AdminEvents';
import AdminGallery from './Component/Admin/AdminGallery';
import AdminMagazine from './Component/Admin/AdminMagazine';
import AdminDonations from './Component/Admin/AdminDonations';
import AdminBankDetails from './Component/Admin/AdminBankDetails';
import AdminContact from './Component/Admin/AdminContact';
import AdminAbout from './Component/Admin/AdminAbout';
import AdminIntroduction from './Component/Admin/AdminIntroduction';
import { AdminProvider } from './Component/Admin/AdminContext';
import ProtectedRoute from './Component/Admin/ProtectedRoute';

import './Component/Admin/AdminPagesStyle.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/events" 
            element={
              <ProtectedRoute>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/gallery" 
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/magazines" 
            element={
              <ProtectedRoute>
                <AdminMagazine />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/donations" 
            element={
              <ProtectedRoute>
                <AdminDonations />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/bank-details" 
            element={
              <ProtectedRoute>
                <AdminBankDetails />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/contact" 
            element={
              <ProtectedRoute>
                <AdminContact />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/about" 
            element={
              <ProtectedRoute>
                <AdminAbout />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/introductions" 
            element={
              <ProtectedRoute>
                <AdminIntroduction />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  </React.StrictMode>
);
