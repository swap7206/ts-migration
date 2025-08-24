import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonCard from './pokemonCard.tsx';

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        dream_world: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
        }
      }
    },
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

  it('renders pokemon card with basic data', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<PokemonCard data={mockPokemon} className="custom-class" />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('custom-class', 'card');
  });

  it('renders without className', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('card');
  });

  it('handles onClick event', () => {
    const mockOnClick = jest.fn();
    render(<PokemonCard data={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByRole('presentation');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders with single type', () => {
    const singleTypePokemon = {
      ...mockPokemon,
      types: [
        {
          slot: 1,
          type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }
        }
      ]
    };
    
    render(<PokemonCard data={singleTypePokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
  });

  it('renders with no types', () => {
    const noTypePokemon = {
      ...mockPokemon,
      types: []
    };
    
    render(<PokemonCard data={noTypePokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
  });

  it('uses dream world sprite when available', () => {
    render(<PokemonCard data={mockPokemon} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg');
  });

  it('falls back to front_default when dream world sprite is not available', () => {
    const pokemonWithoutDreamWorld = {
      ...mockPokemon,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        other: {
          dream_world: {
            front_default: null
          }
        }
      }
    };
    
    render(<PokemonCard data={pokemonWithoutDreamWorld} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  it('uses placeholder when no sprites are available', () => {
    const pokemonWithoutSprites = {
      ...mockPokemon,
      sprites: {
        front_default: null,
        other: {
          dream_world: {
            front_default: null
          }
        }
      }
    };
    
    render(<PokemonCard data={pokemonWithoutSprites} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('handles pokemon with high ID number', () => {
    const highIdPokemon = {
      ...mockPokemon,
      id: 999
    };
    
    render(<PokemonCard data={highIdPokemon} />);
    
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('handles pokemon with single digit ID', () => {
    const singleDigitPokemon = {
      ...mockPokemon,
      id: 5
    };
    
    render(<PokemonCard data={singleDigitPokemon} />);
    
    expect(screen.getByText('005')).toBeInTheDocument();
  });

  it('handles pokemon with double digit ID', () => {
    const doubleDigitPokemon = {
      ...mockPokemon,
      id: 25
    };
    
    render(<PokemonCard data={doubleDigitPokemon} />);
    
    expect(screen.getByText('025')).toBeInTheDocument();
  });

  it('handles pokemon with special characters in name', () => {
    const specialNamePokemon = {
      ...mockPokemon,
      name: 'mr-mime'
    };
    
    render(<PokemonCard data={specialNamePokemon} />);
    
    expect(screen.getByText('mr-mime')).toBeInTheDocument();
  });

  it('handles pokemon with uppercase name', () => {
    const uppercaseNamePokemon = {
      ...mockPokemon,
      name: 'CHARIZARD'
    };
    
    render(<PokemonCard data={uppercaseNamePokemon} />);
    
    expect(screen.getByText('CHARIZARD')).toBeInTheDocument();
  });

  it('handles null onClick prop', () => {
    render(<PokemonCard data={mockPokemon} onClick={null} />);
    
    const card = screen.getByRole('presentation');
    fireEvent.click(card);
    
    // Should not throw an error
    expect(card).toBeInTheDocument();
  });

  it('handles undefined onClick prop', () => {
    render(<PokemonCard data={mockPokemon} onClick={undefined} />);
    
    const card = screen.getByRole('presentation');
    fireEvent.click(card);
    
    // Should not throw an error
    expect(card).toBeInTheDocument();
  });

  it('handles empty className', () => {
    render(<PokemonCard data={mockPokemon} className="" />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('card');
  });

  it('handles null className', () => {
    render(<PokemonCard data={mockPokemon} className={null} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('card');
  });

  it('handles undefined className', () => {
    render(<PokemonCard data={mockPokemon} className={undefined} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('card');
  });

  it('handles missing sprites object', () => {
    const pokemonWithoutSprites = {
      ...mockPokemon,
      sprites: null
    };
    
    render(<PokemonCard data={pokemonWithoutSprites} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('handles missing other object in sprites', () => {
    const pokemonWithoutOther = {
      ...mockPokemon,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
      }
    };
    
    render(<PokemonCard data={pokemonWithoutOther} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  it('handles missing dream_world object', () => {
    const pokemonWithoutDreamWorld = {
      ...mockPokemon,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        other: {}
      }
    };
    
    render(<PokemonCard data={pokemonWithoutDreamWorld} />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  it('handles null data prop', () => {
    render(<PokemonCard data={null} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('000')).toBeInTheDocument();
  });

  it('handles undefined data prop', () => {
    render(<PokemonCard data={undefined} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('000')).toBeInTheDocument();
  });

  it('handles missing name', () => {
    const pokemonWithoutName = {
      ...mockPokemon,
      name: null
    };
    
    render(<PokemonCard data={pokemonWithoutName} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('handles missing ID', () => {
    const pokemonWithoutId = {
      ...mockPokemon,
      id: null
    };
    
    render(<PokemonCard data={pokemonWithoutId} />);
    
    expect(screen.getByText('000')).toBeInTheDocument();
  });
});
