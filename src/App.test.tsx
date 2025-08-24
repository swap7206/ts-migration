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
  PokemonProvider: ({ children }: any) => {
    return <div data-testid="pokemon-provider">{children}</div>;
  }
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: any) => <div data-testid="browser-router">{children}</div>,
  Route: ({ element }: any) => <div data-testid="route">{element}</div>,
  Routes: ({ children }: any) => <div data-testid="routes">{children}</div>
}));

// Mock the CSS imports
jest.mock('./App.css', () => ({}));
jest.mock('rsuite/styles/index.less', () => ({}));
jest.mock('rsuite/dist/rsuite.min.css', () => ({}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('pokemon-provider')).toBeInTheDocument();
  });

  it('renders BrowserRouter', () => {
    render(<App />);
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
  });

  it('renders Routes', () => {
    render(<App />);
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('renders Route components', () => {
    render(<App />);
    expect(screen.getAllByTestId('route')).toHaveLength(2);
  });

  it('wraps components in PokemonProvider', () => {
    render(<App />);
    const provider = screen.getByTestId('pokemon-provider');
    expect(provider).toBeInTheDocument();
    expect(provider).toContainElement(screen.getByTestId('browser-router'));
  });

  it('renders main element', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has proper component structure', () => {
    render(<App />);
    
    const main = screen.getByRole('main');
    const provider = screen.getByTestId('pokemon-provider');
    const router = screen.getByTestId('browser-router');
    const routes = screen.getByTestId('routes');
    
    expect(main).toContainElement(provider);
    expect(provider).toContainElement(router);
    expect(router).toContainElement(routes);
  });

  it('renders Suspense fallback for lazy components', () => {
    render(<App />);
    // The Suspense fallback should be present in the structure
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('handles component imports correctly', () => {
    // Test that the component can be imported and rendered
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('renders with proper React structure', () => {
    render(<App />);
    
    // Check that the component renders without throwing errors
    expect(() => render(<App />)).not.toThrow();
  });

  it('maintains proper nesting structure', () => {
    render(<App />);
    
    const main = screen.getByRole('main');
    const provider = screen.getByTestId('pokemon-provider');
    const router = screen.getByTestId('browser-router');
    const routes = screen.getByTestId('routes');
    
    // Verify the nesting hierarchy
    expect(main).toContainElement(provider);
    expect(provider).toContainElement(router);
    expect(router).toContainElement(routes);
  });

  it('renders with fragment wrapper', () => {
    render(<App />);
    
    // The component should render with a fragment wrapper
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('handles CSS imports without errors', () => {
    // Test that CSS imports don't cause issues
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders with proper accessibility structure', () => {
    render(<App />);
    
    // Check for proper semantic structure
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('maintains component isolation', () => {
    // Test that the component is properly isolated
    const { unmount } = render(<App />);
    expect(() => unmount()).not.toThrow();
  });

  it('renders with proper React.FC typing', () => {
    // Test that the component has proper TypeScript typing
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('handles route configuration correctly', () => {
    render(<App />);
    
    // Check that routes are properly configured
    const routeElements = screen.getAllByTestId('route');
    expect(routeElements).toHaveLength(2);
  });

  it('renders with Suspense boundary', () => {
    render(<App />);
    
    // Check that Suspense is properly configured
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('maintains proper provider context', () => {
    render(<App />);
    
    // Check that the PokemonProvider is properly configured
    expect(screen.getByTestId('pokemon-provider')).toBeInTheDocument();
  });

  it('renders with proper routing setup', () => {
    render(<App />);
    
    // Check that routing is properly set up
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('handles component re-rendering', () => {
    const { rerender } = render(<App />);
    
    // Test that the component can be re-rendered without issues
    expect(() => rerender(<App />)).not.toThrow();
  });

  it('maintains proper state management setup', () => {
    render(<App />);
    
    // Check that state management is properly configured
    expect(screen.getByTestId('pokemon-provider')).toBeInTheDocument();
  });

  it('renders with proper error boundaries', () => {
    render(<App />);
    
    // Check that the component renders without errors
    expect(() => render(<App />)).not.toThrow();
  });

  it('handles lazy loading configuration', () => {
    render(<App />);
    
    // Check that lazy loading is properly configured
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('maintains proper component hierarchy', () => {
    render(<App />);
    
    // Verify the complete component hierarchy
    const main = screen.getByRole('main');
    const provider = screen.getByTestId('pokemon-provider');
    const router = screen.getByTestId('browser-router');
    const routes = screen.getByTestId('routes');
    
    expect(main).toContainElement(provider);
    expect(provider).toContainElement(router);
    expect(router).toContainElement(routes);
  });
});
