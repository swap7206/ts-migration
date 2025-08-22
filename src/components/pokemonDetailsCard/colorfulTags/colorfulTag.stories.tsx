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
    label: {
      control: 'text',
      description: 'Text to display in the tag',
    },
    color: {
      control: 'color',
      description: 'Background color of the tag',
    },
    onClick: { action: 'tag clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
    color: '#007bff',
  },
};

export const PokemonTypes: Story = {
  args: {
    label: 'Fire',
    color: '#EDC2C4',
  },
};

export const WaterType: Story = {
  args: {
    label: 'Water',
    color: '#CBD5ED',
  },
};

export const GrassType: Story = {
  args: {
    label: 'Grass',
    color: '#C0D4C8',
  },
};

export const ElectricType: Story = {
  args: {
    label: 'Electric',
    color: '#E2E2A0',
  },
};

export const PsychicType: Story = {
  args: {
    label: 'Psychic',
    color: '#DDC0CF',
  },
};

export const DarkType: Story = {
  args: {
    label: 'Dark',
    color: '#C6C5E3',
  },
};

export const FairyType: Story = {
  args: {
    label: 'Fairy',
    color: '#E4C0CF',
  },
};

export const WithClickHandler: Story = {
  args: {
    label: 'Clickable Tag',
    color: '#28a745',
    onClick: () => console.log('Tag clicked!'),
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Very Long Tag Label That Might Wrap',
    color: '#6f42c1',
  },
};

export const ShortLabel: Story = {
  args: {
    label: 'Tag',
    color: '#dc3545',
  },
};

export const CustomColor: Story = {
  args: {
    label: 'Custom Color',
    color: '#ff6b6b',
  },
};

export const MultipleTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <ColorfulTag label="Fire" color="#EDC2C4" />
      <ColorfulTag label="Water" color="#CBD5ED" />
      <ColorfulTag label="Grass" color="#C0D4C8" />
      <ColorfulTag label="Electric" color="#E2E2A0" />
      <ColorfulTag label="Psychic" color="#DDC0CF" />
      <ColorfulTag label="Dark" color="#C6C5E3" />
    </div>
  ),
};
