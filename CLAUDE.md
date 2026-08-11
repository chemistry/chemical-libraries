# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@chemistry/chemical-libraries** — Open-source isomorphic cheminformatics JavaScript libraries. Provides foundational chemistry data structures and algorithms.

**Repository:** `chemistry/chemical-libraries`
**Default Branch:** `master`
**Monorepo:** npm workspaces with an explicitly ordered build script (no TypeScript project references)

## Development Commands

```bash
npm install              # Install all workspace dependencies
npm run build            # Build all packages (tsc)
npm test                 # Run Vitest unit tests
npm run type-check       # TypeScript checking
npm run lint             # ESLint
npm run format:check     # Prettier check
npm run verify:pack      # publint + attw + packed-file check + consumer fixture
npm run verify           # Full pipeline: type-check + lint + format:check + test + build + verify:pack
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

All packages are published to npm under the `@chemistry` scope. Releases are **not** tag-triggered: they ship via `.github/workflows/train.yml` (Friday cron, or `workflow_dispatch` with a `bump` input of `auto`/`patch`/`minor`/`major`/`none`), which bumps versions, publishes with OIDC trusted publishing, and tags the result. **Never run `npm publish` manually.**

## Standards

See [root CLAUDE.md](../../CLAUDE.md) for tech standards and [showcase CLAUDE.md](../CLAUDE.md) for portfolio workflow rules.
