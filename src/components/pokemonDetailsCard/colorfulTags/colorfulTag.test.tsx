import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the CSS import
jest.mock('./colorfulTags.scss', () => ({}));

// Mock the getPokcolor function with actual values
jest.mock('../../../constants/pokemon.types', () => ({
  getPokcolor: jest.fn((type) => {
    if (type === 'fire') return '#EDC2C4';
    return '#C0DFDD'; // unknown color
  })
}));

import ColorfulTag from './colorfulTag';

describe('ColorfulTag', () => {
  it('renders with default props', () => {
    render(<ColorfulTag text="Test Tag" />);
    
    // Check if the text is rendered
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
    
    // Check if the element has the correct class
    const tag = screen.getByText('Test Tag');
    expect(tag).toHaveClass('colorful-tag');
  });

  it('renders with custom className', () => {
    render(<ColorfulTag text="Custom Tag" className="custom-class" />);
    
    const wrapper = screen.getByText('Custom Tag').closest('div');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('renders with type prop', () => {
    render(<ColorfulTag text="Type Tag" type="fire" />);
    
    const tag = screen.getByText('Type Tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('colorful-tag');
  });

  it('renders without type prop', () => {
    render(<ColorfulTag text="No Type Tag" />);
    
    const tag = screen.getByText('No Type Tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('colorful-tag');
  });
});
