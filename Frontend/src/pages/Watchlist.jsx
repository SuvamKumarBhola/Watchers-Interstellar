import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertOctagon } from 'lucide-react';
import AsteroidService from '../services/asteroid.service';
import Sidebar from '../components/Sidebar';
import AsteroidCard from '../components/AsteroidCard';
import { useAuth } from '../context/AuthContext';

const Watchlist = () => {
    const { currentUser } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            setLoading(true);
            const data = await AsteroidService.getWatchlist();
            setWatchlist(data || []);
        } catch (err) {
            setError("Failed to load your watchlist.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        try {
            await AsteroidService.removeFromWatchlist(id);
            setWatchlist(prev => prev.filter(item => item.neo_reference_id !== id));
        } catch (err) {
            console.error("Failed to remove item", err);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050505' }}>
            <Sidebar />

            <main style={{ marginLeft: '240px', flex: 1, padding: '2rem 3rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Your Watchlist</h1>
                        <p style={{ color: '#888' }}>{watchlist.length} Asteroids Monitored</p>
                    </div>
                </header>

                {loading ? (
                    <div style={{ color: '#888' }}>Syncing with observatory...</div>
                ) : error ? (
                    <div style={{ color: '#ff4d4d' }}>{error}</div>
                ) : watchlist.length === 0 ? (
                    <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <AlertOctagon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>Your watchlist is empty</h3>
                        <p>Track hazardous asteroids from the Dashboard or Details page.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {watchlist.map((item) => (
                            <div key={item.neo_reference_id} style={{ position: 'relative' }}>
                                <AsteroidCard asteroid={item} />
                                <button
                                    onClick={() => handleRemove(item.neo_reference_id)}
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(0,0,0,0.6)',
                                        border: '1px solid rgba(255,77,77,0.3)',
                                        color: '#ff4d4d',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                    title="Remove from Watchlist"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Watchlist;
