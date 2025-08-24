import type { Meta, StoryObj } from '@storybook/react';
import EvolutionChainCard from './evolutionChainCard';

const meta: Meta<typeof EvolutionChainCard> = {
  title: 'Components/EvolutionChainCard',
  component: EvolutionChainCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    evolutionChain: {
      control: 'object',
      description: 'Evolution chain data',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    evolutionChain: null,
    className: '',
  },
};

export const WithEvolutionData: Story = {
  args: {
    evolutionChain: {
      chain: {
        species: { name: 'bulbasaur' },
        evolves_to: [
          {
            species: { name: 'ivysaur' },
            evolves_to: [
              {
                species: { name: 'venusaur' },
                evolves_to: [],
              },
            ],
          },
        ],
      },
    },
    className: '',
  },
};

export const WithCustomClass: Story = {
  args: {
    evolutionChain: null,
    className: 'custom-evolution-card',
  },
};

export const ComplexEvolutionChain: Story = {
  args: {
    evolutionChain: {
      chain: {
        species: { name: 'eevee' },
        evolves_to: [
          {
            species: { name: 'vaporeon' },
            evolves_to: [],
          },
          {
            species: { name: 'jolteon' },
            evolves_to: [],
          },
          {
            species: { name: 'flareon' },
            evolves_to: [],
          },
        ],
      },
    },
    className: '',
  },
};

export const EmptyEvolutionChain: Story = {
  args: {
    evolutionChain: {
      chain: {
        species: { name: 'kangaskhan' },
        evolves_to: [],
      },
    },
    className: '',
  },
};
