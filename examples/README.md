# Examples

This directory contains examples demonstrating various ways to use `react-providers-flattener`.

## Files

### `basic-usage.tsx`

Shows the simplest use case - composing providers without any props.

**Key concepts:**
- Using `ProviderComposer` component
- Passing an array of provider components
- Comparing with the traditional nested approach

### `with-props.tsx`

Demonstrates how to pass props to providers that require configuration.

**Key concepts:**
- Using tuple syntax `[Component, props]` for providers with props
- Mixing providers with and without props in the same array
- Type safety with provider props

### `reusable-composition.tsx`

Shows how to create reusable provider compositions using `composeProviders`.

**Key concepts:**
- Creating a composed provider component
- Reusing the same provider composition across multiple entry points
- Creating different compositions for different app sections

### `real-world.tsx`

A realistic example using common React libraries.

**Key concepts:**
- Integrating with popular libraries (React Query, React Router, Material-UI)
- Combining third-party and custom providers
- Clean configuration and setup

## Running the Examples

These examples are for reference only and are not executable without setting up a complete React project. To try them out:

1. Create a new React + TypeScript project
2. Install `react-providers-flattener`
3. Copy the example code into your project
4. Install any additional dependencies shown in the example
5. Run your project

## Learn More

See the main [README.md](../README.md) for full API documentation and installation instructions.
