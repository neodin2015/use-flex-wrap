# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-01-05
### Added
- Added **Vue** support 

### Changed
- Updated the import structure:
  - For React, `useFlexWrap` must now be imported from `use-flex-wrap/react`.
  - For Vue, `useFlexWrap` must be imported from `use-flex-wrap/vue`.

  Example:
  ```ts
  import { useFlexWrap } from 'use-flex-wrap/react'; // React
  import { useFlexWrap } from 'use-flex-wrap/vue';  // Vue
  ```
