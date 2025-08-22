import React from 'react';
import { Pokemon, PokemonSpeciesResponse } from '../../../types/pokemon.types';
import "./propertyCard.scss";

interface PropertyCardProps {
  speciesData?: PokemonSpeciesResponse;
  data: Pokemon;
  pokemonTypeData: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  speciesData, 
  data, 
  pokemonTypeData 
}) => {
  return (
    <div className="property-card">
      <h4>Properties</h4>
      <div className="properties-grid">
        <div className="property-item">
          <span className="property-label">Height:</span>
          <span className="property-value">{data.height / 10}m</span>
        </div>
        <div className="property-item">
          <span className="property-label">Weight:</span>
          <span className="property-value">{data.weight / 10}kg</span>
        </div>
        <div className="property-item">
          <span className="property-label">Base Experience:</span>
          <span className="property-value">{data.base_experience}</span>
        </div>
        {speciesData && (
          <>
            <div className="property-item">
              <span className="property-label">Capture Rate:</span>
              <span className="property-value">{speciesData.capture_rate}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Base Happiness:</span>
              <span className="property-value">{speciesData.base_happiness}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
