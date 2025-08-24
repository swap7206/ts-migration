import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock RSuite components
jest.mock('rsuite', () => ({
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

import AppMultiSelectDropDown from './multiSelectdropDown';

describe('AppMultiSelectDropDown', () => {
  const mockData = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  it('renders with default props', () => {
    render(<AppMultiSelectDropDown data={mockData} />);
    
    const checkPicker = screen.getByTestId('check-picker');
    expect(checkPicker).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<AppMultiSelectDropDown data={mockData} placeholder="Select options" />);
    
    const input = screen.getByTestId('check-picker-input');
    expect(input).toHaveAttribute('placeholder', 'Select options');
  });

  it('renders with label', () => {
    render(<AppMultiSelectDropDown data={mockData} label="Test Label" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<AppMultiSelectDropDown data={mockData} className="custom-class" />);
    
    const checkPicker = screen.getByTestId('check-picker');
    expect(checkPicker).toHaveClass('custom-class');
  });

  it('calls onChange when selection changes', () => {
    const mockOnChange = jest.fn();
    render(<AppMultiSelectDropDown data={mockData} onChangeHandler={mockOnChange} />);
    
    const input = screen.getByTestId('check-picker-input');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('renders with isOpen prop', () => {
    render(<AppMultiSelectDropDown data={mockData} isOpen={true} />);
    
    const checkPicker = screen.getByTestId('check-picker');
    expect(checkPicker).toBeInTheDocument();
  });

  it('renders data options', () => {
    render(<AppMultiSelectDropDown data={mockData} />);
    
    expect(screen.getByTestId('option-option1')).toBeInTheDocument();
    expect(screen.getByTestId('option-option2')).toBeInTheDocument();
    expect(screen.getByTestId('option-option3')).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    render(<AppMultiSelectDropDown data={[]} />);
    
    const checkPicker = screen.getByTestId('check-picker');
    expect(checkPicker).toBeInTheDocument();
  });
});
