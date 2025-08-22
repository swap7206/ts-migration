import type { Meta, StoryObj } from '@storybook/react';
import PokemonCard from './pokemonCard';

const meta: Meta<typeof PokemonCard> = {
  title: 'Components/PokemonCard',
  component: PokemonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock Pokemon data
const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
    front_female: null,
    front_shiny_female: null,
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        front_female: null,
      },
      home: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
        front_female: null,
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png',
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png',
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

const firePokemon = {
  ...mockPokemon,
  id: 4,
  name: 'charmander',
  sprites: {
    ...mockPokemon.sprites,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    other: {
      ...mockPokemon.sprites.other,
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
        front_female: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    },
  ],
};

const waterPokemon = {
  ...mockPokemon,
  id: 7,
  name: 'squirtle',
  sprites: {
    ...mockPokemon.sprites,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    other: {
      ...mockPokemon.sprites.other,
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
        front_female: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'water',
        url: 'https://pokeapi.co/api/v2/type/11/',
      },
    },
  ],
};

export const Default: Story = {
  args: {
    data: mockPokemon,
    className: '',
  },
};

export const FireType: Story = {
  args: {
    data: firePokemon,
    className: '',
  },
};

export const WaterType: Story = {
  args: {
    data: waterPokemon,
    className: '',
  },
};

export const WithCustomClass: Story = {
  args: {
    data: mockPokemon,
    className: 'custom-pokemon-card',
  },
};

export const WithClickHandler: Story = {
  args: {
    data: mockPokemon,
    className: '',
    onClick: () => console.log('Pokemon card clicked!'),
  },
};

export const DisabledClick: Story = {
  args: {
    data: mockPokemon,
    className: 'disabled-click',
  },
};

export const MissingImage: Story = {
  args: {
    data: {
      ...mockPokemon,
      sprites: {
        ...mockPokemon.sprites,
        front_default: null,
        other: {
          ...mockPokemon.sprites.other,
          dream_world: {
            front_default: null,
            front_female: null,
          },
        },
      },
    },
    className: '',
  },
};
