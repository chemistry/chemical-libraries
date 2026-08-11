# Contributing

## Setup

Node.js >= 22 (see `.nvmrc`), npm >= 10.

```bash
npm ci
npm run verify
```

`npm run verify` runs, in order: `type-check` (tsc --noEmit), `lint` (ESLint), `format:check` (Prettier), `test` (Vitest + coverage), `build` (dependency-ordered tsc), and `verify:pack`. The last one runs publint and are-the-types-wrong against every publishable package, checks the packed file list for leaks, then type-checks and runs the consumer fixture in `tools/consumer-check/`.

## Tests

- Package tests: `*.test.ts` colocated with source in `packages/<pkg>/src/`.
- Script tests: `scripts/*.test.js`.
- Coverage threshold is 70% (branches, functions, lines, statements).

## Commits

Conventional commits, subject <= 72 characters: `feat:`, `fix:`, `chore:`, `docs:`.

## Pull Requests

Open PRs against `master`. `npm run verify` must pass before review.

## Releases

Releases ship through the Friday release train (`.github/workflows/train.yml`), which bumps versions, publishes with OIDC trusted publishing, and tags the result. **Never run `npm publish` manually.**
