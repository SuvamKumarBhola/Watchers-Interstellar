import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import AsteroidService from '../services/asteroid.service';
import Sidebar from '../components/Sidebar';


// Cosmic-themed loading screen (NEOMonitor style)
const DetailsLoadingScreen = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'neo-loading-star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 4 + 's';
      star.style.opacity = Math.random() * 0.7 + 0.3;
      container.appendChild(star);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  return (
    <div className="neo-loading-wrap">
      <div className="neo-loading-bg" />
      <div className="neo-loading-stars" ref={starsRef} />
      <div className="neo-loading-container">
        <div className="neo-loading-label">Near-Earth Object Monitor</div>
        <h1 className="neo-loading-title">Loading close approach data...</h1>
        <div className="neo-loading-spinner">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="neo-loading-orb"
          />
        </div>
        <p className="neo-loading-sub">Fetching telemetry</p>
      </div>
    </div>
  );
};

const AsteroidDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asteroid, setAsteroid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [velocityUnit, setVelocityUnit] = useState('km/h');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const starsRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await AsteroidService.getById(id);
        setAsteroid(data);
        const token = localStorage.getItem('token');
        if (token) {
          AsteroidService.addHistory(data).catch(err => console.error("Failed to save history:", err));
        }
      } catch (err) {
        setError("Failed to load asteroid details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const container = starsRef.current;
    if (!container || !asteroid) return;
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'neo-detail-star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 4 + 's';
      star.style.opacity = Math.random() * 0.7 + 0.3;
      container.appendChild(star);
    }
    return () => { container.innerHTML = ''; };
  }, [asteroid]);

  const { currentUser } = useAuth();

  const handleAddToWatchlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to add to watchlist!");
      navigate('/login');
      return;
    }
    if (!asteroid) return;
    try {
      setAdding(true);
      await AsteroidService.addToWatchlist(asteroid);
      setAdded(true);
    } catch (err) {
      console.error("Failed to add to watchlist", err);
      alert(`Failed to add: ${err.response ? err.response.data.message : err.message}`);
      if (err.response && err.response.status === 400) setAdded(true);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return (
    <>
      <Sidebar />
      <div style={{ marginLeft: '240px' }}>
        <DetailsLoadingScreen />
      </div>
    </>
  );

  if (error) return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0e17' }}>
      <Sidebar />
      <div style={{ marginLeft: '240px', flex: 1, padding: '3rem', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{error}</div>
    </div>
  );

  const isHazardous = asteroid.is_potentially_hazardous;
  const riskScore = asteroid.riskScore ?? 0;
  const velocityKmh = Math.round(asteroid.velocity_kmph ?? 0);
  const velocityMph = Math.round(velocityKmh * 0.621371);
  const missKm = asteroid.miss_distance_km ?? 0;
  const missKmM = (missKm / 1e6).toFixed(2) + 'M';
  const missMiM = (missKm * 0.621371 / 1e6).toFixed(2) + 'M';
  const moonDist = missKm / 384400;
  const diamKm = asteroid.estimated_diameter_km ?? {};
  const diamMi = asteroid.estimated_diameter_miles ?? {};
  const diamKmMin = diamKm.min ?? 0;
  const diamKmMax = diamKm.max ?? 0;
  const diamMiMin = diamMi.min ?? 0;
  const diamMiMax = diamMi.max ?? 0;
  const riskLevel = riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW';
  const riskFillPct = isHazardous ? Math.min(riskScore, 100) : Math.min(100, 100 - riskScore * 0.5);

  return (
    <>
      <style>{`
        .neo-loading-wrap, .neo-details-wrap { --space-dark: #0a0e17; --space-navy: #151b2d; --space-blue: #1e2a47; --accent-amber: #ffb847; --accent-amber-glow: rgba(255, 184, 71, 0.2); --accent-green: #4ade80; --accent-red: #ef4444; --text-primary: #e8ecf4; --text-secondary: #8b95ab; --text-muted: #525b72; --border-subtle: rgba(255, 255, 255, 0.06); --glass-bg: rgba(21, 27, 45, 0.6); }
        .neo-loading-wrap { position: relative; min-height: 100vh; background: var(--space-dark); }
        .neo-loading-bg { position: absolute; inset: 0; background: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%), linear-gradient(180deg, #0a0e17 0%, #151b2d 100%); }
        .neo-loading-stars { position: absolute; inset: 0; pointer-events: none; }
        .neo-loading-star { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: neo-twinkle 4s infinite; }
        @keyframes neo-twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .neo-loading-container { position: relative; z-index: 10; max-width: 600px; margin: 0 auto; padding: 4rem 2rem; text-align: center; }
        .neo-loading-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1rem; }
        .neo-loading-title { font-size: 1.5rem; font-weight: 300; color: var(--text-secondary); margin-bottom: 2rem; }
        .neo-loading-spinner { margin: 0 auto 1.5rem; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; }
        .neo-loading-orb { width: 24px; height: 24px; border-radius: 50%; background: var(--accent-amber); box-shadow: 0 0 30px var(--accent-amber-glow); }
        .neo-loading-sub { font-size: 0.875rem; color: var(--text-muted); }

        .neo-details-wrap { position: relative; min-height: 100vh; background: var(--space-dark); color: var(--text-primary); }
        .neo-details-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; background: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%), linear-gradient(180deg, #0a0e17 0%, #151b2d 100%); }
        .neo-detail-stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
        .neo-detail-star { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: neo-twinkle 4s infinite; }
        .neo-details-main { position: relative; z-index: 10; margin-left: 240px; max-width: 1400px; padding: 3rem 2rem; }
        .neo-details-header { text-align: center; margin-bottom: 3rem; animation: neo-fadeInDown 0.8s ease-out; }
        @keyframes neo-fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        .neo-card { background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--border-subtle); border-radius: 24px; padding: 3rem; margin-bottom: 2rem; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05); animation: neo-fadeInUp 1s ease-out 0.2s backwards; }
        @keyframes neo-fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .neo-identity { text-align: center; margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 1px solid var(--border-subtle); }
        .neo-asteroid-name { font-family: 'JetBrains Mono', monospace; font-size: 3.5rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.02em; background: linear-gradient(135deg, #e8ecf4 0%, #8b95ab 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .neo-id { font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 2rem; }
        .neo-approach-date { display: inline-flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.03); padding: 0.75rem 1.5rem; border-radius: 50px; font-size: 1.125rem; font-weight: 600; border: 1px solid var(--border-subtle); }
        .neo-badges { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
        .neo-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; border-radius: 50px; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .neo-badge-medium { background: var(--accent-amber-glow); color: var(--accent-amber); border: 1px solid var(--accent-amber); box-shadow: 0 0 20px var(--accent-amber-glow); }
        .neo-badge-safe { background: rgba(74, 222, 128, 0.1); color: var(--accent-green); border: 1px solid var(--accent-green); }
        .neo-badge-hazard { background: rgba(239, 68, 68, 0.15); color: var(--accent-red); border: 1px solid var(--accent-red); }
        .neo-risk-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .neo-risk-item { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; transition: all 0.3s ease; }
        .neo-risk-item:hover { background: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.12); transform: translateY(-2px); }
        .neo-risk-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 0.5rem; }
        .neo-risk-value { font-size: 1.25rem; font-weight: 600; color: var(--text-primary); }
        .neo-risk-indicator { width: 100%; height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; margin-top: 1rem; overflow: hidden; }
        .neo-risk-fill { height: 100%; background: linear-gradient(90deg, var(--accent-green), var(--accent-amber)); border-radius: 3px; }
        .neo-metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .neo-metric-card { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 2rem; transition: all 0.3s ease; cursor: default; }
        .neo-metric-card:hover { border-color: rgba(255, 255, 255, 0.15); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3); }
        .neo-metric-icon { width: 32px; height: 32px; margin-bottom: 1rem; opacity: 0.7; }
        .neo-metric-label { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .neo-metric-value { font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 700; line-height: 1.2; margin-bottom: 0.25rem; }
        .neo-metric-unit { font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-muted); font-weight: 400; }
        .neo-metric-range { font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem; }
        .neo-unit-toggle { display: inline-flex; background: rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 2px; margin-top: 0.5rem; }
        .neo-unit-btn { padding: 0.25rem 0.75rem; border: none; background: transparent; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; cursor: pointer; border-radius: 4px; transition: all 0.2s ease; }
        .neo-unit-btn.active { background: var(--accent-amber); color: var(--space-dark); font-weight: 600; }
        .neo-unit-btn:hover:not(.active) { background: rgba(255, 255, 255, 0.05); color: var(--text-primary); }
        .neo-size-viz { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 2.5rem; margin-bottom: 2rem; }
        .neo-size-viz-header { text-align: center; margin-bottom: 2rem; }
        .neo-size-viz-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
        .neo-size-viz-subtitle { font-size: 0.875rem; color: var(--text-muted); }
        .neo-size-comparison { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 2rem; background: rgba(255, 255, 255, 0.02); border-radius: 12px; flex-wrap: wrap; }
        .neo-comparison-item { flex: 1; text-align: center; min-width: 150px; }
        .neo-asteroid-viz { width: 120px; height: 120px; background: radial-gradient(circle, var(--accent-amber) 0%, var(--accent-amber-glow) 100%); border-radius: 50%; margin: 0 auto 1rem; box-shadow: 0 0 40px var(--accent-amber-glow); animation: neo-float 6s ease-in-out infinite; }
        @keyframes neo-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .neo-comparison-label { font-size: 0.875rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
        .neo-comparison-value { font-family: 'JetBrains Mono', monospace; font-size: 1.125rem; font-weight: 600; margin-top: 0.25rem; }
        .neo-data-footer { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: 12px; font-size: 0.875rem; color: var(--text-muted); flex-wrap: wrap; gap: 1rem; }
        .neo-footer-item { display: flex; align-items: center; gap: 0.5rem; }
        .neo-footer-label { font-weight: 600; color: var(--text-secondary); }
        .neo-actions { display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap; }
        .neo-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: none; }
        .neo-btn-primary { background: var(--accent-amber); color: #0a0e17; box-shadow: 0 0 20px var(--accent-amber-glow); }
        .neo-btn-primary:disabled { opacity: 0.7; cursor: default; }
        .neo-btn-secondary { background: transparent; color: var(--text-secondary); border: 1px solid var(--border-subtle); }
        .neo-btn-secondary:hover { border-color: rgba(255, 255, 255, 0.2); color: var(--text-primary); }
        @media (max-width: 768px) { .neo-asteroid-name { font-size: 2.5rem; } .neo-metrics-grid { grid-template-columns: 1fr; } .neo-size-comparison { flex-direction: column; } }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0e17' }}>
        <Sidebar />
        <div className="neo-details-wrap" style={{ flex: 1 }}>
          <div className="neo-details-bg" />
          <div className="neo-detail-stars" ref={starsRef} />

          <div className="neo-details-main">
            <header className="neo-details-header">
              <div className="neo-loading-label">Near-Earth Object Monitor</div>
              <h1 className="neo-loading-title">Close Approach Data Visualization</h1>
            </header>

            <main className="neo-card">
              <section className="neo-identity">
                <h2 className="neo-asteroid-name">{asteroid.name}</h2>
                <div className="neo-id">NEO Reference ID: {asteroid.neo_reference_id}</div>
                <div className="neo-approach-date">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" /><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" /><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" /><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" /></svg>
                  <span>Close Approach: {asteroid.close_approach_date}</span>
                </div>
                <div className="neo-badges">
                  <div className={`neo-badge ${riskLevel === 'HIGH' || isHazardous ? 'neo-badge-hazard' : 'neo-badge-medium'}`}>
                    <span>{isHazardous ? '⚠' : '⚠'}</span>
                    {isHazardous ? 'High Risk' : riskLevel === 'MEDIUM' ? 'Medium Risk' : 'Low Risk'}
                  </div>
                  <div className={`neo-badge ${isHazardous ? 'neo-badge-hazard' : 'neo-badge-safe'}`}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" /></svg>
                    {isHazardous ? 'Potentially Hazardous' : 'Not Potentially Hazardous'}
                  </div>
                </div>
              </section>

              <section className="neo-risk-summary">
                <div className="neo-risk-item">
                  <div className="neo-risk-label">Risk Classification</div>
                  <div className="neo-risk-value">{riskLevel}</div>
                  <div className="neo-risk-indicator">
                    <div className="neo-risk-fill" style={{ width: `${Math.min(riskScore, 100)}%`, background: isHazardous ? 'var(--accent-red)' : 'linear-gradient(90deg, var(--accent-green), var(--accent-amber))' }} />
                  </div>
                </div>
                <div className="neo-risk-item">
                  <div className="neo-risk-label">Hazard Status</div>
                  <div className="neo-risk-value" style={{ color: isHazardous ? 'var(--accent-red)' : 'var(--accent-green)' }}>{isHazardous ? 'Hazard' : 'Safe'}</div>
                  <div className="neo-risk-indicator">
                    <div className="neo-risk-fill" style={{ width: '100%', background: isHazardous ? 'var(--accent-red)' : 'var(--accent-green)' }} />
                  </div>
                </div>
                <div className="neo-risk-item">
                  <div className="neo-risk-label">Miss Distance Category</div>
                  <div className="neo-risk-value">Safe Distance</div>
                  <div className="neo-risk-indicator">
                    <div className="neo-risk-fill" style={{ width: `${Math.min(100, 100 - riskScore * 0.5)}%`, background: 'linear-gradient(90deg, var(--accent-green), var(--accent-green))' }} />
                  </div>
                </div>
                <div className="neo-risk-item">
                  <div className="neo-risk-label">Velocity Severity</div>
                  <div className="neo-risk-value">{velocityKmh > 50000 ? 'High' : velocityKmh > 30000 ? 'Moderate' : 'Low'}</div>
                  <div className="neo-risk-indicator">
                    <div className="neo-risk-fill" style={{ width: `${Math.min(100, (velocityKmh / 60000) * 100)}%` }} />
                  </div>
                </div>
              </section>

              <section className="neo-metrics-grid">
                <div className="neo-metric-card">
                  <svg className="neo-metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <div className="neo-metric-label">Relative Velocity</div>
                  <div className="neo-metric-value">{(velocityUnit === 'km/h' ? velocityKmh : velocityMph).toLocaleString()}</div>
                  <div className="neo-metric-unit">{velocityUnit}</div>
                  <div className="neo-unit-toggle">
                    <button className={`neo-unit-btn ${velocityUnit === 'km/h' ? 'active' : ''}`} onClick={() => setVelocityUnit('km/h')}>km/h</button>
                    <button className={`neo-unit-btn ${velocityUnit === 'mph' ? 'active' : ''}`} onClick={() => setVelocityUnit('mph')}>mph</button>
                  </div>
                </div>
                <div className="neo-metric-card">
                  <svg className="neo-metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" /></svg>
                  <div className="neo-metric-label">Miss Distance</div>
                  <div className="neo-metric-value">{distanceUnit === 'km' ? missKmM : missMiM}</div>
                  <div className="neo-metric-unit">{distanceUnit === 'km' ? 'kilometers' : 'miles'}</div>
                  <div className="neo-unit-toggle">
                    <button className={`neo-unit-btn ${distanceUnit === 'km' ? 'active' : ''}`} onClick={() => setDistanceUnit('km')}>km</button>
                    <button className={`neo-unit-btn ${distanceUnit === 'mi' ? 'active' : ''}`} onClick={() => setDistanceUnit('mi')}>mi</button>
                  </div>
                </div>
                <div className="neo-metric-card">
                  <svg className="neo-metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="2" /></svg>
                  <div className="neo-metric-label">Absolute Magnitude</div>
                  <div className="neo-metric-value">{asteroid.absolute_magnitude_h != null ? asteroid.absolute_magnitude_h : '—'}</div>
                  <div className="neo-metric-unit">H-value</div>
                </div>
                <div className="neo-metric-card">
                  <svg className="neo-metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="2" /><circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="2 2" /></svg>
                  <div className="neo-metric-label">Estimated Diameter (km)</div>
                  <div className="neo-metric-value">{(diamKmMax || diamKmMin || 0).toFixed(3)}</div>
                  <div className="neo-metric-unit">kilometers</div>
                  <div className="neo-metric-range">Range: {(diamKmMin || 0).toFixed(3)} – {(diamKmMax || 0).toFixed(3)} km</div>
                </div>
                <div className="neo-metric-card">
                  <svg className="neo-metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="2" /><circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="2 2" /></svg>
                  <div className="neo-metric-label">Estimated Diameter (mi)</div>
                  <div className="neo-metric-value">{(diamMiMax || diamMiMin || 0).toFixed(3)}</div>
                  <div className="neo-metric-unit">miles</div>
                  <div className="neo-metric-range">Range: {(diamMiMin || 0).toFixed(3)} – {(diamMiMax || 0).toFixed(3)} mi</div>
                </div>
                <div className="neo-metric-card">
                  <svg className="neo-metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  <div className="neo-metric-label">Encounter Geometry</div>
                  <div className="neo-metric-value">{moonDist.toFixed(1)}×</div>
                  <div className="neo-metric-unit">Moon distance</div>
                </div>
              </section>

              <section className="neo-size-viz">
                <div className="neo-size-viz-header">
                  <h3 className="neo-size-viz-title">Size Comparison</h3>
                  <p className="neo-size-viz-subtitle">Estimated diameter range visualization</p>
                </div>
                <div className="neo-size-comparison">
                  <div className="neo-comparison-item">
                    <svg width="80" height="80" fill="currentColor" opacity="0.6" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5" /><line x1="2" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <div className="neo-comparison-label">Football Field</div>
                    <div className="neo-comparison-value">~1.0x</div>
                  </div>
                  <div className="neo-comparison-item">
                    <div className="neo-asteroid-viz" />
                    <div className="neo-comparison-label">Asteroid</div>
                    <div className="neo-comparison-value">{(diamKmMin * 1000).toFixed(0)}–{(diamKmMax * 1000).toFixed(0)}m</div>
                  </div>
                  <div className="neo-comparison-item">
                    <svg width="80" height="80" fill="currentColor" opacity="0.6" viewBox="0 0 24 24"><path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg>
                    <div className="neo-comparison-label">Statue of Liberty</div>
                    <div className="neo-comparison-value">~1.1x</div>
                  </div>
                </div>
              </section>
            </main>

            <footer className="neo-data-footer">
              <div className="neo-footer-item"><span className="neo-footer-label">Data Source:</span> NASA NEO API</div>
              <div className="neo-footer-item"><span className="neo-footer-label">Last Updated:</span> {asteroid.close_approach_date} (close approach)</div>
              <div className="neo-footer-item"><span className="neo-footer-label">Confidence:</span><div style={{ display: 'flex', gap: 4 }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', opacity: i === 5 ? 0.3 : 1 }} />)}</div></div>
            </footer>

            <div className="neo-actions">
              <button type="button" className="neo-btn neo-btn-primary" onClick={handleAddToWatchlist} disabled={adding || added}>
                {added ? <Check size={18} /> : <Plus size={18} />}
                {adding ? 'Adding...' : added ? 'Added to Watchlist' : 'Add to Watchlist'}
              </button>
              <button type="button" className="neo-btn neo-btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsteroidDetails;