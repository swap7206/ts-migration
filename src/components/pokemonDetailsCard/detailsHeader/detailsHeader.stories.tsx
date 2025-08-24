import type { Meta, StoryObj } from '@storybook/react';
import DetailsHeader from './detailsHeader';

const meta: Meta<typeof DetailsHeader> = {
  title: 'Components/DetailsHeader',
  component: DetailsHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Pokemon data',
    },
    speciesData: {
      control: 'object',
      description: 'Pokemon species data',
    },
    backClick: { action: 'back clicked' },
    closeClick: { action: 'close clicked' },
    forwordClick: { action: 'forward clicked' },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
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
      dream_world: { front_default: null, front_female: null },
      home: { front_default: null, front_female: null, front_shiny: null, front_shiny_female: null },
      'official-artwork': { front_default: null, front_shiny: null },
    },
  },
  types: [
    {
      slot: 1,
      type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
    },
    {
      slot: 2,
      type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
    },
  ],
  stats: [],
  abilities: [],
  moves: [],
  species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
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
  growth_rate: { name: 'medium-slow', url: 'https://pokeapi.co/api/v2/growth-rate/4/' },
  pokedex_numbers: [],
  egg_groups: [{ name: 'monster', url: 'https://pokeapi.co/api/v2/egg-group/1/' }, { name: 'plant', url: 'https://pokeapi.co/api/v2/egg-group/7/' }],
  color: { name: 'green', url: 'https://pokeapi.co/api/v2/pokemon-color/5/' },
  shape: { name: 'quadruped', url: 'https://pokeapi.co/api/v2/pokemon-shape/8/' },
  evolves_from_species: null,
  evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' },
  habitat: { name: 'grassland', url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/' },
  generation: { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
  names: [],
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
      version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
    },
  ],
  form_descriptions: [],
  genera: [{ genus: 'Seed Pokémon', language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' } }],
  varieties: [],
};

export const Default: Story = {
  args: {
    data: mockPokemon,
    speciesData: mockSpeciesData,
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: '',
  },
};

export const WithoutSpeciesData: Story = {
  args: {
    data: mockPokemon,
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: '',
  },
};

export const WithCustomClass: Story = {
  args: {
    data: mockPokemon,
    speciesData: mockSpeciesData,
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: 'custom-details-header',
  },
};

export const FireTypePokemon: Story = {
  args: {
    data: {
      ...mockPokemon,
      id: 4,
      name: 'charmander',
      types: [
        {
          slot: 1,
          type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
        },
      ],
    },
    speciesData: {
      ...mockSpeciesData,
      id: 4,
      name: 'charmander',
      color: { name: 'red', url: 'https://pokeapi.co/api/v2/pokemon-color/8/' },
      genera: [{ genus: 'Lizard Pokémon', language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' } }],
    },
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: '',
  },
};

export const WaterTypePokemon: Story = {
  args: {
    data: {
      ...mockPokemon,
      id: 7,
      name: 'squirtle',
      types: [
        {
          slot: 1,
          type: { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
        },
      ],
    },
    speciesData: {
      ...mockSpeciesData,
      id: 7,
      name: 'squirtle',
      color: { name: 'blue', url: 'https://pokeapi.co/api/v2/pokemon-color/2/' },
      genera: [{ genus: 'Tiny Turtle Pokémon', language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' } }],
    },
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: '',
  },
};
