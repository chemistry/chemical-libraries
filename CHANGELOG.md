# Changelog

All notable changes to @chemistry/\* libraries will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.3.0] - 2026-08-07

### Changes

- chore: bump typescript to ^6.0.3 (#66)
- fix: fail release build when npm publish errors (was silently green) (#65)

## [3.2.0] - 2026-08-01

### Changes

- ci: run release train on plain UTC cron, drop Prague hour gate (#63)
- ci: publish only on tag push, dispatch, or merged release PR (#62)
- ci: fully automatic Friday release train (#59)
- chore(deps-dev): bump the all-dependencies group across 1 directory with 7 updates (#58)
- chore(deps): bump actions/setup-node in the all-actions group (#57)

## [3.1.4] - 2026-04-10

No significant changes

## [3.1.3] - 2026-03-27

No significant changes

## [3.1.2] - 2026-03-20

### Infrastructure

- Update development dependencies to latest versions

### Bug Fixes

- Fix deprecated test matcher usage in test suites

## [3.1.1] - 2026-03-06

### New Features

- Add complete implementations for missing chemical library functions

### Infrastructure

- Update TypeScript compilation target to ES2024 for modern JavaScript features
- Require Node.js version 22 or higher for improved performance and security

## [3.1.0] - 2026-03-01

### New Features

- Add missing elements 113-118 (Nihonium, Flerovium, Moscovium, Livermorium, Tennessine, Oganesson) to @chemistry/elements

### Documentation

- Update README with package overview table, npm badges, and usage examples

## [3.0.3] - 2026-03-01

### Bug Fixes

- Fix React dependency issue in @chemistry/molecule SVG export by implementing lazy loading

## [3.0.2] - 2026-03-01

### Infrastructure

- Fix Node.js compatibility by adding .js extensions to ESM imports

## [3.0.1] - 2026-03-01

### New Features

- Modernize monorepo to ESM modules for better JavaScript standards compatibility
- Migrate to npm workspaces for improved dependency management

### Infrastructure

- Update build system to modern tooling and latest dependencies
- Improve package metadata and configuration
