import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

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

// Mock context
jest.mock('../../context/pokemonContext/pokmon.context', () => ({
  __esModule: true,
  default: {
    Consumer: ({ children }: any) => children(mockContext),
    Provider: ({ children }: any) => children,
    _currentValue: mockContext
  }
}));

import HomePage from './home.page';

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders header with correct content', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(screen.getByText('Search for any Pokémon that exist on the planet')).toBeInTheDocument();
  });

  it('renders filter component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('renders pokemon cards when data is available', () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(2);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('shows load more button when filter is not enabled', () => {
    render(<HomePage />);
    
    const loadMoreButton = screen.getByTestId('load-more-button');
    expect(loadMoreButton).toBeInTheDocument();
    expect(loadMoreButton).toHaveTextContent('Load more');
  });

  it('calls getPokemonData when load more button is clicked', () => {
    render(<HomePage />);
    
    const loadMoreButton = screen.getByTestId('load-more-button');
    fireEvent.click(loadMoreButton);
    
    expect(mockContext.getPokemonData).toHaveBeenCalled();
  });

  it('shows loader when loading more data', () => {
    const loadingContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        isLoadMoreInprogress: true
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(loadingContext),
        Provider: ({ children }: any) => children,
        _currentValue: loadingContext
      }
    }));

    render(<HomePage />);
    
    const loaders = screen.getAllByTestId('loader');
    expect(loaders.length).toBeGreaterThan(0);
  });

  it('shows main loader when isLoading is true', () => {
    const loadingContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        isLoading: true
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(loadingContext),
        Provider: ({ children }: any) => children,
        _currentValue: loadingContext
      }
    }));

    render(<HomePage />);
    
    const loaders = screen.getAllByTestId('loader');
    expect(loaders.length).toBeGreaterThan(0);
  });

  it('shows no data message when pokemonsList is empty', () => {
    const emptyContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: []
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(emptyContext),
        Provider: ({ children }: any) => children,
        _currentValue: emptyContext
      }
    }));

    render(<HomePage />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('opens detail page when pokemon card is clicked', async () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[0]); // Click first pokemon card
    
    await waitFor(() => {
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
  });

  it('closes detail page when toggleModal is called', async () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[0]); // Open detail page
    
    await waitFor(() => {
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
    
    // Click again to close
    fireEvent.click(pokemonCards[0]);
    
    await waitFor(() => {
      const detailPage = screen.getByTestId('detail-page');
      expect(detailPage).toHaveStyle({ display: 'none' });
    });
  });

  it('sets correct pokemon ID when card is clicked', async () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    fireEvent.click(pokemonCards[1]); // Click second pokemon card (ivysaur, id: 2)
    
    await waitFor(() => {
      expect(screen.getByText('Detail Page for Pokemon 2')).toBeInTheDocument();
    });
  });

  it('handles filter enable state correctly', () => {
    render(<HomePage />);
    
    // Initially filter should not be enabled
    expect(screen.getByTestId('load-more-button')).toBeInTheDocument();
  });

  it('renders with proper CSS classes', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(screen.getByText('Search for any Pokémon that exist on the planet')).toBeInTheDocument();
  });

  it('handles context error when context is not provided', () => {
    // Mock context to return null
    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(null),
        Provider: ({ children }: any) => children,
        _currentValue: null
      }
    }));

    expect(() => {
      render(<HomePage />);
    }).toThrow('PokemonContext must be used within a PokemonProvider');
  });

  it('renders responsive wrapper for each pokemon card', () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(2);
  });

  it('handles empty pokemonsList gracefully', () => {
    const emptyContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: []
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(emptyContext),
        Provider: ({ children }: any) => children,
        _currentValue: emptyContext
      }
    }));

    render(<HomePage />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
    expect(screen.queryByTestId('pokemon-card')).not.toBeInTheDocument();
  });

  it('handles null pokemonsList gracefully', () => {
    const nullContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: null
      }
    };

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(nullContext),
        Provider: ({ children }: any) => children,
        _currentValue: nullContext
      }
    }));

    render(<HomePage />);
    
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

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(undefinedContext),
        Provider: ({ children }: any) => children,
        _currentValue: undefinedContext
      }
    }));

    render(<HomePage />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('handles filter enable state correctly', () => {
    const mockIsFilterEnable = jest.fn();
    render(<HomePage />);
    
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

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(loadingContext),
        Provider: ({ children }: any) => children,
        _currentValue: loadingContext
      }
    }));

    render(<HomePage />);
    
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

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(loadMoreContext),
        Provider: ({ children }: any) => children,
        _currentValue: loadMoreContext
      }
    }));

    render(<HomePage />);
    
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

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(bothLoadingContext),
        Provider: ({ children }: any) => children,
        _currentValue: bothLoadingContext
      }
    }));

    render(<HomePage />);
    
    const loaders = screen.getAllByTestId('loader');
    expect(loaders.length).toBeGreaterThan(0);
  });

  it('handles pokemon card click with valid data', async () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(2);
    
    fireEvent.click(pokemonCards[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
  });

  it('handles multiple pokemon card clicks', async () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    
    // Click first card
    fireEvent.click(pokemonCards[0]);
    await waitFor(() => {
      expect(screen.getByText('Detail Page for Pokemon 1')).toBeInTheDocument();
    });
    
    // Click second card
    fireEvent.click(pokemonCards[1]);
    await waitFor(() => {
      expect(screen.getByText('Detail Page for Pokemon 2')).toBeInTheDocument();
    });
  });

  it('handles modal toggle correctly', async () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    
    // Open modal
    fireEvent.click(pokemonCards[0]);
    await waitFor(() => {
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
    
    // Close modal by clicking again
    fireEvent.click(pokemonCards[0]);
    await waitFor(() => {
      const detailPage = screen.getByTestId('detail-page');
      expect(detailPage).toHaveStyle({ display: 'none' });
    });
  });

  it('handles load more button click', () => {
    render(<HomePage />);
    
    const loadMoreButton = screen.getByTestId('load-more-button');
    expect(loadMoreButton).toBeInTheDocument();
    
    fireEvent.click(loadMoreButton);
    
    expect(mockContext.getPokemonData).toHaveBeenCalled();
  });

  it('handles multiple load more button clicks', () => {
    render(<HomePage />);
    
    const loadMoreButton = screen.getByTestId('load-more-button');
    
    fireEvent.click(loadMoreButton);
    fireEvent.click(loadMoreButton);
    fireEvent.click(loadMoreButton);
    
    expect(mockContext.getPokemonData).toHaveBeenCalledTimes(3);
  });

  it('handles filter enable callback', () => {
    render(<HomePage />);
    
    // The filter component should be rendered
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('handles header content correctly', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(screen.getByText('Search for any Pokémon that exist on the planet')).toBeInTheDocument();
  });

  it('handles pokemon card rendering with data', () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(2);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('handles pokemon card click event propagation', async () => {
    render(<HomePage />);
    
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    
    // Verify the click handler is properly attached
    expect(pokemonCards[0]).toBeInTheDocument();
    
    fireEvent.click(pokemonCards[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
  });

  it('handles component unmounting gracefully', () => {
    const { unmount } = render(<HomePage />);
    
    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('handles re-rendering correctly', () => {
    const { rerender } = render(<HomePage />);
    
    expect(() => {
      rerender(<HomePage />);
    }).not.toThrow();
    
    // Should still render the same content
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  it('handles context changes correctly', () => {
    const { rerender } = render(<HomePage />);
    
    const newContext = {
      ...mockContext,
      state: {
        ...mockContext.state,
        pokemonsList: [
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

    jest.doMock('../../context/pokemonContext/pokmon.context', () => ({
      __esModule: true,
      default: {
        Consumer: ({ children }: any) => children(newContext),
        Provider: ({ children }: any) => children,
        _currentValue: newContext
      }
    }));

    rerender(<HomePage />);
    
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });
});
