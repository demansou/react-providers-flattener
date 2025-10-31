import React from 'react';
import { composeProviders } from 'react-providers-flattener';

// Example providers
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-theme="dark">{children}</div>;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-auth="authenticated">{children}</div>;
};

const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-router="enabled">{children}</div>;
};

const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-query="enabled">{children}</div>;
};

// Create a reusable composed provider component
const AppProviders = composeProviders([
  ThemeProvider,
  AuthProvider,
  RouterProvider,
  QueryProvider,
]);

// Now you can use AppProviders anywhere in your app
const App: React.FC = () => {
  return <div>Hello World!</div>;
};

export default function Root() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}

// You can also create different compositions for different parts of your app
const AdminProviders = composeProviders([
  ThemeProvider,
  AuthProvider,
  // Admin-specific providers could go here
]);

export function AdminRoot() {
  return (
    <AdminProviders>
      <div>Admin Panel</div>
    </AdminProviders>
  );
}
