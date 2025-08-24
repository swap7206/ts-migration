import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { getCamleCaseString } from '../../../constants/pokemon.types';
import ColorfulTag from '../colorfulTags/colorfulTag';
import "./propertyCard.scss";
import "../../../styles/common.scss";
import PropTypes from 'prop-types';

const PropertyCard = ({ speciesData, data, pokemonTypeData }) => {
  // Handle missing or undefined data
  const safeData = data || {};
  const safeSpeciesData = speciesData || {};
  const safePokemonTypeData = pokemonTypeData || {};

  // Format height and weight
  const formatHeight = (height) => {
    if (height === null || height === undefined) return '0.0 m';
    return `${(height / 10).toFixed(1)} m`;
  };

  const formatWeight = (weight) => {
    if (weight === null || weight === undefined) return '0.0 kg';
    return `${(weight / 10).toFixed(1)} kg`;
  };

  const formatBaseExperience = (baseExp) => {
    if (baseExp === null || baseExp === undefined) return 'N/A';
    return baseExp.toString();
  };

  return (
    <div className="property-container">
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Height</span></div>
              <div className='prop-header-data'>{formatHeight(safeData.height)}</div>
            </div>
          </Col>
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Weight</span></div>
              <div className='prop-header-data'>{formatWeight(safeData.weight)}</div>
            </div>
          </Col>
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Base Experience</span></div>
              <div className='prop-header-data'>{formatBaseExperience(safeData.base_experience)}</div>
            </div>
          </Col>
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Gender(s)</span></div>
              <div className='prop-header-data'>Male, Female</div>
            </div>
          </Col>
        </Row>
        <Row className="show-grid pt-3">
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Egg Groups</span></div>
              {safeSpeciesData.egg_groups && safeSpeciesData.egg_groups.length > 0 && (
                safeSpeciesData.egg_groups.map((item, index) => (
                  <span key={item.name} className='prop-header-data'>
                    {getCamleCaseString(item.name)}
                    {safeSpeciesData.egg_groups.length !== index + 1 && (<span>,</span>)}
                  </span>
                ))
              )}
            </div>
          </Col>
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Abilities</span></div>
              {safeData.abilities && safeData.abilities.length > 0 && (
                safeData.abilities.map((item, index) => (
                  <span key={item.ability.name} className='prop-header-data'>
                    {getCamleCaseString(item.ability.name)}
                    {safeData.abilities.length !== index + 1 && (<span>,</span>)}
                  </span>
                ))
              )}
            </div>
          </Col>
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Types</span></div>
              <div className='prop-header-data'>
                <div className='type-wrap'>
                  {safeData.types && safeData.types.length > 0 && (
                    safeData.types.map((item, index) => (
                      <ColorfulTag 
                        className="pr-1" 
                        key={item.type.name + index} 
                        type={item.type.name} 
                        text={getCamleCaseString(item.type.name)} 
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className='flex-col'>
              <div><span className="prop-header">Weak Against</span></div>
              <div className='prop-header-data type-wrap'>
                {safePokemonTypeData.damage_relations && 
                 safePokemonTypeData.damage_relations.double_damage_from && 
                 safePokemonTypeData.damage_relations.double_damage_from.length > 0 && (
                  safePokemonTypeData.damage_relations.double_damage_from.map((item, index) => (
                    <ColorfulTag 
                      key={item.name + index} 
                      className="pr-1" 
                      type={item.name} 
                      text={getCamleCaseString(item.name)} 
                    />
                  ))
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

PropertyCard.propTypes = {
  speciesData: PropTypes.object,
  data: PropTypes.object,
  pokemonTypeData: PropTypes.object,
}

PropertyCard.defaultProps = {
  speciesData: {},
  data: {},
  pokemonTypeData: {}
}

export default PropertyCard;