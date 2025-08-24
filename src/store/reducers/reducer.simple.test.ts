import { initialState, reducer } from './reducer';

describe('Reducer - Simple Tests', () => {
  describe('Initial State', () => {
    it('has correct initial state structure', () => {
      expect(initialState).toHaveProperty('pokemonsList');
      expect(initialState).toHaveProperty('allPokemonsList');
      expect(initialState).toHaveProperty('pokemonSelectedId');
      expect(initialState).toHaveProperty('pokemonData');
      expect(initialState).toHaveProperty('isLoading');
      expect(initialState).toHaveProperty('isLoadMoreInprogress');
      expect(initialState).toHaveProperty('pokemonsTypes');
      expect(initialState).toHaveProperty('pokemonGenderList');
    });

    it('has correct initial values', () => {
      expect(initialState.pokemonsList).toEqual([]);
      expect(initialState.allPokemonsList).toEqual([]);
      expect(initialState.pokemonSelectedId).toBeNull();
      expect(initialState.pokemonData).toBeNull();
      expect(initialState.isLoading).toBe(true);
      expect(initialState.isLoadMoreInprogress).toBe(false);
      expect(initialState.pokemonsTypes).toEqual([]);
      expect(initialState.pokemonGenderList).toEqual([]);
    });
  });

  describe('Reducer Function', () => {
    it('is a function', () => {
      expect(typeof reducer).toBe('function');
    });

    it('returns initial state for unknown action', () => {
      const action = { type: 'UNKNOWN_ACTION', payload: null };
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });

    it('returns initial state for undefined action', () => {
      const result = reducer(initialState, { type: 'UNKNOWN' } as any);
      expect(result).toEqual(initialState);
    });
  });

  describe('SET_POKEMON_LIST Action', () => {
    it('updates pokemonsList correctly', () => {
      const pokemonList = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' }
      ];
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: pokemonList
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual(pokemonList);
    });

    it('preserves other state properties', () => {
      const pokemonList = [{ id: 1, name: 'bulbasaur' }];
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: pokemonList
      };
      const result = reducer(initialState, action);
      expect(result.allPokemonsList).toEqual(initialState.allPokemonsList);
      expect(result.pokemonDetails).toBe(initialState.pokemonDetails);
      expect(result.isLoading).toBe(initialState.isLoading);
      expect(result.isLoadMoreInprogress).toBe(initialState.isLoadMoreInprogress);
    });
  });

  describe('SET_ALL_POKEMON_LIST Action', () => {
    it('updates allPokemonsList correctly', () => {
      const allPokemonList = [
        { name: 'bulbasaur', url: 'https://example.com/1' },
        { name: 'ivysaur', url: 'https://example.com/2' }
      ];
      const action = {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: allPokemonList
      };
      const result = reducer(initialState, action);
      expect(result.allPokemonsList).toEqual(allPokemonList);
    });

    it('preserves other state properties', () => {
      const allPokemonList = [{ name: 'bulbasaur', url: 'https://example.com/1' }];
      const action = {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: allPokemonList
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual(initialState.pokemonsList);
      expect(result.pokemonDetails).toBe(initialState.pokemonDetails);
      expect(result.isLoading).toBe(initialState.isLoading);
      expect(result.isLoadMoreInprogress).toBe(initialState.isLoadMoreInprogress);
    });
  });

  describe('SET_POKEMON_BY_ID Action', () => {
    it('updates pokemonData correctly', () => {
      const pokemonData = { id: 1, name: 'bulbasaur', types: [] };
      const action = {
        type: 'ACTIONS.SET_POKEMON_BY_ID',
        payload: pokemonData
      };
      const result = reducer(initialState, action);
      expect(result.pokemonData).toEqual(pokemonData);
    });

    it('preserves other state properties', () => {
      const pokemonData = { id: 1, name: 'bulbasaur', types: [] };
      const action = {
        type: 'ACTIONS.SET_POKEMON_BY_ID',
        payload: pokemonData
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual(initialState.pokemonsList);
      expect(result.allPokemonsList).toEqual(initialState.allPokemonsList);
      expect(result.isLoading).toBe(initialState.isLoading);
      expect(result.isLoadMoreInprogress).toBe(initialState.isLoadMoreInprogress);
    });
  });

  describe('SET_API_CALL_INPROGRESS Action', () => {
    it('updates isLoading correctly', () => {
      const action = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: false
      };
      const result = reducer(initialState, action);
      expect(result.isLoading).toBe(false);
    });

    it('handles true payload', () => {
      const action = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: true
      };
      const result = reducer(initialState, action);
      expect(result.isLoading).toBe(true);
    });

    it('preserves other state properties', () => {
      const action = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: false
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual(initialState.pokemonsList);
      expect(result.allPokemonsList).toEqual(initialState.allPokemonsList);
      expect(result.pokemonDetails).toBe(initialState.pokemonDetails);
      expect(result.isLoadMoreInprogress).toBe(initialState.isLoadMoreInprogress);
    });
  });

  describe('SET_LOAD_MORE_API_CALL_INPROGRESS Action', () => {
    it('updates isLoadMoreInprogress correctly', () => {
      const action = {
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: true
      };
      const result = reducer(initialState, action);
      expect(result.isLoadMoreInprogress).toBe(true);
    });

    it('handles false payload', () => {
      const action = {
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: false
      };
      const result = reducer(initialState, action);
      expect(result.isLoadMoreInprogress).toBe(false);
    });

    it('preserves other state properties', () => {
      const action = {
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: true
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual(initialState.pokemonsList);
      expect(result.allPokemonsList).toEqual(initialState.allPokemonsList);
      expect(result.pokemonDetails).toBe(initialState.pokemonDetails);
      expect(result.isLoading).toBe(initialState.isLoading);
    });
  });

  describe('State Immutability', () => {
    it('does not mutate original state', () => {
      const originalState = { ...initialState };
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [{ id: 1, name: 'bulbasaur' }]
      };
      reducer(initialState, action);
      expect(initialState).toEqual(originalState);
    });

    it('returns new state object', () => {
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [{ id: 1, name: 'bulbasaur' }]
      };
      const result = reducer(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });

  describe('Edge Cases', () => {
    it('handles null payload', () => {
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: null
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual([]);
    });

    it('handles undefined payload', () => {
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: undefined
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual([]);
    });

    it('handles empty array payload', () => {
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: []
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual([]);
    });

    it('handles large payload', () => {
      const largePayload = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `pokemon-${i}`
      }));
      const action = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: largePayload
      };
      const result = reducer(initialState, action);
      expect(result.pokemonsList).toEqual(largePayload);
      expect(result.pokemonsList).toHaveLength(1000);
    });
  });

  describe('Multiple Actions', () => {
    it('handles multiple state updates correctly', () => {
      let state = { ...initialState };

      // Set pokemon list
      state = reducer(state, {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [{ id: 1, name: 'bulbasaur' }]
      });

      // Set loading to false
      state = reducer(state, {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: false
      });

      // Set load more to true
      state = reducer(state, {
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: true
      });

      expect(state.pokemonsList).toEqual([{ id: 1, name: 'bulbasaur' }]);
      expect(state.isLoading).toBe(false);
      expect(state.isLoadMoreInprogress).toBe(true);
    });
  });
});
