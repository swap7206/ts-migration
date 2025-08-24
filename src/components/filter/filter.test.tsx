import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock RSuite components
jest.mock('rsuite', () => ({
  Row: ({ children, ...props }: any) => <div data-testid="row" {...props}>{children}</div>,
  Col: ({ children, ...props }: any) => <div data-testid="col" {...props}>{children}</div>,
  Input: ({ placeholder, className, onChange, ...props }: any) => (
    <input 
      data-testid="search-input"
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      {...props}
    />
  ),
  InputGroup: ({ children, ...props }: any) => (
    <div data-testid="input-group" {...props}>
      {children}
    </div>
  ),
  'InputGroup.Button': ({ children }: any) => (
    <button data-testid="search-button">
      {children}
    </button>
  ),
  CheckPicker: ({ data, placeholder, onChange, ...props }: any) => (
    <div data-testid="check-picker" {...props}>
      <input 
        data-testid="check-picker-input"
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <div data-testid="check-picker-data">
        {data?.map((item: any, index: number) => (
          <div key={index} data-testid={`option-${item.value}`}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}));

// Mock the search icon
jest.mock('@rsuite/icons/Search', () => {
  return function SearchIcon() {
    return <span data-testid="search-icon">🔍</span>;
  };
});

// Mock RxJS
jest.mock('rxjs', () => ({
  debounceTime: jest.fn(() => ({
    pipe: jest.fn(() => ({
      subscribe: jest.fn()
    }))
  })),
  distinctUntilChanged: jest.fn(() => ({
    pipe: jest.fn(() => ({
      subscribe: jest.fn()
    }))
  }))
}));

import AppFilter from './filter';

describe('AppFilter', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnTypeChange = jest.fn();
  const mockOnGenderChange = jest.fn();

  const mockTypeData = [
    { label: 'Fire', value: 'fire' },
    { label: 'Water', value: 'water' },
    { label: 'Grass', value: 'grass' },
  ];

  const mockGenderData = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter components', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        onTypeChange={mockOnTypeChange}
        onGenderChange={mockOnGenderChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getAllByTestId('check-picker')).toHaveLength(2); // Type and Gender
  });

  it('renders with default props', () => {
    render(<AppFilter />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Search...');
  });

  it('calls onSearchChange when search input changes', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('pikachu');
  });

  it('calls onTypeChange when type selection changes', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        onTypeChange={mockOnTypeChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const typePicker = screen.getAllByTestId('check-picker')[0];
    const typeInput = typePicker.querySelector('input');
    
    if (typeInput) {
      fireEvent.change(typeInput, { target: { value: 'fire' } });
      expect(mockOnTypeChange).toHaveBeenCalledWith('fire');
    }
  });

  it('calls onGenderChange when gender selection changes', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        onGenderChange={mockOnGenderChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const genderPicker = screen.getAllByTestId('check-picker')[1];
    const genderInput = genderPicker.querySelector('input');
    
    if (genderInput) {
      fireEvent.change(genderInput, { target: { value: 'male' } });
      expect(mockOnGenderChange).toHaveBeenCalledWith('male');
    }
  });

  it('renders type options correctly', () => {
    render(
      <AppFilter 
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    expect(screen.getByTestId('option-fire')).toBeInTheDocument();
    expect(screen.getByTestId('option-water')).toBeInTheDocument();
    expect(screen.getByTestId('option-grass')).toBeInTheDocument();
  });

  it('renders gender options correctly', () => {
    render(
      <AppFilter 
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    expect(screen.getByTestId('option-male')).toBeInTheDocument();
    expect(screen.getByTestId('option-female')).toBeInTheDocument();
  });

  it('handles empty type data', () => {
    render(
      <AppFilter 
        typeData={[]}
        genderData={mockGenderData}
      />
    );

    expect(screen.queryByTestId('option-fire')).not.toBeInTheDocument();
  });

  it('handles empty gender data', () => {
    render(
      <AppFilter 
        typeData={mockTypeData}
        genderData={[]}
      />
    );

    expect(screen.queryByTestId('option-male')).not.toBeInTheDocument();
  });

  it('handles undefined callback functions', () => {
    render(
      <AppFilter 
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Should not throw an error
    expect(searchInput).toBeInTheDocument();
  });

  it('handles search input with special characters', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'pikachu-123' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('pikachu-123');
  });

  it('handles search input with numbers', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '123' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('123');
  });

  it('handles search input with empty string', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('');
  });

  it('handles search input with whitespace', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '  pikachu  ' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('  pikachu  ');
  });

  it('handles multiple rapid search changes', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    
    fireEvent.change(searchInput, { target: { value: 'p' } });
    fireEvent.change(searchInput, { target: { value: 'pi' } });
    fireEvent.change(searchInput, { target: { value: 'pik' } });
    fireEvent.change(searchInput, { target: { value: 'pika' } });
    fireEvent.change(searchInput, { target: { value: 'pikac' } });
    fireEvent.change(searchInput, { target: { value: 'pikach' } });
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(7);
    expect(mockOnSearchChange).toHaveBeenLastCalledWith('pikachu');
  });

  it('handles type selection with multiple values', () => {
    render(
      <AppFilter 
        onTypeChange={mockOnTypeChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const typePicker = screen.getAllByTestId('check-picker')[0];
    const typeInput = typePicker.querySelector('input');
    
    if (typeInput) {
      fireEvent.change(typeInput, { target: { value: 'fire' } });
      fireEvent.change(typeInput, { target: { value: 'water' } });
      
      expect(mockOnTypeChange).toHaveBeenCalledWith('fire');
      expect(mockOnTypeChange).toHaveBeenCalledWith('water');
    }
  });

  it('handles gender selection with multiple values', () => {
    render(
      <AppFilter 
        onGenderChange={mockOnGenderChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const genderPicker = screen.getAllByTestId('check-picker')[1];
    const genderInput = genderPicker.querySelector('input');
    
    if (genderInput) {
      fireEvent.change(genderInput, { target: { value: 'male' } });
      fireEvent.change(genderInput, { target: { value: 'female' } });
      
      expect(mockOnGenderChange).toHaveBeenCalledWith('male');
      expect(mockOnGenderChange).toHaveBeenCalledWith('female');
    }
  });

  it('handles all filter changes simultaneously', () => {
    render(
      <AppFilter 
        onSearchChange={mockOnSearchChange}
        onTypeChange={mockOnTypeChange}
        onGenderChange={mockOnGenderChange}
        typeData={mockTypeData}
        genderData={mockGenderData}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    const typePicker = screen.getAllByTestId('check-picker')[0];
    const genderPicker = screen.getAllByTestId('check-picker')[1];
    
    const typeInput = typePicker.querySelector('input');
    const genderInput = genderPicker.querySelector('input');

    fireEvent.change(searchInput, { target: { value: 'charizard' } });
    
    if (typeInput) {
      fireEvent.change(typeInput, { target: { value: 'fire' } });
    }
    
    if (genderInput) {
      fireEvent.change(genderInput, { target: { value: 'male' } });
    }

    expect(mockOnSearchChange).toHaveBeenCalledWith('charizard');
    if (typeInput) {
      expect(mockOnTypeChange).toHaveBeenCalledWith('fire');
    }
    if (genderInput) {
      expect(mockOnGenderChange).toHaveBeenCalledWith('male');
    }
  });

  it('handles large type data arrays', () => {
    const largeTypeData = Array.from({ length: 100 }, (_, i) => ({
      label: `Type ${i}`,
      value: `type-${i}`
    }));

    render(
      <AppFilter 
        typeData={largeTypeData}
        genderData={mockGenderData}
      />
    );

    expect(screen.getByTestId('option-type-0')).toBeInTheDocument();
    expect(screen.getByTestId('option-type-99')).toBeInTheDocument();
  });

  it('handles large gender data arrays', () => {
    const largeGenderData = Array.from({ length: 50 }, (_, i) => ({
      label: `Gender ${i}`,
      value: `gender-${i}`
    }));

    render(
      <AppFilter 
        typeData={mockTypeData}
        genderData={largeGenderData}
      />
    );

    expect(screen.getByTestId('option-gender-0')).toBeInTheDocument();
    expect(screen.getByTestId('option-gender-49')).toBeInTheDocument();
  });

  it('handles type data with special characters in labels', () => {
    const specialTypeData = [
      { label: 'Fire & Flying', value: 'fire-flying' },
      { label: 'Water/Electric', value: 'water-electric' },
      { label: 'Grass (Special)', value: 'grass-special' }
    ];

    render(
      <AppFilter 
        typeData={specialTypeData}
        genderData={mockGenderData}
      />
    );

    expect(screen.getByTestId('option-fire-flying')).toBeInTheDocument();
    expect(screen.getByTestId('option-water-electric')).toBeInTheDocument();
    expect(screen.getByTestId('option-grass-special')).toBeInTheDocument();
  });

  it('handles gender data with special characters in labels', () => {
    const specialGenderData = [
      { label: 'Male (Primary)', value: 'male-primary' },
      { label: 'Female & Other', value: 'female-other' }
    ];

    render(
      <AppFilter 
        typeData={mockTypeData}
        genderData={specialGenderData}
      />
    );

    expect(screen.getByTestId('option-male-primary')).toBeInTheDocument();
    expect(screen.getByTestId('option-female-other')).toBeInTheDocument();
  });
});
