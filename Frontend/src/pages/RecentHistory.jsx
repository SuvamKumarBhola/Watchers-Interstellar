import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, ArrowRight } from 'lucide-react';
import AsteroidService from '../services/asteroid.service';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const RecentHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await AsteroidService.getHistory();
            // Backend returns { count: N, data: [...] }
            setHistory(data.data || []);
        } catch (err) {
            console.error("Failed to fetch history", err);
            setError("Failed to load history.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050505', color: 'white' }}>
            <Sidebar />

            <main style={{ marginLeft: '240px', flex: 1, padding: '2rem 3rem' }}>
                <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Recent History</h1>
                        <p style={{ color: '#888' }}>Asteroids you've viewed recently</p>
                    </div>
                </header>

                {loading ? (
                    <div style={{ color: '#666', marginTop: '2rem' }}>Loading history...</div>
                ) : error ? (
                    <div style={{ color: '#ff4d4d', marginTop: '2rem' }}>{error}</div>
                ) : history.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
                        <Clock size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <h3>No viewing history</h3>
                        <p>Explore asteroid details to build your history.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {history.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-panel"
                                style={{
                                    background: '#0a0a0e',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Clock size={20} color="#888" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>
                                            {item.name.replace(/[()]/g, '')}
                                        </h3>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                            Viewed on {formatDate(item.viewedAt)}
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/asteroid/${item.neo_reference_id}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#ccc',
                                        textDecoration: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.03)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        e.currentTarget.style.color = '#ccc';
                                    }}
                                >
                                    View Again <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default RecentHistory;
