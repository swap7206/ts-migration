import React, { useReducer, useEffect, useRef, ReactNode, useContext } from 'react';
import { initialState, reducer } from '../../store/reducers/reducer';
import PokemonContext from './pokmon.context';
import { Pokemon, PokemonContextType } from '../../types/pokemon.types';
import {
  allPokemonURL,
  initialURL
} from '../../services/common.service';

interface PokemonProviderProps {
  children: ReactNode;
}

export const usePokemonContext = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef<string>(initialURL);

  const setAppLoading = (loading: boolean): void => {
    dispatch({
      type: "ACTIONS.SET_API_CALL_INPROGRESS",
      payload: loading,
    });
  };

  const setLoadMoreDataInprogress = (loading: boolean): void => {
    dispatch({
      type: "ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS",
      payload: loading,
    });
  };

  const getPokemonData = async (isReset = false): Promise<void> => {
    if (isReset) {
      batchURL.current = initialURL;
    }
    if (!batchURL.current) return;
    
    setLoadMoreDataInprogress(true);
    const resp = await fetch(batchURL.current);
    const { next, results } = await resp.json();

    batchURL.current = next;
    const pokemonsList = await getPokemonDetailsListByUrl(results);
    setPokemonList(pokemonsList);
    setLoadMoreDataInprogress(false);
  };

  const getPokemonDetailsListByUrl = async (results: Array<{ name: string; url: string }>): Promise<Pokemon[]> => {
    const pokemonsDetailsList = await Promise.all(
      results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const res = response.json();
        return res;
      })
    );
    return pokemonsDetailsList;
  };

  const getAllPokemonDataList = async (): Promise<void> => {
    const resp = await fetch(allPokemonURL);
    const { results } = await resp.json();
    dispatch({
      type: "ACTIONS.SET_ALL_POKEMON_LIST",
      payload: results,
    });
  };

  const setPokemonList = (pokemonsList: Pokemon[]): void => {
    dispatch({
      type: "ACTIONS.SET_POKEMON_LIST",
      payload: pokemonsList,
    });
  };

  useEffect(() => {
    getPokemonData().then(() => state.isLoading && setAppLoading(false));
    getAllPokemonDataList();
  }, []);

  const contextValue: PokemonContextType = {
    state,
    dispatch,
    getPokemonData,
    getPokemonDetailsListByUrl,
    setAppLoading
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};
