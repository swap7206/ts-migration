import type { Meta, StoryObj } from '@storybook/react';
import Apploader from './loader';

const meta: Meta<typeof Apploader> = {
  title: 'Components/Loader',
  component: Apploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
    className: '',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-loader',
  },
};

export const AppLoader: Story = {
  args: {
    className: 'app-loader-wrapper',
  },
};

export const LoadMoreLoader: Story = {
  args: {
    className: 'loadmore-loader',
  },
};

export const CenteredLoader: Story = {
  args: {
    className: 'centered-loader',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}>
        <Story />
      </div>
    ),
  ],
};

export const FullScreenLoader: Story = {
  args: {
    className: 'fullscreen-loader',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999
      }}>
        <Story />
      </div>
    ),
  ],
};
