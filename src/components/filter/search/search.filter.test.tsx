import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock RSuite components
jest.mock('rsuite', () => {
  const MockInputGroup = ({ children, inside, ...props }: any) => (
    <div data-testid="input-group" {...props}>
      {children}
    </div>
  );
  
  MockInputGroup.Button = ({ children }: any) => (
    <button data-testid="search-button">
      {children}
    </button>
  );

  return {
    Input: ({ placeholder, className, onChange, size, ...props }: any) => (
      <input 
        data-testid="search-input"
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        {...props}
      />
    ),
    InputGroup: MockInputGroup
  };
});

// Mock the search icon
jest.mock('@rsuite/icons/Search', () => {
  return function SearchIcon() {
    return <span data-testid="search-icon">🔍</span>;
  };
});

import SearchFilter from './search.filter';

describe('SearchFilter', () => {
  it('renders with default props', () => {
    render(<SearchFilter />);
    
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchFilter placeholder="Search Pokemon" />);
    
    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('placeholder', 'Search Pokemon');
  });

  it('renders with custom input class', () => {
    render(<SearchFilter inputClass="custom-input" />);
    
    const input = screen.getByTestId('search-input');
    expect(input).toHaveClass('custom-input');
  });

  it('renders with label', () => {
    render(<SearchFilter label="Search Label" />);
    
    expect(screen.getByText('Search Label')).toBeInTheDocument();
  });

  it('calls onChangeHandler when input value changes', () => {
    const mockOnChangeHandler = jest.fn();
    render(<SearchFilter onChangeHandler={mockOnChangeHandler} />);
    
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnChangeHandler).toHaveBeenCalledWith(expect.any(Object));
  });

  it('renders search button with icon', () => {
    render(<SearchFilter />);
    
    const button = screen.getByTestId('search-button');
    const icon = screen.getByTestId('search-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('renders input group structure', () => {
    render(<SearchFilter />);
    
    const inputGroup = screen.getByTestId('input-group');
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');
    
    expect(inputGroup).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
