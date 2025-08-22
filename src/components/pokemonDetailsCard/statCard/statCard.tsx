import React from 'react';
import { PokemonStat } from '../../../types/pokemon.types';
import "./statCard.scss";

interface StatCardProps {
  stats: PokemonStat[];
}

const StatCard: React.FC<StatCardProps> = ({ stats }) => {
  const maxStat = 255; // Maximum possible stat value

  return (
    <div className="stat-card">
      <h4>Base Stats</h4>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="stat-item">
            <div className="stat-header">
              <span className="stat-name">{stat.stat.name.toUpperCase()}</span>
              <span className="stat-value">{stat.base_stat}</span>
            </div>
            <div className="stat-bar">
              <div 
                className="stat-fill" 
                style={{ 
                  width: `${(stat.base_stat / maxStat) * 100}%`,
                  backgroundColor: getStatColor(stat.base_stat)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatColor = (value: number): string => {
  const percentage = (value / 255) * 100;
  if (percentage >= 80) return '#4CAF50';
  if (percentage >= 60) return '#8BC34A';
  if (percentage >= 40) return '#FFC107';
  if (percentage >= 20) return '#FF9800';
  return '#F44336';
};

export default StatCard;
