import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorfulTag from './colorfulTag.js';

describe('ColorfulTag', () => {
  it('renders with basic props', () => {
    render(<ColorfulTag text="Fire" type="fire" />);
    
    expect(screen.getByText('Fire')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(<ColorfulTag text="Water" type="water" className="custom-class" />);
    
    expect(container.firstChild.firstChild).toHaveClass('custom-class');
  });

  it('renders without className', () => {
    render(<ColorfulTag text="Grass" type="grass" />);
    
    const tag = screen.getByText('Grass');
    expect(tag).toHaveClass('colorful-tag');
  });

  it('renders with empty className', () => {
    render(<ColorfulTag text="Electric" type="electric" className="" />);
    
    const tag = screen.getByText('Electric');
    expect(tag).toHaveClass('colorful-tag');
  });

  it('renders with null className', () => {
    render(<ColorfulTag text="Ice" type="ice" className={null} />);
    
    const tag = screen.getByText('Ice');
    expect(tag).toHaveClass('colorful-tag');
  });

  it('renders with undefined className', () => {
    render(<ColorfulTag text="Fighting" type="fighting" className={undefined} />);
    
    const tag = screen.getByText('Fighting');
    expect(tag).toHaveClass('colorful-tag');
  });

  it('renders with different types', () => {
    render(<ColorfulTag text="Poison" type="poison" />);
    
    expect(screen.getByText('Poison')).toBeInTheDocument();
  });

  it('renders with ground type', () => {
    render(<ColorfulTag text="Ground" type="ground" />);
    
    expect(screen.getByText('Ground')).toBeInTheDocument();
  });

  it('renders with flying type', () => {
    render(<ColorfulTag text="Flying" type="flying" />);
    
    expect(screen.getByText('Flying')).toBeInTheDocument();
  });

  it('renders with psychic type', () => {
    render(<ColorfulTag text="Psychic" type="psychic" />);
    
    expect(screen.getByText('Psychic')).toBeInTheDocument();
  });

  it('renders with bug type', () => {
    render(<ColorfulTag text="Bug" type="bug" />);
    
    expect(screen.getByText('Bug')).toBeInTheDocument();
  });

  it('renders with rock type', () => {
    render(<ColorfulTag text="Rock" type="rock" />);
    
    expect(screen.getByText('Rock')).toBeInTheDocument();
  });

  it('renders with ghost type', () => {
    render(<ColorfulTag text="Ghost" type="ghost" />);
    
    expect(screen.getByText('Ghost')).toBeInTheDocument();
  });

  it('renders with steel type', () => {
    render(<ColorfulTag text="Steel" type="steel" />);
    
    expect(screen.getByText('Steel')).toBeInTheDocument();
  });

  it('renders with dragon type', () => {
    render(<ColorfulTag text="Dragon" type="dragon" />);
    
    expect(screen.getByText('Dragon')).toBeInTheDocument();
  });

  it('renders with dark type', () => {
    render(<ColorfulTag text="Dark" type="dark" />);
    
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('renders with fairy type', () => {
    render(<ColorfulTag text="Fairy" type="fairy" />);
    
    expect(screen.getByText('Fairy')).toBeInTheDocument();
  });

  it('renders with unknown type', () => {
    render(<ColorfulTag text="Unknown" type="unknown" />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('renders with null type', () => {
    render(<ColorfulTag text="Null Type" type={null} />);
    
    expect(screen.getByText('Null Type')).toBeInTheDocument();
  });

  it('renders with undefined type', () => {
    render(<ColorfulTag text="Undefined Type" type={undefined} />);
    
    expect(screen.getByText('Undefined Type')).toBeInTheDocument();
  });

  it('renders with empty text', () => {
    render(<ColorfulTag text="" type="normal" />);
    
    const tag = screen.getByTestId('colorful-tag');
    expect(tag).toBeInTheDocument();
  });

  it('renders with null text', () => {
    render(<ColorfulTag text={null} type="normal" />);
    
    const tag = screen.getByTestId('colorful-tag');
    expect(tag).toBeInTheDocument();
  });

  it('renders with undefined text', () => {
    render(<ColorfulTag text={undefined} type="normal" />);
    
    const tag = screen.getByTestId('colorful-tag');
    expect(tag).toBeInTheDocument();
  });

  it('renders with special characters in text', () => {
    render(<ColorfulTag text="Fire & Ice" type="fire" />);
    
    expect(screen.getByText('Fire & Ice')).toBeInTheDocument();
  });

  it('renders with numbers in text', () => {
    render(<ColorfulTag text="Type 1" type="normal" />);
    
    expect(screen.getByText('Type 1')).toBeInTheDocument();
  });

  it('renders with uppercase text', () => {
    render(<ColorfulTag text="ELECTRIC" type="electric" />);
    
    expect(screen.getByText('ELECTRIC')).toBeInTheDocument();
  });

  it('renders with lowercase text', () => {
    render(<ColorfulTag text="water" type="water" />);
    
    expect(screen.getByText('water')).toBeInTheDocument();
  });

  it('renders with mixed case text', () => {
    render(<ColorfulTag text="GrAsS" type="grass" />);
    
    expect(screen.getByText('GrAsS')).toBeInTheDocument();
  });

  it('renders with long text', () => {
    const longText = 'This is a very long type name that should still be displayed properly';
    render(<ColorfulTag text={longText} type="normal" />);
    
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('renders with short text', () => {
    render(<ColorfulTag text="A" type="normal" />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders with whitespace in text', () => {
    render(<ColorfulTag text="  Fire Type  " type="fire" />);
    
    expect(screen.getByText(/Fire Type/)).toBeInTheDocument();
  });

  it('renders with multiple spaces in text', () => {
    render(<ColorfulTag text="Fire    Type" type="fire" />);
    
    expect(screen.getByText(/Fire.*Type/)).toBeInTheDocument();
  });
});
