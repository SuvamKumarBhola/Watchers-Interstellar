import React, { useState, useEffect, useRef } from 'react';

const NEOMonitor = () => {
  const [velocityUnit, setVelocityUnit] = useState('km/h');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const starsRef = useRef(null);

  useEffect(() => {
    // Generate stars
    const createStars = () => {
      const starsContainer = starsRef.current;
      if (!starsContainer) return;

      const starCount = 100;
      const stars = [];

      for (let i = 0; i < starCount; i++) {
        const star = {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 4,
          opacity: Math.random() * 0.7 + 0.3
        };
        stars.push(star);
      }

      stars.forEach(star => {
        const starDiv = document.createElement('div');
        starDiv.className = 'star';
        starDiv.style.left = star.left + '%';
        starDiv.style.top = star.top + '%';
        starDiv.style.animationDelay = star.delay + 's';
        starDiv.style.opacity = star.opacity;
        starsContainer.appendChild(starDiv);
      });
    };

    createStars();

    // Metric card hover effect
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      };
      card.addEventListener('mousemove', handleMouseMove);
    });
  }, []);

  const toggleVelocityUnit = (unit) => {
    setVelocityUnit(unit);
  };

  const toggleDistanceUnit = (unit) => {
    setDistanceUnit(unit);
  };

  const velocityValue = velocityUnit === 'km/h' ? 44207 : 27466;
  const distanceValue = distanceUnit === 'km' ? '22.75M' : '14.14M';
  const distanceLabel = distanceUnit === 'km' ? 'kilometers' : 'miles';

  return (
    <>
      <style>{`
        :root {
            --space-dark: #0a0e17;
            --space-navy: #151b2d;
            --space-blue: #1e2a47;
            --accent-amber: #ffb847;
            --accent-amber-glow: rgba(255, 184, 71, 0.2);
            --accent-green: #4ade80;
            --accent-red: #ef4444;
            --text-primary: #e8ecf4;
            --text-secondary: #8b95ab;
            --text-muted: #525b72;
            --border-subtle: rgba(255, 255, 255, 0.06);
            --glass-bg: rgba(21, 27, 45, 0.6);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background: var(--space-dark);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .cosmic-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            background: 
                radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                linear-gradient(180deg, #0a0e17 0%, #151b2d 100%);
        }

        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 4s infinite;
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        .container {
            position: relative;
            z-index: 10;
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }

        .header {
            text-align: center;
            margin-bottom: 3rem;
            animation: fadeInDown 0.8s ease-out;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 1rem;
        }

        .header-title {
            font-size: 1rem;
            font-weight: 300;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
        }

        .neo-card {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-subtle);
            border-radius: 24px;
            padding: 3rem;
            margin-bottom: 2rem;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
            animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .identity {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 3rem;
            border-bottom: 1px solid var(--border-subtle);
        }

        .asteroid-name {
            font-family: 'JetBrains Mono', monospace;
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #e8ecf4 0%, #8b95ab 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .neo-id {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            color: var(--text-muted);
            letter-spacing: 0.05em;
            margin-bottom: 2rem;
        }

        .approach-date {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(255, 255, 255, 0.03);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-size: 1.125rem;
            font-weight: 600;
            border: 1px solid var(--border-subtle);
        }

        .calendar-icon {
            width: 20px;
            height: 20px;
            color: var(--accent-amber);
        }

        .status-badges {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.625rem 1.25rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            animation: fadeInUp 1s ease-out 0.4s backwards;
        }

        .badge-medium {
            background: var(--accent-amber-glow);
            color: var(--accent-amber);
            border: 1px solid var(--accent-amber);
            box-shadow: 0 0 20px var(--accent-amber-glow);
        }

        .badge-safe {
            background: rgba(74, 222, 128, 0.1);
            color: var(--accent-green);
            border: 1px solid var(--accent-green);
        }

        .check-icon {
            width: 16px;
            height: 16px;
        }

        .risk-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
            animation: fadeInUp 1s ease-out 0.6s backwards;
        }

        .risk-item {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .risk-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-amber);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .risk-item:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
            transform: translateY(-2px);
        }

        .risk-item:hover::before {
            transform: scaleX(1);
        }

        .risk-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }

        .risk-value {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
        }

        .risk-indicator {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
            margin-top: 1rem;
            overflow: hidden;
        }

        .risk-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--accent-green), var(--accent-amber));
            border-radius: 3px;
            animation: fillBar 1.5s ease-out 0.8s backwards;
        }

        @keyframes fillBar {
            from { width: 0; }
            to { width: var(--fill-width); }
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .metric-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            padding: 2rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .metric-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08) 0%, transparent 50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        .metric-card:hover::after {
            opacity: 1;
        }

        .metric-card:hover {
            border-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        .metric-card:nth-child(1) { animation: fadeInUp 1s ease-out 0.7s backwards; }
        .metric-card:nth-child(2) { animation: fadeInUp 1s ease-out 0.8s backwards; }
        .metric-card:nth-child(3) { animation: fadeInUp 1s ease-out 0.9s backwards; }
        .metric-card:nth-child(4) { animation: fadeInUp 1s ease-out 1s backwards; }
        .metric-card:nth-child(5) { animation: fadeInUp 1s ease-out 1.1s backwards; }
        .metric-card:nth-child(6) { animation: fadeInUp 1s ease-out 1.2s backwards; }

        .metric-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 1rem;
            opacity: 0.7;
        }

        .metric-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .metric-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 0.25rem;
        }

        .metric-unit {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            color: var(--text-muted);
            font-weight: 400;
        }

        .metric-range {
            font-size: 0.875rem;
            color: var(--text-muted);
            margin-top: 0.5rem;
        }

        .size-viz {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            padding: 2.5rem;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease-out 1.3s backwards;
        }

        .size-viz-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .size-viz-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .size-viz-subtitle {
            font-size: 0.875rem;
            color: var(--text-muted);
        }

        .size-comparison {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 12px;
            flex-wrap: wrap;
        }

        .comparison-item {
            flex: 1;
            text-align: center;
            min-width: 150px;
        }

        .comparison-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem;
            opacity: 0.6;
        }

        .asteroid-viz {
            width: 120px;
            height: 120px;
            background: radial-gradient(circle, var(--accent-amber) 0%, var(--accent-amber-glow) 100%);
            border-radius: 50%;
            margin: 0 auto 1rem;
            box-shadow: 0 0 40px var(--accent-amber-glow);
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .comparison-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .comparison-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.125rem;
            font-weight: 600;
            margin-top: 0.25rem;
        }

        .data-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-subtle);
            border-radius: 12px;
            font-size: 0.875rem;
            color: var(--text-muted);
            flex-wrap: wrap;
            gap: 1rem;
            animation: fadeInUp 1s ease-out 1.4s backwards;
        }

        .footer-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .footer-label {
            font-weight: 600;
            color: var(--text-secondary);
        }

        .confidence-dots {
            display: flex;
            gap: 4px;
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--accent-green);
        }

        .tooltip {
            position: relative;
            cursor: help;
            border-bottom: 1px dotted var(--text-muted);
        }

        .tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%) scale(0.9);
            padding: 0.5rem 0.75rem;
            background: var(--space-blue);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            font-size: 0.75rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: all 0.2s ease;
            z-index: 100;
        }

        .tooltip:hover::after {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }

        .unit-toggle {
            display: inline-flex;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            padding: 2px;
            margin-top: 0.5rem;
        }

        .unit-btn {
            padding: 0.25rem 0.75rem;
            border: none;
            background: transparent;
            color: var(--text-muted);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s ease;
        }

        .unit-btn.active {
            background: var(--accent-amber);
            color: var(--space-dark);
            font-weight: 600;
        }

        .unit-btn:hover:not(.active) {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-primary);
        }

        @media (max-width: 768px) {
            .container {
                padding: 2rem 1rem;
            }

            .neo-card {
                padding: 2rem 1.5rem;
            }

            .asteroid-name {
                font-size: 2.5rem;
            }

            .metrics-grid {
                grid-template-columns: 1fr;
            }

            .size-comparison {
                flex-direction: column;
            }

            .data-footer {
                flex-direction: column;
                text-align: center;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />

      <div className="cosmic-bg"></div>
      <div className="stars" ref={starsRef}></div>

      <div className="container">
        <header className="header">
          <div className="header-label">Near-Earth Object Monitor</div>
          <h1 className="header-title">Close Approach Data Visualization</h1>
        </header>

        <main className="neo-card">
          <section className="identity">
            <h2 className="asteroid-name">(2010 WT8)</h2>
            <div className="neo-id">NEO Reference ID: 3552653</div>
            
            <div className="approach-date">
              <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
              </svg>
              <span>Close Approach: February 6, 2026</span>
            </div>

            <div className="status-badges">
              <div className="badge badge-medium">
                <span>⚠</span>
                Medium Risk
              </div>
              <div className="badge badge-safe">
                <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Not Potentially Hazardous
              </div>
            </div>
          </section>

          <section className="risk-summary">
            <div className="risk-item">
              <div className="risk-label">Risk Classification</div>
              <div className="risk-value">MEDIUM</div>
              <div className="risk-indicator">
                <div className="risk-fill" style={{ '--fill-width': '60%' }}></div>
              </div>
            </div>
            <div className="risk-item">
              <div className="risk-label">Hazard Status</div>
              <div className="risk-value" style={{ color: 'var(--accent-green)' }}>Safe</div>
              <div className="risk-indicator">
                <div className="risk-fill" style={{ '--fill-width': '100%', background: 'var(--accent-green)' }}></div>
              </div>
            </div>
            <div className="risk-item">
              <div className="risk-label">Miss Distance Category</div>
              <div className="risk-value">Safe Distance</div>
              <div className="risk-indicator">
                <div className="risk-fill" style={{ '--fill-width': '85%', background: 'linear-gradient(90deg, var(--accent-green), var(--accent-green))' }}></div>
              </div>
            </div>
            <div className="risk-item">
              <div className="risk-label">Velocity Severity</div>
              <div className="risk-value">Moderate</div>
              <div className="risk-indicator">
                <div className="risk-fill" style={{ '--fill-width': '55%' }}></div>
              </div>
            </div>
          </section>

          <section className="metrics-grid">
            <div className="metric-card" data-metric="velocity">
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <div className="metric-label">Relative Velocity</div>
              <div className="metric-value">{velocityValue.toLocaleString()}</div>
              <div className="metric-unit">{velocityUnit}</div>
              <div className="unit-toggle">
                <button 
                  className={`unit-btn ${velocityUnit === 'km/h' ? 'active' : ''}`}
                  onClick={() => toggleVelocityUnit('km/h')}
                >
                  km/h
                </button>
                <button 
                  className={`unit-btn ${velocityUnit === 'mph' ? 'active' : ''}`}
                  onClick={() => toggleVelocityUnit('mph')}
                >
                  mph
                </button>
              </div>
            </div>

            <div className="metric-card" data-metric="distance">
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
              </svg>
              <div className="metric-label">
                <span className="tooltip" data-tooltip="Distance from Earth at closest approach">Miss Distance</span>
              </div>
              <div className="metric-value">{distanceValue}</div>
              <div className="metric-unit">{distanceLabel}</div>
              <div className="unit-toggle">
                <button 
                  className={`unit-btn ${distanceUnit === 'km' ? 'active' : ''}`}
                  onClick={() => toggleDistanceUnit('km')}
                >
                  km
                </button>
                <button 
                  className={`unit-btn ${distanceUnit === 'mi' ? 'active' : ''}`}
                  onClick={() => toggleDistanceUnit('mi')}
                >
                  mi
                </button>
              </div>
            </div>

            <div className="metric-card" data-metric="magnitude">
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="2"/>
              </svg>
              <div className="metric-label">
                <span className="tooltip" data-tooltip="Brightness measurement (H-value)">Absolute Magnitude</span>
              </div>
              <div className="metric-value">22.02</div>
              <div className="metric-unit">H-value</div>
            </div>

            <div className="metric-card" data-metric="diameter-km">
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="2 2"/>
              </svg>
              <div className="metric-label">Estimated Diameter (km)</div>
              <div className="metric-value">0.105</div>
              <div className="metric-unit">kilometers</div>
              <div className="metric-range">Range: 0.105 – 0.234 km</div>
            </div>

            <div className="metric-card" data-metric="diameter-mi">
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="2 2"/>
              </svg>
              <div className="metric-label">Estimated Diameter (mi)</div>
              <div className="metric-value">0.065</div>
              <div className="metric-unit">miles</div>
              <div className="metric-range">Range: 0.065 – 0.146 mi</div>
            </div>

            <div className="metric-card" data-metric="encounter">
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              <div className="metric-label">Encounter Geometry</div>
              <div className="metric-value">59.3×</div>
              <div className="metric-unit">Moon distance</div>
            </div>
          </section>

          <section className="size-viz">
            <div className="size-viz-header">
              <h3 className="size-viz-title">Size Comparison</h3>
              <p className="size-viz-subtitle">Estimated diameter range visualization</p>
            </div>

            <div className="size-comparison">
              <div className="comparison-item">
                <svg className="comparison-icon" fill="currentColor" opacity="0.6" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                  <line x1="2" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="7" y1="4" x2="7" y2="20" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="17" y1="4" x2="17" y2="20" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div className="comparison-label">Football Field</div>
                <div className="comparison-value">~1.0x</div>
              </div>

              <div className="comparison-item">
                <div className="asteroid-viz"></div>
                <div className="comparison-label">Asteroid</div>
                <div className="comparison-value">105-234m</div>
              </div>

              <div className="comparison-item">
                <svg className="comparison-icon" fill="currentColor" opacity="0.6" viewBox="0 0 24 24">
                  <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                  <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="12" y1="8" x2="12" y2="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div className="comparison-label">Statue of Liberty</div>
                <div className="comparison-value">~1.1x</div>
              </div>
            </div>
          </section>
        </main>

        <footer className="data-footer">
          <div className="footer-item">
            <span className="footer-label">Data Source:</span>
            <span>NASA NEO API</span>
          </div>
          <div className="footer-item">
            <span className="footer-label">Last Updated:</span>
            <span>February 6, 2026 14:23 UTC</span>
          </div>
          <div className="footer-item">
            <span className="footer-label">Confidence:</span>
            <div className="confidence-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot" style={{ opacity: 0.3 }}></div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default NEOMonitor;
