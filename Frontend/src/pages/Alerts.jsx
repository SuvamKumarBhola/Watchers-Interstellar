import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Bell, AlertTriangle, Globe, ShieldAlert } from 'lucide-react';
import AsteroidService from '../services/asteroid.service';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Alerts = () => {
    const [activeTab, setActiveTab] = useState('watchlist'); // 'watchlist' or 'global'
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAlerts();
    }, [activeTab]);

    const fetchAlerts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await AsteroidService.getAlerts(activeTab);
            // Backend returns { type: '...', count: N, alerts: [...] } or checks structure
            console.log("Alerts data:", data);
            setAlerts(data.alerts || []);
        } catch (err) {
            console.error("Failed to fetch alerts", err);
            setError("Failed to load alerts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getHazardBadge = (isHazardous, missDistance) => {
        if (isHazardous) return { label: 'High Hazard', color: '#ff4d4d', bg: 'rgba(255, 77, 77, 0.2)' };
        if (missDistance < 1000000) return { label: 'Medium Hazard', color: '#ffaa00', bg: 'rgba(255, 170, 0, 0.2)' };
        return { label: 'Low Hazard', color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.2)' };
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050505', color: 'white' }}>
            <Sidebar />

            <main style={{ marginLeft: '240px', flex: 1, padding: '2rem 3rem' }}>
                {/* Header */}
                <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Active Alerts</h1>
                        <p style={{ color: '#888' }}>Real-time monitoring of close approaches</p>
                    </div>

                    {/* Placeholder for visual flair */}
                    <div style={{ width: '120px', height: '120px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0,0,0,0))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bell size={48} color="var(--accent-purple)" style={{ opacity: 0.8 }} />
                    </div>
                </header>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setActiveTab('watchlist')}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: activeTab === 'watchlist' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                            color: activeTab === 'watchlist' ? 'white' : '#888',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s'
                        }}>
                        <ShieldAlert size={18} />
                        My Alerts
                    </button>
                    <button
                        onClick={() => setActiveTab('global')}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: activeTab === 'global' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                            color: activeTab === 'global' ? 'white' : '#888',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s'
                        }}>
                        <Globe size={18} />
                        Global Alerts
                    </button>
                </div>

                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#888' }}>
                    <Filter size={16} />
                    <span>Severity: </span>
                    <select style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '4px 8px', borderRadius: '6px' }}>
                        <option>All</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>Scanning deep space...</div>
                ) : error ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#ff4d4d' }}>{error}</div>
                ) : alerts.length === 0 ? (
                    <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <div style={{ marginBottom: '1rem', opacity: 0.5 }}><AlertTriangle size={48} /></div>
                        <h3>No active alerts detected</h3>
                        <p>Space is quiet... for now.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {alerts.map((alert) => {
                            const badge = getHazardBadge(alert.is_potentially_hazardous, alert.miss_distance_km);
                            return (
                                <motion.div
                                    key={alert.neo_reference_id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-panel"
                                    style={{
                                        background: '#0a0a0e',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        padding: '1.5rem',
                                        borderRadius: '16px',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', maxWidth: '70%' }}>
                                            {alert.name.replace(/[()]/g, '')}
                                        </h3>
                                        <span style={{
                                            background: badge.bg,
                                            color: badge.color,
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '800',
                                            border: `1px solid ${badge.color}40`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            {alert.is_potentially_hazardous && <AlertTriangle size={12} />}
                                            {badge.label}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gap: '0.8rem', fontSize: '0.9rem', color: '#ccc', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#666' }}>Close Approach:</span>
                                            <span>{alert.close_approach_date}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#666' }}>Miss Distance:</span>
                                            <span>{(alert.miss_distance_km / 149597870.7).toFixed(3)} AU</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/asteroid/${alert.neo_reference_id}`}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--accent-purple)',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        View Details &rarr;
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Alerts;
