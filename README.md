# @zuze/react-ast

[![NPM](https://img.shields.io/npm/v/@zuze/react-ast.svg)](https://www.npmjs.com/package/@zuze/react-ast) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Check out the [official documentation](https://zuze-lab.github.io/react-ast/)

## What's this?

A thought experiment (for now) to render COMPLETE react applications from a JSON Abstract Syntax Tree (AST). There's [lots](https://www.pluralsight.com/guides/how-to-render-a-component-dynamically-based-on-a-json-config) [of](https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components) [articles](https://www.storyblok.com/tp/react-dynamic-component-from-json) about how to turn JSON into dynamic react components, but those articles lack the truly dynamic nature I wanted to achieve. [react-from-json](https://github.com/hydrateio/react-from-json) could definitely be considered prior art.

## Why?

I'm honestly not sure right now, but I think the sky's the limit here.


## Install

```bash
yarn add @zuze/react-ast
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAST from '@zuze/react-ast'

const App = () => (
  <ReactAST 
    ast={{
      MAIN: {
        component: 'h1',
        children: ['Hello World']
      }
    }}
  />
);

ReactDOM.render(<App/>, document.getElementById('root'));
```

### API

This module exports a single component:
`<ReactAST/>`

### Props

- `descriptor: ComponentDescriptor` - A `ComponentDescriptor`
- `resolver: ComponentResolver` - Given a `ComponentDescriptor`, return a Component
- `ast?:  AST` - An optional map of `ComponentDescriptors` that are useful to reference things from
- `Component?: ReactElement` - Render a descriptor using a Component
- `render?: Renderer` - Render a descriptor using a function
- `children?: Renderer` - Alternate way to render a descriptor using a function
  
**Advanced Props:**
- `cmpKey = '$cmp'` - Object key the will yield dynamic components.
- `merge?: (...ComponentDescriptors) => ComponentDescriptor` - merge function used to combine `ComponentDescriptors` when using `$cmp`'s
- `interpolate: RegExp = /\{\{(.+?)\}\}/g` - Pattern which will be used to interpolate variables into the AST
- `context: {[key: string]: any} = {}` - Context that can be used for interpolation patterns
- `contextKey: string = $` - See [context and interpolation](#context-and-interpolation)

## Types

### AST

An AST is a key-value map of `ComponentDescriptor`s. The string `keys` are referred to as `ComponentIdentifier`s

```js
{
  [key: string]: ComponentDescriptor
}

// example
<ReactAST
  descriptor={{
    component:'div',
    children:[ { $cmp: '{{OTHER_COMPONENT}}}' } ]
  }}
  ast={{
    OTHER_COMPONENT: {
      component: 'span',
      children: [ 'Hello World!' ]
    }
  }}
/>

// output
// <span>Hello World!</span>
```

### ComponentDescriptor

Only `props` and `children` are treated as special keys in a `ComponentDescriptor`. It is encouraged to use `component` and `module`, but as long as your [`resolver`](#componentresolver) can return a component given a `ComponentDescriptor`, then naming isn't critical.

```js
{
  component: string,
  props?: { [key: string]: any },
  children?: any[],
  [key: string]: any
}

// example of a host component (no module)
<ReactAST
  descriptor={{
    MAIN: {
      component: 'span',
      props: { 
        title: 'My Span Title' 
      },
      children: [ 'Hello world!' ]
    }
  }}
/>

// output
// <span title="My Span Title">Hello World!</span>
```


### DynamicComponents

A DynamicComponent is simply a resolved `ComponentDescriptor` to a React Component. They are created using the `$cmp` keyword (configurable using the `cmpKey` prop).

```js
{
  $ref: ComponentDescriptor
}



<ReactAST
  descriptor={{
    component: 'div',
    children: [
      {
        $cmp: {
          component: 'span',
          props: {
            title: 'My Span Title',
          },
          children: [ 'Hello World!' ]
        }
      }
    ]
  }}
/>

// Output
// <div><span title="My Span Title">Hello World</span></div>

```

`$cmps`s that get interpolated to other components can also override parts of the resolved `ComponentDescriptor` by supplying their own:

```js
<ReactAST
  descriptor={{
    component: 'div',
    children: [
      {
        $cmp: '{{CHILD_A}}',
        props: {
          title: 'Override Span title',
        }
      }
    ]
  }}
  ast={{
    CHILD_A: {
      component: 'span',
      props: {
        title: 'My Span Title',
      },
      children: [ 'Hello World!' ]
    }
  }}
/>

// Output
// <div> <span title="Override Span title">Hello world!</span> </div>
```

This way component descriptors are merged together this way is controlled using the `merge` prop. The default merge function shallow merges props of all descriptors and overrides everything else.

### ComponentResolver

A `ComponentResolver` is passed the `ComponentDescriptor` and returns a React component.


```js
(descriptor) => ReactElement | Promise<ReactElement>

// example using a module property on the component descriptor
import * as mui from `@material-ui/core`;
const resolver = ({module,component}) => {
  if(module !== 'mui') 
    throw new Error('Can only use components exported by material-ui');
  return mui[component]
}

<ReactAST
  resolver={resolver}
  descriptor={{
    component: 'Button',
    module: 'mui',
    props: {
      variant: 'contained'
    },
    children: [ 'Click Me!' ]
  }}
/>

```

#### AST and Code Splitting

The concept of `module`s is (arguably) what sets `@zuze/react-ast` apart from [`react-from-json`](https://github.com/hydrateio/react-from-json). Code-splitting by component using `React.lazy`  could result in a large number of bundles (and requests). A `module` in `@zuze/react-ast` is a group of commonly-used together components. Once you've loaded one component from that module, the rest will be loaded synchronously. We use `React.lazy`. You can structure your modules however you want to keep your bundle size small and it's also important to note that the same component could be part of multiple modules.

[dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) are a thing. With the proper set up below, it's quite easy to use `ReactAST` alongside code-splitting.

1. Put a `jsconfig.json` in your base `create-react-app` directory like this:
```json
{
  "baseUrl": "src"
}
```
1. Create a directory where you'll put your dynamically imports - e.g. `src/modules`
2. Create an async resolver:
```js
const resolver = module => import(`./modules/${module}`)
```

**NOTE: In order to hint at webpack what bundles need to be generated, it's critical that the dynamic import have a fixed prefix. Webpack needs the directory prefix to be able to generate the bundles at build time as it obviously can't do it at runtime**

Done!

If I had `src/modules/a-test-module.js` in my `create-react-app` that looked like this:

```js
import React from 'react';
const TestSpanComponent = (props) => (
  <>
    This is my test component!
    <span {...props}/>
  </>
)

export { TestSpanComponent }
```

It could be used with `ReactAST` like this:
```js
// ReactAST will suspend while it asynchronously loads the component
// So Suspense with a fallback prop is needed
<Suspense fallback={<></>}>
   <ReactAST
    resolver={module => import(`modules/${module}`)}
    descriptor={{
      component: 'TestSpanComponent',
      module: 'a-test-module'
      props: {
        title: 'My Span Title'
      },
      children: [ 'Hello World!' ]
    }}
   />
</Suspense>

// Output
// This is my test component! <span title="My Span Title">Hello World</span>
```


`$ref` can either be a `string` which references a component identifier (i.e. top level key) in the AST object or it can be an inline `ComponentDescriptor`

### Renderer

```js
({ render: (props = {}) => any, descriptor: ComponentDescriptor, key: string }) => any
```

A `Renderer` - given as either the `render` or `children` prop - is used when extra processing that can't be encoded in the AST may need to be happen. For those familiar with [material-ui](https://material-ui.com/), an example might be a `theme`:

```js
import * as mui from `@material-ui/core`;
const resolver = ({module,component}) => {
  if(module !== 'mui') 
    throw new Error('Can only use components exported by material-ui');
  return mui[component];
}

const { ThemeProvider } = mui;

<ReactAST
  descriptor={{
      component: 'Button',
      module: 'mui',
      props: {
      	variant: 'contained',
      },
      children: [ 'Hello World MUI Button!' ],
      theme: {
      	colors: {
      		primary: 'red'
      	}
      }
  }}
  render={({
  	render,
    descriptor,
    key
  }) => <ThemeProvider key={key} theme={descriptor.theme}>{render()}</ThemeProvider>}
/>
```

**NOTE:** If you are wrapping the output of the render function in another component, like above, you'll need to pass in the parameter to avoid development warnings about not supplying keys.

You can additionally pass props to the `render` function that will end up in the component described in the AST:

```js
<ReactAST
  descriptor={{
      component: 'Button',
      module: 'mui',
      props: {
        variant: 'contained',
      },
      children: [ 'Hello World MUI Button!' ],
      theme: {
        colors: {
          primary: 'red'
        }
      }
  }}
  render={({render}) => render({onPress:() => alert('Pressed')})}  
/>
```

## Context and Interpolation

To Do

## License

MIT © [akmjenkins](https://github.com/akmjenkins)
