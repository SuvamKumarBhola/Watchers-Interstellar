function calculateRiskScore(data) {

  const distance = data.miss_distance_km;

  const avgDiameter =
    (data.diameter_min_km + data.diameter_max_km) / 2;

  let score = 0;

  if (distance < 500000) score += 50;
  else if (distance < 1500000) score += 30;
  else if (distance < 5000000) score += 10;

  if (avgDiameter > 0.5) score += 30;
  else if (avgDiameter > 0.15) score += 20;
  else if (avgDiameter > 0.05) score += 10;

  if (data.is_potentially_hazardous) score += 20;

  if (score > 100) score = 100;

  return score;
}

function getRiskLevel(score) {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

module.exports = {
  calculateRiskScore,
  getRiskLevel,
};
