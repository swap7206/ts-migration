import type { Meta, StoryObj } from '@storybook/react';
import StatCard from './statCard';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    stats: {
      control: 'object',
      description: 'Array of Pokemon stats',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockStats = [
  {
    base_stat: 45,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 49,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 49,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 65,
    effort: 1,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 65,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 45,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

const highStats = [
  {
    base_stat: 150,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 180,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 160,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 200,
    effort: 1,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 190,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 170,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

const lowStats = [
  {
    base_stat: 20,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 15,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 25,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 30,
    effort: 1,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 35,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 40,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

export const Default: Story = {
  args: {
    stats: mockStats,
  },
};

export const HighStats: Story = {
  args: {
    stats: highStats,
  },
};

export const LowStats: Story = {
  args: {
    stats: lowStats,
  },
};

export const SingleStat: Story = {
  args: {
    stats: [mockStats[0]], // Only HP
  },
};

export const PartialStats: Story = {
  args: {
    stats: mockStats.slice(0, 3), // Only first 3 stats
  },
};

export const EmptyStats: Story = {
  args: {
    stats: [],
  },
};
