const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function run() {
    try {
        const timestamp = Date.now();
        const email = `testuser_${timestamp}@example.com`;
        const password = 'password123';

        // 1. Register
        console.log(`Registering user: ${email}`);
        try {
            await axios.post(`${API_URL}/auth/register`, {
                firstname: 'Test',
                lastname: 'User',
                email,
                password
            });
            console.log('Registration successful.');
        } catch (e) {
            console.error('Registration failed:', e.response ? e.response.data : e.message);
            return;
        }

        // 2. Login
        console.log('Logging in...');
        let token;
        try {
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            token = loginRes.data.token;
            console.log('Login successful, token received.');
        } catch (e) {
            console.error('Login failed:', e.response ? e.response.data : e.message);
            return;
        }

        // CORRECT HEADER for backend
        const headers = { 'Authorization': `Bearer ${token}` };

        // 3. Get an asteroid
        console.log('Fetching asteroid feed...');
        let asteroid;
        try {
            const today = new Date().toISOString().split('T')[0];
            const feedRes = await axios.get(`${API_URL}/asteroids/feed?start_date=${today}&end_date=${today}`, { headers }); // headers here might not be needed for public feed but good practice
            if (feedRes.data.data && feedRes.data.data.length > 0) {
                asteroid = feedRes.data.data[0];
                console.log(`Found asteroid: ${asteroid.name} (${asteroid.neo_reference_id})`);
            } else {
                console.log('No asteroids found in feed.');
                return;
            }
        } catch (e) {
            console.error('Feed fetch failed:', e.response ? e.response.data : e.message);
            return;
        }

        // 4. Add to Watchlist
        console.log('Adding to watchlist...');
        const payload = {
            neo_reference_id: asteroid.neo_reference_id,
            name: asteroid.name,
            miss_distance_km: asteroid.miss_distance_km,
            velocity_kmph: asteroid.velocity_kmph,
            is_potentially_hazardous: asteroid.is_potentially_hazardous,
            close_approach_date: asteroid.close_approach_date,
            riskScore: asteroid.riskScore || 50
        };

        try {
            const addRes = await axios.post(`${API_URL}/watchlist`, payload, { headers });
            console.log('Add to watchlist response:', addRes.status, addRes.data);
        } catch (e) {
            console.error('Add to watchlist failed:', e.response ? e.response.data : e.message);
        }

        // 5. Get Watchlist
        console.log('Fetching watchlist...');
        try {
            const listRes = await axios.get(`${API_URL}/watchlist`, { headers });
            console.log('Watchlist Count:', listRes.data.length);

            const found = listRes.data.find(item => item.neo_reference_id === asteroid.neo_reference_id);
            if (found) {
                console.log('SUCCESS: Asteroid found in watchlist.');
            } else {
                console.log('FAILURE: Asteroid NOT found in watchlist.');
            }
        } catch (e) {
            console.error('Get watchlist failed:', e.response ? e.response.data : e.message);
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

run();
