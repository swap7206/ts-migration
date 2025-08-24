import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFilter from './filter';

// Mock the PokemonContext
const mockContext = {
  state: {
    allPokemonsList: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ],
    pokemonsTypes: [
      { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }
    ],
    pokemonGenderList: [
      { name: 'male', url: 'https://pokeapi.co/api/v2/gender/1/' },
      { name: 'female', url: 'https://pokeapi.co/api/v2/gender/2/' }
    ]
  },
  getPokemonData: jest.fn(),
  dispatch: jest.fn(),
  setAppLoading: jest.fn(),
  getPokemonDetailsListByUrl: jest.fn()
};

// Mock the context before importing the component
jest.mock('../../context/pokemonContext/pokmon.context', () => ({
  __esModule: true,
  default: {
    Consumer: ({ children }) => children(mockContext),
    Provider: ({ children }) => children,
    _currentValue: mockContext
  }
}));

// Mock child components
jest.mock('./search/search.filter', () => {
  return function MockSearchFilter({ onSearchChange }) {
    return (
      <div data-testid="search-filter">
        <input 
          data-testid="search-input" 
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search..."
        />
      </div>
    );
  };
});

jest.mock('./multiSelectdropDown/multiSelectdropDown', () => {
  return function MockMultiSelectDropDown({ 
    data, 
    label, 
    onSelectionChange, 
    isOpen, 
    onToggle 
  }) {
    return (
      <div data-testid={`multi-select-${label}`}>
        <button onClick={onToggle}>{label}</button>
        {isOpen && (
          <div data-testid={`dropdown-${label}`}>
            {data?.map((item, index) => (
              <div 
                key={index} 
                onClick={() => onSelectionChange && onSelectionChange(item)}
                data-testid={`option-${label}-${index}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
});

// Mock CSS imports
jest.mock('./filter.scss', () => ({}));

describe('AppFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter components', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<AppFilter />);
    
    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
  });

  it('calls onSearchChange when search input changes', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'bulbasaur' } });
    
    // The search change should trigger the filter enable callback
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles empty type data', () => {
    const emptyTypeContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsTypes: []
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }) => children(emptyTypeContext),
        Provider: ({ children }) => children,
        _currentValue: emptyTypeContext
      }
    }));

    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
  });

  it('handles empty gender data', () => {
    const emptyGenderContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonGenderList: []
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }) => children(emptyGenderContext),
        Provider: ({ children }) => children,
        _currentValue: emptyGenderContext
      }
    }));

    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('handles undefined callback functions', () => {
    render(<AppFilter />);
    
    // Should render without crashing even with undefined callback
    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
  });

  it('handles search input with special characters', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'pikachu@#$%' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles search input with numbers', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'pokemon123' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles search input with empty string', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles search input with whitespace', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '   ' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles multiple rapid search changes', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    
    fireEvent.change(searchInput, { target: { value: 'a' } });
    fireEvent.change(searchInput, { target: { value: 'ab' } });
    fireEvent.change(searchInput, { target: { value: 'abc' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles large type data arrays', () => {
    const largeTypeContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsTypes: Array.from({ length: 100 }, (_, i) => ({
          name: `type-${i}`,
          url: `https://pokeapi.co/api/v2/type/${i}/`
        }))
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }) => children(largeTypeContext),
        Provider: ({ children }) => children,
        _currentValue: largeTypeContext
      }
    }));

    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
  });

  it('handles large gender data arrays', () => {
    const largeGenderContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonGenderList: Array.from({ length: 50 }, (_, i) => ({
          name: `gender-${i}`,
          url: `https://pokeapi.co/api/v2/gender/${i}/`
        }))
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }) => children(largeGenderContext),
        Provider: ({ children }) => children,
        _currentValue: largeGenderContext
      }
    }));

    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('handles type data with special characters in labels', () => {
    const specialTypeContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsTypes: [
          { name: 'fire/flying', url: 'https://pokeapi.co/api/v2/type/10/' },
          { name: 'ice@water', url: 'https://pokeapi.co/api/v2/type/11/' }
        ]
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }) => children(specialTypeContext),
        Provider: ({ children }) => children,
        _currentValue: specialTypeContext
      }
    }));

    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
  });

  it('handles gender data with special characters in labels', () => {
    const specialGenderContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonGenderList: [
          { name: 'male/female', url: 'https://pokeapi.co/api/v2/gender/1/' },
          { name: 'unknown@gender', url: 'https://pokeapi.co/api/v2/gender/2/' }
        ]
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }) => children(specialGenderContext),
        Provider: ({ children }) => children,
        _currentValue: specialGenderContext
      }
    }));

    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });
});
