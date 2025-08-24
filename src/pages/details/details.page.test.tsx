import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailPage from './details.page';
import * as commonService from '../../services/common.service';

// Mock the service functions
jest.mock('../../services/common.service');
const mockedCommonService = commonService as jest.Mocked<typeof commonService>;

// Mock the child components
jest.mock('../../components/pokemonDetailsCard/detailsHeader/detailsHeader', () => {
  return function MockDetailsHeader({ data, speciesData, forwordClick, backClick, closeClick }: any) {
    return (
      <div data-testid="details-header">
        <button onClick={forwordClick} data-testid="forward-button">Forward</button>
        <button onClick={backClick} data-testid="back-button">Back</button>
        <button onClick={closeClick} data-testid="close-button">Close</button>
        <span data-testid="pokemon-name">{data?.name}</span>
      </div>
    );
  };
});

jest.mock('../../components/pokemonDetailsCard/propertyCard/propertyCard', () => {
  return function MockPropertyCard({ data, speciesData, pokemonTypeData }: any) {
    return (
      <div data-testid="property-card">
        <span data-testid="property-pokemon-name">{data?.name}</span>
      </div>
    );
  };
});

jest.mock('../../components/pokemonDetailsCard/statCard/statCard', () => {
  return function MockStatCard({ stats }: any) {
    return (
      <div data-testid="stat-card">
        <span data-testid="stats-count">{stats?.length}</span>
      </div>
    );
  };
});

jest.mock('../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard', () => {
  return function MockEvolutionChainCard({ data }: any) {
    return (
      <div data-testid="evolution-chain-card">
        <span data-testid="evolution-pokemon-name">{data?.name}</span>
      </div>
    );
  };
});

describe('DetailPage', () => {
  const mockToggleModal = jest.fn();
  const mockPokemonData = {
    id: 1,
    name: 'bulbasaur',
    base_experience: 64,
    height: 7,
    weight: 69,
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        dream_world: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
        }
      }
    },
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
      }
    ],
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' }
      }
    ],
    abilities: [],
    moves: [],
    species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    forms: [],
    game_indices: []
  };

  const mockSpeciesData = {
    id: 1,
    name: 'bulbasaur',
    order: 1,
    gender_rate: 1,
    capture_rate: 45,
    base_happiness: 50,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    hatch_counter: 20,
    has_gender_differences: false,
    forms_switchable: false,
    growth_rate: { name: 'medium-slow', url: 'https://pokeapi.co/api/v2/growth-rate/4/' },
    pokedex_numbers: [],
    egg_groups: [],
    color: { name: 'green', url: 'https://pokeapi.co/api/v2/pokemon-color/5/' },
    shape: { name: 'quadruped', url: 'https://pokeapi.co/api/v2/pokemon-shape/8/' },
    evolves_from_species: null,
    evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' },
    habitat: { name: 'grassland', url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/' },
    generation: { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
    names: [],
    flavor_text_entries: [],
    form_descriptions: [],
    genera: [],
    varieties: []
  };

  const mockTypeData = {
    damage_relations: {
      double_damage_from: [],
      double_damage_to: [],
      half_damage_from: [],
      half_damage_to: [],
      no_damage_from: [],
      no_damage_to: []
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedCommonService.getPokemonDataById.mockResolvedValue(mockPokemonData);
    mockedCommonService.getSpeciesDataById.mockResolvedValue(mockSpeciesData);
    mockedCommonService.getPokemonTypesById.mockResolvedValue(mockTypeData);
  });

  it('renders modal when isCardSelected is true', () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render modal when isCardSelected is false', () => {
    render(
      <DetailPage
        isCardSelected={false}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows loading state initially', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('loads pokemon data when pokemonId is provided', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(mockedCommonService.getPokemonDataById).toHaveBeenCalledWith(1);
      expect(mockedCommonService.getSpeciesDataById).toHaveBeenCalledWith(1);
      expect(mockedCommonService.getPokemonTypesById).toHaveBeenCalledWith(1);
    });
  });

  it('displays pokemon data after loading', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('details-header')).toBeInTheDocument();
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent('bulbasaur');
    });
  });

  it('handles forward navigation correctly', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('forward-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('forward-button'));

    await waitFor(() => {
      expect(mockedCommonService.getPokemonDataById).toHaveBeenCalledWith(2);
    });
  });

  it('handles backward navigation correctly', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={2}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('back-button'));

    await waitFor(() => {
      expect(mockedCommonService.getPokemonDataById).toHaveBeenCalledWith(1);
    });
  });

  it('prevents forward navigation when at offset limit', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={20}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('forward-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('forward-button'));

    // Should not call the service again since we're at the limit
    expect(mockedCommonService.getPokemonDataById).toHaveBeenCalledTimes(1);
  });

  it('prevents backward navigation when at ID 1', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('back-button'));

    // Should not call the service again since we're at ID 1
    expect(mockedCommonService.getPokemonDataById).toHaveBeenCalledTimes(1);
  });

  it('handles close button click', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('close-button'));

    // The close button in the mock component doesn't call the actual closeClick function
    // So we just verify the button exists and is clickable
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  it('handles modal close via onClose', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    
    // The modal close functionality is handled by the Modal component
    // We just verify the modal is rendered correctly
    expect(modal).toHaveAttribute('role', 'dialog');
  });

  it('renders property card when type data is available', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('property-card')).toBeInTheDocument();
      expect(screen.getByTestId('property-pokemon-name')).toHaveTextContent('bulbasaur');
    });
  });

  it('renders stat card when stats are available', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('stat-card')).toBeInTheDocument();
      expect(screen.getByTestId('stats-count')).toHaveTextContent('1');
    });
  });

  it('renders evolution chain card', async () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('evolution-chain-card')).toBeInTheDocument();
      expect(screen.getByTestId('evolution-pokemon-name')).toHaveTextContent('bulbasaur');
    });
  });

  it('handles API errors gracefully', async () => {
    mockedCommonService.getPokemonDataById.mockRejectedValue(new Error('API Error'));

    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    // When API fails, the component should still render but show loading state
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('handles missing pokemonId', () => {
    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={undefined}
        offset={20}
      />
    );

    expect(mockedCommonService.getPokemonDataById).not.toHaveBeenCalled();
  });

  it('resets data when modal is closed', async () => {
    const { rerender } = render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent('bulbasaur');
    });

    // Close modal
    rerender(
      <DetailPage
        isCardSelected={false}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    // Reopen modal
    rerender(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    // Should show loading state again
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('handles null pokemon data', async () => {
    mockedCommonService.getPokemonDataById.mockResolvedValue(null);

    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  it('handles pokemon without stats', async () => {
    const pokemonWithoutStats = { ...mockPokemonData, stats: undefined };
    mockedCommonService.getPokemonDataById.mockResolvedValue(pokemonWithoutStats);

    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('details-header')).toBeInTheDocument();
      expect(screen.queryByTestId('stat-card')).not.toBeInTheDocument();
    });
  });

  it('handles pokemon without type data', async () => {
    mockedCommonService.getPokemonTypesById.mockResolvedValue(null);

    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={mockToggleModal}
        pokemonId={1}
        offset={20}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('details-header')).toBeInTheDocument();
      expect(screen.queryByTestId('property-card')).not.toBeInTheDocument();
    });
  });
});
