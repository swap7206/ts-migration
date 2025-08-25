import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EvolutionChainCard from './evolutionChainCard';

// Mock CSS imports
jest.mock('./evolutionChainCard.scss', () => ({}));

describe('EvolutionChainCard', () => {
  it('renders with evolution chain data', () => {
    const mockEvolutionChain = {
      id: 1,
      chain: {
        species: { name: 'bulbasaur' },
        evolves_to: []
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders without evolution chain data', () => {
    render(<EvolutionChainCard />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
    expect(screen.getByText('No evolution chain data available')).toBeInTheDocument();
  });

  it('renders with null evolution chain', () => {
    render(<EvolutionChainCard evolutionChain={null} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
    expect(screen.getByText('No evolution chain data available')).toBeInTheDocument();
  });

  it('renders with undefined evolution chain', () => {
    render(<EvolutionChainCard evolutionChain={undefined} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
    expect(screen.getByText('No evolution chain data available')).toBeInTheDocument();
  });

  it('renders with evolution chain without id', () => {
    const mockEvolutionChain = {
      chain: {
        species: { name: 'bulbasaur' },
        evolves_to: []
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: undefined')).toBeInTheDocument();
  });

  it('renders with evolution chain without chain property', () => {
    const mockEvolutionChain = {
      id: 1
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.queryByText('Chain data available')).not.toBeInTheDocument();
  });

  it('renders with empty evolution chain object', () => {
    const mockEvolutionChain = {};
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: undefined')).toBeInTheDocument();
  });

  it('renders with evolution chain with zero id', () => {
    const mockEvolutionChain = { id: 0 };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 0')).toBeInTheDocument();
  });

  it('renders with evolution chain with negative id', () => {
    const mockEvolutionChain = { id: -1 };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: -1')).toBeInTheDocument();
  });

  it('renders with evolution chain with decimal id', () => {
    const mockEvolutionChain = { id: 1.5 };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1.5')).toBeInTheDocument();
  });

  it('renders with evolution chain with string id', () => {
    const mockEvolutionChain = { id: 'test-id' };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: test-id')).toBeInTheDocument();
  });

  it('renders with evolution chain with null id', () => {
    const mockEvolutionChain = { id: null };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: null')).toBeInTheDocument();
  });

  it('renders with evolution chain with undefined id', () => {
    const mockEvolutionChain = { id: undefined };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: undefined')).toBeInTheDocument();
  });

  it('renders with evolution chain with empty string id', () => {
    const mockEvolutionChain = { id: '' };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText(/Evolution Chain ID:/)).toBeInTheDocument();
  });

  it('renders with evolution chain with boolean id', () => {
    const mockEvolutionChain = { id: true };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: true')).toBeInTheDocument();
  });

  it('renders with evolution chain with array id', () => {
    const mockEvolutionChain = { id: [1, 2, 3] };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText(/Evolution Chain ID:/)).toBeInTheDocument();
    expect(screen.getByText(/\[1,2,3\]/)).toBeInTheDocument();
  });

  it('renders with evolution chain with object id', () => {
    const mockEvolutionChain = { id: { key: 'value' } };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: {"key":"value"}')).toBeInTheDocument();
  });

  it('renders with evolution chain with null chain', () => {
    const mockEvolutionChain = { id: 1, chain: null };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.queryByText('Chain data available')).not.toBeInTheDocument();
  });

  it('renders with evolution chain with undefined chain', () => {
    const mockEvolutionChain = { id: 1, chain: undefined };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.queryByText('Chain data available')).not.toBeInTheDocument();
  });

  it('renders with evolution chain with empty chain object', () => {
    const mockEvolutionChain = { id: 1, chain: {} };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with evolution chain with complex chain structure', () => {
    const mockEvolutionChain = {
      id: 1,
      chain: {
        species: { name: 'bulbasaur' },
        evolves_to: [
          {
            species: { name: 'ivysaur' },
            evolves_to: [
              {
                species: { name: 'venusaur' },
                evolves_to: []
              }
            ]
          }
        ]
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<EvolutionChainCard className="custom-class" />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'custom-class');
  });

  it('renders without custom className', () => {
    render(<EvolutionChainCard />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card');
  });

  it('renders with empty string className', () => {
    render(<EvolutionChainCard className="" />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', '');
  });

  it('renders with whitespace className', () => {
    render(<EvolutionChainCard className="   " />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', '   ');
  });

  it('renders with multiple class names', () => {
    render(<EvolutionChainCard className="class1 class2 class3" />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'class1 class2 class3');
  });

  it('renders with special characters in className', () => {
    render(<EvolutionChainCard className="class-with-dashes_and_underscores" />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'class-with-dashes_and_underscores');
  });

  it('renders with numbers in className', () => {
    render(<EvolutionChainCard className="class123" />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'class123');
  });

  it('renders with very long className', () => {
    const longClassName = 'a'.repeat(1000);
    render(<EvolutionChainCard className={longClassName} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', longClassName);
  });

  it('renders with null className', () => {
    render(<EvolutionChainCard className={null} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card');
  });

  it('renders with undefined className', () => {
    render(<EvolutionChainCard className={undefined} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card');
  });

  it('renders with boolean className', () => {
    render(<EvolutionChainCard className={true} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'true');
  });

  it('renders with number className', () => {
    render(<EvolutionChainCard className={123} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', '123');
  });

  it('renders with array className', () => {
    render(<EvolutionChainCard className={['class1', 'class2', 'class3']} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'class1 class2 class3');
  });

  it('renders with object className', () => {
    render(<EvolutionChainCard className={{ key: 'value' }} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', '{"key":"value"}');
  });

  it('renders with function className', () => {
    const functionClassName = () => 'function-class';
    render(<EvolutionChainCard className={functionClassName} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'function-class');
  });

  it('renders with malformed evolution chain data', () => {
    const mockEvolutionChain = {
      id: 'invalid-id',
      chain: 'not-an-object'
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: invalid-id')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with deeply nested evolution chain', () => {
    const mockEvolutionChain = {
      id: 1,
      chain: {
        species: { name: 'level1' },
        evolves_to: [
          {
            species: { name: 'level2' },
            evolves_to: [
              {
                species: { name: 'level3' },
                evolves_to: [
                  {
                    species: { name: 'level4' },
                    evolves_to: []
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with multiple evolution paths', () => {
    const mockEvolutionChain = {
      id: 1,
      chain: {
        species: { name: 'base' },
        evolves_to: [
          {
            species: { name: 'path1' },
            evolves_to: []
          },
          {
            species: { name: 'path2' },
            evolves_to: []
          }
        ]
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with circular evolution chain', () => {
    const mockEvolutionChain = {
      id: 1,
      chain: {
        species: { name: 'circular' },
        evolves_to: []
      }
    };
    
    // Create a circular reference
    mockEvolutionChain.chain.evolves_to.push(mockEvolutionChain.chain);
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with empty evolution chain array', () => {
    const mockEvolutionChain = {
      id: [],
      chain: {
        species: { name: 'empty-array-id' },
        evolves_to: []
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText(/Evolution Chain ID:/)).toBeInTheDocument();
    expect(screen.getByText(/\[\]/)).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with null evolution chain array', () => {
    const mockEvolutionChain = {
      id: null,
      chain: {
        species: { name: 'null-id' },
        evolves_to: []
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: null')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  it('renders with undefined evolution chain array', () => {
    const mockEvolutionChain = {
      id: undefined,
      chain: {
        species: { name: 'undefined-id' },
        evolves_to: []
      }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain ID: undefined')).toBeInTheDocument();
    expect(screen.getByText('Chain data available')).toBeInTheDocument();
  });

  // New tests to cover the uncovered lines
  it('handles JSON.stringify error in safeToString', () => {
    // Create an object that will cause JSON.stringify to fail
    const circularObject: any = {};
    circularObject.self = circularObject;
    
    const mockEvolutionChain = {
      id: circularObject,
      chain: { species: { name: 'test' } }
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    // Should handle the JSON.stringify error gracefully
    expect(screen.getByText('Evolution Chain ID: [object Object]')).toBeInTheDocument();
  });

  it('handles function className that throws error', () => {
    const mockEvolutionChain = { id: 1 };
    const throwingFunction = () => {
      throw new Error('Test error');
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} className={throwingFunction} />);
    
    // The component should render without crashing and use the base class
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
    expect(screen.getByText(/Evolution Chain ID:/)).toBeInTheDocument();
    
    // Check that the component rendered with the base class (fallback from catch block)
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card');
  });

  it('handles function className that throws error on execution', () => {
    const mockEvolutionChain = { id: 1 };
    // Create a function that throws when called
    const errorFunction = () => {
      const obj: any = {};
      return obj.nonExistentMethod(); // This will throw TypeError
    };
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} className={errorFunction} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
    expect(screen.getByText(/Evolution Chain ID:/)).toBeInTheDocument();
  });

  it('handles array className', () => {
    const mockEvolutionChain = { id: 1 };
    const arrayClassName = ['class1', 'class2', 'class3'];
    
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} className={arrayClassName} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
    expect(screen.getByText(/Evolution Chain ID:/)).toBeInTheDocument();
  });

  it('handles array className with mixed types', () => {
    const arrayClassName = ['class1', null, undefined, 'class2', 123, true];
    
    render(<EvolutionChainCard className={arrayClassName} />);
    
    const container = screen.getByText('Evolution Chain').closest('div');
    expect(container).toHaveClass('evolution-chain-card', 'class1 class2 123 true');
  });
});
