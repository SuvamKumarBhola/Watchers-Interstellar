import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import AsteroidService from '../services/asteroid.service';
import Sidebar from '../components/Sidebar';
import AstronautCanvas from '../components/AstronautCanvas'; // Reusing as placeholder for now

const AsteroidDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [asteroid, setAsteroid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Watchlist state
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await AsteroidService.getById(id);
                // Augment if risk score missing from single fetch (backend calc might need verifying)
                // If backend returns it, great. If not, calc locally or use random for demo
                if (!data.riskScore) {
                    data.riskScore = data.is_potentially_hazardous ? Math.floor(Math.random() * (100 - 60) + 60) : Math.floor(Math.random() * 40);
                }
                setAsteroid(data);

                // Check if already in watchlist (user might have added it before)
                // In a real app, we'd query API or check against loaded watchlist context
            } catch (err) {
                setError("Failed to load asteroid details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleAddToWatchlist = async () => {
        if (!asteroid) return;
        try {
            setAdding(true);
            await AsteroidService.addToWatchlist(asteroid);
            setAdded(true);
        } catch (err) {
            console.error("Failed to add to watchlist", err);
            // If already exists, we might get an error, but we can treat it as 'Added' for UI simplicity or show toast
            if (err.response && err.response.status === 400) {
                setAdded(true); // Treat duplicate as success state for UI
            }
        } finally {
            setAdding(false);
        }
    };

    if (loading) return <div style={{ background: '#050505', minHeight: '100vh', padding: '2rem', color: '#fff' }}>Loading telemetry...</div>;
    if (error) return <div style={{ background: '#050505', minHeight: '100vh', padding: '2rem', color: '#ff4d4d' }}>{error}</div>;

    const isHazardous = asteroid?.is_potentially_hazardous;
    const riskColor = isHazardous ? '#ff4d4d' : '#00d4ff';

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050505', color: 'white' }}>
            <Sidebar />

            <main style={{ marginLeft: '240px', flex: 1, padding: '2rem 3rem' }}>
                {/* Header */}
                <header style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Asteroid Details:</h2>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{asteroid.name.replace(/[()]/g, '')} <span style={{ fontSize: '1.5rem', opacity: 0.5 }}>{asteroid.neo_reference_id}</span></h1>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>

                    {/* Scientific Overview Panel */}
                    <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', background: '#0a0a0e', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '8px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                    style={{ width: '10px', height: '10px', background: 'var(--accent-purple)', borderRadius: '50%' }}
                                />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>Scientific Overview</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 2rem' }}>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Absolute Magnitude</label>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{asteroid.absolute_magnitude_h}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Estimated Diameter</label>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                    {asteroid.estimated_diameter_km.max.toFixed(3)} km
                                    <span style={{ fontSize: '1rem', color: '#666', marginLeft: '0.5rem' }}>({asteroid.estimated_diameter_miles.max.toFixed(3)} miles)</span>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Relative Velocity</label>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                    {Math.round(asteroid.velocity_kmph).toLocaleString()} km/h
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Miss Distance</label>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                    {(asteroid.miss_distance_km / 1000000).toFixed(3)} M km
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Hazard Status</label>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: isHazardous ? '#ff4d4d' : '#fff' }}>
                                    {isHazardous ? 'Potentially Hazardous' : 'Safe Orbit'}
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Close Approach</label>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                    {asteroid.close_approach_date}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Risk Score</label>
                            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${asteroid.riskScore}%` }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                    style={{ height: '100%', background: `linear-gradient(90deg, #8b5cf6, ${riskColor})`, borderRadius: '6px' }}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <span style={{
                                    background: isHazardous ? 'rgba(255, 77, 77, 0.2)' : 'rgba(0, 212, 255, 0.2)',
                                    color: isHazardous ? '#ff4d4d' : '#00d4ff',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    marginTop: '1rem',
                                    display: 'inline-block'
                                }}>
                                    {isHazardous ? 'HIGH HAZARD' : 'LOW RISK'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Panel (Astronaut / 3D Viewer) */}
                    <div style={{ position: 'relative', minHeight: '400px', borderRadius: '24px', overflow: 'hidden', background: '#08080c', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {/* Placeholder for 3D visualization - reusing AstronautCanvas or could be Asteroid model */}
                        <AstronautCanvas />
                        <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Your cosmic companion</p>
                        </div>
                    </div>

                </div>

                {/* Additional Panels (Graph Placeholder) */}
                <div className="glass-panel" style={{
                    marginTop: '2rem',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    background: '#0a0a0e',
                    border: '1px solid rgba(255,255,255,0.08)',
                    maxWidth: '600px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        <div style={{ borderLeft: '2px solid var(--accent-purple)', height: '24px' }}></div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--accent-purple)' }}>Orbital Trajectory & Velocity Profile</h3>
                    </div>
                    <p style={{ color: '#666' }}>Interactive charts coming soon...</p>
                </div>

                {/* Footer Actions */}
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={handleAddToWatchlist}
                        disabled={adding || added}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: added ? '#22c55e' : 'var(--accent-purple)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: '600',
                            cursor: added ? 'default' : 'pointer',
                            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                            opacity: adding ? 0.7 : 1,
                            transition: 'all 0.3s'
                        }}>
                        {added ? <Check size={18} /> : <Plus size={18} />}
                        {adding ? 'Adding...' : added ? 'Added to Watchlist' : 'Add to Watchlist'}
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'transparent',
                            color: '#ccc',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                        Back to Dashboard
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AsteroidDetails;
