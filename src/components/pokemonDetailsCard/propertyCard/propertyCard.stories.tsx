import type { Meta, StoryObj } from '@storybook/react';
import PropertyCard from './propertyCard';

const meta: Meta<typeof PropertyCard> = {
  title: 'Components/PropertyCard',
  component: PropertyCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    speciesData: {
      control: 'object',
      description: 'Pokemon species data',
    },
    data: {
      control: 'object',
      description: 'Pokemon data',
    },
    pokemonTypeData: {
      control: 'object',
      description: 'Pokemon type data',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
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
        front_female: null,
      },
      home: {
        front_default: null,
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default: null,
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  stats: [],
  abilities: [],
  moves: [],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  forms: [],
  game_indices: [],
  held_items: [],
  location_area_encounters: '',
  order: 1,
  past_types: [],
};

const mockSpeciesData = {
  id: 1,
  name: 'bulbasaur',
  order: 1,
  gender_rate: 1,
  capture_rate: 45,
  base_happiness: 50,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  hatch_counter: 20,
  has_gender_differences: false,
  forms_switchable: false,
  growth_rate: {
    name: 'medium-slow',
    url: 'https://pokeapi.co/api/v2/growth-rate/4/',
  },
  pokedex_numbers: [
    {
      entry_number: 1,
      pokedex: {
        name: 'national',
        url: 'https://pokeapi.co/api/v2/pokedex/1/',
      },
    },
  ],
  form_descriptions: [],
  genera: [
    {
      genus: 'Seed Pokémon',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  varieties: [
    {
      is_default: true,
      pokemon: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/',
      },
    },
  ],
};

const mockTypeData = {
  id: 12,
  name: 'grass',
  damage_relations: {
    double_damage_from: [
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
      { name: 'ice', url: 'https://pokeapi.co/api/v2/type/15/' },
      { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' },
      { name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/' },
    ],
    double_damage_to: [
      { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
      { name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/' },
      { name: 'rock', url: 'https://pokeapi.co/api/v2/type/6/' },
    ],
    half_damage_from: [
      { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
      { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
      { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      { name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/' },
    ],
    half_damage_to: [
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
      { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' },
      { name: 'dragon', url: 'https://pokeapi.co/api/v2/type/16/' },
      { name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/' },
      { name: 'steel', url: 'https://pokeapi.co/api/v2/type/9/' },
    ],
    no_damage_from: [],
    no_damage_to: [],
  },
  game_indices: [],
  generation: {
    name: 'generation-i',
    url: 'https://pokeapi.co/api/v2/generation/1/',
  },
  move_damage_class: {
    name: 'special',
    url: 'https://pokeapi.co/api/v2/move-damage-class/3/',
  },
  names: [
    {
      name: 'Grass',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  pokemon: [
    {
      slot: 1,
      pokemon: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    },
  ],
  moves: [],
};

export const Default: Story = {
  args: {
    speciesData: mockSpeciesData,
    data: mockPokemon,
    pokemonTypeData: mockTypeData,
  },
};

export const WithoutSpeciesData: Story = {
  args: {
    speciesData: undefined,
    data: mockPokemon,
    pokemonTypeData: mockTypeData,
  },
};

export const LargePokemon: Story = {
  args: {
    speciesData: mockSpeciesData,
    data: {
      ...mockPokemon,
      height: 20,
      weight: 1000,
      base_experience: 300,
    },
    pokemonTypeData: mockTypeData,
  },
};

export const SmallPokemon: Story = {
  args: {
    speciesData: mockSpeciesData,
    data: {
      ...mockPokemon,
      height: 3,
      weight: 5,
      base_experience: 20,
    },
    pokemonTypeData: mockTypeData,
  },
};

export const LegendaryPokemon: Story = {
  args: {
    speciesData: {
      ...mockSpeciesData,
      is_legendary: true,
      capture_rate: 3,
      base_happiness: 0,
    },
    data: mockPokemon,
    pokemonTypeData: mockTypeData,
  },
};
