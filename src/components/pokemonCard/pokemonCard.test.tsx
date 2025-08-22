import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonCard from './pokemonCard';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        front_female: null,
      },
      home: {
        front_default: null,
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default: null,
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  stats: [],
  abilities: [],
  moves: [],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  forms: [],
  game_indices: [],
  held_items: [],
  location_area_encounters: '',
  order: 1,
  past_types: [],
};

describe('PokemonCard', () => {
  it('renders pokemon name and ID correctly', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
  });

  it('renders pokemon image with correct src', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg');
  });

  it('falls back to front_default when dream_world image is not available', () => {
    const pokemonWithoutDreamWorld = {
      ...mockPokemon,
      sprites: {
        ...mockPokemon.sprites,
        other: {
          ...mockPokemon.sprites.other,
          dream_world: {
            front_default: null,
            front_female: null,
          },
        },
      },
    };

    render(<PokemonCard data={pokemonWithoutDreamWorld} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  it('falls back to placeholder when no images are available', () => {
    const pokemonWithoutImages = {
      ...mockPokemon,
      sprites: {
        ...mockPokemon.sprites,
        front_default: null,
        other: {
          ...mockPokemon.sprites.other,
          dream_world: {
            front_default: null,
            front_female: null,
          },
        },
      },
    };

    render(<PokemonCard data={pokemonWithoutImages} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('applies custom className when provided', () => {
    render(<PokemonCard data={mockPokemon} className="custom-class" />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('custom-class', 'card');
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<PokemonCard data={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByRole('presentation');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when no handler is provided', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    const card = screen.getByRole('presentation');
    expect(() => fireEvent.click(card)).not.toThrow();
  });

  it('applies background style based on pokemon types', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveStyle('background: linear-gradient(180deg, #C0D4C8 0%, #CFB7ED 100%)');
  });

  it('handles single type pokemon correctly', () => {
    const singleTypePokemon = {
      ...mockPokemon,
      types: [
        {
          slot: 1,
          type: {
            name: 'fire',
            url: 'https://pokeapi.co/api/v2/type/10/',
          },
        },
      ],
    };

    render(<PokemonCard data={singleTypePokemon} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveStyle('background: #EDC2C4');
  });

  it('handles pokemon with ID less than 10', () => {
    const lowIdPokemon = { ...mockPokemon, id: 5 };
    render(<PokemonCard data={lowIdPokemon} />);
    
    expect(screen.getByText('005')).toBeInTheDocument();
  });

  it('handles pokemon with ID between 10 and 99', () => {
    const mediumIdPokemon = { ...mockPokemon, id: 25 };
    render(<PokemonCard data={mediumIdPokemon} />);
    
    expect(screen.getByText('025')).toBeInTheDocument();
  });

  it('handles pokemon with ID 100 or greater', () => {
    const highIdPokemon = { ...mockPokemon, id: 150 };
    render(<PokemonCard data={highIdPokemon} />);
    
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });

  it('has correct accessibility attributes', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    const card = screen.getByRole('presentation');
    const image = screen.getByAltText('Avatar');
    
    expect(card).toHaveAttribute('role', 'presentation');
    expect(image).toHaveAttribute('alt', 'Avatar');
  });
});
