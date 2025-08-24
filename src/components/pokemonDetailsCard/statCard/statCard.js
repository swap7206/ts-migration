import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { getCamleCaseString } from '../../../constants/pokemon.types';
import "./statCard.scss";
import PropTypes from 'prop-types';

const StatCard = ({ stats }) => {
  const getStatHeading = (name) => {
    if (!name) return '';
    if (name === "hp") {
      return "HP"
    } else {
      let [firstName, lastName] = name.split("-");
      if (firstName === "special" && lastName) return firstName = "Sp. " + getCamleCaseString(lastName);
      else return getCamleCaseString(firstName)
    }
  }

  // Handle edge cases
  if (!stats || !Array.isArray(stats) || stats.length === 0) {
    return (
      <div className='stat-container'>
        <div className='stat-card'>
          <div>
            <span className='stat-header'>Stats</span>
          </div>
          <div>
            <p>No stats available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='stat-container'>
        <div className='stat-card'>
          <div>
            <span className='stat-header'>Stats</span>
          </div>
          <div>
            <Grid fluid>
              <Row className="show-grid">
                {stats.map((item, index) => {
                  // Handle null/undefined stat objects
                  if (!item || !item.stat) {
                    return (
                      <Col key={`stat-${index}`} className="pl-0 pt-1" lg={12} xl={12} xs={24} sm={24}>
                        <div className='stat-flex-row'>
                          <Col xs={4} lg={8} xl={8} className="pl-0 pr-0">
                            <div><span className="prop-header">Unknown</span></div>
                          </Col>
                          <Col xs={8} lg={10} xl={10} className="pl-0 pr-0">
                            <div className='prop-header-data'>
                              <span className="stat-data">{item?.base_stat || 0}</span>
                              <progress value={item?.base_stat || 0} max="100">{item?.base_stat || 0}</progress>
                            </div>
                          </Col>
                        </div>
                      </Col>
                    );
                  }

                  return (
                    <Col key={item.stat.name || `stat-${index}`} className="pl-0 pt-1" lg={12} xl={12} xs={24} sm={24}>
                      <div className='stat-flex-row'>
                        <Col xs={4} lg={8} xl={8} className="pl-0 pr-0">
                          <div><span className="prop-header">{getStatHeading(item.stat.name)}</span></div>
                        </Col>
                        <Col xs={8} lg={10} xl={10} className="pl-0 pr-0">
                          <div className='prop-header-data'>
                            <span className="stat-data">{item.base_stat || 0}</span>
                            <progress value={item.base_stat || 0} max="100">{item.base_stat || 0}</progress>
                          </div>
                        </Col>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
};

StatCard.propTypes = {
  stats: PropTypes.array,
}

StatCard.defaultProps = {
  stats: []
}

export default StatCard;