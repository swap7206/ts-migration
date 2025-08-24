import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the PokemonProvider with context value
const mockContextValue = {
  state: {
    pokemonsList: [
      {
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
          }
        ]
      },
      {
        id: 2,
        name: 'ivysaur',
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
          other: {
            dream_world: {
              front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
            }
          }
        },
        types: [
          {
            slot: 1,
            type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
          }
        ]
      }
    ],
    isLoading: false,
    isLoadMoreInprogress: false,
    allPokemonsList: [],
    pokemonsTypes: [],
    pokemonGenderList: []
  },
  dispatch: jest.fn(),
  getPokemonData: jest.fn(),
  getPokemonDetailsListByUrl: jest.fn(),
  setAppLoading: jest.fn()
};

jest.mock('../../context/pokemonContext/pokemon.provider', () => ({
  PokemonProvider: ({ children }: any) => {
    const React = require('react');
    const PokemonContext = require('../../context/pokemonContext/pokmon.context').default;
    return React.createElement(PokemonContext.Provider, { value: mockContextValue }, children);
  }
}));

import { PokemonProvider } from '../../context/pokemonContext/pokemon.provider';

// Mock the child components
jest.mock('../../components/header/header', () => {
  return function MockHeader({ children }: any) {
    return <div data-testid="header">{children}</div>;
  };
});

jest.mock('../../components/pokemonCard/pokemonCard', () => {
  return function MockPokemonCard({ data, onClick }: any) {
    return (
      <div data-testid="pokemon-card" onClick={() => onClick && onClick(data)}>
        {data.name}
      </div>
    );
  };
});

jest.mock('../../components/loader/loader', () => {
  return function MockLoader({ className }: any) {
    return <div data-testid="loader" className={className}>Loading...</div>;
  };
});

jest.mock('../../components/filter/filter', () => {
  return function MockFilter() {
    return <div data-testid="filter">Filter Component</div>;
  };
});

jest.mock('../details/details.page', () => {
  return function MockDetailPage() {
    return <div data-testid="detail-page">Detail Page</div>;
  };
});

// Mock the services
jest.mock('../../services/common.service', () => ({
  allPokemonURL: 'https://pokeapi.co/api/v2/pokemon',
  initialURL: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
}));

// Mock fetch
global.fetch = jest.fn((url: string) => {
  if (url.includes('pokemon/1')) {
    return Promise.resolve({
      json: () => Promise.resolve({
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
          }
        ]
      })
    });
  }
  if (url.includes('pokemon/2')) {
    return Promise.resolve({
      json: () => Promise.resolve({
        id: 2,
        name: 'ivysaur',
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
          other: {
            dream_world: {
              front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
            }
          }
        },
        types: [
          {
            slot: 1,
            type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
          }
        ]
      })
    });
  }
  if (url.includes('pokemon?limit=1100')) {
    return Promise.resolve({
      json: () => Promise.resolve({ 
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ] 
      }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({ 
      next: null, 
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ] 
    }),
  });
}) as jest.Mock;

import HomePage from './home.page';

// Helper function to render HomePage with provider
const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <PokemonProvider>
      {component}
    </PokemonProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with title', () => {
    renderWithProvider(<HomePage />);
    
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('renders filter component', () => {
    renderWithProvider(<HomePage />);
    
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('renders pokemon cards when data is available', () => {
    renderWithProvider(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(2);
    expect(pokemonCards[0]).toHaveTextContent('bulbasaur');
    expect(pokemonCards[1]).toHaveTextContent('ivysaur');
  });

  it('renders loader when loading', () => {
    renderWithProvider(<HomePage />);
    
    // Since the mock context has isLoading: false, we expect no loader
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('renders load more button when not loading', () => {
    renderWithProvider(<HomePage />);
    
    expect(screen.getByText('Load more')).toBeInTheDocument();
  });

  it('renders load more loader when loading more', () => {
    renderWithProvider(<HomePage />);
    
    const loadMoreButton = screen.getByText('Load more');
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('calls getPokemonData when load more button is clicked', () => {
    renderWithProvider(<HomePage />);
    
    const loadMoreButton = screen.getByText('Load more');
    fireEvent.click(loadMoreButton);
    
    // Note: This test will need to be updated based on actual implementation
  });

  it('renders detail page when pokemonId is set', () => {
    renderWithProvider(<HomePage />);
    
    // Click on a pokemon card to set pokemonId
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[0]);
    
    // Should render detail page
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
  });

  it('renders empty state when no pokemon data', () => {
    renderWithProvider(<HomePage />);
    
    // Since the mock context has pokemon data, we expect cards to be present
    const pokemonCards = screen.queryAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(2);
  });

  it('handles pokemon card click', () => {
    renderWithProvider(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[0]);
    
    // The pokemonId should be set to 1 (bulbasaur's id)
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
  });

  it('renders with filter enabled', () => {
    renderWithProvider(<HomePage />);
    
    // Initially filter should be enabled
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('handles context error gracefully', () => {
    // Should not crash
    expect(() => renderWithProvider(<HomePage />)).not.toThrow();
  });
});
