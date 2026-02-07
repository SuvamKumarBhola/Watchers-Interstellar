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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-6 mb-6 border border-blue-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              🌌 COSMIC WATCH
            </h1>
            <p className="text-gray-300 mt-2">Real-Time Near-Earth Object Monitoring</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-xl font-semibold text-cyan-300">
              {new Date().toUTCString().slice(0, 22)}
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* NEOS Today */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="text-3xl">☄️</div>
            <div>
              <h3 className="text-gray-400 text-sm">NEOS Today</h3>
              <p className="text-2xl font-bold text-white">{stats.neosToday}</p>
              <p className="text-green-400 text-xs mt-1">+2 from yesterday</p>
            </div>
          </div>
        </div>

        {/* Hazards Objects */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-red-500/20 hover:border-red-500/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🚨</div>
            <div>
              <h3 className="text-gray-400 text-sm">Hazard Objects</h3>
              <p className="text-2xl font-bold text-red-400">{stats.hazardsObjects}</p>
              <p className="text-red-300 text-xs mt-1">Require monitoring</p>
            </div>
          </div>
        </div>

        {/* Closest Approach */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🌎</div>
            <div>
              <h3 className="text-gray-400 text-sm">Closest Approach</h3>
              <p className="text-2xl font-bold text-blue-300">{stats.closestApproach}</p>
              <p className="text-blue-300 text-xs mt-1">Moon distance: 384,400 km</p>
            </div>
          </div>
        </div>

        {/* High-Risk NEOS */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="text-3xl">⚠️</div>
            <div>
              <h3 className="text-gray-400 text-sm">High-Risk NEOS</h3>
              <p className="text-2xl font-bold text-yellow-400">{stats.highRiskNeos}</p>
              <p className="text-yellow-300 text-xs mt-1">Immediate attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - NEO Table */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-bold text-white mb-3 sm:mb-0">Near-Earth Objects Feed</h2>
              <div className="flex gap-2">
                <button 
                  onClick={addRandomNEO}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  + Add NEO
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                  Export Data
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Diameter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Velocity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Miss Distance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hazards</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Watch</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {neos.map((neo) => (
                    <tr key={neo.id} className={neo.riskLevel === 'High' ? 'bg-red-900/20' : 'hover:bg-gray-800/50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">☄️</span>
                          <span className="font-medium">{neo.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {neo.diameter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {neo.velocity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={parseInt(neo.missDistance.replace(',', '')) < 50000 ? 'text-red-400 font-semibold' : 'text-gray-300'}>
                            {neo.missDistance}
                          </span>
                          {parseInt(neo.missDistance.replace(',', '')) < 50000 && (
                            <span className="ml-2 px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded">Close!</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${neo.hazards ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                          {neo.hazards ? '⚠️ Yes' : '✅ No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(neo.riskLevel)}`}>
                          {neo.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleWatch(neo.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            watchedAsteroids.some(w => w.name === neo.name)
                              ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
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

            <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
              <p>🔄 Auto-refresh in <span className="text-cyan-300">30 seconds</span></p>
              <p>📊 Showing {neos.length} of {stats.neosToday} detected objects</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Watched Asteroids */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">My Watched Asteroids</h2>
              <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                {watchedAsteroids.length}
              </span>
            </div>

            <div className="space-y-3">
              {watchedAsteroids.length > 0 ? (
                watchedAsteroids.map((asteroid) => (
                  <div key={asteroid.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">👁️</div>
                      <div>
                        <h4 className="font-medium">{asteroid.name}</h4>
                        <p className={`text-xs ${asteroid.risk.includes('High') ? 'text-red-400' : 'text-green-400'}`}>
                          {asteroid.risk}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setWatchedAsteroids(watchedAsteroids.filter(w => w.id !== asteroid.id))}
                      className="text-gray-400 hover:text-red-400 p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No asteroids being watched</p>
                  <p className="text-sm mt-1">Click "Watch" on any NEO to add here</p>
                </div>
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Alerts</h2>
              <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                {alerts.length} active
              </span>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg ${alert.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-xl">
                      {alert.type === 'warning' ? '⚠️' : '🚨'}
                    </div>
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Risk Analysis</h2>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400">82</div>
                <div className="text-gray-400 text-sm">Risk Score</div>
              </div>
              <div>
                <div className="text-red-400 font-semibold">High Risk</div>
                <div className="text-gray-300 text-sm">Large Diameter & High Velocity</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Impact Probability</span>
                  <span className="text-red-300">15%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{width: '15%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Damage Potential</span>
                  <span className="text-yellow-300">65%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Warning Time</span>
                  <span className="text-blue-300">30 days</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbit Visualization */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 mb-6 border border-purple-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Orbit Visualization</h2>
        
        <div className="relative h-64 md:h-80 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          {/* Earth */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-5xl md:text-6xl animate-pulse">🌎</div>
          </div>
          
          {/* Orbit Rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border border-blue-400/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 border border-green-400/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 border border-red-400/10 rounded-full"></div>
          
          {/* Asteroids */}
          <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce">☄️</div>
          <div className="absolute top-1/3 right-1/4 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>☄️</div>
          <div className="absolute bottom-1/4 left-1/3 text-2xl animate-bounce" style={{animationDelay: '1s'}}>☄️</div>
          <div className="absolute top-2/3 right-1/3 text-2xl animate-bounce" style={{animationDelay: '1.5s'}}>☄️</div>
          
          {/* Moon */}
          <div className="absolute top-1/4 right-1/4 text-2xl">🌙</div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Earth Orbit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>NEO Trajectory</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 border border-red-500/30 rounded-2xl p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <div className="text-2xl">⚠️</div>
            <div>
              <p className="font-bold text-white">Warning: Apollo 11X nearing Earth in 1 day</p>
              <p className="text-gray-300 text-sm">Close approach expected at 85,400 km. Monitor closely.</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-3 md:mb-0">
            🌌 COSMIC WATCH v2.1 • NASA JPL Data Feed • Last Updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
              🛰️ Satellite View
            </button>
            <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
              📡 Data Sources
            </button>
            <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;