import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Apploader from './loader';

// Mock RSuite components
jest.mock('rsuite', () => ({
  Loader: ({ size, content }: { size: string; content: string }) => (
    <div data-testid="rsuite-loader" data-size={size} data-content={content}>
      {content}
    </div>
  ),
}));

describe('Apploader', () => {
  it('renders with default props', () => {
    render(<Apploader />);
    
    const loader = screen.getByTestId('rsuite-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('data-size', 'md');
    expect(loader).toHaveAttribute('data-content', 'Loading...');
  });

  it('renders with custom className', () => {
    const customClass = 'custom-loader-class';
    render(<Apploader className={customClass} />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('renders without className', () => {
    render(<Apploader />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toBeInTheDocument();
  });

  it('renders with empty className', () => {
    render(<Apploader className="" />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toBeInTheDocument();
  });

  it('renders with undefined className', () => {
    render(<Apploader className={undefined} />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toBeInTheDocument();
  });

  it('renders with null className', () => {
    render(<Apploader className={null as any} />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toBeInTheDocument();
  });

  it('renders with multiple class names', () => {
    const multipleClasses = 'class1 class2 class3';
    render(<Apploader className={multipleClasses} />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('class1', 'class2', 'class3');
  });

  it('renders with special characters in className', () => {
    const specialClass = 'loader-class-with-special-chars_123';
    render(<Apploader className={specialClass} />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass(specialClass);
  });

  it('renders with whitespace in className', () => {
    const spacedClass = '  spaced-class  ';
    render(<Apploader className={spacedClass} />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('spaced-class');
  });

  it('renders with app-loader-wrapper class', () => {
    render(<Apploader className="app-loader-wrapper" />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('app-loader-wrapper');
  });

  it('renders with loadmore-loader class', () => {
    render(<Apploader className="loadmore-loader" />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('loadmore-loader');
  });

  it('renders with custom-loader class', () => {
    render(<Apploader className="custom-loader" />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('custom-loader');
  });

  it('renders with centered-loader class', () => {
    render(<Apploader className="centered-loader" />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('centered-loader');
  });

  it('renders with fullscreen-loader class', () => {
    render(<Apploader className="fullscreen-loader" />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('fullscreen-loader');
  });

  it('has correct structure', () => {
    render(<Apploader className="test-class" />);
    
    const container = screen.getByTestId('rsuite-loader').parentElement;
    const loader = screen.getByTestId('rsuite-loader');
    
    expect(container).toContainElement(loader);
    expect(container?.tagName).toBe('DIV');
  });

  it('renders multiple loaders', () => {
    render(
      <div>
        <Apploader className="loader1" />
        <Apploader className="loader2" />
        <Apploader className="loader3" />
      </div>
    );
    
    const loaders = screen.getAllByTestId('rsuite-loader');
    expect(loaders).toHaveLength(3);
  });

  it('renders with conditional className', () => {
    const ConditionalLoader = ({ showClass }: { showClass: boolean }) => (
      <Apploader className={showClass ? 'visible' : 'hidden'} />
    );
    
    const { rerender } = render(<ConditionalLoader showClass={true} />);
    
    let container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('visible');
    
    rerender(<ConditionalLoader showClass={false} />);
    
    container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('hidden');
  });

  it('renders with dynamic className', () => {
    const DynamicLoader = ({ theme }: { theme: string }) => (
      <Apploader className={`loader-${theme}`} />
    );
    
    const { rerender } = render(<DynamicLoader theme="light" />);
    
    let container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('loader-light');
    
    rerender(<DynamicLoader theme="dark" />);
    
    container = screen.getByTestId('rsuite-loader').parentElement;
    expect(container).toHaveClass('loader-dark');
  });
});
