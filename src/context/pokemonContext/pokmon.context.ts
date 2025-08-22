import { createContext } from 'react';
import { PokemonContextType } from '../../types/pokemon.types';

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export default PokemonContext;
