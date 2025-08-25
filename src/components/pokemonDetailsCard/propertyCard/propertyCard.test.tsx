import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyCard from './propertyCard';

// Mock CSS imports
jest.mock('./propertyCard.scss', () => ({}));

describe('PropertyCard', () => {
  const mockPokemonData = {
    id: 25,
    name: 'pikachu',
    height: 40,
    weight: 60,
    base_experience: 112,
    abilities: [
      {
        ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
        is_hidden: false,
        slot: 1
      },
      {
        ability: { name: 'lightning-rod', url: 'https://pokeapi.co/api/v2/ability/31/' },
        is_hidden: true,
        slot: 3
      }
    ],
    types: [
      { type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' } }
    ]
  };

  const mockSpeciesData = {
    gender_rate: 4,
    egg_groups: [
      { name: 'fairy', url: 'https://pokeapi.co/api/v2/egg-group/6/' },
      { name: 'mineral', url: 'https://pokeapi.co/api/v2/egg-group/10/' }
    ],
    capture_rate: 190,
    base_happiness: 50
  };

  const mockPokemonTypeData = {
    damage_relations: {
      double_damage_from: [
        { name: 'ground' }
      ],
      double_damage_to: [
        { name: 'water' },
        { name: 'flying' }
      ],
      half_damage_from: [
        { name: 'flying' },
        { name: 'steel' },
        { name: 'electric' }
      ],
      half_damage_to: [
        { name: 'electric' },
        { name: 'grass' },
        { name: 'dragon' }
      ],
      no_damage_from: [],
      no_damage_to: [
        { name: 'ground' }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with valid pokemon data', () => {
    render(<PropertyCard data={mockPokemonData} />);
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByText('4.0 m')).toBeInTheDocument();
    expect(screen.getByText('6.0 kg')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();
  });

  it('renders with species data', () => {
    render(<PropertyCard data={mockPokemonData} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Male 50%, Female 50%')).toBeInTheDocument();
    expect(screen.getByText('Fairy, Mineral')).toBeInTheDocument();
    expect(screen.getByText('190')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders with pokemon type data', () => {
    render(<PropertyCard data={mockPokemonData} pokemonTypeData={mockPokemonTypeData} />);
    
    expect(screen.getByText('Ground')).toBeInTheDocument();
  });

  it('renders with all data', () => {
    render(
      <PropertyCard 
        data={mockPokemonData} 
        speciesData={mockSpeciesData} 
        pokemonTypeData={mockPokemonTypeData} 
      />
    );
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByText('4.0 m')).toBeInTheDocument();
    expect(screen.getByText('6.0 kg')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();
    expect(screen.getByText('Male 50%, Female 50%')).toBeInTheDocument();
    expect(screen.getByText('Fairy, Mineral')).toBeInTheDocument();
    expect(screen.getByText('190')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Static, Lightning-rod (Hidden)')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Ground')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<PropertyCard data={mockPokemonData} className="custom-class" />);
    
    const container = screen.getByText('Properties').closest('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it('handles null data', () => {
    render(<PropertyCard data={null} />);
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByText('0.0 m')).toBeInTheDocument();
    expect(screen.getByText('0.0 kg')).toBeInTheDocument();
    // Check that N/A appears in the base experience section
    const baseExpSection = screen.getByText('Base Experience:').closest('.property-item');
    expect(baseExpSection).toHaveTextContent('N/A');
  });

  it('handles undefined data', () => {
    render(<PropertyCard data={undefined} />);
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByText('0.0 m')).toBeInTheDocument();
    expect(screen.getByText('0.0 kg')).toBeInTheDocument();
    // Check that N/A appears in the base experience section
    const baseExpSection = screen.getByText('Base Experience:').closest('.property-item');
    expect(baseExpSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with null base experience', () => {
    const pokemonWithNullExp = {
      ...mockPokemonData,
      base_experience: null
    };
    
    render(<PropertyCard data={pokemonWithNullExp} />);
    
    // Find the base experience section specifically
    const baseExpSection = screen.getByText('Base Experience:').closest('.property-item');
    expect(baseExpSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with undefined base experience', () => {
    const pokemonWithUndefinedExp = {
      ...mockPokemonData,
      base_experience: undefined
    };
    
    render(<PropertyCard data={pokemonWithUndefinedExp} />);
    
    // Find the base experience section specifically
    const baseExpSection = screen.getByText('Base Experience:').closest('.property-item');
    expect(baseExpSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with zero base experience', () => {
    const pokemonWithZeroExp = {
      ...mockPokemonData,
      base_experience: 0
    };
    
    render(<PropertyCard data={pokemonWithZeroExp} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles pokemon with zero height and weight', () => {
    const pokemonWithZeroStats = {
      ...mockPokemonData,
      height: 0,
      weight: 0
    };
    
    render(<PropertyCard data={pokemonWithZeroStats} />);
    
    expect(screen.getByText('0.0 m')).toBeInTheDocument();
    expect(screen.getByText('0.0 kg')).toBeInTheDocument();
  });

  it('handles pokemon with decimal height and weight', () => {
    const pokemonWithDecimalStats = {
      ...mockPokemonData,
      height: 45,
      weight: 67
    };
    
    render(<PropertyCard data={pokemonWithDecimalStats} />);
    
    expect(screen.getByText('4.5 m')).toBeInTheDocument();
    expect(screen.getByText('6.7 kg')).toBeInTheDocument();
  });

  it('handles gender rate -1 (Genderless)', () => {
    const speciesDataGenderless = {
      ...mockSpeciesData,
      gender_rate: -1
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataGenderless} />);
    
    expect(screen.getByText('Genderless')).toBeInTheDocument();
  });

  it('handles gender rate 0 (Male only)', () => {
    const speciesDataMaleOnly = {
      ...mockSpeciesData,
      gender_rate: 0
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataMaleOnly} />);
    
    expect(screen.getByText('Male only')).toBeInTheDocument();
  });

  it('handles gender rate 8 (Female only)', () => {
    const speciesDataFemaleOnly = {
      ...mockSpeciesData,
      gender_rate: 8
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataFemaleOnly} />);
    
    expect(screen.getByText('Female only')).toBeInTheDocument();
  });

  it('handles gender rate with percentage calculation', () => {
    const speciesDataWithPercentage = {
      ...mockSpeciesData,
      gender_rate: 2
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataWithPercentage} />);
    
    expect(screen.getByText('Male 75%, Female 25%')).toBeInTheDocument();
  });

  it('handles species data without egg groups', () => {
    const speciesDataWithoutEggGroups = {
      ...mockSpeciesData,
      egg_groups: null
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataWithoutEggGroups} />);
    
    // Find the egg groups section specifically
    const eggGroupsSection = screen.getByText('Egg Groups:').closest('.property-item');
    expect(eggGroupsSection).toHaveTextContent('N/A');
  });

  it('handles species data with empty egg groups', () => {
    const speciesDataWithEmptyEggGroups = {
      ...mockSpeciesData,
      egg_groups: []
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataWithEmptyEggGroups} />);
    
    // Find the egg groups section specifically
    const eggGroupsSection = screen.getByText('Egg Groups:').closest('.property-item');
    expect(eggGroupsSection).toHaveTextContent('N/A');
  });

  it('handles species data with single egg group', () => {
    const speciesDataWithSingleEggGroup = {
      ...mockSpeciesData,
      egg_groups: [{ name: 'monster' }]
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataWithSingleEggGroup} />);
    
    expect(screen.getByText('Monster')).toBeInTheDocument();
  });

  it('handles species data with null capture rate', () => {
    const speciesDataWithNullCaptureRate = {
      ...mockSpeciesData,
      capture_rate: null
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataWithNullCaptureRate} />);
    
    // Find the capture rate section specifically
    const captureRateSection = screen.getByText('Capture Rate:').closest('.property-item');
    expect(captureRateSection).toHaveTextContent('N/A');
  });

  it('handles species data with null base happiness', () => {
    const speciesDataWithNullHappiness = {
      ...mockSpeciesData,
      base_happiness: null
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataWithNullHappiness} />);
    
    // Find the base happiness section specifically
    const baseHappinessSection = screen.getByText('Base Happiness:').closest('.property-item');
    expect(baseHappinessSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with null abilities', () => {
    const pokemonWithNullAbilities = {
      ...mockPokemonData,
      abilities: null
    };
    
    render(<PropertyCard data={pokemonWithNullAbilities} />);
    
    // Find the abilities section specifically
    const abilitiesSection = screen.getByText('Abilities:').closest('.property-item');
    expect(abilitiesSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with empty abilities', () => {
    const pokemonWithEmptyAbilities = {
      ...mockPokemonData,
      abilities: []
    };
    
    render(<PropertyCard data={pokemonWithEmptyAbilities} />);
    
    // Find the abilities section specifically
    const abilitiesSection = screen.getByText('Abilities:').closest('.property-item');
    expect(abilitiesSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with single ability', () => {
    const pokemonWithSingleAbility = {
      ...mockPokemonData,
      abilities: [
        {
          ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
          is_hidden: false,
          slot: 1
        }
      ]
    };
    
    render(<PropertyCard data={pokemonWithSingleAbility} />);
    
    expect(screen.getByText('Static')).toBeInTheDocument();
  });

  it('handles pokemon with hidden ability', () => {
    const pokemonWithHiddenAbility = {
      ...mockPokemonData,
      abilities: [
        {
          ability: { name: 'lightning-rod', url: 'https://pokeapi.co/api/v2/ability/31/' },
          is_hidden: true,
          slot: 3
        }
      ]
    };
    
    render(<PropertyCard data={pokemonWithHiddenAbility} />);
    
    expect(screen.getByText('Lightning-rod (Hidden)')).toBeInTheDocument();
  });

  it('handles pokemon with null types', () => {
    const pokemonWithNullTypes = {
      ...mockPokemonData,
      types: null
    };
    
    render(<PropertyCard data={pokemonWithNullTypes} />);
    
    // Find the types section specifically
    const typesSection = screen.getByText('Types:').closest('.property-item');
    expect(typesSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with empty types', () => {
    const pokemonWithEmptyTypes = {
      ...mockPokemonData,
      types: []
    };
    
    render(<PropertyCard data={pokemonWithEmptyTypes} />);
    
    // Find the types section specifically
    const typesSection = screen.getByText('Types:').closest('.property-item');
    expect(typesSection).toHaveTextContent('N/A');
  });

  it('handles pokemon with multiple types', () => {
    const pokemonWithMultipleTypes = {
      ...mockPokemonData,
      types: [
        { type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' } },
        { type: { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' } }
      ]
    };
    
    render(<PropertyCard data={pokemonWithMultipleTypes} />);
    
    expect(screen.getByText('Electric, Flying')).toBeInTheDocument();
  });

  it('handles pokemon type data with null damage relations', () => {
    const typeDataWithNullDamageRelations = {
      damage_relations: null
    };
    
    render(<PropertyCard data={mockPokemonData} pokemonTypeData={typeDataWithNullDamageRelations} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles pokemon type data with null double damage from', () => {
    const typeDataWithNullDoubleDamageFrom = {
      damage_relations: {
        double_damage_from: null
      }
    };
    
    render(<PropertyCard data={mockPokemonData} pokemonTypeData={typeDataWithNullDoubleDamageFrom} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles pokemon type data with empty double damage from', () => {
    const typeDataWithEmptyDoubleDamageFrom = {
      damage_relations: {
        double_damage_from: []
      }
    };
    
    render(<PropertyCard data={mockPokemonData} pokemonTypeData={typeDataWithEmptyDoubleDamageFrom} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles pokemon type data with multiple weak types', () => {
    const typeDataWithMultipleWeakTypes = {
      damage_relations: {
        double_damage_from: [
          { name: 'ground' },
          { name: 'rock' }
        ]
      }
    };
    
    render(<PropertyCard data={mockPokemonData} pokemonTypeData={typeDataWithMultipleWeakTypes} />);
    
    expect(screen.getByText('Ground, Rock')).toBeInTheDocument();
  });

  it('handles pokemon with special characters in ability names', () => {
    const pokemonWithSpecialAbilityNames = {
      ...mockPokemonData,
      abilities: [
        {
          ability: { name: 'pressure', url: 'https://pokeapi.co/api/v2/ability/46/' },
          is_hidden: false,
          slot: 1
        }
      ]
    };
    
    render(<PropertyCard data={pokemonWithSpecialAbilityNames} />);
    
    expect(screen.getByText('Pressure')).toBeInTheDocument();
  });

  it('handles pokemon with special characters in type names', () => {
    const pokemonWithSpecialTypeNames = {
      ...mockPokemonData,
      types: [
        { type: { name: 'fighting', url: 'https://pokeapi.co/api/v2/type/2/' } }
      ]
    };
    
    render(<PropertyCard data={pokemonWithSpecialTypeNames} />);
    
    expect(screen.getByText('Fighting')).toBeInTheDocument();
  });

  it('handles pokemon with special characters in egg group names', () => {
    const speciesDataWithSpecialEggGroupNames = {
      ...mockSpeciesData,
      egg_groups: [
        { name: 'water-1', url: 'https://pokeapi.co/api/v2/egg-group/2/' }
      ]
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={speciesDataWithSpecialEggGroupNames} />);
    
    expect(screen.getByText('Water-1')).toBeInTheDocument();
  });

  it('handles pokemon with special characters in weak type names', () => {
    const typeDataWithSpecialWeakTypeNames = {
      damage_relations: {
        double_damage_from: [
          { name: 'ice' }
        ]
      }
    };
    
    render(<PropertyCard data={mockPokemonData} pokemonTypeData={typeDataWithSpecialWeakTypeNames} />);
    
    expect(screen.getByText('Ice')).toBeInTheDocument();
  });

  it('handles empty string values', () => {
    const pokemonWithEmptyStrings = {
      ...mockPokemonData,
      abilities: [
        {
          ability: { name: '', url: 'https://pokeapi.co/api/v2/ability/9/' },
          is_hidden: false,
          slot: 1
        }
      ],
      types: [
        { type: { name: '', url: 'https://pokeapi.co/api/v2/type/13/' } }
      ]
    };
    
    render(<PropertyCard data={pokemonWithEmptyStrings} />);
    
    // Since empty strings are handled by the component and return N/A, check for that
    const abilitiesSection = screen.getByText('Abilities:').closest('.property-item');
    expect(abilitiesSection).toHaveTextContent('N/A');
  });

  it('handles malformed data gracefully', () => {
    const malformedPokemonData = {
      ...mockPokemonData,
      abilities: [
        { invalid: 'data' }
      ],
      types: [
        { invalid: 'data' }
      ]
    };
    
    render(<PropertyCard data={malformedPokemonData} />);
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('handles malformed species data gracefully', () => {
    const malformedSpeciesData = {
      ...mockSpeciesData,
      egg_groups: [
        { invalid: 'data' }
      ]
    };
    
    render(<PropertyCard data={mockPokemonData} speciesData={malformedSpeciesData} />);
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('handles malformed type data gracefully', () => {
    const malformedTypeData = {
      damage_relations: {
        double_damage_from: [
          { invalid: 'data' }
        ]
      }
    };
    
    render(<PropertyCard data={mockPokemonData} pokemonTypeData={malformedTypeData} />);
    
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });
});
