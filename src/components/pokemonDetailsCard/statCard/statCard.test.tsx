import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatCard from './statCard.js';

describe('StatCard', () => {
  const mockStats = [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/'
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/'
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/'
      }
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/'
      }
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/'
      }
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/'
      }
    }
  ];

  it('renders "Stats" title', () => {
    render(<StatCard stats={mockStats} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('renders stat names correctly (formatted)', () => {
    render(<StatCard stats={mockStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Sp. Attack')).toBeInTheDocument();
    expect(screen.getByText('Sp. Defense')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });

  it('renders stat values correctly', () => {
    render(<StatCard stats={mockStats} />);
    
    // Use getAllByText to handle multiple elements with same text
    const hpValues = screen.getAllByText('45');
    const attackValues = screen.getAllByText('49');
    const specialAttackValues = screen.getAllByText('65');
    
    expect(hpValues.length).toBeGreaterThan(0);
    expect(attackValues.length).toBeGreaterThan(0);
    expect(specialAttackValues.length).toBeGreaterThan(0);
  });

  it('renders with empty stats array', () => {
    render(<StatCard stats={[]} />);
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders with single stat', () => {
    const singleStat = [mockStats[0]];
    render(<StatCard stats={singleStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    const hpValues = screen.getAllByText('45');
    expect(hpValues.length).toBeGreaterThan(0);
    expect(screen.queryByText('Attack')).not.toBeInTheDocument();
  });

  it('renders with partial stats', () => {
    const partialStats = mockStats.slice(0, 3);
    render(<StatCard stats={partialStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.queryByText('Sp. Attack')).not.toBeInTheDocument();
  });

  it('renders without stats prop', () => {
    render(<StatCard />); // Uses default props
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders with null stats', () => {
    render(<StatCard stats={null} />);
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders with undefined stats', () => {
    render(<StatCard stats={undefined} />);
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders all six standard stats when provided', () => {
    render(<StatCard stats={mockStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Sp. Attack')).toBeInTheDocument();
    expect(screen.getByText('Sp. Defense')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });

  it('renders correct stat values for each stat', () => {
    render(<StatCard stats={mockStats} />);
    
    // Check that all stat values are rendered
    const hpValues = screen.getAllByText('45');
    const attackValues = screen.getAllByText('49');
    const specialAttackValues = screen.getAllByText('65');
    
    expect(hpValues.length).toBeGreaterThan(0);
    expect(attackValues.length).toBeGreaterThan(0);
    expect(specialAttackValues.length).toBeGreaterThan(0);
  });

  it('handles stats with zero values', () => {
    const zeroStats = [
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    render(<StatCard stats={zeroStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    const zeroValues = screen.getAllByText('0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('handles stats with high values', () => {
    const highStats = [
      {
        base_stat: 255,
        effort: 3,
        stat: {
          name: 'speed',
          url: 'https://pokeapi.co/api/v2/stat/6/'
        }
      }
    ];
    render(<StatCard stats={highStats} />);
    
    expect(screen.getByText('Speed')).toBeInTheDocument();
    const highValues = screen.getAllByText('255');
    expect(highValues.length).toBeGreaterThan(0);
  });

  it('handles stats with negative values', () => {
    const negativeStats = [
      {
        base_stat: -10,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      }
    ];
    render(<StatCard stats={negativeStats} />);
    
    expect(screen.getByText('Attack')).toBeInTheDocument();
    const negativeValues = screen.getAllByText('-10');
    expect(negativeValues.length).toBeGreaterThan(0);
  });

  it('handles stats with decimal values', () => {
    const decimalStats = [
      {
        base_stat: 45.5,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    render(<StatCard stats={decimalStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    const decimalValues = screen.getAllByText('45.5');
    expect(decimalValues.length).toBeGreaterThan(0);
  });

  it('handles stats with missing stat name', () => {
    const incompleteStats = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: '',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    render(<StatCard stats={incompleteStats} />);
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    const statValues = screen.getAllByText('45');
    expect(statValues.length).toBeGreaterThan(0);
  });

  it('handles stats with null stat object', () => {
    const nullStatStats = [
      {
        base_stat: 45,
        effort: 0,
        stat: null
      }
    ];
    render(<StatCard stats={nullStatStats} />);
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    const statValues = screen.getAllByText('45');
    expect(statValues.length).toBeGreaterThan(0);
  });

  it('handles stats with undefined stat object', () => {
    const undefinedStatStats = [
      {
        base_stat: 45,
        effort: 0,
        stat: undefined
      }
    ];
    render(<StatCard stats={undefinedStatStats} />);
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    const statValues = screen.getAllByText('45');
    expect(statValues.length).toBeGreaterThan(0);
  });

  it('handles stats with missing base_stat', () => {
    const missingBaseStat = [
      {
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    render(<StatCard stats={missingBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    const zeroValues = screen.getAllByText('0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('handles stats with missing effort', () => {
    const missingEffort = [
      {
        base_stat: 45,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    render(<StatCard stats={missingEffort} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    const statValues = screen.getAllByText('45');
    expect(statValues.length).toBeGreaterThan(0);
  });

  it('handles stats with null base_stat', () => {
    const nullBaseStat = [
      {
        base_stat: null,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    render(<StatCard stats={nullBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    const zeroValues = screen.getAllByText('0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('handles stats with undefined base_stat', () => {
    const undefinedBaseStat = [
      {
        base_stat: undefined,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    render(<StatCard stats={undefinedBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    const zeroValues = screen.getAllByText('0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('handles completely invalid stat object', () => {
    const invalidStats = [
      {
        invalid: 'data'
      }
    ];
    render(<StatCard stats={invalidStats} />);
    
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    const zeroValues = screen.getAllByText('0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('handles mixed valid and invalid stats', () => {
    const mixedStats = [
      mockStats[0], // Valid stat
      {
        base_stat: 50,
        effort: 0,
        stat: null // Invalid stat
      }
    ];
    render(<StatCard stats={mixedStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    const hpValues = screen.getAllByText('45');
    const unknownValues = screen.getAllByText('50');
    expect(hpValues.length).toBeGreaterThan(0);
    expect(unknownValues.length).toBeGreaterThan(0);
  });
});
