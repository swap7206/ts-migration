import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the getPokemonDescription function
jest.mock('../../../constants/pokemon.types', () => ({
  getPokemonDescription: jest.fn(() => 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.'),
  getBackground: jest.fn(() => '#C0DFDD'),
  getPokcolor: jest.fn(() => '#C0DFDD')
}));

// Mock the AppTooltip component
jest.mock('../../../hooks/tooltip/tooltip', () => {
  return function MockAppTooltip({ data, name }: any) {
    return <div data-testid="tooltip">{name}: {data}</div>;
  };
});

import DetailsHeader from './detailsHeader';

describe('DetailsHeader', () => {
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
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: '',
    moves: [],
    species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        },
        dream_world: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
        }
      }
    },
    stats: [],
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
      }
    ]
  };

  const mockSpeciesData = {
    id: 1,
    name: 'bulbasaur',
    order: 1,
    gender_rate: 1,
    capture_rate: 45,
    base_happiness: 50,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    hatch_counter: 20,
    has_gender_differences: false,
    forms_switchable: false,
    growth_rate: { name: 'medium-slow', url: 'https://pokeapi.co/api/v2/growth-rate/4/' },
    pokedex_numbers: [],
    form_descriptions: [],
    genera: [
      {
        genus: 'Seed Pokémon',
        language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' }
      }
    ],
    varieties: [],
    egg_groups: [
      {
        name: 'monster',
        url: 'https://pokeapi.co/api/v2/egg-group/1/'
      },
      {
        name: 'plant',
        url: 'https://pokeapi.co/api/v2/egg-group/7/'
      }
    ],
    flavor_text_entries: [
      {
        flavor_text: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
        language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
        version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' }
      }
    ]
  };

  it('renders with pokemon data', () => {
    render(<DetailsHeader data={mockPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Seed Pokémon')).toBeInTheDocument();
  });

  it('renders pokemon name correctly', () => {
    render(<DetailsHeader data={mockPokemon} speciesData={mockSpeciesData} />);
    
    const nameElement = screen.getByText('bulbasaur');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveClass('pokemon-name');
  });

  it('renders pokemon genus correctly', () => {
    render(<DetailsHeader data={mockPokemon} speciesData={mockSpeciesData} />);
    
    const genusElement = screen.getByText('Seed Pokémon');
    expect(genusElement).toBeInTheDocument();
    expect(genusElement).toHaveClass('pokemon-genus');
  });

  it('renders pokemon description', () => {
    render(<DetailsHeader data={mockPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByText('A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.')).toBeInTheDocument();
  });

  it('renders without species data', () => {
    render(<DetailsHeader data={mockPokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<DetailsHeader data={mockPokemon} className="custom-class" />);
    
    const container = screen.getByText('bulbasaur').closest('.details-header');
    expect(container).toHaveClass('custom-class');
  });

  it('renders with long description and tooltip', () => {
    // Mock a long description
    const longDescription = 'A'.repeat(400);
    jest.requireMock('../../../constants/pokemon.types').getPokemonDescription.mockReturnValue(longDescription);
    
    render(<DetailsHeader data={mockPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByText('read more: ' + longDescription)).toBeInTheDocument();
  });

  it('renders with short description without tooltip', () => {
    // Mock a short description
    const shortDescription = 'Short description';
    jest.requireMock('../../../constants/pokemon.types').getPokemonDescription.mockReturnValue(shortDescription);
    
    render(<DetailsHeader data={mockPokemon} speciesData={mockSpeciesData} />);
    
    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
  });
});
