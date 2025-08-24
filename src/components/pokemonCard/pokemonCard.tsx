import React from 'react';
import { getBackground } from "../../constants/pokemon.types";
import { numberFormation } from "../../services/common.service";
import { PokemonCardProps } from "../../types/pokemon.types";
import "./pokemonCard.scss";

const PokemonCard: React.FC<PokemonCardProps> = ({ data, onClick, className }) => {
  // Handle null/undefined data
  if (!data) {
    return (
      <div className={`${className || ''} card`} role="presentation">
        <div className="image-container">
          <img src="https://via.placeholder.com/150" alt="Avatar" />
        </div>
        <div className="text-container">
          <strong><b>Unknown</b></strong>
          <span>{numberFormation(0)}</span>
        </div>
      </div>
    );
  }

  // Safe access to nested properties
  const spriteUrl = data.sprites?.other?.dream_world?.front_default ||
                   data.sprites?.front_default || 
                   "https://via.placeholder.com/150";
  
  const pokemonName = data.name || 'Unknown';
  const pokemonId = data.id || 0;
  const pokemonTypes = data.types || [];

  return (
    <>
      <div 
        className={`${className || ''} card`} 
        onClick={onClick} 
        role="presentation" 
        style={{
          background: getBackground(pokemonTypes)
        }}
      >
        <div className="image-container">
          <img 
            src={spriteUrl} 
            alt="Avatar" 
          />
        </div>
        <div className="text-container">
          <strong><b>{pokemonName}</b></strong>
          <span>{numberFormation(pokemonId)}</span>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
