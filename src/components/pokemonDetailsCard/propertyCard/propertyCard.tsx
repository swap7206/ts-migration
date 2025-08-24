import React from 'react';
import { Pokemon, PokemonSpeciesResponse } from '../../../types/pokemon.types';
import "./propertyCard.scss";

interface PropertyCardProps {
  speciesData?: PokemonSpeciesResponse;
  data?: Pokemon;
  pokemonTypeData?: any;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  speciesData, 
  data, 
  pokemonTypeData,
  className = "property-container"
}) => {
  // Handle null/undefined data
  const pokemonData = data || {
    height: 0,
    weight: 0,
    base_experience: null,
    abilities: [],
    types: []
  };

  // Helper function to format gender rate
  const getGenderText = (genderRate: number) => {
    if (genderRate === -1) return 'Genderless';
    if (genderRate === 0) return 'Male only';
    if (genderRate === 8) return 'Female only';
    
    const femalePercentage = (genderRate / 8) * 100;
    const malePercentage = 100 - femalePercentage;
    return `Male ${malePercentage}%, Female ${femalePercentage}%`;
  };

  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={className}>
      <h4>Properties</h4>
      <div className="properties-grid">
        <div className="property-item">
          <span className="property-label">Height:</span>
          <span className="property-value">{(pokemonData.height / 10).toFixed(1)} m</span>
        </div>
        <div className="property-item">
          <span className="property-label">Weight:</span>
          <span className="property-value">{(pokemonData.weight / 10).toFixed(1)} kg</span>
        </div>
        <div className="property-item">
          <span className="property-label">Base Experience:</span>
          <span className="property-value">{pokemonData.base_experience !== null && pokemonData.base_experience !== undefined ? pokemonData.base_experience : 'N/A'}</span>
        </div>
        
        {speciesData && (
          <>
            <div className="property-item">
              <span className="property-label">Gender(s):</span>
              <span className="property-value">{getGenderText(speciesData.gender_rate)}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Egg Groups:</span>
              <span className="property-value">
                {speciesData.egg_groups?.map(group => capitalize(group.name)).join(', ') || 'N/A'}
              </span>
            </div>
            <div className="property-item">
              <span className="property-label">Capture Rate:</span>
              <span className="property-value">{speciesData.capture_rate || 'N/A'}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Base Happiness:</span>
              <span className="property-value">{speciesData.base_happiness || 'N/A'}</span>
            </div>
          </>
        )}
        
        <div className="property-item">
          <span className="property-label">Abilities:</span>
          <span className="property-value">
            {pokemonData.abilities?.map(ability => 
              capitalize(ability.ability.name) + (ability.is_hidden ? ' (Hidden)' : '')
            ).join(', ') || 'N/A'}
          </span>
        </div>
        
        <div className="property-item">
          <span className="property-label">Types:</span>
          <span className="property-value">
            {pokemonData.types?.map(type => capitalize(type.type.name)).join(', ') || 'N/A'}
          </span>
        </div>
        
        <div className="property-item">
          <span className="property-label">Weak Against:</span>
          <span className="property-value">
            {pokemonTypeData?.damage_relations?.double_damage_from?.map((type: any) => 
              capitalize(type.name)
            ).join(', ') || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
