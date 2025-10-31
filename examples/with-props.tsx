import React from 'react';
import { ProviderComposer } from 'react-providers-flattener';

// Example provider with props
interface ThemeProviderProps {
  theme: 'light' | 'dark';
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  return <div data-theme={theme}>{children}</div>;
};

interface AuthProviderProps {
  initialUser?: { name: string; email: string };
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ initialUser, children }) => {
  return <div data-user={initialUser?.name}>{children}</div>;
};

interface RouterProviderProps {
  basename?: string;
  children: React.ReactNode;
}

const RouterProvider: React.FC<RouterProviderProps> = ({ basename, children }) => {
  return <div data-basename={basename}>{children}</div>;
};

// Simple provider without props
const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-notifications="enabled">{children}</div>;
};

const App: React.FC = () => {
  return <div>Hello World!</div>;
};

// Using providers with and without props
export default function Root() {
  const currentUser = { name: 'John Doe', email: 'john@example.com' };

  return (
    <ProviderComposer
      providers={[
        // Provider with props - pass as tuple [Component, props]
        [ThemeProvider, { theme: 'dark' }],
        [AuthProvider, { initialUser: currentUser }],
        [RouterProvider, { basename: '/app' }],
        // Provider without props - pass directly
        NotificationProvider,
      ]}
    >
      <App />
    </ProviderComposer>
  );
}
