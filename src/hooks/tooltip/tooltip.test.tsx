import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock RSuite components
jest.mock('rsuite', () => ({
  Whisper: ({ children, placement, speaker }: any) => (
    <div data-testid="whisper" data-placement={placement}>
      <div data-testid="whisper-trigger" onClick={() => {}}>
        {children}
      </div>
      <div data-testid="whisper-speaker">
        {speaker}
      </div>
    </div>
  ),
  Popover: ({ children, className }: any) => (
    <div data-testid="popover" className={className}>
      {children}
    </div>
  )
}));

import AppTooltip from './tooltip';

describe('AppTooltip', () => {
  it('renders with default props', () => {
    render(<AppTooltip data="Test tooltip content" />);
    
    const whisper = screen.getByTestId('whisper');
    expect(whisper).toBeInTheDocument();
    expect(whisper).toHaveAttribute('data-placement', 'top');
  });

  it('renders with custom placement', () => {
    render(<AppTooltip data="Test content" placement="bottom" />);
    
    const whisper = screen.getByTestId('whisper');
    expect(whisper).toHaveAttribute('data-placement', 'bottom');
  });

  it('renders with custom name', () => {
    render(<AppTooltip data="Test content" name="Custom Name" />);
    
    expect(screen.getByText('Custom Name')).toBeInTheDocument();
  });

  it('renders with default name when not provided', () => {
    render(<AppTooltip data="Test content" />);
    
    expect(screen.getByText('Click for more info')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<AppTooltip data="Test content" className="custom-class" />);
    
    const span = screen.getByText('Click for more info');
    expect(span).toHaveClass('custom-class');
  });

  it('renders with custom tooltipClass', () => {
    render(<AppTooltip data="Test content" tooltipClass="custom-tooltip" />);
    
    const popover = screen.getByTestId('popover');
    expect(popover).toHaveClass('custom-tooltip');
  });

  it('renders tooltip content', () => {
    render(<AppTooltip data="Test tooltip content" />);
    
    const popover = screen.getByTestId('popover');
    expect(popover).toHaveTextContent('Test tooltip content');
  });

  it('renders with different placement options', () => {
    const { rerender } = render(<AppTooltip data="Test" placement="left" />);
    expect(screen.getByTestId('whisper')).toHaveAttribute('data-placement', 'left');
    
    rerender(<AppTooltip data="Test" placement="right" />);
    expect(screen.getByTestId('whisper')).toHaveAttribute('data-placement', 'right');
  });
});
