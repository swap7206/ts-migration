import type { Meta, StoryObj } from '@storybook/react';
import ColorfulTag from './colorfulTag';

const meta: Meta<typeof ColorfulTag> = {
  title: 'Components/ColorfulTag',
  component: ColorfulTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    type: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Normal',
    type: 'normal',
  },
};

export const FireType: Story = {
  args: {
    text: 'Fire',
    type: 'fire',
  },
};

export const WaterType: Story = {
  args: {
    text: 'Water',
    type: 'water',
  },
};

export const GrassType: Story = {
  args: {
    text: 'Grass',
    type: 'grass',
  },
};

export const ElectricType: Story = {
  args: {
    text: 'Electric',
    type: 'electric',
  },
};

export const PsychicType: Story = {
  args: {
    text: 'Psychic',
    type: 'psychic',
  },
};

export const DarkType: Story = {
  args: {
    text: 'Dark',
    type: 'dark',
  },
};

export const FairyType: Story = {
  args: {
    text: 'Fairy',
    type: 'fairy',
  },
};

export const WithCustomClass: Story = {
  args: {
    text: 'Custom Tag',
    type: 'fire',
    className: 'custom-tag-class',
  },
};

export const MultipleTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <ColorfulTag text="Fire" type="fire" />
      <ColorfulTag text="Water" type="water" />
      <ColorfulTag text="Grass" type="grass" />
      <ColorfulTag text="Electric" type="electric" />
      <ColorfulTag text="Psychic" type="psychic" />
      <ColorfulTag text="Dark" type="dark" />
    </div>
  ),
};
