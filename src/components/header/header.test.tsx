import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';

describe('Header', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Header Content';
    render(<Header>{testContent}</Header>);
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders complex JSX children', () => {
    const testContent = (
      <div>
        <h1>Pokédex</h1>
        <p>Search for any Pokémon that exists on the planet</p>
      </div>
    );
    
    render(<Header>{testContent}</Header>);
    
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(screen.getByText('Search for any Pokémon that exists on the planet')).toBeInTheDocument();
  });

  it('renders navigation elements', () => {
    const navigationContent = (
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/pokemon">Pokemon</a></li>
        </ul>
      </nav>
    );
    
    render(<Header>{navigationContent}</Header>);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Pokemon')).toBeInTheDocument();
  });

  it('renders with empty children', () => {
    render(<Header>{}</Header>);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });

  it('renders with null children', () => {
    render(<Header>{null}</Header>);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders with undefined children', () => {
    render(<Header>{undefined}</Header>);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    render(<Header>Test Content</Header>);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
  });

  it('renders multiple children elements', () => {
    const multipleChildren = (
      <>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </>
    );
    
    render(<Header>{multipleChildren}</Header>);
    
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByText('Third Child')).toBeInTheDocument();
  });

  it('renders with logo and title', () => {
    const logoAndTitle = (
      <div>
        <div>Logo</div>
        <h1>Title</h1>
      </div>
    );
    
    render(<Header>{logoAndTitle}</Header>);
    
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders with form elements', () => {
    const formContent = (
      <form>
        <input type="text" placeholder="Search" />
        <button type="submit">Submit</button>
      </form>
    );
    
    render(<Header>{formContent}</Header>);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with semantic HTML elements', () => {
    const semanticContent = (
      <div>
        <main>Main Content</main>
        <aside>Sidebar</aside>
        <footer>Footer</footer>
      </div>
    );
    
    render(<Header>{semanticContent}</Header>);
    
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders with custom styling elements', () => {
    const styledContent = (
      <div style={{ backgroundColor: 'red', color: 'white' }}>
        Styled Content
      </div>
    );
    
    render(<Header>{styledContent}</Header>);
    
    expect(screen.getByText('Styled Content')).toBeInTheDocument();
  });

  it('renders with conditional content', () => {
    const ConditionalHeader = ({ showContent }: { showContent: boolean }) => (
      <Header>
        {showContent && <div>Conditional Content</div>}
        <div>Always Visible</div>
      </Header>
    );
    
    const { rerender } = render(<ConditionalHeader showContent={true} />);
    
    expect(screen.getByText('Conditional Content')).toBeInTheDocument();
    expect(screen.getByText('Always Visible')).toBeInTheDocument();
    
    rerender(<ConditionalHeader showContent={false} />);
    
    expect(screen.queryByText('Conditional Content')).not.toBeInTheDocument();
    expect(screen.getByText('Always Visible')).toBeInTheDocument();
  });
});
