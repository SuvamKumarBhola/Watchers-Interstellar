import React from 'react';
import { Rocket, Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#000',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4rem 0 2rem',
            marginTop: 'auto',
            color: '#aaa',
            fontFamily: 'var(--font-main)'
        }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                {/* Brand Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                        <div style={{ background: '#8b5cf6', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Rocket size={20} color="white" />
                        </div>
                        <span style={{ color: '#8b5cf6' }}>Cosmic</span> <span style={{ color: 'white' }}>Watch</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '250px' }}>
                        Explore the cosmos and monitor Near-Earth Objects in real-time.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <Github size={18} style={{ cursor: 'pointer' }} />
                        <Twitter size={18} style={{ cursor: 'pointer' }} />
                        <Linkedin size={18} style={{ cursor: 'pointer' }} />
                        <Facebook size={18} style={{ cursor: 'pointer' }} />
                        <Instagram size={18} style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                {/* Product Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>Product</h4>
                    <Link to="/dashboard" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Dashboard</Link>
                    <Link to="/about" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Features</Link>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Pricing</Link>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Updates</Link>
                </div>

                {/* Company Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>Company</h4>
                    <Link to="/about" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>About Us</Link>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Careers</Link>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Blog</Link>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Contact</Link>
                </div>

                {/* Legal Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>Legal</h4>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Terms of Service</Link>
                    <Link to="#" style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'none' }}>Cookie Policy</Link>
                </div>
            </div>

            {/* Copyright Bar */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
                <p>© 2026 Cosmic Watch. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
