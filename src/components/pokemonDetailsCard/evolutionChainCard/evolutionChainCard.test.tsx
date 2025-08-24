import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EvolutionChainCard from './evolutionChainCard';

describe('EvolutionChainCard', () => {
  const mockEvolutionChain = {
    id: 1,
    baby_trigger_item: null,
    chain: {
      evolution_details: [],
      evolves_to: [
        {
          evolution_details: [
            {
              gender: null,
              held_item: null,
              item: null,
              known_move: null,
              known_move_type: null,
              location: null,
              min_affection: null,
              min_beauty: null,
              min_happiness: null,
              min_level: 16,
              needs_overworld_rain: false,
              party_species: null,
              party_type: null,
              relative_physical_stats: null,
              time_of_day: '',
              trade_species: null,
              trigger: {
                name: 'level-up',
                url: 'https://pokeapi.co/api/v2/evolution-trigger/1/'
              },
              turn_upside_down: false
            }
          ],
          evolves_to: [
            {
              evolution_details: [
                {
                  gender: null,
                  held_item: null,
                  item: null,
                  known_move: null,
                  known_move_type: null,
                  location: null,
                  min_affection: null,
                  min_beauty: null,
                  min_happiness: null,
                  min_level: 32,
                  needs_overworld_rain: false,
                  party_species: null,
                  party_type: null,
                  relative_physical_stats: null,
                  time_of_day: '',
                  trade_species: null,
                  trigger: {
                    name: 'level-up',
                    url: 'https://pokeapi.co/api/v2/evolution-trigger/1/'
                  },
                  turn_upside_down: false
                }
              ],
              evolves_to: [],
              is_baby: false,
              species: {
                name: 'venusaur',
                url: 'https://pokeapi.co/api/v2/pokemon-species/3/'
              }
            }
          ],
          is_baby: false,
          species: {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon-species/2/'
          }
        }
      ],
      is_baby: false,
      species: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
      }
    }
  };

  it('renders with evolution chain data', () => {
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
  });

  it('renders evolution chain title', () => {
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    const titleElement = screen.getByText('Evolution Chain');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('evolution-title');
  });

  it('renders with custom className', () => {
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} className="custom-class" />);
    
    const container = screen.getByText('Evolution Chain').closest('.evolution-chain-card');
    expect(container).toHaveClass('custom-class');
  });

  it('renders with empty evolution chain', () => {
    const emptyChain = {
      id: 1,
      baby_trigger_item: null,
      chain: {
        evolution_details: [],
        evolves_to: [],
        is_baby: false,
        species: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
        }
      }
    };
    
    render(<EvolutionChainCard evolutionChain={emptyChain} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
  });

  it('renders with complex evolution chain', () => {
    render(<EvolutionChainCard evolutionChain={mockEvolutionChain} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
  });

  it('renders without evolution chain data', () => {
    render(<EvolutionChainCard />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
  });

  it('renders with null evolution chain', () => {
    render(<EvolutionChainCard evolutionChain={null} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
  });

  it('renders with undefined evolution chain', () => {
    render(<EvolutionChainCard evolutionChain={undefined} />);
    
    expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
  });
});
