import React, { useState, useEffect } from 'react';

const NEOExplorer = () => {
  // State management
  const [searchParams, setSearchParams] = useState({
    referenceId: '',
    asteroidName: '',
    startDate: '2015-09-07',
    endDate: '2015-09-08',
    riskLevel: 'ALL',
    hazardousOnly: false,
    sortBy: 'close_approach_date'
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Date validation
  const validateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Mock API call (replace with actual NASA API)
  const searchNEOs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate date range
      if (!validateDateRange(searchParams.startDate, searchParams.endDate)) {
        throw new Error('Date range must not exceed 7 days');
      }

      // Mock data - replace with actual API call
      // const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${searchParams.startDate}&end_date=${searchParams.endDate}&api_key=YOUR_API_KEY`);
      
      // Mock results for demo
      const mockResults = [
        {
          id: '3552653',
          name: '(2010 WT8)',
          closeApproachDate: '2015-09-07',
          missDistance: 22751354,
          velocity: 44207,
          diameter: { min: 0.105, max: 0.234 },
          isPotentiallyHazardous: false,
          absoluteMagnitude: 22.02,
          riskLevel: 'MEDIUM'
        },
        {
          id: '2465633',
          name: '465633 (2009 JR5)',
          closeApproachDate: '2015-09-08',
          missDistance: 38700000,
          velocity: 57936,
          diameter: { min: 0.490, max: 1.096 },
          isPotentiallyHazardous: true,
          absoluteMagnitude: 19.5,
          riskLevel: 'HIGH'
        },
        {
          id: '3426410',
          name: '(2008 QV11)',
          closeApproachDate: '2015-09-07',
          missDistance: 61200000,
          velocity: 35280,
          diameter: { min: 0.180, max: 0.403 },
          isPotentiallyHazardous: false,
          absoluteMagnitude: 21.1,
          riskLevel: 'LOW'
        },
        {
          id: '3727639',
          name: '(2015 RC)',
          closeApproachDate: '2015-09-08',
          missDistance: 15900000,
          velocity: 68400,
          diameter: { min: 0.024, max: 0.053 },
          isPotentiallyHazardous: false,
          absoluteMagnitude: 24.3,
          riskLevel: 'LOW'
        },
        {
          id: '2029075',
          name: '29075 (1950 DA)',
          closeApproachDate: '2015-09-07',
          missDistance: 45800000,
          velocity: 51120,
          diameter: { min: 0.950, max: 2.100 },
          isPotentiallyHazardous: true,
          absoluteMagnitude: 17.2,
          riskLevel: 'HIGH'
        }
      ];

      // Apply filters
      let filtered = mockResults;

      // Filter by reference ID
      if (searchParams.referenceId) {
        filtered = filtered.filter(neo => 
          neo.id.includes(searchParams.referenceId)
        );
      }

      // Filter by name
      if (searchParams.asteroidName) {
        filtered = filtered.filter(neo => 
          neo.name.toLowerCase().includes(searchParams.asteroidName.toLowerCase())
        );
      }

      // Filter by risk level
      if (searchParams.riskLevel !== 'ALL') {
        filtered = filtered.filter(neo => neo.riskLevel === searchParams.riskLevel);
      }

      // Filter by hazardous
      if (searchParams.hazardousOnly) {
        filtered = filtered.filter(neo => neo.isPotentiallyHazardous);
      }

      // Sort results
      filtered.sort((a, b) => {
        switch (searchParams.sortBy) {
          case 'close_approach_date':
            return new Date(a.closeApproachDate) - new Date(b.closeApproachDate);
          case 'miss_distance':
            return a.missDistance - b.missDistance;
          case 'velocity':
            return b.velocity - a.velocity;
          default:
            return 0;
        }
      });

      setResults(filtered);
      setSearchPerformed(true);
      setLastFetchTime(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchParams({
      referenceId: '',
      asteroidName: '',
      startDate: '2015-09-07',
      endDate: '2015-09-08',
      riskLevel: 'ALL',
      hazardousOnly: false,
      sortBy: 'close_approach_date'
    });
    setResults([]);
    setSearchPerformed(false);
    setError(null);
  };

  // Calculate summary stats
  const totalNEOs = results.length;
  const hazardousCount = results.filter(neo => neo.isPotentiallyHazardous).length;
  const closestNEO = results.length > 0 
    ? results.reduce((min, neo) => neo.missDistance < min.missDistance ? neo : min)
    : null;

  // Risk level classification helper
  const getRiskLevel = (neo) => {
    if (neo.isPotentiallyHazardous) return 'HIGH';
    if (neo.missDistance < 30000000) return 'MEDIUM';
    return 'LOW';
  };

  // Distance category helper
  const getDistanceCategory = (distance) => {
    if (distance < 20000000) return 'Close';
    if (distance < 40000000) return 'Moderate';
    return 'Safe';
  };

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
        }

        .explorer-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* Header */
        .explorer-header {
          margin-bottom: 2rem;
        }

        .header-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .header-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .api-context {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-card);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          font-size: 0.875rem;
        }

        .api-label {
          color: var(--text-muted);
        }

        .api-value {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-primary);
          font-weight: 500;
        }

        /* Main Layout */
        .explorer-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 2rem;
          align-items: start;
        }

        /* Search Panel */
        .search-panel {
          position: sticky;
          top: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .panel-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .search-icon {
          width: 24px;
          height: 24px;
          color: var(--accent-blue);
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .section-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-bg);
        }

        .form-input::placeholder {
          color: var(--text-muted);
        }

        .date-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .validation-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
          font-style: italic;
        }

        /* Filter Options */
        .filter-group {
          margin-bottom: 1rem;
        }

        .radio-group {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .radio-btn {
          flex: 1;
          min-width: 60px;
          padding: 0.5rem 0.75rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          font-family: 'Inter', sans-serif;
        }

        .radio-btn:hover {
          background: var(--bg-card);
          border-color: var(--border-medium);
        }

        .radio-btn.active {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          color: white;
        }

        .radio-btn.active.low { background: var(--accent-green); border-color: var(--accent-green); }
        .radio-btn.active.medium { background: var(--accent-amber); border-color: var(--accent-amber); }
        .radio-btn.active.high { background: var(--accent-red); border-color: var(--accent-red); }

        .toggle-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-option:hover {
          background: var(--bg-card);
        }

        .toggle-option.active {
          background: var(--accent-amber-bg);
          border-color: var(--accent-amber);
        }

        .toggle-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .toggle-option.active .toggle-label {
          color: var(--accent-amber);
        }

        .toggle-switch {
          width: 44px;
          height: 24px;
          background: var(--border-medium);
          border-radius: 12px;
          position: relative;
          transition: background 0.2s ease;
        }

        .toggle-option.active .toggle-switch {
          background: var(--accent-amber);
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: transform 0.2s ease;
        }

        .toggle-option.active .toggle-switch::after {
          transform: translateX(20px);
        }

        .select-input {
          width: 100%;
          padding: 0.75rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .select-input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-bg);
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .btn {
          flex: 1;
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: var(--accent-blue);
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:disabled {
          background: var(--border-medium);
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-medium);
        }

        .btn-secondary:hover {
          background: var(--bg-elevated);
          color: var(--text-primary);
        }

        /* Results Section */
        .results-section {
          min-height: 400px;
        }

        /* Search Summary */
        .search-summary {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .summary-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .summary-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .summary-subtext {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
        }

        .hazard-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: var(--accent-red-bg);
          color: var(--accent-red);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid var(--accent-red);
        }

        /* Results List */
        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .neo-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .neo-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--risk-color, var(--accent-blue));
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .neo-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .neo-card:hover::before {
          opacity: 1;
        }

        .neo-card.risk-high { --risk-color: var(--accent-red); }
        .neo-card.risk-medium { --risk-color: var(--accent-amber); }
        .neo-card.risk-low { --risk-color: var(--accent-green); }

        .neo-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .neo-identity {
          flex: 1;
        }

        .neo-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .neo-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .neo-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge.risk-low {
          background: var(--accent-green-bg);
          color: var(--accent-green);
          border: 1px solid var(--accent-green);
        }

        .badge.risk-medium {
          background: var(--accent-amber-bg);
          color: var(--accent-amber);
          border: 1px solid var(--accent-amber);
        }

        .badge.risk-high {
          background: var(--accent-red-bg);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
        }

        .badge.hazardous {
          background: var(--accent-red-bg);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
        }

        .badge.safe {
          background: var(--accent-green-bg);
          color: var(--accent-green);
          border: 1px solid var(--accent-green);
        }

        .neo-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metric-label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .metric-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .metric-unit {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Risk Indicators */
        .risk-indicators {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .risk-indicator {
          flex: 1;
        }

        .indicator-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 0.375rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .indicator-bar {
          height: 4px;
          background: var(--bg-elevated);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .indicator-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .indicator-fill.close { background: var(--accent-red); }
        .indicator-fill.moderate { background: var(--accent-amber); }
        .indicator-fill.safe { background: var(--accent-green); }

        .indicator-value {
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        /* Empty State */
        .empty-state {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 4rem 2rem;
          text-align: center;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          opacity: 0.3;
        }

        .empty-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .empty-text {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skeleton-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .skeleton {
          background: linear-gradient(90deg, var(--bg-elevated) 25%, var(--border-subtle) 50%, var(--bg-elevated) 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .skeleton-title {
          height: 24px;
          width: 60%;
          margin-bottom: 0.5rem;
        }

        .skeleton-text {
          height: 14px;
          width: 40%;
          margin-bottom: 1rem;
        }

        .skeleton-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .skeleton-metric {
          height: 40px;
        }

        /* Error State */
        .error-message {
          background: var(--accent-red-bg);
          border: 1px solid var(--accent-red);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--accent-red);
        }

        .error-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        /* Data Footer */
        .data-footer {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .footer-item {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .footer-label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .footer-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .footer-note {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-style: italic;
          margin-top: 0.25rem;
        }

        /* Tooltip */
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
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: 6px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
          z-index: 1000;
        }

        .tooltip:hover::after {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .explorer-layout {
            grid-template-columns: 1fr;
          }

          .search-panel {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .explorer-container {
            padding: 1rem;
          }

          .header-title {
            font-size: 1.5rem;
          }

          .date-inputs {
            grid-template-columns: 1fr;
          }

          .search-summary {
            grid-template-columns: 1fr;
          }

          .neo-metrics {
            grid-template-columns: 1fr 1fr;
          }

          .risk-indicators {
            flex-direction: column;
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

      <div className="explorer-container">
        {/* Header */}
        <header className="explorer-header">
          <h1 className="header-title">NEO Search & Explorer</h1>
          <p className="header-subtitle">Date-based exploration and discovery</p>
          <div className="api-context">
            <span className="api-label">Data Source:</span>
            <span className="api-value">NASA NEO Feed API</span>
          </div>
        </header>

        {/* Main Layout */}
        <div className="explorer-layout">
          {/* Search Panel */}
          <aside className="search-panel">
            <h2 className="panel-title">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35"/>
              </svg>
              Search & Filter
            </h2>

            {/* Search Inputs */}
            <div className="form-section">
              <div className="section-label">🔍 Search Inputs</div>
              
              <div className="form-group">
                <label className="form-label">NEO Reference ID</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 3552653"
                  value={searchParams.referenceId}
                  onChange={(e) => setSearchParams({...searchParams, referenceId: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Asteroid Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., (2010 WT8)"
                  value={searchParams.asteroidName}
                  onChange={(e) => setSearchParams({...searchParams, asteroidName: e.target.value})}
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="form-section">
              <div className="section-label">📅 Date Range</div>
              
              <div className="date-inputs">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={searchParams.startDate}
                    onChange={(e) => setSearchParams({...searchParams, startDate: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={searchParams.endDate}
                    onChange={(e) => setSearchParams({...searchParams, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="validation-note">
                Maximum 7-day range (NASA API constraint)
              </div>
            </div>

            {/* Filters */}
            <div className="form-section">
              <div className="section-label">🎚 Filter Options</div>
              
              <div className="filter-group">
                <label className="form-label">Risk Level</label>
                <div className="radio-group">
                  <button
                    className={`radio-btn ${searchParams.riskLevel === 'ALL' ? 'active' : ''}`}
                    onClick={() => setSearchParams({...searchParams, riskLevel: 'ALL'})}
                  >
                    ALL
                  </button>
                  <button
                    className={`radio-btn low ${searchParams.riskLevel === 'LOW' ? 'active' : ''}`}
                    onClick={() => setSearchParams({...searchParams, riskLevel: 'LOW'})}
                  >
                    LOW
                  </button>
                  <button
                    className={`radio-btn medium ${searchParams.riskLevel === 'MEDIUM' ? 'active' : ''}`}
                    onClick={() => setSearchParams({...searchParams, riskLevel: 'MEDIUM'})}
                  >
                    MED
                  </button>
                  <button
                    className={`radio-btn high ${searchParams.riskLevel === 'HIGH' ? 'active' : ''}`}
                    onClick={() => setSearchParams({...searchParams, riskLevel: 'HIGH'})}
                  >
                    HIGH
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <label className="form-label">Potentially Hazardous</label>
                <div
                  className={`toggle-option ${searchParams.hazardousOnly ? 'active' : ''}`}
                  onClick={() => setSearchParams({...searchParams, hazardousOnly: !searchParams.hazardousOnly})}
                >
                  <span className="toggle-label">Show hazardous only</span>
                  <div className="toggle-switch"></div>
                </div>
              </div>

              <div className="filter-group">
                <label className="form-label">Sort By</label>
                <select
                  className="select-input"
                  value={searchParams.sortBy}
                  onChange={(e) => setSearchParams({...searchParams, sortBy: e.target.value})}
                >
                  <option value="close_approach_date">Close Approach Date</option>
                  <option value="miss_distance">Miss Distance</option>
                  <option value="velocity">Velocity</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="btn btn-primary"
                onClick={searchNEOs}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search NEOs'}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </aside>

          {/* Results Section */}
          <main className="results-section">
            {/* Error Message */}
            {error && (
              <div className="error-message">
                <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="loading-container">
                {[1, 2, 3].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton-metrics">
                      <div className="skeleton skeleton-metric"></div>
                      <div className="skeleton skeleton-metric"></div>
                      <div className="skeleton skeleton-metric"></div>
                      <div className="skeleton skeleton-metric"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Search Summary */}
            {searchPerformed && !loading && results.length > 0 && (
              <div className="search-summary">
                <div className="summary-item">
                  <div className="summary-label">Date Range</div>
                  <div className="summary-value">{results.length}</div>
                  <div className="summary-subtext">
                    {searchParams.startDate} → {searchParams.endDate}
                  </div>
                </div>

                <div className="summary-item">
                  <div className="summary-label">Total NEOs Found</div>
                  <div className="summary-value">{totalNEOs}</div>
                </div>

                <div className="summary-item">
                  <div className="summary-label">Hazardous Objects</div>
                  <div className="summary-value">
                    {hazardousCount > 0 ? (
                      <span className="hazard-badge">
                        ⚠ {hazardousCount}
                      </span>
                    ) : (
                      <span style={{color: 'var(--accent-green)'}}>0</span>
                    )}
                  </div>
                </div>

                <div className="summary-item">
                  <div className="summary-label">Closest Approach</div>
                  {closestNEO && (
                    <>
                      <div className="summary-value" style={{fontSize: '1rem'}}>
                        {closestNEO.name}
                      </div>
                      <div className="summary-subtext">
                        {(closestNEO.missDistance / 1000000).toFixed(2)}M km
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Results List */}
            {searchPerformed && !loading && results.length > 0 && (
              <div className="results-list">
                {results.map(neo => (
                  <div 
                    key={neo.id} 
                    className={`neo-card risk-${neo.riskLevel.toLowerCase()}`}
                    onClick={() => console.log('Navigate to detail:', neo.id)}
                  >
                    <div className="neo-header">
                      <div className="neo-identity">
                        <h3 className="neo-name">{neo.name}</h3>
                        <div className="neo-id">ID: {neo.id}</div>
                      </div>
                      <div className="neo-badges">
                        <div className={`badge risk-${neo.riskLevel.toLowerCase()}`}>
                          {neo.riskLevel}
                        </div>
                        {neo.isPotentiallyHazardous ? (
                          <div className="badge hazardous">
                            ⚠ Hazardous
                          </div>
                        ) : (
                          <div className="badge safe">
                            ✓ Safe
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="neo-metrics">
                      <div className="metric-item">
                        <div className="metric-label">Close Approach</div>
                        <div className="metric-value">{neo.closeApproachDate}</div>
                      </div>

                      <div className="metric-item">
                        <div className="metric-label">
                          <span className="tooltip" data-tooltip="Distance from Earth at closest approach">
                            Miss Distance
                          </span>
                        </div>
                        <div className="metric-value">
                          {(neo.missDistance / 1000000).toFixed(2)}M
                          <span className="metric-unit"> km</span>
                        </div>
                      </div>

                      <div className="metric-item">
                        <div className="metric-label">Velocity</div>
                        <div className="metric-value">
                          {neo.velocity.toLocaleString()}
                          <span className="metric-unit"> km/h</span>
                        </div>
                      </div>

                      <div className="metric-item">
                        <div className="metric-label">Diameter</div>
                        <div className="metric-value">
                          {neo.diameter.min.toFixed(2)}-{neo.diameter.max.toFixed(2)}
                          <span className="metric-unit"> km</span>
                        </div>
                      </div>
                    </div>

                    <div className="risk-indicators">
                      <div className="risk-indicator">
                        <div className="indicator-label">Miss Distance</div>
                        <div className="indicator-bar">
                          <div 
                            className={`indicator-fill ${getDistanceCategory(neo.missDistance).toLowerCase()}`}
                            style={{
                              width: neo.missDistance < 20000000 ? '30%' : 
                                     neo.missDistance < 40000000 ? '60%' : '90%'
                            }}
                          ></div>
                        </div>
                        <div className="indicator-value">{getDistanceCategory(neo.missDistance)}</div>
                      </div>

                      <div className="risk-indicator">
                        <div className="indicator-label">Velocity Severity</div>
                        <div className="indicator-bar">
                          <div 
                            className="indicator-fill moderate"
                            style={{
                              width: `${Math.min((neo.velocity / 70000) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                        <div className="indicator-value">
                          {neo.velocity > 60000 ? 'High' : neo.velocity > 40000 ? 'Moderate' : 'Low'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {searchPerformed && !loading && results.length === 0 && (
              <div className="empty-state">
                <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35"/>
                </svg>
                <h3 className="empty-title">No NEOs Found</h3>
                <p className="empty-text">
                  No near-Earth objects match your search criteria.<br/>
                  Try adjusting your filters or date range.
                </p>
              </div>
            )}

            {/* Initial State */}
            {!searchPerformed && !loading && (
              <div className="empty-state">
                <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <h3 className="empty-title">Start Your Search</h3>
                <p className="empty-text">
                  Use the search panel to explore near-Earth objects.<br/>
                  Select a date range and apply filters to begin.
                </p>
              </div>
            )}

            {/* Data Footer */}
            {searchPerformed && !loading && results.length > 0 && (
              <footer className="data-footer">
                <div className="footer-item">
                  <div className="footer-label">API Endpoint</div>
                  <div className="footer-value">/neo/rest/v1/feed</div>
                </div>

                <div className="footer-item">
                  <div className="footer-label">Date Range</div>
                  <div className="footer-value">
                    {searchParams.startDate} → {searchParams.endDate}
                  </div>
                </div>

                <div className="footer-item">
                  <div className="footer-label">Last Fetch</div>
                  <div className="footer-value">
                    {lastFetchTime?.toLocaleTimeString()}
                  </div>
                </div>

                <div className="footer-item">
                  <div className="footer-label">Data Confidence</div>
                  <div className="footer-value">High</div>
                  <div className="footer-note">Based on NASA API completeness</div>
                </div>
              </footer>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default NEOExplorer;
