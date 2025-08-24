import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

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
        {data?.name || 'Unknown Pokemon'}
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
    return (
      <div data-testid="filter">
        <button onClick={() => isFilterEnable?.(false)}>Filter Component</button>
      </div>
    );
  };
});

jest.mock('../details/details.page', () => {
  return function MockDetailPage({ isCardSelected, toggleModal, pokemonId }: any) {
    return isCardSelected ? (
      <div data-testid="detail-page">
        <div>Detail Page for Pokemon {pokemonId}</div>
        <button onClick={toggleModal}>Close</button>
      </div>
    ) : null;
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

// Mock React hooks for context
const mockUseContext = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockUseContext(),
  useState: jest.requireActual('react').useState,
  useMemo: jest.requireActual('react').useMemo,
}));

// Create a simple mock context
const mockContextValue = {
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

import HomePage from './home.page';

describe('HomePage - Basic Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContext.mockReturnValue(mockContextValue);
  });

  describe('Basic Rendering', () => {
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
  });

  describe('User Interactions', () => {
    it('calls getPokemonData when load more button is clicked', () => {
      render(<HomePage />);
      
      const loadMoreButton = screen.getByTestId('load-more-button');
      fireEvent.click(loadMoreButton);
      
      expect(mockContextValue.getPokemonData).toHaveBeenCalled();
    });

    it('opens detail page when pokemon card is clicked', () => {
      render(<HomePage />);
      
      const pokemonCards = screen.getAllByTestId('pokemon-card');
      fireEvent.click(pokemonCards[0]); // Click first pokemon card
      
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
      expect(screen.getByText('Detail Page for Pokemon 1')).toBeInTheDocument();
    });

    it('closes detail page when close button is clicked', () => {
      render(<HomePage />);
      
      const pokemonCards = screen.getAllByTestId('pokemon-card');
      fireEvent.click(pokemonCards[0]); // Open detail page
      
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
      
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton); // Close detail page
      
      expect(screen.queryByTestId('detail-page')).not.toBeInTheDocument();
    });

    it('sets correct pokemon ID when different cards are clicked', () => {
      render(<HomePage />);
      
      const pokemonCards = screen.getAllByTestId('pokemon-card');
      fireEvent.click(pokemonCards[1]); // Click second pokemon card (ivysaur, id: 2)
      
      expect(screen.getByText('Detail Page for Pokemon 2')).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('shows loader when loading more data', () => {
      const loadingContext = {
        ...mockContextValue,
        state: {
          ...mockContextValue.state,
          isLoadMoreInprogress: true
        }
      };
      
      mockUseContext.mockReturnValue(loadingContext);

      render(<HomePage />);
      
      const loaders = screen.getAllByTestId('loader');
      expect(loaders.length).toBeGreaterThan(0);
    });

    it('shows main loader when isLoading is true', () => {
      const loadingContext = {
        ...mockContextValue,
        state: {
          ...mockContextValue.state,
          isLoading: true
        }
      };
      
      mockUseContext.mockReturnValue(loadingContext);

      render(<HomePage />);
      
      const loaders = screen.getAllByTestId('loader');
      expect(loaders.length).toBeGreaterThan(0);
    });
  });

  describe('Empty States', () => {
    it('shows no data message when pokemonsList is empty', () => {
      const emptyContext = {
        ...mockContextValue,
        state: {
          ...mockContextValue.state,
          pokemonsList: []
        }
      };
      
      mockUseContext.mockReturnValue(emptyContext);

      render(<HomePage />);
      
      expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    it('shows no data message when pokemonsList is null', () => {
      const nullContext = {
        ...mockContextValue,
        state: {
          ...mockContextValue.state,
          pokemonsList: null
        }
      };
      
      mockUseContext.mockReturnValue(nullContext);

      render(<HomePage />);
      
      expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    it('shows no data message when pokemonsList is undefined', () => {
      const undefinedContext = {
        ...mockContextValue,
        state: {
          ...mockContextValue.state,
          pokemonsList: undefined
        }
      };
      
      mockUseContext.mockReturnValue(undefinedContext);

      render(<HomePage />);
      
      expect(screen.getByText('No data found')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('renders with proper CSS classes and structure', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Pokédex')).toBeInTheDocument();
      expect(screen.getByText('Search for any Pokémon that exist on the planet')).toBeInTheDocument();
      
      // Check that the component structure is correct
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('filter')).toBeInTheDocument();
    });

    it('renders responsive wrapper for each pokemon card', () => {
      render(<HomePage />);
      
      const pokemonCards = screen.getAllByTestId('pokemon-card');
      expect(pokemonCards).toHaveLength(2);
      
      // Each card should be wrapped in a responsive div
      pokemonCards.forEach(card => {
        expect(card.parentElement).toHaveClass('responsive');
      });
    });
  });

  describe('State Management', () => {
    it('toggles modal state correctly', () => {
      render(<HomePage />);
      
      // Initially no detail page should be visible
      expect(screen.queryByTestId('detail-page')).not.toBeInTheDocument();
      
      // Click a pokemon card to open detail page
      const pokemonCards = screen.getAllByTestId('pokemon-card');
      fireEvent.click(pokemonCards[0]);
      
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
      
      // Click close to hide detail page
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
      
      expect(screen.queryByTestId('detail-page')).not.toBeInTheDocument();
    });

    it('maintains state correctly when switching between pokemon', () => {
      render(<HomePage />);
      
      const pokemonCards = screen.getAllByTestId('pokemon-card');
      
      // Click first pokemon
      fireEvent.click(pokemonCards[0]);
      expect(screen.getByText('Detail Page for Pokemon 1')).toBeInTheDocument();
      
      // Close detail page
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
      
      // Click second pokemon
      fireEvent.click(pokemonCards[1]);
      expect(screen.getByText('Detail Page for Pokemon 2')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles context error gracefully', () => {
      // Mock context to return null to test error handling
      mockUseContext.mockReturnValue(null);

      expect(() => {
        render(<HomePage />);
      }).toThrow('PokemonContext must be used within a PokemonProvider');
    });
  });
});
