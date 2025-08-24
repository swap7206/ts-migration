import { 
  Pokemon, 
  PokemonSprites, 
  PokemonType, 
  PokemonStat, 
  PokemonAbility,
  PokemonMove,
  PokemonSpecies,
  PokemonListResponse,
  PokemonSpeciesResponse,
  PokemonCardProps,
  PokemonDetailsCardProps,
  FilterProps,
  SearchFilterProps,
  MultiSelectDropdownProps,
  HeaderProps,
  LoaderProps,
  ColorfulTagProps,
  DetailsHeaderProps,
  PropertyCardProps,
  StatCardProps,
  EvolutionChainCardProps,
  FilterState,
  PokemonState,
  PokemonAction,
  PokemonContextType,
  PokemonTypeName,
  PokemonTypeConfig,
  PokemonTypeConfigs
} from './pokemon.types';

describe('Pokemon Types', () => {
  describe('PokemonSprites interface', () => {
    it('should have correct structure', () => {
      const sprites: PokemonSprites = {
        front_default: 'https://example.com/front.png',
        front_shiny: 'https://example.com/front-shiny.png',
        front_female: 'https://example.com/front-female.png',
        front_shiny_female: 'https://example.com/front-shiny-female.png',
        back_default: 'https://example.com/back.png',
        back_shiny: 'https://example.com/back-shiny.png',
        back_female: 'https://example.com/back-female.png',
        back_shiny_female: 'https://example.com/back-shiny-female.png',
        other: {
          dream_world: {
            front_default: 'https://example.com/dream-front.png',
            front_female: 'https://example.com/dream-front-female.png'
          },
          home: {
            front_default: 'https://example.com/home-front.png',
            front_female: 'https://example.com/home-front-female.png',
            front_shiny: 'https://example.com/home-front-shiny.png',
            front_shiny_female: 'https://example.com/home-front-shiny-female.png'
          },
          'official-artwork': {
            front_default: 'https://example.com/official-front.png',
            front_shiny: 'https://example.com/official-front-shiny.png'
          }
        }
      };

      expect(sprites.front_default).toBe('https://example.com/front.png');
      expect(sprites.other.dream_world.front_default).toBe('https://example.com/dream-front.png');
      expect(sprites.other.home.front_default).toBe('https://example.com/home-front.png');
      expect(sprites.other['official-artwork'].front_default).toBe('https://example.com/official-front.png');
    });

    it('should handle null values', () => {
      const sprites: PokemonSprites = {
        front_default: null,
        front_shiny: null,
        front_female: null,
        front_shiny_female: null,
        back_default: null,
        back_shiny: null,
        back_female: null,
        back_shiny_female: null,
        other: {
          dream_world: {
            front_default: null,
            front_female: null
          },
          home: {
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null
          },
          'official-artwork': {
            front_default: null,
            front_shiny: null
          }
        }
      };

      expect(sprites.front_default).toBeNull();
      expect(sprites.other.dream_world.front_default).toBeNull();
    });
  });

  describe('PokemonType interface', () => {
    it('should have correct structure', () => {
      const type: PokemonType = {
        slot: 1,
        type: {
          name: 'fire',
          url: 'https://pokeapi.co/api/v2/type/10/'
        }
      };

      expect(type.slot).toBe(1);
      expect(type.type.name).toBe('fire');
      expect(type.type.url).toBe('https://pokeapi.co/api/v2/type/10/');
    });
  });

  describe('PokemonStat interface', () => {
    it('should have correct structure', () => {
      const stat: PokemonStat = {
        base_stat: 85,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      };

      expect(stat.base_stat).toBe(85);
      expect(stat.effort).toBe(0);
      expect(stat.stat.name).toBe('attack');
    });
  });

  describe('PokemonAbility interface', () => {
    it('should have correct structure', () => {
      const ability: PokemonAbility = {
        ability: {
          name: 'blaze',
          url: 'https://pokeapi.co/api/v2/ability/66/'
        },
        is_hidden: false,
        slot: 1
      };

      expect(ability.ability.name).toBe('blaze');
      expect(ability.is_hidden).toBe(false);
      expect(ability.slot).toBe(1);
    });
  });

  describe('Pokemon interface', () => {
    it('should have correct structure', () => {
      const pokemon: Pokemon = {
        id: 25,
        name: 'pikachu',
        base_experience: 112,
        height: 4,
        weight: 60,
        sprites: {
          front_default: 'https://example.com/pikachu.png',
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null,
          other: {
            dream_world: {
              front_default: null,
              front_female: null
            },
            home: {
              front_default: null,
              front_female: null,
              front_shiny: null,
              front_shiny_female: null
            },
            'official-artwork': {
              front_default: null,
              front_shiny: null
            }
          }
        },
        types: [
          {
            slot: 1,
            type: {
              name: 'electric',
              url: 'https://pokeapi.co/api/v2/type/13/'
            }
          }
        ],
        stats: [
          {
            base_stat: 35,
            effort: 0,
            stat: {
              name: 'hp',
              url: 'https://pokeapi.co/api/v2/stat/1/'
            }
          }
        ],
        abilities: [
          {
            ability: {
              name: 'static',
              url: 'https://pokeapi.co/api/v2/ability/9/'
            },
            is_hidden: false,
            slot: 1
          }
        ],
        moves: [],
        species: {
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon-species/25/'
        },
        forms: [],
        game_indices: [],
        held_items: [],
        location_area_encounters: '',
        order: 25,
        past_types: []
      };

      expect(pokemon.id).toBe(25);
      expect(pokemon.name).toBe('pikachu');
      expect(pokemon.types).toHaveLength(1);
      expect(pokemon.types[0].type.name).toBe('electric');
    });
  });

  describe('Component Props interfaces', () => {
    it('should have correct PokemonCardProps structure', () => {
      const props: PokemonCardProps = {
        data: {
          id: 25,
          name: 'pikachu',
          base_experience: 112,
          height: 4,
          weight: 60,
          sprites: {
            front_default: 'https://example.com/pikachu.png',
            front_shiny: null,
            front_female: null,
            front_shiny_female: null,
            back_default: null,
            back_shiny: null,
            back_female: null,
            back_shiny_female: null,
            other: {
              dream_world: {
                front_default: null,
                front_female: null
              },
              home: {
                front_default: null,
                front_female: null,
                front_shiny: null,
                front_shiny_female: null
              },
              'official-artwork': {
                front_default: null,
                front_shiny: null
              }
            }
          },
          types: [],
          stats: [],
          abilities: [],
          moves: [],
          species: {
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon-species/25/'
          },
          forms: [],
          game_indices: [],
          held_items: [],
          location_area_encounters: '',
          order: 25,
          past_types: []
        },
        onClick: () => {},
        className: 'custom-class'
      };

      expect(props.data.name).toBe('pikachu');
      expect(typeof props.onClick).toBe('function');
      expect(props.className).toBe('custom-class');
    });

    it('should have correct SearchFilterProps structure', () => {
      const props: SearchFilterProps = {
        onSearch: (term: string) => {},
        placeholder: 'Search pokemon...'
      };

      expect(typeof props.onSearch).toBe('function');
      expect(props.placeholder).toBe('Search pokemon...');
    });

    it('should have correct MultiSelectDropdownProps structure', () => {
      const props: MultiSelectDropdownProps = {
        options: [
          { label: 'Fire', value: 'fire' },
          { label: 'Water', value: 'water' }
        ],
        selectedValues: ['fire'],
        onChange: (values: string[]) => {},
        placeholder: 'Select types',
        label: 'Pokemon Types'
      };

      expect(props.options).toHaveLength(2);
      expect(props.selectedValues).toContain('fire');
      expect(typeof props.onChange).toBe('function');
    });

    it('should have correct HeaderProps structure', () => {
      const props: HeaderProps = {
        title: 'Pokédex',
        showBackButton: true,
        onBackClick: () => {}
      };

      expect(props.title).toBe('Pokédex');
      expect(props.showBackButton).toBe(true);
      expect(typeof props.onBackClick).toBe('function');
    });

    it('should have correct LoaderProps structure', () => {
      const props: LoaderProps = {
        size: 'medium',
        color: '#007bff'
      };

      expect(props.size).toBe('medium');
      expect(props.color).toBe('#007bff');
    });

    it('should have correct ColorfulTagProps structure', () => {
      const props: ColorfulTagProps = {
        label: 'Fire',
        color: '#ff4444',
        onClick: () => {}
      };

      expect(props.label).toBe('Fire');
      expect(props.color).toBe('#ff4444');
      expect(typeof props.onClick).toBe('function');
    });

    it('should have correct PropertyCardProps structure', () => {
      const props: PropertyCardProps = {
        title: 'Height',
        value: '1.7 m',
        icon: '📏'
      };

      expect(props.title).toBe('Height');
      expect(props.value).toBe('1.7 m');
      expect(props.icon).toBe('📏');
    });

    it('should have correct StatCardProps structure', () => {
      const stat: PokemonStat = {
        base_stat: 85,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      };

      const props: StatCardProps = {
        stat,
        maxStat: 255
      };

      expect(props.stat.base_stat).toBe(85);
      expect(props.maxStat).toBe(255);
    });
  });

  describe('State interfaces', () => {
    it('should have correct FilterState structure', () => {
      const state: FilterState = {
        searchTerm: 'pikachu',
        selectedTypes: ['electric'],
        selectedGenders: ['male']
      };

      expect(state.searchTerm).toBe('pikachu');
      expect(state.selectedTypes).toContain('electric');
      expect(state.selectedGenders).toContain('male');
    });

    it('should have correct PokemonState structure', () => {
      const state: PokemonState = {
        pokemonsList: [],
        allPokemonsList: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
        ],
        pokemonSelectedId: 25,
        pokemonData: null,
        isLoading: false,
        isLoadMoreInprogress: false,
        pokemonsTypes: ['fire', 'water', 'electric'],
        pokemonGenderList: ['male', 'female']
      };

      expect(state.allPokemonsList).toHaveLength(1);
      expect(state.pokemonSelectedId).toBe(25);
      expect(state.isLoading).toBe(false);
      expect(state.pokemonsTypes).toContain('electric');
    });

    it('should have correct PokemonAction structure', () => {
      const action: PokemonAction = {
        type: 'SET_POKEMON_DATA',
        payload: { id: 25, name: 'pikachu' }
      };

      expect(action.type).toBe('SET_POKEMON_DATA');
      expect(action.payload).toEqual({ id: 25, name: 'pikachu' });
    });
  });

  describe('PokemonTypeName type', () => {
    it('should accept valid type names', () => {
      const validTypes: PokemonTypeName[] = [
        'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
        'bug', 'ghost', 'steel', 'fire', 'water', 'grass',
        'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy',
        'unknown', 'shadow'
      ];

      validTypes.forEach(type => {
        expect(typeof type).toBe('string');
      });
    });
  });

  describe('PokemonTypeConfig interface', () => {
    it('should have correct structure', () => {
      const config: PokemonTypeConfig = {
        color: 'red',
        hex: '#ff0000'
      };

      expect(config.color).toBe('red');
      expect(config.hex).toBe('#ff0000');
    });
  });

  describe('PokemonTypeConfigs interface', () => {
    it('should have correct structure', () => {
      const configs: PokemonTypeConfigs = {
        fire: {
          color: 'red',
          hex: '#ff0000'
        },
        water: {
          color: 'blue',
          hex: '#0000ff'
        }
      };

      expect(configs.fire.color).toBe('red');
      expect(configs.water.hex).toBe('#0000ff');
    });
  });

  describe('API Response interfaces', () => {
    it('should have correct PokemonListResponse structure', () => {
      const response: PokemonListResponse = {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/'
          }
        ]
      };

      expect(response.count).toBe(1118);
      expect(response.next).toBe('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
      expect(response.previous).toBeNull();
      expect(response.results).toHaveLength(1);
    });

    it('should have correct PokemonSpeciesResponse structure', () => {
      const response: PokemonSpeciesResponse = {
        id: 25,
        name: 'pikachu',
        order: 25,
        gender_rate: 4,
        capture_rate: 190,
        base_happiness: 50,
        is_baby: false,
        is_legendary: false,
        is_mythical: false,
        hatch_counter: 10,
        has_gender_differences: false,
        forms_switchable: false,
        growth_rate: {
          name: 'medium-fast',
          url: 'https://pokeapi.co/api/v2/growth-rate/4/'
        },
        pokedex_numbers: [],
        form_descriptions: [],
        genera: [],
        varieties: [],
        flavor_text_entries: []
      };

      expect(response.id).toBe(25);
      expect(response.name).toBe('pikachu');
      expect(response.is_legendary).toBe(false);
      expect(response.growth_rate.name).toBe('medium-fast');
    });
  });
});
