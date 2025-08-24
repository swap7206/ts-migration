import React from 'react';
import { PokemonStat } from '../../../types/pokemon.types';
import "./statCard.scss";

interface StatCardProps {
  stats?: PokemonStat[];
}

const StatCard: React.FC<StatCardProps> = ({ stats }) => {
  const maxStat = 255; // Maximum possible stat value
  
  // Handle null/undefined stats
  const safeStats = stats || [];

  return (
    <div className="stat-card">
      <h4>Base Stats</h4>
      <div className="stats-grid">
        {safeStats.length === 0 ? (
          <div className="no-stats">No stats available</div>
        ) : (
          safeStats.map((stat, index) => {
            // Handle invalid stat objects
            if (!stat || !stat.stat || !stat.stat.name) {
              return (
                <div key={`invalid-${index}`} className="stat-item">
                  <div className="stat-header">
                    <span className="stat-name">UNKNOWN</span>
                    <span className="stat-value">0</span>
                  </div>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ 
                        width: '0%',
                        backgroundColor: getStatColor(0)
                      }}
                    />
                  </div>
                </div>
              );
            }

            const baseStat = stat.base_stat !== null && stat.base_stat !== undefined ? stat.base_stat : 0;
            const statName = stat.stat.name || 'unknown';

            return (
              <div key={statName} className="stat-item">
                <div className="stat-header">
                  <span className="stat-name">{statName.toUpperCase()}</span>
                  <span className="stat-value">{baseStat}</span>
                </div>
                <div className="stat-bar">
                  <div 
                    className="stat-fill" 
                    style={{ 
                      width: `${Math.max(0, (baseStat / maxStat) * 100)}%`,
                      backgroundColor: getStatColor(baseStat)
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
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
