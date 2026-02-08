import api from './api';

const AsteroidService = {
    getFeed: async (startDate, endDate) => {
        // If no dates provided, backend defaults might apply or we send current week
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;

        const response = await api.get('/asteroids/feed', { params });
        return response.data;
    },

    getWatchlist: async () => {
        const response = await api.get('/watchlist');
        return response.data;
    },

    addToWatchlist: async (asteroid) => {
        // asteroid object should contain neo_reference_id, name, etc.
        const payload = {
            neo_reference_id: asteroid.neo_reference_id,
            name: asteroid.name,
            miss_distance_km: asteroid.miss_distance_km,
            velocity_kmph: asteroid.velocity_kmph,
            is_potentially_hazardous: asteroid.is_potentially_hazardous,
            close_approach_date: asteroid.close_approach_date,
            riskScore: asteroid.riskScore
        };
        const response = await api.post('/watchlist', payload);
        return response.data;
    },

    removeFromWatchlist: async (asteroidId) => {
        const response = await api.delete(`/watchlist/${asteroidId}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/asteroids/${id}`);
        return response.data;
    },

    getAlerts: async (type = 'watchlist') => {
        const response = await api.get('/alerts', { params: { type } });
        return response.data;
    },

    addHistory: async (asteroid) => {
        const payload = {
            neo_reference_id: asteroid.neo_reference_id,
            name: asteroid.name
        };
        const response = await api.post('/history', payload);
        return response.data;
    },

    getHistory: async () => {
        const response = await api.get('/history');
        return response.data;
    }
};

export default AsteroidService;
