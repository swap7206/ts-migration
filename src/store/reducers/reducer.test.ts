import { reducer, initialState } from './reducer';
import { PokemonState, PokemonAction } from '../../types/pokemon.types';

describe('Pokemon Reducer', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    base_experience: 64,
    height: 7,
    weight: 69,
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
  };

  const mockPokemonList = [mockPokemon];
  const mockAllPokemonList = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
  ];

  beforeEach(() => {
    // Reset to initial state before each test
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
    });

    it('should have correct initial values', () => {
      expect(initialState).toEqual({
        pokemonsList: [],
        allPokemonsList: [],
        pokemonSelectedId: null,
        pokemonData: null,
        isLoading: true,
        isLoadMoreInprogress: false,
        pokemonsTypes: [],
        pokemonGenderList: []
      });
    });
  });

  describe('SET_POKEMON_LIST', () => {
    it('should add new pokemon list to existing list', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon]
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [mockPokemon]
      };

      const newState = reducer(currentState, action);

      expect(newState.pokemonsList).toHaveLength(2);
      expect(newState.pokemonsList).toEqual([mockPokemon, mockPokemon]);
    });

    it('should handle empty payload', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon]
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: []
      };

      const newState = reducer(currentState, action);

      expect(newState.pokemonsList).toHaveLength(1);
      expect(newState.pokemonsList).toEqual([mockPokemon]);
    });

    it('should handle null payload', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon]
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: null
      };

      // The reducer should handle null payload by treating it as an empty array
      const newState = reducer(currentState, action);
      expect(newState.pokemonsList).toEqual([mockPokemon]);
    });
  });

  describe('SET_ALL_POKEMON_LIST', () => {
    it('should set all pokemon list', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: mockAllPokemonList
      };

      const newState = reducer(initialState, action);

      expect(newState.allPokemonsList).toEqual(mockAllPokemonList);
    });

    it('should handle empty payload', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: []
      };

      const newState = reducer(initialState, action);

      expect(newState.allPokemonsList).toEqual([]);
    });

    it('should handle null payload', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: null
      };

      const newState = reducer(initialState, action);

      expect(newState.allPokemonsList).toEqual(null);
    });
  });

  describe('SET_FILTERED_POKEMON_LIST', () => {
    it('should replace pokemon list with filtered list', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon]
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
        payload: [mockPokemon, mockPokemon]
      };

      const newState = reducer(currentState, action);

      expect(newState.pokemonsList).toEqual([mockPokemon, mockPokemon]);
    });

    it('should handle empty filtered list', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon]
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
        payload: []
      };

      const newState = reducer(currentState, action);

      expect(newState.pokemonsList).toEqual([]);
    });
  });

  describe('SET_POKEMON_TYPE', () => {
    it('should set pokemon types', () => {
      const pokemonTypes = ['fire', 'water', 'grass'];
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_TYPE',
        payload: pokemonTypes
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonsTypes).toEqual(pokemonTypes);
    });

    it('should handle empty types array', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_TYPE',
        payload: []
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonsTypes).toEqual([]);
    });
  });

  describe('SET_POKEMON_GENDER_LIST', () => {
    it('should set pokemon gender list', () => {
      const genderList = ['male', 'female', 'genderless'];
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_GENDER_LIST',
        payload: genderList
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonGenderList).toEqual(genderList);
    });

    it('should handle empty gender list', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_GENDER_LIST',
        payload: []
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonGenderList).toEqual([]);
    });
  });

  describe('SET_API_CALL_INPROGRESS', () => {
    it('should set loading state to true', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: true
      };

      const newState = reducer(initialState, action);

      expect(newState.isLoading).toBe(true);
    });

    it('should set loading state to false', () => {
      const currentState: PokemonState = {
        ...initialState,
        isLoading: true
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: false
      };

      const newState = reducer(currentState, action);

      expect(newState.isLoading).toBe(false);
    });

    it('should handle non-boolean payload', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: 'true'
      };

      const newState = reducer(initialState, action);

      expect(newState.isLoading).toBe('true');
    });
  });

  describe('SET_LOAD_MORE_API_CALL_INPROGRESS', () => {
    it('should set load more loading state to true', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: true
      };

      const newState = reducer(initialState, action);

      expect(newState.isLoadMoreInprogress).toBe(true);
    });

    it('should set load more loading state to false', () => {
      const currentState: PokemonState = {
        ...initialState,
        isLoadMoreInprogress: true
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: false
      };

      const newState = reducer(currentState, action);

      expect(newState.isLoadMoreInprogress).toBe(false);
    });
  });

  describe('SET_POKEMON_BY_ID', () => {
    it('should set pokemon data', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_BY_ID',
        payload: mockPokemon
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonData).toEqual(mockPokemon);
    });

    it('should handle null payload', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_BY_ID',
        payload: null
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonData).toBeNull();
    });
  });

  describe('RESET_POKEMON_DATA', () => {
    it('should reset pokemon data to null', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonData: mockPokemon
      };

      const action: PokemonAction = {
        type: 'ACTIONS.RESET_POKEMON_DATA'
      };

      const newState = reducer(currentState, action);

      expect(newState.pokemonData).toBeNull();
    });

    it('should handle when pokemon data is already null', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.RESET_POKEMON_DATA'
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonData).toBeNull();
    });
  });

  describe('SET_POKEMON_ID', () => {
    it('should set pokemon selected ID', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_ID',
        payload: 1
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonSelectedId).toBe(1);
    });

    it('should handle null payload', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_ID',
        payload: null
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonSelectedId).toBeNull();
    });

    it('should handle zero payload', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_ID',
        payload: 0
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonSelectedId).toBe(0);
    });
  });

  describe('Unknown Action', () => {
    it('should return current state for unknown action', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon],
        isLoading: false
      };

      const action: PokemonAction = {
        type: 'UNKNOWN_ACTION',
        payload: 'some data'
      };

      const newState = reducer(currentState, action);

      expect(newState).toEqual(currentState);
    });

    it('should return initial state for unknown action when no current state', () => {
      const action: PokemonAction = {
        type: 'UNKNOWN_ACTION',
        payload: 'some data'
      };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate the original state', () => {
      const originalState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon],
        isLoading: false
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: true
      };

      const newState = reducer(originalState, action);

      expect(originalState.isLoading).toBe(false);
      expect(newState.isLoading).toBe(true);
      expect(originalState).not.toBe(newState);
    });

    it('should create new object references for changed properties', () => {
      const originalState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon]
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [mockPokemon]
      };

      const newState = reducer(originalState, action);

      expect(originalState.pokemonsList).not.toBe(newState.pokemonsList);
      expect(originalState.pokemonsList).toEqual([mockPokemon]);
      expect(newState.pokemonsList).toEqual([mockPokemon, mockPokemon]);
    });
  });

  describe('Complex State Updates', () => {
    it('should handle multiple state updates correctly', () => {
      let state = initialState;

      // Set loading to false
      state = reducer(state, {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: false
      });

      // Add pokemon list
      state = reducer(state, {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [mockPokemon]
      });

      // Set all pokemon list
      state = reducer(state, {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: mockAllPokemonList
      });

      // Set pokemon types
      state = reducer(state, {
        type: 'ACTIONS.SET_POKEMON_TYPE',
        payload: ['fire', 'water']
      });

      expect(state.isLoading).toBe(false);
      expect(state.pokemonsList).toHaveLength(1);
      expect(state.allPokemonsList).toHaveLength(2);
      expect(state.pokemonsTypes).toEqual(['fire', 'water']);
    });

    it('should maintain other state properties when updating specific ones', () => {
      const currentState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon],
        allPokemonsList: mockAllPokemonList,
        pokemonSelectedId: 1,
        isLoading: false,
        pokemonsTypes: ['fire']
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: true
      };

      const newState = reducer(currentState, action);

      expect(newState.isLoadMoreInprogress).toBe(true);
      expect(newState.pokemonsList).toEqual(currentState.pokemonsList);
      expect(newState.allPokemonsList).toEqual(currentState.allPokemonsList);
      expect(newState.pokemonSelectedId).toBe(currentState.pokemonSelectedId);
      expect(newState.isLoading).toBe(currentState.isLoading);
      expect(newState.pokemonsTypes).toEqual(currentState.pokemonsTypes);
    });
  });
});
