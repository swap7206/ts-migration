import React from 'react';
import { getBackground } from "../../constants/pokemon.types";
import { numberFormation } from "../../services/common.service";
import "./pokemonCard.scss";
import PropTypes from 'prop-types';


const PokemonCard = ({ data, onClick, className }) => {
    // Handle missing or undefined data
    const safeData = data || {};
    const safeClassName = className || '';

    // Get sprite URL with fallbacks
    const getSpriteUrl = () => {
        if (!safeData.sprites) return "https://via.placeholder.com/150";
        
        const dreamWorldUrl = safeData.sprites?.other?.dream_world?.front_default;
        const defaultUrl = safeData.sprites?.front_default;
        
        return dreamWorldUrl || defaultUrl || "https://via.placeholder.com/150";
    };

    // Get background style with fallback
    const getBackgroundStyle = () => {
        if (!safeData.types || safeData.types.length === 0) {
            return { background: '#C0DFDD' }; // Default color for unknown type
        }
        return { background: getBackground(safeData.types) };
    };

    return (
        <>
            <div className={`${safeClassName} card`} onClick={onClick} role="presentation" style={getBackgroundStyle()}>
                <div className="image-container">
                    <img src={getSpriteUrl()} alt="Avatar" />
                </div>
                <div className="text-container">
                    <strong><b>{safeData.name || 'Unknown'}</b></strong>
                    <span>{safeData.id ? numberFormation(safeData.id) : '#000'}</span>
                </div>
            </div>
        </>
    )
}

PokemonCard.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
    className: PropTypes.string
}

PokemonCard.defaultProps = {
    data: {},
    onClick: undefined,
    className: ''
}

export default PokemonCard;