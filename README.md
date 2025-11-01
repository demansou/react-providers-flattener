# react-providers-flattener &middot; [![npm version](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/package/react-providers-flattener)

A simple way to flatten providers so you aren't building a sideways mountain.

## The Problem

When building React applications, you often end up with deeply nested providers that create a "sideways mountain" or "pyramid of doom":

```tsx
<ThemeProvider>
  <AuthProvider>
    <RouterProvider>
      <QueryProvider>
        <NotificationProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </NotificationProvider>
      </QueryProvider>
    </RouterProvider>
  </AuthProvider>
</ThemeProvider>
```

This is hard to read, maintain, and refactor.

## The Solution

**react-providers-flattener** provides a clean, declarative way to compose multiple providers:

```tsx
<ProviderComposer
  providers={[
    ThemeProvider,
    AuthProvider,
    RouterProvider,
    QueryProvider,
    NotificationProvider,
    ModalProvider,
  ]}
>
  <App />
</ProviderComposer>
```

## Installation

```bash
npm install react-providers-flattener
```

or

```bash
yarn add react-providers-flattener
```

or

```bash
pnpm add react-providers-flattener
```

## Usage

### Basic Usage

```tsx
import { ProviderComposer } from 'react-providers-flattener';
import { ThemeProvider, AuthProvider, RouterProvider } from './providers';

function Root() {
  return (
    <ProviderComposer
      providers={[ThemeProvider, AuthProvider, RouterProvider]}
    >
      <App />
    </ProviderComposer>
  );
}
```

### With Provider Props

If your providers need props, pass them as tuples:

```tsx
import { ProviderComposer } from 'react-providers-flattener';

function Root() {
  return (
    <ProviderComposer
      providers={[
        [ThemeProvider, { theme: darkTheme }],
        [AuthProvider, { initialUser: currentUser }],
        [RouterProvider, { router: appRouter }],
        // Providers without props can be passed directly
        NotificationProvider,
      ]}
    >
      <App />
    </ProviderComposer>
  );
}
```

### Creating Reusable Provider Compositions

Use `composeProviders` to create a reusable provider component:

```tsx
import { composeProviders } from 'react-providers-flattener';

// Create your composed provider
const AppProviders = composeProviders([
  ThemeProvider,
  AuthProvider,
  RouterProvider,
  QueryProvider,
]);

// Use it anywhere in your app
function Root() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
```

### With Props in Composed Providers

```tsx
import { composeProviders } from 'react-providers-flattener';

const AppProviders = composeProviders([
  [ThemeProvider, { theme: darkTheme }],
  [QueryProvider, { client: queryClient }],
  AuthProvider,
]);

function Root() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
```

## API

### `ProviderComposer`

A component that composes multiple providers into a single wrapper.

**Props:**

- `providers`: `ProviderEntry[]` - Array of providers to compose
- `children`: `React.ReactNode` - Children to render inside all providers

**ProviderEntry Types:**

- `Provider` - A React component without props
- `[Provider, props]` - A tuple of component and its props (excluding children)

### `composeProviders(providers)`

Creates a composed provider component from an array of providers.

**Parameters:**

- `providers`: `ProviderEntry[]` - Array of providers to compose

**Returns:**

- A React component that accepts `children` prop

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All types are exported for your convenience:

```tsx
import type {
  Provider,
  ProviderEntry,
  ProviderComposerProps,
} from 'react-providers-flattener';
```

## Examples

### Real-world Example

```tsx
import { ProviderComposer } from 'react-providers-flattener';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './auth';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();
const theme = createTheme();

function Root() {
  return (
    <ProviderComposer
      providers={[
        [QueryClientProvider, { client: queryClient }],
        [ThemeProvider, { theme }],
        AuthProvider,
        [RouterProvider, { router: appRouter }],
      ]}
    >
      <App />
    </ProviderComposer>
  );
}
```

### Migration Example

**Before:**

```tsx
function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router}>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </RouterProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

**After:**

```tsx
function Root() {
  return (
    <ProviderComposer
      providers={[
        [QueryClientProvider, { client: queryClient }],
        [ThemeProvider, { theme }],
        AuthProvider,
        [RouterProvider, { router }],
        NotificationProvider,
      ]}
    >
      <App />
    </ProviderComposer>
  );
}
```

## Why Use This?

- **Cleaner Code**: No more deeply nested provider trees
- **Better Readability**: See all your providers in a flat list
- **Easier Refactoring**: Add, remove, or reorder providers easily
- **Type Safe**: Full TypeScript support with type inference
- **Tiny**: Minimal bundle size with zero dependencies (except React peer dependency)
- **Flexible**: Works with any React provider pattern

## Requirements

- React >= 16.8.0

## License

MIT
