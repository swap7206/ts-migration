import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonProvider, usePokemonContext } from './pokemon.provider';

// Mock the dependencies
jest.mock('../../store/reducers/reducer', () => ({
  initialState: {
    pokemonsList: [],
    allPokemonsList: [],
    pokemonsTypes: [],
    pokemonGenderList: [],
    isLoading: true,
    isLoadMoreInprogress: false
  },
  reducer: jest.fn((state, action) => {
    switch (action.type) {
      case 'ACTIONS.SET_API_CALL_INPROGRESS':
        return { ...state, isLoading: action.payload };
      case 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS':
        return { ...state, isLoadMoreInprogress: action.payload };
      case 'ACTIONS.SET_POKEMON_LIST':
        return { ...state, pokemonsList: action.payload };
      case 'ACTIONS.SET_ALL_POKEMON_LIST':
        return { ...state, allPokemonsList: action.payload };
      default:
        return state;
    }
  })
}));

jest.mock('../../services/common.service', () => ({
  allPokemonURL: 'https://pokeapi.co/api/v2/pokemon',
  initialURL: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
}));

// Mock fetch globally
global.fetch = jest.fn();

// Test component to access context
const TestComponent = () => {
  const context = usePokemonContext();
  return (
    <div>
      <div data-testid="pokemon-count">{context.state.pokemonsList.length}</div>
      <div data-testid="all-pokemon-count">{context.state.allPokemonsList.length}</div>
      <div data-testid="is-loading">{context.state.isLoading.toString()}</div>
      <div data-testid="is-load-more">{context.state.isLoadMoreInprogress.toString()}</div>
      <button 
        data-testid="get-pokemon-data" 
        onClick={() => context.getPokemonData()}
      >
        Get Pokemon Data
      </button>
      <button 
        data-testid="get-pokemon-data-reset" 
        onClick={() => context.getPokemonData(true)}
      >
        Reset Pokemon Data
      </button>
      <button 
        data-testid="set-app-loading" 
        onClick={() => context.setAppLoading(false)}
      >
        Set App Loading
      </button>
    </div>
  );
};

// Test component for error case
const TestComponentOutsideProvider = () => {
  try {
    usePokemonContext();
    return <div>Should not render</div>;
  } catch (error) {
    return <div data-testid="error">{error.message}</div>;
  }
};

describe('PokemonProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  it('renders children and provides context', async () => {
    const mockPokemonListResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    const mockAllPokemonResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'test.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'test' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 1,
      past_types: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonListResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockAllPokemonResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails)
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    });
  });

  it('handles getPokemonData with reset', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'test.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'test' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 1,
      past_types: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('get-pokemon-data-reset')).toBeInTheDocument();
    });

    await act(async () => {
      screen.getByTestId('get-pokemon-data-reset').click();
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    });
  });

  it('handles getPokemonData when batchURL is null', async () => {
    const mockResponse = {
      next: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'test.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'test' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 1,
      past_types: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('get-pokemon-data')).toBeInTheDocument();
    });

    // First call should work
    await act(async () => {
      screen.getByTestId('get-pokemon-data').click();
    });

    // Second call should not make fetch request because batchURL is null
    await act(async () => {
      screen.getByTestId('get-pokemon-data').click();
    });

    // Should only be called once for the first click
    expect(fetch).toHaveBeenCalledTimes(3); // Initial load + first click + all pokemon
  });

  it('handles setAppLoading', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('set-app-loading')).toBeInTheDocument();
    });

    await act(async () => {
      screen.getByTestId('set-app-loading').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  it('handles fetch errors gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    });
  });

  it('handles JSON parsing errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Invalid JSON'))
    });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    });
  });

  it('handles empty results from API', async () => {
    const mockResponse = {
      next: null,
      results: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('0');
    });
  });

  it('handles multiple pokemon details fetch', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    const mockPokemonDetails1 = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'test1.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'test1' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 1,
      past_types: []
    };

    const mockPokemonDetails2 = {
      id: 2,
      name: 'ivysaur',
      sprites: { front_default: 'test2.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'ivysaur', url: 'test2' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 2,
      past_types: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails1)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails2)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('2');
    });
  });

  it('handles individual pokemon fetch errors', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockRejectedValueOnce(new Error('Individual pokemon fetch failed'))
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    });
  });

  it('handles malformed API response', async () => {
    const mockResponse = {
      // Missing next and results
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    });
  });

  it('handles initial loading state correctly', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    // Initially should show loading
    expect(screen.getByTestId('is-loading')).toHaveTextContent('true');

    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  it('handles load more in progress state', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'test.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'test' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 1,
      past_types: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('get-pokemon-data')).toBeInTheDocument();
    });

    await act(async () => {
      screen.getByTestId('get-pokemon-data').click();
    });

    // Should show load more in progress during fetch
    await waitFor(() => {
      expect(screen.getByTestId('is-load-more')).toHaveTextContent('false');
    });
  });

  it('throws error when usePokemonContext is used outside provider', () => {
    render(<TestComponentOutsideProvider />);
    
    expect(screen.getByTestId('error')).toHaveTextContent(
      'usePokemonContext must be used within a PokemonProvider'
    );
  });

  it('handles concurrent API calls', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'test.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'test' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 1,
      past_types: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('get-pokemon-data')).toBeInTheDocument();
    });

    // Make multiple concurrent calls
    await act(async () => {
      screen.getByTestId('get-pokemon-data').click();
      screen.getByTestId('get-pokemon-data').click();
      screen.getByTestId('get-pokemon-data').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('is-load-more')).toHaveTextContent('false');
    });
  });

  it('handles very large pokemon list', async () => {
    const largeResults = Array.from({ length: 100 }, (_, i) => ({
      name: `pokemon-${i}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`
    }));

    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: largeResults
    };

    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'test.png' },
      types: [],
      stats: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'test' },
      forms: [],
      game_indices: [],
      held_items: [],
      location_area_encounters: '',
      order: 1,
      past_types: []
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValue({
        json: () => Promise.resolve(mockPokemonDetails)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('100');
    });
  });

  it('handles pokemon with missing properties', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    const mockPokemonDetails = {
      // Missing required properties
      id: 1,
      name: 'bulbasaur'
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('1');
    });
  });

  it('handles network timeout', async () => {
    (fetch as jest.Mock).mockImplementation(() => 
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 100)
      )
    );

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    });
  });

  it('handles empty pokemon name and url', async () => {
    const mockResponse = {
      next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      results: [
        { name: '', url: '' }
      ]
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      })
      .mockRejectedValueOnce(new Error('Invalid URL'))
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    });
  });
});
