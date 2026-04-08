# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@chemistry/chemical-libraries** — Open-source isomorphic cheminformatics JavaScript libraries. Provides foundational chemistry data structures and algorithms.

**Repository:** `chemistry/chemical-libraries`
**Default Branch:** `master`
**Monorepo:** npm workspaces with TypeScript composite projects

## Development Commands

```bash
npm install              # Install all workspace dependencies
npm run build            # Build all packages (tsc)
npm test                 # Run Vitest unit tests
npm run type-check       # TypeScript checking
npm run lint             # ESLint
npm run format:check     # Prettier check
npm run verify           # Full pipeline: type-check + lint + build + test
npm run clean            # Clean build artifacts
```

## Architecture

### Packages

```
packages/
├── common/              # @chemistry/common — Base types and utilities
├── elements/            # @chemistry/elements — Periodic table data
├── formula/             # @chemistry/formula — Chemical formula parsing
├── math/                # @chemistry/math — Linear algebra, vectors, matrices
├── molecule/            # @chemistry/molecule — Molecular graph representation
└── space-groups/        # @chemistry/space-groups — Crystallographic space group data
```

### Build Order

`common` → `elements` / `math` → `formula` / `molecule` / `space-groups`

### Key Patterns

- Pure TypeScript libraries with no runtime dependencies
- ES2024 target, ESNext modules, bundler moduleResolution
- Each package is independently publishable on npm

## Testing

- **Framework:** Vitest
- **Coverage:** 70% minimum threshold (branches, functions, lines, statements)
- **Pattern:** `*.test.ts` colocated with source

## Publishing

All packages are published to npm under the `@chemistry` scope. **Never run `npm publish` manually** — tag `v*` and push to trigger the release pipeline.

## Standards

See [root CLAUDE.md](../../CLAUDE.md) for tech standards and [showcase CLAUDE.md](../CLAUDE.md) for portfolio workflow rules.
