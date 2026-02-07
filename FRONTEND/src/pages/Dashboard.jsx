// App.js
import React, { useState, useEffect } from 'react';

const App = () => {
  const [neos, setNeos] = useState([]);
  const [watchedAsteroids, setWatchedAsteroids] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    neosToday: 28,
    hazardsObjects: 6,
    closestApproach: '320,000 km',
    highRiskNeos: 4
  });

  // Initial data
  useEffect(() => {
    // NEOs data
    const initialNeos = [
      { id: 1, name: '2024 QX1', diameter: '500 m', velocity: '29.9 km/s', missDistance: '39,000 km', hazards: true, riskLevel: 'High' },
      { id: 2, name: 'Asteroid 2023 AB', diameter: '720 m', velocity: '36.0 km/s', missDistance: '12,700 km', hazards: false, riskLevel: 'Low' },
      { id: 3, name: 'NEO 1999 VF', diameter: '630 m', velocity: '29.8 km/s', missDistance: '136,600 km', hazards: false, riskLevel: 'Medium' },
      { id: 4, name: '2024 RM12', diameter: '330 m', velocity: '32.0 km/s', missDistance: '81,800 km', hazards: true, riskLevel: 'Low' },
      { id: 5, name: 'Apollo 11X', diameter: '500 m', velocity: '37.0 km/s', missDistance: '85,400 km', hazards: false, riskLevel: 'High' },
    ];
    setNeos(initialNeos);

    // Watched asteroids
    const initialWatched = [
      { id: 1, name: '2024 QX1', risk: 'High Risk' },
      { id: 2, name: 'Asteroid 2023 AB', risk: 'Low Risk' },
    ];
    setWatchedAsteroids(initialWatched);

    // Alerts
    const initialAlerts = [
      { id: 1, type: 'alert', message: '2024 QX1 - Close Approach in 3 hours', time: 'Today, 14:30 UTC' },
      { id: 2, type: 'warning', message: 'Apollo 11X nearing Earth in 1 day', time: 'Tomorrow, 08:15 UTC' },
    ];
    setAlerts(initialAlerts);
  }, []);

  // Toggle watch status
  const toggleWatch = (neoId) => {
    const neo = neos.find(n => n.id === neoId);
    if (!neo) return;

    const isWatched = watchedAsteroids.some(w => w.name === neo.name);
    
    if (isWatched) {
      setWatchedAsteroids(watchedAsteroids.filter(w => w.name !== neo.name));
    } else {
      setWatchedAsteroids([
        ...watchedAsteroids,
        { id: Date.now(), name: neo.name, risk: `${neo.riskLevel} Risk` }
      ]);
    }
  };

  // Add random NEO
  const addRandomNEO = () => {
    const names = ['2025 AB1', '1998 XY', 'Apollo 15Y', '2024 ZK8', 'NEO 4567'];
    const diameters = ['450 m', '680 m', '920 m', '210 m', '580 m'];
    const velocities = ['31.5 km/s', '28.7 km/s', '34.2 km/s', '26.9 km/s', '39.1 km/s'];
    const distances = ['45,300 km', '89,700 km', '152,000 km', '67,500 km', '28,900 km'];
    const riskLevels = ['High', 'Medium', 'Low', 'High', 'Medium'];
    
    const randomIndex = Math.floor(Math.random() * names.length);
    
    const newNEO = {
      id: neos.length + 1,
      name: names[randomIndex],
      diameter: diameters[randomIndex],
      velocity: velocities[randomIndex],
      missDistance: distances[randomIndex],
      hazards: Math.random() > 0.5,
      riskLevel: riskLevels[randomIndex]
    };
    
    setNeos([...neos, newNEO]);
    setStats(prev => ({
      ...prev,
      neosToday: prev.neosToday + 1,
      highRiskNeos: riskLevels[randomIndex] === 'High' ? prev.highRiskNeos + 1 : prev.highRiskNeos
    }));
  };

  // Get risk color
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-indigo-500/20 shadow-[0_0_40px_rgba(55,42,172,0.08)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(55,42,172,0.4)]">
              🌌 COSMIC WATCH
            </h1>
            <p className="text-gray-300/80 mt-2">Real-Time Near-Earth Object Monitoring</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-xl font-semibold text-indigo-300">
              {new Date().toUTCString().slice(0, 22)}
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(55,42,172,0.8)]"></div>
              <span className="text-indigo-300/90 text-sm">Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* NEOS Today */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-4">
            <div className="text-3xl text-indigo-400/80">☄️</div>
            <div>
              <h3 className="text-gray-400/80 text-sm">NEOS Today</h3>
              <p className="text-2xl font-bold text-white">{stats.neosToday}</p>
              <p className="text-indigo-300/70 text-xs mt-1">+2 from yesterday</p>
            </div>
          </div>
        </div>

        {/* Hazards Objects */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-4">
            <div className="text-3xl text-red-400/80">🚨</div>
            <div>
              <h3 className="text-gray-400/80 text-sm">Hazard Objects</h3>
              <p className="text-2xl font-bold text-red-400 drop-shadow-[0_0_8px_rgba(255,50,50,0.3)]">{stats.hazardsObjects}</p>
              <p className="text-red-300/70 text-xs mt-1">Require monitoring</p>
            </div>
          </div>
        </div>

        {/* Closest Approach */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-4">
            <div className="text-3xl text-indigo-400/80">🌎</div>
            <div>
              <h3 className="text-gray-400/80 text-sm">Closest Approach</h3>
              <p className="text-2xl font-bold text-indigo-300 drop-shadow-[0_0_8px_rgba(55,42,172,0.4)]">{stats.closestApproach}</p>
              <p className="text-indigo-300/70 text-xs mt-1">Moon distance: 384,400 km</p>
            </div>
          </div>
        </div>

        {/* High-Risk NEOS */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-4">
            <div className="text-3xl text-yellow-400/80">⚠️</div>
            <div>
              <h3 className="text-gray-400/80 text-sm">High-Risk NEOS</h3>
              <p className="text-2xl font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(255,200,50,0.3)]">{stats.highRiskNeos}</p>
              <p className="text-yellow-300/70 text-xs mt-1">Immediate attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - NEO Table */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-bold text-white mb-3 sm:mb-0">Near-Earth Objects Feed</h2>
              <div className="flex gap-2">
                <button 
                  onClick={addRandomNEO}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-all duration-300 text-white border border-indigo-500/30"
                >
                  + Add NEO
                </button>
                <button className="px-4 py-2 border border-slate-400 hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-300">
                  Export Data
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl border border-slate-600/30 bg-white/5 backdrop-blur-sm">
              <table className="min-w-full divide-y divide-slate-600/30">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400/80 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400/80 uppercase tracking-wider">Diameter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400/80 uppercase tracking-wider">Velocity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400/80 uppercase tracking-wider">Miss Distance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400/80 uppercase tracking-wider">Hazards</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400/80 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400/80 uppercase tracking-wider">Watch</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-slate-600/20">
                  {neos.map((neo) => (
                      <tr key={neo.id} className={neo.riskLevel === 'High' ? 'bg-red-900/10 hover:bg-red-900/20' : 'hover:bg-white/5'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2 text-indigo-400/80">☄️</span>
                          <span className="font-medium text-white">{neo.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300/80">
                        {neo.diameter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300/80">
                        {neo.velocity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={parseInt(neo.missDistance.replace(',', '')) < 50000 ? 'text-red-300 font-semibold drop-shadow-[0_0_8px_rgba(255,50,50,0.3)]' : 'text-gray-300/80'}>
                            {neo.missDistance}
                          </span>
                          {parseInt(neo.missDistance.replace(',', '')) < 50000 && (
                            <span className="ml-2 px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded border border-red-500/30">Close!</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${neo.hazards ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'}`}>
                          {neo.hazards ? '⚠️ Yes' : '✅ No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(neo.riskLevel)} border border-slate-600/30`}>
                          {neo.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleWatch(neo.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            watchedAsteroids.some(w => w.name === neo.name)
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/50'
                              : 'border border-slate-400 hover:bg-white/10 text-gray-300'
                          }`}
                        >
                          {watchedAsteroids.some(w => w.name === neo.name) ? '👁️ Watching' : '👁️ Watch'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-400/80">
              <p>🔄 Auto-refresh in <span className="text-indigo-300">30 seconds</span></p>
              <p>📊 Showing {neos.length} of {stats.neosToday} detected objects</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Watched Asteroids */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">My Watched Asteroids</h2>
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/30">
                {watchedAsteroids.length}
              </span>
            </div>

            <div className="space-y-3">
              {watchedAsteroids.length > 0 ? (
                watchedAsteroids.map((asteroid) => (
                  <div key={asteroid.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-slate-600/30 hover:border-indigo-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="text-xl text-indigo-400/80">👁️</div>
                      <div>
                        <h4 className="font-medium text-white">{asteroid.name}</h4>
                        <p className={`text-xs ${asteroid.risk.includes('High') ? 'text-red-300 drop-shadow-[0_0_8px_rgba(255,50,50,0.3)]' : 'text-green-300'}`}>
                          {asteroid.risk}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setWatchedAsteroids(watchedAsteroids.filter(w => w.id !== asteroid.id))}
                      className="text-gray-400/60 hover:text-red-400 p-1 transition-colors duration-300"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500/70">
                  <p>No asteroids being watched</p>
                  <p className="text-sm mt-1">Click "Watch" on any NEO to add here</p>
                </div>
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Alerts</h2>
              <span className="bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 px-3 py-1 rounded-full text-sm border border-red-500/30">
                {alerts.length} active
              </span>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border backdrop-blur-sm ${
                  alert.type === 'warning' 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30 shadow-[0_0_20px_rgba(255,200,50,0.1)]' 
                    : 'bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/30 shadow-[0_0_20px_rgba(255,50,50,0.1)]'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="text-xl">
                      {alert.type === 'warning' ? '⚠️' : '🚨'}
                    </div>
                    <div>
                      <p className="font-medium text-white">{alert.message}</p>
                      <p className="text-sm text-gray-400/70 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <h2 className="text-xl font-bold text-white mb-4">Risk Analysis</h2>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 drop-shadow-[0_0_15px_rgba(255,50,50,0.4)]">82</div>
                <div className="text-gray-400/80 text-sm">Risk Score</div>
              </div>
              <div>
                <div className="text-red-400 font-semibold">High Risk</div>
                <div className="text-gray-300/80 text-sm">Large Diameter & High Velocity</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300/80">Impact Probability</span>
                  <span className="text-red-300 drop-shadow-[0_0_8px_rgba(255,50,50,0.3)]">15%</span>
                </div>
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-[0_0_10px_rgba(255,50,50,0.5)]" style={{width: '15%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300/80">Damage Potential</span>
                  <span className="text-yellow-300 drop-shadow-[0_0_8px_rgba(255,200,50,0.3)]">65%</span>
                </div>
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-[0_0_10px_rgba(255,200,50,0.5)]" style={{width: '65%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300/80">Warning Time</span>
                  <span className="text-indigo-300 drop-shadow-[0_0_8px_rgba(55,42,172,0.4)]">30 days</span>
                </div>
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-[0_0_10px_rgba(55,42,172,0.5)]" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-red-900/20 to-amber-900/20 border border-red-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm shadow-[0_0_30px_rgba(255,50,50,0.15)]">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <div className="text-2xl text-red-400">⚠️</div>
            <div>
              <p className="font-bold text-white">Warning: Apollo 11X nearing Earth in 1 day</p>
              <p className="text-gray-300/80 text-sm">Close approach expected at 85,400 km. Monitor closely.</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-500 hover:to-red-600 rounded-lg font-medium transition-all duration-300 border border-red-500/30 shadow-[0_0_20px_rgba(255,50,50,0.2)]">
            View Details
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-slate-600/30">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400/70 text-sm mb-3 md:mb-0">
            🌌 COSMIC WATCH v2.1 • NASA JPL Data Feed • Last Updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-400 hover:bg-white/10 rounded-lg text-sm transition-all duration-300">
              🛰️ Satellite View
            </button>
            <button className="px-3 py-1.5 border border-slate-400 hover:bg-white/10 rounded-lg text-sm transition-all duration-300">
              📡 Data Sources
            </button>
            <button className="px-3 py-1.5 border border-slate-400 hover:bg-white/10 rounded-lg text-sm transition-all duration-300">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;