import type { Meta, StoryObj } from '@storybook/react';
import AppMultiSelectDropDown from './multiSelectdropDown';

const meta: Meta<typeof AppMultiSelectDropDown> = {
  title: 'Components/MultiSelectDropdown',
  component: AppMultiSelectDropDown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the dropdown',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the dropdown',
    },
    data: {
      control: 'object',
      description: 'Array of options for the dropdown',
    },
    onChangeHandler: { action: 'selection changed' },
    onOpenHandler: { action: 'dropdown opened' },
    onCloseHandler: { action: 'dropdown closed' },
    onCleanHandler: { action: 'selection cleared' },
    isOpen: {
      control: 'boolean',
      description: 'Whether the dropdown is open',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const pokemonTypes = [
  { label: 'Normal', value: 'normal' },
  { label: 'Fire', value: 'fire' },
  { label: 'Water', value: 'water' },
  { label: 'Electric', value: 'electric' },
  { label: 'Grass', value: 'grass' },
  { label: 'Ice', value: 'ice' },
  { label: 'Fighting', value: 'fighting' },
  { label: 'Poison', value: 'poison' },
  { label: 'Ground', value: 'ground' },
  { label: 'Flying', value: 'flying' },
  { label: 'Psychic', value: 'psychic' },
  { label: 'Bug', value: 'bug' },
  { label: 'Rock', value: 'rock' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Dragon', value: 'dragon' },
  { label: 'Dark', value: 'dark' },
  { label: 'Steel', value: 'steel' },
  { label: 'Fairy', value: 'fairy' },
];

const pokemonGenders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Genderless', value: 'genderless' },
];

const regions = [
  { label: 'Kanto', value: 'kanto' },
  { label: 'Johto', value: 'johto' },
  { label: 'Hoenn', value: 'hoenn' },
  { label: 'Sinnoh', value: 'sinnoh' },
  { label: 'Unova', value: 'unova' },
  { label: 'Kalos', value: 'kalos' },
  { label: 'Alola', value: 'alola' },
  { label: 'Galar', value: 'galar' },
];

export const Default: Story = {
  args: {
    label: 'Select Options',
    placeholder: 'Choose items...',
    data: pokemonTypes.slice(0, 5),
    isOpen: false,
  },
};

export const PokemonTypes: Story = {
  args: {
    label: 'Type',
    placeholder: 'Select Types',
    data: pokemonTypes,
    isOpen: false,
  },
};

export const PokemonGenders: Story = {
  args: {
    label: 'Gender',
    placeholder: 'Select Gender',
    data: pokemonGenders,
    isOpen: false,
  },
};

export const Regions: Story = {
  args: {
    label: 'Region',
    placeholder: 'Select Region',
    data: regions,
    isOpen: false,
  },
};

export const OpenDropdown: Story = {
  args: {
    label: 'Open Dropdown',
    placeholder: 'Select Types',
    data: pokemonTypes,
    isOpen: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: '',
    placeholder: 'Select Options',
    data: pokemonTypes.slice(0, 3),
    isOpen: false,
  },
};

export const LongOptions: Story = {
  args: {
    label: 'Long Options',
    placeholder: 'Select from long list',
    data: [
      { label: 'Very Long Option Name That Might Wrap', value: 'long1' },
      { label: 'Another Very Long Option Name', value: 'long2' },
      { label: 'Short', value: 'short' },
      { label: 'Medium Length Option', value: 'medium' },
    ],
    isOpen: false,
  },
};

export const EmptyOptions: Story = {
  args: {
    label: 'Empty Dropdown',
    placeholder: 'No options available',
    data: [],
    isOpen: false,
  },
};
