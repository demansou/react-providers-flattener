import React from 'react';

/**
 * A provider component with optional props
 */
export type Provider<P = any> = React.ComponentType<P>;

/**
 * A provider entry that can be either:
 * - A React component (provider without props)
 * - A tuple of [Component, props] (provider with props)
 */
export type ProviderEntry<P = any> =
  | Provider<P>
  | [Provider<P>, Omit<P, 'children'>];

/**
 * Props for the ProviderComposer component
 */
export interface ProviderComposerProps {
  /** Array of providers to compose */
  providers: ProviderEntry[];
  /** Children to render inside all providers */
  children: React.ReactNode;
}

/**
 * Composes multiple React providers into a single component,
 * eliminating the "sideways mountain" of nested providers.
 *
 * @example
 * ```tsx
 * // Before:
 * <ThemeProvider>
 *   <AuthProvider>
 *     <RouterProvider>
 *       <App />
 *     </RouterProvider>
 *   </AuthProvider>
 * </ThemeProvider>
 *
 * // After:
 * <ProviderComposer providers={[
 *   ThemeProvider,
 *   AuthProvider,
 *   RouterProvider
 * ]}>
 *   <App />
 * </ProviderComposer>
 * ```
 *
 * @example With props:
 * ```tsx
 * <ProviderComposer providers={[
 *   [ThemeProvider, { theme: darkTheme }],
 *   [AuthProvider, { initialUser: user }],
 *   RouterProvider
 * ]}>
 *   <App />
 * </ProviderComposer>
 * ```
 */
export const ProviderComposer: React.FC<ProviderComposerProps> = ({
  providers,
  children
}) => {
  return providers.reduceRight<React.ReactElement>(
    (acc, provider) => {
      // Check if provider is a tuple [Component, props]
      if (Array.isArray(provider)) {
        const [Component, props] = provider;
        return React.createElement(Component, props, acc);
      }

      // Otherwise it's just a component without props
      return React.createElement(provider, null, acc);
    },
    children as React.ReactElement
  );
};

/**
 * Creates a composed provider component from an array of providers.
 * Useful when you want to create a reusable provider composition.
 *
 * @param providers - Array of providers to compose
 * @returns A component that wraps children with all providers
 *
 * @example
 * ```tsx
 * const AppProviders = composeProviders([
 *   ThemeProvider,
 *   AuthProvider,
 *   RouterProvider
 * ]);
 *
 * // Later in your app:
 * <AppProviders>
 *   <App />
 * </AppProviders>
 * ```
 */
export const composeProviders = (
  providers: ProviderEntry[]
): React.FC<{ children: React.ReactNode }> => {
  return ({ children }) => (
    <ProviderComposer providers={providers}>
      {children}
    </ProviderComposer>
  );
};

// Default export
export default ProviderComposer;
