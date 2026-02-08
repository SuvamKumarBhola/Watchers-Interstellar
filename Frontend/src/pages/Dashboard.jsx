import React, { useEffect, useState } from 'react';
import AsteroidService from '../services/asteroid.service';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AsteroidCard from '../components/AsteroidCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchFeed();
    }, []);

    const fetchFeed = async () => {
        try {
            setLoading(true);
            const data = await AsteroidService.getFeed();
            setAsteroids(data.data || []);
        } catch (err) {
            setError("Failed to load asteroid feed. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    // Filtering Logic
    const filteredAsteroids = asteroids.filter(asteroid => {
        const matchesSearch = asteroid.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isHazardous = asteroid.is_potentially_hazardous;

        if (riskFilter === 'All') return matchesSearch;
        if (riskFilter === 'Hazardous') return matchesSearch && isHazardous;
        if (riskFilter === 'Safe') return matchesSearch && !isHazardous;
        return matchesSearch;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAsteroids.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAsteroids.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050505' }}>
            <Sidebar />

            <main style={{ marginLeft: '240px', flex: 1, padding: '6rem 3rem' }}>

                {/* Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                        <p style={{ color: '#888' }}>Welcome back, {currentUser?.firstname || 'Space Explorer'}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <User size={20} color="#ccc" />
                        </div>
                    </div>
                </header>

                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>

                    {/* Search */}
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} color="#666" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search by asteroid name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 10px 10px 40px',
                                background: '#0a0a0e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Filter Controls */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0a0a0e', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '8px', color: '#ccc', cursor: 'pointer' }}>
                            <Calendar size={16} />
                            <span>Select Date Range</span>
                        </button>

                        <select
                            value={riskFilter}
                            onChange={(e) => setRiskFilter(e.target.value)}
                            style={{
                                background: '#0a0a0e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                color: '#ccc',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="All">All Risk Levels</option>
                            <option value="Hazardous">Hazardous Only</option>
                            <option value="Safe">Safe Only</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#888', marginTop: '4rem' }}>Scanning Deep Space...</div>
                ) : error ? (
                    <div style={{ color: '#ff4d4d' }}>{error}</div>
                ) : (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {currentItems.map((asteroid) => (
                                <AsteroidCard key={asteroid.neo_reference_id} asteroid={asteroid} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{ background: 'transparent', border: 'none', color: currentPage === 1 ? '#333' : '#888', cursor: currentPage === 1 ? 'default' : 'pointer' }}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <span style={{ background: '#111', padding: '5px 12px', borderRadius: '4px', border: '1px solid #333' }}>
                                {currentPage}
                            </span>

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{ background: 'transparent', border: 'none', color: currentPage === totalPages ? '#333' : '#888', cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
