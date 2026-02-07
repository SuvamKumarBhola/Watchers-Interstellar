import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, LayoutDashboard, List, Bell, Clock, Palette } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <List size={20} />, label: 'Watchlist', path: '/watchlist' },
        { icon: <Bell size={20} />, label: 'Alerts', path: '#' },
        { icon: <Clock size={20} />, label: 'Recent History', path: '#' },
        { icon: <Palette size={20} />, label: 'UI Kit', path: '#' },
    ];

    return (
        <aside style={{
            width: '240px',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            backgroundColor: '#050505',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '3rem', paddingLeft: '1rem', textDecoration: 'none' }}>
                <div style={{ background: 'var(--accent-purple)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                    <Rocket size={20} color="white" />
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Cosmic Watch</span>
            </Link>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: isActive(item.path) ? 'white' : '#888',
                            backgroundColor: isActive(item.path) ? 'var(--accent-purple)' : 'transparent',
                            transition: 'all 0.2s',
                            fontWeight: isActive(item.path) ? '600' : 'normal'
                        }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingLeft: '1rem', fontSize: '0.8rem', color: '#555' }}>
                © 2026 Cosmic Watch
            </div>
        </aside>
    );
};

export default Sidebar;
