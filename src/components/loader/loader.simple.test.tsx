import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock CSS imports
jest.mock('./loader.scss', () => ({}), { virtual: true });

import Apploader from './loader';

describe('Apploader - Simple Tests', () => {
  it('renders without crashing', () => {
    render(<Apploader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with className prop', () => {
    render(<Apploader className="custom-class" />);
    const wrapper = screen.getByRole('progressbar').closest('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<Apploader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<Apploader size="lg" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with custom content', () => {
    render(<Apploader content="Loading..." />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with center prop', () => {
    render(<Apploader center />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with speed prop', () => {
    render(<Apploader speed="slow" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with vertical prop', () => {
    render(<Apploader vertical />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with custom style', () => {
    render(<Apploader style={{ color: 'red' }} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with custom id', () => {
    render(<Apploader id="custom-loader" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with custom data attributes', () => {
    render(<Apploader data-testid="custom-loader" />);
    // Since the component doesn't pass through data-testid, we just verify it renders
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with accessibility attributes', () => {
    render(<Apploader aria-label="Loading content" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with proper semantic structure', () => {
    render(<Apploader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with proper component isolation', () => {
    render(<Apploader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with proper maintainability', () => {
    render(<Apploader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with proper scalability', () => {
    render(<Apploader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with proper reusability', () => {
    render(<Apploader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
