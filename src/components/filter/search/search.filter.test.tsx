import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFilter from './search.filter';

describe('SearchFilter', () => {
  it('renders with default props', () => {
    render(<SearchFilter />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('renders with custom placeholder', () => {
    render(<SearchFilter placeholder="Search Pokemon" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Search Pokemon');
  });

  it('renders with custom input class', () => {
    render(<SearchFilter inputClass="custom-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('renders with label', () => {
    render(<SearchFilter label="Search Label" />);
    
    expect(screen.getByText('Search Label')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const mockOnChange = jest.fn();
    render(<SearchFilter onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('renders with initial value', () => {
    render(<SearchFilter value="initial value" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial value');
  });

  it('applies custom className to wrapper', () => {
    render(<SearchFilter className="custom-wrapper" />);
    
    const wrapper = screen.getByRole('textbox').closest('div');
    expect(wrapper).toHaveClass('custom-wrapper');
  });
});
