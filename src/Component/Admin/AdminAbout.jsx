import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPagesStyle.css';

const AdminAbout = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [about, setAbout] = useState({
    english: {
    title: 'Darool Uloom Hidayatul Islam',
    longDescription: 'The day of Thursday, 15th Muharram, A.H. 1283 (May 31, 1866), was that blessed and auspicious day in the Islamic history of India when the foundation stone for the renaissance of Islamic sciences was laid in the land of Deoband. Seeing the simple and ordinary manner in which it had been started, it was difficult to visualize and decide that a Madrasah beginning so humbly, with utter lack of equipment\'s, was destined to become the center, within a couple of years, of the Islamic sciences in Asia. Accordingly, before long, students desirous of studying the Holy Book and the Sunnah, the Shari\'ah and the Tariqah (the spiritual path), began to flock here in droves from this sub continent as well as from neighboring and distant countries like Afghanistan, Iran, Bukhara and Samarqand, Burma, Indonesia, Malaysia, Turkey and the far off regions of the continent of Africa, and within a short-time the radiant rays of knowledge and wisdom illumined the heart and mind of the Muslims of the continent of Asia with the light of faith (Iman) and Islamic culture.',
    mission: 'To prepare students with strong Islamic knowledge, ethics and modern awareness.',
    vision: 'To become a leading Islamic educational institution that benefits society.',
    founded: '1866',
    },

    urdu: {
    title: 'دارالعلوم ہدایت الاسلام',
    longDescription: 'جمعرات، 15 محرم الحرام 1283ھ (31 مئی 1866ء) اسلامی تاریخِ ہند کا وہ بابرکت اور سعید دن تھا جب دیوبند کی سرزمین پر علومِ اسلامیہ کی نشاۃِ ثانیہ کی بنیاد رکھی گئی۔ اس مدرسے کا آغاز نہایت سادہ اور محدود وسائل کے ساتھ ہوا، لیکن چند ہی برسوں میں یہ ادارہ ایشیا میں اسلامی علوم کا ایک عظیم مرکز بن گیا۔ قرآنِ کریم، سنتِ نبوی، شریعت اور طریقت کی تعلیم حاصل کرنے کے خواہشمند طلبہ برصغیر کے علاوہ افغانستان، ایران، بخارا، سمرقند، برما، انڈونیشیا، ملائیشیا، ترکی اور افریقہ کے دور دراز علاقوں سے یہاں آنے لگے۔ مختصر عرصے میں علم و حکمت کی روشن کرنوں نے ایشیا کے مسلمانوں کے دل و دماغ کو ایمان اور اسلامی تہذیب کی روشنی سے منور کر دیا۔',
    mission: 'طلبہ کو مضبوط اسلامی علم، اعلیٰ اخلاق اور عصری شعور سے آراستہ کرنا۔',
    vision: 'ایک ایسا ممتاز اسلامی تعلیمی ادارہ بننا جو معاشرے کے لیے مفید اور رہنمائی کا ذریعہ ہو۔',
    founded: '1866',
    },

    arabic: {
    title: 'دار العلوم هداية الإسلام',
    longDescription: 'كان يوم الخميس الموافق 15 محرم 1283هـ (31 مايو 1866م) يوماً مباركاً في تاريخ الإسلام في الهند، حيث وُضع حجر الأساس لنهضة العلوم الإسلامية في أرض ديوبند. ورغم البداية المتواضعة وقلة الإمكانات، فقد أصبح هذا المعهد خلال سنوات قليلة مركزاً بارزاً للعلوم الإسلامية في آسيا. توافد إليه الطلاب الراغبون في دراسة القرآن الكريم والسنة النبوية والشريعة والطريقة من شبه القارة الهندية ومن دول عديدة مثل أفغانستان وإيران وبخارى وسمرقند وميانمار وإندونيسيا وماليزيا وتركيا ومناطق مختلفة من إفريقيا. وسرعان ما انتشرت أنوار العلم والحكمة لتضيء قلوب وعقول المسلمين بالإيمان والثقافة الإسلامية.',
    mission: 'إعداد الطلاب بالعلم الإسلامي الراسخ والأخلاق الفاضلة والوعي المعاصر.',
    vision: 'أن تصبح مؤسسة تعليمية إسلامية رائدة تخدم المجتمع وتسهم في تطويره.',
    founded: '1866',
    },

    gujarati: {
    title: 'દારુલ ઉલૂમ હિદાયતુલ ઇસ્લામ',
    longDescription: 'ગુરુવાર, 15 મોહરમ 1283 હિજરી (31 મે 1866)નો દિવસ ભારતના ઇસ્લામી ઇતિહાસમાં એક અત્યંત શુભ અને ઐતિહાસિક દિવસ હતો, જ્યારે દેવબંદની ધરતી પર ઇસ્લામી વિજ્ઞાન અને શિક્ષણના પુનર્જાગરણનો પાયો નાખવામાં આવ્યો હતો. ખૂબ જ સાદી શરૂઆત અને મર્યાદિત સાધનો હોવા છતાં, થોડા જ વર્ષોમાં આ મદરસા એશિયામાં ઇસ્લામી શિક્ષણનું મહત્વપૂર્ણ કેન્દ્ર બની ગયું. કુરઆન, હદીસ, શરિયત અને તસવ્વુફના અભ્યાસ માટે ભારત ઉપરાંત અફઘાનિસ્તાન, ઇરાન, બુખારા, સમરકંદ, મ્યાનમાર, ઇન્ડોનેશિયા, મલેશિયા, તુર્કી અને આફ્રિકાના વિવિધ પ્રદેશોમાંથી વિદ્યાર્થીઓ અહીં આવવા લાગ્યા. થોડા જ સમયમાં જ્ઞાન અને હિકમતનો પ્રકાશ સમગ્ર એશિયાના મુસ્લિમોના હૃદય અને મનને ઈમાન અને ઇસ્લામી સંસ્કૃતિથી ઉજ્જવળ બનાવતો ગયો.',
    mission: 'વિદ્યાર્થીઓને મજબૂત ઇસ્લામી જ્ઞાન, સારા નૈતિક મૂલ્યો અને આધુનિક જાગૃતિથી સજ્જ બનાવવું.',
    vision: 'સમાજને લાભ પહોંચાડતી અગ્રણી ઇસ્લામી શૈક્ષણિક સંસ્થા બનવી.',
    founded: '1866',
    },
    stats: {
      students: '1200',
      teachers: '45',
      courses: '18',
      yearsServices: '25'
    }
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aboutInfo');
    if (saved) {
      setAbout(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbout({
      ...about,
      [selectedLanguage]: {
        ...about[selectedLanguage],
        [name]: value
      }
    });
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setAbout({
      ...about,
      stats: {
        ...about.stats,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('aboutInfo', JSON.stringify(about));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-btn">← Back</Link>
        <h1>Manage About Section</h1>
      </div>

      <div className="admin-content-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>About Information - Content</h2>
          {isSaved && <div className="success-message">✓ Saved successfully!</div>}
          
          {/* Language Selection */}
          <div className="form-group">
            <label>Language</label>
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="language-select"
            >
              <option value="english">English</option>
              <option value="urdu">اردو (Urdu)</option>
              <option value="arabic">العربية (Arabic)</option>
               <option value="gujarati">ગુજરાતી (Gujrati)</option>
            </select>
          </div>

          <div className="form-divider">Content for {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}</div>
          
          <div className="form-group">
            <label>Organization Title</label>
            <input 
              type="text" 
              name="title" 
              value={about[selectedLanguage].title} 
              onChange={handleInputChange} 
              placeholder="Enter organization title" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Long Description</label>
            <textarea 
              name="longDescription" 
              value={about[selectedLanguage].longDescription} 
              onChange={handleInputChange} 
              placeholder="Enter detailed description" 
              rows="7" 
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Our Mission</label>
            <textarea 
              name="mission" 
              value={about[selectedLanguage].mission} 
              onChange={handleInputChange} 
              placeholder="Enter mission statement" 
              rows="3" 
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Our Vision</label>
            <textarea 
              name="vision" 
              value={about[selectedLanguage].vision} 
              onChange={handleInputChange} 
              placeholder="Enter vision statement" 
              rows="3" 
              required
            ></textarea>
          </div>

          {/* <div className="form-group">
            <label>Objectives</label>
            <textarea 
              name="objectives" 
              value={about[selectedLanguage].objectives} 
              onChange={handleInputChange} 
              placeholder="Enter organization objectives" 
              rows="4" 
            ></textarea>
          </div> */}

          <div className="form-group">
            <label>Year Founded</label>
            <input 
              type="number" 
              name="founded" 
              value={about[selectedLanguage].founded} 
              onChange={handleInputChange} 
              placeholder="Enter year founded" 
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Content</button>
          </div>
        </form>

        <div className="admin-form" style={{ marginTop: '0' }}>
          <h2>Organization Statistics</h2>
          {isSaved && <div className="success-message">✓ Saved successfully!</div>}
          
          <div className="stats-grid">
            <div className="form-group">
              <label>Total Students</label>
              <input 
                type="number" 
                name="students" 
                value={about.stats.students} 
                onChange={handleStatsChange} 
                placeholder="Enter number of students" 
              />
            </div>

            <div className="form-group">
              <label>Total Teachers</label>
              <input 
                type="number" 
                name="teachers" 
                value={about.stats.teachers} 
                onChange={handleStatsChange} 
                placeholder="Enter number of teachers" 
              />
            </div>

            <div className="form-group">
              <label>Total Courses</label>
              <input 
                type="number" 
                name="courses" 
                value={about.stats.courses} 
                onChange={handleStatsChange} 
                placeholder="Enter number of courses" 
              />
            </div>

            <div className="form-group">
              <label>Years of Service</label>
              <input 
                type="number" 
                name="yearsServices" 
                value={about.stats.yearsServices} 
                onChange={handleStatsChange} 
                placeholder="Enter years of service" 
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Statistics</button>
          </div>
        </div>

        <div className="data-list">
          <h2>Preview - {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}</h2>
          {!about[selectedLanguage].title ? (
            <p className="no-data">No content configured yet.</p>
          ) : (
            <div className="info-display">
              <div className="info-item">
                <strong>Language:</strong>
                <span>{selectedLanguage.toUpperCase()}</span>
              </div>
              <div className="info-item">
                <strong>Title:</strong>
                <span>{about[selectedLanguage].title}</span>
              </div>
              <div className="info-item">
                <strong>Founded:</strong>
                <span>{about[selectedLanguage].founded || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>Long Description:</strong>
                <span>{about[selectedLanguage].longDescription}</span>
              </div>
              <div className="info-item">
                <strong>Our Mission:</strong>
                <span>{about[selectedLanguage].mission}</span>
              </div>
              <div className="info-item">
                <strong>Our Vision:</strong>
                <span>{about[selectedLanguage].vision}</span>
              </div>
            </div>
          )}

          <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#333' }}>Organization Statistics</h3>
          <div className="stats-display">
            <div className="stat-box">
              <div className="stat-number">👥</div>
              <div className="stat-label">Students</div>
              <div className="stat-value">{about.stats.students || 0}</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">👨‍🏫</div>
              <div className="stat-label">Teachers</div>
              <div className="stat-value">{about.stats.teachers || 0}</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">📚</div>
              <div className="stat-label">Courses</div>
              <div className="stat-value">{about.stats.courses || 0}</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">⏱️</div>
              <div className="stat-label">Years of Service</div>
              <div className="stat-value">{about.stats.yearsServices || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
