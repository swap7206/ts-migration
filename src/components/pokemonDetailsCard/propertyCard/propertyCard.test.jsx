import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyCard from './propertyCard';

describe('PropertyCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    abilities: [
      {
        ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
        is_hidden: false,
        slot: 1
      }
    ],
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' }
      }
    ]
  };

  const mockSpeciesData = {
    egg_groups: [
      { name: 'monster', url: 'https://pokeapi.co/api/v2/egg-group/1/' },
      { name: 'plant', url: 'https://pokeapi.co/api/v2/egg-group/7/' }
    ],
    habitat: { name: 'grassland', url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/' }
  };

  it('renders pokemon properties correctly', () => {
    render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Base Experience')).toBeInTheDocument();
    expect(screen.getByText('Gender(s)')).toBeInTheDocument();
    expect(screen.getByText('Egg Groups')).toBeInTheDocument();
    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.getByText('Weak Against')).toBeInTheDocument();
  });

  it('renders without species data', () => {
    render(<PropertyCard data={mockPokemon} />);
    
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Base Experience')).toBeInTheDocument();
  });

  it('renders correctly with different gender rates', () => {
    const differentGenderPokemon = {
      ...mockPokemon,
      gender_rate: 1
    };
    
    render(<PropertyCard data={differentGenderPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Gender(s)')).toBeInTheDocument();
    expect(screen.getByText('Male, Female')).toBeInTheDocument();
  });

  it('handles missing abilities', () => {
    const noAbilitiesPokemon = {
      ...mockPokemon,
      abilities: null
    };
    
    render(<PropertyCard data={noAbilitiesPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Abilities')).toBeInTheDocument();
  });

  it('handles missing egg groups', () => {
    const noEggGroupsSpecies = {
      ...mockSpeciesData,
      egg_groups: null
    };
    
    render(<PropertyCard data={mockPokemon} speciesData={noEggGroupsSpecies} />);
    
    expect(screen.getByText('Egg Groups')).toBeInTheDocument();
  });

  it('handles missing habitat', () => {
    const noHabitatSpecies = {
      ...mockSpeciesData,
      habitat: null
    };
    
    render(<PropertyCard data={mockPokemon} speciesData={noHabitatSpecies} />);
    
    expect(screen.getByText('Height')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(
      <PropertyCard 
        data={mockPokemon} 
        speciesData={mockSpeciesData} 
        className="custom-class" 
      />
    );
    
    expect(container.firstChild).toHaveClass('property-container');
  });

  it('renders abilities', () => {
    render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Overgrow')).toBeInTheDocument();
  });

  it('renders types', () => {
    render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();
  });

  it('handles pokemon with no abilities', () => {
    const emptyPokemon = {
      ...mockPokemon,
      abilities: [],
      types: []
    };
    
    render(<PropertyCard data={emptyPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('Types')).toBeInTheDocument();
  });

  it('handles pokemon with hidden abilities', () => {
    const pokemonWithHiddenAbility = {
      ...mockPokemon,
      abilities: [
        {
          ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' },
          is_hidden: true,
          slot: 3
        }
      ]
    };
    
    render(<PropertyCard data={pokemonWithHiddenAbility} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Chlorophyll')).toBeInTheDocument();
  });

  it('handles pokemon with multiple abilities', () => {
    const pokemonWithMultipleAbilities = {
      ...mockPokemon,
      abilities: [
        {
          ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
          is_hidden: false,
          slot: 1
        },
        {
          ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' },
          is_hidden: true,
          slot: 3
        }
      ]
    };
    
    render(<PropertyCard data={pokemonWithMultipleAbilities} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Overgrow')).toBeInTheDocument();
    expect(screen.getByText('Chlorophyll')).toBeInTheDocument();
  });

  it('handles pokemon with extreme height and weight', () => {
    const extremePokemon = {
      ...mockPokemon,
      height: 0,
      weight: 999999
    };
    
    render(<PropertyCard data={extremePokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('0.0 m')).toBeInTheDocument();
    expect(screen.getByText('99999.9 kg')).toBeInTheDocument();
  });

  it('handles pokemon with decimal height and weight', () => {
    const decimalPokemon = {
      ...mockPokemon,
      height: 15,
      weight: 123
    };
    
    render(<PropertyCard data={decimalPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('1.5 m')).toBeInTheDocument();
    expect(screen.getByText('12.3 kg')).toBeInTheDocument();
  });

  it('handles species with single egg group', () => {
    const singleEggGroupSpecies = {
      ...mockSpeciesData,
      egg_groups: [{ name: 'monster', url: 'https://pokeapi.co/api/v2/egg-group/1/' }]
    };
    
    render(<PropertyCard data={mockPokemon} speciesData={singleEggGroupSpecies} />);
    
    expect(screen.getByText('Monster')).toBeInTheDocument();
  });

  it('handles species with many egg groups', () => {
    const manyEggGroupsSpecies = {
      ...mockSpeciesData,
      egg_groups: [
        { name: 'monster', url: 'https://pokeapi.co/api/v2/egg-group/1/' },
        { name: 'plant', url: 'https://pokeapi.co/api/v2/egg-group/7/' },
        { name: 'dragon', url: 'https://pokeapi.co/api/v2/egg-group/14/' }
      ]
    };
    
    render(<PropertyCard data={mockPokemon} speciesData={manyEggGroupsSpecies} />);
    
    expect(screen.getByText('Monster')).toBeInTheDocument();
    expect(screen.getByText('Plant')).toBeInTheDocument();
    expect(screen.getByText('Dragon')).toBeInTheDocument();
  });

  it('handles pokemon with no base experience', () => {
    const noExpPokemon = {
      ...mockPokemon,
      base_experience: null
    };
    
    render(<PropertyCard data={noExpPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Base Experience')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles pokemon with zero base experience', () => {
    const zeroExpPokemon = {
      ...mockPokemon,
      base_experience: 0
    };
    
    render(<PropertyCard data={zeroExpPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Base Experience')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles pokemon with high base experience', () => {
    const highExpPokemon = {
      ...mockPokemon,
      base_experience: 999999
    };
    
    render(<PropertyCard data={highExpPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('Base Experience')).toBeInTheDocument();
    expect(screen.getByText('999999')).toBeInTheDocument();
  });

  it('handles null data props', () => {
    render(<PropertyCard data={null} speciesData={null} />);
    
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('0.0 m')).toBeInTheDocument();
    expect(screen.getByText('0.0 kg')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles undefined data props', () => {
    render(<PropertyCard data={undefined} speciesData={undefined} />);
    
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('0.0 m')).toBeInTheDocument();
    expect(screen.getByText('0.0 kg')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles missing pokemonTypeData', () => {
    render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} pokemonTypeData={null} />);
    
    expect(screen.getByText('Weak Against')).toBeInTheDocument();
  });
});
