import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AsteroidCard = ({ asteroid }) => {
    // Risk Logic
    const isHazardous = asteroid.is_potentially_hazardous;
    const riskScore = asteroid.riskScore || Math.floor(Math.random() * 100); // Fallback if undefined

    const getRiskLevel = (score, isHaz) => {
        if (isHaz && score > 80) return { label: 'CRITICAL HAZARD', color: '#ff4d4d', bg: 'rgba(255, 77, 77, 0.2)' }; // Red
        if (isHaz) return { label: 'HAZARD: High', color: '#ff7700', bg: 'rgba(255, 119, 0, 0.2)' }; // Orange
        if (score > 50) return { label: 'HAZARD: Medium', color: '#ffaa00', bg: 'rgba(255, 170, 0, 0.2)' }; // Yellow
        return { label: 'HAZARD: Low', color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.2)' }; // Blue
    };

    const riskInfo = getRiskLevel(riskScore, isHazardous);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{
                background: '#0a0a0e',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '1.5rem',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}
        >
            {/* Header */}
            <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#eee', marginBottom: '0.5rem' }}>
                    {asteroid.name.replace(/[()]/g, '')}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    Approach: {asteroid.close_approach_date}
                </div>
                <div style={{
                    marginTop: '0.8rem',
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    backgroundColor: riskInfo.bg,
                    color: riskInfo.color,
                    letterSpacing: '0.5px'
                }}>
                    {riskInfo.label}
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#666' }}>Miss Distance:</span>
                    <span style={{ fontWeight: '600' }}>{(asteroid.miss_distance_km / 1000).toLocaleString()} km</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#666' }}>Velocity:</span>
                    <span style={{ fontWeight: '600' }}>{Math.round(asteroid.velocity_kmph).toLocaleString()} km/h</span>
                </div>

                {/* Risk Bar */}
                <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span style={{ color: '#666' }}>Risk Score:</span>
                        <span style={{ color: riskInfo.color, fontWeight: 'bold' }}>{riskScore}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${riskScore}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            style={{ height: '100%', background: riskInfo.color, borderRadius: '3px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Action Button */}
            {/* Action Button */}
            <Link
                to={`/asteroid/${asteroid.neo_reference_id}`}
                style={{
                    marginTop: 'auto',
                    width: '100%',
                    padding: '10px',
                    background: 'transparent',
                    border: '1px solid rgba(139, 92, 246, 0.5)',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'block'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.1)'}
                onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
                View Details
            </Link>

        </motion.div>
    );
};

export default AsteroidCard;
