import React from 'react';
import "./evolutionChainCard.scss";

interface EvolutionChainCardProps {
  evolutionChain?: any;
  className?: string;
}

const EvolutionChainCard: React.FC<EvolutionChainCardProps> = ({ evolutionChain, className }) => {
  return (
    <div className={`evolution-chain-card ${className || ''}`}>
      <h4 className="evolution-title">Evolution Chain</h4>
      <div className="evolution-info">
        <p>Evolution chain data would be displayed here.</p>
        {evolutionChain && (
          <div>
            <p>Evolution Chain ID: {evolutionChain.id}</p>
            {evolutionChain.chain && (
              <p>Chain data available</p>
            )}
          </div>
        )}
        {!evolutionChain && (
          <p>No evolution chain data available</p>
        )}
      </div>
    </div>
  );
};

export default EvolutionChainCard;
