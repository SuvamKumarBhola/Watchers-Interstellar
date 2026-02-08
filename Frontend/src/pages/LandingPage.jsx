import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SpaceCanvas from '../components/SpaceCanvas';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Activity, Shield, Eye, Bell, LayoutDashboard, History } from 'lucide-react';

const LandingPage = () => {
    const { currentUser } = useAuth();

    const features = [
        {
            icon: <Activity size={32} color="#8b5cf6" />,
            title: "Live NEO Data",
            desc: "Access real-time tracking of Near-Earth Objects directly from NASA's leading observatories."
        },
        {
            icon: <Shield size={32} color="#ec4899" />, // Pink
            title: "Advanced Risk Analysis",
            desc: "Evaluate potential impact threats with our sophisticated risk assessment engine."
        },
        {
            icon: <Eye size={32} color="#00d4ff" />, // Cyan
            title: "Personalized Watchlists",
            desc: "Create and manage custom watchlists of asteroids you want to monitor closely."
        },
        {
            icon: <Bell size={32} color="#f59e0b" />, // Amber
            title: "Customizable Alerts",
            desc: "Receive timely notifications for critical close approaches and significant celestial events."
        },
        {
            icon: <LayoutDashboard size={32} color="#10b981" />, // Emerald
            title: "Interactive Dashboard",
            desc: "Visualize complex celestial data through an intuitive and responsive interface."
        },
        {
            icon: <History size={32} color="#6366f1" />, // Indigo
            title: "Historical Trajectory",
            desc: "Review past paths and predict future movements with comprehensive historical modeling."
        }
    ];

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

            {/* Space Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
                <SpaceCanvas />
            </div>

            {/* Hero Section */}
            <div className="container" style={{ paddingTop: '220px', paddingBottom: '100px', minHeight: '90vh', display: 'flex', position: 'relative', zIndex: 1 }}>
                <div style={{ flex: 1, maxWidth: '800px' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontSize: '4.5rem',
                            fontWeight: '800',
                            marginBottom: '1rem',
                            lineHeight: 1.1
                        }}
                    >
                        Cosmic <span style={{ color: 'var(--accent-purple)' }}>Watch</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ fontSize: '1.25rem', color: '#ccc', marginBottom: '3rem', lineHeight: 1.6 }}
                    >
                        Your Real-time Gateway to Near-Earth Objects. Track asteroids, analyze risk, and explore celestial data with an immersive experience.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        style={{ display: 'flex', gap: '1rem' }}
                    >
                        {!currentUser ? (
                            <>
                                <Link to="/login" className="btn-primary">Login</Link>
                                <Link to="/register" className="btn-outline">Register</Link>
                                <Link to="/about" className="btn-outline" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Explore</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
                                <Link to="/about" className="btn-outline">Explore Mission</Link>
                            </>
                        )}
                    </motion.div>
                </div>
                <div style={{ flex: 1 }}>
                    {/* Placeholder for Astronaut Canvas alignment space if needed */}
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '4rem 0', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }}>
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', fontWeight: 'bold' }}
                    >
                        Key Features
                    </motion.h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="glass-panel"
                                style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div style={{ background: 'rgba(255,255,255,0.05)', width: 'fit-content', padding: '12px', borderRadius: '12px' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{feature.title}</h3>
                                <p style={{ color: '#aaa', lineHeight: 1.6 }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default LandingPage;
