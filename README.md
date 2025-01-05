<div align='center'>
  <a>
    <img width='200' src="logo.jpeg" alt='logo'>
  </a>
</div>

# useFlexWrap

`useFlexWrap` is a powerful custom hook available for both React and Vue frameworks. It helps detect whether children of
a flex container wrap to multiple lines. Additionally, it calculates the number of lines ("wrap stages") if wrapping
occurs, proving especially useful in responsive and dynamic layouts.

## Features

- Detects if the children of a flex container wrap onto multiple lines.
- Determines the number of lines ("wrap stages").
- Reacts to changes in the container layout, size, or contents.

## Installation

``` bash
# Using Yarn
yarn add use-flex-wrap

# Using npm
npm install use-flex-wrap --save
```

## Usage

### React

``` tsx
import React from 'react';
import { useFlexWrap } from 'use-flex-wrap/react';

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

### Vue

``` vue
<template>
  <div>
    <div
      ref="containerRef"
      style="display: flex; flex-wrap: wrap; width: 100%"
    >
      <div style="width: 100px; height: 100px; background: red" />
      <div style="width: 100px; height: 100px; background: blue" />
      <div style="width: 100px; height: 100px; background: green" />
      <div style="width: 100px; height: 100px; background: yellow" />
    </div>
    <p>Wrap: {{ wrap ? 'Yes' : 'No' }}</p>
    <p>Wrap Stages: {{ wrapStage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useFlexWrap } from 'use-flex-wrap/vue';

export default {
  setup() {
    const { containerRef, wrap, wrapStage } = useFlexWrap({ debounceTime: 300 });

    return { containerRef, wrap, wrapStage };
  },
};
</script>
```

## API

### General Signature

**`useFlexWrap<T extends HTMLElement>(options?: IUseFlexWrapOptions)`** _(React)_

**`useFlexWrap(userOptions?: IUseFlexWrapOptions)`** _(Vue)_

#### Parameters

- **`T`** _(React-only)_:
  Specifies the type of the element assigned to the `ref`. Defaults to `HTMLElement`.
- **`options`** _(optional)_:
    - **`debounceTime`** _(number)_:
      Debounce time in milliseconds before recalculating the layout state. Default is `300`.

#### Returns

- **React**:
    - **`ref`**:
      A `RefObject<T>` to be attached to the flex container being monitored.

- **Vue**:
    - **`containerRef`**:
      A reactive `Ref` tied to the container.

- **General**:
    - **`wrap`**:
      A reactive `boolean` indicating if children are wrapping.
    - **`wrapStage`**:
      A reactive `number` showing the number of calculated "wrap stages".
    - **`detectWrap`**:
      A method to manually recompute the wrapping state—handy for dynamic rendering scenarios.
