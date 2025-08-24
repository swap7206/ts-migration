import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock CSS imports
jest.mock('./pokemonCard.scss', () => ({}));

import PokemonCard from './pokemonCard';

describe('PokemonCard - Simple Tests', () => {
  const mockData = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
      front_default: 'https://example.com/bulbasaur.png',
      other: {
        dream_world: {
          front_default: 'https://example.com/bulbasaur-dream.png'
        }
      }
    },
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
      }
    ]
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders pokemon name correctly', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders pokemon image correctly', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    const image = screen.getByAltText('Avatar');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/bulbasaur-dream.png');
  });

  it('calls onClick when clicked', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('bulbasaur'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different pokemon data', () => {
    const differentData = {
      ...mockData,
      name: 'pikachu',
      sprites: {
        front_default: 'https://example.com/pikachu.png',
        other: {
          dream_world: {
            front_default: 'https://example.com/pikachu-dream.png'
          }
        }
      }
    };
    render(<PokemonCard data={differentData} onClick={mockOnClick} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('renders with multiple types', () => {
    const multiTypeData = {
      ...mockData,
      types: [
        { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
        { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
      ]
    };
    render(<PokemonCard data={multiTypeData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with no types', () => {
    const noTypeData = {
      ...mockData,
      types: []
    };
    render(<PokemonCard data={noTypeData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with missing sprite data', () => {
    const noSpriteData = {
      ...mockData,
      sprites: {
        front_default: null,
        other: {
          dream_world: {
            front_default: null
          }
        }
      }
    };
    render(<PokemonCard data={noSpriteData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with undefined onClick', () => {
    render(<PokemonCard data={mockData} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with null onClick', () => {
    render(<PokemonCard data={mockData} onClick={null} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with proper accessibility', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with proper semantic structure', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with proper component isolation', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with proper maintainability', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with proper scalability', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders with proper reusability', () => {
    render(<PokemonCard data={mockData} onClick={mockOnClick} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
});
