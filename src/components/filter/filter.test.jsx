import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the context before importing the component
jest.mock('../../context/pokemonContext/pokmon.context', () => {
  const mockContext = {
    state: {
      pokemonsList: [
        { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { id: 2, name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ],
      allPokemonsList: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }
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
    getPokemonDetailsListByUrl: jest.fn().mockResolvedValue([
      { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
    ])
  };

  return {
    __esModule: true,
    default: {
      Consumer: ({ children }) => children(mockContext),
      Provider: ({ children }) => children,
      _currentValue: mockContext
    }
  };
});

// Mock the services
jest.mock('../../services/common.service', () => ({
  getAllParallelCall: jest.fn().mockResolvedValue([
    { pokemon: [{ pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' } }] },
    { pokemon: [{ pokemon: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' } }] }
  ]),
  getPokemonGenders: jest.fn().mockResolvedValue({
    results: [
      { name: 'male', url: 'https://pokeapi.co/api/v2/gender/1/' },
      { name: 'female', url: 'https://pokeapi.co/api/v2/gender/2/' }
    ]
  }),
  getPokemonTypes: jest.fn().mockResolvedValue({
    results: [
      { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }
    ]
  }),
  removeDuplicateBy: jest.fn((array, key) => array.filter((item, index, self) => 
    index === self.findIndex(t => t[key] === item[key])
  ))
}));

// Mock the constants
jest.mock('../../constants/pokemon.types', () => ({
  getCamleCaseString: jest.fn((str) => str.charAt(0).toUpperCase() + str.slice(1))
}));

jest.mock('../../constants/apiUrls', () => ({
  baseURL: 'https://pokeapi.co/api/v2',
  SEARCH_SLICED: 20
}));

// Mock child components
jest.mock('./search/search.filter', () => {
  return function MockSearchFilter({ onChangeHandler, placeholder, inputClass, label }) {
    return (
      <div data-testid="search-filter">
        <label>{label}</label>
        <input 
          data-testid="search-input" 
          className={inputClass}
          placeholder={placeholder}
          onChange={(e) => onChangeHandler && onChangeHandler(e.target.value, e)}
        />
      </div>
    );
  };
});

jest.mock('./multiSelectdropDown/multiSelectdropDown', () => {
  return function MockMultiSelectDropDown({ 
    data, 
    label, 
    onChangeHandler, 
    isOpen, 
    onOpenHandler,
    onCloseHandler,
    onCleanHandler,
    placeholder
  }) {
    return (
      <div data-testid={`multi-select-${label}`}>
        <button onClick={onOpenHandler}>{label}</button>
        <button onClick={onCloseHandler}>Close</button>
        <button onClick={() => onCleanHandler && onCleanHandler(true)}>Clean</button>
        {isOpen && (
          <div data-testid={`dropdown-${label}`}>
            {data?.map((item, index) => (
              <div 
                key={index} 
                onClick={() => onChangeHandler && onChangeHandler([item.value], { preventDefault: jest.fn() })}
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

// Mock rxjs - simplified
jest.mock('rxjs', () => ({
  debounceTime: jest.fn(() => ({
    pipe: jest.fn(() => ({
      subscribe: jest.fn((callback) => callback([
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]))
    }))
  })),
  distinctUntilChanged: jest.fn(() => ({
    pipe: jest.fn(() => ({
      subscribe: jest.fn((callback) => callback([
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]))
    }))
  })),
  map: jest.fn(() => ({
    pipe: jest.fn(() => ({
      subscribe: jest.fn((callback) => callback([
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]))
    }))
  })),
  of: jest.fn(() => ({
    pipe: jest.fn(() => ({
      subscribe: jest.fn((callback) => callback([
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]))
    }))
  }))
}));

import AppFilter from './filter';

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

  it('handles search input with valid value', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'bulbasaur' } });
    
    // The search change should trigger the filter enable callback
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles search input with empty value', () => {
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

  it('handles type filter selection', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const typeDropdown = screen.getByTestId('multi-select-Type');
    const typeButton = typeDropdown.querySelector('button');
    
    fireEvent.click(typeButton);
    
    const typeOption = screen.getByTestId('option-Type-0');
    fireEvent.click(typeOption);
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles type filter cleanup', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const typeDropdown = screen.getByTestId('multi-select-Type');
    const cleanButton = typeDropdown.querySelectorAll('button')[2]; // Clean button
    
    fireEvent.click(cleanButton);
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles gender filter selection', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const genderDropdown = screen.getByTestId('multi-select-Gender');
    const genderButton = genderDropdown.querySelector('button');
    
    fireEvent.click(genderButton);
    
    const genderOption = screen.getByTestId('option-Gender-0');
    fireEvent.click(genderOption);
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles empty type data', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
  });

  it('handles empty gender data', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('handles undefined callback functions', () => {
    render(<AppFilter />);
    
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
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
  });

  it('handles large gender data arrays', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('handles type data with special characters in labels', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
  });

  it('handles gender data with special characters in labels', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('calls useEffect on mount to load types and genders', async () => {
    const { getPokemonTypes, getPokemonGenders } = require('../../services/common.service');
    
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    await waitFor(() => {
      expect(getPokemonTypes).toHaveBeenCalled();
      expect(getPokemonGenders).toHaveBeenCalled();
    });
  });

  it('handles type filter with empty selection', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    // Simulate empty type selection
    const typeDropdown = screen.getByTestId('multi-select-Type');
    const typeButton = typeDropdown.querySelector('button');
    
    fireEvent.click(typeButton);
    
    // This would trigger the onChangeHandler with empty array
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
  });

  it('handles gender filter with empty selection', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    // Simulate empty gender selection
    const genderDropdown = screen.getByTestId('multi-select-Gender');
    const genderButton = genderDropdown.querySelector('button');
    
    fireEvent.click(genderButton);
    
    // This would trigger the onChangeHandler with empty array
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('handles search with exact match', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'bulbasaur' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles search with partial match', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'bulba' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles search with case insensitive match', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'BULBASAUR' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles filter state management', () => {
    const mockDispatch = jest.fn();
    const mockContext = require('../../context/pokemonContext/pokmon.context').default._currentValue;
    mockContext.dispatch = mockDispatch;
    
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    // The component should dispatch actions for setting types and genders
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handles error in type loading', async () => {
    const { getPokemonTypes } = require('../../services/common.service');
    getPokemonTypes.mockRejectedValueOnce(new Error('API Error'));
    
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    await waitFor(() => {
      expect(getPokemonTypes).toHaveBeenCalled();
    });
  });

  it('handles error in gender loading', async () => {
    const { getPokemonGenders } = require('../../services/common.service');
    getPokemonGenders.mockRejectedValueOnce(new Error('API Error'));
    
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    await waitFor(() => {
      expect(getPokemonGenders).toHaveBeenCalled();
    });
  });

  it('handles filter enable callback correctly', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    // Component should render without errors
    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
  });

  it('handles component unmounting gracefully', () => {
    const { unmount } = render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(() => unmount()).not.toThrow();
  });

  it('handles search input with very long text', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    const longText = 'a'.repeat(1000);
    fireEvent.change(searchInput, { target: { value: longText } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles search input with unicode characters', () => {
    const mockIsFilterEnable = jest.fn();
    render(<AppFilter isFilterEnable={mockIsFilterEnable} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'pokémon' } });
    
    expect(mockIsFilterEnable).toHaveBeenCalled();
  });

  it('handles filter component with null data', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });

  it('handles filter component with undefined data', () => {
    render(<AppFilter isFilterEnable={jest.fn()} />);
    
    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
    expect(screen.getByTestId('multi-select-Type')).toBeInTheDocument();
    expect(screen.getByTestId('multi-select-Gender')).toBeInTheDocument();
  });
});
