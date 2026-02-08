import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
                <Rocket size={24} color="var(--accent-purple)" />
                <span className="glow-text">Cosmic Watch</span>
            </Link>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                {currentUser ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex' }}>
                                <User size={18} />
                            </div>
                            <span>{currentUser.firstname || currentUser.name || currentUser.email}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'var(--text-secondary)',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s'
                            }}
                            title="Logout"
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="btn-primary" style={{ padding: '8px 16px' }}>Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
