/**
 * Real-world example using popular React libraries
 *
 * This example shows how you might use react-providers-flattener
 * with common libraries like React Query, React Router, and Material-UI.
 *
 * Note: This is a conceptual example. You would need to install these
 * packages to actually use this code:
 *
 * npm install @tanstack/react-query react-router-dom @mui/material
 */

import React from 'react';
import { ProviderComposer } from 'react-providers-flattener';

// These would be imported from actual libraries:
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// Mock implementations for demonstration purposes
const QueryClientProvider: React.FC<{
  children: React.ReactNode;
  client?: unknown;
}> = ({ children }) => <>{children}</>;
const RouterProvider: React.FC<{
  children: React.ReactNode;
  router?: unknown;
}> = ({ children }) => <>{children}</>;
const ThemeProvider: React.FC<{
  children: React.ReactNode;
  theme?: unknown;
}> = ({ children }) => <>{children}</>;
const CssBaseline: React.FC = () => null;

// Your custom providers
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};

// Configuration
const queryClient = {
  /* QueryClient instance */
};
const router = {
  /* router configuration */
};
const theme = {
  /* theme configuration */
};

const App: React.FC = () => {
  return (
    <div>
      <h1>My Application</h1>
    </div>
  );
};

// Clean provider composition
export default function Root() {
  return (
    <ProviderComposer
      providers={[
        // Third-party providers with configuration
        [QueryClientProvider, { client: queryClient }],
        [RouterProvider, { router }],
        [ThemeProvider, { theme }],

        // Custom application providers
        AuthProvider,
        NotificationProvider,
      ]}
    >
      <CssBaseline />
      <App />
    </ProviderComposer>
  );
}

// Compare with the traditional approach:
/*
export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <NotificationProvider>
              <CssBaseline />
              <App />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </RouterProvider>
    </QueryClientProvider>
  );
}
*/
