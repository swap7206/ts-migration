// Pokemon API Response Types
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    version_group: {
      name: string;
      url: string;
    };
    move_learn_method: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  species: PokemonSpecies;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location_area_encounters: string;
  order: number;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: PokemonType[];
  }>;
}

// API Response Types
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonSpeciesResponse {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  pokedex_numbers: Array<{
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }>;
  form_descriptions: Array<{
    description: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  varieties: Array<{
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
}

// Component Props Types
export interface PokemonCardProps {
  data: Pokemon;
  onClick?: () => void;
  className?: string;
}

export interface PokemonDetailsCardProps {
  pokemon: Pokemon;
  speciesData?: PokemonSpeciesResponse;
}

export interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  allPokemons: Array<{ name: string; url: string }>;
}

export interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export interface MultiSelectDropdownProps {
  options: Array<{ label: string; value: string }>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
}

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export interface ColorfulTagProps {
  label: string;
  color?: string;
  onClick?: () => void;
}

export interface DetailsHeaderProps {
  pokemon: Pokemon;
  onBackClick?: () => void;
}

export interface PropertyCardProps {
  title: string;
  value: string | number;
  icon?: string;
}

export interface StatCardProps {
  stat: PokemonStat;
  maxStat?: number;
}

export interface EvolutionChainCardProps {
  evolutionChain: any; // Will be defined based on evolution API response
}

// State Types
export interface FilterState {
  searchTerm: string;
  selectedTypes: string[];
  selectedGenders: string[];
}

export interface PokemonState {
  pokemonsList: Pokemon[];
  allPokemonsList: Array<{ name: string; url: string }>;
  pokemonSelectedId: number | null;
  pokemonData: Pokemon | null;
  isLoading: boolean;
  isLoadMoreInprogress: boolean;
  pokemonsTypes: string[];
  pokemonGenderList: string[];
}

export interface PokemonAction {
  type: string;
  payload?: any;
}

// Context Types
export interface PokemonContextType {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
  getPokemonData: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl: (results: Array<{ name: string; url: string }>) => Promise<Pokemon[]>;
  setAppLoading: (loading: boolean) => void;
}

// Utility Types
export type PokemonTypeName = 
  | 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' 
  | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' 
  | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' 
  | 'unknown' | 'shadow';

export interface PokemonTypeConfig {
  color: string;
  hex: string;
}

export interface PokemonTypeConfigs {
  [key: string]: PokemonTypeConfig;
}
