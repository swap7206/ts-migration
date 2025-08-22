import type { Meta, StoryObj } from '@storybook/react';
import SearchFilter from './search.filter';

const meta: Meta<typeof SearchFilter> = {
  title: 'Components/SearchFilter',
  component: SearchFilter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    inputClass: {
      control: 'text',
      description: 'CSS class for the input field',
    },
    onChangeHandler: { action: 'search changed' },
    label: {
      control: 'text',
      description: 'Label for the search field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    inputClass: '',
    label: 'Search',
  },
};

export const PokemonSearch: Story = {
  args: {
    placeholder: 'Name or Number',
    inputClass: 'pokemon-search-filter',
    label: 'Search By',
  },
};

export const WithCustomClass: Story = {
  args: {
    placeholder: 'Enter your search term',
    inputClass: 'custom-search-input',
    label: 'Custom Search',
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search without label',
    inputClass: '',
    label: '',
  },
};

export const WithLongPlaceholder: Story = {
  args: {
    placeholder: 'This is a very long placeholder text that might wrap to multiple lines',
    inputClass: '',
    label: 'Long Placeholder Search',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    placeholder: 'Search Pokémon (e.g., Pikachu, #025)',
    inputClass: '',
    label: 'Pokémon Search',
  },
};
