import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonProvider, usePokemonContext } from './pokemon.provider';
import { PokemonContext } from './pokmon.context';

// Mock fetch globally
global.fetch = jest.fn();

// Mock the service functions
jest.mock('../../services/common.service', () => ({
  allPokemonURL: 'https://pokeapi.co/api/v2/pokemon?limit=100000',
  initialURL: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
}));

// Test component to access context
const TestComponent = () => {
  const { state, getPokemonData, setAppLoading } = usePokemonContext();
  
  return (
    <div>
      <div data-testid="loading">{state.isLoading.toString()}</div>
      <div data-testid="load-more-loading">{state.isLoadMoreInprogress.toString()}</div>
      <div data-testid="pokemon-count">{state.pokemonsList.length}</div>
      <div data-testid="all-pokemon-count">{state.allPokemonsList.length}</div>
      <button 
        data-testid="load-more" 
        onClick={() => getPokemonData()}
      >
        Load More
      </button>
      <button 
        data-testid="set-loading" 
        onClick={() => setAppLoading(false)}
      >
        Set Loading
      </button>
    </div>
  );
};

describe('PokemonProvider', () => {
  const mockPokemonList = [
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
      ],
      stats: [],
      abilities: [],
      moves: [],
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      forms: [],
      game_indices: []
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
      ],
      stats: [],
      abilities: [],
      moves: [],
      species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
      forms: [],
      game_indices: []
    }
  ];

  const mockAllPokemonList = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders children correctly', () => {
    render(
      <PokemonProvider>
        <div data-testid="test-child">Test Child</div>
      </PokemonProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('initializes with correct initial state', () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    expect(screen.getByTestId('load-more-loading')).toHaveTextContent('false');
    expect(screen.getByTestId('pokemon-count')).toHaveTextContent('0');
    expect(screen.getByTestId('all-pokemon-count')).toHaveTextContent('0');
  });

  it('loads initial pokemon data on mount', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[0])
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[1])
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: mockAllPokemonList
        })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('2');
    });

    await waitFor(() => {
      expect(screen.getByTestId('all-pokemon-count')).toHaveTextContent('3');
    });
  });

  it('handles load more functionality', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[0])
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: mockAllPokemonList
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=40',
          results: [
            { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[1])
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('1');
    });

    fireEvent.click(screen.getByTestId('load-more'));

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('2');
    });
  });

  it('handles setAppLoading function', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: null,
          results: []
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: []
        })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    fireEvent.click(screen.getByTestId('set-loading'));

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('handles API errors gracefully', async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: []
        })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('true');
    });
  });

  it('handles empty pokemon list response', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: null,
          results: []
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: []
        })
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

  it('handles null next URL in response', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: null,
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[0])
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: mockAllPokemonList
        })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('1');
    });

    // Try to load more when next URL is null
    fireEvent.click(screen.getByTestId('load-more'));

    // Should not make additional API calls
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it('handles reset functionality', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[0])
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: mockAllPokemonList
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
          results: [
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[1])
      });

    const TestComponentWithReset = () => {
      const { getPokemonData } = usePokemonContext();
      
      return (
        <div>
          <TestComponent />
          <button 
            data-testid="reset" 
            onClick={() => getPokemonData(true)}
          >
            Reset
          </button>
        </div>
      );
    };

    render(
      <PokemonProvider>
        <TestComponentWithReset />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('1');
    });

    fireEvent.click(screen.getByTestId('reset'));

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('2');
    });
  });

  it('handles individual pokemon fetch errors', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[0])
      })
      .mockRejectedValueOnce(new Error('Individual Pokemon Error'))
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: mockAllPokemonList
        })
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

  it('provides context value with all required functions', () => {
    let contextValue: any;
    
    const TestContextComponent = () => {
      const context = usePokemonContext();
      contextValue = context;
      return <div>Test</div>;
    };

    render(
      <PokemonProvider>
        <TestContextComponent />
      </PokemonProvider>
    );

    expect(contextValue).toHaveProperty('state');
    expect(contextValue).toHaveProperty('dispatch');
    expect(contextValue).toHaveProperty('getPokemonData');
    expect(contextValue).toHaveProperty('getPokemonDetailsListByUrl');
    expect(contextValue).toHaveProperty('setAppLoading');
    expect(typeof contextValue.getPokemonData).toBe('function');
    expect(typeof contextValue.setAppLoading).toBe('function');
  });

  it('handles multiple rapid load more calls', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
          ]
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPokemonList[0])
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          results: mockAllPokemonList
        })
      });

    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('1');
    });

    // Click load more multiple times rapidly
    fireEvent.click(screen.getByTestId('load-more'));
    fireEvent.click(screen.getByTestId('load-more'));
    fireEvent.click(screen.getByTestId('load-more'));

    // Should only make the initial calls, not additional ones due to loading state
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });
});
