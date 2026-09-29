import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const languageOptions = [
  { key: 'english', label: 'English' },
  { key: 'urdu', label: 'اردو (Urdu)' },
  { key: 'arabic', label: 'العربية (Arabic)' },
  { key: 'hindi', label: 'हिन्दी (Hindi)' },
  { key: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
];

const defaultIntroductions = {
  english: {
    title: 'Welcome to Darool Uloom Hidayatul Islam',
    content:
      'Welcome to Darool Uloom Hidayatul Islam. This is the introduction in English.',
    visible: false,
  },
  urdu: {
    title: 'دارالعلوم ہدایت الاسلام میں خوش آمدید',
    content:
      'دارالعلوم ہدایت الاسلام میں خوش آمدید۔ یہ اردو تعارفی متن ہے۔',
    visible: true,
  },
  arabic: {
    title: 'مرحبًا بكم في دار العلوم هداية الإسلام',
    content:
      'مرحبًا بكم في دار العلوم هداية الإسلام. هذا نص تقديمي باللغة العربية.',
    visible: true,
  },
  hindi: {
    title: 'दारुल उलूम हिदायतुल इस्लाम में आपका स्वागत है',
    content:
      'दारुल उलूम हिदायतुल इस्लाम में आपका स्वागत है। यह हिन्दी परिचय है।',
    visible: true,
  },
  gujarati: {
    title: 'દરુલ ઉલૂમ હિદાયતુલ ઇસ્લામમાં આપનું સ્વાગત છે',
    content:
      'દારુલ ઉલૂમ હિદાયતુલ ઇસ્લામમાં આપનું હાર્દિક સ્વાગત છે. આ ગુજરાતી ભાષામાં પરિચયાત્મક માહિતી છે.',
    visible: true,
  },
};

const AdminIntroduction = () => {
  const [introductions, setIntroductions] = useState(defaultIntroductions);
  const [activeLanguage, setActiveLanguage] = useState('english');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [formData, setFormData] = useState(defaultIntroductions.english);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedIntroductions = localStorage.getItem('introductions');
    const savedActive = localStorage.getItem('introductionActiveLang');

    if (savedIntroductions) {
      try {
        const parsed = JSON.parse(savedIntroductions);
        setIntroductions({ ...defaultIntroductions, ...parsed });
      } catch (error) {
        console.error('Failed to parse introductions from localStorage', error);
      }
    }

    if (savedActive) {
      setActiveLanguage(savedActive);
    }
  }, []);

  useEffect(() => {
    setFormData(introductions[selectedLanguage] || defaultIntroductions[selectedLanguage]);
  }, [selectedLanguage, introductions]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...introductions,
      [selectedLanguage]: {
        ...introductions[selectedLanguage],
        ...formData,
      },
    };
    setIntroductions(updated);
    localStorage.setItem('introductions', JSON.stringify(updated));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleActivate = (lang) => {
    setActiveLanguage(lang);
    localStorage.setItem('introductionActiveLang', lang);
  };

  const handleToggleVisibility = (lang) => {
    const updated = {
      ...introductions,
      [lang]: {
        ...introductions[lang],
        visible: !introductions[lang]?.visible,
      },
    };
    setIntroductions(updated);
    localStorage.setItem('introductions', JSON.stringify(updated));
    if (lang === selectedLanguage) {
      setFormData(updated[lang]);
    }
  };

  const handleEditItem = (lang) => {
    setSelectedLanguage(lang);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage Introductions</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Edit Introduction Content</h2>
          {isSaved && <div className="success-message">✓ Saved successfully!</div>}

          <div className="form-group">
            <label>Language</label>
            <select value={selectedLanguage} onChange={handleLanguageChange} className="language-select">
              {languageOptions.map((lang) => (
                <option key={lang.key} value={lang.key}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter introduction title"
              required
            />
          </div>

          <div className="form-group">
            <label>Introduction Text</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter introduction content"
              rows="7"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="visible"
                checked={formData.visible ?? true}
                onChange={handleInputChange}
              />
              {' '}
              Visible
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save Introduction
            </button>
          </div>
        </form>

        <div className="data-list">
          <h2>Introduction Listing</h2>
          <div className="languages-status">
            {languageOptions.map((lang) => {
              const entry = introductions[lang.key] || { title: '', content: '' };
              return (
                <div key={lang.key} className="language-status-item">
                  <div>
                    <h3>{lang.label}</h3>
                    <p>{entry.title || 'No title available'}</p>
                    <p className="status-text">
                      {entry.content ? entry.content.slice(0, 80) + '...' : 'No introduction text provided.'}
                    </p>
                    <span className={`status-badge ${entry.visible ? '' : 'pending'}`}>
                      {entry.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>

                  <div className="item-actions" style={{ gap: '10px' }}>
                    <button type="button" onClick={() => handleEditItem(lang.key)} className="btn btn-edit">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(lang.key)}
                      className={entry.visible ? 'btn btn-secondary' : 'btn btn-primary'}
                    >
                      {entry.visible ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleActivate(lang.key)}
                      className={activeLanguage === lang.key ? 'btn btn-secondary' : 'btn btn-primary'}
                      disabled={activeLanguage === lang.key}
                    >
                      {activeLanguage === lang.key ? 'Active' : 'Set Active'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIntroduction;
