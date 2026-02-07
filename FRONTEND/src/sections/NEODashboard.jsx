import React, { useState } from 'react';

const NEODashboard = () => {
  const [velocityUnit, setVelocityUnit] = useState('km/h');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [hazardousOnly, setHazardousOnly] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const velocityValue = velocityUnit === 'km/h' ? 44207 : 27466;
  const missDistanceKm = distanceUnit === 'km' ? '22,751,354' : '14,138,679';
  const missDistanceDisplay = distanceUnit === 'km' ? '22.75M' : '14.14M';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --bg-primary: #0a0e1a;
          --bg-secondary: #121825;
          --bg-card: #1a2234;
          --bg-elevated: #1f2937;
          --border-subtle: rgba(255, 255, 255, 0.08);
          --border-medium: rgba(255, 255, 255, 0.12);
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --text-muted: #64748b;
          --accent-green: #10b981;
          --accent-green-bg: rgba(16, 185, 129, 0.1);
          --accent-amber: #f59e0b;
          --accent-amber-bg: rgba(245, 158, 11, 0.1);
          --accent-red: #ef4444;
          --accent-red-bg: rgba(239, 68, 68, 0.1);
          --accent-blue: #3b82f6;
          --accent-blue-bg: rgba(59, 130, 246, 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
          min-height: 100vh;
        }

        .dashboard-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0;
        }

        /* Header */
        .dashboard-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 14, 26, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 1.5rem 2rem;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-title-section h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
        }

        .header-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .header-status {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-green);
          box-shadow: 0 0 8px var(--accent-green);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .last-sync {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .last-sync span {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-secondary);
        }

        .header-filters {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-medium);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        .filter-btn:hover {
          background: var(--bg-elevated);
          border-color: var(--border-medium);
        }

        .filter-btn.active {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          color: white;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-medium);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-btn:hover {
          background: var(--bg-elevated);
        }

        .toggle-btn.active {
          background: var(--accent-amber-bg);
          border-color: var(--accent-amber);
          color: var(--accent-amber);
        }

        .toggle-switch {
          width: 36px;
          height: 20px;
          background: var(--border-medium);
          border-radius: 10px;
          position: relative;
          transition: background 0.2s ease;
        }

        .toggle-btn.active .toggle-switch {
          background: var(--accent-amber);
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: transform 0.2s ease;
        }

        .toggle-btn.active .toggle-switch::after {
          transform: translateX(16px);
        }

        /* Main Content */
        .dashboard-main {
          padding: 2rem;
        }

        /* Summary Stats */
        .summary-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-color, var(--accent-blue));
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .stat-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card.green { --accent-color: var(--accent-green); }
        .stat-card.amber { --accent-color: var(--accent-amber); }
        .stat-card.blue { --accent-color: var(--accent-blue); }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .stat-icon.green { background: var(--accent-green-bg); color: var(--accent-green); }
        .stat-icon.amber { background: var(--accent-amber-bg); color: var(--accent-amber); }
        .stat-icon.blue { background: var(--accent-blue-bg); color: var(--accent-blue); }

        .tooltip-trigger {
          cursor: help;
          color: var(--text-muted);
          font-size: 1rem;
          position: relative;
        }

        .tooltip-trigger:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          right: 0;
          background: var(--bg-elevated);
          color: var(--text-primary);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          white-space: nowrap;
          border: 1px solid var(--border-medium);
          z-index: 1000;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          line-height: 1;
        }

        .stat-subtext {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: 'JetBrains Mono', monospace;
        }

        /* Focus Card */
        .focus-section {
          margin-bottom: 2rem;
        }

        .focus-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .focus-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-amber), var(--accent-blue));
        }

        .focus-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .asteroid-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .neo-reference {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .approach-info {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-elevated);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          border: 1px solid var(--border-medium);
          margin-bottom: 1.5rem;
        }

        .calendar-icon {
          width: 18px;
          height: 18px;
          color: var(--accent-blue);
        }

        .badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge.medium {
          background: var(--accent-amber-bg);
          color: var(--accent-amber);
          border: 1px solid var(--accent-amber);
        }

        .badge.safe {
          background: var(--accent-green-bg);
          color: var(--accent-green);
          border: 1px solid var(--accent-green);
        }

        .cta-button {
          display: block;
          width: fit-content;
          margin: 2rem auto 0;
          padding: 0.875rem 2rem;
          background: var(--accent-blue);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        .cta-button:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        /* Risk Breakdown */
        .risk-breakdown {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .risk-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .risk-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }

        .risk-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .risk-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .risk-bar {
          width: 100%;
          height: 6px;
          background: var(--bg-elevated);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .risk-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease-out;
        }

        .risk-fill.green { background: var(--accent-green); }
        .risk-fill.amber { background: var(--accent-amber); }
        .risk-fill.gradient { background: linear-gradient(90deg, var(--accent-green), var(--accent-amber)); }

        .risk-note {
          margin-top: 1rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-style: italic;
        }

        /* Metrics Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.75rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .metric-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .metric-icon-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .metric-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-blue);
        }

        .metric-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .metric-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }

        .metric-unit {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-family: 'JetBrains Mono', monospace;
        }

        .metric-range {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        .unit-toggle {
          display: inline-flex;
          gap: 0.25rem;
          background: var(--bg-elevated);
          border-radius: 6px;
          padding: 0.25rem;
          margin-top: 0.75rem;
        }

        .unit-btn {
          padding: 0.375rem 0.875rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: 'JetBrains Mono', monospace;
        }

        .unit-btn:hover {
          color: var(--text-secondary);
        }

        .unit-btn.active {
          background: var(--accent-blue);
          color: white;
        }

        /* Size Comparison */
        .size-comparison-section {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2rem;
        }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .section-subtitle {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 2rem;
        }

        .comparison-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          background: var(--bg-elevated);
          border-radius: 12px;
          flex-wrap: wrap;
        }

        .comparison-item {
          text-align: center;
          flex: 1;
          min-width: 140px;
        }

        .comparison-visual {
          width: 100px;
          height: 100px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .asteroid-sphere {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, var(--accent-amber), #d97706);
          box-shadow: 0 0 40px rgba(245, 158, 11, 0.4);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .comparison-icon {
          width: 70px;
          height: 70px;
          opacity: 0.5;
        }

        .comparison-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .comparison-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .diameter-range {
          text-align: center;
          margin-top: 1.5rem;
          padding: 1rem;
          background: var(--bg-card);
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
        }

        .diameter-range-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .diameter-range-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
        }

        /* Trajectory */
        .trajectory-section {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2rem;
        }

        .trajectory-visual {
          position: relative;
          height: 300px;
          background: var(--bg-elevated);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .earth {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #3b82f6, #1e40af);
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
          position: relative;
          z-index: 2;
        }

        .trajectory-path {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trajectory-arc {
          position: absolute;
          width: 400px;
          height: 200px;
          border: 2px dashed var(--accent-amber);
          border-radius: 50%;
          opacity: 0.4;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
        }

        .asteroid-marker {
          position: absolute;
          width: 24px;
          height: 24px;
          background: var(--accent-amber);
          border-radius: 50%;
          box-shadow: 0 0 20px var(--accent-amber);
          right: 20%;
          top: 30%;
          animation: pulse-marker 2s infinite;
        }

        @keyframes pulse-marker {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .distance-label {
          position: absolute;
          right: 15%;
          top: 20%;
          background: var(--bg-card);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid var(--border-medium);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-amber);
        }

        .arrow-indicator {
          position: absolute;
          right: 18%;
          top: 35%;
          width: 30px;
          height: 30px;
          color: var(--accent-amber);
        }

        /* Data Footer */
        .data-footer {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
        }

        .footer-label {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .footer-value {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-primary);
        }

        .confidence-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .confidence-bars {
          display: flex;
          gap: 3px;
        }

        .confidence-bar {
          width: 4px;
          height: 16px;
          background: var(--accent-green);
          border-radius: 2px;
        }

        .confidence-bar:nth-child(5) {
          opacity: 0.3;
        }

        /* Details Section */
        .details-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .details-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.75rem;
          transition: color 0.2s ease;
          font-family: 'Inter', sans-serif;
          width: 100%;
        }

        .details-toggle:hover {
          color: var(--text-primary);
        }

        .chevron {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .details-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .details-content.open {
          max-height: 1000px;
          padding-top: 1.5rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .detail-item {
          padding: 1rem;
          background: var(--bg-elevated);
          border-radius: 8px;
        }

        .detail-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .dashboard-header {
            padding: 1.25rem 1.5rem;
          }

          .dashboard-main {
            padding: 1.5rem;
          }

          .asteroid-name {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .header-top {
            flex-direction: column;
          }

          .header-status {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .header-filters {
            width: 100%;
          }

          .filter-group {
            width: 100%;
            flex-wrap: wrap;
          }

          .summary-stats {
            grid-template-columns: 1fr;
          }

          .asteroid-name {
            font-size: 2rem;
          }

          .focus-card {
            padding: 1.5rem;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .comparison-container {
            flex-direction: column;
          }

          .data-footer {
            flex-direction: column;
            align-items: flex-start;
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

      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-top">
            <div className="header-title-section">
              <h1>Near-Earth Object Monitoring Dashboard</h1>
              <p className="header-subtitle">Real-Time Close-Approach & Risk Assessment</p>
            </div>
            <div className="header-status">
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>System Online</span>
              </div>
              <div className="last-sync">
                Last Sync: <span>2026-02-06</span>
              </div>
            </div>
          </div>
          <div className="header-filters">
            <div className="filter-group">
              <button 
                className={`filter-btn ${riskFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setRiskFilter('ALL')}
              >
                All Risk Levels
              </button>
              <button 
                className={`filter-btn ${riskFilter === 'LOW' ? 'active' : ''}`}
                onClick={() => setRiskFilter('LOW')}
              >
                Low
              </button>
              <button 
                className={`filter-btn ${riskFilter === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => setRiskFilter('MEDIUM')}
              >
                Medium
              </button>
              <button 
                className={`filter-btn ${riskFilter === 'HIGH' ? 'active' : ''}`}
                onClick={() => setRiskFilter('HIGH')}
              >
                High
              </button>
            </div>
            <button 
              className={`toggle-btn ${hazardousOnly ? 'active' : ''}`}
              onClick={() => setHazardousOnly(!hazardousOnly)}
            >
              <div className="toggle-switch"></div>
              Hazardous Only
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Summary Stats */}
          <section className="summary-stats">
            <div className="stat-card blue">
              <div className="stat-header">
                <div className="stat-icon blue">🌌</div>
                <div 
                  className="tooltip-trigger" 
                  data-tooltip="Total number of Near-Earth Objects currently tracked"
                >
                  ⓘ
                </div>
              </div>
              <div className="stat-label">Total NEOs Tracked</div>
              <div className="stat-value">1</div>
              <div className="stat-subtext">Demo mode</div>
            </div>

            <div className="stat-card amber">
              <div className="stat-header">
                <div className="stat-icon amber">⚠️</div>
                <div 
                  className="tooltip-trigger" 
                  data-tooltip="Objects classified as medium risk based on size and approach distance"
                >
                  ⓘ
                </div>
              </div>
              <div className="stat-label">Medium Risk Objects</div>
              <div className="stat-value">1</div>
              <div className="stat-subtext">(2010 WT8)</div>
            </div>

            <div className="stat-card green">
              <div className="stat-header">
                <div className="stat-icon green">✓</div>
                <div 
                  className="tooltip-trigger" 
                  data-tooltip="Objects classified as Potentially Hazardous Asteroids (PHAs)"
                >
                  ⓘ
                </div>
              </div>
              <div className="stat-label">Potentially Hazardous</div>
              <div className="stat-value">0</div>
              <div className="stat-subtext">All clear</div>
            </div>

            <div className="stat-card blue">
              <div className="stat-header">
                <div className="stat-icon blue">📍</div>
                <div 
                  className="tooltip-trigger" 
                  data-tooltip="The closest upcoming NEO approach distance"
                >
                  ⓘ
                </div>
              </div>
              <div className="stat-label">Closest Approach</div>
              <div className="stat-value">22.75M km</div>
              <div className="stat-subtext">(2010 WT8)</div>
            </div>
          </section>

          {/* Primary Focus Card */}
          <section className="focus-section">
            <div className="focus-card">
              <div className="focus-header">
                <h2 className="asteroid-name">(2010 WT8)</h2>
                <div className="neo-reference">NEO Reference ID: 3552653</div>
                
                <div className="approach-info">
                  <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                  </svg>
                  Close Approach: February 6, 2026
                </div>

                <div className="badges">
                  <div className="badge medium">
                    <span>⚠</span>
                    Medium Risk
                  </div>
                  <div className="badge safe">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    Not Potentially Hazardous
                  </div>
                </div>
              </div>

              <button className="cta-button" onClick={() => setShowDetails(!showDetails)}>
                View Detailed Analysis
              </button>

              {/* Expandable Details */}
              <div className="details-section">
                <button className="details-toggle" onClick={() => setShowDetails(!showDetails)}>
                  <span>More Details</span>
                  <svg className={`chevron ${showDetails ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                
                <div className={`details-content ${showDetails ? 'open' : ''}`}>
                  <div className="details-grid">
                    <div className="detail-item">
                      <div className="detail-label">Orbit ID</div>
                      <div className="detail-value">89</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">First Observed</div>
                      <div className="detail-value">2010-11-20</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Last Observed</div>
                      <div className="detail-value">2024-11-17</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Orbital Period</div>
                      <div className="detail-value">1,099 days</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Eccentricity</div>
                      <div className="detail-value">0.485</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Semi-major Axis</div>
                      <div className="detail-value">2.17 AU</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Breakdown */}
          <section className="risk-breakdown">
            <div className="risk-card">
              <div className="risk-label">Risk Level</div>
              <div className="risk-value" style={{ color: 'var(--accent-amber)' }}>MEDIUM</div>
              <div className="risk-bar">
                <div className="risk-fill amber" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="risk-card">
              <div className="risk-label">Hazard Status</div>
              <div className="risk-value" style={{ color: 'var(--accent-green)' }}>Not Hazardous</div>
              <div className="risk-bar">
                <div className="risk-fill green" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="risk-card">
              <div className="risk-label">Velocity Severity</div>
              <div className="risk-value">Moderate</div>
              <div className="risk-bar">
                <div className="risk-fill gradient" style={{ width: '55%' }}></div>
              </div>
              <div className="risk-note">Based on 44,207 km/h approach velocity</div>
            </div>

            <div className="risk-card">
              <div className="risk-label">Miss Distance</div>
              <div className="risk-value" style={{ color: 'var(--accent-green)' }}>Safe Distance</div>
              <div className="risk-bar">
                <div className="risk-fill green" style={{ width: '85%' }}></div>
              </div>
              <div className="risk-note">22,751,354 km (59.3× Moon distance)</div>
            </div>
          </section>

          {/* Key Metrics Grid */}
          <section className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-label">
                <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <div className="metric-label">Relative Velocity</div>
              </div>
              <div className="metric-value">{velocityValue.toLocaleString()}</div>
              <div className="metric-unit">{velocityUnit}</div>
              <div className="unit-toggle">
                <button 
                  className={`unit-btn ${velocityUnit === 'km/h' ? 'active' : ''}`}
                  onClick={() => setVelocityUnit('km/h')}
                >
                  km/h
                </button>
                <button 
                  className={`unit-btn ${velocityUnit === 'mph' ? 'active' : ''}`}
                  onClick={() => setVelocityUnit('mph')}
                >
                  mph
                </button>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-label">
                <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                </svg>
                <div className="metric-label">Miss Distance</div>
              </div>
              <div className="metric-value">{missDistanceKm}</div>
              <div className="metric-unit">{distanceUnit}</div>
              <div className="unit-toggle">
                <button 
                  className={`unit-btn ${distanceUnit === 'km' ? 'active' : ''}`}
                  onClick={() => setDistanceUnit('km')}
                >
                  km
                </button>
                <button 
                  className={`unit-btn ${distanceUnit === 'mi' ? 'active' : ''}`}
                  onClick={() => setDistanceUnit('mi')}
                >
                  mi
                </button>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-label">
                <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="2"/>
                </svg>
                <div className="metric-label">Absolute Magnitude (H)</div>
              </div>
              <div className="metric-value">22.02</div>
              <div className="metric-unit">H-value</div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-label">
                <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="2 2"/>
                </svg>
                <div className="metric-label">Estimated Diameter (km)</div>
              </div>
              <div className="metric-value">0.105</div>
              <div className="metric-unit">kilometers</div>
              <div className="metric-range">Range: 0.105 – 0.234 km</div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-label">
                <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="2 2"/>
                </svg>
                <div className="metric-label">Estimated Diameter (mi)</div>
              </div>
              <div className="metric-value">0.065</div>
              <div className="metric-unit">miles</div>
              <div className="metric-range">Range: 0.065 – 0.146 mi</div>
            </div>
          </section>

          {/* Size Comparison */}
          <section className="size-comparison-section">
            <h3 className="section-title">Size Comparison</h3>
            <p className="section-subtitle">Approximate size comparison</p>
            
            <div className="comparison-container">
              <div className="comparison-item">
                <div className="comparison-visual">
                  <svg className="comparison-icon" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="7" y1="6" x2="7" y2="18" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="17" y1="6" x2="17" y2="18" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="comparison-label">Football Field</div>
                <div className="comparison-value">~1.0x</div>
              </div>

              <div className="comparison-item">
                <div className="comparison-visual">
                  <div className="asteroid-sphere"></div>
                </div>
                <div className="comparison-label">Asteroid</div>
                <div className="comparison-value">105-234m</div>
              </div>

              <div className="comparison-item">
                <div className="comparison-visual">
                  <svg className="comparison-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                    <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="comparison-label">Statue of Liberty</div>
                <div className="comparison-value">~1.1x</div>
              </div>

              <div className="comparison-item">
                <div className="comparison-visual">
                  <svg className="comparison-icon" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="7" height="16" rx="1" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                    <rect x="13" y="4" width="7" height="16" rx="1" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                    <rect x="6" y="8" width="3" height="3" fill="currentColor"/>
                    <rect x="15" y="8" width="3" height="3" fill="currentColor"/>
                  </svg>
                </div>
                <div className="comparison-label">City Block</div>
                <div className="comparison-value">~0.5x</div>
              </div>
            </div>

            <div className="diameter-range">
              <div className="diameter-range-label">Min–Max Diameter Range</div>
              <div className="diameter-range-value">0.104 – 0.234 km</div>
            </div>
          </section>

          {/* Trajectory Overview */}
          <section className="trajectory-section">
            <h3 className="section-title">Trajectory & Encounter Overview</h3>
            <p className="section-subtitle">Simplified orbital visualization</p>
            
            <div className="trajectory-visual">
              <div className="trajectory-path">
                <div className="trajectory-arc"></div>
                <div className="asteroid-marker"></div>
                <div className="distance-label">22,751,354 km</div>
                <svg className="arrow-indicator" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
              <div className="earth"></div>
            </div>
          </section>

          {/* Data Footer */}
          <footer className="data-footer">
            <div className="footer-item">
              <span className="footer-label">Data Source:</span>
              <span className="footer-value">NASA NEO API</span>
            </div>
            <div className="footer-item">
              <span className="footer-label">NEO Reference ID:</span>
              <span className="footer-value">3552653</span>
            </div>
            <div className="footer-item">
              <span className="footer-label">Last Updated:</span>
              <span className="footer-value">2026-02-06</span>
            </div>
            <div className="footer-item">
              <span className="footer-label">Confidence:</span>
              <div className="confidence-indicator">
                <div className="confidence-bars">
                  <div className="confidence-bar"></div>
                  <div className="confidence-bar"></div>
                  <div className="confidence-bar"></div>
                  <div className="confidence-bar"></div>
                  <div className="confidence-bar"></div>
                </div>
                <span className="footer-value">High</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default NEODashboard;
