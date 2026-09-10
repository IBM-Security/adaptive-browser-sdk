# Publishing Guide for @ibm-verify/adaptive-browser

This guide explains how to publish a new version of the package to npm.

## Prerequisites

1. **npm Account**: You need an npm account with publish permissions for the `@ibm-verify` scope
2. **Authentication**: You must be logged in to npm
3. **Access Rights**: You need to be added as a maintainer/owner of the package

## Pre-Publishing Checklist

- [ ] All tests pass (if applicable)
- [ ] Security vulnerabilities are addressed
- [ ] Documentation is up to date
- [ ] CHANGELOG is updated (if exists)
- [ ] Version number is bumped appropriately
- [ ] Build artifacts are generated
- [ ] PR is reviewed and merged to main branch

## Step-by-Step Publishing Process

### 1. Ensure You're on the Main Branch

```bash
git checkout main
git pull origin main
```

### 2. Verify npm Authentication

Check if you're logged in:

```bash
npm whoami
```

If not logged in, authenticate:

```bash
npm login
```

For scoped packages with a custom registry (like IBM's internal registry), you may need:

```bash
npm login --registry=https://registry.npmjs.org --scope=@ibm-verify
```

### 3. Update Version Number

Choose the appropriate version bump based on semantic versioning:

- **Patch** (1.7.4 → 1.7.5): Bug fixes, security patches
- **Minor** (1.7.4 → 1.8.0): New features, backward compatible
- **Major** (1.7.4 → 2.0.0): Breaking changes

```bash
# For a patch release (recommended for security fixes)
npm version patch

# For a minor release
npm version minor

# For a major release
npm version major
```

This will:
- Update the version in `package.json`
- Create a git commit with the version change
- Create a git tag

### 4. Build the Package

Run the build script to generate distribution files:

```bash
npm run build
```

This will create:
- `dist/adaptive-v1.js` (bundled version)
- `dist/adaptive-v1.min.js` (minified version)

### 5. Test the Package Locally (Optional but Recommended)

Create a test installation:

```bash
# Pack the package
npm pack

# This creates a .tgz file like ibm-verify-adaptive-browser-1.7.5.tgz
# Test it in another project:
# npm install /path/to/ibm-verify-adaptive-browser-1.7.5.tgz
```

### 6. Publish to npm

For a public package:

```bash
npm publish --access public
```

For a scoped package (default is restricted):

```bash
npm publish
```

If you need to publish to a specific registry:

```bash
npm publish --registry=https://registry.npmjs.org
```

### 7. Push Git Changes

Push the version commit and tag:

```bash
git push origin main
git push origin --tags
```

### 8. Create a GitHub Release (Optional but Recommended)

```bash
gh release create v1.7.5 \
  --title "v1.7.5 - Security Fixes" \
  --notes "Security vulnerability fixes"
```

Or create it manually on GitHub:
1. Go to https://github.com/ibm-verify/adaptive-browser-sdk/releases
2. Click "Draft a new release"
3. Select the tag (e.g., v1.7.1)
4. Add release notes
5. Publish release

## Publishing for Security Fixes

Since security vulnerabilities have been addressed via Dependabot PRs, here's the recommended workflow:

### 1. Ensure You're on the Latest Main

```bash
git checkout main
git pull origin main
```

### 2. Bump to Patch Version

```bash
npm version patch -m "chore: bump version to %s for security fixes"
# This will create the next patch version (e.g., 1.7.5)
```

### 3. Build and Publish

```bash
npm run build
npm publish --access public
git push origin main --tags
```

### 4. Create Release Notes

```bash
gh release create v1.7.5 \
  --title "v1.7.5 - Security Vulnerability Fixes" \
  --notes "## Security Fixes

- Fixed brace-expansion DoS vulnerabilities (GHSA-3jxr-9vmj-r5cp, GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895)
- Fixed browserslist OOM + prototype write (GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g)
- Fixed shell-quote quadratic DoS (GHSA-395f-4hp3-45gv)
- Fixed baseline-browser-mapping process.exit DoS (CVE-2026-45819)
- Updated core-js to 3.50.0, qs in demo to 6.16.0, body-parser in demo to 2.3.0

## Known Remaining Issues
- elliptic (GHSA-848j-6mx2-7j84): Low severity, awaiting upstream fix
- qs via browserify → url: Moderate, build-time only, not in distributed bundle

See SECURITY.md for full details."
```

## Troubleshooting

### "You do not have permission to publish"

You need to be added as a maintainer:
```bash
# Package owner needs to run:
npm owner add <your-npm-username> @ibm-verify/adaptive-browser
```

### "Package name too similar to existing package"

This shouldn't happen for an existing package, but if it does, contact npm support.

### "Version already exists"

You're trying to publish a version that already exists. Bump the version number:
```bash
npm version patch
```

### Build Fails

Ensure all dependencies are installed:
```bash
npm ci
npm run build
```

## Files Included in Package

The package includes files based on the `files` field in package.json (if specified) or excludes based on `.npmignore` or `.gitignore`.

Current package likely includes:
- `lib/` directory (source files)
- `dist/` directory (built files)
- `package.json`
- `README.md`
- `LICENSE.md`
- `SECURITY.md`

To see what will be published:
```bash
npm pack --dry-run
```

## Post-Publishing

1. Verify the package on npm: https://www.npmjs.com/package/@ibm-verify/adaptive-browser
2. Test installation in a fresh project:
   ```bash
   npm install @ibm-verify/adaptive-browser@latest
   ```
3. Update dependent projects to use the new version
4. Announce the release (if applicable)

## Automated Publishing (CI/CD)

For automated publishing, you can set up GitHub Actions:

1. Add npm token to GitHub Secrets: `NPM_TOKEN`
2. Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Additional Resources

- [npm Publishing Documentation](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [npm Scoped Packages](https://docs.npmjs.com/cli/v9/using-npm/scope)