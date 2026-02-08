import React from 'react';
import { motion } from 'framer-motion';
import EarthCanvas from '../components/EarthCanvas';
import { Shield, Globe, Activity, Code, Bell, History } from 'lucide-react';

const About = () => {
    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Reuse Earth Background for consistency */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <EarthCanvas />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '3rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', margin: '4rem 0' }}
                >
                    <h1 style={{
                        fontSize: '3.5rem',
                        background: 'linear-gradient(to right, #00d4ff, #fff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem'
                    }}>
                        About Cosmic Watch
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                        Cosmic Watch is a real-time Near-Earth Object monitoring platform built to help researchers and enthusiasts track, analyze and understand asteroids approaching Earth using live data from NASA’s NeoWs API.
                    </p>
                    <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '800px', margin: '1rem auto 0', lineHeight: '1.6' }}>
                        Our platform combines real-time data processing, a custom risk analysis engine and personalized alert systems to make space-safety insights accessible, reliable and easy to explore.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Card 1: Global Surveillance */}
                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ padding: '2rem' }}
                    >
                        <Globe size={40} color="#00d4ff" style={{ marginBottom: '1rem' }} />
                        <h3>Global Surveillance</h3>
                        <p style={{ color: '#aaa', marginTop: '0.5rem', lineHeight: '1.5' }}>
                            We continuously fetch and process live Near-Earth Object data from NASA to display real-time information such as asteroid velocity, size and distance from Earth. Users can explore current asteroid activity through a fast and interactive dashboard.
                        </p>
                    </motion.div>

                    {/* Card 2: Risk Analysis Engine */}
                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ padding: '2rem' }}
                    >
                        <Activity size={40} color="#ffaa00" style={{ marginBottom: '1rem' }} />
                        <h3>Risk Analysis Engine</h3>
                        <p style={{ color: '#aaa', marginTop: '0.5rem', lineHeight: '1.5' }}>
                            Our custom backend risk engine calculates a dynamic risk score using miss distance, estimated diameter and NASA’s hazardous classification. Each asteroid is automatically categorized as LOW, MEDIUM or HIGH risk for easy interpretation.
                        </p>
                    </motion.div>

                    {/* Card 3: Alert & Notification System */}
                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ padding: '2rem' }}
                    >
                        <Bell size={40} color="#ff4d4d" style={{ marginBottom: '1rem' }} />
                        <h3>Alert & Notification System</h3>
                        <p style={{ color: '#aaa', marginTop: '0.5rem', lineHeight: '1.5' }}>
                            The platform automatically identifies upcoming close-approach events and provides dashboard alerts for both user-tracked asteroids and global upcoming asteroid events.
                        </p>
                    </motion.div>

                    {/* Card 4: Personal Watchlists & History */}
                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        style={{ padding: '2rem' }}
                    >
                        <History size={40} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
                        <h3>Personal Watchlists & History</h3>
                        <p style={{ color: '#aaa', marginTop: '0.5rem', lineHeight: '1.5' }}>
                            Users can save important asteroids to their personal watchlist and review their recently viewed objects, enabling focused monitoring and faster research workflows.
                        </p>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', fontSize: '1.1rem', color: '#ccc', maxWidth: '700px', margin: '4rem auto 0', lineHeight: '1.6' }}
                >
                    Cosmic Watch is designed to support future extensions such as interactive 3D orbital visualisation and community collaboration tools for asteroid discussion.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '5rem', textAlign: 'center' }}
                >
                    <h2 style={{ marginBottom: '0.5rem' }}>Our Tech Stack</h2>
                    <p style={{ color: '#888', marginBottom: '2rem' }}>Built using a modern full-stack architecture for real-time performance, scalability and secure access.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        {['React', 'Three.js', 'Node.js', 'MongoDB', 'NASA API'].map((tech, i) => (
                            <span key={i} className="glass-panel" style={{ padding: '10px 20px', fontSize: '1rem' }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
