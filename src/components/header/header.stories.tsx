import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <h1>Default Header Content</h1>,
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <div>
        <h1>Pokédex</h1>
        <p>Search for any Pokémon that exists on the planet</p>
      </div>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    children: (
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Home</a></li>
          <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Pokemon</a></li>
          <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>About</a></li>
        </ul>
      </nav>
    ),
  },
};

export const WithLogo: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          backgroundColor: '#ff6b6b', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          P
        </div>
        <h1 style={{ margin: 0 }}>Pokédex</h1>
      </div>
    ),
  },
};

export const ComplexLayout: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#ff6b6b', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            P
          </div>
          <h1 style={{ margin: 0 }}>Pokédex</h1>
        </div>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
            <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Home</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Pokemon</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>About</a></li>
          </ul>
        </nav>
      </div>
    ),
  },
};
