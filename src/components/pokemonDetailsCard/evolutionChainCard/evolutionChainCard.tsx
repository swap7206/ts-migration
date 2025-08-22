import React from 'react';
import { Pokemon } from '../../../types/pokemon.types';
import "./evolutionChainCard.scss";

interface EvolutionChainCardProps {
  data: Pokemon;
}

const EvolutionChainCard: React.FC<EvolutionChainCardProps> = ({ data }) => {
  return (
    <div className="evolution-chain-card">
      <h4>Evolution Chain</h4>
      <div className="evolution-info">
        <p>Evolution chain data would be displayed here.</p>
        <p>Pokemon: {data.name}</p>
        <p>Species: {data.species.name}</p>
      </div>
    </div>
  );
};

export default EvolutionChainCard;
