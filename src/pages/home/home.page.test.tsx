import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

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

// Mock the context
const mockContext = {
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
            type: {
              name: 'grass',
              url: 'https://pokeapi.co/api/v2/type/12/'
            }
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
            type: {
              name: 'grass',
              url: 'https://pokeapi.co/api/v2/type/12/'
            }
          }
        ]
      }
    ],
    isLoading: false,
    isLoadMoreInprogress: false
  },
  getPokemonData: jest.fn()
};

jest.mock('../../context/pokemonContext/pokmon.context', () => ({
  __esModule: true,
  default: {
    Provider: ({ children }: any) => children,
    Consumer: ({ children }: any) => children(mockContext)
  }
}));

import HomePage from './home.page';

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with title', () => {
    render(<HomePage />);
    
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('renders filter component', () => {
    render(<HomePage />);
    
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('renders pokemon cards when data is available', () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(2);
    expect(pokemonCards[0]).toHaveTextContent('bulbasaur');
    expect(pokemonCards[1]).toHaveTextContent('ivysaur');
  });

  it('renders loader when loading', () => {
    const loadingContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        isLoading: true
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: React.createContext(loadingContext)
    }));

    render(<HomePage />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders load more button when not loading', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  it('renders load more loader when loading more', () => {
    const loadMoreContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        isLoadMoreInprogress: true
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: React.createContext(loadMoreContext)
    }));

    render(<HomePage />);
    
    const loadMoreButton = screen.getByText('Load More');
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('calls getPokemonData when load more button is clicked', () => {
    render(<HomePage />);
    
    const loadMoreButton = screen.getByText('Load More');
    fireEvent.click(loadMoreButton);
    
    expect(mockContext.getPokemonData).toHaveBeenCalled();
  });

  it('renders detail page when pokemonId is set', () => {
    render(<HomePage />);
    
    // Click on a pokemon card to set pokemonId
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[0]);
    
    // Should render detail page
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
  });

  it('renders empty state when no pokemon data', () => {
    const emptyContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: []
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: React.createContext(emptyContext)
    }));

    render(<HomePage />);
    
    const pokemonCards = screen.queryAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(0);
  });

  it('handles pokemon card click', () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[0]);
    
    // The pokemonId should be set to 1 (bulbasaur's id)
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
  });

  it('renders with filter enabled', () => {
    render(<HomePage />);
    
    // Initially filter should be enabled
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('handles context error gracefully', () => {
    // Mock context that throws error
    const errorContext = {
      state: null,
      getPokemonData: null
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: React.createContext(errorContext)
    }));

    // Should not crash
    expect(() => render(<HomePage />)).not.toThrow();
  });
});
