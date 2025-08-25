import React from 'react';
import "./evolutionChainCard.scss";

interface EvolutionChainCardProps {
  evolutionChain?: any;
  className?: string;
}

const EvolutionChainCard: React.FC<EvolutionChainCardProps> = ({ evolutionChain, className }) => {
  // Helper function to safely convert any value to string
  const safeToString = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch {
        return '[object Object]';
      }
    }
    if (Array.isArray(value)) {
      return value.join(',');
    }
    return String(value);
  };

  // Helper function to safely handle className
  const getClassName = (baseClass: string, customClass?: any): string => {
    if (!customClass) return baseClass;
    if (typeof customClass === 'function') {
      try {
        return `${baseClass} ${customClass()}`;
      } catch {
        return baseClass;
      }
    }
    if (Array.isArray(customClass)) {
      return `${baseClass} ${customClass.join(' ')}`;
    }
    return `${baseClass} ${safeToString(customClass)}`;
  };

  return (
    <div className={getClassName('evolution-chain-card', className)}>
      <h4 className="evolution-title">Evolution Chain</h4>
      <div className="evolution-info">
        <p>Evolution chain data would be displayed here.</p>
        {evolutionChain && (
          <div>
            <p>Evolution Chain ID: {safeToString(evolutionChain.id)}</p>
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
