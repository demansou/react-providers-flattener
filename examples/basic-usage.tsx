import React from 'react';
import { ProviderComposer } from 'react-providers-flattener';

// Example provider components
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div data-theme="dark">{children}</div>;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div data-auth="authenticated">{children}</div>;
};

const RouterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div data-router="enabled">{children}</div>;
};

// Your app component
const App: React.FC = () => {
  return <div>Hello World!</div>;
};

// Instead of this sideways mountain:
// <ThemeProvider>
//   <AuthProvider>
//     <RouterProvider>
//       <App />
//     </RouterProvider>
//   </AuthProvider>
// </ThemeProvider>

// Use this clean approach:
export default function Root() {
  return (
    <ProviderComposer providers={[ThemeProvider, AuthProvider, RouterProvider]}>
      <App />
    </ProviderComposer>
  );
}
