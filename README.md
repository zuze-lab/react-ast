# @zuze/react-ast

[![NPM](https://img.shields.io/npm/v/@zuze/react-ast.svg)](https://www.npmjs.com/package/@zuze/react-ast) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Check out the [official documentation](https://zuze-lab.github.io/react-ast/)

## What's this?

A pretty straightforward recursive renderer with a tiny amount of syntactic sugar (using `$cmp` and interpolation!)

## Why?

¯\\\_(ツ)_/¯


## Install

```bash
# npm
npm install @zuze/react-ast

# yarn
yarn add @zuze/react-ast
```

## Usage

### Simple Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAST from '@zuze/react-ast'

const App = () => (
  <ReactAST 
    descriptor={{
      component: 'h1',
      children: ['Hello World']
    }}
  />
);

ReactDOM.render(<App/>, document.getElementById('root'));
```

### Nesting Components

Creating components dynamically is done with the special key `$cmp` in your JSON (configurable via the `cmpKey` prop).

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAST from '@zuze/react-ast'

const App = () => (
  <ReactAST 
    descriptor={{
      component: 'h1',
      children: [
        'Please click on this ',
        {
          $cmp: {
            component: 'a'
            props: {
              href: 'https://www.google.com'
            },
            children:['link to Google']
          }
        }
      ]
    }}
  />
);

ReactDOM.render(<App/>, document.getElementById('root'));

// Output <h1>Please click on this <a href="https://www.google.com">link to google</a></h1>
```


## Props

- `descriptor: ComponentDescriptor` - A `ComponentDescriptor`
- `resolver: ComponentResolver` - Given a `ComponentDescriptor`, return a Component
- `components?:  ComponentMap` - An optional map of `ComponentDescriptors` that are useful to reference things from see [interpolation and context](#interpolation-and-context)
- `Component?: ReactElement` - Render a descriptor using a Component
- `render?: Renderer` - Render a descriptor using a function
- `children?: Renderer` - Alternate way to render a descriptor using a function
  
### Advanced Props
- `cmpKey = '$cmp'` - Object key the will yield dynamic components.
- `merge?: (...ComponentDescriptors) => ComponentDescriptor` - merge function used to combine `ComponentDescriptors` when using `$cmp`'s
- `interpolate: RegExp = /\{\{(.+?)\}\}/g` - Pattern which will be used to interpolate variables into the AST
- `context: {[key: string]: any} = {}` - Context that can be used for interpolation patterns
- `contextKey: string = $` - See [context and interpolation](#context-and-interpolation)

## Nesting Components




## Interpolation and Context

Interpolation and context is central to `@zuze/react-ast`. Simply, it works like this:

```js
const myRootComponentDescriptor = {
  component:'div',
  children:['Hi {{context.user}}!']
}

const App = () => <ReactAST descriptor={myRootComponentDescriptor} context={{user:'joe'}}/>

// outputs <div>Hi joe!</div>
```


## Types

### ComponentMap

A ComponentMap is a key-value map of `ComponentDescriptor`s. The string `keys` are referred to as `ComponentIdentifier`s

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
  components={{
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
    component: 'span',
    props: { 
      title: 'My Span Title' 
    },
    children: [ 'Hello world!' ]
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
  components={{
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

So far, we've just been rendering HTML, pretty useless stuff. Let's supercharge our capabilities with a `ComponentResolver`

`ComponentResolver: (descriptor: ComponentDescriptor) => ReactElement`

Very simple, a `ComponentResolver` is passed the `ComponentDescriptor` and returns a React component.


```js
(descriptor) => ReactElement;

// example using a module property on the component descriptor
import * as mui from `@material-ui/core`;

const resolver = ({component}) => {
  if(component === 'MuiButton') return mui.Button;
  throw new Error(`Component ${component} could not be found!`);
}

<ReactAST
  resolver={resolver}
  descriptor={{
    component: 'MuiButton',
    props: {
      variant: 'contained'
    },
    children: [ 'Click Me!' ]
  }}
/>

```

A highly useful pattern is to specify a `module` property on your component descriptor:

```js
// example using a module property on the component descriptor
import * as mui from `@material-ui/core`;

const resolver = ({module,component}) => {
  if(module !== 'mui') throw new Error(`Component ${component} could not be found!`);
  return mui[component];
}

<ReactAST
  resolver={resolver}
  descriptor={{
    component: 'Button',
    module:'mui',
    props: {
      variant: 'contained'
    },
    children: [ 'Click Me!' ]
  }}
/>
```

#### Code Splitting with Module Resolvers

[React.lazy]() is a component - so it becomes trivial to code split with the proper resolver:

```js
code example
```

To set up your [create-react-app]() for code splitting:

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

### Renderer

```js
({ render: (props = {}) => any, descriptor: ComponentDescriptor, key: string }) => any
```

A `Renderer` - given as either a `Component` or the `render` or `children` prop - is used when extra processing that can't be encoded in the AST may need to be happen. For those familiar with [material-ui](https://material-ui.com/), an example might be a `theme`:

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
