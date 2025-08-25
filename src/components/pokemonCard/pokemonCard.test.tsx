import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonCard from './pokemonCard';

// Mock the utility functions
jest.mock('../../constants/pokemon.types', () => ({
  getBackground: jest.fn(() => 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)')
}));

jest.mock('../../services/common.service', () => ({
  numberFormation: jest.fn((num) => {
    let number = Number(num);
    if (number < 10) return `00${number}`;
    if (number >= 10 && number < 100) return `0${number}`;
    return number.toString();
  })
}));

// Mock CSS imports
jest.mock('./pokemonCard.scss', () => ({}));

describe('PokemonCard', () => {
  const mockPokemonData = {
    id: 25,
    name: 'pikachu',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      other: {
        dream_world: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
        }
      }
    },
    types: [
      { type: { name: 'electric' } }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with valid pokemon data', () => {
    render(<PokemonCard data={mockPokemonData} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockOnClick = jest.fn();
    render(<PokemonCard data={mockPokemonData} onClick={mockOnClick} />);
    
    const card = screen.getByRole('presentation');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders with custom className', () => {
    render(<PokemonCard data={mockPokemonData} className="custom-class" />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('custom-class', 'card');
  });

  it('handles null data gracefully', () => {
    render(<PokemonCard data={null} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  it('handles undefined data gracefully', () => {
    render(<PokemonCard data={undefined} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  it('handles pokemon with missing name', () => {
    const pokemonWithoutName = {
      ...mockPokemonData,
      name: null
    };
    
    render(<PokemonCard data={pokemonWithoutName} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('handles pokemon with missing id', () => {
    const pokemonWithoutId = {
      ...mockPokemonData,
      id: null
    };
    
    render(<PokemonCard data={pokemonWithoutId} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with missing sprites', () => {
    const pokemonWithoutSprites = {
      ...mockPokemonData,
      sprites: null
    };
    
    render(<PokemonCard data={pokemonWithoutSprites} />);
    
    const img = screen.getByAltText('Avatar');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('handles pokemon with missing dream world sprite', () => {
    const pokemonWithoutDreamWorld = {
      ...mockPokemonData,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        other: {
          dream_world: {
            front_default: null
          }
        }
      }
    };
    
    render(<PokemonCard data={pokemonWithoutDreamWorld} />);
    
    const img = screen.getByAltText('Avatar');
    expect(img).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png');
  });

  it('handles pokemon with missing front default sprite', () => {
    const pokemonWithoutFrontDefault = {
      ...mockPokemonData,
      sprites: {
        front_default: null,
        other: {
          dream_world: {
            front_default: null
          }
        }
      }
    };
    
    render(<PokemonCard data={pokemonWithoutFrontDefault} />);
    
    const img = screen.getByAltText('Avatar');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('handles pokemon with missing types', () => {
    const pokemonWithoutTypes = {
      ...mockPokemonData,
      types: null
    };
    
    render(<PokemonCard data={pokemonWithoutTypes} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with empty types array', () => {
    const pokemonWithEmptyTypes = {
      ...mockPokemonData,
      types: []
    };
    
    render(<PokemonCard data={pokemonWithEmptyTypes} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with zero id', () => {
    const pokemonWithZeroId = {
      ...mockPokemonData,
      id: 0
    };
    
    render(<PokemonCard data={pokemonWithZeroId} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with empty name', () => {
    const pokemonWithEmptyName = {
      ...mockPokemonData,
      name: ''
    };
    
    render(<PokemonCard data={pokemonWithEmptyName} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('handles pokemon with whitespace name', () => {
    const pokemonWithWhitespaceName = {
      ...mockPokemonData,
      name: '   '
    };
    
    render(<PokemonCard data={pokemonWithWhitespaceName} />);
    
    // Just verify the component renders without crashing
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  it('handles pokemon with special characters in name', () => {
    const pokemonWithSpecialName = {
      ...mockPokemonData,
      name: 'pikachu-électric'
    };
    
    render(<PokemonCard data={pokemonWithSpecialName} />);
    
    expect(screen.getByText('pikachu-électric')).toBeInTheDocument();
  });

  it('handles pokemon with very long name', () => {
    const pokemonWithLongName = {
      ...mockPokemonData,
      name: 'very-long-pokemon-name-that-exceeds-normal-length'
    };
    
    render(<PokemonCard data={pokemonWithLongName} />);
    
    expect(screen.getByText('very-long-pokemon-name-that-exceeds-normal-length')).toBeInTheDocument();
  });

  it('handles pokemon with large id number', () => {
    const pokemonWithLargeId = {
      ...mockPokemonData,
      id: 999999
    };
    
    render(<PokemonCard data={pokemonWithLargeId} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with negative id', () => {
    const pokemonWithNegativeId = {
      ...mockPokemonData,
      id: -1
    };
    
    render(<PokemonCard data={pokemonWithNegativeId} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with decimal id', () => {
    const pokemonWithDecimalId = {
      ...mockPokemonData,
      id: 25.5
    };
    
    render(<PokemonCard data={pokemonWithDecimalId} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with multiple types', () => {
    const pokemonWithMultipleTypes = {
      ...mockPokemonData,
      types: [
        { type: { name: 'electric' } },
        { type: { name: 'flying' } }
      ]
    };
    
    render(<PokemonCard data={pokemonWithMultipleTypes} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles pokemon with complex sprite structure', () => {
    const pokemonWithComplexSprites = {
      ...mockPokemonData,
      sprites: {
        front_default: null,
        other: {
          dream_world: {
            front_default: 'https://complex-sprite-url.com/pokemon.svg'
          },
          'official-artwork': {
            front_default: 'https://official-artwork.com/pokemon.png'
          }
        }
      }
    };
    
    render(<PokemonCard data={pokemonWithComplexSprites} />);
    
    const img = screen.getByAltText('Avatar');
    expect(img).toHaveAttribute('src', 'https://complex-sprite-url.com/pokemon.svg');
  });

  it('handles pokemon with malformed sprite data', () => {
    const pokemonWithMalformedSprites = {
      ...mockPokemonData,
      sprites: {
        invalid: 'data',
        other: 'not-an-object'
      }
    };
    
    render(<PokemonCard data={pokemonWithMalformedSprites} />);
    
    const img = screen.getByAltText('Avatar');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('handles pokemon with malformed types data', () => {
    const pokemonWithMalformedTypes = {
      ...mockPokemonData,
      types: [
        { invalid: 'type-data' },
        null,
        undefined
      ]
    };
    
    render(<PokemonCard data={pokemonWithMalformedTypes} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('handles click event with undefined onClick', () => {
    render(<PokemonCard data={mockPokemonData} />);
    
    const card = screen.getByRole('presentation');
    expect(() => fireEvent.click(card)).not.toThrow();
  });

  it('handles click event with null onClick', () => {
    render(<PokemonCard data={mockPokemonData} onClick={null} />);
    
    const card = screen.getByRole('presentation');
    expect(() => fireEvent.click(card)).not.toThrow();
  });

  it('renders with empty className', () => {
    render(<PokemonCard data={mockPokemonData} className="" />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('card');
  });

  it('renders with undefined className', () => {
    render(<PokemonCard data={mockPokemonData} className={undefined} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('card');
  });

  it('renders with null className', () => {
    render(<PokemonCard data={mockPokemonData} className={null} />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('card');
  });

  it('renders with multiple class names', () => {
    render(<PokemonCard data={mockPokemonData} className="class1 class2 class3" />);
    
    const card = screen.getByRole('presentation');
    expect(card).toHaveClass('class1', 'class2', 'class3', 'card');
  });

  it('handles pokemon with all null properties', () => {
    const pokemonWithAllNull = {
      id: null,
      name: null,
      sprites: null,
      types: null
    };
    
    render(<PokemonCard data={pokemonWithAllNull} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  it('handles pokemon with all undefined properties', () => {
    const pokemonWithAllUndefined = {
      id: undefined,
      name: undefined,
      sprites: undefined,
      types: undefined
    };
    
    render(<PokemonCard data={pokemonWithAllUndefined} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  it('handles pokemon with mixed valid and invalid properties', () => {
    const pokemonWithMixedProperties = {
      id: 25,
      name: null,
      sprites: {
        front_default: 'https://valid-sprite.png',
        other: null
      },
      types: []
    };
    
    render(<PokemonCard data={pokemonWithMixedProperties} />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });
});
