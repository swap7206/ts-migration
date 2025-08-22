import type { Meta, StoryObj } from '@storybook/react';
import AppTooltip from './tooltip';

const meta: Meta<typeof AppTooltip> = {
  title: 'Components/Tooltip',
  component: AppTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'topStart', 'topEnd', 'bottomStart', 'bottomEnd', 'leftStart', 'leftEnd', 'rightStart', 'rightEnd'],
      description: 'Position of the tooltip',
    },
    data: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    className: {
      control: 'text',
      description: 'CSS class for the trigger element',
    },
    name: {
      control: 'text',
      description: 'Text to display as the trigger',
    },
    tooltipClass: {
      control: 'text',
      description: 'CSS class for the tooltip popover',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placement: 'bottom',
    data: 'This is a default tooltip with some helpful information.',
    className: 'tooltip-trigger',
    name: 'Hover me',
    tooltipClass: 'custom-tooltip',
  },
};

export const TopPlacement: Story = {
  args: {
    placement: 'top',
    data: 'Tooltip appears above the trigger element.',
    className: 'tooltip-trigger',
    name: 'Top Tooltip',
    tooltipClass: 'custom-tooltip',
  },
};

export const LeftPlacement: Story = {
  args: {
    placement: 'left',
    data: 'Tooltip appears to the left of the trigger element.',
    className: 'tooltip-trigger',
    name: 'Left Tooltip',
    tooltipClass: 'custom-tooltip',
  },
};

export const RightPlacement: Story = {
  args: {
    placement: 'right',
    data: 'Tooltip appears to the right of the trigger element.',
    className: 'tooltip-trigger',
    name: 'Right Tooltip',
    tooltipClass: 'custom-tooltip',
  },
};

export const LongContent: Story = {
  args: {
    placement: 'bottom',
    data: 'This is a very long tooltip content that might wrap to multiple lines. It contains a lot of information that the user might need to understand the context of the element they are hovering over.',
    className: 'tooltip-trigger',
    name: 'Long Tooltip',
    tooltipClass: 'custom-tooltip',
  },
};

export const ShortContent: Story = {
  args: {
    placement: 'bottom',
    data: 'Short',
    className: 'tooltip-trigger',
    name: 'Short Tooltip',
    tooltipClass: 'custom-tooltip',
  },
};

export const WithHTMLContent: Story = {
  args: {
    placement: 'bottom',
    data: (
      <div>
        <h4>Pokemon Information</h4>
        <p><strong>Name:</strong> Bulbasaur</p>
        <p><strong>Type:</strong> Grass/Poison</p>
        <p><strong>Height:</strong> 0.7m</p>
        <p><strong>Weight:</strong> 6.9kg</p>
      </div>
    ),
    className: 'tooltip-trigger',
    name: 'Pokemon Info',
    tooltipClass: 'custom-tooltip',
  },
};

export const CustomStyling: Story = {
  args: {
    placement: 'bottom',
    data: 'This tooltip has custom styling applied.',
    className: 'custom-trigger',
    name: 'Custom Styled',
    tooltipClass: 'custom-tooltip-popover',
  },
  decorators: [
    (Story) => (
      <div>
        <style>
          {`
            .custom-trigger {
              background-color: #007bff;
              color: white;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              border: none;
            }
            .custom-trigger:hover {
              background-color: #0056b3;
            }
            .custom-tooltip-popover {
              background-color: #333;
              color: white;
              border-radius: 8px;
              padding: 12px;
              max-width: 300px;
            }
          `}
        </style>
        <Story />
      </div>
    ),
  ],
};

export const MultipleTooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <AppTooltip
        placement="top"
        data="This tooltip appears on top"
        className="tooltip-trigger"
        name="Top"
        tooltipClass="custom-tooltip"
      />
      <AppTooltip
        placement="bottom"
        data="This tooltip appears below"
        className="tooltip-trigger"
        name="Bottom"
        tooltipClass="custom-tooltip"
      />
      <AppTooltip
        placement="left"
        data="This tooltip appears on the left"
        className="tooltip-trigger"
        name="Left"
        tooltipClass="custom-tooltip"
      />
      <AppTooltip
        placement="right"
        data="This tooltip appears on the right"
        className="tooltip-trigger"
        name="Right"
        tooltipClass="custom-tooltip"
      />
    </div>
  ),
};
