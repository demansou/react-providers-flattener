# Publishing Guide

This guide explains how to publish `react-providers-flattener` to npm.

## Prerequisites

1. **npm Account**: You need an npm account. Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **npm CLI**: Ensure you have npm installed (comes with Node.js)
3. **Authentication**: Log in to npm from your terminal

## Step-by-Step Publishing Process

### 1. Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### 2. Verify Package Configuration

Check that package.json has the correct information:

```bash
cat package.json
```

Ensure these fields are correct:
- `name`: Must be unique on npm (check availability at npmjs.com)
- `version`: Follow semantic versioning (MAJOR.MINOR.PATCH)
- `description`: Clear description of the package
- `author`: Your name or organization
- `license`: MIT (already set)
- `repository`: GitHub repository URL
- `keywords`: Relevant search terms

### 3. Update Author Information

Before publishing, update the `author` field in package.json:

```bash
npm pkg set author="Your Name <your.email@example.com>"
```

Or edit package.json manually to add:
```json
"author": "Your Name <your.email@example.com> (https://yourwebsite.com)"
```

### 4. Check Package Name Availability

```bash
npm view react-providers-flattener
```

If the package doesn't exist, you'll see an error - that's good! If it exists, you'll need to choose a different name or request access from the current owner.

### 5. Test the Build

```bash
npm run build
```

Verify the `dist/` folder is created with:
- `index.js` (CommonJS)
- `index.mjs` (ES Module)
- `index.d.ts` (TypeScript definitions)
- `index.d.mts` (TypeScript definitions for ESM)

### 6. Test the Package Locally (Optional but Recommended)

```bash
# Create a tarball
npm pack

# This creates react-providers-flattener-1.0.0.tgz
# You can install this in a test project:
# npm install /path/to/react-providers-flattener-1.0.0.tgz
```

### 7. Publish to npm

**For first-time publishing:**

```bash
npm publish
```

**For scoped packages (if you want to use @yourname/react-providers-flattener):**

```bash
# Make the package public (scoped packages are private by default)
npm publish --access public
```

### 8. Verify Publication

Visit your package on npm:
```
https://www.npmjs.com/package/react-providers-flattener
```

Test installation:
```bash
npm install react-providers-flattener
```

## Publishing Updates

### Version Bumping

For subsequent releases, update the version number:

```bash
# Patch release (bug fixes): 1.0.0 → 1.0.1
npm version patch

# Minor release (new features, backward compatible): 1.0.0 → 1.1.0
npm version minor

# Major release (breaking changes): 1.0.0 → 2.0.0
npm version major
```

This will:
1. Update the version in package.json
2. Create a git commit
3. Create a git tag

Then publish:

```bash
npm publish
```

### Publishing Workflow

1. Make your changes
2. Update CHANGELOG (if you have one)
3. Run tests and build
4. Bump version (`npm version <patch|minor|major>`)
5. Push changes and tags: `git push && git push --tags`
6. Publish: `npm publish`

## Best Practices

### Before Publishing

- [ ] All tests pass (when you add tests)
- [ ] Build succeeds without errors
- [ ] README is up to date
- [ ] Version number follows semantic versioning
- [ ] CHANGELOG is updated (if applicable)
- [ ] Examples work correctly

### Security

- Never publish with your `.env` file or secrets
- Review `.npmignore` to ensure only necessary files are published
- Use `npm pack` to preview what will be published

### Package Quality

- Keep the package size small (check with `npm pack`)
- Ensure good TypeScript types
- Maintain backward compatibility when possible
- Document breaking changes clearly

## Troubleshooting

### "Package name already exists"

Choose a different name or use a scoped package:
```json
{
  "name": "@yourusername/react-providers-flattener"
}
```

### "You do not have permission to publish"

Make sure you're logged in with the correct npm account:
```bash
npm whoami
npm logout
npm login
```

### "prepublishOnly script failed"

The build is failing. Check the error messages and fix any TypeScript or build issues.

## Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [package.json Documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

## Quick Reference

```bash
# One-time setup
npm login
npm pkg set author="Your Name <email@example.com>"

# Publishing for the first time
npm run build
npm publish

# Publishing updates
npm version patch  # or minor/major
npm publish
git push && git push --tags
```
