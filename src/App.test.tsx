import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the lazy-loaded components
jest.mock('./pages/home/home.page', () => {
  return function MockHomePage() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('./pages/details/details.page', () => {
  return function MockDetailPage() {
    return <div data-testid="detail-page">Detail Page</div>;
  };
});

// Mock the PokemonProvider
jest.mock('./context/pokemonContext/pokemon.provider', () => ({
  PokemonProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pokemon-provider">{children}</div>
  ),
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('pokemon-provider')).toBeInTheDocument();
  });

  it('renders main element', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders with proper structure', () => {
    render(<App />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByTestId('pokemon-provider'));
  });
});
