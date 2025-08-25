import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonContext from '../../context/pokemonContext/pokmon.context';

// Define mock context before using it in jest.mock
const mockContext = {
  state: {
    pokemonsList: [
      {
        id: 1,
        name: 'bulbasaur',
        base_experience: 64,
        height: 7,
        weight: 69,
        sprites: {
          front_default: 'https://example.com/bulbasaur.png',
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null,
          other: {
            dream_world: { front_default: null, front_female: null },
            home: { front_default: null, front_female: null, front_shiny: null, front_shiny_female: null },
            'official-artwork': { front_default: null, front_shiny: null }
          }
        },
        types: [],
        stats: [],
        abilities: [],
        moves: [],
        species: { name: 'bulbasaur', url: 'https://example.com/species/1' },
        forms: [],
        game_indices: [],
        held_items: [],
        location_area_encounters: '',
        order: 1,
        past_types: []
      },
      {
        id: 2,
        name: 'ivysaur',
        base_experience: 142,
        height: 10,
        weight: 130,
        sprites: {
          front_default: 'https://example.com/ivysaur.png',
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null,
          other: {
            dream_world: { front_default: null, front_female: null },
            home: { front_default: null, front_female: null, front_shiny: null, front_shiny_female: null },
            'official-artwork': { front_default: null, front_shiny: null }
          }
        },
        types: [],
        stats: [],
        abilities: [],
        moves: [],
        species: { name: 'ivysaur', url: 'https://example.com/species/2' },
        forms: [],
        game_indices: [],
        held_items: [],
        location_area_encounters: '',
        order: 2,
        past_types: []
      }
    ],
    isLoading: false,
    isLoadMoreInprogress: false
  },
  getPokemonData: jest.fn()
};

// Create a test wrapper component
const TestWrapper = ({ contextValue, children }: { contextValue: any; children: React.ReactNode }) => {
  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

// Mock all dependencies
jest.mock('../../components/header/header', () => {
  return function MockHeader({ children, className }: any) {
    return <div data-testid="header" className={className}>{children}</div>;
  };
});

jest.mock('../../components/pokemonCard/pokemonCard', () => {
  return function MockPokemonCard({ data, onClick }: any) {
    return (
      <div data-testid="pokemon-card" onClick={onClick}>
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
  return function MockFilter({ isFilterEnable }: any) {
    return <div data-testid="filter">Filter Component</div>;
  };
});

jest.mock('../details/details.page', () => {
  return function MockDetailPage({ isCardSelected, toggleModal, pokemonId }: any) {
    return (
      <div data-testid="detail-page" style={{ display: isCardSelected ? 'block' : 'none' }}>
        Detail Page for Pokemon {pokemonId}
      </div>
    );
  };
});

// Mock RSuite components
jest.mock('rsuite', () => ({
  Button: ({ children, onClick, appearance }: any) => (
    <button data-testid="load-more-button" onClick={onClick} className={appearance}>
      {children}
    </button>
  ),
  Row: ({ children, ...props }: any) => <div data-testid="row" {...props}>{children}</div>,
  Col: ({ children, ...props }: any) => <div data-testid="col" {...props}>{children}</div>,
}));

// Mock CSS imports
jest.mock('./home.scss', () => ({}));
jest.mock('../../styles/common.scss', () => ({}));

import HomePage from './home.page';

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  it('renders pokemon cards when data is available', () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('renders load more button when data is available', () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('load-more-button')).toBeInTheDocument();
  });

  it('handles null pokemonsList gracefully', () => {
    const nullContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: null
      }
    };

    render(
      <TestWrapper contextValue={nullContext}>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('handles undefined pokemonsList gracefully', () => {
    const undefinedContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: undefined
      }
    };

    render(
      <TestWrapper contextValue={undefinedContext}>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('handles filter enable state correctly', () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    // Initially filter should not be enabled
    expect(screen.getByTestId('load-more-button')).toBeInTheDocument();
  });

  it('handles loading state correctly', () => {
    const loadingContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        isLoading: true,
        isLoadMoreInprogress: false
      }
    };

    render(
      <TestWrapper contextValue={loadingContext}>
        <HomePage />
      </TestWrapper>
    );
    
    const loaders = screen.getAllByTestId('loader');
    expect(loaders.length).toBeGreaterThan(0);
  });

  it('handles load more in progress state', () => {
    const loadMoreContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        isLoading: false,
        isLoadMoreInprogress: true
      }
    };

    render(
      <TestWrapper contextValue={loadMoreContext}>
        <HomePage />
      </TestWrapper>
    );
    
    const loaders = screen.getAllByTestId('loader');
    expect(loaders.length).toBeGreaterThan(0);
  });

  it('handles both loading states simultaneously', () => {
    const bothLoadingContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        isLoading: true,
        isLoadMoreInprogress: true
      }
    };

    render(
      <TestWrapper contextValue={bothLoadingContext}>
        <HomePage />
      </TestWrapper>
    );
    
    const loaders = screen.getAllByTestId('loader');
    expect(loaders.length).toBeGreaterThan(0);
  });

  it('handles pokemon card click', async () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Detail Page for Pokemon 1')).toBeInTheDocument();
    });
  });

  it('handles multiple pokemon card clicks', async () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    
    // Click first card to open modal
    fireEvent.click(pokemonCards[0]);
    await waitFor(() => {
      // Check that the detail page component is rendered
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
    
    // Click second card - this should close the modal (toggle behavior)
    fireEvent.click(pokemonCards[1]);
    await waitFor(() => {
      // Check that the detail page component is no longer rendered (modal closed)
      expect(screen.queryByTestId('detail-page')).not.toBeInTheDocument();
    });
  });

  it('handles modal toggle correctly', async () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    
    // Open modal
    fireEvent.click(pokemonCards[0]);
    await waitFor(() => {
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
    
    // Close modal by clicking again
    fireEvent.click(pokemonCards[0]);
    await waitFor(() => {
      // The modal should be closed (Detail Page Component should not be visible)
      expect(screen.queryByTestId('detail-page')).not.toBeInTheDocument();
    });
  });

  it('handles load more button click', () => {
    const mockGetPokemonData = jest.fn();
    const contextWithMock = {
      ...mockContext,
      getPokemonData: mockGetPokemonData
    };

    render(
      <TestWrapper contextValue={contextWithMock}>
        <HomePage />
      </TestWrapper>
    );
    
    const loadMoreButton = screen.getByTestId('load-more-button');
    fireEvent.click(loadMoreButton);
    
    expect(mockGetPokemonData).toHaveBeenCalled();
  });

  it('handles multiple load more button clicks', () => {
    const mockGetPokemonData = jest.fn();
    const contextWithMock = {
      ...mockContext,
      getPokemonData: mockGetPokemonData
    };

    render(
      <TestWrapper contextValue={contextWithMock}>
        <HomePage />
      </TestWrapper>
    );
    
    const loadMoreButton = screen.getByTestId('load-more-button');
    
    fireEvent.click(loadMoreButton);
    fireEvent.click(loadMoreButton);
    fireEvent.click(loadMoreButton);
    
    expect(mockGetPokemonData).toHaveBeenCalledTimes(3);
  });

  it('handles filter enable callback', () => {
    render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('handles context changes correctly', () => {
    const { rerender } = render(
      <TestWrapper contextValue={mockContext}>
        <HomePage />
      </TestWrapper>
    );
    
    // Change context to include venusaur
    const newContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: [
          ...mockContext.state.pokemonsList,
          {
            id: 3,
            name: 'venusaur',
            base_experience: 236,
            height: 20,
            weight: 1000,
            sprites: {
              front_default: 'https://example.com/venusaur.png',
              front_shiny: null,
              front_female: null,
              front_shiny_female: null,
              back_default: null,
              back_shiny: null,
              back_female: null,
              back_shiny_female: null,
              other: {
                dream_world: { front_default: null, front_female: null },
                home: { front_default: null, front_female: null, front_shiny: null, front_shiny_female: null },
                'official-artwork': { front_default: null, front_shiny: null }
              }
            },
            types: [],
            stats: [],
            abilities: [],
            moves: [],
            species: { name: 'venusaur', url: 'https://example.com/species/3' },
            forms: [],
            game_indices: [],
            held_items: [],
            location_area_encounters: '',
            order: 3,
            past_types: []
          }
        ]
      }
    };
    
    rerender(
      <TestWrapper contextValue={newContext}>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });
});
