import React, { createContext, useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { ProviderComposer, composeProviders } from './index';

// Mock contexts for testing
const ThemeContext = createContext<string>('light');
const UserContext = createContext<string | null>(null);
const LanguageContext = createContext<string>('en');

// Mock providers
const ThemeProvider: React.FC<{
  theme?: string;
  children: React.ReactNode;
}> = ({ theme = 'dark', children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

const UserProvider: React.FC<{ user?: string; children: React.ReactNode }> = ({
  user = 'John',
  children,
}) => <UserContext.Provider value={user}>{children}</UserContext.Provider>;

const LanguageProvider: React.FC<{
  lang?: string;
  children: React.ReactNode;
}> = ({ lang = 'fr', children }) => (
  <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
);

// Test component that consumes the contexts
const TestConsumer: React.FC = () => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const lang = useContext(LanguageContext);

  return (
    <div>
      <div data-testid="theme">Theme: {theme}</div>
      <div data-testid="user">User: {user}</div>
      <div data-testid="language">Language: {lang}</div>
    </div>
  );
};

describe('ProviderComposer', () => {
  it('should render children', () => {
    render(
      <ProviderComposer providers={[]}>
        <div data-testid="child">Hello World</div>
      </ProviderComposer>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello World');
  });

  it('should compose a single provider without props', () => {
    render(
      <ProviderComposer providers={[ThemeProvider]}>
        <TestConsumer />
      </ProviderComposer>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: dark');
  });

  it('should compose a single provider with props', () => {
    render(
      <ProviderComposer providers={[[ThemeProvider, { theme: 'custom' }]]}>
        <TestConsumer />
      </ProviderComposer>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: custom');
  });

  it('should compose multiple providers without props', () => {
    render(
      <ProviderComposer
        providers={[ThemeProvider, UserProvider, LanguageProvider]}
      >
        <TestConsumer />
      </ProviderComposer>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: dark');
    expect(screen.getByTestId('user')).toHaveTextContent('User: John');
    expect(screen.getByTestId('language')).toHaveTextContent('Language: fr');
  });

  it('should compose multiple providers with props', () => {
    render(
      <ProviderComposer
        providers={[
          [ThemeProvider, { theme: 'custom-dark' }],
          [UserProvider, { user: 'Jane' }],
          [LanguageProvider, { lang: 'es' }],
        ]}
      >
        <TestConsumer />
      </ProviderComposer>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: custom-dark');
    expect(screen.getByTestId('user')).toHaveTextContent('User: Jane');
    expect(screen.getByTestId('language')).toHaveTextContent('Language: es');
  });

  it('should compose mixed providers (with and without props)', () => {
    render(
      <ProviderComposer
        providers={[
          [ThemeProvider, { theme: 'mixed' }],
          UserProvider,
          [LanguageProvider, { lang: 'de' }],
        ]}
      >
        <TestConsumer />
      </ProviderComposer>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: mixed');
    expect(screen.getByTestId('user')).toHaveTextContent('User: John');
    expect(screen.getByTestId('language')).toHaveTextContent('Language: de');
  });

  it('should maintain correct provider order (outer to inner)', () => {
    // Create a provider that depends on another context
    const DependentContext = createContext<string>('');
    const DependentProvider: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => {
      const theme = useContext(ThemeContext);
      return (
        <DependentContext.Provider value={`themed-${theme}`}>
          {children}
        </DependentContext.Provider>
      );
    };

    const DependentConsumer: React.FC = () => {
      const value = useContext(DependentContext);
      return <div data-testid="dependent">Dependent: {value}</div>;
    };

    render(
      <ProviderComposer providers={[ThemeProvider, DependentProvider]}>
        <DependentConsumer />
      </ProviderComposer>
    );

    // DependentProvider should be able to access ThemeContext value
    expect(screen.getByTestId('dependent')).toHaveTextContent(
      'Dependent: themed-dark'
    );
  });

  it('should handle empty providers array', () => {
    render(
      <ProviderComposer providers={[]}>
        <div data-testid="empty">Empty</div>
      </ProviderComposer>
    );

    expect(screen.getByTestId('empty')).toHaveTextContent('Empty');
  });
});

describe('composeProviders', () => {
  it('should create a composed provider component', () => {
    const ComposedProviders = composeProviders([ThemeProvider, UserProvider]);

    render(
      <ComposedProviders>
        <TestConsumer />
      </ComposedProviders>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: dark');
    expect(screen.getByTestId('user')).toHaveTextContent('User: John');
  });

  it('should create a composed provider with props', () => {
    const ComposedProviders = composeProviders([
      [ThemeProvider, { theme: 'composed' }],
      [UserProvider, { user: 'Bob' }],
    ]);

    render(
      <ComposedProviders>
        <TestConsumer />
      </ComposedProviders>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: composed');
    expect(screen.getByTestId('user')).toHaveTextContent('User: Bob');
  });

  it('should create a reusable composed provider', () => {
    const AppProviders = composeProviders([
      [ThemeProvider, { theme: 'app' }],
      [UserProvider, { user: 'AppUser' }],
      [LanguageProvider, { lang: 'app-lang' }],
    ]);

    // Use it multiple times
    const { unmount } = render(
      <AppProviders>
        <TestConsumer />
      </AppProviders>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: app');
    expect(screen.getByTestId('user')).toHaveTextContent('User: AppUser');
    expect(screen.getByTestId('language')).toHaveTextContent(
      'Language: app-lang'
    );

    unmount();

    // Render again to ensure it's reusable
    render(
      <AppProviders>
        <TestConsumer />
      </AppProviders>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('Theme: app');
    expect(screen.getByTestId('user')).toHaveTextContent('User: AppUser');
    expect(screen.getByTestId('language')).toHaveTextContent(
      'Language: app-lang'
    );
  });

  it('should handle empty providers array', () => {
    const EmptyComposed = composeProviders([]);

    render(
      <EmptyComposed>
        <div data-testid="empty">Empty Composed</div>
      </EmptyComposed>
    );

    expect(screen.getByTestId('empty')).toHaveTextContent('Empty Composed');
  });
});

describe('TypeScript type safety', () => {
  it('should accept providers without children prop in the array', () => {
    // This test ensures that the types allow providers to be used
    // without explicitly passing children, as the composer handles that
    const providers = [ThemeProvider, UserProvider];

    render(
      <ProviderComposer providers={providers}>
        <div data-testid="type-test">Type Test</div>
      </ProviderComposer>
    );

    expect(screen.getByTestId('type-test')).toBeInTheDocument();
  });

  it('should accept provider tuples with props excluding children', () => {
    render(
      <ProviderComposer
        providers={[
          [ThemeProvider, { theme: 'test' }],
          [UserProvider, { user: 'Test User' }],
        ]}
      >
        <div data-testid="type-test-props">Type Test Props</div>
      </ProviderComposer>
    );

    expect(screen.getByTestId('type-test-props')).toBeInTheDocument();
  });
});
