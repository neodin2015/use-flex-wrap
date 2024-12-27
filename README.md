<div align='center'>
  <a>
    <img width='200' src="logo.png" alt='logo'>
  </a>
</div>

# useFlexWrap

`useFlexWrap` is a custom React hook that detects whether the children of a flex container wrap to multiple lines. It
also determines the number of lines ("wrap stages") if wrapping occurs. This hook is useful when managing layout
behavior in dynamic or responsive designs.

## Features

- Detects if the flex container's children wrap to multiple lines.
- Provides the number of wrapping lines ("wrap stages").
- Reacts to changes in size, content, or layout of the flex container.

## Installation

```bash
yarn add use-flex-wrap
# or
npm i use-flex-wrap --save
```

## Usage

```tsx
import React from 'react';
import { useFlexWrap } from './useFlexWrap';

const ExampleComponent = () => {
  const { ref, wrap, wrapStage } = useFlexWrap({ debounceTime: 300 });

  return (
    <div>
      <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <div style={{ width: '100px', height: '100px', background: 'red' }} />
        <div style={{ width: '100px', height: '100px', background: 'blue' }} />
        <div style={{ width: '100px', height: '100px', background: 'green' }} />
        <div style={{ width: '100px', height: '100px', background: 'yellow' }} />
      </div>
      <p>Wrap: {wrap ? 'Yes' : 'No'}</p>
      <p>Wrap Stages: {wrapStage}</p>
    </div>
  );
};

export default ExampleComponent;
```

## API

### `useFlexWrap<T extends HTMLElement>(options?: IUseFlexWrapOptions)`

#### Parameters
- **`T`** *(generic, optional)*:
  Specifies the type of the element that will be assigned to the `ref`. Defaults to `HTMLElement`.
- `options` (optional):
  - **debounceTime** (`number`): The debounce duration in milliseconds for recalculating layout changes. Default is
    `300ms`.

#### Returns

- **ref**: `ref<T>` to attach to the flex container you want to monitor.
- **wrap**: A `boolean` indicating whether the children are wrapping to multiple lines.
- **wrapStage**: A `number` representing the number of lines ("wrap stages") in the container.
