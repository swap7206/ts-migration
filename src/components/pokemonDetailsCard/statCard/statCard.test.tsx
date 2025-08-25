import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatCard from './statCard';

// Mock CSS imports
jest.mock('./statCard.scss', () => ({}));

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
      base_stat: 60,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/'
      }
    },
    {
      base_stat: 48,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/'
      }
    },
    {
      base_stat: 65,
      effort: 0,
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with valid stats', () => {
    render(<StatCard stats={mockStats} />);
    
    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('HP')).toBeInTheDocument();
    // Check that HP stat value is rendered (there are multiple "45" values, so check for HP specifically)
    const hpStatItem = screen.getByText('HP').closest('.stat-item');
    expect(hpStatItem).toHaveTextContent('45');
    expect(screen.getByText('ATTACK')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('DEFENSE')).toBeInTheDocument();
    expect(screen.getByText('48')).toBeInTheDocument();
  });

  it('renders without stats', () => {
    render(<StatCard />);
    
    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders with null stats', () => {
    render(<StatCard stats={null} />);
    
    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders with undefined stats', () => {
    render(<StatCard stats={undefined} />);
    
    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders with empty stats array', () => {
    render(<StatCard stats={[]} />);
    
    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('renders with single stat', () => {
    const singleStat = [mockStats[0]];
    render(<StatCard stats={singleStat} />);
    
    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with null base_stat', () => {
    const statWithNullBaseStat = [
      {
        base_stat: null,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithNullBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with undefined base_stat', () => {
    const statWithUndefinedBaseStat = [
      {
        base_stat: undefined,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithUndefinedBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with zero base_stat', () => {
    const statWithZeroBaseStat = [
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithZeroBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with maximum base_stat', () => {
    const statWithMaxBaseStat = [
      {
        base_stat: 255,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithMaxBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('255')).toBeInTheDocument();
  });

  it('handles stat with negative base_stat', () => {
    const statWithNegativeBaseStat = [
      {
        base_stat: -10,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithNegativeBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('-10')).toBeInTheDocument();
  });

  it('handles stat with decimal base_stat', () => {
    const statWithDecimalBaseStat = [
      {
        base_stat: 45.5,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithDecimalBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45.5')).toBeInTheDocument();
  });

  it('handles stat with null stat object', () => {
    const statWithNullStat = [
      {
        base_stat: 45,
        effort: 0,
        stat: null
      }
    ];
    
    render(<StatCard stats={statWithNullStat} />);
    
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with undefined stat object', () => {
    const statWithUndefinedStat = [
      {
        base_stat: 45,
        effort: 0,
        stat: undefined
      }
    ];
    
    render(<StatCard stats={statWithUndefinedStat} />);
    
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with null stat name', () => {
    const statWithNullStatName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: null,
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithNullStatName} />);
    
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with undefined stat name', () => {
    const statWithUndefinedStatName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: undefined,
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithUndefinedStatName} />);
    
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with empty stat name', () => {
    const statWithEmptyStatName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: '',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithEmptyStatName} />);
    
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with whitespace stat name', () => {
    const statWithWhitespaceStatName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: '   ',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithWhitespaceStatName} />);
    
    // Check that the stat name element contains whitespace and the value is correct
    const statNameElement = screen.getByText('45').previousElementSibling;
    expect(statNameElement).toHaveClass('stat-name');
    expect(statNameElement?.textContent?.trim()).toBe('');
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with special characters in name', () => {
    const statWithSpecialName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'special-attack',
          url: 'https://pokeapi.co/api/v2/stat/4/'
        }
      }
    ];
    
    render(<StatCard stats={statWithSpecialName} />);
    
    expect(screen.getByText('SPECIAL-ATTACK')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with uppercase name', () => {
    const statWithUppercaseName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'HP',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithUppercaseName} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with mixed case name', () => {
    const statWithMixedCaseName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'SpEeD',
          url: 'https://pokeapi.co/api/v2/stat/6/'
        }
      }
    ];
    
    render(<StatCard stats={statWithMixedCaseName} />);
    
    expect(screen.getByText('SPEED')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with numbers in name', () => {
    const statWithNumbersInName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'stat-1',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithNumbersInName} />);
    
    expect(screen.getByText('STAT-1')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with very long name', () => {
    const statWithLongName = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'very-long-stat-name-that-exceeds-normal-length',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithLongName} />);
    
    expect(screen.getByText('VERY-LONG-STAT-NAME-THAT-EXCEEDS-NORMAL-LENGTH')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles multiple invalid stats', () => {
    const invalidStats = [
      {
        base_stat: 45,
        effort: 0,
        stat: null
      },
      {
        base_stat: null,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      },
      {
        base_stat: 60,
        effort: 0,
        stat: {
          name: null,
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      }
    ];
    
    render(<StatCard stats={invalidStats} />);
    
    // Check that UNKNOWN appears in the stat card (there are multiple UNKNOWN elements)
    const statCard = screen.getByText('Base Stats').closest('.stat-card');
    expect(statCard).toHaveTextContent('UNKNOWN');
    expect(screen.getAllByText('0')).toHaveLength(3);
  });

  it('handles mixed valid and invalid stats', () => {
    const mixedStats = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      },
      {
        base_stat: null,
        effort: 0,
        stat: null
      },
      {
        base_stat: 60,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      }
    ];
    
    render(<StatCard stats={mixedStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    expect(screen.getByText('ATTACK')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
  });

  it('handles stat with missing effort property', () => {
    const statWithoutEffort = [
      {
        base_stat: 45,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithoutEffort} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with missing url property', () => {
    const statWithoutUrl = [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'hp'
        }
      }
    ];
    
    render(<StatCard stats={statWithoutUrl} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles stat with extra properties', () => {
    const statWithExtraProperties = [
      {
        base_stat: 45,
        effort: 0,
        extra_property: 'should be ignored',
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
          extra_nested_property: 'should be ignored'
        }
      }
    ];
    
    render(<StatCard stats={statWithExtraProperties} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('handles malformed stat object', () => {
    const malformedStat = [
      {
        invalid: 'data'
      }
    ];
    
    render(<StatCard stats={malformedStat} />);
    
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with very high base_stat', () => {
    const statWithHighBaseStat = [
      {
        base_stat: 999,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithHighBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('handles stat with decimal base_stat that results in decimal percentage', () => {
    const statWithDecimalBaseStat = [
      {
        base_stat: 127.5,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithDecimalBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('127.5')).toBeInTheDocument();
  });

  it('handles stat with zero base_stat that results in zero percentage', () => {
    const statWithZeroBaseStat = [
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithZeroBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles stat with negative base_stat that results in zero percentage', () => {
    const statWithNegativeBaseStat = [
      {
        base_stat: -10,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      }
    ];
    
    render(<StatCard stats={statWithNegativeBaseStat} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('-10')).toBeInTheDocument();
  });

  it('handles all stats with different ranges for color testing', () => {
    const statsWithDifferentRanges = [
      {
        base_stat: 20, // Low stat (red)
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' }
      },
      {
        base_stat: 50, // Medium stat (yellow)
        effort: 0,
        stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' }
      },
      {
        base_stat: 100, // High stat (light green)
        effort: 0,
        stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' }
      },
      {
        base_stat: 200, // Very high stat (green)
        effort: 0,
        stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' }
      }
    ];
    
    render(<StatCard stats={statsWithDifferentRanges} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('ATTACK')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('DEFENSE')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('SPEED')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });
});
